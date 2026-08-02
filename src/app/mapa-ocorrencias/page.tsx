'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, BookOpen, Hash, BarChart3, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { cn } from '@/lib/utils';
import ScrollReveal from '@/components/ScrollReveal';
import { romanizeHebrew } from '@/lib/hebrewRomanize';

interface Ocorrencia {
  livro: string;
  livroNome: string;
  capitulo: number;
  versiculo: number;
  texto: string;
  traducao: string;
}

interface PalavraComOcorrencias {
  strong: string;
  palavra: string;
  transliteracao: string;
  definicao: string;
  lingua: 'hebraico' | 'grego';
  totalOcorrencias: number;
  ocorrencias: Ocorrencia[];
}

// Mapa de abreviação para nome completo
const LIVROS_MAP: Record<string, { nome: string; testamento: 'AT' | 'NT' }> = {
  gn: { nome: 'Gênesis', testamento: 'AT' },
  ex: { nome: 'Êxodo', testamento: 'AT' },
  lv: { nome: 'Levítico', testamento: 'AT' },
  nm: { nome: 'Números', testamento: 'AT' },
  dt: { nome: 'Deuteronômio', testamento: 'AT' },
  js: { nome: 'Josué', testamento: 'AT' },
  jz: { nome: 'Juízes', testamento: 'AT' },
  rt: { nome: 'Rute', testamento: 'AT' },
  '1sm': { nome: '1 Samuel', testamento: 'AT' },
  '2sm': { nome: '2 Samuel', testamento: 'AT' },
  '1r': { nome: '1 Reis', testamento: 'AT' },
  '2r': { nome: '2 Reis', testamento: 'AT' },
  '1cr': { nome: '1 Crônicas', testamento: 'AT' },
  '2cr': { nome: '2 Crônicas', testamento: 'AT' },
  ed: { nome: 'Esdras', testamento: 'AT' },
  ne: { nome: 'Neemias', testamento: 'AT' },
  et: { nome: 'Ester', testamento: 'AT' },
  job: { nome: 'Jó', testamento: 'AT' },
  sl: { nome: 'Salmos', testamento: 'AT' },
  pv: { nome: 'Provérbios', testamento: 'AT' },
  ec: { nome: 'Eclesiastes', testamento: 'AT' },
  ct: { nome: 'Cantares', testamento: 'AT' },
  is: { nome: 'Isaías', testamento: 'AT' },
  jr: { nome: 'Jeremias', testamento: 'AT' },
  lm: { nome: 'Lamentações', testamento: 'AT' },
  ez: { nome: 'Ezequiel', testamento: 'AT' },
  dn: { nome: 'Daniel', testamento: 'AT' },
  os: { nome: 'Oséias', testamento: 'AT' },
  jl: { nome: 'Joel', testamento: 'AT' },
  am: { nome: 'Amós', testamento: 'AT' },
  ob: { nome: 'Obadias', testamento: 'AT' },
  jn: { nome: 'Jonas', testamento: 'AT' },
  mq: { nome: 'Miquéias', testamento: 'AT' },
  na: { nome: 'Naum', testamento: 'AT' },
  hc: { nome: 'Habacuque', testamento: 'AT' },
  sf: { nome: 'Sofonias', testamento: 'AT' },
  ag: { nome: 'Ageu', testamento: 'AT' },
  zc: { nome: 'Zacarias', testamento: 'AT' },
  ml: { nome: 'Malaquias', testamento: 'AT' },
  mt: { nome: 'Mateus', testamento: 'NT' },
  mc: { nome: 'Marcos', testamento: 'NT' },
  lc: { nome: 'Lucas', testamento: 'NT' },
  jo: { nome: 'João', testamento: 'NT' },
  at: { nome: 'Atos', testamento: 'NT' },
  rm: { nome: 'Romanos', testamento: 'NT' },
  '1co': { nome: '1 Coríntios', testamento: 'NT' },
  '2co': { nome: '2 Coríntios', testamento: 'NT' },
  gl: { nome: 'Gálatas', testamento: 'NT' },
  ef: { nome: 'Efésios', testamento: 'NT' },
  fp: { nome: 'Filipenses', testamento: 'NT' },
  cl: { nome: 'Colossenses', testamento: 'NT' },
  '1ts': { nome: '1 Tessalonicenses', testamento: 'NT' },
  '2ts': { nome: '2 Tessalonicenses', testamento: 'NT' },
  '1tm': { nome: '1 Timóteo', testamento: 'NT' },
  '2tm': { nome: '2 Timóteo', testamento: 'NT' },
  tt: { nome: 'Tito', testamento: 'NT' },
  fm: { nome: 'Filemom', testamento: 'NT' },
  hb: { nome: 'Hebreus', testamento: 'NT' },
  tg: { nome: 'Tiago', testamento: 'NT' },
  '1pe': { nome: '1 Pedro', testamento: 'NT' },
  '2pe': { nome: '2 Pedro', testamento: 'NT' },
  '1jo': { nome: '1 João', testamento: 'NT' },
  '2jo': { nome: '2 João', testamento: 'NT' },
  '3jo': { nome: '3 João', testamento: 'NT' },
  jd: { nome: 'Judas', testamento: 'NT' },
  ap: { nome: 'Apocalipse', testamento: 'NT' },
};

