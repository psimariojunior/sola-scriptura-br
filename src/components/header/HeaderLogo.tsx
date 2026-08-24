import Link from 'next/link';
import { BookOpen } from 'lucide-react';

export function HeaderLogo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 group shrink-0 wordmark-glow"
      aria-label="Sola Scriptura — Página inicial"
    >
      <span className="relative inline-flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 group-hover:bg-primary/15 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
        <BookOpen className="w-4 h-4 text-primary" strokeWidth={1.5} />
      </span>
      <span className="wordmark text-lg sm:text-xl hidden sm:inline-flex items-baseline">
        <span className="wordmark-sola">Sola</span>
        <span className="wordmark-scriptura ml-1.5">Scriptura</span>
      </span>
    </Link>
  );
}
