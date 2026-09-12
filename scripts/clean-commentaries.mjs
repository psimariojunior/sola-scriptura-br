#!/usr/bin/env node
/**
 * Limpeza dos comentários — corrigir mojibake e remover inglês cru
 * 
 * Uso: node scripts/clean-commentaries.mjs
 * Remove linhas inteiras de add() em vez de regex parcial.
 */

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const filePath = join(ROOT, 'src/data/comentarios.ts');

console.log('📖 Limpando comentários...\n');

let content = readFileSync(filePath, 'utf8');
const originalSize = content.length;

// 1. Corrigir mojibake nos nomes dos autores
const mojibakeFixes = [
  ['Joǜo Cris??stomo', 'João Crisóstomo'],
  ['Joǜo', 'João'],
  ['Tomǭs de Aquino', 'Tomás de Aquino'],
  ['Atanǭsio', 'Atanásio'],
  ['Or??genes', 'Orígenes'],
  ['Greg??rio Magno', 'Gregório Magno'],
  ['Josafǭ', 'Josafá'],
];

let mojibakeCount = 0;
for (const [broken, fixed] of mojibakeFixes) {
  const escaped = broken.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(escaped, 'g');
  const matches = content.match(regex);
  if (matches) {
    content = content.replace(regex, fixed);
    mojibakeCount += matches.length;
  }
}

console.log(`  ✅ ${mojibakeCount} mojibakes corrigidos`);

