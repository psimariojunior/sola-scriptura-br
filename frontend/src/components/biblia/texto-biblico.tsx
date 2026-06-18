'use client';

import { useState, useEffect, useCallback } from 'react';
import { BookOpen, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';

interface Versiculo {
  id?: string;
  numero: number;
  texto: string;
}

interface Props {
  livro: any;
  traducao: string;
  apiUrl?: string;
}

const API_DEFAULT = process.env.NEXT_PUBLIC_API_URL || 'https://api-production-bb96.up.railway.app/api/v1';

export function TextoBiblico({ livro, traducao, apiUrl }: Props) {
  const API = apiUrl || API_DEFAULT;
  const [capitulo, setCapitulo] = useState<number | null>(null);
  const [versiculos, setVersiculos] = useState<Versiculo[]>([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');

  const buscarCapitulo = useCallback(async (cap: number) => {
    setCapitulo(cap);
    setCarregando(true);
    setErro('');
    setVersiculos([]);
    try {
      const r = await fetch(`${API}/biblia/passagem/${livro.id}/${cap}/1/200`);
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const dados = await r.json();
      setVersiculos(Array.isArray(dados) ? dados : []);
    } catch {
      setErro('Não foi possível carregar este capítulo.');
    } finally {
      setCarregando(false);
    }
  }, [API, livro]);

  useEffect(() => {
    setCapitulo(null);
    setVersiculos([]);
    setErro('');
  }, [livro?.id]);

  useEffect(() => {
    if (livro && capitulo == null && livro.totalCapitulos > 0) {
      buscarCapitulo(1);
    }
  }, [livro, capitulo, buscarCapitulo]);

  if (!livro) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <BookOpen className="w-10 h-10 text-primary/30 mb-4" strokeWidth={1} />
        <p className="font-display text-2xl text-muted-foreground italic">
          Selecione um livro para iniciar a leitura
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          66 livros disponíveis · Antigo e Novo Testamento
        </p>
      </div>
    );
  }

  const totalCap = livro.totalCapitulos || 0;

  return (
    <article>
      <div className="mb-8 pb-6 border-b border-border/40">
        <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-1">
          {traducao || 'NVI'}
        </p>
        <h2 className="font-display text-4xl font-light text-foreground">{livro.nome}</h2>
        <p className="font-serif-body text-sm text-muted-foreground mt-2">
          {livro.autor} · {livro.dataEscrita} · {totalCap} {totalCap === 1 ? 'capítulo' : 'capítulos'}
        </p>
        {livro.temasPrincipais && (
          <p className="font-serif-body italic text-muted-foreground mt-2 max-w-2xl">
            {livro.temasPrincipais}
          </p>
        )}
      </div>

      <div className="mb-10">
        <p className="text-xs tracking-widest uppercase text-muted-foreground mb-3">Capítulos</p>
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: totalCap }, (_, i) => (
            <button
              key={i}
              onClick={() => buscarCapitulo(i + 1)}
              className={`w-10 h-10 flex items-center justify-center text-sm border font-serif-body transition-colors ${
                capitulo === i + 1
                  ? 'border-primary text-primary bg-primary/10 font-semibold'
                  : 'border-border text-foreground/70 hover:border-primary hover:text-primary'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      {capitulo != null && (
        <div className="mb-8 flex items-center justify-between">
          <button
            onClick={() => capitulo > 1 && buscarCapitulo(capitulo - 1)}
            disabled={capitulo <= 1}
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors disabled:opacity-30"
          >
            <ChevronLeft className="w-4 h-4" strokeWidth={1.5} /> Anterior
          </button>
          <p className="font-display text-lg italic text-foreground">
            {livro.nome} {capitulo}
          </p>
          <button
            onClick={() => capitulo < totalCap && buscarCapitulo(capitulo + 1)}
            disabled={capitulo >= totalCap}
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors disabled:opacity-30"
          >
            Próximo <ChevronRight className="w-4 h-4" strokeWidth={1.5} />
          </button>
        </div>
      )}

      <div className="sola-card p-8 md:p-12">
        {carregando ? (
          <div className="flex items-center gap-2 text-muted-foreground text-sm py-16 justify-center">
            <Loader2 className="w-4 h-4 animate-spin" /> Carregando capítulo {capitulo}...
          </div>
        ) : erro ? (
          <p className="font-serif-body italic text-muted-foreground text-center py-16">{erro}</p>
        ) : versiculos.length === 0 ? (
          <p className="font-serif-body italic text-muted-foreground text-center py-16">
            O texto deste capítulo ainda não foi adicionado ao banco.
            <br />
            <span className="text-sm">A estrutura de {totalCap} {totalCap === 1 ? 'capítulo está pronta' : 'capítulos está pronta'}.</span>
          </p>
        ) : (
          <div className="texto-sagrado text-foreground">
            {versiculos.map((v) => (
              <p key={v.id || v.numero} className="mb-2">
                <sup className="font-sans text-xs font-semibold text-primary/70 mr-1 tabular-nums">
                  {v.numero}
                </sup>
                {v.texto}
              </p>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
