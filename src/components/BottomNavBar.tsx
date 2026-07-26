'use client';

import { useState, useEffect, memo, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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

const tabs: TabItem[] = [
  { href: '/', label: 'Início', icon: Home },
  { href: '/biblia', label: 'Bíblia', icon: BookOpen },
  { href: '/estudos', label: 'Estudos', icon: GraduationCap },
  { href: '/pesquisa', label: 'Pesquisa', icon: Search },
  { href: '#more', label: 'Mais', icon: MoreHorizontal },
];

interface ExtraLink {
  href: string;
  label: string;
  icon: typeof Globe;
}

interface NavGroup {
  titulo: string;
  links: ExtraLink[];
}

const grupos: NavGroup[] = [
  {
    titulo: 'Ferramentas',
    links: [
      { href: '/idiomas', label: 'Línguas', icon: Languages },
      { href: '/referencias', label: 'Referências', icon: GitBranch },
      { href: '/topicos', label: 'Tópicos', icon: Tag },
      { href: '/ferramentas', label: 'Ferramentas', icon: Wrench },
    ],
  },
  {
    titulo: 'Contexto',
    links: [
      { href: '/historia', label: 'História', icon: Globe },
      { href: '/cronologia', label: 'Cronologia', icon: ScrollText },
      { href: '/personagens', label: 'Personagens', icon: Heart },
      { href: '/atlas', label: 'Atlas', icon: Map },
    ],
  },
  {
    titulo: 'Prática',
    links: [
      { href: '/cursos', label: 'Seminário', icon: GraduationCap },
      { href: '/planos', label: 'Planos', icon: Calendar },
      { href: '/devocional', label: 'Devocional', icon: Heart },
      { href: '/flashcards', label: 'Flashcards', icon: BookMarked },
    ],
  },
  {
    titulo: 'Comunidade',
    links: [
      { href: '/quiz', label: 'Quiz', icon: HelpCircle },
      { href: '/comunidade', label: 'Comunidade', icon: MessageCircle },
      { href: '/ia', label: 'IA', icon: Brain },
      { href: '/dashboard', label: 'Dashboard', icon: BarChart3 },
    ],
  },
];

function BottomNavBarInner() {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(grupos.map((g) => [g.titulo, true]))
  );

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
              <span className="text-sm font-semibold">Explorar</span>
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
                  className={`relative flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                    active ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  <tab.icon className="w-5 h-5 mb-1" strokeWidth={active ? 2 : 1.5} />
                  <span className="text-[10px] font-medium">{tab.label}</span>
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
                className={`relative flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                  active ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                <tab.icon className="w-5 h-5 mb-1" strokeWidth={active ? 2 : 1.5} />
                <span className="text-[10px] font-medium">{tab.label}</span>
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
