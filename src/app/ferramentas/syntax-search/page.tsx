'use client';

import { useState, useMemo, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Filter, BookOpen, ChevronDown, Languages, ExternalLink, Loader2, ChevronRight } from 'lucide-react';
import type { PalavraGrega } from '@/data/lexicon/grego';
import type { OcorrenciaCorpus } from '@/data/biblia/strong';
import { TODOS_LIVROS } from '@/data/biblia/livros';
import { useRouter } from 'next/navigation';

interface ResultadoBusca {
  palavra: PalavraGrega;
}

type ModoBusca = 'lexico' | 'corpus';

function refParaLabelCorpus(ref: string): { livro: string; capitulo: number; versiculo: number; label: string } {
  const [abrev, capStr, verStr] = ref.split(':');
  const livroObj = TODOS_LIVROS.find((l) => l.abreviacao === abrev);
  const capitulo = Number(capStr);
  const versiculo = Number(verStr);
  return { livro: abrev, capitulo, versiculo, label: `${livroObj?.nome ?? abrev.toUpperCase()} ${capitulo}:${versiculo}` };
}

// Chips de padrão gramatical para a busca no corpus real (STRONG_CODES).
// Os termos batem literalmente (case-insensitive) contra o rótulo morfológico
// já presente em cada ocorrência do corpus interlinear.
const GREGO_CATEGORIAS = ['verbo', 'substantivo', 'adjetivo', 'artigo', 'pronome', 'advérbio', 'preposição', 'conjunção', 'partícula'];
const GREGO_TEMPOS_CORPUS = ['presente', 'aoristo', 'perfeito', 'imperfeito', 'futuro'];
const GREGO_VOZES_CORPUS = ['ativo', 'passivo', 'médio'];
const GREGO_MODOS_CORPUS = ['indicativo', 'subjuntivo', 'imperativo', 'infinitivo', 'particípio', 'optativo'];
const GREGO_CASOS_CORPUS = [
  { valor: 'nom', label: 'Nominativo' },
  { valor: 'gen', label: 'Genitivo' },
  { valor: 'dat', label: 'Dativo' },
  { valor: 'acc', label: 'Acusativo' },
  { valor: 'voc', label: 'Vocativo' },
];

const HEBRAICO_TEMAS_CORPUS = ['Qal', 'Niphal', 'Piel', 'Pual', 'Hiphil', 'Hophal', 'Hithpael', 'Hithpolel', 'Poel', 'Poal', 'Pilpel'];
const HEBRAICO_CONJ_CORPUS = ['perfecto', 'imperfecto', 'particípio', 'infinitivo', 'jussivo', 'imperativo'];
const HEBRAICO_CATEGORIAS = ['verbo', 'substantivo', 'adjetivo', 'artigo', 'pronome', 'advérbio', 'preposição', 'conjunção', 'partícula', 'sufixo'];

const CATEGORIAS = [
  { valor: 'todos', label: 'Todos' },
  { valor: 'substantivo', label: 'Substantivos' },
  { valor: 'verbo', label: 'Verbos' },
  { valor: 'adjetivo', label: 'Adjetivos' },
  { valor: 'advérbio', label: 'Advérbios' },
  { valor: 'preposição', label: 'Preposições' },
  { valor: 'conjunção', label: 'Conjunções' },
  { valor: 'pronome', label: 'Pronomes' },
  { valor: 'partícula', label: 'Partículas' },
  { valor: 'numeral', label: 'Numerais' },
  { valor: 'interjeição', label: 'Interjeições' },
];

