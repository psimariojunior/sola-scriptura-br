'use client';

import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useScroll, useTransform } from 'framer-motion';
import dynamic from 'next/dynamic';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import {
  BookOpen, Map, Brain, ScrollText, ArrowRight, Sparkles, Columns2,
  Globe, Shield, Heart, MonitorPlay, Music, Zap, Play,
  CheckCircle2, ChevronDown, Tv, Smartphone, Cast, Languages,
  BookMarked, GraduationCap, WifiOff, Share2, Gift, GitCompareArrows,
  Star, Bell,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

const HeroParticles = dynamic(() => import('@/components/home/HeroParticles').then(m => ({ default: m.HeroParticles })), { ssr: false });
const RotatingVerse = dynamic(() => import('@/components/home/RotatingVerse').then(m => ({ default: m.RotatingVerse })), { ssr: false });
const AnimatedCounter = dynamic(() => import('@/components/home/AnimatedCounter').then(m => ({ default: m.AnimatedCounter })), { ssr: false });
const VerseDoDia = dynamic(() => import('@/components/VerseDoDia'), { ssr: false });
const ContinuarLeitura = dynamic(() => import('@/components/ContinuarLeitura'), { ssr: false });
const WordOfDayWidget = dynamic(() => import('@/components/WordOfDay').then(m => ({ default: m.WordOfDay })), { ssr: false });
const InstallBanner = dynamic(() => import('@/components/InstallBanner'), { ssr: false });
const NotificationSetup = dynamic(() => import('@/components/NotificationSetup').then(m => ({ default: m.NotificationSetup })), { ssr: false });

const featuresStatic = [
  { icon: Columns2, featureKey: 'multiTranslation', accent: 'amber' },
  { icon: ScrollText, featureKey: 'exegesis', accent: 'emerald' },
  { icon: Brain, featureKey: 'ai', accent: 'purple' },
  { icon: Map, featureKey: 'atlas', accent: 'sky' },
  { icon: Music, featureKey: 'audio', accent: 'rose' },
  { icon: MonitorPlay, featureKey: 'presentation', accent: 'gold', highlight: true },
  { icon: Languages, featureKey: 'originalLanguages', accent: 'violet' },
  { icon: Brain, featureKey: 'concordance', accent: 'cyan' },
  { icon: BookMarked, featureKey: 'flashcards', accent: 'rose' },
  { icon: GraduationCap, featureKey: 'readingPlans', accent: 'emerald' },
  { icon: WifiOff, featureKey: 'offline', accent: 'slate' },
  { icon: Share2, featureKey: 'share', accent: 'amber' },
];

const comoEstudarStatic = [
  { step: '01', key: 'step1', icon: Columns2 },
  { step: '02', key: 'step2', icon: Languages },
  { step: '03', key: 'step3', icon: Brain },
];

const comoFuncionaStatic = [
  { step: '01', key: 'step1' },
  { step: '02', key: 'step2' },
  { step: '03', key: 'step3' },
];

const depoimentos: { texto: string; autor: string; cargo: string }[] = [];

const referenciadoPor = ['Seminários Teológicos', 'Escolas Bíblicas', 'Igrejas Locais', 'Pastores e Líderes', 'Estudantes', 'Missionários'];

const provasSociais = [
  { icon: BookOpen, label: '66 livros' },
  { icon: Languages, label: '6 traduções' },
  { icon: Brain, label: 'IA teológica' },
  { icon: Smartphone, label: 'Modo offline' },
];

const stats = [
  { value: 66, labelKey: 'landing.stats.books', suffix: '' },
  { value: 6, labelKey: 'landing.stats.translations', suffix: '' },
  { value: 31102, labelKey: 'landing.stats.verses', suffix: '' },
  { value: 29266, labelKey: 'landing.stats.crossRefs', suffix: '' },
  { value: 4911, labelKey: 'landing.stats.commentaries', suffix: '' },
  { value: 14200, labelKey: 'landing.stats.entries', suffix: '' },
];

function ApresentacaoMockup() {
  return (
    <div className="mockup-screen">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-8 bg-black/40 flex items-center px-4 gap-2">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
          </div>
          <span className="text-[10px] text-white/40 ml-2 tracking-wider">sola-scriptura.app/apresentar</span>
        </div>
      </div>
      <div className="mockup-screen-content pt-8">
        <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.3em] text-amber-400/80 mb-3">
          <Tv className="w-3 h-3" />
          Modo Apresentação
        </div>
        <p className="mockup-verse">
          Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito
        </p>
        <p className="mockup-ref">— João 3:16</p>
        <div className="mt-6 flex items-center gap-4 text-[10px] text-white/50">
          <span className="flex items-center gap-1.5">
            <Cast className="w-3 h-3" /> Projetando
          </span>
          <span className="flex items-center gap-1.5">
            <Smartphone className="w-3 h-3" /> QR Conectado
          </span>
        </div>
      </div>
    </div>
  );
}

