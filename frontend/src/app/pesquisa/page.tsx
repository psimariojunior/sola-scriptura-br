'use client';

import { useState } from 'react';
import { MainNav } from '@/components/layout/main-nav';
import { Search } from 'lucide-react';

export default function PesquisaPage() {
  const [consulta, setConsulta] = useState('');
  const [resultados, setResultados] = useState<any[]>([]);
  const [buscando, setBuscando] = useState(false);

  async function handlePesquisa(e: React.FormEvent) {
    e.preventDefault();
    if (!consulta.trim()) return;
    setBuscando(true);
    try {
      const response = await fetch(`/api/biblia/pesquisar?q=${encodeURIComponent(consulta)}`);
      const dados = await response.json();
      setResultados(dados);
    } catch (erro) {
      console.error('Erro na pesquisa:', erro);
      setResultados([]);
    } finally {
      setBuscando(false);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <MainNav />
      <main className="container mx-auto px-4 pt-24">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Pesquisa Bíblica</h1>
          <form onSubmit={handlePesquisa} className="mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={consulta}
                onChange={(e) => setConsulta(e.target.value)}
                placeholder="Pesquise por palavra, frase, tema, pessoa, cidade..."
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </form>
          {buscando && <p className="text-center text-gray-500">Buscando...</p>}
          <div className="space-y-4">
            {resultados.map((r: any, idx: number) => (
              <div key={idx} className="p-4 bg-card rounded-lg border shadow-sm">
                <p className="text-lg font-serif">{r.texto}</p>
                <p className="text-sm text-gray-500 mt-2">
                  {r.livro} {r.capitulo}:{r.versiculo}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
