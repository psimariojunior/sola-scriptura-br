import { NextRequest, NextResponse } from 'next/server';
import { BIBLIA_CAPITULO_CACHE, obterCapituloLocal } from '@/lib/bibliaCapituloApi';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  const traducao = request.nextUrl.searchParams.get('traducao') || 'nvi';
  const livro = request.nextUrl.searchParams.get('livro') || 'gn';
  const capitulo = Number(request.nextUrl.searchParams.get('capitulo') || '1');

  const result = await obterCapituloLocal(traducao, livro, capitulo);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }
  return NextResponse.json(result.body, { headers: BIBLIA_CAPITULO_CACHE });
}
