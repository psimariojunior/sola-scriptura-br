'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import ParticlesBackground from '@/components/ParticlesBackground';
import { 
  BookOpen, Languages, Church, Map, Brain, ScrollText, Clock, Users, 
  ArrowRight, Sparkles, Search, Wrench, ChevronRight, Star, 
  Globe, BookMarked, Shield, Heart, ChevronDown
} from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
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
  { value: '8', label: 'Traduções', icon: Languages },
  { value: '1.189', label: 'Capítulos', icon: BookMarked },
  { value: '31.102', label: 'Versículos', icon: ScrollText },
];

const features = [
  { icon: Globe, title: 'Multi-Tradução', desc: 'Compare ARC, NVI, ARA, ACF, KJV e WEB lado a lado com destaque de diferenças' },
  { icon: Languages, title: 'Línguas Originais', desc: 'Estude palavras em Grego Koiné e Hebraico Bíblico com lexicon completo' },
  { icon: Brain, title: 'IA Especializada', desc: 'Assistente inteligente treinado em teologia e exegese bíblica' },
  { icon: Map, title: 'Atlas Interativo', desc: 'Mapas de locais bíblicos com navegação interativa' },
  { icon: ScrollText, title: 'Exegese Automática', desc: 'Análise contextual, gramatical e teológica em um clique' },
  { icon: Shield, title: 'Sola Scriptura', desc: 'Fundamentado na Escritura como autoridade suprema de fé e prática' },
];

const testimonials = [
  { text: 'Uma ferramenta incrível para estudo bíblico. A comparação de traduções com destaque de diferenças é fantástica!', author: 'Pastor João', role: 'Ministro' },
  { text: 'O estudo de línguas originais transformou minha pregação. Nunca foi tão acessível estudar Grego e Hebraico.', author: 'Pr. Marcos', role: 'Evangelista' },
  { text: 'Finalmente uma plataforma brasileira que compete com o Logos. O modo de leitura é lindo e funcional.', author: 'Dr. Pedro', role: 'Teólogo' },
];

