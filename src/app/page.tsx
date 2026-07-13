'use client';

import Link from 'next/link';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import ParticlesBackground from '@/components/ParticlesBackground';
import {
  BookOpen, Languages, Church, Map, Brain, ScrollText, Clock, Users,
  ArrowRight, Sparkles, Search, Wrench, ChevronRight, ChevronLeft, Star,
  Globe, BookMarked, Shield, Heart, Share2, Zap, Eye, MessageCircle,
  CheckCircle2, Play, ChevronDown, Quote
} from 'lucide-react';
import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import InstallBanner from '@/components/InstallBanner';

const modules = [
  { href: '/biblia', icon: BookOpen, title: 'Bíblia', desc: 'Multi-tradução com áudio e comparação lado a lado' },
  { href: '/pesquisa', icon: Search, title: 'Pesquisa', desc: 'Busca avançada em todas as traduções' },
  { href: '/exegese', icon: ScrollText, title: 'Exegese', desc: 'Análise contextual e gramatical' },
  { href: '/ferramentas', icon: Wrench, title: 'Ferramentas', desc: 'Atlas bíblico interativo' },
  { href: '/idiomas', icon: Languages, title: 'Línguas', desc: 'Grego Koiné e Hebraico Bíblico' },
  { href: '/teologia', icon: Church, title: 'Teologia', desc: 'Sistemática e doutrinas' },
  { href: '/historia', icon: Map, title: 'História', desc: 'Contexto histórico e cultural' },
  { href: '/ia', icon: Brain, title: 'IA', desc: 'Assistente especializado em Bíblia' },
  { href: '/cronologia', icon: Clock, title: 'Cronologia', desc: 'Linha do tempo bíblica' },
  { href: '/personagens', icon: Users, title: 'Personagens', desc: 'Biografias e genealogias' },
  { href: '/devocional', icon: Star, title: 'Devocional', desc: 'Meditação diária com oração' },
  { href: '/flashcards', icon: Brain, title: 'Flashcards', desc: 'Memorize versículos' },
];

const features = [
  { icon: Globe, title: 'Multi-Tradução', desc: 'ARC, NVI, ARA, ACF, KJV e WEB lado a lado com destaque de diferenças' },
  { icon: Languages, title: 'Línguas Originais', desc: 'Estude palavras em Grego Koiné e Hebraico Bíblico' },
  { icon: Brain, title: 'IA Especializada', desc: 'Assistente treinado em teologia e exegese bíblica' },
  { icon: Map, title: 'Atlas Interativo', desc: 'Mapas de locais bíblicos com navegação interativa' },
  { icon: Shield, title: 'Sola Scriptura', desc: 'Fundamentado na Escritura como autoridade suprema' },
  { icon: Heart, title: 'Estudos Teológicos', desc: '80+ teólogos de todas as épocas e tradições' },
];

const testimonials = [
  { text: 'A comparação de traduções com destaque de diferenças é fantástica. Transformou meu preparo de estudo.', author: 'Pastor João', role: 'Ministro', avatar: 'PJ' },
  { text: 'O estudo de línguas originais acessível e profissional. Nunca vi nada igual em português.', author: 'Pr. Marcos', role: 'Evangelista', avatar: 'PM' },
  { text: 'Finalmente uma plataforma brasileira de verdade. Completa, bonita, funcional.', author: 'Dr. Pedro', role: 'Teólogo', avatar: 'DP' },
  { text: 'A IA responde com profundidade teológica que surpreende. Ferramenta indispensável.', author: 'Ana Luiza', role: 'Biblista', avatar: 'AL' },
  { text: 'Uso diariamente para preparo de aulas. Os alunos amam a interface limpa e elegante.', author: 'Pr. Lucas', role: 'Professor', avatar: 'PL' },
];

const dailyVerses = [
  { text: 'Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.', ref: 'João 3:16' },
  { text: 'No princípio era o Verbo, e o Verbo estava com Deus, e o Verbo era Deus.', ref: 'João 1:1' },
  { text: 'Confia no Senhor de todo o teu coração e não te estribes no teu próprio entendimento.', ref: 'Provérbios 3:5' },
  { text: 'Poderei tudo naquele que me fortalece.', ref: 'Filipenses 4:13' },
  { text: 'O Senhor é o meu pastor; nada me faltará.', ref: 'Salmos 23:1' },
  { text: 'E sabemos que todas as coisas contribuem juntamente para o bem daqueles que amam a Deus.', ref: 'Romanos 8:28' },
];

