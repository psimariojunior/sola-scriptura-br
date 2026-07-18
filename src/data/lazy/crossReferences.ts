'use client';

import { useState, useEffect } from 'react';

export function useCrossReferencesLazy(referencia: string) {
  const [refs, setRefs] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    import('@/data/crossReferences').then(mod => {
      if (cancelled) return;
      setRefs(mod.crossReferences[referencia] || []);
      setLoading(false);
    });
    return () => { cancelled = true; };
  }, [referencia]);

  return { refs, loading };
}

export async function getCrossReferencesLazy(referencia: string): Promise<string[]> {
  const mod = await import('@/data/crossReferences');
  return mod.crossReferences[referencia] || [];
}
