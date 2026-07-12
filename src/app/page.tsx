'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import ParticlesBackground from '@/components/ParticlesBackground';
import { 
  BookOpen, Languages, Church, Map, Brain, ScrollText, Clock, Users, 
  ArrowRight, Sparkles, Search, Wrench, ChevronRight, Star, 
  Globe, BookMarked, Shield, Heart
} from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';

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

const stats = [
  { value: '66', label: 'Livros Bíblicos' },
  { value: '8', label: 'Traduções' },
  { value: '1.189', label: 'Capítulos' },
  { value: '31.102', label: 'Versículos' },
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
  { text: 'A comparação de traduções com destaque de diferenças é fantástica. Transformou meu preparo de estudo.', author: 'Pastor João', role: 'Ministro' },
  { text: 'O estudo de línguas originais acessível e profissional. Nunca vi nada igual em português.', author: 'Pr. Marcos', role: 'Evangelista' },
  { text: 'Finalmente uma plataforma brasileira de verdade. Completa, bonita, funcional.', author: 'Dr. Pedro', role: 'Teólogo' },
];

export default function Home() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroY = useTransform(scrollY, [0, 400], [0, 40]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Header />

      {/* Hero */}
      <section className="relative pt-28 pb-20 px-6 overflow-hidden min-h-[85vh] flex items-center">
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]" style={{
          backgroundImage: 'radial-gradient(circle at 25% 40%, hsl(38 50% 62%) 0%, transparent 45%), radial-gradient(circle at 75% 25%, hsl(28 30% 35%) 0%, transparent 40%)',
        }} />
        <ParticlesBackground />

        <motion.div 
          style={{ opacity: heroOpacity, y: heroY }}
          className="max-w-5xl mx-auto text-center relative z-10 w-full"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 1 }}
            className="text-[11px] font-semibold uppercase text-[var(--muted-fg)] mb-8 tracking-[0.25em]"
          >
            Estudo Bíblico Acadêmico
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="font-display text-6xl md:text-8xl lg:text-9xl font-light leading-[0.9] tracking-tight mb-8"
          >
            <span className="block">Sola</span>
            <span className="italic font-medium gradient-text block">Scriptura</span>
          </motion.h1>

          <div className="ornament w-24 mx-auto mb-8" />

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="font-serif-body text-lg md:text-xl text-[var(--fg)]/70 leading-relaxed max-w-xl mx-auto mb-4"
          >
            A Escritura como única infalível regra de fé e prática —
            estudada com rigor acadêmico e ferramentas que servem ao texto sagrado.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="text-xs text-[var(--muted-fg)] italic max-w-lg mx-auto mb-10"
          >
            Grego Koiné · Hebraico Bíblico · Teologia Sistemática · História · Geografia · IA
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="flex flex-wrap gap-3 justify-center"
          >
            <Link href="/biblia"
              className="group inline-flex items-center gap-2 bg-[var(--primary)] text-white px-7 py-3 text-sm font-semibold tracking-wide hover:bg-[var(--primary)]/90 transition-all duration-300 hover:shadow-lg hover:shadow-[var(--primary)]/20 rounded-lg"
            >
              Iniciar Estudo
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link href="/devocional"
              className="inline-flex items-center gap-2 px-7 py-3 text-sm font-semibold tracking-wide text-[var(--fg)] border border-[var(--border)] hover:border-[var(--primary)]/40 hover:text-[var(--primary)] transition-all duration-300 rounded-lg"
            >
              <Sparkles className="w-4 h-4" />
              Devocional de Hoje
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-px h-8 bg-gradient-to-b from-[var(--muted-fg)] to-transparent"
          />
        </motion.div>
      </section>

      {/* Stats */}
      <section className="py-16 px-6 border-y border-[var(--border)]/30">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <ScrollReveal key={stat.label} delay={i * 0.08}>
                <div className="text-center">
                  <p className="font-display text-3xl md:text-4xl font-light text-[var(--primary)]">{stat.value}</p>
                  <p className="text-[10px] text-[var(--muted-fg)] uppercase tracking-wider mt-1">{stat.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-14">
              <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[var(--muted-fg)] mb-3">Recursos</p>
              <h2 className="font-display text-3xl md:text-4xl font-light">
                Tudo que você precisa para <span className="italic text-[var(--primary)]">estudar a Palavra</span>
              </h2>
              <div className="ornament w-16 mx-auto mt-5" />
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <ScrollReveal key={f.title} delay={i * 0.06}>
                <div className="p-6 border border-[var(--border)]/40 rounded-xl hover:border-[var(--primary)]/20 transition-all duration-300 group">
                  <f.icon className="w-8 h-8 text-[var(--primary)] mb-3 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
                  <h3 className="font-semibold text-sm mb-1.5">{f.title}</h3>
                  <p className="text-xs text-[var(--muted-fg)] leading-relaxed">{f.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Modules */}
      <section className="py-24 px-6 border-y border-[var(--border)]/30 bg-[var(--card-bg)]/30">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-14">
              <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[var(--muted-fg)] mb-3">Módulos</p>
              <h2 className="font-display text-3xl md:text-4xl font-light">
                Explore cada <span className="italic text-[var(--primary)]">área do conhecimento</span>
              </h2>
              <div className="ornament w-16 mx-auto mt-5" />
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {modules.map((m, i) => (
              <ScrollReveal key={m.href} delay={i * 0.04}>
                <Link href={m.href}>
                  <div className="flex items-center gap-3 p-4 rounded-xl border border-[var(--border)]/30 hover:border-[var(--primary)]/20 hover:bg-[var(--primary)]/[0.03] transition-all duration-300 group">
                    <m.icon className="w-5 h-5 text-[var(--primary)] shrink-0 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold">{m.title}</h3>
                      <p className="text-[11px] text-[var(--muted-fg)] truncate">{m.desc}</p>
                    </div>
                    <ChevronRight className="w-3 h-3 text-[var(--muted-fg)] shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[var(--muted-fg)] mb-3">Depoimentos</p>
              <h2 className="font-display text-3xl md:text-4xl font-light">
                O que dizem sobre <span className="italic text-[var(--primary)]">nós</span>
              </h2>
              <div className="ornament w-16 mx-auto mt-5" />
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="text-center border border-[var(--border)]/40 rounded-2xl p-10 min-h-[200px] flex flex-col items-center justify-center">
              <motion.p
                key={currentTestimonial}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="font-serif-body text-lg text-[var(--fg)]/70 leading-relaxed mb-6 italic max-w-lg"
              >
                &ldquo;{testimonials[currentTestimonial].text}&rdquo;
              </motion.p>
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 text-[var(--primary)] fill-[var(--primary)]" />
                ))}
              </div>
              <p className="text-sm font-semibold">{testimonials[currentTestimonial].author}</p>
              <p className="text-[11px] text-[var(--muted-fg)]">{testimonials[currentTestimonial].role}</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 border-t border-[var(--border)]/30 bg-[var(--card-bg)]/20">
        <div className="max-w-2xl mx-auto text-center">
          <ScrollReveal>
            <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[var(--muted-fg)] mb-3">Sua jornada começa aqui</p>
            <h2 className="font-display text-3xl md:text-4xl font-light mb-5">
              Comece hoje o seu <span className="italic text-[var(--primary)]">estudo</span>
            </h2>
            <p className="text-sm text-[var(--muted-fg)] mb-8 max-w-md mx-auto">
              Acesse todas as ferramentas gratuitamente. Estude a Bíblia com o rigor que ela merece.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/biblia"
                className="inline-flex items-center gap-2 bg-[var(--primary)] text-white px-7 py-3 text-sm font-semibold rounded-lg hover:bg-[var(--primary)]/90 transition-all duration-300 hover:shadow-lg hover:shadow-[var(--primary)]/20"
              >
                <BookOpen className="w-4 h-4" />
                Abrir a Bíblia
              </Link>
              <Link href="/devocional"
                className="inline-flex items-center gap-2 px-7 py-3 text-sm font-semibold border border-[var(--border)] text-[var(--fg)] hover:border-[var(--primary)]/40 hover:text-[var(--primary)] transition-all duration-300 rounded-lg"
              >
                <Sparkles className="w-4 h-4" />
                Devocional de Hoje
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
