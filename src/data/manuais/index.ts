import { manualSoteriologia } from './soteriologia';
import { manualCristologia } from './cristologia';
import { manualPneumatologia } from './pneumatologia';
import { manualEclesiologia } from './eclesiologia';
import { manualEscatologia } from './escatologia';
import { manualAngelologia } from './angelologia';
import { manualBibliologia } from './bibliologia';
import { manualAntropologia } from './antropologia';
import { manualHamartiologia } from './hamartiologia';
import { manualTeologiaProp } from './teologiaProp';
import { ManualBiblico } from '../manuaisBiblicos';

export const manuaisBiblicos: ManualBiblico[] = [
  manualSoteriologia,
  manualCristologia,
  manualPneumatologia,
  manualEclesiologia,
  manualEscatologia,
  manualAngelologia,
  manualBibliologia,
  manualAntropologia,
  manualHamartiologia,
  manualTeologiaProp,
];

export function getManualBySlug(slug: string): ManualBiblico | undefined {
  return manuaisBiblicos.find((m) => m.slug === slug);
}
