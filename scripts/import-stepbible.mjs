#!/usr/bin/env node
// ═══════════════════════════════════════════════════════════════════════════
// IMPORTADOR STEPBible-Data — interlinear com forma flexionada real,
// Strong desambiguado, morfologia e aparato crítico (grego)
// ═══════════════════════════════════════════════════════════════════════════
//
// Fonte: STEPBible-Data (Tyndale House Cambridge / STEPBible.org)
// Licença: CC BY 4.0 — https://github.com/STEPBible/STEPBible-Data
// Atribuição obrigatória: "Dados de STEPBible.org / Tyndale House Cambridge,
// Creative Commons Attribution 4.0 (CC BY 4.0)"
//
// Este script baixa (com cache local) os arquivos brutos TAHOT (hebraico) e
// TAGNT (grego) do repositório STEPBible-Data e gera, LIVRO POR LIVRO, um
// arquivo TS por livro em src/data/biblia/stepbible/, no padrão lazy-load já
// usado pelo restante do projeto (ex.: src/data/biblia/texto/alm1911/*.ts).
//
// Uso:
//   node scripts/import-stepbible.mjs               (processa todos os livros
//                                                      configurados em LIVROS)
//   node scripts/import-stepbible.mjs mt mc lc       (processa só os livros
//                                                      informados, por abreviação
//                                                      do projeto)
//
// O script cacheia os .txt brutos (multi-MB) em scripts/.cache/stepbible/
// para não precisar baixar de novo a cada execução.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const CACHE_DIR = path.join(__dirname, '.cache', 'stepbible');
const OUT_DIR = path.join(ROOT, 'src', 'data', 'biblia', 'stepbible');

// ─────────────────────────────────────────────────────────────────────────
// Arquivos-fonte do STEPBible-Data. Cada um cobre um intervalo de livros do
// cânon (limitação de tamanho de arquivo do GitHub).
// ─────────────────────────────────────────────────────────────────────────

const SOURCES = {
  tahotGenDeu: {
    url: "https://raw.githubusercontent.com/STEPBible/STEPBible-Data/master/Translators%20Amalgamated%20OT%2BNT/TAHOT%20Gen-Deu%20-%20Translators%20Amalgamated%20Hebrew%20OT%20-%20STEPBible.org%20CC%20BY.txt",
    file: 'TAHOT_Gen-Deu.txt',
  },
  tahotJosEst: {
    url: "https://raw.githubusercontent.com/STEPBible/STEPBible-Data/master/Translators%20Amalgamated%20OT%2BNT/TAHOT%20Jos-Est%20-%20Translators%20Amalgamated%20Hebrew%20OT%20-%20STEPBible.org%20CC%20BY.txt",
    file: 'TAHOT_Jos-Est.txt',
  },
  tahotJobSng: {
    url: "https://raw.githubusercontent.com/STEPBible/STEPBible-Data/master/Translators%20Amalgamated%20OT%2BNT/TAHOT%20Job-Sng%20-%20Translators%20Amalgamated%20Hebrew%20OT%20-%20STEPBible.org%20CC%20BY.txt",
    file: 'TAHOT_Job-Sng.txt',
  },
  tahotIsaMal: {
    url: "https://raw.githubusercontent.com/STEPBible/STEPBible-Data/master/Translators%20Amalgamated%20OT%2BNT/TAHOT%20Isa-Mal%20-%20Translators%20Amalgamated%20Hebrew%20OT%20-%20STEPBible.org%20CC%20BY.txt",
    file: 'TAHOT_Isa-Mal.txt',
  },
  tagntMatJhn: {
    url: "https://raw.githubusercontent.com/STEPBible/STEPBible-Data/master/Translators%20Amalgamated%20OT%2BNT/TAGNT%20Mat-Jhn%20-%20Translators%20Amalgamated%20Greek%20NT%20-%20STEPBible.org%20CC-BY.txt",
    file: 'TAGNT_Mat-Jhn.txt',
  },
  tagntActRev: {
    url: "https://raw.githubusercontent.com/STEPBible/STEPBible-Data/master/Translators%20Amalgamated%20OT%2BNT/TAGNT%20Act-Rev%20-%20Translators%20Amalgamated%20Greek%20NT%20-%20STEPBible.org%20CC-BY.txt",
    file: 'TAGNT_Act-Rev.txt',
  },
};

