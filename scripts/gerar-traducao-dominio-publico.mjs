#!/usr/bin/env node
/**
 * gerar-traducao-dominio-publico.mjs
 *
 * Gera pastas de tradução locais (padrão `src/data/biblia/texto/<id>/`) a partir
 * de bases de dados públicas de traduções bíblicas em português de domínio
 * público ou licença livre (Almeida 1911, Bíblia Livre, JFAAL).
 *
 * Fontes:
 *  - ALM1911 e BLIVRE: repositório github.com/damarals/biblias (releases),
 *    formato "thiagobodruk/biblia": array de 66 livros
 *    `{ abbrev, book?, chapters: [ [versiculo1, versiculo2, ...], ... ] }`,
 *    na ordem canônica (Gênesis → Apocalipse).
 *  - JFAAL: repositório github.com/BibliaJFAAL/JFAAL, arquivo
 *    `atualizada/1911-JFAAtualizadaLivre.json`, formato
 *    `{ books: [ { nr, name, chapters: [ { chapter, verses: [ { verse, text } ] } ] } ] }`,
 *    também na ordem canônica 1-66.
 *
 * Como ambas as fontes preservam a ordem canônica dos 66 livros protestantes,
 * o mapeamento livro→abreviação é feito por índice (0 = Gênesis, 65 = Apocalipse),
 * usando a mesma lista de abreviações/nomes de arquivo já usada pelo projeto em
 * `src/data/biblia/texto/{arc,kjv,...}/`.
 *
 * Uso:
 *   node scripts/gerar-traducao-dominio-publico.mjs --fonte alm1911
 *   node scripts/gerar-traducao-dominio-publico.mjs --fonte blivre
 *   node scripts/gerar-traducao-dominio-publico.mjs --fonte jfaal
 *   node scripts/gerar-traducao-dominio-publico.mjs --fonte todas
 *
 * Os JSONs brutos são cacheados em scripts/_tmp_licenciamento/ para evitar
 * downloads repetidos; apague essa pasta para forçar um novo download.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const CACHE_DIR = resolve(ROOT, 'scripts/_tmp_licenciamento');

// ─── Ordem canônica dos 66 livros (mesma ordem de src/data/biblia/livros.ts) ──
// { abbr: chave usada no objeto de dados (e em livros.ts), arquivo: nome do
// arquivo .ts gerado — segue a convenção já usada em arc/, kjv/, etc., onde
// abreviações que começam com dígito recebem um prefixo "_" no nome do arquivo
// (identificadores de módulo JS não podem começar com número) e Jó usa "job"
// para evitar o acento no nome do arquivo. }
const ORDEM_LIVROS = [
  { abbr: 'gn', arquivo: 'gn' }, { abbr: 'ex', arquivo: 'ex' }, { abbr: 'lv', arquivo: 'lv' },
  { abbr: 'nm', arquivo: 'nm' }, { abbr: 'dt', arquivo: 'dt' }, { abbr: 'js', arquivo: 'js' },
  { abbr: 'jz', arquivo: 'jz' }, { abbr: 'rt', arquivo: 'rt' }, { abbr: '1sm', arquivo: '_1sm' },
  { abbr: '2sm', arquivo: '_2sm' }, { abbr: '1rs', arquivo: '_1rs' }, { abbr: '2rs', arquivo: '_2rs' },
  { abbr: '1cr', arquivo: '_1cr' }, { abbr: '2cr', arquivo: '_2cr' }, { abbr: 'ed', arquivo: 'ed' },
  { abbr: 'ne', arquivo: 'ne' }, { abbr: 'et', arquivo: 'et' }, { abbr: 'jó', arquivo: 'job' },
  { abbr: 'sl', arquivo: 'sl' }, { abbr: 'pv', arquivo: 'pv' }, { abbr: 'ec', arquivo: 'ec' },
  { abbr: 'ct', arquivo: 'ct' }, { abbr: 'is', arquivo: 'is' }, { abbr: 'jr', arquivo: 'jr' },
  { abbr: 'lm', arquivo: 'lm' }, { abbr: 'ez', arquivo: 'ez' }, { abbr: 'dn', arquivo: 'dn' },
  { abbr: 'os', arquivo: 'os' }, { abbr: 'jl', arquivo: 'jl' }, { abbr: 'am', arquivo: 'am' },
  { abbr: 'ob', arquivo: 'ob' }, { abbr: 'jn', arquivo: 'jn' }, { abbr: 'mq', arquivo: 'mq' },
  { abbr: 'na', arquivo: 'na' }, { abbr: 'hc', arquivo: 'hc' }, { abbr: 'sf', arquivo: 'sf' },
  { abbr: 'ag', arquivo: 'ag' }, { abbr: 'zc', arquivo: 'zc' }, { abbr: 'ml', arquivo: 'ml' },
  { abbr: 'mt', arquivo: 'mt' }, { abbr: 'mc', arquivo: 'mc' }, { abbr: 'lc', arquivo: 'lc' },
  { abbr: 'jo', arquivo: 'jo' }, { abbr: 'at', arquivo: 'at' }, { abbr: 'rm', arquivo: 'rm' },
  { abbr: '1co', arquivo: '_1co' }, { abbr: '2co', arquivo: '_2co' }, { abbr: 'gl', arquivo: 'gl' },
  { abbr: 'ef', arquivo: 'ef' }, { abbr: 'fp', arquivo: 'fp' }, { abbr: 'cl', arquivo: 'cl' },
  { abbr: '1ts', arquivo: '_1ts' }, { abbr: '2ts', arquivo: '_2ts' }, { abbr: '1tm', arquivo: '_1tm' },
  { abbr: '2tm', arquivo: '_2tm' }, { abbr: 'tt', arquivo: 'tt' }, { abbr: 'fm', arquivo: 'fm' },
  { abbr: 'hb', arquivo: 'hb' }, { abbr: 'tg', arquivo: 'tg' }, { abbr: '1pe', arquivo: '_1pe' },
  { abbr: '2pe', arquivo: '_2pe' }, { abbr: '1jo', arquivo: '_1jo' }, { abbr: '2jo', arquivo: '_2jo' },
  { abbr: '3jo', arquivo: '_3jo' }, { abbr: 'jd', arquivo: 'jd' }, { abbr: 'ap', arquivo: 'ap' },
];

if (ORDEM_LIVROS.length !== 66) {
  throw new Error(`ORDEM_LIVROS deveria ter 66 livros, tem ${ORDEM_LIVROS.length}`);
}

// ─── Fontes ───────────────────────────────────────────────────────────────

const FONTES = {
  alm1911: {
    id: 'alm1911',
    urls: [
      'https://github.com/damarals/biblias/releases/latest/download/ALM1911.json',
    ],
    cache: 'ALM1911.json',
    formato: 'thiagobodruk',
  },
  blivre: {
    id: 'blivre',
    urls: [
      'https://github.com/damarals/biblias/releases/latest/download/BLIVRE.json',
    ],
    cache: 'BLIVRE.json',
    formato: 'thiagobodruk',
  },
  jfaal: {
    id: 'jfaal',
    urls: [
      'https://raw.githubusercontent.com/BibliaJFAAL/JFAAL/main/atualizada/1911-JFAAtualizadaLivre.json',
    ],
    cache: 'JFAAL.json',
    formato: 'jfaal',
  },
};

// ─── Parse arguments ─────────────────────────────────────────────────────────

function parseArgs() {
  const args = process.argv.slice(2);
  const parsed = {};
  for (let i = 0; i < args.length; i += 2) {
    const key = args[i]?.replace(/^--/, '');
    if (key) parsed[key] = args[i + 1];
  }
  return parsed;
}

const args = parseArgs();
const fonteArg = args.fonte || 'todas';
const fontesAlvo = fonteArg === 'todas' ? Object.keys(FONTES) : [fonteArg];

for (const f of fontesAlvo) {
  if (!FONTES[f]) {
    console.error(`❌ Fonte desconhecida: "${f}". Opções: ${Object.keys(FONTES).join(', ')}, todas`);
    process.exit(1);
  }
}

// ─── Download / cache ────────────────────────────────────────────────────────

async function baixarJson(fonte) {
  mkdirSync(CACHE_DIR, { recursive: true });
  const cachePath = resolve(CACHE_DIR, fonte.cache);

  if (existsSync(cachePath)) {
    console.log(`  📄 Usando cache: ${cachePath}`);
    return JSON.parse(readFileSync(cachePath, 'utf8'));
  }

  let ultimoErro;
  for (const url of fonte.urls) {
    try {
      console.log(`  📥 Baixando ${url}...`);
      const res = await fetch(url, { signal: AbortSignal.timeout(30_000) });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const texto = await res.text();
      writeFileSync(cachePath, texto, 'utf8');
      return JSON.parse(texto);
    } catch (err) {
      ultimoErro = err;
      console.log(`  ⚠️  Falhou (${err.message}), tentando próxima URL se houver...`);
    }
  }
  throw ultimoErro ?? new Error('Nenhuma URL disponível');
}

// ─── Normalização por formato ────────────────────────────────────────────────

/**
 * Formato "thiagobodruk" (damarals/biblias): array de 66 livros na ordem
 * canônica, cada um com `chapters: string[][]` (índice 0 = capítulo 1).
 */
