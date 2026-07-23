'use client';

import { useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface KeyboardShortcut {
  key: string;
  ctrl?: boolean;
  alt?: boolean;
  shift?: boolean;
  action: () => void;
  description: string;
}

export function useKeyboardShortcuts(shortcuts: KeyboardShortcut[]) {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    for (const shortcut of shortcuts) {
      const ctrlMatch = shortcut.ctrl ? (e.ctrlKey || e.metaKey) : true;
      const altMatch = shortcut.alt ? e.altKey : true;
      const shiftMatch = shortcut.shift ? e.shiftKey : true;

      if (e.key === shortcut.key && ctrlMatch && altMatch && shiftMatch) {
        e.preventDefault();
        shortcut.action();
        return;
      }
    }
  }, [shortcuts]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}

export function useGlobalKeyboardNav() {
  const router = useRouter();

  useKeyboardShortcuts([
    { key: 'b', ctrl: true, action: () => router.push('/biblia'), description: 'Abrir Bíblia' },
    { key: 'p', ctrl: true, action: () => router.push('/pesquisa'), description: 'Abrir Pesquisa' },
    { key: 'i', ctrl: true, action: () => router.push('/ia'), description: 'Abrir IA' },
    { key: 'd', ctrl: true, action: () => router.push('/dashboard'), description: 'Abrir Dashboard' },
    { key: 'f', ctrl: true, action: () => router.push('/favoritos'), description: 'Abrir Favoritos' },
    { key: 'n', ctrl: true, action: () => router.push('/notas'), description: 'Abrir Notas' },
    { key: '/', ctrl: true, action: () => {
      window.dispatchEvent(new CustomEvent('ssb:toggle-busca'));
    }, description: 'Abrir Busca' },
  ]);
}

// Focus trap for modals
export function useFocusTrap(ref: React.RefObject<HTMLElement | null>, active: boolean) {
  useEffect(() => {
    if (!active || !ref.current) return;

    const focusableSelectors = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const focusableElements = ref.current.querySelectorAll(focusableSelectors);
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    firstElement?.focus();
    window.addEventListener('keydown', handleTab);
    return () => window.removeEventListener('keydown', handleTab);
  }, [ref, active]);
}

// Skip to main content link - implemented in LayoutWrapper directly
