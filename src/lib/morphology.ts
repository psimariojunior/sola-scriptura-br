// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═
// MORPHOLOGICAL PARSER — Comprehensive parser for Biblical Greek & Hebrew
// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═

export interface MorfologiaEstruturada {
  tipo: string;
  idioma?: "grego" | "hebraico";
  tempo?: string;
  voz?: string;
  modo?: string;
  pessoa?: string;
  numero?: string;
  genero?: string;
  caso?: string;
  stem?: string;
  estado?: string;
  artigo?: boolean;
  raiz?: string;
  codigo?: string;
  classe?: string;
  conjugacao?: string;
  rotulo?: string;
  label: string;
  paradigmKey?: string;
}

// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═
// GREEK — Constants & Codes
// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═

export const GREEK_TENSES: Record<string, string> = {
  P: "Present",
  I: "Imperfect",
  F: "Future",
  A: "Aorist",
  R: "Perfect",
  L: "Pluperfect",
  "2A": "Second Aorist",
  "2F": "Second Future",
  "2R": "Second Perfect",
  "2P": "Second Pluperfect",
};

export const GREEK_VOICES: Record<string, string> = {
  A: "Active",
  M: "Middle",
  P: "Passive",
  MP: "Middle/Passive",
};

export const GREEK_MOODS: Record<string, string> = {
  I: "Indicative",
  S: "Subjunctive",
  M: "Imperative",
  O: "Optative",
  N: "Infinitive",
  P: "Participle",
};

export const GREEK_PERSONS: Record<string, string> = {
  "1": "1st",
  "2": "2nd",
  "3": "3rd",
};

export const GREEK_NUMBERS: Record<string, string> = {
  S: "Singular",
  P: "Plural",
};

export const GREEK_GENDERS: Record<string, string> = {
  M: "Masculine",
  F: "Feminine",
  N: "Neuter",
  C: "Common",
};

export const GREEK_CASES: Record<string, string> = {
  N: "Nominative",
  G: "Genitive",
  D: "Dative",
  A: "Accusative",
  V: "Vocative",
};

export const GREEK_PARTS_OF_SPEECH: Record<string, string> = {
  V: "Verb",
  N: "Noun",
  A: "Adjective",
  T: "Article",
  R: "Pronoun",
  C: "Conjunction",
  P: "Preposition",
  D: "Adverb",
  I: "Interjection",
  F: "Particle",
  NUM: "Numeral",
};

export const GREEK_DECLENSIONS: Record<string, string> = {
  "1": "1st (fem. -η/-α)",
  "2": "2nd (masc./neut. -ος/-ον)",
  "3": "3rd (mixed)",
};

// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═
// HEBREW — Constants & Codes
// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═

export const HEBREW_STEMS: Record<string, string> = {
  Q: "Qal (simple active)",
  N: "Niphal (passive/reflexive)",
  P: "Piel (intensive active)",
  O: "Pual (intensive passive)",
  H: "Hiphil (causative active)",
  M: "Hophal (causative passive)",
  T: "Hithpael (reflexive)",
  Po: "Poel (rare active)",
  D: "Poal (rare passive)",
  Dt: "Hithpoel (rare reflexive)",
};

export const HEBREW_TENSES: Record<string, string> = {
  A: "Perfect (suffix conjugation)",
  I: "Imperfect (prefix conjugation)",
  W: "Waw-consecutive",
  J: "Jussive",
  C: "Cohortative",
  O: "Imperative",
  N: "Infinitive Construct",
  AB: "Infinitive Absolute",
  PTC: "Participle",
};

export const HEBREW_PERSONS: Record<string, string> = {
  "1": "1st",
  "2": "2nd",
  "3": "3rd",
};

export const HEBREW_NUMBERS: Record<string, string> = {
  S: "Singular",
  P: "Plural",
  D: "Dual",
};

export const HEBREW_GENDERS: Record<string, string> = {
  M: "Masculine",
  F: "Feminine",
  C: "Common",
};

export const HEBREW_STATES: Record<string, string> = {
  A: "Absolute",
  C: "Construct",
  D: "Determined (with article)",
};

export const HEBREW_PARTS_OF_SPEECH: Record<string, string> = {
  V: "Verb",
  N: "Noun",
  A: "Adjective",
  R: "Pronoun",
  P: "Preposition",
  C: "Conjunction",
  D: "Adverb",
  T: "Article",
  I: "Interjection",
  F: "Particle",
  NUM: "Numeral",
};

// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═
// MORPHOLOGY CODE PARSER
// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═

function parseGreekMorphCode(code: string) {
  const upper = code.toUpperCase().replace(/\s+/g, "");
  const result: MorfologiaEstruturada = { tipo: "", label: "" };
  result.codigo = code;
  result.idioma = "grego";

  const dashIdx = upper.indexOf("-");
  let posCode = "";
  let rest = upper;
  if (dashIdx === -1) {
    if (/^[VIPACDRTF]$/.test(upper[0])) {
      posCode = upper[0];
      rest = upper.slice(1);
    }
  } else {
    posCode = upper.slice(0, dashIdx);
    rest = upper.slice(dashIdx + 1);
  }

  result.tipo = GREEK_PARTS_OF_SPEECH[posCode] || posCode;

  if (posCode === "V" || posCode.startsWith("V")) {
    return parseGreekVerbCode(rest, result);
  }
  if (posCode === "N" || posCode.startsWith("N")) {
    return parseGreekNounCode(rest, result);
  }
  if (posCode === "A") {
    return parseGreekAdjCode(rest, result);
  }
  if (posCode === "T") {
    result.tipo = "Article";
    return parseGreekNounCode(rest, result);
  }

  result.label = code;
  return result;
}

function parseGreekVerbCode(code: string, result: MorfologiaEstruturada) {
  result.tipo = "Verb";

  let tenseCode = "";
  let voiceMood = code;

  if (code.startsWith("2A")) {
    tenseCode = "2A";
    voiceMood = code.slice(2);
  } else if (code.startsWith("2")) {
    const second = code[1];
    if ("AFRP".includes(second)) {
      tenseCode = "2" + second;
      voiceMood = code.slice(2);
    } else {
      tenseCode = code[0];
      voiceMood = code.slice(1);
    }
  } else if (code.length >= 1) {
    tenseCode = code[0];
    voiceMood = code.slice(1);
  }

  result.tempo = GREEK_TENSES[tenseCode] || tenseCode;

  if (voiceMood.length >= 1) {
    const voiceCode = voiceMood[0];
    result.voz = GREEK_VOICES[voiceCode] || voiceCode;
    voiceMood = voiceMood.slice(1);
  }

  if (voiceMood.length >= 1) {
    const moodCode = voiceMood[0];
    result.modo = GREEK_MOODS[moodCode] || moodCode;
    voiceMood = voiceMood.slice(1);
  }

  if (voiceMood.length > 0) {
    if (result.modo === "Participle") {
      const genderCase = voiceMood;
      if (genderCase.length >= 1) result.genero = GREEK_GENDERS[genderCase[0]] || genderCase[0];
      if (genderCase.length >= 2) result.caso = GREEK_CASES[genderCase[1]] || genderCase[1];
    } else if (result.modo !== "Infinitive") {
      const personNumber = voiceMood;
      if (personNumber.length >= 1) result.pessoa = GREEK_PERSONS[personNumber[0]] || personNumber[0];
      if (personNumber.length >= 2) result.numero = GREEK_NUMBERS[personNumber[1]] || personNumber[1];
    }
  }

  result.label = formatGreekVerbLabel(result);
  return result;
}

function parseGreekNounCode(code: string, result: MorfologiaEstruturada) {
  if (!result.tipo || result.tipo === "") result.tipo = "Noun";

  if (code.length >= 1) result.caso = GREEK_CASES[code[0]] || code[0];
  if (code.length >= 2) result.numero = GREEK_NUMBERS[code[1]] || code[1];
  if (code.length >= 3) result.genero = GREEK_GENDERS[code[2]] || code[2];
  if (code.length >= 4) {
    const decl = code.slice(3);
    result.conjugacao = GREEK_DECLENSIONS[decl] || `Declension ${decl}`;
  }

  result.label = formatGreekNounLabel(result);
  return result;
}

function parseGreekAdjCode(code: string, result: MorfologiaEstruturada) {
  result.tipo = "Adjective";

  if (code.length >= 1 && GREEK_CASES[code[0]]) {
    if (code.length >= 1) result.caso = GREEK_CASES[code[0]];
    if (code.length >= 2) result.numero = GREEK_NUMBERS[code[1]] || code[1];
    if (code.length >= 3) result.genero = GREEK_GENDERS[code[2]] || code[2];
  } else {
    result.classe = code;
  }

  result.label = formatGreekNounLabel(result);
  return result;
}

function formatGreekVerbLabel(r: MorfologiaEstruturada) {
  const parts = [];
  if (r.tempo) parts.push(r.tempo);
  if (r.voz) parts.push(`${r.voz} Voice`);
  if (r.modo) parts.push(r.modo);
  if (r.modo === "Participle") {
    if (r.genero) parts.push(r.genero);
    if (r.caso) parts.push(r.caso);
    if (r.numero) parts.push(r.numero);
  } else if (r.modo !== "Infinitive") {
    if (r.pessoa && r.numero) parts.push(`${r.pessoa} ${r.numero}`);
  }
  return parts.join(", ") || r.codigo || "Verb";
}

