'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { PageShell } from '@/components/layout/PageShell';
import { PageHero } from '@/components/layout/PageHero';
import ScrollReveal from '@/components/ScrollReveal';
import { BuscaGlobal } from '@/components/BuscaGlobal';
import {
  Search,
  BookOpen,
  Languages,
  GitBranch,
  Columns,
  Map,
  ListOrdered,
  FileText,
  Brain,
  Sparkles,
  MessageSquare,
  GraduationCap,
  BookMarked,
  Trophy,
  Users,
  Zap,
  Clock,
  ArrowRight,
  ChevronRight,
  History,
  Target,
  Flame,
  Network,
} from 'lucide-react';
import { TODOS_LIVROS } from '@/data/biblia/livros';
import dynamic from 'next/dynamic';

const CanonFichasProfundas = dynamic(() => import('@/components/CanonFichasProfundas'), { ssr: false });

interface RecentPage {
  path: string;
  title: string;
  timestamp: number;
}

const QUICK_TOOLS = [
  {
    href: '/biblia',
    title: 'Bíblia',
    description: '10 traduções com interlinear, karaoke e comentários inline',
    icon: BookOpen,
    tile: 'tile-brand',
  },
  {
    href: '/pesquisa',
    title: 'Pesquisa',
    description: 'Busca avançada com filtros semânticos e por livro',
    icon: Search,
    tile: 'tile-success',
  },
  {
    href: '/ferramentas/concordancia',
    title: 'Concordância',
    description: 'Encontre todas as ocorrências de uma palavra',
    icon: ListOrdered,
    tile: 'tile-cool',
  },
  {
    href: '/ferramentas/critica-textual',
    title: 'Crítica Textual',
    description: 'Variantes manuscritas e notas de rodapé',
    icon: FileText,
    tile: 'tile-warning',
  },
  {
    href: '/harmonia',
    title: 'Harmonia Sinótica',
    description: 'Mateus, Marcos, Lucas e João lado a lado',
    icon: Columns,
    tile: 'tile-warm',
  },
  {
    href: '/atlas',
    title: 'Atlas Bíblico',
    description: 'Mapas interativos com 20 locais históricos',
    icon: Map,
    tile: 'tile-success',
  },
  {
    href: '/idiomas',
    title: 'Léxico Grego & Hebraico',
    description: '5526 palavras gregas + 8674 hebraicas com Strong\'s',
    icon: Languages,
    tile: 'tile-info',
  },
  {
    href: '/referencias',
    title: 'Referências Cruzadas',
    description: '29k+ conexões entre versículos do AT e NT',
    icon: GitBranch,
    tile: 'tile-cool',
  },
  {
    href: '/guia',
    title: 'Guia da passagem',
    description: 'Ficha do capítulo, comentários clássicos, léxico e referências num só lugar',
    icon: FileText,
    tile: 'tile-warm',
  },
  {
    href: '/explorador',
    title: 'Explorador de Conceitos',
    description: 'Grafo interativo de pessoas, temas, lugares e eventos bíblicos',
    icon: Network,
    tile: 'tile-info',
  },
];

const IA_TOOLS = [
  {
    href: '/exegese',
    title: 'Exegese com IA',
    description: 'Análise exegeta automática de qualquer versículo',
    icon: Brain,
    tile: 'tile-brand',
  },
  {
    href: '/teologia',
    title: 'Estudo Temático',
    description: 'Teologia sistemática em 13 categorias',
    icon: Sparkles,
    tile: 'tile-warm',
  },
  {
    href: '/ia',
    title: 'Modo Socrático',
    description: 'Converse com IA sobre qualquer tema bíblico',
    icon: MessageSquare,
    tile: 'tile-info',
  },
];

const COURSE_TOOLS = [
  {
    href: '/estudos/academico',
    title: 'Cursos Acadêmicos',
    description: 'Estudos aprofundados com rigor teológico',
    icon: GraduationCap,
    tile: 'tile-cool',
  },
  {
    href: '/estudos/manuais',
    title: 'Manuais Bíblicos',
    description: 'Guias práticos de estudo por tema',
    icon: BookMarked,
    tile: 'tile-success',
  },
];

