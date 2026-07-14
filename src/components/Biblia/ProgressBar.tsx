'use client';

import { motion } from 'framer-motion';

interface ProgressBarProps {
  value: number;
  total: number;
  className?: string;
  showLabel?: boolean;
}

export function ProgressBar({ value, total, className = '', showLabel = false }: ProgressBarProps) {
  const percent = total > 0 ? Math.min(100, (value / total) * 100) : 0;

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex items-center justify-between mb-1.5 text-[10px] text-[var(--content-muted)]">
          <span>Progresso</span>
          <span className="font-mono">{Math.round(percent)}%</span>
        </div>
      )}
      <div className="w-full h-1 rounded-full bg-[var(--brand-subtle)] overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-[var(--brand-default)] to-[var(--brand-emphasis)]"
          initial={false}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      </div>
    </div>
  );
}
