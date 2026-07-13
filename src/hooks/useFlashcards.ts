import { useState, useEffect, useCallback } from 'react';
import { listarMarcas, type MarcaBiblia } from '@/lib/estudos';
import { livroPorAbreviacao } from '@/data/biblia';

const FLASHCARD_KEY = 'ssb_flashcards';

interface FlashcardState {
  verseKey: string;
  level: number; // 0=new, 1=learning, 2=review, 3=known
  nextReview: number; // timestamp
  correctStreak: number;
}

// Spaced repetition intervals (in hours)
const INTERVALS = [0, 4, 24, 72, 168, 720]; // 0, 4h, 1d, 3d, 1w, 1m

export function useFlashcards() {
  const [cards, setCards] = useState<FlashcardState[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      return JSON.parse(localStorage.getItem(FLASHCARD_KEY) || '[]');
    } catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem(FLASHCARD_KEY, JSON.stringify(cards));
  }, [cards]);

  const addCard = useCallback((verseKey: string) => {
    setCards(prev => {
      if (prev.find(c => c.verseKey === verseKey)) return prev;
      return [...prev, { verseKey, level: 0, nextReview: Date.now(), correctStreak: 0 }];
    });
  }, []);

  const removeCard = useCallback((verseKey: string) => {
    setCards(prev => prev.filter(c => c.verseKey !== verseKey));
  }, []);

  const answer = useCallback((verseKey: string, correct: boolean) => {
    setCards(prev => prev.map(c => {
      if (c.verseKey !== verseKey) return c;
      if (correct) {
        const newStreak = c.correctStreak + 1;
        const newLevel = Math.min(c.level + 1, INTERVALS.length - 1);
        const hours = INTERVALS[newLevel];
        return {
          ...c,
          level: newLevel,
          nextReview: Date.now() + hours * 3600000,
          correctStreak: newStreak,
        };
      } else {
        return {
          ...c,
          level: Math.max(0, c.level - 1),
          nextReview: Date.now() + 3600000, // 1 hour
          correctStreak: 0,
        };
      }
    }));
  }, []);

  const dueCards = cards.filter(c => c.nextReview <= Date.now()).sort((a, b) => a.nextReview - b.nextReview);
  const dueCount = dueCards.length;
  const totalCards = cards.length;

  // Get full verse data for a card
  const getVerseData = useCallback((card: FlashcardState) => {
    const [livro, cap, ver, trad] = card.verseKey.split(':');
    const marks = listarMarcas();
    const mark = marks.find(m =>
      m.livro === livro && m.capitulo === Number(cap) &&
      m.versiculo === Number(ver) && m.traducao === trad
    );
    const livroNome = livroPorAbreviacao.get(livro)?.nome || livro;
    return {
      livro,
      capitulo: Number(cap),
      versiculo: Number(ver),
      traducao: trad,
      texto: mark?.texto || '',
      referencia: `${livroNome} ${cap}:${ver}`,
    };
  }, []);

  return { cards, dueCards, dueCount, totalCards, addCard, removeCard, answer, getVerseData };
}
