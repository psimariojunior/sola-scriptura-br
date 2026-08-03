const fs = require('fs');
const c = fs.readFileSync('src/data/comentarios.ts', 'utf-8');
const l = c.split('\n');
const AC = /[àáâãçéêíóôõúû]/i;
const EN = /\bthe\b|\band\b|\bhave\b|\bthis\b/i;

function extractTexto(line) {
  const marker = "'Matthew Henry', '";
  const start = line.indexOf(marker);
  if (start === -1) return null;
  const textStart = start + marker.length;
  const lastSep = line.lastIndexOf("', '");
  if (lastSep <= textStart) return null;
  const after = line.substring(lastSep + 4);
  if (/^[a-z]+'\)[;]?$/.test(after)) {
    return {
      before: line.substring(0, textStart),
      texto: line.substring(textStart, lastSep),
      after: line.substring(lastSep)
    };
  }
  return null;
}

async function test() {
  for (let i = 0; i < l.length; i++) {
    const t = l[i].trim();
    if (t.startsWith('add(') && t.includes("'Matthew Henry'") && !AC.test(t) && EN.test(t)) {
      const parts = extractTexto(t);
      console.log('Texto:', parts.texto.substring(0, 100));
      console.log('Before:', parts.before.substring(0, 80));
      console.log('After:', parts.after);
      
      try {
        const url = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=pt-BR&dt=t&q=' + encodeURIComponent(parts.texto);
        console.log('URL:', url.substring(0, 100));
        const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
        console.log('Status:', res.status);
        if (res.ok) {
          const data = await res.json();
          const translated = data[0].map(s => s[0]).join('');
          console.log('Traduzido:', translated.substring(0, 100));
          
          const safeText = translated.replace(/'/g, "\\'");
          const newLine = parts.before + safeText + parts.after;
          console.log('Nova linha:', newLine.substring(0, 150));
        }
      } catch (err) {
        console.log('Erro:', err.message);
      }
      break;
    }
  }
}
test();
