import { readFileSync, writeFileSync } from 'fs';

const FILE = 'C:\\Sola Scriptura BR\\src\\data\\estudosTeologicosExpandidos.ts';
const buf = readFileSync(FILE);

console.log('Tamanho original:', buf.length, 'bytes');

// The mojibake in this file is:
// Original UTF-8 bytes → read as Latin-1 → written as UTF-8
// This means each original byte becomes a separate character

// Strategy: find specific mojibake byte patterns and replace them
// with the correct UTF-8 bytes

// Pattern 1: "â€"" which is the mojibake for em-dash (—)
// The mojibake "â€"" = bytes: c3 a2 e2 82 ac e2 80 94
// But wait, let me check what the actual bytes are in the file
// by looking at a known em-dash position

// First, let me find the actual pattern by looking at the string content
const content = buf.toString('utf-8');

// Find "â€"" in the string (this is how it appears in the string)
const emDashMojibake = content.indexOf('\u00E2\u0080\u0094');
console.log('Em-dash pattern (â€") found at string index:', emDashMojibake);

if (emDashMojibake > -1) {
  // Get the bytes at this position
  // The string index might not map directly to byte position due to multi-byte chars
  // Let me search for the byte pattern instead

  // Search for the byte pattern that represents "â€""
  // â = c3 a2, € = e2 82 ac, " = not sure
  // Actually, "â€"" in the file is likely just the 5 bytes: c3 a2 e2 80 94
  // because that's how the double-encoded em-dash appears

  // Let me search byte by byte
  let found = false;
  for (let i = 0; i < buf.length - 4; i++) {
    if (buf[i] === 0xC3 && buf[i+1] === 0xA2 && buf[i+2] === 0xE2 && buf[i+3] === 0x80 && buf[i+4] === 0x94) {
      console.log('Found 5-byte em-dash mojibake at byte position:', i);
      found = true;
      break;
    }
  }

  if (!found) {
    // Maybe it's a different pattern
    // Let me check what bytes are near a known "â€"" string position
    // by converting string position to approximate byte position
    let bytePos = 0;
    for (let i = 0; i < emDashMojibake && i < content.length; i++) {
      const code = content.charCodeAt(i);
      if (code < 0x80) bytePos += 1;
      else if (code < 0x800) bytePos += 2;
      else bytePos += 3;
    }
    console.log('Approximate byte position:', bytePos);
    console.log('Bytes around that position:', buf.slice(Math.max(0, bytePos-5), bytePos+10).toString('hex'));
  }
}

// Let me just check the file for ALL different byte patterns that look like mojibake
// by finding sequences that don't make sense as valid UTF-8
console.log('\nChecking for various mojibake patterns...');

// Check for â€ (c3 a2 e2 82 ac = the euro mojibake)
let euroCount = 0;
for (let i = 0; i < buf.length - 4; i++) {
  if (buf[i] === 0xC3 && buf[i+1] === 0xA2 && buf[i+2] === 0xE2 && buf[i+3] === 0x82 && buf[i+4] === 0xAC) {
    euroCount++;
  }
}
console.log('â€ (euro mojibake) count:', euroCount);

// Check for â€" (c3 a2 e2 80 94 = em-dash mojibake)
let emCount = 0;
for (let i = 0; i < buf.length - 4; i++) {
  if (buf[i] === 0xC3 && buf[i+1] === 0xA2 && buf[i+2] === 0xE2 && buf[i+3] === 0x80 && buf[i+4] === 0x94) {
    emCount++;
  }
}
console.log('â€" (em-dash mojibake) count:', emCount);

// Check for â€™ (c3 a2 e2 80 99 = right single quote mojibake)
let quoteCount = 0;
for (let i = 0; i < buf.length - 4; i++) {
  if (buf[i] === 0xC3 && buf[i+1] === 0xA2 && buf[i+2] === 0xE2 && buf[i+3] === 0x80 && buf[i+4] === 0x99) {
    quoteCount++;
  }
}
console.log('â€™ (right quote mojibake) count:', quoteCount);

// Check for â€¦ (c3 a2 e2 80 a6 = ellipsis mojibake)
let ellipsisCount = 0;
for (let i = 0; i < buf.length - 4; i++) {
  if (buf[i] === 0xC3 && buf[i+1] === 0xA2 && buf[i+2] === 0xE2 && buf[i+3] === 0x80 && buf[i+4] === 0xA6) {
    ellipsisCount++;
  }
}
console.log('â€¦ (ellipsis mojibake) count:', ellipsisCount);

// Check for â€œ (c3 a2 e2 80 9c = left double quote mojibake)
let leftQuoteCount = 0;
for (let i = 0; i < buf.length - 4; i++) {
  if (buf[i] === 0xC3 && buf[i+1] === 0xA2 && buf[i+2] === 0xE2 && buf[i+3] === 0x80 && buf[i+4] === 0x9C) {
    leftQuoteCount++;
  }
}
console.log('â€œ (left double quote mojibake) count:', leftQuoteCount);

// Check for â€ (c3 a2 e2 82 ac = euro sign mojibake)
let euroSign = 0;
for (let i = 0; i < buf.length - 4; i++) {
  if (buf[i] === 0xC3 && buf[i+1] === 0xA2 && buf[i+2] === 0xE2 && buf[i+3] === 0x82 && buf[i+4] === 0xAC) {
    euroSign++;
  }
}
console.log('â€ (euro sign mojibake) count:', euroSign);

// Check for â€¢ (c3 a2 e2 80 a2 = bullet mojibake)
let bulletCount = 0;
for (let i = 0; i < buf.length - 4; i++) {
  if (buf[i] === 0xC3 && buf[i+1] === 0xA2 && buf[i+2] === 0xE2 && buf[i+3] === 0x80 && buf[i+4] === 0xA2) {
    bulletCount++;
  }
}
console.log('â€¢ (bullet mojibake) count:', bulletCount);

// Check for box drawing mojibake (â• = c3 a2 e2 94)
let boxCount = 0;
for (let i = 0; i < buf.length - 3; i++) {
  if (buf[i] === 0xC3 && buf[i+1] === 0xA2 && buf[i+2] === 0xE2 && buf[i+3] === 0x94) {
    boxCount++;
  }
}
console.log('â• (box drawing mojibake) count:', boxCount);
