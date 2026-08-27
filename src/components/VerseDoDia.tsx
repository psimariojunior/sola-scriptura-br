'use client';

import { useState, useCallback, useMemo } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, BookOpen, Check, ChevronLeft, ChevronRight, ImageIcon } from 'lucide-react';
import { hrefFromRef, parseRefLivre } from '@/lib/bibliaHref';
import { livroPorAbreviacao } from '@/data/biblia/livros';
import {
  getVersiculoPorEpoca,
  getVersiculoAleatorio,
  TEMAS_INFO,
  type VersiculoDestaque,
} from '@/data/versiculosDestaque';
import type { ShareVerseImageData } from './ShareVerseImageModal';

const ShareVerseImageModal = dynamic(
  () => import('./ShareVerseImageModal').then((m) => ({ default: m.ShareVerseImageModal })),
  { ssr: false },
);

function versoParaImagem(verso: VersiculoDestaque): ShareVerseImageData {
  const parsed = parseRefLivre(verso.referencia);
  if (!parsed) {
    return {
      livroNome: verso.referencia,
      capitulo: 1,
      versiculo: 1,
      texto: verso.texto,
      traducao: 'ARC',
    };
  }
  return {
    livroNome: livroPorAbreviacao.get(parsed.livro)?.nome ?? parsed.livro,
    capitulo: parsed.capitulo,
    versiculo: parsed.versiculo ?? 1,
    texto: verso.texto,
    traducao: 'ARC',
  };
}

function dataDeHoje(): string {
  const raw = new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(new Date());
  return raw.charAt(0).toUpperCase() + raw.slice(1);
}

export default function VerseDoDia() {
  const [copied, setCopied] = useState(false);
  const [verso, setVerso] = useState<VersiculoDestaque>(() => getVersiculoPorEpoca());
  const [direcao, setDirecao] = useState(0);
  const [imagemAberta, setImagemAberta] = useState(false);
  const hoje = useMemo(() => dataDeHoje(), []);

  const bibliaUrl = hrefFromRef(verso.referencia);
  const temaInfo = TEMAS_INFO[verso.tema] ?? TEMAS_INFO.fe;
  const verseImagem = useMemo(() => versoParaImagem(verso), [verso]);

  const navegar = useCallback((dir: -1 | 1) => {
    setDirecao(dir);
    if (dir === 1) {
      setVerso(getVersiculoAleatorio());
    } else {
      setVerso(getVersiculoPorEpoca());
    }
  }, []);

  const handleShare = async () => {
    const texto = `"${verso.texto}" — ${verso.referencia}\n\nSola Scriptura\nhttps://solascripturabr.com.br`;
    try {
      if (navigator.share) {
        await navigator.share({ title: verso.referencia, text: texto });
      } else {
        await navigator.clipboard.writeText(texto);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      try {
        await navigator.clipboard.writeText(texto);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        const a = document.createElement('a');
        a.href = `ssb-share://${encodeURIComponent(texto)}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    }
  };

  return (
    <section className="relative px-5 sm:px-6 py-6 sm:py-8" aria-label="Versículo do Dia">
      <div className="max-w-3xl mx-auto">
        <article
          className="ssb-panel relative overflow-hidden px-6 py-9 sm:px-10 sm:py-11 text-center"
        >
          <div
            className={`pointer-events-none absolute inset-0 bg-gradient-to-b ${temaInfo.gradient} opacity-80`}
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -top-24 left-1/2 h-48 w-72 -translate-x-1/2 rounded-full bg-primary/15 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative">
            <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-primary/85">
              Versículo do dia
            </p>
            <p className="mt-1.5 text-[11px] text-muted-foreground">{hoje}</p>
            <p className={`mt-3 inline-flex items-center rounded-full border px-3 py-0.5 text-[11px] font-medium ${temaInfo.cor}`}>
              {temaInfo.label}
            </p>

            <AnimatePresence mode="wait" custom={direcao}>
              <motion.div
                key={verso.referencia}
                custom={direcao}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <blockquote className="mt-7 font-serif-body text-[1.35rem] sm:text-[1.65rem] md:text-[1.85rem] italic font-normal text-foreground leading-[1.65] max-w-2xl mx-auto">
                  {verso.texto}
                </blockquote>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center justify-center gap-3 mt-7">
              <span className="lectern-ornament" aria-hidden="true" />
            </div>
            <p className="text-[11px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-primary mt-3">
              {verso.referencia}
            </p>

            <p className="mt-6 mx-auto max-w-lg text-sm leading-relaxed text-muted-foreground">
              {temaInfo.reflexao}
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5">
              <button
                type="button"
                onClick={() => setImagemAberta(true)}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md text-sm font-semibold
                  bg-primary text-primary-foreground shadow-md hover:brightness-110 transition-[filter]"
              >
                <ImageIcon className="w-4 h-4" />
                Compartilhar no Stories
              </button>
              <Link
                href={bibliaUrl}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md text-sm font-medium
                  text-primary border border-primary/35 bg-card/70 hover:bg-primary/10 hover:border-primary/55 transition-colors"
              >
                <BookOpen className="w-4 h-4" />
                Estudar este versículo
              </Link>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mt-6 text-xs text-muted-foreground">
              <button
                type="button"
                onClick={() => navegar(-1)}
                className="inline-flex items-center gap-1 hover:text-primary transition-colors"
                aria-label="Versículo baseado no horário"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                Do horário
              </button>
              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 hover:text-primary transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Share2 className="w-3.5 h-3.5" />}
                {copied ? 'Copiado' : 'Só o texto'}
              </button>
              <button
                type="button"
                onClick={() => navegar(1)}
                className="inline-flex items-center gap-1 hover:text-primary transition-colors"
                aria-label="Próximo versículo aleatório"
              >
                Outro
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </article>
      </div>

      {imagemAberta ? (
        <ShareVerseImageModal
          open
          onClose={() => setImagemAberta(false)}
          verse={verseImagem}
          formatoInicial="stories"
        />
      ) : null}
    </section>
  );
}
