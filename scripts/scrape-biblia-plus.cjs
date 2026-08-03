// scripts/scrape-biblia-plus.cjs
// Raspa comentários bíblicos em PT-BR do BibliaPlus.org
// Fontes gratuitas: Calvin, Wesley, Spurgeon, Adam Clarke, Barnes, Gill

const https = require('https');
const http = require('http');

const AUTORES = {
  3: 'Calvin',
  9: 'Spurgeon',
  10: 'Adam Clarke',
  11: 'Wesley',
  12: 'Albert Barnes',
  14: 'Gill'
};

const LIVROS = [
  { nome: 'gn', bibliaPlus: 'genesis', capitulos: 50 },
  { nome: 'ex', bibliaPlus: 'exodus', capitulos: 40 },
  { nome: 'lv', bibliaPlus: 'leviticus', capitulos: 27 },
  { nome: 'nm', bibliaPlus: 'numbers', capitulos: 36 },
  { nome: 'dt', bibliaPlus: 'deuteronomy', capitulos: 34 },
  { nome: 'js', bibliaPlus: 'joshua', capitulos: 24 },
  { nome: 'jz', bibliaPlus: 'judges', capitulos: 21 },
  { nome: 'rt', bibliaPlus: 'ruth', capitulos: 4 },
  { nome: '1sm', bibliaPlus: '1-samuel', capitulos: 31 },
  { nome: '2sm', bibliaPlus: '2-samuel', capitulos: 24 },
  { nome: '1rs', bibliaPlus: '1-kings', capitulos: 22 },
  { nome: '2rs', bibliaPlus: '2-kings', capitulos: 25 },
  { nome: '1cr', bibliaPlus: '1-chronicles', capitulos: 29 },
  { nome: '2cr', bibliaPlus: '2-chronicles', capitulos: 36 },
  { nome: 'ed', bibliaPlus: 'ezra', capitulos: 10 },
  { nome: 'ne', bibliaPlus: 'nehemiah', capitulos: 13 },
  { nome: 'et', bibliaPlus: 'esther', capitulos: 10 },
  { nome: 'jó', bibliaPlus: 'job', capitulos: 42 },
  { nome: 'sl', bibliaPlus: 'psalms', capitulos: 150 },
  { nome: 'pv', bibliaPlus: 'proverbs', capitulos: 31 },
  { nome: 'ec', bibliaPlus: 'ecclesiastes', capitulos: 12 },
  { nome: 'ct', bibliaPlus: 'song-of-solomon', capitulos: 8 },
  { nome: 'is', bibliaPlus: 'isaiah', capitulos: 66 },
  { nome: 'jr', bibliaPlus: 'jeremiah', capitulos: 52 },
  { nome: 'lm', bibliaPlus: 'lamentations', capitulos: 5 },
  { nome: 'ez', bibliaPlus: 'ezekiel', capitulos: 48 },
  { nome: 'dn', bibliaPlus: 'daniel', capitulos: 12 },
  { nome: 'os', bibliaPlus: 'hosea', capitulos: 14 },
  { nome: 'jl', bibliaPlus: 'joel', capitulos: 3 },
  { nome: 'am', bibliaPlus: 'amos', capitulos: 9 },
  { nome: 'ob', bibliaPlus: 'obadiah', capitulos: 1 },
  { nome: 'jn', bibliaPlus: 'jonah', capitulos: 4 },
  { nome: 'mq', bibliaPlus: 'micah', capitulos: 7 },
  { nome: 'na', bibliaPlus: 'nahum', capitulos: 3 },
  { nome: 'hc', bibliaPlus: 'habakkuk', capitulos: 3 },
  { nome: 'sf', bibliaPlus: 'zephaniah', capitulos: 3 },
  { nome: 'ag', bibliaPlus: 'haggai', capitulos: 2 },
  { nome: 'zc', bibliaPlus: 'zechariah', capitulos: 14 },
  { nome: 'ml', bibliaPlus: 'malachi', capitulos: 4 },
  { nome: 'mt', bibliaPlus: 'matthew', capitulos: 28 },
  { nome: 'mc', bibliaPlus: 'mark', capitulos: 16 },
  { nome: 'lc', bibliaPlus: 'luke', capitulos: 24 },
  { nome: 'jo', bibliaPlus: 'john', capitulos: 21 },
  { nome: 'at', bibliaPlus: 'acts', capitulos: 28 },
  { nome: 'rm', bibliaPlus: 'romans', capitulos: 16 },
  { nome: '1co', bibliaPlus: '1-corinthians', capitulos: 16 },
  { nome: '2co', bibliaPlus: '2-corinthians', capitulos: 13 },
  { nome: 'gl', bibliaPlus: 'galatians', capitulos: 6 },
  { nome: 'ef', bibliaPlus: 'ephesians', capitulos: 6 },
  { nome: 'fp', bibliaPlus: 'philippians', capitulos: 4 },
  { nome: 'cl', bibliaPlus: 'colossians', capitulos: 4 },
  { nome: '1ts', bibliaPlus: '1-thessalonians', capitulos: 5 },
  { nome: '2ts', bibliaPlus: '2-thessalonians', capitulos: 3 },
  { nome: '1tm', bibliaPlus: '1-timothy', capitulos: 6 },
  { nome: '2tm', bibliaPlus: '2-timothy', capitulos: 4 },
  { nome: 'tt', bibliaPlus: 'titus', capitulos: 3 },
  { nome: 'flm', bibliaPlus: 'philemon', capitulos: 1 },
  { nome: 'hb', bibliaPlus: 'hebrews', capitulos: 13 },
  { nome: 'tg', bibliaPlus: 'james', capitulos: 5 },
  { nome: '1pe', bibliaPlus: '1-peter', capitulos: 5 },
  { nome: '2pe', bibliaPlus: '2-peter', capitulos: 3 },
  { nome: '1jo', bibliaPlus: '1-john', capitulos: 5 },
  { nome: '2jo', bibliaPlus: '2-john', capitulos: 1 },
  { nome: '3jo', bibliaPlus: '3-john', capitulos: 1 },
  { nome: 'jd', bibliaPlus: 'jude', capitulos: 1 },
  { nome: 'ap', bibliaPlus: 'revelation', capitulos: 22 }
];

