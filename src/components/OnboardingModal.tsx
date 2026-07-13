'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  Sparkles,
  Search,
  Presentation,
  Brain,
  ChevronLeft,
  ChevronRight,
  X,
  Target,
  Heart,
  Compass,
  GraduationCap,
} from 'lucide-react';
import { useToast } from '@/hooks/useToast';

const STORAGE_KEY = 'ssb_onboarding_done';

interface OnboardingStep {
  id: string;
  titulo: string;
  subtitulo: string;
  icon: React.ComponentType<{ className?: string }>;
  cor: string;
  conteudo: React.ReactNode;
}

const OBJETIVOS = [
  { id: 'estudo', label: 'Estudo pessoal', icon: BookOpen, descricao: 'Aprofundar meu conhecimento bíblico' },
  { id: 'ensino', label: 'Ensino e pregação', icon: GraduationCap, descricao: 'Preparar aulas e sermões' },
  { id: 'pesquisa', label: 'Pesquisa acadêmica', icon: Search, descricao: 'Estudo teológico rigoroso' },
  { id: 'devocional', label: 'Vida devocional', icon: Heart, descricao: 'Crescimento espiritual diário' },
];

export function OnboardingModal() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [objetivo, setObjetivo] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const done = localStorage.getItem(STORAGE_KEY);
      if (!done) {
        const timer = setTimeout(() => setOpen(true), 800);
        return () => clearTimeout(timer);
      }
    } catch {
      /* ignore */
    }
  }, []);

  const handleClose = () => {
    try {
      localStorage.setItem(STORAGE_KEY, '1');
    } catch {
      /* ignore */
    }
    setOpen(false);
  };

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        handleClose();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open]);

  const handleConcluir = () => {
    handleClose();
    toast({
      title: 'Bem-vindo ao Sola Scriptura!',
      description: objetivo
        ? `Ótimo! Vamos começar com conteúdo para ${OBJETIVOS.find((o) => o.id === objetivo)?.label.toLowerCase()}.`
        : 'Explore à vontade. Estamos aqui para ajudar.',
      variant: 'success',
    });
  };

  const STEPS: OnboardingStep[] = [
    {
      id: 'boas-vindas',
      titulo: 'Bem-vindo ao Sola Scriptura',
      subtitulo: 'Sua plataforma completa de estudo bíblico acadêmico',
      icon: BookOpen,
      cor: 'from-amber-500 to-orange-600',
      conteudo: (
        <div className="space-y-4 text-center">
          <p className="text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
            Bíblia em 6 traduções, grego e hebraico com léxico Strong, teologia sistemática,
            exegese com IA e ferramentas acadêmicas — tudo num só lugar.
          </p>
          <div className="grid grid-cols-3 gap-2 max-w-sm mx-auto pt-2">
            <div className="p-3 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <BookOpen className="w-5 h-5 mx-auto mb-1" />
              <p className="text-[10px] font-medium">Bíblia</p>
            </div>
            <div className="p-3 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
              <Sparkles className="w-5 h-5 mx-auto mb-1" />
              <p className="text-[10px] font-medium">IA</p>
            </div>
            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <GraduationCap className="w-5 h-5 mx-auto mb-1" />
              <p className="text-[10px] font-medium">Estudo</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'objetivo',
      titulo: 'O que você quer fazer?',
      subtitulo: 'Vamos personalizar sua experiência',
      icon: Target,
      cor: 'from-blue-500 to-cyan-600',
      conteudo: (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-w-md mx-auto">
          {OBJETIVOS.map((o) => {
            const Icon = o.icon;
            const ativo = objetivo === o.id;
            return (
              <button
                key={o.id}
                onClick={() => setObjetivo(o.id)}
                className={`flex items-start gap-3 p-3 rounded-xl border text-left transition-all ${
                  ativo
                    ? 'border-primary/50 bg-primary/10 ring-2 ring-primary/20'
                    : 'border-border/40 hover:border-primary/30 hover:bg-muted/30'
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                    ativo ? 'bg-primary text-primary-foreground' : 'bg-muted/50 text-muted-foreground'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium">{o.label}</p>
                  <p className="text-[11px] text-muted-foreground leading-snug">
                    {o.descricao}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      ),
    },
    {
      id: 'tour',
      titulo: 'Recursos principais',
      subtitulo: 'Conheça o que você pode fazer aqui',
      icon: Compass,
      cor: 'from-purple-500 to-pink-600',
      conteudo: (
        <div className="space-y-2.5 max-w-md mx-auto">
          {[
            { icon: Search, label: 'Busca global', desc: 'Encontre versículos, doutrinas e personagens (Ctrl+K)' },
            { icon: Sparkles, label: 'Assistente IA', desc: 'Faça perguntas teológicas com contexto da página (Ctrl+J)' },
            { icon: BookOpen, label: 'Léxico Strong', desc: 'Estude grego e hebraico palavra por palavra' },
            { icon: Brain, label: 'Estudo guiado', desc: 'Wizard passo a passo para capítulos (Ler → Compartilhar)' },
            { icon: Presentation, label: 'Modo Apresentação', desc: 'Projete versículos na TV com QR code (Ctrl+P)' },
          ].map((r, i) => {
            const Icon = r.icon;
            return (
              <div
                key={i}
                className="flex items-start gap-3 p-3 rounded-xl border border-border/40 bg-card/30"
              >
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium">{r.label}</p>
                  <p className="text-[11px] text-muted-foreground leading-snug">{r.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      ),
    },
    {
      id: 'comecar',
      titulo: 'Comece por aqui',
      subtitulo: 'Sugestões para o seu primeiro estudo',
      icon: GraduationCap,
      cor: 'from-emerald-500 to-teal-600',
      conteudo: (
        <div className="space-y-2.5 max-w-md mx-auto">
          <p className="text-xs text-muted-foreground text-center mb-3">
            Sugestões baseadas no seu objetivo:
          </p>
          {(
            objetivo === 'ensino'
              ? [
                  { href: '/exegese', label: 'Exegese automática', desc: 'Análise estruturada de textos' },
                  { href: '/teologia', label: 'Teologia Sistemática', desc: 'Doutrinas organizadas' },
                  { href: '/compartilhar/estudo', label: 'Compartilhar estudos', desc: 'Distribua para alunos' },
                ]
              : objetivo === 'pesquisa'
              ? [
                  { href: '/idiomas', label: 'Línguas originais', desc: 'Grego e hebraico com Strong' },
                  { href: '/ferramentas/critica-textual', label: 'Crítica textual', desc: 'Variantes e manuscritos' },
                  { href: '/ferramentas/concordancia', label: 'Concordância', desc: 'Pesquisa por palavras' },
                ]
              : objetivo === 'devocional'
              ? [
                  { href: '/devocional', label: 'Devocional diário', desc: 'Leitura para hoje' },
                  { href: '/planos', label: 'Planos de leitura', desc: 'Cronogramas estruturados' },
                  { href: '/flashcards', label: 'Flashcards', desc: 'Memorize versículos' },
                ]
              : [
                  { href: '/biblia', label: 'Comece pela Bíblia', desc: 'ARC, NVI, ARA, ACF, KJV, WEB' },
                  { href: '/estudos/joao', label: 'Estudo: João', desc: 'Evangelho recomendado para começar' },
                  { href: '/ia', label: 'Pergunte à IA', desc: 'Tire suas dúvidas com contexto' },
                ]
          ).map((s, i) => (
            <a
              key={i}
              href={s.href}
              onClick={handleClose}
              className="flex items-center gap-3 p-3 rounded-xl border border-border/40 hover:border-primary/30 hover:bg-primary/5 transition-all"
            >
              <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
              <div className="min-w-0">
                <p className="text-sm font-medium">{s.label}</p>
                <p className="text-[11px] text-muted-foreground">{s.desc}</p>
              </div>
            </a>
          ))}
        </div>
      ),
    },
  ];

  const current = STEPS[step];
  const isLast = step === STEPS.length - 1;
  const isFirst = step === 0;
  const Icon = current.icon;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[120] bg-black/70 backdrop-blur-md flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative w-full max-w-xl rounded-3xl border border-border/40 bg-background shadow-2xl overflow-hidden"
          >
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 z-10 p-1.5 rounded-lg hover:bg-muted/50 transition-colors text-muted-foreground"
              aria-label="Fechar"
            >
              <X className="w-4 h-4" />
            </button>

            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="p-6 sm:p-8"
              >
                <div className="flex flex-col items-center text-center mb-5">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${current.cor} flex items-center justify-center text-white shadow-lg mb-3`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <h2 className="font-display text-2xl font-medium mb-1">{current.titulo}</h2>
                  <p className="text-sm text-muted-foreground">{current.subtitulo}</p>
                </div>

                <div className="min-h-[280px]">{current.conteudo}</div>

                <div className="flex items-center justify-between gap-3 pt-5 mt-5 border-t border-border/30">
                  <div className="flex items-center gap-1.5">
                    {STEPS.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setStep(i)}
                        className={`h-1.5 rounded-full transition-all ${
                          i === step ? 'w-8 bg-primary' : 'w-1.5 bg-border'
                        }`}
                        aria-label={`Ir para passo ${i + 1}`}
                      />
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    {!isFirst && (
                      <button
                        onClick={() => setStep((s) => s - 1)}
                        className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground rounded-lg transition-colors"
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                        Voltar
                      </button>
                    )}
                    {isLast ? (
                      <button
                        onClick={handleConcluir}
                        className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                      >
                        Começar
                        <Sparkles className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <button
                        onClick={() => setStep((s) => s + 1)}
                        disabled={step === 1 && !objetivo}
                        className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                      >
                        Próximo
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function resetOnboarding() {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
}
