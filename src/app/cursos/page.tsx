'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import ScrollReveal from '@/components/ScrollReveal';
import { GraduationCap } from 'lucide-react';
import dynamic from 'next/dynamic';

const BibleCourses = dynamic(() => import('@/components/BibleCourses').then(m => ({ default: m.BibleCourses })), {
  ssr: false,
  loading: () => (
    <div className="sola-card p-6 animate-pulse">
      <div className="h-64 bg-muted/30 rounded-lg" />
    </div>
  ),
});

export default function CursosPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main id="main-content" className="pt-20 pb-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <Breadcrumbs items={[{ label: 'Início', href: '/' }, { label: 'Estudos', href: '/estudos' }, { label: 'Cursos' }]} />
          </div>

          <ScrollReveal>
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-primary" />
                </div>
                <h1 className="font-display text-3xl md:text-4xl font-light">Seminário Bíblico Gratuito</h1>
              </div>
              <p className="text-muted-foreground ml-0 sm:ml-13 text-sm">
                Cursos completos com certificado. Estude no seu ritmo, sem custo.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.05}>
            <div className="sola-card overflow-hidden rounded-2xl" style={{ minHeight: '700px' }}>
              <BibleCourses />
            </div>
          </ScrollReveal>
        </div>
      </main>
      <Footer />
    </div>
  );
}
