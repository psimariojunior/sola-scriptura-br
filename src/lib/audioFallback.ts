'use client';

export interface AudioFallbackOptions {
  texto: string;
  voz?: 'feminina' | 'masculina';
  rate?: number;
  onEnd?: () => void;
  onError?: (error: Error) => void;
}

let edgeTTSFailed = false;

export async function playAudioWithFallback(options: AudioFallbackOptions): Promise<void> {
  const { texto, voz = 'feminina', rate = 1.0, onEnd, onError } = options;

  // Tentar Edge TTS primeiro (se não falhou antes)
  if (!edgeTTSFailed) {
    try {
      const response = await fetch('/api/audio/edge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ texto, voz }),
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const audio = new Audio(url);

        return new Promise((resolve, reject) => {
          audio.onended = () => {
            URL.revokeObjectURL(url);
            onEnd?.();
            resolve();
          };
          audio.onerror = () => {
            URL.revokeObjectURL(url);
            // Fallback to Web Speech API
            playWithWebSpeech(texto, rate, onEnd, onError);
            resolve();
          };
          audio.play().catch(() => {
            URL.revokeObjectURL(url);
            playWithWebSpeech(texto, rate, onEnd, onError);
            resolve();
          });
        });
      } else {
        edgeTTSFailed = true;
        playWithWebSpeech(texto, rate, onEnd, onError);
      }
    } catch {
      edgeTTSFailed = true;
      playWithWebSpeech(texto, rate, onEnd, onError);
    }
  } else {
    playWithWebSpeech(texto, rate, onEnd, onError);
  }
}

function playWithWebSpeech(
  texto: string,
  rate: number,
  onEnd?: () => void,
  onError?: (error: Error) => void
) {
  if (typeof window === 'undefined' || !window.speechSynthesis) {
    onError?.(new Error('Speech synthesis não disponível'));
    return;
  }

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(texto);
  utterance.lang = 'pt-BR';
  utterance.rate = rate;

  // Tentar encontrar voz PT-BR
  const voices = window.speechSynthesis.getVoices();
  const ptBR = voices.find(v => v.lang.startsWith('pt-BR')) || voices.find(v => v.lang.startsWith('pt'));
  if (ptBR) utterance.voice = ptBR;

  utterance.onend = () => onEnd?.();
  utterance.onerror = (e) => onError?.(new Error(`Speech error: ${e.error}`));
  window.speechSynthesis.speak(utterance);
}

export function stopAudio() {
  if (typeof window !== 'undefined') {
    window.speechSynthesis?.cancel();
  }
}

export function preloadVoices() {
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    window.speechSynthesis.getVoices();
  }
}
