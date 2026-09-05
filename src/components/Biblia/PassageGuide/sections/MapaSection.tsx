'use client';

import { MapPin } from 'lucide-react';
import Link from 'next/link';
import { PassageGuideSection } from '../PassageGuideSection';
import type { LocalBiblico } from '@/data/biblia/locais';

interface MapaSectionProps {
  locais: LocalBiblico[];
  loading: boolean;
  loaded: boolean;
  livroAtual: string;
  capituloAtual: number;
  versiculoAtual: number;
}

const CATEGORIA_ICONS: Record<string, string> = {
  cidade: '🏙️',
  regiao: '🗺️',
  monte: '⛰️',
  mar: '🌊',
  rio: '🏞️',
  deserto: '🏜️',
  estrutura: '🏛️',
  vale: '🌿',
  batalha: '⚔️',
};

export function MapaSection({ locais, loading, loaded, livroAtual, capituloAtual, versiculoAtual }: MapaSectionProps) {
  return (
    <PassageGuideSection
      title="Mapa"
      icon={<MapPin className="w-4 h-4" />}
      count={locais.length}
      loading={loading}
      loaded={loaded}
      accentColor="#f97316"
    >
      {locais.length === 0 ? (
        <p className="text-sm text-[var(--content-muted)] italic">
          Mapa será carregado ao expandir.
        </p>
      ) : (
        <div className="space-y-2">
          {locais.map((local, i) => (
            <Link
              key={i}
              href={`/atlas?local=${local.id}`}
              className="block rounded-lg border border-[var(--border)] bg-[var(--surface)] p-3 hover:bg-[var(--surface-raised)] transition-colors group"
            >
              <div className="flex items-center gap-2 mb-1">
                <span>{CATEGORIA_ICONS[local.categoria] || '📍'}</span>
                <span className="text-sm font-medium text-[var(--content-primary)] group-hover:text-[var(--brand-default)] transition-colors">
                  {local.nome}
                </span>
                <span className="text-[10px] text-[var(--content-muted)]">
                  {local.nomeHebraico || local.nomeGriego || ''}
                </span>
              </div>
              <p className="text-xs text-[var(--content-muted)] line-clamp-2">
                {local.descricao}
              </p>
            </Link>
          ))}
          <Link
            href={`/atlas?livro=${livroAtual}&cap=${capituloAtual}&ver=${versiculoAtual}`}
            className="block text-center text-xs text-[var(--brand-default)] hover:underline py-1"
          >
            Ver no Atlas →
          </Link>
        </div>
      )}
    </PassageGuideSection>
  );
}
