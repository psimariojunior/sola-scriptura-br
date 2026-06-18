'use client';

import { useState, useEffect } from 'react';
import { Cabeçalho } from '@/components/layout/cabecalho';
import { Rodapé } from '@/components/layout/rodape';
import { MapaBiblico } from '@/components/biblia/mapa-biblico';
import { Loader2, MapPin } from 'lucide-react';

const API = process.env.NEXT_PUBLIC_API_URL || 'https://api-production-bb96.up.railway.app/api/v1';

interface Localizacao {
  id: string;
  nomePortugues: string;
  nomeOriginal?: string | null;
  nomeHebraico?: string | null;
  nomeGrego?: string | null;
  slug?: string;
  tipo?: string | null;
  latitude: string | number | null;
  longitude: string | number | null;
  regiao?: string | null;
  paisAtual?: string | null;
  descricao?: string | null;
}

interface Evento {
  id: string;
  nome: string;
  slug?: string;
  categoria?: string | null;
  descricao?: string | null;
  anoInicio: number | null;
  anoFim?: number | null;
  era: string;
  referenciasBiblicas?: string[] | null;
}

function num(v: string | number | null | undefined): number | null {
  if (v == null) return null;
  const n = typeof v === 'number' ? v : parseFloat(String(v));
  return Number.isFinite(n) ? n : null;
}

function anoLabel(e: Evento): string {
  if (e.anoInicio == null) return '—';
  const abs = Math.abs(e.anoInicio);
  return e.era === 'AC' ? `${abs} a.C.` : `${abs} d.C.`;
}

