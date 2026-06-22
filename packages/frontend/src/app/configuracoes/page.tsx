"use client";

import { useState, useEffect } from "react";
import { Settings } from "lucide-react";

export default function ConfiguracoesPage() {
  const [tema, setTema] = useState("claro");
  const [fontSize, setFontSize] = useState(16);
  const [traducaoPadrao, setTraducaoPadrao] = useState("ARA");
  const [salvo, setSalvo] = useState(false);

  useEffect(() => {
    const config = localStorage.getItem("bible-scholar-config");
    if (config) {
      const parsed = JSON.parse(config);
      setTema(parsed.tema || "claro");
      setFontSize(parsed.fontSize || 16);
      setTraducaoPadrao(parsed.traducaoPadrao || "ARA");
    }
  }, []);

  function salvar() {
    localStorage.setItem(
      "bible-scholar-config",
      JSON.stringify({ tema, fontSize, traducaoPadrao })
    );
    setSalvo(true);
    setTimeout(() => setSalvo(false), 2000);
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center gap-3">
        <Settings className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">Configurações</h1>
          <p className="text-muted-foreground">Personalize sua experiência</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Tema</label>
          <select
            value={tema}
            onChange={(e) => setTema(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 text-sm"
          >
            <option value="claro">Claro</option>
            <option value="escuro">Escuro</option>
            <option value="sistema">Sistema</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">
            Tamanho da fonte: {fontSize}px
          </label>
          <input
            type="range"
            min="12"
            max="24"
            value={fontSize}
            onChange={(e) => setFontSize(parseInt(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>12px</span>
            <span>24px</span>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Tradução padrão</label>
          <select
            value={traducaoPadrao}
            onChange={(e) => setTraducaoPadrao(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 text-sm"
          >
            <option value="ARA">ARA - Atualizada Revisada Ampliada</option>
            <option value="NVI">NVI - Nova Versão Internacional</option>
            <option value="ARC">ARC - Almeida Revista e Corrigida</option>
          </select>
        </div>

        <button
          onClick={salvar}
          className="bg-primary text-primary-foreground px-6 py-2 rounded-lg text-sm"
        >
          {salvo ? "✓ Salvo!" : "Salvar configurações"}
        </button>
      </div>
    </div>
  );
}
