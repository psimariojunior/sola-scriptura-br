import { getStrongPorChave, getVersiculosComStrong } from './strong';
import type { PalavraStrong } from './strong';

export type { PalavraStrong } from './strong';

export interface EntradaConcordancia {
  strong: string;
  palavra: string;
  transliteracao: string;
  definicao: string;
  idioma: 'grego' | 'hebraico';
  ocorrencias: string[];
}

let _concordancia: Map<string, EntradaConcordancia> | null = null;

async function buildConcordancia(): Promise<Map<string, EntradaConcordancia>> {
  const index = new Map<string, EntradaConcordancia>();
  const versiculos = getVersiculosComStrong();
  for (const chave of versiculos) {
    const palavras = await getStrongPorChave(chave);
    for (const p of palavras) {
      const existing = index.get(p.strong);
      if (existing) {
        if (!existing.ocorrencias.includes(chave)) {
          existing.ocorrencias.push(chave);
        }
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

async function getConcordancia(): Promise<Map<string, EntradaConcordancia>> {
  if (!_concordancia) {
    _concordancia = await buildConcordancia();
  }
  return _concordancia;
}

export async function getEntradaConcordancia(strong: string): Promise<EntradaConcordancia | undefined> {
  return (await getConcordancia()).get(strong);
}

export async function buscarConcordancia(pesquisa: string): Promise<EntradaConcordancia[]> {
  const termo = pesquisa.toLowerCase();
  const concordancia = await getConcordancia();
  return Array.from(concordancia.values()).filter(e =>
    e.strong.toLowerCase().includes(termo) ||
    e.palavra.toLowerCase().includes(termo) ||
    e.transliteracao.toLowerCase().includes(termo) ||
    e.definicao.toLowerCase().includes(termo)
  );
}

export async function getConcordanciaPorIdioma(idioma: 'grego' | 'hebraico'): Promise<EntradaConcordancia[]> {
  const concordancia = await getConcordancia();
  return Array.from(concordancia.values()).filter(e => e.idioma === idioma);
}

export async function getPalavrasMaisFrequentes(idioma: 'grego' | 'hebraico', limite: number = 20): Promise<EntradaConcordancia[]> {
  return (await getConcordanciaPorIdioma(idioma))
    .sort((a, b) => b.ocorrencias.length - a.ocorrencias.length)
    .slice(0, limite);
}
