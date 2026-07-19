const DB_NAME = 'sola-scriptura-audio-cache-v2';
const DB_VERSION = 2;
const STORE_AUDIO = 'chapter-audio';
const STORE_META = 'cache-meta';

interface CacheMeta {
  key: string;
  livro: string;
  capitulo: number;
  tamanho: number;
  acessadoEm: number;
  criadoEm: number;
}

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === 'undefined') {
      reject(new Error('IndexedDB not available'));
      return;
    }
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_AUDIO)) {
        db.createObjectStore(STORE_AUDIO, { keyPath: 'key' });
      }
      if (!db.objectStoreNames.contains(STORE_META)) {
        const metaStore = db.createObjectStore(STORE_META, { keyPath: 'key' });
        metaStore.createIndex('acessadoEm', 'acessadoEm', { unique: false });
        metaStore.createIndex('livro', 'livro', { unique: false });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function makeKey(livro: string, capitulo: number, source?: string): string {
  return source ? `${livro}_${capitulo}_${source}` : `${livro}_${capitulo}`;
}

export async function salvarAudioCapitulo(
  livro: string,
  capitulo: number,
  audio: ArrayBuffer,
  mimeType: string = 'audio/mpeg',
  source?: string
): Promise<void> {
  const key = makeKey(livro, capitulo, source);
  const db = await openDB();

  try {
    const txMeta = db.transaction(STORE_META, 'readwrite');
    const storeMeta = txMeta.objectStore(STORE_META);
    const meta: CacheMeta = {
      key,
      livro,
      capitulo,
      tamanho: audio.byteLength,
      acessadoEm: Date.now(),
      criadoEm: Date.now(),
    };
    storeMeta.put(meta);

    await new Promise<void>((resolve, reject) => {
      txMeta.oncomplete = () => resolve();
      txMeta.onerror = () => reject(txMeta.error);
    });

    const txAudio = db.transaction(STORE_AUDIO, 'readwrite');
    const storeAudio = txAudio.objectStore(STORE_AUDIO);
    storeAudio.put({ key, audio: audio.slice(0), mimeType });

    await new Promise<void>((resolve, reject) => {
      txAudio.oncomplete = () => { db.close(); resolve(); };
      txAudio.onerror = () => { db.close(); reject(txAudio.error); };
    });
  } catch (err) {
    db.close();
    throw err;
  }
}

export async function obterAudioCapitulo(
  livro: string,
  capitulo: number,
  source?: string
): Promise<{ audio: ArrayBuffer; mimeType: string } | null> {
  const key = makeKey(livro, capitulo, source);
  const db = await openDB();

  try {
    const txMeta = db.transaction(STORE_META, 'readwrite');
    const storeMeta = txMeta.objectStore(STORE_META);
    const getRequest = storeMeta.get(key);

    await new Promise<void>((resolve, reject) => {
      getRequest.onsuccess = () => {
        if (getRequest.result) {
          getRequest.result.acessadoEm = Date.now();
          storeMeta.put(getRequest.result);
        }
        resolve();
      };
      getRequest.onerror = () => reject(getRequest.error);
      txMeta.oncomplete = () => resolve();
      txMeta.onerror = () => reject(txMeta.error);
    });

    const txAudio = db.transaction(STORE_AUDIO, 'readonly');
    const storeAudio = txAudio.objectStore(STORE_AUDIO);
    const audioRequest = storeAudio.get(key);

    const result = await new Promise<{ audio: ArrayBuffer; mimeType: string } | null>((resolve, reject) => {
      audioRequest.onsuccess = () => {
        db.close();
        if (audioRequest.result) {
          resolve({
            audio: audioRequest.result.audio,
            mimeType: audioRequest.result.mimeType,
          });
        } else {
          resolve(null);
        }
      };
      audioRequest.onerror = () => { db.close(); reject(audioRequest.error); };
    });

    return result;
  } catch {
    return null;
  }
}

export async function limparCache(
  maxAgeMs: number = 30 * 24 * 60 * 60 * 1000
): Promise<number> {
  const db = await openDB();
  const cutoff = Date.now() - maxAgeMs;
  let removidos = 0;

  try {
    const txMeta = db.transaction(STORE_META, 'readwrite');
    const storeMeta = txMeta.objectStore(STORE_META);
    const index = storeMeta.index('acessadoEm');
    const range = IDBKeyRange.upperBound(cutoff);
    const cursor = index.openCursor(range);

    const keysToRemove: string[] = [];

    cursor.onsuccess = () => {
      const result = cursor.result;
      if (result) {
        keysToRemove.push(result.value.key);
        result.continue();
      }
    };

    await new Promise<void>((resolve, reject) => {
      txMeta.oncomplete = () => resolve();
      txMeta.onerror = () => reject(txMeta.error);
    });

    if (keysToRemove.length > 0) {
      const txRemove = db.transaction(
        [STORE_META, STORE_AUDIO],
        'readwrite'
      );
      const metaStore = txRemove.objectStore(STORE_META);
      const audioStore = txRemove.objectStore(STORE_AUDIO);

      for (const k of keysToRemove) {
        metaStore.delete(k);
        audioStore.delete(k);
      }
      removidos = keysToRemove.length;

      await new Promise<void>((resolve, reject) => {
        txRemove.oncomplete = () => resolve();
        txRemove.onerror = () => reject(txRemove.error);
      });
    }
  } catch {
    // Silent fail
  }

  db.close();
  return removidos;
}

export async function limparCacheCompleto(): Promise<void> {
  const db = await openDB();
  try {
    const txMeta = db.transaction(STORE_META, 'readwrite');
    txMeta.objectStore(STORE_META).clear();
    const txAudio = db.transaction(STORE_AUDIO, 'readwrite');
    txAudio.objectStore(STORE_AUDIO).clear();

    await new Promise<void>((resolve, reject) => {
      txMeta.oncomplete = () => resolve();
      txMeta.onerror = () => reject(txMeta.error);
    });
  } catch {
    // Silent fail
  }
  db.close();
}

export async function tamanhoCache(): Promise<{
  totalArquivos: number;
  tamanhoTotal: number;
}> {
  const db = await openDB();
  let totalArquivos = 0;
  let tamanhoTotal = 0;

  try {
    const tx = db.transaction(STORE_META, 'readonly');
    const store = tx.objectStore(STORE_META);
    const request = store.getAll();

    await new Promise<void>((resolve, reject) => {
      request.onsuccess = () => {
        const items: CacheMeta[] = request.result || [];
        totalArquivos = items.length;
        tamanhoTotal = items.reduce((sum, item) => sum + item.tamanho, 0);
        resolve();
      };
      request.onerror = () => reject(request.error);
    });
  } catch {
    // Silent fail
  }

  db.close();
  return { totalArquivos, tamanhoTotal };
}

export async function listarCacheCapitulos(): Promise<CacheMeta[]> {
  const db = await openDB();

  try {
    const tx = db.transaction(STORE_META, 'readonly');
    const store = tx.objectStore(STORE_META);
    const request = store.getAll();

    return new Promise<CacheMeta[]>((resolve, reject) => {
      request.onsuccess = () => {
        db.close();
        resolve(request.result || []);
      };
      request.onerror = () => { db.close(); reject(request.error); };
    });
  } catch {
    return [];
  }
}

export async function precarregarProximo(
  livro: string,
  capituloAtual: number,
  totalCapitulos: number,
  gerarFn: (livro: string, cap: number) => Promise<ArrayBuffer>
): Promise<void> {
  const proximoCap = capituloAtual + 1;
  if (proximoCap > totalCapitulos) return;

  const jaCached = await obterAudioCapitulo(livro, proximoCap);
  if (jaCached) return;

  try {
    const audio = await gerarFn(livro, proximoCap);
    await salvarAudioCapitulo(livro, proximoCap, audio);
  } catch {
    // Preload failure is non-critical
  }
}

const versePreloadCache = new Map<string, ArrayBuffer>();

function versePreloadKey(livro: string, capitulo: number, versoIndex: number): string {
  return `${livro}_${capitulo}_v${versoIndex}`;
}

export function obterAudioVersiculoPreCarregado(
  livro: string,
  capitulo: number,
  versoIndex: number
): ArrayBuffer | null {
  return versePreloadCache.get(versePreloadKey(livro, capitulo, versoIndex)) || null;
}

export async function precarregarAudioVersiculos(
  livro: string,
  capitulo: number,
  versiculos: Array<{ numero: number; texto: string }>,
  opts: {
    announceVerseNumbers: boolean;
    motor: string;
    voiceId?: string;
    vozGenero?: string;
    vozCustom?: string;
    rateStr?: string;
  }
): Promise<void> {
  const first3 = versiculos.slice(0, 3);
  if (first3.length === 0) return;

  const run = async () => {
    for (let i = 0; i < first3.length; i++) {
      const v = first3[i];
      const texto = opts.announceVerseNumbers ? `${v.numero}. ${v.texto}` : v.texto;
      const key = versePreloadKey(livro, capitulo, i);

      if (versePreloadCache.has(key)) continue;

      try {
        let buffer: ArrayBuffer | null = null;

        if (opts.motor === 'edge-tts' || opts.motor === 'auto') {
          try {
            const { gerarAudioEdge, edgeTTSDisponivel } = await import('@/lib/edgeTTS');
            if (edgeTTSDisponivel()) {
              buffer = await gerarAudioEdge({
                texto,
                voz: (opts.vozGenero as 'feminina' | 'masculina') || 'feminina',
                vozCustom: opts.vozCustom,
                rate: opts.rateStr || '+0%',
              });
            }
          } catch {}
        }

        if (!buffer && (opts.motor === 'elevenlabs' || opts.motor === 'auto')) {
          try {
            const { gerarAudio, temApiKey } = await import('@/lib/elevenLabs');
            if (temApiKey()) {
              const audio = await gerarAudio(texto, { voiceId: opts.voiceId });
              buffer = audio.audio;
            }
          } catch {}
        }

        if (buffer && buffer.byteLength > 0) {
          versePreloadCache.set(key, buffer);
        }
      } catch {}
    }
  };

  if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
    (window as Window & { requestIdleCallback: (cb: () => void) => void }).requestIdleCallback(run, { timeout: 15000 });
  } else {
    setTimeout(run, 0);
  }
}

export async function evictLRU(keepCount: number): Promise<number> {
  const db = await openDB();
  let removidos = 0;

  try {
    const txMeta = db.transaction(STORE_META, 'readonly');
    const storeMeta = txMeta.objectStore(STORE_META);
    const request = storeMeta.getAll();

    const items: CacheMeta[] = await new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
    });

    if (items.length <= keepCount) {
      db.close();
      return 0;
    }

    items.sort((a, b) => a.acessadoEm - b.acessadoEm);
    const toRemove = items.slice(0, items.length - keepCount);

    const txRemove = db.transaction(
      [STORE_META, STORE_AUDIO],
      'readwrite'
    );
    const metaStore = txRemove.objectStore(STORE_META);
    const audioStore = txRemove.objectStore(STORE_AUDIO);

    for (const item of toRemove) {
      metaStore.delete(item.key);
      audioStore.delete(item.key);
    }
    removidos = toRemove.length;

    await new Promise<void>((resolve, reject) => {
      txRemove.oncomplete = () => resolve();
      txRemove.onerror = () => reject(txRemove.error);
    });
  } catch {
    // Silent fail
  }

  db.close();
  return removidos;
}
