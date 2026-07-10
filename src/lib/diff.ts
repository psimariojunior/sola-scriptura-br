/**
 * Compara duas strings e retorna segmentos de diff.
 * Retorna os tokens do texto B (compare), marcando quais são diferentes de A.
 */

interface DiffSegment {
  text: string;
  changed: boolean;
}

function tokenize(text: string): string[] {
  return text.split(/(\s+|[.,;:!?""()[\]—–-])/).filter(Boolean);
}

function lcs(a: string[], b: string[]): number[][] {
  const m = a.length, n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i - 1].toLowerCase() === b[j - 1].toLowerCase()) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  return dp;
}

function backtrack(dp: number[][], a: string[], b: string[]): Set<number> {
  const changedB = new Set<number>();
  let i = a.length, j = b.length;
  const matchedB = new Set<number>();

  while (i > 0 && j > 0) {
    if (a[i - 1].toLowerCase() === b[j - 1].toLowerCase()) {
      matchedB.add(j - 1);
      i--; j--;
    } else if (dp[i - 1][j] > dp[i][j - 1]) {
      i--;
    } else {
      j--;
    }
  }

  for (let k = 0; k < b.length; k++) {
    if (!matchedB.has(k)) changedB.add(k);
  }
  return changedB;
}

/**
 * Compara original (base) com compare (outra tradução).
 * Retorna os tokens do compare, marcando quais são diferentes.
 */
export function diffWords(original: string, compare: string): DiffSegment[] {
  const tokensA = tokenize(original);
  const tokensB = tokenize(compare);
  const dp = lcs(tokensA, tokensB);
  const changedIndices = backtrack(dp, tokensA, tokensB);

  return tokensB.map((token, i) => ({
    text: token,
    changed: changedIndices.has(i),
  }));
}

export function diffToHtml(segments: DiffSegment[]): string {
  return segments.map(s =>
    s.changed
      ? `<span class="diff-word">${escapeHtml(s.text)}</span>`
      : escapeHtml(s.text)
  ).join('');
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