// ─────────────────────────────────────────────────────────────────────────
// Catálogo de livros suportados: código do livro no STEPBible -> abreviação
// do projeto (ver src/data/biblia/livros.ts), idioma, arquivo-fonte e total
// de capítulos esperado (para validação de integridade pós-importação).
// ─────────────────────────────────────────────────────────────────────────

const LIVROS = [
  // ---- Hebraico (TAHOT) ----
  { stepCode: 'Gen', abrev: 'gn', idioma: 'hebraico', fonte: 'tahotGenDeu', totalCapitulos: 50 },
  { stepCode: 'Exo', abrev: 'ex', idioma: 'hebraico', fonte: 'tahotGenDeu', totalCapitulos: 40 },
  { stepCode: 'Psa', abrev: 'sl', idioma: 'hebraico', fonte: 'tahotJobSng', totalCapitulos: 150 },

  // ---- Grego (TAGNT) — Evangelhos ----
  { stepCode: 'Mat', abrev: 'mt', idioma: 'grego', fonte: 'tagntMatJhn', totalCapitulos: 28 },
  { stepCode: 'Mrk', abrev: 'mc', idioma: 'grego', fonte: 'tagntMatJhn', totalCapitulos: 16 },
  { stepCode: 'Luk', abrev: 'lc', idioma: 'grego', fonte: 'tagntMatJhn', totalCapitulos: 24 },
  { stepCode: 'Jhn', abrev: 'jo', idioma: 'grego', fonte: 'tagntMatJhn', totalCapitulos: 21 },

  // ---- Grego (TAGNT) — restante do NT em ordem canônica ----
  { stepCode: 'Act', abrev: 'at', idioma: 'grego', fonte: 'tagntActRev', totalCapitulos: 28 },
  { stepCode: 'Rom', abrev: 'rm', idioma: 'grego', fonte: 'tagntActRev', totalCapitulos: 16 },
  { stepCode: '1Co', abrev: '1co', idioma: 'grego', fonte: 'tagntActRev', totalCapitulos: 16 },
  { stepCode: '2Co', abrev: '2co', idioma: 'grego', fonte: 'tagntActRev', totalCapitulos: 13 },
  { stepCode: 'Gal', abrev: 'gl', idioma: 'grego', fonte: 'tagntActRev', totalCapitulos: 6 },
  { stepCode: 'Eph', abrev: 'ef', idioma: 'grego', fonte: 'tagntActRev', totalCapitulos: 6 },
  { stepCode: 'Php', abrev: 'fp', idioma: 'grego', fonte: 'tagntActRev', totalCapitulos: 4 },
  { stepCode: 'Col', abrev: 'cl', idioma: 'grego', fonte: 'tagntActRev', totalCapitulos: 4 },
  { stepCode: '1Th', abrev: '1ts', idioma: 'grego', fonte: 'tagntActRev', totalCapitulos: 5 },
  { stepCode: '2Th', abrev: '2ts', idioma: 'grego', fonte: 'tagntActRev', totalCapitulos: 3 },
  { stepCode: '1Ti', abrev: '1tm', idioma: 'grego', fonte: 'tagntActRev', totalCapitulos: 6 },
  { stepCode: '2Ti', abrev: '2tm', idioma: 'grego', fonte: 'tagntActRev', totalCapitulos: 4 },
  { stepCode: 'Tit', abrev: 'tt', idioma: 'grego', fonte: 'tagntActRev', totalCapitulos: 3 },
  { stepCode: 'Phm', abrev: 'fm', idioma: 'grego', fonte: 'tagntActRev', totalCapitulos: 1 },
  { stepCode: 'Heb', abrev: 'hb', idioma: 'grego', fonte: 'tagntActRev', totalCapitulos: 13 },
  { stepCode: 'Jas', abrev: 'tg', idioma: 'grego', fonte: 'tagntActRev', totalCapitulos: 5 },
  { stepCode: '1Pe', abrev: '1pe', idioma: 'grego', fonte: 'tagntActRev', totalCapitulos: 5 },
  { stepCode: '2Pe', abrev: '2pe', idioma: 'grego', fonte: 'tagntActRev', totalCapitulos: 3 },
  { stepCode: '1Jn', abrev: '1jo', idioma: 'grego', fonte: 'tagntActRev', totalCapitulos: 5 },
  { stepCode: '2Jn', abrev: '2jo', idioma: 'grego', fonte: 'tagntActRev', totalCapitulos: 1 },
  { stepCode: '3Jn', abrev: '3jo', idioma: 'grego', fonte: 'tagntActRev', totalCapitulos: 1 },
  { stepCode: 'Jud', abrev: 'jd', idioma: 'grego', fonte: 'tagntActRev', totalCapitulos: 1 },
  { stepCode: 'Rev', abrev: 'ap', idioma: 'grego', fonte: 'tagntActRev', totalCapitulos: 22 },
];