function extrairMorfologia(morf: string): {
  tempo?: string;
  voz?: string;
  pessoa?: string;
  numero?: string;
  genero?: string;
  caso?: string;
} {
  const p = morf.toLowerCase();
  const result: ReturnType<typeof extrairMorfologia> = {};

  if (p.includes('presente')) result.tempo = 'presente';
  else if (p.includes('aoristo')) result.tempo = 'aoristo';
  else if (p.includes('perfeito')) result.tempo = 'perfeito';
  else if (p.includes('imperfeito')) result.tempo = 'imperfeito';
  else if (p.includes('futuro')) result.tempo = 'futuro';

  if (p.includes('ativo')) result.voz = 'ativo';
  else if (p.includes('passivo')) result.voz = 'passivo';
  else if (p.includes('medio')) result.voz = 'médio';
  else if (p.includes('média')) result.voz = 'médio';

  if (p.includes('1ª pessoa') || p.includes('1st person')) result.pessoa = '1ª pessoa';
  else if (p.includes('2ª pessoa') || p.includes('2nd person')) result.pessoa = '2ª pessoa';
  else if (p.includes('3ª pessoa') || p.includes('3rd person')) result.pessoa = '3ª pessoa';

  if (p.includes('singular')) result.numero = 'singular';
  else if (p.includes('plural')) result.numero = 'plural';

  if (p.includes('masculino')) result.genero = 'masculino';
  else if (p.includes('feminino')) result.genero = 'feminino';
  else if (p.includes('neutro')) result.genero = 'neutro';

  if (p.includes('nominativo')) result.caso = 'nominativo';
  else if (p.includes('genitivo')) result.caso = 'genitivo';
  else if (p.includes('dativo')) result.caso = 'dativo';
  else if (p.includes('acusativo')) result.caso = 'acusativo';
  else if (p.includes('vocativo')) result.caso = 'vocativo';

  return result;
}

const TEMPOS = [
  { valor: 'presente', label: 'Presente' },
  { valor: 'aoristo', label: 'Aoristo' },
  { valor: 'perfeito', label: 'Perfeito' },
  { valor: 'imperfeito', label: 'Imperfeito' },
  { valor: 'futuro', label: 'Futuro' },
];

const VOZES = [
  { valor: 'ativo', label: 'Ativo' },
  { valor: 'passivo', label: 'Passivo' },
  { valor: 'médio', label: 'Médio' },
];

