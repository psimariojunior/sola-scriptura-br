'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, MessageCircle, Headphones, FileText, LayoutGrid, Type } from 'lucide-react';

const shimmerGradient = 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%)';

/* ─── PageLoader ─── */
interface PageLoaderProps {
  show?: boolean;
  message?: string;
}

export function PageLoader({ show = true, message }: PageLoaderProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/95 backdrop-blur-sm gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div className="relative" animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
            <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center">
              <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}>
                <BookOpen className="w-10 h-10 text-primary" strokeWidth={1.5} />
              </motion.div>
            </div>
            <motion.div
              className="absolute -inset-3 rounded-3xl border-2 border-primary/20"
              animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>

          <div className="flex flex-col items-center gap-3">
            <div className="flex gap-1.5">
              {[0, 1, 2].map(i => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full bg-primary"
                  animate={{ y: [0, -8, 0], opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
                />
              ))}
            </div>
            {message && (
              <motion.p
                className="text-sm text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {message}
              </motion.p>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── ContentLoader ─── */
interface ContentLoaderProps {
  lines?: number;
  className?: string;
}

export function ContentLoader({ lines = 6, className = '' }: ContentLoaderProps) {
  return (
    <div className={`space-y-4 ${className}`} role="status" aria-label="Loading content">
      <span className="sr-only">Loading...</span>
      {Array.from({ length: lines }, (_, i) => (
        <div key={i} className="space-y-2">
          <div className="h-4 rounded-lg bg-muted/50 shimmer" style={{ width: `${70 + Math.random() * 30}%` }} />
          {i % 3 === 0 && <div className="h-4 rounded-lg bg-muted/50 shimmer" style={{ width: `${40 + Math.random() * 40}%` }} />}
        </div>
      ))}
    </div>
  );
}

/* ─── CardLoader ─── */
interface CardLoaderProps {
  count?: number;
  columns?: number;
  className?: string;
}

export function CardLoader({ count = 6, columns = 3, className = '' }: CardLoaderProps) {
  return (
    <div className={`grid gap-4 ${className}`} style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }} role="status" aria-label="Loading cards">
      <span className="sr-only">Loading cards...</span>
      {Array.from({ length: count }, (_, i) => (
        <motion.div
          key={i}
          className="rounded-2xl border border-border/50 bg-card p-5 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="h-32 rounded-xl bg-muted/40 shimmer" />
          <div className="space-y-2.5">
            <div className="h-4 rounded-lg bg-muted/50 shimmer w-3/4" />
            <div className="h-3 rounded-lg bg-muted/40 shimmer w-full" />
            <div className="h-3 rounded-lg bg-muted/40 shimmer w-2/3" />
          </div>
          <div className="flex gap-2 pt-1">
            <div className="h-6 w-16 rounded-full bg-muted/30 shimmer" />
            <div className="h-6 w-12 rounded-full bg-muted/30 shimmer" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* ─── TextLoader ─── */
interface TextLoaderProps {
  paragraphs?: number;
  className?: string;
}

export function TextLoader({ paragraphs = 3, className = '' }: TextLoaderProps) {
  return (
    <div className={`space-y-6 ${className}`} role="status" aria-label="Loading text">
      <span className="sr-only">Loading text...</span>
      {Array.from({ length: paragraphs }, (_, i) => (
        <div key={i} className="space-y-2">
          <div className="h-4 rounded-lg bg-muted/50 shimmer w-full" />
          <div className="h-4 rounded-lg bg-muted/50 shimmer w-full" />
          <div className="h-4 rounded-lg bg-muted/40 shimmer" style={{ width: `${50 + Math.random() * 50}%` }} />
        </div>
      ))}
    </div>
  );
}

/* ─── ImageLoader ─── */
interface ImageLoaderProps {
  width?: number | string;
  height?: number | string;
  aspectRatio?: string;
  className?: string;
  rounded?: boolean;
}

export function ImageLoader({ width = '100%', height, aspectRatio = '16/9', className = '', rounded = true }: ImageLoaderProps) {
  return (
    <div
      className={`relative overflow-hidden bg-muted/40 shimmer ${rounded ? 'rounded-xl' : ''} ${className}`}
      style={{ width, height: height ?? aspectRatio, aspectRatio: height ? undefined : aspectRatio }}
      role="status"
      aria-label="Loading image"
    >
      <span className="sr-only">Loading image...</span>
      <div className="absolute inset-0 flex items-center justify-center">
        <FileText className="w-8 h-8 text-muted-foreground/30" />
      </div>
    </div>
  );
}

/* ─── VerseLoader ─── */
interface VerseLoaderProps {
  className?: string;
}

export function VerseLoader({ className = '' }: VerseLoaderProps) {
  return (
    <div className={`space-y-3 ${className}`} role="status" aria-label="Loading verse">
      <span className="sr-only">Loading verse...</span>
      <div className="flex items-center gap-2">
        <div className="h-6 w-6 rounded bg-primary/10 shimmer" />
        <div className="h-4 w-24 rounded-lg bg-muted/50 shimmer" />
      </div>
      <div className="space-y-2 pl-8 border-l-2 border-primary/10">
        <div className="h-5 rounded-lg bg-muted/50 shimmer w-full" />
        <div className="h-5 rounded-lg bg-muted/50 shimmer w-4/5" />
        <div className="h-5 rounded-lg bg-muted/40 shimmer w-3/5" />
      </div>
      <div className="flex gap-3 pt-2">
        <div className="h-8 w-20 rounded-lg bg-muted/30 shimmer" />
        <div className="h-8 w-16 rounded-lg bg-muted/30 shimmer" />
        <div className="h-8 w-24 rounded-lg bg-muted/30 shimmer" />
      </div>
    </div>
  );
}

/* ─── ChatLoader ─── */
interface ChatLoaderProps {
  className?: string;
}

export function ChatLoader({ className = '' }: ChatLoaderProps) {
  return (
    <div className={`flex items-start gap-3 ${className}`} role="status" aria-label="AI is typing">
      <span className="sr-only">AI is typing...</span>
      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
        <MessageCircle className="w-4 h-4 text-primary" />
      </div>
      <div className="bg-muted/50 rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1.5">
        {[0, 1, 2].map(i => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full bg-muted-foreground/40"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
          />
        ))}
      </div>
    </div>
  );
}

/* ─── AudioLoader ─── */
interface AudioLoaderProps {
  className?: string;
}

export function AudioLoader({ className = '' }: AudioLoaderProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`} role="status" aria-label="Loading audio">
      <span className="sr-only">Loading audio...</span>
      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
        <Headphones className="w-5 h-5 text-primary" />
      </div>
      <div className="flex-1 flex items-center gap-1 h-8">
        {Array.from({ length: 24 }, (_, i) => (
          <motion.div
            key={i}
            className="flex-1 rounded-full bg-primary/30"
            animate={{ height: [4, 8 + Math.random() * 24, 4] }}
            transition={{ duration: 0.6 + Math.random() * 0.4, repeat: Infinity, delay: i * 0.05, ease: 'easeInOut' }}
            style={{ minHeight: 4 }}
          />
        ))}
      </div>
      <div className="h-4 w-12 rounded bg-muted/40 shimmer" />
    </div>
  );
}

/* ─── shimmer CSS ─── */
export function ShimmerStyles() {
  return (
    <style>{`
      .shimmer {
        position: relative;
        overflow: hidden;
      }
      .shimmer::after {
        content: '';
        position: absolute;
        inset: 0;
        background: ${shimmerGradient};
        animation: shimmer 1.8s ease-in-out infinite;
      }
      @keyframes shimmer {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
      }
      @keyframes pulse-ring {
        0% { transform: scale(1); opacity: 0.75; }
        100% { transform: scale(2); opacity: 0; }
      }
    `}</style>
  );
}
