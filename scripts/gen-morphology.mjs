import { writeFileSync } from "fs";

const lines = [];

function w(line = "") {
  lines.push(line);
}

// ═══════════════════════════════════════════════════════════════════════════════
// MORPHOLOGICAL PARSER — Comprehensive parser for Biblical Greek & Hebrew
// ═══════════════════════════════════════════════════════════════════════════════

w("// \u2550".repeat(35));
w("// MORPHOLOGICAL PARSER \u2014 Comprehensive parser for Biblical Greek & Hebrew");
w("// \u2550".repeat(35));
w();
w("export interface MorfologiaEstruturada {");
w("  tipo;");
w("  idioma?: \"grego\" | \"hebraico\";");
w("  tempo?;");
w("  voz?;");
w("  modo?;");
w("  pessoa?;");
w("  numero?;");
w("  genero?;");
w("  caso?;");
w("  stem?;");
w("  estado?;");
w("  artigo?: boolean;");
w("  raiz?;");
w("  codigo?;");
w("  classe?;");
w("  conjugacao?;");
w("  rotulo?;");
w("  label;");
w("  paradigmKey?;");
w("}");
w();
w("// \u2550".repeat(35));
w("// GREEK \u2014 Constants & Codes");
w("// \u2550".repeat(35));
w();
w("export const GREEK_TENSES = {");
w("  P: \"Present\",");
w("  I: \"Imperfect\",");
w("  F: \"Future\",");
w("  A: \"Aorist\",");
w("  R: \"Perfect\",");
w("  L: \"Pluperfect\",");
w("  \"2A\": \"Second Aorist\",");
w("  \"2F\": \"Second Future\",");
w("  \"2R\": \"Second Perfect\",");
w("  \"2P\": \"Second Pluperfect\",");
w("};");
w();
w("export const GREEK_VOICES = {");
w("  A: \"Active\",");
w("  M: \"Middle\",");
w("  P: \"Passive\",");
w("  MP: \"Middle/Passive\",");
w("};");
w();
w("export const GREEK_MOODS = {");
w("  I: \"Indicative\",");
w("  S: \"Subjunctive\",");
w("  M: \"Imperative\",");
w("  O: \"Optative\",");
w("  N: \"Infinitive\",");
w("  P: \"Participle\",");
w("};");
w();
w("export const GREEK_PERSONS = {");
w("  \"1\": \"1st\",");
w("  \"2\": \"2nd\",");
w("  \"3\": \"3rd\",");
w("};");
w();
w("export const GREEK_NUMBERS = {");
w("  S: \"Singular\",");
w("  P: \"Plural\",");
w("};");
w();
w("export const GREEK_GENDERS = {");
w("  M: \"Masculine\",");
w("  F: \"Feminine\",");
w("  N: \"Neuter\",");
w("  C: \"Common\",");
w("};");
w();
w("export const GREEK_CASES = {");
w("  N: \"Nominative\",");
w("  G: \"Genitive\",");
w("  D: \"Dative\",");
w("  A: \"Accusative\",");
w("  V: \"Vocative\",");
w("};");
w();
w("export const GREEK_PARTS_OF_SPEECH = {");
w("  V: \"Verb\",");
w("  N: \"Noun\",");
w("  A: \"Adjective\",");
w("  T: \"Article\",");
w("  R: \"Pronoun\",");
w("  C: \"Conjunction\",");
w("  P: \"Preposition\",");
w("  D: \"Adverb\",");
w("  I: \"Interjection\",");
w("  F: \"Particle\",");
w("  NUM: \"Numeral\",");
w("};");
w();
w("export const GREEK_DECLENSIONS = {");
w("  \"1\": \"1st (fem. -\u03B7/-\u03B1)\",");
w("  \"2\": \"2nd (masc./neut. -\u03BF\u03C2/-\u03BF\u03BD)\",");
w("  \"3\": \"3rd (mixed)\",");
w("};");
w();
w("// \u2550".repeat(35));
w("// HEBREW \u2014 Constants & Codes");
w("// \u2550".repeat(35));
w();
w("export const HEBREW_STEMS = {");
w("  Q: \"Qal (simple active)\",");
w("  N: \"Niphal (passive/reflexive)\",");
w("  P: \"Piel (intensive active)\",");
w("  O: \"Pual (intensive passive)\",");
w("  H: \"Hiphil (causative active)\",");
w("  M: \"Hophal (causative passive)\",");
w("  T: \"Hithpael (reflexive)\",");
w("  Po: \"Poel (rare active)\",");
w("  D: \"Poal (rare passive)\",");
w("  Dt: \"Hithpoel (rare reflexive)\",");
w("};");
w();
w("export const HEBREW_TENSES = {");
w("  A: \"Perfect (suffix conjugation)\",");
w("  I: \"Imperfect (prefix conjugation)\",");
w("  W: \"Waw-consecutive\",");
w("  J: \"Jussive\",");
w("  C: \"Cohortative\",");
w("  O: \"Imperative\",");
w("  N: \"Infinitive Construct\",");
w("  AB: \"Infinitive Absolute\",");
w("  PTC: \"Participle\",");
w("};");
w();
w("export const HEBREW_PERSONS = {");
w("  \"1\": \"1st\",");
w("  \"2\": \"2nd\",");
w("  \"3\": \"3rd\",");
w("};");
w();
w("export const HEBREW_NUMBERS = {");
w("  S: \"Singular\",");
w("  P: \"Plural\",");
w("  D: \"Dual\",");
w("};");
w();
w("export const HEBREW_GENDERS = {");
w("  M: \"Masculine\",");
w("  F: \"Feminine\",");
w("  C: \"Common\",");
w("};");
w();
w("export const HEBREW_STATES = {");
w("  A: \"Absolute\",");
w("  C: \"Construct\",");
w("  D: \"Determined (with article)\",");
w("};");
w();
w("export const HEBREW_PARTS_OF_SPEECH = {");
w("  V: \"Verb\",");
w("  N: \"Noun\",");
w("  A: \"Adjective\",");
w("  R: \"Pronoun\",");
w("  P: \"Preposition\",");
w("  C: \"Conjunction\",");
w("  D: \"Adverb\",");
w("  T: \"Article\",");
w("  I: \"Interjection\",");
w("  F: \"Particle\",");
w("  NUM: \"Numeral\",");
w("};");
w();

// Write parser functions
w("// \u2550".repeat(35));
w("// MORPHOLOGY CODE PARSER");
w("// \u2550".repeat(35));
w();
w("function parseGreekMorphCode(code) {");
w("  const upper = code.toUpperCase().replace(/\\s+/g, \"\");");
w("  const result = { tipo: \"\", label: \"\" };");
w("  result.codigo = code;");
w("  result.idioma = \"grego\";");
w();
w("  const dashIdx = upper.indexOf(\"-\");");
w("  let posCode = \"\";");
w("  let rest = upper;");
w("  if (dashIdx === -1) {");
w("    if (/^[VIPACDRTF]$/.test(upper[0])) {");
w("      posCode = upper[0];");
w("      rest = upper.slice(1);");
w("    }");
w("  } else {");
w("    posCode = upper.slice(0, dashIdx);");
w("    rest = upper.slice(dashIdx + 1);");
w("  }");
w();
w("  result.tipo = GREEK_PARTS_OF_SPEECH[posCode] || posCode;");
w();
w("  if (posCode === \"V\" || posCode.startsWith(\"V\")) {");
w("    return parseGreekVerbCode(rest, result);");
w("  }");
w("  if (posCode === \"N\" || posCode.startsWith(\"N\")) {");
w("    return parseGreekNounCode(rest, result);");
w("  }");
w("  if (posCode === \"A\") {");
w("    return parseGreekAdjCode(rest, result);");
w("  }");
w("  if (posCode === \"T\") {");
w("    result.tipo = \"Article\";");
w("    return parseGreekNounCode(rest, result);");
w("  }");
w();
w("  result.label = code;");
w("  return result;");
w("}");
w();
w("function parseGreekVerbCode(code, result) {");
w("  result.tipo = \"Verb\";");
w();
w("  let tenseCode = \"\";");
w("  let voiceMood = code;");
w();
w("  if (code.startsWith(\"2A\")) {");
w("    tenseCode = \"2A\";");
w("    voiceMood = code.slice(2);");
w("  } else if (code.startsWith(\"2\")) {");
w("    const second = code[1];");
w("    if (\"AFRP\".includes(second)) {");
w("      tenseCode = \"2\" + second;");
w("      voiceMood = code.slice(2);");
w("    } else {");
w("      tenseCode = code[0];");
w("      voiceMood = code.slice(1);");
w("    }");
w("  } else if (code.length >= 1) {");
w("    tenseCode = code[0];");
w("    voiceMood = code.slice(1);");
w("  }");
w();
w("  result.tempo = GREEK_TENSES[tenseCode] || tenseCode;");
w();
w("  if (voiceMood.length >= 1) {");
w("    const voiceCode = voiceMood[0];");
w("    result.voz = GREEK_VOICES[voiceCode] || voiceCode;");
w("    voiceMood = voiceMood.slice(1);");
w("  }");
w();
w("  if (voiceMood.length >= 1) {");
w("    const moodCode = voiceMood[0];");
w("    result.modo = GREEK_MOODS[moodCode] || moodCode;");
w("    voiceMood = voiceMood.slice(1);");
w("  }");
w();
w("  if (voiceMood.length > 0) {");
w("    if (result.modo === \"Participle\") {");
w("      const genderCase = voiceMood;");
w("      if (genderCase.length >= 1) result.genero = GREEK_GENDERS[genderCase[0]] || genderCase[0];");
w("      if (genderCase.length >= 2) result.caso = GREEK_CASES[genderCase[1]] || genderCase[1];");
w("    } else if (result.modo !== \"Infinitive\") {");
w("      const personNumber = voiceMood;");
w("      if (personNumber.length >= 1) result.pessoa = GREEK_PERSONS[personNumber[0]] || personNumber[0];");
w("      if (personNumber.length >= 2) result.numero = GREEK_NUMBERS[personNumber[1]] || personNumber[1];");
w("    }");
w("  }");
w();
w("  result.label = formatGreekVerbLabel(result);");
w("  return result;");
w("}");
w();
w("function parseGreekNounCode(code, result) {");
w("  if (!result.tipo || result.tipo === \"\") result.tipo = \"Noun\";");
w();
w("  if (code.length >= 1) result.caso = GREEK_CASES[code[0]] || code[0];");
w("  if (code.length >= 2) result.numero = GREEK_NUMBERS[code[1]] || code[1];");
w("  if (code.length >= 3) result.genero = GREEK_GENDERS[code[2]] || code[2];");
w("  if (code.length >= 4) {");
w("    const decl = code.slice(3);");
w("    result.conjugacao = GREEK_DECLENSIONS[decl] || `Declension ${decl}`;");
w("  }");
w();
w("  result.label = formatGreekNounLabel(result);");
w("  return result;");
w("}");
w();
w("function parseGreekAdjCode(code, result) {");
w("  result.tipo = \"Adjective\";");
w();
w("  if (code.length >= 1 && GREEK_CASES[code[0]]) {");
w("    if (code.length >= 1) result.caso = GREEK_CASES[code[0]];");
w("    if (code.length >= 2) result.numero = GREEK_NUMBERS[code[1]] || code[1];");
w("    if (code.length >= 3) result.genero = GREEK_GENDERS[code[2]] || code[2];");
w("  } else {");
w("    result.classe = code;");
w("  }");
w();
w("  result.label = formatGreekNounLabel(result);");
w("  return result;");
w("}");
w();
w("function formatGreekVerbLabel(r) {");
w("  const parts = [];");
w("  if (r.tempo) parts.push(r.tempo);");
w("  if (r.voz) parts.push(`${r.voz} Voice`);");
w("  if (r.modo) parts.push(r.modo);");
w("  if (r.modo === \"Participle\") {");
w("    if (r.genero) parts.push(r.genero);");
w("    if (r.caso) parts.push(r.caso);");
w("    if (r.numero) parts.push(r.numero);");
w("  } else if (r.modo !== \"Infinitive\") {");
w("    if (r.pessoa && r.numero) parts.push(`${r.pessoa} ${r.numero}`);");
w("  }");
w("  return parts.join(\", \") || r.codigo || \"Verb\";");
w("}");
w();
w("function formatGreekNounLabel(r) {");
w("  const parts = [];");
w("  parts.push(r.tipo || \"Noun\");");
w("  if (r.caso) parts.push(r.caso);");
w("  if (r.numero) parts.push(r.numero);");
w("  if (r.genero) parts.push(r.genero);");
w("  if (r.conjugacao) parts.push(r.conjugacao);");
w("  return parts.join(\", \") || r.codigo || \"Noun\";");
w("}");
w();

