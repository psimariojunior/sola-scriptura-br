'use client';

import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';

interface LexiconEntry {
  idioma: 'hebraico' | 'grego';
  strong?: string;
  strongs?: string;
  numero?: string;
  palavra?: string;
  word?: string;
  hebrew?: string;
  greek?: string;
  transliteracao?: string;
  transliteration?: string;
  morfologia?: string;
  morphology?: string;
  definicao?: string;
  definition?: string;
  meaning?: string;
}

interface LexiconResultsProps {
  lexiconResults: LexiconEntry[];
  onSelectWord: (word: string) => void;
}

export function LexiconResults({ lexiconResults, onSelectWord }: LexiconResultsProps) {
  if (lexiconResults.length === 0) return null;

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-muted-foreground">
          Lexicon ({lexiconResults.length} resultado{lexiconResults.length !== 1 ? 's' : ''})
        </h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {lexiconResults.map((entry, i) => (
          <motion.div
            key={`${entry.idioma}-${entry.strong || entry.strongs || entry.numero}-${i}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: Math.min(i * 0.03, 0.4), duration: 0.2 }}
          >
            <div className="sola-card p-4 h-full flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded-sm ${
                  entry.idioma === 'hebraico'
                    ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300'
                    : 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300'
                }`}>
                  {entry.idioma === 'hebraico' ? 'Hebraico' : 'Grego'}
                </span>
                <span className="text-xs font-mono text-primary font-semibold">
                  {entry.strong || entry.strongs || entry.numero}
                </span>
              </div>
              <p className="font-serif-body text-lg font-semibold mb-0.5" dir={entry.idioma === 'hebraico' ? 'rtl' : 'ltr'}>
                {entry.palavra || entry.word || entry.hebrew || entry.greek}
              </p>
              {(entry.transliteracao || entry.transliteration) && (
                <p className="text-xs text-muted-foreground italic mb-1">
                  {entry.transliteracao || entry.transliteration}
                </p>
              )}
              {(entry.morfologia || entry.morphology) && (
                <p className="text-[10px] text-muted-foreground/80 mb-1.5">
                  {entry.morfologia || entry.morphology}
                </p>
              )}
              <p className="text-sm text-muted-foreground leading-relaxed flex-1 line-clamp-4">
                {entry.definicao || entry.definition || entry.meaning}
              </p>
              <button
                onClick={() => {
                  const word = entry.palavra || entry.word || entry.hebrew || entry.greek || '';
                  if (word) onSelectWord(word);
                }}
                className="mt-3 text-xs text-primary hover:text-primary/80 font-medium flex items-center gap-1 transition-colors"
              >
                <BookOpen className="w-3 h-3" />
                Ver versículos
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
