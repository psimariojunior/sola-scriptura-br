import type { PalavraGrega } from '@/data/lexicon/grego';
import type { PalavraHebraica } from '@/data/lexicon/hebraico';

let gregoCache: PalavraGrega[] | null = null;
let hebraicoCache: PalavraHebraica[] | null = null;

export async function carregarLexicoGrego(): Promise<PalavraGrega[]> {
  if (gregoCache) return gregoCache;
  const mod = await import('@/data/lexicon/grego');
  gregoCache = mod.palavrasGregas;
  return gregoCache;
}

export async function carregarLexicoHebraico(): Promise<PalavraHebraica[]> {
  if (hebraicoCache) return hebraicoCache;
  const mod = await import('@/data/lexicon/hebraico');
  hebraicoCache = mod.palavrasHebraicas;
  return hebraicoCache;
}