// Hebrew parsers
w("// \u2550".repeat(35));
w("// HEBREW MORPHOLOGY CODE PARSER");
w("// \u2550".repeat(35));
w();
w("function parseHebrewMorphCode(code) {");
w("  const upper = code.toUpperCase().replace(/\\s+/g, \"\");");
w("  const result = { tipo: \"\", label: \"\" };");
w("  result.codigo = code;");
w("  result.idioma = \"hebraico\";");
w();
w("  const parts = code.split(\"-\");");
w("  if (parts.length === 0) return result;");
w();
w("  const posCode = parts[0].toUpperCase();");
w("  result.tipo = HEBREW_PARTS_OF_SPEECH[posCode] || posCode;");
w();
w("  if (posCode === \"V\") return parseHebrewVerbCode(parts.slice(1), result);");
w("  if (posCode === \"N\") return parseHebrewNounCode(parts.slice(1), result);");
w("  if (posCode === \"A\") { result.tipo = \"Adjective\"; return parseHebrewNounCode(parts.slice(1), result); }");
w();
w("  result.label = code;");
w("  return result;");
w("}");
w();
w("function parseHebrewVerbCode(parts: string[], result: MorfologiaEstruturada) {");
w("  result.tipo = \"Verb\";");
w("  if (parts.length >= 1) { const s = parts[0].toUpperCase(); result.stem = HEBREW_STEMS[s] || parts[0]; }");
w("  if (parts.length >= 2) { const t = parts[1].toUpperCase(); result.tempo = HEBREW_TENSES[t] || parts[1]; }");
w("  if (parts.length >= 3) { const p = parts[2][0]?.toUpperCase(); if (p && HEBREW_PERSONS[p]) result.pessoa = HEBREW_PERSONS[p]; }");
w("  if (parts.length >= 3 && parts[2].length >= 2) { const n = parts[2][1]?.toUpperCase(); if (n && HEBREW_NUMBERS[n]) result.numero = HEBREW_NUMBERS[n]; }");
w("  if (parts.length >= 4) { const g = parts[3][0]?.toUpperCase(); if (g && HEBREW_GENDERS[g]) result.genero = HEBREW_GENDERS[g]; }");
w("  if (parts.length >= 5) { const st = parts[4][0]?.toUpperCase(); if (st && HEBREW_STATES[st]) result.estado = HEBREW_STATES[st]; }");
w("  result.label = formatHebrewVerbLabel(result);");
w("  return result;");
w("}");
w();
w("function parseHebrewNounCode(parts: string[], result: MorfologiaEstruturada) {");
w("  if (!result.tipo || result.tipo === \"\") result.tipo = \"Noun\";");
w("  if (parts.length >= 1) { const s = parts[0][0]?.toUpperCase(); if (s && HEBREW_STATES[s]) result.estado = HEBREW_STATES[s]; }");
w("  if (parts.length >= 2) { const g = parts[1][0]?.toUpperCase(); if (g && HEBREW_GENDERS[g]) result.genero = HEBREW_GENDERS[g]; }");
w("  if (parts.length >= 3) { const n = parts[2][0]?.toUpperCase(); if (n && HEBREW_NUMBERS[n]) result.numero = HEBREW_NUMBERS[n]; }");
w("  result.label = formatHebrewNounLabel(result);");
w("  return result;");
w("}");
w();
w("function formatHebrewVerbLabel(r) {");
w("  const parts = [];");
w("  if (r.stem) parts.push(r.stem);");
w("  if (r.tempo) parts.push(r.tempo);");
w("  if (r.pessoa && r.numero) parts.push(`${r.pessoa} ${r.numero}`);");
w("  if (r.genero) parts.push(r.genero);");
w("  if (r.estado) parts.push(`State: ${r.estado}`);");
w("  return parts.join(\", \") || r.codigo || \"Verb\";");
w("}");
w();
w("function formatHebrewNounLabel(r) {");
w("  const parts = [];");
w("  parts.push(r.tipo || \"Noun\");");
w("  if (r.estado) parts.push(r.estado);");
w("  if (r.genero) parts.push(r.genero);");
w("  if (r.numero) parts.push(r.numero);");
w("  return parts.join(\", \") || r.codigo || \"Noun\";");
w("}");
w();

// Greek verb form parser
w("// \u2550".repeat(35));
w("// GREEK VERB FORM PARSER (from actual Greek text)");
w("// \u2550".repeat(35));
w();
w("type EndingEntry = { [ending] };");
w();
w("function stripDiacritics(s) {");
w("  return s.toLowerCase()");
w("    .replace(/[\u0300-\u036f]/g, \"\")");
w("    .replace(/[\u03B1\u1F00-\u1F0F]/g, \"\u03B1\")");
w("    .replace(/[\u03B5\u1F10-\u1F17]/g, \"\u03B5\")");
w("    .replace(/[\u03B7\u1F20-\u1F27]/g, \"\u03B7\")");
w("    .replace(/[\u03B9\u1F30-\u1F37]/g, \"\u03B9\")");
w("    .replace(/[\u03BF\u1F40-\u1F47]/g, \"\u03BF\")");
w("    .replace(/[\u03C5\u1F50-\u1F57]/g, \"\u03C5\")");
w("    .replace(/[\u03C9\u1F60-\u1F67]/g, \"\u03C9\")");
w("    .replace(/[\u1FB0-\u1FB4]/g, \"\u03B1\")");
w("    .replace(/[\u1FB6-\u1FB7]/g, \"\u03B1\")");
w("    .replace(/[\u1FC0-\u1FC4]/g, \"\u03B7\")");
w("    .replace(/[\u1FC6-\u1FC7]/g, \"\u03B7\")");
w("    .replace(/[\u1FD0-\u1FD4]/g, \"\u03B9\")");
w("    .replace(/[\u1FD6-\u1FD7]/g, \"\u03B9\")");
w("    .replace(/[\u1FE0-\u1FE4]/g, \"\u03C5\")");
w("    .replace(/[\u1FE6-\u1FE7]/g, \"\u03C5\")");
w("    .replace(/[\u1FF0-\u1FF4]/g, \"\u03C9\")");
w("    .replace(/[\u1FF6-\u1FF7]/g, \"\u03C9\")");
w("    .replace(/\u03C2/g, \"\u03C3\");");
w("}");
w();

