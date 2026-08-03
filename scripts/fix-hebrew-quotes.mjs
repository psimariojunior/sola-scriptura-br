#!/usr/bin/env node
/**
 * fix-hebrew-quotes.mjs
 * 
 * Corrige aspas simples dentro das definições do léxico hebraico.
 * Substitui ' por \' dentro das strings de definição.
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

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  // Verificar se é uma linha de entrada (contém definicao: '...')
  if (line.includes("definicao: '")) {
    // Extrair o início e fim da linha
    const startMatch = line.match(/^(\s*\{[^}]*definicao: ')(.*)/);
    if (startMatch) {
      const prefix = startMatch[1];
      let rest = startMatch[2];
      
      // Encontrar o fim da definição (', morfologia ou ', frequencia)
      const endMatch = rest.match(/^([^']*)',\s*(morfologia|frequencia)/);
      if (endMatch) {
        const defContent = endMatch[1];
        const suffix = rest.substring(endMatch[0].length);
        
        // Escapar aspas simples dentro da definição
        const fixedDef = defContent.replace(/'/g, "\\'");
        
        // Reconstruir a linha
        lines[i] = prefix + fixedDef + "', " + suffix;
        corrigidas++;
      }
    }
  }
}

writeFileSync(lexiconPath, lines.join('\n'), 'utf8');
console.log(`✅ Linhas corrigidas: ${corrigidas}`);
