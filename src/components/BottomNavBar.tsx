'use client';

import { useState, useEffect, memo, useCallback, useMemo } from 'react';
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
  Shield,
  Heart,
  MonitorPlay,
  Languages,
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

const extraLinks: ExtraLink[] = [
  { href: '/teologia', label: 'Teologia', icon: Shield },
  { href: '/historia', label: 'História', icon: Globe },
  { href: '/cronologia', label: 'Cronologia', icon: ScrollText },
  { href: '/personagens', label: 'Personagens', icon: Heart },
  { href: '/atlas', label: 'Atlas', icon: Map },
  { href: '/idiomas', label: 'Línguas', icon: Languages },
  { href: '/exegese', label: 'Exegese', icon: Brain },
  { href: '/comparar', label: 'Comparar', icon: BookMarked },
  { href: '/ferramentas', label: 'Ferramentas', icon: MonitorPlay },
  { href: '/quiz', label: 'Quiz', icon: BookOpen },
  { href: '/flashcards', label: 'Flashcards', icon: BookMarked },
  { href: '/ia', label: 'IA', icon: Brain },
];

function BottomNavBarInner() {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    setShowMore(false);
  }, [pathname]);

  const toggleMore = useCallback(() => setShowMore((s) => !s), []);
  const closeMore = useCallback(() => setShowMore(false), []);

  if (!isMobile) return null;

  const isMoreActive = pathname && extraLinks.some((l) => pathname.startsWith(l.href));

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
              <span className="text-sm font-semibold">Mais opcoes</span>
              <button
                onClick={closeMore}
                className="p-1 rounded-lg hover:bg-muted transition-colors"
                aria-label="Fechar menu"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-4 gap-1 p-3 max-h-[60vh] overflow-y-auto">
              {extraLinks.map((link) => {
                const active = pathname === link.href || pathname.startsWith(link.href + '/');
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex flex-col items-center gap-1.5 p-3 rounded-lg transition-colors ${
                      active
                        ? 'bg-primary/10 text-primary'
                        : 'text-muted-foreground hover:bg-muted/50'
                    }`}
                  >
                    <link.icon className="w-5 h-5" strokeWidth={1.5} />
                    <span className="text-[11px] font-medium text-center leading-tight">
                      {link.label}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </>
      )}

      {/* Barra inferior */}
      <nav
        aria-label="Navegacao mobile"
        className="fixed bottom-0 left-0 right-0 z-[50] border-t border-border bg-[#0A0908]"
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
                    active ? 'text-[#D4A843]' : 'text-gray-500'
                  }`}
                >
                  <tab.icon className="w-5 h-5 mb-1" strokeWidth={active ? 2 : 1.5} />
                  <span className="text-[10px] font-medium">{tab.label}</span>
                  {active && (
                    <div className="absolute bottom-[54px] w-8 h-[2px] bg-[#D4A843] rounded-full" />
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
                  active ? 'text-[#D4A843]' : 'text-gray-500'
                }`}
              >
                <tab.icon className="w-5 h-5 mb-1" strokeWidth={active ? 2 : 1.5} />
                <span className="text-[10px] font-medium">{tab.label}</span>
                {active && (
                  <div className="absolute bottom-[54px] w-8 h-[2px] bg-[#D4A843] rounded-full" />
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