function formatGreekNounLabel(r: MorfologiaEstruturada) {
  const parts = [];
  parts.push(r.tipo || "Noun");
  if (r.caso) parts.push(r.caso);
  if (r.numero) parts.push(r.numero);
  if (r.genero) parts.push(r.genero);
  if (r.conjugacao) parts.push(r.conjugacao);
  return parts.join(", ") || r.codigo || "Noun";
}

// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═
// HEBREW MORPHOLOGY CODE PARSER
// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═

function parseHebrewMorphCode(code: string) {
  const upper = code.toUpperCase().replace(/\s+/g, "");
  const result: MorfologiaEstruturada = { tipo: "", label: "" };
  result.codigo = code;
  result.idioma = "hebraico";

  const parts = code.split("-");
  if (parts.length === 0) return result;

  const posCode = parts[0].toUpperCase();
  result.tipo = HEBREW_PARTS_OF_SPEECH[posCode] || posCode;

  if (posCode === "V") return parseHebrewVerbCode(parts.slice(1), result);
  if (posCode === "N") return parseHebrewNounCode(parts.slice(1), result);
  if (posCode === "A") { result.tipo = "Adjective"; return parseHebrewNounCode(parts.slice(1), result); }

  result.label = code;
  return result;
}

function parseHebrewVerbCode(parts: string[], result: MorfologiaEstruturada) {
  result.tipo = "Verb";
  if (parts.length >= 1) { const s = parts[0].toUpperCase(); result.stem = HEBREW_STEMS[s] || parts[0]; }
  if (parts.length >= 2) { const t = parts[1].toUpperCase(); result.tempo = HEBREW_TENSES[t] || parts[1]; }
  if (parts.length >= 3) { const p = parts[2][0]?.toUpperCase(); if (p && HEBREW_PERSONS[p]) result.pessoa = HEBREW_PERSONS[p]; }
  if (parts.length >= 3 && parts[2].length >= 2) { const n = parts[2][1]?.toUpperCase(); if (n && HEBREW_NUMBERS[n]) result.numero = HEBREW_NUMBERS[n]; }
  if (parts.length >= 4) { const g = parts[3][0]?.toUpperCase(); if (g && HEBREW_GENDERS[g]) result.genero = HEBREW_GENDERS[g]; }
  if (parts.length >= 5) { const st = parts[4][0]?.toUpperCase(); if (st && HEBREW_STATES[st]) result.estado = HEBREW_STATES[st]; }
  result.label = formatHebrewVerbLabel(result);
  return result;
}

function parseHebrewNounCode(parts: string[], result: MorfologiaEstruturada) {
  if (!result.tipo || result.tipo === "") result.tipo = "Noun";
  if (parts.length >= 1) { const s = parts[0][0]?.toUpperCase(); if (s && HEBREW_STATES[s]) result.estado = HEBREW_STATES[s]; }
  if (parts.length >= 2) { const g = parts[1][0]?.toUpperCase(); if (g && HEBREW_GENDERS[g]) result.genero = HEBREW_GENDERS[g]; }
  if (parts.length >= 3) { const n = parts[2][0]?.toUpperCase(); if (n && HEBREW_NUMBERS[n]) result.numero = HEBREW_NUMBERS[n]; }
  result.label = formatHebrewNounLabel(result);
  return result;
}

function formatHebrewVerbLabel(r: MorfologiaEstruturada) {
  const parts = [];
  if (r.stem) parts.push(r.stem);
  if (r.tempo) parts.push(r.tempo);
  if (r.pessoa && r.numero) parts.push(`${r.pessoa} ${r.numero}`);
  if (r.genero) parts.push(r.genero);
  if (r.estado) parts.push(`State: ${r.estado}`);
  return parts.join(", ") || r.codigo || "Verb";
}

function formatHebrewNounLabel(r: MorfologiaEstruturada) {
  const parts = [];
  parts.push(r.tipo || "Noun");
  if (r.estado) parts.push(r.estado);
  if (r.genero) parts.push(r.genero);
  if (r.numero) parts.push(r.numero);
  return parts.join(", ") || r.codigo || "Noun";
}

// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═
// GREEK VERB FORM PARSER (from actual Greek text)
// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═

type EndingEntry = Record<string, MorfologiaEstruturada>;

function stripDiacritics(s: string): string {
  return s.toLowerCase()
    .replace(/[̀-ͯ]/g, "")
    .replace(/[αἀ-Ἇ]/g, "α")
    .replace(/[εἐ-἗]/g, "ε")
    .replace(/[ηἠ-ἧ]/g, "η")
    .replace(/[ιἰ-ἷ]/g, "ι")
    .replace(/[οὀ-὇]/g, "ο")
    .replace(/[υὐ-ὗ]/g, "υ")
    .replace(/[ωὠ-ὧ]/g, "ω")
    .replace(/[ᾰ-ᾴ]/g, "α")
    .replace(/[ᾶ-ᾷ]/g, "α")
    .replace(/[῀-ῄ]/g, "η")
    .replace(/[ῆ-ῇ]/g, "η")
    .replace(/[ῐ-῔]/g, "ι")
    .replace(/[ῖ-ῗ]/g, "ι")
    .replace(/[ῠ-ῤ]/g, "υ")
    .replace(/[ῦ-ῧ]/g, "υ")
    .replace(/[῰-ῴ]/g, "ω")
    .replace(/[ῶ-ῷ]/g, "ω")
    .replace(/ς/g, "σ");
}

