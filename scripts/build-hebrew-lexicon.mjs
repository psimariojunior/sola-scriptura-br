#!/usr/bin/env node
/**
 * build-hebrew-lexicon.mjs
 *
 * Lê STRONG_POR_VERSICULO de src/data/biblia/strong/index.ts,
 * extrai todas as palavras hebraicas, deduplica por número Strong,
 * calcula frequência e gera src/data/lexicon/hebraico.ts.
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

// ─── 1. Ler e parsear o arquivo strong/index.ts ──────────────────────────────

const strongPath = resolve(ROOT, 'src/data/biblia/strong/index.ts');
const raw = readFileSync(strongPath, 'utf8');

// Extrair apenas o bloco do objeto STRONG_POR_VERSICULO = { ... }
// Encontrar o início do valor do objeto (após o '= {')
const objStart = raw.indexOf("STRONG_POR_VERSICULO: Record<string, PalavraStrong[]> = {");
if (objStart === -1) {
  console.error('Não encontrei STRONG_POR_VERSICULO no arquivo.');
  process.exit(1);
}
const blockStart = raw.indexOf('{', objStart);

// Encontrar o fim do objeto –contar chaves
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

// Extrair pares chave: valor manualmente usando regex por entrada
// Formato: 'chave': [ { ... }, { ... } ],
const verses = new Map(); // chave -> PalavraStrong[]

// Regex para cada entrada do objeto
const entryRe = /'([^']+)'\s*:\s*\[([\s\S]*?)\]\s*,?/g;
let match;
while ((match = entryRe.exec(objBlock)) !== null) {
  const verseKey = match[1];
  const arrBlock = match[2];

  // Extrair cada objeto { ... } do array
  const objRe = /\{([^}]+)\}/g;
  let objMatch;
  const palavras = [];
  while ((objMatch = objRe.exec(arrBlock)) !== null) {
    const props = objMatch[1];

    const get = (name) => {
      const m = props.match(new RegExp(`${name}\\s*:\\s*'([^']*)'`));
      return m ? m[1] : '';
    };

    const strong = get('strong');
    if (!strong) continue;

    palavras.push({
      strong,
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

// ─── 2. Filtrar apenas hebraicos e deduplicar ─────────────────────────────────

// Mapa: strong -> { dados mais completo, ocorrencias: Set, frequencia }
const byStrong = new Map();

for (const [verseKey, palavras] of verses) {
  for (const p of palavras) {
    if (p.idioma !== 'hebraico') continue;

    const ref = verseKey; // ex: "gn:1:1"
    const existing = byStrong.get(p.strong);

    if (!existing) {
      byStrong.set(p.strong, {
        strong: p.strong,
        palavra: p.palavra,
        transliteracao: p.transliteracao,
        definicao: p.definicao,
        morfologia: p.morfologia,
        ocorrencias: new Set([ref]),
      });
    } else {
      existing.ocorrencias.add(ref);
      // Manter o mais completo: se o novo tiver mais dados, sobrescrever
      if (p.palavra && !existing.palavra) existing.palavra = p.palavra;
      if (p.transliteracao && !existing.transliteracao) existing.transliteracao = p.transliteracao;
      if (p.definicao && p.definicao.length > existing.definicao.length) existing.definicao = p.definicao;
      if (p.morfologia && !existing.morfologia) existing.morfologia = p.morfologia;
    }
  }
}

const entries = Array.from(byStrong.values()).map((e) => ({
  strong: e.strong,
  palavra: e.palavra,
  transliteracao: e.transliteracao,
  definicao: e.definicao,
  morfologia: e.morfologia || undefined,
  frequencia: e.ocorrencias.size,
  ocorrencias: Array.from(e.ocorrencias).sort(),
}));

// Ordenar por número Strong (extrair o número)
entries.sort((a, b) => {
  const numA = parseInt(a.strong.replace('H', ''), 10);
  const numB = parseInt(b.strong.replace('H', ''), 10);
  return numA - numB;
});

// ─── 3. Gerar o arquivo TypeScript ────────────────────────────────────────────

function escapeTS(s) {
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
  if (e.morfologia) {
    parts.push(`morfologia: '${escapeTS(e.morfologia)}'`);
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

// ─── 4. Estatísticas ─────────────────────────────────────────────────────────

const total = entries.length;
const withTranslit = entries.filter((e) => e.transliteracao).length;
const withDef = entries.filter((e) => e.definicao).length;
const withMorf = entries.filter((e) => e.morfologia).length;
const totalOcorrencias = entries.reduce((s, e) => s + e.frequencia, 0);
const top10 = [...entries].sort((a, b) => b.frequencia - a.frequencia).slice(0, 10);

console.log(`\n📊 Estatísticas do léxico hebraico:`);
console.log(`   Total de entradas únicas: ${total}`);
console.log(`   Com transliteração: ${withTranslit}`);
console.log(`   Com definição: ${withDef}`);
console.log(`   Com morfologia: ${withMorf}`);
console.log(`   Total de ocorrências (soma): ${totalOcorrencias}`);
console.log(`\n   Top 10 palavras mais frequentes:`);
for (const e of top10) {
  console.log(`     ${e.strong} ${e.palavra} (${e.transliteracao}) — ${e.frequencia}×`);
}
console.log(`\n✅ Arquivo gerado: ${outPath}`);
