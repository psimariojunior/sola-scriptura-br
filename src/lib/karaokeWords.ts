/**
 * Karaokê honesto: o índice da palavra vem do progresso real do áudio
 * (currentTime / duration), ponderado pelo comprimento das palavras.
 * Não há timestamps de palavra do Edge TTS — não inventamos.
 */

export function splitKaraokeWords(text: string): string[] {
  return text.split(/\s+/).filter(Boolean);
}

export function karaokeWordIndex(words: string[], progress: number): number {
  if (words.length === 0) return -1;
  if (!Number.isFinite(progress) || progress < 0) return -1;
  const p = Math.min(1, progress);
  if (p <= 0) return 0;
  const weights = words.map((w) => Math.max(1, w.replace(/[^\p{L}\p{N}]+/gu, '').length || w.length));
  const total = weights.reduce((a, b) => a + b, 0);
  let acc = 0;
  const target = p * total;
  for (let i = 0; i < weights.length; i++) {
    acc += weights[i];
    if (target <= acc) return i;
  }
  return words.length - 1;
}

export function karaokeProgressFromAudio(currentTime: number, duration: number): number {
  if (!Number.isFinite(duration) || duration <= 0) return 0;
  if (!Number.isFinite(currentTime) || currentTime <= 0) return 0;
  return Math.min(1, currentTime / duration);
}
