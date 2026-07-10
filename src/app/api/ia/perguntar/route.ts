import { NextRequest, NextResponse } from 'next/server';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY || '';

// Base de conhecimento expandida
const DADOS_DOUTRINAS = [
  { nome: 'Trindade', definicao: 'Deus é um só em essência, mas existe em três pessoas distintas: Pai, Filho e Espírito Santo. Cada pessoa é plenamente Deus, mas há um único Deus.', passagens: ['Mt 28:19', '2 Co 13:14', '1 Pe 1:2'], categoria: 'Teísmo' },
  { nome: 'Encarnação', definicao: 'O Verbo eterno de Deus se fez homem em Jesus Cristo, sendo verdadeiro Deus e verdadeiro homem, sem confusão de naturezas.', passagens: ['Jo 1:14', 'Fp 2:5-8', 'Hb 1:1-3'], categoria: 'Cristologia' },
  { nome: 'Expiação', definicao: 'A morte de Cristo na cruz foi sacrifício substitutivo pelos pecados da humanidade, satisfazendo a justiça de Deus.', passagens: ['Rm 3:23-25', '1 Co 15:3', '1 Pe 2:24'], categoria: 'Soteriologia' },
  { nome: 'Ressurreição', definicao: 'Cristo ressuscitou corporalmente ao terceiro dia, vencendo a morte e garantindo a ressurreição dos crentes.', passagens: ['1 Co 15:3-8', 'Rm 1:4', 'At 2:24'], categoria: 'Escatologia' },
  { nome: 'Graça', definicao: 'Favor imerecido de Deus, concedido gratuitamente aos pecadores para salvação e santificação.', passagens: ['Ef 2:8-9', 'Rm 5:15', 'Tt 2:11'], categoria: 'Soteriologia' },
  { nome: 'Justificação', definicao: 'Ato jurídico de Deus pelo qual o pecador é declarado justo diante da Lei, mediante a fé em Cristo.', passagens: ['Rm 3:24', 'Rm 5:1', 'Gl 2:16'], categoria: 'Soteriologia' },
  { nome: 'Regeneração', definicao: 'A obra do Espírito Santo que produz nova vida espiritual no crente, tornando-o nova criatura.', passagens: ['Jo 3:3-6', 'Tt 3:5', '2 Co 5:17'], categoria: 'Soteriologia' },
  { nome: 'Santificação', definicao: 'Processo progressivo pelo qual o Espírito Santo transforma o crente à imagem de Cristo.', passagens: ['1 Ts 4:3', 'Hb 12:14', '1 Pe 1:15-16'], categoria: 'Soteriologia' },
  { nome: 'Adoção', definicao: 'Ato de Deus pelo qual os crentes são recebidos como filhos legítimos na família divina.', passagens: ['Rm 8:15-17', 'Gl 4:4-7', 'Ef 1:5'], categoria: 'Soteriologia' },
  { nome: 'Eleição', definicao: 'Escolha soberana de Deus desde a eternidade, pela qual predestina certos pecadores para serem salvos em Cristo.', passagens: ['Ef 1:4-5', 'Rm 8:29-30', '2 Ts 2:13'], categoria: 'Soteriologia' },
  { nome: 'Pneumatologia', definicao: 'Doutrina do Espírito Santo, terceira pessoa da Trindade, que procede do Pai e do Filho para aplicar a obra redentora.', passagens: ['Jo 14:16-17', 'Jo 16:13-14', 'At 2:1-4'], categoria: 'Pneumatologia' },
  { nome: 'Igreja', definicao: 'Comunidade dos chamados por Deus, corpo de Cristo, templo do Espírito Santo.', passagens: ['Mt 16:18', '1 Co 12:27', 'Ef 1:22-23'], categoria: 'Eclesiologia' },
  { nome: 'Aliança', definicao: 'Pacto soberano de Deus com Seu povo, estabelecendo relação de comunhão e promessas, cumprido em Cristo.', passagens: ['Gn 12:1-3', 'Ex 24:8', 'Jr 31:31-34'], categoria: 'Teologia Bíblica' },
  { nome: 'Reino de Deus', definicao: 'O domínio soberano de Deus sobre todas as coisas, manifestado em Cristo e consumado na nova criação.', passagens: ['Mc 1:15', 'Mt 6:33', 'Ap 11:15'], categoria: 'Escatologia' },
  { nome: 'Juízo Final', definicao: 'O julgamento final de Deus sobre toda a humanidade, onde os justos herdarão a vida eterna.', passagens: ['Mt 25:31-46', 'Ap 20:11-15', '2 Co 5:10'], categoria: 'Escatologia' },
];

