import { useState, useEffect, useCallback } from 'react';
import { gerarPlano, planos, type LeituraDia } from '@/data/planosLeitura';

const STORAGE_KEY = 'ssb_reading_plan';

interface ReadingPlanState {
  planId: string | null;
  currentDay: number;
  completedDays: number[];
  startDate: string | null;
}

export function useReadingPlan() {
  const [state, setState] = useState<ReadingPlanState>(() => {
    if (typeof window === 'undefined') return { planId: null, currentDay: 1, completedDays: [], startDate: null };
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch {}
    return { planId: null, currentDay: 1, completedDays: [], startDate: null };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const selectPlan = useCallback((planId: string) => {
    setState({ planId, currentDay: 1, completedDays: [], startDate: new Date().toISOString() });
  }, []);

  const markDay = useCallback((day: number, completed: boolean) => {
    setState(prev => ({
      ...prev,
      completedDays: completed
        ? [...new Set([...prev.completedDays, day])]
        : prev.completedDays.filter(d => d !== day),
    }));
  }, []);

  const nextDay = useCallback(() => {
    setState(prev => ({ ...prev, currentDay: Math.min(prev.currentDay + 1, 365) }));
  }, []);

  const prevDay = useCallback(() => {
    setState(prev => ({ ...prev, currentDay: Math.max(prev.currentDay - 1, 1) }));
  }, []);

  const reset = useCallback(() => {
    setState({ planId: null, currentDay: 1, completedDays: [], startDate: null });
  }, []);

  const days: LeituraDia[] = state.planId ? gerarPlano(state.planId) : [];
  const currentDayData = days[state.currentDay - 1] || null;
  const totalDays = state.planId ? planos[state.planId]?.totalDias || 0 : 0;
  const progress = totalDays > 0 ? (state.completedDays.length / totalDays) * 100 : 0;

  return {
    state,
    days,
    currentDayData,
    totalDays,
    progress,
    selectPlan,
    markDay,
    nextDay,
    prevDay,
    reset,
  };
}
