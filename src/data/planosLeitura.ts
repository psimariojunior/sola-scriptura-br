export interface LeituraDia {
  dia: number;
  titulo: string;
  passagens: Array<{ livro: string; capitulo: number; versiculoInicio?: number; versiculoFim?: number }>;
}

export interface PlanoLeitura {
  titulo: string;
  descricao: string;
  duracao: number;
  categoria: string;
  nivel: 'iniciante' | 'intermediario' | 'avancado';
  versiculos: LeituraDia[];
}

type LivroCapitulos = { livro: string; capitulos: number };

function gerarDiasDeLivros(livros: LivroCapitulos[], totalDias: number, formatarTitulo?: (dia: number, passagens: LeituraDia['passagens']) => string): LeituraDia[] {
  const totalCaps = livros.reduce((s, l) => s + l.capitulos, 0);
  const capsPorDia = Math.ceil(totalCaps / totalDias);
  const dias: LeituraDia[] = [];
  let idxLivro = 0;
  let capNoLivro = 0;

  for (let d = 1; d <= totalDias; d++) {
    const dia: LeituraDia = { dia: d, titulo: '', passagens: [] };
    let restante = capsPorDia;

    while (restante > 0 && idxLivro < livros.length) {
      const livro = livros[idxLivro];
      const capsRest = livro.capitulos - capNoLivro;
      const caps = Math.min(restante, capsRest);

      dia.passagens.push({
        livro: livro.livro,
        capitulo: capNoLivro + 1,
        ...(caps > 1 ? { versiculoFim: capNoLivro + caps } : {}),
      });

      capNoLivro += caps;
      restante -= caps;

      if (capNoLivro >= livro.capitulos) {
        idxLivro++;
        capNoLivro = 0;
      }
    }

    dia.titulo = formatarTitulo
      ? formatarTitulo(d, dia.passagens)
      : `Dia ${d}`;
    dias.push(dia);
  }
  return dias;
}

function gerarLivroCapitulo(livro: string, capitulos: number): LivroCapitulos[] {
  return [{ livro, capitulos }];
}

function p(passagens: LeituraDia['passagens']): LeituraDia['passagens'] {
  return passagens;
}

function r(livro: string, cap: number, vi?: number, vf?: number): { livro: string; capitulo: number; versiculoInicio?: number; versiculoFim?: number } {
  return vi !== undefined ? { livro, capitulo: cap, versiculoInicio: vi, versiculoFim: vf } : { livro, capitulo: cap };
}

const AT_LIVROS: LivroCapitulos[] = [
  { livro: 'gn', capitulos: 50 }, { livro: 'ex', capitulos: 40 },
  { livro: 'lv', capitulos: 27 }, { livro: 'nm', capitulos: 36 },
  { livro: 'dt', capitulos: 34 }, { livro: 'js', capitulos: 24 },
  { livro: 'jz', capitulos: 21 }, { livro: 'rt', capitulos: 4 },
  { livro: '1sm', capitulos: 31 }, { livro: '2sm', capitulos: 24 },
  { livro: '1rs', capitulos: 22 }, { livro: '2rs', capitulos: 25 },
  { livro: '1cr', capitulos: 29 }, { livro: '2cr', capitulos: 36 },
  { livro: 'ed', capitulos: 10 }, { livro: 'ne', capitulos: 13 },
  { livro: 'et', capitulos: 10 }, { livro: 'job', capitulos: 42 },
  { livro: 'sl', capitulos: 150 }, { livro: 'pv', capitulos: 31 },
  { livro: 'ec', capitulos: 12 }, { livro: 'ct', capitulos: 8 },
  { livro: 'is', capitulos: 66 }, { livro: 'jr', capitulos: 52 },
  { livro: 'lm', capitulos: 5 }, { livro: 'ez', capitulos: 48 },
  { livro: 'dn', capitulos: 12 }, { livro: 'os', capitulos: 14 },
  { livro: 'jl', capitulos: 3 }, { livro: 'am', capitulos: 9 },
  { livro: 'ob', capitulos: 1 }, { livro: 'jn', capitulos: 4 },
  { livro: 'mq', capitulos: 7 }, { livro: 'na', capitulos: 3 },
  { livro: 'hc', capitulos: 3 }, { livro: 'sf', capitulos: 3 },
  { livro: 'ag', capitulos: 2 }, { livro: 'zc', capitulos: 14 },
  { livro: 'ml', capitulos: 4 },
];

const NT_LIVROS: LivroCapitulos[] = [
  { livro: 'mt', capitulos: 28 }, { livro: 'mc', capitulos: 16 },
  { livro: 'lc', capitulos: 24 }, { livro: 'jo', capitulos: 21 },
  { livro: 'at', capitulos: 28 }, { livro: 'rm', capitulos: 16 },
  { livro: '1co', capitulos: 16 }, { livro: '2co', capitulos: 13 },
  { livro: 'gl', capitulos: 6 }, { livro: 'ef', capitulos: 6 },
  { livro: 'fp', capitulos: 4 }, { livro: 'cl', capitulos: 4 },
  { livro: '1ts', capitulos: 5 }, { livro: '2ts', capitulos: 3 },
  { livro: '1tm', capitulos: 6 }, { livro: '2tm', capitulos: 4 },
  { livro: 'tt', capitulos: 3 }, { livro: 'fm', capitulos: 1 },
  { livro: 'hb', capitulos: 13 }, { livro: 'tg', capitulos: 5 },
  { livro: '1pe', capitulos: 5 }, { livro: '2pe', capitulos: 3 },
  { livro: '1jo', capitulos: 5 }, { livro: '2jo', capitulos: 1 },
  { livro: '3jo', capitulos: 1 }, { livro: 'jd', capitulos: 1 },
  { livro: 'ap', capitulos: 22 },
];

