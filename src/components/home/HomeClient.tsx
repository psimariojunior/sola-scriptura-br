'use client';

import { useState, useEffect, useRef, useMemo, lazy, Suspense } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  BookOpen, Search, Sparkles, Globe,
  ChevronRight, Languages, Brain, BookMarked,
  ArrowRight, Layers, Shield, Map, Clock,
  BookMarked as BookIcon, Library,
} from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { versiculoDoDia } from '@/lib/versiculoDoDia';
import { cn } from '@/lib/utils';

const VerseDoDia = lazy(() => import('@/components/VerseDoDia'));
const ContinuarLeitura = lazy(() => import('@/components/ContinuarLeitura'));

const DIFFERENTIATORS = [
  {
    icon: Brain,
    title: 'Exegese em 12 Dimensões',
    description: 'Selecione qualquer versículo e receba em segundos uma análise completa: textual, histórica, literária, teológica, gramatical, arqueológica, geográfica, canônica, pastoral, comparativa, contextual e síntese.',
    href: '/exegese',
    color: 'from-purple-500 to-pink-500',
    stat: '12 dimensões',
  },
  {
    icon: Library,
    title: 'Biblioteca de Clássicos',
    description: '41 obras-primas da teologia cristã — do Didaquê do século I a Bonhoeffer do século XX. Pais da Igreja, Reforma, Credos e Espiritualidade Clássica.',
    href: '/biblioteca',
    color: 'from-amber-500 to-orange-500',
    stat: '41 obras · 6 séculos',
  },
  {
    icon: Languages,
    title: 'Léxico Original',
    description: '8.674 palavras hebraicas e 5.526 gregas com Strong\'s, morfologia e definição — integradas diretamente ao texto bíblico.',
    href: '/idiomas',
    color: 'from-blue-500 to-cyan-500',
    stat: '14.200+ palavras',
  },
];

const TOOLS = [
  {
    icon: BookOpen,
    title: 'Bíblia Multi-Tradução',
    description: '10 traduções com comparação lado a lado.',
    href: '/biblia',
    color: 'from-amber-500 to-orange-500',
    stats: '10 traduções',
  },
  {
    icon: Search,
    title: 'Pesquisa com IA',
    description: 'Busca semântica e em linguagem natural.',
    href: '/pesquisa',
    color: 'from-rose-500 to-red-500',
    stats: 'Busca semântica',
  },
  {
    icon: BookIcon,
    title: 'Teologia Sistematizada',
    description: '91 doutrinas em 13 categorias com 3 tradições.',
    href: '/teologia',
    color: 'from-violet-500 to-purple-500',
    stats: '91 doutrinas',
  },
  {
    icon: Map,
    title: 'Atlas Bíblico',
    description: '158 locais e 21 rotas em mapa interativo.',
    href: '/atlas',
    color: 'from-teal-500 to-emerald-500',
    stats: '158 locais',
  },
  {
    icon: Layers,
    title: 'Harmonia Sinótica',
    description: 'Mateus, Marcos, Lucas e João lado a lado.',
    href: '/harmonia',
    color: 'from-sky-500 to-blue-500',
    stats: '4 evangelhos',
  },
  {
    icon: Shield,
    title: 'Crítica Textual',
    description: 'Variantes textuais do Novo Testamento.',
    href: '/ferramentas/critica-textual',
    color: 'from-indigo-500 to-violet-500',
    stats: 'Manuscritos',
  },
];

const STATS = [
  { value: '10', label: 'Traduções', suffix: '' },
  { value: '14.200', label: 'Palavras Originais', suffix: '+' },
  { value: '29.000', label: 'Referências Cruzadas', suffix: '+' },
  { value: '4.911', label: 'Comentários', suffix: '' },
];

function AnimatedCounter({ value, suffix = '' }: { value: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const numericValue = parseInt(value.replace(/\./g, ''));

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const end = numericValue;
          const duration = 2000;
          const startTime = Date.now();
          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * end));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [numericValue]);

  const formatted = count.toLocaleString('pt-BR');
  return (
    <span ref={ref}>
      {formatted}{suffix}
    </span>
  );
}

