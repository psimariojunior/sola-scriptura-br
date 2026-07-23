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

// Fix errors introduced by previous script + remaining issues
const FIXES = [
  // Fix wrong accents from previous script
  ['reférencia', 'referência'],
  ['reférencias', 'referências'],
  ['explicação', 'explicação'],  // keep as is
  ['maniféstou', 'manifestou'],
  ['féz', 'fez'],
  ['oférta', 'oferta'],
  ['perféita', 'perfeita'],
  ['glóriamos', 'gloriamos'],
  ['马丁·路德', 'Martinho Lutero'],

  // Missing accents that weren't caught
  ['Criacao', 'Criação'],
  ['criacao', 'criação'],
  ['Formacao', 'Formação'],
  ['formacao', 'formação'],
  ['Corrupcao', 'Corrupção'],
  ['corrupcao', 'corrupção'],
  ['Diluvio', 'Dilúvio'],
  ['diluvio', 'dilúvio'],
  ['Alianca', 'Aliança'],
  ['alianca', 'aliança'],
  ['Circuncisao', 'Circuncisão'],
  ['circuncisao', 'circuncisão'],
  ['Visitacao', 'Visitação'],
  ['visitacao', 'visitação'],
  ['Intercessao', 'Intercessão'],
  ['intercessao', 'intercessão'],
  ['Destruicao', 'Destruição'],
  ['destruicao', 'destruição'],
  ['Torre', 'Torre'],
  ['Babel', 'Babel'],
  ['Pentecostes', 'Pentecostes'],
  ['Ascensao', 'Ascensão'],
  ['ascensao', 'ascensão'],
  ['martirio', 'martírio'],
  ['Martirio', 'Martírio'],
  ['Diáconos', 'Diáconos'],
  ['diáconos', 'diáconos'],
  ['interrogatorio', 'interrogatório'],
  ['disciplina', 'disciplina'],

  // Study page section labels
  ['label: \'Introducao\'', 'label: \'Introdução\''],
  ['label: \'Estrutura\'', 'label: \'Estrutura\''],
  ['label: \'Versiculos-Chave\'', 'label: \'Versículos-Chave\''],
  ['label: \'Aplicacao\'', 'label: \'Aplicação\''],
  ['label: \'Perguntas\'', 'label: \'Perguntas\''],
  ['label: \'Classificacao\'', 'label: \'Classificação\''],
  ['label: \'Expansao do Evangelho\'', 'label: \'Expansão do Evangelho\''],
  ['label: \'Visoes Interpretativas\'', 'label: \'Visões Interpretativas\''],
  ['label: \'Os 7 Eu Sou\'', 'label: \'Os 7 Eu Sou\''],
  ['label: \'Os 7 Sinais\'', 'label: \'Os 7 Sinais\''],
  ['label: \'Prologo (Jo 1:1-18)\'', 'label: \'Prólogo (Jo 1:1-18)\''],
  ['label: \'Hino Cristologico\'', 'label: \'Hino Cristológico\''],
  ['label: \'Armadura Espiritual\'', 'label: \'Armadura Espiritual\''],
  ['label: \'30 Salmos Essenciais\'', 'label: \'30 Salmos Essenciais\''],
  ['label: \'Salmos Messianicos\'', 'label: \'Salmos Messiânicos\''],
  ['label: \'Usos na Oração\'', 'label: \'Usos na Oração\''],
  ['label: \'Momentos Especificos\'', 'label: \'Momentos Específicos\''],
  ['label: \'30 Proverbios Essenciais\'', 'label: \'30 Proverbios Essenciais\''],
  ['label: \'A Ceia\'', 'label: \'A Ceia\''],
  ['label: \'O Amor\'', 'label: \'O Amor\''],
  ['label: \'1 Cor 13: O Amor\'', 'label: \'1 Cor 13: O Amor\''],
  ['label: \'1 Cor 15: Ressurreicao\'', 'label: \'1 Cor 15: Ressurreição\''],
  ['label: \'Ressurreicao\'', 'label: \'Ressurreição\''],

  // Missing accents in content words
  ['Abraao', 'Abraão'],
  ['Sara dá', 'Sara dá'],
  ['Adao', 'Adão'],
  ['Eva', 'Eva'],
  ['Caim', 'Caim'],
  ['Abel', 'Abel'],
  ['Noé', 'Noé'],
  ['Isaac', 'Isaac'],
  ['Israel', 'Israel'],
  ['Egito', 'Egito'],
  ['Lazaro', 'Lázaro'],
  ['Betezda', 'Betesda'],
  ['Cafarnaum', 'Cafarnaum'],
  ['Galileia', 'Galileia'],
  ['Jerusalem', 'Jerusalém'],
  ['Samaria', 'Samaria'],
  ['Betania', 'Betânia'],
  ['Casamento', 'Casamento'],
  ['Piscina', 'Piscina'],
  ['Josue', 'Josué'],
  ['Jose', 'José'],

  // More missing accents
  ['resumo:', 'resumo:'],
  ['titulo:', 'título:'],
  ['titulo', 'título'],
  ['Tema:', 'Tema:'],
  ['Proposito:', 'Propósito:'],
  ['Sabedoria', 'Sabedoria'],

  // Common words still missing accents
  ['nacoes', 'nações'],
  ['Nacoes', 'Nações'],
  ['ancestrais', 'ancestrais'],
  ['patriarchas', 'patriarcas'],
  ['genealogia', 'genealogia'],
  ['Genealogia', 'Genealogia'],
  ['antediluvianos', 'antediluvianos'],
  ['antediluviano', 'antediluviano'],

  // Verbs
  ['gerara', 'gerará'],
  ['morara', 'morará'],
  ['vivera', 'viverá'],
  ['sera', 'será'],
  ['tera', 'terá'],
  ['estara', 'estará'],
  ['poderá', 'poderá'],
  ['romperá', 'romperá'],
  ['voltara', 'voltará'],
  ['julgara', 'julgará'],
  ['chamara', 'chamará'],
  ['entrará', 'entrará'],
  ['sairá', 'sairá'],
  ['receberá', 'receberá'],
  ['derramara', 'derramará'],
  ['cairá', 'cairá'],
  ['levantará', 'levantará'],
  ['comerá', 'comerá'],
  ['beberá', 'beberá'],
  ['poderao', 'poderão'],

  // More content fixes
  ['Deus se arrepende', 'Deus se arrepende'],
  ['acha graça', 'acha graça'],
  ['faz aliança', 'faz aliança'],
  ['destruir a terra', 'destruir a terra'],
  ['destruir a terra', 'destruir a terra'],

  // Section headings in page content
  ['Versiculos-Chave com Comentario', 'Versículos-Chave com Comentário'],
  ['Padrão da Aliança:', 'Padrão da Aliança:'],

  // Fix remaining "e" that should be "é" in specific contexts
  // Be very careful here - only in predicate contexts
  ['e o poder', 'é o poder'],
  ['e a vida', 'é a vida'],
  ['e o caminho', 'é o caminho'],
  ['e a verdade', 'é a verdade'],
  ['e o principio', 'é o princípio'],
  ['e o alimento', 'é o alimento'],
  ['e a sustentacao', 'é a sustentação'],
  ['e a fonte', 'é a fonte'],
  ['e o unico', 'é o único'],
  ['e a luz', 'é a luz'],
  ['e a porta', 'é a porta'],
  ['e a videira', 'é a videira'],

  // Specific study content
  ['Sinais e discursos', 'Sinais e discursos'],
  ['Caps. 13-17:', 'Caps. 13-17:'],
  ['A ceia, os ultimos', 'A ceia, os últimos'],
  ['sumo-sacerdotal', 'sumo-sacerdotal'],
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
