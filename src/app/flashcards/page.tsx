'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import { useFlashcards } from '@/hooks/useFlashcards';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, RotateCcw, Check, X, BookOpen, BarChart3, ArrowRight, Sparkles } from 'lucide-react';

export default function FlashcardsPage() {
  const { cards, dueCards, dueCount, totalCards, addCard, removeCard, answer, getVerseData } = useFlashcards();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [showStats, setShowStats] = useState(false);

  const currentCard = dueCards[currentIdx];
  const currentData = currentCard ? getVerseData(currentCard) : null;

  const handleAnswer = (correct: boolean) => {
    if (!currentCard) return;
    answer(currentCard.verseKey, correct);
    setFlipped(false);
    setCurrentIdx(prev => Math.min(prev + 1, dueCards.length - 1));
  };

  const stats = {
    new: cards.filter(c => c.level === 0).length,
    learning: cards.filter(c => c.level === 1).length,
    review: cards.filter(c => c.level >= 2 && c.level <= 3).length,
    known: cards.filter(c => c.level >= 4).length,
  };

  if (showStats) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-24 pb-16 px-6">
          <div className="max-w-3xl mx-auto">
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-8">
                <button onClick={() => setShowStats(false)} className="p-2 rounded-lg hover:bg-[var(--bg)] transition-colors">
                  <ArrowRight className="w-5 h-5 rotate-180" />
                </button>
                <Brain className="w-6 h-6 text-[var(--primary)]" />
                <h1 className="font-display text-3xl font-light">Estatísticas</h1>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { label: 'Novos', value: stats.new, color: 'text-blue-500', bg: 'bg-blue-500/10' },
                  { label: 'Aprendendo', value: stats.learning, color: 'text-amber-500', bg: 'bg-amber-500/10' },
                  { label: 'Revisão', value: stats.review, color: 'text-purple-500', bg: 'bg-purple-500/10' },
                  { label: 'Conhecidos', value: stats.known, color: 'text-green-500', bg: 'bg-green-500/10' },
                ].map(s => (
                  <div key={s.label} className={`${s.bg} rounded-xl p-5 text-center`}>
                    <p className={`font-display text-4xl font-light ${s.color}`}>{s.value}</p>
                    <p className="text-xs text-[var(--muted-fg)] mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
              <div className="border border-[var(--border)]/50 rounded-xl p-5">
                <h3 className="text-xs font-semibold text-[var(--muted-fg)] uppercase tracking-wider mb-3">Progresso</h3>
                <div className="h-3 bg-[var(--border)]/30 rounded-full overflow-hidden flex">
                  {[
                    { value: stats.new, color: 'bg-blue-500' },
                    { value: stats.learning, color: 'bg-amber-500' },
                    { value: stats.review, color: 'bg-purple-500' },
                    { value: stats.known, color: 'bg-green-500' },
                  ].map(s => (
                    s.value > 0 && (
                      <motion.div
                        key={s.color}
                        className={`${s.color} h-full`}
                        initial={{ width: 0 }}
                        animate={{ width: `${(s.value / Math.max(totalCards, 1)) * 100}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    )
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16 px-6">
        <div className="max-w-2xl mx-auto">
          <ScrollReveal>
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-3">
                <Brain className="w-6 h-6 text-[var(--primary)]" />
                <div>
                  <h1 className="font-display text-3xl font-light">Flashcards</h1>
                  <p className="text-xs text-[var(--muted-fg)]">{dueCount} pendentes · {totalCards} total</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setShowStats(true)} className="p-2 rounded-lg hover:bg-[var(--bg)] transition-colors">
                  <BarChart3 className="w-4 h-4 text-[var(--muted-fg)]" />
                </button>
              </div>
            </div>
          </ScrollReveal>

          {dueCards.length === 0 ? (
            <ScrollReveal>
              <div className="text-center py-16">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6"
                >
                  <Check className="w-10 h-10 text-green-500" />
                </motion.div>
                <h2 className="font-display text-2xl font-light mb-2">Tudo revisado!</h2>
                <p className="text-sm text-[var(--muted-fg)] mb-6">
                  {totalCards === 0
                    ? 'Adicione flashcards dos seus versículos favoritos na Bíblia.'
                    : 'Volte mais tarde para novas revisões.'}
                </p>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-xs text-[var(--muted-fg)]">{stats.new} novos · {stats.learning} aprendendo · {stats.known} conhecidos</span>
                </div>
                {totalCards === 0 && (
                  <Link
                    href="/biblia"
                    className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-[var(--primary)]/90 transition-all"
                  >
                    <BookOpen className="w-4 h-4" />
                    Ir para a Bíblia
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
              </div>
            </ScrollReveal>
          ) : currentData && (
            <div className="space-y-6">
              {/* Progress indicator */}
              <div className="flex items-center gap-3">
                <div className="flex-1 h-1.5 bg-[var(--border)]/30 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-[var(--primary)] rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentIdx + 1) / dueCards.length) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <span className="text-[10px] font-mono text-[var(--muted-fg)]">{currentIdx + 1}/{dueCards.length}</span>
              </div>

              {/* Card */}
              <motion.div
                key={currentIdx}
                initial={{ opacity: 0, rotateY: -90 }}
                animate={{ opacity: 1, rotateY: 0 }}
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="perspective-[1200px]"
              >
                <motion.div
                  onClick={() => setFlipped(!flipped)}
                  className="relative cursor-pointer"
                  animate={{ rotateY: flipped ? 180 : 0 }}
                  transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                  style={{ transformStyle: 'preserve-3d', minHeight: '260px' }}
                >
                  {/* Front */}
                  <div
                    className="absolute inset-0 backface-hidden border border-[var(--border)] rounded-2xl p-8 flex flex-col items-center justify-center text-center bg-[var(--card-bg)]"
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    <p className="text-xs text-[var(--primary)] font-semibold mb-4">{currentData.referencia}</p>
                    <p className="font-serif-body text-lg leading-relaxed text-[var(--fg)]/90">{currentData.texto}</p>
                    <p className="text-[10px] text-[var(--muted-fg)] mt-6">Clique para ver a tradução</p>
                  </div>

                  {/* Back */}
                  <div
                    className="absolute inset-0 backface-hidden border border-[var(--border)] rounded-2xl p-8 flex flex-col items-center justify-center text-center bg-[var(--card-bg)]"
                    style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                  >
                    <p className="text-xs text-[var(--primary)] font-semibold mb-4">{currentData.referencia}</p>
                    <p className="font-serif-body text-lg leading-relaxed text-[var(--fg)]/90">{currentData.traducao}</p>
                    <p className="text-xs text-[var(--muted-fg)] mt-4">{currentData.texto}</p>
                  </div>
                </motion.div>
              </motion.div>

              {/* Answer buttons */}
              {flipped && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-center gap-4"
                >
                  <motion.button
                    onClick={() => handleAnswer(false)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-all text-sm font-semibold"
                  >
                    <X className="w-5 h-5" /> Não lembrei
                  </motion.button>
                  <motion.button
                    onClick={() => handleAnswer(true)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-green-500/10 text-green-500 hover:bg-green-500/20 transition-all text-sm font-semibold"
                  >
                    <Check className="w-5 h-5" /> Lembrei
                  </motion.button>
                </motion.div>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
