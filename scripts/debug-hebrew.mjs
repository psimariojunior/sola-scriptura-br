import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const heb = readFileSync(resolve(ROOT, 'src/data/lexicon/hebraico.ts'), 'utf8');
const entries = heb.match(/strong:\s*"H\d+"[^}]+/g) || [];

console.log('Total entries:', entries.length);
console.log('Sample H1:', entries[0] ? entries[0].substring(0, 150) : 'N/A');
console.log('Sample H120:', entries[119] ? entries[119].substring(0, 150) : 'N/A');

// Check if mobile entries match
const hebMobile = JSON.parse(readFileSync(resolve(ROOT, 'mobile/assets/data/lexicon-hebraico.json'), 'utf8'));
console.log('\nMobile H1:', hebMobile.find(e => e.strong === 'H1'));
console.log('Mobile H120:', hebMobile.find(e => e.strong === 'H120'));
