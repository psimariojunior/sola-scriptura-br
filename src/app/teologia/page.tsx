'use client';

import { useState, useMemo } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { doutrinas } from '@/data/biblia';
import { 
  Church, Search, Filter, BookOpen, 
  ChevronDown, ChevronRight, ExternalLink,
  Share2, Copy, Check
} from 'lucide-react';
import Link from 'next/link';

export default function TeologiaPage() {
  const [busca, setBusca] = useState('');
  const [filtroCategoria, setFiltroCategoria] = useState<string | null>(null);
  const [expandida, setExpandida] = useState<string | null>(null);
  const [copiedRef, setCopiedRef] = useState<string | null>(null);

  const categorias = useMemo(() => {
    const cats = [...new Set(doutrinas.map((d) => d.categoria))];
    return cats.sort();
  }, []);

  const doutrinasFiltradas = useMemo(() => {
    let lista = doutrinas;
    
    if (filtroCategoria) {
      lista = lista.filter(d => d.categoria === filtroCategoria);
    }
    
    if (busca.trim()) {
      const q = busca.toLowerCase();
      lista = lista.filter(d => 
        d.nome.toLowerCase().includes(q) ||
        d.definicao.toLowerCase().includes(q) ||
        d.passagens.some(p => p.toLowerCase().includes(q)) ||
        (d.tradicoes && d.tradicoes.toLowerCase().includes(q))
      );
    }
    
    return lista;
  }, [busca, filtroCategoria]);

  const copyRef = async (ref: string) => {
    await navigator.clipboard.writeText(ref);
    setCopiedRef(ref);
    setTimeout(() => setCopiedRef(null), 2000);
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="font-display text-4xl md:text-5xl font-light mb-2">Teologia Sistemática</h1>
            <p className="text-muted-foreground">Doutrinas fundamentais da fé cristã bíblica</p>
          </div>

          {/* Search and Filter */}
          <div className="sola-card p-4 mb-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Buscar doutrina, definição ou referência..."
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => setFiltroCategoria(null)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                    !filtroCategoria
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  Todas
                </button>
                {categorias.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setFiltroCategoria(filtroCategoria === cat ? null : cat)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                      filtroCategoria === cat
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="sola-card p-4 text-center">
              <p className="font-display text-3xl font-light text-primary">{doutrinas.length}</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Doutrinas</p>
            </div>
            <div className="sola-card p-4 text-center">
              <p className="font-display text-3xl font-light text-primary">{categorias.length}</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Categorias</p>
            </div>
            <div className="sola-card p-4 text-center">
              <p className="font-display text-3xl font-light text-primary">
                {doutrinas.reduce((acc, d) => acc + d.passagens.length, 0)}
              </p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Referências</p>
            </div>
            <div className="sola-card p-4 text-center">
              <p className="font-display text-3xl font-light text-primary">66</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Livros Bíblicos</p>
            </div>
          </div>

          {/* Doctrines Grid */}
          <div className="space-y-8">
            {categorias.map((cat) => {
              const doutrinasCat = doutrinasFiltradas.filter(d => d.categoria === cat);
              if (doutrinasCat.length === 0) return null;
              
              return (
                <div key={cat}>
                  <h2 className="font-display text-2xl font-light mb-6 text-primary flex items-center gap-2">
                    <Church className="w-6 h-6" />
                    {cat}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {doutrinasCat.map((d) => (
                      <div key={d.slug} className="sola-card p-6">
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <h3 className="font-semibold text-lg">{d.nome}</h3>
                          <button
                            onClick={() => setExpandida(expandida === d.slug ? null : d.slug)}
                            className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                          >
                            <ChevronDown className={`w-4 h-4 transition-transform ${expandida === d.slug ? 'rotate-180' : ''}`} />
                          </button>
                        </div>
                        
                        <p className="font-serif-body text-sm leading-relaxed text-foreground/80 mb-4">
                          {d.definicao}
                        </p>
                        
                        {expandida === d.slug && (
                          <div className="mt-4 pt-4 border-t border-border/50">
                            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                              Passagens Bíblicas
                            </h4>
                            <div className="flex flex-wrap gap-2 mb-4">
                              {d.passagens.map((ref) => (
                                <div key={ref} className="flex items-center gap-1">
                                  <Link
                                    href={`/biblia?livro=${ref.split(' ')[0]?.toLowerCase()}&capitulo=${ref.split(' ')[1]?.split(':')[0] || '1'}`}
                                    className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-sm hover:bg-primary/20 transition-colors flex items-center gap-1"
                                  >
                                    {ref}
                                    <ExternalLink className="w-3 h-3" />
                                  </Link>
                                  <button
                                    onClick={() => copyRef(ref)}
                                    className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                                    title="Copiar referência"
                                  >
                                    {copiedRef === ref ? (
                                      <Check className="w-3 h-3 text-green-500" />
                                    ) : (
                                      <Copy className="w-3 h-3" />
                                    )}
                                  </button>
                                </div>
                              ))}
                            </div>
                            {d.tradicoes && (
                              <div>
                                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                                  Visão das Tradições
                                </h4>
                                <p className="text-xs text-foreground/70 leading-relaxed font-serif-body">
                                  {d.tradicoes}
                                </p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {doutrinasFiltradas.length === 0 && (
            <div className="sola-card p-12 text-center">
              <Search className="w-16 h-16 mx-auto mb-4 text-muted-foreground/20" strokeWidth={1} />
              <p className="font-display text-xl text-muted-foreground mb-1">Nenhuma doutrina encontrada</p>
              <p className="text-sm text-muted-foreground/70">
                Tente usar termos diferentes ou limpar os filtros
              </p>
            </div>
          )}

          {/* Traditions */}
          <div className="mt-16">
            <h2 className="font-display text-2xl font-light mb-6 text-primary">Tradições Teológicas</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="sola-card p-6">
                <h3 className="font-semibold mb-2">Reformada</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Sola Gratia, Sola Fide, Sola Scriptura, Solus Christus, Soli Deo Gloria. 
                  Soberania de Deus na salvação.
                </p>
                <div className="flex flex-wrap gap-1">
                  {['Calvino', 'Lutero', 'Escolásticos'].map(p => (
                    <span key={p} className="text-[10px] px-2 py-0.5 bg-muted rounded-full text-muted-foreground">
                      {p}
                    </span>
                  ))}
                </div>
              </div>
              <div className="sola-card p-6">
                <h3 className="font-semibold mb-2">Arminiana</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Liberdade humana, graça resistível, previsão condicional. 
                  Destaque para a responsabilidade humana.
                </p>
                <div className="flex flex-wrap gap-1">
                  {['Arminio', 'Wesley', 'Metodista'].map(p => (
                    <span key={p} className="text-[10px] px-2 py-0.5 bg-muted rounded-full text-muted-foreground">
                      {p}
                    </span>
                  ))}
                </div>
              </div>
              <div className="sola-card p-6">
                <h3 className="font-semibold mb-2">Batista</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Autoridade da Escritura, regeneração pessoal, credismo, 
                  separação igreja/estado.
                </p>
                <div className="flex flex-wrap gap-1">
                  {['Spurgeon', 'Carson', 'Moderne'].map(p => (
                    <span key={p} className="text-[10px] px-2 py-0.5 bg-muted rounded-full text-muted-foreground">
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
