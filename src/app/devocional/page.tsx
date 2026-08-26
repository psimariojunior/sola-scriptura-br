'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { PageShell } from '@/components/layout/PageShell';
import { devocionais, getDevocionalDoDia } from '@/data/devocional';
import {
  ChevronLeft,
  ChevronRight,
  Share2,
  BookOpen,
  Flame,
  Bell,
  BellOff,
  Calendar,
  CheckCircle2,
  TrendingUp,
  Image as ImageIcon,
  X,
} from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import ScrollReveal from '@/components/ScrollReveal';

const STORAGE_KEY_READ = 'ssb_devocional_read';
const STORAGE_KEY_REMINDER = 'ssb_devocional_reminder';

function getReadMap(): Record<string, boolean> {
  if (typeof window === 'undefined') return {};
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY_READ) || '{}');
  } catch {
    return {};
  }
}

function markRead(dateStr: string) {
  const map = getReadMap();
  map[dateStr] = true;
  localStorage.setItem(STORAGE_KEY_READ, JSON.stringify(map));
}

function getStreak(readMap: Record<string, boolean>): number {
  const today = new Date();
  let streak = 0;
  for (let i = 0; i < 365; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    if (readMap[key]) {
      streak++;
    } else {
      break;
    }
  }
  return streak;
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

const MONTH_NAMES = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
];
const DAY_LABELS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

