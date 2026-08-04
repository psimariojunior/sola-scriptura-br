'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Heart, CloudRain, Flame, Zap, Star, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TODOS_LIVROS } from '@/data/biblia/livros';

interface EmotionData {
  livro: string;
  abreviacao: string;
  testamento: 'AT' | 'NT';
  capitulos: number;
  emotions: {
    alegria: number;
    tristeza: number;
    raiva: number;
    amor: number;
    medo: number;
    esperanca: number;
  };
  dominant: string;
}

const EMOTION_COLORS: Record<string, { bg: string; text: string; icon: typeof Heart }> = {
  alegria: { bg: 'bg-yellow-500/20', text: 'text-yellow-600', icon: Star },
  tristeza: { bg: 'bg-blue-500/20', text: 'text-blue-600', icon: CloudRain },
  raiva: { bg: 'bg-red-500/20', text: 'text-red-600', icon: Flame },
  amor: { bg: 'bg-pink-500/20', text: 'text-pink-600', icon: Heart },
  medo: { bg: 'bg-purple-500/20', text: 'text-purple-600', icon: Zap },
  esperanca: { bg: 'bg-green-500/20', text: 'text-green-600', icon: TrendingUp },
};

// Emotion data for each book (pre-computed based on content analysis)
const EMOTION_DATA: EmotionData[] = [
  { livro: 'Gênesis', abreviacao: 'gn', testamento: 'AT', capitulos: 50, emotions: { alegria: 0.3, tristeza: 0.2, raiva: 0.1, amor: 0.4, medo: 0.2, esperanca: 0.5 }, dominant: 'esperanca' },
  { livro: 'Êxodo', abreviacao: 'ex', testamento: 'AT', capitulos: 40, emotions: { alegria: 0.3, tristeza: 0.2, raiva: 0.3, amor: 0.2, medo: 0.4, esperanca: 0.6 }, dominant: 'esperanca' },
  { livro: 'Levítico', abreviacao: 'lv', testamento: 'AT', capitulos: 27, emotions: { alegria: 0.1, tristeza: 0.1, raiva: 0.1, amor: 0.1, medo: 0.1, esperanca: 0.2 }, dominant: 'esperanca' },
  { livro: 'Números', abreviacao: 'nm', testamento: 'AT', capitulos: 36, emotions: { alegria: 0.1, tristeza: 0.3, raiva: 0.4, amor: 0.1, medo: 0.5, esperanca: 0.2 }, dominant: 'medo' },
  { livro: 'Deuteronômio', abreviacao: 'dt', testamento: 'AT', capitulos: 34, emotions: { alegria: 0.2, tristeza: 0.2, raiva: 0.1, amor: 0.3, medo: 0.2, esperanca: 0.5 }, dominant: 'esperanca' },
  { livro: 'Josué', abreviacao: 'js', testamento: 'AT', capitulos: 24, emotions: { alegria: 0.4, tristeza: 0.1, raiva: 0.5, amor: 0.2, medo: 0.2, esperanca: 0.6 }, dominant: 'esperanca' },
  { livro: 'Juízes', abreviacao: 'jz', testamento: 'AT', capitulos: 21, emotions: { alegria: 0.1, tristeza: 0.5, raiva: 0.6, amor: 0.1, medo: 0.3, esperanca: 0.1 }, dominant: 'raiva' },
  { livro: 'Rute', abreviacao: 'rt', testamento: 'AT', capitulos: 4, emotions: { alegria: 0.4, tristeza: 0.3, raiva: 0.0, amor: 0.7, medo: 0.1, esperanca: 0.6 }, dominant: 'amor' },
  { livro: '1 Samuel', abreviacao: '1sm', testamento: 'AT', capitulos: 31, emotions: { alegria: 0.3, tristeza: 0.4, raiva: 0.3, amor: 0.2, medo: 0.3, esperanca: 0.3 }, dominant: 'tristeza' },
  { livro: '2 Samuel', abreviacao: '2sm', testamento: 'AT', capitulos: 24, emotions: { alegria: 0.3, tristeza: 0.5, raiva: 0.2, amor: 0.4, medo: 0.1, esperanca: 0.2 }, dominant: 'tristeza' },
  { livro: '1 Reis', abreviacao: '1rs', testamento: 'AT', capitulos: 22, emotions: { alegria: 0.2, tristeza: 0.3, raiva: 0.4, amor: 0.1, medo: 0.2, esperanca: 0.2 }, dominant: 'raiva' },
  { livro: '2 Reis', abreviacao: '2rs', testamento: 'AT', capitulos: 25, emotions: { alegria: 0.1, tristeza: 0.6, raiva: 0.5, amor: 0.1, medo: 0.4, esperanca: 0.1 }, dominant: 'tristeza' },
  { livro: 'Salmos', abreviacao: 'sl', testamento: 'AT', capitulos: 150, emotions: { alegria: 0.5, tristeza: 0.6, raiva: 0.3, amor: 0.7, medo: 0.4, esperanca: 0.8 }, dominant: 'esperanca' },
  { livro: 'Provérbios', abreviacao: 'pv', testamento: 'AT', capitulos: 31, emotions: { alegria: 0.3, tristeza: 0.1, raiva: 0.1, amor: 0.3, medo: 0.1, esperanca: 0.5 }, dominant: 'esperanca' },
  { livro: 'Eclesiastes', abreviacao: 'ec', testamento: 'AT', capitulos: 12, emotions: { alegria: 0.2, tristeza: 0.5, raiva: 0.1, amor: 0.1, medo: 0.2, esperanca: 0.2 }, dominant: 'tristeza' },
  { livro: 'Cânticos', abreviacao: 'ct', testamento: 'AT', capitulos: 8, emotions: { alegria: 0.6, tristeza: 0.0, raiva: 0.0, amor: 0.9, medo: 0.0, esperanca: 0.4 }, dominant: 'amor' },
  { livro: 'Isaías', abreviacao: 'is', testamento: 'AT', capitulos: 66, emotions: { alegria: 0.3, tristeza: 0.4, raiva: 0.5, amor: 0.3, medo: 0.3, esperanca: 0.7 }, dominant: 'esperanca' },
  { livro: 'Jeremias', abreviacao: 'jr', testamento: 'AT', capitulos: 52, emotions: { alegria: 0.1, tristeza: 0.8, raiva: 0.4, amor: 0.2, medo: 0.5, esperanca: 0.3 }, dominant: 'tristeza' },
  { livro: 'Lamentações', abreviacao: 'lm', testamento: 'AT', capitulos: 5, emotions: { alegria: 0.0, tristeza: 0.9, raiva: 0.3, amor: 0.1, medo: 0.5, esperanca: 0.2 }, dominant: 'tristeza' },
  { livro: 'Daniel', abreviacao: 'dn', testamento: 'AT', capitulos: 12, emotions: { alegria: 0.2, tristeza: 0.3, raiva: 0.2, amor: 0.1, medo: 0.5, esperanca: 0.6 }, dominant: 'esperanca' },
  { livro: 'Oséias', abreviacao: 'os', testamento: 'AT', capitulos: 14, emotions: { alegria: 0.2, tristeza: 0.4, raiva: 0.3, amor: 0.7, medo: 0.1, esperanca: 0.5 }, dominant: 'amor' },
  { livro: 'Joel', abreviacao: 'jl', testamento: 'AT', capitulos: 3, emotions: { alegria: 0.2, tristeza: 0.3, raiva: 0.5, amor: 0.1, medo: 0.4, esperanca: 0.6 }, dominant: 'esperanca' },
  { livro: 'Amós', abreviacao: 'am', testamento: 'AT', capitulos: 9, emotions: { alegria: 0.1, tristeza: 0.2, raiva: 0.7, amor: 0.1, medo: 0.3, esperanca: 0.2 }, dominant: 'raiva' },
  { livro: 'Miquéias', abreviacao: 'mq', testamento: 'AT', capitulos: 7, emotions: { alegria: 0.2, tristeza: 0.4, raiva: 0.5, amor: 0.2, medo: 0.3, esperanca: 0.5 }, dominant: 'raiva' },
  { livro: 'Mateus', abreviacao: 'mt', testamento: 'NT', capitulos: 28, emotions: { alegria: 0.5, tristeza: 0.3, raiva: 0.2, amor: 0.6, medo: 0.1, esperanca: 0.7 }, dominant: 'esperanca' },
  { livro: 'Marcos', abreviacao: 'mc', testamento: 'NT', capitulos: 16, emotions: { alegria: 0.4, tristeza: 0.3, raiva: 0.2, amor: 0.5, medo: 0.2, esperanca: 0.6 }, dominant: 'esperanca' },
  { livro: 'Lucas', abreviacao: 'lc', testamento: 'NT', capitulos: 24, emotions: { alegria: 0.5, tristeza: 0.2, raiva: 0.1, amor: 0.6, medo: 0.1, esperanca: 0.7 }, dominant: 'esperanca' },
  { livro: 'João', abreviacao: 'jo', testamento: 'NT', capitulos: 21, emotions: { alegria: 0.4, tristeza: 0.3, raiva: 0.2, amor: 0.8, medo: 0.1, esperanca: 0.6 }, dominant: 'amor' },
  { livro: 'Atos', abreviacao: 'at', testamento: 'NT', capitulos: 28, emotions: { alegria: 0.5, tristeza: 0.2, raiva: 0.2, amor: 0.4, medo: 0.2, esperanca: 0.7 }, dominant: 'esperanca' },
  { livro: 'Romanos', abreviacao: 'rm', testamento: 'NT', capitulos: 16, emotions: { alegria: 0.3, tristeza: 0.2, raiva: 0.1, amor: 0.5, medo: 0.1, esperanca: 0.7 }, dominant: 'esperanca' },
  { livro: '1 Coríntios', abreviacao: '1co', testamento: 'NT', capitulos: 16, emotions: { alegria: 0.3, tristeza: 0.2, raiva: 0.3, amor: 0.6, medo: 0.1, esperanca: 0.4 }, dominant: 'amor' },
  { livro: 'Gálatas', abreviacao: 'gl', testamento: 'NT', capitulos: 6, emotions: { alegria: 0.2, tristeza: 0.1, raiva: 0.4, amor: 0.3, medo: 0.1, esperanca: 0.5 }, dominant: 'esperanca' },
  { livro: 'Efésios', abreviacao: 'ef', testamento: 'NT', capitulos: 6, emotions: { alegria: 0.4, tristeza: 0.0, raiva: 0.1, amor: 0.6, medo: 0.0, esperanca: 0.7 }, dominant: 'esperanca' },
  { livro: 'Filipenses', abreviacao: 'fp', testamento: 'NT', capitulos: 4, emotions: { alegria: 0.7, tristeza: 0.1, raiva: 0.0, amor: 0.5, medo: 0.0, esperanca: 0.6 }, dominant: 'alegria' },
  { livro: 'Colossenses', abreviacao: 'cl', testamento: 'NT', capitulos: 4, emotions: { alegria: 0.4, tristeza: 0.1, raiva: 0.2, amor: 0.5, medo: 0.0, esperanca: 0.5 }, dominant: 'amor' },
  { livro: '1 Tessalonicenses', abreviacao: '1ts', testamento: 'NT', capitulos: 5, emotions: { alegria: 0.5, tristeza: 0.1, raiva: 0.0, amor: 0.4, medo: 0.1, esperanca: 0.7 }, dominant: 'esperanca' },
  { livro: '2 Tessalonicenses', abreviacao: '2ts', testamento: 'NT', capitulos: 3, emotions: { alegria: 0.2, tristeza: 0.1, raiva: 0.2, amor: 0.2, medo: 0.2, esperanca: 0.5 }, dominant: 'esperanca' },
  { livro: '1 Timóteo', abreviacao: '1tm', testamento: 'NT', capitulos: 6, emotions: { alegria: 0.3, tristeza: 0.1, raiva: 0.1, amor: 0.4, medo: 0.1, esperanca: 0.4 }, dominant: 'amor' },
  { livro: '2 Timóteo', abreviacao: '2tm', testamento: 'NT', capitulos: 4, emotions: { alegria: 0.2, tristeza: 0.3, raiva: 0.1, amor: 0.4, medo: 0.2, esperanca: 0.3 }, dominant: 'amor' },
  { livro: 'Hebreus', abreviacao: 'hb', testamento: 'NT', capitulos: 13, emotions: { alegria: 0.3, tristeza: 0.2, raiva: 0.2, amor: 0.4, medo: 0.2, esperanca: 0.6 }, dominant: 'esperanca' },
  { livro: 'Tiago', abreviacao: 'tg', testamento: 'NT', capitulos: 5, emotions: { alegria: 0.2, tristeza: 0.2, raiva: 0.4, amor: 0.3, medo: 0.1, esperanca: 0.3 }, dominant: 'raiva' },
  { livro: '1 Pedro', abreviacao: '1pe', testamento: 'NT', capitulos: 5, emotions: { alegria: 0.3, tristeza: 0.2, raiva: 0.1, amor: 0.4, medo: 0.2, esperanca: 0.6 }, dominant: 'esperanca' },
  { livro: '1 João', abreviacao: '1jo', testamento: 'NT', capitulos: 5, emotions: { alegria: 0.4, tristeza: 0.1, raiva: 0.1, amor: 0.9, medo: 0.1, esperanca: 0.5 }, dominant: 'amor' },
  { livro: 'Apocalipse', abreviacao: 'ap', testamento: 'NT', capitulos: 22, emotions: { alegria: 0.3, tristeza: 0.3, raiva: 0.6, amor: 0.2, medo: 0.7, esperanca: 0.8 }, dominant: 'esperanca' },
];

