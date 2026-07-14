'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TODOS_LIVROS } from '@/data/biblia';

interface MobileBookMenuProps {
  open: boolean;
  onClose: () => void;
  livroIdx: number;
  onSelect: (idx: number) => void;
}

export function MobileBookMenu({ open, onClose, livroIdx, onSelect }: MobileBookMenuProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 lg:hidden"
        >
          <motion.div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
          <motion.aside
            initial={{ x: -288 }} animate={{ x: 0 }} exit={{ x: -288 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute left-0 top-0 bottom-0 w-72 max-w-[85vw] bg-[var(--surface-raised)] border-r border-[var(--border)] overflow-y-auto p-4"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold">Livros</span>
              <button onClick={onClose} className="p-1 rounded-lg hover:bg-[var(--surface-sunken)]" aria-label="Fechar">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-0.5">
              {TODOS_LIVROS.map(l => {
                const idx = TODOS_LIVROS.indexOf(l);
                return (
                  <button key={l.abreviacao} onClick={() => onSelect(idx)}
                    className={cn(
                      'w-full text-left px-3 py-2 text-sm rounded-lg transition-colors',
                      idx === livroIdx ? 'bg-[var(--brand-subtle)] text-[var(--brand-default)] font-medium' : 'text-[var(--content-secondary)] hover:bg-[var(--surface-sunken)]'
                    )}>
                    {l.nome}
                  </button>
                );
              })}
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
