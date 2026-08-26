'use client';

import type { ReactNode } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { cn } from '@/lib/utils';

const MAX_WIDTH_MAP = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '3xl': 'max-w-3xl',
  '4xl': 'max-w-4xl',
  '5xl': 'max-w-5xl',
  '6xl': 'max-w-6xl',
  '7xl': 'max-w-7xl',
  full: 'max-w-full',
} as const;

export type PageShellMaxWidth = keyof typeof MAX_WIDTH_MAP;

interface PageShellProps {
  children: ReactNode;
  /** Largura máxima do contêiner central. Padrão: 6xl. */
  maxWidth?: PageShellMaxWidth;
  /** Classes extras aplicadas no elemento <main>. */
  className?: string;
  /** Classes extras aplicadas no contêiner centralizado interno. */
  containerClassName?: string;
  /** Quando true, renderiza os filhos direto em <main> (a página controla seu próprio contêiner). */
  noContainer?: boolean;
  /** Remove o padding horizontal padrão (px-4 sm:px-6). */
  noPadding?: boolean;
  /** Oculta o rodapé (raro; usado em fluxos em tela cheia). */
  hideFooter?: boolean;
}

/**
 * Casca padrão de página: Header fixo + <main id="main-content"> com
 * padding/max-width consistentes + Footer. Garante o alvo do skip link
 * de acessibilidade ("Pular para o conteúdo principal").
 */
export function PageShell({
  children,
  maxWidth = '6xl',
  className,
  containerClassName,
  noContainer = false,
  noPadding = false,
  hideFooter = false,
}: PageShellProps) {
  return (
    <div className="min-h-screen bg-transparent text-foreground">
      <Header />
      <main
        id="main-content"
        className={cn('pt-20 pb-24 pb-mobile-nav', !noPadding && 'px-4 sm:px-6', className)}
      >
        {noContainer ? (
          children
        ) : (
          <div className={cn('mx-auto', MAX_WIDTH_MAP[maxWidth], containerClassName)}>
            {children}
          </div>
        )}
      </main>
      {!hideFooter && <Footer />}
    </div>
  );
}
