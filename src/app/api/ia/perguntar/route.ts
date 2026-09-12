import { NextRequest, NextResponse } from 'next/server';
import { chatWithAI } from '@/lib/ai-provider';
import { construirContextoRAG } from '@/lib/ragGrounding';
import { applyRateLimit } from '@/lib/api-rate-limit';
import { PerguntaSchema, validateBody } from '@/lib/api-schemas';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  const blocked = await applyRateLimit(request, 'IA_CHAT');
  if (blocked) return blocked;

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json({ erro: 'JSON invalido' }, { status: 400 });
  }

  const parsed = validateBody(PerguntaSchema, rawBody);
  if (!parsed.success) return parsed.error;

  const { consulta, tradicao, contexto } = parsed.data;

  const inicio = Date.now();

  try {
    // Build RAG context for grounding
    const rag = await construirContextoRAG(consulta);
    const contextoRAG = rag?.temContexto
      ? `${contexto ? contexto + '\n\n' : ''}Materiais de estudo (use como base primaria e cite as fontes):\n${rag.blocos.join('\n\n')}`
      : contexto;

    const resultado = await chatWithAI({
      question: consulta,
      context: contextoRAG,
      tradicao,
    });

    return NextResponse.json({
      pergunta: consulta,
      resposta: resultado.content,
      fontes: rag?.fontes && rag.fontes.length > 0
        ? rag.fontes.map((f) => ({ referencia: f, tipo: 'comentario' }))
        : [],
      fundamentado: !!(rag?.fontes && rag.fontes.length > 0),
      tradicaoTeologica: tradicao || 'geral',
      fonte: resultado.provider,
      metadados: {
        modelo: resultado.model,
        tokens: resultado.tokens?.total,
        tempoMs: Date.now() - inicio,
        cached: resultado.cached,
      },
    });
  } catch (erro: unknown) {
    const mensagem = erro instanceof Error ? erro.message : String(erro);
    console.error('AI provider falhou:', mensagem);

    return NextResponse.json({
      pergunta: consulta,
      resposta: `## Assistente Bíblico\n\nSua pergunta: **${consulta}**\n\nNo momento, os provedores de IA estão indisponíveis. Por favor, tente novamente em alguns instantes.\n\nEnquanto isso, acesse:\n- [Teologia](/teologia) — doutrinas sistemáticas\n- [Pesquisa](/pesquisa) — busca avançada\n- [Exegese](/exegese) — análise versículo a versículo`,
      fontes: [],
      fonte: 'fallback',
      indisponivel: true,
      tradicaoTeologica: tradicao || 'geral',
      metadados: { tempoMs: Date.now() - inicio },
    }, { status: 503 });
  }
}
