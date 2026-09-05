import { NextRequest } from 'next/server';
import { getLLMConfig } from '@/lib/llm-config';
import { applyRateLimit } from '@/lib/api-rate-limit';
import { rateLimit, RATE_LIMITS, getClientIP, buildRateLimitHeaders } from '@/lib/rate-limit';

export const runtime = 'nodejs';

const SYSTEM_PROMPT = `Você é um professor de Teologia e Exegese Bíblica. Responda em portugues brasileiro.

Quando o usuário fizer uma pergunta sobre a Bíblia, você deve:

1. Buscar versículos relevantes na Bíblia (use sua base de conhecimento)
2. Retornar um JSON com a seguinte estrutura:
{
  "explicacao": "Sua explicação teológica em markdown (2-3 parágrafos)",
  "versiculos": [
    {
      "referencia": "Ex: Rm 5:8",
      "livro": "rm",
      "capitulo": 5,
      "versiculo": 8,
      "texto": "Porque Deus prova o seu amor para conosco...",
      "relevancia": "alta"
    }
  ]
}

Regras:
- SEMPRE retorne JSON válido
- Inclua de 3 a 8 versículos relevantes
- Cada versículo deve ter livro (abreviação minúscula), capítulo e versículo numéricos
- Use abreviações padrão: gn, ex, lv, nm, dt, js, jz, rt, 1sm, 2sm, 1rs, 2rs, 1cr, 2cr, ezr, ne, est, j6, js, jz, rt, 1sm, 2sm, 1rs, 2rs, 1cr, 2cr, ezr, ne, est, j6, js, jz, sl, pv, ec, cna, is, jr, lm, ez, dn, os, jo, am, ob, jn, mq, na, hab, sf, hc, ag, zc, ml, mt, mc, lc, jo, at, rm, 1co, 2co, gl, ef, fp, cl, 1ts, 2ts, 1tm, 2tm, tt, flm, hb, tg, 1pe, 2pe, 1jo, 2jo, 3jo, jd, ap
- O campo "texto" deve conter o versículo completo
- A explicação deve ser teológica e acadêmica
- SEMPRE responda APENAS com o JSON, sem texto adicional antes ou depois`;

export async function POST(request: NextRequest) {
  const blocked = await applyRateLimit(request, 'IA_CHAT');
  if (blocked) return blocked;

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ erro: 'JSON inválido' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const query = typeof body.query === 'string' ? body.query : '';
  if (!query?.trim()) {
    return new Response(JSON.stringify({ erro: 'Query é obrigatória' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const config = getLLMConfig();
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const send = (tipo: string, dados: Record<string, unknown>) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ tipo, dados })}\n\n`));
      };

      try {
        send('status', { message: 'Analisando sua pergunta...' });

        const response = await fetch(`${config.baseUrl}/chat/completions`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${config.apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: config.model,
            messages: [
              { role: 'system', content: SYSTEM_PROMPT },
              { role: 'user', content: query },
            ],
            temperature: 0.3,
            max_tokens: 2000,
            stream: true,
          }),
        });

        if (!response.ok) {
          throw new Error(`Groq API error: ${response.status}`);
        }

        const reader = response.body?.getReader();
        if (!reader) throw new Error('No response body');

        const decoder = new TextDecoder();
        let buffer = '';
        let fullResponse = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6).trim();
              if (data === '[DONE]') continue;
              try {
                const json = JSON.parse(data);
                const token = json.choices?.[0]?.delta?.content;
                if (token) {
                  fullResponse += token;
                  send('token', { token });
                }
              } catch { /* skip invalid JSON */ }
            }
          }
        }

        // Parse the full response as JSON
        try {
          // Try to extract JSON from the response (might be wrapped in markdown code block)
          const jsonMatch = fullResponse.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            const parsed = JSON.parse(jsonMatch[0]);
            send('versiculos', { versiculos: parsed.versiculos || [] });
            send('completo', { explicacao: parsed.explicacao || fullResponse });
          } else {
            send('completo', { explicacao: fullResponse, versiculos: [] });
          }
        } catch {
          send('completo', { explicacao: fullResponse, versiculos: [] });
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
