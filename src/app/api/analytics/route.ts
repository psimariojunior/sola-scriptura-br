import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json({
    message: 'Analytics data is stored client-side in localStorage (ssb_analytics).',
    hint: 'Use getAnalyticsData() or getStats() from src/lib/analytics.ts on the client.',
  });
}
