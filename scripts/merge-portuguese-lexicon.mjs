#!/usr/bin/env node
/**
 * merge-portuguese-lexicon.mjs
 *
 * Funde as definicoes em portugues dos JSONs mobile
 * nos arquivos TypeScript do lexico web.
 *
 * Mapeamento de campos:
 * - Hebraico mobile: definicao = analise gramatical, morfologia = traducao PT
 * - Hebraico web: definicao = definicao EN, morfologia = pronuncia fonetica
 *
 * Para o hebraico web, vamos:
 * - Substituir definicao pela traducao PT (morfologia do mobile)
 * - Manter morfologia original como pronuncia
 *
 * - Grego mobile: definicao = definicao PT, definicaoResumida = resumo PT
 * - Grego web: definicao = definicao EN ou PT, definicaoResumida = resumo
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

// ─── 1. Carregar JSONs mobile ────────────────────────────────────────────────

const hebMobilePath = resolve(ROOT, 'mobile/assets/data/lexicon-hebraico.json');
const hebMobile = JSON.parse(readFileSync(hebMobilePath, 'utf8'));
console.log(`📱 Hebraico mobile: ${hebMobile.length} entradas`);

const gregMobilePath = resolve(ROOT, 'mobile/assets/data/lexicon-grego.json');
const gregMobile = JSON.parse(readFileSync(gregMobilePath, 'utf8'));
console.log(`📱 Grego mobile: ${gregMobile.length} entradas`);

// ─── 2. Criar mapas Strong -> definicao PT ───────────────────────────────────

const hebPtMap = new Map();
for (const entry of hebMobile) {
  // morfologia no mobile = traducao em portugues
  if (entry.morfologia) {
    hebPtMap.set(entry.strong, {
      definicaoPt: entry.morfologia,
      analiseGramatical: entry.definicao,
    });
  }
}

const gregPtMap = new Map();
for (const entry of gregMobile) {
  gregPtMap.set(entry.strong, {
    definicaoPt: entry.definicao,
    definicaoResumidaPt: entry.definicaoResumida,
  });
}

console.log(`📊 Mapa hebraico PT: ${hebPtMap.size} entradas`);
console.log(`📊 Mapa grego PT: ${gregPtMap.size} entradas`);

// ─── 3. Atualizar hebraico.ts ────────────────────────────────────────────────

const hebPath = resolve(ROOT, 'src/data/lexicon/hebraico.ts');
let hebContent = readFileSync(hebPath, 'utf8');

let hebUpdated = 0;
for (const [strong, pt] of hebPtMap) {
  // Encontrar a entrada no TypeScript e substituir a definicao
  // Padrao: { strong: "H123", palavra: "...", transliteracao: "...", definicao: "OLD DEF", morfologia: "..." }
  const regex = new RegExp(
    `(strong:\\s*"${strong.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[^}]*?definicao:\\s*)"[^"]*"`,
    'g'
  );
  const newDef = pt.definicaoPt.replace(/"/g, '\\"');
  const newContent = hebContent.replace(regex, `$1"${newDef}"`);
  if (newContent !== hebContent) {
    hebContent = newContent;
    hebUpdated++;
  }
}

writeFileSync(hebPath, hebContent, 'utf8');
console.log(`✅ Hebraico.ts atualizado: ${hebUpdated} definicoes traduzidas`);

// ─── 4. Atualizar grego.ts ───────────────────────────────────────────────────

const gregPath = resolve(ROOT, 'src/data/lexicon/grego.ts');
let gregContent = readFileSync(gregPath, 'utf8');

let gregUpdated = 0;
for (const [strong, pt] of gregPtMap) {
  // Substituir definicao - grego usa aspas simples
  const escapedStrong = strong.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regexDef = new RegExp(
    `(strong:\\s*'${escapedStrong}'[^}]*?definicao:\\s*)'[^']*'`,
    'g'
  );
  const newDef = pt.definicaoPt.replace(/'/g, "\\'");
  const newContentDef = gregContent.replace(regexDef, `$1'${newDef}'`);
  if (newContentDef !== gregContent) {
    gregContent = newContentDef;
    gregUpdated++;
  }

  // Substituir definicaoResumida
  if (pt.definicaoResumidaPt) {
    const regexRes = new RegExp(
      `(strong:\\s*'${escapedStrong}'[^}]*?definicaoResumida:\\s*)'[^']*'`,
      'g'
    );
    const newRes = pt.definicaoResumidaPt.replace(/'/g, "\\'");
    const newContentRes = gregContent.replace(regexRes, `$1'${newRes}'`);
    if (newContentRes !== gregContent) {
      gregContent = newContentRes;
    }
  }
}

writeFileSync(gregPath, gregContent, 'utf8');
console.log(`✅ Grego.ts atualizado: ${gregUpdated} definicoes traduzidas`);

console.log('\n🎉 Concluido! Lexico fundido com sucesso.');
