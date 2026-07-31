import { AI_CONFIG, type AIProvider, type AIResponse } from './ai-config';
import { getCachedResponse, setCachedResponse, findSimilarCached } from './ai-cache';
import { precomputedAnswers, findPrecomputedAnswer } from '@/data/precomputed-answers';

interface ChatOptions {
  question: string;
  context?: string;
  tradicao?: string;
  systemPrompt?: string;
  userId?: string;
}

interface StreamCallbacks {
  onToken: (token: string) => void;
  onStatus: (message: string, stage: string) => void;
  onDone: () => void;
  onError: (error: string) => void;
}

interface StudyOptions {
  passage: string;
  type?: string;
  userId?: string;
}

function buildSystemPrompt(tradicao?: string): string {
  const parts = [
    'Voce e um professor doutor em Teologia e Exegese Biblica com decadas de experiencia ensinando em seminarios.',
    'Responda em portugues brasileiro com rigor academico, mas acessivel.',
    '',
    'SUA IDENTIDADE:',
    '- Especialista em Antigo e Novo Testamento',
    '- Conhecedor profundo de hebraico biblico e grego koine',
    '- Historiador do contexto cultural e arqueologico biblico',
    '- Teologo sistematico com amplo conhecimento das tradicoes cristas',
    '',
    'DIRETRIZES DE RESPOSTA:',
    '- SEMPRE cite passagens biblicas relevantes (livro, capitulo e versiculo)',
    '- Considere o contexto historico, cultural e literario de cada passagem',
    '- Apresente multiplas perspectivas teologicas quando relevante',
    '- Use markdown para estruturar: topicos, listas, versiculos em destaque',
    '- Conecte o texto biblico com a vida pratica do crente',
    '- Quando apropriado, mencione o original (hebraico/grego) e seu significado',
    '- Recomende estudo adicional em passagens relacionadas',
    '- Seja preciso, mas humilde — reconheca limitacoes da interpretacao humana',
    '',
    'ESTILO:',
    '- Comece com uma sintese rapida da resposta',
    '- Desenvolva com profundidade',
    '- Termine com aplicacoes praticas ou perguntas para reflexao',
    '- Use versiculos como fundamento, nao como decoracao',
  ];

  if (tradicao) {
    parts.push('', `PERSPECTIVA TEOLOGICA: ${tradicao}`);
    parts.push(`- Considere especialmente a tradicao ${tradicao} em sua resposta`);
    parts.push('- Mencione teologos relevantes dessa tradicao quando apropriado');
  }

  return parts.join('\n');
}

function buildStudySystemPrompt(): string {
  return `Voce e um professor de teologia biblica excepcionalmente talentoso, com PhD em Teologia Sistematica e Exegese Biblica. Voce fala portugues brasileiro com excelencia academica.

Sua tarefa e gerar guias de estudo biblico COMPLETOS e DETALHADOS. Cada guia deve ser uma obra-prima de ensino biblico.

FORMATO OBRIGATORIO (Markdown):
# [Titulo do Estudo]

## Contexto Historico
[2-3 paragrafos sobre o contexto historico, cultural e literario da passagem]

## Analise Exegética
[Verse-by-verse breakdown dos versiculos-chave, com observacoes gramaticais e teologicas]

## Temas Teologicos Principais
[3-5 temas com explicacoes detalhadas e como se conectam]

## Referencias Cruzadas
[Lista de passagens relacionadas com breve explicacao de cada]

## Aplicacao Pratica
[3-4 aplicacoes concretas para a vida do crente hoje]

## Comentarios de Teologos
[Citacoes ou resumos de 2-3 teologos renomados sobre a passagem]

## Perguntas para Estudo
[5-7 perguntas de reflexao para grupo ou estudo pessoal]

## Pontos de Oracao
[3-4 pontos de oracao derivados do estudo]

REGRAS:
- Use linguagem academica acessivel
- Cite versiculos sempre com referencia completa
- Seja abrangente mas nao superficial
- Considere diferentes perspectivas teologicas quando relevante
- O estudo deve ter pelo menos 800 palavras`;
}

// ─── Ollama ─────────────────────────────────────────────────────────────────

