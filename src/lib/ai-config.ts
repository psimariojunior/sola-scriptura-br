/**
 * AI Provider Configuration
 * Priority: Precomputed → Cache → Ollama (self-hosted, unlimited) → Groq (free, 100k/day)
 */

export const AI_CONFIG = {
  // Ollama — self-hosted on Oracle VM (primary, unlimited)
  ollama: {
    baseUrl: process.env.OLLAMA_BASE_URL || 'http://137.131.184.53:11434',
    model: process.env.OLLAMA_MODEL || 'llama3.1:8b',
    enabled: process.env.OLLAMA_ENABLED !== 'false',
    timeout: 30_000,
  },

  // Groq — cloud free tier (fallback, 100k tokens/day)
  groq: {
    baseUrl: 'https://api.groq.com/openai/v1',
    model: 'llama-3.3-70b-versatile',
    apiKey: process.env.GROQ_API_KEY || process.env.OPENAI_API_KEY || '',
    enabled: true,
    timeout: 15_000,
  },

  // Cache — In-memory semantic cache (add Redis later for multi-instance)
  cache: {
    enabled: true,
    ttlSeconds: 86400, // 24h
    maxEntries: 10_000,
  },

  // Rate limits per user
  rateLimit: {
    chat: { max: 30, windowMs: 60_000 },    // 30/min per user
    study: { max: 10, windowMs: 60_000 },   // 10/min per user
    stream: { max: 30, windowMs: 60_000 },  // 30/min per user
    free: { max: 5, windowMs: 60_000 },     // 5/min for unauthenticated
  },
} as const;

export type AIProvider = 'ollama' | 'groq' | 'cache' | 'precomputed' | 'local';

export interface AIResponse {
  content: string;
  provider: AIProvider;
  model?: string;
  tokens?: { prompt: number; completion: number; total: number };
  cached: boolean;
  latencyMs: number;
}
