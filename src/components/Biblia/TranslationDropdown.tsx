'use client';

import { BookText, CloudOff } from 'lucide-react';
import { cn } from '@/lib/utils';

type ViewMode = 'single' | 'parallel' | 'comparison';

const TRAD_IDS = [
  'arc', 'nvi', 'ara', 'acf', 'naa', 'ntlh', 'nvt', 'kja', 'aa', 'nbv',
  'as21', 'jfaa', 'kjf', 'msgpt', 'bpm', 'nva',
  'kjv', 'web', 'esv', 'niv', 'nkjv', 'nlt',
  'rvr1960', 'lsg',
] as const;

type GrupoTrad = { label: string; ids: readonly string[] };
const GRUPOS: GrupoTrad[] = [
  { label: 'Portugues', ids: ['arc', 'nvi', 'ara', 'acf', 'naa', 'ntlh', 'nvt', 'kja', 'aa', 'nbv', 'as21', 'jfaa', 'kjf', 'msgpt', 'bpm', 'nva'] },
  { label: 'English', ids: ['kjv', 'web', 'esv', 'niv', 'nkjv', 'nlt'] },
  { label: 'Espanol', ids: ['rvr1960'] },
  { label: 'Francais', ids: ['lsg'] },
];

const labelMap: Record<string, string> = {
  arc: 'ARC', nvi: 'NVI', ara: 'ARA', acf: 'ACF', naa: 'NAA', ntlh: 'NTLH', nvt: 'NVT', kja: 'KJA', aa: 'AA', nbv: 'NBV',
  as21: 'AS21', jfaa: 'JFAA', kjf: 'KJF', msgpt: 'MSG', bpm: 'BPM', nva: 'NVA',
  kjv: 'KJV', web: 'WEB', esv: 'ESV', niv: 'NIV', nkjv: 'NKJV', nlt: 'NLT',
  rvr1960: 'RVR1960', lsg: 'LSG',
};
const nomeMap: Record<string, string> = {
  arc: 'Almeida Revista e Corrigida', nvi: 'Nova Versao Internacional', ara: 'Almeida Revista e Atualizada', acf: 'Almeida Corrigida Fiel',
  naa: 'Nova Almeida Atualizada', ntlh: 'Nova Traducao na Linguagem de Hoje', nvt: 'Nova Versao Transformadora', kja: 'King James Atualizada',
  aa: 'Almeida e Atualizada', nbv: 'Nova Biblia Viva',
  as21: 'Almeida Seculo 21', jfaa: 'Joao Ferreira de Almeida Atualizada', kjf: 'King James Fiel', msgpt: 'A Mensagem',
  bpm: 'Biblia Portuguesa Mundial', nva: 'Nova Versao de Acesso Livre',
  kjv: 'King James Version', web: 'World English Bible', esv: 'English Standard Version', niv: 'New International Version',
  nkjv: 'New King James Version', nlt: 'New Living Translation',
  rvr1960: 'Reina-Valera 1960', lsg: 'Louis Segond',
};
const tradBadgeColors: Record<string, string> = {
  arc: 'bg-primary/10 text-primary', nvi: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400', ara: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
  acf: 'bg-rose-500/10 text-rose-600 dark:text-rose-400', naa: 'bg-teal-500/10 text-teal-600 dark:text-teal-400', ntlh: 'bg-orange-500/10 text-orange-600 dark:text-orange-400',
  nvt: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400', kja: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400', aa: 'bg-pink-500/10 text-pink-600 dark:text-pink-400',
  nbv: 'bg-lime-500/10 text-lime-600 dark:text-lime-400',
  as21: 'bg-sky-500/10 text-sky-600 dark:text-sky-400', jfaa: 'bg-violet-500/10 text-violet-600 dark:text-violet-400', kjf: 'bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-400',
  msgpt: 'bg-red-500/10 text-red-600 dark:text-red-400', bpm: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400', nva: 'bg-teal-500/10 text-teal-600 dark:text-teal-400',
  kjv: 'bg-amber-500/10 text-amber-600 dark:text-amber-400', web: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400', esv: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  niv: 'bg-orange-500/10 text-orange-600 dark:text-orange-400', nkjv: 'bg-rose-500/10 text-rose-600 dark:text-rose-400', nlt: 'bg-teal-500/10 text-teal-600 dark:text-teal-400',
  rvr1960: 'bg-amber-500/10 text-amber-600 dark:text-amber-400', lsg: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400',
};

