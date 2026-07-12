'use client';

import { useState, useMemo } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Search, ChevronRight, MapPin } from 'lucide-react';
import Link from 'next/link';
import { getParalelosPorCategoria } from '@/data/biblia/sinopticos';
import { locaisBiblicos } from '@/data/biblia/locais';

const TIPOS_MILAGRE = [
  { valor: 'todos', label: 'Todos' },
  { valor: 'cura', label: 'Cura' },
  { valor: 'natureza', label: 'Natureza' },
  { valor: 'expulsao', label: 'Expulsão' },
  { valor: 'ressurreicao', label: 'Ressurreição' },
  { valor: 'alimentacao', label: 'Alimentação' },
  { valor: 'outro', label: 'Outro' },
];

const MILAGRE_TIPO_MAP: Record<string, string> = {
  'mil-001': 'outro',
  'mil-002': 'expulsao',
  'mil-003': 'cura',
  'mil-004': 'ressurreicao',
  'mil-005': 'cura',
  'mil-006': 'alimentacao',
  'mil-007': 'natureza',
  'mil-008': 'cura',
  'mil-009': 'alimentacao',
  'mil-010': 'cura',
  'mil-011': 'cura',
  'mil-012': 'natureza',
  'mil-013': 'cura',
  'mil-014': 'cura',
  'mil-015': 'cura',
  'mil-016': 'cura',
  'mil-017': 'natureza',
  'mil-018': 'natureza',
  'mil-019': 'outro',
  'mil-020': 'ressurreicao',
  'mil-021': 'cura',
  'mil-022': 'natureza',
  'mil-023': 'outro',
  'mil-025': 'alimentacao',
  'mil-026': 'cura',
  'mil-027': 'natureza',
  'mil-028': 'natureza',
  'mil-029': 'cura',
  'mil-030': 'alimentacao',
};

const MILAGRE_LOCAL: Record<string, string> = {
  'mil-001': 'caná',
  'mil-002': 'geraseno',
  'mil-003': 'galileia',
  'mil-004': 'cafarnaum',
  'mil-005': 'jerusalem',
  'mil-006': 'galileia',
  'mil-007': 'galileia',
  'mil-008': 'decapole',
  'mil-009': 'galileia',
  'mil-010': 'betsaida',
  'mil-011': 'jerico',
  'mil-012': 'monte tabor',
  'mil-013': 'galileia',
  'mil-014': 'fenicia',
  'mil-015': 'samaria',
  'mil-017': 'galileia',
  'mil-018': 'jerusalem',
  'mil-019': 'jerusalem',
  'mil-020': 'betania',
  'mil-021': 'jerusalem',
  'mil-022': 'galileia',
  'mil-023': 'jerusalem',
  'mil-025': 'galileia',
  'mil-028': 'galileia',
  'mil-030': 'galileia',
};

const TIPO_COR: Record<string, string> = {
  cura: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  natureza: 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300',
  expulsao: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
  ressurreicao: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
  alimentacao: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  outro: 'bg-gray-100 text-gray-700 dark:bg-gray-900/40 dark:text-gray-300',
};

function parseRef(ref: string): { livro: string; capitulo: string } {
  const parts = ref.split(':');
  return { livro: parts[0] || 'mt', capitulo: parts[1] || '1' };
}

