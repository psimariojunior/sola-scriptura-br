"use client";

import { useState, useEffect } from "react";
import { MapPin, Route, Navigation, ExternalLink } from "lucide-react";

export default function MapasPage() {
  const [locais, setLocais] = useState<any[]>([]);
  const [rotas, setRotas] = useState<any[]>([]);
  const [tab, setTab] = useState<"locais" | "rotas">("locais");
  const [localSel, setLocalSel] = useState<any>(null);
  const [filtro, setFiltro] = useState("");
  const [tipoFiltro, setTipoFiltro] = useState("");
  const [carregando, setCarregando] = useState(true);

  useEffect(() => { carregar(); }, []);

  async function carregar() {
    try {
      const [resLoc, resRot] = await Promise.all([
        fetch("/api/v1/geografia/localizacoes").then(r => r.json()),
        fetch("/api/v1/geografia/rotas").then(r => r.json()),
      ]);
      setLocais(Array.isArray(resLoc) ? resLoc : []);
      setRotas(Array.isArray(resRot) ? resRot : []);
    } catch { 
      setLocais([]); 
      setRotas([]); 
    }
    setCarregando(false);
  }

  const tipos = [...new Set(locais.map(l => l.tipo).filter(Boolean))];
  
  const locaisFiltrados = locais.filter(l =>
    (!filtro || l.nomePortugues?.toLowerCase().includes(filtro.toLowerCase())) &&
    (!tipoFiltro || l.tipo === tipoFiltro)
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <MapPin className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">Mapas Bíblicos</h1>
          <p className="text-muted-foreground">{locais.length} locais e {rotas.length} rotas</p>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setTab("locais")}
          className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            tab === "locais" ? "bg-primary text-primary-foreground" : "hover:bg-accent border"
          }`}
        >
          <MapPin className="h-4 w-4" /> Locais
        </button>
        <button
          onClick={() => setTab("rotas")}
          className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            tab === "rotas" ? "bg-primary text-primary-foreground" : "hover:bg-accent border"
          }`}
        >
          <Route className="h-4 w-4" /> Rotas
        </button>
      </div>

      {tab === "locais" && (
        <>
          <div className="flex gap-3">
            <input
              value={filtro}
              onChange={e => setFiltro(e.target.value)}
              placeholder="Buscar local..."
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

          {carregando ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="border rounded-lg p-4 animate-pulse space-y-2">
                  <div className="h-5 bg-muted rounded w-1/2" />
                  <div className="h-4 bg-muted rounded w-1/3" />
                  <div className="h-12 bg-muted rounded" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {locaisFiltrados.map(l => (
                <div
                  key={l.id}
                  onClick={() => setLocalSel(l)}
                  className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
                    localSel?.id === l.id ? "ring-2 ring-primary shadow-md" : ""
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                      <h3 className="font-semibold">{l.nomePortugues}</h3>
                    </div>
                    {l.latitude && l.longitude && (
                      <a
                        href={`https://www.google.com/maps?q=${l.latitude},${l.longitude}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={e => e.stopPropagation()}
                        className="text-muted-foreground hover:text-primary"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                  {l.nomeOriginal && <p className="text-xs text-muted-foreground mb-2">{l.nomeOriginal}</p>}
                  {l.tipo && (
                    <span className="inline-block px-2 py-0.5 rounded-full text-xs bg-secondary mb-2">{l.tipo}</span>
                  )}
                  {l.descricao && <p className="text-sm text-muted-foreground line-clamp-3">{l.descricao}</p>}
                  {l.latitude && l.longitude && (
                    <p className="text-xs text-muted-foreground mt-2">
                      📍 {l.latitude.toFixed(3)}°, {l.longitude.toFixed(3)}°
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}

          {localSel && (
            <div className="border rounded-lg p-6 space-y-4 bg-muted/30">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold">{localSel.nomePortugues}</h2>
                  {localSel.nomeOriginal && <p className="text-muted-foreground">{localSel.nomeOriginal}</p>}
                </div>
                <button onClick={() => setLocalSel(null)} className="text-muted-foreground hover:text-foreground">✕</button>
              </div>
              {localSel.descricao && <p className="text-sm leading-relaxed">{localSel.descricao}</p>}
              {localSel.historia && (
                <div>
                  <h3 className="font-semibold mb-1">História</h3>
                  <p className="text-sm text-muted-foreground">{localSel.historia}</p>
                </div>
              )}
              {localSel.significadoBiblico && (
                <div>
                  <h3 className="font-semibold mb-1">Significado Bíblico</h3>
                  <p className="text-sm text-muted-foreground">{localSel.significadoBiblico}</p>
                </div>
              )}
            </div>
          )}
        </>
      )}

      {tab === "rotas" && (
        <div className="space-y-3">
          {carregando ? (
            <div className="space-y-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="border rounded-lg p-4 animate-pulse space-y-2">
                  <div className="h-5 bg-muted rounded w-1/3" />
                  <div className="h-4 bg-muted rounded w-2/3" />
                </div>
              ))}
            </div>
          ) : rotas.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Route className="h-12 w-12 mx-auto mb-3 opacity-30" />
              <p>Nenhuma rota encontrada</p>
            </div>
          ) : (
            rotas.map(r => (
              <div key={r.id} className="border rounded-lg p-4 space-y-2 hover:shadow-sm transition-shadow">
                <div className="flex items-center gap-2">
                  <Route className="h-4 w-4 text-primary" />
                  <h3 className="font-semibold">{r.nome}</h3>
                </div>
                {r.descricao && <p className="text-sm text-muted-foreground">{r.descricao}</p>}
                {r.distancia && <p className="text-xs text-muted-foreground">Distância: {r.distancia} km</p>}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
