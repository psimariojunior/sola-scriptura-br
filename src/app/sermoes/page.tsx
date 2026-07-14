'use client';

import { useState, useMemo } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, ChevronDown, ChevronUp, Search, Filter,
  Cross, Heart, Users, Sparkles, Target, Lightbulb, Clock
} from 'lucide-react';
import {
  SERMOES, CATEGORIAS_SERMOES, buscarSermoes, filtrarPorCategoria,
  filtrarPorLivro, obterAutoresUnicos
} from '@/data/sermoes';
import type { Sermao, SermoneCategoria } from '@/data/sermoes';

const LIVROS_BIBLICOS = [
  'Gênesis', 'Êxodo', 'Levítico', 'Números', 'Deuteronômio',
  'Josué', 'Juízes', 'Rute', '1 Samuel', '2 Samuel',
  '1 Reis', '2 Reis', '1 Crônicas', '2 Crônicas', 'Esdras',
  'Neemias', 'Ester', 'Jó', 'Salmos', 'Provérbios',
  'Eclesiastes', 'Cânticos', 'Isaías', 'Jeremias', 'Lamentações',
  'Ezequiel', 'Daniel', 'Oséias', 'Joel', 'Amós',
  'Obadias', 'Jonas', 'Miquéias', 'Naum', 'Habacuque',
  'Sofonias', 'Ageu', 'Zacarias', 'Malaquias',
  'Mateus', 'Marcos', 'Lucas', 'João', 'Atos',
  'Romanos', '1 Coríntios', '2 Coríntios', 'Gálatas', 'Efésios',
  'Filipenses', 'Colossenses', '1 Tessalonicenses', '2 Tessalonicenses',
  '1 Timóteo', '2 Timóteo', 'Tito', 'Filemom', 'Hebreus',
  'Tiago', '1 Pedro', '2 Pedro', '1 João', '2 João',
  '3 João', 'Judas', 'Apocalipse',
];

const ICONE_CATEGORIA: Record<string, React.ReactNode> = {
  'Salvação': <Cross className="w-4 h-4" />,
  'Fé': <Heart className="w-4 h-4" />,
  'Oração': <BookOpen className="w-4 h-4" />,
  'Amor': <Heart className="w-4 h-4" />,
  'Esperança': <Sparkles className="w-4 h-4" />,
  'Juízo': <Target className="w-4 h-4" />,
  'Graça': <Lightbulb className="w-4 h-4" />,
  'Espírito Santo': <Sparkles className="w-4 h-4" />,
  'Igreja': <Users className="w-4 h-4" />,
  'Escatologia': <Clock className="w-4 h-4" />,
};

