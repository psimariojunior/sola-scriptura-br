'use client';

import { useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, BookOpen } from 'lucide-react';
import { CATEGORIAS_QUIZ, NIVEIS_QUIZ, type PerguntaQuiz } from '@/data/quiz';

interface QuizCardProps {
  pergunta: PerguntaQuiz;
  respostaSel: number | null;
  mostrarExplicacao: boolean;
  onSelecionarResposta: (idx: number) => void;
  onProxima: () => void;
  isUltima: boolean;
}

export function QuizCard({
  pergunta,
  respostaSel,
  mostrarExplicacao,
  onSelecionarResposta,
  onProxima,
  isUltima,
}: QuizCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (mostrarExplicacao) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onProxima();
        }
        return;
      }
      const keyMap: Record<string, number> = { '1': 0, '2': 1, '3': 2, '4': 3 };
      if (e.key in keyMap) {
        const idx = keyMap[e.key];
        if (idx < opcoesFiltradas.length) {
          onSelecionarResposta(idx);
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [mostrarExplicacao, onProxima, onSelecionarResposta]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const opcoesFiltradas = pergunta.tipo === 'verdadeiro_falso'
    ? [pergunta.opcoes[0], pergunta.opcoes[1]]
    : pergunta.opcoes;

  const letras = ['A', 'B', 'C', 'D'];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        ref={containerRef}
        key={pergunta.id}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
      >
        <div className="rounded-2xl border border-border/50 bg-card/50 p-6 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${CATEGORIAS_QUIZ[pergunta.categoria]?.cor}`}>
              {CATEGORIAS_QUIZ[pergunta.categoria]?.icon} {CATEGORIAS_QUIZ[pergunta.categoria]?.label}
            </span>
            <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${NIVEIS_QUIZ[pergunta.nivel]?.cor}`}>
              {NIVEIS_QUIZ[pergunta.nivel]?.label}
            </span>
            {pergunta.tipo === 'verdadeiro_falso' && (
              <span className="px-2 py-0.5 rounded-md text-xs font-medium bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                V/F
              </span>
            )}
            {pergunta.tipo === 'completar' && (
              <span className="px-2 py-0.5 rounded-md text-xs font-medium bg-violet-500/10 text-violet-600 dark:text-violet-400">
                Completar
              </span>
            )}
          </div>
          <h2 className="font-display text-xl font-medium leading-relaxed">{pergunta.enunciado}</h2>
          {pergunta.referencia && (
            <div className="flex items-center gap-1 mt-2 text-xs text-primary">
              <BookOpen className="w-3 h-3" />
              {pergunta.referencia}
            </div>
          )}
        </div>

        <div className="space-y-3">
          {opcoesFiltradas.map((opcao, i) => {
            if (!opcao) return null;
            const selecionado = respostaSel === i;
            const correto = i === pergunta.respostaCorreta;

            let estilo = 'border-border/30 hover:border-primary/50 hover:bg-muted/30';
            if (mostrarExplicacao && correto) {
              estilo = 'border-green-500/50 bg-green-500/10';
            } else if (mostrarExplicacao && selecionado && !correto) {
              estilo = 'border-red-500/50 bg-red-500/10';
            } else if (selecionado) {
              estilo = 'border-primary/50 bg-primary/5';
            }

            return (
              <motion.button
                key={i}
                whileHover={!mostrarExplicacao ? { scale: 1.01 } : {}}
                whileTap={!mostrarExplicacao ? { scale: 0.99 } : {}}
                onClick={() => onSelecionarResposta(i)}
                disabled={mostrarExplicacao}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${estilo}`}
              >
                <span
                  className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-semibold flex-shrink-0 ${
                    mostrarExplicacao && correto
                      ? 'bg-green-500 text-white'
                      : mostrarExplicacao && selecionado
                      ? 'bg-red-500 text-white'
                      : 'bg-muted/50 text-muted-foreground'
                  }`}
                >
                  {mostrarExplicacao && correto ? (
                    <Check className="w-4 h-4" />
                  ) : mostrarExplicacao && selecionado ? (
                    <X className="w-4 h-4" />
                  ) : (
                    <span className="flex items-center justify-center">
                      <span className="hidden sm:inline">{letras[i]}</span>
                      <span className="sm:hidden">{i + 1}</span>
                    </span>
                  )}
                </span>
                <span className="text-sm font-medium">{opcao}</span>
              </motion.button>
            );
          })}
        </div>

        {mostrarExplicacao && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 rounded-xl bg-primary/5 border border-primary/20"
          >
            <p className="text-sm leading-relaxed text-muted-foreground">
              {pergunta.explicacao}
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onProxima}
              className="mt-4 w-full py-3 bg-primary text-primary-foreground rounded-xl font-medium flex items-center justify-center gap-2"
            >
              {isUltima ? 'Ver Resultado' : 'Próxima Pergunta (Enter)'}
            </motion.button>
          </motion.div>
        )}

        {!mostrarExplicacao && (
          <p className="text-center text-xs text-muted-foreground mt-4">
            Pressione 1-4 para selecionar • Enter para avançar
          </p>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
