'use client';

import { useState, useEffect, useCallback, useMemo, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain, RotateCcw, Check, X, ChevronRight, Sparkles, Target,
  Plus, Trash2, List, BookOpen, Search, Filter, Layers
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { useFlashcards, type FlashcardState } from '@/hooks/useFlashcards';

const CATEGORIES = [
  'Todas', 'Salvação', 'Força', 'Propósito', 'Esperança',
  'Confiança', 'Sabedoria', 'Coragem', 'Amor', 'Oração', 'Louvor',
];

const CATEGORY_COLORS: Record<string, string> = {
  Salvação: 'bg-green-500/10 text-green-600 border-green-500/30',
  Força: 'bg-blue-500/10 text-blue-600 border-blue-500/30',
  Propósito: 'bg-purple-500/10 text-purple-600 border-purple-500/30',
  Esperança: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/30',
  Confiança: 'bg-teal-500/10 text-teal-600 border-teal-500/30',
  Sabedoria: 'bg-amber-500/10 text-amber-600 border-amber-500/30',
  Coragem: 'bg-red-500/10 text-red-600 border-red-500/30',
  Amor: 'bg-pink-500/10 text-pink-600 border-pink-500/30',
  Oração: 'bg-indigo-500/10 text-indigo-600 border-indigo-500/30',
  Louvor: 'bg-orange-500/10 text-orange-600 border-orange-500/30',
};

function getCategoryForCard(card: FlashcardState): string {
  const ref = card.manualReferencia || '';
  const txt = (card.manualTexto || '').toLowerCase();
  if (txt.includes('salvo') || txt.includes('etern') || txt.includes('graça') || ref.includes('João 3')) return 'Salvação';
  if (txt.includes('fortalec') || txt.includes('força') || txt.includes('poder')) return 'Força';
  if (txt.includes('propósito') || txt.includes('chamado') || txt.includes('propósito')) return 'Propósito';
  if (txt.includes('espera') || txt.includes('esperança') || txt.includes('renov')) return 'Esperança';
  if (txt.includes('confia') || txt.includes('pastor') || txt.includes('falta')) return 'Confiança';
  if (txt.includes('sabedoria') || txt.includes('entend')) return 'Sabedoria';
  if (txt.includes('temor') || txt.includes('coragem') || txt.includes('fortaleza')) return 'Coragem';
  if (txt.includes('amor') || txt.includes('amou')) return 'Amor';
  if (txt.includes('orac') || txt.includes('orar')) return 'Oração';
  if (txt.includes('louv') || txt.includes('cant')) return 'Louvor';
  return 'Salvação';
}

const QUALITY_LABELS = [
  { quality: 0, label: 'Esqueci', emoji: '❌', color: 'bg-red-500 hover:bg-red-600' },
  { quality: 2, label: 'Difícil', emoji: '😰', color: 'bg-orange-500 hover:bg-orange-600' },
  { quality: 3, label: 'Bom', emoji: '👍', color: 'bg-blue-500 hover:bg-blue-600' },
  { quality: 4, label: 'Fácil', emoji: '😊', color: 'bg-green-500 hover:bg-green-600' },
  { quality: 5, label: 'Perfeito', emoji: '🎯', color: 'bg-purple-500 hover:bg-purple-600' },
];

function getStatusLabel(card: FlashcardState): { label: string; color: string } {
  if (card.repetitions === 0) return { label: 'Novo', color: 'bg-blue-500/10 text-blue-500 border-blue-500/30' };
  if (card.repetitions < 3) return { label: 'Aprendendo', color: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30' };
  if (card.interval >= 21) return { label: 'Dominado', color: 'bg-green-500/10 text-green-500 border-green-500/30' };
  return { label: 'Revisão', color: 'bg-purple-500/10 text-purple-500 border-purple-500/30' };
}

export const FlashcardSystem = memo(function FlashcardSystem() {
  const {
    cards, dueCards, dueCount, totalCards, stats, learnedStreak,
    addCardManual, removeCard, review, getVerseData,
  } = useFlashcards();

  const [mode, setMode] = useState<'review' | 'manage'>('review');
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [sessionCards, setSessionCards] = useState<FlashcardState[]>([]);
  const [sessionStats, setSessionStats] = useState({ reviewed: 0, correct: 0, wrong: 0 });
  const [isComplete, setIsComplete] = useState(false);

  // Manage mode state
  const [newRef, setNewRef] = useState('');
  const [newText, setNewText] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('Todas');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const sortedDue = useMemo(() => {
    return [...dueCards].sort((a, b) => {
      const order: Record<string, number> = { new: 0, learning: 1, review: 2, mastered: 3 };
      const sa = a.repetitions === 0 ? 'new' : a.repetitions < 3 ? 'learning' : a.interval >= 21 ? 'mastered' : 'review';
      const sb = b.repetitions === 0 ? 'new' : b.repetitions < 3 ? 'learning' : b.interval >= 21 ? 'mastered' : 'review';
      return (order[sa] ?? 0) - (order[sb] ?? 0);
    });
  }, [dueCards]);

  useEffect(() => {
    setSessionCards(sortedDue.slice(0, 20));
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setIsComplete(false);
    setSessionStats({ reviewed: 0, correct: 0, wrong: 0 });
  }, [sortedDue]);

  const currentCard = sessionCards[currentCardIndex];
  const currentVerse = currentCard ? getVerseData(currentCard) : null;

  const handleRate = useCallback((quality: number) => {
    if (!currentCard) return;
    review(currentCard.verseKey, quality);

    setSessionStats(prev => ({
      ...prev,
      reviewed: prev.reviewed + 1,
      correct: quality >= 3 ? prev.correct + 1 : prev.correct,
      wrong: quality < 3 ? prev.wrong + 1 : prev.wrong,
    }));

    setIsFlipped(false);
    setTimeout(() => {
      if (currentCardIndex < sessionCards.length - 1) {
        setCurrentCardIndex(prev => prev + 1);
      } else {
        setIsComplete(true);
      }
    }, 300);
  }, [currentCard, currentCardIndex, sessionCards.length, review]);

  const restart = useCallback(() => {
    setSessionCards(sortedDue.slice(0, 20));
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setIsComplete(false);
    setSessionStats({ reviewed: 0, correct: 0, wrong: 0 });
  }, [sortedDue]);

  const handleAddCard = useCallback(() => {
    if (!newRef.trim() || !newText.trim()) return;
    addCardManual(newRef.trim(), newText.trim());
    setNewRef('');
    setNewText('');
    setShowAddForm(false);
  }, [newRef, newText, addCardManual]);

  const filteredCards = useMemo(() => {
    let result = cards;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(c => {
        const verse = getVerseData(c);
        return (verse?.referencia || '').toLowerCase().includes(q)
          || (verse?.texto || '').toLowerCase().includes(q)
          || c.verseKey.toLowerCase().includes(q);
      });
    }
    if (categoryFilter !== 'Todas') {
      result = result.filter(c => getCategoryForCard(c) === categoryFilter);
    }
    return result;
  }, [cards, searchQuery, categoryFilter, getVerseData]);

  // ─── REVIEW MODE ────────────────────────────────────────

  const renderReviewMode = () => {
    if (cards.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center h-full p-8 text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}
            className="w-20 h-20 rounded-2xl bg-[var(--brand)]/10 flex items-center justify-center mb-4">
            <Brain className="w-10 h-10 text-[var(--brand)]" />
          </motion.div>
          <h3 className="text-lg font-bold mb-2">Nenhum flashcard</h3>
          <p className="text-sm text-[var(--content-muted)] mb-4">Crie cards na aba Gerenciar ou importe dos seus marcadores.</p>
          <Button onClick={() => setMode('manage')} className="bg-[var(--brand)] hover:bg-[var(--brand-hover)] text-white">
            <Plus className="w-4 h-4 mr-2" /> Criar Cards
          </Button>
        </div>
      );
    }

    if (dueCount === 0 && !isComplete) {
      return (
        <div className="flex flex-col items-center justify-center h-full p-8 text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}
            className="w-20 h-20 rounded-2xl bg-green-500/10 flex items-center justify-center mb-4">
            <Target className="w-10 h-10 text-green-500" />
          </motion.div>
          <h3 className="text-lg font-bold mb-2">Tudo em dia!</h3>
          <p className="text-sm text-[var(--content-muted)] mb-4">Nenhum flashcard para revisar agora.</p>
          <div className="flex gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-[var(--brand)]">{stats.new + stats.learning + stats.review + stats.known}</div>
              <div className="text-[10px] text-[var(--content-muted)]">Total</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-500">{stats.known}</div>
              <div className="text-[10px] text-[var(--content-muted)]">Dominados</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-500">{learnedStreak}</div>
              <div className="text-[10px] text-[var(--content-muted)]">Sequência</div>
            </div>
          </div>
        </div>
      );
    }

    if (isComplete) {
      const accuracy = sessionStats.reviewed > 0
        ? Math.round((sessionStats.correct / sessionStats.reviewed) * 100) : 0;
      return (
        <div className="flex flex-col items-center justify-center h-full p-8 text-center">
          <motion.div initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', damping: 15 }}
            className="w-20 h-20 rounded-2xl bg-[var(--brand)]/10 flex items-center justify-center mb-4">
            <Sparkles className="w-10 h-10 text-[var(--brand)]" />
          </motion.div>
          <h3 className="text-lg font-bold mb-1">Sessão Completa!</h3>
          <p className="text-sm text-[var(--content-muted)] mb-6">
            Você revisou {sessionStats.reviewed} cards
          </p>
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

    const category = currentCard ? getCategoryForCard(currentCard) : '';

    return (
      <div className="flex flex-col h-full">
        {/* Progress header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)]/40">
          <div className="flex items-center gap-2">
            <Brain className="w-4 h-4 text-[var(--brand)]" />
            <span className="font-medium text-sm">Revisão</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-[var(--content-muted)]">
            <span>{currentCardIndex + 1}/{sessionCards.length}</span>
            <div className="w-20 h-1.5 bg-[var(--surface-raised)] rounded-full overflow-hidden">
              <div className="h-full bg-[var(--brand)] rounded-full transition-all"
                style={{ width: `${((currentCardIndex + 1) / sessionCards.length) * 100}%` }} />
            </div>
          </div>
        </div>

        {/* Card area */}
        <div className="flex-1 flex items-center justify-center p-4">
          <AnimatePresence mode="wait">
            {currentCard && (
              <motion.div
                key={currentCard.verseKey}
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
                      {category && (
                        <span className={cn(
                          'text-[10px] font-medium px-2 py-0.5 rounded-full border',
                          CATEGORY_COLORS[category] || 'bg-gray-500/10 text-gray-500 border-gray-500/30'
                        )}>
                          {category}
                        </span>
                      )}
                      <h3 className="text-xl font-bold text-[var(--content-primary)]">
                        {currentVerse?.referencia || currentCard.verseKey}
                      </h3>
                      <p className="text-xs text-[var(--content-muted)]">Toque para ver o versículo</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full gap-4">
                      <p className="text-lg font-serif-body text-[var(--content-primary)] leading-relaxed italic">
                        &ldquo;{currentVerse?.texto || currentCard.manualTexto}&rdquo;
                      </p>
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
            <Button onClick={() => setIsFlipped(true)}
              className="w-full bg-[var(--brand)] hover:bg-[var(--brand-hover)] text-white">
              Mostrar Resposta
            </Button>
          </div>
        )}
      </div>
    );
  };

  // ─── MANAGE MODE ────────────────────────────────────────

  const renderManageMode = () => (
    <div className="flex flex-col h-full">
      {/* Stats bar */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--border)]/40 text-xs">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-blue-500" />
          <span className="text-[var(--content-muted)]">{stats.new} novos</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-yellow-500" />
          <span className="text-[var(--content-muted)]">{stats.learning} aprendendo</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-purple-500" />
          <span className="text-[var(--content-muted)]">{stats.review} revisão</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-green-500" />
          <span className="text-[var(--content-muted)]">{stats.known} dominados</span>
        </div>
      </div>

      {/* Search + filter */}
      <div className="px-4 py-3 space-y-2 border-b border-[var(--border)]/40">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[var(--content-muted)]" />
          <input
            type="text"
            placeholder="Buscar cards..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-[var(--surface-raised)] border border-[var(--border)] text-sm text-[var(--content-primary)] placeholder:text-[var(--content-muted)] focus:outline-none focus:border-[var(--brand)]/50"
          />
        </div>
        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={cn(
                'px-2.5 py-1 rounded-full text-[10px] font-medium whitespace-nowrap border transition-colors shrink-0',
                categoryFilter === cat
                  ? 'bg-[var(--brand)] text-white border-[var(--brand)]'
                  : 'bg-[var(--surface-raised)] text-[var(--content-muted)] border-[var(--border)] hover:border-[var(--brand)]/30'
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Add card button / form */}
      <div className="px-4 py-3 border-b border-[var(--border)]/40">
        <AnimatePresence mode="wait">
          {!showAddForm ? (
            <motion.div key="btn" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Button
                onClick={() => setShowAddForm(true)}
                variant="outline"
                className="w-full border-dashed border-[var(--brand)]/40 text-[var(--brand)] hover:bg-[var(--brand)]/5"
              >
                <Plus className="w-4 h-4 mr-2" /> Adicionar Card
              </Button>
            </motion.div>
          ) : (
            <motion.div key="form" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }} className="space-y-2 overflow-hidden">
              <input
                type="text"
                placeholder="Referência (ex: João 3:16)"
                value={newRef}
                onChange={e => setNewRef(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[var(--surface-raised)] border border-[var(--border)] text-sm text-[var(--content-primary)] placeholder:text-[var(--content-muted)] focus:outline-none focus:border-[var(--brand)]/50"
              />
              <textarea
                placeholder="Texto do versículo"
                value={newText}
                onChange={e => setNewText(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 rounded-xl bg-[var(--surface-raised)] border border-[var(--border)] text-sm text-[var(--content-primary)] placeholder:text-[var(--content-muted)] focus:outline-none focus:border-[var(--brand)]/50 resize-none"
              />
              <div className="flex gap-2">
                <Button
                  onClick={handleAddCard}
                  disabled={!newRef.trim() || !newText.trim()}
                  className="flex-1 bg-[var(--brand)] hover:bg-[var(--brand-hover)] text-white"
                >
                  <Check className="w-4 h-4 mr-1" /> Adicionar
                </Button>
                <Button onClick={() => { setShowAddForm(false); setNewRef(''); setNewText(''); }}
                  variant="outline" className="border-[var(--border)]">
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Card list */}
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-2">
          {filteredCards.length === 0 ? (
            <div className="text-center py-12 text-[var(--content-muted)]">
              <Layers className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p className="text-sm">Nenhum card encontrado</p>
            </div>
          ) : (
            <AnimatePresence>
              {filteredCards.map((card, idx) => {
                const verse = getVerseData(card);
                const status = getStatusLabel(card);
                const category = getCategoryForCard(card);
                return (
                  <motion.div
                    key={card.verseKey}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ delay: idx * 0.02 }}
                    className="glass-card rounded-xl p-3 border border-[var(--border)]/40"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-sm font-semibold text-[var(--content-primary)] truncate">
                            {verse?.referencia || card.verseKey}
                          </h4>
                          <span className={cn('text-[9px] font-medium px-1.5 py-0.5 rounded-full border shrink-0', status.color)}>
                            {status.label}
                          </span>
                        </div>
                        <p className="text-xs text-[var(--content-muted)] line-clamp-2 leading-relaxed">
                          {verse?.texto || card.manualTexto || '—'}
                        </p>
                        <div className="flex items-center gap-2 mt-1.5">
                          <span className={cn(
                            'text-[9px] font-medium px-1.5 py-0.5 rounded-full border',
                            CATEGORY_COLORS[category] || 'bg-gray-500/10 text-gray-500 border-gray-500/30'
                          )}>
                            {category}
                          </span>
                          {card.repetitions > 0 && (
                            <span className="text-[9px] text-[var(--content-muted)]">
                              {card.repetitions}x revisado · intervalo {card.interval}d
                            </span>
                          )}
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => removeCard(card.verseKey)}
                        className="p-1.5 rounded-lg text-[var(--content-muted)] hover:text-red-500 hover:bg-red-500/10 transition-colors shrink-0"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </motion.button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          )}
        </div>
      </ScrollArea>

      {/* Card count footer */}
      <div className="px-4 py-2 border-t border-[var(--border)]/40 text-center text-[10px] text-[var(--content-muted)]">
        {filteredCards.length} de {totalCards} cards
      </div>
    </div>
  );

  // ─── MAIN RENDER ────────────────────────────────────────

  return (
    <div className="flex flex-col h-full">
      {/* Mode tabs */}
      <div className="flex border-b border-[var(--border)]/40">
        <button
          onClick={() => setMode('review')}
          className={cn(
            'flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors relative',
            mode === 'review'
              ? 'text-[var(--brand)]'
              : 'text-[var(--content-muted)] hover:text-[var(--content-primary)]'
          )}
        >
          <Brain className="w-4 h-4" />
          Revisar
          {dueCount > 0 && (
            <span className="absolute top-2 right-[calc(50%-32px)] w-4 h-4 rounded-full bg-[var(--brand)] text-white text-[9px] flex items-center justify-center font-bold">
              {dueCount > 9 ? '9+' : dueCount}
            </span>
          )}
        </button>
        <button
          onClick={() => setMode('manage')}
          className={cn(
            'flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors relative',
            mode === 'manage'
              ? 'text-[var(--brand)]'
              : 'text-[var(--content-muted)] hover:text-[var(--content-primary)]'
          )}
        >
          <List className="w-4 h-4" />
          Gerenciar
          <span className="absolute top-2 right-[calc(50%-36px)] w-4 h-4 rounded-full bg-[var(--surface-raised)] border border-[var(--border)] text-[9px] flex items-center justify-center text-[var(--content-muted)] font-bold">
            {totalCards}
          </span>
        </button>
        <div className={cn(
          'absolute bottom-0 h-0.5 bg-[var(--brand)] transition-all duration-300 w-1/2',
          mode === 'manage' && 'translate-x-full'
        )} />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          {mode === 'review' ? (
            <motion.div key="review" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }} className="h-full">
              {renderReviewMode()}
            </motion.div>
          ) : (
            <motion.div key="manage" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.2 }} className="h-full">
              {renderManageMode()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
});
