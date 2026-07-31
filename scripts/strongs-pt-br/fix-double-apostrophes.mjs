import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const ROOT = join(import.meta.dirname, '..', '..');
const GREGO_FILE = join(ROOT, 'src', 'data', 'lexicon', 'grego.ts');

let content = readFileSync(GREGO_FILE, 'utf-8');

// Fix double apostrophes: definicaoResumida: 'text'' -> definicaoResumida: 'text'
content = content.replace(/definicaoResumida:\s*'([^']*)''/g, (match, def) => {
  return `definicaoResumida: '${def.replace(/'/g, "\\'")}'`;
});

writeFileSync(GREGO_FILE, content, 'utf-8');
console.log('Fixed double apostrophes');