// Build Greek endings map programmatically
w("const GREEK_ENDINGS: Record<string, EndingEntry> = {");
// Present Active Indicative
w("  \"present_active_indicative\": {");
for (const [ending, label] of [
  ["\u03C9", "Present Active Indicative 1st Singular"],
  ["\u03B5\u03B9\u03C2", "Present Active Indicative 2nd Singular"],
  ["\u03B5\u03B9", "Present Active Indicative 3rd Singular"],
  ["\u03BF\u03BC\u03B5\u03BD", "Present Active Indicative 1st Plural"],
  ["\u03B5\u03C4\u03B5", "Present Active Indicative 2nd Plural"],
  ["\u03BF\u03C5\u03C3\u03B9\u03BD", "Present Active Indicative 3rd Plural"],
]) {
  w(`    "${ending}": { tipo: "Verb", tempo: "Present", voz: "Active", modo: "Indicative", pessoa: "${label.includes("1st") ? "1st" : label.includes("2nd") ? "2nd" : "3rd"}", numero: "${label.includes("Plural") ? "Plural" : "Singular"}", label: "${label}" },`);
}
w("  },");
// Imperfect Active Indicative
w("  \"imperfect_active_indicative\": {");
for (const [ending, label] of [
  ["\u03BF\u03BD", "Imperfect Active Indicative 1st Singular"],
  ["\u03B5\u03C2", "Imperfect Active Indicative 2nd Singular"],
  ["\u03B5\u03BD", "Imperfect Active Indicative 3rd Singular"],
  ["\u03BF\u03BC\u03B5\u03BD", "Imperfect Active Indicative 1st Plural"],
  ["\u03B5\u03C4\u03B5", "Imperfect Active Indicative 2nd Plural"],
]) {
  w(`    "${ending}": { tipo: "Verb", tempo: "Imperfect", voz: "Active", modo: "Indicative", pessoa: "${label.includes("1st") ? "1st" : label.includes("2nd") ? "2nd" : "3rd"}", numero: "${label.includes("Plural") ? "Plural" : "Singular"}", label: "${label}" },`);
}
w("  },");
// Aorist Active Indicative
w("  \"aorist_active_indicative\": {");
for (const [ending, label] of [
  ["\u03B1", "Aorist Active Indicative 1st Singular"],
  ["\u03B1\u03C2", "Aorist Active Indicative 2nd Singular"],
  ["\u03B5\u03BD", "Aorist Active Indicative 3rd Singular"],
  ["\u03B1\u03BC\u03B5\u03BD", "Aorist Active Indicative 1st Plural"],
  ["\u03B1\u03C4\u03B5", "Aorist Active Indicative 2nd Plural"],
  ["\u03B1\u03BD", "Aorist Active Indicative 3rd Plural"],
]) {
  w(`    "${ending}": { tipo: "Verb", tempo: "Aorist", voz: "Active", modo: "Indicative", pessoa: "${label.includes("1st") ? "1st" : label.includes("2nd") ? "2nd" : "3rd"}", numero: "${label.includes("Plural") ? "Plural" : "Singular"}", label: "${label}" },`);
}
w("  },");
// Future Active Indicative
w("  \"future_active_indicative\": {");
for (const [ending, label] of [
  ["\u03C9", "Future Active Indicative 1st Singular"],
  ["\u03B5\u03B9\u03C2", "Future Active Indicative 2nd Singular"],
  ["\u03B5\u03B9", "Future Active Indicative 3rd Singular"],
  ["\u03BF\u03BC\u03B5\u03BD", "Future Active Indicative 1st Plural"],
  ["\u03B5\u03C4\u03B5", "Future Active Indicative 2nd Plural"],
  ["\u03BF\u03C5\u03C3\u03B9\u03BD", "Future Active Indicative 3rd Plural"],
]) {
  w(`    "${ending}": { tipo: "Verb", tempo: "Future", voz: "Active", modo: "Indicative", pessoa: "${label.includes("1st") ? "1st" : label.includes("2nd") ? "2nd" : "3rd"}", numero: "${label.includes("Plural") ? "Plural" : "Singular"}", label: "${label}" },`);
}
w("  },");
// Perfect Active Indicative
w("  \"perfect_active_indicative\": {");
for (const [ending, label] of [
  ["\u03B1", "Perfect Active Indicative 1st Singular"],
  ["\u03B1\u03C2", "Perfect Active Indicative 2nd Singular"],
  ["\u03B5\u03BD", "Perfect Active Indicative 3rd Singular"],
  ["\u03B1\u03BC\u03B5\u03BD", "Perfect Active Indicative 1st Plural"],
  ["\u03B1\u03C4\u03B5", "Perfect Active Indicative 2nd Plural"],
  ["\u03B1\u03C3\u03B9\u03BD", "Perfect Active Indicative 3rd Plural"],
]) {
  w(`    "${ending}": { tipo: "Verb", tempo: "Perfect", voz: "Active", modo: "Indicative", pessoa: "${label.includes("1st") ? "1st" : label.includes("2nd") ? "2nd" : "3rd"}", numero: "${label.includes("Plural") ? "Plural" : "Singular"}", label: "${label}" },`);
}
w("  },");
// Present Middle/Passive Indicative
w("  \"present_middle_passive_indicative\": {");
for (const [ending, label] of [
  ["\u03BF\u03BC\u03B1\u03B9", "Present Middle/Passive Indicative 1st Singular"],
  ["\u03B7", "Present Middle/Passive Indicative 2nd Singular"],
  ["\u03B5\u03C4\u03B1\u03B9", "Present Middle/Passive Indicative 3rd Singular"],
  ["\u03BF\u03BC\u03B5\u03B8\u03B1", "Present Middle/Passive Indicative 1st Plural"],
  ["\u03B5\u03C3\u03B8\u03B5", "Present Middle/Passive Indicative 2nd Plural"],
  ["\u03BF\u03BD\u03C4\u03B1\u03B9", "Present Middle/Passive Indicative 3rd Plural"],
]) {
  w(`    "${ending}": { tipo: "Verb", tempo: "Present", voz: "Middle/Passive", modo: "Indicative", pessoa: "${label.includes("1st") ? "1st" : label.includes("2nd") ? "2nd" : "3rd"}", numero: "${label.includes("Plural") ? "Plural" : "Singular"}", label: "${label}" },`);
}
w("  },");
// Aorist Passive Indicative
w("  \"aorist_passive_indicative\": {");
for (const [ending, label] of [
  ["\u03B8\u03B7\u03BD", "Aorist Passive Indicative 1st Singular"],
  ["\u03B8\u03B7\u03C2", "Aorist Passive Indicative 2nd Singular"],
  ["\u03B8\u03B7", "Aorist Passive Indicative 3rd Singular"],
  ["\u03B8\u03B7\u03BC\u03B5\u03BD", "Aorist Passive Indicative 1st Plural"],
  ["\u03B8\u03B7\u03C4\u03B5", "Aorist Passive Indicative 2nd Plural"],
  ["\u03B8\u03B7\u03C3\u03B1\u03BD", "Aorist Passive Indicative 3rd Plural"],
]) {
  w(`    "${ending}": { tipo: "Verb", tempo: "Aorist", voz: "Passive", modo: "Indicative", pessoa: "${label.includes("1st") ? "1st" : label.includes("2nd") ? "2nd" : "3rd"}", numero: "${label.includes("Plural") ? "Plural" : "Singular"}", label: "${label}" },`);
}
w("  },");
// Imperfect Middle/Passive Indicative
w("  \"imperfect_middle_passive_indicative\": {");
for (const [ending, label] of [
  ["\u03BF\u03BC\u03B7\u03BD", "Imperfect Middle/Passive Indicative 1st Singular"],
  ["\u03BF\u03C5", "Imperfect Middle/Passive Indicative 2nd Singular"],
  ["\u03B5\u03C4\u03BF", "Imperfect Middle/Passive Indicative 3rd Singular"],
  ["\u03BF\u03BC\u03B5\u03B8\u03B1", "Imperfect Middle/Passive Indicative 1st Plural"],
  ["\u03B5\u03C3\u03B8\u03B5", "Imperfect Middle/Passive Indicative 2nd Plural"],
  ["\u03BF\u03BD\u03C4\u03BF", "Imperfect Middle/Passive Indicative 3rd Plural"],
]) {
  w(`    "${ending}": { tipo: "Verb", tempo: "Imperfect", voz: "Middle/Passive", modo: "Indicative", pessoa: "${label.includes("1st") ? "1st" : label.includes("2nd") ? "2nd" : "3rd"}", numero: "${label.includes("Plural") ? "Plural" : "Singular"}", label: "${label}" },`);
}
w("  },");
// Present Active Subjunctive
w("  \"present_active_subjunctive\": {");
for (const [ending, label] of [
  ["\u03C9", "Present Active Subjunctive 1st Singular"],
  ["\u03B7\u03C2", "Present Active Subjunctive 2nd Singular"],
  ["\u03B7", "Present Active Subjunctive 3rd Singular"],
  ["\u03C9\u03BC\u03B5\u03BD", "Present Active Subjunctive 1st Plural"],
  ["\u03B7\u03C4\u03B5", "Present Active Subjunctive 2nd Plural"],
  ["\u03C9\u03C3\u03B9\u03BD", "Present Active Subjunctive 3rd Plural"],
]) {
  w(`    "${ending}": { tipo: "Verb", tempo: "Present", voz: "Active", modo: "Subjunctive", pessoa: "${label.includes("1st") ? "1st" : label.includes("2nd") ? "2nd" : "3rd"}", numero: "${label.includes("Plural") ? "Plural" : "Singular"}", label: "${label}" },`);
}
w("  },");
// Aorist Active Subjunctive
w("  \"aorist_active_subjunctive\": {");
for (const [ending, label] of [
  ["\u03C9", "Aorist Active Subjunctive 1st Singular"],
  ["\u03B7\u03C2", "Aorist Active Subjunctive 2nd Singular"],
  ["\u03B7", "Aorist Active Subjunctive 3rd Singular"],
  ["\u03C9\u03BC\u03B5\u03BD", "Aorist Active Subjunctive 1st Plural"],
  ["\u03B7\u03C4\u03B5", "Aorist Active Subjunctive 2nd Plural"],
  ["\u03C9\u03C3\u03B9\u03BD", "Aorist Active Subjunctive 3rd Plural"],
]) {
  w(`    "${ending}": { tipo: "Verb", tempo: "Aorist", voz: "Active", modo: "Subjunctive", pessoa: "${label.includes("1st") ? "1st" : label.includes("2nd") ? "2nd" : "3rd"}", numero: "${label.includes("Plural") ? "Plural" : "Singular"}", label: "${label}" },`);
}
w("  },");
// Present Active Imperative
w("  \"present_active_imperative\": {");
for (const [ending, label] of [
  ["\u03B5", "Present Active Imperative 2nd Singular"],
  ["\u03B5\u03C4\u03C9", "Present Active Imperative 3rd Singular"],
  ["\u03B5\u03C4\u03B5", "Present Active Imperative 2nd Plural"],
  ["\u03B5\u03C4\u03C9\u03C3\u03B1\u03BD", "Present Active Imperative 3rd Plural"],
]) {
  w(`    "${ending}": { tipo: "Verb", tempo: "Present", voz: "Active", modo: "Imperative", pessoa: "${label.includes("2nd") ? "2nd" : "3rd"}", numero: "${label.includes("Plural") ? "Plural" : "Singular"}", label: "${label}" },`);
}
w("  },");
// Aorist Active Imperative
w("  \"aorist_active_imperative\": {");
for (const [ending, label] of [
  ["\u03BF\u03BD", "Aorist Active Imperative 2nd Singular"],
  ["\u03B1\u03C4\u03C9", "Aorist Active Imperative 3rd Singular"],
  ["\u03B1\u03C4\u03B5", "Aorist Active Imperative 2nd Plural"],
  ["\u03B1\u03C4\u03C9\u03C3\u03B1\u03BD", "Aorist Active Imperative 3rd Plural"],
]) {
  w(`    "${ending}": { tipo: "Verb", tempo: "Aorist", voz: "Active", modo: "Imperative", pessoa: "${label.includes("2nd") ? "2nd" : "3rd"}", numero: "${label.includes("Plural") ? "Plural" : "Singular"}", label: "${label}" },`);
}
w("  },");
// Infinitives
w("  \"present_active_infinitive\": {");
w(`    "\u03B5\u03B9\u03BD": { tipo: "Verb", tempo: "Present", voz: "Active", modo: "Infinitive", label: "Present Active Infinitive" },`);
w("  },");
w("  \"aorist_active_infinitive\": {");
w(`    "\u03B1\u03B9": { tipo: "Verb", tempo: "Aorist", voz: "Active", modo: "Infinitive", label: "Aorist Active Infinitive" },`);
w("  },");
w("  \"present_middle_passive_infinitive\": {");
w(`    "\u03B5\u03C3\u03B8\u03B1\u03B9": { tipo: "Verb", tempo: "Present", voz: "Middle/Passive", modo: "Infinitive", label: "Present Middle/Passive Infinitive" },`);
w("  },");
w("  \"aorist_middle_infinitive\": {");
w(`    "\u03B1\u03C3\u03B8\u03B1\u03B9": { tipo: "Verb", tempo: "Aorist", voz: "Middle", modo: "Infinitive", label: "Aorist Middle Infinitive" },`);
w("  },");
w("  \"aorist_passive_infinitive\": {");
w(`    "\u03B8\u03B7\u03BD\u03B1\u03B9": { tipo: "Verb", tempo: "Aorist", voz: "Passive", modo: "Infinitive", label: "Aorist Passive Infinitive" },`);
w("  },");
// Present Active Participle
w("  \"present_active_participle\": {");
for (const [ending, label, gender, case_, number] of [
  ["\u03C9\u03BD", "Present Active Participle Masc Nom Sg", "Masculine", "Nominative", "Singular"],
  ["\u03BF\u03BD\u03C4\u03BF\u03C2", "Present Active Participle Masc Gen Sg", "Masculine", "Genitive", "Singular"],
  ["\u03BF\u03BD\u03C4\u03B9", "Present Active Participle Masc Dat Sg", "Masculine", "Dative", "Singular"],
  ["\u03BF\u03BD\u03C4\u03B1", "Present Active Participle Masc Acc Sg", "Masculine", "Accusative", "Singular"],
  ["\u03BF\u03BD\u03C4\u03B5\u03C2", "Present Active Participle Masc Nom Pl", "Masculine", "Nominative", "Plural"],
  ["\u03BF\u03BD\u03C4\u03C9\u03BD", "Present Active Participle Masc Gen Pl", "Masculine", "Genitive", "Plural"],
  ["\u03BF\u03C5\u03C3\u03B1", "Present Active Participle Fem Nom Sg", "Feminine", "Nominative", "Singular"],
  ["\u03BF\u03C5\u03C3\u03B7\u03C2", "Present Active Participle Fem Gen Sg", "Feminine", "Genitive", "Singular"],
  ["\u03BF\u03C5\u03C3\u03B7", "Present Active Participle Fem Dat Sg", "Feminine", "Dative", "Singular"],
  ["\u03BF\u03C5\u03C3\u03B1\u03BD", "Present Active Participle Fem Acc Sg", "Feminine", "Accusative", "Singular"],
  ["\u03BF\u03C5\u03C3\u03B1\u03B9", "Present Active Participle Fem Nom Pl", "Feminine", "Nominative", "Plural"],
  ["\u03BF\u03C5\u03C3\u03C9\u03BD", "Present Active Participle Fem Gen Pl", "Feminine", "Genitive", "Plural"],
  ["\u03BF\u03BD", "Present Active Participle Neut Nom Sg", "Neuter", "Nominative", "Singular"],
  ["\u03BF\u03BD\u03C4\u03B1", "Present Active Participle Neut Acc Sg", "Neuter", "Accusative", "Singular"],
]) {
  w(`    "${ending}": { tipo: "Verb", tempo: "Present", voz: "Active", modo: "Participle", genero: "${gender}", caso: "${case_}", numero: "${number}", label: "${label}" },`);
}
w("  },");
// Aorist Active Participle
w("  \"aorist_active_participle\": {");
for (const [ending, label, gender, case_, number] of [
  ["\u03B1\u03C2", "Aorist Active Participle Masc Nom Sg", "Masculine", "Nominative", "Singular"],
  ["\u03B1\u03BD\u03C4\u03BF\u03C2", "Aorist Active Participle Masc Gen Sg", "Masculine", "Genitive", "Singular"],
  ["\u03B1\u03BD\u03C4\u03B9", "Aorist Active Participle Masc Dat Sg", "Masculine", "Dative", "Singular"],
  ["\u03B1\u03BD\u03C4\u03B1", "Aorist Active Participle Masc Acc Sg", "Masculine", "Accusative", "Singular"],
  ["\u03B1\u03BD\u03C4\u03B5\u03C2", "Aorist Active Participle Masc Nom Pl", "Masculine", "Nominative", "Plural"],
  ["\u03B1\u03C3\u03B1", "Aorist Active Participle Fem Nom Sg", "Feminine", "Nominative", "Singular"],
  ["\u03B1\u03BD", "Aorist Active Participle Neut Nom Sg", "Neuter", "Nominative", "Singular"],
]) {
  w(`    "${ending}": { tipo: "Verb", tempo: "Aorist", voz: "Active", modo: "Participle", genero: "${gender}", caso: "${case_}", numero: "${number}", label: "${label}" },`);
}
w("  },");
w("};");
w();

