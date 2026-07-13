'use client';

import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { getPageContext, buildContextualQuestion, type PageContext } from '@/lib/ai-context';

export interface AIMessage {
  id: string;
  role: 'user' | 'assistant';
  conteudo: string;
  timestamp: Date;
  status?: 'enviando' | 'streaming' | 'completo' | 'erro';
  fontes?: { tipo: string; referencia: string; relevancia: number }[];
}

export interface AIContextValue {
  isOpen: boolean;
  isMinimized: boolean;
  hasUnread: boolean;
  messages: AIMessage[];
  isStreaming: boolean;
  pageContext: PageContext;

  open: () => void;
  close: () => void;
  toggle: () => void;
  minimize: () => void;
  expand: () => void;
  ask: (question: string, context?: string) => Promise<void>;
  clear: () => void;
  markRead: () => void;
}

const AIContext = createContext<AIContextValue | null>(null);
export { AIContext };

const STORAGE_KEY = 'ssb_ai_messages';
const MAX_PERSISTED = 40;

function genId(): string {
  return `ai_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

function loadMessages(): AIMessage[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as AIMessage[];
    return parsed.map((m) => ({ ...m, timestamp: new Date(m.timestamp) }));
  } catch {
    return [];
  }
}

function saveMessages(messages: AIMessage[]): void {
  if (typeof window === 'undefined') return;
  try {
    const trimmed = messages.slice(-MAX_PERSISTED);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
  } catch {
    /* ignore */
  }
}

interface AIProviderProps {
  children: React.ReactNode;
}

export function AIProvider({ children }: AIProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const abortRef = useRef<AbortController | null>(null);

  const pageContext = useMemo(() => {
    const sp = searchParams?.toString() ?? null;
    return getPageContext(pathname || '/', sp);
  }, [pathname, searchParams]);

  useEffect(() => {
    setMessages(loadMessages());
  }, []);

  useEffect(() => {
    saveMessages(messages);
  }, [messages]);

  const open = useCallback(() => {
    setIsOpen(true);
    setIsMinimized(false);
    setHasUnread(false);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setIsMinimized(false);
    if (abortRef.current) {
      abortRef.current.abort();
      abortRef.current = null;
      setIsStreaming(false);
    }
  }, []);

  const toggle = useCallback(() => {
    setIsOpen((prev) => {
      if (prev) {
        setIsMinimized(false);
        return false;
      }
      setIsMinimized(false);
      setHasUnread(false);
      return true;
    });
  }, []);

  const minimize = useCallback(() => {
    setIsMinimized(true);
  }, []);

  const expand = useCallback(() => {
    setIsMinimized(false);
    setHasUnread(false);
  }, []);

  const markRead = useCallback(() => {
    setHasUnread(false);
  }, []);

  const clear = useCallback(() => {
    setMessages([]);
    if (abortRef.current) {
      abortRef.current.abort();
      abortRef.current = null;
    }
    setIsStreaming(false);
  }, []);

  const ask = useCallback(
    async (question: string, extraContext?: string) => {
      const texto = question.trim();
      if (!texto) return;

      setIsOpen(true);
      setIsMinimized(false);
      setHasUnread(false);
      setIsStreaming(true);

      const finalQuestion = extraContext
        ? `[Contexto adicional: ${extraContext}]\n\n${texto}`
        : texto;

      const contextualized = buildContextualQuestion(finalQuestion, pageContext);

      const userMsg: AIMessage = {
        id: genId(),
        role: 'user',
        conteudo: texto,
        timestamp: new Date(),
        status: 'completo',
      };
      const assistantMsg: AIMessage = {
        id: genId(),
        role: 'assistant',
        conteudo: '',
        timestamp: new Date(),
        status: 'streaming',
        fontes: [],
      };

      setMessages((prev) => [...prev, userMsg, assistantMsg]);

      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const res = await fetch('/api/ia/stream', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ pergunta: contextualized }),
          signal: controller.signal,
        });

        if (!res.ok || !res.body) {
          throw new Error(`Erro ${res.status}`);
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';
        let conteudo = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const linhas = buffer.split('\n');
          buffer = linhas.pop() || '';

          for (const linha of linhas) {
            const trimmed = linha.trim();
            if (!trimmed.startsWith('data: ')) continue;
            try {
              const evento = JSON.parse(trimmed.slice(6));
              if (evento.tipo === 'token') {
                conteudo += evento.dados.token;
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === assistantMsg.id ? { ...m, conteudo } : m
                  )
                );
              } else if (evento.tipo === 'fontes') {
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === assistantMsg.id ? { ...m, fontes: evento.dados.fontes } : m
                  )
                );
              } else if (evento.tipo === 'erro') {
                throw new Error(evento.dados.message);
              }
            } catch (e: any) {
              if (e?.message && !e.message.includes('JSON')) throw e;
            }
          }
        }

        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMsg.id
              ? { ...m, status: 'completo', conteudo: conteudo || m.conteudo }
              : m
          )
        );
        setHasUnread(true);
      } catch (e: any) {
        if (e?.name === 'AbortError') {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantMsg.id
                ? { ...m, status: 'erro', conteudo: m.conteudo || 'Geração cancelada.' }
                : m
            )
          );
          return;
        }
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMsg.id
              ? {
                  ...m,
                  status: 'erro',
                  conteudo: m.conteudo || 'Desculpe, ocorreu um erro ao processar sua pergunta.',
                }
              : m
          )
        );
      } finally {
        setIsStreaming(false);
        abortRef.current = null;
      }
    },
    [pageContext]
  );

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        close();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, close]);

  useEffect(() => {
    const onToggle = () => {
      setIsOpen((prev) => {
        if (prev) {
          setIsMinimized(false);
          return false;
        }
        setIsMinimized(false);
        setHasUnread(false);
        return true;
      });
    };
    window.addEventListener('ssb:toggle-ai', onToggle as EventListener);
    return () => window.removeEventListener('ssb:toggle-ai', onToggle as EventListener);
  }, []);

  const value = useMemo<AIContextValue>(
    () => ({
      isOpen,
      isMinimized,
      hasUnread,
      messages,
      isStreaming,
      pageContext,
      open,
      close,
      toggle,
      minimize,
      expand,
      ask,
      clear,
      markRead,
    }),
    [
      isOpen,
      isMinimized,
      hasUnread,
      messages,
      isStreaming,
      pageContext,
      open,
      close,
      toggle,
      minimize,
      expand,
      ask,
      clear,
      markRead,
    ]
  );

  return <AIContext.Provider value={value}>{children}</AIContext.Provider>;
}


