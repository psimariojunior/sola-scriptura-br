'use client';

import { Heart, StickyNote, Search, FileText, BookMarked, Trophy, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

type EmptyStateType = 'favorites' | 'notes' | 'studies' | 'search' | 'collections' | 'quiz' | 'generic';

interface Props {
  type?: EmptyStateType;
  title?: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export function EmptyState({
  type = 'generic',
  title,
  description,
  actionLabel,
  actionHref,
  onAction,
  icon,
}: Props) {
  const { t } = useTranslation();

  const EMPTY_CONFIG: Record<EmptyStateType, { icon: React.ReactNode; title: string; description: string; gradient: string }> = {
    favorites: {
      icon: <Heart className="w-8 h-8" />,
      title: t('emptyState.favoritesTitle'),
      description: t('emptyState.favoritesDescription'),
      gradient: 'from-pink-500/10 to-rose-500/10',
    },
    notes: {
      icon: <StickyNote className="w-8 h-8" />,
      title: t('emptyState.notesTitle'),
      description: t('emptyState.notesDescription'),
      gradient: 'from-amber-500/10 to-yellow-500/10',
    },
    studies: {
      icon: <BookOpen className="w-8 h-8" />,
      title: t('emptyState.studiesTitle'),
      description: t('emptyState.studiesDescription'),
      gradient: 'from-emerald-500/10 to-teal-500/10',
    },
    search: {
      icon: <Search className="w-8 h-8" />,
      title: t('emptyState.searchTitle'),
      description: t('emptyState.searchDescription'),
      gradient: 'from-blue-500/10 to-indigo-500/10',
    },
    collections: {
      icon: <BookMarked className="w-8 h-8" />,
      title: t('emptyState.collectionsTitle'),
      description: t('emptyState.collectionsDescription'),
      gradient: 'from-violet-500/10 to-purple-500/10',
    },
    quiz: {
      icon: <Trophy className="w-8 h-8" />,
      title: t('emptyState.quizTitle'),
      description: t('emptyState.quizDescription'),
      gradient: 'from-orange-500/10 to-amber-500/10',
    },
    generic: {
      icon: <BookOpen className="w-8 h-8" />,
      title: t('emptyState.genericTitle'),
      description: t('emptyState.genericDescription'),
      gradient: 'from-gray-500/10 to-slate-500/10',
    },
  };

  const config = EMPTY_CONFIG[type];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="empty-state-illustration"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
        className={`empty-state-icon bg-gradient-to-br ${config.gradient}`}
      >
        <div className="text-[var(--brand-default)]">
          {icon || config.icon}
        </div>
      </motion.div>

      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="font-display text-xl font-normal text-[var(--content-primary)] mb-2"
      >
        {title || config.title}
      </motion.h3>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-sm text-[var(--content-muted)] max-w-[260px] mb-6"
      >
        {description || config.description}
      </motion.p>

      {(actionHref || onAction) && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {actionHref ? (
            <Link
              href={actionHref}
              className="ssb-hit inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium bg-[var(--brand-default)] text-white shadow-lg shadow-[var(--brand-default)]/20 hover:shadow-xl hover:shadow-[var(--brand-default)]/30 transition-all active:scale-95"
            >
              {actionLabel || t('emptyState.getStarted')}
            </Link>
          ) : (
            <button
              onClick={onAction}
              className="ssb-hit inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium bg-[var(--brand-default)] text-white shadow-lg shadow-[var(--brand-default)]/20 hover:shadow-xl hover:shadow-[var(--brand-default)]/30 transition-all active:scale-95"
            >
              {actionLabel || t('emptyState.getStarted')}
            </button>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}
