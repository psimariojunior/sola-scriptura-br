'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { X, Settings, Play, Pause, SkipBack, SkipForward, Volume2, Moon, Sun, Type, BookOpen, ChevronLeft, ChevronRight, Bookmark, Share2, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { TODOS_LIVROS } from '@/data/biblia/livros';
import { hrefBiblia } from '@/lib/bibliaHref';

interface ImmersiveReaderProps {
  open: boolean;
  onClose: () => void;
  livro?: string;
  capitulo?: number;
  versiculo?: number;
  texto?: string;
  traducao?: string;
}

interface ReaderSettings {
  fontSize: number;
  lineHeight: number;
  fontFamily: string;
  theme: 'dark' | 'sepia' | 'light';
  audioSpeed: number;
  highlightCurrent: boolean;
  scrollSync: boolean;
}

const FONT_FAMILIES = [
  { label: 'Serif', value: 'var(--font-serif-body), Georgia, serif' },
  { label: 'Sans', value: 'var(--font-sans), system-ui, sans-serif' },
  { label: 'Literary', value: 'var(--font-literary), Georgia, serif' },
];

const THEMES = [
  { label: 'Noite', value: 'dark' as const, bg: 'bg-gray-950', text: 'text-gray-100', accent: 'text-amber-400' },
  { label: 'Pergaminho', value: 'sepia' as const, bg: 'bg-amber-50', text: 'text-amber-950', accent: 'text-amber-700' },
  { label: 'Claro', value: 'light' as const, bg: 'bg-white', text: 'text-gray-900', accent: 'text-blue-600' },
];

function nomeLivro(abrev: string): string {
  return TODOS_LIVROS.find((l) => l.abreviacao === abrev)?.nome ?? abrev;
}