const DADOS_PERSONAGENS = [
  { nome: 'Abraão', nomeHebraico: 'אַבְרָהָם (Avraham)', significado: 'Pai de multidões', resumo: 'Pai da fé. Chamado por Deus para sair de Ur e ir à terra de Canaã. Pai de Isaque. Intercedeu por Sodoma. Teste de fé em Moriá.', passagens: ['Gn 12:1-3', 'Gn 15:1-6', 'Gn 22:1-19'] },
  { nome: 'Moisés', nomeHebraico: 'מֹשֶׁה (Moshe)', significado: 'Tirado das águas', resumo: 'Libertador de Israel do Egito. Recebedor da Lei no Sinai. Líder do Êxodo por 40 anos.', passagens: ['Ex 2:1-10', 'Ex 20:1-17', 'Dt 34:1-12'] },
  { nome: 'Davi', nomeHebraico: 'דָּוִד (Dawid)', significado: 'Amado', resumo: 'Rei de Israel depois de Saul. Homem segundo o coração de Deus. Matou Golias. Escreveu muitos Salmos.', passagens: ['1 Sm 16:1-13', '2 Sm 5:1-5', 'Sl 23'] },
  { nome: 'Paulo', nomeGrego: 'Παῦλος (Paulos)', significado: 'Pequeno, humilde', resumo: 'Apóstolo dos gentios. Perseguiu a igreja antes da conversão. Escreveu 13 epístolas.', passagens: ['At 9:1-19', 'Rm 1:1', 'Ef 3:1-8'] },
  { nome: 'Pedro', nomeGrego: 'Πέτρος (Petros)', significado: 'Pedra, rocha', resumo: 'Apóstolo líder. Primeiro a confessar Cristo como Messias. Negou Jesus mas foi restaurado.', passagens: ['Mt 16:13-20', 'At 2:1-41', 'Jo 21:15-19'] },
  { nome: 'José', nomeHebraico: 'יוֹסֵף (Yosef)', significado: 'Ele acrescentará', resumo: 'Filho de Jacó. Vendido como escravo. Interpretou sonhos no Egito. Tornou-se governador.', passagens: ['Gn 37:1-36', 'Gn 41:1-57', 'Gn 50:15-21'] },
  { nome: 'Isaac', nomeHebraico: 'יִצְחָק (Yitzhak)', significado: 'Ele rirá', resumo: 'Filho da promessa. Quase sacrificado por Abraão. Casou-se com Rebeca. Pai de Jacó e Esaú.', passagens: ['Gn 21:1-7', 'Gn 22:1-19', 'Gn 25:19-34'] },
  { nome: 'Jacó', nomeHebraico: 'יַעֲקֹב (Yaakov)', significado: 'Aquele que segura o calcanhar', resumo: 'Enganou Esaú e Isaque. Lutou com Deus e recebeu o nome Israel. Pai das 12 tribos.', passagens: ['Gn 25:19-34', 'Gn 28:10-22', 'Gn 32:22-32'] },
  { nome: 'Elias', nomeHebraico: 'אֵלִיָּהוּ (Eliyahu)', significado: 'Meu Deus é o SENHOR', resumo: 'Profeta de fogo. Confrontou Acabe e Jezabel. Desafiou os profetas de Baal no Carmelo.', passagens: ['1 Rs 17:1-24', '1 Rs 18:1-46', '2 Rs 2:1-14'] },
  { nome: 'Isaías', nomeHebraico: 'יְשַׁעְיָהוּ (Yeshayahu)', significado: 'O SENHOR é salvação', resumo: 'Maior profeta do AT. Profetizou sobre o Messias. Chamado ao ministério com visão do trono.', passagens: ['Is 6:1-13', 'Is 53:1-12', 'Is 9:1-7'] },
  { nome: 'Daniel', nomeHebraico: 'דָּנִיֵּאל (Daniyel)', significado: 'Deus é meu juiz', resumo: 'Profeta no exílio babilônico. Interpretou sonhos. Lançado na cova dos leões. Teve visões apocalípticas.', passagens: ['Dn 1:1-21', 'Dn 6:1-28', 'Dn 7:1-28'] },
  { nome: 'Maria', nomeHebraico: 'מִרְיָם (Miryam)', significado: 'Amargura, rebeldia', resumo: 'Mãe de Jesus. Concebeu pelo Espírito Santo. Presente na cruz. Modelo de fé e humildade.', passagens: ['Lc 1:26-38', 'Lc 2:1-20', 'Jo 19:25-27'] },
];

