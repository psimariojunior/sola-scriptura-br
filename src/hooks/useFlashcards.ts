import { useState, useEffect, useCallback, useMemo } from 'react';
import { listarMarcas, type MarcaBiblia } from '@/lib/estudos';
import { livroPorAbreviacao } from '@/data/biblia/livros';

const FLASHCARD_KEY = 'sola-flashcards';

// SM-2 spaced repetition state
export interface FlashcardState {
  verseKey: string;
  easiness: number; // EF (easiness factor), starts at 2.5
  interval: number; // days
  repetitions: number; // consecutive correct reviews
  dueDate: number; // timestamp when next due
  lastReviewed: number | null;
  correctStreak: number; // longest/most-recent streak for stats
  manualReferencia?: string; // for user-added cards
  manualTexto?: string;
}

export interface VerseData {
  livro: string;
  capitulo: number;
  versiculo: number;
  traducao: string;
  texto: string;
  referencia: string;
}

const DAY_MS = 86400000;

function criarCard(verseKey: string): FlashcardState {
  return {
    verseKey,
    easiness: 2.5,
    interval: 0,
    repetitions: 0,
    dueDate: Date.now(),
    lastReviewed: null,
    correctStreak: 0,
  };
}

// SM-2 algorithm
function aplicarSM2(card: FlashcardState, quality: number): FlashcardState {
  // quality: 0-5; <3 means failure (resets repetitions)
  let { easiness, interval, repetitions } = card;

  // Update easiness factor
  easiness = easiness + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  if (easiness < 1.3) easiness = 1.3;

  if (quality < 3) {
    repetitions = 0;
    interval = 0; // due again same session
  } else {
    repetitions += 1;
    if (repetitions === 1) {
      interval = 1;
    } else if (repetitions === 2) {
      interval = 6;
    } else {
      interval = Math.round(interval * easiness);
    }
  }

  // Map quality to interval modifier: lower quality => shorter interval
  let dias = interval;
  if (quality === 3) dias = Math.max(1, Math.round(interval * 0.8));
  if (quality === 4) dias = interval;
  if (quality === 5) dias = Math.round(interval * 1.3) || 1;

  const novoStreak = quality >= 3 ? card.correctStreak + 1 : 0;

  return {
    ...card,
    easiness,
    interval: dias,
    repetitions,
    dueDate: Date.now() + dias * DAY_MS,
    lastReviewed: Date.now(),
    correctStreak: novoStreak,
  };
}

export interface StatsResumo {
  new: number;
  learning: number;
  review: number;
  known: number;
}

export function useFlashcards() {
  const [cards, setCards] = useState<FlashcardState[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const raw = localStorage.getItem(FLASHCARD_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw) as FlashcardState[];
      return Array.isArray(parsed) ? parsed : [];
    } catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem(FLASHCARD_KEY, JSON.stringify(cards));
  }, [cards]);

  const addCard = useCallback((verseKey: string, texto?: string, referencia?: string) => {
    setCards(prev => {
      if (prev.find(c => c.verseKey === verseKey)) return prev;
      const card = criarCard(verseKey);
      if (texto) card.manualTexto = texto;
      if (referencia) card.manualReferencia = referencia;
      return [...prev, card];
    });
  }, []);

  const addCardManual = useCallback((referencia: string, texto: string) => {
    setCards(prev => {
      const verseKey = `manual:${referencia.toLowerCase()}`;
      if (prev.find(c => c.verseKey === verseKey)) return prev;
      return [...prev, { ...criarCard(verseKey), manualReferencia: referencia, manualTexto: texto }];
    });
  }, []);

  const removeCard = useCallback((verseKey: string) => {
    setCards(prev => prev.filter(c => c.verseKey !== verseKey));
  }, []);

  const answer = useCallback((verseKey: string, correct: boolean) => {
    setCards(prev => prev.map(c => {
      if (c.verseKey !== verseKey) return c;
      return aplicarSM2(c, correct ? 4 : 1);
    }));
  }, []);

  // New SM-2 review with quality 0-5
  const review = useCallback((verseKey: string, quality: number) => {
    setCards(prev => prev.map(c => {
      if (c.verseKey !== verseKey) return c;
      return aplicarSM2(c, quality);
    }));
  }, []);

  const dueCards = useMemo(
    () => cards.filter(c => c.dueDate <= Date.now()).sort((a, b) => a.dueDate - b.dueDate),
    [cards]
  );
  const dueCount = dueCards.length;
  const totalCards = cards.length;

  const stats: StatsResumo = useMemo(() => ({
    new: cards.filter(c => c.repetitions === 0).length,
    learning: cards.filter(c => c.repetitions >= 1 && c.repetitions < 3).length,
    review: cards.filter(c => c.repetitions >= 3 && c.interval < 21).length,
    known: cards.filter(c => c.repetitions >= 3 && c.interval >= 21).length,
  }), [cards]);

  const learnedStreak = useMemo(() => {
    if (cards.length === 0) return 0;
    return cards.reduce((max, c) => Math.max(max, c.correctStreak), 0);
  }, [cards]);

  // Get full verse data for a card
  const getVerseData = useCallback((card: FlashcardState): VerseData | null => {
    const manualRef = card.manualReferencia;
    const manualTxt = card.manualTexto;
    if (manualRef) {
      return { livro: '', capitulo: 0, versiculo: 0, traducao: '', texto: manualTxt || '', referencia: manualRef };
    }
    const [livro, cap, ver, trad] = card.verseKey.split(':');
    const marks = listarMarcas() as MarcaBiblia[];
    const mark = marks.find(m =>
      m.livro === livro && m.capitulo === Number(cap) &&
      m.versiculo === Number(ver) && m.traducao === trad
    );
    const livroNome = livroPorAbreviacao.get(livro)?.nome || livro;
    const textoResolvido = card.manualTexto || mark?.texto || 'Versículo não encontrado nos seus marcadores.';
    return {
      livro,
      capitulo: Number(cap),
      versiculo: Number(ver),
      traducao: trad,
      texto: textoResolvido,
      referencia: card.manualReferencia || `${livroNome} ${cap}:${ver}`,
    };
  }, []);

  return {
    cards, dueCards, dueCount, totalCards, stats, learnedStreak,
    addCard, addCardManual, removeCard, answer, review, getVerseData,
  };
}
