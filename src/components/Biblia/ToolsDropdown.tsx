'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Layers, FileText, Download, BookMarked, Play, Settings, Volume2, Users, Compass } from 'lucide-react';
import { hrefGuia } from '@/lib/bibliaHref';
import { cn } from '@/lib/utils';
import type { CapituloComparado } from '@/data/biblia';

interface ToolItemProps {
  icon: typeof Layers;
  label: string;
  onClick: () => void;
}

function ToolItem({ icon: Icon, label, onClick }: ToolItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-[var(--content-secondary)] hover:bg-[var(--surface-sunken)] hover:text-[var(--content-primary)] transition-colors"
    >
      <Icon className="w-4 h-4" />
      <span>{label}</span>
    </button>
  );
}

interface ToolsDropdownProps {
  open: boolean;
  onToggle: () => void;
  onClose: () => void;
  bookName: string;
  chapter: number;
  data: CapituloComparado[];
  hasDramatica: boolean;
  onNotas: () => void;
  onExportPdf: () => void;
  onPlanoLeitura: () => void;
  onNarracaoDramatica: () => void;
  onNarrarCapitulo: () => void;
  onConfiguracoes: () => void;
}

export function ToolsDropdown({
  open, onToggle, onClose, bookName, chapter, hasDramatica, onNotas, onExportPdf, onPlanoLeitura,
  onNarracaoDramatica, onNarrarCapitulo, onConfiguracoes,
}: ToolsDropdownProps) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [pos, setPos] = useState({ top: 0, right: 12 });

  useEffect(() => {
    if (!open || !btnRef.current) return;
    const place = () => {
      const rect = btnRef.current!.getBoundingClientRect();
      setPos({ top: rect.bottom + 8, right: Math.max(8, window.innerWidth - rect.right) });
    };
    place();
    window.addEventListener('resize', place);
    window.addEventListener('scroll', place, true);
    return () => {
      window.removeEventListener('resize', place);
      window.removeEventListener('scroll', place, true);
    };
  }, [open]);

  const menu = open && typeof document !== 'undefined' ? createPortal(
    <>
      <div className="fixed inset-0 z-[70]" onClick={onClose} aria-hidden="true" />
      <div
        className="fixed z-[80] w-56 bg-[var(--surface-raised)] border border-[var(--border)] rounded-xl shadow-2xl p-1.5 animate-scale-in origin-top-right"
        style={{ top: pos.top, right: pos.right }}
      >
        <ToolItem icon={FileText} label="Notas" onClick={onNotas} />
        <ToolItem icon={Download} label="Exportar PDF" onClick={onExportPdf} />
        <ToolItem icon={BookMarked} label="Plano de Leitura" onClick={onPlanoLeitura} />
        {hasDramatica && <ToolItem icon={Play} label="Narração Dramática" onClick={onNarracaoDramatica} />}
        <ToolItem icon={Volume2} label="Narrar Capítulo" onClick={onNarrarCapitulo} />
        <div className="my-1 h-px bg-[var(--border)]/40" />
        <ToolItem icon={Users} label="Estudo Colaborativo" onClick={() => { window.location.href = '/estudo-colaborativo'; }} />
        <ToolItem icon={Compass} label="Guia da passagem" onClick={() => { window.location.href = hrefGuia(bookName, chapter); }} />
        <ToolItem icon={Settings} label="Configurações" onClick={onConfiguracoes} />
      </div>
    </>,
    document.body
  ) : null;

  return (
    <div className="relative">
      <button
        ref={btnRef}
        type="button"
        onClick={onToggle}
        className={cn(
          'p-1.5 rounded-lg transition-colors active:scale-95 transition-transform',
          open ? 'bg-[var(--brand-subtle)] text-[var(--brand-default)]' : 'text-[var(--content-secondary)] hover:bg-[var(--surface-sunken)]'
        )}
        title="Ferramentas"
        aria-label="Ferramentas"
        aria-expanded={open}
      >
        <Layers className="w-4 h-4" />
      </button>
      {menu}
    </div>
  );
}
