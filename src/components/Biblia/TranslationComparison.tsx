'use client';

import { useState, useMemo } from 'react';
import { X, Search, ArrowRight, BookOpen, Languages, ChevronDown, ChevronUp, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { hrefBiblia } from '@/lib/bibliaHref';
import { TODOS_LIVROS } from '@/data/biblia/livros';

interface TranslationComparisonProps {
  open: boolean;
  onClose: () => void;
  livro?: string;
  capitulo?: number;
  versiculo?: number;
}

interface Translation {
  id: string;
  nome: string;
  sigla: string;
  tipo: 'formal' | 'dynamo' | 'parafrase';
  texto: string;
}

// Example data - in production this would come from the Bible data
const SAMPLE_TRANSLATIONS: Translation[] = [
  { id: 'arc', nome: 'Actualização Revisada', sigla: 'ARC', tipo: 'formal', texto: 'Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.' },
  { id: 'ara', nome: 'Atualizada', sigla: 'ARA', tipo: 'formal', texto: 'Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.' },
  { id: 'nvi', nome: 'Nova Versão Internacional', sigla: 'NVI', tipo: 'dynamo', texto: 'Porque Deus tanto amou o mundo que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.' },
  { id: 'kja', nome: 'King James Atualizada', sigla: 'KJA', tipo: 'formal', texto: 'Porque Deus amou o mundo de tal forma que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.' },
  { id: 'acb', nome: 'Bíblia de Estudo Almeida', sigla: 'ACF', tipo: 'formal', texto: 'Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.' },
  { id: 'nvt', nome: 'Nova Tradução na Linguagem de Hoje', sigla: 'NVT', tipo: 'parafrase', texto: 'Deus amou tanto o mundo que deu o seu Filho unigênito, para que todo o que crer nele não venha a perecer, mas tenha a vida eterna.' },
  { id: 'web', nome: 'World English Bible', sigla: 'WEB', tipo: 'formal', texto: 'For God so loved the world, that he gave his one and only Son, that whoever believes in him should not perish, but have eternal life.' },
  { id: 'kjv', nome: 'King James Version', sigla: 'KJV', tipo: 'formal', texto: 'For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.' },
];

const TIPO_LABELS: Record<string, { label: string; cor: string }> = {
  formal: { label: 'Formal', cor: '#3b82f6' },
  dynamo: { label: 'Dinâmica', cor: '#10b981' },
  parafrase: { label: 'Paráfrase', cor: '#f59e0b' },
};

function nomeLivro(abrev: string): string {
  return TODOS_LIVROS.find((l) => l.abreviacao === abrev)?.nome ?? abrev;
}

function compareWords(text1: string, text2: string): { word: string; match: boolean; index: number }[] {
  const words1 = text1.toLowerCase().replace(/[.,;:!?]/g, '').split(/\s+/);
  const words2 = new Set(text2.toLowerCase().replace(/[.,;:!?]/g, '').split(/\s+/));
  return words1.map((w, i) => ({ word: w, match: words2.has(w), index: i }));
}

export function TranslationComparison({
  open,
  onClose,
  livro = 'jn',
  capitulo = 3,
  versiculo = 16,
}: TranslationComparisonProps) {
  const [selectedTranslations, setSelectedTranslations] = useState<string[]>(['arc', 'nvi', 'kja']);
  const [showOriginal, setShowOriginal] = useState(false);
  const [highlightDiffs, setHighlightDiffs] = useState(true);
  const [expandedVerse, setExpandedVerse] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const refLabel = `${nomeLivro(livro)} ${capitulo}:${versiculo}`;

  const filteredTranslations = useMemo(() => {
    if (!searchQuery) return SAMPLE_TRANSLATIONS;
    return SAMPLE_TRANSLATIONS.filter(t =>
      t.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.sigla.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const toggleTranslation = (id: string) => {
    setSelectedTranslations(prev =>
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
  };

  const selectedTrans = SAMPLE_TRANSLATIONS.filter(t => selectedTranslations.includes(t.id));

  const content = (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="shrink-0 px-5 py-4 border-b border-[var(--border)]/50 bg-gradient-to-b from-[var(--surface-raised)] to-[var(--surface)]">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Languages className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[var(--content-primary)]">
                Comparador de Traduções
              </h2>
              <p className="text-[10px] text-[var(--content-muted)]">
                {refLabel} · {selectedTranslations.length} traduções selecionadas
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-[var(--surface-sunken)] transition-colors" aria-label="Fechar">
            <X className="w-5 h-5 text-[var(--content-muted)]" />
          </button>
        </div>

        {/* Options */}
        <div className="flex items-center gap-3 mb-3">
          <button
            onClick={() => setHighlightDiffs(!highlightDiffs)}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all',
              highlightDiffs
                ? 'bg-indigo-500/10 text-indigo-500 border border-indigo-500/20'
                : 'border border-[var(--border)] text-[var(--content-muted)]'
            )}
          >
            <Filter className="w-3 h-3" />
            Diferenças
          </button>
          <button
            onClick={() => setShowOriginal(!showOriginal)}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all',
              showOriginal
                ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                : 'border border-[var(--border)] text-[var(--content-muted)]'
            )}
          >
            <BookOpen className="w-3 h-3" />
            Original
          </button>
        </div>

        {/* Translation selector */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--content-muted)]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar tradução..."
            className="w-full pl-10 pr-4 py-2 text-xs rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--content-primary)] placeholder:text-[var(--content-muted)] focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
          />
        </div>
      </div>

      {/* Translation chips */}
      <div className="shrink-0 px-5 py-3 border-b border-[var(--border)]/30 overflow-x-auto">
        <div className="flex gap-2">
          {filteredTranslations.map(t => (
            <button
              key={t.id}
              onClick={() => toggleTranslation(t.id)}
              className={cn(
                'shrink-0 px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all',
                selectedTranslations.includes(t.id)
                  ? 'bg-indigo-500 text-white shadow-sm'
                  : 'border border-[var(--border)] text-[var(--content-muted)] hover:border-indigo-500/30'
              )}
            >
              {t.sigla}
            </button>
          ))}
        </div>
      </div>

      {/* Comparison */}
      <div className="flex-1 overflow-y-auto p-5">
        {selectedTrans.length === 0 ? (
          <div className="text-center py-12">
            <Languages className="w-12 h-12 mx-auto mb-3 text-[var(--content-muted)] opacity-20" strokeWidth={1} />
            <p className="text-sm text-[var(--content-muted)]">
              Selecione pelo menos uma tradução para comparar.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {selectedTrans.map((trans, i) => {
              const tipo = TIPO_LABELS[trans.tipo];
              const words = highlightDiffs && selectedTrans.length > 1
                ? compareWords(trans.texto, selectedTrans[0]?.texto || '')
                : null;

              return (
                <motion.div
                  key={trans.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-xl border border-[var(--border)]/50 bg-[var(--surface)] overflow-hidden"
                >
                  {/* Translation header */}
                  <div className="flex items-center justify-between px-4 py-2.5 border-b border-[var(--border)]/30 bg-[var(--surface-sunken)]">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[var(--content-primary)]">{trans.sigla}</span>
                      <span className="text-[10px] text-[var(--content-muted)]">{trans.nome}</span>
                    </div>
                    <span
                      className="text-[9px] px-2 py-0.5 rounded-full font-bold"
                      style={{ backgroundColor: tipo.cor + '20', color: tipo.cor }}
                    >
                      {tipo.label}
                    </span>
                  </div>

                  {/* Text */}
                  <div className="px-4 py-3">
                    {words ? (
                      <p className="text-sm font-serif-body leading-relaxed text-[var(--content-primary)]">
                        {words.map((w, j) => (
                          <span
                            key={j}
                            className={cn(
                              'transition-colors',
                              w.match ? 'text-[var(--content-primary)]' : 'text-red-500 font-medium'
                            )}
                          >
                            {w.word}{' '}
                          </span>
                        ))}
                      </p>
                    ) : (
                      <p className="text-sm font-serif-body leading-relaxed text-[var(--content-primary)]">
                        {trans.texto}
                      </p>
                    )}
                  </div>
                </motion.div>
              );
            })}

            {/* Word comparison table */}
            {selectedTrans.length > 1 && highlightDiffs && (
              <div className="rounded-xl border border-[var(--border)]/50 bg-[var(--surface)] overflow-hidden">
                <div className="px-4 py-2.5 border-b border-[var(--border)]/30 bg-[var(--surface-sunken)]">
                  <span className="text-xs font-bold text-[var(--content-primary)]">Análise Palavra a Palavra</span>
                </div>
                <div className="p-4 overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-[var(--border)]/30">
                        <th className="text-left py-2 text-[var(--content-muted)] font-bold">Pos.</th>
                        {selectedTrans.map(t => (
                          <th key={t.id} className="text-left py-2 text-[var(--content-muted)] font-bold px-3">
                            {t.sigla}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {(() => {
                        const allWords = selectedTrans.map(t =>
                          t.texto.toLowerCase().replace(/[.,;:!?]/g, '').split(/\s+/)
                        );
                        const maxLen = Math.max(...allWords.map(w => w.length));
                        return Array.from({ length: Math.min(maxLen, 30) }, (_, i) => (
                          <tr key={i} className="border-b border-[var(--border)]/20 last:border-0">
                            <td className="py-1.5 text-[var(--content-muted)] font-mono">{i + 1}</td>
                            {selectedTrans.map((t, ti) => {
                              const word = allWords[ti]?.[i] || '—';
                              const match = allWords.every(w => w[i] === word || w[i] === undefined);
                              return (
                                <td
                                  key={t.id}
                                  className={cn(
                                    'py-1.5 px-3 font-mono',
                                    match ? 'text-[var(--content-primary)]' : 'text-amber-500 font-medium'
                                  )}
                                >
                                  {word}
                                </td>
                              );
                            })}
                          </tr>
                        ));
                      })()}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-[var(--surface-raised)] rounded-t-3xl shadow-2xl h-[90vh]"
          >
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-12 h-1.5 rounded-full bg-[var(--content-muted)] opacity-20" />
            </div>
            {content}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
