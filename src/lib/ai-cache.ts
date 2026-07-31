import { AI_CONFIG } from './ai-config';

const memoryCache = new Map<string, { data: string; expiresAt: number }>();

const SIMILARITY_THRESHOLD = 0.6;

// Cleanup expired entries every 5 minutes
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of memoryCache) {
      if (entry.expiresAt < now) memoryCache.delete(key);
    }
  }, 5 * 60 * 1000);
}

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function generateCacheKey(question: string, context?: string): string {
  const norm = normalize(question);
  const ctxHash = context ? normalize(context).slice(0, 200) : '';
  const combined = ctxHash ? `${norm}||${ctxHash}` : norm;

  let hash = 0;
  for (let i = 0; i < combined.length; i++) {
    const char = combined.charCodeAt(i);
    hash = ((hash << 5) - hash + char) | 0;
  }
  return `ssb:ai:cache:${Math.abs(hash).toString(36)}`;
}

function jaccardSimilarity(a: string, b: string): number {
  const setA = new Set(a.split(' '));
  const setB = new Set(b.split(' '));
  const intersection = new Set([...setA].filter((x) => setB.has(x)));
  const union = new Set([...setA, ...setB]);
  return union.size === 0 ? 0 : intersection.size / union.size;
}

export async function getCachedResponse(
  question: string,
  context?: string,
): Promise<string | null> {
  const key = generateCacheKey(question, context);

  const entry = memoryCache.get(key);
  if (entry && entry.expiresAt > Date.now()) {
    return entry.data;
  }
  memoryCache.delete(key);

  return null;
}

export async function findSimilarCached(
  question: string,
): Promise<string | null> {
  const norm = normalize(question);

  for (const [, entry] of memoryCache) {
    if (entry.expiresAt < Date.now()) continue;
    try {
      const stored = JSON.parse(entry.data) as { question?: string };
      if (stored.question) {
        const sim = jaccardSimilarity(norm, normalize(stored.question));
        if (sim >= SIMILARITY_THRESHOLD) {
          return entry.data;
        }
      }
    } catch {
      // skip malformed entries
    }
  }

  return null;
}

export async function setCachedResponse(
  question: string,
  response: string,
  context?: string,
  ttlSeconds?: number,
): Promise<void> {
  const key = generateCacheKey(question, context);
  const ttl = ttlSeconds ?? AI_CONFIG.cache.ttlSeconds;
  const payload = JSON.stringify({ question, response, cachedAt: Date.now() });

  memoryCache.set(key, {
    data: payload,
    expiresAt: Date.now() + ttl * 1000,
  });

  // Evict oldest if too many entries
  if (memoryCache.size > AI_CONFIG.cache.maxEntries) {
    const oldest = memoryCache.keys().next().value;
    if (oldest) memoryCache.delete(oldest);
  }
}

export async function clearCache(): Promise<void> {
  memoryCache.clear();
}

export async function getCacheStats(): Promise<{
  memoryEntries: number;
  redisEnabled: boolean;
}> {
  return {
    memoryEntries: memoryCache.size,
    redisEnabled: false,
  };
}
