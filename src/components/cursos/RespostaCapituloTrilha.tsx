'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import type { TrilhaLivro } from '@/data/trilhasLivro';
import { obterEstudoCapitulo } from '@/lib/estudosLoader';
import { isChapterRead } from '@/lib/readingProgress';
import {
  MIN_RESPOSTA_CHARS,
  capituloRespondido,
  garantirInicioTrilha,
  obterProgressoTrilha,
  salvarRespostaCapitulo,
  validarResposta,
} from '@/lib/trilhaProgress';
import { hrefBiblia } from '@/lib/bibliaHref';

interface RespostaCapituloTrilhaProps {
  trilha: TrilhaLivro;
  capitulo: number;
  compact?: boolean;
  onSaved?: () => void;
}

export function RespostaCapituloTrilha({
  trilha,
  capitulo,
  compact = false,
  onSaved,
}: RespostaCapituloTrilhaProps) {
  const ficha = obterEstudoCapitulo(trilha.livroAbrev, capitulo);
  const pergunta = ficha.perguntasEstudo?.[0]?.trim() ?? '';
  const [texto, setTexto] = useState('');
  const [salvo, setSalvo] = useState(false);
  const [lido, setLido] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const recarregar = useCallback(() => {
    const p = obterProgressoTrilha(trilha.slug);
    const r = p.respostas[String(capitulo)];
    if (r?.texto) {
      setTexto(r.texto);
      setSalvo(true);
    }
    setLido(isChapterRead(trilha.livroAbrev, capitulo));
  }, [trilha.slug, trilha.livroAbrev, capitulo]);

  useEffect(() => {
    recarregar();
  }, [recarregar]);

  if (!pergunta) return null;

  const nivelLabel =
    ficha.nivel === 'profundo'
      ? 'Pergunta da ficha profunda'
      : ficha.nivel === 'sintese'
        ? 'Pergunta de síntese (não conta como curso avançado)'
        : 'Pergunta do capítulo';

  function enviar() {
    setErro(null);
    const v = validarResposta(texto);
    if (v) {
      setErro(v);
      return;
    }
    garantirInicioTrilha(trilha.slug);
    try {
      salvarRespostaCapitulo(trilha.slug, capitulo, texto);
      setSalvo(true);
      recarregar();
      onSaved?.();
    } catch (e) {
      setErro(e instanceof Error ? e.message : 'Não foi possível salvar.');
    }
  }

  const respondido = capituloRespondido(trilha.slug, capitulo);

  return (
    <div className="rounded-xl border border-[var(--brand-default)]/25 bg-[var(--brand-default)]/[0.05] p-4 space-y-3">
      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--brand-default)]">
        {nivelLabel} · trilha {trilha.livroNome}
      </p>
      <p className="font-serif text-[15px] sm:text-base text-[var(--content-primary)] leading-snug">{pergunta}</p>
      {!compact && ficha.titulo && (
        <p className="text-xs text-[var(--content-muted)]">{ficha.titulo}</p>
      )}
      <textarea
        value={texto}
        onChange={(e) => {
          setTexto(e.target.value);
          setSalvo(false);
        }}
        rows={compact ? 3 : 4}
        maxLength={2000}
        placeholder={`Responda com suas palavras (mínimo ${MIN_RESPOSTA_CHARS} caracteres). Não é um visto automático.`}
        className="w-full rounded-lg bg-[var(--surface-sunken)] border border-[var(--border)] px-3 py-2 text-sm text-[var(--content-primary)] placeholder:text-[var(--content-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-default)]/40"
      />
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={enviar}
          className="inline-flex items-center justify-center min-h-[44px] px-4 rounded-full bg-[var(--brand-default)] text-[13px] font-semibold text-white hover:opacity-90"
        >
          {respondido ? 'Atualizar resposta' : 'Registrar resposta'}
        </button>
        {!lido && (
          <Link
            href={hrefBiblia(trilha.livroAbrev, capitulo)}
            className="inline-flex items-center min-h-[44px] px-3 text-[13px] text-[var(--brand-default)] hover:underline"
          >
            Ainda falta ler o capítulo na Bíblia
          </Link>
        )}
        {lido && respondido && (
          <span className="inline-flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Capítulo completo
          </span>
        )}
        {lido && !respondido && (
          <span className="text-xs text-[var(--content-muted)]">Capítulo lido — falta a resposta</span>
        )}
      </div>
      {erro && <p className="text-xs text-red-500">{erro}</p>}
      {salvo && !erro && <p className="text-xs text-[var(--content-muted)]">Resposta salva neste dispositivo.</p>}
    </div>
  );
}
