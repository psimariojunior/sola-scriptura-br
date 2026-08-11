// ═══════════════════════════════════════════════════════════════════════════════
// MORPHOLOGICAL PARSER — Análise gramatical detalhada para línguas bíblicas
// ═══════════════════════════════════════════════════════════════════════════════

export interface MorfologiaEstruturada {
  tipo: string;          // substantivo, verbo, adjetivo, advérbio, etc.
  tempo?: string;        // presente, pretérito, futuro, aoristo, imperfeito, perfeito
  voz?: string;          // ativa, passiva, média, medial
  modo?: string;         // indicativo, subjuntivo, imperativo, optativo, infinitivo, participio
  pessoa?: string;       // 1ª, 2ª, 3ª
  numero?: string;       // singular, plural
  genero?: string;       // masculino, feminino, neutro
  caso?: string;         // nominativo, genitivo, dativo, acusativo, vocativo
  stem?: string;         // Qal, Niphal, Piel, Pual, Hiphil, Hophal, Hithpael (hebraico)
  estado?: string;       // construto, absoluto, definido (hebraico)
  artigo?: boolean;      // tem artigo definido
  raiz?: string;         // raiz/hebraico original
  label: string;         // rótulo legível completo
}

// ═══════════════════════════════════════════════════════════════════════════════
// GREGO — Parsing de morfologia
// ═══════════════════════════════════════════════════════════════════════════════

const GREGO_TIPOS: Record<string, string> = {
  'Substantivo': 'substantivo',
  'Verbo': 'verbo',
  'Adjetivo': 'adjetivo',
  'Advérbio': 'advérbio',
  'Preposição': 'preposição',
  'Conjunção': 'conjunção',
  'Pronome': 'pronome',
  'Numeral': 'numeral',
  'Partícula': 'partícula',
  'Interjeição': 'interjeição',
  'Artigo': 'artigo',
};

const GREGO_GENEROS: Record<string, string> = {
  'masculino': 'masculino',
  'feminino': 'feminino',
  'neutro': 'neutro',
  'comum': 'comum',
};

const GREGO_NUMEROS: Record<string, string> = {
  'singular': 'singular',
  'plural': 'plural',
};

const GREGO_CASOS: Record<string, string> = {
  'nominativo': 'nominativo',
  'genitivo': 'genitivo',
  'dativo': 'dativo',
  'acusativo': 'acusativo',
  'vocativo': 'vocativo',
};

const GREGO_TEMPOS: Record<string, string> = {
  'presente': 'presente',
  'pretérito': 'pretérito',
  'imperfeito': 'imperfeito',
  'aoristo': 'aoristo',
  'futuro': 'futuro',
  'perfeito': 'perfeito',
  'pluperfeito': 'pluperfeito',
};

const GREGO_VOZES: Record<string, string> = {
  'ativa': 'ativa',
  'passiva': 'passiva',
  'média': 'média',
  'medial': 'média',
  'passiva/média': 'passiva/média',
};

const GREGO_MODOS: Record<string, string> = {
  'indicativo': 'indicativo',
  'subjuntivo': 'subjuntivo',
  'imperativo': 'imperativo',
  'optativo': 'optativo',
  'infinitivo': 'infinitivo',
  'particípio': 'particípio',
  'particípio presente': 'particípio',
  'particípio pretérito': 'particípio',
};

