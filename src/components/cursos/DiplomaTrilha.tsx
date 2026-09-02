'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Download, Share2 } from 'lucide-react';
import type { TrilhaLivro } from '@/data/trilhasLivro';
import { nivelEfetivoDaTrilha } from '@/lib/trilhaCapitulos';
import { gerarDiplomaTrilha, type DiplomaOpcoes } from '@/lib/certificado';
import { sha256Curto, type CertificadoTrilha } from '@/lib/trilhaProgress';

interface DiplomaTrilhaProps {
  trilha: TrilhaLivro;
  certificado: CertificadoTrilha;
}

export function DiplomaTrilha({ trilha, certificado }: DiplomaTrilhaProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pronto, setPronto] = useState(false);
  const [hashVerificado, setHashVerificado] = useState<string | null>(null);
  const [podeCompartilhar, setPodeCompartilhar] = useState(false);

  const nivel = nivelEfetivoDaTrilha(trilha);
  const opcoes: DiplomaOpcoes = {
    nome: certificado.nome,
    titulo: trilha.livroNome,
    dataIso: certificado.data,
    id: certificado.id,
    hash: certificado.hash,
    nivel: nivel === 'profundo' ? 'profundo' : 'sintese',
    atesta: trilha.oQueAtesta,
    naoAtesta: trilha.oQueNaoAtesta,
    aviso: certificado.autenticado
      ? undefined
      : 'Nome informado neste dispositivo, sem sessão autenticada. Certificado de conclusão da trilha no aparelho — não é diploma institucional.',
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    gerarDiplomaTrilha(canvas, opcoes).then(() => setPronto(true)).catch(() => setPronto(false));
  }, [certificado.id, certificado.hash, certificado.nome, certificado.data, trilha.slug]);

  useEffect(() => {
    sha256Curto(
      [
        'sola-scriptura-br',
        trilha.slug,
        certificado.nome.trim().toLowerCase(),
        certificado.data.slice(0, 10),
        Array.from({ length: trilha.totalCapitulos }, (_, i) => i + 1).join(','),
      ].join('|'),
    ).then(setHashVerificado);
  }, [trilha.slug, trilha.totalCapitulos, certificado.nome, certificado.data]);

  useEffect(() => {
    setPodeCompartilhar(typeof navigator !== 'undefined' && typeof navigator.share === 'function');
  }, []);

  const baixar = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `certificado-${trilha.slug}.png`;
      a.click();
      URL.revokeObjectURL(url);
    }, 'image/png');
  }, [trilha.slug]);

  const compartilhar = useCallback(async () => {
    const canvas = canvasRef.current;
    if (!canvas || !navigator.share) return;
    canvas.toBlob(async (blob) => {
      if (!blob) return;
      try {
        const file = new File([blob], `certificado-${trilha.slug}.png`, { type: 'image/png' });
        await navigator.share({
          title: `Certificado — ${trilha.livroNome}`,
          text: `Concluí a trilha de ${trilha.livroNome} no Sola Scriptura BR. ID ${certificado.id}.`,
          files: [file],
        });
      } catch {
        /* cancelado */
      }
    }, 'image/png');
  }, [trilha.slug, trilha.livroNome, certificado.id]);

  return (
    <section className="rounded-2xl border border-[var(--brand-default)]/30 bg-[var(--surface-raised)] p-5 sm:p-6 space-y-4">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--brand-default)] mb-1">
          O que este certificado atesta
        </p>
        <p className="text-sm text-[var(--content-secondary)] leading-relaxed">{trilha.oQueAtesta}</p>
        <p className="text-xs text-[var(--content-muted)] mt-2 leading-relaxed">Não atesta: {trilha.oQueNaoAtesta}</p>
      </div>
      <canvas
        ref={canvasRef}
        className="w-full max-w-3xl mx-auto rounded-lg shadow-2xl border border-[var(--brand-default)]/20"
        style={{ aspectRatio: '1200 / 850' }}
        aria-label={`Certificado de ${certificado.nome}`}
      />
      <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[var(--content-muted)]">
        <span>ID {certificado.id}</span>
        <span aria-hidden="true">·</span>
        <span>SHA {certificado.hash}</span>
        {hashVerificado && hashVerificado === certificado.hash && (
          <span className="text-emerald-600 dark:text-emerald-400">verificado</span>
        )}
      </div>
      {opcoes.aviso && (
        <p className="text-xs text-amber-700 dark:text-amber-400/90 leading-relaxed">{opcoes.aviso}</p>
      )}
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={baixar}
          disabled={!pronto}
          className="inline-flex items-center gap-2 min-h-[44px] px-4 rounded-full bg-[var(--brand-default)] text-sm font-semibold text-white disabled:opacity-50"
        >
          <Download className="w-4 h-4" /> Baixar PNG
        </button>
        {podeCompartilhar && (
          <button
            type="button"
            onClick={compartilhar}
            disabled={!pronto}
            className="inline-flex items-center gap-2 min-h-[44px] px-4 rounded-full border border-[var(--border)] text-sm font-medium disabled:opacity-50"
          >
            <Share2 className="w-4 h-4" /> Compartilhar
          </button>
        )}
      </div>
    </section>
  );
}
