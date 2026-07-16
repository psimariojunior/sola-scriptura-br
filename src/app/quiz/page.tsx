'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { motion } from 'framer-motion';
import { Brain, Zap, BookOpen, Users, Trophy, ChevronRight, Clock, Target } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import Link from 'next/link';
import { LIVROS_BIBLIA } from '@/data/quiz';
import { useState, useEffect } from 'react';

const MODOS = [
  {
    id: 'classico',
    titulo: 'Quiz Clássico',
    descricao: 'Escolha nível e categoria. 30 segundos por pergunta.',
    icone: Brain,
    cor: 'from-primary/20 to-primary/5',
    iconeCor: 'text-primary',
    link: '/quiz/classico',
  },
  {
    id: 'tempo',
    titulo: 'Desafio do Tempo',
    descricao: '60 segundos. O máximo de acertos que conseguir.',
    icone: Zap,
    cor: 'from-amber-500/20 to-amber-500/5',
    iconeCor: 'text-amber-500',
    link: '/quiz/temporal',
  },
  {
    id: 'livro',
    titulo: 'Estudo por Livro',
    descricao: 'Foque em um livro específico da Bíblia.',
    icone: BookOpen,
    cor: 'from-emerald-500/20 to-emerald-500/5',
    iconeCor: 'text-emerald-500',
    link: '/quiz/livro',
  },
  {
    id: 'multiplayer',
    titulo: 'Multiplayer',
    descricao: 'Desafie amigos em tempo real.',
    icone: Users,
    cor: 'from-purple-500/20 to-purple-500/5',
    iconeCor: 'text-purple-500',
    link: '/quiz/multiplayer',
  },
];

interface RankingItem { nome: string; pontuacao: number; nivel: string; data: string; }

function carregarRanking(): RankingItem[] {
  if (typeof window === 'undefined') return [];
  try { return JSON.parse(localStorage.getItem('ssb_quiz_ranking') || '[]'); } catch { return []; }
}

export default function QuizPage() {
  const [ranking, setRanking] = useState<RankingItem[]>([]);
  useEffect(() => { setRanking(carregarRanking()); }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', duration: 0.6 }} className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Brain className="w-8 h-8 text-primary" />
              </motion.div>
              <h1 className="font-display text-4xl font-light mb-3">Quiz Bíblico</h1>
              <p className="text-muted-foreground max-w-md mx-auto">750+ perguntas em 5 categorias. Teste seus conhecimentos das Escrituras de várias formas.</p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
            {MODOS.map((modo, i) => (
              <ScrollReveal key={modo.id} delay={i * 0.1}>
                <Link href={modo.link}>
                  <motion.div whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }} className={`relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br ${modo.cor} p-6 cursor-pointer transition-all hover:shadow-lg hover:shadow-primary/5`}>
                    <div className={`w-12 h-12 rounded-xl bg-background/50 flex items-center justify-center mb-4 ${modo.iconeCor}`}>
                      <modo.icone className="w-6 h-6" />
                    </div>
                    <h3 className="font-display text-xl font-medium mb-1">{modo.titulo}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{modo.descricao}</p>
                    <div className="flex items-center gap-1 text-sm font-medium text-primary">
                      Jogar <ChevronRight className="w-4 h-4" />
                    </div>
                  </motion.div>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.3}>
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="rounded-2xl border border-border/50 bg-card/50 p-4 text-center">
                <Brain className="w-5 h-5 text-primary mx-auto mb-2" />
                <p className="font-display text-2xl font-light">520+</p>
                <p className="text-xs text-muted-foreground">Perguntas</p>
              </div>
              <div className="rounded-2xl border border-border/50 bg-card/50 p-4 text-center">
                <Target className="w-5 h-5 text-emerald-500 mx-auto mb-2" />
                <p className="font-display text-2xl font-light">5</p>
                <p className="text-xs text-muted-foreground">Categorias</p>
              </div>
              <div className="rounded-2xl border border-border/50 bg-card/50 p-4 text-center">
                <Clock className="w-5 h-5 text-amber-500 mx-auto mb-2" />
                <p className="font-display text-2xl font-light">4</p>
                <p className="text-xs text-muted-foreground">Modos</p>
              </div>
            </div>
          </ScrollReveal>

          {ranking.length > 0 && (
            <ScrollReveal delay={0.4}>
              <div className="rounded-2xl border border-border/50 bg-card/50 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Trophy className="w-4 h-4 text-amber-500" />
                  <h3 className="text-sm font-semibold">Ranking Geral</h3>
                </div>
                <div className="space-y-2">
                  {ranking.slice(0, 10).map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-2.5 rounded-xl bg-background/50">
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">{i + 1}</span>
                        <div>
                          <p className="text-sm font-medium">{item.nome}</p>
                          <p className="text-xs text-muted-foreground capitalize">{item.nivel}</p>
                        </div>
                      </div>
                      <span className="font-display text-lg font-semibold text-primary">{item.pontuacao}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
