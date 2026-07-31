'use client';

import { memo, useState, useCallback } from 'react';
import { FileDown, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { StudyData } from '@/lib/studyExport';

interface StudyExportButtonProps {
  livroNome: string;
  livroAbreviacao: string;
  capitulo: number;
  versiculo: number;
  texto: string;
  traducao: string;
  className?: string;
}

function StudyExportButtonInner({
  livroNome,
  livroAbreviacao,
  capitulo,
  versiculo,
  texto,
  traducao,
  className,
}: StudyExportButtonProps) {
  const [exporting, setExporting] = useState(false);

  const handleExport = useCallback(async () => {
    setExporting(true);
    try {
      const { exportStudyPDF } = await import('@/lib/studyExport');

      const studyData: StudyData = {
        livroNome,
        livroAbreviacao,
        capitulo,
        versiculo,
        texto,
        traducao,
      };

      exportStudyPDF(studyData);
    } catch (err) {
      console.error('[studyExport]', err);
    } finally {
      setExporting(false);
    }
  }, [livroNome, livroAbreviacao, capitulo, versiculo, texto, traducao]);

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        handleExport();
      }}
      disabled={exporting}
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium',
        'bg-[var(--brand-subtle)] text-[var(--brand-default)]',
        'hover:bg-[var(--brand-default)]/15 active:scale-95',
        'transition-all duration-200',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        className
      )}
      title="Exportar estudo completo como PDF"
      aria-label={`Exportar estudo de ${livroNome} ${capitulo}:${versiculo} como PDF`}
    >
      {exporting ? (
        <Loader2 className="w-3.5 h-3.5 animate-spin" />
      ) : (
        <FileDown className="w-3.5 h-3.5" />
      )}
      <span>{exporting ? 'Gerando...' : 'Exportar Estudo'}</span>
    </button>
  );
}

export const StudyExportButton = memo(StudyExportButtonInner);
