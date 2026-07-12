'use client';

import { useState, useMemo } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import { motion, AnimatePresence } from 'framer-motion';
import {
  getIntroducaoLivro,
  getIntroducoesPorTestamento,
  getIntroducoesPorGenero,
  type IntroducaoLivro,
} from '@/data/biblia/introducoes';
import { LIVROS_AT, LIVROS_NT, type LivroInfo } from '@/data/biblia/livros';
import Link from 'next/link';
import {
  Search, BookOpen, ChevronDown, ChevronRight, X, Filter,
  User, Calendar, Users, Target, Layers, Globe, Church, BookMarked, FileText
} from 'lucide-react';

type TabTestamento = 'todos' | 'AT' | 'NT';

const GENEROS: { valor: string; label: string; icone: string }[] = [
  { valor: 'todos', label: 'Todos', icone: '📚' },
  { valor: 'pentateuco', label: 'Pentateuco', icone: '📜' },
  { valor: 'historico', label: 'Histórico', icone: '🏛️' },
  { valor: 'poetico', label: 'Poético', icone: '🎵' },
  { valor: 'profetico', label: 'Profético', icone: '📢' },
  { valor: 'evangelho', label: 'Evangelho', icone: '✝️' },
  { valor: 'historico-nt', label: 'Histórico (NT)', icone: '🔥' },
  { valor: 'epistola-paulina', label: 'Epístola Paulina', icone: '✉️' },
  { valor: 'epistola-geral', label: 'Epístola Geral', icone: '📝' },
  { valor: 'apocaliptico', label: 'Apocalíptico', icone: '👁️' },
];

const GENERO_COR: Record<string, string> = {
  pentateuco: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  historico: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  poetico: 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300',
  profetico: 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300',
  evangelho: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
  'historico-nt': 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300',
  'epistola-paulina': 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
  'epistola-geral': 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300',
  apocaliptico: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
};

const GENERO_ICONE: Record<string, string> = {
  pentateuco: '📜', historico: '🏛️', poetico: '🎵', profetico: '📢',
  evangelho: '✝️', 'historico-nt': '🔥', 'epistola-paulina': '✉️',
  'epistola-geral': '📝', apocaliptico: '👁️',
};

function getLivroInfo(abreviacao: string): LivroInfo | undefined {
  return [...LIVROS_AT, ...LIVROS_NT].find(l => l.abreviacao === abreviacao);
}

