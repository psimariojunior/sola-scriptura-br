import { readFileSync, writeFileSync } from 'fs';

const content = readFileSync('src/data/comentarios.ts', 'utf-8');
const lines = content.split('\n');

const kept = [];
let removed = 0;
let totalMatthew = 0;

for (const line of lines) {
  const trimmed = line.trim();
  if (trimmed.startsWith("add(") && trimmed.includes("'Matthew Henry'")) {
    totalMatthew++;
    // Keep only the Portuguese entry (contains Portuguese-specific chars like ã, é, ç, etc.)
    const isPortuguese = /[àáâãçéêíóôõúû]/i.test(trimmed);
    if (isPortuguese) {
      kept.push(line);
    } else {
      removed++;
    }
  } else {
    kept.push(line);
  }
}

writeFileSync('src/data/comentarios.ts', kept.join('\n'), 'utf-8');
console.log(`Total Matthew Henry entries: ${totalMatthew}`);
console.log(`Removed English entries: ${removed}`);
console.log(`Kept Portuguese entries: ${totalMatthew - removed}`);
console.log(`File updated.`);
