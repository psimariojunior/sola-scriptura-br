'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, BookOpen, Search, Sun, Moon, 
  User, ChevronDown, Command
} from 'lucide-react';
import { useTema, type TemaNome } from '@/lib/temas';

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
  const [showTemas, setShowTemas] = useState(false);
  const { tema, setTema, temasDisponiveis } = useTema();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-background/95 backdrop-blur-xl border-b border-border/40 shadow-[0_1px_3px_rgba(0,0,0,0.05)]' 
        : 'bg-background/60 backdrop-blur-xl border-b border-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-all duration-300 group-hover:scale-110">
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
              className={`text-[13px] font-medium px-3 py-2 rounded-lg transition-all duration-300 ${
                isActive(link.href)
                  ? 'text-primary bg-primary/10 font-semibold'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              {link.label}
            </Link>
          ))}
          
          <div className="relative">
            <button
              onClick={() => setShowMore(!showMore)}
              onBlur={() => setTimeout(() => setShowMore(false), 150)}
              className={`flex items-center gap-1 text-[13px] font-medium px-3 py-2 rounded-lg transition-all duration-300 ${
                moreLinks.some(l => isActive(l.href))
                  ? 'text-primary bg-primary/10 font-semibold'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              Mais
              <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${showMore ? 'rotate-180' : ''}`} />
            </button>
            
            <AnimatePresence>
              {showMore && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.96 }}
                  transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="absolute top-full right-0 mt-1 w-52 bg-card border border-border rounded-xl shadow-xl py-1 z-50"
                >
                  {moreLinks.map((link, i) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        className={`block px-4 py-2.5 text-sm transition-all duration-200 ${
                          isActive(link.href)
                            ? 'text-primary bg-primary/10 font-medium'
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                        }`}
                        onClick={() => setShowMore(false)}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        <div className="hidden lg:flex items-center gap-2">
          <Link 
            href="/auth/login" 
            className="flex items-center gap-2 px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-all duration-300"
          >
            <User className="w-4 h-4" />
            <span>Entrar</span>
          </Link>
          <div className="relative">
            <button
              onClick={() => setShowTemas(!showTemas)}
              onBlur={() => setTimeout(() => setShowTemas(false), 150)}
              className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-all duration-300"
              aria-label="Temas"
            >
              <span className="text-base leading-none">{temasDisponiveis.find(t => t.nome === tema)?.icone || '🌙'}</span>
            </button>
            <AnimatePresence>
              {showTemas && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.96 }}
                  transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="absolute top-full right-0 mt-1 w-44 bg-card border border-border rounded-xl shadow-xl py-1 z-50"
                >
                  {temasDisponiveis.map((t) => (
                    <button
                      key={t.nome}
                      onClick={() => { setTema(t.nome); setShowTemas(false); }}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-all duration-200 ${
                        tema === t.nome
                          ? 'text-primary bg-primary/10 font-medium'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                      }`}
                    >
                      <span className="text-base">{t.icone}</span>
                      <span>{t.label}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <Link 
            href="/pesquisa" 
            className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-all duration-300 hover:scale-110"
          >
            <Search className="w-4 h-4" />
          </Link>
        </div>

        <div className="flex lg:hidden items-center gap-1">
          <div className="relative">
            <button
              onClick={() => setShowTemas(!showTemas)}
              className="p-2 text-muted-foreground hover:text-foreground transition-all duration-300"
              aria-label="Temas"
            >
              <span className="text-base leading-none">{temasDisponiveis.find(t => t.nome === tema)?.icone || '🌙'}</span>
            </button>
            <AnimatePresence>
              {showTemas && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.96 }}
                  transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="absolute top-full right-0 mt-1 w-44 bg-card border border-border rounded-xl shadow-xl py-1 z-50"
                >
                  {temasDisponiveis.map((t) => (
                    <button
                      key={t.nome}
                      onClick={() => { setTema(t.nome); setShowTemas(false); }}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-all duration-200 ${
                        tema === t.nome
                          ? 'text-primary bg-primary/10 font-medium'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                      }`}
                    >
                      <span className="text-base">{t.icone}</span>
                      <span>{t.label}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <button 
            className="p-2 hover:bg-muted/50 rounded-lg transition-all duration-300" 
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="lg:hidden border-t border-border/40 bg-background/95 backdrop-blur-xl overflow-hidden"
          >
            <nav className="flex flex-col px-6 py-4 gap-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <Link
                    href={link.href}
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
              {moreLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (navLinks.length + i) * 0.04 }}
                >
                  <Link
                    href={link.href}
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
        )}
      </AnimatePresence>
    </header>
  );
}
