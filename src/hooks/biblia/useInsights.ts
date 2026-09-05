'use client';

import { useState, useEffect, useCallback } from 'react';

export interface VerseInsight {
  comentario: { autor: string; texto: string; tipo: string } | null;
  crossRefTop: { referencia: string; texto: string } | null;
  palavraChave: { palavra: string; strong: string; definicao: string; idioma: 'hebraico' | 'grego' } | null;
  loading: boolean;
}

const cache = new Map<string, VerseInsight>();

// Top 50 common verses for pre-computation
const COMMON_VERSES = [
  { livro: 'gn', cap: 1, v: 1 },
  { livro: 'gn', cap: 1, v: 3 },
  { livro: 'gn', cap: 1, v: 26 },
  { livro: 'gn', cap: 3, v: 15 },
  { livro: 'gn', cap: 12, v: 1 },
  { livro: 'gn', cap: 15, v: 6 },
  { livro: 'gn', cap: 22, v: 14 },
  { livro: 'ex', cap: 3, v: 14 },
  { livro: 'ex', cap: 20, v: 12 },
  { livro: 'dt', cap: 6, v: 4 },
  { livro: 'js', cap: 1, v: 9 },
  { livro: 'sl', cap: 23, v: 1 },
  { livro: 'sl', cap: 23, v: 4 },
  { livro: 'sl', cap: 46, v: 1 },
  { livro: 'sl', cap: 119, v: 105 },
  { livro: 'pv', cap: 3, v: 5 },
  { livro: 'pv', cap: 3, v: 6 },
  { livro: 'ec', cap: 3, v: 1 },
  { livro: 'is', cap: 9, v: 6 },
  { livro: 'is', cap: 40, v: 31 },
  { livro: 'is', cap: 53, v: 5 },
  { livro: 'jr', cap: 29, v: 11 },
  { livro: 'lm', cap: 3, v: 22 },
  { livro: 'mc', cap: 3, v: 16 },
  { livro: 'mt', cap: 5, v: 3 },
  { livro: 'mt', cap: 5, v: 14 },
  { livro: 'mt', cap: 6, v: 33 },
  { livro: 'mt', cap: 11, v: 28 },
  { livro: 'mt', cap: 22, v: 37 },
  { livro: 'mt', cap: 28, v: 19 },
  { livro: 'mc', cap: 10, v: 27 },
  { livro: 'lc', cap: 1, v: 37 },
  { livro: 'lc', cap: 2, v: 14 },
  { livro: 'jo', cap: 1, v: 1 },
  { livro: 'jo', cap: 1, v: 14 },
  { livro: 'jo', cap: 3, v: 16 },
  { livro: 'jo', cap: 8, v: 32 },
  { livro: 'jo', cap: 10, v: 10 },
  { livro: 'jo', cap: 11, v: 25 },
  { livro: 'jo', cap: 14, v: 6 },
  { livro: 'jo', cap: 15, v: 5 },
  { livro: 'at', cap: 1, v: 8 },
  { livro: 'rm', cap: 5, v: 8 },
  { livro: 'rm', cap: 8, v: 28 },
  { livro: 'rm', cap: 8, v: 38 },
  { livro: 'rm', cap: 12, v: 2 },
  { livro: 'rm', cap: 12, v: 21 },
  { livro: '1co', cap: 10, v: 13 },
  { livro: '1co', cap: 13, v: 4 },
  { livro: '2co', cap: 5, v: 17 },
];

async function computeInsight(livro: string, cap: number, v: number): Promise<VerseInsight> {
  const insight: VerseInsight = {
    comentario: null,
    crossRefTop: null,
    palavraChave: null,
    loading: false,
  };

  try {
    // Load comments
    const { obterComentarios } = await import('@/data/comentarios');
    const comentarios = obterComentarios(livro, cap, v);
    if (comentarios.length > 0) {
      insight.comentario = {
        autor: comentarios[0].autor || 'Comentário',
        texto: comentarios[0].texto,
        tipo: 'comentario',
      };
    }
  } catch { /* ignore */ }

  try {
    // Load cross-references
    const { getCrossReferencesByVerse } = await import('@/data/biblia/crossReferences');
    const refs = getCrossReferencesByVerse(livro, cap, v);
    if (refs.length > 0) {
      insight.crossRefTop = {
        referencia: refs[0].to,
        texto: refs[0].description || '',
      };
    }
  } catch { /* ignore */ }

  try {
    // Load lexicon (first few words)
    const [hebMod, greMod] = await Promise.all([
      import('@/data/lexicon/hebraico'),
      import('@/data/lexicon/grego'),
    ]);
    const hebData = (hebMod as any).palavrasHebraicos || (hebMod as any).palavrasHebraicas || [];
    const greData = (greMod as any).palavrasGregas || (greMod as any).palavrasGrega || [];
    const entry = hebData[0] || greData[0];
    if (entry?.palavra) {
      insight.palavraChave = {
        palavra: entry.palavra,
        strong: entry.strong || '',
        definicao: entry.definicao || entry.significado || '',
        idioma: hebData[0] ? 'hebraico' : 'grego',
      };
    }
  } catch { /* ignore */ }

  return insight;
}

export function useInsights(livro: string, capitulo: number, versiculo: number) {
  const [insight, setInsight] = useState<VerseInsight>({
    comentario: null,
    crossRefTop: null,
    palavraChave: null,
    loading: false,
  });

  const key = `${livro}:${capitulo}:${versiculo}`;

  useEffect(() => {
    let cancelled = false;

    // Check cache first
    const cached = cache.get(key);
    if (cached) {
      setInsight(cached);
      return;
    }

    setInsight(prev => ({ ...prev, loading: true }));

    computeInsight(livro, capitulo, versiculo).then(result => {
      if (cancelled) return;
      cache.set(key, result);
      setInsight(result);
    });

    return () => { cancelled = true; };
  }, [livro, capitulo, versiculo, key]);

  return insight;
}

// Pre-compute insights for common verses on idle
export function precomputeInsights() {
  if (typeof requestIdleCallback === 'undefined') return;
  requestIdleCallback(() => {
    for (const ref of COMMON_VERSES) {
      const key = `${ref.livro}:${ref.cap}:${ref.v}`;
      if (!cache.has(key)) {
        computeInsight(ref.livro, ref.cap, ref.v).then(result => {
          cache.set(key, result);
        });
      }
    }
  });
}
