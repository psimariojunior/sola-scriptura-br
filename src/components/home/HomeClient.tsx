'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { PageShell } from '@/components/layout/PageShell';
import ScrollReveal from '@/components/ScrollReveal';
import {
  BookOpen, Search, Brain, Map, Languages, ArrowRight,
  Heart, BookMarked, Clock, Compass, Users, User, StickyNote,
  Library, Columns, GraduationCap, Sparkles,
} from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { OBRAS } from '@/data/biblioteca/catalogo';
import { CapaLivro } from '@/components/biblioteca/CapaLivro';

const VerseDoDia = dynamic(() => import('@/components/VerseDoDia'), { ssr: false });
const ContinuarLeitura = dynamic(() => import('@/components/ContinuarLeitura'), { ssr: false });
const StreakCard = dynamic(() => import('@/components/StreakCard').then(m => ({ default: m.StreakCard })), { ssr: false });
const ReadingProgressRing = dynamic(() => import('@/components/ReadingProgressRing').then(m => ({ default: m.ReadingProgressRing })), { ssr: false });

const PILARES = [
  {
    href: '/biblia',
    icon: BookOpen,
    titulo: 'Ler',
    desc: '10 traduções, áudio, karaoke e modo imersivo',
  },
  {
    href: '/estudar',
    icon: GraduationCap,
    titulo: 'Estudar',
    desc: 'Exegese, Strong’s, harmonia e comentários',
  },
  {
    href: '/biblioteca',
    icon: Library,
    titulo: 'Biblioteca',
    desc: 'Clássicos da fé em texto integral, de graça',
  },
  {
    href: '/ia',
    icon: Sparkles,
    titulo: 'IA teológica',
    desc: 'Pergunte com RAG nas Escrituras e no léxico',
  },
];

const FERRAMENTAS = [
  { href: '/biblia', icon: BookOpen, label: 'Bíblia', desc: '10 traduções, áudio, karaoke', tile: 'tile-brand' },
  { href: '/pesquisa', icon: Search, label: 'Pesquisa', desc: 'Busca semântica e avançada', tile: 'tile-success' },
  { href: '/idiomas', icon: Languages, label: 'Grego / Hebraico', desc: '14.200 verbetes Strong’s', tile: 'tile-cool' },
  { href: '/exegese', icon: Brain, label: 'Exegese', desc: 'Análise com IA gratuita', tile: 'tile-brand' },
  { href: '/harmonia', icon: Columns, label: 'Harmonia', desc: 'Sinóticos lado a lado', tile: 'tile-info' },
  { href: '/atlas', icon: Map, label: 'Atlas', desc: 'Mapas interativos', tile: 'tile-warm' },
  { href: '/comparar', icon: Compass, label: 'Comparar', desc: 'Traduções com diff', tile: 'tile-cool' },
  { href: '/biblioteca', icon: Library, label: 'Clássicos', desc: 'Pais, Reforma, credos', tile: 'tile-warning' },
];

const LEITURAS = [
  { titulo: 'Salmos em 30 dias', dias: 30, href: '/planos?plano=salmos-30', tile: 'tile-brand' },
  { titulo: '4 Evangelhos em 60 dias', dias: 60, href: '/planos?plano=evangelhos-60', tile: 'tile-success' },
  { titulo: 'Novo Testamento em 90 dias', dias: 90, href: '/planos?plano=nt-90', tile: 'tile-warning' },
  { titulo: 'Bíblia em 1 ano', dias: 365, href: '/planos?plano=biblia-1-ano', tile: 'tile-cool' },
];

const OBRAS_DESTAQUE = OBRAS.slice(0, 6);

function saudacao(): string {
  const hora = new Date().getHours();
  if (hora >= 5 && hora < 12) return 'Bom dia';
  if (hora >= 12 && hora < 18) return 'Boa tarde';
  return 'Boa noite';
}