const GREEK_ENDINGS: Record<string, EndingEntry> = {
  "present_active_indicative": {
    "ω": { tipo: "Verb", tempo: "Present", voz: "Active", modo: "Indicative", pessoa: "1st", numero: "Singular", label: "Present Active Indicative 1st Singular" },
    "εις": { tipo: "Verb", tempo: "Present", voz: "Active", modo: "Indicative", pessoa: "2nd", numero: "Singular", label: "Present Active Indicative 2nd Singular" },
    "ει": { tipo: "Verb", tempo: "Present", voz: "Active", modo: "Indicative", pessoa: "3rd", numero: "Singular", label: "Present Active Indicative 3rd Singular" },
    "ομεν": { tipo: "Verb", tempo: "Present", voz: "Active", modo: "Indicative", pessoa: "1st", numero: "Plural", label: "Present Active Indicative 1st Plural" },
    "ετε": { tipo: "Verb", tempo: "Present", voz: "Active", modo: "Indicative", pessoa: "2nd", numero: "Plural", label: "Present Active Indicative 2nd Plural" },
    "ουσιν": { tipo: "Verb", tempo: "Present", voz: "Active", modo: "Indicative", pessoa: "3rd", numero: "Plural", label: "Present Active Indicative 3rd Plural" },
  },
  "imperfect_active_indicative": {
    "ον": { tipo: "Verb", tempo: "Imperfect", voz: "Active", modo: "Indicative", pessoa: "1st", numero: "Singular", label: "Imperfect Active Indicative 1st Singular" },
    "ες": { tipo: "Verb", tempo: "Imperfect", voz: "Active", modo: "Indicative", pessoa: "2nd", numero: "Singular", label: "Imperfect Active Indicative 2nd Singular" },
    "εν": { tipo: "Verb", tempo: "Imperfect", voz: "Active", modo: "Indicative", pessoa: "3rd", numero: "Singular", label: "Imperfect Active Indicative 3rd Singular" },
    "ομεν": { tipo: "Verb", tempo: "Imperfect", voz: "Active", modo: "Indicative", pessoa: "1st", numero: "Plural", label: "Imperfect Active Indicative 1st Plural" },
    "ετε": { tipo: "Verb", tempo: "Imperfect", voz: "Active", modo: "Indicative", pessoa: "2nd", numero: "Plural", label: "Imperfect Active Indicative 2nd Plural" },
  },
  "aorist_active_indicative": {
    "α": { tipo: "Verb", tempo: "Aorist", voz: "Active", modo: "Indicative", pessoa: "1st", numero: "Singular", label: "Aorist Active Indicative 1st Singular" },
    "ας": { tipo: "Verb", tempo: "Aorist", voz: "Active", modo: "Indicative", pessoa: "2nd", numero: "Singular", label: "Aorist Active Indicative 2nd Singular" },
    "εν": { tipo: "Verb", tempo: "Aorist", voz: "Active", modo: "Indicative", pessoa: "3rd", numero: "Singular", label: "Aorist Active Indicative 3rd Singular" },
    "αμεν": { tipo: "Verb", tempo: "Aorist", voz: "Active", modo: "Indicative", pessoa: "1st", numero: "Plural", label: "Aorist Active Indicative 1st Plural" },
    "ατε": { tipo: "Verb", tempo: "Aorist", voz: "Active", modo: "Indicative", pessoa: "2nd", numero: "Plural", label: "Aorist Active Indicative 2nd Plural" },
    "αν": { tipo: "Verb", tempo: "Aorist", voz: "Active", modo: "Indicative", pessoa: "3rd", numero: "Plural", label: "Aorist Active Indicative 3rd Plural" },
  },
  "future_active_indicative": {
    "ω": { tipo: "Verb", tempo: "Future", voz: "Active", modo: "Indicative", pessoa: "1st", numero: "Singular", label: "Future Active Indicative 1st Singular" },
    "εις": { tipo: "Verb", tempo: "Future", voz: "Active", modo: "Indicative", pessoa: "2nd", numero: "Singular", label: "Future Active Indicative 2nd Singular" },
    "ει": { tipo: "Verb", tempo: "Future", voz: "Active", modo: "Indicative", pessoa: "3rd", numero: "Singular", label: "Future Active Indicative 3rd Singular" },
    "ομεν": { tipo: "Verb", tempo: "Future", voz: "Active", modo: "Indicative", pessoa: "1st", numero: "Plural", label: "Future Active Indicative 1st Plural" },
    "ετε": { tipo: "Verb", tempo: "Future", voz: "Active", modo: "Indicative", pessoa: "2nd", numero: "Plural", label: "Future Active Indicative 2nd Plural" },
    "ουσιν": { tipo: "Verb", tempo: "Future", voz: "Active", modo: "Indicative", pessoa: "3rd", numero: "Plural", label: "Future Active Indicative 3rd Plural" },
  },
  "perfect_active_indicative": {
    "α": { tipo: "Verb", tempo: "Perfect", voz: "Active", modo: "Indicative", pessoa: "1st", numero: "Singular", label: "Perfect Active Indicative 1st Singular" },
    "ας": { tipo: "Verb", tempo: "Perfect", voz: "Active", modo: "Indicative", pessoa: "2nd", numero: "Singular", label: "Perfect Active Indicative 2nd Singular" },
    "εν": { tipo: "Verb", tempo: "Perfect", voz: "Active", modo: "Indicative", pessoa: "3rd", numero: "Singular", label: "Perfect Active Indicative 3rd Singular" },
    "αμεν": { tipo: "Verb", tempo: "Perfect", voz: "Active", modo: "Indicative", pessoa: "1st", numero: "Plural", label: "Perfect Active Indicative 1st Plural" },
    "ατε": { tipo: "Verb", tempo: "Perfect", voz: "Active", modo: "Indicative", pessoa: "2nd", numero: "Plural", label: "Perfect Active Indicative 2nd Plural" },
    "ασιν": { tipo: "Verb", tempo: "Perfect", voz: "Active", modo: "Indicative", pessoa: "3rd", numero: "Plural", label: "Perfect Active Indicative 3rd Plural" },
  },
  "present_middle_passive_indicative": {
    "ομαι": { tipo: "Verb", tempo: "Present", voz: "Middle/Passive", modo: "Indicative", pessoa: "1st", numero: "Singular", label: "Present Middle/Passive Indicative 1st Singular" },
    "η": { tipo: "Verb", tempo: "Present", voz: "Middle/Passive", modo: "Indicative", pessoa: "2nd", numero: "Singular", label: "Present Middle/Passive Indicative 2nd Singular" },
    "εται": { tipo: "Verb", tempo: "Present", voz: "Middle/Passive", modo: "Indicative", pessoa: "3rd", numero: "Singular", label: "Present Middle/Passive Indicative 3rd Singular" },
    "ομεθα": { tipo: "Verb", tempo: "Present", voz: "Middle/Passive", modo: "Indicative", pessoa: "1st", numero: "Plural", label: "Present Middle/Passive Indicative 1st Plural" },
    "εσθε": { tipo: "Verb", tempo: "Present", voz: "Middle/Passive", modo: "Indicative", pessoa: "2nd", numero: "Plural", label: "Present Middle/Passive Indicative 2nd Plural" },
    "ονται": { tipo: "Verb", tempo: "Present", voz: "Middle/Passive", modo: "Indicative", pessoa: "3rd", numero: "Plural", label: "Present Middle/Passive Indicative 3rd Plural" },
  },
  "aorist_passive_indicative": {
    "θην": { tipo: "Verb", tempo: "Aorist", voz: "Passive", modo: "Indicative", pessoa: "1st", numero: "Singular", label: "Aorist Passive Indicative 1st Singular" },
    "θης": { tipo: "Verb", tempo: "Aorist", voz: "Passive", modo: "Indicative", pessoa: "2nd", numero: "Singular", label: "Aorist Passive Indicative 2nd Singular" },
    "θη": { tipo: "Verb", tempo: "Aorist", voz: "Passive", modo: "Indicative", pessoa: "3rd", numero: "Singular", label: "Aorist Passive Indicative 3rd Singular" },
    "θημεν": { tipo: "Verb", tempo: "Aorist", voz: "Passive", modo: "Indicative", pessoa: "1st", numero: "Plural", label: "Aorist Passive Indicative 1st Plural" },
    "θητε": { tipo: "Verb", tempo: "Aorist", voz: "Passive", modo: "Indicative", pessoa: "2nd", numero: "Plural", label: "Aorist Passive Indicative 2nd Plural" },
    "θησαν": { tipo: "Verb", tempo: "Aorist", voz: "Passive", modo: "Indicative", pessoa: "3rd", numero: "Plural", label: "Aorist Passive Indicative 3rd Plural" },
  },
  "imperfect_middle_passive_indicative": {
    "ομην": { tipo: "Verb", tempo: "Imperfect", voz: "Middle/Passive", modo: "Indicative", pessoa: "1st", numero: "Singular", label: "Imperfect Middle/Passive Indicative 1st Singular" },
    "ου": { tipo: "Verb", tempo: "Imperfect", voz: "Middle/Passive", modo: "Indicative", pessoa: "2nd", numero: "Singular", label: "Imperfect Middle/Passive Indicative 2nd Singular" },
    "ετο": { tipo: "Verb", tempo: "Imperfect", voz: "Middle/Passive", modo: "Indicative", pessoa: "3rd", numero: "Singular", label: "Imperfect Middle/Passive Indicative 3rd Singular" },
    "ομεθα": { tipo: "Verb", tempo: "Imperfect", voz: "Middle/Passive", modo: "Indicative", pessoa: "1st", numero: "Plural", label: "Imperfect Middle/Passive Indicative 1st Plural" },
    "εσθε": { tipo: "Verb", tempo: "Imperfect", voz: "Middle/Passive", modo: "Indicative", pessoa: "2nd", numero: "Plural", label: "Imperfect Middle/Passive Indicative 2nd Plural" },
    "οντο": { tipo: "Verb", tempo: "Imperfect", voz: "Middle/Passive", modo: "Indicative", pessoa: "3rd", numero: "Plural", label: "Imperfect Middle/Passive Indicative 3rd Plural" },
  },
  "present_active_subjunctive": {
    "ω": { tipo: "Verb", tempo: "Present", voz: "Active", modo: "Subjunctive", pessoa: "1st", numero: "Singular", label: "Present Active Subjunctive 1st Singular" },
    "ης": { tipo: "Verb", tempo: "Present", voz: "Active", modo: "Subjunctive", pessoa: "2nd", numero: "Singular", label: "Present Active Subjunctive 2nd Singular" },
    "η": { tipo: "Verb", tempo: "Present", voz: "Active", modo: "Subjunctive", pessoa: "3rd", numero: "Singular", label: "Present Active Subjunctive 3rd Singular" },
    "ωμεν": { tipo: "Verb", tempo: "Present", voz: "Active", modo: "Subjunctive", pessoa: "1st", numero: "Plural", label: "Present Active Subjunctive 1st Plural" },
    "ητε": { tipo: "Verb", tempo: "Present", voz: "Active", modo: "Subjunctive", pessoa: "2nd", numero: "Plural", label: "Present Active Subjunctive 2nd Plural" },
    "ωσιν": { tipo: "Verb", tempo: "Present", voz: "Active", modo: "Subjunctive", pessoa: "3rd", numero: "Plural", label: "Present Active Subjunctive 3rd Plural" },
  },
  "aorist_active_subjunctive": {
    "ω": { tipo: "Verb", tempo: "Aorist", voz: "Active", modo: "Subjunctive", pessoa: "1st", numero: "Singular", label: "Aorist Active Subjunctive 1st Singular" },
    "ης": { tipo: "Verb", tempo: "Aorist", voz: "Active", modo: "Subjunctive", pessoa: "2nd", numero: "Singular", label: "Aorist Active Subjunctive 2nd Singular" },
    "η": { tipo: "Verb", tempo: "Aorist", voz: "Active", modo: "Subjunctive", pessoa: "3rd", numero: "Singular", label: "Aorist Active Subjunctive 3rd Singular" },
    "ωμεν": { tipo: "Verb", tempo: "Aorist", voz: "Active", modo: "Subjunctive", pessoa: "1st", numero: "Plural", label: "Aorist Active Subjunctive 1st Plural" },
    "ητε": { tipo: "Verb", tempo: "Aorist", voz: "Active", modo: "Subjunctive", pessoa: "2nd", numero: "Plural", label: "Aorist Active Subjunctive 2nd Plural" },
    "ωσιν": { tipo: "Verb", tempo: "Aorist", voz: "Active", modo: "Subjunctive", pessoa: "3rd", numero: "Plural", label: "Aorist Active Subjunctive 3rd Plural" },
  },
  "present_active_imperative": {
    "ε": { tipo: "Verb", tempo: "Present", voz: "Active", modo: "Imperative", pessoa: "2nd", numero: "Singular", label: "Present Active Imperative 2nd Singular" },
    "ετω": { tipo: "Verb", tempo: "Present", voz: "Active", modo: "Imperative", pessoa: "3rd", numero: "Singular", label: "Present Active Imperative 3rd Singular" },
    "ετε": { tipo: "Verb", tempo: "Present", voz: "Active", modo: "Imperative", pessoa: "2nd", numero: "Plural", label: "Present Active Imperative 2nd Plural" },
    "ετωσαν": { tipo: "Verb", tempo: "Present", voz: "Active", modo: "Imperative", pessoa: "3rd", numero: "Plural", label: "Present Active Imperative 3rd Plural" },
  },
  "aorist_active_imperative": {
    "ον": { tipo: "Verb", tempo: "Aorist", voz: "Active", modo: "Imperative", pessoa: "2nd", numero: "Singular", label: "Aorist Active Imperative 2nd Singular" },
    "ατω": { tipo: "Verb", tempo: "Aorist", voz: "Active", modo: "Imperative", pessoa: "3rd", numero: "Singular", label: "Aorist Active Imperative 3rd Singular" },
    "ατε": { tipo: "Verb", tempo: "Aorist", voz: "Active", modo: "Imperative", pessoa: "2nd", numero: "Plural", label: "Aorist Active Imperative 2nd Plural" },
    "ατωσαν": { tipo: "Verb", tempo: "Aorist", voz: "Active", modo: "Imperative", pessoa: "3rd", numero: "Plural", label: "Aorist Active Imperative 3rd Plural" },
  },
  "present_active_infinitive": {
    "ειν": { tipo: "Verb", tempo: "Present", voz: "Active", modo: "Infinitive", label: "Present Active Infinitive" },
  },
  "aorist_active_infinitive": {
    "αι": { tipo: "Verb", tempo: "Aorist", voz: "Active", modo: "Infinitive", label: "Aorist Active Infinitive" },
  },
  "present_middle_passive_infinitive": {
    "εσθαι": { tipo: "Verb", tempo: "Present", voz: "Middle/Passive", modo: "Infinitive", label: "Present Middle/Passive Infinitive" },
  },
  "aorist_middle_infinitive": {
    "ασθαι": { tipo: "Verb", tempo: "Aorist", voz: "Middle", modo: "Infinitive", label: "Aorist Middle Infinitive" },
  },
  "aorist_passive_infinitive": {
    "θηναι": { tipo: "Verb", tempo: "Aorist", voz: "Passive", modo: "Infinitive", label: "Aorist Passive Infinitive" },
  },
  "present_active_participle": {
    "ων": { tipo: "Verb", tempo: "Present", voz: "Active", modo: "Participle", genero: "Masculine", caso: "Nominative", numero: "Singular", label: "Present Active Participle Masc Nom Sg" },
    "οντος": { tipo: "Verb", tempo: "Present", voz: "Active", modo: "Participle", genero: "Masculine", caso: "Genitive", numero: "Singular", label: "Present Active Participle Masc Gen Sg" },
    "οντι": { tipo: "Verb", tempo: "Present", voz: "Active", modo: "Participle", genero: "Masculine", caso: "Dative", numero: "Singular", label: "Present Active Participle Masc Dat Sg" },
    "οντα": { tipo: "Verb", tempo: "Present", voz: "Active", modo: "Participle", genero: "Masculine", caso: "Accusative", numero: "Singular", label: "Present Active Participle Masc Acc Sg" },
    "οντες": { tipo: "Verb", tempo: "Present", voz: "Active", modo: "Participle", genero: "Masculine", caso: "Nominative", numero: "Plural", label: "Present Active Participle Masc Nom Pl" },
    "οντων": { tipo: "Verb", tempo: "Present", voz: "Active", modo: "Participle", genero: "Masculine", caso: "Genitive", numero: "Plural", label: "Present Active Participle Masc Gen Pl" },
    "ουσα": { tipo: "Verb", tempo: "Present", voz: "Active", modo: "Participle", genero: "Feminine", caso: "Nominative", numero: "Singular", label: "Present Active Participle Fem Nom Sg" },
    "ουσης": { tipo: "Verb", tempo: "Present", voz: "Active", modo: "Participle", genero: "Feminine", caso: "Genitive", numero: "Singular", label: "Present Active Participle Fem Gen Sg" },
    "ουση": { tipo: "Verb", tempo: "Present", voz: "Active", modo: "Participle", genero: "Feminine", caso: "Dative", numero: "Singular", label: "Present Active Participle Fem Dat Sg" },
    "ουσαν": { tipo: "Verb", tempo: "Present", voz: "Active", modo: "Participle", genero: "Feminine", caso: "Accusative", numero: "Singular", label: "Present Active Participle Fem Acc Sg" },
    "ουσαι": { tipo: "Verb", tempo: "Present", voz: "Active", modo: "Participle", genero: "Feminine", caso: "Nominative", numero: "Plural", label: "Present Active Participle Fem Nom Pl" },
    "ουσων": { tipo: "Verb", tempo: "Present", voz: "Active", modo: "Participle", genero: "Feminine", caso: "Genitive", numero: "Plural", label: "Present Active Participle Fem Gen Pl" },
    "ον": { tipo: "Verb", tempo: "Present", voz: "Active", modo: "Participle", genero: "Neuter", caso: "Nominative", numero: "Singular", label: "Present Active Participle Neut Nom Sg" },
  },
  "aorist_active_participle": {
    "ας": { tipo: "Verb", tempo: "Aorist", voz: "Active", modo: "Participle", genero: "Masculine", caso: "Nominative", numero: "Singular", label: "Aorist Active Participle Masc Nom Sg" },
    "αντος": { tipo: "Verb", tempo: "Aorist", voz: "Active", modo: "Participle", genero: "Masculine", caso: "Genitive", numero: "Singular", label: "Aorist Active Participle Masc Gen Sg" },
    "αντι": { tipo: "Verb", tempo: "Aorist", voz: "Active", modo: "Participle", genero: "Masculine", caso: "Dative", numero: "Singular", label: "Aorist Active Participle Masc Dat Sg" },
    "αντα": { tipo: "Verb", tempo: "Aorist", voz: "Active", modo: "Participle", genero: "Masculine", caso: "Accusative", numero: "Singular", label: "Aorist Active Participle Masc Acc Sg" },
    "αντες": { tipo: "Verb", tempo: "Aorist", voz: "Active", modo: "Participle", genero: "Masculine", caso: "Nominative", numero: "Plural", label: "Aorist Active Participle Masc Nom Pl" },
    "ασα": { tipo: "Verb", tempo: "Aorist", voz: "Active", modo: "Participle", genero: "Feminine", caso: "Nominative", numero: "Singular", label: "Aorist Active Participle Fem Nom Sg" },
    "αν": { tipo: "Verb", tempo: "Aorist", voz: "Active", modo: "Participle", genero: "Neuter", caso: "Nominative", numero: "Singular", label: "Aorist Active Participle Neut Nom Sg" },
  },
};

// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═
// GREEK NOUN FORM PARSER (from actual Greek text)
// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═

const GREEK_NOUN_ENDINGS: Record<string, MorfologiaEstruturada> = {
  "η": { tipo: "Noun", caso: "Nominative", numero: "Singular", genero: "Feminine", label: "1st Declension Nom Sg Fem" },
  "ης": { tipo: "Noun", caso: "Genitive", numero: "Singular", genero: "Feminine", label: "1st Declension Gen Sg Fem" },
  "ην": { tipo: "Noun", caso: "Accusative", numero: "Singular", genero: "Feminine", label: "1st Declension Acc Sg Fem" },
  "αι": { tipo: "Noun", caso: "Nominative", numero: "Plural", genero: "Feminine", label: "1st Declension Nom Pl Fem" },
  "ων": { tipo: "Noun", caso: "Genitive", numero: "Plural", genero: "Feminine", label: "1st Declension Gen Pl Fem" },
  "αις": { tipo: "Noun", caso: "Dative", numero: "Plural", genero: "Feminine", label: "1st Declension Dat Pl Fem" },
  "ος": { tipo: "Noun", caso: "Nominative", numero: "Singular", genero: "Masculine", label: "2nd Declension Nom Sg Masc" },
  "ου": { tipo: "Noun", caso: "Genitive", numero: "Singular", genero: "Masculine", label: "2nd Declension Gen Sg Masc" },
  "ον": { tipo: "Noun", caso: "Accusative", numero: "Singular", genero: "Masculine", label: "2nd Declension Acc Sg Masc" },
  "ε": { tipo: "Noun", caso: "Vocative", numero: "Singular", genero: "Masculine", label: "2nd Declension Voc Sg Masc" },
  "οι": { tipo: "Noun", caso: "Nominative", numero: "Plural", genero: "Masculine", label: "2nd Declension Nom Pl Masc" },
  "οις": { tipo: "Noun", caso: "Dative", numero: "Plural", genero: "Masculine", label: "2nd Declension Dat Pl Masc" },
  "ους": { tipo: "Noun", caso: "Accusative", numero: "Plural", genero: "Masculine", label: "2nd Declension Acc Pl Masc" },
};

// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═
// HEBREW VERB FORM PARSER
// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═

interface HebrewVerbPattern { suffix: string; result: MorfologiaEstruturada; }

