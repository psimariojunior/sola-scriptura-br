'use client';

import { useState, useEffect, useMemo } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { motion } from 'framer-motion';
import { BarChart3, BookOpen, Heart, FileText, Brain, Flame, Target, Trophy, TrendingUp, Clock } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import { cn } from '@/lib/utils';

interface ReadingSession {
  date: string;
  chaptersRead: number;
  timeSpent: number; // minutes
  books: string[];
}

export default function DashboardPage() {
  const [sessions, setSessions] = useState<ReadingSession[]>([]);
  const [favoritos, setFavoritos] = useState<any[]>([]);
  const [notas, setNotas] = useState<any[]>([]);
  const [flashcards, setFlashcards] = useState<any[]>([]);
  const [carregado, setCarregado] = useState(false);

  useEffect(() => {
    try {
      const s = localStorage.getItem('ssb_reading_sessions');
      if (s) setSessions(JSON.parse(s));
      const f = localStorage.getItem('ssb_favoritos');
      if (f) setFavoritos(JSON.parse(f));
      const n = localStorage.getItem('ssb_notas_rich');
      if (n) setNotas(JSON.parse(n));
      const fc = localStorage.getItem('ssb_flashcards');
      if (fc) setFlashcards(JSON.parse(fc));
    } catch {}
    setCarregado(true);
  }, []);

  const stats = useMemo(() => {
    const totalChapters = sessions.reduce((acc, s) => acc + s.chaptersRead, 0);
    const totalTime = sessions.reduce((acc, s) => acc + s.timeSpent, 0);
    const streak = calculateStreak(sessions);
    const uniqueBooks = new Set(sessions.flatMap(s => s.books)).size;
    const dueFlashcards = flashcards.filter((c: any) => c.nextReview <= Date.now()).length;
    const mastered = flashcards.filter((c: any) => c.repetition >= 5).length;
    return { totalChapters, totalTime, streak, uniqueBooks, dueFlashcards, mastered };
  }, [sessions, flashcards]);

  const weeklyData = useMemo(() => {
    const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    const now = new Date();
    return days.map((day, i) => {
      const date = new Date(now);
      date.setDate(date.getDate() - (6 - i));
      const dateStr = date.toISOString().slice(0, 10);
      const daySessions = sessions.filter(s => s.date === dateStr);
      return {
        day,
        chapters: daySessions.reduce((acc, s) => acc + s.chaptersRead, 0),
        time: daySessions.reduce((acc, s) => acc + s.timeSpent, 0),
      };
    });
  }, [sessions]);

  const maxChapters = Math.max(...weeklyData.map(d => d.chapters), 1);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h1 className="font-display text-3xl font-light">Meu <span className="text-primary italic">Dashboard</span></h1>
                <p className="text-sm text-muted-foreground">Acompanhe seu progresso no estudo bíblico</p>
              </div>
            </div>
          </ScrollReveal>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            {[
              { icon: Flame, label: 'Sequência', value: `${stats.streak} dias`, color: 'text-orange-500', bg: 'bg-orange-500/10' },
              { icon: BookOpen, label: 'Capítulos', value: stats.totalChapters.toString(), color: 'text-blue-500', bg: 'bg-blue-500/10' },
              { icon: Clock, label: 'Tempo total', value: `${stats.totalTime}min`, color: 'text-green-500', bg: 'bg-green-500/10' },
              { icon: Target, label: 'Livros', value: stats.uniqueBooks.toString(), color: 'text-purple-500', bg: 'bg-purple-500/10' },
            ].map(({ icon: Icon, label, value, color, bg }, i) => (
              <motion.div key={label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                className="rounded-xl border border-border/50 bg-card/50 p-4">
                <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center mb-2', bg)}>
                  <Icon className={cn('w-4 h-4', color)} />
                </div>
                <p className="text-2xl font-bold">{value}</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{label}</p>
              </motion.div>
            ))}
          </div>

          {/* Weekly Chart */}
          <ScrollReveal>
            <div className="rounded-2xl border border-border/50 bg-card/50 p-6 mb-8">
              <h2 className="font-display text-lg font-medium mb-4">Atividade da Semana</h2>
              <div className="flex items-end gap-2 h-40">
                {weeklyData.map((d, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full flex flex-col items-center gap-1" style={{ height: '120px', justifyContent: 'flex-end' }}>
                      <motion.div initial={{ height: 0 }} animate={{ height: `${(d.chapters / maxChapters) * 100}%` }}
                        transition={{ delay: i * 0.1, duration: 0.5 }}
                        className="w-full rounded-t-lg bg-gradient-to-t from-primary/80 to-primary/40 min-h-[4px]" />
                    </div>
                    <span className="text-[10px] text-muted-foreground">{d.day}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Content Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <ScrollReveal>
              <div className="rounded-2xl border border-border/50 bg-card/50 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Heart className="w-4 h-4 text-red-500" />
                  <h3 className="font-medium text-sm">Favoritos</h3>
                </div>
                <p className="text-3xl font-bold mb-1">{favoritos.length}</p>
                <p className="text-xs text-muted-foreground">versículos salvos</p>
              </div>
            </ScrollReveal>
            <ScrollReveal>
              <div className="rounded-2xl border border-border/50 bg-card/50 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="w-4 h-4 text-blue-500" />
                  <h3 className="font-medium text-sm">Notas</h3>
                </div>
                <p className="text-3xl font-bold mb-1">{notas.length}</p>
                <p className="text-xs text-muted-foreground">anotações pessoais</p>
              </div>
            </ScrollReveal>
            <ScrollReveal>
              <div className="rounded-2xl border border-border/50 bg-card/50 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Brain className="w-4 h-4 text-purple-500" />
                  <h3 className="font-medium text-sm">Memorização</h3>
                </div>
                <p className="text-3xl font-bold mb-1">{stats.mastered}</p>
                <p className="text-xs text-muted-foreground">versículos memorizados</p>
                {stats.dueFlashcards > 0 && (
                  <p className="text-[10px] text-orange-500 mt-1">⏳ {stats.dueFlashcards} para revisar</p>
                )}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function calculateStreak(sessions: ReadingSession[]): number {
  if (sessions.length === 0) return 0;
  const dates = [...new Set(sessions.map(s => s.date))].sort().reverse();
  let streak = 0;
  let current = new Date();
  current.setHours(0, 0, 0, 0);

  for (const dateStr of dates) {
    const d = new Date(dateStr);
    d.setHours(0, 0, 0, 0);
    const diff = (current.getTime() - d.getTime()) / (1000 * 60 * 60 * 24);
    if (diff <= 1) {
      streak++;
      current = d;
    } else break;
  }
  return streak;
}