export default function Home() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 400], [1, 0.95]);
  const heroY = useTransform(scrollY, [0, 400], [0, 60]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero - Cinematográfico */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden min-h-[90vh] flex items-center">
        {/* Background premium */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 opacity-[0.04] hero-glow" style={{
            backgroundImage: 'radial-gradient(circle at 25% 40%, #c4a265 0%, transparent 45%), radial-gradient(circle at 75% 25%, #8b5e3c 0%, transparent 40%), radial-gradient(circle at 50% 80%, #4a3728 0%, transparent 35%)',
          }} />
          <div className="absolute inset-0 opacity-[0.02]" style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, #c4a265 0%, transparent 40%), radial-gradient(circle at 80% 20%, #8b2252 0%, transparent 35%)',
          }} />
          <ParticlesBackground />
        </div>

        <motion.div 
          style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
          className="max-w-6xl mx-auto text-center relative z-10 w-full"
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <motion.p
              initial={{ opacity: 0, letterSpacing: '0.5em' }}
              animate={{ opacity: 1, letterSpacing: '0.3em' }}
              transition={{ delay: 0.3, duration: 1 }}
              className="text-xs font-semibold uppercase text-muted-foreground mb-8 tracking-[0.3em]"
            >
              Estudo Bíblico Acadêmico
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="font-display text-7xl md:text-8xl lg:text-[10rem] font-light leading-[0.9] tracking-tight mb-6"
            >
              <span className="block">Sola</span>
              <motion.span 
                className="italic font-medium gradient-text block"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                Scriptura
              </motion.span>
            </motion.h1>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="ornament w-32 mx-auto my-10"
            />

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="font-serif-body text-xl md:text-2xl text-foreground/80 leading-relaxed max-w-2xl mx-auto mb-4"
            >
              A Escritura como única infalível regra de fé e prática —
              estudada com rigor acadêmico e ferramentas que servem ao texto sagrado.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.8 }}
              className="text-sm text-muted-foreground italic max-w-xl mx-auto mb-14"
            >
              Grego Koiné · Hebraico Bíblico · Teologia Sistemática · História · Geografia · IA Especializada
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.6 }}
              className="flex flex-wrap gap-4 justify-center"
            >
              <Link
                href="/biblia"
                className="group inline-flex items-center gap-3 bg-primary text-primary-foreground px-10 py-4 text-sm font-semibold tracking-wide hover:bg-primary/90 transition-all duration-500 hover:shadow-xl hover:shadow-primary/20 hover:scale-105"
              >
                Iniciar Estudo
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              <Link
                href="/ia"
                className="inline-flex items-center gap-3 px-10 py-4 text-sm font-semibold tracking-wide text-foreground border border-border hover:border-primary/50 hover:text-primary transition-all duration-500 hover:bg-primary/5 hover:scale-105"
              >
                <Sparkles className="w-4 h-4" />
                Consultar IA
              </Link>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="flex flex-col items-center gap-2 text-muted-foreground/50"
            >
              <span className="text-[10px] uppercase tracking-widest">Explore</span>
              <ChevronDown className="w-4 h-4" />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="py-24 px-6 bg-card/30 border-y border-border/30">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <ScrollReveal key={stat.label} delay={i * 0.1}>
                <div className="text-center group">
                  <motion.div 
                    className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 animate-float group-hover:bg-primary/15 transition-all duration-500 group-hover:scale-110" 
                    style={{ animationDelay: `${i * 0.2}s` }}
                    whileHover={{ scale: 1.15, rotate: 5 }}
                  >
                    <stat.icon className="w-6 h-6 text-primary" />
                  </motion.div>
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
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-3">Recursos</p>
              <h2 className="font-display text-4xl md:text-5xl font-light mb-4">
                Tudo que você precisa para <span className="italic text-primary">estudar a Palavra</span>
              </h2>
              <div className="ornament w-16 mx-auto mt-6" />
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <ScrollReveal key={f.title} delay={i * 0.08}>
                <motion.div 
                  className="sola-card p-8 h-full group cursor-default"
                  whileHover={{ y: -6, boxShadow: '0 12px 40px rgba(196,162,101,0.12)' }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div 
                    className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/15 transition-all duration-500"
                    whileHover={{ rotate: 10, scale: 1.1 }}
                  >
                    <f.icon className="w-6 h-6 text-primary" />
                  </motion.div>
                  <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </motion.div>
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
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-3">Módulos</p>
              <h2 className="font-display text-4xl md:text-5xl font-light mb-4">
                Explore cada <span className="italic text-primary">área do conhecimento</span>
              </h2>
              <div className="ornament w-16 mx-auto mt-6" />
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {modules.map((m, i) => (
              <ScrollReveal key={m.href} delay={i * 0.05}>
                <Link href={m.href}>
                  <motion.div
                    className={`block sola-card p-6 h-full bg-gradient-to-br ${m.color} group`}
                    whileHover={{ y: -4, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div whileHover={{ rotate: 10, scale: 1.15 }}>
                      <m.icon className="w-8 h-8 text-primary mb-4 group-hover:scale-110 transition-transform duration-300" />
                    </motion.div>
                    <h3 className="font-semibold mb-1">{m.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{m.desc}</p>
                    <ChevronRight className="w-4 h-4 text-muted-foreground mt-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </motion.div>
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
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-3">Depoimentos</p>
              <h2 className="font-display text-4xl md:text-5xl font-light mb-4">
                O que dizem sobre <span className="italic text-primary">nós</span>
              </h2>
              <div className="ornament w-16 mx-auto mt-6" />
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="relative sola-card p-10 sm:p-12 text-center min-h-[220px]">
              <div className="absolute top-6 left-8 text-primary/15">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <div className="relative z-10">
                <motion.p
                  key={currentTestimonial}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="font-serif-body text-xl md:text-2xl text-foreground/80 leading-relaxed mb-8 italic"
                >
                  &ldquo;{testimonials[currentTestimonial].text}&rdquo;
                </motion.p>
                <motion.div 
                  className="flex items-center justify-center gap-1 mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                    >
                      <Star className="w-4 h-4 text-primary fill-primary" />
                    </motion.div>
                  ))}
                </motion.div>
                <p className="font-semibold text-sm">{testimonials[currentTestimonial].author}</p>
                <p className="text-xs text-muted-foreground">{testimonials[currentTestimonial].role}</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 px-6 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
          backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(255,255,255,0.15) 0%, transparent 50%)',
        }} />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <ScrollReveal>
            <motion.h2 
              className="font-display text-4xl md:text-5xl font-light mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              Comece hoje o seu estudo
            </motion.h2>
            <p className="text-primary-foreground/80 mb-10 max-w-xl mx-auto leading-relaxed">
              Acesse todas as ferramentas gratuitamente. Estude a Bíblia com o rigor que ela merece.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href="/biblia"
                className="inline-flex items-center gap-2 bg-white text-primary px-10 py-4 text-sm font-semibold tracking-wide hover:bg-white/90 transition-all duration-500 hover:shadow-xl"
              >
                Começar Agora
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
