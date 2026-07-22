'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { useEffect, useState, useCallback, createContext, useContext, ReactNode } from 'react';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType, duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export function useInAppToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useInAppToast must be used within ToastProvider');
  return ctx;
}

export function InAppToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType = 'info', duration = 3000) => {
    const id = Math.random().toString(36).slice(2);
    setToasts(prev => [...prev.slice(-4), { id, message, type, duration }]);
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-24 right-4 z-[100] flex flex-col gap-2 max-w-sm">
        <AnimatePresence>
          {toasts.map(toast => (
            <ToastItem key={toast.id} toast={toast} onDismiss={() => dismiss(toast.id)} />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

const icons = {
  success: Check,
  error: X,
  info: Info,
  warning: AlertTriangle,
};

const colors = {
  success: 'bg-emerald-500/90 border-emerald-400/50',
  error: 'bg-red-500/90 border-red-400/50',
  info: 'bg-blue-500/90 border-blue-400/50',
  warning: 'bg-amber-500/90 border-amber-400/50',
};

function ToastItem({ toast, onDismiss }: { toast: Toast; onDismiss: () => void }) {
  const Icon = icons[toast.type];

  useEffect(() => {
    const timer = setTimeout(onDismiss, toast.duration || 3000);
    return () => clearTimeout(timer);
  }, [toast.duration, onDismiss]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 100, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.95 }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`${colors[toast.type]} border backdrop-blur-xl rounded-xl p-3 shadow-xl flex items-center gap-3`}
    >
      <div className="flex-shrink-0">
        <Icon className="w-5 h-5 text-white" />
      </div>
      <p className="text-sm text-white flex-1">{toast.message}</p>
      <button
        onClick={onDismiss}
        className="flex-shrink-0 text-white/70 hover:text-white transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
}

export default InAppToastProvider;