export const novosPlanos: Record<string, PlanoLeitura> = {

  // ═══════════════════════════════════════════════════════════════
  // 1. PLANOS ANUAIS (3)
  // ═══════════════════════════════════════════════════════════════

  'biblia-em-1-ano-cronologico': {
    titulo: 'Bíblia em 1 Ano (Cronológico)',
    descricao: 'Leia a Bíblia completa em ordem cronológica, seguindo a narrativa histórica da Criação ao Apocalipse.',
    duracao: 365,
    categoria: 'anual',
    nivel: 'intermediario',
    versiculos: (() => {
      const cronologia: LivroCapitulos[][] = [
        [{ livro: 'gn', capitulos: 50 }], [{ livro: 'ex', capitulos: 40 }],
        [{ livro: 'lv', capitulos: 27 }], [{ livro: 'nm', capitulos: 36 }],
        [{ livro: 'dt', capitulos: 34 }], [{ livro: 'js', capitulos: 24 }],
        [{ livro: 'jz', capitulos: 21 }], [{ livro: 'rt', capitulos: 4 }],
        [{ livro: '1sm', capitulos: 31 }], [{ livro: '2sm', capitulos: 24 }],
        [{ livro: '1rs', capitulos: 22 }], [{ livro: '2rs', capitulos: 25 }],
        [{ livro: '1cr', capitulos: 29 }], [{ livro: '2cr', capitulos: 36 }],
        [{ livro: 'ed', capitulos: 10 }], [{ livro: 'ne', capitulos: 13 }],
        [{ livro: 'et', capitulos: 10 }], [{ livro: 'job', capitulos: 42 }],
        [{ livro: 'sl', capitulos: 150 }], [{ livro: 'pv', capitulos: 31 }],
        [{ livro: 'ec', capitulos: 12 }], [{ livro: 'ct', capitulos: 8 }],
        [{ livro: 'is', capitulos: 66 }], [{ livro: 'jr', capitulos: 52 }],
        [{ livro: 'lm', capitulos: 5 }], [{ livro: 'ez', capitulos: 48 }],
        [{ livro: 'dn', capitulos: 12 }],
        [{ livro: 'os', capitulos: 14 }], [{ livro: 'jl', capitulos: 3 }],
        [{ livro: 'am', capitulos: 9 }], [{ livro: 'ob', capitulos: 1 }],
        [{ livro: 'jn', capitulos: 4 }], [{ livro: 'mq', capitulos: 7 }],
        [{ livro: 'na', capitulos: 3 }], [{ livro: 'hc', capitulos: 3 }],
        [{ livro: 'sf', capitulos: 3 }], [{ livro: 'ag', capitulos: 2 }],
        [{ livro: 'zc', capitulos: 14 }], [{ livro: 'ml', capitulos: 4 }],
        [{ livro: 'mt', capitulos: 28 }], [{ livro: 'mc', capitulos: 16 }],
        [{ livro: 'lc', capitulos: 24 }], [{ livro: 'jo', capitulos: 21 }],
        [{ livro: 'at', capitulos: 28 }],
        [{ livro: 'rm', capitulos: 16 }], [{ livro: '1co', capitulos: 16 }],
        [{ livro: '2co', capitulos: 13 }], [{ livro: 'gl', capitulos: 6 }],
        [{ livro: 'ef', capitulos: 6 }], [{ livro: 'fp', capitulos: 4 }],
        [{ livro: 'cl', capitulos: 4 }], [{ livro: '1ts', capitulos: 5 }],
        [{ livro: '2ts', capitulos: 3 }], [{ livro: '1tm', capitulos: 6 }],
        [{ livro: '2tm', capitulos: 4 }], [{ livro: 'tt', capitulos: 3 }],
        [{ livro: 'fm', capitulos: 1 }], [{ livro: 'hb', capitulos: 13 }],
        [{ livro: 'tg', capitulos: 5 }], [{ livro: '1pe', capitulos: 5 }],
        [{ livro: '2pe', capitulos: 3 }], [{ livro: '1jo', capitulos: 5 }],
        [{ livro: '2jo', capitulos: 1 }], [{ livro: '3jo', capitulos: 1 }],
        [{ livro: 'jd', capitulos: 1 }], [{ livro: 'ap', capitulos: 22 }],
      ];
      const todosLivros = cronologia.flat();
      return gerarDiasDeLivros(todosLivros, 365);
    })(),
  },

  'biblia-em-1-ano-canonico': {
    titulo: 'Bíblia em 1 Ano (Canônico)',
    descricao: 'Leia a Bíblia completa na ordem dos livros canônicos, do Gênesis ao Apocalipse.',
    duracao: 365,
    categoria: 'anual',
    nivel: 'iniciante',
    versiculos: (() => {
      const todosLivros = [...AT_LIVROS, ...NT_LIVROS];
      return gerarDiasDeLivros(todosLivros, 365);
    })(),
  },

  'nt-em-90-dias': {
    titulo: 'Novo Testamento em 90 Dias',
    descricao: 'Leia todo o Novo Testamento em 3 meses, com aproximadamente 3 capítulos por dia.',
    duracao: 90,
    categoria: 'anual',
    nivel: 'iniciante',
    versiculos: gerarDiasDeLivros(NT_LIVROS, 90),
  },

  // ═══════════════════════════════════════════════════════════════
  // 2. PLANOS TEMÁTICOS (5)
  // ═══════════════════════════════════════════════════════════════

  'teologia-da-salvacao': {
    titulo: 'Teologia da Salvação',
    descricao: 'Um estudo de 30 dias sobre o plano redentor de Deus, desde a queda no Éden até a glória eterna.',
    duracao: 30,
    categoria: 'tematico',
    nivel: 'intermediario',
    versiculos: [
      { dia: 1, titulo: 'A Queda do Homem', passagens: p([r('gn', 3, 1, 24)]) },
      { dia: 2, titulo: 'A Promessa do Redentor', passagens: p([r('gn', 3, 14, 15)]) },
      { dia: 3, titulo: 'O Sacrifício de Abel', passagens: p([r('gn', 4, 1, 5)]) },
      { dia: 4, titulo: 'A Aliança com Noé', passagens: p([r('gn', 9, 8, 17)]) },
      { dia: 5, titulo: 'A Promessa a Abraão', passagens: p([r('gn', 12, 1, 3)]) },
      { dia: 6, titulo: 'A Aliança Abraâmica', passagens: p([r('gn', 15, 1, 21)]) },
      { dia: 7, titulo: 'O Sacrifício de Isaac', passagens: p([r('gn', 22, 1, 19)]) },
      { dia: 8, titulo: 'O Cordeiro da Páscoa', passagens: p([r('ex', 12, 1, 13)]) },
      { dia: 9, titulo: 'O Propiciatório', passagens: p([r('lv', 16, 1, 34)]) },
      { dia: 10, titulo: 'O Servo Sofredor', passagens: p([r('is', 52, 13, 15), r('is', 53, 1, 12)]) },
      { dia: 11, titulo: 'A Nova Aliança', passagens: p([r('jr', 31, 31, 34)]) },
      { dia: 12, titulo: 'O Batismo de Jesus', passagens: p([r('mt', 3, 13, 17)]) },
      { dia: 13, titulo: 'Nascido de Novo', passagens: p([r('jo', 3, 1, 21)]) },
      { dia: 14, titulo: 'Jesus e a Salvação', passagens: p([r('jo', 4, 1, 42)]) },
      { dia: 15, titulo: 'A Parábola do Filho Pródigo', passagens: p([r('lc', 15, 11, 32)]) },
      { dia: 16, titulo: 'A Cruz e o Perdão', passagens: p([r('lc', 23, 32, 43)]) },
      { dia: 17, titulo: 'Morte e Ressurreição', passagens: p([r('1co', 15, 1, 22)]) },
      { dia: 18, titulo: 'Justificação pela Fé', passagens: p([r('rm', 5, 1, 11)]) },
      { dia: 19, titulo: 'Livres da Condenação', passagens: p([r('rm', 8, 1, 17)]) },
      { dia: 20, titulo: 'Salvos pela Graça', passagens: p([r('ef', 2, 1, 10)]) },
      { dia: 21, titulo: 'A Obra de Cristo', passagens: p([r('cl', 1, 13, 23)]) },
      { dia: 22, titulo: 'Novas Criaturas', passagens: p([r('2co', 5, 16, 21)]) },
      { dia: 23, titulo: 'Redenção em Cristo', passagens: p([r('gl', 3, 10, 14)]) },
      { dia: 24, titulo: 'A Esperança da Glória', passagens: p([r('cl', 1, 24, 29)]) },
      { dia: 25, titulo: 'Predestinação e Eleição', passagens: p([r('rm', 8, 28, 39)]) },
      { dia: 26, titulo: 'O Deus Salvador', passagens: p([r('1tm', 2, 3, 7)]) },
      { dia: 27, titulo: 'Salvação Completa', passagens: p([r('hb', 9, 11, 28)]) },
      { dia: 28, titulo: 'O Apelo à Salvação', passagens: p([r('rm', 10, 8, 17)]) },
      { dia: 29, titulo: 'Segurança dos Salvos', passagens: p([r('jo', 10, 27, 30), r('rm', 8, 38, 39)]) },
      { dia: 30, titulo: 'A Glória Futura', passagens: p([r('ap', 21, 1, 7)]) },
    ],
  },

  'vida-de-cristo': {
    titulo: 'Vida de Cristo',
    descricao: 'Acompanhe a vida de Jesus desde o nascimento até a ascensão em 21 dias de estudo.',
    duracao: 21,
    categoria: 'tematico',
    nivel: 'iniciante',
    versiculos: [
      { dia: 1, titulo: 'A Anunciação', passagens: p([r('lc', 1, 26, 38)]) },
      { dia: 2, titulo: 'O Nascimento de João Batista', passagens: p([r('lc', 1, 57, 80)]) },
      { dia: 3, titulo: 'O Nascimento de Jesus', passagens: p([r('lc', 2, 1, 20)]) },
      { dia: 4, titulo: 'A Apresentação no Templo', passagens: p([r('lc', 2, 21, 40)]) },
      { dia: 5, titulo: 'Os Magos e a Fuga para o Egito', passagens: p([r('mt', 2, 1, 23)]) },
      { dia: 6, titulo: 'Jesus no Templo (aos 12 anos)', passagens: p([r('lc', 2, 41, 52)]) },
      { dia: 7, titulo: 'O Batismo de Jesus', passagens: p([r('mt', 3, 13, 17)]) },
      { dia: 8, titulo: 'A Tentação no Deserto', passagens: p([r('mt', 4, 1, 11)]) },
      { dia: 9, titulo: 'O Chamado dos Primeiros Discípulos', passagens: p([r('mt', 4, 18, 25)]) },
      { dia: 10, titulo: 'O Sermão do Monte (Parte 1)', passagens: p([r('mt', 5, 1, 30)]) },
      { dia: 11, titulo: 'O Sermão do Monte (Parte 2)', passagens: p([r('mt', 5, 31, 48), r('mt', 6, 1, 18)]) },
      { dia: 12, titulo: 'O Sermão do Monte (Parte 3)', passagens: p([r('mt', 6, 19, 34), r('mt', 7, 1, 29)]) },
      { dia: 13, titulo: 'Milagres e Curas', passagens: p([r('mt', 8, 1, 22)]) },
      { dia: 14, titulo: 'A Autoridade de Jesus', passagens: p([r('mt', 9, 1, 17)]) },
      { dia: 15, titulo: 'As Parábolas do Reino', passagens: p([r('mt', 13, 1, 30)]) },
      { dia: 16, titulo: 'Jesus Anda sobre as Águas', passagens: p([r('mt', 14, 22, 33)]) },
      { dia: 17, titulo: 'A Transfiguração', passagens: p([r('mt', 17, 1, 13)]) },
      { dia: 18, titulo: 'O Discurso Escatológico', passagens: p([r('mt', 24, 1, 31)]) },
      { dia: 19, titulo: 'A Última Ceia', passagens: p([r('lc', 22, 7, 38)]) },
      { dia: 20, titulo: 'A Paixão e a Cruz', passagens: p([r('lc', 23, 26, 49)]) },
      { dia: 21, titulo: 'Ressurreição e Ascensão', passagens: p([r('lc', 24, 1, 53)]) },
    ],
  },

  'cartas-de-paulo': {
    titulo: 'Cartas de Paulo',
    descricao: 'Estude as 13 epístolas paulinas em 14 dias, organizadas por tema e ordem cronológica.',
    duracao: 14,
    categoria: 'tematico',
    nivel: 'intermediario',
    versiculos: [
      { dia: 1, titulo: 'Romanos 1-4: Justificação', passagens: p([{ livro: 'rm', capitulo: 1 }, { livro: 'rm', capitulo: 2 }, { livro: 'rm', capitulo: 3 }, { livro: 'rm', capitulo: 4 }]) },
      { dia: 2, titulo: 'Romanos 5-8: Vida em Cristo', passagens: p([{ livro: 'rm', capitulo: 5 }, { livro: 'rm', capitulo: 6 }, { livro: 'rm', capitulo: 7 }, { livro: 'rm', capitulo: 8 }]) },
      { dia: 3, titulo: 'Romanos 9-16: Israel e Prática', passagens: p([{ livro: 'rm', capitulo: 9 }, { livro: 'rm', capitulo: 10 }, { livro: 'rm', capitulo: 11 }, { livro: 'rm', capitulo: 12 }, { livro: 'rm', capitulo: 13 }, { livro: 'rm', capitulo: 14 }, { livro: 'rm', capitulo: 15 }, { livro: 'rm', capitulo: 16 }]) },
      { dia: 4, titulo: '1 Coríntios 1-6: Problemas na Igreja', passagens: p([{ livro: '1co', capitulo: 1 }, { livro: '1co', capitulo: 2 }, { livro: '1co', capitulo: 3 }, { livro: '1co', capitulo: 4 }, { livro: '1co', capitulo: 5 }, { livro: '1co', capitulo: 6 }]) },
      { dia: 5, titulo: '1 Coríntios 7-12: Orientações Práticas', passagens: p([{ livro: '1co', capitulo: 7 }, { livro: '1co', capitulo: 8 }, { livro: '1co', capitulo: 9 }, { livro: '1co', capitulo: 10 }, { livro: '1co', capitulo: 11 }, { livro: '1co', capitulo: 12 }]) },
      { dia: 6, titulo: '1 Coríntios 13-16: Amor e Dons', passagens: p([{ livro: '1co', capitulo: 13 }, { livro: '1co', capitulo: 14 }, { livro: '1co', capitulo: 15 }, { livro: '1co', capitulo: 16 }]) },
      { dia: 7, titulo: '2 Coríntios: Ministério e Aflição', passagens: p([{ livro: '2co', capitulo: 1 }, { livro: '2co', capitulo: 2 }, { livro: '2co', capitulo: 3 }, { livro: '2co', capitulo: 4 }, { livro: '2co', capitulo: 5 }, { livro: '2co', capitulo: 6 }, { livro: '2co', capitulo: 7 }, { livro: '2co', capitulo: 8 }, { livro: '2co', capitulo: 9 }, { livro: '2co', capitulo: 10 }, { livro: '2co', capitulo: 11 }, { livro: '2co', capitulo: 12 }, { livro: '2co', capitulo: 13 }]) },
      { dia: 8, titulo: 'Gálatas: Liberdade em Cristo', passagens: p([{ livro: 'gl', capitulo: 1 }, { livro: 'gl', capitulo: 2 }, { livro: 'gl', capitulo: 3 }, { livro: 'gl', capitulo: 4 }, { livro: 'gl', capitulo: 5 }, { livro: 'gl', capitulo: 6 }]) },
      { dia: 9, titulo: 'Efésios: A Igreja e a Batalha', passagens: p([{ livro: 'ef', capitulo: 1 }, { livro: 'ef', capitulo: 2 }, { livro: 'ef', capitulo: 3 }, { livro: 'ef', capitulo: 4 }, { livro: 'ef', capitulo: 5 }, { livro: 'ef', capitulo: 6 }]) },
      { dia: 10, titulo: 'Filipenses: Alegria em Cristo', passagens: p([{ livro: 'fp', capitulo: 1 }, { livro: 'fp', capitulo: 2 }, { livro: 'fp', capitulo: 3 }, { livro: 'fp', capitulo: 4 }]) },
      { dia: 11, titulo: 'Colossenses: A Supremacia de Cristo', passagens: p([{ livro: 'cl', capitulo: 1 }, { livro: 'cl', capitulo: 2 }, { livro: 'cl', capitulo: 3 }, { livro: 'cl', capitulo: 4 }]) },
      { dia: 12, titulo: '1 Tessalonicenses: A Volta do Senhor', passagens: p([{ livro: '1ts', capitulo: 1 }, { livro: '1ts', capitulo: 2 }, { livro: '1ts', capitulo: 3 }, { livro: '1ts', capitulo: 4 }, { livro: '1ts', capitulo: 5 }]) },
      { dia: 13, titulo: '2 Tessalonicenses e 1 Timóteo', passagens: p([{ livro: '2ts', capitulo: 1 }, { livro: '2ts', capitulo: 2 }, { livro: '2ts', capitulo: 3 }, { livro: '1tm', capitulo: 1 }, { livro: '1tm', capitulo: 2 }, { livro: '1tm', capitulo: 3 }, { livro: '1tm', capitulo: 4 }, { livro: '1tm', capitulo: 5 }, { livro: '1tm', capitulo: 6 }]) },
      { dia: 14, titulo: '2 Timóteo, Tito e Filemom', passagens: p([{ livro: '2tm', capitulo: 1 }, { livro: '2tm', capitulo: 2 }, { livro: '2tm', capitulo: 3 }, { livro: '2tm', capitulo: 4 }, { livro: 'tt', capitulo: 1 }, { livro: 'tt', capitulo: 2 }, { livro: 'tt', capitulo: 3 }, { livro: 'fm', capitulo: 1 }]) },
    ],
  },

  'literatura-de-sabedoria': {
    titulo: 'Literatura de Sabedoria',
    descricao: 'Estude Jó, Salmos, Provérbios, Eclesiastes e Cânticos em 21 dias.',
    duracao: 21,
    categoria: 'tematico',
    nivel: 'intermediario',
    versiculos: gerarDiasDeLivros([
      { livro: 'job', capitulos: 42 }, { livro: 'sl', capitulos: 150 },
      { livro: 'pv', capitulos: 31 }, { livro: 'ec', capitulos: 12 },
      { livro: 'ct', capitulos: 8 },
    ], 21),
  },

  'profecia-e-fim-dos-tempos': {
    titulo: 'Profecia e Fim dos Tempos',
    descricao: 'Estude as principais profecias bíblicas e o que a Bíblia diz sobre o fim dos tempos em 14 dias.',
    duracao: 14,
    categoria: 'tematico',
    nivel: 'avancado',
    versiculos: [
      { dia: 1, titulo: 'Profecias Messiânicas no AT', passagens: p([r('is', 7, 14, 14), r('is', 9, 6, 7), r('is', 53, 1, 12)]) },
      { dia: 2, titulo: 'Daniel e os Reinos', passagens: p([r('dn', 2, 27, 49), r('dn', 7, 1, 28)]) },
      { dia: 3, titulo: 'Daniel: As 70 Semanas', passagens: p([r('dn', 9, 20, 27)]) },
      { dia: 4, titulo: 'Os Profetas Menores e o Dia do Senhor', passagens: p([r('jl', 2, 1, 32), r('am', 5, 18, 27)]) },
      { dia: 5, titulo: 'Zacarias: Profecias sobre o Messias', passagens: p([r('zc', 9, 9, 10), r('zc', 12, 10, 14), r('zc', 14, 1, 21)]) },
      { dia: 6, titulo: 'Jesus sobre o Fim dos Tempos', passagens: p([r('mt', 24, 1, 51)]) },
      { dia: 7, titulo: 'As Parábolas Escatológicas', passagens: p([r('mt', 25, 1, 46)]) },
      { dia: 8, titulo: 'Sinais da Volta de Cristo', passagens: p([r('1ts', 4, 13, 18), r('2ts', 2, 1, 12)]) },
      { dia: 9, titulo: 'O Arrebatamento e a Ressurreição', passagens: p([r('1co', 15, 51, 58), r('1ts', 4, 13, 18)]) },
      { dia: 10, titulo: 'Apocalipse: As Sete Igrejas', passagens: p([r('ap', 1, 1, 20), r('ap', 2, 1, 29), r('ap', 3, 1, 22)]) },
      { dia: 11, titulo: 'Apocalipse: Os Sete Sinais', passagens: p([{ livro: 'ap', capitulo: 4 }, { livro: 'ap', capitulo: 5 }, { livro: 'ap', capitulo: 6 }, r('ap', 7, 1, 17)]) },
      { dia: 12, titulo: 'Apocalipse: As Trombetas e Taças', passagens: p([{ livro: 'ap', capitulo: 8 }, { livro: 'ap', capitulo: 9 }, { livro: 'ap', capitulo: 10 }, r('ap', 11, 1, 19), { livro: 'ap', capitulo: 15 }, { livro: 'ap', capitulo: 16 }]) },
      { dia: 13, titulo: 'Apocalipse: A Babilônia e o Anticristo', passagens: p([{ livro: 'ap', capitulo: 13 }, { livro: 'ap', capitulo: 17 }, { livro: 'ap', capitulo: 18 }]) },
      { dia: 14, titulo: 'Apocalipse: A Vitória Final', passagens: p([r('ap', 19, 11, 21), r('ap', 20, 1, 15), r('ap', 21, 1, 8), r('ap', 22, 1, 5)]) },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // 3. ESTUDOS POR LIVRO (7)
  // ═══════════════════════════════════════════════════════════════

  'estudo-de-geneses': {
    titulo: 'Estudo de Gênesis',
    descricao: 'Um estudo aprofundado do livro de Gênesis: criação, patriarcas e origens da humanidade.',
    duracao: 30,
    categoria: 'estudo-de-livro',
    nivel: 'iniciante',
    versiculos: (() => {
      const dias: LeituraDia[] = [];
      for (let d = 1; d <= 30; d++) {
        const capInicio = ((d - 1) * 2) + 1;
        const passagens: LeituraDia['passagens'] = [];
        if (capInicio <= 50) passagens.push({ livro: 'gn', capitulo: capInicio });
        if (capInicio + 1 <= 50) passagens.push({ livro: 'gn', capitulo: capInicio + 1 });
        dias.push({ dia: d, titulo: `Gênesis ${passagens.map(p => p.capitulo).join('-')}`, passagens });
      }
      return dias;
    })(),
  },

  'estudo-de-salmos': {
    titulo: 'Estudo de Salmos',
    descricao: 'Leia e medite nos 150 Salmos durante 30 dias, com 5 salmos por dia.',
    duracao: 30,
    categoria: 'estudo-de-livro',
    nivel: 'iniciante',
    versiculos: (() => {
      const dias: LeituraDia[] = [];
      for (let d = 1; d <= 30; d++) {
        const inicio = (d - 1) * 5 + 1;
        const passagens: LeituraDia['passagens'] = [];
        for (let i = 0; i < 5 && inicio + i <= 150; i++) {
          passagens.push({ livro: 'sl', capitulo: inicio + i });
        }
        dias.push({ dia: d, titulo: `Salmos ${inicio}-${Math.min(inicio + 4, 150)}`, passagens });
      }
      return dias;
    })(),
  },

  'estudo-de-proverbios': {
    titulo: 'Estudo de Provérbios',
    descricao: 'Leia um capítulo de Provérbios por dia durante 31 dias — um mês de sabedoria prática.',
    duracao: 31,
    categoria: 'estudo-de-livro',
    nivel: 'iniciante',
    versiculos: (() => {
      const dias: LeituraDia[] = [];
      for (let d = 1; d <= 31; d++) {
        dias.push({ dia: d, titulo: `Provérbios ${d}`, passagens: [{ livro: 'pv', capitulo: d }] });
      }
      return dias;
    })(),
  },

  'estudo-de-isaias': {
    titulo: 'Estudo de Isaías',
    descricao: 'Um estudo de 30 dias do maior livro profético do Antigo Testamento.',
    duracao: 30,
    categoria: 'estudo-de-livro',
    nivel: 'intermediario',
    versiculos: (() => {
      const dias: LeituraDia[] = [];
      for (let d = 1; d <= 30; d++) {
        const capInicio = Math.floor(((d - 1) * 66) / 30) + 1;
        const capFim = Math.floor((d * 66) / 30);
        const passagens: LeituraDia['passagens'] = [];
        for (let c = capInicio; c <= capFim && c <= 66; c++) {
          passagens.push({ livro: 'is', capitulo: c });
        }
        if (passagens.length === 0) passagens.push({ livro: 'is', capitulo: 66 });
        dias.push({ dia: d, titulo: `Isaías ${passagens.map(p => p.capitulo).join('-')}`, passagens });
      }
      return dias;
    })(),
  },

  'estudo-de-mateus': {
    titulo: 'Estudo de Mateus',
    descricao: 'Estude o Evangelho de Mateus capítulo por capítulo em 28 dias.',
    duracao: 28,
    categoria: 'estudo-de-livro',
    nivel: 'iniciante',
    versiculos: (() => {
      const dias: LeituraDia[] = [];
      for (let d = 1; d <= 28; d++) {
        dias.push({ dia: d, titulo: `Mateus ${d}`, passagens: [{ livro: 'mt', capitulo: d }] });
      }
      return dias;
    })(),
  },

  'estudo-de-joao': {
    titulo: 'Estudo de João',
    descricao: 'Um estudo aprofundado do Evangelho de João em 21 dias, contemplando a divindade de Cristo.',
    duracao: 21,
    categoria: 'estudo-de-livro',
    nivel: 'iniciante',
    versiculos: (() => {
      const dias: LeituraDia[] = [];
      for (let d = 1; d <= 21; d++) {
        dias.push({ dia: d, titulo: `João ${d}`, passagens: [{ livro: 'jo', capitulo: d }] });
      }
      return dias;
    })(),
  },

  'estudo-de-romanos': {
    titulo: 'Estudo de Romanos',
    descricao: 'Estude a epístola mais sistemática de Paulo em 16 dias, explorando a doutrina da salvação.',
    duracao: 16,
    categoria: 'estudo-de-livro',
    nivel: 'intermediario',
    versiculos: (() => {
      const dias: LeituraDia[] = [];
      for (let d = 1; d <= 16; d++) {
        dias.push({ dia: d, titulo: `Romanos ${d}`, passagens: [{ livro: 'rm', capitulo: d }] });
      }
      return dias;
    })(),
  },

  // ═══════════════════════════════════════════════════════════════
  // 4. PLANOS DEVOCIONAIS (5)
  // ═══════════════════════════════════════════════════════════════

  'manhas-de-misericordia': {
    titulo: 'Manhãs de Misericórdia',
    descricao: 'Comece cada manhã com versículos que renovam a esperança e a graça de Deus. 30 dias de leitura matinal.',
    duracao: 30,
    categoria: 'devocional',
    nivel: 'iniciante',
    versiculos: [
      { dia: 1, titulo: 'Misericórdia Nova a Cada Dia', passagens: p([r('lm', 3, 22, 23), r('mt', 6, 34, 34)]) },
      { dia: 2, titulo: 'A Graça Suficiente', passagens: p([r('2co', 12, 9, 9), r('1co', 10, 13, 13)]) },
      { dia: 3, titulo: 'O Amor que Não Falha', passagens: p([r('1co', 13, 4, 8), r('rm', 8, 38, 39)]) },
      { dia: 4, titulo: 'Força nos Momentos Fracos', passagens: p([r('is', 40, 31, 31), r('2co', 12, 10, 10)]) },
      { dia: 5, titulo: 'O Pastor que Cuida', passagens: p([r('sl', 23, 1, 6)]) },
      { dia: 6, titulo: 'Descanso em Deus', passagens: p([r('mt', 11, 28, 30), r('is', 26, 3, 3)]) },
      { dia: 7, titulo: 'A Paz que Excede', passagens: p([r('fp', 4, 6, 7)]) },
      { dia: 8, titulo: 'Confiança no Senhor', passagens: p([r('pv', 3, 5, 6), r('is', 41, 10, 10)]) },
      { dia: 9, titulo: 'Alegria no Senhor', passagens: p([r('fp', 4, 4, 4), r('ne', 8, 10, 10)]) },
      { dia: 10, titulo: 'Luz nos Escuridão', passagens: p([r('sl', 119, 105, 105), r('jo', 8, 12, 12)]) },
      { dia: 11, titulo: 'O Nome Poderoso', passagens: p([r('pf', 6, 6, 6), r('at', 4, 12, 12), r('fp', 2, 9, 11)]) },
      { dia: 12, titulo: 'Perdão Transformador', passagens: p([r('ef', 4, 31, 32), r('cl', 3, 13, 13)]) },
      { dia: 13, titulo: 'A Coragem de Josué', passagens: p([r('js', 1, 9, 9), r('dt', 31, 6, 8)]) },
      { dia: 14, titulo: 'Liberdade em Cristo', passagens: p([r('gl', 5, 1, 1), r('jo', 8, 36, 36)]) },
      { dia: 15, titulo: 'Cuidado Matinal', passagens: p([r('sl', 5, 3, 3), r('sl', 143, 8, 8), r('mt', 5, 45, 45)]) },
      { dia: 16, titulo: 'A.fonte da Vida', passagens: p([r('sl', 36, 9, 9), r('jo', 4, 13, 14)]) },
      { dia: 17, titulo: 'Proteção Divina', passagens: p([r('sl', 91, 1, 16)]) },
      { dia: 18, titulo: 'Sabedoria para o Dia', passagens: p([r('pv', 2, 6, 6), r('tg', 1, 5, 5)]) },
      { dia: 19, titulo: 'Gratidão em Tudo', passagens: p([r('1ts', 5, 16, 18), r('fl', 4, 6, 6)]) },
      { dia: 20, titulo: 'A Palavra Viva', passagens: p([r('hb', 4, 12, 12), r('2tm', 3, 16, 17)]) },
      { dia: 21, titulo: 'Esperança Renovada', passagens: p([r('rm', 15, 13, 13), r('is', 43, 18, 19)]) },
      { dia: 22, titulo: 'O Braço do Senhor', passagens: p([r('is', 53, 1, 1), r('is', 59, 1, 1), r('is', 40, 10, 11)]) },
      { dia: 23, titulo: 'Aclamação Matinal', passagens: p([r('sl', 59, 16, 17), r('sl', 63, 1, 4)]) },
      { dia: 24, titulo: 'Clemência e Verdade', passagens: p([r('sl', 86, 15, 15), r('sl', 103, 8, 10)]) },
      { dia: 25, titulo: 'Renovação Interior', passagens: p([r('is', 40, 28, 31), r('2co', 4, 16, 18)]) },
      { dia: 26, titulo: 'Compromisso com Deus', passagens: p([r('js', 24, 14, 15), r('dt', 6, 5, 5)]) },
      { dia: 27, titulo: 'Deus Conhece o Caminho', passagens: p([r('job', 23, 8, 12), r('sl', 37, 23, 24)]) },
      { dia: 28, titulo: 'A Vontade de Deus', passagens: p([r('rm', 12, 1, 2), r('ef', 2, 10, 10)]) },
      { dia: 29, titulo: 'Comunhão com o Espírito', passagens: p([r('gl', 5, 22, 25), r('ef', 5, 18, 18)]) },
      { dia: 30, titulo: 'O Caminho, a Verdade e a Vida', passagens: p([r('jo', 14, 6, 6), r('jo', 15, 4, 5), r('ap', 22, 20, 20)]) },
    ],
  },

  'reflexoes-da-noite': {
    titulo: 'Reflexões da Noite',
    descricao: 'Encerre o dia com versículos de paz, gratidão e descanso em Deus. 30 dias de leitura noturna.',
    duracao: 30,
    categoria: 'devocional',
    nivel: 'iniciante',
    versiculos: [
      { dia: 1, titulo: 'Descanso no Senhor', passagens: p([r('sl', 4, 8, 8), r('sl', 63, 6, 6)]) },
      { dia: 2, titulo: 'Solução dos Pesares', passagens: p([r('sl', 55, 22, 22), r('1pe', 5, 7, 7)]) },
      { dia: 3, titulo: 'Paz no Escuro', passagens: p([r('sl', 16, 7, 7), r('is', 26, 3, 3)]) },
      { dia: 4, titulo: 'A Noite Passa', passagens: p([r('sl', 30, 5, 5), r('jo', 16, 33, 33)]) },
      { dia: 5, titulo: 'Confiança Plena', passagens: p([r('sl', 37, 5, 7), r('1pe', 5, 6, 7)]) },
      { dia: 6, titulo: 'O Que Apreendi Hoje', passagens: p([r('sl', 119, 148, 148), r('pv', 8, 34, 34)]) },
      { dia: 7, titulo: 'Perdão e Descanso', passagens: p([r('mt', 6, 12, 14), r('ef', 4, 26, 26)]) },
      { dia: 8, titulo: 'Guarda de Deus', passagens: p([r('sl', 121, 1, 8), r('sl', 4, 8, 8)]) },
      { dia: 9, titulo: 'A Estrela da Manhã', passagens: p([r('2pe', 1, 19, 19), r('ap', 22, 16, 16), r('sl', 130, 6, 6)]) },
      { dia: 10, titulo: 'Rumo ao Reposo', passagens: p([r('hb', 4, 9, 11)]) },
      { dia: 11, titulo: 'Louvor Noturno', passagens: p([r('sl', 92, 1, 4), r('sl', 63, 6, 6)]) },
      { dia: 12, titulo: 'A Noite Clama', passagens: p([r('sl', 63, 1, 1), r('sl', 88, 1, 1), r('sl', 119, 62, 62)]) },
      { dia: 13, titulo: 'Ressurreição da Esperança', passagens: p([r('rm', 8, 18, 18), r('2co', 4, 16, 18)]) },
      { dia: 14, titulo: 'O Dia Termina, Deus Não Dorme', passagens: p([r('sl', 121, 3, 4), r('is', 27, 3, 3)]) },
      { dia: 15, titulo: 'Gratidão Antes de Dormir', passagens: p([r('1ts', 5, 16, 18), r('sl', 136, 1, 3)]) },
      { dia: 16, titulo: 'A Palavra que Acolhe', passagens: p([r('sl', 119, 50, 50), r('is', 66, 13, 13), r('mt', 11, 28, 28)]) },
      { dia: 17, titulo: 'Liberdade da Ansiedade', passagens: p([r('fp', 4, 6, 7), r('1pe', 5, 7, 7)]) },
      { dia: 18, titulo: 'Coração Agradecido', passagens: p([r('sl', 103, 1, 5)]) },
      { dia: 19, titulo: 'O Dia que Passou', passagens: p([r('lm', 3, 22, 23), r('sl', 90, 12, 12)]) },
      { dia: 20, titulo: 'Noite de Louvor', passagens: p([r('sl', 150, 1, 6)]) },
      { dia: 21, titulo: 'Olhos Postos no Alto', passagens: p([r('sl', 123, 1, 2), r('cl', 3, 1, 2)]) },
      { dia: 22, titulo: 'Fé que Descansa', passagens: p([r('hb', 11, 1, 1), r('hb', 4, 3, 3)]) },
      { dia: 23, titulo: 'A Cidade Futura', passagens: p([r('hb', 13, 14, 14), r('ap', 21, 1, 4)]) },
      { dia: 24, titulo: 'Coração Acolhido', passagens: p([r('sl', 42, 8, 8), r('is', 66, 13, 13)]) },
      { dia: 25, titulo: 'Rumo ao Céu', passagens: p([r('fl', 3, 20, 21), r('2co', 5, 1, 1)]) },
      { dia: 26, titulo: 'Noite de Gratidão', passagens: p([r('sl', 107, 1, 3), r('sl', 95, 1, 3)]) },
      { dia: 27, titulo: 'O Pastor Me Acolhe', passagens: p([r('sl', 23, 1, 6), r('jo', 10, 14, 14)]) },
      { dia: 28, titulo: 'Vontade Feita em Cristo', passagens: p([r('ef', 2, 10, 10), r('fl', 2, 13, 13)]) },
      { dia: 29, titulo: 'A Esperança Não Falha', passagens: p([r('rm', 8, 24, 25), r('sl', 42, 11, 11)]) },
      { dia: 30, titulo: 'Vem, Senhor Jesus', passagens: p([r('ap', 22, 20, 20), r('sl', 91, 1, 2), r('sl', 4, 8, 8)]) },
    ],
  },

  'oracoes-da-biblia': {
    titulo: 'Orações da Bíblia',
    descricao: '21 dias estudando as orações mais poderosas da Bíblia, de Abraão a Jesus.',
    duracao: 21,
    categoria: 'devocional',
    nivel: 'iniciante',
    versiculos: [
      { dia: 1, titulo: 'Oração de Abraão por Sodoma', passagens: p([r('gn', 18, 22, 33)]) },
      { dia: 2, titulo: 'A Súplica de Jacó', passagens: p([r('gn', 32, 9, 12)]) },
      { dia: 3, titulo: 'A Oração de Moisés', passagens: p([r('ex', 32, 11, 14), r('nm', 14, 13, 19)]) },
      { dia: 4, titulo: 'A Oração de Ana', passagens: p([r('1sm', 2, 1, 10)]) },
      { dia: 5, titulo: 'A Oração de Salomão', passagens: p([r('1rs', 8, 22, 53)]) },
      { dia: 6, titulo: 'Oração de Jó', passagens: p([r('job', 42, 1, 6)]) },
      { dia: 7, titulo: 'Salmo 51: Arrependimento', passagens: p([r('sl', 51, 1, 19)]) },
      { dia: 8, titulo: 'Salmo 23: O Pastor', passagens: p([r('sl', 23, 1, 6)]) },
      { dia: 9, titulo: 'Salmo 139: Conhecido por Deus', passagens: p([r('sl', 139, 1, 24)]) },
      { dia: 10, titulo: 'Oração de Ezequias', passagens: p([r('is', 38, 1, 8)]) },
      { dia: 11, titulo: 'Oração de Daniel', passagens: p([r('dn', 9, 1, 19)]) },
      { dia: 12, titulo: 'Oração de Jonas', passagens: p([r('jn', 2, 1, 9)]) },
      { dia: 13, titulo: 'Oração de Habacuque', passagens: p([r('hc', 3, 1, 19)]) },
      { dia: 14, titulo: 'Oração de Acazias', passagens: p([r('jz', 4, 1, 3), r('jz', 4, 6, 7)]) },
      { dia: 15, titulo: 'Oração de Manassés', passagens: p([r('2cr', 33, 12, 13)]) },
      { dia: 16, titulo: 'Oração de Neemias', passagens: p([r('ne', 1, 1, 11)]) },
      { dia: 17, titulo: 'Oração de Esdras', passagens: p([r('ed', 9, 1, 15)]) },
      { dia: 18, titulo: 'Oração de Estêr', passagens: p([r('et', 4, 15, 17)]) },
      { dia: 19, titulo: 'O Pai Nosso', passagens: p([r('mt', 6, 9, 13)]) },
      { dia: 20, titulo: 'A Oração de Jesus', passagens: p([r('jn', 17, 1, 26)]) },
      { dia: 21, titulo: 'A Oração de Estêr', passagens: p([r('et', 4, 15, 17), r('at', 4, 24, 31), r('ef', 3, 14, 21)]) },
    ],
  },

  'promessas-de-deus': {
    titulo: 'Promessas de Deus',
    descricao: '30 dias descobrindo as promessas de Deus para a sua vida, desde a criação até o novo céu.',
    duracao: 30,
    categoria: 'devocional',
    nivel: 'iniciante',
    versiculos: [
      { dia: 1, titulo: 'Promessa de Criação', passagens: p([r('gn', 1, 28, 31)]) },
      { dia: 2, titulo: 'Promessa de Provisão', passagens: p([r('gn', 22, 13, 14), r('mt', 6, 25, 34)]) },
      { dia: 3, titulo: 'Promessa de Aliança', passagens: p([r('gn', 12, 1, 3), r('gn', 15, 1, 5)]) },
      { dia: 4, titulo: 'Promessa de Proteção', passagens: p([r('gn', 15, 1, 1), r('sl', 91, 1, 16)]) },
      { dia: 5, titulo: 'Promessa de Descanso', passagens: p([r('mt', 11, 28, 30), r('is', 26, 3, 3)]) },
      { dia: 6, titulo: 'Promessa de Salvação', passagens: p([r('is', 53, 5, 6), r('jo', 3, 16, 16)]) },
      { dia: 7, titulo: 'Promessa de Perdão', passagens: p([r('1jo', 1, 9, 9), r('sl', 103, 8, 12)]) },
      { dia: 8, titulo: 'Promessa de Vitória', passagens: p([r('rm', 8, 37, 37), r('1co', 15, 57, 57)]) },
      { dia: 9, titulo: 'Promessa de Nova Criatura', passagens: p([r('2co', 5, 17, 17), r('gl', 6, 15, 15)]) },
      { dia: 10, titulo: 'Promessa de Pazes', passagens: p([r('fp', 4, 6, 7), r('is', 26, 3, 3), r('jn', 14, 27, 27)]) },
      { dia: 11, titulo: 'Promessa de Força', passagens: p([r('is', 40, 31, 31), r('fp', 4, 13, 13), r('2co', 12, 9, 10)]) },
      { dia: 12, titulo: 'Promessa de Direção', passagens: p([r('pv', 3, 5, 6), r('sl', 32, 8, 8), r('is', 30, 21, 21)]) },
      { dia: 13, titulo: 'Promessa de Acolhimento', passagens: p([r('hb', 13, 5, 5), r('mt', 28, 20, 20), r('js', 1, 9, 9)]) },
      { dia: 14, titulo: 'Promessa de Água Viva', passagens: p([r('jo', 4, 13, 14), r('jo', 7, 37, 39), r('is', 55, 1, 3)]) },
      { dia: 15, titulo: 'Promessa de Justiça', passagens: p([r('is', 55, 6, 7), r('ml', 3, 10, 12), r('2co', 9, 8, 11)]) },
      { dia: 16, titulo: 'Promessa de Vitória sobre o Pecado', passagens: p([r('rm', 6, 14, 14), r('1co', 10, 13, 13), r('gl', 5, 1, 1)]) },
      { dia: 17, titulo: 'Promessa de Luz', passagens: p([r('sl', 119, 105, 105), r('jo', 8, 12, 12), r('is', 9, 2, 2)]) },
      { dia: 18, titulo: 'Promessa de Alegria', passagens: p([r('sl', 37, 4, 4), r('jn', 15, 11, 11), r('fp', 4, 4, 4)]) },
      { dia: 19, titulo: 'Promessa de Sabedoria', passagens: p([r('pv', 2, 6, 6), r('ti', 1, 5, 5), r('tm', 1, 14, 14)]) },
      { dia: 20, titulo: 'Promessa de Sustento', passagens: p([r('fl', 4, 19, 19), r('sl', 37, 25, 26), r('is', 46, 3, 4)]) },
      { dia: 21, titulo: 'Promessa de Coração', passagens: p([r('ez', 36, 26, 27), r('2co', 1, 22, 22), r('ef', 1, 13, 14)]) },
      { dia: 22, titulo: 'Promessa de Comunhão', passagens: p([r('2co', 6, 16, 18), r('hb', 13, 5, 5), r('1co', 3, 16, 17)]) },
      { dia: 23, titulo: 'Promessa de Corpo Resgatado', passagens: p([r('fl', 3, 20, 21), r('1co', 6, 19, 20), r('rm', 8, 23, 23)]) },
      { dia: 24, titulo: 'Promessa de Morada', passagens: p([r('jn', 14, 2, 3), r('ap', 21, 1, 4), r('2co', 5, 1, 1)]) },
      { dia: 25, titulo: 'Promessa de Ressurreição', passagens: p([r('jn', 11, 25, 26), r('1co', 15, 42, 44), r('1ts', 4, 16, 17)]) },
      { dia: 26, titulo: 'Promessa de Vida Eterna', passagens: p([r('jo', 3, 16, 16), r('jo', 10, 28, 29), r('rm', 6, 22, 23)]) },
      { dia: 27, titulo: 'Promessa de Nova Aliança', passagens: p([r('jr', 31, 31, 34), r('hb', 8, 10, 12), r('eb', 10, 16, 17)]) },
      { dia: 28, titulo: 'Promessa de Volta', passagens: p([r('jn', 14, 3, 3), r('ap', 22, 12, 13), r('1ts', 4, 16, 18)]) },
      { dia: 29, titulo: 'Promessa de Nova Terra', passagens: p([r('2pe', 3, 13, 13), r('ap', 21, 1, 5), r('is', 65, 17, 17)]) },
      { dia: 30, titulo: 'Promessa de Vitória Final', passagens: p([r('ap', 21, 4, 4), r('ap', 22, 3, 5), r('rm', 8, 38, 39)]) },
    ],
  },

  'nomes-de-deus': {
    titulo: 'Nomes de Deus',
    descricao: '21 dias descobrindo os nomes de Deus na Bíblia e o que cada um revela sobre o seu caráter.',
    duracao: 21,
    categoria: 'devocional',
    nivel: 'iniciante',
    versiculos: [
      { dia: 1, titulo: 'Elohim — O Criador Todo-Poderoso', passagens: p([r('gn', 1, 1, 1), r('gn', 1, 26, 27), r('nm', 16, 22, 22)]) },
      { dia: 2, titulo: 'Jeová Jireh — O Senhor Proverá', passagens: p([r('gn', 22, 13, 14), r('mt', 6, 25, 34)]) },
      { dia: 3, titulo: 'El Shaddai — O Todo-Poderoso', passagens: p([r('gn', 17, 1, 1), r('gn', 28, 3, 4), r('2co', 12, 9, 10)]) },
      { dia: 4, titulo: 'Adonai — O Senhor', passagens: p([r('gn', 15, 2, 2), r('is', 6, 1, 1), r('sl', 8, 1, 9)]) },
      { dia: 5, titulo: 'Jeová — O Senhor da Aliança', passagens: p([r('ex', 3, 14, 15), r('ex', 6, 2, 8), r('is', 43, 3, 3)]) },
      { dia: 6, titulo: 'Jeová Rapha — O Senhor que Cura', passagens: p([r('ex', 15, 25, 26), r('2co', 12, 9, 9), r('sl', 103, 1, 5)]) },
      { dia: 7, titulo: 'Jeová Nissi — O Senhor é a Minha Bandeira', passagens: p([r('ex', 17, 8, 16), r('2co', 10, 3, 5), r('1co', 15, 57, 57)]) },
      { dia: 8, titulo: 'Jeová Shalom — O Senhor é Paz', passagens: p([r('jz', 6, 23, 24), r('fp', 4, 6, 7), r('jn', 14, 27, 27)]) },
      { dia: 9, titulo: 'Jeová Rohi — O Senhor é o Meu Pastor', passagens: p([r('sl', 23, 1, 6), r('jn', 10, 11, 14)]) },
      { dia: 10, titulo: 'Jeová Sidkenu — O Senhor é Justiça', passagens: p([r('jr', 23, 5, 6), r('2co', 5, 21, 21), r('rm', 3, 25, 26)]) },
      { dia: 11, titulo: 'Jeová Shammah — O Senhor Está Ali', passagens: p([r('ez', 48, 35, 35), r('mt', 28, 20, 20), r('hb', 13, 5, 5)]) },
      { dia: 12, titulo: 'Jeová Rapha — O Senhor que Sarou', passagens: p([r('ex', 15, 26, 26), r('is', 53, 4, 5), r('1pe', 2, 24, 24)]) },
      { dia: 13, titulo: 'Jeová Kadosh — O Senhor Santo', passagens: p([r('is', 6, 1, 8), r('1pe', 1, 15, 16), r('lv', 19, 2, 2)]) },
      { dia: 14, titulo: 'El Elyon — O Deus Altíssimo', passagens: p([r('gn', 14, 18, 20), r('sl', 78, 35, 35), r('sl', 92, 1, 2)]) },
      { dia: 15, titulo: 'El Olam — O Deus Eterno', passagens: p([r('gn', 21, 33, 33), r('is', 40, 28, 28), r('rm', 16, 26, 26)]) },
      { dia: 16, titulo: 'El Rapha — O Deus que Cura', passagens: p([r('dt', 32, 39, 39), r('sl', 103, 1, 3), r('1co', 12, 9, 9)]) },
      { dia: 17, titulo: 'O Bom Pastor', passagens: p([r('sl', 23, 1, 6), r('jn', 10, 10, 14), r('1pe', 2, 25, 25)]) },
      { dia: 18, titulo: 'O Cordeiro de Deus', passagens: p([r('jn', 1, 29, 29), r('ap', 5, 6, 7), r('1pe', 1, 18, 19)]) },
      { dia: 19, titulo: 'A Rocha', passagens: p([r('1co', 10, 4, 4), r('dt', 32, 4, 4), r('2co', 12, 9, 9)]) },
      { dia: 20, titulo: 'A Luz do Mundo', passagens: p([r('jn', 8, 12, 12), r('jn', 9, 5, 5), r('1jo', 1, 5, 7)]) },
      { dia: 21, titulo: 'O Alfa e o Ômega', passagens: p([r('ap', 1, 8, 8), r('ap', 22, 13, 13), r('is', 44, 6, 6)]) },
    ],
  },
};

// Legacy planos for backward compatibility
export const planos: Record<string, { nome: string; desc: string; totalDias: number }> = {
  biblicoEm1Ano: { nome: 'Bíblia em 1 Ano', desc: 'Leia a Bíblia completa em 365 dias', totalDias: 365 },
  ntEm30Dias: { nome: 'Novo Testamento em 30 Dias', desc: 'Leia o NT em um mês', totalDias: 30 },
  sabedoria: { nome: 'Sabedoria em 31 Dias', desc: 'Provérbios e Sabedoria', totalDias: 31 },
  evangelhos: { nome: 'Evangelhos em 40 Dias', desc: 'Mateus, Marcos, Lucas, João', totalDias: 40 },
  salmos: { nome: 'Salmos em 60 Dias', desc: 'Leia todos os Salmos', totalDias: 60 },
};

function lerDia(dia: number, total: number, base: number, salto: number): number {
  return base + ((dia - 1) * salto);
}

export function gerarPlano(id: string): LeituraDia[] {
  if (novosPlanos[id]) return novosPlanos[id].versiculos;

  const dias: LeituraDia[] = [];

  switch (id) {
    case 'biblicoEm1Ano':
      for (let d = 1; d <= 365; d++) {
        const dia: LeituraDia = { dia: d, titulo: `Dia ${d}`, passagens: [] };
        const atInicio = lerDia(d, 365, 1, 3);
        if (atInicio <= 929) {
          dia.passagens.push({ livro: 'gn', capitulo: atInicio });
          if (atInicio + 1 <= 929) dia.passagens.push({ livro: 'gn', capitulo: atInicio + 1 });
          if (atInicio + 2 <= 929) dia.passagens.push({ livro: 'gn', capitulo: atInicio + 2 });
        }
        const ntInicio = lerDia(d, 365, 1, 1);
        if (ntInicio <= 260) {
          dia.passagens.push({ livro: 'mt', capitulo: ntInicio });
        }
        dias.push(dia);
      }
      break;

    case 'ntEm30Dias':
      for (let d = 1; d <= 30; d++) {
        const inicio = lerDia(d, 30, 1, 9);
        dias.push({
          dia: d,
          titulo: `Dia ${d}`,
          passagens: Array.from({ length: 9 }, (_, i) => {
            const cap = inicio + i;
            return { livro: 'mt', capitulo: cap > 260 ? cap - 260 : cap };
          }),
        });
      }
      break;

    case 'sabedoria':
      for (let d = 1; d <= 31; d++) {
        dias.push({
          dia: d,
          titulo: `Provérbios ${d}`,
          passagens: [{ livro: 'pv', capitulo: d }],
        });
      }
      break;

    case 'evangelhos':
      {
        const livros = ['mt', 'mc', 'lc', 'jo'];
        let idx = 0;
        for (let d = 1; d <= 40; d++) {
          const l = livros[Math.min(Math.floor((d - 1) / 10), 3)];
          dias.push({
            dia: d,
            titulo: `${d} - ${l}`,
            passagens: [{ livro: l, capitulo: ((d - 1) % 10) + 1 }],
          });
        }
      }
      break;

    case 'salmos':
      for (let d = 1; d <= 60; d++) {
        dias.push({
          dia: d,
          titulo: `Salmo ${d}`,
          passagens: [{ livro: 'sl', capitulo: d }],
        });
      }
      break;

    default:
      dias.push({ dia: 1, titulo: 'Início', passagens: [{ livro: 'gn', capitulo: 1 }] });
  }

  return dias;
}
