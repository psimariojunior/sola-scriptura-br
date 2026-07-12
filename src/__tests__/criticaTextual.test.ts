import { 
  getVariantePorLivro,
  temVarianteSignificativa 
} from '@/data/biblia/criticaTextual';

describe('criticaTextual.ts', () => {
  test('getVariantePorLivro retorna variantes de Marcos', () => {
    const variantes = getVariantePorLivro('mc');
    expect(Array.isArray(variantes)).toBe(true);
    expect(variantes.length).toBeGreaterThan(0);
  });

  test('temVarianteSignificativa retorna true para Mc 16:9-20', () => {
    expect(temVarianteSignificativa('mc:16:9-20')).toBe(true);
  });

  test('temVarianteSignificativa retorna true para Jo 7:53-8:11', () => {
    expect(temVarianteSignificativa('jo:7:53-8:11')).toBe(true);
  });

  test('temVarianteSignificativa retorna false para versículo sem variante', () => {
    expect(temVarianteSignificativa('gn:1:1')).toBe(false);
  });
});
