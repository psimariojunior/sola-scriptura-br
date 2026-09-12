import { NextRequest, NextResponse } from 'next/server';
import { generateStudy } from '@/lib/ai-provider';
import { construirContextoRAG } from '@/lib/ragGrounding';
import { applyRateLimit } from '@/lib/api-rate-limit';
import { EstudoSchema, validateBody } from '@/lib/api-schemas';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  const blocked = await applyRateLimit(request, 'IA_ESTUDO');
  if (blocked) return blocked;

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json({ erro: 'JSON invalido' }, { status: 400 });
  }

  const parsed = validateBody(EstudoSchema, rawBody);
  if (!parsed.success) return parsed.error;

  const { passagem, tipo } = parsed.data;

  const inicio = Date.now();

  try {
    // Build RAG context for grounding
    const referenciaRAG = await construirContextoRAG(passagem);

    const resultado = await generateStudy({
      passage: passagem,
      type: tipo,
    });

    return NextResponse.json({
      passagem,
      estudo: resultado.content,
      tipo: tipo || 'completo',
      fundamentado: referenciaRAG ? referenciaRAG.temContexto : false,
      fontes: referenciaRAG?.fontes ?? [],
      metadados: {
        modelo: resultado.model,
        tokens: resultado.tokens?.total,
        tempoMs: Date.now() - inicio,
        cached: resultado.cached,
        provider: resultado.provider,
        referencia: referenciaRAG?.referencia ?? null,
      },
    });
  } catch (erro: unknown) {
    const mensagem = erro instanceof Error ? erro.message : String(erro);
    console.error('Erro ao gerar estudo:', mensagem);
    return NextResponse.json(
      { erro: 'Falha ao gerar estudo. Tente novamente.' },
      { status: 500 }
    );
  }
}
