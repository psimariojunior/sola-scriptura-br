'use client';

import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import {
  BookOpen, Search, Brain, Map, Languages, ArrowRight,
  Heart, BookMarked, Clock, TrendingUp, Compass, Mic,
  Users, User, StickyNote,
} from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import dynamic from 'next/dynamic';

const VerseDoDia = dynamic(() => import('@/components/VerseDoDia'), { ssr: false });
const ContinuarLeitura = dynamic(() => import('@/components/ContinuarLeitura'), { ssr: false });
const StreakCard = dynamic(() => import('@/components/StreakCard').then(m => ({ default: m.StreakCard })), { ssr: false });

const FERRAMENTAS = [
  { href: '/biblia', icon: BookOpen, label: 'Bíblia', desc: '10 traduções, áudio, karaoke', cor: 'from-blue-500/15 to-blue-600/5' },
  { href: '/pesquisa', icon: Search, label: 'Pesquisa', desc: 'Busca semântica e avançada', cor: 'from-emerald-500/15 to-emerald-600/5' },
  { href: '/idiomas', icon: Languages, label: 'Grego/Hebraico', desc: '14.200 verbetes Strong\'s', cor: 'from-violet-500/15 to-violet-600/5' },
  { href: '/exegese', icon: Brain, label: 'Estudo Bíblico', desc: 'Análise com IA gratuita', cor: 'from-purple-500/15 to-purple-600/5' },
  { href: '/atlas', icon: Map, label: 'Atlas', desc: 'Mapas interativos', cor: 'from-amber-500/15 to-amber-600/5' },
  { href: '/comparar', icon: Compass, label: 'Comparar', desc: 'Lado a lado com diff', cor: 'from-rose-500/15 to-rose-600/5' },
];

const LEITURAS = [
  { titulo: 'Salmos para Ansiedade', dias: 7, cor: 'bg-blue-500/10 text-blue-600' },
  { titulo: 'Evangelhos em 7 Dias', dias: 7, cor: 'bg-emerald-500/10 text-emerald-600' },
  { titulo: 'Fundamentos da Fé', dias: 21, cor: 'bg-amber-500/10 text-amber-600' },
  { titulo: 'Provérbios da Sabedoria', dias: 31, cor: 'bg-purple-500/10 text-purple-600' },
];

export default function HomeClient() {
  const { t } = useTranslation();
  const [busca, setBusca] = useState('');

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main id="main-content" className="pt-20 pb-24 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">

          {/* Busca rápida */}
          <ScrollReveal>
            <Link href="/pesquisa" className="block mb-6">
              <div className="flex items-center gap-3 px-4 py-3.5 rounded-2xl border border-border/50 bg-card/60 backdrop-blur-sm hover:border-primary/30 hover:bg-card/80 transition-all duration-300 group">
                <Search className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                <span className="text-sm text-muted-foreground">Buscar versículos, livros ou palavras...</span>
                <kbd className="ml-auto text-[10px] bg-muted/50 px-2 py-0.5 rounded-md text-muted-foreground">/</kbd>
              </div>
            </Link>
          </ScrollReveal>

          {/* Versículo do dia — destaque principal */}
          <ScrollReveal delay={0.05}>
            <VerseDoDia />
          </ScrollReveal>

          {/* Continuar lendo */}
          <ScrollReveal delay={0.1}>
            <ContinuarLeitura />
          </ScrollReveal>

          {/* Streak */}
          <ScrollReveal delay={0.15}>
            <div className="mb-6">
              <StreakCard />
            </div>
          </ScrollReveal>

          {/* Ferramentas — grid funcional */}
          <ScrollReveal delay={0.2}>
            <div className="mb-8">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Ferramentas</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {FERRAMENTAS.map((f, i) => (
                  <Link key={f.href} href={f.href}>
                    <motion.div
                      whileHover={{ y: -2, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`p-4 rounded-xl bg-gradient-to-br ${f.cor} border border-border/30 hover:border-primary/25 transition-all duration-300 group`}
                    >
                      <f.icon className="w-5 h-5 text-primary mb-2 group-hover:scale-110 transition-transform" />
                      <p className="text-sm font-semibold text-foreground">{f.label}</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">{f.desc}</p>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Planos de leitura */}
          <ScrollReveal delay={0.25}>
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Planos de Leitura</h2>
                <Link href="/planos" className="text-[11px] text-primary hover:text-primary/80 font-medium">Ver todos</Link>
              </div>
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {LEITURAS.map((l) => (
                  <Link key={l.titulo} href="/planos" className="flex-shrink-0 w-48">
                    <div className="p-4 rounded-xl bg-card/60 border border-border/30 hover:border-primary/25 transition-all">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${l.cor}`}>{l.dias} dias</span>
                      <p className="text-sm font-medium mt-2 line-clamp-2">{l.titulo}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Acesso rápido */}
          <ScrollReveal delay={0.3}>
            <div className="mb-8">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Meu Espaço</h2>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                {[
                  { href: '/favoritos', icon: Heart, label: 'Favoritos', cor: 'text-red-500' },
                  { href: '/notas', icon: StickyNote, label: 'Notas', cor: 'text-amber-500' },
                  { href: '/colecoes', icon: BookMarked, label: 'Coleções', cor: 'text-blue-500' },
                  { href: '/social', icon: Users, label: 'Social', cor: 'text-emerald-500' },
                  { href: '/planos', icon: Clock, label: 'Planos', cor: 'text-purple-500' },
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
      </main>
      <Footer />
    </div>
  );
}
