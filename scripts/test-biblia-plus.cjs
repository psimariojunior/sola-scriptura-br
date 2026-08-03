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
  console.log('Length:', data.length);
  
  const verses = data.match(/data-verse/g);
  console.log('Verse markers:', verses ? verses.length : 0);
  
  const paras = data.match(/<p>/gi);
  console.log('Paragraphs:', paras ? paras.length : 0);
  
  // Find the actual content area
  const contentArea = data.match(/class="[^"]*commentary[^"]*"/gi);
  console.log('Commentary class:', contentArea ? contentArea.length : 0);
  
  // Try to find verse numbers in the text
  const verseNums = data.match(/\b\d+\b/g);
  console.log('Numbers found:', verseNums ? verseNums.length : 0);
  
  // Show a snippet of the main content
  const bodyStart = data.indexOf('<body');
  if (bodyStart > -1) {
    const snippet = data.substring(bodyStart, bodyStart + 2000);
    console.log('\n--- BODY SNIPPET ---');
    console.log(snippet);
  }
}

main().catch(console.error);
