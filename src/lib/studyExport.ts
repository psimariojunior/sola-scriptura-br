import jsPDF from 'jspdf';
import type { PalavraStrong } from '@/data/biblia/strong';
import type { CrossReference } from '@/data/biblia/crossReferences';

export interface StudyData {
  livroNome: string;
  livroAbreviacao: string;
  capitulo: number;
  versiculo: number;
  texto: string;
  traducao: string;
  notas?: string;
  comentarios?: { autor: string; texto: string; tipo?: string }[];
}

const TEMAS = {
  light: {
    fundo: [250, 250, 250] as [number, number, number],
    texto: [30, 30, 30] as [number, number, number],
    textoSecundario: [120, 120, 120] as [number, number, number],
    primario: [87, 56, 29] as [number, number, number],
    primarioEscuro: [60, 38, 18] as [number, number, number],
    dourado: [180, 140, 50] as [number, number, number],
    borda: [220, 215, 205] as [number, number, number],
    fundoCartao: [245, 240, 232] as [number, number, number],
    fundoRodape: [248, 248, 248] as [number, number, number],
  },
};

function formatReference(ref: string): string {
  return ref.replace(/:(\d+)/g, ':$1').replace(/\s+/g, ' ').trim();
}

export async function exportStudyPDF(study: StudyData): Promise<void> {
  const cores = TEMAS.light;
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const pw = doc.internal.pageSize.getWidth();
  const ph = doc.internal.pageSize.getHeight();
  const margem = 20;
  const cw = pw - 2 * margem;

  // ── Capa ──
  doc.setFillColor(...cores.primarioEscuro);
  doc.rect(0, 0, pw, ph, 'F');

  doc.setDrawColor(...cores.dourado);
  doc.setLineWidth(0.5);
  doc.rect(margem + 10, 30, pw - 2 * margem - 20, ph - 60, 'S');
  doc.setLineWidth(0.3);
  doc.rect(margem + 14, 34, pw - 2 * margem - 28, ph - 68, 'S');

  doc.setTextColor(...cores.dourado);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(28);
  doc.text('Sola Scriptura', pw / 2, ph / 2 - 60, { align: 'center' });

  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(200, 180, 140);
  doc.text('Estudo Bíblico', pw / 2, ph / 2 - 45, { align: 'center' });

  doc.setDrawColor(...cores.dourado);
  doc.setLineWidth(0.5);
  doc.line(pw / 2 - 40, ph / 2 - 35, pw / 2 + 40, ph / 2 - 35);

  const titulo = `${study.livroNome} ${study.capitulo}:${study.versiculo}`;
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.text(titulo, pw / 2, ph / 2 - 10, { align: 'center' });

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(13);
  doc.setTextColor(180, 160, 120);
  doc.text(study.traducao, pw / 2, ph / 2 + 10, { align: 'center' });

  const dataAtual = new Date().toLocaleDateString('pt-BR');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(180, 160, 120);
  doc.text(`Data: ${dataAtual}`, pw / 2, ph / 2 + 40, { align: 'center' });

  doc.setFontSize(7);
  doc.setTextColor(120, 100, 70);
  doc.text('solascripturabr.com.br', pw / 2, ph - 30, { align: 'center' });

  // ── Buscar dados (lazy: nao sincrono para nao inflar bundle) ──
  const [strongsMod, refsMod] = await Promise.all([
    import('@/data/biblia/strong'),
    import('@/data/biblia/crossReferences'),
  ]);
  const strongs: PalavraStrong[] = strongsMod.getStrongPorVersiculo(study.livroAbreviacao, study.capitulo, study.versiculo) ?? [];
  const refs: CrossReference[] = refsMod.getCrossReferencesByVerse ? refsMod.getCrossReferencesByVerse(study.livroAbreviacao, study.capitulo, study.versiculo) : [];

  // ── Página do Versículo ──
  doc.addPage();
  let y = margem + 5;

  // Cabeçalho da seção
  doc.setFillColor(...cores.primarioEscuro);
  doc.rect(0, 0, pw, 14, 'F');
  doc.setDrawColor(...cores.dourado);
  doc.setLineWidth(0.3);
  doc.line(margem, 14, pw - margem, 14);
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.text('Sola Scriptura', margem, 9);
  doc.setTextColor(200, 200, 200);
  doc.setFont('helvetica', 'italic');
  doc.text(titulo, pw - margem, 9, { align: 'right' });

  y = 22;

  // Título
  doc.setTextColor(...cores.primario);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text(titulo, margem, y);
  y += 5;
  doc.setDrawColor(...cores.dourado);
  doc.setLineWidth(0.5);
  doc.line(margem, y, margem + 40, y);
  y += 8;

  // Texto do versículo
  doc.setFont('times', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(...cores.texto);
  const textoLinhas = doc.splitTextToSize(`"${study.texto}"`, cw - 10);
  doc.text(textoLinhas, margem + 5, y);
  y += textoLinhas.length * 6 + 4;

  // Tradução
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(9);
  doc.setTextColor(...cores.textoSecundario);
  doc.text(`— ${study.traducao}`, margem + 5, y);
  y += 10;

  doc.setDrawColor(...cores.borda);
  doc.setLineWidth(0.15);
  doc.line(margem, y, pw - margem, y);
  y += 8;

  // ── Palavras Strong ──
  if (strongs.length > 0) {
    if (y > ph - 60) {
      doc.addPage();
      y = margem + 10;
    }

    doc.setTextColor(...cores.primario);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.text('Palavras no Original', margem, y);
    y += 3;
    doc.setDrawColor(...cores.dourado);
    doc.setLineWidth(0.3);
    doc.line(margem, y, margem + 35, y);
    y += 6;

    // Cabeçalho da tabela
    const colWidths = [18, 25, 30, cw - 73];
    const headers = ['Código', 'Palavra', 'Transliteração', 'Definição'];

    doc.setFillColor(...cores.fundoCartao);
    doc.rect(margem, y - 3.5, cw, 6, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(...cores.primario);

    let x = margem + 2;
    headers.forEach((h, i) => {
      doc.text(h, x, y);
      x += colWidths[i];
    });
    y += 6;

    // Linhas da tabela
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    for (const s of strongs) {
      if (y > ph - 25) {
        doc.addPage();
        y = margem + 10;
        // Re-desenhar cabeçalho
        doc.setFillColor(...cores.fundoCartao);
        doc.rect(margem, y - 3.5, cw, 6, 'F');
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(7);
        doc.setTextColor(...cores.primario);
        x = margem + 2;
        headers.forEach((h, i) => {
          doc.text(h, x, y);
          x += colWidths[i];
        });
        y += 6;
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7);
      }

      doc.setTextColor(...cores.primario);
      doc.setFont('helvetica', 'bold');
      doc.text(s.strong.substring(0, 8), margem + 2, y);

      doc.setFont('helvetica', 'normal');
      doc.setTextColor(...cores.texto);
      doc.text(s.palavra.substring(0, 14), margem + 2 + colWidths[0], y);
      doc.text(s.transliteracao.substring(0, 16), margem + 2 + colWidths[0] + colWidths[1], y);

      doc.setTextColor(...cores.textoSecundario);
      const defLinhas = doc.splitTextToSize(s.definicao, colWidths[3] - 2);
      doc.text(defLinhas[0], margem + 2 + colWidths[0] + colWidths[1] + colWidths[2], y);

      y += 5;
      doc.setDrawColor(...cores.borda);
      doc.setLineWidth(0.1);
      doc.line(margem, y - 1.5, pw - margem, y - 1.5);
      y += 1;
    }
    y += 4;
  }

  // ── Referências Cruzadas ──
  if (refs.length > 0) {
    if (y > ph - 40) {
      doc.addPage();
      y = margem + 10;
    }

    doc.setTextColor(...cores.primario);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.text(`Referências Cruzadas (${refs.length})`, margem, y);
    y += 3;
    doc.setDrawColor(...cores.dourado);
    doc.setLineWidth(0.3);
    doc.line(margem, y, margem + 50, y);
    y += 6;

    const TYPE_LABELS: Record<CrossReference['type'], string> = {
      parallel: 'Paralelos',
      fulfillment: 'Cumprimento',
      quotation: 'Citação',
      contrast: 'Contraste',
      thematic: 'Temático',
      typology: 'Tipologia',
    };

    for (const ref of refs) {
      if (y > ph - 25) {
        doc.addPage();
        y = margem + 10;
      }

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(...cores.primario);
      doc.text(`[${TYPE_LABELS[ref.type]}]`, margem, y);

      doc.setFont('helvetica', 'normal');
      doc.setTextColor(...cores.texto);
      doc.text(`${formatReference(ref.from)} → ${ref.to}`, margem + 25, y);
      y += 4;

      if (ref.description) {
        doc.setFont('helvetica', 'italic');
        doc.setFontSize(7);
        doc.setTextColor(...cores.textoSecundario);
        const descLinhas = doc.splitTextToSize(ref.description, cw - 10);
        doc.text(descLinhas, margem + 5, y);
        y += descLinhas.length * 3.5 + 1;
      }

      doc.setDrawColor(...cores.borda);
      doc.setLineWidth(0.1);
      doc.line(margem, y - 1, pw - margem, y - 1);
      y += 3;
    }
    y += 4;
  }

  // ── Comentários ──
  if (study.comentarios && study.comentarios.length > 0) {
    if (y > ph - 40) {
      doc.addPage();
      y = margem + 10;
    }

    doc.setTextColor(...cores.primario);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.text(`Comentários (${study.comentarios.length})`, margem, y);
    y += 3;
    doc.setDrawColor(...cores.dourado);
    doc.setLineWidth(0.3);
    doc.line(margem, y, margem + 40, y);
    y += 6;

    for (const c of study.comentarios) {
      if (y > ph - 30) {
        doc.addPage();
        y = margem + 10;
      }

      if (c.tipo) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(7);
        doc.setTextColor(...cores.dourado);
        doc.text(c.tipo.toUpperCase(), margem, y);
        y += 4;
      }

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(...cores.primario);
      doc.text(c.autor, margem, y);
      y += 4;

      doc.setFont('times', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(...cores.texto);
      const cLinhas = doc.splitTextToSize(c.texto, cw - 5);
      for (const linha of cLinhas) {
        if (y > ph - 25) {
          doc.addPage();
          y = margem + 10;
        }
        doc.text(linha, margem + 2, y);
        y += 4;
      }
      y += 3;

      doc.setDrawColor(...cores.borda);
      doc.setLineWidth(0.1);
      doc.line(margem, y - 1, pw - margem, y - 1);
      y += 4;
    }
    y += 2;
  }

  // ── Notas do Usuário ──
  if (study.notas && study.notas.trim()) {
    if (y > ph - 40) {
      doc.addPage();
      y = margem + 10;
    }

    doc.setTextColor(...cores.primario);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.text('Minhas Notas', margem, y);
    y += 3;
    doc.setDrawColor(...cores.dourado);
    doc.setLineWidth(0.3);
    doc.line(margem, y, margem + 30, y);
    y += 6;

    doc.setFont('times', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(...cores.texto);
    const notasLinhas = doc.splitTextToSize(study.notas, cw - 5);
    for (const linha of notasLinhas) {
      if (y > ph - 25) {
        doc.addPage();
        y = margem + 10;
      }
      doc.text(linha, margem + 2, y);
      y += 5;
    }
    y += 6;
  }

  // ── Rodapé na última página ──
  const totalPages = doc.getNumberOfPages();
  for (let p = 2; p <= totalPages; p++) {
    doc.setPage(p);
    doc.setFillColor(...cores.fundoRodape);
    doc.rect(0, ph - 18, pw, 18, 'F');
    doc.setDrawColor(...cores.dourado);
    doc.setLineWidth(0.3);
    doc.line(margem, ph - 18, pw - margem, ph - 18);

    doc.setTextColor(...cores.textoSecundario);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.text(`Sola Scriptura  |  ${titulo}`, margem, ph - 11);
    doc.text(`Página ${p} / ${totalPages}`, pw - margem, ph - 11, { align: 'right' });

    doc.setFontSize(6);
    doc.setTextColor(150, 150, 150);
    doc.text('Gerado por Sola Scriptura BR — solascripturabr.com.br', pw / 2, ph - 7, { align: 'center' });
  }

  const nomeArquivo = titulo
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9 ]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .substring(0, 50);

  doc.save(`estudo_${nomeArquivo || 'sola-scriptura'}.pdf`);
}
