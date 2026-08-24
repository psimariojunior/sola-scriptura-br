'use client';

import { useRef } from 'react';
import { Search, Command } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface HeaderSearchProps {
  headerSearchValue: string;
  headerSearchFocused: boolean;
  onSearchValueChange: (value: string) => void;
  onFocusChange: (focused: boolean) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function HeaderSearch({
  headerSearchValue,
  headerSearchFocused,
  onSearchValueChange,
  onFocusChange,
  onSubmit,
}: HeaderSearchProps) {
  const { t } = useTranslation();
  const headerSearchRef = useRef<HTMLInputElement>(null);

  return (
    <form
      onSubmit={onSubmit}
      className="hidden lg:block flex-1 max-w-md mx-2 relative"
      role="search"
    >
      <Search
        className={`pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-300 ${
          headerSearchFocused ? 'text-primary' : 'text-muted-foreground/60'
        }`}
        aria-hidden="true"
      />
      <input
        ref={headerSearchRef}
        type="search"
        value={headerSearchValue}
        onChange={(e) => onSearchValueChange(e.target.value)}
        onFocus={() => onFocusChange(true)}
        onBlur={() => onFocusChange(false)}
        placeholder={t('header.searchPlaceholder')}
        aria-label={t('common.search')}
        className="header-search"
      />
      <kbd className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 hidden xl:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground/70 border border-border/40 rounded bg-muted/30">
        <Command className="w-2.5 h-2.5" />K
      </kbd>
    </form>
  );
}
