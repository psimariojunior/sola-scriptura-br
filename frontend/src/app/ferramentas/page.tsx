'use client';

import { useState } from 'react';
import { Cabeçalho } from '@/components/layout/cabecalho';
import { Rodapé } from '@/components/layout/rodape';
import { Search, Loader2, BookMarked, BookOpen, Languages } from 'lucide-react';

const API = process.env.NEXT_PUBLIC_API_URL || 'https://api-production-bb96.up.railway.app/api/v1';

const TABS = [
  { id: 'dicionario', label: 'Dicionário Bíblico', icone: BookMarked },
  { id: 'concordancia', label: 'Concordância', icone: BookOpen },
  { id: 'strong', label: 'Strong', icone: Languages },
];

interface DicionarioItem {
  id?: string;
  termo?: string;
  nome?: string;
  definicao?: string;
  definicaoCurta?: string;
  descricao?: string;
}

interface Ocorrencia {
  id?: string;
  texto?: string;
  livro?: { nome?: string } | string | null;
  capituloNumero?: number;
  capitulo?: number;
  numero?: number;
  versiculo?: number;
}

interface Palavra {
  id?: string;
  strong: string;
  palavraOriginal: string;
  transliteracao: string;
  pronuncia?: string | null;
  definicaoCurta: string;
  classeGramatical?: string | null;
  morfologia?: string | null;
}

