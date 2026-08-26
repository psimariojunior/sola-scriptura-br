'use client';

import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Search, X, Loader2, Languages, ChevronRight } from 'lucide-react';
import { traducoes } from '@/data/biblia/versoes';
import { buildIndice, buscar, getConcordanciaLocais, type Ocorrencia } from '@/lib/concordancia';
import { TODOS_LIVROS } from '@/data/biblia/livros';
import type { PalavraStrong } from '@/data/biblia/strong';

const TRADUCOES_LOCAIS = getConcordanciaLocais();
const TRADUCOES_INFO = traducoes.filter((t) => TRADUCOES_LOCAIS.includes(t.id));

type ModoConcordancia = 'palavra' | 'strong';

function refParaLabel(ref: string): { livro: string; capitulo: number; versiculo: number; label: string } {
  const [abrev, capStr, verStr] = ref.split(':');
  const livroObj = TODOS_LIVROS.find((l) => l.abreviacao === abrev);
  const capitulo = Number(capStr);
  const versiculo = Number(verStr);
  return { livro: abrev, capitulo, versiculo, label: `${livroObj?.nome ?? abrev.toUpperCase()} ${capitulo}:${versiculo}` };
}

interface GrupoLivro {
  livro: string;
  livroNome: string;
  capitulos: Map<number, Ocorrencia[]>;
}

function destacar(texto: string, palavra: string): React.ReactNode[] {
  if (!palavra.trim()) return [texto];
  const termos = palavra.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').split(/\s+/).filter(Boolean);
  if (termos.length === 0) return [texto];

  const escaped = termos.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const regex = new RegExp(`(${escaped.join('|')})`, 'gi');
  const partes = texto.split(regex);

  return partes.map((parte, i) => {
    const ehMatch = regex.test(parte);
    regex.lastIndex = 0;
    if (ehMatch) {
      return (
        <mark key={i} className="bg-[var(--brand-default)]/20 text-[var(--content-primary)] rounded px-0.5">
          {parte}
        </mark>
      );
    }
    return parte;
  });
}

function buildGrupos(ocorrencias: Ocorrencia[]): GrupoLivro[] {
  const mapa = new Map<string, GrupoLivro>();

  for (const oc of ocorrencias) {
    let grupo = mapa.get(oc.livro);
    if (!grupo) {
      grupo = { livro: oc.livro, livroNome: oc.livroNome, capitulos: new Map() };
      mapa.set(oc.livro, grupo);
    }
    let caps = grupo.capitulos.get(oc.capitulo);
    if (!caps) {
      caps = [];
      grupo.capitulos.set(oc.capitulo, caps);
    }
    caps.push(oc);
  }

  const grupos = Array.from(mapa.values());
  grupos.sort((a, b) => a.livroNome.localeCompare(b.livroNome, 'pt-BR'));
  for (const g of grupos) {
    g.capitulos.forEach((lista) => lista.sort((x, y) => x.versiculo - y.versiculo));
  }
  return grupos;
}

const PAGINA_OCORRENCIAS = 60;

