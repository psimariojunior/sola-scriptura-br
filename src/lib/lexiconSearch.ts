import { palavrasGregas, type PalavraGrega } from '@/data/lexicon/grego';
import { palavrasHebraicas, type PalavraHebraica } from '@/data/lexicon/hebraico';

export type LexiconEntry = PalavraGrega | PalavraHebraica;

export interface LexiconResult {
  entry: LexiconEntry;
  score: number;
}

const searchCache = new Map<string, LexiconResult[] | null>();
const strongCache = new Map<string, LexiconEntry | null>();

const STRONG_MAP = new Map<string, LexiconEntry>();

function buildStrongIndex() {
  if (STRONG_MAP.size > 0) return;
  for (const entry of palavrasGregas) {
    STRONG_MAP.set(entry.strong.toUpperCase(), entry);
  }
  for (const entry of palavrasHebraicas) {
    STRONG_MAP.set(entry.strong.toUpperCase(), entry);
  }
}

function normalize(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s]/g, '')
    .trim();
}

function tokenize(text: string): string[] {
  return normalize(text)
    .split(/\s+/)
    .filter((t) => t.length > 0);
}

function levenshtein(a: string, b: string): number {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  const matrix: number[][] = [];

  for (let i = 0; i <= b.length; i++) matrix[i] = [i];
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      const cost = b.charAt(i - 1) === a.charAt(j - 1) ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      );
    }
  }

  return matrix[b.length][a.length];
}

function scoreMatch(query: string, entry: LexiconEntry): number {
  const q = normalize(query);
  const transliteration = normalize(entry.transliteracao);
  const definicao = normalize(entry.definicao);

  if (transliteration === q || definicao.includes(q)) return 1.0;

  if (transliteration.includes(q) || q.includes(transliteration)) return 0.85;

  const maxLen = Math.max(q.length, transliteration.length);
  const dist = levenshtein(q, transliteration);
  if (dist <= 2 && maxLen <= 12) {
    return 0.7 + (1 - dist / maxLen) * 0.2;
  }

  const words = definicao.split(/\s+/);
  for (const word of words) {
    if (normalize(word) === q) return 0.6;
  }

  return 0;
}

export function getStrongByNumber(number: string): LexiconEntry | null {
  buildStrongIndex();
  const key = number.toUpperCase().trim();
  const cached = strongCache.get(key);
  if (cached !== undefined) return cached;

  const entry = STRONG_MAP.get(key) ?? null;
  strongCache.set(key, entry);
  return entry;
}

export function findWordInText(word: string): LexiconResult[] {
  const cacheKey = normalize(word);
  const cached = searchCache.get(cacheKey);
  if (cached !== undefined) return cached ?? [];

  const results: LexiconResult[] = [];

  for (const entry of palavrasGregas) {
    const score = scoreMatch(word, entry);
    if (score > 0) results.push({ entry, score });
  }

  for (const entry of palavrasHebraicas) {
    const score = scoreMatch(word, entry);
    if (score > 0) results.push({ entry, score });
  }

  results.sort((a, b) => b.score - a.score);

  if (results.length > 10) results.length = 10;

  searchCache.set(cacheKey, results.length > 0 ? results : null);
  return results;
}

export function isHebrewStrong(strong: string): boolean {
  return strong.toUpperCase().startsWith('H');
}

export function isGreekStrong(strong: string): boolean {
  return strong.toUpperCase().startsWith('G');
}
