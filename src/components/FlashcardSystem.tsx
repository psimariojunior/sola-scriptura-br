'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, RotateCcw, Check, X, ChevronRight, Sparkles, Clock, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface Flashcard {
  id: string;
  verseRef: string;
  verseText: string;
  hint?: string;
  category: string;
  difficulty: 'facil' | 'medio' | 'dificil';
  // SRS fields
  interval: number;      // days until next review
  repetitions: number;   // successful reviews in a row
  easeFactor: number;    // difficulty modifier (1.3-3.0)
  nextReview: number;    // timestamp of next review
  lastReview: number;    // timestamp of last review
}

interface FlashcardStats {
  total: number;
  dueToday: number;
  mastered: number;
  streak: number;
  totalReviews: number;
}

interface FlashcardSystemProps {
  cards: Flashcard[];
  onStatsUpdate?: (stats: FlashcardStats) => void;
}

// SM-2 Algorithm (SuperMemo)
function calculateNextReview(card: Flashcard, quality: number): Partial<Flashcard> {
  // quality: 0=blackout, 1=wrong, 2=hard, 3=good, 4=easy, 5=perfect
  let { interval, repetitions, easeFactor } = card;

  if (quality < 3) {
    // Failed - reset
    repetitions = 0;
    interval = 1;
  } else {
    // Success
    if (repetitions === 0) interval = 1;
    else if (repetitions === 1) interval = 6;
    else interval = Math.round(interval * easeFactor);
    repetitions += 1;
  }

  // Update ease factor
  easeFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  easeFactor = Math.max(1.3, easeFactor);

  const nextReview = Date.now() + interval * 24 * 60 * 60 * 1000;

  return { interval, repetitions, easeFactor, nextReview, lastReview: Date.now() };
}

function getCardStatus(card: Flashcard): 'new' | 'learning' | 'review' | 'mastered' {
  if (card.repetitions === 0) return 'new';
  if (card.repetitions < 3) return 'learning';
  if (card.interval >= 21) return 'mastered';
  return 'review';
}

const DIFFICULTY_COLORS = {
  facil: 'text-green-500 bg-green-500/10 border-green-500/30',
  medio: 'text-yellow-500 bg-yellow-500/10 border-yellow-500/30',
  dificil: 'text-red-500 bg-red-500/10 border-red-500/30',
};

const QUALITY_LABELS = [
  { quality: 0, label: 'Esqueci', emoji: '❌', color: 'bg-red-500 hover:bg-red-600' },
  { quality: 2, label: 'Difícil', emoji: '😰', color: 'bg-orange-500 hover:bg-orange-600' },
  { quality: 3, label: 'Bom', emoji: '👍', color: 'bg-blue-500 hover:bg-blue-600' },
  { quality: 4, label: 'Fácil', emoji: '😊', color: 'bg-green-500 hover:bg-green-600' },
  { quality: 5, label: 'Perfeito', emoji: '🎯', color: 'bg-purple-500 hover:bg-purple-600' },
];

