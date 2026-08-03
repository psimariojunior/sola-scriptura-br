import { readFileSync, writeFileSync } from 'fs';

const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_KEY = process.env.OPENAI_API_KEY || '';
const MODEL = 'llama-3.3-70b-versatile';
const ACENTOS_PT = /[àáâãçéêíóôõúû]/i;
const ENGLISH_WORDS = /\bthe\b|\band\b|\bhave\b|\bwith\b|\bthis\b|\bfrom\b|\bthey\b|\bbeen\b|\bsaid\b|\bthat\b|\bwhich\b|\bfor\b|\bnot\b|\bwas\b|\bare\b|\bhis\b|\bher\b|\bour\b|\byou\b|\bwill\b|\bshall\b|\bunto\b|\bdoth\b|\bcometh\b|\bthereof\b/i;

const content = readFileSync('src/data/comentarios.ts', 'utf-8');
const lines = content.split('\n');

const englishIndices = [];
for (let i = 0; i < lines.length; i++) {
  const t = lines[i].trim();
  if (t.startsWith('add(') && !ACENTOS_PT.test(t) && ENGLISH_WORDS.test(t)) {
    englishIndices.push(i);
  }
}

console.log(`Comentarios em ingles: ${englishIndices.length}`);

async function translateBatch(texts) {
  const numbered = texts.map((t, i) => `${i + 1}. ${t}`).join('\n');
  const prompt = `Traduza estes comentarios biblicos de Matthew Henry do ingles para portugues brasileiro teologico.
REGRAS:
- Mantenha o formato EXATO: add('livro', cap, v, 'Matthew Henry', 'texto', 'tipo')
- Nao mude livro, capitulo, versiculo ou tipo
- Use portugues brasileiro formal
- Retorne APENAS as linhas traduzidas, sem numeracao, sem explicacoes

${numbered}`;

  const res = await fetch(GROQ_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${GROQ_KEY}`
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.2,
      max_tokens: 4096
    })
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Groq ${res.status}: ${err.substring(0, 200)}`);
  }

  const data = await res.json();
  return data.choices?.[0]?.message?.content || '';
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function main() {
  const BATCH = 20;
  const translatedLines = [...lines];
  let done = 0;
  let errors = 0;

  for (let i = 0; i < englishIndices.length; i += BATCH) {
    const batch = englishIndices.slice(i, i + BATCH);
    const texts = batch.map(idx => lines[idx].trim());
    const batchNum = Math.floor(i / BATCH) + 1;
    const totalBatches = Math.ceil(englishIndices.length / BATCH);

    process.stdout.write(`[${batchNum}/${totalBatches}] `);

    try {
      const result = await translateBatch(texts);
      const resultLines = result.split('\n').filter(l => l.trim().startsWith('add('));

      for (let j = 0; j < batch.length; j++) {
        if (j < resultLines.length) {
          translatedLines[batch[j]] = resultLines[j].trim();
        }
        done++;
      }
      process.stdout.write(`ok (${done}/${englishIndices.length})\n`);
    } catch (err) {
      process.stdout.write(`ERRO: ${err.message}\n`);
      errors++;
      done += batch.length;
    }

    await sleep(500);
  }

  writeFileSync('src/data/comentarios.ts', translatedLines.join('\n'), 'utf-8');
  console.log(`\nConcluido: ${done} processados, ${errors} erros`);
}

main().catch(console.error);
