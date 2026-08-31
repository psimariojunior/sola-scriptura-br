import { NextResponse } from 'next/server';
import { iceHasTurn, iceServersFromEnv } from '@/lib/iceServers';

export const dynamic = 'force-dynamic';

export async function GET() {
  const iceServers = iceServersFromEnv();
  return NextResponse.json(
    {
      iceServers,
      hasTurn: iceHasTurn(iceServers),
    },
    {
      headers: {
        'Cache-Control': 'no-store',
      },
    },
  );
}
