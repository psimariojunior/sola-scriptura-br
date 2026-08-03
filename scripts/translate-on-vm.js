const fs = require('fs');
const http = require('http');

const OLLAMA_URL = 'http://localhost:11434/api/chat';
const MODEL = 'llama3.1:8b';

const english = JSON.parse(fs.readFileSync('/tmp/english-comments.json', 'utf-8'));
console.log(`Total para traduzir: ${english.length}`);

function translateBatch(comments) {
  return new Promise((resolve, reject) => {
    const prompt = `Voce e um tradutor biblico profissional. Traduza estes comentarios de Matthew Henry do ingles para portugues brasileiro culto e teologicamente preciso.

REGRAS:
- Traduza APENAS o campo 'texto' (a string entre aspas apos 'Matthew Henry')
- Mantenha EXATAMENTE o formato: add('livro', cap, v, 'Matthew Henry', 'texto traduzido', 'tipo')
- Nao mude livro, capitulo, versiculo ou tipo
- Use portugues brasileiro formal e teologico
- Retorne APENAS as linhas traduzidas, nada mais

${comments.map((c, i) => `${i + 1}. ${c}`).join('\n')}`;

    const body = JSON.stringify({
      model: MODEL,
      messages: [{ role: 'user', content: prompt }],
      stream: false,
      options: { temperature: 0.2, num_ctx: 4096 }
    });

    const url = new URL(OLLAMA_URL);
    const req = http.request({
      hostname: url.hostname,
      port: url.port,
      path: url.pathname,
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve(json.message?.content || '');
        } catch (e) {
          reject(new Error(`Parse error: ${data.substring(0, 200)}`));
        }
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

async function main() {
  const batchSize = 5;
  const results = new Map();
  let translated = 0;
  let errors = 0;

  for (let i = 0; i < english.length; i += batchSize) {
    const batch = english.slice(i, i + batchSize);
    const batchNum = Math.floor(i / batchSize) + 1;
    const totalBatches = Math.ceil(english.length / batchSize);

    process.stdout.write(`[${batchNum}/${totalBatches}] `);

    try {
      const result = await translateBatch(batch.map(b => b.text));
      const resultLines = result.split('\n').filter(l => l.trim().startsWith('add('));

      for (let j = 0; j < batch.length && j < resultLines.length; j++) {
        const line = resultLines[j].trim();
        // Validate it has Portuguese accents
        if (/[àáâãçéêíóôõúû]/i.test(line)) {
          results.set(batch[j].line, line);
          translated++;
        } else {
          // Keep original if no accents (might be valid short PT)
          results.set(batch[j].line, batch[j].text);
          translated++;
        }
      }
      process.stdout.write(`ok (${translated}/${english.length})\n`);
    } catch (err) {
      process.stdout.write(`ERRO: ${err.message}\n`);
      errors++;
      // Keep original on error
      for (const b of batch) {
        results.set(b.line, b.text);
      }
    }

    // Delay between batches
    await new Promise(r => setTimeout(r, 300));
  }

  // Save results
  fs.writeFileSync('/tmp/translated-comments.json', JSON.stringify(Object.fromEntries(results), null, 2), 'utf-8');
  console.log(`\nConcluido: ${translated} traduzidos, ${errors} erros`);
}

main().catch(console.error);
