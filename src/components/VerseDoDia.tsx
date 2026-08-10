'use client';

import { useMemo, useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, BookOpen, Copy, Check, Dices, Palette, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  getVersiculoDoDia,
  getVersiculoPorEpoca,
  getVersiculoAleatorio,
  TEMAS_INFO,
  type VersiculoDestaque,
} from '@/data/versiculosDestaque';

const AMBIENT_CONFIGS: Record<VersiculoDestaque['tema'], { bg: string; glow: string; particle: string }> = {
  fe: { bg: 'from-blue-900/30 via-blue-800/20 to-indigo-900/30', glow: 'bg-blue-400/10', particle: 'bg-blue-300/20' },
  amor: { bg: 'from-rose-900/30 via-pink-800/20 to-red-900/30', glow: 'bg-rose-400/10', particle: 'bg-rose-300/20' },
  esperanca: { bg: 'from-amber-900/30 via-orange-800/20 to-yellow-900/30', glow: 'bg-amber-400/10', particle: 'bg-amber-300/20' },
  forca: { bg: 'from-red-900/30 via-red-800/20 to-orange-900/30', glow: 'bg-red-400/10', particle: 'bg-red-300/20' },
  paz: { bg: 'from-teal-900/30 via-emerald-800/20 to-cyan-900/30', glow: 'bg-teal-400/10', particle: 'bg-teal-300/20' },
  sabedoria: { bg: 'from-violet-900/30 via-purple-800/20 to-indigo-900/30', glow: 'bg-violet-400/10', particle: 'bg-violet-300/20' },
  graca: { bg: 'from-emerald-900/30 via-green-800/20 to-teal-900/30', glow: 'bg-emerald-400/10', particle: 'bg-emerald-300/20' },
  louvor: { bg: 'from-yellow-900/30 via-amber-800/20 to-orange-900/30', glow: 'bg-yellow-400/10', particle: 'bg-yellow-300/20' },
  oracao: { bg: 'from-indigo-900/30 via-blue-800/20 to-violet-900/30', glow: 'bg-indigo-400/10', particle: 'bg-indigo-300/20' },
  justica: { bg: 'from-orange-900/30 via-red-800/20 to-amber-900/30', glow: 'bg-orange-400/10', particle: 'bg-orange-300/20' },
  consolo: { bg: 'from-sky-900/30 via-blue-800/20 to-cyan-900/30', glow: 'bg-sky-400/10', particle: 'bg-sky-300/20' },
  promessa: { bg: 'from-purple-900/30 via-violet-800/20 to-indigo-900/30', glow: 'bg-purple-400/10', particle: 'bg-purple-300/20' },
};

