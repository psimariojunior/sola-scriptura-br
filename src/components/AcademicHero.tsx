'use client';

import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

interface AcademicHeroProps {
  icon?: LucideIcon;
  title: ReactNode;
  subtitle?: ReactNode;
  author?: string;
  period?: string;
  difficulty?: 'Iniciante' | 'Intermediário' | 'Avançado' | 'Seminário';
  tags?: string[];
  align?: 'center' | 'left';
  className?: string;
  children?: ReactNode;
}

export function AcademicHero({
  icon: Icon,
  title,
  subtitle,
  author,
  period,
  difficulty,
  tags,
  align = 'center',
  className,
  children,
}: AcademicHeroProps) {
  const isCenter = align === 'center';

  const difficultyColors: Record<string, string> = {
    Iniciante: 'bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20',
    Intermediário: 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20',
    Avançado: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20',
    'Seminário': 'bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20',
  };

  return (
    <div className={cn(
      'relative overflow-hidden rounded-2xl mb-8',
      'bg-gradient-to-br from-[#1a2744] via-[#1e3a5f] to-[#2d1b4e]',
      'border border-white/10',
      className
    )}>
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-4 left-4 text-6xl font-serif text-white/20 select-none" aria-hidden="true">&#x1F3DB;</div>
        <div className="absolute bottom-4 right-4 text-6xl font-serif text-white/20 select-none" aria-hidden="true">&#x1F4D6;</div>
      </div>

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/20 to-transparent" />

      <div className={cn('relative z-10 px-6 py-8 sm:px-8 sm:py-10', isCenter && 'text-center')}>
        {Icon && (
          <div className={cn('mb-4', isCenter && 'flex justify-center')}>
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-400/15 text-amber-300 ring-1 ring-amber-400/20">
              <Icon className="w-6 h-6" strokeWidth={1.4} />
            </span>
          </div>
        )}

        <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-normal text-white mb-3 tracking-tight leading-tight">
          {title}
        </h1>

        {subtitle && (
          <p className={cn('text-sm sm:text-base text-white/60 leading-relaxed mb-4', isCenter && 'max-w-xl mx-auto')}>
            {subtitle}
          </p>
        )}

        {(author || period || difficulty) && (
          <div className={cn('flex items-center gap-3 flex-wrap', isCenter && 'justify-center', 'mb-4')}>
            {author && (
              <span className="text-xs px-2.5 py-1 rounded-full bg-white/10 text-white/70 border border-white/10">
                {author}
              </span>
            )}
            {period && (
              <span className="text-xs px-2.5 py-1 rounded-full bg-white/10 text-white/70 border border-white/10">
                {period}
              </span>
            )}
            {difficulty && (
              <span className={cn('text-xs px-2.5 py-1 rounded-full border', difficultyColors[difficulty])}>
                {difficulty}
              </span>
            )}
          </div>
        )}

        {tags && tags.length > 0 && (
          <div className={cn('flex items-center gap-1.5 flex-wrap', isCenter && 'justify-center')}>
            {tags.map(tag => (
              <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-amber-400/10 text-amber-300/80 border border-amber-400/10">
                {tag}
              </span>
            ))}
          </div>
        )}

        {children}
      </div>
    </div>
  );
}
