export interface SeminaryNote {
  lessonId: string;
  text: string;
  createdAt: string;
  updatedAt: string;
}

const STORAGE_KEY = 'ssb_seminary_notes';

function getAllNotesMap(): Record<string, SeminaryNote> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveAllNotesMap(map: Record<string, SeminaryNote>): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
}

export function saveNote(lessonId: string, text: string): SeminaryNote {
  const map = getAllNotesMap();
  const existing = map[lessonId];
  const now = new Date().toISOString();

  const note: SeminaryNote = {
    lessonId,
    text,
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
  };

  map[lessonId] = note;
  saveAllNotesMap(map);
  return note;
}

export function getNote(lessonId: string): SeminaryNote | null {
  const map = getAllNotesMap();
  return map[lessonId] ?? null;
}

export function deleteNote(lessonId: string): boolean {
  const map = getAllNotesMap();
  if (!(lessonId in map)) return false;
  delete map[lessonId];
  saveAllNotesMap(map);
  return true;
}

export function getAllNotes(): SeminaryNote[] {
  const map = getAllNotesMap();
  return Object.values(map).sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
}

export function exportNoteAsText(note: SeminaryNote): string {
  const date = new Date(note.updatedAt).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  return [
    `Sola Scriptura — Nota de Estudo`,
    `Aula: ${note.lessonId}`,
    `Atualizado: ${date}`,
    ``,
    note.text,
    ``,
    `---`,
    `solascripturabr.com.br`,
  ].join('\n');
}
