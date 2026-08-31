'use client';

import { useState, useEffect, useCallback, useRef, useMemo, memo } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { authService } from '@/lib/auth';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { BuscaGlobal } from '@/components/BuscaGlobal';
import { getStats } from '@/lib/estatisticas';
import { usePWA } from '@/hooks/usePWA';
import { HeaderLogo } from '@/components/header/HeaderLogo';
import { HeaderNav } from '@/components/header/HeaderNav';
import { HeaderSearch } from '@/components/header/HeaderSearch';
import { HeaderUserMenu } from '@/components/header/HeaderUserMenu';
import { HeaderMobileMenu } from '@/components/header/HeaderMobileMenu';
import { Map, History, User, Calendar, Heart, HelpCircle, ScrollText, Languages, MessageCircle, Library, BookOpen, BookMarked, Search, Compass, Users } from 'lucide-react';

type LucideIcon = typeof BookOpen;

interface NavLinkSpec {
  href: string;
  label: string;
  icon: LucideIcon;
}

const navLinksStatic: NavLinkSpec[] = [
  { href: '/biblia', label: 'nav.bible', icon: BookOpen },
  { href: '/estudar', label: 'nav.study', icon: Search },
  { href: '/biblioteca', label: 'nav.library', icon: Library },
  { href: '/teologia', label: 'nav.theology', icon: BookMarked },
];

interface NavGroup {
  titulo: string;
  links: NavLinkSpec[];
}

const maisGrupos: NavGroup[] = [
  {
    titulo: 'header.biblicalContext',
    links: [
      { href: '/historia', label: 'header.history', icon: ScrollText },
      { href: '/cronologia', label: 'header.chronology', icon: History },
      { href: '/personagens', label: 'header.characters', icon: User },
      { href: '/atlas', label: 'header.biblicalAtlas', icon: Map },
    ],
  },
  {
    titulo: 'header.practice',
    links: [
      { href: '/planos', label: 'header.readingPlans', icon: Calendar },
      { href: '/estudo-colaborativo', label: 'footer.collaborativeStudy', icon: Users },
      { href: '/devocional', label: 'header.devotional', icon: Heart },
      { href: '/flashcards', label: 'header.flashcards', icon: BookMarked },
      { href: '/quiz', label: 'header.biblicalQuiz', icon: HelpCircle },
      { href: '/ofertas', label: 'header.give', icon: Heart },
    ],
  },
  {
    titulo: 'header.compareAndAnalyze',
    links: [
      { href: '/exegese', label: 'header.exegesis', icon: ScrollText },
      { href: '/guia', label: 'header.passageGuide', icon: Compass },
      { href: '/historico', label: 'header.readingHistory', icon: History },
      { href: '/comparar', label: 'header.compareTranslations', icon: Languages },
      { href: '/comparar-comentarios', label: 'header.commentaries', icon: MessageCircle },
      { href: '/pesquisa', label: 'nav.search', icon: Search },
      { href: '/idiomas', label: 'nav.languages', icon: Languages },
    ],
  },
];