async function callOllama(
  question: string,
  options: { systemPrompt: string; stream?: boolean },
): Promise<{ content: string; tokens: { prompt: number; completion: number; total: number } }> {
  const { ollama } = AI_CONFIG;
  if (!ollama.enabled) throw new Error('Ollama disabled');

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), ollama.timeout);

  try {
    const res = await fetch(`${ollama.baseUrl}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        model: ollama.model,
        messages: [
          { role: 'system', content: options.systemPrompt },
          { role: 'user', content: question },
        ],
        stream: false,
      }),
    });

    if (!res.ok) throw new Error(`Ollama ${res.status}: ${await res.text()}`);

    const data = await res.json();
    return {
      content: data.message?.content ?? '',
      tokens: {
        prompt: data.prompt_eval_count ?? 0,
        completion: data.eval_count ?? 0,
        total: (data.prompt_eval_count ?? 0) + (data.eval_count ?? 0),
      },
    };
  } finally {
    clearTimeout(timeout);
  }
}

async function* streamOllama(
  question: string,
  systemPrompt: string,
): AsyncGenerator<{ token: string; done: boolean }> {
  const { ollama } = AI_CONFIG;
  if (!ollama.enabled) throw new Error('Ollama disabled');

  const res = await fetch(`${ollama.baseUrl}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: ollama.model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: question },
      ],
      stream: true,
    }),
  });

  if (!res.ok) throw new Error(`Ollama stream ${res.status}`);

  const reader = res.body?.getReader();
  if (!reader) throw new Error('ReadableStream not available');

  const decoder = new TextDecoder();
  let buffer = '';

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed) continue;
        try {
          const parsed = JSON.parse(trimmed);
          if (parsed.message?.content) {
            yield { token: parsed.message.content, done: false };
          }
          if (parsed.done) {
            yield { token: '', done: true };
            return;
          }
        } catch {
          // skip malformed
        }
      }
    }
    yield { token: '', done: true };
  } finally {
    reader.releaseLock();
  }
}

// ─── Groq ───────────────────────────────────────────────────────────────────

async function callGroq(
  question: string,
  options: {
    systemPrompt: string;
    stream?: boolean;
    temperature?: number;
    maxTokens?: number;
  },
): Promise<{ content: string; tokens: { prompt: number; completion: number; total: number } }> {
  const { groq } = AI_CONFIG;
  if (!groq.apiKey) throw new Error('Groq API key not configured');

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), groq.timeout);

  try {
    const res = await fetch(`${groq.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${groq.apiKey}`,
        'HTTP-Referer': 'https://solascripturabr.com.br',
        'X-Title': 'Sola Scriptura BR',
      },
      signal: controller.signal,
      body: JSON.stringify({
        model: groq.model,
        messages: [
          { role: 'system', content: options.systemPrompt },
          { role: 'user', content: question },
        ],
        temperature: options.temperature ?? 0.3,
        max_tokens: options.maxTokens ?? 4096,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      if (res.status === 402 || errText.includes('insufficient')) {
        throw new Error('groq_credits_missing');
      }
      throw new Error(`Groq ${res.status}: ${errText}`);
    }

    const data = await res.json();
    return {
      content: data.choices?.[0]?.message?.content ?? '',
      tokens: {
        prompt: data.usage?.prompt_tokens ?? 0,
        completion: data.usage?.completion_tokens ?? 0,
        total: data.usage?.total_tokens ?? 0,
      },
    };
  } finally {
    clearTimeout(timeout);
  }
}

async function* streamGroq(
  question: string,
  systemPrompt: string,
): AsyncGenerator<{ token: string; done: boolean }> {
  const { groq } = AI_CONFIG;
  if (!groq.apiKey) throw new Error('Groq API key not configured');

  const res = await fetch(`${groq.baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${groq.apiKey}`,
      'HTTP-Referer': 'https://solascripturabr.com.br',
      'X-Title': 'Sola Scriptura BR',
    },
    body: JSON.stringify({
      model: groq.model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: question },
      ],
      temperature: 0.3,
      max_tokens: 4096,
      stream: true,
      stream_options: { include_usage: true },
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    if (res.status === 402 || errText.includes('insufficient')) {
      throw new Error('groq_credits_missing');
    }
    throw new Error(`Groq stream ${res.status}`);
  }

  const reader = res.body?.getReader();
  if (!reader) throw new Error('ReadableStream not available');

  const decoder = new TextDecoder();
  let buffer = '';

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || !trimmed.startsWith('data: ')) continue;
        const data = trimmed.slice(6);
        if (data === '[DONE]') {
          yield { token: '', done: true };
          return;
        }
        try {
          const parsed = JSON.parse(data);
          const delta = parsed.choices?.[0]?.delta;
          if (delta?.content) {
            yield { token: delta.content, done: false };
          }
        } catch {
          // skip
        }
      }
    }
    yield { token: '', done: true };
  } finally {
    reader.releaseLock();
  }
}

