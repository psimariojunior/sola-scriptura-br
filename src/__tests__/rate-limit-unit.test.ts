import { RATE_LIMITS, buildRateLimitHeaders, rateLimit, rateLimitSync, getClientIP, RateLimitResult } from '@/lib/rate-limit';

describe('Rate Limit Config', () => {
  it('tem todos os limites definidos', () => {
    expect(RATE_LIMITS.IA_CHAT).toBeDefined();
    expect(RATE_LIMITS.AUTH_LOGIN).toBeDefined();
    expect(RATE_LIMITS.AUTH_CADASTRAR).toBeDefined();
    expect(RATE_LIMITS.SYNC).toBeDefined();
    expect(RATE_LIMITS.ANALYTICS).toBeDefined();
    expect(RATE_LIMITS.IA_STREAM).toBeDefined();
    expect(RATE_LIMITS.IA_ESTUDO).toBeDefined();
    expect(RATE_LIMITS.AUDIO_EDGE).toBeDefined();
    expect(RATE_LIMITS.AUTH_CADASTRAR).toBeDefined();
    expect(RATE_LIMITS.AUTH_RECUPERAR_SENHA).toBeDefined();
    expect(RATE_LIMITS.AUTH_REFRESH).toBeDefined();
    expect(RATE_LIMITS.ANALYTICS_BATCH).toBeDefined();
    expect(RATE_LIMITS.NOTIFICATIONS).toBeDefined();
    expect(RATE_LIMITS.NOTIFICATIONS_REGISTER).toBeDefined();
  });

  it('IA_CHAT permite 20 req por minuto', () => {
    expect(RATE_LIMITS.IA_CHAT.max).toBe(20);
    expect(RATE_LIMITS.IA_CHAT.windowMs).toBe(60_000);
  });

  it('AUTH_LOGIN permite 5 req por 15 min', () => {
    expect(RATE_LIMITS.AUTH_LOGIN.max).toBe(5);
    expect(RATE_LIMITS.AUTH_LOGIN.windowMs).toBe(15 * 60_000);
  });

  it('AUTH_CADASTRAR permite 3 req por hora', () => {
    expect(RATE_LIMITS.AUTH_CADASTRAR.max).toBe(3);
    expect(RATE_LIMITS.AUTH_CADASTRAR.windowMs).toBe(60 * 60_000);
  });

  it('todos os limites tem max > 0 e windowMs > 0', () => {
    for (const [key, val] of Object.entries(RATE_LIMITS)) {
      expect(val.max).toBeGreaterThan(0);
      expect(val.windowMs).toBeGreaterThan(0);
    }
  });
});

describe('buildRateLimitHeaders', () => {
  it('retorna headers corretos para strategy memory', () => {
    const result: RateLimitResult = {
      allowed: true,
      remaining: 10,
      resetAt: Date.now() + 60_000,
      strategy: 'memory',
    };
    const headers = buildRateLimitHeaders(result, 20) as Record<string, string>;
    expect(headers['X-RateLimit-Limit']).toBe('20');
    expect(headers['X-RateLimit-Remaining']).toBe('10');
    expect(headers['X-RateLimit-Reset']).toBeDefined();
    expect(headers['X-RateLimit-Strategy']).toBe('memory');
  });

  it('retorna headers corretos para strategy redis', () => {
    const result: RateLimitResult = {
      allowed: false,
      remaining: 0,
      resetAt: Date.now() + 30_000,
      strategy: 'redis',
    };
    const headers = buildRateLimitHeaders(result, 10) as Record<string, string>;
    expect(headers['X-RateLimit-Limit']).toBe('10');
    expect(headers['X-RateLimit-Remaining']).toBe('0');
    expect(headers['X-RateLimit-Strategy']).toBe('redis');
  });

  it('X-RateLimit-Reset e timestamp em segundos', () => {
    const resetAt = 1700000060000;
    const result: RateLimitResult = {
      allowed: true,
      remaining: 5,
      resetAt,
      strategy: 'memory',
    };
    const headers = buildRateLimitHeaders(result, 10) as Record<string, string>;
    expect(headers['X-RateLimit-Reset']).toBe(String(Math.floor(resetAt / 1000)));
  });
});