export default function HomeClient() {
  const router = useRouter();
  const [busca, setBusca] = useState('');

  const enviarBusca = (e: FormEvent) => {
    e.preventDefault();
    const q = busca.trim();
    router.push(q ? `/pesquisa?q=${encodeURIComponent(q)}` : '/pesquisa');
  };

  return (
    <PageShell noContainer noPadding>

          <section className="relative overflow-hidden px-4 sm:px-6 -mt-1">
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full opacity-30 blur-3xl"
                style={{ background: 'radial-gradient(ellipse, var(--brand-default) 0%, transparent 70%)' }} />
              <div className="absolute top-20 left-1/4 w-[300px] h-[300px] rounded-full opacity-10 blur-2xl"
                style={{ background: 'radial-gradient(circle, #E07A30 0%, transparent 70%)' }} />
              <div className="absolute top-10 right-1/4 w-[250px] h-[250px] rounded-full opacity-10 blur-2xl"
                style={{ background: 'radial-gradient(circle, #B45309 0%, transparent 70%)' }} />
            </div>

            <div className="relative max-w-4xl mx-auto text-center pt-12 pb-8 sm:pt-16 sm:pb-10">
              <ScrollReveal>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  <span className="text-xs font-semibold text-primary tracking-wide uppercase">
                    {saudacao()} · estudo bíblico acadêmico, gratuito
                  </span>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.05}>
                <h1 className="text-h1 text-foreground leading-[1.1] mb-4">
                  Sola Scriptura
                  <span className="block text-lg sm:text-2xl font-normal font-sans text-muted-foreground mt-3 tracking-normal">
                    Leia, estude e ensine as Escrituras como num seminário — sem paywall.
                  </span>
                </h1>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <div className="flex flex-wrap justify-center gap-4 sm:gap-8 mb-8">
                  {[
                    { value: '10', label: 'Traduções' },
                    { value: '14.200', label: 'Palavras originais' },
                    { value: '5.978', label: 'Comentários' },
                    { value: '29k+', label: 'Referências cruzadas' },
                  ].map((s) => (
                    <div key={s.label} className="text-center">
                      <p className="text-xl sm:text-2xl font-bold text-primary tabular-nums">{s.value}</p>
                      <p className="text-[10px] sm:text-xs text-muted-foreground">{s.label}</p>
                    </div>
                  ))}
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.15}>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Link href="/biblia"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300
                      bg-gradient-to-r from-[#A17A2C] via-[#C49A4D] to-[#E07A30] text-white
                      hover:from-[#8A6923] hover:via-[#B4903D] hover:to-[#D06A20]
                      shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                    <BookOpen className="w-4 h-4" />
                    Abrir Bíblia
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
                    Clássicos da Fé
                  </Link>
                </div>
              </ScrollReveal>
            </div>
          </section>

          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <ScrollReveal delay={0.2}>
              <form onSubmit={enviarBusca} className="mb-8" role="search">
                <label htmlFor="home-search" className="sr-only">Buscar nas Escrituras</label>
                <div className="flex items-center gap-3 px-4 py-3.5 rounded-2xl border border-border/50 bg-card/70 backdrop-blur-sm focus-within:border-primary/40 focus-within:ring-2 focus-within:ring-primary/15 transition-all duration-300">
                  <Search className="w-5 h-5 text-muted-foreground shrink-0" />
                  <input
                    id="home-search"
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                    placeholder="Buscar versículos, livros, Strong’s ou palavras…"
                    className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none min-w-0"
                    autoComplete="off"
                  />
                  <kbd className="hidden sm:inline text-[10px] bg-muted/50 px-2 py-0.5 rounded-md text-muted-foreground">Enter</kbd>
                  <button
                    type="submit"
                    className="shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
                    aria-label="Pesquisar"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </ScrollReveal>

            <ScrollReveal delay={0.12}>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-8">
                {PILARES.map((p) => (
                  <Link key={p.href} href={p.href} className="group">
                    <div className="h-full p-3.5 rounded-2xl border border-border/40 bg-card/50 hover:border-primary/35 hover:bg-card/80 hover:shadow-md transition-all duration-300">
                      <p.icon className="w-5 h-5 text-primary mb-2 group-hover:scale-110 transition-transform" />
                      <p className="text-sm font-semibold text-foreground">{p.titulo}</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug">{p.desc}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.25}>
              <VerseDoDia />
            </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <ContinuarLeitura />
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="mb-6">
              <StreakCard />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.18}>
            <div className="mb-6">
              <ReadingProgressRing />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Mesa de estudo</h2>
                <Link href="/estudar" className="text-[11px] text-primary hover:text-primary/80 font-medium">Ver todas</Link>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {FERRAMENTAS.map((f) => (
                  <Link key={f.href + f.label} href={f.href}>
                    <motion.div
                      whileHover={{ y: -2, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`h-full p-4 rounded-xl ${f.tile} border border-border/30 hover:border-primary/25 transition-all duration-300 group`}
                    >
                      <f.icon className="w-5 h-5 mb-2 group-hover:scale-110 transition-transform" />
                      <p className="text-sm font-semibold text-foreground">{f.label}</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">{f.desc}</p>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.22}>
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Biblioteca · Clássicos da Fé</h2>
                <Link href="/biblioteca" className="text-[11px] text-primary hover:text-primary/80 font-medium">Estante completa</Link>
              </div>
              <div className="flex gap-3 overflow-x-auto pb-3 scrollbar-hide -mx-1 px-1">
                {OBRAS_DESTAQUE.map((obra) => (
                  <CapaLivro key={obra.id} obra={obra} size="sm" href={`/biblioteca/${obra.id}`} />
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.25}>
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Planos de Leitura</h2>
                <Link href="/planos" className="text-[11px] text-primary hover:text-primary/80 font-medium">Ver todos</Link>
              </div>
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {LEITURAS.map((l) => (
                  <Link key={l.titulo} href={l.href} className="flex-shrink-0 w-48">
                    <div className="p-4 rounded-xl bg-card/60 border border-border/30 hover:border-primary/25 transition-all h-full">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${l.tile}`}>{l.dias} dias</span>
                      <p className="text-sm font-medium mt-2 line-clamp-2">{l.titulo}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.28}>
            <div className="mb-8 p-5 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/8 via-card/60 to-transparent">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-primary mb-2">Sem anúncios · sem assinatura para o essencial</p>
              <h2 className="font-display text-xl font-semibold mb-2">Tudo o que a Logos cobra — aqui é livre.</h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                Interlinear palavra a palavra, léxico Strong’s, comentários clássicos, harmonia sinótica, atlas e biblioteca de domínio público. Estude com rigor acadêmico, no celular ou no computador.
              </p>
              <Link href="/estudar" className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
                Como começar em 2 minutos <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="mb-8">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Meu Espaço</h2>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                {[
                  { href: '/favoritos', icon: Heart, label: 'Favoritos', cor: 'text-[var(--accent-warm)]' },
                  { href: '/notas', icon: StickyNote, label: 'Notas', cor: 'text-[var(--accent-warning)]' },
                  { href: '/colecoes', icon: BookMarked, label: 'Coleções', cor: 'text-[var(--accent-cool)]' },
                  { href: '/social', icon: Users, label: 'Social', cor: 'text-[var(--accent-success)]' },
                  { href: '/planos', icon: Clock, label: 'Planos', cor: 'text-primary' },
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
    </PageShell>
  );
}
