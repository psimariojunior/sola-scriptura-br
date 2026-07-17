'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import type { LexiconEntry } from '@/lib/lexiconSearch';
import { isHebrewStrong } from '@/lib/lexiconSearch';

interface LexiconPopupProps {
  entry: LexiconEntry;
  position: { x: number; y: number };
  onClose: () => void;
}

export function LexiconPopup({ entry, position, onClose }: LexiconPopupProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [adjustedPos, setAdjustedPos] = useState(position);

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

  const isHebrew = isHebrewStrong(entry.strong);
  const langLabel = isHebrew ? 'Hebraico' : 'Grego';
  const langColor = isHebrew ? 'text-blue-400' : 'text-purple-400';

  return (
    <AnimatePresence>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, scale: 0.9, y: 4 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 4 }}
        transition={{ duration: 0.15, ease: 'easeOut' }}
        className="fixed z-50 w-80 max-w-[calc(100vw-2rem)] rounded-xl border border-[var(--border)] bg-[var(--surface-raised)] p-4 shadow-[var(--shadow-lg)]"
        style={{ left: adjustedPos.x, top: adjustedPos.y }}
      >
        <div className="mb-3 flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono font-semibold tracking-wide text-[var(--brand-default)]">
                {entry.strong}
              </span>
              <span className={`text-[10px] font-medium uppercase tracking-wider ${langColor}`}>
                {langLabel}
              </span>
            </div>
            <p
              dir={isHebrew ? 'rtl' : 'ltr'}
              className="text-lg font-semibold text-[var(--content-primary)] leading-tight truncate"
            >
              {entry.palavra}
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

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs text-[var(--content-muted)]">Transliteração:</span>
            <span className="text-sm italic text-[var(--content-primary)]">
              {entry.transliteracao}
            </span>
          </div>

          <p className="text-sm text-[var(--content-secondary)] leading-relaxed border-t border-[var(--border)] pt-2">
            {entry.definicao}
          </p>

          {'categoria' in entry && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              <span className="inline-flex items-center rounded-full bg-[var(--brand-subtle)] px-2 py-0.5 text-[10px] font-medium text-[var(--brand-default)]">
                {entry.categoria}
              </span>
              {'frequencia' in entry && entry.frequencia != null && (
                <span className="inline-flex items-center rounded-full bg-[var(--accent)] px-2 py-0.5 text-[10px] font-medium text-[var(--content-muted)]">
                  ×{entry.frequencia}
                </span>
              )}
            </div>
          )}

          {!('categoria' in entry) && 'frequencia' in entry && entry.frequencia != null && (
            <div className="flex gap-1.5 pt-1">
              <span className="inline-flex items-center rounded-full bg-[var(--accent)] px-2 py-0.5 text-[10px] font-medium text-[var(--content-muted)]">
                ×{entry.frequencia}
              </span>
            </div>
          )}
        </div>

        <div className="mt-3 pt-2 border-t border-[var(--border)]">
          <Link
            href={`/idiomas?strong=${entry.strong}`}
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1 text-xs font-medium text-[var(--content-link)] hover:underline"
          >
            Ver lexicon completo
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
