#!/usr/bin/env node
/**
 * expand-hebrew-lexicon.mjs
 *
 * Expands the Hebrew lexicon from the complete Strong's concordance (~8674 entries).
 * Merges with existing curated data from strong/index.ts for richer definitions.
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

// ─── 1. Load complete Strong's Hebrew data from downloaded JSON ──────────────

const strongsPath = resolve(ROOT, 'temp_hebrew.json');
const strongsRaw = readFileSync(strongsPath, 'utf8');
const strongsData = JSON.parse(strongsRaw);

console.log(`📥 Strong's Hebrew entries loaded: ${Object.keys(strongsData).length}`);

// ─── 2. Load curated data from strong/index.ts ────────────────────────────────

const indexPath = resolve(ROOT, 'src/data/biblia/strong/index.ts');
const indexRaw = readFileSync(indexPath, 'utf8');

const curatedMap = new Map();

// Parse STRONG_POR_VERSICULO
const objStart = indexRaw.indexOf("STRONG_POR_VERSICULO: Record<string, PalavraStrong[]> = {");
if (objStart !== -1) {
  const blockStart = indexRaw.indexOf('{', objStart);
  let depth = 0;
  let blockEnd = -1;
  for (let i = blockStart; i < indexRaw.length; i++) {
    if (indexRaw[i] === '{') depth++;
    if (indexRaw[i] === '}') depth--;
    if (depth === 0) { blockEnd = i + 1; break; }
  }

  if (blockEnd !== -1) {
    const objBlock = indexRaw.slice(blockStart, blockEnd);
    const entryRe = /'([^']+)'\s*:\s*\[([\s\S]*?)\]\s*,?/g;
    let match;
    while ((match = entryRe.exec(objBlock)) !== null) {
      const arrBlock = match[2];
      const objRe = /\{([^}]+)\}/g;
      let objMatch;
      while ((objMatch = objRe.exec(arrBlock)) !== null) {
        const props = objMatch[1];
        const get = (name) => {
          const m = props.match(new RegExp(`${name}\\s*:\\s*'([^']*)'`));
          return m ? m[1] : '';
        };
        const strong = get('strong');
        const idioma = get('idioma');
        if (!strong || !strong.startsWith('H') || idioma !== 'hebraico') continue;

        const existing = curatedMap.get(strong);
        const definicao = get('definicao');
        if (!existing || definicao.length > existing.definicao.length) {
          curatedMap.set(strong, {
            palavra: get('palavra'),
            transliteracao: get('transliteracao'),
            definicao,
            morfologia: get('morfologia'),
          });
        }
      }
    }
  }
}

console.log(`📚 Curated entries from index.ts: ${curatedMap.size}`);

// ─── 3. Merge: curated data takes priority, fill gaps from Strong's ──────────

const merged = new Map();
let curatedUsed = 0;
let strongsOnly = 0;

for (const [key, entry] of Object.entries(strongsData)) {
  if (!key.startsWith('H')) continue;

  const curated = curatedMap.get(key);

  // Prefer Strong's data (complete lexicon). Use curated only to fill empty fields.
  const palavra = entry.lemma || curated?.palavra || '';
  const transliteracao = entry.xlit || curated?.transliteracao || '';
  let definicao = entry.strongs_def || curated?.definicao || '';
  // Clean up Strong's definitions: remove surrounding braces
  definicao = definicao.replace(/^\{|\}$/g, '');
  const morfologia = entry.pron || curated?.morfologia || '';

  if (curated) curatedUsed++;
  else strongsOnly++;

  merged.set(key, {
    strong: key,
    palavra,
    transliteracao,
    definicao,
    morfologia,
  });
}

console.log(`🔀 Merged: ${curatedUsed} curated + ${strongsOnly} from Strong's = ${merged.size} total`);

// ─── 4. Sort by Strong's number and generate TypeScript ──────────────────────

const sorted = Array.from(merged.values()).sort((a, b) => {
  const numA = parseInt(a.strong.slice(1), 10);
  const numB = parseInt(b.strong.slice(1), 10);
  return numA - numB;
});

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

for (const e of sorted) {
  const parts = [
    `strong: '${escapeTS(e.strong)}'`,
    `palavra: '${escapeTS(e.palavra)}'`,
    `transliteracao: '${escapeTS(e.transliteracao)}'`,
    `definicao: '${escapeTS(e.definicao)}'`,
  ];
  if (e.morfologia) {
    parts.push(`morfologia: '${escapeTS(e.morfologia)}'`);
  }
  lines.push(`  { ${parts.join(', ')} },`);
}

lines.push(`];`);
lines.push(``);

const outPath = resolve(ROOT, 'src/data/lexicon/hebraico.ts');
writeFileSync(outPath, lines.join('\n'), 'utf8');

// ─── 5. Stats ────────────────────────────────────────────────────────────────

const withPalavra = sorted.filter(e => e.palavra).length;
const withTranslit = sorted.filter(e => e.transliteracao).length;
const withDef = sorted.filter(e => e.definicao).length;
const withMorf = sorted.filter(e => e.morfologia).length;

console.log(`\n📊 Estatísticas do léxico hebraico expandido:`);
console.log(`   Total de entradas: ${sorted.length}`);
console.log(`   Com palavra (hebraico): ${withPalavra}`);
console.log(`   Com transliteração: ${withTranslit}`);
console.log(`   Com definição: ${withDef}`);
console.log(`   Com morfologia/pronúncia: ${withMorf}`);
console.log(`\n✅ Arquivo gerado: ${outPath}`);
