'use client';

import { useState, useEffect } from 'react';
import { Cabeçalho } from '@/components/layout/cabecalho';
import { Rodapé } from '@/components/layout/rodape';
import { Loader2 } from 'lucide-react';

const API = process.env.NEXT_PUBLIC_API_URL || 'https://api-production-bb96.up.railway.app/api/v1';

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

function anoAbs(e: Evento): number {
  return e.anoInicio == null ? 0 : Math.abs(e.anoInicio);
}

function anoLabel(e: Evento): string {
  if (e.anoInicio == null) return '—';
  return e.era === 'AC' ? `${Math.abs(e.anoInicio)} a.C.` : `${Math.abs(e.anoInicio)} d.C.`;
}

function ItemTimeline({ e, lado }: { e: Evento; lado: 'left' | 'right' }) {
  return (
    <div className="relative flex md:items-center">
      {lado === 'right' && <div className="hidden md:block md:w-1/2" />}
      <span
        className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 w-3.5 h-3.5 rounded-full border-2 border-background z-10"
        style={{ backgroundColor: 'hsl(var(--gold))' }}
      />
      <div className={`w-full md:w-1/2 pl-10 md:pl-0 ${lado === 'left' ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
        <div className="sola-card p-6">
          <div className={`flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2 ${lado === 'left' ? 'md:justify-end' : ''}`}>
            <span className="font-display text-2xl font-medium text-primary tabular-nums">{anoLabel(e)}</span>
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
              <span style={{ color: 'hsl(var(--burgundy))' }}>{e.referenciasBiblicas.join(', ')}</span>
            </p>
          )}
        </div>
      </div>
      {lado === 'left' && <div className="hidden md:block md:w-1/2" />}
    </div>
  );
}

export default function CronologiaPage() {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    fetch(`${API}/cronologia/linha-do-tempo`)
      .then((r) => r.json())
      .then((d) => {
        setEventos(Array.isArray(d) ? d : []);
        setCarregando(false);
      })
      .catch(() => { setErro(true); setCarregando(false); });
  }, []);

  const ac = eventos.filter((e) => e.era === 'AC').sort((a, b) => (a.anoInicio ?? 0) - (b.anoInicio ?? 0));
  const dc = eventos.filter((e) => e.era !== 'AC').sort((a, b) => (a.anoInicio ?? 0) - (b.anoInicio ?? 0));

  return (
    <div className="min-h-screen bg-background">
      <Cabeçalho />
      <main className="pt-24">
        <div className="max-w-5xl mx-auto px-6 py-12">
          <div className="mb-14 text-center">
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-2">Linha do Tempo</p>
            <h1 className="font-display text-5xl font-light text-foreground">Cronologia Bíblica</h1>
            <div className="ornamento w-32 mx-auto mt-4" />
            <p className="font-serif-body text-lg text-muted-foreground mt-6 max-w-2xl mx-auto leading-relaxed">
              Da criação à igreja primitiva — o fio da história sagrada disposto no tempo,
              com a encarnação de Cristo como eixo que divide todas as eras.
            </p>
          </div>

          {carregando ? (
            <div className="flex items-center gap-2 text-muted-foreground text-sm py-12 justify-center">
              <Loader2 className="w-4 h-4 animate-spin" /> Carregando linha do tempo...
            </div>
          ) : erro ? (
            <p className="font-serif-body italic text-muted-foreground py-12 text-center">
              Não foi possível carregar a cronologia no momento.
            </p>
          ) : eventos.length === 0 ? (
            <p className="font-serif-body italic text-muted-foreground py-12 text-center">
              Nenhum evento disponível.
            </p>
          ) : (
            <div className="space-y-20">
              <section>
                <div className="text-center mb-10">
                  <span className="font-display text-sm font-semibold tracking-[0.3em] uppercase text-muted-foreground">
                    Antes de Cristo
                  </span>
                  <p className="text-xs text-muted-foreground mt-1">{ac.length} eventos</p>
                </div>

                <div className="relative">
                  <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-border hidden md:block" />
                  <div className="md:hidden absolute left-[7px] top-0 bottom-0 w-px bg-border" />
                  <div className="space-y-8">
                    {ac.map((e, i) => (
                      <ItemTimeline key={e.id} e={e} lado={i % 2 === 0 ? 'left' : 'right'} />
                    ))}
                  </div>
                </div>
              </section>

              <div className="relative text-center py-6">
                <div className="ornamento w-40 mx-auto mb-4" />
                <p className="font-display text-3xl italic text-primary">Encarnação</p>
                <p className="font-serif-body text-sm text-muted-foreground mt-1">
                  O eixo da história — &laquo;O Verbo se fez carne&raquo;
                </p>
                <div className="ornamento w-40 mx-auto mt-4" />
              </div>

              <section>
                <div className="text-center mb-10">
                  <span className="font-display text-sm font-semibold tracking-[0.3em] uppercase text-muted-foreground">
                    Depois de Cristo
                  </span>
                  <p className="text-xs text-muted-foreground mt-1">{dc.length} eventos</p>
                </div>

                <div className="relative">
                  <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-border hidden md:block" />
                  <div className="md:hidden absolute left-[7px] top-0 bottom-0 w-px bg-border" />
                  <div className="space-y-8">
                    {dc.map((e, i) => (
                      <ItemTimeline key={e.id} e={e} lado={i % 2 === 0 ? 'right' : 'left'} />
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
