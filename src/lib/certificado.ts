export type NivelDiploma = 'profundo' | 'sintese' | 'introducao';

export interface DiplomaOpcoes {
  nome: string;
  titulo: string;
  dataIso: string;
  id: string;
  hash: string;
  nivel: NivelDiploma;
  atesta: string;
  naoAtesta: string;
  aviso?: string;
}

const NIVEL_ROTULO: Record<NivelDiploma, string> = {
  profundo: 'FICHAS PROFUNDAS · CAPÍTULO A CAPÍTULO',
  sintese: 'SÍNTESE / INTRODUÇÃO',
  introducao: 'CURSO INTRODUTÓRIO NESTA PLATAFORMA',
};

function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let current = '';
  for (const word of words) {
    const test = current ? `${current} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && current) {
      lines.push(current);
      current = word;
    } else {
      current = test;
    }
  }
  if (current) lines.push(current);
  return lines;
}

function formatarData(dataIso: string): string {
  const data = new Date(dataIso);
  if (Number.isNaN(data.getTime())) return dataIso;
  return data.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' });
}

function prepararCanvas(canvas: HTMLCanvasElement, w = 1200, h = 850): CanvasRenderingContext2D {
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas sem contexto 2d');
  return ctx;
}

export function desenharDiploma(ctx: CanvasRenderingContext2D, W: number, H: number, op: DiplomaOpcoes): void {
  const grad = ctx.createLinearGradient(0, 0, W, H);
  grad.addColorStop(0, '#0a0a1a');
  grad.addColorStop(0.45, '#16122a');
  grad.addColorStop(1, '#0c0a18');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  ctx.strokeStyle = '#d4a745';
  ctx.lineWidth = 3;
  ctx.strokeRect(28, 28, W - 56, H - 56);
  ctx.strokeStyle = 'rgba(212, 167, 69, 0.45)';
  ctx.lineWidth = 1;
  ctx.strokeRect(40, 40, W - 80, H - 80);

  ctx.fillStyle = '#d4a745';
  ctx.font = '42px serif';
  ctx.textAlign = 'center';
  ctx.fillText('\u271D', W / 2, 92);

  ctx.font = '600 13px Inter, sans-serif';
  ctx.fillText('SOLA SCRIPTURA BR', W / 2, 122);
  ctx.fillStyle = 'rgba(212, 167, 69, 0.7)';
  ctx.font = '11px Inter, sans-serif';
  ctx.fillText(NIVEL_ROTULO[op.nivel], W / 2, 144);

  ctx.strokeStyle = 'rgba(212, 167, 69, 0.55)';
  ctx.beginPath();
  ctx.moveTo(W / 2 - 160, 162);
  ctx.lineTo(W / 2 + 160, 162);
  ctx.stroke();

  ctx.fillStyle = '#d4a745';
  ctx.font = '600 15px Inter, sans-serif';
  ctx.fillText('CERTIFICADO DE CONCLUSÃO', W / 2, 192);

  ctx.fillStyle = '#9a9a9a';
  ctx.font = 'italic 15px Inter, sans-serif';
  ctx.fillText('Sola Scriptura BR reconhece que', W / 2, 228);

  ctx.fillStyle = '#ffffff';
  ctx.font = '700 40px Cormorant, Georgia, serif';
  const nomeLines = wrapText(ctx, op.nome, W - 200);
  let y = 278;
  for (const line of nomeLines) {
    ctx.fillText(line, W / 2, y);
    y += 44;
  }

  ctx.strokeStyle = 'rgba(212, 167, 69, 0.4)';
  ctx.beginPath();
  ctx.moveTo(W / 2 - 180, y - 28);
  ctx.lineTo(W / 2 + 180, y - 28);
  ctx.stroke();

  ctx.fillStyle = '#9a9a9a';
  ctx.font = '15px Inter, sans-serif';
  const verbo =
    op.nivel === 'profundo'
      ? 'concluiu a trilha bíblica, capítulo a capítulo,'
      : op.nivel === 'sintese'
        ? 'concluiu a trilha introdutória (síntese)'
        : 'concluiu o curso introdutório';
  ctx.fillText(verbo, W / 2, y);

  ctx.fillStyle = '#d4a745';
  ctx.font = '700 28px Cormorant, Georgia, serif';
  const tituloLines = wrapText(ctx, op.titulo, W - 220);
  y += 40;
  for (const line of tituloLines) {
    ctx.fillText(line, W / 2, y);
    y += 32;
  }

  ctx.fillStyle = '#b8b8b8';
  ctx.font = '13px Inter, sans-serif';
  y += 8;
  for (const line of wrapText(ctx, op.atesta, W - 240)) {
    ctx.fillText(line, W / 2, y);
    y += 20;
  }

  ctx.fillStyle = '#7a7a7a';
  ctx.font = '12px Inter, sans-serif';
  y += 10;
  for (const line of wrapText(ctx, `Não atesta: ${op.naoAtesta}`, W - 240)) {
    ctx.fillText(line, W / 2, y);
    y += 18;
  }

  if (op.aviso) {
    y += 8;
    ctx.fillStyle = '#8a7a50';
    ctx.font = 'italic 12px Inter, sans-serif';
    for (const line of wrapText(ctx, op.aviso, W - 260)) {
      ctx.fillText(line, W / 2, y);
      y += 18;
    }
  }

  ctx.fillStyle = '#9a9a9a';
  ctx.font = '14px Inter, sans-serif';
  ctx.fillText(formatarData(op.dataIso), W / 2, H - 118);

  ctx.fillStyle = '#606060';
  ctx.font = '12px ui-monospace, monospace';
  ctx.fillText(`ID ${op.id}  ·  SHA ${op.hash}`, W / 2, H - 92);

  ctx.strokeStyle = 'rgba(212, 167, 69, 0.35)';
  ctx.beginPath();
  ctx.moveTo(W / 2 - 120, H - 72);
  ctx.lineTo(W / 2 + 120, H - 72);
  ctx.stroke();

  ctx.fillStyle = '#d4a745';
  ctx.font = '700 13px Inter, sans-serif';
  ctx.fillText('SOLA SCRIPTURA BR', W / 2, H - 52);
  ctx.fillStyle = '#606060';
  ctx.font = '11px Inter, sans-serif';
  ctx.fillText('solascripturabr.com.br', W / 2, H - 36);
}

export function diplomaCursoIntroducao(params: {
  nome: string;
  nomeCurso: string;
  dataIso: string;
  id: string;
  hash: string;
  aulasFeitas: number;
  totalAulas: number;
  autenticado?: boolean;
}): DiplomaOpcoes {
  return {
    nome: params.nome,
    titulo: params.nomeCurso,
    dataIso: params.dataIso,
    id: params.id,
    hash: params.hash,
    nivel: 'introducao',
    atesta: `Conclusão de ${params.aulasFeitas} de ${params.totalAulas} aulas do curso introdutório «${params.nomeCurso}» nesta plataforma (texto, vídeo quando houver, e avaliação com 70% se o curso tiver quiz).`,
    naoAtesta:
      'carga horária acadêmica, diploma de seminário, ordenação, equivalência institucional ou verificação de identidade além do nome informado.',
    aviso: params.autenticado
      ? undefined
      : 'Nome informado neste dispositivo, sem sessão autenticada. Certificado de conclusão do curso no aparelho — não é diploma institucional.',
  };
}

function diplomaIntroducao(nome: string, nomeCurso: string, dataIso: string): DiplomaOpcoes {
  return diplomaCursoIntroducao({
    nome,
    nomeCurso,
    dataIso,
    id: 'SSB-RASCUNHO',
    hash: '------------',
    aulasFeitas: 0,
    totalAulas: 0,
  });
}

export function gerarCertificado(
  canvas: HTMLCanvasElement,
  nomeAluno: string,
  nomeCurso: string,
  dataConclusao: string,
  extras?: Partial<DiplomaOpcoes>,
): Promise<Blob> {
  const op: DiplomaOpcoes = {
    ...diplomaIntroducao(nomeAluno, nomeCurso, dataConclusao),
    ...extras,
    nome: extras?.nome ?? nomeAluno,
    titulo: extras?.titulo ?? nomeCurso,
    dataIso: extras?.dataIso ?? dataConclusao,
  };
  const ctx = prepararCanvas(canvas);
  desenharDiploma(ctx, canvas.width, canvas.height, op);
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error('Falha ao gerar imagem do certificado'));
    }, 'image/png', 0.95);
  });
}

export function gerarDiplomaTrilha(canvas: HTMLCanvasElement, op: DiplomaOpcoes): Promise<Blob> {
  const ctx = prepararCanvas(canvas);
  desenharDiploma(ctx, canvas.width, canvas.height, op);
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error('Falha ao gerar imagem do certificado'));
    }, 'image/png', 0.95);
  });
}

export function baixarCertificado(
  canvas: HTMLCanvasElement,
  nomeAluno: string,
  nomeCurso: string,
  dataConclusao: string,
  extras?: Partial<DiplomaOpcoes>,
): void {
  gerarCertificado(canvas, nomeAluno, nomeCurso, dataConclusao, extras)
    .then((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `certificado-${nomeCurso.toLowerCase().replace(/\s+/g, '-')}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    })
    .catch(() => {
      alert('Não foi possível gerar o certificado. Tente novamente.');
    });
}

export function compartilharCertificado(
  canvas: HTMLCanvasElement,
  nomeAluno: string,
  nomeCurso: string,
  dataConclusao: string,
): Promise<boolean> {
  return gerarCertificado(canvas, nomeAluno, nomeCurso, dataConclusao).then(async (blob) => {
    if (navigator.share) {
      try {
        const file = new File([blob], `certificado-${nomeCurso.toLowerCase().replace(/\s+/g, '-')}.png`, {
          type: 'image/png',
        });
        await navigator.share({
          title: `Certificado — ${nomeCurso}`,
          text: `Concluí o curso introdutório «${nomeCurso}» no Sola Scriptura BR.`,
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
