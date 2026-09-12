import { NextRequest } from 'next/server';
import { proxyToBackend } from '../proxy';
import { origemPermitida } from '@/lib/origemPermitida';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const authHeader = request.headers.get('authorization') || '';
  return proxyToBackend('/auth/logout', 'POST', body, { Authorization: authHeader });
}

export async function OPTIONS(request: NextRequest) {
  const allowed = origemPermitida(request);
  const origin = request.headers.get('origin') || 'https://solascripturabr.com.br';

  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': allowed ? origin : 'https://solascripturabr.com.br',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Credentials': 'true',
    },
  });
}
