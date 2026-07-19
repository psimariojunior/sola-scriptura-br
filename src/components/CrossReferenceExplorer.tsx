'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { getCrossReferencesByVerse, type CrossReference } from '@/data/biblia/crossReferences';

interface CrossReferenceExplorerProps {
  livro: string;
  capitulo: number;
  verso: number;
  className?: string;
}

const TYPE_LABELS: Record<CrossReference['type'], string> = {
  parallel: 'Paralelo',
  fulfillment: 'Cumprimento',
  quotation: 'Citação',
  contrast: 'Contraste',
  thematic: 'Temático',
  typology: 'Tipologia',
};

const TYPE_COLORS: Record<CrossReference['type'], { bg: string; border: string; text: string; dot: string }> = {
  parallel: { bg: 'bg-emerald-50 dark:bg-emerald-900/20', border: 'border-emerald-200 dark:border-emerald-800', text: 'text-emerald-700 dark:text-emerald-300', dot: 'bg-emerald-400' },
  fulfillment: { bg: 'bg-blue-50 dark:bg-blue-900/20', border: 'border-blue-200 dark:border-blue-800', text: 'text-blue-700 dark:text-blue-300', dot: 'bg-blue-400' },
  quotation: { bg: 'bg-amber-50 dark:bg-amber-900/20', border: 'border-amber-200 dark:border-amber-800', text: 'text-amber-700 dark:text-amber-300', dot: 'bg-amber-400' },
  contrast: { bg: 'bg-rose-50 dark:bg-rose-900/20', border: 'border-rose-200 dark:border-rose-800', text: 'text-rose-700 dark:text-rose-300', dot: 'bg-rose-400' },
  thematic: { bg: 'bg-violet-50 dark:bg-violet-900/20', border: 'border-violet-200 dark:border-violet-800', text: 'text-violet-700 dark:text-violet-300', dot: 'bg-violet-400' },
  typology: { bg: 'bg-cyan-50 dark:bg-cyan-900/20', border: 'border-cyan-200 dark:border-cyan-800', text: 'text-cyan-700 dark:text-cyan-300', dot: 'bg-cyan-400' },
};

const TYPE_ORDER: CrossReference['type'][] = [
  'fulfillment',
  'quotation',
  'typology',
  'parallel',
  'thematic',
  'contrast',
];

// Mapeamento abreviação -> nome completo do livro
const NOMES_LIVROS: Record<string, string> = {
  gn: 'Gênesis', ex: 'Êxodo', lv: 'Levítico', nm: 'Números', dt: 'Deuteronômio',
  js: 'Josué', jz: 'Juízes', rt: 'Rute', '1sm': '1 Samuel', '2sm': '2 Samuel',
  '1rs': '1 Reis', '2rs': '2 Reis', '1cr': '1 Crônicas', '2cr': '2 Crônicas',
  ed: 'Esdras', ne: 'Neemias', et: 'Ester', jó: 'Jó', sl: 'Salmos',
  pv: 'Provérbios', ec: 'Eclesiastes', ct: 'Cânticos', is: 'Isaías', jr: 'Jeremias',
  lm: 'Lamentações', ez: 'Ezequiel', dn: 'Daniel', os: 'Oséias', jl: 'Joel',
  am: 'Amós', ob: 'Obadias', ion: 'Jonas', mq: 'Miquéias', na: 'Naum',
  hc: 'Habacuque', sf: 'Sofonias', age: 'Ageu', zc: 'Zacarias', ml: 'Malaquias',
  mt: 'Mateus', mc: 'Marcos', lc: 'Lucas', jo: 'João', at: 'Atos',
  rm: 'Romanos', '1co': '1 Coríntios', '2co': '2 Coríntios', gl: 'Gálatas',
  ef: 'Efésios', fp: 'Filipenses', cl: 'Colossenses', '1ts': '1 Tessalonicenses',
  '2ts': '2 Tessalonicenses', '1tm': '1 Timóteo', '2tm': '2 Timóteo', tt: 'Tito',
  fm: 'Filemom', hb: 'Hebreus', tg: 'Tiago', '1pe': '1 Pedro', '2pe': '2 Pedro',
  '1jo': '1 João', '2jo': '2 João', '3jo': '3 João', jd: 'Judas', ap: 'Apocalipse',
};

function extrairLivroCapitulo(ref: string): { livro: string; capitulo: number; verso?: number } {
  const partes = ref.split(' ');
  const livro = partes[0];
  const capVerso = partes.slice(1).join(' ').split(':');
  const capitulo = parseInt(capVerso[0], 10);
  const verso = capVerso[1] ? parseInt(capVerso[1].split('-')[0], 10) : undefined;
  return { livro, capitulo, verso };
}

