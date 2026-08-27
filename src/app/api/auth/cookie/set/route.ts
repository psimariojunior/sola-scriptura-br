import { NextRequest, NextResponse } from 'next/server';
import { getUserFromToken } from '@/lib/session';
import { origemPermitida, headersCorsRestrito } from '@/lib/origemPermitida';

const MAX_AGE = 60 * 60 * 24 * 30;

export async function POST(request: NextRequest) {
  if (!origemPermitida(request)) {
    return NextResponse.json({ error: 'Origem não permitida' }, { status: 403 });
  }

  try {
    const { name, value } = await request.json();

    if (!name || !value) {
      return NextResponse.json({ error: 'name e value são obrigatórios' }, { status: 400 });
    }

    const allowedCookies = ['ssb_token', 'ssb_usuario', 'ssb_refresh'];
    if (!allowedCookies.includes(name)) {
      return NextResponse.json({ error: 'Cookie não permitido' }, { status: 400 });
    }

    if (name === 'ssb_token') {
      const user = await getUserFromToken(String(value));
      if (!user) {
        return NextResponse.json({ error: 'Token inválido' }, { status: 401 });
      }
    }

    if (name === 'ssb_usuario' || name === 'ssb_refresh') {
      const existing = request.cookies.get('ssb_token')?.value;
      if (!existing) {
        return NextResponse.json({ error: 'Sessão inexistente' }, { status: 401 });
      }
      const user = await getUserFromToken(existing);
      if (!user) {
        return NextResponse.json({ error: 'Sessão inválida' }, { status: 401 });
      }
    }

    const response = NextResponse.json({ ok: true }, { headers: headersCorsRestrito(request) });

    response.cookies.set(name, value, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
      maxAge: MAX_AGE,
    });

    return response;
  } catch {
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}

export async function OPTIONS(request: NextRequest) {
  if (!origemPermitida(request)) {
    return new Response(null, { status: 403 });
  }
  return new Response(null, {
    status: 204,
    headers: headersCorsRestrito(request),
  });
}