function normalizarThiagobodruk(json) {
  if (!Array.isArray(json) || json.length !== 66) {
    throw new Error(`Formato inesperado: esperava array de 66 livros, recebeu ${json?.length}`);
  }

  const data = {};
  ORDEM_LIVROS.forEach((livro, i) => {
    const livroJson = json[i];
    const capitulos = {};
    livroJson.chapters.forEach((versiculos, capIdx) => {
      if (Array.isArray(versiculos) && versiculos.length > 0) {
        capitulos[capIdx + 1] = versiculos.map((v) => String(v).trim());
      }
    });
    data[livro.abbr] = { arquivo: livro.arquivo, capitulos };
  });
  return data;
}

/**
 * Formato "jfaal" (BibliaJFAAL/JFAAL): `{ books: [{ nr, chapters: [{ chapter, verses: [{ verse, text }] }] }] }`,
 * também na ordem canônica 1-66.
 */
function normalizarJfaal(json) {
  const livrosJson = json.books;
  if (!Array.isArray(livrosJson) || livrosJson.length !== 66) {
    throw new Error(`Formato inesperado: esperava 66 livros em "books", recebeu ${livrosJson?.length}`);
  }

  const data = {};
  ORDEM_LIVROS.forEach((livro, i) => {
    const livroJson = livrosJson[i];
    const capitulos = {};
    for (const cap of livroJson.chapters) {
      const versiculos = (cap.verses ?? [])
        .slice()
        .sort((a, b) => a.verse - b.verse)
        .map((v) => String(v.text).trim());
      if (versiculos.length > 0) {
        capitulos[cap.chapter] = versiculos;
      }
    }
    data[livro.abbr] = { arquivo: livro.arquivo, capitulos };
  });
  return data;
}

