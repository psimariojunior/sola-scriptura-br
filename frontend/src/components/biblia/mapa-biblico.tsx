'use client';

import { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import type * as Leaflet from 'leaflet';

export interface LocalizacaoMapa {
  nomePortugues: string;
  latitude: number | string | null;
  longitude: number | string | null;
  descricao?: string | null;
  slug?: string;
}

interface Props {
  localizacoes: LocalizacaoMapa[];
}

function num(v: string | number | null | undefined): number | null {
  if (v == null) return null;
  const n = typeof v === 'number' ? v : parseFloat(String(v));
  return Number.isFinite(n) ? n : null;
}

export function MapaBiblico({ localizacoes }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Leaflet.Map | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    let cancelled = false;
    let map: Leaflet.Map | null = null;

    (async () => {
      const Lmod: any = await import('leaflet');
      const L = Lmod.default ?? Lmod;
      if (cancelled || !containerRef.current) return;

      map = L.map(containerRef.current, {
        center: [31.5, 34.9],
        zoom: 6,
        scrollWheelZoom: false,
        zoomControl: true,
      });
      mapRef.current = map;

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap',
        maxZoom: 19,
      }).addTo(map);

      const icon = L.divIcon({
        className: 'marcador-biblico',
        html: '<span class="pin-burgundy"></span>',
        iconSize: [16, 16],
        iconAnchor: [8, 8],
        popupAnchor: [0, -10],
      });

      const bounds: [number, number][] = [];
      localizacoes.forEach((loc) => {
        const lat = num(loc.latitude);
        const lng = num(loc.longitude);
        if (lat == null || lng == null || !map) return;
        bounds.push([lat, lng]);
        const marker = L.marker([lat, lng], { icon }).addTo(map);
        const desc = loc.descricao
          ? `<div class="popup-desc">${loc.descricao}</div>`
          : '';
        marker.bindPopup(
          `<div class="popup-biblico"><span class="popup-titulo">${loc.nomePortugues}</span>${desc}</div>`
        );
      });

      if (bounds.length > 0 && map) {
        map.fitBounds(bounds as any, { padding: [40, 40], animate: false });
      }

      setTimeout(() => {
        if (!cancelled && map) map.invalidateSize();
      }, 220);
    })();

    return () => {
      cancelled = true;
      if (map) {
        map.remove();
      }
      mapRef.current = null;
    };
  }, [localizacoes]);

  return (
    <>
      <div className="mapa-biblico-container" ref={containerRef} />
      <style jsx global>{`
        .mapa-biblico-container {
          position: relative;
          height: 500px;
          width: 100%;
          border: 1px solid hsl(var(--border));
          background: hsl(var(--secondary) / 0.3);
          z-index: 0;
          overflow: hidden;
        }
        .marcador-biblico { background: transparent; border: none; }
        .pin-burgundy {
          display: block;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: hsl(var(--burgundy));
          border: 2px solid hsl(var(--background));
          box-shadow: 0 0 0 3px hsl(var(--burgundy) / 0.25), 0 1px 4px rgba(0, 0, 0, 0.35);
          transition: transform 0.2s ease;
        }
        .marcador-biblico:hover .pin-burgundy { transform: scale(1.25); }
        .mapa-biblico-container .leaflet-popup-content-wrapper {
          border-radius: 2px;
          background: hsl(var(--card));
          color: hsl(var(--card-foreground));
          border: 1px solid hsl(var(--border));
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.14);
        }
        .mapa-biblico-container .leaflet-popup-tip {
          background: hsl(var(--card));
          border: 1px solid hsl(var(--border));
        }
        .mapa-biblico-container .leaflet-popup-content { margin: 12px 16px; }
        .popup-biblico {
          font-family: 'Spectral', Georgia, serif;
          min-width: 180px;
          max-width: 260px;
        }
        .popup-biblico .popup-titulo {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.2rem;
          font-weight: 600;
          color: hsl(var(--primary));
          display: block;
          margin-bottom: 4px;
          line-height: 1.2;
        }
        .popup-biblico .popup-desc {
          font-size: 0.82rem;
          line-height: 1.55;
          color: hsl(var(--foreground) / 0.8);
        }
        .mapa-biblico-container .leaflet-control-attribution {
          background: hsl(var(--card) / 0.8);
          color: hsl(var(--muted-foreground));
          font-size: 10px;
        }
        .mapa-biblico-container .leaflet-control-attribution a {
          color: hsl(var(--primary));
        }
        .mapa-biblico-container .leaflet-bar a {
          background: hsl(var(--card));
          color: hsl(var(--foreground));
          border-color: hsl(var(--border));
        }
        .mapa-biblico-container .leaflet-bar a:hover {
          background: hsl(var(--secondary));
        }
      `}</style>
    </>
  );
}

export default MapaBiblico;
