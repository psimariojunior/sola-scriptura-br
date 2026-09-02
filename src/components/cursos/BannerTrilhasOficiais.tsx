'use client';

import Link from 'next/link';
import { Award, BookOpen, GraduationCap } from 'lucide-react';
import { TRILHAS_LIVRO } from '@/data/trilhasLivro';
import { nivelEfetivoDaTrilha } from '@/lib/trilhaCapitulos';

export function BannerTrilhasOficiais({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <div className="grid sm:grid-cols-2 gap-3 mb-6">
        {TRILHAS_LIVRO.map((t) => (
          <Link
            key={t.slug}
            href={`/cursos/${t.slug}`}
            className="rounded-xl border border-[var(--brand-default)]/25 bg-[var(--brand-default)]/[0.06] p-4 hover:border-[var(--brand-default)]/50 transition-colors"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--brand-default)] mb-1">
              Trilha oficial
            </p>
            <p className="font-display text-lg text-[var(--content-primary)]">{t.livroNome}</p>
            <p className="text-xs text-[var(--content-muted)] mt-1">
              {t.totalCapitulos} capítulos · ficha profunda · certificado verificável
            </p>
          </Link>
        ))}
      </div>
    );
  }

  return (
    <section className="mb-10">
      <div className="flex items-center gap-2 mb-3">
        <Award className="w-5 h-5 text-[var(--brand-default)]" />
        <h2 className="font-display text-2xl">Trilhas oficiais com certificado</h2>
      </div>
      <p className="text-sm text-[var(--content-secondary)] mb-5 max-w-2xl leading-relaxed">
        Só há certificado onde o livro já tem ficha profunda em todos os capítulos. Completar a trilha
        significa ler o texto e responder à pergunta da ficha — não assistir telas. O documento declara
        isso com ID e hash curto; não inventa carga horária.
      </p>
      <div className="grid md:grid-cols-2 gap-4">
        {TRILHAS_LIVRO.map((t) => {
          const nivel = nivelEfetivoDaTrilha(t);
          return (
            <Link
              key={t.slug}
              href={`/cursos/${t.slug}`}
              className="group rounded-2xl border border-[var(--brand-default)]/30 bg-[var(--surface-raised)] p-5 hover:border-[var(--brand-default)]/60 transition-colors"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="w-10 h-10 rounded-xl bg-[var(--brand-default)]/10 flex items-center justify-center">
                  {t.slug === 'joao' ? (
                    <BookOpen className="w-5 h-5 text-[var(--brand-default)]" />
                  ) : (
                    <GraduationCap className="w-5 h-5 text-[var(--brand-default)]" />
                  )}
                </span>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--brand-default)]">
                    {nivel === 'profundo' ? 'Fichas profundas' : 'Síntese'}
                  </p>
                  <h3 className="font-display text-xl group-hover:text-[var(--brand-default)]">{t.livroNome}</h3>
                </div>
              </div>
              <p className="text-sm text-[var(--content-secondary)] leading-relaxed">{t.descricao}</p>
              <p className="text-xs text-[var(--content-muted)] mt-3">
                {t.totalCapitulos} capítulos · ler + responder · depois o diploma
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
