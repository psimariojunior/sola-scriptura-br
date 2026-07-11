const STORAGE_KEY = 'ssb_stats';

interface StatsData {
  leituras: Record<string, number>;
  streak: number;
  ultimaLeitura: string | null;
  totalCapitulos: number;
  livrosLidos: Record<string, number>;
}

interface Stats {
  streak: number;
  chaptersThisWeek: number;
  totalVerses: number;
  totalChapters: number;
  favoriteBook: string;
  weeklyData: Record<string, number>;
  booksRead: Record<string, number>;
  dailyLog: Record<string, number>;
}

function hoje(): string {
  return new Date().toISOString().split('T')[0];
}

function carregar(): StatsData {
  if (typeof window === 'undefined') return { leituras: {}, streak: 0, ultimaLeitura: null, totalCapitulos: 0, livrosLidos: {} };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { leituras: {}, streak: 0, ultimaLeitura: null, totalCapitulos: 0, livrosLidos: {} };
    return JSON.parse(raw);
  } catch { return { leituras: {}, streak: 0, ultimaLeitura: null, totalCapitulos: 0, livrosLidos: {} }; }
}

function salvar(data: StatsData) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch {}
}

export function recordReading(livro: string, capitulo: number) {
  const data = carregar();
  const hojeStr = hoje();
  const key = `${livro}:${capitulo}`;

  if (data.leituras[hojeStr]) {
    data.leituras[hojeStr] += 1;
  } else {
    data.leituras[hojeStr] = 1;
  }

  if (!data.livrosLidos[livro]) {
    data.livrosLidos[livro] = 0;
  }
  data.livrosLidos[livro] += 1;

  data.totalCapitulos += 1;

  if (data.ultimaLeitura === hojeStr) {
    data.streak = Math.max(1, data.streak);
  } else if (data.ultimaLeitura) {
    const ultima = new Date(data.ultimaLeitura);
    const hojeDate = new Date(hojeStr);
    const diff = (hojeDate.getTime() - ultima.getTime()) / (1000 * 60 * 60 * 24);
    if (diff === 1) {
      data.streak += 1;
    } else {
      data.streak = 1;
    }
  } else {
    data.streak = 1;
  }

  data.ultimaLeitura = hojeStr;
  salvar(data);
}

export function getStats(): Stats {
  const data = carregar();
  const hojeStr = hoje();

  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  const weekStart = weekAgo.toISOString().split('T')[0];

  let chaptersThisWeek = 0;
  const weeklyData: Record<string, number> = {};
  const dailyLog: Record<string, number> = {};

  for (const [day, count] of Object.entries(data.leituras)) {
    dailyLog[day] = count;
    if (day >= weekStart && day <= hojeStr) {
      chaptersThisWeek += count;
      const d = new Date(day);
      const dayName = d.toLocaleDateString('pt-BR', { weekday: 'short' });
      weeklyData[dayName] = (weeklyData[dayName] || 0) + count;
    }
  }

  const livrosOrdenados = Object.entries(data.livrosLidos).sort((a, b) => b[1] - a[1]);
  const favoriteBook = livrosOrdenados[0]?.[0] || 'Nenhum';

  return {
    streak: data.streak,
    chaptersThisWeek,
    totalVerses: data.totalCapitulos * 20,
    totalChapters: data.totalCapitulos,
    favoriteBook,
    weeklyData,
    booksRead: data.livrosLidos,
    dailyLog,
  };
}

export function getStreakData(): { date: string; count: number }[] {
  const data = carregar();
  return Object.entries(data.leituras).map(([date, count]) => ({ date, count }));
}
