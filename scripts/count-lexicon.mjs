#!/usr/bin/env node
import { readFileSync } from 'fs';

const content = readFileSync('src/data/lexicon/hebraico.ts', 'utf8');
const lines = content.split('\n');
let english = 0, hybrid = 0, portuguese = 0;

for (const line of lines) {
  const match = line.match(/definicao:\s*["](.*?)["]/);
  if (match) {
    const def = match[1];
    const hasPT = /[ãõêôçáéíóúâêîôûà]/i.test(def);
    const hasEN = /\b(properly|i\.e\.|figuratively|to wander|to perish|concrete|abstract|wretched|something|destruction|perishing|manger|stall|brandishing|melon|name|Israelite|descendant|Philistine|king|queen|prince|prophet|priest|servant|slave|friend|enemy|stranger|traveler|shepherd|warrior|judge|ruler|teacher|disciple|apostle|angel|god|green|young|heard|grain|hence|month)\b/i.test(def);
    
    if (hasEN && !hasPT) english++;
    else if (hasEN && hasPT) hybrid++;
    else portuguese++;
  }
}
console.log('Hebraico:');
console.log('  Inglês puro:', english);
console.log('  Híbrido (PT+EN):', hybrid);
console.log('  Português:', portuguese);

const content2 = readFileSync('src/data/lexicon/grego.ts', 'utf8');
const lines2 = content2.split('\n');
let english2 = 0, hybrid2 = 0, portuguese2 = 0;

for (const line of lines2) {
  const match = line.match(/definicao:\s*["](.*?)["]/);
  if (match) {
    const def = match[1];
    const hasPT = /[ãõêôçáéíóúâêîôûà]/i.test(def);
    const hasEN = /\b(properly|i\.e\.|figuratively|to work|well-doing|virtue|indignation|announcement|receptacle|compare|base|implication|specially)\b/i.test(def);
    
    if (hasEN && !hasPT) english2++;
    else if (hasEN && hasPT) hybrid2++;
    else portuguese2++;
  }
}
console.log('\nGrego:');
console.log('  Inglês puro:', english2);
console.log('  Híbrido (PT+EN):', hybrid2);
console.log('  Português:', portuguese2);
