'use client';

import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AISearchToggleProps {
  enabled: boolean;
  onToggle: () => void;
}

export function AISearchToggle({ enabled, onToggle }: AISearchToggleProps) {
  return (
    <motion.button
      onClick={onToggle}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all',
        enabled
          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/20'
          : 'bg-[var(--surface-sunken)] text-[var(--content-secondary)] hover:bg-[var(--surface-raised)] border border-[var(--border)]/50'
      )}
      aria-pressed={enabled}
    >
      <Sparkles className="w-4 h-4" />
      {enabled ? 'IA Ativada' : 'Buscar com IA'}
    </motion.button>
  );
}
