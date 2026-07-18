#!/usr/bin/env node
/**
 * Enriquece o arquivo crossReferences.ts com dados do TSK (Treasury of Scripture Knowledge)
 * Fonte: CrossReferences-org/bible-cross-references (KJV TSV)
 */

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

// ── Mapeamento de abreviacoes KJV → nossas abreviacoes ──
const BOOK_MAP = {
  'Gen': 'gn', 'Exod': 'ex', 'Lev': 'lv', 'Num': 'nm', 'Deut': 'dt',
  'Josh': 'js', 'Judg': 'jd', 'Ruth': 'rt',
  '1 Sam': '1sm', '2 Sam': '2sm', '1 Kgs': '1rs', '2 Kgs': '2rs',
  '1 Chr': '1cr', '2 Chr': '2cr', 'Ezra': 'ed', 'Neh': 'ne', 'Esth': 'et',
  'Job': 'job', 'Ps': 'sl', 'Prov': 'pr', 'Eccl': 'ec', 'Song': 'ct',
  'Isa': 'is', 'Jer': 'jr', 'Lam': 'lm', 'Ezek': 'ez', 'Dan': 'dn',
  'Hos': 'os', 'Joel': 'joel', 'Amos': 'am', 'Obad': 'ob', 'Jonah': 'jon',
  'Mic': 'mi', 'Nah': 'na', 'Hab': 'hc', 'Zeph': 'sf', 'Hag': 'ag',
  'Zech': 'zc', 'Mal': 'ml',
  'Matt': 'mt', 'Mark': 'mc', 'Luke': 'lc', 'John': 'jo', 'Acts': 'at',
  'Rom': 'rm', '1 Cor': '1co', '2 Cor': '2co', 'Gal': 'gl', 'Eph': 'ef',
  'Phil': 'fl', 'Col': 'cl', '1 Thess': '1ts', '2 Thess': '2ts',
  '1 Tim': '1tm', '2 Tim': '2tm', 'Titus': 'tt', 'Phlm': 'flm',
  'Heb': 'hb', 'Jas': 'tg', '1 Pet': '1pe', '2 Pet': '2pe',
  '1 John': '1jo', '2 John': '2jo', '3 John': '3jo', 'Jude': 'jd',
  'Rev': 'ap',
};

// ── Parsing de uma referencia TSK como "Gen 1:1-3" ou "1 Cor 15:22,56" ──
// Retorna array de { book, chapter, verses: string }
function parseRef(raw) {
  const s = raw.trim();
  // Encontrar onde o numero do capitulo comeca
  // Formatos: "Gen 1:1", "1 Cor 15:22", "1 John 1:1"
  const match = s.match(/^(\d?\s*\w+)\s+(\d+):(.+)$/);
  if (!match) return [];
  const bookKJV = match[1].trim();
  const chapter = parseInt(match[2], 10);
  const versesRaw = match[3];
  const book = BOOK_MAP[bookKJV];
  if (!book) return [];
  return [{ book, chapter, verses: versesRaw }];
}

// ── Expandir versiculos como "1-3,5" → ["1","2","3","5"] ──
function expandVerses(versesRaw) {
  const parts = versesRaw.split(',');
  const result = [];
  for (const part of parts) {
    const rangeMatch = part.trim().match(/^(\d+)-(\d+)$/);
    if (rangeMatch) {
      const from = parseInt(rangeMatch[1], 10);
      const to = parseInt(rangeMatch[2], 10);
      for (let i = from; i <= to; i++) {
        result.push(i);
      }
    } else {
      const v = parseInt(part.trim(), 10);
      if (!isNaN(v)) result.push(v);
    }
  }
  return result;
}

// ── Converter uma linha TSV em entradas de crossReferences ──
function processLine(line) {
  const parts = line.split('\t');
  if (parts.length < 5) return [];
  const bookKJV = parts[0].trim();
  const chapter = parseInt(parts[1], 10);
  const verse = parseInt(parts[2], 10);
  const refsRaw = parts[4].trim();

  const book = BOOK_MAP[bookKJV];
  if (!book || isNaN(chapter) || isNaN(verse)) return [];

  const sourceKey = `${book}:${chapter}:${verse}`;
  const targets = [];

  // Dividir por | para obter cada referencia
  const refParts = refsRaw.split('|');
  for (const refPart of refParts) {
    const refs = parseRef(refPart);
    for (const ref of refs) {
      const verseNums = expandVerses(ref.verses);
      for (const v of verseNums) {
        targets.push(`${ref.book}:${ref.chapter}:${v}`);
      }
    }
  }

  if (targets.length === 0) return [];
  return [{ key: sourceKey, targets }];
}

// ── Ler e parsear o arquivo TSV ──
function readTSV(filePath) {
  const content = readFileSync(filePath, 'utf-8');
  const lines = content.split('\n').filter(l => l.trim() && !l.startsWith('book\t'));
  const entries = new Map();

  let processed = 0;
  let skipped = 0;

  for (const line of lines) {
    const results = processLine(line);
    for (const result of results) {
      processed++;
      if (entries.has(result.key)) {
        // Merge: adicionar targets que nao existem
        const existing = entries.get(result.key);
        for (const t of result.targets) {
          if (!existing.includes(t)) {
            existing.push(t);
          }
        }
      } else {
        entries.set(result.key, [...result.targets]);
      }
    }
    if (results.length === 0) skipped++;
  }

  return { entries, processed, skipped, totalLines: lines.length };
}

