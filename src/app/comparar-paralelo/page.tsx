'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { Columns, BookOpen, ChevronLeft, ChevronRight, Settings, Maximize2, Minimize2, Copy, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TODOS_LIVROS } from '@/data/biblia/livros';
import { carregarCapitulo, nomeLivro } from '@/lib/apresentacao/versiculos';

interface VerseData {
  versiculo: number;
  texto: string;
}

export default function CompararParaleloPage() {
  const [livro, setLivro] = useState('gn');
  const [capitulo, setCapitulo] = useState(1);
  const [traducoes, setTraducoes] = useState<string[]>(['arc', 'nvi', 'acf']);
  const [dados, setDados] = useState<Record<string, VerseData[]>>({});
  const [carregando, setCarregando] = useState(false);
  const [copiado, setCopiado] = useState<string | null>(null);
  const [layout, setLayout] = useState<'columns' | 'rows'>('columns');

  const livroInfo = useMemo(() => TODOS_LIVROS.find(l => l.abreviacao === livro), [livro]);

  const TRADUCOES = [
    { id: 'arc', nome: 'ARC', cor: 'bg-amber-500/10 text-amber-600' },
    { id: 'ara', nome: 'ARA', cor: 'bg-blue-500/10 text-blue-600' },
    { id: 'acf', nome: 'ACF', cor: 'bg-green-500/10 text-green-600' },
    { id: 'nvi', nome: 'NVI', cor: 'bg-purple-500/10 text-purple-600' },
    { id: 'kjv', nome: 'KJV', cor: 'bg-red-500/10 text-red-600' },
    { id: 'web', nome: 'WEB', cor: 'bg-cyan-500/10 text-cyan-600' },
    { id: 'naa', nome: 'NAA', cor: 'bg-pink-500/10 text-pink-600' },
    { id: 'ntlh', nome: 'NTLH', cor: 'bg-orange-500/10 text-orange-600' },
  ];

  const carregarDados = useCallback(async () => {
    setCarregando(true);
    const resultados: Record<string, VerseData[]> = {};

    await Promise.all(traducoes.map(async (trad) => {
      try {
        const verses = await carregarCapitulo(livro, capitulo, trad);
        if (verses) {
          resultados[trad] = verses.map(v => ({ versiculo: v.numero, texto: v.texto }));
        }
      } catch {}
    }));

    setDados(resultados);
    setCarregando(false);
  }, [livro, capitulo, traducoes]);

  useEffect(() => { carregarDados(); }, [carregarDados]);

  const copiarVersiculo = (trad: string, versiculo: number, texto: string) => {
    const ref = `${livroInfo?.nome} ${capitulo}:${versiculo}`;
    navigator.clipboard.writeText(`${texto} — ${trad.toUpperCase()} ${ref}`);
    setCopiado(`${trad}-${versiculo}`);
    setTimeout(() => setCopiado(null), 2000);
  };

  const toggleTraducao = (id: string) => {
    setTraducoes(prev => {
      if (prev.includes(id)) return prev.filter(t => t !== id);
      if (prev.length >= 5) return prev;
      return [...prev, id];
    });
  };

  const maxVerses = Math.max(...Object.values(dados).map(d => d.length), 0);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20 pb-0 h-screen flex flex-col">
        {/* Toolbar */}
        <div className="px-4 py-3 border-b border-border/40 bg-background/95 backdrop-blur z-10">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                  <Columns className="w-4 h-4 text-cyan-500" />
                </div>
                <h1 className="font-display text-xl font-light">Comparar <span className="text-primary italic">Paralelo</span></h1>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setLayout(l => l === 'columns' ? 'rows' : 'columns')}
                  className="p-2 rounded-lg hover:bg-muted/50 transition-colors" title="Alternar layout">
                  {layout === 'columns' ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex gap-2 flex-wrap items-center">
              <select value={livro} onChange={e => { setLivro(e.target.value); setCapitulo(1); }}
                className="px-3 py-2 text-sm bg-background border border-border rounded-lg">
                {TODOS_LIVROS.map(l => <option key={l.abreviacao} value={l.abreviacao}>{l.nome}</option>)}
              </select>
              <div className="flex items-center gap-1">
                <button onClick={() => setCapitulo(c => Math.max(1, c - 1))} className="p-2 rounded-lg hover:bg-muted/50">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <input type="number" min={1} max={livroInfo?.totalCapitulos || 150} value={capitulo}
                  onChange={e => setCapitulo(parseInt(e.target.value) || 1)}
                  className="w-16 px-2 py-2 text-sm text-center bg-background border border-border rounded-lg" />
                <button onClick={() => setCapitulo(c => Math.min(livroInfo?.totalCapitulos || 150, c + 1))} className="p-2 rounded-lg hover:bg-muted/50">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div className="flex gap-1.5 flex-wrap">
                {TRADUCOES.map(t => (
                  <button key={t.id} onClick={() => toggleTraducao(t.id)}
                    className={cn('px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all border',
                      traducoes.includes(t.id) ? 'border-primary bg-primary/10 text-primary' : 'border-border text-muted-foreground hover:bg-muted/50')}>
                    {t.nome}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto p-4">
            {carregando ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
              </div>
            ) : (
              <div className={cn('gap-4', layout === 'columns' ? 'flex' : 'grid grid-cols-1')}>
                {traducoes.map(trad => {
                  const info = TRADUCOES.find(t => t.id === trad);
                  const verses = dados[trad] || [];
                  return (
                    <div key={trad} className={cn('rounded-xl border border-border/50 bg-card/50 overflow-hidden',
                      layout === 'columns' ? 'flex-1 min-w-0' : '')}>
                      <div className="px-4 py-2.5 border-b border-border/40 bg-muted/30 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className={cn('text-xs font-bold px-2 py-0.5 rounded-full', info?.cor)}>{info?.nome}</span>
                        </div>
                      </div>
                      <div className="p-4 space-y-3 max-h-[calc(100vh-200px)] overflow-y-auto">
                        {verses.map(v => (
                          <div key={v.versiculo} className="group">
                            <div className="flex items-start gap-2">
                              <span className="text-[10px] font-bold text-muted-foreground mt-1 w-5 text-right flex-shrink-0">{v.versiculo}</span>
                              <p className="text-sm leading-relaxed flex-1">{v.texto}</p>
                              <button onClick={() => copiarVersiculo(trad, v.versiculo, v.texto)}
                                className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-muted/50 transition-all flex-shrink-0">
                                {copiado === `${trad}-${v.versiculo}` ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3 text-muted-foreground" />}
                              </button>
                            </div>
                          </div>
                        ))}
                        {verses.length === 0 && (
                          <p className="text-xs text-muted-foreground text-center py-8">Sem dados para esta tradução</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
