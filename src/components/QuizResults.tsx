'use client';

import { motion } from 'framer-motion';
import { Trophy, Target, Clock, RotateCcw, Home, Share2, Star, Check, X, BookOpen, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { CATEGORIAS_QUIZ, NIVEIS_QUIZ, type PerguntaQuiz, type NivelQuiz } from '@/data/quiz';

interface QuizResultsProps {
  pontuacao: number;
  acertos: number;
  totalPerguntas: number;
  nivel: NivelQuiz;
  tempoTotal?: number;
  perguntas: PerguntaQuiz[];
  respostas: (number | null)[];
  melhorPontuacao?: number;
  onJogarNovamente: () => void;
  onVoltarMenu: () => void;
  conquistasDesbloqueadas?: string[];
}

export function QuizResults({
  pontuacao,
  acertos,
  totalPerguntas,
  nivel,
  tempoTotal,
  perguntas,
  respostas,
  melhorPontuacao = 0,
  onJogarNovamente,
  onVoltarMenu,
  conquistasDesbloqueadas = [],
}: QuizResultsProps) {
  const [mostrarRevisao, setMostrarRevisao] = useState(false);
  const [itemRevisao, setItemRevisao] = useState<number | null>(null);

  const erros = totalPerguntas - acertos;
  const pct = Math.round((acertos / totalPerguntas) * 100);
  const maxPtsPossivel = totalPerguntas * (nivel === 'facil' ? 10 : nivel === 'medio' ? 20 : 30);
  const tempoMedio = tempoTotal ? Math.round(tempoTotal / totalPerguntas) : null;
  const novoRecorde = pontuacao > melhorPontuacao && melhorPontuacao > 0;

  const getGrau = () => {
    if (pct >= 90) return { titulo: 'Excelente!', subtitulo: 'Você é um expert bíblico!', emoji: '🏆' };
    if (pct >= 70) return { titulo: 'Muito Bem!', subtitulo: 'Conhecimento sólido!', emoji: '⭐' };
    if (pct >= 50) return { titulo: 'Bom Trabalho!', subtitulo: 'Continue estudando!', emoji: '📖' };
    if (pct >= 30) return { titulo: 'Continue Tentando!', subtitulo: 'A prática leva à perfeição.', emoji: '💪' };
    return { titulo: 'Estude Mais!', subtitulo: 'Revise o conteúdo e tente novamente.', emoji: '📚' };
  };

  const grau = getGrau();

  const compartilhar = () => {
    const texto = `📖 Quiz Bíblico - ${grau.emoji}\n✅ ${acertos}/${totalPerguntas} acertos (${pct}%)\n⭐ ${pontuacao} pontos\n🎯 ${NIVEIS_QUIZ[nivel].label}\n\nTeste seus conhecimentos em Sola Scriptura BR!`;
    if (navigator.share) {
      navigator.share({ title: 'Quiz Bíblico', text: texto });
    } else {
      navigator.clipboard.writeText(texto);
    }
  };

  const stats = [
    { label: 'Pontos', value: pontuacao, icon: Trophy, color: 'text-amber-500', delay: 0.2 },
    { label: 'Acertos', value: `${acertos}/${totalPerguntas}`, icon: Target, color: 'text-green-500', delay: 0.3 },
    { label: 'Aproveitamento', value: `${pct}%`, icon: Star, color: 'text-primary', delay: 0.4 },
  ];

  if (tempoMedio !== null) {
    stats.push({ label: 'Tempo Médio', value: `${tempoMedio}s`, icon: Clock, color: 'text-blue-500', delay: 0.5 });
  }

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.6 }}
          className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 text-4xl"
        >
          {grau.emoji}
        </motion.div>
        <h1 className="font-display text-3xl font-light mb-2">{grau.titulo}</h1>
        <p className="text-muted-foreground">{grau.subtitulo}</p>
        {novoRecorde && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-3 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20"
          >
            <Trophy className="w-4 h-4 text-amber-500" />
            <span className="text-sm font-semibold text-amber-500">Novo Recorde!</span>
          </motion.div>
        )}
      </motion.div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        {stats.map((s) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: s.delay }}
            className="rounded-2xl border border-border/50 bg-card/50 p-4 text-center"
          >
            <s.icon className={`w-5 h-5 ${s.color} mx-auto mb-2`} />
            <p className={`font-display text-2xl font-light ${s.color}`}>{s.value}</p>
            <p className="text-[10px] text-muted-foreground mt-1">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {conquistasDesbloqueadas.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-6 p-4 rounded-xl bg-amber-500/5 border border-amber-500/20"
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-amber-500 mb-2">Conquistas Desbloqueadas</p>
          <div className="flex flex-wrap gap-2">
            {conquistasDesbloqueadas.map((c) => (
              <span key={c} className="px-3 py-1 rounded-full bg-amber-500/10 text-xs font-medium text-amber-500">
                {c}
              </span>
            ))}
          </div>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mb-6"
      >
        <button
          onClick={() => setMostrarRevisao(!mostrarRevisao)}
          className="w-full flex items-center justify-between p-4 rounded-xl border border-border/50 bg-card/50 hover:bg-muted/30 transition-all"
        >
          <span className="text-sm font-medium">Revisar Respostas</span>
          {mostrarRevisao ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {mostrarRevisao && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-2 space-y-2"
          >
            {perguntas.map((p, i) => {
              const respostaUsuario = respostas[i];
              const correto = respostaUsuario === p.respostaCorreta;
              return (
                <div
                  key={p.id}
                  className="p-3 rounded-xl border border-border/30 bg-background/50 cursor-pointer hover:bg-muted/20 transition-all"
                  onClick={() => setItemRevisao(itemRevisao === i ? null : i)}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                      correto ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                    }`}>
                      {correto ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                    </span>
                    <span className="text-sm flex-1 line-clamp-1">{p.enunciado}</span>
                    <span className={`text-xs font-medium ${correto ? 'text-green-500' : 'text-red-500'}`}>
                      {correto ? '+ pts' : '0 pts'}
                    </span>
                  </div>

                  {itemRevisao === i && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-3 pl-9 space-y-2"
                    >
                      <div className="flex items-center gap-1 text-xs text-primary">
                        <BookOpen className="w-3 h-3" />
                        {p.referencia || 'Sem referência'}
                      </div>
                      <p className="text-xs text-muted-foreground">{p.explicacao}</p>
                      {!correto && respostaUsuario !== null && respostaUsuario >= 0 && (
                        <p className="text-xs text-red-500">
                          Sua resposta: {p.opcoes[respostaUsuario]}
                        </p>
                      )}
                      <p className="text-xs text-green-500">
                        Resposta correta: {p.opcoes[p.respostaCorreta]}
                      </p>
                    </motion.div>
                  )}
                </div>
              );
            })}
          </motion.div>
        )}
      </motion.div>

      <div className="flex gap-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onJogarNovamente}
          className="flex-1 py-3 bg-primary text-primary-foreground rounded-xl font-medium flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-4 h-4" /> Jogar Novamente
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={compartilhar}
          className="py-3 px-4 border border-border rounded-xl font-medium hover:bg-muted/50 transition-all flex items-center justify-center gap-2"
        >
          <Share2 className="w-4 h-4" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onVoltarMenu}
          className="py-3 px-4 border border-border rounded-xl font-medium hover:bg-muted/50 transition-all flex items-center justify-center gap-2"
        >
          <Home className="w-4 h-4" />
        </motion.button>
      </div>
    </div>
  );
}
