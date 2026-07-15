'use client';

import { memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { CapituloComparado } from '@/data/biblia';

interface ComparisonTableProps {
  data: CapituloComparado[];
  fontSize: number;
  showDiff: boolean;
  highlightedVerse: number | null;
  onHighlight: (v: number | null) => void;
  maxVersiculos: number;
  tradBadgeColors: Record<string, string>;
  labelMap: Record<string, string>;
}

function DiffText({ baseText, newText, fontSize }: { baseText: string; newText: string; fontSize: number }) {
  const segments = useMemo(() => {
    try {
      const { diffWords } = require('@/lib/diff');
      return diffWords(baseText, newText);
    } catch {
      return [{ text: newText, changed: false }];
    }
  }, [baseText, newText]);

  return (
    <p className="font-serif-body leading-relaxed" style={{ fontSize: `${fontSize}px` }}>
      {segments.map((seg: { text: string; changed: boolean }, si: number) =>
        seg.changed ? <span key={si} className="diff-word">{seg.text}</span> : <span key={si}>{seg.text}</span>
      )}
    </p>
  );
}

function ComparisonTableComponent({
  data,
  fontSize,
  showDiff,
  highlightedVerse,
  onHighlight,
  maxVersiculos,
  tradBadgeColors,
  labelMap,
}: ComparisonTableProps) {
  return (
    <div className="border border-[var(--border)]/40 rounded-xl overflow-x-auto -mx-3 sm:mx-0">
      <div className="min-w-[400px]">
        <div className="bg-[var(--surface-sunken)]/50 px-4 py-2 border-b border-[var(--border)]/30 flex items-center justify-between">
          <span className="text-xs font-semibold text-[var(--content-muted)] uppercase tracking-wider">Comparação</span>
        </div>
        <div className="grid border-b border-[var(--border)]/30" style={{ gridTemplateColumns: `40px repeat(${data.length}, 1fr)` }}>
          <div className="p-2" />
          {data.map(item => (
            <div key={item.traducao} className="p-2 border-l border-[var(--border)]/20">
              <div className="flex items-center gap-1.5">
                <div className={cn('w-1.5 h-1.5 rounded-full', tradBadgeColors[item.traducao])} />
                <span className="text-[11px] font-bold">{labelMap[item.traducao]}</span>
              </div>
            </div>
          ))}
        </div>
        {Array.from({ length: maxVersiculos }, (_, i) => {
          const verseNum = i + 1;
          if (!data.some(d => d.versiculos[i])) return null;
          const baseText = data[0].versiculos[i]?.texto || '';
          return (
            <motion.div
              key={verseNum}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.01 }}
              className={cn(
                'grid border-b border-[var(--border)]/15 last:border-b-0 hover:bg-[var(--surface-sunken)]/50 transition-colors cursor-pointer',
                highlightedVerse === verseNum && 'bg-[var(--brand-subtle)] border-l-2 border-l-[var(--brand-default)]'
              )}
              style={{ gridTemplateColumns: `40px repeat(${data.length}, 1fr)` }}
              onClick={() => onHighlight(highlightedVerse === verseNum ? null : verseNum)}
            >
              <div className="p-2 sm:p-3 flex items-start justify-end">
                <span className="text-[10px] sm:text-[11px] font-bold text-[var(--brand-default)] bg-[var(--brand-subtle)] w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center rounded-full tabular-nums">{verseNum}</span>
              </div>
            {data.map((item, idx) => {
              const v = item.versiculos[i];
              if (!v) return <div key={item.traducao} className="p-3 border-l border-[var(--border)]/20" />;
              if (showDiff && idx > 0 && baseText) {
                return (
                  <div key={item.traducao} className="p-3 border-l border-[var(--border)]/20">
                    <DiffText baseText={baseText} newText={v.texto} fontSize={fontSize - 3} />
                  </div>
                );
              }
              return (
                <div key={item.traducao} className="p-3 border-l border-[var(--border)]/20">
                  <p className="font-serif-body leading-relaxed" style={{ fontSize: `${fontSize - 3}px` }}>{v.texto}</p>
                </div>
              );
            })}
          </motion.div>
        );
      })}
    </div>
    </div>
  );
}

export const ComparisonTable = memo(ComparisonTableComponent);