// ─── Public API ─────────────────────────────────────────────────────────────

export async function chatWithAI(options: ChatOptions): Promise<AIResponse> {
  const { question, context, tradicao, userId } = options;
  const start = Date.now();
  const sysPrompt = options.systemPrompt || buildSystemPrompt(tradicao);

  // 1. Check precomputed
  const precomputed = findPrecomputedAnswer(question);
  if (precomputed) {
    return {
      content: precomputed,
      provider: 'precomputed',
      cached: false,
      latencyMs: Date.now() - start,
    };
  }

  // 2. Check semantic cache
  const cached = await getCachedResponse(question, context);
  if (cached) {
    try {
      const parsed = JSON.parse(cached);
      return {
        content: parsed.response,
        provider: 'cache',
        cached: true,
        latencyMs: Date.now() - start,
      };
    } catch {
      return {
        content: cached,
        provider: 'cache',
        cached: true,
        latencyMs: Date.now() - start,
      };
    }
  }

  // 3. Try similar cached
  const similar = await findSimilarCached(question);
  if (similar) {
    try {
      const parsed = JSON.parse(similar);
      return {
        content: parsed.response,
        provider: 'cache',
        cached: true,
        latencyMs: Date.now() - start,
      };
    } catch {
      // fall through
    }
  }

  const userMessage = context
    ? `Contexto adicional:\n${context}\n\nPergunta: ${question}`
    : question;

  // 4. Try Ollama
  try {
    const result = await callOllama(userMessage, { systemPrompt: sysPrompt });
    // Cache the result
    await setCachedResponse(question, result.content, context);
    return {
      content: result.content,
      provider: 'ollama',
      model: AI_CONFIG.ollama.model,
      tokens: result.tokens,
      cached: false,
      latencyMs: Date.now() - start,
    };
  } catch {
    // fall through to Groq
  }

  // 5. Fall back to Groq
  try {
    const result = await callGroq(userMessage, { systemPrompt: sysPrompt });
    await setCachedResponse(question, result.content, context);
    return {
      content: result.content,
      provider: 'groq',
      model: AI_CONFIG.groq.model,
      tokens: result.tokens,
      cached: false,
      latencyMs: Date.now() - start,
    };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    if (msg === 'groq_credits_missing') {
      // Return precomputed or local fallback
      const fallback = precomputedAnswers['geral'];
      return {
        content: fallback ?? 'Desculpe, todos os provedores estao indisponiveis no momento.',
        provider: 'local',
        cached: false,
        latencyMs: Date.now() - start,
      };
    }
    throw err;
  }
}

export async function* streamWithAI(
  options: ChatOptions,
): AsyncGenerator<{ token: string; done: boolean; provider: AIProvider }> {
  const { question, context, tradicao } = options;
  const sysPrompt = options.systemPrompt || buildSystemPrompt(tradicao);

  // 1. Check precomputed
  const precomputed = findPrecomputedAnswer(question);
  if (precomputed) {
    const words = precomputed.split(' ');
    for (let i = 0; i < words.length; i++) {
      yield { token: (i === 0 ? '' : ' ') + words[i], done: false, provider: 'precomputed' };
    }
    yield { token: '', done: true, provider: 'precomputed' };
    return;
  }

  // 2. Check cache
  const cached = await getCachedResponse(question, context);
  if (cached) {
    let content: string;
    try {
      const parsed = JSON.parse(cached);
      content = parsed.response;
    } catch {
      content = cached;
    }
    const words = content.split(' ');
    for (let i = 0; i < words.length; i++) {
      yield { token: (i === 0 ? '' : ' ') + words[i], done: false, provider: 'cache' };
    }
    yield { token: '', done: true, provider: 'cache' };
    return;
  }

  const userMessage = context
    ? `Contexto adicional:\n${context}\n\nPergunta: ${question}`
    : question;

  // 3. Try Ollama stream
  try {
    let fullContent = '';
    for await (const chunk of streamOllama(userMessage, sysPrompt)) {
      fullContent += chunk.token;
      yield { ...chunk, provider: 'ollama' };
      if (chunk.done) break;
    }
    await setCachedResponse(question, fullContent, context);
    return;
  } catch {
    // fall through
  }

  // 4. Groq stream
  try {
    let fullContent = '';
    for await (const chunk of streamGroq(userMessage, sysPrompt)) {
      fullContent += chunk.token;
      yield { ...chunk, provider: 'groq' };
      if (chunk.done) break;
    }
    await setCachedResponse(question, fullContent, context);
    return;
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    if (msg === 'groq_credits_missing') {
      const fallback = precomputedAnswers['geral'] ?? 'Todos os provedores indisponiveis.';
      const words = fallback.split(' ');
      for (let i = 0; i < words.length; i++) {
        yield { token: (i === 0 ? '' : ' ') + words[i], done: false, provider: 'local' };
      }
      yield { token: '', done: true, provider: 'local' };
      return;
    }
    throw err;
  }
}

