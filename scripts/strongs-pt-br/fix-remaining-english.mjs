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

// Check if definition is in English
function isEnglishDefinition(def) {
  if (!def || def.length < 3) return false;
  
  const englishPatterns = [
    /\b(to|the|and|of|in|for|is|a|an|or|but)\b/i,
    /\b(properly|figuratively|implication|literally|metaphorically)\b/i,
    /\b(doing|work|being|having|making|taking|giving|going|coming)\b/i,
    /\b(well|good|bad|great|small|large|long|short)\b/i,
  ];
  
  return englishPatterns.some(p => p.test(def));
}

// Update grego.ts with Greek definitions
function updateGrego(filePath, definitionsMap) {
  let content = readFileSync(filePath, 'utf-8');
  let updated = 0;
  let alreadyGood = 0;
  let englishFound = 0;
  
  // Split by lines and process each line
  const lines = content.split('\n');
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Match line with strong and definicao
    const strongMatch = line.match(/strong:\s*'G(\d+)'/);
    if (!strongMatch) continue;
    
    const numStr = strongMatch[1];
    const strongKey = `G${numStr}`;
    
    // Match definicao field
    const defMatch = line.match(/definicao:\s*'([^']*(?:\\.[^']*)*)'/);
    if (!defMatch) continue;
    
    const currentDef = defMatch[1];
    
    // Check if definition is in English
    if (isEnglishDefinition(currentDef)) {
      englishFound++;
      
      // Get Portuguese definition from bereia
      const newDef = definitionsMap.get(strongKey);
      
      if (newDef && !isEnglishDefinition(newDef)) {
        // Replace the definition
        const escaped = newDef.replace(/'/g, "\\'");
        lines[i] = line.replace(
          /definicao:\s*'[^']*(?:\\.[^']*)*'/,
          `definicao: '${escaped}'`
        );
        updated++;
        console.log(`  G${numStr}: "${currentDef}" -> "${newDef}"`);
      }
    } else {
      alreadyGood++;
    }
  }
  
  writeFileSync(filePath, lines.join('\n'), 'utf-8');
  return { updated, alreadyGood, englishFound };
}

// Main
console.log('Carregando dicionário grego PT-BR do bereia...');
const greekDefs = parseBereiaDictionary(BEREIA_FILE);
console.log(`  ${greekDefs.size} definições gregas carregadas`);

console.log('\nCorrigindo definições restantes em inglês no grego.ts...');
const result = updateGrego(GREGO_FILE, greekDefs);
console.log(`\n  ✓ ${result.updated} definições corrigidas`);
console.log(`  ✓ ${result.alreadyGood} já estavam em PT-BR`);
console.log(`  ⚠ ${result.englishFound} definições em inglês encontradas`);

console.log('\n✅ Concluído!');
