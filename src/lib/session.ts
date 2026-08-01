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
function isJwtExpired(token: string): boolean {
  const parts = token.split('.');
  if (parts.length !== 3) return true;
  try {
    const payload = JSON.parse(
      Buffer.from(parts[1].replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString('utf8'),
    );
    if (typeof payload.exp !== 'number') return false;
    return payload.exp * 1000 < Date.now();
  } catch {
    return false;
  }
}

/**
 * Valida o JWT contra o endpoint /auth/v1/user do Supabase.
 * Retorna o user real (id, email) ou null se token invalido/expirado.
 */
export async function validateSupabaseToken(token: string): Promise<SessionUser | null> {
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
 */
export async function getUserFromRequest(request: NextRequest): Promise<SessionUser | null> {
  const token = getTokenFromRequest(request);
  if (!token) return null;
  if (isJwtExpired(token)) return null;
  return validateSupabaseToken(token);
}
