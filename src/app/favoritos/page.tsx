'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Trash2, Filter, BookOpen, Star, X } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

interface Favorito {
  versiculo: string;
  livro: string;
  capitulo: number;
  verso: number;
  texto: string;
  cor: string;
  data: string;
}

const coresDisponiveis = [
  { valor: 'amarelo', cor: '#FDE68A', label: 'Amarelo' },
  { valor: 'verde', cor: '#BBF7D0', label: 'Verde' },
  { valor: 'azul', cor: '#BFDBFE', label: 'Azul' },
  { valor: 'rosa', cor: '#FBCFE8', label: 'Rosa' },
  { valor: 'roxo', cor: '#DDD6FE', label: 'Roxo' },
];

function obterCorHex(valor: string): string {
  return coresDisponiveis.find((c) => c.valor === valor)?.cor ?? '#FDE68A';
}

export default function FavoritosPage() {
  const [favoritos, setFavoritos] = useState<Favorito[]>([]);
  const [filtroCor, setFiltroCor] = useState<string>('');
  const [filtroLivro, setFiltroLivro] = useState<string>('');
  const [carregado, setCarregado] = useState(false);

  useEffect(() => {
    try {
      const dados = localStorage.getItem('ssb_favoritos');
      if (dados) setFavoritos(JSON.parse(dados));
    } catch {}
    setCarregado(true);
  }, []);

  const livros = [...new Set(favoritos.map((f) => f.livro))].sort();

  const favoritosFiltrados = favoritos.filter((f) => {
    if (filtroCor && f.cor !== filtroCor) return false;
    if (filtroLivro && f.livro !== filtroLivro) return false;
    return true;
  });

  const agrupados = favoritosFiltrados.reduce<Record<string, Favorito[]>>((acc, f) => {
    if (!acc[f.livro]) acc[f.livro] = [];
    acc[f.livro].push(f);
    return acc;
  }, {});

  const removerFavorito = (index: number) => {
    const alvo = favoritosFiltrados[index];
    const novos = favoritos.filter(
      (f) => !(f.versiculo === alvo.versiculo && f.data === alvo.data)
    );
    setFavoritos(novos);
    localStorage.setItem('ssb_favoritos', JSON.stringify(novos));
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Heart className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h1 className="font-display text-3xl font-light">Favoritos</h1>
                <p className="text-sm text-muted-foreground">Versículos marcados e destacados</p>
              </div>
            </div>
          </ScrollReveal>

          {carregado && favoritos.length === 0 ? (
            <ScrollReveal>
              <div className="rounded-2xl border border-border/50 bg-card/50 p-12 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-primary/50" />
                </div>
                <h2 className="font-display text-xl font-light mb-2">Nenhum favorito</h2>
                <p className="text-sm text-muted-foreground">
                  Destaque versículos na Bíblia para encontrá-los facilmente aqui.
                </p>
              </div>
            </ScrollReveal>
          ) : (
            <>
              <ScrollReveal>
                <div className="flex flex-wrap gap-3 mb-8">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Filter className="w-4 h-4 text-muted-foreground" />
                    <button
                      onClick={() => setFiltroCor('')}
                      className={`px-3 py-1.5 text-xs rounded-full border transition-all ${
                        !filtroCor ? 'border-primary bg-primary/10 text-primary' : 'border-border/50 hover:bg-muted/50'
                      }`}
                    >
                      Todas
                    </button>
                    {coresDisponiveis.map((c) => (
                      <button
                        key={c.valor}
                        onClick={() => setFiltroCor(filtroCor === c.valor ? '' : c.valor)}
                        className="w-6 h-6 rounded-full border-2 transition-all hover:scale-110"
                        style={{
                          backgroundColor: c.cor,
                          borderColor: filtroCor === c.valor ? '#D4A843' : 'transparent',
                        }}
                        title={c.label}
                      />
                    ))}
                  </div>

                  <div className="w-px h-6 bg-border/50 mx-1 hidden sm:block" />

                  <select
                    value={filtroLivro}
                    onChange={(e) => setFiltroLivro(e.target.value)}
                    className="px-3 py-1.5 text-xs rounded-full border border-border/50 bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="">Todos os livros</option>
                    {livros.map((l) => (
                      <option key={l} value={l}>{l}</option>
                    ))}
                  </select>

                  {(filtroCor || filtroLivro) && (
                    <button
                      onClick={() => { setFiltroCor(''); setFiltroLivro(''); }}
                      className="flex items-center gap-1 px-3 py-1.5 text-xs rounded-full border border-red-500/30 text-red-500 hover:bg-red-500/10 transition-all"
                    >
                      <X className="w-3 h-3" /> Limpar filtros
                    </button>
                  )}
                </div>
              </ScrollReveal>

              <AnimatePresence mode="wait">
                {Object.entries(agrupados).map(([livro, itens]) => (
                  <ScrollReveal key={livro}>
                    <div className="mb-8">
                      <div className="flex items-center gap-2 mb-4">
                        <BookOpen className="w-4 h-4 text-primary" />
                        <h2 className="font-display text-lg font-medium text-primary">{livro}</h2>
                        <span className="text-xs text-muted-foreground">({itens.length})</span>
                      </div>

                      <div className="space-y-3">
                        {itens.map((fav, idx) => {
                          const globalIdx = favoritosFiltrados.indexOf(fav);
                          return (
                            <motion.div
                              key={`${fav.versiculo}-${fav.data}`}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ delay: idx * 0.05 }}
                              className="relative rounded-xl border border-border/50 bg-card/50 p-5 group hover:border-primary/30 transition-all"
                            >
                              <div
                                className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl"
                                style={{ backgroundColor: obterCorHex(fav.cor) }}
                              />
                              <div className="pl-3">
                                <p className="font-display italic text-foreground/90 mb-2 leading-relaxed">
                                  {fav.texto}
                                </p>
                                <div className="flex items-center justify-between">
                                  <p className="text-sm font-medium text-primary/80">
                                    {fav.versiculo}
                                  </p>
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs text-muted-foreground">
                                      {new Date(fav.data).toLocaleDateString('pt-BR')}
                                    </span>
                                    <button
                                      onClick={() => removerFavorito(globalIdx)}
                                      className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-red-500/10 text-red-500 transition-all"
                                      title="Remover"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </AnimatePresence>

              <p className="text-center text-xs text-muted-foreground mt-8">
                {favoritosFiltrados.length} de {favoritos.length} favoritos
              </p>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
