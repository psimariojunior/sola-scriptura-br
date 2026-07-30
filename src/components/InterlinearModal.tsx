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
            className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-[#161412] rounded-t-2xl border-t border-gray-200 dark:border-[#2a2724] shadow-2xl max-h-[80vh] overflow-y-auto md:bottom-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-2xl md:max-w-md md:border md:border-gray-200 dark:md:border-[#2a2724]"
          >
            {/* Drag handle (mobile only) */}
            <div className="flex justify-center pt-3 pb-1 md:hidden">
              <div className="w-10 h-1 rounded-full bg-[var(--content-muted)]/30" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700/50 sticky top-0 bg-white dark:bg-[#161412] z-10">
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${isHebrew ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300' : 'bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-300'}`}>
                  {strong}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {isHebrew ? 'Hebraico' : 'Grego'}
                </span>
                {frequencia !== undefined && frequencia > 0 && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                    {frequencia}x
                  </span>
                )}
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                aria-label="Fechar"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 space-y-3 pb-safe">
              {/* Palavra original */}
              <div className="text-center">
                <p className={`text-3xl font-bold mb-1 text-gray-900 dark:text-gray-100 ${isHebrew ? 'font-hebrew' : 'font-greek'}`}>
                  {entry.palavra}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 italic">
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
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                      {morphologia}
                    </span>
                  )}
                </div>
              )}

              {/* Definição resumida */}
              {definicaoResumida && (
                <div className="bg-amber-50 dark:bg-amber-950 rounded-xl p-3 border border-amber-200 dark:border-amber-800">
                  <div className="flex items-center gap-1.5 mb-1">
                    <BookOpen className="w-3 h-3 text-amber-700 dark:text-amber-400" />
                    <h4 className="text-[10px] font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                      Definição
                    </h4>
                  </div>
                  <p className="text-sm font-medium text-amber-900 dark:text-amber-200 leading-relaxed">
                    {definicaoResumida}
                  </p>
                </div>
              )}

              {/* Definição completa */}
              {definicao && definicao !== definicaoResumida && (
                <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-3">
                  <h4 className="text-[10px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">
                    Completa
                  </h4>
                  <p className="text-xs text-gray-900 dark:text-gray-100 leading-relaxed">
                    {definicao}
                  </p>
                </div>
              )}

              {/* Uso bíblico */}
              {uso && (
                <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-3">
                  <h4 className="text-[10px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">
                    Uso Bíblico
                  </h4>
                  <p className="text-[11px] text-gray-700 dark:text-gray-300 leading-relaxed">
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
