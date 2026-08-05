import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const ROOT = join(import.meta.dirname, '..');

function fixFile(filePath, label) {
  let content = readFileSync(filePath, 'utf-8');
  
  // Strategy: convert all definicao: '...' to definicao: "..."
  // This avoids issues with apostrophes inside definitions
  
  let fixed = 0;
  
  // Match definicao: '...' (single-quoted)
  content = content.replace(/(definicao:\s*)'((?:[^'\\]|\\.)*)'/g, (match, prefix, def) => {
    // Check if definition contains unescaped apostrophes
    if (def.includes("'")) {
      fixed++;
      // Escape any double quotes in the definition
      const escaped = def.replace(/"/g, '\\"');
      return `${prefix}"${escaped}"`;
    }
    return match;
  });
  
  writeFileSync(filePath, content, 'utf-8');
  console.log(`${label}: ${fixed} strings convertidas para double-quote`);
}

fixFile(join(ROOT, 'src', 'data', 'lexicon', 'hebraico.ts'), 'hebraico.ts');
fixFile(join(ROOT, 'src', 'data', 'lexicon', 'grego.ts'), 'grego.ts');
console.log('✅ Concluído!');