export function FlashcardSystem({ cards, onStatsUpdate }: FlashcardSystemProps) {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [sessionCards, setSessionCards] = useState<Flashcard[]>([]);
  const [sessionStats, setSessionStats] = useState({ reviewed: 0, correct: 0, wrong: 0 });
  const [showStats, setShowStats] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  // Get due cards
  const dueCards = useMemo(() => {
    const now = Date.now();
    return cards.filter(c => c.nextReview <= now)
      .sort((a, b) => {
        // Prioritize: new > learning > review
        const order = { new: 0, learning: 1, review: 2, mastered: 3 };
        return order[getCardStatus(a)] - order[getCardStatus(b)];
      });
  }, [cards]);

  const stats: FlashcardStats = useMemo(() => {
    const now = Date.now();
    return {
      total: cards.length,
      dueToday: dueCards.length,
      mastered: cards.filter(c => getCardStatus(c) === 'mastered').length,
      streak: 0,
      totalReviews: cards.reduce((sum, c) => sum + c.repetitions, 0),
    };
  }, [cards, dueCards]);

  useEffect(() => {
    onStatsUpdate?.(stats);
  }, [stats, onStatsUpdate]);

  useEffect(() => {
    setSessionCards(dueCards.slice(0, 20)); // Max 20 per session
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setIsComplete(false);
    setSessionStats({ reviewed: 0, correct: 0, wrong: 0 });
  }, [dueCards]);

  const currentCard = sessionCards[currentCardIndex];

  const handleRate = useCallback((quality: number) => {
    if (!currentCard) return;

    const updates = calculateNextReview(currentCard, quality);
    const updatedCard = { ...currentCard, ...updates };

    // Update the card in the original array
    const cardIndex = cards.findIndex(c => c.id === currentCard.id);
    if (cardIndex !== -1) {
      cards[cardIndex] = updatedCard;
    }

    // Update session stats
    setSessionStats(prev => ({
      ...prev,
      reviewed: prev.reviewed + 1,
      correct: quality >= 3 ? prev.correct + 1 : prev.correct,
      wrong: quality < 3 ? prev.wrong + 1 : prev.wrong,
    }));

    // Save to localStorage
    try {
      const saved = localStorage.getItem('ssb_flashcards');
      if (saved) {
        const allCards = JSON.parse(saved);
        const idx = allCards.findIndex((c: Flashcard) => c.id === currentCard.id);
        if (idx !== -1) allCards[idx] = updatedCard;
        localStorage.setItem('ssb_flashcards', JSON.stringify(allCards));
      }
    } catch {}

    // Move to next card
    setIsFlipped(false);
    setTimeout(() => {
      if (currentCardIndex < sessionCards.length - 1) {
        setCurrentCardIndex(prev => prev + 1);
      } else {
        setIsComplete(true);
      }
    }, 300);
  }, [currentCard, currentCardIndex, sessionCards.length, cards]);

  const restart = () => {
    setSessionCards(dueCards.slice(0, 20));
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setIsComplete(false);
    setSessionStats({ reviewed: 0, correct: 0, wrong: 0 });
  };

  // No cards due
  if (dueCards.length === 0 && !isComplete) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}
          className="w-20 h-20 rounded-2xl bg-green-500/10 flex items-center justify-center mb-4">
          <Target className="w-10 h-10 text-green-500" />
        </motion.div>
        <h3 className="text-lg font-bold mb-2">Tudo em dia!</h3>
        <p className="text-sm text-[var(--content-muted)] mb-4">Nenhum flashcard para revisar agora.</p>
        <div className="flex gap-4 text-center">
          <div><div className="text-2xl font-bold text-[var(--brand)]">{stats.total}</div><div className="text-[10px] text-[var(--content-muted)]">Total</div></div>
          <div><div className="text-2xl font-bold text-green-500">{stats.mastered}</div><div className="text-[10px] text-[var(--content-muted)]">Dominados</div></div>
          <div><div className="text-2xl font-bold text-yellow-500">{stats.totalReviews}</div><div className="text-[10px] text-[var(--content-muted)]">Revisões</div></div>
        </div>
      </div>
    );
  }

  // Session complete
  if (isComplete) {
    const accuracy = sessionStats.reviewed > 0 ? Math.round((sessionStats.correct / sessionStats.reviewed) * 100) : 0;
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center">
        <motion.div initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', damping: 15 }} className="w-20 h-20 rounded-2xl bg-[var(--brand)]/10 flex items-center justify-center mb-4">
          <Sparkles className="w-10 h-10 text-[var(--brand)]" />
        </motion.div>
        <h3 className="text-lg font-bold mb-1">Sessão Completa!</h3>
        <p className="text-sm text-[var(--content-muted)] mb-6">Você revisou {sessionStats.reviewed} cards</p>
        <div className="flex gap-6 mb-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-500">{accuracy}%</div>
            <div className="text-[10px] text-[var(--content-muted)]">Precisão</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[var(--brand)]">{sessionStats.correct}</div>
            <div className="text-[10px] text-[var(--content-muted)]">Acertos</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-red-500">{sessionStats.wrong}</div>
            <div className="text-[10px] text-[var(--content-muted)]">Erros</div>
          </div>
        </div>
        <Button onClick={restart} className="bg-[var(--brand)] hover:bg-[var(--brand-hover)] text-white">
          <RotateCcw className="w-4 h-4 mr-2" /> Revisar Novamente
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)]/40">
        <div className="flex items-center gap-2">
          <Brain className="w-4 h-4 text-[var(--brand)]" />
          <span className="font-medium text-sm">Flashcards</span>
        </div>
        <div className="flex items-center gap-3 text-xs text-[var(--content-muted)]">
          <span>{currentCardIndex + 1}/{sessionCards.length}</span>
          <div className="w-20 h-1.5 bg-[var(--surface-raised)] rounded-full overflow-hidden">
            <div className="h-full bg-[var(--brand)] rounded-full transition-all" style={{ width: `${((currentCardIndex + 1) / sessionCards.length) * 100}%` }} />
          </div>
        </div>
      </div>

      {/* Card */}
      <div className="flex-1 flex items-center justify-center p-4">
        <AnimatePresence mode="wait">
          {currentCard && (
            <motion.div
              key={currentCard.id}
              initial={{ opacity: 0, scale: 0.9, rotateY: -90 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.9, rotateY: 90 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-md"
            >
              <button
                onClick={() => setIsFlipped(!isFlipped)}
                className={cn(
                  'w-full min-h-[300px] rounded-2xl border-2 p-6 text-center transition-all shadow-lg',
                  isFlipped
                    ? 'bg-[var(--brand)]/5 border-[var(--brand)]/30'
                    : 'bg-[var(--surface-raised)] border-[var(--border)] hover:border-[var(--brand)]/30'
                )}
              >
                {!isFlipped ? (
                  <div className="flex flex-col items-center justify-center h-full gap-4">
                    <span className={cn('text-[10px] font-medium px-2 py-0.5 rounded-full border', DIFFICULTY_COLORS[currentCard.difficulty])}>
                      {currentCard.difficulty}
                    </span>
                    <h3 className="text-xl font-bold text-[var(--content-primary)]">{currentCard.verseRef}</h3>
                    <p className="text-xs text-[var(--content-muted)]">Toque para ver o versículo</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full gap-4">
                    <p className="text-lg font-serif-body text-[var(--content-primary)] leading-relaxed italic">
                      &ldquo;{currentCard.verseText}&rdquo;
                    </p>
                    {currentCard.hint && (
                      <p className="text-xs text-[var(--content-muted)] mt-2">Dica: {currentCard.hint}</p>
                    )}
                  </div>
                )}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Rating buttons */}
      {isFlipped && currentCard && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="px-4 pb-4 space-y-2">
          <p className="text-center text-[10px] text-[var(--content-muted)] mb-2">Como foi sua memória?</p>
          <div className="flex gap-1.5">
            {QUALITY_LABELS.map(({ quality, label, emoji, color }) => (
              <motion.button key={quality} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                onClick={() => handleRate(quality)}
                className={cn('flex-1 py-2.5 rounded-xl text-white text-xs font-medium transition-colors', color)}>
                <div className="text-base mb-0.5">{emoji}</div>
                <div>{label}</div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {!isFlipped && currentCard && (
        <div className="px-4 pb-4">
          <Button onClick={() => setIsFlipped(true)} className="w-full bg-[var(--brand)] hover:bg-[var(--brand-hover)] text-white">
            Mostrar Resposta
          </Button>
        </div>
      )}
    </div>
  );
}

// Sample cards for demo
export const SAMPLE_FLASHCARDS: Flashcard[] = [
  { id: 'fc1', verseRef: 'João 3:16', verseText: 'Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.', category: 'Salvação', difficulty: 'facil', interval: 0, repetitions: 0, easeFactor: 2.5, nextReview: Date.now(), lastReview: 0 },
  { id: 'fc2', verseRef: 'Filipenses 4:13', verseText: 'Posso todas as coisas naquele que me fortalece.', category: 'Força', difficulty: 'facil', interval: 0, repetitions: 0, easeFactor: 2.5, nextReview: Date.now(), lastReview: 0 },
  { id: 'fc3', verseRef: 'Romanos 8:28', verseText: 'E sabemos que todas as coisas contribuem juntamente para o bem daqueles que amam a Deus, daqueles que são chamados segundo o seu propósito.', category: 'Propósito', difficulty: 'medio', interval: 0, repetitions: 0, easeFactor: 2.5, nextReview: Date.now(), lastReview: 0 },
  { id: 'fc4', verseRef: 'Isaías 40:31', verseText: 'Mas aqueles que esperam no Senhor renovarão as forças, subirão com asas como águias; correrão, e não se cansarão; caminharão, e não se fatigarão.', category: 'Esperança', difficulty: 'medio', interval: 0, repetitions: 0, easeFactor: 2.5, nextReview: Date.now(), lastReview: 0 },
  { id: 'fc5', verseRef: 'Salmos 23:1', verseText: 'O Senhor é o meu pastor; nada me faltará.', category: 'Confiança', difficulty: 'facil', interval: 0, repetitions: 0, easeFactor: 2.5, nextReview: Date.now(), lastReview: 0 },
  { id: 'fc6', verseRef: 'Efésios 2:8-9', verseText: 'Porque pela graça sois salvos, por meio da fé; e isto não vem de vós, é dom de Deus. Não vem das obras, para que ninguém se glorie.', category: 'Salvação', difficulty: 'medio', interval: 0, repetitions: 0, easeFactor: 2.5, nextReview: Date.now(), lastReview: 0 },
  { id: 'fc7', verseRef: 'Provérbios 3:5-6', verseText: 'Confia no Senhor de todo o teu coração, e não te estribes no teu próprio entendimento. Reconhece-o em todos os teus caminhos, e ele endireitará as tuas veredas.', category: 'Sabedoria', difficulty: 'dificil', interval: 0, repetitions: 0, easeFactor: 2.5, nextReview: Date.now(), lastReview: 0 },
  { id: 'fc8', verseRef: '2 Timóteo 1:7', verseText: 'Porque Deus não nos deu o espírito de temor, mas de fortaleza, e de amor, e de moderação.', category: 'Coragem', difficulty: 'facil', interval: 0, repetitions: 0, easeFactor: 2.5, nextReview: Date.now(), lastReview: 0 },
];
