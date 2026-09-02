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
              <h1 className="font-display text-3xl md:text-4xl font-light">Estudo com certificado</h1>
            </div>
            <p className="text-muted-foreground text-sm max-w-2xl leading-relaxed">
              As trilhas oficiais (João e Romanos) atestam leitura capítulo a capítulo e resposta à ficha profunda.
              Os cursos abaixo são introdutórios — o diploma diz isso, sem carga horária inventada.
            </p>
          </div>

          <BannerTrilhasOficiais />

          <div className="mb-3">
            <h2 className="font-display text-xl mb-1">Cursos introdutórios</h2>
            <p className="text-xs text-[var(--content-muted)]">
              Aulas e quiz na plataforma. O certificado desses cursos é de introdução, não de estudo avançado.
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
