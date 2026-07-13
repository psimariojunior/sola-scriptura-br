'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

interface QuizTimerProps {
  tempoRestante: number;
  tempoTotal: number;
  pausado?: boolean;
  tamanho?: 'sm' | 'md' | 'lg';
  mostrarLabel?: boolean;
  onTempoEsgotado?: () => void;
}

export function QuizTimer({
  tempoRestante,
  tempoTotal,
  pausado = false,
  tamanho = 'md',
  mostrarLabel = true,
  onTempoEsgotado,
}: QuizTimerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (tempoRestante <= 5 && tempoRestante > 0 && !pausado) {
      try {
        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);
        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        gainNode.gain.value = 0.05;
        oscillator.start();
        oscillator.stop(ctx.currentTime + 0.1);
      } catch {}
    }
  }, [tempoRestante, pausado]);

  const pct = Math.max(0, (tempoRestante / tempoTotal) * 100);
  const isLow = tempoRestante <= 10;
  const isCritical = tempoRestante <= 5;
  const isExpiring = tempoRestante <= 3;

  const sizeMap = {
    sm: { circle: 48, stroke: 3, font: 'text-xs', container: 'w-12 h-12' },
    md: { circle: 64, stroke: 4, font: 'text-sm', container: 'w-16 h-16' },
    lg: { circle: 96, stroke: 5, font: 'text-xl', container: 'w-24 h-24' },
  };

  const s = sizeMap[tamanho];
  const radius = (s.circle - s.stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (pct / 100) * circumference;

  const getColor = () => {
    if (tempoRestante > 20) return '#22c55e';
    if (tempoRestante > 10) return '#eab308';
    if (tempoRestante > 5) return '#f97316';
    return '#ef4444';
  };

  const getBarColor = () => {
    if (tempoRestante > 20) return 'bg-green-500';
    if (tempoRestante > 10) return 'bg-yellow-500';
    if (tempoRestante > 5) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div className="flex items-center gap-3">
      <motion.div
        className={`relative ${s.container} flex-shrink-0`}
        animate={
          isCritical
            ? { scale: [1, 1.05, 1] }
            : {}
        }
        transition={
          isCritical
            ? { repeat: Infinity, duration: 0.5 }
            : {}
        }
      >
        <svg
          width={s.circle}
          height={s.circle}
          className="transform -rotate-90"
        >
          <circle
            cx={s.circle / 2}
            cy={s.circle / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={s.stroke}
            className="text-border/30"
          />
          <motion.circle
            cx={s.circle / 2}
            cy={s.circle / 2}
            r={radius}
            fill="none"
            stroke={getColor()}
            strokeWidth={s.stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 0.5, ease: 'linear' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className={`font-display font-semibold ${s.font} ${
              isCritical ? 'text-red-500' : isLow ? 'text-amber-500' : 'text-foreground'
            }`}
          >
            {tempoRestante}
          </span>
        </div>
      </motion.div>

      {mostrarLabel && (
        <div className="flex-1">
          <div className="flex items-center gap-1.5 mb-1">
            <Clock className={`w-3.5 h-3.5 ${isCritical ? 'text-red-500' : 'text-muted-foreground'}`} />
            <span className={`text-xs font-medium ${isCritical ? 'text-red-500' : 'text-muted-foreground'}`}>
              {isCritical ? 'Tempo quase esgotado!' : isLow ? 'Pense rápido!' : 'Tempo restante'}
            </span>
          </div>
          <div className="h-1.5 bg-border/30 rounded-full overflow-hidden">
            <motion.div
              className={`h-full rounded-full ${getBarColor()}`}
              initial={{ width: '100%' }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.5, ease: 'linear' }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
