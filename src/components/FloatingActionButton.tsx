'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, BookOpen, StickyNote, Heart, Share2, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface FabAction {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  href?: string;
  color?: string;
}

interface Props {
  /** Extra actions to show based on context */
  extraActions?: FabAction[];
  /** Hide the FAB entirely */
  hidden?: boolean;
}

export function FloatingActionButton({ extraActions = [], hidden = false }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const getContextActions = useCallback((): FabAction[] => {
    const base: FabAction[] = [
      {
        icon: <Search className="w-5 h-5" />,
        label: 'Pesquisar',
        href: '/pesquisa',
      },
      {
        icon: <BookOpen className="w-5 h-5" />,
        label: 'Bíblia',
        href: '/biblia',
      },
      {
        icon: <StickyNote className="w-5 h-5" />,
        label: 'Nota',
        href: '/notas',
      },
    ];

    if (pathname?.startsWith('/biblia')) {
      return [
        {
          icon: <Heart className="w-5 h-5" />,
          label: 'Favoritar',
          onClick: () => {
            document.dispatchEvent(new CustomEvent('fab:favoritize'));
            setIsOpen(false);
          },
        },
        {
          icon: <Share2 className="w-5 h-5" />,
          label: 'Compartilhar',
          onClick: () => {
            document.dispatchEvent(new CustomEvent('fab:share'));
            setIsOpen(false);
          },
        },
        ...extraActions,
      ];
    }

    if (pathname?.startsWith('/notas')) {
      return [
        {
          icon: <StickyNote className="w-5 h-5" />,
          label: 'Nova Nota',
          onClick: () => {
            document.dispatchEvent(new CustomEvent('fab:new-note'));
            setIsOpen(false);
          },
        },
        ...extraActions,
      ];
    }

    return [...base, ...extraActions];
  }, [pathname, extraActions]);

  const actions = getContextActions();

  // Close on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Close on escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKey);
      return () => document.removeEventListener('keydown', handleKey);
    }
  }, [isOpen]);

  if (hidden) return null;

  return (
    <div className="fab-container sm:hidden">
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[-1]"
              onClick={() => setIsOpen(false)}
            />

            {/* Action buttons */}
            {actions.map((action, i) => (
              <motion.div
                key={action.label}
                initial={{ opacity: 0, scale: 0.3, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.3, y: 20 }}
                transition={{
                  delay: i * 0.05,
                  type: 'spring',
                  stiffness: 400,
                  damping: 20,
                }}
                className="flex items-center gap-2"
              >
                <span className="text-xs font-medium text-[var(--content-secondary)] bg-[var(--surface-raised)] px-2 py-1 rounded-lg shadow-sm">
                  {action.label}
                </span>
                {action.href ? (
                  <Link href={action.href} className="fab-action" onClick={() => setIsOpen(false)}>
                    {action.icon}
                  </Link>
                ) : (
                  <button className="fab-action" onClick={action.onClick}>
                    {action.icon}
                  </button>
                )}
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Main FAB */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        className={`fab-main ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Fechar menu' : 'Ações rápidas'}
      >
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
        </motion.div>
      </motion.button>
    </div>
  );
}
