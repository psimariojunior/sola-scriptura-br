'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import { doutrinas } from '@/data/biblia';
import { getTodosTemas, type TemaTeologico } from '@/data/teologiaSistematica';
import dynamic from 'next/dynamic';
import { Search, ChevronDown, ExternalLink, Copy, Check, Layers, GraduationCap, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { hrefBiblia, parseRefLivre } from '@/lib/bibliaHref';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import { PageHero } from '@/components/layout/PageHero';
import { useTranslation } from 'react-i18next';

const EstudosTeologicosAba = dynamic(() => import('@/components/EstudosTeologicosAba'), {
  ssr: false,
  loading: () => (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="sola-card p-6 animate-pulse">
          <div className="h-5 bg-muted rounded w-1/3 mb-3" />
          <div className="h-3 bg-muted rounded w-full mb-2" />
          <div className="h-3 bg-muted rounded w-2/3" />
        </div>
      ))}
    </div>
  ),
});

const PainelDoVersiculo = dynamic(() => import('@/components/PainelDoVersiculo'), {
  ssr: false,
  loading: () => null,
});

function getCoresCategoria(_cat: string) {
  return { bg: 'bg-primary/10', text: 'text-primary', dot: 'bg-primary' };
}

function parseReferencia(ref: string): { livro: string; capitulo: number; versiculo: number } | null {
  const parsed = parseRefLivre(ref);
  if (!parsed) return null;
  return { livro: parsed.livro, capitulo: parsed.capitulo, versiculo: parsed.versiculo ?? 1 };
}

