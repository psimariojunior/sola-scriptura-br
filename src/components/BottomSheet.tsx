'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
  snapPoints?: number[];
  initialSnap?: number;
  showHandle?: boolean;
  showClose?: boolean;
}

export function BottomSheet({
  open,
  onClose,
  title,
  children,
  className,
  snapPoints = [50, 80, 95],
  initialSnap = 0,
  showHandle = true,
  showClose = true,
}: BottomSheetProps) {
  const [currentSnap, setCurrentSnap] = useState(initialSnap);
  const sheetRef = useRef<HTMLDivElement>(null);

  const heightPercent = snapPoints[currentSnap];

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [open]);

  const handleDragEnd = (_: never, info: PanInfo) => {
    const velocity = info.velocity.y;
    const offset = info.offset.y;

    if (velocity < -300 || offset < -100) {
      const nextSnap = Math.min(currentSnap + 1, snapPoints.length - 1);
      setCurrentSnap(nextSnap);
    } else if (velocity > 300 || offset > 100) {
      const prevSnap = Math.max(currentSnap - 1, 0);
      if (prevSnap === 0 && offset > 50) {
        onClose();
      } else {
        setCurrentSnap(prevSnap);
      }
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            ref={sheetRef}
            initial={{ y: '100%' }}
            animate={{ y: `${100 - heightPercent}%` }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            className={cn(
              'fixed bottom-0 left-0 right-0 z-50',
              'bg-[var(--surface)] rounded-t-2xl',
              'shadow-[0_-8px_32px_rgba(0,0,0,0.15)]',
              'max-h-[95vh] overflow-hidden',
              'safe-area-bottom',
              className
            )}
          >
            {showHandle && (
              <div className="flex justify-center pt-3 pb-1">
                <div className="w-10 h-1 rounded-full bg-[var(--content-muted)]/30" />
              </div>
            )}

            {title && (
              <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)]/40">
                <h3 className="font-semibold text-[var(--content-primary)]">{title}</h3>
                {showClose && (
                  <button
                    onClick={onClose}
                    className="p-1.5 rounded-full hover:bg-[var(--surface-raised)] transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            )}

            <div className="overflow-y-auto overscroll-contain" style={{ maxHeight: `${heightPercent - 10}vh` }}>
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export function BottomSheetItem({
  icon,
  label,
  description,
  onClick,
  destructive,
}: {
  icon?: React.ReactNode;
  label: string;
  description?: string;
  onClick: () => void;
  destructive?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full flex items-center gap-3 px-4 py-3 text-left transition-colors',
        'hover:bg-[var(--surface-raised)] active:bg-[var(--surface-raised)]',
        destructive && 'text-[var(--destructive)]'
      )}
    >
      {icon && (
        <div className={cn(
          'w-10 h-10 rounded-xl flex items-center justify-center',
          destructive ? 'bg-[var(--destructive)]/10' : 'bg-[var(--brand)]/10'
        )}>
          {icon}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="font-medium text-sm">{label}</div>
        {description && (
          <div className="text-xs text-[var(--content-muted)] truncate">{description}</div>
        )}
      </div>
    </button>
  );
}

export function BottomSheetGroup({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="py-2">
      {title && (
        <div className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[var(--content-muted)]">
          {title}
        </div>
      )}
      <div className="divide-y divide-[var(--border)]/30">
        {children}
      </div>
    </div>
  );
}
