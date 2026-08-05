import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const ROOT = join(import.meta.dirname, '..');

function fixFile(filePath, label) {
  const content = readFileSync(filePath, 'utf-8');
  
  // Fix unescaped single quotes inside single-quoted strings
  // Pattern: definicao: '...unescaped '...'...'
  // Strategy: find all definicao values and escape internal apostrophes
  
  let fixed = 0;
  
  // Match definicao: '...' where the content may contain unescaped apostrophes
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Find definicao field with single quotes
    const match = line.match(/(definicao:\s*')([^']*)'/);
    if (match) {
      const def = match[2];
      // Check if the def itself contains apostrophes (not escaped ones)
      if (def.includes("'") && !def.includes("\\'")) {
        // Escape all apostrophes in the definition
        const fixedDef = def.replace(/'/g, "\\'");
        lines[i] = line.replace(match[0], `${match[1]}${fixedDef}'`);
        fixed++;
      }
    }
    
    // Also check for double-quoted definitions with issues
    const matchD = line.match(/(definicao:\s*")([^"]*)"/);
    if (matchD) {
      const def = matchD[2];
      if (def.includes('"') && !def.includes('\\"')) {
        const fixedDef = def.replace(/"/g, '\\"');
        lines[i] = line.replace(matchD[0], `${matchD[1]}${fixedDef}"`);
        fixed++;
      }
    }
  }
  
  writeFileSync(filePath, lines.join('\n'), 'utf-8');
  console.log(`${label}: ${fixed} strings corrigidas`);
}

fixFile(join(ROOT, 'src', 'data', 'lexicon', 'hebraico.ts'), 'hebraico.ts');
fixFile(join(ROOT, 'src', 'data', 'lexicon', 'grego.ts'), 'grego.ts');
console.log('✅ Concluído!');