export default function SermoesPage() {
  const [busca, setBusca] = useState('');
  const [categoriaAtiva, setCategoriaAtiva] = useState<SermoneCategoria | null>(null);
  const [livroAtivo, setLivroAtivo] = useState<string | null>(null);
  const [sermaoAberto, setSermaoAberto] = useState<string | null>(null);
  const [mostrarFiltros, setMostrarFiltros] = useState(false);

  const autores = useMemo(() => obterAutoresUnicos(), []);

  const sermoesFiltrados = useMemo(() => {
    let resultado = SERMOES;

    if (busca.trim()) {
      resultado = buscarSermoes(busca);
    }

    if (categoriaAtiva) {
      resultado = resultado.filter((s) => s.categorias.includes(categoriaAtiva));
    }

    if (livroAtivo) {
      resultado = resultado.filter((s) => s.livro === livroAtivo);
    }

    return resultado;
  }, [busca, categoriaAtiva, livroAtivo]);

  const toggleSermao = (id: string) => {
    setSermaoAberto(sermaoAberto === id ? null : id);
  };

  const limparFiltros = () => {
    setBusca('');
    setCategoriaAtiva(null);
    setLivroAtivo(null);
  };

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Header />
      <main className="pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-10">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--primary)]/20 to-[var(--primary)]/10 flex items-center justify-center mx-auto mb-5"
              >
                <Cross className="w-8 h-8 text-[var(--primary)]" />
              </motion.div>
              <h1 className="font-display text-4xl md:text-5xl font-light text-[var(--fg)] mb-3">
                Sermões
              </h1>
              <p className="text-[var(--fg)] text-lg max-w-2xl mx-auto">
                Biblioteca de sermões organizados por tema, livro bíblico e autor
              </p>
              <div className="ornament w-16 mx-auto mt-6" />
            </div>
          </ScrollReveal>

          {/* Barra de busca */}
          <ScrollReveal>
            <div className="mb-6 space-y-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--muted-fg)]" />
                <input
                  type="text"
                  placeholder="Buscar por título, autor, versículo ou palavra-chave..."
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-[var(--card-bg)] border border-[var(--border)] text-[var(--fg)] placeholder:text-[var(--muted-fg)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30 transition-all"
                />
              </div>

              <div className="flex items-center gap-3 flex-wrap">
                <button
                  onClick={() => setMostrarFiltros(!mostrarFiltros)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--card-bg)] border border-[var(--border)] text-[var(--fg)] hover:bg-[var(--primary)]/10 transition-colors text-sm"
                >
                  <Filter className="w-4 h-4" />
                  Filtros
                  {(categoriaAtiva || livroAtivo) && (
                    <span className="w-2 h-2 rounded-full bg-[var(--primary)]" />
                  )}
                </button>

                {(categoriaAtiva || livroAtivo) && (
                  <button
                    onClick={limparFiltros}
                    className="px-3 py-1.5 rounded-lg text-xs text-[var(--primary)] hover:bg-[var(--primary)]/10 transition-colors"
                  >
                    Limpar filtros
                  </button>
                )}

                <span className="text-xs text-[var(--muted-fg)]">
                  {sermoesFiltrados.length} sermão{sermoesFiltrados.length !== 1 ? 'ões' : ''}
                </span>
              </div>

              <AnimatePresence>
                {mostrarFiltros && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-4 space-y-4">
                      {/* Categorias */}
                      <div>
                        <h3 className="text-xs font-semibold text-[var(--muted-fg)] uppercase tracking-wider mb-2">
                          Categorias
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {CATEGORIAS_SERMOES.map((cat) => (
                            <button
                              key={cat.valor}
                              onClick={() => setCategoriaAtiva(categoriaAtiva === cat.valor ? null : cat.valor)}
                              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-all ${
                                categoriaAtiva === cat.valor
                                  ? 'bg-[var(--primary)] text-white'
                                  : 'bg-[var(--bg)] border border-[var(--border)] text-[var(--fg)] hover:bg-[var(--primary)]/10'
                              }`}
                            >
                              {ICONE_CATEGORIA[cat.valor]}
                              {cat.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Livros */}
                      <div>
                        <h3 className="text-xs font-semibold text-[var(--muted-fg)] uppercase tracking-wider mb-2">
                          Livros Bíblicos
                        </h3>
                        <select
                          value={livroAtivo || ''}
                          onChange={(e) => setLivroAtivo(e.target.value || null)}
                          className="w-full px-3 py-2 rounded-lg bg-[var(--bg)] border border-[var(--border)] text-[var(--fg)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30"
                        >
                          <option value="">Todos os livros</option>
                          {LIVROS_BIBLICOS.map((livro) => (
                            <option key={livro} value={livro}>{livro}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </ScrollReveal>

          {/* Lista de sermões */}
          <div className="space-y-3">
            {sermoesFiltrados.length === 0 ? (
              <ScrollReveal>
                <div className="text-center py-12">
                  <BookOpen className="w-12 h-12 text-[var(--muted-fg)] mx-auto mb-4 opacity-50" />
                  <p className="text-[var(--muted-fg)] text-lg">Nenhum sermão encontrado com esses filtros.</p>
                  <button
                    onClick={limparFiltros}
                    className="mt-3 text-[var(--primary)] text-sm hover:underline"
                  >
                    Limpar filtros
                  </button>
                </div>
              </ScrollReveal>
            ) : (
              sermoesFiltrados.map((sermao) => (
                <ScrollReveal key={sermao.id}>
                  <motion.div
                    layout
                    className={`sola-card overflow-hidden border transition-all ${
                      sermaoAberto === sermao.id ? 'ring-2 ring-[var(--primary)]/20' : ''
                    }`}
                  >
                    <button
                      onClick={() => toggleSermao(sermao.id)}
                      className="w-full flex items-center gap-4 p-5 text-left hover:bg-[var(--bg)]/50 transition-colors"
                    >
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--primary)]/20 to-[var(--primary)]/10 flex items-center justify-center shrink-0">
                        {ICONE_CATEGORIA[sermao.categorias[0]] || <BookOpen className="w-5 h-5" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-display text-lg font-semibold text-[var(--fg)] truncate">
                          {sermao.titulo}
                        </h3>
                        <div className="flex items-center gap-3 text-xs text-[var(--muted-fg)] mt-0.5">
                          <span className="font-semibold text-[var(--primary)]">{sermao.textoBase}</span>
                          <span>·</span>
                          <span>{sermao.autor}</span>
                          <span>·</span>
                          <span>{new Date(sermao.data).toLocaleDateString('pt-BR')}</span>
                        </div>
                      </div>
                      <div className="shrink-0 text-[var(--muted-fg)]">
                        {sermaoAberto === sermao.id ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </div>
                    </button>

                    <AnimatePresence>
                      {sermaoAberto === sermao.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-5 space-y-4">
                            {/* Resumo */}
                            <div className="bg-[var(--bg)] rounded-xl p-5">
                              <h4 className="text-xs font-semibold text-[var(--muted-fg)] uppercase tracking-wider mb-2">
                                Resumo
                              </h4>
                              <p className="text-sm text-[var(--fg)] leading-relaxed font-serif-body">
                                {sermao.resumo}
                              </p>
                            </div>

                            {/* Metadados */}
                            <div className="grid grid-cols-2 gap-3">
                              <div className="bg-[var(--bg)] rounded-xl p-4">
                                <p className="text-xs font-semibold text-[var(--muted-fg)] uppercase tracking-wider mb-1">
                                  Texto Base
                                </p>
                                <p className="text-sm font-semibold text-[var(--primary)]">
                                  {sermao.textoBase}
                                </p>
                              </div>
                              <div className="bg-[var(--bg)] rounded-xl p-4">
                                <p className="text-xs font-semibold text-[var(--muted-fg)] uppercase tracking-wider mb-1">
                                  Autor
                                </p>
                                <p className="text-sm text-[var(--fg)]">
                                  {sermao.autor}
                                </p>
                              </div>
                            </div>

                            {/* Categorias */}
                            <div className="flex flex-wrap gap-2">
                              {sermao.categorias.map((cat) => (
                                <span
                                  key={cat}
                                  className="flex items-center gap-1 px-3 py-1 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-semibold"
                                >
                                  {ICONE_CATEGORIA[cat]}
                                  {cat}
                                </span>
                              ))}
                            </div>

                            {/* Palavras-chave */}
                            <div>
                              <h4 className="text-xs font-semibold text-[var(--muted-fg)] uppercase tracking-wider mb-2">
                                Palavras-chave
                              </h4>
                              <div className="flex flex-wrap gap-1.5">
                                {sermao.palavrasChave.map((palavra) => (
                                  <span
                                    key={palavra}
                                    className="px-2 py-0.5 rounded bg-[var(--card-bg)] border border-[var(--border)] text-[var(--muted-fg)] text-xs"
                                  >
                                    {palavra}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </ScrollReveal>
              ))
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
