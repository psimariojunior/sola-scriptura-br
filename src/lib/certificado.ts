export function gerarCertificado(canvas: HTMLCanvasElement, nomeAluno: string, nomeCurso: string, dataConclusao: string): Promise<Blob> {
  const ctx = canvas.getContext('2d')!;
  const W = canvas.width;
  const H = canvas.height;

  // Fundo gradiente premium
  const grad = ctx.createLinearGradient(0, 0, W, H);
  grad.addColorStop(0, '#0a0a1a');
  grad.addColorStop(0.3, '#1a1a3e');
  grad.addColorStop(0.7, '#0f1a40');
  grad.addColorStop(1, '#0a0a2a');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  // Padrão sutil de fundo (linhas decorativas)
  ctx.strokeStyle = '#d4a74508';
  ctx.lineWidth = 0.5;
  for (let i = 0; i < W; i += 20) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, H);
    ctx.stroke();
  }
  for (let i = 0; i < H; i += 20) {
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(W, i);
    ctx.stroke();
  }

  // Borda externa dourada dupla
  ctx.strokeStyle = '#d4a745';
  ctx.lineWidth = 3;
  ctx.strokeRect(25, 25, W - 50, H - 50);
  ctx.strokeStyle = '#d4a74588';
  ctx.lineWidth = 1;
  ctx.strokeRect(35, 35, W - 70, H - 70);

  // Ornamentos nos cantos (filigrana)
  const drawOrnament = (x: number, y: number, flip: boolean) => {
    ctx.save();
    ctx.translate(x, y);
    if (flip) ctx.scale(-1, 1);
    ctx.fillStyle = '#d4a745';
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(15, 0, 15, 15);
    ctx.quadraticCurveTo(15, 30, 0, 30);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(0, 5);
    ctx.quadraticCurveTo(10, 5, 10, 15);
    ctx.quadraticCurveTo(10, 25, 0, 25);
    ctx.fill();
    ctx.restore();
  };
  drawOrnament(42, 42, false);
  ctx.save();
  ctx.translate(W - 42, 42);
  ctx.scale(-1, 1);
  ctx.translate(0, 0);
  drawOrnament(0, 0, false);
  ctx.restore();
  drawOrnament(42, H - 42, false);
  ctx.save();
  ctx.translate(W - 42, H - 42);
  ctx.scale(-1, 1);
  ctx.translate(0, 0);
  drawOrnament(0, 0, false);
  ctx.restore();

  // Icone da cruz estilizada
  ctx.fillStyle = '#d4a745';
  ctx.font = '52px serif';
  ctx.textAlign = 'center';
  ctx.fillText('\u271D', W / 2, 95);

  // Titulo "CERTIFICADO DE CONCLUSAO"
  ctx.fillStyle = '#d4a745';
  ctx.font = '600 13px Inter, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('CERTIFICADO DE CONCLUS\u00C3O', W / 2, 130);

  // Linha decorativa dupla
  ctx.strokeStyle = '#d4a745';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(W / 2 - 140, 145);
  ctx.lineTo(W / 2 - 20, 145);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(W / 2 + 20, 145);
  ctx.lineTo(W / 2 + 140, 145);
  ctx.stroke();
  // Diamante central
  ctx.fillStyle = '#d4a745';
  ctx.beginPath();
  ctx.moveTo(W / 2, 140);
  ctx.lineTo(W / 2 + 5, 145);
  ctx.lineTo(W / 2, 150);
  ctx.lineTo(W / 2 - 5, 145);
  ctx.closePath();
  ctx.fill();

  // Texto "Concedemos a"
  ctx.fillStyle = '#909090';
  ctx.font = 'italic 14px Inter, sans-serif';
  ctx.fillText('Concedemos a', W / 2, 190);

  // Nome do aluno (destaque)
  ctx.fillStyle = '#ffffff';
  ctx.font = '700 34px Cormorant, serif';
  ctx.fillText(nomeAluno, W / 2, 235);

  // Linha sob o nome com ornamento
  ctx.strokeStyle = '#d4a74566';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(W / 2 - 160, 250);
  ctx.lineTo(W / 2 + 160, 250);
  ctx.stroke();
  // Pontos decorativos
  ctx.fillStyle = '#d4a745';
  ctx.beginPath();
  ctx.arc(W / 2 - 165, 250, 2, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(W / 2 + 165, 250, 2, 0, Math.PI * 2);
  ctx.fill();

  // Texto "o certificado de conclusao do curso"
  ctx.fillStyle = '#909090';
  ctx.font = '14px Inter, sans-serif';
  ctx.fillText('por haber concluido com excelencia o curso de', W / 2, 285);

  // Nome do curso (destaque dourado)
  ctx.fillStyle = '#d4a745';
  ctx.font = '700 24px Cormorant, serif';
  ctx.fillText(nomeCurso, W / 2, 325);

  // Detalhes do curso
  ctx.fillStyle = '#707070';
  ctx.font = '12px Inter, sans-serif';
  ctx.fillText('Semin\u00E1rio Biol\u00F3gico Gratuito \u2022 Plataforma de Estudo', W / 2, 350);

  // Separador
  ctx.strokeStyle = '#d4a74533';
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.moveTo(W / 2 - 80, 365);
  ctx.lineTo(W / 2 + 80, 365);
  ctx.stroke();

  // Data de conclusao
  const data = new Date(dataConclusao);
  const dataFormatada = data.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' });
  ctx.fillStyle = '#909090';
  ctx.font = '13px Inter, sans-serif';
  ctx.fillText(dataFormatada, W / 2, 390);

  // ID do certificado
  const certId = `SSB-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
  ctx.fillStyle = '#505050';
  ctx.font = '10px monospace';
  ctx.fillText(`ID: ${certId}`, W / 2, 415);

  // Linha de assinatura
  ctx.strokeStyle = '#d4a74544';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(W / 2 - 100, H - 85);
  ctx.lineTo(W / 2 + 100, H - 85);
  ctx.stroke();

  // Rodape
  ctx.fillStyle = '#d4a745';
  ctx.font = '700 13px Inter, sans-serif';
  ctx.fillText('SOLA SCRIPTURA', W / 2, H - 65);
  ctx.fillStyle = '#606060';
  ctx.font = '11px Inter, sans-serif';
  ctx.fillText('solascripturabr.com.br', W / 2, H - 50);

  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob!), 'image/png', 0.95);
  });
}

export function baixarCertificado(canvas: HTMLCanvasElement, nomeAluno: string, nomeCurso: string, dataConclusao: string): void {
  gerarCertificado(canvas, nomeAluno, nomeCurso, dataConclusao).then((blob) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `certificado-${nomeCurso.toLowerCase().replace(/\s+/g, '-')}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });
}

export function compartilharCertificado(canvas: HTMLCanvasElement, nomeAluno: string, nomeCurso: string, dataConclusao: string): Promise<boolean> {
  return gerarCertificado(canvas, nomeAluno, nomeCurso, dataConclusao).then(async (blob) => {
    if (navigator.share) {
      try {
        const file = new File([blob], `certificado-${nomeCurso.toLowerCase().replace(/\s+/g, '-')}.png`, { type: 'image/png' });
        await navigator.share({
          title: `Certificado - ${nomeCurso}`,
          text: `Conclui o curso "${nomeCurso}" no Sola Scriptura! 🎓`,
          files: [file],
        });
        return true;
      } catch {
        return false;
      }
    }
    return false;
  });
}
