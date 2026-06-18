'use client';

import { useState, useEffect } from 'react';
import { Cabeçalho } from '@/components/layout/cabecalho';
import { Rodapé } from '@/components/layout/rodape';
import { Search, Loader2, Users } from 'lucide-react';

const API = process.env.NEXT_PUBLIC_API_URL || 'https://api-production-bb96.up.railway.app/api/v1';

interface Personagem {
  id: string;
  nomePortugues: string;
  nomeOriginal?: string | null;
  nomeHebraico?: string | null;
  nomeGrego?: string | null;
  slug?: string;
  biografia?: string | null;
  significadoNome?: string | null;
}

export default function PersonagensPage() {
  const [personagens, setPersonagens] = useState<Personagem[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(false);
  const [busca, setBusca] = useState('');

  useEffect(() => {
    fetch(`${API}/personagens`)
      .then((r) => r.json())
      .then((d) => {
        setPersonagens(Array.isArray(d) ? d : []);
        setCarregando(false);
      })
      .catch(() => { setErro(true); setCarregando(false); });
  }, []);

  const filtrados = personagens.filter((p) => {
    const q = busca.trim().toLowerCase();
    if (!q) return true;
    return (
      p.nomePortugues?.toLowerCase().includes(q) ||
      p.nomeHebraico?.toLowerCase().includes(q) ||
      p.nomeGrego?.toLowerCase().includes(q) ||
      p.biografia?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-background">
      <Cabeçalho />
      <main className="pt-24">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="mb-10 max-w-3xl">
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-2">Galeria</p>
            <h1 className="font-display text-5xl font-light text-foreground">Personagens Bíblicos</h1>
            <div className="ornamento w-32 mt-4" />
            <p className="font-serif-body text-lg text-muted-foreground mt-6 leading-relaxed">
              Os homens e mulheres por meio de quem Deus teceu a história da redenção.
              Do primeiro Adão ao último apóstolo — cada vida é um fio na tapeçaria da Escritura.
            </p>
          </div>

          <form className="relative mb-10 max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
            <input
              type="text"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Filtrar por nome, nome hebraico ou biografia..."
              className="w-full pl-11 pr-6 py-3 bg-card border border-border text-sm font-serif-body focus:outline-none focus:border-primary transition-colors"
            />
          </form>

          {carregando ? (
            <div className="flex items-center gap-2 text-muted-foreground text-sm py-12">
              <Loader2 className="w-4 h-4 animate-spin" /> Carregando personagens...
            </div>
          ) : erro ? (
            <p className="font-serif-body italic text-muted-foreground py-12 text-center">
              Não foi possível carregar os personagens no momento.
            </p>
          ) : filtrados.length === 0 ? (
            <p className="font-serif-body italic text-muted-foreground py-12 text-center">
              {busca ? `Nenhum personagem encontrado para &laquo;${busca}&raquo;.` : 'Nenhum personagem disponível.'}
            </p>
          ) : (
            <>
              <p className="text-sm text-muted-foreground mb-6">{filtrados.length} personagens</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtrados.map((p) => (
                  <article key={p.id} className="sola-card p-7 flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-display text-3xl text-primary/40 leading-none">
                        {p.nomePortugues?.charAt(0) || <Users className="w-5 h-5" strokeWidth={1} />}
                      </span>
                      {p.significadoNome && (
                        <span className="text-[10px] tracking-widest uppercase text-muted-foreground text-right max-w-[60%]">
                          {p.significadoNome}
                        </span>
                      )}
                    </div>

                    <h3 className="font-display text-2xl font-semibold text-foreground">{p.nomePortugues}</h3>
                    {(p.nomeHebraico || p.nomeGrego) && (
                      <p className="font-serif-body italic text-sm text-muted-foreground mt-1" dir={p.nomeHebraico ? 'rtl' : 'ltr'}>
                        {p.nomeHebraico || p.nomeGrego}
                      </p>
                    )}

                    {p.biografia && (
                      <p className="font-serif-body text-sm text-foreground/80 leading-relaxed mt-4 flex-1">
                        {p.biografia}
                      </p>
                    )}
                  </article>
                ))}
              </div>
            </>
          )}
        </div>
      </main>
      <Rodapé />
    </div>
  );
}
