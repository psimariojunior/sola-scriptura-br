'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { Achievement } from '@/lib/achievements';

interface AchievementBadgeProps {
  achievement: Achievement;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'w-12 h-12 text-lg',
  md: 'w-16 h-16 text-2xl',
  lg: 'w-24 h-24 text-4xl',
};

const labelSizes = {
  sm: 'text-[10px] max-w-[64px]',
  md: 'text-xs max-w-[80px]',
  lg: 'text-sm max-w-[120px]',
};

export function AchievementBadge({ achievement, size = 'md' }: AchievementBadgeProps) {
  const unlocked = !!achievement.unlockedAt;

  return (
    <div className="flex flex-col items-center gap-1.5">
      <motion.div
        className={cn(
          'relative rounded-2xl flex items-center justify-center transition-all',
          sizeClasses[size],
          unlocked
            ? 'bg-gradient-to-br from-amber-400 to-amber-600 shadow-lg shadow-amber-500/30'
            : 'bg-[var(--surface-sunken)] grayscale opacity-50'
        )}
        whileHover={unlocked ? { scale: 1.1, rotate: [0, -5, 5, 0] } : {}}
        whileTap={unlocked ? { scale: 0.95 } : {}}
        initial={unlocked ? { scale: 0, rotate: -180 } : {}}
        animate={unlocked ? { scale: 1, rotate: 0 } : {}}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      >
        {unlocked && (
          <motion.div
            className="absolute inset-0 rounded-2xl bg-amber-400/30"
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}
        <span className="relative z-10" role="img" aria-label={achievement.title}>
          {achievement.icon}
        </span>
      </motion.div>

      <div className={cn('text-center', labelSizes[size])}>
        <p className={cn(
          'font-semibold leading-tight',
          unlocked ? 'text-[var(--content-primary)]' : 'text-[var(--content-muted)]'
        )}>
          {achievement.title}
        </p>
        {size !== 'sm' && (
          <p className="text-[var(--content-muted)] leading-tight mt-0.5 line-clamp-2">
            {achievement.description}
          </p>
        )}
        {!unlocked && achievement.total > 1 && (
          <div className="mt-1 flex items-center gap-1">
            <div className="flex-1 h-1 bg-[var(--surface-sunken)] rounded-full overflow-hidden">
              <div
                className="h-full bg-[var(--brand-default)] rounded-full"
                style={{ width: `${(achievement.progress / achievement.total) * 100}%` }}
              />
            </div>
            <span className="text-[9px] text-[var(--content-muted)]">
              {achievement.progress}/{achievement.total}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
