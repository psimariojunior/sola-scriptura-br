'use client';

import { useEffect, useRef, useMemo, useState, useCallback, type CSSProperties } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap, useMapEvent, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import type {
  LocalizacaoBiblica,
  RotaBiblica,
} from '@/data/atlasBiblico';

import 'leaflet/dist/leaflet.css';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// ═══════════════════════════════════════════════════════════════════════════════
// CATEGORY COLORS & ICONS
// ═══════════════════════════════════════════════════════════════════════════════

const CATEGORIA_CORES: Record<LocalizacaoBiblica['categoria'], string> = {
  cidade: '#3b82f6',
  montanha: '#a16207',
  rio: '#0284c7',
  mar: '#0891b2',
  deserto: '#d97706',
  vale: '#65a30d',
  porto: '#0369a1',
  santuario: '#dc2626',
  pais: '#7c3aed',
  regiao: '#059669',
};

const CATEGORIA_ICONE: Record<LocalizacaoBiblica['categoria'], string> = {
  cidade: '🏛',
  montanha: '⛰',
  rio: '🏞',
  mar: '🌊',
  deserto: '🏜',
  vale: '🌿',
  porto: '⚓',
  santuario: '✝',
  pais: '🗺',
  regiao: '📍',
};

function createMarkerIcon(color: string, label: string, size: number = 28): L.DivIcon {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 36" width="${size}" height="${Math.round(size * 1.5)}">
    <path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 24 12 24s12-15 12-24C24 5.4 18.6 0 12 0z" fill="${color}" stroke="#fff" stroke-width="1.5"/>
    <circle cx="12" cy="12" r="5.5" fill="#fff"/>
    <text x="12" y="16" text-anchor="middle" font-size="8" fill="${color}">${label}</text>
  </svg>`;
  return L.divIcon({
    className: '',
    html: svg,
    iconSize: [size, Math.round(size * 1.5)],
    iconAnchor: [size / 2, Math.round(size * 1.5)],
    popupAnchor: [0, -Math.round(size * 1.5)],
  });
}

const iconCache = new Map<string, L.DivIcon>();

function getMarkerIcon(categoria: LocalizacaoBiblica['categoria'], isSelected: boolean): L.DivIcon {
  const color = isSelected ? '#dc2626' : CATEGORIA_CORES[categoria];
  const label = isSelected ? '★' : CATEGORIA_ICONE[categoria];
  const key = `${categoria}_${isSelected}`;
  if (!iconCache.has(key)) {
    iconCache.set(key, createMarkerIcon(color, label));
  }
  return iconCache.get(key)!;
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAP CONTROL COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════════

function FlyToLocation({
  selectedId,
  locais,
}: {
  selectedId: string | null;
  locais: LocalizacaoBiblica[];
}) {
  const map = useMap();

  useEffect(() => {
    if (selectedId) {
      const local = locais.find((l) => l.id === selectedId);
      if (local) {
        map.flyTo(local.coordenadas, 10, { duration: 0.8 });
      }
    }
  }, [selectedId, locais, map]);

  return null;
}

function FitBounds({
  locais,
  selectedId,
}: {
  locais: LocalizacaoBiblica[];
  selectedId: string | null;
}) {
  const map = useMap();

  useEffect(() => {
    if (!selectedId && locais.length > 0) {
      const coords = locais.map((l) => l.coordenadas);
      if (coords.length === 1) {
        map.setView(coords[0], 8, { duration: 0.5 });
      } else if (coords.length > 1) {
        const bounds = L.latLngBounds(coords);
        if (bounds.isValid()) {
          map.fitBounds(bounds, { padding: [50, 50], maxZoom: 8 });
        }
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
// ANIMATED POLYLINE (CSS dashoffset animation via Leaflet pane)
// ═══════════════════════════════════════════════════════════════════════════════

function AnimatedPolyline({
  points,
  color,
  opacity = 0.85,
  weight = 3,
  dashArray = '8 12',
}: {
  points: [number, number][];
  color: string;
  opacity?: number;
  weight?: number;
  dashArray?: string;
}) {
  return (
    <Polyline
      positions={points}
      pathOptions={{
        color,
        opacity,
        weight,
        dashArray,
        lineCap: 'round',
        lineJoin: 'round',
      }}
    />
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT PROPS
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
}

// ═══════════════════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

export default function BiblicalMap({
  locais,
  rotas = [],
  selectedId,
  onSelect,
  visibleCategories,
  visibleRotas,
  center = [31.0, 35.5],
  zoom = 7,
  className = 'w-full h-full',
  style,
}: BiblicalMapProps) {
  const filteredLocais = useMemo(() => {
    if (!visibleCategories || visibleCategories.size === 0) return locais;
    return locais.filter((l) => visibleCategories.has(l.categoria));
  }, [locais, visibleCategories]);

  const filteredRotas = useMemo(() => {
    if (!visibleRotas || visibleRotas.size === 0) return [];
    return rotas.filter((r) => visibleRotas.has(r.id));
  }, [rotas, visibleRotas]);

  const handleMapClick = useCallback(() => {
    onSelect(null);
  }, [onSelect]);

  const selectedLocal = useMemo(
    () => (selectedId ? filteredLocais.find((l) => l.id === selectedId) : null),
    [selectedId, filteredLocais]
  );

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      className={className}
      style={style}
      zoomControl={false}
      scrollWheelZoom={true}
    >
      <ZoomControl position="topright" />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FlyToLocation selectedId={selectedId} locais={filteredLocais} />
      <FitBounds locais={filteredLocais} selectedId={selectedId} />
      <MapClickHandler onClick={handleMapClick} />

      {filteredRotas.map((rota) => (
        <AnimatedPolyline
          key={rota.id}
          points={rota.pontos}
          color={rota.cor}
          weight={3}
          opacity={0.7}
        />
      ))}

      {selectedLocal && (
        <AnimatedPolyline
          points={[selectedLocal.coordenadas]}
          color="#dc2626"
          weight={0}
          opacity={0}
        />
      )}

      {filteredLocais.map((local) => (
        <Marker
          key={local.id}
          position={local.coordenadas}
          icon={getMarkerIcon(local.categoria, local.id === selectedId)}
          eventHandlers={{
            click: (e) => {
              e.originalEvent.stopPropagation();
              onSelect(local.id);
            },
          }}
          zIndexOffset={local.id === selectedId ? 1000 : local.relevancia * 10}
        >
          <Popup maxWidth={350} minWidth={220}>
            <div className="p-1">
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="inline-block w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: CATEGORIA_CORES[local.categoria] }}
                />
                <h3 className="font-bold text-sm leading-tight">{local.nome}</h3>
              </div>
              {local.nomeHebraico && (
                <p className="text-[11px] text-gray-500 italic mb-1">
                  {local.nomeHebraico}
                  {local.nomeGriego && ` / ${local.nomeGriego}`}
                </p>
              )}
              <p className="text-xs text-gray-600 leading-relaxed mb-2">{local.descricao}</p>
              <div className="flex flex-wrap gap-1 mb-2">
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-600 font-medium">
                  {local.categoria}
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-600 font-medium">
                  {local.periodo === 'at' ? 'AT' : local.periodo === 'nt' ? 'NT' : 'AT/NT'}
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-600 font-medium">
                  {Array.from({ length: local.relevancia }, () => '★').join('')}
                </span>
              </div>
              {local.versiculos.length > 0 && (
                <div className="border-t border-gray-100 pt-2 mt-2">
                  <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Versículos</p>
                  <p className="text-[11px] text-gray-600 leading-relaxed">
                    {local.versiculos.slice(0, 3).join(' · ')}
                  </p>
                </div>
              )}
              {local.eventos.length > 0 && (
                <div className="border-t border-gray-100 pt-2 mt-2">
                  <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
                    Eventos ({local.eventos.length})
                  </p>
                  {local.eventos.slice(0, 2).map((ev, i) => (
                    <div key={i} className="mb-1">
                      <p className="text-[11px] font-medium text-gray-700">{ev.titulo}</p>
                      {ev.dataAproximada && (
                        <p className="text-[10px] text-gray-400">{ev.dataAproximada}</p>
                      )}
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
  );
}
