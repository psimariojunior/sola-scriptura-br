import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { BookOpen, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Header />
      <main className="pt-16 flex items-center justify-center px-6 min-h-[80vh]">
        <div className="text-center max-w-lg">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-[var(--primary)]/15 bg-[var(--primary)]/[0.04]">
            <span className="text-[11px] font-medium text-[var(--muted-fg)] tracking-wide">Erro 404</span>
          </div>

          <h1 className="font-display text-7xl md:text-8xl font-light text-[var(--primary)] mb-4">
            404
          </h1>

          <h2 className="font-display text-2xl md:text-3xl font-light text-[var(--fg)] mb-4">
            Página não encontrada
          </h2>

          <div className="w-16 h-px mx-auto mb-6" style={{ background: 'linear-gradient(90deg, transparent, var(--primary), transparent)' }} />

          <blockquote className="text-sm text-[var(--muted-fg)] italic leading-relaxed mb-8 font-serif-body">
            &ldquo;Buscai ao Senhor enquanto se acha; invocai-o enquanto está perto.&rdquo;
            <span className="block mt-2 text-[var(--primary)] font-semibold not-italic text-xs">— Isaías 55:6</span>
          </blockquote>

          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-xl bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-90 transition-all duration-300"
            >
              <BookOpen className="w-4 h-4" />
              Ir para o início
            </Link>
            <Link
              href="/biblia"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-xl border border-[var(--border)] text-[var(--fg)] hover:bg-[var(--muted-fg)]/5 transition-all duration-300"
            >
              <ArrowLeft className="w-4 h-4" />
              Abrir a Bíblia
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
