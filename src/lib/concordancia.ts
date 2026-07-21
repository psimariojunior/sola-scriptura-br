import { carregarTraducao, getTraducoesLocais } from '@/data/biblia/texto/carregar';
import { livroPorAbreviacao, TODOS_LIVROS } from '@/data/biblia/livros';

export interface Ocorrencia {
  livro: string;
  livroNome: string;
  capitulo: number;
  versiculo: number;
  texto: string;
}

export interface ConcordanciaResult {
  palavra: string;
  ocorrencias: Ocorrencia[];
  totalVersiculos: number;
}

const STOPWORDS = new Set<string>([
  // Português
  'o', 'a', 'os', 'as', 'um', 'uma', 'uns', 'umas', 'de', 'do', 'da', 'dos', 'das',
  'em', 'no', 'na', 'nos', 'nas', 'por', 'para', 'com', 'sem', 'sob', 'sobre',
  'e', 'ou', 'mas', 'que', 'se', 'como', 'quando', 'onde', 'porque', 'pois',
  'ele', 'ela', 'eles', 'elas', 'eu', 'tu', 'voce', 'nos', 'vos', 'me', 'te', 'se',
  'lhe', 'lhes', 'isto', 'isso', 'aquilo', 'nao', 'sim', 'ja', 'ainda', 'mais',
  // Inglês
  'the', 'a', 'an', 'and', 'or', 'but', 'if', 'then', 'of', 'to', 'in', 'on',
  'for', 'with', 'at', 'by', 'from', 'as', 'is', 'are', 'was', 'were', 'be',
  'been', 'being', 'it', 'this', 'that', 'these', 'those', 'he', 'she', 'they',
  'you', 'we', 'i', 'my', 'your', 'his', 'her', 'their', 'not', 'no', 'yes',
]);

const INDICE_CACHE = new Map<string, Map<string, Ocorrencia[]>>();

function normalizar(texto: string): string {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ');
}

function tokenizar(texto: string): string[] {
  return normalizar(texto)
    .split(/\s+/)
    .map((t) => t.trim())
    .filter((t) => t.length > 1 && !STOPWORDS.has(t));
}

export async function buildIndice(traducao: string): Promise<Map<string, Ocorrencia[]>> {
  if (INDICE_CACHE.has(traducao)) return INDICE_CACHE.get(traducao)!;

  const data = await carregarTraducao(traducao);
  const indice = new Map<string, Ocorrencia[]>();

  for (const livroAbrev of Object.keys(data)) {
    const livroInfo = livroPorAbreviacao.get(livroAbrev);
    const livroNome = livroInfo?.nome ?? livroAbrev;
    const capitulos = data[livroAbrev];

    for (const capituloStr of Object.keys(capitulos)) {
      const capitulo = Number(capituloStr);
      const versiculos = capitulos[capitulo];

      versiculos.forEach((texto, idx) => {
        const versiculo = idx + 1;
        const ocorrencia: Ocorrencia = {
          livro: livroAbrev,
          livroNome,
          capitulo,
          versiculo,
          texto,
        };

        for (const palavra of tokenizar(texto)) {
          const lista = indice.get(palavra);
          if (lista) lista.push(ocorrencia);
          else indice.set(palavra, [ocorrencia]);
        }
      });
    }
  }

  INDICE_CACHE.set(traducao, indice);
  return indice;
}

export function buscar(indice: Map<string, Ocorrencia[]>, palavra: string): Ocorrencia[] {
  const query = normalizar(palavra).trim().replace(/\s+/g, ' ');
  if (!query) return [];

  const termos = tokenizar(palavra);
  if (termos.length === 0) return [];

  const palavraBusca = termos[0];
  const partial = palavraBusca.length >= 4;

  const coletadas = new Map<string, Ocorrencia>();

  if (partial) {
    for (const [chave, ocorrencias] of indice) {
      if (chave.startsWith(palavraBusca)) {
        for (const oc of ocorrencias) {
          coletadas.set(`${oc.livro}-${oc.capitulo}-${oc.versiculo}`, oc);
        }
      }
    }
  } else {
    const ocorrencias = indice.get(palavraBusca);
    if (ocorrencias) {
      for (const oc of ocorrencias) {
        coletadas.set(`${oc.livro}-${oc.capitulo}-${oc.versiculo}`, oc);
      }
    }
  }

  const resultado = Array.from(coletadas.values());

  resultado.sort((a, b) => {
    const ordemA = TODOS_LIVROS.find((l) => l.abreviacao === a.livro)?.ordem ?? 999;
    const ordemB = TODOS_LIVROS.find((l) => l.abreviacao === b.livro)?.ordem ?? 999;
    if (ordemA !== ordemB) return ordemA - ordemB;
    if (a.capitulo !== b.capitulo) return a.capitulo - b.capitulo;
    return a.versiculo - b.versiculo;
  });

  return resultado;
}

export function getConcordanciaLocais(): string[] {
  return getTraducoesLocais();
}