function CrossReferenceExplorerConteudo({ livro, capitulo, verso }: { livro: string; capitulo: number; verso: number }) {
  const [activeFilter, setActiveFilter] = useState<CrossReference['type'] | null>(null);

  const references = useMemo(
    () => getCrossReferencesByVerse(livro, capitulo, verso),
    [livro, capitulo, verso]
  );

  const grouped = useMemo(() => {
    const filtered = activeFilter
      ? references.filter((r) => r.type === activeFilter)
      : references;

    const groups: Record<string, CrossReference[]> = {};
    for (const ref of filtered) {
      if (!groups[ref.type]) groups[ref.type] = [];
      groups[ref.type].push(ref);
    }
    return groups;
  }, [references, activeFilter]);

  const availableTypes = useMemo(() => {
    const types = new Set(references.map((r) => r.type));
    return TYPE_ORDER.filter((t) => types.has(t));
  }, [references]);

  if (references.length === 0) {
    return (
      <div className="p-4 text-center text-sm text-[var(--content-muted)]">
        Nenhuma referência cruzada encontrada para este versículo.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-[var(--content-primary)]">
          Referências Cruzadas ({references.length})
        </h3>
      </div>

      {/* Filtros por tipo */}
      <div className="flex flex-wrap gap-1.5">
        <button
          onClick={() => setActiveFilter(null)}
          className={cn(
            'px-2 py-0.5 rounded-full text-[10px] font-medium transition-colors',
            !activeFilter
              ? 'bg-[var(--brand-default)] text-[var(--brand-contrast)]'
              : 'bg-[var(--surface-sunken)] text-[var(--content-muted)] hover:text-[var(--content-primary)]'
          )}
        >
          Todas ({references.length})
        </button>
        {availableTypes.map((type) => {
          const count = references.filter((r) => r.type === type).length;
          return (
            <button
              key={type}
              onClick={() => setActiveFilter(activeFilter === type ? null : type)}
              className={cn(
                'px-2 py-0.5 rounded-full text-[10px] font-medium transition-colors',
                activeFilter === type
                  ? 'bg-[var(--brand-default)] text-[var(--brand-contrast)]'
                  : 'bg-[var(--surface-sunken)] text-[var(--content-muted)] hover:text-[var(--content-primary)]'
              )}
            >
              {TYPE_LABELS[type]} ({count})
            </button>
          );
        })}
      </div>

      {/* Grid de referências */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {TYPE_ORDER.filter((type) => grouped[type]?.length).map((type) => (
          <div key={type} className="space-y-1.5">
            <div className="flex items-center gap-2 px-1">
              <span className={cn('w-2 h-2 rounded-full', TYPE_COLORS[type].dot)} />
              <span className={cn('text-[9px] font-bold uppercase tracking-wider', TYPE_COLORS[type].text)}>
                {TYPE_LABELS[type]}
              </span>
            </div>
            {grouped[type].map((ref) => {
              const refInfo = extrairLivroCapitulo(ref.to);
              const nomeLivro = NOMES_LIVROS[refInfo.livro] || refInfo.livro;
              const capVersoStr = refInfo.verso
                ? `${refInfo.capitulo}:${refInfo.verso}`
                : `${refInfo.capitulo}`;

              return (
                <Link
                  key={`${ref.from}-${ref.to}-${ref.type}`}
                  href={`/biblia?livro=${refInfo.livro}&capitulo=${refInfo.capitulo}`}
                  className={cn(
                    'block rounded-lg border p-2.5 transition-all duration-200',
                    'hover:shadow-md hover:scale-[1.01]',
                    TYPE_COLORS[type].bg,
                    TYPE_COLORS[type].border
                  )}
                >
                  <div className="flex items-start gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className={cn('text-[9px] font-bold uppercase px-1 py-0.5 rounded', TYPE_COLORS[type].text, TYPE_COLORS[type].bg)}>
                          {TYPE_LABELS[type]}
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-[var(--content-primary)] truncate">
                        {nomeLivro} {capVersoStr}
                      </p>
                      {ref.description && (
                        <p className="text-[10px] text-[var(--content-muted)] mt-0.5 line-clamp-2 leading-relaxed">
                          {ref.description}
                        </p>
                      )}
                    </div>
                    <svg className="w-3 h-3 text-[var(--content-muted)] shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export function CrossReferenceExplorer({ livro, capitulo, verso, className }: CrossReferenceExplorerProps) {
  return (
    <div className={cn('relative', className)}>
      <CrossReferenceExplorerConteudo livro={livro} capitulo={capitulo} verso={verso} />
    </div>
  );
}