function getHorarioLabel(): string {
  const hora = new Date().getHours();
  if (hora >= 5 && hora < 12) return '☀️ Bom dia';
  if (hora >= 12 && hora < 18) return '🌤️ Boa tarde';
  return '🌙 Boa noite';
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

function Particles({ tema }: { tema: VersiculoDestaque['tema'] }) {
  const config = AMBIENT_CONFIGS[tema];
  const particles = useMemo(() =>
    Array.from({ length: 6 }, (_, i) => ({
      id: i,
      size: 4 + Math.random() * 8,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: 8 + Math.random() * 12,
      delay: Math.random() * 5,
    })), [tema]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map(p => (
        <motion.div
          key={p.id}
          className={`absolute rounded-full ${config.particle}`}
          style={{ width: p.size, height: p.size, left: `${p.x}%`, top: `${p.y}%` }}
          animate={{ y: [-20, 20, -20], x: [-10, 10, -10], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

export default function VerseDoDia() {
  const [copied, setCopied] = useState(false);
  const [verso, setVerso] = useState<VersiculoDestaque>(() => getVersiculoPorEpoca());
  const [direcao, setDirecao] = useState(0);
  const [modoVisualizacao, setModoVisualizacao] = useState<'diaria' | 'aleatoria' | 'tema'>('diaria');

  const { livro, capitulo } = parseReferencia(verso.referencia);
  const bibliaUrl = `/biblia?livro=${livro}&capitulo=${capitulo}`;
  const temaInfo = TEMAS_INFO[verso.tema];
  const ambient = AMBIENT_CONFIGS[verso.tema];

  const navegar = useCallback((dir: -1 | 1) => {
    setDirecao(dir);
    if (dir === 1) {
      setVerso(getVersiculoAleatorio());
    } else {
      setVerso(getVersiculoPorEpoca());
    }
  }, []);

  const handleSurpreendaMe = useCallback(() => {
    setDirecao(1);
    setVerso(getVersiculoAleatorio());
    setModoVisualizacao('aleatoria');
  }, []);

  const handleShare = async () => {
    const texto = `"${verso.texto}" — ${verso.referencia}\n\n📖 Sola Scriptura\nhttps://solascripturabr.com.br`;
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
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative py-10 sm:py-14 px-4 sm:px-6"
      aria-label="Versículo do Dia"
    >
      <div className="max-w-3xl mx-auto">
        <div className="relative rounded-3xl border border-primary/20 overflow-hidden group hover:shadow-2xl hover:shadow-primary/[0.08] transition-all duration-500">

          {/* Ambient background */}
          <div className={`absolute inset-0 bg-gradient-to-br ${ambient.bg} transition-all duration-1000`} />
          <div className={`absolute inset-0 ${ambient.glow} blur-3xl opacity-30`} />

          {/* Particles */}
          <Particles tema={verso.tema} />

          {/* Top accent */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

          <div className="relative p-8 sm:p-12 text-center">
            {/* Greeting + Theme badge */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="text-xs sm:text-sm font-medium text-content-secondary/70">{getHorarioLabel()}</span>
              <div className="h-3 w-px bg-primary/20" />
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider border ${temaInfo.cor}`}>
                <span>{temaInfo.emoji}</span>
                {temaInfo.label}
              </span>
            </div>

            {/* Verse text — animated reveal */}
            <AnimatePresence mode="wait" custom={direcao}>
              <motion.div
                key={verso.referencia}
                custom={direcao}
                initial={{ opacity: 0, x: direcao * 60, filter: 'blur(8px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: direcao * -60, filter: 'blur(8px)' }}
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <blockquote className="font-serif-body text-xl sm:text-2xl md:text-[1.75rem] italic font-light text-content-secondary dark:text-foreground/90 leading-[1.8] max-w-2xl mx-auto">
                  <span aria-hidden="true" className="text-primary/20 text-3xl sm:text-4xl mr-1.5 font-display">&ldquo;</span>
                  {verso.texto}
                  <span aria-hidden="true" className="text-primary/20 text-3xl sm:text-4xl ml-1.5 font-display">&rdquo;</span>
                </blockquote>
              </motion.div>
            </AnimatePresence>

            {/* Reference — elegant divider */}
            <div className="flex items-center justify-center gap-3 mt-8">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-primary/30" />
              <p className="text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-primary">
                {verso.referencia}
              </p>
              <div className="h-px w-8 bg-gradient-to-l from-transparent to-primary/30" />
            </div>

            {/* Navigation + Actions */}
            <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
              {/* Previous (back to time-based) */}
              <button
                onClick={() => navegar(-1)}
                className="btn-premium inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-semibold rounded-xl border border-primary/20 bg-primary/[0.03] text-primary/70 hover:bg-primary/[0.08] hover:border-primary/30 transition-all duration-300"
                aria-label="Versículo baseado no horário"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                Horário
              </button>

              {/* Share */}
              <button
                onClick={handleShare}
                className="btn-premium inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-xl border border-primary/25 bg-primary/[0.04] text-primary hover:bg-primary/[0.08] hover:border-primary/40 transition-all duration-300"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Share2 className="w-3.5 h-3.5" />}
                {copied ? 'Copiado!' : 'Compartilhar'}
              </button>

              {/* Surprise me */}
              <button
                onClick={handleSurpreendaMe}
                className="btn-premium inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-xl border border-primary/25 bg-primary/[0.04] text-primary hover:bg-primary/[0.08] hover:border-primary/40 transition-all duration-300"
              >
                <Dices className="w-3.5 h-3.5" />
                Surpreenda-me!
              </button>

              {/* Next random */}
              <button
                onClick={() => navegar(1)}
                className="btn-premium inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-semibold rounded-xl border border-primary/20 bg-primary/[0.03] text-primary/70 hover:bg-primary/[0.08] hover:border-primary/30 transition-all duration-300"
                aria-label="Próximo versículo aleatório"
              >
                Próximo
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

              {/* Read chapter */}
              <Link
                href={bibliaUrl}
                className="btn-premium inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-xl bg-primary/10 text-primary hover:bg-primary/15 transition-all duration-300"
              >
                <BookOpen className="w-3.5 h-3.5" />
                Ler capítulo
              </Link>
            </div>
          </div>

          {/* Bottom accent */}
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        </div>
      </div>
    </motion.section>
  );
}
