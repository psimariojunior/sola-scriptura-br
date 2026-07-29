#!/usr/bin/env node
/**
 * translate-hebrew-lexicon.mjs
 *
 * Traduz o lexico hebraico para portugues usando:
 * 1. mobile/assets/data/lexicon-hebraico.json (210 entradas PT)
 * 2. src/data/biblia/strong/index.ts (216 Strong numbers com morfologia PT)
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

// ─── 1. Carregar fontes de dados ─────────────────────────────────────────────

const hebMobile = JSON.parse(readFileSync(resolve(ROOT, 'mobile/assets/data/lexicon-hebraico.json'), 'utf8'));
const mobilePtMap = new Map();
for (const e of hebMobile) {
  if (e.morfologia) {
    mobilePtMap.set(e.strong, e.morfologia);
  }
}

const strongContent = readFileSync(resolve(ROOT, 'src/data/biblia/strong/index.ts'), 'utf8');
const strongPtMap = new Map();
const strongRegex = /strong:\s*'(H\d+)'[^}]*?morfologia:\s*'([^']+)'/g;
let m;
while ((m = strongRegex.exec(strongContent)) !== null) {
  if (!strongPtMap.has(m[1])) {
    strongPtMap.set(m[1], m[2]);
  }
}

console.log(`📱 Mobile PT: ${mobilePtMap.size} entradas`);
console.log(`📖 Strong PT: ${strongPtMap.size} entradas`);

// ─── 2. Atualizar hebraico.ts ────────────────────────────────────────────────

const hebPath = resolve(ROOT, 'src/data/lexicon/hebraico.ts');
let hebContent = readFileSync(hebPath, 'utf8');

let atualizados = 0;
let jaPortugues = 0;

// Processar cada entrada
const hebEntries = hebContent.match(/strong:\s*"H\d+"[^}]+/g) || [];
console.log(`📝 Total entradas hebraicas: ${hebEntries.length}`);

for (const entry of hebEntries) {
  const strongMatch = entry.match(/strong:\s*"(H\d+)"/);
  if (!strongMatch) continue;
  
  const strong = strongMatch[1];
  const defMatch = entry.match(/definicao:\s*"([^"]+)"/);
  if (!defMatch) continue;
  
  const definicaoAtual = defMatch[1];
  
  // Verificar se ja esta em portugues
  if (/[àáâãéêíóôõúç]/i.test(definicaoAtual) || 
      /^(substantivo|verbo|adjetivo|advérbio|preposição|conjunção|pronome|numeral|partícula|interjeição)/i.test(definicaoAtual)) {
    jaPortugues++;
    continue;
  }
  
  // Tentar obter traducao das fontes
  let novaDefinicao = null;
  
  // 1. Mobile JSON
  if (mobilePtMap.has(strong)) {
    novaDefinicao = mobilePtMap.get(strong);
  }
  
  // 2. Strong/index.ts
  if (!novaDefinicao && strongPtMap.has(strong)) {
    novaDefinicao = strongPtMap.get(strong);
  }
  
  if (novaDefinicao && novaDefinicao !== definicaoAtual) {
    // Substituir no arquivo
    const escapedDef = definicaoAtual.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(strong:\\s*"${strong.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[^}]*?definicao:\\s*)"${escapedDef}"`);
    hebContent = hebContent.replace(regex, `$1"${novaDefinicao.replace(/"/g, '\\"')}"`);
    atualizados++;
  }
}

writeFileSync(hebPath, hebContent, 'utf8');

console.log(`\n📊 Resultado:`);
console.log(`  - Ja em portugues: ${jaPortugues}`);
console.log(`  - Traduzidos via fontes: ${atualizados}`);
console.log(`  - Ainda em ingles: ${hebEntries.length - jaPortugues - atualizados}`);
