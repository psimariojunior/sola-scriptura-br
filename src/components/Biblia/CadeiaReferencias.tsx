'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { EloCadeia } from '@/lib/cadeiaReferencias';

interface CadeiaReferenciasProps {
  elos: EloCadeia[];
  className?: string;
  compact?: boolean;
}

export function CadeiaReferencias({ elos, className, compact }: CadeiaReferenciasProps) {
  if (elos.length === 0) return null;

  return (
    <ol className={cn('space-y-1.5', className)}>
      {elos.map((elo, i) => (
        <li key={`${elo.ref}-${i}`}>
          <Link
            href={elo.href}
            className={cn(
              'flex items-start gap-2 rounded-lg px-2 py-1.5',
              'hover:bg-[var(--brand-subtle)]/60 transition-colors group',
            )}
          >
            <span className="shrink-0 mt-0.5 w-5 h-5 rounded-full bg-[var(--brand-subtle)] text-[var(--brand-default)] text-[10px] font-bold flex items-center justify-center">
              {i + 1}
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex items-center gap-1.5 text-sm text-[var(--content-primary)]">
                {i === 0 && !compact && (
                  <span className="text-[10px] uppercase tracking-wider text-[var(--content-muted)] font-semibold">
                    Daqui
                    <ArrowRight className="inline w-3 h-3 mx-0.5" />
                  </span>
                )}
                <span className="font-semibold group-hover:text-[var(--brand-default)]">{elo.ref}</span>
              </span>
              <span className="block text-[11px] text-[var(--content-muted)]">
                {elo.papel}
                {elo.descricao ? ` — ${elo.descricao}` : ''}
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
}
