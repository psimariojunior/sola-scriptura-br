import { readFileSync } from 'fs';
import { join } from 'path';

const ROOT = join(import.meta.dirname, '..', '..');
const raw = readFileSync(join(ROOT, 'src', 'data', 'lexicon', 'grego.ts'), 'utf-8');

// Count how many Greek lemmas have Greek chars
const re = /palavra:\s*'([^']+)'/g;
let m;
const lemmas = new Set();
while ((m = re.exec(raw))) {
  lemmas.add(m[1]);
}

// Sample some lemmas to check format
const sample = [...lemmas].slice(0, 20);
console.log('Sample lemmas:', sample);
console.log('Total unique lemmas:', lemmas.size);

// Check MorphGNT lemma format
const morphgnt = readFileSync(join(ROOT, 'scripts', 'strongs-pt-br', 'morphgnt', '61-Mt-morphgnt.txt'), 'utf-8');
const mgnLines = morphgnt.trim().split('\n').slice(0, 20);
const mgnLemmas = mgnLines.map(l => l.split(/\s+/)[6]);
console.log('MorphGNT lemmas:', mgnLemmas);

// Check how many match
let matchCount = 0;
let noMatchCount = 0;
const allMorphLines = morphgnt.trim().split('\n');
for (const line of allMorphLines) {
  const parts = line.split(/\s+/);
  if (parts.length < 7) continue;
  const lemma = parts[6];
  if (lemmas.has(lemma)) {
    matchCount++;
  } else {
    noMatchCount++;
  }
}
console.log(`\nMatthew: ${matchCount} match, ${noMatchCount} no match (${(matchCount/(matchCount+noMatchCount)*100).toFixed(1)}%)`);
