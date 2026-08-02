'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Settings, ChevronLeft, ChevronRight, Moon, Sun, Type, Volume2 } from 'lucide-react';
import { carregarTraducao } from '@/data/biblia/texto/carregar';
import type { LivroData } from '@/data/biblia/texto/carregar';
import { TODOS_LIVROS, type LivroInfo } from '@/data/biblia/livros';
import { useAudioNatural } from '@/hooks/useAudioNatural';
import { useVerseAudio } from '@/hooks/useVerseAudio';
import { cn } from '@/lib/utils';

type Theme = 'dark' | 'light' | 'sepia' | 'parchment';

const THEMES: Record<Theme, { bg: string; text: string; muted: string; accent: string; highlight: string }> = {
  dark:      { bg: '#0a0a0a', text: '#e8e4dd', muted: '#8a8578', accent: '#c9a84c', highlight: 'rgba(201,168,76,0.15)' },
  light:     { bg: '#faf8f5', text: '#2c2416', muted: '#8a8578', accent: '#8b6914', highlight: 'rgba(139,105,20,0.08)' },
  sepia:     { bg: '#f4ecd8', text: '#3d2b1f', muted: '#7a6b5e', accent: '#8b4513', highlight: 'rgba(139,69,19,0.1)' },
  parchment: { bg: '#e8dcc8', text: '#2c1810', muted: '#6b5b4e', accent: '#a0522d', highlight: 'rgba(160,82,45,0.1)' },
};

