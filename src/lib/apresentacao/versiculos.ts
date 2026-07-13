import { carregarTraducao } from '@/data/biblia/texto/carregar';
import { livroPorAbreviacao, TODOS_LIVROS } from '@/data/biblia/livros';
import { traducoes } from '@/data/biblia/versoes';
import { ABREV_PARA_MIDVASH } from '@/data/biblia/midvash';

export interface VersiculoSimples {
  numero: number;
  texto: string;
}

const cache = new Map<string, VersiculoSimples[]>();

const MIDVASH_API = 'https://api.midvash.com/v1';

async function fetchMidvashCap(trad: string, livro: string, cap: number): Promise<VersiculoSimples[] | null> {
  const slug = ABREV_PARA_MIDVASH[livro];
  if (!slug) return null;
  try {
    const res = await fetch(`${MIDVASH_API}/${trad}/${slug}/${cap}`, {
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return null;
    const json = await res.json();
    const raw = json?.data?.verses;
    if (!Array.isArray(raw)) return null;
    const out: VersiculoSimples[] = [];
    for (let i = 0; i < raw.length; i++) {
      const v = raw[i];
      const texto = typeof v === 'string' ? v : v?.text;
      if (texto?.trim()) out.push({ numero: i + 1, texto: texto.trim() });
    }
    return out.length > 0 ? out : null;
  } catch {
    return null;
  }
}

export async function carregarCapitulo(
  livro: string,
  cap: number,
  traducao: string
): Promise<VersiculoSimples[]> {
  const key = `${traducao}:${livro}:${cap}`;
  if (cache.has(key)) return cache.get(key)!;

  const trad = traducao.toLowerCase();
  const data = await carregarTraducao(trad);
  const capArr = data?.[livro]?.[cap];
  let result: VersiculoSimples[] | null = null;
  if (capArr && Array.isArray(capArr) && capArr.length > 0) {
    result = capArr
      .map((t, i) => ({ numero: i + 1, texto: t }))
      .filter((v) => v.texto?.trim());
  } else {
    result = await fetchMidvashCap(trad, livro, cap);
  }

  if (!result) result = [];
  cache.set(key, result);
  return result;
}

export async function obterVersiculo(
  livro: string,
  cap: number,
  ver: number,
  traducao: string
): Promise<VersiculoSimples | null> {
  const capData = await carregarCapitulo(livro, cap, traducao);
  if (!capData || capData.length === 0) return null;
  const found = capData.find((v) => v.numero === ver);
  if (found) return found;
  const idx = Math.max(0, ver - 1);
  return capData[idx] ?? null;
}

export function nomeLivro(abrev: string): string {
  return livroPorAbreviacao.get(abrev)?.nome ?? abrev.toUpperCase();
}

export function totalCapitulos(abrev: string): number {
  return livroPorAbreviacao.get(abrev)?.totalCapitulos ?? 1;
}

export function nomeTraducao(sigla: string): string {
  const t = traducoes.find((x) => x.id === sigla.toLowerCase());
  return t?.sigla ?? sigla.toUpperCase();
}

export function listaLivros() {
  return TODOS_LIVROS;
}

export const TRADUCOES_APRESENTACAO = ['arc', 'ara', 'acf', 'kjv', 'nvi', 'web'] as const;
export type TraducaoApresentacao = (typeof TRADUCOES_APRESENTACAO)[number];

export function limparCache(): void {
  cache.clear();
}
