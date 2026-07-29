'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import type { LexiconEntry } from '@/lib/lexiconSearch';
import type { LexiconResult } from '@/lib/lexiconSearch';
import { isHebrewStrong } from '@/lib/lexiconSearch';

interface LexiconPopupProps {
  entry: LexiconEntry;
  allResults?: LexiconResult[];
  position: { x: number; y: number };
  onClose: () => void;
}

export function LexiconPopup({ entry, allResults, position, onClose }: LexiconPopupProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [adjustedPos, setAdjustedPos] = useState(position);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const currentEntry = allResults && allResults.length > 1 
    ? allResults[selectedIndex]?.entry ?? entry 
    : entry;

  useEffect(() => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    let x = position.x;
    let y = position.y;

    if (x + rect.width > vw - 16) x = vw - rect.width - 16;
    if (x < 16) x = 16;
    if (y + rect.height > vh - 16) y = position.y - rect.height - 8;
    if (y < 16) y = 16;

    setAdjustedPos({ x, y });
  }, [position]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const isHebrew = isHebrewStrong(currentEntry.strong);
  const langLabel = isHebrew ? 'Hebraico' : 'Grego';
  const langColor = isHebrew ? 'text-blue-400' : 'text-purple-400';
  const hasMultiple = allResults && allResults.length > 1;

  return (
    <div
      ref={ref}
      className="fixed z-50 w-80 max-w-[calc(100vw-2rem)] rounded-xl border border-[var(--border)] bg-[var(--surface-raised)] p-4 shadow-[var(--shadow-lg)] animate-scale-in"
      style={{ left: adjustedPos.x, top: adjustedPos.y }}
    >
      {/* Header */}
      <div className="mb-3 flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-semibold tracking-wide text-[var(--brand-default)]">
              {currentEntry.strong}
            </span>
            <span className={`text-[10px] font-medium uppercase tracking-wider ${langColor}`}>
              {langLabel}
            </span>
          </div>
          <p
            dir={isHebrew ? 'rtl' : 'ltr'}
            className="text-lg font-semibold text-[var(--content-primary)] leading-tight truncate"
          >
            {currentEntry.palavra}
          </p>
        </div>
        <button
          onClick={onClose}
          className="flex-shrink-0 rounded-md p-1 text-[var(--content-muted)] hover:bg-[var(--accent)] hover:text-[var(--content-primary)] transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-xs text-[var(--content-muted)]">Transliteração:</span>
          <span className="text-sm italic text-[var(--content-primary)]">
            {currentEntry.transliteracao}
          </span>
        </div>

        <p className="text-sm text-[var(--content-secondary)] leading-relaxed border-t border-[var(--border)] pt-2">
          {currentEntry.definicao}
        </p>

        {/* Category/Frequency */}
        {'categoria' in currentEntry && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            <span className="inline-flex items-center rounded-full bg-[var(--brand-subtle)] px-2 py-0.5 text-[10px] font-medium text-[var(--brand-default)]">
              {currentEntry.categoria}
            </span>
            {'frequencia' in currentEntry && currentEntry.frequencia != null && (
              <span className="inline-flex items-center rounded-full bg-[var(--accent)] px-2 py-0.5 text-[10px] font-medium text-[var(--content-muted)]">
                ×{currentEntry.frequencia}
              </span>
            )}
          </div>
        )}

        {!('categoria' in currentEntry) && 'frequencia' in currentEntry && currentEntry.frequencia != null && (
          <div className="flex gap-1.5 pt-1">
            <span className="inline-flex items-center rounded-full bg-[var(--accent)] px-2 py-0.5 text-[10px] font-medium text-[var(--content-muted)]">
              ×{currentEntry.frequencia}
            </span>
          </div>
        )}

        {/* Multiple results selector */}
        {hasMultiple && (
          <div className="border-t border-[var(--border)] pt-2 mt-2">
            <p className="text-[10px] text-[var(--content-muted)] mb-1.5">
              {allResults!.length} resultados encontrados:
            </p>
            <div className="flex flex-wrap gap-1">
              {allResults!.slice(0, 5).map((r, i) => (
                <button
                  key={r.entry.strong}
                  onClick={() => setSelectedIndex(i)}
                  className={`text-[10px] px-2 py-0.5 rounded-full transition-colors ${
                    i === selectedIndex
                      ? 'bg-[var(--brand-default)] text-[var(--brand-contrast)]'
                      : 'bg-[var(--surface-sunken)] text-[var(--content-muted)] hover:bg-[var(--accent)]'
                  }`}
                >
                  {r.entry.strong}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Link to full lexicon */}
      <div className="mt-3 pt-2 border-t border-[var(--border)]">
        <Link
          href={`/idiomas?strong=${currentEntry.strong}`}
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-1 text-xs font-medium text-[var(--content-link)] hover:underline"
        >
          Ver léxico completo
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
