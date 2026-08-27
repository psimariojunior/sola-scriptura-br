import { NextRequest, NextResponse } from 'next/server';
import { getUserFromToken } from '@/lib/session';
import { origemPermitida, headersCorsRestrito } from '@/lib/origemPermitida';

const MAX_AGE = 60 * 60 * 24 * 30;

export async function POST(request: NextRequest) {
  if (!origemPermitida(request)) {
    return NextResponse.json({ error: 'Origem não permitida' }, { status: 403 });
  }

  try {
    const { accessToken, refreshToken, usuario } = await request.json();

    if (!accessToken || !usuario) {
      return NextResponse.json(
        { error: 'accessToken e usuario são obrigatórios' },
        { status: 400 }
      );
    }

    const session = await getUserFromToken(String(accessToken));
    if (!session?.email) {
      return NextResponse.json({ error: 'Token inválido' }, { status: 401 });
    }

    const emailBody = String(usuario.email || '').trim().toLowerCase();
    const idBody = String(usuario.id || '').trim();
    if (emailBody !== session.email.toLowerCase() || (idBody && idBody !== session.id)) {
      return NextResponse.json({ error: 'Usuário não confere com o token' }, { status: 401 });
    }

    const response = NextResponse.json({ ok: true }, { headers: headersCorsRestrito(request) });

    response.cookies.set('ssb_token', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
      maxAge: MAX_AGE,
    });

    response.cookies.set('ssb_usuario', JSON.stringify({
      ...usuario,
      id: session.id,
      email: session.email,
    }), {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
      maxAge: MAX_AGE,
    });

    if (refreshToken) {
      response.cookies.set('ssb_refresh', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        path: '/',
        maxAge: MAX_AGE,
      });
    }

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
