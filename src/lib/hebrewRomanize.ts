/**
 * Conversão de texto hebraico (com nikud) para romanização latina.
 * Baseado no padrão de transliteração da Bíblia Strong.
 */

const HEBREW_MAP: Record<string, string> = {
  'א': "'",    // alef
  'בּ': 'b',   // bet (com dagesh)
  'ב': 'v',    // vet (sem dagesh)
  'ג': 'g',    // gimel
  'ד': 'd',    // dalet
  'ה': 'h',    // he
  'ו': 'v',    // vav
  'ז': 'z',    // zayin
  'ח': 'ch',   // chet
  'ט': 't',    // tet
  'י': 'y',    // yod
  'כּ': 'k',   // kaf (com dagesh)
  'כ': 'ch',   // khaf (sem dagesh)
  'ך': 'ch',   // khaf sofit
  'ל': 'l',    // lamed
  'מ': 'm',    // mem
  'ם': 'm',    // mem sofit
  'נ': 'n',    // nun
  'ן': 'n',    // nun sofit
  'ס': 's',    // samech
  'ע': "'",    // ayin
  'פּ': 'p',   // pe (com dagesh)
  'פ': 'f',    // fe (sem dagesh)
  'ף': 'f',    // pe sofit
  'צ': 'ts',   // tsade
  'ץ': 'ts',   // tsade sofit
  'ק': 'q',    // qof
  'ר': 'r',    // resh
  'שׁ': 'sh',  // shin
  'שׂ': 's',   // sin
  'ת': 't',    // tav
};

const VOWEL_MAP: Record<string, string> = {
  'ָ': 'a',   // qamats
  'ַ': 'a',   // patach
  'ֶ': 'e',   // tsere
  'ֵ': 'e',   // tsere (variante)
  'ִ': 'i',   // hiriq
  'ֹ': 'o',   // holam
  'ֻ': 'u',   // qubuts
  'ְ': '',    // sheva (silencioso ou schwa)
  'ֲ': 'a',   // patach ganuv
  'ֱ': 'e',   // tsere ganuv
  'ֳ': 'o',   // qamats ganuv
};

/**
 * Remove nikud (pontos vocálicos) de um texto hebraico.
 */
export function removeNikud(text: string): string {
  return text.replace(/[\u0591-\u05C7]/g, '');
}

/**
 * Romaniza texto hebraico (com ou sem nikud) para letras latinas.
 * Exemplo: בַּיִת → "bayit", שָׁלוֹם → "shalom"
 */
export function romanizeHebrew(text: string): string {
  if (!text) return '';

  // Se já é latino (sem caracteres hebraicos), retorna direto
  if (!/[\u0590-\u05FF]/.test(text)) return text;

  let result = '';
  let i = 0;

  while (i < text.length) {
    const char = text[i];

    // Pular caracteres de nikud
    if (char >= '\u0591' && char <= '\u05C7') {
      // Mas extrair a vogal se existir
      const vowel = VOWEL_MAP[char];
      if (vowel && result.length > 0) {
        const lastChar = result[result.length - 1];
        // Não duplicar vogal se a consoante já termina com vogal similar
        if (lastChar !== vowel) {
          result += vowel;
        }
      }
      i++;
      continue;
    }

    // Verificar sequências de 2 caracteres primeiro
    if (i + 1 < text.length) {
      const twoChar = text[i] + text[i + 1];
      if (HEBREW_MAP[twoChar]) {
        result += HEBREW_MAP[twoChar];
        i += 2;
        // Verificar vogal seguinte
        if (i < text.length && text[i] >= '\u0591' && text[i] <= '\u05C7') {
          const vowel = VOWEL_MAP[text[i]];
          if (vowel) result += vowel;
          i++;
        }
        continue;
      }
    }

    // Mapear consoante
    const mapped = HEBREW_MAP[char];
    if (mapped) {
      result += mapped;
      i++;
      // Verificar vogal seguinte
      if (i < text.length && text[i] >= '\u0591' && text[i] <= '\u05C7') {
        const vowel = VOWEL_MAP[text[i]];
        if (vowel) result += vowel;
        i++;
      }
      continue;
    }

    // Espaço ou outro caractere
    if (char === ' ' || char === '־' || char === '-') {
      result += ' ';
    } else if (char === '/') {
      result += '/';
    }

    i++;
  }

  // Limpar espaços duplos
  return result.replace(/\s+/g, ' ').trim();
}

/**
 * Obtém a romanização de uma palavra hebraica do léxico.
 * Se o campo `transliteracao` já contém romanização latina, usa ele.
 * Se contém hebraico com nikud, converte automaticamente.
 * Se está vazio, converte o campo `palavra`.
 */
export function getTransliteracaoHebraica(transliteracao: string, palavra: string): string {
  if (transliteracao) {
    // Se já é latino, retorna direto
    if (!/[\u0590-\u05FF]/.test(transliteracao)) return transliteracao;
    // Se é hebraico, converte
    return romanizeHebrew(transliteracao);
  }
  if (palavra) {
    return romanizeHebrew(palavra);
  }
  return '';
}
