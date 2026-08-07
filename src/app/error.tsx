'use client';

import Link from 'next/link';
import { RotateCcw, Home } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full text-center">
        <div className="w-16 h-16 rounded-2xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto mb-6">
          <span className="text-2xl">⚠️</span>
        </div>
        <h1 className="text-2xl font-bold mb-2">Algo deu errado</h1>
        <p className="text-muted-foreground mb-6">
          Ocorreu um erro inesperado. Por favor, tente novamente.
        </p>
        {error.digest && (
          <p className="text-xs text-muted-foreground/60 mb-4 font-mono">
            Erro: {error.digest}
          </p>
        )}
        <div className="flex gap-3 justify-center">
          <button
            onClick={reset}
            className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors"
          >
            <RotateCcw className="w-4 h-4" /> Tentar novamente
          </button>
          <Link href="/"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border text-sm font-medium hover:bg-muted/50 transition-colors">
            <Home className="w-4 h-4" /> Início
          </Link>
        </div>
      </div>
    </div>
  );
}
