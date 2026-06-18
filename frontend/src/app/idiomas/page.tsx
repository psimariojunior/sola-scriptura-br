'use client';

import { useState, useEffect } from 'react';
import { Cabeçalho } from '@/components/layout/cabecalho';
import { Rodapé } from '@/components/layout/rodape';
import { Search, Loader2, BookOpen } from 'lucide-react';

const API = process.env.NEXT_PUBLIC_API_URL || 'https://api-production-bb96.up.railway.app/api/v1';

interface Palavra {
  id: string;
  strong: string;
  palavraOriginal: string;
  lemma?: string;
  transliteracao: string;
  pronuncia?: string;
  definicaoCurta: string;
  definicaoCompleta?: string;
  morfologia?: string;
  classeGramatical?: string;
  frequenciaAT?: number | null;
  frequenciaNT?: number | null;
  ocorrencias?: number | null;
}

function frequencia(p: Palavra, lingua: 'grego' | 'hebraico'): number | null {
  if (lingua === 'grego') return p.frequenciaNT ?? p.ocorrencias ?? null;
  return p.frequenciaAT ?? p.ocorrencias ?? null;
}

function CardPalavra({ p, lingua, onStrong }: { p: Palavra; lingua: 'grego' | 'hebraico'; onStrong: (s: string) => void }) {
  const freq = frequencia(p, lingua);
  return (
    <article className="sola-card p-6">
      <div className="flex items-start justify-between gap-4 mb-3">
        <span
          className={`text-3xl leading-none ${lingua === 'grego' ? 'font-grego' : 'font-hebraico'}`}
          dir={lingua === 'hebraico' ? 'rtl' : 'ltr'}
          style={{ color: 'hsl(var(--primary))' }}
        >
          {p.palavraOriginal}
        </span>
        <button
          onClick={() => onStrong(p.strong)}
          className="strong-ref text-xs font-medium tracking-wide whitespace-nowrap"
          title={`Buscar Strong ${p.strong}`}
        >
          {p.strong}
        </button>
      </div>

      <p className="font-display text-lg italic text-foreground mb-1">{p.transliteracao}</p>
      {p.pronuncia && (
        <p className="text-xs text-muted-foreground mb-3">[{p.pronuncia}]</p>
      )}

      <p className="font-serif-body text-sm text-foreground/80 leading-relaxed mb-4">
        {p.definicaoCurta}
      </p>

      <div className="flex items-center justify-between pt-3 border-t border-border/40">
        <span className="text-xs tracking-widest uppercase text-muted-foreground">
          {p.classeGramatical || p.morfologia || '—'}
        </span>
        <span className="text-xs tabular-nums text-muted-foreground">
          {freq != null ? `${freq} ocorrências` : 'frequência —'}
        </span>
      </div>
    </article>
  );
}

function DetalheBusca({ p, lingua, onFechar }: { p: Palavra | null; lingua: 'grego' | 'hebraico'; onFechar: () => void }) {
  if (!p) return null;
  const freq = frequencia(p, lingua);
  return (
    <article className="sola-card p-8 mb-8 border-l-2" style={{ borderLeftColor: 'hsl(var(--gold))' }}>
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-2">Resultado da busca</p>
          <span
            className={`text-4xl leading-none block mb-2 ${lingua === 'grego' ? 'font-grego' : 'font-hebraico'}`}
            dir={lingua === 'hebraico' ? 'rtl' : 'ltr'}
            style={{ color: 'hsl(var(--primary))' }}
          >
            {p.palavraOriginal}
          </span>
          <p className="font-display text-xl italic text-foreground">{p.transliteracao}</p>
        </div>
        <button onClick={onFechar} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
          Fechar
        </button>
      </div>

      <div className="ornamento w-24 my-5" />

      <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm mb-5">
        <div>
          <p className="text-xs tracking-widest uppercase text-muted-foreground">Strong</p>
          <p className="font-medium text-foreground">{p.strong}</p>
        </div>
        <div>
          <p className="text-xs tracking-widest uppercase text-muted-foreground">Lemma</p>
          <p className="font-medium text-foreground">{p.lemma || '—'}</p>
        </div>
        <div>
          <p className="text-xs tracking-widest uppercase text-muted-foreground">Pronúncia</p>
          <p className="font-medium text-foreground">{p.pronuncia || '—'}</p>
        </div>
        <div>
          <p className="text-xs tracking-widest uppercase text-muted-foreground">Frequência</p>
          <p className="font-medium text-foreground tabular-nums">{freq != null ? `${freq} ocorrências` : '—'}</p>
        </div>
      </div>

      {p.definicaoCompleta && (
        <p className="font-serif-body text-base text-foreground/85 leading-relaxed">{p.definicaoCompleta}</p>
      )}
    </article>
  );
}

