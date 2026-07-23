'use client';

import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular' | 'card' | 'verse' | 'chapter';
  width?: string | number;
  height?: string | number;
  lines?: number;
  animate?: boolean;
}

export function Skeleton({
  className,
  variant = 'text',
  width,
  height,
  lines = 1,
  animate = true,
}: SkeletonProps) {
  const baseClass = cn(
    'rounded-lg',
    animate && 'animate-pulse',
    className
  );

  const shimmerClass = cn(
    'relative overflow-hidden before:absolute before:inset-0',
    'before:-translate-x-full before:animate-[shimmer_2s_infinite]',
    'before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent',
    'dark:before:via-white/5'
  );

  if (variant === 'circular') {
    return (
      <div
        className={cn(baseClass, shimmerClass, 'rounded-full')}
        style={{ width: width || 40, height: height || 40 }}
      />
    );
  }

  if (variant === 'card') {
    return (
      <div className={cn(baseClass, shimmerClass, 'rounded-xl border border-[var(--border)]/20 p-4 space-y-3')}>
        <div className="flex items-center gap-3">
          <Skeleton variant="circular" width={32} height={32} />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-3 w-1/3" />
            <Skeleton className="h-2 w-1/2" />
          </div>
        </div>
        <div className="space-y-2">
          <Skeleton className="h-2 w-full" />
          <Skeleton className="h-2 w-5/6" />
          <Skeleton className="h-2 w-4/6" />
        </div>
      </div>
    );
  }

  if (variant === 'verse') {
    return (
      <div className={cn(baseClass, shimmerClass, 'rounded-xl border border-[var(--border)]/20 p-3 space-y-2')}>
        <div className="flex items-start gap-2">
          <Skeleton variant="circular" width={20} height={20} />
          <div className="flex-1 space-y-1.5">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-3/4" />
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'chapter') {
    return (
      <div className={cn(baseClass, shimmerClass, 'rounded-xl border border-[var(--border)]/20 p-4 space-y-3')}>
        <div className="flex items-center gap-2 mb-4">
          <Skeleton className="h-4 w-24" />
          <Skeleton variant="circular" width={16} height={16} />
        </div>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex gap-2">
            <Skeleton className="h-3 w-6 shrink-0" />
            <div className="flex-1 space-y-1">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-2/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'rectangular') {
    return (
      <div
        className={cn(baseClass, shimmerClass)}
        style={{ width: width || '100%', height: height || 200 }}
      />
    );
  }

  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={cn(baseClass, shimmerClass, 'h-3 rounded')}
          style={{ width: i === lines - 1 ? '60%' : '100%' }}
        />
      ))}
    </div>
  );
}

export function VerseSkeleton() {
  return <Skeleton variant="verse" />;
}

export function ChapterSkeleton() {
  return <Skeleton variant="chapter" />;
}

export function BookGridSkeleton({ count = 12 }: { count?: number }) {
  return (
    <div className="grid grid-cols-3 gap-2 p-3">
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton key={i} variant="card" className="h-16" />
      ))}
    </div>
  );
}

export function ChapterGridSkeleton({ count = 20 }: { count?: number }) {
  return (
    <div className="grid grid-cols-5 gap-1.5 p-3">
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton key={i} className="aspect-square rounded-lg" />
      ))}
    </div>
  );
}

export function ChatSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-3 p-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={cn('flex gap-2', i % 2 === 0 ? 'justify-start' : 'justify-end')}>
          <div className={cn('rounded-xl p-3 max-w-[70%] space-y-1.5', i % 2 === 0 ? 'bg-[var(--surface-raised)]' : 'bg-[var(--brand)]/10')}>
            <Skeleton className="h-2 w-16" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-4/5" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function PresentationSkeleton() {
  return (
    <div className="flex flex-col items-center justify-center h-full p-8 space-y-6">
      <Skeleton className="h-6 w-48" />
      <div className="w-full max-w-2xl space-y-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
      <div className="flex gap-2 mt-4">
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="circular" width={40} height={40} />
      </div>
    </div>
  );
}
