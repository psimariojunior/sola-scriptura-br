'use client';

import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileDown, Loader2, Check } from 'lucide-react';

interface ExportPdfProps {
  titulo: string;
  conteudo: string;
  subtitulo?: string;
}

export function ExportPdf({ titulo, conteudo, subtitulo }: ExportPdfProps) {
  const [gerando, setGerando] = useState(false);
  const [sucesso, setSucesso] = useState(false);

  const gerarPDF = useCallback(async () => {
    setGerando(true);
    try {
      const { jsPDF } = await import('jspdf');
      const html2canvas = (await import('html2canvas')).default;

      const doc = new jsPDF('p', 'mm', 'a4');
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 20;
      const contentWidth = pageWidth - margin * 2;

      // Cabeçalho
      doc.setFillColor(30, 30, 30);
      doc.rect(0, 0, pageWidth, 40, 'F');

      doc.setTextColor(212, 168, 67);
      doc.setFontSize(22);
      doc.setFont('helvetica', 'bold');
      doc.text('Sola Scriptura', margin, 18);

      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(180, 180, 180);
      doc.text('Estudo Bíblico Acadêmico', margin, 26);

      doc.setDrawColor(212, 168, 67);
      doc.setLineWidth(0.5);
      doc.line(margin, 36, pageWidth - margin, 36);

      // Título
      doc.setTextColor(20, 20, 20);
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      const tituloLines = doc.splitTextToSize(titulo, contentWidth);
      doc.text(tituloLines, margin, 52);

      let yOffset = 52 + tituloLines.length * 8;

      if (subtitulo) {
        doc.setFontSize(10);
        doc.setFont('helvetica', 'italic');
        doc.setTextColor(100, 100, 100);
        const subLines = doc.splitTextToSize(subtitulo, contentWidth);
        doc.text(subLines, margin, yOffset + 2);
        yOffset += subLines.length * 5 + 6;
      }

      // Separador
      doc.setDrawColor(200, 200, 200);
      doc.setLineWidth(0.2);
      doc.line(margin, yOffset, pageWidth - margin, yOffset);
      yOffset += 8;

      // Conteúdo
      doc.setTextColor(30, 30, 30);
      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      const lines = doc.splitTextToSize(conteudo, contentWidth);
      const lineHeight = 5.5;

      for (const line of lines) {
        if (yOffset + lineHeight > pageHeight - 30) {
          // Rodapé da página
          doc.setFontSize(8);
          doc.setTextColor(150, 150, 150);
          doc.text(
            `Sola Scriptura — Estudo Bíblico Acadêmico  |  Página ${doc.getCurrentPageInfo().pageNumber}`,
            pageWidth / 2,
            pageHeight - 10,
            { align: 'center' }
          );

          doc.addPage();

          // Cabeçalho da nova página
          doc.setFillColor(248, 248, 248);
          doc.rect(0, 0, pageWidth, 12, 'F');
          doc.setDrawColor(212, 168, 67);
          doc.setLineWidth(0.3);
          doc.line(margin, 12, pageWidth - margin, 12);

          doc.setFontSize(8);
          doc.setTextColor(150, 150, 150);
          doc.setFont('helvetica', 'italic');
          doc.text(titulo.substring(0, 60) + (titulo.length > 60 ? '...' : ''), margin, 8);

          doc.setFont('helvetica', 'normal');
          doc.setTextColor(30, 30, 30);
          doc.setFontSize(11);
          yOffset = 20;
        }
        doc.text(line, margin, yOffset);
        yOffset += lineHeight;
      }

      // Rodapé final
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.text(
        `Sola Scriptura — Estudo Bíblico Acadêmico  |  Página ${doc.getCurrentPageInfo().pageNumber}`,
        pageWidth / 2,
        pageHeight - 10,
        { align: 'center' }
      );

      doc.setDrawColor(212, 168, 67);
      doc.setLineWidth(0.5);
      doc.line(margin, pageHeight - 16, pageWidth - margin, pageHeight - 16);

      doc.setFontSize(7);
      doc.setTextColor(120, 120, 120);
      doc.text(
        'Gerado por Sola Scriptura — sola-scriptura-two.vercel.app',
        pageWidth / 2,
        pageHeight - 13,
        { align: 'center' }
      );

      const nomeArquivo = titulo
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9 ]/g, '')
        .trim()
        .replace(/\s+/g, '-')
        .substring(0, 50);

      doc.save(`${nomeArquivo || 'sola-scriptura'}.pdf`);
      setSucesso(true);
      setTimeout(() => setSucesso(false), 2500);
    } catch (err) {
      console.error('Erro ao gerar PDF:', err);
    } finally {
      setGerando(false);
    }
  }, [titulo, conteudo, subtitulo]);

  return (
    <motion.button
      onClick={gerarPDF}
      disabled={gerando}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg border border-border/50 hover:border-primary/30 hover:bg-primary/5 disabled:opacity-50 transition-all duration-200"
    >
      <AnimatePresence mode="wait">
        {gerando ? (
          <motion.span
            key="loading"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
          >
            <Loader2 className="w-3.5 h-3.5" />
          </motion.span>
        ) : sucesso ? (
          <motion.span
            key="check"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="text-green-500"
          >
            <Check className="w-3.5 h-3.5" />
          </motion.span>
        ) : (
          <motion.span
            key="pdf"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            <FileDown className="w-3.5 h-3.5" />
          </motion.span>
        )}
      </AnimatePresence>
      {gerando ? 'Gerando...' : sucesso ? 'Baixado!' : 'Exportar PDF'}
    </motion.button>
  );
}
