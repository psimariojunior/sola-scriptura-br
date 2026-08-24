'use client';

import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import {
  BookOpen, Search, Brain, Map, Languages, ArrowRight,
  Heart, BookMarked, Clock, TrendingUp, Compass, Mic,
  Users, User, StickyNote,
} from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import dynamic from 'next/dynamic';

const VerseDoDia = dynamic(() => import('@/components/VerseDoDia'), { ssr: false });
const ContinuarLeitura = dynamic(() => import('@/components/ContinuarLeitura'), { ssr: false });
const StreakCard = dynamic(() => import('@/components/StreakCard').then(m => ({ default: m.StreakCard })), { ssr: false });
const ReadingProgressRing = dynamic(() => import('@/components/ReadingProgressRing').then(m => ({ default: m.ReadingProgressRing })), { ssr: false });

const FERRAMENTAS = [
  { href: '/biblia', icon: BookOpen, label: 'Bíblia', desc: '10 traduções, áudio, karaoke', cor: 'from-blue-500/15 to-blue-600/5' },
  { href: '/pesquisa', icon: Search, label: 'Pesquisa', desc: 'Busca semântica e avançada', cor: 'from-emerald-500/15 to-emerald-600/5' },
  { href: '/idiomas', icon: Languages, label: 'Grego/Hebraico', desc: '14.200 verbetes Strong\'s', cor: 'from-violet-500/15 to-violet-600/5' },
  { href: '/exegese', icon: Brain, label: 'Estudo Bíblico', desc: 'Análise com IA gratuita', cor: 'from-purple-500/15 to-purple-600/5' },
  { href: '/atlas', icon: Map, label: 'Atlas', desc: 'Mapas interativos', cor: 'from-amber-500/15 to-amber-600/5' },
  { href: '/comparar', icon: Compass, label: 'Comparar', desc: 'Lado a lado com diff', cor: 'from-rose-500/15 to-rose-600/5' },
];

const LEITURAS = [
  { titulo: 'Salmos para Ansiedade', dias: 7, cor: 'bg-blue-500/10 text-blue-600' },
  { titulo: 'Evangelhos em 7 Dias', dias: 7, cor: 'bg-emerald-500/10 text-emerald-600' },
  { titulo: 'Fundamentos da Fé', dias: 21, cor: 'bg-amber-500/10 text-amber-600' },
  { titulo: 'Provérbios da Sabedoria', dias: 31, cor: 'bg-purple-500/10 text-purple-600' },
];