export default function TeologiaClient() {
  const { t } = useTranslation();
  const [busca, setBusca] = useState('');
  const [filtroCategoria, setFiltroCategoria] = useState<string | null>(null);
  const [expandida, setExpandida] = useState<string | null>(null);
  const [copiedRef, setCopiedRef] = useState<string | null>(null);
  const [abaAtiva, setAbaAtiva] = useState<'doutrinas' | 'estudos' | 'sistematica'>('doutrinas');

  const [painelVersiculo, setPainelVersiculo] = useState<{
    livro: string;
    capitulo: number;
    versiculo: number;
  } | null>(null);

  const [estudosMeta, setEstudosMeta] = useState<{
    total: number;
    categorias: string[];
    totalVersiculos: number;
  }>({ total: 0, categorias: [], totalVersiculos: 0 });

  const [temasSistematica, setTemasSistematica] = useState<TemaTeologico[]>([]);
  const [expandidaSistematica, setExpandidaSistematica] = useState<string | null>(null);

  useEffect(() => {
    import('@/data/estudosTeologicosExpandidos').then((mod) => {
      const estudos = mod.estudosTeologicosExpandidos;
      setEstudosMeta({
        total: estudos.length,
        categorias: [...new Set(estudos.map((e) => e.categoria))].sort(),
        totalVersiculos: estudos.reduce((acc, e) => acc + e.versicosChave.length, 0),
      });
    });
    setTemasSistematica(getTodosTemas());
  }, []);

  const categorias = useMemo(() => {
    if (abaAtiva === 'sistematica') {
      return [...new Set(temasSistematica.map(t => t.categoria))].sort();
    }
    return [...new Set(doutrinas.map((d) => d.categoria))].sort();
  }, [abaAtiva, temasSistematica]);

  const doutrinasFiltradas = useMemo(() => {
    let lista = doutrinas;
    if (filtroCategoria) lista = lista.filter(d => d.categoria === filtroCategoria);
    if (busca.trim()) {
      const q = busca.toLowerCase();
      lista = lista.filter(d =>
        d.nome.toLowerCase().includes(q) ||
        d.definicao.toLowerCase().includes(q) ||
        d.passagens.some(p => p.toLowerCase().includes(q)) ||
        (d.tradicoes && d.tradicoes.toLowerCase().includes(q))
      );
    }
    return lista;
  }, [busca, filtroCategoria]);

  const temasSistematicaFiltrados = useMemo(() => {
    let lista = temasSistematica;
    if (filtroCategoria) lista = lista.filter(t => t.categoria === filtroCategoria);
    if (busca.trim()) {
      const q = busca.toLowerCase();
      lista = lista.filter(t =>
        t.titulo.toLowerCase().includes(q) ||
        t.descricao.toLowerCase().includes(q) ||
        t.resumo.toLowerCase().includes(q) ||
        t.versiculosChave.some(v => v.toLowerCase().includes(q))
      );
    }
    return lista;
  }, [busca, filtroCategoria, temasSistematica]);

  const copyRef = async (ref: string) => {
    await navigator.clipboard.writeText(ref);
    setCopiedRef(ref);
    setTimeout(() => setCopiedRef(null), 2000);
  };

  const handleVersiculoClick = useCallback((livro: string, cap: number, ver: number) => {
    setPainelVersiculo({ livro, capitulo: cap, versiculo: ver });
  }, []);

  return (
    <>
      <ScrollReveal>
        <PageHero
          icon={BookOpen}
          title={
            <>
              {t('theology.titlePart1')} <span className="italic text-primary">{t('theology.titlePart2')}</span>
            </>
          }
          subtitle={t('theology.description')}
        />
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <div className="sola-card p-4 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder={t('theology.searchPlaceholder')}
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <motion.button
                onClick={() => setFiltroCategoria(null)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-300 ${
                  !filtroCategoria ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {t('theology.all')}
              </motion.button>
              {(abaAtiva === 'doutrinas' ? categorias : estudosMeta.categorias.slice(0, 20)).map(cat => {
                const cores = getCoresCategoria(cat);
                return (
                  <motion.button
                    key={cat}
                    onClick={() => setFiltroCategoria(filtroCategoria === cat ? null : cat)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-300 flex items-center gap-1.5 ${
                      filtroCategoria === cat
                        ? 'bg-primary text-primary-foreground'
                        : `${cores.bg} ${cores.text} hover:opacity-80`
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${cores.dot}`} />
                    {cat}
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.15}>
        <div className="flex items-center justify-center gap-2 mb-8">
          <motion.button
            onClick={() => { setAbaAtiva('doutrinas'); setFiltroCategoria(null); setBusca(''); }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 ${
              abaAtiva === 'doutrinas'
                ? 'bg-primary text-primary-foreground shadow-md'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            <Layers className="w-4 h-4" />
            {t('theology.doctrines')} <span className="text-xs opacity-70">({doutrinas.length})</span>
          </motion.button>
          <motion.button
            onClick={() => { setAbaAtiva('estudos'); setFiltroCategoria(null); setBusca(''); }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 ${
              abaAtiva === 'estudos'
                ? 'bg-primary text-primary-foreground shadow-md'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            {t('theology.advancedStudies')} <span className="text-xs opacity-70">({estudosMeta.total})</span>
          </motion.button>
          <motion.button
            onClick={() => { setAbaAtiva('sistematica'); setFiltroCategoria(null); setBusca(''); }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 ${
              abaAtiva === 'sistematica'
                ? 'bg-primary text-primary-foreground shadow-md'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Sistematica <span className="text-xs opacity-70">({temasSistematica.length})</span>
          </motion.button>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.15}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { 
              value: abaAtiva === 'doutrinas' ? doutrinas.length : abaAtiva === 'estudos' ? estudosMeta.total : temasSistematica.length, 
              label: abaAtiva === 'doutrinas' ? t('theology.doctrines') : abaAtiva === 'estudos' ? t('theology.studies') : 'Temas' 
            },
            { 
              value: abaAtiva === 'doutrinas' ? categorias.length : abaAtiva === 'estudos' ? estudosMeta.categorias.length : [...new Set(temasSistematica.map(t => t.categoria))].length, 
              label: t('theology.categories') 
            },
            { 
              value: abaAtiva === 'doutrinas' ? doutrinas.reduce((acc, d) => acc + d.passagens.length, 0) : abaAtiva === 'estudos' ? estudosMeta.totalVersiculos : temasSistematica.reduce((acc, t) => acc + t.versiculosChave.length, 0), 
              label: t('theology.references') 
            },
            { value: 66, label: t('theology.biblicalBooks') },
          ].map((stat, i) => (
            <motion.div key={stat.label} className="sola-card p-4 text-center" whileHover={{ y: -2 }}>
              <p className="font-display text-3xl font-light text-primary">{stat.value}</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </ScrollReveal>

      <div className="space-y-8">
          {abaAtiva === 'doutrinas' && (
            <>
              {categorias.map((cat) => {
                const doutrinasCat = doutrinasFiltradas.filter(d => d.categoria === cat);
                if (doutrinasCat.length === 0) return null;
                const cores = getCoresCategoria(cat);

                return (
              <motion.div
                key={cat}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <h2 className="font-display text-2xl font-light mb-6 text-primary flex items-center gap-3">
                  <span className={`w-3 h-3 rounded-full ${cores.dot}`} />
                  {cat}
                  <span className="text-sm font-normal text-muted-foreground">({doutrinasCat.length})</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {doutrinasCat.map((d, i) => (
                    <ScrollReveal key={d.slug} delay={i * 0.05}>
                      <motion.div
                        className="sola-card p-6 h-full"
                        whileHover={{ y: -4, boxShadow: '0 8px 30px rgba(196,162,101,0.1)' }}
                        layout
                      >
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-lg">{d.nome}</h3>
                              <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${cores.bg} ${cores.text}`}>
                                {d.categoria}
                              </span>
                            </div>
                          </div>
                          <motion.button
                            onClick={() => setExpandida(expandida === d.slug ? null : d.slug)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                          >
                            <motion.div animate={{ rotate: expandida === d.slug ? 180 : 0 }} transition={{ duration: 0.3 }}>
                              <ChevronDown className="w-4 h-4" />
                            </motion.div>
                          </motion.button>
                        </div>

                        <p className="font-serif-body text-sm leading-relaxed text-foreground/80 mb-4">
                          {d.definicao}
                        </p>

                        <AnimatePresence>
                          {expandida === d.slug && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                              className="overflow-hidden"
                            >
                              <div className="pt-4 border-t border-border/50">
                                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                                  {t('theology.biblicalPassages')}
                                </h4>
                                <div className="flex flex-wrap gap-2 mb-4">
                                  {d.passagens.map((ref) => {
                                    const parsed = parseReferencia(ref);
                                    return (
                                      <div key={ref} className="flex items-center gap-1">
                                        {parsed ? (
                                          <Link
                                            href={hrefBiblia(parsed.livro, parsed.capitulo, parsed.versiculo)}
                                            className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-sm hover:bg-primary/20 transition-colors flex items-center gap-1"
                                          >
                                            {ref}
                                            <ExternalLink className="w-3 h-3" />
                                          </Link>
                                        ) : (
                                          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-sm">
                                            {ref}
                                          </span>
                                        )}
                                        <button
                                          onClick={() => copyRef(ref)}
                                          className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                                        >
                                          {copiedRef === ref ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
                                        </button>
                                      </div>
                                    );
                                  })}
                                </div>

                                {d.tradicoes && (
                                  <div>
                                    <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                                      {t('theology.traditionsView')}
                                    </h4>
                                    <p className="text-xs text-foreground/70 leading-relaxed font-serif-body">
                                      {d.tradicoes}
                                    </p>
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    </ScrollReveal>
                  ))}
                </div>
              </motion.div>
            );
          })}
            </>
          )}

          {abaAtiva === 'estudos' && (
            <EstudosTeologicosAba
              filtroCategoria={filtroCategoria}
              busca={busca}
              onVersiculoClick={handleVersiculoClick}
            />
          )}

          {abaAtiva === 'sistematica' && (
            <>
              {categorias.map((cat) => {
                const temasCat = temasSistematicaFiltrados.filter(t => t.categoria === cat);
                if (temasCat.length === 0) return null;
                const cores = getCoresCategoria(cat);

                return (
                  <motion.div
                    key={cat}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <h2 className="font-display text-2xl font-light mb-6 text-primary flex items-center gap-3">
                      <span className={`w-3 h-3 rounded-full ${cores.dot}`} />
                      {cat}
                      <span className="text-sm font-normal text-muted-foreground">({temasCat.length})</span>
                    </h2>
                    <div className="space-y-4">
                      {temasCat.map((tema, i) => (
                        <ScrollReveal key={tema.id} delay={i * 0.03}>
                          <motion.div
                            className="sola-card p-6"
                            whileHover={{ y: -2 }}
                            layout
                          >
                            <div className="flex items-start justify-between gap-4 mb-3">
                              <div className="flex-1">
                                <h3 className="font-semibold text-lg mb-1">{tema.titulo}</h3>
                                <p className="text-sm text-muted-foreground">{tema.descricao}</p>
                              </div>
                              <motion.button
                                onClick={() => setExpandidaSistematica(expandidaSistematica === tema.id ? null : tema.id)}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                              >
                                <motion.div animate={{ rotate: expandidaSistematica === tema.id ? 180 : 0 }} transition={{ duration: 0.3 }}>
                                  <ChevronDown className="w-4 h-4" />
                                </motion.div>
                              </motion.button>
                            </div>

                            <p className="font-serif-body text-sm leading-relaxed text-foreground/80 mb-3">
                              {tema.resumo}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-3">
                              {tema.versiculosChave.slice(0, 3).map((ref) => {
                                const parsed = parseReferencia(ref);
                                return (
                                  <div key={ref} className="flex items-center gap-1">
                                    {parsed ? (
                                      <Link
                                        href={hrefBiblia(parsed.livro, parsed.capitulo, parsed.versiculo)}
                                        className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-sm hover:bg-primary/20 transition-colors flex items-center gap-1"
                                      >
                                        {ref}
                                        <ExternalLink className="w-3 h-3" />
                                      </Link>
                                    ) : (
                                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-sm">
                                        {ref}
                                      </span>
                                    )}
                                  </div>
                                );
                              })}
                              {tema.versiculosChave.length > 3 && (
                                <span className="text-xs text-muted-foreground">+{tema.versiculosChave.length - 3} mais</span>
                              )}
                            </div>

                            <AnimatePresence>
                              {expandidaSistematica === tema.id && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                                  className="overflow-hidden"
                                >
                                  <div className="pt-4 border-t border-border/50 space-y-4">
                                    <div>
                                      <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                                        Conteudo Academico
                                      </h4>
                                      <p className="text-sm text-foreground/80 leading-relaxed font-serif-body whitespace-pre-line">
                                        {tema.conteudo}
                                      </p>
                                    </div>

                                    {tema.autoresClassicos && tema.autoresClassicos.length > 0 && (
                                      <div>
                                        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                                          Autores Classicos
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                          {tema.autoresClassicos.map((autor) => (
                                            <span key={autor} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                                              {autor}
                                            </span>
                                          ))}
                                        </div>
                                      </div>
                                    )}

                                    {tema.debateContemporaneo && (
                                      <div>
                                        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                                          Debate Contemporaneo
                                        </h4>
                                        <p className="text-sm text-foreground/70 leading-relaxed font-serif-body">
                                          {tema.debateContemporaneo}
                                        </p>
                                      </div>
                                    )}

                                    {tema.aplicacao && (
                                      <div>
                                        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                                          Aplicacao
                                        </h4>
                                        <p className="text-sm text-foreground/70 leading-relaxed font-serif-body">
                                          {tema.aplicacao}
                                        </p>
                                      </div>
                                    )}

                                    {tema.perguntas && tema.perguntas.length > 0 && (
                                      <div>
                                        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                                          Para Reflexao
                                        </h4>
                                        <ul className="space-y-2">
                                          {tema.perguntas.map((pergunta, idx) => (
                                            <li key={idx} className="text-sm text-foreground/70 flex items-start gap-2">
                                              <span className="text-primary mt-1">*</span>
                                              {pergunta}
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    )}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.div>
                        </ScrollReveal>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </>
          )}
      </div>

      {((abaAtiva === 'doutrinas' && doutrinasFiltradas.length === 0) || (abaAtiva === 'sistematica' && temasSistematicaFiltrados.length === 0)) && (
        <ScrollReveal>
          <div className="sola-card p-12 text-center">
            <Search className="w-16 h-16 mx-auto mb-4 text-muted-foreground/20" strokeWidth={1} />
            <p className="font-display text-xl text-muted-foreground mb-1">
              {abaAtiva === 'doutrinas' ? t('theology.noDoctrines') : t('theology.noStudies')}
            </p>
            <p className="text-sm text-muted-foreground/70">{t('common.tryDifferent')}</p>
          </div>
        </ScrollReveal>
      )}

      <ScrollReveal delay={0.2}>
        <div className="mt-16">
          <h2 className="font-display text-2xl font-light mb-6 text-primary">{t('theology.theologicalTraditions')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: t('theology.reformed'), desc: t('theology.reformedDesc'), tags: t('theology.reformedTags', { returnObjects: true }) as string[] },
              { name: t('theology.arminian'), desc: t('theology.arminianDesc'), tags: t('theology.arminianTags', { returnObjects: true }) as string[] },
              { name: t('theology.baptist'), desc: t('theology.baptistDesc'), tags: t('theology.baptistTags', { returnObjects: true }) as string[] },
            ].map((trad, i) => (
              <motion.div key={trad.name} className="sola-card p-6" whileHover={{ y: -4 }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <h3 className="font-semibold mb-2">{trad.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{trad.desc}</p>
                <div className="flex flex-wrap gap-1">
                  {trad.tags.map(p => (
                    <span key={p} className="text-[10px] px-2 py-0.5 bg-muted rounded-full text-muted-foreground">{p}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {painelVersiculo && (
        <PainelDoVersiculo
          livro={painelVersiculo.livro}
          capitulo={painelVersiculo.capitulo}
          versiculo={painelVersiculo.versiculo}
          aberto={true}
          onFechar={() => setPainelVersiculo(null)}
          onVersiculoClick={handleVersiculoClick}
        />
      )}
    </>
  );
}
