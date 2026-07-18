import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <h1 className="font-display text-6xl font-light text-[var(--primary)] mb-4">404</h1>
        <h2 className="font-display text-xl text-[var(--fg)] mb-3">
          Conversa não encontrada
        </h2>
        <p className="text-sm text-[var(--muted-fg)] mb-6">
          A conversa pode ter sido encerrada ou não existe.
        </p>
        <Link
          href="/ia"
          className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-xl bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-90 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar à IA
        </Link>
      </div>
    </div>
  );
}
