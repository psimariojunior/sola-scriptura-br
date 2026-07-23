'use client';

import { useCallback, useRef } from 'react';
import { carregarCapitulo } from '@/lib/apresentacao/versiculos';
import { livroPorAbreviacao } from '@/data/biblia/livros';

const prefetchedChapters = new Set<string>();

export function useChapterPrefetch(traducao: string = 'nvi') {
  const prefetchQueue = useRef<Promise<void>[]>([]);

  const prefetch = useCallback(async (livro: string, cap: number) => {
    const key = `${traducao}:${livro}:${cap}`;
    if (prefetchedChapters.has(key)) return;

    prefetchedChapters.add(key);
    const promise = carregarCapitulo(livro, cap, traducao).then(() => {}).catch(() => {});
    prefetchQueue.current.push(promise);

    if (prefetchQueue.current.length > 5) {
      prefetchQueue.current.shift();
    }
  }, [traducao]);

  const prefetchAdjacent = useCallback((livro: string, cap: number) => {
    const book = livroPorAbreviacao.get(livro);
    if (!book) return;

    if (cap > 1) prefetch(livro, cap - 1);
    if (cap < book.totalCapitulos) prefetch(livro, cap + 1);

    if (cap > 2) prefetch(livro, cap - 2);
    if (cap < book.totalCapitulos - 1) prefetch(livro, cap + 2);
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