// ── Ler o arquivo crossReferences.ts existente e extrair dados ──
function readExistingCrossRefs(filePath) {
  const content = readFileSync(filePath, 'utf-8');
  const entries = new Map();

  // Regex para encontrar chaves e valores
  // Formato: 'gn:1:1': ['jn:1:1', 'hb:11:3', 'rm:1:20'],
  const regex = /'([^']+)':\s*\[([^\]]*)\]/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const key = match[1];
    const valuesStr = match[2];
    const values = valuesStr
      .split(',')
      .map(v => v.trim().replace(/'/g, '').trim())
      .filter(v => v.length > 0);
    entries.set(key, values);
  }

  return entries;
}

// ── Gerar o arquivo TypeScript ──
function generateTypeScript(entries) {
  const sortedKeys = [...entries.keys()].sort((a, b) => {
    const [aBook, aCh, aV] = a.split(':');
    const [bBook, bCh, bV] = b.split(':');
    if (aBook !== bBook) return aBook.localeCompare(bBook);
    if (aCh !== bCh) return parseInt(aCh) - parseInt(bCh);
    return parseInt(aV) - parseInt(bV);
  });

  let output = `// Cross-references: map verse references to related passages\n`;
  output += `// Format: "book:chapter:verse" -> array of related references\n`;
  output += `// Dados enriquecidos com Treasury of Scripture Knowledge (TSK)\n`;
  output += `export const crossReferences: Record<string, string[]> = {\n`;

  let currentBook = '';
  let count = 0;

  for (const key of sortedKeys) {
    const [book] = key.split(':');
    if (book !== currentBook) {
      if (currentBook !== '') output += '\n';
      currentBook = book;
    }
    const values = entries.get(key);
    const valuesStr = values.map(v => `'${v}'`).join(', ');
    output += `  '${key}': [${valuesStr}],\n`;
    count++;
  }

  output += `};\n\n`;
  output += `/**\n`;
  output += ` * Get cross-references for a given verse\n`;
  output += ` */\n`;
  output += `export function getCrossReferences(book: string, chapter: number, verse: number): string[] {\n`;
  output += `  const key = \`\${book}:\${chapter}:\${verse}\`;\n`;
  output += `  return crossReferences[key] || [];\n`;
  output += `}\n`;

  return { content: output, count };
}

// ── Estatisticas por livro ──
function statsPerBook(entries) {
  const stats = {};
  for (const key of entries.keys()) {
    const book = key.split(':')[0];
    stats[book] = (stats[book] || 0) + 1;
  }
  return stats;
}

// ── MAIN ──
function main() {
  console.log('=== Enriquecimento de Cross-References com TSK ===\n');

  // 1. Ler TSV
  const tsvPath = join(ROOT, 'scripts', 'crossreferences_kjv.tsv');
  console.log(`Lendo TSV: ${tsvPath}`);
  const { entries: tskEntries, processed, totalLines } = readTSV(tsvPath);
  console.log(`  Linhas no TSV: ${totalLines}`);
  console.log(`  Referencias processadas: ${processed}`);
  console.log(`  Chaves unicas TSK: ${tskEntries.size}\n`);

  // 2. Ler existente
  const existingPath = join(ROOT, 'src', 'data', 'crossReferences.ts');
  console.log(`Lendo existente: ${existingPath}`);
  const existingEntries = readExistingCrossRefs(existingPath);
  console.log(`  Chaves existentes: ${existingEntries.size}\n`);

  // 3. Merge: existente tem prioridade (nao sobrescrever)
  const merged = new Map(existingEntries);
  let newEntriesAdded = 0;
  let existingOverwritten = 0;

  for (const [key, tskTargets] of tskEntries) {
    if (merged.has(key)) {
      // Ja existe - adicionar novos targets que nao estao presentes
      const existingTargets = merged.get(key);
      let added = 0;
      for (const t of tskTargets) {
        if (!existingTargets.includes(t)) {
          existingTargets.push(t);
          added++;
        }
      }
      if (added > 0) existingOverwritten++;
    } else {
      // Nova entrada
      merged.set(key, tskTargets);
      newEntriesAdded++;
    }
  }

  console.log('=== Resultado do Merge ===');
  console.log(`  Chaves existentes preservadas: ${existingEntries.size}`);
  console.log(`  Entradas novas adicionadas: ${newEntriesAdded}`);
  console.log(`  Entradas existentes enriquecidas: ${existingOverwritten}`);
  console.log(`  Total final de chaves: ${merged.size}\n`);

  // 4. Gerar arquivo TypeScript
  console.log('Gerando crossReferences.ts...');
  const { content, count } = generateTypeScript(merged);
  writeFileSync(existingPath, content, 'utf-8');
  console.log(`  Escrito ${count} entradas em ${existingPath}\n`);

  // 5. Estatisticas
  console.log('=== Estatisticas por Livro ===');
  const stats = statsPerBook(merged);
  const bookOrder = Object.keys(BOOK_MAP).map(k => BOOK_MAP[k]);
  for (const book of bookOrder) {
    if (stats[book]) {
      console.log(`  ${book.padEnd(6)} ${stats[book]}`);
    }
  }
  console.log(`\n  TOTAL: ${merged.size} versiculos com referencias cruzadas\n`);

  // 6. Amostras para versiculos-chave
  console.log('=== Amostras ===');
  const samples = ['jn:3:16', 'gn:1:1', 'rm:8:28', 'is:53:5', 'sl:23:1', 'ap:22:20'];
  for (const key of samples) {
    const refs = merged.get(key);
    if (refs) {
      console.log(`  ${key}: [${refs.slice(0, 8).join(', ')}${refs.length > 8 ? '...' : ''}] (${refs.length} refs)`);
    } else {
      console.log(`  ${key}: [sem referencias]`);
    }
  }

  console.log('\n=== Concluido ===');
}

main();