export default function HistoriaPage() {
  const [locais, setLocais] = useState<Localizacao[]>([]);
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch(`${API}/geografia/localizacoes`).then((r) => r.json()),
      fetch(`${API}/cronologia/linha-do-tempo`).then((r) => r.json()),
    ])
      .then(([g, c]) => {
        setLocais(Array.isArray(g) ? g : []);
        setEventos(Array.isArray(c) ? c : []);
        setCarregando(false);
      })
      .catch(() => {
        setErro(true);
        setCarregando(false);
      });
  }, []);

  const eventosOrdenados = eventos
    .slice()
    .sort((a, b) => (a.anoInicio ?? 0) - (b.anoInicio ?? 0));

  const pontosMapa = locais.map((l) => ({
    nomePortugues: l.nomePortugues,
    latitude: l.latitude,
    longitude: l.longitude,
    descricao: l.descricao,
    slug: l.slug,
  }));

  return (
    <div className="min-h-screen bg-background">
      <Cabeçalho />
      <main className="pt-24">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="mb-14 max-w-3xl">
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-2">
              Mundo Bíblico
            </p>
            <h1 className="font-display text-5xl font-light text-foreground">
              História &amp; Geografia
            </h1>
            <div className="ornamento w-32 mt-4" />
            <p className="font-serif-body text-lg text-muted-foreground mt-6 leading-relaxed">
              O texto sagrado aconteceu em um tempo e lugar. Aqui se cruzam o mapa do mundo bíblico
              e a linha do tempo dos grandes eventos da redenção — da criação à consumação.
            </p>
          </div>

          {carregando ? (
            <div className="flex items-center gap-2 text-muted-foreground text-sm py-12">
              <Loader2 className="w-4 h-4 animate-spin" /> Carregando geografia e cronologia...
            </div>
          ) : erro ? (
            <p className="font-serif-body italic text-muted-foreground py-12 text-center">
              Não foi possível carregar os dados históricos no momento.
            </p>
          ) : (
            <div className="space-y-24">
              <section>
                <div className="flex items-center gap-4 mb-8">
                  <h2 className="font-display text-3xl font-medium text-primary whitespace-nowrap">
                    Mapa Bíblico Interativo
                  </h2>
                  <div className="flex-1 h-px bg-border/60" />
                </div>

                <MapaBiblico localizacoes={pontosMapa} />
                <p className="font-serif-body italic text-xs text-muted-foreground mt-3">
                  Cada marcador assinala uma localização com coordenadas conhecidas. Clique para
                  ver nome e descrição. O mapa centra-se em Israel.
                </p>
              </section>

              <section>
                <div className="flex items-center gap-4 mb-8">
                  <h2 className="font-display text-3xl font-medium text-primary whitespace-nowrap">
                    Localizações
                  </h2>
                  <div className="flex-1 h-px bg-border/60" />
                </div>

                {locais.length === 0 ? (
                  <p className="font-serif-body italic text-muted-foreground py-8 text-center">
                    Nenhuma localização disponível.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {locais.map((l) => {
                      const lat = num(l.latitude);
                      const lng = num(l.longitude);
                      return (
                        <article key={l.id} className="sola-card p-6">
                          <div className="flex items-start gap-3 mb-3">
                            <MapPin
                              className="w-4 h-4 text-primary/60 shrink-0 mt-1"
                              strokeWidth={1.5}
                            />
                            <div>
                              <p className="text-[10px] tracking-widest uppercase text-muted-foreground mb-1">
                                {l.tipo || 'Localização'}
                              </p>
                              <h3 className="font-display text-xl font-semibold text-foreground leading-tight">
                                {l.nomePortugues}
                              </h3>
                              {(l.nomeHebraico || l.nomeGrego) && (
                                <p className="font-serif-body italic text-sm text-muted-foreground mt-1">
                                  {l.nomeHebraico || l.nomeGrego}
                                </p>
                              )}
                            </div>
                          </div>

                          <p className="text-xs text-muted-foreground tabular-nums mb-3">
                            {lat != null && lng != null
                              ? `${lat.toFixed(4)}, ${lng.toFixed(4)}`
                              : 'Coordenadas indisponíveis'}
                            {l.regiao ? ` · ${l.regiao}` : ''}
                            {l.paisAtual ? ` · ${l.paisAtual}` : ''}
                          </p>

                          {l.descricao && (
                            <p className="font-serif-body text-sm text-foreground/80 leading-relaxed">
                              {l.descricao}
                            </p>
                          )}
                        </article>
                      );
                    })}
                  </div>
                )}
              </section>

              <section>
                <div className="flex items-center gap-4 mb-8">
                  <h2 className="font-display text-3xl font-medium text-primary whitespace-nowrap">
                    Linha do Tempo
                  </h2>
                  <div className="flex-1 h-px bg-border/60" />
                </div>

                <div className="relative pl-10">
                  <div className="absolute left-[14px] top-2 bottom-2 w-px bg-border" />
                  <div className="space-y-8">
                    {eventosOrdenados.length === 0 ? (
                      <p className="font-serif-body italic text-muted-foreground py-8 text-center">
                        Nenhum evento cronológico disponível.
                      </p>
                    ) : (
                      eventosOrdenados.map((e) => (
                        <div key={e.id} className="relative">
                          <span
                            className="absolute -left-[26px] top-1.5 w-3 h-3 rounded-full border-2 border-background"
                            style={{ backgroundColor: 'hsl(var(--gold))' }}
                          />
                          <div className="sola-card p-6">
                            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-2">
                              <span className="font-display text-2xl font-medium text-primary tabular-nums">
                                {anoLabel(e)}
                              </span>
                              <span className="text-xs tracking-widest uppercase text-muted-foreground">
                                {e.era}
                              </span>
                              {e.categoria && (
                                <span className="text-xs px-2 py-0.5 bg-secondary text-muted-foreground">
                                  {e.categoria}
                                </span>
                              )}
                            </div>
                            <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                              {e.nome}
                            </h3>
                            {e.descricao && (
                              <p className="font-serif-body text-sm text-foreground/80 leading-relaxed">
                                {e.descricao}
                              </p>
                            )}
                            {e.referenciasBiblicas && e.referenciasBiblicas.length > 0 && (
                              <p className="text-xs tracking-widest uppercase text-muted-foreground mt-3 pt-3 border-t border-border/40">
                                Referência ·{' '}
                                <span style={{ color: 'hsl(var(--burgundy))' }}>
                                  {e.referenciasBiblicas.join(', ')}
                                </span>
                              </p>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </section>
            </div>
          )}
        </div>
      </main>
      <Rodapé />
    </div>
  );
}
