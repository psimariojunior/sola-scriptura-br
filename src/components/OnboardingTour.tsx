'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, X, Sparkles } from 'lucide-react';

const STORAGE_KEY = 'ssb_onboarding_tour_done';

interface TourStep {
  id: string;
  titulo: string;
  descricao: string;
  targetSelector: string;
  position: 'top' | 'bottom' | 'left' | 'right';
}

const TOUR_STEPS: TourStep[] = [
  {
    id: 'biblia',
    titulo: 'Bem-vindo ao Sola Scriptura!',
    descricao: 'Comece pela Bíblia em 6 traduções — ARC, ARA, ACF, KJV, NVI e WEB.',
    targetSelector: 'a[href="/biblia"]',
    position: 'bottom',
  },
  {
    id: 'idiomas',
    titulo: 'Estude no original',
    descricao: 'Aprenda grego e hebraico com o léxico Strong palavra por palavra.',
    targetSelector: 'a[href="/idiomas"]',
    position: 'bottom',
  },
  {
    id: 'ia',
    titulo: 'IA para seus estudos',
    descricao: 'Faça perguntas teológicas e receba respostas fundamentadas na Escritura.',
    targetSelector: 'a[href="/ia"]',
    position: 'bottom',
  },
  {
    id: 'gratis',
    titulo: 'Tudo grátis',
    descricao: 'Todas as ferramentas são 100% gratuitas. Sem assinatura, sem limites.',
    targetSelector: 'a[href="/biblia"]',
    position: 'bottom',
  },
];

function getTargetRect(selector: string): DOMRect | null {
  const el = document.querySelector(selector);
  if (!el) return null;
  return el.getBoundingClientRect();
}

function getTooltipPosition(
  targetRect: DOMRect,
  position: TourStep['position'],
  tooltipRef: React.RefObject<HTMLDivElement | null>
): { top: number; left: number } {
  const tooltip = tooltipRef.current;
  if (!tooltip) return { top: targetRect.bottom + 12, left: targetRect.left };

  const tooltipRect = tooltip.getBoundingClientRect();
  const gap = 12;

  switch (position) {
    case 'bottom':
      return {
        top: targetRect.bottom + gap,
        left: Math.max(16, Math.min(targetRect.left, window.innerWidth - tooltipRect.width - 16)),
      };
    case 'top':
      return {
        top: targetRect.top - tooltipRect.height - gap,
        left: Math.max(16, Math.min(targetRect.left, window.innerWidth - tooltipRect.width - 16)),
      };
    case 'left':
      return {
        top: Math.max(16, targetRect.top),
        left: Math.max(16, targetRect.left - tooltipRect.width - gap),
      };
    case 'right':
      return {
        top: Math.max(16, targetRect.top),
        left: targetRect.right + gap,
      };
    default:
      return { top: targetRect.bottom + gap, left: targetRect.left };
  }
}

export function OnboardingTour() {
  const [active, setActive] = useState(false);
  const [step, setStep] = useState(0);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ top: 0, left: 0 });
  const tooltipRef = useRef<HTMLDivElement>(null);
  const stepRef = useRef(step);
  stepRef.current = step;

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const done = localStorage.getItem(STORAGE_KEY);
      if (!done) {
        const timer = setTimeout(() => setActive(true), 1200);
        return () => clearTimeout(timer);
      }
    } catch {
      /* ignore */
    }
  }, []);

  const updatePosition = useCallback(() => {
    const currentStep = TOUR_STEPS[step];
    if (!currentStep) return;
    const rect = getTargetRect(currentStep.targetSelector);
    setTargetRect(rect);
    if (rect && tooltipRef.current) {
      const pos = getTooltipPosition(rect, currentStep.position, tooltipRef);
      setTooltipPos(pos);
    }
  }, [step]);

  useEffect(() => {
    if (!active) return;
    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, true);
    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
    };
  }, [active, updatePosition]);

  const dismiss = () => {
    try {
      localStorage.setItem(STORAGE_KEY, '1');
    } catch {
      /* ignore */
    }
    setActive(false);
  };

  const next = () => {
    if (step < TOUR_STEPS.length - 1) {
      setStep((s) => s + 1);
    } else {
      dismiss();
    }
  };

  useEffect(() => {
    if (!active) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        dismiss();
      }
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (stepRef.current < TOUR_STEPS.length - 1) {
          setStep((s) => s + 1);
        } else {
          dismiss();
        }
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [active]);

  const current = TOUR_STEPS[step];
  const isLast = step === TOUR_STEPS.length - 1;

  return (
    <AnimatePresence>
      {active && current && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[115] bg-black/50 backdrop-blur-[2px]"
            onClick={dismiss}
          />

          {/* Highlight ring around target */}
          {targetRect && (
            <motion.div
              key={`highlight-${current.id}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="fixed z-[116] pointer-events-none rounded-lg"
              style={{
                top: targetRect.top - 8,
                left: targetRect.left - 8,
                width: targetRect.width + 16,
                height: targetRect.height + 16,
                boxShadow: '0 0 0 3px rgba(212, 168, 67, 0.6), 0 0 20px rgba(212, 168, 67, 0.3)',
              }}
            />
          )}

          {/* Tooltip */}
          <motion.div
            ref={tooltipRef}
            key={`tooltip-${current.id}`}
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed z-[117] w-72 rounded-2xl border border-amber-500/30 bg-background shadow-2xl overflow-hidden"
            style={{ top: tooltipPos.top, left: tooltipPos.left }}
          >
            {/* Golden top accent */}
            <div className="h-1 w-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500" />

            <div className="p-4">
              {/* Step indicator */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white shadow-md">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[10px] font-bold tracking-widest uppercase text-amber-600 dark:text-amber-400">
                    Passo {step + 1}/{TOUR_STEPS.length}
                  </span>
                </div>
                <button
                  onClick={dismiss}
                  className="p-1 rounded-md hover:bg-muted/50 transition-colors text-muted-foreground"
                  aria-label="Pular tour"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Content */}
              <h3 className="font-display text-lg font-semibold mb-1">{current.titulo}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {current.descricao}
              </p>

              {/* Actions */}
              <div className="flex items-center justify-between">
                <button
                  onClick={dismiss}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  Pular tour
                </button>
                <button
                  onClick={next}
                  className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 transition-all shadow-md hover:shadow-lg"
                >
                  {isLast ? 'Começar' : 'Próximo'}
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Progress dots */}
              <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-border/30">
                {TOUR_STEPS.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      i === step
                        ? 'w-6 bg-gradient-to-r from-amber-500 to-orange-500'
                        : i < step
                        ? 'w-1.5 bg-amber-500/50'
                        : 'w-1.5 bg-border'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