export default function HomeClient() {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -60]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.6]);
  const [versiculo] = useState(versiculoDoDia());

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--surface-sunken)] via-[var(--surface-base)] to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[var(--brand-default)] opacity-[0.03] rounded-full blur-3xl" />

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-16"
        >
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-center mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--surface-raised)] border border-[var(--border)]/50 text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--content-muted)]">
              <Sparkles className="w-3 h-3 text-[var(--brand-default)]" />
              100% Gratuito · Sem Anúncios · Sem Cadastro
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-center font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[var(--content-primary)] tracking-tight leading-[1.1] mb-6"
          >
            <span className="bg-gradient-to-r from-[var(--brand-default)] via-[var(--accent-warm)] to-[var(--brand-emphasis)] bg-clip-text text-transparent">
              A Palavra de Deus é viva e eficaz
            </span>
            <br />
            <span className="text-[var(--content-primary)]">
              — estudada com fidelidade ao original
            </span>
          </motion.h1>

          {/* Subtitle — value proposition */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center text-base sm:text-lg md:text-xl text-[var(--content-secondary)] max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Estude a Escritura como ela merece ser estudada — comparando traduções, examinando as palavras originais, ouvindo vozes da tradição cristã, tudo sem custo.
          </motion.p>

          {/* CTAs — diversified */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Link
              href="/biblia"
              className="group flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-[var(--brand-default)] to-[var(--accent-warm)] text-white font-semibold shadow-lg shadow-[var(--brand-default)]/20 hover:shadow-xl hover:shadow-[var(--brand-default)]/30 hover:scale-105 active:scale-95 transition-all"
            >
              <BookOpen className="w-5 h-5" />
              Ler as Escrituras
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/exegese"
              className="flex items-center gap-2 px-8 py-4 rounded-2xl border-2 border-[var(--border)] text-[var(--content-primary)] font-semibold hover:bg-[var(--surface-raised)] hover:border-[var(--brand-default)]/30 transition-all"
            >
              <Brain className="w-5 h-5" />
              Fazer Exegese
            </Link>
          </motion.div>

          {/* Verse of the day — integrated */}
          <Suspense fallback={null}>
            <VerseDoDia />
          </Suspense>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y border-[var(--border)]/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-2xl sm:text-3xl font-display font-bold text-[var(--brand-default)] mb-1">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-xs text-[var(--content-muted)]">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Differentials — what makes this unique */}
      <section className="py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[var(--content-primary)] mb-4">
              Por que estudar com tantas ferramentas?
            </h2>
            <p className="text-[var(--content-secondary)] max-w-xl mx-auto">
              Porque a Palavra merece ser examinada em toda a sua riqueza — nas línguas originais, na tradição da igreja, com o cuidado que o texto sagrado merece.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {DIFFERENTIATORS.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  href={item.href}
                  className="group block h-full rounded-2xl bg-[var(--surface-raised)] border border-[var(--border)]/50 p-6 hover:shadow-xl hover:border-[var(--brand-default)]/20 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className={cn(
                    'w-14 h-14 rounded-xl bg-gradient-to-br flex items-center justify-center mb-5 shadow-lg',
                    item.color
                  )}>
                    <item.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[var(--content-primary)] mb-3 group-hover:text-[var(--brand-default)] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[var(--content-secondary)] leading-relaxed mb-4">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--content-muted)]">
                      {item.stat}
                    </span>
                    <span className="flex items-center gap-1 text-xs font-medium text-[var(--brand-default)] opacity-0 group-hover:opacity-100 transition-opacity">
                      Explorar <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Grid — comprehensive features */}
      <section className="py-16 bg-gradient-to-b from-[var(--surface-sunken)] to-transparent">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[var(--content-primary)] mb-4">
              Ferramentas que aprofundam sua compreensão das Escrituras
            </h2>
            <p className="text-[var(--content-secondary)] max-w-xl mx-auto">
              Do versículo diário à análise exegética — cada recurso a serviço da Palavra.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {TOOLS.map((tool, i) => (
              <motion.div
                key={tool.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  href={tool.href}
                  className="group block h-full rounded-2xl bg-[var(--surface-raised)] border border-[var(--border)]/50 p-6 hover:shadow-xl hover:border-[var(--brand-default)]/20 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className={cn(
                    'w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center mb-4 shadow-lg',
                    tool.color
                  )}>
                    <tool.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-[var(--content-primary)] mb-2 group-hover:text-[var(--brand-default)] transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-sm text-[var(--content-secondary)] leading-relaxed mb-4">
                    {tool.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--content-muted)]">
                      {tool.stats}
                    </span>
                    <span className="flex items-center gap-1 text-xs font-medium text-[var(--brand-default)] opacity-0 group-hover:opacity-100 transition-opacity">
                      Explorar <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Continue Reading — for returning users */}
      <Suspense fallback={null}>
        <section className="py-12">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <ContinuarLeitura />
          </div>
        </section>
      </Suspense>

      {/* Final CTA — stronger */}
      <section className="py-16 bg-gradient-to-b from-transparent to-[var(--surface-sunken)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[var(--content-primary)] mb-4">
              Comece por Gênesis 1
            </h2>
            <p className="text-[var(--content-secondary)] mb-8 max-w-xl mx-auto">
              Leia, ouça, estude e compare — como em Atos 17:11, onde os bereanos examinavam as Escrituras dia a dia. Sem cadastro necessário.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/biblia?livro=gn&capitulo=1"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-[var(--brand-default)] to-[var(--accent-warm)] text-white font-semibold shadow-lg shadow-[var(--brand-default)]/20 hover:shadow-xl hover:scale-105 active:scale-95 transition-all"
              >
                <BookOpen className="w-5 h-5" />
                Ler Gênesis 1
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/cursos"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl border-2 border-[var(--border)] text-[var(--content-primary)] font-semibold hover:bg-[var(--surface-raised)] hover:border-[var(--brand-default)]/30 transition-all"
              >
                <Clock className="w-5 h-5" />
                Ver Cursos
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
