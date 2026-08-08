'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import { motion } from 'framer-motion';
import { Bell, BellOff, Clock, Flame, BookOpen, Sparkles, Check, Loader2 } from 'lucide-react';
import {
  isPushSupported,
  isPushEnabled,
  requestNotificationPermission,
  enablePush,
  disablePush,
  getSmartPushSettings,
  saveSmartPushSettings,
  reschedulePushFromStorage,
  scheduleSmartNotifications,
  sendTestNotification,
  type SmartPushSettings,
} from '@/lib/pushNotifications';

export default function NotificacoesPage() {
  const [supported, setSupported] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState<SmartPushSettings>({
    hora: 7,
    minuto: 0,
    lembreteStreak: true,
    lembretePlano: true,
    versiculoMotivacional: true,
  });
  const [toast, setToast] = useState<string | null>(null);
  const [testLoading, setTestLoading] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    setSupported(isPushSupported());
    setEnabled(isPushEnabled());
    setSettings(getSmartPushSettings());
    if (isPushEnabled() && Notification.permission === 'granted') {
      reschedulePushFromStorage();
      scheduleSmartNotifications();
    }
  }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleToggle = async () => {
    if (loading) return;
    setLoading(true);
    try {
      if (enabled) {
        await disablePush();
        setEnabled(false);
        showToast('Notificações desativadas');
      } else {
        const perm = await requestNotificationPermission();
        if (perm === 'denied') {
          showToast('Permissão negada. Ative nas configurações do navegador.');
          setLoading(false);
          return;
        }
        if (perm === 'default') {
          setLoading(false);
          return;
        }
        const ok = await enablePush(settings.hora, settings.minuto);
        if (ok) {
          setEnabled(true);
          showToast('Notificações ativadas!');
        } else {
          showToast('Erro ao ativar notificações.');
        }
      }
    } catch {
      showToast('Erro ao processar notificações.');
    } finally {
      setLoading(false);
    }
  };

  const updateSetting = (key: keyof SmartPushSettings, value: boolean | number) => {
    const next = { ...settings, [key]: value };
    setSettings(next);
    saveSmartPushSettings(next);
    if (enabled) {
      // Reschedule with new settings
      enablePush(next.hora, next.minuto).then(() => {
        scheduleSmartNotifications();
      });
    }
  };

  const handleTestNotification = async () => {
    setTestLoading(true);
    try {
      const ok = await sendTestNotification();
      if (ok) {
        showToast('Notificação de teste enviada! Verifique sua barra de notificações.');
      } else {
        showToast('Erro ao enviar teste. Verifique as permissões do navegador.');
      }
    } catch {
      showToast('Erro ao enviar teste.');
    } finally {
      setTestLoading(false);
    }
  };

  if (!supported) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-24 pb-16 px-4 sm:px-6">
          <div className="max-w-2xl mx-auto text-center py-20">
            <BellOff className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h1 className="text-2xl font-display font-light mb-2">Notificações</h1>
            <p className="text-muted-foreground text-sm">Seu navegador não suporta notificações push.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const horaFormatada = `${String(settings.hora).padStart(2, '0')}:${String(settings.minuto).padStart(2, '0')}`;

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-10">
              <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center border border-amber-500/20">
                <Bell className="w-10 h-10 text-amber-500" />
              </div>
              <h1 className="font-display text-2xl sm:text-4xl font-light mb-3">Notificações <span className="text-primary italic">Push</span></h1>
              <p className="text-muted-foreground max-w-lg mx-auto">
                Configure lembretes personalizados para manter sua rotina de estudo bíblico
              </p>
            </div>
          </ScrollReveal>

          {/* Toggle principal */}
          <div className="rounded-2xl border border-border/50 bg-card/50 p-6 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${enabled ? 'bg-primary/10' : 'bg-muted/50'}`}>
                  {enabled ? <Bell className="w-6 h-6 text-primary" /> : <BellOff className="w-6 h-6 text-muted-foreground" />}
                </div>
                <div>
                  <h2 className="font-semibold">Notificações Push</h2>
                  <p className="text-sm text-muted-foreground">
                    {enabled ? 'Ativadas' : 'Desativadas'}
                  </p>
                </div>
              </div>
              <button onClick={handleToggle} disabled={loading}
                className={`relative w-14 h-7 rounded-full transition-all duration-300 ${enabled ? 'bg-primary' : 'bg-muted'}`}>
                <motion.div className="absolute top-0.5 w-6 h-6 rounded-full bg-white shadow-md"
                  animate={{ left: enabled ? '30px' : '2px' }} transition={{ type: 'spring', stiffness: 500, damping: 30 }} />
              </button>
            </div>
          </div>

          {enabled && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              {/* Horário */}
              <div className="rounded-2xl border border-border/50 bg-card/50 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold">Horário do Versículo Diário</h3>
                </div>
                <div className="flex items-center gap-3">
                  <input type="number" min={0} max={23} value={settings.hora}
                    onChange={e => updateSetting('hora', Math.min(23, Math.max(0, Number(e.target.value))))}
                    className="w-20 px-3 py-2 text-center rounded-lg border border-border bg-background text-lg font-mono" />
                  <span className="text-xl font-bold text-muted-foreground">:</span>
                  <input type="number" min={0} max={59} value={settings.minuto}
                    onChange={e => updateSetting('minuto', Math.min(59, Math.max(0, Number(e.target.value))))}
                    className="w-20 px-3 py-2 text-center rounded-lg border border-border bg-background text-lg font-mono" />
                  <span className="text-sm text-muted-foreground ml-2">({horaFormatada})</span>
                </div>
                <div className="mt-4 pt-4 border-t border-border/30">
                  <button
                    onClick={handleTestNotification}
                    disabled={testLoading}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-medium border border-primary/30 text-primary hover:bg-primary/5 transition-colors disabled:opacity-50"
                  >
                    {testLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Bell className="w-4 h-4" />
                    )}
                    {testLoading ? 'Enviando...' : 'Testar Notificação Agora'}
                  </button>
                  <p className="text-center text-[10px] text-muted-foreground mt-2">
                    Envia uma notificação de teste para verificar se está funcionando
                  </p>
                </div>
              </div>

              {/* Tipos de notificação */}
              <div className="rounded-2xl border border-border/50 bg-card/50 p-6 space-y-4">
                <h3 className="font-semibold">Tipos de Notificação</h3>

                <ToggleRow
                  icon={<Sparkles className="w-4 h-4 text-amber-500" />}
                  title="Versículo Motivacional"
                  desc="Versículo diário com exortação à leitura"
                  enabled={settings.versiculoMotivacional}
                  onToggle={() => updateSetting('versiculoMotivacional', !settings.versiculoMotivacional)}
                />
                <ToggleRow
                  icon={<Flame className="w-4 h-4 text-orange-500" />}
                  title="Lembrete de Sequência"
                  desc="Aviso quando sua sequência de leitura estiver em risco"
                  enabled={settings.lembreteStreak}
                  onToggle={() => updateSetting('lembreteStreak', !settings.lembreteStreak)}
                />
                <ToggleRow
                  icon={<BookOpen className="w-4 h-4 text-blue-500" />}
                  title="Lembrete de Plano"
                  desc="Alerta quando estiver atrasado no plano de leitura"
                  enabled={settings.lembretePlano}
                  onToggle={() => updateSetting('lembretePlano', !settings.lembretePlano)}
                />
              </div>
            </motion.div>
          )}
        </div>
      </main>

      {toast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[9999] px-4 py-3 rounded-xl border border-border bg-surface-raised/95 backdrop-blur-md shadow-xl flex items-center gap-2.5 max-w-sm">
          <span className="w-6 h-6 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
            <Check className="w-3.5 h-3.5 text-primary" />
          </span>
          <span className="text-sm">{toast}</span>
        </div>
      )}
      <Footer />
    </div>
  );
}

function ToggleRow({ icon, title, desc, enabled, onToggle }: {
  icon: React.ReactNode; title: string; desc: string; enabled: boolean; onToggle: () => void;
}) {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center gap-3">
        {icon}
        <div>
          <p className="text-sm font-medium">{title}</p>
          <p className="text-xs text-muted-foreground">{desc}</p>
        </div>
      </div>
      <button onClick={onToggle}
        className={`relative w-11 h-6 rounded-full transition-all duration-300 ${enabled ? 'bg-primary' : 'bg-muted'}`}>
        <motion.div className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm"
          animate={{ left: enabled ? '22px' : '2px' }} transition={{ type: 'spring', stiffness: 500, damping: 30 }} />
      </button>
    </div>
  );
}
