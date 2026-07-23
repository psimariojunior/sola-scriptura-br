'use client';

import { useState, useMemo, useCallback } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Search, X, Hash, TrendingUp, BarChart3, Languages, Volume2, ChevronDown, ChevronUp } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import { cn } from '@/lib/utils';
import { palavrasGregas, type PalavraGrega } from '@/data/lexicon/grego';
import { palavrasHebraicas, type PalavraHebraica } from '@/data/lexicon/hebraico';

type Idioma = 'grego' | 'hebraico';

export default function WordStudyPage() {
  const [idioma, setIdioma] = useState<Idioma>('grego');
  const [busca, setBusca] = useState('');
  const [selectedWord, setSelectedWord] = useState<PalavraGrega | PalavraHebraica | null>(null);
  const [expandedSection, setExpandedSection] = useState<string | null>('definicao');

  const palavras = useMemo(() => idioma === 'grego' ? palavrasGregas : palavrasHebraicas, [idioma]);

  const filtradas = useMemo(() => {
    if (!busca || busca.length < 2) return [];
    const termo = busca.toLowerCase();
    return palavras.filter(p =>
      p.palavra.toLowerCase().includes(termo) ||
      p.transliteracao.toLowerCase().includes(termo) ||
      ('definicaoResumida' in p && p.definicaoResumida?.toLowerCase().includes(termo)) ||
      p.strong.toLowerCase().includes(termo)
    ).slice(0, 20);
  }, [palavras, busca]);

  const selectWord = useCallback((word: PalavraGrega | PalavraHebraica) => {
    setSelectedWord(word);
    setExpandedSection('definicao');
  }, []);

  const isGrega = selectedWord && 'categoria' in selectedWord;

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16 px-6">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-10">
              <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 flex items-center justify-center border border-violet-500/20">
                <BookOpen className="w-10 h-10 text-violet-500" />
              </div>
              <h1 className="font-display text-4xl font-light mb-3">Word <span className="text-primary italic">Study</span></h1>
              <p className="text-muted-foreground max-w-lg mx-auto">Estudo completo de palavras originais — ocorrências, frequência, morfologia e uso bíblico</p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Search Panel */}
            <div className="lg:col-span-1">
              <div className="rounded-2xl border border-border/50 bg-card/50 p-4 sticky top-24">
                <div className="flex rounded-xl border border-border overflow-hidden mb-4">
                  <button onClick={() => setIdioma('grego')}
                    className={cn('flex-1 px-3 py-2.5 text-xs font-medium transition-all', idioma === 'grego' ? 'bg-primary text-primary-foreground' : 'bg-background text-muted-foreground')}>
                    🇬🇷 Grego
                  </button>
                  <button onClick={() => setIdioma('hebraico')}
                    className={cn('flex-1 px-3 py-2.5 text-xs font-medium transition-all border-l border-border', idioma === 'hebraico' ? 'bg-primary text-primary-foreground' : 'bg-background text-muted-foreground')}>
                    🇮🇱 Hebraico
                  </button>
                </div>

                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input type="text" value={busca} onChange={e => setBusca(e.target.value)}
                    placeholder="Buscar palavra ou Strong's..."
                    className="w-full pl-10 pr-8 py-2.5 text-sm bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20" />
                  {busca && <button onClick={() => { setBusca(''); setSelectedWord(null); }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-muted/50">
                    <X className="w-3 h-3" /></button>}
                </div>

                <div className="space-y-1 max-h-[50vh] overflow-y-auto">
                  {filtradas.map(p => (
                    <button key={p.strong} onClick={() => selectWord(p)}
                      className={cn('w-full text-left px-3 py-2.5 rounded-xl transition-all text-sm',
                        selectedWord?.strong === p.strong ? 'bg-primary/10 border border-primary/30' : 'hover:bg-muted/50')}>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-medium">{p.palavra}</span>
                          <span className="text-xs text-muted-foreground ml-2">({p.transliteracao})</span>
                        </div>
                        <span className="text-[10px] font-mono text-primary">{p.strong}</span>
                      </div>
                      <p className="text-xs text-muted-foreground truncate mt-0.5">
                        {'definicaoResumida' in p ? p.definicaoResumida : ''}
                      </p>
                    </button>
                  ))}
                  {busca.length >= 2 && filtradas.length === 0 && (
                    <p className="text-xs text-muted-foreground text-center py-4">Nenhuma palavra encontrada</p>
                  )}
                </div>
              </div>
            </div>

            {/* Detail Panel */}
            <div className="lg:col-span-2">
              {selectedWord ? (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                  className="rounded-2xl border border-border/50 bg-card/50 overflow-hidden">
                  {/* Header */}
                  <div className="px-6 py-5 border-b border-border/40 bg-muted/20">
                    <div className="flex items-start justify-between">
                      <div>
                        <h2 className="text-3xl font-display font-light mb-1">{selectedWord.palavra}</h2>
                        <p className="text-sm text-muted-foreground">{selectedWord.transliteracao}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-mono font-bold text-primary">{selectedWord.strong}</span>
                        <p className="text-[10px] text-muted-foreground uppercase">{idioma === 'grego' ? 'Grego' : 'Hebraico'}</p>
                      </div>
                    </div>
                    {'frequencia' in selectedWord && selectedWord.frequencia && (
                      <div className="mt-3 flex items-center gap-4">
                        <div className="flex items-center gap-1.5">
                          <Hash className="w-3.5 h-3.5 text-muted-foreground" />
                          <span className="text-sm font-medium">{selectedWord.frequencia}x</span>
                          <span className="text-xs text-muted-foreground">no Novo Testamento</span>
                        </div>
                        {'categoria' in selectedWord && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary capitalize">
                            {(selectedWord as PalavraGrega).categoria}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Sections */}
                  <div className="divide-y divide-border/40">
                    {/* Definição */}
                    <div className="px-6 py-4">
                      <button onClick={() => setExpandedSection(expandedSection === 'definicao' ? null : 'definicao')}
                        className="w-full flex items-center justify-between text-left">
                        <h3 className="font-medium text-sm flex items-center gap-2">
                          <BookOpen className="w-4 h-4 text-primary" /> Definição
                        </h3>
                        {expandedSection === 'definicao' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                      {expandedSection === 'definicao' && (
                        <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} className="mt-3">
                          <p className="text-sm leading-relaxed">{selectedWord.definicao}</p>
                          {'definicaoResumida' in selectedWord && (selectedWord as PalavraGrega).definicaoResumida && (
                            <p className="text-xs text-muted-foreground mt-2">Resumo: {(selectedWord as PalavraGrega).definicaoResumida}</p>
                          )}
                        </motion.div>
                      )}
                    </div>

                    {/* Morfologia */}
                    <div className="px-6 py-4">
                      <button onClick={() => setExpandedSection(expandedSection === 'morfologia' ? null : 'morfologia')}
                        className="w-full flex items-center justify-between text-left">
                        <h3 className="font-medium text-sm flex items-center gap-2">
                          <Languages className="w-4 h-4 text-primary" /> Morfologia
                        </h3>
                        {expandedSection === 'morfologia' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                      {expandedSection === 'morfologia' && (
                        <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} className="mt-3">
                          <div className="grid grid-cols-2 gap-3">
                            {'morfologia' in selectedWord && (
                              <div className="rounded-lg bg-muted/50 p-3">
                                <p className="text-[10px] font-semibold text-muted-foreground uppercase">Raiz</p>
                                <p className="text-sm font-medium">{(selectedWord as PalavraGrega).morphologia || '—'}</p>
                              </div>
                            )}
                            {'pronuncia' in selectedWord && (
                              <div className="rounded-lg bg-muted/50 p-3">
                                <p className="text-[10px] font-semibold text-muted-foreground uppercase">Pronúncia</p>
                                <p className="text-sm font-medium">{(selectedWord as PalavraGrega).pronuncia || '—'}</p>
                              </div>
                            )}
                            {'palavrasDerivadas' in selectedWord && (selectedWord as PalavraGrega).palavrasDerivadas && (
                              <div className="col-span-2 rounded-lg bg-muted/50 p-3">
                                <p className="text-[10px] font-semibold text-muted-foreground uppercase">Palavras Derivadas</p>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {(selectedWord as PalavraGrega).palavrasDerivadas!.map(d => (
                                    <span key={d} className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">{d}</span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </div>

                    {/* Uso Bíblico */}
                    {'versiculos' in selectedWord && (selectedWord as PalavraGrega).versiculos && (
                      <div className="px-6 py-4">
                        <button onClick={() => setExpandedSection(expandedSection === 'uso' ? null : 'uso')}
                          className="w-full flex items-center justify-between text-left">
                          <h3 className="font-medium text-sm flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-primary" /> Uso no NT ({(selectedWord as PalavraGrega).versiculos!.length} ocorrências)
                          </h3>
                          {expandedSection === 'uso' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                        {expandedSection === 'uso' && (
                          <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} className="mt-3">
                            <div className="flex flex-wrap gap-1.5">
                              {(selectedWord as PalavraGrega).versiculos!.map((v, i) => (
                                <span key={i} className="text-xs px-2 py-1 rounded-lg bg-muted hover:bg-primary/10 hover:text-primary cursor-pointer transition-all">
                                  {v}
                                </span>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </div>
                    )}

                    {/* Frequência - Gráfico */}
                    {'frequencia' in selectedWord && selectedWord.frequencia && (
                      <div className="px-6 py-4">
                        <button onClick={() => setExpandedSection(expandedSection === 'freq' ? null : 'freq')}
                          className="w-full flex items-center justify-between text-left">
                          <h3 className="font-medium text-sm flex items-center gap-2">
                            <BarChart3 className="w-4 h-4 text-primary" /> Frequência
                          </h3>
                          {expandedSection === 'freq' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                        {expandedSection === 'freq' && (
                          <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} className="mt-3">
                            <div className="rounded-lg bg-muted/50 p-4">
                              <div className="flex items-end gap-1 h-24">
                                {Array.from({ length: 10 }, (_, i) => {
                                  const freq = selectedWord.frequencia || 0;
                                  const height = Math.min(100, (freq / 200) * 100);
                                  const barHeight = i < Math.ceil(freq / 20) ? height * (1 - i * 0.1) : 10;
                                  return (
                                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                                      <motion.div initial={{ height: 0 }} animate={{ height: `${barHeight}%` }}
                                        transition={{ delay: i * 0.05, duration: 0.3 }}
                                        className={cn('w-full rounded-t', i < Math.ceil(freq / 20) ? 'bg-primary' : 'bg-muted')} />
                                    </div>
                                  );
                                })}
                              </div>
                              <div className="flex justify-between mt-2">
                                <span className="text-[10px] text-muted-foreground">Raro</span>
                                <span className="text-[10px] text-muted-foreground">Frequente</span>
                              </div>
                              <p className="text-xs text-center text-muted-foreground mt-2">
                                {selectedWord.frequencia} ocorrências no {idioma === 'grego' ? 'Novo Testamento' : 'Antigo Testamento'}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    )}

                    {/* Notas */}
                    {'notas' in selectedWord && (selectedWord as PalavraGrega).notas && (
                      <div className="px-6 py-4">
                        <h3 className="font-medium text-sm mb-2">Notas</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{(selectedWord as PalavraGrega).notas}</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              ) : (
                <div className="rounded-2xl border border-border/50 bg-card/50 p-12 text-center">
                  <BookOpen className="w-16 h-16 text-muted-foreground/20 mx-auto mb-4" />
                  <h3 className="font-display text-xl font-light mb-2">Selecione uma palavra</h3>
                  <p className="text-sm text-muted-foreground">Busque por uma palavra grega ou hebraica, ou pelo número Strong&apos;s</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
