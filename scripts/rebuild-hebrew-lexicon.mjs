#!/usr/bin/env node
/**
 * rebuild-hebrew-lexicon.mjs
 *
 * Rebuilds the Hebrew lexicon from the 'strongs' npm package + morphhb frequency data.
 * Generates src/data/lexicon/hebraico.ts with complete transliterations and definitions.
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const require = createRequire(import.meta.url);

// ─── 1. Load Strong's Hebrew dictionary ──────────────────────────────────────

const strongsDict = require('strongs/hebrew/strongs-hebrew-dictionary.js');
console.log(`📖 Strong's Hebrew entries: ${Object.keys(strongsDict).length}`);

// ─── 2. Load STRONG_CODES for frequency data ─────────────────────────────────

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

const objBlock = raw.slice(blockStart, blockEnd);

// Count frequency of each Hebrew Strong's code
const strongFreq = new Map();
const entryRe = /'([^']+)'\s*:\s*\[\s*(\[.*?\])\s*,\s*(\[.*?\])\s*\]/g;
let match;
while ((match = entryRe.exec(objBlock)) !== null) {
  const strongs = JSON.parse(match[2]);
  for (const code of strongs) {
    if (!code.startsWith('H')) continue;
    strongFreq.set(code, (strongFreq.get(code) || 0) + 1);
  }
}

console.log(`🔢 Hebrew codes with frequency: ${strongFreq.size}`);

// ─── 3. Transliteration mapping (Hebrew consonants + vowels) ─────────────────

const HEBREW_TO_LATIN = {
  'א': '', 'ב': 'b', 'ג': 'g', 'ד': 'd', 'ה': 'h', 'ו': 'v/w',
  'ז': 'z', 'ח': 'ch', 'ט': 't', 'י': 'y', 'כ': 'k', 'ך': 'k',
  'ל': 'l', 'מ': 'm', 'ם': 'm', 'נ': 'n', 'ן': 'n', 'ס': 's',
  'ע': '', 'פ': 'p', 'ף': 'p', 'צ': 'ts', 'ץ': 'ts', 'ק': 'q',
  'ר': 'r', 'ש': 'sh/s', 'ת': 't',
  'ָ': 'a', 'ֶ': 'e', 'ִ': 'i', 'ֹ': 'o', 'ֻ': 'u', 'ַ': 'a',
  'ְ': '', 'ּ': '', 'ִ': 'i', 'ֵ': 'e', 'ִ': 'i',
};

function stripNikkud(word) {
  return word.replace(/[\u0591-\u05C7]/g, '').replace(/[ְִֵֶָֹֻּ]/g, '');
}

// ─── 4. Generate entries ─────────────────────────────────────────────────────

const entries = [];

for (const [strong, data] of Object.entries(strongsDict)) {
  if (!strong.startsWith('H')) continue;

  const palavra = stripNikkud(data.lemma || '');
  const transliteracao = data.xlit || '';
  const definicao = (data.strongs_def || '').replace(/^\{|\}$/g, '').trim();
  const definicaoKJV = (data.kjv_def || '').replace(/^\{|\}$/g, '').trim();
  const pron = data.pron || '';
  const frequencia = strongFreq.get(strong) || 0;

  // Use KJV def if strongs_def is empty
  const definicaoFinal = definicao || definicaoKJV || '';

  entries.push({
    strong,
    palavra,
    transliteracao,
    definicao: definicaoFinal,
    pron,
    frequencia,
  });
}

// Sort by Strong's number
entries.sort((a, b) => {
  const numA = parseInt(a.strong.replace('H', ''), 10);
  const numB = parseInt(b.strong.replace('H', ''), 10);
  return numA - numB;
});

// ─── 5. Generate TypeScript ──────────────────────────────────────────────────

function escapeTS(s) {
  if (!s) return '';
  return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, ' ');
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
  if (e.pron) {
    parts.push(`morfologia: '${escapeTS(e.pron)}'`);
  }
  if (e.frequencia) {
    parts.push(`frequencia: ${e.frequencia}`);
  }
  lines.push(`  { ${parts.join(', ')} },`);
}

lines.push(`];`);
lines.push(``);

const outPath = resolve(ROOT, 'src/data/lexicon/hebraico.ts');
writeFileSync(outPath, lines.join('\n'), 'utf8');

// ─── 6. Statistics ───────────────────────────────────────────────────────────

const total = entries.length;
const withDef = entries.filter(e => e.definicao).length;
const withXlit = entries.filter(e => e.transliteracao).length;
const totalFreq = entries.reduce((s, e) => s + e.frequencia, 0);
const top10 = [...entries].sort((a, b) => b.frequencia - a.frequencia).slice(0, 10);

console.log(`\n📊 Hebrew lexicon statistics:`);
console.log(`   Unique entries: ${total}`);
console.log(`   With definition: ${withDef} (${Math.round(withDef/total*100)}%)`);
console.log(`   With transliteration: ${withXlit} (${Math.round(withXlit/total*100)}%)`);
console.log(`   Total occurrences: ${totalFreq}`);
console.log(`\n   Top 10 most frequent:`);
for (const e of top10) {
  console.log(`     ${e.strong} ${e.palavra} (${e.transliteracao}) — ${e.frequencia}× — ${e.definicao.substring(0, 40)}`);
}
console.log(`\n✅ Generated: ${outPath}`);
