'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PassageGuideSectionProps {
  title: string;
  icon: React.ReactNode;
  count?: number;
  loading: boolean;
  loaded: boolean;
  defaultOpen?: boolean;
  accentColor?: string;
  children: React.ReactNode;
  onExpand?: () => void;
}

export function PassageGuideSection({
  title,
  icon,
  count,
  loading,
  loaded,
  defaultOpen = false,
  accentColor = 'var(--brand-default)',
  children,
  onExpand,
}: PassageGuideSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const handleToggle = () => {
    const next = !isOpen;
    setIsOpen(next);
    if (next && !loaded && onExpand) {
      onExpand();
    }
  };

  return (
    <div
      className={cn(
        'rounded-xl border transition-all duration-200',
        isOpen
          ? 'border-[var(--border)] bg-[var(--surface-raised)]'
          : 'border-transparent bg-[var(--surface)] hover:bg-[var(--surface-raised)]'
      )}
    >
      <button
        onClick={handleToggle}
        className="w-full flex items-center gap-3 px-4 py-3 text-left"
        aria-expanded={isOpen}
      >
        <span
          className="flex items-center justify-center w-8 h-8 rounded-lg shrink-0"
          style={{ backgroundColor: `color-mix(in srgb, ${accentColor} 15%, transparent)` }}
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" style={{ color: accentColor }} />
          ) : (
            <span style={{ color: accentColor }}>{icon}</span>
          )}
        </span>
        <span className="flex-1 font-medium text-sm text-[var(--content-primary)]">{title}</span>
        {count !== undefined && count > 0 && (
          <span
            className="text-xs px-2 py-0.5 rounded-full font-medium"
            style={{
              backgroundColor: `color-mix(in srgb, ${accentColor} 15%, transparent)`,
              color: accentColor,
            }}
          >
            {count}
          </span>
        )}
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-[var(--content-muted)]" />
        ) : (
          <ChevronDown className="w-4 h-4 text-[var(--content-muted)]" />
        )}
      </button>
      {isOpen && (
        <div className="px-4 pb-4 pt-1">
          {loading && !loaded ? (
            <div className="flex items-center justify-center py-6">
              <div className="flex gap-1.5">
                <span className="w-2 h-2 bg-[var(--brand-default)] rounded-full animate-bounce" />
                <span className="w-2 h-2 bg-[var(--brand-default)] rounded-full animate-bounce [animation-delay:0.15s]" />
                <span className="w-2 h-2 bg-[var(--brand-default)] rounded-full animate-bounce [animation-delay:0.3s]" />
              </div>
            </div>
          ) : (
            children
          )}
        </div>
      )}
    </div>
  );
}
