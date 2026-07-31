import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const ROOT = join(import.meta.dirname, '..', '..');
const GREGO_FILE = join(ROOT, 'src', 'data', 'lexicon', 'grego.ts');

// Common English morphology terms → Portuguese
const MORPHOLOGY_MAP = {
  'from': 'de',
  'of': 'de',
  'and': 'e',
  'or': 'ou',
  'a': 'um',
  'an': 'um',
  'the': 'o',
  'Nominative': 'Nominativo',
  'Genitive': 'Genitivo',
  'Dative': 'Dativo',
  'Accusative': 'Acusativo',
  'Vocative': 'Vocativo',
  'substantivo': 'substantivo',
  'adjective': 'adjetivo',
  'adverb': 'advérbio',
  'verb': 'verbo',
  'preposition': 'preposição',
  'conjunction': 'conjunção',
  'pronoun': 'pronome',
  'numeral': 'numeral',
  'particle': 'partícula',
  'interjection': 'interjeição',
  'masculine': 'masculino',
  'feminine': 'feminino',
  'neuter': 'neutro',
  'singular': 'singular',
  'plural': 'plural',
  'nominative': 'nominativo',
  'genitive': 'genitivo',
  'dative': 'dativo',
  'accusative': 'acusativo',
  'vocative': 'vocativo',
  'imperative': 'imperativo',
  'indicative': 'indicativo',
  'subjunctive': 'subjuntivo',
  'optative': 'optativo',
  'participle': 'particípio',
  'infinitive': 'infinitivo',
  'present': 'presente',
  'imperfect': 'imperfeito',
  'aorist': 'aoristo',
  'perfect': 'perfeito',
  'future': 'futuro',
  'active': 'ativo',
  'passive': 'passivo',
  'middle': 'média voz',
  'primary': 'primário',
  'secondary': 'secundário',
  'first': 'primeira',
  'second': 'segunda',
  'third': 'terceira',
  'person': 'pessoa',
  'people': 'povo',
  'Article': 'Artigo',
  'article': 'artigo',
  'Proper': 'Próprio',
  'proper': 'próprio',
  'name': 'nome',
  'Adjective': 'Adjetivo',
  'Noun': 'Substantivo',
  'Verb': 'Verbo',
  'Adverb': 'Advérbio',
  'Preposition': 'Preposição',
  'Conjunction': 'Conjunção',
  'Pronoun': 'Pronome',
  'Numeral': 'Numeral',
  'Particle': 'Partícula',
  'Interjection': 'Interjeição',
  'Masculine': 'Masculino',
  'Feminine': 'Feminino',
  'Neuter': 'Neutro',
  'Singular': 'Singular',
  'Plural': 'Plural',
  'Nominative': 'Nominativo',
  'Genitive': 'Genitivo',
  'Dative': 'Dativo',
  'Accusative': 'Acusativo',
  'Vocative': 'Vocativo',
  'Imperative': 'Imperativo',
  'Indicative': 'Indicativo',
  'Subjunctive': 'Subjuntivo',
  'Optative': 'Optativo',
  'Participle': 'Particípio',
  'Infinitive': 'Infinitivo',
  'Present': 'Presente',
  'Imperfect': 'Imperfeito',
  'Aorist': 'Aoristo',
  'Perfect': 'Perfeito',
  'Future': 'Futuro',
  'Active': 'Ativo',
  'Passive': 'Passivo',
  'Middle': 'Média voz',
  'Primary': 'Primário',
  'Secondary': 'Secundário',
  'First': 'Primeira',
  'Second': 'Segunda',
  'Third': 'Terceira',
  'Person': 'Pessoa',
  'People': 'Povo',
  'Indeclinable': 'Indeclinável',
  'indeclinable': 'indeclinável',
  'definite': 'definido',
  'indefinite': 'indefinido',
  'relative': 'relativo',
  'demonstrative': 'demonstrativo',
  'interrogative': 'interrogativo',
  'Negative': 'Negativo',
  'negative': 'negativo',
  'Comparative': 'Comparativo',
  'comparative': 'comparativo',
  'Superlative': 'Superlativo',
  'superlative': 'superlativo',
};

