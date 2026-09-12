import { isOffline, onOfflineStatusChange } from '@/lib/offlineStorage';

describe('OfflineStorage — exports', () => {
  it('exporta todas as funcoes corretas', async () => {
    const mod = await import('@/lib/offlineStorage');
    expect(typeof mod.getFavoritesOffline).toBe('function');
    expect(typeof mod.saveFavoritesOffline).toBe('function');
    expect(typeof mod.getNotesOffline).toBe('function');
    expect(typeof mod.saveNotesOffline).toBe('function');
    expect(typeof mod.saveChapterOffline).toBe('function');
    expect(typeof mod.getChapterOffline).toBe('function');
    expect(typeof mod.isChapterSavedOffline).toBe('function');
    expect(typeof mod.getOfflineChapterCount).toBe('function');
    expect(typeof mod.getCachedChaptersForBook).toBe('function');
    expect(typeof mod.clearOfflineChapters).toBe('function');
    expect(typeof mod.savePlanProgressOffline).toBe('function');
    expect(typeof mod.getPlanProgressOffline).toBe('function');
    expect(typeof mod.saveSettingOffline).toBe('function');
    expect(typeof mod.getSettingOffline).toBe('function');
    expect(typeof mod.saveCollectionsOffline).toBe('function');
    expect(typeof mod.getCollectionsOffline).toBe('function');
    expect(typeof mod.saveFlashcardsOffline).toBe('function');
    expect(typeof mod.getFlashcardsOffline).toBe('function');
    expect(typeof mod.saveGamificationOffline).toBe('function');
    expect(typeof mod.getGamificationOffline).toBe('function');
    expect(typeof mod.saveMarcasOffline).toBe('function');
    expect(typeof mod.getMarcasOffline).toBe('function');
    expect(typeof mod.isOffline).toBe('function');
    expect(typeof mod.onOfflineStatusChange).toBe('function');
  });
});

describe('OfflineStorage — isOffline', () => {
  it('retorna false quando navigator.onLine e true', () => {
    Object.defineProperty(navigator, 'onLine', { value: true, configurable: true });
    expect(isOffline()).toBe(false);
  });

  it('retorna true quando navigator.onLine e false', () => {
    Object.defineProperty(navigator, 'onLine', { value: false, configurable: true });
    expect(isOffline()).toBe(true);
  });
});

describe('OfflineStorage — onOfflineStatusChange', () => {
  it('retorna funcao de cleanup', () => {
    const cleanup = onOfflineStatusChange(() => {});
    expect(typeof cleanup).toBe('function');
    cleanup();
  });

  it('chama callback com true no evento offline', () => {
    const cb = jest.fn();
    const cleanup = onOfflineStatusChange(cb);

    window.dispatchEvent(new Event('offline'));
    expect(cb).toHaveBeenCalledWith(true);

    cleanup();
  });

  it('chama callback com false no evento online', () => {
    const cb = jest.fn();
    const cleanup = onOfflineStatusChange(cb);

    window.dispatchEvent(new Event('online'));
    expect(cb).toHaveBeenCalledWith(false);

    cleanup();
  });

  it('remove listeners apos cleanup', () => {
    const cb = jest.fn();
    const cleanup = onOfflineStatusChange(cb);

    cleanup();
    window.dispatchEvent(new Event('offline'));
    window.dispatchEvent(new Event('online'));
    expect(cb).not.toHaveBeenCalled();
  });
});

describe('OfflineStorage — getFavoritesOffline (vazio)', () => {
  it('retorna array vazio quando nao ha dados', async () => {
    // Sem IndexedDB mock, deve retornar [] gracefully
    const result = await import('@/lib/offlineStorage').then(m => m.getFavoritesOffline());
    expect(Array.isArray(result)).toBe(true);
  });
});

describe('OfflineStorage — getNotesOffline (vazio)', () => {
  it('retorna array vazio quando nao ha dados', async () => {
    const result = await import('@/lib/offlineStorage').then(m => m.getNotesOffline());
    expect(Array.isArray(result)).toBe(true);
  });
});
