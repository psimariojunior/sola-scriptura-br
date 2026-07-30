'use client';

import { useRef, useCallback } from 'react';
import { Download, Share2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CertificateGeneratorProps {
  cursoNome: string;
  userName?: string;
  dataConclusao?: string;
  className?: string;
}

function formatDate(dateStr?: string): string {
  const d = dateStr ? new Date(dateStr) : new Date();
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
}

function drawCertificate(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  cursoNome: string,
  userName: string,
  dataConclusao: string
) {
  // Background
  ctx.fillStyle = '#1a1614';
  ctx.fillRect(0, 0, width, height);

  // Subtle pattern
  ctx.fillStyle = 'rgba(212, 175, 55, 0.03)';
  for (let i = 0; i < 40; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    ctx.beginPath();
    ctx.arc(x, y, Math.random() * 3 + 1, 0, Math.PI * 2);
    ctx.fill();
  }

  // Golden border — outer
  ctx.strokeStyle = '#d4af37';
  ctx.lineWidth = 4;
  ctx.strokeRect(20, 20, width - 40, height - 40);

  // Inner border
  ctx.strokeStyle = 'rgba(212, 175, 55, 0.4)';
  ctx.lineWidth = 1;
  ctx.strokeRect(32, 32, width - 64, height - 64);

  // Corner ornaments
  const cornerSize = 24;
  const corners = [
    [32, 32], [width - 32, 32], [32, height - 32], [width - 32, height - 32],
  ];
  ctx.fillStyle = '#d4af37';
  for (const [cx, cy] of corners) {
    ctx.beginPath();
    ctx.arc(cx, cy, cornerSize / 3, 0, Math.PI * 2);
    ctx.fill();
  }

  // Top decorative line
  const lineY = 80;
  ctx.strokeStyle = 'rgba(212, 175, 55, 0.3)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(100, lineY);
  ctx.lineTo(width - 100, lineY);
  ctx.stroke();

  // Cross symbol
  ctx.font = '28px serif';
  ctx.fillStyle = '#d4af37';
  ctx.textAlign = 'center';
  ctx.fillText('✝', width / 2, 65);

  // Title: SOLA SCRIPTURA
  ctx.font = 'bold 14px "Inter", "Segoe UI", sans-serif';
  ctx.fillStyle = '#d4af37';
  ctx.textAlign = 'center';
  ctx.letterSpacing = '6px';
  ctx.fillText('S O L A   S C R I P T U R A', width / 2, 110);

  // Subtitle
  ctx.font = '11px "Inter", "Segoe UI", sans-serif';
  ctx.fillStyle = 'rgba(212, 175, 55, 0.6)';
  ctx.fillText('Seminário Bíblico Gratuito', width / 2, 132);

  // Decorative divider
  ctx.strokeStyle = 'rgba(212, 175, 55, 0.25)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(width / 2 - 80, 150);
  ctx.lineTo(width / 2 + 80, 150);
  ctx.stroke();
  ctx.fillStyle = '#d4af37';
  ctx.beginPath();
  ctx.arc(width / 2, 150, 3, 0, Math.PI * 2);
  ctx.fill();

  // "Certificado de Conclusão"
  ctx.font = '11px "Inter", "Segoe UI", sans-serif';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
  ctx.textAlign = 'center';
  ctx.fillText('CERTIFICADO DE CONCLUSÃO', width / 2, 185);

  // "Conferimos a"
  ctx.font = '12px "Inter", "Segoe UI", sans-serif';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
  ctx.fillText('Conferimos a', width / 2, 215);

  // Student name
  ctx.font = 'bold 30px "Cormorant Garamond", "Georgia", serif';
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.fillText(userName, width / 2, 260);

  // Underline beneath name
  const nameWidth = ctx.measureText(userName).width;
  ctx.strokeStyle = 'rgba(212, 175, 55, 0.5)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(width / 2 - nameWidth / 2, 270);
  ctx.lineTo(width / 2 + nameWidth / 2, 270);
  ctx.stroke();

  // "a conclusão do curso"
  ctx.font = '12px "Inter", "Segoe UI", sans-serif';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
  ctx.fillText('a conclusão do curso', width / 2, 300);

  // Course name
  ctx.font = 'bold 20px "Cormorant Garamond", "Georgia", serif';
  ctx.fillStyle = '#d4af37';
  ctx.textAlign = 'center';

  // Word wrap course name
  const maxLineWidth = width - 160;
  const words = cursoNome.split(' ');
  let lines: string[] = [''];
  for (const word of words) {
    const testLine = lines[lines.length - 1] ? lines[lines.length - 1] + ' ' + word : word;
    if (ctx.measureText(testLine).width > maxLineWidth && lines[lines.length - 1]) {
      lines.push(word);
    } else {
      lines[lines.length - 1] = testLine;
    }
  }
  const courseStartY = 340;
  for (let i = 0; i < lines.length; i++) {
    ctx.fillText(lines[i], width / 2, courseStartY + i * 28);
  }

  // Bottom decorative divider
  const divY = courseStartY + lines.length * 28 + 20;
  ctx.strokeStyle = 'rgba(212, 175, 55, 0.25)';
  ctx.beginPath();
  ctx.moveTo(width / 2 - 80, divY);
  ctx.lineTo(width / 2 + 80, divY);
  ctx.stroke();
  ctx.fillStyle = '#d4af37';
  ctx.beginPath();
  ctx.arc(width / 2, divY, 3, 0, Math.PI * 2);
  ctx.fill();

  // Date
  ctx.font = '12px "Inter", "Segoe UI", sans-serif';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
  ctx.textAlign = 'center';
  ctx.fillText(dataConclusao, width / 2, divY + 30);

  // "Sola Scriptura — Gratuito para glória de Deus"
  ctx.font = '10px "Inter", "Segoe UI", sans-serif';
  ctx.fillStyle = 'rgba(212, 175, 55, 0.4)';
  ctx.fillText('Sola Scriptura — Gratuito para glória de Deus', width / 2, height - 50);

  // Bottom line
  ctx.strokeStyle = 'rgba(212, 175, 55, 0.3)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(100, height - 70);
  ctx.lineTo(width - 100, height - 70);
  ctx.stroke();
}

export function CertificateGenerator({
  cursoNome,
  userName = 'Estudante da Bíblia',
  dataConclusao,
  className,
}: CertificateGeneratorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateCertificateImage = useCallback((): string | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    const width = 1080;
    const height = 720;
    canvas.width = width;
    canvas.height = height;

    drawCertificate(ctx, width, height, cursoNome, userName, formatDate(dataConclusao));
    return canvas.toDataURL('image/png');
  }, [cursoNome, userName, dataConclusao]);

  const downloadCertificate = useCallback(() => {
    const dataURL = generateCertificateImage();
    if (!dataURL) return;

    const link = document.createElement('a');
    link.download = `certificado-${cursoNome.toLowerCase().replace(/\s+/g, '-')}.png`;
    link.href = dataURL;
    link.click();
  }, [generateCertificateImage, cursoNome]);

  const shareCertificate = useCallback(async () => {
    const dataURL = generateCertificateImage();
    if (!dataURL) return;

    if (navigator.share) {
      try {
        const res = await fetch(dataURL);
        const blob = await res.blob();
        const file = new File([blob], `certificado-${cursoNome.toLowerCase().replace(/\s+/g, '-')}.png`, { type: 'image/png' });
        await navigator.share({
          title: `Certificado — ${cursoNome}`,
          text: `Concluí o curso "${cursoNome}" no Sola Scriptura!`,
          files: [file],
        });
      } catch {
        downloadCertificate();
      }
    } else {
      downloadCertificate();
    }
  }, [generateCertificateImage, cursoNome, downloadCertificate]);

  return (
    <div className={cn('flex flex-col items-center gap-4', className)}>
      <canvas
        ref={canvasRef}
        className="w-full max-w-[540px] rounded-xl border border-[var(--border)]/30 shadow-lg"
        style={{ aspectRatio: '1080 / 720' }}
      />

      <div className="flex gap-3">
        <button
          onClick={downloadCertificate}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--brand-default)] text-[var(--brand-contrast)] font-semibold text-sm hover:opacity-90 transition-opacity"
        >
          <Download className="w-4 h-4" />
          Baixar PNG
        </button>
        <button
          onClick={shareCertificate}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--surface-sunken)] text-[var(--content-primary)] font-semibold text-sm hover:bg-[var(--surface-raised)] transition-colors"
        >
          <Share2 className="w-4 h-4" />
          Compartilhar
        </button>
      </div>
    </div>
  );
}
