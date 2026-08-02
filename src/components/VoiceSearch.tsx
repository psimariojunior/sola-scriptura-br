'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Search, X, Volume2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VoiceSearchProps {
  onResult: (query: string) => void;
  onNavigate?: (book: string, chapter: number, verse?: number) => void;
  className?: string;
}

// Mapa de nomes bíblicos em português para abreviações
const BIBLE_BOOK_MAP: Record<string, string> = {
  'gênesis': 'gn', 'genesis': 'gn',
  'êxodo': 'ex', 'exodo': 'ex',
  'levítico': 'lv', 'levitico': 'lv',
  'números': 'nm', 'numeros': 'nm',
  'deuteronômio': 'dt', 'deuteronomio': 'dt',
  'josué': 'js', 'josue': 'js',
  'juízes': 'jz', 'juizes': 'jz',
  'rute': 'rt',
  '1 samuel': '1sm', 'primeiro samuel': '1sm',
  '2 samuel': '2sm', 'segundo samuel': '2sm',
  '1 reis': '1r', 'primeiro reis': '1r',
  '2 reis': '2r', 'segundo reis': '2r',
  '1 crônicas': '1cr', '1 cronias': '1cr', 'primeiro crônicas': '1cr',
  '2 crônicas': '2cr', '2 cronias': '2cr', 'segundo crônicas': '2cr',
  'esdras': 'ed',
  'neemias': 'ne',
  'ester': 'et',
  'jó': 'job', 'job': 'job',
  'salmos': 'sl', 'salmo': 'sl',
  'provérbios': 'pv', 'proverbios': 'pv', 'provérbio': 'pv',
  'eclesiastes': 'ec',
  'cantares': 'ct', 'cantar dos cantares': 'ct',
  'isaías': 'is', 'isaias': 'is',
  'jeremias': 'jr',
  'lamentações': 'lm', 'lamentacoes': 'lm',
  'ezequiel': 'ez',
  'daniel': 'dn',
  'oséias': 'os', 'oseias': 'os',
  'joel': 'jl',
  'amós': 'am', 'amos': 'am',
  'obadias': 'ob',
  'jonas': 'jn',
  'miqéias': 'mq', 'miqueias': 'mq',
  'naum': 'na',
  'habacuque': 'hc',
  'sofonias': 'sf',
  'ageu': 'ag',
  'zacarias': 'zc',
  'malachias': 'mc',
  'mateus': 'mt',
  'marcos': 'mc',
  'lucas': 'lc',
  'joão': 'jo', 'joao': 'jo',
  'atos': 'at',
  'romanos': 'rm',
  '1 coríntios': '1co', 'primeiro coríntios': '1co',
  '2 coríntios': '2co', 'segundo coríntios': '2co',
  'gálatas': 'gl', 'galias': 'gl',
  'efésios': 'ef', 'efesios': 'ef',
  'filipenses': 'fp',
  'colossenses': 'cl',
  '1 tessalonicenses': '1ts', 'primeiro tessalonicenses': '1ts',
  '2 tessalonicenses': '2ts', 'segundo tessalonicenses': '2ts',
  '1 timóteo': '1tm', 'primeiro timóteo': '1tm',
  '2 timóteo': '2tm', 'segundo timóteo': '2tm',
  'tito': 'tt',
  'filemom': 'fm',
  'hebreus': 'hb',
  'tiago': 'tg',
  '1 pedro': '1pe', 'primeiro pedro': '1pe',
  '2 pedro': '2pe', 'segundo pedro': '2pe',
  '1 joão': '1jo', 'primeiro joão': '1jo',
  '2 joão': '2jo', 'segundo joão': '2jo',
  '3 joão': '3jo', 'terceiro joão': '3jo',
  'judas': 'jd',
  'apocalipse': 'ap', 'revelação': 'ap', 'revelacao': 'ap',
};