const HEBREW_VERB_SUFFIXES: HebrewVerbPattern[] = [
  { suffix: "תְִ", result: { tipo: "Verb", stem: "Qal", tempo: "Perfect", pessoa: "1st", numero: "Singular", genero: "Common", label: "Qal Perfect 1st Sg" } },
  { suffix: "תָּ", result: { tipo: "Verb", stem: "Qal", tempo: "Perfect", pessoa: "2nd", numero: "Singular", genero: "Masculine", label: "Qal Perfect 2nd Sg Masc" } },
  { suffix: "תֶּ", result: { tipo: "Verb", stem: "Qal", tempo: "Perfect", pessoa: "2nd", numero: "Singular", genero: "Feminine", label: "Qal Perfect 2nd Sg Fem" } },
  { suffix: "ה", result: { tipo: "Verb", stem: "Qal", tempo: "Perfect", pessoa: "3rd", numero: "Singular", genero: "Masculine", label: "Qal Perfect 3rd Sg Masc" } },
  { suffix: "הָ", result: { tipo: "Verb", stem: "Qal", tempo: "Perfect", pessoa: "3rd", numero: "Singular", genero: "Feminine", label: "Qal Perfect 3rd Sg Fem" } },
  { suffix: "נוא", result: { tipo: "Verb", stem: "Qal", tempo: "Perfect", pessoa: "1st", numero: "Plural", genero: "Common", label: "Qal Perfect 1st Pl" } },
  { suffix: "תֶם", result: { tipo: "Verb", stem: "Qal", tempo: "Perfect", pessoa: "2nd", numero: "Plural", genero: "Masculine", label: "Qal Perfect 2nd Pl Masc" } },
  { suffix: "תֶן", result: { tipo: "Verb", stem: "Qal", tempo: "Perfect", pessoa: "2nd", numero: "Plural", genero: "Feminine", label: "Qal Perfect 2nd Pl Fem" } },
  { suffix: "וא", result: { tipo: "Verb", stem: "Qal", tempo: "Perfect", pessoa: "3rd", numero: "Plural", genero: "Masculine", label: "Qal Perfect 3rd Pl Masc" } },
  { suffix: "ים", result: { tipo: "Verb", stem: "Qal", tempo: "Participle", genero: "Masculine", numero: "Plural", label: "Qal Participle Masc Pl" } },
  { suffix: "ה", result: { tipo: "Verb", stem: "Qal", tempo: "Participle", genero: "Feminine", numero: "Singular", label: "Qal Participle Fem Sg" } },
];

// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═
// FULL PARADIGM TABLES
// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═

export interface ParadigmCell {
  person?: string;
  number?: string;
  gender?: string;
  case_?: string;
  form: string;
  transliteration: string;
  morphology: string;
}

export interface ParadigmTable {
  name: string;
  description: string;
  rows: ParadigmCell[];
}

const LYO_PARADIGM: ParadigmTable = {
  name: "λύω — Regular 1st Conjugation (\"I loose\")",
  description: "Regular omega verb with -ω ending. The paradigm verb for Greek verb study.",
  rows: [
    { person: "1st", number: "Singular", form: "λύω", transliteration: "lyō", morphology: "V-PAI-1S" },
    { person: "2nd", number: "Singular", form: "λύεις", transliteration: "lyeis", morphology: "V-PAI-2S" },
    { person: "3rd", number: "Singular", form: "λύει", transliteration: "lyei", morphology: "V-PAI-3S" },
    { person: "1st", number: "Plural", form: "λύομεν", transliteration: "lyomen", morphology: "V-PAI-1P" },
    { person: "2nd", number: "Plural", form: "λύετε", transliteration: "lyete", morphology: "V-PAI-2P" },
    { person: "3rd", number: "Plural", form: "λύουσι(ν)", transliteration: "lyousi(n)", morphology: "V-PAI-3P" },
    { person: "1st", number: "Singular", form: "ἐλυον", transliteration: "elyon", morphology: "V-IAI-1S" },
    { person: "2nd", number: "Singular", form: "ἐλυες", transliteration: "elyes", morphology: "V-IAI-2S" },
    { person: "3rd", number: "Singular", form: "ἐλυε(ν)", transliteration: "elye(n)", morphology: "V-IAI-3S" },
    { person: "1st", number: "Plural", form: "ἐλύομεν", transliteration: "elyomen", morphology: "V-IAI-1P" },
    { person: "2nd", number: "Plural", form: "ἐλύετε", transliteration: "elyete", morphology: "V-IAI-2P" },
    { person: "3rd", number: "Plural", form: "ἐλυον", transliteration: "elyon", morphology: "V-IAI-3P" },
    { person: "1st", number: "Singular", form: "λύσω", transliteration: "lysō", morphology: "V-FAI-1S" },
    { person: "2nd", number: "Singular", form: "λύσεις", transliteration: "lyseis", morphology: "V-FAI-2S" },
    { person: "3rd", number: "Singular", form: "λύσει", transliteration: "lysei", morphology: "V-FAI-3S" },
    { person: "1st", number: "Plural", form: "λύσομεν", transliteration: "lysome(n)", morphology: "V-FAI-1P" },
    { person: "2nd", number: "Plural", form: "λύσετε", transliteration: "lysete", morphology: "V-FAI-2P" },
    { person: "3rd", number: "Plural", form: "λύσουσι(ν)", transliteration: "lysousi(n)", morphology: "V-FAI-3P" },
    { person: "1st", number: "Singular", form: "ἐλυσα", transliteration: "elysa", morphology: "V-AAI-1S" },
    { person: "2nd", number: "Singular", form: "ἐλυσας", transliteration: "elysas", morphology: "V-AAI-2S" },
    { person: "3rd", number: "Singular", form: "ἐλυσε(ν)", transliteration: "elyse(n)", morphology: "V-AAI-3S" },
    { person: "1st", number: "Plural", form: "ἐλύσαμεν", transliteration: "elysamen", morphology: "V-AAI-1P" },
    { person: "2nd", number: "Plural", form: "ἐλύσατε", transliteration: "elysate", morphology: "V-AAI-2P" },
    { person: "3rd", number: "Plural", form: "ἐλυσαν", transliteration: "elysan", morphology: "V-AAI-3P" },
    { person: "1st", number: "Singular", form: "λέλυκα", transliteration: "lelyka", morphology: "V-RAI-1S" },
    { person: "2nd", number: "Singular", form: "λέλυκας", transliteration: "lelykas", morphology: "V-RAI-2S" },
    { person: "3rd", number: "Singular", form: "λέλυκε(ν)", transliteration: "lelyke(n)", morphology: "V-RAI-3S" },
    { person: "1st", number: "Plural", form: "λελύκαμεν", transliteration: "lelykamen", morphology: "V-RAI-1P" },
    { person: "2nd", number: "Plural", form: "λελύκατε", transliteration: "lelykate", morphology: "V-RAI-2P" },
    { person: "3rd", number: "Plural", form: "λελύκασι(ν)", transliteration: "lelykasi(n)", morphology: "V-RAI-3P" },
    { person: "1st", number: "Singular", form: "ἐλελύκειν", transliteration: "elelykein", morphology: "V-LAI-1S" },
    { person: "2nd", number: "Singular", form: "ἐλελύκεις", transliteration: "elelykeis", morphology: "V-LAI-2S" },
    { person: "3rd", number: "Singular", form: "ἐλελύκει", transliteration: "elelykei", morphology: "V-LAI-3S" },
    { person: "1st", number: "Singular", form: "λύομαι", transliteration: "lyomai", morphology: "V-PMP-1S" },
    { person: "2nd", number: "Singular", form: "λύη", transliteration: "lyē", morphology: "V-PMP-2S" },
    { person: "3rd", number: "Singular", form: "λύεται", transliteration: "lyetai", morphology: "V-PMP-3S" },
    { person: "1st", number: "Plural", form: "λυόμεθα", transliteration: "lyometha", morphology: "V-PMP-1P" },
    { person: "2nd", number: "Plural", form: "λύεσθε", transliteration: "lyesthe", morphology: "V-PMP-2P" },
    { person: "3rd", number: "Plural", form: "λύονται", transliteration: "lyontai", morphology: "V-PMP-3P" },
    { person: "1st", number: "Singular", form: "ἐλυόμην", transliteration: "elyomēn", morphology: "V-IMP-1S" },
    { person: "2nd", number: "Singular", form: "ἐλύου", transliteration: "elyou", morphology: "V-IMP-2S" },
    { person: "3rd", number: "Singular", form: "ἐλύετο", transliteration: "elyeto", morphology: "V-IMP-3S" },
    { person: "1st", number: "Plural", form: "ἐλυόμεθα", transliteration: "elyometha", morphology: "V-IMP-1P" },
    { person: "2nd", number: "Plural", form: "ἐλύεσθε", transliteration: "elyesthe", morphology: "V-IMP-2P" },
    { person: "3rd", number: "Plural", form: "ἐλύοντο", transliteration: "elyonto", morphology: "V-IMP-3P" },
    { person: "1st", number: "Singular", form: "λύσομαι", transliteration: "lysomai", morphology: "V-FMI-1S" },
    { person: "2nd", number: "Singular", form: "λύση", transliteration: "lysē", morphology: "V-FMI-2S" },
    { person: "3rd", number: "Singular", form: "λύσεται", transliteration: "lysetai", morphology: "V-FMI-3S" },
    { person: "1st", number: "Singular", form: "ἐλυσάμην", transliteration: "elysamēn", morphology: "V-AMI-1S" },
    { person: "2nd", number: "Singular", form: "ἐλύσω", transliteration: "elysō", morphology: "V-AMI-2S" },
    { person: "3rd", number: "Singular", form: "ἐλύσατο", transliteration: "elysato", morphology: "V-AMI-3S" },
    { person: "1st", number: "Singular", form: "ἐλύθην", transliteration: "elythēn", morphology: "V-API-1S" },
    { person: "2nd", number: "Singular", form: "ἐλύθης", transliteration: "elythēs", morphology: "V-API-2S" },
    { person: "3rd", number: "Singular", form: "ἐλύθη", transliteration: "elythē", morphology: "V-API-3S" },
    { person: "1st", number: "Plural", form: "ἐλύθημεν", transliteration: "elythēmen", morphology: "V-API-1P" },
    { person: "2nd", number: "Plural", form: "ἐλύθητε", transliteration: "elythēte", morphology: "V-API-2P" },
    { person: "3rd", number: "Plural", form: "ἐλύθησαν", transliteration: "elythēsan", morphology: "V-API-3P" },
    { person: "1st", number: "Singular", form: "λέλυμαι", transliteration: "lelymai", morphology: "V-RMP-1S" },
    { person: "2nd", number: "Singular", form: "λέλυσαι", transliteration: "lelysai", morphology: "V-RMP-2S" },
    { person: "3rd", number: "Singular", form: "λέλυται", transliteration: "lelytai", morphology: "V-RMP-3S" },
    { person: "1st", number: "Singular", form: "λύω", transliteration: "lyō", morphology: "V-PAS-1S" },
    { person: "2nd", number: "Singular", form: "λύης", transliteration: "lyēis", morphology: "V-PAS-2S" },
    { person: "3rd", number: "Singular", form: "λύη", transliteration: "lyēi", morphology: "V-PAS-3S" },
    { person: "1st", number: "Singular", form: "λύσω", transliteration: "lysō", morphology: "V-AAS-1S" },
    { person: "2nd", number: "Singular", form: "λύσης", transliteration: "lysēis", morphology: "V-AAS-2S" },
    { person: "3rd", number: "Singular", form: "λύση", transliteration: "lysēi", morphology: "V-AAS-3S" },
    { person: "2nd", number: "Singular", form: "λύε", transliteration: "lye", morphology: "V-PAM-2S" },
    { person: "3rd", number: "Singular", form: "λυέτω", transliteration: "lyetō", morphology: "V-PAM-3S" },
    { person: "2nd", number: "Singular", form: "λύσον", transliteration: "lyson", morphology: "V-AAM-2S" },
    { person: "3rd", number: "Singular", form: "λυσάτω", transliteration: "lysato", morphology: "V-AAM-3S" },
    { form: "λύειν", transliteration: "lyein", morphology: "V-PAN" },
    { form: "λύσαι", transliteration: "lysai", morphology: "V-AAN" },
    { form: "λύσειν", transliteration: "lysein", morphology: "V-FAN" },
    { form: "λελυκέναι", transliteration: "lelykenai", morphology: "V-RAN" },
    { form: "λύεσθαι", transliteration: "lyesthai", morphology: "V-PMN" },
    { form: "λύσασθαι", transliteration: "lysasthai", morphology: "V-AMN" },
    { form: "λυθηναι", transliteration: "lythēnai", morphology: "V-APN" },
    { gender: "Masculine", form: "λύων", transliteration: "lyōn", morphology: "V-PAP-NSM" },
    { gender: "Feminine", form: "λύουσα", transliteration: "lyousa", morphology: "V-PAP-NSF" },
    { gender: "Neuter", form: "λύον", transliteration: "lyon", morphology: "V-PAP-NSN" },
    { gender: "Masculine", form: "λύσας", transliteration: "lysas", morphology: "V-AAP-NSM" },
    { gender: "Feminine", form: "λύσασα", transliteration: "lysasa", morphology: "V-AAP-NSF" },
    { gender: "Neuter", form: "λύσαν", transliteration: "lysan", morphology: "V-AAP-NSN" },
    { gender: "Masculine", form: "λελυκώς", transliteration: "lelykōs", morphology: "V-RAP-NSM" },
    { gender: "Feminine", form: "λελυκυία", transliteration: "lelykvia", morphology: "V-RAP-NSF" },
    { gender: "Neuter", form: "λελυκός", transliteration: "lelykos", morphology: "V-RAP-NSN" },
  ],
};

