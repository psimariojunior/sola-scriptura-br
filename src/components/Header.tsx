'use client';

import Link from 'next/link';
import { useState, useEffect, useCallback, useRef, useMemo, memo } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import {
  Menu, X, BookOpen, Search, Sun, Moon, User, LogOut, Languages, BookMarked,
  Command, Settings, ChevronDown, ScrollText, Brain, Map,
  Sparkles, GraduationCap, MessageCircle, Library, Crown, Heart, History, HelpCircle, Download,
  Users, Target, BarChart3, GitBranch, Calendar, Tag, RotateCw, Hash,
} from 'lucide-react';
import { useTema, type TemaNome } from '@/lib/temas';
import { authService } from '@/lib/auth';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { BuscaGlobal } from '@/components/BuscaGlobal';
import { NotificationCenter } from '@/components/NotificationCenter';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { getStats } from '@/lib/estatisticas';
import { LIVROS_AT, LIVROS_NT } from '@/data/biblia/livros';
import { usePWA } from '@/hooks/usePWA';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type LucideIcon = typeof BookOpen;

interface NavLinkSpec {
  href: string;
  label: string;
  icon: LucideIcon;
}

const navLinksStatic: NavLinkSpec[] = [
  { href: '/biblia', label: 'nav.bible', icon: BookOpen },
  { href: '/pesquisa', label: 'nav.search', icon: Search },
  { href: '/seminario', label: 'nav.seminary', icon: GraduationCap },
  { href: '/teologia', label: 'nav.theology', icon: Library },
  { href: '/estudos', label: 'nav.myStudies', icon: BookOpen },
  { href: '/ia', label: 'nav.ai', icon: Brain },
];

interface NavGroup {
  titulo: string;
  links: NavLinkSpec[];
}

const maisGrupos: NavGroup[] = [
  {
    titulo: 'header.tools',
    links: [
      { href: '/idiomas', label: 'header.originalLanguage', icon: Languages },
      { href: '/referencias', label: 'header.crossReferences', icon: GitBranch },
      { href: '/topicos', label: 'header.topicalIndex', icon: Tag },
      { href: '/ferramentas', label: 'header.tools', icon: Sparkles },
    ],
  },
  {
    titulo: 'header.biblicalContext',
    links: [
      { href: '/historia', label: 'header.history', icon: Map },
      { href: '/cronologia', label: 'header.chronology', icon: History },
      { href: '/personagens', label: 'header.characters', icon: User },
      { href: '/atlas', label: 'header.biblicalAtlas', icon: Map },
      { href: '/explorador', label: 'header.conceptExplorer', icon: Sparkles },
    ],
  },
  {
    titulo: 'header.practice',
    links: [
      { href: '/planos', label: 'header.readingPlans', icon: Calendar },
      { href: '/devocional', label: 'header.devotional', icon: Heart },
      { href: '/flashcards', label: 'header.flashcards', icon: BookMarked },
      { href: '/memorizacao', label: 'header.memorization', icon: Brain },
      { href: '/ofertas', label: 'header.give', icon: Heart },
    ],
  },
  {
    titulo: 'header.compareAndAnalyze',
    links: [
      { href: '/exegese', label: 'header.exegesis', icon: ScrollText },
      { href: '/comparar', label: 'header.compareTranslations', icon: Languages },
      { href: '/comparar-comentarios', label: 'header.commentaries', icon: MessageCircle },
      { href: '/relacoes', label: 'header.biblicalRelations', icon: Users },
      { href: '/textos-extrabiblicos', label: 'Textos Extrabíblicos', icon: ScrollText },
    ],
  },
  {
    titulo: 'header.communityAndProgress',
    links: [
      { href: '/dashboard', label: 'header.myDashboard', icon: BarChart3 },
      { href: '/comunidade', label: 'header.community', icon: MessageCircle },
      { href: '/quiz', label: 'header.biblicalQuiz', icon: HelpCircle },
      { href: '/desafios', label: 'header.challenges', icon: Target },
      { href: '/sermon-builder', label: 'Gerador de Sermão', icon: Sparkles },
      { href: '/relatorio-exegese', label: 'Relatório Exegético', icon: ScrollText },
      { href: '/mapa-ocorrencias', label: 'Mapa de Ocorrências', icon: Hash },
    ],
  },
  {
    titulo: 'Modo Imersão',
    links: [
      { href: '/imersao', label: 'Modo Imersão', icon: BookOpen },
    ],
  },
];

