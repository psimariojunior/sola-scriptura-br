'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Palette,
  BookOpen,
  Bell,
  Globe,
  Database,
  User,
  Sun,
  Moon,
  Circle,
  Minus,
  Plus,
  ChevronRight,
  Download,
  Trash2,
  Wifi,
  Settings,
  Type,
} from 'lucide-react';
import { useTema } from '@/lib/temas';
import { useAuth } from '@/contexts/AuthContext';
import ScrollReveal from '@/components/ScrollReveal';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

const THEME_ICONS: Record<string, React.ReactNode> = {
  light: <Sun className="w-4 h-4" />,
  dim: <Moon className="w-4 h-4" />,
  escuro: <Moon className="w-4 h-4" />,
  sepia: <BookOpen className="w-4 h-4" />,
  noturno: <Circle className="w-4 h-4" />,
  auto: <Settings className="w-4 h-4" />,
};

const THEME_PREVIEWS: Record<string, string> = {
  light: 'bg-[#FAFAF7] border-[#E5E5E5]',
  dim: 'bg-[#1a1a2e] border-[#2a2a4a]',
  escuro: 'bg-[#0f0f0f] border-[#262626]',
  sepia: 'bg-[#f4ebd8] border-[#d4c5a0]',
  noturno: 'bg-[#000000] border-[#1a1a1a]',
  auto: 'bg-gradient-to-br from-[#FAFAF7] to-[#0f0f0f] border-[#666]',
};

const TRAD_LABELS: Record<string, string> = {
  arc: 'ARC', nvi: 'NVI', ara: 'ARA', acf: 'ACF', naa: 'NAA', ntlh: 'NTLH',
  nvt: 'NVT', kja: 'KJA', aa: 'AA', nbv: 'NBV', as21: 'AS21', jfaa: 'JFAA',
  kjf: 'KJF', msgpt: 'MSG', bpm: 'BPM', nva: 'NVA',
  kjv: 'KJV', web: 'WEB', esv: 'ESV', niv: 'NIV', nkjv: 'NKJV', nlt: 'NLT',
  rvr1960: 'RVR1960', lsg: 'LSG',
};

const TRAD_GROUPS = [
  { label: 'Português', ids: ['arc', 'nvi', 'ara', 'acf', 'naa', 'ntlh', 'nvt', 'kja', 'aa', 'nbv'] },
  { label: 'English', ids: ['kjv', 'web', 'esv', 'niv', 'nkjv', 'nlt'] },
];

