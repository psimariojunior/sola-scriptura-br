'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, X, Sparkles, BookOpen, Brain, Star, Users, Trophy, Check } from 'lucide-react';

const STORAGE_KEY = 'ssb_interactive_onboarding_done';

interface OnboardingStep {
  id: string;
  titulo: string;
  descricao: string;
  icone: React.ElementType;
  cor: string;
  targetSelector?: string;
  conteudo?: string;
  acao?: string;
  opcoes?: { label: string; valor: string }[];
}

const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    id: 'welcome',
    titulo: 'Bem-vindo ao Sola Scriptura!',
    descricao: 'Uma plataforma de estudo bíblico completa, gratuita e sem anúncios.',
    icone: Sparkles,
    cor: 'from-amber-500 to-orange-500',
    conteudo: 'Tudo que você precisa para estudar a Bíblia profundamente — em português e nas línguas originais.',
  },
  {
    id: 'biblia',
    titulo: 'Leia a Bíblia',
    descricao: '10 traduções disponíveis para comparar e estudar.',
    icone: BookOpen,
    cor: 'from-blue-500 to-indigo-500',
    targetSelector: 'a[href="/biblia"]',
    conteudo: 'ARC, ARA, ACF, KJV, NVI, WEB e mais. Toque em um versículo para ver anotações, favoritos e estudo com IA.',
  },
  {
    id: 'interlinear',
    titulo: 'Estude no Original',
    descricao: 'Grego e Hebraico palavra por palavra.',
    icone: Star,
    cor: 'from-purple-500 to-pink-500',
    conteudo: '5.526 palavras gregas + 8.674 palavras hebraicas do Strong\'s. Veja a morfologia, significado e uso em cada versículo.',
  },
  {
    id: 'ia',
    titulo: 'IA para seus Estudos',
    descricao: 'Pergunte qualquer coisa sobre a Bíblia.',
    icone: Brain,
    cor: 'from-emerald-500 to-teal-500',
    conteudo: 'Nossa IA responde com base nas Escrituras. Faça perguntas teológicas, peça explicações de passagens ou estude temas.',
  },
  {
    id: 'comunidade',
    titulo: 'Estude em Comunidade',
    descricao: 'Salas de estudo colaborativo com chat e compartilhamento.',
    icone: Users,
    cor: 'from-rose-500 to-red-500',
    conteudo: 'Crie salas de estudo, compartilhe versículos, faça quizzes em grupo e aprenda juntos.',
  },
  {
    id: 'progresso',
    titulo: 'Acompanhe seu Progresso',
    descricao: 'Gamificação, streaks e conquistas.',
    icone: Trophy,
    cor: 'from-amber-500 to-yellow-500',
    conteudo: 'Ganhe XP, desbloqueie conquistas, mantenha sua sequência de leitura e suba de nível.',
    opcoes: [
      { label: 'Começar a Ler', valor: '/biblia' },
      { label: 'Fazer um Quiz', valor: '/quiz' },
      { label: 'Explorar IA', valor: '/ia' },
    ],
  },
];

