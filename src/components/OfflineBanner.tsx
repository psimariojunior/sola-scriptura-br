'use client';

import { useState, useEffect } from 'react';
import { WifiOff } from 'lucide-react';
import { isOnline, onStatusChange } from '@/lib/offline';

export default function OfflineBanner() {
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    setOffline(!isOnline());
    return onStatusChange((online) => setOffline(!online));
  }, []);

  if (!offline) return null;

  return (
    <div className="fixed top-16 left-0 right-0 z-50 flex items-center justify-center gap-2 bg-amber-500/90 text-white px-4 py-2 text-sm font-medium shadow-lg backdrop-blur-sm">
      <WifiOff className="w-4 h-4" />
      <span>Você está offline. Exibindo dados em cache.</span>
    </div>
  );
}
