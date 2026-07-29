'use client';

import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { X, BookOpen, ChevronDown } from 'lucide-react';
import { getStrongByNumber } from '@/lib/lexiconSearch';

interface InterlinearModalProps {
  strong: string | null;
  onClose: () => void;
}

export function InterlinearModal({ strong, onClose }: InterlinearModalProps) {
  if (!strong) return null;
  const entry = getStrongByNumber(strong);
  if (!entry) return null;

  const isHebrew = strong.toUpperCase().startsWith('H');
  const definicao = 'definicao' in entry ? (entry as { definicao: string }).definicao : '';
  const definicaoResumida = 'definicaoResumida' in entry ? (entry as { definicaoResumida: string }).definicaoResumida : '';
  const categoria = 'categoria' in entry ? (entry as { categoria: string }).categoria : '';
  const morphologia = 'morphologia' in entry ? (entry as { morphologia: string }).morphologia : '';
  const uso = 'uso' in entry ? (entry as { uso: string }).uso : '';
  const frequencia = 'frequencia' in entry ? (entry as { frequencia: number }).frequencia : undefined;

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.y > 100) onClose();
  };

  return (
    <AnimatePresence>
      {strong && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40"
            onClick={onClose}
          />

          {/* Bottom sheet — mobile | centered modal — desktop */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            drag="y"
            dragConstraints={{ top: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            className="fixed bottom-0 left-0 right-0 z-50 bg-[var(--surface-raised)] rounded-t-2xl border-t border-[var(--border)] shadow-2xl max-h-[80vh] overflow-y-auto md:bottom-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-2xl md:max-w-md md:border md:border-[var(--border)]"
          >
            {/* Drag handle (mobile only) */}
            <div className="flex justify-center pt-3 pb-1 md:hidden">
              <div className="w-10 h-1 rounded-full bg-[var(--content-muted)]/30" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)]/50 sticky top-0 bg-[var(--surface-raised)] z-10">
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${isHebrew ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300' : 'bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-300'}`}>
                  {strong}
                </span>
                <span className="text-xs text-[var(--content-muted)]">
                  {isHebrew ? 'Hebraico' : 'Grego'}
                </span>
                {frequencia !== undefined && frequencia > 0 && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[var(--surface-sunken)] text-[var(--content-muted)]">
                    {frequencia}x
                  </span>
                )}
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg hover:bg-[var(--surface-sunken)] text-[var(--content-muted)] hover:text-[var(--content-primary)] transition-colors"
                aria-label="Fechar"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 space-y-3 pb-safe">
              {/* Palavra original */}
              <div className="text-center">
                <p className={`text-3xl font-bold mb-1 ${isHebrew ? 'font-hebrew' : 'font-greek'}`}>
                  {entry.palavra}
                </p>
                <p className="text-sm text-[var(--content-muted)] italic">
                  {entry.transliteracao}
                </p>
              </div>

              {/* Categorias */}
              {(categoria || morphologia) && (
                <div className="flex gap-1.5 flex-wrap justify-center">
                  {categoria && (
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-[var(--brand-subtle)] text-[var(--brand-default)] font-medium">
                      {categoria}
                    </span>
                  )}
                  {morphologia && (
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-[var(--surface-sunken)] text-[var(--content-secondary)]">
                      {morphologia}
                    </span>
                  )}
                </div>
              )}

              {/* Definição resumida */}
              {definicaoResumida && (
                <div className="bg-[var(--brand-subtle)]/30 rounded-xl p-3 border border-[var(--brand-default)]/10">
                  <div className="flex items-center gap-1.5 mb-1">
                    <BookOpen className="w-3 h-3 text-[var(--brand-default)]" />
                    <h4 className="text-[10px] font-semibold uppercase tracking-wider text-[var(--brand-default)]">
                      Definição
                    </h4>
                  </div>
                  <p className="text-sm font-medium text-[var(--brand-default)] leading-relaxed">
                    {definicaoResumida}
                  </p>
                </div>
              )}

              {/* Definição completa */}
              {definicao && definicao !== definicaoResumida && (
                <div className="bg-[var(--surface-sunken)] rounded-xl p-3">
                  <h4 className="text-[10px] font-semibold uppercase tracking-wider text-[var(--content-muted)] mb-1">
                    Completa
                  </h4>
                  <p className="text-xs text-[var(--content-primary)] leading-relaxed">
                    {definicao}
                  </p>
                </div>
              )}

              {/* Uso bíblico */}
              {uso && (
                <div className="bg-[var(--surface-sunken)] rounded-xl p-3">
                  <h4 className="text-[10px] font-semibold uppercase tracking-wider text-[var(--content-muted)] mb-1">
                    Uso Bíblico
                  </h4>
                  <p className="text-[11px] text-[var(--content-secondary)] leading-relaxed">
                    {uso}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
