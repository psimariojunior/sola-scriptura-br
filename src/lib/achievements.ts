// Achievement/badge system for seminary progress
// Store in localStorage key: 'ssb_achievements'

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  progress: number;
  total: number;
}

const STORAGE_KEY = 'ssb_achievements';
const STREAK_KEY = 'ssb_study_streak';

const ACHIEVEMENT_DEFINITIONS: Omit<Achievement, 'unlockedAt' | 'progress'>[] = [
  { id: 'first_course_started', title: 'Primeiro Passo', description: 'Começou seu primeiro curso', icon: '🚀', total: 1 },
  { id: 'first_lesson_completed', title: 'Primeira Lição', description: 'Completou sua primeira lição', icon: '📖', total: 1 },
  { id: 'module_master', title: 'Mestre do Módulo', description: 'Completou um módulo inteiro', icon: '🏅', total: 1 },
  { id: 'course_graduate', title: 'Formado', description: 'Completou um curso inteiro (100%)', icon: '🎓', total: 1 },
  { id: 'streak_3', title: 'Fogo Aceso', description: '3 dias consecutivos estudando', icon: '🔥', total: 3 },
  { id: 'streak_7', title: 'Semana Perfeita', description: '7 dias consecutivos estudando', icon: '⚡', total: 7 },
  { id: 'streak_30', title: 'Disciplina Total', description: '30 dias consecutivos estudando', icon: '👑', total: 30 },
  { id: 'quiz_perfect', title: 'Gênio Bíblico', description: 'Acertou 100% em um quiz', icon: '🧠', total: 1 },
  { id: 'all_beginner', title: 'Fundamentos Sólidos', description: 'Completou todos os cursos iniciantes', icon: '🏗️', total: 3 },
  { id: 'fast_learner', title: 'Aprendiz Rápido', description: 'Completou 3 lições em um dia', icon: '💨', total: 3 },
  { id: 'night_owl', title: 'Coruja da Noite', description: 'Estudou após meia-noite', icon: '🦉', total: 1 },
  { id: 'early_bird', title: 'Madrugador', description: 'Estudou antes das 6h', icon: '🐦', total: 1 },
];

function loadAchievements(): Achievement[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveAchievements(achievements: Achievement[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(achievements));
  } catch {}
}

export function getAllAchievements(): Achievement[] {
  const stored = loadAchievements();
  return ACHIEVEMENT_DEFINITIONS.map((def) => {
    const existing = stored.find((a) => a.id === def.id);
    return { ...def, progress: existing?.progress ?? 0, unlockedAt: existing?.unlockedAt };
  });
}

function unlockAchievement(id: string): Achievement | null {
  const achievements = loadAchievements();
  const existing = achievements.find((a) => a.id === id);
  if (existing?.unlockedAt) return null;

  const def = ACHIEVEMENT_DEFINITIONS.find((d) => d.id === id);
  if (!def) return null;

  const updated: Achievement = {
    ...def,
    progress: def.total,
    unlockedAt: new Date().toISOString(),
  };

  const idx = achievements.findIndex((a) => a.id === id);
  if (idx >= 0) {
    achievements[idx] = updated;
  } else {
    achievements.push(updated);
  }
  saveAchievements(achievements);
  return updated;
}

function incrementProgress(id: string, amount: number): Achievement | null {
  const achievements = loadAchievements();
  const existing = achievements.find((a) => a.id === id);
  if (existing?.unlockedAt) return null;

  const def = ACHIEVEMENT_DEFINITIONS.find((d) => d.id === id);
  if (!def) return null;

  const newProgress = Math.min((existing?.progress ?? 0) + amount, def.total);
  const updated: Achievement = {
    ...def,
    progress: newProgress,
    unlockedAt: newProgress >= def.total ? new Date().toISOString() : undefined,
  };

  const idx = achievements.findIndex((a) => a.id === id);
  if (idx >= 0) {
    achievements[idx] = updated;
  } else {
    achievements.push(updated);
  }
  saveAchievements(achievements);
  return updated;
}

// --- Streak helpers ---

interface StreakData {
  lastStudyDate: string | null;
  streak: number;
}

function loadStreak(): StreakData {
  if (typeof window === 'undefined') return { lastStudyDate: null, streak: 0 };
  try {
    const raw = localStorage.getItem(STREAK_KEY);
    return raw ? JSON.parse(raw) : { lastStudyDate: null, streak: 0 };
  } catch {
    return { lastStudyDate: null, streak: 0 };
  }
}

function saveStreak(data: StreakData): void {
  try {
    localStorage.setItem(STREAK_KEY, JSON.stringify(data));
  } catch {}
}

export function getLastStudyDate(): string | null {
  return loadStreak().lastStudyDate;
}

export function getStreak(): number {
  return loadStreak().streak;
}

export function incrementStreak(): number {
  const today = new Date().toISOString().split('T')[0];
  const data = loadStreak();

  if (data.lastStudyDate === today) return data.streak;

  if (data.lastStudyDate) {
    const last = new Date(data.lastStudyDate);
    const now = new Date(today);
    const diff = Math.floor((now.getTime() - last.getTime()) / (1000 * 60 * 60 * 24));
    data.streak = diff === 1 ? data.streak + 1 : 1;
  } else {
    data.streak = 1;
  }

  data.lastStudyDate = today;
  saveStreak(data);
  return data.streak;
}

// --- Check and unlock achievements based on events ---

export function checkAndUnlock(event: {
  type: 'lesson_completed' | 'module_completed' | 'course_completed' | 'quiz_perfect'
    | 'courses_started' | 'lessons_today' | 'study_time' | 'beginner_courses';
  data?: Record<string, unknown>;
}): Achievement[] {
  const newlyUnlocked: Achievement[] = [];

  const tryUnlock = (id: string) => {
    const result = unlockAchievement(id);
    if (result) newlyUnlocked.push(result);
  };

  const tryIncrement = (id: string, amount: number) => {
    const result = incrementProgress(id, amount);
    if (result?.unlockedAt) newlyUnlocked.push(result);
  };

  switch (event.type) {
    case 'lesson_completed':
      tryUnlock('first_lesson_completed');
      tryIncrement('fast_learner', 1);
      break;

    case 'module_completed':
      tryUnlock('module_master');
      break;

    case 'course_completed':
      tryUnlock('course_graduate');
      break;

    case 'quiz_perfect':
      tryUnlock('quiz_perfect');
      break;

    case 'courses_started':
      tryUnlock('first_course_started');
      break;

    case 'lessons_today': {
      const count = (event.data?.count as number) || 0;
      if (count >= 3) tryUnlock('fast_learner');
      break;
    }

    case 'study_time': {
      const hour = new Date().getHours();
      if (hour >= 0 && hour < 5) tryUnlock('night_owl');
      if (hour >= 4 && hour < 6) tryUnlock('early_bird');
      break;
    }

    case 'beginner_courses': {
      const completed = (event.data?.completed as number) || 0;
      const total = (event.data?.total as number) || 3;
      tryIncrement('all_beginner', completed);
      if (completed >= total) tryUnlock('all_beginner');
      break;
    }
  }

  // Check streak achievements after every event
  const streak = incrementStreak();
  if (streak >= 3) tryUnlock('streak_3');
  if (streak >= 7) tryUnlock('streak_7');
  if (streak >= 30) tryUnlock('streak_30');

  return newlyUnlocked;
}
