'use client';

const STORAGE_KEY = 'ssb_notifications';

export function isNotificationsEnabled(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(STORAGE_KEY) === 'true';
}

export function setNotificationsEnabled(enabled: boolean): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, String(enabled));
}

export async function requestNotificationPermission(): Promise<boolean> {
  if (typeof window === 'undefined' || !('Notification' in window)) return false;

  if (Notification.permission === 'granted') {
    setNotificationsEnabled(true);
    return true;
  }

  if (Notification.permission === 'denied') {
    setNotificationsEnabled(false);
    return false;
  }

  const permission = await Notification.requestPermission();
  const granted = permission === 'granted';
  setNotificationsEnabled(granted);
  return granted;
}

export function sendNotification(title: string, body: string): void {
  if (typeof window === 'undefined' || !('Notification' in window)) return;
  if (Notification.permission !== 'granted') return;

  new Notification(title, {
    body,
    icon: '/favicon.ico',
    badge: '/favicon.ico',
  });
}

export function scheduleDailyNotification(hour: number, minute: number): () => void {
  if (typeof window === 'undefined') return () => {};

  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  function scheduleNext() {
    const now = new Date();
    const target = new Date();
    target.setHours(hour, minute, 0, 0);

    if (target.getTime() <= now.getTime()) {
      target.setDate(target.getDate() + 1);
    }

    const delay = target.getTime() - now.getTime();

    timeoutId = setTimeout(() => {
      sendNotification(
        'Sola Scriptura — Versículo do Dia',
        'Abra a plataforma para meditar no versículo de hoje!'
      );
      scheduleNext();
    }, delay);
  }

  scheduleNext();

  return () => {
    if (timeoutId !== null) clearTimeout(timeoutId);
  };
}
