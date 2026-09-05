'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  BookOpen, Search, Sparkles, GraduationCap, Globe, Map, Clock,
  Users, ChevronRight, Star, Library, Languages, Brain, Heart,
  ArrowRight, Play, BookMarked, Layers, Quote, Zap, Shield,
  Headphones, Eye, Share2, Download, Smartphone, Monitor,
} from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { versiculoDoDia } from '@/lib/versiculoDoDia';
import { cn } from '@/lib/utils';

const FEATURES = [
  {
    icon: BookOpen,
    title: 'Bíblia 10 Traduções',
    description: 'ARC, ARA, ACF, KJV, NVI, WEB, NVT, KJA — comparação lado a lado com destaque de diferenças.',
    href: '/biblia',
    color: 'from-amber-500 to-orange-500',
    stats: '10 traduções',
  },
  {
    icon: Languages,
    title: 'Grego & Hebraico',
    description: '14.200+ entradas do léxico Strong com morfologia, transliteração e significado.',
    href: '/idiomas',
    color: 'from-blue-500 to-cyan-500',
    stats: '14.200+ palavras',
  },
  {
    icon: Sparkles,
    title: 'IA Teológica',
    description: 'Exegese automática, perguntas em linguagem natural, respostas com versículos.',
    href: '/ia',
    color: 'from-purple-500 to-pink-500',
    stats: 'Gratuito',
  },
  {
    icon: GraduationCap,
    title: 'Teologia Sistemática',
    description: '13 categorias doutrinárias com ensinos de múltiplos teólogos históricos.',
    href: '/teologia',
    color: 'from-emerald-500 to-teal-500',
    stats: '13 categorias',
  },
  {
    icon: Search,
    title: 'Pesquisa Avançada',
    description: 'Busca semântica com 50 grupos de sinônimos + busca com IA em linguagem natural.',
    href: '/pesquisa',
    color: 'from-rose-500 to-red-500',
    stats: 'Busca semântica',
  },
  {
    icon: Library,
    title: '4.911 Comentários',
    description: 'Comentários de teólogos clássicos — Agostinho, Calvino, Lutero, Spurgeon e mais.',
    href: '/estudos',
    color: 'from-violet-500 to-purple-500',
    stats: '4.911 versículos',
  },
  {
    icon: Globe,
    title: 'Atlas Bíblico',
    description: 'Mapas interativos com 20+ locais bíblicos, camadas geográficas e Street View.',
    href: '/atlas',
    color: 'from-teal-500 to-emerald-500',
    stats: '20+ locais',
  },
  {
    icon: Clock,
    title: 'Cronologia',
    description: 'Linha do tempo interativa com 200+ eventos — da criação ao Apocalipse.',
    href: '/cronologia',
    color: 'from-orange-500 to-amber-500',
    stats: '200+ eventos',
  },
  {
    icon: BookMarked,
    title: 'Referências Cruzadas',
    description: '29.000+ referências TSK — explore conexões entre passagens com grafo visual.',
    href: '/referencias',
    color: 'from-cyan-500 to-blue-500',
    stats: '29.000+ refs',
  },
  {
    icon: Users,
    title: '41 Obras Clássicas',
    description: 'Pais da Igreja, Reforma, Credos Ecumenicos — textos integrais gratuitos.',
    href: '/biblioteca',
    color: 'from-pink-500 to-rose-500',
    stats: 'Domínio público',
  },
];

const TESTIMONIALS = [
  {
    text: 'Finalmente uma plataforma bíblica brasileira com qualidade acadêmica. O léxico hebraico é impressionante.',
    author: 'Pr. Marcos Silva',
    role: 'Pastor e Professor de Teologia',
  },
  {
    text: 'Uso diariamente para preparação de sermões. A IA teológica é fantástica para estudo exegético.',
    author: 'Ana Beatriz',
    role: 'Estudante de Teologia',
  },
  {
    text: 'Superou minhas expectativas. A Bíblia em 10 traduções com comparador é uma ferramenta indispensável.',
    author: 'Carlos Eduardo',
    role: 'Missionário',
  },
];

