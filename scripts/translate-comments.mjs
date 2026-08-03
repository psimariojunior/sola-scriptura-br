import { readFileSync, writeFileSync } from 'fs';

const OLLAMA_URL = 'http://137.131.184.53:11434/api/chat';
const MODEL = 'llama3.1:8b';
const ACENTOS_PT = /[àáâãçéêíóôõúû]/i;
const ENGLISH_WORDS = /\bthe\b|\band\b|\bhave\b|\bwith\b|\bthis\b|\bfrom\b|\bthey\b|\bbeen\b|\bsaid\b|\bthat\b|\bwhich\b|\bfor\b|\bnot\b|\bwas\b|\bare\b|\bhis\b|\bher\b|\bour\b|\byou\b|\bwill\b|\bshall\b|\bunto\b|\bdoth\b|\bcometh\b|\bthereof\b/i;

const content = readFileSync('src/data/comentarios.ts', 'utf-8');
const lines = content.split('\n');

// Extract English comments
const englishIndices = [];
for (let i = 0; i < lines.length; i++) {
  const trimmed = lines[i].trim();
  if (trimmed.startsWith('add(') && !ACENTOS_PT.test(trimmed) && ENGLISH_WORDS.test(trimmed)) {
    englishIndices.push(i);
  }
}

console.log(`Total comentarios: ${lines.filter(l => l.trim().startsWith('add(')).length}`);
console.log(`Comentarios em ingles para traduzir: ${englishIndices.length}`);

async function translateBatch(comments) {
  const prompt = `Traduza estes comentarios biblicos de Matthew Henry do ingles para portugues brasileiro. 
Mantenha o formato exato: add('livro', cap, v, 'Matthew Henry', 'texto traduzido', 'tipo').
Retorne APENAS as linhas traduzidas, uma por linha, sem explicacoes.

${comments.map((c, i) => `${i + 1}. ${c}`).join('\n')}`;

  const response = await fetch(OLLAMA_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: MODEL,
      messages: [{ role: 'user', content: prompt }],
      stream: false,
      options: { temperature: 0.3 }
    })
  });

  const data = await response.json();
  return data.message?.content || '';
}

async function main() {
  const batchSize = 10;
  const translatedLines = [...lines];
  let translated = 0;
  let errors = 0;

  for (let i = 0; i < englishIndices.length; i += batchSize) {
    const batch = englishIndices.slice(i, i + batchSize);
    const batchComments = batch.map(idx => lines[idx].trim());

    console.log(`Traduzindo batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(englishIndices.length / batchSize)}...`);

    try {
      const result = await translateBatch(batchComments);
      const resultLines = result.split('\n').filter(l => l.trim().startsWith('add('));

      for (let j = 0; j < batch.length && j < resultLines.length; j++) {
        translatedLines[batch[j]] = resultLines[j].trim();
        translated++;
      }
    } catch (err) {
      console.error(`Erro no batch ${i}:`, err.message);
      errors++;
    }

    // Small delay between batches
    await new Promise(r => setTimeout(r, 500));
  }

  writeFileSync('src/data/comentarios.ts', translatedLines.join('\n'), 'utf-8');
  console.log(`\nTraducao concluida: ${translated} traduzidos, ${errors} erros`);
}

main().catch(console.error);
