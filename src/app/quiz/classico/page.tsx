'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { motion } from 'framer-motion';
import { Brain, ChevronRight, ArrowLeft } from 'lucide-react';
import { QuizCard } from '@/components/QuizCard';
import { QuizProgress } from '@/components/QuizProgress';
import { QuizTimer } from '@/components/QuizTimer';
import { QuizResults } from '@/components/QuizResults';
import ScrollReveal from '@/components/ScrollReveal';
import Link from 'next/link';
import { obterPerguntas, CATEGORIAS_QUIZ, NIVEIS_QUIZ, type CategoriaQuiz, type NivelQuiz, type PerguntaQuiz } from '@/data/quiz';

interface RankingItem { nome: string; pontuacao: number; nivel: NivelQuiz; data: string; }

const PERGUNTAS_POR_RODADA = 10;
const TEMPO_POR_PERGUNTA = 30;

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

export default function QuizClassicoPage() {
  const [tela, setTela] = useState<'inicio' | 'jogo' | 'resultado'>('inicio');
  const [nivel, setNivel] = useState<NivelQuiz>('facil');
  const [categoria, setCategoria] = useState<CategoriaQuiz | null>(null);
  const [perguntas, setPerguntas] = useState<PerguntaQuiz[]>([]);
  const [idxAtual, setIdxAtual] = useState(0);
  const [respostaSel, setRespostaSel] = useState<number | null>(null);
  const [acertou, setAcertou] = useState<boolean | null>(null);
  const [pontuacao, setPontuacao] = useState(0);
  const [timer, setTimer] = useState(TEMPO_POR_PERGUNTA);
  const [ranking, setRanking] = useState<RankingItem[]>([]);
  const [mostrarExp, setMostrarExp] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [acertosCount, setAcertosCount] = useState(0);
  const [respostas, setRespostas] = useState<(number | null)[]>([]);
  const [nomeJogador, setNomeJogador] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
        return usuario.nome || '';
      } catch { return ''; }
    }
    return '';
  });

  useEffect(() => { setRanking(carregarRanking()); }, []);

  const perguntaAtual = perguntas[idxAtual];

  const iniciarQuiz = useCallback(() => {
    const perg = obterPerguntas(nivel, categoria || undefined, PERGUNTAS_POR_RODADA);
    setPerguntas(perg);
    setIdxAtual(0);
    setPontuacao(0);
    setAcertosCount(0);
    setRespostas([]);
    setRespostaSel(null);
    setAcertou(null);
    setMostrarExp(false);
    setTimer(TEMPO_POR_PERGUNTA);
    setTela('jogo');
  }, [nivel, categoria]);

  useEffect(() => {
    if (tela !== 'jogo' || acertou !== null || respostaSel !== null) return;
    timerRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          setRespostaSel(-1);
          setAcertou(false);
          setMostrarExp(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [tela, idxAtual, acertou, respostaSel]);

  const selecionarResposta = (idx: number) => {
    if (respostaSel !== null || acertou !== null) return;
    if (timerRef.current) clearInterval(timerRef.current);
    setRespostaSel(idx);
    setRespostas((prev) => [...prev, idx]);
    const correto = idx === perguntaAtual.respostaCorreta;
    setAcertou(correto);
    setMostrarExp(true);
    if (correto) {
      const pts = nivel === 'facil' ? 10 : nivel === 'medio' ? 20 : 30;
      setPontuacao((p) => p + pts + Math.floor(timer / 3));
      setAcertosCount((c) => c + 1);
    }
  };

  const proximaPergunta = () => {
    if (idxAtual + 1 >= perguntas.length) {
      salvarRanking({ nome: nomeJogador || 'Jogador', pontuacao, nivel, data: new Date().toISOString() });
      setRanking(carregarRanking());
      setTela('resultado');
    } else {
      setIdxAtual((p) => p + 1);
      setRespostaSel(null);
      setAcertou(null);
      setMostrarExp(false);
      setTimer(TEMPO_POR_PERGUNTA);
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
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Brain className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h1 className="font-display text-3xl font-light">Quiz Clássico</h1>
                  <p className="text-sm text-muted-foreground">30 segundos por pergunta</p>
                </div>
              </div>
              <div className="space-y-6">
                <div className="rounded-2xl border border-border/50 bg-card/50 p-6">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 block">Seu Nome</label>
                  <input
                    type="text"
                    value={nomeJogador}
                    onChange={(e) => setNomeJogador(e.target.value)}
                    placeholder="Como quer ser chamado?"
                    className="w-full px-4 py-2.5 text-sm border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  />
                </div>
                <div className="rounded-2xl border border-border/50 bg-card/50 p-6">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 block">Nível de Dificuldade</label>
                  <div className="grid grid-cols-3 gap-3">
                    {(Object.entries(NIVEIS_QUIZ) as [NivelQuiz, { label: string; cor: string }][]).map(([key, val]) => (
                      <motion.button key={key} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => setNivel(key)} className={`p-4 rounded-xl border-2 transition-all text-center ${nivel === key ? 'border-primary bg-primary/5' : 'border-border/30 hover:border-border'}`}>
                        <p className="font-display text-lg font-medium">{val.label}</p>
                        <p className="text-xs text-muted-foreground mt-1">{key === 'facil' ? '10 pts' : key === 'medio' ? '20 pts' : '30 pts'}</p>
                      </motion.button>
                    ))}
                  </div>
                </div>
                <div className="rounded-2xl border border-border/50 bg-card/50 p-6">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 block">Categoria (opcional)</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setCategoria(null)} className={`p-3 rounded-xl border-2 transition-all text-left ${categoria === null ? 'border-primary bg-primary/5' : 'border-border/30 hover:border-border'}`}>
                      <p className="text-sm font-medium">Todas</p>
                      <p className="text-xs text-muted-foreground">Mistura de todas categorias</p>
                    </motion.button>
                    {(Object.entries(CATEGORIAS_QUIZ) as [CategoriaQuiz, { label: string; icon: string; cor: string }][]).map(([key, val]) => (
                      <motion.button key={key} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setCategoria(key)} className={`p-3 rounded-xl border-2 transition-all text-left ${categoria === key ? 'border-primary bg-primary/5' : 'border-border/30 hover:border-border'}`}>
                        <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${val.cor}`}>{val.icon} {val.label}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={iniciarQuiz} className="w-full py-4 bg-primary text-primary-foreground rounded-2xl font-display text-lg font-medium hover:bg-primary/90 transition-all flex items-center justify-center gap-2">
                  Iniciar Quiz <ChevronRight className="w-5 h-5" />
                </motion.button>
              </div>
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
              <QuizResults
                pontuacao={pontuacao}
                acertos={acertosCount}
                totalPerguntas={perguntas.length}
                nivel={nivel}
                perguntas={perguntas}
                respostas={respostas}
                melhorPontuacao={ranking[0]?.pontuacao ?? 0}
                onJogarNovamente={iniciarQuiz}
                onVoltarMenu={() => setTela('inicio')}
              />
            </ScrollReveal>
          </div>
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
            pontuacao={pontuacao}
            categoria={perguntaAtual.categoria}
            nivel={nivel}
            acertos={acertosCount}
            modo="classico"
          />
          <QuizTimer
            tempoRestante={timer}
            tempoTotal={TEMPO_POR_PERGUNTA}
            tamanho="md"
            onTempoEsgotado={() => {
              setRespostaSel(-1);
              setAcertou(false);
              setMostrarExp(true);
            }}
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
