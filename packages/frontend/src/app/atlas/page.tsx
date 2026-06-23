"use client";

import { useState, useEffect } from "react";
import { Globe, MapPin, ExternalLink } from "lucide-react";

export default function AtlasPage() {
  const [locais, setLocais] = useState<any[]>([]);
  const [filtro, setFiltro] = useState("");
  const [tipoFiltro, setTipoFiltro] = useState("");
  const [carregando, setCarregando] = useState(true);

  useEffect(() => { carregar(); }, []);

  async function carregar() {
    try {
      const res = await fetch("/api/v1/geografia/localizacoes");
      const data = await res.json();
      setLocais(Array.isArray(data) ? data : []);
    } catch { setLocais([]); }
    setCarregando(false);
  }

  const tipos = [...new Set(locais.map(l => l.tipo).filter(Boolean))];
  
  const filtrados = locais.filter(l =>
    (!filtro || l.nomePortugues?.toLowerCase().includes(filtro.toLowerCase())) &&
    (!tipoFiltro || l.tipo === tipoFiltro)
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Globe className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">Atlas Bíblico</h1>
          <p className="text-muted-foreground">{locais.length} locais geográficos da Bíblia</p>
        </div>
      </div>

      <div className="flex gap-3">
        <input
          value={filtro}
          onChange={e => setFiltro(e.target.value)}
          placeholder="Buscar localização..."
          className="flex-1 border rounded-lg px-4 py-2 text-sm"
        />
        <select
          value={tipoFiltro}
          onChange={e => setTipoFiltro(e.target.value)}
          className="border rounded-lg px-4 py-2 text-sm"
        >
          <option value="">Todos os tipos</option>
          {tipos.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setTipoFiltro("")}
          className={`px-3 py-1 rounded-full text-sm border transition-colors ${
            !tipoFiltro ? "bg-primary text-primary-foreground" : "hover:bg-accent"
          }`}
        >
          Todos ({locais.length})
        </button>
        {tipos.map(tipo => (
          <button
            key={tipo}
            onClick={() => setTipoFiltro(tipo)}
            className={`px-3 py-1 rounded-full text-sm border transition-colors ${
              tipoFiltro === tipo ? "bg-primary text-primary-foreground" : "hover:bg-accent"
            }`}
          >
            {tipo} ({locais.filter(l => l.tipo === tipo).length})
          </button>
        ))}
      </div>

      {carregando ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="border rounded-lg p-4 animate-pulse space-y-2">
              <div className="h-5 bg-muted rounded w-1/2" />
              <div className="h-4 bg-muted rounded w-1/3" />
              <div className="h-16 bg-muted rounded" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtrados.map(l => (
            <div key={l.id} className="border rounded-lg p-4 space-y-2 hover:shadow-md transition-all">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                  <h3 className="font-semibold">{l.nomePortugues}</h3>
                </div>
                {l.latitude && l.longitude && (
                  <a
                    href={`https://www.google.com/maps?q=${l.latitude},${l.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>
              {l.nomeOriginal && <p className="text-xs text-muted-foreground">{l.nomeOriginal}</p>}
              {l.tipo && <span className="inline-block px-2 py-0.5 rounded-full text-xs bg-secondary">{l.tipo}</span>}
              {l.descricao && <p className="text-sm text-muted-foreground line-clamp-3">{l.descricao}</p>}
              {l.latitude && l.longitude && (
                <p className="text-xs text-muted-foreground">📍 {l.latitude.toFixed(3)}°, {l.longitude.toFixed(3)}°</p>
              )}
            </div>
          ))}
        </div>
      )}

      {!carregando && filtrados.length === 0 && (
        <p className="text-center text-muted-foreground py-8">Nenhuma localização encontrada</p>
      )}
    </div>
  );
}
