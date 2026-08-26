'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, BookOpen, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  getVersiculoPorEpoca,
  getVersiculoAleatorio,
  TEMAS_INFO,
  type VersiculoDestaque,
} from '@/data/versiculosDestaque';

function parseReferencia(ref: string): { livro: string; capitulo: string; versiculo: string } {
  const match = ref.match(/^(\d?\s*\w+)\s+(\d+):(\d+)/);
  if (!match) return { livro: 'genesis', capitulo: '1', versiculo: '1' };
  const livroMap: Record<string, string> = {
    'genesis': 'genesis', 'gn': 'genesis', 'gênesis': 'genesis',
    'exodo': 'exodo', 'êxodo': 'exodo', 'ex': 'exodo',
    'levitico': 'levitico', 'levítico': 'levitico', 'lv': 'levitico',
    'numeros': 'numeros', 'números': 'numeros', 'nm': 'numeros',
    'deuteronomio': 'deuteronomio', 'deuteronômio': 'deuteronomio', 'dt': 'deuteronomio',
    'josue': 'josue', 'josué': 'josue',
    'juizes': 'juizes', 'juízes': 'juizes',
    'rute': 'rute',
    '1samuel': '1samuel', '1 samuel': '1samuel',
    '2samuel': '2samuel', '2 samuel': '2samuel',
    '1reis': '1reis', '1 reis': '1reis',
    '2reis': '2reis', '2 reis': '2reis',
    '1cronicas': '1cronicas', '1 crônicas': '1cronicas',
    '2cronicas': '2cronicas', '2 crônicas': '2cronicas',
    'esdras': 'esdras',
    'nehemias': 'nehemias',
    'ester': 'ester', 'ageu': 'ageu',
    'salmos': 'salmos', 'sl': 'salmos',
    'proverbios': 'proverbios', 'provérbios': 'proverbios', 'pv': 'proverbios',
    'eclesiastes': 'eclesiastes', 'ec': 'eclesiastes',
    'isaias': 'isaias', 'isaías': 'isaias', 'is': 'isaias',
    'jeremias': 'jeremias', 'jr': 'jeremias',
    'lamentacoes': 'lamentacoes', 'lm': 'lamentacoes',
    'daniel': 'daniel', 'dn': 'daniel',
    'oseias': 'oseias', 'oséias': 'oseias',
    'joel': 'joel', 'amos': 'amos',
    'jonas': 'jonas', 'miqueias': 'miqueias',
    'naum': 'naum', 'habacuque': 'habacuque',
    'sofonias': 'sofonias',
    'zacarias': 'zacarias', 'malaquias': 'malaquias',
    'mateus': 'mateus', 'mt': 'mateus',
    'marcos': 'marcos', 'mc': 'marcos',
    'lucas': 'lucas', 'lc': 'lucas',
    'joao': 'joao', 'joão': 'joao',
    'atos': 'atos', 'at': 'atos',
    'romanos': 'romanos', 'rm': 'romanos',
    '1corintios': '1corintios', '1 coríntios': '1corintios',
    '2corintios': '2corintios', '2 coríntios': '2corintios',
    'galatas': 'galatas', 'gálatas': 'galatas', 'gl': 'galatas',
    'efesios': 'efesios', 'efésios': 'efesios', 'ef': 'efesios',
    'filipenses': 'filipenses', 'fp': 'filipenses',
    'colossenses': 'colossenses', 'cl': 'colossenses',
    '1tessalonicenses': '1tessalonicenses', '1 tessalonicenses': '1tessalonicenses',
    '2tessalonicenses': '2tessalonicenses', '2 tessalonicenses': '2tessalonicenses',
    '1timoteo': '1timoteo', '1 timóteo': '1timoteo',
    '2timoteo': '2timoteo', '2 timóteo': '2timoteo',
    'tito': 'tito', 'filemom': 'filemom',
    'hebreus': 'hebreus', 'hb': 'hebreus',
    'tiago': 'tiago', 'tg': 'tiago',
    '1pedro': '1pedro', '1 pedro': '1pedro',
    '2pedro': '2pedro', '2 pedro': '2pedro',
    '1joao': '1joao', '1 joão': '1joao',
    '2joao': '2joao', '2 joão': '2joao',
    '3joao': '3joao', '3 joão': '3joao',
    'jude': 'jude', 'judas': 'jude',
    'apocalipse': 'apocalipse', 'ap': 'apocalipse',
  };
  const rawLivro = match[1].trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const livro = livroMap[rawLivro] || 'genesis';
  return { livro, capitulo: match[2], versiculo: match[3] };
}

export default function VerseDoDia() {
  const [copied, setCopied] = useState(false);
  const [verso, setVerso] = useState<VersiculoDestaque>(() => getVersiculoPorEpoca());
  const [direcao, setDirecao] = useState(0);

  const { livro, capitulo } = parseReferencia(verso.referencia);
  const bibliaUrl = `/biblia?livro=${livro}&capitulo=${capitulo}`;
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
            Ler o capítulo
          </Link>
        </div>
      </div>
    </section>
  );
}
