import 'server-only';
import { NextResponse } from 'next/server';
import { rateLimit, RATE_LIMITS, getClientIP, buildRateLimitHeaders, type RateLimitResult } from './rate-limit';

export type LimiterName = keyof typeof RATE_LIMITS;

/**
 * Middleware de rate-limit para rotas /api.
 * Retorna NextResponse 429 se excedido; null se deve continuar.
 */
export async function applyRateLimit(
  request: Request,
  limiter: LimiterName,
): Promise<NextResponse | null> {
  const ip = getClientIP(request);
  const result = await rateLimit(ip, limiter, RATE_LIMITS[limiter]);
  if (!result.allowed) {
    return NextResponse.json(
      {
        erro: 'Limite de requisicoes excedido. Tente novamente mais tarde.',
        limite: RATE_LIMITS[limiter].max,
        janelaMs: RATE_LIMITS[limiter].windowMs,
        retryAfterSec: Math.ceil((result.resetAt - Date.now()) / 1000),
      },
      {
        status: 429,
        headers: {
          ...buildRateLimitHeaders(result, RATE_LIMITS[limiter].max),
          'Retry-After': String(Math.ceil((result.resetAt - Date.now()) / 1000)),
        },
      },
    );
  }
  return null;
}

/**
 * Anexa headers de rate-limit a uma resposta ja construida (para rotas que
 * querem retornar 200 mas ainda assim reportar contadores ao cliente).
 */
export function withRateLimitHeaders(
  res: NextResponse,
  result: RateLimitResult,
  limite: number,
): NextResponse {
  for (const [k, v] of Object.entries(buildRateLimitHeaders(result, limite))) {
    res.headers.set(k, v);
  }
  return res;
}
