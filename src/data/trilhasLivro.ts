/** Nível do que o certificado pode atestar — nunca inflar síntese a «avançado». */
export type NivelTrilha = 'profundo' | 'sintese' | 'introducao';

export interface TrilhaLivro {
  slug: string;
  livroAbrev: string;
  livroNome: string;
  titulo: string;
  descricao: string;
  /** Só `profundo` quando todos os capítulos têm ficha escrita à mão. */
  nivel: NivelTrilha;
  totalCapitulos: number;
  criterio: string;
  oQueAtesta: string;
  oQueNaoAtesta: string;
}

/**
 * Trilhas oficiais com certificado. Só livros cuja ficha profunda cobre o cânon inteiro.
 * Não inventar capítulos genéricos: o índice vem de `estudosCapituloProfundos`.
 */
export const TRILHAS_LIVRO: TrilhaLivro[] = [
  {
    slug: 'joao',
    livroAbrev: 'jo',
    livroNome: 'Evangelho de João',
    titulo: 'João — trilha capítulo a capítulo',
    descricao:
      'Leia os 21 capítulos do Evangelho de João e responda à pergunta da ficha profunda de cada um. O certificado atesta essa leitura e essas respostas — não um grau, nem carga horária.',
    nivel: 'profundo',
    totalCapitulos: 21,
    criterio:
      'Cada capítulo exige duas coisas: abrir o texto na Bíblia (marcado como lido) e responder, com suas palavras, à pergunta da ficha profunda.',
    oQueAtesta:
      'Leitura dos 21 capítulos do Evangelho de João e resposta à pergunta da ficha profunda de cada capítulo neste dispositivo.',
    oQueNaoAtesta:
      'Carga horária acadêmica, diploma de seminário, ordenação, equivalência institucional ou verificação de identidade além do nome informado.',
  },
  {
    slug: 'romanos',
    livroAbrev: 'rm',
    livroNome: 'Epístola aos Romanos',
    titulo: 'Romanos — trilha capítulo a capítulo',
    descricao:
      'Leia os 16 capítulos de Romanos e responda à pergunta da ficha profunda de cada um. O certificado atesta essa leitura e essas respostas — não um grau, nem carga horária.',
    nivel: 'profundo',
    totalCapitulos: 16,
    criterio:
      'Cada capítulo exige duas coisas: abrir o texto na Bíblia (marcado como lido) e responder, com suas palavras, à pergunta da ficha profunda.',
    oQueAtesta:
      'Leitura dos 16 capítulos da Epístola aos Romanos e resposta à pergunta da ficha profunda de cada capítulo neste dispositivo.',
    oQueNaoAtesta:
      'Carga horária acadêmica, diploma de seminário, ordenação, equivalência institucional ou verificação de identidade além do nome informado.',
  },
];

export function obterTrilhaPorSlug(slug: string): TrilhaLivro | undefined {
  return TRILHAS_LIVRO.find((t) => t.slug === slug);
}

export function obterTrilhaPorLivro(abrev: string): TrilhaLivro | undefined {
  const key = abrev.trim().toLowerCase();
  return TRILHAS_LIVRO.find((t) => t.livroAbrev === key);
}