function HeaderInner() {
  const [open, setOpen] = useState(false);
  const [buscaOpen, setBuscaOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hasDailyChallenge, setHasDailyChallenge] = useState(false);
  const [headerSearchValue, setHeaderSearchValue] = useState('');
  const [headerSearchFocused, setHeaderSearchFocused] = useState(false);
  const [pendingSearchQuery, setPendingSearchQuery] = useState('');
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);
  const [temAcessoTotal, setTemAcessoTotal] = useState(false);
  const { isAutenticado, logout } = useAuth();
  const { i18n, t } = useTranslation();
  const pathname = usePathname();
  const router = useRouter();
  const [currentLivro, setCurrentLivro] = useState<string | null>(null);

  const navLinks = useMemo(() => navLinksStatic.map(l => ({
    ...l,
    label: t(l.label),
  })), [t]);
  const [idioma, setIdioma] = useState<'pt' | 'en'>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('ssb_lang') as 'pt' | 'en') || 'pt';
    }
    return 'pt';
  });
  const { isInstallable, install } = usePWA();

  const toggleIdioma = useCallback(() => {
    const novo = idioma === 'pt' ? 'en' : 'pt';
    setIdioma(novo);
    i18n.changeLanguage(novo);
    localStorage.setItem('ssb_lang', novo);
  }, [idioma, i18n]);

  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    setCurrentLivro(new URLSearchParams(window.location.search).get('livro'));
    setHidden(false);
    const stats = getStats();
    setXp(stats.totalChapters * 50 + stats.streak * 10);
    setStreak(stats.streak);
    const today = new Date().toDateString();
    const lastQuiz = localStorage.getItem('ssb_last_quiz_date');
    setHasDailyChallenge(lastQuiz !== today);
  }, [pathname]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const atualizar = () => setTemAcessoTotal(authService.temAcessoTotal());
    atualizar();
    const unsub = authService.subscribe(atualizar);
    return unsub;
  }, []);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 120) {
      setHidden(true);
    } else if (latest < previous) {
      setHidden(false);
    }
  });

  const [isRouteLoading, setIsRouteLoading] = useState(false);
  const prevPathnameRef = useRef(pathname);
  useEffect(() => {
    if (prevPathnameRef.current !== pathname) {
      prevPathnameRef.current = pathname;
      setIsRouteLoading(true);
      const timeout = setTimeout(() => setIsRouteLoading(false), 700);
      return () => clearTimeout(timeout);
    }
  }, [pathname]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const handleLogout = async () => {
    await logout();
    setOpen(false);
  };

  const handleHeaderSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = headerSearchValue.trim();
    if (!q) {
      setBuscaOpen(true);
      return;
    }
    setPendingSearchQuery(q);
    setBuscaOpen(true);
    setHeaderSearchValue('');
  };

  const handleQuickBook = (livro: string) => {
    router.push(`/biblia?livro=${livro}&capitulo=1`);
  };

  return (
    <>
      <BuscaGlobal open={buscaOpen} onOpenChange={setBuscaOpen} initialQuery={pendingSearchQuery} />
      <motion.header
        animate={{ y: hidden ? '-100%' : '0%' }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`ssb-header fixed top-0 w-full z-50 transition-shadow duration-300 ${
          scrolled
            ? 'border-b border-border/80 shadow-[0_1px_0_hsl(var(--primary)/0.12)]'
            : 'border-b border-transparent'
        }`}
      >
        <AnimatePresence>
          {isRouteLoading && (
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-[1.5px] overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              aria-hidden="true"
            >
              <motion.div
                className="h-full w-1/3 bg-gradient-to-r from-transparent via-primary to-transparent"
                animate={{ x: ['-100%', '400%'] }}
                transition={{ duration: 0.9, ease: 'easeInOut', repeat: Infinity }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-3">
          <HeaderLogo />

          <HeaderNav
            navLinks={navLinks}
            maisGrupos={maisGrupos}
            hasDailyChallenge={hasDailyChallenge}
            onQuickBook={handleQuickBook}
            currentLivro={currentLivro}
          />

          <HeaderSearch
            headerSearchValue={headerSearchValue}
            headerSearchFocused={headerSearchFocused}
            onSearchValueChange={setHeaderSearchValue}
            onFocusChange={setHeaderSearchFocused}
            onSubmit={handleHeaderSearchSubmit}
          />

          <HeaderUserMenu
            idioma={idioma}
            onToggleIdioma={toggleIdioma}
            onOpenBusca={() => setBuscaOpen(true)}
            onLogout={handleLogout}
            xp={xp}
            streak={streak}
            temAcessoTotal={temAcessoTotal}
            isInstallable={isInstallable}
            onInstall={install}
          />

          <HeaderMobileMenu
            open={open}
            setOpen={setOpen}
            navLinks={navLinks}
            maisGrupos={maisGrupos}
            hasDailyChallenge={hasDailyChallenge}
            headerSearchValue={headerSearchValue}
            onSearchValueChange={setHeaderSearchValue}
            onSubmit={handleHeaderSearchSubmit}
            onLogout={handleLogout}
            xp={xp}
            streak={streak}
          />
        </div>
      </motion.header>
    </>
  );
}

export const Header = memo(HeaderInner);