/** Livros que este script deve efetivamente processar nesta execução. */
function livrosAlvo() {
  const args = process.argv.slice(2).map((a) => a.toLowerCase());
  if (args.length === 0) return LIVROS;
  return LIVROS.filter((l) => args.includes(l.abrev));
}

async function baixarComCache(nome) {
  const { url, file } = SOURCES[nome];
  const destino = path.join(CACHE_DIR, file);
  if (fs.existsSync(destino)) {
    console.log(`[cache] ${file} já baixado, reutilizando.`);
    return fs.readFileSync(destino, 'utf8');
  }
  fs.mkdirSync(CACHE_DIR, { recursive: true });
  console.log(`[download] Baixando ${file}...`);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Falha ao baixar ${url}: ${res.status}`);
  const texto = await res.text();
  fs.writeFileSync(destino, texto, 'utf8');
  console.log(`[download] ${file} salvo (${(texto.length / 1024 / 1024).toFixed(1)} MB).`);
  return texto;
}

const _cacheTextoFonte = new Map();
async function textoFonte(nomeFonte) {
  if (!_cacheTextoFonte.has(nomeFonte)) {
    _cacheTextoFonte.set(nomeFonte, await baixarComCache(nomeFonte));
  }
  return _cacheTextoFonte.get(nomeFonte);
}

// ─────────────────────────────────────────────────────────────────────────
// Decodificador de morfologia hebraica (esquema OSHB/Westminster, usado
// pelo TAHOT). Referência: openscriptures.github.io/morphhb (CC BY 4.0).
// Cobre os casos mais comuns encontrados no corpus (verbo, substantivo,
// adjetivo, partícula, preposição, conjunção, advérbio, pronome, sufixo).
// Não é exaustivo — para expandir, ver a documentação completa em
// https://openscriptures.github.io/morphhb/parsing/HebrewMorphologyCodes.html
// ─────────────────────────────────────────────────────────────────────────

const HEB_STEM = {
  q: 'Qal', N: 'Nifal', p: 'Piel', P: 'Pual', h: 'Hifil', H: 'Hofal',
  t: 'Hitpael', o: 'Poal', O: 'Poal', r: 'Poel', m: 'Poel', f: 'Pilpel',
};
const HEB_CONJ = {
  p: 'perfeito', q: 'perfeito', i: 'imperfeito', w: 'wayyiqtol (consecutivo)',
  j: 'jussivo', v: 'coortativo', h: 'coortativo', r: 'imperativo',
  a: 'infinitivo absoluto', c: 'infinitivo construto',
  t: 'particípio ativo', s: 'particípio passivo',
};
const HEB_GEN = { m: 'masculino', f: 'feminino', b: 'ambos', c: 'comum' };
const HEB_NUM = { s: 'singular', p: 'plural', d: 'dual' };
const HEB_STATE = { a: 'absoluto', c: 'construto', d: 'determinado' };
const HEB_PESSOA = { '1': '1ª pessoa', '2': '2ª pessoa', '3': '3ª pessoa' };

function decodificarMorfologiaHebraica(codigoBruto) {
  if (!codigoBruto) return { tipo: '', label: '' };
  // Remove prefixo de idioma "H" e possíveis sufixos de conjunção/artigo concatenados
  const codigo = codigoBruto.replace(/^H/, '');
  const pos = codigo[0];

  if (pos === 'V') {
    const stemChar = codigo[1];
    const conjChar = codigo[2];
    const stem = HEB_STEM[stemChar] || stemChar;
    const conj = HEB_CONJ[conjChar] || conjChar;
    const resto = codigo.slice(3);
    const partes = [`verbo, ${stem}, ${conj}`];
    if (conjChar === 't' || conjChar === 's') {
      // particípio: gênero + número (+ estado)
      const gen = HEB_GEN[resto[0]];
      const num = HEB_NUM[resto[1]];
      const est = HEB_STATE[resto[2]];
      if (gen) partes.push(gen);
      if (num) partes.push(num);
      if (est) partes.push(`estado ${est}`);
    } else if (conjChar === 'a' || conjChar === 'c') {
      // infinitivo: geralmente sem pessoa/número
    } else {
      const pessoa = HEB_PESSOA[resto[0]];
      const gen = HEB_GEN[resto[1]];
      const num = HEB_NUM[resto[2]];
      if (pessoa) partes.push(pessoa);
      if (gen) partes.push(gen);
      if (num) partes.push(num);
    }
    return { tipo: 'Verbo', label: partes.join(', ') };
  }

  if (pos === 'N') {
    const tipoChar = codigo[1]; // c=comum, p=próprio, g=gentílico
    const tipoNome = tipoChar === 'p' ? 'próprio' : tipoChar === 'g' ? 'gentílico' : 'comum';
    const gen = HEB_GEN[codigo[2]];
    const num = HEB_NUM[codigo[3]];
    const est = HEB_STATE[codigo[4]];
    const partes = [`substantivo (${tipoNome})`];
    if (gen) partes.push(gen);
    if (num) partes.push(num);
    if (est) partes.push(`estado ${est}`);
    return { tipo: 'Substantivo', label: partes.join(', ') };
  }

  if (pos === 'A') {
    const gen = HEB_GEN[codigo[2]];
    const num = HEB_NUM[codigo[3]];
    const est = HEB_STATE[codigo[4]];
    const partes = ['adjetivo'];
    if (gen) partes.push(gen);
    if (num) partes.push(num);
    if (est) partes.push(`estado ${est}`);
    return { tipo: 'Adjetivo', label: partes.join(', ') };
  }

  if (pos === 'T') {
    const sub = codigo[1];
    const nomes = { d: 'artigo definido', o: 'marcador de objeto direto', i: 'interrogativo', c: 'partícula de comparação', a: 'partícula de afirmação', e: 'partícula de exceção', n: 'partícula negativa', r: 'partícula relativa' };
    return { tipo: 'Partícula', label: `partícula (${nomes[sub] || sub || 'geral'})` };
  }

  if (pos === 'R') return { tipo: 'Preposição', label: 'preposição' };
  if (pos === 'C') return { tipo: 'Conjunção', label: 'conjunção' };
  if (pos === 'D') return { tipo: 'Advérbio', label: 'advérbio' };
  if (pos === 'P') return { tipo: 'Pronome', label: 'pronome' };
  if (pos === 'S') return { tipo: 'Sufixo', label: 'sufixo pronominal' };

  return { tipo: pos || '?', label: codigoBruto };
}

// Robinson (grego) já é decodificado pelo parser existente em src/lib/morphology.ts,
// então aqui apenas normalizamos o código bruto "G1510=V-IAI-3S" -> partes.

function normalizarStrongHebraico(bruto) {
  // ex.: "{H7225G}" ou "H9003" -> "H7225"
  const semChaves = bruto.replace(/[{}]/g, '');
  const m = semChaves.match(/^H(\d+)/);
  if (!m) return semChaves;
  return `H${m[1]}`;
}

function normalizarStrongGrego(bruto) {
  const m = bruto.match(/^G(\d+)/);
  return m ? `G${m[1]}` : bruto;
}

// Referência do STEPBible: 2-3 letras, opcionalmente precedidas de um dígito
// (ex.: "Gen", "Jhn", "1Co", "2Th", "3Jn"), seguida de capítulo.versículo.
// Quando a versificação de referência (massorética/crítica) diverge de uma
// numeração alternativa mais comum em outras tradições, a referência traz
// essa alternativa entre parênteses (ex.: "Gen.31.55(32.1)"). Confirmado por
// amostragem contra o texto local (ARC): a numeração PRINCIPAL (antes dos
// parênteses) é a que corresponde à versificação usada pelas traduções do
// projeto — a alternativa entre parênteses deve ser apenas ignorada, mas
// precisa ser tolerada pela regex para o versículo não ser descartado.
const REGEX_REF = /^(\d?[A-Za-z]{2,3})\.(\d+)\.(\d+)(?:\(\d+\.\d+\))?#(\d+)/;

/** Resolve capítulo/versículo finais a partir dos grupos de REGEX_REF.
 * Versículo 0 (usado pelo STEPBible para o título/superscrição de alguns
 * Salmos, ex. "Psa.3.0") é mesclado ao versículo 1, já que as traduções do
 * projeto não numeram o título separadamente. */
function resolverCapVer(m) {
  const [, , capStr, verStr, wordIdx] = m;
  const ver = Number(verStr);
  return {
    cap: Number(capStr),
    ver: ver <= 0 ? 1 : ver,
    wordIdx,
  };
}

// ─────────────────────────────────────────────────────────────────────────
// Parser TAHOT (hebraico) — colunas: Ref&Type, Hebrew, Translit, Translation,
// dStrongs, Grammar, ...
// ─────────────────────────────────────────────────────────────────────────

function parseTahot(texto, livroFiltro) {
  const linhas = texto.split(/\r?\n/);
  const porVersiculo = new Map(); // "cap:ver" -> [palavras]

  for (const linha of linhas) {
    if (!linha || linha.startsWith('Eng (Heb)')) continue;
    const ref = linha.slice(0, linha.indexOf('\t'));
    const m = ref.match(REGEX_REF);
    if (!m) continue;
    const livroAbrevEn = m[1];
    if (livroFiltro && livroAbrevEn !== livroFiltro) continue;
    const { cap, ver, wordIdx } = resolverCapVer(m);

    const cols = linha.split('\t');
    if (cols.length < 6) continue;
    const [, hebraico, translit, translation, dStrongs, grammar] = cols;

    const hebraicoPartes = hebraico.split('\\'); // separa palavra de pontuação (sof pasuq, maqaf)
    const formaOriginal = hebraicoPartes[0].replace(/\//g, '');

    const strongsPartes = dStrongs.split('/');
    const grammarPartes = grammar.split('/');
    const idxPrincipal = strongsPartes.findIndex((s) => s.includes('{'));
    const strongBrutoPrincipal = idxPrincipal >= 0 ? strongsPartes[idxPrincipal] : strongsPartes[strongsPartes.length - 1];
    const grammarPrincipal = idxPrincipal >= 0 ? (grammarPartes[idxPrincipal] || '') : (grammarPartes[grammarPartes.length - 1] || '');

    const strong = normalizarStrongHebraico(strongBrutoPrincipal);
    const morf = decodificarMorfologiaHebraica(grammarPrincipal);

    const chave = `${cap}:${ver}`;
    if (!porVersiculo.has(chave)) porVersiculo.set(chave, []);
    porVersiculo.get(chave).push({
      ref: `${livroAbrevEn}.${cap}.${ver}#${wordIdx}`,
      formaOriginal,
      transliteracao: translit.replace(/\//g, '').trim(),
      glosaIngles: translation.replace(/\//g, ' ').replace(/\s+/g, ' ').trim(),
      strong,
      strongBruto: dStrongs,
      morfologiaCodigo: grammarPrincipal,
      morfologia: morf.label,
    });
  }
  return porVersiculo;
}

