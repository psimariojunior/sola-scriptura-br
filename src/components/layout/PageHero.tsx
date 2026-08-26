'use client';

import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

interface PageHeroProps {
  icon?: LucideIcon;
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: 'center' | 'left';
  ornament?: boolean;
  className?: string;
  children?: ReactNode;
}

export function PageHero({
  icon: Icon,
  eyebrow,
  title,
  subtitle,
  align = 'center',
  ornament = true,
  className,
  children,
}: PageHeroProps) {
  const isCenter = align === 'center';

  return (
    <div className={cn('mb-12', isCenter && 'text-center', className)}>
      {Icon && (
        <div className={cn('mb-5', isCenter && 'flex justify-center')}>
          <span className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-primary/10 text-primary ring-1 ring-primary/20">
            <Icon className="w-5 h-5" strokeWidth={1.4} />
          </span>
        </div>
      )}

      {eyebrow && (
        <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-primary mb-3">
          {eyebrow}
        </p>
      )}

      <h1 className="font-display text-3xl sm:text-4xl md:text-[2.75rem] font-normal text-foreground mb-3 tracking-tight leading-tight">
        {title}
      </h1>

      {subtitle && (
        <p className={cn('text-sm sm:text-[15px] text-muted-foreground leading-relaxed', isCenter && 'max-w-xl mx-auto')}>
          {subtitle}
        </p>
      )}

      {ornament && (
        <div
          className={cn('lectern-ornament mt-7', !isCenter && 'ml-0 mr-auto')}
          style={!isCenter ? { marginInline: 0 } : undefined}
          aria-hidden="true"
        />
      )}

      {children}
    </div>
  );
}
