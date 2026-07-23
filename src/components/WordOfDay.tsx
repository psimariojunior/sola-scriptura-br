'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Languages, Volume2, BookOpen, ChevronRight, Info } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface WordOfDay {
  word: string;
  transliteration: string;
  strongNumber: string;
  language: 'hebraico' | 'grego';
  meaning: string;
  usage: string;
  verseRef: string;
  verseText: string;
  category: string;
  pronunciation: string;
  root?: string;
  relatedWords?: string[];
}

const WORDS_OF_DAY: WordOfDay[] = [
  {
    word: 'אָהַב',
    transliteration: 'ahav',
    strongNumber: 'H157',
    language: 'hebraico',
    meaning: 'Amar, ter affeto profundo, desejar',
    usage: 'Usado 251 vezes no AT. Amor de Deus pelo povo, amor entre esposos, amor ao próximo.',
    verseRef: 'Deuteronômio 6:5',
    verseText: 'Amarás o Senhor, o teu Deus, de todo o teu coração, de toda a tua alma e de todo o teu entendimento.',
    category: 'Amor',
    pronunciation: 'a-HAV',
    root: 'אָהַב',
    relatedWords: ['אַהֲבָה (ahavah - amor)', 'אוֹהֵב (ohev - amante)'],
  },
  {
    word: 'ἀγάπη',
    transliteration: 'agape',
    strongNumber: 'G26',
    language: 'grego',
    meaning: 'Amor incondicional, amor sacrificial, amor divino',
    usage: 'O tipo mais elevado de amor no grego. Amor que Deus demonstra por nós.',
    verseRef: '1 João 4:8',
    verseText: 'Quem não ama não conhece a Deus, porque Deus é amor.',
    category: 'Amor',
    pronunciation: 'a-GA-pe',
    root: 'ἀγαπάω',
    relatedWords: ['ἀγαπάω (agapao - amar)', 'ἀγαπητός (agapetos - amado)'],
  },
  {
    word: 'חָכְמָה',
    transliteration: 'chokmah',
    strongNumber: 'H2451',
    language: 'hebraico',
    meaning: 'Sabedoria, habilidade, discernimento',
    usage: 'Usado 233 vezes. Sabedoria prática e moral. Deus é a fonte de toda sabedoria.',
    verseRef: 'Provérbios 9:10',
    verseText: 'O temor do Senhor é o princípio da sabedoria, e o conhecimento do Santo é prudência.',
    category: 'Sabedoria',
    pronunciation: 'khokh-MA',
    root: 'חָכַם',
    relatedWords: ['חָכָם (chakam - sábio)', 'חִכֻּמִים (chikumim - sabedorias)'],
  },
  {
    word: 'πίστις',
    transliteration: 'pistis',
    strongNumber: 'G4102',
    language: 'grego',
    meaning: 'Fé, confiança, crença, fidelidade',
    usage: 'Usado 243 vezes no NT. Fé em Deus, fé em Cristo, fidelidade.',
    verseRef: 'Hebreus 11:1',
    verseText: 'Ora, a fé é o firme fundamento das coisas que se esperam, e a prova das coisas que se não veem.',
    category: 'Fé',
    pronunciation: 'PI-stis',
    root: 'πιστεύω',
    relatedWords: ['πιστεύω (pisteuo - crer)', 'πιστός (pistos - fiel)'],
  },
  {
    word: 'שָׁלוֹם',
    transliteration: 'shalom',
    strongNumber: 'H7965',
    language: 'hebraico',
    meaning: 'Paz, completude, bem-estar, harmonia',
    usage: 'Usado 236 vezes. Paz que vem de Deus, não apenas ausência de conflito.',
    verseRef: 'Números 6:26',
    verseText: 'O Senhor levante o seu rosto sobre ti, e te conceda paz.',
    category: 'Paz',
    pronunciation: 'sha-LOM',
    root: 'שָׁלַם',
    relatedWords: ['שָׁלֵם (shalem - completo)', 'שַׁלּוֹם (shalon - paz)'],
  },
];

export function WordOfDay() {
  const [currentWord, setCurrentWord] = useState<WordOfDay | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
    setCurrentWord(WORDS_OF_DAY[dayOfYear % WORDS_OF_DAY.length]);
  }, []);

  if (!currentWord) return null;

  return (
    <div className="p-4">
      <div className="flex items-center gap-2 mb-3">
        <Languages className="w-4 h-4 text-[var(--brand)]" />
        <span className="text-xs font-semibold uppercase tracking-wider text-[var(--content-muted)]">Palavra do Dia</span>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        className="rounded-xl border border-[var(--border)]/40 overflow-hidden bg-[var(--surface-raised)]">
        <div className="p-4 text-center border-b border-[var(--border)]/20">
          <div className="text-[10px] text-[var(--content-muted)] mb-1">{currentWord.language === 'hebraico' ? 'Hebraico' : 'Grego'} • {currentWord.strongNumber}</div>
          <h2 className="text-3xl font-bold mb-1" dir="rtl">{currentWord.word}</h2>
          <div className="text-sm text-[var(--brand)] font-medium">{currentWord.transliteration}</div>
          <div className="text-[10px] text-[var(--content-muted)] mt-1">/{currentWord.pronunciation}/</div>
        </div>

        <div className="p-4 space-y-3">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-wider text-[var(--content-muted)] mb-1">Significado</div>
            <p className="text-sm text-[var(--content-primary)]">{currentWord.meaning}</p>
          </div>

          <div>
            <div className="text-[10px] font-semibold uppercase tracking-wider text-[var(--content-muted)] mb-1">Uso Bíblico</div>
            <p className="text-xs text-[var(--content-muted)]">{currentWord.usage}</p>
          </div>

          <div className="rounded-lg bg-[var(--brand)]/5 border border-[var(--brand)]/20 p-3">
            <div className="text-[10px] text-[var(--brand)] font-semibold mb-1">{currentWord.verseRef}</div>
            <p className="text-xs font-serif-body italic text-[var(--content-primary)]">&ldquo;{currentWord.verseText}&rdquo;</p>
          </div>

          <button onClick={() => setShowDetails(!showDetails)}
            className="flex items-center gap-1 text-xs text-[var(--brand)] hover:underline">
            <Info className="w-3 h-3" /> {showDetails ? 'Menos detalhes' : 'Mais detalhes'}
          </button>

          {showDetails && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-2">
              {currentWord.root && (
                <div>
                  <div className="text-[10px] font-semibold text-[var(--content-muted)]">Raiz</div>
                  <div className="text-sm" dir="rtl">{currentWord.root}</div>
                </div>
              )}
              {currentWord.relatedWords && currentWord.relatedWords.length > 0 && (
                <div>
                  <div className="text-[10px] font-semibold text-[var(--content-muted)]">Palavras Relacionadas</div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {currentWord.relatedWords.map((w, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--surface-sunken)] text-[var(--content-muted)]">{w}</span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