const VERSICULOS_POPULARES = [
  { ref: 'Jo 3:16', texto: 'Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.' },
  { ref: 'Rm 8:28', texto: 'E sabemos que todas as coisas contribuem juntamente para o bem daqueles que amam a Deus.' },
  { ref: 'Ef 2:8-9', texto: 'Porque pela graça sois salvos, por meio da fé; e isto não vem de vós, é dom de Deus. Não vem das obras, para que ninguém se glorie.' },
  { ref: 'Sl 23:1', texto: 'O SENHOR é o meu pastor; nada me faltará.' },
  { ref: 'Hb 11:1', texto: 'Ora, a fé é o firme fundamento das coisas que se esperam, e a prova das coisas que se não veem.' },
  { ref: 'Mt 28:19-20', texto: 'Ide, portanto, e fazei discípulos de todas as nações, batizando-os em nome do Pai, e do Filho, e do Espírito Santo, ensinando-os a guardar todas as coisas que vos tenho ordenado.' },
  { ref: 'Rm 3:23', texto: 'Porque todos pecaram e estão destituídos da glória de Deus.' },
  { ref: 'Rm 6:23', texto: 'Porque o salário do pecado é a morte, mas o dom gratuito de Deus é a vida eterna em Cristo Jesus nosso Senhor.' },
  { ref: '1 Co 13:4-7', texto: 'O amor é sofredor, é benigno; o amor não é invejoso; o amor não trata com leviandade, não se ensoberbece.' },
  { ref: 'Php 4:13', texto: 'Posso todas as coisas naquele que me fortalece.' },
  { ref: '2 Tm 3:16', texto: 'Toda a Escritura é inspirada por Deus e útil para o ensino, para a repreensão, para a correção, para a educação na justiça.' },
  { ref: 'Jo 14:6', texto: 'Jesus lhe disse: Eu sou o caminho, e a verdade, e a vida; ninguém vem ao Pai senão por mim.' },
  { ref: 'Gl 2:20', texto: 'Estou crucificado com Cristo; e vivo, não mais eu, mas Cristo vive em mim.' },
  { ref: '1 Jo 4:8', texto: 'Aquele que não ama não conhece a Deus, porque Deus é amor.' },
  { ref: 'Ap 21:4', texto: 'E enxugará toda lágrima dos seus olhos, e a morte não haverá mais, nem haverá mais lamento, nem dor, porque as primeiras coisas passaram.' },
];

const TEMAS_BIBLICOS: Record<string, { descricao: string; passagens: string[] }> = {
  'salvação': { descricao: 'A obra redentora de Deus através de Jesus Cristo', passagens: ['Ef 2:8-9', 'Rm 10:9-10', 'At 4:12'] },
  'fé': { descricao: 'Confiança e crença em Deus e Suas promessas', passagens: ['Hb 11:1', 'Rm 10:17', 'Mc 11:22-24'] },
  'oração': { descricao: 'Comunicação com Deus', passagens: ['Mt 6:5-15', '1 Ts 5:17', 'Ef 6:18'] },
  'amor': { descricao: 'O amor de Deus e o amor ao próximo', passagens: ['1 Co 13:4-7', 'Jo 3:16', '1 Jo 4:7-8'] },
  'pecado': { descricao: 'A rebelião humana contra Deus', passagens: ['Rm 3:23', 'Rm 6:23', '1 Jo 1:8-9'] },
  'graça': { descricao: 'Favor imerecido de Deus', passagens: ['Ef 2:8-9', 'Rm 5:15', 'Tt 2:11'] },
  'promessa': { descricao: 'As promessas de Deus ao Seu povo', passagens: ['Gn 12:1-3', '2 Co 1:20', 'Hb 10:23'] },
  'louvor': { descricao: 'Adoração e exaltação a Deus', passagens: ['Sl 150:1-6', 'Ef 5:19', 'Cl 3:16'] },
  'missão': { descricao: 'O chamado para levar o evangelho', passagens: ['Mt 28:19-20', 'At 1:8', 'Rm 10:14-15'] },
  'escatologia': { descricao: 'As últimas coisas e a esperança cristã', passagens: ['1 Ts 4:13-18', 'Ap 21:1-5', '1 Co 15:51-58'] },
};

interface FonteInfo {
  tipo: string;
  texto: string;
  referencia: string;
}

