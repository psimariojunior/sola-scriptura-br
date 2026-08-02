'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, VolumeX, Smile, Minus, Flame, Zap, Shield, Star, TrendingUp, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SentimentoVersiculo {
  verso: number;
  texto: string;
  sentimento: 'alegria' | 'tristeza' | 'raiva' | 'medo' | 'amor' | 'esperanca' | 'gratidao' | 'neutro' | 'reverencia' | 'dor';
  intensidade: number; // 0-1
  emojis: string[];
  cor: string;
  descricao: string;
}

interface AnaliseSentimentoProps {
  versiculos: SentimentoVersiculo[];
  titulo?: string;
}

const SENTIMENTO_CONFIG: Record<string, { icon: typeof Heart; color: string; label: string; bg: string }> = {
  alegria:     { icon: Smile,      color: '#22c55e', label: 'Alegria',     bg: 'rgba(34,197,94,0.1)' },
  tristeza:    { icon: VolumeX,    color: '#6366f1', label: 'Tristeza',    bg: 'rgba(99,102,241,0.1)' },
  raiva:       { icon: Flame,      color: '#ef4444', label: 'Raiva',       bg: 'rgba(239,68,68,0.1)' },
  medo:        { icon: Shield,     color: '#f59e0b', label: 'Medo',        bg: 'rgba(245,158,11,0.1)' },
  amor:        { icon: Heart,      color: '#ec4899', label: 'Amor',        bg: 'rgba(236,72,153,0.1)' },
  esperanca:   { icon: Star,       color: '#06b6d4', label: 'Esperança',   bg: 'rgba(6,182,212,0.1)' },
  gratidao:    { icon: TrendingUp, color: '#8b5cf6', label: 'Gratidão',    bg: 'rgba(139,92,246,0.1)' },
  neutro:      { icon: Minus,      color: '#6b7280', label: 'Neutro',      bg: 'rgba(107,114,128,0.1)' },
  reverencia:  { icon: Sparkles,   color: '#c9a84c', label: 'Reverência',  bg: 'rgba(201,168,76,0.1)' },
  dor:         { icon: VolumeX,    color: '#dc2626', label: 'Dor',         bg: 'rgba(220,38,38,0.1)' },
};

const SENTIMENTO_EMOJIS: Record<string, string[]> = {
  alegria:    ['😊', '🎉', '✨'],
  tristeza:   ['😢', '😔', '💔'],
  raiva:      ['⚡', '🔥', '💢'],
  medo:       ['😰', '😨', '🛡️'],
  amor:       ['❤️', '💕', '🥰'],
  esperanca:  ['🌟', '🌅', '🕊️'],
  gratidao:   ['🙏', '💪', '✨'],
  neutro:     ['📖', '📝', '—'],
  reverencia: ['👑', '🙏', '✨'],
  dor:        ['😣', '💔', '🩸'],
};

// Análise baseada em palavras-chave (sem IA, instantâneo)
const PALAVRAS_CHAVE: Record<string, string[]> = {
  alegria: ['alegria', 'gozo', 'regozijar', 'felicidade', 'sorrir', 'cantar', 'dançar', 'celebrar', 'jubilar', 'vitoria', 'vencer', 'vitórias'],
  tristeza: ['tristeza', 'chorar', 'pranto', 'lágrimas', 'lamentar', 'pena', 'dor', 'sofrer', 'afligir', 'desolado', 'angustia'],
  raiva: ['ira', 'furor', 'indignação', 'zangado', 'castigar', 'destruir', 'inimigo', 'julgar', 'vingança', 'punição'],
  medo: ['temer', 'medo', 'pavor', 'horror', 'assustar', 'temível', 'tremer', 'esconder', 'perigo', 'ameaça'],
  amor: ['amar', 'amor', 'carinho', 'abraçar', 'querer', 'desejar', 'belo', 'formoso', 'amado', 'amada', 'unir'],
  esperanca: ['esperar', 'esperança', 'confiar', 'aguardar', 'promessa', 'futuro', 'amanhã', 'restaurar', 'renovar'],
  gratidao: ['agradecer', 'graças', 'louvor', 'bênção', 'abençoar', 'dom', 'dádiva', 'gratidão', 'reconhecido'],
  reverencia: ['santo', 'sagrado', 'glória', 'majestade', 'soberano', 'eterno', 'todo-poderoso', 'trono', 'coroa'],
  dor: ['dor', 'sofrer', 'morte', 'ferir', 'sangue', 'crucificar', 'machucar', 'agonia', 'padecer'],
};

export function analisarSentimento(texto: string, verso: number): SentimentoVersiculo {
  const lower = texto.toLowerCase();
  const pontuacoes: Record<string, number> = {};

  for (const [sent, palavras] of Object.entries(PALAVRAS_CHAVE)) {
    let score = 0;
    for (const p of palavras) {
      if (lower.includes(p)) score += 1;
    }
    if (score > 0) pontuacoes[sent] = score;
  }

  let sentimento: SentimentoVersiculo['sentimento'] = 'neutro';
  let maxScore = 0;
  for (const [s, score] of Object.entries(pontuacoes)) {
    if (score > maxScore) {
      maxScore = score;
      sentimento = s as SentimentoVersiculo['sentimento'];
    }
  }

  const intensidade = Math.min(1, maxScore / 4);
  const config = SENTIMENTO_CONFIG[sentimento] || SENTIMENTO_CONFIG.neutro;

  return {
    verso,
    texto,
    sentimento,
    intensidade,
    emojis: SENTIMENTO_EMOJIS[sentimento] || ['📖'],
    cor: config.color,
    descricao: `Versículo ${verso}: ${config.label}${intensidade > 0.5 ? ' intensa' : intensidade > 0.2 ? ' moderada' : ' leve'}`,
  };
}

