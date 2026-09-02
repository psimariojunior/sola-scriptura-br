/** Extrai o ID de 11 caracteres de URLs comuns do YouTube. */

const ID_RE = /^[A-Za-z0-9_-]{11}$/;

export function extrairYoutubeId(url?: string | null): string | null {
  if (!url?.trim()) return null;
  const u = url.trim();

  const patterns = [
    /[?&]v=([A-Za-z0-9_-]{11})/,
    /youtu\.be\/([A-Za-z0-9_-]{11})/,
    /youtube\.com\/embed\/([A-Za-z0-9_-]{11})/,
    /youtube-nocookie\.com\/embed\/([A-Za-z0-9_-]{11})/,
    /youtube\.com\/shorts\/([A-Za-z0-9_-]{11})/,
  ];
  for (const re of patterns) {
    const m = u.match(re);
    if (m?.[1] && ID_RE.test(m[1])) return m[1];
  }
  return null;
}

export function youtubeEmbedSrc(id: string): string {
  return `https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1`;
}

export function youtubePosterUrl(id: string): string {
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}

export function youtubeWatchUrl(id: string): string {
  return `https://www.youtube.com/watch?v=${id}`;
}