export default function SyntaxSearchPage() {
  const router = useRouter();
  const [modo, setModo] = useState<ModoBusca>('lexico');

  // ─── Modo "Busca no Corpus" (padrão gramatical real, não o léxico) ──────
  const [idiomaCorpus, setIdiomaCorpus] = useState<'grego' | 'hebraico'>('grego');
  const [termosCorpus, setTermosCorpus] = useState<string[]>([]);
  const [buscandoCorpus, setBuscandoCorpus] = useState(false);
  const [buscouCorpus, setBuscouCorpus] = useState(false);
  const [resultadosCorpus, setResultadosCorpus] = useState<OcorrenciaCorpus[]>([]);
  const [totalCorpus, setTotalCorpus] = useState(0);

  const alternarTermoCorpus = (termo: string) => {
    setTermosCorpus((atual) =>
      atual.includes(termo) ? atual.filter((t) => t !== termo) : [...atual, termo]
    );
  };

  useEffect(() => {
    setTermosCorpus([]);
    setBuscouCorpus(false);
  }, [idiomaCorpus]);

  const buscarCorpus = async () => {
    setBuscandoCorpus(true);
    setBuscouCorpus(true);
    const mod = await import('@/data/biblia/strong');
    const { total, ocorrencias } = await mod.buscarPadraoMorfologico({
      idioma: idiomaCorpus,
      morfologiaContem: termosCorpus,
    }, 300);
    setTotalCorpus(total);
    setResultadosCorpus(ocorrencias);
    setBuscandoCorpus(false);
  };

  const irParaVersiculoCorpus = (ref: string) => {
    const { livro, capitulo, versiculo } = refParaLabelCorpus(ref);
    router.push(`/biblia?livro=${livro}&capitulo=${capitulo}&versiculo=${versiculo}`);
  };

  const [categoria, setCategoria] = useState('todos');
  const [tempo, setTempo] = useState<string | null>(null);
  const [voz, setVoz] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [resultados, setResultados] = useState<ResultadoBusca[]>([]);
  const [buscou, setBuscou] = useState(false);
  const [ordenarPor, setOrdenarPor] = useState<'frequencia' | 'alfa'>('frequencia');
  const [gregoData, setGregoData] = useState<PalavraGrega[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    import('@/data/lexicon/grego').then(mod => {
      setGregoData(mod.GREGO);
      setCarregando(false);
    });
  }, []);

  const buscar = useMemo(() => {
    return () => {
      const results: ResultadoBusca[] = [];
      const queryLower = query.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

      for (const palavra of gregoData) {
        if (categoria !== 'todos' && palavra.categoria !== categoria) continue;

        const morf = extrairMorfologia(palavra.morphologia);

        if (tempo && morf.tempo !== tempo) continue;
        if (voz && morf.voz !== voz) continue;

        if (queryLower) {
          const termos = [palavra.palavra, palavra.transliteracao, palavra.definicao, palavra.strong, palavra.morphologia];
          const match = termos.some(t =>
            t?.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(queryLower)
          );
          if (!match) continue;
        }

        results.push({ palavra });
      }

      results.sort((a, b) => {
        if (ordenarPor === 'frequencia') return (b.palavra.frequencia || 0) - (a.palavra.frequencia || 0);
        return a.palavra.palavra.localeCompare(b.palavra.palavra);
      });

      setResultados(results.slice(0, 200));
      setBuscou(true);
    };
  }, [categoria, tempo, voz, query, ordenarPor, gregoData]);

  const estatisticas = useMemo(() => {
    const cats: Record<string, number> = {};
    for (const p of gregoData) {
      cats[p.categoria] = (cats[p.categoria] || 0) + 1;
    }
    return cats;
  }, [gregoData]);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20 pb-16">
        <ScrollReveal>
          <div className="max-w-5xl mx-auto px-6 mb-8">
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center mx-auto mb-6"
              >
                <Languages className="w-8 h-8 text-blue-500" />
              </motion.div>
              <h1 className="font-display text-4xl md:text-5xl font-light mb-4">
                Syntax <span className="italic text-primary">Search</span>
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {modo === 'lexico'
                  ? 'Busca morfológica avançada no léxico grego do Novo Testamento. Filtre por categoria, tempo verbal, voz e mais.'
                  : 'Busca por padrão gramatical real no corpus interlinear (grego e hebraico) — não no léxico, mas nas ocorrências de fato atestadas em cada versículo.'}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                {carregando ? '...' : gregoData.length.toLocaleString()} palavras gregas indexadas no léxico · corpus interlinear com ~31 mil versículos
              </p>
              <div className="ornament w-16 mx-auto mt-6" />
            </div>

            <div className="flex gap-2 justify-center">
              <button
                onClick={() => setModo('lexico')}
                className={`px-4 py-2 text-sm font-medium rounded-xl border transition-all duration-300 flex items-center gap-2 ${
                  modo === 'lexico'
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'border-border text-muted-foreground hover:text-foreground hover:border-foreground/30'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                Léxico (grego)
              </button>
              <button
                onClick={() => setModo('corpus')}
                className={`px-4 py-2 text-sm font-medium rounded-xl border transition-all duration-300 flex items-center gap-2 ${
                  modo === 'corpus'
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'border-border text-muted-foreground hover:text-foreground hover:border-foreground/30'
                }`}
              >
                <Filter className="w-4 h-4" />
                Busca no corpus (grego + hebraico)
              </button>
            </div>
          </div>
        </ScrollReveal>

        {modo === 'corpus' && (
          <div className="max-w-5xl mx-auto px-6">
            <ScrollReveal delay={0.1}>
              <div className="sola-card rounded-xl p-6 mb-6">
                <div className="mb-4">
                  <label className="text-xs font-medium text-muted-foreground mb-2 block">Idioma</label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setIdiomaCorpus('grego')}
                      className={`px-3 py-1.5 text-xs rounded-full border transition-all ${
                        idiomaCorpus === 'grego' ? 'bg-primary/20 text-primary font-medium border-primary/30' : 'border-border text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      Grego (NT)
                    </button>
                    <button
                      onClick={() => setIdiomaCorpus('hebraico')}
                      className={`px-3 py-1.5 text-xs rounded-full border transition-all ${
                        idiomaCorpus === 'hebraico' ? 'bg-primary/20 text-primary font-medium border-primary/30' : 'border-border text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      Hebraico (AT)
                    </button>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="text-xs font-medium text-muted-foreground mb-2 block">Categoria gramatical</label>
                  <div className="flex flex-wrap gap-2">
                    {(idiomaCorpus === 'grego' ? GREGO_CATEGORIAS : HEBRAICO_CATEGORIAS).map((c) => (
                      <button
                        key={c}
                        onClick={() => alternarTermoCorpus(c)}
                        className={`px-2.5 py-1 text-xs rounded-full border transition-all capitalize ${
                          termosCorpus.includes(c) ? 'bg-primary/20 text-primary font-medium border-primary/30' : 'border-border text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                {idiomaCorpus === 'grego' ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <label className="text-xs font-medium text-muted-foreground mb-2 block">Tempo</label>
                        <div className="flex flex-wrap gap-1.5">
                          {GREGO_TEMPOS_CORPUS.map((v) => (
                            <button key={v} onClick={() => alternarTermoCorpus(v)}
                              className={`px-2 py-1 text-[11px] rounded-full border transition-all capitalize ${
                                termosCorpus.includes(v) ? 'bg-primary/20 text-primary font-medium border-primary/30' : 'border-border text-muted-foreground hover:text-foreground'
                              }`}>
                              {v}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-muted-foreground mb-2 block">Voz</label>
                        <div className="flex flex-wrap gap-1.5">
                          {GREGO_VOZES_CORPUS.map((v) => (
                            <button key={v} onClick={() => alternarTermoCorpus(v)}
                              className={`px-2 py-1 text-[11px] rounded-full border transition-all capitalize ${
                                termosCorpus.includes(v) ? 'bg-primary/20 text-primary font-medium border-primary/30' : 'border-border text-muted-foreground hover:text-foreground'
                              }`}>
                              {v}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-muted-foreground mb-2 block">Modo</label>
                        <div className="flex flex-wrap gap-1.5">
                          {GREGO_MODOS_CORPUS.map((v) => (
                            <button key={v} onClick={() => alternarTermoCorpus(v)}
                              className={`px-2 py-1 text-[11px] rounded-full border transition-all capitalize ${
                                termosCorpus.includes(v) ? 'bg-primary/20 text-primary font-medium border-primary/30' : 'border-border text-muted-foreground hover:text-foreground'
                              }`}>
                              {v}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="text-xs font-medium text-muted-foreground mb-2 block">Caso</label>
                      <div className="flex flex-wrap gap-1.5">
                        {GREGO_CASOS_CORPUS.map((c) => (
                          <button key={c.valor} onClick={() => alternarTermoCorpus(c.valor)}
                            className={`px-2 py-1 text-[11px] rounded-full border transition-all ${
                              termosCorpus.includes(c.valor) ? 'bg-primary/20 text-primary font-medium border-primary/30' : 'border-border text-muted-foreground hover:text-foreground'
                            }`}>
                            {c.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="text-xs font-medium text-muted-foreground mb-2 block">Tema verbal (binyan)</label>
                      <div className="flex flex-wrap gap-1.5">
                        {HEBRAICO_TEMAS_CORPUS.map((v) => (
                          <button key={v} onClick={() => alternarTermoCorpus(v)}
                            className={`px-2 py-1 text-[11px] rounded-full border transition-all ${
                              termosCorpus.includes(v) ? 'bg-primary/20 text-primary font-medium border-primary/30' : 'border-border text-muted-foreground hover:text-foreground'
                            }`}>
                            {v}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground mb-2 block">Conjugação</label>
                      <div className="flex flex-wrap gap-1.5">
                        {HEBRAICO_CONJ_CORPUS.map((v) => (
                          <button key={v} onClick={() => alternarTermoCorpus(v)}
                            className={`px-2 py-1 text-[11px] rounded-full border transition-all capitalize ${
                              termosCorpus.includes(v) ? 'bg-primary/20 text-primary font-medium border-primary/30' : 'border-border text-muted-foreground hover:text-foreground'
                            }`}>
                            {v}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <div className="flex flex-wrap gap-1.5">
                    {termosCorpus.map((t) => (
                      <span key={t} className="text-[10px] px-2 py-0.5 rounded bg-primary/10 text-primary font-medium capitalize">{t}</span>
                    ))}
                    {termosCorpus.length === 0 && (
                      <span className="text-xs text-muted-foreground">Nenhum filtro selecionado — a busca trará uma amostra do idioma.</span>
                    )}
                  </div>
                  <button
                    onClick={buscarCorpus}
                    disabled={buscandoCorpus}
                    className="px-4 py-2 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-60 flex items-center gap-2"
                  >
                    {buscandoCorpus && <Loader2 className="w-4 h-4 animate-spin" />}
                    Buscar no corpus
                  </button>
                </div>
              </div>
            </ScrollReveal>

            {buscouCorpus && (
              <ScrollReveal delay={0.15}>
                {buscandoCorpus ? (
                  <div className="flex items-center justify-center py-16 gap-2 text-muted-foreground">
                    <Loader2 className="w-5 h-5 animate-spin text-primary" />
                    <span>Varrendo o corpus interlinear...</span>
                  </div>
                ) : (
                  <>
                    <p className="text-sm text-muted-foreground mb-4">
                      {totalCorpus.toLocaleString()} ocorrência{totalCorpus !== 1 ? 's' : ''} encontrada{totalCorpus !== 1 ? 's' : ''} no corpus
                      {resultadosCorpus.length < totalCorpus && ` (mostrando as primeiras ${resultadosCorpus.length})`}
                    </p>
                    {resultadosCorpus.length === 0 ? (
                      <div className="text-center py-12">
                        <Filter className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                        <p className="text-muted-foreground">Nenhuma ocorrência encontrada com este padrão gramatical.</p>
                      </div>
                    ) : (
                      <div className="sola-card rounded-xl overflow-hidden">
                        <div className="divide-y divide-border/30">
                          {resultadosCorpus.map((oc, i) => (
                            <button
                              key={`${oc.ref}-${i}`}
                              onClick={() => irParaVersiculoCorpus(oc.ref)}
                              className="w-full text-left flex items-start justify-between gap-3 px-4 py-3 hover:bg-muted/50 transition-all duration-200 group"
                            >
                              <div className="min-w-0">
                                <div className="flex items-center gap-2 mb-1 flex-wrap">
                                  <span className="font-serif text-lg">{oc.palavra || '—'}</span>
                                  <span className="text-xs text-muted-foreground font-mono">{oc.strong}</span>
                                  <span className="text-xs text-muted-foreground group-hover:text-primary group-hover:underline">
                                    {refParaLabelCorpus(oc.ref).label}
                                  </span>
                                </div>
                                <p className="text-xs text-muted-foreground italic">{oc.transliteracao}</p>
                                <p className="text-xs text-muted-foreground mt-1">{oc.morfologia}</p>
                              </div>
                              <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0 mt-1" />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </ScrollReveal>
            )}
          </div>
        )}

        {modo === 'lexico' && (
        <div className="max-w-5xl mx-auto px-6">
          {carregando ? (
            <div className="text-center py-16">
              <div className="inline-flex gap-2">
                <span className="w-3 h-3 bg-primary rounded-full animate-bounce [animation-delay:0s]" />
                <span className="w-3 h-3 bg-primary rounded-full animate-bounce [animation-delay:0.15s]" />
                <span className="w-3 h-3 bg-primary rounded-full animate-bounce [animation-delay:0.3s]" />
              </div>
              <p className="text-sm text-muted-foreground mt-4">Carregando léxico grego...</p>
            </div>
          ) : (
          <>
          <ScrollReveal delay={0.1}>
            <div className="sola-card rounded-xl p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-2 block">Categoria Morfológica</label>
                  <select value={categoria} onChange={e => setCategoria(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-transparent border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20">
                    {CATEGORIAS.map(c => (
                      <option key={c.valor} value={c.valor}>{c.label} {c.valor !== 'todos' && estatisticas[c.valor] ? `(${estatisticas[c.valor]})` : ''}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-2 block">Ordenar por</label>
                  <select value={ordenarPor} onChange={e => setOrdenarPor(e.target.value as typeof ordenarPor)}
                    className="w-full px-3 py-2 text-sm bg-transparent border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20">
                    <option value="frequencia">Frequência (mais usadas primeiro)</option>
                    <option value="alfa">Alfabético</option>
                  </select>
                </div>
              </div>

              {(categoria === 'verbo' || categoria === 'todos') && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-2 block">Tempo Verbal</label>
                    <div className="flex flex-wrap gap-2">
                      <button onClick={() => setTempo(null)}
                        className={`px-2.5 py-1 text-xs rounded-full border transition-all ${
                          !tempo ? 'bg-primary/20 text-primary font-medium border-primary/30' : 'border-border text-muted-foreground hover:text-foreground'
                        }`}>
                        Todos
                      </button>
                      {TEMPOS.map(t => (
                        <button key={t.valor} onClick={() => setTempo(t.valor)}
                          className={`px-2.5 py-1 text-xs rounded-full border transition-all ${
                            tempo === t.valor ? 'bg-primary/20 text-primary font-medium border-primary/30' : 'border-border text-muted-foreground hover:text-foreground'
                          }`}>
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-2 block">Voz</label>
                    <div className="flex flex-wrap gap-2">
                      <button onClick={() => setVoz(null)}
                        className={`px-2.5 py-1 text-xs rounded-full border transition-all ${
                          !voz ? 'bg-primary/20 text-primary font-medium border-primary/30' : 'border-border text-muted-foreground hover:text-foreground'
                        }`}>
                        Todas
                      </button>
                      {VOZES.map(v => (
                        <button key={v.valor} onClick={() => setVoz(v.valor)}
                          className={`px-2.5 py-1 text-xs rounded-full border transition-all ${
                            voz === v.valor ? 'bg-primary/20 text-primary font-medium border-primary/30' : 'border-border text-muted-foreground hover:text-foreground'
                          }`}>
                          {v.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input type="text" value={query} onChange={e => setQuery(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && buscar()}
                    placeholder="Buscar palavra, transliteração, Strong's ou definição..."
                    className="w-full pl-9 pr-3 py-2 text-sm bg-transparent border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300" />
                  {query && (
                    <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-muted/50">
                      <X className="w-3.5 h-3.5 text-muted-foreground" />
                    </button>
                  )}
                </div>
                <button onClick={buscar}
                  className="px-4 py-2 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                  Buscar
                </button>
              </div>
            </div>
          </ScrollReveal>

          {buscou && (
            <ScrollReveal delay={0.2}>
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  {resultados.length.toLocaleString()} resultados encontrados
                </p>
                <div className="flex gap-1 text-[10px]">
                  <span className="px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                    {resultados.filter(r => r.palavra.categoria === 'verbo').length} verbos
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
                    {resultados.filter(r => r.palavra.categoria === 'substantivo').length} substantivos
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300">
                    {resultados.filter(r => r.palavra.categoria === 'adjetivo').length} adjetivos
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {resultados.map((r, i) => (
                  <motion.div key={`${r.palavra.strong}-${i}`}
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: Math.min(i * 0.02, 0.5) }}
                    className="sola-card rounded-xl p-4 hover:border-primary/30 transition-all">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-display text-lg">{r.palavra.palavra}</span>
                          <span className="text-xs text-muted-foreground font-mono">{r.palavra.strong}</span>
                        </div>
                        <p className="text-sm text-muted-foreground italic mb-2">{r.palavra.transliteracao}</p>
                        <p className="text-sm text-[var(--content-primary)] mb-2 line-clamp-2">{r.palavra.definicaoResumida || r.palavra.definicao}</p>
                        <div className="flex flex-wrap gap-1.5">
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 font-medium">
                            {r.palavra.categoria}
                          </span>
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300">
                            {r.palavra.morphologia}
                          </span>
                          {r.palavra.frequencia && r.palavra.frequencia > 1 && (
                            <span className="text-[9px] px-1.5 py-0.5 rounded bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300">
                              {r.palavra.frequencia}x
                            </span>
                          )}
                        </div>
                      </div>
                      {r.palavra.versiculos.length > 0 && (
                        <div className="shrink-0">
                          <a href={`/biblia/${r.palavra.versiculos[0].toLowerCase().replace(/ /g, ':')}`}
                            className="text-muted-foreground hover:text-primary transition-colors" target="_blank" rel="noreferrer">
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>
                      )}
                    </div>
                    {r.palavra.versiculos.length > 0 && (
                      <div className="mt-2 pt-2 border-t border-border/30">
                        <p className="text-[10px] text-muted-foreground">
                          Usado em: {r.palavra.versiculos.slice(0, 4).join(', ')}{r.palavra.versiculos.length > 4 ? ` +${r.palavra.versiculos.length - 4} mais` : ''}
                        </p>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              {resultados.length === 0 && (
                <div className="text-center py-12">
                  <Filter className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                  <p className="text-muted-foreground">Nenhum resultado encontrado com estes filtros.</p>
                </div>
              )}
            </ScrollReveal>
          )}

          {!buscou && (
            <ScrollReveal delay={0.2}>
              <div className="text-center py-12">
                <Languages className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-muted-foreground text-sm">Configure os filtros e clique em Buscar para explorar o léxico grego.</p>
                <div className="flex flex-wrap gap-2 justify-center mt-4">
                  {['ἀγαπάω', 'λόγος', 'πίστις', 'χάρις'].map(palavra => (
                    <button key={palavra} onClick={() => { setQuery(palavra); }}
                      className="text-xs px-3 py-1.5 rounded-full border border-border hover:bg-muted/50 transition-all">
                      {palavra}
                    </button>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          )}
          </>
          )}
        </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
