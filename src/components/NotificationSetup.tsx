'use client';
import { useState, useEffect } from 'react';
import { Bell, BellOff } from 'lucide-react';

export function NotificationSetup() {
  const [enabled, setEnabled] = useState(false);
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    setSupported('Notification' in window && 'serviceWorker' in navigator);
    if ('Notification' in window) {
      setEnabled(Notification.permission === 'granted');
    }
  }, []);

  const toggle = async () => {
    if (enabled) {
      setEnabled(false);
      localStorage.removeItem('ssb_push_enabled');
      return;
    }
    const perm = await Notification.requestPermission();
    if (perm === 'granted') {
      setEnabled(true);
      localStorage.setItem('ssb_push_enabled', 'true');
    }
  };

  if (!supported) return null;

  return (
    <button onClick={toggle} title={enabled ? 'Notificações ativas' : 'Ativar notificações'}
      className="p-2 rounded-lg hover:bg-primary/10 transition-colors">
      {enabled ? <Bell className="w-5 h-5 text-primary" /> : <BellOff className="w-5 h-5 text-muted-foreground" />}
    </button>
  );
}
