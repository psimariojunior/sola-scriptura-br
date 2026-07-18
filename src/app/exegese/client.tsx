'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { TODOS_LIVROS, carregarTraducao } from '@/data/biblia';
import { palavrasOriginais } from '@/data/biblia';
import { doutrinas } from '@/data/biblia';
import ScrollReveal from '@/components/ScrollReveal';
import {
  Search,
  BookOpen,
  Globe,
  Languages,
  Crosshair,
  FileText,
  ChevronDown,
  Sparkles,
  ArrowRight,
  ChevronRight,
} from 'lucide-react';
import { getIntroducaoLivro } from '@/data/biblia/introducoes';
import dynamic from 'next/dynamic';
const PainelDoVersiculo = dynamic(() => import('@/components/PainelDoVersiculo'), {
  ssr: false,
  loading: () => <div className="animate-pulse h-64 bg-[var(--surface-sunken)] rounded-xl" />
});

type LivroData = Record<string, Record<number, string[]>>;

const generos: Record<string, { genero: string; desc: string; icone: string }> = {
  gn: { genero: 'Narrativa / Lei', desc: 'Cosmogonia e narrativa patriarcal', icone: '📖' },
  ex: { genero: 'Narrativa / Lei', desc: 'Narrativa histórica com códigos legais', icone: '📜' },
  lv: { genero: 'Lei', desc: 'Código sacerdotal e leis de pureza', icone: '⚖️' },
  nm: { genero: 'Narrativa / Lei', desc: 'Narrativa com censos e leis', icone: '📊' },
  dt: { genero: 'Discurso / Lei', desc: 'Discursos de Moisés e recapitulação da lei', icone: '🗣️' },
  js: { genero: 'Narrativa', desc: 'Narrativa histórica de conquista', icone: '⚔️' },
  jz: { genero: 'Narrativa', desc: 'Narrativa cíclica dos juízes', icone: '🏛️' },
  rt: { genero: 'Narrativa', desc: 'Novela histórica', icone: '🌾' },
  '1sm': { genero: 'Narrativa', desc: 'Narrativa histórica biográfica', icone: '👑' },
  '2sm': { genero: 'Narrativa', desc: 'Narrativa histórica biográfica', icone: '🎵' },
  '1rs': { genero: 'Narrativa', desc: 'Narrativa histórica dos reis', icone: '🏗️' },
  '2rs': { genero: 'Narrativa', desc: 'Narrativa histórica dos reis', icone: '🔥' },
  '1cr': { genero: 'Narrativa', desc: 'Crônicas genealógicas e históricas', icone: '📋' },
  '2cr': { genero: 'Narrativa', desc: 'Crônicas históricas', icone: '📋' },
  ed: { genero: 'Narrativa', desc: 'Memórias e listas pós-exílicas', icone: '🔨' },
  ne: { genero: 'Narrativa', desc: 'Memórias e listas pós-exílicas', icone: '🧱' },
  et: { genero: 'Narrativa', desc: 'Novela histórica', icone: '🎭' },
  'jó': { genero: 'Narrativa / Diálogo', desc: 'Diálogo poético-teológico sobre o sofrimento', icone: '💎' },
  sl: { genero: 'Poesia / Hinódia', desc: 'Coleção de hinos, orações e poemas litúrgicos', icone: '🎵' },
  pv: { genero: 'Sabedoria', desc: 'Provérbios e ditados sapienciais', icone: '🧠' },
  ec: { genero: 'Sabedoria', desc: 'Reflexão filosófico-teológica', icone: '🤔' },
  ct: { genero: 'Poesia', desc: 'Poesia de amor e alegoria nupcial', icone: '💕' },
  is: { genero: 'Profecia', desc: 'Oraculos proféticos de juízo e consolo', icone: '👁️' },
  jr: { genero: 'Profecia / Narrativa', desc: 'Oraculos proféticos com narrativa biográfica', icone: '😢' },
  lm: { genero: 'Poesia / Lamento', desc: 'Poemas de lamento pela queda de Jerusalém', icone: '💔' },
  ez: { genero: 'Profecia / Apocalíptico', desc: 'Visões proféticas e oráculos simbólicos', icone: '🔮' },
  dn: { genero: 'Apocalíptico / Narrativa', desc: 'Narrativa com visões apocalípticas', icone: '🦁' },
  os: { genero: 'Profecia', desc: 'Oraculos proféticos com simbolismo matrimonial', icone: '💍' },
  jl: { genero: 'Profecia', desc: 'Oraculos proféticos apocalípticos', icone: '🦗' },
  am: { genero: 'Profecia', desc: 'Oraculos proféticos de justiça social', icone: '⚖️' },
  ob: { genero: 'Profecia', desc: 'Oraculo profético contra Edom', icone: '🏔️' },
  jn: { genero: 'Narrativa / Profecia', desc: 'Narrativa profética com ironia divina', icone: '🐋' },
  mq: { genero: 'Profecia', desc: 'Oraculos proféticos de juízo e esperança', icone: '🌾' },
  na: { genero: 'Profecia', desc: 'Oraculo profético contra Nínive', icone: '🏚️' },
  hc: { genero: 'Profecia', desc: 'Diálogo profético sobre teodiceia', icone: '🤔' },
  sf: { genero: 'Profecia', desc: 'Oraculos proféticos de juízo universal', icone: '🌍' },
  ag: { genero: 'Profecia', desc: 'Oraculos proféticos sobre o Templo', icone: '🏗️' },
  zc: { genero: 'Profecia / Apocalíptico', desc: 'Visões apocalípticas e oráculos de restauração', icone: '👁️' },
  ml: { genero: 'Profecia', desc: 'Oraculos proféticos de acusação e promessa', icone: '📧' },
  mt: { genero: 'Evangelho', desc: 'Evangelho narrativo com discursos', icone: '📖' },
  mc: { genero: 'Evangelho', desc: 'Evangelho narrativo conciso', icone: '🏃' },
  lc: { genero: 'Evangelho', desc: 'Evangelho narrativo detalhado', icone: '👨‍⚕️' },
  jo: { genero: 'Evangelho', desc: 'Evangelho teológico com discursos', icone: '💡' },
  at: { genero: 'Narrativa', desc: 'História da igreja primitiva', icone: '🔥' },
  rm: { genero: 'Epístola', desc: 'Carta doutrinária e teológica', icone: '✉️' },
  '1co': { genero: 'Epístola', desc: 'Carta pastoral e corretiva', icone: '✉️' },
  '2co': { genero: 'Epístola', desc: 'Carta pastoral e apologética', icone: '✉️' },
  gl: { genero: 'Epístola', desc: 'Carta polêmica sobre a graça', icone: '✉️' },
  ef: { genero: 'Epístola', desc: 'Carta doutrinária sobre a igreja', icone: '✉️' },
  fp: { genero: 'Epístola', desc: 'Carta de gratidão e exortação', icone: '✉️' },
  cl: { genero: 'Epístola', desc: 'Carta cristológica e pastoral', icone: '✉️' },
  '1ts': { genero: 'Epístola', desc: 'Carta escatológica e pastoral', icone: '✉️' },
  '2ts': { genero: 'Epístola', desc: 'Carta escatológica corretiva', icone: '✉️' },
  '1tm': { genero: 'Epístola', desc: 'Carta pastoral a Timóteo', icone: '✉️' },
  '2tm': { genero: 'Epístola', desc: 'Carta pastoral testamentária', icone: '✉️' },
  tt: { genero: 'Epístola', desc: 'Carta pastoral a Tito', icone: '✉️' },
  fm: { genero: 'Epístola', desc: 'Carta pessoal de intercessão', icone: '✉️' },
  hb: { genero: 'Epístola / Homilia', desc: 'Homilia teológica sobre a superioridade de Cristo', icone: '✝️' },
  tg: { genero: 'Epístola', desc: 'Carta ético-pastoral', icone: '✉️' },
  '1pe': { genero: 'Epístola', desc: 'Carta de exortação na perseguição', icone: '✉️' },
  '2pe': { genero: 'Epístola', desc: 'Carta de advertência contra falsos mestres', icone: '✉️' },
  '1jo': { genero: 'Epístola', desc: 'Carta sobre comunhão e amor', icone: '❤️' },
  '2jo': { genero: 'Epístola', desc: 'Breve carta sobre a verdade', icone: '✉️' },
  '3jo': { genero: 'Epístola', desc: 'Breve carta de hospitalidade', icone: '✉️' },
  jd: { genero: 'Epístola', desc: 'Carta polêmica contra hereges', icone: '⚠️' },
  ap: { genero: 'Apocalíptico', desc: 'Visão profética apocalíptica', icone: '🔮' },
};

