#!/usr/bin/env node
/**
 * fix-hebrew-quotes-v2.mjs
 * 
 * Corrige aspas simples dentro das definições do léxico hebraico.
 * Abordagem: processar cada linha caractere por caractere.
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const lexiconPath = resolve(ROOT, 'src/data/lexicon/hebraico.ts');
const raw = readFileSync(lexiconPath, 'utf8');
const lines = raw.split('\n');

let corrigidas = 0;
const output = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  // Verificar se é uma linha de entrada com definicao
  if (!line.includes("definicao: '")) {
    output.push(line);
    continue;
  }
  
  // Encontrar onde começa o valor da definição
  const defStart = line.indexOf("definicao: '") + "definicao: '".length;
  
  // Encontrar onde termina - procurar por ', morfologia ou ', frequencia
  let defEnd = -1;
  const morfIdx = line.indexOf("', morfologia:", defStart);
  const freqIdx = line.indexOf("', frequencia:", defStart);
  
  if (morfIdx > 0) defEnd = morfIdx;
  else if (freqIdx > 0) defEnd = freqIdx;
  
  if (defEnd < 0) {
    output.push(line);
    continue;
  }
  
  // Extrair partes
  const before = line.substring(0, defStart);
  const defContent = line.substring(defStart, defEnd);
  const after = line.substring(defEnd);
  
  // Verificar se tem aspas simples no conteúdo
  if (defContent.includes("'")) {
    const fixed = defContent.replace(/'/g, "\\'");
    output.push(before + fixed + after);
    corrigidas++;
  } else {
    output.push(line);
  }
}

writeFileSync(lexiconPath, output.join('\n'), 'utf8');
console.log(`✅ Linhas corrigidas: ${corrigidas}`);