function SettingCard({
  icon,
  title,
  description,
  children,
  delay = 0,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <ScrollReveal delay={delay} direction="up">
      <div className="sola-card rounded-xl p-5 sm:p-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
            <div className="text-primary">{icon}</div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="font-semibold text-[var(--content-primary)]">{title}</h3>
                <p className="text-sm text-[var(--content-muted)] mt-0.5">{description}</p>
              </div>
            </div>
            <div className="mt-4">{children}</div>
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}

function SliderControl({
  value,
  onChange,
  min,
  max,
  step = 1,
  unit = '',
  labels,
}: {
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  labels?: Record<number, string>;
}) {
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => onChange(Math.max(min, value - step))}
        className="w-8 h-8 rounded-lg border border-[var(--border)] flex items-center justify-center hover:bg-[var(--surface-sunken)] transition-colors"
        aria-label="Diminuir"
      >
        <Minus className="w-3.5 h-3.5" />
      </button>
      <div className="flex-1 relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="w-full h-2 rounded-full appearance-none cursor-pointer bg-[var(--surface-sunken)] accent-primary"
        />
        <div className="flex justify-between mt-1.5">
          {labels
            ? Object.entries(labels).map(([k, v]) => (
                <span key={k} className="text-[10px] text-[var(--content-muted)]">
                  {v}
                </span>
              ))
            : (
                <>
                  <span className="text-[10px] text-[var(--content-muted)]">{min}{unit}</span>
                  <span className="text-xs font-medium text-[var(--content-primary)]">{value}{unit}</span>
                  <span className="text-[10px] text-[var(--content-muted)]">{max}{unit}</span>
                </>
              )}
        </div>
      </div>
      <button
        onClick={() => onChange(Math.min(max, value + step))}
        className="w-8 h-8 rounded-lg border border-[var(--border)] flex items-center justify-center hover:bg-[var(--surface-sunken)] transition-colors"
        aria-label="Aumentar"
      >
        <Plus className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

export default function ConfiguracoesClient() {
  const { t, i18n } = useTranslation();
  const { tema, setTema, temasDisponiveis } = useTema();
  const { isAutenticado, usuario } = useAuth();

  const [fontSize, setFontSize] = useState(18);
  const [fontFamily, setFontFamily] = useState<'serif' | 'sans' | 'reading'>('serif');
  const [defaultTranslation, setDefaultTranslation] = useState('arc');
  const [viewMode, setViewMode] = useState<'single' | 'parallel' | 'interlinear'>('single');
  const [autoPlayAudio, setAutoPlayAudio] = useState(false);
  const [audioSpeed, setAudioSpeed] = useState(1.0);
  const [devocionalReminder, setDevocionalReminder] = useState(false);
  const [planoReminder, setPlanoReminder] = useState(false);
  const [streakReminder, setStreakReminder] = useState(false);
  const [idioma, setIdioma] = useState<'pt' | 'en'>('pt');

  useEffect(() => {
    try {
      const savedSize = localStorage.getItem('ssb_font_size');
      if (savedSize) setFontSize(parseInt(savedSize, 10));

      const savedFont = localStorage.getItem('ssb_font_family') as 'serif' | 'sans' | null;
      if (savedFont) setFontFamily(savedFont);

      const savedTrad = localStorage.getItem('ssb_default_translation');
      if (savedTrad) setDefaultTranslation(savedTrad);

      const savedView = localStorage.getItem('ssb_view_mode') as 'single' | 'parallel' | 'interlinear' | null;
      if (savedView) setViewMode(savedView);

      const savedAuto = localStorage.getItem('ssb_auto_play_audio');
      if (savedAuto !== null) setAutoPlayAudio(savedAuto === 'true');

      const savedSpeed = localStorage.getItem('ssb_audio_speed');
      if (savedSpeed) setAudioSpeed(parseFloat(savedSpeed));

      setDevocionalReminder(localStorage.getItem('ssb_push_devocional') === 'true');
      setPlanoReminder(localStorage.getItem('ssb_push_plano') === 'true');
      setStreakReminder(localStorage.getItem('ssb_push_streak') === 'true');

      const savedLang = localStorage.getItem('ssb_lang') as 'pt' | 'en' | null;
      if (savedLang) setIdioma(savedLang);
    } catch { console.debug('[ConfiguracoesClient]'); }
  }, []);

  const handleFontSize = useCallback((v: number) => {
    setFontSize(v);
    try { localStorage.setItem('ssb_font_size', String(v)); } catch { console.debug('[ConfiguracoesClient]'); }
  }, []);

  const handleFontFamily = useCallback((v: 'serif' | 'sans' | 'reading') => {
    setFontFamily(v);
    try { localStorage.setItem('ssb_font_family', v); } catch { console.debug('[ConfiguracoesClient]'); }
  }, []);

  const handleDefaultTranslation = useCallback((v: string) => {
    setDefaultTranslation(v);
    try { localStorage.setItem('ssb_default_translation', v); } catch { console.debug('[ConfiguracoesClient]'); }
  }, []);

  const handleViewMode = useCallback((v: 'single' | 'parallel' | 'interlinear') => {
    setViewMode(v);
    try { localStorage.setItem('ssb_view_mode', v); } catch { console.debug('[ConfiguracoesClient]'); }
  }, []);

  const handleAutoPlay = useCallback((v: boolean) => {
    setAutoPlayAudio(v);
    try { localStorage.setItem('ssb_auto_play_audio', String(v)); } catch { console.debug('[ConfiguracoesClient]'); }
  }, []);

  const handleAudioSpeed = useCallback((v: number) => {
    setAudioSpeed(v);
    try { localStorage.setItem('ssb_audio_speed', String(v)); } catch { console.debug('[ConfiguracoesClient]'); }
  }, []);

  const handleDevocional = useCallback((v: boolean) => {
    setDevocionalReminder(v);
    try { localStorage.setItem('ssb_push_devocional', String(v)); } catch { console.debug('[ConfiguracoesClient]'); }
  }, []);

  const handlePlano = useCallback((v: boolean) => {
    setPlanoReminder(v);
    try { localStorage.setItem('ssb_push_plano', String(v)); } catch { console.debug('[ConfiguracoesClient]'); }
  }, []);

  const handleStreak = useCallback((v: boolean) => {
    setStreakReminder(v);
    try { localStorage.setItem('ssb_push_streak', String(v)); } catch { console.debug('[ConfiguracoesClient]'); }
  }, []);

  const handleIdioma = useCallback((v: 'pt' | 'en') => {
    setIdioma(v);
    i18n.changeLanguage(v);
    try { localStorage.setItem('ssb_lang', v); } catch { console.debug('[ConfiguracoesClient]'); }
  }, [i18n]);

  const exportFavoritos = useCallback(() => {
    try {
      const raw = localStorage.getItem('ssb_favoritos') || '[]';
      const blob = new Blob([raw], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `sola-scriptura-favoritos-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } catch { console.debug('[ConfiguracoesClient]'); }
  }, []);

  const exportNotas = useCallback(() => {
    try {
      const raw = localStorage.getItem('ssb_notas_rich') || '[]';
      const blob = new Blob([raw], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `sola-scriptura-notas-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } catch { console.debug('[ConfiguracoesClient]'); }
  }, []);

  const clearLocalData = useCallback(() => {
    if (!window.confirm(t('configuracoes.dados.limparConfirm'))) return;
    const keys = [
      'ssb_favoritos', 'ssb_notas_rich', 'ssb_colecoes', 'ssb_flashcards',
      'ssb_gamificacao', 'ssb_reading_history', 'ssb_streak', 'ssb_best_streak',
      'ssb_chapters_read', 'ssb_last_read', 'ssb_recent_searches', 'ssb_planos_custom',
      'ssb_desafios_progress', 'ssb_desafios_completed', 'ssb_bib_leitura',
      'ssb_estudos', 'ssb_quiz_ranking', 'ssb_font_size', 'ssb_font_family',
      'ssb_line_spacing', 'ssb_accessibility',
    ];
    keys.forEach((k) => {
      try { localStorage.removeItem(k); } catch { console.debug('[ConfiguracoesClient]'); }
    });
    window.location.reload();
  }, [t]);

  return (
    <div className="max-w-2xl mx-auto">
      <ScrollReveal>
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Settings className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[var(--content-primary)]">
                {t('configuracoes.title')}
              </h1>
              <p className="text-sm text-[var(--content-muted)]">
                {t('configuracoes.description')}
              </p>
            </div>
          </div>
        </div>
      </ScrollReveal>

      <div className="space-y-4">
        {/* Aparência */}
        <SettingCard
          icon={<Palette className="w-5 h-5" />}
          title={t('configuracoes.appearance.title')}
          description={t('configuracoes.appearance.description')}
          delay={0.05}
        >
          <div className="space-y-5">
            <div>
              <label className="text-sm font-medium text-[var(--content-primary)] mb-2 block">
                {t('configuracoes.appearance.theme')}
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {temasDisponiveis.filter((t) => t.nome !== 'auto').map((temaItem) => (
                  <button
                    key={temaItem.nome}
                    onClick={() => setTema(temaItem.nome)}
                    className={cn(
                      'flex flex-col items-center gap-1.5 p-2.5 rounded-xl border-2 transition-all duration-200',
                      tema === temaItem.nome
                        ? 'border-primary bg-primary/5 shadow-sm'
                        : 'border-[var(--border)] hover:border-primary/40 hover:bg-[var(--surface-sunken)]'
                    )}
                  >
                    <div className={cn('w-8 h-8 rounded-lg border', THEME_PREVIEWS[temaItem.nome])} />
                    <span className="text-[11px] font-medium text-[var(--content-secondary)]">
                      {temaItem.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-[var(--content-primary)] mb-2 block">
                {t('configuracoes.appearance.fontSize')} — {fontSize}px
              </label>
              <SliderControl
                value={fontSize}
                onChange={handleFontSize}
                min={12}
                max={28}
                step={1}
                unit="px"
              />
              <div className="mt-3 p-3 rounded-lg bg-[var(--surface-sunken)] border border-[var(--border)]/50">
                <p
                  className="text-[var(--content-primary)] leading-relaxed"
                  style={{
                    fontSize: `${fontSize}px`,
                    fontFamily: fontFamily === 'serif'
                      ? "'Spectral', Georgia, serif"
                      : fontFamily === 'sans'
                      ? "'Inter', system-ui, sans-serif"
                      : "'Cormorant Garamond', Georgia, serif",
                  }}
                >
                  O Senhor é o meu pastor; nada me faltará.
                </p>
                <p className="text-[10px] text-[var(--content-muted)] mt-2">Salmo 23:1</p>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-[var(--content-primary)] mb-2 block">
                {t('configuracoes.appearance.fontFamily')}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {([
                  { id: 'serif' as const, label: t('configuracoes.appearance.serif'), preview: "'Spectral', Georgia, serif" },
                  { id: 'sans' as const, label: t('configuracoes.appearance.sans'), preview: "'Inter', system-ui, sans-serif" },
                  { id: 'reading' as const, label: t('configuracoes.appearance.reading'), preview: "'Cormorant Garamond', Georgia, serif" },
                ]).map((font) => (
                  <button
                    key={font.id}
                    onClick={() => handleFontFamily(font.id)}
                    className={cn(
                      'flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all duration-200',
                      fontFamily === font.id
                        ? 'border-primary bg-primary/5 shadow-sm'
                        : 'border-[var(--border)] hover:border-primary/40 hover:bg-[var(--surface-sunken)]'
                    )}
                  >
                    <span
                      className="text-lg text-[var(--content-primary)]"
                      style={{ fontFamily: font.preview }}
                    >
                      Aa
                    </span>
                    <span className="text-[11px] font-medium text-[var(--content-secondary)]">
                      {font.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </SettingCard>

        {/* Bíblia */}
        <SettingCard
          icon={<BookOpen className="w-5 h-5" />}
          title={t('configuracoes.bible.title')}
          description={t('configuracoes.bible.description')}
          delay={0.1}
        >
          <div className="space-y-5">
            <div>
              <label className="text-sm font-medium text-[var(--content-primary)] mb-2 block">
                {t('configuracoes.bible.defaultTranslation')}
              </label>
              <p className="text-xs text-[var(--content-muted)] mb-2">
                {t('configuracoes.bible.defaultTranslationDesc')}
              </p>
              <Select value={defaultTranslation} onValueChange={handleDefaultTranslation}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  {TRAD_GROUPS.map((grupo) => (
                    <div key={grupo.label}>
                      <div className="px-2 py-1.5 text-xs font-semibold text-[var(--content-muted)] uppercase tracking-wider">
                        {grupo.label}
                      </div>
                      {grupo.ids.map((id) => (
                        <SelectItem key={id} value={id}>
                          {TRAD_LABELS[id]} — {id.toUpperCase()}
                        </SelectItem>
                      ))}
                    </div>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-[var(--content-primary)] mb-2 block">
                {t('configuracoes.bible.viewMode')}
              </label>
              <p className="text-xs text-[var(--content-muted)] mb-2">
                {t('configuracoes.bible.viewModeDesc')}
              </p>
              <div className="grid grid-cols-3 gap-2">
                {([
                  { id: 'single' as const, label: t('configuracoes.bible.single'), icon: <BookOpen className="w-4 h-4" /> },
                  { id: 'parallel' as const, label: t('configuracoes.bible.parallel'), icon: <Database className="w-4 h-4" /> },
                  { id: 'interlinear' as const, label: t('configuracoes.bible.interlinear'), icon: <Type className="w-4 h-4" /> },
                ]).map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => handleViewMode(mode.id)}
                    className={cn(
                      'flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all duration-200',
                      viewMode === mode.id
                        ? 'border-primary bg-primary/5 shadow-sm'
                        : 'border-[var(--border)] hover:border-primary/40 hover:bg-[var(--surface-sunken)]'
                    )}
                  >
                    <div className={cn(
                      'transition-colors',
                      viewMode === mode.id ? 'text-primary' : 'text-[var(--content-muted)]'
                    )}>
                      {mode.icon}
                    </div>
                    <span className="text-[11px] font-medium text-[var(--content-secondary)]">
                      {mode.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[var(--content-primary)]">
                  {t('configuracoes.bible.autoPlayAudio')}
                </p>
              </div>
              <Switch
                checked={autoPlayAudio}
                onCheckedChange={handleAutoPlay}
              />
            </div>

            {autoPlayAudio && (
              <div>
                <label className="text-sm font-medium text-[var(--content-primary)] mb-2 block">
                  {t('configuracoes.bible.audioSpeed')} — {audioSpeed.toFixed(1)}x
                </label>
                <SliderControl
                  value={audioSpeed}
                  onChange={handleAudioSpeed}
                  min={0.5}
                  max={2.0}
                  step={0.1}
                  unit="x"
                />
              </div>
            )}
          </div>
        </SettingCard>

        {/* Notificações */}
        <SettingCard
          icon={<Bell className="w-5 h-5" />}
          title={t('configuracoes.notifications.title')}
          description={t('configuracoes.notifications.description')}
          delay={0.15}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[var(--content-primary)]">
                  {t('configuracoes.notifications.devocionalReminder')}
                </p>
                <p className="text-xs text-[var(--content-muted)]">
                  {t('configuracoes.notifications.devocionalReminderDesc')}
                </p>
              </div>
              <Switch
                checked={devocionalReminder}
                onCheckedChange={handleDevocional}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[var(--content-primary)]">
                  {t('configuracoes.notifications.planoReminder')}
                </p>
                <p className="text-xs text-[var(--content-muted)]">
                  {t('configuracoes.notifications.planoReminderDesc')}
                </p>
              </div>
              <Switch
                checked={planoReminder}
                onCheckedChange={handlePlano}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[var(--content-primary)]">
                  {t('configuracoes.notifications.streakReminder')}
                </p>
                <p className="text-xs text-[var(--content-muted)]">
                  {t('configuracoes.notifications.streakReminderDesc')}
                </p>
              </div>
              <Switch
                checked={streakReminder}
                onCheckedChange={handleStreak}
              />
            </div>
          </div>
        </SettingCard>

        {/* Idioma */}
        <SettingCard
          icon={<Globe className="w-5 h-5" />}
          title={t('configuracoes.idioma.title')}
          description={t('configuracoes.idioma.description')}
          delay={0.2}
        >
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleIdioma('pt')}
              className={cn(
                'flex items-center gap-3 p-3 rounded-xl border-2 transition-all duration-200',
                idioma === 'pt'
                  ? 'border-primary bg-primary/5 shadow-sm'
                  : 'border-[var(--border)] hover:border-primary/40 hover:bg-[var(--surface-sunken)]'
              )}
            >
              <span className="text-2xl">🇧🇷</span>
              <span className="text-sm font-medium text-[var(--content-primary)]">
                {t('configuracoes.idioma.portuguese')}
              </span>
            </button>
            <button
              onClick={() => handleIdioma('en')}
              className={cn(
                'flex items-center gap-3 p-3 rounded-xl border-2 transition-all duration-200',
                idioma === 'en'
                  ? 'border-primary bg-primary/5 shadow-sm'
                  : 'border-[var(--border)] hover:border-primary/40 hover:bg-[var(--surface-sunken)]'
              )}
            >
              <span className="text-2xl">🇺🇸</span>
              <span className="text-sm font-medium text-[var(--content-primary)]">
                {t('configuracoes.idioma.english')}
              </span>
            </button>
          </div>
        </SettingCard>

        {/* Dados */}
        <SettingCard
          icon={<Database className="w-5 h-5" />}
          title={t('configuracoes.dados.title')}
          description={t('configuracoes.dados.description')}
          delay={0.25}
        >
          <div className="space-y-3">
            <button
              onClick={exportFavoritos}
              className="w-full flex items-center gap-3 p-3 rounded-xl border border-[var(--border)] hover:bg-[var(--surface-sunken)] transition-all duration-200 text-left group"
            >
              <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                <Download className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[var(--content-primary)]">
                  {t('configuracoes.dados.exportarFavoritos')}
                </p>
                <p className="text-xs text-[var(--content-muted)]">
                  {t('configuracoes.dados.exportarFavoritosDesc')}
                </p>
              </div>
              <ChevronRight className="w-4 h-4 text-[var(--content-muted)] group-hover:translate-x-0.5 transition-transform" />
            </button>

            <button
              onClick={exportNotas}
              className="w-full flex items-center gap-3 p-3 rounded-xl border border-[var(--border)] hover:bg-[var(--surface-sunken)] transition-all duration-200 text-left group"
            >
              <div className="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                <Download className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[var(--content-primary)]">
                  {t('configuracoes.dados.exportarNotas')}
                </p>
                <p className="text-xs text-[var(--content-muted)]">
                  {t('configuracoes.dados.exportarNotasDesc')}
                </p>
              </div>
              <ChevronRight className="w-4 h-4 text-[var(--content-muted)] group-hover:translate-x-0.5 transition-transform" />
            </button>

            <button
              onClick={clearLocalData}
              className="w-full flex items-center gap-3 p-3 rounded-xl border border-destructive/30 hover:bg-destructive/5 transition-all duration-200 text-left group"
            >
              <div className="w-9 h-9 rounded-lg bg-destructive/10 flex items-center justify-center flex-shrink-0">
                <Trash2 className="w-4 h-4 text-destructive" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-destructive">
                  {t('configuracoes.dados.limparDados')}
                </p>
                <p className="text-xs text-[var(--content-muted)]">
                  {t('configuracoes.dados.limparDadosDesc')}
                </p>
              </div>
              <ChevronRight className="w-4 h-4 text-destructive/50 group-hover:translate-x-0.5 transition-transform" />
            </button>

            <div className="p-3 rounded-xl border border-[var(--border)] bg-[var(--surface-sunken)]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Wifi className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[var(--content-primary)]">
                    {t('configuracoes.dados.offlineTranslations')}
                  </p>
                  <p className="text-xs text-[var(--content-muted)]">
                    {t('configuracoes.dados.offlineTranslationsDesc')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </SettingCard>

        {/* Conta */}
        <SettingCard
          icon={<User className="w-5 h-5" />}
          title={t('configuracoes.conta.title')}
          description={t('configuracoes.conta.description')}
          delay={0.3}
        >
          {isAutenticado ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-bold text-primary">
                    {usuario?.nome?.charAt(0)?.toUpperCase() || 'U'}
                  </span>
                </div>
                <div>
                  <p className="text-xs text-[var(--content-muted)]">
                    {t('configuracoes.conta.loggedIn')}
                  </p>
                  <p className="text-sm font-medium text-[var(--content-primary)]">
                    {usuario?.nome || usuario?.email}
                  </p>
                </div>
              </div>
              <a
                href="/conta"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                {t('configuracoes.conta.irParaConta')}
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <p className="text-sm text-[var(--content-muted)]">
                {t('configuracoes.conta.fazerLoginDesc')}
              </p>
              <a
                href="/auth"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
                {t('configuracoes.conta.fazerLogin')}
              </a>
            </div>
          )}
        </SettingCard>
      </div>
    </div>
  );
}
