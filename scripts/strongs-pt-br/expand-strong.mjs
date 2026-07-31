/**
 * expand-strong.mjs
 * 
 * Expands STRONG_POR_VERSICULO from ~706 verses to ALL verses in the Bible.
 * 
 * OT: uses morphhb npm package ([word, lemma, morphology] per word)
 * NT: uses MorphGNT sblgnt files (ref POS parsing text word normalized lemma)
 * 
 * Generates src/data/biblia/strong/index.ts with full coverage.
 */

import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { createRequire } from 'module';

const ROOT = join(import.meta.dirname, '..', '..');
const LEXICON_DIR = join(ROOT, 'src', 'data', 'lexicon');
const OUTPUT_FILE = join(ROOT, 'src', 'data', 'biblia', 'strong', 'index.ts');
const MORPHGNT_DIR = join(ROOT, 'scripts', 'strongs-pt-br', 'morphgnt');

const require = createRequire(import.meta.url);

// ============================================================
// Book name mappings
// ============================================================

// morphhb English book names -> app abbreviations
const OT_BOOK_MAP = {
  'Genesis': 'gn', 'Exodus': 'ex', 'Leviticus': 'lv', 'Numbers': 'nm',
  'Deuteronomy': 'dt', 'Joshua': 'js', 'Judges': 'jz', 'Ruth': 'rt',
  'I Samuel': '1sm', 'II Samuel': '2sm', 'I Kings': '1rs', 'II Kings': '2rs',
  'I Chronicles': '1cr', 'II Chronicles': '2cr', 'Ezra': 'ed', 'Nehemiah': 'ne',
  'Esther': 'et', 'Job': 'jó', 'Psalms': 'sl', 'Proverbs': 'pv',
  'Ecclesiastes': 'ec', 'Song of Solomon': 'ct', 'Isaiah': 'is',
  'Jeremiah': 'jr', 'Lamentations': 'lm', 'Ezekiel': 'ez', 'Daniel': 'dn',
  'Hosea': 'os', 'Joel': 'jl', 'Amos': 'am', 'Obadiah': 'ob',
  'Jonah': 'jn', 'Micah': 'mq', 'Nahum': 'na', 'Habakkuk': 'hc',
  'Zephaniah': 'sf', 'Haggai': 'ag', 'Zechariah': 'zc', 'Malachi': 'ml',
};

// MorphGNT file numbers -> app abbreviations
const NT_FILE_MAP = {
  '61': 'mt', '62': 'mc', '63': 'lc', '64': 'jo', '65': 'at',
  '66': 'rm', '67': '1co', '68': '2co', '69': 'gl', '70': 'ef',
  '71': 'fp', '72': 'cl', '73': '1ts', '74': '2ts', '75': '1tm',
  '76': '2tm', '77': 'tt', '78': 'fm', '79': 'hb', '80': 'tg',
  '81': '1pe', '82': '2pe', '83': '1jo', '84': '2jo', '85': '3jo',
  '86': 'jd', '87': 'ap',
};

// ============================================================
// Hebrew morphology code -> Portuguese
// ============================================================

const HEBREW_POS = {
  'N': 'substantivo', 'V': 'verbo', 'A': 'adjetivo', 'R': 'advérbio',
  'P': 'preposição', 'C': 'conjunção', 'T': 'artigo', 'S': 'partícula',
  'M': 'numeral', 'Q': 'partícula interrogativa', 'X': 'partícula',
};

const HEBREW_STATE = {
  'a': 'absoluto', 'c': 'constructo', 'd': 'definito',
};

const HEBREW_PERSON = { '1': '1ª pessoa', '2': '2ª pessoa', '3': '3ª pessoa' };
const HEBREW_NUMBER = { 's': 'singular', 'p': 'plural' };
const HEBREW_GENDER = { 'm': 'masculino', 'f': 'feminino', 'c': 'comum' };

