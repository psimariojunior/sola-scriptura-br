'use client';

import { useCallback, useEffect, useState, type RefObject } from 'react';
import { Copy, PenLine, ImageIcon, X } from 'lucide-react';
import { CORES, COR_SIGNIFICADO, marcarTrecho, type CorMarcador } from '@/lib/marcadores';
import { cn } from '@/lib/utils';

export interface SelecaoTexto {
  inicio: number;
  fim: number;
  texto: string;
  x: number;
  y: number;
}

interface TextSelectionBarProps {
  containerRef: RefObject<HTMLElement | null>;
  textoCompleto: string;
  livro: string;
  capitulo: number;
  versiculo: number;
  traducao: string;
  onImagem?: (trecho: string) => void;
  onCopiar?: (trecho: string) => void;
}

function offsetsDaSelecao(container: HTMLElement): SelecaoTexto | null {
  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0 || sel.isCollapsed) return null;
  const range = sel.getRangeAt(0);
  if (!container.contains(range.commonAncestorContainer)) return null;
  const pre = document.createRange();
  pre.selectNodeContents(container);
  pre.setEnd(range.startContainer, range.startOffset);
  const inicio = pre.toString().length;
  const bruto = sel.toString();
  const texto = bruto.replace(/\s+/g, ' ').trim();
  if (texto.length < 2) return null;
  const fim = inicio + bruto.length;
  const rect = range.getBoundingClientRect();
  return {
    inicio,
    fim,
    texto,
    x: Math.min(Math.max(12, rect.left + rect.width / 2), window.innerWidth - 12),
    y: Math.max(8, rect.top - 8),
  };
}

export function TextSelectionBar({
  containerRef,
  textoCompleto,
  livro,
  capitulo,
  versiculo,
  traducao,
  onImagem,
  onCopiar,
}: TextSelectionBarProps) {
  const [sel, setSel] = useState<SelecaoTexto | null>(null);

  const atualizar = useCallback(() => {
    const el = containerRef.current;
    if (!el) {
      setSel(null);
      return;
    }
    setSel(offsetsDaSelecao(el));
  }, [containerRef]);

  useEffect(() => {
    const onUp = () => {
      requestAnimationFrame(atualizar);
    };
    document.addEventListener('mouseup', onUp);
    document.addEventListener('touchend', onUp);
    return () => {
      document.removeEventListener('mouseup', onUp);
      document.removeEventListener('touchend', onUp);
    };
  }, [atualizar]);

  if (!sel) return null;

  const aplicar = (cor: CorMarcador) => {
    const inicio = Math.max(0, Math.min(sel.inicio, textoCompleto.length));
    const fim = Math.max(inicio + 1, Math.min(sel.fim, textoCompleto.length));
    marcarTrecho(livro, capitulo, versiculo, traducao, inicio, fim, cor, sel.texto);
    window.getSelection()?.removeAllRanges();
    setSel(null);
  };

  return (
    <div
      className="fixed z-[80] -translate-x-1/2 -translate-y-full"
      style={{ left: sel.x, top: sel.y }}
      onMouseDown={(e) => e.preventDefault()}
      onClick={(e) => e.stopPropagation()}
      role="toolbar"
      aria-label="Marcar trecho selecionado"
    >
      <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-xl bg-[var(--surface-raised)] border border-[var(--border)] shadow-xl">
        <PenLine className="w-3.5 h-3.5 text-[var(--brand-default)] shrink-0 ml-0.5" />
        {CORES.map((cor) => (
          <button
            key={cor}
            type="button"
            title={`${COR_SIGNIFICADO[cor].label} — ${COR_SIGNIFICADO[cor].uso}`}
            onClick={() => aplicar(cor)}
            className={cn('w-7 h-7 rounded-full ring-1 ring-black/10 hover:scale-110 transition-transform', COR_SIGNIFICADO[cor].swatch)}
            aria-label={`Marcar como ${COR_SIGNIFICADO[cor].label}`}
          />
        ))}
        <span className="w-px h-5 bg-[var(--border)] mx-0.5" />
        {onCopiar && (
          <button
            type="button"
            className="p-1.5 rounded-lg text-[var(--content-secondary)] hover:bg-[var(--surface-sunken)]"
            aria-label="Copiar trecho"
            onClick={() => {
              onCopiar(sel.texto);
              window.getSelection()?.removeAllRanges();
              setSel(null);
            }}
          >
            <Copy className="w-3.5 h-3.5" />
          </button>
        )}
        {onImagem && (
          <button
            type="button"
            className="p-1.5 rounded-lg text-[var(--content-secondary)] hover:bg-[var(--surface-sunken)]"
            aria-label="Criar imagem do trecho"
            onClick={() => {
              onImagem(sel.texto);
              window.getSelection()?.removeAllRanges();
              setSel(null);
            }}
          >
            <ImageIcon className="w-3.5 h-3.5" />
          </button>
        )}
        <button
          type="button"
          className="p-1.5 rounded-lg text-[var(--content-muted)] hover:bg-[var(--surface-sunken)]"
          aria-label="Fechar"
          onClick={() => {
            window.getSelection()?.removeAllRanges();
            setSel(null);
          }}
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
