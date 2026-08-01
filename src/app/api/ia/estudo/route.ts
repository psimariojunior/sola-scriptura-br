import { NextRequest, NextResponse } from 'next/server';
import { generateStudy } from '@/lib/ai-provider';
import { construirContextoRAG } from '@/lib/ragGrounding';
import { applyRateLimit } from '@/lib/api-rate-limit';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  const blocked = await applyRateLimit(request, 'IA_ESTUDO');
  if (blocked) return blocked;

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ erro: 'JSON invalido' }, { status: 400 });
  }

  const passagem = typeof body.passagem === 'string' ? body.passagem : '';
  const tipo = typeof body.tipo === 'string' ? body.tipo : undefined;
  const userId = typeof body.userId === 'string' ? body.userId : undefined;

  if (!passagem?.trim()) {
    return NextResponse.json({ erro: 'Passagem ou topico e obrigatorio' }, { status: 400 });
  }

  const inicio = Date.now();

  try {
    // Build RAG context for grounding
    const referenciaRAG = await construirContextoRAG(passagem);

    const resultado = await generateStudy({
      passage: passagem,
      type: tipo,
      userId,
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
      { erro: 'Falha ao gerar estudo. Tente novamente.', detalhes: mensagem },
      { status: 500 }
    );
  }
}
