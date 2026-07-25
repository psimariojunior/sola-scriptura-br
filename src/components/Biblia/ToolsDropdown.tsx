'use client';

import { Layers, FileText, Download, BookMarked, Play, Settings, Volume2, Users } from 'lucide-react';
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

export function ToolsDropdown({ open, onToggle, onClose, bookName, chapter, data, hasDramatica, onNotas, onExportPdf, onPlanoLeitura, onNarracaoDramatica, onNarrarCapitulo, onConfiguracoes }: ToolsDropdownProps) {
  return (
    <div className="relative">
      <button
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
      {open && (
        <>
          <div className="fixed inset-0 z-30" onClick={onClose} />
          <div
            className="absolute right-0 top-full mt-2 z-40 w-56 bg-[var(--surface-raised)] border border-[var(--border)] rounded-xl shadow-2xl p-1.5 animate-scale-in"
          >
            <ToolItem icon={FileText} label="Notas" onClick={onNotas} />
            <ToolItem icon={Download} label="Exportar PDF" onClick={onExportPdf} />
            <ToolItem icon={BookMarked} label="Plano de Leitura" onClick={onPlanoLeitura} />
            {hasDramatica && <ToolItem icon={Play} label="Narração Dramática" onClick={onNarracaoDramatica} />}
            <ToolItem icon={Volume2} label="Narrar Capítulo" onClick={onNarrarCapitulo} />
             <div className="my-1 h-px bg-[var(--border)]/40" />
             <ToolItem icon={Users} label="Estudo Colaborativo" onClick={() => { window.location.href = '/estudo-colaborativo'; }} />
             <ToolItem icon={Settings} label="Configurações" onClick={onConfiguracoes} />
          </div>
        </>
      )}
    </div>
  );
}