const HEBREW_VERB_STEM = {
  'q': 'Qal', 'N': 'Niphal', 'p': 'Piel', 'P': 'Pual',
  'h': 'Hiphil', 'H': 'Hophal', 't': 'Hithpael', 'o': 'Hithpolel',
  'r': 'Poel', 'u': 'Poal', 'j': 'Hithpoel', 'v': 'Nithpael',
  'w': 'Qal被动', 'x': 'Piel被动',
};

const HEBREW_VERB_TENSE = {
  'q': 'perfecto', 'w': 'imperfecto', 'i': 'imperfecto consecutivo',
  'c': 'perfecto consecutivo', 'j': 'jussivo', 'N': 'infinitivo',
  'p': 'particípio', 'v': 'vocativo',
};

function parseHebrewMorph(code) {
  if (!code || code === '-') return '';
  const parts = [];
  const pos = code[0];
  if (HEBREW_POS[pos]) parts.push(HEBREW_POS[pos]);

  if (pos === 'V' && code.length >= 2) {
    const stem = code[1];
    if (HEBREW_VERB_STEM[stem]) parts.push(HEBREW_VERB_STEM[stem]);
    if (code.length >= 3) {
      const tense = code[2];
      if (HEBREW_VERB_TENSE[tense]) parts.push(HEBREW_VERB_TENSE[tense]);
    }
    if (code.length >= 4) {
      const person = code[3];
      if (HEBREW_PERSON[person]) parts.push(HEBREW_PERSON[person]);
    }
    if (code.length >= 5) {
      const num = code[4];
      if (HEBREW_NUMBER[num]) parts.push(HEBREW_NUMBER[num]);
    }
    if (code.length >= 6) {
      const gen = code[5];
      if (HEBREW_GENDER[gen]) parts.push(HEBREW_GENDER[gen]);
    }
  } else if (pos === 'N' || pos === 'A') {
    if (code.length >= 3) {
      const state = code[2];
      if (HEBREW_STATE[state]) parts.push(HEBREW_STATE[state]);
    }
    if (code.length >= 4) {
      const num = code[3];
      if (HEBREW_NUMBER[num]) parts.push(HEBREW_NUMBER[num]);
    }
    if (code.length >= 5) {
      const gen = code[4];
      if (HEBREW_GENDER[gen]) parts.push(HEBREW_GENDER[gen]);
    }
  }

  return parts.join(', ');
}

// ============================================================
// Greek morphology code -> Portuguese (simplified)
// ============================================================

const GREEK_POS = {
  'N-': 'substantivo', 'V-': 'verbo', 'A-': 'adjetivo', 'D-': 'advérbio',
  'P-': 'preposição', 'C-': 'conjunção', 'RA': 'artigo definido',
  'RD': 'pronome demonstrativo', 'RI': 'pronome interrogativo/indefinito',
  'RP': 'pronome pessoal', 'RR': 'pronome relativo', 'X-': 'partícula',
  'I-': 'interjeição',
};

const GREEK_CASE = { 'N': 'nominativo', 'G': 'genitivo', 'D': 'dativo', 'A': 'acusativo', 'V': 'vocativo' };
const GREEK_NUMBER = { 'S': 'singular', 'P': 'plural' };
const GREEK_GENDER = { 'M': 'masculino', 'F': 'feminino', 'N': 'neutro' };
const GREEK_PERSON = { '1': '1ª pessoa', '2': '2ª pessoa', '3': '3ª pessoa' };
const GREEK_TENSE = { 'P': 'presente', 'I': 'imperfeito', 'F': 'futuro', 'A': 'aoristo', 'X': 'perfeito', 'Y': 'plusquamperfeito' };
const GREEK_VOICE = { 'A': 'ativo', 'M': 'médio', 'P': 'passivo', 'D': 'deponente' };
const GREEK_MOOD = { 'I': 'indicativo', 'D': 'imperativo', 'S': 'subjuntivo', 'O': 'optativo', 'N': 'infinitivo', 'P': 'particípio' };

