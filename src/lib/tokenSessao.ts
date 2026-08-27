import type { NextRequest } from 'next/server';

/** Extração de token e JWT — seguro para proxy/Edge (sem server-only nem Buffer). */

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

function base64UrlToUtf8(input: string): string {
  const b64 = input.replace(/-/g, '+').replace(/_/g, '/');
  const padded = b64 + '='.repeat((4 - (b64.length % 4)) % 4);
  if (typeof atob === 'function') {
    const binary = atob(padded);
    try {
      return decodeURIComponent(
        Array.from(binary, (c) => `%${c.charCodeAt(0).toString(16).padStart(2, '0')}`).join(''),
      );
    } catch {
      return binary;
    }
  }
  return Buffer.from(padded, 'base64').toString('utf8');
}

export function decodeJwtPayload(token: string): Record<string, unknown> | null {
  const parts = token.split('.');
  if (parts.length !== 3) return null;
  try {
    return JSON.parse(base64UrlToUtf8(parts[1]));
  } catch {
    return null;
  }
}

export function isJwtExpired(token: string): boolean {
  const payload = decodeJwtPayload(token);
  if (!payload || typeof payload.exp !== 'number') return false;
  return payload.exp * 1000 < Date.now();
}

export function emailDoJwt(token: string): string | undefined {
  const payload = decodeJwtPayload(token);
  if (!payload) return undefined;
  if (typeof payload.email === 'string' && payload.email) return payload.email;
  return undefined;
}
