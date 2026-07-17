'use client';

import { useState, useEffect } from 'react';
import {
  BookOpen, ScrollText, Sparkles, Lightbulb, Link2, Quote, Users, HelpCircle, Tag, List, FileText, Copy, Download, X,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { sintetizarEstudo, estudoParaTexto, type EstudoSintetizado, type BlocoEstudo } from '@/lib/estudoSintetizado';

const ICONES: Record<string, React.ComponentType<{ className?: string }>> = {
  BookOpen, ScrollText, Sparkles, Lightbulb, Link2, Quote, Users, HelpCircle, Tag, List, FileText,
};

interface Props {
  livro: string;
  livroNome: string;
  capitulo: number;
  versiculo?: number;
  onClose?: () => void;
}

export default function EstudoSintetizado({ livro, livroNome, capitulo, versiculo, onClose }: Props) {
  const [estudo, setEstudo] = useState<EstudoSintetizado | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [copiado, setCopiado] = useState(false);
  const [exportando, setExportando] = useState(false);

  useEffect(() => {
    let ativo = true;
    setCarregando(true);
    setEstudo(null);
    sintetizarEstudo(livro, capitulo, versiculo).then((res) => {
      if (!ativo) return;
      setEstudo(res);
      setCarregando(false);
    });
    return () => { ativo = false; };
  }, [livro, capitulo, versiculo]);

  const copiar = async () => {
    if (!estudo) return;
    await navigator.clipboard.writeText(estudoParaTexto(estudo));
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  const exportarPdf = async () => {
    if (!estudo) return;
    setExportando(true);
    try {
      const { exportarEstudo } = await import('@/lib/exportPdf');
      const conteudo = estudo.blocos
        .map((b) => (Array.isArray(b.conteudo) ? b.conteudo.join('\n\n') : b.conteudo))
        .join('\n\n');
      await exportarEstudo({
        titulo: `Estudo Sintetizado — ${estudo.referencia}`,
        conteudo,
        referencia: estudo.referencia,
      });
    } finally {
      setExportando(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="overflow-hidden my-3"
    >
      <div className="border border-[var(--border)]/50 rounded-2xl bg-gradient-to-b from-[var(--surface-raised)] to-[var(--bg)] shadow-sm">
        {/* Cabeçalho */}
        <div className="flex items-center justify-between gap-3 px-4 sm:px-5 py-3 border-b border-[var(--border)]/40">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[var(--brand-default)] to-[var(--brand-hover)] flex items-center justify-center shrink-0 shadow-sm">
              <BookOpen className="w-4 h-4 text-[var(--brand-contrast)]" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--brand-default)] leading-none">
                Estudo Sintetizado
              </p>
              <p className="text-sm font-semibold text-[var(--content-primary)] truncate">
                {livroNome} {capitulo}{versiculo !== undefined ? `:${versiculo}` : ''}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={copiar}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border border-[var(--border)]/60 hover:bg-[var(--surface-sunken)] text-[var(--content-secondary)] transition-colors"
              aria-label="Copiar estudo"
            >
              {copiado ? <span className="text-[var(--brand-default)]">Copiado!</span> : <><Copy className="w-3.5 h-3.5" /> Copiar</>}
            </button>
            <button
              onClick={exportarPdf}
              disabled={exportando}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-[var(--brand-subtle)] text-[var(--brand-default)] border border-[var(--brand-default)]/20 hover:bg-[var(--brand-default)]/15 transition-colors disabled:opacity-50"
              aria-label="Exportar PDF"
            >
              {exportando ? <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" /> : <Download className="w-3.5 h-3.5" />}
              PDF
            </button>
            {onClose && (
              <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-[var(--surface-sunken)] text-[var(--content-muted)] transition-colors" aria-label="Fechar">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Corpo */}
        <div className="px-4 sm:px-5 py-4">
          {carregando ? (
            <div className="flex items-center gap-2 py-6">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-[var(--brand-default)] rounded-full animate-bounce" />
                <span className="w-1.5 h-1.5 bg-[var(--brand-default)] rounded-full animate-bounce [animation-delay:0.15s]" />
                <span className="w-1.5 h-1.5 bg-[var(--brand-default)] rounded-full animate-bounce [animation-delay:0.3s]" />
              </div>
              <span className="text-xs text-[var(--content-muted)]">Sintetizando estudo a partir do conteúdo local…</span>
            </div>
          ) : estudo ? (
            <div className="space-y-4">
              {estudo.fontes.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {estudo.fontes.map((f) => (
                    <span key={f} className="px-2 py-0.5 rounded-full bg-[var(--brand-default)]/10 text-[var(--brand-default)] text-[10px] font-medium">
                      {f}
                    </span>
                  ))}
                </div>
              )}
              {estudo.blocos.map((bloco, i) => (
                <Bloco key={i} bloco={bloco} />
              ))}
            </div>
          ) : (
            <p className="text-xs text-[var(--content-muted)]">Estudo não disponível.</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function Bloco({ bloco }: { bloco: BlocoEstudo }) {
  const Icone = bloco.icone ? ICONES[bloco.icone] : undefined;

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.04 }}
    >
      <div className="flex items-center gap-1.5 mb-1.5">
        {Icone && <Icone className="w-3.5 h-3.5 text-[var(--brand-default)]" />}
        <h3 className="text-[11px] font-bold uppercase tracking-wider text-[var(--content-muted)]">
          {bloco.secao}
        </h3>
      </div>
      {Array.isArray(bloco.conteudo) ? (
        <ul className="space-y-1.5">
          {bloco.conteudo.map((item, i) => (
            <li key={i} className="text-sm text-[var(--content-primary)] leading-relaxed font-serif-body border-l-2 border-[var(--border)]/50 pl-3">
              <span className="whitespace-pre-wrap">{item}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-[var(--content-primary)] leading-relaxed font-serif-body border-l-2 border-[var(--border)]/50 pl-3">
          <span className="whitespace-pre-wrap">{bloco.conteudo}</span>
        </p>
      )}
    </motion.section>
  );
}