// ─────────────────────────────────────────────────────────────────────────
// Parser TAGNT (grego) — colunas: Word&Type, Greek, English, dStrongs=Grammar,
// Lemma=Gloss, editions, ...
// ─────────────────────────────────────────────────────────────────────────

function parseTagnt(texto, livroFiltro) {
  const linhas = texto.split(/\r?\n/);
  const porVersiculo = new Map();

  for (const linha of linhas) {
    if (!linha || linha.startsWith('Word & Type')) continue;
    const ref = linha.slice(0, linha.indexOf('\t'));
    const m = ref.match(REGEX_REF);
    if (!m) continue;
    const livroAbrevEn = m[1];
    if (livroFiltro && livroAbrevEn !== livroFiltro) continue;
    const { cap, ver, wordIdx } = resolverCapVer(m);

    const cols = linha.split('\t');
    if (cols.length < 6) continue;
    const [, grego, ingles, strongGrammar, , edicoesStr] = cols;

    const [strongBruto, grammarCodigo] = strongGrammar.split('=');
    const strong = normalizarStrongGrego(strongBruto || '');
    const formaOriginal = grego.replace(/\s*\([^)]*\)\s*$/, '').trim(); // remove transliteração entre parênteses
    const translitMatch = grego.match(/\(([^)]+)\)/);

    const chave = `${cap}:${ver}`;
    if (!porVersiculo.has(chave)) porVersiculo.set(chave, []);
    porVersiculo.get(chave).push({
      ref: `${livroAbrevEn}.${cap}.${ver}#${wordIdx}`,
      formaOriginal,
      transliteracao: translitMatch ? translitMatch[1] : '',
      glosaIngles: (ingles || '').trim(),
      strong,
      strongBruto: strongGrammar,
      morfologiaCodigo: grammarCodigo || '',
      edicoes: edicoesStr ? edicoesStr.split('+') : [],
    });
  }
  return porVersiculo;
}

