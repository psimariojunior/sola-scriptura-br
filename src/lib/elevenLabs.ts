export interface ElevenLabsConfig {
  apiKey: string;
  voiceId: string;
  modelId: string;
  stability: number;
  similarityBoost: number;
  style: number;
  useSpeakerBoost: boolean;
}

export interface VoiceConfig {
  id: string;
  nome: string;
  descricao: string;
  genero: 'masculino' | 'feminino';
  estilo: 'narrador' | 'dramatico' | 'calmo' | 'energico';
  idioma: string;
}

export interface AudioGenerado {
  audio: ArrayBuffer;
  mimeType: string;
  duracaoMs: number;
}

const API_BASE = 'https://api.elevenlabs.io/v1';

const DEFAULT_CONFIG: ElevenLabsConfig = {
  apiKey: '',
  voiceId: '21m00Tcm4TlvDq8ikWAM', // Rachel - default ElevenLabs voice
  modelId: 'eleven_multilingual_v2',
  stability: 0.75,
  similarityBoost: 0.85,
  style: 0.45,
  useSpeakerBoost: true,
};

const VOZES_DISPONIVEIS: VoiceConfig[] = [
  {
    id: '21m00Tcm4TlvDq8ikWAM',
    nome: 'Rachel',
    descricao: 'Narradora natural e acolhedora, ideal para leitura bíblica',
    genero: 'feminino',
    estilo: 'calmo',
    idioma: 'pt-BR',
  },
  {
    id: 'AZnzlk1XvdvUeBnXmlld',
    nome: 'Domi',
    descricao: 'Voz profunda e ressonante para textos solenes',
    genero: 'feminino',
    estilo: 'dramatico',
    idioma: 'pt-BR',
  },
  {
    id: 'EXAVITQu4vr4xnSDxMaL',
    nome: 'Bella',
    descricao: 'Clara e articulada, perfeita para estudo',
    genero: 'feminino',
    estilo: 'narrador',
    idioma: 'pt-BR',
  },
  {
    id: 'ErXwobaYiN019PkySvjV',
    nome: 'Antoni',
    descricao: 'Narrador masculino versátil e confiante',
    genero: 'masculino',
    estilo: 'narrador',
    idioma: 'pt-BR',
  },
  {
    id: 'VR6AewLTigWG4xSOukaG',
    nome: 'Arnold',
    descricao: 'Voz marcante e dramática para passagens impactantes',
    genero: 'masculino',
    estilo: 'dramatico',
    idioma: 'pt-BR',
  },
  {
    id: 'pNInz6obpgDQGcFmaJgB',
    nome: 'Adam',
    descricao: 'Calmo e sereno, ideal para meditação e devotionais',
    genero: 'masculino',
    estilo: 'calmo',
    idioma: 'pt-BR',
  },
  {
    id: 'yoZ06aMxZJJ28mfd3POQ',
    nome: 'Sam',
    descricao: 'Energético e claro, bom para narrativas dinâmicas',
    genero: 'masculino',
    estilo: 'energico',
    idioma: 'pt-BR',
  },
  {
    id: 'LcfcDJNUP1GQjkzn1xUU',
    nome: 'Elli',
    descricao: 'Jovem e acessível, leitura leve e natural',
    genero: 'feminino',
    estilo: 'energico',
    idioma: 'pt-BR',
  },
];

let rateLimitQueue: Array<{ resolve: () => void; reject: (err: Error) => void }> = [];
let lastRequestTime = 0;
let isProcessingQueue = false;

const MIN_REQUEST_INTERVAL_MS = 200;

async function processRateLimitQueue(): Promise<void> {
  if (isProcessingQueue) return;
  isProcessingQueue = true;

  while (rateLimitQueue.length > 0) {
    const now = Date.now();
    const timeSinceLastRequest = now - lastRequestTime;

    if (timeSinceLastRequest < MIN_REQUEST_INTERVAL_MS) {
      await new Promise((r) =>
        setTimeout(r, MIN_REQUEST_INTERVAL_MS - timeSinceLastRequest)
      );
    }

    const next = rateLimitQueue.shift();
    if (next) {
      lastRequestTime = Date.now();
      next.resolve();
    }
  }

  isProcessingQueue = false;
}

