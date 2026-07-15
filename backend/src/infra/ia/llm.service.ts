import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

interface TokenUsage {
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
}

interface CostEntry {
  timestamp: Date;
  model: string;
  usage: TokenUsage;
  costUsd: number;
}

type OpenAIModel = 'gpt-4' | 'gpt-4-turbo' | 'gpt-4o' | 'gpt-3.5-turbo';

const MODEL_COSTS: Record<string, { input: number; output: number }> = {
  'gpt-4': { input: 0.03 / 1000, output: 0.06 / 1000 },
  'gpt-4-turbo': { input: 0.01 / 1000, output: 0.03 / 1000 },
  'gpt-4o': { input: 0.005 / 1000, output: 0.015 / 1000 },
  'gpt-3.5-turbo': { input: 0.0005 / 1000, output: 0.0015 / 1000 },
};

@Injectable()
export class LLMService {
  private readonly logger = new Logger(LLMService.name);
  private apiKey: string;
  private modelo: string;
  private baseUrl: string;
  private temperatura: number;
  private maxTokens: number;
  private costHistory: CostEntry[] = [];

  constructor(private configService: ConfigService) {
    this.apiKey = this.configService.get('OPENAI_API_KEY', '');
    this.baseUrl = this.configService.get('LLM_BASE_URL', 'https://api.openai.com/v1').replace(/\/$/, '');
    this.modelo = this.configService.get('LLM_MODEL', this.configService.get('IA_MODEL', 'gpt-4o')) as OpenAIModel;
    this.temperatura = parseFloat(this.configService.get('IA_TEMPERATURE', '0.3'));
    this.maxTokens = parseInt(this.configService.get('IA_MAX_TOKENS', '4096'), 10);
  }

  async gerarResposta(prompt: string, options?: {
    modelo?: OpenAIModel;
    temperatura?: number;
    maxTokens?: number;
    systemPrompt?: string;
    responseFormat?: 'text' | 'json';
  }): Promise<string> {
    const modelo = options?.modelo || this.modelo;
    const temperatura = options?.temperatura ?? this.temperatura;
    const maxTokens = options?.maxTokens || this.maxTokens;

    const messages = this.buildMessages(prompt, options?.systemPrompt, options?.responseFormat);

    const body: any = {
      model: modelo,
      messages,
      temperature: temperatura,
      max_tokens: maxTokens,
    };

    if (options?.responseFormat === 'json') {
      body.response_format = { type: 'json_object' };
    }

    const dados = await this.chamarOpenAIComRetry(body);

    this.registrarCusto(modelo, dados.usage);

    return dados.choices[0].message.content;
  }

  async *gerarRespostaStream(prompt: string, options?: {
    modelo?: OpenAIModel;
    temperatura?: number;
    maxTokens?: number;
    systemPrompt?: string;
  }): AsyncGenerator<{ token: string; done: boolean; usage?: TokenUsage }> {
    const modelo = options?.modelo || this.modelo;
    const temperatura = options?.temperatura ?? this.temperatura;
    const maxTokens = options?.maxTokens || this.maxTokens;

    const messages = this.buildMessages(prompt, options?.systemPrompt);

    const body = {
      model: modelo,
      messages,
      temperature: temperatura,
      max_tokens: maxTokens,
      stream: true,
      stream_options: { include_usage: true },
    };

    const resposta = await this.fetchStream(body);

    if (!resposta.ok) {
      const erro = await resposta.text();
      throw new Error(`Erro OpenAI stream: ${resposta.status} - ${erro}`);
    }

    const reader = resposta.body?.getReader();
    if (!reader) throw new Error('ReadableStream não disponível');

    const decoder = new TextDecoder();
    let buffer = '';
    let usage: TokenUsage | undefined;

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const linhas = buffer.split('\n');
        buffer = linhas.pop() || '';

        for (const linha of linhas) {
          const trimmed = linha.trim();
          if (!trimmed || !trimmed.startsWith('data: ')) continue;

          const data = trimmed.slice(6);
          if (data === '[DONE]') {
            yield { token: '', done: true, usage };
            return;
          }

          try {
            const parsed = JSON.parse(data);

            if (parsed.usage) {
              usage = {
                promptTokens: parsed.usage.prompt_tokens,
                completionTokens: parsed.usage.completion_tokens,
                totalTokens: parsed.usage.total_tokens,
              };
            }

            const delta = parsed.choices?.[0]?.delta;
            if (delta?.content) {
              yield { token: delta.content, done: false };
            }
          } catch {
            // skip malformed JSON lines
          }
        }
      }

