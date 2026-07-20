'use client';

import { useState, useRef } from 'react';
import { Play, Pause, Check, Filter, Volume2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { listarVozes, type VoiceConfig } from '@/lib/elevenLabs';

interface NarradorSelectorProps {
  selectedVoiceId: string;
  onSelect: (voiceId: string) => void;
  compact?: boolean;
}

type FiltroGenero = 'todos' | 'masculino' | 'feminino';
type FiltroEstilo = 'todos' | 'narrador' | 'dramatico' | 'calmo' | 'energico';

export default function NarradorSelector({
  selectedVoiceId,
  onSelect,
  compact = false,
}: NarradorSelectorProps) {
  const [filtroGenero, setFiltroGenero] = useState<FiltroGenero>('todos');
  const [filtroEstilo, setFiltroEstilo] = useState<FiltroEstilo>('todos');
  const [previewPlaying, setPreviewPlaying] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  const vozes = listarVozes();
  const vozesFiltradas = vozes.filter((v) => {
    if (filtroGenero !== 'todos' && v.genero !== filtroGenero) return false;
    if (filtroEstilo !== 'todos' && v.estilo !== filtroEstilo) return false;
    return true;
  });

  function playPreview(voice: VoiceConfig): void {
    if (!synthRef.current && typeof window !== 'undefined' && window.speechSynthesis) {
      synthRef.current = window.speechSynthesis;
    }

    synthRef.current?.cancel();

    if (previewPlaying === voice.id) {
      setPreviewPlaying(null);
      return;
    }

    const textos: Record<string, string> = {
      calmo: 'O Senhor é o meu pastor; nada me faltará. Deitar-me faz em verdes pastos.',
      dramatico: 'No princípio criou Deus os céus e a terra. E a terra era sem forma e vazia!',
      narrador: 'Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito.',
      energico: 'Aleluia! Cantai ao Senhor um cântico novo! Cantai ao Senhor, ó terra inteira!',
    };

    const texto = textos[voice.estilo] || textos.narrador;

    if (synthRef.current) {
      const utt = new SpeechSynthesisUtterance(texto);
      utt.lang = voice.idioma;
      utt.rate = voice.estilo === 'calmo' ? 0.8 : voice.estilo === 'energico' ? 1.1 : 0.9;

      const voices = synthRef.current.getVoices();
      const matchVoice = voices.find((v) => /Maria|Daniel/i.test(v.name)) || voices.find((v) => v.lang.startsWith('pt'));
      if (matchVoice) utt.voice = matchVoice;

      utt.onend = () => setPreviewPlaying(null);
      utt.onerror = () => setPreviewPlaying(null);

      synthRef.current.speak(utt);
      setPreviewPlaying(voice.id);
    }
  }

  const estiloLabels: Record<string, string> = {
    narrador: 'Narrador',
    dramatico: 'Dramático',
    calmo: 'Calmo',
    energico: 'Energético',
  };

  const generoLabels: Record<string, string> = {
    masculino: 'Masculino',
    feminino: 'Feminino',
  };

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <div className="flex gap-1">
          {vozes.slice(0, 4).map((voz) => (
            <motion.button
              key={voz.id}
              onClick={() => onSelect(voz.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-medium transition-all ${
                selectedVoiceId === voz.id
                  ? 'bg-[var(--primary)] text-white shadow-sm'
                  : 'bg-[var(--accent)] text-[var(--fg)] hover:bg-[var(--accent)]/80'
              }`}
            >
              {voz.nome}
            </motion.button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[var(--card-bg)] rounded-2xl border border-[var(--border)] overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-[var(--border)]/50">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-[var(--fg)]">Narrador</h3>
            <p className="text-[11px] text-[var(--muted-fg)] mt-0.5">Escolha a voz para narração bíblica</p>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`p-2 rounded-lg transition-colors ${
              showFilters ? 'bg-[var(--primary)]/10 text-[var(--primary)]' : 'text-[var(--muted-fg)] hover:bg-[var(--accent)]'
            }`}
          >
            <Filter className="w-4 h-4" />
          </button>
        </div>

        {/* Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="flex gap-4 mt-3">
                <div>
                  <p className="text-[9px] text-[var(--muted-fg)] uppercase tracking-wider mb-1.5 font-semibold">Gênero</p>
                  <div className="flex gap-1">
                    {(['todos', 'masculino', 'feminino'] as FiltroGenero[]).map((g) => (
                      <button
                        key={g}
                        onClick={() => setFiltroGenero(g)}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-medium transition-colors ${
                          filtroGenero === g
                            ? 'bg-[var(--primary)] text-white'
                            : 'bg-[var(--accent)] text-[var(--fg)] hover:bg-[var(--accent)]/80'
                        }`}
                      >
                        {g === 'todos' ? 'Todos' : generoLabels[g]}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-[9px] text-[var(--muted-fg)] uppercase tracking-wider mb-1.5 font-semibold">Estilo</p>
                  <div className="flex gap-1 flex-wrap">
                    {(['todos', 'narrador', 'dramatico', 'calmo', 'energico'] as FiltroEstilo[]).map((e) => (
                      <button
                        key={e}
                        onClick={() => setFiltroEstilo(e)}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-medium transition-colors ${
                          filtroEstilo === e
                            ? 'bg-[var(--primary)] text-white'
                            : 'bg-[var(--accent)] text-[var(--fg)] hover:bg-[var(--accent)]/80'
                        }`}
                      >
                        {e === 'todos' ? 'Todos' : estiloLabels[e]}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Voice Grid */}
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[400px] overflow-y-auto">
        {vozesFiltradas.map((voz) => {
          const isSelected = selectedVoiceId === voz.id;
          const isPreviewing = previewPlaying === voz.id;

          return (
            <motion.div
              key={voz.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`relative p-3 rounded-xl border transition-all cursor-pointer ${
                isSelected
                  ? 'border-[var(--primary)] bg-[var(--primary)]/5 shadow-sm ring-1 ring-[var(--primary)]/20'
                  : 'border-[var(--border)] bg-[var(--bg)] hover:border-[var(--primary)]/30 hover:bg-[var(--primary)]/2'
              }`}
              onClick={() => onSelect(voz.id)}
            >
              {/* Selected check */}
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[var(--primary)] flex items-center justify-center"
                >
                  <Check className="w-3 h-3 text-white" />
                </motion.div>
              )}

              <div className="flex items-start gap-3">
                {/* Avatar */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-sm font-bold ${
                  voz.genero === 'feminino'
                    ? 'bg-gradient-to-br from-pink-100 to-pink-200 text-pink-700 dark:from-pink-900/30 dark:to-pink-800/30 dark:text-pink-300'
                    : 'bg-gradient-to-br from-blue-100 to-blue-200 text-blue-700 dark:from-blue-900/30 dark:to-blue-800/30 dark:text-blue-300'
                }`}>
                  {voz.nome.charAt(0)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-[var(--fg)]">{voz.nome}</p>
                    <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-[var(--accent)] text-[var(--muted-fg)] font-medium">
                      {estiloLabels[voz.estilo]}
                    </span>
                  </div>
                  <p className="text-[11px] text-[var(--muted-fg)] mt-0.5 line-clamp-2">{voz.descricao}</p>

                  {/* Preview button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      playPreview(voz);
                    }}
                    className="mt-2 flex items-center gap-1.5 text-[10px] text-[var(--primary)] hover:text-[var(--primary)]/80 transition-colors"
                  >
                    {isPreviewing ? (
                      <>
                        <Pause className="w-3 h-3" />
                        <span>Pausar preview</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3 h-3" />
                        <span>Ouvir preview</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Voice characteristics */}
              <div className="flex gap-2 mt-2.5">
                <span className="text-[9px] px-2 py-0.5 rounded-full bg-[var(--accent)] text-[var(--muted-fg)]">
                  {generoLabels[voz.genero]}
                </span>
                <span className="text-[9px] px-2 py-0.5 rounded-full bg-[var(--accent)] text-[var(--muted-fg)]">
                  {voz.idioma}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {vozesFiltradas.length === 0 && (
        <div className="px-5 py-8 text-center">
          <Volume2 className="w-8 h-8 text-[var(--border)] mx-auto mb-2" />
          <p className="text-sm text-[var(--muted-fg)]">Nenhuma voz encontrada para este filtro</p>
        </div>
      )}

      {/* Footer info */}
      <div className="px-5 py-3 border-t border-[var(--border)]/50 bg-[var(--bg)]">
        <p className="text-[10px] text-[var(--muted-fg)] text-center">
          Vozes pré-definidas para uso local. Para vozes naturais, configure sua ElevenLabs API key em{' '}
          <span className="font-mono text-[var(--primary)]">Configurações → Áudio</span>
        </p>
      </div>
    </div>
  );
}
