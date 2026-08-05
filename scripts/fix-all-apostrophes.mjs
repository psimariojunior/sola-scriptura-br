import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const ROOT = join(import.meta.dirname, '..');

function fixFile(filePath, label) {
  let content = readFileSync(filePath, 'utf-8');
  let fixed = 0;
  
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Find the definicao field start
    const defIdx = line.indexOf("definicao: '");
    if (defIdx === -1) continue;
    
    const valueStart = defIdx + "definicao: '".length;
    
    // Find the actual end of the string by tracking escaped quotes
    let endIdx = -1;
    for (let j = valueStart; j < line.length; j++) {
      if (line[j] === '\\') {
        j++; // skip escaped character
        continue;
      }
      if (line[j] === "'") {
        endIdx = j;
        break;
      }
    }
    
    if (endIdx === -1) continue;
    
    const defContent = line.substring(valueStart, endIdx);
    
    // Check for unescaped apostrophes in the content
    let hasUnescaped = false;
    for (let j = 0; j < defContent.length; j++) {
      if (defContent[j] === '\\' && j + 1 < defContent.length) {
        j++; // skip escaped char
        continue;
      }
      if (defContent[j] === "'") {
        hasUnescaped = true;
        break;
      }
    }
    
    if (hasUnescaped) {
      // Rebuild the definition with escaped apostrophes
      let fixedDef = '';
      for (let j = 0; j < defContent.length; j++) {
        if (defContent[j] === '\\' && j + 1 < defContent.length) {
          fixedDef += defContent[j] + defContent[j+1];
          j++;
          continue;
        }
        if (defContent[j] === "'") {
          fixedDef += "\\'";
        } else {
          fixedDef += defContent[j];
        }
      }
      
      lines[i] = line.substring(0, defIdx) + "definicao: '" + fixedDef + "'" + line.substring(endIdx + 1);
      fixed++;
    }
  }
  
  writeFileSync(filePath, lines.join('\n'), 'utf-8');
  console.log(`${label}: ${fixed} apostrofes corrigidos`);
}

fixFile(join(ROOT, 'src', 'data', 'lexicon', 'hebraico.ts'), 'hebraico.ts');
fixFile(join(ROOT, 'src', 'data', 'lexicon', 'grego.ts'), 'grego.ts');
console.log('✅ Concluído!');