export function InteractiveOnboarding() {
  const [active, setActive] = useState(false);
  const [step, setStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const [showMiniStudy, setShowMiniStudy] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const done = localStorage.getItem(STORAGE_KEY);
      if (!done) {
        const timer = setTimeout(() => setActive(true), 2000);
        return () => clearTimeout(timer);
      }
    } catch {}
  }, []);

  const dismiss = useCallback(() => {
    try { localStorage.setItem(STORAGE_KEY, '1'); } catch {}
    setActive(false);
  }, []);

  const next = useCallback(() => {
    const current = ONBOARDING_STEPS[step];
    if (current) {
      setCompletedSteps(prev => new Set([...prev, current.id]));
    }
    if (step < ONBOARDING_STEPS.length - 1) {
      setStep(s => s + 1);
    } else {
      dismiss();
    }
  }, [step, dismiss]);

  const startMiniStudy = useCallback(() => {
    setShowMiniStudy(true);
  }, []);

  useEffect(() => {
    if (!active) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.preventDefault(); dismiss(); }
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); next(); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [active, next, dismiss]);

  const current = ONBOARDING_STEPS[step];
  const isLast = step === ONBOARDING_STEPS.length - 1;
  const progress = ((step + 1) / ONBOARDING_STEPS.length) * 100;

  if (showMiniStudy) {
    return <MiniStudy onComplete={() => { setShowMiniStudy(false); dismiss(); }} />;
  }

  return (
    <AnimatePresence>
      {active && current && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] bg-black/60 backdrop-blur-[3px]"
            onClick={dismiss}
          />

          <motion.div
            key={current.id}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed z-[121] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-md"
            ref={tooltipRef}
          >
            <div className="bg-[var(--surface-raised)] border border-[var(--border)] rounded-3xl shadow-2xl overflow-hidden">
              <div className={`h-2 w-full bg-gradient-to-r ${current.cor}`} />

              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${current.cor} flex items-center justify-center shadow-lg`}>
                      <current.icone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold tracking-widest uppercase text-[var(--brand-default)]">
                        Passo {step + 1}/{ONBOARDING_STEPS.length}
                      </span>
                      <div className="w-full h-1 bg-[var(--surface-sunken)] rounded-full mt-1">
                        <div className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
                      </div>
                    </div>
                  </div>
                  <button onClick={dismiss} className="p-2 rounded-xl hover:bg-[var(--surface-sunken)] text-[var(--content-muted)]">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <h3 className="font-display text-2xl font-bold text-[var(--content-primary)] mb-2">{current.titulo}</h3>
                <p className="text-sm text-[var(--content-secondary)] mb-4">{current.descricao}</p>

                {current.conteudo && (
                  <div className="bg-[var(--surface-sunken)]/50 rounded-xl p-4 mb-4">
                    <p className="text-sm text-[var(--content-secondary)] leading-relaxed">{current.conteudo}</p>
                  </div>
                )}

                {current.opcoes && (
                  <div className="space-y-2 mb-4">
                    {current.opcoes.map((opcao) => (
                      <a
                        key={opcao.valor}
                        href={opcao.valor}
                        onClick={dismiss}
                        className="block px-4 py-3 rounded-xl border border-[var(--border)] hover:bg-[var(--surface-sunken)] text-sm font-medium text-[var(--content-primary)] transition-colors text-center"
                      >
                        {opcao.label}
                      </a>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-[var(--border)]/30">
                  <button onClick={dismiss} className="text-sm text-[var(--content-muted)] hover:text-[var(--content-primary)] transition-colors">
                    Pular tutorial
                  </button>
                  <div className="flex items-center gap-2">
                    {step === 3 && (
                      <button
                        onClick={startMiniStudy}
                        className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl border border-amber-500/30 text-amber-600 dark:text-amber-400 hover:bg-amber-500/10 transition-all"
                      >
                        <BookOpen className="w-3.5 h-3.5" /> Mini Estudo
                      </button>
                    )}
                    <button
                      onClick={next}
                      className="flex items-center gap-1.5 px-5 py-2.5 text-sm font-semibold rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 transition-all shadow-md"
                    >
                      {isLast ? 'Começar!' : 'Próximo'}
                      {!isLast && <ChevronRight className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 mt-4 justify-center">
                  {ONBOARDING_STEPS.map((_, i) => (
                    <div key={i} className="flex items-center gap-1">
                      <div className={`h-1.5 rounded-full transition-all duration-300 ${
                        i === step ? 'w-6 bg-gradient-to-r from-amber-500 to-orange-500'
                        : completedSteps.has(ONBOARDING_STEPS[i].id) ? 'w-1.5 bg-amber-500/60'
                        : 'w-1.5 bg-[var(--border)]'
                      }`} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function MiniStudy({ onComplete }: { onComplete: () => void }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);

  const questions = [
    {
      pergunta: 'Quem escreveu o livro de Gênesis?',
      opcoes: ['Davi', 'Moisés', 'Paulo', 'Pedro'],
      correta: 1,
      explicacao: 'Moisés é tradicionalmente considerado o autor de Gênesis, escrevendo sobre os eventos da criação e os patriarcas.',
    },
    {
      pergunta: 'Qual é o versículo mais famoso da Bíblia?',
      opcoes: ['Salmos 23:1', 'João 3:16', 'Filipenses 4:13', 'Romanos 8:28'],
      correta: 1,
      explicacao: 'João 3:16 é amplamente considerado o versículo mais conhecido, resumindo o evangelho de forma concisa.',
    },
    {
      pergunta: 'Quantos livros tem a Bíblia?',
      opcoes: ['60', '64', '66', '72'],
      correta: 2,
      explicacao: 'A Bíblia tem 66 livros: 27 no Novo Testamento e 39 no Antigo Testamento.',
    },
  ];

  const question = questions[currentQuestion];

  const handleAnswer = (index: number) => {
    if (answered) return;
    setSelectedAnswer(index);
    setAnswered(true);
    if (index === question.correta) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(q => q + 1);
      setSelectedAnswer(null);
      setAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  if (showResult) {
    return (
      <div className="fixed inset-0 z-[122] flex items-center justify-center bg-black/60 backdrop-blur-[3px] p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-[var(--surface-raised)] border border-[var(--border)] rounded-3xl shadow-2xl overflow-hidden"
        >
          <div className="h-2 w-full bg-gradient-to-r from-amber-500 to-orange-500" />
          <div className="p-8 text-center">
            <div className="text-6xl mb-4">{score === questions.length ? '🏆' : score >= 2 ? '⭐' : '📖'}</div>
            <h3 className="font-display text-2xl font-bold text-[var(--content-primary)] mb-2">
              {score === questions.length ? 'Perfeito!' : score >= 2 ? 'Muito Bem!' : 'Continue Estudando!'}
            </h3>
            <p className="text-lg text-[var(--content-secondary)] mb-2">{score}/{questions.length} acertos</p>
            <p className="text-sm text-[var(--content-muted)] mb-6">
              {score === questions.length
                ? 'Parabéns! Você já está pronto para explorar mais.'
                : 'Cada versículo que você lê te aproxima do conhecimento.'}
            </p>
            <button
              onClick={onComplete}
              className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold hover:from-amber-600 hover:to-orange-600 transition-all shadow-md"
            >
              Começar a Usar
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[122] flex items-center justify-center bg-black/60 backdrop-blur-[3px] p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-[var(--surface-raised)] border border-[var(--border)] rounded-3xl shadow-2xl overflow-hidden"
      >
        <div className="h-2 w-full bg-gradient-to-r from-amber-500 to-orange-500" />
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span className="text-[10px] font-bold tracking-widest uppercase text-amber-600">Mini Estudo</span>
            </div>
            <span className="text-xs text-[var(--content-muted)]">{currentQuestion + 1}/{questions.length}</span>
          </div>

          <div className="w-full h-1.5 bg-[var(--surface-sunken)] rounded-full mb-6">
            <div className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-500" style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }} />
          </div>

          <h3 className="font-display text-xl font-bold text-[var(--content-primary)] mb-4">{question.pergunta}</h3>

          <div className="space-y-2 mb-4">
            {question.opcoes.map((opcao, i) => {
              const isCorrect = i === question.correta;
              const isSelected = i === selectedAnswer;
              let bgClass = 'hover:bg-[var(--surface-sunken)]';
              if (answered) {
                if (isCorrect) bgClass = 'bg-green-500/10 border-green-500/30';
                else if (isSelected && !isCorrect) bgClass = 'bg-red-500/10 border-red-500/30';
              }

              return (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  disabled={answered}
                  className={`w-full px-4 py-3 rounded-xl border border-[var(--border)] text-left text-sm font-medium transition-all ${bgClass}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-[var(--surface-sunken)] flex items-center justify-center text-[10px] font-bold text-[var(--content-muted)]">
                      {answered && isCorrect ? <Check className="w-3 h-3 text-green-500" /> : String.fromCharCode(65 + i)}
                    </span>
                    {opcao}
                  </div>
                </button>
              );
            })}
          </div>

          {answered && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-[var(--surface-sunken)]/50 rounded-xl p-4 mb-4"
            >
              <p className="text-sm text-[var(--content-secondary)]">{question.explicacao}</p>
            </motion.div>
          )}

          {answered && (
            <button
              onClick={handleNext}
              className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold hover:from-amber-600 hover:to-orange-600 transition-all shadow-md"
            >
              {currentQuestion < questions.length - 1 ? 'Próxima Pergunta' : 'Ver Resultado'}
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
