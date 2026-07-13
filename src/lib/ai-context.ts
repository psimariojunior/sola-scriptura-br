export type PageContextType =
  | 'home'
  | 'biblia'
  | 'pesquisa'
  | 'idiomas'
  | 'exegese'
  | 'teologia'
  | 'historia'
  | 'personagens'
  | 'cronologia'
  | 'ia'
  | 'estudos'
  | 'ferramentas'
  | 'devocional'
  | 'flashcards'
  | 'quiz'
  | 'comparar'
  | 'harmonia'
  | 'parabolas'
  | 'milagres'
  | 'literatura'
  | 'sermoes'
  | 'planos'
  | 'estatisticas'
  | 'compartilhar'
  | 'pericopes'
  | 'topicos'
  | 'estudo'
  | 'apresentar'
  | 'conta'
  | 'admin'
  | 'auth'
  | 'comunidade'
  | 'estudar'
  | 'outros';

export interface PageContext {
  type: PageContextType;
  livro?: string;
  capitulo?: number;
  versiculo?: number;
  topico?: string;
  tradicao?: string;
  estudoId?: string;
  descricao?: string;
  titulo?: string;
  sugestoes: string[];
}

const SUGESTOES_POR_TIPO: Record<PageContextType, string[]> = {
  home: [
    'Como começar a estudar a Bíblia?',
    'Quais são os planos de leitura disponíveis?',
    'Explique a diferença entre AT e NT',
  ],
  biblia: [
    'Qual o contexto histórico deste capítulo?',
    'Quais versículos cruzados se relacionam com este trecho?',
    'Explique o significado teológico deste texto',
    'Quais palavras em grego ou hebraico aparecem aqui?',
  ],
  pesquisa: [
    'Como faço uma busca eficiente por temas?',
    'Quais operadores avançados estão disponíveis?',
    'Sugira termos para minha pesquisa',
  ],
  idiomas: [
    'O que significa esta palavra em grego?',
    'Explique o sistema Strong',
    'Como usar o léxico para estudo?',
  ],
  exegese: [
    'Como fazer exegese de um versículo?',
    'Quais são os métodos exegéticos?',
    'Analise a estrutura literária do texto',
  ],
  teologia: [
    'Quais são as principais doutrinas cristãs?',
    'Explique a doutrina da justificação',
    'Quais as diferenças entre as tradições teológicas?',
  ],
  historia: [
    'Qual o contexto histórico deste período bíblico?',
    'Quais impérios existiam nesta época?',
    'Quais eventos importantes aconteceram?',
  ],
  personagens: [
    'Quem foi este personagem bíblico?',
    'Qual o papel dele na história da salvação?',
    'Quais foram seus principais feitos?',
  ],
  cronologia: [
    'Quando este evento aconteceu?',
    'Como os eventos bíblicos se relacionam?',
    'Qual a linha do tempo deste período?',
  ],
  ia: [
    'Como você pode me ajudar?',
    'Quais são suas limitações?',
    'Que tipo de perguntas posso fazer?',
  ],
  estudos: [
    'Sugira um bom livro para começar a estudar',
    'Como aproveitar melhor os estudos?',
    'Quais são os métodos de estudo bíblico?',
  ],
  ferramentas: [
    'Como usar a concordância bíblica?',
    'O que é crítica textual?',
    'Quais ferramentas estão disponíveis?',
  ],
  devocional: [
    'Sugira um devocional para hoje',
    'Como ter uma vida devocional consistente?',
    'Qual o significado deste versículo?',
  ],
  flashcards: [
    'Como os flashcards podem me ajudar?',
    'Sugira flashcards para este livro',
    'Qual a melhor forma de revisar?',
  ],
  quiz: [
    'Me dê uma pergunta difícil',
    'Como melhorar meu conhecimento bíblico?',
    'Quais categorias de quiz existem?',
  ],
  comparar: [
    'Quais traduções estão disponíveis?',
    'Quais são as diferenças entre as traduções?',
    'Qual a melhor tradução para estudo?',
  ],
  harmonia: [
    'Como os evangelhos se relacionam?',
    'Quais eventos são narrados por todos?',
    'Explique a harmonia sinótica',
  ],
  parabolas: [
    'Qual o significado desta parábola?',
    'Qual o contexto desta parábola?',
    'Como aplicar esta parábola hoje?',
  ],
  milagres: [
    'Qual o significado teológico deste milagre?',
    'Quantos milagres Jesus fez?',
    'Quais milagres estão registrados?',
  ],
  literatura: [
    'Quais são os gêneros literários da Bíblia?',
    'Como identificar a literatura bíblica?',
    'Quais são os livros sapienciais?',
  ],
  sermoes: [
    'Como preparar um sermão?',
    'Quais são os tipos de sermão?',
    'Sugira um esboço para este tema',
  ],
  planos: [
    'Qual plano de leitura é ideal para mim?',
    'Quanto tempo leva um plano?',
    'Sugira um plano de leitura',
  ],
  estatisticas: [
    'Como melhorar minhas estatísticas?',
    'O que são as conquistas?',
    'Como funciona a gamificação?',
  ],
  compartilhar: [
    'Como compartilhar versículos?',
    'Posso compartilhar por redes sociais?',
    'Como gerar QR code?',
  ],
  pericopes: [
    'O que é uma perícope?',
    'Quais perícopes existem?',
    'Como estudar uma perícope?',
  ],
  topicos: [
    'Quais tópicos teológicos existem?',
    'O que é teologia sistemática?',
    'Sugira tópicos para estudo',
  ],
  estudo: [
    'O que este versículo significa?',
    'Quais são as principais interpretações?',
    'Como aplicar este ensino hoje?',
  ],
  apresentar: [
    'Como usar o modo apresentação?',
    'Como conectar a uma TV?',
    'Quais são os controles?',
  ],
  conta: [
    'Como gerenciar minha conta?',
    'Como alterar preferências?',
    'Como exportar meus dados?',
  ],
  admin: [
    'O que é o painel admin?',
    'Como gerenciar usuários?',
    'Como adicionar conteúdo?',
  ],
  auth: [
    'Como criar uma conta?',
    'Esqueci minha senha',
    'Como entrar com Google?',
  ],
  comunidade: [
    'Como participar da comunidade?',
    'Quais recursos estão disponíveis?',
    'Como compartilhar estudos?',
  ],
  estudar: [
    'Como seguir o passo a passo?',
    'Qual a importância de cada etapa?',
    'Posso pular etapas?',
  ],
  outros: [
    'Como você pode me ajudar?',
    'Quais recursos estão disponíveis?',
    'O que é Sola Scriptura?',
  ],
};

