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

// Comprehensive word-level replacements (order matters: longer words first)
const WORD_REPLACEMENTS = [
  // Multi-word phrases
  ['Introducao', 'Introdução'],
  ['Estrutura', 'Estrutura'],
  ['Versiculos-Chave', 'Versículos-Chave'],
  ['Versiculos', 'Versículos'],
  ['Aplicacao', 'Aplicação'],
  ['Perguntas', 'Perguntas'],
  ['Classificacao', 'Classificação'],
  ['Expansao', 'Expansão'],
  ['Visoes Interpretativas', 'Visões Interpretativas'],
  ['Temas Centrais', 'Temas Centrais'],
  ['Acao de Gracas', 'Ação de Graças'],
  ['Oração', 'Oração'],
  ['Momentos Especificos', 'Momentos Específicos'],
  ['30 Salmos Essenciais', '30 Salmos Essenciais'],
  ['Salmos Messianicos', 'Salmos Messiânicos'],
  ['30 Proverbios Essenciais', '30 Proverbios Essenciais'],
  ['Hino Cristologico', 'Hino Cristológico'],
  ['Armadura Espiritual', 'Armadura Espiritual'],
  ['Métodos de Estudo', 'Métodos de Estudo'],
  ['Os 7 Eu Sou', 'Os 7 Eu Sou'],
  ['Os 7 Sinais', 'Os 7 Sinais'],
  ['Prologo', 'Prólogo'],
  ['Resumo por Capitulo', 'Resumo por Capítulo'],
  ['Mapa dos Patriarcas', 'Mapa dos Patriarcas'],
  ['Jornada dos Patriarcas', 'Jornada dos Patriarcas'],

  // Common words with missing accents - longer first
  ['circuncisao', 'circuncisão'],
  ['intercessao', 'intercessão'],
  ['expansao', 'expansão'],
  ['justificacao', 'justificação'],
  ['condenacao', 'condenação'],
  ['predestinacao', 'predestinação'],
  ['conformes', 'conformes'],
  ['renovacao', 'renovação'],
  ['sacrificio', 'sacrifício'],
  ['obrigacao', 'obrigação'],
  ['consagracao', 'consagração'],
  ['salvacao', 'salvação'],
  ['perfeicao', 'perfeição'],
  ['santificacao', 'santificação'],
  ['redencao', 'redenção'],
  ['ressurreicao', 'ressurreição'],
  ['transfiguracao', 'transfiguração'],
  ['ascensao', 'ascensão'],
  ['glorificacao', 'glorificação'],
  ['justificao', 'justificação'],
  ['orientacao', 'orientação'],
  ['comunhao', 'comunhão'],
  ['intercessao', 'intercessão'],
  ['consolacao', 'consolação'],
  ['exaltacao', 'exaltação'],
  ['admiracao', 'admissão'],
  ['admissao', 'admissão'],
  ['reconciliacao', 'reconciliação'],
  ['maldicao', 'maldição'],
  ['bendicao', 'bênção'],
  ['lamentacao', 'lamentação'],
  ['obrigacoes', 'obrigações'],
  ['instrucoes', 'instruções'],
  ['opcoes', 'opções'],
  ['direcoes', 'direções'],
  ['edificacoes', 'edificações'],
  ['consolacoes', 'consolações'],
  ['exhortacoes', 'exortações'],
  ['saudacoes', 'saudações'],
  ['oracoes', 'orações'],
  ['informacoes', 'informações'],
  ['explicacoes', 'explicações'],
  ['aplicacoes', 'aplicações'],
  ['perguntas', 'perguntas'],
  ['interpretacoes', 'interpretações'],
  ['multiplicacoes', 'multiplicações'],

  // Common words
  ['Abraao', 'Abraão'],
  ['Sodoma', 'Sodoma'],
  ['Gomorra', 'Gomorra'],
  ['circuncidou', 'circuncidou'],
  ['circuncidar', 'circuncidar'],
  ['circuncidados', 'circuncidados'],
  ['prophecias', 'profecias'],
  ['profecia', 'profecia'],
  ['filhos', 'filhos'],
  ['entao', 'então'],
  ['tambem', 'também'],
  ['nao', 'não'],
  ['tera', 'terá'],
  ['vivera', 'viverá'],
  ['sera', 'será'],
  ['estara', 'estará'],
  ['poderá', 'poderá'],
  ['vergognha', 'vergônhа'],
  ['ira', 'ira'],
  ['julgara', 'julgará'],
  ['voltara', 'voltará'],
  ['romperá', 'romperá'],
  ['proposito', 'propósito'],
  ['espirito', 'espírito'],
  ['Espirito', 'Espírito'],
  ['espirituais', 'espirituais'],
  ['justica', 'justiça'],
  ['sabedoria', 'sabedoria'],
  ['misericordia', 'misericórdia'],
  ['perdoao', 'perdão'],
  ['pecado', 'pecado'],
  ['pecados', 'pecados'],
  ['arrependimento', 'arrependimento'],
  ['graca', 'graça'],
  ['graça', 'graça'],
  ['fe', 'fé'],
  ['crenca', 'crença'],
  ['obras', 'obras'],
  ['consciencia', 'consciência'],
  ['injustica', 'injustiça'],
  ['injustiça', 'injustiça'],
  ['vinganca', 'vingança'],
  ['misericordia', 'misericórdia'],
  ['trabalhador', 'trabalhador'],
  ['trabalhadores', 'trabalhadores'],
  ['trabalho', 'trabalho'],
  ['esperanca', 'esperança'],
  ['paciencia', 'paciência'],
  ['perseveranca', 'perseverança'],
  ['humildade', 'humildade'],
  ['caridade', 'caridade'],
  ['pureza', 'pureza'],
  ['santidade', 'santidade'],
  ['bondade', 'bondade'],
  ['fidelidade', 'fidelidade'],
  ['verdade', 'verdade'],
  ['liberdade', 'liberdade'],
  ['igreja', 'igreja'],

  // Words with ã/õ
  ['irmaos', 'irmãos'],
  ['irmao', 'irmão'],
  ['nação', 'nação'],
  ['nacoes', 'nações'],
  ['nações', 'nações'],
  ['coraçao', 'coração'],
  ['coração', 'coração'],
  ['limpou', 'limpou'],
  ['nao', 'não'],
  ['mão', 'mão'],
  ['maos', 'mãos'],
  ['pão', 'pão'],
  ['irma', 'irmã'],
  ['anjo', 'anjo'],
  ['anjos', 'anjos'],

  // Words with é/ê
  ['è', 'é'],
  ['deus', 'Deus'],
  ['cristo', 'Cristo'],
  ['evangelho', 'evangelho'],
  ['igreja', 'igreja'],
  ['leia', 'Leia'],
  ['terra', 'terra'],
  ['mundo', 'mundo'],
  ['vida', 'vida'],
  ['morte', 'morte'],
  ['homem', 'homem'],
  ['mulher', 'mulher'],
  ['filho', 'filho'],
  ['pai', 'pai'],
  ['rei', 'rei'],
  ['povo', 'povo'],
  ['cidade', 'cidade'],
  ['casa', 'casa'],
  ['caminho', 'caminho'],
  ['luz', 'luz'],
  ['agua', 'água'],
  ['comida', 'comida'],
  ['carne', 'carne'],
  ['sangue', 'sangue'],
  ['dor', 'dor'],
  ['alegria', 'alegria'],
  ['paz', 'paz'],
  ['amor', 'amor'],
  ['gloria', 'glória'],
  ['poder', 'poder'],
  ['reino', 'reino'],
  ['aliança', 'aliança'],
  ['alianca', 'aliança'],
  ['promessa', 'promessa'],
  ['lei', 'Lei'],
  ['morte', 'morte'],
  ['vida', 'vida'],

  // Specific corrections from reading the files
  ['sumo-sacerdotal', 'sumo-sacerdotal'],
  ['proposito', 'propósito'],
  ['justica', 'justiça'],
  ['inabalavel', 'inabalável'],
  ['envergonha', 'envergonha'],
  ['derramado', 'derramado'],
  ['EXPERIENCIA', 'EXPERIÊNCIA'],
  ['conformidade', 'conformidade'],
  ['conhecimento', 'conhecimento'],
  ['obediencia', 'obediência'],
  ['sabedoria', 'sabedoria'],
  ['perdao', 'perdão'],
  ['vingança', 'vingança'],
  ['misericordia', 'misericórdia'],
  ['consciencia', 'consciência'],
  ['injustica', 'injustiça'],
  ['perfeicao', 'perfeição'],
  ['justificacao', 'justificação'],
  ['santificacao', 'santificação'],
  ['redencao', 'redenção'],
  ['glorificacao', 'glorificação'],
  ['consagraçao', 'consagração'],
  ['consagracao', 'consagração'],
  ['orientaçao', 'orientação'],
  ['orientacao', 'orientação'],
  ['comunhao', 'comunhão'],
  ['reconciliaçao', 'reconciliação'],
  ['reconciliacao', 'reconciliação'],
  ['maldicao', 'maldição'],
  ['bendicao', 'bênção'],
  ['lamentaçao', 'lamentação'],
  ['lamentacao', 'lamentação'],
  ['exaltacao', 'exaltação'],
  ['adoracao', 'adoração'],
  ['adorçao', 'adoração'],
  ['oraçao', 'oração'],
  ['oração', 'oração'],
  ['saudaçao', 'saudação'],
  ['saudacao', 'saudação'],
  ['instruçao', 'instrução'],
  ['instrucao', 'instrução'],
  ['instrucoes', 'instruções'],
  ['explicacao', 'explicação'],
  ['explicacoes', 'explicações'],
  ['aplicacao', 'aplicação'],
  ['aplicacoes', 'aplicações'],
  ['opçao', 'opção'],
  ['opcao', 'opção'],
  ['opcoes', 'opções'],
  ['direçao', 'direção'],
  ['direcao', 'direção'],
  ['direcoes', 'direções'],
  ['sessao', 'sessão'],
  ['secao', 'seção'],
  ['seções', 'seções'],
  ['porçao', 'porção'],
  ['porcao', 'porção'],
  ['funçao', 'função'],
  ['funcao', 'função'],
  ['çao', 'ção'],
  ['çoes', 'ções'],

  // Words with á/â/à
  ['carater', 'caráter'],
  [' caracter', ' caráter'],
  ['caráter', 'caráter'],
  ['sagrada', 'sagrada'],
  ['exata', 'exata'],

  // Specific study content words
  ['Abraao', 'Abraão'],
  ['Josue', 'Josué'],
  ['Jose', 'José'],
  ['Lazaro', 'Lázaro'],
  ['Betezda', 'Betesda'],
  ['Samaria', 'Samaria'],
  ['Galileia', 'Galileia'],
  ['Jerusalem', 'Jerusalém'],
  ['Betania', 'Betânia'],
  ['Cafarnaum', 'Cafarnaum'],
  ['Cana', 'Cana'],
  ['Piscina', 'Piscina'],
  ['Casamento', 'Casamento'],

  // Verbs and common words
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
  ['morará', 'morará'],
  ['comerá', 'comerá'],
  ['beberá', 'beberá'],

  // Missing accents in verbs
  ['ressuscitou', 'ressuscitou'],
  ['ressuscitado', 'ressuscitado'],
  ['ressuscitacao', 'ressurreição'],
  ['morreu', 'morreu'],
  ['nasceu', 'nasceu'],
  ['crucificado', 'crucificado'],
  ['sepultado', 'sepultado'],

  // Articles and prepositions that are fine
  // Don't replace single letters or very common words

  // Specific fixes for each file
  ['Pr. Paulo Richard', 'Pr. Paulo Richard'],
  ['Dra. Maria Santos', 'Dra. Maria Santos'],
  ['Prof. João Almeida', 'Prof. João Almeida'],
];

