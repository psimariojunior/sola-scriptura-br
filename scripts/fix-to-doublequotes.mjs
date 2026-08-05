import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const ROOT = join(import.meta.dirname, '..');

function fixFile(filePath, label) {
  let content = readFileSync(filePath, 'utf-8');
  let fixed = 0;
  
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Find definicao: ' and morfologia: patterns
    const defStart = line.indexOf("definicao: '");
    if (defStart === -1) continue;
    
    const morfIdx = line.indexOf("morfologia: ", defStart);
    if (morfIdx === -1) continue;
    
    // The closing quote of definicao is the last ' before morfologia:
    // Walk backwards from morfIdx to find the closing '
    let closingIdx = -1;
    for (let j = morfIdx - 1; j > defStart; j--) {
      if (line[j] === "'") {
        closingIdx = j;
        break;
      }
    }
    
    if (closingIdx === -1) continue;
    
    const valueStart = defStart + "definicao: '".length;
    let defContent = line.substring(valueStart, closingIdx);
    
    // Unescape any existing escaped apostrophes
    defContent = defContent.replace(/\\'/g, "'");
    
    // Escape any double quotes in the content
    defContent = defContent.replace(/"/g, '\\"');
    
    // Replace single-quoted with double-quoted
    lines[i] = line.substring(0, defStart) + 'definicao: "' + defContent + '"' + line.substring(closingIdx + 1);
    fixed++;
  }
  
  writeFileSync(filePath, lines.join('\n'), 'utf-8');
  console.log(`${label}: ${fixed} strings convertidas`);
}

fixFile(join(ROOT, 'src', 'data', 'lexicon', 'hebraico.ts'), 'hebraico.ts');
fixFile(join(ROOT, 'src', 'data', 'lexicon', 'grego.ts'), 'grego.ts');
console.log('✅ Concluído!');
