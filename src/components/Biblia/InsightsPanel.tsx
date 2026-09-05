'use client';

import { useState, useEffect, useMemo } from 'react';
import { Sparkles, X, MessageSquare, Link2, Languages, ChevronDown, ArrowRight, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useInsights } from '@/hooks/biblia/useInsights';
import { hrefBiblia } from '@/lib/bibliaHref';

interface InsightsPanelProps {
  open: boolean;
  onClose: () => void;
  livro: string;
  capitulo: number;
  versiculo: number;
  livroNome: string;
  isMobile: boolean;
}

export function InsightsPanel({
  open,
  onClose,
  livro,
  capitulo,
  versiculo,
  livroNome,
  isMobile,
}: InsightsPanelProps) {
  const insight = useInsights(livro, capitulo, versiculo);
  const [expanded, setExpanded] = useState<string | null>(null);
  const refLabel = `${livroNome} ${capitulo}:${versiculo}`;

  const content = (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/20">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--content-muted)]">
              Insights
            </span>
            <p className="text-[10px] text-[var(--content-muted)]">{refLabel}</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg hover:bg-[var(--surface-sunken)] transition-colors"
          aria-label="Fechar insights"
        >
          <X className="w-4 h-4 text-[var(--content-muted)]" />
        </button>
      </div>

      {/* Loading */}
      {insight.loading && (
        <div className="flex items-center justify-center py-6">
          <div className="flex gap-1.5">
            <span className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" />
            <span className="w-2 h-2 bg-amber-500 rounded-full animate-bounce [animation-delay:0.15s]" />
            <span className="w-2 h-2 bg-amber-500 rounded-full animate-bounce [animation-delay:0.3s]" />
          </div>
        </div>
      )}

      {/* Comment Card */}
      {insight.comentario && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn(
            'rounded-xl border-l-[3px] border-amber-500 bg-gradient-to-r from-amber-500/5 to-transparent p-4 cursor-pointer transition-all hover:shadow-md',
            expanded === 'comentario' && 'ring-1 ring-amber-500/20'
          )}
          onClick={() => setExpanded(expanded === 'comentario' ? null : 'comentario')}
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-full bg-amber-500/10 flex items-center justify-center">
              <MessageSquare className="w-3 h-3 text-amber-500" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Comentário
            </span>
          </div>
          <p className={cn(
            'text-sm text-[var(--content-secondary)] leading-relaxed',
            expanded !== 'comentario' && 'line-clamp-3'
          )}>
            {insight.comentario.texto}
          </p>
          <div className="flex items-center justify-between mt-2">
            <p className="text-[11px] font-medium text-amber-600/70 dark:text-amber-400/70">
              — {insight.comentario.autor}
            </p>
            {expanded !== 'comentario' && (
              <span className="text-[10px] text-amber-500 inline-flex items-center gap-1 font-medium">
                Expandir <ChevronDown className="w-3 h-3" />
              </span>
            )}
          </div>
        </motion.div>
      )}

      {/* Cross-Reference Card */}
      {insight.crossRefTop && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Link
            href={hrefBiblia(
              insight.crossRefTop.referencia.split(' ')[0]?.toLowerCase().replace(/\s+/g, '') || livro,
              parseInt(insight.crossRefTop.referencia.split(' ')[1]?.split(':')[0] || String(capitulo)),
              parseInt(insight.crossRefTop.referencia.split(':')[1] || String(versiculo))
            )}
            className="block rounded-xl border-l-[3px] border-cyan-500 bg-gradient-to-r from-cyan-500/5 to-transparent p-4 hover:shadow-md transition-all group"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-full bg-cyan-500/10 flex items-center justify-center">
                <Link2 className="w-3 h-3 text-cyan-500" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                Referência Cruzada
              </span>
            </div>
            <p className="text-sm font-bold text-[var(--content-primary)] group-hover:text-cyan-500 transition-colors">
              {insight.crossRefTop.referencia}
            </p>
            {insight.crossRefTop.texto && (
              <p className="text-[11px] text-[var(--content-muted)] mt-1 leading-relaxed">
                {insight.crossRefTop.texto}
              </p>
            )}
            <span className="text-[10px] text-cyan-500 inline-flex items-center gap-1 font-medium mt-2">
              Abrir no leitor <ArrowRight className="w-3 h-3" />
            </span>
          </Link>
        </motion.div>
      )}

      {/* Keyword Card */}
      {insight.palavraChave && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Link
            href={`/idiomas?strong=${insight.palavraChave.strong}`}
            className="block rounded-xl border-l-[3px] border-violet-500 bg-gradient-to-r from-violet-500/5 to-transparent p-4 hover:shadow-md transition-all group"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-full bg-violet-500/10 flex items-center justify-center">
                <Languages className="w-3 h-3 text-violet-500" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400">
                Palavra-Chave
              </span>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-sm font-bold text-[var(--content-primary)] group-hover:text-violet-500 transition-colors">
                {insight.palavraChave.palavra}
              </p>
              <span className="text-[10px] font-mono text-[var(--content-muted)]">
                {insight.palavraChave.strong}
              </span>
            </div>
            <p className="text-[11px] text-[var(--content-muted)] mt-1 leading-relaxed">
              {insight.palavraChave.definicao}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span
                className="text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider"
                style={{
                  backgroundColor: insight.palavraChave.idioma === 'hebraico'
                    ? 'color-mix(in srgb, #f59e0b 12%, transparent)'
                    : 'color-mix(in srgb, #8b5cf6 12%, transparent)',
                  color: insight.palavraChave.idioma === 'hebraico' ? '#f59e0b' : '#8b5cf6',
                }}
              >
                {insight.palavraChave.idioma === 'hebraico' ? 'Hebraico' : 'Grego'}
              </span>
              <span className="text-[10px] text-violet-500 inline-flex items-center gap-1 font-medium">
                Ver no léxico <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </Link>
        </motion.div>
      )}

      {/* Empty state */}
      {!insight.loading && !insight.comentario && !insight.crossRefTop && !insight.palavraChave && (
        <div className="text-center py-6">
          <BookOpen className="w-10 h-10 mx-auto mb-2 text-[var(--content-muted)] opacity-30" strokeWidth={1} />
          <p className="text-xs text-[var(--content-muted)] italic">
            Nenhum insight disponível para este versículo.
          </p>
        </div>
      )}
    </div>
  );

  if (isMobile) {
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
              aria-label={`Insights: ${refLabel}`}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className={cn(
                'fixed bottom-0 left-0 right-0 z-50',
                'bg-[var(--surface-raised)] rounded-t-3xl shadow-2xl',
                'flex flex-col max-h-[60vh] min-h-[200px]'
              )}
            >
              <div className="flex justify-center pt-3 pb-1 shrink-0">
                <div className="w-12 h-1.5 rounded-full bg-[var(--content-muted)] opacity-20" />
              </div>
              <div className="flex-1 overflow-y-auto px-5 pb-5">
                {content}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-label={`Insights: ${refLabel}`}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className={cn(
            'fixed bottom-24 right-4 z-40',
            'w-[340px] max-h-[65vh] overflow-y-auto',
            'bg-[var(--surface-raised)] rounded-2xl shadow-2xl border border-[var(--border)]/50',
            'backdrop-blur-xl'
          )}
        >
          <div className="p-5">
            {content}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
