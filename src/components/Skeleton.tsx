'use client';

import { motion } from 'framer-motion';

interface SkeletonProps {
  className?: string;
  count?: number;
  type?: 'text' | 'heading' | 'avatar' | 'card' | 'verse' | 'button';
}

function SkeletonPulse({ className = '' }: { className?: string }) {
  return (
    <motion.div
      className={`bg-muted/50 rounded ${className}`}
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}

export function Skeleton({ className = '', count = 1, type = 'text' }: SkeletonProps) {
  const templates = {
    text: <SkeletonPulse className={`h-4 w-full ${className}`} />,
    heading: <SkeletonPulse className={`h-8 w-3/4 ${className}`} />,
    avatar: <SkeletonPulse className={`h-12 w-12 rounded-full ${className}`} />,
    button: <SkeletonPulse className={`h-10 w-32 rounded-lg ${className}`} />,
    verse: (
      <div className={`space-y-2 ${className}`}>
        <SkeletonPulse className="h-3 w-8" />
        <SkeletonPulse className="h-4 w-full" />
        <SkeletonPulse className="h-4 w-5/6" />
        <SkeletonPulse className="h-3 w-24 mt-2" />
      </div>
    ),
    card: (
      <div className={`sola-card p-6 space-y-3 ${className}`}>
        <SkeletonPulse className="h-6 w-1/2" />
        <SkeletonPulse className="h-4 w-full" />
        <SkeletonPulse className="h-4 w-4/5" />
        <div className="flex gap-2 mt-4">
          <SkeletonPulse className="h-6 w-16 rounded-full" />
          <SkeletonPulse className="h-6 w-20 rounded-full" />
        </div>
      </div>
    ),
  };

  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i}>{templates[type]}</div>
      ))}
    </div>
  );
}

export function VerseSkeleton() {
  return (
    <div className="space-y-3 p-4">
      <SkeletonPulse className="h-3 w-8" />
      <SkeletonPulse className="h-5 w-full" />
      <SkeletonPulse className="h-5 w-4/5" />
      <SkeletonPulse className="h-3 w-24 mt-3" />
    </div>
  );
}

export function ChapterSkeleton() {
  return (
    <div className="space-y-6">
      {Array.from({ length: 10 }).map((_, i) => (
        <VerseSkeleton key={i} />
      ))}
    </div>
  );
}

export function CardSkeleton({ count = 3 }: { count?: number }) {
  return <Skeleton type="card" count={count} />;
}

export function SearchSkeleton() {
  return (
    <div className="space-y-4">
      <SkeletonPulse className="h-12 w-full rounded-lg" />
      <div className="grid grid-cols-2 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonPulse key={i} className="h-24 rounded-xl" />
        ))}
      </div>
    </div>
  );
}
