"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import {
  Brain, RotateCcw, Check, X, BookOpen, BarChart3, ArrowRight,
  Sparkles, Timer, Trophy, Star, Zap, ChevronLeft, ChevronRight,
  Layers, Target, Filter, Volume2, Hash, Bookmark, Flame,
  ArrowUpDown, Eye, EyeOff, Award, Clock, BookMarked,
} from "lucide-react";
import { carregarLexicoGrego, carregarLexicoHebraico } from "@/lib/lexicon-lazy";
import { romanizeHebrew } from "@/lib/hebrewRomanize";
import { cn } from "@/lib/utils";
import type { PalavraGrega } from "@/data/lexicon/grego";
import type { PalavraHebraica } from "@/data/lexicon/hebraico";

type Modo = "flashcards" | "quiz";
type IdiomaFiltro = "todos" | "grego" | "hebraico";
type Dificuldade = "facil" | "medio" | "dificil";
type StatusFlashcard = "novo" | "aprendendo" | "conhecido";

interface Word {
  strong: string;
  palavra: string;
  transliteracao: string;
  definicao: string;
  definicaoResumida: string;
  categoria: string;
  idioma: "grego" | "hebraico";
  frequencia: number;
  versiculos?: string[];
}

interface FlashcardData {
  word: Word;
  status: StatusFlashcard;
  easeFactor: number;
  interval: number;
  repetitions: number;
  nextReview: number;
  lastReview: number;
}

interface Question {
  pergunta: string;
  tipo: "definicao" | "palavra" | "strong" | "livro";
  opcoes: string[];
  respostaCorreta: number;
  palavraCorreta: Word;
}

interface QuizScore {
  corretas: number;
  total: number;
  percentual: number;
  dificuldade: Dificuldade;
  tempo: number;
  data: string;
}

const CATEGORIAS_MAP: Record<string, string> = {
  substantivo: "Substantivos",
  verbo: "Verbos",
  adjetivo: "Adjetivos",
  advérbio: "Advérbios",
  preposição: "Preposições",
  conjunção: "Conjunções",
  pronomе: "Pronomes",
  numeral: "Numerais",
  partícula: "Partículas",
  interjeição: "Interjeições",
};

const CATEGORIA_COR: Record<string, string> = {
  substantivo: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  verbo: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  adjetivo: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  advérbio: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  preposição: "bg-rose-500/20 text-rose-400 border-rose-500/30",
  conjunção: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
  pronomе: "bg-pink-500/20 text-pink-400 border-pink-500/30",
  numeral: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  partícula: "bg-teal-500/20 text-teal-400 border-teal-500/30",
  interjeição: "bg-red-500/20 text-red-400 border-red-500/30",
};

const DIFICULDADE_LABELS: Record<Dificuldade, { label: string; desc: string; icon: string }> = {
  facil: { label: "Fácil", desc: "Palavras comuns (freq. ≥ 50)", icon: "⭐" },
  medio: { label: "Médio", desc: "Todas as palavras", icon: "🔥" },
  dificil: { label: "Difícil", desc: "Palavras raras (freq. ≤ 5)", icon: "💀" },
};

const TIMER_SECONDS = 10;

const STORAGE_KEY = "ssb_quiz_voc_scores";
const FLASHCARD_STORAGE_KEY = "ssb_quiz_voc_flashcards";

function toWord(palavra: PalavraGrega | PalavraHebraica): Word {
  const isGrego = "definicaoResumida" in palavra;
  if (isGrego) {
    const p = palavra as PalavraGrega;
    return {
      strong: p.strong,
      palavra: p.palavra,
      transliteracao: p.transliteracao,
      definicao: p.definicao,
      definicaoResumida: p.definicaoResumida || p.definicao,
      categoria: p.categoria || "substantivo",
      idioma: "grego",
      frequencia: p.frequencia || 0,
      versiculos: p.versiculos,
    };
  }
  const p = palavra as PalavraHebraica;
  return {
    strong: p.strong,
    palavra: p.palavra,
    transliteracao: p.transliteracao,
    definicao: p.definicao,
    definicaoResumida: p.definicao,
    categoria: inferirCategoriaHebraico(p),
    idioma: "hebraico",
    frequencia: p.frequencia || 0,
  };
}

function inferirCategoriaHebraico(p: PalavraHebraica): string {
  const m = (p.morfologia || "").toLowerCase();
  if (m.includes("verb")) return "verbo";
  if (m.includes("noun") || m.includes("substant")) return "substantivo";
  if (m.includes("adj") || m.includes("adjective")) return "adjetivo";
  if (m.includes("adv") || m.includes("adverb")) return "advérbio";
  if (m.includes("prep")) return "preposição";
  if (m.includes("conj")) return "conjunção";
  if (m.includes("pron")) return "pronomе";
  if (m.includes("num")) return "numeral";
  return "substantivo";
}

