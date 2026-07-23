'use client';

import { cn } from '@/lib/utils';

interface RoomTheme {
  id: string;
  name: string;
  background: string;
  surface: string;
  accent: string;
  text: string;
  border: string;
}

export const ROOM_THEMES: RoomTheme[] = [
  {
    id: 'default',
    name: 'Padrão',
    background: 'bg-[var(--background)]',
    surface: 'bg-[var(--surface-raised)]',
    accent: 'text-[var(--brand)]',
    text: 'text-[var(--content-primary)]',
    border: 'border-[var(--border)]',
  },
  {
    id: 'midnight',
    name: 'Meia-noite',
    background: 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900',
    surface: 'bg-slate-800/80',
    accent: 'text-blue-400',
    text: 'text-slate-100',
    border: 'border-slate-700',
  },
  {
    id: 'forest',
    name: 'Floresta',
    background: 'bg-gradient-to-br from-green-900 via-emerald-800 to-green-900',
    surface: 'bg-emerald-900/80',
    accent: 'text-emerald-400',
    text: 'text-emerald-50',
    border: 'border-emerald-700',
  },
  {
    id: 'sunset',
    name: 'Pôr do sol',
    background: 'bg-gradient-to-br from-orange-900 via-rose-800 to-purple-900',
    surface: 'bg-rose-900/60',
    accent: 'text-orange-400',
    text: 'text-orange-50',
    border: 'border-rose-700',
  },
  {
    id: 'golden',
    name: 'Dourado',
    background: 'bg-gradient-to-br from-amber-900 via-yellow-800 to-amber-900',
    surface: 'bg-amber-900/60',
    accent: 'text-yellow-400',
    text: 'text-yellow-50',
    border: 'border-amber-700',
  },
  {
    id: 'ocean',
    name: 'Oceano',
    background: 'bg-gradient-to-br from-cyan-900 via-blue-800 to-cyan-900',
    surface: 'bg-blue-900/60',
    accent: 'text-cyan-400',
    text: 'text-cyan-50',
    border: 'border-blue-700',
  },
  {
    id: 'minimal',
    name: 'Minimalista',
    background: 'bg-white dark:bg-gray-950',
    surface: 'bg-gray-50 dark:bg-gray-900',
    accent: 'text-gray-900 dark:text-gray-100',
    text: 'text-gray-800 dark:text-gray-200',
    border: 'border-gray-200 dark:border-gray-800',
  },
];

interface RoomThemeSelectorProps {
  currentTheme: string;
  onSelect: (themeId: string) => void;
}

export function RoomThemeSelector({ currentTheme, onSelect }: RoomThemeSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-2 p-3">
      {ROOM_THEMES.map(theme => (
        <button
          key={theme.id}
          onClick={() => onSelect(theme.id)}
          className={cn(
            'rounded-xl p-3 text-left transition-all border-2',
            currentTheme === theme.id
              ? 'border-[var(--brand)] ring-2 ring-[var(--brand)]/20'
              : 'border-transparent hover:border-[var(--border)]'
          )}
        >
          <div className={cn('w-full h-8 rounded-lg mb-2', theme.background)} />
          <span className="text-xs font-medium">{theme.name}</span>
        </button>
      ))}
    </div>
  );
}

export function getRoomThemeClasses(themeId: string): RoomTheme {
  return ROOM_THEMES.find(t => t.id === themeId) || ROOM_THEMES[0];
}
