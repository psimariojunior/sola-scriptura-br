const fs = require('fs');

const ACENTOS_PT = /[àáâãçéêíóôõúû]/i;
const EN_WORDS = /\bthe\b|\band\b|\bhave\b|\bwith\b|\bthis\b|\bfrom\b|\bthey\b|\bbeen\b|\bsaid\b|\bthat\b|\bwhich\b|\bfor\b|\bnot\b|\bwas\b|\bare\b|\bhis\b|\bher\b|\bour\b|\byou\b|\bwill\b|\bshall\b|\bunto\b|\bdoth\b|\bcometh\b|\bthereof\b/i;

function extractTexto(rawLine) {
  const line = rawLine.trim();
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

async function googleTranslate(text) {
  const url = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=pt-BR&dt=t&q=' + encodeURIComponent(text);
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  if (!res.ok) throw new Error('HTTP ' + res.status);
  const data = await res.json();
  return data[0].map(s => s[0]).join('');
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function main() {
  const content = fs.readFileSync('src/data/comentarios.ts', 'utf-8');
  const lines = content.split('\n');

  const englishIndices = [];
  for (let i = 0; i < lines.length; i++) {
    const t = lines[i].trim();
    if (t.startsWith('add(') && t.includes("'Matthew Henry'") && !ACENTOS_PT.test(t) && EN_WORDS.test(t)) {
      englishIndices.push(i);
    }
  }

  console.log('English found:', englishIndices.length);

  const translatedLines = [...lines];
  let done = 0, translated = 0, errors = 0;

  for (const idx of englishIndices) {
    const raw = lines[idx];
    const t = raw.trim();
    const marker = "'Matthew Henry', '";
    const start = t.indexOf(marker);
    const textStart = start + marker.length;
    const lastSep = t.lastIndexOf("', '");
    const after = lastSep > textStart ? t.substring(lastSep + 4) : 'N/A';
    const regexOk = /^[a-z]+'\)[;]?$/.test(after);

    const parts = extractTexto(raw);
    if (!parts) {
      errors++;
      done++;
      if (errors <= 3) console.log('EXTRACT FAIL line=' + idx + ' start=' + start + ' lastSep=' + lastSep + ' after=' + JSON.stringify(after) + ' regex=' + regexOk);
      continue;
    }

    try {
      const traduzido = await googleTranslate(parts.texto);
      const safeText = traduzido.replace(/'/g, "\\'");
      translatedLines[idx] = parts.before + safeText + parts.after;
      done++;
      translated++;
      if (translated <= 3 || translated % 500 === 0) {
        console.log('Translated', translated, '/', englishIndices.length);
      }
      if (!fs.existsSync('scripts/translation-cache.json')) await sleep(120);
    } catch (err) {
      errors++;
      done++;
      if (errors <= 5) console.log('TRANSLATE ERROR:', err.message);
      await sleep(2000);
    }

    if (done % 200 === 0) {
      fs.writeFileSync('src/data/comentarios.ts', translatedLines.join('\n'), 'utf-8');
      console.log('Saved checkpoint at', done);
    }
  }

  fs.writeFileSync('src/data/comentarios.ts', translatedLines.join('\n'), 'utf-8');
  console.log('Done:', translated, 'translated,', errors, 'errors');
}

main().catch(err => console.error('FATAL:', err));
