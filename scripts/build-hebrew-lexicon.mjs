#!/usr/bin/env node
/**
 * build-hebrew-lexicon.mjs
 *
 * Reads STRONG_CODES from strong/index.ts (compact format),
 * extracts all unique Hebrew Strong's codes, gets word data from morphhb,
 * calculates frequency and generates src/data/lexicon/hebraico.ts.
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const require = createRequire(import.meta.url);

// ─── 1. Parse STRONG_CODES from strong/index.ts ─────────────────────────────

const strongPath = resolve(ROOT, 'src/data/biblia/strong/index.ts');
const raw = readFileSync(strongPath, 'utf8');

const codesStart = raw.indexOf('const STRONG_CODES: Record<string, [string[], string[]]> = {');
if (codesStart === -1) {
  console.error('Could not find STRONG_CODES in strong/index.ts');
  process.exit(1);
}
const blockStart = raw.indexOf('{', codesStart);

let depth = 0;
let blockEnd = -1;
for (let i = blockStart; i < raw.length; i++) {
  if (raw[i] === '{') depth++;
  if (raw[i] === '}') depth--;
  if (depth === 0) { blockEnd = i + 1; break; }
}
if (blockEnd === -1) {
  console.error('Could not find end of STRONG_CODES object');
  process.exit(1);
}

const objBlock = raw.slice(blockStart, blockEnd);

// Parse each entry: 'key': [["H123","H456",...], ["morph1","morph2",...]]
const verseEntries = new Map();
const entryRe = /'([^']+)'\s*:\s*\[\s*(\[.*?\])\s*,\s*(\[.*?\])\s*\]/g;
let match;
while ((match = entryRe.exec(objBlock)) !== null) {
  const verseKey = match[1];
  const strongs = JSON.parse(match[2]);
  const morphs = JSON.parse(match[3]);
  verseEntries.set(verseKey, { strongs, morphs });
}

console.log(`Parsed ${verseEntries.size} verses from STRONG_CODES`);

// ─── 2. Build frequency map of Hebrew Strong's codes ────────────────────────

const strongFreq = new Map(); // strong -> { count, verses: Set }

for (const [verseKey, { strongs }] of verseEntries) {
  for (const code of strongs) {
    if (!code.startsWith('H')) continue;
    const existing = strongFreq.get(code);
    if (existing) {
      existing.count++;
      existing.verses.add(verseKey);
    } else {
      strongFreq.set(code, { count: 1, verses: new Set([verseKey]) });
    }
  }
}

console.log(`Unique Hebrew Strong's codes: ${strongFreq.size}`);

// ─── 3. Get word data from morphhb ──────────────────────────────────────────

const morphhb = require('morphhb');

// Build a map: strongNumber -> { palavra, transliteracao }
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

// Collect first occurrence of each strong number for word data
const wordData = new Map(); // strongNumber -> { palavra, transliteracao }

for (const [bookName, chapters] of Object.entries(morphhb)) {
  for (let c = 0; c < chapters.length; c++) {
    const chapter = chapters[c];
    for (let v = 0; v < chapter.length; v++) {
      const words = chapter[v];
      for (const [wordStr, lemma, morphCode] of words) {
        let strong = lemma;
        if (strong.includes('/')) strong = strong.split('/').pop();
        if (!strong.startsWith('H')) strong = 'H' + strong;

        if (!wordData.has(strong)) {
          wordData.set(strong, {
            palavra: wordStr || '',
            transliteracao: '', // morphhb doesn't provide transliteration
          });
        }
      }
    }
  }
}

// ─── 4. Merge frequency + word data, generate output ────────────────────────

const entries = [];
for (const [strong, { count, verses }] of strongFreq) {
  const wd = wordData.get(strong);
  entries.push({
    strong,
    palavra: wd?.palavra || '',
    transliteracao: wd?.transliteracao || '',
    definicao: '', // Definitions come from lexicon curation
    frequencia: count,
  });
}

// Sort by Strong's number
entries.sort((a, b) => {
  const numA = parseInt(a.strong.replace('H', ''), 10);
  const numB = parseInt(b.strong.replace('H', ''), 10);
  return numA - numB;
});

// ─── 5. Generate TypeScript ─────────────────────────────────────────────────

function escapeTS(s) {
  if (!s) return '';
  return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

const lines = [];
lines.push(`export interface PalavraHebraica {`);
lines.push(`  strong: string;`);
lines.push(`  palavra: string;`);
lines.push(`  transliteracao: string;`);
lines.push(`  definicao: string;`);
lines.push(`  morfologia?: string;`);
lines.push(`  frequencia?: number;`);
lines.push(`}`);
lines.push(``);
lines.push(`export const palavrasHebraicas: PalavraHebraica[] = [`);

for (const e of entries) {
  const parts = [
    `strong: '${escapeTS(e.strong)}'`,
    `palavra: '${escapeTS(e.palavra)}'`,
    `transliteracao: '${escapeTS(e.transliteracao)}'`,
    `definicao: '${escapeTS(e.definicao)}'`,
  ];
  if (e.frequencia) {
    parts.push(`frequencia: ${e.frequencia}`);
  }
  lines.push(`  { ${parts.join(', ')} },`);
}

lines.push(`];`);
lines.push(``);

const outPath = resolve(ROOT, 'src/data/lexicon/hebraico.ts');
writeFileSync(outPath, lines.join('\n'), 'utf8');

// ─── 6. Statistics ──────────────────────────────────────────────────────────

const total = entries.length;
const withPalavra = entries.filter(e => e.palavra).length;
const totalFreq = entries.reduce((s, e) => s + e.frequencia, 0);
const top10 = [...entries].sort((a, b) => b.frequencia - a.frequencia).slice(0, 10);

console.log(`\n📊 Hebrew lexicon statistics:`);
console.log(`   Unique entries: ${total}`);
console.log(`   With word form: ${withPalavra}`);
console.log(`   Total occurrences: ${totalFreq}`);
console.log(`\n   Top 10 most frequent:`);
for (const e of top10) {
  console.log(`     ${e.strong} ${e.palavra} — ${e.frequencia}×`);
}
console.log(`\n✅ Generated: ${outPath}`);