// Greek noun endings
w("// \u2550".repeat(35));
w("// GREEK NOUN FORM PARSER (from actual Greek text)");
w("// \u2550".repeat(35));
w();
w("const GREEK_NOUN_ENDINGS: Record<string, MorfologiaEstruturada> = {");
for (const [ending, caso, numero, genero, label] of [
  ["\u03B7", "Nominative", "Singular", "Feminine", "1st Declension Nom Sg Fem"],
  ["\u03B7\u03C2", "Genitive", "Singular", "Feminine", "1st Declension Gen Sg Fem"],
  ["\u03B7\u03BD", "Accusative", "Singular", "Feminine", "1st Declension Acc Sg Fem"],
  ["\u03B1\u03B9", "Nominative", "Plural", "Feminine", "1st Declension Nom Pl Fem"],
  ["\u03C9\u03BD", "Genitive", "Plural", "Feminine", "1st Declension Gen Pl Fem"],
  ["\u03B1\u03B9\u03C2", "Dative", "Plural", "Feminine", "1st Declension Dat Pl Fem"],
  ["\u03BF\u03C2", "Nominative", "Singular", "Masculine", "2nd Declension Nom Sg Masc"],
  ["\u03BF\u03C5", "Genitive", "Singular", "Masculine", "2nd Declension Gen Sg Masc"],
  ["\u03BF\u03BD", "Accusative", "Singular", "Masculine", "2nd Declension Acc Sg Masc"],
  ["\u03B5", "Vocative", "Singular", "Masculine", "2nd Declension Voc Sg Masc"],
  ["\u03BF\u03B9", "Nominative", "Plural", "Masculine", "2nd Declension Nom Pl Masc"],
  ["\u03BF\u03B9\u03C2", "Dative", "Plural", "Masculine", "2nd Declension Dat Pl Masc"],
  ["\u03BF\u03C5\u03C2", "Accusative", "Plural", "Masculine", "2nd Declension Acc Pl Masc"],
]) {
  w(`  "${ending}": { tipo: "Noun", caso: "${caso}", numero: "${numero}", genero: "${genero}", label: "${label}" },`);
}
w("};");
w();

// Hebrew verb suffixes
w("// \u2550".repeat(35));
w("// HEBREW VERB FORM PARSER");
w("// \u2550".repeat(35));
w();
w("interface HebrewVerbPattern { suffix; result; }");
w();
w("const HEBREW_VERB_SUFFIXES: HebrewVerbPattern[] = [");
w("  { suffix: \"\u05EA\u05B4\u05B0\", result: { tipo: \"Verb\", stem: \"Qal\", tempo: \"Perfect\", pessoa: \"1st\", numero: \"Singular\", genero: \"Common\", label: \"Qal Perfect 1st Sg\" } },");
w("  { suffix: \"\u05EA\u05B8\u05BC\", result: { tipo: \"Verb\", stem: \"Qal\", tempo: \"Perfect\", pessoa: \"2nd\", numero: \"Singular\", genero: \"Masculine\", label: \"Qal Perfect 2nd Sg Masc\" } },");
w("  { suffix: \"\u05EA\u05B6\u05BC\", result: { tipo: \"Verb\", stem: \"Qal\", tempo: \"Perfect\", pessoa: \"2nd\", numero: \"Singular\", genero: \"Feminine\", label: \"Qal Perfect 2nd Sg Fem\" } },");
w("  { suffix: \"\u05D4\", result: { tipo: \"Verb\", stem: \"Qal\", tempo: \"Perfect\", pessoa: \"3rd\", numero: \"Singular\", genero: \"Masculine\", label: \"Qal Perfect 3rd Sg Masc\" } },");
w("  { suffix: \"\u05D4\u05B8\", result: { tipo: \"Verb\", stem: \"Qal\", tempo: \"Perfect\", pessoa: \"3rd\", numero: \"Singular\", genero: \"Feminine\", label: \"Qal Perfect 3rd Sg Fem\" } },");
w("  { suffix: \"\u05E0\u05D5\u05D0\", result: { tipo: \"Verb\", stem: \"Qal\", tempo: \"Perfect\", pessoa: \"1st\", numero: \"Plural\", genero: \"Common\", label: \"Qal Perfect 1st Pl\" } },");
w("  { suffix: \"\u05EA\u05B6\u05DD\", result: { tipo: \"Verb\", stem: \"Qal\", tempo: \"Perfect\", pessoa: \"2nd\", numero: \"Plural\", genero: \"Masculine\", label: \"Qal Perfect 2nd Pl Masc\" } },");
w("  { suffix: \"\u05EA\u05B6\u05DF\", result: { tipo: \"Verb\", stem: \"Qal\", tempo: \"Perfect\", pessoa: \"2nd\", numero: \"Plural\", genero: \"Feminine\", label: \"Qal Perfect 2nd Pl Fem\" } },");
w("  { suffix: \"\u05D5\u05D0\", result: { tipo: \"Verb\", stem: \"Qal\", tempo: \"Perfect\", pessoa: \"3rd\", numero: \"Plural\", genero: \"Masculine\", label: \"Qal Perfect 3rd Pl Masc\" } },");
w("  { suffix: \"\u05D9\u05DD\", result: { tipo: \"Verb\", stem: \"Qal\", tempo: \"Participle\", genero: \"Masculine\", numero: \"Plural\", label: \"Qal Participle Masc Pl\" } },");
w("  { suffix: \"\u05D4\", result: { tipo: \"Verb\", stem: \"Qal\", tempo: \"Participle\", genero: \"Feminine\", numero: \"Singular\", label: \"Qal Participle Fem Sg\" } },");
w("];");
w();

// Paradigm tables
w("// \u2550".repeat(35));
w("// FULL PARADIGM TABLES");
w("// \u2550".repeat(35));
w();
w("export interface ParadigmCell {");
w("  person?;");
w("  number?;");
w("  gender?;");
w("  case_?;");
w("  form;");
w("  transliteration;");
w("  morphology;");
w("}");
w();
w("export interface ParadigmTable {");
w("  name;");
w("  description;");
w("  rows: ParadigmCell[];");
w("}");
w();