function queueRequest(): Promise<void> {
  return new Promise((resolve, reject) => {
    rateLimitQueue.push({ resolve, reject });
    processRateLimitQueue().catch(() => {});
  });
}

const DB_NAME = 'sola-scriptura-audio-cache';
const DB_VERSION = 1;
const STORE_NAME = 'audio-cache';

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === 'undefined') {
      reject(new Error('IndexedDB not available'));
      return;
    }
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'key' });
        store.createIndex('createdAt', 'createdAt', { unique: false });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function salvarNoCache(
  chave: string,
  audio: ArrayBuffer,
  mimeType: string
): Promise<void> {
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    store.put({
      key: chave,
      audio: audio.slice(0),
      mimeType,
      createdAt: Date.now(),
    });
    return new Promise((resolve, reject) => {
      tx.oncomplete = () => { db.close(); resolve(); };
      tx.onerror = () => { db.close(); reject(tx.error); };
    });
  } catch {
    // Silent fail for cache operations
  }
}

async function obterDoCache(chave: string): Promise<ArrayBuffer | null> {
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    const request = store.get(chave);
    return new Promise((resolve, reject) => {
      request.onsuccess = () => {
        db.close();
        resolve(request.result ? request.result.audio : null);
      };
      request.onerror = () => { db.close(); reject(request.error); };
    });
  } catch {
    return null;
  }
}

function getConfig(
  partial?: Partial<ElevenLabsConfig>
): ElevenLabsConfig {
  const envKey = process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY || '';
  const saved =
    typeof window !== 'undefined'
      ? localStorage.getItem('elevenlabs-config')
      : null;
  const savedConfig = saved ? (() => { try { return JSON.parse(saved); } catch { return {}; } })() : {};
  const apiKey = envKey || savedConfig.apiKey || '';
  return { ...DEFAULT_CONFIG, ...savedConfig, ...partial, apiKey };
}

export function obterConfigAudio(): ElevenLabsConfig {
  return getConfig();
}

export function salvarConfigAudio(config: Partial<ElevenLabsConfig>): void {
  const current = getConfig();
  const merged = { ...current, ...config };
  localStorage.setItem('elevenlabs-config', JSON.stringify(merged));
}

export function listarVozes(): VoiceConfig[] {
  return VOZES_DISPONIVEIS;
}

export function obterVozPorId(id: string): VoiceConfig | undefined {
  return VOZES_DISPONIVEIS.find((v) => v.id === id);
}

export function temApiKey(): boolean {
  const config = getConfig();
  return !!config.apiKey;
}

