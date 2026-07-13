'use client';

import { useState, useMemo } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Leaderboard } from '@/components/Leaderboard';
import { useGamificacao } from '@/hooks/useGamificacao';
import {
  GRUPOS_ESTUDO,
  SESSOES_ESTUDO,
  ATIVIDADES_COMUNIDADE,
  CATEGORIAS_GRUPO,
  NIVEIS_GRUPO,
  getSessoesAtivas,
  type GrupoEstudo,
} from '@/data/gruposEstudo';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users, MessageCircle, Calendar, Clock, Search,
  ChevronRight, Radio, Filter, ArrowRight, Zap,
  Globe, BookOpen, Sparkles,
} from 'lucide-react';

export default function ComunidadePage() {
  const { rankingSemanal, nivelAtual } = useGamificacao();
  const [filtroCategoria, setFiltroCategoria] = useState<string>('todas');
  const [filtroNivel, setFiltroNivel] = useState<string>('todos');
  const [busca, setBusca] = useState('');
  const [grupoExpandido, setGrupoExpandido] = useState<string | null>(null);

  const sessoesAtivas = getSessoesAtivas();

  const gruposFiltrados = useMemo(() => {
    return GRUPOS_ESTUDO.filter(g => {
      if (filtroCategoria !== 'todas' && g.categoria !== filtroCategoria) return false;
      if (filtroNivel !== 'todos' && g.nivel !== filtroNivel) return false;
      if (busca) {
        const buscaLower = busca.toLowerCase();
        return (
          g.nome.toLowerCase().includes(buscaLower) ||
          g.descricao.toLowerCase().includes(buscaLower) ||
          g.interesses.some(i => i.toLowerCase().includes(buscaLower))
        );
      }
      return true;
    });
  }, [filtroCategoria, filtroNivel, busca]);

  const totalMembrosOnline = GRUPOS_ESTUDO.reduce((acc, g) => acc + g.membrosOnline, 0);
  const totalMembros = GRUPOS_ESTUDO.reduce((acc, g) => acc + g.totalMembros, 0);

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Header />
      <main className="pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Page header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--muted-fg)] mb-2">
              Comunidade
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-light text-[var(--fg)]">
              Estude em Comunhão
            </h1>
            <div className="ornament w-16 mx-auto mt-4" />
            <p className="text-sm text-[var(--muted-fg)] mt-4 max-w-md mx-auto">
              Participe de grupos de estudo, sessões ao vivo e aprenda com outros estudiosos da Palavra.
            </p>
          </motion.div>

          {/* ── Stats Row ── */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { icon: Users, label: 'Membros Ativos', value: 'Em breve', color: 'text-blue-500' },
              { icon: Radio, label: 'Online Agora', value: 'Em breve', color: 'text-green-500' },
              { icon: BookOpen, label: 'Grupos', value: 'Em breve', color: 'text-purple-500' },
              { icon: Calendar, label: 'Sessões', value: 'Em breve', color: 'text-amber-500' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
                className="sola-card p-4 text-center rounded-xl"
              >
                <stat.icon className={`w-5 h-5 mx-auto mb-1.5 ${stat.color}`} />
                <p className="font-display text-xl font-light text-[var(--fg)]">{stat.value}</p>
                <p className="text-[10px] text-[var(--muted-fg)] uppercase tracking-wider">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* ── Main Content ── */}
            <div className="lg:col-span-2 space-y-6">
              {/* ── Active Sessions ── */}
              {sessoesAtivas.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Radio className="w-4 h-4 text-green-500 animate-pulse" />
                    <h2 className="text-sm font-semibold text-[var(--muted-fg)] uppercase tracking-wider">
                      Sessões Ao Vivo
                    </h2>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 font-semibold animate-pulse">
                      {sessoesAtivas.length} ao vivo
                    </span>
                  </div>
                  <div className="space-y-3">
                    {sessoesAtivas.map(sessao => {
                      const grupo = GRUPOS_ESTUDO.find(g => g.id === sessao.grupoId);
                      return (
                        <motion.div
                          key={sessao.id}
                          className="sola-card p-4 rounded-xl border-l-4 border-green-500"
                          whileHover={{ scale: 1.01 }}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-[10px] text-green-600 dark:text-green-400 font-semibold">AO VIVO</span>
                              </div>
                              <p className="text-sm font-semibold text-[var(--fg)] leading-tight">{sessao.titulo}</p>
                              <p className="text-[11px] text-[var(--muted-fg)] mt-0.5">{grupo?.nome} · {sessao.duracao}</p>
                              <div className="flex items-center gap-3 mt-2">
                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400">
                                  {sessao.versicoFoco}
                                </span>
                                <span className="text-[10px] text-[var(--muted-fg)] flex items-center gap-1">
                                  <Users className="w-3 h-3" /> {sessao.participantes}
                                </span>
                              </div>
                            </div>
                            <motion.button
                              className="px-3 py-2 rounded-lg bg-green-500 text-white text-[11px] font-semibold hover:bg-green-600 transition-colors shrink-0"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              Entrar
                            </motion.button>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* ── Browse Groups ── */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Users className="w-4 h-4 text-[var(--primary)]" />
                  <h2 className="text-sm font-semibold text-[var(--muted-fg)] uppercase tracking-wider">
                    Grupos de Estudo
                  </h2>
                </div>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-3 mb-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-fg)]" />
                    <input
                      type="text"
                      placeholder="Buscar grupos..."
                      value={busca}
                      onChange={e => setBusca(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-[var(--bg)] border border-[var(--border)] text-sm text-[var(--fg)] placeholder:text-[var(--muted-fg)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50 transition-all"
                    />
                  </div>
                  <div className="flex gap-1.5 flex-wrap">
                    {Object.entries(CATEGORIAS_GRUPO).map(([key, cat]) => (
                      <button
                        key={key}
                        onClick={() => setFiltroCategoria(filtroCategoria === key ? 'todas' : key)}
                        className={`px-2.5 py-1.5 text-[10px] font-medium rounded-lg transition-all whitespace-nowrap ${
                          filtroCategoria === key
                            ? 'bg-[var(--primary)] text-[var(--primary-foreground)]'
                            : 'bg-[var(--bg)] text-[var(--muted-fg)] hover:text-[var(--fg)]'
                        }`}
                      >
                        {cat.icon} {cat.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Level filter */}
                <div className="flex items-center gap-2 mb-4">
                  <Filter className="w-3 h-3 text-[var(--muted-fg)]" />
                  <span className="text-[10px] text-[var(--muted-fg)] uppercase tracking-wider">Nível:</span>
                  {Object.entries(NIVEIS_GRUPO).map(([key, nivel]) => (
                    <button
                      key={key}
                      onClick={() => setFiltroNivel(filtroNivel === key ? 'todos' : key)}
                      className={`px-2 py-1 text-[10px] font-medium rounded-md transition-all ${
                        filtroNivel === key
                          ? 'bg-[var(--primary)] text-[var(--primary-foreground)]'
                          : 'bg-[var(--bg)] text-[var(--muted-fg)] hover:text-[var(--fg)]'
                      }`}
                    >
                      {nivel.label}
                    </button>
                  ))}
                </div>

                {/* Groups list */}
                <div className="space-y-3">
                  <AnimatePresence mode="popLayout">
                    {gruposFiltrados.map(grupo => {
                      const nivelInfo = NIVEIS_GRUPO[grupo.nivel];
                      const categoriaInfo = CATEGORIAS_GRUPO[grupo.categoria];
                      const expandido = grupoExpandido === grupo.id;
                      const sessoesDoGrupo = SESSOES_ESTUDO.filter(s => s.grupoId === grupo.id && s.status === 'agendado');

                      return (
                        <motion.div
                          key={grupo.id}
                          layout
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="sola-card rounded-xl overflow-hidden"
                        >
                          <div
                            className="p-4 cursor-pointer"
                            onClick={() => setGrupoExpandido(expandido ? null : grupo.id)}
                          >
                            <div className="flex items-start gap-3">
                              {/* Icon */}
                              <div
                                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
                                style={{ backgroundColor: `${grupo.cor}15` }}
                              >
                                {grupo.icone}
                              </div>

                              {/* Info */}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-0.5">
                                  <p className="text-sm font-semibold text-[var(--fg)] leading-tight">{grupo.nome}</p>
                                  {grupo.membrosOnline > 0 && (
                                    <span className="flex items-center gap-1 text-[9px] text-green-600 dark:text-green-400">
                                      <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                      {grupo.membrosOnline} online
                                    </span>
                                  )}
                                </div>
                                <p className="text-[11px] text-[var(--muted-fg)] leading-relaxed line-clamp-2">
                                  {grupo.descricao}
                                </p>

                                <div className="flex items-center gap-2 mt-2 flex-wrap">
                                  <span className={`text-[9px] px-2 py-0.5 rounded-full font-medium ${categoriaInfo.cor}`}>
                                    {categoriaInfo.label}
                                  </span>
                                  <span className={`text-[9px] px-2 py-0.5 rounded-full font-medium ${nivelInfo.cor}`}>
                                    {nivelInfo.label}
                                  </span>
                                  <span className="text-[9px] text-[var(--muted-fg)]">
                                    {grupo.totalMembros} membros
                                  </span>
                                  <span className="text-[9px] text-[var(--muted-fg)]">
                                    · {grupo.ultimaAtividade}
                                  </span>
                                </div>

                                {/* Interests */}
                                <div className="flex gap-1.5 mt-2 flex-wrap">
                                  {grupo.interesses.slice(0, 4).map(inter => (
                                    <span key={inter} className="text-[9px] px-1.5 py-0.5 rounded bg-[var(--bg)] text-[var(--muted-fg)]">
                                      {inter}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              <ChevronRight className={`w-4 h-4 text-[var(--muted-fg)] shrink-0 transition-transform ${expandido ? 'rotate-90' : ''}`} />
                            </div>
                          </div>

                          {/* Expanded content */}
                          <AnimatePresence>
                            {expandido && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                              >
                                <div className="px-4 pb-4 border-t border-[var(--border)] pt-3">
                                  <div className="flex items-center justify-between mb-3">
                                    <p className="text-xs font-semibold text-[var(--fg)]">Próximas sessões</p>
                                    <motion.button
                                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] text-[11px] font-semibold hover:opacity-90 transition-opacity"
                                      whileHover={{ scale: 1.05 }}
                                      whileTap={{ scale: 0.95 }}
                                    >
                                      <Zap className="w-3 h-3" /> Entrar no Grupo
                                    </motion.button>
                                  </div>
                                  {sessoesDoGrupo.length === 0 ? (
                                    <p className="text-[11px] text-[var(--muted-fg)]">Nenhuma sessão agendada</p>
                                  ) : (
                                    <div className="space-y-2">
                                      {sessoesDoGrupo.slice(0, 3).map(sessao => (
                                        <div key={sessao.id} className="flex items-center justify-between p-2 rounded-lg bg-[var(--bg)]">
                                          <div>
                                            <p className="text-[11px] font-medium text-[var(--fg)]">{sessao.titulo}</p>
                                            <p className="text-[9px] text-[var(--muted-fg)]">
                                              {new Date(sessao.dataInicio).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                                              · {sessao.versicoFoco}
                                            </p>
                                          </div>
                                          <span className="text-[9px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-medium">
                                            {sessao.duracao}
                                          </span>
                                        </div>
                                      ))}
                                    </div>
                                  )}

                                      {/* Group chat indicator */}
                                      <div className="flex items-center gap-2 mt-3 p-2 rounded-lg bg-[var(--bg)]">
                                        <MessageCircle className="w-4 h-4 text-[var(--primary)]" />
                                        <span className="text-[11px] text-[var(--muted-fg)]">
                                          Chat disponível em breve
                                        </span>
                                      </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>

                  {gruposFiltrados.length === 0 && (
                    <div className="text-center py-12">
                      <p className="text-sm text-[var(--muted-fg)]">
                        {GRUPOS_ESTUDO.length === 0
                          ? 'Grupos de estudo disponíveis em breve.'
                          : 'Nenhum grupo encontrado com esses filtros.'
                        }
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>

            {/* ── Sidebar ── */}
            <div className="space-y-6">
              {/* Leaderboard */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Leaderboard dados={rankingSemanal} nomeUsuarioAtual="Você" />
              </motion.div>

              {/* Recent Activity */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="sola-card p-5 rounded-2xl"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-4 h-4 text-[var(--primary)]" />
                  <h3 className="text-sm font-semibold text-[var(--muted-fg)] uppercase tracking-wider">
                    Atividade Recente
                  </h3>
                </div>
                <div className="space-y-3">
                  {ATIVIDADES_COMUNIDADE.length === 0 && (
                    <p className="text-[11px] text-[var(--muted-fg)] text-center py-4">
                      Nenhuma atividade recente. Participe de um grupo de estudo!
                    </p>
                  )}
                  {ATIVIDADES_COMUNIDADE.slice(0, 8).map(atividade => (
                    <div key={atividade.id} className="flex items-start gap-2.5">
                      <span className="text-lg shrink-0 mt-0.5">{atividade.avatar}</span>
                      <div className="min-w-0">
                        <p className="text-[11px] text-[var(--fg)] leading-relaxed">
                          <span className="font-semibold">{atividade.usuario}</span>{' '}
                          <span className="text-[var(--muted-fg)]">{atividade.acao}</span>{' '}
                          <span className="font-medium text-[var(--primary)]">{atividade.alvo}</span>
                        </p>
                        <p className="text-[9px] text-[var(--muted-fg)] mt-0.5">{atividade.tempo}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Quick links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="sola-card p-5 rounded-2xl"
              >
                <h3 className="text-sm font-semibold text-[var(--muted-fg)] uppercase tracking-wider mb-3">
                  Acesso Rápido
                </h3>
                <div className="space-y-1.5">
                  {[
                    { href: '/estatisticas/gamificacao', label: 'Gamificação', icon: '🏆' },
                    { href: '/quiz', label: 'Quiz Bíblico', icon: '🧠' },
                    { href: '/flashcards', label: 'Flashcards', icon: '💭' },
                    { href: '/compartilhar', label: 'Compartilhar', icon: '📤' },
                  ].map(link => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-[var(--fg)] hover:bg-[var(--bg)] transition-colors group"
                    >
                      <span>{link.icon}</span>
                      <span className="flex-1 text-[13px]">{link.label}</span>
                      <ArrowRight className="w-3 h-3 text-[var(--muted-fg)] group-hover:text-[var(--primary)] transition-colors" />
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
