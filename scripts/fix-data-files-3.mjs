import { readFileSync, writeFileSync } from 'fs';

const FILE = 'C:\\Sola Scriptura BR\\src\\data\\estudosTeologicosExpandidos.ts';
let content = readFileSync(FILE, 'utf-8');

// Fix remaining specific patterns
// Ã‰ = double-encoded É
content = content.split('\u00C3\u0089').join('É');
content = content.split('\u00C3\u00A9').join('é');

// Fix all em-dash patterns: â€" = —
content = content.split('\u00E2\u0080\u0094').join('—');
content = content.split('\u00E2\u0080\u0093').join('–');
content = content.split('\u00E2\u0080\u0099').join('\u2019');
content = content.split('\u00E2\u0080\u0098').join('\u2018');
content = content.split('\u00E2\u0080\u009C').join('\u201C');
content = content.split('\u00E2\u0080\u009D').join('\u201D');
content = content.split('\u00E2\u0080\u00A6').join('…');
content = content.split('\u00E2\u0080\u00A2').join('•');

// Fix box drawing characters - replace with simple ASCII alternatives
// â• = double-encoded box drawing
content = content.split('\u00E2\u0094\u0080').join('─');
content = content.split('\u00E2\u0094\u0082').join('│');
content = content.split('\u00E2\u0094\u008C').join('┌');
content = content.split('\u00E2\u0094\u0090').join('┐');
content = content.split('\u00E2\u0094\u0094').join('└');
content = content.split('\u00E2\u0094\u0098').join('┘');
content = content.split('\u00E2\u0094\u009C').join('├');
content = content.split('\u00E2\u0094\u00A4').join('┤');
content = content.split('\u00E2\u0094\u00AC').join('┬');
content = content.split('\u00E2\u0094\u00B4').join('┴');
content = content.split('\u00E2\u0094\u00BC').join('┼');

// Double box drawing
content = content.split('\u00E2\u0095\u0090').join('═');
content = content.split('\u00E2\u0095\u0091').join('║');
content = content.split('\u00E2\u0095\u0094').join('╔');
content = content.split('\u00E2\u0095\u0097').join('╗');
content = content.split('\u00E2\u0095\u009A').join('╚');
content = content.split('\u00E2\u0095\u009D').join('╝');
content = content.split('\u00E2\u0095\u009E').join('╠');
content = content.split('\u00E2\u0095\u00A0').join('╣');
content = content.split('\u00E2\u0095\u00A4').join('╦');
content = content.split('\u00E2\u0095\u00A7').join('╩');
content = content.split('\u00E2\u0095\u00AC').join('╬');

// Final remaining Ã patterns - replace with generic approach
// Ã followed by a char that represents the second byte of a double-encoded char
const remainingBefore = (content.match(/\u00C3/g) || []).length;
const emBefore = (content.match(/\u00E2/g) || []).length;
console.log('Before: ' + remainingBefore + ' Ã, ' + emBefore + ' â');

