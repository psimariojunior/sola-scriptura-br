'use client';

import { useState, useCallback } from 'react';
import { X, Sparkles, FileText, Copy, Download, Loader2, BookOpen, Lightbulb, MessageSquare, Target, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { TODOS_LIVROS } from '@/data/biblia/livros';

interface SermonBuilderProps {
  open: boolean;
  onClose: () => void;
  livro?: string;
  capitulo?: number;
  versiculo?: number;
}

interface SermonOutline {
  titulo: string;
  textoBase: string;
  introducao: string;
  proposicao: string;
  esquema: {
    titulo: string;
    subtitulo: string;
    pontos: string[];
    versiculoReferencia: string;
  }[];
  ilustracoes: string[];
  aplicacao: string;
  conclusao: string;
  referencias: string[];
}

function nomeLivro(abrev: string): string {
  return TODOS_LIVROS.find((l) => l.abreviacao === abrev)?.nome ?? abrev;
}

export function SermonBuilder({ open, onClose, livro = 'jn', capitulo = 3, versiculo = 16 }: SermonBuilderProps) {
  const [sermonText, setSermonText] = useState('');
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'gerar' | 'resultado'>('gerar');
  const [sermonData, setSermonData] = useState<SermonOutline | null>(null);

  const refLabel = `${nomeLivro(livro)} ${capitulo}:${versiculo}`;

  const generateSermon = useCallback(async () => {
    setStreaming(true);
    setError(null);
    setSermonText('');

    const prompt = `Você é um pastor e teólogo experiente. Gere um esquema de sermão COMPLETO e PROFUNDO para a passagem ${refLabel}.

FORMATO DE SAÍDA (JSON):
{
  "titulo": "Título impactante do sermão",
  "textoBase": "O versículo completo em texto",
  "introducao": "Parágrafo de introdução que conecta com a audiência (3-4 frases)",
  "proposicao": "Proposição central do sermão em 1 frase",
  "esquema": [
    {
      "titulo": "Título do ponto (ex: I. O AMOR DE DEUS)",
      "subtitulo": "Subtítulo explicativo",
      "pontos": ["Ponto 1 com explicação", "Ponto 2 com explicação"],
      "versiculoReferencia": "Ref bíblica que sustenta"
    }
  ],
  "ilustracoes": ["Ilustração 1 para o sermão", "Ilustração 2"],
  "aplicacao": "Como aplicar na vida prática (3-4 frases)",
  "conclusao": "Chamada à ação inspiradora",
  "referencias": ["Ref 1", "Ref 2", "Ref 3"]
}

REGRAS:
- Esquema com 3-4 pontos principais
- Cada ponto com 2-3 subpontos
- Ilustrações práticas e atuais
- Aplicação específica e acionável
- Referências bíblicas para cada ponto
- Responda APENAS com o JSON, sem texto adicional`;

    try {
      const res = await fetch('/api/ia/stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pergunta: prompt }),
      });

      if (!res.ok) throw new Error('Erro ao conectar com IA');

      const reader = res.body?.getReader();
      if (!reader) throw new Error('Sem resposta');

      const decoder = new TextDecoder();
      let buf = '';
      let accumulated = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += decoder.decode(value, { stream: true });
        const lines = buf.split('\n');
        buf = lines.pop() || '';
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const json = JSON.parse(line.slice(6));
              if (json.tipo === 'token' && json.dados?.token) {
                accumulated += json.dados.token;
                setSermonText(accumulated);
              } else if (json.tipo === 'erro') {
                setError(json.dados?.message || 'Erro');
              }
            } catch {}
          }
        }
      }

      // Parse the response
      try {
        const jsonMatch = accumulated.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          setSermonData(parsed);
          setActiveTab('resultado');
        }
      } catch {
        setSermonData(null);
      }
    } catch (err: any) {
      setError(err.message || 'Erro ao gerar esquema');
    } finally {
      setStreaming(false);
    }
  }, [livro, capitulo, versiculo, refLabel]);

  const copyToClipboard = () => {
    if (!sermonData) return;
    const text = `
${sermonData.titulo}
${sermonData.textoBase}

INTRODUÇÃO:
${sermonData.introducao}

PROPOSIÇÃO:
${sermonData.proposicao}

ESQUEMA:
${sermonData.esquema.map((p, i) => `
${p.titulo}
${p.subtitulo}
${p.pontos.map((pt, j) => `  ${j + 1}. ${pt}`).join('\n')}
[Ref: ${p.versiculoReferencia}]`).join('\n')}

ILUSTRAÇÕES:
${sermonData.ilustracoes.map((il, i) => `${i + 1}. ${il}`).join('\n')}

APLICAÇÃO:
${sermonData.aplicacao}

CONCLUSÃO:
${sermonData.conclusao}

REFERÊNCIAS:
${sermonData.referencias.join(', ')}
    `.trim();
    navigator.clipboard.writeText(text);
  };

  const content = (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="shrink-0 px-5 py-4 border-b border-[var(--border)]/50 bg-gradient-to-b from-[var(--surface-raised)] to-[var(--surface)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[var(--content-primary)]">
                Construtor de Sermão
              </h2>
              <p className="text-[10px] text-[var(--content-muted)]">
                IA gera esquema completo para {refLabel}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-[var(--surface-sunken)] transition-colors" aria-label="Fechar">
            <X className="w-5 h-5 text-[var(--content-muted)]" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="shrink-0 flex border-b border-[var(--border)]/30">
        <button
          onClick={() => setActiveTab('gerar')}
          className={cn(
            'flex-1 py-3 text-xs font-bold uppercase tracking-wider transition-all',
            activeTab === 'gerar'
              ? 'text-emerald-500 border-b-2 border-emerald-500'
              : 'text-[var(--content-muted)] hover:text-[var(--content-primary)]'
          )}
        >
          Gerar
        </button>
        <button
          onClick={() => setActiveTab('resultado')}
          disabled={!sermonData}
          className={cn(
            'flex-1 py-3 text-xs font-bold uppercase tracking-wider transition-all',
            activeTab === 'resultado'
              ? 'text-emerald-500 border-b-2 border-emerald-500'
              : 'text-[var(--content-muted)] hover:text-[var(--content-primary)] disabled:opacity-50'
          )}
        >
          Resultado
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-5">
        {activeTab === 'gerar' ? (
          <div className="space-y-4">
            {/* Preview do versículo */}
            <div className="rounded-xl bg-gradient-to-br from-emerald-500/5 to-transparent border border-emerald-500/10 p-4">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="w-4 h-4 text-emerald-500" />
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">Texto Base</span>
              </div>
              <p className="text-sm font-serif-body italic text-[var(--content-primary)]">
                {refLabel}
              </p>
            </div>

            <button
              onClick={generateSermon}
              disabled={streaming}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-sm hover:opacity-90 disabled:opacity-50 transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
            >
              {streaming ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Gerando esquema...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Gerar Esquema de Sermão
                </>
              )}
            </button>

            {streaming && sermonText && (
              <div className="rounded-xl bg-[var(--surface)] border border-[var(--border)]/50 p-4">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--content-muted)] mb-2">Gerando...</p>
                <p className="text-sm text-[var(--content-secondary)] whitespace-pre-wrap leading-relaxed">
                  {sermonText.slice(0, 500)}
                  {sermonText.length > 500 && '...'}
                  <span className="inline-block w-0.5 h-4 bg-emerald-500 animate-pulse ml-0.5" />
                </p>
              </div>
            )}

            {error && (
              <p className="text-xs text-red-500 bg-red-500/10 rounded-lg p-3">{error}</p>
            )}
          </div>
        ) : sermonData ? (
          <div className="space-y-6">
            {/* Título */}
            <div className="text-center">
              <h3 className="text-xl font-display font-bold text-[var(--content-primary)]">
                {sermonData.titulo}
              </h3>
              <p className="text-xs text-[var(--content-muted)] mt-1">
                {sermonData.textoBase}
              </p>
            </div>

            {/* Introdução */}
            <div className="rounded-xl bg-gradient-to-br from-blue-500/5 to-transparent border border-blue-500/10 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="w-4 h-4 text-blue-500" />
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400">Introdução</span>
              </div>
              <p className="text-sm text-[var(--content-secondary)] leading-relaxed">
                {sermonData.introducao}
              </p>
            </div>

            {/* Proposição */}
            <div className="rounded-xl bg-gradient-to-br from-amber-500/5 to-transparent border border-amber-500/10 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-4 h-4 text-amber-500" />
                <span className="text-xs font-bold text-amber-600 dark:text-amber-400">Proposição</span>
              </div>
              <p className="text-sm font-medium text-[var(--content-primary)] italic">
                &ldquo;{sermonData.proposicao}&rdquo;
              </p>
            </div>

            {/* Esquema */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--content-muted)] mb-3">
                Esquema do Sermão
              </h4>
              <div className="space-y-3">
                {sermonData.esquema.map((ponto, i) => (
                  <div key={i} className="rounded-xl border border-[var(--border)]/50 bg-[var(--surface)] p-4">
                    <h5 className="text-sm font-bold text-[var(--content-primary)] mb-1">
                      {ponto.titulo}
                    </h5>
                    <p className="text-xs text-[var(--content-muted)] mb-2">
                      {ponto.subtitulo}
                    </p>
                    <ul className="space-y-1.5">
                      {ponto.pontos.map((pt, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-[var(--content-secondary)]">
                          <span className="text-emerald-500 mt-1">•</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="text-[10px] text-emerald-500 mt-2 font-medium">
                      Ref: {ponto.versiculoReferencia}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Ilustrações */}
            <div className="rounded-xl bg-gradient-to-br from-purple-500/5 to-transparent border border-purple-500/10 p-4">
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare className="w-4 h-4 text-purple-500" />
                <span className="text-xs font-bold text-purple-600 dark:text-purple-400">Ilustrações</span>
              </div>
              <ul className="space-y-2">
                {sermonData.ilustracoes.map((il, i) => (
                  <li key={i} className="text-sm text-[var(--content-secondary)] leading-relaxed flex items-start gap-2">
                    <span className="text-purple-500 mt-1">💡</span>
                    <span>{il}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Aplicação */}
            <div className="rounded-xl bg-gradient-to-br from-rose-500/5 to-transparent border border-rose-500/10 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-4 h-4 text-rose-500" />
                <span className="text-xs font-bold text-rose-600 dark:text-rose-400">Aplicação Prática</span>
              </div>
              <p className="text-sm text-[var(--content-secondary)] leading-relaxed">
                {sermonData.aplicacao}
              </p>
            </div>

            {/* Conclusão */}
            <div className="rounded-xl bg-gradient-to-br from-emerald-500/5 to-transparent border border-emerald-500/10 p-4">
              <div className="flex items-center gap-2 mb-2">
                <ArrowRight className="w-4 h-4 text-emerald-500" />
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">Conclusão</span>
              </div>
              <p className="text-sm text-[var(--content-secondary)] leading-relaxed">
                {sermonData.conclusao}
              </p>
            </div>

            {/* Referências */}
            <div className="rounded-xl bg-[var(--surface)] border border-[var(--border)]/30 p-4">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--content-muted)] mb-2">
                Referências Bíblicas
              </p>
              <div className="flex flex-wrap gap-2">
                {sermonData.referencias.map((ref, i) => (
                  <span key={i} className="text-[10px] px-2 py-1 rounded-full bg-[var(--surface-sunken)] text-[var(--content-muted)]">
                    {ref}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={copyToClipboard}
                className="flex-1 py-2.5 rounded-xl border border-[var(--border)] text-xs font-medium text-[var(--content-secondary)] hover:bg-[var(--surface-sunken)] transition-colors flex items-center justify-center gap-2"
              >
                <Copy className="w-3.5 h-3.5" />
                Copiar Texto
              </button>
              <button
                onClick={() => setActiveTab('gerar')}
                className="flex-1 py-2.5 rounded-xl bg-[var(--brand-default)] text-white text-xs font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Gerar Outro
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 mx-auto mb-3 text-[var(--content-muted)] opacity-20" strokeWidth={1} />
            <p className="text-sm text-[var(--content-muted)]">
              Gere um esquema de sermão para começar.
            </p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-[var(--surface-raised)] rounded-t-3xl shadow-2xl h-[90vh]"
          >
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-12 h-1.5 rounded-full bg-[var(--content-muted)] opacity-20" />
            </div>
            {content}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
