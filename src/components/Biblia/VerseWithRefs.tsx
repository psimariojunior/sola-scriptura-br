'use client';

import { useState, useMemo, useCallback, Fragment } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { getCrossReferencesByVerse } from '@/data/biblia/crossReferences';
import CrossReferencePanel from './CrossReferencePanel';

interface VerseWithRefsProps {
  book: string;
  chapter: number;
  verse: number;
  text: string;
  bookName?: string;
  fontSize?: number;
  className?: string;
}

export default function VerseWithRefs({
  book,
  chapter,
  verse,
  text,
  bookName,
  fontSize = 16,
  className,
}: VerseWithRefsProps) {
  const [panelOpen, setPanelOpen] = useState(false);
  const refs = useMemo(() => getCrossReferencesByVerse(book, chapter, verse), [book, chapter, verse]);
  const refCount = refs.length;

  const togglePanel = useCallback(() => setPanelOpen((p) => !p), []);

  const words = useMemo(() => {
    if (refCount === 0) return null;
    const parts = text.split(/(\s+)/);
    return parts.map((part, i) => {
      if (/^\s+$/.test(part)) return part;
      const lower = part.toLowerCase().replace(/[.,;:!?""''()[\]{}]/g, '');
      const hasRef = refs.some((r) => {
        const refWords = r.description?.toLowerCase().split(/\s+/) || [];
        return refWords.some((w) => w.length > 3 && lower.includes(w.slice(0, 4)));
      });
      return (
        <span
          key={i}
          className={cn(
            'transition-colors duration-200',
            hasRef && 'border-b border-dashed border-[var(--brand-default)]/40 hover:border-[var(--brand-default)]'
          )}
        >
          {part}
        </span>
      );
    });
  }, [text, refs, refCount]);

  return (
    <div className={cn('relative', className)}>
      <div
        className="flex items-start gap-2 cursor-pointer group"
        onClick={togglePanel}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            togglePanel();
          }
        }}
        aria-expanded={panelOpen}
        aria-label={`${bookName || book} ${chapter}:${verse} — ${refCount} referências cruzadas`}
      >
        <div className="flex-1 min-w-0">
          <p
            className="font-serif-body text-[var(--content-primary)] leading-[1.75]"
            style={{ fontSize: `${fontSize}px` }}
          >
            <sup className="text-[var(--brand-default)] font-bold mr-1 text-[0.7em] tabular-nums">
              {verse}
            </sup>
            {words || text}
          </p>
        </div>

        {refCount > 0 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              togglePanel();
            }}
            className={cn(
              'shrink-0 inline-flex items-center gap-1',
              'px-2 py-1 rounded-md text-[10px] font-semibold',
              'transition-all duration-200',
              panelOpen
                ? 'bg-[var(--brand-default)] text-[var(--brand-contrast)] shadow-sm'
                : 'bg-[var(--brand-subtle)] text-[var(--brand-default)] hover:bg-[var(--brand-default)]/15'
            )}
            title={`${refCount} referência(s) cruzada(s)`}
          >
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
              />
            </svg>
            {refCount}
          </button>
        )}
      </div>

      <AnimatePresence>
        {panelOpen && refCount > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="mt-2 ml-8 p-3 rounded-lg bg-[var(--surface-raised)] border border-[var(--border)] shadow-sm">
              <CrossReferencePanel
                book={book}
                chapter={chapter}
                verse={verse}
                bookName={bookName}
                onClose={() => setPanelOpen(false)}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
