'use client';

interface EdgeTTSOptions {
  texto: string;
  voz?: 'feminina' | 'masculina';
  vozCustom?: string;
  rate?: string;
  pitch?: string;
  volume?: string;
  signal?: AbortSignal;
}

const CACHE_NAME = 'ssb-edge-tts-cache-v1';

interface CachedAudio {
  buffer: ArrayBuffer;
  voz: string;
  texto: string;
  timestamp: number;
}

async function getCached(texto: string, voz: string): Promise<ArrayBuffer | null> {
  if (typeof window === 'undefined' || !('caches' in window)) return null;
  try {
    const cache = await caches.open(CACHE_NAME);
    const key = `${voz}:${texto}`;
    const res = await cache.match(key);
    if (res) return await res.arrayBuffer();
  } catch {}
  return null;
}

async function setCached(texto: string, voz: string, buffer: ArrayBuffer): Promise<void> {
  if (typeof window === 'undefined' || !('caches' in window)) return;
  try {
    const cache = await caches.open(CACHE_NAME);
    const key = `${voz}:${texto}`;
    await cache.put(key, new Response(buffer, { headers: { 'Content-Type': 'audio/mpeg' } }));
  } catch {}
}

export async function gerarAudioEdge(opts: EdgeTTSOptions): Promise<ArrayBuffer> {
  const { texto, voz = 'feminina', vozCustom, rate = '+0%', pitch = '+0Hz', volume = '+0%', signal } = opts;

  const vozFinal = vozCustom || (voz === 'masculina' ? 'pt-BR-AntonioNeural' : 'pt-BR-FranciscaNeural');

  const cached = await getCached(texto, vozFinal);
  if (cached) return cached;

  const res = await fetch('/api/audio/edge', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ texto, voz, vozCustom, rate, pitch, volume, formato: 'mp3' }),
    signal,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ erro: 'Erro desconhecido' }));
    throw new Error(err.erro || 'Falha ao gerar áudio');
  }

  const buffer = await res.arrayBuffer();

  if (buffer.byteLength > 1000) {
    setCached(texto, vozFinal, buffer).catch(() => {});
  }

  return buffer;
}

export async function tocarComEdge(
  texto: string,
  options?: {
    voz?: 'feminina' | 'masculina';
    vozCustom?: string;
    rate?: string;
    pitch?: string;
    volume?: string;
    onEnd?: () => void;
    onError?: (err: Error) => void;
    audioRef?: React.MutableRefObject<HTMLAudioElement | null>;
  }
): Promise<void> {
  try {
    const buffer = await gerarAudioEdge({
      texto,
      voz: options?.voz,
      vozCustom: options?.vozCustom,
      rate: options?.rate,
      pitch: options?.pitch,
      volume: options?.volume,
    });

    const blob = new Blob([buffer], { type: 'audio/mpeg' });
    const url = URL.createObjectURL(blob);

    let audio: HTMLAudioElement;
    if (options?.audioRef?.current) {
      audio = options.audioRef.current;
      audio.src = url;
    } else {
      audio = new Audio(url);
    }

    audio.onended = () => {
      URL.revokeObjectURL(url);
      options?.onEnd?.();
    };
    audio.onerror = () => {
      URL.revokeObjectURL(url);
      options?.onError?.(new Error('Falha na reprodução'));
    };

    await audio.play();
  } catch (err: any) {
    options?.onError?.(err);
  }
}

export function edgeTTSDisponivel(): boolean {
  return typeof window !== 'undefined';
}
