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

let ok = 0, fail = 0;
for (let i = 0; i < l.length; i++) {
  const t = l[i].trim();
  if (t.startsWith('add(') && t.includes("'Matthew Henry'") && !AC.test(t) && EN.test(t)) {
    const r = extractTexto(t);
    if (r) {
      ok++;
      if (ok <= 2) console.log('OK:', r.texto.substring(0, 60));
    } else {
      fail++;
      if (fail <= 3) console.log('FAIL:', t.slice(-80));
    }
  }
}
console.log('OK:', ok, 'FAIL:', fail);
