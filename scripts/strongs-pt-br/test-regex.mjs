import { readFileSync } from 'fs';
import { join } from 'path';

const ROOT = join(import.meta.dirname, '..', '..');
const raw = readFileSync(join(ROOT, 'src', 'data', 'lexicon', 'grego.ts'), 'utf-8');

const re = /\{\s*strong:\s*['"]G(\d+)['"].*?palavra:\s*'([^']*)'/gs;
let m;
let count = 0;
while ((m = re.exec(raw))) {
  count++;
  if (count <= 5) {
    console.log(`Match ${count}: G${m[1]} -> "${m[2]}"`);
  }
}
console.log(`Total matches: ${count}`);
