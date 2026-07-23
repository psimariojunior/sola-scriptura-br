'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { motion } from 'framer-motion';
import { BookOpen, Search, X, ChevronDown, Languages, Copy, Check } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import { cn } from '@/lib/utils';
import { TODOS_LIVROS } from '@/data/biblia/livros';

const TRADUCOES = [
  { id: 'arc', nome: 'ARC', descricao: 'Almeida Revista e Corrigida' },
  { id: 'ara', nome: 'ARA', descricao: 'Almeida Revista e Atualizada' },
  { id: 'acf', nome: 'ACF', descricao: 'Almeida Corrigida e Fiel' },
  { id: 'nvi', nome: 'NVI', descricao: 'Nova Versão Internacional' },
  { id: 'kjv', nome: 'KJV', descricao: 'King James Version' },
  { id: 'web', nome: 'WEB', descricao: 'World English Bible' },
];

export default function CompararPage() {
  const [livro, setLivro] = useState('gn');
  const [capitulo, setCapitulo] = useState(1);
  const [versiculo, setVersiculo] = useState(1);
  const [traducoesSelecionadas, setTraducoesSelecionadas] = useState<string[]>(['arc', 'nvi', 'acf']);
  const [textoTraducoes, setTextoTraducoes] = useState<Record<string, string>>({});
  const [carregando, setCarregando] = useState(false);
  const [copiado, setCopiado] = useState<string | null>(null);

  const livroInfo = useMemo(() => TODOS_LIVROS.find(l => l.abreviacao === livro), [livro]);

  const carregarVersiculo = useCallback(async () => {
    setCarregando(true);
    const resultados: Record<string, string> = {};

    await Promise.all(traducoesSelecionadas.map(async (trad) => {
      try {
        const resp = await fetch(`/api/biblia/${trad}/${livro}/${capitulo}`);
        if (resp.ok) {
          const data = await resp.json();
          const ver = data.versiculos?.find((v: any) => v.versiculo === versiculo);
          if (ver) resultados[trad] = ver.texto;
        }
      } catch {}
    }));

    setTextoTraducoes(resultados);
    setCarregando(false);
  }, [livro, capitulo, versiculo, traducoesSelecionadas]);

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
          </div>

          {/* Resultado */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {traducoesSelecionadas.map((trad) => {
              const info = TRADUCOES.find(t => t.id === trad);
              const texto = textoTraducoes[trad];
              return (
                <motion.div key={trad} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl border border-border/50 bg-card/50 p-5 flex flex-col">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <span className="text-lg font-bold text-primary">{info?.nome}</span>
                      <p className="text-[10px] text-muted-foreground">{info?.descricao}</p>
                    </div>
                    {texto && (
                      <button onClick={() => copiarTexto(trad, texto)}
                        className="p-1.5 rounded-lg hover:bg-muted/50 transition-colors">
                        {copiado === trad ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-muted-foreground" />}
                      </button>
                    )}
                  </div>
                  {texto ? (
                    <p className="text-sm leading-relaxed flex-1">{texto}</p>
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
        </div>
      </main>
      <Footer />
    </div>
  );
}
