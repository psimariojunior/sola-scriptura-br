const fs = require('fs');
const content = fs.readFileSync('src/data/comentarios.ts', 'utf-8');
const lines = content.split('\n');

// Find first English MH line
const ACENTOS_PT = /[àáâãçéêíóôõúû]/i;
const EN_WORDS = /\bthe\b|\band\b|\bhave\b|\bwith\b|\bthis\b|\bfrom\b|\bthey\b|\bbeen\b|\bsaid\b/i;

for (let i = 0; i < 100; i++) {
  const t = lines[i].trim();
  if (t.startsWith('add(') && t.includes("'Matthew Henry'") && !ACENTOS_PT.test(t) && EN_WORDS.test(t)) {
    console.log('LINE', i, 'LEN', t.length);
    console.log('START:', JSON.stringify(t.substring(0, 100)));
    console.log('END:', JSON.stringify(t.substring(t.length - 60)));
    
    // Try a simple split approach
    const firstQuote = t.indexOf("'Matthew Henry', '") + "'Matthew Henry', '".length;
    const lastComma = t.lastIndexOf("', '");
    if (firstQuote > 18 && lastComma > firstQuote) {
      const before = t.substring(0, firstQuote);
      const texto = t.substring(firstQuote, lastComma);
      const after = t.substring(lastComma);
      console.log('TEXT:', texto.substring(0, 80));
      console.log('OK: simple split works');
    } else {
      console.log('FAILED: split positions', firstQuote, lastComma);
    }
    break;
  }
}
