'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Minus } from 'lucide-react';
import { useAI } from '@/hooks/useAI';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const HIDDEN_ROUTES = ['/auth/login', '/auth/cadastro'];

export function AIMiniPainel() {
  const { isOpen, isMinimized, hasUnread, open, expand } = useAI();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const shouldHide =
    !mounted ||
    isOpen ||
    HIDDEN_ROUTES.some((r) => pathname?.startsWith(r));

  if (shouldHide) return null;

  return (
    <AnimatePresence>
      <motion.button
        key="ai-mini"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{ duration: 0.3, type: 'spring', stiffness: 260, damping: 20 }}
        onClick={isMinimized ? expand : open}
        className="fixed left-6 bottom-[calc(60px+env(safe-area-inset-bottom,0px)+16px)] z-[70] w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all group md:left-6 md:bottom-6"
        aria-label="Abrir assistente IA"
        title="Assistente IA (Ctrl+J)"
      >
        {isMinimized ? (
          <Minus className="absolute inset-0 m-auto w-5 h-5" />
        ) : (
          <Sparkles className="absolute inset-0 m-auto w-5 h-5 group-hover:scale-110 transition-transform" />
        )}

        {hasUnread && (
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-amber-500 border-2 border-background" />
          </span>
        )}

        <span className="absolute -top-1 -right-1 hidden group-hover:flex items-center gap-0.5 px-1.5 py-0.5 text-[9px] font-mono rounded-md bg-background border border-border/40 text-foreground/70 shadow-sm whitespace-nowrap">
          <kbd>⌘J</kbd>
        </span>
      </motion.button>
    </AnimatePresence>
  );
}
