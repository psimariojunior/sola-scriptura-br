'use client';

import { motion, AnimatePresence } from 'framer-motion';
import type { Target, TargetAndTransition, Transition } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

type TransitionType = 'content' | 'modal' | 'tab';

interface TransitionConfig {
  initial: Target;
  animate: TargetAndTransition;
  exit: TargetAndTransition;
}

const transitions: Record<TransitionType, TransitionConfig> = {
  content: {
    initial: { opacity: 0, y: 20, filter: 'blur(4px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
    exit: { opacity: 0, y: -10, filter: 'blur(2px)' },
  },
  modal: {
    initial: { opacity: 0, scale: 0.95, filter: 'blur(4px)' },
    animate: { opacity: 1, scale: 1, filter: 'blur(0px)' },
    exit: { opacity: 0, scale: 0.97, filter: 'blur(2px)' },
  },
  tab: {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -30 },
  },
};

const modalRoutes = ['/auth', '/compartilhar'];
const tabGroups: Record<string, string[]> = {
  '/ferramentas': ['/ferramentas/concordancia', '/ferramentas/critica-textual', '/ferramentas/introducoes'],
  '/estudos': ['/estudos/genesis', '/estudos/romanos', '/estudos/joao'],
};

function resolveTransitionType(pathname: string, prevPathname: string | null): TransitionType {
  if (modalRoutes.some(r => pathname.startsWith(r) || prevPathname?.startsWith(r))) {
    return 'modal';
  }
  for (const [group, routes] of Object.entries(tabGroups)) {
    if (routes.includes(pathname) && routes.includes(prevPathname ?? '')) {
      return 'tab';
    }
  }
  return 'content';
}

interface PageTransitionProps {
  children: ReactNode;
  type?: TransitionType;
}

export default function PageTransition({ children, type }: PageTransitionProps) {
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [resolvedType, setResolvedType] = useState<TransitionType>(type ?? 'content');

  useEffect(() => {
    if (prevPathname && !type) {
      setResolvedType(resolveTransitionType(pathname, prevPathname));
    }
    setPrevPathname(pathname);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname, prevPathname, type]);

  const currentType = type ?? resolvedType;
  const config = transitions[currentType];

  return (
    <>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={pathname}
          initial={config.initial}
          animate={config.animate}
          exit={config.exit}
          className="min-h-screen"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
}

interface TabTransitionProps {
  children: ReactNode;
  activeKey: string;
  direction?: 'left' | 'right';
}

export function TabTransition({ children, activeKey, direction = 'right' }: TabTransitionProps) {
  const initial = direction === 'right'
    ? { opacity: 0, x: 30 }
    : { opacity: 0, x: -30 };
  const exit = direction === 'right'
    ? { opacity: 0, x: -30 }
    : { opacity: 0, x: 30 };

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={activeKey}
        initial={initial}
        animate={{ opacity: 1, x: 0, transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] } }}
        exit={{ ...exit, transition: { duration: 0.2, ease: [0.55, 0.06, 0.68, 0.19] } }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

interface ModalTransitionProps {
  children: ReactNode;
  open: boolean;
  onClose?: () => void;
}

export function ModalTransition({ children, open, onClose }: ModalTransitionProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="pointer-events-auto w-full max-w-lg rounded-2xl bg-background border border-border/50 shadow-2xl overflow-hidden"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] } }}
              exit={{ scale: 0.95, opacity: 0, y: 10, transition: { duration: 0.2, ease: [0.55, 0.06, 0.68, 0.19] } }}
            >
              {children}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

interface LoadingOverlayProps {
  show: boolean;
  message?: string;
}

export function LoadingOverlay({ show, message }: LoadingOverlayProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-background/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <motion.div
            className="flex flex-col items-center gap-4"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            >
              <Loader2 className="w-8 h-8 text-primary" />
            </motion.div>
            {message && (
              <motion.p
                className="text-sm text-muted-foreground"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                {message}
              </motion.p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
