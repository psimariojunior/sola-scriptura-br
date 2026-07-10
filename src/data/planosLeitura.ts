// Reading plans - devocional diario
export interface LeituraDiaria {
  dia: number;
  livros: string;
  capitulos: string[];
  titulo: string;
  descricao: string;
}

export interface PlanoLeitura {
  id: string;
  nome: string;
  descricao: string;
  duracao: string;
  categoria: 'bh' | 'nt' | 'completo' | 'tematico';
  icone: string;
  planos: LeituraDiaria[];
}

export const planosLeitura: PlanoLeitura[] = [
  {
    id: 'bh-inteira-90',
    nome: 'Bíblia em 90 Dias',
    descricao: 'Leia toda a Bíblia em apenas 90 dias com este plano estruturado',
    duracao: '90 dias',
    categoria: 'completo',
    icone: '📖',
    planos: Array.from({ length: 90 }, (_, i) => ({
      dia: i + 1,
      livros: getPlano90Dias(i).livros,
      capitulos: getPlano90Dias(i).capitulos,
      titulo: getPlano90Dias(i).titulo,
      descricao: getPlano90Dias(i).descricao,
    })),
  },
  {
    id: 'nt-30',
    nome: 'Novo Testamento em 30 Dias',
    descricao: 'Percorra todos os 27 livros do Novo Testamento em um mês',
    duracao: '30 dias',
    categoria: 'nt',
    icone: '✝️',
    planos: Array.from({ length: 30 }, (_, i) => ({
      dia: i + 1,
      livros: getPlanoNT(i).livros,
      capitulos: getPlanoNT(i).capitulos,
      titulo: getPlanoNT(i).titulo,
      descricao: getPlanoNT(i).descricao,
    })),
  },
  {
    id: 'pv-31',
    nome: 'Provérbios da Sabedoria',
    descricao: 'Um provérbio por dia durante 31 dias — sabedoria prática para a vida',
    duracao: '31 dias',
    categoria: 'tematico',
    icone: '💡',
    planos: Array.from({ length: 31 }, (_, i) => ({
      dia: i + 1,
      livros: 'Provérbios',
      capitulos: [`pv:${i + 1}`],
      titulo: `Provérbios ${i + 1}`,
      descricao: `Sabedoria do capítulo ${i + 1} de Provérbios`,
    })),
  },
];

