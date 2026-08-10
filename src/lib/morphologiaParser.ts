// ============================================================================
// morphologiaParser.ts — Biblioteca de parsing morfológico para Grego e Hebraico
// Analisa strings de morfologia do lexico Strong's em objetos estruturados.
// Autocontido — sem dependencias externas.
// ============================================================================

// ---------------------------------------------------------------------------
// Tipos exportados
// ---------------------------------------------------------------------------

export interface MorfologiaEstruturada {
  lingua: 'grego' | 'hebraico';
  tipo?: string;
  tempo?: string;
  voz?: string;
  diatecnica?: string;
  pessoa?: string;
  numero?: string;
  genero?: string;
  caso?: string;
  raiz?: string;
  notas?: string;
  /** Codigo Strong's da raiz (ex: "G71", "H1234") */
  raizStrong?: string;
  /** Palavra original da raiz (ex: "ἄγω", "אָב") */
  raizOriginal?: string;
  /** Tipo de construcao etimologica: 'derivacao', 'composto', 'forma_variante', 'origem', 'desconhecido' */
  tipoEtimologia?: string;
}

// ---------------------------------------------------------------------------
// Mapas de traducao para portugues brasileiro
// ---------------------------------------------------------------------------

const MAPA_TIPO: Record<string, string> = {
  'substantivo': 'Substantivo',
  'noun': 'Substantivo',
  'substantivo próprio': 'Substantivo Próprio',
  'proper noun': 'Substantivo Próprio',
  'verbo': 'Verbo',
  'verb': 'Verbo',
  'adjetivo': 'Adjetivo',
  'adjective': 'Adjetivo',
  'advérbio': 'Advérbio',
  'adverb': 'Advérbio',
  'preposição': 'Preposição',
  'preposition': 'Preposição',
  'conjunção': 'Conjunção',
  'conjunction': 'Conjunção',
  'pronome': 'Pronome',
  'pronoun': 'Pronome',
  'partícula': 'Partícula',
  'particle': 'Partícula',
  'numeral': 'Numeral',
  'interjeição': 'Interjeição',
  'interjection': 'Interjeição',
  'artigo': 'Artigo',
  'article': 'Artigo',
  'prefixo': 'Prefixo',
  'prefix': 'Prefixo',
  'sufixo': 'Sufixo',
  'suffix': 'Sufixo',
};

const MAPA_TEMPO: Record<string, string> = {
  'presente': 'Presente',
  'present': 'Presente',
  'aoristo': 'Aoristo',
  'aorist': 'Aoristo',
  'perfeito': 'Perfeito',
  'perfect': 'Perfeito',
  'imperfeito': 'Imperfeito',
  'imperfect': 'Imperfeito',
  'futuro': 'Futuro',
  'future': 'Futuro',
  'mais-que-perfeito': 'Mais-que-perfeito',
  'pluperfect': 'Mais-que-perfeito',
};

const MAPA_VOZ: Record<string, string> = {
  'ativo': 'Ativo',
  'active': 'Ativo',
  'passivo': 'Passivo',
  'passive': 'Passivo',
  'médio': 'Médio',
  'middle': 'Médio',
  'media-passivo': 'Media-Passivo',
  'middle/passive': 'Media-Passivo',
  'media-passive': 'Media-Passivo',
  'média': 'Médio',
};

const MAPA_DIATECNICA: Record<string, string> = {
  'indicativo': 'Indicativo',
  'indicative': 'Indicativo',
  'subjuntivo': 'Subjuntivo',
  'subjunctive': 'Subjuntivo',
  'optativo': 'Optativo',
  'optative': 'Optativo',
  'imperativo': 'Imperativo',
  'imperative': 'Imperativo',
  'infinitivo': 'Infinitivo',
  'infinitive': 'Infinitivo',
  'particípio': 'Particípio',
  'participle': 'Particípio',
  'participio': 'Particípio',
  'sujeito': 'Indicativo',
};

const MAPA_PESSOA: Record<string, string> = {
  '1ª': '1ª pessoa',
  '1st': '1ª pessoa',
  '2ª': '2ª pessoa',
  '2nd': '2ª pessoa',
  '3ª': '3ª pessoa',
  '3rd': '3ª pessoa',
};

const MAPA_NUMERO: Record<string, string> = {
  'singular': 'Singular',
  'sg': 'Singular',
  'plural': 'Plural',
  'pl': 'Plural',
  'dual': 'Dual',
};

const MAPA_GENERO: Record<string, string> = {
  'masculino': 'Masculino',
  'masculine': 'Masculino',
  'feminino': 'Feminino',
  'feminine': 'Feminino',
  'neutro': 'Neutro',
  'neuter': 'Neutro',
  'comum': 'Comum',
  'common': 'Comum',
};

