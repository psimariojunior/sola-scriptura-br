'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import {
  Heart, StickyNote, Bookmark, Search, X, BookOpen, Trash2, ArrowRight,
  GraduationCap, Users, Layers, Quote, ChevronRight, Star, Library,
  History, BookMarked, Sparkles, Filter, ArrowUpDown, Play,
} from 'lucide-react';
import { listarMarcas, removerMarca, toggleFavorito, type MarcaBiblia } from '@/lib/estudos';
import { livroPorAbreviacao, TODOS_LIVROS } from '@/data/biblia';
import ScrollReveal from '@/components/ScrollReveal';
import { exportToJson, exportToTxt, exportToCsv } from '@/lib/exportarEstudos';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { estudosPorLivro } from '@/data/estudosPorLivro';
import { obterEstudos, type EstudoVersiculo } from '@/data/estudosTeologicos';
import { listarTodosTeologos, type Teologo } from '@/data/teologos';
import { obterTodosComentarios, type Comentario } from '@/data/comentarios';
import { getStats } from '@/lib/estatisticas';

const PERIODOS_LABELS: Record<string, string> = {
  patristico: 'Padres da Igreja',
  escolastico: 'Escolástica',
  reforma: 'Reforma',
  'pos-reforma': 'Pós-Reforma',
  modernos: 'Teólogos Modernos',
  contemporaneos: 'Contemporâneos',
};

const PERIODOS_ICONS: Record<string, typeof BookOpen> = {
  patristico: Star,
  escolastico: Library,
  reforma: BookOpen,
  'pos-reforma': Users,
  modernos: GraduationCap,
  contemporaneos: Quote,
};

const CATEGORIAS_ESTUDO = [
  { id: 'livros', label: 'Por Livro', icon: BookOpen, description: 'Estudo panorâmico de cada livro bíblico — contexto, temas, versículos-chave e perguntas' },
  { id: 'temas', label: 'Por Tema / Tipo', icon: Layers, description: 'Teologia sistemática e tópicos doutrinários para estudo temático' },
  { id: 'teologicos', label: 'Estudos Teológicos', icon: GraduationCap, description: 'Análises de versículos-chave com visões de múltiplos teólogos' },
  { id: 'teologos', label: 'Teólogos', icon: Users, description: 'Perfis de teólogos de todas as épocas e tradições' },
  { id: 'comentarios', label: 'Comentários', icon: Quote, description: 'Comentários versículo a verso de teólogos renomados' },
  { id: 'meusestudos', label: 'Meus Estudos', icon: Bookmark, description: 'Seus versículos favoritos, anotações e marcações' },
];

type Ordenacao = 'recente' | 'livro';

