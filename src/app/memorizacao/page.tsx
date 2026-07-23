'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Plus, Check, X, RotateCcw, Trash2, Play, Pause, Trophy } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import { cn } from '@/lib/utils';

interface Flashcard {
  id: string;
  verso: string;
  referencia: string;
  // SM-2 fields
  interval: number;      // dias até próxima revisão
  repetition: number;    // número de repetições bem-sucedidas
  easeFactor: number;    // fator de facilidade (min 1.3)
  nextReview: number;    // timestamp da próxima revisão
  lastReview: number;    // timestamp da última revisão
}

const SAMPLE_CARDS: Flashcard[] = [
  { id: '1', verso: 'Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.', referencia: 'João 3:16', interval: 1, repetition: 0, easeFactor: 2.5, nextReview: Date.now(), lastReview: 0 },
  { id: '2', verso: 'O Senhor é o meu pastor; nada me faltará.', referencia: 'Salmos 23:1', interval: 1, repetition: 0, easeFactor: 2.5, nextReview: Date.now(), lastReview: 0 },
  { id: '3', verso: 'Posso todas as coisas naquele que me fortalece.', referencia: 'Filipenses 4:13', interval: 1, repetition: 0, easeFactor: 2.5, nextReview: Date.now(), lastReview: 0 },
  { id: '4', verso: 'Confia no Senhor de todo o teu coração e não te estribes no teu próprio entendimento.', referencia: 'Provérbios 3:5', interval: 1, repetition: 0, easeFactor: 2.5, nextReview: Date.now(), lastReview: 0 },
  { id: '5', verso: 'Porque eu bem sei os pensamentos que penso de vós, diz o Senhor; pensamentos de paz, e não de mal, para vos dar o fim que esperais.', referencia: 'Jeremias 29:11', interval: 1, repetition: 0, easeFactor: 2.5, nextReview: Date.now(), lastReview: 0 },
  { id: '6', verso: 'Aquele que habita no esconderijo do Altíssimo, à sombra do Onipotente descansará.', referencia: 'Salmos 91:1', interval: 1, repetition: 0, easeFactor: 2.5, nextReview: Date.now(), lastReview: 0 },
  { id: '7', verso: 'Não temas, porque eu sou contigo; não te assombres, porque eu sou teu Deus; eu te fortaleço, e te ajudo, e te sustento com a destra da minha justiça.', referencia: 'Isaías 41:10', interval: 1, repetition: 0, easeFactor: 2.5, nextReview: Date.now(), lastReview: 0 },
  { id: '8', verso: 'Tudo posso naquele que me fortalece.', referencia: 'Filipenses 4:13', interval: 1, repetition: 0, easeFactor: 2.5, nextReview: Date.now(), lastReview: 0 },
];

function sm2(card: Flashcard, quality: number): Flashcard {
  // quality: 0 = blackout, 1 = difficult, 2 = hard, 3 = good, 4 = easy, 5 = perfect
  let { interval, repetition, easeFactor } = card;

  if (quality < 3) {
    repetition = 0;
    interval = 1;
  } else {
    if (repetition === 0) interval = 1;
    else if (repetition === 1) interval = 6;
    else interval = Math.round(interval * easeFactor);
    repetition++;
  }

  easeFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  if (easeFactor < 1.3) easeFactor = 1.3;

  return {
    ...card,
    interval,
    repetition,
    easeFactor,
    nextReview: Date.now() + interval * 24 * 60 * 60 * 1000,
    lastReview: Date.now(),
  };
}

type View = 'list' | 'study' | 'add';

