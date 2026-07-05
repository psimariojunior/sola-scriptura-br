'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, BookOpen, Search } from 'lucide-react';

const navLinks = [
  { href: '/biblia', label: 'Bíblia' },
  { href: '/idiomas', label: 'Línguas Originais' },
  { href: '/teologia', label: 'Teologia' },
  { href: '/historia', label: 'História' },
  { href: '/ia', label: 'IA' },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <BookOpen className="w-5 h-5 text-primary" strokeWidth={1.5} />
          <span className="font-display text-xl font-semibold tracking-tight">
            Sola Scriptura
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Link href="/biblia" className="p-2 text-muted-foreground hover:text-foreground transition-colors">
            <Search className="w-4 h-4" />
          </Link>
          <Link
            href="/"
            className="text-sm font-semibold bg-primary text-primary-foreground px-5 py-2 hover:bg-primary/90 transition-colors"
          >
            Começar
          </Link>
        </div>

        <button className="md:hidden p-2" onClick={() => setOpen(!open)}>
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur-md">
          <nav className="flex flex-col px-6 py-4 gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
