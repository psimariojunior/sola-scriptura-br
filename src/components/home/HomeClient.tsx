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

const HeroParticles = dynamic(() => import('@/components/home/HeroParticles').then(m => ({ default: m.HeroParticles })), { ssr: false });
const RotatingVerse = dynamic(() => import('@/components/home/RotatingVerse').then(m => ({ default: m.RotatingVerse })), { ssr: false });
const AnimatedCounter = dynamic(() => import('@/components/home/AnimatedCounter').then(m => ({ default: m.AnimatedCounter })), { ssr: false });
const VerseDoDia = dynamic(() => import('@/components/VerseDoDia'), { ssr: false });
const ContinuarLeitura = dynamic(() => import('@/components/ContinuarLeitura'), { ssr: false });
const WordOfDayWidget = dynamic(() => import('@/components/WordOfDay').then(m => ({ default: m.WordOfDay })), { ssr: false });
const InstallBanner = dynamic(() => import('@/components/InstallBanner'), { ssr: false });
const NotificationSetup = dynamic(() => import('@/components/NotificationSetup').then(m => ({ default: m.NotificationSetup })), { ssr: false });

const features = [
  { icon: Columns2, title: 'Multi-Tradução', desc: 'ARC, NVI, ARA, ACF, KJV e WEB lado a lado com destaque automático de diferenças.', accent: 'amber' },
  { icon: ScrollText, title: 'Exegese Versículo a Versículo', desc: 'Análise contextual, gramatical e teológica para cada versículo, com referências cruzadas.', accent: 'emerald' },
  { icon: Brain, title: 'IA Teológica', desc: 'Assistente treinado em teologia reformada e exegese bíblica — respostas fundamentadas.', accent: 'purple' },
  { icon: Map, title: 'Atlas Bíblico Interativo', desc: 'Mapas detalhados de locais bíblicos com rotas narrativas e contexto histórico.', accent: 'sky' },
  { icon: Music, title: 'Áudio com Narração Dramática', desc: 'ElevenLabs + Web Speech API: narração profissional com vozes por personagem.', accent: 'rose' },
  { icon: MonitorPlay, title: 'Modo Apresentação', desc: 'Projete versículos em TVs e projetores via QR code — sem instalar nada.', accent: 'gold', highlight: true },
  { icon: Languages, title: 'Línguas Originais (Strong)', desc: 'Grego Koiné e Hebraico Bíblico com léxico Strong palavra por palavra.', accent: 'violet' },
  { icon: Brain, title: 'Concordância & Crítica Textual', desc: 'Pesquise cada palavra em toda a Bíblia e compare manuscritos antigos.', accent: 'cyan' },
  { icon: BookMarked, title: 'Flashcards & Memorização', desc: 'Memorize versículos e conceitos com decks inteligentes e revisão espaçada.', accent: 'rose' },
  { icon: GraduationCap, title: 'Planos de Leitura', desc: 'Cronogramas estruturados para leitura diária de toda a Escritura.', accent: 'emerald' },
  { icon: WifiOff, title: 'Modo Offline', desc: 'Leve a Bíblia e seus estudos para qualquer lugar, mesmo sem internet.', accent: 'slate' },
  { icon: Share2, title: 'Compartilhar Versículos', desc: 'Crie imagens lindas de versículos para compartilhar em redes sociais.', accent: 'amber' },
];

const comoEstudar = [
  { step: '01', title: 'Escolha sua tradução', desc: 'Selecione entre ARC, NVI, ARA, ACF, KJV e WEB. Compare versões lado a lado para entender cada nuance.', icon: Columns2 },
  { step: '02', title: 'Explore as línguas originais', desc: 'Mergulhe no grego e hebraico com o léxico Strong, concordância e crítica textual — direto na página.', icon: Languages },
  { step: '03', title: 'Pergunte à IA', desc: 'Tire dúvidas teológicas com o assistente treinado em exegese reformada, fundamentado na Escritura.', icon: Brain },
];

const comoFunciona = [
  { step: '01', title: 'Abra qualquer versículo', desc: 'Navegue pelas 6 traduções, escolha o livro e capítulo. Recursos aparecem ao lado.' },
  { step: '02', title: 'Explore os recursos', desc: 'Comentários de teólogos clássicos, grego e hebraico, referências cruzadas, áudio e mais.' },
  { step: '03', title: 'Apresente em qualquer tela', desc: 'Abra o modo Apresentação, escaneie o QR code e compartilhe versículos em tempo real.' },
];

const paraGrupos = ['Projete versículos em qualquer tela', 'Ideal para cultos, células, escolas bíblicas', 'Sem instalação, sem cadastro'];