function SectionHeading({ eyebrow, title, highlight, align = 'center' }: { eyebrow: string; title: React.ReactNode; highlight: React.ReactNode; align?: 'center' | 'left' }) {
  return (
    <div className={`mb-14 sm:mb-16 ${align === 'center' ? 'text-center' : ''}`}>
      <p className="eyebrow-label">{eyebrow}</p>
      <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light heading-premium">
        {title} <span className="italic text-primary">{highlight}</span>
      </h2>
      <div className={`h-px mt-6 bg-gradient-to-r from-transparent via-primary/30 to-transparent ${align === 'center' ? 'mx-auto w-20' : 'w-20'}`} />
    </div>
  );
}

function FeatureCard({ feature, index, t }: { feature: typeof featuresStatic[number]; index: number; t: (key: string) => string }) {
  const Icon = feature.icon;
  const title = t(`landing.features.${feature.featureKey}.title`);
  const desc = t(`landing.features.${feature.featureKey}.desc`);
  return (
    <ScrollReveal delay={index * 0.08}>
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`feature-card group relative h-full p-7 sm:p-8 rounded-2xl border bg-card/50 backdrop-blur-sm overflow-hidden ${
          feature.highlight ? 'border-amber-500/30 shadow-[var(--shadow-glow)]' : 'border-border/40'
        }`}
      >
        {feature.highlight && (
          <span className="absolute top-4 right-4 inline-flex items-center gap-1 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-black shadow-sm">
            <Sparkles className="w-2.5 h-2.5" /> Novo
          </span>
        )}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: 'radial-gradient(circle at 30% 20%, hsl(var(--primary) / 0.08) 0%, transparent 60%)' }} />
        <div className="relative z-10">
          <p className="step-number">{String(index + 1).padStart(2, '0')}</p>
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:scale-105 group-hover:bg-primary/15 transition-all duration-300">
            <Icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
          </div>
          <h3 className="font-semibold text-[15px] mb-2.5 text-foreground">{title}</h3>
          <p className="text-[13px] text-muted-foreground leading-relaxed">{desc}</p>
        </div>
      </motion.div>
    </ScrollReveal>
  );
}

