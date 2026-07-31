/**
 * enrich-lexicons.mjs
 *
 * Enriches Hebrew and Greek lexicons with definitions from glosses_por.tsv / glosses_eng.tsv
 * Hebrew: adds Portuguese definitions + transliterations
 * Greek: adds unmatched MorphGNT lemmas as new entries
 */

import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const STRONGS_DIR = join(ROOT, 'scripts', 'strongs-pt-br');
const LEXICON_DIR = join(ROOT, 'src', 'data', 'lexicon');

// ─── 1. Load glosses ────────────────────────────────────────────────────────

console.log('Loading glosses...');

const porRaw = readFileSync(join(STRONGS_DIR, 'glosses_por.tsv'), 'utf-8');
const porLines = porRaw.split('\n').filter(l => l.trim() && !l.startsWith('#'));
const porGlosses = new Map(); // strong -> gloss
for (const line of porLines) {
  const [strong, _lemma, gloss] = line.split('\t');
  if (strong && gloss) porGlosses.set(strong, gloss);
}
console.log(`  Portuguese glosses: ${porGlosses.size}`);

const engRaw = readFileSync(join(STRONGS_DIR, 'glosses_eng.tsv'), 'utf-8');
const engLines = engRaw.split('\n').filter(l => l.trim() && !l.startsWith('#'));
const engGlosses = new Map(); // strong -> gloss
const engLemma = new Map(); // strong -> lemma
for (const line of engLines) {
  const [strong, lemma, gloss] = line.split('\t');
  if (strong && gloss) engGlosses.set(strong, gloss);
  if (strong && lemma) engLemma.set(strong, lemma);
}
console.log(`  English glosses: ${engGlosses.size}`);

// ─── 2. Enrich Hebrew lexicon ───────────────────────────────────────────────

console.log('\nEnriching Hebrew lexicon...');

const hebPath = join(LEXICON_DIR, 'hebraico.ts');
const hebRaw = readFileSync(hebPath, 'utf-8');

