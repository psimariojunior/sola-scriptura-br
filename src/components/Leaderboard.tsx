'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Medal, Crown, ChevronDown } from 'lucide-react';
import { getNivelByXP } from '@/data/conquistas';

interface EntradaRanking {
  nome: string;
  nivel: number;
  xp: number;
  avatar: string;
}

interface LeaderboardProps {
  dados: EntradaRanking[];
  nomeUsuarioAtual?: string;
  tempo?: 'semanal' | 'mensal' | 'geral';
  onTempoChange?: (tempo: 'semanal' | 'mensal' | 'geral') => void;
}

const MEDALHAS = [
  { icon: Crown, cor: 'text-yellow-500', bg: 'bg-yellow-500/10', label: 'Ouro' },
  { icon: Medal, cor: 'text-gray-400', bg: 'bg-gray-400/10', label: 'Prata' },
  { icon: Medal, cor: 'text-amber-700', bg: 'bg-amber-700/10', label: 'Bronze' },
];

const TEMPO_OPTIONS = [
  { value: 'semanal' as const, label: 'Esta Semana' },
  { value: 'mensal' as const, label: 'Este Mês' },
  { value: 'geral' as const, label: 'Geral' },
];

export function Leaderboard({ dados, nomeUsuarioAtual = 'Você', tempo = 'semanal', onTempoChange }: LeaderboardProps) {
  const [tempoLocal, setTempoLocal] = useState(tempo);
  const [showAll, setShowAll] = useState(false);

  const dadosOrdenados = [...dados].sort((a, b) => b.xp - a.xp);
  const top3 = dadosOrdenados.slice(0, 3);
  const resto = dadosOrdenados.slice(3);
  const visiveis = showAll ? resto : resto.slice(0, 7);

  const handleTempoChange = (novoTempo: 'semanal' | 'mensal' | 'geral') => {
    setTempoLocal(novoTempo);
    onTempoChange?.(novoTempo);
  };

  return (
    <div className="sola-card p-6 rounded-2xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber-500" />
          <h3 className="text-sm font-semibold text-[var(--muted-fg)] uppercase tracking-wider">
            Ranking
          </h3>
        </div>
        <div className="flex bg-[var(--bg)] rounded-lg p-0.5">
          {TEMPO_OPTIONS.map(opt => (
            <button
              key={opt.value}
              onClick={() => handleTempoChange(opt.value)}
              className={`px-3 py-1.5 text-[11px] font-medium rounded-md transition-all ${
                tempoLocal === opt.value
                  ? 'bg-[var(--card)] text-[var(--fg)] shadow-sm'
                  : 'text-[var(--muted-fg)] hover:text-[var(--fg)]'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Top 3 podium */}
      <div className="flex items-end justify-center gap-4 mb-6 px-4">
        {top3.map((entrada, i) => {
          const ordem = [1, 0, 2][i];
          const dadosTop = top3[ordem];
          const nivel = getNivelByXP(dadosTop.xp);
          const medalha = MEDALHAS[ordem];
          const alturas = ['h-24', 'h-28', 'h-20'];
          const tamanhos = ['w-14 h-14 text-2xl', 'w-16 h-16 text-3xl', 'w-12 h-12 text-xl'];
          const isAtual = dadosTop.nome === nomeUsuarioAtual;

          return (
            <motion.div
              key={ordem}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: ordem * 0.15, type: 'spring', stiffness: 200 }}
              className="flex flex-col items-center gap-2"
            >
              {/* Avatar */}
              <div className={`relative ${tamanhos[ordem].split(' ')[0]} ${tamanhos[ordem].split(' ')[1]} rounded-full flex items-center justify-center ${medalha.bg} ${isAtual ? 'ring-2 ring-[var(--primary)] ring-offset-2 ring-offset-[var(--card)]' : ''}`}>
                <span className={tamanhos[ordem].split(' ')[2]}>{dadosTop.avatar}</span>
                <div className={`absolute -top-1 -right-1 ${medalha.bg} rounded-full p-0.5`}>
                  <medalha.icon className={`w-3.5 h-3.5 ${medalha.cor}`} />
                </div>
              </div>

              {/* Info */}
              <div className="text-center">
                <p className={`text-xs font-semibold ${isAtual ? 'text-[var(--primary)]' : 'text-[var(--fg)]'}`}>
                  {dadosTop.nome}
                </p>
                <p className="text-[10px] text-[var(--muted-fg)]">{nivel.nome}</p>
                <p className="text-[10px] font-bold text-[var(--primary)]">{dadosTop.xp.toLocaleString('pt-BR')} XP</p>
              </div>

              {/* Podium bar */}
              <div className={`w-20 ${alturas[ordem]} rounded-t-lg bg-gradient-to-t from-[var(--primary)]/10 to-[var(--primary)]/5 border border-[var(--primary)]/20 flex items-start justify-center pt-2`}>
                <span className="text-lg font-bold text-[var(--primary)]">#{ordem + 1}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Divider */}
      <div className="ornament mb-4" />

      {/* Rest of ranking */}
      <div className="space-y-1">
        <AnimatePresence>
          {visiveis.map((entrada, i) => {
            const pos = i + 4;
            const nivel = getNivelByXP(entrada.xp);
            const isAtual = entrada.nome === nomeUsuarioAtual;

            return (
              <motion.div
                key={entrada.nome}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
                  isAtual
                    ? 'bg-[var(--primary)]/10 border border-[var(--primary)]/20'
                    : 'hover:bg-[var(--bg)]'
                }`}
              >
                <span className="w-6 text-center text-xs font-bold text-[var(--muted-fg)]">
                  #{pos}
                </span>
                <span className="text-lg">{entrada.avatar}</span>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium truncate ${isAtual ? 'text-[var(--primary)]' : 'text-[var(--fg)]'}`}>
                    {entrada.nome} {isAtual && <span className="text-[10px] font-normal">(você)</span>}
                  </p>
                  <p className="text-[10px] text-[var(--muted-fg)]">{nivel.nome}</p>
                </div>
                <span className="text-xs font-bold text-[var(--primary)]">
                  {entrada.xp.toLocaleString('pt-BR')} XP
                </span>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {resto.length > 7 && !showAll && (
        <button
          onClick={() => setShowAll(true)}
          className="w-full mt-3 py-2 text-xs text-[var(--muted-fg)] hover:text-[var(--fg)] flex items-center justify-center gap-1 transition-colors"
        >
          Ver todos
          <ChevronDown className="w-3 h-3" />
        </button>
      )}
    </div>
  );
}
