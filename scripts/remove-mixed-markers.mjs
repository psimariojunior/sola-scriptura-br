#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const hebPath = resolve(ROOT, 'src/data/lexicon/hebraico.ts');
let hebContent = readFileSync(hebPath, 'utf8');

// Remover todas as marcacoes [MISTURADO] e [traduzir]
let removidos = 0;
hebContent = hebContent.replace(/\[MISTURADO\]\s*/g, () => { removidos++; return ''; });
hebContent = hebContent.replace(/\[traduzir\]\s*/g, () => { removidos++; return ''; });

writeFileSync(hebPath, hebContent, 'utf8');
console.log(`✅ ${removidos} marcacoes removidas`);
