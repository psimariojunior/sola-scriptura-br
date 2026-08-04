'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Send, RotateCcw, BookOpen, ChevronRight, Lightbulb, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  role: 'assistant' | 'user';
  content: string;
}

interface SocraticModeProps {
  verseRef?: string;
  verseText?: string;
  onClose?: () => void;
}

const MODES = [
  { id: 'explore', label: 'Explorar', description: 'Descubra o contexto e significado', icon: BookOpen },
  { id: 'devotional', label: 'Devocional', description: 'Aplique à sua vida', icon: Lightbulb },
  { id: 'academic', label: 'Acadêmico', description: 'Estudo profundo com línguas originais', icon: Brain },
] as const;

// Respostas pré-computed para perguntas socráticas comuns (SEM IA)
const SOCRATIC_PRECOMPUTED: Record<string, string[]> = {
  'explore': [
    'O que este texto está dizendo literalmente? Não pense em interpretação ainda — apenas no que as palavras dizem.',
    'Quem são os personagens principais? Qual é o contexto histórico onde isso aconteceu?',
    'Por que isso era importante para as pessoas daquela época? O que estava em jogo?',
    'Como esse versículo se conecta com outros textos da Bíblia? Você consegue pensar em paralelos?',
    'Qual é a mensagem central que o autor quer transmitir? Se tivesse que resumir em uma frase?',
  ],
  'devotional': [
    'O que chama sua atenção neste texto? Por que isso tocou você?',
    'Se isso é verdade, o que muda na forma como você vive hoje?',
    'Existe algo neste texto que desafia uma área da sua vida? Qual?',
    'Como você pode aplicar isso concretamente esta semana?',
    'O que Deus está dizendo para você pessoalmente através destas palavras?',
  ],
  'academic': [
    'Quais são as palavras-chave no original (hebraico/grego)? O que elas significam exatamente?',
    'Qual é a estrutura literária deste trecho? É poesia, narrativa, profecia, epístola?',
    'Como os estudiosos interpretam este versículo? Existem visões diferentes?',
    'Qual é o contexto do livro inteiro? Como este versículo se encaixa naargumentação?',
    'Existem referências cruzadas que iluminam este texto? O que elas adicionam?',
  ],
};

function getSocraticResponse(userMessage: string, mode: string, questionIndex: number): string {
  const questions = SOCRATIC_PRECOMPUTED[mode] || SOCRATIC_PRECOMPUTED['explore'];
  const idx = Math.min(questionIndex, questions.length - 1);

  // Se o usuário deu uma resposta, elogie e faça a próxima pergunta
  if (userMessage.trim().length > 3) {
    const encouragements = [
      'Boa observação! Você está no caminho certo.',
      'Interessante! Continue pensando nessa direção.',
      'Isso é importante! Agora vamos mais fundo.',
      'Você está vendo algo que muitos passam batido.',
      'Excelente! Agora pense sobre isso...',
    ];
    const encouragement = encouragements[Math.floor(Math.random() * encouragements.length)];
    const nextIdx = Math.min(questionIndex + 1, questions.length - 1);
    return `${encouragement}\n\n${questions[nextIdx]}`;
  }

  // Se o usuário não respondeu, repita com variação
  return `Hmm, tente pensar mais sobre isso. ${questions[idx]}`;
}