export default function DevocionalPage() {
  const { t } = useTranslation();
  const hoje = Math.floor((new Date().getTime() - new Date(new Date().getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  const [diaAtual, setDiaAtual] = useState(hoje);
  const [readMap, setReadMap] = useState<Record<string, boolean>>({});
  const [reminderEnabled, setReminderEnabled] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState(new Date().getMonth());
  const [calendarYear, setCalendarYear] = useState(new Date().getFullYear());

  const devocional = getDevocionalDoDia(diaAtual);
  const streak = useMemo(() => getStreak(readMap), [readMap]);
  const todayDateStr = useMemo(() => new Date().toISOString().slice(0, 10), []);

  useEffect(() => {
    setReadMap(getReadMap());
    setReminderEnabled(localStorage.getItem(STORAGE_KEY_REMINDER) === 'true');
  }, []);

  const markTodayRead = useCallback(() => {
    markRead(todayDateStr);
    setReadMap(getReadMap());
  }, [todayDateStr]);

  useEffect(() => {
    markTodayRead();
  }, [markTodayRead]);

  const handleReminderToggle = () => {
    const next = !reminderEnabled;
    setReminderEnabled(next);
    localStorage.setItem(STORAGE_KEY_REMINDER, String(next));
  };

  const devocionalDoDia = getDevocionalDoDia(hoje);

  const handleShare = async () => {
    const textoParaCompartilhar = `${devocional.titulo}\n\n${devocional.textoVersiculo} — ${devocional.versiculo}\n\n${devocional.reflexao}`;
    if (navigator.share) {
      await navigator.share({
        title: `${devocional.titulo} — Devocional`,
        text: textoParaCompartilhar,
      });
    } else {
      await navigator.clipboard.writeText(textoParaCompartilhar);
    }
  };

  const handleShareImage = async () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1080;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const grad = ctx.createLinearGradient(0, 0, 1080, 1080);
    grad.addColorStop(0, '#1a1714');
    grad.addColorStop(1, '#2a2420');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1080, 1080);

    ctx.strokeStyle = 'rgba(196, 164, 80, 0.15)';
    ctx.lineWidth = 1;
    for (let i = 0; i < 1080; i += 60) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, 1080);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(1080, i);
      ctx.stroke();
    }

    ctx.strokeStyle = 'rgba(196, 164, 80, 0.4)';
    ctx.lineWidth = 2;
    ctx.strokeRect(60, 60, 960, 960);
    ctx.strokeRect(70, 70, 940, 940);

    ctx.fillStyle = 'rgba(196, 164, 80, 0.6)';
    ctx.font = '16px serif';
    ctx.textAlign = 'center';
    ctx.fillText('✦', 540, 120);

    ctx.fillStyle = '#c4a450';
    ctx.font = 'bold 14px sans-serif';
    ctx.textAlign = 'center';
    ctx.letterSpacing = '4px';
    ctx.fillText('DEVOCIONAL DIÁRIO', 540, 160);

    ctx.fillStyle = 'rgba(196, 164, 80, 0.3)';
    ctx.beginPath();
    ctx.moveTo(400, 185);
    ctx.lineTo(680, 185);
    ctx.stroke();

    const today = new Date();
    const dateStr = today.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' }).toUpperCase();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.font = '13px sans-serif';
    ctx.fillText(dateStr, 540, 215);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 42px serif';
    const titleLines = wrapText(ctx, devocional.titulo, 800);
    let y = 290;
    titleLines.forEach((line) => {
      ctx.fillText(line, 540, y);
      y += 55;
    });

    ctx.fillStyle = 'rgba(196, 164, 80, 0.5)';
    ctx.beginPath();
    ctx.moveTo(390, y + 10);
    ctx.lineTo(690, y + 10);
    ctx.stroke();

    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
    ctx.font = 'italic 26px serif';
    const verseText = `"${devocional.textoVersiculo}"`;
    const verseLines = wrapText(ctx, verseText, 780);
    y += 60;
    verseLines.forEach((line) => {
      ctx.fillText(line, 540, y);
      y += 38;
    });

    ctx.fillStyle = '#c4a450';
    ctx.font = 'bold 20px sans-serif';
    y += 10;
    ctx.fillText(`— ${devocional.versiculo}`, 540, y);

    ctx.fillStyle = 'rgba(196, 164, 80, 0.6)';
    ctx.font = '16px serif';
    ctx.fillText('✦', 540, 900);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.font = '13px sans-serif';
    ctx.fillText('solascripturabr.com.br', 540, 940);

    const link = document.createElement('a');
    link.download = `devocional-${todayDateStr}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    setShowImageModal(false);
  };

  const readingStats = useMemo(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    let read = 0;
    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      if (readMap[dateStr]) read++;
    }
    return { read, total: daysInMonth };
  }, [readMap]);

  const calendarDays = useMemo(() => {
    const days = getDaysInMonth(calendarYear, calendarMonth);
    const firstDay = getFirstDayOfMonth(calendarYear, calendarMonth);
    const cells: (number | null)[] = [];
    for (let i = 0; i < firstDay; i++) cells.push(null);
    for (let d = 1; d <= days; d++) cells.push(d);
    return cells;
  }, [calendarYear, calendarMonth]);

  const isCurrentMonth = calendarMonth === new Date().getMonth() && calendarYear === new Date().getFullYear();
  const currentDay = new Date().getDate();

  return (
    <PageShell maxWidth="3xl">

          <ScrollReveal>
            <div className="text-center mb-10">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--muted-fg)] mb-2">
                Devocional Diário
              </p>
              <h1 className="text-h1 text-[var(--fg)]">
                {devocionalDoDia.titulo}
              </h1>
              <div className="ornament w-16 mx-auto mt-4" />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="flex items-center justify-center gap-6 mb-8">
              <div className="sola-card px-5 py-3 flex items-center gap-3">
                <Flame className="w-5 h-5 text-orange-400" />
                <div>
                  <p className="text-2xl font-bold text-[var(--fg)]">{streak}</p>
                  <p className="text-xs text-[var(--muted-fg)]">dias consecutivos</p>
                </div>
              </div>
              <div className="sola-card px-5 py-3 flex items-center gap-3">
                <TrendingUp className="w-5 h-5 text-[var(--primary)]" />
                <div>
                  <p className="text-2xl font-bold text-[var(--fg)]">{readingStats.read}<span className="text-sm font-normal text-[var(--muted-fg)]">/{readingStats.total}</span></p>
                  <p className="text-xs text-[var(--muted-fg)]">lidos este mês</p>
                </div>
              </div>
              <button
                onClick={handleReminderToggle}
                className="sola-card px-4 py-3 flex items-center gap-2 hover:bg-[var(--card-bg)] transition-colors"
                title={reminderEnabled ? 'Desativar lembrete' : 'Ativar lembrete diário'}
              >
                {reminderEnabled ? (
                  <Bell className="w-5 h-5 text-[var(--primary)]" />
                ) : (
                  <BellOff className="w-5 h-5 text-[var(--muted-fg)]" />
                )}
                <span className="text-xs text-[var(--muted-fg)]">{reminderEnabled ? 'Lembrete ativo' : 'Lembrete'}</span>
              </button>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="sola-card p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => {
                    if (calendarMonth === 0) {
                      setCalendarMonth(11);
                      setCalendarYear((y) => y - 1);
                    } else {
                      setCalendarMonth((m) => m - 1);
                    }
                  }}
                  className="p-1.5 rounded-lg hover:bg-[var(--card-bg)] transition-colors"
                >
                  <ChevronLeft className="w-4 h-4 text-[var(--muted-fg)]" />
                </button>
                <h3 className="text-sm font-semibold text-[var(--fg)]">
                  {MONTH_NAMES[calendarMonth]} {calendarYear}
                </h3>
                <button
                  onClick={() => {
                    if (calendarMonth === 11) {
                      setCalendarMonth(0);
                      setCalendarYear((y) => y + 1);
                    } else {
                      setCalendarMonth((m) => m + 1);
                    }
                  }}
                  className="p-1.5 rounded-lg hover:bg-[var(--card-bg)] transition-colors"
                >
                  <ChevronRight className="w-4 h-4 text-[var(--muted-fg)]" />
                </button>
              </div>

              <div className="grid grid-cols-7 gap-1 mb-2">
                {DAY_LABELS.map((d) => (
                  <div key={d} className="text-center text-[10px] font-semibold text-[var(--muted-fg)] py-1">
                    {d}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((day, i) => {
                  if (day === null) return <div key={`empty-${i}`} />;
                  const dateStr = `${calendarYear}-${String(calendarMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                  const isRead = readMap[dateStr];
                  const isToday = isCurrentMonth && day === currentDay;
                  const isFuture = isCurrentMonth && day > currentDay;

                  return (
                    <button
                      key={day}
                      onClick={() => {
                        const dayOfYear = Math.floor(
                          (new Date(calendarYear, calendarMonth, day).getTime() -
                            new Date(calendarYear, 0, 0).getTime()) /
                            (1000 * 60 * 60 * 24)
                        );
                        setDiaAtual(dayOfYear);
                      }}
                      className={`
                        relative aspect-square flex flex-col items-center justify-center rounded-lg text-sm transition-all duration-200
                        ${isToday ? 'bg-[var(--primary)] text-white font-bold ring-2 ring-[var(--primary)] ring-offset-1 ring-offset-[var(--bg)]' : ''}
                        ${isRead && !isToday ? 'bg-green-500/10 text-green-600 dark:text-green-400' : ''}
                        ${!isRead && !isToday && !isFuture ? 'text-[var(--fg)] hover:bg-[var(--card-bg)]' : ''}
                        ${isFuture ? 'text-[var(--muted-fg)]/40 cursor-default' : ''}
                      `}
                      disabled={isFuture}
                    >
                      <span className="leading-none">{day}</span>
                      {isRead && !isToday && (
                        <span className="absolute bottom-0.5 w-1.5 h-1.5 rounded-full bg-green-500" />
                      )}
                      {isToday && (
                        <span className="absolute bottom-0.5 w-1.5 h-1.5 rounded-full bg-white" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="relative sola-card p-8 md:p-10 mb-6 overflow-hidden">
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 text-xs font-bold tracking-wider uppercase bg-[var(--primary)] text-white rounded-full">
                  Hoje
                </span>
              </div>

              <div className="mb-6">
                <p className="text-xs font-semibold tracking-[0.15em] uppercase text-[var(--muted-fg)] mb-1">
                  Dia {devocional.dia} de {devocionais.length}
                </p>
                <h2 className="text-h2 text-[var(--fg)]">
                  {devocional.titulo}
                </h2>
              </div>

              <div className="mb-8">
                <p className="font-serif-body text-lg leading-relaxed text-[var(--fg)]/90 italic border-l-4 border-[var(--primary)] pl-4">
                  {devocional.textoVersiculo}
                </p>
                <p className="text-sm font-semibold text-[var(--primary)] mt-3">
                  — {devocional.versiculo}
                </p>
              </div>

              <div className="mb-8">
                <h3 className="text-sm font-semibold text-[var(--muted-fg)] uppercase tracking-wider mb-3">Reflexão</h3>
                <div className="text-[var(--fg)] leading-relaxed whitespace-pre-line">{devocional.reflexao}</div>
              </div>

              <div className="bg-[var(--bg)] rounded-xl p-6 mb-6">
                <h3 className="text-sm font-semibold text-[var(--muted-fg)] uppercase tracking-wider mb-3">Oração</h3>
                <p className="text-[var(--fg)] leading-relaxed italic">&ldquo;{devocional.oracao}&rdquo;</p>
              </div>

              <div className="flex items-center gap-3">
                <motion.button
                  onClick={() => setDiaAtual((p) => Math.max(1, p - 1))}
                  disabled={diaAtual <= 1}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-1.5 px-4 py-2 text-sm border border-[var(--border)] rounded-lg disabled:opacity-50 hover:bg-[var(--card-bg)] transition-all duration-300"
                >
                  <ChevronLeft className="w-4 h-4" /> Anterior
                </motion.button>

                <motion.button
                  onClick={handleShare}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-1.5 px-4 py-2 text-sm border border-[var(--border)] rounded-lg hover:bg-[var(--card-bg)] transition-all duration-300 text-[var(--primary)]"
                >
                  <Share2 className="w-4 h-4" /> Compartilhar
                </motion.button>

                <motion.button
                  onClick={() => setShowImageModal(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-1.5 px-4 py-2 text-sm border border-[var(--border)] rounded-lg hover:bg-[var(--card-bg)] transition-all duration-300 text-[var(--primary)]"
                >
                  <ImageIcon className="w-4 h-4" /> Imagem
                </motion.button>

                <motion.button
                  onClick={() => setDiaAtual((p) => Math.min(365, p + 1))}
                  disabled={diaAtual >= 365}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-1.5 px-4 py-2 text-sm border border-[var(--border)] rounded-lg disabled:opacity-50 hover:bg-[var(--card-bg)] transition-all duration-300 ml-auto"
                >
                  Próximo <ChevronRight className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.25}>
            <div className="sola-card p-6 mb-8">
              <h3 className="text-sm font-semibold text-[var(--muted-fg)] uppercase tracking-wider mb-4 flex items-center gap-2">
                <Calendar className="w-4 h-4" /> Histórico de Leitura
              </h3>
              <p className="text-sm text-[var(--fg)] mb-4">
                Você leu <span className="font-bold text-[var(--primary)]">{readingStats.read}</span> de {readingStats.total} devotionais este mês.
              </p>
              <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
                {Object.keys(readMap)
                  .filter((k) => readMap[k])
                  .sort()
                  .reverse()
                  .slice(0, 20)
                  .map((dateStr) => {
                    const d = new Date(dateStr + 'T12:00:00');
                    const dayOfYear = Math.floor(
                      (d.getTime() - new Date(d.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24)
                    );
                    const dev = getDevocionalDoDia(dayOfYear);
                    return (
                      <button
                        key={dateStr}
                        onClick={() => setDiaAtual(dayOfYear)}
                        className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-[var(--card-bg)] transition-colors text-left"
                      >
                        <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-[var(--fg)] truncate">{dev.titulo}</p>
                          <p className="text-xs text-[var(--muted-fg)]">
                            {d.toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' })} — {dev.versiculo}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                {Object.keys(readMap).filter((k) => readMap[k]).length === 0 && (
                  <p className="text-sm text-[var(--muted-fg)] text-center py-4">
                    Nenhum devocional lido ainda. Comece hoje!
                  </p>
                )}
              </div>
            </div>
          </ScrollReveal>

      <AnimatePresence>
        {showImageModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => setShowImageModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="sola-card p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-[var(--fg)]">Compartilhar como Imagem</h3>
                <button onClick={() => setShowImageModal(false)} className="p-1 rounded-lg hover:bg-[var(--card-bg)]">
                  <X className="w-5 h-5 text-[var(--muted-fg)]" />
                </button>
              </div>
              <div className="bg-[#1a1714] rounded-xl p-6 mb-4 text-center">
                <p className="text-xs tracking-[0.2em] text-[#c4a450]/60 mb-2">DEVOCIONAL DIÁRIO</p>
                <h4 className="text-xl font-bold text-white mb-3">{devocional.titulo}</h4>
                <p className="text-sm italic text-white/80 mb-2">&ldquo;{devocional.textoVersiculo}&rdquo;</p>
                <p className="text-xs font-semibold text-[#c4a450]">— {devocional.versiculo}</p>
                <p className="text-[10px] text-white/30 mt-4">solascripturabr.com.br</p>
              </div>
              <motion.button
                onClick={handleShareImage}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 rounded-lg bg-[var(--primary)] text-white font-semibold text-sm flex items-center justify-center gap-2"
              >
                <ImageIcon className="w-4 h-4" /> Baixar Imagem
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageShell>
  );
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = '';
  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }
  if (currentLine) lines.push(currentLine);
  return lines;
}
