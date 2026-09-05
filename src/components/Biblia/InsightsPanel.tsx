'use client';

import { useState } from 'react';
import { Sparkles, X, MessageSquare, Link2, Languages, ChevronDown } from 'lucide-react';
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
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[var(--brand-default)]" />
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--content-muted)]">
            Insights
          </span>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-lg hover:bg-[var(--surface-sunken)] transition-colors"
          aria-label="Fechar insights"
        >
          <X className="w-4 h-4 text-[var(--content-muted)]" />
        </button>
      </div>

      {/* Loading */}
      {insight.loading && (
        <div className="flex items-center justify-center py-4">
          <div className="flex gap-1.5">
            <span className="w-2 h-2 bg-[var(--brand-default)] rounded-full animate-bounce" />
            <span className="w-2 h-2 bg-[var(--brand-default)] rounded-full animate-bounce [animation-delay:0.15s]" />
            <span className="w-2 h-2 bg-[var(--brand-default)] rounded-full animate-bounce [animation-delay:0.3s]" />
          </div>
        </div>
      )}

      {/* Comment Card */}
      {insight.comentario && (
        <div
          className={cn(
            'rounded-lg border-l-2 border-amber-500 bg-[var(--surface)] p-3 cursor-pointer transition-colors hover:bg-[var(--surface-raised)]',
            expanded === 'comentario' && 'ring-1 ring-amber-500/30'
          )}
          onClick={() => setExpanded(expanded === 'comentario' ? null : 'comentario')}
        >
          <div className="flex items-center gap-2 mb-1">
            <MessageSquare className="w-3.5 h-3.5 text-amber-500" />
            <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Comentário
            </span>
          </div>
          <p className={cn(
            'text-xs text-[var(--content-secondary)] leading-relaxed',
            expanded !== 'comentario' && 'line-clamp-3'
          )}>
            {insight.comentario.texto}
          </p>
          <p className="text-[10px] text-[var(--content-muted)] mt-1">
            — {insight.comentario.autor}
          </p>
          {expanded !== 'comentario' && (
            <ChevronDown className="w-3 h-3 text-[var(--content-muted)] mt-1" />
          )}
        </div>
      )}

      {/* Cross-Reference Card */}
      {insight.crossRefTop && (
        <Link
          href={hrefBiblia(
            insight.crossRefTop.referencia.split(' ')[0]?.toLowerCase().replace(/\s+/g, '') || livro,
            parseInt(insight.crossRefTop.referencia.split(' ')[1]?.split(':')[0] || String(capitulo)),
            parseInt(insight.crossRefTop.referencia.split(':')[1] || String(versiculo))
          )}
          className="block rounded-lg border-l-2 border-cyan-500 bg-[var(--surface)] p-3 hover:bg-[var(--surface-raised)] transition-colors group"
        >
          <div className="flex items-center gap-2 mb-1">
            <Link2 className="w-3.5 h-3.5 text-cyan-500" />
            <span className="text-[10px] font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
              Referência Cruzada
            </span>
          </div>
          <p className="text-xs font-medium text-[var(--content-primary)] group-hover:text-[var(--brand-default)] transition-colors">
            {insight.crossRefTop.referencia}
          </p>
          {insight.crossRefTop.texto && (
            <p className="text-[11px] text-[var(--content-muted)] mt-0.5">
              {insight.crossRefTop.texto}
            </p>
          )}
        </Link>
      )}

      {/* Keyword Card */}
      {insight.palavraChave && (
        <Link
          href={`/idiomas?strong=${insight.palavraChave.strong}`}
          className="block rounded-lg border-l-2 border-purple-500 bg-[var(--surface)] p-3 hover:bg-[var(--surface-raised)] transition-colors group"
        >
          <div className="flex items-center gap-2 mb-1">
            <Languages className="w-3.5 h-3.5 text-purple-500" />
            <span className="text-[10px] font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400">
              Palavra-Chave
            </span>
          </div>
          <p className="text-xs font-medium text-[var(--content-primary)] group-hover:text-[var(--brand-default)] transition-colors">
            {insight.palavraChave.palavra}
            <span className="ml-1 text-[10px] text-[var(--content-muted)]">
              {insight.palavraChave.strong}
            </span>
          </p>
          <p className="text-[11px] text-[var(--content-muted)] mt-0.5">
            {insight.palavraChave.definicao}
          </p>
          <span
            className="inline-flex items-center text-[10px] px-1.5 py-0.5 rounded-full font-medium mt-1"
            style={{
              backgroundColor: insight.palavraChave.idioma === 'hebraico'
                ? 'color-mix(in srgb, #f59e0b 15%, transparent)'
                : 'color-mix(in srgb, #8b5cf6 15%, transparent)',
              color: insight.palavraChave.idioma === 'hebraico' ? '#f59e0b' : '#8b5cf6',
            }}
          >
            {insight.palavraChave.idioma === 'hebraico' ? 'Hebraico' : 'Grego'}
          </span>
        </Link>
      )}

      {/* Empty state */}
      {!insight.loading && !insight.comentario && !insight.crossRefTop && !insight.palavraChave && (
        <p className="text-xs text-[var(--content-muted)] text-center py-2 italic">
          Nenhum insight disponível para este versículo.
        </p>
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
              className="fixed inset-0 z-40 bg-black/40"
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
                'bg-[var(--surface-raised)] rounded-t-2xl shadow-2xl',
                'flex flex-col max-h-[50vh] min-h-[150px]'
              )}
            >
              <div className="flex justify-center pt-2 pb-1 shrink-0">
                <div className="w-10 h-1 rounded-full bg-[var(--content-muted)] opacity-30" />
              </div>
              <div className="flex-1 overflow-y-auto px-4 pb-4">
                {content}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    );
  }

  // Desktop: floating panel
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-label={`Insights: ${refLabel}`}
          initial={{ opacity: 0, x: 20, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 20, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className={cn(
            'fixed bottom-20 right-4 z-40',
            'w-80 max-h-[60vh] overflow-y-auto',
            'bg-[var(--surface-raised)] rounded-xl shadow-2xl border border-[var(--border)]',
            'backdrop-blur-lg'
          )}
        >
          <div className="p-4">
            {content}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
