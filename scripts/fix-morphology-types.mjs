import { readFileSync, writeFileSync } from "fs";

let c = readFileSync("src/lib/morphology.ts", "utf8");

// Fix internal function signatures
c = c.replace(/^function parseGreekMorphCode\((\w+)\)/gm, "function parseGreekMorphCode(code: string)");
c = c.replace(/^function parseGreekVerbCode\((\w+), (\w+)\)/gm, "function parseGreekVerbCode(code: string, result: MorfologiaEstruturada)");
c = c.replace(/^function parseGreekNounCode\((\w+), (\w+)\)/gm, "function parseGreekNounCode(code: string, result: MorfologiaEstruturada)");
c = c.replace(/^function parseGreekAdjCode\((\w+), (\w+)\)/gm, "function parseGreekAdjCode(code: string, result: MorfologiaEstruturada)");
c = c.replace(/^function formatGreekVerbLabel\((\w+)\)/gm, "function formatGreekVerbLabel(r: MorfologiaEstruturada)");
c = c.replace(/^function formatGreekNounLabel\((\w+)\)/gm, "function formatGreekNounLabel(r: MorfologiaEstruturada)");
c = c.replace(/^function parseHebrewMorphCode\((\w+)\)/gm, "function parseHebrewMorphCode(code: string)");
c = c.replace(/^function parseHebrewVerbCode\(/gm, "function parseHebrewVerbCode(");
c = c.replace(/^function parseHebrewNounCode\(/gm, "function parseHebrewNounCode(");
c = c.replace(/^function formatHebrewVerbLabel\((\w+)\)/gm, "function formatHebrewVerbLabel(r: MorfologiaEstruturada)");
c = c.replace(/^function formatHebrewNounLabel\((\w+)\)/gm, "function formatHebrewNounLabel(r: MorfologiaEstruturada)");

// Fix result variable types
c = c.replace(/const result = \{ tipo: "", label: "" \};/g, 'const result: MorfologiaEstruturada = { tipo: "", label: "" };');

// Fix exported function parameter types
c = c.replace(/export function parseMorphology\((\w+)\) \{/g, "export function parseMorphology(code: string) {");
c = c.replace(/export function parseGreekVerb\((\w+)\) \{/g, "export function parseGreekVerb(form: string) {");
c = c.replace(/export function parseGreekNoun\((\w+)\) \{/g, "export function parseGreekNoun(form: string) {");
c = c.replace(/export function parseHebrewVerb\((\w+)\) \{/g, "export function parseHebrewVerb(form: string) {");
c = c.replace(/export function getMorphLabel\((\w+)\) \{/g, "export function getMorphLabel(code: string) {");
c = c.replace(/export function formatMorphology\((\w+)\) \{/g, "export function formatMorphology(morph: MorfologiaEstruturada) {");
c = c.replace(/export function getCorMorfologia\((\w+)\) \{/g, "export function getCorMorfologia(campo: string) {");
c = c.replace(/export function parsearMorfologia\((\w+), (\w+: "grego" \| "hebraico")\)/g, 'export function parsearMorfologia(morfologia: string, idioma: "grego" | "hebraico")');

// Fix ParadigmCell interface
c = c.replace(
  "  person?;\n  number?;\n  gender?;\n  case_?;\n  form;\n  transliteration;\n  morphology;",
  "  person?: string;\n  number?: string;\n  gender?: string;\n  case_?: string;\n  form: string;\n  transliteration: string;\n  morphology: string;"
);

// Fix ParadigmTable interface
c = c.replace(
  "  name;\n  description;\n  rows: ParadigmCell[];",
  "  name: string;\n  description: string;\n  rows: ParadigmCell[];"
);

// Fix HebrewVerbPattern interface
c = c.replace(
  "interface HebrewVerbPattern {\n  suffix;\n  result;\n}",
  "interface HebrewVerbPattern {\n  suffix: string;\n  result: MorfologiaEstruturada;\n}"
);

// Add Record<string, string> to constant objects
const constNames = [
  "GREEK_TENSES", "GREEK_VOICES", "GREEK_MOODS", "GREEK_PERSONS", "GREEK_NUMBERS",
  "GREEK_GENDERS", "GREEK_CASES", "GREEK_PARTS_OF_SPEECH", "GREEK_DECLENSIONS",
  "HEBREW_STEMS", "HEBREW_TENSES", "HEBREW_PERSONS", "HEBREW_NUMBERS",
  "HEBREW_GENDERS", "HEBREW_STATES", "HEBREW_PARTS_OF_SPEECH"
];
for (const name of constNames) {
  const re = new RegExp("export const " + name + " = \\{", "g");
  c = c.replace(re, "export const " + name + ': Record<string, string> = {');
}

writeFileSync("src/lib/morphology.ts", c, "utf8");
console.log("Fixed type annotations in morphology.ts");
