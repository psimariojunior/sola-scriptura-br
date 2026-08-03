import { readFileSync, writeFileSync } from 'fs';

const ACENTOS_PT = /[àáâãçéêíóôõúû]/i;
const ENGLISH_WORDS = /\bthe\b|\band\b|\bhave\b|\bwith\b|\bthis\b|\bfrom\b|\bthey\b|\bbeen\b|\bsaid\b|\bthat\b|\bwhich\b|\bfor\b|\bnot\b|\bwas\b|\bare\b|\bhis\b|\bher\b|\bour\b|\byou\b|\bwill\b|\bshall\b|\bunto\b|\bdoth\b|\bcometh\b|\bthereof\b/i;

const content = readFileSync('src/data/comentarios.ts', 'utf-8');
const lines = content.split('\n');
const kept = [];
let removed = 0;

for (const line of lines) {
  const trimmed = line.trim();
  if (trimmed.startsWith('add(')) {
    if (ACENTOS_PT.test(trimmed)) {
      kept.push(line);
    } else if (ENGLISH_WORDS.test(trimmed)) {
      removed++;
    } else {
      kept.push(line);
    }
  } else {
    kept.push(line);
  }
}

writeFileSync('src/data/comentarios.ts', kept.join('\n'), 'utf-8');

let total = 0;
for (const l of kept) {
  if (l.trim().startsWith('add(')) total++;
}
console.log(`Removidos ${removed} comentarios em ingles`);
console.log(`Mantidos ${total} comentarios em PT-BR`);
