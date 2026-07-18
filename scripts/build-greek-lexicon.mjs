#!/usr/bin/env node
/**
 * build-greek-lexicon.mjs
 *
 * Lê STRONG_POR_VERSICULO de src/data/biblia/strong/index.ts,
 * extrai todas as palavras gregas, deduplica por número Strong,
 * calcula frequência, merge com as entradas existentes de grego.ts
 * e gera src/data/lexicon/grego.ts.
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

// ─── Mapeamento de abreviações de livros ─────────────────────────────────────

const BOOK_MAP = {
  gn: 'Gn', ex: 'Ex', lv: 'Lv', nm: 'Nm', dt: 'Dt',
  js: 'Js', jz: 'Jz', rt: 'Rt', '1sm': '1 Sm', '2sm': '2 Sm',
  '1rs': '1 Rs', '2rs': '2 Rs', '1cr': '1 Cr', '2cr': '2 Cr',
  ed: 'Ed', ne: 'Ne', et: 'Et', jo: 'Jó', sl: 'Sl',
  pv: 'Pv', ec: 'Ec', ct: 'Ct', is: 'Is', jr: 'Jr',
  lm: 'Lm', ez: 'Ez', dn: 'Dn', os: 'Os', jl: 'Jl',
  am: 'Am', ob: 'Ob', mq: 'Mq', na: 'Na', hc: 'Hc',
  sof: 'Sof', ag: 'Ag', zc: 'Zc', ml: 'Ml',
  mt: 'Mt', mc: 'Mc', lc: 'Lc', at: 'At',
  rm: 'Rm', '1co': '1 Co', '2co': '2 Co', gl: 'Gl',
  ef: 'Ef', fp: 'Fp', cl: 'Cl', '1ts': '1 Ts', '2ts': '2 Ts',
  '1tm': '1 Tm', '2tm': '2 Tm', tt: 'Tt', fm: 'Fm',
  hb: 'Hb', tg: 'Tg', '1pe': '1 Pe', '2pe': '2 Pe',
  '1jo': '1 Jo', '2jo': '2 Jo', '3jo': '3 Jo', jd: 'Jd', rv: 'Ap',
};

function verseKeyToRef(key) {
  const parts = key.split(':');
  if (parts.length < 3) return key;
  const [book, chap, ver] = parts;
  const abbr = BOOK_MAP[book] || book.toUpperCase();
  return `${abbr} ${chap}:${ver}`;
}

// ─── Mapeamento de morfologia → categoria ────────────────────────────────────

function inferCategoria(morfologia) {
  const m = morfologia.toLowerCase();
  if (m.includes('verbo')) return 'verbo';
  if (m.includes('adjetivo')) return 'adjetivo';
  if (m.includes('advérbio') || m.includes('adverbio')) return 'advérbio';
  if (m.includes('preposição') || m.includes('preposicao')) return 'preposição';
  if (m.includes('conjunção') || m.includes('conjuncao')) return 'conjunção';
  if (m.includes('pronome')) return 'pronome';
  if (m.includes('numeral')) return 'numeral';
  if (m.includes('partícula') || m.includes('particula')) return 'partícula';
  if (m.includes('interjeição') || m.includes('interjeicao')) return 'interjeição';
  if (m.includes('substantivo')) return 'substantivo';
  return 'substantivo';
}

// ─── 1. Ler e parsear o arquivo strong/index.ts ──────────────────────────────

const strongPath = resolve(ROOT, 'src/data/biblia/strong/index.ts');
const raw = readFileSync(strongPath, 'utf8');

const objStart = raw.indexOf('STRONG_POR_VERSICULO: Record<string, PalavraStrong[]> = {');
if (objStart === -1) {
  console.error('Não encontrei STRONG_POR_VERSICULO no arquivo.');
  process.exit(1);
}
const blockStart = raw.indexOf('{', objStart);

let depth = 0;
let blockEnd = -1;
for (let i = blockStart; i < raw.length; i++) {
  if (raw[i] === '{') depth++;
  if (raw[i] === '}') depth--;
  if (depth === 0) { blockEnd = i + 1; break; }
}
if (blockEnd === -1) {
  console.error('Não consegui encontrar o fim do objeto STRONG_POR_VERSICULO.');
  process.exit(1);
}

const objBlock = raw.slice(blockStart, blockEnd);

const entryRe = /'([^']+)'\s*:\s*\[([\s\S]*?)\]\s*,?/g;
const verses = new Map();
let match;
while ((match = entryRe.exec(objBlock)) !== null) {
  const verseKey = match[1];
  const arrBlock = match[2];
  const objRe = /\{([^}]+)\}/g;
  let objMatch;
  const palavras = [];
  while ((objMatch = objRe.exec(arrBlock)) !== null) {
    const props = objMatch[1];
    const get = (name) => {
      const m = props.match(new RegExp(`${name}\\s*:\\s*'([^']*)'`));
      return m ? m[1] : '';
    };
    palavras.push({
      strong: get('strong'),
      palavra: get('palavra'),
      transliteracao: get('transliteracao'),
      definicao: get('definicao'),
      morfologia: get('morfologia'),
      idioma: get('idioma'),
    });
  }
  if (palavras.length > 0) {
    verses.set(verseKey, palavras);
  }
}

console.log(`✅ Versículos parseados: ${verses.size}`);

// ─── 2. Filtrar apenas gregos e deduplicar ───────────────────────────────────

const byStrong = new Map();

for (const [verseKey, palavras] of verses) {
  for (const p of palavras) {
    if (p.idioma !== 'grego') continue;
    if (!p.strong.startsWith('G')) continue;

    const ref = verseKeyToRef(verseKey);
    const existing = byStrong.get(p.strong);

    // strong/index.ts has: definicao = grammar, morfologia = meaning
    // We swap to match grego.ts: definicao = meaning, morphologia = grammar
    if (!existing) {
      byStrong.set(p.strong, {
        strong: p.strong,
        palavra: p.palavra,
        transliteracao: p.transliteracao,
        definicao: p.morfologia || '',
        morfologia: p.definicao,
        ocorrencias: new Set([ref]),
      });
    } else {
      existing.ocorrencias.add(ref);
      if (p.palavra && !existing.palavra) existing.palavra = p.palavra;
      if (p.transliteracao && !existing.transliteracao) existing.transliteracao = p.transliteracao;
      if (p.morfologia && p.morfologia.length > existing.definicao.length) existing.definicao = p.morfologia;
      if (p.definicao && !existing.morfologia) existing.morfologia = p.definicao;
    }
  }
}

const strongEntries = Array.from(byStrong.values()).map((e) => ({
  strong: e.strong,
  palavra: e.palavra,
  transliteracao: e.transliteracao,
  definicao: e.definicao,
  morfologia: e.morfologia || undefined,
  frequencia: e.ocorrencias.size,
  versiculos: Array.from(e.ocorrencias).sort(),
}));

strongEntries.sort((a, b) => {
  const numA = parseInt(a.strong.replace('G', ''), 10);
  const numB = parseInt(b.strong.replace('G', ''), 10);
  return numA - numB;
});

console.log(`✅ Entradas gregas únicas (Strong): ${strongEntries.length}`);

// ─── 3. Ler e parsear as entradas existentes de grego.ts ─────────────────────

const gregoPath = resolve(ROOT, 'src/data/lexicon/grego.ts');
const gregoRaw = readFileSync(gregoPath, 'utf8');

// Extrair as entradas existentes do array palavrasGregas
const existingMap = new Map();

// Regex para extrair cada objeto do array
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

// ─── 4. Merge: manter existentes + adicionar novos ───────────────────────────

const merged = new Map(existingMap);

let addedCount = 0;
for (const entry of strongEntries) {
  if (merged.has(entry.strong)) continue;

  const definicao = entry.definicao || '';
  const morphologia = entry.morfologia || '';
  const definicaoResumida = definicao.length > 40
    ? definicao.substring(0, 37) + '...'
    : definicao;

  merged.set(entry.strong, {
    strong: entry.strong,
    palavra: entry.palavra,
    transliteracao: entry.transliteracao,
    definicao: definicao,
    definicaoResumida: definicaoResumida,
    categoria: morphologia ? inferCategoria(morphologia) : 'substantivo',
    testamento: 'NT',
    morphologia: morphologia,
    uso: entry.versiculos.join('; '),
    versiculos: entry.versiculos,
    pronuncia: '',
    frequencia: entry.frequencia,
  });
  addedCount++;
}

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
  const versiculosStr = e.versiculos.length > 0
    ? `[${e.versiculos.map(v => `'${escapeTS(v)}'`).join(', ')}]`
    : '[]';

  const derivadasStr = e.palavrasDerivadas && e.palavrasDerivadas.length > 0
    ? `, palavrasDerivadas: [${e.palavrasDerivadas.map(v => `'${escapeTS(v)}'`).join(', ')}]`
    : '';

  const notasStr = e.notas
    ? `, notas: '${escapeTS(e.notas)}'`
    : '';

  const freqStr = e.frequencia
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
const withFrequencia = sorted.filter(e => e.frequencia).length;
const top10 = [...sorted].sort((a, b) => (b.frequencia || 0) - (a.frequencia || 0)).slice(0, 10);

console.log(`\n📊 Estatísticas do léxico grego:`);
console.log(`   Total de entradas: ${total}`);
console.log(`   Com pronúncia: ${withPronuncia}`);
console.log(`   Com notas: ${withNotas}`);
console.log(`   Com frequência: ${withFrequencia}`);
console.log(`   Entradas existentes preservadas: ${existingMap.size}`);
console.log(`   Novas entradas adicionadas: ${addedCount}`);
console.log(`\n   Top 10 palavras mais frequentes:`);
for (const e of top10) {
  console.log(`     ${e.strong} ${e.palavra} (${e.transliteracao}) — ${e.frequencia}×`);
}
console.log(`\n✅ Arquivo gerado: ${gregoPath}`);
