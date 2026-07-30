'use client';

import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Clock, Flame, BookOpen, Sparkles, Settings, X, RefreshCw, ChevronDown, ChevronUp } from 'lucide-react';
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
  { ref: 'Jo 3:16', texto: 'Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.' },
  { ref: 'Sl 23:1', texto: 'O Senhor é o meu pastor; nada me faltará.' },
  { ref: 'Fp 4:13', texto: 'Posso todas as coisas naquele que me fortalece.' },
  { ref: 'Is 41:10', texto: 'Não temas, porque eu sou contigo; não te assombres, porque eu sou teu Deus; eu te fortaleço, e te ajudo, e te sustento com a destra da minha justiça.' },
  { ref: 'Rm 8:28', texto: 'E sabemos que todas as coisas contribuem juntamente para o bem daqueles que amam a Deus, aos que são chamados segundo o seu propósito.' },
  { ref: 'Mt 11:28', texto: 'Vinde a mim, todos os que estais cansados e oprimidos, e eu vos aliviarei.' },
  { ref: 'Sl 46:10', texto: 'Aquietai-vos, e sabei que eu sou Deus; serei exaltado entre os gentios; serei exaltado sobre a terra.' },
  { ref: 'Hb 11:1', texto: 'Ora, a fé é o firme fundamento das coisas que se esperam, e a prova das coisas que se não veem.' },
  { ref: 'Ef 2:8', texto: 'Porque pela graça sois salvos, por meio da fé; e isto não vem de vós, é dom de Deus.' },
  { ref: '2 Tm 3:16', texto: 'Toda a Escritura é inspirada por Deus e proveitosa para ensinar, para redarguir, para corrigir, para instruir em justiça.' },
  { ref: 'Pv 3:5-6', texto: 'Confia no Senhor de todo o teu coração, e não te estribes no teu próprio entendimento. Reconhece-o em todos os teus caminhos, e ele endireitará as tuas veredas.' },
  { ref: 'Rm 12:2', texto: 'E não vos conformeis com este mundo, mas transformai-vos pela renovação do vosso entendimento.' },
  { ref: 'Mt 6:33', texto: 'Mas, buscai primeiro o reino de Deus, e a sua justiça, e todas estas coisas vos serão acrescentadas.' },
  { ref: 'Sl 119:105', texto: 'Lâmpada para os meus pés é tua palavra, e luz para o meu caminho.' },
  { ref: 'Jo 15:5', texto: 'Eu sou a vide, e vós as varas. Quem permanece em mim, e eu nele, esse dá muito fruto; porque sem mim nada podeis fazer.' },
  { ref: '1 Jo 4:19', texto: 'Nós o amamos a ele, porque ele nos amou primeiro.' },
  { ref: 'Ef 6:10', texto: 'No demais, irmãos meus, fortalecei-vos no Senhor e na força do seu poder.' },
  { ref: 'Hb 12:1', texto: 'Portanto, nós também, pois temos tal nuvem de testemunhas ao redor de nós, deixemos todo o peso e o pecado que nos assedia.' },
  { ref: 'Sl 91:1', texto: 'Aquele que habita no esconderijo do Altíssimo, à sombra do Onipotente descansará.' },
  { ref: 'Is 40:31', texto: 'Mas os que esperam no Senhor renovarão as forças, subirão com asas como águias.' },
];

function proximoVersiculo(): typeof VERSICULOS_NOTIFICACAO[0] {
  const idx = Math.floor(Math.random() * VERSICULOS_NOTIFICACAO.length);
  return VERSICULOS_NOTIFICACAO[idx];
}