// Regex-based replacements for words in specific contexts
const REGEX_REPLACEMENTS = [
  // Fix "e" that should be "é" (is/are verb) - only in specific contexts
  [/\be o\b/g, 'é o'],
  [/\be a\b/g, 'é a'],
  [/\be uma\b/g, 'é uma'],
  [/\be um\b/g, 'é um'],
  [/\be o\b/g, 'é o'],
  // But be careful not to break words like "the" in other contexts

  // Fix common patterns
  [/estao\b/g, 'estão'],
  [/tambem\b/g, 'também'],
  [/nao\b/g, 'não'],
  [/tera\b/g, 'terá'],
  [/vivera\b/g, 'viverá'],
  [/sera\b/g, 'será'],
  [/estara\b/g, 'estará'],
  [/podeerao\b/g, 'poderão'],
  [/sao\b/g, 'são'],
  [/entao\b/g, 'então'],
  [/nao\b/g, 'não'],
  [/mae\b/g, 'mãe'],
  [/irmao\b/g, 'irmão'],
  [/irmaos\b/g, 'irmãos'],
  [/coraçao\b/g, 'coração'],
  [/naçao\b/g, 'nação'],
  [/naçoes\b/g, 'nações'],
  [/nacoes\b/g, 'nações'],
];

function fixDiacritics(content) {
  let result = content;

  // Apply word replacements (longer first to avoid partial matches)
  for (const [from, to] of WORD_REPLACEMENTS) {
    result = result.split(from).join(to);
  }

  // Apply regex replacements
  for (const [pattern, replacement] of REGEX_REPLACEMENTS) {
    result = result.replace(pattern, replacement);
  }

  return result;
}

let totalFixed = 0;

for (const file of FILES) {
  const path = join(BASE, file);
  try {
    const content = readFileSync(path, 'utf-8');
    const fixed = fixDiacritics(content);
    if (content !== fixed) {
      writeFileSync(path, fixed, 'utf-8');
      const changes = (content.match(/[àáâãèéêíòóôõúç]/gi) || []).length;
      const fixedChanges = (fixed.match(/[àáâãèéêíòóôõúç]/gi) || []).length;
      console.log(`✅ ${file}: ${fixedChanges - changes} acentos corrigidos`);
      totalFixed++;
    } else {
      console.log(`⏭️  ${file}: sem alterações`);
    }
  } catch (err) {
    console.error(`❌ ${file}: ${err.message}`);
  }
}

console.log(`\n📊 Total: ${totalFixed} arquivos corrigidos`);
