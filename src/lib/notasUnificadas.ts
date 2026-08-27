import type { Nota } from '@/components/NotaEditor';
import { listarMarcas, setAnotacao, type MarcaBiblia } from '@/lib/estudos';
import { hrefBiblia, resolverLivroParam } from '@/lib/bibliaHref';
import { saveNotesOffline } from '@/lib/offlineStorage';

export const VERSE_NOTE_PREFIX = 'verse:';
export const RICH_NOTES_KEY = 'ssb_notas_rich';

export function verseNoteId(livro: string, cap: number, ver: number, trad: string): string {
  return `${VERSE_NOTE_PREFIX}${livro}:${cap}:${ver}:${trad}`;
}

export function parseVerseNoteId(id: string): { livro: string; cap: number; ver: number; trad: string } | null {
  if (!id.startsWith(VERSE_NOTE_PREFIX)) return null;
  const parts = id.slice(VERSE_NOTE_PREFIX.length).split(':');
  if (parts.length < 4) return null;
  return {
    livro: parts[0],
    cap: Number(parts[1]),
    ver: Number(parts[2]),
    trad: parts.slice(3).join(':'),
  };
}

export function hrefFromVerseNoteId(id: string): string | null {
  const parsed = parseVerseNoteId(id);
  if (!parsed) return null;
  return hrefBiblia(parsed.livro, parsed.cap, parsed.ver, [parsed.trad]);
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

function marcaToNota(m: MarcaBiblia): Nota | null {
  if (!m.anotacao?.texto) return null;
  const info = resolverLivroParam(m.livro);
  const iso = new Date(m.anotacao.data).toISOString();
  return {
    id: verseNoteId(m.livro, m.capitulo, m.versiculo, m.traducao),
    titulo: `${info?.nome ?? m.livro} ${m.capitulo}:${m.versiculo}`,
    conteudo: m.anotacao.texto,
    dataCriacao: new Date(m.dataCriacao).toISOString(),
    dataAtualizacao: iso,
    tags: ['Versículo'],
    imagens: [],
    versoes: [],
  };
}

export function lerNotasRich(): Nota[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(RICH_NOTES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function persistirNotasRich(notas: Nota[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(RICH_NOTES_KEY, JSON.stringify(notas));
    saveNotesOffline(notas).catch(() => {});
  } catch {
    /* quota / private mode */
  }
}

export function mergeVerseNotes(notas: Nota[]): Nota[] {
  const fromMarcas = listarMarcas()
    .map(marcaToNota)
    .filter((n): n is Nota => n !== null);

  const byId = new Map<string, Nota>();
  for (const n of notas) byId.set(n.id, n);
  for (const v of fromMarcas) {
    const existing = byId.get(v.id);
    if (!existing) {
      byId.set(v.id, v);
      continue;
    }
    if (new Date(v.dataAtualizacao) > new Date(existing.dataAtualizacao)) {
      byId.set(v.id, { ...existing, titulo: v.titulo, conteudo: v.conteudo, dataAtualizacao: v.dataAtualizacao, tags: existing.tags.includes('Versículo') ? existing.tags : [...existing.tags, 'Versículo'] });
    }
  }

  return Array.from(byId.values()).sort(
    (a, b) => new Date(b.dataAtualizacao).getTime() - new Date(a.dataAtualizacao).getTime()
  );
}

export function salvarAnotacaoUnificada(
  livro: string,
  capitulo: number,
  versiculo: number,
  traducao: string,
  texto: string | null,
): void {
  setAnotacao(livro, capitulo, versiculo, traducao, texto);
  const id = verseNoteId(livro, capitulo, versiculo, traducao);
  const atuais = lerNotasRich();
  if (!texto?.trim()) {
    persistirNotasRich(atuais.filter((n) => n.id !== id));
    return;
  }
  const fake: MarcaBiblia = {
    livro,
    capitulo,
    versiculo,
    traducao,
    texto: '',
    favorito: false,
    cor: null,
    anotacao: { texto: texto.trim(), data: Date.now() },
    dataCriacao: Date.now(),
  };
  const nota = marcaToNota(fake);
  if (!nota) return;
  const idx = atuais.findIndex((n) => n.id === id);
  const next = idx >= 0
    ? atuais.map((n, i) => (i === idx ? { ...n, ...nota, versoes: n.versoes } : n))
    : [nota, ...atuais];
  persistirNotasRich(next);
}

export function aplicarSalvarNotaRich(nota: Nota, todas: Nota[]): Nota[] {
  const parsed = parseVerseNoteId(nota.id);
  if (parsed) {
    const plain = stripHtml(nota.conteudo);
    setAnotacao(parsed.livro, parsed.cap, parsed.ver, parsed.trad, plain || null);
  }
  const exists = todas.findIndex((n) => n.id === nota.id);
  const updated = exists >= 0
    ? todas.map((n) => (n.id === nota.id ? nota : n))
    : [nota, ...todas];
  persistirNotasRich(updated);
  return updated;
}

export function aplicarExcluirNotaRich(id: string, todas: Nota[]): Nota[] {
  const parsed = parseVerseNoteId(id);
  if (parsed) {
    setAnotacao(parsed.livro, parsed.cap, parsed.ver, parsed.trad, null);
  }
  const updated = todas.filter((n) => n.id !== id);
  persistirNotasRich(updated);
  return updated;
}

export function criarNotaDeEstudo(titulo: string, conteudo: string, tags: string[] = ['Estudo', 'IA']): Nota {
  const agora = new Date().toISOString();
  const nota: Nota = {
    id: crypto.randomUUID(),
    titulo,
    conteudo: conteudo
      .split('\n')
      .map((linha) => `<p>${linha.replace(/</g, '&lt;').replace(/>/g, '&gt;') || '<br>'}</p>`)
      .join(''),
    dataCriacao: agora,
    dataAtualizacao: agora,
    tags,
    imagens: [],
    versoes: [],
  };
  const atuais = lerNotasRich();
  persistirNotasRich([nota, ...atuais]);
  return nota;
}

const LEGACY_NOTES_KEY = 'sola-notas';
const SPLIT_NOTES_KEY = 'ssb_split_notes';

function lerJsonArray(key: string): Nota[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(key);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/** Junta ssb_notas_rich, sola-notas, notas do split view e anotações do versículo. */
export function unificarTodasAsNotas(): Nota[] {
  const byId = new Map<string, Nota>();
  const fontes = [...lerNotasRich(), ...lerJsonArray(LEGACY_NOTES_KEY)];

  try {
    const splitRaw = localStorage.getItem(SPLIT_NOTES_KEY);
    const split: Record<string, Nota> = splitRaw ? JSON.parse(splitRaw) : {};
    for (const [key, nota] of Object.entries(split)) {
      if (!nota?.conteudo?.trim()) continue;
      const parts = key.split(':');
      if (parts.length < 4) {
        fontes.push(nota);
        continue;
      }
      const id = verseNoteId(parts[0], Number(parts[1]), Number(parts[2]), parts.slice(3).join(':'));
      fontes.push({
        ...nota,
        id,
        tags: nota.tags?.includes('Versículo') ? nota.tags : [...(nota.tags ?? []), 'Versículo'],
      });
    }
  } catch {
    /* ignore split parse */
  }

  for (const n of fontes) {
    if (!n?.id) continue;
    const existing = byId.get(n.id);
    if (!existing || new Date(n.dataAtualizacao) > new Date(existing.dataAtualizacao)) {
      byId.set(n.id, n);
    }
  }

  const merged = mergeVerseNotes(Array.from(byId.values()));
  persistirNotasRich(merged);
  return merged;
}
