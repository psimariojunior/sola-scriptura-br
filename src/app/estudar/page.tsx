'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
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
} from 'lucide-react';
import { TODOS_LIVROS } from '@/data/biblia/livros';

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
    color: 'from-blue-500/15 to-blue-600/15',
    iconColor: 'text-blue-500 dark:text-blue-400',
  },
  {
    href: '/pesquisa',
    title: 'Pesquisa',
    description: 'Busca avançada com filtros semânticos e por livro',
    icon: Search,
    color: 'from-emerald-500/15 to-emerald-600/15',
    iconColor: 'text-emerald-500 dark:text-emerald-400',
  },
  {
    href: '/ferramentas/concordancia',
    title: 'Concordância',
    description: 'Encontre todas as ocorrências de uma palavra',
    icon: ListOrdered,
    color: 'from-violet-500/15 to-violet-600/15',
    iconColor: 'text-violet-500 dark:text-violet-400',
  },
  {
    href: '/ferramentas/critica-textual',
    title: 'Crítica Textual',
    description: 'Variantes manuscritas e notas de rodapé',
    icon: FileText,
    color: 'from-amber-500/15 to-amber-600/15',
    iconColor: 'text-amber-500 dark:text-amber-400',
  },
  {
    href: '/harmonia',
    title: 'Harmonia Sinótica',
    description: 'Mateus, Marcos, Lucas e João lado a lado',
    icon: Columns,
    color: 'from-rose-500/15 to-rose-600/15',
    iconColor: 'text-rose-500 dark:text-rose-400',
  },
  {
    href: '/atlas',
    title: 'Atlas Bíblico',
    description: 'Mapas interativos com 20 locais históricos',
    icon: Map,
    color: 'from-teal-500/15 to-teal-600/15',
    iconColor: 'text-teal-500 dark:text-teal-400',
  },
  {
    href: '/idiomas',
    title: 'Léxico Grego & Hebraico',
    description: '5526 palavras gregas + 8674 hebraicas com Strong\'s',
    icon: Languages,
    color: 'from-cyan-500/15 to-cyan-600/15',
    iconColor: 'text-cyan-500 dark:text-cyan-400',
  },
  {
    href: '/referencias',
    title: 'Referências Cruzadas',
    description: '29k+ conexões entre versículos do AT e NT',
    icon: GitBranch,
    color: 'from-indigo-500/15 to-indigo-600/15',
    iconColor: 'text-indigo-500 dark:text-indigo-400',
  },
];

const IA_TOOLS = [
  {
    href: '/exegese',
    title: 'Exegese com IA',
    description: 'Análise exegeta automática de qualquer versículo',
    icon: Brain,
    color: 'from-purple-500/15 to-purple-600/15',
    iconColor: 'text-purple-500 dark:text-purple-400',
  },
  {
    href: '/teologia',
    title: 'Estudo Temático',
    description: 'Teologia sistemática em 13 categorias',
    icon: Sparkles,
    color: 'from-pink-500/15 to-pink-600/15',
    iconColor: 'text-pink-500 dark:text-pink-400',
  },
  {
    href: '/ia',
    title: 'Modo Socrático',
    description: 'Converse com IA sobre qualquer tema bíblico',
    icon: MessageSquare,
    color: 'from-orange-500/15 to-orange-600/15',
    iconColor: 'text-orange-500 dark:text-orange-400',
  },
];

const COURSE_TOOLS = [
  {
    href: '/estudos/academico',
    title: 'Cursos Acadêmicos',
    description: 'Estudos aprofundados com rigor teológico',
    icon: GraduationCap,
    color: 'from-blue-500/15 to-blue-600/15',
    iconColor: 'text-blue-500 dark:text-blue-400',
  },
  {
    href: '/estudos/manuais',
    title: 'Manuais Bíblicos',
    description: 'Guias práticos de estudo por tema',
    icon: BookMarked,
    color: 'from-emerald-500/15 to-emerald-600/15',
    iconColor: 'text-emerald-500 dark:text-emerald-400',
  },
];

