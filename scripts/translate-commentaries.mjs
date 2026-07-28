import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

const content = readFileSync(resolve('src/data/comentarios.ts'), 'utf-8');
const lines = content.split('\n');

// Count by book
const books = {};
const englishEntries = [];
const ptEntries = [];

for (const line of lines) {
  const trimmed = line.trim();
  if (!trimmed.startsWith('add(')) continue;
  
  const bookMatch = trimmed.match(/^add\('([^']+)',\s*(\d+),\s*(\d+),\s*'([^']+)'/);
  if (!bookMatch) continue;
  
  const [, book, cap, ver, author] = bookMatch;
  if (!books[book]) books[book] = { total: 0, matthewHenry: 0, pt: 0, en: 0 };
  books[book].total++;
  
  if (author === 'Matthew Henry') {
    books[book].matthewHenry++;
    // Check if Portuguese
    const isPortuguese = /[àáâãçéêíóôõúû]/i.test(trimmed);
    if (isPortuguese) {
      books[book].pt++;
      ptEntries.push({ book, cap: parseInt(cap), ver: parseInt(ver), line: line.trim() });
    } else {
      books[book].en++;
      englishEntries.push({ book, cap: parseInt(cap), ver: parseInt(ver), line: line.trim() });
    }
  }
}

console.log('=== COBERTURA POR LIVRO ===');
const bookNames = {
  gn: 'Gênesis', ex: 'Êxodo', lv: 'Levítico', nm: 'Números', dt: 'Deuteronômio',
  js: 'Juízes', rt: 'Rute', 'sm1': '1 Samuel', 'sm2': '2 Samuel', 'r1': '1 Reis', 'r2': '2 Reis',
  'cr1': '1 Crônicas', 'cr2': '2 Crônicas', ed: 'Esdras', ne: 'Neemias', et: 'Ester',
  jó: 'Jó', sl: 'Salmos', pv: 'Provérbios', ec: 'Eclesiastes', ct: 'Cânticos',
  is: 'Isaías', Jr: 'Jeremias', Lm: 'Lamentações', eq: 'Ezequiel', dn: 'Daniel',
  os: 'Oséias', Jl: 'Joel', Am: 'Amós', Ob: 'Obadias', Jn: 'Jonas', Mq: 'Miquéias',
  Na: 'Naum', Hab: 'Habacuque', Sf: 'Sofonias', Ag: 'Ageu', Za: 'Zacarias', Ml: 'Malaquias',
  mt: 'Mateus', mc: 'Marcos', lc: 'Lucas', jo: 'João', at: 'Atos',
  rm: 'Romanos', '1co': '1 Coríntios', '2co': '2 Coríntios', gl: 'Gálatas', ef: 'Efésios',
  fp: 'Filipenses', cl: 'Colossenses', '1ts': '1 Tessalonicenses', '2ts': '2 Tessalonicenses',
  '1tm': '1 Timóteo', '2tm': '2 Timóteo', tt: 'Tito', Fm: 'Filemom',
  hb: 'Hebreus', Tg: 'Tiago', '1pe': '1 Pedro', '2pe': '2 Pedro',
  '1jo': '1 João', '2jo': '2 João', '3jo': '3 João', Jd: 'Judas', ap: 'Apocalipse'
};

for (const [book, data] of Object.entries(books).sort((a, b) => a[0].localeCompare(b[0]))) {
  const name = bookNames[book] || book;
  console.log(`${name.padEnd(20)} Total: ${String(data.total).padStart(4)} | MH PT: ${String(data.pt).padStart(4)} | MH EN: ${String(data.en).padStart(4)}`);
}

console.log(`\n=== RESUMO ===`);
console.log(`Total entradas Matthew Henry em inglês: ${englishEntries.length}`);
console.log(`Total entradas Matthew Henry em português: ${ptEntries.length}`);

// Find books with NO coverage at all
const allBookAbbrs = Object.keys(bookNames);
const noCoverage = allBookAbbrs.filter(b => !books[b]);
console.log(`\n=== LIVROS SEM NENHUM COMENTÁRIO ===`);
for (const b of noCoverage) {
  console.log(`${bookNames[b] || b} (${b})`);
}

// Find books with partial coverage
console.log(`\n=== LIVROS COM COBERTURA PARCIAL (só em inglês) ===`);
for (const [book, data] of Object.entries(books)) {
  if (data.en > 0 && data.pt === 0) {
    console.log(`${bookNames[book] || book} (${book}): ${data.en} entradas em inglês`);
  }
}

// Save english entries for translation
writeFileSync(resolve('scripts/english-entries.json'), JSON.stringify(englishEntries, null, 2), 'utf-8');
console.log(`\nSalvo ${englishEntries.length} entradas em inglês para tradução em scripts/english-entries.json`);
