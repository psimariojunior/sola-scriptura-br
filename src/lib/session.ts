import 'server-only';
import type { NextRequest } from 'next/server';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const BACKEND_URL = (
  process.env.NEXT_PUBLIC_API_URL || 'https://api.solascripturabr.com.br/api/v1'
).replace(/\/$/, '');

export interface SessionUser {
  id: string;
  email?: string;
  role: 'authenticated' | 'anon';
  exp?: number;
}

/**
 * Lê token do cookie ssb_token ou header (nunca da query string).
 */
export function getTokenFromRequest(request: NextRequest): string | null {
  const cookieToken = request.cookies.get('ssb_token')?.value;
  if (cookieToken) return cookieToken;
  const authHeader = request.headers.get('x-ssb-token');
  if (authHeader) return authHeader;
  const bearer = request.headers.get('authorization');
  if (bearer?.toLowerCase().startsWith('bearer ')) {
    return bearer.slice(7).trim();
  }
  return null;
}

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

async function validateNestJwt(token: string): Promise<SessionUser | null> {
  const payload = decodeJwtPayload(token);
  if (!payload?.sub || !payload?.email) return null;
  if (isJwtExpired(token)) return null;
  try {
    const res = await fetch(`${BACKEND_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { id?: string; email?: string };
    const id = data.id || String(payload.sub);
    const email = data.email || String(payload.email);
    if (!id || !email) return null;
    return {
      id: String(id),
      email: String(email),
      role: 'authenticated',
      exp: typeof payload.exp === 'number' ? payload.exp : undefined,
    };
  } catch {
    return null;
  }
}

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

export async function getUserFromToken(token: string): Promise<SessionUser | null> {
  if (!token) return null;
  if (isJwtExpired(token)) return null;
  const nestUser = await validateNestJwt(token);
  if (nestUser) return nestUser;
  return validateSupabaseToken(token);
}

export async function getUserFromRequest(request: NextRequest): Promise<SessionUser | null> {
  const token = getTokenFromRequest(request);
  if (!token) return null;
  return getUserFromToken(token);
}

export function emailEhAdmin(email: string | undefined): boolean {
  if (!email) return false;
  const list = (process.env.ADMIN_EMAILS || '')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  return list.includes(email.toLowerCase());
}
