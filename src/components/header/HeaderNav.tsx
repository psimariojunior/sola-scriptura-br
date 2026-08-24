'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { usePathname } from 'next/navigation';
import { BookOpen } from 'lucide-react';
import { DailyChallengeDot } from './DailyChallengeDot';
import { QuickBookSwitcher } from './QuickBookSwitcher';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type LucideIcon = typeof BookOpen;

interface NavLinkSpec {
  href: string;
  label: string;
  icon: LucideIcon;
}

interface NavGroup {
  titulo: string;
  links: NavLinkSpec[];
}

interface HeaderNavProps {
  navLinks: NavLinkSpec[];
  maisGrupos: NavGroup[];
  hasDailyChallenge: boolean;
  onQuickBook: (livro: string) => void;
  currentLivro: string | null;
}

export function HeaderNav({
  navLinks,
  maisGrupos,
  hasDailyChallenge,
  onQuickBook,
  currentLivro,
}: HeaderNavProps) {
  const { t } = useTranslation();
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  const isMoreActive = useMemo(
    () => maisGrupos.some((g) => g.links.some((l) => isActive(l.href))),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pathname]
  );

  return (
    <nav id="main-nav" className="hidden lg:flex items-center gap-0.5 ml-2" aria-label="Navegação principal">
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
          <QuickBookSwitcher onSelect={onQuickBook} activeBook={currentLivro} />
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
  );
}
