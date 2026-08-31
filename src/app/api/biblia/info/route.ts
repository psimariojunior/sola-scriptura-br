import { NextResponse } from 'next/server';
import { carregarTraducao, getTraducoesLocais } from '@/data/biblia/texto/carregar';

export const runtime = 'nodejs';

/** Tamanho compacto típico no aparelho (JSON de versos), abaixo do TS-fonte (~4,1 MB). */
const BYTES_POR_TRADUCAO: Record<string, number> = {
  nvi: 3_900_000,
  arc: 3_900_000,
  ara: 3_850_000,
  acf: 3_900_000,
  kjv: 4_000_000,
  web: 3_800_000,
  alm1911: 3_900_000,
  blivre: 3_900_000,
  jfaal: 3_900_000,
};

export async function GET(request: Request) {
  const url = new URL(request.url);
  const trad = (url.searchParams.get('traducao') || '').trim().toLowerCase();
  const locais = getTraducoesLocais();
  const ids = trad && locais.includes(trad) ? [trad] : locais;

  const traducoes = await Promise.all(
    ids.map(async (id) => {
      const data = await carregarTraducao(id);
      const livros = Object.keys(data);
      const capitulos = livros.reduce((acc, livro) => acc + Object.keys(data[livro] ?? {}).length, 0);
      return {
        id: id.toUpperCase(),
        livros: livros.length,
        capitulos,
        bytesEstimados: BYTES_POR_TRADUCAO[id] ?? 4_000_000,
        fonte: 'local',
      };
    }),
  );

  return NextResponse.json(
    { traducoes },
    {
      headers: {
        'Cache-Control': 'public, max-age=86400, s-maxage=86400',
      },
    },
  );
}