// LYO paradigm
w("const LYO_PARADIGM: ParadigmTable = {");
w("  name: \"\u03BB\u03CD\u03C9 \u2014 Regular 1st Conjugation (\\\"I loose\\\")\",");
w("  description: \"Regular omega verb with -\u03C9 ending. The paradigm verb for Greek verb study.\",");
w("  rows: [");
const lyoForms = [
  ["V-PAI-1S", "\u03BB\u03CD\u03C9", "ly\u014D", "1st", "Singular", undefined],
  ["V-PAI-2S", "\u03BB\u03CD\u03B5\u03B9\u03C2", "lyeis", "2nd", "Singular", undefined],
  ["V-PAI-3S", "\u03BB\u03CD\u03B5\u03B9", "lyei", "3rd", "Singular", undefined],
  ["V-PAI-1P", "\u03BB\u03CD\u03BF\u03BC\u03B5\u03BD", "lyomen", "1st", "Plural", undefined],
  ["V-PAI-2P", "\u03BB\u03CD\u03B5\u03C4\u03B5", "lyete", "2nd", "Plural", undefined],
  ["V-PAI-3P", "\u03BB\u03CD\u03BF\u03C5\u03C3\u03B9(\u03BD)", "lyousi(n)", "3rd", "Plural", undefined],
  ["V-IAI-1S", "\u1F10\u03BB\u03C5\u03BF\u03BD", "elyon", "1st", "Singular", undefined],
  ["V-IAI-2S", "\u1F10\u03BB\u03C5\u03B5\u03C2", "elyes", "2nd", "Singular", undefined],
  ["V-IAI-3S", "\u1F10\u03BB\u03C5\u03B5(\u03BD)", "elye(n)", "3rd", "Singular", undefined],
  ["V-IAI-1P", "\u1F10\u03BB\u03CD\u03BF\u03BC\u03B5\u03BD", "elyomen", "1st", "Plural", undefined],
  ["V-IAI-2P", "\u1F10\u03BB\u03CD\u03B5\u03C4\u03B5", "elyete", "2nd", "Plural", undefined],
  ["V-IAI-3P", "\u1F10\u03BB\u03C5\u03BF\u03BD", "elyon", "3rd", "Plural", undefined],
  ["V-FAI-1S", "\u03BB\u03CD\u03C3\u03C9", "lys\u014D", "1st", "Singular", undefined],
  ["V-FAI-2S", "\u03BB\u03CD\u03C3\u03B5\u03B9\u03C2", "lyseis", "2nd", "Singular", undefined],
  ["V-FAI-3S", "\u03BB\u03CD\u03C3\u03B5\u03B9", "lysei", "3rd", "Singular", undefined],
  ["V-FAI-1P", "\u03BB\u03CD\u03C3\u03BF\u03BC\u03B5\u03BD", "lysome(n)", "1st", "Plural", undefined],
  ["V-FAI-2P", "\u03BB\u03CD\u03C3\u03B5\u03C4\u03B5", "lysete", "2nd", "Plural", undefined],
  ["V-FAI-3P", "\u03BB\u03CD\u03C3\u03BF\u03C5\u03C3\u03B9(\u03BD)", "lysousi(n)", "3rd", "Plural", undefined],
  ["V-AAI-1S", "\u1F10\u03BB\u03C5\u03C3\u03B1", "elysa", "1st", "Singular", undefined],
  ["V-AAI-2S", "\u1F10\u03BB\u03C5\u03C3\u03B1\u03C2", "elysas", "2nd", "Singular", undefined],
  ["V-AAI-3S", "\u1F10\u03BB\u03C5\u03C3\u03B5(\u03BD)", "elyse(n)", "3rd", "Singular", undefined],
  ["V-AAI-1P", "\u1F10\u03BB\u03CD\u03C3\u03B1\u03BC\u03B5\u03BD", "elysamen", "1st", "Plural", undefined],
  ["V-AAI-2P", "\u1F10\u03BB\u03CD\u03C3\u03B1\u03C4\u03B5", "elysate", "2nd", "Plural", undefined],
  ["V-AAI-3P", "\u1F10\u03BB\u03C5\u03C3\u03B1\u03BD", "elysan", "3rd", "Plural", undefined],
  ["V-RAI-1S", "\u03BB\u03AD\u03BB\u03C5\u03BA\u03B1", "lelyka", "1st", "Singular", undefined],
  ["V-RAI-2S", "\u03BB\u03AD\u03BB\u03C5\u03BA\u03B1\u03C2", "lelykas", "2nd", "Singular", undefined],
  ["V-RAI-3S", "\u03BB\u03AD\u03BB\u03C5\u03BA\u03B5(\u03BD)", "lelyke(n)", "3rd", "Singular", undefined],
  ["V-RAI-1P", "\u03BB\u03B5\u03BB\u03CD\u03BA\u03B1\u03BC\u03B5\u03BD", "lelykamen", "1st", "Plural", undefined],
  ["V-RAI-2P", "\u03BB\u03B5\u03BB\u03CD\u03BA\u03B1\u03C4\u03B5", "lelykate", "2nd", "Plural", undefined],
  ["V-RAI-3P", "\u03BB\u03B5\u03BB\u03CD\u03BA\u03B1\u03C3\u03B9(\u03BD)", "lelykasi(n)", "3rd", "Plural", undefined],
  ["V-LAI-1S", "\u1F10\u03BB\u03B5\u03BB\u03CD\u03BA\u03B5\u03B9\u03BD", "elelykein", "1st", "Singular", undefined],
  ["V-LAI-2S", "\u1F10\u03BB\u03B5\u03BB\u03CD\u03BA\u03B5\u03B9\u03C2", "elelykeis", "2nd", "Singular", undefined],
  ["V-LAI-3S", "\u1F10\u03BB\u03B5\u03BB\u03CD\u03BA\u03B5\u03B9", "elelykei", "3rd", "Singular", undefined],
  ["V-PMP-1S", "\u03BB\u03CD\u03BF\u03BC\u03B1\u03B9", "lyomai", "1st", "Singular", undefined],
  ["V-PMP-2S", "\u03BB\u03CD\u03B7", "ly\u0113", "2nd", "Singular", undefined],
  ["V-PMP-3S", "\u03BB\u03CD\u03B5\u03C4\u03B1\u03B9", "lyetai", "3rd", "Singular", undefined],
  ["V-PMP-1P", "\u03BB\u03C5\u03CC\u03BC\u03B5\u03B8\u03B1", "lyometha", "1st", "Plural", undefined],
  ["V-PMP-2P", "\u03BB\u03CD\u03B5\u03C3\u03B8\u03B5", "lyesthe", "2nd", "Plural", undefined],
  ["V-PMP-3P", "\u03BB\u03CD\u03BF\u03BD\u03C4\u03B1\u03B9", "lyontai", "3rd", "Plural", undefined],
  ["V-IMP-1S", "\u1F10\u03BB\u03C5\u03CC\u03BC\u03B7\u03BD", "elyom\u0113n", "1st", "Singular", undefined],
  ["V-IMP-2S", "\u1F10\u03BB\u03CD\u03BF\u03C5", "elyou", "2nd", "Singular", undefined],
  ["V-IMP-3S", "\u1F10\u03BB\u03CD\u03B5\u03C4\u03BF", "elyeto", "3rd", "Singular", undefined],
  ["V-IMP-1P", "\u1F10\u03BB\u03C5\u03CC\u03BC\u03B5\u03B8\u03B1", "elyometha", "1st", "Plural", undefined],
  ["V-IMP-2P", "\u1F10\u03BB\u03CD\u03B5\u03C3\u03B8\u03B5", "elyesthe", "2nd", "Plural", undefined],
  ["V-IMP-3P", "\u1F10\u03BB\u03CD\u03BF\u03BD\u03C4\u03BF", "elyonto", "3rd", "Plural", undefined],
  ["V-FMI-1S", "\u03BB\u03CD\u03C3\u03BF\u03BC\u03B1\u03B9", "lysomai", "1st", "Singular", undefined],
  ["V-FMI-2S", "\u03BB\u03CD\u03C3\u03B7", "lys\u0113", "2nd", "Singular", undefined],
  ["V-FMI-3S", "\u03BB\u03CD\u03C3\u03B5\u03C4\u03B1\u03B9", "lysetai", "3rd", "Singular", undefined],
  ["V-AMI-1S", "\u1F10\u03BB\u03C5\u03C3\u03AC\u03BC\u03B7\u03BD", "elysam\u0113n", "1st", "Singular", undefined],
  ["V-AMI-2S", "\u1F10\u03BB\u03CD\u03C3\u03C9", "elys\u014D", "2nd", "Singular", undefined],
  ["V-AMI-3S", "\u1F10\u03BB\u03CD\u03C3\u03B1\u03C4\u03BF", "elysato", "3rd", "Singular", undefined],
  ["V-API-1S", "\u1F10\u03BB\u03CD\u03B8\u03B7\u03BD", "elyth\u0113n", "1st", "Singular", undefined],
  ["V-API-2S", "\u1F10\u03BB\u03CD\u03B8\u03B7\u03C2", "elyth\u0113s", "2nd", "Singular", undefined],
  ["V-API-3S", "\u1F10\u03BB\u03CD\u03B8\u03B7", "elyth\u0113", "3rd", "Singular", undefined],
  ["V-API-1P", "\u1F10\u03BB\u03CD\u03B8\u03B7\u03BC\u03B5\u03BD", "elyth\u0113men", "1st", "Plural", undefined],
  ["V-API-2P", "\u1F10\u03BB\u03CD\u03B8\u03B7\u03C4\u03B5", "elyth\u0113te", "2nd", "Plural", undefined],
  ["V-API-3P", "\u1F10\u03BB\u03CD\u03B8\u03B7\u03C3\u03B1\u03BD", "elyth\u0113san", "3rd", "Plural", undefined],
  ["V-RMP-1S", "\u03BB\u03AD\u03BB\u03C5\u03BC\u03B1\u03B9", "lelymai", "1st", "Singular", undefined],
  ["V-RMP-2S", "\u03BB\u03AD\u03BB\u03C5\u03C3\u03B1\u03B9", "lelysai", "2nd", "Singular", undefined],
  ["V-RMP-3S", "\u03BB\u03AD\u03BB\u03C5\u03C4\u03B1\u03B9", "lelytai", "3rd", "Singular", undefined],
  ["V-PAS-1S", "\u03BB\u03CD\u03C9", "ly\u014D", "1st", "Singular", undefined],
  ["V-PAS-2S", "\u03BB\u03CD\u03B7\u03C2", "ly\u0113is", "2nd", "Singular", undefined],
  ["V-PAS-3S", "\u03BB\u03CD\u03B7", "ly\u0113i", "3rd", "Singular", undefined],
  ["V-AAS-1S", "\u03BB\u03CD\u03C3\u03C9", "lys\u014D", "1st", "Singular", undefined],
  ["V-AAS-2S", "\u03BB\u03CD\u03C3\u03B7\u03C2", "lys\u0113is", "2nd", "Singular", undefined],
  ["V-AAS-3S", "\u03BB\u03CD\u03C3\u03B7", "lys\u0113i", "3rd", "Singular", undefined],
  ["V-PAM-2S", "\u03BB\u03CD\u03B5", "lye", "2nd", "Singular", undefined],
  ["V-PAM-3S", "\u03BB\u03C5\u03AD\u03C4\u03C9", "lyet\u014D", "3rd", "Singular", undefined],
  ["V-AAM-2S", "\u03BB\u03CD\u03C3\u03BF\u03BD", "lyson", "2nd", "Singular", undefined],
  ["V-AAM-3S", "\u03BB\u03C5\u03C3\u03AC\u03C4\u03C9", "lysato", "3rd", "Singular", undefined],
  ["V-PAN", "\u03BB\u03CD\u03B5\u03B9\u03BD", "lyein", undefined, undefined, undefined],
  ["V-AAN", "\u03BB\u03CD\u03C3\u03B1\u03B9", "lysai", undefined, undefined, undefined],
  ["V-FAN", "\u03BB\u03CD\u03C3\u03B5\u03B9\u03BD", "lysein", undefined, undefined, undefined],
  ["V-RAN", "\u03BB\u03B5\u03BB\u03C5\u03BA\u03AD\u03BD\u03B1\u03B9", "lelykenai", undefined, undefined, undefined],
  ["V-PMN", "\u03BB\u03CD\u03B5\u03C3\u03B8\u03B1\u03B9", "lyesthai", undefined, undefined, undefined],
  ["V-AMN", "\u03BB\u03CD\u03C3\u03B1\u03C3\u03B8\u03B1\u03B9", "lysasthai", undefined, undefined, undefined],
  ["V-APN", "\u03BB\u03C5\u03B8\u03B7\u03BD\u03B1\u03B9", "lyth\u0113nai", undefined, undefined, undefined],
  ["V-PAP-NSM", "\u03BB\u03CD\u03C9\u03BD", "ly\u014Dn", undefined, undefined, "Masculine"],
  ["V-PAP-NSF", "\u03BB\u03CD\u03BF\u03C5\u03C3\u03B1", "lyousa", undefined, undefined, "Feminine"],
  ["V-PAP-NSN", "\u03BB\u03CD\u03BF\u03BD", "lyon", undefined, undefined, "Neuter"],
  ["V-AAP-NSM", "\u03BB\u03CD\u03C3\u03B1\u03C2", "lysas", undefined, undefined, "Masculine"],
  ["V-AAP-NSF", "\u03BB\u03CD\u03C3\u03B1\u03C3\u03B1", "lysasa", undefined, undefined, "Feminine"],
  ["V-AAP-NSN", "\u03BB\u03CD\u03C3\u03B1\u03BD", "lysan", undefined, undefined, "Neuter"],
  ["V-RAP-NSM", "\u03BB\u03B5\u03BB\u03C5\u03BA\u03CE\u03C2", "lelyk\u014Ds", undefined, undefined, "Masculine"],
  ["V-RAP-NSF", "\u03BB\u03B5\u03BB\u03C5\u03BA\u03C5\u03AF\u03B1", "lelykvia", undefined, undefined, "Feminine"],
  ["V-RAP-NSN", "\u03BB\u03B5\u03BB\u03C5\u03BA\u03CC\u03C2", "lelykos", undefined, undefined, "Neuter"],
];
for (const [morph, form, translit, person, number, gender] of lyoForms) {
  const fields = [];
  if (person) fields.push(`person: "${person}"`);
  if (number) fields.push(`number: "${number}"`);
  if (gender) fields.push(`gender: "${gender}"`);
  fields.push(`form: "${form}"`);
  fields.push(`transliteration: "${translit}"`);
  fields.push(`morphology: "${morph}"`);
  w(`    { ${fields.join(", ")} },`);
}
w("  ],");
w("};");
w();

