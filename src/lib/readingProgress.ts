'use client';

import { LIVROS_AT, LIVROS_NT } from '@/data/biblia/livros';

const STORAGE_KEY = 'ssb_chapters_read';
const BOOKMARK_KEY = 'ssb_chapter_bookmarks';

/** Aceita `gn:1` (plano/continuar) e `gn-1` (legado). */
function parseChapterKey(key: string): { abrev: string; cap: number } | null {
  const colon = key.lastIndexOf(':');
  const dash = key.lastIndexOf('-');
  const sep = Math.max(colon, dash);
  if (sep <= 0) return null;
  const abrev = key.substring(0, sep);
  const cap = parseInt(key.substring(sep + 1), 10);
  if (!abrev || Number.isNaN(cap)) return null;
  return { abrev, cap };
}

function chapterKeys(abreviacao: string, capitulo: number): string[] {
  return [`${abreviacao}:${capitulo}`, `${abreviacao}-${capitulo}`];
}

export interface BookProgress {
  abreviacao: string;
  nome: string;
  testamento: 'AT' | 'NT';
  totalCapitulos: number;
  lidos: number;
  percentual: number;
  capitulosLidos: Set<number>;
}

export function getBookProgressMap(): Map<string, BookProgress> {
  const map = new Map<string, BookProgress>();

  // Initialize all books
  const allBooks = [...LIVROS_AT, ...LIVROS_NT];
  for (const book of allBooks) {
    map.set(book.abreviacao, {
      abreviacao: book.abreviacao,
      nome: book.nome,
      testamento: book.testamento,
      totalCapitulos: book.totalCapitulos,
      lidos: 0,
      percentual: 0,
      capitulosLidos: new Set(),
    });
  }

  // Load read chapters
  if (typeof window === 'undefined') return map;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return map;
    const chapters: string[] = JSON.parse(raw);

    for (const key of chapters) {
      const parsed = parseChapterKey(key);
      if (!parsed) continue;
      const book = map.get(parsed.abrev);
      if (book) book.capitulosLidos.add(parsed.cap);
    }

    // Calculate percentages
    for (const book of map.values()) {
      book.lidos = book.capitulosLidos.size;
      book.percentual = book.totalCapitulos > 0
        ? Math.round((book.lidos / book.totalCapitulos) * 100)
        : 0;
    }
  } catch {}

  return map;
}

export function getBookReadChapters(abreviacao: string): Set<number> {
  if (typeof window === 'undefined') return new Set();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    const chapters: string[] = JSON.parse(raw);
    const result = new Set<number>();

    for (const key of chapters) {
      const parsed = parseChapterKey(key);
      if (parsed && parsed.abrev === abreviacao) result.add(parsed.cap);
    }
    return result;
  } catch {
    return new Set();
  }
}

export function isChapterRead(abreviacao: string, capitulo: number): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const chapters: string[] = JSON.parse(raw);
    return chapterKeys(abreviacao, capitulo).some((k) => chapters.includes(k));
  } catch {
    return false;
  }
}

export function markChapterRead(abreviacao: string, capitulo: number): void {
  if (typeof window === 'undefined') return;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const chapters: string[] = raw ? JSON.parse(raw) : [];
    const preferred = `${abreviacao}:${capitulo}`;
    if (!chapters.includes(preferred) && !chapters.includes(`${abreviacao}-${capitulo}`)) {
      chapters.push(preferred);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(chapters));
    }
  } catch {}
}

export interface ChapterBookmark {
  livro: string;
  capitulo: number;
  ts: number;
}

function loadBookmarks(): ChapterBookmark[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(BOOKMARK_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function getChapterBookmarks(): ChapterBookmark[] {
  return loadBookmarks().sort((a, b) => b.ts - a.ts);
}

export function isChapterBookmarked(livro: string, capitulo: number): boolean {
  return loadBookmarks().some((b) => b.livro === livro && b.capitulo === capitulo);
}

export function toggleChapterBookmark(livro: string, capitulo: number): boolean {
  const list = loadBookmarks();
  const idx = list.findIndex((b) => b.livro === livro && b.capitulo === capitulo);
  if (idx >= 0) {
    list.splice(idx, 1);
    localStorage.setItem(BOOKMARK_KEY, JSON.stringify(list));
    return false;
  }
  list.push({ livro, capitulo, ts: Date.now() });
  localStorage.setItem(BOOKMARK_KEY, JSON.stringify(list.slice(-80)));
  return true;
}
