'use client';

import { useState, useMemo } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Search, Filter, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { todasPericopes, getPericopesLivro, getPericopesPorGenero } from '@/data/biblia/pericopes';
import type { Pericope } from '@/data/biblia/pericopes';

const GENEROS: { valor: string; label: string }[] = [
  { valor: 'todos', label: 'Todos' },
  { valor: 'narrativa', label: 'Narrativa' },
  { valor: 'discurso', label: 'Discurso' },
  { valor: 'parabola', label: 'Parábola' },
  { valor: 'milagre', label: 'Milagre' },
  { valor: 'profecia', label: 'Profecia' },
  { valor: 'louvor', label: 'Louvor' },
  { valor: 'lamentacao', label: 'Lamentação' },
  { valor: 'sabedoria', label: 'Sabedoria' },
  { valor: 'lei', label: 'Lei' },
  { valor: 'epistola', label: 'Epístola' },
  { valor: 'apocalipse', label: 'Apocalipse' },
  { valor: 'oracao', label: 'Oração' },
];

const GENERO_COR: Record<string, string> = {
  narrativa: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  discurso: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
  parabola: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  milagre: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  profecia: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
  louvor: 'bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300',
  lamentacao: 'bg-gray-100 text-gray-700 dark:bg-gray-900/40 dark:text-gray-300',
  sabedoria: 'bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300',
  lei: 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300',
  epistola: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300',
  apocalipse: 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300',
  oracao: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300',
};

export default function PericopesPage() {
  const [busca, setBusca] = useState('');
  const [filtroGenero, setFiltroGenero] = useState('todos');
  const [filtroLivro, setFiltroLivro] = useState<string | null>(null);

  const livros = useMemo(() => {
    const l = [...new Set(todasPericopes.map((p) => p.livro))].sort();
    return l;
  }, []);

  const pericopes = useMemo(() => {
    let lista = filtroGenero === 'todos' ? todasPericopes : getPericopesPorGenero(filtroGenero as Pericope['genero']);
    if (filtroLivro) lista = lista.filter((p) => p.livro === filtroLivro);
    if (busca.trim()) {
      const q = busca.toLowerCase();
      lista = lista.filter(
        (p) =>
          p.titulo.toLowerCase().includes(q) ||
          p.tema.toLowerCase().includes(q) ||
          p.livro.toLowerCase().includes(q) ||
          (p.temaHomiletico && p.temaHomiletico.toLowerCase().includes(q))
      );
    }
    return lista;
  }, [busca, filtroGenero, filtroLivro]);

  const pericopesPorLivro = useMemo(() => {
    const map = new Map<string, Pericope[]>();
    for (const p of pericopes) {
      const arr = map.get(p.livro) || [];
      arr.push(p);
      map.set(p.livro, arr);
    }
    return map;
  }, [pericopes]);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20 pb-16">
        <ScrollReveal>
          <div className="max-w-6xl mx-auto px-6 mb-8">
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6"
              >
                <BookOpen className="w-8 h-8 text-primary" />
              </motion.div>
              <h1 className="font-display text-4xl md:text-5xl font-light mb-4">
                Perícopes <span className="italic text-primary">Bíblicas</span>
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Navegue pelas divisões pericopais de todos os 66 livros da Bíblia. Organizadas por livro, gênero e tema.
              </p>
              <div className="ornament w-16 mx-auto mt-6" />
            </div>
          </div>
        </ScrollReveal>

        <div className="max-w-6xl mx-auto px-6">
          <ScrollReveal delay={0.1}>
            <div className="sola-card p-4 mb-8">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Buscar perícope, tema ou livro..."
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                  />
                </div>
              </div>
              <div className="flex gap-2 mt-3 flex-wrap">
                {GENEROS.map((g) => (
                  <motion.button
                    key={g.valor}
                    onClick={() => setFiltroGenero(g.valor)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-300 ${
                      filtroGenero === g.valor
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    {g.label}
                  </motion.button>
                ))}
              </div>
              <div className="flex gap-2 mt-3 flex-wrap">
                <motion.button
                  onClick={() => setFiltroLivro(null)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-300 ${
                    !filtroLivro ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  Todos os Livros
                </motion.button>
                {livros.map((l) => (
                  <motion.button
                    key={l}
                    onClick={() => setFiltroLivro(filtroLivro === l ? null : l)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-300 ${
                      filtroLivro === l
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    {l}
                  </motion.button>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { value: pericopes.length, label: 'Perícopes' },
                { value: pericopesPorLivro.size, label: 'Livros' },
                { value: new Set(pericopes.map((p) => p.genero)).size, label: 'Gêneros' },
                { value: todasPericopes.length, label: 'Total Geral' },
              ].map((stat) => (
                <motion.div key={stat.label} className="sola-card p-4 text-center" whileHover={{ y: -2 }}>
                  <p className="font-display text-3xl font-light text-primary">{stat.value}</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>

          <div className="space-y-8">
            {Array.from(pericopesPorLivro.entries()).map(([livro, items], idx) => (
              <ScrollReveal key={livro} delay={idx * 0.05}>
                <div>
                  <h2 className="font-display text-2xl font-semibold mb-4 flex items-center gap-2">
                    <Filter className="w-5 h-5 text-primary" />
                    {livro}
                    <span className="text-sm font-normal text-muted-foreground">({items.length})</span>
                  </h2>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((p) => (
                      <Link
                        key={p.id}
                        href={`/biblia?livro=${p.livro.toLowerCase().replace(/\s/g, '')}&capitulo=${p.capituloInicio}`}
                      >
                        <motion.div className="sola-card p-4 h-full" whileHover={{ y: -3 }}>
                          <div className="flex items-start justify-between mb-2">
                            <span className={`px-2 py-0.5 text-[10px] font-medium rounded-full ${GENERO_COR[p.genero] ?? 'bg-muted text-muted-foreground'}`}>
                              {p.genero}
                            </span>
                            <ChevronRight className="w-4 h-4 text-muted-foreground" />
                          </div>
                          <h3 className="font-display text-base font-semibold mb-1">{p.titulo}</h3>
                          <p className="text-xs text-muted-foreground mb-2">
                            {p.livro} {p.capituloInicio}:{p.versiculoInicio}
                            {p.capituloFim !== p.capituloInicio || p.versiculoFim !== p.versiculoInicio
                              ? ` — ${p.capituloFim}:${p.versiculoFim}`
                              : ''}
                          </p>
                          <p className="text-xs text-primary font-medium">{p.tema}</p>
                          {p.temaHomiletico && (
                            <p className="text-[11px] text-muted-foreground mt-1 italic">{p.temaHomiletico}</p>
                          )}
                        </motion.div>
                      </Link>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {pericopes.length === 0 && (
            <ScrollReveal>
              <div className="text-center py-16">
                <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="font-display text-xl text-muted-foreground">Nenhuma perícope encontrada</p>
              </div>
            </ScrollReveal>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
