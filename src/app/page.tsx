'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { 
  BookOpen, Languages, Church, Map, Brain, ScrollText, Clock, Users, 
  ArrowRight, Sparkles, Search, Wrench, ChevronRight, Star, 
  Globe, BookMarked, MessageSquare, Zap, Shield, Heart
} from 'lucide-react';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';

const modules = [
  { href: '/biblia', icon: BookOpen, title: 'Bíblia', desc: 'Multi-tradução com comparação lado a lado', color: 'from-blue-500/10 to-blue-600/5' },
  { href: '/pesquisa', icon: Search, title: 'Pesquisa', desc: 'Busca avançada em todas as traduções', color: 'from-purple-500/10 to-purple-600/5' },
  { href: '/exegese', icon: ScrollText, title: 'Exegese', desc: 'Análise contextual e gramatical', color: 'from-amber-500/10 to-amber-600/5' },
  { href: '/ferramentas', icon: Wrench, title: 'Ferramentas', desc: 'Atlas bíblico interativo', color: 'from-emerald-500/10 to-emerald-600/5' },
  { href: '/idiomas', icon: Languages, title: 'Línguas Originais', desc: 'Grego Koiné e Hebraico Bíblico', color: 'from-rose-500/10 to-rose-600/5' },
  { href: '/teologia', icon: Church, title: 'Teologia', desc: 'Sistemática e doutrinas', color: 'from-indigo-500/10 to-indigo-600/5' },
  { href: '/historia', icon: Map, title: 'História', desc: 'Contexto histórico e cultural', color: 'from-cyan-500/10 to-cyan-600/5' },
  { href: '/ia', icon: Brain, title: 'Assistente IA', desc: 'Especialista em estudos bíblicos', color: 'from-violet-500/10 to-violet-600/5' },
  { href: '/cronologia', icon: Clock, title: 'Cronologia', desc: 'Linha do tempo bíblica', color: 'from-orange-500/10 to-orange-600/5' },
  { href: '/personagens', icon: Users, title: 'Personagens', desc: 'Biografias e genealogias', color: 'from-teal-500/10 to-teal-600/5' },
];

const stats = [
  { value: '66', label: 'Livros Bíblicos', icon: BookOpen },
  { value: '6', label: 'Traduções', icon: Languages },
  { value: '1.189', label: 'Capítulos', icon: BookMarked },
  { value: '31.102', label: 'Versículos', icon: ScrollText },
];

const features = [
  {
    icon: Globe,
    title: 'Multi-Tradução',
    desc: 'Compare ARC, NVI, ARA, ACF, KJV e WEB lado a lado com destaque de diferenças',
  },
  {
    icon: Languages,
    title: 'Línguas Originais',
    desc: 'Estude palavras em Grego Koiné e Hebraico Bíblico com lexicon completo',
  },
  {
    icon: Brain,
    title: 'IA Especializada',
    desc: 'Assistente inteligente treinado em teologia e exegese bíblica',
  },
  {
    icon: Map,
    title: 'Atlas Interativo',
    desc: 'Mapas de locais bíblicos com navegação interativa',
  },
  {
    icon: ScrollText,
    title: 'Exegese Automática',
    desc: 'Análise contextual, gramatical e teológica em um clique',
  },
  {
    icon: Shield,
    title: 'Sola Scriptura',
    desc: 'Fundamentado na Escritura como autoridade suprema de fé e prática',
  },
];

const testimonials = [
  {
    text: 'Uma ferramenta incrível para estudo bíblico. A comparação de traduções com destaque de diferenças é fantástica!',
    author: 'Pastor João',
    role: 'Ministro',
  },
  {
    text: 'O estudo de línguas originais transformou minha pregação. Nunca foi tão acessível estudar Grego e Hebraico.',
    author: 'Pr. Marcos',
    role: 'Evangelista',
  },
  {
    text: 'Finalmente uma plataforma brasileira que compete com o Logos. O modo de leitura é lindo e funcional.',
    author: 'Dr. Pedro',
    role: 'Teólogo',
  },
];

