'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Flame, TrendingUp, BookOpen, Calendar } from 'lucide-react';
import Link from 'next/link';

interface StreakData {
  current: number;
  best: number;
  chaptersRead: number;
  lastRead: string | null;
}

function getStreakFromStorage(): StreakData {
  if (typeof window === 'undefined') return { current: 0, best: 0, chaptersRead: 0, lastRead: null };

  try {
    const streak = parseInt(localStorage.getItem('ssb_streak') || '0', 10);
    const best = parseInt(localStorage.getItem('ssb_best_streak') || '0', 10);
    const chapters = localStorage.getItem('ssb_chapters_read');
    const chaptersRead = chapters ? JSON.parse(chapters).length : 0;
    const lastRead = localStorage.getItem('ssb_last_read');

    return { current: streak, best, chaptersRead, lastRead };
  } catch {
    return { current: 0, best: 0, chaptersRead: 0, lastRead: null };
  }
}

export function StreakCard() {
  const [streak, setStreak] = useState<StreakData>({ current: 0, best: 0, chaptersRead: 0, lastRead: null });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setStreak(getStreakFromStorage());
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const hasStreak = streak.current > 0;
  const progress = Math.min(streak.chaptersRead / 1189, 1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="relative overflow-hidden rounded-2xl border border-[var(--brand-default)]/20 bg-gradient-to-br from-[var(--brand-subtle)] to-transparent p-5"
    >
      {/* Background flame glow */}
      {hasStreak && (
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl" />
      )}

      <div className="relative flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            {hasStreak ? (
              <motion.div
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Flame className="w-5 h-5 text-orange-500" />
              </motion.div>
            ) : (
              <Calendar className="w-5 h-5 text-[var(--content-muted)]" />
            )}
            <span className="text-sm font-semibold text-[var(--content-primary)]">
              {hasStreak ? `${streak.current} dias seguidos` : 'Comece sua sequência'}
            </span>
          </div>

          {hasStreak && (
            <p className="text-xs text-[var(--content-muted)] mb-3">
              {streak.current >= 7 ? 'Incrível! Você está firme!' :
               streak.current >= 3 ? 'Continue assim, está indo bem!' :
               'Leia hoje para manter a chama acesa!'}
            </p>
          )}

          <div className="flex items-center gap-4 text-xs text-[var(--content-muted)]">
            <div className="flex items-center gap-1">
              <BookOpen className="w-3 h-3" />
              <span>{streak.chaptersRead} capítulos</span>
            </div>
            {streak.best > 0 && (
              <div className="flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                <span>Recorde: {streak.best} dias</span>
              </div>
            )}
          </div>
        </div>

        <Link href="/estatisticas/gamificacao" className="ml-4 flex-shrink-0">
          <div className="relative w-14 h-14">
            {/* Progress circle */}
            <svg className="w-14 h-14 -rotate-90" viewBox="0 0 56 56">
              <circle cx="28" cy="28" r="24" fill="none" stroke="var(--border)" strokeWidth="3" />
              <circle
                cx="28" cy="28" r="24"
                fill="none"
                stroke="var(--brand-default)"
                strokeWidth="3"
                strokeDasharray={`${progress * 150.8} 150.8`}
                strokeLinecap="round"
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-bold text-[var(--brand-default)]">
                {streak.chaptersRead}
              </span>
            </div>
          </div>
        </Link>
      </div>
    </motion.div>
  );
}
