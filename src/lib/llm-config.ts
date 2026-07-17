export function getLLMConfig() {
  return {
    apiKey: process.env.GROQ_API_KEY || process.env.OPENAI_API_KEY || '',
    baseUrl: process.env.LLM_BASE_URL || 'https://api.groq.com/openai/v1',
    model: process.env.LLM_MODEL || 'llama-3.3-70b-versatile',
  };
}
