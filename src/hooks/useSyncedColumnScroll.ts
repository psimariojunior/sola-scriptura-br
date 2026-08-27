'use client';

import { useCallback, useRef } from 'react';

/**
 * Rolagem ligada entre colunas paralelas: o versículo no topo de uma
 * coluna alinha as demais no mesmo número.
 */
export function useSyncedColumnScroll() {
  const cols = useRef<(HTMLElement | null)[]>([]);
  const syncing = useRef(false);

  const setRef = useCallback((index: number) => (el: HTMLElement | null) => {
    cols.current[index] = el;
  }, []);

  const onScroll = useCallback((sourceIndex: number) => {
    if (syncing.current) return;
    const source = cols.current[sourceIndex];
    if (!source) return;

    const sourceRect = source.getBoundingClientRect();
    const verses = source.querySelectorAll<HTMLElement>('[data-sync-verse]');
    let verseId: string | undefined;
    for (let i = 0; i < verses.length; i++) {
      if (verses[i].getBoundingClientRect().bottom > sourceRect.top + 12) {
        verseId = verses[i].dataset.syncVerse;
        break;
      }
    }
    if (!verseId) return;

    const sourceVerse = source.querySelector<HTMLElement>(`[data-sync-verse="${verseId}"]`);
    if (!sourceVerse) return;
    const offset = sourceVerse.getBoundingClientRect().top - sourceRect.top;

    syncing.current = true;
    cols.current.forEach((col, i) => {
      if (!col || i === sourceIndex) return;
      const destVerse = col.querySelector<HTMLElement>(`[data-sync-verse="${verseId}"]`);
      if (!destVerse) return;
      col.scrollTop += destVerse.getBoundingClientRect().top - col.getBoundingClientRect().top - offset;
    });
    requestAnimationFrame(() => {
      syncing.current = false;
    });
  }, []);

  return { setRef, onScroll };
}
