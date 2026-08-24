// Barrel file — Comentários Reais de Domínio Público
// Reúne todas as coleções de comentários scholars para facilitar importação

export { comentariosMatthewHenry } from './matthew-henry';
export { comentariosJFB } from './jamieson-fausset-brown';
export { comentariosBarnes } from './albert-barnes';

// Tipos e interfaces reutilizáveis
import type { Comentario } from '../comentarios';

export type { Comentario };

// Metadados das coleções
export const metadadosComentarios = {
  matthewHenry: {
    autor: 'Matthew Henry',
    obra: 'Matthew Henry\'s Commentary on the Whole Bible',
    anoInicio: 1706,
    anoFim: 1721,
    morte: 1714,
    dominioPublico: true,
    descricao: 'Comentário versículo a versículo, clássico da hermenêutica protestante. Henry era um puritano galês, ministro da Igreja da Inglaterra.',
  },
  jamiesonFaussetBrown: {
    autor: 'Robert Jamieson, A.R. Fausset, David Brown',
    obra: 'A Commentary, Critical, Experimental, and Practical on the Old and New Testaments',
    ano: 1871,
    morte: 'Todos falecidos há 200+ anos',
    dominioPublico: true,
    descricao: 'Comentário crítico e experimental, combinando erudição com aplicação prática. Uma das obras mais concisas e úteis.',
  },
  albertBarnes: {
    autor: 'Albert Barnes',
    obra: 'Notes on the Whole Bible',
    anoInicio: 1832,
    anoFim: 1857,
    morte: 1870,
    dominioPublico: true,
    descricao: 'Notas explicativas e didáticas, ideais para estudo devocional e acadêmico. Barnes era um presbiteriano americano.',
  },
} as const;
