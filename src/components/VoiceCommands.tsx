'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Volume2, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VoiceCommandsProps {
  onCommand: (command: string, args?: string) => void;
  enabled?: boolean;
}

interface VoiceCommand {
  patterns: RegExp[];
  command: string;
  description: string;
}

const COMMANDS: VoiceCommand[] = [
  { patterns: [/abra?\s+(.+)\s+(\d+):(\d+)/i, /abra?\s+(.+)\s+(\d+)/i], command: 'open', description: 'Abrir livro capítulo:verso' },
  { patterns: [/próximo\s+vers[ií]culo/i, /próximo/i], command: 'next-verse', description: 'Próximo versículo' },
  { patterns: [/vers[ií]culo\s+anterior/i, /anterior/i], command: 'prev-verse', description: 'Versículo anterior' },
  { patterns: [/próximo\s+cap[ií]tulo/i], command: 'next-chapter', description: 'Próximo capítulo' },
  { patterns: [/cap[ií]tulo\s+anterior/i], command: 'prev-chapter', description: 'Capítulo anterior' },
  { patterns: [/leia\s+(.+)/i, /leia/i], command: 'read', description: 'Ler versículo em voz alta' },
  { patterns: [/pare\s+ler/i, /pare/i, /sil[eê]ncio/i], command: 'stop-reading', description: 'Parar leitura' },
  { patterns: [/pesquise\s+(.+)/i, /buscar\s+(.+)/i], command: 'search', description: 'Pesquisar termo' },
  { patterns: [/favorito/i, /salve\s+este/i], command: 'favorite', description: 'Favoritar versículo atual' },
  { patterns: [/compartilhe/i, /compartilhar/i], command: 'share', description: 'Compartilhar versículo' },
  { patterns: [/ajuda/i, /comandos/i], command: 'help', description: 'Mostrar comandos disponíveis' },
];

export function VoiceCommands({ onCommand, enabled = true }: VoiceCommandsProps) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [lastCommand, setLastCommand] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [supported, setSupported] = useState(true);
  const recognitionRef = useRef<any>(null);

  const processCommand = useCallback((text: string) => {
    for (const cmd of COMMANDS) {
      for (const pattern of cmd.patterns) {
        const match = text.match(pattern);
        if (match) {
          const args = match.slice(1).join(' ');
          setLastCommand(cmd.description);
          onCommand(cmd.command, args);
          setTimeout(() => setLastCommand(null), 3000);
          return;
        }
      }
    }
    // No command matched - maybe it's a search query
    onCommand('search', text);
  }, [onCommand]);

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSupported(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'pt-BR';

    recognition.onresult = (event: any) => {
      const current = event.resultIndex;
      const result = event.results[current];
      const text = result[0].transcript;
      setTranscript(text);

      if (result.isFinal) {
        processCommand(text.toLowerCase().trim());
      }
    };

    recognition.onerror = (event: any) => {
      if (event.error !== 'no-speech') {
        setError(`Erro: ${event.error}`);
        setTimeout(() => setError(null), 3000);
      }
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.abort();
    };
  }, [processCommand]);

  const toggleListening = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.abort();
      setIsListening(false);
    } else {
      setTranscript('');
      setError(null);
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch {
        setError('Erro ao iniciar reconhecimento de voz');
        setTimeout(() => setError(null), 3000);
      }
    }
  };

  if (!supported) return null;

  return (
    <div className="relative">
      <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={toggleListening}
        className={cn('p-2 rounded-xl transition-all',
          isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-[var(--surface-raised)] text-[var(--content-muted)] hover:text-[var(--content-primary)]')}>
        {isListening ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
      </motion.button>

      <AnimatePresence>
        {(isListening || transcript || lastCommand || error) && (
          <motion.div initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-64 bg-[var(--surface-base)] border border-[var(--border)] rounded-xl shadow-xl p-3 z-50">
            {error && (
              <div className="flex items-center gap-2 text-red-500 text-xs">
                <AlertCircle className="w-3 h-3" /> {error}
              </div>
            )}
            {isListening && !transcript && (
              <div className="flex items-center gap-2 text-[var(--content-muted)] text-xs">
                <Volume2 className="w-3 h-3 animate-pulse" /> Ouvindo...
              </div>
            )}
            {transcript && (
              <div className="text-xs text-[var(--content-primary)] mb-1">&ldquo;{transcript}&rdquo;</div>
            )}
            {lastCommand && (
              <div className="text-[10px] text-[var(--brand)] font-medium">✓ {lastCommand}</div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Text-to-Speech utility
export function speak(text: string, lang = 'pt-BR', rate = 1): Promise<void> {
  return new Promise((resolve) => {
    if (!('speechSynthesis' in window)) { resolve(); return; }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = rate;
    utterance.pitch = 1;
    utterance.onend = () => resolve();
    utterance.onerror = () => resolve();
    window.speechSynthesis.speak(utterance);
  });
}

export function stopSpeaking() {
  if ('speechSynthesis' in window) window.speechSynthesis.cancel();
}
