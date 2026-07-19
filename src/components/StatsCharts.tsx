'use client';

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
  LineChart, Line,
} from 'recharts';
import { motion } from 'framer-motion';
import { Flame, BookOpen, TrendingUp, Calendar } from 'lucide-react';

interface WeeklyChartData {
  name: string;
  value: number;
}

interface BooksChartData {
  name: string;
  value: number;
}

interface StreakLineData {
  name: string;
  capitulos: number;
}

const COLORS = ['#b45309', '#92400e', '#78350f', '#451a03', '#a16207', '#854d0e', '#713f12'];

function ChartTooltip(props: Record<string, unknown>) {
  return (
    <Tooltip
      {...props}
      contentStyle={{
        backgroundColor: 'var(--card)',
        border: '1px solid var(--border)',
        borderRadius: '8px',
        fontSize: '12px',
      }}
    />
  );
}

export default function StatsCharts({
  weeklyChartData,
  booksChartData,
  streakLineData,
}: {
  weeklyChartData: WeeklyChartData[];
  booksChartData: BooksChartData[];
  streakLineData: StreakLineData[];
}) {
  return (
    <>
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="sola-card p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-4 h-4 text-[var(--muted-fg)]" />
            <h2 className="text-sm font-semibold text-[var(--muted-fg)] uppercase tracking-wider">Atividade Semanal</h2>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={weeklyChartData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: 'var(--muted-fg)' }} />
              <YAxis tick={{ fontSize: 11, fill: 'var(--muted-fg)' }} />
              <ChartTooltip />
              <Bar dataKey="value" fill="#b45309" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="sola-card p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-4 h-4 text-[var(--muted-fg)]" />
            <h2 className="text-sm font-semibold text-[var(--muted-fg)] uppercase tracking-wider">Livros Lidos</h2>
          </div>
          <div className="flex items-center gap-4">
            <ResponsiveContainer width="50%" height={200}>
              <PieChart>
                <Pie
                  data={booksChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {booksChartData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <ChartTooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-1.5 max-h-48 overflow-y-auto">
              {booksChartData.map((item, i) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                  <span className="text-xs text-[var(--fg)] flex-1 truncate">{item.name}</span>
                  <span className="text-[10px] text-[var(--muted-fg)]">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="sola-card p-6 mt-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-4 h-4 text-[var(--muted-fg)]" />
          <h2 className="text-sm font-semibold text-[var(--muted-fg)] uppercase tracking-wider">Progresso nos Últimos 30 Dias</h2>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={streakLineData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 10, fill: 'var(--muted-fg)' }}
              interval={6}
            />
            <YAxis tick={{ fontSize: 11, fill: 'var(--muted-fg)' }} />
            <ChartTooltip />
            <Line
              type="monotone"
              dataKey="capitulos"
              stroke="#b45309"
              strokeWidth={2}
              dot={{ fill: '#b45309', r: 3 }}
              activeDot={{ r: 5, fill: '#b45309' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </>
  );
}
