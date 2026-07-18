/**
 * Script para merge de todos os comentários (manuais + reais)
 * 
 * Uso: node scripts/merge-all-commentaries.mjs
 * 
 * Lê:
 * - src/data/comentarios.ts (comentários manuais existentes)
 * - src/data/comentarios-reais/raw/*.ts (comentários reais baixados)
 * 
 * Gera:
 * - src/data/comentarios.ts (arquivo consolidado final)
 */

import { readFile, writeFile, readdir } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const COMENTARIOS_PATH = join(__dirname, '..', 'src', 'data', 'comentarios.ts');
const RAW_DIR = join(__dirname, '..', 'src', 'data', 'comentarios-reais', 'raw');
const OUTPUT_PATH = COMENTARIOS_PATH;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function parseExistingComments(content) {
  const comentarios = [];
  const regex = /add\('([^']+)',\s*(\d+),\s*(\d+),\s*'([^']+)',\s*'((?:[^'\\]|\\.)*)',\s*'([^']+)'\)/g;
  let match;
  
  while ((match = regex.exec(content)) !== null) {
    comentarios.push({
      livro: match[1],
      capitulo: parseInt(match[2]),
      versiculo: parseInt(match[3]),
      autor: match[4],
      texto: match[5].replace(/\\'/g, "'"),
      tipo: match[6]
    });
  }
  
  return comentarios;
}

function generateCommentaryKey(c) {
  return `${c.livro}:${c.capitulo}:${c.versiculo}`;
}

async function parseRawFile(filePath) {
  const content = await readFile(filePath, 'utf-8');
  
  // Extrair array de comentários do arquivo TypeScript
  const match = content.match(/export const comentarios[\w\u00C0-\u017F]+: Comentario\[\] = (\[[\s\S]*?\]);/);
  if (!match) return [];
  
  try {
    return JSON.parse(match[1]);
  } catch {
    // Se falhar o JSON, tentar extrair manualmente
    return [];
  }
}

async function main() {
  console.log('=== Merge de Comentários Bíblicos ===\n');
  
  // 1. Ler comentários manuais existentes
  console.log('📖 Lendo comentários manuais existentes...');
  const manualContent = await readFile(COMENTARIOS_PATH, 'utf-8');
  const manualComments = parseExistingComments(manualContent);
  console.log(`   Encontrados: ${manualComments.length} comentários manuais\n`);
  
  // 2. Ler todos os arquivos de comentários reais
  console.log('📚 Lendo comentários reais (Matthew Henry)...');
  const realComments = [];
  let filesProcessed = 0;
  
  try {
    const files = await readdir(RAW_DIR);
    const tsFiles = files.filter(f => f.endsWith('-matthew-henry.ts'));
    
    for (const file of tsFiles) {
      const filePath = join(RAW_DIR, file);
      const comments = await parseRawFile(filePath);
      realComments.push(...comments);
      filesProcessed++;
      
      process.stdout.write(`  📄 ${file}: ${comments.length} versículos\n`);
    }
  } catch (err) {
    console.log('   Diretório raw não encontrado ou vazio');
  }
  
  console.log(`\n   Total de comentários reais: ${realComments.length}\n`);
  
  // 3. Merge sem duplicatas
  console.log('🔄 Merging comentários...');
  
  const allComments = new Map();
  const manualKeys = new Set();
  
  // Adicionar manuais primeiro (prioridade)
  for (const c of manualComments) {
    const key = generateCommentaryKey(c);
    allComments.set(key, c);
    manualKeys.add(key);
  }
  
  // Adicionar reais (sem sobrescrever manuais)
  let addedReal = 0;
  let duplicatesSkipped = 0;
  
  for (const c of realComments) {
    const key = generateCommentaryKey(c);
    
    if (!allComments.has(key)) {
      allComments.set(key, c);
      addedReal++;
    } else {
      duplicatesSkipped++;
    }
  }
  
  console.log(`   Adicionados: ${addedReal} novos comentários reais`);
  console.log(`   Duplicatas ignoradas: ${duplicatesSkipped}`);
  console.log(`   Total final: ${allComments.size}\n`);
  
  // 4. Gerar estatísticas por livro
  const statsByBook = {};
  for (const c of allComments.values()) {
    if (!statsByBook[c.livro]) {
      statsByBook[c.livro] = { manual: 0, real: 0, total: 0 };
    }
    statsByBook[c.livro].total++;
    
    if (manualKeys.has(generateCommentaryKey(c))) {
      statsByBook[c.livro].manual++;
    } else {
      statsByBook[c.livro].real++;
    }
  }
  
  // 5. Gerar código TypeScript
  console.log('⚙️ Gerando arquivo comentarios.ts...');
  
  let output = `// Comentários Bíblicos - Arquivo Consolidado
// Gerado automaticamente por scripts/merge-all-commentaries.mjs
// Data: ${new Date().toISOString()}
// Total: ${allComments.size} comentários (${manualComments.length} manuais + ${addedReal} reais)

export interface Comentario {
  livro: string;
  capitulo: number;
  versiculo: number;
  autor: string;
  texto: string;
  tipo: 'historico' | 'teologico' | 'gramatical' | 'cultural' | 'aplicacao' | 'escatologico';
}

const comentarios: Record<string, Comentario[]> = {};

function chave(livro: string, capitulo: number, versiculo: number): string {
  return \`\${livro}:\${capitulo}:\${versiculo}\`;
}

function add(livro: string, cap: number, v: number, autor: string, texto: string, tipo: Comentario['tipo']) {
  const k = chave(livro, cap, v);
  if (!comentarios[k]) comentarios[k] = [];
  comentarios[k].push({ livro, capitulo: cap, versiculo: v, autor, texto, tipo });
}

`;
  
  // Agrupar por livro para melhor organização
  const commentsByBook = {};
  for (const c of allComments.values()) {
    if (!commentsByBook[c.livro]) {
      commentsByBook[c.livro] = [];
    }
    commentsByBook[c.livro].push(c);
  }
  
  // Ordem dos livros bíblicos
  const bookOrder = [
    'gn', 'ex', 'lv', 'nm', 'dt', 'js', 'jz', 'rt', '1sm', '2sm',
    '1rs', '2rs', '1cr', '2cr', 'ed', 'ne', 'et', 'jó', 'sl', 'pv',
    'ec', 'ct', 'is', 'jr', 'lm', 'ez', 'dn', 'os', 'jl', 'am',
    'ob', 'jn', 'mq', 'na', 'hc', 'sf', 'ag', 'zc', 'ml',
    'mt', 'mc', 'lc', 'jo', 'at', 'rm', '1co', '2co', 'gl', 'ef',
    'fp', 'cl', '1ts', '2ts', '1tm', '2tm', 'tt', 'fm', 'hb', 'tg',
    '1pe', '2pe', '1jo', '2jo', '3jo', 'jd', 'ap'
  ];
  
  for (const book of bookOrder) {
    if (commentsByBook[book]) {
      const stats = statsByBook[book];
      output += `// ${book.toUpperCase()} (${stats.total} comentários)\n`;
      
      for (const c of commentsByBook[book]) {
        // Escapar caracteres especiais no texto para strings TypeScript
        const escapedText = c.texto
          .replace(/\\/g, '\\\\')     // backslashes primeiro
          .replace(/'/g, "\\'")        // aspas simples
          .replace(/\n/g, '\\n')       // quebras de linha
          .replace(/\r/g, '\\r')       // retorno de carro
          .replace(/\t/g, '\\t');      // tab
        output += `add('${c.livro}', ${c.capitulo}, ${c.versiculo}, '${c.autor}', '${escapedText}', '${c.tipo}');\n`;
      }
      
      output += '\n';
    }
  }
  
  output += `export function obterComentarios(livro: string, capitulo: number, versiculo: number): Comentario[] {
  return comentarios[chave(livro, capitulo, versiculo)] || [];
}

export function temComentario(livro: string, capitulo: number, versiculo: number): boolean {
  return chave(livro, capitulo, versiculo) in comentarios;
}

export function obterTodosComentarios(): Comentario[] {
  return Object.values(comentarios).flat();
}

export function obterAutoresComentarios(): string[] {
  const autores = new Set<string>();
  for (const lista of Object.values(comentarios)) {
    for (const c of lista) autores.add(c.autor);
  }
  return [...autores].sort();
}
`;
  
  await writeFile(OUTPUT_PATH, output, 'utf-8');
  
  // 6. Salvar estatísticas detalhadas
  const statsPath = join(RAW_DIR, 'merge-stats.json');
  await writeFile(statsPath, JSON.stringify({
    timestamp: new Date().toISOString(),
    totalManual: manualComments.length,
    totalReal: addedReal,
    totalFinal: allComments.size,
    duplicatesSkipped,
    byBook: statsByBook
  }, null, 2), 'utf-8');
  
  // 7. Exibir estatísticas
  console.log('📊 ESTATÍSTICAS POR LIVRO:');
  console.log('─'.repeat(60));
  console.log(`${'LIVRO'.padEnd(20)} ${'MANUAL'.padStart(10)} ${'REAL'.padStart(10)} ${'TOTAL'.padStart(10)}`);
  console.log('─'.repeat(60));
  
  let totalManual = 0;
  let totalReal = 0;
  
  for (const book of bookOrder) {
    if (statsByBook[book]) {
      const s = statsByBook[book];
      totalManual += s.manual;
      totalReal += s.real;
      console.log(`${book.toUpperCase().padEnd(20)} ${s.manual.toString().padStart(10)} ${s.real.toString().padStart(10)} ${s.total.toString().padStart(10)}`);
    }
  }
  
  console.log('─'.repeat(60));
  console.log(`${'TOTAL'.padEnd(20)} ${totalManual.toString().padStart(10)} ${totalReal.toString().padStart(10)} ${(totalManual + totalReal).toString().padStart(10)}`);
  console.log('─'.repeat(60));
  
  console.log(`\n✅ Merge completo! Arquivo salvo em: ${OUTPUT_PATH}`);
}

main().catch(err => {
  console.error('❌ Erro fatal:', err);
  process.exit(1);
});