const HORARIO_PRESETS = [
  { label: 'Manhã', hora: 7, minuto: 0, icon: '🌅' },
  { label: 'Almoço', hora: 12, minuto: 0, icon: '☀️' },
  { label: 'Tarde', hora: 15, minuto: 0, icon: '🌤️' },
  { label: 'Noite', hora: 20, minuto: 0, icon: '🌙' },
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
  const [previewVersiculo, setPreviewVersiculo] = useState(proximoVersiculo());
  const [showTimePicker, setShowTimePicker] = useState(false);

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
    setTimeout(() => { agendarLembrete(s); }, delay);
  }, []);

  useEffect(() => {
    if (settings.enabled) agendarLembrete(settings);
  }, [settings.enabled]);

  const aplicarPreset = useCallback((preset: typeof HORARIO_PRESETS[0]) => {
    const newSettings = { ...settings, hora: preset.hora, minuto: preset.minuto };
    salvarSettings(newSettings);
    if (typeof window !== 'undefined' && typeof (window as unknown as Record<string, unknown>).__SSB_NOTIFICATION === 'function') {
      (window as unknown as Record<string, (a: string, b: number, c: number) => void>).__SSB_NOTIFICATION(newSettings.enabled ? 'true' : 'false', newSettings.hora, newSettings.minuto);
    }
  }, [settings, salvarSettings]);

  return (
    <>
      <button onClick={() => setIsOpen(true)}
        className="relative w-10 h-10 rounded-xl border border-[var(--border)]/50 bg-[var(--surface-raised)]/50 flex items-center justify-center hover:bg-[var(--surface-sunken)]/50 transition-all">
        <Bell className="w-5 h-5 text-[var(--content-primary)]" />
        {settings.enabled && (
          <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[var(--brand-default)] border-2 border-[var(--surface-base)]" />
        )}
      </button>

      {typeof document !== 'undefined' && createPortal(
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
            className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center p-4 bg-black/60"
            onClick={() => setIsOpen(false)}>
            <motion.div initial={{opacity:0,scale:0.95}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:0.95}}
              onClick={e => e.stopPropagation()}
              className="w-full max-w-md rounded-2xl border border-[var(--border)] bg-[var(--surface-raised)] shadow-2xl overflow-hidden max-h-[85vh] overflow-y-auto">

              {/* Header */}
              <div className="p-5 border-b border-[var(--border)] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-[var(--brand-default)]" />
                  <h2 className="font-display text-lg font-medium text-[var(--content-primary)]">Notificações</h2>
                </div>
                <button onClick={() => setIsOpen(false)} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[var(--surface-sunken)]">
                  <X className="w-4 h-4 text-[var(--content-muted)]" />
                </button>
              </div>

              <div className="p-5 space-y-5">
                {/* Toggle principal */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-[var(--content-primary)]">Lembretes Diários</p>
                    <p className="text-xs text-[var(--content-muted)]">Receba versículos e lembretes</p>
                  </div>
                  <button onClick={settings.enabled ? desativarNotificacoes : ativarNotificacoes}
                    className={cn('w-12 h-7 rounded-full transition-colors relative',
                      settings.enabled ? 'bg-[var(--brand-default)]' : 'bg-[var(--surface-sunken)]')}>
                    <motion.div className="w-5 h-5 rounded-full bg-white shadow absolute top-1"
                      animate={{ left: settings.enabled ? 26 : 4 }} transition={{ type: 'spring', stiffness: 500, damping: 30 }} />
                  </button>
                </div>

                {settings.enabled && (
                  <>
                    {/* Horário com presets */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium flex items-center gap-1 text-[var(--content-primary)]">
                          <Clock className="w-4 h-4" /> Horário do lembrete
                        </p>
                        <button onClick={() => setShowTimePicker(!showTimePicker)}
                          className="text-[10px] text-[var(--brand-default)] flex items-center gap-0.5">
                          Personalizar
                          {showTimePicker ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                        </button>
                      </div>

                      {/* Presets */}
                      <div className="grid grid-cols-4 gap-2 mb-2">
                        {HORARIO_PRESETS.map(preset => (
                          <button key={preset.label} onClick={() => aplicarPreset(preset)}
                            className={cn(
                              'flex flex-col items-center gap-1 p-2 rounded-xl border text-center transition-all',
                              settings.hora === preset.hora && settings.minuto === preset.minuto
                                ? 'border-[var(--brand-default)] bg-[var(--brand-subtle)]'
                                : 'border-[var(--border)] bg-[var(--surface-raised)] hover:border-[var(--brand-default)]/30'
                            )}>
                            <span className="text-lg">{preset.icon}</span>
                            <span className="text-[10px] font-medium text-[var(--content-primary)]">{preset.label}</span>
                            <span className="text-[9px] text-[var(--content-muted)]">
                              {String(preset.hora).padStart(2,'0')}:{String(preset.minuto).padStart(2,'0')}
                            </span>
                          </button>
                        ))}
                      </div>

                      {/* Time picker customizado */}
                      {showTimePicker && (
                        <div className="flex gap-2 p-3 rounded-xl border border-[var(--border)] bg-[var(--surface-sunken)]">
                          <select value={settings.hora} onChange={e => {
                            const newSettings = { ...settings, hora: Number(e.target.value) };
                            salvarSettings(newSettings);
                            if (typeof window !== 'undefined' && typeof (window as unknown as Record<string, unknown>).__SSB_NOTIFICATION === 'function') {
                              (window as unknown as Record<string, (a: string, b: number, c: number) => void>).__SSB_NOTIFICATION(newSettings.enabled ? 'true' : 'false', newSettings.hora, newSettings.minuto);
                            }
                          }}
                            className="flex-1 rounded-lg border border-[var(--border)] bg-[var(--surface-raised)] px-3 py-2 text-sm text-[var(--content-primary)]">
                            {Array.from({length:24},(_,i)=>(<option key={i} value={i}>{String(i).padStart(2,'0')}</option>))}
                          </select>
                          <span className="text-[var(--content-muted)] self-center">:</span>
                          <select value={settings.minuto} onChange={e => {
                            const newSettings = { ...settings, minuto: Number(e.target.value) };
                            salvarSettings(newSettings);
                            if (typeof window !== 'undefined' && typeof (window as unknown as Record<string, unknown>).__SSB_NOTIFICATION === 'function') {
                              (window as unknown as Record<string, (a: string, b: number, c: number) => void>).__SSB_NOTIFICATION(newSettings.enabled ? 'true' : 'false', newSettings.hora, newSettings.minuto);
                            }
                          }}
                            className="flex-1 rounded-lg border border-[var(--border)] bg-[var(--surface-raised)] px-3 py-2 text-sm text-[var(--content-primary)]">
                            {[0,5,10,15,20,25,30,35,40,45,50,55].map(m=>(<option key={m} value={m}>{String(m).padStart(2,'0')}</option>))}
                          </select>
                        </div>
                      )}
                    </div>

                    {/* Tipos de notificação */}
                    <div className="space-y-3">
                      <p className="text-sm font-medium text-[var(--content-primary)]">Tipos de Lembrete</p>

                      <label className="flex items-center gap-3 p-3 rounded-xl border border-[var(--border)] bg-[var(--surface-sunken)]/50 cursor-pointer">
                        <input type="checkbox" checked={settings.versiculoMotivacional}
                          onChange={e => salvarSettings({...settings, versiculoMotivacional: e.target.checked})}
                          className="w-4 h-4 rounded border-[var(--border)] text-[var(--brand-default)] focus:ring-[var(--brand-default)]" />
                        <Sparkles className="w-4 h-4 text-[var(--brand-default)]" />
                        <div><p className="text-sm font-medium text-[var(--content-primary)]">Versículo Motivacional</p>
                          <p className="text-[11px] text-[var(--content-muted)]">Um versículo diferente todo dia</p></div>
                      </label>

                      <label className="flex items-center gap-3 p-3 rounded-xl border border-[var(--border)] bg-[var(--surface-sunken)]/50 cursor-pointer">
                        <input type="checkbox" checked={settings.lembreteStreak}
                          onChange={e => salvarSettings({...settings, lembreteStreak: e.target.checked})}
                          className="w-4 h-4 rounded border-[var(--border)] text-[var(--brand-default)] focus:ring-[var(--brand-default)]" />
                        <Flame className="w-4 h-4 text-orange-500" />
                        <div><p className="text-sm font-medium text-[var(--content-primary)]">Lembrete de Streak</p>
                          <p className="text-[11px] text-[var(--content-muted)]">Mantenha sua sequência de leitura</p></div>
                      </label>

                      <label className="flex items-center gap-3 p-3 rounded-xl border border-[var(--border)] bg-[var(--surface-sunken)]/50 cursor-pointer">
                        <input type="checkbox" checked={settings.lembretePlano}
                          onChange={e => salvarSettings({...settings, lembretePlano: e.target.checked})}
                          className="w-4 h-4 rounded border-[var(--border)] text-[var(--brand-default)] focus:ring-[var(--brand-default)]" />
                        <BookOpen className="w-4 h-4 text-blue-500" />
                        <div><p className="text-sm font-medium text-[var(--content-primary)]">Plano de Leitura</p>
                          <p className="text-[11px] text-[var(--content-muted)]">Continue seu plano diário</p></div>
                      </label>
                    </div>

                    {/* Preview com versículo aleatório */}
                    <div className="rounded-xl bg-[var(--surface-sunken)] p-3">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-[10px] text-[var(--content-muted)] uppercase tracking-wider">Prévia da notificação</p>
                        <button onClick={() => setPreviewVersiculo(proximoVersiculo())}
                          className="flex items-center gap-1 text-[10px] text-[var(--brand-default)] hover:underline">
                          <RefreshCw className="w-3 h-3" />
                          Outro
                        </button>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-8 h-8 rounded-lg bg-[var(--brand-subtle)] flex items-center justify-center shrink-0">
                          <BookOpen className="w-4 h-4 text-[var(--brand-default)]" />
                        </div>
                        <div>
                          <p className="text-xs font-medium text-[var(--content-primary)]">📖 Versículo do Dia</p>
                          <p className="text-[11px] text-[var(--content-muted)]">{previewVersiculo.ref}</p>
                          <p className="text-[11px] text-[var(--content-secondary)] mt-0.5 leading-relaxed">{previewVersiculo.texto.slice(0, 80)}...</p>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {permission === 'denied' && (
                  <p className="text-xs text-amber-600 bg-amber-50 dark:bg-amber-950 p-3 rounded-xl">
                    Notificações bloqueadas. Ative nas configurações do navegador.
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body
      )}
    </>
  );
}