const temaIcons: Record<string, React.ReactNode> = {
  light: <Sun className="w-4 h-4" />,
  escuro: <Moon className="w-4 h-4" />,
  sepia: <BookOpen className="w-4 h-4" />,
  noturno: <Moon className="w-4 h-4" strokeWidth={1.5} />,
  dim: <Moon className="w-4 h-4" strokeWidth={1} />,
  auto: <RotateCw className="w-4 h-4" />,
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
  const { usuario, isAutenticado, isAdmin, logout } = useAuth();
  const { tema, setTema, temasDisponiveis } = useTema();
  const { i18n, t } = useTranslation();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentLivro = searchParams.get('livro');
  const headerSearchRef = useRef<HTMLInputElement>(null);

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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
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

  const [hidden, setHidden] = useState(false);
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

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  const handleLogout = async () => {
    await logout();
    setOpen(false);
  };

  const userInitial = usuario?.nome?.charAt(0)?.toUpperCase() || '?';

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

  const isMoreActive = useMemo(
    () => maisGrupos.some((g) => g.links.some((l) => isActive(l.href))),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pathname]
  );

  return (
    <>
      <BuscaGlobal open={buscaOpen} onOpenChange={setBuscaOpen} initialQuery={pendingSearchQuery} />
      <motion.header
        animate={{ y: hidden ? '-100%' : '0%' }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-background/92 backdrop-blur-2xl border-b border-border/40 shadow-[0_1px_8px_rgba(0,0,0,0.06)]'
            : 'bg-background/60 backdrop-blur-xl border-b border-transparent'
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
          {/* Logo */}
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

          {/* Nav (lg+) */}
          <nav className="hidden lg:flex items-center gap-0.5 ml-2" aria-label="Navegação principal">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? 'page' : undefined}
                  className={`relative flex items-center gap-1.5 text-[13px] font-medium px-3 py-2 rounded-lg transition-colors duration-300 ${
                    active
                      ? 'text-primary font-semibold'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <span className="relative z-10 flex items-center gap-1.5">
                    {link.label}
                    {link.href === '/quiz' && hasDailyChallenge && <DailyChallengeDot />}
                  </span>
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      className="nav-underline"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}

            {/* Quick book switcher (Bíblia dropdown) */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className={`relative flex items-center gap-1 text-[13px] font-medium px-3 py-2 rounded-lg transition-colors duration-300 ${
                    isActive('/biblia')
                      ? 'text-primary font-semibold'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <span className="relative z-10 flex items-center gap-1">
                    <ChevronDown className="w-3 h-3" />
                  </span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-[min(640px,calc(100vw-2rem))] p-0" sideOffset={8}>
                <QuickBookSwitcher onSelect={handleQuickBook} activeBook={currentLivro} />
              </DropdownMenuContent>
            </DropdownMenu>

            {/* "Mais" dropdown — grouped navigation */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className={`relative flex items-center gap-1 text-[13px] font-medium px-3 py-2 rounded-lg transition-colors duration-300 ${
                    isMoreActive
                      ? 'text-primary font-semibold'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <span className="relative z-10 flex items-center gap-1">
                    {t('header.more')}
                    <ChevronDown className="w-3 h-3" />
                  </span>
                  {isMoreActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="nav-underline"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[min(520px,calc(100vw-1rem))] p-2" sideOffset={8}>
                {maisGrupos.map((grupo) => (
                  <div key={grupo.titulo} className="mb-2">
                    <div className="px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60">
                      {t(grupo.titulo)}
                    </div>
                    <div className="grid grid-cols-2 gap-0.5">
                      {grupo.links.map((link) => {
                        const Icon = link.icon;
                        const active = isActive(link.href);
                        return (
                          <DropdownMenuItem key={link.href} asChild>
                            <Link
                              href={link.href}
                              aria-current={active ? 'page' : undefined}
                              className={`flex items-center gap-2.5 cursor-pointer rounded-lg px-2.5 py-2 ${
                                active
                                  ? 'bg-primary/10 text-primary font-semibold'
                                  : 'text-foreground'
                              }`}
                            >
                              <span className="w-7 h-7 rounded-md bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                <Icon className="w-3.5 h-3.5" strokeWidth={1.75} />
                              </span>
                              <span className="text-[13px] font-medium leading-tight">{t(link.label)}</span>
                            </Link>
                          </DropdownMenuItem>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* Inline search bar (lg+) */}
          <form
            onSubmit={handleHeaderSearchSubmit}
            className="hidden lg:block flex-1 max-w-md mx-2 relative"
            role="search"
          >
            <Search
              className={`pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-300 ${
                headerSearchFocused ? 'text-primary' : 'text-muted-foreground/60'
              }`}
              aria-hidden="true"
            />
            <input
              ref={headerSearchRef}
              type="search"
              value={headerSearchValue}
              onChange={(e) => setHeaderSearchValue(e.target.value)}
              onFocus={() => setHeaderSearchFocused(true)}
              onBlur={() => setHeaderSearchFocused(false)}
              placeholder={t('header.searchPlaceholder')}
              aria-label={t('common.search')}
              className="header-search"
            />
            <kbd className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 hidden xl:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground/70 border border-border/40 rounded bg-muted/30">
              <Command className="w-2.5 h-2.5" />K
            </kbd>
          </form>

          {/* Right cluster */}
          <div className="hidden lg:flex items-center gap-1.5 ml-auto">
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={toggleIdioma}
                  className="px-2.5 py-1.5 text-xs font-semibold rounded-lg border border-border hover:bg-muted/50 transition-all duration-300 uppercase tracking-wider"
                  aria-label={idioma === 'pt' ? 'Mudar idioma para inglês' : 'Mudar idioma para português'}
                >
                  {idioma === 'pt' ? 'EN' : 'PT'}
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{idioma === 'pt' ? t('header.switchToEnglish') : 'Switch to Portuguese'}</p>
              </TooltipContent>
            </Tooltip>

            {isAdmin && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href="/admin"
                    className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-amber-600 dark:text-amber-400 hover:bg-amber-500/10 rounded-lg transition-all duration-300 font-medium"
                    aria-label={t('header.adminPanel')}
                  >
                    <Settings className="w-3.5 h-3.5" />
                    <span>Admin</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{t('header.adminPanel')}</p>
                </TooltipContent>
              </Tooltip>
            )}

            {isAutenticado ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        className="relative flex items-center gap-2 px-1.5 py-1 rounded-lg hover:bg-muted/50 transition-all duration-300"
                        aria-label="Menu da conta"
                      >
                        <span className="relative inline-flex">
                          <span className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center text-sm font-semibold text-primary">
                            {userInitial}
                          </span>
                          <span className="avatar-online-dot" aria-hidden="true" />
                        </span>
                        <span className="text-sm font-medium max-w-[120px] truncate">
                          {usuario?.nome?.split(' ')[0] || 'Conta'}
                        </span>
                        {temAcessoTotal && (
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 text-[10px] font-semibold shrink-0">
                            <Crown className="w-2.5 h-2.5" /> Total
                          </span>
                        )}
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-60">
                      <DropdownMenuLabel>
                        <div className="flex flex-col gap-0.5">
                          <span className="font-semibold text-sm">{usuario?.nome}</span>
                          <span className="text-[11px] text-muted-foreground font-normal">
                            {usuario?.email}
                          </span>
                          <div className="flex items-center gap-2 mt-1.5 text-[10px] text-muted-foreground">
                            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-primary/10 text-primary font-semibold">
                              <Sparkles className="w-2.5 h-2.5" /> {xp} XP
                            </span>
                            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 font-semibold">
                              🔥 {streak} dias
                            </span>
                          </div>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/conta" className="flex items-center gap-2 cursor-pointer">
                          <User className="w-4 h-4" />
                          {t('header.myAccount')}
                        </Link>
                      </DropdownMenuItem>
                      {isAdmin && (
                        <DropdownMenuItem asChild>
                          <Link href="/admin" className="flex items-center gap-2 cursor-pointer">
                            <Settings className="w-4 h-4" />
                            {t('header.adminPanel')}
                          </Link>
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={handleLogout}
                        className="flex items-center gap-2 cursor-pointer text-destructive focus:text-destructive"
                      >
                        <LogOut className="w-4 h-4" />
                        {t('header.signOut')}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <div className="text-center">
                    <p className="font-semibold text-xs">{usuario?.nome}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">
                      {xp} XP · 🔥 {streak} dias
                    </p>
                  </div>
                </TooltipContent>
              </Tooltip>
            ) : (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href="/auth/login"
                    className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-all duration-300"
                    aria-label={t('header.signInTooltip')}
                  >
                    <User className="w-4 h-4" />
                    <span>{t('header.signIn')}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{t('header.signInTooltip')}</p>
                </TooltipContent>
              </Tooltip>
            )}

            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/ofertas"
                  className="flex items-center gap-1 px-2 py-1.5 text-xs font-medium text-amber-500 hover:text-amber-400 rounded-lg transition-colors duration-300"
                  aria-label={t('header.support')}
                >
                  <Heart className="w-3.5 h-3.5 fill-current" />
                  <span>{t('header.support')}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>{t('header.supportTooltip')}</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-all duration-300"
                    aria-label={t('header.themes')}
                  >
                    {temaIcons[tema] || <Moon className="w-4 h-4" />}
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-44">
                  <DropdownMenuLabel>{t('header.themes')}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {temasDisponiveis.map((t) => (
                      <DropdownMenuItem
                        key={t.nome}
                        onClick={() => setTema(t.nome as TemaNome)}
                        className={tema === t.nome ? 'text-primary bg-primary/10 font-medium' : ''}
                      >
                        <span className="mr-2">{temaIcons[t.nome]}</span>
                        {t.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TooltipTrigger>
              <TooltipContent>
                <p>Tema: {temasDisponiveis.find((t) => t.nome === tema)?.label}</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => setBuscaOpen(true)}
                  className="p-2 lg:hidden text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-all duration-300"
                  aria-label={t('header.openSearch')}
                >
                  <Search className="w-4 h-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{t('header.searchTooltip')}</p>
              </TooltipContent>
            </Tooltip>
          </div>

          {/* Mobile actions */}
          <div className="flex lg:hidden items-center gap-1 ml-auto">
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={toggleIdioma}
                  className="px-2.5 py-2 min-h-[40px] text-[11px] font-semibold rounded-lg border border-border hover:bg-muted/50 transition-all duration-300 uppercase tracking-wider"
                  aria-label={idioma === 'pt' ? t('header.changeLangToEnglish') : t('header.changeLangToPortuguese')}
                >
                  {idioma === 'pt' ? 'EN' : 'PT'}
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{idioma === 'pt' ? t('header.switchToEnglish') : 'Switch to Portuguese'}</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => setBuscaOpen(true)}
                  className="p-2.5 min-h-[40px] min-w-[40px] hover:bg-muted/50 rounded-lg transition-all duration-300"
                  aria-label={t('common.search')}
                >
                  <Search className="w-5 h-5" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{t('header.searchTooltip')}</p>
              </TooltipContent>
            </Tooltip>
            <NotificationCenter />
            {isAutenticado && (
              <Link href="/conta" className="relative inline-flex">
                <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center text-sm font-semibold text-primary mr-1">
                  {userInitial}
                </div>
                <span className="avatar-online-dot" aria-hidden="true" />
              </Link>
            )}
            {isInstallable && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={install}
                    className="p-2.5 min-h-[40px] min-w-[40px] hover:bg-muted/50 rounded-lg transition-all duration-300 text-primary"
                    aria-label={t('header.installApp')}
                  >
                    <Download className="w-5 h-5" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{t('header.installAppTooltip')}</p>
                </TooltipContent>
              </Tooltip>
            )}
            <button
              className="mobile-hamburger p-2.5 min-h-[40px] min-w-[40px] hover:bg-muted/50 rounded-lg transition-all duration-300"
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? t('header.closeNavMenu') : t('header.openNavMenu')}
            >
              <motion.span
                animate={open ? { rotate: 90 } : { rotate: 0 }}
                transition={{ duration: 0.2 }}
                className="block"
              >
                {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </motion.span>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <>
              <motion.div
                className="fixed inset-0 bg-black/60 lg:hidden z-[55]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setOpen(false)}
              />
              <motion.div
                id="mobile-menu"
                role="navigation"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="lg:hidden border-t border-border bg-card overflow-hidden relative z-[56] shadow-lg"
              >
                <nav
                  className="flex flex-col px-5 py-4 gap-1 max-h-[75vh] overflow-y-auto"
                  aria-label={t('header.mobileNav')}
                >
                  {/* Mobile search */}
                  <form onSubmit={handleHeaderSearchSubmit} className="relative mb-2" role="search">
                    <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
                    <input
                      type="search"
                      value={headerSearchValue}
                      onChange={(e) => setHeaderSearchValue(e.target.value)}
                      placeholder={t('common.searchPlaceholder')}
                      aria-label={t('common.search')}
                      className="header-search"
                    />
                  </form>

                  {navLinks.map((link, i) => {
                    const Icon = link.icon;
                    const active = isActive(link.href);
                    return (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04, ease: [0.25, 0.46, 0.45, 0.94] }}
                      >
                        <Link
                          href={link.href}
                          aria-current={active ? 'page' : undefined}
                          className={`flex items-center gap-2.5 text-sm font-medium px-3 py-3 min-h-[44px] rounded-lg transition-all ${
                            active
                              ? 'text-primary bg-primary/10 font-semibold'
                              : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                          }`}
                          onClick={() => setOpen(false)}
                        >
                          <Icon className="w-4 h-4" strokeWidth={1.75} />
                          {link.label}
                          {link.href === '/quiz' && hasDailyChallenge && (
                            <span className="ml-auto w-2 h-2 rounded-full bg-primary animate-pulse" />
                          )}
                        </Link>
                      </motion.div>
                    );
                  })}

                  <div className="border-t border-border/30 my-2" />

                  {maisGrupos.map((grupo) => (
                    <div key={grupo.titulo}>
                      <div className="px-3 pt-3 pb-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60">
                        {t(grupo.titulo)}
                      </div>
                      {grupo.links.map((link, i) => {
                        const Icon = link.icon;
                        const active = isActive(link.href);
                        return (
                          <motion.div
                            key={link.href}
                            initial={{ opacity: 0, x: -16 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.04 }}
                          >
                            <Link
                              href={link.href}
                              aria-current={active ? 'page' : undefined}
                              className={`flex items-center gap-2.5 text-sm font-medium px-3 py-2.5 rounded-lg transition-all ${
                                active
                                  ? 'text-primary bg-primary/10 font-semibold'
                                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                              }`}
                              onClick={() => setOpen(false)}
                            >
                              <Icon className="w-4 h-4" strokeWidth={1.75} />
                              {t(link.label)}
                            </Link>
                          </motion.div>
                        );
                      })}
                    </div>
                  ))}

                  <div className="border-t border-border/30 my-2" />

                  {/* Theme switcher - mobile */}
                  <motion.div
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (navLinks.length + maisGrupos.length) * 0.04 }}
                    className="px-3 py-2"
                  >
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/60 mb-2 block">{t('header.theme')}</span>
                    <div className="flex gap-1.5">
                      {temasDisponiveis.map((t) => (
                        <button
                          key={t.nome}
                          onClick={() => setTema(t.nome as TemaNome)}
                          className={`flex-1 flex flex-col items-center gap-1 py-2.5 px-1 rounded-xl text-[11px] font-medium transition-all duration-300 min-h-[44px] ${
                            tema === t.nome
                              ? 'bg-primary/15 text-primary ring-1 ring-primary/30 shadow-sm'
                              : 'text-muted-foreground hover:bg-muted/50 hover:ring-1 hover:ring-border/50'
                          }`}
                          aria-pressed={tema === t.nome}
                        >
                          <span className="text-base">{temaIcons[t.nome]}</span>
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </motion.div>

                  <div className="border-t border-border/30 my-2" />

                  {isAdmin && (
                    <motion.div
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: (navLinks.length + maisGrupos.length) * 0.04 }}
                    >
                      <Link
                        href="/admin"
                        className="flex items-center gap-2 text-sm font-medium text-amber-600 dark:text-amber-400 hover:bg-amber-500/10 px-3 py-3 min-h-[44px] rounded-lg transition-all"
                        onClick={() => setOpen(false)}
                      >
                        <Settings className="w-4 h-4" />
                        {t('header.adminPanel')}
                      </Link>
                    </motion.div>
                  )}

                  {isAutenticado ? (
                    <>
                      <motion.div
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-3 px-3 py-3"
                      >
                        <span className="relative inline-flex">
                          <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center text-base font-semibold text-primary">
                            {userInitial}
                          </div>
                          <span className="avatar-online-dot" aria-hidden="true" />
                        </span>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">{usuario?.nome}</span>
                          <span className="text-[11px] text-muted-foreground">
                            {xp} XP · 🔥 {streak} {t('header.days')}
                          </span>
                        </div>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                      >
                        <Link
                          href="/conta"
                          className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground px-3 py-2.5 rounded-lg hover:bg-muted/50 transition-all"
                          onClick={() => setOpen(false)}
                        >
                          <User className="w-4 h-4" />
                          {t('header.myAccount')}
                        </Link>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                      >
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-2 text-sm font-medium text-destructive hover:bg-destructive/10 px-3 py-2.5 rounded-lg transition-all w-full min-h-[44px]"
                        >
                          <LogOut className="w-4 h-4" />
                          {t('header.signOut')}
                        </button>
                      </motion.div>
                    </>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: (navLinks.length + maisGrupos.length) * 0.04 }}
                    >
                      <Link
                        href="/auth/login"
                        className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground px-3 py-2.5 rounded-lg hover:bg-muted/50 transition-all"
                        onClick={() => setOpen(false)}
                      >
                        <User className="w-4 h-4" />
                        {t('header.signIn')}
                      </Link>
                    </motion.div>
                  )}
                </nav>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}

export const Header = memo(HeaderInner);

function QuickBookSwitcher({
  onSelect,
  activeBook,
}: {
  onSelect: (abrev: string) => void;
  activeBook: string | null;
}) {
  const { t } = useTranslation();
  const [testamento, setTestamento] = useState<'AT' | 'NT'>('AT');
  const [query, setQuery] = useState('');

  const livros = testamento === 'AT' ? LIVROS_AT : LIVROS_NT;
  const livrosFiltrados = useMemo(() => {
    if (!query.trim()) return livros;
    const q = query.toLowerCase();
    return livros.filter(
      (l) => l.nome.toLowerCase().includes(q) || l.abreviacao.toLowerCase().includes(q)
    );
  }, [livros, query]);

  return (
    <div className="flex flex-col max-h-[70vh]">
      <div className="px-3 pt-3 pb-2 flex items-center gap-2 border-b border-border/40">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground/60" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('header.searchBook')}
            aria-label={t('header.searchBook')}
            autoFocus
            className="w-full h-8 pl-8 pr-2 text-xs rounded-md border border-border/60 bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
          />
        </div>
        <div className="flex items-center gap-0.5 p-0.5 rounded-md bg-muted/60 border border-border/40 shrink-0">
          {(['AT', 'NT'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTestamento(t)}
              className={`px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded transition-all ${
                testamento === t
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              aria-pressed={testamento === t}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-y-auto p-2 max-h-[420px]">
        {livrosFiltrados.length === 0 ? (
          <p className="text-xs text-muted-foreground text-center py-6">{t('header.noBooksFound')}</p>
        ) : (
          <div className="grid grid-cols-3 gap-0.5">
            {livrosFiltrados.map((l) => {
              const isActive = activeBook === l.abreviacao;
              return (
                <button
                  key={l.abreviacao}
                  onClick={() => onSelect(l.abreviacao)}
                  className={`book-grid-item justify-start text-left ${
                    isActive ? 'is-active' : ''
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span className="flex-1 min-w-0">
                    <span className="block truncate">{l.nome}</span>
                    <span className="block text-[10px] text-muted-foreground/70 font-mono">
                      {l.abreviacao.toUpperCase()} · {l.totalCapitulos}c
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
