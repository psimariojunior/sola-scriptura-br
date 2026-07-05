// bolls.life API utilities - free Bible text API
// Translation codes: ARA, NVI, ARC, TR (Textus Receptus), WLC (Hebrew), SBLGNT (Greek)
// Book numbers: 1=Genesis ... 39=Malachi, 40=Matthew ... 66=Revelation

const BOLLS_BASE = "https://bolls.life";

// Map book names to bolls.life numeric IDs (standard Protestant canon)
const BOOK_IDS: Record<string, number> = {
  "Gênesis":1,"Êxodo":2,"Levítico":3,"Números":4,"Deuteronômio":5,
  "Josué":6,"Juízes":7,"Rute":8,"1 Samuel":9,"2 Samuel":10,
  "1 Reis":11,"2 Reis":12,"1 Crônicas":13,"2 Crônicas":14,
  "Esdras":15,"Neemias":16,"Ester":17,"Jó":18,
  "Salmos":19,"Provérbios":20,"Eclesiastes":21,"Cânticos":22,
  "Isaías":23,"Jeremias":24,"Lamentações":25,"Ezequiel":26,
  "Daniel":27,"Oséias":28,"Joel":29,"Amós":30,"Obadias":31,
  "Jonas":32,"Miqueias":33,"Naum":34,"Habacuque":35,"Sofonias":36,
  "Ageu":37,"Zacarias":38,"Malaquias":39,
  "Mateus":40,"Marcos":41,"Lucas":42,"João":43,"Atos":44,
  "Romanos":45,"1 Coríntios":46,"2 Coríntios":47,"Gálatas":48,
  "Efésios":49,"Filipenses":50,"Colossenses":51,
  "1 Tessalonicenses":52,"2 Tessalonicenses":53,
  "1 Timóteo":54,"2 Timóteo":55,"Tito":56,"Filemom":57,
  "Hebreus":58,"Tiago":59,"1 Pedro":60,"2 Pedro":61,
  "1 João":62,"2 João":63,"3 João":64,"Judas":65,"Apocalipse":66,
};

export function getBookId(nome: string): number | undefined {
  return BOOK_IDS[nome];
}

export async function fetchChapter(translation: string, bookName: string, chapter: number): Promise<string[]> {
  const bookId = getBookId(bookName);
  if (!bookId) return [];
  try {
    const url = `${BOLLS_BASE}/get-chapter/${translation}/${bookId}/${chapter}/`;
    const res = await fetch(url);
    if (!res.ok) return [];
    const data = await res.json();
    if (Array.isArray(data)) return data.map((v: any) => typeof v === "string" ? v : v?.text ?? "");
    return [];
  } catch {
    return [];
  }
}

export async function fetchParallel(bookName: string, chapter: number): Promise<{
  ara: string[]; nvi: string[]; tr: string[]; wlc: string[];
}> {
  const bookId = getBookId(bookName);
  const empty = { ara: [] as string[], nvi: [] as string[], tr: [] as string[], wlc: [] as string[] };
  if (!bookId) return empty;

  const isOT = bookId <= 39;
  const translations = isOT
    ? ["ARA", "NVI", "WLC"]
    : ["ARA", "NVI", "TR"];

  try {
    const results = await Promise.all(
      translations.map(async (t) => {
        try {
          const url = `${BOLLS_BASE}/get-chapter/${t}/${bookId}/${chapter}/`;
          const res = await fetch(url);
          if (!res.ok) return [];
          const data = await res.json();
          return Array.isArray(data)
            ? data.map((v: any) => typeof v === "string" ? v : v?.text ?? "")
            : [];
        } catch { return []; }
      })
    );
    return {
      ara: results[0],
      nvi: results[1],
      wlc: isOT ? results[2] : [],
      tr: !isOT ? results[2] : [],
    };
  } catch {
    return empty;
  }
}

// Simple morphological parsing for Greek words
export function parseGreekWord(word: string): Record<string, string> {
  const info: Record<string, string> = {};
  const cleaned = word.replace(/[·,.\s]/g, "").toLowerCase();

  // Verb endings
  if (/[ω]$/.test(cleaned)) { info.tempo = "presente"; info.pessoa = "1ª"; info.numero = "singular"; }
  if (/εις$/.test(cleaned)) { info.tempo = "presente"; info.pessoa = "2ª"; info.numero = "singular"; }
  if (/ει$/.test(cleaned)) { info.tempo = "presente"; info.pessoa = "3ª"; info.numero = "singular"; }
  if (/ομεν$/.test(cleaned)) { info.tempo = "presente"; info.pessoa = "1ª"; info.numero = "plural"; }
  if (/ετε$/.test(cleaned)) { info.tempo = "presente"; info.pessoa = "2ª"; info.numero = "plural"; }
  if (/ουσιν?$/.test(cleaned)) { info.tempo = "presente"; info.pessoa = "3ª"; info.numero = "plural"; }
  if (/σεν$/.test(cleaned) && !/ουσιν?$/.test(cleaned)) { info.tempo = "aoristo"; info.pessoa = "3ª"; info.numero = "singular"; }
  if (/σα$/.test(cleaned)) { info.tempo = "aoristo"; info.pessoa = "1ª"; info.numero = "singular"; }
  if (/θη$/.test(cleaned)) info.voz = "passiva";
  if (/^ε[pψ]/.test(cleaned)) info.aspecto = "perfeito";

  // Noun/adjective endings
  if (/ος$/.test(cleaned) || /ου$/.test(cleaned)) { info.caso = "nominativo/genitivo"; info.genero = "masculino/neutro"; }
  if (/α$/.test(cleaned) && !/εσα$/.test(cleaned)) { info.genero = "feminino"; info.numero = "singular"; }
  if (/ων$/.test(cleaned)) { info.caso = "genitivo"; info.numero = "plural"; }
  if (/οις$/.test(cleaned)) { info.caso = "dativo"; info.numero = "plural"; }

  return info;
}

// Simple morphological parsing for Hebrew words
export function parseHebrewWord(word: string): Record<string, string> {
  const info: Record<string, string> = {};
  const cleaned = word.replace(/[׃·,\s]/g, "");

  // Prefixes
  if (cleaned.startsWith("ו")) info.conjuncao = "waw (e)";
  if (cleaned.startsWith("ה")) info.artigo = "definido (o)";
  if (cleaned.startsWith("ל")) info.preposicao = "lamed (para/a)";
  if (cleaned.startsWith("ב")) info.preposicao = "beth (em/com)";
  if (cleaned.startsWith("מ")) info.preposicao = "mem (de/desde)";
  if (cleaned.startsWith("כ")) info.preposicao = "kaph (como)";

  // Suffixes
  if (cleaned.endsWith("י")) { info.sufixo = "1ª pessoa singular (meu/minha)"; }
  if (cleaned.endsWith("נו")) { info.sufixo = "1ª pessoa plural (nosso/nossa)"; }
  if (cleaned.endsWith("ת")) { info.sufixo = "2ª pessoa singular / feminino"; }
  if (cleaned.endsWith("ים")) { info.numero = "plural masculino"; }
  if (cleaned.endsWith("ות")) { info.numero = "plural feminino"; }

  // Verb patterns
  if (cleaned.match(/^([יבתנמ])/)) info.raiz = cleaned.substring(0, 3);

  return info;
}

// Get morphological analysis for a word
export function getMorphology(word: string, language: "g" | "h"): Record<string, string> {
  if (language === "g") return parseGreekWord(word);
  return parseHebrewWord(word);
}
