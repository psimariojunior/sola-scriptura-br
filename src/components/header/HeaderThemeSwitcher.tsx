'use client';

import { Sun, Moon, BookOpen, RotateCw } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTema, type TemaNome } from '@/lib/temas';
import { motion } from 'framer-motion';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';

const temaIcons: Record<string, React.ReactNode> = {
  light: <Sun className="w-4 h-4" />,
  escuro: <Moon className="w-4 h-4" />,
  sepia: <BookOpen className="w-4 h-4" />,
  noturno: <Moon className="w-4 h-4" strokeWidth={1.5} />,
  dim: <Moon className="w-4 h-4" strokeWidth={1} />,
  auto: <RotateCw className="w-4 h-4" />,
};

export { temaIcons };

export function HeaderThemeSwitcher() {
  const { tema, setTema, temasDisponiveis } = useTema();
  const { t } = useTranslation();

  return (
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
  );
}

interface MobileThemeGridProps {
  delay: number;
}

export function MobileThemeGrid({ delay }: MobileThemeGridProps) {
  const { tema, setTema, temasDisponiveis } = useTema();
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
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
  );
}
