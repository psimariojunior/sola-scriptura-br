'use client';

import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Sparkles, BookOpen, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import dynamic from 'next/dynamic';

const AIChat = dynamic(() => import('@/components/AIChat'), {
  ssr: false,
  loading: () => (
    <div className="h-[60vh] min-h-[400px] flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3 animate-pulse">
          <Sparkles className="w-6 h-6 text-primary" />
        </div>
        <p className="text-sm text-muted-foreground">Carregando assistente...</p>
      </div>
    </div>
  ),
});

const tradicoes = [
  { valor: '', label: 'Geral' },
  { valor: 'reformada', label: 'Reformada' },
  { valor: 'arminiana', label: 'Arminiana' },
  { valor: 'baptista', label: 'Batista' },
  { valor: 'pentecostal', label: 'Pentecostal' },
  { valor: 'luterana', label: 'Luterana' },
  { valor: 'presbiteriana', label: 'Presbiteriana' },
];

export default function IaPage() {
  const [tradicao, setTradicao] = useState('');
  const [mostrarTradicoes, setMostrarTradicoes] = useState(false);

  const tradicaoLabel = tradicoes.find(t => t.valor === tradicao)?.label || 'Geral';

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/10">
      <Header />
      <main className="pt-16 pb-24 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <div className="mb-6 text-center pt-6">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-3"
              >
                <Sparkles className="w-7 h-7 text-primary" />
              </motion.div>
              <h1 className="font-display text-3xl md:text-4xl font-light mb-1">Assistente Bíblico</h1>
              <p className="text-muted-foreground text-sm">IA especializada em estudos bíblicos acadêmicos</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="relative mb-4 flex items-center justify-center">
              <button
                onClick={() => setMostrarTradicoes(!mostrarTradicoes)}
                className="flex items-center gap-2 px-4 py-2 text-xs font-medium bg-card border border-border rounded-full hover:bg-muted transition-all duration-300"
              >
                <BookOpen className="w-3.5 h-3.5" />
                Tradição: {tradicaoLabel}
                <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${mostrarTradicoes ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {mostrarTradicoes && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.96 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 z-20 bg-card border border-border rounded-xl shadow-xl p-2 flex flex-wrap justify-center gap-1 w-80"
                  >
                    {tradicoes.map(t => (
                      <button key={t.valor} onClick={() => { setTradicao(t.valor); setMostrarTradicoes(false); }}
                        className={`text-xs px-3 py-1.5 rounded-full transition-all duration-300 ${
                          tradicao === t.valor ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                        }`}>
                        {t.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="h-[60vh] min-h-[400px]">
              <AIChat tradicao={tradicao} onTradicaoChange={setTradicao} className="h-full" />
            </div>
          </ScrollReveal>
        </div>
      </main>
      <Footer />
    </div>
  );
}
