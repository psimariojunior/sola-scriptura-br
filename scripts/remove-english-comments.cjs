// scripts/remove-english-comments.cjs
// Remove comentários Matthew Henry em inglês, mantém apenas PT-BR

const fs = require('fs');

const file = 'src/data/comentarios.ts';
const content = fs.readFileSync(file, 'utf8');
const lines = content.split('\n');

// Detectar inglês: sem acentos PT + palavras típicas inglesas
function isEnglish(text) {
  const hasPtAccent = /[àáâãçéêíóôõúû]/i.test(text);
  if (hasPtAccent) return false;
  
  const englishWords = ['the', 'and', 'that', 'this', 'with', 'from', 'which', 'have', 'been', 'were', 'shall', 'unto', 'upon', 'here', 'there', 'what', 'when', 'where', 'how', 'why', 'who', 'whom', 'whose', 'they', 'them', 'their', 'his', 'her', 'our', 'your', 'my', 'its', 'but', 'not', 'for', 'nor', 'yet', 'also', 'than', 'then', 'thus', 'lest', 'nay', 'yea', 'hath', 'doth'];
  const words = text.toLowerCase().split(/\s+/);
  let englishCount = 0;
  for (const word of words) {
    if (englishWords.includes(word)) englishCount++;
  }
  return englishCount >= 3;
}

let removed = 0;
let kept = 0;
const newLines = [];

for (const line of lines) {
  const match = line.match(/add\('([^']+)',\s*(\d+),\s*(\d+),\s*'([^']+)',\s*'([^']*)'/);
  if (match) {
    const autor = match[4];
    const texto = match[5];
    
    if (autor === 'Matthew Henry' && isEnglish(texto)) {
      removed++;
      continue; // Pular linha (remover)
    }
    kept++;
  }
  newLines.push(line);
}

// Atualizar comentário header
const newContent = newLines.join('\n')
  .replace(/Total: \d+ comentários/, `Total: ${kept} comentários`);

fs.writeFileSync(file, newContent, 'utf8');

console.log(`✅ Removidos: ${removed} comentários em inglês`);
console.log(`✅ Mantidos: ${kept} comentários em PT-BR`);
console.log(`✅ Arquivo atualizado: ${file}`);
