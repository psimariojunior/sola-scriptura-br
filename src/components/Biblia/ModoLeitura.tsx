'use client';

import { motion } from 'framer-motion';
import { Eye, BookOpen, Columns2, Presentation, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export type ModoLeituraValue = 'foco' | 'estudo' | 'comparacao' | 'apresentacao';

interface ModoLeituraProps {
  value: ModoLeituraValue;
  onChange: (value: ModoLeituraValue) => void;
  className?: string;
  size?: 'sm' | 'md';
}

const modes: { value: ModoLeituraValue; label: string; icon: LucideIcon; shortcut?: string }[] = [
  { value: 'foco', label: 'Foco', icon: Eye },
  { value: 'estudo', label: 'Estudo', icon: BookOpen },
  { value: 'comparacao', label: 'Comparação', icon: Columns2, shortcut: 'C' },
  { value: 'apresentacao', label: 'Apresentar', icon: Presentation },
];

export function ModoLeitura({ value, onChange, className, size = 'md' }: ModoLeituraProps) {
  return (
    <div
      role="tablist"
      aria-label="Modo de leitura"
      className={cn(
        'inline-flex items-center gap-0.5 p-1 rounded-full',
        'bg-[var(--surface-sunken)]/80 border border-[var(--border)]/60',
        'shadow-inner shadow-black/5',
        className
      )}
    >
      {modes.map(({ value: modeValue, label, icon: Icon, shortcut }) => {
        const active = value === modeValue;
        return (
          <motion.button
            key={modeValue}
            role="tab"
            aria-selected={active}
            aria-label={`Modo ${label}`}
            onClick={() => onChange(modeValue)}
            whileTap={{ scale: 0.96 }}
            className={cn(
              'relative inline-flex items-center gap-1.5 font-medium rounded-full',
              'transition-colors duration-200',
              size === 'sm' ? 'px-2.5 py-1 text-[11px]' : 'px-3 py-1.5 text-xs',
              active
                ? 'text-[var(--brand-contrast)]'
                : 'text-[var(--content-secondary)] hover:text-[var(--content-primary)]'
            )}
            title={shortcut ? `${label} (atalho: ${shortcut})` : label}
          >
            {active && (
              <motion.span
                layoutId="modoLeitura-pill"
                className="absolute inset-0 rounded-full bg-gradient-to-br from-[var(--brand-default)] to-[var(--brand-hover)] shadow-md shadow-[var(--brand-default)]/25"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
              />
            )}
            <span className="relative inline-flex items-center gap-1.5">
              <Icon className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
              <span className="hidden sm:inline">{label}</span>
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
