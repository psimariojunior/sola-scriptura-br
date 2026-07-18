'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/Header';
import ScrollReveal from '@/components/ScrollReveal';
import { authService } from '@/lib/auth';
import {
  LayoutDashboard, Users, Settings, Activity, TrendingUp, BarChart3,
  Search, Trash2, Eye, RefreshCw, CheckCircle, AlertCircle, Sparkles,
  Loader2, X, Shield, ShieldOff, Ban, UserCheck, Clock, ArrowLeft,
  ArrowRight, ChevronDown, Server, Database, Globe, Key,
} from 'lucide-react';

type Aba = 'dashboard' | 'usuarios' | 'config';

interface DashboardStats {
  totalUsuarios: number;
  totalAdmins: number;
  totalAtivos: number;
  totalInativos: number;
  totalPremium: number;
  usuariosRecentes: Array<{
    id: string;
    nome: string;
    email: string;
    role: string;
    ativo: boolean;
    plano: string;
    criadoEm: string;
  }>;
  usuariosPorMes: Array<{ mes: string; total: number }>;
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
  ativo?: boolean;
  plano?: string;
}

interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}

let toastId = 0;

const API_BASE = 'https://api.solascripturabr.com.br/api/v1';

export default function AdminPage() {
  const router = useRouter();
  const [aba, setAba] = useState<Aba>('dashboard');
  const [isAuth, setIsAuth] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = ++toastId;
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
  }, []);

  useEffect(() => {
    const check = () => {
      if (!authService.isAutenticado()) { router.push('/auth/login'); return; }
      if (!authService.isAdmin()) { router.push('/'); return; }
      setIsAuth(true);
      setCheckingAuth(false);
    };
    check();
  }, [router]);

  const apiFetch = useCallback(async <T,>(endpoint: string, options: RequestInit = {}): Promise<T> => {
    let token = authService.getAccessToken();
    const makeRequest = async (accessToken: string | null) => {
      return fetch(`${API_BASE}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
          ...options.headers,
        },
      });
    };

    let res = await makeRequest(token);

    if (res.status === 401) {
      const refreshed = await authService.refreshAccessToken().catch(() => false);
      if (refreshed) {
        token = authService.getAccessToken();
        res = await makeRequest(token);
      }
    }

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.message || `Erro ${res.status}`);
    }
    return res.json();
  }, []);

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
    { id: 'usuarios', label: 'Usuários', icon: Users },
    { id: 'config', label: 'Configurações', icon: Settings },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16">
        <div className="flex h-[calc(100vh-6rem)]">
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

          <div className="flex-1 overflow-y-auto p-6 sm:p-8 pb-24 md:pb-8">
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

            {aba === 'dashboard' && (
              <DashboardTab apiFetch={apiFetch} addToast={addToast} />
            )}

            {aba === 'usuarios' && (
              <UsuariosTab apiFetch={apiFetch} addToast={addToast} />
            )}

            {aba === 'config' && (
              <ConfigTab apiFetch={apiFetch} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

function DashboardTab({ apiFetch, addToast }: { apiFetch: <T,>(e: string, o?: RequestInit) => Promise<T>; addToast: (m: string, t?: 'success' | 'error' | 'info') => void }) {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = useCallback(async () => {
    setLoading(true);
    try {
      const res = await apiFetch<any>('/admin/dashboard');
      setStats(res.data || res);
    } catch {
      setStats(null);
      addToast('Erro ao carregar dashboard', 'error');
    } finally {
      setLoading(false);
    }
  }, [apiFetch, addToast]);

  useEffect(() => { fetchDashboard(); }, [fetchDashboard]);

  const formatUptime = (seconds: number) => {
    const d = Math.floor(seconds / 86400);
    const h = Math.floor((seconds % 86400) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    return `${d}d ${h}h ${m}m`;
  };

  const maxBar = stats?.usuariosPorMes ? Math.max(...stats.usuariosPorMes.map(u => u.total), 1) : 1;

  return (
    <ScrollReveal>
      <div>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl font-semibold">Dashboard</h1>
            <p className="text-muted-foreground mt-1">Visão geral do sistema</p>
          </div>
          <button
            onClick={fetchDashboard}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
            Atualizar
          </button>
        </div>

        {loading && !stats ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : stats ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
              <StatCard
                icon={<Users className="w-6 h-6 text-white" />}
                value={stats.totalUsuarios}
                label="Usuários Totais"
                sub={`${stats.totalAtivos || 0} ativos`}
                gradient="from-blue-500 to-blue-600"
              />
              <StatCard
                icon={<Shield className="w-6 h-6 text-white" />}
                value={stats.totalAdmins || 0}
                label="Admins"
                sub="Painel de administração"
                gradient="from-amber-500 to-amber-600"
              />
              <StatCard
                icon={<UserCheck className="w-6 h-6 text-white" />}
                value={stats.totalAtivos || 0}
                label="Ativos"
                sub={`${stats.totalInativos || 0} inativos`}
                gradient="from-green-500 to-green-600"
              />
              <StatCard
                icon={<TrendingUp className="w-6 h-6 text-white" />}
                value={stats.totalPremium || 0}
                label="Premium"
                sub={`${stats.metricas?.planosGratuitos || 0} gratuitos`}
                gradient="from-purple-500 to-purple-600"
              />
              <StatCard
                icon={<Activity className="w-6 h-6 text-white" />}
                value={`v${stats.versao || '1.0.0'}`}
                label="Versão"
                sub={`Uptime: ${formatUptime(stats.uptime || 0)}`}
                gradient="from-rose-500 to-rose-600"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="glass-card p-6 rounded-2xl">
                <h2 className="font-semibold text-lg mb-6 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  Usuários por Mês
                </h2>
                {stats.usuariosPorMes && stats.usuariosPorMes.length > 0 ? (
                  <div className="flex items-end gap-2 h-40">
                    {stats.usuariosPorMes.map((item, i) => {
                      const pct = Math.round((item.total / maxBar) * 100);
                      return (
                        <div key={i} className="flex-1 flex flex-col items-center gap-1">
                          <span className="text-[10px] text-muted-foreground font-medium">{item.total}</span>
                          <div
                            className="w-full bg-gradient-to-t from-primary to-primary/60 rounded-t-lg transition-all min-h-[4px]"
                            style={{ height: `${pct}%` }}
                          />
                          <span className="text-[10px] text-muted-foreground truncate w-full text-center">{item.mes}</span>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-8">Sem dados mensais</p>
                )}
              </div>

              <div className="glass-card p-6 rounded-2xl">
                <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Usuários Recentes
                </h2>
                <div className="space-y-3">
                  {stats.usuariosRecentes?.length ? (
                    stats.usuariosRecentes.slice(0, 6).map((u, i) => (
                      <div key={u.id || i} className="flex items-center gap-3 py-3 border-b border-border/20 last:border-b-0">
                        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm shrink-0">
                          {u.nome?.[0]?.toUpperCase() || '?'}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{u.nome}</p>
                          <p className="text-xs text-muted-foreground truncate">{u.email}</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                            u.role === 'admin'
                              ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300'
                              : 'bg-muted text-muted-foreground'
                          }`}>
                            {u.role || 'user'}
                          </span>
                          {u.criadoEm && (
                            <span className="text-[10px] text-muted-foreground">
                              {new Date(u.criadoEm).toLocaleDateString('pt-BR')}
                            </span>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground py-4 text-center">Nenhum usuário recente</p>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
              <div className="glass-card p-6 rounded-2xl">
                <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-primary" />
                  Status do Sistema
                </h2>
                <div className="space-y-3">
                  {[
                    { label: 'Frontend (Vercel)', status: 'Online', cor: 'green' as const },
                    { label: 'Backend (Oracle VM)', status: 'Ativo', cor: 'green' as const },
                    { label: 'Banco de Dados', status: 'PostgreSQL 16', cor: 'green' as const },
                    { label: 'Cache', status: 'Redis 7', cor: 'green' as const },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-border/20 last:border-b-0">
                      <span className="text-sm">{item.label}</span>
                      <span className={`text-xs font-medium px-3 py-1 rounded-full ${
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
                  <BarChart3 className="w-5 h-5 text-primary" />
                  Métricas Rápidas
                </h2>
                <div className="space-y-3">
                  {[
                    { label: 'Usuários ativos', value: stats.metricas?.usuariosAtivos || stats.totalAtivos || 0 },
                    { label: 'Planos premium', value: stats.metricas?.planosPremium || stats.totalPremium || 0 },
                    { label: 'Planos gratuitos', value: stats.metricas?.planosGratuitos || 0 },
                    { label: 'Total de estudos', value: stats.metricas?.totalEstudos || 0 },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-border/20 last:border-b-0">
                      <span className="text-sm">{item.label}</span>
                      <span className="text-lg font-display font-semibold text-primary">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-card p-6 rounded-2xl">
                <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Informações
                </h2>
                <div className="space-y-3">
                  {[
                    { label: 'Uptime', value: formatUptime(stats.uptime || 0) },
                    { label: 'Versão', value: stats.versao || '1.0.0' },
                    { label: 'Total de usuários', value: stats.totalUsuarios },
                    { label: 'Total de admins', value: stats.totalAdmins || 0 },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-border/20 last:border-b-0">
                      <span className="text-sm">{item.label}</span>
                      <span className="text-sm font-medium">{item.value}</span>
                    </div>
                  ))}
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
  );
}

function StatCard({ icon, value, label, sub, gradient }: {
  icon: React.ReactNode;
  value: React.ReactNode;
  label: string;
  sub: string;
  gradient: string;
}) {
  return (
    <div className="glass-card rounded-2xl overflow-hidden">
      <div className={`px-5 py-4 bg-gradient-to-r ${gradient}`}>
        {icon}
      </div>
      <div className="p-5">
        <p className="text-3xl font-display font-light text-primary">{value}</p>
        <p className="text-sm font-medium mt-1">{label}</p>
        <p className="text-xs text-muted-foreground mt-1">{sub}</p>
      </div>
    </div>
  );
}

function UsuariosTab({ apiFetch, addToast }: { apiFetch: <T,>(e: string, o?: RequestInit) => Promise<T>; addToast: (m: string, t?: 'success' | 'error' | 'info') => void }) {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filtroRole, setFiltroRole] = useState('');
  const [filtroAtivo, setFiltroAtivo] = useState('');
  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [total, setTotal] = useState(0);
  const [selectedUser, setSelectedUser] = useState<Usuario | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchUsuarios = useCallback(async (p = 1) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.set('pagina', String(p));
      params.set('limite', '20');
      if (search) params.set('busca', search);
      if (filtroRole) params.set('role', filtroRole);
      if (filtroAtivo !== '') params.set('ativo', filtroAtivo);
      const res = await apiFetch<any>(`/admin/usuarios?${params.toString()}`);
      const d = res.data || res;
      setUsuarios(Array.isArray(d.usuarios || d.items || d) ? (d.usuarios || d.items || d) : []);
      setTotalPaginas(d.totalPaginas || d.totalPages || 1);
      setTotal(d.total || 0);
      setPagina(p);
    } catch {
      setUsuarios([]);
      addToast('Erro ao carregar usuários', 'error');
    } finally {
      setLoading(false);
    }
  }, [apiFetch, addToast, search, filtroRole, filtroAtivo]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { fetchUsuarios(1); }, []);

  const handleSearch = () => { fetchUsuarios(1); };

  const handleToggleRole = async (user: Usuario) => {
    const action = user.role === 'admin' ? 'rebaixar' : 'promover';
    const label = action === 'promover' ? `promover ${user.nome} a admin` : `rebaixar ${user.nome} de admin`;
    if (!confirm(`Tem certeza que deseja ${label}?`)) return;
    setActionLoading(user.id);
    try {
      await apiFetch(`/admin/usuarios/${user.id}/${action}`, { method: 'POST' });
      addToast(`Usuário ${action === 'promover' ? 'promovido' : 'rebaixado'} com sucesso`, 'success');
      fetchUsuarios(pagina);
      if (selectedUser?.id === user.id) {
        setSelectedUser(prev => prev ? { ...prev, role: action === 'promover' ? 'admin' : 'user' } : null);
      }
    } catch (e: unknown) {
      const mensagem = e instanceof Error ? e.message : 'Erro ao alterar role';
      addToast(mensagem, 'error');
    } finally {
      setActionLoading(null);
    }
  };

  const handleToggleAtivo = async (user: Usuario) => {
    if (user.ativo) {
      if (!confirm(`Tem certeza que deseja desativar ${user.nome}?`)) return;
      setActionLoading(user.id);
      try {
        await apiFetch(`/admin/usuarios/${user.id}`, {
          method: 'PATCH',
          body: JSON.stringify({ ativo: false }),
        });
        addToast('Usuário desativado', 'success');
        fetchUsuarios(pagina);
        if (selectedUser?.id === user.id) {
          setSelectedUser(prev => prev ? { ...prev, ativo: false } : null);
        }
      } catch (e: unknown) {
        const mensagem = e instanceof Error ? e.message : 'Erro ao desativar';
        addToast(mensagem, 'error');
      } finally {
        setActionLoading(null);
      }
    } else {
      if (!confirm(`Reativar ${user.nome}?`)) return;
      setActionLoading(user.id);
      try {
        await apiFetch(`/admin/usuarios/${user.id}/reativar`, { method: 'POST' });
        addToast('Usuário reativado', 'success');
        fetchUsuarios(pagina);
        if (selectedUser?.id === user.id) {
          setSelectedUser(prev => prev ? { ...prev, ativo: true } : null);
        }
      } catch (e: unknown) {
        const mensagem = e instanceof Error ? e.message : 'Erro ao reativar';
        addToast(mensagem, 'error');
      } finally {
        setActionLoading(null);
      }
    }
  };

  const handleViewUser = async (user: Usuario) => {
    try {
      const res = await apiFetch<any>(`/admin/usuarios/${user.id}`);
      setSelectedUser(res.data || res);
    } catch {
      setSelectedUser(user);
    }
  };

  return (
    <ScrollReveal>
      <div>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl font-semibold">Usuários</h1>
            <p className="text-muted-foreground mt-1">Gestão de usuários da plataforma</p>
          </div>
          <button
            onClick={() => fetchUsuarios(pagina)}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2.5 border border-border/50 rounded-xl text-sm font-medium hover:bg-muted/50 transition-colors disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
            Atualizar
          </button>
        </div>

        <div className="glass-card rounded-2xl overflow-hidden mb-6">
          <div className="p-6">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Buscar por nome ou email..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSearch()}
                  className="w-full pl-12 pr-4 py-3 bg-background/50 border border-border/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
              <select
                value={filtroRole}
                onChange={e => { setFiltroRole(e.target.value); }}
                className="px-4 py-3 bg-background/50 border border-border/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                <option value="">Todas as roles</option>
                <option value="admin">Admin</option>
                <option value="user">Usuário</option>
              </select>
              <select
                value={filtroAtivo}
                onChange={e => { setFiltroAtivo(e.target.value); }}
                className="px-4 py-3 bg-background/50 border border-border/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                <option value="">Todos os status</option>
                <option value="true">Ativo</option>
                <option value="false">Inativo</option>
              </select>
              <button
                onClick={handleSearch}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                Buscar
              </button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : usuarios.length > 0 ? (
          <>
            <p className="text-xs text-muted-foreground mb-3">{total} usuário(s) encontrado(s)</p>
            <div className="glass-card rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border/50">
                      <th className="text-left px-6 py-4 font-medium text-muted-foreground">Nome</th>
                      <th className="text-left px-6 py-4 font-medium text-muted-foreground hidden sm:table-cell">Email</th>
                      <th className="text-left px-6 py-4 font-medium text-muted-foreground hidden md:table-cell">Role</th>
                      <th className="text-left px-6 py-4 font-medium text-muted-foreground hidden md:table-cell">Status</th>
                      <th className="text-left px-6 py-4 font-medium text-muted-foreground hidden lg:table-cell">Plano</th>
                      <th className="text-left px-6 py-4 font-medium text-muted-foreground hidden lg:table-cell">Criado em</th>
                      <th className="text-right px-6 py-4 font-medium text-muted-foreground">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usuarios.map(user => (
                      <tr key={user.id} className="border-b border-border/20 last:border-b-0 hover:bg-muted/30 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-semibold text-xs shrink-0">
                              {user.nome?.[0]?.toUpperCase() || '?'}
                            </div>
                            <div className="min-w-0">
                              <p className="font-medium truncate max-w-[160px]">{user.nome}</p>
                              <p className="text-xs text-muted-foreground truncate sm:hidden max-w-[160px]">{user.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-muted-foreground hidden sm:table-cell truncate max-w-[200px]">{user.email}</td>
                        <td className="px-6 py-4 hidden md:table-cell">
                          <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                            user.role === 'admin'
                              ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300'
                              : 'bg-muted text-muted-foreground'
                          }`}>
                            {user.role || 'user'}
                          </span>
                        </td>
                        <td className="px-6 py-4 hidden md:table-cell">
                          <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                            user.ativo !== false
                              ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                              : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                          }`}>
                            {user.ativo !== false ? 'Ativo' : 'Inativo'}
                          </span>
                        </td>
                        <td className="px-6 py-4 hidden lg:table-cell">
                          <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                            user.plano === 'premium'
                              ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                              : 'bg-muted text-muted-foreground'
                          }`}>
                            {user.plano || 'gratuito'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-xs text-muted-foreground hidden lg:table-cell whitespace-nowrap">
                          {user.criadoEm ? new Date(user.criadoEm).toLocaleDateString('pt-BR') : '—'}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => handleViewUser(user)}
                              className="p-2 rounded-lg hover:bg-muted transition-colors"
                              title="Ver detalhes"
                              disabled={actionLoading === user.id}
                            >
                              <Eye className="w-4 h-4 text-muted-foreground" />
                            </button>
                            <button
                              onClick={() => handleToggleRole(user)}
                              className={`p-2 rounded-lg transition-colors ${
                                user.role === 'admin'
                                  ? 'hover:bg-amber-50 dark:hover:bg-amber-900/20'
                                  : 'hover:bg-green-50 dark:hover:bg-green-900/20'
                              }`}
                              title={user.role === 'admin' ? 'Rebaixar' : 'Promover a admin'}
                              disabled={actionLoading === user.id}
                            >
                              {actionLoading === user.id ? (
                                <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                              ) : user.role === 'admin' ? (
                                <ShieldOff className="w-4 h-4 text-amber-600" />
                              ) : (
                                <Shield className="w-4 h-4 text-green-600" />
                              )}
                            </button>
                            <button
                              onClick={() => handleToggleAtivo(user)}
                              className={`p-2 rounded-lg transition-colors ${
                                user.ativo !== false
                                  ? 'hover:bg-red-50 dark:hover:bg-red-900/20'
                                  : 'hover:bg-green-50 dark:hover:bg-green-900/20'
                              }`}
                              title={user.ativo !== false ? 'Desativar' : 'Reativar'}
                              disabled={actionLoading === user.id}
                            >
                              {user.ativo !== false ? (
                                <Ban className="w-4 h-4 text-red-500" />
                              ) : (
                                <UserCheck className="w-4 h-4 text-green-500" />
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {totalPaginas > 1 && (
              <div className="flex items-center justify-center gap-4 mt-6">
                <button
                  onClick={() => fetchUsuarios(pagina - 1)}
                  disabled={pagina <= 1}
                  className="flex items-center gap-1 px-4 py-2 border border-border/50 rounded-xl text-sm font-medium hover:bg-muted/50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Anterior
                </button>
                <span className="text-sm text-muted-foreground">
                  Página {pagina} de {totalPaginas}
                </span>
                <button
                  onClick={() => fetchUsuarios(pagina + 1)}
                  disabled={pagina >= totalPaginas}
                  className="flex items-center gap-1 px-4 py-2 border border-border/50 rounded-xl text-sm font-medium hover:bg-muted/50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Próxima
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="glass-card p-8 rounded-2xl text-center">
            <Users className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
            <p className="text-muted-foreground">
              {search || filtroRole || filtroAtivo ? 'Nenhum usuário encontrado para esses filtros' : 'Nenhum usuário encontrado'}
            </p>
            {!search && !filtroRole && !filtroAtivo && (
              <button onClick={() => fetchUsuarios(1)} className="mt-4 text-primary text-sm hover:underline">Tentar novamente</button>
            )}
          </div>
        )}
      </div>

      {selectedUser && (
        <UserDetailModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          onToggleRole={() => handleToggleRole(selectedUser)}
          onToggleAtivo={() => handleToggleAtivo(selectedUser)}
          actionLoading={actionLoading === selectedUser.id}
        />
      )}
    </ScrollReveal>
  );
}

function UserDetailModal({ user, onClose, onToggleRole, onToggleAtivo, actionLoading }: {
  user: Usuario;
  onClose: () => void;
  onToggleRole: () => void;
  onToggleAtivo: () => void;
  actionLoading: boolean;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div
        className="relative glass-card rounded-2xl w-full max-w-md p-6 shadow-2xl animate-in fade-in zoom-in-95"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-semibold text-lg">Detalhes do Usuário</h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-muted transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-white font-bold text-xl">
            {user.nome?.[0]?.toUpperCase() || '?'}
          </div>
          <div>
            <p className="font-semibold text-lg">{user.nome}</p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-between py-3 border-b border-border/20">
            <span className="text-sm text-muted-foreground">ID</span>
            <span className="text-sm font-mono truncate ml-4 max-w-[180px]">{user.id}</span>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-border/20">
            <span className="text-sm text-muted-foreground">Role</span>
            <span className={`text-xs font-medium px-3 py-1 rounded-full ${
              user.role === 'admin'
                ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300'
                : 'bg-muted text-muted-foreground'
            }`}>
              {user.role || 'user'}
            </span>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-border/20">
            <span className="text-sm text-muted-foreground">Status</span>
            <span className={`text-xs font-medium px-3 py-1 rounded-full ${
              user.ativo !== false
                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
            }`}>
              {user.ativo !== false ? 'Ativo' : 'Inativo'}
            </span>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-border/20">
            <span className="text-sm text-muted-foreground">Plano</span>
            <span className={`text-xs font-medium px-3 py-1 rounded-full ${
              user.plano === 'premium'
                ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                : 'bg-muted text-muted-foreground'
            }`}>
              {user.plano || 'gratuito'}
            </span>
          </div>
          <div className="flex items-center justify-between py-3">
            <span className="text-sm text-muted-foreground">Criado em</span>
            <span className="text-sm font-medium">
              {user.criadoEm ? new Date(user.criadoEm).toLocaleDateString('pt-BR') : '—'}
            </span>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onToggleRole}
            disabled={actionLoading}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors disabled:opacity-50 ${
              user.role === 'admin'
                ? 'border border-amber-500/30 text-amber-700 dark:text-amber-300 hover:bg-amber-50 dark:hover:bg-amber-900/20'
                : 'border border-green-500/30 text-green-700 dark:text-green-300 hover:bg-green-50 dark:hover:bg-green-900/20'
            }`}
          >
            {actionLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : user.role === 'admin' ? <ShieldOff className="w-4 h-4" /> : <Shield className="w-4 h-4" />}
            {user.role === 'admin' ? 'Rebaixar' : 'Promover'}
          </button>
          <button
            onClick={onToggleAtivo}
            disabled={actionLoading}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors disabled:opacity-50 ${
              user.ativo !== false
                ? 'border border-red-500/30 text-red-700 dark:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20'
                : 'border border-green-500/30 text-green-700 dark:text-green-300 hover:bg-green-50 dark:hover:bg-green-900/20'
            }`}
          >
            {user.ativo !== false ? <Ban className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
            {user.ativo !== false ? 'Desativar' : 'Reativar'}
          </button>
        </div>
      </div>
    </div>
  );
}

function ConfigTab({ apiFetch }: { apiFetch: <T,>(e: string, o?: RequestInit) => Promise<T> }) {
  return (
    <ScrollReveal>
      <div>
        <div className="mb-8">
          <h1 className="font-display text-3xl font-semibold">Configurações</h1>
          <p className="text-muted-foreground mt-1">Configurações do sistema</p>
        </div>

        <div className="space-y-6">
          <div className="glass-card p-6 rounded-2xl">
            <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <Server className="w-5 h-5 text-primary" />
              Backend
            </h2>
            <div className="space-y-4">
              {[
                { label: 'API URL', value: 'https://api.solascripturabr.com.br', status: 'Ativo', cor: 'green' as const },
                { label: 'Framework', value: 'NestJS + TypeORM', status: 'Ativo', cor: 'green' as const },
                { label: 'Deploy', value: 'Oracle VM (137.131.184.53)', status: 'Ativo', cor: 'green' as const },
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
              <Database className="w-5 h-5 text-primary" />
              Banco de Dados
            </h2>
            <div className="space-y-4">
              {[
                { label: 'PostgreSQL', value: 'PostgreSQL 16 + pgvector (Docker)', status: 'Ativo', cor: 'green' as const },
                { label: 'Cache', value: 'Redis 7 (Docker)', status: 'Ativo', cor: 'green' as const },
                { label: 'Busca', value: 'Elasticsearch (full-text + semântico)', status: 'Ativo', cor: 'green' as const },
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
              <Globe className="w-5 h-5 text-primary" />
              Frontend & Infra
            </h2>
            <div className="space-y-4">
              {[
                { label: 'Frontend', value: 'Next.js 14 + TypeScript + TailwindCSS', status: 'Vercel', cor: 'green' as const },
                { label: 'Domínio', value: 'solascripturabr.com.br', status: 'Ativo', cor: 'green' as const },
                { label: 'SSL/Proxy', value: 'Cloudflare', status: 'Ativo', cor: 'green' as const },
                { label: 'TTS', value: 'Cloudflare Worker (Edge TTS)', status: 'Ativo', cor: 'green' as const },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between py-4 border-b border-border/20 last:border-b-0">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{item.label}</p>
                    <p className="text-xs text-muted-foreground mt-1 truncate">{item.value}</p>
                  </div>
                  <span className="text-xs font-medium px-3 py-1.5 rounded-full ml-4 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-6 rounded-2xl">
            <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <Key className="w-5 h-5 text-primary" />
              Autenticação
            </h2>
            <div className="space-y-4">
              {[
                { label: 'Auth Provider', value: 'Supabase (email/senha + Google OAuth)', status: 'Ativo', cor: 'green' as const },
                { label: 'JWT', value: 'Access Token + Refresh Token', status: 'Ativo', cor: 'green' as const },
                { label: 'Admin Detection', value: 'Role-based (admin/user)', status: 'Ativo', cor: 'green' as const },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between py-4 border-b border-border/20 last:border-b-0">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{item.label}</p>
                    <p className="text-xs text-muted-foreground mt-1 truncate">{item.value}</p>
                  </div>
                  <span className="text-xs font-medium px-3 py-1.5 rounded-full ml-4 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}
