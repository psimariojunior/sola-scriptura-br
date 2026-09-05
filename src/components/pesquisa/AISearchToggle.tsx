'use client';

import { Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AISearchToggleProps {
  enabled: boolean;
  onToggle: () => void;
}

export function AISearchToggle({ enabled, onToggle }: AISearchToggleProps) {
  return (
    <button
      onClick={onToggle}
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all',
        enabled
          ? 'bg-[var(--brand-default)] text-[var(--brand-contrast)]'
          : 'bg-[var(--surface-sunken)] text-[var(--content-secondary)] hover:bg-[var(--surface-raised)]'
      )}
      aria-pressed={enabled}
    >
      <Sparkles className="w-3.5 h-3.5" />
      {enabled ? 'IA Ativada' : 'Buscar com IA'}
    </button>
  );
}