      yield { token: '', done: true, usage };
    } finally {
      reader.releaseLock();
    }

    if (usage) {
      this.registrarCusto(modelo, {
        prompt_tokens: usage.promptTokens,
        completion_tokens: usage.completionTokens,
        total_tokens: usage.totalTokens,
      });
    }
  }

  async gerarEmbedding(texto: string): Promise<number[]> {
    if (!this.apiKey) throw new Error('OPENAI_API_KEY não configurada');

    const resposta = await fetch(`${this.baseUrl}/embeddings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: this.configService.get('EMBEDDING_MODEL', 'text-embedding-3-small'),
        input: texto.slice(0, 8191),
      }),
    });

    if (!resposta.ok) {
      const erro = await resposta.text();
      throw new Error(`Erro OpenAI embedding: ${resposta.status} - ${erro}`);
    }

    const dados = await resposta.json();
    return dados.data[0].embedding;
  }

  async gerarEmbeddingsLote(textos: string[]): Promise<number[][]> {
    if (!this.apiKey) throw new Error('OPENAI_API_KEY não configurada');

    const limpos = textos.map(t => t.slice(0, 8191));

    const resposta = await fetch(`${this.baseUrl}/embeddings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: this.configService.get('EMBEDDING_MODEL', 'text-embedding-3-small'),
        input: limpos,
      }),
    });

    if (!resposta.ok) {
      const erro = await resposta.text();
      throw new Error(`Erro OpenAI embeddings batch: ${resposta.status} - ${erro}`);
    }

    const dados = await resposta.json();
    return dados.data.sort((a: any, b: any) => a.index - b.index).map((d: any) => d.embedding);
  }

  obterEstatisticasCusto(): {
    totalUsd: number;
    porModelo: Record<string, number>;
    chamadas: number;
  } {
    let totalUsd = 0;
    const porModelo: Record<string, number> = {};

    for (const entry of this.costHistory) {
      totalUsd += entry.costUsd;
      porModelo[entry.model] = (porModelo[entry.model] || 0) + entry.costUsd;
    }

    return {
      totalUsd: Math.round(totalUsd * 10000) / 10000,
      porModelo,
      chamadas: this.costHistory.length,
    };
  }

  private buildMessages(prompt: string, systemPrompt?: string, responseFormat?: string): any[] {
    const defaultSystem = responseFormat === 'json'
      ? 'Você é um especialista em estudos bíblicos acadêmicos. Responda em português brasileiro. Formate sua resposta como JSON válido.'
      : 'Você é um especialista em estudos bíblicos acadêmicos. Responda em português brasileiro com rigor acadêmico e clareza.';

    return [
      { role: 'system', content: systemPrompt || defaultSystem },
      { role: 'user', content: prompt },
    ];
  }

  private async chamarOpenAIComRetry(body: any, maxRetries = 3): Promise<any> {
    let ultimoErro: Error | null = null;

    for (let tentativa = 0; tentativa < maxRetries; tentativa++) {
      try {
        const resposta = await fetch(`${this.baseUrl}/chat/completions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apiKey}`,
          },
          body: JSON.stringify(body),
        });

        if (resposta.status === 429) {
          const delay = Math.pow(2, tentativa) * 1000 + Math.random() * 1000;
          this.logger.warn(`Rate limited, aguardando ${delay}ms (tentativa ${tentativa + 1}/${maxRetries})`);
          await new Promise(resolve => setTimeout(resolve, delay));
          continue;
        }

        if (resposta.status >= 500) {
          const delay = Math.pow(2, tentativa) * 1000;
          this.logger.warn(`Erro servidor ${resposta.status}, retry em ${delay}ms`);
          await new Promise(resolve => setTimeout(resolve, delay));
          continue;
        }

        if (!resposta.ok) {
          const erro = await resposta.text();
          throw new Error(`Erro OpenAI: ${resposta.status} - ${erro}`);
        }

        return await resposta.json();
      } catch (erro) {
        ultimoErro = erro instanceof Error ? erro : new Error(String(erro));

        if (tentativa < maxRetries - 1) {
          const delay = Math.pow(2, tentativa) * 1000;
          this.logger.warn(`Retry ${tentativa + 1}/${maxRetries} em ${delay}ms: ${ultimoErro.message}`);
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }

    throw ultimoErro || new Error('Falha após múltiplas tentativas');
  }

  private async fetchStream(body: any): Promise<Response> {
    const maxRetries = 2;

    for (let tentativa = 0; tentativa <= maxRetries; tentativa++) {
      try {
        const resposta = await fetch(`${this.baseUrl}/chat/completions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apiKey}`,
          },
          body: JSON.stringify(body),
        });

        if (resposta.status === 429 && tentativa < maxRetries) {
          const delay = Math.pow(2, tentativa) * 1000;
          this.logger.warn(`Rate limited stream, retry em ${delay}ms`);
          await new Promise(resolve => setTimeout(resolve, delay));
          continue;
        }

        return resposta;
      } catch (erro) {
        if (tentativa < maxRetries) {
          const delay = Math.pow(2, tentativa) * 1000;
          await new Promise(resolve => setTimeout(resolve, delay));
          continue;
        }
        throw erro;
      }
    }

    throw new Error('Falha ao conectar com OpenAI stream');
  }

  private registrarCusto(modelo: string, usage: any): void {
    if (!usage) return;

    const costs = MODEL_COSTS[modelo] || MODEL_COSTS['gpt-4o'];
    const costUsd = (usage.prompt_tokens || 0) * costs.input +
                    (usage.completion_tokens || 0) * costs.output;

    this.costHistory.push({
      timestamp: new Date(),
      model: modelo,
      usage: {
        promptTokens: usage.prompt_tokens || 0,
        completionTokens: usage.completion_tokens || 0,
        totalTokens: usage.total_tokens || 0,
      },
      costUsd,
    });

    if (this.costHistory.length > 1000) {
      this.costHistory = this.costHistory.slice(-500);
    }

    this.logger.debug(
      `Custo ${modelo}: $${costUsd.toFixed(6)} ` +
      `(${usage.prompt_tokens || 0} in + ${usage.completion_tokens || 0} out = ${usage.total_tokens || 0} total)`,
    );
  }
}
