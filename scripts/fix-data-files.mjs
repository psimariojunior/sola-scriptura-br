import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const BASE = 'C:\\Sola Scriptura BR\\src\\data';

function fixMojibakePatterns(text) {
  let result = text;

  // Em dash and quotes (do these FIRST before Ã replacements)
  result = result.replace(/\u00E2\u0080\u0094/g, '—');
  result = result.replace(/\u00E2\u0080\u0093/g, '–');
  result = result.replace(/\u00E2\u0080\u0099/g, '\u2019');
  result = result.replace(/\u00E2\u0080\u0098/g, '\u2018');
  result = result.replace(/\u00E2\u0080\u009C/g, '\u201C');
  result = result.replace(/\u00E2\u0080\u009D/g, '\u201D');
  result = result.replace(/\u00E2\u0080\u00A6/g, '…');
  result = result.replace(/\u00E2\u0080\u00A2/g, '•');

  // Double-encoded UTF-8 sequences: Ã followed by second byte
  // Portuguese accented lowercase
  result = result.replace(/\u00C3\u00A3/g, 'ã');
  result = result.replace(/\u00C3\u00A7/g, 'ç');
  result = result.replace(/\u00C3\u00AA/g, 'ê');
  result = result.replace(/\u00C3\u00A1/g, 'á');
  result = result.replace(/\u00C3\u00AD/g, 'í');
  result = result.replace(/\u00C3\u00B3/g, 'ó');
  result = result.replace(/\u00C3\u00BA/g, 'ú');
  result = result.replace(/\u00C3\u00A2/g, 'â');
  result = result.replace(/\u00C3\u00B5/g, 'õ');
  result = result.replace(/\u00C3\u00A0/g, 'à');
  result = result.replace(/\u00C3\u00BC/g, 'ü');
  result = result.replace(/\u00C3\u00B4/g, 'ô');

  // Portuguese accented uppercase
  result = result.replace(/\u00C3\u0083/g, 'Ã');
  result = result.replace(/\u00C3\u0087/g, 'Ç');
  result = result.replace(/\u00C3\u0089/g, 'É');
  result = result.replace(/\u00C3\u0081/g, 'Á');
  result = result.replace(/\u00C3\u008D/g, 'Í');
  result = result.replace(/\u00C3\u0093/g, 'Ó');
  result = result.replace(/\u00C3\u009A/g, 'Ú');
  result = result.replace(/\u00C3\u0082/g, 'Â');
  result = result.replace(/\u00C3\u0095/g, 'Õ');
  result = result.replace(/\u00C3\u0080/g, 'À');
  result = result.replace(/\u00C3\u009C/g, 'Ü');
  result = result.replace(/\u00C3\u0094/g, 'Ô');
  result = result.replace(/\u00C3\u008A/g, 'Ê');
  result = result.replace(/\u00C3\u009B/g, 'Û');

  // Handle remaining Ã sequences using regex pattern matching
  // Ã (0xC3) followed by various byte patterns
  const charMap = {
    '\u00A3': 'ã', '\u00A7': 'ç', '\u00AA': 'ê', '\u00A1': 'á',
    '\u00B3': 'ó', '\u00BA': 'ú', '\u00BC': 'ü', '\u00B4': 'ô',
    '\u00A2': 'â', '\u00B5': 'õ', '\u00A0': 'à', '\u00AD': 'í',
  };

  result = result.replace(/\u00C3([\u00A0-\u00BF])/g, (match, p1) => {
    return charMap[p1] || match;
  });

  return result;
}

// ===== Fix estudosTeologicosExpandidos.ts =====
console.log('🔧 Processando estudosTeologicosExpandidos.ts...');
const MOJIBAKE_FILE = join(BASE, 'estudosTeologicosExpandidos.ts');
const content = readFileSync(MOJIBAKE_FILE, 'utf-8');

const mojibakeBefore = (content.match(/\u00C3/g) || []).length;
const emDashBefore = (content.match(/\u00E2\u0080/g) || []).length;
console.log('   Antes: ' + mojibakeBefore + ' ocorrências de Ã, ' + emDashBefore + ' de â€');

