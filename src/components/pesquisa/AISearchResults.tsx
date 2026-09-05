'use client';

import { BookOpen, ExternalLink, Loader2, Sparkles, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import type { AIVerseRef } from '@/hooks/pesquisa/useAISearch';
import { hrefBiblia } from '@/lib/bibliaHref';
import { cn } from '@/lib/utils';

interface AISearchResultsProps {
  explicacao: string;
  versiculos: AIVerseRef[];
  streaming: boolean;
  error: string | null;
  tempoMs: number;
}

const RELEVANCIA_CONFIG: Record<string, { bg: string; text: string; border: string; label: string }> = {
  alta: { bg: 'bg-emerald-500/10', text: 'text-emerald-600 dark:text-emerald-400', border: 'border-emerald-500/20', label: 'Alta' },
  media: { bg: 'bg-amber-500/10', text: 'text-amber-600 dark:text-amber-400', border: 'border-amber-500/20', label: 'Média' },
  baixa: { bg: 'bg-gray-500/10', text: 'text-gray-600 dark:text-gray-400', border: 'border-gray-500/20', label: 'Baixa' },
};

export function AISearchResults({ explicacao, versiculos, streaming, error, tempoMs }: AISearchResultsProps) {
  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-red-200 dark:border-red-800/50 bg-gradient-to-br from-red-500/5 to-transparent p-6"
      >
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      </motion.div>
    );
  }

  if (!explicacao && !streaming) return null;

  return (
    <div className="space-y-6">
      {/* Explanation */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-[var(--border)]/50 bg-gradient-to-br from-[var(--surface-raised)] to-[var(--surface)] p-6 shadow-lg"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[var(--content-primary)]">Resposta da IA</h3>
            <p className="text-[10px] text-[var(--content-muted)]">
              Análise teológica via Groq (llama-3.3-70b)
              {tempoMs > 0 && ` · ${tempoMs}ms`}
            </p>
          </div>
        </div>
        <div className="prose prose-sm dark:prose-invert max-w-none">
          {explicacao.split('\n').filter(p => p.trim()).map((paragraph, i) => (
            <p key={i} className="text-sm text-[var(--content-secondary)] leading-relaxed mb-3">
              {paragraph}
            </p>
          ))}
          {streaming && (
            <span className="inline-block w-0.5 h-4 bg-purple-500 animate-pulse ml-0.5" />
          )}
        </div>
      </motion.div>

      {/* Verse Cards */}
      {versiculos.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-4 h-4 text-[var(--brand-default)]" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--content-muted)]">
              Versículos Relevantes
            </h4>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--brand-default)]/10 text-[var(--brand-default)] font-bold">
              {versiculos.length}
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {versiculos.map((v, i) => {
              const href = hrefBiblia(v.livro, v.capitulo, v.versiculo);
              const rel = RELEVANCIA_CONFIG[v.relevancia] || RELEVANCIA_CONFIG.media;

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i }}
                >
                  <Link
                    href={href}
                    className={cn(
                      'group block rounded-xl border bg-gradient-to-br from-[var(--surface-raised)] to-[var(--surface)] p-4',
                      'hover:shadow-lg transition-all duration-200',
                      rel.border
                    )}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-base font-bold text-[var(--content-primary)] group-hover:text-[var(--brand-default)] transition-colors">
                        {v.referencia}
                      </span>
                      <ArrowRight className="w-4 h-4 text-[var(--content-muted)] opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    {v.texto && (
                      <p className="text-xs text-[var(--content-secondary)] line-clamp-3 mb-3 leading-relaxed italic">
                        &ldquo;{v.texto}&rdquo;
                      </p>
                    )}
                    <span className={cn(
                      'inline-flex items-center text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider',
                      rel.bg, rel.text
                    )}>
                      Relevância {rel.label}
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Loading state */}
      {streaming && versiculos.length === 0 && (
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center gap-4 text-[var(--content-muted)]">
            <div className="relative">
              <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
              <div className="absolute inset-0 w-8 h-8 rounded-full bg-purple-500/20 animate-ping" />
            </div>
            <div>
              <p className="text-sm font-medium">Analisando sua pergunta...</p>
              <p className="text-[10px] text-[var(--content-muted)]">Buscando versículos relevantes</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
