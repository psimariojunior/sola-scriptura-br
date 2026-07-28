#!/usr/bin/env node
// Script para traduzir comentários em inglês para português usando a API Groq
// Uso: node scripts/translate-commentaries.mjs
// Requer: variável de ambiente GROQ_API_KEY ou OPENAI_API_KEY

import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

const GROQ_KEY = process.env.GROQ_API_KEY || process.env.OPENAI_API_KEY;
if (!GROQ_KEY) {
  console.error('❌ Defina GROQ_API_KEY ou OPENAI_API_KEY no ambiente');
  console.error('Ex: $env:GROQ_API_KEY="gsk_..."; node scripts/translate-commentaries.mjs');
  process.exit(1);
}

const BATCH_SIZE = 20;
const FILE = resolve('src/data/comentarios.ts');
const content = readFileSync(FILE, 'utf-8');
const lines = content.split('\n');

// Parse all entries
const entries = [];
for (let i = 0; i < lines.length; i++) {
  const trimmed = lines[i].trim();
  if (!trimmed.startsWith('add(')) continue;
  
  const match = trimmed.match(/^add\('([^']+)',\s*(\d+),\s*(\d+),\s*'([^']+)',\s*'((?:[^'\\]|\\'|\\\\|\\n)*)',\s*'(\w+)'\);?$/);
  if (!match) continue;
  
  const [, book, cap, ver, author, text, tipo] = match;
  const isPortuguese = /[àáâãçéêíóôõúû]/i.test(text);
  
  entries.push({
    lineIndex: i,
    book,
    cap: parseInt(cap),
    ver: parseInt(ver),
    author,
    text,
    tipo,
    isPortuguese,
    originalLine: lines[i]
  });
}

const englishEntries = entries.filter(e => !e.isPortuguese && e.author === 'Matthew Henry');
console.log(`📊 Total de entradas: ${entries.length}`);
console.log(`🇧🇷 Em português: ${entries.filter(e => e.isPortuguese).length}`);
console.log(`🇬🇧 Em inglês (Matthew Henry): ${englishEntries.length}`);
console.log(`🔄 Iniciando tradução em lotes de ${BATCH_SIZE}...\n`);

async function translateBatch(batch) {
  const prompt = `Você é um tradutor de comentários bíblicos Matthew Henry para português brasileiro.
Traduza os seguintes comentários do inglês para português, mantendo o estilo teológico e pastoral.
IMPORTANTE: Retorne APENAS um JSON array com as traduções, sem markdown, sem código, sem explicação.
Cada elemento deve ser um objeto com "index" (número da entrada no batch) e "texto" (tradução em português).

Entradas:
${batch.map((e, i) => `[${i}] ${e.text.substring(0, 400)}`).join('\n\n')}`;

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${GROQ_KEY}`
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.3,
      max_tokens: 8000
    })
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`API error ${response.status}: ${err}`);
  }

  const data = await response.json();
  const content = data.choices[0]?.message?.content || '[]';
  
  // Extract JSON from response
  const jsonMatch = content.match(/\[[\s\S]*\]/);
  if (!jsonMatch) throw new Error('Resposta não contém JSON válido');
  
  return JSON.parse(jsonMatch[0]);
}

async function main() {
  let translatedCount = 0;
  let errorCount = 0;

  for (let i = 0; i < englishEntries.length; i += BATCH_SIZE) {
    const batch = englishEntries.slice(i, i + BATCH_SIZE);
    const batchNum = Math.floor(i / BATCH_SIZE) + 1;
    const totalBatches = Math.ceil(englishEntries.length / BATCH_SIZE);
    
    process.stdout.write(`[${batchNum}/${totalBatches}] Traduzindo ${batch.length} entradas... `);
    
    try {
      const translations = await translateBatch(batch);
      
      for (let j = 0; j < batch.length; j++) {
        const entry = batch[j];
        const translation = translations.find(t => t.index === j);
        if (translation && translation.texto) {
          // Replace English text with Portuguese translation
          const escapedText = translation.texto.replace(/'/g, "\\'").replace(/\\/g, '\\\\');
          const newLine = `add('${entry.book}', ${entry.cap}, ${entry.ver}, '${entry.author}', '${escapedText}', '${entry.tipo}');`;
          lines[entry.lineIndex] = newLine;
          translatedCount++;
        } else {
          errorCount++;
        }
      }
      
      console.log(`✅ ${translatedCount} traduzidas`);
      
      // Save progress every 100 entries
      if (translatedCount % 100 === 0) {
        writeFileSync(FILE, lines.join('\n'), 'utf-8');
        console.log(`  💾 Progresso salvo`);
      }
      
      // Rate limit: wait 500ms between batches
      await new Promise(r => setTimeout(r, 500));
      
    } catch (err) {
      console.log(`❌ Erro: ${err.message}`);
      errorCount += batch.length;
      // Wait longer on error
      await new Promise(r => setTimeout(r, 2000));
    }
  }

  // Final save
  writeFileSync(FILE, lines.join('\n'), 'utf-8');
  
  console.log(`\n🎉 Tradução concluída!`);
  console.log(`✅ Traduzidas: ${translatedCount}`);
  console.log(`❌ Erros: ${errorCount}`);
  console.log(`📄 Arquivo salvo: ${FILE}`);
}

main().catch(console.error);