function getPlano90Dias(dia: number): { livros: string; capitulos: string[]; titulo: string; descricao: string } {
  const totalCapitulos = 1189;
  const capitulosPorDia = Math.ceil(totalCapitulos / 90);
  const inicio = dia * capitulosPorDia + 1;
  const fim = Math.min((dia + 1) * capitulosPorDia, totalCapitulos);

  const livrosBiblicos = [
    { nome: 'Gênesis', abrev: 'gn', caps: 50 },
    { nome: 'Êxodo', abrev: 'ex', caps: 40 },
    { nome: 'Levítico', abrev: 'lv', caps: 27 },
    { nome: 'Números', abrev: 'nm', caps: 36 },
    { nome: 'Deuteronômio', abrev: 'dt', caps: 34 },
    { nome: 'Josué', abrev: 'js', caps: 24 },
    { nome: 'Juízes', abrev: 'jz', caps: 21 },
    { nome: 'Rute', abrev: 'rt', caps: 4 },
    { nome: '1 Samuel', abrev: '1sm', caps: 31 },
    { nome: '2 Samuel', abrev: '2sm', caps: 24 },
    { nome: '1 Reis', abrev: '1rs', caps: 22 },
    { nome: '2 Reis', abrev: '2rs', caps: 25 },
    { nome: '1 Crônicas', abrev: '1cr', caps: 29 },
    { nome: '2 Crônicas', abrev: '2cr', caps: 36 },
    { nome: 'Esdras', abrev: 'ed', caps: 10 },
    { nome: 'Neemias', abrev: 'ne', caps: 13 },
    { nome: 'Ester', abrev: 'et', caps: 10 },
    { nome: 'Jó', abrev: 'job', caps: 42 },
    { nome: 'Salmos', abrev: 'sl', caps: 150 },
    { nome: 'Provérbios', abrev: 'pv', caps: 31 },
    { nome: 'Eclesiastes', abrev: 'ec', caps: 12 },
    { nome: 'Cânticos', abrev: 'ct', caps: 8 },
    { nome: 'Isaías', abrev: 'is', caps: 66 },
    { nome: 'Jeremias', abrev: 'jr', caps: 52 },
    { nome: 'Lamentações', abrev: 'lm', caps: 5 },
    { nome: 'Ezequiel', abrev: 'ez', caps: 48 },
    { nome: 'Daniel', abrev: 'dn', caps: 12 },
    { nome: 'Oséias', abrev: 'os', caps: 14 },
    { nome: 'Joel', abrev: 'jl', caps: 3 },
    { nome: 'Amós', abrev: 'am', caps: 9 },
    { nome: 'Obadias', abrev: 'ob', caps: 1 },
    { nome: 'Jonas', abrev: 'jon', caps: 4 },
    { nome: 'Miquéias', abrev: 'mq', caps: 7 },
    { nome: 'Naum', abrev: 'na', caps: 3 },
    { nome: 'Habacuque', abrev: 'hc', caps: 3 },
    { nome: 'Sofonias', abrev: 'sf', caps: 3 },
    { nome: 'Ageu', abrev: 'ag', caps: 2 },
    { nome: 'Zacarias', abrev: 'zc', caps: 14 },
    { nome: 'Malaquias', abrev: 'ml', caps: 4 },
    { nome: 'Mateus', abrev: 'mt', caps: 28 },
    { nome: 'Marcos', abrev: 'mc', caps: 16 },
    { nome: 'Lucas', abrev: 'lc', caps: 24 },
    { nome: 'João', abrev: 'jn', caps: 21 },
    { nome: 'Atos', abrev: 'at', caps: 28 },
    { nome: 'Romanos', abrev: 'rm', caps: 16 },
    { nome: '1 Coríntios', abrev: '1co', caps: 16 },
    { nome: '2 Coríntios', abrev: '2co', caps: 13 },
    { nome: 'Gálatas', abrev: 'gl', caps: 6 },
    { nome: 'Efésios', abrev: 'ef', caps: 6 },
    { nome: 'Filipenses', abrev: 'fl', caps: 4 },
    { nome: 'Colossenses', abrev: 'cl', caps: 4 },
    { nome: '1 Tessalonicenses', abrev: '1ts', caps: 5 },
    { nome: '2 Tessalonicenses', abrev: '2ts', caps: 3 },
    { nome: '1 Timóteo', abrev: '1tm', caps: 6 },
    { nome: '2 Timóteo', abrev: '2tm', caps: 4 },
    { nome: 'Tito', abrev: 'tt', caps: 3 },
    { nome: 'Filemom', abrev: 'fm', caps: 1 },
    { nome: 'Hebreus', abrev: 'hb', caps: 13 },
    { nome: 'Tiago', abrev: 'tg', caps: 5 },
    { nome: '1 Pedro', abrev: '1pe', caps: 5 },
    { nome: '2 Pedro', abrev: '2pe', caps: 3 },
    { nome: '1 João', abrev: '1jo', caps: 5 },
    { nome: '2 João', abrev: '2jo', caps: 1 },
    { nome: '3 João', abrev: '3jo', caps: 1 },
    { nome: 'Judas', abrev: 'jd', caps: 1 },
    { nome: 'Apocalipse', abrev: 'ap', caps: 22 },
  ];

  let capAtual = 1;
  const livrosEncontrados: string[] = [];
  const capsEncontrados: string[] = [];

  for (const livro of livrosBiblicos) {
    for (let c = 1; c <= livro.caps; c++) {
      if (capAtual >= inicio && capAtual <= fim) {
        if (!livrosEncontrados.includes(livro.nome)) livrosEncontrados.push(livro.nome);
        capsEncontrados.push(`${livro.abrev}:${c}`);
      }
      capAtual++;
      if (capAtual > fim) break;
    }
    if (capAtual > fim) break;
  }

  return {
    livros: livrosEncontrados.join(', '),
    capitulos: capsEncontrados,
    titulo: `Dia ${dia + 1}`,
    descricao: `Leitura do dia ${dia + 1}: ${livrosEncontrados.join(', ')}`,
  };
}

