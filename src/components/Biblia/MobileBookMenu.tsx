'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronDown, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TODOS_LIVROS, LIVROS_AT, LIVROS_NT } from '@/data/biblia/livros';
import { getCachedChaptersForBook } from '@/lib/offlineStorage';
import { getBookReadChapters, getBookProgressMap } from '@/lib/readingProgress';

interface MobileBookMenuProps {
  open: boolean;
  onClose: () => void;
  livroIdx: number;
  onSelect: (idx: number) => void;
  onSelectChapter?: (idx: number, cap: number) => void;
  translation?: string;
}

export function MobileBookMenu({ open, onClose, livroIdx, onSelect, onSelectChapter, translation = 'ARC' }: MobileBookMenuProps) {
  const [selectedBookIdx, setSelectedBookIdx] = useState<number | null>(null);
  const [atExpanded, setAtExpanded] = useState(true);
  const [ntExpanded, setNtExpanded] = useState(false);
  const [cachedChapters, setCachedChapters] = useState<Set<number>>(new Set());
  const [readChapters, setReadChapters] = useState<Set<number>>(new Set());
  const [bookProgress, setBookProgress] = useState<Map<string, { lidos: number; totalCapitulos: number; percentual: number }>>(new Map());

  const selectedBook = selectedBookIdx !== null ? TODOS_LIVROS[selectedBookIdx] : null;

  useEffect(() => {
    if (!selectedBook) { setCachedChapters(new Set()); setReadChapters(new Set()); return; }
    let cancelled = false;
    getCachedChaptersForBook(selectedBook.abreviacao, translation).then(chs => {
      if (!cancelled) setCachedChapters(chs);
    });
    setReadChapters(getBookReadChapters(selectedBook.abreviacao));
    return () => { cancelled = true; };
  }, [selectedBook, translation]);

  // Load book progress for all books
  useEffect(() => {
    const progress = getBookProgressMap();
    const map = new Map<string, { lidos: number; totalCapitulos: number; percentual: number }>();
    for (const [key, val] of progress) {
      map.set(key, { lidos: val.lidos, totalCapitulos: val.totalCapitulos, percentual: val.percentual });
    }
    setBookProgress(map);
  }, [open]);

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

  const renderBookList = (books: typeof TODOS_LIVROS, label: string, expanded: boolean, onToggle: () => void) => (
    <div className="mb-2">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-[var(--content-muted)] hover:text-[var(--content-secondary)] transition-colors"
      >
        {label}
        <ChevronDown className={cn('w-3 h-3 transition-transform', expanded && 'rotate-180')} />
      </button>
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="space-y-0.5">
              {books.map(l => {
                const idx = TODOS_LIVROS.indexOf(l);
                const progress = bookProgress.get(l.abreviacao);
                const hasProgress = progress && progress.lidos > 0;
                return (
                  <button key={l.abreviacao} onClick={() => handleSelectBook(idx)}
                    className={cn(
                      'w-full text-left px-3 py-2 text-sm rounded-lg transition-colors flex items-center justify-between',
                      idx === livroIdx ? 'bg-[var(--brand-subtle)] text-[var(--brand-default)] font-medium' : 'text-[var(--content-secondary)] hover:bg-[var(--surface-sunken)]'
                    )}>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="truncate">{l.nome}</span>
                        {hasProgress && progress!.percentual === 100 && (
                          <span className="flex-shrink-0 w-4 h-4 rounded-full bg-emerald-500/20 flex items-center justify-center">
                            <Check className="w-2.5 h-2.5 text-emerald-600 dark:text-emerald-400" />
                          </span>
                        )}
                      </div>
                      {hasProgress && (
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex-1 h-1 rounded-full bg-[var(--surface-sunken)] overflow-hidden">
                            <div
                              className="h-full rounded-full bg-[var(--brand-default)] transition-all duration-500"
                              style={{ width: `${progress!.percentual}%` }}
                            />
                          </div>
                          <span className="text-[9px] text-[var(--content-muted)] flex-shrink-0">
                            {progress!.lidos}/{progress!.totalCapitulos}
                          </span>
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

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

            {selectedBook && (() => {
              const progress = bookProgress.get(selectedBook.abreviacao);
              if (!progress || progress.lidos === 0) return null;
              return (
                <div className="mb-3 px-1">
                  <div className="flex items-center justify-between text-[10px] text-[var(--content-muted)] mb-1">
                    <span>{progress.lidos} de {progress.totalCapitulos} capítulos lidos</span>
                    <span className="font-semibold text-[var(--brand-default)]">{progress.percentual}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-[var(--surface-sunken)] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[var(--brand-default)] to-[var(--brand-emphasis)] transition-all duration-500"
                      style={{ width: `${progress.percentual}%` }}
                    />
                  </div>
                </div>
              );
            })()}

            {!selectedBook ? (
              <>
                {renderBookList(LIVROS_AT, 'Antigo Testamento', atExpanded, () => setAtExpanded(p => !p))}
                {renderBookList(LIVROS_NT, 'Novo Testamento', ntExpanded, () => setNtExpanded(p => !p))}
              </>
            ) : (
              <div className="grid grid-cols-5 sm:grid-cols-6 gap-1.5">
                {Array.from({ length: selectedBook.totalCapitulos }, (_, i) => i + 1).map(num => {
                  const isRead = readChapters.has(num);
                  const isCurrent = num - 1 === (selectedBookIdx === livroIdx ? /* current chapter */ 0 : -1);
                  return (
                    <button
                      key={num}
                      onClick={() => handleSelectChapter(num - 1)}
                      className={cn(
                        'relative w-full aspect-square rounded-lg text-xs font-semibold transition-all flex items-center justify-center',
                        isCurrent
                          ? 'bg-[var(--brand-default)] text-[var(--brand-contrast)]'
                          : isRead
                            ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20'
                            : 'text-[var(--content-secondary)] hover:bg-[var(--surface-sunken)] hover:text-[var(--content-primary)]'
                      )}
                    >
                      {isRead ? <Check className="w-3 h-3" /> : num}
                      {cachedChapters.has(num) && <span className="offline-cached-dot absolute top-1 right-1" />}
                    </button>
                  );
                })}
              </div>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
