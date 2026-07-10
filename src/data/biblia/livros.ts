export interface LivroInfo {
  nome: string;
  abreviacao: string;
  testamento: 'AT' | 'NT';
  totalCapitulos: number;
  ordem: number;
}

export const LIVROS_AT: LivroInfo[] = [
  { nome: 'Gênesis', abreviacao: 'gn', testamento: 'AT', totalCapitulos: 50, ordem: 1 },
  { nome: 'Êxodo', abreviacao: 'ex', testamento: 'AT', totalCapitulos: 40, ordem: 2 },
  { nome: 'Levítico', abreviacao: 'lv', testamento: 'AT', totalCapitulos: 27, ordem: 3 },
  { nome: 'Números', abreviacao: 'nm', testamento: 'AT', totalCapitulos: 36, ordem: 4 },
  { nome: 'Deuteronômio', abreviacao: 'dt', testamento: 'AT', totalCapitulos: 34, ordem: 5 },
  { nome: 'Josué', abreviacao: 'js', testamento: 'AT', totalCapitulos: 24, ordem: 6 },
  { nome: 'Juízes', abreviacao: 'jz', testamento: 'AT', totalCapitulos: 21, ordem: 7 },
  { nome: 'Rute', abreviacao: 'rt', testamento: 'AT', totalCapitulos: 4, ordem: 8 },
  { nome: '1 Samuel', abreviacao: '1sm', testamento: 'AT', totalCapitulos: 31, ordem: 9 },
  { nome: '2 Samuel', abreviacao: '2sm', testamento: 'AT', totalCapitulos: 24, ordem: 10 },
  { nome: '1 Reis', abreviacao: '1rs', testamento: 'AT', totalCapitulos: 22, ordem: 11 },
  { nome: '2 Reis', abreviacao: '2rs', testamento: 'AT', totalCapitulos: 25, ordem: 12 },
  { nome: '1 Crônicas', abreviacao: '1cr', testamento: 'AT', totalCapitulos: 29, ordem: 13 },
  { nome: '2 Crônicas', abreviacao: '2cr', testamento: 'AT', totalCapitulos: 36, ordem: 14 },
  { nome: 'Esdras', abreviacao: 'ed', testamento: 'AT', totalCapitulos: 10, ordem: 15 },
  { nome: 'Neemias', abreviacao: 'ne', testamento: 'AT', totalCapitulos: 13, ordem: 16 },
  { nome: 'Ester', abreviacao: 'et', testamento: 'AT', totalCapitulos: 10, ordem: 17 },
  { nome: 'Jó', abreviacao: 'jó', testamento: 'AT', totalCapitulos: 42, ordem: 18 },
  { nome: 'Salmos', abreviacao: 'sl', testamento: 'AT', totalCapitulos: 150, ordem: 19 },
  { nome: 'Provérbios', abreviacao: 'pv', testamento: 'AT', totalCapitulos: 31, ordem: 20 },
  { nome: 'Eclesiastes', abreviacao: 'ec', testamento: 'AT', totalCapitulos: 12, ordem: 21 },
  { nome: 'Cantares', abreviacao: 'ct', testamento: 'AT', totalCapitulos: 8, ordem: 22 },
  { nome: 'Isaías', abreviacao: 'is', testamento: 'AT', totalCapitulos: 66, ordem: 23 },
  { nome: 'Jeremias', abreviacao: 'jr', testamento: 'AT', totalCapitulos: 52, ordem: 24 },
  { nome: 'Lamentações', abreviacao: 'lm', testamento: 'AT', totalCapitulos: 5, ordem: 25 },
  { nome: 'Ezequiel', abreviacao: 'ez', testamento: 'AT', totalCapitulos: 48, ordem: 26 },
  { nome: 'Daniel', abreviacao: 'dn', testamento: 'AT', totalCapitulos: 12, ordem: 27 },
  { nome: 'Oseias', abreviacao: 'os', testamento: 'AT', totalCapitulos: 14, ordem: 28 },
  { nome: 'Joel', abreviacao: 'jl', testamento: 'AT', totalCapitulos: 3, ordem: 29 },
  { nome: 'Amós', abreviacao: 'am', testamento: 'AT', totalCapitulos: 9, ordem: 30 },
  { nome: 'Obadias', abreviacao: 'ob', testamento: 'AT', totalCapitulos: 1, ordem: 31 },
  { nome: 'Jonas', abreviacao: 'jn', testamento: 'AT', totalCapitulos: 4, ordem: 32 },
  { nome: 'Miqueias', abreviacao: 'mq', testamento: 'AT', totalCapitulos: 7, ordem: 33 },
  { nome: 'Naum', abreviacao: 'na', testamento: 'AT', totalCapitulos: 3, ordem: 34 },
  { nome: 'Habacuque', abreviacao: 'hc', testamento: 'AT', totalCapitulos: 3, ordem: 35 },
  { nome: 'Sofonias', abreviacao: 'sf', testamento: 'AT', totalCapitulos: 3, ordem: 36 },
  { nome: 'Ageu', abreviacao: 'ag', testamento: 'AT', totalCapitulos: 2, ordem: 37 },
  { nome: 'Zacarias', abreviacao: 'zc', testamento: 'AT', totalCapitulos: 14, ordem: 38 },
  { nome: 'Malaquias', abreviacao: 'ml', testamento: 'AT', totalCapitulos: 4, ordem: 39 },
];

