'use client';

import { saveFavoritesOffline, getFavoritesOffline, saveNotesOffline, getNotesOffline, isOffline } from './offlineStorage';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.solascripturabr.com.br/api/v1';

interface SyncResult {
  success: boolean;
  message: string;
  timestamp: number;
}

function getUserId(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('ssb_user_id');
}

function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('ssb_token');
}

async function apiCall(endpoint: string, method: string = 'GET', body?: unknown): Promise<unknown> {
  const userId = getUserId();
  const token = getAuthToken();

  if (!userId) return null;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token || userId}`,
  };

  const response = await fetch(`${API_URL}/user-data/${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
}

// Sync favorites
export async function syncFavorites(): Promise<SyncResult> {
  try {
    if (isOffline()) {
      return { success: false, message: 'Offline — dados salvos localmente', timestamp: Date.now() };
    }

    const userId = getUserId();
    if (!userId) return { success: false, message: 'Não autenticado', timestamp: Date.now() };

    // Get local favorites
    const localFavorites = await getFavoritesOffline();

    // Try to get server favorites
    try {
      const serverFavorites = await apiCall('favorites');
      if (Array.isArray(serverFavorites) && serverFavorites.length > 0) {
        // Merge: server takes precedence, add local-only items
        const serverIds = new Set(serverFavorites.map((f: any) => f.id));
        const merged = [
          ...serverFavorites,
          ...localFavorites.filter((f: any) => !serverIds.has(f.id)),
        ];
        await saveFavoritesOffline(merged);
        return { success: true, message: 'Favoritos sincronizados', timestamp: Date.now() };
      }
    } catch {}

    // If server fails, just save local
    if (localFavorites.length > 0) {
      await apiCall('favorites', 'POST', { dados: localFavorites });
    }

    return { success: true, message: 'Favoritos sincronizados', timestamp: Date.now() };
  } catch (error) {
    return { success: false, message: `Erro: ${error}`, timestamp: Date.now() };
  }
}

// Sync notes
export async function syncNotes(): Promise<SyncResult> {
  try {
    if (isOffline()) {
      return { success: false, message: 'Offline — dados salvos localmente', timestamp: Date.now() };
    }

    const userId = getUserId();
    if (!userId) return { success: false, message: 'Não autenticado', timestamp: Date.now() };

    const localNotes = await getNotesOffline();

    try {
      const serverNotes = await apiCall('notes');
      if (Array.isArray(serverNotes) && serverNotes.length > 0) {
        const serverIds = new Set(serverNotes.map((n: any) => n.id));
        const merged = [
          ...serverNotes,
          ...localNotes.filter((n: any) => !serverIds.has(n.id)),
        ];
        await saveNotesOffline(merged);
        return { success: true, message: 'Notas sincronizadas', timestamp: Date.now() };
      }
    } catch {}

    if (localNotes.length > 0) {
      await apiCall('notes', 'POST', { dados: localNotes });
    }

    return { success: true, message: 'Notas sincronizadas', timestamp: Date.now() };
  } catch (error) {
    return { success: false, message: `Erro: ${error}`, timestamp: Date.now() };
  }
}

// Sync all data
export async function syncAll(): Promise<SyncResult[]> {
  const results = await Promise.all([
    syncFavorites(),
    syncNotes(),
  ]);
  return results;
}

// Auto-sync on interval
let syncInterval: ReturnType<typeof setInterval> | null = null;

export function startAutoSync(intervalMs: number = 300000): void { // 5 minutes default
  if (syncInterval) clearInterval(syncInterval);
  syncInterval = setInterval(async () => {
    if (!isOffline()) {
      await syncAll();
    }
  }, intervalMs);
}

export function stopAutoSync(): void {
  if (syncInterval) {
    clearInterval(syncInterval);
    syncInterval = null;
  }
}
