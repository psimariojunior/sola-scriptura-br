import { livroPorAbreviacao } from '@/data/biblia/livros';

export type LexiconEntry = { strong: string; palavra: string; transliteracao: string; definicao: string; categoria?: string; frequencia?: number };
export type Testamento = 'AT' | 'NT';

export interface LexiconResult {
  entry: LexiconEntry;
  score: number;
}

const searchCache = new Map<string, LexiconResult[] | null>();
const strongCache = new Map<string, LexiconEntry | null>();
const STRONG_MAP = new Map<string, LexiconEntry>();

let loadedAT = false;
let loadedNT = false;
let palavrasHebraicas: LexiconEntry[] = [];
let palavrasAramaicas: LexiconEntry[] = [];
let palavrasGregas: LexiconEntry[] = [];

async function ensureAT() {
  if (loadedAT) return;
  const [hebraicoMod, aramaicoMod] = await Promise.all([
    import('@/data/lexicon/hebraico'),
    import('@/data/lexicon/aramaico'),
  ]);
  palavrasHebraicas = hebraicoMod.palavrasHebraicas;
  palavrasAramaicas = aramaicoMod.palavrasAramaicas;
  for (const entry of palavrasHebraicas) {
    STRONG_MAP.set(entry.strong.toUpperCase(), entry);
  }
  for (const entry of palavrasAramaicas) {
    STRONG_MAP.set(entry.strong.toUpperCase(), entry);
  }
  loadedAT = true;
}

async function ensureNT() {
  if (loadedNT) return;
  const gregoMod = await import('@/data/lexicon/grego');
  palavrasGregas = gregoMod.palavrasGregas;
  for (const entry of palavrasGregas) {
    STRONG_MAP.set(entry.strong.toUpperCase(), entry);
  }
  loadedNT = true;
}

async function ensureAll() {
  await Promise.all([ensureAT(), ensureNT()]);
}

function normalize(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s]/g, '')
    .trim();
}

function levenshtein(a: string, b: string): number {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  const matrix: number[][] = [];

  for (let i = 0; i <= b.length; i++) matrix[i] = [i];
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      const cost = b.charAt(i - 1) === a.charAt(j - 1) ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      );
    }
  }

  return matrix[b.length][a.length];
}

