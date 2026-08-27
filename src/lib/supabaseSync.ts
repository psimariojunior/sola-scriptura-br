'use client';

import { authService } from './auth';

export type SyncDataType = 'favoritos' | 'notas' | 'colecoes' | 'flashcards' | 'progresso';

interface SyncResult {
  ok: boolean;
  mensagem?: string;
  erro?: string;
  timestamp: number;
}

interface SyncStatus {
  lastSync: number | null;
  pending: string[];
  syncing: boolean;
}

const STORAGE_KEYS: Record<SyncDataType, string> = {
  favoritos: 'ssb_favoritos',
  notas: 'ssb_notas_rich',
  colecoes: 'ssb_colecoes',
  flashcards: 'ssb_flashcards',
  progresso: 'ssb_gamification_tracker',
};

let autoSyncInterval: ReturnType<typeof setInterval> | null = null;

export function getUserId(): string | null {
  try {
    if (typeof window === 'undefined') return null;
    const user = authService.getUsuario();
    if (user?.id) return String(user.id);
    return localStorage.getItem('ssb_user_id');
  } catch (e) {
    console.error('[supabase:get-user-id]', e);
    return null;
  }
}

export function getAuthToken(): string | null {
  try {
    if (typeof window === 'undefined') return null;
    return authService.getAccessToken();
  } catch (e) {
    console.error('[supabase:get-auth-token]', e);
    return null;
  }
}

export function isAuthenticated(): boolean {
  return authService.isAutenticado();
}

export function getLocalData(type: SyncDataType): unknown[] {
  try {
    const key = STORAGE_KEYS[type];
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error('[supabase:get-local-data]', e);
    return [];
  }
}

export function saveLocalData(type: SyncDataType, data: unknown[]): void {
  try {
    const key = STORAGE_KEYS[type];
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) { console.error('[supabase:save-local-data]', e); }
}

export async function pushToCloud(type: SyncDataType): Promise<SyncResult> {
  if (!authService.isAutenticado()) {
    return { ok: false, erro: 'Não autenticado', timestamp: Date.now() };
  }

  try {
    const dados = getLocalData(type);
    const token = getAuthToken();
    const res = await fetch('/api/sync', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ tipo: type, dados }),
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      return { ok: false, erro: body.erro || `HTTP ${res.status}`, timestamp: Date.now() };
    }

    const body = await res.json();
    return { ok: true, mensagem: body.mensagem || 'Enviado', timestamp: Date.now() };
  } catch (err) {
    return {
      ok: false,
      erro: err instanceof Error ? err.message : 'Erro desconhecido',
      timestamp: Date.now(),
    };
  }
}

export async function pullFromCloud(type: SyncDataType): Promise<SyncResult> {
  if (!authService.isAutenticado()) {
    return { ok: false, erro: 'Não autenticado', timestamp: Date.now() };
  }

  try {
    const token = getAuthToken();
    const params = new URLSearchParams({ tipo: type });
    const res = await fetch(`/api/sync?${params.toString()}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      return { ok: false, erro: body.erro || `HTTP ${res.status}`, timestamp: Date.now() };
    }

    const body = await res.json();
    const remoteData: unknown[] = body.dados || [];
    const localData = getLocalData(type);

    const merged = mergeData(localData, remoteData);
    saveLocalData(type, merged);

    return { ok: true, mensagem: body.mensagem || 'Recebido e sincronizado', timestamp: Date.now() };
  } catch (err) {
    return {
      ok: false,
      erro: err instanceof Error ? err.message : 'Erro desconhecido',
      timestamp: Date.now(),
    };
  }
}

function mergeData(local: unknown[], remote: unknown[]): unknown[] {
  const localItems = local.filter(
    (item): item is Record<string, unknown> =>
      typeof item === 'object' && item !== null && 'id' in item
  );
  const remoteItems = remote.filter(
    (item): item is Record<string, unknown> =>
      typeof item === 'object' && item !== null && 'id' in item
  );

  if (localItems.length === 0 && remoteItems.length === 0) return local.length > remote.length ? local : remote;

  const remoteMap = new Map<string, Record<string, unknown>>();
  for (const item of remoteItems) {
    remoteMap.set(String(item.id), item);
  }

  const mergedMap = new Map<string, Record<string, unknown>>();
  for (const [id, item] of remoteMap) {
    mergedMap.set(id, item);
  }

  for (const item of localItems) {
    const id = String(item.id);
    if (!mergedMap.has(id)) {
      mergedMap.set(id, item);
    }
  }

  const withoutId = [
    ...local.filter((item): item is unknown =>
      !(typeof item === 'object' && item !== null && 'id' in item)
    ),
  ];

  return [...Array.from(mergedMap.values()), ...withoutId];
}

export async function syncType(type: SyncDataType): Promise<SyncResult> {
  if (!authService.isAutenticado()) {
    return { ok: false, erro: 'Não autenticado', timestamp: Date.now() };
  }

  try {
    const pullResult = await pullFromCloud(type);
    if (!pullResult.ok) {
      return pullResult;
    }

    const pushResult = await pushToCloud(type);
    return pushResult;
  } catch (err) {
    return {
      ok: false,
      erro: err instanceof Error ? err.message : 'Erro na sincronização',
      timestamp: Date.now(),
    };
  }
}

export async function syncAll(): Promise<SyncResult[]> {
  const results: SyncResult[] = [];
  const types: SyncDataType[] = ['favoritos', 'notas', 'colecoes', 'flashcards', 'progresso'];

  for (const type of types) {
    try {
      const result = await syncType(type);
      results.push(result);
    } catch (e) {
      console.error('[supabase:sync-all-type]', e);
      results.push({ ok: false, erro: 'Erro inesperado', timestamp: Date.now() });
    }
  }

  try {
    localStorage.setItem('ssb_last_sync', String(Date.now()));
  } catch (e) { console.error('[supabase:save-last-sync]', e); }

  return results;
}

export function startAutoSync(intervalMs: number = 5 * 60 * 1000): void {
  stopAutoSync();

  if (!isAuthenticated()) return;

  autoSyncInterval = setInterval(async () => {
    if (!isAuthenticated()) {
      stopAutoSync();
      return;
    }
    await syncAll();
  }, intervalMs);

  const handleOnline = () => {
    if (isAuthenticated()) {
      syncAll();
    }
  };

  window.addEventListener('online', handleOnline);
}

export function stopAutoSync(): void {
  if (autoSyncInterval) {
    clearInterval(autoSyncInterval);
    autoSyncInterval = null;
  }
}

export function onAuthChange(callback: (authed: boolean) => void): () => void {
  const handler = (event: StorageEvent) => {
    if (event.key === 'ssb_token' || event.key === 'ssb_user_id') {
      callback(isAuthenticated());
    }
  };

  window.addEventListener('storage', handler);
  return () => window.removeEventListener('storage', handler);
}

export function getLastSyncTime(): number | null {
  try {
    const raw = localStorage.getItem('ssb_last_sync');
    if (!raw) return null;
    const num = Number(raw);
    return isNaN(num) ? null : num;
  } catch (e) {
    console.error('[supabase:get-last-sync-time]', e);
    return null;
  }
}

export function getSyncStatus(): SyncStatus {
  return {
    lastSync: getLastSyncTime(),
    pending: [],
    syncing: false,
  };
}

export type { SyncResult, SyncStatus };