export async function gerarAudio(
  texto: string,
  config?: Partial<ElevenLabsConfig>,
  retries: number = 0,
  maxRetries: number = 3
): Promise<AudioGenerado> {
  const cfg = getConfig(config);

  if (!cfg.apiKey) {
    throw new Error('NO_API_KEY');
  }

  const cacheKey = `el_${cfg.voiceId}_${cfg.modelId}_${hashCode(texto)}`;
  const cached = await obterDoCache(cacheKey);
  if (cached) {
    return {
      audio: cached,
      mimeType: 'audio/mpeg',
      duracaoMs: estimarDuracao(texto),
    };
  }

  await queueRequest();

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 60000);

  try {
    const response = await fetch(
      `${API_BASE}/text-to-speech/${cfg.voiceId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'xi-api-key': cfg.apiKey,
        },
        body: JSON.stringify({
          text: prepararTextoParaTTS(texto),
          model_id: cfg.modelId,
          voice_settings: {
            stability: cfg.stability,
            similarity_boost: cfg.similarityBoost,
            style: cfg.style,
            use_speaker_boost: cfg.useSpeakerBoost,
          },
        }),
        signal: controller.signal,
      }
    );

    clearTimeout(timeoutId);

    if (response.status === 429) {
      if (retries >= maxRetries) {
        throw new Error(`ElevenLabs API error 429: rate limited after ${maxRetries} retries`);
      }
      const retryAfter = response.headers.get('retry-after');
      const waitTime = retryAfter ? parseInt(retryAfter) * 1000 : 5000;
      await new Promise((r) => setTimeout(r, waitTime));
      return gerarAudio(texto, config, retries + 1, maxRetries);
    }

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(
        `ElevenLabs API error ${response.status}: ${errorBody}`
      );
    }

    const buffer = await response.arrayBuffer();
    await salvarNoCache(cacheKey, buffer, 'audio/mpeg');

    return {
      audio: buffer,
      mimeType: 'audio/mpeg',
      duracaoMs: estimarDuracao(texto),
    };
  } catch (err) {
    clearTimeout(timeoutId);
    throw err;
  }
}

export async function* gerarAudioStreaming(
  texto: string,
  config?: Partial<ElevenLabsConfig>
): AsyncGenerator<ArrayBuffer, void, unknown> {
  const cfg = getConfig(config);

  if (!cfg.apiKey) {
    throw new Error('NO_API_KEY');
  }

  await queueRequest();

  const response = await fetch(
    `${API_BASE}/text-to-speech/${cfg.voiceId}/stream`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'xi-api-key': cfg.apiKey,
      },
      body: JSON.stringify({
        text: prepararTextoParaTTS(texto),
        model_id: cfg.modelId,
        voice_settings: {
          stability: cfg.stability,
          similarity_boost: cfg.similarityBoost,
          style: cfg.style,
          use_speaker_boost: cfg.useSpeakerBoost,
        },
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`ElevenLabs API error: ${response.status}`);
  }

  const reader = response.body?.getReader();
  if (!reader) throw new Error('No response body');

  const decoder = new TextDecoder();
  const chunks: ArrayBuffer[] = [];

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value.buffer);
    yield value.buffer;
  }
}

export async function converterAudioParaBlob(
  audio: AudioGenerado
): Promise<Blob> {
  return new Blob([audio.audio], { type: audio.mimeType });
}

export async function converterAudioParaUrl(
  audio: AudioGenerado
): Promise<string> {
  const blob = await converterAudioParaBlob(audio);
  return URL.createObjectURL(blob);
}

export function estimarDuracao(texto: string): number {
  const palavras = texto.split(/\s+/).length;
  const palavrasPorMinuto = 140;
  return Math.ceil((palavras / palavrasPorMinuto) * 60 * 1000);
}

export function prepararTextoParaTTS(texto: string): string {
  return texto
    .replace(/([:;!?])\s*/g, '$1 ')
    .replace(/\.\.\./g, '…')
    .replace(/[""]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function hashCode(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return Math.abs(hash).toString(36);
}

export async function limparCacheAudio(): Promise<void> {
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    tx.objectStore(STORE_NAME).clear();
    return new Promise((resolve, reject) => {
      tx.oncomplete = () => { db.close(); resolve(); };
      tx.onerror = () => { db.close(); reject(tx.error); };
    });
  } catch {
    // Silent fail
  }
}

export async function tamanhoCacheAudio(): Promise<number> {
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readonly');
    const request = tx.objectStore(STORE_NAME).count();
    return new Promise((resolve, reject) => {
      request.onsuccess = () => { db.close(); resolve(request.result); };
      request.onerror = () => { db.close(); reject(request.error); };
    });
  } catch {
    return 0;
  }
}

export async function removerCacheAntigo(maxAgeMs: number): Promise<void> {
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const index = store.index('createdAt');
    const cutoff = Date.now() - maxAgeMs;
    const range = IDBKeyRange.upperBound(cutoff);
    const request = index.openCursor(range);

    request.onsuccess = () => {
      const cursor = request.result;
      if (cursor) {
        cursor.delete();
        cursor.continue();
      }
    };

    return new Promise((resolve, reject) => {
      tx.oncomplete = () => { db.close(); resolve(); };
      tx.onerror = () => { db.close(); reject(tx.error); };
    });
  } catch {
    // Silent fail
  }
}
