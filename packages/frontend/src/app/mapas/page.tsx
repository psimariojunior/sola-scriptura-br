"use client";

import { useState, useEffect } from "react";
import { MapPin, Route, Navigation, ExternalLink, Layers } from "lucide-react";

const LOCAIS_FIXOS = [
  { nome: "Jerusalém", lat: 31.7683, lng: 35.2137, tipo: "Cidade", desc: "Cidade santa de Israel, sede do Templo." },
  { nome: "Belém", lat: 31.7049, lng: 35.2078, tipo: "Cidade", desc: "Cidade natal de Jesus." },
  { nome: "Nazaré", lat: 32.6996, lng: 35.3035, tipo: "Cidade", desc: "Cidade onde Jesus cresceu." },
  { nome: "Cafarnaum", lat: 32.88, lng: 35.57, tipo: "Cidade", desc: "Base ministerial de Jesus." },
  { nome: "Getsemani", lat: 31.778, lng: 35.240, tipo: "Jardim", desc: "Jardim onde Jesus orou." },
  { nome: "Calvário", lat: 31.778, lng: 35.229, tipo: "Local", desc: "Local da crucificação." },
  { nome: "Monte das Oliveiras", lat: 31.785, lng: 35.242, tipo: "Montanha", desc: "Local da Ascensão." },
  { nome: "Mar Morto", lat: 31.5, lng: 35.5, tipo: "Mar", desc: "Lago salgado mais baixo do mundo." },
  { nome: "Rio Jordão", lat: 31.85, lng: 35.55, tipo: "Rio", desc: "Rio do batismo de Jesus." },
  { nome: "Galileia", lat: 32.8, lng: 35.5, tipo: "Região", desc: "Região dos milagres de Jesus." },
  { nome: "Samaria", lat: 32.28, lng: 35.28, tipo: "Região", desc: "Região central de Israel." },
  { nome: "Damascus", lat: 33.513, lng: 36.276, tipo: "Cidade", desc: "Local da conversão de Paulo." },
  { nome: "Antioquia", lat: 36.2, lng: 36.15, tipo: "Cidade", desc: "Base das viagens missionárias." },
  { nome: "Efeso", lat: 37.94, lng: 27.34, tipo: "Cidade", desc: "Cidade importante na Ásia Menor." },
  { nome: "Roma", lat: 41.9, lng: 12.5, tipo: "Cidade", desc: "Capital do Império Romano." },
  { nome: "Corinto", lat: 37.91, lng: 22.88, tipo: "Cidade", desc: "Cidade grega importante." },
  { nome: "Filipos", lat: 41.01, lng: 24.28, tipo: "Cidade", desc: "Primeira igreja europeia." },
  { nome: "Tesalônica", lat: 40.64, lng: 22.94, tipo: "Cidade", desc: "Capital da Macedônia." },
  { nome: "Monte Sinai", lat: 28.5388, lng: 33.9742, tipo: "Montanha", desc: "Onde Moisés recebeu a Lei." },
  { nome: "Egito", lat: 30.0, lng: 31.0, tipo: "País", desc: "Império onde Israel foi escravizado." },
  { nome: "Ninive", lat: 36.36, lng: 43.15, tipo: "Cidade", desc: "Capital da Assíria." },
  { nome: "Babilônia", lat: 32.53, lng: 44.42, tipo: "Cidade", desc: "Império que destruiu Jerusalém." },
  { nome: "Betsaida", lat: 32.91, lng: 35.63, tipo: "Cidade", desc: "Cidade natal de Pedro." },
  { nome: "Magdala", lat: 32.83, lng: 35.52, tipo: "Cidade", desc: "Cidade de Maria Madalena." },
  { nome: "Engedi", lat: 31.46, lng: 35.39, tipo: "Oásis", desc: "Oásis onde Davi escondeu-se." },
  { nome: "Betel", lat: 31.93, lng: 35.22, tipo: "Cidade", desc: "Escada de Jacó." },
  { nome: "Hebron", lat: 31.53, lng: 35.07, tipo: "Cidade", desc: "Sepultura dos patriarcas." },
  { nome: "Siquém", lat: 32.21, lng: 35.28, tipo: "Cidade", desc: "Jacó comprou um terreno." },
  { nome: "Jericó", lat: 31.87, lng: 35.44, tipo: "Cidade", desc: "Cidade mais antiga do mundo." },
  { nome: "Sodoma", lat: 31.2, lng: 35.5, tipo: "Cidade", desc: "Cidade destruída por Deus." },
];

const ROTAS_FIXAS = [
  { nome: "Êxodo", cor: "#e74c3c", pontos: [[30.0,31.0],[29.5,33.0],[28.54,33.97],[31.5,35.5]] },
  { nome: "Abraão", cor: "#3498db", pontos: [[30.9,47.5],[32.0,35.2],[31.77,35.23]] },
  { nome: "Paulo (1ª viagem)", cor: "#2ecc71", pontos: [[36.2,36.15],[38.4,27.14],[37.94,27.34],[33.51,36.28]] },
];