const TRADS_MIDVASH = new Set(['naa', 'ntlh', 'nvt', 'kja', 'aa', 'nbv', 'as21', 'jfaa', 'kjf', 'msgpt', 'bpm', 'nva', 'esv', 'niv', 'nkjv', 'nlt', 'rvr1960', 'lsg']);

interface TranslationDropdownProps {
  open: boolean;
  onToggle: () => void;
  onClose: () => void;
  selectedTrads: string[];
  onToggleTrad: (id: string) => void;
  viewMode: ViewMode;
  onViewModeChange: (m: ViewMode) => void;
}

export function TranslationDropdown({ open, onToggle, onClose, selectedTrads, onToggleTrad, viewMode, onViewModeChange }: TranslationDropdownProps) {
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className={cn(
          'flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-semibold active:scale-95 transition-transform',
          'border transition-all duration-200',
          open || selectedTrads.length > 1
            ? 'bg-[var(--brand-subtle)] border-[var(--brand-default)]/30 text-[var(--brand-default)]'
            : 'bg-[var(--surface-sunken)] border-[var(--border)]/60 text-[var(--content-secondary)] hover:text-[var(--content-primary)]'
        )}
        aria-label="Selecionar traducoes"
        aria-expanded={open}
      >
        <BookText className="w-3.5 h-3.5" />
        <span className="tabular-nums truncate max-w-[100px] sm:max-w-none">{selectedTrads.map(t => labelMap[t]).join(' . ')}</span>
        {selectedTrads.length > 1 && <span className="text-[10px] px-1 rounded-full bg-[var(--brand-default)] text-[var(--brand-contrast)]">{selectedTrads.length}</span>}
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-30" onClick={onClose} />
          <div
            className="fixed sm:absolute left-2 right-2 sm:left-auto sm:right-0 top-16 sm:top-full sm:mt-2 z-40 sm:w-[min(288px,calc(100vw-1rem))] w-auto bg-[var(--surface-raised)] border border-[var(--border)] rounded-xl shadow-2xl p-2 max-h-[60vh] overflow-y-auto animate-scale-in"
          >
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--content-muted)] px-3 py-1.5">Traducoes</p>
            {GRUPOS.map((grupo, idx) => (
              <div key={grupo.label}>
                {idx > 0 && <div className="my-1.5 border-t border-[var(--border)]/30 mx-3" />}
                <p className="text-[9px] font-bold uppercase tracking-widest text-[var(--content-muted)] px-3 py-1 opacity-60">{grupo.label}</p>
                {grupo.ids.map(id => {
                  const active = selectedTrads.includes(id);
                  const isMidvash = TRADS_MIDVASH.has(id);
                  return (
                    <button key={id} onClick={() => { onToggleTrad(id); onClose(); }}
                      className={cn(
                        'w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 transition-colors',
                        active ? 'bg-[var(--brand-subtle)] text-[var(--brand-default)]' : 'hover:bg-[var(--surface-sunken)] text-[var(--content-secondary)]'
                      )}>
                      <div className={cn('w-2 h-2 rounded-full', tradBadgeColors[id])} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm font-semibold">{labelMap[id]}</span>
                          {isMidvash && (
                            <span className="inline-flex items-center gap-0.5 text-[9px] px-1.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400">
                              <CloudOff className="w-2.5 h-2.5" />
                              API
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] text-[var(--content-muted)] truncate">{nomeMap[id]}</div>
                      </div>
                      {active && <span className="text-[var(--brand-default)] text-xs">&#10003;</span>}
                    </button>
                  );
                })}
              </div>
            ))}
            {selectedTrads.length > 1 && (
              <div className="mt-2 pt-2 border-t border-[var(--border)]/40 px-2 flex gap-1">
                {(['single', 'parallel', 'comparison'] as ViewMode[]).map(m => (
                  <button key={m} onClick={() => onViewModeChange(m)}
                    className={cn(
                      'flex-1 text-[10px] font-medium px-2 py-1 rounded-md transition-colors',
                      viewMode === m ? 'bg-[var(--brand-default)] text-[var(--brand-contrast)]' : 'text-[var(--content-muted)] hover:bg-[var(--surface-sunken)]'
                    )}>
                    {m === 'single' ? 'Unica' : m === 'parallel' ? 'Lado a lado' : 'Comparar'}
                  </button>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export { TRAD_IDS, labelMap, nomeMap, tradBadgeColors };
