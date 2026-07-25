export function gerarCertificado(canvas: HTMLCanvasElement, nomeAluno: string, nomeCurso: string, dataConclusao: string): Promise<Blob> {
  const ctx = canvas.getContext('2d')!;
  const W = canvas.width;
  const H = canvas.height;

  // Fundo
  const grad = ctx.createLinearGradient(0, 0, W, H);
  grad.addColorStop(0, '#1a1a2e');
  grad.addColorStop(0.5, '#16213e');
  grad.addColorStop(1, '#0f3460');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  // Borda dourada
  ctx.strokeStyle = '#d4a745';
  ctx.lineWidth = 4;
  ctx.strokeRect(30, 30, W - 60, H - 60);
  ctx.strokeStyle = '#d4a74566';
  ctx.lineWidth = 1;
  ctx.strokeRect(40, 40, W - 80, H - 80);

  // Ornamentos nos cantos
  const ornamentSize = 20;
  ctx.fillStyle = '#d4a745';
  // Canto superior esquerdo
  ctx.fillRect(45, 45, ornamentSize, 2);
  ctx.fillRect(45, 45, 2, ornamentSize);
  // Canto superior direito
  ctx.fillRect(W - 45 - ornamentSize, 45, ornamentSize, 2);
  ctx.fillRect(W - 47, 45, 2, ornamentSize);
  // Canto inferior esquerdo
  ctx.fillRect(45, H - 47, ornamentSize, 2);
  ctx.fillRect(45, H - 45 - ornamentSize, 2, ornamentSize);
  // Canto inferior direito
  ctx.fillRect(W - 45 - ornamentSize, H - 47, ornamentSize, 2);
  ctx.fillRect(W - 47, H - 45 - ornamentSize, 2, ornamentSize);

  // Icone da cruz
  ctx.fillStyle = '#d4a745';
  ctx.font = '48px serif';
  ctx.textAlign = 'center';
  ctx.fillText('✝', W / 2, 100);

  // Titulo "Certificado de Conclusao"
  ctx.fillStyle = '#d4a745';
  ctx.font = '600 14px Inter, sans-serif';
  ctx.textAlign = 'center';
  ctx.letterSpacing = '4px';
  ctx.fillText('CERTIFICADO DE CONCLUSAO', W / 2, 140);

  // Linha decorativa
  ctx.strokeStyle = '#d4a74566';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(W / 2 - 120, 155);
  ctx.lineTo(W / 2 + 120, 155);
  ctx.stroke();

  // Texto "Concedemos a"
  ctx.fillStyle = '#a0a0a0';
  ctx.font = '14px Inter, sans-serif';
  ctx.fillText('Concedemos a', W / 2, 200);

  // Nome do aluno
  ctx.fillStyle = '#ffffff';
  ctx.font = '700 32px Cormorant, serif';
  ctx.fillText(nomeAluno, W / 2, 245);

  // Linha sob o nome
  ctx.strokeStyle = '#d4a74566';
  ctx.beginPath();
  ctx.moveTo(W / 2 - 150, 260);
  ctx.lineTo(W / 2 + 150, 260);
  ctx.stroke();

  // Texto "o certificado de conclusao do curso"
  ctx.fillStyle = '#a0a0a0';
  ctx.font = '14px Inter, sans-serif';
  ctx.fillText('o certificado de conclusao do curso', W / 2, 295);

  // Nome do curso
  ctx.fillStyle = '#d4a745';
  ctx.font = '700 22px Cormorant, serif';
  ctx.fillText(nomeCurso, W / 2, 330);

  // Data
  ctx.fillStyle = '#888888';
  ctx.font = '13px Inter, sans-serif';
  const data = new Date(dataConclusao);
  const dataFormatada = data.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' });
  ctx.fillText(dataFormatada, W / 2, 380);

  // ID do certificado
  const certId = `SSB-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
  ctx.fillStyle = '#555555';
  ctx.font = '11px monospace';
  ctx.fillText(`ID: ${certId}`, W / 2, 410);

  // Rodape
  ctx.fillStyle = '#d4a745';
  ctx.font = '600 12px Inter, sans-serif';
  ctx.fillText('SOLA SCRIPTURA', W / 2, H - 60);
  ctx.fillStyle = '#666666';
  ctx.font = '11px Inter, sans-serif';
  ctx.fillText('solascripturabr.com.br', W / 2, H - 45);

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
