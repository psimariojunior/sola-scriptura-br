'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, CheckCircle2, Gift, Zap, Timer } from 'lucide-react';
import { type DesafioDiario } from '@/data/conquistas';

interface DesafioDiarioProps {
  desafio: DesafioDiario;
  concluido?: boolean;
  onCompletar?: (id: string) => void;
}

const TIPO_ICONES: Record<string, { icon: string; cor: string }> = {
  leitura: { icon: '📖', cor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400' },
  estudo: { icon: '📚', cor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400' },
  quiz: { icon: '🧠', cor: 'bg-purple-500/10 text-purple-600 dark:text-purple-400' },
  memorizacao: { icon: '💭', cor: 'bg-pink-500/10 text-pink-600 dark:text-pink-400' },
  exploracao: { icon: '🗺️', cor: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' },
  comunidade: { icon: '👥', cor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' },
};

function getTimeRemaining(): { horas: number; minutos: number; segundos: number } {
  const agora = new Date();
  const fimDoDia = new Date(agora);
  fimDoDia.setHours(23, 59, 59, 999);
  const diff = fimDoDia.getTime() - agora.getTime();
  const horas = Math.floor(diff / (1000 * 60 * 60));
  const minutos = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const segundos = Math.floor((diff % (1000 * 60)) / 1000);
  return { horas, minutos, segundos };
}

export function DesafioDiarioCard({ desafio, concluido = false, onCompletar }: DesafioDiarioProps) {
  const [animando, setAnimando] = useState(false);
  const [timer, setTimer] = useState(getTimeRemaining);

  const tipo = TIPO_ICONES[desafio.tipo] || TIPO_ICONES.leitura;

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(getTimeRemaining());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCompletar = () => {
    if (concluido || animando) return;
    setAnimando(true);
    setTimeout(() => {
      onCompletar?.(desafio.id);
      setAnimando(false);
    }, 800);
  };

  return (
    <motion.div
      className={`sola-card p-4 rounded-xl relative overflow-hidden transition-all ${
        concluido ? 'opacity-80' : ''
      }`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={!concluido ? { scale: 1.02 } : undefined}
    >
      {/* Completion animation */}
      <AnimatePresence>
        {animando && (
          <motion.div
            className="absolute inset-0 bg-green-500/10 z-10 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.3, 1] }}
              transition={{ duration: 0.6 }}
            >
              <CheckCircle2 className="w-12 h-12 text-green-500" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-start gap-3">
        {/* Icon */}
        <div className={`w-10 h-10 rounded-xl ${tipo.cor} flex items-center justify-center text-lg shrink-0`}>
          {tipo.icon}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="text-sm font-semibold text-[var(--fg)] leading-tight">{desafio.titulo}</p>
              <p className="text-[11px] text-[var(--muted-fg)] mt-0.5 leading-relaxed">{desafio.descricao}</p>
            </div>
            {concluido && (
              <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
            )}
          </div>

          {/* Timer and reward */}
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-3">
              {/* Countdown */}
              {!concluido && (
                <div className="flex items-center gap-1">
                  <Timer className="w-3 h-3 text-orange-500" />
                  <span className="text-[11px] font-mono font-semibold text-orange-500">
                    {String(timer.horas).padStart(2, '0')}:
                    {String(timer.minutos).padStart(2, '0')}:
                    {String(timer.segundos).padStart(2, '0')}
                  </span>
                </div>
              )}

              {/* Reward */}
              <div className="flex items-center gap-1">
                <Gift className="w-3 h-3 text-amber-500" />
                <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400">
                  +{desafio.recompensa} XP
                </span>
              </div>
            </div>

            {/* Complete button */}
            {!concluido && (
              <motion.button
                onClick={handleCompletar}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] text-[11px] font-semibold hover:opacity-90 transition-opacity"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Zap className="w-3 h-3" />
                Completar
              </motion.button>
            )}

            {concluido && (
              <span className="text-[11px] font-semibold text-green-600 dark:text-green-400">
                Concluído ✓
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
