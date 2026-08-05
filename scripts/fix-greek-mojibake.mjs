import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const filePath = join(process.cwd(), 'src/data/lexicon/grego.ts');
const content = readFileSync(filePath, 'utf8');

const lines = content.split('\n');
let fixedCount = 0;
let mojibakeFixed = 0;
let englishCleaned = 0;

// Mojibake character replacements
const mojibakeReplacements = [
  // Obvious mojibake characters
  [/Ǧ/g, 'ã'],
  [/ǜ/g, 'ú'],
  [/Ã/g, 'ã'],

  // Corrupted word patterns
  [/compumrumr/g, 'componho'],
  [/umdignumção/g, 'indignação'],
  [/emdignumção/g, 'indignação'],
  [/exultumção/g, 'exultação'],
  [/especiumlmente/g, 'especialmente'],
  [/sumcrseicio/g, 'sacrifício'],
  [/ignemumce/g, 'ignorância'],
  [/propriummémte/g, 'propriamente'],
  [/quumlity/g, 'qualidade'],
  [/um mulher/g, 'uma mulher'],
  [/um esposum/g, 'um esposo'],
  [/um present/g, 'um presente'],
  [/um bumse/g, 'um vaso'],
];

// English terms to remove/replace in definicao (when definicaoResumida is clean)
const englishPatterns = [
  /\bfigurativamente\b/gi,
  /\bliteralmente\b/gi,
  /\bpor implicação\b/gi,
  /\bpor implicação\b/gi,
  /\bespecialmente\b/gi,
  /\bcorretamente\b/gi,
  /\bpropriamente\b/gi,
  /\bou seja\b/gi,
  /\bisto é\b/gi,
  /\bsemelhante à base de[^;]*;\s*/gi,
];

function cleanEnglishFromDefinicao(definicao, definicaoResumida) {
  // If definicaoResumida is clean PT-BR (no English), use it for definicao
  const hasEnglish = /\b(i\.e\.|e\.g\.|figuratively|literally|properly|by implication|hence|concrete|abstract|unregistered|unlettered|vessel|message|go to|gladness|indignation|goodness|sincerely|purely|error|ignorance|pureness|welcome|virtue|registered|birth|pail|perhaps|bent|corresponding|precept|implication|affliction|grief|displeased|moved|com|ignorance|sincere|forense|vulgar|draught|illiterate|abstratamente|concretamente)\b/i.test(definicaoResumida);

  if (!hasEnglish && definicaoResumida.length > 5) {
    return { definicao: definicaoResumida + '.', definicaoResumida: definicaoResumida, fixed: true };
  }

  return { definicao, definicaoResumida, fixed: false };
}

const results = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (!line.includes('strong:')) continue;

  const defMatch = line.match(/definicao: '([^']*)'/);
  const resMatch = line.match(/definicaoResumida: '([^']*)'/);
  if (!defMatch || !resMatch) continue;

  let definicao = defMatch[1];
  let definicaoResumida = resMatch[1];
  let changed = false;

  // Step 1: Fix mojibake characters
  for (const [pattern, replacement] of mojibakeReplacements) {
    if (pattern.test(definicao)) {
      definicao = definicao.replace(pattern, replacement);
      changed = true;
      mojibakeFixed++;
    }
    pattern.lastIndex = 0;
  }

  // Also fix definicaoResumida if it has mojibake
  for (const [pattern, replacement] of mojibakeReplacements) {
    if (pattern.test(definicaoResumida)) {
      definicaoResumida = definicaoResumida.replace(pattern, replacement);
      changed = true;
    }
    pattern.lastIndex = 0;
  }

  // Step 2: For entries where definicaoResumida is clean PT but definicao has English
  const resHasEnglish = /\b(i\.e\.|e\.g\.|figuratively|literally|properly|by implication|hence|concrete|abstract|unregistered|unlettered|vessel|message|go to|gladness|indignation|goodness|sincerely|purely|error|ignorance|pureness|welcome|virtue|registered|birth|pail|perhaps|bent|corresponding|precept|implication|affliction|grief|displeased|moved|com|ignorance|sincere|forense|vulgar|draught|illiterate|abstratamente|concretamente)\b/i.test(definicaoResumida);

  if (!resHasEnglish && definicaoResumida.length > 5 && definicao !== definicaoResumida + '.') {
    // definicaoResumida is clean, use it
    definicao = definicaoResumida + '.';
    changed = true;
    englishCleaned++;
  }

  if (changed) {
    // Replace in the line
    lines[i] = line
      .replace(/definicao: '[^']*'/, `definicao: '${definicao}'`)
      .replace(/definicaoResumida: '[^']*'/, `definicaoResumida: '${definicaoResumida}'`);
    fixedCount++;
    results.push({
      line: i + 1,
      strong: line.match(/strong: '([^']*)'/)?.[1],
      oldDef: defMatch[1].substring(0, 80),
      newDef: definicao.substring(0, 80),
    });
  }
}

writeFileSync(filePath, lines.join('\n'), 'utf8');

console.log(`=== Greek Mojibake Fix Results ===`);
console.log(`Total entries processed: ${lines.filter(l => l.includes('strong:')).length}`);
console.log(`Entries fixed: ${fixedCount}`);
console.log(`  - Mojibake characters fixed: ${mojibakeFixed}`);
console.log(`  - English definitions cleaned (using definicaoResumida): ${englishCleaned}`);
console.log(`\nSample fixes:`);
results.slice(0, 10).forEach(r => {
  console.log(`  ${r.strong}: "${r.oldDef}" → "${r.newDef}"`);
});