function parsearGrego(morfologia: string): MorfologiaEstruturada {
  const m = morfologia.toLowerCase();
  const result: MorfologiaEstruturada = {
    tipo: '',
    label: '',
  };

  // Detectar tipo
  for (const [key, val] of Object.entries(GREGO_TIPOS)) {
    if (m.includes(key.toLowerCase())) {
      result.tipo = val;
      break;
    }
  }

  // Detectar tempo verbal
  for (const [key, val] of Object.entries(GREGO_TEMPOS)) {
    if (m.includes(key)) {
      result.tempo = val;
      break;
    }
  }

  // Detectar voz
  for (const [key, val] of Object.entries(GREGO_VOZES)) {
    if (m.includes(key)) {
      result.voz = val;
      break;
    }
  }

  // Detectar modo
  for (const [key, val] of Object.entries(GREGO_MODOS)) {
    if (m.includes(key)) {
      result.modo = val;
      break;
    }
  }

  // Detectar pessoa
  if (m.includes('1ª pessoa') || m.includes('1a pessoa')) result.pessoa = '1ª';
  else if (m.includes('2ª pessoa') || m.includes('2a pessoa')) result.pessoa = '2ª';
  else if (m.includes('3ª pessoa') || m.includes('3a pessoa')) result.pessoa = '3ª';

  // Detectar número
  for (const [key, val] of Object.entries(GREGO_NUMEROS)) {
    if (m.includes(key)) {
      result.numero = val;
      break;
    }
  }

  // Detectar gênero
  for (const [key, val] of Object.entries(GREGO_GENEROS)) {
    if (m.includes(key)) {
      result.genero = val;
      break;
    }
  }

  // Detectar caso
  for (const [key, val] of Object.entries(GREGO_CASOS)) {
    if (m.includes(key)) {
      result.caso = val;
      break;
    }
  }

  // Detectar artigo
  result.artigo = m.includes('artigo');

  // Montar label legível
  const parts: string[] = [];
  if (result.tipo) parts.push(result.tipo.charAt(0).toUpperCase() + result.tipo.slice(1));
  if (result.tempo) parts.push(result.tempo);
  if (result.voz) parts.push(`voz ${result.voz}`);
  if (result.modo) parts.push(result.modo);
  if (result.pessoa) parts.push(`${result.pessoa} pessoa`);
  if (result.numero) parts.push(result.numero);
  if (result.genero) parts.push(result.genero);
  if (result.caso) parts.push(result.caso);
  result.label = parts.join(', ') || morfologia;

  return result;
}

// ═══════════════════════════════════════════════════════════════════════════════
// HEBRAICO — Parsing de morfologia
// ═══════════════════════════════════════════════════════════════════════════════

const HEBRAICO_STEMS: Record<string, string> = {
  'Qal': 'Qal (ativo simples)',
  'Niphal': 'Niphal (passivo/reflexivo)',
  'Piel': 'Piel (ativo intensivo)',
  'Pual': 'Pual (passivo intensivo)',
  'Hiphil': 'Hiphil (causativo ativo)',
  'Hophal': 'Hophal (causativo passivo)',
  'Hithpael': 'Hithpael (reflexivo)',
  'Poel': 'Poel (raro, ativo)',
  'Poal': 'Poal (raro, passivo)',
  'Hithpoel': 'Hithpoel (raro, reflexivo)',
  'Niphal perfecto': 'Niphal',
  'Piel imperfecto': 'Piel',
  'Qal particípio': 'Qal',
  'Hiphil particípio': 'Hiphil',
  'Niphal particípio': 'Niphal',
  'Piel particípio': 'Piel',
  'Qal infinitivo': 'Qal',
  'Hiphil infinitivo': 'Hiphil',
};

const HEBRAICO_TIPOS: Record<string, string> = {
  'substantivo': 'substantivo',
  'verbo': 'verbo',
  'adjetivo': 'adjetivo',
  'advérbio': 'advérbio',
  'preposição': 'preposição',
  'conjunção': 'conjunção',
  'pronome': 'pronome',
  'partícula': 'partícula',
  'artigo': 'artigo',
  'interjeição': 'interjeição',
};

