import { NextRequest, NextResponse } from 'next/server';

const MAX_AGE = 60 * 60 * 24 * 30; // 30 dias

export async function POST(request: NextRequest) {
  try {
    const { name, value } = await request.json();

    if (!name || !value) {
      return NextResponse.json({ error: 'name e value são obrigatórios' }, { status: 400 });
    }

    // Apenas permite cookies do projeto
    const allowedCookies = ['ssb_token', 'ssb_usuario'];
    if (!allowedCookies.includes(name)) {
      return NextResponse.json({ error: 'Cookie não permitido' }, { status: 400 });
    }

    const response = NextResponse.json({ ok: true });

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
