'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const CollaborativeStudy = dynamic(
  () => import('@/components/CollaborativeStudy').then((m) => ({ default: m.CollaborativeStudy })),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full min-h-[420px] flex-col items-center justify-center gap-3 text-[var(--content-muted)]">
        <div className="h-10 w-10 rounded-full border-2 border-[var(--brand-default)] border-t-transparent animate-spin" />
        <p className="text-sm">Abrindo a sala de estudo…</p>
      </div>
    ),
  },
);

function EstudoColaborativoInner() {
  const searchParams = useSearchParams();
  const code = searchParams.get('code') || undefined;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20 pb-16 px-4">
        <div className="max-w-5xl mx-auto h-[calc(100vh-8rem)] min-h-[560px]">
          <div className="sola-card overflow-hidden h-full border border-[var(--brand-default)]/15 shadow-[0_20px_60px_-24px_rgba(161,122,44,0.35)] rounded-2xl">
            <CollaborativeStudy initialCode={code} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function EstudoColaborativoPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center text-sm text-muted-foreground">
          Carregando sala…
        </div>
      }
    >
      <EstudoColaborativoInner />
    </Suspense>
  );
}
