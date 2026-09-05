'use client';

import { GraduationCap, Quote } from 'lucide-react';
import { PassageGuideSection } from '../PassageGuideSection';
import type { EstudoVersiculo } from '@/data/estudosTeologicos';

interface EstudoSectionProps {
  estudos: EstudoVersiculo[];
  loading: boolean;
  loaded: boolean;
}

export function EstudoSection({ estudos, loading, loaded }: EstudoSectionProps) {
  return (
    <PassageGuideSection
      title="Estudos Teológicos"
      icon={<GraduationCap className="w-4 h-4" />}
      count={estudos.length}
      loading={loading}
      loaded={loaded}
      defaultOpen={estudos.length > 0}
      accentColor="#10b981"
    >
      {estudos.length === 0 ? (
        <p className="text-sm text-[var(--content-muted)] italic">
          Nenhum estudo disponível para este versículo.
        </p>
      ) : (
        <div className="space-y-4">
          {estudos.map((estudo, i) => (
            <div key={i} className="space-y-3">
              <div>
                <h4 className="text-sm font-semibold text-[var(--content-primary)] mb-1">
                  {estudo.tema}
                </h4>
                <p className="text-xs text-[var(--content-secondary)]">
                  {estudo.contexto}
                </p>
              </div>
              {estudo.interpretacoes && estudo.interpretacoes.length > 0 && (
                <div className="space-y-2">
                  {estudo.interpretacoes.slice(0, 3).map((interp, j) => (
                    <div
                      key={j}
                      className="rounded-lg border-l-2 border-emerald-500 bg-[var(--surface)] p-3"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                          {interp.teologo}
                        </span>
                        <span className="text-[10px] text-[var(--content-muted)]">
                          {interp.periodo}
                        </span>
                      </div>
                      <p className="text-xs text-[var(--content-secondary)] mb-2">
                        {interp.resumo}
                      </p>
                      {interp.citacao && (
                        <div className="flex items-start gap-1.5 text-[var(--content-muted)]">
                          <Quote className="w-3 h-3 mt-0.5 shrink-0" />
                          <p className="text-[11px] italic leading-relaxed">
                            {interp.citacao}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                  {estudo.interpretacoes.length > 3 && (
                    <p className="text-xs text-[var(--content-muted)] text-center">
                      +{estudo.interpretacoes.length - 3} interpretações adicionais
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </PassageGuideSection>
  );
}