describe('rateLimitSync', () => {
  it('primeira chamada e permitida com remaining = max - 1', () => {
    const result = rateLimitSync('192.168.1.1', '/api/ia', { max: 5, windowMs: 60_000 });
    expect(result.allowed).toBe(true);
    expect(result.remaining).toBe(4);
    expect(result.strategy).toBe('memory');
    expect(result.resetAt).toBeGreaterThan(Date.now());
  });

  it('bloqueia apos max de chamadas', () => {
    const ip = '10.0.0.1';
    const route = '/api/test-block';
    const max = 3;

    rateLimitSync(ip, route, { max, windowMs: 60_000 });
    rateLimitSync(ip, route, { max, windowMs: 60_000 });
    const third = rateLimitSync(ip, route, { max, windowMs: 60_000 });

    expect(third.allowed).toBe(true);
    expect(third.remaining).toBe(0);

    const fourth = rateLimitSync(ip, route, { max, windowMs: 60_000 });
    expect(fourth.allowed).toBe(false);
    expect(fourth.remaining).toBe(0);
  });

  it('IPs diferentes tem buckets separados', () => {
    const route = '/api/test-separate';
    const max = 2;

    rateLimitSync('1.1.1.1', route, { max, windowMs: 60_000 });
    rateLimitSync('1.1.1.1', route, { max, windowMs: 60_000 });
    const blocked = rateLimitSync('1.1.1.1', route, { max, windowMs: 60_000 });
    expect(blocked.allowed).toBe(false);

    // IP diferente ainda pode
    const allowed = rateLimitSync('2.2.2.2', route, { max, windowMs: 60_000 });
    expect(allowed.allowed).toBe(true);
    expect(allowed.remaining).toBe(1);
  });

  it('remaining nunca fica negativo', () => {
    const ip = '3.3.3.3';
    const route = '/api/test-neg';
    const max = 1;

    rateLimitSync(ip, route, { max, windowMs: 60_000 });
    const r1 = rateLimitSync(ip, route, { max, windowMs: 60_000 });
    expect(r1.remaining).toBe(0);

    const r2 = rateLimitSync(ip, route, { max, windowMs: 60_000 });
    expect(r2.remaining).toBe(0);
  });

  it('rotas diferentes tem buckets separados', () => {
    const ip = '5.5.5.5';
    const max = 1;

    rateLimitSync(ip, '/api/rota-a', { max, windowMs: 60_000 });
    const blocked = rateLimitSync(ip, '/api/rota-a', { max, windowMs: 60_000 });
    expect(blocked.allowed).toBe(false);

    const allowed = rateLimitSync(ip, '/api/rota-b', { max, windowMs: 60_000 });
    expect(allowed.allowed).toBe(true);
  });
});

describe('getClientIP', () => {
  function makeRequest(headerMap: Record<string, string>): Request {
    const headers = new Map<string, string>();
    for (const [k, v] of Object.entries(headerMap)) {
      headers.set(k.toLowerCase(), v);
    }
    return {
      headers: {
        get: (name: string) => headers.get(name.toLowerCase()) ?? null,
      },
    } as unknown as Request;
  }

  it('extrai IP de x-forwarded-for', () => {
    const req = makeRequest({ 'x-forwarded-for': '1.2.3.4, 5.6.7.8' });
    expect(getClientIP(req)).toBe('1.2.3.4');
  });

  it('extrai IP de x-forwarded-for com espacos', () => {
    const req = makeRequest({ 'x-forwarded-for': '  10.0.0.1 , 192.168.1.1' });
    expect(getClientIP(req)).toBe('10.0.0.1');
  });

  it('fallback para x-real-ip', () => {
    const req = makeRequest({ 'x-real-ip': '8.8.8.8' });
    expect(getClientIP(req)).toBe('8.8.8.8');
  });

  it('fallback para cf-connecting-ip', () => {
    const req = makeRequest({ 'cf-connecting-ip': '104.16.0.1' });
    expect(getClientIP(req)).toBe('104.16.0.1');
  });

  it('retorna "unknown" quando nenhum header esta presente', () => {
    const req = makeRequest({});
    expect(getClientIP(req)).toBe('unknown');
  });

  it('x-forwarded-for tem prioridade sobre outros headers', () => {
    const req = makeRequest({
      'x-forwarded-for': '1.1.1.1',
      'x-real-ip': '2.2.2.2',
      'cf-connecting-ip': '3.3.3.3',
    });
    expect(getClientIP(req)).toBe('1.1.1.1');
  });

  it('x-real-ip tem prioridade sobre cf-connecting-ip', () => {
    const req = makeRequest({
      'x-real-ip': '2.2.2.2',
      'cf-connecting-ip': '3.3.3.3',
    });
    expect(getClientIP(req)).toBe('2.2.2.2');
  });
});

describe('rateLimit (async — memory path)', () => {
  it('primeira chamada e permitida com remaining = max - 1', async () => {
    const result = await rateLimit('192.168.1.1', '/api/ia-test', { max: 5, windowMs: 60_000 });
    expect(result.allowed).toBe(true);
    expect(result.remaining).toBe(4);
    expect(result.strategy).toBe('memory');
  });

  it('bloqueia apos exceder max', async () => {
    const ip = '10.0.0.1';
    const route = '/api/test-async-block';
    const max = 2;

    await rateLimit(ip, route, { max, windowMs: 60_000 });
    const second = await rateLimit(ip, route, { max, windowMs: 60_000 });
    expect(second.allowed).toBe(true);
    expect(second.remaining).toBe(0);

    const third = await rateLimit(ip, route, { max, windowMs: 60_000 });
    expect(third.allowed).toBe(false);
    expect(third.remaining).toBe(0);
  });

  it('IPs diferentes tem buckets separados', async () => {
    const route = '/api/test-async-separate';
    const max = 1;

    await rateLimit('1.1.1.1', route, { max, windowMs: 60_000 });
    const blocked = await rateLimit('1.1.1.1', route, { max, windowMs: 60_000 });
    expect(blocked.allowed).toBe(false);

    const allowed = await rateLimit('2.2.2.2', route, { max, windowMs: 60_000 });
    expect(allowed.allowed).toBe(true);
  });

  it('retorna strategy memory quando REDIS_URL nao esta configurado', async () => {
    const result = await rateLimit('1.1.1.1', '/api/no-redis', { max: 10, windowMs: 60_000 });
    expect(result.strategy).toBe('memory');
  });

  it('resetAt esta no futuro', async () => {
    const before = Date.now();
    const result = await rateLimit('1.1.1.1', '/api/future-reset', { max: 10, windowMs: 60_000 });
    expect(result.resetAt).toBeGreaterThanOrEqual(before);
    expect(result.resetAt).toBeLessThanOrEqual(before + 60_000 + 100);
  });
});