export default function ConcordanciaPage() {
  const router = useRouter();
  const [modo, setModo] = useState<ModoConcordancia>('palavra');
  const [traducao, setTraducao] = useState<string>(TRADUCOES_LOCAIS[0] ?? 'arc');
  const [query, setQuery] = useState('');
  const [debounced, setDebounced] = useState('');
  const [carregandoIndice, setCarregandoIndice] = useState(false);
  const [pronto, setPronto] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const indiceRef = useRef<Map<string, Ocorrencia[]>>(new Map());

  // ─── Modo "Original (Strong)" ───────────────────────────────────────────
  const [buscaStrong, setBuscaStrong] = useState('');
  const [debouncedStrong, setDebouncedStrong] = useState('');
  const [sugestoesStrong, setSugestoesStrong] = useState<PalavraStrong[]>([]);
  const [carregandoSugestoes, setCarregandoSugestoes] = useState(false);
  const [strongSelecionado, setStrongSelecionado] = useState<PalavraStrong | null>(null);
  const [ocorrenciasStrong, setOcorrenciasStrong] = useState<string[]>([]);
  const [carregandoOcorrencias, setCarregandoOcorrencias] = useState(false);
  const [paginaOcorrencias, setPaginaOcorrencias] = useState(1);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedStrong(buscaStrong.trim()), 250);
    return () => clearTimeout(t);
  }, [buscaStrong]);

  useEffect(() => {
    if (!debouncedStrong) {
      setSugestoesStrong([]);
      return;
    }
    let cancelado = false;
    setCarregandoSugestoes(true);
    import('@/data/biblia/strong').then(async (mod) => {
      const resultados = await mod.buscarStrong(debouncedStrong);
      if (cancelado) return;
      setSugestoesStrong(resultados.slice(0, 30));
      setCarregandoSugestoes(false);
    });
    return () => { cancelado = true; };
  }, [debouncedStrong]);

  const selecionarStrong = useCallback((entrada: PalavraStrong) => {
    setStrongSelecionado(entrada);
    setPaginaOcorrencias(1);
    setCarregandoOcorrencias(true);
    setSugestoesStrong([]);
    setBuscaStrong(entrada.strong);
    import('@/data/biblia/strong').then((mod) => {
      const refs = mod.getTodasOcorrenciasStrong(entrada.strong);
      setOcorrenciasStrong(refs);
      setCarregandoOcorrencias(false);
    });
  }, []);

  const ocorrenciasStrongOrdenadas = useMemo(() => {
    return [...ocorrenciasStrong].sort((a, b) => {
      const ra = refParaLabel(a);
      const rb = refParaLabel(b);
      const livroA = TODOS_LIVROS.find((l) => l.abreviacao === ra.livro)?.ordem ?? 999;
      const livroB = TODOS_LIVROS.find((l) => l.abreviacao === rb.livro)?.ordem ?? 999;
      return livroA - livroB || ra.capitulo - rb.capitulo || ra.versiculo - rb.versiculo;
    });
  }, [ocorrenciasStrong]);

  const ocorrenciasStrongVisiveis = useMemo(
    () => ocorrenciasStrongOrdenadas.slice(0, paginaOcorrencias * PAGINA_OCORRENCIAS),
    [ocorrenciasStrongOrdenadas, paginaOcorrencias]
  );

  const irParaVersiculoStrong = useCallback(
    (ref: string) => {
      const { livro, capitulo, versiculo } = refParaLabel(ref);
      router.push(`/biblia?livro=${livro}&capitulo=${capitulo}&versiculo=${versiculo}`);
    },
    [router]
  );

  // Carrega o índice da tradução selecionada
  useEffect(() => {
    let cancelado = false;
    setCarregandoIndice(true);
    setPronto(false);
    setErro(null);

    buildIndice(traducao)
      .then((indice) => {
        if (cancelado) return;
        indiceRef.current = indice;
        setPronto(true);
      })
      .catch(() => {
        if (cancelado) return;
        setErro('Não foi possível carregar o texto bíblico desta tradução.');
      })
      .finally(() => {
        if (!cancelado) setCarregandoIndice(false);
      });

    return () => {
      cancelado = true;
    };
  }, [traducao]);

  // Debounce da busca
  useEffect(() => {
    const t = setTimeout(() => setDebounced(query), 250);
    return () => clearTimeout(t);
  }, [query]);

  const ocorrencias = useMemo(() => {
    if (!pronto || !debounced.trim()) return [];
    return buscar(indiceRef.current, debounced);
  }, [debounced, pronto]);

  const grupos = useMemo(() => buildGrupos(ocorrencias), [ocorrencias]);

  const totalVersiculos = useMemo(() => new Set(ocorrencias.map((o) => `${o.livro}-${o.capitulo}-${o.versiculo}`)).size, [ocorrencias]);

  const irParaVersiculo = useCallback(
    (oc: Ocorrencia) => {
      router.push(`/biblia?livro=${oc.livro}&capitulo=${oc.capitulo}&versiculo=${oc.versiculo}`);
    },
    [router]
  );

  const buscaAtiva = debounced.trim().length > 0;

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
                className="w-16 h-16 rounded-2xl bg-[var(--brand-default)]/10 flex items-center justify-center mx-auto mb-6"
              >
                <BookOpen className="w-8 h-8 text-[var(--brand-default)]" />
              </motion.div>
              <h1 className="font-display text-4xl md:text-5xl font-light mb-4">
                Concordância <span className="italic text-[var(--brand-default)]">Bíblica</span>
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Busque qualquer palavra em toda a Bíblia e explore todas as ocorrências, agrupadas por livro e capítulo, com o termo destacado.
              </p>
              <div className="ornament w-16 mx-auto mt-6" />
            </div>
          </div>
        </ScrollReveal>

        <div className="max-w-6xl mx-auto px-6">
          <ScrollReveal delay={0.05}>
            <div className="flex gap-2 mb-6 justify-center">
              <button
                onClick={() => setModo('palavra')}
                className={`px-4 py-2 text-sm font-medium rounded-xl border transition-all duration-300 flex items-center gap-2 ${
                  modo === 'palavra'
                    ? 'bg-[var(--brand-default)] text-white border-[var(--brand-default)]'
                    : 'border-border text-muted-foreground hover:text-foreground hover:border-foreground/30'
                }`}
              >
                <Search className="w-4 h-4" />
                Por palavra (traduzida)
              </button>
              <button
                onClick={() => setModo('strong')}
                className={`px-4 py-2 text-sm font-medium rounded-xl border transition-all duration-300 flex items-center gap-2 ${
                  modo === 'strong'
                    ? 'bg-[var(--brand-default)] text-white border-[var(--brand-default)]'
                    : 'border-border text-muted-foreground hover:text-foreground hover:border-foreground/30'
                }`}
              >
                <Languages className="w-4 h-4" />
                Original (Strong)
              </button>
            </div>
          </ScrollReveal>

          {modo === 'strong' && (
            <ScrollReveal delay={0.1}>
              <div className="sola-card p-4 mb-6">
                <div className="relative mb-2">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Buscar por código Strong (ex.: G26, H430) ou palavra original/transliteração (ex.: agape, logos)..."
                    aria-label="Buscar por código Strong"
                    value={buscaStrong}
                    onChange={(e) => { setBuscaStrong(e.target.value); setStrongSelecionado(null); }}
                    autoFocus
                    className="w-full pl-10 pr-10 py-2.5 text-sm bg-transparent border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--brand-default)]/20 transition-all duration-300"
                  />
                  {buscaStrong && (
                    <button
                      onClick={() => { setBuscaStrong(''); setStrongSelecionado(null); setOcorrenciasStrong([]); }}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                      aria-label="Limpar busca"
                    >
                      <X className="w-3.5 h-3.5 text-muted-foreground" />
                    </button>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  Pesquisa no corpus interlinear real (grego e hebraico) — mostra todas as ocorrências do código Strong selecionado em toda a Bíblia.
                </p>

                {carregandoSugestoes && (
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-3">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" /> Buscando no léxico...
                  </div>
                )}

                {!strongSelecionado && sugestoesStrong.length > 0 && (
                  <div className="mt-3 grid sm:grid-cols-2 gap-2 max-h-80 overflow-y-auto">
                    {sugestoesStrong.map((s) => (
                      <button
                        key={s.strong}
                        onClick={() => selecionarStrong(s)}
                        className="text-left p-3 rounded-lg border border-border/50 hover:border-[var(--brand-default)]/50 hover:bg-muted/40 transition-all"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-serif text-lg text-[var(--brand-default)]">{s.palavra}</span>
                          <span className="text-[10px] uppercase font-bold text-muted-foreground bg-background px-2 py-0.5 rounded-full shrink-0">{s.strong}</span>
                        </div>
                        <p className="text-xs text-muted-foreground italic">{s.transliteracao}</p>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{s.definicao}</p>
                      </button>
                    ))}
                  </div>
                )}

                {!strongSelecionado && debouncedStrong && !carregandoSugestoes && sugestoesStrong.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-6">Nenhum código ou palavra encontrado. Tente um código Strong (G/H + número) ou parte da transliteração.</p>
                )}
              </div>
            </ScrollReveal>
          )}

          {modo === 'strong' && strongSelecionado && (
            <>
              <ScrollReveal delay={0.15}>
                <div className="sola-card p-5 mb-6">
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div>
                      <p className="font-serif text-3xl text-[var(--brand-default)]">{strongSelecionado.palavra}</p>
                      <p className="text-sm text-muted-foreground italic">{strongSelecionado.transliteracao}</p>
                    </div>
                    <span className="text-xs uppercase font-bold text-muted-foreground bg-[var(--surface-raised)] px-3 py-1.5 rounded-full">
                      {strongSelecionado.strong} · {strongSelecionado.idioma === 'grego' ? 'grego' : 'hebraico'}
                    </span>
                  </div>
                  <p className="text-sm mt-3">{strongSelecionado.definicao}</p>
                  {!carregandoOcorrencias && (
                    <p className="text-xs text-muted-foreground mt-3">
                      {ocorrenciasStrong.length} ocorrência{ocorrenciasStrong.length !== 1 ? 's' : ''} catalogada{ocorrenciasStrong.length !== 1 ? 's' : ''} no corpus interlinear
                    </p>
                  )}
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <div className="sola-card rounded-xl overflow-hidden mb-6">
                  <div className="px-4 py-3 border-b border-border/50 bg-[var(--surface-raised)]">
                    <h2 className="font-display text-lg font-semibold text-[var(--content-primary)]">Ocorrências no texto</h2>
                  </div>
                  {carregandoOcorrencias ? (
                    <div className="flex items-center justify-center py-12 gap-2 text-muted-foreground">
                      <Loader2 className="w-5 h-5 animate-spin text-[var(--brand-default)]" />
                      <span>Buscando ocorrências...</span>
                    </div>
                  ) : ocorrenciasStrong.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-12">Nenhuma ocorrência catalogada no corpus interlinear para este código.</p>
                  ) : (
                    <>
                      <div className="divide-y divide-border/30">
                        {ocorrenciasStrongVisiveis.map((ref) => (
                          <button
                            key={ref}
                            onClick={() => irParaVersiculoStrong(ref)}
                            className="w-full text-left flex items-center justify-between gap-3 px-4 py-2.5 hover:bg-muted/50 transition-all duration-200 group"
                          >
                            <span className="text-sm text-[var(--content-secondary)] group-hover:text-[var(--brand-default)] group-hover:underline">
                              {refParaLabel(ref).label}
                            </span>
                            <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
                          </button>
                        ))}
                      </div>
                      {ocorrenciasStrongVisiveis.length < ocorrenciasStrongOrdenadas.length && (
                        <div className="p-4 text-center border-t border-border/30">
                          <button
                            onClick={() => setPaginaOcorrencias((p) => p + 1)}
                            className="px-4 py-2 text-xs font-medium rounded-full border border-border hover:border-[var(--brand-default)]/50 hover:text-[var(--brand-default)] transition-all"
                          >
                            Mostrar mais ({ocorrenciasStrongOrdenadas.length - ocorrenciasStrongVisiveis.length} restantes)
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </ScrollReveal>
            </>
          )}

          {modo === 'palavra' && (
          <>
          <ScrollReveal delay={0.1}>
            <div className="sola-card p-4 mb-6">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Buscar palavra (ex.: graça, amor, fé, salvação)..."
                  aria-label="Buscar palavra na concordância"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  autoFocus
                  className="w-full pl-10 pr-10 py-2.5 text-sm bg-transparent border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--brand-default)]/20 transition-all duration-300"
                />
                {query && (
                  <button
                    onClick={() => setQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    aria-label="Limpar busca"
                  >
                    <X className="w-3.5 h-3.5 text-muted-foreground" />
                  </button>
                )}
              </div>

              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-xs text-muted-foreground mr-1">Tradução:</span>
                {TRADUCOES_INFO.map((t) => (
                  <motion.button
                    key={t.id}
                    onClick={() => setTraducao(t.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`px-3 py-1 text-xs font-medium rounded-full border transition-all duration-300 ${
                      traducao === t.id
                        ? 'bg-[var(--brand-default)] text-white border-[var(--brand-default)]'
                        : 'border-border text-muted-foreground hover:text-foreground hover:border-foreground/30'
                    }`}
                  >
                    {t.sigla}
                  </motion.button>
                ))}

                {carregandoIndice && (
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground ml-auto">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" /> Indexando texto...
                  </span>
                )}
                {pronto && buscaAtiva && (
                  <span className="text-xs text-muted-foreground ml-auto">
                    {ocorrencias.length} ocorrência{ocorrencias.length !== 1 ? 's' : ''} em {totalVersiculos} versículo{totalVersiculos !== 1 ? 's' : ''}
                  </span>
                )}
              </div>
            </div>
          </ScrollReveal>

          {erro && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">{erro}</p>
            </div>
          )}

          {carregandoIndice && !erro && (
            <div className="flex items-center justify-center py-16 gap-2 text-muted-foreground">
              <Loader2 className="w-5 h-5 animate-spin text-[var(--brand-default)]" />
              <span>Preparando índice de concordância...</span>
            </div>
          )}

          {pronto && !erro && (
            <>
              {!buscaAtiva && (
                <div className="text-center py-16">
                  <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="font-display text-xl text-muted-foreground">Digite uma palavra para iniciar a busca</p>
                  <p className="text-sm text-muted-foreground mt-2">Palavras com 4+ letras buscam por prefixo.</p>
                </div>
              )}

              {buscaAtiva && ocorrencias.length === 0 && !carregandoIndice && (
                <div className="text-center py-16">
                  <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="font-display text-xl text-muted-foreground">Nenhuma ocorrência encontrada</p>
                  <p className="text-sm text-muted-foreground mt-2">Tente outra palavra ou verifique a grafia.</p>
                </div>
              )}

              <div className="space-y-6">
                {grupos.map((grupo) => (
                  <ScrollReveal key={grupo.livro} delay={0.05}>
                    <div className="sola-card rounded-xl overflow-hidden">
                      <div className="px-4 py-3 border-b border-border/50 bg-[var(--surface-raised)]">
                        <h2 className="font-display text-lg font-semibold text-[var(--content-primary)]">{grupo.livroNome}</h2>
                      </div>
                      <div className="divide-y divide-border/30">
                        {Array.from(grupo.capitulos.entries()).map(([capitulo, lista]) => (
                          <div key={capitulo} className="px-4 py-2">
                            <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1">
                              Capítulo {capitulo}
                            </div>
                            <motion.div
                              initial="hidden"
                              animate="show"
                              variants={{ show: { transition: { staggerChildren: 0.02 } } }}
                              className="space-y-1"
                            >
                              {lista.map((oc) => (
                                <motion.button
                                  key={oc.versiculo}
                                  variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}
                                  onClick={() => irParaVersiculo(oc)}
                                  className="w-full text-left flex gap-3 px-2 py-2 rounded-lg hover:bg-muted/50 transition-all duration-200 group"
                                >
                                  <span className="text-xs font-semibold text-[var(--brand-default)] w-6 shrink-0 pt-0.5 group-hover:underline">
                                    {oc.versiculo}
                                  </span>
                                  <span className="text-sm text-[var(--content-secondary)] leading-relaxed flex-1 min-w-0">
                                    {destacar(oc.texto, debounced)}
                                  </span>
                                </motion.button>
                              ))}
                            </motion.div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </>
          )}
          </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
