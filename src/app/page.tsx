'use client';

import Link from 'next/link';
import { useState, useEffect, useRef, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const InstallBanner = dynamic(() => import('@/components/InstallBanner'), { ssr: false });

import {
  BookOpen, Map, Brain, ScrollText, ArrowRight, Sparkles, Columns2,
  Globe, Shield, Heart, MonitorPlay, Music, Zap, Play,
  CheckCircle2, ChevronDown, Tv, Smartphone, Cast,
} from 'lucide-react';
import {
  motion, useScroll, useTransform, useInView, AnimatePresence,
} from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';

const features = [
  {
    icon: Columns2,
    title: 'Multi-Tradução',
    desc: 'ARC, NVI, ARA, ACF, KJV e WEB lado a lado com destaque automático de diferenças.',
    accent: 'amber',
  },
  {
    icon: ScrollText,
    title: 'Exegese Versículo a Versículo',
    desc: 'Análise contextual, gramatical e teológica para cada versículo, com referências cruzadas.',
    accent: 'emerald',
  },
  {
    icon: Brain,
    title: 'IA Teológica',
    desc: 'Assistente treinado em teologia reformada e exegese bíblica — respostas fundamentadas.',
    accent: 'purple',
  },
  {
    icon: Map,
    title: 'Atlas Bíblico Interativo',
    desc: 'Mapas detalhados de locais bíblicos com rotas narrativas e contexto histórico.',
    accent: 'sky',
  },
  {
    icon: Music,
    title: 'Áudio com Narração Dramática',
    desc: 'ElevenLabs + Web Speech API: narração profissional com vozes por personagem.',
    accent: 'rose',
  },
  {
    icon: MonitorPlay,
    title: 'Modo Apresentação',
    desc: 'Projete versículos em TVs e projetores via QR code — sem instalar nada.',
    accent: 'gold',
    highlight: true,
  },
];

const comoFunciona = [
  {
    step: '01',
    title: 'Abra qualquer versículo',
    desc: 'Navegue pelas 6 traduções, escolha o livro e capítulo. Recursos aparecem ao lado.',
  },
  {
    step: '02',
    title: 'Explore os recursos',
    desc: 'Comentários de 80+ teólogos, grego e hebraico, referências cruzadas, áudio e mais.',
  },
  {
    step: '03',
    title: 'Apresente em qualquer tela',
    desc: 'Abra o modo Apresentação, escaneie o QR code e compartilhe versículos em tempo real.',
  },
];

const paraGrupos = [
  'Projete versículos em qualquer tela',
  'Ideal para cultos, células, escolas bíblicas',
  'Sem instalação, sem cadastro, sem custo',
];

const trustBadges = [
  { label: 'Gratuito para sempre', icon: CheckCircle2 },
  { label: 'Sem anúncios', icon: Shield },
  { label: 'Código aberto', icon: Globe },
  { label: 'Dados privados', icon: Heart },
];

const heroVerses = [
  {
    text: 'Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.',
    ref: 'João 3:16',
  },
  {
    text: 'No princípio era o Verbo, e o Verbo estava com Deus, e o Verbo era Deus.',
    ref: 'João 1:1',
  },
  {
    text: 'Confia no Senhor de todo o teu coração e não te estribes no teu próprio entendimento.',
    ref: 'Provérbios 3:5',
  },
  {
    text: 'O Senhor é o meu pastor; nada me faltará.',
    ref: 'Salmos 23:1',
  },
  {
    text: 'Tudo posso naquele que me fortalece.',
    ref: 'Filipenses 4:13',
  },
  {
    text: 'E sabemos que todas as coisas contribuem juntamente para o bem daqueles que amam a Deus.',
    ref: 'Romanos 8:28',
  },
];

const stats = [
  { value: 66, label: 'Livros', suffix: '' },
  { value: 6, label: 'Traduções', suffix: '' },
  { value: 31102, label: 'Versículos', suffix: '' },
  { value: 1000, label: 'Comentários', suffix: '+' },
  { value: 405, label: 'Estudos', suffix: '' },
  { value: 1150, label: 'Verbetes', suffix: '+' },
];

function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const startTime = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayed(Math.floor(eased * value));
      if (progress >= 1) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref} className="hero-counter">
      {displayed.toLocaleString('pt-BR')}
      {suffix}
    </span>
  );
}

