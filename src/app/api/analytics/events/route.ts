import { NextRequest } from 'next/server';
import { proxyToBackend } from '@/app/api/auth/proxy';

export async function POST(request: NextRequest) {
  const body = await request.text();
  return proxyToBackend('/analytics/events', 'POST', body);
}
