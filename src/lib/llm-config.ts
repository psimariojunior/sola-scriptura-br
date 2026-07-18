import 'server-only';

/**
 * Resolve configuracao do LLM (Groq) SOMENTE a partir de variaveis de ambiente.
 * A chave nunca deve ir hardcoded no codigo-fonte (vazamento de credencial).
 */
export function getLLMConfig() {
  const apiKey = process.env.GROQ_API_KEY || process.env.OPENAI_API_KEY || '';
  return {
    apiKey,
    baseUrl: process.env.LLM_BASE_URL || 'https://api.groq.com/openai/v1',
    model: process.env.LLM_MODEL || 'llama-3.3-70b-versatile',
  };
}
