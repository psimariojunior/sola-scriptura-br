'use client';

import { useState, useEffect } from 'react';
import type { PalavraGrega } from '@/data/lexicon/grego';
import type { PalavraHebraica } from '@/data/lexicon/hebraico';

export function useLexiconLazy() {
  const [palavrasGregas, setGregas] = useState<PalavraGrega[]>([]);
  const [palavrasHebraicas, setHebraicas] = useState<PalavraHebraica[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    Promise.all([
      import('@/data/lexicon/grego'),
      import('@/data/lexicon/hebraico'),
    ]).then(([gregoMod, hebraicoMod]) => {
      if (cancelled) return;
      setGregas(gregoMod.palavrasGregas);
      setHebraicas(hebraicoMod.palavrasHebraicas);
      setLoading(false);
    });
    return () => { cancelled = true; };
  }, []);

  return { palavrasGregas, palavrasHebraicas, loading };
}

export function usePalavrasGregasLazy() {
  const [palavras, setPalavras] = useState<PalavraGrega[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    import('@/data/lexicon/grego').then(mod => {
      if (cancelled) return;
      setPalavras(mod.palavrasGregas);
      setLoading(false);
    });
    return () => { cancelled = true; };
  }, []);

  return { palavras, loading };
}

export function usePalavrasHebraicasLazy() {
  const [palavras, setPalavras] = useState<PalavraHebraica[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    import('@/data/lexicon/hebraico').then(mod => {
      if (cancelled) return;
      setPalavras(mod.palavrasHebraicas);
      setLoading(false);
    });
    return () => { cancelled = true; };
  }, []);

  return { palavras, loading };
}

export async function getLexiconLazy() {
  const [gregoMod, hebraicoMod] = await Promise.all([
    import('@/data/lexicon/grego'),
    import('@/data/lexicon/hebraico'),
  ]);
  return {
    palavrasGregas: gregoMod.palavrasGregas,
    palavrasHebraicas: hebraicoMod.palavrasHebraicas,
  };
}
