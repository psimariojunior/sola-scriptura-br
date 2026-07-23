'use client';

import { motion } from 'framer-motion';
import { RefreshCw } from 'lucide-react';
import { usePullToRefresh } from '@/hooks/usePullToRefresh';
import { cn } from '@/lib/utils';

interface PullToRefreshWrapperProps {
  onRefresh: () => Promise<void>;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

export function PullToRefreshWrapper({
  onRefresh,
  children,
  className,
  disabled = false,
}: PullToRefreshWrapperProps) {
  const { state, progress, handlers } = usePullToRefresh({ onRefresh });

  if (disabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div className={cn('relative overflow-hidden', className)} {...handlers}>
      <motion.div
        className="flex items-center justify-center overflow-hidden"
        animate={{
          height: state.pullDistance > 0 ? Math.min(state.pullDistance * 0.5, 60) : 0,
          opacity: state.pullDistance > 0 ? 1 : 0,
        }}
        transition={{ duration: 0 }}
      >
        <motion.div
          animate={{
            rotate: state.isRefreshing ? 360 : progress * 360,
            scale: state.isPastThreshold && !state.isRefreshing ? 1.2 : 1,
          }}
          transition={state.isRefreshing ? { repeat: Infinity, duration: 0.8, ease: 'linear' } : { duration: 0 }}
        >
          <RefreshCw
            className={cn(
              'w-5 h-5 transition-colors',
              state.isPastThreshold ? 'text-[var(--brand)]' : 'text-[var(--content-muted)]'
            )}
          />
        </motion.div>
        {state.isPastThreshold && !state.isRefreshing && (
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xs text-[var(--content-muted)] ml-2"
          >
            Solte para atualizar
          </motion.span>
        )}
        {state.isRefreshing && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs text-[var(--brand)] ml-2"
          >
            Atualizando...
          </motion.span>
        )}
      </motion.div>
      <motion.div
        animate={{
          y: state.pullDistance > 0 ? state.pullDistance * 0.3 : 0,
        }}
        transition={{ duration: 0 }}
      >
        {children}
      </motion.div>
    </div>
  );
}
