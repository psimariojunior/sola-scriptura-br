'use client';

import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { cronologia } from '@/data/biblia';
import ScrollReveal from '@/components/ScrollReveal';
import { CalendarDays, Filter, Sparkles } from 'lucide-react';

const tipoCores: Record<string, { bg: string; text: string; dot: string; gradient: string }> = {
  criacao: { bg: 'bg-purple-100 dark:bg-purple-900/30', text: 'text-purple-800 dark:text-purple-300', dot: 'bg-purple-500', gradient: 'from-purple-500 to-purple-600' },
  patriarca: { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-800 dark:text-blue-300', dot: 'bg-blue-500', gradient: 'from-blue-500 to-blue-600' },
  lei: { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-800 dark:text-green-300', dot: 'bg-green-500', gradient: 'from-green-500 to-green-600' },
  reis: { bg: 'bg-yellow-100 dark:bg-yellow-900/30', text: 'text-yellow-800 dark:text-yellow-300', dot: 'bg-yellow-500', gradient: 'from-yellow-500 to-yellow-600' },
  profeta: { bg: 'bg-orange-100 dark:bg-orange-900/30', text: 'text-orange-800 dark:text-orange-300', dot: 'bg-orange-500', gradient: 'from-orange-500 to-orange-600' },
  exilio: { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-800 dark:text-red-300', dot: 'bg-red-500', gradient: 'from-red-500 to-red-600' },
  vinda: { bg: 'bg-pink-100 dark:bg-pink-900/30', text: 'text-pink-800 dark:text-pink-300', dot: 'bg-pink-500', gradient: 'from-pink-500 to-pink-600' },
  igreja: { bg: 'bg-indigo-100 dark:bg-indigo-900/30', text: 'text-indigo-800 dark:text-indigo-300', dot: 'bg-indigo-500', gradient: 'from-indigo-500 to-indigo-600' },
};

const tipoLabels: Record<string, string> = {
  criacao: 'Criação',
  patriarca: 'Patriarcas',
  lei: 'Lei',
  reis: 'Reis',
  profeta: 'Profetas',
  exilio: 'Exílio',
  vinda: 'Vinda de Cristo',
  igreja: 'Igreja Primitiva',
};

const tipoIcones: Record<string, string> = {
  criacao: '🌌',
  patriarca: '🏕️',
  lei: '📜',
  reis: '👑',
  profeta: '👁️',
  exilio: '⛓️',
  vinda: '✝️',
  igreja: '🔥',
};

export default function CronologiaPage() {
  const [filtro, setFiltro] = useState<string>('todos');

  const tipos = [...new Set(cronologia.map(e => e.tipo))];
  const filtrados = filtro === 'todos' ? cronologia : cronologia.filter(e => e.tipo === filtro);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          {/* Hero Section */}
          <ScrollReveal>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <CalendarDays className="w-4 h-4" />
                Cronologia das Escrituras
              </div>
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-light mb-4">
                Cronologia <span className="text-primary italic">Bíblica</span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Linha do tempo da criação à igreja primitiva — uma jornada pela história divina
              </p>
            </div>
          </ScrollReveal>

          {/* Filters */}
          <ScrollReveal>
            <div className="glass-card p-4 rounded-2xl mb-8">
              <div className="flex items-center gap-3 mb-3">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Filtrar por período</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setFiltro('todos')}
                  className={`px-4 py-2 text-sm font-medium rounded-xl transition-all ${
                    filtro === 'todos'
                      ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                      : 'border border-border/50 text-muted-foreground hover:bg-muted/50'
                  }`}
                >
                  Todos
                </button>
                {tipos.map((tipo) => (
                  <button
                    key={tipo}
                    onClick={() => setFiltro(tipo)}
                    className={`px-4 py-2 text-sm font-medium rounded-xl transition-all flex items-center gap-2 ${
                      filtro === tipo
                        ? `bg-gradient-to-r ${tipoCores[tipo]?.gradient} text-white shadow-lg`
                        : `${tipoCores[tipo]?.bg} ${tipoCores[tipo]?.text} hover:opacity-80`
                    }`}
                  >
                    <span>{tipoIcones[tipo]}</span>
                    {tipoLabels[tipo]}
                  </button>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-primary to-indigo-500" />

            <div className="space-y-8">
              {filtrados.map((evento, i) => (
                <ScrollReveal key={i} delay={Math.min(i * 30, 300)}>
                  <div className={`relative flex items-start gap-6 sm:gap-8 ${
                    i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'
                  }`}>
                    {/* Dot */}
                    <div className={`absolute left-6 sm:left-1/2 w-5 h-5 ${tipoCores[evento.tipo]?.dot} rounded-full -translate-x-2.5 sm:-translate-x-2.5 z-10 ring-4 ring-background shadow-lg`} />

                    {/* Content */}
                    <div className={`ml-16 sm:ml-0 sm:w-[calc(50%-2.5rem)] ${i % 2 === 0 ? 'sm:pr-8 sm:text-right' : 'sm:pl-8'}`}>
                      <div className="glass-card rounded-2xl overflow-hidden hover:shadow-lg transition-all">
                        {/* Header with gradient */}
                        <div className={`px-5 py-3 bg-gradient-to-r ${tipoCores[evento.tipo]?.gradient}`}>
                          <div className={`flex items-center gap-2 ${i % 2 === 0 ? 'sm:justify-end' : ''}`}>
                            <span className="text-lg">{tipoIcones[evento.tipo]}</span>
                            <span className="text-xs font-bold text-white/90 uppercase tracking-wider">
                              {tipoLabels[evento.tipo]}
                            </span>
                          </div>
                        </div>
                        
                        {/* Content */}
                        <div className="p-5">
                          <p className="font-mono text-sm text-primary font-semibold mb-1">{evento.ano}</p>
                          <h3 className="font-semibold text-lg mb-1">{evento.evento}</h3>
                          <p className="text-xs text-muted-foreground font-mono">{evento.referencia}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Legend */}
          <ScrollReveal>
            <div className="glass-card p-6 rounded-2xl mt-12">
              <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">Legenda</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {tipos.map((tipo) => (
                  <div key={tipo} className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${tipoCores[tipo]?.dot}`} />
                    <span className="text-xs text-muted-foreground">{tipoLabels[tipo]}</span>
                  </div>
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
