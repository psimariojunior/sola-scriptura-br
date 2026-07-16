'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, BookText, StickyNote, GraduationCap, History, X, ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { obterContexto, obterContextoCapitulo } from '@/data/contextoHistorico';
import { obterComentarios } from '@/data/comentarios';

const PainelStrong = dynamic(() => import('@/components/PainelStrong'), { ssr: false });
const PainelNotas = dynamic(() => import('@/components/PainelNotas'), { ssr: false });
const PainelComentarios = dynamic(() => import('@/components/PainelComentarios'), { ssr: false });
const PainelEstudosSidePanel = dynamic(() => import('@/components/PainelEstudosSidePanel'), { ssr: false });

type TabValue = 'comentarios' | 'strong' | 'notas' | 'estudos' | 'contexto';

export type SidePanelWidth = 'collapsed' | 'half' | 'full';

export interface SidePanelProps {
  open: boolean;
  width: SidePanelWidth;
  onWidthChange: (w: SidePanelWidth) => void;
  activeTab: TabValue | null;
  onActiveTabChange: (tab: TabValue | null) => void;
  livro: string;
  livroNome: string;
  livroAbreviacao: string;
  capitulo: number;
  versiculo?: number | null;
  onClose: () => void;
}

const tabs: { value: TabValue; label: string; icon: typeof BookOpen }[] = [
  { value: 'comentarios', label: 'Comentários', icon: MessageSquare },
  { value: 'strong', label: 'Léxico', icon: BookText },
  { value: 'notas', label: 'Notas', icon: StickyNote },
  { value: 'estudos', label: 'Estudos', icon: GraduationCap },
  { value: 'contexto', label: 'Contexto', icon: History },
];

function PanelFallback() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="flex gap-1.5">
        <span className="w-2 h-2 bg-[var(--brand-default)] rounded-full animate-bounce" />
        <span className="w-2 h-2 bg-[var(--brand-default)] rounded-full animate-bounce [animation-delay:0.15s]" />
        <span className="w-2 h-2 bg-[var(--brand-default)] rounded-full animate-bounce [animation-delay:0.3s]" />
      </div>
    </div>
  );
}

const widthMap: Record<SidePanelWidth, string> = {
  collapsed: 'w-14',
  half: 'w-full sm:w-[340px] md:w-[380px] lg:w-[420px]',
  full: 'w-full sm:w-[45%] lg:w-[40%]',
};

