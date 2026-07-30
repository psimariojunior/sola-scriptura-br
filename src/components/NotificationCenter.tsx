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
    if (!('Notification' in window)) return;
    const p = await Notification.requestPermission();
    setPermission(p);
    if (p === 'granted') {
      salvarSettings({ ...settings, enabled: true });
      agendarLembrete(settings);
    }
  }, [settings, salvarSettings]);

  const desativarNotificacoes = useCallback(() => {
    salvarSettings({ ...settings, enabled: false });
  }, [settings, salvarSettings]);

  const agendarLembrete = useCallback((s: NotificationSettings) => {
    if (!s.enabled || !('Notification' in window) || Notification.permission !== 'granted') return;

    const agora = new Date();
    const alvo = new Date();
    alvo.setHours(s.hora, s.minuto, 0, 0);
    if (alvo <= agora) alvo.setDate(alvo.getDate() + 1);

    const delay = alvo.getTime() - agora.getTime();

    setTimeout(() => {
      const versiculo = VERSICULOS_NOTIFICACAO[Math.floor(Math.random() * VERSICULOS_NOTIFICACAO.length)];

      if (s.versiculoMotivacional) {
        new Notification('📖 Versículo do Dia', {
          body: `${versiculo.ref}\n${versiculo.texto}`,
          icon: '/icon-192x192.png',
          badge: '/icon-192x192.png',
          tag: 'versiculo-dia',
        });
      }

      if (s.lembreteStreak && streak > 0) {
        setTimeout(() => {
          new Notification(`🔥 Streak de ${streak} dias!`, {
            body: `Não quebre sua sequência! Leia pelo menos 1 versículo hoje.`,
            icon: '/icon-192x192.png',
            tag: 'streak-lembrete',
          });
        }, 300000);
      }

      if (s.lembretePlano) {
        setTimeout(() => {
          new Notification('📚 Hora de ler!', {
            body: `Continue seu plano de leitura. Cada capítulo te aproxima da meta.`,
            icon: '/icon-192x192.png',
            tag: 'plano-lembrete',
          });
        }, 600000);
      }

      agendarLembrete(s);
    }, delay);
  }, [streak]);

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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}>
            <motion.div initial={{opacity:0,scale:0.95}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:0.95}}
              onClick={e => e.stopPropagation()}
              className="w-full max-w-md rounded-2xl border border-border bg-card shadow-2xl overflow-hidden">

              {/* Header */}
              <div className="p-5 border-b border-border/50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-primary" />
                  <h2 className="font-display text-lg font-medium">Notificações</h2>
                </div>
                <button onClick={() => setIsOpen(false)} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-muted/50">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-5 space-y-5">
                {/* Toggle principal */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Lembretes Diários</p>
                    <p className="text-xs text-muted-foreground">Receba versículos e lembretes</p>
                  </div>
                  <button onClick={settings.enabled ? desativarNotificacoes : ativarNotificacoes}
                    className={cn('w-12 h-7 rounded-full transition-colors relative',
                      settings.enabled ? 'bg-primary' : 'bg-muted')}>
                    <motion.div className="w-5 h-5 rounded-full bg-white shadow absolute top-1"
                      animate={{ left: settings.enabled ? 26 : 4 }} transition={{ type: 'spring', stiffness: 500, damping: 30 }} />
                  </button>
                </div>

                {settings.enabled && (
                  <>
                    {/* Horário */}
                    <div>
                      <p className="text-sm font-medium mb-2 flex items-center gap-1"><Clock className="w-4 h-4" /> Horário do lembrete</p>
                      <div className="flex gap-2">
                        <select value={settings.hora} onChange={e => salvarSettings({ ...settings, hora: Number(e.target.value) })}
                          className="flex-1 rounded-xl border border-border bg-card px-3 py-2 text-sm">
                          {Array.from({length:24},(_,i)=>(<option key={i} value={i}>{String(i).padStart(2,'0')}</option>))}
                        </select>
                        <span className="text-muted-foreground self-center">:</span>
                        <select value={settings.minuto} onChange={e => salvarSettings({ ...settings, minuto: Number(e.target.value) })}
                          className="flex-1 rounded-xl border border-border bg-card px-3 py-2 text-sm">
                          {[0,15,30,45].map(m=>(<option key={m} value={m}>{String(m).padStart(2,'0')}</option>))}
                        </select>
                      </div>
                    </div>

                    {/* Tipos de notificação */}
                    <div className="space-y-3">
                      <p className="text-sm font-medium">Tipos de Lembrete</p>

                      <label className="flex items-center gap-3 p-3 rounded-xl border border-border/50 bg-card/50 cursor-pointer">
                        <input type="checkbox" checked={settings.versiculoMotivacional}
                          onChange={e => salvarSettings({...settings, versiculoMotivacional: e.target.checked})}
                          className="w-4 h-4 rounded border-border text-primary focus:ring-primary" />
                        <Sparkles className="w-4 h-4 text-amber-500" />
                        <div><p className="text-sm font-medium">Versículo Motivacional</p>
                          <p className="text-[11px] text-muted-foreground">Um versículo diferente todo dia</p></div>
                      </label>

                      <label className="flex items-center gap-3 p-3 rounded-xl border border-border/50 bg-card/50 cursor-pointer">
                        <input type="checkbox" checked={settings.lembreteStreak}
                          onChange={e => salvarSettings({...settings, lembreteStreak: e.target.checked})}
                          className="w-4 h-4 rounded border-border text-primary focus:ring-primary" />
                        <Flame className="w-4 h-4 text-orange-500" />
                        <div><p className="text-sm font-medium">Lembrete de Streak</p>
                          <p className="text-[11px] text-muted-foreground">Mantenha sua sequência de leitura</p></div>
                      </label>

                      <label className="flex items-center gap-3 p-3 rounded-xl border border-border/50 bg-card/50 cursor-pointer">
                        <input type="checkbox" checked={settings.lembretePlano}
                          onChange={e => salvarSettings({...settings, lembretePlano: e.target.checked})}
                          className="w-4 h-4 rounded border-border text-primary focus:ring-primary" />
                        <BookOpen className="w-4 h-4 text-blue-500" />
                        <div><p className="text-sm font-medium">Plano de Leitura</p>
                          <p className="text-[11px] text-muted-foreground">Continue seu plano diário</p></div>
                      </label>
                    </div>

                    {/* Preview */}
                    <div className="rounded-xl bg-muted/30 p-3">
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-2">Prévia da notificação</p>
                      <div className="flex items-start gap-2">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <BookOpen className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-xs font-medium">📖 Versículo do Dia</p>
                          <p className="text-[11px] text-muted-foreground">{VERSICULOS_NOTIFICACAO[0].ref} — {VERSICULOS_NOTIFICACAO[0].texto.slice(0, 40)}...</p>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {permission === 'denied' && (
                  <p className="text-xs text-amber-500 bg-amber-500/10 p-3 rounded-xl">
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