// Common English usage terms → Portuguese
const USO_MAP = {
  'vessel': 'recipiente',
  'error': 'erro',
  'ignorance': 'ignorância',
  'flock': 'rebanho',
  'place': 'lugar',
  'coast': 'costa',
  'licence': 'licença',
  'room': 'sala',
  'towel': 'toalha',
  'superscription': 'inscrição',
  'inscription': 'inscrição',
  'division': 'divisão',
  'sedition': 'sedição',
  'amiss': 'errado',
  'harm': 'mal',
  'unreasonable': 'irrazoável',
  'well-doing': 'fazer o bem',
  'virtue': 'virtude',
  'John': 'João',
  'at all': 'de modo algum',
  'commonly': 'comumente',
  'utterly': 'completamente',
  'darkness': 'escuridão',
  'blind': 'cego',
  'obscure': 'obscuro',
  'group': 'grupo',
  'general': 'geral',
  'limited': 'limitado',
  'spot': 'mancha',
  'synonym': 'sinônimo',
  'antonym': 'antônimo',
  'see also': 'ver também',
  'that is': 'ou seja',
  'i.e.': 'ou seja',
  'e.g.': 'por exemplo',
  'lit.': 'literalmente',
  'fig.': 'figurativamente',
  'sometimes': 'às vezes',
  'used of': 'usado para',
  'used in': 'usado em',
  'used for': 'usado para',
  'to': 'para',
  'from': 'de',
  'with': 'com',
  'in': 'em',
  'on': 'sobre',
  'by': 'por',
  'of': 'de',
  'and': 'e',
  'or': 'ou',
  'the': 'o',
  'a': 'um',
  'an': 'um',
  'this': 'isto',
  'that': 'isso',
  'which': 'que',
  'who': 'quem',
  'whom': 'a quem',
  'whose': 'cujo',
  'where': 'onde',
  'when': 'quando',
  'why': 'por que',
  'how': 'como',
  'what': 'o quê',
  'all': 'todos',
  'every': 'cada',
  'each': 'cada',
  'both': 'ambos',
  'neither': 'nenhum',
  'none': 'nenhum',
  'nothing': 'nada',
  'something': 'algo',
  'anything': 'qualquer coisa',
  'everything': 'tudo',
  'someone': 'alguém',
  'anyone': 'qualquer pessoa',
  'everyone': 'todos',
  'nobody': 'ninguém',
  'not': 'não',
  'no': 'não',
  'yes': 'sim',
  'perhaps': 'talvez',
  'certainly': 'certamente',
  'truly': 'verdadeiramente',
  'really': 'realmente',
  'very': 'muito',
  'much': 'muito',
  'many': 'muitos',
  'few': 'poucos',
  'little': 'pouco',
  'great': 'grande',
  'large': 'grande',
  'small': 'pequeno',
  'long': 'longo',
  'short': 'curto',
  'high': 'alto',
  'low': 'baixo',
  'new': 'novo',
  'old': 'antigo',
  'good': 'bom',
  'bad': 'mau',
  'evil': 'mau',
  'right': 'certo',
  'wrong': 'errado',
  'true': 'verdadeiro',
  'false': 'falso',
  'first': 'primeiro',
  'last': 'último',
  'next': 'próximo',
  'before': 'antes',
  'after': 'depois',
  'here': 'aqui',
  'there': 'lá',
  'above': 'acima',
  'below': 'abaixo',
  'inside': 'dentro',
  'outside': 'fora',
  'up': 'cima',
  'down': 'baixo',
  'away': 'longe',
  'back': 'voltar',
  'forward': 'para frente',
  'together': 'juntos',
  'apart': 'separados',
  'already': 'já',
  'still': 'ainda',
  'again': 'novamente',
  'once': 'uma vez',
  'twice': 'duas vezes',
  'often': 'frequentemente',
  'seldom': 'raramente',
  'never': 'nunca',
  'always': 'sempre',
  'sometimes': 'às vezes',
  'now': 'agora',
  'then': 'então',
  'soon': 'em breve',
  'late': 'tarde',
  'early': 'cedo',
  'quickly': 'rapidamente',
  'slowly': 'lentamente',
  'gently': 'suavemente',
  'loudly': 'alto',
  'quietly': 'silenciosamente',
  'carefully': 'cuidadosamente',
  'easily': 'facilmente',
  'hardly': 'dificilmente',
  'nearly': 'quase',
  'about': 'sobre',
  'around': 'ao redor',
  'through': 'através',
  'across': 'através',
  'against': 'contra',
  'toward': 'em direção a',
  'towards': 'em direção a',
  'among': 'entre',
  'between': 'entre',
  'within': 'dentro de',
  'without': 'sem',
  'under': 'sob',
  'over': 'sobre',
  'behind': 'atrás',
  'beside': 'ao lado de',
  'besides': 'além de',
  'instead': 'em vez de',
  'except': 'exceto',
  'including': 'incluindo',
  'excluding': 'excluindo',
  'according to': 'segundo',
  'because': 'porque',
  'although': 'embora',
  'while': 'enquanto',
  'until': 'até',
  'since': 'desde',
  'if': 'se',
  'unless': 'a menos que',
  'whether': 'se',
  'as': 'como',
  'like': 'como',
  'than': 'do que',
  'rather': 'preferivelmente',
  'instead': 'em vez',
  'therefore': 'portanto',
  'however': 'porém',
  'moreover': 'além disso',
  'furthermore': 'além disso',
  'nevertheless': 'no entanto',
  'meanwhile': 'entretanto',
  'otherwise': 'caso contrário',
  'indeed': 'de fato',
  'enough': 'suficiente',
  'too': 'demais',
  'also': 'também',
  'even': 'até',
  'just': 'apenas',
  'only': 'apenas',
  'simply': 'simplesmente',
  'merely': 'apenas',
  'hardly': 'dificilmente',
  'scarcely': 'dificilmente',
  'barely': 'dificilmente',
  'quite': 'bastante',
  'rather': 'bastante',
  'somewhat': 'um pouco',
  'entirely': 'inteiramente',
  'completely': 'completamente',
  'totally': 'totalmente',
  'absolutely': 'absolutamente',
  'perfectly': 'perfeitamente',
  'exactly': 'exatamente',
  'precisely': 'precisamente',
  'closely': 'de perto',
  'directly': 'diretamente',
  'immediately': 'imediatamente',
  'suddenly': 'subitamente',
  'finally': 'finalmente',
  'recently': 'recentemente',
  'lately': 'recentemente',
  'formerly': 'anteriormente',
  'previously': 'anteriormente',
  'previously': 'anteriormente',
  'henceforth': 'a partir de agora',
  'hereafter': 'depois disto',
  'thenceforth': 'a partir daí',
  'wherefore': 'por isso',
  'whereto': 'para onde',
  'whence': 'de onde',
  'wherein': 'no qual',
  'whereby': 'pelo qual',
  'wherewith': 'com o qual',
  'whereby': 'pelo qual',
  'therein': 'nele',
  'thereby': 'por isso',
  'therewith': 'com isso',
  'thereupon': 'em seguida',
  'herein': 'nisto',
  'hereby': 'por isso',
  'herewith': 'com isto',
  'whereupon': 'em seguida',
};

