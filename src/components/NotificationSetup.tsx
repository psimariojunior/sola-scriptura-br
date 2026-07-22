'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, BellOff, Check, Loader2 } from 'lucide-react';
import {
  isPushSupported,
  isPushEnabled,
  requestNotificationPermission,
  enablePush,
  disablePush,
  reschedulePushFromStorage,
} from '@/lib/pushNotifications';

export function NotificationSetup() {
  const [supported, setSupported] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    setSupported(isPushSupported());
    setEnabled(isPushEnabled());

    if (isPushEnabled() && Notification.permission === 'granted') {
      reschedulePushFromStorage();
    }
  }, []);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }, []);

  const handleToggle = useCallback(async () => {
    if (loading) return;
    setLoading(true);

    try {
      if (enabled) {
        await disablePush();
        setEnabled(false);
        showToast('Notificações desativadas');
      } else {
        const permission = await requestNotificationPermission();
        if (permission === 'denied') {
          showToast('Permissão negada. Ative nas configurações do navegador.');
          setLoading(false);
          return;
        }
        if (permission === 'default') {
          setLoading(false);
          return;
        }
        const ok = await enablePush(7, 0);
        if (ok) {
          setEnabled(true);
          showToast('Notificações ativadas! Você receberá um versículo diário às 7h.');
        } else {
          showToast('Erro ao ativar notificações.');
        }
      }
    } catch {
      showToast('Erro ao processar notificações.');
    } finally {
      setLoading(false);
    }
  }, [enabled, loading, showToast]);

  if (!supported) return null;

  return (
    <>
      <div className="w-full max-w-sm">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleToggle}
          disabled={loading}
          className={`w-full flex items-center justify-center gap-2.5 py-3 px-5 rounded-xl text-sm font-semibold transition-all duration-300 ${
            enabled
              ? 'bg-primary/10 border border-primary/30 text-primary hover:bg-primary/15'
              : 'bg-gradient-to-r from-primary to-accent-warm text-white shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : enabled ? (
            <BellOff className="w-4 h-4" />
          ) : (
            <Bell className="w-4 h-4" />
          )}
          {loading
            ? 'Processando...'
            : enabled
              ? 'Desativar notificações'
              : 'Ativar notificações diárias'}
        </motion.button>
        <p className="text-center text-xs text-muted-foreground mt-2">
          {enabled
            ? 'Versículo do dia às 7h da manhã'
            : 'Receba um versículo toda manhã'}
        </p>
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-20 left-1/2 -translate-x-1/2 z-[9999] px-4 py-3 rounded-xl border border-border bg-surface-raised/95 backdrop-blur-md shadow-xl shadow-black/10 flex items-center gap-2.5 max-w-sm"
          >
            <span className="w-6 h-6 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
              <Check className="w-3.5 h-3.5 text-primary" />
            </span>
            <span className="text-sm text-foreground">{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
