'use client';

import { useState, useMemo } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Search, ChevronRight, AlertTriangle, CheckCircle, XCircle, MinusCircle } from 'lucide-react';
import Link from 'next/link';
import { VARIANTES_TEXTUAIS, getVariantePorLivro } from '@/data/biblia/criticaTextual';
import type { VarianteTextual } from '@/data/biblia/criticaTextual';

const TIPOS = [
  { valor: 'todos', label: 'Todos' },
  { valor: 'adicao', label: 'Adição' },
  { valor: 'omissao', label: 'Omissão' },
  { valor: 'mudanca', label: 'Mudança' },
  { valor: 'transposicao', label: 'Transposição' },
];

const EVIDENCIA = [
  { valor: 'todos', label: 'Todas' },
  { valor: 'forte', label: 'Forte' },
  { valor: 'moderada', label: 'Moderada' },
  { valor: 'fraca', label: 'Fraca' },
];

const TIPO_COR: Record<string, string> = {
  adicao: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  omissao: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
  mudanca: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  transposicao: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
};

const TIPO_ICONE: Record<string, React.ReactNode> = {
  adicao: <CheckCircle className="w-3.5 h-3.5" />,
  omissao: <XCircle className="w-3.5 h-3.5" />,
  mudanca: <AlertTriangle className="w-3.5 h-3.5" />,
  transposicao: <MinusCircle className="w-3.5 h-3.5" />,
};

const EVIDENCIA_COR: Record<string, string> = {
  forte: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  moderada: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  fraca: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
};

const LIVROS_UNICOS = [...new Set(VARIANTES_TEXTUAIS.map((v) => v.referencia.split(':')[0]))].sort();

function parseRef(ref: string): { livro: string; capitulo: string } {
  const parts = ref.split(':');
  return { livro: parts[0] || 'mt', capitulo: parts[1] || '1' };
}