export function ImmersiveReader({
  open,
  onClose,
  livro = 'jn',
  capitulo = 3,
  versiculo = 16,
  texto = '',
  traducao = 'ARA',
}: ImmersiveReaderProps) {
  const [settings, setSettings] = useState<ReaderSettings>({
    fontSize: 22,
    lineHeight: 1.8,
    fontFamily: FONT_FAMILIES[0].value,
    theme: 'dark',
    audioSpeed: 1.0,
    highlightCurrent: true,
    scrollSync: true,
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentVerse, setCurrentVerse] = useState(versiculo);
  const [showSettings, setShowSettings] = useState(false);
  const [verses, setVerses] = useState<{ num: number; texto: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Generate verses from text
  useEffect(() => {
    if (texto) {
      const parts = texto.split(/\n\n+/);
      setVerses(parts.map((t, i) => ({ num: i + 1, texto: t.trim() })).filter(v => v.texto));
    }
  }, [texto]);

  // Keyboard shortcuts
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === ' ') { e.preventDefault(); setIsPlaying(p => !p); }
      if (e.key === 'ArrowUp') setSettings(s => ({ ...s, fontSize: Math.min(40, s.fontSize + 2) }));
      if (e.key === 'ArrowDown') setSettings(s => ({ ...s, fontSize: Math.max(14, s.fontSize - 2) }));
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  // Audio playback
  useEffect(() => {
    if (!isPlaying || verses.length === 0) {
      if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
      return;
    }

    const speak = () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(verses[currentVerse - 1]?.texto || '');
        utterance.lang = 'pt-BR';
        utterance.rate = settings.audioSpeed;
        utterance.onend = () => {
          if (currentVerse < verses.length) {
            setCurrentVerse(v => v + 1);
          } else {
            setIsPlaying(false);
          }
        };
        window.speechSynthesis.speak(utterance);
      }
    };
    speak();
    return () => { if ('speechSynthesis' in window) window.speechSynthesis.cancel(); };
  }, [isPlaying, currentVerse, verses, settings.audioSpeed]);

  const themeConfig = THEMES.find(t => t.value === settings.theme) || THEMES[0];

  const content = (
    <div className={cn('flex flex-col h-full transition-colors', themeConfig.bg)}>
      {/* Minimal Header */}
      <div className="shrink-0 flex items-center justify-between px-5 py-3">
        <button onClick={onClose} className="p-2 rounded-full hover:bg-black/10 transition-colors" aria-label="Fechar">
          <X className={cn('w-5 h-5', themeConfig.text)} />
        </button>
        <div className="flex items-center gap-2">
          <span className={cn('text-xs font-medium', themeConfig.text, 'opacity-60')}>
            {nomeLivro(livro)} {capitulo}
          </span>
          <span className={cn('text-[10px] px-2 py-0.5 rounded-full font-bold', themeConfig.accent, 'bg-current/10')}>
            {traducao}
          </span>
        </div>
        <button onClick={() => setShowSettings(!showSettings)} className="p-2 rounded-full hover:bg-black/10 transition-colors" aria-label="Configurações">
          <Settings className={cn('w-5 h-5', themeConfig.text)} />
        </button>
      </div>

      {/* Settings Panel */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="shrink-0 overflow-hidden border-b border-black/10"
          >
            <div className="px-5 py-4 space-y-4">
              {/* Font Size */}
              <div>
                <label className={cn('text-[10px] font-bold uppercase tracking-wider mb-2 block', themeConfig.text, 'opacity-50')}>
                  Tamanho da Fonte
                </label>
                <div className="flex items-center gap-3">
                  <button onClick={() => setSettings(s => ({ ...s, fontSize: Math.max(14, s.fontSize - 2) }))} className={cn('p-1 rounded', themeConfig.text)}>
                    <Type className="w-4 h-4" />
                  </button>
                  <input
                    type="range"
                    min="14"
                    max="40"
                    value={settings.fontSize}
                    onChange={(e) => setSettings(s => ({ ...s, fontSize: parseInt(e.target.value) }))}
                    className="flex-1 accent-amber-500"
                  />
                  <span className={cn('text-xs w-8 text-center', themeConfig.text)}>{settings.fontSize}</span>
                </div>
              </div>

              {/* Line Height */}
              <div>
                <label className={cn('text-[10px] font-bold uppercase tracking-wider mb-2 block', themeConfig.text, 'opacity-50')}>
                  Espaçamento
                </label>
                <input
                  type="range"
                  min="1.2"
                  max="2.5"
                  step="0.1"
                  value={settings.lineHeight}
                  onChange={(e) => setSettings(s => ({ ...s, lineHeight: parseFloat(e.target.value) }))}
                  className="w-full accent-amber-500"
                />
              </div>

              {/* Font Family */}
              <div>
                <label className={cn('text-[10px] font-bold uppercase tracking-wider mb-2 block', themeConfig.text, 'opacity-50')}>
                  Fonte
                </label>
                <div className="flex gap-2">
                  {FONT_FAMILIES.map(font => (
                    <button
                      key={font.value}
                      onClick={() => setSettings(s => ({ ...s, fontFamily: font.value }))}
                      className={cn(
                        'px-3 py-1.5 rounded-lg text-xs transition-all',
                        settings.fontFamily === font.value
                          ? 'bg-amber-500 text-white font-bold'
                          : cn('border', themeConfig.text, 'border-current/20')
                      )}
                    >
                      {font.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Theme */}
              <div>
                <label className={cn('text-[10px] font-bold uppercase tracking-wider mb-2 block', themeConfig.text, 'opacity-50')}>
                  Tema
                </label>
                <div className="flex gap-2">
                  {THEMES.map(theme => (
                    <button
                      key={theme.value}
                      onClick={() => setSettings(s => ({ ...s, theme: theme.value }))}
                      className={cn(
                        'flex-1 py-2 rounded-lg text-xs font-medium transition-all',
                        settings.theme === theme.value
                          ? 'bg-amber-500 text-white'
                          : cn('border', themeConfig.text, 'border-current/20')
                      )}
                    >
                      {theme.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Audio Speed */}
              <div>
                <label className={cn('text-[10px] font-bold uppercase tracking-wider mb-2 block', themeConfig.text, 'opacity-50')}>
                  Velocidade do Áudio
                </label>
                <div className="flex items-center gap-3">
                  <span className={cn('text-xs', themeConfig.text)}>0.5x</span>
                  <input
                    type="range"
                    min="0.5"
                    max="2.0"
                    step="0.1"
                    value={settings.audioSpeed}
                    onChange={(e) => setSettings(s => ({ ...s, audioSpeed: parseFloat(e.target.value) }))}
                    className="flex-1 accent-amber-500"
                  />
                  <span className={cn('text-xs', themeConfig.text)}>2.0x</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content */}
      <div ref={contentRef} className="flex-1 overflow-y-auto px-8 md:px-16 lg:px-24 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Chapter Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1
              className={cn('font-display font-bold', themeConfig.text)}
              style={{ fontSize: settings.fontSize * 1.5 }}
            >
              {nomeLivro(livro)} {capitulo}
            </h1>
            <div className="w-16 h-0.5 mx-auto mt-4 bg-amber-500/40 rounded-full" />
          </motion.div>

          {/* Verses */}
          <div className="space-y-6" style={{ lineHeight: settings.lineHeight }}>
            {verses.map((verse, i) => (
              <motion.p
                key={verse.num}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={cn(
                  'transition-all duration-300',
                  settings.highlightCurrent && currentVerse === verse.num && 'text-amber-500 font-medium',
                  !settings.highlightCurrent && themeConfig.text
                )}
                style={{
                  fontSize: settings.fontSize,
                  fontFamily: settings.fontFamily,
                  scrollMarginTop: '40vh',
                }}
                id={`verse-${verse.num}`}
              >
                <span className={cn(
                  'text-xs font-bold mr-2 align-super',
                  settings.highlightCurrent && currentVerse === verse.num ? 'text-amber-400' : themeConfig.text + ' opacity-30'
                )}>
                  {verse.num}
                </span>
                {verse.texto}
              </motion.p>
            ))}
          </div>

          {/* Spacer */}
          <div className="h-32" />
        </div>
      </div>

      {/* Bottom Controls */}
      <div className={cn('shrink-0 px-5 py-4 border-t', themeConfig.bg, settings.theme === 'dark' ? 'border-white/10' : 'border-black/10')}>
        <div className="max-w-lg mx-auto flex items-center justify-between">
          {/* Audio Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentVerse(v => Math.max(1, v - 1))}
              className={cn('p-2 rounded-full hover:bg-black/10 transition-colors', themeConfig.text)}
              aria-label="Verso anterior"
            >
              <SkipBack className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={cn(
                'p-3 rounded-full transition-all',
                isPlaying ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/30' : cn('bg-black/10', themeConfig.text)
              )}
              aria-label={isPlaying ? 'Pausar' : 'Reproduzir'}
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
            </button>
            <button
              onClick={() => setCurrentVerse(v => Math.min(verses.length, v + 1))}
              className={cn('p-2 rounded-full hover:bg-black/10 transition-colors', themeConfig.text)}
              aria-label="Próximo verso"
            >
              <SkipForward className="w-4 h-4" />
            </button>
          </div>

          {/* Verse indicator */}
          <div className={cn('text-xs font-medium', themeConfig.text, 'opacity-60')}>
            {currentVerse} / {verses.length}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button className={cn('p-2 rounded-full hover:bg-black/10 transition-colors', themeConfig.text)} aria-label="Favoritar">
              <Bookmark className="w-4 h-4" />
            </button>
            <button className={cn('p-2 rounded-full hover:bg-black/10 transition-colors', themeConfig.text)} aria-label="Compartilhar">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50"
        >
          {content}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
