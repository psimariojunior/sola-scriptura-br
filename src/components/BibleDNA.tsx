'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Dna, BookOpen, ChevronRight, Filter } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface ThemeNode {
  id: string;
  name: string;
  color: string;
  occurrences: { book: string; chapter: number; verse: number; strength: number }[];
  totalOccurrences: number;
  books: string[];
}

const BIBLE_THEMES: ThemeNode[] = [
  { id: 'love', name: 'Amor', color: '#EF4444', totalOccurrences: 698, books: ['1 Co', 'Jo', 'Ef', '1 Jo', 'Cl'],
    occurrences: [
      { book: 'Gn', chapter: 1, verse: 1, strength: 0.3 }, { book: 'Dt', chapter: 6, verse: 5, strength: 0.8 },
      { book: 'Sl', chapter: 136, verse: 1, strength: 0.7 }, { book: 'Jr', chapter: 31, verse: 3, strength: 0.9 },
      { book: 'Os', chapter: 11, verse: 1, strength: 0.6 }, { book: 'Mt', chapter: 22, verse: 37, strength: 1.0 },
      { book: 'Jo', chapter: 3, verse: 16, strength: 1.0 }, { book: 'Jo', chapter: 13, verse: 34, strength: 0.9 },
      { book: 'Rm', chapter: 8, verse: 38, strength: 0.95 }, { book: '1 Co', chapter: 13, verse: 4, strength: 1.0 },
      { book: 'Ef', chapter: 3, verse: 19, strength: 0.85 }, { book: '1 Jo', chapter: 4, verse: 8, strength: 1.0 },
    ]},
  { id: 'faith', name: 'Fé', color: '#3B82F6', totalOccurrences: 539, books: ['Hb', 'Rm', 'Gl', 'Tg', 'Ef'],
    occurrences: [
      { book: 'Gn', chapter: 15, verse: 6, strength: 0.9 }, { book: 'Nm', chapter: 20, verse: 12, strength: 0.5 },
      { book: 'Sl', chapter: 27, verse: 13, strength: 0.6 }, { book: 'Hb', chapter: 11, verse: 1, strength: 1.0 },
      { book: 'Rm', chapter: 1, verse: 17, strength: 0.95 }, { book: 'Rm', chapter: 10, verse: 17, strength: 0.9 },
      { book: 'Gl', chapter: 2, verse: 20, strength: 0.85 }, { book: 'Ef', chapter: 2, verse: 8, strength: 0.95 },
      { book: 'Tg', chapter: 2, verse: 17, strength: 0.8 },
    ]},
  { id: 'hope', name: 'Esperança', color: '#10B981', totalOccurrences: 167, books: ['Rm', '1 Co', 'Cl', 'Tt', '1 P'],
    occurrences: [
      { book: 'Gn', chapter: 12, verse: 3, strength: 0.7 }, { book: 'Sl', chapter: 42, verse: 11, strength: 0.6 },
      { book: 'Is', chapter: 40, verse: 31, strength: 0.95 }, { book: 'Jr', chapter: 29, verse: 11, strength: 1.0 },
      { book: 'Rm', chapter: 8, verse: 24, strength: 0.9 }, { book: 'Rm', chapter: 15, verse: 13, strength: 0.95 },
      { book: '1 Co', chapter: 13, verse: 13, strength: 0.85 }, { book: 'Cl', chapter: 1, verse: 27, strength: 0.8 },
      { book: '1 P', chapter: 1, verse: 3, strength: 0.9 },
    ]},
  { id: 'salvation', name: 'Salvação', color: '#8B5CF6', totalOccurrences: 154, books: ['Ef', 'Tt', 'Rm', 'Hb', 'At'],
    occurrences: [
      { book: 'Ex', chapter: 14, verse: 13, strength: 0.7 }, { book: 'Is', chapter: 53, verse: 5, strength: 1.0 },
      { book: 'Jl', chapter: 2, verse: 32, strength: 0.8 }, { book: 'Mt', chapter: 1, verse: 21, strength: 0.9 },
      { book: 'Lc', chapter: 19, verse: 10, strength: 0.85 }, { book: 'Jo', chapter: 14, verse: 6, strength: 1.0 },
      { book: 'At', chapter: 4, verse: 12, strength: 0.95 }, { book: 'Rm', chapter: 10, verse: 9, strength: 0.9 },
      { book: 'Ef', chapter: 2, verse: 8, strength: 0.95 }, { book: 'Tt', chapter: 3, verse: 5, strength: 0.9 },
    ]},
  { id: 'prayer', name: 'Oração', color: '#F59E0B', totalOccurrences: 650, books: ['Mt', 'Lc', 'Ef', 'Fp', 'Cl'],
    occurrences: [
      { book: 'Gn', chapter: 4, verse: 26, strength: 0.5 }, { book: '1 Sm', chapter: 1, verse: 15, strength: 0.7 },
      { book: 'Sl', chapter: 145, verse: 18, strength: 0.8 }, { book: 'Dn', chapter: 6, verse: 10, strength: 0.9 },
      { book: 'Mt', chapter: 6, verse: 5, strength: 0.95 }, { book: 'Mt', chapter: 6, verse: 9, strength: 1.0 },
      { book: 'Lc', chapter: 11, verse: 2, strength: 0.9 }, { book: 'Ef', chapter: 6, verse: 18, strength: 0.85 },
      { book: 'Fp', chapter: 4, verse: 6, strength: 0.95 }, { book: '1 Ts', chapter: 5, verse: 17, strength: 0.9 },
    ]},
  { id: 'justice', name: 'Justiça', color: '#EC4899', totalOccurrences: 289, books: ['Am', 'Mi', 'Is', 'Jr', 'Rm'],
    occurrences: [
      { book: 'Gn', chapter: 18, verse: 25, strength: 0.9 }, { book: 'Dt', chapter: 16, verse: 20, strength: 0.85 },
      { book: 'Sl', chapter: 89, verse: 14, strength: 0.9 }, { book: 'Am', chapter: 5, verse: 24, strength: 1.0 },
      { book: 'Mi', chapter: 6, verse: 8, strength: 1.0 }, { book: 'Is', chapter: 1, verse: 17, strength: 0.95 },
      { book: 'Jr', chapter: 22, verse: 3, strength: 0.9 }, { book: 'Rm', chapter: 3, verse: 26, strength: 0.95 },
    ]},
  { id: 'creation', name: 'Criação', color: '#06B6D4', totalOccurrences: 89, books: ['Gn', 'Sl', 'Jó', 'Cl', 'Hb'],
    occurrences: [
      { book: 'Gn', chapter: 1, verse: 1, strength: 1.0 }, { book: 'Gn', chapter: 1, verse: 27, strength: 0.95 },
      { book: 'Sl', chapter: 19, verse: 1, strength: 0.9 }, { book: 'Sl', chapter: 104, verse: 24, strength: 0.85 },
      { book: 'Jó', chapter: 38, verse: 4, strength: 0.9 }, { book: 'Is', chapter: 40, verse: 28, strength: 0.85 },
      { book: 'Jó', chapter: 40, verse: 15, strength: 0.7 }, { book: 'Cl', chapter: 1, verse: 16, strength: 0.9 },
    ]},
  { id: 'prophecy', name: 'Profecia', color: '#F97316', totalOccurrences: 1818, books: ['Is', 'Jr', 'Dn', 'Ap', 'Zc'],
    occurrences: [
      { book: 'Nm', chapter: 24, verse: 17, strength: 0.8 }, { book: 'Is', chapter: 7, verse: 14, strength: 1.0 },
      { book: 'Is', chapter: 53, verse: 5, strength: 1.0 }, { book: 'Jr', chapter: 29, verse: 11, strength: 0.85 },
      { book: 'Dn', chapter: 7, verse: 13, strength: 0.9 }, { book: 'Dn', chapter: 9, verse: 27, strength: 0.95 },
      { book: 'Zc', chapter: 12, verse: 10, strength: 0.9 }, { book: 'Mt', chapter: 24, verse: 30, strength: 0.95 },
      { book: 'Ap', chapter: 21, verse: 1, strength: 1.0 },
    ]},
];

