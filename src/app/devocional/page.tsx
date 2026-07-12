'use client';

import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { devocionais, getDevocionalDoDia } from '@/lib/devocional';
import { ChevronLeft, ChevronRight, Share2, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { NotificationBanner } from '@/components/NotificationBanner';

export default function DevocionalPage() {
  const hoje = Math.floor((new Date().getTime() - new Date(new Date().getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  const [diaAtual, setDiaAtual] = useState(hoje);
  const devocional = getDevocionalDoDia(diaAtual);

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: `${devocional.titulo} — Devocional`,
        text: `${devocional.titulo}\n\n${devocional.texto}\n\n${devocional.meditacao}`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Header />
      <main className="pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">
          <NotificationBanner />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-10">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--muted-fg)] mb-2">
                Devocional Diário
              </p>
              <h1 className="font-display text-4xl md:text-5xl font-light text-[var(--fg)]">
                {devocional.titulo}
              </h1>
              <div className="ornament w-16 mx-auto mt-4" />
            </div>

            <div className="sola-card p-8 md:p-10 mb-6">
              <div className="mb-8">
                <p className="font-serif-body text-lg leading-relaxed text-[var(--fg)]/90 italic border-l-4 border-[var(--primary)] pl-4">
                  {devocional.texto}
                </p>
                <Link
                  href={`/biblia?livro=${devocional.versiculo.livro}&capitulo=${devocional.versiculo.capitulo}`}
                  className="inline-flex items-center gap-1 mt-3 text-sm text-[var(--primary)] hover:underline"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  Ler capítulo completo
                </Link>
              </div>

              <div className="mb-8">
                <h2 className="text-sm font-semibold text-[var(--muted-fg)] uppercase tracking-wider mb-3">Meditação</h2>
                <p className="text-[var(--fg)] leading-relaxed">{devocional.meditacao}</p>
              </div>

              <div className="bg-[var(--bg)] rounded-xl p-6">
                <h2 className="text-sm font-semibold text-[var(--muted-fg)] uppercase tracking-wider mb-3">Oração</h2>
                <p className="text-[var(--fg)] leading-relaxed italic">&ldquo;{devocional.oracao}&rdquo;</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <motion.button
                onClick={() => setDiaAtual(p => Math.max(1, p - 1))}
                disabled={diaAtual <= 1}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-1.5 px-4 py-2 text-sm border border-[var(--border)] rounded-lg disabled:opacity-30 hover:bg-[var(--card-bg)] transition-all duration-300"
              >
                <ChevronLeft className="w-4 h-4" /> Anterior
              </motion.button>

              <motion.button
                onClick={handleShare}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-1.5 px-4 py-2 text-sm border border-[var(--border)] rounded-lg hover:bg-[var(--card-bg)] transition-all duration-300 text-[var(--primary)]"
              >
                <Share2 className="w-4 h-4" /> Compartilhar
              </motion.button>

              <motion.button
                onClick={() => setDiaAtual(p => Math.min(365, p + 1))}
                disabled={diaAtual >= 365}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-1.5 px-4 py-2 text-sm border border-[var(--border)] rounded-lg disabled:opacity-30 hover:bg-[var(--card-bg)] transition-all duration-300"
              >
                Próximo <ChevronRight className="w-4 h-4" />
              </motion.button>
            </div>

            <p className="text-center text-xs text-[var(--muted-fg)]/70 mt-6">
              Dia {devocional.dia} de {devocionais.length}
            </p>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