export async function generateStudy(options: StudyOptions): Promise<AIResponse> {
  const { passage, type, userId } = options;
  const start = Date.now();
  const sysPrompt = buildStudySystemPrompt();

  // 1. Check precomputed study
  const precomputedKey = `estudo:${passage.toLowerCase()}`;
  const precomputed = precomputedAnswers[precomputedKey];
  if (precomputed) {
    return {
      content: precomputed,
      provider: 'precomputed',
      cached: false,
      latencyMs: Date.now() - start,
    };
  }

  // 2. Check cache
  const cached = await getCachedResponse(`estudo:${passage}`, type);
  if (cached) {
    try {
      const parsed = JSON.parse(cached);
      return {
        content: parsed.response,
        provider: 'cache',
        cached: true,
        latencyMs: Date.now() - start,
      };
    } catch {
      return {
        content: cached,
        provider: 'cache',
        cached: true,
        latencyMs: Date.now() - start,
      };
    }
  }

  const userMessage = `Gere um guia de estudo biblico completo para: ${passage}${type ? `\n\nFoco: ${type}` : ''}`;

  // 3. Try Ollama
  try {
    const result = await callOllama(userMessage, {
      systemPrompt: sysPrompt,
    });
    await setCachedResponse(`estudo:${passage}`, result.content, type);
    return {
      content: result.content,
      provider: 'ollama',
      model: AI_CONFIG.ollama.model,
      tokens: result.tokens,
      cached: false,
      latencyMs: Date.now() - start,
    };
  } catch {
    // fall through
  }

  // 4. Groq
  try {
    const result = await callGroq(userMessage, {
      systemPrompt: sysPrompt,
      temperature: 0.4,
      maxTokens: 4096,
    });
    await setCachedResponse(`estudo:${passage}`, result.content, type);
    return {
      content: result.content,
      provider: 'groq',
      model: AI_CONFIG.groq.model,
      tokens: result.tokens,
      cached: false,
      latencyMs: Date.now() - start,
    };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    if (msg === 'groq_credits_missing') {
      return {
        content: 'Desculpe, todos os provedores estao indisponiveis para gerar estudos no momento.',
        provider: 'local',
        cached: false,
        latencyMs: Date.now() - start,
      };
    }
    throw err;
  }
}

export async function getAIStatus(): Promise<{
  ollama: { available: boolean; model: string };
  groq: { available: boolean; model: string; hasApiKey: boolean };
  cache: { memoryEntries: number; redisEnabled: boolean };
}> {
  const { getCacheStats } = await import('./ai-cache');
  const cacheStats = await getCacheStats();

  let ollamaAvailable = false;
  try {
    const res = await fetch(`${AI_CONFIG.ollama.baseUrl}/api/tags`, {
      signal: AbortSignal.timeout(5000),
    });
    ollamaAvailable = res.ok;
  } catch {
    // not available
  }

  return {
    ollama: {
      available: ollamaAvailable && AI_CONFIG.ollama.enabled,
      model: AI_CONFIG.ollama.model,
    },
    groq: {
      available: AI_CONFIG.groq.enabled && !!AI_CONFIG.groq.apiKey,
      model: AI_CONFIG.groq.model,
      hasApiKey: !!AI_CONFIG.groq.apiKey,
    },
    cache: cacheStats,
  };
}
