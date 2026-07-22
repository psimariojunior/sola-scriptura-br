'use client';

import { useSearchParams } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CollaborativeStudy } from '@/components/CollaborativeStudy';

export default function EstudoColaborativoPage() {
  const searchParams = useSearchParams();
  const code = searchParams.get('code') || undefined;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20 pb-16 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="sola-card overflow-hidden min-h-[600px]">
            <CollaborativeStudy initialCode={code} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
