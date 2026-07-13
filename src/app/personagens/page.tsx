'use client';

import { useState, useMemo } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PERSONAGENS_AVANCADOS, type PersonagemAvancado } from '@/data/biblia/personagensAvancados';
import ScrollReveal from '@/components/ScrollReveal';
import PainelDoVersiculo from '@/components/PainelDoVersiculo';
import { Users, Search, X, BookOpen, MapPin, Shield, GitBranch, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import { Breadcrumbs } from '@/components/Breadcrumbs';

const periodosUnicos = [...new Set(
  PERSONAGENS_AVANCADOS.flatMap(p => p.periodos ?? [])
)].sort();

const periodoLabels: Record<string, string> = {
  'era-primevos': 'Era dos Primevos',
  'antediluvianos': 'Antediluvianos',
  'patriarcas': 'Patriarcas',
  'egito': 'Egito',
  'êxodo': 'Êxodo',
  'leilho': 'Lei/Deserto',
  'conquista': 'Conquista',
  'juizes': 'Juízes',
  'monarquia': 'Monarquia',
  'monarquia-unida': 'Monarquia Unida',
  'monarquia-dividida': 'Monarquia Dividida',
  'exilio': 'Exílio',
  'ministerio-jesus': 'Ministério de Jesus',
  'igreja-primitiva': 'Igreja Primitiva',
};

export default function PersonagensPage() {
  const [busca, setBusca] = useState('');
  const [filtroTestamento, setFiltroTestamento] = useState<'todos' | 'AT' | 'NT'>('todos');
  const [filtroPeriodo, setFiltroPeriodo] = useState<string>('todos');
  const [expandido, setExpandido] = useState<string | null>(null);
  const [versiculoPainel, setVersiculoPainel] = useState<{ livro: string; cap: number; ver: number } | null>(null);

  const filtrados = useMemo(() => PERSONAGENS_AVANCADOS.filter((p) => {
    const matchBusca = busca === '' ||
      p.nome.toLowerCase().includes(busca.toLowerCase()) ||
      (p.nomeHebraico ?? '').toLowerCase().includes(busca.toLowerCase()) ||
      (p.nomeGrego ?? '').toLowerCase().includes(busca.toLowerCase()) ||
      (p.significado ?? '').toLowerCase().includes(busca.toLowerCase()) ||
      p.resumo.toLowerCase().includes(busca.toLowerCase());
    const matchTestamento = filtroTestamento === 'todos' || p.testamento === filtroTestamento;
    const matchPeriodo = filtroPeriodo === 'todos' || (p.periodos ?? []).includes(filtroPeriodo);
    return matchBusca && matchTestamento && matchPeriodo;
  }), [busca, filtroTestamento, filtroPeriodo]);

  const stats = useMemo(() => ({
    total: PERSONAGENS_AVANCADOS.length,
    at: PERSONAGENS_AVANCADOS.filter(p => p.testamento === 'AT').length,
    nt: PERSONAGENS_AVANCADOS.filter(p => p.testamento === 'NT').length,
  }), []);

  function parseRefClick(ref: string): { livro: string; cap: number; ver: number } | null {
    const cleaned = ref.toLowerCase().replace(/[()]/g, '').trim();
    const match = cleaned.match(/^([a-záéíóú]+):(\d+)(?::(\d+))?$/);
    if (!match) return null;
    return { livro: match[1], cap: parseInt(match[2]), ver: parseInt(match[3] ?? '1') };
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main id="main-content" className="pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <Breadcrumbs
              items={[
                { label: 'Início', href: '/' },
                { label: 'Personagens' },
              ]}
            />
          </div>
          {/* Hero */}
          <ScrollReveal>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <Users className="w-4 h-4" />
                Biografias dos Personagens
              </div>
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-light mb-4">
                Personagens <span className="text-primary italic">Bíblicos</span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Biografias detalhadas com linhagem, referências, doutrinas e tipologia
              </p>
            </div>
          </ScrollReveal>

          {/* Stats */}
          <ScrollReveal>
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="glass-card p-4 rounded-2xl text-center">
                <p className="font-display text-3xl font-light text-primary">{stats.total}</p>
                <p className="text-xs text-muted-foreground mt-1">Total</p>
              </div>
              <div className="glass-card p-4 rounded-2xl text-center">
                <p className="font-display text-3xl font-light text-amber-500">{stats.at}</p>
                <p className="text-xs text-muted-foreground mt-1">Antigo Testamento</p>
              </div>
              <div className="glass-card p-4 rounded-2xl text-center">
                <p className="font-display text-3xl font-light text-blue-500">{stats.nt}</p>
                <p className="text-xs text-muted-foreground mt-1">Novo Testamento</p>
              </div>
            </div>
          </ScrollReveal>

          {/* Search & Filters */}
          <ScrollReveal>
            <div className="glass-card p-6 rounded-2xl mb-8 space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Buscar por nome, hebraico, grego, significado..."
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                    className="w-full pl-12 pr-12 py-4 bg-background/50 border border-border/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                  />
                  {busca && (
                    <button onClick={() => setBusca('')} className="absolute right-4 top-1/2 -translate-y-1/2">
                      <X className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
                    </button>
                  )}
                </div>
                <div className="flex gap-2">
                  {(['todos', 'AT', 'NT'] as const).map((f) => (
                    <button
                      key={f}
                      onClick={() => setFiltroTestamento(f)}
                      className={`px-5 py-3 text-sm font-medium rounded-xl transition-all ${
                        filtroTestamento === f
                          ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                          : 'border border-border/50 text-muted-foreground hover:bg-muted/50'
                      }`}
                    >
                      {f === 'todos' ? 'Todos' : f === 'AT' ? 'Antigo T.' : 'Novo T.'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Period filter */}
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-2">Filtrar por período</p>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setFiltroPeriodo('todos')}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                      filtroPeriodo === 'todos'
                        ? 'bg-primary text-primary-foreground'
                        : 'border border-border/50 text-muted-foreground hover:bg-muted/50'
                    }`}
                  >
                    Todos
                  </button>
                  {periodosUnicos.map((per) => (
                    <button
                      key={per}
                      onClick={() => setFiltroPeriodo(per)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                        filtroPeriodo === per
                          ? 'bg-primary text-primary-foreground'
                          : 'border border-border/50 text-muted-foreground hover:bg-muted/50'
                      }`}
                    >
                      {periodoLabels[per] ?? per}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtrados.map((p, idx) => (
              <PersonagemCard
                key={p.slug}
                personagem={p}
                idx={idx}
                expandido={expandido === p.slug}
                onToggle={() => setExpandido(expandido === p.slug ? null : p.slug)}
                onRefClick={(livro, cap, ver) => setVersiculoPainel({ livro, cap, ver })}
              />
            ))}
          </div>

          {filtrados.length === 0 && (
            <ScrollReveal>
              <div className="glass-card p-16 text-center rounded-2xl">
                <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <Search className="w-10 h-10 text-primary/40" strokeWidth={1} />
                </div>
                <p className="font-display text-2xl text-muted-foreground mb-2">
                  Nenhum personagem encontrado
                </p>
                <p className="text-sm text-muted-foreground/70">
                  Tente buscar por outro nome ou filtro
                </p>
              </div>
            </ScrollReveal>
          )}
        </div>
      </main>

      <PainelDoVersiculo
        livro={versiculoPainel?.livro ?? 'gn'}
        capitulo={versiculoPainel?.cap ?? 1}
        versiculo={versiculoPainel?.ver ?? 1}
        aberto={versiculoPainel !== null}
        onFechar={() => setVersiculoPainel(null)}
      />

      <Footer />
    </div>
  );
}

function PersonagemCard({
  personagem: p,
  idx,
  expandido,
  onToggle,
  onRefClick,
}: {
  personagem: PersonagemAvancado;
  idx: number;
  expandido: boolean;
  onToggle: () => void;
  onRefClick: (livro: string, cap: number, ver: number) => void;
}) {
  function handleRefClick(ref: string) {
    const cleaned = ref.toLowerCase().replace(/[()]/g, '').trim();
    const match = cleaned.match(/^([a-záéíóú]+):(\d+)(?::(\d+))?$/);
    if (match) {
      onRefClick(match[1], parseInt(match[2]), parseInt(match[3] ?? '1'));
    }
  }

  return (
    <ScrollReveal delay={Math.min(idx * 30, 300)}>
      <div
        className={`glass-card rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer ${
          expandido ? 'ring-2 ring-primary/50' : ''
        }`}
        onClick={onToggle}
      >
        {/* Header */}
        <div className={`px-6 py-5 bg-gradient-to-r ${
          p.testamento === 'AT'
            ? 'from-amber-500/10 to-amber-600/5'
            : 'from-blue-500/10 to-blue-600/5'
        }`}>
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-2xl shrink-0">
              {p.testamento === 'AT' ? '📜' : '✝️'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-display text-xl font-semibold truncate">{p.nome}</h3>
                <span className={`text-[10px] font-bold uppercase px-3 py-1 rounded-full shrink-0 ${
                  p.testamento === 'AT'
                    ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300'
                    : 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300'
                }`}>
                  {p.testamento}
                </span>
              </div>
              {(p.nomeHebraico || p.nomeGrego) && (
                <p className="text-sm text-muted-foreground italic">
                  {p.nomeHebraico || p.nomeGrego}
                </p>
              )}
              {p.significado && (
                <p className="text-xs text-primary font-medium mt-0.5">"{p.significado}"</p>
              )}
            </div>
            <div className="shrink-0 mt-1">
              {expandido ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-sm text-foreground/80 leading-relaxed">{p.resumo}</p>

          {/* Expanded details */}
          {expandido && (
            <div className="mt-4 pt-4 border-t border-border/30 space-y-4" onClick={(e) => e.stopPropagation()}>
              {/* Linhagem */}
              {p.linhagem && Object.keys(p.linhagem).length > 0 && (
                <div>
                  <div className="flex items-center gap-1.5 mb-2">
                    <GitBranch className="w-3.5 h-3.5 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Linhagem</p>
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs">
                    {p.linhagem.pai && (
                      <span className="px-2 py-1 rounded-lg bg-muted/50 text-foreground/80">
                        Pai: <span className="font-medium">{p.linhagem.pai}</span>
                      </span>
                    )}
                    {p.linhagem.mae && (
                      <span className="px-2 py-1 rounded-lg bg-muted/50 text-foreground/80">
                        Mãe: <span className="font-medium">{p.linhagem.mae}</span>
                      </span>
                    )}
                    {p.linhagem.conjuge && (
                      <span className="px-2 py-1 rounded-lg bg-muted/50 text-foreground/80">
                        Cônjuge: <span className="font-medium">
                          {Array.isArray(p.linhagem.conjuge) ? p.linhagem.conjuge.join(', ') : p.linhagem.conjuge}
                        </span>
                      </span>
                    )}
                    {p.linhagem.filhos && p.linhagem.filhos.length > 0 && (
                      <span className="px-2 py-1 rounded-lg bg-muted/50 text-foreground/80">
                        Filhos: <span className="font-medium">{p.linhagem.filhos.join(', ')}</span>
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Referências bíblicas clicáveis */}
              {p.referencias.length > 0 && (
                <div>
                  <div className="flex items-center gap-1.5 mb-2">
                    <BookOpen className="w-3.5 h-3.5 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Referências</p>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {p.referencias.map((ref, i) => {
                      const cleaned = ref.toLowerCase().replace(/[()]/g, '').trim();
                      const isClickable = /^([a-záéíóú]+):(\d+)(?::(\d+))?$/.test(cleaned);
                      return (
                        <button
                          key={i}
                          onClick={() => handleRefClick(ref)}
                          disabled={!isClickable}
                          className={`text-[11px] font-mono px-2 py-1 rounded-md border transition-all flex items-center gap-1 ${
                            isClickable
                              ? 'border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50 cursor-pointer'
                              : 'border-border/30 text-muted-foreground cursor-default'
                          }`}
                        >
                          <BookOpen className="w-2.5 h-2.5" />
                          {ref}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Locais */}
              {p.locais && p.locais.length > 0 && (
                <div>
                  <div className="flex items-center gap-1.5 mb-2">
                    <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Locais</p>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {p.locais.map((local, i) => (
                      <span key={i} className="text-xs px-2 py-1 rounded-lg bg-lime-500/10 text-lime-700 dark:text-lime-300 dark:bg-lime-900/30">
                        {local}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Doutrinas */}
              {p.doutrinas && p.doutrinas.length > 0 && (
                <div>
                  <div className="flex items-center gap-1.5 mb-2">
                    <Shield className="w-3.5 h-3.5 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Doutrinas</p>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {p.doutrinas.map((doutrina, i) => (
                      <span key={i} className="text-xs px-2 py-1 rounded-lg bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 dark:bg-indigo-900/30">
                        {doutrina}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Tipologia */}
              {p.tipologia && (
                <div className="p-3 rounded-xl bg-primary/5 border border-primary/10">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-primary" />
                    <p className="text-xs text-primary font-semibold uppercase tracking-wider">Tipologia</p>
                  </div>
                  <p className="text-sm text-foreground/80">{p.tipologia}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </ScrollReveal>
  );
}
