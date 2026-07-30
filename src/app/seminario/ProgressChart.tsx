'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface ChartData {
  nome: string;
  progresso: number;
  nivel: string;
}

const nivelCores: Record<string, string> = {
  iniciante: '#10b981',
  intermediário: '#3b82f6',
  avançado: '#8b5cf6',
};

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="bg-[var(--surface-raised)] border border-[var(--border)] rounded-lg px-3 py-2 shadow-lg">
      <p className="text-xs font-medium text-[var(--content-primary)]">{label}</p>
      <p className="text-sm font-bold text-[var(--brand-default)]">{payload[0].value}% concluído</p>
    </div>
  );
}

export default function ProgressChart({ data }: { data: ChartData[] }) {
  if (!data || data.length === 0) {
    return <div className="h-64 flex items-center justify-center text-[var(--content-muted)] text-sm">Nenhum dado disponível</div>;
  }

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.3} />
          <XAxis
            dataKey="nome"
            tick={{ fontSize: 10, fill: 'var(--content-muted)' }}
            angle={-35}
            textAnchor="end"
            height={60}
          />
          <YAxis
            tick={{ fontSize: 10, fill: 'var(--content-muted)' }}
            domain={[0, 100]}
            tickFormatter={(v: number) => `${v}%`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="progresso" radius={[4, 4, 0, 0]} maxBarSize={40}>
            {data.map((entry, index) => (
              <Cell key={index} fill={nivelCores[entry.nivel] || 'var(--brand-default)'} fillOpacity={0.85} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