const QUIZ_TOOLS = [
  {
    href: '/quiz/classico',
    title: 'Quiz Diário',
    description: 'Teste seus conhecimentos bíblicos',
    icon: Target,
    tile: 'tile-warning',
  },
  {
    href: '/desafios',
    title: 'Desafios Comunitários',
    description: 'Progresso individual e ranking',
    icon: Trophy,
    tile: 'tile-brand',
  },
  {
    href: '/quiz/multiplayer',
    title: 'Quiz Multiplayer',
    description: 'Desafie amigos em tempo real',
    icon: Users,
    tile: 'tile-success',
  },
];

const STUDY_HISTORY_KEY = 'ssb_study_history';

function getRecentPages(): RecentPage[] {
  try {
    const raw = localStorage.getItem(STUDY_HISTORY_KEY);
    if (!raw) return [];
    const pages: RecentPage[] = JSON.parse(raw);
    return pages
      .sort((a, b) => b.timestamp - a.timestamp)
      .filter((p) => p.path !== '/estudar')
      .slice(0, 5);
  } catch {
    return [];
  }
}

function getTopStudiedBooks(): { nome: string; abreviacao: string; count: number }[] {
  try {
    const raw = localStorage.getItem('ssb_study_history');
    if (!raw) return [];
    const pages: RecentPage[] = JSON.parse(raw);
    const bookCounts: Record<string, number> = {};

    for (const page of pages) {
      const match = page.path.match(/^\/estudos\/([a-z0-9-]+)/);
      if (match) {
        const slug = match[1];
        bookCounts[slug] = (bookCounts[slug] || 0) + 1;
      }
    }

    return Object.entries(bookCounts)
      .map(([slug, count]) => {
        const livro = TODOS_LIVROS.find(
          (l) => l.abreviacao.toLowerCase() === slug || l.nome.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '') === slug
        );
        return {
          nome: livro?.nome || slug,
          abreviacao: livro?.abreviacao || slug,
          count,
        };
      })
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  } catch {
    return [];
  }
}

