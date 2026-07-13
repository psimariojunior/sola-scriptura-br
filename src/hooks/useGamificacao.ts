import { useState, useEffect, useCallback, useRef } from 'react';
import {
  CONQUISTAS,
  NIVEIS_USUARIO,
  DESAFIOS_DIARIOS,
  getDesafiosDoDia,
  getNivelByXP,
  getProximoNivel,
  calcularProgressoNivel,
  type Conquista,
  type NivelUsuario,
  type DesafioDiario,
} from '@/data/conquistas';

const STORAGE_KEY = 'ssb_gamificacao';

interface DiaAtividade {
  data: string;
  versiculos: number;
  capitulos: number;
  quizzes: number;
  minutos: number;
}

interface DesafioEstado {
  desafioId: string;
  concluido: boolean;
  dataConclusao: string | null;
}

export interface GamificacaoState {
  xpTotal: number;
  conquistasDesbloqueadas: string[];
  streakAtual: number;
  melhorStreak: number;
  ultimaLeitura: string;
  atividades: DiaAtividade[];
  desafiosConcluidos: DesafioEstado[];
  totalVersiculos: number;
  totalCapitulos: number;
  totalQuizzes: number;
  totalMinutos: number;
}

function getDataAtual(): string {
  return new Date().toISOString().split('T')[0];
}

function calcularStreak(atividades: DiaAtividade[]): { atual: number; melhor: number } {
  if (atividades.length === 0) return { atual: 0, melhor: 0 };

  const datas = [...new Set(atividades.map(a => a.data))].sort().reverse();
  const hoje = getDataAtual();

  let streak = 0;
  let melhor = 0;
  let streakTemp = 0;

  const todasDatas = [...new Set(atividades.map(a => a.data))].sort();
  for (let i = 0; i < todasDatas.length; i++) {
    if (i === 0) {
      streakTemp = 1;
    } else {
      const anterior = new Date(todasDatas[i - 1]);
      const atual = new Date(todasDatas[i]);
      const diff = (atual.getTime() - anterior.getTime()) / (1000 * 60 * 60 * 24);
      if (diff === 1) {
        streakTemp++;
      } else {
        streakTemp = 1;
      }
    }
    melhor = Math.max(melhor, streakTemp);
  }

  streak = 0;
  for (let i = datas.length - 1; i >= 0; i--) {
    const dataVerificar = new Date(hoje);
    dataVerificar.setDate(dataVerificar.getDate() - streak);
    const dataStr = dataVerificar.toISOString().split('T')[0];
    if (datas.includes(dataStr)) {
      streak++;
    } else {
      break;
    }
  }

  return { atual: streak, melhor: Math.max(melhor, streak) };
}

