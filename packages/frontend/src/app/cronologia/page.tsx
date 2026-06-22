"use client";

import { useState, useEffect } from "react";
import { apiCronologia } from "@/lib/api";
import { ChevronDown, ChevronRight, Clock } from "lucide-react";

interface Evento {
  data: string;
  evento: string;
  referencia: string;
  categoria: string;
  periodo: string;
}

interface Periodo {
  nome: string;
  inicio: string;
  fim: string;
  eventos: Evento[];
}

export default function CronologiaPage() {
  const [periodos, setPeriodos] = useState<Periodo[]>([]);
  const [expandidos, setExpandidos] = useState<Record<string, boolean>>({});
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    carregarCronologia();
  }, []);

  async function carregarCronologia() {
    setCarregando(true);
    try {
      const res = await apiCronologia.linhaDoTempo();
      setPeriodos(res.data?.periodos || []);
      const expandido: Record<string, boolean> = {};
      (res.data?.periodos || []).forEach((p: Periodo) => {
        expandido[p.nome] = false;
      });
      setExpandidos(expandido);
    } catch {
      console.error("Erro ao carregar cronologia");
    }
    setCarregando(false);
  }

  function togglePeriodo(nome: string) {
    setExpandidos((prev) => ({ ...prev, [nome]: !prev[nome] }));
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Cronologia Bíblica</h1>
      <p className="text-muted-foreground">
        Linha do tempo completa dos eventos bíblicos desde os patriarcas até a igreja primitiva
      </p>

      {carregando ? (
        <div className="text-center py-12 text-muted-foreground">Carregando...</div>
      ) : (
        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border" />

          {periodos.map((periodo) => (
            <div key={periodo.nome} className="relative pl-16 pb-8">
              <div className="absolute left-6 top-1 w-4 h-4 rounded-full bg-primary border-4 border-background" />

              <div
                className="border rounded-lg p-4 hover:bg-accent cursor-pointer transition-colors"
                onClick={() => togglePeriodo(periodo.nome)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{periodo.nome}</h3>
                    <p className="text-sm text-muted-foreground">
                      {periodo.inicio} - {periodo.fim}
                    </p>
                  </div>
                  {expandidos[periodo.nome] ? (
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>

                {expandidos[periodo.nome] && (
                  <div className="mt-4 space-y-3">
                    {periodo.eventos.map((evento, i) => (
                      <div key={i} className="flex items-start gap-3 py-2 border-t">
                        <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="font-medium">{evento.evento}</p>
                          <div className="flex gap-4 text-sm text-muted-foreground">
                            <span>{evento.data}</span>
                            <span>{evento.referencia}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
