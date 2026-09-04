'use client';

import { Suspense, useCallback, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { PageShell } from '@/components/layout/PageShell';
import { InterlinearView } from '@/components/InterlinearView';
import { TODOS_LIVROS } from '@/data/biblia/livros';
import { resolverLivroParam } from '@/lib/bibliaHref';
import { carregarCapitulo } from '@/lib/apresentacao/versiculos';
import { ChevronLeft, ChevronRight, Minus, Plus } from 'lucide-react';

const FONT_PRESETS = [
  { label: 'P', size: 14, desc: 'Pequena' },
  { label: 'M', size: 16, desc: 'Média' },
  { label: 'G', size: 18, desc: 'Grande' },
  { label: 'XG', size: 22, desc: 'Extra Grande' },
  { label: 'XXG', size: 28, desc: 'Muito Grande' },
];
const FONT_MIN = 12;
const FONT_MAX = 36;

function InterlinearClient() {
  const params = useSearchParams();
  const router = useRouter();
  const fallback = TODOS_LIVROS.find((l) => l.abreviacao === 'jo') ?? TODOS_LIVROS[0];
  const info = resolverLivroParam(params.get('livro')) ?? fallback;
  const livro = TODOS_LIVROS.find((l) => l.abreviacao === info.abreviacao) ?? fallback;
  const capParam = parseInt(params.get('capitulo') || params.get('cap') || '1', 10);
  const capitulo = Number.isFinite(capParam)
    ? Math.min(Math.max(capParam, 1), livro.totalCapitulos)
    : 1;

  const versoParam = parseInt(params.get('verso') || params.get('versiculo') || '', 10);
  const versoFoco = Number.isFinite(versoParam) && versoParam > 0 ? versoParam : undefined;

  const [versiculos, setVersiculos] = useState<{ numero: number; texto: string }[]>([]);
  const [carregando, setCarregando] = useState(true);

  const [fontSize, setFontSize] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('ssb_interlinear_font_size');
      if (stored) {
        const n = parseInt(stored, 10);
        if (n >= FONT_MIN && n <= FONT_MAX) return n;
      }
    }
    return 18;
  });

  const handleFontSizeChange = useCallback((size: number) => {
    const clamped = Math.max(FONT_MIN, Math.min(FONT_MAX, size));
    setFontSize(clamped);
    localStorage.setItem('ssb_interlinear_font_size', String(clamped));
  }, []);

  useEffect(() => {
    let cancel = false;
    setCarregando(true);
    carregarCapitulo(livro.abreviacao, capitulo, 'arc')
      .then((vs) => {
        if (!cancel) setVersiculos(vs ?? []);
      })
      .finally(() => {
        if (!cancel) setCarregando(false);
      });
    return () => {
      cancel = true;
    };
  }, [livro.abreviacao, capitulo]);

  const ir = useCallback(
    (abrev: string, cap: number) => {
      router.replace(`/biblia/interlinear?livro=${abrev}&capitulo=${cap}`);
    },
    [router],
  );

  return (
    <PageShell maxWidth="4xl">
      <div className="py-6">
        <p className="text-sm font-semibold uppercase tracking-wider text-[var(--brand-default)] mb-1">
          Interlinear
        </p>
        <h1 className="text-2xl font-display font-semibold text-[var(--content-primary)] mb-2">
          {livro.nome} {capitulo} — hebraico e grego palavra a palavra
        </h1>
        <p className="text-sm text-[var(--content-muted)] mb-4 max-w-2xl">
            Cada coluna é uma palavra: original em cima, sentido inteiro no meio, Strong embaixo.
            Toque um lema para ver ocorrências no livro, o mesmo verso nas traduções locais e o eco
            canônico. Palavras raras neste livro ficam no topo.
        </p>

        {/* Controles: Seletor de livro + capitulo + tamanho de fonte */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <select
            value={livro.abreviacao}
            onChange={(e) => ir(e.target.value, 1)}
            className="min-h-[44px] px-3 rounded-xl border border-[var(--border)] bg-[var(--surface-raised)] text-[var(--content-primary)]"
            aria-label="Livro"
          >
            {TODOS_LIVROS.map((l) => (
              <option key={l.abreviacao} value={l.abreviacao}>
                {l.nome}
              </option>
            ))}
          </select>
          <button
            type="button"
            className="min-h-[44px] min-w-[44px] rounded-xl border border-[var(--border)] flex items-center justify-center"
            onClick={() => ir(livro.abreviacao, Math.max(1, capitulo - 1))}
            aria-label="Capítulo anterior"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-sm tabular-nums text-[var(--content-muted)]">
            {capitulo} / {livro.totalCapitulos}
          </span>
          <button
            type="button"
            className="min-h-[44px] min-w-[44px] rounded-xl border border-[var(--border)] flex items-center justify-center"
            onClick={() => ir(livro.abreviacao, Math.min(livro.totalCapitulos, capitulo + 1))}
            aria-label="Próximo capítulo"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Controle de tamanho de fonte */}
        <div className="flex flex-wrap items-center gap-2 mb-6 p-2.5 rounded-xl bg-[var(--surface-sunken)]/50 border border-[var(--border)]/30">
          <span className="text-xs font-medium text-[var(--content-muted)]">Fonte:</span>
          <div className="flex items-center gap-1">
            {FONT_PRESETS.map((preset) => (
              <button
                key={preset.label}
                type="button"
                onClick={() => handleFontSizeChange(preset.size)}
                className={`min-h-[36px] min-w-[36px] px-2 rounded-lg text-xs font-bold transition-all ${
                  fontSize === preset.size
                    ? 'bg-[var(--brand-default)] text-[var(--brand-foreground)] shadow-sm'
                    : 'bg-[var(--surface-raised)] text-[var(--content-muted)] hover:text-[var(--content-primary)] hover:bg-[var(--surface-raised)]/80'
                }`}
                title={`${preset.desc} (${preset.size}px)`}
              >
                {preset.label}
              </button>
            ))}
          </div>
          <span className="w-px h-5 bg-[var(--border)] mx-1" />
          <button
            type="button"
            onClick={() => handleFontSizeChange(fontSize - 2)}
            className="w-9 h-9 rounded-lg bg-[var(--surface-raised)] hover:bg-[var(--surface-raised)]/80 flex items-center justify-center active:scale-95 transition-all"
            aria-label="Diminuir fonte"
          >
            <Minus className="w-3.5 h-3.5 text-[var(--content-primary)]" />
          </button>
          <div className="w-20 relative">
            <div className="h-1.5 rounded-full bg-[var(--border)]/40 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[var(--brand-default)] to-[var(--brand-hover)] transition-all duration-150"
                style={{ width: `${((fontSize - FONT_MIN) / (FONT_MAX - FONT_MIN)) * 100}%` }}
              />
            </div>
            <input
              type="range"
              min={FONT_MIN}
              max={FONT_MAX}
              value={fontSize}
              onChange={(e) => handleFontSizeChange(Number(e.target.value))}
              className="absolute inset-0 w-full opacity-0 cursor-pointer"
              aria-label="Tamanho da fonte"
            />
          </div>
          <button
            type="button"
            onClick={() => handleFontSizeChange(fontSize + 2)}
            className="w-9 h-9 rounded-lg bg-[var(--surface-raised)] hover:bg-[var(--surface-raised)]/80 flex items-center justify-center active:scale-95 transition-all"
            aria-label="Aumentar fonte"
          >
            <Plus className="w-3.5 h-3.5 text-[var(--content-primary)]" />
          </button>
          <span className="font-mono text-xs w-8 text-center tabular-nums text-[var(--content-primary)] font-medium">{fontSize}</span>
        </div>

        {carregando ? (
          <p className="text-[var(--content-muted)]">Carregando o capítulo…</p>
        ) : (
          <InterlinearView
            versiculos={versiculos}
            livro={livro.abreviacao}
            capitulo={capitulo}
            traducao="arc"
            fontSize={fontSize}
            versoFoco={versoFoco}
          />
        )}
      </div>
    </PageShell>
  );
}

export default function InterlinearPage() {
  return (
    <Suspense fallback={<PageShell maxWidth="4xl"><p className="py-8 text-[var(--content-muted)]">Carregando interlinear…</p></PageShell>}>
      <InterlinearClient />
    </Suspense>
  );
}
