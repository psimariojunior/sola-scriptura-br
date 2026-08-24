import { NextRequest, NextResponse } from 'next/server';

const MAX_AGE = 60 * 60 * 24 * 30; // 30 dias

export async function POST(request: NextRequest) {
  try {
    const { accessToken, refreshToken, usuario } = await request.json();

    if (!accessToken || !usuario) {
      return NextResponse.json(
        { error: 'accessToken e usuario são obrigatórios' },
        { status: 400 }
      );
    }

    const response = NextResponse.json({ ok: true });

    response.cookies.set('ssb_token', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
      maxAge: MAX_AGE,
    });

    response.cookies.set('ssb_usuario', JSON.stringify(usuario), {
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

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