// One more pass on Ã sequences
content = content.replace(/\u00C3\u0080/g, 'À');
content = content.replace(/\u00C3\u0081/g, 'Á');
content = content.replace(/\u00C3\u0082/g, 'Â');
content = content.replace(/\u00C3\u0083/g, 'Ã');
content = content.replace(/\u00C3\u0084/g, 'Ä');
content = content.replace(/\u00C3\u0085/g, 'Å');
content = content.replace(/\u00C3\u0086/g, 'Æ');
content = content.replace(/\u00C3\u0087/g, 'Ç');
content = content.replace(/\u00C3\u0088/g, 'È');
content = content.replace(/\u00C3\u0089/g, 'É');
content = content.replace(/\u00C3\u008A/g, 'Ê');
content = content.replace(/\u00C3\u008B/g, 'Ë');
content = content.replace(/\u00C3\u008C/g, 'Ì');
content = content.replace(/\u00C3\u008D/g, 'Í');
content = content.replace(/\u00C3\u008E/g, 'Î');
content = content.replace(/\u00C3\u008F/g, 'Ï');
content = content.replace(/\u00C3\u0090/g, 'Ð');
content = content.replace(/\u00C3\u0091/g, 'Ñ');
content = content.replace(/\u00C3\u0092/g, 'Ò');
content = content.replace(/\u00C3\u0093/g, 'Ó');
content = content.replace(/\u00C3\u0094/g, 'Ô');
content = content.replace(/\u00C3\u0095/g, 'Õ');
content = content.replace(/\u00C3\u0096/g, 'Ö');
content = content.replace(/\u00C3\u0097/g, '×');
content = content.replace(/\u00C3\u0098/g, 'Ø');
content = content.replace(/\u00C3\u0099/g, 'Ù');
content = content.replace(/\u00C3\u009A/g, 'Ú');
content = content.replace(/\u00C3\u009B/g, 'Û');
content = content.replace(/\u00C3\u009C/g, 'Ü');
content = content.replace(/\u00C3\u009D/g, 'Ý');
content = content.replace(/\u00C3\u009E/g, 'Þ');
content = content.replace(/\u00C3\u009F/g, 'ß');
content = content.replace(/\u00C3\u00A0/g, 'à');
content = content.replace(/\u00C3\u00A1/g, 'á');
content = content.replace(/\u00C3\u00A2/g, 'â');
content = content.replace(/\u00C3\u00A3/g, 'ã');
content = content.replace(/\u00C3\u00A4/g, 'ä');
content = content.replace(/\u00C3\u00A5/g, 'å');
content = content.replace(/\u00C3\u00A6/g, 'æ');
content = content.replace(/\u00C3\u00A7/g, 'ç');
content = content.replace(/\u00C3\u00A8/g, 'è');
content = content.replace(/\u00C3\u00A9/g, 'é');
content = content.replace(/\u00C3\u00AA/g, 'ê');
content = content.replace(/\u00C3\u00AB/g, 'ë');
content = content.replace(/\u00C3\u00AC/g, 'ì');
content = content.replace(/\u00C3\u00AD/g, 'í');
content = content.replace(/\u00C3\u00AE/g, 'î');
content = content.replace(/\u00C3\u00AF/g, 'ï');
content = content.replace(/\u00C3\u00B0/g, 'ð');
content = content.replace(/\u00C3\u00B1/g, 'ñ');
content = content.replace(/\u00C3\u00B2/g, 'ò');
content = content.replace(/\u00C3\u00B3/g, 'ó');
content = content.replace(/\u00C3\u00B4/g, 'ô');
content = content.replace(/\u00C3\u00B5/g, 'õ');
content = content.replace(/\u00C3\u00B6/g, 'ö');
content = content.replace(/\u00C3\u00B7/g, '÷');
content = content.replace(/\u00C3\u00B8/g, 'ø');
content = content.replace(/\u00C3\u00B9/g, 'ù');
content = content.replace(/\u00C3\u00BA/g, 'ú');
content = content.replace(/\u00C3\u00BB/g, 'û');
content = content.replace(/\u00C3\u00BC/g, 'ü');
content = content.replace(/\u00C3\u00BD/g, 'ý');
content = content.replace(/\u00C3\u00BE/g, 'þ');
content = content.replace(/\u00C3\u00BF/g, 'ÿ');

const remainingAfter = (content.match(/\u00C3/g) || []).length;
const emAfter = (content.match(/\u00E2/g) || []).length;
console.log('After: ' + remainingAfter + ' Ã, ' + emAfter + ' â');

writeFileSync(FILE, content, 'utf-8');
console.log('\n✅ estudosTeologicosExpandidos.ts - terceira passada concluída');

// Verify
const sampleStart = content.indexOf("titulo: 'A Existência");
if (sampleStart > -1) {
  console.log('\n📄 Verificação: ' + content.substring(sampleStart, sampleStart + 100));
}