const STATS = [
  { value: '10', label: 'Traduções', suffix: '' },
  { value: '14.200', label: 'Palavras', suffix: '+' },
  { value: '29.000', label: 'Referências', suffix: '+' },
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
        {/* Background gradient */}
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
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--brand-subtle)] border border-[var(--brand-default)]/10 text-[var(--brand-default)] text-xs font-semibold tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-default)] animate-pulse" />
              Plataforma Gratuita de Estudo Bíblico
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-center font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[var(--content-primary)] tracking-tight leading-[1.1] mb-6"
          >
            Toda a{' '}
            <span className="bg-gradient-to-r from-[var(--brand-default)] via-[var(--accent-warm)] to-[var(--brand-emphasis)] bg-clip-text text-transparent">
              biblioteca teológica
            </span>
            <br />
            em um só lugar.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center text-lg sm:text-xl text-[var(--content-secondary)] max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Bíblia em 10 traduções, Grego e Hebraico com léxico Strong, Exegese automática com IA,
            Teologia Sistemática e ferramentas avançadas —{' '}
            <strong className="text-[var(--content-primary)]">100% gratuitas.</strong>
          </motion.p>

          {/* CTAs */}
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
              Começar a Estudar
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/pesquisa"
              className="flex items-center gap-2 px-8 py-4 rounded-2xl border-2 border-[var(--border)] text-[var(--content-primary)] font-semibold hover:bg-[var(--surface-raised)] hover:border-[var(--brand-default)]/30 transition-all"
            >
              <Search className="w-5 h-5" />
              Pesquisar na Bíblia
            </Link>
          </motion.div>

          {/* Verse of the day */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-2xl mx-auto"
          >
            <div className="relative rounded-2xl bg-[var(--surface-raised)]/80 backdrop-blur-xl border border-[var(--border)]/50 p-6 sm:p-8 shadow-lg">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 rounded-full bg-[var(--surface-raised)] border border-[var(--border)]/50 text-[10px] font-bold uppercase tracking-widest text-[var(--content-muted)]">
                Versículo do Dia
              </div>
              <p className="text-center font-serif-body text-lg sm:text-xl italic text-[var(--content-primary)] leading-relaxed mb-3">
                &ldquo;{versiculo.texto}&rdquo;
              </p>
              <p className="text-center text-sm font-semibold text-[var(--brand-default)]">
                {versiculo.referencia}
              </p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-[var(--border)]/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl sm:text-4xl font-display font-bold text-[var(--brand-default)] mb-1">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm text-[var(--content-muted)]">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[var(--content-primary)] mb-4">
              Ferramentas que transformam seu estudo
            </h2>
            <p className="text-[var(--content-secondary)] max-w-xl mx-auto">
              Cada feature foi projetada com rigor acadêmico e acessibilidade — do estudante iniciante ao teólogo profissional.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  href={feature.href}
                  className="group block h-full rounded-2xl bg-[var(--surface-raised)] border border-[var(--border)]/50 p-6 hover:shadow-xl hover:border-[var(--brand-default)]/20 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className={cn(
                    'w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center mb-4 shadow-lg',
                    feature.color
                  )}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-[var(--content-primary)] mb-2 group-hover:text-[var(--brand-default)] transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-[var(--content-secondary)] leading-relaxed mb-4">
                    {feature.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--content-muted)]">
                      {feature.stats}
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

      {/* Academic Section */}
      <section className="py-20 bg-gradient-to-b from-[var(--surface-sunken)] to-transparent">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[var(--brand-default)] mb-4 block">
                Qualidade Acadêmica
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[var(--content-primary)] mb-6 leading-tight">
                Estudo bíblico com{' '}
                <span className="text-[var(--brand-default)]">rigor teológico</span>
              </h2>
              <div className="space-y-4">
                {[
                  { icon: Brain, title: 'Exegese em 12 Dimensões', desc: 'Análise completa: textual, histórica, literária, teológica, gramatical, arqueológica, geográfica, canônica, pastoral, comparativa, contextual e aplicação.' },
                  { icon: Shield, title: 'Apparatus Crítico', desc: 'Variantes textuais do Novo Testamento com notas manuscritas — MATERIAL, A, B, ℵ e mais.' },
                  { icon: Layers, title: 'Morfologia Grega/Hebraica', desc: 'Análise morfológica completa: tempo, voz, modo, pessoa, número, gênero, caso, estado.' },
                ].map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="shrink-0 w-10 h-10 rounded-xl bg-[var(--brand-subtle)] flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-[var(--brand-default)]" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-[var(--content-primary)] mb-1">{item.title}</h3>
                      <p className="text-sm text-[var(--content-secondary)] leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Mock academic card */}
              <div className="rounded-2xl bg-[var(--surface-raised)] border border-[var(--border)]/50 shadow-2xl overflow-hidden">
                <div className="px-6 py-4 border-b border-[var(--border)]/30 bg-[var(--surface-sunken)]">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                    <span className="ml-3 text-xs text-[var(--content-muted)]">Exegese — João 3:16</span>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  {/* Text analysis mock */}
                  <div className="rounded-lg bg-[var(--surface-sunken)] p-4">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--content-muted)] mb-2">Texto Grego</p>
                    <p className="font-mono text-sm text-[var(--content-primary)]">
                      οὕτως γὰρ ἠγάπησεν ὁ θεὸς τὸν κόσμον
                    </p>
                    <p className="text-xs text-[var(--content-muted)] mt-1 italic">
                      houtōs gar ēgapēsen ho theos ton kosmon
                    </p>
                  </div>
                  {/* Morphology tags */}
                  <div className="flex flex-wrap gap-2">
                    {['VB: Aorist Active Indicative 3S', 'AJ: Masculine Accusative Singular', 'NO: Masculine Accusative Singular'].map((tag, i) => (
                      <span key={i} className="text-[10px] px-2 py-1 rounded-full bg-[var(--brand-subtle)] text-[var(--brand-default)] font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                  {/* Commentary mock */}
                  <div className="rounded-lg border border-[var(--border)]/30 p-4">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--content-muted)] mb-2">Comentário</p>
                    <p className="text-sm text-[var(--content-secondary)] leading-relaxed italic">
                      &ldquo;A palavra <strong>ἠγάπησεν</strong> (aoristo indicativo ativo) indica uma ação puntual no passado — o amor de Deus se manifestou de forma decisiva na cruz.&rdquo;
                    </p>
                    <p className="text-xs text-[var(--content-muted)] mt-2">— John Calvin, Commentaire sur l'Évangile selon Jean</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[var(--content-primary)] mb-4">
              Confiado por estudiosos
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl bg-[var(--surface-raised)] border border-[var(--border)]/50 p-6"
              >
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-[var(--content-secondary)] leading-relaxed mb-4 italic">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div>
                  <p className="text-sm font-bold text-[var(--content-primary)]">{t.author}</p>
                  <p className="text-xs text-[var(--content-muted)]">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-b from-transparent to-[var(--surface-sunken)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[var(--content-primary)] mb-4">
              Comece agora seu estudo bíblico
            </h2>
            <p className="text-[var(--content-secondary)] mb-8 max-w-xl mx-auto">
              Acesse toda a plataforma gratuitamente. Sem cadastro necessário para leitura.
            </p>
            <Link
              href="/biblia"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-[var(--brand-default)] to-[var(--accent-warm)] text-white font-semibold shadow-lg shadow-[var(--brand-default)]/20 hover:shadow-xl hover:scale-105 active:scale-95 transition-all"
            >
              <BookOpen className="w-5 h-5" />
              Abrir a Bíblia
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