function getRandomWords(count: number, words: Word[], difficulty: Dificuldade): Word[] {
  let filtered = words.filter((w) => w.definicaoResumida && w.frequencia > 0);
  if (difficulty === "facil") {
    filtered = filtered.filter((w) => w.frequencia >= 50);
  } else if (difficulty === "dificil") {
    filtered = filtered.filter((w) => w.frequencia <= 5);
  }
  if (filtered.length < count) {
    filtered = words.filter((w) => w.definicaoResumida);
  }
  const shuffled = [...filtered].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

function generateQuestion(words: Word[], allWords: Word[]): Question | null {
  if (words.length < 5) return null;
  const target = words[Math.floor(Math.random() * words.length)];
  const tipoIdx = Math.floor(Math.random() * 4);
  const tipo: Question["tipo"] = tipoIdx === 0 ? "definicao" : tipoIdx === 1 ? "palavra" : tipoIdx === 2 ? "strong" : "livro";

  const wrongDefs = allWords
    .filter((w) => w.strong !== target.strong && w.definicaoResumida !== target.definicaoResumida)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3)
    .map((w) => w.definicaoResumida);

  const wrongPalavras = allWords
    .filter((w) => w.strong !== target.strong && w.palavra !== target.palavra)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3)
    .map((w) => `${w.palavra} (${w.transliteracao})`);

  const wrongStrongs = allWords
    .filter((w) => w.strong !== target.strong)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3)
    .map((w) => w.strong);

  const allBooks = [
    "Gênesis", "Êxodo", "Levítico", "Números", "Deuteronômio",
    "Josué", "Juízes", "Rute", "1 Samuel", "2 Samuel",
    "1 Reis", "2 Reis", "1 Crônicas", "2 Crônicas", "Esdras",
    "Neemias", "Ester", "Jó", "Salmos", "Provérbios",
    "Eclesiastes", "Cânticos", "Isaías", "Jeremias", "Lamentações",
    "Daniel", "Oséias", "Joel", "Amós", "Miquéias",
    "Mateus", "Marcos", "Lucas", "João", "Atos",
    "Romanos", "1 Coríntios", "2 Coríntios", "Gálatas", "Efésios",
    "Filipenses", "Colossenses", "1 Tessalonicenses", "2 Tessalonicenses",
    "1 Timóteo", "2 Timóteo", "Tito", "Filemom", "Hebreus",
    "Tiago", "1 Pedro", "2 Pedro", "1 João", "2 João",
    "3 João", "Judas", "Apocalipse",
  ];

  const usedBooks = new Set<string>();
  if (target.versiculos && target.versiculos.length > 0) {
    usedBooks.add(target.versiculos[0].split(" ")[0]);
  }

  let wrongBooks = allBooks.filter((b) => !usedBooks.has(b)).sort(() => Math.random() - 0.5).slice(0, 3);

  switch (tipo) {
    case "definicao": {
      const opcoes = [target.definicaoResumida, ...wrongDefs].sort(() => Math.random() - 0.5);
      return {
        pergunta: `O que significa "${target.palavra}" (${target.transliteracao})?`,
        tipo: "definicao",
        opcoes,
        respostaCorreta: opcoes.indexOf(target.definicaoResumida),
        palavraCorreta: target,
      };
    }
    case "palavra": {
      const labelTarget = `${target.palavra} (${target.transliteracao})`;
      const opcoes = [labelTarget, ...wrongPalavras].sort(() => Math.random() - 0.5);
      return {
        pergunta: `Qual palavra significa "${target.definicaoResumida}"?`,
        tipo: "palavra",
        opcoes,
        respostaCorreta: opcoes.indexOf(labelTarget),
        palavraCorreta: target,
      };
    }
    case "strong": {
      const opcoes = [target.strong, ...wrongStrongs].sort(() => Math.random() - 0.5);
      return {
        pergunta: `Qual o número Strong's de "${target.palavra}" (${target.transliteracao})?`,
        tipo: "strong",
        opcoes,
        respostaCorreta: opcoes.indexOf(target.strong),
        palavraCorreta: target,
      };
    }
    case "livro": {
      const livroAlvo = target.versiculos && target.versiculos.length > 0
        ? target.versiculos[0].split(" ")[0]
        : allBooks[Math.floor(Math.random() * allBooks.length)];
      const opcoes = [livroAlvo, ...wrongBooks].sort(() => Math.random() - 0.5);
      return {
        pergunta: `Em qual livro "${target.palavra}" (${target.transliteracao}) aparece mais?`,
        tipo: "livro",
        opcoes,
        respostaCorreta: opcoes.indexOf(livroAlvo),
        palavraCorreta: target,
      };
    }
  }
}

function checkAnswer(question: Question, answer: number): boolean {
  return question.respostaCorreta === answer;
}

function loadScores(): QuizScore[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveScores(scores: QuizScore[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(scores.slice(0, 50)));
  } catch {
    /* ignore */
  }
}

