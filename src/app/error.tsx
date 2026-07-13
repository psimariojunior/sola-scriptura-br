'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center px-6">
      <div className="flex flex-col items-center text-center max-w-md">
        <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center mb-6">
          <AlertTriangle className="w-8 h-8 text-red-500" />
        </div>
        <h1 className="font-display text-2xl font-semibold text-[var(--fg)] mb-3">
          Algo deu errado
        </h1>
        <p className="text-sm text-[var(--muted-fg)] mb-8 leading-relaxed">
          Ocorreu um erro inesperado ao carregar esta página. Por favor, tente novamente.
        </p>
        <button
          onClick={() => reset()}
          className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-xl bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-90 transition-all duration-300"
        >
          <RefreshCw className="w-4 h-4" />
          Tentar novamente
        </button>
      </div>
    </div>
  );
}
