import { NextRequest, NextResponse } from 'next/server';
import { consultarAcessoTotal } from '@/lib/supabaseServer';

export const runtime = 'nodejs';

// Rota de status (server-only): informa se um email ja possui Acesso Total.
// Aceita GET com ?email= ou POST com { email } no body.
export async function GET(request: NextRequest) {
  const email = (request.nextUrl.searchParams.get('email') || '').toString().trim();
  if (!email) {
    return NextResponse.json({ erro: 'email obrigatorio' }, { status: 400 });
  }
  const acessoTotal = await consultarAcessoTotal(email);
  return NextResponse.json({ acessoTotal });
}

export async function POST(request: NextRequest) {
  let body: any;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ erro: 'JSON invalido' }, { status: 400 });
  }
  const email = (body?.email || '').toString().trim();
  if (!email) {
    return NextResponse.json({ erro: 'email obrigatorio' }, { status: 400 });
  }
  const acessoTotal = await consultarAcessoTotal(email);
  return NextResponse.json({ acessoTotal });
}