export default function FerramentasPage() {
  const [tab, setTab] = useState('dicionario');

  const [qDic, setQDic] = useState('');
  const [dicResultados, setDicResultados] = useState<DicionarioItem[]>([]);
  const [dicBuscando, setDicBuscando] = useState(false);
  const [dicBuscou, setDicBuscou] = useState(false);
  const [dicErro, setDicErro] = useState('');

  const [qConc, setQConc] = useState('');
  const [concResultados, setConcResultados] = useState<Ocorrencia[]>([]);
  const [concBuscando, setConcBuscando] = useState(false);
  const [concBuscou, setConcBuscou] = useState(false);
  const [concErro, setConcErro] = useState('');

  const [qStrong, setQStrong] = useState('');
  const [grego, setGrego] = useState<Palavra[]>([]);
  const [hebraico, setHebraico] = useState<Palavra[]>([]);
  const [strongBuscando, setStrongBuscando] = useState(false);
  const [strongBuscou, setStrongBuscou] = useState(false);
  const [strongErro, setStrongErro] = useState('');

  async function buscarDicionario(e: React.FormEvent) {
    e.preventDefault();
    const q = qDic.trim();
    if (!q) return;
    setDicBuscando(true);
    setDicBuscou(true);
    setDicErro('');
    setDicResultados([]);
    try {
      const r = await fetch(`${API}/dicionario/buscar?q=${encodeURIComponent(q)}`);
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const d = await r.json();
      setDicResultados(Array.isArray(d) ? d : []);
    } catch {
      setDicErro('Não foi possível consultar o dicionário no momento.');
    } finally {
      setDicBuscando(false);
    }
  }

  async function buscarConcordancia(e: React.FormEvent) {
    e.preventDefault();
    const q = qConc.trim();
    if (!q) return;
    setConcBuscando(true);
    setConcBuscou(true);
    setConcErro('');
    setConcResultados([]);
    try {
      const r = await fetch(`${API}/biblia/pesquisar?q=${encodeURIComponent(q)}`);
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const d = await r.json();
      setConcResultados(Array.isArray(d) ? d : []);
    } catch {
      setConcErro('Não foi possível consultar a concordância no momento.');
    } finally {
      setConcBuscando(false);
    }
  }

  async function buscarStrong(e: React.FormEvent) {
    e.preventDefault();
    const q = qStrong.trim();
    if (!q) return;
    setStrongBuscando(true);
    setStrongBuscou(true);
    setStrongErro('');
    setGrego([]);
    setHebraico([]);
    try {
      const [g, h] = await Promise.allSettled([
        fetch(`${API}/grego/buscar?q=${encodeURIComponent(q)}`).then((r) => r.json()),
        fetch(`${API}/hebraico/buscar?q=${encodeURIComponent(q)}`).then((r) => r.json()),
      ]);
      if (g.status === 'fulfilled') setGrego(Array.isArray(g.value) ? g.value : []);
      if (h.status === 'fulfilled') setHebraico(Array.isArray(h.value) ? h.value : []);
      if (g.status === 'rejected' && h.status === 'rejected') {
        setStrongErro('Nenhuma palavra encontrada nas duas línguas.');
      }
    } catch {
      setStrongErro('Não foi possível consultar o léxico no momento.');
    } finally {
      setStrongBuscando(false);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Cabeçalho />
      <main className="pt-24">
        <div className="max-w-5xl mx-auto px-6 py-12">
          <div className="mb-10 max-w-3xl">
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-2">
              Instrumentos de Estudo
            </p>
            <h1 className="font-display text-5xl font-light text-foreground">Ferramentas</h1>
            <div className="ornamento w-32 mt-4" />
            <p className="font-serif-body text-lg text-muted-foreground mt-6 leading-relaxed">
              Dicionário bíblico, concordância e léxico de Strong — as ferramentas clássicas do
              estudo das Escrituras, reunidas para pesquisar palavras, termos e ocorrências em
              todo o cânon.
            </p>
          </div>

          <nav className="flex gap-1 mb-10 border-b border-border overflow-x-auto">
            {TABS.map((t) => {
              const Icone = t.icone;
              const ativo = tab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`inline-flex items-center gap-2 px-4 py-3 text-sm font-medium tracking-wide whitespace-nowrap border-b-2 transition-colors ${
                    ativo
                      ? 'border-primary text-primary'
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icone className="w-4 h-4" strokeWidth={1.5} />
                  {t.label}
                </button>
              );
            })}
          </nav>

          {tab === 'dicionario' && (
            <section>
              <form onSubmit={buscarDicionario} className="relative mb-8">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
                  strokeWidth={1.5}
                />
                <input
                  type="text"
                  value={qDic}
                  onChange={(e) => setQDic(e.target.value)}
                  placeholder="Buscar termo no dicionário (ex: aliança, altar, fariseu)..."
                  className="w-full pl-11 pr-28 py-4 bg-card border border-border text-base font-serif-body focus:outline-none focus:border-primary transition-colors"
                />
                <button
                  type="submit"
                  disabled={dicBuscando || !qDic.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-40"
                >
                  {dicBuscando ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Search className="w-3.5 h-3.5" strokeWidth={1.5} />
                  )}
                  Buscar
                </button>
              </form>

              {dicErro && (
                <p className="font-serif-body italic text-muted-foreground mb-6">{dicErro}</p>
              )}

              {dicBuscou && !dicBuscando && dicResultados.length === 0 && !dicErro && (
                <p className="font-serif-body italic text-muted-foreground text-center py-12">
                  Nenhum termo encontrado para &laquo;{qDic}&raquo;.
                </p>
              )}

              {dicResultados.length > 0 && (
                <div>
                  <p className="text-sm text-muted-foreground mb-4">
                    {dicResultados.length} {dicResultados.length === 1 ? 'resultado' : 'resultados'}
                  </p>
                  <div className="space-y-4">
                    {dicResultados.map((d, i) => (
                      <article key={d.id || i} className="sola-card p-6">
                        <h3 className="font-display text-xl font-semibold text-primary mb-2">
                          {d.termo || d.nome || '—'}
                        </h3>
                        <p className="font-serif-body text-sm text-foreground/80 leading-relaxed">
                          {d.definicao || d.definicaoCurta || d.descricao || 'Sem definição.'}
                        </p>
                      </article>
                    ))}
                  </div>
                </div>
              )}

              {!dicBuscou && !dicBuscando && (
                <div className="sola-card p-10 text-center">
                  <BookMarked className="w-8 h-8 mx-auto mb-4 text-primary/40" strokeWidth={1} />
                  <p className="font-serif-body text-muted-foreground">
                    Pesquise por termos, lugares, povos e objetos do mundo bíblico.
                  </p>
                </div>
              )}
            </section>
          )}

          {tab === 'concordancia' && (
            <section>
              <form onSubmit={buscarConcordancia} className="relative mb-8">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
                  strokeWidth={1.5}
                />
                <input
                  type="text"
                  value={qConc}
                  onChange={(e) => setQConc(e.target.value)}
                  placeholder="Buscar palavra ou frase em toda a Bíblia..."
                  className="w-full pl-11 pr-28 py-4 bg-card border border-border text-base font-serif-body focus:outline-none focus:border-primary transition-colors"
                />
                <button
                  type="submit"
                  disabled={concBuscando || !qConc.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-40"
                >
                  {concBuscando ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Search className="w-3.5 h-3.5" strokeWidth={1.5} />
                  )}
                  Buscar
                </button>
              </form>

              {concErro && (
                <p className="font-serif-body italic text-muted-foreground mb-6">{concErro}</p>
              )}

              {concBuscou && !concBuscando && concResultados.length === 0 && !concErro && (
                <p className="font-serif-body italic text-muted-foreground text-center py-12">
                  Nenhuma ocorrência de &laquo;{qConc}&raquo; encontrada.
                </p>
              )}

              {concResultados.length > 0 && (
                <div>
                  <p className="text-sm text-muted-foreground mb-4">
                    {concResultados.length} ocorrências
                  </p>
                  <div className="space-y-3">
                    {concResultados.map((o, i) => {
                      const nomeLivro =
                        typeof o.livro === 'string' ? o.livro : o.livro?.nome || '';
                      const cap = o.capituloNumero ?? o.capitulo ?? '';
                      const ver = o.numero ?? o.versiculo ?? '';
                      return (
                        <article key={o.id || i} className="sola-card p-5">
                          <p className="texto-sagrado text-foreground">{o.texto || '—'}</p>
                          <p className="text-xs tracking-widest uppercase text-muted-foreground mt-3">
                            <span style={{ color: 'hsl(var(--burgundy))' }}>
                              {nomeLivro} {cap}:{ver}
                            </span>
                          </p>
                        </article>
                      );
                    })}
                  </div>
                </div>
              )}

              {!concBuscou && !concBuscando && (
                <div className="sola-card p-10 text-center">
                  <BookOpen className="w-8 h-8 mx-auto mb-4 text-primary/40" strokeWidth={1} />
                  <p className="font-serif-body text-muted-foreground">
                    Encontre todas as ocorrências de uma palavra nas Escrituras.
                  </p>
                </div>
              )}
            </section>
          )}

          {tab === 'strong' && (
            <section>
              <form onSubmit={buscarStrong} className="relative mb-8">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
                  strokeWidth={1.5}
                />
                <input
                  type="text"
                  value={qStrong}
                  onChange={(e) => setQStrong(e.target.value)}
                  placeholder="Buscar por Strong ou transliteração (ex: G2424, H430, agape)..."
                  className="w-full pl-11 pr-28 py-4 bg-card border border-border text-base font-serif-body focus:outline-none focus:border-primary transition-colors"
                />
                <button
                  type="submit"
                  disabled={strongBuscando || !qStrong.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-40"
                >
                  {strongBuscando ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Search className="w-3.5 h-3.5" strokeWidth={1.5} />
                  )}
                  Buscar
                </button>
              </form>

              {strongErro && (
                <p className="font-serif-body italic text-muted-foreground mb-6">{strongErro}</p>
              )}

              {strongBuscou && !strongBuscando && grego.length === 0 && hebraico.length === 0 && !strongErro && (
                <p className="font-serif-body italic text-muted-foreground text-center py-12">
                  Nenhuma palavra encontrada para &laquo;{qStrong}&raquo; nas duas línguas.
                </p>
              )}

              {(grego.length > 0 || hebraico.length > 0) && (
                <div className="space-y-12">
                  {grego.length > 0 && (
                    <div>
                      <div className="flex items-center gap-4 mb-6">
                        <h2 className="font-display text-2xl font-medium text-primary whitespace-nowrap">
                          Grego Koiné
                        </h2>
                        <div className="flex-1 h-px bg-border/60" />
                        <span className="text-xs text-muted-foreground tabular-nums">
                          {grego.length} {grego.length === 1 ? 'palavra' : 'palavras'}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {grego.map((p, i) => (
                          <CardPalavra key={p.id || i} p={p} lingua="grego" />
                        ))}
                      </div>
                    </div>
                  )}

                  {hebraico.length > 0 && (
                    <div>
                      <div className="flex items-center gap-4 mb-6">
                        <h2 className="font-display text-2xl font-medium text-primary whitespace-nowrap">
                          Hebraico Bíblico
                        </h2>
                        <div className="flex-1 h-px bg-border/60" />
                        <span className="text-xs text-muted-foreground tabular-nums">
                          {hebraico.length} {hebraico.length === 1 ? 'palavra' : 'palavras'}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {hebraico.map((p, i) => (
                          <CardPalavra key={p.id || i} p={p} lingua="hebraico" />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {!strongBuscou && !strongBuscando && (
                <div className="sola-card p-10 text-center">
                  <Languages className="w-8 h-8 mx-auto mb-4 text-primary/40" strokeWidth={1} />
                  <p className="font-serif-body text-muted-foreground">
                    Pesquise lexemas do grego e do hebraico pelo número de Strong ou pela
                    transliteração.
                  </p>
                </div>
              )}
            </section>
          )}
        </div>
      </main>
      <Rodapé />
    </div>
  );
}

function CardPalavra({ p, lingua }: { p: Palavra; lingua: 'grego' | 'hebraico' }) {
  return (
    <article className="sola-card p-5">
      <div className="flex items-start justify-between gap-4 mb-3">
        <span
          className={`text-2xl leading-none ${lingua === 'grego' ? 'font-grego' : 'font-hebraico'}`}
          dir={lingua === 'hebraico' ? 'rtl' : 'ltr'}
          style={{ color: 'hsl(var(--primary))' }}
        >
          {p.palavraOriginal}
        </span>
        <span className="strong-ref text-xs font-medium tracking-wide whitespace-nowrap">
          {p.strong}
        </span>
      </div>
      <p className="font-display text-lg italic text-foreground mb-1">{p.transliteracao}</p>
      {p.pronuncia && <p className="text-xs text-muted-foreground mb-2">[{p.pronuncia}]</p>}
      <p className="font-serif-body text-sm text-foreground/80 leading-relaxed mb-3">
        {p.definicaoCurta}
      </p>
      <p className="text-xs tracking-widest uppercase text-muted-foreground pt-3 border-t border-border/40">
        {p.classeGramatical || p.morfologia || '—'}
      </p>
    </article>
  );
}
