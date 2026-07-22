'use client';

import { useState, useEffect, useCallback } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Activity, Database, Clock, Cpu, RefreshCw, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';

interface HealthData {
  status: 'online' | 'degraded' | 'offline';
  timestamp: string;
  version: string;
  environment: string;
  uptime: number;
  memory: {
    heapUsed: string;
    heapTotal: string;
    rss: string;
    external: string;
  };
  database: {
    status: 'connected' | 'disconnected' | 'error';
    latencyMs?: number;
    message?: string;
  };
  dependencies: Record<string, {
    status: 'healthy' | 'unhealthy' | 'unknown';
    latencyMs?: number;
    message?: string;
  }>;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://api.solascripturabr.com.br/api/v1';

function formatUptime(seconds: number): string {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  if (days > 0) return `${days}d ${hours}h ${minutes}m`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}

function StatusIcon({ status }: { status: string }) {
  if (status === 'online' || status === 'connected' || status === 'healthy' || status === 'ready') {
    return <CheckCircle className="w-5 h-5 text-green-500" />;
  }
  if (status === 'degraded' || status === 'unhealthy' || status === 'not_ready') {
    return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
  }
  return <XCircle className="w-5 h-5 text-red-500" />;
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    online: 'bg-green-500/10 text-green-600 dark:text-green-400',
    connected: 'bg-green-500/10 text-green-600 dark:text-green-400',
    healthy: 'bg-green-500/10 text-green-600 dark:text-green-400',
    ready: 'bg-green-500/10 text-green-600 dark:text-green-400',
    degraded: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400',
    unhealthy: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400',
    not_ready: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400',
    offline: 'bg-red-500/10 text-red-600 dark:text-red-400',
    disconnected: 'bg-red-500/10 text-red-600 dark:text-red-400',
    error: 'bg-red-500/10 text-red-600 dark:text-red-400',
    unknown: 'bg-gray-500/10 text-gray-600 dark:text-gray-400',
  };
  return (
    <span className={`text-xs font-medium px-2 py-1 rounded-full ${colors[status] || colors.unknown}`}>
      {status}
    </span>
  );
}

export default function StatusPage() {
  const [health, setHealth] = useState<HealthData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastCheck, setLastCheck] = useState<Date | null>(null);

  const fetchHealth = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/health`, { cache: 'no-store' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setHealth(data.data || data);
      setLastCheck(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao verificar status');
      setHealth(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHealth();
    const interval = setInterval(fetchHealth, 60000);
    return () => clearInterval(interval);
  }, [fetchHealth]);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="w-16 h-16 rounded-2xl bg-green-500/10 flex items-center justify-center mx-auto mb-6"
              >
                <Activity className="w-8 h-8 text-green-500" />
              </motion.div>
              <h1 className="font-display text-4xl md:text-5xl font-light mb-4">
                Status do <span className="italic text-primary">Sistema</span>
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Monitoramento em tempo real da plataforma Sola Scriptura BR.
              </p>
              <div className="ornament w-16 mx-auto mt-6" />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                {health ? (
                  <StatusIcon status={health.status} />
                ) : loading ? (
                  <RefreshCw className="w-5 h-5 text-muted-foreground animate-spin" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-500" />
                )}
                <div>
                  <h2 className="font-semibold text-lg">
                    {health ? (
                      <>Status: <StatusBadge status={health.status} /></>
                    ) : error ? (
                      <span className="text-red-500">Offline</span>
                    ) : (
                      <span className="text-muted-foreground">Verificando...</span>
                    )}
                  </h2>
                  {lastCheck && (
                    <p className="text-xs text-muted-foreground">
                      Última verificação: {lastCheck.toLocaleTimeString('pt-BR')}
                    </p>
                  )}
                </div>
              </div>
              <button
                onClick={fetchHealth}
                disabled={loading}
                className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </ScrollReveal>

          {error && (
            <ScrollReveal delay={0.15}>
              <div className="sola-card p-6 border-red-500/20 bg-red-500/5 mb-6">
                <div className="flex items-center gap-3">
                  <XCircle className="w-5 h-5 text-red-500" />
                  <div>
                    <h3 className="font-semibold text-red-600 dark:text-red-400">Erro de Conexão</h3>
                    <p className="text-sm text-muted-foreground">{error}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          )}

          {health && (
            <>
              <ScrollReveal delay={0.2}>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="sola-card p-4 text-center">
                    <Clock className="w-5 h-5 mx-auto mb-2 text-primary" />
                    <p className="font-display text-2xl font-light text-primary">{formatUptime(health.uptime)}</p>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Uptime</p>
                  </div>
                  <div className="sola-card p-4 text-center">
                    <Cpu className="w-5 h-5 mx-auto mb-2 text-primary" />
                    <p className="font-display text-2xl font-light text-primary">{health.memory.heapUsed}</p>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Memória</p>
                  </div>
                  <div className="sola-card p-4 text-center">
                    <Database className="w-5 h-5 mx-auto mb-2 text-primary" />
                    <p className="font-display text-2xl font-light text-primary">
                      {health.database.latencyMs ? `${health.database.latencyMs}ms` : '—'}
                    </p>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Latência DB</p>
                  </div>
                  <div className="sola-card p-4 text-center">
                    <Activity className="w-5 h-5 mx-auto mb-2 text-primary" />
                    <p className="font-display text-2xl font-light text-primary">{health.version}</p>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Versão</p>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.25}>
                <div className="sola-card p-6 mb-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Database className="w-4 h-4" />
                    Banco de Dados
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">PostgreSQL</span>
                    <StatusBadge status={health.database.status} />
                  </div>
                  {health.database.message && (
                    <p className="text-xs text-muted-foreground mt-2">{health.database.message}</p>
                  )}
                </div>
              </ScrollReveal>

              {Object.keys(health.dependencies).length > 0 && (
                <ScrollReveal delay={0.3}>
                  <div className="sola-card p-6">
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <Activity className="w-4 h-4" />
                      Dependências
                    </h3>
                    <div className="space-y-3">
                      {Object.entries(health.dependencies).map(([name, dep]) => (
                        <div key={name} className="flex items-center justify-between">
                          <span className="text-sm capitalize">{name}</span>
                          <div className="flex items-center gap-2">
                            {dep.latencyMs && (
                              <span className="text-xs text-muted-foreground">{dep.latencyMs}ms</span>
                            )}
                            <StatusBadge status={dep.status} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              )}

              <ScrollReveal delay={0.35}>
                <div className="mt-6 text-center">
                  <p className="text-xs text-muted-foreground">
                    Ambiente: {health.environment} • Atualização automática a cada 60s
                  </p>
                </div>
              </ScrollReveal>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
