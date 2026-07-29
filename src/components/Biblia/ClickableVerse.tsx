'use client';

import { memo, useCallback, useState, useRef } from 'react';
import { findWordInText, type LexiconResult } from '@/lib/lexiconSearch';
import { LexiconPopup } from './LexiconPopup';

interface ClickableVerseProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

function extractWords(text: string): Array<{ word: string; isClickable: boolean }> {
  const tokens = text.split(/(\s+|[.,;:!?\u2014\u2013()""'']+)/);
  return tokens.map((token) => {
    const cleaned = token.replace(/[.,;:!?\u2014\u2013()""''"]/g, '');
    return {
      word: token,
      isClickable: cleaned.length > 2 && /^[a-zA-ZÀ-ÿ\u00C0-\u024F]+$/.test(cleaned),
    };
  });
}

export const ClickableVerse = memo(function ClickableVerse({
  text,
  className = '',
  style,
}: ClickableVerseProps) {
  const [popup, setPopup] = useState<{
    results: LexiconResult[];
    position: { x: number; y: number };
  } | null>(null);
  const containerRef = useRef<HTMLSpanElement>(null);

  const handleWordClick = useCallback(
    (word: string, e: React.MouseEvent) => {
      e.stopPropagation();
      const cleaned = word.replace(/[.,;:!?\u2014\u2013()""''"]/g, '');
      if (cleaned.length <= 2) return;

      const results = findWordInText(cleaned);
      if (results.length === 0) return;

      const rect = (e.target as HTMLElement).getBoundingClientRect();
      setPopup({
        results,
        position: {
          x: rect.left + rect.width / 2,
          y: rect.bottom + 8,
        },
      });
    },
    []
  );

  const handleClose = useCallback(() => setPopup(null), []);

  const tokens = extractWords(text);

  return (
    <span ref={containerRef} className={className} style={style}>
      {tokens.map((token, i) => {
        if (token.isClickable) {
          return (
            <span
              key={i}
              onClick={(e) => handleWordClick(token.word, e)}
              className="cursor-pointer border-b border-dashed border-[var(--content-muted)] hover:border-[var(--brand-default)] hover:text-[var(--brand-default)] transition-colors duration-150"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  const cleaned = token.word.replace(
                    /[.,;:!?\u2014\u2013()""''"]/g,
                    ''
                  );
                  if (cleaned.length > 2) {
                    const results = findWordInText(cleaned);
                    if (results.length > 0 && containerRef.current) {
                      setPopup({
                        results,
                        position: {
                          x: window.innerWidth / 2,
                          y: 100,
                        },
                      });
                    }
                  }
                }
              }}
            >
              {token.word}
            </span>
          );
        }
        return <span key={i}>{token.word}</span>;
      })}

      {popup && (
        <LexiconPopup
          entry={popup.results[0].entry}
          allResults={popup.results}
          position={popup.position}
          onClose={handleClose}
        />
      )}
    </span>
  );
});
