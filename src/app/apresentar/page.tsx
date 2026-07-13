'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Search, BookOpen, Play, Sparkles, Star, Clock, ChevronRight, Sun, Moon, ArrowRight, Tv } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { TODOS_LIVROS, livroPorAbreviacao } from '@/data/biblia/livros';
import { LivroInfo } from '@/data/biblia/livros';

const RECENT_KEY = 'ssb_apr_recentes';

interface RecentItem {
  livro: string;
  capitulo: number;
  versiculo: number;
  translation: string;
  data: number;
}

const VERSE_DESTAQUE: Array<{ livro: string; cap: number; ver: number; label: string }> = [
  { livro: 'jo', cap: 1, ver: 1, label: 'O Verbo era Deus' },
  { livro: 'sl', cap: 23, ver: 1, label: 'O Senhor é o meu pastor' },
  { livro: 'rm', cap: 8, ver: 28, label: 'Todas as coisas contribuem' },
  { livro: 'fp', cap: 4, ver: 13, label: 'Tudo posso naquele que me fortalece' },
  { livro: 'is', cap: 41, ver: 10, label: 'Não temas, eu sou contigo' },
  { livro: 'mt', cap: 11, ver: 28, label: 'Vinde a mim, todos os cansados' },
];

export default function ApresentarPage() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState<'AT' | 'NT'>('AT');
  const [recentes, setRecentes] = useState<RecentItem[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(RECENT_KEY);
      if (raw) setRecentes(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, []);

  const livrosFiltrados = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return TODOS_LIVROS.filter((l) => l.testamento === tab);
    return TODOS_LIVROS.filter(
      (l) =>
        l.nome.toLowerCase().includes(q) ||
        l.abreviacao.toLowerCase().includes(q)
    );
  }, [search, tab]);

  const irParaLivro = (l: LivroInfo) => {
    router.push(`/biblia?livro=${l.abreviacao}&capitulo=1`);
  };

  const abrirDestaque = (livro: string, cap: number, ver: number) => {
    const params = new URLSearchParams({
      livro,
      cap: String(cap),
      ver: String(ver),
    });
    router.push(`/biblia?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Header />
      <main className="pt-16">
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-rose-500/10" />
          <div className="absolute top-10 right-10 w-72 h-72 rounded-full bg-amber-500/10 blur-3xl" />
          <div className="absolute bottom-10 left-10 w-72 h-72 rounded-full bg-rose-500/10 blur-3xl" />

          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-10"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold tracking-wider mb-4">
                <Tv className="w-3.5 h-3.5" />
                <span>MODO APRESENTAÇÃO</span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-light text-[var(--primary)] mb-4">
                Apresente a Palavra
              </h1>
              <p className="text-base sm:text-lg text-[var(--muted-fg)] max-w-2xl mx-auto leading-relaxed">
                Mostre versículos na TV ou projetor via QR code. Controle tudo do seu celular.
                Sincronização instantânea, sem instalação.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="max-w-xl mx-auto mb-12"
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-fg)]" />
                <input
                  type="text"
                  placeholder="Buscar livro..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30 focus:border-[var(--primary)]/30 transition-all"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mb-12"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-[var(--muted-fg)] tracking-wider uppercase flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  Versículos em destaque
                </h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {VERSE_DESTAQUE.map((v) => {
                  const l = livroPorAbreviacao.get(v.livro);
                  return (
                    <button
                      key={`${v.livro}-${v.cap}-${v.ver}`}
                      onClick={() => abrirDestaque(v.livro, v.cap, v.ver)}
                      className="group relative text-left p-4 rounded-2xl bg-[var(--card-bg)] border border-[var(--border)] hover:border-amber-500/40 transition-all hover:shadow-lg hover:shadow-amber-500/5"
                    >
                      <div className="text-[10px] text-amber-500 tracking-widest uppercase font-semibold mb-1.5">
                        {l?.nome} {v.cap}:{v.ver}
                      </div>
                      <div className="text-sm text-[var(--fg)] leading-snug line-clamp-2 group-hover:text-amber-600 transition-colors">
                        {v.label}
                      </div>
                      <ArrowRight className="absolute top-4 right-4 w-3.5 h-3.5 text-[var(--muted-fg)] group-hover:text-amber-500 group-hover:translate-x-1 transition-all" />
                    </button>
                  );
                })}
              </div>
            </motion.div>

            {recentes.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-10"
              >
                <h2 className="text-sm font-semibold text-[var(--muted-fg)] tracking-wider uppercase flex items-center gap-2 mb-4">
                  <Clock className="w-3.5 h-3.5" />
                  Apresentações recentes
                </h2>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {recentes.slice(0, 6).map((r, i) => {
                    const l = livroPorAbreviacao.get(r.livro);
                    return (
                      <button
                        key={i}
                        onClick={() => abrirDestaque(r.livro, r.capitulo, r.versiculo)}
                        className="shrink-0 px-4 py-2 rounded-lg bg-[var(--card-bg)] border border-[var(--border)] hover:border-amber-500/40 text-xs"
                      >
                        {l?.nome} {r.capitulo}:{r.versiculo}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-[var(--muted-fg)] tracking-wider uppercase flex items-center gap-2">
                  <BookOpen className="w-3.5 h-3.5" />
                  Escolha um livro
                </h2>
                <div className="flex bg-[var(--card-bg)] border border-[var(--border)] rounded-lg p-1">
                  {(['AT', 'NT'] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setTab(t)}
                      className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                        tab === t
                          ? 'bg-amber-500 text-black'
                          : 'text-[var(--muted-fg)] hover:text-[var(--fg)]'
                      }`}
                    >
                      {t === 'AT' ? 'Antigo' : 'Novo'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                {livrosFiltrados.map((l) => (
                  <button
                    key={l.abreviacao}
                    onClick={() => irParaLivro(l)}
                    className="group p-4 rounded-xl bg-[var(--card-bg)] border border-[var(--border)] hover:border-amber-500/40 hover:shadow-md transition-all text-left"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-[10px] text-amber-500/80 font-mono font-bold">
                        {l.abreviacao.toUpperCase()}
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-[var(--muted-fg)] group-hover:text-amber-500 group-hover:translate-x-1 transition-all" />
                    </div>
                    <div className="text-sm font-medium text-[var(--fg)] group-hover:text-amber-600 transition-colors line-clamp-1">
                      {l.nome}
                    </div>
                    <div className="text-[10px] text-[var(--muted-fg)] mt-0.5">
                      {l.totalCapitulos} capítulos
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
