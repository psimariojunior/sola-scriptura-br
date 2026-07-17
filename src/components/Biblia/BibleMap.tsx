'use client';

import { useEffect, useRef, useMemo, useState, useCallback, type CSSProperties } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap, useMapEvent, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import type { LocalBiblico, RotaBiblica } from '@/data/biblia/locais';
import { Search, X, MapPin, Eye, EyeOff, Layers } from 'lucide-react';

import 'leaflet/dist/leaflet.css';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const CATEGORIA_CORES: Record<LocalBiblico['categoria'], string> = {
  cidade: '#3b82f6',
  monte: '#a16207',
  rio: '#0284c7',
  mar: '#0891b2',
  deserto: '#d97706',
  vale: '#65a30d',
  porto: '#0369a1',
  batalha: '#dc2626',
  estrutura: '#7c3aed',
  regiao: '#059669',
  rota: '#f59e0b',
};

const CATEGORIA_ICONE: Record<LocalBiblico['categoria'], string> = {
  cidade: '\u{1F3DB}',
  monte: '\u26F0',
  rio: '\u{1F3DE}',
  mar: '\u{1F30A}',
  deserto: '\u{1F3DC}',
  vale: '\u{1F33F}',
  porto: '\u2693',
  batalha: '\u{2694}',
  estrutura: '\u271D',
  regiao: '\u{1F4CD}',
  rota: '\u{1F5FA}',
};

const CATEGORIAS = Object.keys(CATEGORIA_CORES) as LocalBiblico['categoria'][];

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

function getMarkerIcon(categoria: LocalBiblico['categoria'], isSelected: boolean): L.DivIcon {
  const color = isSelected ? '#dc2626' : CATEGORIA_CORES[categoria];
  const label = isSelected ? '\u2605' : CATEGORIA_ICONE[categoria];
  const key = `${categoria}_${isSelected}`;
  if (!iconCache.has(key)) {
    iconCache.set(key, createMarkerIcon(color, label));
  }
  return iconCache.get(key)!;
}

function FlyToLocation({
  selectedId,
  locais,
}: {
  selectedId: string | null;
  locais: LocalBiblico[];
}) {
  const map = useMap();

  useEffect(() => {
    if (selectedId) {
      const local = locais.find((l) => l.id === selectedId);
      if (local) {
        map.flyTo([local.lat, local.lng], 10, { duration: 0.8 });
      }
    }
  }, [selectedId, locais, map]);

  return null;
}

