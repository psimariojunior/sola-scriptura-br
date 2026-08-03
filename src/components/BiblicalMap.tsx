'use client';

import { useEffect, useRef, useMemo, useState, useCallback, type CSSProperties } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap, useMapEvent, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import type { LocalizacaoBiblica, RotaBiblica } from '@/data/atlasBiblico';
import 'leaflet/dist/leaflet.css';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const CATEGORIA_CORES: Record<LocalizacaoBiblica['categoria'], string> = {
  cidade: '#3b82f6', montanha: '#a16207', rio: '#0284c7', mar: '#0891b2',
  deserto: '#d97706', vale: '#65a30d', porto: '#0369a1', santuario: '#dc2626',
  pais: '#7c3aed', regiao: '#059669',
};

const CATEGORIA_ICONE: Record<LocalizacaoBiblica['categoria'], string> = {
  cidade: '🏛', montanha: '⛰', rio: '🏞', mar: '🌊',
  deserto: '🏜', vale: '🌿', porto: '⚓', santuario: '✝',
  pais: '🗺', regiao: '📍',
};

const TILE_LAYERS = {
  osm: { url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', attribution: '&copy; OpenStreetMap contributors' },
  satellite: { url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', attribution: '&copy; Esri, Maxar, Earthstar Geographics' },
};

const iconCache = new Map<string, L.DivIcon>();

function createMarkerIcon(color: string, label: string, size: number = 30, isSelected: boolean = false): L.DivIcon {
  const glow = isSelected ? `filter: drop-shadow(0 0 8px ${color});` : '';
  const scale = isSelected ? 1.15 : 1;
  const svg = `
    <div class="atlas-marker-pulse ${isSelected ? 'atlas-marker-selected' : ''}" style="color: ${color}; ${glow}">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 36" width="${size}" height="${Math.round(size * 1.5)}" style="transform: scale(${scale}); position: relative; z-index: 1;">
        <defs>
          <linearGradient id="grad_${color.replace('#','')}" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="${color}" stop-opacity="1"/>
            <stop offset="100%" stop-color="${color}" stop-opacity="0.7"/>
          </linearGradient>
        </defs>
        <path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 24 12 24s12-15 12-24C24 5.4 18.6 0 12 0z"
              fill="url(#grad_${color.replace('#','')})" stroke="#fff" stroke-width="1.8"/>
        <circle cx="12" cy="11" r="5" fill="#fff" opacity="0.95"/>
        <text x="12" y="14.5" text-anchor="middle" font-size="7.5" fill="${color}" font-weight="600">${label}</text>
      </svg>
    </div>`;
  return L.divIcon({
    className: '',
    html: svg,
    iconSize: [size, Math.round(size * 1.5)],
    iconAnchor: [size / 2, Math.round(size * 1.5)],
    popupAnchor: [0, -Math.round(size * 1.5)],
  });
}

function getMarkerIcon(categoria: LocalizacaoBiblica['categoria'], isSelected: boolean): L.DivIcon {
  const color = isSelected ? '#dc2626' : CATEGORIA_CORES[categoria];
  const label = isSelected ? '★' : CATEGORIA_ICONE[categoria];
  const key = `${categoria}_${isSelected}`;
  if (!iconCache.has(key)) {
    iconCache.set(key, createMarkerIcon(color, label, isSelected ? 36 : 30, isSelected));
  }
  return iconCache.get(key)!;
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAP CONTROL COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════════

function FlyToLocation({ selectedId, locais }: { selectedId: string | null; locais: LocalizacaoBiblica[] }) {
  const map = useMap();
  useEffect(() => {
    if (selectedId) {
      const local = locais.find(l => l.id === selectedId);
      if (local) map.flyTo(local.coordenadas, 11, { duration: 1 });
    }
  }, [selectedId, locais, map]);
  return null;
}

function FlyToRegion({ region }: { region: { center: [number, number]; zoom: number } | null }) {
  const map = useMap();
  useEffect(() => {
    if (region) map.flyTo(region.center, region.zoom, { duration: 1.2 });
  }, [region, map]);
  return null;
}

function FitBounds({ locais, selectedId }: { locais: LocalizacaoBiblica[]; selectedId: string | null }) {
  const map = useMap();
  useEffect(() => {
    if (!selectedId && locais.length > 0) {
      const coords = locais.map(l => l.coordenadas);
      if (coords.length === 1) {
        map.setView(coords[0], 9, { duration: 0.5 });
      } else if (coords.length > 1) {
        const bounds = L.latLngBounds(coords);
        if (bounds.isValid()) map.fitBounds(bounds, { padding: [50, 50], maxZoom: 8 });
      }
    }
  }, [locais, selectedId, map]);
  return null;
}

function MapClickHandler({ onClick }: { onClick: () => void }) {
  useMapEvent('click', onClick);
  return null;
}

// ═══════════════════════════════════════════════════════════════════════════════
// ANIMATED POLYLINE — CSS dash animation via SVG
// ═══════════════════════════════════════════════════════════════════════════════

function AnimatedPolyline({
  points, color, opacity = 0.85, weight = 3.5,
}: {
  points: [number, number][]; color: string; opacity?: number; weight?: number;
}) {
  const map = useMap();
  const layerRef = useRef<L.Polyline | null>(null);

  useEffect(() => {
    if (!map || points.length < 2) return;
    if (layerRef.current) {
      map.removeLayer(layerRef.current);
    }
    const polyline = L.polyline(points, {
      color, opacity, weight,
      dashArray: '10 14',
      lineCap: 'round',
      lineJoin: 'round',
    }).addTo(map);

    const pathEl = polyline.getElement();
    if (pathEl) {
      pathEl.classList.add('atlas-animated-route');
    }

    layerRef.current = polyline;
    return () => { if (layerRef.current) { map.removeLayer(layerRef.current); layerRef.current = null; } };
  }, [map, points, color, opacity, weight]);

  return null;
}

// ═══════════════════════════════════════════════════════════════════════════════
// TOOLTIP OVERLAY (HTML tooltip on hover)
// ═══════════════════════════════════════════════════════════════════════════════

function TooltipOverlay({
  containerRef,
  hovered,
  containerRect,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>;
  hovered: { local: LocalizacaoBiblica; x: number; y: number } | null;
  containerRect: DOMRect | null;
}) {
  if (!hovered || !containerRect) return null;
  const x = hovered.x - containerRect.left;
  const y = hovered.y - containerRect.top;
  return (
    <div
      className="atlas-tooltip visible"
      style={{ left: x, top: y - 12 }}
    >
      <span className="tooltip-cat" style={{ backgroundColor: CATEGORIA_CORES[hovered.local.categoria] }} />
      {hovered.local.nome}
      {hovered.local.nomeHebraico && <span style={{ opacity: 0.5, marginLeft: 4, fontSize: 10 }}>{hovered.local.nomeHebraico}</span>}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// PROPS
// ═══════════════════════════════════════════════════════════════════════════════

export interface BiblicalMapProps {
  locais: LocalizacaoBiblica[];
  rotas?: RotaBiblica[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  visibleCategories?: Set<LocalizacaoBiblica['categoria']>;
  visibleRotas?: Set<string>;
  center?: [number, number];
  zoom?: number;
  className?: string;
  style?: CSSProperties;
  flyToRegion?: { center: [number, number]; zoom: number } | null;
}

// ═══════════════════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

export default function BiblicalMap({
  locais, rotas = [], selectedId, onSelect, visibleCategories, visibleRotas,
  center = [31.0, 35.5], zoom = 7, className = 'w-full h-full', style,
  flyToRegion = null,
}: BiblicalMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tileKey, setTileKey] = useState<'osm' | 'satellite'>('osm');
  const [hovered, setHovered] = useState<{ local: LocalizacaoBiblica; x: number; y: number } | null>(null);
  const [containerRect, setContainerRect] = useState<DOMRect | null>(null);

  const filteredLocais = useMemo(() => {
    if (!visibleCategories || visibleCategories.size === 0) return locais;
    return locais.filter(l => visibleCategories.has(l.categoria));
  }, [locais, visibleCategories]);

  const filteredRotas = useMemo(() => {
    if (!visibleRotas || visibleRotas.size === 0) return [];
    return rotas.filter(r => visibleRotas.has(r.id));
  }, [rotas, visibleRotas]);

  const handleMapClick = useCallback(() => { onSelect(null); }, [onSelect]);
  const selectedLocal = useMemo(() => selectedId ? filteredLocais.find(l => l.id === selectedId) : null, [selectedId, filteredLocais]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new ResizeObserver(entries => {
      for (const entry of entries) setContainerRect(entry.contentRect as unknown as DOMRect);
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const tile = TILE_LAYERS[tileKey];

  return (
    <div ref={containerRef} className="relative atlas-map" style={{ height: '100%', width: '100%' }}>
      <TooltipOverlay containerRef={containerRef} hovered={hovered} containerRect={containerRect} />

      <MapContainer center={center} zoom={zoom} className={className} style={{ ...style, height: '100%' }}
        zoomControl={false} scrollWheelZoom={true}>
        <ZoomControl position="topright" />
        <TileLayer key={tileKey} url={tile.url} attribution={tile.attribution} />

        <FlyToLocation selectedId={selectedId} locais={filteredLocais} />
        <FlyToRegion region={flyToRegion} />
        <FitBounds locais={filteredLocais} selectedId={selectedId} />
        <MapClickHandler onClick={handleMapClick} />

        {filteredRotas.map(rota => (
          <AnimatedPolyline key={rota.id} points={rota.pontos} color={rota.cor} weight={3.5} />
        ))}

        {filteredLocais.map(local => (
          <Marker
            key={local.id}
            position={local.coordenadas}
            icon={getMarkerIcon(local.categoria, local.id === selectedId)}
            eventHandlers={{
              click: (e) => { e.originalEvent.stopPropagation(); onSelect(local.id); },
              mouseover: (e) => {
                const target = e.originalEvent?.target as HTMLElement | undefined;
                const rect = target?.getBoundingClientRect?.();
                if (rect) {
                  setHovered({ local, x: rect.left + rect.width / 2, y: rect.top });
                }
              },
              mouseout: () => setHovered(null),
            }}
            zIndexOffset={local.id === selectedId ? 1000 : local.relevancia * 10}
          >
            <Popup maxWidth={360} minWidth={230}>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-block w-3 h-3 rounded-full shrink-0"
                    style={{ backgroundColor: CATEGORIA_CORES[local.categoria], boxShadow: `0 0 6px ${CATEGORIA_CORES[local.categoria]}60` }} />
                  <h3 className="font-bold text-sm leading-tight">{local.nome}</h3>
                </div>
                {local.nomeHebraico && (
                  <p className="text-[11px] text-gray-500 italic mb-1">
                    {local.nomeHebraico}{local.nomeGriego && ` / ${local.nomeGriego}`}
                  </p>
                )}
                <p className="text-xs text-gray-600 leading-relaxed mb-2">{local.descricao}</p>
                <div className="flex flex-wrap gap-1 mb-2">
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full font-medium"
                    style={{ backgroundColor: `${CATEGORIA_CORES[local.categoria]}18`, color: CATEGORIA_CORES[local.categoria] }}>
                    {CATEGORIA_ICONE[local.categoria]} {local.categoria}
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-600 font-medium">
                    {local.periodo === 'at' ? 'AT' : local.periodo === 'nt' ? 'NT' : 'AT/NT'}
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-yellow-50 text-yellow-700 font-medium">
                    {Array.from({ length: local.relevancia }, () => '★').join('')}
                  </span>
                </div>
                {local.versiculos.length > 0 && (
                  <div className="border-t border-gray-100 pt-2 mt-2">
                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Versículos</p>
                    <p className="text-[11px] text-gray-600 leading-relaxed">{local.versiculos.slice(0, 3).join(' · ')}</p>
                  </div>
                )}
                {local.eventos.length > 0 && (
                  <div className="border-t border-gray-100 pt-2 mt-2">
                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Eventos ({local.eventos.length})</p>
                    {local.eventos.slice(0, 2).map((ev, i) => (
                      <div key={i} className="mb-1">
                        <p className="text-[11px] font-medium text-gray-700">{ev.titulo}</p>
                        {ev.dataAproximada && <p className="text-[10px] text-gray-400">{ev.dataAproximada}</p>}
                      </div>
                    ))}
                  </div>
                )}
                <div className="text-[10px] text-gray-300 mt-2 font-mono">
                  {local.coordenadas[0].toFixed(4)}, {local.coordenadas[1].toFixed(4)}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* ═══ LAYER TOGGLE ═══ */}
      <div className="absolute top-2 left-2 z-[1000] flex rounded-lg overflow-hidden border border-border/60 shadow-md bg-card/95 backdrop-blur-sm">
        {(['osm', 'satellite'] as const).map(key => (
          <button key={key} onClick={() => setTileKey(key)}
            className={`px-3 py-1.5 text-[11px] font-medium transition-all ${tileKey === key ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted/50'}`}>
            {key === 'osm' ? '🗺 Mapa' : '🛰 Satélite'}
          </button>
        ))}
      </div>
    </div>
  );
}
