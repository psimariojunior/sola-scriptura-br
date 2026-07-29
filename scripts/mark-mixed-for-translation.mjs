#!/usr/bin/env node
/**
 * mark-mixed-for-translation.mjs
 *
 * Marca entradas do lexico hebraico que ficaram misturadas (ingles/portugues)
 * com "[traduzir]" para facilitar revisao manual posterior.
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const hebPath = resolve(ROOT, 'src/data/lexicon/hebraico.ts');
let hebContent = readFileSync(hebPath, 'utf8');

let marcados = 0;
let jaPortugues = 0;
let total = 0;

// Processar cada entrada
const regexGlobal = /strong:\s*"(H\d+)"[^}]*?definicao:\s*"([^"]+)"/g;
let match;
const replacements = [];

while ((match = regexGlobal.exec(hebContent)) !== null) {
  total++;
  const strong = match[1];
  const definicao = match[2];
  
  // Ja esta em portugues completo?
  if (/[àáâãéêíóôõúç]/i.test(definicao) || 
      /^(substantivo|verbo|adjetivo|advérbio|preposição|conjunção|pronome|numeral|partícula|interjeição)/i.test(definicao)) {
    jaPortugues++;
    continue;
  }
  
  // Verificar se esta misturado (tem palavras em portugues E em ingles)
  const temPt = /\b(para|por|em|de|do|da|dos|das|um|uma|ou|e|que|com|no|na|nos|nas|ao|aos|as|se|ser|ter|fazer|ir|vir|ver|dar|estar|poder|dever|querer|saber|conhecer|amar|odiar|temer|louvar|adorar|orar|abençoar|salvar|libertar|perdoar|julgar|governar|destruir|construir|criar|formar|buscar|encontrar|servir|proteger|defender|guardar|esconder|revelar|mostrar|chamar|escolher|reunir|espalhar|dividir|unir|atar|soltar|cobrir|abrir|fechar|derramar|queimar|lavar|purificar|santificar|ungir|oferecer|sacrificar|expiar|ordenar|cumprir|comecar|voltar|seguir|conduzir|guiar|carregar|suportar|sofrer|afligir|oprimir|capturar|saquear|cantar|alegrar|lamentar|chorar|honrar|glorificar|exaltar|humilhar|punir|corrigir|repreender|prover|sustentar|manter|preservar|resgatar|escapar|prosperar|vencer|subjugar|bom|mal|justo|impio|santo|puro|impuro|grande|pequeno|poderoso|forte|fraco|sabio|tolo|jovem|velho|novo|primeiro|ultimo|muitos|poucos|todos|nenhum|bonito|rico|pobre|vivo|morto|verdadeiro|falso|eterno|pai|mae|filho|filha|irmao|irma|marido|esposa|homem|mulher|crianca|povo|nacao|rei|rainha|principe|servo|escravo|senhor|inimigo|amigo|proximo|estrangeiro|sacerdote|profeta|juiz|anciao|lider|Deus|SENHOR|anjo|espirito|alma|alianca|lei|mandamento|sacrificio|oferta|pecado|iniquidade|justica|misericordia|graca|verdade|fe|esperanca|bencao|maldicao|oracao|adoracao|louvor|ceu|terra|mundo|sol|lua|estrela|montanha|vale|rio|mar|agua|fogo|vento|chuva|trevas|luz|pedra|arvore|semente|fruto|ovelha|cordeiro|cabra|gado|boi|cavalo|leao|urso|aguia|pomba|serpente|peixe|cabeca|rosto|olho|ouvido|boca|braco|mao|pe|coracao|casa|tenda|templo|altar|cidade|muro|portao|porta|torre|palacio|pao|vinho|oleo|leite|mel|sal|vestimenta|coroa|espada|livro|dia|noite|manha|semana|mes|ano|sabado|festa|comeco|fim|eternidade|caminho|deserto|campo|sabedoria|entendimento|conhecimento|amor|odio|ira|paz|guerra|alegria|tristeza|medo|forca|poder|gloria|honra|vida|morte|salvacao|libertacao|redencao|perdao|julgamento|punicao|recompensa|heranca|riqueza|pobreza)\b/i.test(definicao);
  
  // Se tem palavras em portugues mas tambem em ingles, esta misturado
  if (temPt && /[a-z]{4,}/i.test(definicao.replace(/\b(para|por|em|de|do|da|dos|das|um|uma|ou|e|que|com|no|na|nos|nas|ao|aos|as|se)\b/gi, ''))) {
    replacements.push({ strong, definicao });
  }
}

// Aplicar marcacoes
for (const { strong, definicao } of replacements) {
  const escaped = definicao.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(strong:\\s*"${strong}"[^}]*?definicao:\\s*)"${escaped}"`);
  hebContent = hebContent.replace(regex, `$1"[MISTURADO] ${definicao}"`);
  marcados++;
}

writeFileSync(hebPath, hebContent, 'utf8');

console.log(`📊 Resultado:`);
console.log(`  - Total: ${total}`);
console.log(`  - Ja em PT: ${jaPortugues}`);
console.log(`  - Marcados como [MISTURADO]: ${marcados}`);
