'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, PieChart, TrendingUp, BookOpen, Download, Share2 } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface InfographicData {
  id: string;
  title: string;
  description: string;
  type: 'bar' | 'pie' | 'timeline' | 'comparison';
  data: { label: string; value: number; color?: string }[];
}

const INFOGRAPHICS: InfographicData[] = [
  {
    id: 'books-by-author',
    title: 'Livros por Autor',
    description: 'Quantidade de livros escritos por cada autor bíblico',
    type: 'bar',
    data: [
      { label: 'Moisés', value: 5, color: '#EF4444' },
      { label: 'Davi', value: 73, color: '#3B82F6' },
      { label: 'Salomão', value: 4, color: '#10B981' },
      { label: 'Isaías', value: 1, color: '#F59E0B' },
      { label: 'Paulo', value: 13, color: '#8B5CF6' },
      { label: 'João', value: 5, color: '#EC4899' },
      { label: 'Pedro', value: 2, color: '#06B6D4' },
      { label: 'Lucas', value: 2, color: '#F97316' },
    ],
  },
  {
    id: 'chapters-length',
    title: 'Capítulos Mais Longos',
    description: 'Top 10 capítulos com mais versículos',
    type: 'bar',
    data: [
      { label: 'Sl 119', value: 176, color: '#3B82F6' },
      { label: 'Nm 7', value: 89, color: '#10B981' },
      { label: '1 Cr 12', value: 40, color: '#F59E0B' },
      { label: 'Jó 38', value: 41, color: '#EF4444' },
      { label: 'Mt 26', value: 75, color: '#8B5CF6' },
      { label: 'At 7', value: 60, color: '#EC4899' },
      { label: 'Is 40', value: 31, color: '#06B6D4' },
      { label: 'Ap 21', value: 27, color: '#F97316' },
    ],
  },
  {
    id: 'themes-distribution',
    title: 'Distribuição de Temas',
    description: 'Porcentagem dos principais temas bíblicos',
    type: 'pie',
    data: [
      { label: 'Amor', value: 23, color: '#EF4444' },
      { label: 'Fé', value: 18, color: '#3B82F6' },
      { label: 'Oração', value: 15, color: '#F59E0B' },
      { label: 'Profecia', value: 14, color: '#F97316' },
      { label: 'Justiça', value: 12, color: '#EC4899' },
      { label: 'Salvação', value: 10, color: '#8B5CF6' },
      { label: 'Outros', value: 8, color: '#6B7280' },
    ],
  },
  {
    id: 'old-vs-new',
    title: 'AT vs NT',
    description: 'Comparação entre Antigo e Novo Testamento',
    type: 'comparison',
    data: [
      { label: 'Livros', value: 39, color: '#F59E0B' },
      { label: 'Livros', value: 27, color: '#3B82F6' },
      { label: 'Capítulos', value: 929, color: '#F59E0B' },
      { label: 'Capítulos', value: 260, color: '#3B82F6' },
      { label: 'Versículos', value: 23145, color: '#F59E0B' },
      { label: 'Versículos', value: 7959, color: '#3B82F6' },
    ],
  },
  {
    id: 'longest-books',
    title: 'Livros Mais Longos',
    description: 'Top 10 livros com mais capítulos',
    type: 'bar',
    data: [
      { label: 'Salmos', value: 150, color: '#3B82F6' },
      { label: 'Isaías', value: 66, color: '#10B981' },
      { label: 'Jeremias', value: 52, color: '#F59E0B' },
      { label: 'Gênesis', value: 50, color: '#EF4444' },
      { label: 'Números', value: 36, color: '#8B5CF6' },
      { label: 'Ezequiel', value: 48, color: '#EC4899' },
      { label: '1 Crônicas', value: 29, color: '#06B6D4' },
      { label: 'Êxodo', value: 40, color: '#F97316' },
    ],
  },
];

