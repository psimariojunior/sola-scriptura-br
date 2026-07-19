#!/usr/bin/env node
/**
 * build-greek-lexicon.mjs
 *
 * Lê o dicionário completo Strong's Greek (temp_greek.json) com ~5500 entradas,
 * merge com as entradas curadas existentes de grego.ts,
 * e gera src/data/lexicon/grego.ts atualizado.
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

// ─── 1. Ler dicionário completo Strong's Greek ──────────────────────────────

const strongsPath = resolve(ROOT, 'temp_greek.json');
const strongsData = JSON.parse(readFileSync(strongsPath, 'utf8'));

console.log(`📥 Strong's Greek entries loaded: ${Object.keys(strongsData).length}`);

// ─── 2. Ler e parsear as entradas existentes de grego.ts ─────────────────────

const gregoPath = resolve(ROOT, 'src/data/lexicon/grego.ts');
const gregoRaw = readFileSync(gregoPath, 'utf8');

const existingMap = new Map();
const entryObjRe = /\{\s*strong:\s*'G(\d+)'([^}]*)\}/g;
let existingMatch;
while ((existingMatch = entryObjRe.exec(gregoRaw)) !== null) {
  const strongNum = 'G' + existingMatch[1];
  const body = existingMatch[2];

  const getField = (name) => {
    const m = body.match(new RegExp(`${name}:\\s*'([^']*(?:\\\\.[^']*)*)'`));
    return m ? m[1].replace(/\\\\'/g, "'").replace(/\\\\/g, '\\') : '';
  };
  const getArrayField = (name) => {
    const m = body.match(new RegExp(`${name}:\\s*\\[([^\\]]*)\\]`));
    if (!m) return [];
    return m[1].match(/'([^']*)'/g)?.map(s => s.replace(/'/g, '')) || [];
  };
  const getOptionalField = (name) => {
    const m = body.match(new RegExp(`${name}:\\s*'([^']*(?:\\\\.[^']*)*)'`));
    return m ? m[1].replace(/\\\\'/g, "'").replace(/\\\\/g, '\\') : undefined;
  };
  const getNumberField = (name) => {
    const m = body.match(new RegExp(`${name}:\\s*(\\d+)`));
    return m ? parseInt(m[1]) : undefined;
  };

  existingMap.set(strongNum, {
    strong: strongNum,
    palavra: getField('palavra'),
    transliteracao: getField('transliteracao'),
    definicao: getField('definicao'),
    definicaoResumida: getField('definicaoResumida'),
    categoria: getField('categoria'),
    testamento: getField('testamento'),
    morphologia: getField('morphologia'),
    uso: getField('uso'),
    versiculos: getArrayField('versiculos'),
    pronuncia: getField('pronuncia'),
    palavrasDerivadas: getArrayField('palavrasDerivadas'),
    notas: getOptionalField('notas'),
    frequencia: getNumberField('frequencia'),
  });
}

console.log(`✅ Entradas existentes no grego.ts: ${existingMap.size}`);

// ─── 3. Mapeamento de morfologia → categoria ──────────────────────────────────

function inferCategoria(strongEntry) {
  const kjvDef = (strongEntry.kjv_def || '').toLowerCase();
  const lemma = strongEntry.lemma || '';

  // Infer based on KJV definition patterns
  if (kjvDef.includes('(v.)') || kjvDef.includes('to ') || kjvDef.includes('-ed') || kjvDef.includes('-ing')) {
    return 'verbo';
  }
  if (kjvDef.includes('(adj.)') || kjvDef.includes('(a.)') || kjvDef.match(/\b(good|great|small|big|new|old|first|last|holy|right|just|evil|bad|dark|light|rich|poor|strong|weak|wise|foolish)\b/)) {
    return 'adjetivo';
  }
  if (kjvDef.includes('(adv.)')) return 'advérbio';
  if (kjvDef.includes('(prep.)') || kjvDef.includes('(particle)')) return 'preposição';
  if (kjvDef.includes('(conj.)')) return 'conjunção';
  if (kjvDef.includes('(pron.)') || kjvDef.includes('(pronoun)')) return 'pronome';

  // Default based on common Greek patterns
  if (lemma.endsWith('ω') || lemma.endsWith('ομαι') || lemma.endsWith('μι')) return 'verbo';
  if (lemma.endsWith('ος') || lemma.endsWith('ης') || lemma.endsWith('ον') || lemma.endsWith('ον')) return 'adjetivo';
  if (lemma.endsWith('η') || lemma.endsWith('ια') || lemma.endsWith('σις') || lemma.endsWith('μα')) return 'substantivo';

  return 'substantivo';
}

// ─── 4. Merge: manter existentes + adicionar novos ───────────────────────────

const merged = new Map(existingMap);
let addedCount = 0;
let curatedKept = 0;

for (const [key, entry] of Object.entries(strongsData)) {
  if (!key.startsWith('G')) continue;

  // If we already have a curated entry, keep it (preserves rich Portuguese data)
  if (merged.has(key)) {
    curatedKept++;
    continue;
  }

  const palavra = entry.lemma || '';
  const transliteracao = entry.translit || '';
  const definicaoEn = entry.strongs_def || entry.kjv_def || '';
  const kjvDef = entry.kjv_def || '';
  const categoria = inferCategoria(entry);

  // Create a brief Portuguese summary from the English definition
  const definicaoResumida = definicaoEn.length > 40
    ? definicaoEn.substring(0, 37) + '...'
    : definicaoEn;

  merged.set(key, {
    strong: key,
    palavra,
    transliteracao,
    definicao: definicaoEn,
    definicaoResumida,
    categoria,
    testamento: 'NT',
    morphologia: entry.derivation || '',
    uso: kjvDef,
    versiculos: [],
    pronuncia: transliteracao,
    frequencia: 0,
  });
  addedCount++;
}

console.log(`✅ Entradas existentes preservadas: ${curatedKept}`);
console.log(`✅ Novas entradas adicionadas: ${addedCount}`);
console.log(`✅ Total final: ${merged.size}`);

// ─── 5. Ordenar por número Strong e gerar o arquivo ──────────────────────────

const sorted = Array.from(merged.values()).sort((a, b) => {
  const numA = parseInt(a.strong.replace('G', ''), 10);
  const numB = parseInt(b.strong.replace('G', ''), 10);
  return numA - numB;
});

function escapeTS(s) {
  if (!s) return '';
  return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

const lines = [];
lines.push(`export interface PalavraGrega {`);
lines.push(`  strong: string;`);
lines.push(`  palavra: string;`);
lines.push(`  transliteracao: string;`);
lines.push(`  definicao: string;`);
lines.push(`  definicaoResumida: string;`);
lines.push(`  categoria: 'substantivo' | 'verbo' | 'adjetivo' | 'advérbio' | 'preposição' | 'conjunção' | 'pronome' | 'numeral' | 'partícula' | 'interjeição';`);
lines.push(`  testamento: 'AT' | 'NT' | 'ambos';`);
lines.push(`  morphologia: string;`);
lines.push(`  uso: string;`);
lines.push(`  versiculos: string[];`);
lines.push(`  pronuncia: string;`);
lines.push(`  palavrasDerivadas?: string[];`);
lines.push(`  notas?: string;`);
lines.push(`  frequencia?: number;`);
lines.push(`}`);
lines.push(``);
lines.push(`export const palavrasGregas: PalavraGrega[] = [`);

for (const e of sorted) {
  const versiculosStr = e.versiculos && e.versiculos.length > 0
    ? `[${e.versiculos.map(v => `'${escapeTS(v)}'`).join(', ')}]`
    : '[]';

  const derivadasStr = e.palavrasDerivadas && e.palavrasDerivadas.length > 0
    ? `, palavrasDerivadas: [${e.palavrasDerivadas.map(v => `'${escapeTS(v)}'`).join(', ')}]`
    : '';

  const notasStr = e.notas
    ? `, notas: '${escapeTS(e.notas)}'`
    : '';

  const freqStr = e.frequencia && e.frequencia > 0
    ? `, frequencia: ${e.frequencia}`
    : '';

  lines.push(`  { strong: '${escapeTS(e.strong)}', palavra: '${escapeTS(e.palavra)}', transliteracao: '${escapeTS(e.transliteracao)}', definicao: '${escapeTS(e.definicao)}', definicaoResumida: '${escapeTS(e.definicaoResumida)}', categoria: '${escapeTS(e.categoria)}', testamento: '${escapeTS(e.testamento)}', morphologia: '${escapeTS(e.morphologia)}', uso: '${escapeTS(e.uso)}', versiculos: ${versiculosStr}, pronuncia: '${escapeTS(e.pronuncia)}'${derivadasStr}${notasStr}${freqStr} },`);
}

lines.push(`];`);
lines.push(``);

writeFileSync(gregoPath, lines.join('\n'), 'utf8');

// ─── 6. Estatísticas ─────────────────────────────────────────────────────────

const total = sorted.length;
const withPronuncia = sorted.filter(e => e.pronuncia).length;
const withNotas = sorted.filter(e => e.notas).length;
const withFrequencia = sorted.filter(e => e.frequencia && e.frequencia > 0).length;

console.log(`\n📊 Estatísticas do léxico grego expandido:`);
console.log(`   Total de entradas: ${total}`);
console.log(`   Com pronúncia: ${withPronuncia}`);
console.log(`   Com notas: ${withNotas}`);
console.log(`   Com frequência: ${withFrequencia}`);
console.log(`   Entradas existentes preservadas: ${curatedKept}`);
console.log(`   Novas entradas adicionadas: ${addedCount}`);
console.log(`\n✅ Arquivo gerado: ${gregoPath}`);
