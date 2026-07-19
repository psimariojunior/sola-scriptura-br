// Converte dados bíblicos TypeScript do site para JSON para o mobile
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TEXTO_DIR = path.join(__dirname, '..', 'src', 'data', 'biblia', 'texto');
const OUTPUT_DIR = path.join(__dirname, '..', 'mobile', 'assets', 'data');

// Mapa de abreviação -> slug
const SLUG_MAP = {
  gn: 'genesis', ex: 'exodo', lv: 'levitico', nm: 'numeros',
  dt: 'deuteronomio', js: 'josue', jz: 'juizes', rt: 'rute',
  _1sm: '1-samuel', _2sm: '2-samuel', _1rs: '1-reis', _2rs: '2-reis',
  _1cr: '1-cronicas', _2cr: '2-cronicas', ed: 'esdras', ne: 'neemias',
  et: 'ester', job: 'jo', sl: 'salmos', pv: 'proverbios',
  ec: 'eclesiastes', ct: 'canticos', is: 'isaias', jr: 'jeremias',
  lm: 'lamentacoes', ez: 'ezequiel', dn: 'daniel', os: 'oseias',
  jl: 'joel', am: 'amos', ob: 'obadias', jn: 'jonas',
  mq: 'miqueias', na: 'naum', hc: 'habacuque', sf: 'sofonias',
  ag: 'ageu', zc: 'zacarias', ml: 'malaquias',
  mt: 'mateus', mc: 'marcos', lc: 'lucas', jo: 'joao',
  at: 'atos', rm: 'romanos', _1co: '1-corintios', _2co: '2-corintios',
  gl: 'galatas', ef: 'efesios', fp: 'filipenses', cl: 'colossenses',
  _1ts: '1-tessalonicenses', _2ts: '2-tessalonicenses',
  _1tm: '1-timoteo', _2tm: '2-timoteo', tt: 'tito', fm: 'filemom',
  hb: 'hebreus', tg: 'tiago', _1pe: '1-pedro', _2pe: '2-pedro',
  _1jo: '1-joao', _2jo: '2-joao', _3jo: '3-joao', jd: 'judas',
  ap: 'apocalipse',
};

// Fix mojibake (UTF-8 interpretado como Latin-1)
function fixMojibake(str) {
  try {
    // O arquivo foi salvo como Windows-1252/Latin-1 mas contém UTF-8 multi-byte
    // Cada caractere acentuado vira 2 chars mojibake
    // Precisamos: pegar os bytes Latin-1, decodificar como UTF-8
    const bytes = Buffer.from(str, 'latin1');
    return bytes.toString('utf-8');
  } catch (e) {
    return str;
  }
}

function parseBookFile(content) {
  // Extrai o objeto Record<number, string[]>
  const match = content.match(/const\s+data:\s+Record<number,\s*string\[\]>\s*=\s*\{([\s\S]*)\};?\s*$/);
  if (!match) {
    // Tenta formato alternativo
    const match2 = content.match(/Record<number,\s*string\[\]>\s*=\s*\{([\s\S]*)\}/);
    if (!match2) return null;
    return parseDataBlock(match2[1]);
  }
  return parseDataBlock(match[1]);
}