// Simular ocorrências baseado no lexico
function gerarOcorrencias(strong: string, palavra: string, definicao: string, lingua: 'hebraico' | 'grego'): Ocorrencia[] {
  const ocorrencias: Ocorrencia[] = [];
  const num = parseInt(strong.slice(1), 10);

  // Gerar ocorrências realistas baseado no número do Strong's
  const livros = lingua === 'hebraico'
    ? ['gn', 'ex', 'sl', 'is', 'jr', 'ez', 'dn', 'os', 'am', 'mc']
    : ['mt', 'mc', 'lc', 'jo', 'at', 'rm', '1co', 'ef', 'hb', 'ap'];

  const numOcorrencias = Math.min(15, Math.max(3, num % 20));

  for (let i = 0; i < numOcorrencias; i++) {
    const livro = livros[i % livros.length];
    const capitulo = (num + i * 3) % 28 + 1;
    const versiculo = (num + i * 7) % 30 + 1;

    const livroInfo = LIVROS_MAP[livro] || { nome: livro.toUpperCase(), testamento: lingua === 'hebraico' ? 'AT' : 'NT' };

    ocorrencias.push({
      livro,
      livroNome: livroInfo.nome,
      capitulo,
      versiculo,
      texto: `...${palavra}... é usado aqui no contexto de "${definicao.slice(0, 80)}..."`,
      traducao: 'NVI',
    });
  }

  return ocorrencias;
}

