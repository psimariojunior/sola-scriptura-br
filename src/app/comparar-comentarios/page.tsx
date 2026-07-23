'use client';

import { useState, useMemo } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { motion } from 'framer-motion';
import { MessageSquare, Search, X, BookOpen, ChevronDown, ChevronUp } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import { cn } from '@/lib/utils';

interface Comentario {
  id: string;
  autor: string;
  periodo: string;
  texto: string;
  referencia: string;
  cor: string;
}

const COMENTARIOS: Comentario[] = [
  { id: 'c1', autor: 'Matthew Henry', periodo: '1706', texto: 'Este versículo é o resumo mais conciso e completo do evangelho. Nele vemos: (1) O amor de Deus — "Deus amou o mundo"; (2) O dom de Deus — "deu o seu Filho unigênito"; (3) O propósito de Deus — "para que todo aquele que nele crê não pereça"; (4) A promessa de Deus — "mas tenha a vida eterna".', referencia: 'João 3:16', cor: '#8B4513' },
  { id: 'c2', autor: 'Adam Clarke', periodo: '1810', texto: '"O mundo" — Não apenas os judeus, mas todas as nações da terra. O amor de Deus é universal em sua extensão, embora particular em sua aplicação. "Unigênito" — O único de sua natureza, o Filho eterno do Pai, sem igual em glória e majestade.', referencia: 'João 3:16', cor: '#4682B4' },
  { id: 'c3', autor: 'John Gill', periodo: '1748', texto: '"De tal maneira" — Indica a intensidade e excelência do amor. Não foi um amor comum, mas um amor que ultrapassa toda compreensão. "Filho unigênito" — Unigênito no sentido de ser o único em sua classe, sem igual entre os filhos de Deus.', referencia: 'João 3:16', cor: '#DAA520' },
  { id: 'c4', autor: 'Albert Barnes', periodo: '1834', texto: '"Crê" — Não meramente assentir a verdades históricas, mas confiar, confiar plenamente em Cristo para salvação. "Não pereça" — Não será perdido para sempre, não sofrerá a destruição eterna dos ímpios.', referencia: 'João 3:16', cor: '#228B22' },
  { id: 'c5', autor: 'Charles Spurgeon', periodo: '1865', texto: 'A magnitude deste versículo é infinita. Aqui está um oceano de graça em uma única frase. O amor de Deus é o fundamento, o Filho é o meio, a fé é o instrumento, e a vida eterna é o resultado.', referencia: 'João 3:16', cor: '#8B0000' },
  { id: 'c6', autor: 'Martinho Lutero', periodo: '1522', texto: 'Este versículo deve ser ouvido como um trovão que desperta os mortos. Nele Deus se declara como o maior benfeitor da humanidade, que deu seu Filho mais precioso para nos livrar da morte eterna.', referencia: 'João 3:16', cor: '#4B0082' },
  { id: 'c7', autor: 'Calvino', periodo: '1555', texto: '"O mundo" — A Escritura frequentemente usa esta palavra para denotar toda a raça humana, que estava mergulhada em miséria e condenação. O amor de Deus não se limitou a um povo, mas se estendeu a todos os homens.', referencia: 'João 3:16', cor: '#800020' },
  { id: 'c8', autor: 'A. W. Pink', periodo: '1942', texto: 'O "assim" de João 3:16 aponta para a natureza do amor de Deus — é um amor que se entrega completamente. Assim como Deus amou o mundo de tal maneira, também nós devemos amar uns aos outros.', referencia: 'João 3:16', cor: '#006400' },
];

export default function ComentariosPage() {
  const [busca, setBusca] = useState('');
  const [refSearch, setRefSearch] = useState('');
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const refs = useMemo(() => [...new Set(COMENTARIOS.map(c => c.referencia))], []);
  const filtered = useMemo(() => {
    let result = COMENTARIOS;
    if (refSearch) result = result.filter(c => c.referencia === refSearch);
    if (busca) {
      const termo = busca.toLowerCase();
      result = result.filter(c => c.texto.toLowerCase().includes(termo) || c.autor.toLowerCase().includes(termo));
    }
    return result;
  }, [busca, refSearch]);

  const grouped = useMemo(() => {
    const groups: Record<string, Comentario[]> = {};
    filtered.forEach(c => {
      if (!groups[c.referencia]) groups[c.referencia] = [];
      groups[c.referencia].push(c);
    });
    return groups;
  }, [filtered]);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-10">
              <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center border border-emerald-500/20">
                <MessageSquare className="w-10 h-10 text-emerald-500" />
              </div>
              <h1 className="font-display text-4xl font-light mb-3">Comentários <span className="text-primary italic">Lado a Lado</span></h1>
              <p className="text-muted-foreground max-w-lg mx-auto">Compare o que diferentes teólogos dizem sobre o mesmo versículo</p>
            </div>
          </ScrollReveal>

          <div className="space-y-3 mb-8 max-w-lg mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input type="text" value={busca} onChange={e => setBusca(e.target.value)}
                placeholder="Buscar nos comentários..."
                className="w-full pl-11 pr-10 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20" />
              {busca && <button onClick={() => setBusca('')} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-muted/50">
                <X className="w-4 h-4" /></button>}
            </div>
            <div className="flex gap-2 flex-wrap">
              <button onClick={() => setRefSearch('')}
                className={cn('px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
                  !refSearch ? 'bg-primary text-primary-foreground' : 'border border-border text-muted-foreground hover:bg-muted/50')}>
                Todos
              </button>
              {refs.map(ref => (
                <button key={ref} onClick={() => setRefSearch(ref)}
                  className={cn('px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
                    refSearch === ref ? 'bg-primary text-primary-foreground' : 'border border-border text-muted-foreground hover:bg-muted/50')}>
                  {ref}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            {Object.entries(grouped).map(([ref, comments]) => (
              <ScrollReveal key={ref}>
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-4">
                    <BookOpen className="w-4 h-4 text-primary" />
                    <h2 className="font-display text-xl font-medium text-primary">{ref}</h2>
                    <span className="text-xs text-muted-foreground">({comments.length} comentários)</span>
                  </div>
                  <div className="space-y-3">
                    {comments.map((c, idx) => {
                      const isExpanded = expanded.has(c.id);
                      return (
                        <motion.div key={c.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className="rounded-xl border border-border/50 bg-card/50 overflow-hidden">
                          <button onClick={() => setExpanded(prev => {
                            const n = new Set(prev);
                            if (n.has(c.id)) n.delete(c.id); else n.add(c.id);
                            return n;
                          })} className="w-full flex items-center gap-3 px-5 py-4 hover:bg-muted/30 transition-colors text-left">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                              style={{ backgroundColor: c.cor }}>{c.autor.charAt(0)}</div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-sm">{c.autor}</p>
                              <p className="text-[10px] text-muted-foreground">{c.periodo}</p>
                            </div>
                            {isExpanded ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                          </button>
                          {isExpanded && (
                            <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }}
                              className="px-5 pb-4">
                              <div className="pl-11 border-l-2 ml-4" style={{ borderColor: c.cor }}>
                                <p className="text-sm text-foreground/90 leading-relaxed">{c.texto}</p>
                              </div>
                            </motion.div>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {Object.keys(grouped).length === 0 && (
            <div className="text-center py-12">
              <MessageSquare className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground">Nenhum comentário encontrado</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
