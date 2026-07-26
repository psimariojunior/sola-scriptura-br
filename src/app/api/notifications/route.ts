import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

function headersSupabase(): Record<string, string> {
  return {
    apikey: SUPABASE_SERVICE_ROLE_KEY,
    Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
    'Content-Type': 'application/json',
    Prefer: 'return=representation',
  };
}

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get('userId');

  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({ tokens: [], modo: 'degradado' });
  }

  try {
    let url = `${SUPABASE_URL}/rest/v1/notification_tokens?ativo=eq.true&select=id,user_id,platform,criado_em`;
    if (userId) {
      url += `&user_id=eq.${encodeURIComponent(userId)}`;
    }
    url += '&order=criado_em.desc&limit=100';

    const res = await fetch(url, { method: 'GET', headers: headersSupabase() });

    if (!res.ok) {
      const erro = await res.text();
      console.error('[notifications] Falha ao listar tokens:', res.status, erro);
      return NextResponse.json({ tokens: [], erro: 'Falha ao listar' }, { status: 500 });
    }

    const tokens = await res.json();
    return NextResponse.json({ tokens });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('[notifications] Erro ao listar tokens:', msg);
    return NextResponse.json({ tokens: [], erro: 'Erro interno' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ erro: 'JSON invalido' }, { status: 400 });
  }

  const { fcmToken } = body as { fcmToken?: string };

  if (!fcmToken) {
    return NextResponse.json({ erro: 'fcmToken obrigatorio' }, { status: 400 });
  }

  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({ ok: true, modo: 'degradado' });
  }

  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/notification_tokens?fcm_token=eq.${encodeURIComponent(fcmToken)}`,
      {
        method: 'DELETE',
        headers: headersSupabase(),
      },
    );

    if (!res.ok) {
      const erro = await res.text();
      console.error('[notifications] Falha ao remover token:', res.status, erro);
      return NextResponse.json({ erro: 'Falha ao remover' }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('[notifications] Erro ao remover token:', msg);
    return NextResponse.json({ erro: 'Erro interno' }, { status: 500 });
  }
}
