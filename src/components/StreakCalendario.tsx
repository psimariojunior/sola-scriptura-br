'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';

interface AtividadeDia {
  data: string;
  versiculos: number;
  capitulos: number;
  quizzes: number;
}

interface StreakCalendarioProps {
  atividades: AtividadeDia[];
  streakAtual?: number;
  melhorStreak?: number;
}

function getDataAtual(): string {
  return new Date().toISOString().split('T')[0];
}

function formatarData(data: string): string {
  return new Date(data + 'T12:00:00').toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

const MESES = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
const DIAS_SEMANA = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

export function StreakCalendario({ atividades, streakAtual = 0, melhorStreak = 0 }: StreakCalendarioProps) {
  const dadosCalendario = useMemo(() => {
    const hoje = new Date();
    const dias: { data: string; total: number; nivel: number; detalhes: string }[] = [];

    for (let i = 364; i >= 0; i--) {
      const d = new Date(hoje);
      d.setDate(d.getDate() - i);
      const dataStr = d.toISOString().split('T')[0];
      const atividade = atividades.find(a => a.data === dataStr);
      const total = atividade ? atividade.versiculos + atividade.capitulos * 3 + atividade.quizzes * 2 : 0;
      let nivel = 0;
      if (total > 0) nivel = 1;
      if (total >= 5) nivel = 2;
      if (total >= 15) nivel = 3;
      if (total >= 30) nivel = 4;

      let detalhes = `${formatarData(dataStr)}: Sem atividade`;
      if (atividade) {
        const partes: string[] = [];
        if (atividade.versiculos > 0) partes.push(`${atividade.versiculos} versículos`);
        if (atividade.capitulos > 0) partes.push(`${atividade.capitulos} capítulos`);
        if (atividade.quizzes > 0) partes.push(`${atividade.quizzes} quizzes`);
        detalhes = `${formatarData(dataStr)}: ${partes.join(', ')}`;
      }

      dias.push({ data: dataStr, total, nivel, detalhes });
    }

    const meses: { mes: string; index: number }[] = [];
    let mesAtual = -1;
    for (let i = 0; i < dias.length; i++) {
      const d = new Date(dias[i].data + 'T12:00:00');
      if (d.getMonth() !== mesAtual) {
        mesAtual = d.getMonth();
        meses.push({ mes: MESES[mesAtual], index: i });
      }
    }

    return { dias, meses };
  }, [atividades]);

  const niveisCor = [
    'bg-[var(--bg)] dark:bg-white/5',
    'bg-green-500/20',
    'bg-green-500/40',
    'bg-green-600/60',
    'bg-green-700',
  ];

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[700px]">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <Flame className="w-5 h-5 text-orange-500" />
          <h3 className="text-sm font-semibold text-[var(--muted-fg)] uppercase tracking-wider">
            Calendário de Atividade
          </h3>
        </div>

        {/* Streak summary */}
        <div className="flex items-center gap-6 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-500 animate-pulse" />
            <span className="text-sm text-[var(--fg)] font-medium">
              Sequência atual: <span className="font-bold text-orange-500">{streakAtual} dias</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-purple-500" />
            <span className="text-sm text-[var(--fg)] font-medium">
              Melhor sequência: <span className="font-bold text-purple-500">{melhorStreak} dias</span>
            </span>
          </div>
        </div>

        {/* Month labels */}
        <div className="flex mb-1 ml-8">
          {dadosCalendario.meses.map((mes, i) => (
            <div
              key={`${mes.mes}-${i}`}
              className="text-[10px] text-[var(--muted-fg)]"
              style={{ position: 'relative', left: `${(mes.index / 365) * 100}%` }}
            >
              {mes.mes}
            </div>
          ))}
        </div>

        {/* Grid */}
        <div className="flex gap-0.5">
          {/* Day labels */}
          <div className="flex flex-col gap-0.5 mr-1 mt-1">
            {DIAS_SEMANA.map((dia, i) => (
              <div key={dia} className="h-[10px] text-[8px] text-[var(--muted-fg)] flex items-center leading-none">
                {i % 2 === 1 ? dia.slice(0, 1) : ''}
              </div>
            ))}
          </div>

          {/* Weeks */}
          <div className="flex gap-[3px]">
            {(() => {
              type DiaCalendario = { data: string; total: number; nivel: number; detalhes: string };
              const semanas: DiaCalendario[][] = [];
              let semanaAtual: DiaCalendario[] = [];
              const primeiroDia = new Date(dadosCalendario.dias[0]?.data + 'T12:00:00');
              const diaSemanaInicio = primeiroDia.getDay();

              for (let i = 0; i < diaSemanaInicio; i++) {
                semanaAtual.push({ data: '', total: 0, nivel: -1, detalhes: '' });
              }

              for (const dia of dadosCalendario.dias) {
                semanaAtual.push(dia);
                if (semanaAtual.length === 7) {
                  semanas.push(semanaAtual);
                  semanaAtual = [];
                }
              }
              if (semanaAtual.length > 0) {
                while (semanaAtual.length < 7) {
                  semanaAtual.push({ data: '', total: 0, nivel: -1, detalhes: '' });
                }
                semanas.push(semanaAtual);
              }

              return semanas.map((semana, si) => (
                <div key={si} className="flex flex-col gap-[3px]">
                  {semana.map((dia, di) => (
                    <motion.div
                      key={`${si}-${di}`}
                      className={`w-[10px] h-[10px] rounded-[2px] transition-colors ${
                        dia.nivel === -1
                          ? 'bg-transparent'
                          : niveisCor[dia.nivel]
                      } ${dia.data === getDataAtual() ? 'ring-1 ring-[var(--primary)] ring-offset-1 ring-offset-[var(--bg)]' : ''}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: (si * 7 + di) * 0.0005 }}
                      title={dia.detalhes}
                    />
                  ))}
                </div>
              ));
            })()}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-1.5 mt-3 ml-8">
          <span className="text-[9px] text-[var(--muted-fg)]">Menos</span>
          {niveisCor.map((nivel, i) => (
            <div key={i} className={`w-[10px] h-[10px] rounded-[2px] ${nivel}`} />
          ))}
          <span className="text-[9px] text-[var(--muted-fg)]">Mais</span>
        </div>
      </div>
    </div>
  );
}
