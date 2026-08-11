'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Search, X, Hash, TrendingUp, BarChart3, Languages, ChevronDown, ChevronUp, Link2, ArrowRight, BookMarked, Layers, Info } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import { cn } from '@/lib/utils';
import { carregarLexicoGrego, carregarLexicoHebraico } from '@/lib/lexicon-lazy';
import { AudioPronunciation } from '@/components/AudioPronunciation';
import { parsearMorfologia, getCorMorfologia } from '@/lib/morphology';
import type { PalavraGrega } from '@/data/lexicon/grego';
import type { PalavraHebraica } from '@/data/lexicon/hebraico';

type Idioma = 'grego' | 'hebraico';

const DOMINIOS_SEMANTICOS: Record<string, { label: string; cor: string }> = {
  '1': { label: 'Corpo Humano', cor: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300' },
  '2': { label: 'Agrupamentos Humanos', cor: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' },
  '3': { label: 'Atividades Humanas', cor: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300' },
  '4': { label: 'Ações Sociais', cor: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300' },
  '5': { label: 'Cognição e Percepção', cor: 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300' },
  '6': { label: 'Mundo Físico', cor: 'bg-lime-100 text-lime-700 dark:bg-lime-900/30 dark:text-lime-300' },
  '7': { label: 'Espaço e Movimento', cor: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300' },
  '8': { label: 'Tempos e Estações', cor: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300' },
  '9': { label: 'Quantidade e Medida', cor: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300' },
  '10': { label: 'Avaliação e Julgamento', cor: 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300' },
  '11': { label: 'Dimensão Espiritual', cor: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300' },
  '12': { label: 'Relacionamentos', cor: 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300' },
  '13': { label: 'Arte e Cultura', cor: 'bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-900/30 dark:text-fuchsia-300' },
  '14': { label: 'Instituições e Autoridade', cor: 'bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-300' },
  '15': { label: 'Economia e Comércio', cor: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300' },
  '16': { label: 'Meios de Transporte', cor: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300' },
  '17': { label: 'Atividades de Guerra', cor: 'bg-stone-100 text-stone-700 dark:bg-stone-900/30 dark:text-stone-300' },
  '18': { label: 'Atividades de Caça', cor: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300' },
  '19': { label: 'Atividades de Pesca', cor: 'bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300' },
  '20': { label: 'Atividades de Agricultura', cor: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' },
  '21': { label: 'Bebidas e Alimentos', cor: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300' },
  '22': { label: 'Vestuário', cor: 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300' },
  '23': { label: 'Habitações', cor: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' },
  '24': { label: 'Veículos e Objetos', cor: 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300' },
  '25': { label: 'Instrumentos Musicais', cor: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300' },
  '26': { label: 'Gemas e Minerios', cor: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300' },
  '27': { label: 'Animais', cor: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300' },
  '28': { label: 'Animais Aquáticos', cor: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' },
  '29': { label: 'Plantas', cor: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' },
  '30': { label: 'Doenças e Enfermidades', cor: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300' },
  '31': { label: 'Ações de Purificação', cor: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300' },
  '32': { label: 'Sonhos e Visones', cor: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300' },
  '33': { label: 'Inferno e Morte', cor: 'bg-stone-100 text-stone-700 dark:bg-stone-900/30 dark:text-stone-300' },
  '34': { label: 'Anjos e Demônios', cor: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300' },
  '35': { label: 'Adoração e Ritual', cor: 'bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-900/30 dark:text-fuchsia-300' },
  '36': { label: 'Formas de Comunicação', cor: 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300' },
  '37': { label: 'Documentos e Escrita', cor: 'bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-300' },
  '38': { label: 'Assuntos Jurídicos', cor: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300' },
  '39': { label: 'Assuntos Políticos', cor: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300' },
  '40': { label: 'Atividades Religiosas', cor: 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300' },
  '41': { label: 'Ressurreição e Vida', cor: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300' },
  '42': { label: 'Escolha e Rejeição', cor: 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300' },
  '43': { label: 'Fé e Crença', cor: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300' },
  '44': { label: 'Perdão e Graça', cor: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' },
  '45': { label: 'Juízo e Condenação', cor: 'bg-stone-100 text-stone-700 dark:bg-stone-900/30 dark:text-stone-300' },
  '46': { label: 'Redenção e Salvação', cor: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300' },
  '47': { label: 'Pecado e Transgressão', cor: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300' },
  '48': { label: 'Santificação e Pureza', cor: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300' },
  '49': { label: 'Governo e Autoridade', cor: 'bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-300' },
  '50': { label: 'Reino de Deus', cor: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300' },
};

// Domínios semânticos por número Louw-Nida (simplificado para principais palavras)
const LOUW_NIDA_MAP: Record<string, string[]> = {
  'G25': ['44.25'],        // hagnós - pureza
  'G26': ['44.25'],        // hagneia
  'G27': ['44.25'],        // hagnizō
  'G40': ['44.25'],        // hagios
  'G37': ['44.25'],        // hagiazō
  'G46': ['57.170'],       // adikema
  'G47': ['57.170'],       // adikia
  'G48': ['57.170'],       // adikos
  'G11': ['25.50'],        // agapaō
  'G12': ['25.50'],        // agapē
  'G13': ['25.50'],        // agapētos
  'G69': ['67.171'],       // aiōn
  'G70': ['67.171'],       // aiōnios
  'G71': ['8.31'],         // haima
  'G43': ['11.14'],        // adelphos
  'G42': ['11.14'],        // adelphē
  'G15': ['12.23'],        // angelos
  'G38': ['24.156'],       // agōn
  'G80': ['28.55'],        // hairesis
  'G29': ['57.245'],       // agorazō
  'G34': ['57.182'],       // agros
};

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

export default function WordStudyPage() {
  const [idioma, setIdioma] = useState<Idioma>('grego');
  const [busca, setBusca] = useState('');
  const [selectedWord, setSelectedWord] = useState<PalavraGrega | PalavraHebraica | null>(null);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['definicao', 'morfologia']));
  const [palavrasGregas, setPalavrasGregas] = useState<PalavraGrega[]>([]);
  const [palavrasHebraicas, setPalavrasHebraicas] = useState<PalavraHebraica[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    Promise.all([carregarLexicoGrego(), carregarLexicoHebraico()]).then(([g, h]) => {
      setPalavrasGregas(g);
      setPalavrasHebraicas(h);
      setCarregando(false);
    });
  }, []);

  const palavras = useMemo(() => idioma === 'grego' ? palavrasGregas : palavrasHebraicas, [idioma, palavrasGregas, palavrasHebraicas]);

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

  const toggleSection = useCallback((section: string) => {
    setExpandedSections(prev => {
      const next = new Set(prev);
      if (next.has(section)) next.delete(section);
      else next.add(section);
      return next;
    });
  }, []);

  const selectWord = useCallback((word: PalavraGrega | PalavraHebraica) => {
    setSelectedWord(word);
    setExpandedSections(new Set(['definicao', 'morfologia']));
  }, []);

  const isGrega = selectedWord && 'categoria' in selectedWord;

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-10">
              <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 flex items-center justify-center border border-violet-500/20">
                <BookOpen className="w-10 h-10 text-violet-500" />
              </div>
              <h1 className="font-display text-2xl sm:text-4xl font-light mb-3">Guia de <span className="text-primary italic">Estudo Palavra</span></h1>
              <p className="text-muted-foreground max-w-lg mx-auto">Análise completa como o Logos — definições, morfologia, concordância, domínios semânticos e uso bíblico</p>
            </div>
          </ScrollReveal>

          {carregando ? (
            <div className="text-center py-16">
              <div className="inline-flex gap-2">
                <span className="w-3 h-3 bg-primary rounded-full animate-bounce [animation-delay:0s]" />
                <span className="w-3 h-3 bg-primary rounded-full animate-bounce [animation-delay:0.15s]" />
                <span className="w-3 h-3 bg-primary rounded-full animate-bounce [animation-delay:0.3s]" />
              </div>
              <p className="text-sm text-muted-foreground mt-4">Carregando léxico...</p>
            </div>
          ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Painel de Busca */}
            <div className="lg:col-span-1">
              <div className="rounded-2xl border border-border/50 bg-card/50 p-4 sticky top-24">
                <div className="flex rounded-xl border border-border overflow-hidden mb-4">
                  <button onClick={() => setIdioma('grego')}
                    className={cn('flex-1 px-3 py-2.5 text-xs font-medium transition-all', idioma === 'grego' ? 'bg-primary text-primary-foreground' : 'bg-background text-muted-foreground')}>
                    Grego NT
                  </button>
                  <button onClick={() => setIdioma('hebraico')}
                    className={cn('flex-1 px-3 py-2.5 text-xs font-medium transition-all border-l border-border', idioma === 'hebraico' ? 'bg-primary text-primary-foreground' : 'bg-background text-muted-foreground')}>
                    Hebraico AT
                  </button>
                </div>

                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input type="text" value={busca} onChange={e => setBusca(e.target.value)}
                    placeholder="Buscar palavra, transliteração ou Strong's..."
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
                          <span className={`font-medium ${idioma === 'hebraico' ? 'font-hebrew' : 'font-greek'}`}>{p.palavra}</span>
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

            {/* Painel de Detalhe */}
            <div className="lg:col-span-2">
              {selectedWord ? (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                  className="rounded-2xl border border-border/50 bg-card/50 overflow-hidden">

                  {/* Cabeçalho da Palavra */}
                  <div className="px-6 py-5 border-b border-border/40 bg-muted/20">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h2 className={`text-3xl font-display font-light ${idioma === 'hebraico' ? 'font-hebrew' : 'font-greek'}`}>
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
                        <p className="text-sm text-muted-foreground italic">{selectedWord.transliteracao}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-mono font-bold text-primary">{selectedWord.strong}</span>
                        <p className="text-[10px] text-muted-foreground uppercase">{idioma === 'grego' ? 'Grego NT' : 'Hebraico AT'}</p>
                      </div>
                    </div>
                    <div className="mt-3 flex flex-wrap items-center gap-3">
                      {'frequencia' in selectedWord && selectedWord.frequencia && (
                        <div className="flex items-center gap-1.5">
                          <Hash className="w-3.5 h-3.5 text-muted-foreground" />
                          <span className="text-sm font-medium">{selectedWord.frequencia}x</span>
                          <span className="text-xs text-muted-foreground">ocorrências</span>
                        </div>
                      )}
                      {'categoria' in selectedWord && (
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

                  {/* Seções Expandíveis */}
                  <div className="divide-y divide-border/40">

                    {/* 1. Definição */}
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

                    {/* 2. Análise Morfológica */}
                    <div className="px-6 py-4">
                      <SectionHeader icon={Languages} title="Análise Morfológica" expanded={expandedSections.has('morfologia')} onClick={() => toggleSection('morfologia')} />
                      <AnimatePresence>
                        {expandedSections.has('morfologia') && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                            <div className="mt-3 space-y-3">
                              {(() => {
                                const morfRaw = ('morphologia' in selectedWord ? (selectedWord as PalavraGrega).morphologia : '') ||
                                                ('morfologia' in selectedWord ? (selectedWord as any).morfologia : '') || '';
                                const lingua = idioma === 'grego' ? 'grego' : 'hebraico';
                                const morf = parsearMorfologia(morfRaw, lingua);
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
                                      {'pronuncia' in selectedWord && (
                                        <div className="rounded-lg bg-muted/50 p-3">
                                          <p className="text-[10px] font-semibold text-muted-foreground uppercase">Pronúncia</p>
                                          <p className="text-sm font-medium">{(selectedWord as PalavraGrega).pronuncia || '—'}</p>
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

                    {/* 3. Domínios Semânticos Louw-Nida */}
                    {selectedWord.strong in LOUW_NIDA_MAP && (
                      <div className="px-6 py-4">
                        <SectionHeader icon={Layers} title="Domínios Semânticos Louw-Nida" expanded={expandedSections.has('louw')} onClick={() => toggleSection('louw')} />
                        <AnimatePresence>
                          {expandedSections.has('louw') && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                              <div className="mt-3">
                                <div className="flex flex-wrap gap-2">
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
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}

                    {/* 4. Ocorrências Bíblicas (Concordância) */}
                    {'versiculos' in selectedWord && (selectedWord as PalavraGrega).versiculos && (selectedWord as PalavraGrega).versiculos!.length > 0 && (
                      <div className="px-6 py-4">
                        <SectionHeader icon={Link2} title="Ocorrências Bíblicas" expanded={expandedSections.has('ocorrencias')} onClick={() => toggleSection('ocorrencias')} count={(selectedWord as PalavraGrega).versiculos!.length} />
                        <AnimatePresence>
                          {expandedSections.has('ocorrencias') && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                              <div className="mt-3">
                                <div className="flex flex-wrap gap-1.5">
                                  {(selectedWord as PalavraGrega).versiculos!.map((v, i) => (
                                    <a key={i} href={`/biblia?ref=${v}`}
                                      className="text-xs px-2.5 py-1.5 rounded-lg bg-muted hover:bg-primary/10 hover:text-primary cursor-pointer transition-all border border-border/50 hover:border-primary/30 flex items-center gap-1">
                                      <ArrowRight className="w-3 h-3" />
                                      {v}
                                    </a>
                                  ))}
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}

                    {/* 5. Frequência e Distribuição */}
                    {'frequencia' in selectedWord && selectedWord.frequencia && (
                      <div className="px-6 py-4">
                        <SectionHeader icon={BarChart3} title="Frequência" expanded={expandedSections.has('freq')} onClick={() => toggleSection('freq')} />
                        <AnimatePresence>
                          {expandedSections.has('freq') && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                              <div className="mt-3">
                                <div className="rounded-lg bg-muted/50 p-4">
                                  <div className="flex items-end gap-1 h-32">
                                    {Array.from({ length: 20 }, (_, i) => {
                                      const freq = selectedWord.frequencia || 0;
                                      const maxH = 200;
                                      const normalizedHeight = Math.min(100, (freq / maxH) * 100);
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
                                    <span className="font-semibold text-foreground">{selectedWord.frequencia}</span> ocorrências no {idioma === 'grego' ? 'Novo Testamento' : 'Antigo Testamento'}
                                  </p>
                                  <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                                    <div className="rounded-lg bg-background p-2">
                                      <p className="text-lg font-bold text-primary">{selectedWord.frequencia}</p>
                                      <p className="text-[10px] text-muted-foreground">Total</p>
                                    </div>
                                    <div className="rounded-lg bg-background p-2">
                                      <p className="text-lg font-bold text-primary">
                                        {idioma === 'grego' ? Math.round((selectedWord.frequencia / 138164) * 10000) / 100 : Math.round((selectedWord.frequencia / 8674) * 10000) / 100}
                                      </p>
                                      <p className="text-[10px] text-muted-foreground">‰ do total</p>
                                    </div>
                                    <div className="rounded-lg bg-background p-2">
                                      <p className="text-lg font-bold text-primary">
                                        {selectedWord.frequencia > 100 ? 'Alta' : selectedWord.frequencia > 30 ? 'Média' : selectedWord.frequencia > 5 ? 'Baixa' : 'Rara'}
                                      </p>
                                      <p className="text-[10px] text-muted-foreground">Categoria</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}
                  </div>
                </motion.div>
              ) : (
                <div className="rounded-2xl border border-border/50 bg-card/50 p-12 text-center">
                  <BookOpen className="w-16 h-16 text-muted-foreground/20 mx-auto mb-4" />
                  <h3 className="font-display text-xl font-light mb-2">Selecione uma palavra</h3>
                  <p className="text-sm text-muted-foreground max-w-md mx-auto">
                    Busque por uma palavra grega ou hebraica, ou pelo número Strong&apos;s. 
                    O guia mostrará definições, morfologia, concordância e domínios semânticos.
                  </p>
                </div>
              )}
            </div>
          </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
