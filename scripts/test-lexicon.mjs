import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const heb = readFileSync(resolve(ROOT, 'src/data/lexicon/hebraico.ts'), 'utf8');
const greg = readFileSync(resolve(ROOT, 'src/data/lexicon/grego.ts'), 'utf8');

// Check first Hebrew entry with H1
const hebH1 = heb.match(/strong:\s*"H1"[^}]+/);
console.log('Hebraico H1:', hebH1 ? hebH1[0].substring(0, 200) : 'NOT FOUND');

// Check first Greek entry with G1  
const gregG1 = greg.match(/strong:\s*'G1'[^}]+/);
console.log('Grego G1:', gregG1 ? gregG1[0].substring(0, 200) : 'NOT FOUND');

// Check what the mobile entries look like
const hebMobile = JSON.parse(readFileSync(resolve(ROOT, 'mobile/assets/data/lexicon-hebraico.json'), 'utf8'));
const gregMobile = JSON.parse(readFileSync(resolve(ROOT, 'mobile/assets/data/lexicon-grego.json'), 'utf8'));

console.log('\nMobile H1:', JSON.stringify(hebMobile.find(e => e.strong === 'H1')));
console.log('Mobile G1:', JSON.stringify(gregMobile.find(e => e.strong === 'G1')));
