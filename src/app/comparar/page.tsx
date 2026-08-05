'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { motion } from 'framer-motion';
import { BookOpen, Search, X, ChevronDown, Languages, Copy, Check, Eye, EyeOff } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import { cn } from '@/lib/utils';
import { TODOS_LIVROS } from '@/data/biblia/livros';

const TRADUCOES = [
  { id: 'arc', nome: 'ARC', descricao: 'Almeida Revista e Corrigida' },
  { id: 'ara', nome: 'ARA', descricao: 'Almeida Revista e Atualizada' },
  { id: 'acf', nome: 'ACF', descricao: 'Almeida Corrigida e Fiel' },
  { id: 'nvi', nome: 'NVI', descricao: 'Nova Versão Internacional' },
  { id: 'aa', nome: 'AA', descricao: 'Nova Almeida Atualizada' },
  { id: 'ntlh', nome: 'NTLH', descricao: 'Nova Tradução na Linguagem de Hoje' },
  { id: 'nvt', nome: 'NVT', descricao: 'Nova Versão Trinitariana' },
  { id: 'kja', nome: 'KJA', descricao: 'King James Atualizada' },
  { id: 'nbv', nome: 'NBV', descricao: 'Nova Bíblia Viva' },
  { id: 'kjv', nome: 'KJV', descricao: 'King James Version' },
  { id: 'web', nome: 'WEB', descricao: 'World English Bible' },
];

function normalizar(texto: string): string {
  return texto.toLowerCase().replace(/[^\w\sáàâãéêíóôõúüç]/g, '').replace(/\s+/g, ' ').trim();
}

function diffWords(base: string, comparado: string): { texto: React.ReactNode; temDiferenca: boolean } {
  const wordsBase = normalizar(base).split(' ');
  const wordsComp = normalizar(comparado).split(' ');
  const maxLen = Math.max(wordsBase.length, wordsComp.length);
  const parts: React.ReactNode[] = [];
  let temDiferenca = false;

  for (let i = 0; i < maxLen; i++) {
    const w1 = wordsBase[i] || '';
    const w2 = wordsComp[i] || '';
    if (w1 && w2 && w1 !== w2) {
      temDiferenca = true;
      parts.push(
        <span key={i} className="relative inline-block">
          <span className="bg-red-500/15 text-red-600 dark:text-red-400 line-through rounded px-0.5">{w1}</span>
          <span className="text-muted-foreground mx-0.5">→</span>
          <span className="bg-green-500/15 text-green-600 dark:text-green-400 rounded px-0.5 font-medium">{w2}</span>
        </span>
      );
    } else if (w1 && !w2) {
      temDiferenca = true;
      parts.push(
        <span key={i} className="bg-red-500/15 text-red-600 dark:text-red-400 line-through rounded px-0.5">{w1}</span>
      );
    } else if (!w1 && w2) {
      temDiferenca = true;
      parts.push(
        <span key={i} className="bg-green-500/15 text-green-600 dark:text-green-400 rounded px-0.5 font-medium">{w2}</span>
      );
    } else {
      parts.push(<span key={i}>{w1 || w2}</span>);
    }
    if (i < maxLen - 1) parts.push(' ');
  }

  return { texto: <>{parts}</>, temDiferenca };
}

