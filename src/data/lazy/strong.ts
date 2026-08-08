'use client';

import { useEffect, useState } from 'react';
import type { PalavraStrong } from '@/data/biblia/strong';

export function useStrongLazy(livro: string, capitulo: number, versiculo: number) {
  const [palavras, setPalavras] = useState<PalavraStrong[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    import('@/data/biblia/strong').then(async (mod) => {
      if (cancelled) return;
      try {
        setPalavras(await mod.getStrongPorVersiculo(livro, capitulo, versiculo) ?? []);
      } catch {
        setPalavras([]);
      }
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [livro, capitulo, versiculo]);
  return { palavras, loading };
}

export async function getStrongPorVersiculoLazy(livro: string, capitulo: number, versiculo: number): Promise<PalavraStrong[]> {
  const mod = await import('@/data/biblia/strong');
  return mod.getStrongPorVersiculo(livro, capitulo, versiculo) ?? [];
}
