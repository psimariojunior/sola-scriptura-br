'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Trophy, Clock, ChevronRight, RotateCcw, ArrowLeft, Check, X } from 'lucide-react';
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

  useEffect(() => { setRanking(carregarRanking()); }, []);

  const perguntaAtual = perguntas[idxAtual];

  const iniciarQuiz = useCallback(() => {
    const perg = obterPerguntas(nivel, categoria || undefined, PERGUNTAS_POR_RODADA);
    setPerguntas(perg);
    setIdxAtual(0);
    setPontuacao(0);
    setAcertosCount(0);
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
      salvarRanking({ nome: 'Jogador', pontuacao, nivel, data: new Date().toISOString() });
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
    const maxPts = perguntas.length * (nivel === 'facil' ? 10 : nivel === 'medio' ? 20 : 30);
    const pct = Math.round((pontuacao / maxPts) * 100);
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-24 pb-16 px-6">
          <div className="max-w-2xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-10">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', duration: 0.6 }} className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <Trophy className="w-10 h-10 text-primary" />
                </motion.div>
                <h1 className="font-display text-3xl font-light mb-2">Quiz Completo!</h1>
                <p className="text-muted-foreground">Aqui estão seus resultados</p>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                  { delay: 0.2, value: pontuacao, label: 'Pontos', color: 'text-primary' },
                  { delay: 0.3, value: acertosCount, label: 'Acertos', color: 'text-green-500' },
                  { delay: 0.4, value: `${pct}%`, label: 'Aproveitamento', color: 'text-amber-500' },
                ].map((s) => (
                  <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: s.delay }} className="rounded-2xl border border-border/50 bg-card/50 p-5 text-center">
                    <p className={`font-display text-4xl font-light ${s.color}`}>{s.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
                  </motion.div>
                ))}
              </div>
              <div className="flex gap-3">
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={iniciarQuiz} className="flex-1 py-3 bg-primary text-primary-foreground rounded-xl font-medium flex items-center justify-center gap-2">
                  <RotateCcw className="w-4 h-4" /> Jogar Novamente
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
  const progresso = ((idxAtual + 1) / perguntas.length) * 100;
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
              <Brain className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">Pergunta {idxAtual + 1}/{perguntas.length}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-primary">{pontuacao} pts</span>
              <div className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium ${timer <= 10 ? 'bg-red-500/10 text-red-500' : 'bg-muted/50 text-muted-foreground'}`}>
                <Clock className="w-3.5 h-3.5" /> {timer}s
              </div>
            </div>
          </div>
          <div className="h-1.5 bg-border/30 rounded-full overflow-hidden mb-8">
            <motion.div className="h-full bg-primary rounded-full" initial={{ width: 0 }} animate={{ width: `${progresso}%` }} transition={{ duration: 0.3 }} />
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={idxAtual} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
              <div className="rounded-2xl border border-border/50 bg-card/50 p-6 mb-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${CATEGORIAS_QUIZ[perguntaAtual.categoria]?.cor}`}>{CATEGORIAS_QUIZ[perguntaAtual.categoria]?.icon} {CATEGORIAS_QUIZ[perguntaAtual.categoria]?.label}</span>
                  <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${NIVEIS_QUIZ[perguntaAtual.nivel]?.cor}`}>{NIVEIS_QUIZ[perguntaAtual.nivel]?.label}</span>
                </div>
                <h2 className="font-display text-xl font-medium leading-relaxed">{perguntaAtual.enunciado}</h2>
                {perguntaAtual.referencia && <p className="text-xs text-primary mt-2">📖 {perguntaAtual.referencia}</p>}
              </div>
              <div className="space-y-3">
                {opcoesFiltradas.map((opcao, i) => {
                  if (!opcao) return null;
                  const selecionado = respostaSel === i;
                  const correto = i === perguntaAtual.respostaCorreta;
                  let estilo = 'border-border/30 hover:border-primary/50 hover:bg-muted/30';
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
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 p-4 rounded-xl bg-primary/5 border border-primary/20">
                  <p className="text-sm leading-relaxed text-muted-foreground">{perguntaAtual.explicacao}</p>
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={proximaPergunta} className="mt-4 w-full py-3 bg-primary text-primary-foreground rounded-xl font-medium flex items-center justify-center gap-2">
                    {idxAtual + 1 >= perguntas.length ? 'Ver Resultado' : 'Próxima Pergunta'} <ChevronRight className="w-4 h-4" />
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
