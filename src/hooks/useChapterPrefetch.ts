'use client';

import { useCallback, useRef } from 'react';
import { obterCapituloMulti } from '@/data/biblia/texto/carregar';
import { livroPorAbreviacao } from '@/data/biblia/livros';
import { cacheChapter } from '@/lib/offline';

const prefetchedChapters = new Set<string>();

export function useChapterPrefetch(traducao: string = 'nvi') {
  const prefetchQueue = useRef<Promise<void>[]>([]);

  const prefetch = useCallback(async (livro: string, cap: number) => {
    const key = `${traducao}:${livro}:${cap}`;
    if (prefetchedChapters.has(key)) return;

    prefetchedChapters.add(key);
    const promise = obterCapituloMulti(livro, cap, [traducao]).then((result) => {
      for (const item of result) {
        cacheChapter(livro, cap, item.traducao, item.versiculos.map(v => v.texto));
      }
    }).catch(() => {});
    prefetchQueue.current.push(promise);

    if (prefetchedChapters.size > 30) {
      const iter = prefetchedChapters.values();
      for (let i = 0; i < 10; i++) {
        const old = iter.next().value;
        if (old) prefetchedChapters.delete(old);
      }
    }
  }, [traducao]);

  const prefetchAdjacent = useCallback((livro: string, cap: number) => {
    const book = livroPorAbreviacao.get(livro);
    if (!book) return;

    // Prefetch next chapters first (most likely to be needed)
    for (let i = 1; i <= 3; i++) {
      if (cap + i <= book.totalCapitulos) prefetch(livro, cap + i);
    }
    // Then previous chapters
    for (let i = 1; i <= 2; i++) {
      if (cap - i >= 1) prefetch(livro, cap - i);
    }
  }, [prefetch]);

  const prefetchBook = useCallback((livro: string, maxChapters: number = 5) => {
    for (let i = 1; i <= maxChapters; i++) {
      prefetch(livro, i);
    }
  }, [prefetch]);

  const clearPrefetchCache = useCallback(() => {
    prefetchedChapters.clear();
  }, []);

  return {
    prefetch,
    prefetchAdjacent,
    prefetchBook,
    clearPrefetchCache,
  };
}
