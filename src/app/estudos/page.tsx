'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { PageShell } from '@/components/layout/PageShell';
import { PageHero } from '@/components/layout/PageHero';
import { AcademicHero } from '@/components/AcademicHero';
import { hrefBiblia } from '@/lib/bibliaHref';
import {
  Heart, StickyNote, Bookmark, Search, X, BookOpen, Trash2, ArrowRight,
  GraduationCap, Users, Layers, Quote, ChevronRight, Star, Library,
  History, BookMarked, Sparkles, Filter, ArrowUpDown, Play,
} from 'lucide-react';
import { listarMarcas, removerMarca, toggleFavorito, type MarcaBiblia } from '@/lib/estudos';
import { livroPorAbreviacao, TODOS_LIVROS } from '@/data/biblia/livros';
import ScrollReveal from '@/components/ScrollReveal';
import { exportToJson, exportToTxt, exportToCsv } from '@/lib/exportarEstudos';
import { obterProgressoCursos } from '@/lib/cursoProgress';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { type Comentario } from '@/data/comentarios';
import type { EstudoVersiculo } from '@/data/estudosTeologicos';
import type { Teologo } from '@/data/teologos';
import { getStats } from '@/lib/estatisticas';
import dynamic from 'next/dynamic';
import { useTranslation } from 'react-i18next';
import { BannerTrilhasOficiais } from '@/components/cursos/BannerTrilhasOficiais';
import { temEstudo } from '@/data/estudos-index';