export default function MilagresPage() {
  const [busca, setBusca] = useState('');
  const [filtroTipo, setFiltroTipo] = useState('todos');
  const [expandido, setExpandido] = useState<string | null>(null);

  const milagres = useMemo(() => getParalelosPorCategoria('milagre'), []);

  const milagresComInfo = useMemo(() => {
    return milagres.map((m) => {
      const tipo = MILAGRE_TIPO_MAP[m.id] || 'outro';
      const localId = MILAGRE_LOCAL[m.id];
      const local = localId ? locaisBiblicos.find((l) => l.id === localId) : null;
      return { ...m, tipoMilagre: tipo, local };
    });
  }, [milagres]);

  const milagresFiltrados = useMemo(() => {
    let lista = milagresComInfo;
    if (filtroTipo !== 'todos') lista = lista.filter((m) => m.tipoMilagre === filtroTipo);
    if (busca.trim()) {
      const q = busca.toLowerCase();
      lista = lista.filter(
        (m) =>
          m.titulo.toLowerCase().includes(q) ||
          m.tipoMilagre.toLowerCase().includes(q) ||
          (m.local && m.local.nome.toLowerCase().includes(q))
      );
    }
    return lista;
  }, [milagresComInfo, busca, filtroTipo]);

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
                className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center mx-auto mb-6"
              >
                <Sparkles className="w-8 h-8 text-emerald-500" />
              </motion.div>
              <h1 className="font-display text-4xl md:text-5xl font-light mb-4">
                Milagres <span className="italic text-primary">de Jesus</span>
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Catálogo completo dos milagres registrados nos Evangelhos. Cada milagre com localização, tipo e referências.
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
                    placeholder="Buscar milagre ou local..."
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                  />
                </div>
                <div className="flex gap-2 flex-wrap">
                  {TIPOS_MILAGRE.map((t) => (
                    <motion.button
                      key={t.valor}
                      onClick={() => setFiltroTipo(t.valor)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-300 ${
                        filtroTipo === t.valor
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground hover:bg-muted/80'
                      }`}
                    >
                      {t.label}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>

          <div className="space-y-3">
            <AnimatePresence mode="popLayout">
              {milagresFiltrados.map((m, i) => (
                <motion.div
                  key={m.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: i * 0.02 }}
                >
                  <div
                    className="sola-card p-5 cursor-pointer"
                    onClick={() => setExpandido(expandido === m.id ? null : m.id)}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-display text-lg font-semibold mb-2">{m.titulo}</h3>
                        <div className="flex items-center gap-2 flex-wrap mb-2">
                          <span className={`px-2 py-0.5 text-[10px] font-medium rounded-full ${TIPO_COR[m.tipoMilagre] ?? TIPO_COR.outro}`}>
                            {m.tipoMilagre}
                          </span>
                          {m.local && (
                            <span className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {m.local.nome}
                            </span>
                          )}
                        </div>
                        <div className="flex gap-1 flex-wrap">
                          {m.mateus && m.mateus.length > 0 && (
                            <Link
                              href={`/biblia?livro=${parseRef(m.mateus[0]).livro}&capitulo=${parseRef(m.mateus[0]).capitulo}`}
                              onClick={(e) => e.stopPropagation()}
                              className="text-xs font-medium px-2 py-0.5 rounded bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 hover:opacity-80"
                            >
                              Mt {m.mateus[0].replace('mt:', '').replace(/:/g, ' ')}
                            </Link>
                          )}
                          {m.marcos && m.marcos.length > 0 && (
                            <Link
                              href={`/biblia?livro=${parseRef(m.marcos[0]).livro}&capitulo=${parseRef(m.marcos[0]).capitulo}`}
                              onClick={(e) => e.stopPropagation()}
                              className="text-xs font-medium px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300 hover:opacity-80"
                            >
                              Mc {m.marcos[0].replace('mc:', '').replace(/:/g, ' ')}
                            </Link>
                          )}
                          {m.lucas && m.lucas.length > 0 && (
                            <Link
                              href={`/biblia?livro=${parseRef(m.lucas[0]).livro}&capitulo=${parseRef(m.lucas[0]).capitulo}`}
                              onClick={(e) => e.stopPropagation()}
                              className="text-xs font-medium px-2 py-0.5 rounded bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300 hover:opacity-80"
                            >
                              Lc {m.lucas[0].replace('lc:', '').replace(/:/g, ' ')}
                            </Link>
                          )}
                          {m.joao && m.joao.length > 0 && (
                            <Link
                              href={`/biblia?livro=${parseRef(m.joao[0]).livro}&capitulo=${parseRef(m.joao[0]).capitulo}`}
                              onClick={(e) => e.stopPropagation()}
                              className="text-xs font-medium px-2 py-0.5 rounded bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300 hover:opacity-80"
                            >
                              Jo {m.joao[0].replace('jo:', '').replace(/:/g, ' ')}
                            </Link>
                          )}
                        </div>
                      </div>
                      <ChevronRight className={`w-5 h-5 text-muted-foreground transition-transform flex-shrink-0 mt-1 ${expandido === m.id ? 'rotate-90' : ''}`} />
                    </div>

                    <AnimatePresence>
                      {expandido === m.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-3 border-t border-border mt-3 space-y-2">
                            {m.local && (
                              <div className="flex items-start gap-2">
                                <MapPin className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" />
                                <div>
                                  <p className="text-xs font-bold text-primary">{m.local.nome}</p>
                                  <p className="text-[11px] text-muted-foreground">{m.local.descricao}</p>
                                </div>
                              </div>
                            )}
                            {m.notas && (
                              <p className="text-sm text-muted-foreground italic">{m.notas}</p>
                            )}
                            {m.local && (
                              <div className="flex items-center gap-2 mt-2">
                                <MapPin className="w-3.5 h-3.5 text-blue-500" />
                                <a
                                  href={`https://www.openstreetmap.org/?mlat=${m.local.lat}&mlon=${m.local.lng}#map=15/${m.local.lat}/${m.local.lng}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs text-blue-500 hover:underline"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  Ver no mapa ({m.local.lat.toFixed(2)}, {m.local.lng.toFixed(2)})
                                </a>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {milagresFiltrados.length === 0 && (
            <ScrollReveal>
              <div className="text-center py-16">
                <Sparkles className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="font-display text-xl text-muted-foreground">Nenhum milagre encontrado</p>
              </div>
            </ScrollReveal>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
