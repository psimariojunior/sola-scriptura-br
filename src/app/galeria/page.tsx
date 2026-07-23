'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { BibleGallery } from '@/components/BibleGallery';

export default function GaleriaPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <BibleGallery />
      </main>
      <Footer />
    </>
  );
}