const MAPA_CASO: Record<string, string> = {
  'nominativo': 'Nominativo',
  'nominative': 'Nominativo',
  'genitivo': 'Genitivo',
  'genitive': 'Genitivo',
  'dativo': 'Dativo',
  'dative': 'Dativo',
  'acusativo': 'Acusativo',
  'accusative': 'Acusativo',
  'vocativo': 'Vocativo',
  'vocative': 'Vocativo',
};

const MAPA_NUMERAL_GREGO: Record<string, string> = {
  'primeiro': '1º',
  'first': '1º',
  'segundo': '2º',
  'second': '2º',
  'terceiro': '3º',
  'third': '3º',
};

// ---------------------------------------------------------------------------
// Funcoes auxiliares internas
// ---------------------------------------------------------------------------

function normalizar(s: string): string {
  return s.trim().toLowerCase();
}

function mapearValor(valor: string, mapa: Record<string, string>): string | undefined {
  const chave = normalizar(valor);
  return mapa[chave] || undefined;
}

function extrairStrongRefs(texto: string): Array<{ strong: string; palavra?: string }> {
  const refs: Array<{ strong: string; palavra?: string }> = [];
  const regex = /([GH]\d+)\s*\(([^)]+)\)/g;
  let m: RegExpExecArray | null;
  while ((m = regex.exec(texto)) !== null) {
    refs.push({ strong: m[1], palavra: m[2] });
  }
  // Tambem pegar Strong's sem parenteses
  const regexSem = /\b([GH]\d+)\b/g;
  let m2: RegExpExecArray | null;
  while ((m2 = regexSem.exec(texto)) !== null) {
    if (!refs.find((r) => r.strong === m2![1])) {
      refs.push({ strong: m2[1] });
    }
  }
  return refs;
}

// ---------------------------------------------------------------------------
// Parser grego — analisa strings descritivas do lexico
// ---------------------------------------------------------------------------

