'use client';

import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, BookOpen, Search, Sun, Moon, User, Languages, Stars, BookMarked, Command, Settings } from 'lucide-react';
import { useTema, type TemaNome } from '@/lib/temas';
import { useTranslation } from 'react-i18next';
import { authService } from '@/lib/auth';
import { BuscaGlobal } from '@/components/BuscaGlobal';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const navLinks = [
  { href: '/biblia', label: 'Bíblia' },
  { href: '/pesquisa', label: 'Pesquisa' },
  { href: '/teologia', label: 'Teologia' },
  { href: '/estudos', label: 'Estudos' },
  { href: '/ia', label: 'IA' },
];

const moreLinks = [
  { href: '/exegese', label: 'Exegese' },
  { href: '/idiomas', label: 'Línguas Originais' },
  { href: '/historia', label: 'História' },
  { href: '/cronologia', label: 'Cronologia' },
  { href: '/personagens', label: 'Personagens' },
  { href: '/ferramentas', label: 'Ferramentas' },
  { href: '/quiz', label: 'Quiz Bíblico' },
  { href: '/flashcards', label: 'Flashcards' },
  { href: '/devocional', label: 'Devocional' },
  { href: '/comunidade', label: 'Comunidade' },
  { href: '/estatisticas/gamificacao', label: 'Gamificação' },
];

const temaIcons: Record<string, React.ReactNode> = {
  light: <Sun className="w-4 h-4" />,
  escuro: <Moon className="w-4 h-4" />,
  sepia: <BookOpen className="w-4 h-4" />,
  noturno: <Moon className="w-4 h-4" strokeWidth={1.5} />,
};

