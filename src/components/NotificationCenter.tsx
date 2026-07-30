'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, BellOff, Clock, Flame, BookOpen, Sparkles, Check, Settings, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getSummary } from '@/lib/gamificationTracker';

interface NotificationSettings {
  enabled: boolean;
  hora: number;
  minuto: number;
  lembreteStreak: boolean;
  lembretePlano: boolean;
  versiculoMotivacional: boolean;
}

const VERSICULOS_NOTIFICACAO = [
  { ref: 'Jo 3:16', texto: 'Porque Deus amou o mundo de tal maneira...' },
  { ref: 'Sl 23:1', texto: 'O Senhor é o meu pastor; nada me faltará.' },
  { ref: 'Fp 4:13', texto: 'Posso todas as coisas naquele que me fortalece.' },
  { ref: 'Is 41:10', texto: 'Não temas, porque eu sou contigo.' },
  { ref: 'Rm 8:28', texto: 'Todas as coisas cooperam para o bem.' },
  { ref: 'Mt 11:28', texto: 'Vinde a mim, todos os que estais cansados.' },
  { ref: 'Sl 46:10', texto: 'Aquietai-vos e sabei que eu sou Deus.' },
  { ref: 'Hb 11:1', texto: 'A fé é o firme fundamento das coisas que se esperam.' },
  { ref: 'Ef 2:8', texto: 'Porque pela graça sois salvos, por meio da fé.' },
  { ref: '2 Tm 3:16', texto: 'Toda a Escritura é inspirada por Deus.' },
];

