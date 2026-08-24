import { NextRequest, NextResponse } from 'next/server';
import { chatWithAI } from '@/lib/ai-provider';
import { construirContextoRAG } from '@/lib/ragGrounding';
import { AI_CONFIG } from '@/lib/ai-config';
import { applyRateLimit, withRateLimitHeaders } from '@/lib/api-rate-limit';
import { getClientIP, rateLimit, RATE_LIMITS, buildRateLimitHeaders } from '@/lib/rate-limit';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  const blocked = await applyRateLimit(request, 'IA_CHAT');
  if (blocked) return blocked;

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ erro: 'JSON invalido' }, { status: 400 });
  }

  const consulta = typeof body.consulta === 'string' ? body.consulta : '';
  const tradicao = typeof body.tradicao === 'string' ? body.tradicao : undefined;
  const contexto = typeof body.contexto === 'string' ? body.contexto : undefined;
  const userId = typeof body.userId === 'string' ? body.userId : undefined;

  if (!consulta?.trim()) {
    return NextResponse.json({ erro: 'Pergunta e obrigatoria' }, { status: 400 });
  }

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
      userId,
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
      resposta: `## Assistente Biblico\n\nSua pergunta: **${consulta}**\n\nNo momento, os provedores de IA estao indisponiveis. Por favor, tente novamente em alguns instantes.\n\nEnquanto isso, acesse:\n- [Teologia](/teologia) — doutrinas sistematicas\n- [Pesquisa](/pesquisa) — busca avancada\n- [Exegese](/exegese) — analise versiculo a versiculo`,
      fontes: [],
      fonte: 'fallback',
      tradicaoTeologica: tradicao || 'geral',
      metadados: { tempoMs: Date.now() - inicio },
    });
  }
}
