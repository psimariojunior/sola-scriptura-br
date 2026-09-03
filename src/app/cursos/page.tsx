'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { GraduationCap } from 'lucide-react';
import { BibleCourses } from '@/components/BibleCourses';
import { BannerTrilhasOficiais } from '@/components/cursos/BannerTrilhasOficiais';

export default function CursosPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main id="main-content" className="pt-20 pb-24 sm:pb-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <Breadcrumbs items={[{ label: 'Início', href: '/' }, { label: 'Estudos', href: '/estudos' }, { label: 'Cursos' }]} />
          </div>

          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-primary" />
              </div>
              <h1 className="font-display text-3xl md:text-4xl font-light">Estudo Bíblico Profundo</h1>
            </div>
            <p className="text-muted-foreground text-sm max-w-2xl leading-relaxed">
              Trilhas oficiais com certificado (João e Romanos) e cursos de teologia sistemática — 
              conteúdo de nível seminário, com base nas Escrituras e na tradição confessional.
            </p>
          </div>

          <BannerTrilhasOficiais />

          <div id="introducao" className="mb-3 scroll-mt-24">
            <h2 className="font-display text-xl mb-1">Cursos de Teologia</h2>
            <p className="text-xs text-[var(--content-muted)]">
              Teologia sistemática, exegese e estudo bíblico aprofundado — cada curso com base 
              nas Escrituras, citações de teólogos históricos e avaliação.
            </p>
          </div>
          <div className="rounded-2xl border border-[var(--border)]/40 overflow-hidden">
            <BibleCourses />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
