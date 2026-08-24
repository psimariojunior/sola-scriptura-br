'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Languages, Search, BookOpen, Sparkles, Volume2, Loader2, Hash, BarChart3, ChevronDown, ChevronUp, Link2, ArrowRight, Filter, SortAsc, Layers, Info, BookMarked } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import { useState, useMemo, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { romanizeHebrew } from '@/lib/hebrewRomanize';
import { carregarLexicoGrego, carregarLexicoHebraico } from '@/lib/lexicon-lazy';
import { AudioPronunciation } from '@/components/AudioPronunciation';
import { parsearMorfologia, getCorMorfologia } from '@/lib/morphology';
import { cn } from '@/lib/utils';
import type { PalavraGrega } from '@/data/lexicon/grego';
import type { PalavraHebraica } from '@/data/lexicon/hebraico';
import type { LexiconWord } from '@/types/lexicon';

type Idioma = 'grego' | 'hebraico';
type SortBy = 'strong' | 'frequencia' | 'palavra';
type ModoView = 'grid' | 'list' | 'frequency';

const DOMINIOS_SEMANTICOS: Record<string, { label: string; cor: string }> = {
  '1': { label: 'Corpo Humano', cor: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300' },
  '2': { label: 'Agrupamentos Humanos', cor: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' },
  '3': { label: 'Atividades Humanas', cor: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300' },
  '4': { label: 'Ações Sociais', cor: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300' },
  '5': { label: 'Cognição e Percepção', cor: 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300' },
  '6': { label: 'Mundo Físico', cor: 'bg-lime-100 text-lime-700 dark:bg-lime-900/30 dark:text-lime-300' },
  '7': { label: 'Espaço e Movimento', cor: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300' },
  '11': { label: 'Dimensão Espiritual', cor: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300' },
  '12': { label: 'Relacionamentos', cor: 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300' },
  '43': { label: 'Fé e Crença', cor: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300' },
  '44': { label: 'Perdão e Graça', cor: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' },
  '46': { label: 'Redenção e Salvação', cor: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300' },
  '50': { label: 'Reino de Deus', cor: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300' },
};

const LOUW_NIDA_MAP: Record<string, string[]> = {
  'G25': ['44.25'], 'G26': ['44.25'], 'G27': ['44.25'], 'G40': ['44.25'],
  'G11': ['25.50'], 'G12': ['25.50'], 'G13': ['25.50'],
  'G69': ['67.171'], 'G70': ['67.171'], 'G71': ['8.31'],
  'G43': ['11.14'], 'G42': ['11.14'], 'G15': ['12.23'],
};

function usePronunciation() {
  const [speaking, setSpeaking] = useState<string | null>(null);
  const pronounce = useCallback((text: string, lang: 'grego' | 'hebraico') => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === 'grego' ? 'el-GR' : 'he-IL';
    utterance.rate = 0.7;
    const id = `${lang}-${text}`;
    setSpeaking(id);
    utterance.onend = () => setSpeaking(null);
    utterance.onerror = () => setSpeaking(null);
    window.speechSynthesis.speak(utterance);
  }, []);
  return { speaking, pronounce };
}

function SectionHeader({ icon: Icon, title, expanded, onClick, count }: {
  icon: React.ElementType; title: string; expanded: boolean; onClick: () => void; count?: number;
}) {
  return (
    <button onClick={onClick} className="w-full flex items-center justify-between text-left py-2 group">
      <h3 className="font-medium text-sm flex items-center gap-2">
        <Icon className="w-4 h-4 text-primary" />
        {title}
        {count !== undefined && <span className="text-[10px] text-muted-foreground">({count})</span>}
      </h3>
      <ChevronDown className={cn('w-4 h-4 text-muted-foreground transition-transform', expanded && 'rotate-180')} />
    </button>
  );
}

export default function IdiomasPage() {
  const { t } = useTranslation();
  const [idioma, setIdioma] = useState<Idioma>('grego');
  const [busca, setBusca] = useState('');
  const [modoView, setModoView] = useState<ModoView>('grid');
  const [filtroCategoria, setFiltroCategoria] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortBy>('strong');
  const [expandedStrong, setExpandedStrong] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['definicao', 'morfologia']));
  const [palavrasGregas, setPalavrasGregas] = useState<PalavraGrega[]>([]);
  const [palavrasHebraicas, setPalavrasHebraicas] = useState<PalavraHebraica[]>([]);
  const [carregando, setCarregando] = useState(true);
  const { speaking, pronounce } = usePronunciation();

  useEffect(() => {
    Promise.all([carregarLexicoGrego(), carregarLexicoHebraico()]).then(([g, h]) => {
      setPalavrasGregas(g);
      setPalavrasHebraicas(h);
      setCarregando(false);
    });
  }, []);

  const palavras = useMemo(() => {
    const base = idioma === 'grego' ? palavrasGregas : palavrasHebraicas;
    return base.map(p => ({ ...p, lingua: idioma }));
  }, [idioma, palavrasGregas, palavrasHebraicas]);

  const categorias = useMemo(() => {
    const cats = new Set(palavras.map(p => 'categoria' in p ? (p as PalavraGrega).categoria : '').filter(Boolean));
    return [...cats];
  }, [palavras]);

  const filtradas = useMemo(() => {
    let result = palavras;
    if (idioma === 'hebraico') {
      result = result.filter(p => p.transliteracao || p.definicao);
    }
    if (busca) {
      const termo = busca.toLowerCase();
      result = result.filter(p =>
        p.palavra.toLowerCase().includes(termo) ||
        p.transliteracao.toLowerCase().includes(termo) ||
        romanizeHebrew(p.transliteracao).toLowerCase().includes(termo) ||
        ('definicaoResumida' in p && (p as PalavraGrega).definicaoResumida?.toLowerCase().includes(termo)) ||
        p.definicao?.toLowerCase().includes(termo) ||
        p.strong.toLowerCase().includes(termo)
      );
    }
    if (filtroCategoria !== 'all' && idioma === 'grego') {
      result = result.filter(p => 'categoria' in p && (p as PalavraGrega).categoria === filtroCategoria);
    }
    if (sortBy === 'strong') {
      result = [...result].sort((a, b) => parseInt(a.strong.slice(1)) - parseInt(b.strong.slice(1)));
    } else if (sortBy === 'frequencia') {
      result = [...result].sort((a, b) => ((b as PalavraGrega).frequencia || 0) - ((a as PalavraGrega).frequencia || 0));
    } else if (sortBy === 'palavra') {
      result = [...result].sort((a, b) => a.palavra.localeCompare(b.palavra));
    }
    return result;
  }, [palavras, busca, filtroCategoria, idioma, sortBy]);

  const topFrequent = useMemo(() => {
    const withFreq = palavras.filter(p => (p as PalavraGrega).frequencia && (p as PalavraGrega).frequencia! > 0) as (PalavraGrega | (PalavraHebraica & { frequencia?: number }))[];
    return [...withFreq].sort((a, b) => ((b as PalavraGrega).frequencia || 0) - ((a as PalavraGrega).frequencia || 0)).slice(0, 20);
  }, [palavras]);

  const maxFreq = useMemo(() => topFrequent.length === 0 ? 1 : (topFrequent[0] as PalavraGrega).frequencia || 1, [topFrequent]);

  const toggleStrong = useCallback((strong: string) => {
    setExpandedStrong(prev => prev === strong ? null : strong);
  }, []);

  const toggleSection = useCallback((section: string) => {
    setExpandedSections(prev => {
      const next = new Set(prev);
      if (next.has(section)) next.delete(section);
      else next.add(section);
      return next;
    });
  }, []);

  const selectedWord = useMemo(() => {
    if (!expandedStrong) return null;
    const source = idioma === 'grego' ? palavrasGregas : palavrasHebraicas;
    return source.find(p => p.strong === expandedStrong) || null;
  }, [expandedStrong, idioma, palavrasGregas, palavrasHebraicas]);

  const isGrega = selectedWord && 'categoria' in selectedWord;

  const gregoCount = palavrasGregas.length;
  const hebraicoCount = palavrasHebraicas.length;

  if (carregando) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-24 pb-16 px-6">
          <div className="max-w-6xl mx-auto text-center py-20">
            <div className="inline-flex gap-2">
              <span className="w-3 h-3 bg-primary rounded-full animate-bounce [animation-delay:0s]" />
              <span className="w-3 h-3 bg-primary rounded-full animate-bounce [animation-delay:0.15s]" />
              <span className="w-3 h-3 bg-primary rounded-full animate-bounce [animation-delay:0.3s]" />
            </div>
            <p className="text-sm text-muted-foreground mt-4">{t('languages.loadingLexicon')}</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

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
                {t('languages.pageTitle1')} <span className="italic text-primary">{t('languages.pageTitle2')}</span>
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t('languages.pageDescription')}
              </p>
              <div className="ornament w-16 mx-auto mt-6" />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="sola-card p-4 text-center">
                <p className="font-display text-3xl font-light text-primary">{gregoCount + hebraicoCount}</p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">{t('languages.total')}</p>
              </div>
              <div className="sola-card p-4 text-center">
                <p className="font-display text-3xl font-light text-blue-500">{gregoCount}</p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">{t('languages.greek')}</p>
              </div>
              <div className="sola-card p-4 text-center">
                <p className="font-display text-3xl font-light text-amber-500">{hebraicoCount}</p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">{t('languages.hebrew')}</p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <div className="flex rounded-xl border border-border overflow-hidden">
                <button onClick={() => { setIdioma('grego'); setExpandedStrong(null); }}
                  className={cn('px-4 py-2.5 text-sm font-medium transition-all', idioma === 'grego' ? 'bg-primary text-primary-foreground' : 'bg-background text-muted-foreground')}>
                  🇬🇷 {t('palavras.greekNT')} ({gregoCount})
                </button>
                <button onClick={() => { setIdioma('hebraico'); setExpandedStrong(null); }}
                  className={cn('px-4 py-2.5 text-sm font-medium transition-all border-l border-border', idioma === 'hebraico' ? 'bg-primary text-primary-foreground' : 'bg-background text-muted-foreground')}>
                  🇮🇱 {t('palavras.hebrewAT')} ({hebraicoCount})
                </button>
              </div>
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder={t('languages.searchPlaceholderFull')}
                  value={busca}
                  onChange={e => setBusca(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 text-sm bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                />
                {busca && (
                  <button onClick={() => setBusca('')} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-muted/50">
                    <span className="w-4 h-4">×</span>
                  </button>
                )}
              </div>
              <div className="flex rounded-xl border border-border overflow-hidden">
                <button onClick={() => setModoView('grid')}
                  className={cn('px-3 py-2 text-xs font-medium transition-all', modoView === 'grid' ? 'bg-primary text-primary-foreground' : 'bg-background text-muted-foreground')}>
                  <BookOpen className="w-3.5 h-3.5 inline mr-1" />Grade
                </button>
                <button onClick={() => setModoView('list')}
                  className={cn('px-3 py-2 text-xs font-medium transition-all border-l border-border', modoView === 'list' ? 'bg-primary text-primary-foreground' : 'bg-background text-muted-foreground')}>
                  <Hash className="w-3.5 h-3.5 inline mr-1" />Lista
                </button>
                <button onClick={() => setModoView('frequency')}
                  className={cn('px-3 py-2 text-xs font-medium transition-all border-l border-border', modoView === 'frequency' ? 'bg-primary text-primary-foreground' : 'bg-background text-muted-foreground')}>
                  <BarChart3 className="w-3.5 h-3.5 inline mr-1" />Freq
                </button>
              </div>
            </div>
          </ScrollReveal>

          {modoView === 'list' && (
            <ScrollReveal delay={0.2}>
              <div className="flex gap-2 flex-wrap items-center mb-4">
                {idioma === 'grego' && (
                  <>
                    <Filter className="w-3.5 h-3.5 text-muted-foreground" />
                    <button onClick={() => setFiltroCategoria('all')}
                      className={cn('px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
                        filtroCategoria === 'all' ? 'bg-primary text-primary-foreground' : 'border border-border text-muted-foreground')}>
                      {t('palavras.allWords')}
                    </button>
                    {categorias.map(cat => (
                      <button key={cat} onClick={() => setFiltroCategoria(cat)}
                        className={cn('px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
                          filtroCategoria === cat ? 'bg-primary text-primary-foreground' : 'border border-border text-muted-foreground')}>
                        {cat}
                      </button>
                    ))}
                  </>
                )}
                <div className="ml-auto flex items-center gap-1">
                  <SortAsc className="w-3.5 h-3.5 text-muted-foreground" />
                  {([['strong', t('palavras.sortStrong')], ['frequencia', t('palavras.sortFrequency')], ['palavra', t('palavras.sortAZ')]] as [SortBy, string][]).map(([val, label]) => (
                    <button key={val} onClick={() => setSortBy(val)}
                      className={cn('px-2.5 py-1 rounded-lg text-xs font-medium transition-all',
                        sortBy === val ? 'bg-primary text-primary-foreground' : 'border border-border text-muted-foreground')}>
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          )}

          {modoView === 'frequency' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="rounded-2xl border border-border/50 bg-card/50 p-6 mb-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-primary" />
                {t('palavras.topFrequency')} {idioma === 'grego' ? t('palavras.greekNTFull') : t('palavras.hebrewATFull')}
              </h3>
              <div className="space-y-2">
                {topFrequent.map((p, i) => {
                  const freq = (p as PalavraGrega).frequencia || 0;
                  const pct = (freq / maxFreq) * 100;
                  return (
                    <button key={p.strong} onClick={() => { setModoView('list'); toggleStrong(p.strong); }}
                      className="w-full flex items-center gap-3 group hover:bg-muted/30 rounded-lg p-2 transition-colors">
                      <span className="text-xs text-muted-foreground w-5 text-right font-mono">{i + 1}</span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium">{p.palavra}</span>
                          <span className="text-xs text-muted-foreground">({idioma === 'hebraico' ? romanizeHebrew(p.transliteracao || p.palavra) : p.transliteracao})</span>
                          <span className="text-xs text-primary font-mono">{p.strong}</span>
                        </div>
                        <div className="h-2 bg-muted/50 rounded-full overflow-hidden">
                          <motion.div className="h-full bg-gradient-to-r from-primary/60 to-primary rounded-full"
                            initial={{ width: 0 }} animate={{ width: `${pct}%` }}
                            transition={{ duration: 0.5, delay: i * 0.03 }} />
                        </div>
                      </div>
                      <span className="text-xs font-mono text-amber-600 bg-amber-500/10 px-2 py-0.5 rounded-full">
                        ×{freq}
                      </span>
                    </button>
                  );
                })}
              </div>
              {topFrequent.length === 0 && (
                <p className="text-center text-sm text-muted-foreground py-8">{t('palavras.noFrequency')}</p>
              )}
            </motion.div>
          )}

          {modoView === 'grid' && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtradas.slice(0, 200).map((word, i) => (
                <ScrollReveal key={`${word.lingua || idioma}-${word.strong}`} delay={Math.min(i * 0.02, 0.5)}>
                  <motion.div
                    className={cn('glass-card p-5 h-full group cursor-pointer', expandedStrong === word.strong && 'ring-2 ring-primary/40')}
                    whileHover={{ y: -3, boxShadow: '0 8px 30px rgba(196,162,101,0.1)' }}
                    transition={{ duration: 0.3 }}
                    onClick={() => toggleStrong(word.strong)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl font-serif">{word.palavra}</span>
                        <button
                          onClick={e => { e.stopPropagation(); pronounce(word.palavra, idioma === 'hebraico' ? 'hebraico' : 'grego'); }}
                          disabled={speaking === `${idioma === 'hebraico' ? 'hebraico' : 'grego'}-${word.palavra}`}
                          className="p-1.5 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-all duration-200 disabled:opacity-50"
                        >
                          {speaking === `${idioma === 'hebraico' ? 'hebraico' : 'grego'}-${word.palavra}` ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <Volume2 className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        idioma === 'grego' ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400' : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                      }`}>
                        {idioma === 'grego' ? 'GREGO' : 'HEBRAICO'}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground italic mb-2">
                      {idioma === 'hebraico' ? romanizeHebrew(word.transliteracao || word.palavra) : word.transliteracao}
                    </p>
                    <p className="text-sm text-foreground/80 leading-relaxed mb-3">{word.definicao}</p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-3 h-3" />
                        Strong {word.strong}
                      </span>
                      {((idioma === 'hebraico' && 'morfologia' in word) || (idioma === 'grego' && 'morphologia' in word)) && (
                        <span className="flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          {idioma === 'grego' ? (word as PalavraGrega).morphologia : (word as PalavraHebraica).morfologia}
                        </span>
                      )}
                      {(word as PalavraGrega).frequencia ? (
                        <span className="text-amber-600">×{(word as PalavraGrega).frequencia}</span>
                      ) : null}
                    </div>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          )}

          {modoView === 'list' && (
            <div className="space-y-2">
              {filtradas.slice(0, 200).map((p) => {
                const isExpanded = expandedStrong === p.strong;
                const freq = (p as PalavraGrega).frequencia || 0;
                return (
                  <motion.div key={p.strong} layout className="rounded-xl border border-border/50 bg-card/50 overflow-hidden">
                    <button onClick={() => toggleStrong(p.strong)}
                      className="w-full flex items-center gap-4 px-5 py-4 hover:bg-muted/30 transition-colors text-left">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="font-mono text-sm font-bold text-primary">{p.strong}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-lg">{p.palavra}</span>
                          <AudioPronunciation
                            palavra={p.palavra}
                            strong={p.strong}
                            lingua={idioma === 'hebraico' ? 'hebraico' : 'grego'}
                            transliteracao={p.transliteracao}
                            size="sm"
                          />
                          <span className="text-sm text-muted-foreground">
                            ({idioma === 'hebraico' ? romanizeHebrew(p.transliteracao || p.palavra) : p.transliteracao})
                          </span>
                          {freq > 0 && (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 font-medium">×{freq}</span>
                          )}
                          {'categoria' in p && (p as PalavraGrega).categoria && (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground capitalize">{(p as PalavraGrega).categoria}</span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {'definicaoResumida' in p ? (p as PalavraGrega).definicaoResumida : p.definicao?.slice(0, 80)}
                        </p>
                      </div>
                      {isExpanded ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                    </button>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                          <div className="px-5 pb-5 border-t border-border/50 pt-4 space-y-4">
                            {idioma === 'grego' && 'definicao' in p && (
                              <>
                                <div>
                                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">{t('palavras.definition')}</p>
                                  <p className="text-sm leading-relaxed">{(p as PalavraGrega).definicao}</p>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                  <div className="rounded-lg bg-muted/50 p-3">
                                    <p className="text-[10px] font-semibold text-muted-foreground uppercase">{t('palavras.category')}</p>
                                    <p className="text-sm font-medium capitalize">{(p as PalavraGrega).categoria}</p>
                                  </div>
                                  <div className="rounded-lg bg-muted/50 p-3">
                                    <p className="text-[10px] font-semibold text-muted-foreground uppercase">{t('palavras.morphology')}</p>
                                    <p className="text-sm font-medium">{(p as PalavraGrega).morphologia}</p>
                                  </div>
                                </div>
                                {(p as PalavraGrega).pronuncia && (
                                  <div className="rounded-lg bg-muted/50 p-3">
                                    <p className="text-[10px] font-semibold text-muted-foreground uppercase">{t('palavras.pronunciation')}</p>
                                    <p className="text-sm font-medium">{(p as PalavraGrega).pronuncia}</p>
                                  </div>
                                )}
                                {(p as PalavraGrega).uso && (
                                  <div>
                                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">{t('palavras.usage')}</p>
                                    <p className="text-sm">{(p as PalavraGrega).uso}</p>
                                  </div>
                                )}
                                {(p as PalavraGrega).notas && (
                                  <div className="rounded-lg bg-primary/5 border border-primary/10 p-3">
                                    <p className="text-[10px] font-semibold text-primary uppercase tracking-wider mb-1">{t('palavras.notes')}</p>
                                    <p className="text-sm">{(p as PalavraGrega).notas}</p>
                                  </div>
                                )}
                                {(p as PalavraGrega).versiculos && (p as PalavraGrega).versiculos!.length > 0 && (
                                  <div>
                                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1 flex items-center gap-1.5">
                                      <Link2 className="w-3 h-3" />
                                      {t('palavras.concordance')} ({(p as PalavraGrega).versiculos!.length})
                                    </p>
                                    <div className="flex flex-wrap gap-1.5">
                                      {(p as PalavraGrega).versiculos!.map((v, i) => (
                                        <a key={i} href={`/biblia`}
                                          className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                                          {v}
                                        </a>
                                      ))}
                                    </div>
                                  </div>
                                )}
                                {freq > 0 && (
                                  <div className="rounded-lg bg-amber-500/5 border border-amber-500/10 p-3">
                                    <p className="text-[10px] font-semibold text-amber-600 uppercase tracking-wider mb-1">{t('palavras.frequencyNT')}</p>
                                    <div className="flex items-center gap-3">
                                      <div className="flex-1 h-3 bg-muted/50 rounded-full overflow-hidden">
                                        <div className="h-full bg-gradient-to-r from-amber-500/60 to-amber-500 rounded-full"
                                          style={{ width: `${(freq / maxFreq) * 100}%` }} />
                                      </div>
                                      <span className="text-sm font-mono font-bold text-amber-600">{freq}×</span>
                                    </div>
                                  </div>
                                )}
                              </>
                            )}
                            {idioma === 'hebraico' && (
                              <>
                                <div>
                                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">{t('palavras.definition')}</p>
                                  <p className="text-sm leading-relaxed">{(p as PalavraHebraica).definicao}</p>
                                </div>
                                {(p as PalavraHebraica).morfologia && (
                                  <div className="rounded-lg bg-muted/50 p-3">
                                    <p className="text-[10px] font-semibold text-muted-foreground uppercase">{t('palavras.morphologyPronunciation')}</p>
                                    <p className="text-sm font-medium">{(p as PalavraHebraica).morfologia}</p>
                                  </div>
                                )}
                              </>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          )}

          {filtradas.length > 200 && (
            <p className="text-center text-sm text-muted-foreground mt-8">
              {t('languages.showing', { shown: 200, total: filtradas.length })}
            </p>
          )}

          {filtradas.length === 0 && !carregando && (
            <p className="text-center text-sm text-muted-foreground mt-8">
              Nenhuma palavra encontrada para &quot;{busca}&quot;
            </p>
          )}

          <AnimatePresence>
            {selectedWord && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
                onClick={() => setExpandedStrong(null)}
              >
                <motion.div
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.95 }}
                  className="bg-card rounded-2xl border border-border/50 overflow-hidden max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl"
                  onClick={e => e.stopPropagation()}
                >
                  <div className="sticky top-0 bg-card/95 backdrop-blur-sm border-b border-border/40 px-6 py-4 flex items-center justify-between z-10">
                    <div className="flex items-center gap-3">
                      <h2 className={`text-2xl font-display font-light ${idioma === 'hebraico' ? 'font-hebrew' : 'font-greek'}`}>
                        {selectedWord.palavra}
                      </h2>
                      <AudioPronunciation
                        palavra={selectedWord.palavra}
                        strong={selectedWord.strong}
                        lingua={idioma === 'hebraico' ? 'hebraico' : 'grego'}
                        transliteracao={selectedWord.transliteracao}
                        size="sm"
                      />
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xl font-mono font-bold text-primary">{selectedWord.strong}</span>
                      <button onClick={() => setExpandedStrong(null)} className="p-1.5 rounded-lg hover:bg-muted/50">
                        <span className="text-lg">×</span>
                      </button>
                    </div>
                  </div>

                  <div className="px-6 py-3 border-b border-border/40 bg-muted/20">
                    <p className="text-sm text-muted-foreground italic">{selectedWord.transliteracao}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      {(selectedWord as PalavraGrega).frequencia ? (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 font-medium">
                          ×{(selectedWord as PalavraGrega).frequencia} ocorrências
                        </span>
                      ) : null}
                      {'categoria' in selectedWord && (selectedWord as PalavraGrega).categoria && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary capitalize">
                          {(selectedWord as PalavraGrega).categoria}
                        </span>
                      )}
                      {idioma === 'hebraico' && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
                          Hebraico
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="divide-y divide-border/40">
                    <div className="px-6 py-4">
                      <SectionHeader icon={BookOpen} title="Definição" expanded={expandedSections.has('definicao')} onClick={() => toggleSection('definicao')} />
                      <AnimatePresence>
                        {expandedSections.has('definicao') && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                            <div className="mt-3 space-y-3">
                              <div className="rounded-lg bg-muted/50 p-4 border border-border/50">
                                <div className="flex items-center gap-1 mb-2">
                                  <BookMarked className="w-3 h-3 text-primary" />
                                  <span className="text-[10px] font-semibold uppercase tracking-wider text-primary">
                                    {idioma === 'grego' ? 'BDAG / Thayer' : 'BDB / HALOT'}
                                  </span>
                                </div>
                                <p className="text-sm leading-relaxed font-medium">{selectedWord.definicao}</p>
                              </div>
                              {'definicaoResumida' in selectedWord && (selectedWord as PalavraGrega).definicaoResumida && (
                                <div className="rounded-lg bg-muted/30 p-3 border border-border/30">
                                  <p className="text-xs text-muted-foreground mb-1 font-medium">Definição Resumida</p>
                                  <p className="text-sm">{(selectedWord as PalavraGrega).definicaoResumida}</p>
                                </div>
                              )}
                              {'notas' in selectedWord && (selectedWord as PalavraGrega).notas && (
                                <div className="rounded-lg bg-primary/5 p-3 border border-primary/10">
                                  <div className="flex items-center gap-1 mb-1">
                                    <Info className="w-3 h-3 text-primary" />
                                    <span className="text-[10px] font-semibold uppercase tracking-wider text-primary">Notas</span>
                                  </div>
                                  <p className="text-xs text-muted-foreground leading-relaxed">{(selectedWord as PalavraGrega).notas}</p>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <div className="px-6 py-4">
                      <SectionHeader icon={Languages} title="Análise Morfológica" expanded={expandedSections.has('morfologia')} onClick={() => toggleSection('morfologia')} />
                      <AnimatePresence>
                        {expandedSections.has('morfologia') && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                            <div className="mt-3 space-y-3">
                              {(() => {
                                const morfRaw = (idioma === 'grego' && 'morphologia' in selectedWord) ? (selectedWord as PalavraGrega).morphologia :
                                                (idioma === 'hebraico' && 'morfologia' in selectedWord) ? (selectedWord as PalavraHebraica).morfologia || '' : '';
                                const morf = parsearMorfologia(morfRaw, idioma);
                                return (
                                  <>
                                    <div className="flex flex-wrap gap-1.5">
                                      {morf.tipo && <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${getCorMorfologia('tipo')}`}>{morf.tipo}</span>}
                                      {morf.stem && <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${getCorMorfologia('stem')}`}>{morf.stem}</span>}
                                      {morf.tempo && <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${getCorMorfologia('tempo')}`}>{morf.tempo}</span>}
                                      {morf.voz && <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${getCorMorfologia('voz')}`}>{morf.voz}</span>}
                                      {morf.modo && <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${getCorMorfologia('modo')}`}>{morf.modo}</span>}
                                      {morf.pessoa && <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${getCorMorfologia('pessoa')}`}>{morf.pessoa} pessoa</span>}
                                      {morf.numero && <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${getCorMorfologia('numero')}`}>{morf.numero}</span>}
                                      {morf.genero && <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${getCorMorfologia('genero')}`}>{morf.genero}</span>}
                                      {morf.caso && <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${getCorMorfologia('caso')}`}>{morf.caso}</span>}
                                      {morf.estado && <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${getCorMorfologia('estado')}`}>{morf.estado}</span>}
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                      {'pronuncia' in selectedWord && (selectedWord as PalavraGrega).pronuncia && (
                                        <div className="rounded-lg bg-muted/50 p-3">
                                          <p className="text-[10px] font-semibold text-muted-foreground uppercase">Pronúncia</p>
                                          <p className="text-sm font-medium">{(selectedWord as PalavraGrega).pronuncia}</p>
                                        </div>
                                      )}
                                      {morfRaw && (
                                        <div className="rounded-lg bg-muted/50 p-3">
                                          <p className="text-[10px] font-semibold text-muted-foreground uppercase">Código Morfológico</p>
                                          <p className="text-sm font-medium font-mono">{morfRaw}</p>
                                        </div>
                                      )}
                                    </div>
                                    {'palavrasDerivadas' in selectedWord && (selectedWord as PalavraGrega).palavrasDerivadas && (selectedWord as PalavraGrega).palavrasDerivadas!.length > 0 && (
                                      <div className="rounded-lg bg-muted/50 p-3">
                                        <p className="text-[10px] font-semibold text-muted-foreground uppercase mb-1.5">Palavras Derivadas</p>
                                        <div className="flex flex-wrap gap-1">
                                          {(selectedWord as PalavraGrega).palavrasDerivadas!.map(d => (
                                            <span key={d} className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">{d}</span>
                                          ))}
                                        </div>
                                      </div>
                                    )}
                                  </>
                                );
                              })()}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {selectedWord.strong in LOUW_NIDA_MAP && (
                      <div className="px-6 py-4">
                        <SectionHeader icon={Layers} title="Domínios Semânticos Louw-Nida" expanded={expandedSections.has('louw')} onClick={() => toggleSection('louw')} />
                        <AnimatePresence>
                          {expandedSections.has('louw') && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                              <div className="mt-3 flex flex-wrap gap-2">
                                {(LOUW_NIDA_MAP[selectedWord.strong] || []).map((code) => {
                                  const prefix = code.split('.')[0];
                                  const dominio = DOMINIOS_SEMANTICOS[prefix];
                                  return (
                                    <div key={code} className={cn('px-3 py-2 rounded-lg text-sm font-medium', dominio?.cor || 'bg-gray-100 text-gray-700')}>
                                      <span className="font-mono text-xs mr-1">{code}</span>
                                      {dominio?.label || 'Domínio semântico'}
                                    </div>
                                  );
                                })}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}

                    {'versiculos' in selectedWord && (selectedWord as PalavraGrega).versiculos && (selectedWord as PalavraGrega).versiculos!.length > 0 && (
                      <div className="px-6 py-4">
                        <SectionHeader icon={Link2} title="Ocorrências Bíblicas" expanded={expandedSections.has('ocorrencias')} onClick={() => toggleSection('ocorrencias')} count={(selectedWord as PalavraGrega).versiculos!.length} />
                        <AnimatePresence>
                          {expandedSections.has('ocorrencias') && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                              <div className="mt-3 flex flex-wrap gap-1.5">
                                {(selectedWord as PalavraGrega).versiculos!.map((v, i) => (
                                  <a key={i} href={`/biblia?ref=${v}`}
                                    className="text-xs px-2.5 py-1.5 rounded-lg bg-muted hover:bg-primary/10 hover:text-primary cursor-pointer transition-all border border-border/50 hover:border-primary/30 flex items-center gap-1">
                                    <ArrowRight className="w-3 h-3" />
                                    {v}
                                  </a>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}

                    {'frequencia' in selectedWord && (selectedWord as PalavraGrega).frequencia && (
                      <div className="px-6 py-4">
                        <SectionHeader icon={BarChart3} title="Frequência" expanded={expandedSections.has('freq')} onClick={() => toggleSection('freq')} />
                        <AnimatePresence>
                          {expandedSections.has('freq') && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                              <div className="mt-3 rounded-lg bg-muted/50 p-4">
                                <div className="flex items-end gap-1 h-32">
                                  {Array.from({ length: 20 }, (_, i) => {
                                    const freq = (selectedWord as PalavraGrega).frequencia || 0;
                                    const normalizedHeight = Math.min(100, (freq / 200) * 100);
                                    const barH = i < Math.ceil(freq / 10) ? Math.max(10, normalizedHeight * (1 - i * 0.04)) : 5;
                                    return (
                                      <div key={i} className="flex-1 flex flex-col items-center gap-1">
                                        <motion.div initial={{ height: 0 }} animate={{ height: `${barH}%` }}
                                          transition={{ delay: i * 0.03, duration: 0.3 }}
                                          className={cn('w-full rounded-t', i < Math.ceil(freq / 10) ? 'bg-primary' : 'bg-muted')} />
                                      </div>
                                    );
                                  })}
                                </div>
                                <div className="flex justify-between mt-2">
                                  <span className="text-[10px] text-muted-foreground">Raro</span>
                                  <span className="text-[10px] text-muted-foreground">Frequente</span>
                                </div>
                                <p className="text-xs text-center text-muted-foreground mt-3">
                                  <span className="font-semibold text-foreground">{(selectedWord as PalavraGrega).frequencia}</span> ocorrências no {idioma === 'grego' ? 'Novo Testamento' : 'Antigo Testamento'}
                                </p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
      <Footer />
    </div>
  );
}
