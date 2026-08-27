'use client';

import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { PageShell } from '@/components/layout/PageShell';
import { PageHero } from '@/components/layout/PageHero';
import ScrollReveal from '@/components/ScrollReveal';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Search, Columns3, ChevronRight, ChevronDown, ChevronUp, Clock, Layers, X } from 'lucide-react';
import Link from 'next/link';
import {
  getParalelosLivro,
  getParalelosPorCategoria,
  buscarParalelos,
} from '@/data/biblia/sinopticos';
import type { ParaleloSinotico } from '@/data/biblia/sinopticos';
import { hrefFromRef } from '@/lib/bibliaHref';
import { useSyncedColumnScroll } from '@/hooks/useSyncedColumnScroll';

type Categoria = ParaleloSinotico['categoria'] | 'todas';
type Visao = 'colunas' | 'lista';

const CATEGORIAS: { valor: Categoria; labelKey: string }[] = [
  { valor: 'todas', labelKey: 'harmonia.catAll' },
  { valor: 'narrativa', labelKey: 'harmonia.catNarrative' },
  { valor: 'parabola', labelKey: 'harmonia.catParable' },
  { valor: 'milagre', labelKey: 'harmonia.catMiracle' },
  { valor: 'discurso', labelKey: 'harmonia.catDiscourse' },
  { valor: 'ensino', labelKey: 'harmonia.catTeaching' },
  { valor: 'paixao', labelKey: 'harmonia.catPassion' },
  { valor: 'pos-ressurreicao', labelKey: 'harmonia.catPostResurrection' },
];

const CATEGORIA_COR: Record<string, string> = {
  narrativa: 'bg-primary/10 text-primary',
  parabola: 'bg-primary/10 text-primary',
  milagre: 'bg-primary/10 text-primary',
  discurso: 'bg-primary/10 text-primary',
  ensino: 'bg-primary/10 text-primary',
  paixao: 'bg-primary/10 text-primary',
  'pos-ressurreicao': 'bg-primary/10 text-primary',
};

const EVANGELHOS = [
  { chave: 'mateus' as const, abrev: 'Mt', nome: 'Mateus', cor: 'from-primary/90 to-primary', corBg: 'bg-primary/10', corText: 'text-primary', corBorder: 'border-primary/30', corDot: 'bg-primary' },
  { chave: 'marcos' as const, abrev: 'Mc', nome: 'Marcos', cor: 'from-primary/80 to-primary', corBg: 'bg-primary/10', corText: 'text-primary', corBorder: 'border-primary/30', corDot: 'bg-primary' },
  { chave: 'lucas' as const, abrev: 'Lc', nome: 'Lucas', cor: 'from-primary/70 to-primary', corBg: 'bg-primary/10', corText: 'text-primary', corBorder: 'border-primary/30', corDot: 'bg-primary' },
  { chave: 'joao' as const, abrev: 'Jo', nome: 'João', cor: 'from-primary/60 to-primary', corBg: 'bg-primary/10', corText: 'text-primary', corBorder: 'border-primary/30', corDot: 'bg-primary' },
];

function RefLink({ ref: r }: { ref: string }) {
  return (
    <Link
      href={hrefFromRef(r)}
      onClick={(e) => e.stopPropagation()}
      className="text-xs font-medium px-2 py-0.5 rounded bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
    >
      {r.replace(/:/g, ' ')}
    </Link>
  );
}

function getRefs(p: ParaleloSinotico, chave: keyof Pick<ParaleloSinotico, 'mateus' | 'marcos' | 'lucas' | 'joao'>): string[] {
  return (p[chave] as string[] | undefined) ?? [];
}

function hasAllFour(p: ParaleloSinotico): boolean {
  return !!(p.mateus?.length && p.marcos?.length && p.lucas?.length && p.joao?.length);
}

function getPassageCount(p: ParaleloSinotico): number {
  let count = 0;
  if (p.mateus?.length) count += p.mateus.length;
  if (p.marcos?.length) count += p.marcos.length;
  if (p.lucas?.length) count += p.lucas.length;
  if (p.joao?.length) count += p.joao.length;
  return count;
}

