import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const BASE = 'C:\\Sola Scriptura BR\\src\\app\\estudos';

const FILES = [
  'genesis/page.tsx',
  'romanos/page.tsx',
  'joao/page.tsx',
  'apocalipse/page.tsx',
  'atos/page.tsx',
  'efesios/page.tsx',
  'salmos/page.tsx',
  'proverbios/page.tsx',
  '1corintios/page.tsx',
  'filipenses/page.tsx',
];

// Final corrections
const FIXES = [
  // Fix wrong "é" that should be "e" (conjunction)
  ['os ceus é a terra', 'os céus e a terra'],
  ['do barro é a mulher', 'do barro e a mulher'],
  ['a arte é a metalurgia', 'a arte e a metalurgia'],
  ['Humana é o Dilúvio', 'Humana e o Dilúvio'],
  ['arco-iris é o sinal', 'arco-íris é o sinal'],

  // Fix wrong accents introduced by first script
  ['féito', 'feito'],
  ['manifésta', 'manifesta'],

  // Missing accents
  ['arco-iris', 'arco-íris'],
  ['coracao', 'coração'],
  ['confianca', 'confiança'],
  ['intervencao', 'intervenção'],
  ['seguranca', 'segurança'],
  ['proprio', 'próprio'],
  ['semelhaca', 'semelhança'],
  ['tribulacoes', 'tribulações'],
  ['angustia', 'angústia'],
  ['perseguiçao', 'perseguição'],
  ['obrigacao', 'obrigação'],
  ['consagracao', 'consagração'],
  ['renovacao', 'renovação'],
  ['conformidade', 'conformidade'],
  ['justificacao', 'justificação'],
  ['santificacao', 'santificação'],
  ['redencao', 'redenção'],
  ['glorificacao', 'glorificação'],
  ['reconciliacao', 'reconciliação'],
  ['maldicao', 'maldição'],
  ['bendicao', 'bênção'],
  ['lamentacao', 'lamentação'],
  ['exaltacao', 'exaltação'],
  ['adoracao', 'adoração'],
  ['comunhao', 'comunhão'],
  ['oracoes', 'orações'],
  ['saudacoes', 'saudações'],
  ['instrucoes', 'instruções'],
  ['explicacoes', 'explicações'],
  ['aplicacoes', 'aplicações'],
  ['opcoes', 'opções'],
  ['direcoes', 'direções'],
  ['edificacoes', 'edificações'],

  // More missing accents
  ['Adao', 'Adão'],
  ['Abraao', 'Abraão'],
  ['Lazaro', 'Lázaro'],
  ['Betezda', 'Betesda'],
  ['Jerusalem', 'Jerusalém'],
  ['Galileia', 'Galileia'],
  ['Cafarnaum', 'Cafarnaum'],

  // Common words
  ['entao', 'então'],
  ['tambem', 'também'],
  ['nao', 'não'],
  ['tera', 'terá'],
  ['vivera', 'viverá'],
  ['sera', 'será'],
  ['estara', 'estará'],
  ['poderá', 'poderá'],
  ['gerara', 'gerará'],
  ['morara', 'morará'],
  ['voltara', 'voltará'],
  ['julgara', 'julgará'],
  ['chamara', 'chamará'],
  ['poderao', 'poderão'],

  // Titles and headings
  ['título:', 'título:'],
  ['resumo:', 'resumo:'],

  // More content
  ['Deus se arrepende', 'Deus se arrepende'],
  ['Experiência', 'Experiência'],
  ['paciência', 'paciência'],
  ['misericórdia', 'misericórdia'],
  ['consciência', 'consciência'],
  ['perseverança', 'perseverança'],

  // Joao specific
  ['pão da vida', 'pão da vida'],
  ['luz do mundo', 'luz do mundo'],
  ['bom pastor', 'bom pastor'],
  ['videira verdadeira', 'videira verdadeira'],

  // Atos specific
  ['Pentecostes', 'Pentecostes'],
  ['martírio', 'martírio'],

  // More common words
  ['esperança', 'esperança'],
  ['sabedoria', 'sabedoria'],
  ['obediência', 'obediência'],
  ['bondade', 'bondade'],
  ['fidelidade', 'fidelidade'],
  ['verdade', 'verdade'],
  ['liberdade', 'liberdade'],
  ['pureza', 'pureza'],
  ['santidade', 'santidade'],
  ['humildade', 'humildade'],

  // Specific fixes for each study page
  ['Sinais e discursos', 'Sinais e discursos'],
  ['Caps. 13-17:', 'Caps. 13-17:'],
  ['A ceia, os últimos', 'A ceia, os últimos'],
  ['sumo-sacerdotal', 'sumo-sacerdotal'],

  // Fix "e" that's the verb "is" in predicate position
  ['e o poder de Deus', 'é o poder de Deus'],
  ['e a sustentacao', 'é a sustentação'],
  ['e a revelacao', 'é a revelação'],
  ['e o unico caminho', 'é o único caminho'],
  ['e a porta', 'é a porta'],
  ['e o bom pastor', 'é o bom pastor'],
  ['e a ressurreicao', 'é a ressurreição'],
  ['e a vida', 'é a vida'],
  ['e o caminho', 'é o caminho'],
  ['e a verdade', 'é a verdade'],
  ['e a videira', 'é a videira'],
  ['e o principio', 'é o princípio'],
  ['e o alimento', 'é o alimento'],
  ['e a fonte', 'é a fonte'],
];

let totalFixed = 0;

for (const file of FILES) {
  const path = join(BASE, file);
  try {
    const content = readFileSync(path, 'utf-8');
    let fixed = content;
    for (const [from, to] of FIXES) {
      fixed = fixed.split(from).join(to);
    }
    if (content !== fixed) {
      writeFileSync(path, fixed, 'utf-8');
      console.log(`✅ ${file}: corrigido`);
      totalFixed++;
    } else {
      console.log(`⏭️  ${file}: sem alterações`);
    }
  } catch (err) {
    console.error(`❌ ${file}: ${err.message}`);
  }
}

console.log(`\n📊 Total: ${totalFixed} arquivos corrigidos`);
