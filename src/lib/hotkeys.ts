import type { LucideIcon } from 'lucide-react';
import {
  Search,
  Sparkles,
  BookOpen,
  Presentation,
  Save,
  HelpCircle,
  X,
} from 'lucide-react';

export type HotkeyScope = 'global' | 'page';

export interface HotkeyDefinition {
  id: string;
  combo: string;
  description: string;
  scope: HotkeyScope;
  icon?: LucideIcon;
  group: string;
  preventDefault?: boolean;
}

export const HOTKEYS: HotkeyDefinition[] = [
  {
    id: 'busca-global',
    combo: 'mod+k',
    description: 'Abrir busca global',
    scope: 'global',
    icon: Search,
    group: 'Navegação',
  },
  {
    id: 'painel-ia',
    combo: 'mod+j',
    description: 'Abrir painel de IA',
    scope: 'global',
    icon: Sparkles,
    group: 'IA',
  },
  {
    id: 'biblia',
    combo: 'mod+b',
    description: 'Ir para a Bíblia',
    scope: 'global',
    icon: BookOpen,
    group: 'Navegação',
  },
  {
    id: 'apresentacao',
    combo: 'mod+p',
    description: 'Modo Apresentação',
    scope: 'page',
    icon: Presentation,
    group: 'Estudo',
  },
  {
    id: 'salvar',
    combo: 'mod+s',
    description: 'Salvar / anotar versículo atual',
    scope: 'page',
    icon: Save,
    group: 'Estudo',
  },
  {
    id: 'shortcuts',
    combo: 'mod+/',
    description: 'Mostrar atalhos de teclado',
    scope: 'global',
    icon: HelpCircle,
    group: 'Ajuda',
  },
  {
    id: 'shortcuts-alt',
    combo: '?',
    description: 'Mostrar atalhos de teclado',
    scope: 'global',
    icon: HelpCircle,
    group: 'Ajuda',
  },
  {
    id: 'fechar',
    combo: 'escape',
    description: 'Fechar painéis e modais',
    scope: 'global',
    icon: X,
    group: 'Navegação',
  },
];

export const HOTKEY_GROUPS: Record<string, HotkeyDefinition[]> = HOTKEYS.reduce(
  (acc, h) => {
    if (!acc[h.group]) acc[h.group] = [];
    acc[h.group].push(h);
    return acc;
  },
  {} as Record<string, HotkeyDefinition[]>
);

export function getHotkeyById(id: string): HotkeyDefinition | undefined {
  return HOTKEYS.find((h) => h.id === id);
}

export function formatHotkey(combo: string): string {
  const isMac = typeof window !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform);
  return combo
    .split('+')
    .map((part) => {
      const p = part.trim().toLowerCase();
      if (p === 'mod') return isMac ? '⌘' : 'Ctrl';
      if (p === 'ctrl') return 'Ctrl';
      if (p === 'shift') return '⇧';
      if (p === 'alt') return isMac ? '⌥' : 'Alt';
      if (p === 'escape') return 'Esc';
      if (p === 'enter') return '↵';
      if (p === 'arrowup') return '↑';
      if (p === 'arrowdown') return '↓';
      if (p === 'arrowleft') return '←';
      if (p === 'arrowright') return '→';
      if (p === '?') return '?';
      if (p.length === 1) return p.toUpperCase();
      return p;
    })
    .join(isMac ? '' : '+');
}

export interface NormalizedCombo {
  key: string;
  meta: boolean;
  ctrl: boolean;
  shift: boolean;
  alt: boolean;
}

export function normalizeEvent(e: KeyboardEvent): NormalizedCombo {
  return {
    key: e.key.toLowerCase(),
    meta: e.metaKey,
    ctrl: e.ctrlKey,
    shift: e.shiftKey,
    alt: e.altKey,
  };
}

export function comboMatches(comboStr: string, e: KeyboardEvent): boolean {
  const parts = comboStr.toLowerCase().split('+').map((p) => p.trim());
  const hasMod = parts.includes('mod') || parts.includes('cmd') || parts.includes('meta');
  const requiresCtrl = parts.includes('ctrl');
  const requiresShift = parts.includes('shift');
  const requiresAlt = parts.includes('alt') || parts.includes('option');
  const keyPart = parts.filter(
    (p) => !['mod', 'cmd', 'meta', 'ctrl', 'shift', 'alt', 'option'].includes(p)
  )[0];

  if (!keyPart) return false;
  if (requiresShift !== e.shiftKey) return false;
  if (requiresAlt !== e.altKey) return false;

  if (hasMod) {
    if (!e.metaKey && !e.ctrlKey) return false;
  } else {
    if (e.metaKey || e.ctrlKey) return false;
    if (requiresCtrl && !e.ctrlKey) return false;
  }

  const eventKey = e.key.toLowerCase();
  if (keyPart === 'escape') return eventKey === 'escape';
  if (keyPart === 'enter') return eventKey === 'enter';
  if (keyPart === '?') return eventKey === '?' || (e.shiftKey && eventKey === '/');
  if (keyPart.length === 1) return eventKey === keyPart;
  return eventKey === keyPart;
}
