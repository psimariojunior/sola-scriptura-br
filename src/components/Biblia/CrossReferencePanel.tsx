'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import {
  getCrossReferencesByVerse,
  formatReference,
  type CrossReference,
} from '@/data/biblia/crossReferences';

const TYPE_LABELS: Record<CrossReference['type'], string> = {
  parallel: 'Paralelos',
  fulfillment: 'Cumprimento',
  quotation: 'Citação',
  contrast: 'Contraste',
  thematic: 'Temático',
  typology: 'Tipologia',
};

const TYPE_COLORS: Record<CrossReference['type'], string> = {
  parallel: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  fulfillment: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300',
  quotation: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
  contrast: 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300',
  thematic: 'bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300',
  typology: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300',
};

const TYPE_ORDER: CrossReference['type'][] = [
  'fulfillment',
  'quotation',
  'typology',
  'parallel',
  'thematic',
  'contrast',
];

interface CrossReferencePanelProps {
  book: string;
  chapter: number;
  verse: number;
  bookName?: string;
  onClose?: () => void;
}

export default function CrossReferencePanel({
  book,
  chapter,
  verse,
  bookName,
  onClose,
}: CrossReferencePanelProps) {
  const [expandedRef, setExpandedRef] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<CrossReference['type'] | null>(null);

  const references = useMemo(
    () => getCrossReferencesByVerse(book, chapter, verse),
    [book, chapter, verse]
  );

  const grouped = useMemo(() => {
    const filtered = activeFilter
      ? references.filter((r) => r.type === activeFilter)
      : references;

    const groups: Record<string, CrossReference[]> = {};
    for (const ref of filtered) {
      if (!groups[ref.type]) groups[ref.type] = [];
      groups[ref.type].push(ref);
    }
    return groups;
  }, [references, activeFilter]);

  const availableTypes = useMemo(() => {
    const types = new Set(references.map((r) => r.type));
    return TYPE_ORDER.filter((t) => types.has(t));
  }, [references]);

  if (references.length === 0) {
    return (
      <div className="p-4 text-center text-sm text-[var(--content-muted)]">
        Nenhuma referência cruzada encontrada para este versículo.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-[var(--content-primary)]">
          Referências Cruzadas ({references.length})
        </h3>
        {onClose && (
          <button
            onClick={onClose}
            className="text-[var(--content-muted)] hover:text-[var(--content-primary)] transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-1.5">
        <button
          onClick={() => setActiveFilter(null)}
          className={cn(
            'px-2 py-0.5 rounded-full text-[10px] font-medium transition-colors',
            !activeFilter
              ? 'bg-[var(--brand-default)] text-[var(--brand-contrast)]'
              : 'bg-[var(--surface-sunken)] text-[var(--content-muted)] hover:text-[var(--content-primary)]'
          )}
        >
          Todas ({references.length})
        </button>
        {availableTypes.map((type) => {
          const count = references.filter((r) => r.type === type).length;
          return (
            <button
              key={type}
              onClick={() => setActiveFilter(activeFilter === type ? null : type)}
              className={cn(
                'px-2 py-0.5 rounded-full text-[10px] font-medium transition-colors',
                activeFilter === type
                  ? 'bg-[var(--brand-default)] text-[var(--brand-contrast)]'
                  : 'bg-[var(--surface-sunken)] text-[var(--content-muted)] hover:text-[var(--content-primary)]'
              )}
            >
              {TYPE_LABELS[type]} ({count})
            </button>
          );
        })}
      </div>

      <div className="space-y-2">
        {TYPE_ORDER.filter((type) => grouped[type]?.length).map((type) => (
          <div key={type} className="space-y-1">
            <div className="flex items-center gap-2 px-1">
              <span className={cn('px-1.5 py-0.5 rounded text-[9px] font-semibold uppercase tracking-wider', TYPE_COLORS[type])}>
                {TYPE_LABELS[type]}
              </span>
            </div>
            {grouped[type].map((ref) => {
              const refKey = `${ref.from}-${ref.to}`;
              const isExpanded = expandedRef === refKey;
              const refParts = ref.to.split(' ');
              const refBook = refParts[0];
              const refChapterVerse = refParts.slice(1).join(' ');

              return (
                <div
                  key={refKey}
                  className="border border-[var(--border)] rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedRef(isExpanded ? null : refKey)}
                    className="w-full flex items-center justify-between px-3 py-2 hover:bg-[var(--surface-sunken)]/60 transition-colors text-left"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-[10px] text-[var(--content-muted)] whitespace-nowrap">
                        {formatReference(ref.from)}
                      </span>
                      <svg className="w-3 h-3 text-[var(--content-muted)] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      <Link
                        href={`/biblia?livro=${refBook}&capitulo=${refChapterVerse.split(':')[0]}`}
                        onClick={(e) => e.stopPropagation()}
                        className="text-xs font-medium text-[var(--brand-default)] hover:underline truncate"
                      >
                        {ref.to}
                      </Link>
                    </div>
                    <svg
                      className={cn(
                        'w-3 h-3 text-[var(--content-muted)] transition-transform shrink-0',
                        isExpanded && 'rotate-90'
                      )}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                  <AnimatePresence>
                    {isExpanded && ref.description && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="px-3 pb-2 text-xs text-[var(--content-secondary)] leading-relaxed border-t border-[var(--border)]">
                          <p className="pt-2">{ref.description}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
