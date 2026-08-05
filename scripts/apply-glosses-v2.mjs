import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const ROOT = join(import.meta.dirname, '..');
const GLOSSES_FILE = join(ROOT, 'scripts', 'strongs-pt-br', 'glosses_por.tsv');
const HEBRAICO_FILE = join(ROOT, 'src', 'data', 'lexicon', 'hebraico.ts');
const GREGO_FILE = join(ROOT, 'src', 'data', 'lexicon', 'grego.ts');

function parseGlosses(filePath) {
  const content = readFileSync(filePath, 'utf-8');
  const lines = content.split('\n').filter(l => l && !l.startsWith('#'));
  const map = new Map();
  for (let i = 1; i < lines.length; i++) {
    const parts = lines[i].split('\t');
    if (parts.length >= 3) {
      const strong = parts[0].trim();
      const gloss = parts[2].trim();
      if (gloss) {
        const normalized = strong.replace(/^([HG])0+/, '$1');
        map.set(normalized, gloss);
      }
    }
  }
  return map;
}

function applyGlosses(filePath, glossMap, prefix) {
  const lines = readFileSync(filePath, 'utf-8').split('\n');
  let updated = 0;
  let skipped = 0;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Match: strong: 'H123' or strong: "H123"
    const strongMatch = line.match(/strong:\s*['"]([\w]+)['"]/);
    if (!strongMatch) continue;
    
    const strongNum = strongMatch[1];
    const gloss = glossMap.get(strongNum);
    if (!gloss) { skipped++; continue; }
    
    // Check if definition already looks like clean PT-BR (not English)
    const defMatch = line.match(/definicao:\s*['"]([^'"]+)['"]/);
    if (defMatch) {
      const existingDef = defMatch[1];
      // If definition is short PT already (no common English words), skip
      const englishWords = /\b(de|the|and|or|of|to|in|a|an|is|are|was|were|for|with|from|by|that|this|it|not|be|have|has|had|do|does|did|will|would|can|could|should|shall|may|might|but|if|when|which|who|whom|whose|where|how|what)\b/i;
      if (existingDef.length < 50 && !englishWords.test(existingDef)) {
        skipped++;
        continue;
      }
    }
    
    // Replace the definition field
    const escaped = gloss.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
    lines[i] = line.replace(
      /(definicao:\s*['"])[^'"]*(['"])/,
      `$1${escaped}$2`
    );
    updated++;
  }
  
  writeFileSync(filePath, lines.join('\n'), 'utf-8');
  return { updated, skipped };
}

console.log('Carregando glosses PT-BR...');
const glosses = parseGlosses(GLOSSES_FILE);
let hebrewG = 0, greekG = 0;
for (const [k] of glosses) {
  if (k.startsWith('H')) hebrewG++;
  else if (k.startsWith('G')) greekG++;
}
console.log(`  ${glosses.size} glosses (${hebrewG} hebraicos, ${greekG} gregos)`);

console.log('\nAplicando glosses ao hebraico.ts...');
const heResult = applyGlosses(HEBRAICO_FILE, glosses, 'H');
console.log(`  ✓ ${heResult.updated} traduzidos, ${heResult.skipped} já em PT`);

console.log('\nAplicando glosses ao grego.ts...');
const grResult = applyGlosses(GREGO_FILE, glosses, 'G');
console.log(`  ✓ ${grResult.updated} traduzidos, ${grResult.skipped} já em PT`);

console.log('\n✅ Concluído!');
