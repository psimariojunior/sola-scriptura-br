import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const FILE = 'C:\\Sola Scriptura BR\\src\\data\\estudosTeologicosExpandidos.ts';
let content = readFileSync(FILE, 'utf-8');

// Count remaining issues
const remaining = [];
let i = 0;
while (i < content.length) {
  const code = content.charCodeAt(i);
  if (code === 0xC3) { // Ã
    remaining.push({ pos: i, context: content.substring(Math.max(0,i-10), i+10) });
  }
  i++;
}

console.log('Remaining Ã at positions:', remaining.slice(0, 20).map(r => r.pos));
console.log('Sample contexts:', remaining.slice(0, 5).map(r => r.context));

// Check for any remaining em-dash patterns
const emDashes = content.match(/â€[^\s]/g) || [];
console.log('\nRemaining â€ patterns:', emDashes.length);
if (emDashes.length > 0) {
  console.log('Samples:', emDashes.slice(0, 10));
}

// Check for box drawing
const boxDrawing = content.match(/â•[^\s]/g) || [];
console.log('Remaining â• patterns:', boxDrawing.length);