// ─────────────────────────────────────────────────────────────────────────
// Geração dos arquivos TS de saída
// ─────────────────────────────────────────────────────────────────────────

const CABECALHO_ATRIBUICAO = `// ═══════════════════════════════════════════════════════════════════════
// STEPBible-Data — gerado por scripts/import-stepbible.mjs
//
// FONTE E ATRIBUIÇÃO (OBRIGATÓRIA por licença):
//   Dados de STEPBible.org / Tyndale House Cambridge.
//   Licenciado sob Creative Commons Attribution 4.0 (CC BY 4.0).
//   https://github.com/STEPBible/STEPBible-Data
//   https://creativecommons.org/licenses/by/4.0/
//
// Este arquivo é gerado automaticamente. Não edite manualmente —
// rode "node scripts/import-stepbible.mjs" para regenerar.
// ═══════════════════════════════════════════════════════════════════════
`;

function compararChaves(a, b) {
  const [ca, va] = a[0].split(':').map(Number);
  const [cb, vb] = b[0].split(':').map(Number);
  return ca - cb || va - vb;
}

function gerarArquivo(idioma, porVersiculo) {
  const obj = {};
  for (const [chave, palavras] of [...porVersiculo.entries()].sort(compararChaves)) {
    obj[chave] = palavras;
  }
  const tipo = idioma === 'hebraico' ? 'PalavraStepBibleHebraico' : 'PalavraStepBibleGrego';
  return `${CABECALHO_ATRIBUICAO}
import type { ${tipo} } from './types';

/** Palavras por versículo ("capítulo:versículo" -> palavras), na ordem do texto original. */
export const PALAVRAS: Record<string, ${tipo}[]> = ${JSON.stringify(obj, null, 0)};
`;
}

