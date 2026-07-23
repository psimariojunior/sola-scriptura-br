import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const BASE = 'C:\\Sola Scriptura BR\\src\\data';

function fixRemaining(text) {
  let result = text;

  // Box drawing characters (double-encoded)
  // â• = 0xE2 0x94 (box drawing) — replace with simple dashes
  result = result.replace(/\u00E2\u0094\u0080/g, '─'); // ─ box drawing light horizontal
  result = result.replace(/\u00E2\u0094\u0082/g, '│'); // │ box drawing light vertical
  result = result.replace(/\u00E2\u0094\u008C/g, '┌'); // ┌
  result = result.replace(/\u00E2\u0094\u0090/g, '┐'); // ┐
  result = result.replace(/\u00E2\u0094\u0094/g, '└'); // └
  result = result.replace(/\u00E2\u0094\u0098/g, '┘'); // ┘
  result = result.replace(/\u00E2\u0094\u009C/g, '├'); // ├
  result = result.replace(/\u00E2\u0094\u00A4/g, '┤'); // ┤
  result = result.replace(/\u00E2\u0094\u00AC/g, '┬'); // ┬
  result = result.replace(/\u00E2\u0094\u00B4/g, '┴'); // ┴
  result = result.replace(/\u00E2\u0094\u00BC/g, '┼'); // ┼

  // Double box drawing (â• = 0xE2 0x95)
  result = result.replace(/\u00E2\u0095\u0090/g, '═'); // ═
  result = result.replace(/\u00E2\u0095\u0091/g, '║'); // ║
  result = result.replace(/\u00E2\u0095\u0094/g, '╔'); // ╔
  result = result.replace(/\u00E2\u0095\u0097/g, '╗'); // ╗
  result = result.replace(/\u00E2\u0095\u009A/g, '╚'); // ╚
  result = result.replace(/\u00E2\u0095\u009D/g, '╝'); // ╝
  result = result.replace(/\u00E2\u0095\u009E/g, '╠'); // ╠
  result = result.replace(/\u00E2\u0095\u00A0/g, '╣'); // ╣
  result = result.replace(/\u00E2\u0095\u00A4/g, '╦'); // ╦
  result = result.replace(/\u00E2\u0095\u00A7/g, '╩'); // ╩
  result = result.replace(/\u00E2\u0095\u00AC/g, '╬'); // ╬

  // General em-dash variants that might have been missed
  result = result.replace(/\u00E2\u0080\u0094/g, '—');
  result = result.replace(/\u00E2\u0080\u0093/g, '–');

  // Remaining Ã sequences - use a broader approach
  // In double-encoded UTF-8, any char with code >= 0xC0 gets Ã prefix
  // Ã (0xC3) followed by second byte of the original char
  const remainingPairs = [
    ['\u00C3\u00A9', 'é'],  // é
    ['\u00C3\u00AA', 'ê'],  // ê
    ['\u00C3\u00A3', 'ã'],  // ã
    ['\u00C3\u00A7', 'ç'],  // ç
    ['\u00C3\u00B3', 'ó'],  // ó
    ['\u00C3\u00BA', 'ú'],  // ú
    ['\u00C3\u00AD', 'í'],  // í
    ['\u00C3\u00A1', 'á'],  // á
    ['\u00C3\u00A2', 'â'],  // â
    ['\u00C3\u00B5', 'õ'],  // õ
    ['\u00C3\u00A0', 'à'],  // à
    ['\u00C3\u00BC', 'ü'],  // ü
    ['\u00C3\u00B4', 'ô'],  // ô
    ['\u00C3\u00BB', 'û'],  // û
    ['\u00C3\u00AB', 'ë'],  // ë
    ['\u00C3\u00B6', 'ö'],  // ö
    ['\u00C3\u00AE', 'î'],  // î
    ['\u00C3\u00AC', 'ì'],  // ì
    ['\u00C3\u00C9', 'É'],  // É
    ['\u00C3\u0089', 'É'],  // É (capital)
    ['\u00C3\u0081', 'Á'],  // Á
    ['\u00C3\u0093', 'Ó'],  // Ó
    ['\u00C3\u009A', 'Ú'],  // Ú
    ['\u00C3\u008D', 'Í'],  // Í
    ['\u00C3\u0083', 'Ã'],  // Ã
    ['\u00C3\u0087', 'Ç'],  // Ç
    ['\u00C3\u0082', 'Â'],  // Â
    ['\u00C3\u0095', 'Õ'],  // Õ
    ['\u00C3\u0080', 'À'],  // À
    ['\u00C3\u009C', 'Ü'],  // Ü
    ['\u00C3\u0094', 'Ô'],  // Ô
    ['\u00C3\u008A', 'Ê'],  // Ê
    ['\u00C3\u009B', 'Û'],  // Û
    ['\u00C3\u008B', 'Ë'],  // Ë
    ['\u00C3\u0096', 'Ö'],  // Ö
    ['\u00C3\u008E', 'Î'],  // Î
    ['\u00C3\u008C', 'Ì'],  // Ì
    ['\u00C3\u0099', 'Ù'],  // Ù
    ['\u00C3\u0098', 'Ø'],  // Ø
    ['\u00C3\u0091', 'Ñ'],  // Ñ
  ];

  for (const [from, to] of remainingPairs) {
    result = result.split(from).join(to);
  }

  // Also handle the generic pattern: Ã + char that represents a Latin-1 byte
  result = result.replace(/\u00C3([\u0080-\u00BF])/g, (match, p1) => {
    // This is a double-encoded char where the second byte is in the range 0x80-0xBF
    // These are continuation bytes in UTF-8, so they represent the upper half of Latin-1
    const byte = p1.charCodeAt(0);
    // Map common continuation bytes to their correct chars
    const map = {
      0x80: 'À', 0x81: 'Á', 0x82: 'Â', 0x83: 'Ã', 0x84: 'Ä',
      0x85: 'Å', 0x86: 'Æ', 0x87: 'Ç', 0x88: 'È', 0x89: 'É',
      0x8A: 'Ê', 0x8B: 'Ë', 0x8C: 'Ì', 0x8D: 'Í', 0x8E: 'Î',
      0x8F: 'Ï', 0x90: 'Ð', 0x91: 'Ñ', 0x92: 'Ò', 0x93: 'Ó',
      0x94: 'Ô', 0x95: 'Õ', 0x96: 'Ö', 0x97: '×', 0x98: 'Ø',
      0x99: 'Ù', 0x9A: 'Ú', 0x9B: 'Û', 0x9C: 'Ü', 0x9D: 'Ý',
      0x9E: 'Þ', 0x9F: 'ß', 0xA0: 'à', 0xA1: 'á', 0xA2: 'â',
      0xA3: 'ã', 0xA4: 'ä', 0xA5: 'å', 0xA6: 'æ', 0xA7: 'ç',
      0xA8: 'è', 0xA9: 'é', 0xAA: 'ê', 0xAB: 'ë', 0xAC: 'ì',
      0xAD: 'í', 0xAE: 'î', 0xAF: 'ï', 0xB0: 'ð', 0xB1: 'ñ',
      0xB2: 'ò', 0xB3: 'ó', 0xB4: 'ô', 0xB5: 'õ', 0xB6: 'ö',
      0xB7: '÷', 0xB8: 'ø', 0xB9: 'ù', 0xBA: 'ú', 0xBB: 'û',
      0xBC: 'ü', 0xBD: 'ý', 0xBE: 'þ', 0xBF: 'ÿ',
    };
    return map[byte] || match;
  });

  return result;
}

// ===== Fix estudosTeologicosExpandidos.ts =====
console.log('🔧 Segunda passada em estudosTeologicosExpandidos.ts...');
const FILE = join(BASE, 'estudosTeologicosExpandidos.ts');
const content = readFileSync(FILE, 'utf-8');

const before = (content.match(/\u00C3/g) || []).length;
const boxBefore = (content.match(/\u00E2\u0094/g) || []).length;
console.log('   Antes: ' + before + ' Ã, ' + boxBefore + ' â•');

const fixed = fixRemaining(content);

const after = (fixed.match(/\u00C3/g) || []).length;
const boxAfter = (fixed.match(/\u00E2\u0094/g) || []).length;
console.log('   Depois: ' + after + ' Ã, ' + boxAfter + ' â•');

writeFileSync(FILE, fixed, 'utf-8');
console.log('✅ estudosTeologicosExpandidos.ts corrigido');

// Check a sample line
const sample = fixed.substring(fixed.indexOf("titulo: 'A Existência"), fixed.indexOf("titulo: 'A Existência") + 200);
console.log('\n📄 Amostra: ' + sample);
