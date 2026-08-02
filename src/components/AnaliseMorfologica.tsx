'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Hash, Layers, Type, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import { romanizeHebrew } from '@/lib/hebrewRomanize';

export interface PalavraMorfologica {
  palavra: string;
  strong: string;
  transliteracao: string;
  traducao: string;
  lingua: 'hebraico' | 'grego';
  morfologia: {
    raiz?: string;
    prefixo?: string;
    sufixo?: string;
    tempo?: string;
    pessoa?: string;
    numero?: string;
    genero?: string;
    caso?: string;
    voz?: string;
    diatonicidade?: string;
    tipo?: string;
  };
  notas?: string;
}

interface AnaliseMorfologicaProps {
  palavras: PalavraMorfologica[];
  titulo?: string;
}

const MORF_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  raiz:       { label: 'Raiz',       color: '#22c55e', bg: 'rgba(34,197,94,0.1)' },
  prefixo:    { label: 'Prefixo',    color: '#3b82f6', bg: 'rgba(59,130,246,0.1)' },
  sufixo:     { label: 'Sufixo',     color: '#a855f7', bg: 'rgba(168,85,247,0.1)' },
  tempo:      { label: 'Tempo',      color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
  pessoa:     { label: 'Pessoa',     color: '#ec4899', bg: 'rgba(236,72,153,0.1)' },
  numero:     { label: 'Número',     color: '#06b6d4', bg: 'rgba(6,182,212,0.1)' },
  genero:     { label: 'Gênero',     color: '#8b5cf6', bg: 'rgba(139,92,246,0.1)' },
  caso:       { label: 'Caso',       color: '#ef4444', bg: 'rgba(239,68,68,0.1)' },
  voz:        { label: 'Voz',        color: '#10b981', bg: 'rgba(16,185,129,0.1)' },
  tipo:       { label: 'Tipo',       color: '#6366f1', bg: 'rgba(99,102,241,0.1)' },
};

// Mapeamento de códigos morfológicos para português
const CODIGOS_HEBRAICOS: Record<string, string> = {
  'N': 'Substantivo',
  'V': 'Verbo',
  'A': 'Adjetivo',
  'R': 'Advérbio',
  'O': 'Pronome',
  'Q': 'Partícula',
  'T': 'Artigo',
  // Tempos verbais
  'NA': 'Perfecto',
  'NI': 'Imperfecto',
  'NP': 'Imperativo',
  'NH': 'Infinitivo',
  'NV': 'Particípio',
  'NR': 'Imperativo Negativo',
  // Pessoas
  '1': '1ª pessoa',
  '2': '2ª pessoa',
  '3': '3ª pessoa',
  // Números
  'S': 'Singular',
  'P': 'Plural',
  'D': 'Dual',
  // Gêneros
  'M': 'Masculino',
  'F': 'Feminino',
};

const CODIGOS_GREGOS: Record<string, string> = {
  // Tempos verbais
  'PA': 'Presente Ativo',
  'PM': 'Presente Médio',
  'PI': 'Imperfeito Ativo',
  'FA': 'Futuro Ativo',
  'AA': 'Aoristo Ativo',
  'RA': 'Perfeito Ativo',
  'SA': 'Mais-que-perfeito Ativo',
  // Pessoas
  '1': '1ª pessoa',
  '2': '2ª pessoa',
  '3': '3ª pessoa',
  // Números
  'S': 'Singular',
  'P': 'Plural',
  // Casos
  'N': 'Nominativo',
  'G': 'Genitivo',
  'D': 'Dativo',
  'A': 'Acusativo',
  'V': 'Vocativo',
};

export function AnaliseMorfologica({ palavras, titulo }: AnaliseMorfologicaProps) {
  return (
    <div className="space-y-4">
      {titulo && (
        <h3 className="text-sm font-bold text-[var(--content-primary)] flex items-center gap-2">
          <Layers className="w-4 h-4 text-[var(--brand-default)]" />
          {titulo}
        </h3>
      )}

      <div className="space-y-3">
        {palavras.map((p, i) => (
          <motion.div
            key={`${p.strong}-${i}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass-card rounded-xl overflow-hidden"
          >
            {/* Header da palavra */}
            <div className="p-4 border-b border-[var(--border)]/30">
              <div className="flex items-center gap-3 mb-2">
                <span
                  className={cn(
                    'text-2xl font-bold',
                    p.lingua === 'hebraico' ? 'font-hebrew' : 'font-greek'
                  )}
                  style={{ color: 'var(--content-primary)' }}
                >
                  {p.palavra}
                </span>
                <span className="text-xs text-[var(--content-muted)]">
                  {p.lingua === 'hebraico' ? romanizeHebrew(p.transliteracao || p.palavra) : p.transliteracao}
                </span>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                  style={{
                    background: p.lingua === 'hebraico' ? 'var(--brand-subtle)' : 'var(--surface-sunken)',
                    color: p.lingua === 'hebraico' ? 'var(--brand-default)' : 'var(--content-secondary)',
                  }}
                >
                  {p.strong}
                </span>
                <span className="text-[10px] text-[var(--content-muted)]">
                  {p.lingua === 'hebraico' ? 'Hebraico' : 'Grego'}
                </span>
                <span className="text-xs text-[var(--content-primary)] font-medium">
                  &ldquo;{p.traducao}&rdquo;
                </span>
              </div>
            </div>

            {/* Morfologia */}
            <div className="p-4">
              <div className="flex flex-wrap gap-2 mb-3">
                {Object.entries(p.morfologia).map(([key, value]) => {
                  if (!value) return null;
                  const config = MORF_CONFIG[key] || { label: key, color: '#6b7280', bg: 'rgba(107,114,128,0.1)' };

                  // Traduzir código para português
                  const dicionario = p.lingua === 'hebraico' ? CODIGOS_HEBRAICOS : CODIGOS_GREGOS;
                  const traducao = dicionario[value] || value;

                  return (
                    <span
                      key={key}
                      className="inline-flex items-center gap-1 text-[10px] px-2 py-1 rounded-full font-medium"
                      style={{ background: config.bg, color: config.color }}
                    >
                      <span className="font-bold">{config.label}:</span>
                      {traducao}
                    </span>
                  );
                })}
              </div>

              {/* Árvore visual da palavra */}
              <div className="flex items-center gap-1 p-3 rounded-lg bg-[var(--surface-sunken)]/50">
                {p.morfologia.prefixo && (
                  <span className="text-xs px-2 py-1 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 font-mono">
                    {p.morfologia.prefixo}
                  </span>
                )}
                {p.morfologia.raiz && (
                  <span className="text-xs px-2 py-1 rounded bg-green-500/10 text-green-600 dark:text-green-400 font-mono font-bold">
                    {p.morfologia.raiz}
                  </span>
                )}
                {p.morfologia.sufixo && (
                  <span className="text-xs px-2 py-1 rounded bg-purple-500/10 text-purple-600 dark:text-purple-400 font-mono">
                    {p.morfologia.sufixo}
                  </span>
                )}
                {!p.morfologia.prefixo && !p.morfologia.raiz && !p.morfologia.sufixo && (
                  <span className="text-xs text-[var(--content-muted)]">Estrutura morfológica detalhada disponível para palavras alinhadas com Strong&apos;s</span>
                )}
              </div>

              {p.notas && (
                <p className="text-[11px] text-[var(--content-muted)] mt-2 italic">
                  {p.notas}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
