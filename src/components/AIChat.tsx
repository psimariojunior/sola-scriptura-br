'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { linkificarReferenciasHTML } from '@/components/VersiculoLink';

interface Mensagem {
  id: string;
  role: 'user' | 'assistant';
  conteudo: string;
  fontes?: FonteResposta[];
  timestamp: Date;
  status?: 'enviando' | 'streaming' | 'completo' | 'erro';
}

interface FonteResposta {
  tipo: string;
  referencia: string;
  relevancia: number;
}

interface AIChatProps {
  className?: string;
  tradicao?: string;
  onTradicaoChange?: (tradicao: string) => void;
}

const TRADICOES = [
  { valor: '', label: 'Geral' },
  { valor: 'reformada', label: 'Reformada' },
  { valor: 'catolica', label: 'Católica' },
  { valor: 'luterana', label: 'Luterana' },
  { valor: 'pentecostal', label: 'Pentecostal' },
  { valor: 'baptista', label: 'Batista' },
  { valor: 'metodista', label: 'Metodista' },
  { valor: 'presbiteriana', label: 'Presbiteriana' },
  { valor: 'anglicana', label: 'Anglicana' },
  { valor: 'ortodoxa', label: 'Ortodoxa' },
];

function gerarId(): string {
  return `msg_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

function parseMarkdown(texto: string): string {
  let html = texto;

  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, '<pre class="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg overflow-x-auto text-sm font-mono my-2"><code>$2</code></pre>');

  html = html.replace(/`([^`]+)`/g, '<code class="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">$1</code>');

  html = html.replace(/^### (.+)$/gm, '<h3 class="text-lg font-bold mt-4 mb-2 text-gray-900 dark:text-gray-100">$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2 class="text-xl font-bold mt-5 mb-2 text-gray-900 dark:text-gray-100">$1</h2>');
  html = html.replace(/^# (.+)$/gm, '<h1 class="text-2xl font-bold mt-6 mb-3 text-gray-900 dark:text-gray-100">$1</h1>');

  html = html.replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold">$1</strong>');
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');

  html = html.replace(/^- (.+)$/gm, '<li class="ml-4 mb-1">$1</li>');
  html = html.replace(/^(\d+)\. (.+)$/gm, '<li class="ml-4 mb-1"><span class="font-semibold">$1.</span> $2</li>');

  html = html.replace(/(<li.*<\/li>\n?)+/g, (match) => `<ul class="list-disc my-2">${match}</ul>`);

  html = html.replace(/^---$/gm, '<hr class="my-4 border-gray-200 dark:border-gray-700" />');

  html = html.replace(/^> (.+)$/gm, '<blockquote class="border-l-4 border-blue-400 pl-4 italic text-gray-600 dark:text-gray-400 my-2">$1</blockquote>');

  html = html.replace(/\n{2,}/g, '</p><p class="mb-2">');
  html = html.replace(/\n/g, '<br />');

  html = `<p class="mb-2">${html}</p>`;

  return html;
}

function formatarTempo(date: Date): string {
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

export default function AIChat({ className = '', tradicao: tradicaoExterna, onTradicaoChange }: AIChatProps) {
  const [mensagens, setMensagens] = useState<Mensagem[]>([]);
  const [input, setInput] = useState('');
  const [tradicaoInterna, setTradicaoInterna] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  const controlado = onTradicaoChange !== undefined;
  const tradicao = controlado ? tradicaoExterna ?? '' : tradicaoInterna;
  const setTradicao = controlado ? onTradicaoChange : setTradicaoInterna;

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [mensagens, scrollToBottom]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  const enviarPergunta = useCallback(async () => {
    const texto = input.trim();
    if (!texto || enviando) return;

    setErro(null);
    setInput('');

    const msgUser: Mensagem = {
      id: gerarId(),
      role: 'user',
      conteudo: texto,
      timestamp: new Date(),
      status: 'completo',
    };

    const msgAssistant: Mensagem = {
      id: gerarId(),
      role: 'assistant',
      conteudo: '',
      timestamp: new Date(),
      status: 'streaming',
      fontes: [],
    };

    setMensagens(prev => [...prev, msgUser, msgAssistant]);
    setEnviando(true);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const resposta = await fetch('/api/ia/stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pergunta: texto,
          tradicao: tradicao || undefined,
        }),
        signal: controller.signal,
      });

      if (!resposta.ok || !resposta.body) {
        throw new Error(`Erro ${resposta.status}`);
      }

      const reader = resposta.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let conteudoCompleto = '';

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

            switch (evento.tipo) {
              case 'token':
                conteudoCompleto += evento.dados.token;
                setMensagens(prev =>
                  prev.map(m =>
                    m.id === msgAssistant.id
                      ? { ...m, conteudo: conteudoCompleto }
                      : m,
                  ),
                );
                break;

              case 'fontes':
                setMensagens(prev =>
                  prev.map(m =>
                    m.id === msgAssistant.id
                      ? { ...m, fontes: evento.dados.fontes }
                      : m,
                  ),
                );
                break;

              case 'erro':
                throw new Error(evento.dados.message);

              case 'completo':
                break;
            }
          } catch (e: any) {
            if (e.message && !e.message.includes('JSON')) {
              throw e;
            }
          }
        }
      }

      setMensagens(prev =>
        prev.map(m =>
          m.id === msgAssistant.id
            ? { ...m, status: 'completo', conteudo: conteudoCompleto || m.conteudo }
            : m,
        ),
      );
    } catch (e: any) {
      if (e.name === 'AbortError') return;

      setErro(e.message || 'Erro ao obter resposta');
      setMensagens(prev =>
        prev.map(m =>
          m.id === msgAssistant.id
            ? {
                ...m,
                status: 'erro',
                conteudo: m.conteudo || 'Desculpe, ocorreu um erro ao processar sua pergunta. Tente novamente.',
              }
            : m,
        ),
      );
    } finally {
      setEnviando(false);
      abortRef.current = null;
    }
  }, [input, enviando, tradicao]);

  const pararGeracao = useCallback(() => {
    abortRef.current?.abort();
    // Marca a mensagem assistant em streaming como completa para que a UI
    // saia do estado "gerando" (mostra botao copiar, para spinner etc.)
    setMensagens(prev =>
      prev.map(m =>
        m.status === 'streaming' ? { ...m, status: 'completo' as const } : m,
      ),
    );
    setEnviando(false);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        enviarPergunta();
      }
    },
    [enviarPergunta],
  );

  const copiarMensagem = useCallback((conteudo: string) => {
    navigator.clipboard.writeText(conteudo).catch(() => {});
  }, []);

  const exportarConversa = useCallback(() => {
    const linhas = mensagens.map(m => {
      const prefix = m.role === 'user' ? '## Você' : '## Assistente IA';
      const fontes = m.fontes?.length
        ? `\n\n*Fontes: ${m.fontes.map(f => f.referencia).join(', ')}*`
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
  }, [mensagens]);

  const limparConversa = useCallback(() => {
    setMensagens([]);
    setErro(null);
  }, []);

  return (
    <div className={`flex flex-col h-full bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-bold">
            IA
          </div>
          <div>
            <h3 className="font-semibold text-sm text-gray-900 dark:text-gray-100">
              Assistente Bíblico
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Powered by GPT-4o + RAG
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
        {!controlado && (
          <select
            value={tradicao}
            onChange={e => setTradicao(e.target.value)}
            className="text-xs border border-gray-200 dark:border-gray-600 rounded-lg px-2 py-1 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            {TRADICOES.map(t => (
              <option key={t.valor} value={t.valor}>
                {t.label}
              </option>
            ))}
          </select>
        )}
          <button
            onClick={exportarConversa}
            disabled={mensagens.length === 0}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-30 transition-colors"
            title="Exportar conversa"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </button>
          <button
            onClick={limparConversa}
            disabled={mensagens.length === 0}
            className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-30 transition-colors"
            title="Limpar conversa"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {mensagens.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center text-gray-400 dark:text-gray-500">
            <div className="w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <p className="font-medium text-gray-600 dark:text-gray-300 mb-1">
              Assistente Bíblico com IA
            </p>
            <p className="text-sm max-w-xs">
              Faça perguntas sobre teologia, exegese, personagens bíblicos, línguas originais e mais.
            </p>
            <div className="flex flex-wrap gap-2 mt-4 justify-center">
              {['O que é graça?', 'Quem foi Paulo?', 'Analise João 3:16'].map(sugestao => (
                <button
                  key={sugestao}
                  onClick={() => { setInput(sugestao); inputRef.current?.focus(); }}
                  className="text-xs px-3 py-1.5 rounded-full border border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  {sugestao}
                </button>
              ))}
            </div>
          </div>
        )}

        {mensagens.map(msg => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                msg.role === 'user'
                  ? 'bg-blue-500 text-white rounded-br-md'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-bl-md'
              }`}
            >
              {msg.role === 'assistant' ? (
                            <div className="prose prose-sm dark:prose-invert max-w-none text-sm leading-relaxed">
                              {linkificarReferenciasHTML(parseMarkdown(msg.conteudo), `aichat-${msg.id}`)}
                            </div>
              ) : (
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.conteudo}</p>
              )}

              {msg.role === 'assistant' && msg.fontes && msg.fontes.length > 0 && (
                <div className="mt-3 pt-2 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Fontes:</p>
                  <div className="flex flex-wrap gap-1">
                    {msg.fontes.map((fonte, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300"
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
                <span className={`text-xs ${
                  msg.role === 'user'
                    ? 'text-blue-100'
                    : 'text-gray-400 dark:text-gray-500'
                }`}>
                  {formatarTempo(msg.timestamp)}
                </span>
                {msg.role === 'assistant' && msg.status !== 'streaming' && msg.conteudo && (
                  <button
                    onClick={() => copiarMensagem(msg.conteudo)}
                    className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    title="Copiar"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {erro && (
          <div className="flex justify-center">
            <div className="text-xs text-red-500 bg-red-50 dark:bg-red-900/20 px-3 py-1.5 rounded-lg">
              {erro}
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-end gap-2">
          <textarea
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Faça sua pergunta bíblica... (Enter para enviar)"
            rows={1}
            className="flex-1 resize-none rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2.5 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent max-h-32"
            style={{ minHeight: '42px' }}
            onInput={e => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = 'auto';
              target.style.height = Math.min(target.scrollHeight, 128) + 'px';
            }}
            disabled={enviando}
          />
          {enviando ? (
            <button
              onClick={pararGeracao}
              className="flex items-center justify-center w-10 h-10 rounded-xl bg-red-500 text-white hover:bg-red-600 transition-colors flex-shrink-0"
              title="Parar geração"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <rect x="6" y="6" width="12" height="12" rx="2" />
              </svg>
            </button>
          ) : (
            <button
              onClick={enviarPergunta}
              disabled={!input.trim()}
              className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex-shrink-0"
              title="Enviar (Enter)"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          )}
        </div>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1.5 text-center">
          Pressione <kbd className="px-1 py-0.5 rounded border border-gray-300 dark:border-gray-600 text-[10px]">/</kbd> para focar &middot;{' '}
          <kbd className="px-1 py-0.5 rounded border border-gray-300 dark:border-gray-600 text-[10px]">Shift+Enter</kbd> nova linha
        </p>
      </div>
    </div>
  );
}
