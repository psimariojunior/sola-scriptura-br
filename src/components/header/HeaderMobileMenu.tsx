'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Search, User, LogOut, Settings, Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { MobileThemeGrid } from './HeaderThemeSwitcher';

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

interface HeaderMobileMenuProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  navLinks: NavLinkSpec[];
  maisGrupos: NavGroup[];
  hasDailyChallenge: boolean;
  headerSearchValue: string;
  onSearchValueChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onLogout: () => void;
  xp: number;
  streak: number;
}

export function HeaderMobileMenu({
  open,
  setOpen,
  navLinks,
  maisGrupos,
  hasDailyChallenge,
  headerSearchValue,
  onSearchValueChange,
  onSubmit,
  onLogout,
  xp,
  streak,
}: HeaderMobileMenuProps) {
  const { t } = useTranslation();
  const { usuario, isAutenticado, isAdmin } = useAuth();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, setOpen]);

  const userInitial = usuario?.nome?.charAt(0)?.toUpperCase() || '?';

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  const linkClass = (active: boolean) =>
    `flex items-center gap-2.5 text-sm font-medium px-3 py-3 min-h-[44px] rounded-lg transition-all ${
      active
        ? 'text-primary bg-primary/10 font-semibold'
        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
    }`;

  const drawer =
    mounted &&
    createPortal(
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="ssb-mobile-nav-overlay lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label={t('header.mobileNav')}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="ssb-mobile-nav-sheet lg:hidden"
            >
              <div className="ssb-mobile-nav-sheet-bar">
                <span className="text-sm font-semibold">{t('header.mobileNav')}</span>
                <button
                  type="button"
                  className="touch-target p-2 rounded-lg hover:bg-muted/50"
                  onClick={() => setOpen(false)}
                  aria-label={t('header.closeNavMenu')}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav
                className="ssb-mobile-nav-sheet-body"
                aria-label={t('header.mobileNav')}
              >
                {/* Mobile search */}
                <form onSubmit={onSubmit} className="relative mb-2" role="search">
                  <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
                  <input
                    type="search"
                    value={headerSearchValue}
                    onChange={(e) => onSearchValueChange(e.target.value)}
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
                        className={linkClass(active)}
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
                            className={linkClass(active)}
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
                <MobileThemeGrid delay={(navLinks.length + maisGrupos.length) * 0.04} />

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
                      className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground px-3 py-3 min-h-[44px] rounded-lg hover:bg-muted/50 transition-all"
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
                        onClick={onLogout}
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
                      className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground px-3 py-3 min-h-[44px] rounded-lg hover:bg-muted/50 transition-all"
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
      </AnimatePresence>,
      document.body
    );

  return (
    <>
      <button
        type="button"
        className="mobile-hamburger lg:hidden p-2.5 min-h-[44px] min-w-[44px] hover:bg-muted/50 rounded-lg transition-all duration-300"
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
      {drawer}
    </>
  );
}
