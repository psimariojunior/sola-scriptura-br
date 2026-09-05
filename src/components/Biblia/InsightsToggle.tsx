'use client';

import { Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface InsightsToggleProps {
  open: boolean;
  onToggle: () => void;
}

export function InsightsToggle({ open, onToggle }: InsightsToggleProps) {
  return (
    <button
      onClick={onToggle}
      className={cn(
        'fixed bottom-6 right-6 z-30',
        'w-12 h-12 rounded-full',
        'flex items-center justify-center',
        'shadow-lg transition-all',
        open
          ? 'bg-[var(--brand-default)] text-[var(--brand-contrast)]'
          : 'bg-[var(--surface-raised)] text-[var(--content-secondary)] hover:bg-[var(--surface-raised)] hover:text-[var(--brand-default)] border border-[var(--border)]'
      )}
      aria-label={open ? 'Fechar insights' : 'Abrir insights'}
      aria-pressed={open}
    >
      <Sparkles className="w-5 h-5" />
    </button>
  );
}
