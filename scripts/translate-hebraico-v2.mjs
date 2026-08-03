#!/usr/bin/env node
/**
 * translate-hebraico-v2.mjs
 * 
 * Traduz léxico hebraico para português usando dicionário offline.
 * Preserva aspas corretamente.
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

// Dicionário hebraico-português
const DICT = {
  'God': 'Deus', 'LORD': 'Senhor', 'Jehovah': 'Jeová', 'Lord': 'Senhor',
  'Almighty': 'Todo-Poderoso', 'Creator': 'Criador', 'Holy': 'Santo',
  'King': 'Rei', 'Shepherd': 'Pastor', 'Father': 'Pai',
  'to love': 'amar', 'to fear': 'temer', 'to know': 'conhecer',
  'to give': 'dar', 'to take': 'tomar', 'to go': 'ir',
  'to come': 'vir', 'to speak': 'falar', 'to say': 'dizer',
  'to see': 'ver', 'to hear': 'ouvir', 'to eat': 'comer',
  'to drink': 'beber', 'to sleep': 'dormir', 'to wake': 'despertar',
  'to stand': 'estar de pé', 'to sit': 'sentar', 'to walk': 'andar',
  'to run': 'correr', 'to fly': 'voar', 'to swim': 'nadar',
  'to dig': 'cavar', 'to build': 'construir', 'to destroy': 'destruir',
  'to kill': 'matar', 'to save': 'salvar', 'to redeem': 'resgatar',
  'to forgive': 'perdoar', 'to judge': 'julgar', 'to rule': 'governar',
  'to reign': 'reinar', 'to serve': 'servir', 'to worship': 'adorar',
  'to praise': 'louvar', 'to sing': 'cantar', 'to shout': 'gritar',
  'to weep': 'chorar', 'to laugh': 'rir', 'to rejoice': 'regozijar',
  'to mourn': 'prantear', 'to wait': 'esperar', 'to hope': 'esperar',
  'to trust': 'confiar', 'to believe': 'crer', 'to doubt': 'duvidar',
  'to obey': 'obedecer', 'to disobey': 'desobedecer', 'to sin': 'pecar',
  'to repent': 'arrepender-se', 'to convert': 'converter',
  'man': 'homem', 'woman': 'mulher', 'child': 'criança',
  'son': 'filho', 'daughter': 'filha', 'mother': 'mãe',
  'brother': 'irmão', 'sister': 'irmã', 'husband': 'marido',
  'wife': 'esposa', 'friend': 'amigo', 'enemy': 'inimigo',
  'neighbor': 'próximo', 'stranger': 'estrangeiro', 'queen': 'rainha',
  'prince': 'príncipe', 'servant': 'servo', 'prophet': 'profeta',
  'priest': 'sacerdote', 'judge': 'juiz', 'warrior': 'guerreiro',
  'soldier': 'soldado', 'head': 'cabeça', 'eye': 'olho',
  'ear': 'ouvido', 'nose': 'nariz', 'mouth': 'boca',
  'tongue': 'língua', 'tooth': 'dente', 'hand': 'mão',
  'finger': 'dedo', 'arm': 'braço', 'foot': 'pé',
  'heart': 'coração', 'soul': 'alma', 'spirit': 'espírito',
  'body': 'corpo', 'flesh': 'carne', 'bone': 'osso',
  'blood': 'sangue', 'skin': 'pele', 'hair': 'cabelo',
  'earth': 'terra', 'heaven': 'céu', 'sky': 'céu',
  'sun': 'sol', 'moon': 'lua', 'star': 'estrela',
  'water': 'água', 'sea': 'mar', 'river': 'rio',
  'mountain': 'montanha', 'hill': 'colina', 'valley': 'vale',
  'forest': 'floresta', 'tree': 'árvore', 'flower': 'flor',
  'grass': 'erva', 'stone': 'pedra', 'rock': 'rocha',
  'sand': 'areia', 'dust': 'pó', 'wind': 'vento',
  'fire': 'fogo', 'light': 'luz', 'darkness': 'trevas',
  'rain': 'chuva', 'snow': 'neve', 'cloud': 'nuvem',
  'lion': 'leão', 'ox': 'boi', 'bull': 'touro',
  'cow': 'vaca', 'sheep': 'ovelha', 'goat': 'cabra',
  'horse': 'cavalo', 'donkey': 'jumento', 'dog': 'cão',
  'bird': 'pássaro', 'eagle': 'águia', 'serpent': 'serpente',
  'fish': 'peixe', 'wolf': 'lobo', 'bear': 'urso',
  'bread': 'pão', 'wine': 'vinho', 'milk': 'leite',
  'honey': 'mel', 'oil': 'azeite', 'salt': 'sal',
  'meat': 'carne', 'fruit': 'fruta', 'grain': 'grão',
  'fig': 'figo', 'grape': 'uva', 'olive': 'oliva',
  'garment': 'vestimenta', 'robe': 'manto', 'tunic': 'túnica',
  'belt': 'cinto', 'sandals': 'sandálias', 'veil': 'véu',
  'cloak': 'capa', 'house': 'casa', 'tent': 'tenda',
  'city': 'cidade', 'wall': 'muro', 'gate': 'porta',
  'door': 'porta', 'window': 'janela', 'floor': 'chão',
  'roof': 'telhado', 'temple': 'templo', 'palace': 'palácio',
  'throne': 'trono', 'altar': 'altar', 'column': 'coluna',
  'day': 'dia', 'night': 'noite', 'morning': 'manhã',
  'evening': 'tarde', 'hour': 'hora', 'year': 'ano',
  'month': 'mês', 'week': 'semana', 'sabbath': 'sábado',
  'one': 'um', 'two': 'dois', 'three': 'três',
  'four': 'quatro', 'five': 'cinco', 'six': 'seis',
  'seven': 'sete', 'eight': 'oito', 'nine': 'nove',
  'ten': 'dez', 'hundred': 'cem', 'thousand': 'mil',
  'love': 'amor', 'faith': 'fé', 'hope': 'esperança',
  'peace': 'paz', 'joy': 'alegria', 'glory': 'glória',
  'grace': 'graça', 'mercy': 'misericórdia', 'justice': 'justiça',
  'wisdom': 'sabedoria', 'knowledge': 'conhecimento',
  'understanding': 'entendimento', 'truth': 'verdade',
  'life': 'vida', 'death': 'morte', 'sin': 'pecado',
  'evil': 'mal', 'good': 'bom', 'righteousness': 'retidão',
  'holiness': 'santidade', 'purity': 'pureza', 'strength': 'força',
  'power': 'poder', 'might': 'poder', 'courage': 'coragem',
  'fear': 'medo', 'terror': 'pavor', 'sorrow': 'tristeza',
  'grief': 'lamento', 'pain': 'dor', 'suffering': 'sofrimento',
  'trouble': 'aflição', 'distress': 'angústia', 'poverty': 'pobreza',
  'wealth': 'riqueza', 'riches': 'riquezas', 'hunger': 'fome',
  'thirst': 'sede', 'rest': 'descanso', 'sleep': 'sono',
  'dream': 'sonho', 'vision': 'visão', 'prophecy': 'profecia',
  'word': 'palavra', 'commandment': 'mandamento', 'law': 'lei',
  'statute': 'estatuto', 'judgment': 'julgamento', 'covenant': 'aliança',
  'testimony': 'testemunho', 'sign': 'sinal', 'wonder': 'maravilha',
  'miracle': 'milagre', 'salvation': 'salvação', 'redemption': 'redenção',
  'atonement': 'expiação', 'justification': 'justificação',
  'sanctification': 'santificação', 'resurrection': 'ressurreição',
  'kingdom': 'reino', 'church': 'igreja', 'gospel': 'evangeli',
  'blessing': 'bênção', 'curse': 'maldição', 'wrath': 'ira',
  'heaven': 'céu', 'hell': 'inferno', 'paradise': 'paraíso',
  'sword': 'espada', 'shield': 'escudo', 'bow': 'arco',
  'arrow': 'flecha', 'spear': 'lança', 'armor': 'armadura',
  'battle': 'batalha', 'war': 'guerra', 'victory': 'vitória',
  'defeat': 'derrota', 'siege': 'cerco', 'fortress': 'fortaleza',
  'seed': 'semente', 'harvest': 'colheita', 'sickle': 'foice',
  'plow': 'arado', 'vineyard': 'vinheda', 'garden': 'jardim',
  'field': 'campo', 'desert': 'deserto', 'wilderness': 'deserto',
  'kinsman': 'parente', 'redeemer': 'redentor', 'avenger': 'vingador',
  'orphan': 'órfão', 'widow': 'viúva', 'elder': 'ancião',
  'firstborn': 'primogênito', 'young': 'jovem', 'infant': 'lactente',
  'price': 'preço', 'value': 'valor', 'weight': 'peso',
  'measure': 'medida', 'scale': 'balança', 'money': 'dinheiro',
  'silver': 'prata', 'gold': 'ouro', 'copper': 'cobre',
  'iron': 'ferro', 'bronze': 'bronze', 'purple': 'púrpura',
  'scarlet': 'escarlata', 'blue': 'azul', 'red': 'vermelho',
  'white': 'branco', 'black': 'preto',
  'Abraham': 'Abraão', 'Isaac': 'Isaac', 'Jacob': 'Jacó',
  'Moses': 'Moisés', 'Aaron': 'Aarão', 'David': 'Davi',
  'Solomon': 'Salomão', 'Elijah': 'Eliseu', 'Elisha': 'Eliseu',
  'Isaiah': 'Isaías', 'Jeremiah': 'Jeremias', 'Ezekiel': 'Ezequiel',
  'Daniel': 'Daniel', 'Jonah': 'Jonas', 'Jesus': 'Jesus',
  'Christ': 'Cristo', 'Messiah': 'Messias', 'Apostle': 'Apóstolo',
  'Israel': 'Israel', 'Judah': 'Judá', 'Jerusalem': 'Jerusalém',
  'Zion': 'Sião', 'Babylon': 'Babilônia', 'Egypt': 'Egito',
  'Sinai': 'Sinai', 'Canaan': 'Canaã', 'Edom': 'Edom',
  'Moab': 'Moabe', 'Amom': 'Amom', 'Philistia': 'Filístia',
  'green': 'verde', 'wheat': 'trigo', 'barley': 'cevada',
  'grape': 'uva', 'vine': 'videira', 'pomegranate': 'romã',
  'apple': 'maçã', 'almond': 'amêndoa', 'cedar': 'cedro',
  'oak': 'carvalho', 'ypress': 'cipreste', 'palm': 'palmeira',
  'reed': 'junco', 'branch': 'ramo', 'leaf': 'folha',
  'root': 'raiz', 'branch': 'ramo', 'fruit': 'fruta',
  'blossom': 'flor', 'bud': 'botão', 'sprout': 'broto',
  'dew': 'orvalho', 'frost': 'geada', 'hail': 'granizo',
  'thunder': 'trovão', 'lightning': 'relâmpago', 'storm': 'tempestade',
  'wind': 'vento', 'breeze': 'brisa', 'whirlwind': 'redemoinho',
  'earthquake': 'terremoto', 'flood': 'inundação', 'drought': 'seca',
  'famine': 'fome', 'plague': 'praga', 'pestilence': 'pestilência',
  'leprosy': 'lepra', 'wound': 'ferida', 'scar': 'cicatriz',
  'bruise': 'contusão', 'bleeding': 'sangramento', 'healing': 'cura',
  'medicine': 'remédio', 'doctor': 'médico', 'sick': 'doente',
  'weak': 'fraco', 'strong': 'forte', 'brave': 'corajoso',
  'timid': 'tímido', 'wise': 'sábio', 'foolish': 'louco',
  'right': 'certo', 'wrong': 'errado', 'true': 'verdadeiro',
  'false': 'falso', 'pure': 'puro', 'impure': 'impuro',
  'clean': 'limpo', 'unclean': 'imundo', 'holy': 'santo',
  'profane': 'profano', 'sacred': 'sagrado', 'blessed': 'abençoado',
  'cursed': 'amaldiçoado', 'chosen': 'escolhido', 'rejected': 'rejeitado',
  'beloved': 'amado', 'hated': 'odiado', 'faithful': 'fiel',
  'unfaithful': 'infiel', 'obedient': 'obediente', 'rebellious': 'rebelde',
  'humble': 'humilde', 'proud': 'orgulhoso', 'meek': 'manso',
  'gentle': 'gentil', 'fierce': 'feroz', 'cruel': 'cruel',
  'merciful': 'misericordioso', 'gracious': 'gracioso', 'compassionate': 'compassivo',
  'jealous': 'ciumento', 'angry': 'irado', 'patient': 'paciente',
  'content': 'contente', 'anxious': 'ansioso', 'afraid': 'aterrorizado',
  'courageous': 'corajoso', 'fearful': 'temeroso', 'bold': 'ousado',
  'ashful': 'envergonhado', 'guilty': 'culpado', 'innocent': 'inocente',
  'righteous': 'justo', 'wicked': 'ímpio', 'evil': 'mau',
  'good': 'bom', 'bad': 'mau', 'beautiful': 'formoso',
  'ugly': 'feio', 'tall': 'alto', 'short': 'baixo',
  'old': 'velho', 'young': 'jovem', 'new': 'novo',
  'first': 'primeiro', 'last': 'último', 'beginning': 'princípio',
  'end': 'fim', 'eternity': 'eternidade', 'forever': 'para sempre',
  'always': 'sempre', 'never': 'nunca', 'today': 'hoje',
  'tomorrow': 'amanhã', 'yesterday': 'ontem', 'soon': 'logo',
  'late': 'tarde', 'early': 'cedo', 'quick': 'rápido',
  'slow': 'lento', 'hard': 'duro', 'soft': 'macio',
  'heavy': 'pesado', 'light': 'leve', 'big': 'grande',
  'small': 'pequeno', 'long': 'longo', 'wide': 'largo',
  'deep': 'profundo', 'high': 'alto', 'low': 'baixo',
  'near': 'perto', 'far': 'longe', 'inside': 'dentro',
  'outside': 'fora', 'above': 'acima', 'below': 'abaixo',
  'before': 'antes', 'after': 'depois', 'with': 'com',
  'without': 'sem', 'against': 'contra', 'for': 'para',
  'from': 'de', 'to': 'para', 'in': 'em',
  'on': 'sobre', 'under': 'sob', 'between': 'entre',
  'among': 'entre', 'through': 'através', 'around': 'ao redor',
  'into': 'dentro de', 'out of': 'fora de', 'up': 'cima',
  'down': 'baixo', 'forward': 'para frente', 'backward': 'para trás',
  'right': 'direita', 'left': 'esquerda', 'north': 'norte',
  'south': 'sul', 'east': 'leste', 'west': 'oeste',
  'east': 'oriente', 'west': 'ocidente',
};

// Função para traduzir
function traduzir(def) {
  if (!def || def.length === 0) return def;
  
  // Se já tem acento, já está em português
  if (/[àáâãçéêíóôõú]/i.test(def)) return def;
  
  // Tentar tradução exata
  const lower = def.toLowerCase().trim();
  if (DICT[lower]) return DICT[lower];
  
  // Tentar traduzir palavras individuais
  const words = lower.split(/\s+/);
  const translated = words.map(w => {
    const clean = w.replace(/[^a-z]/g, '');
    return DICT[clean] || w;
  });
  
  const result = translated.join(' ');
  if (result !== lower) return result;
  
  return def;
}

// Carregar léxico
const lexiconPath = resolve(ROOT, 'src/data/lexicon/hebraico.ts');
const raw = readFileSync(lexiconPath, 'utf8');
const lines = raw.split('\n');

let traduzidas = 0;
let mantidas = 0;
const output = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  // Verificar se é uma linha de entrada com definicao
  if (!line.includes("definicao: '")) {
    output.push(line);
    continue;
  }
  
  // Encontrar onde começa o valor
  const defStart = line.indexOf("definicao: '") + "definicao: '".length;
  
  // Encontrar onde termina
  let defEnd = -1;
  const morfIdx = line.indexOf("', morfologia:", defStart);
  const freqIdx = line.indexOf("', frequencia:", defStart);
  
  if (morfIdx > 0) defEnd = morfIdx;
  else if (freqIdx > 0) defEnd = freqIdx;
  
  if (defEnd < 0) {
    output.push(line);
    continue;
  }
  
  const before = line.substring(0, defStart);
  const defContent = line.substring(defStart, defEnd);
  const after = line.substring(defEnd);
  
  // Traduzir
  const traduzida = traduzir(defContent);
  
  if (traduzida !== defContent) {
    output.push(before + traduzida + after);
    traduzidas++;
  } else {
    output.push(line);
    mantidas++;
  }
}

writeFileSync(lexiconPath, output.join('\n'), 'utf8');
console.log(`✅ Traduzidas: ${traduzidas}`);
console.log(`ℹ️  Mantidas: ${mantidas}`);