const stats = [
  { value: 66, label: 'Livros Bíblicos', suffix: '' },
  { value: 6, label: 'Traduções', suffix: '' },
  { value: 1189, label: 'Capítulos', suffix: '' },
  { value: 31102, label: 'Versículos', suffix: '' },
  { value: 80, label: 'Teólogos', suffix: '+' },
  { value: 10000, label: 'Versículos emcache', suffix: '+' },
];

const trustBadges = [
  { label: 'Gratuito para sempre', icon: CheckCircle2 },
  { label: 'Sem anúncios', icon: Shield },
  { label: 'Código aberto', icon: Globe },
  { label: 'Dados privados', icon: Heart },
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

  const formatted = displayed.toLocaleString('pt-BR');

  return (
    <span ref={ref}>
      {formatted}{suffix}
    </span>
  );
}

function TypewriterText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayed, setDisplayed] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let charIndex = 0;

    const startTyping = () => {
      timeout = setTimeout(() => {
        const type = () => {
          if (charIndex < text.length) {
            setDisplayed(text.slice(0, charIndex + 1));
            charIndex++;
            timeout = setTimeout(type, 60 + Math.random() * 40);
          } else {
            setTimeout(() => setShowCursor(false), 2000);
          }
        };
        type();
      }, delay);
    };

    startTyping();
    return () => clearTimeout(timeout);
  }, [text, delay]);

  return (
    <span>
      {displayed}
      {showCursor && (
        <span className="inline-block w-[2px] h-[1em] bg-[var(--primary)] ml-0.5 animate-pulse align-middle" />
      )}
    </span>
  );
}

