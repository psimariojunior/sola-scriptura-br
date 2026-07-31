'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
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

const POPUP_MAX_WIDTH = 320;

export function LexiconPopup({ entry, allResults, position, onClose }: LexiconPopupProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [viewportSize, setViewportSize] = useState(() => {
    if (typeof window === 'undefined') return { w: 0, h: 0 };
    return { w: window.innerWidth, h: window.innerHeight };
  });
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 768;
  });

  const currentEntry = allResults && allResults.length > 1
    ? allResults[selectedIndex]?.entry ?? entry
    : entry;

  useEffect(() => {
    function update() {
      setViewportSize({ w: window.innerWidth, h: window.innerHeight });
      setIsMobile(window.innerWidth < 768);
    }
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const isHebrew = isHebrewStrong(currentEntry.strong);
  const langLabel = isHebrew ? 'Hebraico' : 'Grego';
  const hasMultiple = allResults && allResults.length > 1;

  const popupContent = useMemo(() => (
    <div className="space-y-2">
      {/* Header */}
      <div className="mb-3 flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-semibold tracking-wide" style={{ color: 'var(--brand-default)' }}>
              {currentEntry.strong}
            </span>
            <span className="text-[10px] font-medium uppercase tracking-wider" style={{ color: isHebrew ? '#3b82f6' : '#a855f7' }}>
              {langLabel}
            </span>
          </div>
          <p
            dir={isHebrew ? 'rtl' : 'ltr'}
            className="text-lg font-semibold leading-tight truncate"
            style={{ color: 'var(--content-primary)' }}
          >
            {currentEntry.palavra}
          </p>
        </div>
        <button
          onClick={onClose}
          className="flex-shrink-0 rounded-md p-1.5 transition-colors min-w-[32px] min-h-[32px] flex items-center justify-center"
          style={{ color: 'var(--content-muted)' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Transliteration */}
      <div className="flex items-center gap-2">
        <span className="text-xs" style={{ color: 'var(--content-muted)' }}>Transliteração:</span>
        <span className="text-sm italic" style={{ color: 'var(--content-primary)' }}>
          {currentEntry.transliteracao}
        </span>
      </div>

      {/* Definition */}
      <p className="text-sm leading-relaxed pt-2" style={{ color: 'var(--content-secondary)', borderTop: '1px solid var(--border)' }}>
        {currentEntry.definicao}
      </p>

      {/* Category/Frequency */}
      {'categoria' in currentEntry && (
        <div className="flex flex-wrap gap-1.5 pt-1">
          <span className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium" style={{ backgroundColor: 'var(--brand-subtle)', color: 'var(--brand-default)' }}>
            {currentEntry.categoria}
          </span>
          {'frequencia' in currentEntry && currentEntry.frequencia != null && (
            <span className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium" style={{ backgroundColor: 'var(--surface-sunken)', color: 'var(--content-muted)', border: '1px solid var(--border)' }}>
              ×{currentEntry.frequencia}
            </span>
          )}
        </div>
      )}

      {!('categoria' in currentEntry) && 'frequencia' in currentEntry && currentEntry.frequencia != null && (
        <div className="flex gap-1.5 pt-1">
          <span className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium" style={{ backgroundColor: 'var(--surface-sunken)', color: 'var(--content-muted)', border: '1px solid var(--border)' }}>
            ×{currentEntry.frequencia}
          </span>
        </div>
      )}

      {/* Multiple results selector */}
      {hasMultiple && (
        <div className="pt-2 mt-2" style={{ borderTop: '1px solid var(--border)' }}>
          <p className="text-[10px] mb-1.5" style={{ color: 'var(--content-muted)' }}>
            {allResults!.length} resultados encontrados:
          </p>
          <div className="flex flex-wrap gap-1">
            {allResults!.slice(0, 5).map((r, i) => (
              <button
                key={r.entry.strong}
                onClick={() => setSelectedIndex(i)}
                className="text-[10px] px-2 py-1 rounded-full transition-colors min-h-[28px]"
                style={i === selectedIndex
                  ? { backgroundColor: 'var(--brand-default)', color: 'var(--brand-contrast)' }
                  : { backgroundColor: 'var(--surface-sunken)', color: 'var(--content-muted)', border: '1px solid var(--border)' }
                }
              >
                {r.entry.strong}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Link */}
      <div className="mt-3 pt-2" style={{ borderTop: '1px solid var(--border)' }}>
        <Link
          href={`/idiomas?strong=${currentEntry.strong}`}
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-1 text-xs font-medium hover:underline min-h-[32px]"
          style={{ color: 'var(--brand-default)' }}
        >
          Ver léxico completo
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  ), [currentEntry, isHebrew, langLabel, hasMultiple, allResults, selectedIndex, onClose]);

  if (viewportSize.w === 0) return null;

  return createPortal(
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9998,
          background: 'rgba(0,0,0,0.4)',
        }}
      />

      {/* Mobile: centered bottom-sheet style */}
      {isMobile ? (
        <div
          style={{
            position: 'fixed',
            zIndex: 9999,
            left: '1rem',
            right: '1rem',
            top: '50%',
            transform: 'translateY(-50%)',
            maxWidth: `${viewportSize.w - 32}px`,
            maxHeight: '80vh',
            overflowY: 'auto',
            borderRadius: '1rem',
            border: '1px solid var(--border)',
            backgroundColor: 'var(--surface-raised)',
            padding: '1rem',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
            animation: 'scaleIn 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) both',
          }}
        >
          {popupContent}
        </div>
      ) : (
        /* Desktop: position near clicked word */
        <div
          ref={ref}
          style={{
            position: 'fixed',
            zIndex: 9999,
            left: position.x,
            top: position.y,
            width: POPUP_MAX_WIDTH,
            borderRadius: '0.75rem',
            border: '1px solid var(--border)',
            backgroundColor: 'var(--surface-raised)',
            padding: '1rem',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
            maxHeight: '80vh',
            overflowY: 'auto',
            animation: 'scaleIn 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) both',
            transformOrigin: 'top center',
          }}
        >
          {popupContent}
        </div>
      )}
    </>,
    document.body
  );
}
