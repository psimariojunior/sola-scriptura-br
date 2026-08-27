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

const PT_STOP = new Set([
  'o', 'a', 'os', 'as', 'um', 'uma', 'uns', 'umas',
  'de', 'do', 'da', 'dos', 'das', 'e', 'ou', 'que', 'se',
  'em', 'no', 'na', 'nos', 'nas', 'por', 'para', 'com', 'sem',
  'ao', 'aos', 'pelo', 'pela', 'pelos', 'pelas',
  'é', 'foi', 'são', 'não', 'ja', 'mais', 'como', 'lhe', 'lhes',
  'seu', 'sua', 'seus', 'suas', 'ele', 'ela', 'eles', 'elas',
  'este', 'esta', 'isto', 'esse', 'essa', 'isso', 'aquele', 'aquela',
]);

function norm(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\p{L}\p{N}]+/gu, '');
}

function matchScore(ptWord: string, strong: PalavraStrong): number {
  const pt = norm(ptWord);
  if (pt.length < 3 || PT_STOP.has(pt)) return 0;

  const def = norm(strong.definicao || '');
  const trans = norm(strong.transliteracao || '');
  if (!def && !trans) return 0;
  if (def === pt || trans === pt) return 10;

  const defParts = (strong.definicao || '')
    .split(/[,;/()|]|\be\b|\bou\b/i)
    .map((t) => norm(t))
    .filter((t) => t.length >= 3);

  if (defParts.some((t) => t === pt)) return 9;
  if (defParts.some((t) => t.startsWith(pt) || (pt.startsWith(t) && t.length >= 4))) return 7;
  if (pt.length >= 4 && (def.includes(pt) || trans.includes(pt))) return 6;
  if (pt.length >= 5 && def.includes(pt.slice(0, 5))) return 4;
  return 0;
}

/** Alinha palavras da tradução com Strong's: primeiro por definição, depois pela ordem. */
export function alignSequences(ptWords: string[], strongs: PalavraStrong[]): (number | null)[] {
  const n = ptWords.length;
  const m = strongs.length;
  if (m === 0) return ptWords.map(() => null);
  if (n === 0) return [];

  const alignment: (number | null)[] = new Array(n).fill(null);
  const usedStrong = new Set<number>();
  const usedPt = new Set<number>();

  const candidates: { i: number; j: number; score: number; dist: number }[] = [];
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      const score = matchScore(ptWords[i], strongs[j]);
      if (score < 4) continue;
      candidates.push({
        i,
        j,
        score,
        dist: Math.abs(i / Math.max(n, 1) - j / Math.max(m, 1)),
      });
    }
  }
  candidates.sort((a, b) => b.score - a.score || a.dist - b.dist);

  for (const c of candidates) {
    if (usedPt.has(c.i) || usedStrong.has(c.j)) continue;
    alignment[c.i] = c.j;
    usedPt.add(c.i);
    usedStrong.add(c.j);
  }

  let j = 0;
  for (let i = 0; i < n; i++) {
    if (alignment[i] !== null) continue;
    while (j < m && usedStrong.has(j)) j++;
    if (j >= m) break;

    let crosses = false;
    for (let k = i + 1; k < n; k++) {
      const later = alignment[k];
      if (later !== null && j > later) {
        crosses = true;
        break;
      }
    }
    if (crosses) continue;

    alignment[i] = j;
    usedStrong.add(j);
    j++;
  }

  return alignment;
}

export async function alinharVersiculo(
  livro: string,
  capitulo: number,
  verNumero: number,
  textoPt: string,
): Promise<PalavraAlinhada[]> {
  const mod = await import('@/data/biblia/strong');
  const strongs = await mod.getStrongPorVersiculo(livro, capitulo, verNumero) ?? [];
  const words = textoPt.split(/\s+/).filter(Boolean);
  if (strongs.length === 0) {
    return words.map((w) => ({
      texto: w,
      strong: null,
      palavraOriginal: null,
      transliteracao: null,
      definicao: null,
      morfologia: null,
      idioma: null,
    }));
  }
  const alignment = alignSequences(words, strongs);
  return words.map((w, i) => {
    const idx = alignment[i];
    if (idx !== null && idx !== undefined && idx >= 0 && idx < strongs.length) {
      const s = strongs[idx];
      return {
        texto: w,
        strong: s.strong,
        palavraOriginal: s.palavra,
        transliteracao: s.transliteracao,
        definicao: s.definicao,
        morfologia: s.morfologia,
        idioma: s.idioma,
      };
    }
    return {
      texto: w,
      strong: null,
      palavraOriginal: null,
      transliteracao: null,
      definicao: null,
      morfologia: null,
      idioma: null,
    };
  });
}
