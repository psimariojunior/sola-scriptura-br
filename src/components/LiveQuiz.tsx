'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Clock, CheckCircle2, XCircle, Users, Zap, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  category: string;
  difficulty: 'facil' | 'medio' | 'dificil';
}

interface QuizAnswer {
  participantId: string;
  participantName: string;
  questionId: string;
  selectedIndex: number;
  timeSpent: number;
  isCorrect: boolean;
}

interface QuizScore {
  participantId: string;
  participantName: string;
  score: number;
  correctAnswers: number;
  totalAnswered: number;
  avgTime: number;
}

interface LiveQuizProps {
  questions: QuizQuestion[];
  answers: QuizAnswer[];
  scores: QuizScore[];
  currentQuestionIndex: number;
  currentUserId: string;
  isHost: boolean;
  timePerQuestion?: number;
  onAnswer: (questionId: string, selectedIndex: number) => void;
  onNextQuestion: () => void;
  onEndQuiz: () => void;
}

const CATEGORY_ICONS: Record<string, string> = {
  'Antigo Testamento': '📜',
  'Novo Testamento': '✝️',
  'Pentateuco': '📖',
  'Salmos': '🎵',
  'Profecias': '🔮',
  'Evangelhos': '📖',
  'Epístolas': '✉️',
  'Geral': '❓',
};

const DIFFICULTY_COLORS = {
  facil: 'text-green-500 bg-green-500/10',
  medio: 'text-yellow-500 bg-yellow-500/10',
  dificil: 'text-red-500 bg-red-500/10',
};

