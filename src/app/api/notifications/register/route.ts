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

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ erro: 'JSON invalido' }, { status: 400 });
  }

  const { fcmToken, userId, platform } = body as { fcmToken?: string; userId?: string; platform?: string };

  if (!fcmToken) {
    return NextResponse.json({ erro: 'fcmToken obrigatorio' }, { status: 400 });
  }

  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    console.warn('[notifications] Supabase nao configurado. Registro ignorado.');
    return NextResponse.json({ ok: true, modo: 'degradado' });
  }

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/notification_tokens`, {
      method: 'POST',
      headers: headersSupabase(),
      body: JSON.stringify({
        fcm_token: fcmToken,
        user_id: userId || null,
        platform: platform || 'unknown',
        ativo: true,
        atualizado_em: new Date().toISOString(),
      }),
    });

    if (!res.ok) {
      const erro = await res.text();
      console.error('[notifications] Falha ao registrar token:', res.status, erro);
      return NextResponse.json({ erro: 'Falha ao registrar token' }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('[notifications] Erro ao registrar token:', msg);
    return NextResponse.json({ erro: 'Erro interno' }, { status: 500 });
  }
}
