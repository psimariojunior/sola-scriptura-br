'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Share2, BookOpen, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { versiculosDestaque } from '@/data/versiculosDestaque';

function getDiaDoAno(): number {
  const hoje = new Date();
  const inicio = new Date(hoje.getFullYear(), 0, 0);
  return Math.floor((hoje.getTime() - inicio.getTime()) / (1000 * 60 * 60 * 24));
}

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

  const verso = useMemo(() => {
    const idx = (getDiaDoAno() - 1) % versiculosDestaque.length;
    return versiculosDestaque[idx];
  }, []);

  const { livro, capitulo } = parseReferencia(verso.referencia);
  const bibliaUrl = `/biblia?livro=${livro}&capitulo=${capitulo}`;

  const handleCopy = async () => {
    const texto = `"${verso.texto}" — ${verso.referencia}`;
    await navigator.clipboard.writeText(texto);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      className="relative py-12 sm:py-16 px-4 sm:px-6"
      aria-label="Versículo do Dia"
    >
      <div className="max-w-3xl mx-auto">
        <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
          <div className="p-8 sm:p-10 text-center">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-6">
              Versículo do Dia
            </p>

            <blockquote className="font-serif-body text-lg sm:text-xl md:text-2xl italic font-light text-foreground/80 leading-relaxed">
              <span aria-hidden="true" className="text-primary/20 text-2xl sm:text-3xl mr-1">&ldquo;</span>
              {verso.texto}
              <span aria-hidden="true" className="text-primary/20 text-2xl sm:text-3xl ml-1">&rdquo;</span>
            </blockquote>

            <p className="mt-5 text-sm font-medium tracking-wider uppercase text-primary">
              — {verso.referencia}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-border text-foreground hover:bg-secondary transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copiado!
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4" />
                    Compartilhar
                  </>
                )}
              </button>

              <Link
                href={bibliaUrl}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                <BookOpen className="w-4 h-4" />
                Ler capítulo
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
