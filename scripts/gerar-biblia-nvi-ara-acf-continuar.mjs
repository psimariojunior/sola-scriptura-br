import fs from 'fs';
import path from 'path';

const API = 'https://api.midvash.com/v1';

const LIVRO_MAP = {
  gn: 'genesis', ex: 'exodus', lv: 'leviticus', nm: 'numbers', dt: 'deuteronomy',
  js: 'joshua', jz: 'judges', rt: 'ruth', '1sm': '1-samuel', '2sm': '2-samuel',
  '1rs': '1-kings', '2rs': '2-kings', '1cr': '1-chronicles', '2cr': '2-chronicles',
  ed: 'ezra', ne: 'nehemiah', et: 'esther', 'jó': 'job', sl: 'psalms',
  pv: 'proverbs', ec: 'ecclesiastes', ct: 'song-of-solomon', is: 'isaiah',
  jr: 'jeremiah', lm: 'lamentations', ez: 'ezekiel', dn: 'daniel',
  os: 'hosea', jl: 'joel', am: 'amos', ob: 'obadiah', jn: 'jonah',
  mq: 'micah', na: 'nahum', hc: 'habakkuk', sf: 'zephaniah',
  ag: 'haggai', zc: 'zechariah', ml: 'malachi',
  mt: 'matthew', mc: 'mark', lc: 'luke', jo: 'john', at: 'acts',
  rm: 'romans', '1co': '1-corinthians', '2co': '2-corinthians',
  gl: 'galatians', ef: 'ephesians', fp: 'philippians', cl: 'colossians',
  '1ts': '1-thessalonians', '2ts': '2-thessalonians',
  '1tm': '1-timothy', '2tm': '2-timothy',
  tt: 'titus', fm: 'philemon', hb: 'hebrews', tg: 'james',
  '1pe': '1-peter', '2pe': '2-peter', '1jo': '1-john', '2jo': '2-john',
  '3jo': '3-john', jd: 'jude', ap: 'revelation',
};

const FILE_NAME_MAP = {
  'jó': 'job',
  '1sm': '_1sm', '2sm': '_2sm', '1rs': '_1rs', '2rs': '_2rs',
  '1cr': '_1cr', '2cr': '_2cr', '1co': '_1co', '2co': '_2co',
  '1ts': '_1ts', '2ts': '_2ts', '1tm': '_1tm', '2tm': '_2tm',
  '1pe': '_1pe', '2pe': '_2pe', '1jo': '_1jo', '2jo': '_2jo', '3jo': '_3jo',
};

const VAR_NAME_MAP = {
  'jó': 'job',
  '1sm': '_1sm', '2sm': '_2sm', '1rs': '_1rs', '2rs': '_2rs',
  '1cr': '_1cr', '2cr': '_2cr', '1co': '_1co', '2co': '_2co',
  '1ts': '_1ts', '2ts': '_2ts', '1tm': '_1tm', '2tm': '_2tm',
  '1pe': '_1pe', '2pe': '_2pe', '1jo': '_1jo', '2jo': '_2jo', '3jo': '_3jo',
};

const MAX_CHAPTERS = {
  gn: 50, ex: 40, lv: 27, nm: 36, dt: 34, js: 24, jz: 21, rt: 4,
  '1sm': 31, '2sm': 24, '1rs': 22, '2rs': 25, '1cr': 29, '2cr': 36,
  ed: 10, ne: 13, et: 10, 'jó': 42, sl: 150, pv: 31, ec: 12, ct: 8,
  is: 66, jr: 52, lm: 5, ez: 48, dn: 12, os: 14, jl: 3, am: 9, ob: 1,
  jn: 4, mq: 7, na: 3, hc: 3, sf: 3, ag: 2, zc: 14, ml: 4,
  mt: 28, mc: 16, lc: 24, jo: 21, at: 28, rm: 16,
  '1co': 16, '2co': 13, gl: 6, ef: 6, fp: 4, cl: 4,
  '1ts': 5, '2ts': 3, '1tm': 6, '2tm': 4, tt: 3, fm: 1, hb: 13,
  tg: 5, '1pe': 5, '2pe': 3, '1jo': 5, '2jo': 1, '3jo': 1, jd: 1, ap: 22,
};

