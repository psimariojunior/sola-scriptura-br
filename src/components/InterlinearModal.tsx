'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { X, BookOpen } from 'lucide-react';
import { getStrongByNumber, type LexiconEntry } from '@/lib/lexiconSearch';

interface InterlinearModalProps {
  strong: string | null;
  onClose: () => void;
}

export function InterlinearModal({ strong, onClose }: InterlinearModalProps) {
  const [entry, setEntry] = useState<LexiconEntry | null>(null);

  useEffect(() => {
    if (!strong) { setEntry(null); return; }
    let cancelled = false;
    getStrongByNumber(strong).then(e => { if (!cancelled) setEntry(e); });
    return () => { cancelled = true; };
  }, [strong]);

  if (!strong || !entry) return null;

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
            className="fixed inset-0 z-50"
            style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
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
            className="fixed bottom-0 left-0 right-0 z-50 rounded-t-2xl max-h-[80vh] overflow-y-auto md:bottom-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-2xl md:max-w-md md:border"
            style={{
              backgroundColor: 'var(--surface-raised)',
              borderTop: '1px solid var(--border)',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
            }}
          >
            {/* Drag handle (mobile only) */}
            <div className="flex justify-center pt-3 pb-1 md:hidden">
              <div className="w-10 h-1 rounded-full" style={{ backgroundColor: 'var(--content-muted)', opacity: 0.3 }} />
            </div>

            {/* Header */}
            <div
              className="flex items-center justify-between px-4 py-3 sticky top-0 z-10"
              style={{
                borderBottom: '1px solid var(--border)',
                backgroundColor: 'var(--surface-raised)',
              }}
            >
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className="text-xs font-bold px-2 py-0.5 rounded-full"
                  style={isHebrew
                    ? { backgroundColor: 'var(--brand-subtle)', color: 'var(--brand-default)' }
                    : { backgroundColor: 'var(--surface-sunken)', color: 'var(--content-secondary)' }
                  }
                >
                  {strong}
                </span>
                <span className="text-xs" style={{ color: 'var(--content-muted)' }}>
                  {isHebrew ? 'Hebraico' : 'Grego'}
                </span>
                {frequencia !== undefined && frequencia > 0 && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full" style={{ backgroundColor: 'var(--surface-sunken)', color: 'var(--content-muted)' }}>
                    {frequencia}x
                  </span>
                )}
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg transition-colors"
                style={{ color: 'var(--content-muted)' }}
                aria-label="Fechar"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 space-y-3 pb-safe">
              {/* Palavra original */}
              <div className="text-center">
                <p className={`text-3xl font-bold mb-1 ${isHebrew ? 'font-hebrew' : 'font-greek'}`} style={{ color: 'var(--content-primary)' }}>
                  {entry.palavra}
                </p>
                <p className="text-sm italic" style={{ color: 'var(--content-muted)' }}>
                  {entry.transliteracao}
                </p>
              </div>

              {/* Categorias */}
              {(categoria || morphologia) && (
                <div className="flex gap-1.5 flex-wrap justify-center">
                  {categoria && (
                    <span className="text-[11px] px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: 'var(--brand-subtle)', color: 'var(--brand-default)' }}>
                      {categoria}
                    </span>
                  )}
                  {morphologia && (
                    <span className="text-[11px] px-2 py-0.5 rounded-full" style={{ backgroundColor: 'var(--surface-sunken)', color: 'var(--content-muted)' }}>
                      {morphologia}
                    </span>
                  )}
                </div>
              )}

              {/* Definição resumida */}
              {definicaoResumida && (
                <div className="rounded-xl p-3" style={{ backgroundColor: 'var(--brand-subtle)', border: '1px solid var(--border)' }}>
                  <div className="flex items-center gap-1.5 mb-1">
                    <BookOpen className="w-3 h-3" style={{ color: 'var(--brand-default)' }} />
                    <h4 className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: 'var(--brand-default)' }}>
                      Definição
                    </h4>
                  </div>
                  <p className="text-sm font-medium leading-relaxed" style={{ color: 'var(--content-primary)' }}>
                    {definicaoResumida}
                  </p>
                </div>
              )}

              {/* Definição completa */}
              {definicao && definicao !== definicaoResumida && (
                <div className="rounded-xl p-3" style={{ backgroundColor: 'var(--surface-sunken)' }}>
                  <h4 className="text-[10px] font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--content-muted)' }}>
                    Completa
                  </h4>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--content-primary)' }}>
                    {definicao}
                  </p>
                </div>
              )}

              {/* Uso bíblico */}
              {uso && (
                <div className="rounded-xl p-3" style={{ backgroundColor: 'var(--surface-sunken)' }}>
                  <h4 className="text-[10px] font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--content-muted)' }}>
                    Uso Bíblico
                  </h4>
                  <p className="text-[11px] leading-relaxed" style={{ color: 'var(--content-secondary)' }}>
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
