'use client';

import dynamic from 'next/dynamic';
import { icon } from 'leaflet';
import type { LocalBiblico } from './page';

const MapContainer = dynamic(() => import('react-leaflet').then(m => m.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(m => m.TileLayer), { ssr: false });
const MarkerComp = dynamic(() => import('react-leaflet').then(m => m.Marker), { ssr: false });
const PopupComp = dynamic(() => import('react-leaflet').then(m => m.Popup), { ssr: false });

function getMarkerIcon(categoria: string) {
  return icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${categoria === 'AT' ? 'gold' : categoria === 'NT' ? 'blue' : 'violet'}.png`,
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });
}

interface MapContentProps {
  locais: LocalBiblico[];
  center: [number, number];
  zoom: number;
  onSelect: (local: LocalBiblico) => void;
}

export default function MapContent({ locais, center, zoom, onSelect }: MapContentProps) {
  return (
    <MapContainer center={center} zoom={zoom} className="h-full w-full z-0" zoomControl={false}>
      <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org">OpenStreetMap</a>' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {locais.map((local, i) => (
        <MarkerComp
          key={i}
          position={[local.lat, local.lng]}
          icon={getMarkerIcon(local.categoria)}
          eventHandlers={{ click: () => onSelect(local) }}
        >
          <PopupComp>
            <div className="min-w-[200px]">
              <h3 className="font-bold text-sm">{local.nome}</h3>
              <p className="text-xs text-gray-600 mt-1">{local.descricao}</p>
              <p className="text-xs text-blue-600 mt-1">{local.referencia}</p>
            </div>
          </PopupComp>
        </MarkerComp>
      ))}
    </MapContainer>
  );
}
