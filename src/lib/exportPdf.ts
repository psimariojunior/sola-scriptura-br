import jsPDF from 'jspdf';

interface Verse {
  numero: number;
  texto: string;
}

interface TranslationData {
  traducao: string;
  versiculos: Verse[];
}

export async function exportChapterPdf(
  livroNome: string,
  capitulo: number,
  data: TranslationData[]
) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;

  // Colors
  const primary = [74, 55, 40] as const;
  const muted = [122, 110, 98] as const;
  const light = [226, 217, 205] as const;

  // Header
  doc.setFillColor(...primary);
  doc.rect(0, 0, pageWidth, 45, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(24);
  doc.text('Sola Scriptura', margin, 18);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Estudo Bíblico Acadêmico', margin, 26);

  // Ornament line
  doc.setDrawColor(196, 162, 101);
  doc.setLineWidth(0.5);
  doc.line(margin, 38, pageWidth - margin, 38);

  // Title
  let y = 58;
  doc.setTextColor(...primary);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.text(`${livroNome} ${capitulo}`, margin, y);

  y += 8;
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...muted);
  const trads = data.map(d => d.traducao.toUpperCase()).join(' · ');
  doc.text(trads, margin, y);

  y += 5;
  doc.setDrawColor(...light);
  doc.setLineWidth(0.3);
  doc.line(margin, y, pageWidth - margin, y);
  y += 8;

  // Verses
  const maxVerses = Math.max(...data.map(d => d.versiculos.length));

  for (let i = 0; i < maxVerses; i++) {
    // Check if we need a new page
    if (y > pageHeight - 25) {
      doc.addPage();
      y = 20;
    }

    // Verse number
    doc.setFillColor(250, 247, 242);
    doc.roundedRect(margin, y - 4, 8, 8, 1, 1, 'F');
    doc.setTextColor(...primary);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.text(String(i + 1), margin + 4, y + 0.5, { align: 'center' });

    let verseY = y;

    for (let t = 0; t < data.length; t++) {
      const verse = data[t].versiculos[i];
      if (!verse) continue;

      if (verseY > pageHeight - 25) {
        doc.addPage();
        verseY = 20;
      }

      // Translation badge
      if (data.length > 1) {
        doc.setFillColor(245, 240, 232);
        doc.roundedRect(margin + 12, verseY - 3.5, 12, 5, 1, 1, 'F');
        doc.setTextColor(...muted);
        doc.setFontSize(6);
        doc.setFont('helvetica', 'bold');
        doc.text(data[t].traducao.toUpperCase(), margin + 18, verseY, { align: 'center' });
      }

      // Verse text
      doc.setTextColor(44, 24, 16);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);

      const textX = data.length > 1 ? margin + 26 : margin + 12;
      const maxWidth = contentWidth - (textX - margin);

      const lines = doc.splitTextToSize(verse.texto, maxWidth);
      doc.text(lines, textX, verseY);

      verseY += lines.length * 4.5 + 2;
    }

    y = Math.max(y + 8, verseY + 4);

    // Separator
    if (i < maxVerses - 1) {
      doc.setDrawColor(240, 235, 228);
      doc.setLineWidth(0.2);
      doc.line(margin + 12, y - 2, pageWidth - margin, y - 2);
    }
  }

  // Footer
  const totalPages = doc.getNumberOfPages();
  for (let p = 1; p <= totalPages; p++) {
    doc.setPage(p);
    doc.setFillColor(250, 247, 242);
    doc.rect(0, pageHeight - 15, pageWidth, 15, 'F');
    doc.setTextColor(...muted);
    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');
    doc.text(`Sola Scriptura — ${livroNome} ${capitulo}`, margin, pageHeight - 8);
    doc.text(`Página ${p} de ${totalPages}`, pageWidth - margin, pageHeight - 8, { align: 'right' });
  }

  doc.save(`${livroNome}_${capitulo}_sola_scriptura.pdf`);
}
