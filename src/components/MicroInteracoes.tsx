'use client';

import { motion, useMotionValue, useTransform, useSpring, useInView, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect, useCallback, ReactNode } from 'react';
import { Star, Heart, Bookmark, Share2, X, Check } from 'lucide-react';

/* ─── HoverCard ─── */
interface HoverCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  href?: string;
}

export function HoverCard({ children, className = '', glowColor = 'var(--primary)' }: HoverCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-100, 100], [6, -6]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-6, 6]), { stiffness: 300, damping: 30 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      whileHover={{ y: -4, boxShadow: `0 12px 40px ${glowColor}22` }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      {children}
    </motion.div>
  );
}

/* ─── PressButton ─── */
interface PressButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

export function PressButton({ children, onClick, className = '', variant = 'default', size = 'md', disabled }: PressButtonProps) {
  const sizeClasses = { sm: 'px-3 py-1.5 text-xs', md: 'px-4 py-2 text-sm', lg: 'px-6 py-3 text-base' };
  const variantClasses = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90',
    outline: 'border border-border bg-transparent hover:bg-muted/50',
    ghost: 'bg-transparent hover:bg-muted/50',
  };

  return (
    <motion.button
      className={`inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-colors ${sizeClasses[size]} ${variantClasses[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${className}`}
      onClick={onClick}
      disabled={disabled}
      whileTap={disabled ? {} : { scale: 0.95 }}
      whileHover={disabled ? {} : { scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
    >
      {children}
    </motion.button>
  );
}

/* ─── LikeButton ─── */
interface LikeButtonProps {
  liked?: boolean;
  onToggle?: (liked: boolean) => void;
  count?: number;
  size?: number;
  className?: string;
}

export function LikeButton({ liked: initialLiked = false, onToggle, count: initialCount = 0, size = 20, className = '' }: LikeButtonProps) {
  const [liked, setLiked] = useState(initialLiked);
  const [count, setCount] = useState(initialCount);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number }[]>([]);

  const toggle = () => {
    const next = !liked;
    setLiked(next);
    setCount(c => next ? c + 1 : c - 1);
    onToggle?.(next);

    if (next) {
      const newParticles = Array.from({ length: 8 }, (_, i) => ({
        id: Date.now() + i,
        x: (Math.random() - 0.5) * 60,
        y: -(Math.random() * 40 + 20),
      }));
      setParticles(newParticles);
      setTimeout(() => setParticles([]), 600);
    }
  };

  return (
    <button className={`relative inline-flex items-center gap-1.5 ${className}`} onClick={toggle} aria-label={liked ? 'Unlike' : 'Like'}>
      <div className="relative">
        <motion.div animate={liked ? { scale: [1, 1.4, 1] } : { scale: 1 }} transition={{ duration: 0.3, ease: 'easeOut' }}>
          <Heart className={`${size <= 16 ? 'w-4 h-4' : 'w-5 h-5'} transition-colors ${liked ? 'fill-rose-500 text-rose-500' : 'text-muted-foreground'}`} />
        </motion.div>
        <AnimatePresence>
          {particles.map(p => (
            <motion.span
              key={p.id}
              className="absolute top-1/2 left-1/2 w-1.5 h-1.5 rounded-full bg-rose-500"
              initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
              animate={{ x: p.x, y: p.y, opacity: 0, scale: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          ))}
        </AnimatePresence>
      </div>
      {count > 0 && <span className="text-xs text-muted-foreground">{count}</span>}
    </button>
  );
}

/* ─── ShareButton ─── */
interface ShareButtonProps {
  onShare?: () => void;
  className?: string;
}

export function ShareButton({ onShare, className = '' }: ShareButtonProps) {
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  const handleClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setRipples(prev => [...prev, { id: Date.now(), x: e.clientX - rect.left, y: e.clientY - rect.top }]);
    setTimeout(() => setRipples(prev => prev.slice(1)), 500);
    onShare?.();
  };

  return (
    <button className={`relative overflow-hidden inline-flex items-center justify-center w-9 h-9 rounded-lg hover:bg-muted/50 transition-colors ${className}`} onClick={handleClick} aria-label="Share">
      <Share2 className="w-4 h-4 text-muted-foreground" />
      <AnimatePresence>
        {ripples.map(r => (
          <motion.span
            key={r.id}
            className="absolute rounded-full bg-primary/20 pointer-events-none"
            style={{ left: r.x, top: r.y }}
            initial={{ width: 0, height: 0, x: 0, y: 0, opacity: 0.5 }}
            animate={{ width: 80, height: 80, x: -40, y: -40, opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        ))}
      </AnimatePresence>
    </button>
  );
}

/* ─── BookmarkButton ─── */
interface BookmarkButtonProps {
  bookmarked?: boolean;
  onToggle?: (bookmarked: boolean) => void;
  className?: string;
}

export function BookmarkButton({ bookmarked: initial = false, onToggle, className = '' }: BookmarkButtonProps) {
  const [bookmarked, setBookmarked] = useState(initial);

  const toggle = () => {
    const next = !bookmarked;
    setBookmarked(next);
    onToggle?.(next);
  };

  return (
    <button className={`inline-flex items-center justify-center w-9 h-9 rounded-lg hover:bg-muted/50 transition-colors ${className}`} onClick={toggle} aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark'}>
      <motion.div animate={bookmarked ? { y: [0, -6, 0], scale: [1, 1.2, 1] } : { y: 0, scale: 1 }} transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}>
        <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-primary text-primary' : 'text-muted-foreground'}`} />
      </motion.div>
    </button>
  );
}

/* ─── StarRating ─── */
interface StarRatingProps {
  value?: number;
  onChange?: (value: number) => void;
  max?: number;
  size?: number;
  readOnly?: boolean;
  className?: string;
}

export function StarRating({ value: initial = 0, onChange, max = 5, size = 20, readOnly = false }: StarRatingProps) {
  const [value, setValue] = useState(initial);
  const [hovered, setHovered] = useState(-1);

  const handle = (i: number) => {
    if (readOnly) return;
    setValue(i);
    onChange?.(i);
  };

  return (
    <div className={`inline-flex gap-0.5 ${readOnly ? '' : 'cursor-pointer'}`} role="radiogroup" aria-label="Rating">
      {Array.from({ length: max }, (_, i) => (
        <motion.button
          key={i}
          type="button"
          role="radio"
          aria-checked={i < (hovered >= 0 ? hovered : value)}
          aria-label={`${i + 1} star${i > 0 ? 's' : ''}`}
          className={`p-0 bg-transparent border-none ${readOnly ? 'cursor-default' : 'cursor-pointer'}`}
          onMouseEnter={() => !readOnly && setHovered(i + 1)}
          onMouseLeave={() => !readOnly && setHovered(-1)}
          onClick={() => handle(i + 1)}
          whileHover={readOnly ? {} : { scale: 1.2 }}
          whileTap={readOnly ? {} : { scale: 0.9 }}
        >
          <motion.div
            animate={i < (hovered >= 0 ? hovered : value) ? { scale: [0.8, 1.15, 1], rotate: [0, -10, 0] } : { scale: 1 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <Star className={`${size <= 16 ? 'w-4 h-4' : 'w-5 h-5'} transition-colors duration-200 ${i < (hovered >= 0 ? hovered : value) ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground/40'}`} />
          </motion.div>
        </motion.button>
      ))}
    </div>
  );
}

/* ─── ToggleSwitch ─── */
interface ToggleSwitchProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
  className?: string;
}

export function ToggleSwitch({ checked: initial = false, onCheckedChange, disabled = false, label, className = '' }: ToggleSwitchProps) {
  const [checked, setChecked] = useState(initial);
  const springConfig = { type: 'spring' as const, stiffness: 500, damping: 30 };

  const toggle = () => {
    if (disabled) return;
    const next = !checked;
    setChecked(next);
    onCheckedChange?.(next);
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={toggle}
      className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-200 ${checked ? 'bg-primary' : 'bg-muted'} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${className}`}
    >
      <motion.span
        className="block h-4 w-4 rounded-full bg-white shadow-sm"
        layout
        transition={springConfig}
        style={{ x: checked ? 24 : 4 }}
      />
    </button>
  );
}

/* ─── Tooltip ─── */
interface TooltipProps {
  children: ReactNode;
  content: string;
  side?: 'top' | 'bottom';
}

export function Tooltip({ children, content, side = 'top' }: TooltipProps) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative inline-flex" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)} onFocus={() => setShow(true)} onBlur={() => setShow(false)}>
      {children}
      <AnimatePresence>
        {show && (
          <motion.div
            className={`absolute z-50 px-2.5 py-1 text-xs font-medium rounded-lg bg-foreground text-background whitespace-nowrap pointer-events-none ${side === 'top' ? 'bottom-full mb-2' : 'top-full mt-2'}`}
            initial={{ opacity: 0, y: side === 'top' ? 4 : -4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: side === 'top' ? 4 : -4, scale: 0.95 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Toast (component version) ─── */
interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  visible: boolean;
  onClose?: () => void;
  duration?: number;
}

const toastTypeConfig = {
  success: { icon: <Check className="w-4 h-4" />, bg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400' },
  error: { icon: <X className="w-4 h-4" />, bg: 'bg-red-500/10 border-red-500/30 text-red-600 dark:text-red-400' },
  info: { icon: null, bg: 'bg-blue-500/10 border-blue-500/30 text-blue-600 dark:text-blue-400' },
  warning: { icon: null, bg: 'bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400' },
};

export function Toast({ message, type = 'info', visible, onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    if (visible && onClose) {
      const t = setTimeout(onClose, duration);
      return () => clearTimeout(t);
    }
  }, [visible, duration, onClose]);

  const config = toastTypeConfig[type];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={`flex items-center gap-2.5 px-4 py-3 rounded-xl border backdrop-blur-xl shadow-lg text-sm font-medium ${config.bg}`}
          initial={{ opacity: 0, x: 100, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 100, scale: 0.95 }}
          transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {config.icon}
          <span>{message}</span>
          {onClose && (
            <button onClick={onClose} className="ml-2 p-0.5 rounded hover:bg-black/10 transition-colors" aria-label="Close">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── Confetti ─── */
interface ConfettiProps {
  active: boolean;
  particleCount?: number;
  colors?: string[];
}

const defaultColors = ['#f43f5e', '#8b5cf6', '#06b6d4', '#f59e0b', '#22c55e', '#ec4899', '#3b82f6'];

export function Confetti({ active, particleCount = 40, colors = defaultColors }: ConfettiProps) {
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; color: string; size: number; delay: number; drift: number; shape: string; rotation: number }[]>([]);

  useEffect(() => {
    if (!active) { setParticles([]); return; }
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: 0,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 8 + 4,
      delay: Math.random() * 0.3,
      drift: (Math.random() - 0.5) * 200,
      shape: Math.random() > 0.5 ? '50%' : '2px',
      rotation: Math.random() * 360,
    }));
    setParticles(newParticles);
    const t = setTimeout(() => setParticles([]), 2500);
    return () => clearTimeout(t);
  }, [active, particleCount, colors.join()]);

  if (!particles.length) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9998] overflow-hidden">
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{ left: `${p.x}%`, top: 0, width: p.size, height: p.size, background: p.color, borderRadius: p.shape }}
          initial={{ y: -10, x: 0, opacity: 1, rotate: p.rotation, scale: 1 }}
          animate={{ y: '70vh', x: p.drift, opacity: 0, rotate: p.rotation + 720, scale: 0.3 }}
          transition={{ duration: 1.8 + Math.random() * 0.7, delay: p.delay, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      ))}
    </div>
  );
}

/* ─── PulseRing ─── */
interface PulseRingProps {
  color?: string;
  size?: number;
  className?: string;
}

export function PulseRing({ color = 'var(--primary)', size = 12, className = '' }: PulseRingProps) {
  return (
    <span className={`relative inline-flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <span className="absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: color, animation: 'pulse-ring 1.5s cubic-bezier(0.4,0,0.6,1) infinite' }} />
      <span className="relative inline-flex rounded-full" style={{ width: size * 0.5, height: size * 0.5, background: color }} />
    </span>
  );
}

/* ─── Skeleton ─── */
interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: number | string;
  height?: number | string;
  lines?: number;
}

export function Skeleton({ className = '', variant = 'text', width, height, lines = 1 }: SkeletonProps) {
  if (variant === 'text' && lines > 1) {
    return (
      <div className={`space-y-2 ${className}`} style={{ width }}>
        {Array.from({ length: lines }, (_, i) => (
          <div key={i} className="h-4 rounded-lg bg-muted/60 shimmer" style={{ width: i === lines - 1 ? '60%' : '100%' }} />
        ))}
      </div>
    );
  }

  const shapeClass = {
    text: 'h-4 rounded-lg',
    circular: 'rounded-full',
    rectangular: 'rounded-xl',
  }[variant];

  return (
    <div className={`${shapeClass} bg-muted/60 shimmer ${className}`} style={{ width: variant === 'circular' ? width ?? 40 : width, height: variant === 'circular' ? height ?? width ?? 40 : height ?? (variant === 'text' ? 16 : 200) }} />
  );
}

/* ─── Typewriter ─── */
interface TypewriterProps {
  text: string;
  speed?: number;
  className?: string;
  onComplete?: () => void;
}

export function Typewriter({ text, speed = 40, className = '', onComplete }: TypewriterProps) {
  const [displayed, setDisplayed] = useState('');
  const index = useRef(0);

  useEffect(() => {
    index.current = 0;
    setDisplayed('');
  }, [text]);

  useEffect(() => {
    if (index.current >= text.length) { onComplete?.(); return; }
    const t = setTimeout(() => {
      setDisplayed(text.slice(0, index.current + 1));
      index.current++;
    }, speed);
    return () => clearTimeout(t);
  }, [displayed, text, speed, onComplete]);

  return (
    <span className={className}>
      {displayed}
      {displayed.length < text.length && (
        <motion.span
          className="inline-block w-0.5 h-4 bg-current ml-0.5 align-middle"
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}
        />
      )}
    </span>
  );
}

/* ─── CountUp ─── */
interface CountUpProps {
  from?: number;
  to: number;
  duration?: number;
  decimals?: number;
  className?: string;
}

export function CountUp({ from = 0, to, duration = 2, decimals = 0, className = '' }: CountUpProps) {
  const [current, setCurrent] = useState(from);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const animated = useRef(false);

  useEffect(() => {
    if (!isInView || animated.current) return;
    animated.current = true;
    const startTime = performance.now();
    const step = (now: number) => {
      const elapsed = (now - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(from + (to - from) * eased);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, from, to, duration]);

  return <span ref={ref} className={className}>{current.toFixed(decimals)}</span>;
}

/* ─── Parallax ─── */
interface ParallaxProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

export function Parallax({ children, speed = 0.3, className = '' }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const y = useMotionValue(0);

  useEffect(() => {
    const handle = () => {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      const scrolled = window.innerHeight - rect.top;
      y.set(scrolled * speed);
    };
    window.addEventListener('scroll', handle, { passive: true });
    return () => window.removeEventListener('scroll', handle);
  }, [speed, y]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div style={{ y }}>
        {children}
      </motion.div>
    </div>
  );
}
