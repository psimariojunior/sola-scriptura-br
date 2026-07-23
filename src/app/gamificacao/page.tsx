'use client';

import { useState, useEffect, useMemo } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { motion } from 'framer-motion';
import { Trophy, Star, Flame, Target, BookOpen, Brain, MessageCircle, Calendar, Award, Zap, TrendingUp } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import { cn } from '@/lib/utils';

interface Achievement {
  id: string;
  nome: string;
  descricao: string;
  icone: string;
  cor: string;
  xp: number;
  desbloqueado: boolean;
  progresso: number;
  meta: number;
}

const CONQUISTAS_BASE: Achievement[] = [
  { id: 'first-read', nome: 'Primeira Leitura', descricao: 'Leia seu primeiro capítulo', icone: '📖', cor: 'bg-blue-500/10 text-blue-600', xp: 10, desbloqueado: false, progresso: 0, meta: 1 },
  { id: 'read-10', nome: 'Leitor Iniciante', descricao: 'Leia 10 capítulos', icone: '📚', cor: 'bg-green-500/10 text-green-600', xp: 50, desbloqueado: false, progresso: 0, meta: 10 },
  { id: 'read-100', nome: 'Leitor Dedicado', descricao: 'Leia 100 capítulos', icone: '🏆', cor: 'bg-amber-500/10 text-amber-600', xp: 200, desbloqueado: false, progresso: 0, meta: 100 },
  { id: 'read-1000', nome: 'Mestre da Bíblia', descricao: 'Leia 1000 capítulos', icone: '👑', cor: 'bg-purple-500/10 text-purple-600', xp: 1000, desbloqueado: false, progresso: 0, meta: 1000 },
  { id: 'streak-7', nome: 'Semana de Fogo', descricao: '7 dias seguidos de leitura', icone: '🔥', cor: 'bg-orange-500/10 text-orange-600', xp: 100, desbloqueado: false, progresso: 0, meta: 7 },
  { id: 'streak-30', nome: 'Mês Consagrado', descricao: '30 dias seguidos de leitura', icone: '⚡', cor: 'bg-yellow-500/10 text-yellow-600', xp: 500, desbloqueado: false, progresso: 0, meta: 30 },
  { id: 'streak-365', nome: 'Ano de Graça', descricao: '365 dias seguidos de leitura', icone: '💫', cor: 'bg-violet-500/10 text-violet-600', xp: 5000, desbloqueado: false, progresso: 0, meta: 365 },
  { id: 'memorize-5', nome: 'Memória Afetiva', descricao: 'Memorize 5 versículos', icone: '🧠', cor: 'bg-pink-500/10 text-pink-600', xp: 100, desbloqueado: false, progresso: 0, meta: 5 },
  { id: 'memorize-50', nome: 'Memorizador', descricao: 'Memorize 50 versículos', icone: '💎', cor: 'bg-cyan-500/10 text-cyan-600', xp: 500, desbloqueado: false, progresso: 0, meta: 50 },
  { id: 'favorite-10', nome: 'Colecionador', descricao: 'Favorite 10 versículos', icone: '❤️', cor: 'bg-red-500/10 text-red-600', xp: 50, desbloqueado: false, progresso: 0, meta: 10 },
  { id: 'note-5', nome: 'Estudioso', descricao: 'Crie 5 notas de estudo', icone: '📝', cor: 'bg-teal-500/10 text-teal-600', xp: 75, desbloqueado: false, progresso: 0, meta: 5 },
  { id: 'quiz-10', nome: 'Quiz Master', descricao: 'Acerte 10 perguntas do quiz', icone: '🎯', cor: 'bg-indigo-500/10 text-indigo-600', xp: 100, desbloqueado: false, progresso: 0, meta: 10 },
  { id: 'plan-complete', nome: 'Plano Concluído', descricao: 'Complete um plano de leitura', icone: '✅', cor: 'bg-emerald-500/10 text-emerald-600', xp: 300, desbloqueado: false, progresso: 0, meta: 1 },
  { id: 'share-verse', nome: 'Evangelista', descricao: 'Compartilhe um versículo', icone: '📤', cor: 'bg-sky-500/10 text-sky-600', xp: 25, desbloqueado: false, progresso: 0, meta: 1 },
  { id: 'use-ai', nome: 'Estudante IA', descricao: 'Use o assistente IA 5 vezes', icone: '🤖', cor: 'bg-fuchsia-500/10 text-fuchsia-600', xp: 75, desbloqueado: false, progresso: 0, meta: 5 },
  { id: 'all-books', nome: 'Bíblia Completa', descricao: 'Leia pelo menos 1 capítulo de cada livro', icone: '🌟', cor: 'bg-amber-500/10 text-amber-600', xp: 2000, desbloqueado: false, progresso: 0, meta: 66 },
];