function detectarTipo(pathname: string): PageContextType {
  if (pathname === '/' || pathname === '') return 'home';
  if (pathname.startsWith('/biblia')) return 'biblia';
  if (pathname.startsWith('/pesquisa')) return 'pesquisa';
  if (pathname.startsWith('/idiomas')) return 'idiomas';
  if (pathname.startsWith('/exegese')) return 'exegese';
  if (pathname.startsWith('/teologia')) return 'teologia';
  if (pathname.startsWith('/historia')) return 'historia';
  if (pathname.startsWith('/personagens')) return 'personagens';
  if (pathname.startsWith('/cronologia')) return 'cronologia';
  if (pathname.startsWith('/ia')) return 'ia';
  if (pathname.startsWith('/estudos/') && pathname !== '/estudos') return 'estudos';
  if (pathname === '/estudos') return 'estudos';
  if (pathname.startsWith('/ferramentas')) return 'ferramentas';
  if (pathname.startsWith('/devocional')) return 'devocional';
  if (pathname.startsWith('/flashcards')) return 'flashcards';
  if (pathname.startsWith('/quiz')) return 'quiz';
  if (pathname.startsWith('/comparar')) return 'comparar';
  if (pathname.startsWith('/harmonia')) return 'harmonia';
  if (pathname.startsWith('/parabolas')) return 'parabolas';
  if (pathname.startsWith('/milagres')) return 'milagres';
  if (pathname.startsWith('/literatura')) return 'literatura';
  if (pathname.startsWith('/sermoes')) return 'sermoes';
  if (pathname.startsWith('/planos')) return 'planos';
  if (pathname.startsWith('/estatisticas')) return 'estatisticas';
  if (pathname.startsWith('/compartilhar')) return 'compartilhar';
  if (pathname.startsWith('/pericopes')) return 'pericopes';
  if (pathname.startsWith('/topicos')) return 'topicos';
  if (pathname.startsWith('/estudo')) return 'estudo';
  if (pathname.startsWith('/apresentar')) return 'apresentar';
  if (pathname.startsWith('/conta')) return 'conta';
  if (pathname.startsWith('/admin')) return 'admin';
  if (pathname.startsWith('/auth')) return 'auth';
  if (pathname.startsWith('/comunidade')) return 'comunidade';
  if (pathname.startsWith('/estudar')) return 'estudar';
  return 'outros';
}