const QUIZ_TOOLS = [
  {
    href: '/quiz/classico',
    title: 'Quiz Diário',
    description: 'Teste seus conhecimentos bíblicos',
    icon: Target,
    color: 'from-amber-500/15 to-amber-600/15',
    iconColor: 'text-amber-500 dark:text-amber-400',
  },
  {
    href: '/desafios',
    title: 'Desafios Comunitários',
    description: 'Progresso individual e ranking',
    icon: Trophy,
    color: 'from-violet-500/15 to-violet-600/15',
    iconColor: 'text-violet-500 dark:text-violet-400',
  },
  {
    href: '/quiz/multiplayer',
    title: 'Quiz Multiplayer',
    description: 'Desafie amigos em tempo real',
    icon: Users,
    color: 'from-emerald-500/15 to-emerald-600/15',
    iconColor: 'text-emerald-500 dark:text-emerald-400',
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
    <main className="min-h-screen bg-background">
      <Header />
      <BuscaGlobal open={buscaOpen} onOpenChange={setBuscaOpen} />

      <div className="max-w-6xl mx-auto px-4 py-6 pb-24">
        {/* Welcome Banner */}
        <ScrollReveal>
          <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 p-6 md:p-8 mb-8">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative">
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                O que você quer estudar hoje?
              </h1>
              <p className="text-muted-foreground mb-6 max-w-xl">
                Explore ferramentas, estudos e recursos para aprofundar seu conhecimento bíblico.
              </p>
              <button
                onClick={handleSearch}
                className="flex items-center gap-3 w-full max-w-lg px-4 py-3 rounded-xl border border-border bg-background/80 backdrop-blur-sm hover:border-primary/50 hover:shadow-md transition-all duration-200 text-left group"
              >
                <Search className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                <span className="text-muted-foreground text-sm">Buscar versículos, estudos, personagens...</span>
                <kbd className="ml-auto hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded bg-muted text-xs text-muted-foreground">
                  <span className="text-xs">⌘</span>K
                </kbd>
              </button>
            </div>
          </section>
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

        {/* Ferramentas Rápidas */}
        <ScrollReveal delay={0.15}>
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">Ferramentas Rápidas</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {QUICK_TOOLS.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="group flex flex-col p-4 rounded-xl border border-border bg-card hover:border-primary/50 hover:shadow-md transition-all duration-200"
                >
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${tool.color} flex items-center justify-center mb-3 group-hover:scale-105 transition-transform`}>
                    <tool.icon className={`w-5 h-5 ${tool.iconColor}`} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-sm font-semibold text-foreground mb-1">{tool.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{tool.description}</p>
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
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {IA_TOOLS.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="group flex flex-col p-4 rounded-xl border border-border bg-card hover:border-primary/50 hover:shadow-md transition-all duration-200"
                >
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${tool.color} flex items-center justify-center mb-3 group-hover:scale-105 transition-transform`}>
                    <tool.icon className={`w-5 h-5 ${tool.iconColor}`} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-sm font-semibold text-foreground mb-1">{tool.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{tool.description}</p>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {COURSE_TOOLS.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="group flex flex-col p-4 rounded-xl border border-border bg-card hover:border-primary/50 hover:shadow-md transition-all duration-200"
                >
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${tool.color} flex items-center justify-center mb-3 group-hover:scale-105 transition-transform`}>
                    <tool.icon className={`w-5 h-5 ${tool.iconColor}`} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-sm font-semibold text-foreground mb-1">{tool.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{tool.description}</p>
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
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {QUIZ_TOOLS.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="group flex flex-col p-4 rounded-xl border border-border bg-card hover:border-primary/50 hover:shadow-md transition-all duration-200"
                >
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${tool.color} flex items-center justify-center mb-3 group-hover:scale-105 transition-transform`}>
                    <tool.icon className={`w-5 h-5 ${tool.iconColor}`} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-sm font-semibold text-foreground mb-1">{tool.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{tool.description}</p>
                </Link>
              ))}
            </div>
          </section>
        </ScrollReveal>
      </div>

      <Footer />
    </main>
  );
}