export default function IntroducoesPage() {
  const [tab, setTab] = useState<TabTestamento>('todos');
  const [generoFiltro, setGeneroFiltro] = useState('todos');
  const [busca, setBusca] = useState('');
  const [expandido, setExpandido] = useState<string | null>(null);

  const introducoes = useMemo(() => {
    let lista: IntroducaoLivro[];
    if (tab === 'AT') {
      lista = getIntroducoesPorTestamento('AT');
    } else if (tab === 'NT') {
      lista = getIntroducoesPorTestamento('NT');
    } else {
      lista = [...LIVROS_AT, ...LIVROS_NT].map(l => getIntroducaoLivro(l.abreviacao)).filter(Boolean) as IntroducaoLivro[];
    }

    if (generoFiltro !== 'todos') {
      lista = lista.filter(i => i.genero === generoFiltro);
    }

    if (busca.trim()) {
      const q = busca.toLowerCase();
      lista = lista.filter(i =>
        i.nomeCompleto.toLowerCase().includes(q) ||
        i.autor.toLowerCase().includes(q) ||
        i.proposito.toLowerCase().includes(q) ||
        i.genero.toLowerCase().includes(q)
      );
    }

    return lista;
  }, [tab, generoFiltro, busca]);

  const livrosAtCount = useMemo(() => getIntroducoesPorTestamento('AT').length, []);
  const livrosNtCount = useMemo(() => getIntroducoesPorTestamento('NT').length, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20 pb-16">
        <ScrollReveal>
          <div className="max-w-7xl mx-auto px-6 mb-8">
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 text-white mb-4 shadow-lg shadow-amber-500/25"
              >
                <BookMarked className="w-10 h-10" />
              </motion.div>
              <h1 className="text-4xl md:text-5xl font-display font-bold bg-gradient-to-r from-amber-600 to-amber-400 bg-clip-text text-transparent mb-3">
                Introduções Isagógicas
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Estudo introdutório dos 66 livros da Bíblia — autor, data, propósito, gênero e contexto histórico
              </p>
            </div>
          </div>
        </ScrollReveal>

        <div className="max-w-7xl mx-auto px-6">
          {/* Tabs AT / NT */}
          <ScrollReveal delay={0.1}>
            <div className="flex items-center justify-center gap-2 mb-6">
              {[
                { key: 'todos' as const, label: 'Todos', count: livrosAtCount + livrosNtCount },
                { key: 'AT' as const, label: 'Antigo Testamento', count: livrosAtCount },
                { key: 'NT' as const, label: 'Novo Testamento', count: livrosNtCount },
              ].map(t => (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    tab === t.key
                      ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-md shadow-amber-500/25'
                      : 'bg-white/60 dark:bg-white/5 backdrop-blur-md border border-amber-200/50 dark:border-amber-800/30 text-muted-foreground hover:border-amber-400 dark:hover:border-amber-600'
                  }`}
                >
                  {t.label} ({t.count})
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Busca e filtro gênero */}
          <ScrollReveal delay={0.15}>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Buscar livro, autor ou propósito..."
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 rounded-xl bg-white/60 dark:bg-white/5 backdrop-blur-md border border-amber-200/50 dark:border-amber-800/30 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-amber-500/40 transition-all"
                />
                {busca && (
                  <button
                    onClick={() => setBusca('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Filter className="w-4 h-4" />
                <span>{introducoes.length} livros</span>
              </div>
            </div>
          </ScrollReveal>

          {/* Filtros de gênero */}
          <ScrollReveal delay={0.2}>
            <div className="flex flex-wrap gap-2 mb-10">
              {GENEROS.map(g => (
                <button
                  key={g.valor}
                  onClick={() => setGeneroFiltro(g.valor)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1.5 ${
                    generoFiltro === g.valor
                      ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-md shadow-amber-500/25'
                      : 'bg-white/60 dark:bg-white/5 backdrop-blur-md border border-amber-200/50 dark:border-amber-800/30 text-muted-foreground hover:border-amber-400 dark:hover:border-amber-600'
                  }`}
                >
                  <span>{g.icone}</span>
                  {g.label}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Lista de livros */}
          <div className="space-y-3">
            {introducoes.map((intro, i) => {
              const livroInfo = getLivroInfo(intro.livro);
              const isExpandido = expandido === intro.livro;
              const generoCor = GENERO_COR[intro.genero] ?? 'bg-muted text-muted-foreground';
              const generoLabel = GENEROS.find(g => g.valor === intro.genero)?.label ?? intro.genero;

              return (
                <ScrollReveal key={intro.livro} delay={i * 0.02}>
                  <motion.div
                    layout
                    className="glass-card rounded-2xl border border-amber-200/30 dark:border-amber-800/20 overflow-hidden hover:shadow-lg transition-all duration-300"
                  >
                    {/* Header do accordion */}
                    <button
                      onClick={() => setExpandido(isExpandido ? null : intro.livro)}
                      className="w-full p-5 flex items-center gap-4 text-left hover:bg-white/30 dark:hover:bg-white/5 transition-colors"
                    >
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-600 to-amber-700 flex items-center justify-center text-white font-display font-bold text-sm shadow-md shrink-0">
                        {livroInfo?.abreviacao.toUpperCase() ?? intro.livro.toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-display font-bold text-foreground text-lg">{intro.nomeCompleto}</h3>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${generoCor}`}>
                            {generoLabel}
                          </span>
                          {livroInfo && (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300">
                              {livroInfo.testamento}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{intro.autor} — {intro.data}</p>
                      </div>
                      <motion.div
                        animate={{ rotate: isExpandido ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="shrink-0"
                      >
                        <ChevronDown className="w-5 h-5 text-muted-foreground" />
                      </motion.div>
                    </button>

                    {/* Conteúdo expandido */}
                    <AnimatePresence>
                      {isExpandido && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-5 pt-0 border-t border-border/30">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4">
                              {/* Coluna esquerda */}
                              <div className="space-y-4">
                                <InfoRow icon={<User className="w-4 h-4" />} label="Autor" value={intro.autor} />
                                <InfoRow icon={<Calendar className="w-4 h-4" />} label="Data" value={intro.data} />
                                <InfoRow icon={<Users className="w-4 h-4" />} label="Destinatários" value={intro.destinatarios} />
                                <InfoRow icon={<Target className="w-4 h-4" />} label="Propósito" value={intro.proposito} />
                                <InfoRow icon={<FileText className="w-4 h-4" />} label="Gênero" value={generoLabel} />
                                {intro.temaCentral && (
                                  <InfoRow icon={<BookOpen className="w-4 h-4" />} label="Tema Central" value={intro.temaCentral} />
                                )}
                                {intro.ocasio && (
                                  <InfoRow icon={<Globe className="w-4 h-4" />} label="Ocasião" value={intro.ocasio} />
                                )}
                              </div>

                              {/* Coluna direita */}
                              <div className="space-y-4">
                                {intro.estrutura && intro.estrutura.length > 0 && (
                                  <div>
                                    <h4 className="text-sm font-semibold text-amber-600 dark:text-amber-400 mb-2 flex items-center gap-1.5">
                                      <Layers className="w-4 h-4" />
                                      Estrutura
                                    </h4>
                                    <ul className="space-y-1.5">
                                      {intro.estrutura.map((item, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                                          <ChevronRight className="w-3 h-3 mt-1 text-amber-500 shrink-0" />
                                          {item}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}

                                {intro.fatosChave && intro.fatosChave.length > 0 && (
                                  <div>
                                    <h4 className="text-sm font-semibold text-amber-600 dark:text-amber-400 mb-2 flex items-center gap-1.5">
                                      <Sparkles className="w-4 h-4" />
                                      Fatos-Chave
                                    </h4>
                                    <ul className="space-y-1.5">
                                      {intro.fatosChave.map((fato, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                                          {fato}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Contextos */}
                            {(intro.contextoPolitico || intro.contextoCultural || intro.contextoReligioso) && (
                              <div className="mt-5 pt-4 border-t border-border/30">
                                <h4 className="text-sm font-semibold text-amber-600 dark:text-amber-400 mb-3 flex items-center gap-1.5">
                                  <Globe className="w-4 h-4" />
                                  Contexto Histórico
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                  {intro.contextoPolitico && (
                                    <div className="p-3 rounded-xl bg-white/40 dark:bg-white/5 border border-border/30">
                                      <h5 className="text-xs font-semibold text-foreground mb-1">🏛️ Político</h5>
                                      <p className="text-xs text-muted-foreground leading-relaxed">{intro.contextoPolitico}</p>
                                    </div>
                                  )}
                                  {intro.contextoCultural && (
                                    <div className="p-3 rounded-xl bg-white/40 dark:bg-white/5 border border-border/30">
                                      <h5 className="text-xs font-semibold text-foreground mb-1">🎭 Cultural</h5>
                                      <p className="text-xs text-muted-foreground leading-relaxed">{intro.contextoCultural}</p>
                                    </div>
                                  )}
                                  {intro.contextoReligioso && (
                                    <div className="p-3 rounded-xl bg-white/40 dark:bg-white/5 border border-border/30">
                                      <h5 className="text-xs font-semibold text-foreground mb-1">⛪ Religioso</h5>
                                      <p className="text-xs text-muted-foreground leading-relaxed">{intro.contextoReligioso}</p>
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}

                            {/* Problemas e notas */}
                            {(intro.problemaAutoria || intro.fontes || intro.canonicidade) && (
                              <div className="mt-4 pt-4 border-t border-border/30 space-y-3">
                                {intro.problemaAutoria && (
                                  <div className="p-3 rounded-xl bg-amber-50/50 dark:bg-amber-900/10 border border-amber-200/30 dark:border-amber-800/20">
                                    <h5 className="text-xs font-semibold text-amber-700 dark:text-amber-300 mb-1">⚠️ Questão de Autoria</h5>
                                    <p className="text-xs text-muted-foreground leading-relaxed">{intro.problemaAutoria}</p>
                                  </div>
                                )}
                                {intro.fontes && (
                                  <div className="p-3 rounded-xl bg-white/40 dark:bg-white/5 border border-border/30">
                                    <h5 className="text-xs font-semibold text-foreground mb-1">📋 Fontes</h5>
                                    <p className="text-xs text-muted-foreground leading-relaxed">{intro.fontes}</p>
                                  </div>
                                )}
                                {intro.canonicidade && (
                                  <div className="p-3 rounded-xl bg-white/40 dark:bg-white/5 border border-border/30">
                                    <h5 className="text-xs font-semibold text-foreground mb-1">✅ Canon</h5>
                                    <p className="text-xs text-muted-foreground leading-relaxed">{intro.canonicidade}</p>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </ScrollReveal>
              );
            })}
          </div>

          {/* Estado vazio */}
          {introducoes.length === 0 && (
            <ScrollReveal>
              <div className="text-center py-20">
                <BookMarked className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-display font-bold text-foreground mb-2">Nenhuma introdução encontrada</h3>
                <p className="text-muted-foreground">Tente buscar por outro termo ou ajuste os filtros.</p>
                <button
                  onClick={() => { setBusca(''); setGeneroFiltro('todos'); setTab('todos'); }}
                  className="mt-4 px-6 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 text-white font-medium hover:shadow-lg hover:shadow-amber-500/25 transition-all"
                >
                  Limpar filtros
                </button>
              </div>
            </ScrollReveal>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

// ── Componentes auxiliares ──────────────────────────────────────────────────

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-2">
      <span className="text-amber-500 mt-0.5 shrink-0">{icon}</span>
      <div>
        <span className="text-xs font-semibold text-foreground block">{label}</span>
        <p className="text-sm text-muted-foreground leading-relaxed">{value}</p>
      </div>
    </div>
  );
}

function Sparkles(props: React.SVGProps<SVGSVGElement> & { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" /><path d="M19 17v4" /><path d="M3 5h4" /><path d="M17 19h4" />
    </svg>
  );
}
