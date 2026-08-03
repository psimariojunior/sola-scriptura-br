#!/usr/bin/env node
/**
 * translate-hebrew-dict.mjs
 * 
 * Traduz definições hebraicas usando dicionário estático de palavras comuns.
 * Sem usar API - 100% offline.
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

// Dicionário hebraico-português (Strong's mais comuns)
const DICT = {
  // Nomes de Deus
  'God': 'Deus', 'LORD': 'Senhor', 'Jehovah': 'Jeová', 'Lord': 'Senhor',
  'Almighty': 'Todo-Poderoso', 'Creator': 'Criador', 'Holy': 'Santo',
  'King': 'Rei', 'Shepherd': 'Pastor', 'Father': 'Pai',
  
  // Ações comuns
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
  
  // Substantivos comuns
  'man': 'homem', 'woman': 'mulher', 'child': 'criança',
  'son': 'filho', 'daughter': 'filha', 'father': 'pai',
  'mother': 'mãe', 'brother': 'irmão', 'sister': 'irmã',
  'husband': 'marido', 'wife': 'esposa', 'friend': 'amigo',
  'enemy': 'inimigo', 'neighbor': 'próximo', 'stranger': 'estrangeiro',
  'king': 'rei', 'queen': 'rainha', 'prince': 'príncipe',
  'servant': 'servo', 'master': 'senhor', 'lord': 'senhor',
  'prophet': 'profeta', 'priest': 'sacerdote', 'priestess': 'sacerdotisa',
  'judge': 'juiz', 'warrior': 'guerreiro', 'soldier': 'soldado',
  
  // Corpos
  'head': 'cabeça', 'eye': 'olho', 'ear': 'ouvido',
  'nose': 'nariz', 'mouth': 'boca', 'tongue': 'língua',
  'tooth': 'dente', 'hand': 'mão', 'finger': 'dedo',
  'arm': 'braço', 'foot': 'pé', 'leg': 'perna',
  'heart': 'coração', 'soul': 'alma', 'spirit': 'espírito',
  'body': 'corpo', 'flesh': 'carne', 'bone': 'osso',
  'blood': 'sangue', 'skin': 'pele', 'hair': 'cabelo',
  
  // Natureza
  'earth': 'terra', 'heaven': 'céu', 'sky': 'céu',
  'sun': 'sol', 'moon': 'lua', 'star': 'estrela',
  'water': 'água', 'sea': 'mar', 'river': 'rio',
  'mountain': 'montanha', 'hill': 'colina', 'valley': 'vale',
  'forest': 'floresta', 'tree': 'árvore', 'flower': 'flor',
  'grass': 'erva', 'stone': 'pedra', 'rock': 'rocha',
  'sand': 'areia', 'dust': 'pó', 'wind': 'vento',
  'fire': 'fogo', 'light': 'luz', 'darkness': 'trevas',
  'rain': 'chuva', 'snow': 'neve', 'cloud': 'nuvem',
  
  // Animais
  'lion': 'leão', 'ox': 'boi', 'bull': 'touro',
  'cow': 'vaca', 'shepherd': 'pastor', 'sheep': 'ovelha',
  'goat': 'cabra', 'horse': 'cavalo', 'donkey': 'jumento',
  'dog': 'cão', 'cat': 'gato', 'bird': 'pássaro',
  'eagle': 'águia', 'serpent': 'serpente', 'fish': 'peixe',
  'wolf': 'lobo', 'bear': 'urso', 'deer': 'veado',
  
  // Comida
  'bread': 'pão', 'wine': 'vinho', 'milk': 'leite',
  'honey': 'mel', 'oil': 'azeite', 'salt': 'sal',
  'meat': 'carne', 'fruit': 'fruta', 'grain': 'grão',
  'fig': 'figo', 'grape': 'uva', 'olive': 'oliva',
  
  // Roupas
  'garment': 'vestimenta', 'robe': 'manto', 'tunic': 'túnica',
  'belt': 'cinto', 'sandals': 'sandálias', 'headband': 'turbante',
  'veil': 'véu', 'cloak': 'capa', 'cloak': 'manto',
  
  // Construções
  'house': 'casa', 'tent': 'tenda', 'city': 'cidade',
  'wall': 'muro', 'gate': 'porta', 'door': 'porta',
  'window': 'janela', 'floor': 'chão', 'roof': 'telhado',
  'temple': 'templo', 'palace': 'palácio', 'throne': 'trono',
  'altar': 'altar', 'column': 'coluna', 'pillar': 'coluna',
  
  // Tempo
  'day': 'dia', 'night': 'noite', 'morning': 'manhã',
  'evening': 'tarde', 'hour': 'hora', 'minute': 'minuto',
  'year': 'ano', 'month': 'mês', 'week': 'semana',
  'sabbath': 'sábado', 'passover': 'páscoa', 'jubilee': 'jubileu',
  
  // Números
  'one': 'um', 'two': 'dois', 'three': 'três',
  'four': 'quatro', 'five': 'cinco', 'six': 'seis',
  'seven': 'sete', 'eight': 'oito', 'nine': 'nove',
  'ten': 'dez', 'hundred': 'cem', 'thousand': 'mil',
  
  // Conceitos abstratos
  'love': 'amor', 'faith': 'fé', 'hope': 'esperança',
  'peace': 'paz', 'joy': 'alegria', 'glory': 'glória',
  'grace': 'graça', 'mercy': 'misericórdia', 'justice': 'justiça',
  'wisdom': 'sabedoria', 'knowledge': 'conhecimento', 'understanding': 'entendimento',
  'truth': 'verdade', 'life': 'vida', 'death': 'morte',
  'sin': 'pecado', 'evil': 'mal', 'good': 'bom',
  'righteousness': 'retidão', 'holiness': 'santidade', 'purity': 'pureza',
  'strength': 'força', 'power': 'poder', 'might': 'poder',
  'courage': 'coragem', 'fear': 'medo', 'terror': 'pavor',
  'sorrow': 'tristeza', 'grief': 'lamento', 'pain': 'dor',
  'suffering': 'sofrimento', 'trouble': 'aflição', 'distress': 'angústia',
  'poverty': 'pobreza', 'wealth': 'riqueza', 'riches': 'riquezas',
  'hunger': 'fome', 'thirst': 'sede', 'rest': 'descanso',
  'sleep': 'sono', 'dream': 'sonho', 'vision': 'visão',
  'prophecy': 'profecia', 'word': 'palavra', 'commandment': 'mandamento',
  'law': 'lei', 'statute': 'estatuto', 'judgment': 'julgamento',
  'covenant': 'aliança', 'testimony': 'testemunho', 'sign': 'sinal',
  'wonder': 'maravilha', 'miracle': 'milagre', 'sign': 'sinal',
  
  // Locais
  'Israel': 'Israel', 'Judah': 'Judá', 'Jerusalem': 'Jerusalém',
  'Zion': 'Sião', 'Babylon': 'Babilônia', 'Egypt': 'Egito',
  'Sinai': 'Sinai', 'Canaan': 'Canaã', 'Edom': 'Edom',
  'Moab': 'Moabe', 'Amom': 'Amom', 'Philistia': 'Filístia',
  
  // Pessoas bíblicas
  'Abraham': 'Abraão', 'Isaac': 'Isaac', 'Jacob': 'Jacó',
  'Moses': 'Moisés', 'Aaron': 'Aarão', 'David': 'Davi',
  'Solomon': 'Salomão', 'Elijah': 'Eliseu', 'Elisha': 'Eliseu',
  'Isaiah': 'Isaías', 'Jeremiah': 'Jeremias', 'Ezekiel': 'Ezequiel',
  'Daniel': 'Daniel', 'Jonah': 'Jonas', 'Jesus': 'Jesus',
  'Christ': 'Cristo', 'Messiah': 'Messias', 'Apostle': 'Apóstolo',
  
  // Termos teológicos
  'salvation': 'salvação', 'redemption': 'redenção', 'atonement': 'expiação',
  'justification': 'justificação', 'sanctification': 'santificação',
  'resurrection': 'ressurreição', 'ascension': 'ascensão',
  'kingdom': 'reino', 'church': 'igreja', 'gospel': 'evangeli',
  'blessing': 'bênção', 'curse': 'maldição', ' wrath': 'ira',
  'judgment': 'julgamento', 'heaven': 'céu', 'hell': 'inferno',
  'paradise': 'paraíso', 'hades': 'hades', 'sheol': 'sheol',
  
  // Termos legais/comerciais
  'price': 'preço', 'value': 'valor', 'weight': 'peso',
  'measure': 'medida', 'scale': 'balança', 'money': 'dinheiro',
  'silver': 'prata', 'gold': 'ouro', 'copper': 'cobre',
  'iron': 'ferro', 'bronze': 'bronze', 'tin': 'estanho',
  
  // Termos militares
  'sword': 'espada', 'shield': 'escudo', 'bow': 'arco',
  'arrow': 'flecha', 'spear': 'lança', 'armor': 'armadura',
  'battle': 'batalha', 'war': 'guerra', 'victory': 'vitória',
  'defeat': 'derrota', 'siege': 'cerco', 'fortress': 'fortaleza',
  
  // Termos agrícolas
  'seed': 'semente', 'harvest': 'colheita', 'sickle': 'foice',
  'plow': 'arado', 'ox': 'boi', 'threshing': 'debulha',
  'winepress': 'prensa', 'vineyard': 'vinheda', 'garden': 'jardim',
  'field': 'campo', 'desert': 'deserto', 'wilderness': 'deserto',
  
  // Termos de parentesco
  'kinsman': 'parente', 'redeemer': 'redentor', 'avenger': 'vingador',
  'orphan': 'órfão', 'widow': 'viúva', 'elder': 'ancião',
  'firstborn': 'primogênito', 'young': 'jovem', 'infant': 'lactente',
  
  // Termos de toilette
  'wash': 'lavar', 'anoint': 'ungir', 'shave': 'raspar',
  'bath': 'banho', 'perfume': 'perfume', 'spice': 'especiaria',
  
  // Termos de tecelagem
  'weave': 'tecer', 'spin': 'fiar', 'sew': 'costurar',
  'linen': 'linho', 'wool': 'lã', 'cotton': 'algodão',
  'purple': 'púrpura', 'scarlet': 'escarlata', 'blue': 'azul',
  'red': 'vermelho', 'white': 'branco', 'black': 'preto',
};

// Carregar cache existente
const cachePath = resolve(ROOT, 'temp/hebrew-translation-cache.json');
const { readFileSync: readFS, writeFileSync: writeFS, existsSync } = await import('node:fs');
let cache = {};
if (existsSync(cachePath)) {
  cache = JSON.parse(readFS(cachePath, 'utf8'));
}

// Função para traduzir usando dicionário
function translateWithDict(def) {
  // Se já tem acento, já está em português
  if (/[àáâãçéêíóôõú]/i.test(def)) return def;
  
  // Tentar tradução exata
  const lower = def.toLowerCase().trim();
  if (DICT[lower]) return DICT[lower];
  
  // Tentar traduzir palavras individuais
  const words = lower.split(/\s+/);
  const translated = words.map(w => {
    // Remover pontuação
    const clean = w.replace(/[^a-z]/g, '');
    if (DICT[clean]) return DICT[clean];
    return w; // Manter original se não encontrar
  });
  
  const result = translated.join(' ');
  
  // Se algo foi traduzido (diferente do original), usar
  if (result !== lower) return result;
  
  // Se não, retornar original
  return def;
}

// Carregar léxico
const lexiconPath = resolve(ROOT, 'src/data/lexicon/hebraico.ts');
const raw = readFS(lexiconPath, 'utf8');
const lines = raw.split('\n');

const defRegex = /definicao: '([^']*)'/;
let traduzidas = 0;
let mantidas = 0;

for (let i = 0; i < lines.length; i++) {
  const match = lines[i].match(defRegex);
  if (match) {
    const defEn = match[1];
    
    // Já em português
    if (/[àáâãçéêíóôõú]/i.test(defEn)) {
      mantidas++;
      continue;
    }
    
    // Traduzir com dicionário
    const traduzida = translateWithDict(defEn);
    if (traduzida !== defEn) {
      lines[i] = lines[i].replace(defRegex, `definicao: '${traduzida}'`);
      cache[defEn] = traduzida;
      traduzidas++;
    } else {
      mantidas++;
    }
  }
}

// Salvar cache
writeFS(cachePath, JSON.stringify(cache, null, 2), 'utf8');

// Salvar léxico
writeFS(lexiconPath, lines.join('\n'), 'utf8');

console.log(`✅ Traduzidas com dicionário: ${traduzidas}`);
console.log(`ℹ️  Mantidas (já PT ou sem tradução): ${mantidas}`);
console.log(`📦 Cache total: ${Object.keys(cache).length}`);