function extrairTermos(consulta: string): string[] {
  const comuns = new Set(['o','a','os','as','um','uma','de','do','da','dos','das','em','no','na','nos','nas','por','para','com','sem','e','ou','mas','que','qual','quem','como','é','são','esta','isto','isso','sobre','mais','também','pode','ser','ter','fazer']);
  return consulta.toLowerCase().replace(/[^\w\s]/g,' ').split(/\s+/).filter(p => p.length > 2 && !comuns.has(p)).slice(0, 10);
}

function buscarContexto(consulta: string): FonteInfo[] {
  const termos = extrairTermos(consulta);
  const fontes: FonteInfo[] = [];

  // Buscar doutrinas
  const doutrinasEncontradas = DADOS_DOUTRINAS.filter(d =>
    termos.some(t => 
      d.nome.toLowerCase().includes(t) || 
      d.definicao.toLowerCase().includes(t) ||
      d.categoria.toLowerCase().includes(t)
    )
  );
  doutrinasEncontradas.forEach(d => {
    fontes.push({ 
      tipo: 'doutrina', 
      texto: `${d.nome}: ${d.definicao} Passagens: ${d.passagens.join(', ')}`, 
      referencia: d.nome 
    });
  });

  // Buscar personagens
  const personagensEncontrados = DADOS_PERSONAGENS.filter(p =>
    termos.some(t => 
      p.nome.toLowerCase().includes(t) || 
      p.resumo.toLowerCase().includes(t) ||
      p.significado.toLowerCase().includes(t)
    )
  );
  personagensEncontrados.forEach(p => {
    fontes.push({ 
      tipo: 'personagem', 
      texto: `${p.nome} (${p.nomeHebraico || p.nomeGrego || ''} - ${p.significado}): ${p.resumo} Passagens: ${p.passagens.join(', ')}`, 
      referencia: p.nome 
    });
  });

  // Buscar versículos populares
  const versiculosEncontrados = VERSICULOS_POPULARES.filter(v =>
    termos.some(t => v.texto.toLowerCase().includes(t) || v.ref.toLowerCase().includes(t))
  );
  versiculosEncontrados.forEach(v => {
    fontes.push({ 
      tipo: 'versículo', 
      texto: v.texto, 
      referencia: v.ref 
    });
  });

  // Buscar temas
  const temasEncontrados = Object.entries(TEMAS_BIBLICOS).filter(([tema, info]) =>
    termos.some(t => 
      tema.includes(t) || 
      info.descricao.toLowerCase().includes(t)
    )
  );
  temasEncontrados.forEach(([tema, info]) => {
    fontes.push({ 
      tipo: 'tema', 
      texto: `${tema}: ${info.descricao}. Passagens: ${info.passagens.join(', ')}`, 
      referencia: tema 
    });
  });

  return fontes;
}

