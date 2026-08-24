export interface LexiconWord {
  strong: string;
  palavra: string;
  transliteracao: string;
  definicao: string;
  lingua: 'grego' | 'hebraico';
  definicaoResumida?: string;
  categoria?: string;
  morphologia?: string;
  morfologia?: string;
  frequencia?: number;
  pronuncia?: string;
  uso?: string;
  notas?: string;
  versiculos?: string[];
  palavrasDerivadas?: string[];
}
