"use client";

import { useState, useEffect } from "react";
import { apiGeografia } from "@/lib/api";
import { Globe, MapPin } from "lucide-react";

interface Localizacao {
  id: string;
  nomePortugues: string;
  nomeOriginal: string;
  slug: string;
  tipo: string;
  latitude: number;
  longitude: number;
  descricao: string;
}

export default function AtlasPage() {
  const [locais, setLocais] = useState<Localizacao[]>([]);
  const [filtro, setFiltro] = useState("");
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    carregarDados();
  }, []);

  async function carregarDados() {
    try {
      const res = await apiGeografia.listarLocalizacoes();
      setLocais(res.data || []);
    } catch {
      console.error("Erro ao carregar atlas");
    }
    setCarregando(false);
  }

  const locaisFiltrados = locais.filter(
    (l) =>
      l.nomePortugues.toLowerCase().includes(filtro.toLowerCase()) ||
      l.tipo.toLowerCase().includes(filtro.toLowerCase())
  );

  const tipos = [...new Set(locais.map((l) => l.tipo))];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Globe className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">Atlas Bíblico</h1>
          <p className="text-muted-foreground">Locais geográficos da Bíblia</p>
        </div>
      </div>

      <input
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
        placeholder="Buscar localização..."
        className="w-full border rounded-lg px-4 py-2 text-sm"
      />

      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setFiltro("")}
          className={`px-3 py-1 rounded-full text-sm border transition-colors ${
            !filtro ? "bg-primary text-primary-foreground" : "hover:bg-accent"
          }`}
        >
          Todos
        </button>
        {tipos.map((tipo) => (
          <button
            key={tipo}
            onClick={() => setFiltro(tipo)}
            className={`px-3 py-1 rounded-full text-sm border transition-colors ${
              filtro === tipo
                ? "bg-primary text-primary-foreground"
                : "hover:bg-accent"
            }`}
          >
            {tipo}
          </button>
        ))}
      </div>

      {carregando ? (
        <p className="text-muted-foreground">Carregando...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {locaisFiltrados.map((local) => (
            <div
              key={local.id}
              className="border rounded-lg p-4 space-y-2 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <h3 className="font-semibold">{local.nomePortugues}</h3>
              </div>
              {local.nomeOriginal && (
                <p className="text-sm text-muted-foreground">
                  {local.nomeOriginal}
                </p>
              )}
              <span className="inline-block px-2 py-0.5 rounded-full text-xs bg-secondary">
                {local.tipo}
              </span>
              {local.descricao && (
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {local.descricao}
                </p>
              )}
              <p className="text-xs text-muted-foreground">
                {local.latitude.toFixed(2)}°, {local.longitude.toFixed(2)}°
              </p>
            </div>
          ))}
        </div>
      )}

      {!carregando && locaisFiltrados.length === 0 && (
        <p className="text-center text-muted-foreground py-8">
          Nenhuma localização encontrada.
        </p>
      )}
    </div>
  );
}
