import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const ROOT = join(import.meta.dirname, '..', '..');
const BEREIA_FILE = join(import.meta.dirname, 'strongsg_bereia.js');
const GREGO_FILE = join(ROOT, 'src', 'data', 'lexicon', 'grego.ts');

// Parse bereia dictionary
function parseBereiaDictionary(filePath) {
  const content = readFileSync(filePath, 'utf-8');
  
  // Extract the JSON object from the JS file
  const match = content.match(/var strongsGreekDictionary\s*=\s*(\{[\s\S]*?\});/);
  if (!match) {
    console.error('Could not find strongsGreekDictionary in file');
    return new Map();
  }
  
  // Parse JSON
  const dict = JSON.parse(match[1]);
  const map = new Map();
  
  for (const [key, value] of Object.entries(dict)) {
    // Normalize key: "G1615" -> "G1615"
    const strong = key.startsWith('G') ? key : `G${key}`;
    
    // Get the best definition (prefer strongs_def, fallback to kjv_def)
    let definition = value.strongs_def || value.kjv_def || '';
    definition = definition.trim();
    
    if (definition) {
      map.set(strong, definition);
    }
  }
  
  return map;
}

// Update grego.ts with Greek definitions
function updateGrego(filePath, definitionsMap) {
  let content = readFileSync(filePath, 'utf-8');
  let updated = 0;
  let alreadyGood = 0;
  let notFound = 0;
  
  // Match patterns like: definicao: '...' or definicao: "..."
  const regex = /(\{[^}]*strong:\s*'G(\d+)'[^}]*definicao:\s*)('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*")/g;
  
  content = content.replace(regex, (match, before, numStr, defValue) => {
    const strongKey = `G${numStr}`;
    const newDef = definitionsMap.get(strongKey);
    
    if (!newDef) {
      notFound++;
      return match;
    }
    
    // Check if current definition is already in Portuguese (not English)
    const currentDef = defValue.slice(1, -1); // Remove quotes
    const hasEnglishWords = /\b(to|the|and|of|in|for|is|a|an|properly|figuratively|implication)\b/.test(currentDef);
    
    if (!hasEnglishWords && currentDef.length > 10) {
      // Definition seems to be already in Portuguese
      alreadyGood++;
      return match;
    }
    
    // Escape quotes in new definition
    const escaped = newDef.replace(/'/g, "\\'");
    updated++;
    return `${before}'${escaped}'`;
  });
  
  writeFileSync(filePath, content, 'utf-8');
  return { updated, alreadyGood, notFound };
}

// Main
console.log('Carregando dicionário grego PT-BR do bereia...');
const greekDefs = parseBereiaDictionary(BEREIA_FILE);
console.log(`  ${greekDefs.size} definições gregas carregadas`);

console.log('\nAtualizando grego.ts...');
const result = updateGrego(GREGO_FILE, greekDefs);
console.log(`  ✓ ${result.updated} definições atualizadas`);
console.log(`  ✓ ${result.alreadyGood} já estavam em PT-BR`);
console.log(`  ℹ ${result.notFound} sem definição no bereia`);

console.log('\n✅ Concluído!');
