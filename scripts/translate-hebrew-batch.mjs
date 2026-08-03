#!/usr/bin/env node
/**
 * translate-hebrew-batch.mjs
 *
 * Translates Hebrew lexicon definitions from English to PT-BR using Groq API.
 * Uses smaller batches and longer delays to avoid rate limits.
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

// Load API key
const envPath = resolve(ROOT, '.env.local');
const envContent = readFileSync(envPath, 'utf8');
const apiKeyMatch = envContent.match(/OPENAI_API_KEY=(.+)/);
const apiKey = apiKeyMatch ? apiKeyMatch[1].trim() : '';

if (!apiKey) {
  console.error('❌ No API key found');
  process.exit(1);
}

const API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const BATCH_SIZE = 20; // Smaller batches
const DELAY_MS = 2000; // 2 seconds between batches

// ─── 1. Load lexicon line by line ────────────────────────────────────────────

const lexiconPath = resolve(ROOT, 'src/data/lexicon/hebraico.ts');
const raw = readFileSync(lexiconPath, 'utf8');
const lines = raw.split('\n');

// Parse each entry line
const entries = [];
const entryLineRegex = /^\s*\{ strong: '([^']*)', palavra: '([^']*)', transliteracao: '([^']*)', definicao: '([^']*)'/;

for (let i = 0; i < lines.length; i++) {
  const match = lines[i].match(entryLineRegex);
  if (match) {
    // Extract optional fields
    const morfMatch = lines[i].match(/morfologia: '([^']*)'/);
    const freqMatch = lines[i].match(/frequencia: (\d+)/);
    
    entries.push({
      lineIndex: i,
      strong: match[1],
      palavra: match[2],
      transliteracao: match[3],
      definicao: match[4],
      morfologia: morfMatch ? morfMatch[1] : '',
      frequencia: freqMatch ? parseInt(freqMatch[1], 10) : 0,
    });
  }
}

console.log(`📖 Loaded ${entries.length} Hebrew entries`);

// ─── 2. Identify entries needing translation ─────────────────────────────────

// English definitions are those with mainly ASCII letters
const isEnglish = (def) => def && /^[a-zA-Z\s,\.;\-\(\)'\/]+$/.test(def) && def.length > 3;

const needsTranslation = entries.filter(e => isEnglish(e.definicao));
console.log(`🔄 English definitions to translate: ${needsTranslation.length}`);

// ─── 3. Translation cache ────────────────────────────────────────────────────

const cachePath = resolve(ROOT, 'temp/hebrew-translation-cache.json');
let cache = {};
try {
  cache = JSON.parse(readFileSync(cachePath, 'utf8'));
} catch {
  // Cache doesn't exist yet
}

console.log(`💾 Cache entries: ${Object.keys(cache).length}`);

// ─── 4. Translate in batches ─────────────────────────────────────────────────

async function translateBatch(batch) {
  const definitions = batch.map((e, i) => `${i + 1}|${e.strong}|${e.definicao}`).join('\n');
  
  const prompt = `Traduza estas definições do léxico hebraico bíblico (Strong's) para português brasileiro.
Regras:
- Máximo 60 caracteres por definição
- Termos teológicos: manter em português (ex: "aliança", "sacrifício")
- Responda APENAS no formato: NUMERO|TRADUÇÃO
- Sem numeração extra, sem explicações

${definitions}`;

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.2,
        max_tokens: 1500,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error(`❌ API error: ${response.status}`);
      return null;
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content || '';
    
    // Parse "NUMBER|TRANSLATION" format
    const translations = new Map();
    for (const line of content.split('\n')) {
      const parts = line.split('|');
      if (parts.length >= 2) {
        const num = parseInt(parts[0].trim(), 10);
        const translation = parts.slice(1).join('|').trim();
        if (!isNaN(num) && translation.length > 0) {
          translations.set(num, translation);
        }
      }
    }
    
    return translations;
  } catch (error) {
    console.error(`❌ Request failed: ${error.message}`);
    return null;
  }
}

// Process untranslated entries
let translated = 0;
let cached = 0;
let failed = 0;

// First, apply cache
for (const entry of needsTranslation) {
  if (cache[entry.definicao]) {
    entry.definicaoPT = cache[entry.definicao];
    cached++;
  }
}

const toTranslate = needsTranslation.filter(e => !e.definicaoPT);
console.log(`📝 Need API translation: ${toTranslate.length}`);

for (let i = 0; i < toTranslate.length; i += BATCH_SIZE) {
  const batch = toTranslate.slice(i, i + BATCH_SIZE);
  const batchNum = Math.floor(i / BATCH_SIZE) + 1;
  const totalBatches = Math.ceil(toTranslate.length / BATCH_SIZE);
  
  process.stdout.write(`📝 Batch ${batchNum}/${totalBatches}...`);
  
  const translations = await translateBatch(batch);
  
  if (translations && translations.size > 0) {
    for (let j = 0; j < batch.length; j++) {
      const tr = translations.get(j + 1);
      if (tr) {
        batch[j].definicaoPT = tr;
        cache[batch[j].definicao] = tr;
        translated++;
      } else {
        failed++;
      }
    }
    console.log(` ✅ (${translated}/${toTranslate.length})`);
  } else {
    failed += batch.length;
    console.log(` ❌ (failed)`);
  }
  
  // Save cache periodically
  if ((batchNum % 5 === 0) || i + BATCH_SIZE >= toTranslate.length) {
    writeFileSync(cachePath, JSON.stringify(cache, null, 2), 'utf8');
  }
  
  // Delay between batches
  if (i + BATCH_SIZE < toTranslate.length) {
    await new Promise(r => setTimeout(r, DELAY_MS));
  }
}

// ─── 5. Apply translations to entries ────────────────────────────────────────

for (const entry of entries) {
  const translation = needsTranslation.find(e => e.strong === entry.strong);
  if (translation?.definicaoPT) {
    entry.definicao = translation.definicaoPT;
  }
}

// ─── 6. Generate TypeScript ──────────────────────────────────────────────────

function escapeTS(s) {
  if (!s) return '';
  return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, ' ');
}

const output = [];
output.push(`export interface PalavraHebraica {`);
output.push(`  strong: string;`);
output.push(`  palavra: string;`);
output.push(`  transliteracao: string;`);
output.push(`  definicao: string;`);
output.push(`  morfologia?: string;`);
output.push(`  frequencia?: number;`);
output.push(`}`);
output.push(``);
output.push(`export const palavrasHebraicas: PalavraHebraica[] = [`);

for (const e of entries) {
  const parts = [
    `strong: '${escapeTS(e.strong)}'`,
    `palavra: '${escapeTS(e.palavra)}'`,
    `transliteracao: '${escapeTS(e.transliteracao)}'`,
    `definicao: '${escapeTS(e.definicao)}'`,
  ];
  if (e.morfologia) {
    parts.push(`morfologia: '${escapeTS(e.morfologia)}'`);
  }
  if (e.frequencia) {
    parts.push(`frequencia: ${e.frequencia}`);
  }
  output.push(`  { ${parts.join(', ')} },`);
}

output.push(`];`);
output.push(``);

writeFileSync(lexiconPath, output.join('\n'), 'utf8');

// ─── 7. Statistics ───────────────────────────────────────────────────────────

console.log(`\n📊 Translation results:`);
console.log(`   Total entries: ${entries.length}`);
console.log(`   From cache: ${cached}`);
console.log(`   Translated: ${translated}`);
console.log(`   Failed: ${failed}`);
console.log(`\n✅ Generated: ${lexiconPath}`);
