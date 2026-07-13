'use client';

import { useEffect, useRef } from 'react';
import { comboMatches, type HotkeyDefinition } from '@/lib/hotkeys';

export type HotkeyHandler = (e: KeyboardEvent) => void;

interface UseHotkeysOptions {
  enabled?: boolean;
  preventDefault?: boolean;
}

const DEFAULT_INPUT_TAGS = new Set(['INPUT', 'TEXTAREA', 'SELECT']);

function isEditableTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  if (DEFAULT_INPUT_TAGS.has(target.tagName)) return true;
  if (target.isContentEditable) return true;
  return false;
}

export function useHotkeys(
  hotkeys: HotkeyDefinition[],
  handlers: Record<string, HotkeyHandler>,
  options: UseHotkeysOptions = {}
) {
  const { enabled = true, preventDefault = true } = options;
  const handlersRef = useRef(handlers);
  handlersRef.current = handlers;

  useEffect(() => {
    if (!enabled) return;

    const onKey = (e: KeyboardEvent) => {
      const inEditable = isEditableTarget(e.target);

      for (const hk of hotkeys) {
        if (!comboMatches(hk.combo, e)) continue;

        if (inEditable && hk.id !== 'shortcuts' && hk.id !== 'shortcuts-alt' && hk.id !== 'fechar') {
          continue;
        }

        const handler = handlersRef.current[hk.id];
        if (handler) {
          if (preventDefault && hk.preventDefault !== false) {
            e.preventDefault();
          }
          handler(e);
          return;
        }
      }
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [hotkeys, enabled, preventDefault]);
}
