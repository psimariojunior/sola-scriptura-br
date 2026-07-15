'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/Header';
import ScrollReveal from '@/components/ScrollReveal';
import { authService } from '@/lib/auth';
import {
  LayoutDashboard, BookOpen, Users, MessageSquare, FileText,
  Settings, Activity, BookMarked, TrendingUp, BarChart3,
  Calendar, Bell, Search, Plus, Edit, Trash2, Eye, Download,
  Upload, RefreshCw, CheckCircle, AlertCircle, Clock, Sparkles,
  Loader2, X, Save, ChevronDown, ChevronUp, ExternalLink, Star,
  Headphones, HelpCircle, BookCopy
} from 'lucide-react';
import { getStats } from '@/lib/analytics';

type Aba = 'dashboard' | 'conteudo' | 'usuarios' | 'estudos' | 'config' | 'analytics';

  const API_BASE = 'local'; // No backend needed

  interface DashboardStats {
    totalUsuarios: number;
    usuariosRecentes: Array<{ id: string; nome: string; email: string; criadoEm: string }>;
    metricas: {
      usuariosAtivos: number;
      planosGratuitos: number;
      planosPremium: number;
      totalEstudos: number;
    };
    versao: string;
    uptime: number;
  }

  interface Usuario {
    id: string;
    nome: string;
    email: string;
    criadoEm?: string;
    role?: string;
  }

  interface Toast {
    id: number;
    message: string;
    type: 'success' | 'error' | 'info';
  }

  let toastId = 0;

  function getLocalUsers(): Usuario[] {
    try {
      const raw = localStorage.getItem('ssb_users');
      const arr = raw ? JSON.parse(raw) : [];
      return Array.isArray(arr) ? arr.map((u: any) => ({
        id: u.id || '',
        nome: u.nome || u.name || u.email?.split('@')[0] || '',
        email: u.email || '',
        criadoEm: u.criadoEm || u.createdAt || '',
        role: u.role || 'user',
      })) : [];
    } catch { return []; }
  }

  function getLocalNotes(): any[] {
    try {
      const raw = localStorage.getItem('sola-notas');
      const arr = raw ? JSON.parse(raw) : [];
      return Array.isArray(arr) ? arr : [];
    } catch { return []; }
  }