function ColunaIdioma({
  titulo,
  subtitulo,
  lingua,
  palavras,
  carregando,
  busca,
  setBusca,
  onBuscar,
  buscando,
  resultado,
  erro,
  onFechar,
  onStrong,
}: {
  titulo: string;
  subtitulo: string;
  lingua: 'grego' | 'hebraico';
  palavras: Palavra[];
  carregando: boolean;
  busca: string;
  setBusca: (v: string) => void;
  onBuscar: () => void;
  buscando: boolean;
  resultado: Palavra | null;
  erro: string;
  onFechar: () => void;
  onStrong: (s: string) => void;
}) {
  return (
    <section>
      <div className="mb-6 pb-4 border-b border-border/40">
        <h2 className="font-display text-3xl font-light text-foreground">{titulo}</h2>
        <p className="font-serif-body text-sm text-muted-foreground mt-1">{subtitulo}</p>
      </div>

      <form
        onSubmit={(e) => { e.preventDefault(); onBuscar(); }}
        className="relative mb-8"
      >
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
        <input
          type="text"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder={`Buscar por Strong (ex: ${lingua === 'grego' ? 'G2424' : 'H430'})`}
          className="w-full pl-11 pr-24 py-3 bg-card border border-border text-sm font-serif-body focus:outline-none focus:border-primary transition-colors"
        />
        <button
          type="submit"
          disabled={buscando || !busca.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 text-xs font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-40"
        >
          {buscando ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : 'Buscar'}
        </button>
      </form>

      {erro && (
        <p className="font-serif-body italic text-sm text-muted-foreground mb-6">{erro}</p>
      )}

      <DetalheBusca p={resultado} lingua={lingua} onFechar={onFechar} />

      {carregando ? (
        <div className="flex items-center gap-2 text-muted-foreground text-sm py-8">
          <Loader2 className="w-4 h-4 animate-spin" /> Carregando palavras frequentes...
        </div>
      ) : palavras.length === 0 ? (
        <p className="font-serif-body italic text-sm text-muted-foreground py-8 text-center">
          Nenhuma palavra disponível.
        </p>
      ) : (
        <div className="space-y-4">
          {palavras.map((p) => (
            <CardPalavra key={p.id} p={p} lingua={lingua} onStrong={onStrong} />
          ))}
        </div>
      )}
    </section>
  );
}

export default function IdiomasPage() {
  const [grego, setGrego] = useState<Palavra[]>([]);
  const [hebraico, setHebraico] = useState<Palavra[]>([]);
  const [carregando, setCarregando] = useState(true);

  const [buscaGrego, setBuscaGrego] = useState('');
  const [buscaHebraico, setBuscaHebraico] = useState('');
  const [resultadoGrego, setResultadoGrego] = useState<Palavra | null>(null);
  const [resultadoHebraico, setResultadoHebraico] = useState<Palavra | null>(null);
  const [buscandoGrego, setBuscandoGrego] = useState(false);
  const [buscandoHebraico, setBuscandoHebraico] = useState(false);
  const [erroGrego, setErroGrego] = useState('');
  const [erroHebraico, setErroHebraico] = useState('');

  useEffect(() => {
    Promise.all([
      fetch(`${API}/grego/frequentes`).then((r) => r.json()),
      fetch(`${API}/hebraico/frequentes`).then((r) => r.json()),
    ]).then(([g, h]) => {
      setGrego(Array.isArray(g) ? g : []);
      setHebraico(Array.isArray(h) ? h : []);
      setCarregando(false);
    }).catch(() => setCarregando(false));
  }, []);

  async function buscarGrego(strong: string) {
    const s = strong.trim();
    if (!s) return;
    setBuscandoGrego(true);
    setErroGrego('');
    setResultadoGrego(null);
    try {
      const r = await fetch(`${API}/grego/strong/${encodeURIComponent(s)}`);
      if (!r.ok) throw new Error();
      setResultadoGrego(await r.json());
    } catch {
      setErroGrego(`Nenhuma palavra encontrada para Strong ${s}.`);
    } finally {
      setBuscandoGrego(false);
    }
  }

  async function buscarHebraico(strong: string) {
    const s = strong.trim();
    if (!s) return;
    setBuscandoHebraico(true);
    setErroHebraico('');
    setResultadoHebraico(null);
    try {
      const r = await fetch(`${API}/hebraico/strong/${encodeURIComponent(s)}`);
      if (!r.ok) throw new Error();
      setResultadoHebraico(await r.json());
    } catch {
      setErroHebraico(`Nenhuma palavra encontrada para Strong ${s}.`);
    } finally {
      setBuscandoHebraico(false);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Cabeçalho />
      <main className="pt-24">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="mb-12 max-w-3xl">
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-2">Léxico & Morfologia</p>
            <h1 className="font-display text-5xl font-light text-foreground">Línguas Originais</h1>
            <div className="ornamento w-32 mt-4" />
            <p className="font-serif-body text-lg text-muted-foreground mt-6 leading-relaxed">
              Grego Koiné do Novo Testamento e Hebraico Bíblico do Antigo Testamento.
              Palavras frequentes com numeração de Strong, transliteração, definição e análise morfológica.
              Busque qualquer lexema pelo seu número de Strong.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <ColunaIdioma
              titulo="Grego Koiné"
              subtitulo="Novo Testamento · Léxico BDAG / Thayer"
              lingua="grego"
              palavras={grego}
              carregando={carregando}
              busca={buscaGrego}
              setBusca={setBuscaGrego}
              onBuscar={() => buscarGrego(buscaGrego)}
              buscando={buscandoGrego}
              resultado={resultadoGrego}
              erro={erroGrego}
              onFechar={() => setResultadoGrego(null)}
              onStrong={(s) => { setBuscaGrego(s); buscarGrego(s); }}
            />
            <ColunaIdioma
              titulo="Hebraico Bíblico"
              subtitulo="Antigo Testamento · Léxico BDB / HALOT"
              lingua="hebraico"
              palavras={hebraico}
              carregando={carregando}
              busca={buscaHebraico}
              setBusca={setBuscaHebraico}
              onBuscar={() => buscarHebraico(buscaHebraico)}
              buscando={buscandoHebraico}
              resultado={resultadoHebraico}
              erro={erroHebraico}
              onFechar={() => setResultadoHebraico(null)}
              onStrong={(s) => { setBuscaHebraico(s); buscarHebraico(s); }}
            />
          </div>

          <div className="mt-20 sola-card p-10 text-center">
            <BookOpen className="w-8 h-8 mx-auto mb-4 text-primary/40" strokeWidth={1} />
            <p className="font-display text-2xl italic text-muted-foreground max-w-2xl mx-auto">
              &laquo;No princípio era o Verbo&raquo; — o texto sagrado foi dado em línguas humanas,
              e estudá-las é honrar o modo como Deus escolheu revelar-se.
            </p>
          </div>
        </div>
      </main>
      <Rodapé />
    </div>
  );
}
