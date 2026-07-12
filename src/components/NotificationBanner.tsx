'use client';

import { useState, useEffect } from 'react';
import { Bell, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  isNotificationsEnabled,
  requestNotificationPermission,
  scheduleDailyNotification,
} from '@/lib/notificacoes';

export function NotificationBanner() {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isNotificationsEnabled()) {
      setVisible(true);
    }
  }, []);

  const handleEnable = async () => {
    setLoading(true);
    const granted = await requestNotificationPermission();
    if (granted) {
      scheduleDailyNotification(7, 0);
    }
    setVisible(false);
    setLoading(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="sola-card p-4 mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-3 border border-[var(--primary)]/20"
        >
          <div className="w-10 h-10 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center shrink-0">
            <Bell className="w-5 h-5 text-[var(--primary)]" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-[var(--fg)]">
              Ative lembretes para receber o versículo do dia
            </p>
            <p className="text-xs text-[var(--muted-fg)] mt-0.5">
              Receba uma notificação diária às 7h com o versículo devocional
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleEnable}
              disabled={loading}
              className="px-4 py-2 text-xs font-medium bg-primary text-primary-foreground rounded-lg hover:bg-[var(--primary)]/90 transition-colors disabled:opacity-50"
            >
              {loading ? 'Ativando...' : 'Ativar'}
            </button>
            <button
              onClick={() => setVisible(false)}
              className="p-2 text-[var(--muted-fg)] hover:text-[var(--fg)] rounded-lg hover:bg-[var(--bg)] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
