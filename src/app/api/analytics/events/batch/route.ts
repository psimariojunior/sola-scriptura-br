import { NextRequest } from 'next/server';
import { proxyToBackend } from '@/app/api/auth/proxy';
import { applyRateLimit } from '@/lib/api-rate-limit';

export async function POST(request: NextRequest) {
  const blocked = await applyRateLimit(request, 'ANALYTICS_BATCH');
  if (blocked) return blocked;

  const body = await request.text();
  return proxyToBackend('/analytics/events/batch', 'POST', body);
}