function parseGreekMorph(posCode, parsing) {
  if (!parsing || parsing === '--------') return GREEK_POS[posCode] || '';
  const parts = [];
  const pos = posCode?.trim() || parsing[0];
  if (GREEK_POS[posCode]) parts.push(GREEK_POS[posCode]);

  // Parsing: PPP---NSM- (person, tense, voice, mood, case, number, gender, degree)
  const chars = parsing.split('');
  if (chars[0] !== '-') parts.push(GREEK_PERSON[chars[0]] || '');
  if (chars[1] !== '-') parts.push(GREEK_TENSE[chars[1]] || '');
  if (chars[2] !== '-') parts.push(GREEK_VOICE[chars[2]] || '');
  if (chars[3] !== '-') parts.push(GREEK_MOOD[chars[3]] || '');
  if (chars[4] !== '-') parts.push(GREEK_CASE[chars[4]] || '');
  if (chars[5] !== '-') parts.push(GREEK_NUMBER[chars[5]] || '');
  if (chars[6] !== '-') parts.push(GREEK_GENDER[chars[6]] || '');

  return parts.filter(Boolean).join(', ');
}

// ============================================================
// Load lexicons for definitions
// ============================================================

function loadHebrewLexicon() {
  const raw = readFileSync(join(LEXICON_DIR, 'hebraico.ts'), 'utf-8');
  const lex = {};
  // Match: { strong: "H123", palavra: "...", transliteracao: "...", definicao: "..." }
  const re = /\{\s*strong:\s*["'](H\d+)["'].*?palavra:\s*["']([^"']*)["'].*?transliteracao:\s*["']([^"']*)["'].*?definicao:\s*["']([^"']*)["']/gs;
  let m;
  while ((m = re.exec(raw))) {
    lex[m[1]] = {
      palavra: m[2],
      transliteracao: m[3],
      definicao: m[4],
    };
  }
  return lex;
}

function loadGreekLexicon() {
  const raw = readFileSync(join(LEXICON_DIR, 'grego.ts'), 'utf-8');
  const lex = {};
  const re = /\{\s*strong:\s*['"]G(\d+)['"].*?palavra:\s*'([^']*)'.*?transliteracao:\s*'([^']*)'.*?definicaoResumida:\s*'([^']*)'/gs;
  let m;
  while ((m = re.exec(raw))) {
    lex['G' + m[1]] = {
      palavra: m[2],
      transliteracao: m[3],
      definicao: m[4],
    };
  }
  return lex;
}

// Build lemma -> Strong's lookup from Greek lexicon
function buildGreekLemmaLookup(greekLex) {
  const lookup = {};
  for (const [strong, info] of Object.entries(greekLex)) {
    const lemma = info.palavra;
    if (lemma && !lookup[lemma]) {
      lookup[lemma] = strong;
    }
  }
  return lookup;
}

// ============================================================
// Process OT (Hebrew) from morphhb
// ============================================================

function processOT(hebrewLex) {
  const morphhb = require('morphhb');
  const verses = {};

  for (const [bookName, chapters] of Object.entries(morphhb)) {
    const abrev = OT_BOOK_MAP[bookName];
    if (!abrev) {
      console.warn(`Unknown OT book: ${bookName}`);
      continue;
    }

    for (let c = 0; c < chapters.length; c++) {
      const chapter = chapters[c];
      for (let v = 0; v < chapter.length; v++) {
        const words = chapter[v];
        const key = `${abrev}:${c + 1}:${v + 1}`;
        const palavras = [];

        for (const [wordStr, lemma, morphCode] of words) {
          // Clean lemma: "Hb/H7225" -> "H7225", "H1254" -> "H1254"
          let strong = lemma;
          if (strong.includes('/')) {
            strong = strong.split('/').pop();
          }
          // Ensure H prefix
          if (!strong.startsWith('H')) {
            strong = 'H' + strong;
          }

          // Get transliteration and definition from lexicon
          const lexEntry = hebrewLex[strong];
          const palavra = lexEntry?.palavra || wordStr;
          const transliteracao = lexEntry?.transliteracao || '';
          const definicao = lexEntry?.definicao || '';
          const morphPt = parseHebrewMorph(morphCode);

          palavras.push({
            strong,
            palavra,
            transliteracao,
            definicao: definicao || morphPt,
            morfologia: morphPt || definicao,
            idioma: 'hebraico',
          });
        }

        if (palavras.length > 0) {
          verses[key] = palavras;
        }
      }
    }
  }

  return verses;
}

// ============================================================
// Process NT (Greek) from MorphGNT
// ============================================================

function processNT(greekLex, lemmaLookup) {
  const verses = {};
  const files = readdirSync(MORPHGNT_DIR).filter(f => f.endsWith('-morphgnt.txt'));

  for (const file of files) {
    const fileNum = file.split('-')[0];
    const abrev = NT_FILE_MAP[fileNum];
    if (!abrev) {
      console.warn(`Unknown NT file: ${file}`);
      continue;
    }

    const content = readFileSync(join(MORPHGNT_DIR, file), 'utf-8');
    const lines = content.trim().split('\n');

    for (const line of lines) {
      // Format: 010101 N- ----NSF- Βίβλος Βίβλος βίβλος βίβλος
      // ref(6) POS parsing text word normalized lemma
      const parts = line.split(/\s+/);
      if (parts.length < 7) continue;

      const ref = parts[0];
      const posCode = parts[1];
      const parsing = parts[2];
      const text = parts[3];
      const word = parts[4];
      const normalized = parts[5];
      const lemma = parts[6];

      const ch = parseInt(ref.substring(2, 4), 10);
      const vs = parseInt(ref.substring(4, 6), 10);
      const key = `${abrev}:${ch}:${vs}`;

      // Find Strong's number from lemma
      let strong = lemmaLookup[lemma] || '';
      if (!strong) {
        // Try normalized form
        strong = lemmaLookup[normalized] || '';
      }

      // Get lexicon entry
      const lexEntry = strong ? greekLex[strong] : null;
      const palavra = lexEntry?.palavra || lemma;
      const transliteracao = lexEntry?.transliteracao || '';
      const definicao = lexEntry?.definicao || '';
      const morphPt = parseGreekMorph(posCode, parsing);

      const palavrasEntry = {
        strong: strong || 'G0000',
        palavra: palavra || lemma,
        transliteracao: transliteracao || normalized,
        definicao: definicao || morphPt,
        morfologia: morphPt || definicao,
        idioma: 'grego',
      };

      if (!verses[key]) verses[key] = [];
      verses[key].push(palavrasEntry);
    }
  }

  return verses;
}

// ============================================================
// Merge and generate output
// ============================================================

function generateOutput(otVerses, ntVerses) {
  const allVerses = { ...otVerses, ...ntVerses };
  const totalVerses = Object.keys(allVerses).length;
  const totalWords = Object.values(allVerses).reduce((sum, v) => sum + v.length, 0);

  console.log(`OT verses: ${Object.keys(otVerses).length}`);
  console.log(`NT verses: ${Object.keys(ntVerses).length}`);
  console.log(`Total verses: ${totalVerses}`);
  console.log(`Total words: ${totalWords}`);

  // Generate TypeScript
  const lines = [];
  lines.push(`export interface PalavraStrong {`);
  lines.push(`  strong: string;`);
  lines.push(`  palavra: string;`);
  lines.push(`  transliteracao: string;`);
  lines.push(`  definicao: string;`);
  lines.push(`  morfologia: string;`);
  lines.push(`  idioma: 'grego' | 'hebraico';`);
  lines.push(`}`);
  lines.push(``);
  lines.push(`export interface VersiculoStrong {`);
  lines.push(`  livro: string;`);
  lines.push(`  capitulo: number;`);
  lines.push(`  versiculo: number;`);
  lines.push(`  palavras: PalavraStrong[];`);
  lines.push(`}`);
  lines.push(``);
  lines.push(`export const STRONG_POR_VERSICULO: Record<string, PalavraStrong[]> = {`);

  // Sort verses by book order then chapter then verse
  const bookOrder = {};
  const allBookAbrevs = [...Object.values(OT_BOOK_MAP), ...Object.values(NT_FILE_MAP)];
  allBookAbrevs.forEach((b, i) => bookOrder[b] = i);

  const sortedKeys = Object.keys(allVerses).sort((a, b) => {
    const [aB, aC, aV] = a.split(':');
    const [bB, bC, bV] = b.split(':');
    const aO = bookOrder[aB] ?? 999;
    const bO = bookOrder[bB] ?? 999;
    if (aO !== bO) return aO - bO;
    if (aC !== bC) return parseInt(aC) - parseInt(bC);
    return parseInt(aV) - parseInt(bV);
  });

  for (const key of sortedKeys) {
    const palavras = allVerses[key];
    const wordStrs = palavras.map(p => {
      const fields = [
        `strong: '${p.strong}'`,
        `palavra: '${p.palavra.replace(/'/g, "\\'")}'`,
        `transliteracao: '${p.transliteracao.replace(/'/g, "\\'")}'`,
        `definicao: '${p.definicao.replace(/'/g, "\\'")}'`,
        `morfologia: '${p.morfologia.replace(/'/g, "\\'")}'`,
        `idioma: '${p.idioma}'`,
      ];
      return `    { ${fields.join(', ')} }`;
    });

    lines.push(`  '${key}': [`);
    lines.push(wordStrs.join(',\n'));
    lines.push(`  ],`);
  }

  lines.push(`};`);
  lines.push(``);
  lines.push(`export function buscarVersiculoComStrong(livro: string, capitulo: number, versiculo: number): PalavraStrong[] {`);
  lines.push(`  const key = \`\${livro}:\${capitulo}:\${versiculo}\`;`);
  lines.push(`  return STRONG_POR_VERSICULO[key] || [];`);
  lines.push(`}`);
  lines.push(``);
  lines.push(`export function buscarPalavraStrong(codigo: string): PalavraStrong | null {`);
  lines.push(`  for (const palavras of Object.values(STRONG_POR_VERSICULO)) {`);
  lines.push(`    const encontrada = palavras.find(p => p.strong === codigo);`);
  lines.push(`    if (encontrada) return encontrada;`);
  lines.push(`  }`);
  lines.push(`  return null;`);
  lines.push(`}`);
  lines.push(``);
  lines.push(`export function buscarVersiculosComStrong(): string[] {`);
  lines.push(`  return Object.keys(STRONG_POR_VERSICULO);`);
  lines.push(`}`);
  lines.push(``);

  return lines.join('\n');
}

// ============================================================
// Main
// ============================================================

console.log('Loading Hebrew lexicon...');
const hebrewLex = loadHebrewLexicon();
console.log(`  ${Object.keys(hebrewLex).length} entries`);

console.log('Loading Greek lexicon...');
const greekLex = loadGreekLexicon();
console.log(`  ${Object.keys(greekLex).length} entries`);

const lemmaLookup = buildGreekLemmaLookup(greekLex);
console.log(`  ${Object.keys(lemmaLookup).length} lemma -> Strong's mappings`);

console.log('\nProcessing OT (Hebrew)...');
const otVerses = processOT(hebrewLex);

console.log('\nProcessing NT (Greek)...');
const ntVerses = processNT(greekLex, lemmaLookup);

console.log('\nGenerating output...');
const output = generateOutput(otVerses, ntVerses);

writeFileSync(OUTPUT_FILE, output, 'utf-8');
console.log(`\nDone! Written to ${OUTPUT_FILE}`);
