'use client';

import { X, Copy, Share2, BookOpen, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { usePassageGuideData } from './hooks/usePassageGuideData';
import { VerseTextSection } from './sections/VerseTextSection';
import { ComentariosSection } from './sections/ComentariosSection';
import { CrossRefsSection } from './sections/CrossRefsSection';
import { LexicoSection } from './sections/LexicoSection';
import { EstudoSection } from './sections/EstudoSection';
import { MapaSection } from './sections/MapaSection';
import { ContextoSection } from './sections/ContextoSection';
import { IASection } from './sections/IASection';
import { hrefBiblia } from '@/lib/bibliaHref';

export interface PassageGuideProps {
  open: boolean;
  onClose: () => void;
  livro: string;
  livroNome: string;
  capitulo: number;
  versiculo: number;
  texto: string;
  traducao: string;
  isMobile: boolean;
}

export function PassageGuide({
  open,
  onClose,
  livro,
  livroNome,
  capitulo,
  versiculo,
  texto,
  traducao,
  isMobile,
}: PassageGuideProps) {
  const data = usePassageGuideData(livro, capitulo, versiculo);
  const refLabel = `${livroNome} ${capitulo}:${versiculo}`;
  const href = hrefBiblia(livro, capitulo, versiculo);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(`${refLabel}\n${texto}`);
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title: refLabel, text: `${refLabel}\n\n${texto}` });
    }
  };

  const content = (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="shrink-0 px-4 py-3 border-b border-[var(--border)] bg-[var(--surface-raised)]">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[var(--brand-default)]" />
            <h2 className="font-display text-lg font-bold text-[var(--content-primary)]">
              {refLabel}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-[var(--surface-sunken)] transition-colors"
            aria-label="Fechar"
          >
            <X className="w-5 h-5 text-[var(--content-muted)]" />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <a
            href={href}
            className="inline-flex items-center gap-1 text-xs text-[var(--brand-default)] hover:underline"
          >
            <ExternalLink className="w-3 h-3" />
            Ler na Bíblia
          </a>
          <span className="text-[var(--content-muted)]">·</span>
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1 text-xs text-[var(--content-muted)] hover:text-[var(--content-primary)] transition-colors"
          >
            <Copy className="w-3 h-3" />
            Copiar
          </button>
          <span className="text-[var(--content-muted)]">·</span>
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1 text-xs text-[var(--content-muted)] hover:text-[var(--content-primary)] transition-colors"
          >
            <Share2 className="w-3 h-3" />
            Compartilhar
          </button>
        </div>
      </div>

      {/* Sections */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        <VerseTextSection
          livroNome={livroNome}
          capitulo={capitulo}
          versiculo={versiculo}
          texto={texto}
          traducao={traducao}
        />
        <ComentariosSection
          comentarios={data.comentarios.data}
          loading={data.comentarios.loading}
          loaded={data.comentarios.loaded}
        />
        <EstudoSection
          estudos={data.estudos.data}
          loading={data.estudos.loading}
          loaded={data.estudos.loaded}
        />
        <CrossRefsSection
          crossRefs={data.crossRefs.data}
          loading={data.crossRefs.loading}
          loaded={data.crossRefs.loaded}
          livroAtual={livro}
          capituloAtual={capitulo}
          versiculoAtual={versiculo}
        />
        <LexicoSection
          palavras={data.lexico.data}
          loading={data.lexico.loading}
          loaded={data.lexico.loaded}
        />
        <MapaSection
          locais={data.locais.data}
          loading={data.locais.loading}
          loaded={data.locais.loaded}
          livroAtual={livro}
          capituloAtual={capitulo}
          versiculoAtual={versiculo}
        />
        <ContextoSection
          livroNome={livroNome}
          capitulo={capitulo}
        />
        <IASection
          livro={livro}
          capitulo={capitulo}
          versiculo={versiculo}
          texto={texto}
        />
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/40"
              onClick={onClose}
            />
            <motion.div
              role="dialog"
              aria-label={`Guia da passagem: ${refLabel}`}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className={cn(
                'fixed bottom-0 left-0 right-0 z-50',
                'bg-[var(--surface-raised)] rounded-t-2xl shadow-2xl',
                'flex flex-col max-h-[85vh] min-h-[200px]'
              )}
            >
              {/* Handle */}
              <div className="flex justify-center pt-2 pb-1 shrink-0">
                <div className="w-10 h-1 rounded-full bg-[var(--content-muted)] opacity-30" />
              </div>
              {content}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    );
  }

  // Desktop: sidebar
  return (
    <AnimatePresence>
      {open && (
        <motion.aside
          role="dialog"
          aria-label={`Guia da passagem: ${refLabel}`}
          initial={{ x: '100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          className={cn(
            'fixed top-0 right-0 bottom-0 z-40',
            'bg-[var(--surface-raised)] shadow-2xl border-l border-[var(--border)]',
            'w-full sm:w-[380px] lg:w-[420px]'
          )}
        >
          {content}
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
