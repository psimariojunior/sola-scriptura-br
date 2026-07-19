'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Zap, BookOpen, Users, Trophy, ChevronRight, Clock, Target, CheckCircle2, XCircle, Flame, Star, ArrowLeft, RotateCcw, Home, Timer, Award, TrendingUp } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import Link from 'next/link';
import { LIVROS_BIBLIA, todasPerguntas, type PerguntaQuiz } from '@/data/quiz';
import { useState, useEffect, useRef, useCallback } from 'react';

const MODOS = [
  {
    id: 'classico',
    titulo: 'Quiz Clássico',
    descricao: 'Escolha nível e categoria. 30 segundos por pergunta.',
    icone: Brain,
    cor: 'from-primary/20 to-primary/5',
    iconeCor: 'text-primary',
    link: '/quiz/classico',
  },
  {
    id: 'tempo',
    titulo: 'Desafio do Tempo',
    descricao: '60 segundos. O máximo de acertos que conseguir.',
    icone: Zap,
    cor: 'from-amber-500/20 to-amber-500/5',
    iconeCor: 'text-amber-500',
    link: '/quiz/temporal',
  },
  {
    id: 'livro',
    titulo: 'Estudo por Livro',
    descricao: 'Foque em um livro específico da Bíblia.',
    icone: BookOpen,
    cor: 'from-emerald-500/20 to-emerald-500/5',
    iconeCor: 'text-emerald-500',
    link: '/quiz/livro',
  },
  {
    id: 'multiplayer',
    titulo: 'Multiplayer',
    descricao: 'Desafie amigos em tempo real.',
    icone: Users,
    cor: 'from-purple-500/20 to-purple-500/5',
    iconeCor: 'text-purple-500',
    link: '/quiz/multiplayer',
  },
];

const CATEGORIAS_QUIZ = [
  { id: 'geral', label: 'Geral', icon: '📖', cor: 'from-primary/20 to-primary/5', iconeCor: 'text-primary', livros: [] as string[] },
  { id: 'genesis', label: 'Gênesis', icon: '🌍', cor: 'from-emerald-500/20 to-emerald-500/5', iconeCor: 'text-emerald-500', livros: ['Gênesis'] },
  { id: 'exodo', label: 'Êxodo', icon: '🔥', cor: 'from-amber-500/20 to-amber-500/5', iconeCor: 'text-amber-500', livros: ['Êxodo'] },
  { id: 'salmos', label: 'Salmos', icon: '🎵', cor: 'from-blue-500/20 to-blue-500/5', iconeCor: 'text-blue-500', livros: ['Salmos'] },
  { id: 'proverbios', label: 'Provérbios', icon: '💡', cor: 'from-yellow-500/20 to-yellow-500/5', iconeCor: 'text-yellow-500', livros: ['Provérbios'] },
  { id: 'evangelhos', label: 'Evangelhos', icon: '✝️', cor: 'from-rose-500/20 to-rose-500/5', iconeCor: 'text-rose-500', livros: ['Mateus', 'Marcos', 'Lucas', 'João'] },
  { id: 'epistolas', label: 'Epístolas', icon: '✉️', cor: 'from-violet-500/20 to-violet-500/5', iconeCor: 'text-violet-500', livros: ['Romanos', '1 Coríntios', '2 Coríntios', 'Gálatas', 'Efésios', 'Filipenses', 'Colossenses', '1 Tessalonicenses', '2 Tessalonicenses', '1 Timóteo', '2 Timóteo', 'Tito', 'Filemon', 'Hebreus', 'Tiago', '1 Pedro', '2 Pedro', '1 João', '2 João', '3 João', 'Judas'] },
  { id: 'profetas', label: 'Profetas', icon: '📜', cor: 'from-orange-500/20 to-orange-500/5', iconeCor: 'text-orange-500', livros: ['Isaías', 'Jeremias', 'Lamentações', 'Ezequiel', 'Daniel', 'Oséias', 'Joel', 'Amós', 'Obadias', 'Jonas', 'Miquéias', 'Naum', 'Habacuque', 'Sofonias', 'Ageu', 'Zacarias', 'Malaquias'] },
];

const TEMPO_POR_PERGUNTA = 5;
const PONTOS_RAPIDO = 3;
const PONTOS_MEDIO = 2;
const PONTOS_LENTO = 1;
const BONUS_STREAK = 1;
const LIMITE_STREAK = 3;

