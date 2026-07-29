/**
 * expand-strong-v2.mjs
 * 
 * Generates a COMPACT strong/index.ts:
 * - STRONG_CODES: Record<string, string[]> — verse key -> array of strong codes
 * - getStrongPorVersiculo() resolves codes to full PalavraStrong objects using lexicons
 * 
 * This keeps the generated file small (~3MB instead of 75MB) while providing
 * the same API. Lexicon data (hebraico.ts, grego.ts) is loaded at runtime.
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

const HEBREW_STATE = { 'a': 'absoluto', 'c': 'constructo', 'd': 'definito' };
const HEBREW_PERSON = { '1': '1ª pessoa', '2': '2ª pessoa', '3': '3ª pessoa' };
const HEBREW_NUMBER = { 's': 'singular', 'p': 'plural' };
const HEBREW_GENDER = { 'm': 'masculino', 'f': 'feminino', 'c': 'comum' };

const HEBREW_VERB_STEM = {
  'q': 'Qal', 'N': 'Niphal', 'p': 'Piel', 'P': 'Pual',
  'h': 'Hiphil', 'H': 'Hophal', 't': 'Hithpael', 'o': 'Hithpolel',
  'r': 'Poel', 'u': 'Poal', 'j': 'Hithpoel', 'v': 'Nithpael',
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
    if (HEBREW_VERB_STEM[code[1]]) parts.push(HEBREW_VERB_STEM[code[1]]);
    if (code.length >= 3 && HEBREW_VERB_TENSE[code[2]]) parts.push(HEBREW_VERB_TENSE[code[2]]);
    if (code.length >= 4 && HEBREW_PERSON[code[3]]) parts.push(HEBREW_PERSON[code[3]]);
    if (code.length >= 5 && HEBREW_NUMBER[code[4]]) parts.push(HEBREW_NUMBER[code[4]]);
    if (code.length >= 6 && HEBREW_GENDER[code[5]]) parts.push(HEBREW_GENDER[code[5]]);
  } else if (pos === 'N' || pos === 'A') {
    if (code.length >= 3 && HEBREW_STATE[code[2]]) parts.push(HEBREW_STATE[code[2]]);
    if (code.length >= 4 && HEBREW_NUMBER[code[3]]) parts.push(HEBREW_NUMBER[code[3]]);
    if (code.length >= 5 && HEBREW_GENDER[code[4]]) parts.push(HEBREW_GENDER[code[4]]);
  }
  return parts.join(', ');
}

// ============================================================
// Greek morphology
// ============================================================

const GREEK_POS = {
  'N-': 'substantivo', 'V-': 'verbo', 'A-': 'adjetivo', 'D-': 'advérbio',
  'P-': 'preposição', 'C-': 'conjunção', 'RA': 'artigo definido',
  'RD': 'pronome demonstrativo', 'RI': 'pronome interrogativo',
  'RP': 'pronome pessoal', 'RR': 'pronome relativo', 'X-': 'partícula',
  'I-': 'interjeição',
};

const GREEK_CASE = { 'N': 'nom', 'G': 'gen', 'D': 'dat', 'A': 'acc', 'V': 'voc' };
const GREEK_NUMBER = { 'S': 'sing', 'P': 'plur' };
const GREEK_GENDER = { 'M': 'masc', 'F': 'fem', 'N': 'neut' };
const GREEK_PERSON = { '1': '1ª', '2': '2ª', '3': '3ª' };
const GREEK_TENSE = { 'P': 'presente', 'I': 'imperfeito', 'F': 'futuro', 'A': 'aoristo', 'X': 'perfeito', 'Y': 'pluperfeito' };
const GREEK_VOICE = { 'A': 'ativo', 'M': 'médio', 'P': 'passivo', 'D': 'deponente' };
const GREEK_MOOD = { 'I': 'indicativo', 'D': 'imperativo', 'S': 'subjuntivo', 'O': 'optativo', 'N': 'infinitivo', 'P': 'particípio' };

function parseGreekMorph(posCode, parsing) {
  if (!parsing || parsing === '--------') return GREEK_POS[posCode] || '';
  const parts = [];
  if (GREEK_POS[posCode]) parts.push(GREEK_POS[posCode]);
  const c = parsing.split('');
  if (c[0] !== '-') parts.push(GREEK_PERSON[c[0]] || '');
  if (c[1] !== '-') parts.push(GREEK_TENSE[c[1]] || '');
  if (c[2] !== '-') parts.push(GREEK_VOICE[c[2]] || '');
  if (c[3] !== '-') parts.push(GREEK_MOOD[c[3]] || '');
  if (c[4] !== '-') parts.push(GREEK_CASE[c[4]] || '');
  if (c[5] !== '-') parts.push(GREEK_NUMBER[c[5]] || '');
  if (c[6] !== '-') parts.push(GREEK_GENDER[c[6]] || '');
  return parts.filter(Boolean).join(', ');
}

// ============================================================
// Load lexicons (for morphology-only fallback)
// ============================================================

function loadGreekLemmaLookup() {
  const raw = readFileSync(join(LEXICON_DIR, 'grego.ts'), 'utf-8');
  const lookup = {};
  const normalizedLookup = {};
  const re = /\{\s*strong:\s*['"]G(\d+)['"].*?palavra:\s*'([^']*)'/gs;
  let m;
  while ((m = re.exec(raw))) {
    const lemma = m[2];
    const strong = 'G' + m[1];
    if (lemma && !lookup[lemma]) {
      lookup[lemma] = strong;
    }
    // Also build normalized lookup (strip Greek accents)
    if (lemma) {
      const norm = lemma.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      if (!normalizedLookup[norm]) {
        normalizedLookup[norm] = strong;
      }
    }
  }
  return { lookup, normalizedLookup };
}

// ============================================================
// Process OT
// ============================================================

function processOT() {
  const morphhb = require('morphhb');
  const verses = {};

  for (const [bookName, chapters] of Object.entries(morphhb)) {
    const abrev = OT_BOOK_MAP[bookName];
    if (!abrev) continue;

    for (let c = 0; c < chapters.length; c++) {
      const chapter = chapters[c];
      for (let v = 0; v < chapter.length; v++) {
        const words = chapter[v];
        const key = `${abrev}:${c + 1}:${v + 1}`;
        const strongs = [];
        const morphs = [];

        for (const [wordStr, lemma, morphCode] of words) {
          let strong = lemma;
          if (strong.includes('/')) strong = strong.split('/').pop();
          if (!strong.startsWith('H')) strong = 'H' + strong;
          strongs.push(strong);
          morphs.push(parseHebrewMorph(morphCode));
        }

        if (strongs.length > 0) {
          verses[key] = { strongs, morphs };
        }
      }
    }
  }

  return verses;
}

// ============================================================
// Process NT
// ============================================================

function processNT(lemmaLookup) {
  const { lookup, normalizedLookup } = lemmaLookup;
  const verses = {};
  const files = readdirSync(MORPHGNT_DIR).filter(f => f.endsWith('-morphgnt.txt'));
  let matchCount = 0;
  let normMatchCount = 0;
  let noMatchCount = 0;

  for (const file of files) {
    const fileNum = file.split('-')[0];
    const abrev = NT_FILE_MAP[fileNum];
    if (!abrev) continue;

    const content = readFileSync(join(MORPHGNT_DIR, file), 'utf-8');
    const lines = content.trim().split('\n');

    for (const line of lines) {
      const parts = line.split(/\s+/);
      if (parts.length < 7) continue;

      const ref = parts[0];
      const posCode = parts[1];
      const parsing = parts[2];
      const lemma = parts[6];

      const ch = parseInt(ref.substring(2, 4), 10);
      const vs = parseInt(ref.substring(4, 6), 10);
      const key = `${abrev}:${ch}:${vs}`;

      // Try exact match first, then normalized, then strip parens
      let strong = lookup[lemma] || '';
      if (!strong) {
        // Strip parenthetical variants like οὕτω(ς) -> οὕτως
        const stripped = lemma.replace(/\([^)]+\)/g, '');
        if (stripped !== lemma) strong = lookup[stripped] || '';
      }
      if (!strong) {
        const norm = lemma.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        strong = normalizedLookup[norm] || '';
        if (!strong) {
          // Also try stripping parens + normalizing
          const stripped = lemma.replace(/\([^)]+\)/g, '');
          const normStripped = stripped.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
          strong = normalizedLookup[normStripped] || '';
        }
        if (strong) normMatchCount++;
        else noMatchCount++;
      } else {
        matchCount++;
      }

      const morphPt = parseGreekMorph(posCode, parsing);

      if (!verses[key]) verses[key] = { strongs: [], morphs: [] };
      verses[key].strongs.push(strong || 'G0000');
      verses[key].morphs.push(morphPt);
    }
  }

  console.log(`  NT matching: ${matchCount} exact, ${normMatchCount} normalized, ${noMatchCount} unmatched`);
  return verses;
}

// ============================================================
// Generate compact TypeScript
// ============================================================

function generateOutput(otVerses, ntVerses) {
  const allVerses = { ...otVerses, ...ntVerses };
  const totalVerses = Object.keys(allVerses).length;
  const totalWords = Object.values(allVerses).reduce((sum, v) => sum + v.strongs.length, 0);

  console.log(`OT verses: ${Object.keys(otVerses).length}`);
  console.log(`NT verses: ${Object.keys(ntVerses).length}`);
  console.log(`Total verses: ${totalVerses}`);
  console.log(`Total words: ${totalWords}`);

  // Sort keys
  const bookOrder = {};
  const allAbrevs = [...Object.values(OT_BOOK_MAP), ...Object.values(NT_FILE_MAP)];
  allAbrevs.forEach((b, i) => bookOrder[b] = i);

  const sortedKeys = Object.keys(allVerses).sort((a, b) => {
    const [aB, aC, aV] = a.split(':');
    const [bB, bC, bV] = b.split(':');
    const aO = bookOrder[aB] ?? 999;
    const bO = bookOrder[bB] ?? 999;
    if (aO !== bO) return aO - bO;
    if (aC !== bC) return parseInt(aC) - parseInt(bC);
    return parseInt(aV) - parseInt(bV);
  });

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
  lines.push(`export const STRONG_POR_VERSICULO: Record<string, PalavraStrong[]> = {};`);
  lines.push(``);

  // Compact format: "key": ["H123","H456",...] + morphs
  lines.push(`const STRONG_CODES: Record<string, [string[], string[]]> = {`);

  for (const key of sortedKeys) {
    const { strongs, morphs } = allVerses[key];
    const strongsJson = JSON.stringify(strongs);
    const morphsJson = JSON.stringify(morphs);
    lines.push(`  '${key}': [${strongsJson}, ${morphsJson}],`);
  }

  lines.push(`};`);
  lines.push(``);

  // Import lexicons at runtime
  lines.push(`import { palavrasHebraicas } from '@/data/lexicon/hebraico';`);
  lines.push(`import { palavrasGregas } from '@/data/lexicon/grego';`);
  lines.push(``);
  lines.push(`let _hebLookup: Record<string, typeof palavrasHebraicas[0]> | null = null;`);
  lines.push(`let _grkLookup: Record<string, typeof palavrasGregas[0]> | null = null;`);
  lines.push(``);
  lines.push(`function getHebLookup() {`);
  lines.push(`  if (!_hebLookup) {`);
  lines.push(`    _hebLookup = {};`);
  lines.push(`    for (const p of palavrasHebraicas) _hebLookup[p.strong] = p;`);
  lines.push(`  }`);
  lines.push(`  return _hebLookup;`);
  lines.push(`}`);
  lines.push(``);
  lines.push(`function getGrkLookup() {`);
  lines.push(`  if (!_grkLookup) {`);
  lines.push(`    _grkLookup = {};`);
  lines.push(`    for (const p of palavrasGregas) _grkLookup[p.strong] = p;`);
  lines.push(`  }`);
  lines.push(`  return _grkLookup;`);
  lines.push(`}`);
  lines.push(``);
  lines.push(`export function getStrongPorVersiculo(livro: string, capitulo: number, versiculo: number): PalavraStrong[] {`);
  lines.push(`  const key = \`\${livro}:\${capitulo}:\${versiculo}\`;`);
  lines.push(`  const entry = STRONG_CODES[key];`);
  lines.push(`  if (!entry) return [];`);
  lines.push(`  const [codes, morphs] = entry;`);
  lines.push(`  const heb = getHebLookup();`);
  lines.push(`  const grk = getGrkLookup();`);
  lines.push(`  return codes.map((code, i) => {`);
  lines.push(`    const isHeb = code.startsWith('H');`);
  lines.push(`    const lex = isHeb ? heb[code] : grk[code];`);
  lines.push(`    return {`);
  lines.push(`      strong: code,`);
  lines.push(`      palavra: lex?.palavra || '',`);
  lines.push(`      transliteracao: lex?.transliteracao || '',`);
  lines.push(`      definicao: lex?.definicao || '',`);
  lines.push(`      morfologia: morphs[i] || '',`);
  lines.push(`      idioma: isHeb ? 'hebraico' : 'grego',`);
  lines.push(`    };`);
  lines.push(`  });`);
  lines.push(`}`);
  lines.push(``);
  lines.push(`export function buscarVersiculoComStrong(livro: string, capitulo: number, versiculo: number): PalavraStrong[] {`);
  lines.push(`  return getStrongPorVersiculo(livro, capitulo, versiculo);`);
  lines.push(`}`);
  lines.push(``);
  lines.push(`export function buscarPalavraStrong(codigo: string): PalavraStrong | null {`);
  lines.push(`  const isHeb = codigo.startsWith('H');`);
  lines.push(`  const lex = isHeb ? getHebLookup()[codigo] : getGrkLookup()[codigo];`);
  lines.push(`  if (!lex) return null;`);
  lines.push(`  return {`);
  lines.push(`    strong: codigo,`);
  lines.push(`    palavra: lex.palavra,`);
  lines.push(`    transliteracao: lex.transliteracao,`);
  lines.push(`    definicao: lex.definicao,`);
  lines.push(`    morfologia: '',`);
  lines.push(`    idioma: isHeb ? 'hebraico' : 'grego',`);
  lines.push(`  };`);
  lines.push(`}`);
  lines.push(``);
  lines.push(`export function getVersiculosComStrong(): string[] {`);
  lines.push(`  return Object.keys(STRONG_CODES);`);
  lines.push(`}`);
  lines.push(``);
  lines.push(`export function getStrongPorChave(key: string): PalavraStrong[] {`);
  lines.push(`  const entry = STRONG_CODES[key];`);
  lines.push(`  if (!entry) return [];`);
  lines.push(`  const [codes, morphs] = entry;`);
  lines.push(`  const heb = getHebLookup();`);
  lines.push(`  const grk = getGrkLookup();`);
  lines.push(`  return codes.map((code, i) => {`);
  lines.push(`    const isHeb = code.startsWith('H');`);
  lines.push(`    const lex = isHeb ? heb[code] : grk[code];`);
  lines.push(`    return {`);
  lines.push(`      strong: code,`);
  lines.push(`      palavra: lex?.palavra || '',`);
  lines.push(`      transliteracao: lex?.transliteracao || '',`);
  lines.push(`      definicao: lex?.definicao || '',`);
  lines.push(`      morfologia: morphs[i] || '',`);
  lines.push(`      idioma: isHeb ? 'hebraico' : 'grego',`);
  lines.push(`    };`);
  lines.push(`  });`);
  lines.push(`}`);
  lines.push(``);
  lines.push(`export function buscarStrong(termo: string): PalavraStrong[] {`);
  lines.push(`  const termoLower = termo.toLowerCase();`);
  lines.push(`  const results: PalavraStrong[] = []`);
  lines.push(`  const heb = getHebLookup();`);
  lines.push(`  const grk = getGrkLookup();`);
  lines.push(`  if (termo.startsWith('H') || termo.startsWith('G')) {`);
  lines.push(`    const lex = termo.startsWith('H') ? heb[termo] : grk[termo];`);
  lines.push(`    if (lex) {`);
  lines.push(`      results.push({ strong: termo, palavra: lex.palavra, transliteracao: lex.transliteracao, definicao: lex.definicao, morfologia: '', idioma: termo.startsWith('H') ? 'hebraico' : 'grego' });`);
  lines.push(`    }`);
  lines.push(`  } else {`);
  lines.push(`    for (const [code, entry] of Object.entries(heb)) {`);
  lines.push(`      if (entry.palavra.toLowerCase().includes(termoLower) || entry.transliteracao.toLowerCase().includes(termoLower)) {`);
  lines.push(`        results.push({ strong: code, palavra: entry.palavra, transliteracao: entry.transliteracao, definicao: entry.definicao, morfologia: '', idioma: 'hebraico' });`);
  lines.push(`      }`);
  lines.push(`    }`);
  lines.push(`    for (const [code, entry] of Object.entries(grk)) {`);
  lines.push(`      if (entry.palavra.toLowerCase().includes(termoLower) || entry.transliteracao.toLowerCase().includes(termoLower)) {`);
  lines.push(`        results.push({ strong: code, palavra: entry.palavra, transliteracao: entry.transliteracao, definicao: entry.definicao, morfologia: '', idioma: 'grego' });`);
  lines.push(`      }`);
  lines.push(`    }`);
  lines.push(`  }`);
  lines.push(`  return results;`);
  lines.push(`}`);
  lines.push(``);
  lines.push(`export function getTodasOcorrenciasStrong(codigo: string): string[] {`);
  lines.push(`  const results: string[] = []`);
  lines.push(`  for (const [key, [codes]] of Object.entries(STRONG_CODES)) {`);
  lines.push(`    if (codes.includes(codigo)) results.push(key);`);
  lines.push(`  }`);
  lines.push(`  return results;`);
  lines.push(`}`);
  lines.push(``);

  return lines.join('\n');
}

// ============================================================
// Main
// ============================================================

console.log('Loading Greek lemma lookup...');
const lemmaLookup = loadGreekLemmaLookup();
console.log(`  ${Object.keys(lemmaLookup.lookup).length} lemma -> Strong's mappings`);

console.log('\nProcessing OT (Hebrew)...');
const otVerses = processOT();

console.log('\nProcessing NT (Greek)...');
const ntVerses = processNT(lemmaLookup);

console.log('\nGenerating compact output...');
const output = generateOutput(otVerses, ntVerses);

writeFileSync(OUTPUT_FILE, output, 'utf-8');
const stats = require('fs').statSync(OUTPUT_FILE);
console.log(`\nDone! Written ${output.split('\n').length} lines (${(stats.size / 1024 / 1024).toFixed(1)} MB) to ${OUTPUT_FILE}`);
