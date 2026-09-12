import { NextRequest, NextResponse } from 'next/server';
import { applyRateLimit } from '@/lib/api-rate-limit';
import { origemPermitida } from '@/lib/origemPermitida';

const BACKEND_URL = 'https://api.solascripturabr.com.br/api/v1';

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: NextRequest) {
  const blocked = await applyRateLimit(request, 'AUTH_RECUPERAR_SENHA');
  if (blocked) return blocked;

  let body: { email?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ erro: 'Corpo da requisição inválido.' }, { status: 400 });
  }

  const email = body.email?.trim().toLowerCase();

  if (!email || !isValidEmail(email)) {
    return NextResponse.json({ erro: 'Email inválido.' }, { status: 400 });
  }

  try {
    await fetch(`${BACKEND_URL}/auth/recuperar-senha`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
      signal: AbortSignal.timeout(10000),
    });
  } catch {
    // Silently ignore backend errors — don't reveal if email exists
  }

  // Always return success to prevent email enumeration
  return NextResponse.json({
    mensagem: 'Se o email estiver cadastrado, você receberá um link de recuperação.',
  });
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