function extrairLivro(pathname: string): string | undefined {
  const match = pathname.match(/\/biblia\/([a-z0-9]+)/i);
  if (match) return match[1];

  const estudoMatch = pathname.match(/\/estudos\/([a-z0-9]+)/i);
  if (estudoMatch) return estudoMatch[1];

  const estudarMatch = pathname.match(/\/estudar\/([a-z0-9]+)/i);
  if (estudarMatch) return estudarMatch[1];

  return undefined;
}

function extrairCapitulo(pathname: string): number | undefined {
  const match = pathname.match(/\/(\d+)(?:\/|$|\?)/);
  if (match) {
    const num = parseInt(match[1], 10);
    if (num > 0 && num < 200) return num;
  }
  return undefined;
}

function extrairVersiculo(pathname: string): number | undefined {
  const match = pathname.match(/:(\d+)/);
  if (match) {
    const num = parseInt(match[1], 10);
    if (num > 0) return num;
  }
  return undefined;
}

function extrairTopico(searchParams: URLSearchParams | null): string | undefined {
  if (!searchParams) return undefined;
  return searchParams.get('topico') ?? searchParams.get('q') ?? undefined;
}

function extrairTradicao(searchParams: URLSearchParams | null): string | undefined {
  if (!searchParams) return undefined;
  return searchParams.get('traducao') ?? searchParams.get('trad') ?? undefined;
}

export function getPageContext(
  pathname: string,
  searchParams?: URLSearchParams | string | null
): PageContext {
  const params =
    searchParams instanceof URLSearchParams
      ? searchParams
      : searchParams
      ? new URLSearchParams(searchParams)
      : null;

  const type = detectarTipo(pathname);
  const livro = extrairLivro(pathname);
  const capitulo = extrairCapitulo(pathname);
  const versiculo = extrairVersiculo(pathname);
  const topico = extrairTopico(params);
  const tradicao = extrairTradicao(params);

  let titulo: string | undefined;
  let descricao: string | undefined;

  if (type === 'biblia' && livro && capitulo) {
    titulo = `${livro.toUpperCase()} ${capitulo}`;
    if (versiculo) titulo += `:${versiculo}`;
  } else if (type === 'estudos' && livro) {
    titulo = `Estudo: ${livro}`;
  } else if (type === 'estudar' && livro && capitulo) {
    titulo = `Estudo Guiado: ${livro.toUpperCase()} ${capitulo}`;
  } else if (type === 'teologia' && topico) {
    titulo = `Teologia: ${topico}`;
  }

  return {
    type,
    livro,
    capitulo,
    versiculo,
    topico,
    tradicao,
    titulo,
    descricao,
    sugestoes: SUGESTOES_POR_TIPO[type] || SUGESTOES_POR_TIPO.outros,
  };
}

export function buildContextualQuestion(
  question: string,
  context: PageContext
): string {
  const ctxParts: string[] = [];

  if (context.livro) {
    ctxParts.push(`Livro: ${context.livro.toUpperCase()}`);
  }
  if (context.capitulo) {
    ctxParts.push(`Capítulo: ${context.capitulo}`);
  }
  if (context.versiculo) {
    ctxParts.push(`Versículo: ${context.versiculo}`);
  }
  if (context.tradicao) {
    ctxParts.push(`Tradução: ${context.tradicao}`);
  }
  if (context.topico) {
    ctxParts.push(`Tópico: ${context.topico}`);
  }
  if (context.titulo) {
    ctxParts.push(`Contexto: ${context.titulo}`);
  }

  if (ctxParts.length === 0) return question;
  return `[Contexto da página: ${ctxParts.join(' | ')}]\n\n${question}`;
}
