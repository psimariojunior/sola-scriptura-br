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
          await streamDirectLLM(pergunta, tradicao, contexto, send, controller, encoder);
        } else {
          await streamLocal(pergunta, tradicao, send, controller, encoder);
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

async function streamDirectLLM(
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

  let resposta: Response;
  try {
    resposta = await fetch(`${LLM_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'HTTP-Referer': 'https://sola-scriptura-two.vercel.app',
        'X-Title': 'Sola Scriptura BR',
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
  } catch {
    throw new Error('LLM indisponível. Usando respostas locais...');
  }

  if (!resposta.ok) {
    const erro = await resposta.text();
    if (erro.includes('402') || erro.includes('insufficient')) {
      throw new Error('credits_missing');
    }
    throw new Error(`Erro LLM: ${resposta.status}`);
  }

  const reader = resposta.body?.getReader();
  if (!reader) throw new Error('ReadableStream não disponível');

  const decoder = new TextDecoder('utf-8');
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

async function streamLocal(
  pergunta: string,
  tradicao: string | undefined,
  send: (tipo: string, dados: any) => void,
  controller: ReadableStreamDefaultController,
  encoder: TextEncoder,
) {
  send('status', { message: 'Buscando na base local...', etapa: 'local' });

  const resposta = gerarRespostaLocal(pergunta, tradicao);
  const palavras = resposta.split(' ');

  for (let i = 0; i < palavras.length; i++) {
    const token = (i === 0 ? '' : ' ') + palavras[i];
    send('token', { token });
    await new Promise(r => setTimeout(r, 15));
  }

  send('completo', { pergunta });
}

function gerarRespostaLocal(pergunta: string, tradicao?: string): string {
  const q = pergunta.toLowerCase();

  const topicos: Record<string, { titulo: string; resposta: string; versiculos: string[] }> = {
    criacao: {
      titulo: 'Criação',
      resposta: 'A Bíblia ensina que Deus criou os céus e a terra por meio de Sua palavra (Gn 1:1). A criação é apresentada em seis dias, com o descanso no sétimo dia. O Gênesis establishce Deus como Criador soberano de todas as coisas. A teologia da criação é fundamental para entender a relação de Deus com o mundo e com a humanidade.',
      versiculos: ['Gn 1:1', 'Gn 1:26-27', 'Sl 19:1', 'Jn 1:1-3', 'Cl 1:16', 'Hb 11:3'],
    },
    graça: {
      titulo: 'Graça',
      resposta: 'A graça de Deus é o favor imerecido que Ele concede aos pecadores. É o fundamento da salvação cristã. Paulo ensina que somos justificados pela graça, mediante a fé, e não pelas obras da lei (Ef 2:8-9). A graça se manifesta plenamente na obra de Jesus Cristo na cruz, onde morreu pelos nossos pecados. A graça não é apenas perdão, mas também o poder transformador que nos capacita a viver para Deus.',
      versiculos: ['Ef 2:8-9', 'Rm 3:24', 'Rm 5:8', 'Tt 2:11-12', '2 Co 12:9', '1 Pd 5:12'],
    },
    fé: {
      titulo: 'Fé',
      resposta: 'A fé bíblica é a confiança firme naquilo que se espera e a convicção do que não se vê (Hb 11:1). Não é ceguece racional, mas confiança baseada na revelação de Deus. Abraão é o exemplo clássico de fé: creu na promessa de Deus e saiu sem saber aonde ia (Hb 11:8). A fé é dom de Deus (Ef 2:8) e cresce pelo estudo da Palavra (Rm 10:17). É pela fé que andamos, não pela vista (2 Co 5:7).',
      versiculos: ['Hb 11:1', 'Hb 11:6', 'Rm 10:17', '2 Co 5:7', 'Gl 2:20', 'Ef 2:8'],
    },
    salvação: {
      titulo: 'Salvação',
      resposta: 'A salvação é o livramento do pecado e de suas consequências, obtida pela obra de Jesus Cristo. A Bíblia ensina que todos pecaram e destituídos estão da glória de Deus (Rm 3:23). Deus, em Sua misericórdia, enviou Seu Filho unigênito para morrer em nosso lugar (Jo 3:16). Somos salvos pela graça, mediante a fé, não pelas obras (Ef 2:8-9). A salvação envolve justificação (perdão do pecado), regeneração (novo nascimento) e santificação (crescimento na semelhança de Cristo).',
      versiculos: ['Rm 3:23', 'Rm 6:23', 'Jo 3:16', 'Ef 2:8-9', 'Tt 3:5', 'At 4:12'],
    },
    pecado: {
      titulo: 'Pecado',
      resposta: 'O pecado é a transgressão da lei de Deus (1 Jo 3:4) e a rebelião contra Sua vontade. O pecado entrou no mundo através da desobediência de Adão e Eva no Éden (Gn 3). Todas as pessoas são pecadoras por natureza e por prática (Rm 3:23). O pecado separa o homem de Deus (Is 59:2) e traz consequências devastadoras: morte espiritual, corrupção e condenação eterna. A seule solução é o sacrifício expiatório de Jesus Cristo.',
      versiculos: ['1 Jo 3:4', 'Rm 3:23', 'Rm 6:23', 'Is 59:2', 'Gn 3:1-24', 'Ef 2:1-3'],
    },
    jesus: {
      titulo: 'Jesus Cristo',
      resposta: 'Jesus Cristo é o centro de toda a Bíblia. Ele é o Filho de Deus, o Verbo encarnado que se fez homem (Jo 1:14). Nasceu de virgem Maria (Mt 1:23), viveu vida sem pecado, realizou muitos milagres, ensinou o Reino de Deus, e morreu na cruz como sacrifício pelos nossos pecados. Ressuscitou ao terceiro dia, vencendo a morte, e ascendeu ao céu. Ele é o único mediador entre Deus e os homens (1 Tm 2:5) e voltará para julgar os vivos e os mortos.',
      versiculos: ['Jo 1:1-14', 'Jo 14:6', 'Mt 1:23', '1 Tm 2:5', 'Fp 2:5-11', 'Hb 1:3'],
    },
    espírito_santo: {
      titulo: 'Espírito Santo',
      resposta: 'O Espírito Santo é a terceira Pessoa da Trindade. Ele é Deus, pessoal e distinto do Pai e do Filho. Jesus prometeu o Espírito Santo como Consolador (Paráclito) que guia, ensina e capacita os crentes (Jo 14:16-17). Na conversão, o Espírito Santo regenera o coração, e na vida cristã, Ele produz os frutos do Espírito (Gl 5:22-23) e distribui dons espirituais para edificação da igreja.',
      versiculos: ['Jo 14:16-17', 'Gl 5:22-23', 'At 2:38', '1 Co 12:4-11', 'Rm 8:9-11', 'Ef 4:30'],
    },
    igreja: {
      titulo: 'Igreja',
      resposta: 'A igreja é o corpo de Cristo na terra (Ef 1:22-23). Ela foi fundada por Jesus e inaugurada no dia de Pentecostes (At 2). A igreja tem a missão de evangelizar, baptizar, ensinar e fazer discípulos de todas as nações (Mt 28:19-20). Ela é composta de todos os que creem em Jesus Cristo, formando um corpo unitário em Cristo, independente de raça, classe ou nacionalidade (Gl 3:28).',
      versiculos: ['Ef 1:22-23', 'Mt 28:19-20', 'At 2:42-47', 'Gl 3:28', '1 Co 12:12-27', 'Ef 4:11-16'],
    },
    aliança: {
      titulo: 'Aliança',
      resposta: 'O conceito de aliança é central na Bíblia. Uma aliança é um acordo solene entre Deus e o homem. A Bíblia apresenta várias alianças: com Adão, Noé, Abraão, Moisés (AT) e a Nova Aliança em Cristo (Mt 26:28). A Nova Aliança é superior à antiga, escrita não em tábuas de pedra, mas no coração dos crentes (Jr 31:31-34). Cristo é o mediador desta nova aliança (Hb 9:15).',
      versiculos: ['Gn 15:18', 'Jr 31:31-34', 'Mt 26:28', 'Hb 9:15', 'Hb 8:6-13', '2 Co 3:6'],
    },
    escatologia: {
      titulo: 'Escatologia',
      resposta: 'A escatologia é o estudo das últimas coisas. A Bíblia ensina que Jesus Cristo voltará (At 1:11), haverá ressurreição dos mortos (Jo 5:28-29), julgamento final (Mt 25:31-46), e a consumação de todas as coisas quando Deus será tudo em todos (1 Co 15:28). A Escritura descreva um novo céu e uma nova terra onde habita a justiça (2 Pd 3:13). O crente tem a esperança da eternidade com Deus.',
      versiculos: ['At 1:11', 'Jo 5:28-29', 'Mt 25:31-46', '1 Co 15:51-52', '2 Pd 3:13', 'Ap 21:1-4'],
    },
    oração: {
      titulo: 'Oração',
      resposta: 'A oração é a comunicação do crente com Deus. A Bíblia nos chama a orar sem cessar (1 Ts 5:17). Jesus ensinou o Pai Nosso como modelo de oração (Mt 6:9-13). A oração deve ser feita com fé (Tg 1:6), de acordo com a vontade de Deus (1 Jo 5:14), e em nome de Jesus (Jo 14:13-14). A oração é meio de que o crente se comunica com Deus, pede socorro, agradece e adora.',
      versiculos: ['1 Ts 5:17', 'Mt 6:9-13', 'Tg 1:6', '1 Jo 5:14', 'Jo 14:13-14', 'Fp 4:6-7'],
    },
    amor: {
      titulo: 'Amor',
      resposta: 'O amor é o mandamento central da Bíblia. Jesus disse que o maior mandamento é amar a Deus de todo o coração, alma e entendimento, e ao próximo como a si mesmo (Mt 22:37-39). O amor é a essência de Deus: Deus é amor (1 Jo 4:8). O maior exemplo de amor é Deus ter amado o mundo de tal maneira que deu o seu Filho unigênito (Jo 3:16). O amor cristão se manifesta em ações concretas, não apenas em palavras.',
      versiculos: ['Mt 22:37-39', '1 Jo 4:8', 'Jo 3:16', '1 Co 13:4-7', 'Rm 5:8', '1 Jo 4:19'],
    },
    esperança: {
      titulo: 'Esperança',
      resposta: 'A esperança cristã não é um desejo incerto, mas uma certeza baseada nas promessas de Deus. É a expectativa confiante da salvação futura e da eternidade com Deus. A esperança é sustentada pela fé e pelo amor (1 Co 13:13). Em meio às tribulações, a esperança não deserta, pois o amor de Deus foi derramado em nossos corações pelo Espírito Santo (Rm 5:5). Temos esperança viva pela ressurreição de Jesus Cristo.',
      versiculos: ['Rm 5:5', 'Rm 8:24-25', '1 Co 13:13', '1 Pd 1:3-4', 'Hb 6:19', 'Cl 1:27'],
    },
    justiça: {
      titulo: 'Justiça',
      resposta: 'A justiça de Deus é Seu caráter perfeito e Sua exigência de retidão. O homem é declarado justo diante de Deus não pelas obras da lei, mas pela fé em Jesus Cristo (Rm 3:22, 28). A justificação é um ato gracioso de Deus pelo qual o pecador é declarado justo. A justiça de Cristo é imputada ao crente pela fé. Além da justificação, o crente é chamado à santificação — viver em justiça prática.',
      versiculos: ['Rm 3:22', 'Rm 3:28', 'Rm 5:1', 'Gl 2:16', 'Fp 3:9', '2 Co 5:21'],
    },
  };

  for (const [chave, dados] of Object.entries(topicos)) {
    if (q.includes(chave) || dados.titulo.toLowerCase().split(' ').some(p => q.includes(p))) {
      let resp = `## ${dados.titulo}\n\n${dados.resposta}\n\n**Versículos-chave:**\n`;
      dados.versiculos.forEach(v => { resp += `- ${v}\n`; });
      return resp;
    }
  }

  const palavrasChave = q.split(/\s+/).filter(w => w.length > 3);
  const palavrasBiblicas = [
    'deus', 'jesus', 'cristo', 'espírito', 'santo', 'fé', 'graça', 'salvação', 'pecado',
    'amor', 'oração', 'bíblia', 'evangeli', 'igreja', 'mandamento', 'lei', 'profeta',
    'céu', 'inferno', 'juízo', 'ressurreição', 'aliança', 'sangue', 'cruz', 'perdão',
    'misericórdia', 'verdade', 'vida', 'morte', 'pecado', 'arrependimento', 'batismo',
    'ceia', 'sacramento', 'dons', 'frutos', 'evangelho', 'apóstolo', 'discípulo',
  ];

  const relevantes = palavrasChave.filter(p => palavrasBiblicas.some(pb => pb.includes(p) || p.includes(pb)));

  if (relevantes.length > 0) {
    const termos = relevantes.join(', ');
    return `## Busca: "${pergunta}"\n\nEncontrei referências relacionadas a: **${termos}**.\n\nA Base de Conhecimento Local do Sola Scriptura contém:\n- **170+ comentários** teológicos de teólogos como Calvino, Lutero, Agostinho, Tomás de Aquino\n- **1000+ verbetes** do dicionário bíblico\n- **150+ locais** no atlas bíblico\n- **10 manuais** teológicos completos\n- **Bíblia em 6 traduções** (ARC, ARA, ACF, KJV, NVI, WEB)\n\nPara uma resposta mais detalhada, acesse as seções:\n- [Teologia](/teologia) — doutrinas sistemáticas\n- [Dicionário](/idiomas/dicionario) — verbetes bíblicos\n- [Exegese](/exegese) — análise versículo a versículo\n- [Pesquisa](/pesquisa) — busca avançada no texto bíblico`;
  }

  return `## Assistente Bíblico Local\n\nOlá! Sou o assistente de estudo bíblico do Sola Scriptura.\n\nPergunta recebida: **${pergunta}**\n\nNo modo local, posso ajudar com informações sobre:\n\n- **Doutrinas**: Criação, Pecado, Salvação, Graça, Fé\n- **Jesus Cristo**: Vida, Ministério, Morte e Ressurreição\n- **Espírito Santo**: Funções e dons\n- **Igreja**: Missão e organização\n- **Escatologia**: Últimas coisas\n- **Oração, Amor, Esperança, Justiça**\n\n**Tente perguntar sobre um desses temas específicos!**\n\n*Para respostas mais avançadas com IA generativa, configure uma chave de API no painel de configurações.*`;
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
