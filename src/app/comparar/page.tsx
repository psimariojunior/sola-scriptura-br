'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { GitCompareArrows, ChevronLeft, ChevronRight, Plus, X, Columns3, Rows3, ArrowUpDown } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import { LIVROS_AT, LIVROS_NT, type LivroInfo } from '@/data/biblia/livros';
import { traducoes, type Versao } from '@/data/biblia/versoes';
import { carregarTraducao, obterCapituloMulti, type CapituloComparado, type TraducaoId } from '@/data/biblia/texto/carregar';

const todosLivros = [...LIVROS_AT, ...LIVROS_NT];

function normalizarPalavra(p: string): string {
  return p.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^\w]/g, '');
}

function compararPalavras(texto1: string, texto2: string): { palavras: { texto: string; igual: boolean }[]; diferencas: number } {
  const p1 = texto1.split(/\s+/);
  const p2 = texto2.split(/\s+/);
  const maxLen = Math.max(p1.length, p2.length);
  const palavras: { texto: string; igual: boolean }[] = [];
  let diferencas = 0;

  for (let i = 0; i < maxLen; i++) {
    const a = p1[i] || '';
    const b = p2[i] || '';
    const w1 = normalizarPalavra(a);
    const w2 = normalizarPalavra(b);
    const igual = w1 === w2 && a !== '';
    if (!igual && a !== '' && b !== '') diferencas++;
    palavras.push({ texto: a || b, igual });
  }

  return { palavras, diferencas };
}

function SkeletonLine({ width }: { width: string }) {
  return (
    <div className="animate-pulse">
      <div className={`h-4 rounded-full bg-gradient-to-r from-muted via-muted/60 to-muted ${width}`} />
    </div>
  );
}

