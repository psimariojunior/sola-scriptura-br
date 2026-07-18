/**
 * Script para baixar comentários bíblicos reais (Matthew Henry) da API HelloAO
 * Fonte: https://bible.helloao.org
 * 
 * Uso: node scripts/fetch-all-commentaries.mjs
 * 
 * NOTA: Todos os textos permanecem em inglês (idioma original)
 * Tradução será feita separadamente, se necessário.
 */

import { writeFile, mkdir, readFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Mapeamento de códigos de livros da Bíblia (formato HelloAO → formato interno)
const BOOK_MAP = {
  // AT
  'GEN': { nome: 'gn', nomePt: 'Gênesis', capitulos: 50 },
  'EXO': { nome: 'ex', nomePt: 'Êxodo', capitulos: 40 },
  'LEV': { nome: 'lv', nomePt: 'Levítico', capitulos: 27 },
  'NUM': { nome: 'nm', nomePt: 'Números', capitulos: 36 },
  'DEU': { nome: 'dt', nomePt: 'Deuteronômio', capitulos: 34 },
  'JOS': { nome: 'js', nomePt: 'Josué', capitulos: 24 },
  'JDG': { nome: 'jz', nomePt: 'Juízes', capitulos: 21 },
  'RUT': { nome: 'rt', nomePt: 'Rute', capitulos: 4 },
  '1SA': { nome: '1sm', nomePt: '1 Samuel', capitulos: 31 },
  '2SA': { nome: '2sm', nomePt: '2 Samuel', capitulos: 24 },
  '1KI': { nome: '1rs', nomePt: '1 Reis', capitulos: 22 },
  '2KI': { nome: '2rs', nomePt: '2 Reis', capitulos: 25 },
  '1CH': { nome: '1cr', nomePt: '1 Crônicas', capitulos: 29 },
  '2CH': { nome: '2cr', nomePt: '2 Crônicas', capitulos: 36 },
  'EZR': { nome: 'ed', nomePt: 'Esdras', capitulos: 10 },
  'NEH': { nome: 'ne', nomePt: 'Neemias', capitulos: 13 },
  'EST': { nome: 'et', nomePt: 'Ester', capitulos: 10 },
  'JOB': { nome: 'jó', nomePt: 'Jó', capitulos: 42 },
  'PSA': { nome: 'sl', nomePt: 'Salmos', capitulos: 150 },
  'PRO': { nome: 'pv', nomePt: 'Provérbios', capitulos: 31 },
  'ECC': { nome: 'ec', nomePt: 'Eclesiastes', capitulos: 12 },
  'SON': { nome: 'ct', nomePt: 'Cantares', capitulos: 8 },
  'ISA': { nome: 'is', nomePt: 'Isaías', capitulos: 66 },
  'JER': { nome: 'jr', nomePt: 'Jeremias', capitulos: 52 },
  'LAM': { nome: 'lm', nomePt: 'Lamentações', capitulos: 5 },
  'EZE': { nome: 'ez', nomePt: 'Ezequiel', capitulos: 48 },
  'DAN': { nome: 'dn', nomePt: 'Daniel', capitulos: 12 },
  'HOS': { nome: 'os', nomePt: 'Oséias', capitulos: 14 },
  'JOE': { nome: 'jl', nomePt: 'Joel', capitulos: 3 },
  'AMO': { nome: 'am', nomePt: 'Amós', capitulos: 9 },
  'OBA': { nome: 'ob', nomePt: 'Obadias', capitulos: 1 },
  'JON': { nome: 'jn', nomePt: 'Jonas', capitulos: 4 },
  'MIC': { nome: 'mq', nomePt: 'Miquéias', capitulos: 7 },
  'NAH': { nome: 'na', nomePt: 'Naum', capitulos: 3 },
  'HAB': { nome: 'hc', nomePt: 'Habacuque', capitulos: 3 },
  'ZEP': { nome: 'sf', nomePt: 'Sofonias', capitulos: 3 },
  'HAG': { nome: 'ag', nomePt: 'Ageu', capitulos: 2 },
  'ZEC': { nome: 'zc', nomePt: 'Zacarias', capitulos: 14 },
  'MAL': { nome: 'ml', nomePt: 'Malaquias', capitulos: 4 },
  // NT
  'MAT': { nome: 'mt', nomePt: 'Mateus', capitulos: 28 },
  'MARK': { nome: 'mc', nomePt: 'Marcos', capitulos: 16 },
  'LUKE': { nome: 'lc', nomePt: 'Lucas', capitulos: 24 },
  'JOHN': { nome: 'jo', nomePt: 'João', capitulos: 21 },
  'ACTS': { nome: 'at', nomePt: 'Atos', capitulos: 28 },
  'ROM': { nome: 'rm', nomePt: 'Romanos', capitulos: 16 },
  '1CO': { nome: '1co', nomePt: '1 Coríntios', capitulos: 16 },
  '2CO': { nome: '2co', nomePt: '2 Coríntios', capitulos: 13 },
  'GAL': { nome: 'gl', nomePt: 'Gálatas', capitulos: 6 },
  'EPH': { nome: 'ef', nomePt: 'Efésios', capitulos: 6 },
  'PHI': { nome: 'fp', nomePt: 'Filipenses', capitulos: 4 },
  'COL': { nome: 'cl', nomePt: 'Colossenses', capitulos: 4 },
  '1TH': { nome: '1ts', nomePt: '1 Tessalonicenses', capitulos: 5 },
  '2TH': { nome: '2ts', nomePt: '2 Tessalonicenses', capitulos: 3 },
  '1TI': { nome: '1tm', nomePt: '1 Timóteo', capitulos: 6 },
  '2TI': { nome: '2tm', nomePt: '2 Timóteo', capitulos: 4 },
  'TIT': { nome: 'tt', nomePt: 'Tito', capitulos: 3 },
  'PHM': { nome: 'fm', nomePt: 'Filemom', capitulos: 1 },
  'HEB': { nome: 'hb', nomePt: 'Hebreus', capitulos: 13 },
  'JAS': { nome: 'tg', nomePt: 'Tiago', capitulos: 5 },
  '1PE': { nome: '1pe', nomePt: '1 Pedro', capitulos: 5 },
  '2PE': { nome: '2pe', nomePt: '2 Pedro', capitulos: 3 },
  '1JN': { nome: '1jo', nomePt: '1 João', capitulos: 5 },
  '2JN': { nome: '2jo', nomePt: '2 João', capitulos: 1 },
  '3JN': { nome: '3jo', nomePt: '3 João', capitulos: 1 },
  'JUDE': { nome: 'jd', nomePt: 'Judas', capitulos: 1 },
  'REV': { nome: 'ap', nomePt: 'Apocalipse', capitulos: 22 }
};

const API_BASE = 'https://bible.helloao.org/api/c/matthew-henry';
const RAW_DIR = join(__dirname, '..', 'src', 'data', 'comentarios-reais', 'raw');
const RATE_LIMIT_MS = 300;

// Contadores globais
const stats = {
  totalBooks: 0,
  totalChapters: 0,
  totalVerses: 0,
  totalComments: 0,
  errors: []
};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function truncateText(text, maxLen = 500) {
  if (!text || text.length <= maxLen) return text || '';
  return text.substring(0, maxLen - 3) + '...';
}

async function fetchJSON(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    }
    return await res.json();
  } catch (err) {
    return null;
  }
}