const BALKO_PARADIGM: ParadigmTable = {
  name: "βάλλω — 2nd Aorist Verb (\"I throw\")",
  description: "2nd Aorist verbs form their aorist like an imperfect with ablaut, NOT with -σα- suffix.",
  rows: [
    { person: "1st", number: "Singular", form: "βάλλω", transliteration: "ballō", morphology: "V-PAI-1S" },
    { person: "2nd", number: "Singular", form: "βάλλεις", transliteration: "balleis", morphology: "V-PAI-2S" },
    { person: "3rd", number: "Singular", form: "βάλλει", transliteration: "ballei", morphology: "V-PAI-3S" },
    { person: "1st", number: "Singular", form: "ἐβαλον", transliteration: "ebalon", morphology: "V-2AAI-1S" },
    { person: "2nd", number: "Singular", form: "ἐβαλες", transliteration: "ebales", morphology: "V-2AAI-2S" },
    { person: "3rd", number: "Singular", form: "ἐβαλε(ν)", transliteration: "ebale(n)", morphology: "V-2AAI-3S" },
    { person: "1st", number: "Plural", form: "ἐβάλομεν", transliteration: "ebalomen", morphology: "V-2AAI-1P" },
    { person: "2nd", number: "Plural", form: "ἐβάλετε", transliteration: "ebalete", morphology: "V-2AAI-2P" },
    { person: "3rd", number: "Plural", form: "ἐβαλον", transliteration: "ebalon", morphology: "V-2AAI-3P" },
    { person: "1st", number: "Singular", form: "βάλω", transliteration: "balō", morphology: "V-2AAS-1S" },
    { form: "βαλείν", transliteration: "balein", morphology: "V-2AAN" },
    { form: "βαλών", transliteration: "balōn", morphology: "V-2AAP-NSM" },
  ],
};

const DIDOMI_PARADIGM: ParadigmTable = {
  name: "δίδωμι — 3rd Conjugation (-μι verb) (\"I give\")",
  description: "-μι verbs use special endings without the -ω/-εις/-ει pattern.",
  rows: [
    { person: "1st", number: "Singular", form: "δίδωμι", transliteration: "didōmi", morphology: "V-PAI-1S" },
    { person: "2nd", number: "Singular", form: "δίδως", transliteration: "didōs", morphology: "V-PAI-2S" },
    { person: "3rd", number: "Singular", form: "δίδωσι(ν)", transliteration: "didōsi(n)", morphology: "V-PAI-3S" },
    { person: "1st", number: "Plural", form: "δίδομεν", transliteration: "didomen", morphology: "V-PAI-1P" },
    { person: "2nd", number: "Plural", form: "δίδοτε", transliteration: "didote", morphology: "V-PAI-2P" },
    { person: "3rd", number: "Plural", form: "διδόασι(ν)", transliteration: "didoasi(n)", morphology: "V-PAI-3P" },
    { person: "1st", number: "Singular", form: "ἐδίδουν", transliteration: "edidoun", morphology: "V-IAI-1S" },
    { person: "3rd", number: "Singular", form: "ἐδίδου", transliteration: "edidou", morphology: "V-IAI-3S" },
    { person: "1st", number: "Singular", form: "ἔδωκα", transliteration: "edōka", morphology: "V-2AAI-1S" },
    { person: "3rd", number: "Singular", form: "ἔδωκε(ν)", transliteration: "edōke(n)", morphology: "V-2AAI-3S" },
    { form: "δούναι", transliteration: "dounai", morphology: "V-2AAN" },
    { form: "διδούς", transliteration: "didous", morphology: "V-PAP-NSM" },
    { form: "διδούσα", transliteration: "didousa", morphology: "V-PAP-NSF" },
  ],
};

const AGAPAO_PARADIGM: ParadigmTable = {
  name: "αγαπάω — Contract Verb -αω (\"I love\")",
  description: "Contract verbs contract their final vowel. α + ε = α, α + ο = ω.",
  rows: [
    { person: "1st", number: "Singular", form: "αγαπφ", transliteration: "agapō", morphology: "V-PAI-1S" },
    { person: "2nd", number: "Singular", form: "αγαπᾱς", transliteration: "agapᾱs", morphology: "V-PAI-2S" },
    { person: "3rd", number: "Singular", form: "αγαπᾱ", transliteration: "agapᾱ", morphology: "V-PAI-3S" },
    { person: "1st", number: "Singular", form: "ἠγάπησα", transliteration: "ēgapēsa", morphology: "V-AAI-1S" },
    { person: "3rd", number: "Singular", form: "ἠγάπησε(ν)", transliteration: "ēgapēse(n)", morphology: "V-AAI-3S" },
    { person: "1st", number: "Singular", form: "αγαπήσω", transliteration: "agapēsō", morphology: "V-FAI-1S" },
    { person: "1st", number: "Singular", form: "ἠγαπήθην", transliteration: "ēgapēthēn", morphology: "V-API-1S" },
    { form: "αγαπφν", transliteration: "agapōn", morphology: "V-PAP-NSM" },
    { form: "αγαπᾱν", transliteration: "agapᾱn", morphology: "V-PAN" },
    { form: "αγαπήσαι", transliteration: "agapēsai", morphology: "V-AAN" },
  ],
};

