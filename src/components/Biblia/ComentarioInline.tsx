'use client';

import { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Comentario } from '@/data/comentarios';
import { renderizarReferencias } from '@/components/VersiculoLink';

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
  defaultExpanded?: boolean;
}

function ComentarioConteudo({ livro, capitulo, verso, defaultExpanded }: { livro: string; capitulo: number; verso: number; defaultExpanded?: boolean }) {
  const [comentarios, setComentarios] = useState<Comentario[]>([]);
  const [expandido, setExpandido] = useState(!!defaultExpanded);
  const [carregado, setCarregado] = useState(false);
  const [sintese, setSintese] = useState<string | null>(null);
  const [proximoDe, setProximoDe] = useState<number | null>(null);

  useEffect(() => {
    let cancelado = false;
    setSintese(null);
    setProximoDe(null);
    comentariosModulePromise.then(async (mod) => {
      if (cancelado) return;
      let resultado = mod.obterComentarios(livro, capitulo, verso);
      if (resultado.length === 0) {
        const classicos = await import('@/data/comentariosClassicos');
        const proximo = classicos.obterComentarioClassicoProximo(livro, capitulo, verso);
        if (proximo.length > 0) {
          resultado = proximo;
          if (!cancelado) setProximoDe(proximo[0].versiculo);
        } else {
          const estudos = await import('@/lib/estudosLoader');
          const ficha = estudos.obterEstudoCapitulo(livro, capitulo);
          if (!cancelado) setSintese(ficha.resumo);
        }
      }
      if (!cancelado) {
        setComentarios(resultado);
        setCarregado(true);
      }
    });
    return () => { cancelado = true; };
  }, [livro, capitulo, verso]);

  useEffect(() => {
    setExpandido(!!defaultExpanded);
  }, [defaultExpanded]);

  if (!carregado) return null;
  if (comentarios.length === 0) {
    if (!sintese) return null;
    return (
      <div className="mt-2 border-t border-[var(--brand-default)]/10 pt-2 first:border-t-0 first:mt-0 first:pt-0">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--content-muted)] mb-1">
          Síntese da ficha (não é Henry/JFB)
        </p>
        <p className="text-[13px] leading-relaxed text-[var(--content-secondary)] font-serif-body line-clamp-4">
          {sintese}
        </p>
      </div>
    );
  }

  const principal = comentarios[0];

  return (
    <div className="mt-2 border-t border-[var(--brand-default)]/10 pt-2 first:border-t-0 first:mt-0 first:pt-0">
      <button
        type="button"
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

      {!expandido && principal && (
        <p className="mt-2 text-[13px] leading-relaxed text-[var(--content-secondary)] font-serif-body line-clamp-3">
          <span className="font-semibold text-[var(--brand-default)]">{principal.autor}: </span>
          {proximoDe && proximoDe !== verso && (
            <span className="text-[var(--content-muted)] font-normal">v.{proximoDe} · </span>
          )}
          {principal.texto}
        </p>
      )}

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
              {comentarios.map((c, i) => (
                <ComentarioCard key={`${c.autor}-${i}`} comentario={c} />
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

  const fonteLabel = comentario.fonte === 'resumo' ? ' (resumo)' :
    comentario.fonte === 'dominio-publico' ? ' (domínio público)' : '';

  return (
    <div className="bg-[var(--surface-sunken)]/60 rounded-lg px-3 py-2 border border-[var(--brand-default)]/10">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-[9px] font-bold uppercase tracking-wider text-[var(--brand-default)] bg-[var(--brand-subtle)] px-1.5 py-0.5 rounded">
          {tipoLabel[comentario.tipo] || comentario.tipo}
        </span>
        <span className="text-[10px] font-semibold text-[var(--content-secondary)]">
          {comentario.autor}
          {fonteLabel && <span className="text-[var(--content-muted)] font-normal">{fonteLabel}</span>}
        </span>
      </div>
      <p className="text-xs text-[var(--content-secondary)] leading-relaxed font-serif-body">
        {renderizarReferencias(expandidoTexto || !precisaTruncar ? comentario.texto : textoCurto, `comentario-${comentario.autor}`)}
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

export function ComentarioInline({ livro, capitulo, verso, className, defaultExpanded }: ComentarioInlineProps) {
  return (
    <div className={cn('relative', className)} onClick={(e) => e.stopPropagation()}>
      <Suspense fallback={<ComentarioInlineFallback />}>
        <ComentarioConteudo livro={livro} capitulo={capitulo} verso={verso} defaultExpanded={defaultExpanded} />
      </Suspense>
    </div>
  );
}