function fetch(url) {
  return new Promise((resolve, reject) => {
    const proto = url.startsWith('https') ? https : http;
    const req = proto.get(url, { 
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
      timeout: 15000
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, data }));
    });
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error('timeout')); });
  });
}

function extractText(html) {
  // Remove tags
  let text = html.replace(/<[^>]+>/g, ' ');
  // Decode entities
  text = text.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&nbsp;/g, ' ');
  // Clean whitespace
  text = text.replace(/\s+/g, ' ').trim();
  return text;
}

function extractVersiculos(html) {
  const versiculos = [];
  // Pattern: data-verse="1" ... content
  const verseRegex = /data-verse="(\d+)"[^>]*>([\s\S]*?)(?=data-verse="|$)/gi;
  let match;
  while ((match = verseRegex.exec(html)) !== null) {
    const num = parseInt(match[1]);
    const text = extractText(match[2]);
    if (text.length > 20) {
      versiculos.push({ versiculo: num, texto: text });
    }
  }
  return versiculos;
}

async function scrapeCapitulo(autorId, autorNome, livro, capitulo) {
  const url = `https://www.bibliaplus.org/pt/commentaries/${autorId}/${autorNome.toLowerCase().replace(/\s+/g, '-')}/${livro.bibliaPlus}/${capitulo}`;
  try {
    const { status, data } = await fetch(url);
    if (status !== 200) return [];
    return extractVersiculos(data);
  } catch (e) {
    return [];
  }
}

async function main() {
  const fs = require('fs');
  const comentarios = [];
  let total = 0;
  let erros = 0;
  
  // Start with a few books to test
  const testBooks = LIVROS.slice(0, 3); // Genesis, Exodus, Leviticus
  
  for (const [autorId, autorNome] of Object.entries(AUTORES)) {
    console.log(`\n📖 ${autorNome}...`);
    for (const livro of testBooks) {
      for (let cap = 1; cap <= Math.min(livro.capitulos, 5); cap++) {
        const versiculos = await scrapeCapitulo(parseInt(autorId), autorNome, livro, cap);
        for (const v of versiculos) {
          comentarios.push({
            livro: livro.nome,
            capitulo: cap,
            versiculo: v.versiculo,
            autor: autorNome,
            texto: v.texto,
            tipo: 'teologico'
          });
          total++;
        }
        // Rate limit
        await new Promise(r => setTimeout(r, 500));
      }
    }
  }
  
  console.log(`\n✅ Total: ${total} comentários raspados`);
  fs.writeFileSync('scripts/biblia-plus-raw.json', JSON.stringify(comentarios, null, 2));
  console.log('Salvo em scripts/biblia-plus-raw.json');
}

main().catch(console.error);
