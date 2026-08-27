import { NextRequest, NextResponse } from 'next/server';
import { consultarAcessoTotal } from '@/lib/supabaseServer';
import { getUserFromRequest } from '@/lib/session';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  const session = await getUserFromRequest(request);
  if (!session?.email) {
    return NextResponse.json({ erro: 'Nao autenticado' }, { status: 401 });
  }
  const acessoTotal = await consultarAcessoTotal(session.email);
  return NextResponse.json({ acessoTotal });
}

export async function POST(request: NextRequest) {
  const session = await getUserFromRequest(request);
  if (!session?.email) {
    return NextResponse.json({ erro: 'Nao autenticado' }, { status: 401 });
  }
  const acessoTotal = await consultarAcessoTotal(session.email);
  return NextResponse.json({ acessoTotal });
}