export default function ImersaoPage() {
  const [livroIdx, setLivroIdx] = useState(42); // João
  const [capitulo, setCapitulo] = useState(0);
  const [versiculoAtual, setVersiculoAtual] = useState(0);
  const [data, setData] = useState<LivroData | null>(null);
  const [theme, setTheme] = useState<Theme>('dark');
  const [fontSize, setFontSize] = useState(22);
  const [showSettings, setShowSettings] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const [autoScroll, setAutoScroll] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const verseRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  const audioNatural = useAudioNatural();
  const audio = useVerseAudio();

  const livro = TODOS_LIVROS[livroIdx];

  useEffect(() => {
    carregarTraducao('nvi').then(d => setData(d));
  }, []);

  const versiculos = (data?.[livro.abreviacao]?.[capitulo] ?? []).map((texto: string, idx: number) => ({ numero: idx + 1, texto }));
  const t = THEMES[theme];

  // Auto-scroll to current verse
  useEffect(() => {
    const el = verseRefs.current.get(versiculoAtual);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [versiculoAtual]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault();
        setVersiculoAtual(v => Math.min(v + 1, versiculos.length - 1));
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        setVersiculoAtual(v => Math.max(v - 1, 0));
      } else if (e.key === 'Escape') {
        setShowSettings(false);
        setShowNav(false);
      } else if (e.key === 'n') {
        setShowNav(n => !n);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [versiculos.length]);

  // Auto-play
  useEffect(() => {
    if (!autoScroll || !isPlaying) return;
    const timer = setTimeout(() => {
      if (versiculoAtual < versiculos.length - 1) {
        setVersiculoAtual(v => v + 1);
      } else {
        setIsPlaying(false);
      }
    }, 4000);
    return () => clearTimeout(timer);
  }, [autoScroll, isPlaying, versiculoAtual, versiculos.length]);

  const handlePlay = useCallback(() => {
    if (isPlaying) {
      setIsPlaying(false);
      return;
    }
    setIsPlaying(true);
    setAutoScroll(true);
  }, [isPlaying]);

  const handlePrevChapter = useCallback(() => {
    if (capitulo > 0) {
      setCapitulo(c => c - 1);
      setVersiculoAtual(0);
    } else if (livroIdx > 0) {
      const prev = TODOS_LIVROS[livroIdx - 1];
      setLivroIdx(i => i - 1);
      setCapitulo(Math.max(0, (prev.totalCapitulos || 1) - 1));
      setVersiculoAtual(0);
    }
  }, [capitulo, livroIdx]);

  const handleNextChapter = useCallback(() => {
    if (capitulo < (livro.totalCapitulos || 1) - 1) {
      setCapitulo(c => c + 1);
      setVersiculoAtual(0);
    } else if (livroIdx < TODOS_LIVROS.length - 1) {
      setLivroIdx(i => i + 1);
      setCapitulo(0);
      setVersiculoAtual(0);
    }
  }, [capitulo, livroIdx, livro.totalCapitulos]);

  const cycleTheme = () => {
    const themes: Theme[] = ['dark', 'sepia', 'parchment', 'light'];
    const idx = themes.indexOf(theme);
    setTheme(themes[(idx + 1) % themes.length]);
  };

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#0a0a0a' }}>
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-amber-200/60 text-sm">Preparando imersão...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="min-h-screen transition-colors duration-700 cursor-default select-none"
      style={{ background: t.bg, color: t.text }}
      onClick={() => { if (!showSettings && !showNav) setShowNav(true); }}
    >
      {/* Top bar — appears on hover/click */}
      <AnimatePresence>
        {showNav && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-0 left-0 right-0 z-50 p-4 flex items-center justify-between"
            style={{ background: `linear-gradient(to bottom, ${t.bg}, transparent)` }}
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setShowNav(false)}
              className="p-2 rounded-full transition-opacity hover:opacity-80"
              style={{ color: t.muted }}
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <span className="text-sm font-medium" style={{ color: t.accent }}>
                {livro.nome} {capitulo + 1}
              </span>
              <span className="text-xs" style={{ color: t.muted }}>
                {versiculoAtual + 1}/{versiculos.length}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={cycleTheme}
                className="p-2 rounded-full transition-opacity hover:opacity-80"
                style={{ color: t.muted }}
                title="Alternar tema"
              >
                {theme === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setShowSettings(s => !s)}
                className="p-2 rounded-full transition-opacity hover:opacity-80"
                style={{ color: t.muted }}
                title="Configurações"
              >
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Settings panel */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="fixed right-4 top-16 z-50 p-4 rounded-2xl backdrop-blur-xl border"
            style={{
              background: `${t.bg}ee`,
              borderColor: `${t.muted}30`,
              minWidth: 200,
            }}
            onClick={e => e.stopPropagation()}
          >
            <div className="space-y-4">
              <div>
                <label className="text-[10px] uppercase tracking-wider font-semibold mb-2 block" style={{ color: t.muted }}>
                  Tamanho do Texto
                </label>
                <div className="flex items-center gap-3">
                  <button onClick={() => setFontSize(s => Math.max(16, s - 2))} style={{ color: t.muted }}>
                    <Type className="w-3 h-3" />
                  </button>
                  <input
                    type="range"
                    min={16}
                    max={36}
                    value={fontSize}
                    onChange={e => setFontSize(Number(e.target.value))}
                    className="flex-1 accent-amber-600"
                  />
                  <button onClick={() => setFontSize(s => Math.min(36, s + 2))} style={{ color: t.muted }}>
                    <Type className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-center text-xs mt-1" style={{ color: t.muted }}>{fontSize}px</p>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-wider font-semibold mb-2 block" style={{ color: t.muted }}>
                  Tema
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {(['dark', 'light', 'sepia', 'parchment'] as Theme[]).map(th => (
                    <button
                      key={th}
                      onClick={() => setTheme(th)}
                      className={cn(
                        'w-8 h-8 rounded-full border-2 transition-all',
                        theme === th ? 'scale-110' : 'opacity-60'
                      )}
                      style={{
                        background: THEMES[th].bg,
                        borderColor: theme === th ? t.accent : 'transparent',
                      }}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-wider font-semibold mb-2 block" style={{ color: t.muted }}>
                  Livro
                </label>
                <select
                  value={livroIdx}
                  onChange={e => { setLivroIdx(Number(e.target.value)); setCapitulo(0); setVersiculoAtual(0); }}
                  className="w-full text-sm rounded-lg p-2 border"
                  style={{ background: `${t.bg}`, color: t.text, borderColor: `${t.muted}30` }}
                >
                  {TODOS_LIVROS.map((l, i) => (
                    <option key={l.abreviacao} value={i}>{l.nome}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-wider font-semibold mb-2 block" style={{ color: t.muted }}>
                  Capítulo
                </label>
                <input
                  type="number"
                  min={1}
                  max={livro.totalCapitulos || 1}
                  value={capitulo + 1}
                  onChange={e => { setCapitulo(Math.max(0, Math.min(Number(e.target.value) - 1, (livro.totalCapitulos || 1) - 1))); setVersiculoAtual(0); }}
                  className="w-full text-sm rounded-lg p-2 border"
                  style={{ background: `${t.bg}`, color: t.text, borderColor: `${t.muted}30` }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main text area */}
      <div className="max-w-2xl mx-auto px-6 py-20 min-h-screen">
        {/* Chapter header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mb-16"
        >
          <p className="text-xs uppercase tracking-[0.3em] font-medium mb-2" style={{ color: t.muted }}>
            {livro.nome}
          </p>
          <h1 className="text-4xl font-serif font-light" style={{ color: t.accent }}>
            {capitulo + 1}
          </h1>
        </motion.div>

        {/* Verses */}
        <div className="space-y-6">
          {versiculos.map((v: { numero: number; texto: string }, i: number) => {
            const isActive = i === versiculoAtual;
            return (
              <div
                key={v.numero}
                ref={el => { if (el) verseRefs.current.set(i, el); }}
                onClick={() => { setVersiculoAtual(i); }}
                className={cn(
                  'relative pl-10 py-3 rounded-xl transition-all duration-500 cursor-pointer',
                  isActive && 'scale-[1.01]'
                )}
                style={{
                  background: isActive ? t.highlight : 'transparent',
                  borderLeft: isActive ? `2px solid ${t.accent}` : '2px solid transparent',
                }}
              >
                <span
                  className="absolute left-3 top-3 text-xs font-semibold tabular-nums"
                  style={{ color: isActive ? t.accent : t.muted }}
                >
                  {v.numero}
                </span>
                <p
                  className="leading-[2] font-serif"
                  style={{ fontSize: `${fontSize}px` }}
                >
                  {v.texto}
                </p>
              </div>
            );
          })}
        </div>

        {/* Chapter nav */}
        <div className="flex items-center justify-between mt-20 pt-8" style={{ borderTop: `1px solid ${t.muted}20` }}>
          <button
            onClick={handlePrevChapter}
            className="flex items-center gap-2 text-sm transition-opacity hover:opacity-80"
            style={{ color: t.muted }}
          >
            <ChevronLeft className="w-4 h-4" />
            Anterior
          </button>
          <button
            onClick={handleNextChapter}
            className="flex items-center gap-2 text-sm transition-opacity hover:opacity-80"
            style={{ color: t.muted }}
          >
            Próximo
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom spacer */}
        <div className="h-20" />
      </div>

      {/* Verse progress indicator */}
      <div className="fixed bottom-0 left-0 right-0 h-0.5" style={{ background: `${t.muted}20` }}>
        <motion.div
          className="h-full"
          style={{ background: t.accent }}
          animate={{ width: `${((versiculoAtual + 1) / Math.max(versiculos.length, 1)) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Play button */}
      <button
        onClick={handlePlay}
        className={cn(
          'fixed bottom-8 right-8 z-50 p-4 rounded-full shadow-2xl transition-all',
          isPlaying ? 'scale-110' : 'hover:scale-105'
        )}
        style={{
          background: isPlaying ? t.accent : `${t.bg}dd`,
          color: isPlaying ? (theme === 'dark' ? '#0a0a0a' : '#fff') : t.accent,
          border: `1px solid ${t.muted}30`,
          backdropFilter: 'blur(10px)',
        }}
      >
        <Volume2 className="w-5 h-5" />
      </button>
    </div>
  );
}
