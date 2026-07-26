const TRACKER_KEY = 'ssb_gamification_tracker';

export interface GamificationEvent {
  tipo: 'versiculo_lido' | 'capitulo_lido' | 'quiz_completo' | 'estudo_feito' | 'favorito' | 'anotacao' | 'compartilhou' | 'sala_colaborativa' | 'exegese' | 'concordancia' | 'harmonia' | 'atlas' | 'cronologia' | 'palavra_estudada' | 'referencia_seguida' | 'comentario_lido' | 'flashcard_revisado' | 'plano_lido';
  quantidade: number;
  timestamp: number;
  dados?: Record<string, unknown>;
}

export interface GamificationSummary {
  totalVersiculos: number;
  totalCapitulos: number;
  totalQuizzes: number;
  totalEstudos: number;
  totalFavoritos: number;
  totalAnotacoes: number;
  totalCompartilhamentos: number;
  totalSalas: number;
  totalExegese: number;
  totalConcordancia: number;
  totalHarmonia: number;
  totalAtlas: number;
  totalCronologia: number;
  totalPalavras: number;
  totalReferencias: number;
  totalComentarios: number;
  totalFlashcards: number;
  totalPlanos: number;
  streakAtual: number;
  melhorStreak: number;
  diasAtivos: string[];
}

function carregar(): GamificationEvent[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(TRACKER_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function salvar(events: GamificationEvent[]) {
  try { localStorage.setItem(TRACKER_KEY, JSON.stringify(events)); } catch {}
}

function getDataAtual(): string {
  return new Date().toISOString().split('T')[0];
}

function calcularStreakFromEvents(events: GamificationEvent[]): { atual: number; melhor: number } {
  const datas = [...new Set(events.map(e => new Date(e.timestamp).toISOString().split('T')[0]))].sort().reverse();
  if (datas.length === 0) return { atual: 0, melhor: 0 };

  const hoje = getDataAtual();
  let streak = 0;
  for (let i = 0; i < datas.length; i++) {
    const expected = new Date(hoje);
    expected.setDate(expected.getDate() - i);
    const expectedStr = expected.toISOString().split('T')[0];
    if (datas.includes(expectedStr)) {
      streak++;
    } else {
      break;
    }
  }

  const allDates = [...new Set(events.map(e => new Date(e.timestamp).toISOString().split('T')[0]))].sort();
  let melhor = 0;
  let temp = 1;
  for (let i = 1; i < allDates.length; i++) {
    const prev = new Date(allDates[i - 1]);
    const curr = new Date(allDates[i]);
    const diff = (curr.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24);
    if (diff === 1) {
      temp++;
    } else {
      melhor = Math.max(melhor, temp);
      temp = 1;
    }
  }
  melhor = Math.max(melhor, temp);

  return { atual: streak, melhor };
}

export function trackEvent(tipo: GamificationEvent['tipo'], quantidade: number = 1, dados?: Record<string, unknown>) {
  const events = carregar();
  events.push({ tipo, quantidade, timestamp: Date.now(), dados });
  salvar(events);
}

export function getSummary(): GamificationSummary {
  const events = carregar();
  const streaks = calcularStreakFromEvents(events);
  const diasAtivos = [...new Set(events.map(e => new Date(e.timestamp).toISOString().split('T')[0]))];

  return {
    totalVersiculos: events.filter(e => e.tipo === 'versiculo_lido').reduce((s, e) => s + e.quantidade, 0),
    totalCapitulos: events.filter(e => e.tipo === 'capitulo_lido').reduce((s, e) => s + e.quantidade, 0),
    totalQuizzes: events.filter(e => e.tipo === 'quiz_completo').reduce((s, e) => s + e.quantidade, 0),
    totalEstudos: events.filter(e => e.tipo === 'estudo_feito').reduce((s, e) => s + e.quantidade, 0),
    totalFavoritos: events.filter(e => e.tipo === 'favorito').reduce((s, e) => s + e.quantidade, 0),
    totalAnotacoes: events.filter(e => e.tipo === 'anotacao').reduce((s, e) => s + e.quantidade, 0),
    totalCompartilhamentos: events.filter(e => e.tipo === 'compartilhou').reduce((s, e) => s + e.quantidade, 0),
    totalSalas: events.filter(e => e.tipo === 'sala_colaborativa').reduce((s, e) => s + e.quantidade, 0),
    totalExegese: events.filter(e => e.tipo === 'exegese').reduce((s, e) => s + e.quantidade, 0),
    totalConcordancia: events.filter(e => e.tipo === 'concordancia').reduce((s, e) => s + e.quantidade, 0),
    totalHarmonia: events.filter(e => e.tipo === 'harmonia').reduce((s, e) => s + e.quantidade, 0),
    totalAtlas: events.filter(e => e.tipo === 'atlas').reduce((s, e) => s + e.quantidade, 0),
    totalCronologia: events.filter(e => e.tipo === 'cronologia').reduce((s, e) => s + e.quantidade, 0),
    totalPalavras: events.filter(e => e.tipo === 'palavra_estudada').reduce((s, e) => s + e.quantidade, 0),
    totalReferencias: events.filter(e => e.tipo === 'referencia_seguida').reduce((s, e) => s + e.quantidade, 0),
    totalComentarios: events.filter(e => e.tipo === 'comentario_lido').reduce((s, e) => s + e.quantidade, 0),
    totalFlashcards: events.filter(e => e.tipo === 'flashcard_revisado').reduce((s, e) => s + e.quantidade, 0),
    totalPlanos: events.filter(e => e.tipo === 'plano_lido').reduce((s, e) => s + e.quantidade, 0),
    streakAtual: streaks.atual,
    melhorStreak: streaks.melhor,
    diasAtivos,
  };
}

export function getWeeklyStats(): { dia: string; versiculos: number; capitulos: number; quizzes: number }[] {
  const events = carregar();
  const result: { dia: string; versiculos: number; capitulos: number; quizzes: number }[] = [];
  const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    const dayEvents = events.filter(e => new Date(e.timestamp).toISOString().split('T')[0] === dateStr);
    
    result.push({
      dia: days[date.getDay()],
      versiculos: dayEvents.filter(e => e.tipo === 'versiculo_lido').reduce((s, e) => s + e.quantidade, 0),
      capitulos: dayEvents.filter(e => e.tipo === 'capitulo_lido').reduce((s, e) => s + e.quantidade, 0),
      quizzes: dayEvents.filter(e => e.tipo === 'quiz_completo').reduce((s, e) => s + e.quantidade, 0),
    });
  }
  
  return result;
}

export function getMonthlyHeatmap(): Record<string, number> {
  const events = carregar();
  const heatmap: Record<string, number> = {};
  
  for (let i = 29; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    const dayEvents = events.filter(e => new Date(e.timestamp).toISOString().split('T')[0] === dateStr);
    heatmap[dateStr] = dayEvents.reduce((s, e) => s + e.quantidade, 0);
  }
  
  return heatmap;
}