const trustBadges = [
  { label: 'Sem anúncios', icon: Shield },
  { label: 'Código aberto', icon: Globe },
  { label: 'Dados privados', icon: Heart },
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
  { value: 66, label: 'Livros', suffix: '' },
  { value: 6, label: 'Traduções', suffix: '' },
  { value: 31102, label: 'Versículos', suffix: '' },
  { value: 29266, label: 'Ref. Cruzadas', suffix: '' },
  { value: 4911, label: 'Comentários', suffix: '' },
  { value: 14200, label: 'Verbetes', suffix: '' },
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

function FeatureCard({ feature, index }: { feature: typeof features[number]; index: number }) {
  const Icon = feature.icon;
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
          <h3 className="font-semibold text-[15px] mb-2.5 text-foreground">{feature.title}</h3>
          <p className="text-[13px] text-muted-foreground leading-relaxed">{feature.desc}</p>
        </div>
      </motion.div>
    </ScrollReveal>
  );
}

export default function HomeClient() {
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
              className="wordmark text-[2.75rem] leading-[0.95] sm:text-6xl md:text-7xl lg:text-[5rem] xl:text-[5.5rem] mb-7 heading-premium">
              <span className="block">Estude a Bíblia</span>
              <span className="block"><span className="gradient-text-animated">em profundidade</span><span className="text-foreground">,</span></span>
              <span className="block italic text-foreground/85">gratuitamente.</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8 }}
              className="font-sans text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-8 px-2">
              6 traduções da Bíblia, comentários de teólogos clássicos, léxico grego e hebraico, referências cruzadas, IA teológica e modo apresentação para igrejas e células.
            </motion.p>

            {/* Social proof badges */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
              <span className="proof-badge"><BookOpen className="w-3.5 h-3.5" /> 10 traduções</span>
              <span className="proof-badge"><Languages className="w-3.5 h-3.5" /> 14.200 verbetes</span>
              <span className="proof-badge"><Brain className="w-3.5 h-3.5" /> IA teológica</span>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75, duration: 0.6 }}
              className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-12 sm:mb-14">
              <Link href="/biblia" className="group relative inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-[15px] font-semibold rounded-xl overflow-hidden transition-all duration-300"
                style={{ background: 'linear-gradient(135deg, #f5cd6b 0%, #d4a843 50%, #b88a30 100%)', color: '#1c1300', boxShadow: '0 0 24px -4px rgba(212,168,67,0.4), 0 0 40px -8px rgba(212,168,67,0.2)' }}>
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <span className="relative">Começar a Estudar</span>
                <ArrowRight className="relative w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link href="/apresentar" className="group inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-[15px] font-semibold rounded-xl border border-border/60 hover:border-primary/40 hover:bg-primary/[0.04] transition-all duration-300">
                <Play className="w-4 h-4 fill-current" /> Apresentar em Tela
              </Link>
              <Link href="/ia" className="group inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-[15px] font-semibold rounded-xl border border-primary/30 bg-primary/[0.06] hover:bg-primary/[0.12] hover:border-primary/50 transition-all duration-300">
                <Brain className="w-4 h-4 text-primary" strokeWidth={1.75} /> Conheça a IA
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
                <ScrollReveal key={stat.label} delay={i * 0.06}>
                  <div className="stat-card text-center p-3 sm:p-4 rounded-xl border border-border/30 bg-card/40 relative group">
                    <p className="font-display text-2xl sm:text-3xl md:text-4xl font-light tracking-tight relative">
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                    </p>
                    <p className="text-[10px] sm:text-[11px] text-muted-foreground uppercase tracking-wider mt-1.5 font-medium">{stat.label}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 sm:py-32 px-4 sm:px-6 relative" aria-label="Recursos">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal><SectionHeading eyebrow="Recursos" title="Tudo que você precisa para" highlight="estudar a Palavra." /></ScrollReveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {features.map((f, i) => (<FeatureCard key={f.title} feature={f} index={i} />))}
            </div>
          </div>
        </section>

        <section className="py-20 sm:py-24 px-4 sm:px-6 border-y border-border/30 bg-card/20 relative overflow-hidden" aria-label="Recursos do Sola Scriptura">
          <div className="max-w-6xl mx-auto relative z-10">
            <ScrollReveal>
              <div className="text-center mb-10">
                <p className="eyebrow-label">Dados da plataforma</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-5 max-w-3xl mx-auto">
                  {[
                    { label: 'Comentários', desc: 'Matthew Henry, Adam Clarke, John Gill e outros (domínio público)' },
                    { label: 'Léxico Strong', desc: '5.526 gregos + 8.674 hebraicos, fonte: Strong\'s Exhaustive Concordance' },
                    { label: 'Referências Cruzadas', desc: '29.266 refs do Treasury of Scripture Knowledge (TSK)' },
                    { label: 'Traduções', desc: 'ARC, ARA, ACF, KJV, NVI, WEB — gratuitas via API MidVash' },
                  ].map((item) => (
                    <div key={item.label} className="text-center p-4">
                      <p className="text-sm font-semibold text-foreground mb-1.5">{item.label}</p>
                      <p className="text-[11px] text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className="py-24 sm:py-32 px-4 sm:px-6 relative" aria-label="Como estudar">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal><SectionHeading eyebrow="Como Estudar" title="Seu estudo em" highlight="3 passos." /></ScrollReveal>
            <div className="grid md:grid-cols-3 gap-5 sm:gap-6">
              {comoEstudar.map((step, i) => {
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
                        <h3 className="font-display text-xl sm:text-2xl font-medium mb-2 leading-tight">{step.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
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
            <ScrollReveal><SectionHeading eyebrow="Como Funciona" title="Comece a estudar em" highlight="3 passos." /></ScrollReveal>
            <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
              {comoFunciona.map((step, i) => (
                <ScrollReveal key={step.step} delay={i * 0.1}>
                  <div className="relative h-full p-7 sm:p-8 rounded-2xl border border-border/40 bg-card/50 hover:border-primary/30 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-5">
                      <span className="step-badge">{step.step}</span>
                      {i < comoFunciona.length - 1 && (
                        <span className="hidden md:block flex-1 h-px" style={{ background: 'linear-gradient(90deg, hsl(var(--primary) / 0.3), transparent)' }} aria-hidden="true" />
                      )}
                    </div>
                    <h3 className="font-display text-xl sm:text-2xl font-medium mb-2.5 leading-tight">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
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
                    <MonitorPlay className="w-3.5 h-3.5" /> Para Grupos e Igrejas
                  </p>
                  <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-light heading-premium mb-6">
                    Mostre a Palavra<br /><span className="italic text-primary">em qualquer tela.</span>
                  </h2>
                  <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-8 max-w-lg">
                    O Modo Apresentação transforma qualquer TV, projetor ou monitor em uma ferramenta de culto. Controle tudo do seu celular via QR code.
                  </p>
                  <ul className="space-y-3 mb-9">
                    {paraGrupos.map((item) => (
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
                      <span className="relative">Experimentar Modo Apresentação</span>
                      <ArrowRight className="relative w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                    <Link href="/biblia" className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold border border-border/60 hover:border-primary/40 hover:bg-primary/[0.04] rounded-xl transition-all duration-300">
                      <BookOpen className="w-4 h-4" /> Abrir a Bíblia
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
                    <p className="eyebrow-label text-primary/80">Comparação</p>
                    <h3 className="font-display text-2xl sm:text-3xl font-light heading-premium mb-2">Compare traduções <span className="italic text-primary">lado a lado</span></h3>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl">Veja até 3 versões do mesmo versículo simultaneamente e descubra as diferenças de tradução que mudam o entendimento do texto bíblico.</p>
                  </div>
                  <span className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold rounded-xl border border-primary/30 bg-primary/[0.06] group-hover:bg-primary/[0.12] group-hover:border-primary/50 transition-all duration-300 shrink-0">
                    Experimentar <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
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
                <span className="text-[10.5px] font-medium tracking-[0.18em] uppercase text-muted-foreground">100% Gratuito · Sem anúncios</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light heading-premium mb-5">
                Comece hoje o seu<br /><span className="italic gradient-text-animated">estudo bíblico.</span>
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground mb-10 max-w-lg mx-auto leading-relaxed">
                Acesse todas as ferramentas gratuitamente. Estude a Bíblia com o rigor acadêmico que ela merece — e leve a Palavra para sua igreja.
              </p>
              <div className="flex flex-wrap gap-3 justify-center mb-12">
                <Link href="/biblia" className="cta-gradient group relative inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 text-sm font-semibold rounded-xl">
                  <BookOpen className="relative w-4 h-4" /><span className="relative">Comece a estudar a Bíblia hoje</span>
                  <ArrowRight className="relative w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <Link href="/ia" className="group inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 text-sm font-semibold rounded-xl border border-primary/30 bg-primary/[0.06] hover:bg-primary/[0.12] hover:border-primary/50 transition-all duration-300">
                  <Brain className="w-4 h-4 text-primary" strokeWidth={1.75} /> Conheça a IA
                </Link>
              </div>
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-2.5">
                {trustBadges.map((badge) => (
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
                <span className="text-[10.5px] font-medium tracking-[0.18em] uppercase text-muted-foreground">Versículo Diário</span>
              </div>
              <p className="text-sm text-muted-foreground mb-6 max-w-sm mx-auto">
                Receba um versículo inspirador toda manhã às 7h direto no seu navegador.
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
