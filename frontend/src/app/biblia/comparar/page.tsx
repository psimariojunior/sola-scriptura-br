'use client';

import { useState, useEffect } from 'react';
import { Cabeçalho } from '@/components/layout/cabecalho';
import { Rodapé } from '@/components/layout/rodape';
import { Loader2, GitCompare, BookOpen } from 'lucide-react';

const API = process.env.NEXT_PUBLIC_API_URL || 'https://api-production-bb96.up.railway.app/api/v1';

const TRADUCOES = [
  { sigla: 'NVI', nome: 'Nova Versão Internacional' },
  { sigla: 'ARA', nome: 'Almeida Revista e Atualizada' },
  { sigla: 'ACF', nome: 'Almeida Corrigida Fiel' },
  { sigla: 'NTLH', nome: 'Nova Tradução na Linguagem de Hoje' },
  { sigla: 'KJV', nome: 'King James Version' },
];

interface Versiculo {
  id?: string;
  numero: number;
  texto: string;
}

interface Livro {
  id: string;
  nome: string;
  nomeAbreviado?: string;
  totalCapitulos: number;
}

export default function CompararPage() {
  const [livros, setLivros] = useState<Livro[]>([]);
  const [carregandoLivros, setCarregandoLivros] = useState(true);
  const [livroId, setLivroId] = useState('');
  const [capitulo, setCapitulo] = useState(1);
  const [selecionadas, setSelecionadas] = useState<string[]>(['NVI', 'ARA']);

  const [resultados, setResultados] = useState<Record<string, Versiculo[]>>({});
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');
  const [buscou, setBuscou] = useState(false);

  useEffect(() => {
    fetch(`${API}/biblia/livros`)
      .then((r) => r.json())
      .then((d) => {
        const arr = (Array.isArray(d) ? d : []) as Livro[];
        setLivros(arr);
        if (arr.length > 0) setLivroId(arr[0].id);
        setCarregandoLivros(false);
      })
      .catch(() => setCarregandoLivros(false));
  }, []);

  const livroSel = livros.find((l) => l.id === livroId) || null;
  const totalCap = livroSel?.totalCapitulos || 1;

  useEffect(() => {
    if (capitulo > totalCap) setCapitulo(1);
  }, [totalCap, capitulo]);

  function toggle(sigla: string) {
    setSelecionadas((prev) =>
      prev.includes(sigla) ? prev.filter((s) => s !== sigla) : [...prev, sigla]
    );
  }

  async function comparar() {
    if (!livroId || selecionadas.length === 0) return;
    setCarregando(true);
    setErro('');
    setBuscou(true);
    setResultados({});
    try {
      const entradas = await Promise.allSettled(
        selecionadas.map(async (sigla) => {
          const r = await fetch(
            `${API}/biblia/passagem/${livroId}/${capitulo}/1/200?traducao=${encodeURIComponent(sigla)}`
          );
          if (!r.ok) throw new Error(`HTTP ${r.status}`);
          const d = await r.json();
          return { sigla, versiculos: (Array.isArray(d) ? d : []) as Versiculo[] };
        })
      );
      const map: Record<string, Versiculo[]> = {};
      entradas.forEach((e) => {
        if (e.status === 'fulfilled') {
          map[e.value.sigla] = e.value.versiculos;
        }
      });
      setResultados(map);
    } catch {
      setErro('Não foi possível carregar a comparação no momento.');
    } finally {
      setCarregando(false);
    }
  }

  const colunas = selecionadas.length;

  return (
    <div className="min-h-screen bg-background">
      <Cabeçalho />
      <main className="pt-24">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="mb-10 max-w-3xl">
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-2">
              Texto Sagrado
            </p>
            <h1 className="font-display text-5xl font-light text-foreground flex items-baseline gap-3">
              Comparação de Traduções
              <GitCompare className="w-5 h-5 text-primary/50" strokeWidth={1.5} />
            </h1>
            <div className="ornamento w-32 mt-4" />
            <p className="font-serif-body text-lg text-muted-foreground mt-6 leading-relaxed">
              Leitura lado a lado de uma mesma passagem em múltiplas versões da Bíblia em português
              — para ver onde convergem e onde o trabalho do tradutor escolhe um caminho distinto.
            </p>
          </div>

          <div className="sola-card p-6 md:p-8 mb-10">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-4 items-end">
              <div>
                <label className="block text-xs tracking-widest uppercase text-muted-foreground mb-2">
                  Livro
                </label>
                <select
                  value={livroId}
                  onChange={(e) => {
                    setLivroId(e.target.value);
                    setCapitulo(1);
                  }}
                  disabled={carregandoLivros}
                  className="w-full bg-card border border-border px-4 py-2.5 text-sm font-serif-body text-foreground focus:outline-none focus:border-primary"
                >
                  {carregandoLivros ? (
                    <option>Carregando...</option>
                  ) : (
                    livros.map((l) => (
                      <option key={l.id} value={l.id}>
                        {l.nome}
                      </option>
                    ))
                  )}
                </select>
              </div>

              <div>
                <label className="block text-xs tracking-widest uppercase text-muted-foreground mb-2">
                  Capítulo
                </label>
                <select
                  value={capitulo}
                  onChange={(e) => setCapitulo(Number(e.target.value))}
                  className="bg-card border border-border px-4 py-2.5 text-sm font-serif-body text-foreground focus:outline-none focus:border-primary"
                >
                  {Array.from({ length: totalCap }, (_, i) => (
                    <option key={i} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={comparar}
                disabled={carregando || !livroId || selecionadas.length === 0}
                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 text-sm font-semibold hover:bg-primary/90 transition-colors disabled:opacity-40"
              >
                {carregando ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <GitCompare className="w-4 h-4" strokeWidth={1.5} />
                )}
                Comparar
              </button>
            </div>

            <div className="mt-6 pt-6 border-t border-border/40">
              <p className="text-xs tracking-widest uppercase text-muted-foreground mb-3">
                Traduções ({selecionadas.length} selecionadas)
              </p>
              <div className="flex flex-wrap gap-3">
                {TRADUCOES.map((t) => {
                  const ativo = selecionadas.includes(t.sigla);
                  return (
                    <label
                      key={t.sigla}
                      className={`inline-flex items-center gap-2 px-4 py-2 border cursor-pointer transition-colors ${
                        ativo
                          ? 'border-primary text-primary bg-primary/5'
                          : 'border-border text-muted-foreground hover:border-primary/40'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={ativo}
                        onChange={() => toggle(t.sigla)}
                        className="sr-only"
                      />
                      <span
                        className={`w-3.5 h-3.5 border flex items-center justify-center ${
                          ativo ? 'border-primary bg-primary' : 'border-muted-foreground/50'
                        }`}
                      >
                        {ativo && (
                          <span className="text-primary-foreground text-[10px] leading-none">
                            ✓
                          </span>
                        )}
                      </span>
                      <span className="text-sm font-semibold">{t.sigla}</span>
                      <span className="text-xs opacity-60 hidden md:inline">{t.nome}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>

          {erro && (
            <p className="font-serif-body italic text-muted-foreground text-center py-8">{erro}</p>
          )}

          {buscou && !carregando && !erro && colunas > 0 && (
            <section>
              <div className="flex items-center gap-4 mb-8">
                <h2 className="font-display text-3xl font-medium text-primary whitespace-nowrap">
                  {livroSel?.nome} {capitulo}
                </h2>
                <div className="flex-1 h-px bg-border/60" />
              </div>

              <div
                className="grid gap-6"
                style={{
                  gridTemplateColumns:
                    'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
                }}
              >
                {selecionadas.map((sigla) => {
                  const lista = resultados[sigla];
                  const nome = TRADUCOES.find((t) => t.sigla === sigla)?.nome || sigla;
                  return (
                    <div key={sigla} className="sola-card p-6 flex flex-col">
                      <div className="pb-4 mb-4 border-b border-border/40">
                        <p className="font-display text-2xl font-semibold text-primary">{sigla}</p>
                        <p className="text-xs text-muted-foreground mt-1">{nome}</p>
                      </div>

                      {!lista || lista.length === 0 ? (
                        <p className="font-serif-body italic text-sm text-muted-foreground py-8 text-center">
                          Sem texto disponível para {sigla} nesta passagem.
                        </p>
                      ) : (
                        <div className="texto-sagrado text-foreground space-y-2">
                          {lista.map((v) => (
                            <p key={v.id || v.numero} className="leading-relaxed">
                              <sup className="font-sans text-xs font-bold text-primary mr-1 tabular-nums align-super">
                                {v.numero}
                              </sup>
                              <span className="texto-sagrado text-foreground">{v.texto}</span>
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {buscou && !carregando && !erro && colunas === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <BookOpen className="w-10 h-10 text-primary/30 mb-4" strokeWidth={1} />
              <p className="font-display text-2xl text-muted-foreground italic">
                Selecione ao menos uma tradução
              </p>
            </div>
          )}

          {!buscou && !carregando && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <BookOpen className="w-10 h-10 text-primary/30 mb-4" strokeWidth={1} />
              <p className="font-display text-2xl text-muted-foreground italic">
                Escolha livro, capítulo e traduções para comparar
              </p>
            </div>
          )}
        </div>
      </main>
      <Rodapé />
    </div>
  );
}
