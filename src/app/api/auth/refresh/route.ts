import { NextRequest, NextResponse } from 'next/server';
import { applyRateLimit } from '@/lib/api-rate-limit';

export async function POST(request: NextRequest) {
  const blocked = await applyRateLimit(request, 'AUTH_REFRESH');
  if (blocked) return blocked;

  const body = await request.text();

  const BACKEND_URL = 'https://api.solascripturabr.com.br/api/v1';
  try {
    const res = await fetch(`${BACKEND_URL}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
      signal: AbortSignal.timeout(10000),
    });
    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(data, { status: res.status });
    }

    const result = data.data || data;
    const response = NextResponse.json({ data: result });

    const MAX_AGE = 60 * 60 * 24 * 30;

    if (result.accessToken) {
      response.cookies.set('ssb_token', result.accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        path: '/',
        maxAge: MAX_AGE,
      });
    }

    if (result.usuario) {
      response.cookies.set('ssb_usuario', JSON.stringify(result.usuario), {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        path: '/',
        maxAge: MAX_AGE,
      });
    }

    if (result.refreshToken) {
      response.cookies.set('ssb_refresh', result.refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        path: '/',
        maxAge: MAX_AGE,
      });
    }

    return response;
  } catch {
    return new Response(
      JSON.stringify({ message: 'Backend indisponível' }),
      { status: 503, headers: { 'Content-Type': 'application/json' } }
    );
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
