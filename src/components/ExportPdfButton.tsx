'use client';

import { useState, useCallback } from 'react';
import { Download, FileText, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ExportPdfButtonProps {
  titulo: string;
  conteudo: string;
  versiculoRef?: string;
  className?: string;
}

export function ExportPdfButton({ titulo, conteudo, versiculoRef, className }: ExportPdfButtonProps) {
  const [exporting, setExporting] = useState(false);

  const exportToPdf = useCallback(async () => {
    setExporting(true);
    try {
      // Create a clean HTML document for printing
      const html = `
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
          <meta charset="utf-8">
          <title>${titulo}</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600&family=Inter:wght@400;500;600&display=swap');
            body {
              font-family: 'Cormorant Garamond', serif;
              max-width: 800px;
              margin: 40px auto;
              padding: 20px;
              line-height: 1.8;
              color: #1a1a2e;
              background: #fff;
            }
            h1 {
              font-family: 'Inter', sans-serif;
              font-size: 28px;
              font-weight: 600;
              color: #8B6914;
              border-bottom: 2px solid #f5cd6b;
              padding-bottom: 12px;
              margin-bottom: 24px;
            }
            h2 {
              font-family: 'Inter', sans-serif;
              font-size: 20px;
              font-weight: 600;
              color: #333;
              margin-top: 32px;
              margin-bottom: 12px;
            }
            h3 {
              font-family: 'Inter', sans-serif;
              font-size: 16px;
              font-weight: 600;
              color: #555;
              margin-top: 24px;
              margin-bottom: 8px;
            }
            p {
              font-size: 16px;
              margin-bottom: 12px;
              text-align: justify;
            }
            blockquote {
              border-left: 3px solid #f5cd6b;
              padding-left: 16px;
              margin: 16px 0;
              color: #555;
              font-style: italic;
            }
            .header {
              text-align: center;
              margin-bottom: 40px;
            }
            .header .logo {
              font-family: 'Inter', sans-serif;
              font-size: 12px;
              color: #888;
              text-transform: uppercase;
              letter-spacing: 3px;
              margin-bottom: 8px;
            }
            .verse-ref {
              font-family: 'Inter', sans-serif;
              font-size: 14px;
              color: #8B6914;
              font-weight: 500;
              margin-bottom: 24px;
            }
            .footer {
              margin-top: 40px;
              padding-top: 16px;
              border-top: 1px solid #ddd;
              font-family: 'Inter', sans-serif;
              font-size: 11px;
              color: #888;
              text-align: center;
            }
            @media print {
              body { margin: 20px; }
              .no-print { display: none; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo">Sola Scriptura BR</div>
            <h1>${titulo}</h1>
            ${versiculoRef ? `<div class="verse-ref">${versiculoRef}</div>` : ''}
          </div>
          ${conteudo}
          <div class="footer">
            Gerado por Sola Scriptura BR — solascripturabr.com.br<br>
            ${new Date().toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })}
          </div>
        </body>
        </html>
      `;

      // Open in a new window for printing
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(html);
        printWindow.document.close();
        printWindow.onload = () => {
          printWindow.print();
        };
      }
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setExporting(false);
    }
  }, [titulo, conteudo, versiculoRef]);

  return (
    <button onClick={exportToPdf} disabled={exporting}
      className={cn('flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all border border-border hover:bg-muted/50',
        exporting && 'opacity-50 cursor-not-allowed', className)}>
      {exporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
      {exporting ? 'Exportando...' : 'Exportar PDF'}
    </button>
  );
}