export default function MemorizacaoPage() {
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [view, setView] = useState<View>('list');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [newVerso, setNewVerso] = useState('');
  const [newRef, setNewRef] = useState('');
  const [streak, setStreak] = useState(0);
  const [totalStudied, setTotalStudied] = useState(0);
  const [carregado, setCarregado] = useState(false);

  useEffect(() => {
    try {
      const dados = localStorage.getItem('ssb_flashcards');
      if (dados) setCards(JSON.parse(dados));
      else setCards(SAMPLE_CARDS);
    } catch { setCards(SAMPLE_CARDS); }
    setCarregado(true);
  }, []);

  const saveCards = useCallback((c: Flashcard[]) => {
    setCards(c);
    localStorage.setItem('ssb_flashcards', JSON.stringify(c));
  }, []);

  const dueCards = useMemo(() =>
    cards.filter(c => c.nextReview <= Date.now()).sort((a, b) => a.nextReview - b.nextReview),
    [cards]
  );

  const currentCard = dueCards[currentIndex];

  const handleRate = useCallback((quality: number) => {
    if (!currentCard) return;
    const updated = cards.map(c => c.id === currentCard.id ? sm2(c, quality) : c);
    saveCards(updated);
    if (quality >= 3) { setStreak(s => s + 1); setTotalStudied(t => t + 1); }
    else setStreak(0);
    setShowAnswer(false);
    if (currentIndex >= dueCards.length - 1) { setView('list'); setCurrentIndex(0); }
    else setCurrentIndex(i => i + 1);
  }, [currentCard, cards, currentIndex, dueCards.length, saveCards]);

  const addCard = useCallback(() => {
    if (!newVerso.trim() || !newRef.trim()) return;
    const card: Flashcard = {
      id: `fc-${Date.now()}`, verso: newVerso.trim(), referencia: newRef.trim(),
      interval: 1, repetition: 0, easeFactor: 2.5, nextReview: Date.now(), lastReview: 0,
    };
    saveCards([...cards, card]);
    setNewVerso(''); setNewRef(''); setView('list');
  }, [newVerso, newRef, cards, saveCards]);

  const deleteCard = useCallback((id: string) => {
    saveCards(cards.filter(c => c.id !== id));
  }, [cards, saveCards]);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16 px-6">
        <div className="max-w-2xl mx-auto">
          <ScrollReveal>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                  <Brain className="w-5 h-5 text-purple-500" />
                </div>
                <div>
                  <h1 className="font-display text-3xl font-light">Memorização</h1>
                  <p className="text-sm text-muted-foreground">Sistema de repetição espaçada (SM-2)</p>
                </div>
              </div>
              {view === 'list' && (
                <motion.button onClick={() => setView('add')} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-violet-500 text-white font-medium text-sm shadow-lg">
                  <Plus className="w-4 h-4" /> Novo Card
                </motion.button>
              )}
            </div>
          </ScrollReveal>

          {/* Stats */}
          {view === 'list' && (
            <div className="grid grid-cols-3 gap-3 mb-8">
              <div className="rounded-xl border border-border/50 bg-card/50 p-4 text-center">
                <p className="text-2xl font-bold text-primary">{dueCards.length}</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Para revisar</p>
              </div>
              <div className="rounded-xl border border-border/50 bg-card/50 p-4 text-center">
                <p className="text-2xl font-bold text-green-500">{streak}</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Sequência</p>
              </div>
              <div className="rounded-xl border border-border/50 bg-card/50 p-4 text-center">
                <p className="text-2xl font-bold text-amber-500">{totalStudied}</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Estudados</p>
              </div>
            </div>
          )}

          {/* ADD */}
          {view === 'add' && (
            <ScrollReveal>
              <div className="rounded-2xl border border-border/50 bg-card/50 p-6">
                <h2 className="font-display text-xl mb-4">Novo Flashcard</h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1 block">Referência</label>
                    <input type="text" value={newRef} onChange={e => setNewRef(e.target.value)} placeholder="ex: João 3:16"
                      className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1 block">Versículo</label>
                    <textarea value={newVerso} onChange={e => setNewVerso(e.target.value)} placeholder="Texto do versículo para memorizar..."
                      rows={4} className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none" />
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => setView('list')} className="flex-1 py-3 rounded-xl border border-border font-medium hover:bg-muted/50">Cancelar</button>
                    <motion.button onClick={addCard} disabled={!newVerso.trim() || !newRef.trim()} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                      className={cn('flex-1 py-3 rounded-xl font-semibold', newVerso.trim() && newRef.trim() ? 'bg-gradient-to-r from-purple-500 to-violet-500 text-white' : 'opacity-50 bg-muted')}>
                      Adicionar
                    </motion.button>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          )}

          {/* STUDY */}
          {view === 'study' && currentCard && (
            <div className="max-w-lg mx-auto">
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm text-muted-foreground">{currentIndex + 1}/{dueCards.length}</span>
                <button onClick={() => { setView('list'); setCurrentIndex(0); }} className="text-sm text-muted-foreground hover:text-foreground">
                  <X className="w-4 h-4 inline mr-1" /> Sair
                </button>
              </div>

              <AnimatePresence mode="wait">
                <motion.div key={currentCard.id} initial={{ opacity: 0, rotateY: -90 }} animate={{ opacity: 1, rotateY: 0 }}
                  exit={{ opacity: 0, rotateY: 90 }} transition={{ duration: 0.3 }}
                  className="rounded-2xl border border-border/50 bg-card/50 p-8 min-h-[300px] flex flex-col items-center justify-center text-center cursor-pointer"
                  onClick={() => setShowAnswer(true)}>
                  {!showAnswer ? (
                    <div>
                      <p className="text-2xl font-display font-light mb-4">{currentCard.referencia}</p>
                      <p className="text-sm text-muted-foreground">Toque para revelar</p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-lg leading-relaxed mb-6">{currentCard.verso}</p>
                      <div className="space-y-2">
                        <p className="text-xs text-muted-foreground mb-3">Como foi?</p>
                        <div className="flex gap-2 justify-center flex-wrap">
                          {[
                            { q: 0, label: 'Esqueci', color: 'bg-red-500 text-white' },
                            { q: 2, label: 'Difícil', color: 'bg-orange-500 text-white' },
                            { q: 3, label: 'Bom', color: 'bg-green-500 text-white' },
                            { q: 5, label: 'Fácil', color: 'bg-blue-500 text-white' },
                          ].map(({ q, label, color }) => (
                            <button key={q} onClick={(e) => { e.stopPropagation(); handleRate(q); }}
                              className={cn('px-4 py-2 rounded-xl font-medium text-sm', color)}>
                              {label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          )}

          {/* LIST */}
          {view === 'list' && (
            <>
              {dueCards.length > 0 && (
                <motion.button onClick={() => { setView('study'); setCurrentIndex(0); setShowAnswer(false); }}
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  className="w-full mb-6 py-4 rounded-xl bg-gradient-to-r from-purple-500 to-violet-500 text-white font-semibold shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2">
                  <Play className="w-5 h-5" /> Estudar {dueCards.length} cards
                </motion.button>
              )}

              <div className="space-y-2">
                {cards.map(card => {
                  const isDue = card.nextReview <= Date.now();
                  const daysUntil = Math.ceil((card.nextReview - Date.now()) / (24 * 60 * 60 * 1000));
                  return (
                    <div key={card.id} className={cn('rounded-xl border p-4 group transition-all',
                      isDue ? 'border-purple-500/30 bg-purple-500/5' : 'border-border/50 bg-card/50')}>
                      <div className="flex items-start gap-3">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm mb-1">{card.referencia}</p>
                          <p className="text-xs text-muted-foreground line-clamp-2">{card.verso}</p>
                          <div className="flex items-center gap-3 mt-2 text-[10px] text-muted-foreground">
                            <span>Repetições: {card.repetition}</span>
                            <span>Intervalo: {card.interval}d</span>
                            <span>{isDue ? '⏳ Agora' : `📅 ${daysUntil}d`}</span>
                          </div>
                        </div>
                        <button onClick={() => deleteCard(card.id)}
                          className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-red-500/10 text-red-500 transition-all">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {cards.length === 0 && (
                <div className="text-center py-12">
                  <Brain className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                  <p className="text-muted-foreground">Nenhum flashcard ainda. Crie um para começar!</p>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