export function LiveQuiz({
  questions,
  answers,
  scores,
  currentQuestionIndex,
  currentUserId,
  isHost,
  timePerQuestion = 15,
  onAnswer,
  onNextQuestion,
  onEndQuiz,
}: LiveQuizProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(timePerQuestion);
  const [showResults, setShowResults] = useState(false);
  const [hasAnswered, setHasAnswered] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  useEffect(() => {
    if (!currentQuestion) return;
    setSelectedOption(null);
    setHasAnswered(false);
    setShowResults(false);
    setTimeLeft(timePerQuestion);
  }, [currentQuestionIndex, currentQuestion, timePerQuestion]);

  useEffect(() => {
    if (showResults || hasAnswered) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setShowResults(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [showResults, hasAnswered, currentQuestionIndex]);

  useEffect(() => {
    const myAnswer = answers.find(
      a => a.participantId === currentUserId && a.questionId === currentQuestion?.id
    );
    if (myAnswer) {
      setHasAnswered(true);
      setSelectedOption(myAnswer.selectedIndex);
      setShowResults(true);
    }
  }, [answers, currentUserId, currentQuestion]);

  const handleSelectOption = (index: number) => {
    if (hasAnswered || showResults) return;
    setSelectedOption(index);
    setHasAnswered(true);
    onAnswer(currentQuestion.id, index);
    setTimeout(() => setShowResults(true), 500);
  };

  const myScore = scores.find(s => s.participantId === currentUserId);
  const myRank = [...scores].sort((a, b) => b.score - a.score).findIndex(s => s.participantId === currentUserId) + 1;

  if (!currentQuestion) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center">
        <Trophy className="w-16 h-16 text-yellow-500 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Quiz Finalizado!</h2>
        <p className="text-[var(--content-muted)] mb-6">Resultados finais</p>
        <div className="w-full max-w-sm space-y-2">
          {scores.sort((a, b) => b.score - a.score).map((score, idx) => (
            <motion.div
              key={score.participantId}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={cn(
                'flex items-center gap-3 p-3 rounded-xl',
                idx === 0 ? 'bg-yellow-500/10 border border-yellow-500/30' :
                idx === 1 ? 'bg-gray-300/10 border border-gray-300/30' :
                idx === 2 ? 'bg-orange-500/10 border border-orange-500/30' :
                'bg-[var(--surface-raised)]'
              )}
            >
              <div className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm',
                idx === 0 ? 'bg-yellow-500 text-white' :
                idx === 1 ? 'bg-gray-400 text-white' :
                idx === 2 ? 'bg-orange-500 text-white' :
                'bg-[var(--surface-raised)] text-[var(--content-muted)]'
              )}>
                {idx + 1}
              </div>
              <div className="flex-1">
                <div className="font-medium text-sm">{score.participantName}</div>
                <div className="text-[10px] text-[var(--content-muted)]">
                  {score.correctAnswers}/{score.totalAnswered} • {Math.round(score.avgTime)}s médio
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-[var(--brand)]">{score.score}</div>
                <div className="text-[10px] text-[var(--content-muted)]">pontos</div>
              </div>
            </motion.div>
          ))}
        </div>
        {isHost && (
          <Button onClick={onEndQuiz} className="mt-6" variant="outline">
            Encerrar Quiz
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-[var(--border)]/40">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-yellow-500" />
            <span className="font-medium text-sm">
              Pergunta {currentQuestionIndex + 1}/{totalQuestions}
            </span>
          </div>
          <div className="flex items-center gap-3">
            {myScore && (
              <div className="flex items-center gap-1 text-xs">
                <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                <span className="font-bold">{myScore.score}</span>
              </div>
            )}
            <div className={cn(
              'flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold',
              timeLeft <= 5 ? 'bg-red-500/10 text-red-500' : 'bg-[var(--surface-raised)] text-[var(--content-muted)]'
            )}>
              <Clock className="w-3 h-3" />
              {timeLeft}s
            </div>
          </div>
        </div>
        <Progress value={progress} className="h-1.5" />
      </div>

      {/* Question */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg">{CATEGORY_ICONS[currentQuestion.category] || '❓'}</span>
          <span className="text-xs text-[var(--content-muted)]">{currentQuestion.category}</span>
          <span className={cn('text-[10px] px-1.5 py-0.5 rounded-full font-medium', DIFFICULTY_COLORS[currentQuestion.difficulty])}>
            {currentQuestion.difficulty}
          </span>
        </div>

        <h3 className="text-lg font-semibold mb-4 text-[var(--content-primary)]">
          {currentQuestion.question}
        </h3>

        <div className="space-y-2">
          {currentQuestion.options.map((option, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrect = idx === currentQuestion.correctIndex;
            const showCorrect = showResults && isCorrect;
            const showWrong = showResults && isSelected && !isCorrect;

            return (
              <motion.button
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => handleSelectOption(idx)}
                disabled={hasAnswered}
                className={cn(
                  'w-full text-left p-3 rounded-xl border-2 transition-all text-sm',
                  !showResults && !hasAnswered && 'border-[var(--border)] hover:border-[var(--brand)]/50 hover:bg-[var(--brand)]/5',
                  isSelected && !showResults && 'border-[var(--brand)] bg-[var(--brand)]/10',
                  showCorrect && 'border-green-500 bg-green-500/10',
                  showWrong && 'border-red-500 bg-red-500/10',
                  showResults && !isSelected && !isCorrect && 'border-[var(--border)] opacity-50'
                )}
              >
                <div className="flex items-center gap-3">
                  <div className={cn(
                    'w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0',
                    showCorrect ? 'bg-green-500 text-white' :
                    showWrong ? 'bg-red-500 text-white' :
                    isSelected ? 'bg-[var(--brand)] text-white' :
                    'bg-[var(--surface-raised)] text-[var(--content-muted)]'
                  )}>
                    {showCorrect ? <CheckCircle2 className="w-4 h-4" /> :
                     showWrong ? <XCircle className="w-4 h-4" /> :
                     String.fromCharCode(65 + idx)}
                  </div>
                  <span className="flex-1">{option}</span>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Answers count */}
        {showResults && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 flex items-center justify-center gap-2 text-xs text-[var(--content-muted)]"
          >
            <Users className="w-3.5 h-3.5" />
            <span>{answers.filter(a => a.questionId === currentQuestion.id).length} responderam</span>
          </motion.div>
        )}
      </div>

      {/* Footer */}
      {showResults && isHost && (
        <div className="p-4 border-t border-[var(--border)]/40">
          <Button
            onClick={onNextQuestion}
            className="w-full bg-[var(--brand)] hover:bg-[var(--brand-hover)] text-white"
          >
            {currentQuestionIndex < totalQuestions - 1 ? 'Próxima Pergunta' : 'Ver Resultados'}
          </Button>
        </div>
      )}
    </div>
  );
}
