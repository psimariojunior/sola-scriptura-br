'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Trash2, Search, X, ArrowUpDown, BookOpen, Download } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import { cn } from '@/lib/utils';
import { TODOS_LIVROS } from '@/data/biblia/livros';

interface Favorito {
  id: string;
  versiculo: string;
  livro: string;
  capitulo: number;
  verso: number;
  texto: string;
  cor: string;
  data: string;
}

type SortBy = 'data' | 'livro' | 'cor';
const CORES = [
  { id: 'all', label: 'Todas', cor: '' },
  { id: '#fbbf24', label: 'Amarelo', cor: '#fbbf24' },
  { id: '#34d399', label: 'Verde', cor: '#34d399' },
  { id: '#60a5fa', label: 'Azul', cor: '#60a5fa' },
  { id: '#f472b6', label: 'Rosa', cor: '#f472b6' },
  { id: '#a78bfa', label: 'Roxo', cor: '#a78bfa' },
];

export default function FavoritosPage() {
  const [favoritos, setFavoritos] = useState<Favorito[]>([]);
  const [busca, setBusca] = useState('');
  const [filtroCor, setFiltroCor] = useState('all');
  const [filtroLivro, setFiltroLivro] = useState('all');
  const [sortBy, setSortBy] = useState<SortBy>('data');
  const [carregado, setCarregado] = useState(false);

  useEffect(() => {
    try {
      const dados = localStorage.getItem('ssb_favoritos');
      if (dados) setFavoritos(JSON.parse(dados));
    } catch {}
    setCarregado(true);
  }, []);

  const remover = useCallback((id: string) => {
    setFavoritos(prev => {
      const updated = prev.filter(f => f.id !== id);
      localStorage.setItem('ssb_favoritos', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const exportar = useCallback(() => {
    const data = JSON.stringify(favoritos, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `favoritos-sola-scriptura-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [favoritos]);

  const livrosComFavoritos = useMemo(() => {
    const livros = new Set(favoritos.map(f => f.livro));
    return TODOS_LIVROS.filter(l => livros.has(l.nome));
  }, [favoritos]);

  const filtrados = useMemo(() => {
    let result = favoritos;
    if (busca) {
      const termo = busca.toLowerCase();
      result = result.filter(f => f.texto.toLowerCase().includes(termo) || f.versiculo.toLowerCase().includes(termo));
    }
    if (filtroCor !== 'all') result = result.filter(f => f.cor === filtroCor);
    if (filtroLivro !== 'all') result = result.filter(f => f.livro === filtroLivro);

    result = [...result].sort((a, b) => {
      if (sortBy === 'data') return new Date(b.data).getTime() - new Date(a.data).getTime();
      if (sortBy === 'livro') return a.livro.localeCompare(b.livro);
      return a.cor.localeCompare(b.cor);
    });
    return result;
  }, [favoritos, busca, filtroCor, filtroLivro, sortBy]);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <h1 className="font-display text-3xl font-light">Favoritos</h1>
                  <p className="text-sm text-muted-foreground">{favoritos.length} versículos salvos</p>
                </div>
              </div>
              {favoritos.length > 0 && (
                <motion.button onClick={exportar} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border text-sm text-muted-foreground hover:bg-muted/50 transition-all">
                  <Download className="w-4 h-4" /> Exportar
                </motion.button>
              )}
            </div>
          </ScrollReveal>

          {carregado && favoritos.length === 0 ? (
            <ScrollReveal>
              <div className="rounded-2xl border border-border/50 bg-card/50 p-12 text-center">
                <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-red-500/50" />
                </div>
                <h2 className="font-display text-xl font-light mb-2">Nenhum favorito</h2>
                <p className="text-sm text-muted-foreground">Favorite versículos na Bíblia para encontrá-los facilmente.</p>
              </div>
            </ScrollReveal>
          ) : (
            <>
              <ScrollReveal>
                <div className="space-y-3 mb-6">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input type="text" value={busca} onChange={e => setBusca(e.target.value)}
                      placeholder="Buscar nos favoritos..."
                      className="w-full pl-11 pr-10 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20" />
                    {busca && <button onClick={() => setBusca('')} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-muted/50">
                      <X className="w-4 h-4 text-muted-foreground" /></button>}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {CORES.map(c => (
                      <button key={c.id} onClick={() => setFiltroCor(c.id)}
                        className={cn('px-3 py-1.5 rounded-full text-xs font-medium transition-all border',
                          filtroCor === c.id ? 'border-primary bg-primary/10 text-primary' : 'border-border text-muted-foreground hover:bg-muted/50')}>
                        {c.cor && <span className="inline-block w-2 h-2 rounded-full mr-1.5" style={{ backgroundColor: c.cor }} />}
                        {c.label}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    <select value={filtroLivro} onChange={e => setFiltroLivro(e.target.value)}
                      className="px-3 py-1.5 rounded-lg text-xs border border-border bg-background">
                      <option value="all">Todos os livros</option>
                      {livrosComFavoritos.map(l => <option key={l.abreviacao} value={l.nome}>{l.nome}</option>)}
                    </select>
                    <button onClick={() => setSortBy(prev => prev === 'data' ? 'livro' : prev === 'livro' ? 'cor' : 'data')}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs border border-border text-muted-foreground hover:bg-muted/50">
                      <ArrowUpDown className="w-3 h-3" /> {sortBy === 'data' ? 'Data' : sortBy === 'livro' ? 'Livro' : 'Cor'}
                    </button>
                  </div>
                </div>
              </ScrollReveal>

              <div className="space-y-3">
                <AnimatePresence>
                  {filtrados.map((fav, idx) => (
                    <motion.div key={fav.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }} transition={{ delay: idx * 0.03 }}
                      className="relative rounded-xl border border-border/50 bg-card/50 p-4 group hover:border-primary/30 transition-all">
                      <div className="absolute left-0 top-0 bottom-0 w-1.5 rounded-l-xl" style={{ backgroundColor: fav.cor }} />
                      <div className="pl-3">
                        <p className="text-sm text-foreground/90 leading-relaxed mb-2">{fav.texto}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-primary/80">{fav.versiculo}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] text-muted-foreground">{new Date(fav.data).toLocaleDateString('pt-BR')}</span>
                            <button onClick={() => remover(fav.id)}
                              className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-red-500/10 text-red-500 transition-all">
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {busca && filtrados.length === 0 && (
                <div className="text-center py-8"><p className="text-sm text-muted-foreground">Nenhum favorito encontrado</p></div>
              )}
              <p className="text-center text-xs text-muted-foreground mt-8">{filtrados.length} de {favoritos.length} favoritos</p>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
