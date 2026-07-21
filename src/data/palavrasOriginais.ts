import { palavrasGregas } from './lexicon/grego';
import { palavrasHebraicas } from './lexicon/hebraico';

export interface PalavraOriginal {
  strong: string;
  palavra: string;
  transliteracao: string;
  definicao: string;
  idioma: 'grego' | 'hebraico';
  morfologia?: string;
  frequencia?: number;
}

export const palavrasOriginais: PalavraOriginal[] = [
  ...palavrasGregas.map((g) => ({ ...g, idioma: 'grego' as const })),
  ...palavrasHebraicas.map((h) => ({ ...h, idioma: 'hebraico' as const })),
];
