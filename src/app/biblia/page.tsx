'use client';

import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { livros } from '@/data/biblia';
import { BookOpen, ChevronRight, ChevronLeft } from 'lucide-react';

export default function BibliaPage() {
  const [livroIdx, setLivroIdx] = useState(0);
  const [capituloIdx, setCapituloIdx] = useState(0);

  const livro = livros[livroIdx];
  const capitulo = livro?.capitulos[capituloIdx];

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Title */}
          <div className="mb-8">
            <h1 className="font-display text-4xl md:text-5xl font-light mb-2">Bíblia Sagrada</h1>
            <p className="text-muted-foreground">Leitura multi-tradução com navegação completa</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
            {/* Sidebar - Livros */}
            <aside className="sola-card p-4 h-fit lg:sticky lg:top-20 max-h-[calc(100vh-6rem)] overflow-y-auto">
              <h2 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4 px-2">Livros</h2>
              <div className="space-y-1">
                {livros.map((l, i) => (
                  <button
                    key={l.abbreviacao}
                    onClick={() => { setLivroIdx(i); setCapituloIdx(0); }}
                    className={`w-full text-left px-3 py-2 text-sm rounded-sm transition-colors flex items-center gap-2 ${
                      i === livroIdx
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    }`}
                  >
                    <BookOpen className="w-3.5 h-3.5" strokeWidth={1.5} />
                    {l.nome}
                    <span className="ml-auto text-xs opacity-60">{l.totalCapitulos} caps</span>
                  </button>
                ))}
              </div>
            </aside>

            {/* Main Content */}
            <div>
              {/* Book Header */}
              <div className="sola-card p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="font-display text-3xl font-light">{livro.nome}</h2>
                    <p className="text-sm text-muted-foreground">
                      {livro.testamento === 'AT' ? 'Antigo Testamento' : 'Novo Testamento'} · Capítulo {capitulo?.numero}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCapituloIdx(Math.max(0, capituloIdx - 1))}
                      disabled={capituloIdx === 0}
                      className="p-2 border border-border rounded-sm disabled:opacity-30 hover:bg-muted transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="text-sm font-medium px-3">{capituloIdx + 1} / {livro.totalCapitulos}</span>
                    <button
                      onClick={() => setCapituloIdx(Math.min(livro.totalCapitulos - 1, capituloIdx + 1))}
                      disabled={capituloIdx === livro.totalCapitulos - 1}
                      className="p-2 border border-border rounded-sm disabled:opacity-30 hover:bg-muted transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Chapter selector */}
                <div className="flex flex-wrap gap-1">
                  {Array.from({ length: Math.min(livro.totalCapitulos, 50) }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => setCapituloIdx(i)}
                      className={`w-8 h-8 text-xs rounded-sm transition-colors ${
                        i === capituloIdx
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:bg-muted'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              </div>

              {/* Verses */}
              <div className="sola-card p-8">
                {capitulo?.versiculos.map((v) => (
                  <p key={v.numero} className="mb-4 leading-relaxed">
                    <sup className="text-primary font-semibold text-xs mr-1">{v.numero}</sup>
                    <span className="font-serif-body text-lg">{v.texto}</span>
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
