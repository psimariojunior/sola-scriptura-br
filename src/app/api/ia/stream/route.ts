import { NextRequest } from 'next/server';
import { streamWithAI } from '@/lib/ai-provider';
import { AI_CONFIG } from '@/lib/ai-config';
import { applyRateLimit } from '@/lib/api-rate-limit';
import { PerguntaStreamSchema, validateBody } from '@/lib/api-schemas';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  const blocked = await applyRateLimit(request, 'IA_STREAM');
  if (blocked) return blocked;

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return new Response(JSON.stringify({ erro: 'JSON invalido' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const parsed = validateBody(PerguntaStreamSchema, rawBody);
  if (!parsed.success) {
    return new Response(JSON.stringify(parsed.error), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { pergunta, tradicao, contexto } = parsed.data;

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const send = (tipo: string, dados: Record<string, unknown>) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ tipo, dados })}\n\n`));
      };

      try {
        send('status', { message: 'Gerando resposta...', etapa: 'ai' });

        for await (const chunk of streamWithAI({
          question: pergunta,
          context: contexto,
          tradicao,
        })) {
          if (chunk.done) {
            send('completo', { pergunta, provider: chunk.provider });
          } else if (chunk.token) {
            send('token', { token: chunk.token, provider: chunk.provider });
          }
        }
      } catch (erro: unknown) {
        const mensagem = erro instanceof Error ? erro.message : String(erro);
        send('erro', { message: mensagem || 'Erro ao processar pergunta' });
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