/** Nome de arquivo válido para o filesystem/import: livros cuja abreviação
 * começa com dígito (1co, 2co, ...) recebem prefixo "_", como já é feito em
 * src/data/biblia/texto/alm1911/*.ts. */
function nomeArquivo(abrev) {
  return /^\d/.test(abrev) ? `_${abrev}` : abrev;
}

// ─────────────────────────────────────────────────────────────────────────
// Validação de integridade pós-importação
// ─────────────────────────────────────────────────────────────────────────

function validar(livro, porVersiculo) {
  const avisos = [];
  const capitulos = new Set();
  let totalPalavras = 0;
  let semStrong = 0;
  let semMorfologia = 0;

  for (const [chave, palavras] of porVersiculo) {
    const [cap] = chave.split(':').map(Number);
    capitulos.add(cap);
    totalPalavras += palavras.length;
    for (const p of palavras) {
      if (!p.strong || p.strong.trim() === '') semStrong++;
      const morfVazia = livro.idioma === 'hebraico' ? !p.morfologiaCodigo : !p.morfologiaCodigo;
      if (morfVazia) semMorfologia++;
    }
  }

  const capitulosOrdenados = [...capitulos].sort((a, b) => a - b);
  const capMin = capitulosOrdenados[0];
  const capMax = capitulosOrdenados[capitulosOrdenados.length - 1];

  if (porVersiculo.size === 0) {
    avisos.push('NENHUM versículo encontrado — verifique o código do livro/fonte.');
  }
  if (capitulosOrdenados.length !== livro.totalCapitulos) {
    avisos.push(`Capítulos encontrados (${capitulosOrdenados.length}) != esperado (${livro.totalCapitulos}).`);
  }
  if (capMin !== 1) {
    avisos.push(`Primeiro capítulo encontrado é ${capMin}, esperado 1.`);
  }
  if (capMax !== livro.totalCapitulos) {
    avisos.push(`Último capítulo encontrado é ${capMax}, esperado ${livro.totalCapitulos}.`);
  }
  const pctSemStrong = totalPalavras ? (semStrong / totalPalavras) * 100 : 0;
  if (pctSemStrong > 5) {
    avisos.push(`${semStrong}/${totalPalavras} palavras (${pctSemStrong.toFixed(1)}%) sem Strong — acima do esperado.`);
  }

  console.log(
    `  [${livro.abrev}] versículos=${porVersiculo.size} capítulos=${capitulosOrdenados.length}/${livro.totalCapitulos} ` +
    `palavras=${totalPalavras} semStrong=${semStrong} semMorfologia=${semMorfologia}`
  );
  for (const aviso of avisos) {
    console.warn(`    ⚠ ${aviso}`);
  }
  return avisos.length === 0;
}

