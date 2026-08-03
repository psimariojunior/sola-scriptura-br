#!/usr/bin/env node
/**
 * translate-hebrew-definitions.mjs
 *
 * Translates Hebrew lexicon definitions from English to PT-BR using Groq API.
 * Processes in batches of 50 to avoid rate limits.
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

// Load API key from .env.local
const envPath = resolve(ROOT, '.env.local');
const envContent = readFileSync(envPath, 'utf8');
const apiKeyMatch = envContent.match(/OPENAI_API_KEY=(.+)/);
const apiKey = apiKeyMatch ? apiKeyMatch[1].trim() : '';

if (!apiKey) {
  console.error('❌ No API key found in .env.local');
  process.exit(1);
}

const API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const BATCH_SIZE = 30;

// ─── 1. Load current lexicon ─────────────────────────────────────────────────

const lexiconPath = resolve(ROOT, 'src/data/lexicon/hebraico.ts');
const raw = readFileSync(lexiconPath, 'utf8');

// Parse entries
const entryRegex = /\{ strong: '([^']+)', palavra: '([^']*)', transliteracao: '([^']*)', definicao: '([^']*)'(?:, morfologia: '([^']*)')?(?:, frequencia: (\d+))? \}/g;
const entries = [];
let match;

while ((match = entryRegex.exec(raw)) !== null) {
  entries.push({
    strong: match[1],
    palavra: match[2],
    transliteracao: match[3],
    definicao: match[4],
    morfologia: match[5] || '',
    frequencia: parseInt(match[6] || '0', 10),
  });
}

console.log(`📖 Loaded ${entries.length} Hebrew entries`);

// ─── 2. Filter entries that need translation ─────────────────────────────────

const needsTranslation = entries.filter(e => 
  e.definicao && 
  !e.definicao.startsWith(' ') && 
  e.definicao.length > 0
);

console.log(`🔄 Entries needing translation: ${needsTranslation.length}`);

// ─── 3. Translate in batches ─────────────────────────────────────────────────

async function translateBatch(batch) {
  const definitions = batch.map((e, i) => `${i + 1}. ${e.strong}: ${e.definicao}`).join('\n');
  
  const prompt = `Traduza estas definições bíblicas do hebraico (Strong's) para português brasileiro.
Seja conciso (máx 80 caracteres por definição). Mantenha termos teológicos.
Não inclua numeração na resposta. Apenas as traduções, uma por linha.

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
        temperature: 0.3,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error(`❌ API error: ${response.status} - ${error}`);
      return null;
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content || '';
    
    // Parse translations
    const lines = content.split('\n').filter(l => l.trim().length > 0);
    const translations = [];
    
    for (const line of lines) {
      // Remove numbering like "1. " or "- "
      const cleaned = line.replace(/^\d+[\.\)]\s*/, '').replace(/^-\s*/, '').trim();
      if (cleaned.length > 0) {
        translations.push(cleaned);
      }
    }
    
    return translations;
  } catch (error) {
    console.error(`❌ Request failed: ${error.message}`);
    return null;
  }
}

// Process in batches
const translatedEntries = [...entries];
let processed = 0;

for (let i = 0; i < needsTranslation.length; i += BATCH_SIZE) {
  const batch = needsTranslation.slice(i, i + BATCH_SIZE);
  const batchNum = Math.floor(i / BATCH_SIZE) + 1;
  const totalBatches = Math.ceil(needsTranslation.length / BATCH_SIZE);
  
  console.log(`📝 Translating batch ${batchNum}/${totalBatches} (${batch.length} entries)...`);
  
  const translations = await translateBatch(batch);
  
  if (translations && translations.length === batch.length) {
    for (let j = 0; j < batch.length; j++) {
      const entry = translatedEntries.find(e => e.strong === batch[j].strong);
      if (entry) {
        entry.definicao = translations[j];
      }
    }
    processed += batch.length;
    console.log(`   ✅ Translated ${processed}/${needsTranslation.length}`);
  } else {
    console.log(`   ⚠️ Batch failed or mismatched, skipping...`);
  }
  
  // Rate limit: wait 500ms between batches
  if (i + BATCH_SIZE < needsTranslation.length) {
    await new Promise(r => setTimeout(r, 500));
  }
}

// ─── 4. Generate TypeScript ──────────────────────────────────────────────────

function escapeTS(s) {
  if (!s) return '';
  return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, ' ');
}

const lines = [];
lines.push(`export interface PalavraHebraica {`);
lines.push(`  strong: string;`);
lines.push(`  palavra: string;`);
lines.push(`  transliteracao: string;`);
lines.push(`  definicao: string;`);
lines.push(`  morfologia?: string;`);
lines.push(`  frequencia?: number;`);
lines.push(`}`);
lines.push(``);
lines.push(`export const palavrasHebraicas: PalavraHebraica[] = [`);

for (const e of translatedEntries) {
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
  lines.push(`  { ${parts.join(', ')} },`);
}

lines.push(`];`);
lines.push(``);

writeFileSync(lexiconPath, lines.join('\n'), 'utf8');

// ─── 5. Statistics ───────────────────────────────────────────────────────────

const translatedCount = translatedEntries.filter(e => 
  e.definicao && !e.definicao.match(/^[a-zA-Z\s,\.]+$/) // Not purely English
).length;

console.log(`\n📊 Translation statistics:`);
console.log(`   Total entries: ${translatedEntries.length}`);
console.log(`   Processed: ${processed}`);
console.log(`   Estimated PT-BR: ~${translatedCount}`);
console.log(`\n✅ Generated: ${lexiconPath}`);
