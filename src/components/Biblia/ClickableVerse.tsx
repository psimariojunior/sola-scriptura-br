'use client';

import { memo, useCallback, useState, useRef, useMemo, useEffect } from 'react';
import { getStrongByNumber, getTestamentoByLivro, type LexiconResult } from '@/lib/lexiconSearch';
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

function limparPalavra(token: string): string {
  return token.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, '');
}

function ehClicavel(cleaned: string): boolean {
  return cleaned.length > 2 && /^[\p{L}]+$/u.test(cleaned);
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
    palavraPt: string;
    position: { x: number; y: number };
  } | null>(null);
  const containerRef = useRef<HTMLSpanElement>(null);
  const testamento = livroAbreviacao ? getTestamentoByLivro(livroAbreviacao) : undefined;

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

  const ptWords = useMemo(() => text.split(/\s+/).filter(Boolean), [text]);

  const handleWordClick = useCallback(
    async (word: string, e: React.MouseEvent, wordIndex: number) => {
      e.stopPropagation();
      const cleaned = limparPalavra(word);
      if (!ehClicavel(cleaned)) return;

      let alinhadas = palavrasAlinhadas;
      if (!alinhadas && livroAbreviacao && capitulo != null && numero != null) {
        const mod = await import('@/lib/wordAlignment');
        alinhadas = await mod.alinharVersiculo(livroAbreviacao, capitulo, numero, text);
      }

      let results: LexiconResult[] = [];
      const alinhada = alinhadas?.[wordIndex];

      if (alinhada?.strong && alinhada.palavraOriginal) {
        results = [{
          entry: {
            strong: alinhada.strong,
            palavra: alinhada.palavraOriginal,
            transliteracao: alinhada.transliteracao || '',
            definicao: alinhada.definicao || '',
          },
          score: 1,
        }];
        if (!alinhada.definicao) {
          const entry = await getStrongByNumber(alinhada.strong);
          if (entry) {
            results = [{
              entry: {
                ...entry,
                palavra: alinhada.palavraOriginal || entry.palavra,
                transliteracao: alinhada.transliteracao || entry.transliteracao,
              },
              score: 1,
            }];
          }
        }
      } else if (alinhada?.strong) {
        const entry = await getStrongByNumber(alinhada.strong);
        if (entry) results = [{ entry, score: 1 }];
      }

      if (results.length === 0) {
        const { findWordInText } = await import('@/lib/lexiconSearch');
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
        if (y + 400 > window.innerHeight - VIEWPORT_MARGIN) y = rect.top - 8;
        y = Math.max(VIEWPORT_MARGIN, y);
      }

      setPopup({ results, palavraPt: cleaned, position: { x, y } });
    },
    [palavrasAlinhadas, testamento, livroAbreviacao, capitulo, numero, text]
  );

  const handleClose = useCallback(() => setPopup(null), []);

  return (
    <span ref={containerRef} className={className} style={style}>
      {ptWords.map((token, i) => {
        const cleaned = limparPalavra(token);
        const clickable = ehClicavel(cleaned);
        return (
          <span key={`${i}-${token.slice(0, 8)}`}>
            {clickable ? (
              <span
                onClick={(e) => handleWordClick(token, e, i)}
                className="bible-word cursor-pointer rounded-sm hover:text-primary transition-colors duration-150"
              >
                {token}
              </span>
            ) : (
              token
            )}
            {i < ptWords.length - 1 ? ' ' : null}
          </span>
        );
      })}

      {popup && (
        <LexiconPopup
          entry={popup.results[0].entry}
          allResults={popup.results}
          palavraPt={popup.palavraPt}
          position={popup.position}
          onClose={handleClose}
        />
      )}
    </span>
  );
});
