'use client';

import { useState, useEffect } from 'react';
import { Cabeçalho } from '@/components/layout/cabecalho';
import { Rodapé } from '@/components/layout/rodape';
import { LivroNavegacao } from '@/components/biblia/livro-navegacao';
import { TextoBiblico } from '@/components/biblia/texto-biblico';
import { SeletorTraducao } from '@/components/biblia/seletor-traducao';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

export default function BibliaPage() {
  const [testamentos, setTestamentos] = useState<any[]>([]);
  const [livros, setLivros] = useState<any[]>([]);
  const [traducoes, setTraducoes] = useState<any[]>([]);
  const [livroSel, setLivroSel] = useState<any>(null);
  const [traducaoSel, setTraducaoSel] = useState<string>('');
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(`${API}/biblia/testamentos`).then((r) => r.json()),
      fetch(`${API}/biblia/livros`).then((r) => r.json()),
      fetch(`${API}/biblia/traducoes`).then((r) => r.json()),
    ]).then(([t, l, tr]) => {
      setTestamentos(Array.isArray(t) ? t : []);
      setLivros(Array.isArray(l) ? l : []);
      setTraducoes(Array.isArray(tr) ? tr : []);
      setCarregando(false);
    }).catch(() => setCarregando(false));
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Cabeçalho />
      <main className="pt-24">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="mb-10">
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-2">Texto Sagrado</p>
            <h1 className="font-display text-5xl font-light text-foreground">Bíblia</h1>
            <div className="ornamento w-32 mt-4" />
          </div>

          {traducoes.length > 0 && (
            <div className="mb-8">
              <SeletorTraducao traducoes={traducoes} valor={traducaoSel} onChange={setTraducaoSel} />
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12">
            <aside>
              <LivroNavegacao
                testamentos={testamentos}
                livros={livros}
                selecionado={livroSel}
                onSelecionar={setLivroSel}
                carregando={carregando}
              />
            </aside>

            <div>
              <TextoBiblico livro={livroSel} traducao={traducaoSel} />
            </div>
          </div>
        </div>
      </main>
      <Rodapé />
    </div>
  );
}
