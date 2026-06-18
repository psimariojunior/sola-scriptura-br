'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, Search, BookOpen } from 'lucide-react';

export function Cabeçalho() {
  const [aberto, setAberto] = useState(false);
  const [rolou, setRolou] = useState(false);

  useEffect(() => {
    const onScroll = () => setRolou(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '/biblia', rotulo: 'Bíblia' },
    { href: '/idiomas', rotulo: 'Línguas Originais' },
    { href: '/teologia', rotulo: 'Teologia' },
    { href: '/historia', rotulo: 'História & Geografia' },
    { href: '/ia', rotulo: 'IA' },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        rolou
          ? 'bg-background/95 backdrop-blur-md border-b border-border/60 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-baseline gap-2 group">
          <BookOpen className="w-5 h-5 text-primary self-center" strokeWidth={1.5} />
          <span className="font-display text-2xl font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors">
            Sola Scriptura
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium tracking-wide text-muted-foreground hover:text-foreground transition-colors relative group"
            >
              {l.rotulo}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/pesquisa"
            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Pesquisar"
          >
            <Search className="w-4 h-4" strokeWidth={1.5} />
          </Link>
          <Link
            href="/auth/entrar"
            className="text-sm font-medium tracking-wide text-foreground border-b border-primary pb-0.5 hover:text-primary transition-colors"
          >
            Entrar
          </Link>
        </div>

        <button
          className="md:hidden p-1 text-foreground"
          onClick={() => setAberto(!aberto)}
          aria-label="Menu"
        >
          {aberto ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {aberto && (
        <div className="md:hidden border-t border-border/40 bg-background/98 backdrop-blur-md">
          <nav className="flex flex-col px-6 py-4 gap-4">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground"
                onClick={() => setAberto(false)}
              >
                {l.rotulo}
              </Link>
            ))}
            <Link
              href="/auth/entrar"
              className="text-sm font-medium text-primary border-b border-primary pb-0.5 w-fit"
              onClick={() => setAberto(false)}
            >
              Entrar
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