// Detect if text is primarily English
function isEnglish(text) {
  if (!text || text.length < 3) return false;
  
  // Check for common English words
  const englishWords = /\b(to|the|and|of|in|for|is|a|an|or|but|with|from|by|on|at|that|this|which|who|whom|whose|where|when|why|how|what|not|no|yes|very|much|many|few|little|great|good|bad|new|old|first|last|long|high|low|all|every|each|both|neither|none|something|anything|everything|someone|anyone|everyone|nobody|perhaps|certainly|truly|really|already|still|again|once|twice|often|seldom|never|always|sometimes|now|then|soon|late|early|quickly|slowly|gently|loudly|quietly|carefully|easily|hardly|nearly|about|around|through|across|against|toward|towards|among|between|within|without|under|over|behind|beside|besides|instead|except|including|excluding|according|because|although|while|until|since|unless|whether|as|like|than|rather|therefore|however|moreover|furthermore|nevertheless|meanwhile|otherwise|indeed|enough|too|also|even|just|only|simply|merely|quite|somewhat|entirely|completely|totally|absolutely|perfectly|exactly|precisely|closely|directly|immediately|suddenly|finally|recently|formerly|previously|henceforth|hereafter|thenceforth|wherefore|whereto|whence|wherein|whereby|wherewith|therein|thereby|therewith|thereupon|herein|hereby|herewith|whereupon)\b/i;
  
  const words = text.split(/\s+/);
  let englishCount = 0;
  let totalWords = 0;
  
  for (const word of words) {
    if (word.length > 2) {
      totalWords++;
      if (englishWords.test(word)) {
        englishCount++;
      }
    }
  }
  
  return totalWords > 0 && (englishCount / totalWords) > 0.3;
}

