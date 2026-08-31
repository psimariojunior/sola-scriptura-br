'use client';

import { useMemo } from 'react';
import { cn } from '@/lib/utils';
import { karaokeWordIndex, splitKaraokeWords } from '@/lib/karaokeWords';

interface KaraokeWordsProps {
  text: string;
  progress: number;
  active: boolean;
  className?: string;
}

export function KaraokeWords({ text, progress, active, className }: KaraokeWordsProps) {
  const words = useMemo(() => splitKaraokeWords(text), [text]);
  const idx = active ? karaokeWordIndex(words, progress) : -1;

  return (
    <span className={className}>
      {words.map((token, i) => (
        <span key={`${i}-${token.slice(0, 8)}`}>
          <span
            className={cn(
              active && 'karaoke-word',
              active && i < idx && 'is-spoken',
              active && i === idx && 'is-current',
              active && i > idx && 'is-upcoming',
            )}
          >
            {token}
          </span>
          {i < words.length - 1 ? ' ' : null}
        </span>
      ))}
    </span>
  );
}