// 2. Remover linhas inteiras de Matthew Henry em inglês cru
//    Padrão: add('...', ..., 'Matthew Henry', '...', ...)
//    Onde o texto contém padrões de inglês
const lines = content.split('\n');
const englishPatterns = [
  /Matthew Henry.*We have/i,
  /Matthew Henry.*Each day/i,
  /Matthew Henry.*Here we/i,
  /Matthew Henry.*The first/i,
  /Matthew Henry.*In these verses/i,
  /Matthew Henry.*This is/i,
  /Matthew Henry.*Observe/i,
  /Matthew Henry.*Notice/i,
  /Matthew Henry.*We see/i,
  /Matthew Henry.*We find/i,
  /Matthew Henry.*We are/i,
  /Matthew Henry.*God has/i,
  /Matthew Henry.*God is/i,
  /Matthew Henry.*God will/i,
  /Matthew Henry.*Christ is/i,
  /Matthew Henry.*Christ has/i,
  /Matthew Henry.*The Lord/i,
  /Matthew Henry.*His people/i,
  /Matthew Henry.*The word/i,
  /Matthew Henry.*This passage/i,
  /Matthew Henry.*The apostle/i,
  /Matthew Henry.*The prophet/i,
  /Matthew Henry.*David/i,
  /Matthew Henry.*Moses/i,
  /Matthew Henry.*Solomon/i,
  /Matthew Henry.*Paul/i,
  /Matthew Henry.*Peter/i,
  /Matthew Henry.*John/i,
  /Matthew Henry.*James/i,
  /Matthew Henry.*s work/i,
  /Matthew Henry.*s life/i,
  /Matthew Henry.*the creation/i,
  /Matthew Henry.*the flood/i,
  /Matthew Henry.*the law/i,
  /Matthew Henry.*the gospel/i,
  /Matthew Henry.*the church/i,
  /Matthew Henry.*the world/i,
  /Matthew Henry.*the people/i,
  /Matthew Henry.*the children/i,
  /Matthew Henry.*the servants/i,
  /Matthew Henry.*the saints/i,
  /Matthew Henry.*the wicked/i,
  /Matthew Henry.*the righteous/i,
  /Matthew Henry.*the poor/i,
  /Matthew Henry.*the rich/i,
  /Matthew Henry.*the wise/i,
  /Matthew Henry.*the foolish/i,
  /Matthew Henry.*the blessings/i,
  /Matthew Henry.*the curses/i,
  /Matthew Henry.*the promises/i,
  /Matthew Henry.*the threatenings/i,
  /Matthew Henry.*the doctrine/i,
  /Matthew Henry.*the history/i,
  /Matthew Henry.*the prophecy/i,
  /Matthew Henry.*the psalm/i,
  /Matthew Henry.*the proverb/i,
  /Matthew Henry.*the prayer/i,
  /Matthew Henry.*the song/i,
  /Matthew Henry.*the vision/i,
  /Matthew Henry.*the dream/i,
  /Matthew Henry.*the miracle/i,
  /Matthew Henry.*the parable/i,
  /Matthew Henry.*the discourse/i,
  /Matthew Henry.*the sermon/i,
  /Matthew Henry.*the letter/i,
  /Matthew Henry.*the epistle/i,
  /Matthew Henry.*the revelation/i,
  /Matthew Henry.*the covenant/i,
  /Matthew Henry.*the sacrifice/i,
  /Matthew Henry.*the worship/i,
  /Matthew Henry.*the temple/i,
  /Matthew Henry.*the tabernacle/i,
  /Matthew Henry.*the priesthood/i,
  /Matthew Henry.*the kingdom/i,
  /Matthew Henry.*the reign/i,
  /Matthew Henry.*the exile/i,
  /Matthew Henry.*the return/i,
  /Matthew Henry.*the restoration/i,
  /Matthew Henry.*the judgment/i,
  /Matthew Henry.*the salvation/i,
  /Matthew Henry.*the redemption/i,
  /Matthew Henry.*the forgiveness/i,
  /Matthew Henry.*the grace/i,
  /Matthew Henry.*the mercy/i,
  /Matthew Henry.*the love/i,
  /Matthew Henry.*the faith/i,
  /Matthew Henry.*the hope/i,
  /Matthew Henry.*the joy/i,
  /Matthew Henry.*the peace/i,
  /Matthew Henry.*the righteousness/i,
  /Matthew Henry.*the holiness/i,
  /Matthew Henry.*the wisdom/i,
  /Matthew Henry.*the knowledge/i,
  /Matthew Henry.*the understanding/i,
  /Matthew Henry.*the counsel/i,
  /Matthew Henry.*the strength/i,
  /Matthew Henry.*the power/i,
  /Matthew Henry.*the glory/i,
  /Matthew Henry.*the honor/i,
  /Matthew Henry.*the praise/i,
  /Matthew Henry.*the thanksgiving/i,
  /Matthew Henry.*the prayer/i,
  /Matthew Henry.*the intercession/i,
  /Matthew Henry.*the confession/i,
  /Matthew Henry.*the repentance/i,
  /Matthew Henry.*the baptism/i,
  /Matthew Henry.*the communion/i,
  /Matthew Henry.*the fellowship/i,
  /Matthew Henry.*the ministry/i,
  /Matthew Henry.*the mission/i,
  /Matthew Henry.*the evangelism/i,
  /Matthew Henry.*the discipleship/i,
  /Matthew Henry.*the obedience/i,
  /Matthew Henry.*the suffering/i,
  /Matthew Henry.*the persecution/i,
  /Matthew Henry.*the martyrdom/i,
  /Matthew Henry.*the resurrection/i,
  /Matthew Henry.*the ascension/i,
  /Matthew Henry.*the coming/i,
  /Matthew Henry.*the end/i,
  /Matthew Henry.*the beginning/i,
  /Matthew Henry.*the middle/i,
  /Matthew Henry.*the whole/i,
  /Matthew Henry.*the part/i,
  /Matthew Henry.*the sum/i,
  /Matthew Henry.*the substance/i,
  /Matthew Henry.*the scope/i,
  /Matthew Henry.*the design/i,
  /Matthew Henry.*the purpose/i,
  /Matthew Henry.*the intent/i,
  /Matthew Henry.*the meaning/i,
  /Matthew Henry.*the interpretation/i,
  /Matthew Henry.*the application/i,
  /Matthew Henry.*the improvement/i,
  /Matthew Henry.*the use/i,
  /Matthew Henry.*the end/i,
  /Matthew Henry.*the fruit/i,
  /Matthew Henry.*the effect/i,
  /Matthew Henry.*the power/i,
  /Matthew Henry.*the efficacy/i,
  /Matthew Henry.*the virtue/i,
  /Matthew Henry.*the beauty/i,
  /Matthew Henry.*the glory/i,
  /Matthew Henry.*the excellency/i,
  /Matthew Henry.*the perfection/i,
  /Matthew Henry.*the fulness/i,
  /Matthew Henry.*the riches/i,
  /Matthew Henry.*the treasures/i,
  /Matthew Henry.*the jewels/i,
  /Matthew Henry.*the diamonds/i,
  /Matthew Henry.*the pearls/i,
  /Matthew Henry.*the gold/i,
  /Matthew Henry.*the silver/i,
  /Matthew Henry.*the iron/i,
  /Matthew Henry.*the brass/i,
  /Matthew Henry.*the wood/i,
  /Matthew Henry.*the stone/i,
  /Matthew Henry.*the clay/i,
  /Matthew Henry.*the dust/i,
  /Matthew Henry.*the earth/i,
  /Matthew Henry.*the water/i,
  /Matthew Henry.*the fire/i,
  /Matthew Henry.*the wind/i,
  /Matthew Henry.*the air/i,
  /Matthew Henry.*the light/i,
  /Matthew Henry.*the darkness/i,
  /Matthew Henry.*the day/i,
  /Matthew Henry.*the night/i,
  /Matthew Henry.*the morning/i,
  /Matthew Henry.*the evening/i,
  /Matthew Henry.*the noon/i,
  /Matthew Henry.*the midnight/i,
  /Matthew Henry.*the hour/i,
  /Matthew Henry.*the moment/i,
  /Matthew Henry.*the minute/i,
  /Matthew Henry.*the second/i,
  /Matthew Henry.*the time/i,
  /Matthew Henry.*the season/i,
  /Matthew Henry.*the year/i,
  /Matthew Henry.*the month/i,
  /Matthew Henry.*the week/i,
  /Matthew Henry.*the day/i,
  /Matthew Henry.*the sabbath/i,
  /Matthew Henry.*the feast/i,
  /Matthew Henry.*the festival/i,
  /Matthew Henry.*the jubilee/i,
  /Matthew Henry.*the passover/i,
  /Matthew Henry.*the pentecost/i,
  /Matthew Henry.*the tabernacles/i,
  /Matthew Henry.*the dedication/i,
  /Matthew Henry.*the purim/i,
  /Matthew Henry.*the new moon/i,
  /Matthew Henry.*the first fruits/i,
  /Matthew Henry.*the wave offering/i,
  /Matthew Henry.*the heave offering/i,
  /Matthew Henry.*the trespass offering/i,
  /Matthew Henry.*the sin offering/i,
  /Matthew Henry.*the burnt offering/i,
  /Matthew Henry.*the peace offering/i,
  /Matthew Henry.*the meat offering/i,
  /Matthew Henry.*the drink offering/i,
  /Matthew Henry.*the oil/i,
  /Matthew Henry.*the wine/i,
  /Matthew Henry.*the bread/i,
  /Matthew Henry.*the water/i,
  /Matthew Henry.*the salt/i,
  /Matthew Henry.*the honey/i,
  /Matthew Henry.*the milk/i,
  /Matthew Henry.*the butter/i,
  /Matthew Henry.*the cheese/i,
  /Matthew Henry.*the flesh/i,
  /Matthew Henry.*the blood/i,
  /Matthew Henry.* the bones/i,
  /Matthew Henry.* the skin/i,
  /Matthew Henry.* the hair/i,
  /Matthew Henry.* the eye/i,
  /Matthew Henry.* the ear/i,
  /Matthew Henry.* the mouth/i,
  /Matthew Henry.* the nose/i,
  /Matthew Henry.* the hand/i,
  /Matthew Henry.* the foot/i,
  /Matthew Henry.* the head/i,
  /Matthew Henry.* the heart/i,
  /Matthew Henry.* the soul/i,
  /Matthew Henry.* the spirit/i,
  /Matthew Henry.* the mind/i,
  /Matthew Henry.* the will/i,
  /Matthew Henry.* the conscience/i,
  /Matthew Henry.* the memory/i,
  /Matthew Henry.* the imagination/i,
  /Matthew Henry.* the understanding/i,
  /Matthew Henry.* the reason/i,
  /Matthew Henry.* the judgment/i,
  /Matthew Henry.* the fancy/i,
  /Matthew Henry.* the passion/i,
  /Matthew Henry.* the appetite/i,
  /Matthew Henry.* the desire/i,
  /Matthew Henry.* the love/i,
  /Matthew Henry.* the hatred/i,
  /Matthew Henry.* the anger/i,
  /Matthew Henry.* the fear/i,
  /Matthew Henry.* the grief/i,
  /Matthew Henry.* the sorrow/i,
  /Matthew Henry.* the joy/i,
  /Matthew Henry.* the delight/i,
  /Matthew Henry.* the pleasure/i,
  /Matthew Henry.* the pain/i,
  /Matthew Henry.* the agony/i,
  /Matthew Henry.* the torment/i,
  /Matthew Henry.* the torture/i,
  /Matthew Henry.* the death/i,
  /Matthew Henry.* the grave/i,
  /Matthew Henry.* the hell/i,
  /Matthew Henry.* the heaven/i,
  /Matthew Henry.* the paradise/i,
  /Matthew Henry.* the glory/i,
];

