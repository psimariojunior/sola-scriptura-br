import { NextRequest, NextResponse } from 'next/server';

// API para sincronizar dados do usuário com o backend
// Em produção, isso se conectaria ao PostgreSQL via NestJS
// Por enquanto, usa o localStorage como fallback

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { tipo, dados, userId } = body;

    // Validação básica
    if (!tipo || !dados || !userId) {
      return NextResponse.json({ erro: 'Campos obrigatórios: tipo, dados, userId' }, { status: 400 });
    }

    // Tipos suportados: favoritos, notas, colecoes, flashcards, progresso
    const tiposValidos = ['favoritos', 'notas', 'colecoes', 'flashcards', 'progresso'];
    if (!tiposValidos.includes(tipo)) {
      return NextResponse.json({ erro: `Tipo inválido. Use: ${tiposValidos.join(', ')}` }, { status: 400 });
    }

    // Em produção, salvaria no PostgreSQL
    // Por enquanto, retorna sucesso (dados ficam no localStorage do cliente)
    return NextResponse.json({
      ok: true,
      mensagem: `${tipo} sincronizado com sucesso`,
      timestamp: Date.now(),
    });
  } catch (error) {
    return NextResponse.json({ erro: 'Erro interno' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const tipo = searchParams.get('tipo');
  const userId = searchParams.get('userId');

  if (!tipo || !userId) {
    return NextResponse.json({ erro: 'Campos obrigatórios: tipo, userId' }, { status: 400 });
  }

  // Em produção, buscaria do PostgreSQL
  // Por enquanto, retorna vazio (cliente usa localStorage)
  return NextResponse.json({
    ok: true,
    dados: [],
    timestamp: Date.now(),
  });
}
