'use client';

interface EdgeTTSOptions {
  texto: string;
  voz?: 'feminina' | 'masculina';
  vozCustom?: string;
  rate?: string;
  pitch?: string;
  volume?: string;
  signal?: AbortSignal;
  onProgress?: (bytes: number) => void;
  onStatus?: (msg: string) => void;
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
  const { texto, voz = 'feminina', vozCustom, rate = '+0%', pitch = '+0Hz', volume = '+0%', signal, onProgress, onStatus } = opts;

  const vozFinal = vozCustom || (voz === 'masculina' ? 'pt-BR-AntonioNeural' : 'pt-BR-FranciscaNeural');

  const cached = await getCached(texto, vozFinal);
  if (cached) {
    onStatus?.('Cache hit');
    return cached;
  }

  const res = await fetch('/api/audio/edge', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ texto, voz, vozCustom, rate, pitch, volume }),
    signal,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ erro: 'Erro desconhecido' }));
    throw new Error(err.erro || 'Falha ao gerar áudio');
  }

  const reader = res.body?.getReader();
  if (!reader) throw new Error('Stream não disponível');

  const decoder = new TextDecoder();
  let buffer = '';
  let audioBase64: string | null = null;
  let duracaoMs = 0;
  let totalBytes = 0;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const linhas = buffer.split('\n');
    buffer = linhas.pop() || '';

    for (const linha of linhas) {
      const trimmed = linha.trim();
      if (!trimmed) continue;

      try {
        const evento = JSON.parse(trimmed);

        if (evento.tipo === 'status') {
          onStatus?.(evento.mensagem);
        } else if (evento.tipo === 'progresso') {
          onProgress?.(evento.bytes);
        } else if (evento.tipo === 'audio') {
          audioBase64 = evento.base64;
          totalBytes = evento.bytes;
        } else if (evento.tipo === 'fim') {
          duracaoMs = evento.duracaoMs;
        } else if (evento.tipo === 'erro') {
          throw new Error(evento.mensagem);
        }
      } catch (e: any) {
        if (e?.message?.includes('JSON')) continue;
        throw e;
      }
    }
  }

  if (!audioBase64) {
    throw new Error('Áudio não recebido do servidor');
  }

  const binaryString = atob(audioBase64);
  const audioBuffer = new ArrayBuffer(binaryString.length);
  const view = new Uint8Array(audioBuffer);
  for (let i = 0; i < binaryString.length; i++) {
    view[i] = binaryString.charCodeAt(i);
  }

  if (audioBuffer.byteLength > 1000) {
    setCached(texto, vozFinal, audioBuffer).catch(() => {});
  }

  return audioBuffer;
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
    onStatus?: (msg: string) => void;
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
      onStatus: options?.onStatus,
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