export default function EstudarPage() {
  const [buscaOpen, setBuscaOpen] = useState(false);
  const [recentPages, setRecentPages] = useState<RecentPage[]>([]);
  const [topBooks, setTopBooks] = useState<{ nome: string; abreviacao: string; count: number }[]>([]);

  useEffect(() => {
    setRecentPages(getRecentPages());
    setTopBooks(getTopStudiedBooks());
  }, []);

  const handleSearch = useCallback(() => {
    setBuscaOpen(true);
  }, []);

  return (
    <PageShell className="pt-6">
      <BuscaGlobal open={buscaOpen} onOpenChange={setBuscaOpen} />

        {/* Welcome Banner */}
        <ScrollReveal>
          <PageHero
            icon={GraduationCap}
            align="left"
            title="O que você quer estudar hoje?"
            subtitle="Ferramentas acadêmicas, estudos por livro e recursos para aprofundar as Escrituras."
          >
            <button
              onClick={handleSearch}
              className="flex items-center gap-3 w-full max-w-lg mt-6 py-3 border-b border-border hover:border-primary/50 transition-colors text-left group"
            >
              <Search className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              <span className="text-muted-foreground text-sm">Buscar versículos, estudos, personagens…</span>
            </button>
          </PageHero>
        </ScrollReveal>

        {/* Continuar Estudando */}
        {recentPages.length > 0 && (
          <ScrollReveal delay={0.1}>
            <section className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <History className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-semibold text-foreground">Continue de onde parou</h2>
              </div>
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {recentPages.map((page) => (
                  <Link
                    key={page.path}
                    href={page.path}
                    className="flex-shrink-0 flex items-center gap-3 px-4 py-3 rounded-xl border border-border bg-card hover:border-primary/50 hover:shadow-md transition-all duration-200 min-w-[200px] max-w-[280px]"
                  >
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-4 h-4 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{page.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(page.timestamp).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </ScrollReveal>
        )}

        <ScrollReveal delay={0.12}>
          <CanonFichasProfundas />
        </ScrollReveal>

        {/* Ferramentas Rápidas */}
        <ScrollReveal delay={0.15}>
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">Ferramentas Rápidas</h2>
            </div>
            <div className="divide-y divide-border">
              {QUICK_TOOLS.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="group flex items-start gap-4 py-3.5 first:pt-0 last:pb-0"
                >
                  <tool.icon className="w-4 h-4 mt-0.5 text-primary shrink-0" strokeWidth={1.5} />
                  <span className="min-w-0">
                    <span className="block text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                      {tool.title}
                    </span>
                    <span className="text-xs text-muted-foreground leading-relaxed">
                      {tool.description}
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* Estudos por Livro */}
        <ScrollReveal delay={0.2}>
          <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-semibold text-foreground">Estudos por Livro</h2>
              </div>
              <Link
                href="/estudos"
                className="flex items-center gap-1 text-sm text-primary hover:underline"
              >
                Ver todos
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {topBooks.length > 0
                ? topBooks.map((book) => (
                    <Link
                      key={book.abreviacao}
                      href={`/estudos/${book.abreviacao.toLowerCase()}`}
                      className="group flex flex-col items-center p-4 rounded-xl border border-border bg-card hover:border-primary/50 hover:shadow-md transition-all duration-200 text-center"
                    >
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                        <BookOpen className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-sm font-semibold text-foreground">{book.nome}</h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        {book.count} {book.count === 1 ? 'visualização' : 'visualizações'}
                      </p>
                    </Link>
                  ))
                : [
                    { nome: 'Gênesis', abrev: 'gn' },
                    { nome: 'Salmos', abrev: 'sl' },
                    { nome: 'João', abrev: 'jo' },
                    { nome: 'Romanos', abrev: 'rm' },
                    { nome: 'Efésios', abrev: 'ef' },
                  ].map((book) => (
                    <Link
                      key={book.abrev}
                      href={`/estudos/${book.abrev}`}
                      className="group flex flex-col items-center p-4 rounded-xl border border-border bg-card hover:border-primary/50 hover:shadow-md transition-all duration-200 text-center"
                    >
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                        <BookOpen className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-sm font-semibold text-foreground">{book.nome}</h3>
                    </Link>
                  ))}
            </div>
          </section>
        </ScrollReveal>

        {/* IA & Análise */}
        <ScrollReveal delay={0.25}>
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Brain className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">IA & Análise</h2>
            </div>
            <div className="divide-y divide-border">
              {IA_TOOLS.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="group flex items-start gap-4 py-3.5 first:pt-0 last:pb-0"
                >
                  <tool.icon className="w-4 h-4 mt-0.5 text-primary shrink-0" strokeWidth={1.5} />
                  <span className="min-w-0">
                    <span className="block text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                      {tool.title}
                    </span>
                    <span className="text-xs text-muted-foreground">{tool.description}</span>
                  </span>
                </Link>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* Cursos & Manuais */}
        <ScrollReveal delay={0.3}>
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <GraduationCap className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">Cursos & Manuais</h2>
            </div>
            <div className="divide-y divide-border">
              {COURSE_TOOLS.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="group flex items-start gap-4 py-3.5 first:pt-0 last:pb-0"
                >
                  <tool.icon className="w-4 h-4 mt-0.5 text-primary shrink-0" strokeWidth={1.5} />
                  <span className="min-w-0">
                    <span className="block text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                      {tool.title}
                    </span>
                    <span className="text-xs text-muted-foreground">{tool.description}</span>
                  </span>
                </Link>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* Desafios & Quiz */}
        <ScrollReveal delay={0.35}>
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Flame className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">Desafios & Quiz</h2>
            </div>
            <div className="divide-y divide-border">
              {QUIZ_TOOLS.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="group flex items-start gap-4 py-3.5 first:pt-0 last:pb-0"
                >
                  <tool.icon className="w-4 h-4 mt-0.5 text-primary shrink-0" strokeWidth={1.5} />
                  <span className="min-w-0">
                    <span className="block text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                      {tool.title}
                    </span>
                    <span className="text-xs text-muted-foreground">{tool.description}</span>
                  </span>
                </Link>
              ))}
            </div>
          </section>
        </ScrollReveal>
    </PageShell>
  );
}
