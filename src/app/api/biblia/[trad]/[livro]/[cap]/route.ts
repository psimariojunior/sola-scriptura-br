import { NextResponse } from 'next/server';
import { BIBLIA_CAPITULO_CACHE, obterCapituloLocal } from '@/lib/bibliaCapituloApi';

export const runtime = 'nodejs';

type Params = { trad: string; livro: string; cap: string };

export async function GET(_request: Request, context: { params: Promise<Params> }) {
  const { trad, livro, cap } = await context.params;
  const result = await obterCapituloLocal(trad, livro, Number(cap));
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }
  return NextResponse.json(result.body, { headers: BIBLIA_CAPITULO_CACHE });
}