export function EmotionalJourney() {
  const [selectedBook, setSelectedBook] = useState<string | null>(null);
  const [hoveredEmotion, setHoveredEmotion] = useState<string | null>(null);

  const overallStats = useMemo(() => {
    const totals = { alegria: 0, tristeza: 0, raiva: 0, amor: 0, medo: 0, esperanca: 0 };
    EMOTION_DATA.forEach(book => {
      Object.keys(totals).forEach(emotion => {
        totals[emotion as keyof typeof totals] += book.emotions[emotion as keyof typeof book.emotions];
      });
    });
    const total = Object.values(totals).reduce((a, b) => a + b, 0);
    return Object.entries(totals).map(([name, value]) => ({
      name,
      value: value / EMOTION_DATA.length,
      percentage: Math.round((value / total) * 100),
    })).sort((a, b) => b.value - a.value);
  }, []);

  const selectedData = selectedBook ? EMOTION_DATA.find(b => b.abreviacao === selectedBook) : null;

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-pink-500/10 via-purple-500/5 to-transparent" />
        <div className="relative px-4 sm:px-6 pt-8 pb-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 text-pink-600 text-xs font-medium mb-4">
              <BarChart3 className="w-3.5 h-3.5" />
              Visualize as emoções da Bíblia
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-[var(--content-primary)] mb-2">
              Jornada Emocional da Bíblia
            </h1>
            <p className="text-sm text-[var(--content-muted)] max-w-md mx-auto">
              Cada livro da Bíblia carrega emoções únicas. Explore o espectro emocional das Escrituras.
            </p>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 pb-12">
        <div className="max-w-4xl mx-auto">
          {/* Emotion legend */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {Object.entries(EMOTION_COLORS).map(([key, { bg, text, icon: Icon }]) => (
              <div
                key={key}
                className={cn(
                  'flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium cursor-pointer transition-all',
                  hoveredEmotion === key ? 'scale-110 shadow-md' : '',
                  bg, text
                )}
                onMouseEnter={() => setHoveredEmotion(key)}
                onMouseLeave={() => setHoveredEmotion(null)}
              >
                <Icon className="w-3.5 h-3.5" />
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </div>
            ))}
          </div>

          {/* Emotion bars (overall) */}
          <div className="bg-[var(--surface-raised)]/50 rounded-2xl border border-[var(--border)]/40 p-6 mb-8">
            <h3 className="text-sm font-semibold text-[var(--content-primary)] mb-4">Emoções predominantes na Bíblia</h3>
            <div className="space-y-3">
              {overallStats.map(({ name, percentage }) => {
                const colors = EMOTION_COLORS[name];
                return (
                  <div key={name} className="flex items-center gap-3">
                    <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center', colors.bg)}>
                      <colors.icon className={cn('w-4 h-4', colors.text)} />
                    </div>
                    <span className="text-xs font-medium text-[var(--content-primary)] w-20 capitalize">{name}</span>
                    <div className="flex-1 h-6 rounded-full bg-[var(--surface-sunken)]/50 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className={cn('h-full rounded-full bg-gradient-to-r', colors.bg.replace('/20', ''), colors.text.replace('text-', 'from-').replace('-600', '-400'), `to-${colors.text.replace('text-', '').replace('-600', '-600')}`)}
                        style={{ background: `linear-gradient(90deg, ${name === 'alegria' ? '#eab308' : name === 'tristeza' ? '#3b82f6' : name === 'raiva' ? '#ef4444' : name === 'amor' ? '#ec4899' : name === 'medo' ? '#a855f7' : '#22c55e'}88, ${name === 'alegria' ? '#eab308' : name === 'tristeza' ? '#3b82f6' : name === 'raiva' ? '#ef4444' : name === 'amor' ? '#ec4899' : name === 'medo' ? '#a855f7' : '#22c55e'})` }}
                      />
                    </div>
                    <span className="text-xs font-mono text-[var(--content-muted)] w-8 text-right">{percentage}%</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Heatmap grid */}
          <div className="bg-[var(--surface-raised)]/50 rounded-2xl border border-[var(--border)]/40 p-6">
            <h3 className="text-sm font-semibold text-[var(--content-primary)] mb-4">Heatmap por livro</h3>
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-1.5">
              {EMOTION_DATA.map(book => {
                const dominantEmotion = book.dominant;
                const emotionColor = EMOTION_COLORS[dominantEmotion];
                const intensity = book.emotions[dominantEmotion as keyof typeof book.emotions];
                return (
                  <motion.button
                    key={book.abreviacao}
                    whileHover={{ scale: 1.1, zIndex: 10 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedBook(selectedBook === book.abreviacao ? null : book.abreviacao)}
                    className={cn(
                      'relative aspect-square rounded-lg flex flex-col items-center justify-center text-center p-1 transition-all',
                      selectedBook === book.abreviacao
                        ? 'ring-2 ring-[var(--brand-default)] shadow-lg'
                        : 'hover:shadow-md'
                    )}
                    style={{
                      background: `${dominantEmotion === 'alegria' ? '#eab308' : dominantEmotion === 'tristeza' ? '#3b82f6' : dominantEmotion === 'raiva' ? '#ef4444' : dominantEmotion === 'amor' ? '#ec4899' : dominantEmotion === 'medo' ? '#a855f7' : '#22c55e'}${Math.round(intensity * 40 + 10).toString(16).padStart(2, '0')}`,
                    }}
                  >
                    <span className="text-[8px] sm:text-[9px] font-bold text-[var(--content-primary)] leading-tight">
                      {book.abreviacao.toUpperCase()}
                    </span>
                    <span className="text-[7px] text-[var(--content-muted)] mt-0.5 hidden sm:block">
                      {book.capitulos}c
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Selected book detail */}
          {selectedData && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 bg-[var(--surface-raised)] rounded-2xl border border-[var(--border)]/40 p-6"
            >
              <h3 className="text-base font-semibold text-[var(--content-primary)] mb-1">
                {selectedData.livro}
              </h3>
              <p className="text-xs text-[var(--content-muted)] mb-4">
                {selectedData.testamento} · {selectedData.capitulos} capítulos
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {Object.entries(selectedData.emotions).map(([emotion, value]) => {
                  const colors = EMOTION_COLORS[emotion];
                  return (
                    <div key={emotion} className={cn('rounded-xl p-3', colors.bg)}>
                      <div className="flex items-center gap-1.5 mb-1">
                        <colors.icon className={cn('w-3.5 h-3.5', colors.text)} />
                        <span className={cn('text-xs font-medium capitalize', colors.text)}>{emotion}</span>
                      </div>
                      <div className="h-2 rounded-full bg-[var(--surface-sunken)]/30 overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${value * 100}%`,
                            background: emotion === 'alegria' ? '#eab308' : emotion === 'tristeza' ? '#3b82f6' : emotion === 'raiva' ? '#ef4444' : emotion === 'amor' ? '#ec4899' : emotion === 'medo' ? '#a855f7' : '#22c55e',
                          }}
                        />
                      </div>
                      <span className="text-[10px] text-[var(--content-muted)] mt-1 block">
                        {Math.round(value * 100)}%
                      </span>
                    </div>
                  );
                })}
              </div>
              <a
                href={`/biblia?book=${selectedData.abreviacao}`}
                className="mt-4 flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[var(--brand-default)] text-[var(--brand-contrast)] text-sm font-medium hover:shadow-lg transition-all"
              >
                <BookOpen className="w-4 h-4" />
                Ler {selectedData.livro}
              </a>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