function estadoInicial(): GamificacaoState {
  if (typeof window === 'undefined') {
    return {
      xpTotal: 0,
      conquistasDesbloqueadas: [],
      streakAtual: 0,
      melhorStreak: 0,
      ultimaLeitura: '',
      atividades: [],
      desafiosConcluidos: [],
      totalVersiculos: 0,
      totalCapitulos: 0,
      totalQuizzes: 0,
      totalMinutos: 0,
    };
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return {
    xpTotal: 0,
    conquistasDesbloqueadas: [],
    streakAtual: 0,
    melhorStreak: 0,
    ultimaLeitura: '',
    atividades: [],
    desafiosConcluidos: [],
    totalVersiculos: 0,
    totalCapitulos: 0,
    totalQuizzes: 0,
    totalMinutos: 0,
  };
}

export function useGamificacao() {
  const [state, setState] = useState<GamificacaoState>(estadoInicial);
  const [novaConquista, setNovaConquista] = useState<Conquista | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const streaks = calcularStreak(state.atividades);
  const nivelAtual = getNivelByXP(state.xpTotal);
  const proximoNivel = getProximoNivel(state.xpTotal);
  const progressoNivel = calcularProgressoNivel(state.xpTotal);

  const desafiosDoDia = getDesafiosDoDia(new Date().getDay());

  const verificarConquistas = useCallback((novoEstado: GamificacaoState) => {
    for (const conquista of CONQUISTAS) {
      if (novoEstado.conquistasDesbloqueadas.includes(conquista.id)) continue;
      let desbloqueada = false;
      const c = conquista.condicao;

      switch (c.tipo) {
        case 'versiculos_lidos':
          desbloqueada = novoEstado.totalVersiculos >= c.valor;
          break;
        case 'capitulos_completos':
          desbloqueada = novoEstado.totalCapitulos >= c.valor;
          break;
        case 'quizzes_completos':
          desbloqueada = novoEstado.totalQuizzes >= c.valor;
          break;
        case 'streak_dias':
          desbloqueada = novoEstado.streakAtual >= c.valor || novoEstado.melhorStreak >= c.valor;
          break;
        case 'conquistas_desbloqueadas':
          desbloqueada = novoEstado.conquistasDesbloqueadas.length >= c.valor;
          break;
        default:
          break;
      }

      if (desbloqueada) {
        const atualizado = {
          ...novoEstado,
          conquistasDesbloqueadas: [...novoEstado.conquistasDesbloqueadas, conquista.id],
          xpTotal: novoEstado.xpTotal + conquista.pontos,
        };
        setNovaConquista(conquista);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => setNovaConquista(null), 5000);
        return atualizado;
      }
    }
    return novoEstado;
  }, []);

  const adicionarAtividade = useCallback((tipo: 'versiculos' | 'capitulos' | 'quizzes', quantidade: number) => {
    setState(prev => {
      const hoje = getDataAtual();
      const atividadesExistentes = prev.atividades.filter(a => a.data !== hoje);
      const atividadeHoje = prev.atividades.find(a => a.data === hoje) || {
        data: hoje,
        versiculos: 0,
        capitulos: 0,
        quizzes: 0,
        minutos: 0,
      };

      const novaAtividade = { ...atividadeHoje };
      if (tipo === 'versiculos') novaAtividade.versiculos += quantidade;
      if (tipo === 'capitulos') novaAtividade.capitulos += quantidade;
      if (tipo === 'quizzes') novaAtividade.quizzes += quantidade;

      const novasAtividades = [...atividadesExistentes, novaAtividade];
      const streaks = calcularStreak(novasAtividades);

      let xpGanho = 0;
      if (tipo === 'versiculos') xpGanho = quantidade * 2;
      if (tipo === 'capitulos') xpGanho = quantidade * 10;
      if (tipo === 'quizzes') xpGanho = quantidade * 5;

      const novoEstado: GamificacaoState = {
        ...prev,
        atividades: novasAtividades,
        streakAtual: streaks.atual,
        melhorStreak: streaks.melhor,
        ultimaLeitura: hoje,
        totalVersiculos: prev.totalVersiculos + (tipo === 'versiculos' ? quantidade : 0),
        totalCapitulos: prev.totalCapitulos + (tipo === 'capitulos' ? quantidade : 0),
        totalQuizzes: prev.totalQuizzes + (tipo === 'quizzes' ? quantidade : 0),
        xpTotal: prev.xpTotal + xpGanho,
      };

      return verificarConquistas(novoEstado);
    });
  }, [verificarConquistas]);

  const adicionarXP = useCallback((quantidade: number) => {
    setState(prev => {
      const novoEstado = { ...prev, xpTotal: prev.xpTotal + quantidade };
      return verificarConquistas(novoEstado);
    });
  }, [verificarConquistas]);

  const desbloquearConquista = useCallback((conquistaId: string) => {
    setState(prev => {
      if (prev.conquistasDesbloqueadas.includes(conquistaId)) return prev;
      const conquista = CONQUISTAS.find(c => c.id === conquistaId);
      if (!conquista) return prev;
      return verificarConquistas({
        ...prev,
        conquistasDesbloqueadas: [...prev.conquistasDesbloqueadas, conquistaId],
        xpTotal: prev.xpTotal + conquista.pontos,
      });
    });
  }, [verificarConquistas]);

  const completarDesafio = useCallback((desafioId: string) => {
    setState(prev => {
      const desafio = DESAFIOS_DIARIOS.find(d => d.id === desafioId);
      if (!desafio) return prev;
      const jaConcluido = prev.desafiosConcluidos.find(d => d.desafioId === desafioId && d.dataConclusao === getDataAtual());
      if (jaConcluido) return prev;
      return verificarConquistas({
        ...prev,
        xpTotal: prev.xpTotal + desafio.recompensa,
        desafiosConcluidos: [
          ...prev.desafiosConcluidos.filter(d => d.desafioId !== desafioId || d.dataConclusao !== getDataAtual()),
          { desafioId, concluido: true, dataConclusao: getDataAtual() },
        ],
      });
    });
  }, [verificarConquistas]);

  const rankingSemanal = [
    { nome: 'Ana Beatriz', nivel: 15, xp: 28500, avatar: '👩‍🏫' },
    { nome: 'Pedro Henrique', nivel: 14, xp: 24200, avatar: '👨‍🎓' },
    { nome: 'Maria Clara', nivel: 13, xp: 19800, avatar: '👩‍💻' },
    { nome: 'João Lucas', nivel: 12, xp: 16500, avatar: '👨‍🏫' },
    { nome: 'Você', nivel: nivelAtual.nivel, xp: state.xpTotal, avatar: '🙋' },
    { nome: 'Sarah Oliveira', nivel: 11, xp: 14200, avatar: '👩‍🔬' },
    { nome: 'Lucas Santos', nivel: 10, xp: 12800, avatar: '🧑‍💻' },
    { nome: 'Rebeca Lima', nivel: 9, xp: 10500, avatar: '👩‍🎨' },
    { nome: 'Daniel Costa', nivel: 8, xp: 8900, avatar: '🧑‍🎓' },
    { nome: 'Priscila Araújo', nivel: 7, xp: 7200, avatar: '👩‍⚕️' },
  ].sort((a, b) => b.xp - a.xp);

  return {
    nivelAtual,
    proximoNivel,
    progressoNivel,
    xpAtual: state.xpTotal,
    xpProximoNivel: proximoNivel?.xpNecessario ?? state.xpTotal,
    conquistasDesbloqueadas: state.conquistasDesbloqueadas,
    conquistasTotais: CONQUISTAS.length,
    desafiosDiarios: desafiosDoDia,
    streakAtual: streaks.atual,
    melhorStreak: streaks.melhor,
    pontosTotais: state.xpTotal,
    totalVersiculos: state.totalVersiculos,
    totalCapitulos: state.totalCapitulos,
    totalQuizzes: state.totalQuizzes,
    atividades: state.atividades,
    desafiosConcluidos: state.desafiosConcluidos,
    novaConquista,
    rankingSemanal,
    desbloquearConquista,
    adicionarXP,
    adicionarAtividade,
    completarDesafio,
  };
}
