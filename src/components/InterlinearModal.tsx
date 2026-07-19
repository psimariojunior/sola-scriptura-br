'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
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
            className="bg-[var(--surface-raised)] rounded-2xl border border-[var(--border)] shadow-2xl w-full max-w-md overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)]/50">
              <div className="flex items-center gap-3">
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${isHebrew ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300' : 'bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-300'}`}>
                  {strong}
                </span>
                <span className="text-sm text-[var(--content-muted)]">
                  {isHebrew ? 'Hebraico' : 'Grego'}
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg hover:bg-[var(--surface-sunken)] text-[var(--content-muted)] hover:text-[var(--content-primary)] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div className="text-center">
                <p className={`text-3xl font-bold mb-1 ${isHebrew ? 'font-hebrew' : 'font-greek'}`}>
                  {entry.palavra}
                </p>
                <p className="text-sm text-[var(--content-muted)] italic">
                  {entry.transliteracao}
                </p>
              </div>

              <div className="space-y-3">
                <div className="bg-[var(--surface-sunken)] rounded-xl p-4">
                  <h4 className="text-[10px] font-semibold uppercase tracking-wider text-[var(--content-muted)] mb-1.5">
                    Definição
                  </h4>
                  <p className="text-sm text-[var(--content-primary)] leading-relaxed">
                    {entry.definicao}
                  </p>
                </div>

                {'definicaoResumida' in entry && (
                  <div className="bg-[var(--surface-sunken)] rounded-xl p-4">
                    <h4 className="text-[10px] font-semibold uppercase tracking-wider text-[var(--content-muted)] mb-1.5">
                      Resumo
                    </h4>
                    <p className="text-sm font-medium text-[var(--brand-default)]">
                      {(entry as { definicaoResumida: string }).definicaoResumida}
                    </p>
                  </div>
                )}

                {'categoria' in entry && (
                  <div className="flex gap-2 flex-wrap">
                    <span className="text-xs px-2.5 py-1 rounded-full bg-[var(--surface-sunken)] text-[var(--content-secondary)]">
                      {(entry as { categoria: string }).categoria}
                    </span>
                    {'morphologia' in entry && (
                      <span className="text-xs px-2.5 py-1 rounded-full bg-[var(--surface-sunken)] text-[var(--content-secondary)]">
                        {(entry as { morphologia: string }).morphologia}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