const fixed = fixMojibakePatterns(content);

const mojibakeFinal = (fixed.match(/\u00C3/g) || []).length;
const emDashFinal = (fixed.match(/\u00E2\u0080/g) || []).length;

writeFileSync(MOJIBAKE_FILE, fixed, 'utf-8');
console.log('   Depois: ' + mojibakeFinal + ' ocorrências de Ã, ' + emDashFinal + ' de â€');
console.log('✅ estudosTeologicosExpandidos.ts corrigido (' + (mojibakeBefore - mojibakeFinal) + ' sequências removidas)');

// ===== Fix angelologia.ts =====
console.log('\n🔧 Processando manuais/angelologia.ts...');
const ANGEL_FILE = join(BASE, 'manuais', 'angelologia.ts');
const angelContent = readFileSync(ANGEL_FILE, 'utf-8');
let angelFixed = angelContent;

const angelPairs = [
  ['Nao ', 'Não '], ['Nao,', 'Não,'], ['Nao.', 'Não.'],
  ['Sao ', 'São '], ['Sao,', 'São,'],
  ['Demonios', 'Demônios'], ['demonios', 'demônios'], ['demonio', 'demônio'],
  ['Demonio', 'Demônio'],
  ['espiritos', 'espíritos'], ['espirito', 'espírito'],
  ['Espirito', 'Espírito'],
  ['Comissao', 'Comissão'], ['comissao', 'comissão'],
  ['Tomas', 'Tomás'],
  ['Escolastica', 'Escolástica'], ['escolastica', 'escolástica'],
  ['Isaias', 'Isaías'],
  ['Satanas', 'Satanás'], ['satanas', 'Satanás'],
  ['organizacao', 'organização'], ['Organizacao', 'Organização'],
  ['protecao', 'proteção'], ['Protecao', 'Proteção'],
  ['aparencia', 'aparência'], ['Aparencia', 'Aparência'],
  ['propria', 'própria'], ['Propria', 'Própria'],
  ['ceus', 'céus'], ['Ceus', 'Céus'],
  ['entao', 'então'], ['Entao', 'Então'],
  ['tambem', 'também'], ['Tambem', 'Também'],
  ['nao', 'não'],
  ['ja', 'já'],
  ['ate', 'até'],
  ['alem', 'além'],
  ['ira', 'irá'],
  ['tera', 'terá'], ['vivera', 'viverá'], ['sera', 'será'],
  ['estara', 'estará'],
  ['irmao', 'irmão'], ['irmaos', 'irmãos'],
  ['coracao', 'coração'],
  ['nacao', 'nação'], ['nacoes', 'nações'],
  ['justica', 'justiça'], ['graca', 'graça'],
  ['experiencia', 'experiência'],
  ['obediencia', 'obediência'],
  ['consciencia', 'consciência'],
  ['perseveranca', 'perseverança'],
  ['esperanca', 'esperança'], ['paciencia', 'paciência'],
  ['gloria', 'glória'], ['perdao', 'perdão'],
  ['agua', 'água'], ['alianca', 'aliança'],
  ['profundidade', 'profundidade'], ['eternidade', 'eternidade'],
  ['divindade', 'divindade'], ['humanidade', 'humanidade'],
  ['soberania', 'soberania'], ['santidade', 'santidade'],
  ['bondade', 'bondade'], ['verdade', 'verdade'],
  ['liberdade', 'liberdade'], ['pureza', 'pureza'],
  ['humildade', 'humildade'], ['poder', 'poder'],
  ['amor', 'amor'], ['paz', 'paz'], ['vida', 'vida'],
  ['morte', 'morte'], ['pecado', 'pecado'],
  ['salvacao', 'salvação'], ['justificacao', 'justificação'],
  ['santificacao', 'santificação'], ['redencao', 'redenção'],
  ['glorificacao', 'glorificação'], ['ressurreicao', 'ressurreição'],
  ['trindade', 'trindade'], ['encarnacao', 'encarnação'],
  ['transfiguracao', 'transfiguração'], ['ascensao', 'ascensão'],
  ['intercessao', 'intercessão'], ['predestinacao', 'predestinação'],
  ['eleicao', 'eleição'], ['adocao', 'adão'],
  ['criacao', 'criação'], ['consagracao', 'consagração'],
  ['reconciliacao', 'reconciliação'], ['comunhao', 'comunhão'],
  ['maldicao', 'maldição'], ['bendicao', 'bênção'],
  ['lamentacao', 'lamentação'], ['adoracao', 'adoração'],
  ['exaltacao', 'exaltação'], ['saudacoes', 'saudações'],
  ['instrucoes', 'instruções'], ['opcoes', 'opções'],
  ['direcoes', 'direções'], ['oracoes', 'orações'],
  ['explicacoes', 'explicações'], ['aplicacoes', 'aplicações'],
  ['interpretacoes', 'interpretações'],
  ['trabalhador', 'trabalhador'], ['trabalhadores', 'trabalhadores'],
  ['conhecimento', 'conhecimento'], ['sabedoria', 'sabedoria'],
  ['caridade', 'caridade'], ['fidelidade', 'fidelidade'],
  ['igreja', 'igreja'], ['evangelho', 'evangelho'],
  ['cristo', 'Cristo'], ['deus', 'Deus'],
  ['terra', 'terra'], ['mundo', 'mundo'],
  ['homem', 'homem'], ['mulher', 'mulher'],
  ['filho', 'filho'], ['pai', 'pai'],
  ['rei', 'rei'], ['povo', 'povo'],
  ['cidade', 'cidade'], ['casa', 'casa'],
  ['caminho', 'caminho'], ['luz', 'luz'],
  ['carne', 'carne'], ['sangue', 'sangue'],
  ['dor', 'dor'], ['alegria', 'alegria'],
  ['comida', 'comida'], ['lei', 'Lei'],
  ['promessa', 'promessa'], ['alianca', 'aliança'],
  ['reino', 'reino'], ['forca', 'força'],
];

