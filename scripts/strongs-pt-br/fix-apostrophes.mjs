import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const ROOT = join(import.meta.dirname, '..', '..');
const GREGO_FILE = join(ROOT, 'src', 'data', 'lexicon', 'grego.ts');

let content = readFileSync(GREGO_FILE, 'utf-8');
let fixCount = 0;

// Fix pattern: definicaoResumida: 'text'text...' -> definicaoResumida: 'text'
// This happens when the auto-generated short def contains an apostrophe
const lines = content.split('\n');

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  // Check if definicaoResumida has unescaped apostrophe breaking the string
  const match = line.match(/definicaoResumida:\s*'([^']*)'([^',\s{])/);
  if (match) {
    // The good part is before the first closing quote, bad part after
    const goodPart = match[1];
    // Rebuild: take only up to the first closing quote
    lines[i] = line.replace(
      /definicaoResumida:\s*'[^']*'[^',\s{][^']*/g,
      `definicaoResumida: '${goodPart.replace(/'/g, "\\'")}'`
    );
    fixCount++;
  }
  
  // Fix pattern: definicaoResumida: 'text'...' (ends with '...)
  const match2 = lines[i].match(/definicaoResumida:\s*'([^']*)'\.\.\.'/);
  if (match2) {
    lines[i] = lines[i].replace(
      /definicaoResumida:\s*'[^']*'\.\.\.'/g,
      `definicaoResumida: '${match2[1].replace(/'/g, "\\'")}'`
    );
    fixCount++;
  }
}

content = lines.join('\n');
writeFileSync(GREGO_FILE, content, 'utf-8');

console.log(`Fixed ${fixCount} broken definicaoResumida strings`);