function getLevel(xp: number): { nivel: number; titulo: string; xpAtual: number; xpProximo: number; progresso: number } {
  const niveis = [
    { nivel: 1, titulo: 'Novo na Fé', xp: 0 },
    { nivel: 2, titulo: 'Crente', xp: 100 },
    { nivel: 3, titulo: 'Estudante', xp: 300 },
    { nivel: 4, titulo: 'Estudioso', xp: 600 },
    { nivel: 5, titulo: 'Discípulo', xp: 1000 },
    { nivel: 6, titulo: 'Mestre', xp: 2000 },
    { nivel: 7, titulo: 'Doutor', xp: 4000 },
    { nivel: 8, titulo: 'Apóstolo', xp: 8000 },
    { nivel: 9, titulo: 'Profeta', xp: 15000 },
    { nivel: 10, titulo: 'Sábio', xp: 30000 },
  ];

  let atual = niveis[0];
  let proximo = niveis[1];

  for (let i = niveis.length - 1; i >= 0; i--) {
    if (xp >= niveis[i].xp) {
      atual = niveis[i];
      proximo = niveis[Math.min(i + 1, niveis.length - 1)];
      break;
    }
  }

  const xpAtual = xp - atual.xp;
  const xpProximo = proximo.xp - atual.xp;
  const progresso = xpProximo > 0 ? (xpAtual / xpProximo) * 100 : 100;

  return { nivel: atual.nivel, titulo: atual.titulo, xpAtual, xpProximo, progresso };
}

export default function GamificacaoPage() {
  const [conquistas, setConquistas] = useState<Achievement[]>(CONQUISTAS_BASE);
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('ssb_gamificacao');
      if (saved) {
        const data = JSON.parse(saved);
        setXp(data.xp || 0);
        setStreak(data.streak || 0);
        if (data.conquistas) {
          setConquistas(prev => prev.map(c => {
            const saved = data.conquistas.find((s: Achievement) => s.id === c.id);
            return saved ? { ...c, ...saved } : c;
          }));
        }
      }
    } catch {}
  }, []);

  const level = useMemo(() => getLevel(xp), [xp]);
  const conquistasDesbloqueadas = conquistas.filter(c => c.desbloqueado).length;
  const xpTotal = conquistas.filter(c => c.desbloqueado).reduce((acc, c) => acc + c.xp, 0);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-10">
              <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center border border-amber-500/20">
                <Trophy className="w-10 h-10 text-amber-500" />
              </div>
              <h1 className="font-display text-4xl font-light mb-3">Gamificação</h1>
              <p className="text-muted-foreground max-w-lg mx-auto">Acompanhe seu progresso, conquiste achievements e suba de nível</p>
            </div>
          </ScrollReveal>

          {/* Level Card */}
          <div className="rounded-2xl border border-border/50 bg-card/50 p-6 mb-8">
            <div className="flex items-center gap-6 mb-4">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                <span className="text-3xl font-display font-bold text-white">{level.nivel}</span>
              </div>
              <div className="flex-1">
                <h2 className="font-display text-2xl font-medium">{level.titulo}</h2>
                <p className="text-sm text-muted-foreground">Nível {level.nivel} · {xp} XP total</p>
                <div className="mt-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-muted-foreground">{level.xpAtual}/{level.xpProximo} XP</span>
                    <span className="text-xs text-muted-foreground">Próximo: Nível {level.nivel + 1}</span>
                  </div>
                  <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                    <motion.div className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
                      animate={{ width: `${level.progresso}%` }} transition={{ duration: 0.5 }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="text-center p-3 rounded-xl bg-muted/30">
                <Flame className="w-5 h-5 text-orange-500 mx-auto mb-1" />
                <p className="text-xl font-bold">{streak}</p>
                <p className="text-[10px] text-muted-foreground uppercase">Streak</p>
              </div>
              <div className="text-center p-3 rounded-xl bg-muted/30">
                <Award className="w-5 h-5 text-amber-500 mx-auto mb-1" />
                <p className="text-xl font-bold">{conquistasDesbloqueadas}</p>
                <p className="text-[10px] text-muted-foreground uppercase">Conquistas</p>
              </div>
              <div className="text-center p-3 rounded-xl bg-muted/30">
                <Zap className="w-5 h-5 text-yellow-500 mx-auto mb-1" />
                <p className="text-xl font-bold">{xp}</p>
                <p className="text-[10px] text-muted-foreground uppercase">XP Total</p>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <h2 className="font-display text-xl font-medium mb-4">Conquistas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {conquistas.map((c, i) => (
              <motion.div key={c.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className={cn('rounded-xl border p-4 transition-all',
                  c.desbloqueado ? 'border-amber-500/30 bg-amber-500/5' : 'border-border/50 bg-card/50 opacity-60')}>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{c.icone}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-sm">{c.nome}</h3>
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary font-medium">+{c.xp} XP</span>
                      {c.desbloqueado && <span className="text-[10px] text-green-500">✓</span>}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{c.descricao}</p>
                    {!c.desbloqueado && (
                      <div className="mt-2">
                        <div className="flex items-center justify-between mb-0.5">
                          <span className="text-[10px] text-muted-foreground">{c.progresso}/{c.meta}</span>
                        </div>
                        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-primary/50 rounded-full" style={{ width: `${(c.progresso / c.meta) * 100}%` }} />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