// Translate morphology
function translateMorphology(morph) {
  if (!morph) return morph;
  
  // Pattern: "from G18 (agathos) and G2041 (ergon);" → "de G18 (ἀγαθός) e G2041 (ἔργον);"
  let result = morph;
  
  // Simple word replacements
  for (const [eng, por] of Object.entries(MORPHOLOGY_MAP)) {
    result = result.replace(new RegExp(`\\b${eng}\\b`, 'g'), por);
  }
  
  return result;
}

// Translate usage
function translateUsage(usage) {
  if (!usage) return usage;
  
  let result = usage;
  
  // Simple word replacements for common terms
  for (const [eng, por] of Object.entries(USO_MAP)) {
    result = result.replace(new RegExp(`\\b${eng.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi'), por);
  }
  
  return result;
}

// Generate short definition from long definition
function generateShortDef(longDef) {
  if (!longDef) return '';
  
  // Take first sentence or first 80 chars
  let short = longDef.split('.')[0];
  if (short.length > 80) {
    short = short.substring(0, 77) + '...';
  }
  
  // Clean up
  short = short.trim();
  if (short.endsWith(',')) short = short.slice(0, -1);
  
  return short;
}

// Main processing
console.log('Carregando grego.ts...');
let content = readFileSync(GREGO_FILE, 'utf-8');
const lines = content.split('\n');

let definicaoResumidaFixed = 0;
let morphologiaFixed = 0;
let usoFixed = 0;
let mojibakeFixed = 0;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  // Match Greek entry line
  if (!line.includes("strong: 'G")) continue;
  
  // Fix definicaoResumida
  const resumidaMatch = line.match(/definicaoResumida:\s*'([^']*)'/);
  if (resumidaMatch) {
    const current = resumidaMatch[1];
    
    // Check for mojibake/garbled text
    if (/[pumrum|trumbumlhumr|emdignumcao|ignemumce|compumrumr|bunse|nãoum]/.test(current)) {
      // Extract from definicao field
      const defMatch = line.match(/definicao:\s*'([^']*)'/);
      if (defMatch) {
        const shortDef = generateShortDef(defMatch[1]);
        if (shortDef && shortDef !== current) {
          lines[i] = lines[i].replace(
            /definicaoResumida:\s*'[^']*'/,
            `definicaoResumida: '${shortDef.replace(/'/g, "\\'")}'`
          );
          mojibakeFixed++;
        }
      }
    } else if (isEnglish(current)) {
      // Try to generate from definicao
      const defMatch = line.match(/definicao:\s*'([^']*)'/);
      if (defMatch) {
        const longDef = defMatch[1];
        // Check if definicao is in Portuguese
        if (!isEnglish(longDef)) {
          const shortDef = generateShortDef(longDef);
          if (shortDef && shortDef !== current) {
            lines[i] = lines[i].replace(
              /definicaoResumida:\s*'[^']*'/,
              `definicaoResumida: '${shortDef.replace(/'/g, "\\'")}'`
            );
            definicaoResumidaFixed++;
          }
        }
      }
    }
  }
  
  // Fix morphologia
  const morphMatch = line.match(/morphologia:\s*'([^']*)'/);
  if (morphMatch) {
    const current = morphMatch[1];
    if (isEnglish(current) && current.includes('G')) {
      const translated = translateMorphology(current);
      if (translated !== current) {
        lines[i] = lines[i].replace(
          /morphologia:\s*'[^']*'/,
          `morphologia: '${translated.replace(/'/g, "\\'")}'`
        );
        morphologiaFixed++;
      }
    }
  }
  
  // Fix uso
  const usoMatch = line.match(/uso:\s*'([^']*)'/);
  if (usoMatch) {
    const current = usoMatch[1];
    if (isEnglish(current)) {
      const translated = translateUsage(current);
      if (translated !== current) {
        lines[i] = lines[i].replace(
          /uso:\s*'[^']*'/,
          `uso: '${translated.replace(/'/g, "\\'")}'`
        );
        usoFixed++;
      }
    }
  }
}

writeFileSync(GREGO_FILE, lines.join('\n'), 'utf-8');

console.log(`\n✅ Limpeza concluída:`);
console.log(`  ✓ ${definicaoResumidaFixed} definicaoResumida traduzidas`);
console.log(`  ✓ ${mojibakeFixed} mojibake corrigidos`);
console.log(`  ✓ ${morphologiaFixed} morphologia traduzidas`);
console.log(`  ✓ ${usoFixed} uso traduzidos`);
console.log(`  Total: ${definicaoResumidaFixed + mojibakeFixed + morphologiaFixed + usoFixed} campos corrigidos`);