export default function CriticaTextualPage() {
  const [busca, setBusca] = useState('');
  const [filtroTipo, setFiltroTipo] = useState('todos');
  const [filtroEvidencia, setFiltroEvidencia] = useState('todos');
  const [filtroLivro, setFiltroLivro] = useState<string | null>(null);
  const [expandido, setExpandido] = useState<string | null>(null);

  const variantes = useMemo(() => {
    let lista = filtroLivro ? getVariantePorLivro(filtroLivro) : VARIANTES_TEXTUAIS;
    if (filtroTipo !== 'todos') lista = lista.filter((v) => v.tipo === filtroTipo);
    if (filtroEvidencia !== 'todos') lista = lista.filter((v) => v.evidenciaExterna === filtroEvidencia);
    if (busca.trim()) {
      const q = busca.toLowerCase();
      lista = lista.filter(
        (v) =>
          v.referencia.toLowerCase().includes(q) ||
          v.descricao.toLowerCase().includes(q) ||
          v.pericope.toLowerCase().includes(q) ||
          v.manuscritos.some((m) => m.toLowerCase().includes(q))
      );
    }
    return lista;
  }, [busca, filtroTipo, filtroEvidencia, filtroLivro]);

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
                <FileText className="w-8 h-8 text-primary" />
              </motion.div>
              <h1 className="font-display text-4xl md:text-5xl font-light mb-4">
                Crítica <span className="italic text-primary">Textual</span>
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Variantes textuais do Novo Testamento. Análise de manuscritos, evidências externas e recomendações da edição NA28.
              </p>
              <div className="ornament w-16 mx-auto mt-6" />
            </div>
          </div>
        </ScrollReveal>

        <div className="max-w-6xl mx-auto px-6">
          <ScrollReveal delay={0.1}>
            <div className="sola-card p-4 mb-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Buscar por referência, manuscrito ou descrição..."
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-3 mt-3">
                <div className="flex gap-2 flex-wrap">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider self-center mr-1">Tipo:</span>
                  {TIPOS.map((t) => (
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
                <div className="flex gap-2 flex-wrap">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider self-center mr-1">Evidência:</span>
                  {EVIDENCIA.map((e) => (
                    <motion.button
                      key={e.valor}
                      onClick={() => setFiltroEvidencia(e.valor)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-300 ${
                        filtroEvidencia === e.valor
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground hover:bg-muted/80'
                      }`}
                    >
                      {e.label}
                    </motion.button>
                  ))}
                </div>
                <div className="flex gap-2 flex-wrap">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider self-center mr-1">Livro:</span>
                  <motion.button
                    onClick={() => setFiltroLivro(null)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-300 ${
                      !filtroLivro ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    Todos
                  </motion.button>
                  {LIVROS_UNICOS.map((l) => (
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
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { value: variantes.length, label: 'Variantes' },
                { value: variantes.filter((v) => v.tipo === 'adicao').length, label: 'Adições' },
                { value: variantes.filter((v) => v.tipo === 'omissao').length, label: 'Omissões' },
                { value: variantes.filter((v) => v.evidenciaExterna === 'forte').length, label: 'Evidência Forte' },
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
              {variantes.map((v, i) => (
                <motion.div
                  key={v.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: i * 0.02 }}
                >
                  <div
                    className="sola-card p-5 cursor-pointer"
                    onClick={() => setExpandido(expandido === v.id ? null : v.id)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <span className={`px-2 py-0.5 text-[10px] font-medium rounded-full flex items-center gap-1 ${TIPO_COR[v.tipo]}`}>
                            {TIPO_ICONE[v.tipo]}
                            {v.tipo}
                          </span>
                          <span className={`px-2 py-0.5 text-[10px] font-medium rounded-full ${EVIDENCIA_COR[v.evidenciaExterna]}`}>
                            Evidência: {v.evidenciaExterna}
                          </span>
                          {v.recomendacaoNA28 && (
                            <span className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                              NA28
                            </span>
                          )}
                        </div>
                        <h3 className="font-display text-lg font-semibold mb-1">{v.referencia}</h3>
                        <p className="text-xs text-primary font-medium mb-1">{v.pericope}</p>
                        <p className="text-sm text-muted-foreground line-clamp-2">{v.descricao}</p>
                      </div>
                      <ChevronRight className={`w-5 h-5 text-muted-foreground transition-transform flex-shrink-0 mt-1 ${expandido === v.id ? 'rotate-90' : ''}`} />
                    </div>

                    <AnimatePresence>
                      {expandido === v.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-4 border-t border-border mt-4 space-y-3">
                            <div>
                              <h4 className="text-xs font-bold text-primary mb-1">DESCRIÇÃO</h4>
                              <p className="text-sm text-muted-foreground leading-relaxed">{v.descricao}</p>
                            </div>

                            {v.recomendacaoNA28 && (
                              <div>
                                <h4 className="text-xs font-bold text-primary mb-1">RECOMENDAÇÃO NA28</h4>
                                <p className="text-sm text-muted-foreground leading-relaxed">{v.recomendacaoNA28}</p>
                              </div>
                            )}

                            <div>
                              <h4 className="text-xs font-bold text-primary mb-1">MANUSCRITOS</h4>
                              <div className="flex flex-wrap gap-1.5">
                                {v.manuscritos.map((m) => (
                                  <span key={m} className="text-[11px] px-2 py-0.5 rounded bg-muted text-muted-foreground">
                                    {m}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {v.textoRecebido && (
                              <div>
                                <h4 className="text-xs font-bold text-primary mb-1">TEXTO RECEBIDO</h4>
                                <p className="text-sm text-muted-foreground italic leading-relaxed">{v.textoRecebido}</p>
                              </div>
                            )}

                            {v.notas && (
                              <div>
                                <h4 className="text-xs font-bold text-primary mb-1">NOTAS</h4>
                                <p className="text-xs text-muted-foreground leading-relaxed">{v.notas}</p>
                              </div>
                            )}

                            <div className="flex items-center gap-2">
                              <Link
                                href={`/biblia?livro=${parseRef(v.referencia).livro}&capitulo=${parseRef(v.referencia).capitulo}`}
                                className="text-xs text-primary hover:underline font-medium"
                              >
                                Ver na Bíblia →
                              </Link>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {variantes.length === 0 && (
            <ScrollReveal>
              <div className="text-center py-16">
                <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="font-display text-xl text-muted-foreground">Nenhuma variante encontrada</p>
              </div>
            </ScrollReveal>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
