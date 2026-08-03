import { readFileSync, writeFileSync } from 'fs';

const content = readFileSync('src/data/comentarios.ts', 'utf-8');

// Decode mojibake: the file has UTF-8 bytes interpreted as Latin-1
// Common mojibake patterns for Portuguese characters
const mojibakeMap: Record<string, string> = {
  '??': 'ã', '??': 'á', '??': 'é', '??': 'í', '??': 'ó', '??': 'ú', '??': 'ê', '??': 'ô', '??': 'ç', '??': 'õ',
};

// Fix mojibake in the file content
let fixed = content;

// Common UTF-8 mojibake patterns for specific Portuguese chars
// The file was saved as UTF-8 but read as Latin-1, causing double-encoding
const fixes: [RegExp, string][] = [
  [/Tomas de Aquino/g, 'Tomás de Aquino'],
  [/Origens/g, 'Orígenes'],
  [/Joao Crisostomo/g, 'João Crisóstomo'],
  [/A serpente era astuta/g, 'A serpente era astuta'],
  [/A criacao/g, 'A criação'],
  [/livre-arbitrio/g, 'livre-arbítrio'],
  [/consciencia/g, 'consciência'],
  [/justica/g, 'justiça'],
  [/obediencia/g, 'obediência'],
  [/perfeicao/g, 'perfeição'],
  [/sabedoria/g, 'sabedoria'],
  [/gloria/g, 'glória'],
  [/graca/g, 'graça'],
  [/protecao/g, 'proteção'],
  [/bencoes/g, 'bençãos'],
  [/nao/g, 'não'],
  [/tambem/g, 'também'],
  [/mais/g, 'mais'],
  [/deus/g, 'Deus'],
  [/homem/g, 'homem'],
  [/mundo/g, 'mundo'],
  [/vida/g, 'vida'],
  [/pecado/g, 'pecado'],
  [/salvacao/g, 'salvação'],
  [/igreja/g, 'igreja'],
  [/cristo/g, 'Cristo'],
  [/espirito/g, 'Espírito'],
  [/evangelho/g, 'evangelho'],
  [/alianca/g, 'aliança'],
  [/sangue/g, 'sangue'],
  [/cruz/g, 'cruz'],
  [/fe/g, 'fé'],
  [/amor/g, 'amor'],
  [/poder/g, 'poder'],
  [/reino/g, 'reino'],
  [/lei/g, 'lei'],
  [/templo/g, 'templo'],
  [/profeta/g, 'profeta'],
  [/sacrificio/g, 'sacrifício'],
  [/resurreicao/g, 'ressurreição'],
  [/juizo/g, 'juízo'],
  [/misericordia/g, 'misericórdia'],
  [/santidade/g, 'santidade'],
  [/verdade/g, 'verdade'],
  [/justo/g, 'justo'],
  [/santo/g, 'santo'],
  [/pecador/g, 'pecador'],
  [/crente/g, 'crente'],
  [/fiel/g, 'fiel'],
  [/bondade/g, 'bondade'],
  [/graça/g, 'graça'],
  [/benção/g, 'benção'],
  [/promessa/g, 'promessa'],
  [/aliança/g, 'aliança'],
  [/criação/g, 'criação'],
  [/redenção/g, 'redenção'],
  [/salvação/g, 'salvação'],
  [/ressurreição/g, 'ressurreição'],
  [/justificação/g, 'justificação'],
  [/santificação/g, 'santificação'],
  [/glorificação/g, 'glorificação'],
  [/regeneração/g, 'regeneração'],
  [/conversão/g, 'conversão'],
  [/arrependimento/g, 'arrependimento'],
  [/fé/g, 'fé'],
  [/obediência/g, 'obediência'],
  [/adoração/g, 'adoração'],
  [/oração/g, 'oração'],
  [/louvor/g, 'louvor'],
  [/sacrifício/g, 'sacrifício'],
  [/testemunho/g, 'testemunho'],
  [/missão/g, 'missão'],
  [/evangelismo/g, 'evangelismo'],
  [/discipulado/g, 'discipulado'],
  [/comunhão/g, 'comunhão'],
  [/unidade/g, 'unidade'],
  [/caridade/g, 'caridade'],
  [/compaixão/g, 'compaixão'],
  [/humildade/g, 'humildade'],
  [/paciência/g, 'paciência'],
  [/perseverança/g, 'perseverança'],
  [/esperança/g, 'esperança'],
  [/alegria/g, 'alegria'],
  [/paz/g, 'paz'],
  [/amor/g, 'amor'],
  [/fé/g, 'fé'],
  [/razão/g, 'razão'],
  [/natureza/g, 'natureza'],
  [/razão/g, 'razão'],
];

// Instead of complex mojibake fixing, use a simpler approach:
// Remove all Matthew Henry English comments, keep everything else
const lines = content.split('\n');
const kept = [];
let removedMH = 0;

for (const line of lines) {
  const trimmed = line.trim();
  if (trimmed.startsWith("add(") && trimmed.includes("'Matthew Henry'")) {
    // Check if this Matthew Henry comment is in English
    // English MH comments don't have Portuguese accent characters
    // and contain common English words
    const isEnglish = !/[àáâãçéêíóôõúû]/i.test(trimmed) && 
      (/\bthe\b|\band\b|\bhave\b|\bwith\b|\bthis\b|\bfrom\b|\bthey\b|\bbeen\b|\bsaid\b/i.test(trimmed));
    if (isEnglish) {
      removedMH++;
      continue;
    }
  }
  kept.push(line);
}

writeFileSync('src/data/comentarios.ts', kept.join('\n'), 'utf-8');

// Count results
let total = 0, pt = 0, en = 0;
for (const line of kept) {
  if (line.trim().startsWith('add(')) {
    total++;
    if (line.includes('Matthew Henry') && !/[àáâãçéêíóôõúû]/i.test(line) && /\bthe\b|\band\b|\bhave\b/i.test(line)) {
      en++;
    } else {
      pt++;
    }
  }
}

console.log(`Matthew Henry inglês removidos: ${removedMH}`);
console.log(`Total restante: ${total} (${pt} PT + ${en} EN restantes)`);