export default function CompararPage() {
  const [traducoesSelecionadas, setTraducoesSelecionadas] = useState<TraducaoId[]>(['arc', 'nvi']);
  const [livroIdx, setLivroIdx] = useState(42);
  const [capitulo, setCapitulo] = useState(3);
  const [versiculoSel, setVersiculoSel] = useState<number | null>(null);
  const [dados, setDados] = useState<CapituloComparado[]>([]);
  const [carregando, setCarregando] = useState(false);
  const [modoEmpilhado, setModoEmpilhado] = useState(false);

  const livro = todosLivros[livroIdx];

  const carregarDados = useCallback(async () => {
    setCarregando(true);
    try {
      const data = await obterCapituloMulti(livro.abreviacao, capitulo, traducoesSelecionadas);
      setDados(data);
    } catch {
      setDados([]);
    } finally {
      setCarregando(false);
    }
  }, [traducoesSelecionadas, livro, capitulo]);

  useEffect(() => {
    carregarDados();
  }, [carregarDados]);

  const maxVersiculos = dados.reduce((acc, d) => Math.max(acc, d.versiculos.length), 0);

  const adicionarTraducao = (id: TraducaoId) => {
    if (traducoesSelecionadas.length < 3 && !traducoesSelecionadas.includes(id)) {
      setTraducoesSelecionadas([...traducoesSelecionadas, id]);
    }
  };

  const removerTraducao = (id: TraducaoId) => {
    if (traducoesSelecionadas.length > 2) {
      setTraducoesSelecionadas(traducoesSelecionadas.filter((t) => t !== id));
    }
  };

  const irParaLivro = (direcao: number) => {
    const novoIdx = Math.max(0, Math.min(todosLivros.length - 1, livroIdx + direcao));
    setLivroIdx(novoIdx);
    setCapitulo(1);
    setVersiculoSel(null);
  };

  const irParaCapitulo = useCallback((direcao: number) => {
    setCapitulo((prev) => {
      const novoCap = prev + direcao;
      if (novoCap >= 1 && novoCap <= livro.totalCapitulos) {
        setVersiculoSel(null);
        return novoCap;
      }
      return prev;
    });
  }, [livro.totalCapitulos]);

  const irParaVersiculo = useCallback((direcao: number) => {
    setVersiculoSel((prev) => {
      if (prev === null) {
        return direcao > 0 ? 1 : null;
      }
      const novo = prev + direcao;
      if (novo >= 1 && novo <= maxVersiculos) return novo;
      return prev;
    });
  }, [maxVersiculos]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLSelectElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === 'ArrowLeft') { e.preventDefault(); irParaCapitulo(-1); }
      else if (e.key === 'ArrowRight') { e.preventDefault(); irParaCapitulo(1); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); irParaVersiculo(-1); }
      else if (e.key === 'ArrowDown') { e.preventDefault(); irParaVersiculo(1); }
      else if (e.key === 'Escape') setVersiculoSel(null);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [irParaCapitulo, irParaVersiculo]);

  const traducoesDisponiveis = traducoes.filter(
    (t) => !traducoesSelecionadas.includes(t.id as TraducaoId),
  );

  const diffInfo = useMemo(() => {
    if (versiculoSel === null || dados.length < 2) return null;
    const textos = dados.map((d) => d.versiculos[versiculoSel - 1]?.texto || '');
    let totalDiferencas = 0;
    for (let i = 0; i < textos.length - 1; i++) {
      const { diferencas } = compararPalavras(textos[i], textos[i + 1]);
      totalDiferencas += diferencas;
    }
    return { totalDiferencas };
  }, [versiculoSel, dados]);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <GitCompareArrows className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h1 className="font-display text-3xl font-light">Comparar Traduções</h1>
                <p className="text-sm text-muted-foreground">Compare versículos lado a lado em diferentes versões</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-1 space-y-4">
                <div className="rounded-2xl border border-border/50 bg-card/50 p-5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 block">
                    Traduções ({traducoesSelecionadas.length}/3)
                  </label>
                  <div className="space-y-2">
                    {traducoesSelecionadas.map((tid) => {
                      const t = traducoes.find((tr) => tr.id === tid);
                      return (
                        <div key={tid} className="flex items-center justify-between p-2.5 rounded-xl bg-primary/5 border border-primary/20">
                          <div>
                            <p className="text-sm font-semibold">{t?.sigla}</p>
                            <p className="text-xs text-muted-foreground">{t?.nome}</p>
                          </div>
                          {traducoesSelecionadas.length > 2 && (
                            <button onClick={() => removerTraducao(tid)} className="p-1 rounded-lg hover:bg-destructive/10 transition-colors">
                              <X className="w-3.5 h-3.5 text-destructive" />
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  {traducoesDisponiveis.length > 0 && traducoesSelecionadas.length < 3 && (
                    <div className="mt-3">
                      <label className="text-xs text-muted-foreground mb-1 block">Adicionar:</label>
                      <div className="flex flex-wrap gap-1.5">
                        {traducoesDisponiveis.map((t) => (
                          <button
                            key={t.id}
                            onClick={() => adicionarTraducao(t.id as TraducaoId)}
                            className="flex items-center gap-1 px-2.5 py-1 text-xs rounded-lg border border-border/50 hover:bg-muted/50 hover:border-primary/30 transition-all"
                          >
                            <Plus className="w-3 h-3" /> {t.sigla}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="rounded-2xl border border-border/50 bg-card/50 p-5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 block">
                    Exibição
                  </label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setModoEmpilhado(false)}
                      className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${!modoEmpilhado ? 'bg-primary text-primary-foreground shadow-sm' : 'border border-border/50 hover:bg-muted/50'}`}
                    >
                      <Columns3 className="w-3.5 h-3.5" /> Colunas
                    </button>
                    <button
                      onClick={() => setModoEmpilhado(true)}
                      className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${modoEmpilhado ? 'bg-primary text-primary-foreground shadow-sm' : 'border border-border/50 hover:bg-muted/50'}`}
                    >
                      <Rows3 className="w-3.5 h-3.5" /> Empilhado
                    </button>
                  </div>
                  {traducoesSelecionadas.length === 2 && (
                    <p className="text-[10px] text-muted-foreground mt-2 text-center">Diferenças destacadas em amarelo</p>
                  )}
                </div>

                <div className="rounded-2xl border border-border/50 bg-card/50 p-5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 block">
                    Navegação
                  </label>
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">Livro</label>
                      <select
                        value={livroIdx}
                        onChange={(e) => { setLivroIdx(Number(e.target.value)); setCapitulo(1); setVersiculoSel(null); }}
                        className="w-full px-3 py-2 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                      >
                        <optgroup label="Antigo Testamento">
                          {LIVROS_AT.map((l, i) => (
                            <option key={l.abreviacao} value={i}>{l.nome}</option>
                          ))}
                        </optgroup>
                        <optgroup label="Novo Testamento">
                          {LIVROS_NT.map((l, i) => (
                            <option key={l.abreviacao} value={LIVROS_AT.length + i}>{l.nome}</option>
                          ))}
                        </optgroup>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">Capítulo</label>
                      <div className="flex items-center gap-2">
                        <button onClick={() => irParaCapitulo(-1)} disabled={capitulo <= 1} className="p-2 rounded-lg border border-border hover:bg-muted/50 disabled:opacity-30 transition-all">
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <span className="flex-1 text-center font-display text-lg font-medium">{capitulo}</span>
                        <button onClick={() => irParaCapitulo(1)} disabled={capitulo >= livro.totalCapitulos} className="p-2 rounded-lg border border-border hover:bg-muted/50 disabled:opacity-30 transition-all">
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {versiculoSel !== null && (
                      <div className="p-2.5 rounded-xl bg-primary/5 border border-primary/20 text-center">
                        <p className="text-xs text-muted-foreground">Versículo selecionado</p>
                        <p className="font-display text-lg font-semibold text-primary">{versiculoSel}</p>
                        {diffInfo && (
                          <div className="mt-2 flex items-center justify-center gap-1.5">
                            <ArrowUpDown className="w-3 h-3 text-amber-500" />
                            <p className="text-xs text-amber-600 dark:text-amber-400 font-medium">
                              {diffInfo.totalDiferencas} {diffInfo.totalDiferencas === 1 ? 'diferença' : 'diferenças'}
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="text-[10px] text-muted-foreground text-center space-y-0.5 pt-1">
                      <p>← → Capítulos · ↑ ↓ Versículos</p>
                      <p>Esc para deselecionar</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-3">
                <div className="rounded-2xl border border-border/50 bg-card/50 overflow-hidden">
                  <div className="border-b border-border/30 p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="font-display text-lg font-medium">{livro.nome} {capitulo}</h2>
                        <p className="text-xs text-muted-foreground">{traducoesSelecionadas.map((t) => traducoes.find((tr) => tr.id === t)?.sigla).join(' × ')}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => irParaCapitulo(-1)} disabled={capitulo <= 1} className="p-2 rounded-lg border border-border hover:bg-muted/50 disabled:opacity-30 transition-all">
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button onClick={() => irParaCapitulo(1)} disabled={capitulo >= livro.totalCapitulos} className="p-2 rounded-lg border border-border hover:bg-muted/50 disabled:opacity-30 transition-all">
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {carregando ? (
                    <div className="p-6 space-y-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="space-y-2 p-4 rounded-xl border border-border/20">
                          <SkeletonLine width="w-16" />
                          <SkeletonLine width={i % 2 === 0 ? 'w-full' : 'w-11/12'} />
                          <SkeletonLine width={i % 3 === 0 ? 'w-4/5' : 'w-full'} />
                        </div>
                      ))}
                    </div>
                  ) : dados.length === 0 ? (
                    <div className="p-12 text-center text-muted-foreground text-sm">
                      Nenhum dado disponível para esta passagem.
                    </div>
                  ) : versiculoSel !== null ? (
                    <div className="p-6 space-y-4">
                      {diffInfo && (
                        <div className="flex items-center justify-center gap-2 mb-4">
                          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/40">
                            <ArrowUpDown className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                            <span className="text-xs font-medium text-amber-700 dark:text-amber-300">
                              {diffInfo.totalDiferencas} {diffInfo.totalDiferencas === 1 ? 'diferença' : 'diferenças'} encontrada{diffInfo.totalDiferencas !== 1 ? 's' : ''}
                            </span>
                          </div>
                        </div>
                      )}
                      {dados.map((d, idx) => {
                        const v = d.versiculos[versiculoSel - 1];
                        const outrosTextos = dados.filter((_, i) => i !== idx).map((od) => od.versiculos[versiculoSel - 1]?.texto || '');
                        const usarDiff = traducoesSelecionadas.length === 2 && idx === 0 && outrosTextos.length > 0;

                        return (
                          <motion.div
                            key={d.traducao}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="p-4 rounded-xl bg-background/50 border border-border/30"
                          >
                            <p className="text-xs font-semibold text-primary mb-2">{traducoes.find((t) => t.id === d.traducao)?.sigla || d.traducao}</p>
                            <p className="text-sm leading-relaxed">
                              {v ? (
                                <>
                                  <span className="font-semibold text-primary mr-1">{versiculoSel}.</span>
                                  {usarDiff ? (
                                    (() => {
                                      const { palavras } = compararPalavras(v.texto, outrosTextos[0]);
                                      return palavras.map((p, pi) => (
                                        <span
                                          key={pi}
                                          className={`${p.igual ? 'bg-emerald-100 dark:bg-emerald-900/30' : 'bg-amber-100 dark:bg-amber-900/30'} rounded px-0.5 mx-px transition-colors`}
                                        >
                                          {p.texto}{' '}
                                        </span>
                                      ));
                                    })()
                                  ) : (
                                    v.texto
                                  )}
                                </>
                              ) : (
                                <span className="text-muted-foreground italic">Versículo não disponível</span>
                              )}
                            </p>
                          </motion.div>
                        );
                      })}
                      {traducoesSelecionadas.length === 2 && (
                        <div className="flex items-center justify-center gap-4 pt-2">
                          <div className="flex items-center gap-1.5">
                            <div className="w-3 h-3 rounded bg-amber-100 dark:bg-amber-900/30 border border-amber-300 dark:border-amber-700/50" />
                            <span className="text-[10px] text-muted-foreground">Diferente</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <div className="w-3 h-3 rounded bg-emerald-100 dark:bg-emerald-900/30 border border-emerald-300 dark:border-emerald-700/50" />
                            <span className="text-[10px] text-muted-foreground">Igual</span>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="divide-y divide-border/30">
                      {Array.from({ length: maxVersiculos }, (_, i) => i + 1).map((vNum) => {
                        const selected = versiculoSel === vNum;
                        return (
                          <button
                            key={vNum}
                            onClick={() => setVersiculoSel(selected ? null : vNum)}
                            className={`w-full text-left p-4 hover:bg-muted/30 transition-all ${selected ? 'bg-primary/5' : ''}`}
                          >
                            {modoEmpilhado ? (
                              <div className="space-y-3">
                                {dados.map((d, idx) => {
                                  const v = d.versiculos[vNum - 1];
                                  const texto = v?.texto || '';
                                  const outrosIdx = dados.findIndex((_, i) => i !== idx);
                                  const usarDiff = traducoesSelecionadas.length === 2;
                                  const outroTexto = usarDiff ? (dados[outrosIdx]?.versiculos[vNum - 1]?.texto || '') : '';

                                  return (
                                    <div key={d.traducao} className="space-y-1">
                                      <p className="text-xs font-semibold text-primary/70">{traducoes.find((t) => t.id === d.traducao)?.sigla}</p>
                                      <p className="text-sm leading-relaxed">
                                        <span className="font-semibold text-primary mr-1">{vNum}.</span>
                                        {texto ? (
                                          usarDiff ? (
                                            (() => {
                                              const { palavras } = compararPalavras(texto, outroTexto);
                                              return palavras.map((p, pi) => (
                                                <span
                                                  key={pi}
                                                  className={`${p.igual ? 'bg-emerald-100 dark:bg-emerald-900/30' : 'bg-amber-100 dark:bg-amber-900/30'} rounded px-0.5 mx-px`}
                                                >
                                                  {p.texto}{' '}
                                                </span>
                                              ));
                                            })()
                                          ) : (
                                            texto
                                          )
                                        ) : (
                                          <span className="text-muted-foreground italic">—</span>
                                        )}
                                      </p>
                                    </div>
                                  );
                                })}
                              </div>
                            ) : (
                              <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${traducoesSelecionadas.length}, 1fr)` }}>
                                {dados.map((d, idx) => {
                                  const v = d.versiculos[vNum - 1];
                                  const texto = v?.texto || '';
                                  const outrosIdx = dados.findIndex((_, i) => i !== idx);
                                  const usarDiff = traducoesSelecionadas.length === 2;
                                  const outroTexto = usarDiff ? (dados[outrosIdx]?.versiculos[vNum - 1]?.texto || '') : '';

                                  return (
                                    <div key={d.traducao} className="space-y-1">
                                      <p className="text-xs font-semibold text-primary/70">{traducoes.find((t) => t.id === d.traducao)?.sigla}</p>
                                      <p className="text-sm leading-relaxed">
                                        <span className="font-semibold text-primary mr-1">{vNum}.</span>
                                        {texto ? (
                                          usarDiff ? (
                                            (() => {
                                              const { palavras } = compararPalavras(texto, outroTexto);
                                              return palavras.map((p, pi) => (
                                                <span
                                                  key={pi}
                                                  className={`${p.igual ? 'bg-emerald-100 dark:bg-emerald-900/30' : 'bg-amber-100 dark:bg-amber-900/30'} rounded px-0.5 mx-px`}
                                                >
                                                  {p.texto}{' '}
                                                </span>
                                              ));
                                            })()
                                          ) : (
                                            texto
                                          )
                                        ) : (
                                          <span className="text-muted-foreground italic">—</span>
                                        )}
                                      </p>
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </main>
      <Footer />
    </div>
  );
}