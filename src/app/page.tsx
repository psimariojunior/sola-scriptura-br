'use client';

import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { BookOpen, Languages, Church, Map, Brain, ScrollText, Clock, Users, ArrowRight, Sparkles } from 'lucide-react';

const modules = [
  { href: '/biblia', icon: BookOpen, title: 'Bíblia', desc: 'Multi-tradução com busca avançada' },
  { href: '/idiomas', icon: Languages, title: 'Línguas Originais', desc: 'Grego Koiné e Hebraico Bíblico' },
  { href: '/teologia', icon: Church, title: 'Teologia', desc: 'Sistemática e doutrinas' },
  { href: '/historia', icon: Map, title: 'História & Geografia', desc: 'Mapas e contexto histórico' },
  { href: '/ia', icon: Brain, title: 'Assistente IA', desc: 'Especialista em estudos bíblicos' },
  { href: '/exegese', icon: ScrollText, title: 'Exegese', desc: 'Análise textual profunda' },
  { href: '/cronologia', icon: Clock, title: 'Cronologia', desc: 'Linha do tempo bíblica' },
  { href: '/personagens', icon: Users, title: 'Personagens', desc: 'Biografias e genealogias' },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'radial-gradient(circle at 20% 50%, hsl(var(--gold)) 0%, transparent 40%), radial-gradient(circle at 80% 20%, hsl(var(--burgundy)) 0%, transparent 35%)',
            }}
          />
        </div>

        <div className="max-w-4xl mx-auto text-center relative">
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-muted-foreground mb-8">
            Estudo Bíblico Acadêmico
          </p>

          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-light leading-[0.95] tracking-tight mb-6">
            Sola
            <br />
            <span className="italic font-medium text-primary">Scriptura</span>
          </h1>

          <div className="ornament w-24 mx-auto my-8" />

          <p className="font-serif-body text-xl md:text-2xl text-foreground/80 leading-relaxed max-w-2xl mx-auto mb-4">
            A Escritura como única infalível regra de fé e prática —
            estudada com rigor acadêmico e ferramentas que servem ao texto sagrado.
          </p>

          <p className="text-sm text-muted-foreground italic max-w-xl mx-auto mb-12">
            Grego Koiné · Hebraico Bíblico · Teologia Sistemática · História · Geografia · IA Especializada
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/biblia"
              className="group inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 text-sm font-semibold tracking-wide hover:bg-primary/90 transition-colors"
            >
              Iniciar Estudo
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/ia"
              className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold tracking-wide text-foreground border border-border hover:border-primary/50 hover:text-primary transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              Consultar IA
            </Link>
          </div>
        </div>
      </section>

      {/* Modules */}
      <section className="py-24 px-6 bg-card/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-light mb-4">Ferramentas de Estudo</h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Tudo que você precisa para um estudo bíblico profundo e acadêmico.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {modules.map((mod) => (
              <Link key={mod.href} href={mod.href} className="sola-card p-6 group">
                <mod.icon className="w-8 h-8 text-primary mb-4 group-hover:text-gold transition-colors" strokeWidth={1.5} />
                <h3 className="font-semibold text-lg mb-2">{mod.title}</h3>
                <p className="text-sm text-muted-foreground">{mod.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Verse */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="ornament w-16 mx-auto mb-12" />
          <blockquote className="font-serif-body text-2xl md:text-3xl text-foreground/90 leading-relaxed italic mb-6">
            &ldquo;No princípio era o Verbo, e o Verbo estava com Deus, e o Verbo era Deus.&rdquo;
          </blockquote>
          <cite className="text-sm text-muted-foreground not-italic">João 1:1</cite>
          <div className="ornament w-16 mx-auto mt-12" />
        </div>
      </section>

      <Footer />
    </div>
  );
}
