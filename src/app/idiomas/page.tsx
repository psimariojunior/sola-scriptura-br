'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { palavrasGregas } from '@/data/lexicon/grego';
import { palavrasHebraicas } from '@/data/lexicon/hebraico';
import { Languages, Search, BookOpen, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import { useState, useMemo } from 'react';

type LexiconWord = typeof palavrasGregas[number];

const allWords: Array<LexiconWord & { lingua: 'grego' | 'hebraico' }> = [
  ...palavrasGregas.map(w => ({ ...w, lingua: 'grego' as const })),
  ...palavrasHebraicas.map(w => ({ ...w, lingua: 'hebraico' as const })),
];

export default function IdiomasPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'grego' | 'hebraico'>('all');

  const filtered = useMemo(() => {
    return allWords.filter(w => {
      const matchLang = filter === 'all' || w.lingua === filter;
      const matchSearch = !search || 
        w.palavra.toLowerCase().includes(search.toLowerCase()) ||
        w.transliteracao?.toLowerCase().includes(search.toLowerCase()) ||
        w.definicao.toLowerCase().includes(search.toLowerCase()) ||
        String(w.strong).includes(search);
      return matchLang && matchSearch;
    });
  }, [search, filter]);

  const gregoCount = palavrasGregas.length;
  const hebraicoCount = palavrasHebraicas.length;

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="w-16 h-16 rounded-2xl bg-rose-500/10 flex items-center justify-center mx-auto mb-6"
              >
                <Languages className="w-8 h-8 text-rose-500" />
              </motion.div>
              <h1 className="font-display text-4xl md:text-5xl font-light mb-4">
                Línguas <span className="italic text-primary">Originais</span>
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Estude o texto bíblico nas línguas originais: Grego Koiné do Novo Testamento e Hebraico Bíblico do Antigo Testamento.
              </p>
              <div className="ornament w-16 mx-auto mt-6" />
            </div>
          </ScrollReveal>

          {/* Stats */}
          <ScrollReveal delay={0.1}>
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="sola-card p-4 text-center">
                <p className="font-display text-3xl font-light text-primary">{gregoCount + hebraicoCount}</p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Total</p>
              </div>
              <div className="sola-card p-4 text-center">
                <p className="font-display text-3xl font-light text-blue-500">{gregoCount}</p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Grego</p>
              </div>
              <div className="sola-card p-4 text-center">
                <p className="font-display text-3xl font-light text-amber-500">{hebraicoCount}</p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Hebraico</p>
              </div>
            </div>
          </ScrollReveal>

          {/* Search and filter */}
          <ScrollReveal delay={0.15}>
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Buscar por palavra, transliteração, definição ou Strong..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 text-sm bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                />
              </div>
              <div className="flex gap-2">
                {[
                  { value: 'all' as const, label: 'Todos' },
                  { value: 'grego' as const, label: 'Grego' },
                  { value: 'hebraico' as const, label: 'Hebraico' },
                ].map(f => (
                  <motion.button
                    key={f.value}
                    onClick={() => setFilter(f.value)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`px-4 py-2 text-sm rounded-lg transition-all duration-300 ${
                      filter === f.value 
                        ? 'bg-primary text-primary-foreground font-semibold' 
                        : 'bg-card border border-border text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {f.label}
                  </motion.button>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Words grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.slice(0, 100).map((word, i) => (
              <ScrollReveal key={`${word.lingua}-${word.strong}`} delay={Math.min(i * 0.02, 0.5)}>
                <motion.div
                  className="glass-card p-5 h-full group"
                  whileHover={{ y: -3, boxShadow: '0 8px 30px rgba(196,162,101,0.1)' }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <span className="text-2xl font-serif">{word.palavra}</span>
                      <p className="text-sm text-muted-foreground italic">{word.transliteracao}</p>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      word.lingua === 'grego' ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400' : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                    }`}>
                      {word.lingua === 'grego' ? 'GREGO' : 'HEBRAICO'}
                    </span>
                  </div>
                  <p className="text-sm text-foreground/80 leading-relaxed mb-3">{word.definicao}</p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-3 h-3" />
                      Strong {word.strong}
                    </span>
                    {word.morfologia && (
                      <span className="flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        {word.morfologia}
                      </span>
                    )}
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>

          {filtered.length > 100 && (
            <p className="text-center text-sm text-muted-foreground mt-8">
              Mostrando 100 de {filtered.length} palavras
            </p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
