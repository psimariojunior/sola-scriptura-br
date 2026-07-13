import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 'https://api-production-bb96.up.railway.app/api/v1';
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || '';

export async function POST(request: NextRequest) {
  let body: any;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ erro: 'JSON inválido' }, { status: 400 });
  }

  const { consulta, tradicao, contexto } = body;

  if (!consulta?.trim()) {
    return NextResponse.json({ erro: 'Pergunta é obrigatória' }, { status: 400 });
  }

  if (OPENAI_API_KEY) {
    try {
      return await chamarOpenAIDireto(consulta, tradicao, contexto);
    } catch (erro: any) {
      console.error('OpenAI direto falhou, tentando backend:', erro.message);
    }
  }

  try {
    return await chamarBackend(consulta, tradicao);
  } catch (erro: any) {
    console.error('Backend falhou:', erro.message);
    return NextResponse.json(
      {
        erro: 'Serviço de IA temporariamente indisponível',
        detalhes: erro.message,
        sugestao: 'Configure OPENAI_API_KEY ou inicie o backend NestJS',
      },
      { status: 503 },
    );
  }
}

async function chamarOpenAIDireto(
  consulta: string,
  tradicao?: string,
  contexto?: string,
): Promise<NextResponse> {
  const inicio = Date.now();

  const systemPrompt = [
    'Você é um professor de teologia e exegese bíblica com décadas de experiência.',
    'Responda em português brasileiro com rigor acadêmico e clareza.',
    '',
    'Diretrizes:',
    '- Cite sempre passagens bíblicas relevantes',
    '- Considere o contexto histórico e cultural',
    '- Seja preciso teologicamente',
    '- Use markdown para estruturar a resposta',
    '- Sempre aponte para estudo adicional nas Escrituras',
    tradicao ? `- Considere a perspectiva teológica ${tradicao}` : '',
  ].join('\n');

  const userMessage = contexto
    ? `Contexto adicional:\n${contexto}\n\nPergunta: ${consulta}`
    : consulta;

  const resposta = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage },
      ],
      temperature: 0.3,
      max_tokens: 4096,
    }),
    signal: AbortSignal.timeout(60000),
  });

  if (!resposta.ok) {
    const erro = await resposta.text();
    throw new Error(`OpenAI ${resposta.status}: ${erro}`);
  }

  const dados = await resposta.json();
  const textoResposta = dados.choices[0].message.content;

  return NextResponse.json({
    pergunta: consulta,
    resposta: textoResposta,
    fontes: [],
    tradicaoTeologica: tradicao || 'geral',
    metadados: {
      modelo: 'gpt-4o',
      tokens: dados.usage?.total_tokens,
      tempoMs: Date.now() - inicio,
    },
  });
}

async function chamarBackend(
  consulta: string,
  tradicao?: string,
): Promise<NextResponse> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 60000);

  try {
    const resposta = await fetch(`${BACKEND_URL}/ia/perguntar`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ consulta, tradicao }),
      signal: controller.signal,
    });

    if (!resposta.ok) {
      const erro = await resposta.text();
      throw new Error(`Backend ${resposta.status}: ${erro}`);
    }

    const dados = await resposta.json();
    return NextResponse.json(dados);
  } finally {
    clearTimeout(timeout);
  }
}