export default function AdminPage() {
  const router = useRouter();
  const [aba, setAba] = useState<Aba>('dashboard');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Auth state
  const [isAuth, setIsAuth] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Dashboard
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [statsLoading, setStatsLoading] = useState(false);

  // Users
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [usuariosLoading, setUsuariosLoading] = useState(false);
  const [usuariosSearch, setUsuariosSearch] = useState('');

  // Studies
  const [estudos, setEstudos] = useState<any[]>([]);
  const [estudosLoading, setEstudosLoading] = useState(false);

  // Content (doctrines)
  const [doutrinas, setDoutrinas] = useState<any[]>([]);
  const [doutrinasLoading, setDoutrinasLoading] = useState(false);
  const [showNewDoctrine, setShowNewDoctrine] = useState(false);
  const [newDoctrine, setNewDoctrine] = useState({ nome: '', slug: '', descricao: '', categoria: '' });
  const [editingDoctrine, setEditingDoctrine] = useState<string | null>(null);

  // Analytics
  const [analyticsStats, setAnalyticsStats] = useState<ReturnType<typeof getStats> | null>(null);
  const [analyticsLoading, setAnalyticsLoading] = useState(false);

  // Config
  const [config, setConfig] = useState({
    openaiKey: '••••••••',
    backendUrl: 'Local (localStorage)',
    frontendUrl: 'https://solascripturabr.com.br',
    dbStatus: 'localStorage + cookies',
    translations: ['ARC', 'NVI', 'ARA', 'ACF', 'NAA', 'NTLH', 'KJV', 'WEB'],
  });

  const addToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = ++toastId;
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
  }, []);

  // Auth check
  useEffect(() => {
    const check = () => {
      if (!authService.isAutenticado()) {
        router.push('/auth/login');
        return;
      }
      if (!authService.isAdmin()) {
        router.push('/');
        return;
      }
      setIsAuth(true);
      setCheckingAuth(false);
    };
    check();
  }, [router]);

  // Fetch helpers — all local, no backend needed
  const apiFetch = async <T,>(_endpoint: string, _options: RequestInit = {}): Promise<T> => {
    throw new Error('Backend offline');
  };

  // Dashboard — read from localStorage
  const fetchDashboard = async () => {
    setStatsLoading(true);
    try {
      const usuarios = getLocalUsers();
      const estudos = getLocalNotes();
      const stats: DashboardStats = {
        totalUsuarios: usuarios.length,
        usuariosRecentes: usuarios.slice(-10).reverse().map(u => ({ ...u, criadoEm: u.criadoEm || '' })),
        metricas: {
          usuariosAtivos: usuarios.length,
          planosGratuitos: usuarios.length,
          planosPremium: 0,
          totalEstudos: estudos.length,
        },
        versao: '2.0.0',
        uptime: Math.floor((Date.now() - new Date('2025-01-01').getTime()) / 1000),
      };
      setStats(stats);
    } catch {
      setStats({
        totalUsuarios: 0,
        usuariosRecentes: [],
        metricas: { usuariosAtivos: 0, planosGratuitos: 0, planosPremium: 0, totalEstudos: 0 },
        versao: '2.0.0',
        uptime: 0,
      });
    } finally {
      setStatsLoading(false);
    }
  };

  // Users — from localStorage
  const fetchUsuarios = async () => {
    setUsuariosLoading(true);
    try {
      setUsuarios(getLocalUsers());
    } finally {
      setUsuariosLoading(false);
    }
  };

  // Doctrines — from local theology data
  const fetchDoutrinas = async () => {
    setDoutrinasLoading(true);
    try {
      const { estudosTeologicosExpandidos } = await import('@/data/estudosTeologicosExpandidos');
      const uniqueCats = [...new Set(estudosTeologicosExpandidos.map((e: any) => e.categoria).filter(Boolean))];
      setDoutrinas(uniqueCats.map((cat: string) => ({ nome: cat, slug: cat.toLowerCase().replace(/\s+/g, '-'), categoria: cat, descricao: `Doutrina: ${cat}` })));
    } catch {
      setDoutrinas([]);
    } finally {
      setDoutrinasLoading(false);
    }
  };

  // Studies — from localStorage
  const fetchEstudos = async () => {
    setEstudosLoading(true);
    try {
      setEstudos(getLocalNotes());
    } finally {
      setEstudosLoading(false);
    }
  };

  // Analytics
  const fetchAnalytics = async () => {
    setAnalyticsLoading(true);
    try {
      setAnalyticsStats(getStats());
    } finally {
      setAnalyticsLoading(false);
    }
  };

  // Load data on tab change
  useEffect(() => {
    if (!isAuth) return;
    if (aba === 'dashboard') fetchDashboard();
    if (aba === 'usuarios') fetchUsuarios();
    if (aba === 'conteudo') fetchDoutrinas();
    if (aba === 'estudos') fetchEstudos();
    if (aba === 'analytics') fetchAnalytics();
  }, [aba, isAuth]);

  // CRUD: Delete doctrine (local only)
  const deleteDoutrina = async (slug: string) => {
    if (!confirm('Tem certeza que deseja excluir esta doutrina?')) return;
    setDoutrinas(prev => prev.filter(d => d.slug !== slug));
    addToast('Doutrina excluída com sucesso', 'success');
  };

  // CRUD: Create doctrine (local only)
  const createDoutrina = async () => {
    if (!newDoctrine.nome || !newDoctrine.slug) {
      addToast('Nome e slug são obrigatórios', 'error');
      return;
    }
    setDoutrinas(prev => [...prev, { ...newDoctrine, id: Date.now().toString() }]);
    setShowNewDoctrine(false);
    setNewDoctrine({ nome: '', slug: '', descricao: '', categoria: '' });
    addToast('Doutrina criada com sucesso', 'success');
  };

  // CRUD: Update doctrine (local only)
  const updateDoutrina = async (slug: string, dados: any) => {
    setDoutrinas(prev => prev.map(d => d.slug === slug ? { ...d, ...dados } : d));
    setEditingDoctrine(null);
    addToast('Doutrina atualizada com sucesso', 'success');
  };

  // Delete study (local only)
  const deleteEstudo = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este estudo?')) return;
    setEstudos(prev => prev.filter(e => e.id !== id));
    try {
      const notas = getLocalNotes();
      const filtered = notas.filter((n: any) => n.id !== id);
      localStorage.setItem('sola-notas', JSON.stringify(filtered));
    } catch { /* ignore */ }
    addToast('Estudo excluído com sucesso', 'success');
  };

  // Feature study (local only)
  const toggleFeatured = async (id: string) => {
    setEstudos(prev => prev.map(e => e.id === id ? { ...e, featured: !e.featured } : e));
    addToast('Status de destaque atualizado', 'success');
  };

  const filteredUsuarios = usuarios.filter(u =>
    u.nome?.toLowerCase().includes(usuariosSearch.toLowerCase()) ||
    u.email?.toLowerCase().includes(usuariosSearch.toLowerCase())
  );

  // Auth guard
  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuth) return null;

  const abas: { id: Aba; label: string; icon: React.ElementType }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'conteudo', label: 'Conteúdo', icon: BookOpen },
    { id: 'usuarios', label: 'Usuários', icon: Users },
    { id: 'estudos', label: 'Estudos', icon: FileText },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'config', label: 'Configurações', icon: Settings },
  ];

  const formatUptime = (seconds: number) => {
    const d = Math.floor(seconds / 86400);
    const h = Math.floor((seconds % 86400) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    return `${d}d ${h}h ${m}m`;
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16">
        <div className="flex h-[calc(100vh-6rem)]">
          {/* Sidebar */}
          <aside className="w-64 border-r border-border/50 bg-card/50 backdrop-blur-sm shrink-0 overflow-y-auto hidden md:block">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="font-semibold text-sm">Admin Panel</h2>
                  <p className="text-[10px] text-muted-foreground">Sola Scriptura</p>
                </div>
              </div>
              <nav className="space-y-1">
                {abas.map(a => {
                  const Icon = a.icon;
                  return (
                    <button
                      key={a.id}
                      onClick={() => setAba(a.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-sm rounded-xl transition-all ${
                        aba === a.id
                          ? 'bg-primary/10 text-primary font-medium shadow-sm'
                          : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                      }`}
                    >
                      <Icon className="w-4 h-4" strokeWidth={1.5} />
                      {a.label}
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Mobile tab bar */}
          <div className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border/50 z-50 flex">
            {abas.map(a => {
              const Icon = a.icon;
              return (
                <button
                  key={a.id}
                  onClick={() => setAba(a.id)}
                  className={`flex-1 flex flex-col items-center gap-1 py-3 text-xs ${
                    aba === a.id ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {a.label}
                </button>
              );
            })}
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 pb-24 md:pb-8">
            {/* Toast container */}
            <div className="fixed top-24 right-4 z-50 space-y-2">
              {toasts.map(t => (
                <div
                  key={t.id}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg text-sm font-medium animate-in slide-in-from-right ${
                    t.type === 'success' ? 'bg-green-600 text-white' :
                    t.type === 'error' ? 'bg-red-600 text-white' :
                    'bg-blue-600 text-white'
                  }`}
                >
                  {t.type === 'success' ? <CheckCircle className="w-4 h-4" /> :
                   t.type === 'error' ? <AlertCircle className="w-4 h-4" /> :
                   <Activity className="w-4 h-4" />}
                  {t.message}
                  <button onClick={() => setToasts(prev => prev.filter(x => x.id !== t.id))} className="ml-2">
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>

            {/* Dashboard Tab */}
            {aba === 'dashboard' && (
              <ScrollReveal>
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h1 className="font-display text-3xl font-semibold">Dashboard</h1>
                      <p className="text-muted-foreground mt-1">Visão geral do sistema</p>
                    </div>
                    <button
                      onClick={fetchDashboard}
                      disabled={statsLoading}
                      className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
                    >
                      {statsLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
                      Atualizar
                    </button>
                  </div>

                  {statsLoading && !stats ? (
                    <div className="flex items-center justify-center py-20">
                      <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    </div>
                  ) : stats ? (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        <div className="glass-card rounded-2xl overflow-hidden">
                          <div className="px-5 py-4 bg-gradient-to-r from-blue-500 to-blue-600">
                            <Users className="w-6 h-6 text-white" />
                          </div>
                          <div className="p-5">
                            <p className="text-3xl font-display font-light text-primary">{stats.totalUsuarios}</p>
                            <p className="text-sm font-medium mt-1">Usuários Totais</p>
                            <p className="text-xs text-muted-foreground mt-1">{stats.metricas?.usuariosAtivos || 0} ativos</p>
                          </div>
                        </div>
                        <div className="glass-card rounded-2xl overflow-hidden">
                          <div className="px-5 py-4 bg-gradient-to-r from-amber-600 to-amber-700">
                            <FileText className="w-6 h-6 text-white" />
                          </div>
                          <div className="p-5">
                            <p className="text-3xl font-display font-light text-primary">{stats.metricas?.totalEstudos || 0}</p>
                            <p className="text-sm font-medium mt-1">Estudos</p>
                            <p className="text-xs text-muted-foreground mt-1">Notas e anotações</p>
                          </div>
                        </div>
                        <div className="glass-card rounded-2xl overflow-hidden">
                          <div className="px-5 py-4 bg-gradient-to-r from-green-500 to-green-600">
                            <TrendingUp className="w-6 h-6 text-white" />
                          </div>
                          <div className="p-5">
                            <p className="text-3xl font-display font-light text-primary">{stats.metricas?.planosPremium || 0}</p>
                            <p className="text-sm font-medium mt-1">Premium</p>
                            <p className="text-xs text-muted-foreground mt-1">{stats.metricas?.planosGratuitos || 0} gratuitos</p>
                          </div>
                        </div>
                        <div className="glass-card rounded-2xl overflow-hidden">
                          <div className="px-5 py-4 bg-gradient-to-r from-purple-500 to-purple-600">
                            <Activity className="w-6 h-6 text-white" />
                          </div>
                          <div className="p-5">
                            <p className="text-3xl font-display font-light text-primary">v{stats.versao}</p>
                            <p className="text-sm font-medium mt-1">Versão</p>
                            <p className="text-xs text-muted-foreground mt-1">Uptime: {formatUptime(stats.uptime)}</p>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="glass-card p-6 rounded-2xl">
                          <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
                            <Activity className="w-5 h-5 text-primary" />
                            Status do Sistema
                          </h2>
                          <div className="space-y-4">
                            {[
                              { label: 'Frontend (Vercel)', status: 'Online', cor: 'green', icon: CheckCircle },
                              { label: 'Backend', status: 'Local (localStorage)', cor: 'green', icon: CheckCircle },
                              { label: 'Banco de Dados', status: 'Configurado', cor: 'green', icon: CheckCircle },
                              { label: 'API OpenAI', status: 'Configurável', cor: 'yellow', icon: AlertCircle },
                            ].map((item, i) => (
                              <div key={i} className="flex items-center justify-between py-3 border-b border-border/20 last:border-b-0">
                                <div className="flex items-center gap-3">
                                  <item.icon className={`w-4 h-4 ${item.cor === 'green' ? 'text-green-500' : item.cor === 'red' ? 'text-red-500' : 'text-yellow-500'}`} />
                                  <span className="text-sm">{item.label}</span>
                                </div>
                                <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                                  item.cor === 'green'
                                    ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                                    : item.cor === 'red'
                                    ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                                    : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300'
                                }`}>
                                  {item.status}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="glass-card p-6 rounded-2xl">
                          <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
                            <Users className="w-5 h-5 text-primary" />
                            Usuários Recentes
                          </h2>
                          <div className="space-y-3">
                            {stats.usuariosRecentes?.length ? (
                              stats.usuariosRecentes.slice(0, 5).map((u, i) => (
                                <div key={i} className="flex items-center gap-3 py-3 border-b border-border/20 last:border-b-0">
                                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
                                    {u.nome?.[0]?.toUpperCase() || '?'}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium truncate">{u.nome}</p>
                                    <p className="text-xs text-muted-foreground truncate">{u.email}</p>
                                  </div>
                                </div>
                              ))
                            ) : (
                              <p className="text-sm text-muted-foreground py-4 text-center">Nenhum usuário recente</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="glass-card p-8 rounded-2xl text-center">
                      <AlertCircle className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
                      <p className="text-muted-foreground">Falha ao carregar dados do dashboard</p>
                      <button onClick={fetchDashboard} className="mt-4 text-primary text-sm hover:underline">Tentar novamente</button>
                    </div>
                  )}
                </div>
              </ScrollReveal>
            )}

            {/* Content Tab */}
            {aba === 'conteudo' && (
              <ScrollReveal>
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h1 className="font-display text-3xl font-semibold">Gerenciar Conteúdo</h1>
                      <p className="text-muted-foreground mt-1">Doutrinas e conteúdo teológico</p>
                    </div>
                    <button
                      onClick={() => setShowNewDoctrine(!showNewDoctrine)}
                      className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      Nova Doutrina
                    </button>
                  </div>

                  {/* New Doctrine Form */}
                  {showNewDoctrine && (
                    <div className="glass-card p-6 rounded-2xl mb-6 border border-primary/20">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold">Nova Doutrina</h3>
                        <button onClick={() => setShowNewDoctrine(false)} className="text-muted-foreground hover:text-foreground">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="Nome"
                          value={newDoctrine.nome}
                          onChange={e => setNewDoctrine(p => ({ ...p, nome: e.target.value }))}
                          className="px-4 py-2.5 bg-background/50 border border-border/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                        />
                        <input
                          type="text"
                          placeholder="Slug (ex: trindade)"
                          value={newDoctrine.slug}
                          onChange={e => setNewDoctrine(p => ({ ...p, slug: e.target.value }))}
                          className="px-4 py-2.5 bg-background/50 border border-border/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                        />
                        <input
                          type="text"
                          placeholder="Categoria"
                          value={newDoctrine.categoria}
                          onChange={e => setNewDoctrine(p => ({ ...p, categoria: e.target.value }))}
                          className="px-4 py-2.5 bg-background/50 border border-border/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                        />
                        <input
                          type="text"
                          placeholder="Descrição"
                          value={newDoctrine.descricao}
                          onChange={e => setNewDoctrine(p => ({ ...p, descricao: e.target.value }))}
                          className="px-4 py-2.5 bg-background/50 border border-border/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                        />
                      </div>
                      <div className="flex justify-end gap-2 mt-4">
                        <button
                          onClick={() => setShowNewDoctrine(false)}
                          className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                          Cancelar
                        </button>
                        <button
                          onClick={createDoutrina}
                          className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors"
                        >
                          <Save className="w-4 h-4" />
                          Salvar
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Doctrines list */}
                  {doutrinasLoading ? (
                    <div className="flex items-center justify-center py-20">
                      <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    </div>
                  ) : doutrinas.length > 0 ? (
                    <div className="space-y-3">
                      {doutrinas.map((d, i) => (
                        <div key={d.id || i} className="glass-card rounded-2xl p-5 hover:shadow-lg transition-all">
                          {editingDoctrine === (d.slug || d.id) ? (
                            <div className="space-y-3">
                              <input
                                type="text"
                                defaultValue={d.nome}
                                id={`edit-nome-${d.slug || d.id}`}
                                className="w-full px-4 py-2.5 bg-background/50 border border-border/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                              />
                              <input
                                type="text"
                                defaultValue={d.descricao || d.desc}
                                id={`edit-desc-${d.slug || d.id}`}
                                className="w-full px-4 py-2.5 bg-background/50 border border-border/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                              />
                              <div className="flex gap-2">
                                <button
                                  onClick={() => {
                                    const nome = (document.getElementById(`edit-nome-${d.slug || d.id}`) as HTMLInputElement)?.value;
                                    const desc = (document.getElementById(`edit-desc-${d.slug || d.id}`) as HTMLInputElement)?.value;
                                    updateDoutrina(d.slug || d.id, { nome, descricao: desc });
                                  }}
                                  className="flex items-center gap-1 px-3 py-1.5 bg-primary text-primary-foreground rounded-lg text-xs font-medium"
                                >
                                  <Save className="w-3 h-3" /> Salvar
                                </button>
                                <button
                                  onClick={() => setEditingDoctrine(null)}
                                  className="px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground"
                                >
                                  Cancelar
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                                  <BookOpen className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                  <p className="font-semibold">{d.nome}</p>
                                  <p className="text-sm text-muted-foreground">{d.descricao || d.desc || 'Sem descrição'}</p>
                                  {d.categoria && (
                                    <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full mt-1 inline-block">
                                      {d.categoria}
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="flex gap-1">
                                <button
                                  onClick={() => setEditingDoctrine(d.slug || d.id)}
                                  className="p-2 rounded-lg hover:bg-muted transition-colors"
                                  title="Editar"
                                >
                                  <Edit className="w-4 h-4 text-muted-foreground" />
                                </button>
                                <button
                                  onClick={() => deleteDoutrina(d.slug || d.id)}
                                  className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                  title="Excluir"
                                >
                                  <Trash2 className="w-4 h-4 text-red-500" />
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="glass-card p-8 rounded-2xl text-center">
                      <BookOpen className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
                      <p className="text-muted-foreground">Nenhuma doutrina encontrada</p>
                      <button onClick={fetchDoutrinas} className="mt-4 text-primary text-sm hover:underline">Recarregar</button>
                    </div>
                  )}
                </div>
              </ScrollReveal>
            )}

            {/* Users Tab */}
            {aba === 'usuarios' && (
              <ScrollReveal>
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h1 className="font-display text-3xl font-semibold">Usuários</h1>
                      <p className="text-muted-foreground mt-1">Gestão de usuários da plataforma</p>
                    </div>
                    <button
                      onClick={fetchUsuarios}
                      disabled={usuariosLoading}
                      className="flex items-center gap-2 px-4 py-2.5 border border-border/50 rounded-xl text-sm font-medium hover:bg-muted/50 transition-colors disabled:opacity-50"
                    >
                      {usuariosLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
                      Atualizar
                    </button>
                  </div>

                  <div className="glass-card rounded-2xl overflow-hidden">
                    <div className="p-6">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="relative flex-1">
                          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                          <input
                            type="text"
                            placeholder="Buscar por nome ou email..."
                            value={usuariosSearch}
                            onChange={e => setUsuariosSearch(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-background/50 border border-border/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                          />
                        </div>
                      </div>

                      {usuariosLoading ? (
                        <div className="flex items-center justify-center py-12">
                          <Loader2 className="w-6 h-6 animate-spin text-primary" />
                        </div>
                      ) : filteredUsuarios.length > 0 ? (
                        <div className="space-y-3">
                          {filteredUsuarios.map((user) => (
                            <div key={user.id} className="flex items-center gap-4 p-4 rounded-xl hover:bg-muted/50 transition-colors">
                              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-white font-semibold">
                                {user.nome?.[0]?.toUpperCase() || '?'}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium truncate">{user.nome}</p>
                                <p className="text-sm text-muted-foreground truncate">{user.email}</p>
                              </div>
                              {user.role && (
                                <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                                  user.role === 'admin'
                                    ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300'
                                    : 'bg-muted text-muted-foreground'
                                }`}>
                                  {user.role}
                                </span>
                              )}
                              {user.criadoEm && (
                                <span className="text-xs text-muted-foreground">
                                  {new Date(user.criadoEm).toLocaleDateString('pt-BR')}
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          <Users className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
                          <p className="text-muted-foreground">
                            {usuariosSearch ? 'Nenhum usuário encontrado para essa busca' : 'Nenhum usuário encontrado'}
                          </p>
                          {!usuariosSearch && (
                            <button onClick={fetchUsuarios} className="mt-4 text-primary text-sm hover:underline">Tentar novamente</button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            )}

            {/* Studies Tab */}
            {aba === 'estudos' && (
              <ScrollReveal>
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h1 className="font-display text-3xl font-semibold">Estudos</h1>
                      <p className="text-muted-foreground mt-1">Notas e anotações dos usuários</p>
                    </div>
                    <button
                      onClick={fetchEstudos}
                      disabled={estudosLoading}
                      className="flex items-center gap-2 px-4 py-2.5 border border-border/50 rounded-xl text-sm font-medium hover:bg-muted/50 transition-colors disabled:opacity-50"
                    >
                      {estudosLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
                      Atualizar
                    </button>
                  </div>

                  {estudosLoading ? (
                    <div className="flex items-center justify-center py-20">
                      <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    </div>
                  ) : estudos.length > 0 ? (
                    <div className="space-y-3">
                      {estudos.map((estudo: any) => (
                        <div key={estudo.id} className={`glass-card rounded-2xl p-5 hover:shadow-lg transition-all ${estudo.featured ? 'ring-2 ring-primary/30' : ''}`}>
                          <div className="flex items-start justify-between">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-2">
                                {estudo.featured && (
                                  <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">Destaque</span>
                                )}
                                {estudo.versiculoId && (
                                  <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full">
                                    {estudo.versiculoId}
                                  </span>
                                )}
                              </div>
                              <p className="text-sm line-clamp-2">{estudo.texto || estudo.conteudo || 'Sem conteúdo'}</p>
                              {estudo.criadoEm && (
                                <p className="text-xs text-muted-foreground mt-2">
                                  {new Date(estudo.criadoEm).toLocaleString('pt-BR')}
                                </p>
                              )}
                            </div>
                            <div className="flex gap-1 ml-4">
                              <button
                                onClick={() => toggleFeatured(estudo.id)}
                                className={`p-2 rounded-lg transition-colors ${
                                  estudo.featured ? 'bg-primary/10 text-primary' : 'hover:bg-muted text-muted-foreground'
                                }`}
                                title="Destacar"
                              >
                                <Star className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => deleteEstudo(estudo.id)}
                                className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                title="Excluir"
                              >
                                <Trash2 className="w-4 h-4 text-red-500" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="glass-card p-8 rounded-2xl text-center">
                      <FileText className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
                      <p className="text-muted-foreground">Nenhum estudo encontrado</p>
                      <button onClick={fetchEstudos} className="mt-4 text-primary text-sm hover:underline">Recarregar</button>
                    </div>
                  )}
                </div>
              </ScrollReveal>
            )}

            {/* Analytics Tab */}
            {aba === 'analytics' && (
              <ScrollReveal>
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h1 className="font-display text-3xl font-semibold">Analytics</h1>
                      <p className="text-muted-foreground mt-1">Comportamento do usuário</p>
                    </div>
                    <button
                      onClick={fetchAnalytics}
                      disabled={analyticsLoading}
                      className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
                    >
                      {analyticsLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
                      Atualizar
                    </button>
                  </div>

                  {analyticsLoading && !analyticsStats ? (
                    <div className="flex items-center justify-center py-20">
                      <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    </div>
                  ) : analyticsStats ? (
                    <>
                      {/* Summary cards */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
                        <div className="glass-card rounded-2xl overflow-hidden">
                          <div className="px-5 py-4 bg-gradient-to-r from-blue-500 to-blue-600">
                            <BarChart3 className="w-6 h-6 text-white" />
                          </div>
                          <div className="p-5">
                            <p className="text-3xl font-display font-light text-primary">{analyticsStats.totalPageViews}</p>
                            <p className="text-sm font-medium mt-1">Page Views</p>
                          </div>
                        </div>
                        <div className="glass-card rounded-2xl overflow-hidden">
                          <div className="px-5 py-4 bg-gradient-to-r from-amber-500 to-amber-600">
                            <Search className="w-6 h-6 text-white" />
                          </div>
                          <div className="p-5">
                            <p className="text-3xl font-display font-light text-primary">{analyticsStats.totalSearches}</p>
                            <p className="text-sm font-medium mt-1">Pesquisas</p>
                          </div>
                        </div>
                        <div className="glass-card rounded-2xl overflow-hidden">
                          <div className="px-5 py-4 bg-gradient-to-r from-green-500 to-green-600">
                            <Headphones className="w-6 h-6 text-white" />
                          </div>
                          <div className="p-5">
                            <p className="text-3xl font-display font-light text-primary">{analyticsStats.totalAudioPlays}</p>
                            <p className="text-sm font-medium mt-1">Áudios</p>
                          </div>
                        </div>
                        <div className="glass-card rounded-2xl overflow-hidden">
                          <div className="px-5 py-4 bg-gradient-to-r from-purple-500 to-purple-600">
                            <HelpCircle className="w-6 h-6 text-white" />
                          </div>
                          <div className="p-5">
                            <p className="text-3xl font-display font-light text-primary">{analyticsStats.totalQuizCompletions}</p>
                            <p className="text-sm font-medium mt-1">Quizzes</p>
                          </div>
                        </div>
                        <div className="glass-card rounded-2xl overflow-hidden">
                          <div className="px-5 py-4 bg-gradient-to-r from-rose-500 to-rose-600">
                            <BookCopy className="w-6 h-6 text-white" />
                          </div>
                          <div className="p-5">
                            <p className="text-3xl font-display font-light text-primary">{analyticsStats.totalStudySessions}</p>
                            <p className="text-sm font-medium mt-1">Sessões</p>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Top Pages */}
                        <div className="glass-card p-6 rounded-2xl">
                          <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
                            <BarChart3 className="w-5 h-5 text-primary" />
                            Páginas Mais Visitadas
                          </h2>
                          {analyticsStats.topPages.length > 0 ? (
                            <div className="space-y-3">
                              {analyticsStats.topPages.map((p, i) => {
                                const maxCount = analyticsStats.topPages[0]?.count || 1;
                                const pct = Math.round((p.count / maxCount) * 100);
                                return (
                                  <div key={i}>
                                    <div className="flex items-center justify-between text-sm mb-1">
                                      <span className="truncate max-w-[200px] font-medium">{p.page}</span>
                                      <span className="text-muted-foreground shrink-0 ml-2">{p.count}</span>
                                    </div>
                                    <div className="w-full h-2 bg-muted/50 rounded-full overflow-hidden">
                                      <div
                                        className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full transition-all"
                                        style={{ width: `${pct}%` }}
                                      />
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          ) : (
                            <p className="text-sm text-muted-foreground text-center py-4">Nenhum dado disponível</p>
                          )}
                        </div>

                        {/* Recent Searches */}
                        <div className="glass-card p-6 rounded-2xl">
                          <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
                            <Search className="w-5 h-5 text-primary" />
                            Pesquisas Recentes
                          </h2>
                          {analyticsStats.recentSearches.length > 0 ? (
                            <div className="space-y-2">
                              {analyticsStats.recentSearches.slice(0, 15).reverse().map((s, i) => (
                                <div key={i} className="flex items-center justify-between py-2 border-b border-border/20 last:border-b-0">
                                  <span className="text-sm truncate">{s.query}</span>
                                  <span className="text-xs text-muted-foreground shrink-0 ml-2">
                                    {new Date(s.timestamp).toLocaleDateString('pt-BR')}
                                  </span>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-sm text-muted-foreground text-center py-4">Nenhuma pesquisa registrada</p>
                          )}
                        </div>

                        {/* Top Audio */}
                        <div className="glass-card p-6 rounded-2xl">
                          <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
                            <Headphones className="w-5 h-5 text-primary" />
                            Áudios Mais Tocados
                          </h2>
                          {analyticsStats.topAudio.length > 0 ? (
                            <div className="space-y-3">
                              {analyticsStats.topAudio.map((a, i) => {
                                const maxCount = analyticsStats.topAudio[0]?.count || 1;
                                const pct = Math.round((a.count / maxCount) * 100);
                                return (
                                  <div key={i}>
                                    <div className="flex items-center justify-between text-sm mb-1">
                                      <span className="truncate max-w-[200px] font-medium">{a.reference}</span>
                                      <span className="text-muted-foreground shrink-0 ml-2">{a.count}</span>
                                    </div>
                                    <div className="w-full h-2 bg-muted/50 rounded-full overflow-hidden">
                                      <div
                                        className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full transition-all"
                                        style={{ width: `${pct}%` }}
                                      />
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          ) : (
                            <p className="text-sm text-muted-foreground text-center py-4">Nenhum áudio tocado</p>
                          )}
                        </div>

                        {/* Quiz Stats & Study Sessions */}
                        <div className="glass-card p-6 rounded-2xl">
                          <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
                            <HelpCircle className="w-5 h-5 text-primary" />
                            Quizzes & Sessões de Estudo
                          </h2>
                          <div className="space-y-4">
                            <div className="p-4 bg-purple-500/5 border border-purple-500/10 rounded-xl">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Quiz — Média de acerto</span>
                                <span className="text-lg font-display font-semibold text-primary">
                                  {analyticsStats.quizStats.avgScore}%
                                </span>
                              </div>
                              <p className="text-xs text-muted-foreground mt-1">
                                {analyticsStats.quizStats.totalScore}/{analyticsStats.quizStats.totalQuestions} respostas corretas
                              </p>
                            </div>

                            {analyticsStats.topStudyBooks.length > 0 && (
                              <div>
                                <p className="text-sm font-medium mb-2">Livros mais estudados</p>
                                {analyticsStats.topStudyBooks.slice(0, 5).map((b, i) => {
                                  const maxCount = analyticsStats.topStudyBooks[0]?.count || 1;
                                  const pct = Math.round((b.count / maxCount) * 100);
                                  return (
                                    <div key={i}>
                                      <div className="flex items-center justify-between text-sm mb-1">
                                        <span className="truncate max-w-[180px]">{b.book}</span>
                                        <span className="text-muted-foreground shrink-0 ml-2">{b.count}</span>
                                      </div>
                                      <div className="w-full h-1.5 bg-muted/50 rounded-full overflow-hidden">
                                        <div
                                          className="h-full bg-gradient-to-r from-rose-500 to-rose-400 rounded-full transition-all"
                                          style={{ width: `${pct}%` }}
                                        />
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 text-center">
                        <p className="text-xs text-muted-foreground">
                          Total de eventos: {analyticsStats.totalEvents} — Dados armazenados localmente (localStorage)
                        </p>
                      </div>
                    </>
                  ) : (
                    <div className="glass-card p-8 rounded-2xl text-center">
                      <BarChart3 className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
                      <p className="text-muted-foreground">Falha ao carregar analytics</p>
                      <button onClick={fetchAnalytics} className="mt-4 text-primary text-sm hover:underline">Tentar novamente</button>
                    </div>
                  )}
                </div>
              </ScrollReveal>
            )}

            {/* Config Tab */}
            {aba === 'config' && (
              <ScrollReveal>
                <div>
                  <div className="mb-8">
                    <h1 className="font-display text-3xl font-semibold">Configurações</h1>
                    <p className="text-muted-foreground mt-1">Configurações do sistema</p>
                  </div>

                  <div className="space-y-6">
                    <div className="glass-card p-6 rounded-2xl">
                      <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
                        <Settings className="w-5 h-5 text-primary" />
                        Configurações Gerais
                      </h2>
                      <div className="space-y-4">
                        {[
                          { label: 'OpenAI API Key', value: config.openaiKey, status: 'Configurável', cor: 'yellow' },
                          { label: 'Backend URL', value: config.backendUrl, status: 'Ativo', cor: 'green' },
                          { label: 'Frontend URL', value: config.frontendUrl, status: 'Ativo', cor: 'green' },
                          { label: 'Banco de Dados', value: config.dbStatus, status: 'Ativo', cor: 'green' },
                        ].map((item, i) => (
                          <div key={i} className="flex items-center justify-between py-4 border-b border-border/20 last:border-b-0">
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium">{item.label}</p>
                              <p className="text-xs text-muted-foreground mt-1 truncate">{item.value}</p>
                            </div>
                            <span className={`text-xs font-medium px-3 py-1.5 rounded-full ml-4 ${
                              item.cor === 'green'
                                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                                : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300'
                            }`}>
                              {item.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="glass-card p-6 rounded-2xl">
                      <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-primary" />
                        Traduções Disponíveis
                      </h2>
                      <div className="flex flex-wrap gap-2">
                        {config.translations.map((t, i) => (
                          <span key={i} className="px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-sm font-medium">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="glass-card p-6 rounded-2xl">
                      <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
                        <Bell className="w-5 h-5 text-primary" />
                        Notificações
                      </h2>
                      <div className="space-y-4">
                        {[
                          { label: 'Novos usuários', desc: 'Receber notificação de cadastro', enabled: true },
                          { label: 'Atualizações', desc: 'Notificar sobre novos recursos', enabled: true },
                          { label: 'Relatórios', desc: 'Relatório semanal de atividades', enabled: false },
                        ].map((item, i) => (
                          <div key={i} className="flex items-center justify-between py-3 border-b border-border/20 last:border-b-0">
                            <div>
                              <p className="text-sm font-medium">{item.label}</p>
                              <p className="text-xs text-muted-foreground">{item.desc}</p>
                            </div>
                            <div className={`w-12 h-6 rounded-full cursor-pointer transition-colors ${
                              item.enabled ? 'bg-primary' : 'bg-muted'
                            }`}>
                              <div className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform mt-0.5 ${
                                item.enabled ? 'translate-x-6' : 'translate-x-0.5'
                              }`} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
