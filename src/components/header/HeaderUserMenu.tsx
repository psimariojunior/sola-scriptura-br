'use client';

import Link from 'next/link';
import {
  User, LogOut, Settings, Crown, Sparkles, Heart, Search, Download,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { HeaderThemeSwitcher } from './HeaderThemeSwitcher';
import { NotificationCenter } from '@/components/NotificationCenter';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface HeaderUserMenuProps {
  idioma: 'pt' | 'en';
  onToggleIdioma: () => void;
  onOpenBusca: () => void;
  onLogout: () => void;
  xp: number;
  streak: number;
  temAcessoTotal: boolean;
  isInstallable: boolean;
  onInstall: () => void;
}

export function HeaderUserMenu({
  idioma,
  onToggleIdioma,
  onOpenBusca,
  onLogout,
  xp,
  streak,
  temAcessoTotal,
  isInstallable,
  onInstall,
}: HeaderUserMenuProps) {
  const { usuario, isAutenticado, isAdmin } = useAuth();
  const { t } = useTranslation();

  const userInitial = usuario?.nome?.charAt(0)?.toUpperCase() || '?';

  return (
    <>
      {/* Desktop right cluster */}
      <div className="hidden lg:flex items-center gap-1.5 ml-auto">
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={onToggleIdioma}
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
                    onClick={onLogout}
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

        <HeaderThemeSwitcher />

        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={onOpenBusca}
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
              onClick={onToggleIdioma}
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
              onClick={onOpenBusca}
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
                onClick={onInstall}
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
      </div>
    </>
  );
}