export default function CompararPage() {
  const [livro, setLivro] = useState('gn');
  const [capitulo, setCapitulo] = useState(1);
  const [versiculo, setVersiculo] = useState(1);
  const [modoCapitulo, setModoCapitulo] = useState(false);
  const [traducoesSelecionadas, setTraducoesSelecionadas] = useState<string[]>(['arc', 'nvi', 'acf']);
  const [textoTraducoes, setTextoTraducoes] = useState<Record<string, string>>({});
  const [textoCapitulo, setTextoCapitulo] = useState<Record<string, Record<number, string>>>({});
  const [carregando, setCarregando] = useState(false);
  const [copiado, setCopiado] = useState<string | null>(null);
  const [mostrarDiff, setMostrarDiff] = useState(true);
  const [versiculoBase, setVersiculoBase] = useState<string>('arc');

  const livroInfo = useMemo(() => TODOS_LIVROS.find(l => l.abreviacao === livro), [livro]);

  const carregarVersiculo = useCallback(async () => {
    setCarregando(true);
    const resultados: Record<string, string> = {};

    await Promise.all(traducoesSelecionadas.map(async (trad) => {
      try {
        const resp = await fetch(`/api/biblia/${trad}/${livro}/${capitulo}`);
        if (resp.ok) {
          const data = await resp.json();
          if (modoCapitulo) {
            const versos: Record<number, string> = {};
            data.versiculos?.forEach((v: any) => { versos[v.versiculo] = v.texto; });
            setTextoCapitulo(prev => ({ ...prev, [trad]: versos }));
          } else {
            const ver = data.versiculos?.find((v: any) => v.versiculo === versiculo);
            if (ver) resultados[trad] = ver.texto;
          }
        }
      } catch {}
    }));

    if (!modoCapitulo) setTextoTraducoes(resultados);
    setCarregando(false);
  }, [livro, capitulo, versiculo, traducoesSelecionadas, modoCapitulo]);

  useEffect(() => { carregarVersiculo(); }, [carregarVersiculo]);

  const toggleTraducao = (id: string) => {
    setTraducoesSelecionadas(prev =>
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
  };

  const copiarTexto = (trad: string, texto: string) => {
    navigator.clipboard.writeText(`${texto} — ${trad.toUpperCase()} ${livroInfo?.nome} ${capitulo}:${versiculo}`);
    setCopiado(trad);
    setTimeout(() => setCopiado(null), 2000);
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16 px-6">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-10">
              <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center border border-cyan-500/20">
                <Languages className="w-10 h-10 text-cyan-500" />
              </div>
              <h1 className="font-display text-4xl font-light mb-3">Comparar <span className="text-primary italic">Traduções</span></h1>
              <p className="text-muted-foreground max-w-lg mx-auto">Veja o mesmo versículo em diferentes traduções lado a lado</p>
            </div>
          </ScrollReveal>

          {/* Seleção */}
          <div className="rounded-2xl border border-border/50 bg-card/50 p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Livro</label>
                <select value={livro} onChange={e => { setLivro(e.target.value); setCapitulo(1); setVersiculo(1); }}
                  className="w-full px-3 py-2.5 bg-background border border-border rounded-xl text-sm">
                  {TODOS_LIVROS.map(l => (
                    <option key={l.abreviacao} value={l.abreviacao}>{l.nome}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Capítulo</label>
                <input type="number" min={1} max={livroInfo?.totalCapitulos || 150} value={capitulo}
                  onChange={e => { setCapitulo(parseInt(e.target.value) || 1); setVersiculo(1); }}
                  className="w-full px-3 py-2.5 bg-background border border-border rounded-xl text-sm" />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Versículo</label>
                <input type="number" min={1} value={versiculo}
                  onChange={e => setVersiculo(parseInt(e.target.value) || 1)}
                  className="w-full px-3 py-2.5 bg-background border border-border rounded-xl text-sm" />
              </div>
              <div className="flex items-end">
                <button onClick={carregarVersiculo} disabled={carregando}
                  className="w-full px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium disabled:opacity-50">
                  {carregando ? 'Carregando...' : 'Comparar'}
                </button>
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-muted-foreground mb-2 block">Traduções</label>
              <div className="flex flex-wrap gap-2">
                {TRADUCOES.map(t => (
                  <button key={t.id} onClick={() => toggleTraducao(t.id)}
                    className={cn('px-3 py-1.5 rounded-lg text-xs font-medium transition-all border',
                      traducoesSelecionadas.includes(t.id)
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border text-muted-foreground hover:bg-muted/50')}>
                    {t.nome}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 mt-4">
              <button onClick={() => setModoCapitulo(!modoCapitulo)}
                className={cn('px-4 py-2 rounded-xl text-sm font-medium transition-all border',
                  modoCapitulo ? 'border-primary bg-primary/10 text-primary' : 'border-border text-muted-foreground')}>
                {modoCapitulo ? 'Modo Versículo' : 'Modo Capítulo Inteiro'}
              </button>
              {!modoCapitulo && traducoesSelecionadas.length >= 2 && (
                <button onClick={() => setMostrarDiff(!mostrarDiff)}
                  className={cn('px-4 py-2 rounded-xl text-sm font-medium transition-all border flex items-center gap-2',
                    mostrarDiff ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600' : 'border-border text-muted-foreground')}>
                  {mostrarDiff ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  Diff
                </button>
              )}
              {!modoCapitulo && traducoesSelecionadas.length >= 2 && mostrarDiff && (
                <select value={versiculoBase} onChange={e => setVersiculoBase(e.target.value)}
                  className="px-3 py-2 rounded-xl text-sm border border-border bg-background">
                  {traducoesSelecionadas.map(t => (
                    <option key={t} value={t}>{TRADUCOES.find(tr => tr.id === t)?.nome} (base)</option>
                  ))}
                </select>
              )}
              {traducoesSelecionadas.length > 4 && (
                <span className="text-xs text-amber-500">Máx. 4 traduções no modo capítulo</span>
              )}
            </div>
          </div>

          {/* Resultado - Modo Capítulo */}
          {modoCapitulo ? (
            <div className="rounded-2xl border border-border/50 bg-card/50 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border/50 bg-muted/30">
                      <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground w-12">Vers.</th>
                      {traducoesSelecionadas.slice(0, 4).map(trad => (
                        <th key={trad} className="px-3 py-2 text-left text-xs font-medium text-primary">
                          {TRADUCOES.find(t => t.id === trad)?.nome}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: livroInfo?.totalCapitulos || 1 }, (_, i) => i + 1).map(v => (
                      <tr key={v} className={cn('border-b border-border/20 hover:bg-muted/20 transition-colors', v === versiculo && 'bg-primary/5')}>
                        <td className="px-3 py-2 text-xs font-medium text-muted-foreground">{v}</td>
                        {traducoesSelecionadas.slice(0, 4).map(trad => (
                          <td key={trad} className="px-3 py-2 text-xs leading-relaxed">
                            {textoCapitulo[trad]?.[v] || <span className="text-muted-foreground">...</span>}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
          /* Resultado - Modo Versículo */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {traducoesSelecionadas.map((trad) => {
              const info = TRADUCOES.find(t => t.id === trad);
              const texto = textoTraducoes[trad];
              const baseTexto = textoTraducoes[versiculoBase] || '';
              const usarDiff = mostrarDiff && trad !== versiculoBase && baseTexto && texto;
              const diff = usarDiff ? diffWords(baseTexto, texto) : null;
              return (
                <motion.div key={trad} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "rounded-2xl border bg-card/50 p-5 flex flex-col transition-all",
                    diff?.temDiferenca ? "border-amber-500/30" : "border-border/50"
                  )}>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <span className="text-lg font-bold text-primary">{info?.nome}</span>
                      <p className="text-[10px] text-muted-foreground">{info?.descricao}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      {diff?.temDiferenca && (
                        <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 font-medium">
                          diff
                        </span>
                      )}
                      {texto && (
                        <button onClick={() => copiarTexto(trad, texto)}
                          className="p-1.5 rounded-lg hover:bg-muted/50 transition-colors">
                          {copiado === trad ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-muted-foreground" />}
                        </button>
                      )}
                    </div>
                  </div>
                  {texto ? (
                    <p className="text-sm leading-relaxed flex-1">
                      {diff?.temDiferenca ? diff.texto : texto}
                    </p>
                  ) : (
                    <div className="flex-1 flex items-center justify-center">
                      <p className="text-xs text-muted-foreground">{carregando ? 'Carregando...' : 'Sem dados'}</p>
                    </div>
                  )}
                  <p className="text-[10px] text-muted-foreground mt-3 text-right">
                    {livroInfo?.nome} {capitulo}:{versiculo}
                  </p>
                </motion.div>
              );
            })}
          </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
