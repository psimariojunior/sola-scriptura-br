import { carregarTraducao, getTraducoesLocais } from '@/data/biblia/texto/carregar';

const ALIASES: Record<string, string[]> = {
  jó: ['jó', 'job'],
  job: ['jó', 'job'],
};

export type CapituloJson = {
  traducao: string;
  livro: string;
  capitulo: number;
  verses: { number: number; text: string }[];
};

export function chavesLivro(raw: string): string[] {
  let decoded = raw.trim().toLowerCase();
  try {
    decoded = decodeURIComponent(decoded);
  } catch {
    /* já decodificado */
  }
  const extra = ALIASES[decoded] ?? [];
  return [...new Set([decoded, ...extra])];
}

export function jsonCapitulo(
  traducao: string,
  livro: string,
  capitulo: number,
  verses: string[],
): CapituloJson {
  return {
    traducao,
    livro,
    capitulo,
    verses: verses.map((text, i) => ({ number: i + 1, text })),
  };
}

const CACHE_HEADERS = {
  'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800',
};

export { CACHE_HEADERS as BIBLIA_CAPITULO_CACHE };

export async function obterCapituloLocal(
  traducaoRaw: string,
  livroRaw: string,
  capitulo: number,
): Promise<{ ok: true; body: CapituloJson } | { ok: false; status: number; error: string }> {
  const traducao = traducaoRaw.trim().toLowerCase();
  const locais = getTraducoesLocais();

  if (!locais.includes(traducao)) {
    return {
      ok: false,
      status: 404,
      error: `Tradução ausente no acervo local. Disponíveis: ${locais.map((t) => t.toUpperCase()).join(', ')}.`,
    };
  }
  if (!Number.isFinite(capitulo) || capitulo < 1) {
    return { ok: false, status: 400, error: 'Capítulo inválido' };
  }

  const data = await carregarTraducao(traducao);
  const keys = chavesLivro(livroRaw);
  let verses: string[] | undefined;
  let livroHit = keys[0];
  for (const key of keys) {
    verses = data[key]?.[capitulo];
    if (verses?.length) {
      livroHit = key;
      break;
    }
  }

  if (!verses?.length) {
    return { ok: false, status: 404, error: 'Capítulo não encontrado' };
  }

  return { ok: true, body: jsonCapitulo(traducao, livroHit, capitulo, verses) };
}
