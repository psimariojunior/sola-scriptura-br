'use client';

import { useContext } from 'react';
import { AIContext, type AIContextValue } from '@/contexts/AIContext';

export type { AIContextValue } from '@/contexts/AIContext';

export function useAI(): AIContextValue {
  const ctx = useContext(AIContext);
  if (!ctx) {
    throw new Error('useAI must be used within AIProvider');
  }
  return ctx;
}