const TRADUCOES = ['nvi', 'ara', 'acf'];
const BASE = path.resolve('src/data/biblia/texto');
const DELAY_MS = 200;

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
function escapeStr(s) { return s.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\${/g, '\\${'); }

async function fetchChapter(traducao, bookSlug, chapter) {
  const url = `${API}/${traducao}/${bookSlug}/${chapter}`;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const res = await fetch(url);
      if (!res.ok) {
        if (res.status === 429) {
          const wait = (attempt + 1) * 5000;
          console.log(`      Rate limited, waiting ${wait}ms...`);
          await sleep(wait);
          continue;
        }
        return null;
      }
      const json = await res.json();
      return json.data?.verses || null;
    } catch (e) {
      console.log(`      Error (attempt ${attempt + 1}): ${e.message}`);
      await sleep(2000);
    }
  }
  return null;
}

function fileExists(traducao, fileName) {
  return fs.existsSync(path.join(BASE, traducao, `${fileName}.ts`));
}

async function gerarLivro(traducao, abrev, slug, totalCaps) {
  const fileName = FILE_NAME_MAP[abrev] || abrev;

  if (fileExists(traducao, fileName)) {
    console.log(`  [${traducao}] ${slug}: já existe, pulando`);
    return { abrev, fileName, varName: VAR_NAME_MAP[abrev] || abrev };
  }

  const bookData = {};
  for (let cap = 1; cap <= totalCaps; cap++) {
    const verses = await fetchChapter(traducao, slug, cap);
    if (verses && verses.length > 0) {
      bookData[cap] = verses;
    }
    if (cap < totalCaps) await sleep(DELAY_MS);
  }

  const caps = Object.keys(bookData).length;
  const versic = Object.values(bookData).flat().length;
  if (caps === 0) {
    console.log(`    [${traducao}] ${slug}: 0 capítulos`);
    return null;
  }

  let content = 'const data: Record<number, string[]> = {\n';
  for (const [cap, verses] of Object.entries(bookData)) {
    content += `  ${cap}: [\n`;
    for (const v of verses) content += `    \`${escapeStr(v)}\`,\n`;
    content += '  ],\n';
  }
  content += '};\nexport default data;\n';

  const dir = path.join(BASE, traducao);
  fs.writeFileSync(path.join(dir, `${fileName}.ts`), content, 'utf-8');
  console.log(`  [${traducao}] ${slug}: ${caps} cap, ${versic} vers -> ${fileName}.ts`);
  return { abrev, fileName, varName: VAR_NAME_MAP[abrev] || abrev };
}

function gerarIndex(traducao, infos) {
  const imports = infos.map(i => `import ${i.varName} from './${i.fileName}';`).join('\n');
  const mapping = infos.map(i => `  '${i.abrev}': ${i.varName},`).join('\n');
  const indexContent = `// Gerado automaticamente\n${imports}\n\nconst data: Record<string, Record<number, string[]>> = {\n${mapping}\n};\n\nexport default data;\n`;
  fs.writeFileSync(path.join(BASE, traducao, 'index.ts'), indexContent, 'utf-8');
  console.log(`  [${traducao}] index.ts gerado com ${infos.length} livros`);
}

async function gerarTraducao(traducao) {
  fs.mkdirSync(path.join(BASE, traducao), { recursive: true });
  const infos = [];
  const entries = Object.entries(LIVRO_MAP);
  let idx = 0;

  for (const [abrev, slug] of entries) {
    idx++;
    const totalCaps = MAX_CHAPTERS[abrev];
    console.log(`[${traducao}] ${idx}/${entries.length} ${slug}...`);
    const info = await gerarLivro(traducao, abrev, slug, totalCaps);
    if (info) infos.push(info);
  }

  gerarIndex(traducao, infos);
}

async function main() {
  console.log('=== GERADOR NVI/ARA/ACF (CONTINUAR) ===\n');
  for (const trad of TRADUCOES) {
    console.log(`\n--- ${trad.toUpperCase()} ---`);
    const start = Date.now();
    await gerarTraducao(trad);
    const elapsed = ((Date.now() - start) / 1000).toFixed(1);
    console.log(`  -> Concluído em ${elapsed}s`);
  }
  console.log('\n=== COMPLETO ===');
}

main().catch(console.error);
