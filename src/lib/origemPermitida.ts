import type { NextRequest } from 'next/server';

const PRODUCAO = [
  'https://solascripturabr.com.br',
  'https://www.solascripturabr.com.br',
];

export function origemDaRequest(request: NextRequest): string | null {
  const origin = request.headers.get('origin');
  if (origin) return origin;
  const referer = request.headers.get('referer');
  if (!referer) return null;
  try {
    return new URL(referer).origin;
  } catch {
    return null;
  }
}

export function origemPermitida(request: NextRequest): boolean {
  const origin = origemDaRequest(request);
  if (!origin) return true;
  if (PRODUCAO.includes(origin)) return true;
  if (process.env.NODE_ENV !== 'production') {
    return /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(origin);
  }
  return false;
}

export function headersCorsRestrito(request: NextRequest): Record<string, string> {
  const origin = origemDaRequest(request);
  const allowed = origin && origemPermitida(request) ? origin : PRODUCAO[0];
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Credentials': 'true',
    Vary: 'Origin',
  };
}