function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animateRef = useRef<number>(0);

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

    const stars = Array.from({ length: 120 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 1.5 + 0.3,
      speed: Math.random() * 0.15 + 0.05,
      opacity: Math.random() * 0.7 + 0.1,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      twinkleOffset: Math.random() * Math.PI * 2,
    }));

    const floatingVerses: Array<{
      x: number; y: number; opacity: number; speed: number;
      text: string; size: number; drift: number;
    }> = [
      { x: 0.1, y: 0.2, opacity: 0.04, speed: 0.08, text: 'λόγος', size: 14, drift: 0.3 },
      { x: 0.85, y: 0.3, opacity: 0.03, speed: 0.06, text: 'אֱמֶת', size: 13, drift: -0.2 },
      { x: 0.15, y: 0.7, opacity: 0.035, speed: 0.07, text: 'χάρις', size: 12, drift: 0.4 },
      { x: 0.8, y: 0.65, opacity: 0.03, speed: 0.05, text: 'בְּרֵאשִׁית', size: 11, drift: -0.3 },
      { x: 0.5, y: 0.15, opacity: 0.025, speed: 0.04, text: 'πίστις', size: 13, drift: 0.2 },
      { x: 0.3, y: 0.85, opacity: 0.03, speed: 0.06, text: 'κυρίος', size: 12, drift: -0.15 },
    ];

    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.016;

      stars.forEach(star => {
        star.y -= star.speed;
        if (star.y < -5) {
          star.y = canvas.height + 5;
          star.x = Math.random() * canvas.width;
        }
        const twinkle = Math.sin(time * 2 + star.twinkleOffset) * 0.3 + 0.7;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 168, 67, ${star.opacity * twinkle})`;
        ctx.fill();
      });

      floatingVerses.forEach(v => {
        v.y -= v.speed * 0.01;
        v.x += Math.sin(time * 0.5 + v.y * 2) * v.drift * 0.001;
        if (v.y < -0.1) v.y = 1.1;
        ctx.font = `${v.size}px Georgia, serif`;
        ctx.fillStyle = `rgba(212, 168, 67, ${v.opacity})`;
        ctx.textAlign = 'center';
        ctx.fillText(v.text, v.x * canvas.width, v.y * canvas.height);
      });

      animateRef.current = requestAnimationFrame(animate);
    };

    animate();
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(animateRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
      style={{ opacity: 1 }}
    />
  );
}

function CrossAnimation() {
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]"
      aria-hidden="true"
    >
      <svg width="300" height="400" viewBox="0 0 300 400" fill="none">
        <motion.rect
          x="140" y="30" width="20" height="340" rx="4"
          fill="currentColor" className="text-[var(--primary)]"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
          style={{ transformOrigin: 'center bottom' }}
        />
        <motion.rect
          x="80" y="80" width="140" height="20" rx="4"
          fill="currentColor" className="text-[var(--primary)]"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.8 }}
          style={{ transformOrigin: 'center center' }}
        />
      </svg>
    </motion.div>
  );
}

function BookOpeningEffect() {
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
      aria-hidden="true"
    >
      <motion.div
        initial={{ rotateY: 0 }}
        animate={{ rotateY: [0, 5, 0, -5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="relative w-[200px] h-[260px] opacity-[0.025]"
        style={{ perspective: '1000px' }}
      >
        <div className="absolute inset-0 rounded-l-lg border border-[var(--primary)]/30 -skew-x-[5deg] origin-right" />
        <div className="absolute inset-0 rounded-r-lg border border-[var(--primary)]/30 skew-x-[5deg] origin-left" />
      </motion.div>
    </motion.div>
  );
}

function FloatingSparkles() {
  const sparkles = [
    { x: '15%', y: '20%', delay: 0, size: 14 },
    { x: '82%', y: '25%', delay: 1.2, size: 12 },
    { x: '25%', y: '70%', delay: 2.4, size: 10 },
    { x: '78%', y: '68%', delay: 0.8, size: 13 },
    { x: '50%', y: '12%', delay: 1.8, size: 11 },
    { x: '60%', y: '78%', delay: 3, size: 9 },
  ];
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      {sparkles.map((s, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: s.x, top: s.y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.4, 0],
            scale: [0, 1, 0],
            y: [0, -20, -40],
          }}
          transition={{
            duration: 4,
            delay: s.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <Sparkles className="text-[var(--primary)]" style={{ width: s.size, height: s.size }} />
        </motion.div>
      ))}
    </div>
  );
}

function SectionDivider() {
  return (
    <div className="relative h-px max-w-4xl mx-auto" aria-hidden="true">
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(90deg, transparent, var(--primary), transparent)',
        opacity: 0.15,
      }} />
      <div className="absolute left-1/2 -translate-x-1/2 -top-1 w-2 h-2 rotate-45 border border-[var(--primary)]/20 bg-[var(--bg)]" />
    </div>
  );
}

export default function Home() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [currentVerse, setCurrentVerse] = useState(0);
  const [modulesScrollX, setModulesScrollX] = useState(0);
  const modulesContainerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroY = useTransform(scrollY, [0, 400], [0, 60]);
  const heroScale = useTransform(scrollY, [0, 400], [1, 0.95]);
  const parallaxY = useTransform(scrollY, [0, 800], [0, 150]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVerse((prev) => (prev + 1) % dailyVerses.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const scrollModules = useCallback((direction: 'left' | 'right') => {
    const container = modulesContainerRef.current;
    if (!container) return;
    const amount = 280;
    const newX = direction === 'right'
      ? Math.min(modulesScrollX + amount, container.scrollWidth - container.clientWidth)
      : Math.max(modulesScrollX - amount, 0);
    container.scrollTo({ left: newX, behavior: 'smooth' });
    setModulesScrollX(newX);
  }, [modulesScrollX]);

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-28 pb-20 px-6 overflow-hidden min-h-screen flex items-center">
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: `
            radial-gradient(ellipse 60% 50% at 25% 35%, rgba(212,168,67,0.07) 0%, transparent 100%),
            radial-gradient(ellipse 50% 40% at 75% 20%, rgba(212,168,67,0.04) 0%, transparent 100%),
            radial-gradient(ellipse 70% 60% at 50% 80%, rgba(139,92,246,0.03) 0%, transparent 100%),
            radial-gradient(ellipse 40% 30% at 15% 60%, rgba(59,130,246,0.02) 0%, transparent 100%),
            radial-gradient(ellipse 45% 35% at 85% 70%, rgba(212,168,67,0.03) 0%, transparent 100%)
          `,
        }} />

        <HeroParticles />
        <CrossAnimation />
        <FloatingSparkles />
        <BookOpeningEffect />

        <motion.div
          style={{ opacity: heroOpacity, y: heroY, scale: heroScale }}
          className="max-w-6xl mx-auto text-center relative z-10 w-full"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border border-[var(--primary)]/15 bg-[var(--primary)]/[0.04]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-medium text-[var(--muted-fg)] tracking-wide">
              Estudo Bíblico Acadêmico · v3.0
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] font-light leading-[0.85] tracking-[-0.04em] mb-6"
          >
            <span className="block">Sola</span>
            <span className="italic font-medium gradient-text block mt-1">Scriptura</span>
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.8, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="w-32 h-px mx-auto mb-8"
            style={{ background: 'linear-gradient(90deg, transparent, var(--primary), transparent)' }}
          />

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="font-serif-body text-lg md:text-xl text-[var(--fg)] leading-relaxed max-w-2xl mx-auto mb-3"
          >
            A Escritura como única infalível regra de fé e prática —
            estudada com rigor acadêmico e ferramentas que servem ao texto sagrado.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.8 }}
            className="h-7 flex items-center justify-center mb-10"
          >
            <span className="text-xs text-[var(--muted-fg)] font-serif-body italic">
              <TypewriterText
                text="Grego Koiné · Hebraico Bíblico · Teologia Sistemática · História · Geografia · IA"
                delay={1800}
              />
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="flex flex-wrap gap-3 justify-center mb-16"
          >
            <Link href="/biblia" className="group relative inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 text-sm font-semibold tracking-wide transition-all duration-300 hover:shadow-xl hover:shadow-primary/25 rounded-xl overflow-hidden" style={{ boxShadow: '0 0 20px -4px rgba(212,168,67,0.3), 0 0 40px -8px rgba(212,168,67,0.15)' }}>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ boxShadow: 'inset 0 0 20px rgba(255,255,255,0.1)' }} />
              Iniciar Estudo
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link href="/devocional" className="group inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold tracking-wide text-[var(--fg)] border border-[var(--primary)]/25 hover:border-[var(--primary)]/50 hover:text-[var(--primary)] transition-all duration-300 rounded-xl hover:bg-[var(--primary)]/[0.05] hover:shadow-lg hover:shadow-[var(--primary)]/10">
              <Sparkles className="w-4 h-4" />
              Devocional de Hoje
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="flex flex-wrap justify-center gap-x-8 gap-y-3"
          >
            {stats.slice(0, 4).map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-display text-2xl md:text-3xl font-light text-[var(--primary)]">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-[10px] text-[var(--muted-fg)] uppercase tracking-wider mt-0.5">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 2.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-1"
          >
            <span className="text-[9px] uppercase tracking-[0.2em] text-[var(--muted-fg)]">Scroll</span>
            <ChevronDown className="w-4 h-4 text-[var(--muted-fg)]" />
          </motion.div>
        </motion.div>
      </section>

      <SectionDivider />

      {/* Features Section */}
      <section className="py-28 px-6 relative">
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{
          backgroundImage: `
            radial-gradient(circle at 50% 0%, var(--primary) 0%, transparent 50%),
            radial-gradient(circle at 1px 1px, var(--primary) 0.5px, transparent 0.5px)
          `,
          backgroundSize: '100% 100%, 40px 40px',
        }} />

        <div className="max-w-6xl mx-auto relative z-10">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-[var(--muted-fg)] mb-4">Recursos</p>
              <h2 className="font-display text-3xl md:text-5xl font-light">
                Tudo que você precisa para <span className="italic text-[var(--primary)]">estudar a Palavra</span>
              </h2>
              <div className="w-16 h-px mx-auto mt-6" style={{ background: 'linear-gradient(90deg, transparent, var(--primary), transparent)' }} />
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <ScrollReveal key={f.title} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -4, rotateX: 2, rotateY: -2 }}
                  transition={{ duration: 0.3 }}
                  style={{ perspective: '1000px' }}
                  className="group p-6 rounded-2xl border border-[var(--border)]/40 hover:border-[var(--primary)]/25 transition-all duration-500 relative overflow-hidden bg-gradient-to-br from-[var(--card-bg)]/50 to-transparent backdrop-blur-sm card-hover"
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{
                    backgroundImage: 'radial-gradient(circle at 30% 20%, rgba(212,168,67,0.08) 0%, transparent 60%)',
                  }} />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-2xl" style={{
                    boxShadow: '0 0 30px -8px rgba(212,168,67,0.12), inset 0 0 30px -12px rgba(212,168,67,0.05)',
                  }} />
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    className="w-10 h-10 rounded-xl bg-[var(--primary)]/8 flex items-center justify-center mb-4 relative z-10"
                  >
                    <f.icon className="w-5 h-5 text-[var(--primary)]" strokeWidth={1.5} />
                  </motion.div>
                  <h3 className="font-semibold text-sm mb-2 relative z-10">{f.title}</h3>
                  <p className="text-xs text-[var(--muted-fg)] leading-relaxed relative z-10">{f.desc}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Modules Section - Horizontal Scroll */}
      <section className="py-28 px-6 border-y border-[var(--border)]/30 bg-[var(--card-bg)]/20 relative overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-[var(--muted-fg)] mb-3">Módulos</p>
                <h2 className="font-display text-3xl md:text-4xl font-light">
                  Explore cada <span className="italic text-[var(--primary)]">área do conhecimento</span>
                </h2>
              </div>
              <div className="hidden sm:flex items-center gap-2">
                <button
                  onClick={() => scrollModules('left')}
                  className="p-2 rounded-lg border border-[var(--border)]/50 text-[var(--muted-fg)] hover:text-[var(--primary)] hover:border-[var(--primary)]/30 transition-all duration-300"
                  aria-label="Anterior"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => scrollModules('right')}
                  className="p-2 rounded-lg border border-[var(--border)]/50 text-[var(--muted-fg)] hover:text-[var(--primary)] hover:border-[var(--primary)]/30 transition-all duration-300"
                  aria-label="Próximo"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </ScrollReveal>

          <div
            ref={modulesContainerRef}
            onScroll={(e) => setModulesScrollX(e.currentTarget.scrollLeft)}
            className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {modules.map((m, i) => (
              <ScrollReveal key={m.href} delay={i * 0.05} direction="left">
                <Link href={m.href} className="group block snap-start">
                  <motion.div
                    whileHover={{ y: -6, scale: 1.02 }}
                    className="flex flex-col items-center text-center p-6 w-[180px] h-[160px] rounded-2xl border border-[var(--border)]/30 hover:border-[var(--primary)]/25 hover:bg-[var(--primary)]/[0.03] transition-all duration-400 relative overflow-hidden"
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{
                      background: 'radial-gradient(circle at 50% 0%, rgba(212,168,67,0.06) 0%, transparent 70%)',
                    }} />
                    <motion.div
                      whileHover={{ scale: 1.15, rotate: -8 }}
                      className="w-12 h-12 rounded-xl bg-[var(--primary)]/8 flex items-center justify-center mb-3 relative z-10"
                    >
                      <m.icon className="w-6 h-6 text-[var(--primary)]" strokeWidth={1.5} />
                    </motion.div>
                    <h3 className="text-sm font-semibold mb-1 relative z-10">{m.title}</h3>
                    <p className="text-[11px] text-[var(--muted-fg)] leading-snug relative z-10 line-clamp-2">{m.desc}</p>
                    <ChevronRight className="w-3.5 h-3.5 text-[var(--primary)] mt-auto opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-0 group-hover:translate-x-1 relative z-10" />
                  </motion.div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Bible Verse Section */}
      <section className="py-28 px-6 relative overflow-hidden">
        <motion.div
          style={{ y: parallaxY }}
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
        >
          <div className="absolute inset-0" style={{
            backgroundImage: `
              radial-gradient(circle at 20% 50%, var(--primary) 0%, transparent 40%),
              radial-gradient(circle at 80% 50%, var(--primary) 0%, transparent 40%)
            `,
          }} />
        </motion.div>

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <ScrollReveal>
            <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-[var(--muted-fg)] mb-12">Versículo do Dia</p>

            <div className="relative min-h-[200px] flex items-center justify-center">
              <motion.div
                key={currentVerse}
                initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
                transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="absolute inset-0 flex flex-col items-center justify-center"
              >
                <div className="relative">
                  <span className="absolute -top-10 -left-6 text-6xl font-serif text-[var(--primary)] opacity-10 select-none">&ldquo;</span>
                  <p className="font-serif-body text-xl md:text-2xl lg:text-3xl text-[var(--fg)] leading-relaxed max-w-2xl italic font-light">
                    {dailyVerses[currentVerse].text}
                  </p>
                  <span className="absolute -bottom-6 -right-4 text-6xl font-serif text-[var(--primary)] opacity-10 select-none">&rdquo;</span>
                </div>
                <p className="mt-6 text-sm font-semibold text-[var(--primary)]">
                  — {dailyVerses[currentVerse].ref}
                </p>
              </motion.div>
            </div>

            <div className="flex items-center justify-center gap-2 mt-12">
              {dailyVerses.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentVerse(i)}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    i === currentVerse ? 'bg-[var(--primary)] w-6' : 'bg-[var(--muted-fg)]/30 hover:bg-[var(--muted-fg)]/50'
                  }`}
                  aria-label={`Versículo ${i + 1}`}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-8 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[var(--border)]/50 text-xs text-[var(--muted-fg)] hover:text-[var(--primary)] hover:border-[var(--primary)]/30 transition-all duration-300"
            >
              <Share2 className="w-3.5 h-3.5" />
              Compartilhar versículo
            </motion.button>
          </ScrollReveal>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-28 px-6 border-y border-[var(--border)]/30 bg-[var(--card-bg)]/20">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-14">
              <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-[var(--muted-fg)] mb-3">Depoimentos</p>
              <h2 className="font-display text-3xl md:text-4xl font-light">
                O que dizem sobre <span className="italic text-[var(--primary)]">nós</span>
              </h2>
              <div className="w-16 h-px mx-auto mt-5" style={{ background: 'linear-gradient(90deg, transparent, var(--primary), transparent)' }} />
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="relative">
              <div className="overflow-hidden rounded-2xl border border-[var(--border)]/40 p-10 md:p-14 min-h-[260px] flex flex-col items-center justify-center bg-gradient-to-br from-[var(--card-bg)]/50 to-transparent backdrop-blur-sm relative">
                <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{
                  backgroundImage: 'radial-gradient(circle at 50% 50%, var(--primary) 0%, transparent 60%)',
                }} />

                <motion.div
                  key={currentTestimonial}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="text-center relative z-10"
                >
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6" style={{
                    background: 'linear-gradient(135deg, rgba(212,168,67,0.2), rgba(139,92,246,0.15))',
                    boxShadow: '0 0 20px -4px rgba(212,168,67,0.2)',
                  }}>
                    <span className="font-display text-lg font-semibold text-[var(--primary)]">
                      {testimonials[currentTestimonial].avatar}
                    </span>
                  </div>

                  <div className="flex items-center justify-center gap-1 mb-5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 text-[var(--primary)] fill-[var(--primary)]" />
                    ))}
                  </div>

                  <div className="relative max-w-lg mx-auto">
                    <Quote className="absolute -top-4 -left-2 w-8 h-8 text-[var(--primary)] opacity-10" />
                    <p className="font-serif-body text-lg md:text-xl text-[var(--fg)] leading-relaxed mb-6 italic">
                      &ldquo;{testimonials[currentTestimonial].text}&rdquo;
                    </p>
                  </div>

                  <p className="text-sm font-semibold">{testimonials[currentTestimonial].author}</p>
                  <p className="text-[11px] text-[var(--muted-fg)] mt-0.5">{testimonials[currentTestimonial].role}</p>
                </motion.div>
              </div>

              <div className="flex items-center justify-center gap-3 mt-6">
                <button
                  onClick={() => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                  className="p-2 rounded-lg border border-[var(--border)]/50 text-[var(--muted-fg)] hover:text-[var(--primary)] hover:border-[var(--primary)]/30 transition-all duration-300"
                  aria-label="Anterior"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentTestimonial(i)}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                      i === currentTestimonial ? 'bg-[var(--primary)] w-6' : 'bg-[var(--muted-fg)]/30 hover:bg-[var(--muted-fg)]/50'
                    }`}
                    aria-label={`Depoimento ${i + 1}`}
                  />
                ))}
                <button
                  onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}
                  className="p-2 rounded-lg border border-[var(--border)]/50 text-[var(--muted-fg)] hover:text-[var(--primary)] hover:border-[var(--primary)]/30 transition-all duration-300"
                  aria-label="Próximo"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <SectionDivider />

      {/* Stats Section */}
      <section className="py-28 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{
          backgroundImage: 'radial-gradient(circle at 50% 50%, var(--primary) 0%, transparent 50%)',
        }} />

        <div className="max-w-5xl mx-auto relative z-10">
          <ScrollReveal>
            <div className="text-center mb-14">
              <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-[var(--muted-fg)] mb-3">Números</p>
              <h2 className="font-display text-3xl md:text-4xl font-light">
                O poder da Palavra em <span className="italic text-[var(--primary)]">números</span>
              </h2>
              <div className="w-16 h-px mx-auto mt-5" style={{ background: 'linear-gradient(90deg, transparent, var(--primary), transparent)' }} />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
            {stats.map((stat, i) => (
              <ScrollReveal key={stat.label} delay={i * 0.08}>
                <div className="text-center p-4 rounded-2xl border border-[var(--border)]/30 bg-[var(--card-bg)]/30 hover:border-[var(--primary)]/25 transition-all duration-300 relative group">
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{
                    boxShadow: '0 0 24px -6px rgba(212,168,67,0.15)',
                  }} />
                  <p className="font-display text-2xl md:text-3xl font-light text-[var(--primary)] relative">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="text-[10px] text-[var(--muted-fg)] uppercase tracking-wider mt-1.5">{stat.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* CTA Section */}
      <section className="py-28 px-6 border-t border-[var(--border)]/30 relative overflow-hidden" style={{
        background: 'linear-gradient(180deg, var(--card-bg) 0%, transparent 100%)',
      }}>
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{
          backgroundImage: `
            radial-gradient(circle at 20% 80%, var(--primary) 0%, transparent 40%),
            radial-gradient(circle at 80% 20%, var(--primary) 0%, transparent 40%)
          `,
        }} />

        <motion.div
          className="absolute top-10 left-[10%] opacity-[0.04] pointer-events-none"
          animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden="true"
        >
          <BookOpen className="w-8 h-8 text-[var(--primary)]" />
        </motion.div>
        <motion.div
          className="absolute bottom-10 right-[12%] opacity-[0.04] pointer-events-none"
          animate={{ y: [0, 12, 0], rotate: [0, -8, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          aria-hidden="true"
        >
          <Sparkles className="w-6 h-6 text-[var(--primary)]" />
        </motion.div>
        <motion.div
          className="absolute top-1/2 right-[8%] opacity-[0.03] pointer-events-none hidden lg:block"
          animate={{ y: [0, -10, 0], x: [0, 5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          aria-hidden="true"
        >
          <Church className="w-10 h-10 text-[var(--primary)]" />
        </motion.div>

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <ScrollReveal>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--primary)]/15 bg-[var(--primary)]/[0.04] mb-8"
            >
              <Zap className="w-3.5 h-3.5 text-[var(--primary)]" />
              <span className="text-[11px] font-medium text-[var(--muted-fg)]">100% Gratuito · Sem anúncios</span>
            </motion.div>

            <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-[var(--muted-fg)] mb-3">Sua jornada começa aqui</p>
            <h2 className="font-display text-3xl md:text-5xl font-light mb-6">
              Comece hoje o seu <span className="italic text-[var(--primary)]">estudo</span>
            </h2>
            <p className="text-sm text-[var(--muted-fg)] mb-10 max-w-lg mx-auto leading-relaxed">
              Acesse todas as ferramentas gratuitamente. Estude a Bíblia com o rigor acadêmico que ela merece.
            </p>

            <div className="flex flex-wrap gap-3 justify-center mb-12">
              <Link href="/biblia" className="group relative inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 text-sm font-semibold rounded-xl hover:bg-primary/90 transition-all duration-300 hover:shadow-xl hover:shadow-primary/25 overflow-hidden" style={{ boxShadow: '0 0 24px -6px rgba(212,168,67,0.25)' }}>
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <BookOpen className="w-4 h-4" />
                Abrir a Bíblia
              </Link>
              <Link href="/ia" className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold border border-[var(--primary)]/25 text-[var(--fg)] hover:border-[var(--primary)]/50 hover:text-[var(--primary)] transition-all duration-300 rounded-xl hover:bg-[var(--primary)]/[0.05] hover:shadow-lg hover:shadow-[var(--primary)]/10">
                <Brain className="w-4 h-4" />
                Experimentar IA
              </Link>
            </div>

            <div className="flex flex-wrap justify-center gap-x-6 gap-y-3">
              {trustBadges.map((badge) => (
                <div key={badge.label} className="flex items-center gap-1.5 text-xs text-[var(--muted-fg)]">
                  <badge.icon className="w-3.5 h-3.5 text-[var(--primary)]" />
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
