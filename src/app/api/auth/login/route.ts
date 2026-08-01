import { NextRequest } from 'next/server';
import { proxyToBackend } from '../proxy';
import { applyRateLimit } from '@/lib/api-rate-limit';

export async function POST(request: NextRequest) {
  const blocked = await applyRateLimit(request, 'AUTH_LOGIN');
  if (blocked) return blocked;

  const body = await request.text();
  return proxyToBackend('/auth/login', 'POST', body);
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
