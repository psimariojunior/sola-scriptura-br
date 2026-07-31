#!/usr/bin/env node
import { readFileSync } from 'fs';

const content = readFileSync('src/data/lexicon/grego.ts', 'utf8');
const lines = content.split('\n');
let english = 0, hybrid = 0, portuguese = 0;
let samples = [];

for (const line of lines) {
  // Try both single and double quotes
  const match = line.match(/definicao:\s*['"](.+?)['"]/);
  if (match) {
    const def = match[1];
    const hasPT = /[ãõêôçáéíóúâêîôûà]/i.test(def);
    const hasEN = /\b(properly|i\.e\.|figuratively|to work|well-doing|virtue|indignation|announcement|receptacle|compare|base|implication|specially|for|from|the|and|that|this|with|which|what|who|when|where|how|why|not|but|or|are|was|were|been|being|have|has|had|do|does|did|will|would|could|should|may|might|can|shall|must)\b/i.test(def);
    
    if (hasEN && !hasPT) {
      english++;
      if (samples.length < 10) samples.push(def.substring(0, 120));
    }
    else if (hasEN && hasPT) hybrid++;
    else portuguese++;
  }
}
console.log('Grego:');
console.log('  Inglês puro:', english);
console.log('  Híbrido (PT+EN):', hybrid);
console.log('  Português:', portuguese);
console.log('\nAmostras de inglês:');
samples.forEach((s,i) => console.log(`  ${i+1}. ${s}`));