const EIMI_PARADIGM: ParadigmTable = {
  name: "ειμί — Irregular Verb (\"I am\")",
  description: "The most fundamental irregular verb in Greek.",
  rows: [
    { person: "1st", number: "Singular", form: "ειμί", transliteration: "eimi", morphology: "V-PAI-1S" },
    { person: "2nd", number: "Singular", form: "εί", transliteration: "ei", morphology: "V-PAI-2S" },
    { person: "3rd", number: "Singular", form: "ἐστί(ν)", transliteration: "esti(n)", morphology: "V-PAI-3S" },
    { person: "1st", number: "Plural", form: "ἐσμέν", transliteration: "esmen", morphology: "V-PAI-1P" },
    { person: "2nd", number: "Plural", form: "ἐστέ", transliteration: "este", morphology: "V-PAI-2P" },
    { person: "3rd", number: "Plural", form: "εισί(ν)", transliteration: "eisi(n)", morphology: "V-PAI-3P" },
    { person: "1st", number: "Singular", form: "ἢμην", transliteration: "ēmēn", morphology: "V-IAI-1S" },
    { person: "3rd", number: "Singular", form: "ἦν", transliteration: "ēn", morphology: "V-IAI-3S" },
    { person: "3rd", number: "Plural", form: "ἦσαν", transliteration: "ēsan", morphology: "V-IAI-3P" },
    { person: "1st", number: "Singular", form: "ὠ", transliteration: "ō", morphology: "V-PAS-1S" },
    { person: "3rd", number: "Singular", form: "ῆι", transliteration: "ēi", morphology: "V-PAS-3S" },
    { person: "2nd", number: "Singular", form: "ἰσθι", transliteration: "isthi", morphology: "V-PAM-2S" },
    { person: "3rd", number: "Singular", form: "ἐστω", transliteration: "estō", morphology: "V-PAM-3S" },
    { form: "είναι", transliteration: "einai", morphology: "V-PAN" },
    { form: "ὠν", transliteration: "ōn", morphology: "V-PAP-NSM" },
    { form: "ούσα", transliteration: "ousa", morphology: "V-PAP-NSF" },
    { form: "όν", transliteration: "on", morphology: "V-PAP-NSN" },
  ],
};

const PHIEMI_PARADIGM: ParadigmTable = {
  name: "φημί — Irregular Verb (\"I say\")",
  description: "Defective verb used mainly in direct discourse.",
  rows: [
    { person: "1st", number: "Singular", form: "φημί", transliteration: "phēmi", morphology: "V-PAI-1S" },
    { person: "3rd", number: "Singular", form: "φησί(ν)", transliteration: "phēsi(n)", morphology: "V-PAI-3S" },
    { person: "3rd", number: "Singular", form: "ἔφη", transliteration: "ephē", morphology: "V-IAI-3S" },
    { form: "φάναι", transliteration: "phanai", morphology: "V-PAN" },
  ],
};

const TITHEMI_PARADIGM: ParadigmTable = {
  name: "τίθημι — 3rd Conjugation (-μι verb) (\"I place\")",
  description: "Common -μι verb with reduplicated present and irregular aorist.",
  rows: [
    { person: "1st", number: "Singular", form: "τίθημι", transliteration: "tithēmi", morphology: "V-PAI-1S" },
    { person: "3rd", number: "Singular", form: "τίθησι(ν)", transliteration: "tithēsi(n)", morphology: "V-PAI-3S" },
    { person: "1st", number: "Singular", form: "ἔθηκα", transliteration: "ethēka", morphology: "V-2AAI-1S" },
    { person: "1st", number: "Singular", form: "τίθεμαι", transliteration: "tithemai", morphology: "V-PMP-1S" },
    { form: "τίθεσθαι", transliteration: "tithesthai", morphology: "V-PMN" },
    { form: "τιθείς", transliteration: "titheis", morphology: "V-PAP-NSM" },
  ],
};

const HISTEMI_PARADIGM: ParadigmTable = {
  name: "ἱστημι — 3rd Conjugation (-μι verb) (\"I stand / I set\")",
  description: "-μι verb with transitive/intransitive alternation.",
  rows: [
    { person: "1st", number: "Singular", form: "ἱστημι", transliteration: "histēmi", morphology: "V-PAI-1S" },
    { person: "1st", number: "Singular", form: "ἔστην", transliteration: "estēn", morphology: "V-2AAI-1S" },
    { person: "1st", number: "Singular", form: "ἐστησάμην", transliteration: "estēsamēn", morphology: "V-2AMI-1S" },
    { form: "ἱστάς", transliteration: "histas", morphology: "V-PAP-NSM" },
  ],
};

const HIEMI_PARADIGM: ParadigmTable = {
  name: "ἱημι — 3rd Conjugation (-μι verb) (\"I send\")",
  description: "-μι verb meaning \"I send\".",
  rows: [
    { person: "1st", number: "Singular", form: "ἱημι", transliteration: "hiēmi", morphology: "V-PAI-1S" },
    { person: "1st", number: "Singular", form: "ῆκα", transliteration: "ēka", morphology: "V-2AAI-1S" },
    { form: "ἱείς", transliteration: "hieis", morphology: "V-PAP-NSM" },
  ],
};

const PARADIGM_INDEX: Record<string, ParadigmTable> = {
  "lyo": LYO_PARADIGM,
  "lyw": LYO_PARADIGM,
  "λύω": LYO_PARADIGM,
  "balko": BALKO_PARADIGM,
  "βάλλω": BALKO_PARADIGM,
  "didomi": DIDOMI_PARADIGM,
  "δίδωμι": DIDOMI_PARADIGM,
  "agapao": AGAPAO_PARADIGM,
  "αγαπάω": AGAPAO_PARADIGM,
  "eimi": EIMI_PARADIGM,
  "ειμί": EIMI_PARADIGM,
  "phiemi": PHIEMI_PARADIGM,
  "φημί": PHIEMI_PARADIGM,
  "tithemi": TITHEMI_PARADIGM,
  "τίθημι": TITHEMI_PARADIGM,
  "histemi": HISTEMI_PARADIGM,
  "ἱστημι": HISTEMI_PARADIGM,
  "hiemi": HIEMI_PARADIGM,
  "ἱημι": HIEMI_PARADIGM,
  "regular": LYO_PARADIGM,
  "2nd-aorist": BALKO_PARADIGM,
  "mi-verb": DIDOMI_PARADIGM,
  "contract": AGAPAO_PARADIGM,
  "irregular": EIMI_PARADIGM,
};

// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═
// PUBLIC API
// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═// ═

export function parseMorphology(code: string) {
  if (!code || !code.trim()) return { tipo: "", label: "" };
  const trimmed = code.trim();
  const upper = trimmed.toUpperCase();
  const firstDash = upper.indexOf("-");
  if (firstDash !== -1) {
    const afterPos = upper.slice(firstDash + 1, firstDash + 2);
    if ("QNPOHMTD".includes(afterPos)) {
      const secondChar = upper.slice(firstDash + 2, firstDash + 3);
      if ("123".includes(secondChar)) return parseGreekMorphCode(trimmed);
      return parseHebrewMorphCode(trimmed);
    }
    if ("123".includes(afterPos)) return parseGreekMorphCode(trimmed);
  }
  return parseGreekMorphCode(trimmed);
}

export function parseGreekVerb(form: string) {
  if (!form || !form.trim()) return { tipo: "", label: "" };
  const normalized = stripDiacritics(form.trim());

  for (const [, endings] of Object.entries(GREEK_ENDINGS)) {
    for (const [ending, template] of Object.entries(endings)) {
      if (normalized.endsWith(ending) && normalized.length > ending.length) {
        const result = { ...template, tipo: "Verb", idioma: "grego", raiz: form } as MorfologiaEstruturada;
        result.label = formatGreekVerbLabel(result);
        return result;
      }
    }
  }

  // Fallback inference
  if (normalized.endsWith("\u03C9")) return { tipo: "Verb", tempo: "Present", voz: "Active", modo: "Indicative", pessoa: "1st", numero: "Singular", idioma: "grego", raiz: form, label: "Present Active Indicative 1st Sg (inferred)" };
  if (normalized.endsWith("\u03B5\u03B9\u03C2")) return { tipo: "Verb", tempo: "Present", voz: "Active", modo: "Indicative", pessoa: "2nd", numero: "Singular", idioma: "grego", raiz: form, label: "Present Active Indicative 2nd Sg (inferred)" };
  if (normalized.endsWith("\u03B5\u03B9")) return { tipo: "Verb", tempo: "Present", voz: "Active", modo: "Indicative", pessoa: "3rd", numero: "Singular", idioma: "grego", raiz: form, label: "Present Active Indicative 3rd Sg (inferred)" };
  if (normalized.endsWith("\u03BF\u03BC\u03B5\u03BD")) return { tipo: "Verb", tempo: "Present", voz: "Active", modo: "Indicative", pessoa: "1st", numero: "Plural", idioma: "grego", raiz: form, label: "Present Active Indicative 1st Pl (inferred)" };
  if (normalized.endsWith("\u03B5\u03C4\u03B5")) return { tipo: "Verb", tempo: "Present", voz: "Active", modo: "Indicative", pessoa: "2nd", numero: "Plural", idioma: "grego", raiz: form, label: "Present Active Indicative 2nd Pl (inferred)" };
  if (normalized.endsWith("\u03BF\u03C5\u03C3\u03B9\u03BD") || normalized.endsWith("\u03BF\u03C5\u03C3\u03B9")) return { tipo: "Verb", tempo: "Present", voz: "Active", modo: "Indicative", pessoa: "3rd", numero: "Plural", idioma: "grego", raiz: form, label: "Present Active Indicative 3rd Pl (inferred)" };
  if (normalized.endsWith("\u03BF\u03BC\u03B1\u03B9")) return { tipo: "Verb", tempo: "Present", voz: "Middle/Passive", modo: "Indicative", pessoa: "1st", numero: "Singular", idioma: "grego", raiz: form, label: "Present Middle/Passive Indicative 1st Sg (inferred)" };
  if (normalized.endsWith("\u03B5\u03C4\u03B1\u03B9")) return { tipo: "Verb", tempo: "Present", voz: "Middle/Passive", modo: "Indicative", pessoa: "3rd", numero: "Singular", idioma: "grego", raiz: form, label: "Present Middle/Passive Indicative 3rd Sg (inferred)" };
  if (normalized.endsWith("\u03BF\u03BD\u03C4\u03B1\u03B9")) return { tipo: "Verb", tempo: "Present", voz: "Middle/Passive", modo: "Indicative", pessoa: "3rd", numero: "Plural", idioma: "grego", raiz: form, label: "Present Middle/Passive Indicative 3rd Pl (inferred)" };
  if (normalized.endsWith("\u03B1\u03C2")) return { tipo: "Verb", tempo: "Aorist", voz: "Active", modo: "Indicative", pessoa: "2nd", numero: "Singular", idioma: "grego", raiz: form, label: "Aorist Active Indicative 2nd Sg (inferred)" };
  if (normalized.endsWith("\u03B1\u03BD")) return { tipo: "Verb", tempo: "Aorist", voz: "Active", modo: "Indicative", pessoa: "3rd", numero: "Plural", idioma: "grego", raiz: form, label: "Aorist Active Indicative 3rd Pl (inferred)" };
  if (normalized.endsWith("\u03C9\u03BD")) return { tipo: "Verb", tempo: "Present", voz: "Active", modo: "Participle", genero: "Masculine", caso: "Nominative", numero: "Singular", idioma: "grego", raiz: form, label: "Present Active Participle Masc Nom Sg (inferred)" };
  if (normalized.endsWith("\u03BF\u03C5\u03C3\u03B1")) return { tipo: "Verb", tempo: "Present", voz: "Active", modo: "Participle", genero: "Feminine", caso: "Nominative", numero: "Singular", idioma: "grego", raiz: form, label: "Present Active Participle Fem Nom Sg (inferred)" };
  if (normalized.endsWith("\u03B5\u03B9\u03BD")) return { tipo: "Verb", tempo: "Present", voz: "Active", modo: "Infinitive", idioma: "grego", raiz: form, label: "Present Active Infinitive (inferred)" };
  if (normalized.endsWith("\u03B1\u03B9")) return { tipo: "Verb", tempo: "Aorist", voz: "Active", modo: "Infinitive", idioma: "grego", raiz: form, label: "Aorist Active Infinitive (inferred)" };
  if (normalized.endsWith("\u03B5\u03C3\u03B8\u03B1\u03B9")) return { tipo: "Verb", tempo: "Present", voz: "Middle/Passive", modo: "Infinitive", idioma: "grego", raiz: form, label: "Present Middle/Passive Infinitive (inferred)" };
  return { tipo: "Verb", idioma: "grego", raiz: form, label: `Verb form: ${form}` };
}