export default function EstudosPage() {
  const [categoriaAtiva, setCategoriaAtiva] = useState('livros');
  const [marcas, setMarcas] = useState<MarcaBiblia[]>([]);
  const [aba, setAba] = useState<'todas' | 'favoritos' | 'anotacoes'>('todas');
  const [query, setQuery] = useState('');
  const [periodoFilter, setPeriodoFilter] = useState<string>('todos');

  // Personal study organization
  const [filtroLivro, setFiltroLivro] = useState<string>('todos');
  const [ordenacao, setOrdenacao] = useState<Ordenacao>('recente');

  // Continuar estudando (reading history)
  const [retomar, setRetomar] = useState<{ livro: string; titulo: string; capitulo: number } | null>(null);
  const [livrosLidos, setLivrosLidos] = useState<Record<string, number>>({});

  const carregar = () => setMarcas(listarMarcas());
  useEffect(() => {
    carregar();
    try {
      const stats = getStats();
      setLivrosLidos(stats.booksRead || {});
      const ultimo = Object.entries(stats.booksRead || {})
        .filter(([, c]) => c > 0)
        .sort((a, b) => (b[1] as number) - (a[1] as number))[0];
      if (ultimo) {
        const info = livroPorAbreviacao.get(ultimo[0]);
        if (info) setRetomar({ livro: ultimo[0], titulo: info.nome, capitulo: 1 });
      }
    } catch {}
  }, []);

  const filtradas = useMemo(() => {
    let lista = marcas;
    if (aba === 'favoritos') lista = lista.filter((m) => m.favorito);
    if (aba === 'anotacoes') lista = lista.filter((m) => m.anotacao);
    if (filtroLivro !== 'todos') lista = lista.filter((m) => m.livro === filtroLivro);
    if (query.trim()) {
      const q = query.toLowerCase();
      lista = lista.filter((m) => m.texto.toLowerCase().includes(q) || m.anotacao?.texto.toLowerCase().includes(q));
    }
    return lista.sort((a, b) => {
      if (ordenacao === 'livro') {
        const cmp = (livroPorAbreviacao.get(a.livro)?.nome || '').localeCompare(
          livroPorAbreviacao.get(b.livro)?.nome || '', 'pt-BR'
        );
        return cmp !== 0 ? cmp : b.dataCriacao - a.dataCriacao;
      }
      return b.dataCriacao - a.dataCriacao;
    });
  }, [marcas, aba, query, filtroLivro, ordenacao]);

  const stats = useMemo(() => ({
    total: marcas.length,
    favoritos: marcas.filter((m) => m.favorito).length,
    anotacoes: marcas.filter((m) => m.anotacao).length,
  }), [marcas]);

  const livrosComEstudo = useMemo(() => {
    return Object.keys(estudosPorLivro).map(slug => {
      const info = livroPorAbreviacao.get(slug);
      return { slug, titulo: info?.nome || slug, estudo: estudosPorLivro[slug], testamento: info?.testamento || 'AT' };
    }).sort((a, b) => a.titulo.localeCompare(b.titulo, 'pt-BR'));
  }, []);

  const livrosEstudoFiltrados = useMemo(() => {
    if (!query.trim()) return livrosComEstudo;
    const q = query.toLowerCase();
    return livrosComEstudo.filter(l =>
      l.titulo.toLowerCase().includes(q) ||
      l.estudo.temasPrincipais.some(t => t.toLowerCase().includes(q))
    );
  }, [livrosComEstudo, query]);

  const livrosPorTestamento = useMemo(() => ({
    AT: livrosEstudoFiltrados.filter(l => l.testamento === 'AT'),
    NT: livrosEstudoFiltrados.filter(l => l.testamento === 'NT'),
  }), [livrosEstudoFiltrados]);

  const livrosUnicosFavoritos = useMemo(() => {
    const slugs = new Set(marcas.map(m => m.livro));
    return Array.from(slugs)
      .map(s => ({ slug: s, nome: livroPorAbreviacao.get(s)?.nome || s }))
      .sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));
  }, [marcas]);

  const teologos = useMemo(() => {
    const todos = listarTodosTeologos();
    if (periodoFilter === 'todos') return todos;
    return todos.filter(t => t.periodo === periodoFilter);
  }, [periodoFilter]);

  const estudosTeologicos = useMemo(() => {
    const estudos: EstudoVersiculo[] = [];
    const seen = new Set<string>();
    for (const livro of TODOS_LIVROS) {
      for (let cap = 1; cap <= livro.totalCapitulos; cap++) {
        for (let v = 1; v <= 50; v++) {
          const key = `${livro.abreviacao}:${cap}:${v}`;
          if (seen.has(key)) continue;
          const e = obterEstudos(livro.abreviacao, cap, v);
          if (e.length > 0) {
            seen.add(key);
            estudos.push(...e);
          }
        }
      }
    }
    return estudos;
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main id="main-content" className="pt-20 pb-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <Breadcrumbs items={[{ label: 'Início', href: '/' }, { label: 'Estudos' }]} />
          </div>

          <ScrollReveal>
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-primary" />
                </div>
                <h1 className="font-display text-3xl md:text-4xl font-light">Biblioteca de Estudos</h1>
              </div>
              <p className="text-muted-foreground ml-13 text-sm">
                Sua biblioteca de pesquisa: estudos por livro, teologia sistemática, teólogos e seus estudos pessoais
              </p>
            </div>
          </ScrollReveal>

          {/* ═══ CONTINUAR ESTUDANDO ═══ */}
          {retomar && (
            <ScrollReveal delay={0.05}>
              <div className="sola-card p-5 mb-8 bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-11 h-11 rounded-xl bg-primary/15 flex items-center justify-center shrink-0">
                      <History className="w-5 h-5 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Continuar estudando</p>
                      <p className="font-display text-lg font-semibold truncate">
                        Retomar em {retomar.titulo}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {livrosLidos[retomar.livro]} {livrosLidos[retomar.livro] === 1 ? 'capítulo' : 'capítulos'} lidos neste livro
                      </p>
                    </div>
                  </div>
                  <Link
                    href={`/biblia?livro=${retomar.livro}&capitulo=${retomar.capitulo}`}
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all hover:shadow-md shrink-0"
                  >
                    <Play className="w-4 h-4" /> Abrir leitura
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          )}

          {/* Category Tabs */}
          <ScrollReveal delay={0.1}>
            <div className="flex flex-wrap gap-2 mb-8">
              {CATEGORIAS_ESTUDO.map(cat => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setCategoriaAtiva(cat.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      categoriaAtiva === cat.id
                        ? 'bg-primary text-primary-foreground shadow-md'
                        : 'bg-card border border-border/60 text-muted-foreground hover:text-foreground hover:border-border'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </ScrollReveal>

          {/* ═══ POR LIVRO ═══ */}
          {categoriaAtiva === 'livros' && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-5 h-5 text-primary" />
                <h2 className="font-display text-xl font-semibold">Estudos por Livro</h2>
                <span className="text-xs text-muted-foreground ml-2">{livrosComEstudo.length} livros disponíveis</span>
              </div>

              <div className="relative mb-6 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Buscar livro ou tema..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full pl-9 pr-9 py-2.5 text-sm bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
                />
                {query && (
                  <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 hover:text-foreground transition-colors">
                    <X className="w-3.5 h-3.5 text-muted-foreground" />
                  </button>
                )}
              </div>

      {(['AT', 'NT'] as const).map(test => {
        const lista = livrosPorTestamento[test];
        if (lista.length === 0) return null;
        return (
          <div key={test} className="mb-8">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4" />
              {test === 'AT' ? 'Antigo Testamento' : 'Novo Testamento'}
              <span className="text-[10px] bg-muted px-2 py-0.5 rounded-full">{lista.length}</span>
            </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {lista.map((l, i) => (
                        <ScrollReveal key={l.slug} delay={Math.min(i * 0.02, 0.3)}>
                          <Link
                            href={`/estudos/${l.slug}`}
                            className="block sola-card p-4 rounded-xl hover:shadow-lg transition-all group"
                          >
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="font-display text-base font-semibold group-hover:text-primary transition-colors">{l.titulo}</h4>
                              <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                            </div>
                            <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                              {l.estudo.contexto}
                            </p>
                            <div className="flex flex-wrap gap-1">
                              {l.estudo.temasPrincipais.slice(0, 3).map(t => (
                                <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary">{t}</span>
                              ))}
                            </div>
                            <div className="mt-3 pt-2 border-t border-border/30 flex items-center gap-3 text-[10px] text-muted-foreground">
                              <span>{l.estudo.versiculosChave.length} versículos-chave</span>
                              <span>•</span>
                              <span>{l.estudo.perguntasEstudo.length} perguntas</span>
                            </div>
                          </Link>
                        </ScrollReveal>
                      ))}
                    </div>
                  </div>
                );
              })}

              {livrosEstudoFiltrados.length === 0 && (
                <div className="sola-card p-12 text-center">
                  <BookOpen className="w-12 h-12 mx-auto text-muted-foreground/30 mb-4" strokeWidth={1} />
                  <p className="text-muted-foreground">Nenhum livro encontrado para &ldquo;{query}&rdquo;.</p>
                </div>
              )}
            </div>
          )}

          {/* ═══ POR TEMA / TIPO ═══ */}
          {categoriaAtiva === 'temas' && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Layers className="w-5 h-5 text-primary" />
                <h2 className="font-display text-xl font-semibold">Estudos Temáticos</h2>
              </div>
              <p className="text-sm text-muted-foreground mb-6">
                Explore a Bíblia por doutrina e tópico. Estes estudos sistemáticos reúnem centenas de passagens e visões teológicas em categorias organizadas.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <ScrollReveal>
                  <Link href="/teologia" className="block sola-card p-6 rounded-xl hover:shadow-lg transition-all group">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                        <GraduationCap className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="font-display text-lg font-semibold group-hover:text-primary transition-colors">Teologia Sistemática</h3>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">
                      13 categorias doutrinárias — Deus, Cristo, Salvação, Escatologia e mais — com estudos aprofundados.
                    </p>
                    <span className="inline-flex items-center gap-1 text-xs text-primary font-medium">
                      Explorar doutrinas <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                </ScrollReveal>
                <ScrollReveal delay={0.05}>
                  <Link href="/topicos" className="block sola-card p-6 rounded-xl hover:shadow-lg transition-all group">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Layers className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="font-display text-lg font-semibold group-hover:text-primary transition-colors">Tópicos Teológicos</h3>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">
                      Tópicos organizados por categoria doutrinária, com versículos-chave e conexões temáticas.
                    </p>
                    <span className="inline-flex items-center gap-1 text-xs text-primary font-medium">
                      Navegar por tópicos <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                </ScrollReveal>
                <ScrollReveal delay={0.1}>
                  <Link href="/estudo" className="block sola-card p-6 rounded-xl hover:shadow-lg transition-all group">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="font-display text-lg font-semibold group-hover:text-primary transition-colors">Métodos de Estudo</h3>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">
                      Guia prático com métodos hermenêuticos, memorização e devocionais para estudar com profundidade.
                    </p>
                    <span className="inline-flex items-center gap-1 text-xs text-primary font-medium">
                      Ver métodos <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                </ScrollReveal>
                <ScrollReveal delay={0.15}>
                  <Link href="/teologia" className="block sola-card p-6 rounded-xl hover:shadow-lg transition-all group">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                        <BookMarked className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="font-display text-lg font-semibold group-hover:text-primary transition-colors">Estudo por Livro</h3>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">
                      Seletor de livro com panorama, gênero, temas e versículos-chave — acesse pela aba &ldquo;Por Livro&rdquo;.
                    </p>
                    <button
                      onClick={(e) => { e.preventDefault(); setCategoriaAtiva('livros'); }}
                      className="inline-flex items-center gap-1 text-xs text-primary font-medium"
                    >
                      Ir para livros <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </Link>
                </ScrollReveal>
              </div>
            </div>
          )}

          {/* ═══ ESTUDOS TEOLÓGICOS ═══ */}
          {categoriaAtiva === 'teologicos' && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <GraduationCap className="w-5 h-5 text-primary" />
                <h2 className="font-display text-xl font-semibold">Estudos Teológicos por Versículo</h2>
                <span className="text-xs text-muted-foreground ml-2">{estudosTeologicos.length} versículos com estudo</span>
              </div>
              <div className="space-y-4">
                {estudosTeologicos.map((estudo, i) => {
                  const livroInfo = livroPorAbreviacao.get(estudo.livro);
                  return (
                    <ScrollReveal key={`${estudo.livro}:${estudo.capitulo}:${estudo.versiculo}`} delay={Math.min(i * 0.02, 0.3)}>
                      <div className="sola-card p-5 rounded-xl">
                        <div className="flex items-center gap-2 mb-2">
                          <Link
                            href={`/biblia?livro=${estudo.livro}&capitulo=${estudo.capitulo}`}
                            className="text-sm font-semibold text-primary hover:underline"
                          >
                            {livroInfo?.nome || estudo.livro} {estudo.capitulo}:{estudo.versiculo}
                          </Link>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                            {estudo.tema}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mb-3">{estudo.contexto}</p>
                        <div className="space-y-3">
                          {estudo.interpretacoes.map((interp, j) => (
                            <div key={j} className="pl-3 border-l-2 border-primary/20">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs font-semibold text-foreground">{interp.teologo}</span>
                                <span className="text-[10px] text-muted-foreground">({interp.periodo})</span>
                                <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground">{interp.tradicao}</span>
                              </div>
                              <p className="text-xs text-muted-foreground italic mb-1">{interp.citacao}</p>
                              <p className="text-xs text-foreground/70">{interp.resumo}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </ScrollReveal>
                  );
                })}
              </div>
            </div>
          )}

          {/* ═══ TEÓLOGOS ═══ */}
          {categoriaAtiva === 'teologos' && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-5 h-5 text-primary" />
                <h2 className="font-display text-xl font-semibold">Teólogos de Todas as Épocas</h2>
                <span className="text-xs text-muted-foreground ml-2">{teologos.length} teólogos</span>
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                <button
                  onClick={() => setPeriodoFilter('todos')}
                  className={`text-xs px-3 py-1.5 rounded-full transition-colors ${
                    periodoFilter === 'todos' ? 'bg-primary text-primary-foreground' : 'bg-card border border-border text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Todos
                </button>
                {Object.entries(PERIODOS_LABELS).map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => setPeriodoFilter(key)}
                    className={`text-xs px-3 py-1.5 rounded-full transition-colors ${
                      periodoFilter === key ? 'bg-primary text-primary-foreground' : 'bg-card border border-border text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {teologos.map((t, i) => {
                  const PeriodIcon = PERIODOS_ICONS[t.periodo] || BookOpen;
                  return (
                    <ScrollReveal key={t.slug} delay={Math.min(i * 0.02, 0.3)}>
                      <div className="sola-card p-4 rounded-xl hover:shadow-md transition-all">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                            <PeriodIcon className="w-5 h-5 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-display text-sm font-semibold">{t.nome}</h3>
                            <p className="text-[10px] text-muted-foreground">
                              {t.nascimento && t.morte ? `${t.nascimento}–${t.morte}` : PERIODOS_LABELS[t.periodo]}
                              {t.nacionalidade ? ` • ${t.nacionalidade}` : ''}
                            </p>
                            <p className="text-xs text-foreground/70 mt-1 line-clamp-3">{t.resumo}</p>
                            <div className="flex flex-wrap gap-1 mt-2">
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary">{t.tradicao}</span>
                              {t.obrasChave.slice(0, 2).map(obra => (
                                <span key={obra} className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground">{obra}</span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </ScrollReveal>
                  );
                })}
              </div>
            </div>
          )}

          {/* ═══ COMENTÁRIOS ═══ */}
          {categoriaAtiva === 'comentarios' && <ComentariosSection />}

          {/* ═══ MEUS ESTUDOS ═══ */}
          {categoriaAtiva === 'meusestudos' && (
            <div>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <Link href="/estudos" className="sola-card p-4 text-center hover:shadow-md transition-all">
                  <p className="font-display text-2xl font-light text-primary">{stats.total}</p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">Total</p>
                </Link>
                <Link href="/estudos" className="sola-card p-4 text-center hover:shadow-md transition-all">
                  <p className="font-display text-2xl font-light text-red-500">{stats.favoritos}</p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">Favoritos</p>
                </Link>
                <Link href="/estudos" className="sola-card p-4 text-center hover:shadow-md transition-all">
                  <p className="font-display text-2xl font-light text-amber-500">{stats.anotacoes}</p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">Anotações</p>
                </Link>
              </div>

              <div className="flex items-center gap-3 flex-wrap mb-4">
                <Link href="/flashcards" className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium border border-border/60 rounded-lg text-muted-foreground hover:text-foreground hover:border-border transition-all">
                  <BookMarked className="w-3.5 h-3.5" /> Flashcards
                </Link>
                <Link href="/biblia" className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium border border-border/60 rounded-lg text-muted-foreground hover:text-foreground hover:border-border transition-all">
                  <BookOpen className="w-3.5 h-3.5" /> Ir para a Bíblia
                </Link>
              </div>

              <div className="flex items-center gap-4 mb-4 flex-wrap">
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Buscar nos estudos..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full pl-9 pr-9 py-2.5 text-sm bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
                  />
                  {query && (
                    <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 hover:text-foreground transition-colors">
                      <X className="w-3.5 h-3.5 text-muted-foreground" />
                    </button>
                  )}
                </div>
                <div className="flex items-center gap-1.5">
                  <Filter className="w-3.5 h-3.5 text-muted-foreground" />
                  <select
                    value={filtroLivro}
                    onChange={(e) => setFiltroLivro(e.target.value)}
                    className="text-xs py-2 px-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 text-muted-foreground"
                  >
                    <option value="todos">Todos os livros</option>
                    {livrosUnicosFavoritos.map(l => (
                      <option key={l.slug} value={l.slug}>{l.nome}</option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center gap-1.5">
                  <ArrowUpDown className="w-3.5 h-3.5 text-muted-foreground" />
                  <select
                    value={ordenacao}
                    onChange={(e) => setOrdenacao(e.target.value as Ordenacao)}
                    className="text-xs py-2 px-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 text-muted-foreground"
                  >
                    <option value="recente">Mais recentes</option>
                    <option value="livro">Por livro (A–Z)</option>
                  </select>
                </div>
                {marcas.length > 0 && (
                  <div className="flex items-center gap-1">
                    <button onClick={() => exportToJson(filtradas)} className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium border border-border/60 rounded-lg text-muted-foreground hover:text-foreground hover:border-border transition-all">
                      <Bookmark className="w-3.5 h-3.5" /> JSON
                    </button>
                    <button onClick={() => exportToTxt(filtradas)} className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium border border-border/60 rounded-lg text-muted-foreground hover:text-foreground hover:border-border transition-all">
                      TXT
                    </button>
                    <button onClick={() => exportToCsv(filtradas)} className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium border border-border/60 rounded-lg text-muted-foreground hover:text-foreground hover:border-border transition-all">
                      CSV
                    </button>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 mb-6">
                {([
                  { id: 'todas' as const, label: 'Todas', icon: Bookmark, count: stats.total },
                  { id: 'favoritos' as const, label: 'Favoritos', icon: Heart, count: stats.favoritos },
                  { id: 'anotacoes' as const, label: 'Anotações', icon: StickyNote, count: stats.anotacoes },
                ]).map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setAba(t.id)}
                    className={`flex items-center gap-1.5 px-4 py-2 text-sm rounded-lg transition-all ${
                      aba === t.id
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground border border-border/60 hover:border-border'
                    }`}
                  >
                    <t.icon className="w-3.5 h-3.5" />
                    {t.label}
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full ml-1 ${aba === t.id ? 'bg-white/20' : 'bg-muted'}`}>
                      {t.count}
                    </span>
                  </button>
                ))}
              </div>

              {filtradas.length === 0 ? (
                <div className="sola-card p-12 text-center">
                  <BookOpen className="w-12 h-12 mx-auto text-muted-foreground/30 mb-4" strokeWidth={1} />
                  <p className="text-lg font-medium text-muted-foreground mb-2">
                    {marcas.length === 0 ? 'Nenhum estudo salvo' : 'Nenhum resultado encontrado'}
                  </p>
                  <p className="text-sm text-muted-foreground/70 max-w-sm mx-auto mb-6">
                    {marcas.length === 0
                      ? 'Favorite versículos ou adicione anotações durante a leitura da Bíblia para vê-los aqui.'
                      : 'Tente ajustar os filtros ou a busca.'}
                  </p>
                  {marcas.length === 0 && (
                    <Link href="/biblia" className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all hover:shadow-md">
                      <BookOpen className="w-4 h-4" /> Ir para a Bíblia <ArrowRight className="w-4 h-4" />
                    </Link>
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                  {filtradas.map((m, i) => {
                    const livro = livroPorAbreviacao.get(m.livro);
                    return (
                      <ScrollReveal key={`${m.livro}:${m.capitulo}:${m.versiculo}:${m.traducao}`} delay={Math.min(i * 0.03, 0.3)}>
                        <div className="sola-card p-5 rounded-xl hover:shadow-md transition-all group">
                          <div className="flex items-start gap-4">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-2 flex-wrap">
                                <Link href={`/biblia?livro=${m.livro}&capitulo=${m.capitulo}&trads=${m.traducao}`} className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors">
                                  {livro?.nome || m.livro} {m.capitulo}:{m.versiculo}
                                </Link>
                                <span className="text-[10px] px-2 py-0.5 bg-primary/10 text-primary rounded-full font-medium uppercase tracking-wider">{m.traducao}</span>
                                <span className="text-[10px] text-muted-foreground">{livro?.testamento || 'AT'}</span>
                                {m.favorito && <Heart className="w-3.5 h-3.5 text-red-500 fill-current" />}
                              </div>
                              <p className="text-sm text-foreground/80 font-serif-body leading-relaxed mb-1">{m.texto}</p>
                              {m.anotacao && (
                                <div className="mt-3 pt-3 border-t border-border/30">
                                  <div className="flex items-center gap-1.5 mb-1.5">
                                    <StickyNote className="w-3 h-3 text-amber-500" />
                                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">
                                      {new Date(m.anotacao.data).toLocaleDateString('pt-BR', { day: 'numeric', month: 'short', year: 'numeric' })}
                                    </span>
                                  </div>
                                  <p className="text-xs text-muted-foreground leading-relaxed bg-muted/30 rounded-lg p-2.5">{m.anotacao.texto}</p>
                                </div>
                              )}
                            </div>
                            <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button onClick={() => { toggleFavorito(m.livro, m.capitulo, m.versiculo, m.traducao, m.texto); carregar(); }}
                                className={`p-1.5 rounded-md transition-colors ${m.favorito ? 'text-red-500 bg-red-50 dark:bg-red-950/20' : 'text-muted-foreground hover:text-red-400 hover:bg-muted'}`}
                                title={m.favorito ? 'Remover favorito' : 'Favoritar'}>
                                <Heart className={`w-4 h-4 ${m.favorito ? 'fill-current' : ''}`} />
                              </button>
                              <button onClick={() => { removerMarca(m.livro, m.capitulo, m.versiculo, m.traducao); carregar(); }}
                                className="p-1.5 text-muted-foreground hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-md transition-colors" title="Remover">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </ScrollReveal>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

function ComentariosSection() {
  const [comentarios, setComentarios] = useState<Comentario[]>([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const todos = obterTodosComentarios();
    setComentarios(todos);
  }, []);

  const filtrados = useMemo(() => {
    if (!query.trim()) return comentarios.slice(0, 100);
    const q = query.toLowerCase();
    return comentarios.filter(c =>
      c.texto.toLowerCase().includes(q) ||
      c.autor.toLowerCase().includes(q) ||
      `${c.livro}${c.capitulo}:${c.versiculo}`.includes(q)
    ).slice(0, 100);
  }, [comentarios, query]);

  const autores = useMemo(() => [...new Set(comentarios.map(c => c.autor))].sort(), [comentarios]);

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Quote className="w-5 h-5 text-primary" />
        <h2 className="font-display text-xl font-semibold">Comentários Teológicos</h2>
        <span className="text-xs text-muted-foreground ml-2">{comentarios.length} comentários de {autores.length} autores</span>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Buscar por autor, texto ou referência..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 text-sm bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
        />
      </div>

      <div className="flex flex-wrap gap-1 mb-6">
        {autores.slice(0, 30).map(a => (
          <button key={a} onClick={() => setQuery(a)} className="text-[10px] px-2 py-1 rounded-full bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors">{a}</button>
        ))}
      </div>

      <div className="space-y-3">
        {filtrados.map((c, i) => {
          const livroInfo = livroPorAbreviacao.get(c.livro);
          return (
            <ScrollReveal key={`${c.livro}:${c.capitulo}:${c.versiculo}:${c.autor}:${i}`} delay={Math.min(i * 0.02, 0.3)}>
              <div className="sola-card p-4 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-semibold text-primary">{c.autor}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground capitalize">{c.tipo}</span>
                  <Link href={`/biblia?livro=${c.livro}&capitulo=${c.capitulo}`} className="text-[10px] text-muted-foreground hover:text-primary transition-colors ml-auto">
                    {livroInfo?.nome || c.livro} {c.capitulo}:{c.versiculo}
                  </Link>
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed italic">&ldquo;{c.texto}&rdquo;</p>
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </div>
  );
}
