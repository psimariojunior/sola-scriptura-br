/**
 * Ponto único de ICE (STUN Google + TURN opcional).
 * Servidor: TURN_URL / TURN_USER / TURN_PASS
 * Cliente (se precisar no bundle): NEXT_PUBLIC_TURN_URL / NEXT_PUBLIC_TURN_USER / NEXT_PUBLIC_TURN_PASS
 * Compatível com NEXT_PUBLIC_TURN_URLS / USERNAME / CREDENTIAL.
 */

export const GOOGLE_STUN_SERVERS: RTCIceServer[] = [
  { urls: 'stun:stun.l.google.com:19302' },
  { urls: 'stun:stun1.l.google.com:19302' },
  { urls: 'stun:stun2.l.google.com:19302' },
];

export function parseTurnUrls(raw?: string | null): string[] {
  if (!raw) return [];
  return raw
    .split(/[,;\n]+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

export function iceHasTurn(servers: RTCIceServer[]): boolean {
  return servers.some((s) => {
    const urls = Array.isArray(s.urls) ? s.urls : [s.urls];
    return urls.some((u) => {
      const v = String(u).toLowerCase();
      return v.startsWith('turn:') || v.startsWith('turns:');
    });
  });
}

function envStr(source: NodeJS.ProcessEnv, keys: string[]): string | undefined {
  for (const k of keys) {
    const v = source[k];
    if (typeof v === 'string' && v.trim()) return v.trim();
  }
  return undefined;
}

export function readTurnEnv(source: NodeJS.ProcessEnv): {
  turnUrl?: string;
  turnUser?: string;
  turnPass?: string;
} {
  return {
    turnUrl: envStr(source, [
      'TURN_URL',
      'NEXT_PUBLIC_TURN_URL',
      'NEXT_PUBLIC_TURN_URLS',
      'TWILIO_TURN_URL',
      'METERED_TURN_URL',
    ]),
    turnUser: envStr(source, [
      'TURN_USER',
      'NEXT_PUBLIC_TURN_USER',
      'NEXT_PUBLIC_TURN_USERNAME',
      'TWILIO_TURN_USER',
      'METERED_TURN_USER',
    ]),
    turnPass: envStr(source, [
      'TURN_PASS',
      'NEXT_PUBLIC_TURN_PASS',
      'NEXT_PUBLIC_TURN_CREDENTIAL',
      'TWILIO_TURN_PASS',
      'METERED_TURN_PASS',
    ]),
  };
}

export function buildIceServers(opts?: {
  turnUrl?: string | null;
  turnUser?: string | null;
  turnPass?: string | null;
}): RTCIceServer[] {
  const servers: RTCIceServer[] = [...GOOGLE_STUN_SERVERS];
  const urls = parseTurnUrls(opts?.turnUrl);
  const user = opts?.turnUser?.trim();
  const pass = opts?.turnPass;
  if (urls.length > 0 && user && pass) {
    servers.push({ urls: urls.length === 1 ? urls[0] : urls, username: user, credential: pass });
  }
  return servers;
}

export function iceServersFromEnv(source: NodeJS.ProcessEnv): RTCIceServer[] {
  return buildIceServers(readTurnEnv(source));
}

type IceCache = { iceServers: RTCIceServer[]; hasTurn: boolean };

let iceCache: IceCache | null = null;
let icePromise: Promise<IceCache> | null = null;

function cacheFromServers(iceServers: RTCIceServer[]): IceCache {
  return { iceServers, hasTurn: iceHasTurn(iceServers) };
}

export async function loadIceConfiguration(): Promise<RTCConfiguration> {
  const data = await loadIceStatus();
  const iceServers =
    Array.isArray(data.iceServers) && data.iceServers.length > 0
      ? data.iceServers
      : GOOGLE_STUN_SERVERS;
  return { iceServers, iceCandidatePoolSize: 10 };
}

export async function loadIceStatus(): Promise<IceCache> {
  if (iceCache) return iceCache;
  if (icePromise) return icePromise;

  icePromise = (async () => {
    try {
      const res = await fetch('/api/webrtc/ice', { cache: 'no-store' });
      if (res.ok) {
        const json = (await res.json()) as { iceServers?: RTCIceServer[]; hasTurn?: boolean };
        if (Array.isArray(json.iceServers) && json.iceServers.length > 0) {
          iceCache = {
            iceServers: json.iceServers,
            hasTurn: typeof json.hasTurn === 'boolean' ? json.hasTurn : iceHasTurn(json.iceServers),
          };
          return iceCache;
        }
      }
    } catch {
      /* fallback local */
    }
    iceCache = cacheFromServers(GOOGLE_STUN_SERVERS);
    return iceCache;
  })();

  try {
    return await icePromise;
  } catch {
    iceCache = cacheFromServers(GOOGLE_STUN_SERVERS);
    return iceCache;
  }
}

/** Síncrono: cache se o /api/webrtc/ice já respondeu. */
export function hasTurnRelay(): boolean {
  return iceCache?.hasTurn ?? false;
}
