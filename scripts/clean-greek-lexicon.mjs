#!/usr/bin/env node
/**
 * Limpeza do léxico grego — remove artefatos de inglês via regex no arquivo TS
 * 
 * Uso: node scripts/clean-greek-lexicon.mjs
 * Não destrói o formato TypeScript — faz find-and-replace direto no conteúdo.
 */

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const filePath = join(ROOT, 'src/data/lexicon/grego.ts');

console.log('📖 Limpando léxico grego (find-and-replace)...');

let content = readFileSync(filePath, 'utf8');
const originalSize = content.length;
let fixCount = 0;

// 1. Corrigir morphologia em inglês — padrões como:
//    morphologia: 'of Hebrew origin (H03195);'
//    morphologia: 'diminutive from G2486 (ἰχθύς);'
//    morphologia: 'of uncertain affinity;'
//    morphologia: 'probably for G2491 (Ἰωάννης) or G2495 (Ἰωνᾶς);'
const morphPatterns = [
  /morphologia: '(?:of Hebrew origin[^']*|diminutive[^']*|of uncertain[^']*|probably for[^']*|perhaps for[^']*|a form of[^']*|genitive case[^']*|feminine of[^']*|contracted from[^']*|from \(to arrive[^']*|de o same as[^']*|de G\d+ \([^)]+\) e um advérbio de[^']*|middle voice of[^']*|adverb from[^']*|a primary[^']*|neuter of[^']*|apparently from[^']*|contracted from the genitive[^']*)';/g,
];

for (const pattern of morphPatterns) {
  content = content.replace(pattern, (match) => {
    fixCount++;
    return "morphologia: ''";
  });
}

// 2. Corrigir uso em inglês — substituir texto em inglês por vazio
//    uso: 'accuse falsely, take by false accusation'
//    uso: 'fish'
//    uso: 'John'
//    (manter uso que tenha referências a versículos)
const usoPattern = /uso: '([^']*)'/g;
content = content.replace(usoPattern, (match, uso) => {
  // Se o uso contém números ou nomes de livros bíblicos, manter
  if (/\d/.test(uso) || /Mateus|Marcos|Lucas|João|Atos|Romanos|Apocalipse|Gênesis|Êxodo|Levítico|Números|Deuteronômio|Josué|Juízes|Rute|Samuel|Reis|Crônicas|Esdras|Neemias|Ester|Jó|Salmos|Próverbios|Eclesiastes|Cânticos|Isaías|Jeremias|Lamentações|Ezequiel|Daniel|Oseias|Joel|Amós|Obadias|Jonas|Miquéias|Naum|Habacuque|Sofonias|Ageu|Zacarias|Malaquias|Efésios|Filipenses|Colossenses|Tessalonicenses|Timóteo|Tito|Hebreus|Tiago|Pedro|Judas|Coríntios|Gálatas|Filemom/i.test(uso)) {
    return match;
  }
  // Se o uso é apenas inglês (letras, espaços, vírgulas, hifens)
  if (/^[a-zA-Z\s,\-()]+$/.test(uso.trim()) && uso.trim().length < 100) {
    fixCount++;
    return "uso: ''";
  }
  return match;
});

// 3. Corrigir definições que começam com "para" + inglês
content = content.replace(/definicao: 'para ([a-z][a-zA-Z\s,\-()]+)'/g, (match, def) => {
  // Se parece inglês
  if (/^[a-z]+(\s+[a-z]+)*$/.test(def.trim()) && !/(e|ou|de|do|da|dos|das|em|no|na|nos|nas|com|por|para|sem|sob|até|desde|entre|após|antes|durante|contra|sobre|sob|acima|abaixo|dentro|fora|perto|longe|ao|à|aos|às|um|uma|uns|umas|o|a|os|as|que|se|não|sim|mas|também|ainda|já|só|apenas|quase|mais|menos|muito|pouco|todo|cada|outro|mesmo|próprio|tal|tão|tanto|quanto|onde|quando|como|porque|pois|logo|portanto|mas|porém|contudo|todavia|entretanto|nem|ou|e|mas|se|embora|apesar|ainda|porque|pois|já|uma|do|da|em|no|na|com|por|para|sem|sob|até|desde|entre|após|antes|durante|contra|sobre|sob|acima|abaixo|dentro|fora|perto|longe)/.test(def)) {
    return match;
  }
  fixCount++;
  return `definicao: '${def.replace(/^para\s+/, '')}'`;
});

// 4. Corrigir definições curtas em inglês puro
const definicoesInglesas = {
  'usefulness': 'utilidade',
  'advantage': 'vantagem',
  'profit': 'lucro, proveito',
  'better': 'melhor',
  'prevail': 'prevalecer',
  'ear': 'orelha',
  'fish': 'peixe',
  'step': 'passo, pegada',
  'jot': 'iota, vírgula',
  'hosanna': 'hosana, salve!',
};

for (const [en, pt] of Object.entries(definicoesInglesas)) {
  const pattern = new RegExp(`definicao: '${en}'`, 'g');
  if (pattern.test(content)) {
    content = content.replace(pattern, `definicao: '${pt}'`);
    fixCount++;
  }
}

writeFileSync(filePath, content);

const saved = originalSize - content.length;
console.log(`  ✅ ${fixCount} correções aplicadas`);
console.log(`  📝 Arquivo salvo (${(content.length / 1024).toFixed(0)} KB, ${saved > 0 ? '-' : '+'}${Math.abs(saved)} bytes)`);
