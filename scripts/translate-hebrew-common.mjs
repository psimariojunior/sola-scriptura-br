#!/usr/bin/env node
/**
 * translate-hebrew-common.mjs
 *
 * Traduz os termos mais comuns do lexico hebraico para portugues.
 * Foca nos 500+ termos mais frequentes do Strong's Hebrew.
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

// Dicionario compacto de termos biblicos hebraicos mais comuns
const DIC = {
  // Familia
  'father': 'pai', 'mother': 'mae', 'son': 'filho', 'daughter': 'filha',
  'brother': 'irmao', 'sister': 'irma', 'husband': 'marido', 'wife': 'esposa',
  'man': 'homem', 'woman': 'mulher', 'child': 'crianca', 'children': 'filhos',
  'firstborn': 'primogenito', 'orphan': 'orfao', 'widow': 'viuva',
  
  // Sociedade
  'people': 'povo', 'nation': 'nacao', 'king': 'rei', 'queen': 'rainha',
  'prince': 'principe', 'servant': 'servo', 'handmaid': 'serva',
  'slave': 'escravo', 'master': 'senhor', 'enemy': 'inimigo',
  'friend': 'amigo', 'neighbor': 'proximo', 'stranger': 'estrangeiro',
  'priest': 'sacerdote', 'prophet': 'profeta', 'judge': 'juiz',
  'elder': 'anciao', 'leader': 'lider', 'captain': 'capitao',
  
  // Deus e religiao
  'God': 'Deus', 'Lord': 'SENHOR', 'angel': 'anjo', 'spirit': 'espirito',
  'soul': 'alma', 'covenant': 'alianca', 'law': 'lei', 'commandment': 'mandamento',
  'sacrifice': 'sacrificio', 'offering': 'oferta', 'sin': 'pecado',
  'iniquity': 'iniquidade', 'transgression': 'transgressao',
  'righteousness': 'justica', 'justice': 'justica', 'mercy': 'misericordia',
  'grace': 'graca', 'truth': 'verdade', 'faith': 'fe', 'hope': 'esperanca',
  'blessing': 'bencao', 'curse': 'maldicao', 'prayer': 'oracao',
  'worship': 'adoracao', 'praise': 'louvor', 'thanksgiving': 'agradecimento',
  
  // Natureza
  'heaven': 'ceu', 'earth': 'terra', 'land': 'terra', 'world': 'mundo',
  'sun': 'sol', 'moon': 'lua', 'star': 'estrela', 'sky': 'ceu',
  'mountain': 'montanha', 'hill': 'colina', 'valley': 'vale',
  'river': 'rio', 'sea': 'mar', 'water': 'agua', 'fire': 'fogo',
  'wind': 'vento', 'rain': 'chuva', 'snow': 'neve', 'dew': 'orvalho',
  'cloud': 'nuvem', 'storm': 'tempestade', 'thunder': 'trovoes',
  'lightning': 'relampago', 'darkness': 'trevas', 'light': 'luz',
  'shadow': 'sombra', 'dust': 'poeira', 'dirt': 'terra',
  'stone': 'pedra', 'rock': 'rocha', 'sand': 'areia',
  'tree': 'arvore', 'forest': 'floresta', 'garden': 'jardim',
  'seed': 'semente', 'fruit': 'fruto', 'flower': 'flor',
  'grass': 'grama', 'wheat': 'trigo', 'barley': 'cevada',
  'vine': 'videira', 'olive': 'azeitona', 'fig': 'figo',
  
  // Animais
  'sheep': 'ovelha', 'lamb': 'cordeiro', 'goat': 'cabra',
  'cattle': 'gado', 'ox': 'boi', 'horse': 'cavalo',
  'donkey': 'jumento', 'dog': 'cachorro', 'cat': 'gato',
  'lion': 'leao', 'bear': 'urso', 'wolf': 'lobo',
  'eagle': 'aguia', 'dove': 'pomba', 'serpent': 'serpente',
  'fish': 'peixe', 'bird': 'passaro', 'insect': 'inseto',
  
  // Corpo humano
  'head': 'cabeca', 'face': 'rosto', 'eye': 'olho', 'ear': 'ouvido',
  'nose': 'nariz', 'mouth': 'boca', 'lip': 'labio', 'tongue': 'lingua',
  'tooth': 'dente', 'neck': 'pescoco', 'shoulder': 'ombro',
  'arm': 'braco', 'hand': 'mao', 'finger': 'dedo',
  'chest': 'peito', 'back': 'costas', 'belly': 'ventre',
  'hip': 'quadril', 'leg': 'perna', 'foot': 'pe', 'knee': 'joelho',
  'bone': 'osso', 'blood': 'sangue', 'skin': 'pele', 'hair': 'cabelo',
  'heart': 'coracao', 'mind': 'mente', 'breath': 'flegma',
  
  // Construcoes
  'house': 'casa', 'home': 'lar', 'tent': 'tenda', 'temple': 'templo',
  'altar': 'altar', 'tabernacle': 'tabernaculo', 'sanctuary': 'santuario',
  'city': 'cidade', 'town': 'vila', 'village': 'aldeia',
  'wall': 'muro', 'gate': 'portao', 'door': 'porta', 'window': 'janela',
  'tower': 'torre', 'palace': 'palacio', 'prison': 'prisao',
  
  // Objetos
  'bread': 'pao', 'wine': 'vinho', 'oil': 'oleo', 'milk': 'leite',
  'honey': 'mel', 'salt': 'sal', 'meat': 'carne',
  'garment': 'vestimenta', 'robe': 'vestido', 'coat': 'casacao',
  'sandals': 'sandalia', 'crown': 'coroa', 'ring': 'anel',
  'sword': 'espada', 'spear': 'lanca', 'shield': 'escudo',
  'bow': 'arco', 'arrow': 'flecha', 'staff': 'cajado',
  'rod': 'vara', 'key': 'chave', 'seal': 'selo',
  'book': 'livro', 'scroll': 'pergaminho', 'letter': 'carta',
  'table': 'mesa', 'chair': 'cadeira', 'bed': 'cama',
  'lamp': 'lampada', 'candle': 'vela', 'torch': 'tocha',
  'basket': 'cesto', 'jar': 'jarro', 'bowl': 'tigela',
  'plate': 'prato', 'cup': 'copo', 'bottle': 'garrafa',
  
  // Tempo
  'day': 'dia', 'night': 'noite', 'morning': 'manha', 'evening': 'noite',
  'noon': 'meio-dia', 'midnight': 'meia-noite',
  'week': 'semana', 'month': 'mes', 'year': 'ano',
  'season': 'estacao', 'spring': 'primavera', 'summer': 'verao',
  'autumn': 'outono', 'winter': 'inverno',
  'sabbath': 'sabado', 'feast': 'festa', 'jubilee': 'jubileu',
  'beginning': 'comeco', 'end': 'fim', 'eternity': 'eternidade',
  
  // Espaco
  'place': 'lugar', 'way': 'caminho', 'path': 'senda',
  'road': 'estrada', 'journey': 'viagem', 'wilderness': 'deserto',
  'desert': 'deserto', 'field': 'campo', 'plain': 'planicie',
  'island': 'ilha', 'coast': 'costa', 'border': 'fronteira',
  'kingdom': 'reino', 'province': 'provincia', 'territory': 'territorio',
  
  // Conceitos abstratos
  'wisdom': 'sabedoria', 'understanding': 'entendimento',
  'knowledge': 'conhecimento', 'folly': 'loucura', 'sin': 'pecado',
  'wickedness': 'maldade', 'evil': 'mal', 'good': 'bem',
  'love': 'amor', 'hate': 'odio', 'anger': 'ira', 'wrath': 'furor',
  'peace': 'paz', 'war': 'guerra', 'victory': 'vitoria',
  'defeat': 'derrota', 'strength': 'forca', 'power': 'poder',
  'glory': 'gloria', 'honor': 'honra', 'shame': 'vergonha',
  'joy': 'alegria', 'sorrow': 'tristeza', 'grief': 'pesar',
  'fear': 'medo', 'terror': 'terror', 'trust': 'confiança',
  'refuge': 'refugio', 'shelter': 'abrigo', 'protection': 'protecao',
  'salvation': 'salvacao', 'deliverance': 'libertacao',
  'redemption': 'redencao', 'forgiveness': 'perdao',
  'healing': 'curanca', 'restoration': 'restauracao',
  'creation': 'criacao', 'destruction': 'destruicao',
  'judgment': 'julgamento', 'punishment': 'punicao',
  'reward': 'recompensa', 'inheritance': 'heranca',
  'possession': 'possessao', 'property': 'propriedade',
  'wealth': 'riqueza', 'poverty': 'pobreza',
  'life': 'vida', 'death': 'morte', 'resurrection': 'ressurreicao',
  
  // Verbos comuns
  'to be': 'ser', 'to have': 'ter', 'to do': 'fazer', 'to go': 'ir',
  'to come': 'vir', 'to see': 'ver', 'to hear': 'ouvir',
  'to speak': 'falar', 'to say': 'dizer', 'to tell': 'contar',
  'to give': 'dar', 'to take': 'tomar', 'to bring': 'trazer',
  'to send': 'enviar', 'to build': 'construir', 'to destroy': 'destruir',
  'to eat': 'comer', 'to drink': 'beber', 'to sleep': 'dormir',
  'to live': 'viver', 'to die': 'morrer', 'to kill': 'matar',
  'to save': 'salvar', 'to deliver': 'libertar', 'to help': 'ajudar',
  'to fight': 'lutar', 'to run': 'correr', 'to walk': 'andar',
  'to stand': 'estar', 'to sit': 'sentar', 'to lie': 'deitar',
  'to rise': 'levantar', 'to fall': 'cair', 'to open': 'abrir',
  'to close': 'fechar', 'to write': 'escrever', 'to read': 'ler',
  'to know': 'saber', 'to understand': 'entender', 'to think': 'pensar',
  'to believe': 'crer', 'to trust': 'confiar', 'to wait': 'esperar',
  'to seek': 'buscar', 'to find': 'encontrar', 'to ask': 'perguntar',
  'to answer': 'responder', 'to call': 'chamar', 'to name': 'nomear',
  'to choose': 'escolher', 'to love': 'amar', 'to hate': 'odiar',
  'to fear': 'temer', 'to praise': 'louvar', 'to worship': 'adorar',
  'to pray': 'orar', 'to bless': 'abençoar', 'to curse': 'amaldicoar',
  'to sin': 'pecar', 'to repent': 'arrepender', 'to forgive': 'perdoar',
  'to redeem': 'resgatar', 'to sanctify': 'santificar',
  'to consecrate': 'consagrar', 'to anoint': 'ungir',
  'to pour': 'derramar', 'to burn': 'queimar', 'to offer': 'oferecer',
  'to judge': 'julgar', 'to rule': 'governar', 'to reign': 'reinar',
  'to conquer': 'conquistar', 'to possess': 'possuir',
  'to inherit': 'herdar', 'to divide': 'dividir', 'to gather': 'reunir',
  'to scatter': 'espalhar', 'to plant': 'plantar', 'to harvest': 'colher',
  'to bind': 'atar', 'to loose': 'soltar', 'to seal': 'selar',
  'to cover': 'cobrir', 'to reveal': 'revelar', 'to hide': 'esconder',
  'to return': 'voltar', 'to depart': 'partir', 'to enter': 'entrar',
  'to exit': 'sair', 'to ascend': 'subir', 'to descend': 'descer',
  'to cross': 'cruzar', 'to pass': 'passar', 'to turn': 'voltar',
  'to follow': 'seguir', 'to lead': 'conduzir', 'to guide': 'guiar',
  'to carry': 'carregar', 'to bear': 'suportar', 'to endure': 'suportar',
  'to suffer': 'sofrer', 'to afflict': 'afligir', 'to oppress': 'oprimir',
  'to release': 'soltar', 'to capture': 'capturar', 'to seize': 'apreender',
  'to plunder': 'saquear', 'to rob': 'roubar', 'to steal': 'furtar',
  'to sing': 'cantar', 'to dance': 'dancar', 'to rejoice': 'alegrar',
  'to mourn': 'lamentar', 'to weep': 'chorar', 'to laugh': 'rir',
  'to mock': 'zombar', 'to despise': 'desprezar', 'to honor': 'honrar',
  'to glorify': 'glorificar', 'to exalt': 'exaltar', 'to humble': 'humilhar',
  'to command': 'ordenar', 'to establish': 'estabelecer',
  'to fulfill': 'cumprir', 'to complete': 'completar',
  'to begin': 'comecar', 'to cease': 'cessar', 'to rest': 'descansar',
  'to work': 'trabalhar', 'to serve': 'servir', 'to prepare': 'preparar',
  'to count': 'contar', 'to measure': 'medir', 'to test': 'testar',
  'to examine': 'examinar', 'to search': 'buscar', 'to learn': 'aprender',
  'to teach': 'ensinar', 'to instruct': 'instruir', 'to warn': 'avisar',
  'to rebuke': 'repreender', 'to correct': 'corrigir', 'to punish': 'punir',
  'to provide': 'prover', 'to sustain': 'sustentar', 'to protect': 'proteger',
  'to defend': 'defender', 'to shelter': 'abrigar', 'to flee': 'fugir',
  'to escape': 'escapar', 'to prosper': 'prosperar', 'to overcome': 'vencer',
  'to subdue': 'subjugar', 'to be able': 'poder', 'to be worthy': 'ser digno',
  
  // Adjetivos comuns
  'good': 'bom', 'evil': 'mal', 'righteous': 'justo', 'wicked': 'impio',
  'holy': 'santo', 'sacred': 'sacro', 'pure': 'puro', 'clean': 'limpo',
  'unclean': 'impuro', 'defiled': 'profanado',
  'great': 'grande', 'small': 'pequeno', 'mighty': 'poderoso',
  'strong': 'forte', 'weak': 'fraco', 'wise': 'sabio', 'foolish': 'tolo',
  'young': 'jovem', 'old': 'velho', 'new': 'novo', 'first': 'primeiro',
  'last': 'ultimo', 'many': 'muitos', 'few': 'poucos', 'all': 'todos',
  'none': 'nenhum', 'one': 'um', 'two': 'dois', 'three': 'tres',
  'beautiful': 'bonito', 'ugly': 'feio', 'rich': 'rico', 'poor': 'pobre',
  'happy': 'feliz', 'sad': 'triste', 'alive': 'vivo', 'dead': 'morto',
  'true': 'verdadeiro', 'false': 'falso', 'eternal': 'eterno',
  'divine': 'divino', 'perfect': 'perfeito', 'complete': 'completo',
  
  // Preposicoes e conjuncoes
  'and': 'e', 'or': 'ou', 'but': 'mas', 'not': 'nao',
  'in': 'em', 'on': 'em', 'at': 'em', 'to': 'para',
  'for': 'para', 'with': 'com', 'from': 'de', 'by': 'por',
  'of': 'de', 'that': 'que', 'this': 'este', 'it': 'ele',
  'he': 'ele', 'she': 'ela', 'we': 'nos', 'they': 'eles',
  'you': 'voce', 'who': 'quem', 'which': 'qual', 'what': 'que',
  'where': 'onde', 'when': 'quando', 'how': 'como', 'why': 'por que',
  'if': 'se', 'then': 'entao', 'so': 'entao', 'because': 'porque',
  'therefore': 'portanto', 'here': 'aqui', 'there': 'la',
  'now': 'agora', 'also': 'tambem', 'very': 'muito', 'much': 'muito',
  'more': 'mais', 'most': 'mais', 'less': 'menos', 'only': 'apenas',
  'just': 'apenas', 'even': 'mesmo', 'still': 'ainda', 'yet': 'ainda',
  'already': 'ja', 'always': 'sempre', 'never': 'nunca',
  'sometimes': 'as vezes', 'often': 'frequentemente',
  'before': 'antes', 'after': 'depois', 'between': 'entre',
  'through': 'atraves', 'into': 'dentro', 'upon': 'sobre',
  'against': 'contra', 'until': 'ate', 'since': 'desde',
  'while': 'enquanto', 'during': 'durante', 'within': 'dentro de',
  'without': 'sem', 'beyond': 'alem', 'behind': 'atras',
  'above': 'acima', 'below': 'abaixo', 'over': 'sobre', 'under': 'sob',
  'near': 'perto', 'far': 'longe', 'like': 'como', 'as': 'como',
  'about': 'sobre', 'according to': 'segundo',
  'a': 'um', 'an': 'um', 'the': 'o',
};

// ─── Carregar e atualizar hebraico.ts ────────────────────────────────────────

const hebPath = resolve(ROOT, 'src/data/lexicon/hebraico.ts');
let hebContent = readFileSync(hebPath, 'utf8');

let traduzidos = 0;
let jaPortugues = 0;
let total = 0;

// Processar cada entrada
const regexGlobal = /strong:\s*"(H\d+)"[^}]*?definicao:\s*"([^"]+)"/g;
let match;

while ((match = regexGlobal.exec(hebContent)) !== null) {
  total++;
  const strong = match[1];
  const definicao = match[2];
  
  // Verificar se ja esta em portugues
  if (/[àáâãéêíóôõúç]/i.test(definicao) || 
      /^(substantivo|verbo|adjetivo|advérbio|preposição|conjunção|pronome|numeral|partícula|interjeição)/i.test(definicao)) {
    jaPortugues++;
    continue;
  }
  
  // Tentar traduzir usando o dicionario
  let traducao = definicao;
  let mudou = false;
  
  // Ordenar por tamanho (mais longos primeiro) para evitar substituicoes parciais
  const entradas = Object.entries(DIC).sort((a, b) => b[0].length - a[0].length);
  
  for (const [en, pt] of entradas) {
    const regex = new RegExp('\\b' + en.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'gi');
    const novaTraducao = traducao.replace(regex, pt);
    if (novaTraducao !== traducao) {
      traducao = novaTraducao;
      mudou = true;
    }
  }
  
  if (mudou && traducao !== definicao) {
    // Substituir no arquivo
    const escapedDef = definicao.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regexReplace = new RegExp(`(strong:\\s*"${strong}"[^}]*?definicao:\\s*)"${escapedDef}"`);
    hebContent = hebContent.replace(regexReplace, `$1"${traducao.replace(/"/g, '\\"')}"`);
    traduzidos++;
  }
}

writeFileSync(hebPath, hebContent, 'utf8');

console.log(`\n📊 Resultado da traducao:`);
console.log(`  - Total de entradas: ${total}`);
console.log(`  - Ja em portugues: ${jaPortugues}`);
console.log(`  - Traduzidos: ${traduzidos}`);
console.log(`  - Ainda em ingles: ${total - jaPortugues - traduzidos}`);
