'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Users, Plus, Link as LinkIcon, Check, Clock, Trophy, ArrowLeft, Zap, Target, Flame, Timer } from 'lucide-react';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import { cn } from '@/lib/utils';
import { obterPerguntasAleatorias, type PerguntaQuiz } from '@/data/quiz';
import { createWebRTCService, type WebRTCService } from '@/lib/webrtc';

interface QuizRoom {
  code: string;
  hostId: string;
  players: QuizPlayer[];
  status: 'waiting' | 'countdown' | 'playing' | 'finished';
  currentQuestion: number;
  questions: PerguntaQuiz[];
  answers: QuizAnswer[];
  startedAt?: number;
}

interface QuizPlayer {
  id: string;
  name: string;
  score: number;
  streak: number;
  correctCount: number;
}

interface QuizAnswer {
  playerId: string;
  playerName: string;
  questionId: string;
  selectedIndex: number;
  isCorrect: boolean;
  timeSpent: number;
  points: number;
}

function getPlayerId(): string {
  if (typeof window === 'undefined') return 'user-0';
  const stored = localStorage.getItem('ssb_quiz_player_id');
  if (stored) return stored;
  const id = `qp-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  localStorage.setItem('ssb_quiz_player_id', id);
  return id;
}

function getPlayerName(): string {
  if (typeof window === 'undefined') return 'Jogador';
  const stored = localStorage.getItem('ssb_quiz_player_name');
  if (stored) return stored;
  const names = ['Pedro', 'Paulo', 'Tiago', 'João', 'André', 'Filipe', 'Bartolomeu', 'Mateus', 'Tomé', 'Simão', 'Judas', 'Matias'];
  const name = names[Math.floor(Math.random() * names.length)];
  localStorage.setItem('ssb_quiz_player_name', name);
  return name;
}

export default function QuizMultiplayerPage() {
  const [screen, setScreen] = useState<'lobby' | 'waiting' | 'countdown' | 'playing' | 'results'>('lobby');
  const [room, setRoom] = useState<QuizRoom | null>(null);
  const [joinCode, setJoinCode] = useState('');
  const [copied, setCopied] = useState(false);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [countdown, setCountdown] = useState(3);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [scores, setScores] = useState<QuizPlayer[]>([]);
  const [playerName, setPlayerName] = useState('');
  const [playerId] = useState(getPlayerId);
  const [streak, setStreak] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [wsPlayers, setWsPlayers] = useState<QuizPlayer[]>([]);
  const svcRef = useRef<WebRTCService | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const isHost = room?.hostId === playerId;

  // WebSocket
  useEffect(() => {
    if (!room) return;
    const svc = createWebRTCService();
    svcRef.current = svc;

    svc.onParticipants((participants) => {
      const players = participants.map(p => ({
        id: p.participantId,
        name: p.displayName,
        score: 0,
        streak: 0,
        correctCount: 0,
      }));
      setWsPlayers(players);
      setRoom(prev => prev ? { ...prev, players } : prev);
    });

    // Listen for quiz events
    svc.connect(room.code, playerId, playerName || getPlayerName());

    return () => { svc.disconnect(); svcRef.current = null; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [room?.code]);

  // Timer
  useEffect(() => {
    if (screen !== 'playing' || showResult) return;
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screen, showResult, currentQIndex]);

  // Countdown
  useEffect(() => {
    if (screen !== 'countdown') return;
    if (countdown <= 0) {
      setScreen('playing');
      setCurrentQIndex(0);
      setTimeLeft(30);
      return;
    }
    const t = setTimeout(() => setCountdown(prev => prev - 1), 1000);
    return () => clearTimeout(t);
  }, [screen, countdown]);

  const handleTimeUp = useCallback(() => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(-1);
    setShowResult(true);
    const q = room?.questions[currentQIndex];
    if (q) {
      const answer: QuizAnswer = {
        playerId, playerName: playerName || getPlayerName(),
        questionId: q.id, selectedIndex: -1, isCorrect: false,
        timeSpent: 30, points: 0,
      };
      setAnswers(prev => [...prev, answer]);
      setStreak(0);
    }
  }, [selectedAnswer, room, currentQIndex, playerId, playerName]);

  const createRoom = useCallback(() => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const questions = obterPerguntasAleatorias(15);
    const name = playerName || getPlayerName();
    const player: QuizPlayer = { id: playerId, name, score: 0, streak: 0, correctCount: 0 };
    const newRoom: QuizRoom = {
      code, hostId: playerId, players: [player], status: 'waiting',
      currentQuestion: 0, questions, answers: [],
    };
    setRoom(newRoom);
    setPlayerName(name);
    setScreen('waiting');
  }, [playerId, playerName]);

  const joinRoom = useCallback(() => {
    if (joinCode.length !== 6) return;
    const name = playerName || getPlayerName();
    const player: QuizPlayer = { id: playerId, name, score: 0, streak: 0, correctCount: 0 };
    const newRoom: QuizRoom = {
      code: joinCode, hostId: '', players: [player], status: 'waiting',
      currentQuestion: 0,       questions: obterPerguntasAleatorias(15), answers: [],
    };
    setRoom(newRoom);
    setPlayerName(name);
    setScreen('waiting');
  }, [joinCode, playerId, playerName]);

  const startGame = useCallback(() => {
    if (!room || !isHost) return;
    setRoom(prev => prev ? { ...prev, status: 'countdown', startedAt: Date.now() } : prev);
    setScreen('countdown');
    setCountdown(3);
  }, [room, isHost]);

  const handleAnswer = useCallback((index: number) => {
    if (selectedAnswer !== null || !room) return;
    setSelectedAnswer(index);
    setShowResult(true);
    if (timerRef.current) clearInterval(timerRef.current);

    const q = room.questions[currentQIndex];
    const isCorrect = index === q.respostaCorreta;
    const timeSpent = 30 - timeLeft;
    const basePoints = isCorrect ? 100 : 0;
    const timeBonus = isCorrect ? Math.max(0, Math.floor((30 - timeSpent) * 3.3)) : 0;
    const streakBonus = isCorrect ? streak * 25 : 0;
    const points = basePoints + timeBonus + streakBonus;

    const answer: QuizAnswer = {
      playerId, playerName: playerName || getPlayerName(),
      questionId: q.id, selectedIndex: index, isCorrect, timeSpent, points,
    };
    setAnswers(prev => [...prev, answer]);
    setTotalScore(prev => prev + points);
    if (isCorrect) setStreak(prev => prev + 1); else setStreak(0);
  }, [selectedAnswer, room, currentQIndex, timeLeft, streak, playerId, playerName]);

  const nextQuestion = useCallback(() => {
    if (!room) return;
    if (currentQIndex < room.questions.length - 1) {
      setCurrentQIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setTimeLeft(30);
    } else {
      setScores(prev => [...prev].sort((a, b) => b.score - a.score));
      setScreen('results');
    }
  }, [room, currentQIndex]);

  const copyLink = useCallback(() => {
    if (!room) return;
    navigator.clipboard.writeText(`${window.location.origin}/quiz/multiplayer?code=${room.code}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [room]);

  const currentQuestion = room?.questions[currentQIndex];
  const currentAnswer = showResult ? answers.find(a => a.questionId === currentQuestion?.id) : null;

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">
          <Link href="/quiz" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> Voltar ao Quiz
          </Link>

          {/* LOBBY */}
          {screen === 'lobby' && (
            <ScrollReveal>
              <div className="text-center mb-12">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center border border-amber-500/20">
                  <Users className="w-10 h-10 text-amber-500" />
                </motion.div>
                <h1 className="font-display text-4xl font-light mb-3">
                  Quiz <span className="text-primary italic">Multiplayer</span>
                </h1>
                <p className="text-muted-foreground text-lg max-w-md mx-auto">
                  Desafie seus amigos em tempo real! Crie uma sala ou entre com código.
                </p>
              </div>

              <div className="space-y-4 max-w-sm mx-auto">
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">Seu nome</label>
                  <input type="text" value={playerName} onChange={e => setPlayerName(e.target.value)}
                    placeholder={getPlayerName()}
                    className="w-full px-4 py-3 bg-surface-raised border border-border rounded-xl text-center font-medium focus:outline-none focus:ring-2 focus:ring-primary/30" />
                </div>

                <motion.button onClick={createRoom} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold shadow-lg shadow-amber-500/25">
                  <Plus className="w-5 h-5" /> Criar Sala
                </motion.button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border/40" /></div>
                  <div className="relative flex justify-center text-xs"><span className="bg-[var(--surface-base)] px-3 text-muted-foreground">ou entre com código</span></div>
                </div>

                <div className="flex gap-2">
                  <input type="text" value={joinCode} onChange={e => setJoinCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="Código de 6 dígitos"
                    className="flex-1 px-4 py-3 bg-surface-raised border border-border rounded-xl text-center font-mono text-lg tracking-[0.3em] focus:outline-none focus:ring-2 focus:ring-primary/30"
                    onKeyDown={e => e.key === 'Enter' && joinRoom()} maxLength={6} />
                  <motion.button onClick={joinRoom} disabled={joinCode.length !== 6} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    className={cn('px-5 py-3 rounded-xl font-semibold transition-all', joinCode.length === 6 ? 'bg-surface-raised border border-border' : 'opacity-50 cursor-not-allowed bg-surface-raised')}>
                    <LinkIcon className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </ScrollReveal>
          )}

          {/* WAITING ROOM */}
          {screen === 'waiting' && room && (
            <ScrollReveal>
              <div className="text-center mb-8">
                <h2 className="font-display text-3xl font-light mb-2">Sala de Espera</h2>
                <p className="text-muted-foreground">Compartilhe o código com seus amigos</p>
              </div>

              <div className="glass-card p-6 rounded-2xl mb-6">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <span className="text-sm text-muted-foreground">Código da sala:</span>
                  <span className="font-mono text-3xl font-bold tracking-[0.3em] text-primary">{room.code}</span>
                  <button onClick={copyLink} className="p-2 hover:bg-surface-raised rounded-lg transition-colors">
                    {copied ? <Check className="w-4 h-4 text-green-500" /> : <LinkIcon className="w-4 h-4" />}
                  </button>
                </div>

                <div className="space-y-2 mb-6">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Jogadores ({room.players.length})</p>
                  {room.players.map((p, i) => (
                    <div key={p.id} className="flex items-center gap-3 px-3 py-2 rounded-lg bg-surface-sunken/50">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                        {p.name.charAt(0)}
                      </div>
                      <span className="font-medium">{p.name}</span>
                      {p.id === room.hostId && <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 font-semibold">HOST</span>}
                      {p.id === playerId && <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-semibold">VOCÊ</span>}
                    </div>
                  ))}
                </div>

                {isHost ? (
                  <motion.button onClick={startGame} disabled={room.players.length < 1} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    className={cn('w-full py-3 rounded-xl font-semibold transition-all',
                      room.players.length >= 1 ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg' : 'opacity-50 cursor-not-allowed bg-muted')}>
                    <Zap className="w-4 h-4 inline mr-2" />
                    {room.players.length < 1 ? 'Aguardando jogadores...' : 'Iniciar Quiz'}
                  </motion.button>
                ) : (
                  <div className="text-center py-3 text-muted-foreground text-sm">
                    Aguardando o host iniciar...
                  </div>
                )}
              </div>
            </ScrollReveal>
          )}

          {/* COUNTDOWN */}
          {screen === 'countdown' && (
            <div className="flex items-center justify-center min-h-[60vh]">
              <AnimatePresence mode="wait">
                <motion.div key={countdown} initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 1.5, opacity: 0 }} transition={{ duration: 0.3 }}
                  className="text-center">
                  <div className="text-8xl font-display font-bold text-primary mb-4">{countdown}</div>
                  <p className="text-xl text-muted-foreground">Preparar...</p>
                </motion.div>
              </AnimatePresence>
            </div>
          )}

          {/* PLAYING */}
          {screen === 'playing' && currentQuestion && (
            <div className="max-w-lg mx-auto">
              {/* Header do quiz */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">
                    {currentQIndex + 1}/{room?.questions.length}
                  </span>
                  <div className="flex items-center gap-1">
                    <Timer className="w-4 h-4" />
                    <span className={cn('font-mono font-bold', timeLeft <= 10 ? 'text-red-500' : 'text-foreground')}>
                      {timeLeft}s
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {streak > 0 && (
                    <div className="flex items-center gap-1 text-orange-500">
                      <Flame className="w-4 h-4" />
                      <span className="text-sm font-bold">x{streak}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Trophy className="w-4 h-4 text-amber-500" />
                    <span className="text-sm font-bold">{totalScore}</span>
                  </div>
                </div>
              </div>

              {/* Barra de tempo */}
              <div className="h-1.5 bg-muted rounded-full mb-6 overflow-hidden">
                <motion.div className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
                  animate={{ width: `${(timeLeft / 30) * 100}%` }}
                  transition={{ duration: 0.5 }} />
              </div>

              {/* Pergunta */}
              <motion.div key={currentQuestion.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                className="glass-card p-6 rounded-2xl mb-6">
                <span className={cn('text-xs font-semibold px-2.5 py-1 rounded-full mb-3 inline-block',
                  currentQuestion.nivel === 'facil' ? 'bg-green-500/10 text-green-600' :
                  currentQuestion.nivel === 'medio' ? 'bg-amber-500/10 text-amber-600' :
                  'bg-red-500/10 text-red-600')}>
                  {currentQuestion.nivel === 'facil' ? 'Fácil' : currentQuestion.nivel === 'medio' ? 'Médio' : 'Difícil'}
                </span>
                <h3 className="text-lg font-medium leading-relaxed mt-2">{currentQuestion.enunciado}</h3>
              </motion.div>

              {/* Opções */}
              <div className="space-y-3">
                {currentQuestion.opcoes.map((opt, i) => {
                  if (!opt) return null;
                  const isSelected = selectedAnswer === i;
                  const isCorrect = i === currentQuestion.respostaCorreta;
                  const showCorrect = showResult && isCorrect;
                  const showWrong = showResult && isSelected && !isCorrect;

                  return (
                    <motion.button key={i} onClick={() => handleAnswer(i)} disabled={showResult}
                      whileHover={!showResult ? { scale: 1.01 } : {}}
                      whileTap={!showResult ? { scale: 0.99 } : {}}
                      className={cn('w-full text-left px-5 py-4 rounded-xl border-2 transition-all font-medium',
                        showCorrect && 'border-green-500 bg-green-500/10 text-green-700 dark:text-green-400',
                        showWrong && 'border-red-500 bg-red-500/10 text-red-700 dark:text-red-400',
                        !showResult && isSelected && 'border-primary bg-primary/10',
                        !showResult && !isSelected && 'border-border hover:border-primary/50 hover:bg-surface-raised',
                        showResult && !isCorrect && !isSelected && 'border-border opacity-50',
                      )}>
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-lg bg-surface-sunken flex items-center justify-center text-sm font-bold flex-shrink-0">
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span className="flex-1">{opt}</span>
                        {showCorrect && <Check className="w-5 h-5 text-green-500 flex-shrink-0" />}
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {/* Explicação + próximo */}
              {showResult && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className="mt-6 space-y-4">
                  {currentAnswer && (
                    <div className={cn('p-4 rounded-xl border',
                      currentAnswer.isCorrect ? 'bg-green-500/5 border-green-500/20' : 'bg-red-500/5 border-red-500/20')}>
                      <p className="text-sm font-medium mb-1">
                        {currentAnswer.isCorrect ? `✅ Correto! +${currentAnswer.points} pontos` : '❌ Incorreto'}
                      </p>
                      <p className="text-sm text-muted-foreground">{currentQuestion.explicacao}</p>
                    </div>
                  )}
                  <motion.button onClick={nextQuestion} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold">
                    {currentQIndex < (room?.questions.length || 0) - 1 ? 'Próxima Pergunta' : 'Ver Resultados'}
                  </motion.button>
                </motion.div>
              )}
            </div>
          )}

          {/* RESULTS */}
          {screen === 'results' && (
            <ScrollReveal>
              <div className="text-center mb-8">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', duration: 0.5 }}
                  className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                  <Trophy className="w-10 h-10 text-white" />
                </motion.div>
                <h2 className="font-display text-3xl font-light mb-2">Resultados</h2>
              </div>

              <div className="glass-card p-6 rounded-2xl mb-6">
                <div className="text-center mb-6">
                  <p className="text-sm text-muted-foreground mb-1">Sua pontuação</p>
                  <p className="text-5xl font-display font-bold text-primary">{totalScore}</p>
                  <div className="flex items-center justify-center gap-4 mt-3 text-sm text-muted-foreground">
                    <span>{answers.filter(a => a.isCorrect).length}/{room?.questions.length} corretas</span>
                    <span>•</span>
                    <span>Streak máximo: x{Math.max(streak, ...answers.reduce((acc, a) => { if (a.isCorrect) acc[acc.length - 1]++; else acc.push(0); return acc; }, [0]))}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  {scores.sort((a, b) => b.score - a.score).map((p, i) => (
                    <div key={p.id} className={cn('flex items-center gap-3 px-4 py-3 rounded-xl',
                      i === 0 ? 'bg-amber-500/10 border border-amber-500/20' : 'bg-surface-sunken/50')}>
                      <span className="text-lg font-bold text-muted-foreground w-8">{i + 1}º</span>
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                        {p.name.charAt(0)}
                      </div>
                      <span className="font-medium flex-1">{p.name}</span>
                      <span className="font-bold">{p.score}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                {isHost && (
                  <motion.button onClick={() => { setScreen('lobby'); setRoom(null); setAnswers([]); setScores([]); setTotalScore(0); setStreak(0); setCurrentQIndex(0); }}
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold">
                    Nova Sala
                  </motion.button>
                )}
                <Link href="/quiz" className="flex-1 py-3 rounded-xl border border-border text-center font-medium hover:bg-muted/50 transition-all">
                  Voltar ao Quiz
                </Link>
              </div>
            </ScrollReveal>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
