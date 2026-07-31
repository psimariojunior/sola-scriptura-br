import { readFileSync } from 'fs';
import { join } from 'path';

const ROOT = join(import.meta.dirname, '..', '..');
const raw = readFileSync(join(ROOT, 'src', 'data', 'lexicon', 'grego.ts'), 'utf-8');

const re = /palavra:\s*'([^']+)'/g;
let m;
const lemmas = new Set();
while ((m = re.exec(raw))) {
  lemmas.add(m[1]);
}

// Check unmatched lemmas in Matthew
const morphgnt = readFileSync(join(ROOT, 'scripts', 'strongs-pt-br', 'morphgnt', '61-Mt-morphgnt.txt'), 'utf-8');
const lines = morphgnt.trim().split('\n');
const unmatched = new Set();
for (const line of lines) {
  const parts = line.split(/\s+/);
  if (parts.length < 7) continue;
  const lemma = parts[6];
  if (!lemmas.has(lemma)) {
    unmatched.add(lemma);
  }
}

console.log('Unmatched unique lemmas:', unmatched.size);
console.log('Sample unmatched:', [...unmatched].slice(0, 30));

// Try to find close matches
for (const um of [...unmatched].slice(0, 10)) {
  const candidates = [...lemmas].filter(l => {
    // Strip accents for comparison
    const normalize = s => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    return normalize(l) === normalize(um);
  });
  if (candidates.length > 0) {
    console.log(`  "${um}" -> possible: ${candidates.join(', ')}`);
  } else {
    console.log(`  "${um}" -> no close match`);
  }
}
