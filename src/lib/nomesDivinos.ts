/** Lemas que o corpus Strong já identifica como nomes/títulos divinos. Sem inferir falante. */
export const NOMES_DIVINOS: Record<string, { rotulo: string; titulo: string }> = {
  H3068: { rotulo: 'YHWH', titulo: 'Tetragrama YHWH (H3068)' },
  H3069: { rotulo: 'YHWH', titulo: 'Tetragrama YHWH (H3069)' },
  H430: { rotulo: 'Elohim', titulo: 'אֱלֹהִים Elohim (H430)' },
  H136: { rotulo: 'Adonai', titulo: 'אֲדֹנָי Adonai (H136)' },
  G2316: { rotulo: 'θεός', titulo: 'θεός (G2316)' },
  G2962: { rotulo: 'κύριος', titulo: 'κύριος (G2962)' },
};

export function nomeDivino(strong: string | null | undefined) {
  if (!strong) return null;
  return NOMES_DIVINOS[strong] ?? null;
}