// Mapa de sinonimos biblicos em portugues para melhorar busca
const SINONIMOS: Record<string, string[]> = {
  'amor': ['agape', 'phileo', 'hesed', 'caridade'],
  'deus': ['el', 'eloim', 'theos', 'kurios', 'senhor'],
  'senhor': ['adonai', 'kurios', 'yhwh', 'jeova'],
  'fe': ['pistis', 'emunah', 'crenca', 'confianca'],
  'graca': ['charis', 'chen', 'favor', 'misericordia', 'bondade'],
  'salvacao': ['soteria', 'yeshua', 'redencao', 'libertacao'],
  'justica': ['dikaiosune', 'tsedaqah', 'retidao', 'equidade'],
  'paz': ['eirene', 'shalom', 'harmonia', 'tranquilidade'],
  'verdade': ['aletheia', 'emet', 'realidade', 'certeza'],
  'vida': ['zoe', 'chay', 'existencia', 'vivencia'],
  'morte': ['thanatos', 'maveth', 'falecimento', 'obito'],
  'luz': ['phos', 'or', 'brilho', 'luminosidade'],
  'trevas': ['skotos', 'choshek', 'escuridao', 'sombra'],
  'pecado': ['hamartia', 'chataath', 'erro', 'culpa', 'transgressao'],
  'perdoar': ['aphiemi', 'nasa', 'absolver', 'desculpar'],
  'orar': ['proseuchomai', 'palal', 'supplicar', 'implorar'],
  'louvar': ['aineo', 'halal', 'exaltar', 'glorificar'],
  'abençoar': ['eulogeo', 'barak', 'favorecer', 'beneficiar'],
  'criar': ['bara', 'ktizo', 'fazer', 'formar'],
  'amar': ['agapao', 'aheb', 'querer', 'estimar'],
  'crer': ['pisteuo', 'aman', 'acreditar', 'confiar'],
  'esperar': ['elpizo', 'qavah', 'aguardar', 'confiar'],
  'buscar': ['zeteo', 'baqash', 'procurar', 'investigar'],
  'servir': ['latreuo', 'abad', 'ministrar', 'ajudar'],
  'governar': ['basileuo', 'mashal', 'reinar', 'dominar'],
  'julgar': ['krino', 'shaphat', 'avaliar', 'sentenciar'],
  'destruir': ['apollymi', 'shamad', 'arruinar', 'eliminar'],
  'construir': ['oikodomeo', 'banah', 'edificar', 'erguer'],
  'misericordia': ['eleos', 'racham', 'rachamim', 'compaixao', 'piedade'],
  'sabedoria': ['sophia', 'chokmah', 'entendimento', 'prudencia', 'discernimento'],
  'conhecimento': ['gnosis', 'daath', 'entendimento'],
  'povo': ['laos', 'am', 'nacao', 'multidao'],
  'rei': ['basileus', 'melek', 'monarca', 'governante', 'soberano'],
  'profeta': ['prophetes', 'nabi', 'vidente', 'mensageiro'],
  'sacerdote': ['hiereus', 'kohen', 'ministro', 'levita'],
  'tempo': ['kairos', 'eth', 'hora', 'periodo'],
  'eternidade': ['aion', 'olam', 'infinito', 'perpetuidade'],
  'ceu': ['ouranos', 'shamayim', 'firmamento', 'paraiso'],
  'terra': ['ge', 'eretz', 'solo', 'mundo'],
  'mar': ['thalassa', 'yam', 'oceano', 'abismo'],
  'montanha': ['oros', 'har', 'elevacao', 'serra'],
  'rio': ['potamos', 'nahar', 'corrente', 'fluxo'],
  'cidade': ['polis', 'ir', 'municipio', 'urbs'],
  'casa': ['oikos', 'bayith', 'moradia', 'habitacao'],
  'porta': ['thyra', 'shaar', 'entrada', 'acesso'],
  'caminho': ['hodos', 'derek', 'senda', 'trilha'],
  'pedra': ['lithos', 'eben', 'rocha', 'calcario'],
  'arvore': ['dendron', 'ets', 'planta', 'vegetal'],
  'semente': ['sperma', 'zera', 'graemente', 'embriao'],
  'fruto': ['karpos', 'peri', 'colheita', 'produto'],
  'pao': ['artos', 'lechem', 'alimento', 'sustento'],
  'vinho': ['oinos', 'yayin', 'bebida', 'alcool'],
  'oleo': ['elaion', 'shemen', 'gordura', 'lubrificante'],
  'agua': ['hydor', 'mayim', 'liquido', 'fluid'],
  'fogo': ['pur', 'esh', 'chama', 'calor'],
  'sangue': ['haima', 'dam', 'plasma', 'hematia'],
  'coracao': ['kardia', 'leb', 'peito', 'sentimento'],
  'alma': ['psyche', 'nephesh', 'espirito', 'essencia'],
  'espirito': ['pneuma', 'ruach', 'sopro', 'vento'],
  'mao': ['cheir', 'yad', 'palma', 'dedo'],
  'pe': ['pous', 'regel', 'membro', 'extremidade'],
  'olho': ['ophthalmos', 'ayin', 'visao', 'pupila'],
  'ouvido': ['ous', 'ozen', 'audicao', 'timpao'],
  'boca': ['stoma', 'peh', 'labio', 'lingua'],
  'rosto': ['prosopon', 'panim', 'face', 'semblante'],
  'voz': ['phone', 'qol', 'som', 'audio'],
  'palavra': ['logos', 'dabar', 'termo', 'expressao'],
  'nome': ['onoma', 'shem', 'designacao', 'titulo'],
  'lei': ['nomos', 'torah', 'mandamento', 'estatuto'],
  'alianca': ['diatheqe', 'berith', 'pacto', 'contrato'],
  'sacrificio': ['thysia', 'zebach', 'oferta', 'oblação'],
  'oracao': ['proseuche', 'tephillah', 'suplica', 'peticao'],
  'louvor': ['ainesis', 'tehillah', 'exaltacao', 'glorificacao'],
  'bencao': ['eulogia', 'berakah', 'favor'],
  'maldicao': ['katara', 'qelalah', 'praga', 'anatema'],
  'juizo': ['krisis', 'mishpat', 'julgamento', 'sentenca'],
  'perdao': ['aphesis', 'selichah', 'remissao', 'absolvicao'],
  'redencao': ['apolytrosis', 'geullah', 'resgate', 'libertacao'],
  'ressurreicao': ['anastasis', 'tequmah', 'reviviscencia', 'retorno'],
  'criacao': ['ktisis', 'beriah', 'formacao', 'origem'],
  'revelacao': ['apokalypsis', 'galah', 'manifestacao', 'descoberta'],
  'inspiracao': ['theopneustos', 'sopro divino', 'influencia'],
  'profecia': ['propheteia', 'nebuah', 'predicao', 'mensagem'],
  'milagre': ['dynameis', 'mopheth', 'sinal', 'maravilha'],
  'parabola': ['parabole', 'mashal', 'comparacao', 'alegoria'],
  'batismo': ['baptisma', 'tevilah', 'imersao', 'purificacao'],
  'ceia': ['deipnon', 'seudah', 'jantar', 'refeicao'],
  'igreja': ['ekklesia', 'qahal', 'congregacao', 'assembleia'],
  'evangelho': ['euangelion', 'besorah', 'boa nova', 'mensagem'],
  'apostolos': ['apostoloi', 'sheluchim', 'enviados', 'mensageiros'],
  'discipulo': ['mathetes', 'talmid', 'aluno', 'seguidor'],
  'anjo': ['angelos', 'malakh', 'mensageiro', 'serafim'],
  'diabo': ['diabolos', 'satan', 'adversario', 'tentador'],
  'arrependimento': ['metanoia', 'teshuvah', 'conversao', 'mudanca'],
  'justificacao': ['dikaiosis', 'absolvicao', 'declaracao'],
  'santificacao': ['hagiasmos', 'qiddush', 'purificacao', 'consagracao'],
  'glorificacao': ['doxazo', 'kabad', 'exaltacao', 'honra'],
  'conversao': ['epistrophe', 'shuv', 'retorno', 'mudanca'],
  'perseveranca': ['hypomone', 'amad', 'constancia', 'firmeza'],
  'obediencia': ['hypakoe', 'shama', 'submissao', 'cumprimento'],
  'desobediencia': ['parakoe', 'meri', 'rebeliao', 'insubordinacao'],
  'disciplina': ['paideia', 'musar', 'educacao', 'treinamento'],
  'correcao': ['epanorthosis', 'tokachath', 'emenda', 'retificacao'],
  'instrucao': ['didaskalia', 'ensino', 'educacao'],
  'advertencia': ['nouthesia', 'ezrah', 'alerta', 'aviso'],
  'conselho': ['symboulion', 'etsah', 'orientacao'],
  'ajuda': ['boetheia', 'ezrah', 'socorro', 'assistencia'],
  'protecao': ['skepasma', 'magen', 'defesa', 'guarda'],
  'defesa': ['apologia', 'escudo'],
  'refugio': ['katakalypte', 'machaseh', 'abrigo', 'asilo'],
  'fortaleza': ['ochyroma', 'metsudah', 'forte', 'cidadela'],
  'torre': ['pyrgos', 'migdal', 'fortificacao', 'vigia'],
  'escudo': ['thyreos', 'protecao'],
  'espada': ['romphaia', 'chereb', 'arma', 'fio'],
  'lanca': ['dory', 'chanith', 'arma', 'haste'],
  'arco': ['toxon', 'qesheth', 'arma', 'projecao'],
  'flecha': ['belos', 'chets', 'projétil', 'dardo'],
  'soldado': ['stratiotes', 'chayil', 'guerreiro', 'militar'],
  'guerra': ['polemos', 'milchamah', 'conflito', 'batalha'],
  'vitoria': ['nike', 'teshuah', 'triunfo', 'conquista'],
  'derrota': ['hetta', 'makkah', 'perda', 'fracasso'],
  'exercito': ['stratia', 'tsaba', 'militar', 'tropas'],
  'imperio': ['arche', 'mamlakah', 'dominio', 'governo'],
  'reino': ['basileia', 'malkuth', 'dominio', 'territorio'],
  'trono': ['thronos', 'kisse', 'assento', 'cadeira'],
  'coroa': ['stephanos', 'atarah', 'diadema', 'ornamento'],
  'cetro': ['skeptron', 'shebet', 'bastao', 'autoridade'],
  'poder': ['exousia', 'koach', 'forca', 'autoridade'],
  'autoridade': ['exousia', 'memshalah', 'dominio', 'governo'],
  'governo': ['kubernesis', 'misharah', 'administracao', 'direcao'],
  'injustica': ['adikia', 'avel', 'desigualdade', 'parcialidade'],
  'opressao': ['thlipsis', 'osheq', 'tirania', 'crueldade'],
  'liberdade': ['eleutheria', 'deror', 'independencia', 'autonomia'],
  'escravidao': ['douleia', 'ebed', 'cativeiro', 'servidao'],
  'riqueza': ['ploutos', 'osher', 'abundancia', 'fortuna'],
  'pobreza': ['ptocheia', 'ani', 'necessidade', 'carência'],
  'fome': ['limos', 'raab', 'necessidade', 'carestia'],
  'sede': ['dipsos', 'tsama', 'necessidade', 'aridez'],
  'cansaço': ['kopos', 'yegaah', 'fadiga', 'esgotamento'],
  'descanso': ['anapausis', 'menuhah', 'repouso', 'alivio'],
  'doenca': ['malakia', 'choli', 'enfermidade'],
  'curaca': ['iasis', 'restauracao', 'restabelecimento'],
  'alegria': ['chara', 'simchah', 'gozo', 'felicidade'],
  'tristeza': ['lype', 'yagon', 'pesar', 'melancolia'],
  'esperanca': ['elpis', 'tiqvah', 'expectativa', 'confianca'],
  'desespero': ['apognosis', 'yoash', 'desesperanca', 'desanimo'],
  'medo': ['phobos', 'yirah', 'temor', 'pavor'],
  'coragem': ['tharsos', 'omets', 'bravura', 'ousadia'],
  'covardia': ['deilia', 'rats', 'fragilidade', 'fraqueza'],
  'loucura': ['moria', 'ivveleth', 'insensatez', 'estupidez'],
  'humildade': ['tapeinophrosyne', 'anavah', 'modestia', 'simplicidade'],
  'orgulho': ['hyperephania', 'gaon', 'soberba', 'vaidade'],
  'arrogancia': ['alazoneia', 'athaq', 'presuncao', 'petulancia'],
  'vaidade': ['mataiotes', 'hebel', 'futilidade', 'inutilidade'],
  'paciencia': ['makrothymia', 'erek', 'longanimidade', 'tolerancia'],
  'impaciencia': ['orgyia', 'qetseph', 'impetuosidade', 'impulsividade'],
  'fidelidade': ['pistis', 'emunah', 'lealdade', 'constancia'],
  'infidelidade': ['apistia', 'bagad', 'traiçao', 'deslealdade'],
  'compaixao': ['splanchna', 'rachamim', 'piedade'],
  'crueldade': ['sklerotes', 'achzari', 'brutalidade', 'ferocidade'],
  'bondade': ['chrestotes', 'tub', 'gentileza', 'beneficencia'],
  'maldade': ['poneria', 'ra', 'perversidade'],
  'vinganca': ['ekdikesis', 'naqam', 'retaliação', 'retribuicao'],
  'reconciliacao': ['katallage', 'harmonia'],
  'inimizade': ['echthra', 'ebah', 'hostilidade', 'rivalidade'],
  'amizade': ['philia', 'chaber', 'companheirismo', 'irmandade'],
  'solidao': ['monos', 'badad', 'isolamento', 'abandono'],
  'companhia': ['koinonia', 'convivencia', 'comunhao'],
  'casamento': ['gamos', 'nissuin', 'uniao', 'matrimonio'],
  'divorcio': ['apostasion', 'kerituth', 'separacao', 'dissolucao'],
  'orfandade': ['orphania', 'abandono', 'desamparo'],
  'viuvez': ['chera', 'almanah', 'perda'],
  'nascimento': ['gennesis', 'ledet', 'origem', 'vinda'],
  'temporal': ['momento'],
  'libertacao': ['rhyomai', 'palat', 'resgate'],
};

