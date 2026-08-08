import { readFileSync, writeFileSync } from 'fs';

const filePath = 'src/data/lexicon/hebraico.ts';
const content = readFileSync(filePath, 'utf-8');
const lines = content.split('\n');

function morfologiaToPronuncia(morfologia) {
  if (!morfologia) return null;
  
  // The raw value from the source code, e.g. "ab-o\\'ee" or "aw-bad\\'"
  // Remove the trailing \\' pattern (escaped quote = stress marker at end)
  let cleaned = morfologia.replace(/\\'$/, '');
  
  // Convert remaining \\' (escaped quotes used as vowel separators) to -
  cleaned = cleaned.replace(/\\'/g, '-');
  
  // Split by hyphens
  const syllables = cleaned.split('-').filter(s => s.length > 0);
  if (syllables.length === 0) return null;
  
  // Build pronunciation: stress on last syllable (milra)
  const result = syllables.map((syl, i) => {
    const isLast = i === syllables.length - 1;
    const s = syl.toLowerCase();
    if (syllables.length === 1) {
      return s.toUpperCase();
    }
    return isLast ? s.toUpperCase() : s;
  });
  
  return result.join('-');
}

function extractMorfologia(line) {
  // Find morfologia: '...' in the line
  const marker = "morfologia: '";
  const start = line.indexOf(marker);
  if (start === -1) return null;
  
  const valueStart = start + marker.length;
  let pos = valueStart;
  
  // Walk through the string handling escaped quotes
  while (pos < line.length) {
    if (line[pos] === '\\' && pos + 1 < line.length && line[pos + 1] === "'") {
      pos += 2; // skip escaped quote
    } else if (line[pos] === "'") {
      break;
    } else {
      pos++;
    }
  }
  
  return line.substring(valueStart, pos);
}

const updates = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (!line.includes("morfologia:") || line.includes("pronuncia:")) continue;
  
  const strongMatch = line.match(/strong: '(H\d+)'/);
  if (!strongMatch) continue;
  
  const num = parseInt(strongMatch[1].substring(1));
  if (num < 1 || num > 200) continue;
  
  const morfologia = extractMorfologia(line);
  if (!morfologia) continue;
  
  const pronuncia = morfologiaToPronuncia(morfologia);
  if (!pronuncia) continue;
  
  updates.push({ lineNum: i, strong: strongMatch[1], morfologia, pronuncia });
}

console.log(`Found ${updates.length} entries to update`);
console.log('\nSample:');
updates.slice(0, 20).forEach(u => {
  console.log(`  ${u.strong}: '${u.morfologia}' → '${u.pronuncia}'`);
});

// Apply: insert ", pronuncia: 'VALUE'" right after the morfologia closing quote
for (const u of updates) {
  const line = lines[u.lineNum];
  
  // Find the position right after the morfologia value's closing quote
  const marker = "morfologia: '";
  const start = line.indexOf(marker) + marker.length;
  let pos = start;
  
  while (pos < line.length) {
    if (line[pos] === '\\' && pos + 1 < line.length && line[pos + 1] === "'") {
      pos += 2;
    } else if (line[pos] === "'") {
      break;
    } else {
      pos++;
    }
  }
  
  // pos is now at the closing quote of morfologia
  // Insert after pos (after the closing quote)
  const before = line.substring(0, pos + 1);
  const after = line.substring(pos + 1);
  
  lines[u.lineNum] = before + `, pronuncia: '${u.pronuncia}'` + after;
}

writeFileSync(filePath, lines.join('\n'), 'utf-8');
console.log(`\nDone! ${updates.length} pronunciations added.`);