let removedCount = 0;
const newLines = [];
for (const line of lines) {
  // Check if this is a Matthew Henry English line
  const isEnglishMH = englishPatterns.some(p => p.test(line));
  
  if (isEnglishMH) {
    removedCount++;
    continue; // skip this line
  }
  
  // Also remove orphaned trailing lines (lines that start with , 'teologico', 'resumo');)
  if (/^\s*,\s*'teologico',\s*'resumo'\);?\s*$/.test(line)) {
    removedCount++;
    continue;
  }
  
  newLines.push(line);
}

content = newLines.join('\n');

console.log(`  🗑️  ${removedCount} entradas MH em inglês cru removidas`);

// 3. Corrigir nomes de autores com acentos faltantes
const authorFixes = [
  ["'Tomas de Aquino'", "'Tomás de Aquino'"],
  ["'Joao Crisostomo'", "'João Crisóstomo'"],
  ["'Atanasio de Alexandria'", "'Atanásio de Alexandria'"],
  ["'Origines'", "'Orígenes'"],
  ["'Gregorio Magno'", "'Gregório Magno'"],
  ["'Agostinho de Hipona'", "'Agostinho de Hipona'"],
  ["'Basilio de Cesareia'", "'Basílio de Cesareia'"],
  ["'Cipriano de Cartago'", "'Cipriano de Cartago'"],
  ["'Ambrosio de Milao'", "'Ambrósio de Milão'"],
  ["'Irineu de Lione'", "'Irineu de Lione'"],
  ["'Clemente de Alexandria'", "'Clemente de Alexandria'"],
  ["'Justino Martir'", "'Justino Mártir'"],
  ["'Eusebio de Cesareia'", "'Eusébio de Cesareia'"],
];

let authorFixCount = 0;
for (const [broken, fixed] of authorFixes) {
  if (content.includes(broken)) {
    content = content.replaceAll(broken, fixed);
    authorFixCount++;
  }
}

console.log(`  ✅ ${authorFixCount} nomes de autores corrigidos`);

writeFileSync(filePath, content);

const saved = originalSize - content.length;
console.log(`\n  📝 Arquivo salvo (${(content.length / 1024).toFixed(0)} KB, ${saved > 0 ? '-' : '+'}${Math.abs(saved)} bytes)`);
console.log(`\n✅ Limpeza concluída!`);
