import type { PalavraStrong } from '@/data/biblia/strong';

export interface PalavraAlinhada {
  texto: string;
  strong: string | null;
  palavraOriginal: string | null;
  transliteracao: string | null;
  definicao: string | null;
  morfologia: string | null;
  idioma: 'grego' | 'hebraico' | null;
}

export function alignSequences(ptWords: string[], strongs: PalavraStrong[]): (number | null)[] {
  const n = ptWords.length;
  const m = strongs.length;
  if (m === 0) return ptWords.map(() => null);
  if (n === 0) return [];

  const GAP_PENALTY = 1;

  const dp: number[][] = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));
  const trace: number[][][] = Array.from({ length: n + 1 }, () =>
    Array.from({ length: m + 1 }, () => [0, 0, 0])
  );

  for (let i = 0; i <= n; i++) { dp[i][0] = i * GAP_PENALTY; trace[i][0] = [0, 1, 0]; }
  for (let j = 0; j <= m; j++) { dp[0][j] = j * GAP_PENALTY; trace[0][j] = [0, 0, 1]; }

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      const match = dp[i - 1][j - 1];
      const gapPt = dp[i - 1][j] + GAP_PENALTY;
      const gapStrong = dp[i][j - 1] + GAP_PENALTY;

      if (match <= gapPt && match <= gapStrong) {
        dp[i][j] = match;
        trace[i][j] = [1, 0, 0];
      } else if (gapPt <= gapStrong) {
        dp[i][j] = gapPt;
        trace[i][j] = [0, 1, 0];
      } else {
        dp[i][j] = gapStrong;
        trace[i][j] = [0, 0, 1];
      }
    }
  }

  const alignment: (number | null)[] = new Array(n).fill(null);
  let i = n, j = m;
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && trace[i][j][0]) {
      alignment[i - 1] = j - 1;
      i--; j--;
    } else if (i > 0 && trace[i][j][1]) {
      i--;
    } else if (j > 0 && trace[i][j][2]) {
      j--;
    } else {
      break;
    }
  }

  return alignment;
}

export async function alinharVersiculo(livro: string, capitulo: number, verNumero: number, textoPt: string): Promise<PalavraAlinhada[]> {
  const mod = await import('@/data/biblia/strong');
  const strongs = await mod.getStrongPorVersiculo(livro, capitulo, verNumero) ?? [];
  const words = textoPt.split(/\s+/);
  if (strongs.length === 0) {
    return words.map(w => ({
      texto: w, strong: null, palavraOriginal: null, transliteracao: null, definicao: null, morfologia: null, idioma: null,
    }));
  }
  const alignment = alignSequences(words, strongs);
  return words.map((w, i) => {
    const idx = alignment[i];
    if (idx !== null && idx !== undefined && idx >= 0 && idx < strongs.length) {
      const s = strongs[idx];
      return { texto: w, strong: s.strong, palavraOriginal: s.palavra, transliteracao: s.transliteracao, definicao: s.definicao, morfologia: s.morfologia, idioma: s.idioma };
    }
    return { texto: w, strong: null, palavraOriginal: null, transliteracao: null, definicao: null, morfologia: null, idioma: null };
  });
}
