import { NextRequest, NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/session';
import { origemPermitida } from '@/lib/origemPermitida';
import { CookieClearSchema, validateBody } from '@/lib/api-schemas';

export async function POST(request: NextRequest) {
  try {
    const session = await getUserFromRequest(request);
    if (!session?.id) {
      return NextResponse.json({ ok: true });
    }

    let rawBody: unknown;
    try {
      rawBody = await request.json();
    } catch {
      return NextResponse.json({ ok: true });
    }

    const parsed = validateBody(CookieClearSchema, rawBody);
    if (!parsed.success) return NextResponse.json({ ok: true });

    const { name } = parsed.data;

    const response = NextResponse.json({ ok: true });

    response.cookies.set(name, '', {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 0,
    });

    return response;
  } catch {
    return NextResponse.json({ ok: true });
  }
}

export async function OPTIONS(request: NextRequest) {
  const allowed = origemPermitida(request);
  const origin = request.headers.get('origin') || 'https://solascripturabr.com.br';

  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': allowed ? origin : 'https://solascripturabr.com.br',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Credentials': 'true',
    },
  });
}
