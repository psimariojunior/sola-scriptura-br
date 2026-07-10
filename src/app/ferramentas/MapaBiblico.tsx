'use client';

import { useEffect, useRef, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvent } from 'react-leaflet';
import L from 'leaflet';
import type { LocalBiblico } from '@/data/biblia/locais';

import 'leaflet/dist/leaflet.css';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const CATEGORIA_CORES: Record<string, string> = {
  cidade: '#3b82f6',
  regiao: '#22c55e',
  monte: '#f59e0b',
  mar: '#06b6d4',
  rio: '#0ea5e9',
  deserto: '#f97316',
};

function createColoredIcon(color: string) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 36" width="24" height="36">
    <path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 24 12 24s12-15 12-24C24 5.4 18.6 0 12 0z" fill="${color}" stroke="#fff" stroke-width="1.5"/>
    <circle cx="12" cy="12" r="5" fill="#fff"/>
  </svg>`;
  return L.divIcon({
    className: '',
    html: svg,
    iconSize: [24, 36],
    iconAnchor: [12, 36],
    popupAnchor: [0, -36],
  });
}

const iconCache = new Map<string, L.DivIcon>();

function getIcon(categoria: string, isSelected: boolean) {
  const color = isSelected ? '#dc2626' : (CATEGORIA_CORES[categoria] || '#6b7280');
  const key = `${categoria}_${isSelected}`;
  if (!iconCache.has(key)) {
    iconCache.set(key, createColoredIcon(color));
  }
  return iconCache.get(key)!;
}

function FlyTo({ locais, selectedId }: { locais: LocalBiblico[]; selectedId: string | null }) {
  const map = useMap();

  useEffect(() => {
    if (selectedId) {
      const local = locais.find((l) => l.id === selectedId);
      if (local) {
        map.flyTo([local.lat, local.lng], 10, { duration: 0.8 });
      }
    }
  }, [selectedId, locais, map]);

  useEffect(() => {
    if (!selectedId && locais.length > 0) {
      const bounds = L.latLngBounds(
        locais.map((l) => [l.lat, l.lng] as [number, number])
      );
      if (bounds.isValid()) {
        map.fitBounds(bounds, { padding: [40, 40], maxZoom: 8 });
      }
    }
  }, [locais, selectedId, map]);

  return null;
}

function ClickHandler({ onSelect }: { onSelect: (id: string) => void }) {
  useMapEvent('click', () => {});
  return null;
}

interface Props {
  locais: LocalBiblico[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export default function MapaBiblico({ locais, selectedId, onSelect }: Props) {
  const center: [number, number] = [31.5, 35.5];

  return (
    <MapContainer
      center={center}
      zoom={7}
      className="w-full h-full"
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FlyTo locais={locais} selectedId={selectedId} />
      {locais.map((local) => (
        <Marker
          key={local.id}
          position={[local.lat, local.lng]}
          icon={getIcon(local.categoria, local.id === selectedId)}
          eventHandlers={{ click: () => onSelect(local.id) }}
        >
          <Popup>
            <div className="font-medium">{local.nome}</div>
            <div className="text-xs text-gray-500">{local.nomeEn}</div>
            <div className="text-xs mt-1">{local.descricao}</div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