// ─────────────────────────────────────────────────────────────────────────

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const alvos = livrosAlvo();
  if (alvos.length === 0) {
    console.error('Nenhum livro reconhecido nos argumentos. Livros disponíveis:', LIVROS.map((l) => l.abrev).join(', '));
    process.exit(1);
  }

  console.log(`Processando ${alvos.length} livro(s): ${alvos.map((l) => l.abrev).join(', ')}\n`);

  const resumo = [];
  for (const livro of alvos) {
    const texto = await textoFonte(livro.fonte);
    const porVersiculo = livro.idioma === 'hebraico'
      ? parseTahot(texto, livro.stepCode)
      : parseTagnt(texto, livro.stepCode);

    const ok = validar(livro, porVersiculo);
    const arquivo = `${nomeArquivo(livro.abrev)}.ts`;
    fs.writeFileSync(path.join(OUT_DIR, arquivo), gerarArquivo(livro.idioma, porVersiculo));
    resumo.push({ abrev: livro.abrev, idioma: livro.idioma, versiculos: porVersiculo.size, ok });
  }

  console.log('\n=== Resumo ===');
  for (const r of resumo) {
    console.log(`  ${r.ok ? '✓' : '✗'} ${r.abrev} (${r.idioma}) — ${r.versiculos} versículos`);
  }
  console.log('\nConcluído. Arquivos gerados em src/data/biblia/stepbible/.');
  console.log('Lembrete: atualize manualmente src/data/biblia/stepbible/index.ts com os novos livros.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