function FitBounds({
  locais,
  selectedId,
}: {
  locais: LocalBiblico[];
  selectedId: string | null;
}) {
  const map = useMap();

  useEffect(() => {
    if (!selectedId && locais.length > 0) {
      const coords = locais.map((l) => [l.lat, l.lng] as [number, number]);
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

export interface BibleMapProps {
  locais: LocalBiblico[];
  rotas?: RotaBiblica[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  visibleCategories?: Set<LocalBiblico['categoria']>;
  visibleRotas?: Set<string>;
  center?: [number, number];
  zoom?: number;
  className?: string;
  style?: CSSProperties;
}

export default function BibleMap({
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
}: BibleMapProps) {
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
        <Polyline
          key={rota.id}
          positions={rota.pontos}
          pathOptions={{
            color: rota.cor,
            opacity: 0.85,
            weight: 3,
            dashArray: '8 12',
            lineCap: 'round',
            lineJoin: 'round',
          }}
        />
      ))}

      {filteredLocais.map((local) => (
        <Marker
          key={local.id}
          position={[local.lat, local.lng]}
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
            <div style={{ padding: '4px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    flexShrink: 0,
                    backgroundColor: CATEGORIA_CORES[local.categoria],
                  }}
                />
                <h3 style={{ fontWeight: 700, fontSize: '14px', lineHeight: '1.3', margin: 0 }}>
                  {local.nome}
                </h3>
              </div>
              {local.nomeHebraico && (
                <p style={{ fontSize: '11px', color: '#6b7280', fontStyle: 'italic', margin: '0 0 4px' }}>
                  {local.nomeHebraico}
                  {local.nomeGriego && ` / ${local.nomeGriego}`}
                </p>
              )}
              <p style={{ fontSize: '12px', color: '#4b5563', lineHeight: 1.5, margin: '0 0 8px' }}>
                {local.descricao}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '8px' }}>
                <span style={{ fontSize: '10px', padding: '2px 6px', borderRadius: '9999px', backgroundColor: '#f3f4f6', color: '#4b5563', fontWeight: 500 }}>
                  {local.categoria}
                </span>
                <span style={{ fontSize: '10px', padding: '2px 6px', borderRadius: '9999px', backgroundColor: '#f3f4f6', color: '#4b5563', fontWeight: 500 }}>
                  {local.periodo}
                </span>
                <span style={{ fontSize: '10px', padding: '2px 6px', borderRadius: '9999px', backgroundColor: '#f3f4f6', color: '#4b5563', fontWeight: 500 }}>
                  {'\u2605'.repeat(local.relevancia)}
                </span>
              </div>
              {local.referencias.length > 0 && (
                <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '8px', marginTop: '8px' }}>
                  <p style={{ fontSize: '10px', fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 4px' }}>
                    Refer\u00eancias
                  </p>
                  <p style={{ fontSize: '11px', color: '#6b7280', lineHeight: 1.4, margin: 0 }}>
                    {local.referencias.slice(0, 3).join(' \u00b7 ')}
                  </p>
                </div>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export function BibleMapLegend({
  visibleCategories,
  onToggleCategory,
  rotas,
  visibleRotas,
  onToggleRota,
}: {
  visibleCategories: Set<LocalBiblico['categoria']>;
  onToggleCategory: (cat: LocalBiblico['categoria']) => void;
  rotas: RotaBiblica[];
  visibleRotas: Set<string>;
  onToggleRota: (id: string) => void;
}) {
  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
          Categorias
        </h4>
        <div className="space-y-1">
          {CATEGORIAS.map((cat) => {
            const visible = visibleCategories.has(cat);
            return (
              <button
                key={cat}
                onClick={() => onToggleCategory(cat)}
                className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-muted/50 transition-all"
              >
                <span
                  className="w-3 h-3 rounded-sm flex-shrink-0"
                  style={{ backgroundColor: CATEGORIA_CORES[cat] }}
                />
                <span className={`text-xs flex-1 text-left ${visible ? 'text-foreground' : 'text-muted-foreground line-through'}`}>
                  {CATEGORIA_ICONE[cat]} {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </span>
                {visible ? (
                  <Eye className="w-3 h-3 text-muted-foreground" />
                ) : (
                  <EyeOff className="w-3 h-3 text-muted-foreground" />
                )}
              </button>
            );
          })}
        </div>
      </div>
      {rotas.length > 0 && (
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
            Rotas
          </h4>
          <div className="space-y-1">
            {rotas.map((rota) => {
              const visible = visibleRotas.has(rota.id);
              return (
                <button
                  key={rota.id}
                  onClick={() => onToggleRota(rota.id)}
                  className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-muted/50 transition-all"
                >
                  <span
                    className="w-4 h-1 rounded-full flex-shrink-0"
                    style={{ backgroundColor: rota.cor }}
                  />
                  <span className={`text-xs flex-1 text-left ${visible ? 'text-foreground' : 'text-muted-foreground line-through'}`}>
                    {rota.nome}
                  </span>
                  {visible ? (
                    <Eye className="w-3 h-3 text-muted-foreground" />
                  ) : (
                    <EyeOff className="w-3 h-3 text-muted-foreground" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export function BibleMapSearch({
  busca,
  onBuscaChange,
  resultados,
  onSelect,
  selectedId,
}: {
  busca: string;
  onBuscaChange: (v: string) => void;
  resultados: LocalBiblico[];
  onSelect: (id: string) => void;
  selectedId: string | null;
}) {
  return (
    <div className="p-3 border-b border-border">
      <div className="relative">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
        <input
          type="text"
          value={busca}
          onChange={(e) => onBuscaChange(e.target.value)}
          placeholder="Buscar local..."
          className="w-full pl-8 pr-8 py-2 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
        />
        {busca && (
          <button
            onClick={() => onBuscaChange('')}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
      {busca && resultados.length > 0 && (
        <div className="mt-2 max-h-48 overflow-y-auto space-y-1">
          {resultados.slice(0, 10).map((local) => (
            <button
              key={local.id}
              onClick={() => onSelect(local.id)}
              className={`w-full text-left px-2 py-1.5 rounded-lg text-xs transition-all ${
                selectedId === local.id
                  ? 'bg-primary/10 text-primary'
                  : 'hover:bg-muted/50 text-foreground'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: CATEGORIA_CORES[local.categoria] }}
                />
                {local.nome}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
