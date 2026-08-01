'use client';

import { useEffect, useState } from 'react';

export function useCrossReferencesLazy(livro: string, capitulo: number, versiculo: number) {
  const [refs, setRefs] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    import('@/data/crossReferences').then((mod) => {
      if (cancelled) return;
      try {
        const result = mod.getCrossReferences(livro, capitulo, versiculo) ?? [];
        setRefs(result);
      } catch {
        setRefs([]);
      }
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [livro, capitulo, versiculo]);
  return { refs, loading };
}

export async function getCrossReferencesLazy(livro: string, capitulo: number, versiculo: number): Promise<string[]> {
  const mod = await import('@/data/crossReferences');
  return mod.getCrossReferences(livro, capitulo, versiculo) ?? [];
}
