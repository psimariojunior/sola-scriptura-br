'use client';

import { useState, useCallback, useRef, useEffect } from 'react';

interface UseVoiceSearchOptions {
  lang?: string;
  debounceMs?: number;
  maxSilenceMs?: number;
  onResult?: (transcript: string) => void;
}

interface UseVoiceSearchReturn {
  isListening: boolean;
  transcript: string;
  isSupported: boolean;
  error: string | null;
  startListening: () => void;
  stopListening: () => void;
}

export function useVoiceSearch(options: UseVoiceSearchOptions = {}): UseVoiceSearchReturn {
  const {
    lang = 'pt-BR',
    debounceMs = 500,
    maxSilenceMs = 10000,
    onResult,
  } = options;

  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const silenceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const isSupported = typeof window !== 'undefined' && (
    'SpeechRecognition' in window || 'webkitSpeechRecognition' in window
  );

  const clearTimers = useCallback(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
      debounceTimerRef.current = null;
    }
    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = null;
    }
  }, []);

  const stopListening = useCallback(() => {
    clearTimers();
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch {}
      recognitionRef.current = null;
    }
    setIsListening(false);
  }, [clearTimers]);

  const startListening = useCallback(() => {
    if (!isSupported) {
      setError('Reconhecimento de voz não suportado neste navegador.');
      return;
    }

    setError(null);
    setTranscript('');

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;

    recognition.lang = lang;
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = () => {
      setIsListening(true);
      silenceTimerRef.current = setTimeout(() => {
        stopListening();
      }, maxSilenceMs);
    };

    recognition.onresult = (event: any) => {
      if (silenceTimerRef.current) {
        clearTimeout(silenceTimerRef.current);
      }
      silenceTimerRef.current = setTimeout(() => {
        stopListening();
      }, maxSilenceMs);

      let finalTranscript = '';
      let interimTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          finalTranscript += result[0].transcript;
        } else {
          interimTranscript += result[0].transcript;
        }
      }

      const newTranscript = finalTranscript || interimTranscript;
      setTranscript(newTranscript);

      if (finalTranscript) {
        if (debounceTimerRef.current) {
          clearTimeout(debounceTimerRef.current);
        }
        debounceTimerRef.current = setTimeout(() => {
          onResult?.(finalTranscript.trim());
        }, debounceMs);
      }
    };

    recognition.onerror = (event: any) => {
      if (event.error === 'not-allowed') {
        setError('Permissão de microfone negada. Permita o acesso nas configurações do navegador.');
      } else if (event.error === 'no-speech') {
        setError('Nenhuma fala detectada. Tente novamente.');
      } else {
        setError(`Erro no reconhecimento: ${event.error}`);
      }
      stopListening();
    };

    recognition.onend = () => {
      setIsListening(false);
      if (recognitionRef.current) {
        recognitionRef.current = null;
      }
    };

    try {
      recognition.start();
    } catch (e) {
      setError('Erro ao iniciar reconhecimento de voz.');
      stopListening();
    }
  }, [isSupported, lang, debounceMs, maxSilenceMs, onResult, stopListening]);

  useEffect(() => {
    return () => {
      stopListening();
    };
  }, [stopListening]);

  return {
    isListening,
    transcript,
    isSupported,
    error,
    startListening,
    stopListening,
  };
}
