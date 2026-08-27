export function textoVersiculoParaShare(
  livro: string,
  capitulo: number,
  versiculo: number,
  texto: string,
  traducao?: string,
): string {
  const ref = `${livro} ${capitulo}:${versiculo}`;
  const trad = traducao ? ` ${traducao.toUpperCase()}` : '';
  return `"${texto}"\n\n— ${ref}${trad}\nsolascripturabr.com.br`;
}

function inAppNativo(): boolean {
  if (typeof navigator === 'undefined') return false;
  return /SolaScriptura/i.test(navigator.userAgent);
}

export async function compartilharVersiculo(opts: {
  livro: string;
  capitulo: number;
  versiculo: number;
  texto: string;
  traducao?: string;
}): Promise<'nativo' | 'web' | 'copiado'> {
  const text = textoVersiculoParaShare(opts.livro, opts.capitulo, opts.versiculo, opts.texto, opts.traducao);
  const title = `${opts.livro} ${opts.capitulo}:${opts.versiculo}`;
  const w = window as Window & { __SSB_SHARE?: (t: string, url?: string) => void };

  if (typeof w.__SSB_SHARE === 'function') {
    w.__SSB_SHARE(text);
    return 'nativo';
  }

  if (inAppNativo()) {
    window.location.href = `ssb-share://${encodeURIComponent(text)}`;
    return 'nativo';
  }

  if (typeof navigator.share === 'function') {
    try {
      await navigator.share({ title, text });
      return 'web';
    } catch (err) {
      if ((err as DOMException)?.name === 'AbortError') throw err;
    }
  }

  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
  }
  return 'copiado';
}