const BibleCourses = dynamic(() => import('@/components/BibleCourses').then(m => ({ default: m.BibleCourses })), {
  ssr: false,
  loading: () => <div className="sola-card p-6 animate-pulse"><div className="h-64 bg-muted/30 rounded-lg" /></div>,
});

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
  const { t } = useTranslation();
  const [categoriaAtiva, setCategoriaAtiva] = useState('livros');
  const [marcas, setMarcas] = useState<MarcaBiblia[]>([]);
  const [aba, setAba] = useState<'todas' | 'favoritos' | 'anotacoes' | 'cursos'>('todas');
  const [query, setQuery] = useState('');
  const [periodoFilter, setPeriodoFilter] = useState<string>('todos');

  // Personal study organization
  const [filtroLivro, setFiltroLivro] = useState<string>('todos');
  const [ordenacao, setOrdenacao] = useState<Ordenacao>('recente');

  // Continuar estudando (reading history)
  const [retomar, setRetomar] = useState<{ livro: string; titulo: string; capitulo: number } | null>(null);
  const [livrosLidos, setLivrosLidos] = useState<Record<string, number>>({});

  // Lazy-loaded data
  const [estudosPorLivro, setEstudosPorLivro] = useState<Record<string, { contexto: string; temasPrincipais: string[]; versiculosChave: Array<{ referencia: string; texto: string; explicacao: string }>; perguntasEstudo: string[] }>>({});
  const [obterEstudosFn, setObterEstudosFn] = useState<((livro: string, cap: number, ver: number) => EstudoVersiculo[]) | null>(null);
  const [listarTodosTeologosFn, setListarTodosTeologosFn] = useState<(() => Teologo[]) | null>(null);
  const [dadosCarregados, setDadosCarregados] = useState(false);

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
    } catch (e) { console.error('[estudos:load-stats]', e); }

    Promise.all([
      import('@/data/estudosPorLivro'),
      import('@/data/estudosTeologicos'),
      import('@/data/teologos'),
    ]).then(([estudosMod, teologicosMod, teologosMod]) => {
      setEstudosPorLivro(estudosMod.estudosPorLivro);
      setObterEstudosFn(() => teologicosMod.obterEstudos);
      setListarTodosTeologosFn(() => teologosMod.listarTodosTeologos);
      setDadosCarregados(true);
    });
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

  const [cursosMatriculados, setCursosMatriculados] = useState(0);

  useEffect(() => {
    const progresso = obterProgressoCursos();
    const count = Object.values(progresso).filter(p => p.matriculado).length;
    setCursosMatriculados(count);
  }, []);

  const stats = useMemo(() => ({
    total: marcas.length,
    favoritos: marcas.filter((m) => m.favorito).length,
    anotacoes: marcas.filter((m) => m.anotacao).length,
  }), [marcas]);

  const livrosComEstudo = useMemo(() => {
    if (!dadosCarregados) return [];
    // Mapear abreviacoes para slugs de paginas hardcoded quando existem
    const PAGINAS_DEDICADAS: Record<string, string> = {
      gn: 'genesis',
      sl: 'salmos',
      pv: 'proverbios',
      jo: 'joao',
      at: 'atos',
      rm: 'romanos',
      '1co': '1corintios',
      ef: 'efesios',
      fp: 'filipenses',
      ap: 'apocalipse',
    };
    return Object.keys(estudosPorLivro).map(slug => {
      const info = livroPorAbreviacao.get(slug);
      const paginaDedicada = PAGINAS_DEDICADAS[slug];
      return {
        slug,
        titulo: info?.nome || slug,
        estudo: estudosPorLivro[slug],
        testamento: info?.testamento || 'AT',
        href: paginaDedicada ? `/estudos/${paginaDedicada}` : `/estudos/${slug}`,
      };
    }).sort((a, b) => a.titulo.localeCompare(b.titulo, 'pt-BR'));
  }, [estudosPorLivro, dadosCarregados]);

  const livrosEstudoFiltrados = useMemo(() => {
    if (!query.trim()) return livrosComEstudo;
    const q = query.toLowerCase();
    return livrosComEstudo.filter(l =>
      l.titulo.toLowerCase().includes(q) ||
      l.estudo.temasPrincipais.some(tema => tema.toLowerCase().includes(q))
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
    if (!listarTodosTeologosFn) return [];
    const todos = listarTodosTeologosFn();
    if (periodoFilter === 'todos') return todos;
    return todos.filter(teologo => teologo.periodo === periodoFilter);
  }, [periodoFilter, listarTodosTeologosFn]);

  const estudosTeologicos = useMemo(() => {
    if (!obterEstudosFn) return [];
    // Usar indice leve para buscar apenas versiculos que tem estudo (126 keys)
    // em vez de iterar 495.000 combinacoes possiveis
    const estudos: EstudoVersiculo[] = [];
    const seen = new Set<string>();
    
    // Iterar apenas sobre os livros que tem estudos
    for (const livro of TODOS_LIVROS) {
      for (let cap = 1; cap <= livro.totalCapitulos; cap++) {
        // Verificar rapidamente se algum versiculo deste capitulo tem estudo
        let capituloTemEstudo = false;
        for (let v = 1; v <= 50; v++) {
          if (temEstudo(livro.abreviacao, cap, v)) {
            capituloTemEstudo = true;
            break;
          }
        }
        if (!capituloTemEstudo) continue;
        
        // So buscar estudos para versiculos que tem estudo
        for (let v = 1; v <= 50; v++) {
          const key = `${livro.abreviacao}:${cap}:${v}`;
          if (seen.has(key)) continue;
          if (!temEstudo(livro.abreviacao, cap, v)) continue;
          const e = obterEstudosFn(livro.abreviacao, cap, v);
          if (e.length > 0) {
            seen.add(key);
            estudos.push(...e);
          }
        }
      }
    }
    return estudos;
  }, [obterEstudosFn]);

  const catLabelMap: Record<string, string> = {
    livros: t('estudos.byBook'),
    temas: t('estudos.byTheme'),
    teologicos: t('estudos.theologicalStudies'),
    teologos: t('estudos.theologians'),
    comentarios: t('estudos.commentaries'),
    meusestudos: t('estudos.myStudies'),
  };

  const periodoTKeys: Record<string, string> = {
    patristico: 'estudos.periodoPatristico',
    escolastico: 'estudos.periodoEscolastico',
    reforma: 'estudos.periodoReforma',
    'pos-reforma': 'estudos.periodoPosReforma',
    modernos: 'estudos.periodoModernos',
    contemporaneos: 'estudos.periodoContemporaneos',
  };

  return (
    <PageShell maxWidth="6xl">
          <div className="mb-6">
            <Breadcrumbs items={[{ label: t('estudos.breadcrumbHome'), href: '/' }, { label: t('estudos.breadcrumbEstudos') }]} />
          </div>

          <AcademicHero
            icon={GraduationCap}
            title={t('estudos.title')}
            subtitle={t('estudos.subtitle')}
            author="Sola Scriptura BR"
            period="Todas as épocas"
            difficulty="Seminário"
            tags={['Exegese', 'Teologia Sistemática', 'Comentários', 'Pais da Igreja', 'Reforma']}
            align="center"
          >
            <div className="flex items-center gap-3 mt-6 flex-wrap justify-center">
              <Link href="/estudos/academico" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-400/15 border border-amber-400/20 text-sm font-medium text-amber-300 hover:border-amber-400/40 transition-all">
                <GraduationCap className="w-4 h-4" />
                Estudos Acadêmicos — Nível Seminário
                <ChevronRight className="w-4 h-4" />
              </Link>
              <Link href="/cursos" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 border border-white/10 text-sm font-medium text-white/70 hover:border-white/20 hover:text-white/90 transition-all">
                <Play className="w-4 h-4" />
                Cursos com Diploma
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </AcademicHero>

          {/* ═══ FILTROS ACADÊMICOS ═══ */}
          <ScrollReveal delay={0.05}>
            <div className="mb-8">
              <p className="text-xs font-semibold tracking-wider uppercase text-muted-foreground mb-3">{t('estudos.exploreByFeeling')}</p>
              <div className="flex flex-wrap gap-2">
                {[
                  { query: 'exegese', label: 'Exegese', color: 'bg-blue-500/10 text-blue-600 hover:bg-blue-500/20' },
                  { query: 'teologia sistemática', label: 'Teologia Sistemática', color: 'bg-purple-500/10 text-purple-600 hover:bg-purple-500/20' },
                  { query: 'contexto histórico', label: 'Contexto Histórico', color: 'bg-amber-500/10 text-amber-600 hover:bg-amber-500/20' },
                  { query: 'crítica textual', label: 'Crítica Textual', color: 'bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20' },
                ].map(filtro => (
                  <button
                    key={filtro.query}
                    onClick={() => setQuery(filtro.query)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${filtro.color}`}
                  >
                    {filtro.label}
                  </button>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* ═══ NÍVEIS DE DIFICULDADE ═══ */}
          <ScrollReveal delay={0.08}>
            <div className="mb-8">
              <p className="text-xs font-semibold tracking-wider uppercase text-muted-foreground mb-3">{t('estudos.difficultyLevels')}</p>
              <div className="flex flex-wrap gap-2">
                {[
                  { level: 'iniciante', label: 'Iniciante', dots: 1, color: 'bg-green-500/10 text-green-600 border-green-500/20' },
                  { level: 'intermediario', label: 'Intermediário', dots: 2, color: 'bg-blue-500/10 text-blue-600 border-blue-500/20' },
                  { level: 'avancado', label: 'Avançado', dots: 3, color: 'bg-amber-500/10 text-amber-600 border-amber-500/20' },
                  { level: 'seminario', label: 'Seminário', dots: 4, color: 'bg-red-500/10 text-red-600 border-red-500/20' },
                ].map(nivel => (
                  <div
                    key={nivel.level}
                    className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold border ${nivel.color}`}
                  >
                    <div className="flex gap-0.5">
                      {Array.from({ length: 4 }, (_, i) => (
                        <span key={i} className={`w-1.5 h-1.5 rounded-full ${i < nivel.dots ? 'bg-current' : 'bg-current/20'}`} />
                      ))}
                    </div>
                    {nivel.label}
                  </div>
                ))}
              </div>
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
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">{t('estudos.continueStudying')}</p>
                      <p className="font-display text-lg font-semibold truncate">
                        {t('estudos.resumeIn')} {retomar.titulo}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {livrosLidos[retomar.livro]} {livrosLidos[retomar.livro] === 1 ? t('estudos.chapter') : t('estudos.chapters')} {t('estudos.chaptersRead')}
                      </p>
                    </div>
                  </div>
                  <Link
                    href={hrefBiblia(retomar.livro, retomar.capitulo)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all hover:shadow-md shrink-0"
                  >
                    <Play className="w-4 h-4" /> {t('estudos.openReading')}
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          )}

          {/* Cursos CTA — dois diplomas, sem misturar */}
          <div className="grid sm:grid-cols-2 gap-3 mb-4">
            <Link href="/cursos" className="block">
              <div className="glass-card-3d gradient-border shine-effect p-4 rounded-xl cursor-pointer group min-h-[44px]">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <GraduationCap className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-sm">{t('estudos.freeSeminary')}</h3>
                    <p className="text-xs text-[var(--content-muted)]">{t('estudos.freeSeminaryDesc')}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-[var(--content-muted)] group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
            <Link href="/seminario" className="block">
              <div className="glass-card p-4 rounded-xl border border-border/60 cursor-pointer group hover:border-primary/35 transition-all min-h-[44px]">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-sm">{t('estudos.introCourses')}</h3>
                    <p className="text-xs text-[var(--content-muted)]">{t('estudos.introCoursesDesc')}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-[var(--content-muted)] group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          </div>

          {/* Donation CTA */}
          <Link href="/ofertas" className="block mb-6">
            <div className="glass-card p-4 rounded-xl border border-amber-500/20 bg-gradient-to-r from-amber-500/5 to-transparent cursor-pointer group hover:border-amber-500/30 transition-all">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0">
                  <Heart className="w-5 h-5 text-amber-500 fill-amber-500/30" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{t('estudos.supportProject')}</p>
                  <p className="text-xs text-muted-foreground">{t('estudos.supportDesc')}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-amber-500/60 group-hover:translate-x-1 transition-transform shrink-0" />
              </div>
            </div>
          </Link>

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
                    {catLabelMap[cat.id]}
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
                <h2 className="font-display text-xl font-semibold">{t('estudos.sectionByBook')}</h2>
                <span className="text-xs text-muted-foreground ml-2">{livrosComEstudo.length} {t('estudos.booksAvailable')}</span>
              </div>

              <div className="relative mb-6 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder={t('estudos.search')}
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
              {test === 'AT' ? t('estudos.oldTestament') : t('estudos.newTestament')}
              <span className="text-[10px] bg-muted px-2 py-0.5 rounded-full">{lista.length}</span>
            </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {lista.map((l, i) => {
                        // Gradiente baseado no testamento
                        const gradient = l.testamento === 'AT'
                          ? 'from-amber-500/20 via-orange-500/10 to-transparent'
                          : 'from-emerald-500/20 via-teal-500/10 to-transparent';
                        const accentColor = l.testamento === 'AT' ? 'text-amber-600 dark:text-amber-400' : 'text-emerald-600 dark:text-emerald-400';
                        return (
                          <ScrollReveal key={l.slug} delay={Math.min(i * 0.02, 0.3)}>
                            <Link
                              href={l.href}
                              className="block sola-card rounded-xl overflow-hidden hover:shadow-lg transition-all group"
                            >
                              {/* Header com gradiente — BibleProject style */}
                              <div className={`h-20 bg-gradient-to-br ${gradient} flex items-center justify-center relative`}>
                                <span className={`font-display text-3xl font-light ${accentColor} opacity-60`}>
                                  {l.slug.toUpperCase().slice(0, 3)}
                                </span>
                                <div className="absolute bottom-2 right-3">
                                  <span className="text-[9px] px-2 py-0.5 rounded-full bg-black/10 dark:bg-white/10 font-medium uppercase tracking-wider">
                                    {l.testamento}
                                  </span>
                                </div>
                              </div>
                              <div className="p-4">
                                <div className="flex items-start justify-between mb-2">
                                  <h4 className="font-display text-base font-semibold group-hover:text-primary transition-colors">{l.titulo}</h4>
                                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0" />
                                </div>
                                <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                                  {l.estudo.contexto}
                                </p>
                                <div className="flex flex-wrap gap-1">
                                  {l.estudo.temasPrincipais.slice(0, 3).map(tema => (
                                    <span key={tema} className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary">{tema}</span>
                                  ))}
                                </div>
                                <div className="mt-3 pt-2 border-t border-border/30 flex items-center gap-3 text-[10px] text-muted-foreground">
                                  <span>{l.estudo.versiculosChave.length} {t('estudos.keyVerses')}</span>
                                  <span>•</span>
                                  <span>{l.estudo.perguntasEstudo.length} {t('estudos.questions')}</span>
                                </div>
                              </div>
                            </Link>
                          </ScrollReveal>
                        );
                      })}
                    </div>
                  </div>
                );
              })}

              {livrosEstudoFiltrados.length === 0 && (
                <div className="sola-card p-12 text-center">
                  <BookOpen className="w-12 h-12 mx-auto text-muted-foreground/30 mb-4" strokeWidth={1} />
                  <p className="text-muted-foreground">{t('estudos.noBookFound')} &ldquo;{query}&rdquo;.</p>
                </div>
              )}
            </div>
          )}

          {/* ═══ POR TEMA / TIPO ═══ */}
          {categoriaAtiva === 'temas' && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Layers className="w-5 h-5 text-primary" />
                <h2 className="font-display text-xl font-semibold">{t('estudos.thematicStudies')}</h2>
              </div>
              <p className="text-sm text-muted-foreground mb-6">
                {t('estudos.thematicDesc')}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <ScrollReveal>
                  <Link href="/teologia" className="block sola-card p-6 rounded-xl hover:shadow-lg transition-all group">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                        <GraduationCap className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="font-display text-lg font-semibold group-hover:text-primary transition-colors">{t('estudos.systematicTheology')}</h3>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">
                      {t('estudos.systematicTheologyDesc')}
                    </p>
                    <span className="inline-flex items-center gap-1 text-xs text-primary font-medium">
                      {t('estudos.exploreDoctrines')} <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                </ScrollReveal>
                <ScrollReveal delay={0.05}>
                  <Link href="/topicos" className="block sola-card p-6 rounded-xl hover:shadow-lg transition-all group">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Layers className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="font-display text-lg font-semibold group-hover:text-primary transition-colors">{t('estudos.theologicalTopics')}</h3>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">
                      {t('estudos.theologicalTopicsDesc')}
                    </p>
                    <span className="inline-flex items-center gap-1 text-xs text-primary font-medium">
                      {t('estudos.browseTopics')} <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                </ScrollReveal>
                <ScrollReveal delay={0.1}>
                  <Link href="/estudo" className="block sola-card p-6 rounded-xl hover:shadow-lg transition-all group">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="font-display text-lg font-semibold group-hover:text-primary transition-colors">{t('estudos.studyMethods')}</h3>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">
                      {t('estudos.studyMethodsDesc')}
                    </p>
                    <span className="inline-flex items-center gap-1 text-xs text-primary font-medium">
                      {t('estudos.viewMethods')} <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                </ScrollReveal>
                <ScrollReveal delay={0.15}>
                  <Link href="/teologia" className="block sola-card p-6 rounded-xl hover:shadow-lg transition-all group">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                        <BookMarked className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="font-display text-lg font-semibold group-hover:text-primary transition-colors">{t('estudos.bookStudy')}</h3>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">
                      {t('estudos.bookStudyDesc')}
                    </p>
                    <button
                      onClick={(e) => { e.preventDefault(); setCategoriaAtiva('livros'); }}
                      className="inline-flex items-center gap-1 text-xs text-primary font-medium"
                    >
                      {t('estudos.goToBooks')} <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
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
                <h2 className="font-display text-xl font-semibold">{t('estudos.verseStudies')}</h2>
                <span className="text-xs text-muted-foreground ml-2">{estudosTeologicos.length} {t('estudos.versesWithStudy')}</span>
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
                              <p className="text-xs text-muted-foreground italic mb-1">
                                {interp.citacaoFonte === 'resumo' ? (
                                  <><span className="text-muted-foreground/60 not-italic">Paráfrase: </span>{interp.citacao.replace(/[«»]/g, '')}</>
                                ) : (
                                  interp.citacao
                                )}
                              </p>
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
                <h2 className="font-display text-xl font-semibold">{t('estudos.allTheologians')}</h2>
                <span className="text-xs text-muted-foreground ml-2">{teologos.length} {t('estudos.theologiansCount')}</span>
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                <button
                  onClick={() => setPeriodoFilter('todos')}
                  className={`text-xs px-3 py-1.5 rounded-full transition-colors ${
                    periodoFilter === 'todos' ? 'bg-primary text-primary-foreground' : 'bg-card border border-border text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {t('estudos.all')}
                </button>
                {Object.entries(PERIODOS_LABELS).map(([key]) => (
                  <button
                    key={key}
                    onClick={() => setPeriodoFilter(key)}
                    className={`text-xs px-3 py-1.5 rounded-full transition-colors ${
                      periodoFilter === key ? 'bg-primary text-primary-foreground' : 'bg-card border border-border text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {t(periodoTKeys[key])}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {teologos.map((teologo, i) => {
                  const PeriodIcon = PERIODOS_ICONS[teologo.periodo] || BookOpen;
                  return (
                    <ScrollReveal key={teologo.slug} delay={Math.min(i * 0.02, 0.3)}>
                      <div className="sola-card p-4 rounded-xl hover:shadow-md transition-all">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                            <PeriodIcon className="w-5 h-5 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-display text-sm font-semibold">{teologo.nome}</h3>
                            <p className="text-[10px] text-muted-foreground">
                              {teologo.nascimento && teologo.morte ? `${teologo.nascimento}–${teologo.morte}` : t(periodoTKeys[teologo.periodo])}
                              {teologo.nacionalidade ? ` • ${teologo.nacionalidade}` : ''}
                            </p>
                            <p className="text-xs text-foreground/70 mt-1 line-clamp-3">{teologo.resumo}</p>
                            <div className="flex flex-wrap gap-1 mt-2">
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary">{teologo.tradicao}</span>
                              {teologo.obrasChave.slice(0, 2).map(obra => (
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
              <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-6">
                <Link href="/estudos" className="sola-card p-4 text-center hover:shadow-md transition-all">
                  <p className="font-display text-2xl font-light text-primary">{stats.total}</p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">{t('estudos.total')}</p>
                </Link>
                <Link href="/estudos" className="sola-card p-4 text-center hover:shadow-md transition-all">
                  <p className="font-display text-2xl font-light text-red-500">{stats.favoritos}</p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">{t('estudos.favorites')}</p>
                </Link>
                <Link href="/estudos" className="sola-card p-4 text-center hover:shadow-md transition-all">
                  <p className="font-display text-2xl font-light text-amber-500">{stats.anotacoes}</p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">{t('estudos.annotations')}</p>
                </Link>
              </div>

              <div className="flex items-center gap-3 flex-wrap mb-4">
                <Link href="/flashcards" className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium border border-border/60 rounded-lg text-muted-foreground hover:text-foreground hover:border-border transition-all">
                  <BookMarked className="w-3.5 h-3.5" /> Flashcards
                </Link>
                <Link href="/biblia" className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium border border-border/60 rounded-lg text-muted-foreground hover:text-foreground hover:border-border transition-all">
                  <BookOpen className="w-3.5 h-3.5" /> {t('estudos.goToBible')}
                </Link>
              </div>

              <div className="flex items-center gap-4 mb-4 flex-wrap">
                <div className="relative flex-1 min-w-0 sm:min-w-[200px]">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder={t('estudos.searchStudies')}
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
                    <option value="todos">{t('estudos.allBooks')}</option>
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
                    <option value="recente">{t('estudos.newest')}</option>
                    <option value="livro">{t('estudos.byBookAZ')}</option>
                  </select>
                </div>
                {marcas.length > 0 && (
                  <div className="flex items-center gap-1">
                    <button onClick={() => exportToJson(filtradas)} className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium border border-border/60 rounded-lg text-muted-foreground hover:text-foreground hover:border-border transition-all">
                      <Bookmark className="w-3.5 h-3.5" /> {t('estudos.json')}
                    </button>
                    <button onClick={() => exportToTxt(filtradas)} className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium border border-border/60 rounded-lg text-muted-foreground hover:text-foreground hover:border-border transition-all">
                      {t('estudos.txt')}
                    </button>
                    <button onClick={() => exportToCsv(filtradas)} className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium border border-border/60 rounded-lg text-muted-foreground hover:text-foreground hover:border-border transition-all">
                      {t('estudos.csv')}
                    </button>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 mb-6">
                {([
                  { id: 'todas' as const, label: t('estudos.tabAll'), icon: Bookmark, count: stats.total },
                  { id: 'favoritos' as const, label: t('estudos.tabFavorites'), icon: Heart, count: stats.favoritos },
                  { id: 'anotacoes' as const, label: t('estudos.tabNotes'), icon: StickyNote, count: stats.anotacoes },
                  { id: 'cursos' as const, label: t('estudos.tabCourses'), icon: GraduationCap, count: cursosMatriculados },
                ]).map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setAba(tab.id)}
                    className={`flex items-center gap-1.5 px-4 py-2 text-sm rounded-lg transition-all ${
                      aba === tab.id
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground border border-border/60 hover:border-border'
                    }`}
                  >
                    <tab.icon className="w-3.5 h-3.5" />
                    {tab.label}
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full ml-1 ${aba === tab.id ? 'bg-white/20' : 'bg-muted'}`}>
                      {tab.count}
                    </span>
                  </button>
                ))}
              </div>

              {aba === 'cursos' ? (
                <div className="space-y-4">
                  <BannerTrilhasOficiais compact />
                  <p className="text-xs text-muted-foreground">
                    Abaixo: cursos introdutórios com vídeo e quiz. O diploma deles não é o das trilhas João e Romanos.
                  </p>
                  <div className="sola-card overflow-hidden min-h-[400px] md:min-h-[700px]">
                    <BibleCourses />
                  </div>
                </div>
              ) : filtradas.length === 0 ? (
                <div className="sola-card p-12 text-center">
                  <BookOpen className="w-12 h-12 mx-auto text-muted-foreground/30 mb-4" strokeWidth={1} />
                  <p className="text-lg font-medium text-muted-foreground mb-2">
                    {marcas.length === 0 ? t('estudos.noSavedStudy') : t('estudos.noResult')}
                  </p>
                  <p className="text-sm text-muted-foreground/70 max-w-sm mx-auto mb-6">
                    {marcas.length === 0
                      ? t('estudos.emptyDesc')
                      : t('estudos.adjustFilters')}
                  </p>
                  {marcas.length === 0 && (
                    <Link href="/biblia" className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all hover:shadow-md">
                      <BookOpen className="w-4 h-4" /> {t('estudos.goToBible')} <ArrowRight className="w-4 h-4" />
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
                                <Link href={hrefBiblia(m.livro, m.capitulo, m.versiculo, [m.traducao])} className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors">
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
                                  <Link
                                    href={`/notas?nota=verse:${m.livro}:${m.capitulo}:${m.versiculo}:${m.traducao}`}
                                    className="inline-flex items-center gap-1 mt-2 text-[10px] font-medium text-primary hover:underline"
                                  >
                                    Abrir em Notas
                                  </Link>
                                </div>
                              )}
                            </div>
                            <div className="flex items-center gap-1 shrink-0 sm:opacity-0 sm:group-hover:opacity-100 opacity-100 transition-opacity">
                              <button onClick={() => { toggleFavorito(m.livro, m.capitulo, m.versiculo, m.traducao, m.texto); carregar(); }}
                                className={`p-1.5 rounded-md transition-colors ${m.favorito ? 'text-red-500 bg-red-50 dark:bg-red-950/20' : 'text-muted-foreground hover:text-red-400 hover:bg-muted'}`}
                                title={m.favorito ? t('estudos.removeFavorite') : t('estudos.addFavorite')}>
                                <Heart className={`w-4 h-4 ${m.favorito ? 'fill-current' : ''}`} />
                              </button>
                              <button onClick={() => { removerMarca(m.livro, m.capitulo, m.versiculo, m.traducao); carregar(); }}
                                className="p-1.5 text-muted-foreground hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-md transition-colors" title={t('estudos.remove')}>
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

          {/* ═══ LEITURAS RECOMENDADAS ═══ */}
          <ScrollReveal delay={0.2}>
            <div className="mt-12 mb-8">
              <div className="flex items-center gap-2 mb-6">
                <Library className="w-5 h-5 text-primary" />
                <h2 className="font-display text-xl font-semibold">Leituras Recomendadas</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  {
                    titulo: 'Institutas da Religião Cristã',
                    autor: 'João Calvino',
                    descricao: 'A suma teológica mais influente da Reforma — o conhecimento de Deus e de nós mesmos.',
                    href: '/biblioteca/calvino-institutas',
                    cor: 'from-indigo-500/15 to-indigo-500/5',
                    icon: BookOpen,
                  },
                  {
                    titulo: 'O Peregrino',
                    autor: 'John Bunyan',
                    descricao: 'A alegoria da vida cristã mais lida da história — da Cidade da Destruição à Cidade Celestial.',
                    href: '/biblioteca/peregrino',
                    cor: 'from-amber-500/15 to-amber-500/5',
                    icon: BookMarked,
                  },
                  {
                    titulo: 'Catecismo de Westminster',
                    autor: 'Assembleia de Westminster',
                    descricao: '107 perguntas e respostas — "o fim principal do homem é glorificar a Deus e gozá-lo para sempre".',
                    href: '/biblioteca/catecismo-menor-westminster',
                    cor: 'from-emerald-500/15 to-emerald-500/5',
                    icon: GraduationCap,
                  },
                  {
                    titulo: 'A Liberdade do Cristão',
                    autor: 'Martinho Lutero',
                    descricao: 'O cristão é senhor livre de todas as coisas e servo de todas — pela fé e pelo amor.',
                    href: '/biblioteca/lutero-liberdade',
                    cor: 'from-red-500/15 to-red-500/5',
                    icon: BookOpen,
                  },
                  {
                    titulo: 'Confissões de Agostinho',
                    autor: 'Santo Agostinho',
                    descricao: 'A primeira autobiografia espiritual da história — "fizeste-nos para ti, e inquieto está o nosso coração".',
                    href: '/biblioteca/agostinho-confissoes',
                    cor: 'from-purple-500/15 to-purple-500/5',
                    icon: BookOpen,
                  },
                  {
                    titulo: 'Sermões de Spurgeon',
                    autor: 'Charles H. Spurgeon',
                    descricao: 'O Príncipe dos Pregadores — eloquência e ortodoxia reformada em sua forma mais poderosa.',
                    href: '/biblioteca/spurgeon-sermoes',
                    cor: 'from-sky-500/15 to-sky-500/5',
                    icon: Quote,
                  },
                ].map((leitura, i) => {
                  const Icon = leitura.icon;
                  return (
                    <ScrollReveal key={leitura.titulo} delay={0.25 + i * 0.03}>
                      <Link href={leitura.href} className="block group">
                        <div className={`sola-card rounded-xl overflow-hidden hover:shadow-lg transition-all h-full`}>
                          <div className={`h-16 bg-gradient-to-br ${leitura.cor} flex items-center justify-center`}>
                            <Icon className="w-6 h-6 text-primary/60" strokeWidth={1.4} />
                          </div>
                          <div className="p-4">
                            <h3 className="font-display text-sm font-semibold mb-1 group-hover:text-primary transition-colors">{leitura.titulo}</h3>
                            <p className="text-[10px] text-muted-foreground mb-2">{leitura.autor}</p>
                            <p className="text-xs text-foreground/60 line-clamp-2">{leitura.descricao}</p>
                            <span className="inline-flex items-center gap-1 mt-3 text-[10px] font-medium text-primary">
                              Ler agora <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                            </span>
                          </div>
                        </div>
                      </Link>
                    </ScrollReveal>
                  );
                })}
              </div>
            </div>
          </ScrollReveal>
        </PageShell>
  );
}

function ComentariosSection() {
  const { t } = useTranslation();
  const [comentarios, setComentarios] = useState<Comentario[]>([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    import('@/data/comentarios').then(mod => {
      setComentarios(mod.obterTodosComentarios());
      setLoading(false);
    });
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
        <h2 className="font-display text-xl font-semibold">{t('estudos.theologicalComments')}</h2>
        <span className="text-xs text-muted-foreground ml-2">{comentarios.length} {t('estudos.commentsCount')} {autores.length} {t('estudos.commentsAuthors')}</span>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder={t('estudos.searchByAuthor')}
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
        {loading ? (
          <div className="text-center py-8 text-muted-foreground text-sm">{t('estudos.loading')}</div>
        ) : filtrados.map((c, i) => {
          const livroInfo = livroPorAbreviacao.get(c.livro);
          return (
            <ScrollReveal key={`${c.livro}:${c.capitulo}:${c.versiculo}:${c.autor}:${i}`} delay={Math.min(i * 0.02, 0.3)}>
              <div className="sola-card p-4 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-semibold text-primary">{c.autor}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground capitalize">{c.tipo}</span>
                  <Link href={hrefBiblia(c.livro, c.capitulo, c.versiculo)} className="text-[10px] text-muted-foreground hover:text-primary transition-colors ml-auto">
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
