import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const filePath = join(process.cwd(), 'src/data/lexicon/grego.ts');
const content = readFileSync(filePath, 'utf8');

// Fix remaining English-only single-word definitions
const fixes = {
  'G1803': { definicao: 'Seis.' },
  'G2537': { definicao: 'Novo, recente.' },
  'G2981': { definicao: 'Linguagem, fala, discurso.' },
  'G3189': { definicao: 'Preto, escuro.' },
  'G3192': { definicao: 'Mel.' },
  'G4081': { definicao: 'Barro, argila.' },
  'G5194': { definicao: 'Vidro.' },
  'G5306': { definicao: 'Depois, em seguida.' },
  'G4671': { definicao: 'Ti, a ti.' },
  'G4771': { definicao: 'Tu, tu mesmo.' },
  'G3786': { definicao: 'Ganho, lucro.' },
  'G3950': { definicao: 'Raiva, ira.' },
  'G3997': { definicao: 'Luto, pranto.' },
  'G4072': { definicao: 'Voar.' },
  'G5507': { definicao: 'Mil.' },
  'G5510': { definicao: 'Neve.' },
  'G5513': { definicao: 'Morno, tépido.' },
  'G5607': { definicao: 'Ser (existir).' },
  'G4626': { definicao: 'Cavar, escavar.' },
  'G4666': { definicao: 'Mirra.' },
  'G4674': { definicao: 'Teu, teus, tua, tuas.' },
  'G1691': { definicao: 'Mim, a mim.' },
  'G1699': { definicao: 'Meu, minha, meus, minhas.' },
  'G3165': { definicao: 'Mim, a mim.' },
  'G3171': { definicao: 'Muito, grandemente.' },
  'G3188': { definicao: 'Tinta, marca.' },
  'G3483': { definicao: 'Sim, verdadeiramente.' },
  'G3514': { definicao: 'Girar, voltar.' },
  'G3628': { definicao: 'Pena, pluma.' },
  'G229': { definicao: 'Sobriedade, temperança.' },
  'G432': { definicao: 'Endro, erva-doce.' },
  'G527': { definicao: 'Suave, brando, mole.' },
  'G977': { definicao: 'Comer, devorar.' },
  'G1004': { definicao: 'Lama, pântano.' },
  'G1028': { definicao: 'Chuva, aguaceiro.' },
  'G1084': { definicao: 'Nascido, gerado.' },
  'G1176': { definicao: 'Dez.' },
  'G1212': { definicao: 'Claro, manifesto.' },
  'G1362': { definicao: 'Duplo, dobrado.' },
  'G1373': { definicao: 'Sede, desejo.' },
  'G1520': { definicao: 'Um, uma, único.' },
  'G1540': { definicao: 'Cem.' },
  'G1623': { definicao: 'Sexto.' },
  'G1766': { definicao: 'Nono.' },
  'G1767': { definicao: 'Nove.' },
  'G2329': { definicao: 'Calor, ardor.' },
  'G2467': { definicao: 'Saber, conhecer.' },
  'G2829': { definicao: 'Roubo, furto.' },
  'G2925': { definicao: 'Bater, ferir.' },
  'G4571': { definicao: 'Ti, você.' },
  'G4604': { definicao: 'Ferro.' },
};

let fixedCount = 0;
let updatedContent = content;

for (const [strong, fix] of Object.entries(fixes)) {
  const strongRegex = new RegExp(
    `(\\{\\s*strong:\\s*'${strong}'[^}]*?)definicao:\\s*'([^']*?)'`,
    'g'
  );

  updatedContent = updatedContent.replace(strongRegex, (match, prefix, oldDef) => {
    fixedCount++;
    return `${prefix}definicao: '${fix.definicao}'`;
  });
}

writeFileSync(filePath, updatedContent, 'utf8');
console.log(`Fixed ${fixedCount} additional entries in grego.ts`);
