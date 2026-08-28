'use client';

import { useState, useEffect, memo, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import {
  Home,
  BookOpen,
  Search,
  MoreHorizontal,
  X,
  GraduationCap,
  Languages,
  GitBranch,
  Tag,
  Wrench,
  ScrollText,
  Heart,
  Map,
  Calendar,
  BookMarked,
  HelpCircle,
  ChevronDown,
  Users,
  Compass,
  History,
} from 'lucide-react';

interface TabItem {
  href: string;
  label: string;
  icon: typeof Home;
}

interface ExtraLink {
  href: string;
  label: string;
  icon: typeof Home;
}

interface NavGroup {
  titulo: string;
  links: ExtraLink[];
}

function BottomNavBarInner() {
  const { t } = useTranslation();
  const pathname = usePathname();
  const [showMore, setShowMore] = useState(false);
  const [hidden, setHidden] = useState(false);

  const tabs: TabItem[] = useMemo(() => [
    { href: '/', label: t('bottomBar.home'), icon: Home },
    { href: '/biblia', label: t('bottomBar.bible'), icon: BookOpen },
    { href: '/estudar', label: t('bottomBar.study', 'Estudar'), icon: Search },
    { href: '/biblioteca', label: t('bottomBar.library', 'Biblioteca'), icon: BookMarked },
    { href: '#more', label: t('bottomBar.more'), icon: MoreHorizontal },
  ], [t]);

  const grupos: NavGroup[] = useMemo(() => [
    {
      titulo: t('bottomBar.groupBibleTools', 'Ferramentas Bíblicas'),
      links: [
        { href: '/idiomas', label: t('bottomBar.languages'), icon: Languages },
        { href: '/referencias', label: t('bottomBar.references'), icon: GitBranch },
        { href: '/harmonia', label: t('bottomBar.harmony', 'Harmonia'), icon: GitBranch },
        { href: '/comparar', label: t('bottomBar.compare', 'Comparar'), icon: BookOpen },
      ],
    },
    {
      titulo: t('bottomBar.groupContext', 'Contexto & História'),
      links: [
        { href: '/historia', label: t('bottomBar.history'), icon: ScrollText },
        { href: '/cronologia', label: t('bottomBar.chronology'), icon: Calendar },
        { href: '/personagens', label: t('bottomBar.characters'), icon: Heart },
        { href: '/atlas', label: t('bottomBar.atlas'), icon: Map },
      ],
    },
    {
      titulo: t('bottomBar.groupDeep', 'Aprofundar'),
      links: [
        { href: '/teologia', label: t('bottomBar.theology', 'Teologia'), icon: BookMarked },
        { href: '/guia', label: t('bottomBar.passageGuide', 'Guia da passagem'), icon: Compass },
        { href: '/historico', label: t('bottomBar.historyRead', 'Histórico'), icon: History },
        { href: '/ferramentas', label: t('bottomBar.tools'), icon: Wrench },
        { href: '/topicos', label: t('bottomBar.topics'), icon: Tag },
        { href: '/estudos', label: t('bottomBar.studies'), icon: GraduationCap },
      ],
    },
    {
      titulo: t('bottomBar.groupPractice', 'Prática'),
      links: [
        { href: '/planos', label: t('bottomBar.plans'), icon: Calendar },
        { href: '/devocional', label: t('bottomBar.devotional'), icon: Heart },
        { href: '/flashcards', label: t('bottomBar.flashcards'), icon: BookMarked },
        { href: '/quiz', label: t('bottomBar.quizzes'), icon: HelpCircle },
        { href: '/social', label: t('bottomBar.social', 'Social'), icon: Users },
      ],
    },
  ], [t]);

  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setExpandedGroups(Object.fromEntries(grupos.map((g) => [g.titulo, true])));
  }, [grupos]);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const onScroll = () => {
      const currentY = window.scrollY;
      if (currentY > 100 && currentY > lastScrollY) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY = currentY;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setShowMore(false);
    setHidden(false);
  }, [pathname]);

  const toggleMore = useCallback(() => setShowMore((s) => !s), []);
  const closeMore = useCallback(() => setShowMore(false), []);

  const toggleGroup = useCallback((titulo: string) => {
    setExpandedGroups((prev) => ({ ...prev, [titulo]: !prev[titulo] }));
  }, []);

  const isMoreActive = pathname && grupos.some((g) => g.links.some((l) => pathname.startsWith(l.href)));
  const isEstudarActive = pathname === '/estudar' || pathname?.startsWith('/estudar/');

  return (
    <>
      {/* Menu "Mais" overlay — Premium glass style */}
      {showMore && (
        <>
          <div
            className="fixed inset-0 bg-foreground/40 z-[60] animate-[fadeIn_0.2s_ease-out] md:hidden"
            onClick={closeMore}
            role="presentation"
          />
          <div
            className="fixed bottom-[calc(64px+env(safe-area-inset-bottom,0px))] left-3 right-3 z-[61] bg-card border border-border rounded-md shadow-lg overflow-hidden animate-[slideUp_0.25s_ease-out] md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label={t('header.moreNavOptions')}
            style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
          >
            {/* Premium header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border/30">
              <div>
                <span className="text-sm font-semibold block">{t('nav.more')}</span>
                <span className="text-[10px] text-muted-foreground">Explore todas as ferramentas</span>
              </div>
              <button
                onClick={closeMore}
                className="p-2 rounded-xl hover:bg-muted/50 transition-colors text-muted-foreground"
                aria-label={t('header.closeMenu')}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            {/* Scrollable content */}
            <div className="max-h-[60vh] overflow-y-auto overscroll-contain">
              {grupos.map((grupo) => {
                const expanded = expandedGroups[grupo.titulo];
                return (
                  <div key={grupo.titulo} className="border-b border-border/20 last:border-b-0">
                    <button
                      onClick={() => toggleGroup(grupo.titulo)}
                      className="w-full flex items-center justify-between px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60 hover:bg-muted/30 transition-colors"
                      aria-expanded={expanded}
                    >
                      <span>{grupo.titulo}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          expanded ? 'rotate-0' : '-rotate-90'
                        }`}
                      />
                    </button>
                    {expanded && (
                      <div className="grid grid-cols-2 gap-1.5 p-3 pt-0">
                        {grupo.links.map((link) => {
                          const active = pathname === link.href || pathname.startsWith(link.href + '/');
                          return (
                            <Link
                              key={link.href}
                              href={link.href}
                              aria-label={link.label}
                              className={`flex items-center gap-2.5 p-3 rounded-xl transition-all duration-200 ${
                                active
                                  ? 'bg-primary/10 text-primary shadow-sm'
                                  : 'text-muted-foreground hover:bg-muted/50 active:scale-[0.97]'
                              }`}
                            >
                              <link.icon className={`w-4 h-4 ${active ? 'text-primary' : 'text-muted-foreground/60'}`} strokeWidth={1.5} />
                              <span className="text-[12px] font-medium">{link.label}</span>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}

      {/* Barra inferior — Premium iOS-style */}
      <nav
        aria-label={t('header.mobileNav')}
        className={`fixed bottom-0 left-0 right-0 z-40 transition-transform duration-300 md:hidden ${hidden ? 'translate-y-full' : 'translate-y-0'}`}
        style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      >
        <div className="relative border-t border-border/80 bg-background/90 backdrop-blur-xl">
          {/* Subtle top glow */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
          
          <div className="flex items-center justify-around h-[64px] px-2">
            {tabs.map((tab) => {
              const isMore = tab.href === '#more';
              const active = isMore
                ? isMoreActive
                : tab.href === '/estudar'
                  ? isEstudarActive
                  : pathname === tab.href || (tab.href !== '/' && pathname?.startsWith(tab.href));

              if (isMore) {
                return (
                  <button
                    key={tab.href}
                    onClick={toggleMore}
                    aria-label={t('header.more')}
                    aria-expanded={showMore}
                    className={`relative flex flex-col items-center justify-center flex-1 min-h-[48px] py-2 rounded-2xl transition-all duration-200 ${
                      active 
                        ? 'text-primary bg-primary/[0.08]' 
                        : 'text-muted-foreground active:bg-muted/50'
                    }`}
                  >
                    <div className="relative">
                      <tab.icon className="w-5 h-5 mb-0.5" strokeWidth={active ? 2 : 1.5} />
                    </div>
                    <span className={`text-[10px] font-medium leading-tight mt-0.5 transition-all duration-200 ${active ? 'font-semibold' : ''}`}>{tab.label}</span>
                  </button>
                );
              }

              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  aria-label={tab.label}
                  className={`relative flex flex-col items-center justify-center flex-1 min-h-[48px] py-2 rounded-2xl transition-all duration-200 ${
                    active 
                      ? 'text-primary bg-primary/[0.08]' 
                      : 'text-muted-foreground active:bg-muted/50'
                  }`}
                >
                  <tab.icon className="w-5 h-5 mb-0.5" strokeWidth={active ? 2 : 1.5} />
                  <span className={`text-[10px] font-medium leading-tight mt-0.5 transition-all duration-200 ${active ? 'font-semibold' : ''}`}>{tab.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </>
  );
}

export default memo(BottomNavBarInner);
