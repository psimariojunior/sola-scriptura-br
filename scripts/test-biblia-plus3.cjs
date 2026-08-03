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
  
  // Search for Portuguese text that looks like commentary
  const ptTextPattern = /[A-ZÁÉÍÓÚÇÃÕÊ][a-záéíóúçãõê]+(?:\s+[a-záéíóúçãõê]+){5,}/g;
  const matches = [];
  let match;
  while ((match = ptTextPattern.exec(data)) !== null) {
    if (match[0].length > 50) {
      matches.push({ index: match.index, text: match[0] });
    }
  }
  
  console.log('Long Portuguese text segments:', matches.length);
  for (const m of matches.slice(0, 10)) {
    console.log(`\n[${m.index}]: ${m.text.substring(0, 200)}`);
  }
  
  // Look for specific Calvin verse references
  const calvinRef = data.match(/Gênesis\s+\d+:\d+/gi) || data.match(/Genesis\s+\d+:\d+/gi);
  console.log('\nCalvin verse refs:', calvinRef ? calvinRef.length : 0);
  if (calvinRef) {
    for (const ref of calvinRef.slice(0, 5)) {
      console.log('  ', ref);
    }
  }
  
  // Try to find the main content div
  const mainContent = data.match(/<main[\s\S]*?<\/main>/i);
  console.log('\nMain tag:', mainContent ? 'found' : 'not found');
  
  // Look for article or section tags
  const article = data.match(/<article[\s\S]*?<\/article>/i);
  console.log('Article tag:', article ? 'found' : 'not found');
  
  // Get all divs with class
  const divClasses = data.match(/<div[^>]*class="[^"]*"/gi);
  console.log('\nDiv classes with content-related names:');
  if (divClasses) {
    for (const div of divClasses) {
      if (div.match(/content|text|body|comment|verse|chapter/i)) {
        console.log('  ', div);
      }
    }
  }
}

main().catch(console.error);
