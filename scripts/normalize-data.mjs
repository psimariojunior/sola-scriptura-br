/**
 * Normaliza dados criticos do projeto:
 * 1. Fix mojibake do lexico hebraico (double-encoded UTF-8)
 * 2. Normaliza abreviacoes invalidas em crossReferences.ts
 *
 * Uso: node scripts/normalize-data.mjs
 */

import { readFile, writeFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Mapa de abreviacoes invalidas -> canonicas (usadas em TODOS_LIVROS)
const ABREV_NORMALIZACAO = {
  // Bible Hub / TSK usa estas, nosso canon usa as da esquerda
  'job': 'jó',
  'pr': 'pv',        // Proverbios
  'fl': 'fp',        // Filipenses (nao confundir com flm)
  'flm': 'fm',       // Filemom
  'mi': 'mq',        // Miqueias
  'joel': 'jl',      // Joel por extenso
  'jon': 'jn',       // Jonas
  'jb': 'jó',        // Job variante
  'ti': 'tg',        // Tiago variante
  'lb': 'lm',        // Lamentacoes variante
  'zm': 'zc',        // Zacarias variante
  'tb': 'tb',        // Tobias (deuterocanonico) - manter
  '4rs': '2rs',      // Erro de numeracao
  // Case fix
  'Sl': 'sl',
  'SL': 'sl',
  'Gn': 'gn',
  'Ex': 'ex',
  'Mt': 'mt',
  'Mc': 'mc',
  'Lc': 'lc',
  'Jo': 'jo',
  'At': 'at',
  'Rm': 'rm',
};

/**
 * Decodifica texto corrompido por double-encoding UTF-8 (alguem salvou
 * UTF-8 como se fosse Windows-1252 e re-salvou como UTF-8).
 * Ex.: '×™×"×•×"' -> 'יהוה'
 *      'prÃ³prio' -> 'próprio'
 */
const CP1252_BYTES = {
  0x20AC: 0x80, 0x201A: 0x82, 0x0192: 0x83, 0x201E: 0x84, 0x2026: 0x85,
  0x2020: 0x86, 0x2021: 0x87, 0x02C6: 0x88, 0x2030: 0x89, 0x0160: 0x8A,
  0x2039: 0x8B, 0x0152: 0x8C, 0x017D: 0x8E, 0x2018: 0x91, 0x2019: 0x92,
  0x201C: 0x93, 0x201D: 0x94, 0x2022: 0x95, 0x2013: 0x96, 0x2014: 0x97,
  0x02DC: 0x98, 0x2122: 0x99, 0x0161: 0x9A, 0x203A: 0x9B, 0x0153: 0x9C,
  0x017E: 0x9E, 0x0178: 0x9F,
};

function decodeMojibake(str) {
  if (!str) return str;
  const bytes = [];
  for (const ch of str) {
    const cp = ch.codePointAt(0);
    if (cp <= 0x7F) {
      bytes.push(cp);
    } else if (cp >= 0xA0 && cp <= 0xFF) {
      bytes.push(cp);
    } else if (CP1252_BYTES[cp] !== undefined) {
      bytes.push(CP1252_BYTES[cp]);
    } else if (cp >= 0x80 && cp <= 0x9F) {
      // cp1252 nao-usados: mantem como byte
      bytes.push(cp);
    } else {
      // Caracter unicode legitimo (ex: grego), preserva codificando em UTF-8
      const enc = new TextEncoder().encode(ch);
      for (const b of enc) bytes.push(b);
    }
  }
  try {
    return new TextDecoder('utf-8').decode(new Uint8Array(bytes));
  } catch {
    return str;
  }
}

async function fixHebraico() {
  const path = join(__dirname, '..', 'src', 'data', 'lexicon', 'hebraico.ts');
  const content = await readFile(path, 'utf-8');

  // Detecta mojibake
  const hasMojibake = content.includes('×') || content.includes('Ã') || content.includes('Â');
  if (hasMojibake) console.log('  Hebraico: mojibake detectado, decodificando...');

  // Parse via regex: captura cada objeto entry no array
  // { strong: 'H3068', palavra: '...', transliteracao: '...', definicao: '...', morfologia: '...', frequencia: 6828 }
  const entryRegex = /\{\s*strong:\s*'([^']+)',\s*palavra:\s*'((?:[^'\\]|\\.)*)',\s*transliteracao:\s*'([^']+)',\s*definicao:\s*'((?:[^'\\]|\\.)*)'(?:,\s*morfologia:\s*'((?:[^'\\]|\\.)*)')?(?:,\s*frequencia:\s*(\d+))?\s*\}/g;

  const entries = [];
  let match;
  let decodeCount = 0;
  while ((match = entryRegex.exec(content)) !== null) {
    const item = {
      strong: match[1],
      palavra: match[2],
      transliteracao: match[3],
      definicao: match[4],
      morfologia: match[5] || undefined,
      frequencia: match[6] ? parseInt(match[6], 10) : undefined,
    };

    // Aplica decode em cada campo string (se mojibake)
    for (const key of ['palavra', 'definicao', 'morfologia']) {
      if (item[key] && (item[key].includes('×') || item[key].includes('Ã') || item[key].includes('Â'))) {
        const decoded = decodeMojibake(item[key]);
        if (decoded && decoded !== item[key]) {
          item[key] = decoded;
          decodeCount++;
        }
      }
    }
    entries.push(item);
  }

  console.log(`  Hebraico: ${entries.length} entradas parseadas, ${decodeCount} campos decodificados`);

  // Dedup por `strong` mantendo entrada mais completa (definicao mais longa)
  const byStrong = new Map();
  for (const item of entries) {
    const existing = byStrong.get(item.strong);
    if (!existing) { byStrong.set(item.strong, item); continue; }
    // Score: definicao longa + palavra com chars nao-ASCII (hebraico)
    const score = (e) => (e.definicao?.length || 0) + (e.palavra && /[\u0590-\u05FF]/.test(e.palavra) ? 50 : 0);
    if (score(item) > score(existing)) byStrong.set(item.strong, item);
  }

  const dedupCount = entries.length - byStrong.size;
  const finalArr = Array.from(byStrong.values()).sort((a, b) => {
    // Ordena por strong numerico (H1234 -> 1234)
    return parseInt(a.strong.substring(1), 10) - parseInt(b.strong.substring(1), 10);
  });

  console.log(`  Hebraico: ${dedupCount} duplicatas removidas (de ${entries.length} para ${finalArr.length})`);

  // Reescreve arquivo
  const output = generateHebraicoFile(finalArr);
  await writeFile(path, output, 'utf-8');
  return decodeCount + dedupCount;
}

function generateHebraicoFile(arr) {
  const lines = [
    'export interface PalavraHebraica {',
    '  strong: string;',
    '  palavra: string;',
    '  transliteracao: string;',
    '  definicao: string;',
    '  morfologia?: string;',
    '  frequencia?: number;',
    '}',
    '',
    'export const palavrasHebraicas: PalavraHebraica[] = [',
  ];
  for (const item of arr) {
    const fields = [
      `strong: ${JSON.stringify(item.strong)}`,
      `palavra: ${JSON.stringify(item.palavra)}`,
      `transliteracao: ${JSON.stringify(item.transliteracao)}`,
      `definicao: ${JSON.stringify(item.definicao)}`,
    ];
    if (item.morfologia) fields.push(`morfologia: ${JSON.stringify(item.morfologia)}`);
    if (item.frequencia !== undefined) fields.push(`frequencia: ${item.frequencia}`);
    lines.push(`  { ${fields.join(', ')} },`);
  }
  lines.push('];');
  lines.push('');
  return lines.join('\n');
}

async function normalizeCrossRefs() {
  const path = join(__dirname, '..', 'src', 'data', 'crossReferences.ts');
  const content = await readFile(path, 'utf-8');

  console.log('  crossReferences: normalizando abreviacoes...');

  // Aplica substituicoes com cuidado para nao corromper chaves/valores
  let result = content;
  let substitutions = 0;

  for (const [invalida, canonica] of Object.entries(ABREV_NORMALIZACAO)) {
    if (invalida === canonica) continue;
    const re = new RegExp(`(?<=[:'\\[]|\\n\\s*)${escapeRegex(invalida)}(?=[:,\\]'\\]])`, 'g');
    const matches = result.match(re);
    if (matches) {
      substitutions += matches.length;
      result = result.replace(re, canonica);
    }
  }
  console.log(`  crossReferences: ${substitutions} abreviacoes normalizadas`);

  // Dedup chaves do Record (a normalizacao pode ter criado chaves duplicadas)
  // Estrutura: 'chave': [valores]
  const keyRegex = /^(\s*)'([^']+)':\s*\[([^\]]*)\],?\s*$/gm;
  const seen = new Map();
  let dedupCount = 0;
  const lines = result.split('\n');
  const out = [];

  for (const line of lines) {
    const m = line.match(/^(\s*)'([^']+)':\s*\[([^\]]*)\],?\s*$/);
    if (!m) { out.push(line); continue; }
    const key = m[2];
    if (seen.has(key)) {
      // Merge: combinar valores unicos
      const existingValues = seen.get(key);
      const newValues = m[3].split(',').map(s => s.trim().replace(/^'|'$/g, '')).filter(Boolean);
      const merged = [...new Set([...existingValues, ...newValues])];
      seen.set(key, merged);
      // Atualiza linha anterior
      const existingIdx = out.findIndex(l => l.includes(`'${key}':`));
      if (existingIdx >= 0) {
        out[existingIdx] = `  '${key}': [${merged.map(v => `'${v}'`).join(', ')}],`;
      }
      dedupCount++;
    } else {
      const values = m[3].split(',').map(s => s.trim().replace(/^'|'$/g, '')).filter(Boolean);
      seen.set(key, values);
      out.push(line);
    }
  }

  console.log(`  crossReferences: ${dedupCount} chaves duplicadas merged`);

  await writeFile(path, out.join('\n'), 'utf-8');
  return substitutions + dedupCount;
}

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

async function normalizeAramaico() {
  const path = join(__dirname, '..', 'src', 'data', 'lexicon', 'aramaico.ts');
  const content = await readFile(path, 'utf-8');

  if (!content.includes('×')) {
    console.log('  Aramaico: sem mojibake detectado, pulando');
    return 0;
  }

  console.log('  Aramaico: mojibake detectado, decodificando...');
  let count = 0;
  const result = content.replace(
    /'([^']*×[^']*)'/g,
    (match, p1) => {
      count++;
      return `'${decodeMojibake(p1)}'`;
    }
  );
  await writeFile(path, result, 'utf-8');
  console.log(`  Aramaico: ${count} strings decodificadas`);
  return count;
}

async function main() {
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('  NORMALIZACAO DE DADOS CRITICOS');
  console.log('═══════════════════════════════════════════════════════════════\n');

  console.log('1. Lexicos (fix mojibake):');
  await fixHebraico();
  await normalizeAramaico();

  console.log('\n2. crossReferences (normalizar abrevs):');
  await normalizeCrossRefs();

  console.log('\n✅ Normalizacao completa!');
}

main().catch(err => {
  console.error('❌ Erro fatal:', err);
  process.exit(1);
});