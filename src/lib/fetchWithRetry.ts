// Fetch com retry, backoff exponencial e negative cache para APIs externas
// Usado para a API Midvash que ocasionalmente retorna 408/429/5xx

const MAX_RETRIES = 2;
const BASE_DELAY_MS = 1000;
const NEGATIVE_CACHE_TTL_MS = 30_000;

// Negative cache: evita tentar endpoints que falharam recentemente
const failureCache = new Map<string, number>();

function isRecentlyFailed(url: string): boolean {
  const ts = failureCache.get(url);
  if (!ts) return false;
  if (Date.now() - ts > NEGATIVE_CACHE_TTL_MS) {
    failureCache.delete(url);
    return false;
  }
  return true;
}

function markFailed(url: string): void {
  failureCache.set(url, Date.now());
}

function clearFailure(url: string): void {
  failureCache.delete(url);
}

export async function fetchWithRetry(
  url: string,
  options: { timeoutMs?: number; maxRetries?: number } = {}
): Promise<Response> {
  const { timeoutMs = 10_000, maxRetries = MAX_RETRIES } = options;

  if (isRecentlyFailed(url)) {
    throw new Error(`[fetchWithRetry] Recently failed: ${url}`);
  }

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const res = await fetch(url, {
        signal: AbortSignal.timeout(timeoutMs),
      });

      // Retry em erros de servidor transitorios
      if ([408, 429, 502, 503, 504].includes(res.status)) {
        if (attempt < maxRetries) {
          const retryAfter = res.headers.get('retry-after');
          const delay = retryAfter
            ? parseInt(retryAfter, 10) * 1000
            : BASE_DELAY_MS * Math.pow(2, attempt);
          await new Promise((r) => setTimeout(r, Math.min(delay, 10_000)));
          continue;
        }
        markFailed(url);
      }

      clearFailure(url);
      return res;
    } catch (err) {
      const isTimeout =
        err instanceof DOMException && err.name === 'TimeoutError';
      const isNetwork = err instanceof TypeError;

      if (attempt < maxRetries && (isTimeout || isNetwork)) {
        const delay = BASE_DELAY_MS * Math.pow(2, attempt);
        await new Promise((r) => setTimeout(r, delay));
        continue;
      }

      markFailed(url);
      throw err;
    }
  }

  throw new Error('Unreachable');
}
