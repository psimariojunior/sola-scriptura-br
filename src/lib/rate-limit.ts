/**
 * Rate limiting por IP + chave.
 *
 * Estrategia:
 *  - Se REDIS_URL disponivel no server, usa Redis (funciona em distribuido).
 *  - Caso contrario, usa memoria local com cleanup automatico (single-instance).
 *
 * Em serverless (Vercel) sem Redis, cada cold start tem seu proprio bucket —
 * ainda bloqueia tentativas individuais mas nao escala horizontalmente.
 */

interface Bucket {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, Bucket>();

const REDIS_URL = process.env.REDIS_URL || '';
const USE_REDIS = !!REDIS_URL;

if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [key, bucket] of buckets) {
      if (bucket.resetAt < now) buckets.delete(key);
    }
  }, 5 * 60 * 1000);
}

interface RateLimitOptions {
  max: number;
  windowMs: number;
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: number;
  strategy: 'redis' | 'memory';
}

/**
 * Incrementa contador no Redis com TTL atomico.
 * Fallback graceful se o Redis cair — em vez de quebrar, libera (fail-open).
 */
async function redisIncr(key: string, windowMs: number): Promise<{ count: number; resetAt: number } | null> {
  if (!USE_REDIS) return null;
  try {
    const url = new URL(REDIS_URL);
    const cmd = ['INCR', key, ...(windowMs <= 0 ? [] : ['PEXPIRE', key, String(windowMs), 'NX'])];
    const body = `*${cmd.length}\r\n${cmd.map((c) => `$${c.length}\r\n${c}\r\n`).join('')}`;

    const res = await fetch(url.toString(), {
      method: 'POST',
      headers: { host: url.hostname, 'Content-Type': 'application/x-redis-protocol' },
      body,
    });
    if (!res.ok) return null;
    const text = await res.text();
    // Resposta RESP: $N\r\n<n>\r\n ou :<n>\r\n
    const match = text.match(/(?::|-?\d+)\r?\n(\d+)\r?\n/);
    const count = match ? parseInt(match[1], 10) : 0;
    return { count, resetAt: Date.now() + windowMs };
  } catch {
    return null;
  }
}

export async function rateLimit(
  ip: string,
  route: string,
  opts: RateLimitOptions,
): Promise<RateLimitResult> {
  const key = `${route}:${ip}`;

  // Tenta Redis primeiro
  const redisResult = await redisIncr(key, opts.windowMs);
  if (redisResult) {
    const remaining = Math.max(0, opts.max - redisResult.count);
    return {
      allowed: redisResult.count <= opts.max,
      remaining,
      resetAt: redisResult.resetAt,
      strategy: 'redis',
    };
  }

  // Fallback em memoria
  const now = Date.now();
  const resetAt = now + opts.windowMs;
  const bucket = buckets.get(key);
  if (!bucket || bucket.resetAt < now) {
    buckets.set(key, { count: 1, resetAt });
    return { allowed: true, remaining: opts.max - 1, resetAt, strategy: 'memory' };
  }
  bucket.count += 1;
  const remaining = Math.max(0, opts.max - bucket.count);
  return {
    allowed: bucket.count <= opts.max,
    remaining,
    resetAt,
    strategy: 'memory',
  };
}

/**
 * Wrapper sincrono (memoria apenas) — para rotas que nao podem await.
 * Se REDIS_URL estiver configurado, ele sera ignorado neste caminho.
 */
export function rateLimitSync(
  ip: string,
  route: string,
  opts: RateLimitOptions,
): RateLimitResult {
  const key = `${route}:${ip}`;
  const now = Date.now();
  const resetAt = now + opts.windowMs;
  const bucket = buckets.get(key);
  if (!bucket || bucket.resetAt < now) {
    buckets.set(key, { count: 1, resetAt });
    return { allowed: true, remaining: opts.max - 1, resetAt, strategy: 'memory' };
  }
  bucket.count += 1;
  const remaining = Math.max(0, opts.max - bucket.count);
  return {
    allowed: bucket.count <= opts.max,
    remaining,
    resetAt,
    strategy: 'memory',
  };
}

export function getClientIP(request: Request): string {
  const headers = request.headers;
  return (
    headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    headers.get('x-real-ip') ||
    headers.get('cf-connecting-ip') ||
    'unknown'
  );
}

export const RATE_LIMITS = {
  IA_CHAT: { max: 20, windowMs: 60_000 },
  IA_STREAM: { max: 20, windowMs: 60_000 },
  IA_ESTUDO: { max: 10, windowMs: 60_000 },
  AUDIO_EDGE: { max: 60, windowMs: 60_000 },
  AUTH_LOGIN: { max: 5, windowMs: 15 * 60_000 },
  AUTH_CADASTRAR: { max: 3, windowMs: 60 * 60_000 },
  AUTH_REFRESH: { max: 20, windowMs: 15 * 60_000 },
} satisfies Record<string, RateLimitOptions>;

export function buildRateLimitHeaders(result: RateLimitResult, limite: number): HeadersInit {
  return {
    'X-RateLimit-Limit': String(limite),
    'X-RateLimit-Remaining': String(result.remaining),
    'X-RateLimit-Reset': String(Math.floor(result.resetAt / 1000)),
    'X-RateLimit-Strategy': result.strategy,
  };
}