for (const [from, to] of angelPairs) {
  angelFixed = angelFixed.split(from).join(to);
}

writeFileSync(ANGEL_FILE, angelFixed, 'utf-8');
console.log('✅ manuais/angelologia.ts corrigido');

// ===== Fix estudosTeologicos.ts (Chinese chars) =====
console.log('\n🔧 Processando estudosTeologicos.ts...');
const TEOLOGICOS_FILE = join(BASE, 'estudosTeologicos.ts');
const teologicosContent = readFileSync(TEOLOGICOS_FILE, 'utf-8');
let teologicosFixed = teologicosContent;

teologicosFixed = teologicosFixed.replace(/瞬间/g, 'instantâneo');
teologicosFixed = teologicosFixed.replace(/十字架/g, 'cruz');
teologicosFixed = teologicosFixed.replace(/参与/g, 'participação');
teologicosFixed = teologicosFixed.replace(/匿名/g, 'anônima');
teologicosFixed = teologicosFixed.replace(/实践/g, 'prática');
teologicosFixed = teologicosFixed.replace(/participation/g, 'participação');

writeFileSync(TEOLOGICOS_FILE, teologicosFixed, 'utf-8');
console.log('✅ estudosTeologicos.ts corrigido');

// ===== Fix estudosCapitulo.ts =====
console.log('\n🔧 Processando estudosCapitulo.ts...');
const CAPITULO_FILE = join(BASE, 'estudosCapitulo.ts');
const capitulosContent = readFileSync(CAPITULO_FILE, 'utf-8');
let capitulosFixed = capitulosContent;

const capPairs = [
  ['Criacao', 'Criação'], ['criacao', 'criação'],
  ['Desobediencia', 'Desobediência'], ['desobediencia', 'desobediência'],
  ['Consequencia', 'Consequência'], ['consequencia', 'consequência'],
];

for (const [from, to] of capPairs) {
  capitulosFixed = capitulosFixed.split(from).join(to);
}

writeFileSync(CAPITULO_FILE, capitulosFixed, 'utf-8');
console.log('✅ estudosCapitulo.ts corrigido');

console.log('\n📊 Todos os arquivos de dados corrigidos!');