export function SidePanel({
  open,
  width,
  onWidthChange,
  activeTab,
  onActiveTabChange,
  livro,
  livroNome,
  livroAbreviacao,
  capitulo,
  versiculo,
  onClose,
}: SidePanelProps) {
  const isCollapsed = width === 'collapsed';
  const isFull = width === 'full';

  const cycleWidth = () => {
    if (width === 'collapsed') onWidthChange('half');
    else if (width === 'half') onWidthChange('full');
    else onWidthChange('collapsed');
  };

  if (!open) return null;

  return (
    <motion.aside
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={cn(
        'shrink-0 border-l border-[var(--border)] bg-[var(--surface-raised)]',
        'flex flex-col h-full',
        'transition-[width] duration-300',
        widthMap[width]
      )}
    >
      <div className="flex items-center justify-between p-2 border-b border-[var(--border)]/50 shrink-0">
        {!isCollapsed && (
          <div className="flex items-center gap-1.5 px-2">
            <span className="text-[10px] uppercase tracking-wider font-semibold text-[var(--content-muted)]">
              {activeTab ? tabs.find(t => t.value === activeTab)?.label : 'Painel'}
            </span>
          </div>
        )}
        <div className="flex items-center gap-0.5 ml-auto">
          <button
            onClick={cycleWidth}
            className="p-1.5 rounded-md text-[var(--content-muted)] hover:text-[var(--content-primary)] hover:bg-[var(--surface-sunken)] transition-colors"
            title={width === 'collapsed' ? 'Expandir' : width === 'half' ? 'Tela cheia' : 'Recolher'}
            aria-label="Alternar tamanho do painel"
          >
            {width === 'collapsed' ? <ChevronLeft className="w-4 h-4" /> : width === 'half' ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md text-[var(--content-muted)] hover:text-[var(--content-primary)] hover:bg-[var(--surface-sunken)] transition-colors"
            title="Fechar painel"
            aria-label="Fechar painel"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      <nav
        className={cn(
          'flex shrink-0 border-b border-[var(--border)]/40',
          isCollapsed
            ? 'flex-col items-center gap-1 p-2'
            : 'items-stretch gap-0.5 p-2 overflow-x-auto'
        )}
        aria-label="Abas do painel de estudo"
      >
        {tabs.map(({ value, label, icon: Icon }) => {
          const active = activeTab === value;
          return (
            <button
              key={value}
              onClick={() => onActiveTabChange(active ? null : value)}
              title={isCollapsed ? label : undefined}
              aria-label={label}
              aria-pressed={active}
              className={cn(
                'relative inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-200',
                'text-[12px] sm:text-sm',
                isCollapsed ? 'w-10 h-10' : 'px-3 py-2 whitespace-nowrap',
                active
                  ? 'bg-[var(--brand-subtle)] text-[var(--brand-default)]'
                  : 'text-[var(--content-secondary)] hover:bg-[var(--surface-sunken)] hover:text-[var(--content-primary)]'
              )}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {!isCollapsed && <span>{label}</span>}
              {active && (
                <motion.span
                  layoutId="sidepanel-active"
                  className="absolute inset-x-2 -bottom-[5px] h-0.5 bg-[var(--brand-default)] rounded-full"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                />
              )}
            </button>
          );
        })}
      </nav>

      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          {activeTab && !isCollapsed && (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="p-4"
            >
              <Suspense fallback={<PanelFallback />}>
                {activeTab === 'comentarios' ? (
                  versiculo ? (
                    <PainelComentarios
                      livro={livroAbreviacao}
                      capitulo={capitulo}
                      versiculo={versiculo}
                      onClose={() => onActiveTabChange(null)}
                    />
                  ) : (
                    <EmptyPanel
                      icon={MessageSquare}
                      title="Comentários"
                      description="Selecione um versículo para ver comentários teológicos."
                    />
                  )
                ) : activeTab === 'strong' ? (
                  <PainelStrong onClose={() => onActiveTabChange(null)} />
                ) : activeTab === 'notas' ? (
                  <PainelNotas livroAbrev={livroAbreviacao} capitulo={capitulo} />
                ) : activeTab === 'estudos' ? (
                  versiculo ? (
                    <PainelEstudosSidePanel
                      livro={livroAbreviacao}
                      capitulo={capitulo}
                      versiculo={versiculo}
                    />
                  ) : (
                    <EmptyPanel
                      icon={GraduationCap}
                      title="Estudos"
                      description="Selecione um versículo para ver os estudos teológicos com visões de múltiplos teólogos."
                    />
                  )
                ) : activeTab === 'contexto' ? (
                  <PainelContexto livro={livroAbreviacao} capitulo={capitulo} />
                ) : null}
              </Suspense>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.aside>
  );
}

function EmptyPanel({ icon: Icon, title, description }: { icon: typeof BookOpen; title: string; description: string }) {
  return (
    <div className="text-center py-12 px-4">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[var(--brand-subtle)] text-[var(--brand-default)] mb-3">
        <Icon className="w-5 h-5" />
      </div>
      <h3 className="font-display text-lg font-medium text-[var(--content-primary)] mb-1">
        {title}
      </h3>
      <p className="text-sm text-[var(--content-muted)] max-w-xs mx-auto">
        {description}
      </p>
    </div>
  );
}

function Secao({ rotulo, texto }: { rotulo: string; texto: string }) {
  return (
    <div className="mb-4">
      <h4 className="text-[11px] font-semibold uppercase tracking-wider text-[var(--brand-default)] mb-1">
        {rotulo}
      </h4>
      <p className="text-sm text-[var(--content-secondary)] leading-relaxed">{texto}</p>
    </div>
  );
}

function PainelContexto({ livro, capitulo }: { livro: string; capitulo: number }) {
  const ctx = obterContexto(livro);
  const notaCapitulo = obterContextoCapitulo(livro, capitulo);

  if (!ctx) {
    return (
      <EmptyPanel
        icon={History}
        title="Contexto Histórico"
        description="Contexto histórico ainda não disponível para este livro."
      />
    );
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <History className="w-4 h-4 text-[var(--brand-default)]" />
        <h3 className="font-display text-base font-semibold text-[var(--content-primary)]">
          Contexto Histórico
        </h3>
      </div>

      <div className="rounded-lg border border-border/50 bg-[var(--surface-subtle)] p-3 mb-3">
        <p className="text-xs text-[var(--content-muted)]">
          <span className="font-medium text-[var(--content-secondary)]">Período:</span> {ctx.periodo}
        </p>
        <p className="text-xs text-[var(--content-muted)] mt-0.5">
          <span className="font-medium text-[var(--content-secondary)]">Autoria:</span> {ctx.autorTradicional}
        </p>
      </div>

      <Secao rotulo="Ambiente Geográfico" texto={ctx.ambienteGeografico} />
      <Secao rotulo="Contexto Histórico" texto={ctx.contextoHistorico} />
      <Secao rotulo="Cultura e Sociedade" texto={ctx.culturaSociedade} />
      {ctx.descobertasArqueologicas && (
        <Secao rotulo="Descobertas Arqueológicas" texto={ctx.descobertasArqueologicas} />
      )}

      {notaCapitulo && (
        <div className="mt-3 rounded-lg border border-[var(--brand-subtle)] bg-[var(--brand-subtle)]/40 p-3">
          <h4 className="text-[11px] font-semibold uppercase tracking-wider text-[var(--brand-default)] mb-1">
            Capítulo {capitulo}
          </h4>
          <p className="text-sm text-[var(--content-secondary)] leading-relaxed">{notaCapitulo}</p>
        </div>
      )}
    </div>
  );
}
