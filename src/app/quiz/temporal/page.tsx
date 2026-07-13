'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { motion } from 'framer-motion';
import { Zap, Trophy, Clock, ArrowLeft } from 'lucide-react';
import { QuizCard } from '@/components/QuizCard';
import { QuizProgress } from '@/components/QuizProgress';
import { QuizTimer } from '@/components/QuizTimer';
import { QuizResults } from '@/components/QuizResults';
import ScrollReveal from '@/components/ScrollReveal';
import Link from 'next/link';
import { obterPerguntasAleatorias, type PerguntaQuiz } from '@/data/quiz';

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
  const [respostas, setRespostas] = useState<(number | null)[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const perguntaAtual = perguntas[idxAtual];

  const iniciarQuiz = useCallback(() => {
    const perg = obterPerguntasAleatorias(100);
    setPerguntas(perg);
    setIdxAtual(0);
    setAcertosCount(0);
    setTotalRespondidas(0);
    setRespostas([]);
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
    setRespostas((prev) => [...prev, idx]);
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
          <QuizResults
            pontuacao={acertosCount}
            acertos={acertosCount}
            totalPerguntas={totalRespondidas}
            nivel="facil"
            tempoTotal={TEMPO_TOTAL}
            perguntas={perguntas.slice(0, totalRespondidas)}
            respostas={respostas}
            onJogarNovamente={iniciarQuiz}
            onVoltarMenu={() => setTela('inicio')}
          />
        </main>
        <Footer />
      </div>
    );
  }

  if (!perguntaAtual) return null;

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16 px-6">
        <div className="max-w-2xl mx-auto">
          <QuizProgress
            perguntaAtual={idxAtual}
            totalPerguntas={perguntas.length}
            pontuacao={acertosCount}
            acertos={acertosCount}
            modo="temporal"
          />
          <QuizTimer
            tempoRestante={timer}
            tempoTotal={TEMPO_TOTAL}
            tamanho="md"
          />
          <div className="mt-4">
            <QuizCard
              pergunta={perguntaAtual}
              respostaSel={respostaSel}
              mostrarExplicacao={mostrarExp}
              onSelecionarResposta={selecionarResposta}
              onProxima={proximaPergunta}
              isUltima={idxAtual + 1 >= perguntas.length}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
