"use client";

import { useState, useEffect, useRef } from "react";
import { MapPin, Route, Navigation, ExternalLink, Layers, X, Search } from "lucide-react";

const LOCAIS = [
  { nome: "Jerusalém", lat: 31.7683, lng: 35.2137, tipo: "Cidade", desc: "Cidade santa de Israel, sede do Templo. Local da crucificação e ressurreição de Jesus.", cor: "#ef4444" },
  { nome: "Belém", lat: 31.7049, lng: 35.2078, tipo: "Cidade", desc: "Cidade natal de Jesus e de Davi.", cor: "#ef4444" },
  { nome: "Nazaré", lat: 32.6996, lng: 35.3035, tipo: "Cidade", desc: "Cidade onde Jesus cresceu. Local da Anunciação.", cor: "#ef4444" },
  { nome: "Cafarnaum", lat: 32.88, lng: 35.57, tipo: "Cidade", desc: "Base ministerial de Jesus na Galileia.", cor: "#ef4444" },
  { nome: "Getsemani", lat: 31.778, lng: 35.240, tipo: "Jardim", desc: "Jardim onde Jesus orou antes da prisão.", cor: "#22c55e" },
  { nome: "Calvário", lat: 31.778, lng: 35.229, tipo: "Local", desc: "Local da crucificação de Jesus.", cor: "#a855f7" },
  { nome: "Monte das Oliveiras", lat: 31.785, lng: 35.242, tipo: "Montanha", desc: "Local da Ascensão de Jesus.", cor: "#3b82f6" },
  { nome: "Mar Morto", lat: 31.5, lng: 35.5, tipo: "Mar", desc: "Lago salgado mais baixo do mundo.", cor: "#06b6d4" },
  { nome: "Rio Jordão", lat: 31.85, lng: 35.55, tipo: "Rio", desc: "Rio onde Jesus foi batizado.", cor: "#06b6d4" },
  { nome: "Galileia", lat: 32.8, lng: 35.5, tipo: "Região", desc: "Região onde Jesus ministrou.", cor: "#f59e0b" },
  { nome: "Samaria", lat: 32.28, lng: 35.28, tipo: "Região", desc: "Região central de Israel.", cor: "#f59e0b" },
  { nome: "Damascus", lat: 33.513, lng: 36.276, tipo: "Cidade", desc: "Local da conversão de Paulo.", cor: "#ef4444" },
  { nome: "Antioquia", lat: 36.2, lng: 36.15, tipo: "Cidade", desc: "Base das viagens missionárias de Paulo.", cor: "#ef4444" },
  { nome: "Efeso", lat: 37.94, lng: 27.34, tipo: "Cidade", desc: "Cidade importante na Ásia Menor.", cor: "#ef4444" },
  { nome: "Roma", lat: 41.9, lng: 12.5, tipo: "Cidade", desc: "Capital do Império Romano.", cor: "#ef4444" },
  { nome: "Corinto", lat: 37.91, lng: 22.88, tipo: "Cidade", desc: "Cidade grega importante.", cor: "#ef4444" },
  { nome: "Filipos", lat: 41.01, lng: 24.28, tipo: "Cidade", desc: "Primeira igreja europeia.", cor: "#ef4444" },
  { nome: "Tesalônica", lat: 40.64, lng: 22.94, tipo: "Cidade", desc: "Capital da Macedônia.", cor: "#ef4444" },
  { nome: "Monte Sinai", lat: 28.5388, lng: 33.9742, tipo: "Montanha", desc: "Onde Moisés recebeu a Lei.", cor: "#3b82f6" },
  { nome: "Egito", lat: 30.0, lng: 31.0, tipo: "País", desc: "Império onde Israel foi escravizado.", cor: "#f59e0b" },
  { nome: "Ninive", lat: 36.36, lng: 43.15, tipo: "Cidade", desc: "Capital da Assíria.", cor: "#ef4444" },
  { nome: "Babilônia", lat: 32.53, lng: 44.42, tipo: "Cidade", desc: "Império que destruiu Jerusalém.", cor: "#ef4444" },
  { nome: "Betsaida", lat: 32.91, lng: 35.63, tipo: "Cidade", desc: "Cidade natal de Pedro.", cor: "#ef4444" },
  { nome: "Magdala", lat: 32.83, lng: 35.52, tipo: "Cidade", desc: "Cidade de Maria Madalena.", cor: "#ef4444" },
  { nome: "Engedi", lat: 31.46, lng: 35.39, tipo: "Oásis", desc: "Oásis onde Davi escondeu-se.", cor: "#22c55e" },
  { nome: "Betel", lat: 31.93, lng: 35.22, tipo: "Cidade", desc: "Escada de Jacó.", cor: "#ef4444" },
  { nome: "Hebron", lat: 31.53, lng: 35.07, tipo: "Cidade", desc: "Sepultura dos patriarcas.", cor: "#ef4444" },
  { nome: "Siquém", lat: 32.21, lng: 35.28, tipo: "Cidade", desc: "Jacó comprou um terreno.", cor: "#ef4444" },
  { nome: "Jericó", lat: 31.87, lng: 35.44, tipo: "Cidade", desc: "Cidade mais antiga do mundo.", cor: "#ef4444" },
  { nome: "Sodoma", lat: 31.2, lng: 35.5, tipo: "Cidade", desc: "Cidade destruída por Deus.", cor: "#ef4444" },
  { nome: "Monte Carmelo", lat: 32.73, lng: 35.03, tipo: "Montanha", desc: "Local onde Elias derrotou os profetas de Baal.", cor: "#3b82f6" },
  { nome: "Beersheba", lat: 31.25, lng: 34.79, tipo: "Cidade", desc: "Cidade no extremo sul de Israel.", cor: "#ef4444" },
  { nome: "Tiberias", lat: 32.79, lng: 35.53, tipo: "Cidade", desc: "Cidade à beira do Mar da Galileia.", cor: "#ef4444" },
  { nome: "Mileto", lat: 37.53, lng: 27.28, tipo: "Cidade", desc: "Cidade onde Paulo se despediu.", cor: "#ef4444" },
];

