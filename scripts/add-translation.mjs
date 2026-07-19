#!/usr/bin/env node
/**
 * add-translation.mjs
 *
 * Script para adicionar novas traduções bíblicas ao projeto.
 * Suporta duas fontes:
 * 1. Arquivo JSON local (formato: { "livro_abrev": { "cap": ["vers1", "vers2", ...] } })
 * 2. API Midvash (https://api.midvash.com/v1)
 *
 * Uso:
 *   node scripts/add-translation.mjs --id nvt --nome "Nova Versão Transformadora" --sigla NVT --ano 2020 --fonte api
 *   node scripts/add-translation.mjs --id tb --nome "Tradução Brasileira" --sigla TB --ano 1994 --fonte arquivo --arquivo ./data/tb.json
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

// ─── Mapeamento de abreviações de livros ─────────────────────────────────────

const BOOK_MAP = {
  gn: 'genesis', ex: 'exodo', lv: 'levitico', nm: 'numeros', dt: 'deuteronomio',
  js: 'josue', jz: 'juizes', rt: 'rute', '1sm': '1-samuel', '2sm': '2-samuel',
  '1rs': '1-reis', '2rs': '2-reis', '1cr': '1-cronicas', '2cr': '2-cronicas',
  ed: 'esdras', ne: 'neemias', et: 'ester', jo: 'jo', sl: 'salmos',
  pv: 'proverbios', ec: 'eclesiastes', ct: 'canticos', is: 'isaias', jr: 'jeremias',
  lm: 'lamentacoes', ez: 'ezequiel', dn: 'daniel', os: 'oseias', jl: 'joel',
  am: 'amos', ob: 'obadias', jn: 'jonas', mq: 'miqueias', na: 'naum',
  hc: 'habacuque', sf: 'sofonias', ag: 'ageu', zc: 'zacarias', ml: 'malaquias',
  mt: 'mateus', mc: 'marcos', lc: 'lucas', joao: 'joao', at: 'atos',
  rm: 'romanos', '1co': '1-corintios', '2co': '2-corintios', gl: 'galatas',
  ef: 'efesios', fp: 'filipenses', cl: 'colossenses', '1ts': '1-tesalonicenses',
  '2ts': '2-tesalonicenses', '1tm': '1-timoteo', '2tm': '2-timoteo', tt: 'titus',
  fm: 'filemon', hb: 'hebreus', tg: 'tiago', '1pe': '1-pedro', '2pe': '2-pedro',
  '1jo': '1-joao', '2jo': '2-joao', '3jo': '3-joao', jd: 'jude', ap: 'apocalipse',
};

const MIDVASH_API = 'https://api.midvash.com/v1';

// ─── Parse arguments ─────────────────────────────────────────────────────────

function parseArgs() {
  const args = process.argv.slice(2);
  const parsed = {};
  for (let i = 0; i < args.length; i += 2) {
    const key = args[i].replace(/^--/, '');
    parsed[key] = args[i + 1];
  }
  return parsed;
}

const args = parseArgs();

if (!args.id || !args.nome || !args.sigla) {
  console.log(`
Uso: node scripts/add-translation.mjs --id <id> --nome <nome> --sigla <sigla> [--ano <ano>] [--fonte api|arquivo] [--arquivo <path>]

Exemplos:
  # Adicionar tradução via API Midvash
  node scripts/add-translation.mjs --id nvt --nome "Nova Versão Transformadora" --sigla NVT --ano 2020 --fonte api

  # Adicionar tradução de arquivo JSON
  node scripts/add-translation.mjs --id tb --nome "Tradução Brasileira" --sigla TB --ano 1994 --fonte arquivo --arquivo ./data/tb.json

Formato do arquivo JSON:
{
  "gn": {
    "1": ["No princípio criou Deus...", "E a terra era sem forma..."],
    "2": ["E foram acabados os céus..."]
  },
  "ex": { ... }
}

Ou no formato alternativo:
{
  "genesis": {
    "1": ["verse1", "verse2", ...]
  }
}
`);
  process.exit(1);
}

const {
  id,
  nome,
  sigla,
  ano = '2000',
  fonte = 'api',
  arquivo,
  idioma = 'pt-BR',
} = args;

// ─── Validate ────────────────────────────────────────────────────────────────

if (fonte === 'arquivo' && !arquivo) {
  console.error('❌ Para fonte "arquivo", especifique --arquivo <path>');
  process.exit(1);
}

if (existsSync(resolve(ROOT, `src/data/biblia/texto/${id}`))) {
  console.error(`❌ Tradução "${id}" já existe em src/data/biblia/texto/${id}/`);
  process.exit(1);
}

// ─── Load data ───────────────────────────────────────────────────────────────

async function loadFromAPI() {
  console.log(`📥 Carregando tradução "${id}" da API Midvash...`);
  const data = {};
  const bookEntries = Object.entries(BOOK_MAP);

  for (const [abbr, slug] of bookEntries) {
    try {
      const res = await fetch(`${MIDVASH_API}/${id}/${slug}/1`, {
        signal: AbortSignal.timeout(8000),
      });
      if (!res.ok) continue;

      const json = await res.json();
      const raw = json?.data?.verses;
      if (!Array.isArray(raw)) continue;

      // Get chapter count from first book
      const bookMeta = await fetch(`${MIDVASH_API}/books/${slug}`, {
        signal: AbortSignal.timeout(5000),
      });
      const bookData = await bookMeta.json();
      const chapters = bookData?.data?.chapters || 50;

      data[abbr] = {};

      // Load all chapters
      for (let cap = 1; cap <= chapters; cap++) {
        try {
          const capRes = await fetch(`${MIDVASH_API}/${id}/${slug}/${cap}`, {
            signal: AbortSignal.timeout(8000),
          });
          if (!capRes.ok) continue;
          const capJson = await capRes.json();
          const verses = capJson?.data?.verses;
          if (Array.isArray(verses)) {
            data[abbr][cap] = verses.map(v => typeof v === 'string' ? v : v.text);
          }
        } catch {
          // Skip failed chapters
        }
      }

      const totalVerses = Object.values(data[abbr]).reduce((sum, v) => sum + v.length, 0);
      console.log(`  ✅ ${abbr}: ${Object.keys(data[abbr]).length} capítulos, ${totalVerses} versículos`);
    } catch {
      console.log(`  ⚠️ ${abbr}: não disponível`);
    }
  }

  return data;
}

function loadFromFile() {
  console.log(`📥 Carregando tradução "${id}" de ${arquivo}...`);
  const raw = readFileSync(resolve(ROOT, arquivo), 'utf8');
  const parsed = JSON.parse(raw);

  // Normalize book abbreviations
  const data = {};
  for (const [book, chapters] of Object.entries(parsed)) {
    // Find the abbreviation that matches this book name
    let abbr = book;
    for (const [abbrKey, slug] of Object.entries(BOOK_MAP)) {
      if (slug === book || abbrKey === book) {
        abbr = abbrKey;
        break;
      }
    }

    data[abbr] = {};
    for (const [cap, verses] of Object.entries(chapters)) {
      data[abbr][parseInt(cap)] = Array.isArray(verses) ? verses : [];
    }

    const totalVerses = Object.values(data[abbr]).reduce((sum, v) => sum + v.length, 0);
    console.log(`  ✅ ${abbr}: ${Object.keys(data[abbr]).length} capítulos, ${totalVerses} versículos`);
  }

  return data;
}

// ─── Generate files ──────────────────────────────────────────────────────────

function generateIndex(data) {
  const imports = [];
  const exports = [];

  for (const abbr of Object.keys(data).sort()) {
    imports.push(`import ${abbr} from './${abbr}';`);
    exports.push(`  ${abbr}`);
  }

  return `${imports.join('\n')}

const data: Record<string, Record<number, string[]>> = {
${exports.join(',\n')}
};

export default data;
`;
}

function generateBookFile(abbr, chapters) {
  const lines = [`const data: Record<number, string[]> = {`];

  for (const [cap, verses] of Object.entries(chapters).sort((a, b) => parseInt(a[0]) - parseInt(b[0]))) {
    lines.push(`  ${cap}: [`);
    for (const verse of verses) {
      // Escape backticks and backslashes
      const escaped = verse.replace(/\\/g, '\\\\').replace(/`/g, '\\`');
      lines.push(`    \`${escaped}\`,`);
    }
    lines.push(`  ],`);
  }

  lines.push(`};`);
  lines.push(``);
  lines.push(`export default data;`);
  lines.push(``);

  return lines.join('\n');
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  console.log(`\n📚 Adicionando tradução: ${nome} (${sigla})\n`);

  let data;
  if (fonte === 'api') {
    data = await loadFromAPI();
  } else {
    data = loadFromFile();
  }

  const totalBooks = Object.keys(data).length;
  const totalChapters = Object.values(data).reduce((sum, book) => sum + Object.keys(book).length, 0);
  const totalVerses = Object.values(data).reduce((sum, book) =>
    sum + Object.values(book).reduce((s, cap) => s + cap.length, 0), 0);

  console.log(`\n📊 Resumo:`);
  console.log(`   Livros: ${totalBooks}`);
  console.log(`   Capítulos: ${totalChapters}`);
  console.log(`   Versículos: ${totalVerses}`);

  if (totalBooks === 0) {
    console.error('❌ Nenhum livro encontrado. Verifique a fonte.');
    process.exit(1);
  }

  // Create directory
  const tradDir = resolve(ROOT, `src/data/biblia/texto/${id}`);
  mkdirSync(tradDir, { recursive: true });

  // Generate book files
  for (const [abbr, chapters] of Object.entries(data)) {
    const content = generateBookFile(abbr, chapters);
    writeFileSync(resolve(tradDir, `${abbr}.ts`), content, 'utf8');
  }

  // Generate index
  const indexContent = generateIndex(data);
  writeFileSync(resolve(tradDir, 'index.ts'), indexContent, 'utf8');

  console.log(`\n✅ Arquivos gerados em: src/data/biblia/texto/${id}/`);

  // Update versoes.ts
  console.log(`\n📝 Para registrar a tradução, adicione em src/data/biblia/versoes.ts:`);
  console.log(`  { id: '${id}', nome: '${nome}', sigla: '${sigla}', descricao: '${nome}', idioma: '${idioma}', ano: ${ano} },`);

  // Update carregar.ts
  console.log(`\n📝 Para habilitar carregamento local, adicione '${id}' em TRADUCOES_LOCAIS em:`);
  console.log(`  src/data/biblia/texto/carregar.ts`);

  // Update TranslationDropdown.tsx
  console.log(`\n📝 Para adicionar ao seletor, adicione '${id}' em TRAD_IDS em:`);
  console.log(`  src/components/Biblia/TranslationDropdown.tsx`);
}

main().catch(console.error);
