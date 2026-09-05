import type { ReactNode } from 'react';

export function highlightText(text: string, query: string, mode: string, isExactPhrase: boolean): ReactNode {
  if (!query.trim()) return text;
  
  try {
    let pattern: string;
    
    if (isExactPhrase) {
      pattern = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    } else {
      switch (mode) {
        case 'exact':
          pattern = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          break;
        case 'startsWith':
          pattern = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\S*';
          break;
        case 'regex':
          pattern = query;
          break;
        default:
          const words = query.trim().split(/\s+/).filter(w => w.length > 1);
          pattern = words.map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
      }
    }
    
    const regex = new RegExp(`(${pattern})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, i) =>
      i % 2 === 1
        ? <mark key={i} className="bg-primary/20 text-foreground px-0.5 rounded-sm font-medium">{part}</mark>
        : part
    );
  } catch {
    return text;
  }
}

export const COR_TRADUCAO: Record<string, string> = {
  arc: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300',
  nvi: 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300',
  ara: 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300',
  acf: 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300',
  kjv: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
  web: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300',
};