function scoreMatch(query: string, entry: LexiconEntry): number {
  const q = normalize(query);
  const transliteration = normalize(entry.transliteracao);
  const definicao = normalize(entry.definicao);

  if (transliteration === q) return 1.0;
  if (definicao === q) return 1.0;
  if (definicao.includes(q) && q.length >= 3) return 0.95;
  if (q.includes(transliteration) && transliteration.length >= 3) return 0.9;
  if (transliteration.includes(q) && q.length >= 3) return 0.85;

  const qLower = query.toLowerCase();
  if (SINONIMOS[qLower]) {
    const sinonimos = SINONIMOS[qLower];
    for (const sinonimo of sinonimos) {
      if (transliteration.includes(normalize(sinonimo)) || definicao.includes(normalize(sinonimo))) {
        return 0.8;
      }
    }
  }

  const maxLen = Math.max(q.length, transliteration.length);
  if (maxLen >= 4) {
    const dist = levenshtein(q, transliteration);
    if (dist <= 2) {
      return 0.7 + (1 - dist / maxLen) * 0.15;
    }
  }

  const words = definicao.split(/\s+/);
  for (const word of words) {
    if (normalize(word) === q && q.length >= 3) return 0.6;
  }

  if (q.length >= 4 && transliteration.startsWith(q)) return 0.5;

  return 0;
}

