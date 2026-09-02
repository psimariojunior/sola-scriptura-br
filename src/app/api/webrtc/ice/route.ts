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
      dbg: {
        groq: Boolean(process.env.GROQ_API_KEY),
        turnUrl: Boolean(process.env.TURN_URL),
        turnUser: Boolean(process.env.TURN_USER),
        turnPass: Boolean(process.env.TURN_PASS),
      },
    },
    {
      headers: {
        'Cache-Control': 'no-store',
      },
    },
  );
}
