'use client';

import { motion } from 'framer-motion';
import { Brain, Zap, Target } from 'lucide-react';
import { CATEGORIAS_QUIZ, type CategoriaQuiz, type NivelQuiz } from '@/data/quiz';

interface QuizProgressProps {
  perguntaAtual: number;
  totalPerguntas: number;
  pontuacao: number;
  categoria?: CategoriaQuiz;
  nivel?: NivelQuiz;
  acertos?: number;
  modo?: string;
}

export function QuizProgress({
  perguntaAtual,
  totalPerguntas,
  pontuacao,
  categoria,
  nivel,
  acertos = 0,
  modo = 'classico',
}: QuizProgressProps) {
  const progresso = ((perguntaAtual + 1) / totalPerguntas) * 100;
  const taxaAcerto = perguntaAtual > 0 ? Math.round((acertos / (perguntaAtual + 1)) * 100) : 0;

  const modoLabel: Record<string, { label: string; icon: string }> = {
    classico: { label: 'Clássico', icon: '🎯' },
    temporal: { label: 'Temporal', icon: '⏱️' },
    livro: { label: 'Por Livro', icon: '📖' },
    multiplayer: { label: 'Multiplayer', icon: '⚔️' },
    desafio_diario: { label: 'Desafio Diário', icon: '🌟' },
    estudo: { label: 'Estudo', icon: '📚' },
  };

  const m = modoLabel[modo] || modoLabel.classico;

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-primary" />
          <span className="text-sm font-medium">
            Pergunta {perguntaAtual + 1}/{totalPerguntas}
          </span>
          <span className="px-2 py-0.5 rounded-md text-xs font-medium bg-muted/50 text-muted-foreground">
            {m.icon} {m.label}
          </span>
        </div>
        <div className="flex items-center gap-3">
          {acertos > 0 && (
            <div className="flex items-center gap-1 text-xs text-green-500">
              <Target className="w-3.5 h-3.5" />
              {taxaAcerto}%
            </div>
          )}
          <span className="text-sm font-semibold text-primary">{pontuacao} pts</span>
        </div>
      </div>

      <div className="h-1.5 bg-border/30 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-primary rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progresso}%` }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
      </div>

      <div className="flex items-center justify-between mt-1">
        <span className="text-[10px] text-muted-foreground">{Math.round(progresso)}%</span>
        <span className="text-[10px] text-muted-foreground">{totalPerguntas - perguntaAtual - 1} restantes</span>
      </div>
    </div>
  );
}
