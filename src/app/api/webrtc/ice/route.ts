import { connection, NextResponse } from 'next/server';
import { buildIceServers, iceHasTurn } from '@/lib/iceServers';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

function runtimeEnv(name: string): string | undefined {
  const bag = process.env as Record<string, string | undefined>;
  const v = bag[name];
  return typeof v === 'string' && v.trim() ? v.trim() : undefined;
}

export async function GET() {
  await connection();
  const iceServers = buildIceServers({
    turnUrl: runtimeEnv('TURN_URL'),
    turnUser: runtimeEnv('TURN_USER'),
    turnPass: runtimeEnv('TURN_PASS'),
  });
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