export default function HomeClient() {
  const { t } = useTranslation();
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroY = useTransform(scrollY, [0, 400], [0, 60]);
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Header />
      <main id="main-content" className="relative">
        <section className="relative pt-28 sm:pt-32 pb-20 sm:pb-24 px-4 sm:px-6 overflow-hidden">
          <div className="hero-particles" aria-hidden="true" />
          <div className="hero-aurora" aria-hidden="true" />
          <div className="hero-divine-overlay" aria-hidden="true" />
          <HeroParticles disabled={prefersReducedMotion} />

          <motion.div style={{ opacity: heroOpacity, y: heroY }} className="max-w-6xl mx-auto text-center relative z-10 w-full">
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05, duration: 0.6 }} className="inline-flex items-center gap-2 mb-5">
              <span className="relative inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-emerald-500/15 to-emerald-500/5 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300">
                <Gift className="w-3.5 h-3.5" />
                <span className="text-[11px] font-bold tracking-[0.12em] uppercase">Acesso Livre</span>
                <span className="text-[11px] font-medium text-emerald-700/70 dark:text-emerald-300/70">·</span>
                <span className="text-[11px] font-semibold tracking-[0.05em]">Sem anúncios</span>
              </span>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }} className="inline-flex items-center gap-2 mb-7 px-3.5 py-1.5 rounded-full border border-primary/15 bg-primary/[0.04]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10.5px] font-medium tracking-[0.18em] uppercase text-muted-foreground">Estudo Bíblico</span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="wordmark text-[2rem] leading-[0.95] sm:text-6xl md:text-7xl lg:text-[5rem] xl:text-[5.5rem] mb-7 heading-premium">
              <span className="block">{t('landing.heroTitle1')}</span>
              <span className="block"><span className="gradient-text-animated">{t('landing.heroTitle2')}</span><span className="text-foreground">,</span></span>
              <span className="block italic text-foreground/85">{t('landing.heroTitle3')}</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8 }}
              className="font-sans text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-8 px-2">
              {t('landing.heroDescription')}
            </motion.p>

            {/* Social proof badges */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
              <span className="proof-badge"><BookOpen className="w-3.5 h-3.5" /> {t('landing.socialProof.translations')}</span>
              <span className="proof-badge"><Languages className="w-3.5 h-3.5" /> {t('landing.socialProof.entries')}</span>
              <span className="proof-badge"><Brain className="w-3.5 h-3.5" /> {t('landing.socialProof.ai')}</span>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75, duration: 0.6 }}
              className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-12 sm:mb-14">
              <Link href="/biblia" className="group relative inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-[15px] font-semibold rounded-xl overflow-hidden transition-all duration-300"
                style={{ background: 'linear-gradient(135deg, #f5cd6b 0%, #d4a843 50%, #b88a30 100%)', color: '#1c1300', boxShadow: '0 0 24px -4px rgba(212,168,67,0.4), 0 0 40px -8px rgba(212,168,67,0.2)' }}>
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <span className="relative">{t('landing.startStudy')}</span>
                <ArrowRight className="relative w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link href="/apresentar" className="group inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-[15px] font-semibold rounded-xl border border-border/60 hover:border-primary/40 hover:bg-primary/[0.04] transition-all duration-300">
                <Play className="w-4 h-4 fill-current" /> {t('landing.presentationSection.cta')}
              </Link>
              <Link href="/ia" className="group inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-[15px] font-semibold rounded-xl border border-primary/30 bg-primary/[0.06] hover:bg-primary/[0.12] hover:border-primary/50 transition-all duration-300">
                <Brain className="w-4 h-4 text-primary" strokeWidth={1.75} /> {t('landing.consultAI')}
              </Link>
            </motion.div>

            <RotatingVerse />
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} transition={{ delay: 1.6, duration: 1 }} className="absolute bottom-6 left-1/2 -translate-x-1/2">
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} className="flex flex-col items-center gap-1">
              <span className="text-[9px] uppercase tracking-[0.3em] text-muted-foreground">Scroll</span>
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            </motion.div>
          </motion.div>
        </section>

        <VerseDoDia />
        <ContinuarLeitura />
        <WordOfDayWidget />

        <section className="relative py-6 sm:py-8 px-4 sm:px-6" aria-label="Destaques do Sola Scriptura">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal>
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 sm:gap-x-10">
                {provasSociais.map((p, i) => {
                  const Icon = p.icon;
                  return (
                    <motion.div key={p.label} initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + i * 0.08, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="flex items-center gap-2 text-muted-foreground">
                      <Icon className="w-4 h-4 text-primary" strokeWidth={1.75} />
                      <span className="text-sm font-medium tracking-tight">{p.label}</span>
                    </motion.div>
                  );
                })}
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className="relative py-16 sm:py-20 px-4 sm:px-6 border-y border-border/30 bg-card/30" aria-label="Estatísticas do Sola Scriptura">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-4">
              {stats.map((stat, i) => (
                <ScrollReveal key={stat.labelKey} delay={i * 0.06}>
                  <div className="stat-card text-center p-3 sm:p-4 rounded-xl border border-border/30 bg-card/40 relative group">
                    <p className="font-display text-2xl sm:text-3xl md:text-4xl font-light tracking-tight relative">
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                    </p>
                    <p className="text-[10px] sm:text-[11px] text-muted-foreground uppercase tracking-wider mt-1.5 font-medium">{t(stat.labelKey)}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 sm:py-32 px-4 sm:px-6 relative" aria-label="Recursos">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>              <SectionHeading eyebrow={t('landing.resources')} title={t('landing.resourcesTitle1')} highlight={t('landing.resourcesTitle2')} /></ScrollReveal>
            {/* Bento grid irregular — BibleProject style */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
              {/* Card grande — 2 colunas */}
              <div className="sm:col-span-2 lg:col-span-2">
                <FeatureCard feature={featuresStatic[0]} index={0} t={t} />
              </div>
              {/* Cards normais */}
              <FeatureCard feature={featuresStatic[1]} index={1} t={t} />
              <FeatureCard feature={featuresStatic[2]} index={2} t={t} />
              {/* Card grande — 2 colunas */}
              <div className="sm:col-span-2 lg:col-span-2">
                <FeatureCard feature={featuresStatic[3]} index={3} t={t} />
              </div>
              {/* Cards normais */}
              <FeatureCard feature={featuresStatic[4]} index={4} t={t} />
              <FeatureCard feature={featuresStatic[5]} index={5} t={t} />
              {/* Card grande — destaque */}
              <div className="sm:col-span-2 lg:col-span-2">
                <FeatureCard feature={featuresStatic[6]} index={6} t={t} />
              </div>
              {/* Cards normais */}
              <FeatureCard feature={featuresStatic[7]} index={7} t={t} />
              <FeatureCard feature={featuresStatic[8]} index={8} t={t} />
              {/* Card grande — 2 colunas */}
              <div className="sm:col-span-2 lg:col-span-2">
                <FeatureCard feature={featuresStatic[9]} index={9} t={t} />
              </div>
              {/* Cards normais */}
              <FeatureCard feature={featuresStatic[10]} index={10} t={t} />
              <FeatureCard feature={featuresStatic[11]} index={11} t={t} />
            </div>
          </div>
        </section>

        {/* Carrossel horizontal de planos — YouVersion style */}
        <section className="py-20 sm:py-24 px-4 sm:px-6" aria-label="Planos de leitura em destaque">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <p className="eyebrow-label text-left">{t('landing.readingPlansSection.eyebrow')}</p>
                  <h2 className="font-display text-2xl sm:text-3xl font-light heading-premium">{t('landing.readingPlansSection.title')}</h2>
                </div>
                <Link href="/planos" className="text-sm font-medium text-primary hover:text-primary/80 transition-colors flex items-center gap-1">
                  {t('landing.readingPlansSection.viewAll')} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </ScrollReveal>
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
              {[
                { title: 'Salmos para Ansiedade', days: 7, category: 'Paz', color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400' },
                { title: 'Versículos de Esperança', days: 14, category: 'Esperança', color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' },
                { title: 'Fundamentos da Fé', days: 21, category: 'Fé', color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400' },
                { title: 'Amor em Ação', days: 10, category: 'Amor', color: 'bg-rose-500/10 text-rose-600 dark:text-rose-400' },
                { title: 'Cura Interior', days: 14, category: 'Cura', color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400' },
                { title: 'Sabedoria Provérbios', days: 31, category: 'Sabedoria', color: 'bg-orange-500/10 text-orange-600 dark:text-orange-400' },
              ].map((plano) => (
                <Link key={plano.title} href="/planos" className="flex-shrink-0 w-56 snap-start group">
                  <div className="h-32 rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 border border-border/40 p-5 flex flex-col justify-between group-hover:border-primary/30 transition-all duration-300">
                    <span className={`inline-flex self-start px-2.5 py-1 rounded-full text-[10px] font-semibold ${plano.color}`}>
                      {plano.category}
                    </span>
                    <div>
                      <h3 className="font-semibold text-sm mb-1 line-clamp-2">{plano.title}</h3>
                      <p className="text-[11px] text-muted-foreground">{plano.days} dias</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 sm:py-24 px-4 sm:px-6 border-y border-border/30 bg-card/20 relative overflow-hidden" aria-label="Recursos do Sola Scriptura">
          <div className="max-w-6xl mx-auto relative z-10">
            <ScrollReveal>
              <div className="text-center mb-10">
                <p className="eyebrow-label">{t('landing.dataSection.eyebrow')}</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-5 max-w-3xl mx-auto">
                  {[
                    { labelKey: 'landing.dataSection.commentaries.label', descKey: 'landing.dataSection.commentaries.desc' },
                    { labelKey: 'landing.dataSection.lexicon.label', descKey: 'landing.dataSection.lexicon.desc' },
                    { labelKey: 'landing.dataSection.crossRefs.label', descKey: 'landing.dataSection.crossRefs.desc' },
                    { labelKey: 'landing.dataSection.translations.label', descKey: 'landing.dataSection.translations.desc' },
                  ].map((item) => (
                    <div key={item.labelKey} className="text-center p-4">
                      <p className="text-sm font-semibold text-foreground mb-1.5">{t(item.labelKey)}</p>
                      <p className="text-[11px] text-muted-foreground leading-relaxed">{t(item.descKey)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className="py-24 sm:py-32 px-4 sm:px-6 relative" aria-label="Como estudar">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal><SectionHeading eyebrow={t('landing.howToStudy eyebrow')} title={t('landing.howToStudyTitle1')} highlight={t('landing.howToStudyTitle2')} /></ScrollReveal>
            <div className="grid md:grid-cols-3 gap-5 sm:gap-6">
              {comoEstudarStatic.map((step, i) => {
                const Icon = step.icon;
                return (
                  <ScrollReveal key={step.step} delay={i * 0.12}>
                    <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.3 }}
                      className="group relative h-full p-7 rounded-2xl border border-border/40 bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-500 overflow-hidden">
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                        style={{ background: 'radial-gradient(circle at 30% 20%, hsl(var(--primary) / 0.1) 0%, transparent 60%)' }} />
                      <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-5">
                          <span className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-primary/15 transition-all duration-300">
                            <Icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                          </span>
                          <span className="step-badge">{step.step}</span>
                        </div>
                        <h3 className="font-display text-xl sm:text-2xl font-medium mb-2 leading-tight">{t(`landing.howToStudy.${step.key}.title`)}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{t(`landing.howToStudy.${step.key}.desc`)}</p>
                      </div>
                    </motion.div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-24 sm:py-32 px-4 sm:px-6 relative bg-card/30 border-y border-border/30" aria-label="Como funciona">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal><SectionHeading eyebrow={t('landing.howItWorks eyebrow')} title={t('landing.howItWorksTitle1')} highlight={t('landing.howItWorksTitle2')} /></ScrollReveal>
            <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
              {comoFuncionaStatic.map((step, i) => (
                <ScrollReveal key={step.step} delay={i * 0.1}>
                  <div className="relative h-full p-7 sm:p-8 rounded-2xl border border-border/40 bg-card/50 hover:border-primary/30 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-5">
                      <span className="step-badge">{step.step}</span>
                      {i < comoFuncionaStatic.length - 1 && (
                        <span className="hidden md:block flex-1 h-px" style={{ background: 'linear-gradient(90deg, hsl(var(--primary) / 0.3), transparent)' }} aria-hidden="true" />
                      )}
                    </div>
                    <h3 className="font-display text-xl sm:text-2xl font-medium mb-2.5 leading-tight">{t(`landing.howItWorks.${step.key}.title`)}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{t(`landing.howItWorks.${step.key}.desc`)}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 sm:py-32 px-4 sm:px-6 relative overflow-hidden" aria-label="Modo Apresentação para grupos"
          style={{ background: 'linear-gradient(180deg, transparent 0%, hsl(var(--primary) / 0.04) 50%, transparent 100%)' }}>
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-amber-500/[0.06] blur-3xl" />
            <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-orange-500/[0.05] blur-3xl" />
          </div>
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <div>
                <ScrollReveal>
                  <p className="eyebrow-label text-amber-600 dark:text-amber-400 flex items-center gap-2">
                    <MonitorPlay className="w-3.5 h-3.5" /> {t('landing.presentationSection.eyebrow')}
                  </p>
                  <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-light heading-premium mb-6">
                    {t('landing.presentationSection.title1')}<br /><span className="italic text-primary">{t('landing.presentationSection.title2')}</span>
                  </h2>
                  <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-8 max-w-lg">
                    {t('landing.presentationSection.desc')}
                  </p>
                  <ul className="space-y-3 mb-9">
                    {[t('landing.presentationSection.item1'), t('landing.presentationSection.item2'), t('landing.presentationSection.item3')].map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm sm:text-[15px]">
                        <span className="mt-0.5 w-5 h-5 rounded-full bg-primary/15 text-primary flex items-center justify-center shrink-0"><CheckCircle2 className="w-3.5 h-3.5" /></span>
                        <span className="text-foreground/90">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-3">
                    <Link href="/apresentar" className="group relative inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-xl overflow-hidden transition-all duration-300"
                      style={{ background: 'linear-gradient(135deg, #f5cd6b 0%, #d4a843 50%, #b88a30 100%)', color: '#1c1300', boxShadow: '0 8px 24px -6px rgba(212,168,67,0.45)' }}>
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                      <span className="relative">{t('landing.presentationSection.cta')}</span>
                      <ArrowRight className="relative w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                    <Link href="/biblia" className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold border border-border/60 hover:border-primary/40 hover:bg-primary/[0.04] rounded-xl transition-all duration-300">
                      <BookOpen className="w-4 h-4" /> {t('landing.presentationSection.openBible')}
                    </Link>
                  </div>
                </ScrollReveal>
              </div>
              <ScrollReveal direction="right">
                <div className="relative">
                  <ApresentacaoMockup />
                  <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-amber-500/20 blur-2xl -z-10" />
                  <div className="absolute -top-4 -left-4 w-20 h-20 rounded-full bg-amber-500/15 blur-2xl -z-10" />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section className="py-20 sm:py-24 px-4 sm:px-6 relative" aria-label="Compare traduções">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <Link href="/comparar" className="group relative block overflow-hidden rounded-3xl border border-border/40 bg-card/50 backdrop-blur-sm hover:border-primary/40 transition-all duration-300 p-8 sm:p-12">
                <div className="absolute inset-0 opacity-60 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: 'radial-gradient(circle at 85% 15%, hsl(var(--primary) / 0.12) 0%, transparent 55%)' }} />
                <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:gap-10">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-primary/15 transition-all duration-300">
                    <GitCompareArrows className="w-6 h-6 text-primary" strokeWidth={1.5} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="eyebrow-label text-primary/80">{t('landing.compareSection.eyebrow')}</p>
                    <h3 className="font-display text-2xl sm:text-3xl font-light heading-premium mb-2">{t('landing.compareSection.title1')} <span className="italic text-primary">{t('landing.compareSection.title2')}</span></h3>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl">{t('landing.compareSection.desc')}</p>
                  </div>
                  <span className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold rounded-xl border border-primary/30 bg-primary/[0.06] group-hover:bg-primary/[0.12] group-hover:border-primary/50 transition-all duration-300 shrink-0">
                    {t('landing.compareSection.cta')} <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </Link>
            </ScrollReveal>
          </div>
        </section>

        <section className="py-24 sm:py-32 px-4 sm:px-6 border-t border-border/30 relative overflow-hidden" aria-label="Comece a estudar">
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 20% 80%, hsl(var(--primary)) 0%, transparent 40%), radial-gradient(circle at 80% 20%, hsl(var(--primary)) 0%, transparent 40%)' }} />
          </div>
          <div className="max-w-3xl mx-auto text-center relative z-10">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/15 bg-primary/[0.04] mb-7">
                <Zap className="w-3.5 h-3.5 text-primary" />
                <span className="text-[10.5px] font-medium tracking-[0.18em] uppercase text-muted-foreground">{t('landing.ctaSection.badge')}</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light heading-premium mb-5">
                {t('landing.ctaSection.title1')}<br /><span className="italic gradient-text-animated">{t('landing.ctaSection.title2')}</span>
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground mb-10 max-w-lg mx-auto leading-relaxed">
                {t('landing.ctaSection.desc')}
              </p>
              <div className="flex flex-wrap gap-3 justify-center mb-12">
                <Link href="/biblia" className="cta-gradient group relative inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 text-sm font-semibold rounded-xl">
                  <BookOpen className="relative w-4 h-4" /><span className="relative">{t('landing.ctaSection.cta1')}</span>
                  <ArrowRight className="relative w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <Link href="/ia" className="group inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 text-sm font-semibold rounded-xl border border-primary/30 bg-primary/[0.06] hover:bg-primary/[0.12] hover:border-primary/50 transition-all duration-300">
                  <Brain className="w-4 h-4 text-primary" strokeWidth={1.75} /> {t('landing.ctaSection.cta2')}
                </Link>
              </div>
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-2.5">
                {[{ label: t('landing.ctaSection.noAds'), icon: Shield }, { label: t('landing.ctaSection.openSource'), icon: Globe }, { label: t('landing.ctaSection.private'), icon: Heart }].map((badge) => (
                  <div key={badge.label} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <badge.icon className="w-3.5 h-3.5 text-primary" />{badge.label}
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>
        <section className="py-16 sm:py-20 px-4 sm:px-6 border-t border-border/30 relative" aria-label="Notificações">
          <div className="max-w-md mx-auto text-center">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/15 bg-primary/[0.04] mb-6">
                <Bell className="w-3.5 h-3.5 text-primary" />
                <span className="text-[10.5px] font-medium tracking-[0.18em] uppercase text-muted-foreground">{t('landing.notificationsSection.badge')}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-6 max-w-sm mx-auto">
                {t('landing.notificationsSection.desc')}
              </p>
              <NotificationSetup />
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
      <InstallBanner />
    </div>
  );
}
