import { NextRequest, NextResponse } from 'next/server';
import { carregarTraducao, getTraducoesLocais } from '@/data/biblia/texto/carregar';

export const runtime = 'nodejs';

const ALIASES: Record<string, string[]> = {
  jo: ['jo'],
  jó: ['jó', 'job'],
  job: ['jó', 'job'],
};

export async function GET(request: NextRequest) {
  const traducao = (request.nextUrl.searchParams.get('traducao') || 'nvi').trim().toLowerCase();
  const livroRaw = (request.nextUrl.searchParams.get('livro') || 'gn').trim().toLowerCase();
  const capitulo = Number(request.nextUrl.searchParams.get('capitulo') || '1');

  if (!getTraducoesLocais().includes(traducao)) {
    return NextResponse.json(
      { error: 'Tradução não está no acervo local. Use NVI, ARC ou ARA.' },
      { status: 404 },
    );
  }
  if (!Number.isFinite(capitulo) || capitulo < 1) {
    return NextResponse.json({ error: 'Capítulo inválido' }, { status: 400 });
  }

  const data = await carregarTraducao(traducao);
  const keys = ALIASES[livroRaw] ?? [livroRaw];
  let verses: string[] | undefined;
  for (const key of keys) {
    verses = data[key]?.[capitulo];
    if (verses?.length) break;
  }

  if (!verses?.length) {
    return NextResponse.json({ error: 'Capítulo não encontrado' }, { status: 404 });
  }

  return NextResponse.json(
    {
      verses: verses.map((text, i) => ({ number: i + 1, text })),
    },
    {
      headers: {
        'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800',
      },
    },
  );
}
