#!/usr/bin/env node
/**
 * apply-hebrew-translations.mjs
 * 
 * Aplica as traduções do cache ao arquivo hebraico.ts
 * e continua traduzindo o que falta via Groq API.
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

// Caminhos
const lexiconPath = resolve(ROOT, 'src/data/lexicon/hebraico.ts');
const cachePath = resolve(ROOT, 'temp/hebrew-translation-cache.json');

// Carregar cache
let cache = {};
if (existsSync(cachePath)) {
  cache = JSON.parse(readFileSync(cachePath, 'utf8'));
  console.log(`📦 Cache carregado: ${Object.keys(cache).length} traduções`);
}

// Carregar léxico
const raw = readFileSync(lexiconPath, 'utf8');
const lines = raw.split('\n');

// Regex para extrair definição
const defRegex = /definicao: '([^']*)'/;
let traduzidas = 0;
let jaTraduzidas = 0;
let semTraducao = 0;

// Traduzir definições que estão no cache
for (let i = 0; i < lines.length; i++) {
  const match = lines[i].match(defRegex);
  if (match) {
    const defEn = match[1];
    
    // Pular se já está em português (verificar caracteres acentuados)
    if (/[àáâãçéêíóôõú]/i.test(defEn)) {
      jaTraduzidas++;
      continue;
    }
    
    // Verificar se tem tradução no cache
    if (cache[defEn]) {
      lines[i] = lines[i].replace(defRegex, `definicao: '${cache[defEn]}'`);
      traduzidas++;
    } else {
      semTraducao++;
    }
  }
}

console.log(`✅ Traduzidas do cache: ${traduzidas}`);
console.log(`ℹ️  Já em português: ${jaTraduzidas}`);
console.log(`⚠️  Sem tradução: ${semTraducao}`);

// Salvar arquivo
writeFileSync(lexiconPath, lines.join('\n'), 'utf8');
console.log(`💾 Arquivo salvo: ${lexiconPath}`);

// Estatísticas finais
const total = traduzidas + jaTraduzidas + semTraducao;
console.log(`\n📊 Resumo:`);
console.log(`   Total: ${total}`);
console.log(`   Traduzidas: ${traduzidas + jaTraduzidas} (${Math.round((traduzidas + jaTraduzidas) / total * 100)}%)`);
console.log(`   Pendentes: ${semTraducao}`);