// Parse existing entries
const hebEntries = [];
const hebEntryRe = /\{\s*strong:\s*'H(\d+)'([^}]*)\}/g;
let hm;
while ((hm = hebEntryRe.exec(hebRaw)) !== null) {
  const strong = 'H' + hm[1];
  const body = hm[2];

  const getField = (name) => {
    const m2 = body.match(new RegExp(`${name}:\\s*'([^']*(?:\\\\.[^']*)*)'`));
    return m2 ? m2[1].replace(/\\\\'/g, "'").replace(/\\\\/g, '\\') : '';
  };
  const getNumField = (name) => {
    const m2 = body.match(new RegExp(`${name}:\\s*(\\d+)`));
    return m2 ? parseInt(m2[1]) : undefined;
  };

  hebEntries.push({
    strong,
    palavra: getField('palavra'),
    transliteracao: getField('transliteracao'),
    definicao: getField('definicao'),
    morfologia: getField('morfologia') || undefined,
    frequencia: getNumField('frequencia'),
  });
}

console.log(`  Parsed ${hebEntries.length} existing Hebrew entries`);

// Enrich with glosses
let hebUpdated = 0;
let hebNewTranslit = 0;
for (const entry of hebEntries) {
  const gloss = porGlosses.get(entry.strong);
  const engGloss = engGlosses.get(entry.strong);
  const lemma = engLemma.get(entry.strong);

  // Add Portuguese definition if missing
  if (!entry.definicao && gloss) {
    entry.definicao = gloss;
    hebUpdated++;
  } else if (!entry.definicao && engGloss) {
    entry.definicao = engGloss;
    hebUpdated++;
  }

  // Add transliteration from lemma if missing
  if (!entry.transliteracao && lemma) {
    entry.transliteracao = lemma;
    hebNewTranslit++;
  }
}

console.log(`  Updated definitions: ${hebUpdated}`);
console.log(`  New transliterations: ${hebNewTranslit}`);

// Regenerate hebraico.ts
function esc(s) {
  if (!s) return '';
  return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

const hebLines = [];
hebLines.push(`export interface PalavraHebraica {`);
hebLines.push(`  strong: string;`);
hebLines.push(`  palavra: string;`);
hebLines.push(`  transliteracao: string;`);
hebLines.push(`  definicao: string;`);
hebLines.push(`  morfologia?: string;`);
hebLines.push(`  frequencia?: number;`);
hebLines.push(`}`);
hebLines.push(``);
hebLines.push(`export const palavrasHebraicas: PalavraHebraica[] = [`);

for (const e of hebEntries) {
  const parts = [
    `strong: '${esc(e.strong)}'`,
    `palavra: '${esc(e.palavra)}'`,
    `transliteracao: '${esc(e.transliteracao)}'`,
    `definicao: '${esc(e.definicao)}'`,
  ];
  if (e.morfologia) parts.push(`morfologia: '${esc(e.morfologia)}'`);
  if (e.frequencia) parts.push(`frequencia: ${e.frequencia}`);
  hebLines.push(`  { ${parts.join(', ')} },`);
}

hebLines.push(`];`);
hebLines.push(``);

writeFileSync(hebPath, hebLines.join('\n'), 'utf-8');
console.log(`  ✅ Generated ${hebPath}`);

// ─── 3. Expand Greek lexicon with unmatched MorphGNT lemmas ─────────────────

console.log('\nExpanding Greek lexicon...');

const MORPHGNT_DIR = join(STRONGS_DIR, 'morphgnt');
const NT_FILE_MAP = {
  '61': 'mt', '62': 'mc', '63': 'lc', '64': 'jo', '65': 'at',
  '66': 'rm', '67': '1co', '68': '2co', '69': 'gl', '70': 'ef',
  '71': 'fp', '72': 'cl', '73': '1ts', '74': '2ts', '75': '1tm',
  '76': '2tm', '77': 'tt', '78': 'fm', '79': 'hb', '80': 'tg',
  '81': '1pe', '82': '2pe', '83': '1jo', '84': '2jo', '85': '3jo',
  '86': 'jd', '87': 'ap',
};

// Read existing Greek entries to get lemma -> Strong's mapping
const grkPath = join(LEXICON_DIR, 'grego.ts');
const grkRaw = readFileSync(grkPath, 'utf-8');

const existingStrongByLemma = new Map();
const existingStrongByNorm = new Map();
const existingEntries = new Map();

const grkEntryRe = /\{\s*strong:\s*'G(\d+)'([\s\S]*?)\},?\s*\n/g;
let gm;
while ((gm = grkEntryRe.exec(grkRaw)) !== null) {
  const strong = 'G' + gm[1];
  const body = gm[2];

  const getField = (name) => {
    const m2 = body.match(new RegExp(`${name}:\\s*'([^']*(?:\\\\.[^']*)*)'`));
    return m2 ? m2[1].replace(/\\\\'/g, "'").replace(/\\\\/g, '\\') : '';
  };
  const getArrField = (name) => {
    const m2 = body.match(new RegExp(`${name}:\\s*\\[([^\\]]*)\\]`));
    if (!m2) return [];
    return m2[1].match(/'([^']*)'/g)?.map(s => s.replace(/'/g, '')) || [];
  };

  const entry = {
    strong,
    palavra: getField('palavra'),
    transliteracao: getField('transliteracao'),
    definicao: getField('definicao'),
    definicaoResumida: getField('definicaoResumida'),
    categoria: getField('categoria'),
    testamento: getField('testamento'),
    morphologia: getField('morphologia'),
    uso: getField('uso'),
    versiculos: getArrField('versiculos'),
    pronuncia: getField('pronuncia'),
    frequencia: parseInt(body.match(/frequencia:\s*(\d+)/)?.[1] || '0'),
  };

  existingEntries.set(strong, entry);
  if (entry.palavra) {
    if (!existingStrongByLemma.has(entry.palavra)) {
      existingStrongByLemma.set(entry.palavra, strong);
    }
    const norm = entry.palavra.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    if (!existingStrongByNorm.has(norm)) {
      existingStrongByNorm.set(norm, strong);
    }
  }
}

console.log(`  Existing Greek entries: ${existingEntries.size}`);

// Collect unmatched lemmas from MorphGNT
const unmatchedLemmas = new Map(); // lemma -> { count, engGloss }
const files = readdirSync(MORPHGNT_DIR).filter(f => f.endsWith('-morphgnt.txt'));

for (const file of files) {
  const content = readFileSync(join(MORPHGNT_DIR, file), 'utf-8');
  const lines = content.trim().split('\n');
  for (const line of lines) {
    const parts = line.split(/\s+/);
    if (parts.length < 7) continue;
    const lemma = parts[6];

    // Check if this lemma maps to an existing Strong's
    let matched = existingStrongByLemma.has(lemma);
    if (!matched) {
      const stripped = lemma.replace(/\([^)]+\)/g, '');
      if (stripped !== lemma) matched = existingStrongByLemma.has(stripped);
    }
    if (!matched) {
      const norm = lemma.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      matched = existingStrongByNorm.has(norm);
      if (!matched) {
        const stripped = lemma.replace(/\([^)]+\)/g, '');
        const normStripped = stripped.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        matched = existingStrongByNorm.has(normStripped);
      }
    }

    if (!matched) {
      const existing = unmatchedLemmas.get(lemma);
      if (existing) existing.count++;
      else unmatchedLemmas.set(lemma, { count: 1 });
    }
  }
}