export function AnaliseSentimento({ versiculos, titulo }: AnaliseSentimentoProps) {
  const [expanded, setExpanded] = useState<number | null>(null);

  const stats = useMemo(() => {
    const contagem: Record<string, number> = {};
    for (const v of versiculos) {
      contagem[v.sentimento] = (contagem[v.sentimento] || 0) + 1;
    }
    return Object.entries(contagem)
      .sort((a, b) => b[1] - a[1])
      .map(([sent, count]) => ({
        sentimento: sent,
        count,
        pct: Math.round((count / Math.max(versiculos.length, 1)) * 100),
        config: SENTIMENTO_CONFIG[sent] || SENTIMENTO_CONFIG.neutro,
      }));
  }, [versiculos]);

  const intensidadeMedia = useMemo(() => {
    if (versiculos.length === 0) return 0;
    return versiculos.reduce((acc, v) => acc + v.intensidade, 0) / versiculos.length;
  }, [versiculos]);

  const sentimentoDominante = stats[0]?.config || SENTIMENTO_CONFIG.neutro;
  const DominantIcon = sentimentoDominante.icon;

  return (
    <div className="space-y-4">
      {titulo && (
        <h3 className="text-sm font-bold text-[var(--content-primary)] flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[var(--brand-default)]" />
          {titulo}
        </h3>
      )}

      {/* Resumo */}
      <div className="glass-card p-4 rounded-xl">
        <div className="flex items-center gap-3 mb-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: sentimentoDominante.bg }}
          >
            <DominantIcon className="w-5 h-5" style={{ color: sentimentoDominante.color }} />
          </div>
          <div>
            <p className="text-sm font-bold text-[var(--content-primary)]">
              Sentimento Dominante: {sentimentoDominante.label}
            </p>
            <p className="text-xs text-[var(--content-muted)]">
              Intensidade média: {Math.round(intensidadeMedia * 100)}%
            </p>
          </div>
        </div>

        {/* Barra de intensidade */}
        <div className="w-full h-2 bg-[var(--surface-sunken)] rounded-full overflow-hidden mb-3">
          <motion.div
            className="h-full rounded-full"
            style={{ background: sentimentoDominante.color }}
            initial={{ width: 0 }}
            animate={{ width: `${intensidadeMedia * 100}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </div>

        {/* Distribuição */}
        <div className="flex flex-wrap gap-2">
          {stats.map(({ sentimento, count, pct, config }) => {
            const Icon = config.icon;
            return (
              <div
                key={sentimento}
                className="flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-medium"
                style={{ background: config.bg, color: config.color }}
              >
                <Icon className="w-3 h-3" />
                {config.label} ({pct}%)
              </div>
            );
          })}
        </div>
      </div>

      {/* Lista de versículos */}
      <div className="space-y-1">
        {versiculos.map((v, i) => {
          const config = SENTIMENTO_CONFIG[v.sentimento] || SENTIMENTO_CONFIG.neutro;
          const Icon = config.icon;
          const isExpanded = expanded === i;

          return (
            <motion.div
              key={v.verso}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.03 }}
              className="rounded-lg overflow-hidden"
              style={{ borderLeft: `3px solid ${config.color}` }}
            >
              <button
                onClick={() => setExpanded(isExpanded ? null : i)}
                className="w-full flex items-center gap-3 px-3 py-2 hover:bg-[var(--surface-sunken)]/50 transition-colors text-left"
              >
                <span className="text-[10px] font-bold tabular-nums w-5 text-center" style={{ color: config.color }}>
                  {v.verso}
                </span>
                <Icon className="w-3.5 h-3.5 shrink-0" style={{ color: config.color }} />
                <p className="text-xs text-[var(--content-secondary)] flex-1 line-clamp-1">
                  {v.texto}
                </p>
                <div className="flex items-center gap-1">
                  <span className="text-[10px]" style={{ color: config.color }}>
                    {Math.round(v.intensidade * 100)}%
                  </span>
                  {isExpanded ? <ChevronUp className="w-3 h-3 text-[var(--content-muted)]" /> : <ChevronDown className="w-3 h-3 text-[var(--content-muted)]" />}
                </div>
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-3 pb-3 space-y-2">
                      <blockquote className="text-sm text-[var(--content-primary)] font-serif italic border-l-2 pl-3" style={{ borderColor: config.color }}>
                        &ldquo;{v.texto}&rdquo;
                      </blockquote>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-lg">{v.emojis.join(' ')}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full font-medium" style={{ background: config.bg, color: config.color }}>
                          {config.label}
                        </span>
                        <span className="text-[10px] text-[var(--content-muted)]">
                          Intensidade: {Math.round(v.intensidade * 100)}%
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
