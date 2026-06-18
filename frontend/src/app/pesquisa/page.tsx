'use client';

import { useState } from 'react';
import { Cabeçalho } from '@/components/layout/cabecalho';
import { Rodapé } from '@/components/layout/rodape';
import { Search, Loader2 } from 'lucide-react';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

export default function PesquisaPage() {
  const [consulta, setConsulta] = useState('');
  const [resultados, setResultados] = useState<any[]>([]);
  const [buscando, setBuscando] = useState(false);
  const [buscou, setBuscou] = useState(false);

  async function pesquisar(e: React.FormEvent) {
    e.preventDefault();
    if (!consulta.trim()) return;
    setBuscando(true);
    setBuscou(true);
    try {
      const resp = await fetch(`${API}/biblia/pesquisar?q=${encodeURIComponent(consulta)}`);
      const dados = await resp.json();
      setResultados(Array.isArray(dados) ? dados : []);
    } catch {
      setResultados([]);
    } finally {
      setBuscando(false);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Cabeçalho />
      <main className="pt-24">
        <div className="max-w-3xl mx-auto px-6 py-12">
          <div className="mb-10">
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-2">Busca</p>
            <h1 className="font-display text-5xl font-light text-foreground">Pesquisa Bíblica</h1>
            <div className="ornamento w-32 mt-4" />
          </div>

          <form onSubmit={pesquisar} className="relative mb-12">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" strokeWidth={1.5} />
            <input
              type="text"
              value={consulta}
              onChange={(e) => setConsulta(e.target.value)}
              placeholder="Palavra, frase, tema, pessoa, cidade..."
              className="w-full pl-14 pr-6 py-5 bg-card border border-border text-lg font-serif-body focus:outline-none focus:border-primary transition-colors"
              autoFocus
            />
          </form>

          {buscando && (
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <Loader2 className="w-4 h-4 animate-spin" /> Buscando...
            </div>
          )}

          {buscou && !buscando && resultados.length === 0 && (
            <p className="font-serif-body italic text-muted-foreground text-center py-12">
              Nenhum resultado encontrado para &laquo;{consulta}&raquo;.
              <br />
              <span className="text-sm">Os textos dos versículos serão adicionados em breve.</span>
            </p>
          )}

          {resultados.length > 0 && (
            <div className="space-y-6">
              <p className="text-sm text-muted-foreground">{resultados.length} resultados</p>
              {resultados.map((r, i) => (
                <div key={i} className="sola-card p-6">
                  <p className="texto-sagrado">{r.texto}</p>
                  <p className="text-xs tracking-widest uppercase text-muted-foreground mt-3">
                    {r.livro?.nome} {r.capituloNumero}:{r.numero}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Rodapé />
    </div>
  );
}