export function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<NotificationSettings>({
    enabled: false,
    hora: 7,
    minuto: 0,
    lembreteStreak: true,
    lembretePlano: true,
    versiculoMotivacional: true,
  });
  const [streak, setStreak] = useState(0);
  const [permission, setPermission] = useState<NotificationPermission>('default');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const saved = localStorage.getItem('ssb_push_smart');
    if (saved) setSettings(JSON.parse(saved));
    setStreak(getSummary().streakAtual);
    if ('Notification' in window) setPermission(Notification.permission);
  }, []);

  const salvarSettings = useCallback((s: NotificationSettings) => {
    setSettings(s);
    localStorage.setItem('ssb_push_smart', JSON.stringify(s));
  }, []);

  const ativarNotificacoes = useCallback(async () => {
    const newSettings = { ...settings, enabled: true };
    salvarSettings(newSettings);
    if (typeof window !== 'undefined' && typeof (window as unknown as Record<string, unknown>).__SSB_NOTIFICATION === 'function') {
      (window as unknown as Record<string, (a: string, b: number, c: number) => void>).__SSB_NOTIFICATION('true', newSettings.hora, newSettings.minuto);
    }
  }, [settings, salvarSettings]);

  const desativarNotificacoes = useCallback(() => {
    const newSettings = { ...settings, enabled: false };
    salvarSettings(newSettings);
    if (typeof window !== 'undefined' && typeof (window as unknown as Record<string, unknown>).__SSB_NOTIFICATION === 'function') {
      (window as unknown as Record<string, (a: string, b: number, c: number) => void>).__SSB_NOTIFICATION('false', 0, 0);
    }
  }, [settings, salvarSettings]);

  const agendarLembrete = useCallback((s: NotificationSettings) => {
    if (!s.enabled) return;

    const agora = new Date();
    const alvo = new Date();
    alvo.setHours(s.hora, s.minuto, 0, 0);
    if (alvo <= agora) alvo.setDate(alvo.getDate() + 1);

    const delay = alvo.getTime() - agora.getTime();

    setTimeout(() => {
      agendarLembrete(s);
    }, delay);
  }, []);

  useEffect(() => {
    if (settings.enabled) agendarLembrete(settings);
  }, [settings.enabled]);

  return (
    <>
      <button onClick={() => setIsOpen(true)}
        className="relative w-10 h-10 rounded-xl border border-border/50 bg-card/50 flex items-center justify-center hover:bg-muted/50 transition-all">
        <Bell className="w-5 h-5" />
        {settings.enabled && (
          <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-primary border-2 border-background" />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
            onClick={() => setIsOpen(false)}>
            <motion.div initial={{opacity:0,scale:0.95}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:0.95}}
              onClick={e => e.stopPropagation()}
              className="w-full max-w-md rounded-2xl border border-gray-200 dark:border-[#2a2724] bg-white dark:bg-[#161412] shadow-2xl overflow-hidden">

              {/* Header */}
              <div className="p-5 border-b border-gray-200 dark:border-gray-700/50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  <h2 className="font-display text-lg font-medium text-gray-900 dark:text-gray-100">Notificações</h2>
                </div>
                <button onClick={() => setIsOpen(false)} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800">
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              </div>

              <div className="p-5 space-y-5">
                {/* Toggle principal */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Lembretes Diários</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Receba versículos e lembretes</p>
                  </div>
                  <button onClick={settings.enabled ? desativarNotificacoes : ativarNotificacoes}
                    className={cn('w-12 h-7 rounded-full transition-colors relative',
                      settings.enabled ? 'bg-amber-600' : 'bg-gray-300 dark:bg-gray-600')}>
                    <motion.div className="w-5 h-5 rounded-full bg-white shadow absolute top-1"
                      animate={{ left: settings.enabled ? 26 : 4 }} transition={{ type: 'spring', stiffness: 500, damping: 30 }} />
                  </button>
                </div>

                {settings.enabled && (
                  <>
                    {/* Horário */}
                    <div>
                      <p className="text-sm font-medium mb-2 flex items-center gap-1 text-gray-900 dark:text-gray-100"><Clock className="w-4 h-4" /> Horário do lembrete</p>
                      <div className="flex gap-2">
                        <select value={settings.hora} onChange={e => {
                          const newSettings = { ...settings, hora: Number(e.target.value) };
                          salvarSettings(newSettings);
                          if (typeof window !== 'undefined' && typeof (window as unknown as Record<string, unknown>).__SSB_NOTIFICATION === 'function') {
                            (window as unknown as Record<string, (a: string, b: number, c: number) => void>).__SSB_NOTIFICATION(newSettings.enabled ? 'true' : 'false', newSettings.hora, newSettings.minuto);
                          }
                        }}
                          className="flex-1 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-gray-100">
                          {Array.from({length:24},(_,i)=>(<option key={i} value={i}>{String(i).padStart(2,'0')}</option>))}
                        </select>
                        <span className="text-gray-400 self-center">:</span>
                        <select value={settings.minuto} onChange={e => {
                          const newSettings = { ...settings, minuto: Number(e.target.value) };
                          salvarSettings(newSettings);
                          if (typeof window !== 'undefined' && typeof (window as unknown as Record<string, unknown>).__SSB_NOTIFICATION === 'function') {
                            (window as unknown as Record<string, (a: string, b: number, c: number) => void>).__SSB_NOTIFICATION(newSettings.enabled ? 'true' : 'false', newSettings.hora, newSettings.minuto);
                          }
                        }}
                          className="flex-1 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-gray-100">
                          {[0,15,30,45].map(m=>(<option key={m} value={m}>{String(m).padStart(2,'0')}</option>))}
                        </select>
                      </div>
                    </div>

                    {/* Tipos de notificação */}
                    <div className="space-y-3">
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Tipos de Lembrete</p>

                      <label className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 cursor-pointer">
                        <input type="checkbox" checked={settings.versiculoMotivacional}
                          onChange={e => salvarSettings({...settings, versiculoMotivacional: e.target.checked})}
                          className="w-4 h-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500" />
                        <Sparkles className="w-4 h-4 text-amber-500" />
                        <div><p className="text-sm font-medium text-gray-900 dark:text-gray-100">Versículo Motivacional</p>
                          <p className="text-[11px] text-gray-500 dark:text-gray-400">Um versículo diferente todo dia</p></div>
                      </label>

                      <label className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 cursor-pointer">
                        <input type="checkbox" checked={settings.lembreteStreak}
                          onChange={e => salvarSettings({...settings, lembreteStreak: e.target.checked})}
                          className="w-4 h-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500" />
                        <Flame className="w-4 h-4 text-orange-500" />
                        <div><p className="text-sm font-medium text-gray-900 dark:text-gray-100">Lembrete de Streak</p>
                          <p className="text-[11px] text-gray-500 dark:text-gray-400">Mantenha sua sequência de leitura</p></div>
                      </label>

                      <label className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 cursor-pointer">
                        <input type="checkbox" checked={settings.lembretePlano}
                          onChange={e => salvarSettings({...settings, lembretePlano: e.target.checked})}
                          className="w-4 h-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500" />
                        <BookOpen className="w-4 h-4 text-blue-500" />
                        <div><p className="text-sm font-medium text-gray-900 dark:text-gray-100">Plano de Leitura</p>
                          <p className="text-[11px] text-gray-500 dark:text-gray-400">Continue seu plano diário</p></div>
                      </label>
                    </div>

                    {/* Preview */}
                    <div className="rounded-xl bg-gray-100 dark:bg-gray-800 p-3">
                      <p className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Prévia da notificação</p>
                      <div className="flex items-start gap-2">
                        <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center shrink-0">
                          <BookOpen className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                        </div>
                        <div>
                          <p className="text-xs font-medium text-gray-900 dark:text-gray-100">📖 Versículo do Dia</p>
                          <p className="text-[11px] text-gray-500 dark:text-gray-400">{VERSICULOS_NOTIFICACAO[0].ref} — {VERSICULOS_NOTIFICACAO[0].texto.slice(0, 40)}...</p>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {permission === 'denied' && (
                  <p className="text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950 p-3 rounded-xl">
                    Notificações bloqueadas. Ative nas configurações do navegador.
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
