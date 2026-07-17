'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ChapterGridProps {
  open: boolean;
  onClose: () => void;
  totalCapitulos: number;
  capituloAtual: number;
  onSelect: (capitulo: number) => void;
}

export function ChapterGrid({ open, onClose, totalCapitulos, capituloAtual, onSelect }: ChapterGridProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute left-1/2 -translate-x-1/2 top-full mt-2 z-50 w-80 max-w-[90vw] bg-[var(--surface-raised)] border border-[var(--border)] rounded-xl shadow-2xl p-3"
          >
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--content-muted)] mb-2 px-1">
              Selecione o capítulo
            </p>
            <div className="grid grid-cols-8 gap-1 max-h-64 overflow-y-auto">
              {Array.from({ length: totalCapitulos }, (_, i) => i + 1).map(num => (
                <button
                  key={num}
                  onClick={() => { onSelect(num - 1); onClose(); }}
                  className={cn(
                    'w-full aspect-square rounded-lg text-xs font-semibold transition-all duration-150',
                    num - 1 === capituloAtual
                      ? 'bg-[var(--brand-default)] text-[var(--brand-contrast)] shadow-md'
                      : 'text-[var(--content-secondary)] hover:bg-[var(--surface-sunken)] hover:text-[var(--content-primary)]'
                  )}
                >
                  {num}
                </button>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
