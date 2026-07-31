const STORAGE_KEY = 'ssb_seminary_favorites';

export interface SeminaryFavorites {
  aulas: string[];
  modulos: string[];
  cursos: string[];
}

function load(): SeminaryFavorites {
  if (typeof window === 'undefined') return { aulas: [], modulos: [], cursos: [] };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : { aulas: [], modulos: [], cursos: [] };
  } catch (e) {
    console.error('[seminary:load-favorites]', e);
    return { aulas: [], modulos: [], cursos: [] };
  }
}

function save(data: SeminaryFavorites) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function toggle(list: string[], id: string): string[] {
  const idx = list.indexOf(id);
  if (idx >= 0) {
    list.splice(idx, 1);
  } else {
    list.push(id);
  }
  return list;
}

export function toggleAulaFavorita(aulaId: string): boolean {
  const data = load();
  toggle(data.aulas, aulaId);
  save(data);
  return data.aulas.includes(aulaId);
}

export function toggleModuloFavorito(moduloId: string): boolean {
  const data = load();
  toggle(data.modulos, moduloId);
  save(data);
  return data.modulos.includes(moduloId);
}

export function toggleCursoFavorito(cursoId: string): boolean {
  const data = load();
  toggle(data.cursos, cursoId);
  save(data);
  return data.cursos.includes(cursoId);
}

export function isAulaFavorita(aulaId: string): boolean {
  return load().aulas.includes(aulaId);
}

export function isModuloFavorito(moduloId: string): boolean {
  return load().modulos.includes(moduloId);
}

export function isCursoFavorito(cursoId: string): boolean {
  return load().cursos.includes(cursoId);
}

export function getFavoritos(): SeminaryFavorites {
  return load();
}