export default function MapasPage() {
  const [locais, setLocais] = useState<any[]>([]);
  const [tab, setTab] = useState<"mapa" | "locais" | "rotas">("mapa");
  const [localSel, setLocalSel] = useState<any>(null);
  const [filtro, setFiltro] = useState("");
  const [tipoFiltro, setTipoFiltro] = useState("");
  const [rotaSel, setRotaSel] = useState<string>("");

  useEffect(() => {
    fetch("/api/v1/geografia/localizacoes")
      .then(r => r.json())
      .then(data => {
        const apiLocais = Array.isArray(data) ? data : [];
        const todos = [...LOCAIS_FIXOS.map((l, i) => ({ ...l, id: `fix-${i}` })), ...apiLocais];
        setLocais(todos);
      })
      .catch(() => setLocais(LOCAIS_FIXOS.map((l, i) => ({ ...l, id: `fix-${i}` }))));
  }, []);

  const tipos = [...new Set(locais.map(l => l.tipo).filter(Boolean))];
  const filtrados = locais.filter(l =>
    (!filtro || l.nomePortugues?.toLowerCase().includes(filtro.toLowerCase()) || l.nome?.toLowerCase().includes(filtro.toLowerCase())) &&
    (!tipoFiltro || l.tipo === tipoFiltro)
  );

  const allLocais = locais.length > 0 ? locais : LOCAIS_FIXOS;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <MapPin className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">Mapas Bíblicos</h1>
          <p className="text-muted-foreground">{allLocais.length} locais interativos</p>
        </div>
      </div>

      <div className="flex gap-2">
        {(["mapa", "locais", "rotas"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              tab === t ? "bg-primary text-primary-foreground" : "hover:bg-accent border"
            }`}
          >
            {t === "mapa" && <Navigation className="h-4 w-4 inline mr-1" />}
            {t === "locais" && <MapPin className="h-4 w-4 inline mr-1" />}
            {t === "rotas" && <Route className="h-4 w-4 inline mr-1" />}
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {tab === "mapa" && (
        <div className="border rounded-lg overflow-hidden" style={{ height: "600px" }}>
          <iframe
            src={`https://www.openstreetmap.org/export/embed.html?bbox=25.0,25.0,45.0,42.0&layer=mapnik&marker=31.77,35.23`}
            style={{ width: "100%", height: "100%", border: "none" }}
            title="Mapa Bíblico"
            loading="lazy"
          />
          <div className="absolute top-4 right-4 bg-background/95 backdrop-blur rounded-lg p-3 shadow-lg max-h-60 overflow-y-auto text-xs space-y-1">
            <p className="font-semibold mb-1">Locais no mapa:</p>
            {allLocais.slice(0, 15).map((l, i) => (
              <div key={i} className="flex items-center gap-1">
                <MapPin className="h-3 w-3 text-primary" />
                <span>{l.nomePortugues || l.nome}</span>
              </div>
            ))}
          </div>
        </div>
      )}

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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtrados.map(l => (
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
                    <h3 className="font-semibold">{l.nomePortugues || l.nome}</h3>
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
                <span className="inline-block px-2 py-0.5 rounded-full text-xs bg-secondary mb-2">{l.tipo}</span>
                {l.descricao && <p className="text-sm text-muted-foreground line-clamp-3">{l.descricao}</p>}
              </div>
            ))}
          </div>
        </>
      )}

      {tab === "rotas" && (
        <div className="space-y-3">
          {ROTAS_FIXAS.map(r => (
            <div key={r.nome} className="border rounded-lg p-4 hover:shadow-sm transition-shadow">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: r.cor }} />
                <h3 className="font-semibold">{r.nome}</h3>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                {r.pontos.length} pontos • {r.pontos[0][0].toFixed(1)}°N → {r.pontos[r.pontos.length-1][0].toFixed(1)}°N
              </p>
            </div>
          ))}
        </div>
      )}

      {localSel && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setLocalSel(null)}>
          <div className="bg-background rounded-xl max-w-lg w-full p-6 space-y-4 shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-bold">{localSel.nomePortugues || localSel.nome}</h2>
                {localSel.nomeOriginal && <p className="text-muted-foreground text-sm">{localSel.nomeOriginal}</p>}
              </div>
              <button onClick={() => setLocalSel(null)} className="text-muted-foreground hover:text-foreground">✕</button>
            </div>
            <span className="inline-block px-2 py-0.5 rounded-full text-xs bg-secondary">{localSel.tipo}</span>
            {localSel.descricao && <p className="text-sm leading-relaxed">{localSel.descricao}</p>}
            {localSel.latitude && localSel.longitude && (
              <a
                href={`https://www.google.com/maps?q=${localSel.latitude},${localSel.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
              >
                <ExternalLink className="h-3.5 w-3.5" /> Ver no Google Maps
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