// ─── Geração de arquivos (mesmo padrão de scripts/add-translation.mjs) ──────

function escaparTexto(texto) {
  return texto.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
}

function gerarArquivoLivro(capitulos) {
  const linhas = [`const data: Record<number, string[]> = {`];
  const numerosCapitulos = Object.keys(capitulos)
    .map(Number)
    .sort((a, b) => a - b);

  for (const cap of numerosCapitulos) {
    linhas.push(`  ${cap}: [`);
    for (const verso of capitulos[cap]) {
      linhas.push(`    \`${escaparTexto(verso)}\`,`);
    }
    linhas.push(`  ],`);
  }

  linhas.push(`};`);
  linhas.push(``);
  linhas.push(`export default data;`);
  linhas.push(``);
  return linhas.join('\n');
}

function gerarIndex(data) {
  const imports = [];
  const entradas = [];

  for (const livro of ORDEM_LIVROS) {
    const varName = livro.arquivo.startsWith('_') ? livro.arquivo : livro.arquivo;
    imports.push(`import ${varName} from './${livro.arquivo}';`);
    entradas.push(`  '${livro.abbr}': ${varName},`);
  }

  return `// Gerado automaticamente por scripts/gerar-traducao-dominio-publico.mjs
// Ver src/data/biblia/texto/LICENCAS.md para a licença e a fonte desta tradução.
${imports.join('\n')}

const data: Record<string, Record<number, string[]>> = {
${entradas.join('\n')}
};

export default data;
`;
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function processarFonte(fonteId) {
  const fonte = FONTES[fonteId];
  console.log(`\n📚 Processando fonte: ${fonteId}`);

  const json = await baixarJson(fonte);
  const data = fonte.formato === 'jfaal' ? normalizarJfaal(json) : normalizarThiagobodruk(json);

  let totalCapitulos = 0;
  let totalVersiculos = 0;

  const tradDir = resolve(ROOT, `src/data/biblia/texto/${fonteId}`);
  mkdirSync(tradDir, { recursive: true });

  for (const livro of ORDEM_LIVROS) {
    const { capitulos } = data[livro.abbr];
    const nCaps = Object.keys(capitulos).length;
    const nVersiculos = Object.values(capitulos).reduce((s, v) => s + v.length, 0);
    totalCapitulos += nCaps;
    totalVersiculos += nVersiculos;

    const conteudo = gerarArquivoLivro(capitulos);
    writeFileSync(resolve(tradDir, `${livro.arquivo}.ts`), conteudo, 'utf8');
  }

  const indexContent = gerarIndex(data);
  writeFileSync(resolve(tradDir, 'index.ts'), indexContent, 'utf8');

  console.log(`  ✅ ${ORDEM_LIVROS.length} livros, ${totalCapitulos} capítulos, ${totalVersiculos} versículos`);
  console.log(`  📁 Gerado em: src/data/biblia/texto/${fonteId}/`);

  // Verificação rápida: Gênesis deve ter 50 capítulos
  const capGenesis = Object.keys(data['gn'].capitulos).length;
  if (capGenesis !== 50) {
    console.warn(`  ⚠️  Atenção: Gênesis tem ${capGenesis} capítulos (esperado: 50)`);
  } else {
    console.log(`  ✔️  Verificação: Gênesis com 50 capítulos, OK`);
  }

  return { totalCapitulos, totalVersiculos };
}

async function main() {
  console.log(`\n🔧 Gerando tradução(ões) de domínio público / licença livre: ${fontesAlvo.join(', ')}`);
  for (const fonteId of fontesAlvo) {
    await processarFonte(fonteId);
  }
  console.log(`\n✅ Concluído. Lembre-se de registrar a(s) nova(s) tradução(ões) em:`);
  console.log(`   - src/data/biblia/texto/carregar.ts (TRADUCOES_LOCAIS e TRADUCOES_DISPONIVEIS)`);
  console.log(`   - src/data/biblia/versoes.ts`);
  console.log(`   - src/data/biblia/texto/LICENCAS.md`);
}

main().catch((err) => {
  console.error('❌ Erro:', err);
  process.exit(1);
});
