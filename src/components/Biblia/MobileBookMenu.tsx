'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TODOS_LIVROS, LIVROS_AT, LIVROS_NT } from '@/data/biblia';

interface MobileBookMenuProps {
  open: boolean;
  onClose: () => void;
  livroIdx: number;
  onSelect: (idx: number) => void;
  onSelectChapter?: (idx: number, cap: number) => void;
}

export function MobileBookMenu({ open, onClose, livroIdx, onSelect, onSelectChapter }: MobileBookMenuProps) {
  const [selectedBookIdx, setSelectedBookIdx] = useState<number | null>(null);

  const selectedBook = selectedBookIdx !== null ? TODOS_LIVROS[selectedBookIdx] : null;

  const handleClose = () => {
    setSelectedBookIdx(null);
    onClose();
  };

  const handleSelectBook = (idx: number) => {
    setSelectedBookIdx(idx);
  };

  const handleSelectChapter = (cap: number) => {
    if (selectedBookIdx !== null && onSelectChapter) {
      onSelectChapter(selectedBookIdx, cap);
    } else {
      onSelect(selectedBookIdx!);
    }
    setSelectedBookIdx(null);
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 lg:hidden"
        >
          <motion.div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={handleClose} />
          <motion.aside
            initial={{ x: -288 }} animate={{ x: 0 }} exit={{ x: -288 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute left-0 top-0 bottom-0 w-72 max-w-[85vw] bg-[var(--surface-raised)] border-r border-[var(--border)] overflow-y-auto p-4"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                {selectedBookIdx !== null && (
                  <button onClick={() => setSelectedBookIdx(null)} className="p-1 rounded-lg hover:bg-[var(--surface-sunken)]" aria-label="Voltar">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                )}
                <span className="text-sm font-semibold">
                  {selectedBook ? selectedBook.nome : 'Livros'}
                </span>
              </div>
              <button onClick={handleClose} className="p-1 rounded-lg hover:bg-[var(--surface-sunken)]" aria-label="Fechar">
                <X className="w-4 h-4" />
              </button>
            </div>

            {!selectedBook ? (
              <>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--content-muted)] mb-2">Antigo Testamento</p>
                <div className="space-y-0.5 mb-4">
                  {LIVROS_AT.map(l => {
                    const idx = TODOS_LIVROS.indexOf(l);
                    return (
                      <button key={l.abreviacao} onClick={() => handleSelectBook(idx)}
                        className={cn(
                          'w-full text-left px-3 py-2 text-sm rounded-lg transition-colors flex items-center justify-between',
                          idx === livroIdx ? 'bg-[var(--brand-subtle)] text-[var(--brand-default)] font-medium' : 'text-[var(--content-secondary)] hover:bg-[var(--surface-sunken)]'
                        )}>
                        <span>{l.nome}</span>
                        <span className="text-[10px] text-[var(--content-muted)]">{l.totalCapitulos} caps</span>
                      </button>
                    );
                  })}
                </div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--content-muted)] mb-2">Novo Testamento</p>
                <div className="space-y-0.5">
                  {LIVROS_NT.map(l => {
                    const idx = TODOS_LIVROS.indexOf(l);
                    return (
                      <button key={l.abreviacao} onClick={() => handleSelectBook(idx)}
                        className={cn(
                          'w-full text-left px-3 py-2 text-sm rounded-lg transition-colors flex items-center justify-between',
                          idx === livroIdx ? 'bg-[var(--brand-subtle)] text-[var(--brand-default)] font-medium' : 'text-[var(--content-secondary)] hover:bg-[var(--surface-sunken)]'
                        )}>
                        <span>{l.nome}</span>
                        <span className="text-[10px] text-[var(--content-muted)]">{l.totalCapitulos} caps</span>
                      </button>
                    );
                  })}
                </div>
              </>
            ) : (
              <div className="grid grid-cols-6 gap-1.5">
                {Array.from({ length: selectedBook.totalCapitulos }, (_, i) => i + 1).map(num => (
                  <button
                    key={num}
                    onClick={() => handleSelectChapter(num - 1)}
                    className={cn(
                      'w-full aspect-square rounded-lg text-xs font-semibold transition-all',
                      num - 1 === (selectedBookIdx === livroIdx ? /* current chapter */ 0 : -1)
                        ? 'bg-[var(--brand-default)] text-[var(--brand-contrast)]'
                        : 'text-[var(--content-secondary)] hover:bg-[var(--surface-sunken)] hover:text-[var(--content-primary)]'
                    )}
                  >
                    {num}
                  </button>
                ))}
              </div>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