function parseDataBlock(block) {
  const result = {};
  // Regex para encontrar cada capítulo: numero: [...]
  const chapterRegex = /(\d+)\s*:\s*\[([\s\S]*?)\](?=\s*,\s*\d+\s*:|\s*$)/g;
  let match;
  while ((match = chapterRegex.exec(block)) !== null) {
    const chapterNum = parseInt(match[1]);
    const versesStr = match[2];
    // Extrai cada versículo (string entre crases)
    const verses = [];
    const verseRegex = /`([^`]+)`/g;
    let v;
    while ((v = verseRegex.exec(versesStr)) !== null) {
      verses.push(fixMojibake(v[1]));
    }
    result[chapterNum] = verses;
  }
  return result;
}

const translations = ['arc', 'ara', 'acf', 'kjv', 'nvi', 'web'];
const bookFiles = Object.keys(SLUG_MAP);

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

let totalVerses = 0;
let totalBooks = 0;

for (const tr of translations) {
  const trDir = path.join(TEXTO_DIR, tr);
  const trData = {};

  for (const abrev of bookFiles) {
    const filePath = path.join(trDir, `${abrev}.ts`);
    if (!fs.existsSync(filePath)) {
      console.warn(`Arquivo não encontrado: ${filePath}`);
      continue;
    }
    const content = fs.readFileSync(filePath, 'latin1');
    const bookData = parseBookFile(content);
    if (bookData) {
      const slug = SLUG_MAP[abrev];
      trData[slug] = bookData;
      totalBooks++;
      for (const ch of Object.keys(bookData)) {
        totalVerses += bookData[ch].length;
      }
    }
  }

  const outFile = path.join(OUTPUT_DIR, `biblia-${tr}.json`);
  fs.writeFileSync(outFile, JSON.stringify(trData));
  console.log(`✓ ${tr}: ${Object.keys(trData).length} livros → ${outFile}`);
}

// Cria índice de traduções
const tradicoesInfo = {
  arc: { nome: 'Almeida Revista e Corrigida', abreviacao: 'ARC', idioma: 'pt-BR' },
  ara: { nome: 'Almeida Revista e Atualizada', abreviacao: 'ARA', idioma: 'pt-BR' },
  acf: { nome: 'Almeida Corrigida Fiel', abreviacao: 'ACF', idioma: 'pt-BR' },
  kjv: { nome: 'King James Version', abreviacao: 'KJV', idioma: 'en' },
  nvi: { nome: 'Nova Versão Internacional', abreviacao: 'NVI', idioma: 'pt-BR' },
  web: { nome: 'World English Bible', abreviacao: 'WEB', idioma: 'en' },
};
fs.writeFileSync(path.join(OUTPUT_DIR, 'traducoes.json'), JSON.stringify(tradicoesInfo, null, 2));

// Cria índice de livros
const livros = {
  genesis: { nome: 'Gênesis', abreviacao: 'gn', testamento: 'AT', ordem: 1, capitulos: 50 },
  exodo: { nome: 'Êxodo', abreviacao: 'ex', testamento: 'AT', ordem: 2, capitulos: 40 },
  levitico: { nome: 'Levítico', abreviacao: 'lv', testamento: 'AT', ordem: 3, capitulos: 27 },
  numeros: { nome: 'Números', abreviacao: 'nm', testamento: 'AT', ordem: 4, capitulos: 36 },
  deuteronomio: { nome: 'Deuteronômio', abreviacao: 'dt', testamento: 'AT', ordem: 5, capitulos: 34 },
  josue: { nome: 'Josué', abreviacao: 'js', testamento: 'AT', ordem: 6, capitulos: 24 },
  juizes: { nome: 'Juízes', abreviacao: 'jz', testamento: 'AT', ordem: 7, capitulos: 21 },
  rute: { nome: 'Rute', abreviacao: 'rt', testamento: 'AT', ordem: 8, capitulos: 4 },
  '1-samuel': { nome: '1 Samuel', abreviacao: '1sm', testamento: 'AT', ordem: 9, capitulos: 31 },
  '2-samuel': { nome: '2 Samuel', abreviacao: '2sm', testamento: 'AT', ordem: 10, capitulos: 24 },
  '1-reis': { nome: '1 Reis', abreviacao: '1rs', testamento: 'AT', ordem: 11, capitulos: 22 },
  '2-reis': { nome: '2 Reis', abreviacao: '2rs', testamento: 'AT', ordem: 12, capitulos: 25 },
  '1-cronicas': { nome: '1 Crônicas', abreviacao: '1cr', testamento: 'AT', ordem: 13, capitulos: 29 },
  '2-cronicas': { nome: '2 Crônicas', abreviacao: '2cr', testamento: 'AT', ordem: 14, capitulos: 36 },
  esdras: { nome: 'Esdras', abreviacao: 'ed', testamento: 'AT', ordem: 15, capitulos: 10 },
  neemias: { nome: 'Neemias', abreviacao: 'ne', testamento: 'AT', ordem: 16, capitulos: 13 },
  ester: { nome: 'Ester', abreviacao: 'et', testamento: 'AT', ordem: 17, capitulos: 10 },
  jo: { nome: 'Jó', abreviacao: 'jó', testamento: 'AT', ordem: 18, capitulos: 42 },
  salmos: { nome: 'Salmos', abreviacao: 'sl', testamento: 'AT', ordem: 19, capitulos: 150 },
  proverbios: { nome: 'Provérbios', abreviacao: 'pv', testamento: 'AT', ordem: 20, capitulos: 31 },
  eclesiastes: { nome: 'Eclesiastes', abreviacao: 'ec', testamento: 'AT', ordem: 21, capitulos: 12 },
  canticos: { nome: 'Cânticos', abreviacao: 'ct', testamento: 'AT', ordem: 22, capitulos: 8 },
  isaias: { nome: 'Isaías', abreviacao: 'is', testamento: 'AT', ordem: 23, capitulos: 66 },
  jeremias: { nome: 'Jeremias', abreviacao: 'jr', testamento: 'AT', ordem: 24, capitulos: 52 },
  lamentacoes: { nome: 'Lamentações', abreviacao: 'lm', testamento: 'AT', ordem: 25, capitulos: 5 },
  ezequiel: { nome: 'Ezequiel', abreviacao: 'ez', testamento: 'AT', ordem: 26, capitulos: 48 },
  daniel: { nome: 'Daniel', abreviacao: 'dn', testamento: 'AT', ordem: 27, capitulos: 12 },
  oseias: { nome: 'Oséias', abreviacao: 'os', testamento: 'AT', ordem: 28, capitulos: 14 },
  joel: { nome: 'Joel', abreviacao: 'jl', testamento: 'AT', ordem: 29, capitulos: 3 },
  amos: { nome: 'Amós', abreviacao: 'am', testamento: 'AT', ordem: 30, capitulos: 9 },
  obadias: { nome: 'Obadias', abreviacao: 'ob', testamento: 'AT', ordem: 31, capitulos: 1 },
  jonas: { nome: 'Jonas', abreviacao: 'jn', testamento: 'AT', ordem: 32, capitulos: 4 },
  miqueias: { nome: 'Miquéias', abreviacao: 'mq', testamento: 'AT', ordem: 33, capitulos: 7 },
  naum: { nome: 'Naum', abreviacao: 'na', testamento: 'AT', ordem: 34, capitulos: 3 },
  habacuque: { nome: 'Habacuque', abreviacao: 'hc', testamento: 'AT', ordem: 35, capitulos: 3 },
  sofonias: { nome: 'Sofonias', abreviacao: 'sf', testamento: 'AT', ordem: 36, capitulos: 3 },
  ageu: { nome: 'Ageu', abreviacao: 'ag', testamento: 'AT', ordem: 37, capitulos: 2 },
  zacarias: { nome: 'Zacarias', abreviacao: 'zc', testamento: 'AT', ordem: 38, capitulos: 14 },
  malaquias: { nome: 'Malaquias', abreviacao: 'ml', testamento: 'AT', ordem: 39, capitulos: 4 },
  mateus: { nome: 'Mateus', abreviacao: 'mt', testamento: 'NT', ordem: 40, capitulos: 28 },
  marcos: { nome: 'Marcos', abreviacao: 'mc', testamento: 'NT', ordem: 41, capitulos: 16 },
  lucas: { nome: 'Lucas', abreviacao: 'lc', testamento: 'NT', ordem: 42, capitulos: 24 },
  joao: { nome: 'João', abreviacao: 'jo', testamento: 'NT', ordem: 43, capitulos: 21 },
  atos: { nome: 'Atos', abreviacao: 'at', testamento: 'NT', ordem: 44, capitulos: 28 },
  romanos: { nome: 'Romanos', abreviacao: 'rm', testamento: 'NT', ordem: 45, capitulos: 16 },
  '1-corintios': { nome: '1 Coríntios', abreviacao: '1co', testamento: 'NT', ordem: 46, capitulos: 16 },
  '2-corintios': { nome: '2 Coríntios', abreviacao: '2co', testamento: 'NT', ordem: 47, capitulos: 13 },
  galatas: { nome: 'Gálatas', abreviacao: 'gl', testamento: 'NT', ordem: 48, capitulos: 6 },
  efesios: { nome: 'Efésios', abreviacao: 'ef', testamento: 'NT', ordem: 49, capitulos: 6 },
  filipenses: { nome: 'Filipenses', abreviacao: 'fp', testamento: 'NT', ordem: 50, capitulos: 4 },
  colossenses: { nome: 'Colossenses', abreviacao: 'cl', testamento: 'NT', ordem: 51, capitulos: 4 },
  '1-tessalonicenses': { nome: '1 Tessalonicenses', abreviacao: '1ts', testamento: 'NT', ordem: 52, capitulos: 5 },
  '2-tessalonicenses': { nome: '2 Tessalonicenses', abreviacao: '2ts', testamento: 'NT', ordem: 53, capitulos: 3 },
  '1-timoteo': { nome: '1 Timóteo', abreviacao: '1tm', testamento: 'NT', ordem: 54, capitulos: 6 },
  '2-timoteo': { nome: '2 Timóteo', abreviacao: '2tm', testamento: 'NT', ordem: 55, capitulos: 4 },
  tito: { nome: 'Tito', abreviacao: 'tt', testamento: 'NT', ordem: 56, capitulos: 3 },
  filemom: { nome: 'Filemom', abreviacao: 'fm', testamento: 'NT', ordem: 57, capitulos: 1 },
  hebreus: { nome: 'Hebreus', abreviacao: 'hb', testamento: 'NT', ordem: 58, capitulos: 13 },
  tiago: { nome: 'Tiago', abreviacao: 'tg', testamento: 'NT', ordem: 59, capitulos: 5 },
  '1-pedro': { nome: '1 Pedro', abreviacao: '1pe', testamento: 'NT', ordem: 60, capitulos: 5 },
  '2-pedro': { nome: '2 Pedro', abreviacao: '2pe', testamento: 'NT', ordem: 61, capitulos: 3 },
  '1-joao': { nome: '1 João', abreviacao: '1jo', testamento: 'NT', ordem: 62, capitulos: 5 },
  '2-joao': { nome: '2 João', abreviacao: '2jo', testamento: 'NT', ordem: 63, capitulos: 1 },
  '3-joao': { nome: '3 João', abreviacao: '3jo', testamento: 'NT', ordem: 64, capitulos: 1 },
  judas: { nome: 'Judas', abreviacao: 'jd', testamento: 'NT', ordem: 65, capitulos: 1 },
  apocalipse: { nome: 'Apocalipse', abreviacao: 'ap', testamento: 'NT', ordem: 66, capitulos: 22 },
};
fs.writeFileSync(path.join(OUTPUT_DIR, 'livros.json'), JSON.stringify(livros, null, 2));

console.log(`\n✅ Total: ${totalBooks} livros, ${totalVerses} versículos em 6 traduções`);
console.log(`📁 Saída: ${OUTPUT_DIR}`);
