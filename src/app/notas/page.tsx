'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Trash2, Search, BookOpen, X } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

interface Nota {
  versiculo: string;
  livro: string;
  capitulo: number;
  verso: number;
  textoNota: string;
  data: string;
}

export default function NotasPage() {
  const [notas, setNotas] = useState<Nota[]>([]);
  const [busca, setBusca] = useState('');
  const [carregado, setCarregado] = useState(false);

  useEffect(() => {
    try {
      const dados = localStorage.getItem('ssb_notas');
      if (dados) setNotas(JSON.parse(dados));
    } catch {}
    setCarregado(true);
  }, []);

  const notasFiltradas = notas.filter((n) => {
    if (!busca) return true;
    const termo = busca.toLowerCase();
    return (
      n.textoNota.toLowerCase().includes(termo) ||
      n.versiculo.toLowerCase().includes(termo) ||
      n.livro.toLowerCase().includes(termo)
    );
  });

  const agrupados = notasFiltradas.reduce<Record<string, Nota[]>>((acc, n) => {
    if (!acc[n.livro]) acc[n.livro] = [];
    acc[n.livro].push(n);
    return acc;
  }, {});

  const removerNota = (nota: Nota) => {
    const novos = notas.filter(
      (n) => !(n.versiculo === nota.versiculo && n.data === nota.data)
    );
    setNotas(novos);
    localStorage.setItem('ssb_notas', JSON.stringify(novos));
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h1 className="font-display text-3xl font-light">Notas</h1>
                <p className="text-sm text-muted-foreground">Anotações pessoais sobre versículos</p>
              </div>
            </div>
          </ScrollReveal>

          {carregado && notas.length === 0 ? (
            <ScrollReveal>
              <div className="rounded-2xl border border-border/50 bg-card/50 p-12 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-primary/50" />
                </div>
                <h2 className="font-display text-xl font-light mb-2">Nenhuma nota</h2>
                <p className="text-sm text-muted-foreground">
                  Adicione notas aos versículos na Bíblia para estudar melhor.
                </p>
              </div>
            </ScrollReveal>
          ) : (
            <>
              <ScrollReveal>
                <div className="mb-8">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      value={busca}
                      onChange={(e) => setBusca(e.target.value)}
                      placeholder="Buscar notas..."
                      className="w-full pl-11 pr-10 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                    {busca && (
                      <button
                        onClick={() => setBusca('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-muted/50"
                      >
                        <X className="w-4 h-4 text-muted-foreground" />
                      </button>
                    )}
                  </div>
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
                        {itens.map((nota, idx) => (
                          <motion.div
                            key={`${nota.versiculo}-${nota.data}`}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ delay: idx * 0.05 }}
                            className="relative rounded-xl border border-border/50 bg-card/50 p-5 group hover:border-primary/30 transition-all"
                          >
                            <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl bg-primary/40" />
                            <div className="pl-3">
                              <p className="text-foreground/90 mb-3 leading-relaxed text-sm whitespace-pre-wrap">
                                {nota.textoNota}
                              </p>
                              <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-primary/80">
                                  {nota.versiculo}
                                </p>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-muted-foreground">
                                    {new Date(nota.data).toLocaleDateString('pt-BR')}
                                  </span>
                                  <button
                                    onClick={() => removerNota(nota)}
                                    className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-red-500/10 text-red-500 transition-all"
                                    title="Excluir"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </AnimatePresence>

              {busca && notasFiltradas.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-sm text-muted-foreground">
                    Nenhuma nota encontrada para &ldquo;{busca}&rdquo;
                  </p>
                </div>
              )}

              <p className="text-center text-xs text-muted-foreground mt-8">
                {notasFiltradas.length} de {notas.length} notas
              </p>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
