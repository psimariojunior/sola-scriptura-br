import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const ROOT = join(import.meta.dirname, '..', '..');
const GLOSSES_FILE = join(import.meta.dirname, 'glosses_por.tsv');
const HEBRAICO_FILE = join(ROOT, 'src', 'data', 'lexicon', 'hebraico.ts');
const GREGO_FILE = join(ROOT, 'src', 'data', 'lexicon', 'grego.ts');

// Parse glosses TSV
function parseGlosses(filePath) {
  const content = readFileSync(filePath, 'utf-8');
  const lines = content.split('\n').filter(l => l && !l.startsWith('#'));
  const map = new Map();
  
  for (let i = 1; i < lines.length; i++) { // skip header
    const parts = lines[i].split('\t');
    if (parts.length >= 3) {
      const strong = parts[0].trim();
      const gloss = parts[2].trim();
      if (gloss) {
        // Normalize strong number: H0001 -> H1, G0001 -> G1
        const normalized = strong.replace(/^([HG])0+/, '$1');
        map.set(normalized, gloss);
      }
    }
  }
  return map;
}

// Update lexicon file
function updateLexicon(filePath, glossMap, prefix) {
  let content = readFileSync(filePath, 'utf-8');
  let updated = 0;
  let notFound = 0;
  
  // Match patterns like: definicao: "..." or definicao: '...'
  const regex = new RegExp(
    `(\\{[^}]*strong:\\s*"${prefix}(\\d+)"[^}]*definicao:\\s*)("[^"]*"|'[^']*')`,
    'g'
  );
  
  content = content.replace(regex, (match, before, numStr, defValue) => {
    const strongKey = `${prefix}${parseInt(numStr)}`;
    const gloss = glossMap.get(strongKey);
    
    if (gloss) {
      updated++;
      // Escape quotes in gloss
      const escaped = gloss.replace(/"/g, '\\"');
      return `${before}"${escaped}"`;
    } else {
      notFound++;
      return match;
    }
  });
  
  writeFileSync(filePath, content, 'utf-8');
  return { updated, notFound };
}

// Main
console.log('Carregando glosses em PT-BR...');
const glosses = parseGlosses(GLOSSES_FILE);
console.log(`  ${glosses.size} glosses carregados`);

// Count by prefix
let hebrewCount = 0, greekCount = 0;
for (const [key] of glosses) {
  if (key.startsWith('H')) hebrewCount++;
  else if (key.startsWith('G')) greekCount++;
}
console.log(`  ${hebrewCount} hebraicos, ${greekCount} gregos`);

console.log('\nAtualizando hebraico.ts...');
const heResult = updateLexicon(HEBRAICO_FILE, glosses, 'H');
console.log(`  ✓ ${heResult.updated} traduções aplicadas, ${heResult.notFound} sem gloss`);

console.log('\nAtualizando grego.ts...');
const grResult = updateLexicon(GREGO_FILE, glosses, 'G');
console.log(`  ✓ ${grResult.updated} traduções aplicadas, ${grResult.notFound} sem gloss`);

console.log('\n✅ Concluído!');