function loadFlashcardStates(): Record<string, Partial<FlashcardData>> {
  try {
    const raw = localStorage.getItem(FLASHCARD_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveFlashcardStates(states: Record<string, Partial<FlashcardData>>): void {
  try {
    localStorage.setItem(FLASHCARD_STORAGE_KEY, JSON.stringify(states));
  } catch {
    /* ignore */
  }
}

export default function QuizBiblicoPage() {
  const [modo, setModo] = useState<Modo>("flashcards");
  const [idiomaFiltro, setIdiomaFiltro] = useState<IdiomaFiltro>("todos");
  const [dificuldade, setDificuldade] = useState<Dificuldade>("medio");
  const [palavrasGregas, setPalavrasGregas] = useState<Word[]>([]);
  const [palavrasHebraicas, setPalavrasHebraicas] = useState<Word[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [categoriaFiltro, setCategoriaFiltro] = useState<string>("todas");

  // Flashcard state
  const [flashcards, setFlashcards] = useState<FlashcardData[]>([]);
  const [currentFlashIdx, setCurrentFlashIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [swipeDir, setSwipeDir] = useState<"left" | "right" | null>(null);

  // Quiz state
  const [quizPerguntas, setQuizPerguntas] = useState<Question[]>([]);
  const [quizIdx, setQuizIdx] = useState(0);
  const [quizResposta, setQuizResposta] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState({ corretas: 0, total: 0 });
  const [quizTimer, setQuizTimer] = useState(TIMER_SECONDS);
  const [quizAtivo, setQuizAtivo] = useState(false);
  const [quizFinalizado, setQuizFinalizado] = useState(false);
  const [quizScores, setQuizScores] = useState<QuizScore[]>([]);
  const [quizTempoInicio, setQuizTempoInicio] = useState(0);
  const [quizMostrarExplicacao, setQuizMostrarExplicacao] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const flashcardX = useMotionValue(0);
  const flashcardOpacity = useTransform(flashcardX, [-200, 0, 200], [0.5, 1, 0.5]);

  // Load lexicons
  useEffect(() => {
    Promise.all([carregarLexicoGrego(), carregarLexicoHebraico()]).then(([g, h]) => {
      setPalavrasGregas(g.map(toWord).filter((w) => w.definicaoResumida && w.frequencia > 0));
      setPalavrasHebraicas(h.map(toWord).filter((w) => w.definicaoResumida && w.frequencia > 0));
      setCarregando(false);
    });
  }, []);

  const todasPalavras = useMemo(() => {
    switch (idiomaFiltro) {
      case "grego":
        return palavrasGregas;
      case "hebraico":
        return palavrasHebraicas;
      default:
        return [...palavrasGregas, ...palavrasHebraicas];
    }
  }, [idiomaFiltro, palavrasGregas, palavrasHebraicas]);

  const palavrasFiltradas = useMemo(() => {
    if (categoriaFiltro === "todas") return todasPalavras;
    return todasPalavras.filter((w) => w.categoria === categoriaFiltro);
  }, [todasPalavras, categoriaFiltro]);

  const categorias = useMemo(() => {
    const cats = new Set(todasPalavras.map((w) => w.categoria).filter(Boolean));
    return [...cats].sort();
  }, [todasPalavras]);

  // Load flashcard states
  useEffect(() => {
    const states = loadFlashcardStates();
    const cards: FlashcardData[] = palavrasFiltradas.map((w) => {
      const saved = states[w.strong];
      return {
        word: w,
        status: (saved?.status as StatusFlashcard) || "novo",
        easeFactor: saved?.easeFactor || 2.5,
        interval: saved?.interval || 0,
        repetitions: saved?.repetitions || 0,
        nextReview: saved?.nextReview || 0,
        lastReview: saved?.lastReview || 0,
      };
    });
    // Sort: due cards first, then by frequency desc
    const now = Date.now();
    cards.sort((a, b) => {
      const aDue = a.nextReview <= now;
      const bDue = b.nextReview <= now;
      if (aDue && !bDue) return -1;
      if (!aDue && bDue) return 1;
      return b.word.frequencia - a.word.frequencia;
    });
    setFlashcards(cards);
    setCurrentFlashIdx(0);
    setFlipped(false);
  }, [palavrasFiltradas]);

  // Save flashcard states
  useEffect(() => {
    if (flashcards.length === 0) return;
    const states: Record<string, Partial<FlashcardData>> = {};
    flashcards.forEach((fc) => {
      if (fc.status !== "novo") {
        states[fc.word.strong] = {
          status: fc.status,
          easeFactor: fc.easeFactor,
          interval: fc.interval,
          repetitions: fc.repetitions,
          nextReview: fc.nextReview,
          lastReview: fc.lastReview,
        };
      }
    });
    saveFlashcardStates(states);
  }, [flashcards]);

  // Load quiz scores
  useEffect(() => {
    setQuizScores(loadScores());
  }, []);

  // Quiz timer
  useEffect(() => {
    if (!quizAtivo || quizFinalizado || quizMostrarExplicacao) return;
    timerRef.current = setInterval(() => {
      setQuizTimer((prev) => {
        if (prev <= 1) {
          handleQuizTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [quizAtivo, quizFinalizado, quizMostrarExplicacao, quizIdx]);

  const handleQuizTimeout = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setQuizResposta(-1);
    setQuizMostrarExplicacao(true);
  }, []);

  // Flashcard actions
  const flashcardStats = useMemo(() => {
    const novos = flashcards.filter((fc) => fc.status === "novo").length;
    const aprendendo = flashcards.filter((fc) => fc.status === "aprendendo").length;
    const conhecidos = flashcards.filter((fc) => fc.status === "conhecido").length;
    const due = flashcards.filter((fc) => fc.nextReview <= Date.now() || fc.status === "novo").length;
    return { novos, aprendendo, conhecidos, due };
  }, [flashcards]);

  const currentFlashcard = flashcards[currentFlashIdx];

  const handleFlashcardKnow = useCallback(() => {
    if (!currentFlashcard) return;
    setFlashcards((prev) => {
      const updated = [...prev];
      const now = Date.now();
      const fc = { ...updated[currentFlashIdx] };
      fc.status = "conhecido";
      fc.repetitions += 1;
      fc.easeFactor = Math.min(fc.easeFactor + 0.1, 3.0);
      fc.interval = fc.repetitions <= 1 ? 1 : Math.round(fc.interval * fc.easeFactor);
      fc.nextReview = now + fc.interval * 24 * 60 * 60 * 1000;
      fc.lastReview = now;
      updated[currentFlashIdx] = fc;
      return updated;
    });
    setSwipeDir("right");
    setTimeout(() => {
      setSwipeDir(null);
      setCurrentFlashIdx((prev) => (prev + 1) % flashcards.length);
      setFlipped(false);
    }, 300);
  }, [currentFlashcard, currentFlashIdx, flashcards.length]);

  const handleFlashcardDontKnow = useCallback(() => {
    if (!currentFlashcard) return;
    setFlashcards((prev) => {
      const updated = [...prev];
      const now = Date.now();
      const fc = { ...updated[currentFlashIdx] };
      fc.status = "aprendendo";
      fc.repetitions = 0;
      fc.easeFactor = Math.max(fc.easeFactor - 0.2, 1.3);
      fc.interval = 0;
      fc.nextReview = now + 60 * 1000;
      fc.lastReview = now;
      updated[currentFlashIdx] = fc;
      return updated;
    });
    setSwipeDir("left");
    setTimeout(() => {
      setSwipeDir(null);
      setCurrentFlashIdx((prev) => (prev + 1) % flashcards.length);
      setFlipped(false);
    }, 300);
  }, [currentFlashcard, currentFlashIdx, flashcards.length]);

  const handleFlashcardLearning = useCallback(() => {
    if (!currentFlashcard) return;
    setFlashcards((prev) => {
      const updated = [...prev];
      const now = Date.now();
      const fc = { ...updated[currentFlashIdx] };
      fc.status = "aprendendo";
      fc.repetitions += 1;
      fc.interval = Math.max(fc.interval, 1);
      fc.nextReview = now + fc.interval * 24 * 60 * 60 * 1000;
      fc.lastReview = now;
      updated[currentFlashIdx] = fc;
      return updated;
    });
    setCurrentFlashIdx((prev) => (prev + 1) % flashcards.length);
    setFlipped(false);
  }, [currentFlashcard, currentFlashIdx, flashcards.length]);

  const resetFlashcards = useCallback(() => {
    setFlashcards((prev) =>
      prev.map((fc) => ({
        ...fc,
        status: "novo" as StatusFlashcard,
        easeFactor: 2.5,
        interval: 0,
        repetitions: 0,
        nextReview: 0,
        lastReview: 0,
      }))
    );
    setCurrentFlashIdx(0);
    setFlipped(false);
  }, []);

  // Quiz actions
  const startQuiz = useCallback(() => {
    const words = getRandomWords(10, palavrasFiltradas, dificuldade);
    if (words.length < 5) return;
    const perguntas: Question[] = [];
    for (let i = 0; i < Math.min(10, words.length); i++) {
      const q = generateQuestion(words, palavrasFiltradas);
      if (q) perguntas.push(q);
    }
    if (perguntas.length === 0) return;
    setQuizPerguntas(perguntas);
    setQuizIdx(0);
    setQuizScore({ corretas: 0, total: 0 });
    setQuizTimer(TIMER_SECONDS);
    setQuizResposta(null);
    setQuizAtivo(true);
    setQuizFinalizado(false);
    setQuizTempoInicio(Date.now());
    setQuizMostrarExplicacao(false);
    setShowConfetti(false);
  }, [palavrasFiltradas, dificuldade]);

  const handleQuizAnswer = useCallback(
    (answerIdx: number) => {
      if (quizResposta !== null || !quizAtivo || quizMostrarExplicacao) return;
      if (timerRef.current) clearInterval(timerRef.current);
      const correct = checkAnswer(quizPerguntas[quizIdx], answerIdx);
      setQuizResposta(answerIdx);
      setQuizScore((prev) => ({
        corretas: prev.corretas + (correct ? 1 : 0),
        total: prev.total + 1,
      }));
      setQuizMostrarExplicacao(true);
    },
    [quizResposta, quizAtivo, quizMostrarExplicacao, quizIdx, quizPerguntas]
  );

  const handleQuizNext = useCallback(() => {
    if (quizIdx + 1 >= quizPerguntas.length) {
      const finalScore: QuizScore = {
        corretas: quizScore.corretas + (quizResposta !== null && checkAnswer(quizPerguntas[quizIdx], quizResposta) ? 0 : 0),
        total: quizScore.total,
        percentual: Math.round((quizScore.corretas / Math.max(quizScore.total, 1)) * 100),
        dificuldade,
        tempo: Math.round((Date.now() - quizTempoInicio) / 1000),
        data: new Date().toISOString(),
      };
      // Recalc with current answer
      const wasCorrect = quizResposta !== null && checkAnswer(quizPerguntas[quizIdx], quizResposta);
      finalScore.corretas = quizScore.corretas + (wasCorrect ? 1 : 0);
      finalScore.percentual = Math.round((finalScore.corretas / finalScore.total) * 100);

      setQuizScores((prev) => {
        const updated = [finalScore, ...prev];
        saveScores(updated);
        return updated;
      });
      setQuizFinalizado(true);
      setQuizAtivo(false);
      if (finalScore.percentual === 100) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000);
      }
      return;
    }
    setQuizIdx((prev) => prev + 1);
    setQuizResposta(null);
    setQuizTimer(TIMER_SECONDS);
    setQuizMostrarExplicacao(false);
  }, [quizIdx, quizPerguntas, quizScore, quizResposta, dificuldade, quizTempoInicio]);

  const resetQuiz = useCallback(() => {
    setQuizAtivo(false);
    setQuizFinalizado(false);
    setQuizPerguntas([]);
    setQuizIdx(0);
    setQuizScore({ corretas: 0, total: 0 });
    setQuizTimer(TIMER_SECONDS);
    setQuizResposta(null);
    setQuizMostrarExplicacao(false);
    setShowConfetti(false);
  }, []);

  // Keyboard
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (modo === "flashcards") {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          setFlipped((f) => !f);
        } else if (e.key === "ArrowLeft") {
          handleFlashcardDontKnow();
        } else if (e.key === "ArrowRight") {
          handleFlashcardKnow();
        } else if (e.key === "ArrowUp") {
          handleFlashcardLearning();
        }
      }
      if (modo === "quiz" && quizAtivo && !quizFinalizado && quizResposta === null) {
        const num = parseInt(e.key);
        if (num >= 1 && num <= 4) {
          handleQuizAnswer(num - 1);
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [modo, handleFlashcardDontKnow, handleFlashcardKnow, handleFlashcardLearning, quizAtivo, quizFinalizado, quizResposta, handleQuizAnswer]);

  if (carregando) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Carregando léxico...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Confetti effect */}
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-50">
            {Array.from({ length: 50 }).map((_, i) => (
              <div
                key={i}
                className="confetti-piece"
                style={{
                  position: "absolute",
                  left: `${Math.random() * 100}%`,
                  top: "-10px",
                  width: `${Math.random() * 10 + 5}px`,
                  height: `${Math.random() * 10 + 5}px`,
                  background: ["#FFD700", "#FF6B35", "#4CAF50", "#2196F3", "#9C27B0", "#FF5722"][
                    Math.floor(Math.random() * 6)
                  ],
                  borderRadius: Math.random() > 0.5 ? "50%" : "2px",
                  animation: `confettiFall ${Math.random() * 2 + 2}s linear forwards`,
                  animationDelay: `${Math.random() * 1.5}s`,
                  transform: `rotate(${Math.random() * 360}deg)`,
                }}
              />
            ))}
          </div>
        )}

        <style>{`
          @keyframes confettiFall {
            0% { transform: translateY(-10px) rotate(0deg); opacity: 1; }
            100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
          }
          @keyframes flipIn { from { transform: rotateY(90deg); } to { transform: rotateY(0deg); } }
          @keyframes pulseGold { 0%, 100% { box-shadow: 0 0 0 0 rgba(212, 175, 55, 0.4); } 50% { box-shadow: 0 0 20px 5px rgba(212, 175, 55, 0.2); } }
          @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
          .flashcard-container { perspective: 1000px; }
          .flashcard-inner { transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1); transform-style: preserve-3d; }
          .flashcard-inner.flipped { transform: rotateY(180deg); }
          .flashcard-front, .flashcard-back { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
          .flashcard-back { transform: rotateY(180deg); }
          .timer-bar { transition: width 1s linear; }
          .option-btn { transition: all 0.2s ease; }
          .option-btn:hover:not(:disabled) { transform: translateY(-2px); }
          .golden-glow { box-shadow: 0 0 30px -5px rgba(212, 175, 55, 0.3); }
        `}</style>

        <ScrollReveal>
          <div className="max-w-5xl mx-auto px-4 py-8">
            {/* Title + Mode Toggle */}
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                <span className="bg-gradient-to-r from-primary to-amber-400 bg-clip-text text-transparent">
                  Quiz & Flashcards Bíblicos
                </span>
              </h1>
              <p className="text-muted-foreground mb-6">
                Estude palavras gregas e hebraicas com flashcards inteligentes e quiz interativo
              </p>

              <div className="flex justify-center gap-2">
                <button
                  onClick={() => setModo("flashcards")}
                  className={cn(
                    "flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all",
                    modo === "flashcards"
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                      : "bg-card text-muted-foreground hover:bg-card/80 border border-border"
                  )}
                >
                  <Layers className="w-5 h-5" />
                  Flashcards
                </button>
                <button
                  onClick={() => setModo("quiz")}
                  className={cn(
                    "flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all",
                    modo === "quiz"
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                      : "bg-card text-muted-foreground hover:bg-card/80 border border-border"
                  )}
                >
                  <Target className="w-5 h-5" />
                  Quiz
                </button>
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {/* Language filter */}
              <div className="flex items-center gap-1 bg-card rounded-xl border border-border p-1">
                {(["todos", "grego", "hebraico"] as IdiomaFiltro[]).map((f) => (
                  <button
                    key={f}
                    onClick={() => setIdiomaFiltro(f)}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-sm font-medium transition-all",
                      idiomaFiltro === f
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {f === "todos" ? "Todos" : f === "grego" ? "Grego" : "Hebraico"}
                  </button>
                ))}
              </div>

              {/* Category filter */}
              {modo === "flashcards" && (
                <div className="relative">
                  <select
                    value={categoriaFiltro}
                    onChange={(e) => setCategoriaFiltro(e.target.value)}
                    className="appearance-none bg-card border border-border rounded-xl px-4 py-2 pr-8 text-sm font-medium cursor-pointer"
                  >
                    <option value="todas">Todas categorias</option>
                    {categorias.map((cat) => (
                      <option key={cat} value={cat}>
                        {CATEGORIAS_MAP[cat] || cat}
                      </option>
                    ))}
                  </select>
                  <ChevronLeft className="w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 rotate-[-90deg] pointer-events-none text-muted-foreground" />
                </div>
              )}

              {/* Difficulty (quiz) */}
              {modo === "quiz" && !quizAtivo && (
                <div className="flex items-center gap-1 bg-card rounded-xl border border-border p-1">
                  {(Object.keys(DIFICULDADE_LABELS) as Dificuldade[]).map((d) => (
                    <button
                      key={d}
                      onClick={() => setDificuldade(d)}
                      className={cn(
                        "px-3 py-1.5 rounded-lg text-sm font-medium transition-all",
                        dificuldade === d
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {DIFICULDADE_LABELS[d].icon} {DIFICULDADE_LABELS[d].label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Stats bar */}
            <div className="grid grid-cols-3 gap-4 mb-8 max-w-lg mx-auto">
              <div className="bg-card rounded-xl border border-border p-3 text-center">
                <p className="text-2xl font-bold text-blue-400">{flashcardStats.novos}</p>
                <p className="text-xs text-muted-foreground">Novos</p>
              </div>
              <div className="bg-card rounded-xl border border-border p-3 text-center">
                <p className="text-2xl font-bold text-amber-400">{flashcardStats.aprendendo}</p>
                <p className="text-xs text-muted-foreground">Aprendendo</p>
              </div>
              <div className="bg-card rounded-xl border border-border p-3 text-center">
                <p className="text-2xl font-bold text-emerald-400">{flashcardStats.conhecidos}</p>
                <p className="text-xs text-muted-foreground">Conhecidos</p>
              </div>
            </div>

            {/* ============================================ */}
            {/* FLASHCARDS MODE */}
            {/* ============================================ */}
            {modo === "flashcards" && flashcards.length > 0 && (
              <div className="max-w-xl mx-auto">
                {/* Progress */}
                <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
                  <span>
                    Cartão {currentFlashIdx + 1} de {flashcards.length}
                  </span>
                  <div className="flex items-center gap-2">
                    <button onClick={resetFlashcards} className="hover:text-foreground transition-colors" title="Resetar progresso">
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full h-2 bg-border rounded-full mb-6 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary to-amber-400 rounded-full"
                    animate={{ width: `${((currentFlashIdx + 1) / flashcards.length) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>

                {/* Flashcard */}
                <AnimatePresence mode="wait">
                  {currentFlashcard && (
                    <motion.div
                      key={currentFlashcard.word.strong}
                      initial={{ x: swipeDir === "left" ? -300 : swipeDir === "right" ? 300 : 0, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: swipeDir === "left" ? -300 : 300, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flashcard-container cursor-pointer" onClick={() => setFlipped((f) => !f)}>
                        <div className={cn("flashcard-inner w-full min-h-[320px] relative", flipped && "flipped")}>
                          {/* Front */}
                          <div className="flashcard-front absolute inset-0 bg-card rounded-2xl border-2 border-primary/30 golden-glow p-8 flex flex-col items-center justify-center">
                            <span
                              className={cn(
                                "px-3 py-1 rounded-full text-xs font-medium border mb-4",
                                CATEGORIA_COR[currentFlashcard.word.categoria] || "bg-card text-muted-foreground border-border"
                              )}
                            >
                              {CATEGORIAS_MAP[currentFlashcard.word.categoria] || currentFlashcard.word.categoria}
                            </span>

                            <span className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                              {currentFlashcard.word.idioma === "grego" ? "🇬🇷" : "🇮🇱"} {currentFlashcard.word.idioma === "grego" ? "Grego" : "Hebraico"}
                            </span>

                            <p className="text-4xl md:text-5xl font-bold text-center mb-3 leading-tight">
                              {currentFlashcard.word.palavra}
                            </p>
                            <p className="text-xl text-muted-foreground mb-4 italic">
                              {currentFlashcard.word.transliteracao}
                            </p>
                            <p className="text-sm text-primary font-mono">{currentFlashcard.word.strong}</p>

                            <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
                              <Volume2 className="w-4 h-4" />
                              Clique para ver a definição
                            </div>

                            {/* Status badge */}
                            <div className="absolute top-4 right-4">
                              {currentFlashcard.status === "conhecido" && (
                                <span className="flex items-center gap-1 text-emerald-400 text-xs">
                                  <Check className="w-4 h-4" /> Conhecido
                                </span>
                              )}
                              {currentFlashcard.status === "aprendendo" && (
                                <span className="flex items-center gap-1 text-amber-400 text-xs">
                                  <BookOpen className="w-4 h-4" /> Aprendendo
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Back */}
                          <div className="flashcard-back absolute inset-0 bg-gradient-to-br from-primary/10 to-amber-500/10 rounded-2xl border-2 border-primary/50 p-8 flex flex-col items-center justify-center">
                            <span className="text-xs text-muted-foreground mb-2">Definição</span>
                            <p className="text-xl md:text-2xl font-semibold text-center mb-4 leading-relaxed">
                              {currentFlashcard.word.definicaoResumida}
                            </p>

                            <div className="w-full border-t border-border pt-4 mt-2 space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Strong&apos;s:</span>
                                <span className="font-mono font-bold text-primary">{currentFlashcard.word.strong}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Frequência:</span>
                                <span className="font-bold">{currentFlashcard.word.frequencia}× no texto</span>
                              </div>
                              {currentFlashcard.word.versiculos && currentFlashcard.word.versiculos.length > 0 && (
                                <div className="flex justify-between text-sm">
                                  <span className="text-muted-foreground">Exemplo:</span>
                                  <span>{currentFlashcard.word.versiculos.slice(0, 3).join(", ")}</span>
                                </div>
                              )}
                            </div>

                            <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
                              <RotateCcw className="w-4 h-4" />
                              Clique para voltar
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Action buttons */}
                <div className="flex justify-center gap-3 mt-6">
                  <button
                    onClick={handleFlashcardDontKnow}
                    className="flex items-center gap-2 px-5 py-3 rounded-xl bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20 transition-all font-semibold"
                    title="Não sei (←)"
                  >
                    <X className="w-5 h-5" />
                    Não sei
                  </button>
                  <button
                    onClick={handleFlashcardLearning}
                    className="flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30 hover:bg-amber-500/20 transition-all font-semibold"
                    title="Aprendendo (↑)"
                  >
                    <BookOpen className="w-5 h-5" />
                    Aprendendo
                  </button>
                  <button
                    onClick={handleFlashcardKnow}
                    className="flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20 transition-all font-semibold"
                    title="Sei (→)"
                  >
                    <Check className="w-5 h-5" />
                    Sei
                  </button>
                </div>

                {/* Keyboard hints */}
                <div className="flex justify-center gap-4 mt-3 text-xs text-muted-foreground">
                  <span>← Não sei</span>
                  <span>↑ Aprendendo</span>
                  <span>→ Sei</span>
                  <span>Espaço: Virar</span>
                </div>
              </div>
            )}

            {modo === "flashcards" && flashcards.length === 0 && !carregando && (
              <div className="text-center py-16">
                <Layers className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <p className="text-lg font-semibold">Nenhuma palavra encontrada</p>
                <p className="text-sm text-muted-foreground mt-1">Tente alterar os filtros de idioma ou categoria</p>
              </div>
            )}

            {/* ============================================ */}
            {/* QUIZ MODE */}
            {/* ============================================ */}
            {modo === "quiz" && !quizAtivo && !quizFinalizado && (
              <div className="max-w-xl mx-auto text-center">
                <div className="bg-card rounded-2xl border border-border p-8">
                  <Target className="w-16 h-16 mx-auto text-primary mb-4" />
                  <h2 className="text-2xl font-bold mb-2">Quiz Bíblico</h2>
                  <p className="text-muted-foreground mb-6">
                    Teste seus conhecimentos sobre palavras gregas e hebraicas!
                  </p>

                  <div className="space-y-3 mb-6 text-left">
                    {(Object.keys(DIFICULDADE_LABELS) as Dificuldade[]).map((d) => (
                      <button
                        key={d}
                        onClick={() => setDificuldade(d)}
                        className={cn(
                          "w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left",
                          dificuldade === d
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        )}
                      >
                        <span className="text-2xl">{DIFICULDADE_LABELS[d].icon}</span>
                        <div>
                          <p className="font-semibold">{DIFICULDADE_LABELS[d].label}</p>
                          <p className="text-sm text-muted-foreground">{DIFICULDADE_LABELS[d].desc}</p>
                        </div>
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={startQuiz}
                    className="w-full px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-amber-500 text-white font-bold text-lg shadow-lg shadow-primary/25 hover:shadow-xl transition-all"
                  >
                    <Zap className="w-5 h-5 inline mr-2" />
                    Iniciar Quiz
                  </button>

                  <p className="text-xs text-muted-foreground mt-4">
                    10 perguntas · {TIMER_SECONDS}s por pergunta · {DIFICULDADE_LABELS[dificuldade].label}
                  </p>
                </div>

                {/* High scores */}
                {quizScores.length > 0 && (
                  <div className="mt-8 bg-card rounded-2xl border border-border p-6">
                    <h3 className="text-lg font-bold mb-4 flex items-center justify-center gap-2">
                      <Trophy className="w-5 h-5 text-amber-400" />
                      Melhores Resultados
                    </h3>
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {quizScores.slice(0, 10).map((s, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-border"
                        >
                          <div className="flex items-center gap-3">
                            <span className={cn(
                              "w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm",
                              i === 0 ? "bg-amber-500/20 text-amber-400" :
                              i === 1 ? "bg-gray-300/20 text-gray-300" :
                              i === 2 ? "bg-orange-500/20 text-orange-400" :
                              "bg-card text-muted-foreground"
                            )}>
                              {i + 1}
                            </span>
                            <div className="text-left">
                              <p className="font-semibold">
                                {s.corretas}/{s.total} ({s.percentual}%)
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {DIFICULDADE_LABELS[s.dificuldade]?.label} · {s.tempo}s
                              </p>
                            </div>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {new Date(s.data).toLocaleDateString("pt-BR")}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Quiz active */}
            {modo === "quiz" && quizAtivo && !quizFinalizado && quizPerguntas[quizIdx] && (
              <div className="max-w-xl mx-auto">
                {/* Timer + progress */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">
                      Pergunta {quizIdx + 1} de {quizPerguntas.length}
                    </span>
                    <span className="text-sm font-mono font-bold text-primary">
                      {quizScore.corretas}/{quizScore.total}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-border rounded-full overflow-hidden mb-2">
                    <motion.div
                      className="h-full bg-gradient-to-r from-primary to-amber-400 rounded-full"
                      animate={{ width: `${((quizIdx + 1) / quizPerguntas.length) * 100}%` }}
                    />
                  </div>
                  {/* Timer bar */}
                  <div className="w-full h-1 bg-border rounded-full overflow-hidden">
                    <div
                      className={cn(
                        "h-full rounded-full timer-bar",
                        quizTimer > 5 ? "bg-emerald-500" : quizTimer > 3 ? "bg-amber-500" : "bg-red-500"
                      )}
                      style={{ width: `${(quizTimer / TIMER_SECONDS) * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span className={cn(
                      "text-xs font-mono font-bold",
                      quizTimer > 5 ? "text-emerald-400" : quizTimer > 3 ? "text-amber-400" : "text-red-400"
                    )}>
                      {quizTimer}s
                    </span>
                    <Timer className="w-3 h-3 text-muted-foreground" />
                  </div>
                </div>

                {/* Question type badge */}
                <div className="flex justify-center mb-4">
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium border border-primary/20">
                    {quizPerguntas[quizIdx].tipo === "definicao" && "📐 Definição"}
                    {quizPerguntas[quizIdx].tipo === "palavra" && "🔤 Palavra"}
                    {quizPerguntas[quizIdx].tipo === "strong" && "🔢 Strong's"}
                    {quizPerguntas[quizIdx].tipo === "livro" && "📖 Livro"}
                  </span>
                </div>

                {/* Question */}
                <div className="bg-card rounded-2xl border border-border p-8 mb-6">
                  <h2 className="text-xl md:text-2xl font-bold text-center leading-relaxed">
                    {quizPerguntas[quizIdx].pergunta}
                  </h2>
                </div>

                {/* Options */}
                <div className="space-y-3">
                  {quizPerguntas[quizIdx].opcoes.map((opcao, i) => {
                    const isSelected = quizResposta === i;
                    const isCorrect = i === quizPerguntas[quizIdx].respostaCorreta;
                    const showResult = quizMostrarExplicacao;

                    return (
                      <button
                        key={i}
                        onClick={() => handleQuizAnswer(i)}
                        disabled={quizResposta !== null}
                        className={cn(
                          "option-btn w-full p-4 rounded-xl border-2 text-left font-medium flex items-center gap-3",
                          showResult && isCorrect && "border-emerald-500 bg-emerald-500/10 text-emerald-400",
                          showResult && isSelected && !isCorrect && "border-red-500 bg-red-500/10 text-red-400",
                          !showResult && "border-border hover:border-primary/50 hover:bg-primary/5",
                          showResult && !isCorrect && !isSelected && "border-border opacity-50"
                        )}
                      >
                        <span
                          className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0",
                            showResult && isCorrect ? "bg-emerald-500 text-white" :
                            showResult && isSelected ? "bg-red-500 text-white" :
                            "bg-muted text-muted-foreground"
                          )}
                        >
                          {showResult && isCorrect ? (
                            <Check className="w-4 h-4" />
                          ) : showResult && isSelected ? (
                            <X className="w-4 h-4" />
                          ) : (
                            i + 1
                          )}
                        </span>
                        <span className="flex-1">{opcao}</span>
                        {showResult && isCorrect && (
                          <span className="text-emerald-400 text-sm font-semibold">Correto!</span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation / Next */}
                {quizMostrarExplicacao && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6"
                  >
                    {quizResposta !== quizPerguntas[quizIdx].respostaCorreta && quizResposta !== -1 && (
                      <div className="bg-card rounded-xl border border-border p-4 mb-4">
                        <p className="text-sm text-muted-foreground mb-1">Resposta correta:</p>
                        <p className="font-semibold text-primary">
                          {quizPerguntas[quizIdx].opcoes[quizPerguntas[quizIdx].respostaCorreta]}
                        </p>
                      </div>
                    )}
                    {quizResposta === -1 && (
                      <div className="bg-card rounded-xl border border-amber-500/30 p-4 mb-4">
                        <p className="text-sm text-amber-400 font-semibold">Tempo esgotado!</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Resposta: {quizPerguntas[quizIdx].opcoes[quizPerguntas[quizIdx].respostaCorreta]}
                        </p>
                      </div>
                    )}

                    {/* Word details */}
                    <div className="bg-card rounded-xl border border-border p-4 mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg font-bold">{quizPerguntas[quizIdx].palavraCorreta.palavra}</span>
                        <span className="text-sm text-muted-foreground italic">
                          {quizPerguntas[quizIdx].palavraCorreta.transliteracao}
                        </span>
                        <span className="text-xs font-mono text-primary">{quizPerguntas[quizIdx].palavraCorreta.strong}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {quizPerguntas[quizIdx].palavraCorreta.definicaoResumida}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Frequência: {quizPerguntas[quizIdx].palavraCorreta.frequencia}× ·{" "}
                        {CATEGORIAS_MAP[quizPerguntas[quizIdx].palavraCorreta.categoria] || quizPerguntas[quizIdx].palavraCorreta.categoria}
                      </p>
                    </div>

                    <button
                      onClick={handleQuizNext}
                      className="w-full px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                    >
                      {quizIdx + 1 >= quizPerguntas.length ? (
                        <>
                          <Trophy className="w-5 h-5" />
                          Ver Resultado
                        </>
                      ) : (
                        <>
                          Próxima
                          <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </motion.div>
                )}
              </div>
            )}

            {/* Quiz finished */}
            {modo === "quiz" && quizFinalizado && (
              <div className="max-w-xl mx-auto text-center">
                <div className="bg-card rounded-2xl border border-border p-8">
                  {quizScore.corretas === quizScore.total ? (
                    <Award className="w-20 h-20 mx-auto text-amber-400 mb-4" />
                  ) : quizScore.corretas >= quizScore.total * 0.7 ? (
                    <Star className="w-20 h-20 mx-auto text-emerald-400 mb-4" />
                  ) : (
                    <Brain className="w-20 h-20 mx-auto text-primary mb-4" />
                  )}

                  <h2 className="text-3xl font-bold mb-2">
                    {quizScore.corretas === quizScore.total
                      ? "Perfeito! 🎉"
                      : quizScore.corretas >= quizScore.total * 0.7
                      ? "Muito Bem!"
                      : "Continue Estudando!"}
                  </h2>

                  <div className="my-6">
                    <p className="text-6xl font-bold text-primary">
                      {quizScore.corretas}/{quizScore.total}
                    </p>
                    <p className="text-lg text-muted-foreground mt-2">
                      {Math.round((quizScore.corretas / Math.max(quizScore.total, 1)) * 100)}% de acerto
                    </p>
                  </div>

                  <div className="flex justify-center gap-3 mb-6">
                    <span className="px-4 py-2 rounded-xl bg-background border border-border text-sm font-medium">
                      {DIFICULDADE_LABELS[dificuldade].icon} {DIFICULDADE_LABELS[dificuldade].label}
                    </span>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={startQuiz}
                      className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-amber-500 text-white font-semibold shadow-lg shadow-primary/25 hover:shadow-xl transition-all flex items-center justify-center gap-2"
                    >
                      <RotateCcw className="w-5 h-5" />
                      Jogar Novamente
                    </button>
                    <button
                      onClick={resetQuiz}
                      className="px-6 py-3 rounded-xl bg-card border border-border text-muted-foreground font-semibold hover:bg-card/80 transition-all"
                    >
                      Menu
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollReveal>
      </main>

      <Footer />
    </div>
  );
}