export async function getStrongByNumber(number: string): Promise<LexiconEntry | null> {
  await ensureAll();
  const key = number.toUpperCase().trim();
  const cached = strongCache.get(key);
  if (cached !== undefined) return cached;

  const entry = STRONG_MAP.get(key) ?? null;
  strongCache.set(key, entry);
  return entry;
}

export async function findWordInText(word: string, testamento?: Testamento): Promise<LexiconResult[]> {
  const cacheKey = testamento ? `${normalize(word)}:${testamento}` : normalize(word);
  const cached = searchCache.get(cacheKey);
  if (cached !== undefined) return cached ?? [];

  // Load only what's needed based on testament
  if (testamento === 'AT') {
    await ensureAT();
  } else if (testamento === 'NT') {
    await ensureNT();
  } else {
    await ensureAll();
  }

  const results: LexiconResult[] = [];

  if (testamento === 'AT' || !testamento) {
    for (const entry of palavrasHebraicas) {
      const score = scoreMatch(word, entry);
      if (score > 0) results.push({ entry, score });
    }
    for (const entry of palavrasAramaicas) {
      const score = scoreMatch(word, entry);
      if (score > 0) results.push({ entry, score });
    }
  }

  if (testamento === 'NT' || !testamento) {
    for (const entry of palavrasGregas) {
      const score = scoreMatch(word, entry);
      if (score > 0) results.push({ entry, score });
    }
  }

  results.sort((a, b) => b.score - a.score);

  if (results.length > 10) results.length = 10;

  searchCache.set(cacheKey, results.length > 0 ? results : null);
  return results;
}

export function isHebrewStrong(strong: string): boolean {
  return strong.toUpperCase().startsWith('H');
}

export function isGreekStrong(strong: string): boolean {
  return strong.toUpperCase().startsWith('G');
}

export function getTestamentoByLivro(livroAbreviacao: string): Testamento | null {
  const livro = livroPorAbreviacao.get(livroAbreviacao.toLowerCase());
  return livro?.testamento ?? null;
}