function TimelineIndicator({ p }: { p: ParaleloSinotico }) {
  const total = getPassageCount(p);
  return (
    <div className="flex items-center gap-1.5">
      {EVANGELHOS.map((ev) => {
        const refs = getRefs(p, ev.chave);
        return (
          <div key={ev.chave} className="flex items-center gap-0.5" title={`${ev.nome}: ${refs.length > 0 ? refs.join(', ') : '—'}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${refs.length > 0 ? ev.corDot : 'bg-muted-foreground/20'}`} />
            <span className={`text-[9px] font-bold uppercase ${refs.length > 0 ? ev.corText : 'text-muted-foreground/30'}`}>
              {ev.abrev}
            </span>
          </div>
        );
      })}
      {total > 1 && (
        <span className="ml-1 text-[9px] text-muted-foreground/50">×{total}</span>
      )}
    </div>
  );
}

function ColunaEvangelho({
  evangelho,
  paralelos,
  expandido,
  onToggle,
  scrollRef,
  onScroll,
}: {
  evangelho: typeof EVANGELHOS[number];
  paralelos: ParaleloSinotico[];
  expandido: string | null;
  onToggle: (id: string) => void;
  scrollRef?: (el: HTMLDivElement | null) => void;
  onScroll?: () => void;
}) {
  const { t } = useTranslation();
  const comPassagem = paralelos.filter((p) => getRefs(p, evangelho.chave).length > 0);

  return (
    <div className="flex flex-col min-w-0">
      <div className="sticky top-0 z-10 px-4 py-3 rounded-t-xl border border-b-0 border-border/50 bg-[var(--surface-raised)]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary" />
          <h3 className="text-sm font-bold text-foreground">{evangelho.nome}</h3>
          <span className="ml-auto text-xs text-muted-foreground">{comPassagem.length}</span>
        </div>
      </div>
      <div
        ref={scrollRef}
        onScroll={onScroll}
        className="border border-t-0 rounded-b-xl border-border/50 divide-y divide-border/30 bg-card/50 max-h-[calc(100vh-280px)] overflow-y-auto overscroll-contain"
      >
        {comPassagem.length === 0 ? (
          <div className="p-6 text-center text-xs text-muted-foreground/50">
            {t('harmonia.noParallelsForGospel')}
          </div>
        ) : (
          comPassagem.map((p) => {
            const refs = getRefs(p, evangelho.chave);
            const isExpanded = expandido === p.id;
            return (
              <motion.div
                key={p.id}
                data-sync-verse={p.id}
                layout
                className={`p-3 cursor-pointer hover:bg-secondary/30 transition-colors ${isExpanded ? 'bg-secondary/50' : ''}`}
                onClick={() => onToggle(p.id)}
              >
                <div className="flex items-start gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-1.5 flex-wrap">
                      <span className={`px-1.5 py-0.5 text-[9px] font-medium rounded-full ${CATEGORIA_COR[p.categoria] ?? 'bg-muted text-muted-foreground'}`}>
                        {p.categoria}
                      </span>
                      {p.fonte && (
                        <span className="text-[9px] text-muted-foreground/60">{p.fonte}</span>
                      )}
                    </div>
                    <h4 className="text-xs font-semibold text-foreground leading-tight mb-1.5">{p.titulo}</h4>
                    <div className="flex flex-wrap gap-1">
                      {refs.map((r) => (
                        <RefLink key={r} ref={r} />
                      ))}
                    </div>
                  </div>
                  <ChevronDown className={`w-3.5 h-3.5 text-muted-foreground/50 flex-shrink-0 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                </div>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-2 pt-2 border-t border-border/30">
                        <TimelineIndicator p={p} />
                        {p.notas && (
                          <p className="text-[11px] text-muted-foreground mt-1.5 leading-relaxed">{p.notas}</p>
                        )}
                        <div className="mt-2 flex flex-wrap gap-1">
                          {refs.map((r) => (
                            <Link
                              key={r}
                              href={hrefFromRef(r)}
                              onClick={(e) => e.stopPropagation()}
                              className="text-[10px] px-2 py-1 rounded-md bg-primary/10 text-primary hover:bg-primary/20 transition-colors font-medium"
                            >
                              Ler {r.replace(/:/g, ' ')}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
}

function MobileTabs({
  paralelos,
  expandido,
  onToggle,
}: {
  paralelos: ParaleloSinotico[];
  expandido: string | null;
  onToggle: (id: string) => void;
}) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <div className="flex gap-1 p-1 bg-secondary/50 rounded-xl mb-4">
        {EVANGELHOS.map((ev, i) => {
          const count = paralelos.filter((p) => getRefs(p, ev.chave).length > 0).length;
          return (
            <button
              key={ev.chave}
              onClick={() => setActiveTab(i)}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
                activeTab === i
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <span className="hidden sm:inline">{ev.nome}</span>
              <span className="sm:hidden">{ev.abrev}</span>
              <span className="ml-1 text-[10px] opacity-70">{count}</span>
            </button>
          );
        })}
      </div>

      <ColunaEvangelho
        evangelho={EVANGELHOS[activeTab]}
        paralelos={paralelos}
        expandido={expandido}
        onToggle={onToggle}
      />
    </div>
  );
}

export default function HarmoniaPage() {
  const { t } = useTranslation();
  const [busca, setBusca] = useState('');
  const [filtroCategoria, setFiltroCategoria] = useState<Categoria>('todas');
  const [expandido, setExpandido] = useState<string | null>(null);
  const [visao, setVisao] = useState<Visao>('colunas');
  const { setRef, onScroll } = useSyncedColumnScroll();

  const paralelos = useMemo(() => {
    let lista = filtroCategoria === 'todas'
      ? getParalelosLivro('mt').length > 0
        ? [...getParalelosLivro('mt'), ...getParalelosLivro('mc'), ...getParalelosLivro('lc'), ...getParalelosLivro('jo')]
        : []
      : getParalelosPorCategoria(filtroCategoria);

    if (filtroCategoria === 'todas') {
      const seen = new Set<string>();
      lista = lista.filter((p) => {
        if (seen.has(p.id)) return false;
        seen.add(p.id);
        return true;
      });
    }

    if (busca.trim()) lista = buscarParalelos(busca);

    return lista;
  }, [busca, filtroCategoria]);

  const stats = useMemo(() => ({
    total: paralelos.length,
    categorias: new Set(paralelos.map((p) => p.categoria)).size,
    triplice: paralelos.filter((p) => p.mateus?.length && p.marcos?.length && p.lucas?.length).length,
    quatro: paralelos.filter(hasAllFour).length,
  }), [paralelos]);

  function toggleExpandido(id: string) {
    setExpandido(expandido === id ? null : id);
  }

  return (
    <PageShell maxWidth="7xl" className="bg-pattern-wave">
        <ScrollReveal>
          <PageHero
            icon={Columns3}
            title={<>{t('harmonia.title1')} <span className="italic text-primary">{t('harmonia.title2')}</span></>}
            subtitle={t('harmonia.subtitle')}
          />
        </ScrollReveal>

        <div>
          {/* Search + Filters */}
          <ScrollReveal delay={0.1}>
            <div className="sola-card p-4 mb-6">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder={t('harmonia.searchPlaceholder')}
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                  />
                  {busca && (
                    <button onClick={() => setBusca('')} className="absolute right-3 top-1/2 -translate-y-1/2">
                      <X className="w-3.5 h-3.5 text-muted-foreground hover:text-foreground" />
                    </button>
                  )}
                </div>
                <div className="flex gap-2 items-center">
                  <button
                    onClick={() => setVisao(visao === 'colunas' ? 'lista' : 'colunas')}
                    className="px-3 py-2 text-xs font-medium rounded-lg bg-secondary/50 text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
                    title={visao === 'colunas' ? t('harmonia.viewAsList') : t('harmonia.viewAsColumns')}
                  >
                    {visao === 'colunas' ? <Layers className="w-3.5 h-3.5" /> : <Columns3 className="w-3.5 h-3.5" />}
                    <span className="hidden sm:inline">{visao === 'colunas' ? t('harmonia.listView') : t('harmonia.columnsView')}</span>
                  </button>
                </div>
              </div>
              <div className="flex gap-1.5 mt-3 flex-wrap">
                {CATEGORIAS.map((cat) => (
                  <motion.button
                    key={cat.valor}
                    onClick={() => setFiltroCategoria(cat.valor)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`px-3 py-1.5 text-[11px] font-medium rounded-full transition-all duration-200 ${
                      filtroCategoria === cat.valor
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    {t(cat.labelKey)}
                  </motion.button>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Stats */}
          <ScrollReveal delay={0.12}>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {[
                { value: stats.total, label: t('harmonia.statParallels'), color: 'text-primary' },
                { value: stats.categorias, label: t('harmonia.statCategories'), color: 'text-amber-500' },
                { value: stats.triplice, label: t('harmonia.statTriplet'), color: 'text-emerald-500' },
                { value: stats.quatro, label: t('harmonia.statFourGospels'), color: 'text-purple-500' },
              ].map((stat) => (
                <motion.div key={stat.label} className="sola-card p-3 text-center" whileHover={{ y: -2 }}>
                  <p className={`font-display text-2xl font-light ${stat.color}`}>{stat.value}</p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>

          {/* Legend */}
          <div className="flex items-center gap-4 mb-4 px-1 flex-wrap">
            {EVANGELHOS.map((ev) => (
              <div key={ev.chave} className="flex items-center gap-1.5">
                <span className={`w-2.5 h-2.5 rounded-full ${ev.corDot}`} />
                <span className="text-[11px] font-medium text-muted-foreground">{ev.nome}</span>
              </div>
            ))}
            <div className="flex items-center gap-1.5 ml-auto">
              <Clock className="w-3 h-3 text-muted-foreground/50" />
              <span className="text-[10px] text-muted-foreground/50">{t('harmonia.clickToExpand')}</span>
            </div>
          </div>

          {/* Content */}
          {visao === 'colunas' ? (
            /* Desktop: Side-by-side columns */
            <div className="hidden lg:block">
              <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground mb-2">Rolagem sincronizada</p>
              <div className="grid grid-cols-4 gap-3">
              {EVANGELHOS.map((ev, i) => (
                <ColunaEvangelho
                  key={ev.chave}
                  evangelho={ev}
                  paralelos={paralelos}
                  expandido={expandido}
                  onToggle={toggleExpandido}
                  scrollRef={setRef(i)}
                  onScroll={() => onScroll(i)}
                />
              ))}
              </div>
            </div>
          ) : null}

          {/* Mobile / Lista view */}
          <div className={visao === 'colunas' ? 'lg:hidden' : ''}>
            {visao === 'colunas' ? (
              <MobileTabs paralelos={paralelos} expandido={expandido} onToggle={toggleExpandido} />
            ) : (
              <div className="space-y-2">
                <AnimatePresence mode="popLayout">
                  {paralelos.map((p, i) => {
                    const isExpanded = expandido === p.id;
                    return (
                      <motion.div
                        key={p.id}
                        layout
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.25, delay: Math.min(i * 0.01, 0.3) }}
                      >
                        <div
                          className={`sola-card p-4 cursor-pointer transition-all ${isExpanded ? 'ring-2 ring-primary/20' : ''}`}
                          onClick={() => toggleExpandido(p.id)}
                        >
                          <div className="flex items-start gap-3">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-2 flex-wrap">
                                <span className={`px-2 py-0.5 text-[10px] font-medium rounded-full ${CATEGORIA_COR[p.categoria] ?? 'bg-muted text-muted-foreground'}`}>
                                  {p.categoria}
                                </span>
                                {p.fonte && (
                                  <span className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-muted text-muted-foreground">
                                    {p.fonte}
                                  </span>
                                )}
                              </div>
                              <h3 className="font-display text-base font-semibold mb-2">{p.titulo}</h3>
                              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                {EVANGELHOS.map((ev) => {
                                  const refs = getRefs(p, ev.chave);
                                  return (
                                    <div key={ev.chave} className="flex items-start gap-1.5">
                                      <span className={`text-[10px] font-bold uppercase ${ev.corText}`}>{ev.abrev}</span>
                                      {refs.length > 0 ? (
                                        <div className="flex flex-wrap gap-1">
                                          {refs.map((r) => (
                                            <RefLink key={r} ref={r} />
                                          ))}
                                        </div>
                                      ) : (
                                        <span className="text-[10px] text-muted-foreground/30">—</span>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                              <div className="mt-2">
                                <TimelineIndicator p={p} />
                              </div>
                            </div>
                            <ChevronRight className={`w-5 h-5 text-muted-foreground transition-transform flex-shrink-0 mt-1 ${isExpanded ? 'rotate-90' : ''}`} />
                          </div>

                          <AnimatePresence>
                            {isExpanded && p.notas && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                              >
                                <p className="text-sm text-muted-foreground mt-3 pt-3 border-t border-border">
                                  {p.notas}
                                </p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            )}
          </div>

          {paralelos.length === 0 && (
            <ScrollReveal>
              <div className="text-center py-16">
                <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-h3 text-muted-foreground">{t('harmonia.noParallels')}</p>
                <p className="text-sm text-muted-foreground/60 mt-2">{t('harmonia.tryAdjust')}</p>
              </div>
            </ScrollReveal>
          )}
        </div>
    </PageShell>
  );
}
