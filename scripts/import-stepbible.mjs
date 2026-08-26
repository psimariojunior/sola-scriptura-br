#!/usr/bin/env node
// ═══════════════════════════════════════════════════════════════════════════
// IMPORTADOR STEPBible-Data — Piloto de interlinear com forma flexionada real
// ═══════════════════════════════════════════════════════════════════════════
//
// Fonte: STEPBible-Data (Tyndale House Cambridge / STEPBible.org)
// Licença: CC BY 4.0 — https://github.com/STEPBible/STEPBible-Data
// Atribuição obrigatória: "Dados de STEPBible.org / Tyndale House Cambridge,
// Creative Commons Attribution 4.0 (CC BY 4.0)"
//
// Este script baixa (com cache local) os arquivos brutos TAHOT (hebraico) e
// TAGNT (grego) do repositório STEPBible-Data e gera arquivos TS por livro,
// no padrão lazy-load do projeto (um arquivo por trecho coberto, carregado
// sob demanda por src/data/biblia/stepbible/index.ts).
//
// ESCOPO DO PILOTO (ver relatório em src/data/biblia/stepbible/index.ts):
//   - Hebraico: Gênesis 1-3 (a partir de "TAHOT Gen-Deu")
//   - Grego: Evangelho de João completo (a partir de "TAGNT Mat-Jhn")
//
// Uso:
//   node scripts/import-stepbible.mjs
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

const SOURCES = {
  tahotGenDeu: {
    url: "https://raw.githubusercontent.com/STEPBible/STEPBible-Data/master/Translators%20Amalgamated%20OT%2BNT/TAHOT%20Gen-Deu%20-%20Translators%20Amalgamated%20Hebrew%20OT%20-%20STEPBible.org%20CC%20BY.txt",
    file: 'TAHOT_Gen-Deu.txt',
  },
  tagntMatJhn: {
    url: "https://raw.githubusercontent.com/STEPBible/STEPBible-Data/master/Translators%20Amalgamated%20OT%2BNT/TAGNT%20Mat-Jhn%20-%20Translators%20Amalgamated%20Greek%20NT%20-%20STEPBible.org%20CC-BY.txt",
    file: 'TAGNT_Mat-Jhn.txt',
  },
};

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

// ─────────────────────────────────────────────────────────────────────────
// Decodificador de morfologia hebraica (esquema OSHB/Westminster, usado
// pelo TAHOT). Referência: openscriptures.github.io/morphhb (CC BY 4.0).
// Cobre os casos mais comuns encontrados em Gênesis 1-3.
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

// ─────────────────────────────────────────────────────────────────────────
// Parser TAHOT (hebraico) — colunas: Ref&Type, Hebrew, Translit, Translation,
// dStrongs, Grammar, ...
// ─────────────────────────────────────────────────────────────────────────

function parseTahot(texto, livroFiltro, capitulosFiltro) {
  const linhas = texto.split(/\r?\n/);
  const porVersiculo = new Map(); // "cap:ver" -> [palavras]

  for (const linha of linhas) {
    if (!linha || linha.startsWith('Eng (Heb)')) continue;
    const ref = linha.slice(0, linha.indexOf('\t'));
    const m = ref.match(/^([A-Za-z]{3})\.(\d+)\.(\d+)#(\d+)/);
    if (!m) continue;
    const [, livroAbrevEn, capStr, verStr] = m;
    if (livroFiltro && livroAbrevEn !== livroFiltro) continue;
    const cap = Number(capStr);
    const ver = Number(verStr);
    if (capitulosFiltro && !capitulosFiltro.includes(cap)) continue;

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
      ref: `${livroAbrevEn}.${cap}.${ver}#${m[4]}`,
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
    const m = ref.match(/^([A-Za-z]{3})\.(\d+)\.(\d+)#(\d+)/);
    if (!m) continue;
    const [, livroAbrevEn, capStr, verStr] = m;
    if (livroFiltro && livroAbrevEn !== livroFiltro) continue;
    const cap = Number(capStr);
    const ver = Number(verStr);

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
      ref: `${livroAbrevEn}.${cap}.${ver}#${m[4]}`,
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
// PILOTO STEPBible-Data — gerado por scripts/import-stepbible.mjs
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

function gerarArquivoHebraico(porVersiculo, nomeExport) {
  const obj = {};
  for (const [chave, palavras] of [...porVersiculo.entries()].sort(compararChaves)) {
    obj[chave] = palavras;
  }
  return `${CABECALHO_ATRIBUICAO}
import type { PalavraStepBibleHebraico } from './types';

export const ${nomeExport}: Record<string, PalavraStepBibleHebraico[]> = ${JSON.stringify(obj, null, 0)};
`;
}

function gerarArquivoGrego(porVersiculo, nomeExport) {
  const obj = {};
  for (const [chave, palavras] of [...porVersiculo.entries()].sort(compararChaves)) {
    obj[chave] = palavras;
  }
  return `${CABECALHO_ATRIBUICAO}
import type { PalavraStepBibleGrego } from './types';

export const ${nomeExport}: Record<string, PalavraStepBibleGrego[]> = ${JSON.stringify(obj, null, 0)};
`;
}

function compararChaves(a, b) {
  const [ca, va] = a[0].split(':').map(Number);
  const [cb, vb] = b[0].split(':').map(Number);
  return ca - cb || va - vb;
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  console.log('\n=== Processando Gênesis 1-3 (TAHOT — hebraico) ===');
  const tahotTexto = await baixarComCache('tahotGenDeu');
  const genesis13 = parseTahot(tahotTexto, 'Gen', [1, 2, 3]);
  const totalPalavrasGn = [...genesis13.values()].reduce((n, l) => n + l.length, 0);
  console.log(`Versículos processados: ${genesis13.size}, palavras: ${totalPalavrasGn}`);
  fs.writeFileSync(
    path.join(OUT_DIR, 'genesis-1-3.ts'),
    gerarArquivoHebraico(genesis13, 'GENESIS_1_3_STEPBIBLE')
  );

  console.log('\n=== Processando Evangelho de João (TAGNT — grego) ===');
  const tagntTexto = await baixarComCache('tagntMatJhn');
  const joao = parseTagnt(tagntTexto, 'Jhn');
  const totalPalavrasJo = [...joao.values()].reduce((n, l) => n + l.length, 0);
  console.log(`Versículos processados: ${joao.size}, palavras: ${totalPalavrasJo}`);
  fs.writeFileSync(
    path.join(OUT_DIR, 'joao.ts'),
    gerarArquivoGrego(joao, 'JOAO_STEPBIBLE')
  );

  console.log('\nConcluído. Arquivos gerados em src/data/biblia/stepbible/.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
