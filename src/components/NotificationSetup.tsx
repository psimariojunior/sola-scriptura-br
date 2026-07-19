'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bell,
  BellOff,
  BellRing,
  Clock,
  Sun,
  BookOpen,
  Check,
  X,
  AlertCircle,
} from 'lucide-react';
import {
  type NotificationSettings,
  isSupported,
  getPermission,
  requestPermission,
  saveNotificationSettings,
  getNotificationSettings,
  scheduleDailyVerse,
  scheduleStudyReminder,
  cancelAllNotifications,
  sendTestNotification,
  rescheduleFromStorage,
} from '@/lib/notifications';

const TIME_OPTIONS = [
  '06:00', '06:30', '07:00', '07:30', '08:00', '08:30',
  '09:00', '09:30', '10:00', '12:00', '14:00', '16:00',
  '18:00', '19:00', '19:30', '20:00', '20:30', '21:00', '22:00',
];

function PermissionBadge({ permission }: { permission: NotificationPermission | 'unsupported' }) {
  if (permission === 'unsupported') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/20">
        <X className="w-3 h-3" />
        Não suportado
      </span>
    );
  }
  if (permission === 'granted') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
        <Check className="w-3 h-3" />
        Permitido
      </span>
    );
  }
  if (permission === 'denied') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/20">
        <AlertCircle className="w-3 h-3" />
        Bloqueado pelo navegador
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
      <Bell className="w-3 h-3" />
      Não solicitado
    </span>
  );
}

