import { readFileSync, writeFileSync } from 'fs';

const FILE = 'C:\\Sola Scriptura BR\\src\\data\\estudosTeologicosExpandidos.ts';
let buf = readFileSync(FILE);

console.log('Tamanho original:', buf.length, 'bytes');

// Replace â€ (c3 a2 e2 82 ac) → — (e2 80 94) em-dash
const euroBytes = Buffer.from([0xC3, 0xA2, 0xE2, 0x82, 0xAC]);
const emDashBytes = Buffer.from([0xE2, 0x80, 0x94]);

let newBuf = buf;
let euroCount = 0;
while (true) {
  const idx = newBuf.indexOf(euroBytes);
  if (idx === -1) break;
  newBuf = Buffer.concat([newBuf.slice(0, idx), emDashBytes, newBuf.slice(idx + euroBytes.length)]);
  euroCount++;
}
console.log('Substituídas', euroCount, 'sequências â€ → —');

// Replace â€¢ (c3 a2 e2 80 a2) → — (e2 80 94) em-dash (used as separator)
const bulletBytes = Buffer.from([0xC3, 0xA2, 0xE2, 0x80, 0xA2]);

let bulletCount = 0;
while (true) {
  const idx = newBuf.indexOf(bulletBytes);
  if (idx === -1) break;
  newBuf = Buffer.concat([newBuf.slice(0, idx), emDashBytes, newBuf.slice(idx + bulletBytes.length)]);
  bulletCount++;
}
console.log('Substituídas', bulletCount, 'sequências â€¢ → —');

// Check for any remaining mojibake patterns
const remaining = newBuf.toString('utf-8');
const ÃCount = (remaining.match(/\u00C3/g) || []).length;
console.log('Ã restantes:', ÃCount, '(devem ser portugueses legítimos como Ã, ÃO)');

// Show a sample
const sampleIdx = remaining.indexOf("titulo: 'A Existência");
if (sampleIdx > -1) {
  console.log('\n📄 Amostra:', remaining.substring(sampleIdx, sampleIdx + 120));
}

writeFileSync(FILE, newBuf);
console.log('\n✅ Arquivo corrigido! Novo tamanho:', newBuf.length, 'bytes');