function RotatingVerse() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((p) => (p + 1) % heroVerses.length), 5000);
    return () => clearInterval(t);
  }, []);

  const verse = heroVerses[idx];

  return (
    <div className="relative min-h-[120px] sm:min-h-[140px] flex items-center justify-center max-w-3xl mx-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={verse.ref}
          initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -12, filter: 'blur(6px)' }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center"
        >
          <p className="font-serif-body text-base sm:text-lg italic font-light text-content-secondary dark:text-foreground/80 leading-relaxed">
            <span aria-hidden="true" className="text-primary/40 mr-1">&ldquo;</span>
            {verse.text}
            <span aria-hidden="true" className="text-primary/40 ml-1">&rdquo;</span>
          </p>
          <p className="mt-3 text-xs font-semibold tracking-[0.25em] uppercase text-primary">
            — {verse.ref}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const stars = Array.from({ length: 90 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 1.4 + 0.3,
      speed: Math.random() * 0.12 + 0.04,
      opacity: Math.random() * 0.5 + 0.15,
      twinkle: Math.random() * 0.02 + 0.004,
      offset: Math.random() * Math.PI * 2,
    }));

    let t = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.016;
      stars.forEach((s) => {
        s.y -= s.speed;
        if (s.y < -5) {
          s.y = canvas.height + 5;
          s.x = Math.random() * canvas.width;
        }
        const tw = Math.sin(t * 2 + s.offset) * 0.3 + 0.7;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212,168,67,${s.opacity * tw})`;
        ctx.fill();
      });
      rafRef.current = requestAnimationFrame(draw);
    };
    draw();
    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" aria-hidden="true" />;
}

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

function SectionHeading({
  eyebrow,
  title,
  highlight,
  align = 'center',
}: {
  eyebrow: string;
  title: React.ReactNode;
  highlight: React.ReactNode;
  align?: 'center' | 'left';
}) {
  return (
    <div className={`mb-12 sm:mb-14 ${align === 'center' ? 'text-center' : ''}`}>
      <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-muted-foreground mb-3">
        {eyebrow}
      </p>
      <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light leading-[1.1] tracking-tight">
        {title} <span className="italic text-primary">{highlight}</span>
      </h2>
      <div
        className={`h-px mt-5 bg-gradient-to-r from-transparent via-primary/40 to-transparent ${
          align === 'center' ? 'mx-auto w-16' : 'w-16'
        }`}
      />
    </div>
  );
}

function FeatureCard({ feature, index }: { feature: typeof features[number]; index: number }) {
  const Icon = feature.icon;
  return (
    <ScrollReveal delay={index * 0.08}>
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ duration: 0.3 }}
        className={`group relative h-full p-6 sm:p-7 rounded-2xl border bg-card/50 backdrop-blur-sm transition-all duration-500 overflow-hidden card-hover ${
          feature.highlight
            ? 'border-amber-500/30 shadow-[var(--shadow-glow)]'
            : 'border-border/40'
        }`}
      >
        {feature.highlight && (
          <span className="absolute top-3 right-3 inline-flex items-center gap-1 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-black shadow-sm">
            <Sparkles className="w-2.5 h-2.5" /> Novo
          </span>
        )}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 30% 20%, hsl(var(--primary) / 0.1) 0%, transparent 60%)',
          }}
        />
        <div className="relative z-10">
          <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-primary/15 transition-all duration-300">
            <Icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
          </div>
          <h3 className="font-semibold text-base mb-2 text-foreground">{feature.title}</h3>
          <p className="text-[13px] text-muted-foreground leading-relaxed">{feature.desc}</p>
        </div>
      </motion.div>
    </ScrollReveal>
  );
}

export default function Home() {
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroY = useTransform(scrollY, [0, 400], [0, 60]);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Header />

      {/* HERO */}
      <section
        id="main-content"
        className="relative pt-28 sm:pt-32 pb-20 sm:pb-24 px-4 sm:px-6 overflow-hidden"
        aria-label="Seção principal — Apresentação do Sola Scriptura"
      >
        <div className="hero-particles" aria-hidden="true" />
        <HeroParticles />

        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="max-w-6xl mx-auto text-center relative z-10 w-full"
        >
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="inline-flex items-center gap-2 mb-7 px-3.5 py-1.5 rounded-full border border-primary/15 bg-primary/[0.04]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10.5px] font-medium tracking-[0.18em] uppercase text-muted-foreground">
              Estudo Bíblico Acadêmico
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="wordmark text-[2.75rem] leading-[0.95] sm:text-6xl md:text-7xl lg:text-[5rem] xl:text-[5.5rem] mb-7"
          >
            <span className="block">Toda a biblioteca</span>
            <span className="block">
              <span className="wordmark-sola">teológica</span>
              <span className="text-foreground">,</span>
            </span>
            <span className="block italic text-foreground/85">em um só lugar.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="font-sans text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-10 sm:mb-12 px-2"
          >
            Estude a Bíblia em profundidade, com comentários de 80+ teólogos, 6 traduções,
            IA teológica e modo apresentação para igrejas e células.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-12 sm:mb-14"
          >
            <Link
              href="/biblia"
              className="group relative inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-[15px] font-semibold rounded-xl overflow-hidden transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, #f5cd6b 0%, #d4a843 50%, #b88a30 100%)',
                color: '#1c1300',
                boxShadow:
                  '0 0 24px -4px rgba(212,168,67,0.4), 0 0 40px -8px rgba(212,168,67,0.2)',
              }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative">Começar a Estudar</span>
              <ArrowRight className="relative w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/apresentar"
              className="group inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-[15px] font-semibold rounded-xl border border-border/60 hover:border-primary/40 hover:bg-primary/[0.04] transition-all duration-300"
            >
              <Play className="w-4 h-4 fill-current" />
              Apresentar em Tela
            </Link>
          </motion.div>

          <RotatingVerse />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 1.6, duration: 1 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-1"
          >
            <span className="text-[9px] uppercase tracking-[0.3em] text-muted-foreground">Scroll</span>
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </motion.div>
        </motion.div>
      </section>

      {/* STATS */}
      <section
        className="relative py-16 sm:py-20 px-4 sm:px-6 border-y border-border/30 bg-card/30"
        aria-label="Estatísticas do Sola Scriptura"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-4">
            {stats.map((stat, i) => (
              <ScrollReveal key={stat.label} delay={i * 0.06}>
                <div className="text-center p-3 sm:p-4 rounded-xl border border-border/30 bg-card/40 hover:border-primary/25 transition-all duration-300 relative group">
                  <div
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ boxShadow: '0 0 24px -8px hsl(var(--primary) / 0.3)' }}
                  />
                  <p className="font-display text-2xl sm:text-3xl md:text-4xl font-light tracking-tight relative">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="text-[10px] sm:text-[11px] text-muted-foreground uppercase tracking-wider mt-1.5 font-medium">
                    {stat.label}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 relative" aria-label="Recursos">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <SectionHeading
              eyebrow="Recursos"
              title="Tudo que você precisa para"
              highlight="estudar a Palavra."
            />
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {features.map((f, i) => (
              <FeatureCard key={f.title} feature={f} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section
        className="py-20 sm:py-28 px-4 sm:px-6 relative bg-card/30 border-y border-border/30"
        aria-label="Como funciona"
      >
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <SectionHeading
              eyebrow="Como Funciona"
              title="Comece a estudar em"
              highlight="3 passos."
            />
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            {comoFunciona.map((step, i) => (
              <ScrollReveal key={step.step} delay={i * 0.1}>
                <div className="relative h-full p-6 sm:p-7 rounded-2xl border border-border/40 bg-card/50 hover:border-primary/30 transition-all duration-500">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="step-badge">{step.step}</span>
                    {i < comoFunciona.length - 1 && (
                      <span
                        className="hidden md:block flex-1 h-px"
                        style={{
                          background:
                            'linear-gradient(90deg, hsl(var(--primary) / 0.3), transparent)',
                        }}
                        aria-hidden="true"
                      />
                    )}
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-medium mb-2 leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* PARA GRUPOS E IGREJAS — destaque do Modo Apresentação */}
      <section
        className="py-20 sm:py-28 px-4 sm:px-6 relative overflow-hidden"
        aria-label="Modo Apresentação para grupos"
        style={{
          background:
            'linear-gradient(180deg, transparent 0%, hsl(var(--primary) / 0.04) 50%, transparent 100%)',
        }}
      >
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-amber-500/[0.06] blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-orange-500/[0.05] blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <ScrollReveal>
                <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-amber-600 dark:text-amber-400 mb-4 flex items-center gap-2">
                  <MonitorPlay className="w-3.5 h-3.5" />
                  Para Grupos e Igrejas
                </p>
                <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-light leading-[1.05] tracking-tight mb-6">
                  Mostre a Palavra
                  <br />
                  <span className="italic text-primary">em qualquer tela.</span>
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-8 max-w-lg">
                  O Modo Apresentação transforma qualquer TV, projetor ou monitor em uma
                  ferramenta de culto. Controle tudo do seu celular via QR code.
                </p>

                <ul className="space-y-3 mb-9">
                  {paraGrupos.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm sm:text-[15px]">
                      <span className="mt-0.5 w-5 h-5 rounded-full bg-primary/15 text-primary flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </span>
                      <span className="text-foreground/90">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/apresentar"
                    className="group relative inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-xl overflow-hidden transition-all duration-300"
                    style={{
                      background: 'linear-gradient(135deg, #f5cd6b 0%, #d4a843 50%, #b88a30 100%)',
                      color: '#1c1300',
                      boxShadow: '0 8px 24px -6px rgba(212,168,67,0.45)',
                    }}
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    <span className="relative">Experimentar Modo Apresentação</span>
                    <ArrowRight className="relative w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                  <Link
                    href="/biblia"
                    className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold border border-border/60 hover:border-primary/40 hover:bg-primary/[0.04] rounded-xl transition-all duration-300"
                  >
                    <BookOpen className="w-4 h-4" />
                    Abrir a Bíblia
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

      {/* CTA FINAL */}
      <section
        className="py-20 sm:py-28 px-4 sm:px-6 border-t border-border/30 relative overflow-hidden"
        aria-label="Comece a estudar"
      >
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'radial-gradient(circle at 20% 80%, hsl(var(--primary)) 0%, transparent 40%), radial-gradient(circle at 80% 20%, hsl(var(--primary)) 0%, transparent 40%)',
            }}
          />
        </div>

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/15 bg-primary/[0.04] mb-7">
              <Zap className="w-3.5 h-3.5 text-primary" />
              <span className="text-[10.5px] font-medium tracking-[0.18em] uppercase text-muted-foreground">
                100% Gratuito · Sem anúncios
              </span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light leading-[1.1] mb-5">
              Comece hoje o seu
              <br />
              <span className="italic text-primary">estudo bíblico.</span>
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mb-10 max-w-lg mx-auto leading-relaxed">
              Acesse todas as ferramentas gratuitamente. Estude a Bíblia com o rigor acadêmico
              que ela merece — e leve a Palavra para sua igreja.
            </p>

            <div className="flex flex-wrap gap-3 justify-center mb-12">
              <Link
                href="/biblia"
                className="group relative inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 text-sm font-semibold rounded-xl overflow-hidden transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, #f5cd6b 0%, #d4a843 50%, #b88a30 100%)',
                  color: '#1c1300',
                  boxShadow: '0 0 24px -4px rgba(212,168,67,0.4)',
                }}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <BookOpen className="relative w-4 h-4" />
                <span className="relative">Abrir a Bíblia</span>
              </Link>
              <Link
                href="/apresentar"
                className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 text-sm font-semibold border border-border/60 hover:border-primary/40 hover:bg-primary/[0.04] rounded-xl transition-all duration-300"
              >
                <MonitorPlay className="w-4 h-4" />
                Apresentar em Tela
              </Link>
            </div>

            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2.5">
              {trustBadges.map((badge) => (
                <div
                  key={badge.label}
                  className="flex items-center gap-1.5 text-xs text-muted-foreground"
                >
                  <badge.icon className="w-3.5 h-3.5 text-primary" />
                  {badge.label}
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
      <InstallBanner />
    </div>
  );
}
