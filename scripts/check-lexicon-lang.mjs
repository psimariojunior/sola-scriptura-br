import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const heb = readFileSync(resolve(ROOT, 'src/data/lexicon/hebraico.ts'), 'utf8');
const greg = readFileSync(resolve(ROOT, 'src/data/lexicon/grego.ts'), 'utf8');

// Count entries with English-looking definitions
const hebLines = heb.split('\n');
const gregLines = greg.split('\n');

let hebEnglish = 0;
let hebPortuguese = 0;
let gregEnglish = 0;
let gregPortuguese = 0;

for (const line of hebLines) {
  const defMatch = line.match(/definicao:\s*"([^"]+)"/);
  if (defMatch) {
    const def = defMatch[1];
    // Check if it looks English (starts with lowercase, common English patterns)
    if (/^[a-z]+,?\s+[a-z]+/.test(def) && !def.includes('substantivo') && !def.includes('verbo') && !def.includes('adjetivo')) {
      hebEnglish++;
    } else {
      hebPortuguese++;
    }
  }
}

for (const line of gregLines) {
  const defMatch = line.match(/definicao:\s*'([^']+)'/);
  if (defMatch) {
    const def = defMatch[1];
    if (/^[a-z]+,?\s+[a-z]+/.test(def) && !def.includes('substantivo') && !def.includes('verbo') && !def.includes('adjetivo') && !def.includes('Amar')) {
      gregEnglish++;
    } else {
      gregPortuguese++;
    }
  }
}

console.log(`Hebraico: ${hebPortuguese} em portugues, ${hebEnglish} em ingles`);
console.log(`Grego: ${gregPortuguese} em portugues, ${gregEnglish} em ingles`);

// Sample some entries
const hebEntries = heb.match(/strong:\s*"H(\d+)"[^}]+/g) || [];
const gregEntries = greg.match(/strong:\s*'G(\d+)'[^}]+/g) || [];

console.log('\nAmostra hebraico (H200-H210):');
for (const e of hebEntries.slice(199, 210)) {
  const def = e.match(/definicao:\s*"([^"]+)"/);
  const strong = e.match(/strong:\s*"H(\d+)"/);
  console.log(`H${strong ? strong[1] : '?'}: ${def ? def[1].substring(0, 60) : 'N/A'}`);
}

console.log('\nAmostra grego (G200-G210):');
for (const e of gregEntries.slice(199, 210)) {
  const def = e.match(/definicao:\s*'([^']+)'/);
  const strong = e.match(/strong:\s*'G(\d+)'/);
  console.log(`G${strong ? strong[1] : '?'}: ${def ? def[1].substring(0, 60) : 'N/A'}`);
}