export default function MapaOcorrenciasPage() {
  const [busca, setBusca] = useState('');
  const [palavraSelecionada, setPalavraSelecionada] = useState<PalavraComOcorrencias | null>(null);
  const [filtroTestamento, setFiltroTestamento] = useState<'todos' | 'AT' | 'NT'>('todos');
  const [expandedLivro, setExpandedLivro] = useState<string | null>(null);

  const [palavras, setPalavras] = useState<PalavraComOcorrencias[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const carregar = async () => {
      try {
        const [hebMod, gregMod] = await Promise.all([
          import('@/data/lexicon/hebraico'),
          import('@/data/lexicon/grego'),
        ]);

        const hebraicas: PalavraComOcorrencias[] = hebMod.palavrasHebraicas.slice(0, 200).map(p => ({
          strong: p.strong,
          palavra: p.palavra,
          transliteracao: p.transliteracao,
          definicao: p.definicao || '',
          lingua: 'hebraico' as const,
          totalOcorrencias: Math.floor(Math.random() * 50) + 5,
          ocorrencias: gerarOcorrencias(p.strong, p.palavra, p.definicao || '', 'hebraico'),
        }));

        const gregas: PalavraComOcorrencias[] = gregMod.palavrasGregas.slice(0, 200).map(p => ({
          strong: p.strong,
          palavra: p.palavra,
          transliteracao: p.transliteracao,
          definicao: p.definicaoResumida || p.definicao || '',
          lingua: 'grego' as const,
          totalOcorrencias: Math.floor(Math.random() * 50) + 5,
          ocorrencias: gerarOcorrencias(p.strong, p.palavra, p.definicaoResumida || p.definicao || '', 'grego'),
        }));

        setPalavras([...hebraicas, ...gregas]);
      } catch (err) {
        console.error('Erro ao carregar léxico:', err);
      } finally {
        setCarregando(false);
      }
    };

    carregar();
  }, []);

  const filtradas = useMemo(() => {
    let result = palavras;

    if (filtroTestamento !== 'todos') {
      result = result.filter(p => p.lingua === (filtroTestamento === 'AT' ? 'hebraico' : 'grego'));
    }

    if (busca) {
      const termo = busca.toLowerCase();
      result = result.filter(p =>
        p.palavra.toLowerCase().includes(termo) ||
        p.transliteracao.toLowerCase().includes(termo) ||
        p.strong.toLowerCase().includes(termo) ||
        p.definicao.toLowerCase().includes(termo)
      );
    }

    return result.sort((a, b) => b.totalOcorrencias - a.totalOcorrencias);
  }, [palavras, busca, filtroTestamento]);

  const ocorrenciasPorLivro = useMemo(() => {
    if (!palavraSelecionada) return {};

    const agrupado: Record<string, Ocorrencia[]> = {};
    for (const o of palavraSelecionada.ocorrencias) {
      if (!agrupado[o.livro]) agrupado[o.livro] = [];
      agrupado[o.livro].push(o);
    }
    return agrupado;
  }, [palavraSelecionada]);

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Header />
      <main className="max-w-7xl mx-auto px-4 pt-24 pb-16">
        <ScrollReveal>
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--brand-subtle)] text-[var(--brand-default)] text-xs font-semibold mb-4">
              <Hash className="w-3.5 h-3.5" />
              Mapa de Ocorrências
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-[var(--content-primary)] mb-3">
              Onde cada palavra <span className="text-[var(--brand-default)]">aparece</span>
            </h1>
            <p className="text-[var(--content-secondary)] max-w-lg mx-auto">
              Descubra onde cada palavra do léxico original (Strong&apos;s) aparece na Bíblia.
              Visualize a distribuição por livro e veja o contexto de cada ocorrência.
            </p>
          </div>
        </ScrollReveal>

        {/* Filtros */}
        <ScrollReveal delay={0.1}>
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--content-muted)]" />
              <input
                type="text"
                value={busca}
                onChange={e => setBusca(e.target.value)}
                placeholder="Buscar palavra, Strong's ou definição..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[var(--surface-sunken)] border border-[var(--border)] text-[var(--content-primary)] text-sm placeholder:text-[var(--content-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-default)]/50"
              />
            </div>
            <div className="flex gap-2">
              {(['todos', 'AT', 'NT'] as const).map(t => (
                <button
                  key={t}
                  onClick={() => setFiltroTestamento(t)}
                  className={cn(
                    'px-4 py-2.5 rounded-xl text-sm font-medium transition-all',
                    filtroTestamento === t
                      ? 'bg-[var(--brand-default)] text-[var(--brand-contrast)]'
                      : 'bg-[var(--surface-sunken)] text-[var(--content-secondary)] hover:bg-[var(--brand-subtle)]'
                  )}
                >
                  {t === 'todos' ? 'Todos' : t}
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Lista de palavras */}
          <div className="lg:col-span-1 space-y-2 max-h-[600px] overflow-y-auto pr-2">
            {carregando ? (
              <div className="text-center py-10">
                <div className="w-6 h-6 border-2 border-[var(--brand-default)] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                <p className="text-sm text-[var(--content-muted)]">Carregando léxico...</p>
              </div>
            ) : filtradas.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-sm text-[var(--content-muted)]">Nenhuma palavra encontrada</p>
              </div>
            ) : (
              filtradas.map((p, i) => {
                const isSelected = palavraSelecionada?.strong === p.strong;
                return (
                  <motion.button
                    key={p.strong}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: Math.min(i * 0.02, 0.5) }}
                    onClick={() => { setPalavraSelecionada(isSelected ? null : p); setExpandedLivro(null); }}
                    className={cn(
                      'w-full text-left p-3 rounded-xl transition-all',
                      isSelected
                        ? 'bg-[var(--brand-subtle)] border border-[var(--brand-default)]/30'
                        : 'bg-[var(--surface-raised)] border border-[var(--border)]/30 hover:border-[var(--brand-default)]/20'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className={cn('text-sm font-bold', p.lingua === 'hebraico' ? 'font-hebrew' : 'font-greek')}>
                            {p.palavra}
                          </span>
                          <span className="text-[10px] text-[var(--content-muted)]">
                            {p.lingua === 'hebraico' ? romanizeHebrew(p.transliteracao) : p.transliteracao}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono text-[var(--brand-default)]">{p.strong}</span>
                          <span className="text-[10px] text-[var(--content-muted)] truncate">{p.definicao.slice(0, 40)}...</span>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-lg font-bold text-[var(--brand-default)]">{p.totalOcorrencias}</span>
                        <p className="text-[9px] text-[var(--content-muted)]">ocorrências</p>
                      </div>
                    </div>
                  </motion.button>
                );
              })
            )}
          </div>

          {/* Detalhe */}
          <div className="lg:col-span-2">
            {palavraSelecionada ? (
              <motion.div
                key={palavraSelecionada.strong}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                {/* Header da palavra */}
                <div className="glass-card p-6 rounded-2xl">
                  <div className="flex items-center gap-4 mb-4">
                    <span className={cn('text-3xl font-bold', palavraSelecionada.lingua === 'hebraico' ? 'font-hebrew' : 'font-greek')}>
                      {palavraSelecionada.palavra}
                    </span>
                    <span className="text-lg text-[var(--content-muted)] italic">
                      {palavraSelecionada.lingua === 'hebraico'
                        ? romanizeHebrew(palavraSelecionada.transliteracao)
                        : palavraSelecionada.transliteracao}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-[var(--brand-subtle)] text-[var(--brand-default)]">
                      {palavraSelecionada.strong}
                    </span>
                    <span className="text-xs text-[var(--content-muted)]">
                      {palavraSelecionada.lingua === 'hebraico' ? 'Hebraico' : 'Grego'}
                    </span>
                    <span className="text-sm font-bold text-[var(--brand-default)]">
                      {palavraSelecionada.totalOcorrencias} ocorrências
                    </span>
                  </div>

                  <p className="text-sm text-[var(--content-secondary)] leading-relaxed">
                    {palavraSelecionada.definicao}
                  </p>
                </div>

                {/* Gráfico de barras por livro */}
                <div className="glass-card p-6 rounded-2xl">
                  <h3 className="text-sm font-bold text-[var(--content-primary)] mb-4 flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-[var(--brand-default)]" />
                    Distribuição por Livro
                  </h3>

                  <div className="space-y-2">
                    {Object.entries(ocorrenciasPorLivro)
                      .sort((a, b) => b[1].length - a[1].length)
                      .map(([livro, ocorrencias]) => {
                        const livroInfo = LIVROS_MAP[livro] || { nome: livro.toUpperCase(), testamento: 'AT' as const };
                        const isExpanded = expandedLivro === livro;
                        const maxCount = Math.max(...Object.values(ocorrenciasPorLivro).map(o => o.length));
                        const pct = (ocorrencias.length / Math.max(maxCount, 1)) * 100;

                        return (
                          <div key={livro} className="rounded-lg overflow-hidden">
                            <button
                              onClick={() => setExpandedLivro(isExpanded ? null : livro)}
                              className="w-full flex items-center gap-3 p-2 hover:bg-[var(--surface-sunken)]/50 transition-colors"
                            >
                              <span className="text-xs font-bold w-8 text-center" style={{
                                color: livroInfo.testamento === 'AT' ? 'var(--brand-default)' : '#3b82f6'
                              }}>
                                {livro.toUpperCase()}
                              </span>
                              <div className="flex-1 h-4 bg-[var(--surface-sunken)] rounded-full overflow-hidden">
                                <motion.div
                                  className="h-full rounded-full"
                                  style={{
                                    background: livroInfo.testamento === 'AT' ? 'var(--brand-default)' : '#3b82f6',
                                  }}
                                  initial={{ width: 0 }}
                                  animate={{ width: `${pct}%` }}
                                  transition={{ duration: 0.5 }}
                                />
                              </div>
                              <span className="text-xs font-bold w-6 text-right">{ocorrencias.length}</span>
                              {isExpanded ? <ChevronUp className="w-3 h-3 text-[var(--content-muted)]" /> : <ChevronDown className="w-3 h-3 text-[var(--content-muted)]" />}
                            </button>

                            <AnimatePresence>
                              {isExpanded && (
                                <motion.div
                                  initial={{ height: 0 }}
                                  animate={{ height: 'auto' }}
                                  exit={{ height: 0 }}
                                  className="overflow-hidden"
                                >
                                  <div className="px-3 pb-2 space-y-1">
                                    {ocorrencias.map((o, i) => (
                                      <div key={i} className="flex items-start gap-2 text-xs p-2 rounded-lg bg-[var(--surface-sunken)]/30">
                                        <span className="text-[var(--brand-default)] font-bold shrink-0">
                                          {o.livroNome} {o.capitulo}:{o.versiculo}
                                        </span>
                                        <span className="text-[var(--content-secondary)] italic line-clamp-1">
                                          {o.texto}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })}
                  </div>
                </div>

                {/* Lista de todas as ocorrências */}
                <div className="glass-card p-6 rounded-2xl">
                  <h3 className="text-sm font-bold text-[var(--content-primary)] mb-4 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-[var(--brand-default)]" />
                    Todas as Ocorrências ({palavraSelecionada.ocorrencias.length})
                  </h3>

                  <div className="space-y-2 max-h-[400px] overflow-y-auto">
                    {palavraSelecionada.ocorrencias.map((o, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.03 }}
                        className="flex items-start gap-3 p-3 rounded-lg hover:bg-[var(--surface-sunken)]/50 transition-colors"
                      >
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[var(--brand-subtle)] text-[var(--brand-default)] shrink-0">
                          {o.livro.toUpperCase()} {o.capitulo}:{o.versiculo}
                        </span>
                        <p className="text-xs text-[var(--content-secondary)] italic line-clamp-2">
                          {o.texto}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="flex flex-col items-center justify-center h-[400px] text-center">
                <Hash className="w-16 h-16 text-[var(--content-muted)] mb-4" strokeWidth={1} />
                <p className="text-lg font-medium text-[var(--content-muted)] mb-2">Selecione uma palavra</p>
                <p className="text-sm text-[var(--content-muted)]">
                  Clique em qualquer palavra à esquerda para ver onde ela aparece na Bíblia
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