export const LIVROS_NT: LivroInfo[] = [
  { nome: 'Mateus', abreviacao: 'mt', testamento: 'NT', totalCapitulos: 28, ordem: 40 },
  { nome: 'Marcos', abreviacao: 'mc', testamento: 'NT', totalCapitulos: 16, ordem: 41 },
  { nome: 'Lucas', abreviacao: 'lc', testamento: 'NT', totalCapitulos: 24, ordem: 42 },
  { nome: 'João', abreviacao: 'jo', testamento: 'NT', totalCapitulos: 21, ordem: 43 },
  { nome: 'Atos', abreviacao: 'at', testamento: 'NT', totalCapitulos: 28, ordem: 44 },
  { nome: 'Romanos', abreviacao: 'rm', testamento: 'NT', totalCapitulos: 16, ordem: 45 },
  { nome: '1 Coríntios', abreviacao: '1co', testamento: 'NT', totalCapitulos: 16, ordem: 46 },
  { nome: '2 Coríntios', abreviacao: '2co', testamento: 'NT', totalCapitulos: 13, ordem: 47 },
  { nome: 'Gálatas', abreviacao: 'gl', testamento: 'NT', totalCapitulos: 6, ordem: 48 },
  { nome: 'Efésios', abreviacao: 'ef', testamento: 'NT', totalCapitulos: 6, ordem: 49 },
  { nome: 'Filipenses', abreviacao: 'fp', testamento: 'NT', totalCapitulos: 4, ordem: 50 },
  { nome: 'Colossenses', abreviacao: 'cl', testamento: 'NT', totalCapitulos: 4, ordem: 51 },
  { nome: '1 Tessalonicenses', abreviacao: '1ts', testamento: 'NT', totalCapitulos: 5, ordem: 52 },
  { nome: '2 Tessalonicenses', abreviacao: '2ts', testamento: 'NT', totalCapitulos: 3, ordem: 53 },
  { nome: '1 Timóteo', abreviacao: '1tm', testamento: 'NT', totalCapitulos: 6, ordem: 54 },
  { nome: '2 Timóteo', abreviacao: '2tm', testamento: 'NT', totalCapitulos: 4, ordem: 55 },
  { nome: 'Tito', abreviacao: 'tt', testamento: 'NT', totalCapitulos: 3, ordem: 56 },
  { nome: 'Filémon', abreviacao: 'fm', testamento: 'NT', totalCapitulos: 1, ordem: 57 },
  { nome: 'Hebreus', abreviacao: 'hb', testamento: 'NT', totalCapitulos: 13, ordem: 58 },
  { nome: 'Tiago', abreviacao: 'tg', testamento: 'NT', totalCapitulos: 5, ordem: 59 },
  { nome: '1 Pedro', abreviacao: '1pe', testamento: 'NT', totalCapitulos: 5, ordem: 60 },
  { nome: '2 Pedro', abreviacao: '2pe', testamento: 'NT', totalCapitulos: 3, ordem: 61 },
  { nome: '1 João', abreviacao: '1jo', testamento: 'NT', totalCapitulos: 5, ordem: 62 },
  { nome: '2 João', abreviacao: '2jo', testamento: 'NT', totalCapitulos: 1, ordem: 63 },
  { nome: '3 João', abreviacao: '3jo', testamento: 'NT', totalCapitulos: 1, ordem: 64 },
  { nome: 'Judas', abreviacao: 'jd', testamento: 'NT', totalCapitulos: 1, ordem: 65 },
  { nome: 'Apocalipse', abreviacao: 'ap', testamento: 'NT', totalCapitulos: 22, ordem: 66 },
];

export const TODOS_LIVROS: LivroInfo[] = [...LIVROS_AT, ...LIVROS_NT];

export const livroPorAbreviacao = new Map<string, LivroInfo>(
  TODOS_LIVROS.map((l) => [l.abreviacao, l])
);

export const livroPorOrdem = new Map<number, LivroInfo>(
  TODOS_LIVROS.map((l) => [l.ordem, l])
);
