'use client';

import { useState, useEffect, memo, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import {
  Home,
  BookOpen,
  GraduationCap,
  Search,
  MoreHorizontal,
  X,
  ScrollText,
  Brain,
  Map,
  BookMarked,
  Globe,
  Heart,
  Languages,
  Wrench,
  Tag,
  GitBranch,
  Calendar,
  HelpCircle,
  BarChart3,
  MessageCircle,
  ChevronDown,
} from 'lucide-react';

interface TabItem {
  href: string;
  label: string;
  icon: typeof Home;
}

interface ExtraLink {
  href: string;
  label: string;
  icon: typeof Globe;
}

interface NavGroup {
  titulo: string;
  links: ExtraLink[];
}

function BottomNavBarInner() {
  const { t } = useTranslation();
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [hidden, setHidden] = useState(false);

  const tabs: TabItem[] = useMemo(() => [
    { href: '/', label: t('bottomBar.home'), icon: Home },
    { href: '/biblia', label: t('bottomBar.bible'), icon: BookOpen },
    { href: '/seminario', label: t('bottomBar.seminary', 'Seminário'), icon: GraduationCap },
    { href: '/pesquisa', label: t('bottomBar.search'), icon: Search },
    { href: '#more', label: t('bottomBar.more'), icon: MoreHorizontal },
  ], [t]);

  const grupos: NavGroup[] = useMemo(() => [
    {
      titulo: t('bottomBar.groupFerramentas'),
      links: [
        { href: '/idiomas', label: t('bottomBar.languages'), icon: Languages },
        { href: '/referencias', label: t('bottomBar.references'), icon: GitBranch },
        { href: '/topicos', label: t('bottomBar.topics'), icon: Tag },
        { href: '/ferramentas', label: t('bottomBar.tools'), icon: Wrench },
      ],
    },
    {
      titulo: t('bottomBar.groupContext'),
      links: [
        { href: '/historia', label: t('bottomBar.history'), icon: Globe },
        { href: '/cronologia', label: t('bottomBar.chronology'), icon: ScrollText },
        { href: '/personagens', label: t('bottomBar.characters'), icon: Heart },
        { href: '/atlas', label: t('bottomBar.atlas'), icon: Map },
      ],
    },
    {
      titulo: t('bottomBar.groupPractice'),
      links: [
        { href: '/estudos', label: t('bottomBar.studies'), icon: BookOpen },
        { href: '/planos', label: t('bottomBar.plans'), icon: Calendar },
        { href: '/devocional', label: t('bottomBar.devotional'), icon: Heart },
        { href: '/flashcards', label: t('bottomBar.flashcards'), icon: BookMarked },
      ],
    },
    {
      titulo: t('bottomBar.groupStudy'),
      links: [
        { href: '/quiz', label: t('bottomBar.quizzes'), icon: HelpCircle },
        { href: '/comunidade', label: t('bottomBar.community'), icon: MessageCircle },
        { href: '/ia', label: t('bottomBar.aiAssistant'), icon: Brain },
        { href: '/dashboard', label: t('bottomBar.statistics'), icon: BarChart3 },
      ],
    },
  ], [t]);

  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setExpandedGroups(Object.fromEntries(grupos.map((g) => [g.titulo, true])));
  }, [grupos]);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

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
  }, [pathname]);

  const toggleMore = useCallback(() => setShowMore((s) => !s), []);
  const closeMore = useCallback(() => setShowMore(false), []);

  const toggleGroup = useCallback((titulo: string) => {
    setExpandedGroups((prev) => ({ ...prev, [titulo]: !prev[titulo] }));
  }, []);

  if (!isMobile) return null;

  const isMoreActive = pathname && grupos.some((g) => g.links.some((l) => pathname.startsWith(l.href)));

  return (
    <>
      {/* Menu "Mais" overlay */}
      {showMore && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-[60] animate-[fadeIn_0.15s_ease-out]"
            onClick={closeMore}
          />
          <div
            className="fixed bottom-[calc(60px+env(safe-area-inset-bottom,0px))] left-2 right-2 z-[61] bg-card border border-border rounded-xl shadow-xl overflow-hidden animate-[slideUp_0.2s_ease-out]"
            role="dialog"
            aria-modal="true"
            aria-label="Mais opcoes de navegacao"
            style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <span className="text-sm font-semibold">{t('nav.more')}</span>
              <button
                onClick={closeMore}
                className="p-1 rounded-lg hover:bg-muted transition-colors"
                aria-label="Fechar menu"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="max-h-[60vh] overflow-y-auto">
              {grupos.map((grupo) => {
                const expanded = expandedGroups[grupo.titulo];
                return (
                  <div key={grupo.titulo} className="border-b border-border/30 last:border-b-0">
                    <button
                      onClick={() => toggleGroup(grupo.titulo)}
                      className="w-full flex items-center justify-between px-4 py-2.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60 bg-muted/20 hover:bg-muted/40 transition-colors"
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
                      <div className="grid grid-cols-2 gap-1 p-3">
                        {grupo.links.map((link) => {
                          const active = pathname === link.href || pathname.startsWith(link.href + '/');
                          return (
                            <Link
                              key={link.href}
                              href={link.href}
                              className={`flex items-center gap-2 p-2.5 rounded-lg transition-colors ${
                                active
                                  ? 'bg-primary/10 text-primary'
                                  : 'text-muted-foreground hover:bg-muted/50'
                              }`}
                            >
                              <link.icon className="w-4 h-4" strokeWidth={1.5} />
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

      {/* Barra inferior */}
      <nav
        aria-label="Navegacao mobile"
        className={`fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background/95 backdrop-blur-xl transition-transform duration-300 ${hidden ? 'translate-y-full' : 'translate-y-0'}`}
        style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      >
        <div className="flex items-center justify-around h-[60px]">
          {tabs.map((tab) => {
            const isMore = tab.href === '#more';
            const active = isMore
              ? isMoreActive
              : pathname === tab.href || (tab.href !== '/' && pathname?.startsWith(tab.href));

            if (isMore) {
              return (
                <button
                  key={tab.href}
                  onClick={toggleMore}
                  aria-label="Mais opcoes"
                  aria-expanded={showMore}
                  className={`relative flex flex-col items-center justify-center flex-1 min-h-[44px] py-2 transition-colors ${
                    active ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  <tab.icon className="w-5 h-5 mb-0.5" strokeWidth={active ? 2 : 1.5} />
<span className="text-[11px] font-medium leading-tight">{tab.label}</span>
                  {active && (
                    <div className="absolute top-0 w-8 h-[2px] bg-primary rounded-full" />
                  )}
                </button>
              );
            }

            return (
              <Link
                key={tab.href}
                href={tab.href}
                aria-label={tab.label}
                className={`relative flex flex-col items-center justify-center flex-1 min-h-[44px] py-2 transition-colors ${
                  active ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                <tab.icon className="w-5 h-5 mb-0.5" strokeWidth={active ? 2 : 1.5} />
                <span className="text-[11px] font-medium leading-tight">{tab.label}</span>
                {active && (
                  <div className="absolute top-0 w-8 h-[2px] bg-primary rounded-full" />
                )}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}

export default memo(BottomNavBarInner);
