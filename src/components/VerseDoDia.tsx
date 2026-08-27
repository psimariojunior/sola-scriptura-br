'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, BookOpen, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { hrefFromRef } from '@/lib/bibliaHref';
import {
  getVersiculoPorEpoca,
  getVersiculoAleatorio,
  TEMAS_INFO,
  type VersiculoDestaque,
} from '@/data/versiculosDestaque';

export default function VerseDoDia() {
  const [copied, setCopied] = useState(false);
  const [verso, setVerso] = useState<VersiculoDestaque>(() => getVersiculoPorEpoca());
  const [direcao, setDirecao] = useState(0);

  const bibliaUrl = hrefFromRef(verso.referencia);
  const temaInfo = TEMAS_INFO[verso.tema];

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
      const a = document.createElement('a');
      a.href = `ssb-share://${encodeURIComponent(texto)}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  return (
    <section className="relative px-5 sm:px-6 py-8 sm:py-10" aria-label="Versículo do Dia">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-primary/80 mb-6">
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
            <blockquote className="lectern-quote font-serif-body text-[1.35rem] sm:text-[1.65rem] md:text-[1.85rem] italic font-normal text-foreground leading-[1.65] max-w-2xl mx-auto">
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

        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mt-7 text-xs text-muted-foreground">
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
            {copied ? 'Copiado' : 'Compartilhar'}
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
          <Link
            href={bibliaUrl}
            className="inline-flex items-center gap-1.5 text-primary hover:underline"
          >
            <BookOpen className="w-3.5 h-3.5" />
            Estudar este versículo
          </Link>
        </div>
      </div>
    </section>
  );
}