// Contexto histórico agora vem de getIntroducaoLivro em @/data/biblia/introducoes

// Contexto histórico via getIntroducaoLivro

type TabId = 'texto' | 'contexto' | 'palavras' | 'teologia';

const TRAD_IDS = ['arc', 'kjv', 'web'] as const;

const tradCores: Record<string, string> = {
  arc: 'from-blue-500 to-blue-600',
  kjv: 'from-amber-500 to-amber-600',
  web: 'from-emerald-500 to-emerald-600',
};

const tradBg: Record<string, string> = {
  arc: 'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800',
  kjv: 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800',
  web: 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800',
};

export function ExegeseClient() {
  const [livroAbrev, setLivroAbrev] = useState('');
  const [capituloNum, setCapituloNum] = useState<number | null>(null);
  const [data, setData] = useState<Record<string, LivroData>>({});
  const [carregando, setCarregando] = useState(true);
  const [tab, setTab] = useState<TabId>('texto');
  const [versiculoSelecionado, setVersiculoSelecionado] = useState<{livro: string, cap: number, ver: number} | null>(null);

  useEffect(() => {
    Promise.all(TRAD_IDS.map((t) => carregarTraducao(t))).then(
      (todos) => {
        const map: Record<string, LivroData> = {};
        TRAD_IDS.forEach((t, i) => { map[t] = todos[i]; });
        setData(map);
        setCarregando(false);
      }
    );
  }, []);

  const livro = useMemo(
    () => TODOS_LIVROS.find((l) => l.abreviacao === livroAbrev),
    [livroAbrev]
  );

  const totalCaps = livro?.totalCapitulos ?? 0;

  const textoMulti = useMemo(() => {
    if (!livroAbrev || capituloNum === null || Object.keys(data).length === 0) return [];
    return TRAD_IDS.map((t) => {
      const versiculos = data[t]?.[livroAbrev]?.[capituloNum];
      return { traducao: t, versiculos: versiculos ?? [] };
    });
  }, [livroAbrev, capituloNum, data]);

  const generoInfo = livroAbrev ? generos[livroAbrev] : null;
  const histInfo = useMemo(() => {
    if (!livroAbrev) return null;
    const intro = getIntroducaoLivro(livroAbrev);
    if (!intro) return null;
    return {
      periodo: intro.genero || '',
      autor: intro.autor,
      data: intro.data,
      local: intro.ocasio || '',
      publico: intro.destinatarios,
      proposito: intro.proposito,
      contextoPolitico: intro.contextoPolitico || '',
      contextoCultural: intro.contextoCultural || '',
      contextoReligioso: intro.contextoReligioso || '',
      fatosChave: intro.fatosChave || [],
    };
  }, [livroAbrev]);

  const palavrasRelacionadas = useMemo(() => {
    if (!livroAbrev) return [];
    const livroObj = TODOS_LIVROS.find((l) => l.abreviacao === livroAbrev);
    if (!livroObj) return [];
    const isNT = livroObj.testamento === 'NT';
    return palavrasOriginais
      .filter((p) => p.idioma === (isNT ? 'grego' : 'hebraico'))
      .slice(0, 10);
  }, [livroAbrev]);

  const doutrinasRelacionadas = useMemo(() => {
    if (!livroAbrev) return [];
    const refs = doutrinas.filter((d) =>
      d.passagens.some((p) => p.toLowerCase().startsWith(livroAbrev))
    );
    return refs.length > 0 ? refs : doutrinas.slice(0, 4);
  }, [livroAbrev]);

  const handleLimpar = useCallback(() => {
    setLivroAbrev('');
    setCapituloNum(null);
    setTab('texto');
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <ScrollReveal>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <Sparkles className="w-4 h-4" />
                Análise Profunda das Escrituras
              </div>
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-light mb-4">
                Exegese <span className="text-primary italic">Bíblica</span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Ferramenta interativa de análise contextual, gramatical e teológica — 
                estude as Escrituras com profundidade acadêmica
              </p>
            </div>
          </ScrollReveal>

          {carregando ? (
            <div className="glass-card p-16 text-center rounded-2xl">
              <div className="inline-flex gap-2">
                <span className="w-3 h-3 bg-primary rounded-full animate-bounce [animation-delay:0s]" />
                <span className="w-3 h-3 bg-primary rounded-full animate-bounce [animation-delay:0.15s]" />
                <span className="w-3 h-3 bg-primary rounded-full animate-bounce [animation-delay:0.3s]" />
              </div>
              <p className="text-sm text-muted-foreground mt-4">Carregando textos bíblicos...</p>
            </div>
          ) : (
            <>
              {/* Selector */}
              <ScrollReveal>
                <div className="glass-card p-6 rounded-2xl mb-8">
                  <div className="flex flex-wrap items-end gap-4">
                    <div className="flex-1 min-w-[200px]">
                      <label className="block text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">Livro</label>
                      <select
                        value={livroAbrev}
                        onChange={(e) => { setLivroAbrev(e.target.value); setCapituloNum(null); }}
                        className="w-full px-4 py-3 bg-background/50 border border-border/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                      >
                        <option value="">Selecionar livro...</option>
                        {TODOS_LIVROS.map((l) => (
                          <option key={l.abreviacao} value={l.abreviacao}>{l.nome}</option>
                        ))}
                      </select>
                    </div>

                    <div className="w-40">
                      <label className="block text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">Capítulo</label>
                      <select
                        value={capituloNum ?? ''}
                        onChange={(e) => setCapituloNum(e.target.value ? Number(e.target.value) : null)}
                        disabled={!livro}
                        className="w-full px-4 py-3 bg-background/50 border border-border/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all disabled:opacity-60"
                      >
                        <option value="">Selecionar...</option>
                        {Array.from({ length: totalCaps }, (_, i) => i + 1).map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>

                    {(livroAbrev || capituloNum !== null) && (
                      <button
                        onClick={handleLimpar}
                        className="px-4 py-3 text-xs border border-border/50 rounded-xl text-muted-foreground hover:bg-muted/50 transition-all"
                      >
                        Limpar
                      </button>
                    )}
                  </div>
                </div>
              </ScrollReveal>

              {!livroAbrev && (
                <ScrollReveal>
                  <div className="glass-card p-16 text-center rounded-2xl">
                    <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                      <Search className="w-10 h-10 text-primary/40" strokeWidth={1} />
                    </div>
                    <p className="font-display text-2xl text-muted-foreground mb-2">Selecione um livro e capítulo</p>
                    <p className="text-sm text-muted-foreground max-w-md mx-auto">
                      Escolha uma passagem bíblica acima para iniciar a análise exegética completa
                    </p>
                  </div>
                </ScrollReveal>
              )}

              {livroAbrev && capituloNum !== null && (
                <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-6">
                  <div>
                    {/* Tabs */}
                    <ScrollReveal>
                      <div className="glass-card p-1.5 mb-6 rounded-2xl">
                        <div className="flex">
                          {([
                            { id: 'texto' as TabId, label: 'Texto', icon: BookOpen },
                            { id: 'contexto' as TabId, label: 'Contexto', icon: Globe },
                            { id: 'palavras' as TabId, label: 'Palavras', icon: Languages },
                            { id: 'teologia' as TabId, label: 'Teologia', icon: Crosshair },
                          ]).map(({ id, label, icon: Icon }) => (
                            <button
                              key={id}
                              onClick={() => setTab(id)}
                              className={`flex-1 flex items-center justify-center gap-2 text-sm py-3 rounded-xl transition-all ${
                                tab === id
                                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                              }`}
                            >
                              <Icon className="w-4 h-4" strokeWidth={1.5} />
                              {label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </ScrollReveal>

                    {/* Tab Content */}
                    {tab === 'texto' && (
                      <div className="space-y-4">
                        {textoMulti.map(({ traducao, versiculos }, idx) => (
                          <ScrollReveal key={traducao} delay={idx * 100}>
                            <div className={`glass-card rounded-2xl overflow-hidden border ${tradBg[traducao]}`}>
                              <div className={`px-6 py-4 bg-gradient-to-r ${tradCores[traducao]}`}>
                                <div className="flex items-center gap-3">
                                  <span className="dark:text-white text-[var(--fg)] font-bold text-sm">{traducao.toUpperCase()}</span>
                                   <span className="dark:text-white/80 text-[var(--fg)]/80 text-sm">
                                    {livro?.nome} {capituloNum}
                                  </span>
                                </div>
                              </div>
                              <div className="p-6">
                                <div className="space-y-3">
                                  {versiculos.map((texto, i) => (
                                    <p key={i}
                                      className="font-serif-body text-base leading-relaxed cursor-pointer hover:bg-primary/5 rounded-lg px-2 -mx-2 py-1 transition-colors"
                                      onClick={() => setVersiculoSelecionado({ livro: livroAbrev, cap: capituloNum!, ver: i + 1 })}
                                    >
                                      <sup className="text-primary font-bold text-xs mr-1">{i + 1}</sup>
                                      {texto}
                                    </p>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </ScrollReveal>
                        ))}
                      </div>
                    )}

                    {tab === 'contexto' && (
                      <div className="space-y-4">
                        {generoInfo && (
                          <ScrollReveal>
                            <div className="glass-card p-6 rounded-2xl">
                              <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-2xl">
                                  {generoInfo.icone}
                                </div>
                                <div>
                                  <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">Gênero Literário</h3>
                                  <p className="text-xl font-display text-primary">{generoInfo.genero}</p>
                                </div>
                              </div>
                              <p className="text-muted-foreground">{generoInfo.desc}</p>
                            </div>
                          </ScrollReveal>
                        )}

                        {histInfo ? (
                          <ScrollReveal>
                            <div className="glass-card p-6 rounded-2xl">
                              <h3 className="font-semibold text-sm mb-4 flex items-center gap-2 text-muted-foreground uppercase tracking-wider">
                                <Globe className="w-4 h-4" strokeWidth={1.5} />
                                Contexto Histórico
                              </h3>
                              <div className="grid grid-cols-2 gap-4 mb-4">
                                <div className="p-3 bg-muted/30 rounded-xl">
                                  <span className="text-xs text-muted-foreground block mb-1">Período</span>
                                  <p className="text-sm font-semibold">{histInfo.periodo}</p>
                                </div>
                                <div className="p-3 bg-muted/30 rounded-xl">
                                  <span className="text-xs text-muted-foreground block mb-1">Autor</span>
                                  <p className="text-sm font-semibold">{histInfo.autor}</p>
                                </div>
                                <div className="p-3 bg-muted/30 rounded-xl">
                                  <span className="text-xs text-muted-foreground block mb-1">Data</span>
                                  <p className="text-sm font-semibold">{histInfo.data}</p>
                                </div>
                                <div className="p-3 bg-muted/30 rounded-xl">
                                  <span className="text-xs text-muted-foreground block mb-1">Local</span>
                                  <p className="text-sm font-semibold">{histInfo.local}</p>
                                </div>
                                <div className="p-3 bg-muted/30 rounded-xl">
                                  <span className="text-xs text-muted-foreground block mb-1">Público</span>
                                  <p className="text-sm font-semibold">{histInfo.publico}</p>
                                </div>
                              </div>
                              <div className="p-4 bg-primary/5 rounded-xl border border-primary/10 mb-4">
                                <span className="text-xs text-muted-foreground block mb-1">Propósito</span>
                                <p className="text-sm">{histInfo.proposito}</p>
                              </div>
                              <div className="space-y-3 mb-4">
                                <div className="p-3 bg-muted/30 rounded-xl">
                                  <span className="text-xs text-muted-foreground block mb-1">Contexto Político</span>
                                  <p className="text-sm">{histInfo.contextoPolitico}</p>
                                </div>
                                <div className="p-3 bg-muted/30 rounded-xl">
                                  <span className="text-xs text-muted-foreground block mb-1">Contexto Cultural</span>
                                  <p className="text-sm">{histInfo.contextoCultural}</p>
                                </div>
                                <div className="p-3 bg-muted/30 rounded-xl">
                                  <span className="text-xs text-muted-foreground block mb-1">Contexto Religioso</span>
                                  <p className="text-sm">{histInfo.contextoReligioso}</p>
                                </div>
                              </div>
                              {histInfo.fatosChave && histInfo.fatosChave.length > 0 && (
                                <div>
                                  <h4 className="font-semibold text-xs text-muted-foreground uppercase tracking-wider mb-3">Fatos Chave</h4>
                                  <ul className="space-y-2">
                                    {histInfo.fatosChave.map((fato, i) => (
                                      <li key={i} className="flex items-start gap-2 text-sm">
                                        <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                                        <span>{fato}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          </ScrollReveal>
                        ) : (
                          <ScrollReveal>
                            <div className="glass-card p-6 rounded-2xl">
                              <h3 className="font-semibold text-sm mb-2 flex items-center gap-2 text-muted-foreground uppercase tracking-wider">
                                <Globe className="w-4 h-4" strokeWidth={1.5} />
                                Contexto Histórico
                              </h3>
                              <p className="text-muted-foreground">Informações históricas detalhadas sendo preparadas para este livro.</p>
                            </div>
                          </ScrollReveal>
                        )}

                        {textoMulti[0]?.versiculos.length > 0 && (
                          <ScrollReveal>
                            <div className="glass-card p-6 rounded-2xl">
                              <h3 className="font-semibold text-sm mb-4 flex items-center gap-2 text-muted-foreground uppercase tracking-wider">
                                <BookOpen className="w-4 h-4" strokeWidth={1.5} />
                                Análise da Passagem
                              </h3>
                              <div className="grid grid-cols-3 gap-4">
                                <div className="p-4 bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl text-center">
                                  <p className="font-display text-3xl font-light text-primary">{textoMulti[0].versiculos.length}</p>
                                  <p className="text-xs text-muted-foreground mt-1">Versículos</p>
                                </div>
                                <div className="p-4 bg-gradient-to-br from-amber-500/5 to-amber-500/10 rounded-xl text-center">
                                  <p className="font-display text-3xl font-light text-amber-600">{capituloNum}</p>
                                  <p className="text-xs text-muted-foreground mt-1">Capítulo</p>
                                </div>
                                <div className="p-4 bg-gradient-to-br from-emerald-500/5 to-emerald-500/10 rounded-xl text-center">
                                  <p className="font-display text-3xl font-light text-emerald-600">{Math.round((capituloNum / totalCaps) * 100)}%</p>
                                  <p className="text-xs text-muted-foreground mt-1">Do Livro</p>
                                </div>
                              </div>
                            </div>
                          </ScrollReveal>
                        )}
                      </div>
                    )}

                    {tab === 'palavras' && (
                      <div className="space-y-4">
                        <ScrollReveal>
                          <div className="glass-card p-6 rounded-2xl">
                            <h3 className="font-semibold text-sm mb-4 flex items-center gap-2 text-muted-foreground uppercase tracking-wider">
                              <Languages className="w-4 h-4" strokeWidth={1.5} />
                              Palavras Originais
                            </h3>
                            <p className="text-xs text-muted-foreground mb-6">
                              Palavras-chave em {livro?.testamento === 'NT' ? 'grego' : 'hebraico'} relacionadas ao livro selecionado.
                            </p>
                            <div className="space-y-4">
                              {palavrasRelacionadas.length > 0 ? (
                                palavrasRelacionadas.map((p, i) => (
                                  <div key={i} className="p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors">
                                    <div className="flex items-start justify-between mb-2">
                                      <div>
                                        <p className="font-serif text-2xl text-primary">{p.palavra}</p>
                                        <p className="text-xs text-muted-foreground italic">{p.transliteracao}</p>
                                      </div>
                                      <span className="text-[10px] uppercase font-bold text-muted-foreground bg-background px-3 py-1 rounded-full">
                                        {p.strong}
                                      </span>
                                    </div>
                                    <p className="text-sm mt-2">{p.definicao}</p>
                                    {p.morfologia && (
                                      <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                                        {p.morfologia}
                                      </p>
                                    )}
                                  </div>
                                ))
                              ) : (
                                <p className="text-sm text-muted-foreground text-center py-8">Palavras originais em desenvolvimento para este livro.</p>
                              )}
                            </div>
                          </div>
                        </ScrollReveal>
                      </div>
                    )}

                    {tab === 'teologia' && (
                      <div className="space-y-4">
                        {doutrinasRelacionadas.length > 0 && (
                          <ScrollReveal>
                            <div className="glass-card p-6 rounded-2xl">
                              <h3 className="font-semibold text-sm mb-4 flex items-center gap-2 text-muted-foreground uppercase tracking-wider">
                                <Crosshair className="w-4 h-4" strokeWidth={1.5} />
                                Doutrinas Relacionadas
                              </h3>
                              <div className="space-y-4">
                                {doutrinasRelacionadas.map((d, i) => (
                                  <div key={i} className="p-4 bg-muted/30 rounded-xl">
                                    <div className="flex items-center gap-2 mb-2">
                                      <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">{d.categoria}</span>
                                    </div>
                                    <p className="font-semibold text-lg mb-1">{d.nome}</p>
                                    <p className="text-sm text-muted-foreground mb-3">{d.definicao}</p>
                                    <div className="flex flex-wrap gap-2">
                                      {d.passagens.map((ref, j) => (
                                        <span key={j} className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">{ref}</span>
                                      ))}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </ScrollReveal>
                        )}

                        <ScrollReveal>
                          <div className="glass-card p-6 rounded-2xl">
                            <h3 className="font-semibold text-sm mb-4 flex items-center gap-2 text-muted-foreground uppercase tracking-wider">
                              <BookOpen className="w-4 h-4" strokeWidth={1.5} />
                              Conexões Bíblicas
                            </h3>
                            <div className="space-y-3">
                              <div className="p-4 bg-gradient-to-r from-primary/5 to-transparent rounded-xl border-l-4 border-primary">
                                <p className="font-semibold text-sm mb-1">Aliança</p>
                                <p className="text-sm text-muted-foreground">O tema da aliança perpassa toda a Escritura, desde Abraão até a Nova Aliança em Cristo.</p>
                              </div>
                              <div className="p-4 bg-gradient-to-r from-amber-500/5 to-transparent rounded-xl border-l-4 border-amber-500">
                                <p className="font-semibold text-sm mb-1">Promessa e Cumprimento</p>
                                <p className="text-sm text-muted-foreground">As profecias e promessas do AT encontram cumprimento no NT.</p>
                              </div>
                              <div className="p-4 bg-gradient-to-r from-emerald-500/5 to-transparent rounded-xl border-l-4 border-emerald-500">
                                <p className="font-semibold text-sm mb-1">Tipo e Antítipo</p>
                                <p className="text-sm text-muted-foreground">Pessoas e eventos do AT (Moisés, Templo, cordeiro pascal) prefiguram Cristo.</p>
                              </div>
                            </div>
                          </div>
                        </ScrollReveal>
                      </div>
                    )}
                  </div>

                  {/* Sidebar */}
                  <aside className="space-y-4">
                    <ScrollReveal>
                      <div className="glass-card p-5 rounded-2xl">
                        <h3 className="font-semibold text-xs uppercase tracking-wider text-muted-foreground mb-4">Sobre o Livro</h3>
                        <div className="space-y-4">
                          <div className="p-3 bg-muted/30 rounded-xl">
                            <span className="text-xs text-muted-foreground block mb-1">Nome</span>
                            <p className="font-semibold">{livro?.nome}</p>
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div className="p-3 bg-muted/30 rounded-xl">
                              <span className="text-xs text-muted-foreground block mb-1">Abreviação</span>
                              <p className="font-mono text-sm font-semibold">{livro?.abreviacao}</p>
                            </div>
                            <div className="p-3 bg-muted/30 rounded-xl">
                              <span className="text-xs text-muted-foreground block mb-1">Testamento</span>
                              <p className="text-sm font-semibold">{livro?.testamento}</p>
                            </div>
                          </div>
                          <div className="p-3 bg-muted/30 rounded-xl">
                            <span className="text-xs text-muted-foreground block mb-1">Total de Capítulos</span>
                            <p className="font-semibold">{totalCaps}</p>
                          </div>
                          {generoInfo && (
                            <div className="p-3 bg-primary/5 rounded-xl border border-primary/20">
                              <span className="text-xs text-muted-foreground block mb-1">Gênero</span>
                              <p className="font-semibold text-primary">{generoInfo.genero}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </ScrollReveal>

                    <ScrollReveal delay={100}>
                      <div className="glass-card p-5 rounded-2xl">
                        <h3 className="font-semibold text-xs uppercase tracking-wider text-muted-foreground mb-3">Dica de Exegese</h3>
                        <div className="space-y-3 text-sm text-muted-foreground">
                          <div className="flex items-start gap-2">
                            <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center shrink-0 mt-0.5">1</span>
                            <p>Leia o capítulo em múltiplas traduções (ARC, KJV, WEB) para identificar nuances.</p>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center shrink-0 mt-0.5">2</span>
                            <p>Análise o contexto histórico e literário na aba &quot;Contexto&quot;.</p>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center shrink-0 mt-0.5">3</span>
                            <p>Estude as palavras-chave no original na aba &quot;Palavras&quot;.</p>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center shrink-0 mt-0.5">4</span>
                            <p>Identifique conexões teológicas na aba &quot;Teologia&quot;.</p>
                          </div>
                        </div>
                      </div>
                    </ScrollReveal>
                  </aside>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <PainelDoVersiculo
        livro={versiculoSelecionado?.livro ?? ''}
        capitulo={versiculoSelecionado?.cap ?? 1}
        versiculo={versiculoSelecionado?.ver ?? 1}
        aberto={versiculoSelecionado !== null}
        onFechar={() => setVersiculoSelecionado(null)}
      />
      <Footer />
    </div>
  );
}
