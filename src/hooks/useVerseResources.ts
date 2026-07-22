'use client';

import { useState, useEffect, useRef } from 'react';

type ResourceChecker = (livro: string, capitulo: number, versiculo: number) => boolean;

let cachedChecker: ResourceChecker | null = null;
let loadingPromise: Promise<ResourceChecker> | null = null;

async function loadChecker(): Promise<ResourceChecker> {
  if (cachedChecker) return cachedChecker;
  if (loadingPromise) return loadingPromise;

  loadingPromise = (async () => {
    try {
      const [crossMod, recursosMod] = await Promise.all([
        import('@/data/biblia/crossReferences'),
        import('@/data/biblia/versiculoRecursos'),
      ]);
      cachedChecker = (livro: string, capitulo: number, versiculo: number) => {
        try {
          const tipos = recursosMod.getTiposRecursoDisponiveis(livro, capitulo, versiculo);
          const refs = crossMod.getCrossReferencesByVerse(livro, capitulo, versiculo);
          return tipos.length > 0 || refs.length > 0;
        } catch {
          return false;
        }
      };
      return cachedChecker;
    } catch {
      cachedChecker = () => false;
      return cachedChecker;
    }
  })();

  return loadingPromise;
}

export function useVerseResources(): { isLoaded: boolean; hasResources: ResourceChecker } {
  const [isLoaded, setIsLoaded] = useState(!!cachedChecker);
  const checkerRef = useRef<ResourceChecker>(() => false);

  useEffect(() => {
    if (cachedChecker) {
      checkerRef.current = cachedChecker;
      setIsLoaded(true);
      return;
    }
    loadChecker().then((checker) => {
      checkerRef.current = checker;
      setIsLoaded(true);
    });
  }, []);

  return {
    isLoaded,
    hasResources: (livro: string, capitulo: number, versiculo: number) => {
      if (cachedChecker) return cachedChecker(livro, capitulo, versiculo);
      return checkerRef.current(livro, capitulo, versiculo);
    },
  };
}
