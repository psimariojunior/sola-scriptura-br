'use client';

import { useState, useMemo } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Search, Columns3, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import {
  getParalelosLivro,
  getParalelosPorCategoria,
  buscarParalelos,
} from '@/data/biblia/sinopticos';
import type { ParaleloSinotico } from '@/data/biblia/sinopticos';

type Categoria = ParaleloSinotico['categoria'] | 'todas';

const CATEGORIAS: { valor: Categoria; label: string }[] = [
  { valor: 'todas', label: 'Todas' },
  { valor: 'narrativa', label: 'Narrativa' },
  { valor: 'parabola', label: 'Parábola' },
  { valor: 'milagre', label: 'Milagre' },
  { valor: 'discurso', label: 'Discurso' },
  { valor: 'ensino', label: 'Ensino' },
  { valor: 'paixao', label: 'Paixão' },
  { valor: 'pos-ressurreicao', label: 'Pós-Ressurreição' },
];

const CATEGORIA_COR: Record<string, string> = {
  narrativa: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  parabola: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  milagre: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  discurso: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
  ensino: 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300',
  paixao: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
  'pos-ressurreicao': 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
};

const LIVROS = [
  { chave: 'mt' as const, nome: 'Mateus', cor: 'text-blue-500' },
  { chave: 'mc' as const, nome: 'Marcos', cor: 'text-emerald-500' },
  { chave: 'lc' as const, nome: 'Lucas', cor: 'text-amber-500' },
  { chave: 'jo' as const, nome: 'João', cor: 'text-purple-500' },
];

function parseRef(ref: string): { livro: string; capitulo: string; versiculo?: string } {
  const parts = ref.split(':');
  if (parts.length >= 3) return { livro: parts[0], capitulo: parts[1], versiculo: parts[2] };
  if (parts.length === 2) return { livro: parts[0], capitulo: parts[1] };
  return { livro: ref, capitulo: '1' };
}

function RefLinks({ refs, label }: { refs: string[] | undefined; label: string }) {
  if (!refs || refs.length === 0) return <span className="text-xs text-muted-foreground">—</span>;
  return (
    <div className="flex flex-wrap gap-1">
      {refs.map((r) => {
        const { livro, capitulo } = parseRef(r);
        return (
          <Link
            key={r}
            href={`/biblia?livro=${livro}&capitulo=${capitulo}`}
            className="text-xs font-medium px-2 py-0.5 rounded bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
          >
            {r.replace(/:/g, ' ')}
          </Link>
        );
      })}
    </div>
  );
}