function DailyChallengeDot() {
  return (
    <motion.span
      className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-primary"
      initial={{ scale: 0 }}
      animate={{ scale: [0, 1.2, 1] }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <motion.span
        className="absolute inset-0 rounded-full bg-primary/50"
        animate={{ scale: [1, 2.2], opacity: [0.6, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
      />
    </motion.span>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [buscaOpen, setBuscaOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hasDailyChallenge, setHasDailyChallenge] = useState(true);
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const { tema, setTema, temasDisponiveis } = useTema();
  const { i18n } = useTranslation();
  const pathname = usePathname();
  const [idioma, setIdioma] = useState<'pt' | 'en'>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('ssb_lang') as 'pt' | 'en') || 'pt';
    }
    return 'pt';
  });

  const toggleIdioma = useCallback(() => {
    const novo = idioma === 'pt' ? 'en' : 'pt';
    setIdioma(novo);
    i18n.changeLanguage(novo);
    localStorage.setItem('ssb_lang', novo);
  }, [idioma, i18n]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsUserAdmin(authService.isAdmin());
  }, [pathname]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  return (
    <>
      <BuscaGlobal open={buscaOpen} onOpenChange={setBuscaOpen} />
      <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-background/95 backdrop-blur-xl border-b border-border/40 shadow-[0_1px_3px_rgba(0,0,0,0.05)]'
          : 'bg-background/60 backdrop-blur-xl border-b border-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group" aria-label="Sola Scriptura — Página inicial">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-all duration-300 group-hover:scale-110">
              <BookOpen className="w-4 h-4 text-primary" strokeWidth={1.5} />
            </div>
            <span className="font-display text-xl font-semibold tracking-tight hidden sm:block">
              Sola Scriptura
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-0.5" aria-label="Navegação principal">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? 'page' : undefined}
                className={`relative flex items-center gap-1.5 text-[13px] font-medium px-3 py-2 rounded-lg transition-all duration-300 ${
                  isActive(link.href)
                    ? 'text-primary bg-primary/10 font-semibold'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                {link.label}
                {link.href === '/quiz' && hasDailyChallenge && <DailyChallengeDot />}
              </Link>
            ))}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className={`flex items-center gap-1 text-[13px] font-medium px-3 py-2 rounded-lg transition-all duration-300 ${
                    moreLinks.some(l => isActive(l.href))
                      ? 'text-primary bg-primary/10 font-semibold'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  Mais
                  <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 5L6 8L9 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                {moreLinks.map((link) => (
                  <DropdownMenuItem key={link.href} asChild>
                    <Link
                      href={link.href}
                      aria-current={isActive(link.href) ? 'page' : undefined}
                      className={`w-full ${
                        isActive(link.href) ? 'text-primary bg-primary/10 font-medium' : ''
                      }`}
                    >
                      {link.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          <div className="hidden lg:flex items-center gap-2">
            <button
              onClick={toggleIdioma}
              className="px-2.5 py-1.5 text-xs font-semibold rounded-lg border border-border hover:bg-muted/50 transition-all duration-300 uppercase tracking-wider"
              title={idioma === 'pt' ? 'Switch to English' : 'Mudar para Português'}
              aria-label={idioma === 'pt' ? 'Mudar idioma para inglês' : 'Change language to Portuguese'}
            >
              {idioma === 'pt' ? 'EN' : 'PT'}
            </button>
            {isUserAdmin && (
              <Link
                href="/admin"
                className="flex items-center gap-2 px-3 py-1.5 text-sm text-amber-600 dark:text-amber-400 hover:bg-amber-500/10 rounded-lg transition-all duration-300 font-medium"
              >
                <Settings className="w-4 h-4" />
                <span>Admin</span>
              </Link>
            )}
            <Link
              href="/auth/login"
              className="flex items-center gap-2 px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-all duration-300"
            >
              <User className="w-4 h-4" />
              <span>Entrar</span>
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-all duration-300"
                  aria-label="Temas"
                >
                  {temaIcons[tema] || <Moon className="w-4 h-4" />}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44">
                <DropdownMenuLabel>Temas</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {temasDisponiveis.map((t) => (
                  <DropdownMenuItem
                    key={t.nome}
                    onClick={() => setTema(t.nome)}
                    className={tema === t.nome ? 'text-primary bg-primary/10 font-medium' : ''}
                  >
                    <span className="mr-2">{temaIcons[t.nome]}</span>
                    {t.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <button
              onClick={() => setBuscaOpen(true)}
              className="flex items-center gap-1.5 p-2 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-all duration-300 hover:scale-110"
              title="Buscar (Ctrl+K)"
              aria-label="Buscar versículos e conteúdo"
            >
              <Search className="w-4 h-4" />
              <kbd className="hidden xl:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[9px] font-mono text-muted-foreground/70 border border-border/40 rounded bg-muted/30">
                <Command className="w-2.5 h-2.5" />K
              </kbd>
            </button>
          </div>

          <div className="flex lg:hidden items-center gap-1">
            <button
              onClick={toggleIdioma}
              className="px-3 py-2 min-h-[44px] text-xs font-semibold rounded-lg border border-border hover:bg-muted/50 transition-all duration-300 uppercase tracking-wider"
              aria-label={idioma === 'pt' ? 'Mudar idioma para inglês' : 'Mudar idioma para português'}
            >
              {idioma === 'pt' ? 'EN' : 'PT'}
            </button>
            <button
              onClick={() => setBuscaOpen(true)}
              className="p-2.5 min-h-[44px] min-w-[44px] hover:bg-muted/50 rounded-lg transition-all duration-300"
              aria-label="Buscar"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              className="p-2.5 min-h-[44px] min-w-[44px] hover:bg-muted/50 rounded-lg transition-all duration-300"
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <>
              <motion.div
                className="fixed inset-0 bg-black/20 backdrop-blur-sm lg:hidden z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setOpen(false)}
              />
              <motion.div
                id="mobile-menu"
                role="navigation"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="lg:hidden border-t border-border/40 bg-background/98 backdrop-blur-xl overflow-hidden relative z-50"
              >
                <nav className="flex flex-col px-6 py-4 gap-1 max-h-[70vh] overflow-y-auto" aria-label="Navegação mobile">
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                      <Link
                        href={link.href}
                        aria-current={isActive(link.href) ? 'page' : undefined}
                        className={`flex items-center gap-2.5 text-sm font-medium px-3 py-3 min-h-[44px] rounded-lg transition-all ${
                          isActive(link.href)
                            ? 'text-primary bg-primary/10 font-semibold'
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                        }`}
                        onClick={() => setOpen(false)}
                      >
                        {link.label}
                        {link.href === '/quiz' && hasDailyChallenge && (
                          <span className="ml-auto w-2 h-2 rounded-full bg-primary animate-pulse" />
                        )}
                      </Link>
                    </motion.div>
                  ))}
                  <div className="border-t border-border/30 my-2" />
                  {moreLinks.map((link, i) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: (navLinks.length + i) * 0.04 }}
                    >
                      <Link
                        href={link.href}
                        aria-current={isActive(link.href) ? 'page' : undefined}
                        className={`text-sm font-medium px-3 py-2.5 rounded-lg transition-all block ${
                          isActive(link.href)
                            ? 'text-primary bg-primary/10 font-semibold'
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                        }`}
                        onClick={() => setOpen(false)}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                  <div className="border-t border-border/30 my-2" />
                  {isUserAdmin && (
                    <motion.div
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: (navLinks.length + moreLinks.length) * 0.04 }}
                    >
                      <Link
                        href="/admin"
                        className="flex items-center gap-2 text-sm font-medium text-amber-600 dark:text-amber-400 hover:bg-amber-500/10 px-3 py-3 min-h-[44px] rounded-lg transition-all"
                        onClick={() => setOpen(false)}
                      >
                        <Settings className="w-4 h-4" />
                        Painel Admin
                      </Link>
                    </motion.div>
                  )}
                  <motion.div
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (navLinks.length + moreLinks.length) * 0.04 }}
                  >
                    <Link
                      href="/auth/login"
                      className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground px-3 py-2.5 rounded-lg hover:bg-muted/50 transition-all"
                      onClick={() => setOpen(false)}
                    >
                      <User className="w-4 h-4" />
                      Entrar
                    </Link>
                  </motion.div>
                </nav>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
