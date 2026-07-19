'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { BookText } from 'lucide-react';
import { cn } from '@/lib/utils';

type ViewMode = 'single' | 'parallel' | 'comparison';

const TRAD_IDS = ['arc', 'nvi', 'ara', 'acf', 'naa', 'ntlh', 'nvt', 'kja', 'aa', 'nbv', 'kjv', 'web'] as const;
const labelMap: Record<string, string> = { arc: 'ARC', nvi: 'NVI', ara: 'ARA', acf: 'ACF', naa: 'NAA', ntlh: 'NTLH', nvt: 'NVT', kja: 'KJA', aa: 'AA', nbv: 'NBV', kjv: 'KJV', web: 'WEB' };
const nomeMap: Record<string, string> = { arc: 'Almeida Revista e Corrigida', nvi: 'Nova Versão Internacional', ara: 'Almeida Revista e Atualizada', acf: 'Almeida Corrigida Fiel', naa: 'Nova Almeida Atualizada', ntlh: 'Nova Tradução na Linguagem de Hoje', nvt: 'Nova Versão Transformadora', kja: 'King James Atualizada', aa: 'Almeida e Atualizada', nbv: 'Nova Bíblia Viva', kjv: 'King James Version', web: 'World English Bible' };
const tradBadgeColors: Record<string, string> = { arc: 'bg-primary/10 text-primary', nvi: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400', ara: 'bg-purple-500/10 text-purple-600 dark:text-purple-400', acf: 'bg-rose-500/10 text-rose-600 dark:text-rose-400', naa: 'bg-teal-500/10 text-teal-600 dark:text-teal-400', ntlh: 'bg-orange-500/10 text-orange-600 dark:text-orange-400', nvt: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400', kja: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400', aa: 'bg-pink-500/10 text-pink-600 dark:text-pink-400', nbv: 'bg-lime-500/10 text-lime-600 dark:text-lime-400', kjv: 'bg-amber-500/10 text-amber-600 dark:text-amber-400', web: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' };

interface TranslationDropdownProps {
  open: boolean;
  onToggle: () => void;
  onClose: () => void;
  selectedTrads: string[];
  onToggleTrad: (id: string) => void;
  viewMode: ViewMode;
  onViewModeChange: (m: ViewMode) => void;
}

export function TranslationDropdown({ open, onToggle, onClose, selectedTrads, onToggleTrad, viewMode, onViewModeChange }: TranslationDropdownProps) {
  return (
    <div className="relative">
      <motion.button
        onClick={onToggle}
        whileTap={{ scale: 0.95 }}
        className={cn(
          'flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-semibold',
          'border transition-all duration-200',
          open || selectedTrads.length > 1
            ? 'bg-[var(--brand-subtle)] border-[var(--brand-default)]/30 text-[var(--brand-default)]'
            : 'bg-[var(--surface-sunken)] border-[var(--border)]/60 text-[var(--content-secondary)] hover:text-[var(--content-primary)]'
        )}
        aria-label="Selecionar traduções"
        aria-expanded={open}
      >
        <BookText className="w-3.5 h-3.5" />
        <span className="tabular-nums">{selectedTrads.map(t => labelMap[t]).join(' · ')}</span>
        {selectedTrads.length > 1 && <span className="text-[10px] px-1 rounded-full bg-[var(--brand-default)] text-[var(--brand-contrast)]">{selectedTrads.length}</span>}
      </motion.button>
      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-30" onClick={onClose} />
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 top-full mt-2 z-40 w-64 bg-[var(--surface-raised)] border border-[var(--border)] rounded-xl shadow-2xl p-2"
            >
              <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--content-muted)] px-3 py-1.5">Traduções</p>
              {TRAD_IDS.map(id => {
                const active = selectedTrads.includes(id);
                return (
                  <button key={id} onClick={() => onToggleTrad(id)}
                    className={cn(
                      'w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 transition-colors',
                      active ? 'bg-[var(--brand-subtle)] text-[var(--brand-default)]' : 'hover:bg-[var(--surface-sunken)] text-[var(--content-secondary)]'
                    )}>
                    <div className={cn('w-2 h-2 rounded-full', tradBadgeColors[id])} />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold">{labelMap[id]}</div>
                      <div className="text-[10px] text-[var(--content-muted)] truncate">{nomeMap[id]}</div>
                    </div>
                    {active && <span className="text-[var(--brand-default)] text-xs">✓</span>}
                  </button>
                );
              })}
              {selectedTrads.length > 1 && (
                <div className="mt-2 pt-2 border-t border-[var(--border)]/40 px-2 flex gap-1">
                  {(['single', 'parallel', 'comparison'] as ViewMode[]).map(m => (
                    <button key={m} onClick={() => onViewModeChange(m)}
                      className={cn(
                        'flex-1 text-[10px] font-medium px-2 py-1 rounded-md transition-colors',
                        viewMode === m ? 'bg-[var(--brand-default)] text-[var(--brand-contrast)]' : 'text-[var(--content-muted)] hover:bg-[var(--surface-sunken)]'
                      )}>
                      {m === 'single' ? 'Única' : m === 'parallel' ? 'Lado a lado' : 'Comparar'}
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export { TRAD_IDS, labelMap, nomeMap, tradBadgeColors };