const RANKINGS = [
  { min: 0, max: 30, label: 'Novato', cor: 'text-gray-400', bg: 'bg-gray-500/10', icone: '🌱' },
  { min: 30, max: 60, label: 'Estudioso', cor: 'text-blue-400', bg: 'bg-blue-500/10', icone: '📚' },
  { min: 60, max: 80, label: 'Teólogo', cor: 'text-purple-400', bg: 'bg-purple-500/10', icone: '🎓' },
  { min: 80, max: 101, label: 'Mestre', cor: 'text-amber-400', bg: 'bg-amber-500/10', icone: '👑' },
];

interface RankingItem { nome: string; pontuacao: number; nivel: string; data: string; }

function carregarRanking(): RankingItem[] {
  if (typeof window === 'undefined') return [];
  try { return JSON.parse(localStorage.getItem('ssb_quiz_ranking') || '[]'); } catch { return []; }
}

function salvarRanking(item: RankingItem) {
  const ranking = carregarRanking();
  ranking.push(item);
  ranking.sort((a, b) => b.pontuacao - a.pontuacao);
  localStorage.setItem('ssb_quiz_ranking', JSON.stringify(ranking.slice(0, 50)));
}

type TelaQuiz = 'inicio' | 'categorias' | 'jogando' | 'resultado';

