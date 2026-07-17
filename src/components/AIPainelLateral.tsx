'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  X,
  Minus,
  Send,
  Trash2,
  Download,
  Copy,
  Check,
  BookOpen,
  ChevronRight,
  Loader2,
} from 'lucide-react';
import { useAI } from '@/hooks/useAI';
import { type AIMessage } from '@/contexts/AIContext';
import { useToast } from '@/hooks/useToast';
import { linkificarReferenciasHTML } from '@/components/VersiculoLink';

function parseMarkdown(texto: string): string {
  let html = texto;
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, '<pre class="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg overflow-x-auto text-sm font-mono my-2"><code>$2</code></pre>');
  html = html.replace(/`([^`]+)`/g, '<code class="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">$1</code>');
  html = html.replace(/^### (.+)$/gm, '<h3 class="text-lg font-bold mt-4 mb-2">$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2 class="text-xl font-bold mt-5 mb-2">$1</h2>');
  html = html.replace(/^# (.+)$/gm, '<h1 class="text-2xl font-bold mt-6 mb-3">$1</h1>');
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold">$1</strong>');
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
  html = html.replace(/^- (.+)$/gm, '<li class="ml-4 mb-1">$1</li>');
  html = html.replace(/^(\d+)\. (.+)$/gm, '<li class="ml-4 mb-1"><span class="font-semibold">$1.</span> $2</li>');
  html = html.replace(/(<li.*<\/li>\n?)+/g, (match) => `<ul class="list-disc my-2">${match}</ul>`);
  html = html.replace(/^---$/gm, '<hr class="my-4 border-gray-200 dark:border-gray-700" />');
  html = html.replace(/^> (.+)$/gm, '<blockquote class="border-l-4 border-blue-400 pl-4 italic my-2">$1</blockquote>');
  html = html.replace(/\n{2,}/g, '</p><p class="mb-2">');
  html = html.replace(/\n/g, '<br />');
  html = `<p class="mb-2">${html}</p>`;
  return html;
}

function formatarHora(date: Date): string {
  return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}

function iconTipoFonte(tipo: string): string {
  const icones: Record<string, string> = {
    versiculo: '📖',
    doutrina: '⛪',
    personagem: '👤',
    grego: '🇬🇷',
    hebraico: '🇮🇱',
    historia: '📜',
    geografia: '🗺️',
    dicionario: '📚',
    lexico: '🔤',
    teologia: '✝️',
  };
  return icones[tipo] || '📄';
}

interface AIPainelLateralProps {
  onOpenChange?: (open: boolean) => void;
}

export function AIPainelLateral({ onOpenChange }: AIPainelLateralProps) {
  const { isOpen, isMinimized, messages, isStreaming, pageContext, close, minimize, clear, ask } =
    useAI();
  const { toast } = useToast();
  const [input, setInput] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const lastCloseSignalRef = useRef(false);

  useEffect(() => {
    if (isOpen) {
      onOpenChange?.(true);
      lastCloseSignalRef.current = false;
    } else if (!lastCloseSignalRef.current) {
      onOpenChange?.(false);
      lastCloseSignalRef.current = true;
    }
  }, [isOpen, onOpenChange]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isStreaming]);

  const enviar = useCallback(async () => {
    const texto = input.trim();
    if (!texto || isStreaming) return;
    setInput('');
    try {
      await ask(texto);
    } catch {
      toast({
        title: 'Erro',
        description: 'Não foi possível enviar a pergunta.',
        variant: 'error',
      });
    }
  }, [input, isStreaming, ask, toast]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        enviar();
      }
    },
    [enviar]
  );

  const copiar = useCallback(
    async (msg: AIMessage) => {
      try {
        await navigator.clipboard.writeText(msg.conteudo);
        setCopiedId(msg.id);
        setTimeout(() => setCopiedId(null), 2000);
        toast({ title: 'Copiado!', variant: 'success' });
      } catch {
        toast({ title: 'Erro ao copiar', variant: 'error' });
      }
    },
    [toast]
  );

  const exportar = useCallback(() => {
    if (messages.length === 0) return;
    const linhas = messages.map((m: AIMessage) => {
      const prefix = m.role === 'user' ? '## Você' : '## Assistente IA';
      const fontes = m.fontes?.length
        ? `\n\n*Fontes: ${m.fontes.map((f) => f.referencia).join(', ')}*`
        : '';
      return `${prefix}\n\n${m.conteudo}${fontes}`;
    });
    const blob = new Blob([linhas.join('\n\n---\n\n')], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `conversa-ia-${new Date().toISOString().slice(0, 10)}.md`;
    a.click();
    URL.revokeObjectURL(url);
    toast({ title: 'Conversa exportada', variant: 'success' });
  }, [messages, toast]);

  const limpar = useCallback(() => {
    if (messages.length === 0) return;
    clear();
    toast({ title: 'Conversa limpa', variant: 'info' });
  }, [messages.length, clear, toast]);

  const usarSugestao = useCallback(
    (s: string) => {
      setInput(s);
      setTimeout(() => inputRef.current?.focus(), 0);
    },
    []
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[80] bg-black/30 backdrop-blur-sm md:hidden"
            onClick={close}
            aria-hidden="true"
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed top-0 right-0 z-[90] h-full w-full md:w-[40%] md:min-w-[420px] md:max-w-[640px] bg-background border-l border-border/40 shadow-2xl flex flex-col"
            role="dialog"
            aria-label="Assistente IA"
          >
            {/* Header */}
            <div className="flex items-center justify-between gap-2 px-4 py-3 border-b border-border/30 bg-card/40">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h2 className="font-display text-sm font-semibold truncate">
                    Assistente Bíblico
                  </h2>
                  <p className="text-[10px] text-muted-foreground truncate">
                    {pageContext.titulo ?? 'Contexto geral'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                {messages.length > 0 && (
                  <>
                    <button
                      onClick={exportar}
                      className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                      title="Exportar conversa"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                    <button
                      onClick={limpar}
                      className="p-1.5 rounded-lg text-muted-foreground hover:text-red-500 hover:bg-red-500/10 transition-colors"
                      title="Limpar conversa"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </>
                )}
                <button
                  onClick={minimize}
                  className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                  title="Minimizar"
                  aria-label="Minimizar painel"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <button
                  onClick={close}
                  className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                  title="Fechar"
                  aria-label="Fechar painel"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
                  {messages.length === 0 ? (
                    <div className="flex flex-col h-full">
                      <div className="text-center py-6">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 flex items-center justify-center mx-auto mb-3">
                          <Sparkles className="w-7 h-7 text-blue-500" />
                        </div>
                        <p className="font-medium text-sm mb-1">
                          Como posso ajudar?
                        </p>
                        <p className="text-xs text-muted-foreground max-w-xs mx-auto">
                          Estou ciente do seu contexto atual. Faça uma pergunta ou escolha uma sugestão.
                        </p>
                      </div>

                      {pageContext.sugestoes.length > 0 && (
                        <div className="space-y-2">
                          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                            Sugestões para esta página
                          </p>
                          {pageContext.sugestoes.map((s: string, i: number) => (
                            <button
                              key={i}
                              onClick={() => usarSugestao(s)}
                              className="w-full flex items-center gap-2 px-3 py-2.5 text-left text-xs rounded-lg border border-border/40 hover:border-primary/30 hover:bg-primary/5 transition-all group"
                            >
                              <BookOpen className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                              <span className="flex-1 truncate">{s}</span>
                              <ChevronRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <>
                      {messages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`flex ${
                            msg.role === 'user' ? 'justify-end' : 'justify-start'
                          }`}
                        >
                          <div
                            className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 ${
                              msg.role === 'user'
                                ? 'bg-primary text-primary-foreground rounded-br-md'
                                : 'bg-muted/40 text-foreground rounded-bl-md'
                            }`}
                          >
                            {msg.role === 'assistant' ? (
                              <div className="prose prose-sm dark:prose-invert max-w-none text-sm leading-relaxed">
                                {linkificarReferenciasHTML(
                                  parseMarkdown(msg.conteudo || (msg.status === 'streaming' ? '' : 'Sem conteúdo')),
                                  `aipainel-${msg.id}`,
                                )}
                              </div>
                            ) : (
                              <p className="text-sm leading-relaxed whitespace-pre-wrap">
                                {msg.conteudo}
                              </p>
                            )}

                            {msg.role === 'assistant' && msg.fontes && msg.fontes.length > 0 && (
                              <div className="mt-2 pt-2 border-t border-border/30">
                                <p className="text-[10px] font-medium text-muted-foreground mb-1">
                                  Fontes:
                                </p>
                                <div className="flex flex-wrap gap-1">
                                  {msg.fontes.map((fonte, i) => (
                                    <span
                                      key={i}
                                      className="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded-full bg-background/50 border border-border/30"
                                      title={`Relevância: ${Math.round(fonte.relevancia * 100)}%`}
                                    >
                                      <span>{iconTipoFonte(fonte.tipo)}</span>
                                      <span>{fonte.referencia}</span>
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}

                            <div className={`flex items-center gap-2 mt-1 ${
                              msg.role === 'user' ? 'justify-end' : 'justify-between'
                            }`}>
                              <span className={`text-[10px] ${
                                msg.role === 'user'
                                  ? 'text-primary-foreground/70'
                                  : 'text-muted-foreground/70'
                              }`}>
                                {formatarHora(msg.timestamp)}
                              </span>
                              {msg.role === 'assistant' && msg.conteudo && msg.status !== 'streaming' && (
                                <button
                                  onClick={() => copiar(msg)}
                                  className="text-[10px] text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                                >
                                  {copiedId === msg.id ? (
                                    <>
                                      <Check className="w-3 h-3" />
                                      Copiado
                                    </>
                                  ) : (
                                    <>
                                      <Copy className="w-3 h-3" />
                                      Copiar
                                    </>
                                  )}
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}

                      {isStreaming && messages[messages.length - 1]?.conteudo === '' && (
                        <div className="flex justify-start">
                          <div className="bg-muted/40 rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-2">
                            <Loader2 className="w-3.5 h-3.5 animate-spin text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">
                              Pensando...
                            </span>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="border-t border-border/30 bg-card/40 p-3">
                  <div className="flex items-end gap-2">
                    <textarea
                      ref={inputRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Pergunte algo... (Enter envia)"
                      rows={1}
                      disabled={isStreaming}
                      className="flex-1 resize-none rounded-xl border border-border/40 bg-background px-3.5 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-transparent max-h-32 disabled:opacity-50"
                      style={{ minHeight: '42px' }}
                      onInput={(e) => {
                        const t = e.target as HTMLTextAreaElement;
                        t.style.height = 'auto';
                        t.style.height = Math.min(t.scrollHeight, 128) + 'px';
                      }}
                    />
                    <button
                      onClick={enviar}
                      disabled={!input.trim() || isStreaming}
                      className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shrink-0"
                      title="Enviar (Enter)"
                      aria-label="Enviar pergunta"
                    >
                      {isStreaming ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Send className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-1.5 text-center">
                    <kbd className="px-1 py-0.5 rounded border border-border/30">Enter</kbd> enviar ·{' '}
                    <kbd className="px-1 py-0.5 rounded border border-border/30">Shift+Enter</kbd> nova linha ·{' '}
                    <kbd className="px-1 py-0.5 rounded border border-border/30">Esc</kbd> fechar
                  </p>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