export default function HomeClient() {
  const { t } = useTranslation();
  const [busca, setBusca] = useState('');

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main id="main-content" className="pt-20 pb-24">

          {/* ═══════ HERO SECTION ═══════ */}
          <section className="relative overflow-hidden px-4 sm:px-6 -mt-1">
            {/* Background aurora */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full opacity-30 blur-3xl"
                style={{ background: 'radial-gradient(ellipse, var(--brand-default) 0%, transparent 70%)' }} />
              <div className="absolute top-20 left-1/4 w-[300px] h-[300px] rounded-full opacity-10 blur-2xl"
                style={{ background: 'radial-gradient(circle, #E07A30 0%, transparent 70%)' }} />
              <div className="absolute top-10 right-1/4 w-[250px] h-[250px] rounded-full opacity-10 blur-2xl"
                style={{ background: 'radial-gradient(circle, #B45309 0%, transparent 70%)' }} />
            </div>

            <div className="relative max-w-4xl mx-auto text-center pt-12 pb-8 sm:pt-16 sm:pb-10">
              {/* Badge */}
              <ScrollReveal>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  <span className="text-xs font-semibold text-primary tracking-wide uppercase">Estudo Biblico Completo</span>
                </div>
              </ScrollReveal>

              {/* Title */}
              <ScrollReveal delay={0.05}>
                <h1 className="text-3xl sm:text-5xl font-serif font-bold text-foreground leading-tight mb-4">
                  Sola Scriptura
                  <span className="block text-lg sm:text-2xl font-normal text-muted-foreground mt-1">
                    Estude a Biblia como nos grandes seminarios
                  </span>
                </h1>
              </ScrollReveal>

              {/* Stats row */}
              <ScrollReveal delay={0.1}>
                <div className="flex flex-wrap justify-center gap-4 sm:gap-8 mb-8">
                  {[
                    { value: '10', label: 'Traducoes' },
                    { value: '14.200', label: 'Palavras originais' },
                    { value: '5.978', label: 'Comentarios' },
                    { value: '29k+', label: 'Referencias cruzadas' },
                  ].map((s) => (
                    <div key={s.label} className="text-center">
                      <p className="text-xl sm:text-2xl font-bold text-primary">{s.value}</p>
                      <p className="text-[10px] sm:text-xs text-muted-foreground">{s.label}</p>
                    </div>
                  ))}
                </div>
              </ScrollReveal>

              {/* CTA row */}
              <ScrollReveal delay={0.15}>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Link href="/biblia"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300
                      bg-gradient-to-r from-[#A17A2C] via-[#C49A4D] to-[#E07A30] text-white
                      hover:from-[#8A6923] hover:via-[#B4903D] hover:to-[#D06A20]
                      shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                    <BookOpen className="w-4 h-4" />
                    Abrir Biblia
                  </Link>
                  <Link href="/exegese"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300
                      border border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50">
                    <Brain className="w-4 h-4" />
                    Estudo com IA
                  </Link>
                  <Link href="/biblioteca"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300
                      border border-border text-muted-foreground hover:bg-card/60 hover:text-foreground">
                    <BookMarked className="w-4 h-4" />
                    Classicos da Fe
                  </Link>
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* ═══════ SEARCH + VERSE ═══════ */}
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            {/* Busca rapida */}
            <ScrollReveal delay={0.2}>
              <Link href="/pesquisa" className="block mb-6">
                <div className="flex items-center gap-3 px-4 py-3.5 rounded-2xl border border-border/50 bg-card/60 backdrop-blur-sm hover:border-primary/30 hover:bg-card/80 transition-all duration-300 group">
                  <Search className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  <span className="text-sm text-muted-foreground">Buscar versiculos, livros ou palavras...</span>
                  <kbd className="ml-auto text-[10px] bg-muted/50 px-2 py-0.5 rounded-md text-muted-foreground">/</kbd>
                </div>
              </Link>
            </ScrollReveal>

            {/* Versiculo do dia */}
            <ScrollReveal delay={0.25}>
              <VerseDoDia />
            </ScrollReveal>

          {/* Continuar lendo */}
          <ScrollReveal delay={0.1}>
            <ContinuarLeitura />
          </ScrollReveal>

          {/* Streak */}
          <ScrollReveal delay={0.15}>
            <div className="mb-6">
              <StreakCard />
            </div>
          </ScrollReveal>

          {/* Progresso bíblico */}
          <ScrollReveal delay={0.18}>
            <div className="mb-6">
              <ReadingProgressRing />
            </div>
          </ScrollReveal>

          {/* Ferramentas — grid funcional */}
          <ScrollReveal delay={0.2}>
            <div className="mb-8">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Ferramentas</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {FERRAMENTAS.map((f, i) => (
                  <Link key={f.href} href={f.href}>
                    <motion.div
                      whileHover={{ y: -2, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`p-4 rounded-xl bg-gradient-to-br ${f.cor} border border-border/30 hover:border-primary/25 transition-all duration-300 group`}
                    >
                      <f.icon className="w-5 h-5 text-primary mb-2 group-hover:scale-110 transition-transform" />
                      <p className="text-sm font-semibold text-foreground">{f.label}</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">{f.desc}</p>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Planos de leitura */}
          <ScrollReveal delay={0.25}>
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Planos de Leitura</h2>
                <Link href="/planos" className="text-[11px] text-primary hover:text-primary/80 font-medium">Ver todos</Link>
              </div>
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {LEITURAS.map((l) => (
                  <Link key={l.titulo} href="/planos" className="flex-shrink-0 w-48">
                    <div className="p-4 rounded-xl bg-card/60 border border-border/30 hover:border-primary/25 transition-all">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${l.cor}`}>{l.dias} dias</span>
                      <p className="text-sm font-medium mt-2 line-clamp-2">{l.titulo}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Acesso rápido */}
          <ScrollReveal delay={0.3}>
            <div className="mb-8">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Meu Espaço</h2>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                {[
                  { href: '/favoritos', icon: Heart, label: 'Favoritos', cor: 'text-red-500' },
                  { href: '/notas', icon: StickyNote, label: 'Notas', cor: 'text-amber-500' },
                  { href: '/colecoes', icon: BookMarked, label: 'Coleções', cor: 'text-blue-500' },
                  { href: '/social', icon: Users, label: 'Social', cor: 'text-emerald-500' },
                  { href: '/planos', icon: Clock, label: 'Planos', cor: 'text-purple-500' },
                  { href: '/conta', icon: User, label: 'Conta', cor: 'text-primary' },
                ].map((a) => (
                  <Link key={a.href} href={a.href} className="flex flex-col items-center gap-1.5 p-3 rounded-xl hover:bg-card/60 transition-colors group">
                    <a.icon className={`w-5 h-5 ${a.cor} group-hover:scale-110 transition-transform`} />
                    <span className="text-[11px] text-muted-foreground font-medium">{a.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </ScrollReveal>
          </div>
      </main>
      <Footer />
    </div>
  );
}