function parsearHebraico(morfologia: string): MorfologiaEstruturada {
  const m = morfologia.toLowerCase();
  const result: MorfologiaEstruturada = {
    tipo: '',
    label: '',
  };

  // Detectar tipo
  for (const [key, val] of Object.entries(HEBRAICO_TIPOS)) {
    if (m.includes(key)) {
      result.tipo = val;
      break;
    }
  }

  // Detectar stem (binyan) — procurar na string original (case-sensitive)
  for (const [key, val] of Object.entries(HEBRAICO_STEMS)) {
    if (morfologia.includes(key) || m.includes(key.toLowerCase())) {
      result.stem = val;
      break;
    }
  }

  // Detectar tempo verbal hebraico
  if (m.includes('particípio') || m.includes('particpio')) result.modo = 'particípio';
  else if (m.includes('imperfeito')) result.tempo = 'imperfeito';
  else if (m.includes('perfeito')) result.tempo = 'perfeito';
  else if (m.includes('jussivo')) { result.tempo = 'jussivo'; result.modo = 'subjuntivo'; }
  else if (m.includes('imperativo')) result.modo = 'imperativo';
  else if (m.includes('infinitivo')) result.modo = 'infinitivo';
  else if (m.includes('consecutivo')) result.tempo = 'consecutivo';

  // Detectar pessoa
  if (m.includes('1ª pessoa') || m.includes('1a pessoa') || m.includes('1st person')) result.pessoa = '1ª';
  else if (m.includes('2ª pessoa') || m.includes('2a pessoa') || m.includes('2nd person')) result.pessoa = '2ª';
  else if (m.includes('3ª pessoa') || m.includes('3a pessoa') || m.includes('3rd person')) result.pessoa = '3ª';

  // Detectar número
  if (m.includes('plural')) result.numero = 'plural';
  else if (m.includes('singular')) result.numero = 'singular';

  // Detectar gênero
  if (m.includes('masculino')) result.genero = 'masculino';
  else if (m.includes('feminino')) result.genero = 'feminino';
  else if (m.includes('comum')) result.genero = 'comum';

  // Detectar estado hebraico
  if (m.includes('construto')) result.estado = 'construto';
  else if (m.includes('absoluto')) result.estado = 'absoluto';
  else if (m.includes('definido')) result.estado = 'definido';

  // Detectar artigo
  result.artigo = m.includes('artigo');

  // Montar label legível
  const parts: string[] = [];
  if (result.stem) parts.push(result.stem);
  if (result.tipo) parts.push(result.tipo.charAt(0).toUpperCase() + result.tipo.slice(1));
  if (result.tempo) parts.push(result.tempo);
  if (result.modo) parts.push(result.modo);
  if (result.pessoa) parts.push(`${result.pessoa} pessoa`);
  if (result.numero) parts.push(result.numero);
  if (result.genero) parts.push(result.genero);
  if (result.estado) parts.push(`estado ${result.estado}`);
  result.label = parts.join(', ') || morfologia;

  return result;
}

// ═══════════════════════════════════════════════════════════════════════════════
// API PÚBLICA
// ═══════════════════════════════════════════════════════════════════════════════

export function parsearMorfologia(morfologia: string, idioma: 'grego' | 'hebraico'): MorfologiaEstruturada {
  if (!morfologia) return { tipo: '', label: '' };
  if (idioma === 'grego') return parsearGrego(morfologia);
  return parsearHebraico(morfologia);
}

export function getCorMorfologia(campo: string): string {
  const cores: Record<string, string> = {
    tipo: 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-400',
    tempo: 'bg-amber-500/15 text-amber-600 dark:text-amber-400',
    voz: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400',
    modo: 'bg-rose-500/15 text-rose-600 dark:text-rose-400',
    pessoa: 'bg-pink-500/15 text-pink-600 dark:text-pink-400',
    numero: 'bg-cyan-500/15 text-cyan-600 dark:text-cyan-400',
    genero: 'bg-violet-500/15 text-violet-600 dark:text-violet-400',
    caso: 'bg-red-500/15 text-red-600 dark:text-red-400',
    stem: 'bg-green-500/15 text-green-600 dark:text-green-400',
    estado: 'bg-orange-500/15 text-orange-600 dark:text-orange-400',
  };
  return cores[campo] || 'bg-gray-500/15 text-gray-600 dark:text-gray-400';
}
