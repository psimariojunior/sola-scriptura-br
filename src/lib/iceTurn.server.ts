import 'server-only';
import { buildIceServers } from '@/lib/iceServers';

/** Mesmo padrão de `llm-config.ts`: env só neste módulo server-only. */
export function iceServersFromTurnEnv() {
  return buildIceServers({
    turnUrl: process.env.TURN_URL,
    turnUser: process.env.TURN_USER,
    turnPass: process.env.TURN_PASS,
  });
}
