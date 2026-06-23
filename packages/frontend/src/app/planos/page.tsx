"use client";

import { useState, useEffect } from "react";
import { Calendar, BookOpen, CheckCircle, Clock } from "lucide-react";

interface Plano {
  id: string;
  nome: string;
  descricao: string;
  duracao: number;
  categorias: string[];
}

const PLANOS_PREDEFINIDOS: Plano[] = [
  {
    id: "genesis-apocalipse",
    nome: "Gênesis a Apocalipse",
    descricao: "Leia a Bíblia inteira em 365 dias. Um capítulo por dia, começando pelo Antigo Testamento.",
    duracao: 365,
    categorias: ["Pentateuco", "Históricos", "Poéticos", "Proféticos", "Evangelhos", "Epístolas", "Apocalipse"],
  },
  {
    id: "nt-90",
    nome: "Novo Testamento em 90 dias",
    descricao: "Leia todo o Novo Testamento em 3 meses. Aproximadamente 3 capítulos por dia.",
    duracao: 90,
    categorias: ["Evangelhos", "Atos", "Epístolas", "Apocalipse"],
  },
  {
    id: "salmos",
    nome: "Salmos em 30 dias",
    descricao: "Leia os 150 Salmos em 30 dias. Cinco Salmos por dia.",
    duracao: 30,
    categorias: ["Poesia", "Salmos"],
  },
  {
    id: "evangelhos",
    nome: "Os Quatro Evangelhos",
    descricao: "Leia Mateus, Marcos, Lucas e João em 60 dias. Concentre-se na vida de Cristo.",
    duracao: 60,
    categorias: ["Evangelhos"],
  },
  {
    id: "proverbios",
    nome: "Proverbios em 31 dias",
    descricao: "Um capítulo de Proverbios por dia, durante um mês. Sabedoria para cada dia.",
    duracao: 31,
    categorias: ["Sabedoria", "Proverbios"],
  },
  {
    id: "atos-romanos",
    nome: "Atos e Romanos",
    descricao: "Estude a história da igreja primitiva e a teologia de Paulo em 45 dias.",
    duracao: 45,
    categorias: ["História", "Epístolas"],
  },
];

export default function PlanosPage() {
  const [planos, setPlanos] = useState<Plano[]>(PLANOS_PREDEFINIDOS);
  const [planoSel, setPlanoSel] = useState<Plano | null>(null);
  const [progresso, setProgresso] = useState<Record<string, number>>({});

  useEffect(() => {
    const saved = localStorage.getItem("bible-scholar-reading");
    if (saved) setProgresso(JSON.parse(saved));
  }, []);

  function iniciarPlano(plano: Plano) {
    setPlanoSel(plano);
  }

  function avancar(planoId: string) {
    const novo = { ...progresso, [planoId]: (progresso[planoId] || 0) + 1 };
    setProgresso(novo);
    localStorage.setItem("bible-scholar-reading", JSON.stringify(novo));
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Calendar className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">Planos de Leitura</h1>
          <p className="text-muted-foreground">Organize sua leitura bíblica com disciplina</p>
        </div>
      </div>

      {planoSel ? (
        <div className="space-y-4">
          <button onClick={() => setPlanoSel(null)} className="text-sm text-primary hover:underline">← Voltar aos planos</button>
          <div className="border rounded-lg p-6 space-y-4">
            <h2 className="text-2xl font-bold">{planoSel.nome}</h2>
            <p className="text-muted-foreground">{planoSel.descricao}</p>
            <div className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {planoSel.duracao} dias</span>
              <span className="flex items-center gap-1"><BookOpen className="h-4 w-4" /> {planoSel.categorias.join(", ")}</span>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progresso</span>
                <span>{progresso[planoSel.id] || 0} / {planoSel.duracao} dias</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-3">
                <div
                  className="bg-primary h-3 rounded-full transition-all"
                  style={{ width: `${Math.min(100, ((progresso[planoSel.id] || 0) / planoSel.duracao) * 100)}%` }}
                />
              </div>
            </div>

            <button
              onClick={() => avancar(planoSel.id)}
              disabled={(progresso[planoSel.id] || 0) >= planoSel.duracao}
              className="bg-primary text-primary-foreground px-6 py-2 rounded-lg text-sm font-medium disabled:opacity-50 flex items-center gap-2"
            >
              <CheckCircle className="h-4 w-4" />
              {(progresso[planoSel.id] || 0) >= planoSel.duracao ? "Concluído!" : "Marcar dia como lido"}
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {planos.map(p => {
            const prog = progresso[p.id] || 0;
            const pct = Math.min(100, (prog / p.duracao) * 100);
            return (
              <div
                key={p.id}
                onClick={() => iniciarPlano(p)}
                className="border rounded-lg p-5 cursor-pointer hover:shadow-md transition-shadow space-y-3"
              >
                <h3 className="font-semibold text-lg">{p.nome}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{p.descricao}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {p.duracao} dias</span>
                  {prog > 0 && <span>{Math.round(pct)}% concluído</span>}
                </div>
                {prog > 0 && (
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: `${pct}%` }} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