function parseReference(text: string): { book: string; chapter: number; verse?: number } | null {
  const lower = text.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s\d]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  // Padrão: "livro capitulo:versiculo" ou "livro capitulo"
  const patterns = [
    /^(.+?)\s+(\d+):(\d+)\s*$/,
    /^(.+?)\s+(\d+)\s*$/,
  ];

  for (const pattern of patterns) {
    const match = lower.match(pattern);
    if (match) {
      const bookName = match[1].trim();
      const chapter = parseInt(match[2], 10);
      const verse = match[3] ? parseInt(match[3], 10) : undefined;

      // Buscar abreviação
      for (const [name, abbr] of Object.entries(BIBLE_BOOK_MAP)) {
        const nameNorm = name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
        if (nameNorm === bookName || bookName.startsWith(nameNorm)) {
          return { book: abbr, chapter, verse };
        }
      }
    }
  }

  return null;
}

export function VoiceSearch({ onResult, onNavigate, className }: VoiceSearchProps) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [supported, setSupported] = useState(true);
  const [feedback, setFeedback] = useState('');
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSupported(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'pt-BR';

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const current = event.results[event.results.length - 1];
      const text = current[0].transcript;
      setTranscript(text);

      if (current.isFinal) {
        processVoiceCommand(text);
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
      setFeedback('Erro no reconhecimento de voz');
      setTimeout(() => setFeedback(''), 3000);
    };

    recognitionRef.current = recognition;
  }, []);

  const processVoiceCommand = useCallback((text: string) => {
    const lower = text.toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    // Comandos especiais
    if (lower.includes('limpar') || lower.includes('apagar')) {
      setTranscript('');
      setFeedback('Busca limpa');
      setTimeout(() => setFeedback(''), 2000);
      return;
    }

    // Tentar parsear referência bíblica
    const ref = parseReference(text);
    if (ref && onNavigate) {
      setFeedback(`Navegando para ${text}...`);
      onNavigate(ref.book, ref.chapter, ref.verse);
      setTimeout(() => setFeedback(''), 2000);
      return;
    }

    // Senão, usar como busca
    onResult(text);
    setFeedback(`Buscando: "${text}"`);
    setTimeout(() => setFeedback(''), 2000);
  }, [onResult, onNavigate]);

  const toggleListening = useCallback(() => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setTranscript('');
      recognitionRef.current.start();
      setIsListening(true);
    }
  }, [isListening]);

  if (!supported) return null;

  return (
    <div className={cn('relative', className)}>
      <button
        onClick={toggleListening}
        className={cn(
          'flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-300',
          isListening
            ? 'bg-red-500 text-white shadow-lg shadow-red-500/30 animate-pulse'
            : 'bg-[var(--surface-sunken)] text-[var(--content-secondary)] hover:bg-[var(--brand-subtle)] hover:text-[var(--brand-default)]'
        )}
      >
        {isListening ? (
          <>
            <MicOff className="w-4 h-4" />
            <span className="text-sm font-medium">Ouvindo...</span>
          </>
        ) : (
          <>
            <Mic className="w-4 h-4" />
            <span className="text-sm font-medium">Busca por Voz</span>
          </>
        )}
      </button>

      {/* Transcrição ao vivo */}
      <AnimatePresence>
        {isListening && transcript && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full mt-2 left-0 right-0 z-50 glass-card p-3 rounded-xl border border-[var(--border)]"
          >
            <p className="text-sm text-[var(--content-primary)] font-serif italic">
              &ldquo;{transcript}&rdquo;
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Feedback */}
      <AnimatePresence>
        {feedback && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full mt-2 left-0 right-0 z-50"
          >
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--brand-subtle)] text-[var(--brand-default)] text-xs font-medium">
              <Volume2 className="w-3 h-3" />
              {feedback}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Tipos para SpeechRecognition
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
  isFinal: boolean;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

interface SpeechRecognitionInstance extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onend: (() => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  start(): void;
  stop(): void;
  abort(): void;
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognitionInstance;
    webkitSpeechRecognition: new () => SpeechRecognitionInstance;
  }
}
