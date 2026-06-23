"use client";

import { useState, useEffect } from "react";
import { apiGeografia } from "@/lib/api";
import { MapPin, Navigation, Route } from "lucide-react";

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

interface Rota {
  id: string;
  nome: string;
  descricao: string;
  distancia: number;
}

export default function MapasPage() {
  const [locais, setLocais] = useState<Localizacao[]>([]);
  const [rotas, setRotas] = useState<Rota[]>([]);
  const [tab, setTab] = useState<"mapa" | "locais" | "rotas">("locais");
  const [localSel, setLocalSel] = useState<Localizacao | null>(null);
  const [filtro, setFiltro] = useState("");
  const [carregando, setCarregando] = useState(true);

  useEffect(() => { carregar(); }, []);

  async function carregar() {
    try {
      const [resLoc, resRot] = await Promise.all([
        apiGeografia.listarLocalizacoes(),
        apiGeografia.listarRotas(),
      ]);
      setLocais(resLoc.data || []);
      setRotas(resRot.data || []);
    } catch { console.error("Erro ao carregar mapas"); }
    setCarregando(false);
  }

  const locaisFiltrados = locais.filter(l =>
    !filtro || l.nomePortugues?.toLowerCase().includes(filtro.toLowerCase()) || l.tipo?.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <MapPin className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">Mapas Interativos</h1>
          <p className="text-muted-foreground">Geografia bíblica e rotas históricas</p>
        </div>
      </div>

      <div className="flex gap-2">
        {(["locais", "rotas", "mapa"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              tab === t ? "bg-primary text-primary-foreground" : "hover:bg-accent border"
            }`}
          >
            {t === "locais" && <MapPin className="h-4 w-4 inline mr-1" />}
            {t === "rotas" && <Route className="h-4 w-4 inline mr-1" />}
            {t === "mapa" && <Navigation className="h-4 w-4 inline mr-1" />}
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {tab === "locais" && (
        <>
          <input
            value={filtro}
            onChange={e => setFiltro(e.target.value)}
            placeholder="Filtrar por nome ou tipo..."
            className="w-full border rounded-lg px-4 py-2 text-sm"
          />
          {carregando ? <p className="text-muted-foreground">Carregando...</p> : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {locaisFiltrados.map(l => (
                <div
                  key={l.id}
                  onClick={() => setLocalSel(l)}
                  className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
                    localSel?.id === l.id ? "ring-2 ring-primary" : ""
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <MapPin className="h-4 w-4 text-primary" />
                    <h3 className="font-semibold">{l.nomePortugues}</h3>
                  </div>
                  {l.nomeOriginal && <p className="text-xs text-muted-foreground mb-1">{l.nomeOriginal}</p>}
                  <span className="inline-block px-2 py-0.5 rounded-full text-xs bg-secondary mb-2">{l.tipo}</span>
                  {l.descricao && <p className="text-sm text-muted-foreground line-clamp-2">{l.descricao}</p>}
                  <p className="text-xs text-muted-foreground mt-1">{l.latitude?.toFixed(2)}°, {l.longitude?.toFixed(2)}°</p>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {tab === "rotas" && (
        <div className="space-y-3">
          {carregando ? <p className="text-muted-foreground">Carregando...</p> : rotas.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">Nenhuma rota encontrada</p>
          ) : rotas.map(r => (
            <div key={r.id} className="border rounded-lg p-4 space-y-1">
              <div className="flex items-center gap-2">
                <Route className="h-4 w-4 text-primary" />
                <h3 className="font-semibold">{r.nome}</h3>
              </div>
              {r.descricao && <p className="text-sm text-muted-foreground">{r.descricao}</p>}
              {r.distancia && <p className="text-xs text-muted-foreground">Distância: {r.distancia} km</p>}
            </div>
          ))}
        </div>
      )}

      {tab === "mapa" && (
        <div className="border rounded-lg overflow-hidden" style={{ height: "500px" }}>
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <div className="text-center space-y-2">
              <MapPin className="h-12 w-12 mx-auto text-muted-foreground" />
              <p className="text-muted-foreground">Mapa interativo</p>
              <p className="text-xs text-muted-foreground">Selecione um local na aba &quot;Locais&quot; para ver no mapa</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
