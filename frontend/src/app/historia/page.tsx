'use client';

import { useState, useEffect } from 'react';
import { Cabeçalho } from '@/components/layout/cabecalho';
import { Rodapé } from '@/components/layout/rodape';
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
  const n = typeof v === 'number' ? v : parseFloat(v);
  return Number.isFinite(n) ? n : null;
}

function anoLabel(e: Evento): string {
  if (e.anoInicio == null) return '—';
  const abs = Math.abs(e.anoInicio);
  return e.era === 'AC' ? `${abs} a.C.` : `${abs} d.C.`;
}

function MapaGeografia({ locais, ativo, onSelecionar }: { locais: Localizacao[]; ativo: Localizacao | null; onSelecionar: (l: Localizacao) => void }) {
  const pontos = locais
    .map((l) => ({ l, lat: num(l.latitude), lng: num(l.longitude) }))
    .filter((p) => p.lat != null && p.lng != null);

  if (pontos.length === 0) {
    return (
      <p className="font-serif-body italic text-sm text-muted-foreground py-8 text-center">
        Sem coordenadas geográficas disponíveis.
      </p>
    );
  }

  const lats = pontos.map((p) => p.lat as number);
  const lngs = pontos.map((p) => p.lng as number);
  const minLat = Math.min(...lats), maxLat = Math.max(...lats);
  const minLng = Math.min(...lngs), maxLng = Math.max(...lngs);
  const padLat = (maxLat - minLat) * 0.1 || 1;
  const padLng = (maxLng - minLng) * 0.1 || 1;

  const pos = (lat: number, lng: number) => {
    const top = ((maxLat + padLat - lat) / (maxLat - minLat + 2 * padLat)) * 100;
    const left = ((lng - minLng + padLng) / (maxLng - minLng + 2 * padLng)) * 100;
    return { top: Math.max(4, Math.min(96, top)), left: Math.max(4, Math.min(96, left)) };
  };

  return (
    <div className="relative w-full aspect-[4/3] bg-secondary/30 border border-border overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
      {pontos.map(({ l, lat, lng }) => {
        const { top, left } = pos(lat as number, lng as number);
        const sel = ativo?.id === l.id;
        return (
          <button
            key={l.id}
            onClick={() => onSelecionar(l)}
            className="absolute -translate-x-1/2 -translate-y-1/2 group"
            style={{ top: `${top}%`, left: `${left}%` }}
            title={l.nomePortugues}
          >
            <span
              className={`block rounded-full transition-all ${sel ? 'w-3 h-3' : 'w-2 h-2 group-hover:w-3 group-hover:h-3'}`}
              style={{
                backgroundColor: sel ? 'hsl(var(--burgundy))' : 'hsl(var(--gold))',
                boxShadow: sel ? '0 0 0 4px hsl(var(--burgundy) / 0.2)' : 'none',
              }}
            />
            <span className={`absolute left-1/2 -translate-x-1/2 top-3 whitespace-nowrap text-[10px] font-medium tracking-wide transition-opacity ${sel ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
              style={{ color: 'hsl(var(--foreground))' }}
            >
              {l.nomePortugues}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default function HistoriaPage() {
  const [locais, setLocais] = useState<Localizacao[]>([]);
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(false);
  const [ativo, setAtivo] = useState<Localizacao | null>(null);

  useEffect(() => {
    Promise.all([
      fetch(`${API}/geografia/localizacoes`).then((r) => r.json()),
      fetch(`${API}/cronologia/linha-do-tempo`).then((r) => r.json()),
    ]).then(([g, c]) => {
      setLocais(Array.isArray(g) ? g : []);
      setEventos(Array.isArray(c) ? c : []);
      setCarregando(false);
    }).catch(() => { setErro(true); setCarregando(false); });
  }, []);

  const eventosOrdenados = eventos
    .slice()
    .sort((a, b) => (a.anoInicio ?? 0) - (b.anoInicio ?? 0));

  return (
    <div className="min-h-screen bg-background">
      <Cabeçalho />
      <main className="pt-24">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="mb-14 max-w-3xl">
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-2">Mundo Bíblico</p>
            <h1 className="font-display text-5xl font-light text-foreground">História & Geografia</h1>
            <div className="ornamento w-32 mt-4" />
            <p className="font-serif-body text-lg text-muted-foreground mt-6 leading-relaxed">
              O texto sagrado aconteceu em um tempo e lugar. Aqui se cruzam o mapa do mundo bíblico
              e a linha do tempo dos grandes eventos da redenção.
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
                  <h2 className="font-display text-3xl font-medium text-primary whitespace-nowrap">Atlas Bíblico</h2>
                  <div className="flex-1 h-px bg-border/60" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
                  <div>
                    <MapaGeografia locais={locais} ativo={ativo} onSelecionar={setAtivo} />
                    <p className="font-serif-body italic text-xs text-muted-foreground mt-3">
                      Cada ponto marca uma localização com coordenadas conhecidas. Clique para detalhes.
                    </p>
                  </div>

                  <aside className="space-y-3 lg:max-h-[420px] lg:overflow-y-auto pr-1">
                    {locais.map((l) => (
                      <button
                        key={l.id}
                        onClick={() => setAtivo(l)}
                        className={`w-full text-left p-4 border transition-colors ${ativo?.id === l.id ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/40'}`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <MapPin className="w-3.5 h-3.5 text-primary/60 shrink-0" strokeWidth={1.5} />
                          <span className="font-display text-base font-semibold text-foreground">{l.nomePortugues}</span>
                        </div>
                        <p className="text-xs text-muted-foreground tabular-nums">
                          {num(l.latitude)?.toFixed(2)}, {num(l.longitude)?.toFixed(2)}
                          {l.regiao ? ` · ${l.regiao}` : ''}
                        </p>
                      </button>
                    ))}
                  </aside>
                </div>

                {ativo && (
                  <article className="sola-card p-8 mt-8">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <p className="text-xs tracking-widest uppercase text-muted-foreground mb-1">{ativo.tipo || 'Localização'}</p>
                        <h3 className="font-display text-2xl font-semibold text-foreground">{ativo.nomePortugues}</h3>
                        {(ativo.nomeHebraico || ativo.nomeGrego) && (
                          <p className="font-serif-body italic text-sm text-muted-foreground mt-1">
                            {ativo.nomeHebraico || ativo.nomeGrego}
                          </p>
                        )}
                      </div>
                      <span className="text-sm tabular-nums text-muted-foreground">
                        {num(ativo.latitude)?.toFixed(4)}, {num(ativo.longitude)?.toFixed(4)}
                      </span>
                    </div>
                    {ativo.descricao && (
                      <p className="font-serif-body text-base text-foreground/80 leading-relaxed mt-4">{ativo.descricao}</p>
                    )}
                    {ativo.paisAtual && (
                      <p className="text-xs tracking-widest uppercase text-muted-foreground mt-4">
                        Local atual · {ativo.paisAtual}
                      </p>
                    )}
                  </article>
                )}
              </section>

              <section>
                <div className="flex items-center gap-4 mb-8">
                  <h2 className="font-display text-3xl font-medium text-primary whitespace-nowrap">Linha do Tempo</h2>
                  <div className="flex-1 h-px bg-border/60" />
                </div>

                <div className="relative pl-10">
                  <div className="absolute left-[14px] top-2 bottom-2 w-px bg-border" />
                  <div className="space-y-8">
                    {eventosOrdenados.map((e) => (
                      <div key={e.id} className="relative">
                        <span
                          className="absolute -left-[26px] top-1.5 w-3 h-3 rounded-full border-2 border-background"
                          style={{ backgroundColor: 'hsl(var(--gold))' }}
                        />
                        <div className="sola-card p-6">
                          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-2">
                            <span className="font-display text-2xl font-medium text-primary tabular-nums">{anoLabel(e)}</span>
                            <span className="text-xs tracking-widest uppercase text-muted-foreground">{e.era}</span>
                            {e.categoria && (
                              <span className="text-xs px-2 py-0.5 bg-secondary text-muted-foreground">{e.categoria}</span>
                            )}
                          </div>
                          <h3 className="font-display text-xl font-semibold text-foreground mb-2">{e.nome}</h3>
                          {e.descricao && (
                            <p className="font-serif-body text-sm text-foreground/80 leading-relaxed">{e.descricao}</p>
                          )}
                          {e.referenciasBiblicas && e.referenciasBiblicas.length > 0 && (
                            <p className="text-xs tracking-widest uppercase text-muted-foreground mt-3 pt-3 border-t border-border/40">
                              Referência · <span style={{ color: 'hsl(var(--burgundy))' }}>{e.referenciasBiblicas.join(', ')}</span>
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
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
