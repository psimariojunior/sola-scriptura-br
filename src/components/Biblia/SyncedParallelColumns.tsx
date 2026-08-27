'use client';

import type { ReactNode } from 'react';
import { useSyncedColumnScroll } from '@/hooks/useSyncedColumnScroll';
import { cn } from '@/lib/utils';

export interface SyncedParallelColumn {
  key: string;
  header: ReactNode;
  verses: { numero: number; content: ReactNode }[];
}

export function SyncedParallelColumns({
  columns,
  className,
}: {
  columns: SyncedParallelColumn[];
  className?: string;
}) {
  const { setRef, onScroll } = useSyncedColumnScroll();

  if (columns.length === 0) return null;

  return (
    <div>
      <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground mb-2">
        Rolagem sincronizada
      </p>
      <div className={cn('flex gap-4 overflow-x-auto pb-2', className)}>
        {columns.map((col, i) => (
          <div
            key={col.key}
            className="flex-1 min-w-[260px] rounded-xl border border-[var(--border)]/40 bg-[var(--card-bg)] overflow-hidden"
          >
            <div className="px-4 py-2.5 border-b border-[var(--border)]/40 bg-[var(--surface-raised)]/40">
              {col.header}
            </div>
            <div
              ref={setRef(i)}
              onScroll={() => onScroll(i)}
              className="p-4 space-y-3 max-h-[calc(100vh-280px)] overflow-y-auto overscroll-contain"
            >
              {col.verses.map((v) => (
                <div key={v.numero} data-sync-verse={String(v.numero)}>
                  {v.content}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
