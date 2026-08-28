'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Bookmark, Clock, Compass } from 'lucide-react';
import { PageShell } from '@/components/layout/PageShell';
import { PageHero } from '@/components/layout/PageHero';
import { hrefBiblia, hrefGuia } from '@/lib/bibliaHref';
import { TODOS_LIVROS } from '@/data/biblia/livros';
import { getReadingLog } from '@/lib/estatisticas';
import { getChapterBookmarks, toggleChapterBookmark } from '@/lib/readingProgress';
import { cn } from '@/lib/utils';

function nomeLivro(abrev: string): string {
  return TODOS_LIVROS.find((l) => l.abreviacao === abrev)?.nome ?? abrev;
}

function formatarQuando(ts: number): string {
  const d = new Date(ts);
  return d.toLocaleString('pt-BR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });
}

export default function HistoricoPage() {
  const [tick, setTick] = useState(0);
  const log = useMemo(() => {
    void tick;
    return getReadingLog().slice(0, 80);
  }, [tick]);
  const bookmarks = useMemo(() => {
    void tick;
    return getChapterBookmarks();
  }, [tick]);

  return (
    <PageShell maxWidth="3xl">
      <PageHero
        icon={Clock}
        eyebrow="Sua leitura"
        title="Histórico"
        subtitle="Capítulos que você abriu recentemente e os que marcou para voltar depois."
        align="left"
      />

      {bookmarks.length > 0 && (
        <section className="mb-10">
          <h2 className="text-sm font-semibold text-[var(--content-primary)] mb-3 flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-[var(--brand-default)]" /> Marcados
          </h2>
          <ul className="divide-y divide-[var(--border)] rounded-2xl border border-[var(--border)]/60 bg-[var(--surface-raised)] overflow-hidden">
            {bookmarks.map((b) => (
              <li key={`${b.livro}-${b.capitulo}`} className="flex items-center gap-2 px-4 py-3">
                <Link href={hrefBiblia(b.livro, b.capitulo)} className="flex-1 min-w-0 hover:text-[var(--brand-default)]">
                  <span className="text-sm font-medium">{nomeLivro(b.livro)} {b.capitulo}</span>
                </Link>
                <Link href={hrefGuia(b.livro, b.capitulo)} className="text-[11px] text-[var(--content-muted)] hover:text-[var(--brand-default)] px-2">
                  Guia
                </Link>
                <button
                  type="button"
                  className="p-1.5 rounded-md text-[var(--content-muted)] hover:text-[var(--brand-default)]"
                  aria-label="Remover marcador"
                  onClick={() => {
                    toggleChapterBookmark(b.livro, b.capitulo);
                    setTick((n) => n + 1);
                  }}
                >
                  <Bookmark className="w-4 h-4 fill-current" />
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section>
        <h2 className="text-sm font-semibold text-[var(--content-primary)] mb-3 flex items-center gap-2">
          <Clock className="w-4 h-4 text-[var(--brand-default)]" /> Recentes
        </h2>
        {log.length === 0 ? (
          <p className="text-sm text-[var(--content-muted)] py-8">
            Ainda não há histórico neste aparelho. Abra um capítulo na Bíblia para começar.
          </p>
        ) : (
          <ul className="divide-y divide-[var(--border)] rounded-2xl border border-[var(--border)]/60 bg-[var(--surface-raised)] overflow-hidden">
            {log.map((e, i) => (
              <li key={`${e.livro}-${e.capitulo}-${e.ts}-${i}`} className="flex items-center gap-3 px-4 py-3">
                <Link href={hrefBiblia(e.livro, e.capitulo)} className="flex-1 min-w-0 group">
                  <span className="text-sm font-medium group-hover:text-[var(--brand-default)]">
                    {nomeLivro(e.livro)} {e.capitulo}
                  </span>
                  <span className="block text-[11px] text-[var(--content-muted)]">{formatarQuando(e.ts)}</span>
                </Link>
                <Link
                  href={hrefGuia(e.livro, e.capitulo)}
                  className={cn('inline-flex items-center gap-1 text-[11px] font-semibold text-[var(--content-muted)] hover:text-[var(--brand-default)]')}
                >
                  <Compass className="w-3.5 h-3.5" />
                  Guia
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </PageShell>
  );
}
