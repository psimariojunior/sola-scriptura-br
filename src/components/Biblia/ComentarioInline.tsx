'use client';

import { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Comentario } from '@/data/comentarios';

// Lazy-load do módulo de comentários (2.5MB)
const comentariosModulePromise = import('@/data/comentarios');

function ComentarioInlineFallback() {
  return (
    <div className="flex items-center gap-1.5 py-2">
      <span className="w-1.5 h-1.5 bg-[var(--brand-default)] rounded-full animate-bounce" />
      <span className="w-1.5 h-1.5 bg-[var(--brand-default)] rounded-full animate-bounce [animation-delay:0.15s]" />
      <span className="w-1.5 h-1.5 bg-[var(--brand-default)] rounded-full animate-bounce [animation-delay:0.3s]" />
    </div>
  );
}

interface ComentarioInlineProps {
  livro: string;
  capitulo: number;
  verso: number;
  className?: string;
}

function ComentarioConteudo({ livro, capitulo, verso }: { livro: string; capitulo: number; verso: number }) {
  const [comentarios, setComentarios] = useState<Comentario[]>([]);
  const [expandido, setExpandido] = useState(false);
  const [carregado, setCarregado] = useState(false);

  useEffect(() => {
    let cancelado = false;
    comentariosModulePromise.then(mod => {
      if (!cancelado) {
        const resultado = mod.obterComentarios(livro, capitulo, verso);
        setComentarios(resultado);
        setCarregado(true);
      }
    });
    return () => { cancelado = true; };
  }, [livro, capitulo, verso]);

  if (!carregado || comentarios.length === 0) return null;

  const primeiros = comentarios.slice(0, 2);
  const resto = comentarios.slice(2);

  return (
    <div className="mt-2 border-t border-[var(--brand-default)]/10 pt-2">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setExpandido(!expandido);
        }}
        className={cn(
          'inline-flex items-center gap-1.5 text-[10px] font-semibold px-2 py-1 rounded-md transition-colors',
          'bg-[var(--brand-subtle)] text-[var(--brand-default)]',
          'hover:bg-[var(--brand-default)]/15'
        )}
      >
        <MessageSquare className="w-3 h-3" />
        <span>{comentarios.length} comentário{comentarios.length !== 1 ? 's' : ''}</span>
        {expandido ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
      </button>

      <AnimatePresence>
        {expandido && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mt-2 space-y-2">
              {(expandido ? comentarios : primeiros).map((c, i) => (
                <ComentarioCard key={`${c.autor}-${i}`} comentario={c} truncado={!expandido && i >= 2} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ComentarioCard({ comentario, truncado }: { comentario: Comentario; truncado?: boolean }) {
  const [expandidoTexto, setExpandidoTexto] = useState(false);
  const textoCurto = comentario.texto.length > 200 ? comentario.texto.slice(0, 200) + '...' : comentario.texto;
  const precisaTruncar = comentario.texto.length > 200;

  const tipoLabel: Record<Comentario['tipo'], string> = {
    historico: 'Histórico',
    teologico: 'Teológico',
    gramatical: 'Gramatical',
    cultural: 'Cultural',
    aplicacao: 'Aplicação',
    escatologico: 'Escatológico',
  };

  return (
    <div className="bg-[var(--surface-sunken)]/60 rounded-lg px-3 py-2 border border-[var(--brand-default)]/10">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-[9px] font-bold uppercase tracking-wider text-[var(--brand-default)] bg-[var(--brand-subtle)] px-1.5 py-0.5 rounded">
          {tipoLabel[comentario.tipo] || comentario.tipo}
        </span>
        <span className="text-[10px] font-semibold text-[var(--content-secondary)]">
          {comentario.autor}
        </span>
      </div>
      <p className="text-xs text-[var(--content-secondary)] leading-relaxed font-serif-body">
        {expandidoTexto || !precisaTruncar ? comentario.texto : textoCurto}
        {precisaTruncar && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setExpandidoTexto(!expandidoTexto);
            }}
            className="ml-1 text-[var(--brand-default)] font-semibold hover:underline text-[10px]"
          >
            {expandidoTexto ? 'ler menos' : 'ler mais'}
          </button>
        )}
      </p>
    </div>
  );
}

export function ComentarioInline({ livro, capitulo, verso, className }: ComentarioInlineProps) {
  return (
    <div className={cn('relative', className)} onClick={(e) => e.stopPropagation()}>
      <Suspense fallback={<ComentarioInlineFallback />}>
        <ComentarioConteudo livro={livro} capitulo={capitulo} verso={verso} />
      </Suspense>
    </div>
  );
}
