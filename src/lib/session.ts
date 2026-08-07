import 'server-only';
import type { NextRequest } from 'next/server';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export interface SessionUser {
  id: string;
  email?: string;
  role: 'authenticated' | 'anon';
  exp?: number;
}

/**
 * Lê token do cookie ssb_token, query string ou header.
 */
export function getTokenFromRequest(request: NextRequest): string | null {
  const cookieToken = request.cookies.get('ssb_token')?.value;
  if (cookieToken) return cookieToken;
  const urlToken = request.nextUrl.searchParams.get('token');
  if (urlToken) return urlToken;
  const authHeader = request.headers.get('x-ssb-token');
  if (authHeader) return authHeader;
  return null;
}

/**
 * Decodifica JWT localmente (sem verificar assinatura) para checar o campo exp
 * e evitar chamadas desnecessarias ao Supabase em tokens obviamente expirados.
 */
function decodeJwtPayload(token: string): Record<string, unknown> | null {
  const parts = token.split('.');
  if (parts.length !== 3) return null;
  try {
    return JSON.parse(
      Buffer.from(parts[1].replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString('utf8'),
    );
  } catch {
    return null;
  }
}

function isJwtExpired(token: string): boolean {
  const payload = decodeJwtPayload(token);
  if (!payload || typeof payload.exp !== 'number') return false;
  return payload.exp * 1000 < Date.now();
}

/**
 * Tenta extrair usuario de um JWT NestJS (payload: { sub, email }).
 * Retorna null se nao for um token NestJS valido.
 */
function tryNestJwt(token: string): SessionUser | null {
  const payload = decodeJwtPayload(token);
  if (!payload) return null;
  // NestJS tokens have { sub: userId, email: string }
  if (!payload.sub || !payload.email) return null;
  return {
    id: String(payload.sub),
    email: String(payload.email),
    role: 'authenticated',
    exp: typeof payload.exp === 'number' ? payload.exp : undefined,
  };
}

/**
 * Valida o JWT contra o endpoint /auth/v1/user do Supabase.
 * Retorna o user real (id, email) ou null se token invalido/expirado.
 */
async function validateSupabaseToken(token: string): Promise<SessionUser | null> {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return null;
  try {
    const res = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { id?: string; email?: string; role?: string };
    if (!data.id) return null;
    return {
      id: data.id,
      email: data.email,
      role: (data.role as SessionUser['role']) || 'authenticated',
    };
  } catch {
    return null;
  }
}

/**
 * Valida token combinando verificacao local de expiracao + checagem no Supabase.
 * Suporta tanto tokens Supabase quanto JWTs do NestJS backend.
 */
export async function getUserFromRequest(request: NextRequest): Promise<SessionUser | null> {
  const token = getTokenFromRequest(request);
  if (!token) return null;
  if (isJwtExpired(token)) return null;

  // 1) Tenta como token NestJS (decode local, rapido)
  const nestUser = tryNestJwt(token);
  if (nestUser) return nestUser;

  // 2) Tenta como token Supabase (chamada remota)
  return validateSupabaseToken(token);
}
