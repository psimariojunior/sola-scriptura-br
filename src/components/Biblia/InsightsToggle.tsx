'use client';

import { Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface InsightsToggleProps {
  open: boolean;
  onToggle: () => void;
}

export function InsightsToggle({ open, onToggle }: InsightsToggleProps) {
  return (
    <motion.button
      onClick={onToggle}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        'fixed bottom-6 right-6 z-30',
        'w-14 h-14 rounded-2xl',
        'flex items-center justify-center',
        'shadow-xl transition-all',
        open
          ? 'bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-amber-500/30'
          : 'bg-[var(--surface-raised)] text-[var(--content-secondary)] hover:text-amber-500 border border-[var(--border)]/50 hover:border-amber-500/30 hover:shadow-amber-500/10'
      )}
      aria-label={open ? 'Fechar insights' : 'Abrir insights'}
      aria-pressed={open}
    >
      <motion.span
        animate={{ rotate: open ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <Sparkles className="w-5 h-5" />
      </motion.span>
    </motion.button>
  );
}
