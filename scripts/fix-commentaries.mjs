// Script para limpar comentários Matthew Henry truncados
// Uso: node scripts/fix-commentaries.mjs

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FILE = path.join(__dirname, '..', 'src/data/comentarios.ts');

const BOOK_NAMES = {
  gn: 'Gênesis', ex: 'Êxodo', lv: 'Levítico', nm: 'Números', dt: 'Deuteronômio',
  js: 'Josué', jz: 'Juízes', rt: 'Rute', sm1: '1 Samuel', sm2: '2 Samuel',
  r1: '1 Reis', r2: '2 Reis', cr1: '1 Crônicas', cr2: '2 Crônicas',
  ed: 'Esdras', ne: 'Neemias', et: 'Ester', job: 'Jó', sl: 'Salmos',
  pv: 'Provérbios', ec: 'Eclesiastes', ct: 'Cânticos', is: 'Isaías',
  jr: 'Jeremias', lm: 'Lamentações', ez: 'Ezequiel', dn: 'Daniel',
  os: 'Oséias', jl: 'Joel', am: 'Amós', ob: 'Obadias', jn: 'Jonas',
  mq: 'Miquéias', na: 'Naum', hc: 'Habacuque', sf: 'Sofonias',
  ag: 'Ageu', za: 'Zacarias', ml: 'Malaquias',
  mt: 'Mateus', mc: 'Marcos', lc: 'Lucas', jo: 'João',
  at: 'Atos', rm: 'Romanos', co1: '1 Coríntios', co2: '2 Coríntios',
  gl: 'Gálatas', ef: 'Efésios', fp: 'Filipenses', cl: 'Colossenses',
  ts1: '1 Tessalonicenses', ts2: '2 Tessalonicenses',
  tm1: '1 Timóteo', tm2: '2 Timóteo', tt: 'Tito', flm: 'Filemom',
  hb: 'Hebreus', tg: 'Tiago', pe1: '1 Pedro', pe2: '2 Pedro',
  jo1: '1 João', jo2: '2 João', jo3: '3 João', jd: 'Judas', ap: 'Apocalipse',
  '1sm': '1 Samuel', '2sm': '2 Samuel', '1rs': '1 Reis', '2rs': '2 Reis',
  '1cr': '1 Crônicas', '2cr': '2 Crônicas', '1co': '1 Coríntios', '2co': '2 Coríntios',
  '1ts': '1 Tessalonicenses', '2ts': '2 Tessalonicenses',
  '1tm': '1 Timóteo', '2tm': '2 Timóteo', '1jo': '1 João', '2jo': '2 João',
  '3jo': '3 João', '1pe': '1 Pedro', '2pe': '2 Pedro', 'fm': 'Filemom', 'zc': 'Zacarias',
};

const PRIORITY_BOOKS = new Set([
  'gn', 'ex', 'lv', 'nm', 'dt', 'js', 'jz', 'rt', 'sm1', 'sm2', 'r1', 'r2',
  'sl', 'pv', 'ec', 'ct', 'job', 'is', 'jr', 'ez', 'dn',
  'mt', 'mc', 'lc', 'jo', 'at',
  'rm', 'co1', 'co2', 'gl', 'ef', 'fp', 'cl',
  'hb', 'tg', 'pe1', 'pe2', 'jo1', 'ap',
]);

function isEnglish(text) {
  const enWords = ['the ', 'and ', 'that ', 'which ', 'with ', 'from ', 'have ', 'here ', 'observe', 'note'];
  let count = 0;
  for (const w of enWords) {
    if (text.includes(w)) count++;
  }
  return count >= 4;
}

function isTruncated(text) {
  return text.endsWith('...') || text.endsWith('..') || text.endsWith('\\\\') ||
         (text.length > 200 && !text.match(/[.!?]$/));
}

function generateSummary(text, livro, cap, v) {
  const bookName = BOOK_NAMES[livro] || livro;
  // Limpar texto de aspas, barras e caracteres especiais
  const cleanText = text
    .replace(/^['"]|['"]$/g, '')
    .replace(/\\n/g, ' ')
    .replace(/\\\\/g, '')
    .replace(/\\'/g, "'")
    .replace(/'/g, ' ')
    .trim();
  const words = cleanText.split(/\s+/).slice(0, 25).join(' ');
  let summary = words
    .replace(/\bthe Lord\b/gi, 'o Senhor')
    .replace(/\bGod\b/gi, 'Deus')
    .replace(/\bJesus Christ\b/gi, 'Jesus Cristo')
    .replace(/\bthe Holy Spirit\b/gi, 'o Espírito Santo')
    .replace(/\bthe gospel\b/gi, 'o evangelho')
    .replace(/\bthe church\b/gi, 'a igreja')
    .replace(/\bthe kingdom\b/gi, 'o reino');
  return `${bookName} ${cap}:${v} — Matthew Henry: ${summary}...`;
}

function main() {
  console.log('Reading file:', FILE);
  const content = fs.readFileSync(FILE, 'utf-8').replace(/\r/g, '');
  const lines = content.split('\n');
  console.log('Total lines:', lines.length);
  
  const re = /^add\('(\w+)',\s*(\d+),\s*(\d+),\s*'([^']*)',\s*(.*),\s*'(\w+)'\);$/;
  
  const newLines = [];
  let fixed = 0;
  let removed = 0;
  let total = 0;
  
  for (const line of lines) {
    const match = line.match(re);
    if (!match) {
      newLines.push(line);
      continue;
    }
    
    const [_, livro, cap, v, autor, textoParte, tipo] = match;
    total++;
    
    // Extrair texto (remover aspas escapadas do final)
    let texto = textoParte;
    // O texto pode terminar com algo como '...', 'tipo');
    // Precisamos remover o final
    const lastQuote = texto.lastIndexOf("', '");
    if (lastQuote > -1) {
      texto = texto.substring(0, lastQuote);
    }
    
    if (autor === 'Matthew Henry' && isEnglish(texto) && isTruncated(texto)) {
      if (!PRIORITY_BOOKS.has(livro)) {
        removed++;
        continue;
      }
      
      const summary = generateSummary(texto, livro, parseInt(cap), parseInt(v));
      const newLine = `add('${livro}', ${cap}, ${v}, '${autor}', '${summary.replace(/'/g, "\\'")}', '${tipo}');`;
      newLines.push(newLine);
      fixed++;
      continue;
    }
    
    newLines.push(line);
  }
  
  console.log(`Total add() entries: ${total}`);
  console.log(`Fixed: ${fixed}`);
  console.log(`Removed: ${removed}`);
  
  fs.writeFileSync(FILE, newLines.join('\n'));
  console.log(`\nFile updated: ${FILE}`);
}

main();
