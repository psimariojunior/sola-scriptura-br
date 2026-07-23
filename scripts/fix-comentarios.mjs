import { readFileSync, writeFileSync } from 'fs';

// Fix mojibake in comentariosExpandidosNovos.ts
const FILE = 'C:\\Sola Scriptura BR\\src\\data\\comentariosExpandidosNovos.ts';
let buf = readFileSync(FILE);

console.log('Tamanho original:', buf.length, 'bytes');

// Same mojibake patterns as the other file
const euroBytes = Buffer.from([0xC3, 0xA2, 0xE2, 0x82, 0xAC]);
const emDashBytes = Buffer.from([0xE2, 0x80, 0x94]);

// Replace â€ (euro mojibake) → — (em-dash)
let euroCount = 0;
while (true) {
  const idx = buf.indexOf(euroBytes);
  if (idx === -1) break;
  buf = Buffer.concat([buf.slice(0, idx), emDashBytes, buf.slice(idx + euroBytes.length)]);
  euroCount++;
}
console.log('Substituídas', euroCount, 'sequências â€ → —');

// Replace â€¢ (bullet mojibake) → — (em-dash)
const bulletBytes = Buffer.from([0xC3, 0xA2, 0xE2, 0x80, 0xA2]);
let bulletCount = 0;
while (true) {
  const idx = buf.indexOf(bulletBytes);
  if (idx === -1) break;
  buf = Buffer.concat([buf.slice(0, idx), emDashBytes, buf.slice(idx + bulletBytes.length)]);
  bulletCount++;
}
console.log('Substituídas', bulletCount, 'sequências â€¢ → —');

// Now fix remaining Ã sequences via string replacement
let content = buf.toString('utf-8');

const ÃFixes = [
  ['Ã£', 'ã'], ['Ãµ', 'õ'], ['Ã§', 'ç'],
  ['Ã¡', 'á'], ['Ã©', 'é'], ['Ã­', 'í'], ['Ã³', 'ó'], ['Ãº', 'ú'],
  ['Ã¢', 'â'], ['Ãª', 'ê'], ['Ã ', 'à'], ['Ã¼', 'ü'], ['Ã´', 'ô'],
  ['Ã€', 'À'], ['Ãˆ', 'È'], ['Ã‰', 'É'], ['ÃŒ', 'Ì'],
  ['Ã"', 'Ò'], ['Ã"', 'Ó'], ['Ã™', 'Ù'], ['Ãœ', 'Ü'],
  ['Ã‚', 'Â'], ['Ã•', 'Õ'], ['Ã‡', 'Ç'],
];

for (const [from, to] of ÃFixes) {
  content = content.split(from).join(to);
}

// Write back
writeFileSync(FILE, content, 'utf-8');

const ÃRemaining = (content.match(/\u00C3/g) || []).length;
console.log('Ã restantes:', ÃRemaining);
console.log('✅ comentariosExpandidosNovos.ts corrigido');

// Verify
const sampleIdx = content.indexOf('história');
if (sampleIdx > -1) {
  console.log('\n📄 Amostra:', content.substring(sampleIdx, sampleIdx + 80));
}
