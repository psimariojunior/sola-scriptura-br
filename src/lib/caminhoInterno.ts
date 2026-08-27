/** Só permite caminhos relativos do próprio site (bloqueia open redirect). */
export function caminhoInternoSeguro(
  raw: string | null | undefined,
  fallback = '/conta',
): string {
  if (!raw) return fallback;
  let path = raw.trim();
  try {
    path = decodeURIComponent(path);
  } catch {
    return fallback;
  }
  path = path.trim();
  if (!path.startsWith('/')) return fallback;
  if (path.startsWith('//') || path.startsWith('/\\')) return fallback;
  if (path.includes('://') || path.includes('\\')) return fallback;
  if (/[\u0000-\u001f]/.test(path)) return fallback;
  return path;
}