function ToggleSwitch({
  enabled,
  onToggle,
  disabled,
}: {
  enabled: boolean;
  onToggle: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onToggle}
      disabled={disabled}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background disabled:opacity-40 disabled:cursor-not-allowed ${
        enabled
          ? 'bg-gradient-to-r from-primary to-accent-warm'
          : 'bg-muted/30'
      }`}
    >
      <motion.span
        layout
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className={`inline-block h-4 w-4 rounded-full bg-white shadow-sm ${
          enabled ? 'ml-6' : 'ml-1'
        }`}
      />
    </button>
  );
}

function TimeSelect({
  value,
  onChange,
  disabled,
}: {
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className="px-3 py-1.5 text-sm rounded-lg border border-border bg-surface-raised text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:opacity-40 disabled:cursor-not-allowed appearance-none cursor-pointer min-w-[100px]"
    >
      {TIME_OPTIONS.map((t) => (
        <option key={t} value={t}>
          {t}
        </option>
      ))}
    </select>
  );
}

export function NotificationSetup() {
  const [settings, setSettings] = useState<NotificationSettings>({
    enabled: false,
    dailyVerse: false,
    dailyVerseTime: '08:00',
    studyReminder: false,
    studyReminderTime: '19:00',
  });
  const [permission, setPermission] = useState<NotificationPermission | 'unsupported'>('default');
  const [supported, setSupported] = useState(false);
  const [testSent, setTestSent] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const sup = isSupported();
    setSupported(sup);

    if (sup) {
      setPermission(getPermission());
      const saved = getNotificationSettings();
      setSettings(saved);

      if (saved.enabled && getPermission() === 'granted') {
        rescheduleFromStorage();
      }
    }
  }, []);

  const updateSettings = useCallback(
    async (patch: Partial<NotificationSettings>) => {
      const next = { ...settings, ...patch };
      setSettings(next);
      saveNotificationSettings(next);

      const { hour: hv, minute: mv } = parseTime(next.dailyVerseTime);
      const { hour: hs, minute: ms } = parseTime(next.studyReminderTime);

      if (next.enabled && getPermission() === 'granted') {
        if (next.dailyVerse) {
          await scheduleDailyVerse(hv, mv);
        }
        if (next.studyReminder) {
          await scheduleStudyReminder(hs, ms);
        }
      }

      if (!next.dailyVerse) {
        await cancelAllNotifications();
        if (next.enabled) {
          if (next.studyReminder) await scheduleStudyReminder(hs, ms);
        }
      }
      if (!next.studyReminder) {
        await cancelAllNotifications();
        if (next.enabled) {
          if (next.dailyVerse) await scheduleDailyVerse(hv, mv);
        }
      }
    },
    [settings]
  );

  const handleEnableToggle = useCallback(async () => {
    if (settings.enabled) {
      await cancelAllNotifications();
      updateSettings({ enabled: false, dailyVerse: false, studyReminder: false });
      return;
    }

    setLoading(true);
    const granted = await requestPermission();
    setLoading(false);

    if (granted) {
      setPermission('granted');
      updateSettings({ enabled: true });
      const { hour: hv, minute: mv } = parseTime(settings.dailyVerseTime);
      await scheduleDailyVerse(hv, mv);
    } else {
      setPermission(getPermission());
    }
  }, [settings, updateSettings]);

  const handleTest = useCallback(async () => {
    setTestSent(true);
    await sendTestNotification();
    setTimeout(() => setTestSent(false), 3000);
  }, []);

  if (!supported) return null;

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="rounded-2xl border border-border bg-surface-raised/80 backdrop-blur-sm overflow-hidden shadow-lg shadow-black/5">
        {/* Header */}
        <div className="px-5 py-4 border-b border-border bg-gradient-to-r from-primary/5 to-accent-warm/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-primary/10">
                <BellRing className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-sm">
                  Notificações
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Lembretes diários da Palavra
                </p>
              </div>
            </div>
            <PermissionBadge permission={permission} />
          </div>
        </div>

        {/* Content */}
        <div className="px-5 py-4 space-y-4">
          {/* Master toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {settings.enabled ? (
                <Bell className="w-4 h-4 text-primary" />
              ) : (
                <BellOff className="w-4 h-4 text-muted-foreground" />
              )}
              <span className="text-sm font-medium text-foreground">
                Ativar notificações
              </span>
            </div>
            <ToggleSwitch
              enabled={settings.enabled}
              onToggle={handleEnableToggle}
              disabled={loading || permission === 'denied'}
            />
          </div>

          <AnimatePresence>
            {settings.enabled && permission === 'granted' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="space-y-3 pt-2 border-t border-border/50">
                  {/* Daily Verse */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <Sun className="w-4 h-4 text-amber-500" />
                        <span className="text-sm text-foreground">
                          Versículo do dia
                        </span>
                      </div>
                      <ToggleSwitch
                        enabled={settings.dailyVerse}
                        onToggle={() =>
                          updateSettings({ dailyVerse: !settings.dailyVerse })
                        }
                      />
                    </div>
                    <AnimatePresence>
                      {settings.dailyVerse && (
                        <motion.div
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          className="flex items-center gap-2 pl-7"
                        >
                          <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                          <TimeSelect
                            value={settings.dailyVerseTime}
                            onChange={(v) => updateSettings({ dailyVerseTime: v })}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Study Reminder */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <BookOpen className="w-4 h-4 text-blue-500" />
                        <span className="text-sm text-foreground">
                          Lembrete de estudo
                        </span>
                      </div>
                      <ToggleSwitch
                        enabled={settings.studyReminder}
                        onToggle={() =>
                          updateSettings({
                            studyReminder: !settings.studyReminder,
                          })
                        }
                      />
                    </div>
                    <AnimatePresence>
                      {settings.studyReminder && (
                        <motion.div
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          className="flex items-center gap-2 pl-7"
                        >
                          <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                          <TimeSelect
                            value={settings.studyReminderTime}
                            onChange={(v) =>
                              updateSettings({ studyReminderTime: v })
                            }
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Denied notice */}
          {permission === 'denied' && (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-red-500/5 border border-red-500/10">
              <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
              <p className="text-xs text-red-400">
                As notificações estão bloqueadas pelo navegador. Acesse as
                configurações do navegador para permitir.
              </p>
            </div>
          )}

          {/* Test button */}
          {settings.enabled && permission === 'granted' && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleTest}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-medium border border-primary/20 text-primary hover:bg-primary/5 transition-colors"
            >
              {testSent ? (
                <>
                  <Check className="w-4 h-4" />
                  Notificação enviada!
                </>
              ) : (
                <>
                  <BellRing className="w-4 h-4" />
                  Enviar notificação de teste
                </>
              )}
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
}

function parseTime(time: string): { hour: number; minute: number } {
  const [h, m] = time.split(':').map(Number);
  return { hour: h || 8, minute: m || 0 };
}