// BALKO paradigm (abbreviated)
w("const BALKO_PARADIGM: ParadigmTable = {");
w("  name: \"\u03B2\u03AC\u03BB\u03BB\u03C9 \u2014 2nd Aorist Verb (\\\"I throw\\\")\",");
w("  description: \"2nd Aorist verbs form their aorist like an imperfect with ablaut, NOT with -\u03C3\u03B1- suffix.\",");
w("  rows: [");
for (const [morph, form, translit, person, number] of [
  ["V-PAI-1S", "\u03B2\u03AC\u03BB\u03BB\u03C9", "ball\u014D", "1st", "Singular"],
  ["V-PAI-2S", "\u03B2\u03AC\u03BB\u03BB\u03B5\u03B9\u03C2", "balleis", "2nd", "Singular"],
  ["V-PAI-3S", "\u03B2\u03AC\u03BB\u03BB\u03B5\u03B9", "ballei", "3rd", "Singular"],
  ["V-2AAI-1S", "\u1F10\u03B2\u03B1\u03BB\u03BF\u03BD", "ebalon", "1st", "Singular"],
  ["V-2AAI-2S", "\u1F10\u03B2\u03B1\u03BB\u03B5\u03C2", "ebales", "2nd", "Singular"],
  ["V-2AAI-3S", "\u1F10\u03B2\u03B1\u03BB\u03B5(\u03BD)", "ebale(n)", "3rd", "Singular"],
  ["V-2AAI-1P", "\u1F10\u03B2\u03AC\u03BB\u03BF\u03BC\u03B5\u03BD", "ebalomen", "1st", "Plural"],
  ["V-2AAI-2P", "\u1F10\u03B2\u03AC\u03BB\u03B5\u03C4\u03B5", "ebalete", "2nd", "Plural"],
  ["V-2AAI-3P", "\u1F10\u03B2\u03B1\u03BB\u03BF\u03BD", "ebalon", "3rd", "Plural"],
  ["V-2AAS-1S", "\u03B2\u03AC\u03BB\u03C9", "bal\u014D", "1st", "Singular"],
  ["V-2AAN", "\u03B2\u03B1\u03BB\u03B5\u03AF\u03BD", "balein", undefined, undefined],
  ["V-2AAP-NSM", "\u03B2\u03B1\u03BB\u03CE\u03BD", "bal\u014Dn", undefined, undefined],
]) {
  const fields = [];
  if (person) fields.push(`person: "${person}"`);
  if (number) fields.push(`number: "${number}"`);
  fields.push(`form: "${form}"`, `transliteration: "${translit}"`, `morphology: "${morph}"`);
  w(`    { ${fields.join(", ")} },`);
}
w("  ],");
w("};");
w();

// DIDOMI paradigm (abbreviated)
w("const DIDOMI_PARADIGM: ParadigmTable = {");
w("  name: \"\u03B4\u03AF\u03B4\u03C9\u03BC\u03B9 \u2014 3rd Conjugation (-\u03BC\u03B9 verb) (\\\"I give\\\")\",");
w("  description: \"-\u03BC\u03B9 verbs use special endings without the -\u03C9/-\u03B5\u03B9\u03C2/-\u03B5\u03B9 pattern.\",");
w("  rows: [");
for (const [morph, form, translit, person, number] of [
  ["V-PAI-1S", "\u03B4\u03AF\u03B4\u03C9\u03BC\u03B9", "did\u014Dmi", "1st", "Singular"],
  ["V-PAI-2S", "\u03B4\u03AF\u03B4\u03C9\u03C2", "did\u014Ds", "2nd", "Singular"],
  ["V-PAI-3S", "\u03B4\u03AF\u03B4\u03C9\u03C3\u03B9(\u03BD)", "did\u014Dsi(n)", "3rd", "Singular"],
  ["V-PAI-1P", "\u03B4\u03AF\u03B4\u03BF\u03BC\u03B5\u03BD", "didomen", "1st", "Plural"],
  ["V-PAI-2P", "\u03B4\u03AF\u03B4\u03BF\u03C4\u03B5", "didote", "2nd", "Plural"],
  ["V-PAI-3P", "\u03B4\u03B9\u03B4\u03CC\u03B1\u03C3\u03B9(\u03BD)", "didoasi(n)", "3rd", "Plural"],
  ["V-IAI-1S", "\u1F10\u03B4\u03AF\u03B4\u03BF\u03C5\u03BD", "edidoun", "1st", "Singular"],
  ["V-IAI-3S", "\u1F10\u03B4\u03AF\u03B4\u03BF\u03C5", "edidou", "3rd", "Singular"],
  ["V-2AAI-1S", "\u1F14\u03B4\u03C9\u03BA\u03B1", "ed\u014Dka", "1st", "Singular"],
  ["V-2AAI-3S", "\u1F14\u03B4\u03C9\u03BA\u03B5(\u03BD)", "ed\u014Dke(n)", "3rd", "Singular"],
  ["V-2AAN", "\u03B4\u03BF\u03CD\u03BD\u03B1\u03B9", "dounai", undefined, undefined],
  ["V-PAP-NSM", "\u03B4\u03B9\u03B4\u03BF\u03CD\u03C2", "didous", undefined, undefined],
  ["V-PAP-NSF", "\u03B4\u03B9\u03B4\u03BF\u03CD\u03C3\u03B1", "didousa", undefined, undefined],
]) {
  const fields = [];
  if (person) fields.push(`person: "${person}"`);
  if (number) fields.push(`number: "${number}"`);
  fields.push(`form: "${form}"`, `transliteration: "${translit}"`, `morphology: "${morph}"`);
  w(`    { ${fields.join(", ")} },`);
}
w("  ],");
w("};");
w();

// AGAPAO paradigm (abbreviated)
w("const AGAPAO_PARADIGM: ParadigmTable = {");
w("  name: \"\u03B1\u03B3\u03B1\u03C0\u03AC\u03C9 \u2014 Contract Verb -\u03B1\u03C9 (\\\"I love\\\")\",");
w("  description: \"Contract verbs contract their final vowel. \u03B1 + \u03B5 = \u03B1, \u03B1 + \u03BF = \u03C9.\",");
w("  rows: [");
for (const [morph, form, translit, person, number] of [
  ["V-PAI-1S", "\u03B1\u03B3\u03B1\u03C0\u03C6", "agap\u014D", "1st", "Singular"],
  ["V-PAI-2S", "\u03B1\u03B3\u03B1\u03C0\u1FB1\u03C2", "agap\u1FB1s", "2nd", "Singular"],
  ["V-PAI-3S", "\u03B1\u03B3\u03B1\u03C0\u1FB1", "agap\u1FB1", "3rd", "Singular"],
  ["V-AAI-1S", "\u1F20\u03B3\u03AC\u03C0\u03B7\u03C3\u03B1", "\u0113gap\u0113sa", "1st", "Singular"],
  ["V-AAI-3S", "\u1F20\u03B3\u03AC\u03C0\u03B7\u03C3\u03B5(\u03BD)", "\u0113gap\u0113se(n)", "3rd", "Singular"],
  ["V-FAI-1S", "\u03B1\u03B3\u03B1\u03C0\u03AE\u03C3\u03C9", "agap\u0113s\u014D", "1st", "Singular"],
  ["V-API-1S", "\u1F20\u03B3\u03B1\u03C0\u03AE\u03B8\u03B7\u03BD", "\u0113gap\u0113th\u0113n", "1st", "Singular"],
  ["V-PAP-NSM", "\u03B1\u03B3\u03B1\u03C0\u03C6\u03BD", "agap\u014Dn", undefined, undefined],
  ["V-PAN", "\u03B1\u03B3\u03B1\u03C0\u1FB1\u03BD", "agap\u1FB1n", undefined, undefined],
  ["V-AAN", "\u03B1\u03B3\u03B1\u03C0\u03AE\u03C3\u03B1\u03B9", "agap\u0113sai", undefined, undefined],
]) {
  const fields = [];
  if (person) fields.push(`person: "${person}"`);
  if (number) fields.push(`number: "${number}"`);
  fields.push(`form: "${form}"`, `transliteration: "${translit}"`, `morphology: "${morph}"`);
  w(`    { ${fields.join(", ")} },`);
}
w("  ],");
w("};");
w();

// EIMI paradigm (abbreviated)
w("const EIMI_PARADIGM: ParadigmTable = {");
w("  name: \"\u03B5\u03B9\u03BC\u03AF \u2014 Irregular Verb (\\\"I am\\\")\",");
w("  description: \"The most fundamental irregular verb in Greek.\",");
w("  rows: [");
for (const [morph, form, translit, person, number] of [
  ["V-PAI-1S", "\u03B5\u03B9\u03BC\u03AF", "eimi", "1st", "Singular"],
  ["V-PAI-2S", "\u03B5\u03AF", "ei", "2nd", "Singular"],
  ["V-PAI-3S", "\u1F10\u03C3\u03C4\u03AF(\u03BD)", "esti(n)", "3rd", "Singular"],
  ["V-PAI-1P", "\u1F10\u03C3\u03BC\u03AD\u03BD", "esmen", "1st", "Plural"],
  ["V-PAI-2P", "\u1F10\u03C3\u03C4\u03AD", "este", "2nd", "Plural"],
  ["V-PAI-3P", "\u03B5\u03B9\u03C3\u03AF(\u03BD)", "eisi(n)", "3rd", "Plural"],
  ["V-IAI-1S", "\u1F22\u03BC\u03B7\u03BD", "\u0113m\u0113n", "1st", "Singular"],
  ["V-IAI-3S", "\u1F26\u03BD", "\u0113n", "3rd", "Singular"],
  ["V-IAI-3P", "\u1F26\u03C3\u03B1\u03BD", "\u0113san", "3rd", "Plural"],
  ["V-PAS-1S", "\u1F60", "\u014D", "1st", "Singular"],
  ["V-PAS-3S", "\u1FC6\u03B9", "\u0113i", "3rd", "Singular"],
  ["V-PAM-2S", "\u1F30\u03C3\u03B8\u03B9", "isthi", "2nd", "Singular"],
  ["V-PAM-3S", "\u1F10\u03C3\u03C4\u03C9", "est\u014D", "3rd", "Singular"],
  ["V-PAN", "\u03B5\u03AF\u03BD\u03B1\u03B9", "einai", undefined, undefined],
  ["V-PAP-NSM", "\u1F60\u03BD", "\u014Dn", undefined, undefined],
  ["V-PAP-NSF", "\u03BF\u03CD\u03C3\u03B1", "ousa", undefined, undefined],
  ["V-PAP-NSN", "\u03CC\u03BD", "on", undefined, undefined],
]) {
  const fields = [];
  if (person) fields.push(`person: "${person}"`);
  if (number) fields.push(`number: "${number}"`);
  fields.push(`form: "${form}"`, `transliteration: "${translit}"`, `morphology: "${morph}"`);
  w(`    { ${fields.join(", ")} },`);
}
w("  ],");
w("};");
w();

