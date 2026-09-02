import { connection, NextResponse } from 'next/server';
import { iceHasTurn } from '@/lib/iceServers';
import { iceServersFromTurnEnv } from '@/lib/iceTurn.server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  await connection();
  const iceServers = iceServersFromTurnEnv();
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