async function gerarComOpenAI(consulta: string, contexto: FonteInfo[], tradicao?: string): Promise<string> {
  const contextStr = contexto.map(f => `[${f.tipo.toUpperCase()}] ${f.referencia}: ${f.texto}`).join('\n');

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `Você é um professor de teologia e exegese bíblica com décadas de experiência. Responda em português brasileiro com rigor acadêmico e clareza.

Diretrizes:
- Cite sempre passagens bíblicas relevantes
- Considere o contexto histórico e cultural
- Seja preciso teologicamente
- Use markdown para estruturar a resposta
- Se a pergunta for sobre uma tradição específica, considere essa perspectiva
- Sempre aponte para estudo adicional nas Escrituras

${tradicao ? `Considere especialmente a perspectiva teológica ${tradicao}.` : ''}`,
        },
        {
          role: 'user',
          content: contexto.length > 0
            ? `Contexto da pesquisa:\n${contextStr}\n\nPergunta: ${consulta}`
            : consulta,
        },
      ],
      temperature: 0.3,
      max_tokens: 2048,
    }),
  });

  if (!response.ok) {
    throw new Error(`Erro OpenAI: ${response.status}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

function gerarRespostaLocal(consulta: string, contexto: FonteInfo[], tradicao?: string): string {
  const linhas: string[] = [];
  const termos = extrairTermos(consulta);
  
  linhas.push(`## Análise Bíblica`);
  linhas.push('');
  linhas.push(`**Pergunta:** "${consulta}"`);
  linhas.push('');

  if (contexto.length === 0) {
    linhas.push('### Resultado');
    linhas.push('');
    linhas.push('Não encontrei informações específicas no contexto disponível para responder completamente à sua pergunta.');
    linhas.push('');
    linhas.push('### Sugestões de Estudo');
    linhas.push('');
    linhas.push('1. **Pesquisa Bíblica** - Use a página de pesquisa para encontrar versículos relacionados ao tema');
    linhas.push('2. **Exegese** - Faça uma análise exegética de passagens específicas');
    linhas.push('3. **Línguas Originais** - Estude as palavras-chave em grego ou hebraico');
    linhas.push('4. **Teologia Sistemática** - Explore as doutrinas relacionadas ao tema');
    linhas.push('');
    linhas.push('### Versículos para Estudo');
    linhas.push('');
    linhas.push('- **João 3:16** - O versículo mais conhecido da Bíblia sobre o amor de Deus');
    linhas.push('- **Romanos 8:28** - Todas as coisas contribuem para o bem');
    linhas.push('- **Efésios 2:8-9** - Salvos pela graça por meio da fé');
    linhas.push('');
    linhas.push('---');
    linhas.push('*Resposta gerada pelo assistente local. Para respostas mais detalhadas, configure a chave da API OpenAI.*');
    return linhas.join('\n');
  }

  // Agrupar por tipo
  const doutrinas = contexto.filter(f => f.tipo === 'doutrina');
  const personagens = contexto.filter(f => f.tipo === 'personagem');
  const versiculos = contexto.filter(f => f.tipo === 'versículo');
  const temas = contexto.filter(f => f.tipo === 'tema');

  linhas.push('### Contexto Encontrado');
  linhas.push('');

  if (doutrinas.length > 0) {
    linhas.push('#### Doutrinas');
    linhas.push('');
    doutrinas.forEach(d => {
      linhas.push(`**${d.referencia}**`);
      linhas.push(`${d.texto}`);
      linhas.push('');
    });
  }

  if (personagens.length > 0) {
    linhas.push('#### Personagens Bíblicos');
    linhas.push('');
    personagens.forEach(p => {
      linhas.push(`**${p.referencia}**`);
      linhas.push(`${p.texto}`);
      linhas.push('');
    });
  }

  if (versiculos.length > 0) {
    linhas.push('#### Versículos Relevantes');
    linhas.push('');
    versiculos.forEach(v => {
      linhas.push(`**${v.referencia}**: ${v.texto}`);
      linhas.push('');
    });
  }

  if (temas.length > 0) {
    linhas.push('#### Temas Relacionados');
    linhas.push('');
    temas.forEach(t => {
      linhas.push(`**${t.referencia}**: ${t.texto}`);
      linhas.push('');
    });
  }

  linhas.push('### Análise');
  linhas.push('');

  if (doutrinas.length > 0) {
    linhas.push(`O tema está relacionado à doutrina da **${doutrinas[0].referencia}**, que é fundamental na teologia cristã.`);
  }
  if (personagens.length > 0) {
    linhas.push(`O personagem bíblico **${personagens[0].referencia}** é uma figura importante para entender este contexto.`);
  }
  if (temas.length > 0) {
    linhas.push(`Este assunto se enquadra no tema de **${temas[0].referencia}**, que é recorrente nas Escrituras.`);
  }

  linhas.push('');
  linhas.push(`**Tradição teológica:** ${tradicao || 'Geral'}`);
  linhas.push('');
  linhas.push('### Próximos Passos');
  linhas.push('');
  linhas.push('1. Leia as passagens mencionadas acima na Bíblia');
  linhas.push('2. Faça uma exegese detalhada usando a ferramenta de Exegese');
  linhas.push('3. Estude as palavras originais no léxico grego/hebraico');
  linhas.push('4. Explore o contexto histórico e geográfico');
  linhas.push('');
  linhas.push('---');
  linhas.push(`*Fonte: Análise baseada em ${contexto.length} referência(s) do banco de conhecimento.*`);

  return linhas.join('\n');
}

export async function POST(request: NextRequest) {
  try {
    const { consulta, tradicao } = await request.json();

    if (!consulta?.trim()) {
      return NextResponse.json({ erro: 'Pergunta é obrigatória' }, { status: 400 });
    }

    const contexto = buscarContexto(consulta);

    let resposta: string;
    if (OPENAI_API_KEY) {
      try {
        resposta = await gerarComOpenAI(consulta, contexto, tradicao);
      } catch {
        resposta = gerarRespostaLocal(consulta, contexto, tradicao);
      }
    } else {
      resposta = gerarRespostaLocal(consulta, contexto, tradicao);
    }

    return NextResponse.json({
      pergunta: consulta,
      resposta,
      fontes: contexto,
      tradicaoTeologica: tradicao || 'geral',
    });
  } catch (error) {
    return NextResponse.json(
      { erro: 'Erro ao processar a pergunta', detalhes: error instanceof Error ? error.message : 'Erro desconhecido' },
      { status: 500 }
    );
  }
}