export default function QuizPage() {
  const [ranking, setRanking] = useState<RankingItem[]>([]);
  const [tela, setTela] = useState<TelaQuiz>('inicio');
  const [categoriaSel, setCategoriaSel] = useState<string>('geral');
  const [perguntas, setPerguntas] = useState<PerguntaQuiz[]>([]);
  const [indiceAtual, setIndiceAtual] = useState(0);
  const [opcaoSelecionada, setOpcaoSelecionada] = useState<number | null>(null);
  const [respondido, setRespondido] = useState(false);
  const [pontuacao, setPontuacao] = useState(0);
  const [acertos, setAcertos] = useState(0);
  const [erros, setErros] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maiorStreak, setMaiorStreak] = useState(0);
  const [tempoRestante, setTempoRestante] = useState(TEMPO_POR_PERGUNTA);
  const [temposResposta, setTemposResposta] = useState<number[]>([]);
  const [feedbackAnim, setFeedbackAnim] = useState<'acerto' | 'erro' | null>(null);
  const [nomeJogador, setNomeJogador] = useState('');
  const [showNomeInput, setShowNomeInput] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const inicioPerguntaRef = useRef<number>(0);
  const totalPerguntas = perguntas.length;

  useEffect(() => { setRanking(carregarRanking()); }, []);

  const limparTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => limparTimer();
  }, [limparTimer]);

  const iniciarQuiz = useCallback((cat: string) => {
    setCategoriaSel(cat);
    let pool = [...todasPerguntas];
    const catObj = CATEGORIAS_QUIZ.find(c => c.id === cat);
    if (catObj && catObj.livros.length > 0) {
      pool = pool.filter(p => {
        if (p.referencia) {
          return catObj.livros.some(livro => p.referencia!.toLowerCase().includes(livro.toLowerCase()));
        }
        if (p.categoria === 'versiculos' || p.categoria === 'historia') {
          return false;
        }
        return true;
      });
    }
    const shuffled = pool.sort(() => Math.random() - 0.5).slice(0, Math.min(15, pool.length));
    setPerguntas(shuffled);
    setIndiceAtual(0);
    setOpcaoSelecionada(null);
    setRespondido(false);
    setPontuacao(0);
    setAcertos(0);
    setErros(0);
    setStreak(0);
    setMaiorStreak(0);
    setTempoRestante(TEMPO_POR_PERGUNTA);
    setTemposResposta([]);
    setFeedbackAnim(null);
    setTela('jogando');
    inicioPerguntaRef.current = Date.now();
  }, []);

  useEffect(() => {
    if (tela !== 'jogando' || respondido) return;
    limparTimer();
    setTempoRestante(TEMPO_POR_PERGUNTA);
    timerRef.current = setInterval(() => {
      setTempoRestante(prev => {
        if (prev <= 1) {
          limparTimer();
          setRespondido(true);
          setFeedbackAnim('erro');
          setErros(e => e + 1);
          setStreak(0);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => limparTimer();
  }, [indiceAtual, tela, respondido, limparTimer]);

  const responder = (indice: number) => {
    if (respondido || indice < 0 || indice >= perguntas.length) return;
    limparTimer();
    const agora = Date.now();
    const tempoGasto = (agora - inicioPerguntaRef.current) / 1000;
    const pergunta = perguntas[indiceAtual];
    if (!pergunta) return;
    const correto = indice === pergunta.respostaCorreta;

    setOpcaoSelecionada(indice);
    setRespondido(true);
    setTemposResposta(prev => [...prev, tempoGasto]);

    if (correto) {
      let pontos = 0;
      if (tempoGasto <= 2) pontos = PONTOS_RAPIDO;
      else if (tempoGasto <= 4) pontos = PONTOS_MEDIO;
      else pontos = PONTOS_LENTO;

      const novoStreak = streak + 1;
      if (novoStreak >= LIMITE_STREAK) pontos += BONUS_STREAK;

      setPontuacao(p => p + pontos);
      setAcertos(a => a + 1);
      setStreak(novoStreak);
      if (novoStreak > maiorStreak) setMaiorStreak(novoStreak);
      setFeedbackAnim('acerto');
    } else {
      setErros(e => e + 1);
      setStreak(0);
      setFeedbackAnim('erro');
    }

    setTimeout(() => setFeedbackAnim(null), 800);
  };

  const proximaPergunta = () => {
    if (indiceAtual + 1 >= totalPerguntas) {
      setTela('resultado');
      limparTimer();
    } else {
      setIndiceAtual(i => i + 1);
      setOpcaoSelecionada(null);
      setRespondido(false);
      setFeedbackAnim(null);
      inicioPerguntaRef.current = Date.now();
    }
  };

  const tempoMedio = temposResposta.length > 0
    ? temposResposta.reduce((a, b) => a + b, 0) / temposResposta.length
    : 0;
  const percentualAcerto = totalPerguntas > 0 ? Math.round((acertos / totalPerguntas) * 100) : 0;
  const rankingAtual = RANKINGS.find(r => percentualAcerto >= r.min && percentualAcerto < r.max) || RANKINGS[0];

  const salvarNoRanking = () => {
    if (!nomeJogador.trim()) return;
    salvarRanking({
      nome: nomeJogador.trim(),
      pontuacao,
      nivel: rankingAtual.label.toLowerCase(),
      data: new Date().toLocaleDateString('pt-BR'),
    });
    setRanking(carregarRanking());
    setShowNomeInput(false);
  };

  const progressoTimer = (tempoRestante / TEMPO_POR_PERGUNTA) * 100;
  const corTimer = tempoRestante <= 2 ? 'bg-red-500' : tempoRestante <= 3 ? 'bg-amber-500' : 'bg-emerald-500';

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            {tela === 'inicio' && (
              <motion.div key="inicio" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                <ScrollReveal>
                  <div className="text-center mb-12">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', duration: 0.6 }} className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                      <Brain className="w-8 h-8 text-primary" />
                    </motion.div>
                    <h1 className="font-display text-4xl font-light mb-3">Quiz Bíblico</h1>
                    <p className="text-muted-foreground max-w-md mx-auto">750+ perguntas em 5 categorias. Teste seus conhecimentos das Escrituras de várias formas.</p>
                  </div>
                </ScrollReveal>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                  {MODOS.map((modo, i) => (
                    <ScrollReveal key={modo.id} delay={i * 0.1}>
                      <Link href={modo.link}>
                        <motion.div whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }} className={`relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br ${modo.cor} p-6 cursor-pointer transition-all hover:shadow-lg hover:shadow-primary/5`}>
                          <div className={`w-12 h-12 rounded-xl bg-background/50 flex items-center justify-center mb-4 ${modo.iconeCor}`}>
                            <modo.icone className="w-6 h-6" />
                          </div>
                          <h3 className="font-display text-xl font-medium mb-1">{modo.titulo}</h3>
                          <p className="text-sm text-muted-foreground mb-4">{modo.descricao}</p>
                          <div className="flex items-center gap-1 text-sm font-medium text-primary">
                            Jogar <ChevronRight className="w-4 h-4" />
                          </div>
                        </motion.div>
                      </Link>
                    </ScrollReveal>
                  ))}
                </div>

                <ScrollReveal delay={0.2}>
                  <div className="rounded-2xl border border-border/50 bg-gradient-to-br from-primary/10 to-primary/5 p-6 mb-8">
                    <div className="flex items-center gap-2 mb-3">
                      <Zap className="w-5 h-5 text-primary" />
                      <h3 className="font-display text-lg font-medium">Novo: Quiz Rápido</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">5 segundos por pergunta. Pontuação por velocidade + bônus de streak.</p>
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setTela('categorias')} className="w-full sm:w-auto px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium text-sm">
                      Começar Agora
                    </motion.button>
                  </div>
                </ScrollReveal>

                <ScrollReveal delay={0.3}>
                  <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="rounded-2xl border border-border/50 bg-card/50 p-4 text-center">
                      <Brain className="w-5 h-5 text-primary mx-auto mb-2" />
                      <p className="font-display text-2xl font-light">750+</p>
                      <p className="text-xs text-muted-foreground">Perguntas</p>
                    </div>
                    <div className="rounded-2xl border border-border/50 bg-card/50 p-4 text-center">
                      <Target className="w-5 h-5 text-emerald-500 mx-auto mb-2" />
                      <p className="font-display text-2xl font-light">5</p>
                      <p className="text-xs text-muted-foreground">Categorias</p>
                    </div>
                    <div className="rounded-2xl border border-border/50 bg-card/50 p-4 text-center">
                      <Clock className="w-5 h-5 text-amber-500 mx-auto mb-2" />
                      <p className="font-display text-2xl font-light">4</p>
                      <p className="text-xs text-muted-foreground">Modos</p>
                    </div>
                  </div>
                </ScrollReveal>

                {ranking.length > 0 && (
                  <ScrollReveal delay={0.4}>
                    <div className="rounded-2xl border border-border/50 bg-card/50 p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <Trophy className="w-4 h-4 text-amber-500" />
                        <h3 className="text-sm font-semibold">Ranking Geral</h3>
                      </div>
                      <div className="space-y-2">
                        {ranking.slice(0, 10).map((item, i) => (
                          <div key={i} className="flex items-center justify-between p-2.5 rounded-xl bg-background/50">
                            <div className="flex items-center gap-3">
                              <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">{i + 1}</span>
                              <div>
                                <p className="text-sm font-medium">{item.nome}</p>
                                <p className="text-xs text-muted-foreground capitalize">{item.nivel}</p>
                              </div>
                            </div>
                            <span className="font-display text-lg font-semibold text-primary">{item.pontuacao}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </ScrollReveal>
                )}
              </motion.div>
            )}

            {tela === 'categorias' && (
              <motion.div key="categorias" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.3 }}>
                <div className="flex items-center gap-3 mb-8">
                  <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setTela('inicio')} className="w-10 h-10 rounded-xl bg-card/50 border border-border/50 flex items-center justify-center">
                    <ArrowLeft className="w-5 h-5" />
                  </motion.button>
                  <div>
                    <h2 className="font-display text-2xl font-light">Escolha a Categoria</h2>
                    <p className="text-sm text-muted-foreground">15 perguntas por partida</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {CATEGORIAS_QUIZ.map((cat, i) => (
                    <motion.button key={cat.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }} onClick={() => iniciarQuiz(cat.id)} className={`relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br ${cat.cor} p-5 text-left transition-all hover:shadow-lg hover:shadow-primary/5`}>
                      <span className="text-2xl mb-2 block">{cat.icon}</span>
                      <h3 className="font-display text-base font-medium">{cat.label}</h3>
                      {cat.livros.length > 0 && <p className="text-xs text-muted-foreground mt-1">{cat.livros.length} livros</p>}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {tela === 'jogando' && perguntas.length > 0 && (
              <motion.div key="jogando" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => { limparTimer(); setTela('categorias'); }} className="w-9 h-9 rounded-xl bg-card/50 border border-border/50 flex items-center justify-center">
                      <ArrowLeft className="w-4 h-4" />
                    </motion.button>
                    <span className="text-sm text-muted-foreground">{indiceAtual + 1} / {totalPerguntas}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    {streak >= LIMITE_STREAK && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-500 text-xs font-semibold">
                        <Flame className="w-3.5 h-3.5" />
                        {streak}x
                      </motion.div>
                    )}
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10">
                      <Star className="w-3.5 h-3.5 text-primary" />
                      <span className="text-sm font-semibold text-primary">{pontuacao}</span>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5">
                      <Timer className="w-3.5 h-3.5 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{tempoRestante}s</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{Math.round(progressoTimer)}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-border/50 overflow-hidden">
                    <motion.div className={`h-full rounded-full ${corTimer}`} initial={false} animate={{ width: `${progressoTimer}%` }} transition={{ duration: 0.3 }} />
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={indiceAtual}
                    initial={{ opacity: 0, x: 60 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -60 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                  >
                    <motion.div animate={feedbackAnim === 'erro' ? { x: [0, -8, 8, -6, 6, 0] } : feedbackAnim === 'acerto' ? { scale: [1, 1.02, 1] } : {}} transition={{ duration: 0.4 }}>
                      <div className="rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm p-6 mb-6">
                        <div className="flex items-start gap-3 mb-1">
                          <span className="shrink-0 w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">{indiceAtual + 1}</span>
                          <h3 className="font-display text-lg font-medium leading-snug">{perguntas[indiceAtual].enunciado}</h3>
                        </div>
                        {perguntas[indiceAtual].referencia && (
                          <p className="text-xs text-muted-foreground mt-2 ml-10">{perguntas[indiceAtual].referencia}</p>
                        )}
                      </div>

                      <div className="space-y-3 mb-6">
                        {perguntas[indiceAtual].opcoes.map((opcao, idx) => {
                          if (!opcao) return null;
                          const isSelected = opcaoSelecionada === idx;
                          const isCorreto = idx === perguntas[indiceAtual].respostaCorreta;
                          const showResult = respondido;
                          let classes = 'w-full text-left p-4 rounded-xl border transition-all duration-200 ';
                          if (showResult) {
                            if (isCorreto) {
                              classes += 'border-emerald-500/50 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400';
                            } else if (isSelected && !isCorreto) {
                              classes += 'border-red-500/50 bg-red-500/10 text-red-600 dark:text-red-400';
                            } else {
                              classes += 'border-border/30 bg-background/30 text-muted-foreground opacity-50';
                            }
                          } else {
                            classes += 'border-border/50 bg-background/50 hover:border-primary/30 hover:bg-primary/5 cursor-pointer';
                          }
                          return (
                            <motion.button key={idx} whileHover={!respondido ? { scale: 1.01 } : {}} whileTap={!respondido ? { scale: 0.99 } : {}} onClick={() => !respondido && responder(idx)} className={classes} disabled={respondido}>
                              <div className="flex items-center gap-3">
                                <span className="shrink-0 w-7 h-7 rounded-lg bg-background/50 flex items-center justify-center text-xs font-semibold">
                                  {showResult && isCorreto ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : showResult && isSelected && !isCorreto ? <XCircle className="w-4 h-4 text-red-500" /> : String.fromCharCode(65 + idx)}
                                </span>
                                <span className="text-sm font-medium">{opcao}</span>
                              </div>
                            </motion.button>
                          );
                        })}
                      </div>

                      {respondido && perguntas[indiceAtual].explicacao && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="rounded-xl border border-border/30 bg-background/30 p-4 mb-6">
                          <p className="text-xs text-muted-foreground leading-relaxed">{perguntas[indiceAtual].explicacao}</p>
                        </motion.div>
                      )}

                      {respondido && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-end">
                          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={proximaPergunta} className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium text-sm flex items-center gap-2">
                            {indiceAtual + 1 >= totalPerguntas ? 'Ver Resultado' : 'Próxima'}
                            <ChevronRight className="w-4 h-4" />
                          </motion.button>
                        </motion.div>
                      )}
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            )}

            {tela === 'resultado' && (
              <motion.div key="resultado" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
                <div className="text-center mb-8">
                  <motion.div initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', duration: 0.8, delay: 0.2 }} className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Award className="w-10 h-10 text-primary" />
                  </motion.div>
                  <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="font-display text-3xl font-light mb-2">Quiz Finalizado!</motion.h2>
                  <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }} className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${rankingAtual.bg} ${rankingAtual.cor} font-medium text-sm`}>
                    <span>{rankingAtual.icone}</span>
                    {rankingAtual.label}
                  </motion.div>
                </div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm p-6 mb-6">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center p-4 rounded-xl bg-background/50">
                      <p className="font-display text-3xl font-light text-primary">{pontuacao}</p>
                      <p className="text-xs text-muted-foreground mt-1">Pontos</p>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-background/50">
                      <p className="font-display text-3xl font-light text-emerald-500">{percentualAcerto}%</p>
                      <p className="text-xs text-muted-foreground mt-1">Acerto</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-xl bg-background/30">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        <span className="text-sm">Acertos</span>
                      </div>
                      <span className="text-sm font-semibold text-emerald-500">{acertos} / {totalPerguntas}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-background/30">
                      <div className="flex items-center gap-2">
                        <XCircle className="w-4 h-4 text-red-500" />
                        <span className="text-sm">Erros</span>
                      </div>
                      <span className="text-sm font-semibold text-red-500">{erros}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-background/30">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-blue-500" />
                        <span className="text-sm">Tempo médio</span>
                      </div>
                      <span className="text-sm font-semibold text-blue-500">{tempoMedio.toFixed(1)}s</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-background/30">
                      <div className="flex items-center gap-2">
                        <Flame className="w-4 h-4 text-amber-500" />
                        <span className="text-sm">Maior streak</span>
                      </div>
                      <span className="text-sm font-semibold text-amber-500">{maiorStreak}x</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-background/30">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-violet-500" />
                        <span className="text-sm">Bônus streak</span>
                      </div>
                      <span className="text-sm font-semibold text-violet-500">+{Math.floor(acertos / LIMITE_STREAK) * BONUS_STREAK}</span>
                    </div>
                  </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm p-6 mb-6">
                  <h3 className="font-display text-lg font-medium mb-4 flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-amber-500" />
                    Placar de Velocidade
                  </h3>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="text-center p-3 rounded-xl bg-emerald-500/10">
                      <p className="font-display text-xl font-light text-emerald-500">+{PONTOS_RAPIDO}</p>
                      <p className="text-xs text-muted-foreground mt-1">Rápido ({'<'}2s)</p>
                    </div>
                    <div className="text-center p-3 rounded-xl bg-amber-500/10">
                      <p className="font-display text-xl font-light text-amber-500">+{PONTOS_MEDIO}</p>
                      <p className="text-xs text-muted-foreground mt-1">Médio (2-4s)</p>
                    </div>
                    <div className="text-center p-3 rounded-xl bg-blue-500/10">
                      <p className="font-display text-xl font-light text-blue-500">+{PONTOS_LENTO}</p>
                      <p className="text-xs text-muted-foreground mt-1">Lento ({'>'}4s)</p>
                    </div>
                  </div>
                  {streak >= LIMITE_STREAK && (
                    <div className="mt-3 text-center p-2 rounded-xl bg-amber-500/10">
                      <p className="text-xs text-amber-500 font-medium">🔥 Bônus de streak: +{BONUS_STREAK} ponto a cada {LIMITE_STREAK} acertos seguidos</p>
                    </div>
                  )}
                </motion.div>

                {!showNomeInput ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="flex flex-col sm:flex-row gap-3">
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setShowNomeInput(true)} className="flex-1 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium text-sm flex items-center justify-center gap-2">
                      <Trophy className="w-4 h-4" />
                      Salvar no Ranking
                    </motion.button>
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => iniciarQuiz(categoriaSel)} className="flex-1 px-6 py-3 rounded-xl border border-border/50 bg-card/50 font-medium text-sm flex items-center justify-center gap-2">
                      <RotateCcw className="w-4 h-4" />
                      Jogar Novamente
                    </motion.button>
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setTela('categorias')} className="px-6 py-3 rounded-xl border border-border/50 bg-card/50 font-medium text-sm flex items-center justify-center gap-2">
                      <Home className="w-4 h-4" />
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm p-6">
                    <h3 className="font-display text-lg font-medium mb-4">Seu nome para o ranking:</h3>
                    <div className="flex gap-3">
                      <input type="text" value={nomeJogador} onChange={e => setNomeJogador(e.target.value)} onKeyDown={e => e.key === 'Enter' && salvarNoRanking()} placeholder="Digite seu nome..." maxLength={30} className="flex-1 px-4 py-3 rounded-xl border border-border/50 bg-background/50 text-sm outline-none focus:border-primary/50 transition-colors" autoFocus />
                      <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={salvarNoRanking} disabled={!nomeJogador.trim()} className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed">
                        Salvar
                      </motion.button>
                    </div>
                    <button onClick={() => setShowNomeInput(false)} className="mt-3 text-xs text-muted-foreground hover:text-foreground transition-colors">Cancelar</button>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
      <Footer />
    </div>
  );
}