// PHIEMI paradigm (abbreviated)
w("const PHIEMI_PARADIGM: ParadigmTable = {");
w("  name: \"\u03C6\u03B7\u03BC\u03AF \u2014 Irregular Verb (\\\"I say\\\")\",");
w("  description: \"Defective verb used mainly in direct discourse.\",");
w("  rows: [");
for (const [morph, form, translit, person, number] of [
  ["V-PAI-1S", "\u03C6\u03B7\u03BC\u03AF", "ph\u0113mi", "1st", "Singular"],
  ["V-PAI-3S", "\u03C6\u03B7\u03C3\u03AF(\u03BD)", "ph\u0113si(n)", "3rd", "Singular"],
  ["V-IAI-3S", "\u1F14\u03C6\u03B7", "eph\u0113", "3rd", "Singular"],
  ["V-PAN", "\u03C6\u03AC\u03BD\u03B1\u03B9", "phanai", undefined, undefined],
]) {
  const fields = [];
  if (person) fields.push(`person: "${person}"`);
  if (number) fields.push(`number: "${number}"`);
  fields.push(`form: "${form}"`, `transliteration: "${translit}"`, `morphology: "${morph}"`);
  w(`    { ${fields.join(", ")} },`);
}
w("  ],");
w("};");
w();

// TITHEMI, HISTEMI, HIEMI paradigms (abbreviated)
w("const TITHEMI_PARADIGM: ParadigmTable = {");
w("  name: \"\u03C4\u03AF\u03B8\u03B7\u03BC\u03B9 \u2014 3rd Conjugation (-\u03BC\u03B9 verb) (\\\"I place\\\")\",");
w("  description: \"Common -\u03BC\u03B9 verb with reduplicated present and irregular aorist.\",");
w("  rows: [");
for (const [morph, form, translit, person, number] of [
  ["V-PAI-1S", "\u03C4\u03AF\u03B8\u03B7\u03BC\u03B9", "tith\u0113mi", "1st", "Singular"],
  ["V-PAI-3S", "\u03C4\u03AF\u03B8\u03B7\u03C3\u03B9(\u03BD)", "tith\u0113si(n)", "3rd", "Singular"],
  ["V-2AAI-1S", "\u1F14\u03B8\u03B7\u03BA\u03B1", "eth\u0113ka", "1st", "Singular"],
  ["V-PMP-1S", "\u03C4\u03AF\u03B8\u03B5\u03BC\u03B1\u03B9", "tithemai", "1st", "Singular"],
  ["V-PMN", "\u03C4\u03AF\u03B8\u03B5\u03C3\u03B8\u03B1\u03B9", "tithesthai", undefined, undefined],
  ["V-PAP-NSM", "\u03C4\u03B9\u03B8\u03B5\u03AF\u03C2", "titheis", undefined, undefined],
]) {
  const fields = [];
  if (person) fields.push(`person: "${person}"`);
  if (number) fields.push(`number: "${number}"`);
  fields.push(`form: "${form}"`, `transliteration: "${translit}"`, `morphology: "${morph}"`);
  w(`    { ${fields.join(", ")} },`);
}
w("  ],");
w("};");
w();

w("const HISTEMI_PARADIGM: ParadigmTable = {");
w("  name: \"\u1F31\u03C3\u03C4\u03B7\u03BC\u03B9 \u2014 3rd Conjugation (-\u03BC\u03B9 verb) (\\\"I stand / I set\\\")\",");
w("  description: \"-\u03BC\u03B9 verb with transitive/intransitive alternation.\",");
w("  rows: [");
for (const [morph, form, translit, person, number] of [
  ["V-PAI-1S", "\u1F31\u03C3\u03C4\u03B7\u03BC\u03B9", "hist\u0113mi", "1st", "Singular"],
  ["V-2AAI-1S", "\u1F14\u03C3\u03C4\u03B7\u03BD", "est\u0113n", "1st", "Singular"],
  ["V-2AMI-1S", "\u1F10\u03C3\u03C4\u03B7\u03C3\u03AC\u03BC\u03B7\u03BD", "est\u0113sam\u0113n", "1st", "Singular"],
  ["V-PAP-NSM", "\u1F31\u03C3\u03C4\u03AC\u03C2", "histas", undefined, undefined],
]) {
  const fields = [];
  if (person) fields.push(`person: "${person}"`);
  if (number) fields.push(`number: "${number}"`);
  fields.push(`form: "${form}"`, `transliteration: "${translit}"`, `morphology: "${morph}"`);
  w(`    { ${fields.join(", ")} },`);
}
w("  ],");
w("};");
w();

w("const HIEMI_PARADIGM: ParadigmTable = {");
w("  name: \"\u1F31\u03B7\u03BC\u03B9 \u2014 3rd Conjugation (-\u03BC\u03B9 verb) (\\\"I send\\\")\",");
w("  description: \"-\u03BC\u03B9 verb meaning \\\"I send\\\".\",");
w("  rows: [");
for (const [morph, form, translit, person, number] of [
  ["V-PAI-1S", "\u1F31\u03B7\u03BC\u03B9", "hi\u0113mi", "1st", "Singular"],
  ["V-2AAI-1S", "\u1FC6\u03BA\u03B1", "\u0113ka", "1st", "Singular"],
  ["V-PAP-NSM", "\u1F31\u03B5\u03AF\u03C2", "hieis", undefined, undefined],
]) {
  const fields = [];
  if (person) fields.push(`person: "${person}"`);
  if (number) fields.push(`number: "${number}"`);
  fields.push(`form: "${form}"`, `transliteration: "${translit}"`, `morphology: "${morph}"`);
  w(`    { ${fields.join(", ")} },`);
}
w("  ],");
w("};");
w();

// Paradigm index
w("const PARADIGM_INDEX: Record<string, ParadigmTable> = {");
w("  \"lyo\": LYO_PARADIGM,");
w("  \"lyw\": LYO_PARADIGM,");
w("  \"\u03BB\u03CD\u03C9\": LYO_PARADIGM,");
w("  \"balko\": BALKO_PARADIGM,");
w("  \"\u03B2\u03AC\u03BB\u03BB\u03C9\": BALKO_PARADIGM,");
w("  \"didomi\": DIDOMI_PARADIGM,");
w("  \"\u03B4\u03AF\u03B4\u03C9\u03BC\u03B9\": DIDOMI_PARADIGM,");
w("  \"agapao\": AGAPAO_PARADIGM,");
w("  \"\u03B1\u03B3\u03B1\u03C0\u03AC\u03C9\": AGAPAO_PARADIGM,");
w("  \"eimi\": EIMI_PARADIGM,");
w("  \"\u03B5\u03B9\u03BC\u03AF\": EIMI_PARADIGM,");
w("  \"phiemi\": PHIEMI_PARADIGM,");
w("  \"\u03C6\u03B7\u03BC\u03AF\": PHIEMI_PARADIGM,");
w("  \"tithemi\": TITHEMI_PARADIGM,");
w("  \"\u03C4\u03AF\u03B8\u03B7\u03BC\u03B9\": TITHEMI_PARADIGM,");
w("  \"histemi\": HISTEMI_PARADIGM,");
w("  \"\u1F31\u03C3\u03C4\u03B7\u03BC\u03B9\": HISTEMI_PARADIGM,");
w("  \"hiemi\": HIEMI_PARADIGM,");
w("  \"\u1F31\u03B7\u03BC\u03B9\": HIEMI_PARADIGM,");
w("  \"regular\": LYO_PARADIGM,");
w("  \"2nd-aorist\": BALKO_PARADIGM,");
w("  \"mi-verb\": DIDOMI_PARADIGM,");
w("  \"contract\": AGAPAO_PARADIGM,");
w("  \"irregular\": EIMI_PARADIGM,");
w("};");
w();

// PUBLIC API
w("// \u2550".repeat(35));
w("// PUBLIC API");
w("// \u2550".repeat(35));
w();
w("export function parseMorphology(code) {");
w("  if (!code || !code.trim()) return { tipo: \"\", label: \"\" };");
w("  const trimmed = code.trim();");
w("  const upper = trimmed.toUpperCase();");
w("  const firstDash = upper.indexOf(\"-\");");
w("  if (firstDash !== -1) {");
w("    const afterPos = upper.slice(firstDash + 1, firstDash + 2);");
w("    if (\"QNPOHMTD\".includes(afterPos)) {");
w("      const secondChar = upper.slice(firstDash + 2, firstDash + 3);");
w("      if (\"123\".includes(secondChar)) return parseGreekMorphCode(trimmed);");
w("      return parseHebrewMorphCode(trimmed);");
w("    }");
w("    if (\"123\".includes(afterPos)) return parseGreekMorphCode(trimmed);");
w("  }");
w("  return parseGreekMorphCode(trimmed);");
w("}");
w();

w("export function parseGreekVerb(form) {");
w("  if (!form || !form.trim()) return { tipo: \"\", label: \"\" };");
w("  const normalized = stripDiacritics(form.trim());");
w();
w("  for (const [, endings] of Object.entries(GREEK_ENDINGS)) {");
w("    for (const [ending, template] of Object.entries(endings)) {");
w("      if (normalized.endsWith(ending) && normalized.length > ending.length) {");
w("        const result = { ...template, tipo: \"Verb\", idioma: \"grego\", raiz: form };");
w("        result.label = formatGreekVerbLabel(result);");
w("        return result;");
w("      }");
w("    }");
w("  }");
w();
w("  // Fallback inference");
w("  if (normalized.endsWith(\"\\u03C9\")) return { tipo: \"Verb\", tempo: \"Present\", voz: \"Active\", modo: \"Indicative\", pessoa: \"1st\", numero: \"Singular\", idioma: \"grego\", raiz: form, label: \"Present Active Indicative 1st Sg (inferred)\" };");
w("  if (normalized.endsWith(\"\\u03B5\\u03B9\\u03C2\")) return { tipo: \"Verb\", tempo: \"Present\", voz: \"Active\", modo: \"Indicative\", pessoa: \"2nd\", numero: \"Singular\", idioma: \"grego\", raiz: form, label: \"Present Active Indicative 2nd Sg (inferred)\" };");
w("  if (normalized.endsWith(\"\\u03B5\\u03B9\")) return { tipo: \"Verb\", tempo: \"Present\", voz: \"Active\", modo: \"Indicative\", pessoa: \"3rd\", numero: \"Singular\", idioma: \"grego\", raiz: form, label: \"Present Active Indicative 3rd Sg (inferred)\" };");
w("  if (normalized.endsWith(\"\\u03BF\\u03BC\\u03B5\\u03BD\")) return { tipo: \"Verb\", tempo: \"Present\", voz: \"Active\", modo: \"Indicative\", pessoa: \"1st\", numero: \"Plural\", idioma: \"grego\", raiz: form, label: \"Present Active Indicative 1st Pl (inferred)\" };");
w("  if (normalized.endsWith(\"\\u03B5\\u03C4\\u03B5\")) return { tipo: \"Verb\", tempo: \"Present\", voz: \"Active\", modo: \"Indicative\", pessoa: \"2nd\", numero: \"Plural\", idioma: \"grego\", raiz: form, label: \"Present Active Indicative 2nd Pl (inferred)\" };");
w("  if (normalized.endsWith(\"\\u03BF\\u03C5\\u03C3\\u03B9\\u03BD\") || normalized.endsWith(\"\\u03BF\\u03C5\\u03C3\\u03B9\")) return { tipo: \"Verb\", tempo: \"Present\", voz: \"Active\", modo: \"Indicative\", pessoa: \"3rd\", numero: \"Plural\", idioma: \"grego\", raiz: form, label: \"Present Active Indicative 3rd Pl (inferred)\" };");
w("  if (normalized.endsWith(\"\\u03BF\\u03BC\\u03B1\\u03B9\")) return { tipo: \"Verb\", tempo: \"Present\", voz: \"Middle/Passive\", modo: \"Indicative\", pessoa: \"1st\", numero: \"Singular\", idioma: \"grego\", raiz: form, label: \"Present Middle/Passive Indicative 1st Sg (inferred)\" };");
w("  if (normalized.endsWith(\"\\u03B5\\u03C4\\u03B1\\u03B9\")) return { tipo: \"Verb\", tempo: \"Present\", voz: \"Middle/Passive\", modo: \"Indicative\", pessoa: \"3rd\", numero: \"Singular\", idioma: \"grego\", raiz: form, label: \"Present Middle/Passive Indicative 3rd Sg (inferred)\" };");
w("  if (normalized.endsWith(\"\\u03BF\\u03BD\\u03C4\\u03B1\\u03B9\")) return { tipo: \"Verb\", tempo: \"Present\", voz: \"Middle/Passive\", modo: \"Indicative\", pessoa: \"3rd\", numero: \"Plural\", idioma: \"grego\", raiz: form, label: \"Present Middle/Passive Indicative 3rd Pl (inferred)\" };");
w("  if (normalized.endsWith(\"\\u03B1\\u03C2\")) return { tipo: \"Verb\", tempo: \"Aorist\", voz: \"Active\", modo: \"Indicative\", pessoa: \"2nd\", numero: \"Singular\", idioma: \"grego\", raiz: form, label: \"Aorist Active Indicative 2nd Sg (inferred)\" };");
w("  if (normalized.endsWith(\"\\u03B1\\u03BD\")) return { tipo: \"Verb\", tempo: \"Aorist\", voz: \"Active\", modo: \"Indicative\", pessoa: \"3rd\", numero: \"Plural\", idioma: \"grego\", raiz: form, label: \"Aorist Active Indicative 3rd Pl (inferred)\" };");
w("  if (normalized.endsWith(\"\\u03C9\\u03BD\")) return { tipo: \"Verb\", tempo: \"Present\", voz: \"Active\", modo: \"Participle\", genero: \"Masculine\", caso: \"Nominative\", numero: \"Singular\", idioma: \"grego\", raiz: form, label: \"Present Active Participle Masc Nom Sg (inferred)\" };");
w("  if (normalized.endsWith(\"\\u03BF\\u03C5\\u03C3\\u03B1\")) return { tipo: \"Verb\", tempo: \"Present\", voz: \"Active\", modo: \"Participle\", genero: \"Feminine\", caso: \"Nominative\", numero: \"Singular\", idioma: \"grego\", raiz: form, label: \"Present Active Participle Fem Nom Sg (inferred)\" };");
w("  if (normalized.endsWith(\"\\u03B5\\u03B9\\u03BD\")) return { tipo: \"Verb\", tempo: \"Present\", voz: \"Active\", modo: \"Infinitive\", idioma: \"grego\", raiz: form, label: \"Present Active Infinitive (inferred)\" };");
w("  if (normalized.endsWith(\"\\u03B1\\u03B9\")) return { tipo: \"Verb\", tempo: \"Aorist\", voz: \"Active\", modo: \"Infinitive\", idioma: \"grego\", raiz: form, label: \"Aorist Active Infinitive (inferred)\" };");
w("  if (normalized.endsWith(\"\\u03B5\\u03C3\\u03B8\\u03B1\\u03B9\")) return { tipo: \"Verb\", tempo: \"Present\", voz: \"Middle/Passive\", modo: \"Infinitive\", idioma: \"grego\", raiz: form, label: \"Present Middle/Passive Infinitive (inferred)\" };");
w("  return { tipo: \"Verb\", idioma: \"grego\", raiz: form, label: `Verb form: ${form}` };");
w("}");
w();

