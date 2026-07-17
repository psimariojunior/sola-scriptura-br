import { NextRequest, NextResponse } from 'next/server';
import { getLLMConfig } from '@/lib/llm-config';

export const runtime = 'nodejs';

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

  const { apiKey, baseUrl, model } = getLLMConfig();

  if (apiKey) {
    try {
      return await chamarLLM(consulta, tradicao, contexto, apiKey, baseUrl, model);
    } catch (erro: any) {
      if (erro.message === 'credits_missing') {
        return NextResponse.json(gerarRespostaLocal(consulta, tradicao));
      }
      console.error('LLM falhou, usando resposta local:', erro.message, erro.cause);
    }
  }

  return NextResponse.json(gerarRespostaLocal(consulta, tradicao));
}

async function chamarLLM(
  consulta: string,
  tradicao: string | undefined,
  contexto: string | undefined,
  apiKey: string,
  baseUrl: string,
  model: string,
): Promise<NextResponse> {
  const inicio = Date.now();

  const systemPrompt = [
    'Você é um professor doutor em Teologia e Exegese Bíblica com décadas de experiência.',
    'Responda em português brasileiro com rigor acadêmico, mas acessível.',
    '',
    'Diretrizes:',
    '- Cite sempre passagens bíblicas (livro, capítulo, versículo)',
    '- Considere contexto histórico, cultural e literário',
    '- Apresente múltiplas perspectivas teológicas quando relevante',
    '- Use markdown para estruturar a resposta',
    '- Conecte o texto com a vida prática',
    '- Mencione o original (hebraico/grego) quando apropriado',
    tradicao ? `Perspectiva teológica: ${tradicao}` : '',
  ].join('\n');

  const userMessage = contexto
    ? `Contexto adicional:\n${contexto}\n\nPergunta: ${consulta}`
    : consulta;

  const resposta = await fetch(`${baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
      'HTTP-Referer': 'https://solascripturabr.com.br',
      'X-Title': 'Sola Scriptura BR',
    },
    body: JSON.stringify({
      model,
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
    if (resposta.status === 402 || erro.includes('insufficient')) {
      throw new Error('credits_missing');
    }
    throw new Error(`LLM ${resposta.status}: ${erro}`);
  }

  const dados = await resposta.json();
  return NextResponse.json({
    pergunta: consulta,
    resposta: dados.choices[0].message.content,
    fontes: [],
    tradicaoTeologica: tradicao || 'geral',
    fonte: 'llm',
    metadados: { modelo: model, tokens: dados.usage?.total_tokens, tempoMs: Date.now() - inicio },
  });
}

function gerarRespostaLocal(pergunta: string, tradicao?: string) {
  const q = pergunta.toLowerCase();

  const topicos: Record<string, { titulo: string; resposta: string; versiculos: string[] }> = {
    criacao: {
      titulo: 'Criação', resposta: 'A Bíblia ensina que Deus criou os céus e a terra por meio de Sua palavra (Gn 1:1). A criação é apresentada em seis dias, com o descanso no sétimo dia. O Gênesis establishce Deus como Criador soberano de todas as coisas.', versiculos: ['Gn 1:1', 'Gn 1:26-27', 'Sl 19:1', 'Jn 1:1-3', 'Cl 1:16', 'Hb 11:3'],
    },
    graça: {
      titulo: 'Graça', resposta: 'A graça de Deus é o favor imerecido que Ele concede aos pecadores. É o fundamento da salvação cristã. Paulo ensina que somos justificados pela graça, mediante a fé, e não pelas obras da lei (Ef 2:8-9). A graça se manifesta plenamente na obra de Jesus Cristo na cruz.', versiculos: ['Ef 2:8-9', 'Rm 3:24', 'Rm 5:8', 'Tt 2:11-12', '2 Co 12:9', '1 Pd 5:12'],
    },
    fé: {
      titulo: 'Fé', resposta: 'A fé bíblica é a confiança firme naquilo que se espera e a convicção do que não se vê (Hb 11:1). Abraão é o exemplo clássico de fé. A fé é dom de Deus (Ef 2:8) e cresce pelo estudo da Palavra (Rm 10:17).', versiculos: ['Hb 11:1', 'Hb 11:6', 'Rm 10:17', '2 Co 5:7', 'Gl 2:20', 'Ef 2:8'],
    },
    salvação: {
      titulo: 'Salvação', resposta: 'A salvação é o livramento do pecado obtido pela obra de Jesus Cristo. Todos pecaram (Rm 3:23). Deus enviou Seu Filho para morrer em nosso lugar (Jo 3:16). Somos salvos pela graça, mediante a fé, não pelas obras (Ef 2:8-9).', versiculos: ['Rm 3:23', 'Rm 6:23', 'Jo 3:16', 'Ef 2:8-9', 'Tt 3:5', 'At 4:12'],
    },
    jesus: {
      titulo: 'Jesus Cristo', resposta: 'Jesus Cristo é o Filho de Deus, o Verbo encarnado (Jo 1:1-14). Nasceu de virgem Maria, viveu sem pecado, morreu na cruz pelos nossos pecados, ressuscitou ao terceiro dia, e ascendeu ao céu. Ele é o único mediador entre Deus e os homens (1 Tm 2:5).', versiculos: ['Jo 1:1-14', 'Jo 14:6', 'Mt 1:23', '1 Tm 2:5', 'Fp 2:5-11', 'Hb 1:3'],
    },
    espírito: {
      titulo: 'Espírito Santo', resposta: 'O Espírito Santo é a terceira Pessoa da Trindade. Ele guia, ensina e capacita os crentes (Jo 14:16-17). Produz os frutos do Espírito (Gl 5:22-23) e distribui dons espirituais para edificação da igreja.', versiculos: ['Jo 14:16-17', 'Gl 5:22-23', 'At 2:38', '1 Co 12:4-11', 'Rm 8:9-11', 'Ef 4:30'],
    },
    igreja: {
      titulo: 'Igreja', resposta: 'A igreja é o corpo de Cristo na terra (Ef 1:22-23). Jesus fundou a igreja e ela foi inaugurada no Pentecostes (At 2). A missão é evangelizar, baptizar, ensinar e fazer discípulos de todas as nações (Mt 28:19-20).', versiculos: ['Ef 1:22-23', 'Mt 28:19-20', 'At 2:42-47', 'Gl 3:28', '1 Co 12:12-27', 'Ef 4:11-16'],
    },
    oração: {
      titulo: 'Oração', resposta: 'A oração é a comunicação do crente com Deus. A Bíblia nos chama a orar sem cessar (1 Ts 5:17). Jesus ensinou o Pai Nosso como modelo (Mt 6:9-13). A oração deve ser feita com fé (Tg 1:6) e em nome de Jesus (Jo 14:13-14).', versiculos: ['1 Ts 5:17', 'Mt 6:9-13', 'Tg 1:6', '1 Jo 5:14', 'Jo 14:13-14', 'Fp 4:6-7'],
    },
    amor: {
      titulo: 'Amor', resposta: 'O amor é o mandamento central da Bíblia. "Amar a Deus de todo o coração e ao próximo como a si mesmo" (Mt 22:37-39). Deus é amor (1 Jo 4:8). O maior exemplo é Deus ter amado o mundo de tal maneira que deu o Seu Filho (Jo 3:16).', versiculos: ['Mt 22:37-39', '1 Jo 4:8', 'Jo 3:16', '1 Co 13:4-7', 'Rm 5:8', '1 Jo 4:19'],
    },
    pecado: {
      titulo: 'Pecado', resposta: 'O pecado é a transgressão da lei de Deus (1 Jo 3:4). Entrou no mundo pela desobediência de Adão e Eva (Gn 3). Todos são pecadores (Rm 3:23). O pecado separa o homem de Deus (Is 59:2). A solução é o sacrifício de Jesus Cristo.', versiculos: ['1 Jo 3:4', 'Rm 3:23', 'Rm 6:23', 'Is 59:2', 'Gn 3:1-24', 'Ef 2:1-3'],
    },
  };

  for (const [chave, dados] of Object.entries(topicos)) {
    if (q.includes(chave) || dados.titulo.toLowerCase().split(' ').some(p => q.includes(p))) {
      let resp = `## ${dados.titulo}\n\n${dados.resposta}\n\n**Versículos-chave:**\n`;
      dados.versiculos.forEach(v => { resp += `- ${v}\n`; });
      return { pergunta, resposta: resp, fontes: [], fonte: 'local', tradicaoTeologica: tradicao || 'geral' };
    }
  }

  return {
    pergunta,
    resposta: `## Assistente Bíblico Local\n\nSua pergunta: **${pergunta}**\n\nNo modo local, posso ajudar com temas como: Criação, Graça, Fé, Salvação, Pecado, Jesus Cristo, Espírito Santo, Igreja, Oração, Amor.\n\n**Tente perguntar sobre um desses temas específicos!**\n\n- [Teologia](/teologia) — doutrinas sistemáticas\n- [Dicionário](/idiomas/dicionario) — verbetes bíblicos\n- [Exegese](/exegese) — análise versículo a versículo\n- [Pesquisa](/pesquisa) — busca avançada`,
    fontes: [],
    fonte: 'local',
    tradicaoTeologica: tradicao || 'geral',
  };
}
