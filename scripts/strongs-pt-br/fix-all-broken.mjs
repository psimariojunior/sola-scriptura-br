import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const ROOT = join(import.meta.dirname, '..', '..');
const GREGO_FILE = join(ROOT, 'src', 'data', 'lexicon', 'grego.ts');

let content = readFileSync(GREGO_FILE, 'utf-8');
let fixCount = 0;

// Fix all definicaoResumida that end with \' (escaped apostrophe) without closing quote
// Pattern: definicaoResumida: 'text\', -> needs to become definicaoResumida: 'translated text',
const fixes = {
  "'também deon deh-on\\'": "'dons, talentos'",
  "'aquittal (para Cristo\\'": "'justificação (por Cristo)'",
  "'tomar into um\\'": "'receber em favor'",
  "'frightened out de um\\'": "'assustado fora de si'",
  "'tomar em um\\'": "'tomar nos braços'",
  "'(butcher\\'": "'(carne de açougueiro)'",
  "'cheirar (geralmente um \\'": "'cheirar mal'",
  "'(especiumlmente), pumrum lumy um\\'": "'especialmente, passar perto'",
  "'para endure um\\'": "'endurecer os costumes'",
  "'para admit under um\\'": "'admitir sob o teto'",
};

for (const [oldVal, newVal] of Object.entries(fixes)) {
  if (content.includes(oldVal)) {
    content = content.replace(oldVal, newVal);
    fixCount++;
  }
}

writeFileSync(GREGO_FILE, content, 'utf-8');
console.log(`Fixed ${fixCount} broken definicaoResumida strings`);
