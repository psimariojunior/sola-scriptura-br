import { STRONG_POR_VERSICULO } from './strong';

// Tipo reexportado
export type { PalavraStrong } from './strong';

export interface EntradaConcordancia {
  strong: string;
  palavra: string;
  transliteracao: string;
  definicao: string;
  idioma: 'grego' | 'hebraico';
  ocorrencias: string[]; // array de "livro:cap:ver"
}

// Build the concordance index from strong data
function buildConcordancia(): Map<string, EntradaConcordancia> {
  const index = new Map<string, EntradaConcordancia>();
  for (const [chave, palavras] of Object.entries(STRONG_POR_VERSICULO)) {
    for (const p of palavras) {
      const existing = index.get(p.strong);
      if (existing) {
        existing.ocorrencias.push(chave);
      } else {
        index.set(p.strong, {
          strong: p.strong,
          palavra: p.palavra,
          transliteracao: p.transliteracao,
          definicao: p.definicao,
          idioma: p.idioma,
          ocorrencias: [chave],
        });
      }
    }
  }
  return index;
}

const concordancia = buildConcordancia();

export function getEntradaConcordancia(strong: string): EntradaConcordancia | undefined {
  return concordancia.get(strong);
}

export function buscarConcordancia(pesquisa: string): EntradaConcordancia[] {
  const termo = pesquisa.toLowerCase();
  return Array.from(concordancia.values()).filter(e =>
    e.strong.toLowerCase().includes(termo) ||
    e.palavra.toLowerCase().includes(termo) ||
    e.transliteracao.toLowerCase().includes(termo) ||
    e.definicao.toLowerCase().includes(termo)
  );
}

export function getConcordanciaPorIdioma(idioma: 'grego' | 'hebraico'): EntradaConcordancia[] {
  return Array.from(concordancia.values()).filter(e => e.idioma === idioma);
}

export function getPalavrasMaisFrequentes(idioma: 'grego' | 'hebraico', limite: number = 20): EntradaConcordancia[] {
  return getConcordanciaPorIdioma(idioma)
    .sort((a, b) => b.ocorrencias.length - a.ocorrencias.length)
    .slice(0, limite);
}
