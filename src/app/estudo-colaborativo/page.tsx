'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CollaborativeStudy } from '@/components/CollaborativeStudy';

function EstudoColaborativoInner() {
  const searchParams = useSearchParams();
  const code = searchParams.get('code') || undefined;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20 pb-16 px-4">
        <div className="max-w-5xl mx-auto h-[calc(100vh-8rem)] min-h-[560px]">
          <div className="sola-card overflow-hidden h-full">
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
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center text-sm text-muted-foreground">
        Carregando sala…
      </div>
    }>
      <EstudoColaborativoInner />
    </Suspense>
  );
}
