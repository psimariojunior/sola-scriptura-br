'use client';

import { LIVROS_AT, LIVROS_NT } from '@/data/biblia/livros';

const STORAGE_KEY = 'ssb_chapters_read';

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
      // Format: "abrev-capitulo" (e.g., "gn-1", "rm-8")
      const lastDash = key.lastIndexOf('-');
      if (lastDash === -1) continue;
      const abrev = key.substring(0, lastDash);
      const capNum = parseInt(key.substring(lastDash + 1), 10);

      const book = map.get(abrev);
      if (book && !isNaN(capNum)) {
        book.capitulosLidos.add(capNum);
      }
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
      const lastDash = key.lastIndexOf('-');
      if (lastDash === -1) continue;
      const abrev = key.substring(0, lastDash);
      const capNum = parseInt(key.substring(lastDash + 1), 10);

      if (abrev === abreviacao && !isNaN(capNum)) {
        result.add(capNum);
      }
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
    const key = `${abreviacao}-${capitulo}`;
    return chapters.includes(key);
  } catch {
    return false;
  }
}
