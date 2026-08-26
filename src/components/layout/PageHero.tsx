'use client';

import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

interface PageHeroProps {
  /** Ícone Lucide exibido no selo circular acima do título. */
  icon?: LucideIcon;
  /** Texto pequeno em maiúsculas acima do título (opcional). */
  eyebrow?: string;
  /** Título principal. Pode conter <span className="italic text-primary"> para destaque. */
  title: ReactNode;
  /** Subtítulo/descrição abaixo do título. */
  subtitle?: ReactNode;
  /** Alinhamento do bloco. Padrão: center. */
  align?: 'center' | 'left';
  /** Mostra o ornamento dourado abaixo do subtítulo. Padrão: true. */
  ornament?: boolean;
  className?: string;
  /** Conteúdo extra (estatísticas, ações) renderizado abaixo do subtítulo/ornamento. */
  children?: ReactNode;
}

/**
 * Cabeçalho hero reutilizável para páginas hub: selo com ícone, título com
 * escala tipográfica h1 (.text-h1) e subtítulo, no padrão já usado em
 * Biblioteca/Ferramentas.
 */
export function PageHero({
  icon: Icon,
  eyebrow,
  title,
  subtitle,
  align = 'center',
  ornament = true,
  className,
  children,
}: PageHeroProps) {
  const isCenter = align === 'center';

  return (
    <div className={cn('mb-10', isCenter && 'text-center', className)}>
      {Icon && (
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className={cn(
            'w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6',
            isCenter && 'mx-auto'
          )}
        >
          <Icon className="w-8 h-8 text-primary" strokeWidth={1.5} />
        </motion.div>
      )}

      {eyebrow && (
        <p className="text-h6 text-primary mb-2">{eyebrow}</p>
      )}

      <h1 className="text-h1 text-foreground mb-4">{title}</h1>

      {subtitle && (
        <p className={cn('text-muted-foreground', isCenter && 'max-w-2xl mx-auto')}>{subtitle}</p>
      )}

      {ornament && <div className={cn('ornament w-16 mt-6', isCenter && 'mx-auto')} />}

      {children}
    </div>
  );
}
