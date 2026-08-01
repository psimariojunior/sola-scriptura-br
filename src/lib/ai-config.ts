import 'server-only';

/**
 * AI Provider Configuration
 *
 * Camadas (em ordem de prioridade):
 *  1. Ollama (self-hosted na Oracle VM, ilimitado)
 *  2. Groq (free tier, 100k tokens/dia)
 *  3. Fallback local (respostas curadas)
 *
 * AVISO DE SEGURANCA: chaves de API nunca sao serializadas em objetos
 * exportados nem logadas. A funcao getGroqKey() retorna a chave em runtime.
 */

export interface ProviderConfig {
  baseUrl: string;
  model: string;
  enabled: boolean;
  timeout: number;
}

export interface GroqConfig extends ProviderConfig {
  getKey: () => string;
}

export interface AIConfigShape {
  ollama: ProviderConfig;
  groq: GroqConfig;
  cache: { enabled: boolean; ttlSeconds: number; maxEntries: number };
  rateLimit: {
    chat: { max: number; windowMs: number };
    study: { max: number; windowMs: number };
    stream: { max: number; windowMs: number };
    free: { max: number; windowMs: number };
  };
}

export const AI_CONFIG: AIConfigShape = {
  ollama: {
    baseUrl: process.env.OLLAMA_BASE_URL || 'http://137.131.184.53:11434',
    model: process.env.OLLAMA_MODEL || 'llama3.1:8b',
    enabled: process.env.OLLAMA_ENABLED !== 'false',
    timeout: 30_000,
  },
  groq: {
    baseUrl: 'https://api.groq.com/openai/v1',
    model: 'llama-3.3-70b-versatile',
    enabled: true,
    timeout: 15_000,
    getKey: () => process.env.GROQ_API_KEY || process.env.OPENAI_API_KEY || '',
  },
  cache: {
    enabled: true,
    ttlSeconds: 86_400, // 24h
    maxEntries: 10_000,
  },
  rateLimit: {
    chat: { max: 30, windowMs: 60_000 },
    study: { max: 10, windowMs: 60_000 },
    stream: { max: 30, windowMs: 60_000 },
    free: { max: 5, windowMs: 60_000 },
  },
} as const;

/**
 * Helper seguro para acessar a chave da Groq em runtime.
 * Nunca persiste a chave em objetos serializaveis.
 */
export function getGroqKey(): string {
  return AI_CONFIG.groq.getKey();
}

export type AIProvider = 'ollama' | 'groq' | 'cache' | 'precomputed' | 'local';

export interface AIResponse {
  content: string;
  provider: AIProvider;
  model?: string;
  tokens?: { prompt: number; completion: number; total: number };
  cached: boolean;
  latencyMs: number;
}