export function parseGreekNoun(form: string) {
  if (!form || !form.trim()) return { tipo: "", label: "" };
  const normalized = stripDiacritics(form.trim());
  for (const [ending, template] of Object.entries(GREEK_NOUN_ENDINGS)) {
    if (normalized.endsWith(ending) && normalized.length > ending.length) {
      const result = { ...template, idioma: "grego", raiz: form } as MorfologiaEstruturada;
      result.label = formatGreekNounLabel(result);
      return result;
    }
  }
  if (normalized.endsWith("\u03BF\u03C2")) return { tipo: "Noun", caso: "Nominative", numero: "Singular", genero: "Masculine", idioma: "grego", raiz: form, label: "2nd Declension Nom Sg Masc (inferred)" };
  if (normalized.endsWith("\u03BF\u03C5")) return { tipo: "Noun", caso: "Genitive", numero: "Singular", genero: "Masculine", idioma: "grego", raiz: form, label: "2nd Declension Gen Sg (inferred)" };
  if (normalized.endsWith("\u03BF\u03BD")) return { tipo: "Noun", caso: "Accusative", numero: "Singular", genero: "Neuter", idioma: "grego", raiz: form, label: "2nd Declension Acc Sg Neut (inferred)" };
  if (normalized.endsWith("\u03BF\u03B9")) return { tipo: "Noun", caso: "Nominative", numero: "Plural", genero: "Masculine", idioma: "grego", raiz: form, label: "2nd Declension Nom Pl Masc (inferred)" };
  if (normalized.endsWith("\u03C9\u03BD")) return { tipo: "Noun", caso: "Genitive", numero: "Plural", genero: "Masculine", idioma: "grego", raiz: form, label: "2nd Declension Gen Pl (inferred)" };
  if (normalized.endsWith("\u03B7")) return { tipo: "Noun", caso: "Nominative", numero: "Singular", genero: "Feminine", idioma: "grego", raiz: form, label: "1st Declension Nom Sg Fem (inferred)" };
  if (normalized.endsWith("\u03B7\u03C2")) return { tipo: "Noun", caso: "Genitive", numero: "Singular", genero: "Feminine", idioma: "grego", raiz: form, label: "1st Declension Gen Sg Fem (inferred)" };
  if (normalized.endsWith("\u03B5\u03C2")) return { tipo: "Noun", caso: "Nominative", numero: "Plural", genero: "Neuter", idioma: "grego", raiz: form, label: "3rd Declension Nom Pl Neut (inferred)" };
  return { tipo: "Noun", idioma: "grego", raiz: form, label: `Noun form: ${form}` };
}

export function parseHebrewVerb(form: string) {
  if (!form || !form.trim()) return { tipo: "", label: "" };
  for (const pattern of HEBREW_VERB_SUFFIXES) {
    if (form.endsWith(pattern.suffix) && form.length > pattern.suffix.length) {
      return { ...pattern.result, idioma: "hebraico", raiz: form };
    }
  }
  const trimmed = form.trim();
  if (trimmed.endsWith("\u05D5\u05D0")) return { tipo: "Verb", stem: "Qal", tempo: "Perfect", pessoa: "3rd", numero: "Plural", genero: "Masculine", idioma: "hebraico", raiz: form, label: "Qal Perfect 3rd Pl Masc (inferred)" };
  if (trimmed.endsWith("\u05D4")) return { tipo: "Verb", stem: "Qal", tempo: "Perfect", pessoa: "3rd", numero: "Singular", genero: "Masculine", idioma: "hebraico", raiz: form, label: "Qal Perfect 3rd Sg Masc (inferred)" };
  if (trimmed.endsWith("\u05D9\u05DD")) return { tipo: "Verb", stem: "Qal", tempo: "Participle", genero: "Masculine", numero: "Plural", idioma: "hebraico", raiz: form, label: "Qal Participle Masc Pl (inferred)" };
  return { tipo: "Verb", idioma: "hebraico", raiz: form, label: `Hebrew verb form: ${form}` };
}

export function getParadigmTable(type: string): ParadigmTable | undefined {
  if (!type) return undefined;
  return PARADIGM_INDEX[type.trim().toLowerCase()];
}

export function getAvailableParadigms(): string[] {
  return Object.keys(PARADIGM_INDEX);
}

export function getMorphLabel(code: string) {
  if (!code) return "";
  return parseMorphology(code).label || code;
}

export function formatMorphology(morph: MorfologiaEstruturada) {
  if (!morph || !morph.tipo) return morph?.label || "";
  const parts = [];
  if (morph.idioma) parts.push(morph.idioma === "grego" ? "Greek" : "Hebrew");
  parts.push(morph.tipo);
  if (morph.tempo) parts.push(morph.tempo);
  if (morph.voz) parts.push(`${morph.voz} Voice`);
  if (morph.modo) parts.push(morph.modo);
  if (morph.stem) parts.push(morph.stem);
  if (morph.modo === "Participle") {
    if (morph.genero) parts.push(morph.genero);
    if (morph.caso) parts.push(morph.caso);
    if (morph.numero) parts.push(morph.numero);
  } else if (morph.modo !== "Infinitive") {
    if (morph.pessoa && morph.numero) parts.push(`${morph.pessoa} ${morph.numero}`);
    if (morph.genero) parts.push(morph.genero);
  }
  if (morph.caso && morph.modo !== "Participle") parts.push(morph.caso);
  if (morph.estado) parts.push(`State: ${morph.estado}`);
  return parts.join(", ") || morph.label || "";
}

export function getCorMorfologia(campo: string) {
  const cores: Record<string, string> = {
    tipo: "bg-indigo-500/15 text-indigo-600 dark:text-indigo-400",
    tempo: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
    voz: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
    modo: "bg-rose-500/15 text-rose-600 dark:text-rose-400",
    pessoa: "bg-pink-500/15 text-pink-600 dark:text-pink-400",
    numero: "bg-cyan-500/15 text-cyan-600 dark:text-cyan-400",
    genero: "bg-violet-500/15 text-violet-600 dark:text-violet-400",
    caso: "bg-red-500/15 text-red-600 dark:text-red-400",
    stem: "bg-green-500/15 text-green-600 dark:text-green-400",
    estado: "bg-orange-500/15 text-orange-600 dark:text-orange-400",
  };
  return cores[campo] || "bg-gray-500/15 text-gray-600 dark:text-gray-400";
}

/** @deprecated Use parseMorphology() instead */
export function parsearMorfologia(morfologia: string, idioma: "grego" | "hebraico") {
  if (!morfologia) return { tipo: "", label: "" };
  if (idioma === "grego") return parseGreekMorphCode(morfologia);
  return parseHebrewMorphCode(morfologia);
}