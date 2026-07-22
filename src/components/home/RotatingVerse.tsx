'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const heroVerses = [
  {
    text: 'Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.',
    ref: 'João 3:16',
  },
  {
    text: 'No princípio era o Verbo, e o Verbo estava com Deus, e o Verbo era Deus.',
    ref: 'João 1:1',
  },
  {
    text: 'Confia no Senhor de todo o teu coração e não te estribes no teu próprio entendimento.',
    ref: 'Provérbios 3:5',
  },
  {
    text: 'O Senhor é o meu pastor; nada me faltará.',
    ref: 'Salmos 23:1',
  },
  {
    text: 'Tudo posso naquele que me fortalece.',
    ref: 'Filipenses 4:13',
  },
  {
    text: 'E sabemos que todas as coisas contribuem juntamente para o bem daqueles que amam a Deus.',
    ref: 'Romanos 8:28',
  },
];

export function RotatingVerse() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((p) => (p + 1) % heroVerses.length), 5000);
    return () => clearInterval(t);
  }, []);

  const verse = heroVerses[idx];

  return (
    <div className="relative min-h-[120px] sm:min-h-[140px] flex items-center justify-center max-w-3xl mx-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={verse.ref}
          initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -12, filter: 'blur(6px)' }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center"
        >
          <p className="font-serif-body text-base sm:text-lg italic font-light text-content-secondary dark:text-foreground/80 leading-relaxed">
            <span aria-hidden="true" className="text-primary/40 mr-1">&ldquo;</span>
            {verse.text}
            <span aria-hidden="true" className="text-primary/40 ml-1">&rdquo;</span>
          </p>
          <p className="mt-3 text-xs font-semibold tracking-[0.25em] uppercase text-primary">
            — {verse.ref}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