const BOOKS_ORDER = [
  'Gn', 'Ex', 'Lv', 'Nm', 'Dt', 'Js', 'Jz', 'Rt', '1 Sm', '2 Sm', '1 Rs', '2 Rs', '1 Cr', '2 Cr',
  'Ed', 'Ne', 'Et', 'Jó', 'Sl', 'Pv', 'Ec', 'Ct', 'Is', 'Jr', 'Lm', 'Ez', 'Dn', 'Os', 'Jl', 'Am',
  'Ob', 'Jn', 'Mq', 'Na', 'Hc', 'Sf', 'Ag', 'Zc', 'Ml',
  'Mt', 'Mc', 'Lc', 'Jo', 'At', 'Rm', '1 Co', '2 Co', 'Gl', 'Ef', 'Fp', 'Cl', '1 Ts', '2 Ts',
  '1 Tm', '2 Tm', 'Tt', 'Fm', 'Hb', 'Tg', '1 P', '2 P', '1 Jo', '2 Jo', '3 Jo', 'Jd', 'Ap',
];

export function BibleDNA() {
  const [selectedTheme, setSelectedTheme] = useState<ThemeNode | null>(null);
  const [hoveredBook, setHoveredBook] = useState<string | null>(null);

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-[var(--border)]/40">
        <div className="flex items-center gap-2 mb-1">
          <Dna className="w-5 h-5 text-[var(--brand)]" />
          <h2 className="font-bold text-lg">Bible DNA</h2>
        </div>
        <p className="text-xs text-[var(--content-muted)]">Visualize como temas percorrem toda a Bíblia.</p>
      </div>

      {/* Theme buttons */}
      <div className="flex gap-1.5 p-3 overflow-x-auto">
        {BIBLE_THEMES.map(theme => (
          <button key={theme.id} onClick={() => setSelectedTheme(selectedTheme?.id === theme.id ? null : theme)}
            className={cn('flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all border',
              selectedTheme?.id === theme.id ? 'border-current shadow-sm' : 'border-transparent hover:border-[var(--border)]')}
            style={{ color: theme.color, backgroundColor: `${theme.color}10` }}>
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: theme.color }} />
            {theme.name}
            <span className="text-[10px] opacity-60">{theme.totalOccurrences}</span>
          </button>
        ))}
      </div>

      {/* DNA Visualization */}
      <div className="flex-1 overflow-auto p-3">
        <div className="space-y-0.5">
          {BOOKS_ORDER.map((book, idx) => {
            const themeStrengths = selectedTheme
              ? selectedTheme.occurrences.filter(o => o.book === book)
              : BIBLE_THEMES.flatMap(t => t.occurrences.filter(o => o.book === book).map(o => ({ ...o, color: t.color, theme: t.name })));
            const maxStrength = themeStrengths.length > 0 ? Math.max(...themeStrengths.map(t => t.strength)) : 0;

            return (
              <motion.div key={book}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.01 }}
                onMouseEnter={() => setHoveredBook(book)}
                onMouseLeave={() => setHoveredBook(null)}
                className={cn('flex items-center gap-2 px-2 py-0.5 rounded text-xs transition-all cursor-default',
                  hoveredBook === book ? 'bg-[var(--surface-raised)]' : '')}>
                <span className="w-8 text-[10px] text-[var(--content-muted)] font-mono shrink-0">{book}</span>
                <div className="flex-1 h-4 rounded-full overflow-hidden bg-[var(--surface-sunken)] relative">
                  {selectedTheme ? (
                    <motion.div initial={{ width: 0 }} animate={{ width: `${maxStrength * 100}%` }}
                      className="h-full rounded-full" style={{ backgroundColor: selectedTheme.color, opacity: 0.6 + maxStrength * 0.4 }} />
                  ) : (
                    <div className="flex h-full">
                      {BIBLE_THEMES.map(theme => {
                        const strength = theme.occurrences.filter(o => o.book === book).reduce((max, o) => Math.max(max, o.strength), 0);
                        if (strength === 0) return null;
                        return (
                          <motion.div key={theme.id} initial={{ width: 0 }}
                            animate={{ width: `${(strength / BIBLE_THEMES.length) * 100}%` }}
                            className="h-full" style={{ backgroundColor: theme.color, opacity: 0.6 + strength * 0.4 }} />
                        );
                      })}
                    </div>
                  )}
                </div>
                <span className="w-6 text-[10px] text-[var(--content-muted)] text-right shrink-0">
                  {selectedTheme ? selectedTheme.occurrences.filter(o => o.book === book).length : 0}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* Legend */}
        {selectedTheme && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-3 rounded-xl border border-[var(--border)]/40 bg-[var(--surface-raised)]">
            <h4 className="text-xs font-bold mb-2" style={{ color: selectedTheme.color }}>{selectedTheme.name}</h4>
            <div className="space-y-1">
              {selectedTheme.occurrences.slice(0, 5).map((occ, i) => (
                <div key={i} className="flex items-center gap-2 text-xs">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: selectedTheme.color, opacity: occ.strength }} />
                  <span className="font-medium">{occ.book} {occ.chapter}:{occ.verse}</span>
                  <span className="text-[var(--content-muted)]">— {Math.round(occ.strength * 100)}% força</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
