'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  planosExpandidos,
  obterPlanoPorId,
  type PlanoLeitura,
  type DiaPlano,
  type LeituraPlano,
} from '@/data/planosLeituraExpandidos';

const STORAGE_KEY = 'ssb_plano_leitura_v2';

interface LeituraCompletada {
  dia: number;
  leituraIndex: number;
}

interface PlanoState {
  planoId: string | null;
  dataInicio: string | null;
  leiturasCompletadas: LeituraCompletada[];
  pausado: boolean;
  dataPausa: string | null;
}

const DEFAULT_STATE: PlanoState = {
  planoId: null,
  dataInicio: null,
  leiturasCompletadas: [],
  pausado: false,
  dataPausa: null,
};

function carregarState(): PlanoState {
  if (typeof window === 'undefined') return DEFAULT_STATE;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return DEFAULT_STATE;
}

function salvarState(state: PlanoState): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function usePlanoLeitura() {
  const [state, setState] = useState<PlanoState>(carregarState);

  useEffect(() => {
    salvarState(state);
  }, [state]);

  const planosDisponiveis = useMemo(() => planosExpandidos, []);

  const planoAtivo = useMemo(() => {
    if (!state.planoId) return null;
    return obterPlanoPorId(state.planoId) || null;
  }, [state.planoId]);

  const iniciarPlano = useCallback((id: string) => {
    setState({
      planoId: id,
      dataInicio: new Date().toISOString(),
      leiturasCompletadas: [],
      pausado: false,
      dataPausa: null,
    });
  }, []);

  const completarLeitura = useCallback((dia: number, leituraIndex: number) => {
    setState((prev) => {
      const existe = prev.leiturasCompletadas.some(
        (l) => l.dia === dia && l.leituraIndex === leituraIndex
      );
      if (existe) {
        return {
          ...prev,
          leiturasCompletadas: prev.leiturasCompletadas.filter(
            (l) => !(l.dia === dia && l.leituraIndex === leituraIndex)
          ),
        };
      }
      return {
        ...prev,
        leiturasCompletadas: [
          ...prev.leiturasCompletadas,
          { dia, leituraIndex },
        ],
      };
    });
  }, []);

  const progressoPlano = useMemo(() => {
    if (!planoAtivo) return 0;
    const totalLeituras = planoAtivo.dias.reduce(
      (acc, d) => acc + d.leituras.length,
      0
    );
    if (totalLeituras === 0) return 0;
    return Math.round((state.leiturasCompletadas.length / totalLeituras) * 100);
  }, [planoAtivo, state.leiturasCompletadas]);

  const diasCompletos = useMemo(() => {
    if (!planoAtivo) return 0;
    return planoAtivo.dias.filter((dia) =>
      dia.leituras.every((_, idx) =>
        state.leiturasCompletadas.some(
          (l) => l.dia === dia.dia && l.leituraIndex === idx
        )
      )
    ).length;
  }, [planoAtivo, state.leiturasCompletadas]);

  const streakAtual = useMemo(() => {
    if (!planoAtivo || !state.dataInicio) return 0;
    const inicio = new Date(state.dataInicio);
    const hoje = new Date();
    let streak = 0;
    const dataAtual = new Date(inicio);

    while (dataAtual <= hoje) {
      const diffDays = Math.floor(
        (dataAtual.getTime() - inicio.getTime()) / (1000 * 60 * 60 * 24)
      );
      const diaNum = diffDays + 1;
      const diaPlano = planoAtivo.dias.find((d) => d.dia === diaNum);
      if (diaPlano) {
        const todosCompletos = diaPlano.leituras.every((_, idx) =>
          state.leiturasCompletadas.some(
            (l) => l.dia === diaNum && l.leituraIndex === idx
          )
        );
        if (todosCompletos) {
          streak++;
        } else {
          break;
        }
      }
      dataAtual.setDate(dataAtual.getDate() + 1);
    }
    return streak;
  }, [planoAtivo, state.dataInicio, state.leiturasCompletadas]);

  const proximoDia = useMemo(() => {
    if (!planoAtivo) return null;
    for (const dia of planoAtivo.dias) {
      const todosCompletos = dia.leituras.every((_, idx) =>
        state.leiturasCompletadas.some(
          (l) => l.dia === dia.dia && l.leituraIndex === idx
        )
      );
      if (!todosCompletos) return dia;
    }
    return null;
  }, [planoAtivo, state.leiturasCompletadas]);

  const pausarPlano = useCallback(() => {
    setState((prev) => ({
      ...prev,
      pausado: true,
      dataPausa: new Date().toISOString(),
    }));
  }, []);

  const retomarPlano = useCallback(() => {
    setState((prev) => ({
      ...prev,
      pausado: false,
      dataPausa: null,
    }));
  }, []);

  const trocarPlano = useCallback((novoId: string) => {
    setState({
      planoId: novoId,
      dataInicio: new Date().toISOString(),
      leiturasCompletadas: [],
      pausado: false,
      dataPausa: null,
    });
  }, []);

  const verificarLeituraCompleta = useCallback(
    (dia: number, leituraIndex: number): boolean => {
      return state.leiturasCompletadas.some(
        (l) => l.dia === dia && l.leituraIndex === leituraIndex
      );
    },
    [state.leiturasCompletadas]
  );

  const verificarDiaCompleto = useCallback(
    (dia: number): boolean => {
      if (!planoAtivo) return false;
      const diaPlano = planoAtivo.dias.find((d) => d.dia === dia);
      if (!diaPlano) return false;
      return diaPlano.leituras.every((_, idx) =>
        state.leiturasCompletadas.some(
          (l) => l.dia === dia && l.leituraIndex === idx
        )
      );
    },
    [planoAtivo, state.leiturasCompletadas]
  );

  const diasCompletadosLista = useMemo(() => {
    return state.leiturasCompletadas.map((l) => l.dia);
  }, [state.leiturasCompletadas]);

  return {
    planosDisponiveis,
    planoAtivo,
    iniciarPlano,
    completarLeitura,
    progressoPlano,
    diasCompletos,
    streakAtual,
    proximoDia,
    pausarPlano,
    retomarPlano,
    trocarPlano,
    verificarLeituraCompleta,
    verificarDiaCompleto,
    diasCompletadosLista,
    estaPausado: state.pausado,
    dataInicio: state.dataInicio,
  };
}