export function SocraticMode({ verseRef, verseText, onClose }: SocraticModeProps) {
  const [mode, setMode] = useState<'explore' | 'devotional' | 'academic'>('explore');
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [useAI, setUseAI] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const startConversation = useCallback(() => {
    if (!verseRef) return;
    const questions = SOCRATIC_PRECOMPUTED[mode] || SOCRATIC_PRECOMPUTED['explore'];
    const intro = `Vamos estudar **${verseRef}** juntos no modo **${MODES.find(m => m.id === mode)?.label || 'Explorar'}**.\n\n${verseText ? `O texto diz: *"${verseText}"*\n\n` : ''}${questions[0]}`;
    setMessages([{ role: 'assistant', content: intro }]);
    setQuestionIndex(0);
    setTimeout(() => inputRef.current?.focus(), 100);
  }, [verseRef, verseText, mode]);

  const sendMessage = useCallback(async () => {
    if (!input.trim() || loading) return;
    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    // Tenta usar IA primeiro, fallback para pre-computed
    if (useAI) {
      try {
        const pergunta = `Modo socrático (${mode}). Versículo: ${verseRef || 'não definido'}. Texto: ${verseText || 'não disponível'}. Histórico da conversa: ${messages.map(m => `${m.role}: ${m.content}`).join('\núltimo: ')}. Última mensagem do usuário: ${userMessage}. Responda como professor socrático, fazendo perguntas para guiar a descoberta.`;

        const res = await fetch('/api/ia/stream', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ pergunta }),
        });

        if (res.ok) {
          const reader = res.body?.getReader();
          const decoder = new TextDecoder();
          let assistantMessage = '';

          if (reader) {
            while (true) {
              const { done, value } = await reader.read();
              if (done) break;
              const chunk = decoder.decode(value, { stream: true });
              const lines = chunk.split('\n');
              for (const line of lines) {
                if (line.startsWith('data: ')) {
                  try {
                    const data = JSON.parse(line.slice(6));
                    if (data.tipo === 'token' && data.dados?.token) {
                      assistantMessage += data.dados.token;
                      setMessages(prev => [...prev.slice(0, -1), { role: 'user', content: userMessage }, { role: 'assistant', content: assistantMessage }]);
                    }
                  } catch {}
                }
              }
            }
          }

          if (assistantMessage) {
            setLoading(false);
            setQuestionIndex(prev => prev + 1);
            setTimeout(() => inputRef.current?.focus(), 100);
            return;
          }
        }
      } catch {
        // Fallback para pre-computed
      }
    }

    // Fallback: respostas pré-computed (sem IA)
    await new Promise(r => setTimeout(r, 800)); // Simula delay
    const response = getSocraticResponse(userMessage, mode, questionIndex);
    setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    setQuestionIndex(prev => prev + 1);
    setLoading(false);
    setTimeout(() => inputRef.current?.focus(), 100);
  }, [input, loading, messages, mode, verseRef, verseText, questionIndex, useAI]);

  return (
    <div className="flex flex-col h-full bg-[var(--bg)]">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--border)]/40 bg-[var(--surface-raised)]/50">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
          <Brain className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-[var(--content-primary)]">Modo Socrático</h3>
          <p className="text-[11px] text-[var(--content-muted)] truncate">
            {verseRef || 'Selecione um versículo para começar'}
          </p>
        </div>
        <button
          onClick={() => setUseAI(!useAI)}
          className={cn(
            'px-2 py-1 rounded-lg text-[10px] font-medium transition-colors',
            useAI ? 'bg-amber-500/20 text-amber-600' : 'bg-[var(--surface-sunken)] text-[var(--content-muted)]'
          )}
        >
          {useAI ? 'IA ON' : 'IA OFF'}
        </button>
        {onClose && (
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-[var(--surface-sunken)] text-[var(--content-muted)]">
            <RotateCcw className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Mode selector */}
      {messages.length === 0 && (
        <div className="px-4 py-3 border-b border-[var(--border)]/30">
          <div className="flex gap-2">
            {MODES.map(m => (
              <button
                key={m.id}
                onClick={() => setMode(m.id)}
                className={cn(
                  'flex-1 flex flex-col items-center gap-1 px-3 py-2.5 rounded-xl text-xs font-medium transition-all',
                  mode === m.id
                    ? 'bg-[var(--brand-subtle)] text-[var(--brand-default)] ring-1 ring-[var(--brand-default)]/20'
                    : 'bg-[var(--surface-sunken)]/50 text-[var(--content-muted)] hover:text-[var(--content-primary)]'
                )}
              >
                <m.icon className="w-4 h-4" />
                <span>{m.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.length === 0 && !loading && (
          <div className="flex flex-col items-center justify-center h-full text-center px-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-600/20 flex items-center justify-center mb-4">
              <MessageCircle className="w-8 h-8 text-amber-500" />
            </div>
            <h4 className="text-base font-semibold text-[var(--content-primary)] mb-2">
              Aprenda perguntando
            </h4>
            <p className="text-sm text-[var(--content-muted)] max-w-xs">
              Neste modo, a IA não dá respostas — ela faz perguntas para guiar você à descoberta. Estilo seminário teológico.
            </p>
            <p className="text-[10px] text-[var(--content-muted)]/60 mt-2">
              Funciona offline! Sem limite de uso.
            </p>
            {verseRef && (
              <button
                onClick={startConversation}
                className="mt-6 flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 text-white font-medium text-sm hover:shadow-lg hover:scale-105 active:scale-95 transition-all"
              >
                Começar estudo de {verseRef}
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        )}

        <AnimatePresence>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                'flex',
                msg.role === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              <div
                className={cn(
                  'max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed',
                  msg.role === 'user'
                    ? 'bg-[var(--brand-default)] text-[var(--brand-contrast)] rounded-br-md'
                    : 'bg-[var(--surface-sunken)] text-[var(--content-primary)] rounded-bl-md'
                )}
              >
                {msg.content.split('\n').map((line, j) => (
                  <p key={j} className={j > 0 ? 'mt-2' : ''}>
                    {line.split('**').map((part, k) =>
                      k % 2 === 1 ? <strong key={k}>{part}</strong> : part
                    )}
                  </p>
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {loading && (
          <div className="flex justify-start">
            <div className="bg-[var(--surface-sunken)] rounded-2xl rounded-bl-md px-4 py-3">
              <div className="flex gap-1.5">
                <span className="w-2 h-2 bg-amber-400 rounded-full animate-bounce [animation-delay:0s]" />
                <span className="w-2 h-2 bg-amber-400 rounded-full animate-bounce [animation-delay:0.15s]" />
                <span className="w-2 h-2 bg-amber-400 rounded-full animate-bounce [animation-delay:0.3s]" />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="px-4 py-3 border-t border-[var(--border)]/40 bg-[var(--surface-raised)]/30">
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
            placeholder="Sua resposta ou pensamento..."
            className="flex-1 bg-[var(--surface-sunken)]/60 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-amber-500/30 text-[var(--content-primary)] placeholder:text-[var(--content-muted)]"
            disabled={loading}
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || loading}
            className={cn(
              'w-10 h-10 rounded-xl flex items-center justify-center transition-all',
              input.trim() && !loading
                ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white hover:shadow-lg'
                : 'bg-[var(--surface-sunken)] text-[var(--content-muted)]'
            )}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