export function BibleInfographics() {
  const [selected, setSelected] = useState<InfographicData>(INFOGRAPHICS[0]);

  const renderChart = (infographic: InfographicData) => {
    const maxValue = Math.max(...infographic.data.map(d => d.value));

    if (infographic.type === 'bar') {
      return (
        <div className="space-y-2 p-4">
          {infographic.data.map((item, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <span className="text-xs w-20 text-right text-[var(--content-muted)] truncate">{item.label}</span>
              <div className="flex-1 h-6 bg-[var(--surface-sunken)] rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: `${(item.value / maxValue) * 100}%` }}
                  transition={{ delay: idx * 0.05, duration: 0.5 }}
                  className="h-full rounded-full flex items-center justify-end pr-2"
                  style={{ backgroundColor: item.color || 'var(--brand)' }}>
                  <span className="text-[10px] font-bold text-white">{item.value}</span>
                </motion.div>
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (infographic.type === 'pie') {
      const total = infographic.data.reduce((sum, d) => sum + d.value, 0);
      let cumulative = 0;

      return (
        <div className="p-4">
          <div className="relative w-48 h-48 mx-auto mb-4">
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
              {infographic.data.map((item, idx) => {
                const percentage = (item.value / total) * 100;
                const dashArray = `${percentage} ${100 - percentage}`;
                const dashOffset = -cumulative;
                cumulative += percentage;
                return (
                  <circle key={idx} cx="50" cy="50" r="40" fill="none"
                    stroke={item.color} strokeWidth="20"
                    strokeDasharray={dashArray} strokeDashoffset={dashOffset}
                    className="transition-all duration-500" />
                );
              })}
            </svg>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {infographic.data.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-[var(--content-muted)]">{item.label}</span>
                <span className="font-bold ml-auto">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (infographic.type === 'comparison') {
      const at = infographic.data.filter((_, i) => i % 2 === 0);
      const nt = infographic.data.filter((_, i) => i % 2 === 1);

      return (
        <div className="p-4">
          <div className="flex gap-4 mb-4">
            <div className="flex-1 text-center">
              <div className="text-xs font-bold text-yellow-500 mb-1">Antigo Testamento</div>
            </div>
            <div className="flex-1 text-center">
              <div className="text-xs font-bold text-blue-500 mb-1">Novo Testamento</div>
            </div>
          </div>
          {at.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 mb-2">
              <div className="flex-1 text-right">
                <span className="text-xs text-[var(--content-muted)]">{item.label}</span>
                <div className="text-lg font-bold text-yellow-500">{item.value.toLocaleString()}</div>
              </div>
              <div className="w-px h-8 bg-[var(--border)]" />
              <div className="flex-1 text-left">
                <span className="text-xs text-[var(--content-muted)]">{nt[idx].label}</span>
                <div className="text-lg font-bold text-blue-500">{nt[idx].value.toLocaleString()}</div>
              </div>
            </div>
          ))}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-[var(--border)]/40">
        <div className="flex items-center gap-2 mb-1">
          <BarChart3 className="w-5 h-5 text-[var(--brand)]" />
          <h2 className="font-bold text-lg">Infográficos Bíblicos</h2>
        </div>
        <p className="text-xs text-[var(--content-muted)]">Dados visuais da Bíblia. Compartilhe com a comunidade.</p>
      </div>

      {/* Infographic selector */}
      <div className="flex gap-2 p-3 overflow-x-auto">
        {INFOGRAPHICS.map(inf => (
          <button key={inf.id} onClick={() => setSelected(inf)}
            className={cn('flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all border',
              selected.id === inf.id ? 'bg-[var(--brand)] text-white border-[var(--brand)]' : 'border-[var(--border)] hover:border-[var(--brand)]/50')}>
            {inf.type === 'bar' ? <BarChart3 className="w-3 h-3" /> :
             inf.type === 'pie' ? <PieChart className="w-3 h-3" /> :
             <TrendingUp className="w-3 h-3" />}
            {inf.title}
          </button>
        ))}
      </div>

      {/* Chart */}
      <div className="flex-1 overflow-auto">
        <div className="bg-[var(--surface-raised)] rounded-xl border border-[var(--border)]/40 mx-3 mb-3">
          <div className="p-4 border-b border-[var(--border)]/20">
            <h3 className="font-bold text-sm">{selected.title}</h3>
            <p className="text-xs text-[var(--content-muted)]">{selected.description}</p>
          </div>
          {renderChart(selected)}
        </div>

        {/* Share */}
        <div className="flex gap-2 px-3 pb-3">
          <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-[var(--brand)]/10 text-[var(--brand)] text-xs font-medium hover:bg-[var(--brand)]/20 transition-colors">
            <Share2 className="w-3.5 h-3.5" /> Compartilhar
          </button>
          <button className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[var(--surface-raised)] border border-[var(--border)] text-[var(--content-muted)] text-xs font-medium hover:bg-[var(--surface-sunken)] transition-colors">
            <Download className="w-3.5 h-3.5" /> Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
