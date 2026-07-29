'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, BookOpen } from 'lucide-react';
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

  return (
    <AnimatePresence>
      {strong && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
            className="bg-[var(--surface-raised)] rounded-2xl border border-[var(--border)] shadow-2xl w-full max-w-lg overflow-hidden max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)]/50 sticky top-0 bg-[var(--surface-raised)] z-10">
              <div className="flex items-center gap-3">
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${isHebrew ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300' : 'bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-300'}`}>
                  {strong}
                </span>
                <span className="text-sm text-[var(--content-muted)]">
                  {isHebrew ? 'Hebraico' : 'Grego'}
                </span>
                {frequencia !== undefined && frequencia > 0 && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--surface-sunken)] text-[var(--content-muted)]">
                    {frequencia}x na Bíblia
                  </span>
                )}
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg hover:bg-[var(--surface-sunken)] text-[var(--content-muted)] hover:text-[var(--content-primary)] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              {/* Palavra original grande */}
              <div className="text-center">
                <p className={`text-4xl font-bold mb-1 ${isHebrew ? 'font-hebrew' : 'font-greek'}`}>
                  {entry.palavra}
                </p>
                <p className="text-sm text-[var(--content-muted)] italic">
                  {entry.transliteracao}
                </p>
              </div>

              {/* Categorias */}
              {(categoria || morphologia) && (
                <div className="flex gap-2 flex-wrap justify-center">
                  {categoria && (
                    <span className="text-xs px-3 py-1 rounded-full bg-[var(--brand-subtle)] text-[var(--brand-default)] font-medium">
                      {categoria}
                    </span>
                  )}
                  {morphologia && (
                    <span className="text-xs px-3 py-1 rounded-full bg-[var(--surface-sunken)] text-[var(--content-secondary)]">
                      {morphologia}
                    </span>
                  )}
                </div>
              )}

              {/* Definição resumida */}
              {definicaoResumida && (
                <div className="bg-[var(--brand-subtle)]/30 rounded-xl p-4 border border-[var(--brand-default)]/10">
                  <div className="flex items-center gap-2 mb-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-[var(--brand-default)]" />
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
                <div className="bg-[var(--surface-sunken)] rounded-xl p-4">
                  <h4 className="text-[10px] font-semibold uppercase tracking-wider text-[var(--content-muted)] mb-1.5">
                    Definição Completa
                  </h4>
                  <p className="text-sm text-[var(--content-primary)] leading-relaxed">
                    {definicao}
                  </p>
                </div>
              )}

              {/* Uso bíblico */}
              {uso && (
                <div className="bg-[var(--surface-sunken)] rounded-xl p-4">
                  <h4 className="text-[10px] font-semibold uppercase tracking-wider text-[var(--content-muted)] mb-1.5">
                    Uso Bíblico
                  </h4>
                  <p className="text-xs text-[var(--content-secondary)] leading-relaxed">
                    {uso}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
