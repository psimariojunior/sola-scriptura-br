'use client';

import { useState, useEffect, useCallback } from 'react';
import { Bell, BellOff, Clock, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { isPushSupported, isPushEnabled, enablePush, disablePush, requestNotificationPermission } from '@/lib/pushNotifications';

interface PlanReminderProps {
  planoId: string;
  planoTitulo: string;
  onEnabledChange?: (enabled: boolean) => void;
}

const REMINDER_KEY = 'ssb_plan_reminders';

interface PlanReminder {
  planoId: string;
  hora: number;
  minuto: number;
  ativo: boolean;
}

function getReminders(): Record<string, PlanReminder> {
  try {
    const raw = localStorage.getItem(REMINDER_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch { return {}; }
}

function saveReminder(reminder: PlanReminder) {
  const reminders = getReminders();
  reminders[reminder.planoId] = reminder;
  localStorage.setItem(REMINDER_KEY, JSON.stringify(reminders));
}

function removeReminder(planoId: string) {
  const reminders = getReminders();
  delete reminders[planoId];
  localStorage.setItem(REMINDER_KEY, JSON.stringify(reminders));
}

export function PlanReminderButton({ planoId, planoTitulo, onEnabledChange }: PlanReminderProps) {
  const [reminderActive, setReminderActive] = useState(false);
  const [hora, setHora] = useState(7);
  const [minuto, setMinuto] = useState(0);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [permission, setPermission] = useState<NotificationPermission>('default');

  useEffect(() => {
    const reminders = getReminders();
    const r = reminders[planoId];
    if (r) {
      setReminderActive(r.ativo);
      setHora(r.hora);
      setMinuto(r.minuto);
    }
    if (typeof window !== 'undefined' && 'Notification' in window) {
      setPermission(Notification.permission);
    }
  }, [planoId]);

  const schedulePlanReminder = useCallback(async (h: number, m: number) => {
    if (!isPushSupported()) return;

    const perm = await requestNotificationPermission();
    setPermission(perm);
    if (perm !== 'granted') return;

    // Schedule daily reminder for the plan
    const now = new Date();
    const target = new Date();
    target.setHours(h, m, 0, 0);
    if (target.getTime() <= now.getTime()) target.setDate(target.getDate() + 1);
    const delay = target.getTime() - now.getTime();

    const scheduleNext = () => {
      setTimeout(async () => {
        // Show notification
        if ('serviceWorker' in navigator) {
          const reg = await navigator.serviceWorker.ready;
          try {
            await reg.showNotification(`📖 ${planoTitulo}`, {
              body: `Hora de continuar seu plano de leitura! Toque para abrir.`,
              tag: `ssb-plan-${planoId}`,
              icon: '/icon-192.png',
              badge: '/icon-192.png',
              data: { url: '/planos' },
              actions: [
                { action: 'open-plan', title: 'Abrir Plano' },
                { action: 'dismiss', title: 'Depois' },
              ],
              vibrate: [200, 100, 200],
            } as NotificationOptions);
          } catch {}
        }
        // Schedule next day
        scheduleNext();
      }, 86400000); // 24 hours
    };

    setTimeout(() => {
      scheduleNext();
    }, delay);

    // Also enable daily verse push
    await enablePush(h, m);
  }, [planoId, planoTitulo]);

  const toggleReminder = useCallback(async () => {
    if (reminderActive) {
      setReminderActive(false);
      removeReminder(planoId);
      onEnabledChange?.(false);
    } else {
      setReminderActive(true);
      saveReminder({ planoId, hora, minuto, ativo: true });
      await schedulePlanReminder(hora, minuto);
      onEnabledChange?.(true);
    }
  }, [reminderActive, planoId, hora, minuto, schedulePlanReminder, onEnabledChange]);

  const updateTime = useCallback(async (h: number, m: number) => {
    setHora(h);
    setMinuto(m);
    if (reminderActive) {
      saveReminder({ planoId, hora: h, minuto: m, ativo: true });
      await schedulePlanReminder(h, m);
    }
    setShowTimePicker(false);
  }, [reminderActive, planoId, schedulePlanReminder]);

  if (!isPushSupported()) return null;

  return (
    <div className="space-y-2">
      <button onClick={toggleReminder}
        className={cn('flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all w-full',
          reminderActive ? 'bg-green-500/10 text-green-600 border border-green-500/30' : 'border border-border text-muted-foreground hover:bg-muted/50')}>
        {reminderActive ? <Bell className="w-3.5 h-3.5" /> : <BellOff className="w-3.5 h-3.5" />}
        {reminderActive ? `Lembrete ativo (${String(hora).padStart(2, '0')}:${String(minuto).padStart(2, '0')})` : 'Ativar lembrete diário'}
      </button>

      {reminderActive && (
        <button onClick={() => setShowTimePicker(!showTimePicker)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] text-muted-foreground hover:bg-muted/50 w-full">
          <Clock className="w-3 h-3" /> Alterar horário
        </button>
      )}

      {showTimePicker && (
        <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/50">
          <select value={hora} onChange={e => updateTime(parseInt(e.target.value), minuto)}
            className="px-2 py-1 text-sm bg-background border border-border rounded-lg">
            {Array.from({ length: 24 }, (_, i) => (
              <option key={i} value={i}>{String(i).padStart(2, '0')}</option>
            ))}
          </select>
          <span className="text-sm">:</span>
          <select value={minuto} onChange={e => updateTime(hora, parseInt(e.target.value))}
            className="px-2 py-1 text-sm bg-background border border-border rounded-lg">
            {[0, 15, 30, 45].map(m => (
              <option key={m} value={m}>{String(m).padStart(2, '0')}</option>
            ))}
          </select>
          <Check className="w-4 h-4 text-green-500" />
        </div>
      )}

      {permission === 'denied' && (
        <p className="text-[10px] text-red-500">Notificações bloqueadas pelo navegador</p>
      )}
    </div>
  );
}
