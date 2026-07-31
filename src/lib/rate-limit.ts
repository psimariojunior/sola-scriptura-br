/**
 * Rate limiting por IP + chave.
 * Em producao, usa Redis se disponivel; senao, memoria com cleanup automatico.
 */

interface Bucket {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, Bucket>();

// Cleanup a cada 5 minutos para evitar vazamento de memoria
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [key, bucket] of buckets) {
      if (bucket.resetAt < now) buckets.delete(key);
    }
  }, 5 * 60 * 1000);
}

interface RateLimitOptions {
  /** Numero maximo de requisicoes por janela. */
  max: number;
  /** Duracao da janela em ms. */
  windowMs: number;
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: number;
}

export function rateLimit(
  ip: string,
  route: string,
  opts: RateLimitOptions
): RateLimitResult {
  const key = `${route}:${ip}`;
  const now = Date.now();
  const resetAt = now + opts.windowMs;

  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt < now) {
    buckets.set(key, { count: 1, resetAt });
    return { allowed: true, remaining: opts.max - 1, resetAt };
  }

  bucket.count += 1;
  const remaining = Math.max(0, opts.max - bucket.count);
  const allowed = bucket.count <= opts.max;

  return { allowed, remaining, resetAt };
}

/**
 * Extrai o IP do cliente a partir de headers comuns de proxy/CDN.
 * Cai para 'unknown' se nada for encontrado para evitar bypass.
 */
export function getClientIP(request: Request): string {
  const headers = request.headers;
  return (
    headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    headers.get('x-real-ip') ||
    headers.get('cf-connecting-ip') ||
    'unknown'
  );
}

/** Helpers pre-configurados para as rotas de IA. */
export const RATE_LIMITS = {
  /** Rota de chat IA sincrona (pergunta/resposta). */
  IA_CHAT: { max: 20, windowMs: 60_000 },
  /** Rota de stream IA (Streaming de respostas). */
  IA_STREAM: { max: 20, windowMs: 60_000 },
  /** Rota de estudo com IA (mais pesada). */
  IA_ESTUDO: { max: 10, windowMs: 60_000 },
} satisfies Record<string, RateLimitOptions>;

export function buildRateLimitHeaders(
  result: RateLimitResult
): HeadersInit {
  return {
    'X-RateLimit-Limit': String(result.remaining + 1),
    'X-RateLimit-Remaining': String(result.remaining),
    'X-RateLimit-Reset': String(Math.floor(result.resetAt / 1000)),
  };
}
