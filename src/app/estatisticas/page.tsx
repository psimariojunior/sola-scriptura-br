'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { getStats, getStreakData } from '@/lib/estatisticas';
import { Flame, BookOpen, Heart, TrendingUp, Dna, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

const StatsCharts = dynamic(() => import('@/components/StatsCharts'), {
  ssr: false,
  loading: () => (
    <div className="sola-card p-6 animate-pulse">
      <div className="h-48 bg-muted/30 rounded-lg" />
    </div>
  ),
});

const BibleDNA = dynamic(() => import('@/components/BibleDNA').then(m => ({ default: m.BibleDNA })), {
  ssr: false,
  loading: () => <div className="sola-card p-6 animate-pulse"><div className="h-64 bg-muted/30 rounded-lg" /></div>,
});

const BibleInfographics = dynamic(() => import('@/components/BibleInfographics').then(m => ({ default: m.BibleInfographics })), {
  ssr: false,
  loading: () => <div className="sola-card p-6 animate-pulse"><div className="h-64 bg-muted/30 rounded-lg" /></div>,
});

interface Stats {
  streak: number;
  chaptersThisWeek: number;
  totalVerses: number;
  totalChapters: number;
  favoriteBook: string;
  weeklyData: Record<string, number>;
  booksRead: Record<string, number>;
  dailyLog: Record<string, number>;
}

export default function EstatisticasPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [streakData, setStreakData] = useState<{ date: string; count: number }[]>([]);

  useEffect(() => {
    setStats(getStats());
    setStreakData(getStreakData());
  }, []);

  if (!stats) {
    return (
      <div className="min-h-screen bg-[var(--bg)]">
        <Header />
        <main className="pt-24 pb-16 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center py-20">
            <div className="skeleton skeleton-title w-48 mx-auto" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const diasSemana = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'];
  const diasAbreviados = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  const maxWeekly = Math.max(1, ...Object.values(stats.weeklyData));

  const maxBook = Math.max(1, ...Object.values(stats.booksRead));
  const livrosOrdenados = Object.entries(stats.booksRead).sort((a, b) => b[1] - a[1]);

  const weeklyChartData = diasAbreviados.map((dia, i) => ({
    name: dia,
    value: stats.weeklyData[dia] || 0,
  }));

  const booksChartData = livrosOrdenados.slice(0, 7).map(([livro, count]) => ({
    name: livro,
    value: count,
  }));

  const today = new Date();
  const last30Days: { date: string; count: number }[] = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    const found = streakData.find(s => s.date === dateStr);
    last30Days.push({ date: dateStr, count: found ? found.count : 0 });
  }

  const streakLineData = last30Days.map(d => ({
    name: new Date(d.date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
    capitulos: d.count,
  }));

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Header />
      <main className="pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-10">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--muted-fg)] mb-2">
                Estatísticas
              </p>
              <h1 className="font-display text-4xl md:text-5xl font-light text-[var(--fg)]">
                Seu Progresso de Leitura
              </h1>
              <div className="ornament w-16 mx-auto mt-4" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              {[
                { icon: Flame, label: 'Sequência Atual', value: `${stats.streak} dias`, color: 'text-orange-500' },
                { icon: BookOpen, label: 'Capítulos esta semana', value: `${stats.chaptersThisWeek}`, color: 'text-blue-500' },
                { icon: Heart, label: 'Total de Capítulos', value: `${stats.totalChapters}`, color: 'text-red-400' },
                { icon: TrendingUp, label: 'Livro Favorito', value: stats.favoriteBook, color: 'text-purple-500' },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="sola-card p-5 text-center"
                >
                  <item.icon className={`w-6 h-6 mx-auto mb-2 ${item.color}`} />
                  <p className="font-display text-2xl font-light text-[var(--fg)] mb-1">{item.value}</p>
                  <p className="text-[11px] text-[var(--muted-fg)] uppercase tracking-wider">{item.label}</p>
                </motion.div>
              ))}
            </div>

            <StatsCharts
              weeklyChartData={weeklyChartData}
              booksChartData={booksChartData}
              streakLineData={streakLineData}
            />

            {/* Bible DNA */}
            <div className="mt-10">
              <div className="flex items-center gap-2 mb-4">
                <Dna className="w-5 h-5 text-[var(--brand)]" />
                <h2 className="font-display text-2xl font-light text-[var(--fg)]">Bible DNA</h2>
              </div>
              <div className="sola-card overflow-hidden" style={{ height: '500px' }}>
                <BibleDNA />
              </div>
            </div>

            {/* Infographics */}
            <div className="mt-10">
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 className="w-5 h-5 text-[var(--brand)]" />
                <h2 className="font-display text-2xl font-light text-[var(--fg)]">Infográficos Bíblicos</h2>
              </div>
              <div className="sola-card overflow-hidden" style={{ height: '500px' }}>
                <BibleInfographics />
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
