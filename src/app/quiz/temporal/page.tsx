'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Trophy, Clock, ArrowLeft, Check, X, RotateCcw } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import Link from 'next/link';
import { obterPerguntasAleatorias, CATEGORIAS_QUIZ, NIVEIS_QUIZ, type PerguntaQuiz } from '@/data/quiz';

const TEMPO_TOTAL = 60;

export default function QuizTemporalPage() {
  const [tela, setTela] = useState<'inicio' | 'jogo' | 'resultado'>('inicio');
  const [perguntas, setPerguntas] = useState<PerguntaQuiz[]>([]);
  const [idxAtual, setIdxAtual] = useState(0);
  const [respostaSel, setRespostaSel] = useState<number | null>(null);
  const [acertou, setAcertou] = useState<boolean | null>(null);
  const [acertosCount, setAcertosCount] = useState(0);
  const [totalRespondidas, setTotalRespondidas] = useState(0);
  const [timer, setTimer] = useState(TEMPO_TOTAL);
  const [mostrarExp, setMostrarExp] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const perguntaAtual = perguntas[idxAtual];

  const iniciarQuiz = useCallback(() => {
    const perg = obterPerguntasAleatorias(100);
    setPerguntas(perg);
    setIdxAtual(0);
    setAcertosCount(0);
    setTotalRespondidas(0);
    setRespostaSel(null);
    setAcertou(null);
    setMostrarExp(false);
    setTimer(TEMPO_TOTAL);
    setTela('jogo');
  }, []);

  useEffect(() => {
    if (tela !== 'jogo') return;
    timerRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          setTela('resultado');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [tela]);

  const selecionarResposta = (idx: number) => {
    if (respostaSel !== null || acertou !== null || tela !== 'jogo') return;
    setRespostaSel(idx);
    const correto = idx === perguntaAtual.respostaCorreta;
    setAcertou(correto);
    setMostrarExp(true);
    setTotalRespondidas((t) => t + 1);
    if (correto) setAcertosCount((c) => c + 1);
  };

  const proximaPergunta = () => {
    if (idxAtual + 1 >= perguntas.length) {
      if (timerRef.current) clearInterval(timerRef.current);
      setTela('resultado');
    } else {
      setIdxAtual((p) => p + 1);
      setRespostaSel(null);
      setAcertou(null);
      setMostrarExp(false);
    }
  };

  if (tela === 'inicio') {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-24 pb-16 px-6">
          <div className="max-w-2xl mx-auto">
            <ScrollReveal>
              <Link href="/quiz" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
                <ArrowLeft className="w-4 h-4" /> Voltar
              </Link>
              <div className="text-center mb-10">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', duration: 0.6 }} className="w-16 h-16 rounded-2xl bg-amber-500/10 flex items-center justify-center mx-auto mb-6">
                  <Zap className="w-8 h-8 text-amber-500" />
                </motion.div>
                <h1 className="font-display text-4xl font-light mb-3">Desafio do Tempo</h1>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Você tem <span className="font-semibold text-amber-500">60 segundos</span> para responder o máximo de perguntas possível. Cada acerto vale pontos, bônus por velocidade!
                </p>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="rounded-2xl border border-border/50 bg-card/50 p-4 text-center">
                  <Clock className="w-5 h-5 text-amber-500 mx-auto mb-2" />
                  <p className="font-display text-2xl font-light">60s</p>
                  <p className="text-xs text-muted-foreground">Tempo</p>
                </div>
                <div className="rounded-2xl border border-border/50 bg-card/50 p-4 text-center">
                  <Zap className="w-5 h-5 text-amber-500 mx-auto mb-2" />
                  <p className="font-display text-2xl font-light">∞</p>
                  <p className="text-xs text-muted-foreground">Perguntas</p>
                </div>
                <div className="rounded-2xl border border-border/50 bg-card/50 p-4 text-center">
                  <Trophy className="w-5 h-5 text-amber-500 mx-auto mb-2" />
                  <p className="font-display text-2xl font-light">+5</p>
                  <p className="text-xs text-muted-foreground">Bônus/s</p>
                </div>
              </div>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={iniciarQuiz} className="w-full py-4 bg-amber-500 text-white rounded-2xl font-display text-lg font-medium hover:bg-amber-600 transition-all flex items-center justify-center gap-2">
                Começar! <Zap className="w-5 h-5" />
              </motion.button>
            </ScrollReveal>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (tela === 'resultado') {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-24 pb-16 px-6">
          <div className="max-w-2xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-10">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', duration: 0.6 }} className="w-20 h-20 rounded-full bg-amber-500/10 flex items-center justify-center mx-auto mb-6">
                  <Trophy className="w-10 h-10 text-amber-500" />
                </motion.div>
                <h1 className="font-display text-3xl font-light mb-2">Tempo Esgotado!</h1>
                <p className="text-muted-foreground">Aqui estão seus resultados</p>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-8">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="rounded-2xl border border-border/50 bg-card/50 p-5 text-center">
                  <p className="font-display text-4xl font-light text-amber-500">{acertosCount}</p>
                  <p className="text-xs text-muted-foreground mt-1">Acertos</p>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="rounded-2xl border border-border/50 bg-card/50 p-5 text-center">
                  <p className="font-display text-4xl font-light text-primary">{totalRespondidas}</p>
                  <p className="text-xs text-muted-foreground mt-1">Respondidas</p>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="rounded-2xl border border-border/50 bg-card/50 p-5 text-center">
                  <p className="font-display text-4xl font-light text-green-500">{totalRespondidas > 0 ? Math.round((acertosCount / totalRespondidas) * 100) : 0}%</p>
                  <p className="text-xs text-muted-foreground mt-1">Aproveitamento</p>
                </motion.div>
              </div>
              <div className="flex gap-3">
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={iniciarQuiz} className="flex-1 py-3 bg-amber-500 text-white rounded-xl font-medium flex items-center justify-center gap-2">
                  <RotateCcw className="w-4 h-4" /> Tentar Novamente
                </motion.button>
                <Link href="/quiz" className="flex-1">
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full py-3 border border-border rounded-xl font-medium hover:bg-muted/50 transition-all">
                    Menu
                  </motion.button>
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!perguntaAtual) return null;
  const opcoesFiltradas = perguntaAtual.tipo === 'verdadeiro_falso'
    ? [perguntaAtual.opcoes[0], perguntaAtual.opcoes[1]]
    : perguntaAtual.opcoes;

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-500" />
              <span className="text-sm font-medium">{acertosCount} acertos</span>
            </div>
            <div className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-bold ${timer <= 10 ? 'bg-red-500/10 text-red-500 animate-pulse' : timer <= 30 ? 'bg-amber-500/10 text-amber-500' : 'bg-muted/50 text-muted-foreground'}`}>
              <Clock className="w-4 h-4" /> {timer}s
            </div>
          </div>
          <div className="h-2 bg-border/30 rounded-full overflow-hidden mb-8">
            <motion.div
              className={`h-full rounded-full transition-colors duration-300 ${timer <= 10 ? 'bg-red-500' : timer <= 30 ? 'bg-amber-500' : 'bg-amber-500'}`}
              animate={{ width: `${(timer / TEMPO_TOTAL) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={idxAtual} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }} transition={{ duration: 0.2 }}>
              <div className="rounded-2xl border border-border/50 bg-card/50 p-6 mb-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${CATEGORIAS_QUIZ[perguntaAtual.categoria]?.cor}`}>{CATEGORIAS_QUIZ[perguntaAtual.categoria]?.icon} {CATEGORIAS_QUIZ[perguntaAtual.categoria]?.label}</span>
                </div>
                <h2 className="font-display text-xl font-medium leading-relaxed">{perguntaAtual.enunciado}</h2>
              </div>
              <div className="space-y-3">
                {opcoesFiltradas.map((opcao, i) => {
                  if (!opcao) return null;
                  const selecionado = respostaSel === i;
                  const correto = i === perguntaAtual.respostaCorreta;
                  let estilo = 'border-border/30 hover:border-amber-500/50 hover:bg-muted/30';
                  if (mostrarExp && correto) estilo = 'border-green-500/50 bg-green-500/10';
                  else if (mostrarExp && selecionado && !correto) estilo = 'border-red-500/50 bg-red-500/10';
                  return (
                    <motion.button key={i} whileHover={!mostrarExp ? { scale: 1.01 } : {}} whileTap={!mostrarExp ? { scale: 0.99 } : {}} onClick={() => selecionarResposta(i)} disabled={mostrarExp} className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${estilo}`}>
                      <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-semibold ${mostrarExp && correto ? 'bg-green-500 text-white' : mostrarExp && selecionado ? 'bg-red-500 text-white' : 'bg-muted/50 text-muted-foreground'}`}>
                        {mostrarExp && correto ? <Check className="w-4 h-4" /> : mostrarExp && selecionado ? <X className="w-4 h-4" /> : String.fromCharCode(65 + i)}
                      </span>
                      <span className="text-sm font-medium">{opcao}</span>
                    </motion.button>
                  );
                })}
              </div>
              {mostrarExp && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 p-4 rounded-xl bg-amber-500/5 border border-amber-500/20">
                  <p className="text-sm leading-relaxed text-muted-foreground">{perguntaAtual.explicacao}</p>
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={proximaPergunta} className="mt-4 w-full py-3 bg-amber-500 text-white rounded-xl font-medium flex items-center justify-center gap-2">
                    Próxima Pergunta <Clock className="w-4 h-4" />
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
      <Footer />
    </div>
  );
}
