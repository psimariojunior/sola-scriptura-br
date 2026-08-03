const https = require('https');

function fetch(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { 
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
      timeout: 15000
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetch(res.headers.location).then(resolve).catch(reject);
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, data }));
    });
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error('timeout')); });
  });
}

async function main() {
  const { status, data } = await fetch('https://www.bibliaplus.org/pt/commentaries/3/comentario-biblico-de-joao-calvino/genesis/1');
  console.log('Status:', status);
  
  // Look for script tags with data
  const scripts = data.match(/<script[^>]*>([\s\S]*?)<\/script>/gi);
  console.log('Script tags:', scripts ? scripts.length : 0);
  
  // Look for JSON data in scripts
  if (scripts) {
    for (let i = 0; i < scripts.length; i++) {
      const script = scripts[i];
      if (script.includes('commentary') || script.includes('verse') || script.includes('comentario')) {
        console.log(`\nScript ${i} contains commentary data:`, script.substring(0, 500));
      }
    }
  }
  
  // Look for x-data attributes (Alpine.js)
  const xData = data.match(/x-data="[^"]*"/gi);
  console.log('\nAlpine.js x-data:', xData ? xData.length : 0);
  if (xData) {
    for (const xd of xData.slice(0, 5)) {
      console.log('  ', xd.substring(0, 200));
    }
  }
  
  // Look for verse numbers in specific patterns
  const versePatterns = [
    /versiculo[s]?\s*[=:]\s*\[/gi,
    /"versiculo[s]?"\s*:/gi,
    /\d+\s*-\s*\d+/g,
    /v\.\s*\d+/gi,
  ];
  
  for (const pattern of versePatterns) {
    const matches = data.match(pattern);
    console.log(`Pattern ${pattern}:`, matches ? matches.length : 0);
  }
  
  // Find where the actual content starts
  const contentMarkers = ['comentario', 'commentary', 'verse', 'texto', 'content', 'body-text'];
  for (const marker of contentMarkers) {
    const idx = data.toLowerCase().indexOf(marker);
    if (idx > -1) {
      console.log(`\nFound "${marker}" at index ${idx}:`);
      console.log(data.substring(Math.max(0, idx - 100), idx + 300));
      break;
    }
  }
}

main().catch(console.error);
