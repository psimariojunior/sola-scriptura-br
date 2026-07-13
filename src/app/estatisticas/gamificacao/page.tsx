'use client';

import { useState, useMemo } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useGamificacao } from '@/hooks/useGamificacao';
import { BadgeConquista } from '@/components/BadgeConquista';
import { StreakCalendario } from '@/components/StreakCalendario';
import { DesafioDiarioCard } from '@/components/DesafioDiario';
import dynamic from 'next/dynamic';
import {
  CONQUISTAS,
  CATEGORIAS_CONQUISTA,
  NIVEIS_USUARIO,
} from '@/data/conquistas';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Trophy, Star, Flame, BookOpen, Brain, Target,
  Share2, TrendingUp, Sparkles, Lock, ChevronRight,
} from 'lucide-react';

const Leaderboard = dynamic(() => import('@/components/Leaderboard').then(mod => ({ default: mod.Leaderboard })), {
  ssr: false,
  loading: () => (
    <div className="sola-card p-6 rounded-2xl h-64 animate-pulse" />
  ),
});

export default function GamificacaoPage() {
  const {
    nivelAtual,
    proximoNivel,
    progressoNivel,
    xpAtual,
    xpProximoNivel,
    conquistasDesbloqueadas,
    conquistasTotais,
    desafiosDiarios,
    streakAtual,
    melhorStreak,
    totalVersiculos,
    totalCapitulos,
    totalQuizzes,
    atividades,
    desafiosConcluidos,
    novaConquista,
    rankingSemanal,
    completarDesafio,
  } = useGamificacao();

  const [filtroCategoria, setFiltroCategoria] = useState<string>('todas');
  const [showCompartilhar, setShowCompartilhar] = useState(false);

  const conquistasFiltradas = useMemo(() => {
    if (filtroCategoria === 'todas') return CONQUISTAS;
    return CONQUISTAS.filter(c => c.categoria === filtroCategoria);
  }, [filtroCategoria]);

  const desafiosConcluidosHoje = desafiosConcluidos.filter(
    d => d.dataConclusao === new Date().toISOString().split('T')[0]
  ).map(d => d.desafioId);

  const conquistasDesbloqueadasSet = new Set(conquistasDesbloqueadas);
  const totalConquistasDesbloqueadas = conquistasDesbloqueadas.length;

  const compartilharTexto = `🏆 No nível ${nivelAtual.nome} no Sola Scriptura BR! ${xpAtual} XP acumulados, ${totalConquistasDesbloqueadas} conquistas desbloqueadas e ${streakAtual} dias de sequência! #SolaScripturaBR`;

  const handleCompartilhar = async (rede: string) => {
    const texto = encodeURIComponent(compartilharTexto);
    const url = encodeURIComponent('https://sola-scriptura-two.vercel.app');
    const links: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?text=${texto}&url=${url}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${texto}`,
      whatsapp: `https://wa.me/?text=${texto}%20${url}`,
    };
    if (links[rede]) window.open(links[rede], '_blank', 'noopener,noreferrer');
    setShowCompartilhar(false);
  };

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Header />
      <main className="pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          {/* Page header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--muted-fg)] mb-2">
              Gamificação
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-light text-[var(--fg)]">
              Sua Jornada de Estudo
            </h1>
            <div className="ornament w-16 mx-auto mt-4" />
          </motion.div>

          {/* ── Level Card ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="sola-card p-6 md:p-8 rounded-2xl mb-8"
          >
            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* Level badge */}
              <div className="relative">
                <div
                  className="w-24 h-24 rounded-full flex items-center justify-center text-4xl font-bold border-4"
                  style={{ borderColor: nivelAtual.cor, color: nivelAtual.cor }}
                >
                  {nivelAtual.nivel}
                </div>
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full text-[10px] font-bold text-white" style={{ backgroundColor: nivelAtual.cor }}>
                  Nv. {nivelAtual.nivel}
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 text-center md:text-left">
                <p className="text-xs text-[var(--muted-fg)] uppercase tracking-wider mb-0.5">Nível Atual</p>
                <h2 className="font-display text-3xl font-light text-[var(--fg)] mb-1" style={{ color: nivelAtual.cor }}>
                  {nivelAtual.nome}
                </h2>
                <div className="flex flex-wrap gap-1.5 mt-2 mb-3">
                  {nivelAtual.beneficios.map(b => (
                    <span key={b} className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] font-medium">
                      {b}
                    </span>
                  ))}
                </div>

                {/* XP bar */}
                <div className="max-w-md mx-auto md:mx-0">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs text-[var(--muted-fg)]">{xpAtual.toLocaleString('pt-BR')} XP</span>
                    {proximoNivel && (
                      <span className="text-xs text-[var(--muted-fg)]">{xpProximoNivel.toLocaleString('pt-BR')} XP</span>
                    )}
                  </div>
                  <div className="h-3 bg-[var(--bg)] rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: `linear-gradient(90deg, ${nivelAtual.cor}, ${proximoNivel?.cor || nivelAtual.cor})` }}
                      initial={{ width: 0 }}
                      animate={{ width: `${progressoNivel}%` }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                    />
                  </div>
                  <p className="text-[10px] text-[var(--muted-fg)] mt-1 text-right">
                    {progressoNivel}% para o próximo nível{proximoNivel ? ` — ${proximoNivel.nome}` : ''}
                  </p>
                </div>
              </div>

              {/* Share button */}
              <div className="relative">
                <motion.button
                  onClick={() => setShowCompartilhar(!showCompartilhar)}
                  className="p-3 rounded-xl bg-[var(--primary)]/10 text-[var(--primary)] hover:bg-[var(--primary)]/20 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Share2 className="w-5 h-5" />
                </motion.button>
                <AnimatePresence>
                  {showCompartilhar && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="absolute right-0 top-full mt-2 z-50 w-48 sola-card p-2 rounded-xl shadow-xl"
                    >
                      {[
                        { rede: 'twitter', label: 'Twitter/X', icone: '🐦' },
                        { rede: 'facebook', label: 'Facebook', icone: '📘' },
                        { rede: 'whatsapp', label: 'WhatsApp', icone: '💬' },
                      ].map(r => (
                        <button
                          key={r.rede}
                          onClick={() => handleCompartilhar(r.rede)}
                          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-[var(--fg)] hover:bg-[var(--bg)] transition-colors"
                        >
                          <span>{r.icone}</span> {r.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* ── Stats Row ── */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { icon: BookOpen, label: 'Versículos Lidos', value: totalVersiculos.toLocaleString('pt-BR'), color: 'text-amber-500' },
              { icon: TrendingUp, label: 'Capítulos', value: totalCapitulos.toLocaleString('pt-BR'), color: 'text-blue-500' },
              { icon: Brain, label: 'Quizzes', value: totalQuizzes.toLocaleString('pt-BR'), color: 'text-purple-500' },
              { icon: Flame, label: 'Sequência', value: `${streakAtual} dias`, color: 'text-orange-500' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.05 }}
                className="sola-card p-4 text-center rounded-xl"
              >
                <stat.icon className={`w-5 h-5 mx-auto mb-1.5 ${stat.color}`} />
                <p className="font-display text-xl font-light text-[var(--fg)]">{stat.value}</p>
                <p className="text-[10px] text-[var(--muted-fg)] uppercase tracking-wider">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* ── Daily Challenges ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-5 h-5 text-[var(--primary)]" />
              <h2 className="text-sm font-semibold text-[var(--muted-fg)] uppercase tracking-wider">
                Desafios Diários
              </h2>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] font-semibold">
                {desafiosConcluidosHoje.length}/{desafiosDiarios.length}
              </span>
            </div>
            <div className="grid md:grid-cols-3 gap-3">
              {desafiosDiarios.map(desafio => (
                <DesafioDiarioCard
                  key={desafio.id}
                  desafio={desafio}
                  concluido={desafiosConcluidosHoje.includes(desafio.id)}
                  onCompletar={completarDesafio}
                />
              ))}
            </div>
          </motion.div>

          {/* ── Streak Calendar ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="sola-card p-6 rounded-2xl mb-8"
          >
            <StreakCalendario
              atividades={atividades}
              streakAtual={streakAtual}
              melhorStreak={melhorStreak}
            />
          </motion.div>

          {/* ── Achievements + Leaderboard ── */}
          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            {/* Achievements */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-amber-500" />
                    <h2 className="text-sm font-semibold text-[var(--muted-fg)] uppercase tracking-wider">
                      Conquistas
                    </h2>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-semibold">
                      {totalConquistasDesbloqueadas}/{conquistasTotais}
                    </span>
                  </div>
                </div>

                {/* Category filter */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  <button
                    onClick={() => setFiltroCategoria('todas')}
                    className={`px-3 py-1.5 text-[11px] font-medium rounded-lg transition-all ${
                      filtroCategoria === 'todas'
                        ? 'bg-[var(--primary)] text-[var(--primary-foreground)]'
                        : 'bg-[var(--bg)] text-[var(--muted-fg)] hover:text-[var(--fg)]'
                    }`}
                  >
                    Todas
                  </button>
                  {Object.entries(CATEGORIAS_CONQUISTA).map(([key, cat]) => (
                    <button
                      key={key}
                      onClick={() => setFiltroCategoria(key)}
                      className={`px-3 py-1.5 text-[11px] font-medium rounded-lg transition-all ${
                        filtroCategoria === key
                          ? 'bg-[var(--primary)] text-[var(--primary-foreground)]'
                          : 'bg-[var(--bg)] text-[var(--muted-fg)] hover:text-[var(--fg)]'
                      }`}
                    >
                      {cat.icon} {cat.label}
                    </button>
                  ))}
                </div>

                {/* Badges grid */}
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                  {conquistasFiltradas.map(conquista => (
                    <BadgeConquista
                      key={conquista.id}
                      conquista={conquista}
                      desbloqueada={conquistasDesbloqueadasSet.has(conquista.id)}
                      tamanho="md"
                    />
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Leaderboard */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Leaderboard dados={rankingSemanal} nomeUsuarioAtual="Você" />
              </motion.div>
            </div>
          </div>

          {/* ── Level Progression ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="sola-card p-6 rounded-2xl mb-8"
          >
            <div className="flex items-center gap-2 mb-5">
              <Sparkles className="w-5 h-5 text-[var(--primary)]" />
              <h2 className="text-sm font-semibold text-[var(--muted-fg)] uppercase tracking-wider">
                Progressão de Níveis
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
              {NIVEIS_USUARIO.map(nivel => {
                const isAtual = nivel.nivel === nivelAtual.nivel;
                const isDesbloqueado = xpAtual >= nivel.xpNecessario;
                return (
                  <div
                    key={nivel.nivel}
                    className={`p-3 rounded-xl text-center transition-all ${
                      isAtual
                        ? 'ring-2 shadow-lg'
                        : isDesbloqueado
                          ? 'opacity-80'
                          : 'opacity-40'
                    }`}
                    style={{
                      borderColor: nivel.cor,
                      ...(isAtual ? { borderColor: nivel.cor, boxShadow: `0 0 20px ${nivel.cor}30` } : {}),
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-full mx-auto mb-1.5 flex items-center justify-center text-lg font-bold"
                      style={{ color: nivel.cor, backgroundColor: `${nivel.cor}15` }}
                    >
                      {nivel.nivel}
                    </div>
                    <p className="text-xs font-semibold text-[var(--fg)] leading-tight">{nivel.nome}</p>
                    <p className="text-[9px] text-[var(--muted-fg)] mt-0.5">{nivel.xpNecessario.toLocaleString('pt-BR')} XP</p>
                    {isAtual && (
                      <div className="mt-1.5">
                        <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] font-bold">
                          ATUAL
                        </span>
                      </div>
                    )}
                    {!isDesbloqueado && (
                      <Lock className="w-3 h-3 mx-auto mt-1 text-[var(--muted-fg)]" />
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </main>

      {/* New achievement toast */}
      <AnimatePresence>
        {novaConquista && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
          >
            <div className="sola-card px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 border border-amber-500/30 bg-[var(--card)]">
              <motion.span
                className="text-4xl"
                animate={{ rotate: [0, -10, 10, -10, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 0.6, repeat: 2 }}
              >
                {novaConquista.icone}
              </motion.span>
              <div>
                <p className="text-[10px] text-amber-500 font-bold uppercase tracking-wider">Conquista Desbloqueada!</p>
                <p className="text-sm font-bold text-[var(--fg)]">{novaConquista.nome}</p>
                <p className="text-[11px] text-[var(--muted-fg)]">+{novaConquista.pontos} XP</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