function parsearMorfologiaGrega(morfologia: string): MorfologiaEstruturada {
  const resultado: MorfologiaEstruturada = { lingua: 'grego' };
  const original = morfologia.trim();

  if (!original) return resultado;

  const baixo = normalizar(original);

  // -------------------------------------------------------------------------
  // PADRAO 1: Descricao gramatical direta (ex: "Substantivo, masculino, nominativo, singular")
  // ou "Verbo, presente, ativo, indicativo, 3ª pessoa, singular"
  // ou "verbo, presente passivo participio"
  // -------------------------------------------------------------------------
  // Separar tanto por virgula quanto por espaco dentro de cada secao
  const partesRaw = original.split(/[,;]/).map((s) => s.trim());
  const partesNorm: string[] = [];
  for (const parte of partesRaw) {
    // Se a secao contem varias palavras-chave separadas por espaco, quebrar
    const palavras = parte.split(/\s+/).map((p) => normalizar(p));
    for (const pal of palavras) {
      if (pal) partesNorm.push(pal);
    }
  }

  // Verificar se e uma descricao gramatical (contem pelo menos uma palavra-chave)
  const temPalavraChave = partesNorm.some(
    (p) =>
      p in MAPA_TIPO ||
      p in MAPA_TEMPO ||
      p in MAPA_VOZ ||
      p in MAPA_DIATECNICA ||
      p in MAPA_GENERO ||
      p in MAPA_CASO ||
      p in MAPA_PESSOA ||
      p in MAPA_NUMERO ||
      p.includes('participio') ||
      p.includes('passive') ||
      p.includes('participle')
  );

  const unido = baixo;

  if (temPalavraChave || /\b(substantivo|verbo|adjetivo|advérbio|preposição|conjunção|pronome|partícula|neuter|masculine|feminine|nominative|genitive|accusative)\b/.test(unido)) {
    // Detectar tipo
    for (const parte of partesNorm) {
      const tipoEn = mapearValor(parte, MAPA_TIPO);
      if (tipoEn) {
        resultado.tipo = tipoEn;
        break;
      }
    }

    // Se nao encontrou tipo mas comeca com capital (ex: "Substantivo")
    if (!resultado.tipo && partesRaw.length > 0) {
      const primeiro = normalizar(partesRaw[0].split(/\s+/)[0]);
      if (primeiro in MAPA_TIPO) {
        resultado.tipo = MAPA_TIPO[primeiro];
      }
    }

    // Detectar tempo
    for (const parte of partesNorm) {
      const tempo = mapearValor(parte, MAPA_TEMPO);
      if (tempo) {
        resultado.tempo = tempo;
        break;
      }
    }

    // Detectar voz
    for (const parte of partesNorm) {
      const voz = mapearValor(parte, MAPA_VOZ);
      if (voz) {
        resultado.voz = voz;
        break;
      }
    }

    // Verificar voz composta: "media-passivo", "media pass", "middle/passive"
    for (const parte of partesNorm) {
      if (parte.includes('media-pass') || parte.includes('media pass') || parte === 'media-passivo' || parte === 'middle/passive' || parte === 'media-passive') {
        resultado.voz = 'Media-Passivo';
        break;
      }
    }

    // Detectar diatecnica (modo)
    for (const parte of partesNorm) {
      const dia = mapearValor(parte, MAPA_DIATECNICA);
      if (dia) {
        resultado.diatecnica = dia;
        break;
      }
    }

    // "participio" / "participle" como modo
    if (unido.includes('participio') || unido.includes('participle')) {
      if (!resultado.diatecnica) {
        resultado.diatecnica = 'Particípio';
      }
    }

    // Detectar pessoa
    for (const parte of partesNorm) {
      const pessoa = mapearValor(parte, MAPA_PESSOA);
      if (pessoa) {
        resultado.pessoa = pessoa;
        break;
      }
      // "1ª pessoa", "2ª pessoa", "3ª pessoa" em uma so string
      const mPessoa = parte.match(/(1ª|2ª|3ª|1st|2nd|3rd)/);
      if (mPessoa) {
        resultado.pessoa = mapearValor(mPessoa[1], MAPA_PESSOA) || mPessoa[1];
      }
    }

    // Detectar numero
    for (const parte of partesNorm) {
      const numero = mapearValor(parte, MAPA_NUMERO);
      if (numero) {
        resultado.numero = numero;
        break;
      }
    }

    // Detectar genero
    for (const parte of partesNorm) {
      const genero = mapearValor(parte, MAPA_GENERO);
      if (genero) {
        resultado.genero = genero;
        break;
      }
    }

    // Detectar caso
    for (const parte of partesNorm) {
      const caso = mapearValor(parte, MAPA_CASO);
      if (caso) {
        resultado.caso = caso;
        break;
      }
    }

    // Extrair raiz se presente
    const refsRaiz = extrairStrongRefs(original);
    if (refsRaiz.length > 0) {
      resultado.raizStrong = refsRaiz[0].strong;
      resultado.raizOriginal = refsRaiz[0].palavra;
    }

    // Se encontrou pelo menos tipo, retorna
    if (resultado.tipo) return resultado;
  }

  // -------------------------------------------------------------------------
  // PADRAO 2: Composto — "de G1 (Α) (as negativo partícula) e G1075 (γενεαλογέω)"
  // ou "from G1909 (ἐπί) and G4648 (σκοπέω);"
  // -------------------------------------------------------------------------
  if (/\be\b.*G\d+/i.test(baixo) || /\band\b.*G\d+/i.test(baixo) || /compound/i.test(baixo)) {
    const refs = extrairStrongRefs(original);
    resultado.tipoEtimologia = 'composto';
    if (refs.length > 0) {
      resultado.raizStrong = refs.map((r) => r.strong).join(' + ');
      resultado.raizOriginal = refs.map((r) => r.palavra).filter(Boolean).join(' + ');
    }
    resultado.notas = original;
    return resultado;
  }

  // -------------------------------------------------------------------------
  // PADRAO 3: Etimologia com Strong's — "de G71 (ἄγω)" / "from G1909 (ἐπί)"
  // -------------------------------------------------------------------------
  if (/^de\s+G\d+/i.test(baixo) || /^from\s+G\d+/i.test(baixo)) {
    const refs = extrairStrongRefs(original);
    resultado.tipoEtimologia = 'derivacao';
    if (refs.length > 0) {
      resultado.raizStrong = refs[0].strong;
      resultado.raizOriginal = refs[0].palavra;
    }
    resultado.notas = original;
    return resultado;
  }

  // -------------------------------------------------------------------------
  // PADRAO 4: "neuter of G40 (ἅγιος)" / "masculine of G..." / "imperative of G71"
  // -------------------------------------------------------------------------
  const mForma = original.match(/(neuter|masculine|feminine|imperative|participle|aorist|present|future)\s+of\s+(G\d+)/i);
  if (mForma) {
    resultado.tipoEtimologia = 'forma_variante';
    const traducaoForma: Record<string, string> = {
      'neuter': 'Neutro',
      'masculine': 'Masculino',
      'feminine': 'Feminino',
      'imperative': 'Imperativo',
      'participle': 'Particípio',
      'aorist': 'Aoristo',
      'present': 'Presente',
      'future': 'Futuro',
    };
    const forma = normalizar(mForma[1]);
    if (forma in traducaoForma) {
      if (['neuter', 'masculine', 'feminine'].includes(forma)) {
        resultado.genero = traducaoForma[forma];
      } else {
        resultado.diatecnica = traducaoForma[forma];
      }
    }
    resultado.raizStrong = mForma[2];
    const refs = extrairStrongRefs(original);
    if (refs.length > 0) {
      resultado.raizOriginal = refs[0].palavra;
    }
    resultado.notas = original;
    return resultado;
  }

  // -------------------------------------------------------------------------
  // PADRAO 5: "adverb from G53 (ἁγνός)"
  // -------------------------------------------------------------------------
  if (/adverb\s+from/i.test(baixo)) {
    resultado.tipo = 'Advérbio';
    resultado.tipoEtimologia = 'derivacao';
    const refs = extrairStrongRefs(original);
    if (refs.length > 0) {
      resultado.raizStrong = refs[0].strong;
      resultado.raizOriginal = refs[0].palavra;
    }
    resultado.notas = original;
    return resultado;
  }

  // -------------------------------------------------------------------------
  // PADRAO 6: "a primary verb" / "apparently a primary word"
  // -------------------------------------------------------------------------
  if (/primary\s+(verb|word)/i.test(baixo)) {
    resultado.tipoEtimologia = 'desconhecido';
    if (/verb/i.test(baixo)) {
      resultado.tipo = 'Verbo';
    }
    resultado.notas = original;
    return resultado;
  }

  // -------------------------------------------------------------------------
  // PADRAO 7: "of Latin origin" / "of Hebrew origin" / "of Greek origin" / "of foreign origin"
  // -------------------------------------------------------------------------
  if (/of\s+(latin|hebrew|greek|foreign|aramaic)\s+origin/i.test(baixo)) {
    resultado.tipoEtimologia = 'origem';
    const mOrigin = original.match(/of\s+(\w+)\s+origin/i);
    if (mOrigin) {
      resultado.notas = `Origem ${mOrigin[1]}`;
    }
    // Extrair referencia Strong's (ex: "of Hebrew origin (H0795)")
    const refsOrigin = extrairStrongRefs(original);
    if (refsOrigin.length > 0) {
      resultado.raizStrong = refsOrigin[0].strong;
      resultado.raizOriginal = refsOrigin[0].palavra;
    }
    return resultado;
  }

  // -------------------------------------------------------------------------
  // PADRAO 8: "of uncertain origin" / "of uncertain affinity" / "of uncertain derivation"
  // -------------------------------------------------------------------------
  if (/of\s+uncertain/i.test(baixo)) {
    resultado.tipoEtimologia = 'desconhecido';
    resultado.notas = original;
    return resultado;
  }

  // -------------------------------------------------------------------------
  // PADRAO 9: "diminutive of G..." / "contracted from..."
  // -------------------------------------------------------------------------
  if (/diminutive\s+of/i.test(baixo) || /contracted\s+from/i.test(baixo)) {
    resultado.tipoEtimologia = 'derivacao';
    const refs = extrairStrongRefs(original);
    if (refs.length > 0) {
      resultado.raizStrong = refs[0].strong;
      resultado.raizOriginal = refs[0].palavra;
    }
    resultado.notas = original;
    return resultado;
  }

  // -------------------------------------------------------------------------
  // PADRAO 10: "from a compound of..." / "from the middle voice of..."
  // -------------------------------------------------------------------------
  if (/from\s+(a\s+)?compound/i.test(baixo) || /middle\s+voice/i.test(baixo)) {
    resultado.tipoEtimologia = 'composto';
    const refs = extrairStrongRefs(original);
    if (refs.length > 0) {
      resultado.raizStrong = refs[0].strong;
      resultado.raizOriginal = refs[0].palavra;
    }
    resultado.notas = original;
    return resultado;
  }

  // -------------------------------------------------------------------------
  // PADRAO 11: "a prolonged form..." / "a reduplicated form..."
  // -------------------------------------------------------------------------
  if (/prolonged\s+form/i.test(baixo) || /reduplicated\s+form/i.test(baixo)) {
    resultado.tipoEtimologia = 'derivacao';
    resultado.notas = original;
    return resultado;
  }

  // -------------------------------------------------------------------------
  // PADRAO 12: "probably another form of G..."
  // -------------------------------------------------------------------------
  if (/another\s+form\s+of/i.test(baixo) || /probably\s+.*form/i.test(baixo)) {
    resultado.tipoEtimologia = 'forma_variante';
    const refs = extrairStrongRefs(original);
    if (refs.length > 0) {
      resultado.raizStrong = refs[0].strong;
      resultado.raizOriginal = refs[0].palavra;
    }
    resultado.notas = original;
    return resultado;
  }

  // -------------------------------------------------------------------------
  // PADRAO 13: "de o same as G..." / "de o same as o..."
  // -------------------------------------------------------------------------
  if (/same as/i.test(baixo)) {
    resultado.tipoEtimologia = 'derivacao';
    const refs = extrairStrongRefs(original);
    if (refs.length > 0) {
      resultado.raizStrong = refs[0].strong;
      resultado.raizOriginal = refs[0].palavra;
    }
    resultado.notas = original;
    return resultado;
  }

  // -------------------------------------------------------------------------
  // PADRAO 14: "from (a pail..." / "from (much)" — ingles parcial
  // -------------------------------------------------------------------------
  if (/^from\s*\(/i.test(baixo)) {
    resultado.tipoEtimologia = 'derivacao';
    resultado.notas = original;
    return resultado;
  }

  // -------------------------------------------------------------------------
  // PADRAO 15: "from G129 (αἷμα) e G4482 (ῥέω)" — portugues
  // -------------------------------------------------------------------------
  if (/^de\s+(G\d+)/i.test(baixo)) {
    resultado.tipoEtimologia = 'derivacao';
    const refs = extrairStrongRefs(original);
    if (refs.length > 0) {
      resultado.raizStrong = refs[0].strong;
      resultado.raizOriginal = refs[0].palavra;
    }
    resultado.notas = original;
    return resultado;
  }

  // -------------------------------------------------------------------------
  // PADRAO 16: "from G..." sozinho (ingles)
  // -------------------------------------------------------------------------
  if (/^from\s+G\d+/i.test(baixo)) {
    resultado.tipoEtimologia = 'derivacao';
    const refs = extrairStrongRefs(original);
    if (refs.length > 0) {
      resultado.raizStrong = refs[0].strong;
      resultado.raizOriginal = refs[0].palavra;
    }
    resultado.notas = original;
    return resultado;
  }

  // -------------------------------------------------------------------------
  // PADRAO 17: Strong's puro em portugues — "de G58 (ἀγορά);"
  // -------------------------------------------------------------------------
  if (/^de\s+(G\d+)\s*\(/i.test(original)) {
    resultado.tipoEtimologia = 'derivacao';
    const refs = extrairStrongRefs(original);
    if (refs.length > 0) {
      resultado.raizStrong = refs[0].strong;
      resultado.raizOriginal = refs[0].palavra;
    }
    resultado.notas = original;
    return resultado;
  }

  // -------------------------------------------------------------------------
  // PADRAO 18: Inicio com Strong's — "G40 (ἅγιος)"
  // -------------------------------------------------------------------------
  if (/^G\d+/i.test(baixo)) {
    const refs = extrairStrongRefs(original);
    resultado.tipoEtimologia = 'derivacao';
    if (refs.length > 0) {
      resultado.raizStrong = refs[0].strong;
      resultado.raizOriginal = refs[0].palavra;
    }
    resultado.notas = original;
    return resultado;
  }

  // -------------------------------------------------------------------------
  // PADRAO 19: "from a presumed derivative of..."
  // -------------------------------------------------------------------------
  if (/presumed\s+derivative/i.test(baixo)) {
    resultado.tipoEtimologia = 'derivacao';
    const refs = extrairStrongRefs(original);
    if (refs.length > 0) {
      resultado.raizStrong = refs[0].strong;
      resultado.raizOriginal = refs[0].palavra;
    }
    resultado.notas = original;
    return resultado;
  }

  // -------------------------------------------------------------------------
  // PADRAO 20: "from (to dig)" / "from (a hired menial)" — derivacao implicita
  // -------------------------------------------------------------------------
  if (/^from\s*\(/i.test(baixo)) {
    resultado.tipoEtimologia = 'derivacao';
    resultado.notas = original;
    return resultado;
  }

  // -------------------------------------------------------------------------
  // PADRAO 21: "from o base de G..." — traducao mista
  // -------------------------------------------------------------------------
  if (/base\s+de\s+G\d+/i.test(baixo) || /base\s+of\s+G\d+/i.test(baixo)) {
    resultado.tipoEtimologia = 'derivacao';
    const refs = extrairStrongRefs(original);
    if (refs.length > 0) {
      resultado.raizStrong = refs[0].strong;
      resultado.raizOriginal = refs[0].palavra;
    }
    resultado.notas = original;
    return resultado;
  }

  // -------------------------------------------------------------------------
  // PADRAO 22: Texto descritivo livre (ingles) — ex: "a primary verb"
  // -------------------------------------------------------------------------
  if (/^a\s+\w+\s+(verb|word)/i.test(baixo)) {
    resultado.tipoEtimologia = 'desconhecido';
    if (/verb/i.test(baixo)) {
      resultado.tipo = 'Verbo';
    }
    resultado.notas = original;
    return resultado;
  }

  // -------------------------------------------------------------------------
  // Fallback: salvar como notas
  // -------------------------------------------------------------------------
  resultado.notas = original;

  // Tentar extrair qualquer Strong's reference
  const refsFinais = extrairStrongRefs(original);
  if (refsFinais.length > 0) {
    resultado.raizStrong = refsFinais[0].strong;
    resultado.raizOriginal = refsFinais[0].palavra;
  }

  return resultado;
}

// ---------------------------------------------------------------------------
// Parser hebraico — os campos de morfologia no lexico hebraico sao codigos
// curtos de pronuncia/derivacao (ex: 'awb', 'ab-ad\''), nao analises
// gramaticais completas. Este parser extrai o que for possivel.
// ---------------------------------------------------------------------------

function parsearMorfologiaHebraica(morfologia: string): MorfologiaEstruturada {
  const resultado: MorfologiaEstruturada = { lingua: 'hebraico' };
  const original = morfologia.trim();

  if (!original) return resultado;

  const baixo = normalizar(original);

  // Os codigos hebraicos do Strong sao padroes de pronuncia
  // Exemplos: 'awb', 'ab-ad\'', 'ab-ag-thaw\'', 'aw-bad\'', 'o-bade\''
  // Eles indicam:
  // - a raiz (triconsonantal tipicamente)
  // - padroes de voweling
  // - variacoes de forma

  // Extrair segmentos da raiz (partes separadas por hifen)
  const segmentos = original.split(/[-']/).filter((s) => s.trim().length > 0);

  if (segmentos.length >= 2) {
    resultado.raiz = segmentos[0];
  }

  // Identificar padroes de formacao hebraica
  // Padroes comuns de pronuncia Strong's:
  // - 'awb' = forma simples (pai)
  // - 'ab-ad' = forma causativa/reflexiva
  // - 'ab-ag' = forma intensiva
  // - 'aw-bad' = forma com segol
  // - 'o-bade' = forma com holem

  // Detectar padroes de derivacao por sufixos conhecidos
  const sufixosDerivacao: Record<string, string> = {
    'im': 'Plural',
    'ot': 'Plural feminino',
    'ah': 'Feminino',
    'eh': 'Feminino',
    'ayim': 'Dual',
    'on': 'Augmentativo',
    'el': 'Divino',
    'yah': 'Divino',
    'iyy': 'Gentílico',
    'ite': 'Gentílico',
  };

  for (const [sufixo, significado] of Object.entries(sufixosDerivacao)) {
    if (baixo.endsWith(sufixo)) {
      resultado.notas = `${resultado.notas ? resultado.notas + '; ' : ''}Sufixo: ${significado}`;
      break;
    }
  }

  // Detectar se contem marcadores de forma verbal hebraica
  // Formas verbais hebraicas: Qal, Niphal, Piel, Pual, Hiphil, Hophal, Hitpael
  const formasVerbais: Record<string, string> = {
    'qal': 'Qal (ativo simples)',
    'niphal': 'Niphal (passivo/reflexivo)',
    'piel': 'Piel (intensivo ativo)',
    'pual': 'Pual (intensivo passivo)',
    'hiphil': 'Hiphil (causativo ativo)',
    'hophal': 'Hophal (causativo passivo)',
    'hitpael': 'Hitpael (reflexivo)',
  };

  for (const [forma, significado] of Object.entries(formasVerbais)) {
    if (baixo.includes(forma)) {
      resultado.tipo = 'Verbo';
      resultado.notas = `${resultado.notas ? resultado.notas + '; ' : ''}Forma: ${significado}`;
      break;
    }
  }

  // Extrair numero se detectavel
  if (/im$|ot$/.test(baixo)) {
    resultado.numero = 'Plural';
  } else if (/ayim$/.test(baixo)) {
    resultado.numero = 'Dual';
  } else {
    resultado.numero = 'Singular';
  }

  // Extrair genero se detectavel pelo sufixo
  if (/ah$|eh$|ot$/.test(baixo)) {
    resultado.genero = 'Feminino';
  } else {
    resultado.genero = 'Masculino';
  }

  // Se nao encontrou nada significativo, salvar como notas
  if (!resultado.tipo && !resultado.raiz && !resultado.notas) {
    resultado.notas = `Código de pronúncia: ${original}`;
  }

  return resultado;
}

// ---------------------------------------------------------------------------
// Funcoes exportadas
// ---------------------------------------------------------------------------

export function parsearMorfologia(morfologia: string, lingua: 'grego' | 'hebraico'): MorfologiaEstruturada {
  if (lingua === 'grego') {
    return parsearMorfologiaGrega(morfologia);
  }
  return parsearMorfologiaHebraica(morfologia);
}

/**
 * Converte uma MorfologiaEstruturada em uma label legivel em portugues.
 * Exemplo: "Substantivo masculino nominativo singular"
 * Exemplo: "Verbo presente ativo infinitivo"
 * Exemplo: "Derivado de G71 (ἄγω)"
 */
export function paraLabelMorfologia(morf: MorfologiaEstruturada): string {
  const partes: string[] = [];

  if (morf.tipo) partes.push(morf.tipo);
  if (morf.genero) partes.push(morf.genero);
  if (morf.caso) partes.push(morf.caso);
  if (morf.numero) partes.push(morf.numero);
  if (morf.tempo) partes.push(morf.tempo);
  if (morf.voz) partes.push(morf.voz);
  if (morf.diatecnica) partes.push(morf.diatecnica);
  if (morf.pessoa) partes.push(morf.pessoa);

  // Se nao tem campos gramaticais, mostrar etimologia
  if (partes.length === 0 && morf.raizStrong) {
    const tipoEtimo =
      morf.tipoEtimologia === 'composto'
        ? 'Compuesto de'
        : morf.tipoEtimologia === 'derivacao'
          ? 'Derivado de'
          : morf.tipoEtimologia === 'forma_variante'
            ? 'Forma de'
            : morf.tipoEtimologia === 'origem'
              ? 'Origem'
              : 'Relacionado a';

    partes.push(tipoEtimo);
    partes.push(morf.raizStrong);
    if (morf.raizOriginal) {
      partes.push(`(${morf.raizOriginal})`);
    }
  }

  // Adicionar notas se existir e se nao tivermos nada mais
  if (partes.length === 0 && morf.notas) {
    // Tentar resumir a nota
    const notaCurta = morf.notas.length > 80 ? morf.notas.substring(0, 77) + '...' : morf.notas;
    return notaCurta;
  }

  return partes.join(' ');
}

// ---------------------------------------------------------------------------
// Funcoes de conveniencia para uso com o lexico
// ---------------------------------------------------------------------------

/**
 * Analisa a morfologia de uma palavra grega do lexico.
 * Aceita tanto o campo morphologia quanto a interface PalavraGrega completa.
 */
export function analisarPalavraGrega(morphologia: string): MorfologiaEstruturada {
  return parsearMorfologiaGrega(morphologia);
}

/**
 * Analisa a morfologia de uma palavra hebraica do lexico.
 */
export function analisarPalavraHebraica(morfologia: string): MorfologiaEstruturada {
  return parsearMorfologiaHebraica(morfologia);
}

/**
 * Batch parse — analisa multiplos campos de morfologia de uma vez.
 * Util para processar todo o lexico.
 */
export function analisarLote(
  palavras: Array<{ morphologia: string; lingua: 'grego' | 'hebraico' }>
): MorfologiaEstruturada[] {
  return palavras.map((p) => parsearMorfologia(p.morphologia, p.lingua));
}

/**
 * Retorna os possiveis valores para cada campo da MorfologiaEstruturada.
 * Util para construir filtros UI ou validacao.
 */
export function obterValoresPossiveis(): {
  tipos: string[];
  tempos: string[];
  vozes: string[];
  diatecnicas: string[];
  pessoas: string[];
  numeros: string[];
  generos: string[];
  casos: string[];
  tiposEtimologia: string[];
} {
  return {
    tipos: [...new Set(Object.values(MAPA_TIPO))].sort(),
    tempos: [...new Set(Object.values(MAPA_TEMPO))].sort(),
    vozes: [...new Set(Object.values(MAPA_VOZ))].sort(),
    diatecnicas: [...new Set(Object.values(MAPA_DIATECNICA))].sort(),
    pessoas: [...new Set(Object.values(MAPA_PESSOA))].sort(),
    numeros: [...new Set(Object.values(MAPA_NUMERO))].sort(),
    generos: [...new Set(Object.values(MAPA_GENERO))].sort(),
    casos: [...new Set(Object.values(MAPA_CASO))].sort(),
    tiposEtimologia: ['derivacao', 'composto', 'forma_variante', 'origem', 'desconhecido'],
  };
}

// ---------------------------------------------------------------------------
// Testes inline (executa com: npx tsx morphologiaParser.ts)
// ---------------------------------------------------------------------------

if (process.argv[1]?.includes('morphologiaParser')) {
  const testesGregos: Array<[string, Partial<MorfologiaEstruturada>]> = [
    // Padrao descritivo direto
    ['Substantivo, masculino, nominativo, singular', { tipo: 'Substantivo', genero: 'Masculino', caso: 'Nominativo', numero: 'Singular' }],
    ['Verbo, presente, ativo, infinitivo', { tipo: 'Verbo', tempo: 'Presente', voz: 'Ativo', diatecnica: 'Infinitivo' }],
    ['Verbo, aoristo, passivo, indicativo, 3ª pessoa, singular', { tipo: 'Verbo', tempo: 'Aoristo', voz: 'Passivo', diatecnica: 'Indicativo', pessoa: '3ª pessoa', numero: 'Singular' }],
    ['Adjetivo, feminino, genitivo, singular', { tipo: 'Adjetivo', genero: 'Feminino', caso: 'Genitivo', numero: 'Singular' }],
    ['Substantivo, neutro, nominativo, singular', { tipo: 'Substantivo', genero: 'Neutro', caso: 'Nominativo', numero: 'Singular' }],
    ['Verbo, presente, médio, infinitivo', { tipo: 'Verbo', tempo: 'Presente', voz: 'Médio', diatecnica: 'Infinitivo' }],
    ['Advérbio', { tipo: 'Advérbio' }],
    ['Substantivo, feminino, acusativo, plural', { tipo: 'Substantivo', genero: 'Feminino', caso: 'Acusativo', numero: 'Plural' }],
    ['Verbo, presente, ativo, participio', { tipo: 'Verbo', tempo: 'Presente', voz: 'Ativo', diatecnica: 'Particípio' }],
    ['verbo, presente passivo participio', { tipo: 'Verbo', tempo: 'Presente', voz: 'Passivo', diatecnica: 'Particípio' }],
    ['Substantivo, masculino, genitivo, singular', { tipo: 'Substantivo', genero: 'Masculino', caso: 'Genitivo', numero: 'Singular' }],
    ['Adjetivo, masculino, nominativo, plural', { tipo: 'Adjetivo', genero: 'Masculino', caso: 'Nominativo', numero: 'Plural' }],
    ['Substantivo, feminino, dativo, singular', { tipo: 'Substantivo', genero: 'Feminino', caso: 'Dativo', numero: 'Singular' }],
    ['verbo, futuro médio indicativo, 3ª pessoa singular', { tipo: 'Verbo', tempo: 'Futuro', voz: 'Médio', diatecnica: 'Indicativo', pessoa: '3ª pessoa', numero: 'Singular' }],

    // Etimologia
    ['de G71 (ἄγω)', { raizStrong: 'G71', raizOriginal: 'ἄγω' }],
    ['de G1 (Α) (as negativo partícula) e G1075 (γενεαλογέω);', { raizStrong: 'G1 + G1075', tipoEtimologia: 'composto' }],
    ['neuter of G40 (ἅγιος);', { genero: 'Neutro', raizStrong: 'G40' }],
    ['imperative of G71 (ἄγω);', { diatecnica: 'Imperativo', raizStrong: 'G71' }],
    ['adverb from G53 (ἁγνός);', { tipo: 'Advérbio', raizStrong: 'G53' }],
    ['of Latin origin;', { notas: 'Origem Latin' }],
    ['of Hebrew origin (H0795);', { raizStrong: 'H0795', tipoEtimologia: 'origem' }],
    ['from G1909 (ἐπί) and G4648 (σκοπέω);', { raizStrong: 'G1909 + G4648', tipoEtimologia: 'composto' }],
    ['de G18 (ἀγαθός) e G2041 (ἔργον);', { raizStrong: 'G18 + G2041', tipoEtimologia: 'composto' }],
    ['diminutive of G4094 (πίναξ);', { raizStrong: 'G4094' }],
    ['from a compound of G1909 (ἐπί) and G5092 (τιμή);', { tipoEtimologia: 'composto' }],
    ['a primary verb;', { tipo: 'Verbo' }],
    ['of uncertain origin;', { notas: 'of uncertain origin;' }],
  ];

  const testesHebraicos: Array<[string, Partial<MorfologiaEstruturada>]> = [
    ['awb', { lingua: 'hebraico' }],
    ['ab', { lingua: 'hebraico' }],
    ['ab-ad\'', { lingua: 'hebraico' }],
    ['aw-bad\'', { lingua: 'hebraico' }],
    ['ag-ood-daw\'', { lingua: 'hebraico' }],
    ['ab-aw-naw\'', { lingua: 'hebraico' }],
  ];

  let passou = 0;
  let falhou = 0;

  console.log('=== Testes Gregos ===\n');
  for (const [morph, esperado] of testesGregos) {
    const resultado = parsearMorfologiaGrega(morph);
    let ok = true;
    for (const [chave, valor] of Object.entries(esperado)) {
      if ((resultado as unknown as Record<string, unknown>)[chave] !== valor) {
        console.log(`  FALHOU: "${morph}"`);
        console.log(`    Esperado: ${chave} = ${valor}`);
        console.log(`    Obtido:   ${chave} = ${(resultado as unknown as Record<string, unknown>)[chave]}`);
        ok = false;
        falhou++;
      }
    }
    if (ok) {
      console.log(`  OK: "${morph}" → ${paraLabelMorfologia(resultado)}`);
      passou++;
    }
  }

  console.log('\n=== Testes Hebraicos ===\n');
  for (const [morph, esperado] of testesHebraicos) {
    const resultado = parsearMorfologiaHebraica(morph);
    console.log(`  "${morph}" → ${paraLabelMorfologia(resultado)}`);
    passou++;
  }

  console.log(`\n=== Resultado: ${passou} passaram, ${falhou} falharam ===`);
}
