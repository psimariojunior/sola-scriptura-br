'use client';

import { BookOpen } from 'lucide-react';
import { PassageGuideSection } from '../PassageGuideSection';

interface VerseTextSectionProps {
  livroNome: string;
  capitulo: number;
  versiculo: number;
  texto: string;
  traducao: string;
}

export function VerseTextSection({ livroNome, capitulo, versiculo, texto, traducao }: VerseTextSectionProps) {
  return (
    <PassageGuideSection
      title="Texto"
      icon={<BookOpen className="w-4 h-4" />}
      loading={false}
      loaded={true}
      defaultOpen={true}
      accentColor="var(--brand-default)"
    >
      <div className="space-y-3">
        <p className="text-lg font-serif-body leading-relaxed text-[var(--content-primary)]">
          {texto}
        </p>
        <p className="text-xs text-[var(--content-muted)]">
          {livroNome} {capitulo}:{versiculo} — {traducao.toUpperCase()}
        </p>
      </div>
    </PassageGuideSection>
  );
}
