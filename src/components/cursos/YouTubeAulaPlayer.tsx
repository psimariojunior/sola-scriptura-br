'use client';

import { useState } from 'react';
import { Play } from 'lucide-react';
import {
  extrairYoutubeId,
  youtubeEmbedSrc,
  youtubePosterUrl,
  youtubeWatchUrl,
} from '@/lib/youtubeEmbed';

interface YouTubeAulaPlayerProps {
  url?: string;
  titulo: string;
  subtitulo?: string;
}

export function YouTubeAulaPlayer({ url, titulo, subtitulo }: YouTubeAulaPlayerProps) {
  const id = extrairYoutubeId(url);
  const [ativo, setAtivo] = useState(false);

  if (!id) {
    return (
      <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-[var(--surface-sunken)] ring-1 ring-[var(--border)]/20 flex flex-col items-center justify-center gap-2 px-4 text-center">
        <p className="text-sm font-medium text-[var(--content-primary)]">Vídeo indisponível</p>
        <p className="text-xs text-[var(--content-muted)] max-w-sm leading-relaxed">
          Este recorte não tem um endereço de YouTube válido. O texto da aula abaixo continua valendo.
        </p>
        {url ? (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center min-h-[44px] px-3 text-xs font-semibold text-[var(--brand-default)] hover:underline"
          >
            Tentar o link original
          </a>
        ) : null}
      </div>
    );
  }

  const watch = youtubeWatchUrl(id);

  return (
    <div className="space-y-3">
      <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black ring-1 ring-[var(--border)]/20">
        {ativo ? (
          <iframe
            src={`${youtubeEmbedSrc(id)}&autoplay=1`}
            title={titulo}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        ) : (
          <button
            type="button"
            onClick={() => setAtivo(true)}
            className="absolute inset-0 w-full h-full group min-h-[44px]"
            aria-label={`Reproduzir: ${titulo}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={youtubePosterUrl(id)}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />
            <span className="absolute inset-0 bg-black/35 group-hover:bg-black/45 transition-colors" />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="w-14 h-14 rounded-full bg-[var(--brand-default)] text-white flex items-center justify-center shadow-lg">
                <Play className="w-6 h-6 ml-0.5" fill="currentColor" />
              </span>
            </span>
          </button>
        )}
      </div>
      <div className="flex items-center justify-between gap-2 px-1">
        <div className="flex items-center gap-2 text-xs text-[var(--content-muted)] min-w-0">
          <Play className="w-3 h-3 text-[var(--brand-default)] shrink-0" />
          <span className="font-medium truncate">{subtitulo || titulo}</span>
        </div>
        <a
          href={watch}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 inline-flex items-center min-h-[44px] text-[10px] text-[var(--brand-default)] hover:underline"
        >
          Abrir no YouTube
        </a>
      </div>
    </div>
  );
}
