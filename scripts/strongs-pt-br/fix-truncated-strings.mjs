import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const ROOT = join(import.meta.dirname, '..', '..');
const GREGO_FILE = join(ROOT, 'src', 'data', 'lexicon', 'grego.ts');

let content = readFileSync(GREGO_FILE, 'utf-8');
let fixCount = 0;

// Fix broken definicaoResumida where escaped apostrophe truncated the string
// Pattern: definicaoResumida: 'text\'  (ends with escaped apostrophe, no closing quote)
const lines = content.split('\n');

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  // Check if definicaoResumida ends with \' without closing '
  const match = line.match(/definicaoResumida:\s*'([^']*(?:\\.[^']*)*)\\'$/);
  if (match) {
    // This line is broken - the string ends with \' and no closing quote before ,
    // We need to find the full definition from the definicao field
    const defMatch = line.match(/definicao:\s*'([^']*(?:\\.[^']*)*)'/);
    if (defMatch) {
      const longDef = defMatch[1];
      // Take first 80 chars as short def
      let shortDef = longDef.split('.')[0];
      if (shortDef.length > 80) shortDef = shortDef.substring(0, 77) + '...';
      shortDef = shortDef.trim();
      if (shortDef.endsWith(',')) shortDef = shortDef.slice(0, -1);
      
      // Replace the broken definicaoResumida
      lines[i] = line.replace(
        /definicaoResumida:\s*'[^']*(?:\\.[^']*)*'$/,
        `definicaoResumida: '${shortDef.replace(/'/g, "\\'")}'`
      );
      fixCount++;
    }
  }
  
  // Also fix: definicaoResumida: 'text' (truncated, no closing quote before categoria)
  const match2 = line.match(/definicaoResumida:\s*'([^']*(?:\\.[^']*)*)',\s*categoria/);
  // This is actually valid - the comma closes it. Skip this.
}

content = lines.join('\n');
writeFileSync(GREGO_FILE, content, 'utf-8');

console.log(`Fixed ${fixCount} broken definicaoResumida strings`);