function getPlanoNT(dia: number): { livros: string; capitulos: string[]; titulo: string; descricao: string } {
  const ntLivros = [
    { nome: 'Mateus', abrev: 'mt', caps: 28 },
    { nome: 'Marcos', abrev: 'mc', caps: 16 },
    { nome: 'Lucas', abrev: 'lc', caps: 24 },
    { nome: 'João', abrev: 'jn', caps: 21 },
    { nome: 'Atos', abrev: 'at', caps: 28 },
    { nome: 'Romanos', abrev: 'rm', caps: 16 },
    { nome: '1 Coríntios', abrev: '1co', caps: 16 },
    { nome: '2 Coríntios', abrev: '2co', caps: 13 },
    { nome: 'Gálatas', abrev: 'gl', caps: 6 },
    { nome: 'Efésios', abrev: 'ef', caps: 6 },
    { nome: 'Filipenses', abrev: 'fl', caps: 4 },
    { nome: 'Colossenses', abrev: 'cl', caps: 4 },
    { nome: '1 Tessalonicenses', abrev: '1ts', caps: 5 },
    { nome: '2 Tessalonicenses', abrev: '2ts', caps: 3 },
    { nome: '1 Timóteo', abrev: '1tm', caps: 6 },
    { nome: '2 Timóteo', abrev: '2tm', caps: 4 },
    { nome: 'Tito', abrev: 'tt', caps: 3 },
    { nome: 'Filemom', abrev: 'fm', caps: 1 },
    { nome: 'Hebreus', abrev: 'hb', caps: 13 },
    { nome: 'Tiago', abrev: 'tg', caps: 5 },
    { nome: '1 Pedro', abrev: '1pe', caps: 5 },
    { nome: '2 Pedro', abrev: '2pe', caps: 3 },
    { nome: '1 João', abrev: '1jo', caps: 5 },
    { nome: '2 João', abrev: '2jo', caps: 1 },
    { nome: '3 João', abrev: '3jo', caps: 1 },
    { nome: 'Judas', abrev: 'jd', caps: 1 },
    { nome: 'Apocalipse', abrev: 'ap', caps: 22 },
  ];

  const totalCaps = ntLivros.reduce((acc, l) => acc + l.caps, 0);
  const capsPorDia = Math.ceil(totalCaps / 30);
  const inicio = dia * capsPorDia + 1;
  const fim = Math.min((dia + 1) * capsPorDia, totalCaps);

  let capAtual = 1;
  const livrosEncontrados: string[] = [];
  const capsEncontrados: string[] = [];

  for (const livro of ntLivros) {
    for (let c = 1; c <= livro.caps; c++) {
      if (capAtual >= inicio && capAtual <= fim) {
        if (!livrosEncontrados.includes(livro.nome)) livrosEncontrados.push(livro.nome);
        capsEncontrados.push(`${livro.abrev}:${c}`);
      }
      capAtual++;
      if (capAtual > fim) break;
    }
    if (capAtual > fim) break;
  }

  return {
    livros: livrosEncontrados.join(', '),
    capitulos: capsEncontrados,
    titulo: `Dia ${dia + 1}`,
    descricao: `Leitura do dia ${dia + 1}: ${livrosEncontrados.join(', ')}`,
  };
}

/**
 * Get reading progress from localStorage
 */
export function getProgressoLeitura(planoId: string): number[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(`progresso-${planoId}`);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

/**
 * Mark a day as complete
 */
export function marcarDiaCompleto(planoId: string, dia: number): void {
  if (typeof window === 'undefined') return;
  const progresso = getProgressoLeitura(planoId);
  if (!progresso.includes(dia)) {
    progresso.push(dia);
    localStorage.setItem(`progresso-${planoId}`, JSON.stringify(progresso));
  }
}

/**
 * Check if a day is complete
 */
export function diaCompleto(planoId: string, dia: number): boolean {
  return getProgressoLeitura(planoId).includes(dia);
}
