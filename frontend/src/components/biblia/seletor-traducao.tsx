'use client';

interface Props {
  traducoes: any[];
  valor: string;
  onChange: (v: string) => void;
}

export function SeletorTraducao({ traducoes, valor, onChange }: Props) {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      <span className="text-xs tracking-widest uppercase text-muted-foreground">Tradução:</span>
      {traducoes.map((t) => (
        <button
          key={t.id}
          onClick={() => onChange(t.sigla)}
          className={`px-3 py-1 text-sm font-medium border transition-all ${
            valor === t.sigla
              ? 'border-primary text-primary bg-primary/5'
              : 'border-border text-muted-foreground hover:border-primary/40 hover:text-foreground'
          }`}
        >
          {t.sigla}
          <span className="ml-2 text-xs opacity-60 hidden md:inline">{t.nome}</span>
        </button>
      ))}
    </div>
  );
}