export default function HarmoniaPage() {
  const [busca, setBusca] = useState('');
  const [filtroCategoria, setFiltroCategoria] = useState<Categoria>('todas');
  const [filtroLivro, setFiltroLivro] = useState<string | null>(null);
  const [expandido, setExpandido] = useState<string | null>(null);

  const paralelos = useMemo(() => {
    let lista = filtroCategoria === 'todas'
      ? getParalelosLivro('mt').length > 0
        ? [...getParalelosLivro('mt'), ...getParalelosLivro('mc'), ...getParalelosLivro('lc'), ...getParalelosLivro('jo')]
        : []
      : getParalelosPorCategoria(filtroCategoria);

    if (filtroCategoria === 'todas') {
      const seen = new Set<string>();
      lista = lista.filter((p) => {
        if (seen.has(p.id)) return false;
        seen.add(p.id);
        return true;
      });
    }

    if (busca.trim()) lista = buscarParalelos(busca);

    if (filtroLivro) {
      const chaveMap: Record<string, keyof Pick<ParaleloSinotico, 'mateus' | 'marcos' | 'lucas' | 'joao'>> = {
        mt: 'mateus', mc: 'marcos', lc: 'lucas', jo: 'joao',
      };
      const chave = chaveMap[filtroLivro];
      if (chave) lista = lista.filter((p) => p[chave] && (p[chave] as string[]).length > 0);
    }

    return lista;
  }, [busca, filtroCategoria, filtroLivro]);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20 pb-16">
        <ScrollReveal>
          <div className="max-w-7xl mx-auto px-6 mb-8">
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6"
              >
                <Columns3 className="w-8 h-8 text-primary" />
              </motion.div>
              <h1 className="font-display text-4xl md:text-5xl font-light mb-4">
                Harmonia <span className="italic text-primary">Sinótica</span>
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Compare paralelos entre os quatro Evangelhos. Identifique fontes, categorias e harmonize os relatos do ministério de Jesus.
              </p>
              <div className="ornament w-16 mx-auto mt-6" />
            </div>
          </div>
        </ScrollReveal>

        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal delay={0.1}>
            <div className="sola-card p-4 mb-8">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Buscar paralelos..."
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                  />
                </div>
                <div className="flex gap-2 flex-wrap">
                  {CATEGORIAS.map((cat) => (
                    <motion.button
                      key={cat.valor}
                      onClick={() => { setFiltroCategoria(cat.valor); setFiltroLivro(null); }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-300 ${
                        filtroCategoria === cat.valor
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground hover:bg-muted/80'
                      }`}
                    >
                      {cat.label}
                    </motion.button>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 mt-3 flex-wrap">
                {LIVROS.map((l) => (
                  <motion.button
                    key={l.chave}
                    onClick={() => setFiltroLivro(filtroLivro === l.chave ? null : l.chave)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-300 ${
                      filtroLivro === l.chave
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    {l.nome}
                  </motion.button>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { value: paralelos.length, label: 'Paralelos' },
                { value: new Set(paralelos.map((p) => p.categoria)).size, label: 'Categorias' },
                { value: paralelos.filter((p) => p.mateus && p.marcos && p.lucas).length, label: 'Tríplice' },
                { value: paralelos.filter((p) => p.joao && p.joao.length > 0).length, label: 'João' },
              ].map((stat) => (
                <motion.div key={stat.label} className="sola-card p-4 text-center" whileHover={{ y: -2 }}>
                  <p className="font-display text-3xl font-light text-primary">{stat.value}</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>

          <div className="space-y-3">
            <AnimatePresence mode="popLayout">
              {paralelos.map((p, i) => (
                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: i * 0.02 }}
                >
                  <div
                    className="sola-card p-4 cursor-pointer"
                    onClick={() => setExpandido(expandido === p.id ? null : p.id)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <span className={`px-2 py-0.5 text-[10px] font-medium rounded-full ${CATEGORIA_COR[p.categoria] ?? 'bg-muted text-muted-foreground'}`}>
                            {p.categoria}
                          </span>
                          {p.fonte && (
                            <span className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-muted text-muted-foreground">
                              Fonte: {p.fonte}
                            </span>
                          )}
                        </div>
                        <h3 className="font-display text-lg font-semibold mb-2">{p.titulo}</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                          {LIVROS.map((l) => (
                            <div key={l.chave} className="flex items-start gap-1.5">
                              <span className={`text-[10px] font-bold uppercase ${l.cor}`}>{l.chave}</span>
                              <RefLinks refs={p[l.chave === 'mt' ? 'mateus' : l.chave === 'mc' ? 'marcos' : l.chave === 'lc' ? 'lucas' : 'joao']} label={l.nome} />
                            </div>
                          ))}
                        </div>
                      </div>
                      <ChevronRight className={`w-5 h-5 text-muted-foreground transition-transform flex-shrink-0 mt-1 ${expandido === p.id ? 'rotate-90' : ''}`} />
                    </div>

                    <AnimatePresence>
                      {expandido === p.id && p.notas && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <p className="text-sm text-muted-foreground mt-3 pt-3 border-t border-border">
                            {p.notas}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {paralelos.length === 0 && (
            <ScrollReveal>
              <div className="text-center py-16">
                <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="font-display text-xl text-muted-foreground">Nenhum paralelo encontrado</p>
              </div>
            </ScrollReveal>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