w("export function parseGreekNoun(form) {");
w("  if (!form || !form.trim()) return { tipo: \"\", label: \"\" };");
w("  const normalized = stripDiacritics(form.trim());");
w("  for (const [ending, template] of Object.entries(GREEK_NOUN_ENDINGS)) {");
w("    if (normalized.endsWith(ending) && normalized.length > ending.length) {");
w("      const result = { ...template, idioma: \"grego\", raiz: form };");
w("      result.label = formatGreekNounLabel(result);");
w("      return result;");
w("    }");
w("  }");
w("  if (normalized.endsWith(\"\\u03BF\\u03C2\")) return { tipo: \"Noun\", caso: \"Nominative\", numero: \"Singular\", genero: \"Masculine\", idioma: \"grego\", raiz: form, label: \"2nd Declension Nom Sg Masc (inferred)\" };");
w("  if (normalized.endsWith(\"\\u03BF\\u03C5\")) return { tipo: \"Noun\", caso: \"Genitive\", numero: \"Singular\", genero: \"Masculine\", idioma: \"grego\", raiz: form, label: \"2nd Declension Gen Sg (inferred)\" };");
w("  if (normalized.endsWith(\"\\u03BF\\u03BD\")) return { tipo: \"Noun\", caso: \"Accusative\", numero: \"Singular\", genero: \"Neuter\", idioma: \"grego\", raiz: form, label: \"2nd Declension Acc Sg Neut (inferred)\" };");
w("  if (normalized.endsWith(\"\\u03BF\\u03B9\")) return { tipo: \"Noun\", caso: \"Nominative\", numero: \"Plural\", genero: \"Masculine\", idioma: \"grego\", raiz: form, label: \"2nd Declension Nom Pl Masc (inferred)\" };");
w("  if (normalized.endsWith(\"\\u03C9\\u03BD\")) return { tipo: \"Noun\", caso: \"Genitive\", numero: \"Plural\", genero: \"Masculine\", idioma: \"grego\", raiz: form, label: \"2nd Declension Gen Pl (inferred)\" };");
w("  if (normalized.endsWith(\"\\u03B7\")) return { tipo: \"Noun\", caso: \"Nominative\", numero: \"Singular\", genero: \"Feminine\", idioma: \"grego\", raiz: form, label: \"1st Declension Nom Sg Fem (inferred)\" };");
w("  if (normalized.endsWith(\"\\u03B7\\u03C2\")) return { tipo: \"Noun\", caso: \"Genitive\", numero: \"Singular\", genero: \"Feminine\", idioma: \"grego\", raiz: form, label: \"1st Declension Gen Sg Fem (inferred)\" };");
w("  if (normalized.endsWith(\"\\u03B5\\u03C2\")) return { tipo: \"Noun\", caso: \"Nominative\", numero: \"Plural\", genero: \"Neuter\", idioma: \"grego\", raiz: form, label: \"3rd Declension Nom Pl Neut (inferred)\" };");
w("  return { tipo: \"Noun\", idioma: \"grego\", raiz: form, label: `Noun form: ${form}` };");
w("}");
w();

w("export function parseHebrewVerb(form) {");
w("  if (!form || !form.trim()) return { tipo: \"\", label: \"\" };");
w("  for (const pattern of HEBREW_VERB_SUFFIXES) {");
w("    if (form.endsWith(pattern.suffix) && form.length > pattern.suffix.length) {");
w("      return { ...pattern.result, idioma: \"hebraico\", raiz: form };");
w("    }");
w("  }");
w("  const trimmed = form.trim();");
w("  if (trimmed.endsWith(\"\\u05D5\\u05D0\")) return { tipo: \"Verb\", stem: \"Qal\", tempo: \"Perfect\", pessoa: \"3rd\", numero: \"Plural\", genero: \"Masculine\", idioma: \"hebraico\", raiz: form, label: \"Qal Perfect 3rd Pl Masc (inferred)\" };");
w("  if (trimmed.endsWith(\"\\u05D4\")) return { tipo: \"Verb\", stem: \"Qal\", tempo: \"Perfect\", pessoa: \"3rd\", numero: \"Singular\", genero: \"Masculine\", idioma: \"hebraico\", raiz: form, label: \"Qal Perfect 3rd Sg Masc (inferred)\" };");
w("  if (trimmed.endsWith(\"\\u05D9\\u05DD\")) return { tipo: \"Verb\", stem: \"Qal\", tempo: \"Participle\", genero: \"Masculine\", numero: \"Plural\", idioma: \"hebraico\", raiz: form, label: \"Qal Participle Masc Pl (inferred)\" };");
w("  return { tipo: \"Verb\", idioma: \"hebraico\", raiz: form, label: `Hebrew verb form: ${form}` };");
w("}");
w();

w("export function getParadigmTable(type): ParadigmTable | undefined {");
w("  if (!type) return undefined;");
w("  return PARADIGM_INDEX[type.trim().toLowerCase()];");
w("}");
w();
w("export function getAvailableParadigms(): string[] {");
w("  return Object.keys(PARADIGM_INDEX);");
w("}");
w();
w("export function getMorphLabel(code) {");
w("  if (!code) return \"\";");
w("  return parseMorphology(code).label || code;");
w("}");
w();
w("export function formatMorphology(morph) {");
w("  if (!morph || !morph.tipo) return morph?.label || \"\";");
w("  const parts = [];");
w("  if (morph.idioma) parts.push(morph.idioma === \"grego\" ? \"Greek\" : \"Hebrew\");");
w("  parts.push(morph.tipo);");
w("  if (morph.tempo) parts.push(morph.tempo);");
w("  if (morph.voz) parts.push(`${morph.voz} Voice`);");
w("  if (morph.modo) parts.push(morph.modo);");
w("  if (morph.stem) parts.push(morph.stem);");
w("  if (morph.modo === \"Participle\") {");
w("    if (morph.genero) parts.push(morph.genero);");
w("    if (morph.caso) parts.push(morph.caso);");
w("    if (morph.numero) parts.push(morph.numero);");
w("  } else if (morph.modo !== \"Infinitive\") {");
w("    if (morph.pessoa && morph.numero) parts.push(`${morph.pessoa} ${morph.numero}`);");
w("    if (morph.genero) parts.push(morph.genero);");
w("  }");
w("  if (morph.caso && morph.modo !== \"Participle\") parts.push(morph.caso);");
w("  if (morph.estado) parts.push(`State: ${morph.estado}`);");
w("  return parts.join(\", \") || morph.label || \"\";");
w("}");
w();
w("export function getCorMorfologia(campo) {");
w("  const cores = {");
w("    tipo: \"bg-indigo-500/15 text-indigo-600 dark:text-indigo-400\",");
w("    tempo: \"bg-amber-500/15 text-amber-600 dark:text-amber-400\",");
w("    voz: \"bg-emerald-500/15 text-emerald-600 dark:text-emerald-400\",");
w("    modo: \"bg-rose-500/15 text-rose-600 dark:text-rose-400\",");
w("    pessoa: \"bg-pink-500/15 text-pink-600 dark:text-pink-400\",");
w("    numero: \"bg-cyan-500/15 text-cyan-600 dark:text-cyan-400\",");
w("    genero: \"bg-violet-500/15 text-violet-600 dark:text-violet-400\",");
w("    caso: \"bg-red-500/15 text-red-600 dark:text-red-400\",");
w("    stem: \"bg-green-500/15 text-green-600 dark:text-green-400\",");
w("    estado: \"bg-orange-500/15 text-orange-600 dark:text-orange-400\",");
w("  };");
w("  return cores[campo] || \"bg-gray-500/15 text-gray-600 dark:text-gray-400\";");
w("}");
w();
w("/** @deprecated Use parseMorphology() instead */");
w("export function parsearMorfologia(morfologia, idioma: \"grego\" | \"hebraico\") {");
w("  if (!morfologia) return { tipo: \"\", label: \"\" };");
w("  if (idioma === \"grego\") return parseGreekMorphCode(morfologia);");
w("  return parseHebrewMorphCode(morfologia);");
w("}");

// Write to file
const content = lines.join("\n");
writeFileSync("src/lib/morphology.ts", content, "utf8");
console.log(`Written ${content.length} chars, ${lines.length} lines`);