function parseCommentary(data, bookCode, bookInfo) {
  const comentarios = [];
  
  // Estrutura da API: data.chapter.content é um array de itens
  // Cada item: { type: "verse", number: N, content: ["texto1", "texto2", ...] }
  if (!data || !data.chapter || !data.chapter.content) return comentarios;
  
  const chapterNumber = data.chapter.number || 1;
  
  for (const item of data.chapter.content) {
    if (item.type === 'verse' && item.number && item.content) {
      // content é um array de strings, juntar todas
      let texto = '';
      if (Array.isArray(item.content)) {
        texto = item.content.join(' ').trim();
      } else if (typeof item.content === 'string') {
        texto = item.content.trim();
      }
      
      if (texto.length > 10) {
        comentarios.push({
          livro: bookInfo.nome,
          capitulo: chapterNumber,
          versiculo: item.number,
          autor: 'Matthew Henry',
          texto: truncateText(texto),
          tipo: 'teologico'
        });
      }
    }
  }
  
  return comentarios;
}

async function fetchBookCommentary(bookCode, bookInfo) {
  const bookComentarios = [];
  let emptyCount = 0;
  
  for (let chapter = 1; chapter <= bookInfo.capitulos; chapter++) {
    const url = `${API_BASE}/${bookCode}/${chapter}.json`;
    
    process.stdout.write(`  Cap ${chapter}/${bookInfo.capitulos}...`);
    
    const data = await fetchJSON(url);
    
    if (data) {
      const parsed = parseCommentary(data, bookCode, bookInfo);
      bookComentarios.push(...parsed);
      
      if (parsed.length > 0) {
        process.stdout.write(` ${parsed.length} versculos\n`);
        emptyCount = 0;
      } else {
        process.stdout.write(' 0\n');
        emptyCount++;
      }
    } else {
      process.stdout.write(' erro\n');
      emptyCount++;
      stats.errors.push(`${bookInfo.nomePt} ${chapter}: falha no fetch`);
    }
    
    stats.totalChapters++;
    
    // Se 3 capítulos seguidos vazios, parar (livro sem comentário)
    if (emptyCount >= 3 && chapter >= 3) {
      // Verificar se realmente não tem mais
      // Continuar mesmo assim para não perder dados
    }
    
    // Rate limiting
    await sleep(RATE_LIMIT_MS);
  }
  
  return bookComentarios;
}

