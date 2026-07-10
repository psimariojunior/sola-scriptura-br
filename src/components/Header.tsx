'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, BookOpen, Search, Sun, Moon, 
  User, ChevronDown, ExternalLink
} from 'lucide-react';

const navLinks = [
  { href: '/biblia', label: 'Bíblia' },
  { href: '/pesquisa', label: 'Pesquisa' },
  { href: '/exegese', label: 'Exegese' },
  { href: '/idiomas', label: 'Línguas' },
  { href: '/teologia', label: 'Teologia' },
  { href: '/historia', label: 'História' },
  { href: '/ferramentas', label: 'Ferramentas' },
  { href: '/ia', label: 'IA' },
];

const moreLinks = [
  { href: '/cronologia', label: 'Cronologia' },
  { href: '/personagens', label: 'Personagens' },
  { href: '/estudos', label: 'Meus Estudos' },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-background/95 backdrop-blur-xl border-b border-border/40 shadow-[0_1px_3px_rgba(0,0,0,0.05)]' 
        : 'bg-background/60 backdrop-blur-xl border-b border-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
            <BookOpen className="w-4 h-4 text-primary" strokeWidth={1.5} />
          </div>
          <span className="font-display text-xl font-semibold tracking-tight hidden sm:block">
            Sola Scriptura
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-0.5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[13px] font-medium text-muted-foreground hover:text-foreground px-3 py-2 rounded-lg hover:bg-muted/50 transition-all duration-200"
            >
              {link.label}
            </Link>
          ))}
          
          {/* More dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowMore(!showMore)}
              onBlur={() => setTimeout(() => setShowMore(false), 150)}
              className="flex items-center gap-1 text-[13px] font-medium text-muted-foreground hover:text-foreground px-3 py-2 rounded-lg hover:bg-muted/50 transition-all duration-200"
            >
              Mais
              <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${showMore ? 'rotate-180' : ''}`} />
            </button>
            
            <AnimatePresence>
              {showMore && (
                <motion.div
                  initial={{ opacity: 0, y: -4, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -4, scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full right-0 mt-1 w-48 bg-card border border-border rounded-xl shadow-xl py-1 z-50"
                >
                  {moreLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                      onClick={() => setShowMore(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        <div className="hidden lg:flex items-center gap-2">
          <Link 
            href="/auth/login" 
            className="flex items-center gap-2 px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-all duration-200"
          >
            <User className="w-4 h-4" />
            <span>Entrar</span>
          </Link>
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-all duration-200"
            aria-label="Alternar tema"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <Link 
            href="/pesquisa" 
            className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-all duration-200"
          >
            <Search className="w-4 h-4" />
          </Link>
        </div>

        <div className="flex lg:hidden items-center gap-1">
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Alternar tema"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button 
            className="p-2 hover:bg-muted/50 rounded-lg transition-colors" 
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="lg:hidden border-t border-border/40 bg-background/95 backdrop-blur-xl overflow-hidden"
          >
            <nav className="flex flex-col px-6 py-4 gap-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                >
                  <Link
                    href={link.href}
                    className="text-sm font-medium text-muted-foreground hover:text-foreground px-3 py-2.5 rounded-lg hover:bg-muted/50 transition-all block"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <div className="border-t border-border/30 my-2" />
              {moreLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (navLinks.length + i) * 0.03 }}
                >
                  <Link
                    href={link.href}
                    className="text-sm font-medium text-muted-foreground hover:text-foreground px-3 py-2.5 rounded-lg hover:bg-muted/50 transition-all block"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <div className="border-t border-border/30 my-2" />
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: (navLinks.length + moreLinks.length) * 0.03 }}
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
        )}
      </AnimatePresence>
    </header>
  );
}