const ROTAS = [
  { nome: "Êxodo", cor: "#ef4444", pontos: [[30.0,31.0],[29.5,33.0],[28.54,33.97],[31.5,35.5]] },
  { nome: "Abraão", cor: "#3b82f6", pontos: [[30.9,47.5],[32.0,35.2],[31.77,35.23]] },
  { nome: "Paulo (1ª viagem)", cor: "#22c55e", pontos: [[36.2,36.15],[38.4,27.14],[37.94,27.34],[33.51,36.28]] },
  { nome: "Paulo (2ª viagem)", cor: "#f59e0b", pontos: [[36.2,36.15],[41.01,24.28],[40.64,22.94],[37.91,22.88],[41.9,12.5]] },
];

function getIcon(tipo: string) {
  const icons: Record<string, string> = {
    "Cidade": "🏙️",
    "Montanha": "⛰️",
    "Rio": "🌊",
    "Mar": "🌊",
    "Região": "📍",
    "País": "🌍",
    "Jardim": "🌳",
    "Local": "✝️",
    "Oásis": "🌴",
  };
  return icons[tipo] || "📍";
}

export default function MapasPage() {
  const [localSel, setLocalSel] = useState<any>(null);
  const [filtro, setFiltro] = useState("");
  const [tipoFiltro, setTipoFiltro] = useState("");
  const [rotaSel, setRotaSel] = useState<string>("");
  const [tab, setTab] = useState<"mapa" | "locais" | "rotas">("mapa");
  const mapRef = useRef<HTMLDivElement>(null);

  const tipos = [...new Set(LOCAIS.map(l => l.tipo))];
  const filtrados = LOCAIS.filter(l =>
    (!filtro || l.nome.toLowerCase().includes(filtro.toLowerCase())) &&
    (!tipoFiltro || l.tipo === tipoFiltro)
  );

  useEffect(() => {
    if (tab === "mapa" && mapRef.current) {
      // Dynamic import of Leaflet
      import("leaflet").then(L => {
        const map = L.map(mapRef.current!).setView([31.5, 35.0], 7);
        
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "© OpenStreetMap",
          maxZoom: 18,
        }).addTo(map);

        // Add markers
        LOCAIS.forEach(local => {
          const marker = L.marker([local.lat, local.lng]).addTo(map);
          marker.bindPopup(`
            <div style="min-width:150px">
              <b>${getIcon(local.tipo)} ${local.nome}</b><br/>
              <small style="color:#666">${local.tipo}</small><br/>
              <small>${local.desc}</small><br/>
              <a href="https://www.google.com/maps?q=${local.lat},${local.lng}" target="_blank" style="color:#3b82f6">Abrir no Maps</a>
            </div>
          `);
        });

        // Add routes
        ROTAS.forEach(rota => {
          const points = rota.pontos.map(p => [p[0], p[1]] as [number, number]);
          L.polyline(points, { color: rota.cor, weight: 3, opacity: 0.7, dashArray: "10, 5" }).addTo(map);
        });

        return () => { map.remove(); };
      });
    }
  }, [tab]);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <MapPin className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">Mapas Bíblicos</h1>
          <p className="text-muted-foreground">{LOCAIS.length} locais interativos com rotas históricas</p>
        </div>
      </div>

      <div className="flex gap-2">
        {(["mapa", "locais", "rotas"] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${tab === t ? "bg-primary text-primary-foreground" : "hover:bg-accent border"}`}>
            {t === "mapa" && <Navigation className="h-4 w-4 inline mr-1" />}
            {t === "locais" && <MapPin className="h-4 w-4 inline mr-1" />}
            {t === "rotas" && <Route className="h-4 w-4 inline mr-1" />}
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {tab === "mapa" && (
        <div className="border rounded-lg overflow-hidden relative" style={{ height: "600px" }}>
          <div ref={mapRef} style={{ width: "100%", height: "100%" }} />
        </div>
      )}

      {tab === "locais" && (
        <>
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input value={filtro} onChange={e => setFiltro(e.target.value)} placeholder="Buscar local..." className="w-full border rounded-lg pl-10 pr-4 py-2 text-sm" />
            </div>
            <select value={tipoFiltro} onChange={e => setTipoFiltro(e.target.value)} className="border rounded-lg px-4 py-2 text-sm">
              <option value="">Todos</option>
              {tipos.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtrados.map((l, i) => (
              <div key={i} onClick={() => setLocalSel(l)} className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${localSel?.nome === l.nome ? "ring-2 ring-primary" : ""}`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">{getIcon(l.tipo)}</span>
                  <h3 className="font-semibold">{l.nome}</h3>
                  <a href={`https://www.google.com/maps?q=${l.lat},${l.lng}`} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="ml-auto text-muted-foreground hover:text-primary"><ExternalLink className="h-3.5 w-3.5" /></a>
                </div>
                <span className="inline-block px-2 py-0.5 rounded-full text-xs bg-secondary mb-2">{l.tipo}</span>
                <p className="text-sm text-muted-foreground line-clamp-2">{l.desc}</p>
                <p className="text-xs text-muted-foreground mt-2">📍 {l.lat.toFixed(3)}°, {l.lng.toFixed(3)}°</p>
              </div>
            ))}
          </div>
        </>
      )}

      {tab === "rotas" && (
        <div className="space-y-3">
          {ROTAS.map((r, i) => (
            <div key={i} className="border rounded-lg p-4 hover:shadow-sm transition-shadow">
              <div className="flex items-center gap-3">
                <div className="w-4 h-1 rounded-full" style={{ backgroundColor: r.cor }} />
                <h3 className="font-semibold">{r.nome}</h3>
              </div>
              <p className="text-sm text-muted-foreground mt-2">{r.pontos.length} pontos • De {r.pontos[0][0].toFixed(1)}°N até {r.pontos[r.pontos.length-1][0].toFixed(1)}°N</p>
            </div>
          ))}
        </div>
      )}

      {localSel && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setLocalSel(null)}>
          <div className="bg-background rounded-xl max-w-lg w-full p-6 space-y-4 shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-bold">{getIcon(localSel.tipo)} {localSel.nome}</h2>
                <span className="inline-block px-2 py-0.5 rounded-full text-xs bg-secondary mt-1">{localSel.tipo}</span>
              </div>
              <button onClick={() => setLocalSel(null)} className="p-1 hover:bg-accent rounded"><X className="h-5 w-5" /></button>
            </div>
            <p className="text-sm leading-relaxed">{localSel.desc}</p>
            <a href={`https://www.google.com/maps?q=${localSel.lat},${localSel.lng}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm text-primary hover:underline"><ExternalLink className="h-3.5 w-3.5" /> Ver no Google Maps</a>
          </div>
        </div>
      )}
    </div>
  );
}
