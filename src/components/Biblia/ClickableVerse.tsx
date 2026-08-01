'use client';

import { memo, useCallback, useState, useRef, useMemo, useEffect } from 'react';
import { findWordInText, getStrongByNumber, getTestamentoByLivro, type LexiconEntry, type LexiconResult } from '@/lib/lexiconSearch';
import type { PalavraAlinhada } from '@/lib/wordAlignment';
import { LexiconPopup } from './LexiconPopup';

interface ClickableVerseProps {
  text: string;
  livroAbreviacao?: string;
  capitulo?: number;
  numero?: number;
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
  livroAbreviacao,
  capitulo,
  numero,
  className = '',
  style,
}: ClickableVerseProps) {
  const [popup, setPopup] = useState<{
    results: LexiconResult[];
    position: { x: number; y: number };
  } | null>(null);
  const containerRef = useRef<HTMLSpanElement>(null);

  const testamento = livroAbreviacao ? getTestamentoByLivro(livroAbreviacao) : undefined;

  // Pre-compute Strong's alignment when verse context is available
  const [palavrasAlinhadas, setPalavrasAlinhadas] = useState<PalavraAlinhada[] | null>(null);
  useEffect(() => {
    let cancelled = false;
    if (!livroAbreviacao || capitulo == null || numero == null) {
      setPalavrasAlinhadas(null);
      return;
    }
    (async () => {
      const mod = await import('@/lib/wordAlignment');
      const result = await mod.alinharVersiculo(livroAbreviacao, capitulo, numero, text);
      if (!cancelled) setPalavrasAlinhadas(result);
    })();
    return () => {
      cancelled = true;
    };
  }, [livroAbreviacao, capitulo, numero, text]);

  // Map word index to PalavraAlinhada for quick lookup
  const alignmentMap = useMemo(() => {
    if (!palavrasAlinhadas) return null;
    const map = new Map<number, PalavraAlinhada>();
    palavrasAlinhadas.forEach((p, i) => {
      if (p.strong) map.set(i, p);
    });
    return map;
  }, [palavrasAlinhadas]);

  // Extract clean words for indexing
  const cleanWords = useMemo(() => {
    return text.split(/\s+/);
  }, [text]);

  // Map word index (from space-split) to alignment data
  const ptWords = useMemo(() => text.split(/\s+/), [text]);

  const handleWordClick = useCallback(
    async (word: string, e: React.MouseEvent, wordIndex?: number) => {
      e.stopPropagation();
      const cleaned = word.replace(/[.,;:!?\u2014\u2013()""''"]/g, '');
      if (cleaned.length <= 2) return;

      let results: LexiconResult[] = [];

      // Try Strong's alignment first (exact match)
      if (alignmentMap && wordIndex != null) {
        const alinhada = alignmentMap.get(wordIndex);
        if (alinhada?.strong) {
          const entry = await getStrongByNumber(alinhada.strong);
          if (entry) {
            results = [{ entry, score: 1.0 }];
          }
        }
      }

      // Fall back to fuzzy text search
      if (results.length === 0) {
        results = await findWordInText(cleaned, testamento ?? undefined);
      }

      if (results.length === 0) return;

      const rect = (e.target as HTMLElement).getBoundingClientRect();
      const vw = window.innerWidth;
      const isMobile = vw < 768;

      let x: number;
      let y: number;

      if (isMobile) {
        x = vw / 2;
        y = rect.bottom + 8;
      } else {
        const POPUP_MAX_WIDTH = 320;
        const VIEWPORT_MARGIN = 12;
        x = Math.max(VIEWPORT_MARGIN, Math.min(
          rect.left + rect.width / 2 - POPUP_MAX_WIDTH / 2,
          vw - POPUP_MAX_WIDTH - VIEWPORT_MARGIN
        ));
        y = rect.bottom + 8;
        const vh = window.innerHeight;
        if (y + 400 > vh - VIEWPORT_MARGIN) {
          y = rect.top - 8;
        }
        y = Math.max(VIEWPORT_MARGIN, y);
      }

      setPopup({
        results,
        position: { x, y },
      });
    },
    [alignmentMap, testamento]
  );

  const handleClose = useCallback(() => setPopup(null), []);

  const tokens = extractWords(text);

  return (
    <span ref={containerRef} className={className} style={style}>
      {tokens.map((token, i) => {
        // Find the word index in the space-split array
        // Find the word index in the space-split array for alignment lookup
        const wordIndex = (() => {
          let idx = 0;
          for (let j = 0; j < tokens.length; j++) {
            if (j === i) return idx;
            // Count only actual words (non-punctuation tokens)
            if (tokens[j].isClickable) idx++;
          }
          return -1;
        })();

        if (token.isClickable) {
          return (
            <span
              key={i}
              onClick={(e) => handleWordClick(token.word, e, wordIndex)}
              className="cursor-pointer border-b border-dashed border-[var(--content-muted)] hover:border-[var(--brand-default)] hover:text-[var(--brand-default)] transition-colors duration-150"
              role="button"
              tabIndex={0}
              onKeyDown={async (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  const cleaned = token.word.replace(
                    /[.,;:!?\u2014\u2013()""''"]/g,
                    ''
                  );
                  if (cleaned.length > 2) {
                    let results: LexiconResult[] = [];

                    // Try Strong's alignment first
                    if (alignmentMap && wordIndex >= 0) {
                      const alinhada = alignmentMap.get(wordIndex);
                      if (alinhada?.strong) {
                        const entry = await getStrongByNumber(alinhada.strong);
                        if (entry) results = [{ entry, score: 1.0 }];
                      }
                    }

                    // Fall back to fuzzy search
                    if (results.length === 0) {
                      results = await findWordInText(cleaned, testamento ?? undefined);
                    }

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
