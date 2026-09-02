import 'server-only';
import { buildIceServers } from '@/lib/iceServers';

/** Env de produção (TURN_URL / USER / PASS) — só neste módulo, nunca no client. */
export function iceServersFromTurnEnv() {
  return buildIceServers({
    turnUrl: process.env.TURN_URL,
    turnUser: process.env.TURN_USER,
    turnPass: process.env.TURN_PASS,
  });
}
