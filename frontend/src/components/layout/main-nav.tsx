'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Search, BookOpen, User, Settings } from 'lucide-react';

export function MainNav() {
  const [aberto, setAberto] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold text-blue-600">
            <BookOpen className="w-6 h-6" />
            <span>Sola Scriptura</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link href="/biblia" className="text-sm font-medium hover:text-blue-600 transition-colors">
              Bíblia
            </Link>
            <Link href="/pesquisa" className="text-sm font-medium hover:text-blue-600 transition-colors">
              <Search className="w-4 h-4 inline mr-1" />
              Pesquisar
            </Link>
            <Link href="/estudos" className="text-sm font-medium hover:text-blue-600 transition-colors">
              Estudos
            </Link>
            <Link href="/ia" className="text-sm font-medium hover:text-blue-600 transition-colors">
              IA
            </Link>
            <Link
              href="/auth/login"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Entrar
            </Link>
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setAberto(!aberto)}
            aria-label="Abrir menu"
          >
            {aberto ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {aberto && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-800">
            <div className="flex flex-col gap-3">
              <Link href="/biblia" className="text-sm font-medium py-2">Bíblia</Link>
              <Link href="/pesquisa" className="text-sm font-medium py-2">Pesquisar</Link>
              <Link href="/estudos" className="text-sm font-medium py-2">Estudos</Link>
              <Link href="/ia" className="text-sm font-medium py-2">IA</Link>
              <Link href="/auth/login" className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium text-center">
                Entrar
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
