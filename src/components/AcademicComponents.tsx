'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, ChevronDown, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Citacao {
  id: string;
  autor: string;
  obra: string;
  ano?: number;
  pagina?: string;
  editora?: string;
  local?: string;
  url?: string;
  tipo?: 'livro' | 'artigo' | 'entario' | 'dissertacao' | 'online';
}

interface NotaDeRodapeProps {
  numero: number;
  citacao: Citacao;
  className?: string;
}

export function NotaDeRodape({ numero, citacao, className }: NotaDeRodapeProps) {
  const [expandido, setExpandido] = useState(false);

  const formatarCitacao = (c: Citacao) => {
    const parts = [c.autor];
    if (c.ano) parts.push(`(${c.ano})`);
    parts.push(`*${c.obra}*`);
    if (c.editora) parts.push(c.editora);
    if (c.local) parts.push(c.local);
    if (c.pagina) parts.push(`p. ${c.pagina}`);
    return parts.join(', ');
  };

  return (
    <span className={cn('inline-block', className)}>
      <button
        onClick={() => setExpandido(!expandido)}
        className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-[var(--brand-default)]/15 text-[var(--brand-default)] text-[8px] font-bold hover:bg-[var(--brand-default)]/25 transition-colors align-super leading-none"
        aria-label={`Nota ${numero}`}
      >
        {numero}
      </button>
      <AnimatePresence>
        {expandido && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.95 }}
            className="inline-block relative z-10 ml-1"
          >
            <div className="inline-block max-w-xs p-2 rounded-lg bg-[var(--surface-raised)] border border-[var(--border)] shadow-lg text-[11px] text-[var(--content-secondary)] leading-relaxed">
              <span className="font-semibold text-[var(--content-primary)]">{numero}.</span>{' '}
              {formatarCitacao(citacao)}
              {citacao.url && (
                <a
                  href={citacao.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-0.5 ml-1 text-[var(--brand-default)] hover:underline"
                >
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}

interface ListaCitacoesProps {
  citacoes: Citacao[];
  titulo?: string;
}

export function ListaCitacoes({ citacoes, titulo = 'Referências' }: ListaCitacoesProps) {
  return (
    <div className="mt-6 pt-4 border-t border-[var(--border)]/30">
      <div className="flex items-center gap-2 mb-3">
        <BookOpen className="w-4 h-4 text-[var(--brand-default)]" />
        <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--content-muted)]">{titulo}</h4>
      </div>
      <ol className="space-y-2">
        {citacoes.map((c, i) => (
          <li key={c.id} className="flex gap-2 text-[11px] text-[var(--content-secondary)] leading-relaxed">
            <span className="font-semibold text-[var(--content-muted)] shrink-0">[{i + 1}]</span>
            <span>
              {c.autor}. {c.ano && `(${c.ano}).`} <em>{c.obra}</em>.
              {c.editora && ` ${c.editora},`}
              {c.local && ` ${c.local}.`}
              {c.pagina && ` p. ${c.pagina}.`}
              {c.url && (
                <a href={c.url} target="_blank" rel="noopener noreferrer" className="text-[var(--brand-default)] hover:underline ml-1">
                  Disponível em: {c.url}
                </a>
              )}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

interface ObjetoAprendizagem {
  nivel: 'lembrar' | 'compreender' | 'aplicar' | 'analisar' | 'avaliar' | 'criar';
  descricao: string;
}

interface ObjetivosAprendizagemProps {
  objetivos: ObjetoAprendizagem[];
}

const BLOOM_COLORS: Record<string, string> = {
  lembrar: 'bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/20',
  compreender: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20',
  aplicar: 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20',
  analisar: 'bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/20',
  avaliar: 'bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/20',
  criar: 'bg-orange-500/10 text-orange-700 dark:text-orange-300 border-orange-500/20',
};

const BLOOM_LABELS: Record<string, string> = {
  lembrar: 'Lembrar',
  compreender: 'Compreender',
  aplicar: 'Aplicar',
  analisar: 'Analisar',
  avaliar: 'Avaliar',
  criar: 'Criar',
};

export function ObjetivosAprendizagem({ objetivos }: ObjetivosAprendizagemProps) {
  return (
    <div className="p-4 rounded-xl bg-[var(--surface-sunken)]/50 border border-[var(--border)]/30">
      <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--content-muted)] mb-3 flex items-center gap-2">
        <span className="w-5 h-5 rounded-md bg-[var(--brand-default)]/10 flex items-center justify-center text-[10px] font-bold text-[var(--brand-default)]">🎯</span>
        Objetivos de Aprendizagem
      </h4>
      <ul className="space-y-2">
        {objetivos.map((obj, i) => (
          <li key={i} className="flex items-start gap-2 text-[12px] text-[var(--content-secondary)]">
            <span className={cn('px-1.5 py-0.5 rounded text-[9px] font-bold uppercase shrink-0 border', BLOOM_COLORS[obj.nivel])}>
              {BLOOM_LABELS[obj.nivel]}
            </span>
            <span className="leading-relaxed">{obj.descricao}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

interface BibliografiaRecomendadaProps {
  itens: Citacao[];
}

export function BibliografiaRecomendada({ itens }: BibliografiaRecomendadaProps) {
  return (
    <div className="p-4 rounded-xl bg-[var(--surface-sunken)]/50 border border-[var(--border)]/30">
      <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--content-muted)] mb-3 flex items-center gap-2">
        <BookOpen className="w-4 h-4 text-[var(--brand-default)]" />
        Bibliografia Recomendada
      </h4>
      <ul className="space-y-2">
        {itens.map((item) => (
          <li key={item.id} className="flex gap-2 text-[11px] text-[var(--content-secondary)] leading-relaxed">
            <span className="shrink-0">•</span>
            <span>
              <strong className="text-[var(--content-primary)]">{item.autor}</strong>.
              <em> {item.obra}</em>.
              {item.editora && ` ${item.editora},`}
              {item.local && ` ${item.local},`}
              {item.ano && ` ${item.ano}.`}
              {item.pagina && ` p. ${item.pagina}.`}
              {item.url && (
                <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-[var(--brand-default)] hover:underline ml-1">
                  [Link]
                </a>
              )}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