export default function Home() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
          backgroundImage:
            'radial-gradient(circle at 20% 50%, #c4a265 0%, transparent 40%), radial-gradient(circle at 80% 20%, #8b2252 0%, transparent 35%)',
        }} />

        <div className="max-w-6xl mx-auto text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-xs font-semibold tracking-[0.3em] uppercase text-muted-foreground mb-8"
            >
              Estudo Bíblico Acadêmico
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="font-display text-6xl md:text-8xl lg:text-9xl font-light leading-[0.95] tracking-tight mb-6"
            >
              Sola
              <br />
              <span className="italic font-medium gradient-text">Scriptura</span>
            </motion.h1>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="ornament w-24 mx-auto my-8"
            />

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="font-serif-body text-xl md:text-2xl text-foreground/80 leading-relaxed max-w-2xl mx-auto mb-4"
            >
              A Escritura como única infalível regra de fé e prática —
              estudada com rigor acadêmico e ferramentas que servem ao texto sagrado.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="text-sm text-muted-foreground italic max-w-xl mx-auto mb-12"
            >
              Grego Koiné · Hebraico Bíblico · Teologia Sistemática · História · Geografia · IA Especializada
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.6 }}
              className="flex flex-wrap gap-4 justify-center"
            >
              <Link
                href="/biblia"
                className="group inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 text-sm font-semibold tracking-wide hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/20"
              >
                Iniciar Estudo
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/ia"
                className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold tracking-wide text-foreground border border-border hover:border-primary/50 hover:text-primary transition-all hover:bg-primary/5"
              >
                <Sparkles className="w-4 h-4" />
                Consultar IA
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-6 bg-card/30 border-y border-border/30">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <ScrollReveal key={stat.label} delay={i * 0.1}>
                <div className="text-center">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 animate-float" style={{ animationDelay: `${i * 0.2}s` }}>
                    <stat.icon className="w-6 h-6 text-primary" />
                  </div>
                  <p className="font-display text-4xl md:text-5xl font-light text-primary mb-1">{stat.value}</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-3">
                Recursos
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-light mb-4">
                Tudo que você precisa para <span className="italic text-primary">estudar a Palavra</span>
              </h2>
              <div className="ornament w-16 mx-auto mt-6" />
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <ScrollReveal key={f.title} delay={i * 0.08}>
                <div className="sola-card p-8 h-full group cursor-default">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/15 transition-colors">
                    <f.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Modules */}
      <section className="py-28 px-6 bg-card/20 border-y border-border/30">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-3">
                Módulos
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-light mb-4">
                Explore cada <span className="italic text-primary">área do conhecimento</span>
              </h2>
              <div className="ornament w-16 mx-auto mt-6" />
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {modules.map((m, i) => (
              <ScrollReveal key={m.href} delay={i * 0.05}>
                <Link
                  href={m.href}
                  className={`block sola-card p-6 h-full bg-gradient-to-br ${m.color} group`}
                >
                  <m.icon className="w-8 h-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold mb-1">{m.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{m.desc}</p>
                  <ChevronRight className="w-4 h-4 text-muted-foreground mt-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-28 px-6">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-3">
                Depoimentos
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-light mb-4">
                O que dizem sobre <span className="italic text-primary">nós</span>
              </h2>
              <div className="ornament w-16 mx-auto mt-6" />
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="relative sola-card p-10 sm:p-12 text-center min-h-[200px]">
              <div className="absolute top-6 left-8 text-primary/15">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <div className="relative z-10">
                <motion.p
                  key={currentTestimonial}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="font-serif-body text-xl md:text-2xl text-foreground/80 leading-relaxed mb-8 italic"
                >
                  &ldquo;{testimonials[currentTestimonial].text}&rdquo;
                </motion.p>
                <div className="flex items-center justify-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-primary fill-primary" />
                  ))}
                </div>
                <p className="font-semibold text-sm">{testimonials[currentTestimonial].author}</p>
                <p className="text-xs text-muted-foreground">{testimonials[currentTestimonial].role}</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 px-6 bg-primary text-primary-foreground">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="font-display text-4xl md:text-5xl font-light mb-6">
              Comece hoje o seu estudo
            </h2>
            <p className="text-primary-foreground/80 mb-10 max-w-xl mx-auto leading-relaxed">
              Acesse todas as ferramentas gratuitamente. Estude a Bíblia com o rigor que ela merece.
            </p>
            <Link
              href="/biblia"
              className="inline-flex items-center gap-2 bg-white text-primary px-10 py-4 text-sm font-semibold tracking-wide hover:bg-white/90 transition-all hover:shadow-lg"
            >
              Começar Agora
              <ArrowRight className="w-4 h-4" />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
