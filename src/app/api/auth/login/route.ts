import { NextRequest } from 'next/server';
import { proxyToBackend } from '../proxy';

export async function POST(request: NextRequest) {
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
