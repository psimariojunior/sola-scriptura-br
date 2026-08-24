'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const TOTAL_CHAPTERS = 1189;

interface ReadingProgress {
  chaptersRead: number;
  booksRead: Record<string, number>;
}

export function ReadingProgressRing() {
  const [progress, setProgress] = useState<ReadingProgress | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('ssb_dashboard_reading_progress');
      if (raw) setProgress(JSON.parse(raw));
    } catch { /* ignore */ }
  }, []);

  const chaptersRead = progress?.chaptersRead ?? 0;
  const percentage = Math.round((chaptersRead / TOTAL_CHAPTERS) * 100);

  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <Link href="/dashboard" className="block group">
      <div className="sola-card p-5 flex items-center gap-5 hover:border-primary/30 transition-all duration-300">
        <div className="relative flex-shrink-0">
          <svg width="120" height="120" viewBox="0 0 120 120" className="-rotate-90">
            <defs>
              <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--primary))" />
                <stop offset="100%" stopColor="hsl(var(--primary) / 0.6)" />
              </linearGradient>
            </defs>
            {/* Background ring */}
            <circle
              cx="60"
              cy="60"
              r={radius}
              fill="none"
              stroke="hsl(var(--muted))"
              strokeWidth="8"
              strokeLinecap="round"
            />
            {/* Progress ring */}
            <motion.circle
              cx="60"
              cy="60"
              r={radius}
              fill="none"
              stroke="url(#progressGradient)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
            />
          </svg>
          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-foreground leading-none">{chaptersRead}</span>
            <span className="text-[10px] text-muted-foreground mt-0.5">de 1189</span>
          </div>
        </div>
        <div className="flex flex-col gap-1 min-w-0">
          <p className="text-sm font-semibold text-foreground">Progresso Bíblico</p>
          <p className="text-2xl font-bold text-primary">{percentage}%</p>
          <p className="text-xs text-muted-foreground">Capítulos lidos</p>
          <p className="text-[11px] text-primary/70 group-hover:text-primary transition-colors mt-1">Ver dashboard →</p>
        </div>
      </div>
    </Link>
  );
}
