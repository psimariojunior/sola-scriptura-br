const fs = require('fs');
const c = fs.readFileSync('src/data/comentarios.ts', 'utf-8');
const l = c.split('\n');
const t = l[46].trim();

const marker = "'Matthew Henry', '";
const start = t.indexOf(marker);
const textStart = start + marker.length;
const lastSep = t.lastIndexOf("', '");
console.log('start:', start, 'textStart:', textStart, 'lastSep:', lastSep);
const after = t.substring(lastSep + 4);
console.log('after:', JSON.stringify(after));
console.log('regex test:', /^[a-z]+'\)[;]?$/.test(after));

// Now test in translate-gt.cjs context
const ACENTOS_PT = /[àáâãçéêíóôõúû]/i;
const EN_WORDS = /\bthe\b|\band\b|\bhave\b|\bwith\b|\bthis\b|\bfrom\b|\bthey\b|\bbeen\b|\bsaid\b|\bthat\b|\bwhich\b|\bfor\b|\bnot\b|\bwas\b|\bare\b|\bhis\b|\bher\b|\bour\b|\byou\b|\bwill\b|\bshall\b|\bunto\b|\bdoth\b|\bcometh\b|\bthereof\b/i;

function extractTexto(line) {
  const m = "'Matthew Henry', '";
  const s = line.indexOf(m);
  if (s === -1) return null;
  const ts = s + m.length;
  const ls = line.lastIndexOf("', '");
  if (ls <= ts) return null;
  const af = line.substring(ls + 4);
  if (/^[a-z]+'\)[;]?$/.test(af)) {
    return { before: line.substring(0, ts), texto: line.substring(ts, ls), after: line.substring(ls) };
  }
  return null;
}

const result = extractTexto(t);
console.log('extractTexto result:', result ? 'OK - texto=' + result.texto.substring(0, 50) : 'NULL');
