'use client';

import Link from 'next/link';

export default function QuizError({
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
          <span className="text-2xl">❓</span>
        </div>
        <h1 className="text-2xl font-bold mb-2">Erro ao carregar Quiz</h1>
        <p className="text-muted-foreground mb-6">
          Não foi possível carregar o quiz. Verifique sua conexão e tente novamente.
        </p>
        {error.digest && <p className="text-xs text-muted-foreground/60 mb-4 font-mono">Erro: {error.digest}</p>}
        <div className="flex gap-3 justify-center">
          <button onClick={reset} className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors">
            Tentar novamente
          </button>
          <Link href="/" className="px-6 py-3 bg-muted text-muted-foreground rounded-xl font-medium hover:bg-muted/80 transition-colors">
            Ir para o início
          </Link>
        </div>
      </div>
    </div>
  );
}
