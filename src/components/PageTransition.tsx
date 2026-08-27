'use client';

import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
}

/**
 * Casca das páginas. Sem AnimatePresence/exit: no App Router isso
 * deixava o conteúdo em opacity 0 após a navegação client-side
 * até um refresh completo.
 */
export default function PageTransition({ children, className }: Props) {
  return <div className={className}>{children}</div>;
}