async function saveBookFile(bookCode, bookInfo, comentarios) {
  const fileName = `${bookInfo.nome}-matthew-henry.ts`;
  const filePath = join(RAW_DIR, fileName);
  
  const timestamp = new Date().toISOString();
  
  let content = `// Comentarios reais: Matthew Henry (dominio publico)\n`;
  content += `// Fonte: HelloAO Bible API (https://bible.helloao.org)\n`;
  content += `// Baixado em: ${timestamp}\n`;
  content += `// Livro: ${bookInfo.nomePt}\n`;
  content += `// Total de versiculos com comentario: ${comentarios.length}\n\n`;
  content += `import { Comentario } from '../../comentarios';\n\n`;
  content += `export const comentarios${bookInfo.nome}: Comentario[] = ${JSON.stringify(comentarios, null, 2)};\n`;
  
  await writeFile(filePath, content, 'utf-8');
  return filePath;
}

async function main() {
  console.log('=== Download de Comentarios Biblicos (Matthew Henry) ===');
  console.log(`Fonte: ${API_BASE}`);
  console.log(`Total de livros: ${Object.keys(BOOK_MAP).length}`);
  console.log('');
  
  // Criar diretorio raw se nao existir
  await mkdir(RAW_DIR, { recursive: true });
  
  const bookResults = {};
  const allComentarios = [];
  
  for (const [bookCode, bookInfo] of Object.entries(BOOK_MAP)) {
    console.log(`\n${bookInfo.nomePt} (${bookCode})`);
    
    const comentarios = await fetchBookCommentary(bookCode, bookInfo);
    
    if (comentarios.length > 0) {
      // Salvar arquivo individual
      await saveBookFile(bookCode, bookInfo, comentarios);
      
      bookResults[bookInfo.nome] = {
        nomePt: bookInfo.nomePt,
        capitulos: bookInfo.capitulos,
        comentarios: comentarios.length
      };
      
      allComentarios.push(...comentarios);
      stats.totalBooks++;
      stats.totalVerses += comentarios.length;
      
      console.log(`  OK Total: ${comentarios.length} versiculos`);
    } else {
      console.log(`  Sem comentarios`);
    }
  }
  
  // Salvar indice consolidado
  const indexContent = `// Indice consolidado de comentarios reais (Matthew Henry)
// Gerado automaticamente por scripts/fetch-all-commentaries.mjs
// Data: ${new Date().toISOString()}
// Total: ${allComentarios.length} comentarios em ${stats.totalBooks} livros

import { Comentario } from '../comentarios';

// Re-exporta todos os comentarios por livro
${Object.entries(bookResults).map(([bookName, info]) => 
  `import { comentarios${bookName} } from './raw/${bookName}-matthew-henry';`
).join('\n')}

// Todos os comentarios concatenados
export const todosComentariosReais: Comentario[] = [
${Object.keys(bookResults).map(bookName => 
  `  ...comentarios${bookName}`
).join(',\n')}
];

// Dados por livro
export const comentariosPorLivro: Record<string, Comentario[]> = {
${Object.entries(bookResults).map(([bookName, info]) => 
  `  '${bookName}': comentarios${bookName}`
).join(',\n')}
};

// Estatisticas
export const estatisticasReais = {
  totalComentarios: ${allComentarios.length},
  totalLivros: ${stats.totalBooks},
  dataGeracao: '${new Date().toISOString()}',
  fonte: 'Matthew Henry Commentary (dominio publico)',
  detalhesLivros: ${JSON.stringify(bookResults, null, 2)}
};
`;
  
  await writeFile(join(__dirname, '..', 'src', 'data', 'comentarios-reais', 'index.ts'), indexContent, 'utf-8');
  
  console.log('\n' + '='.repeat(60));
  console.log('RESUMO FINAL');
  console.log('='.repeat(60));
  console.log(`Livros processados: ${stats.totalBooks}/${Object.keys(BOOK_MAP).length}`);
  console.log(`Capitulos buscados: ${stats.totalChapters}`);
  console.log(`Versiculos com comentario: ${stats.totalVerses}`);
  console.log(`Arquivos gerados em: ${RAW_DIR}`);
  
  if (stats.errors.length > 0) {
    console.log(`\nErros (${stats.errors.length}):`);
    stats.errors.slice(0, 10).forEach(e => console.log(`  - ${e}`));
    if (stats.errors.length > 10) {
      console.log(`  ... e mais ${stats.errors.length - 10} erros`);
    }
  }
  
  // Salvar estatisticas em JSON
  await writeFile(
    join(RAW_DIR, 'stats.json'),
    JSON.stringify({ ...stats, bookResults }, null, 2),
    'utf-8'
  );
  
  console.log('\nDownload completo!');
}

main().catch(err => {
  console.error('Erro fatal:', err);
  process.exit(1);
});
