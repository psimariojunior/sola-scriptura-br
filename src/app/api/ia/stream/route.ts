import { NextRequest } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 'https://api-production-bb96.up.railway.app/api/v1';
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || process.env.OPENROUTER_API_KEY || '';
const LLM_BASE_URL = process.env.LLM_BASE_URL || 'https://openrouter.ai/api/v1';
const LLM_MODEL = process.env.LLM_MODEL || 'openai/gpt-4o';

export async function POST(request: NextRequest) {
  let body: any;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ erro: 'JSON inválido' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { pergunta, tradicao, contexto } = body;

  if (!pergunta?.trim()) {
    return new Response(JSON.stringify({ erro: 'Pergunta é obrigatória' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const send = (tipo: string, dados: any) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ tipo, dados })}\n\n`));
      };

      try {
        if (OPENAI_API_KEY) {
          await streamDirectOpenAI(pergunta, tradicao, contexto, send, controller, encoder);
        } else {
          await streamViaBackend(pergunta, tradicao, send, controller, encoder);
        }
      } catch (erro: any) {
        send('erro', { message: erro.message || 'Erro ao processar pergunta' });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
      'X-Accel-Buffering': 'no',
    },
  });
}

async function streamDirectOpenAI(
  pergunta: string,
  tradicao: string | undefined,
  contexto: string | undefined,
  send: (tipo: string, dados: any) => void,
  controller: ReadableStreamDefaultController,
  encoder: TextEncoder,
) {
  send('status', { message: 'Gerando resposta...', etapa: 'llm' });

  const systemPrompt = buildSystemPrompt(tradicao);
  const userMessage = contexto
    ? `Contexto adicional: ${contexto}\n\nPergunta: ${pergunta}`
    : pergunta;

  const resposta = await fetch(`${LLM_BASE_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: LLM_MODEL,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage },
      ],
      temperature: 0.3,
      max_tokens: 4096,
      stream: true,
      stream_options: { include_usage: true },
    }),
  });

  if (!resposta.ok) {
    const erro = await resposta.text();
    throw new Error(`Erro OpenAI: ${resposta.status} - ${erro}`);
  }

  const reader = resposta.body?.getReader();
  if (!reader) throw new Error('ReadableStream não disponível');

  const decoder = new TextDecoder();
  let buffer = '';

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
          send('completo', { pergunta });
          return;
        }

        try {
          const parsed = JSON.parse(data);
          const delta = parsed.choices?.[0]?.delta;
          if (delta?.content) {
            send('token', { token: delta.content });
          }
        } catch {
          // skip malformed JSON
        }
      }
    }

    send('completo', { pergunta });
  } finally {
    reader.releaseLock();
  }
}

async function streamViaBackend(
  pergunta: string,
  tradicao: string | undefined,
  send: (tipo: string, dados: any) => void,
  controller: ReadableStreamDefaultController,
  encoder: TextEncoder,
) {
  send('status', { message: 'Conectando ao backend...', etapa: 'backend' });

  try {
    const resposta = await fetch(`${BACKEND_URL}/ia/perguntar-stream`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pergunta, tradicao }),
      signal: AbortSignal.timeout(60000),
    });

    if (!resposta.ok) {
      throw new Error(`Backend retornou ${resposta.status}`);
    }

    const reader = resposta.body?.getReader();
    if (!reader) throw new Error('Resposta sem body');

    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const linhas = buffer.split('\n');
      buffer = linhas.pop() || '';

      for (const linha of linhas) {
        const trimmed = linha.trim();
        if (!trimmed || !trimmed.startsWith('data:')) continue;

        const data = trimmed.slice(5).trim();
        if (!data || data === '[DONE]') continue;

        try {
          const parsed = JSON.parse(data);
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(parsed)}\n\n`));
        } catch {
          // skip
        }
      }
    }

    controller.enqueue(encoder.encode(`data: ${JSON.stringify({ tipo: 'completo', dados: { pergunta } })}\n\n`));
  } catch (erro: any) {
    send('erro', { message: `Backend indisponível: ${erro.message}` });
  }
}

function buildSystemPrompt(tradicao?: string): string {
  const partes = [
    'Você é um professor de teologia e exegese bíblica com décadas de experiência.',
    'Responda em português brasileiro com rigor acadêmico e clareza.',
    '',
    'Diretrizes:',
    '- Cite sempre passagens bíblicas relevantes',
    '- Considere o contexto histórico e cultural',
    '- Seja preciso teologicamente',
    '- Use markdown para estruturar a resposta',
    '- Sempre aponte para estudo adicional nas Escrituras',
  ];

  if (tradicao) {
    partes.push(`- Considere especialmente a perspectiva teológica ${tradicao}`);
  }

  return partes.join('\n');
}