console.log(`  Unmatched lemmas: ${unmatchedLemmas.size}`);

// Find next available Strong's number
const maxStrong = Math.max(...[...existingEntries.keys()].map(k => parseInt(k.replace('G', ''))));
let nextStrong = maxStrong + 1;
console.log(`  Next available Strong's number: G${nextStrong}`);

// Create new entries for unmatched lemmas
const newEntries = [];
for (const [lemma, data] of unmatchedLemmas) {
  const strong = 'G' + nextStrong++;

  // Try to find English gloss
  let definicao = '';
  for (const [gKey, gVal] of engGlosses) {
    // We don't have a direct lemma->gloss mapping for unmatched, so leave empty
    break;
  }

  // Infer category from lemma ending
  let categoria = 'substantivo';
  if (lemma.endsWith('ω') || lemma.endsWith('ομαι') || lemma.endsWith('μι')) categoria = 'verbo';
  else if (lemma.endsWith('ος') || lemma.endsWith('ης') || lemma.endsWith('ον')) categoria = 'adjetivo';
  else if (lemma.endsWith('η') || lemma.endsWith('ια') || lemma.endsWith('σις') || lemma.endsWith('μα')) categoria = 'substantivo';

  newEntries.push({
    strong,
    palavra: lemma,
    transliteracao: '',
    definicao,
    definicaoResumida: definicao.length > 40 ? definicao.substring(0, 37) + '...' : definicao,
    categoria,
    testamento: 'NT',
    morphologia: '',
    uso: '',
    versiculos: [],
    pronuncia: '',
    frequencia: data.count,
  });
}

console.log(`  New entries to add: ${newEntries.length}`);

// Merge and regenerate grego.ts
const allEntries = [...existingEntries.values(), ...newEntries];
allEntries.sort((a, b) => {
  const numA = parseInt(a.strong.replace('G', ''));
  const numB = parseInt(b.strong.replace('G', ''));
  return numA - numB;
});

const grkLines = [];
grkLines.push(`export interface PalavraGrega {`);
grkLines.push(`  strong: string;`);
grkLines.push(`  palavra: string;`);
grkLines.push(`  transliteracao: string;`);
grkLines.push(`  definicao: string;`);
grkLines.push(`  definicaoResumida: string;`);
grkLines.push(`  categoria: 'substantivo' | 'verbo' | 'adjetivo' | 'advérbio' | 'preposição' | 'conjunção' | 'pronome' | 'numeral' | 'partícula' | 'interjeição';`);
grkLines.push(`  testamento: 'AT' | 'NT' | 'ambos';`);
grkLines.push(`  morphologia: string;`);
grkLines.push(`  uso: string;`);
grkLines.push(`  versiculos: string[];`);
grkLines.push(`  pronuncia: string;`);
grkLines.push(`  palavrasDerivadas?: string[];`);
grkLines.push(`  notas?: string;`);
grkLines.push(`  frequencia?: number;`);
grkLines.push(`}`);
grkLines.push(``);
grkLines.push(`export const palavrasGregas: PalavraGrega[] = [`);

for (const e of allEntries) {
  const vStr = e.versiculos && e.versiculos.length > 0
    ? `[${e.versiculos.map(v => `'${esc(v)}'`).join(', ')}]`
    : '[]';
  const freqStr = e.frequencia && e.frequencia > 0 ? `, frequencia: ${e.frequencia}` : '';

  grkLines.push(`  { strong: '${esc(e.strong)}', palavra: '${esc(e.palavra)}', transliteracao: '${esc(e.transliteracao)}', definicao: '${esc(e.definicao)}', definicaoResumida: '${esc(e.definicaoResumida)}', categoria: '${esc(e.categoria)}', testamento: '${esc(e.testamento)}', morphologia: '${esc(e.morphologia)}', uso: '${esc(e.uso)}', versiculos: ${vStr}, pronuncia: '${esc(e.pronuncia)}'${freqStr} },`);
}

grkLines.push(`];`);
grkLines.push(``);

writeFileSync(grkPath, grkLines.join('\n'), 'utf-8');
console.log(`  ✅ Generated ${grkPath}`);

// ─── 4. Final statistics ────────────────────────────────────────────────────

console.log(`\n📊 Final statistics:`);
console.log(`  Hebrew: ${hebEntries.length} entries (${hebEntries.filter(e => e.definicao).length} with definitions)`);
console.log(`  Greek: ${allEntries.length} entries (${allEntries.filter(e => e.definicao).length} with definitions)`);
