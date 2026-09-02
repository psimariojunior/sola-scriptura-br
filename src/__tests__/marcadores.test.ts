import {
  aplicarOuRemoverMarcador,
  desfazerUltimaMarca,
  getMarcador,
  getUltimaCor,
  listarMarcadoresDoCapitulo,
  removeMarcador,
  setMarcador,
} from '@/lib/marcadores';

describe('marcadores', () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  it('marca um verso e lista no capítulo', () => {
    setMarcador('jo', 3, 16, 'arc', 'yellow');
    expect(getMarcador('jo', 3, 16, 'arc')?.cor).toBe('yellow');
    expect(listarMarcadoresDoCapitulo('jo', 3, 'arc')).toHaveLength(1);
    expect(listarMarcadoresDoCapitulo('jo', 1, 'arc')).toHaveLength(0);
  });

  it('a mesma cor de novo limpa a marca', () => {
    setMarcador('jo', 3, 16, 'arc', 'green');
    expect(aplicarOuRemoverMarcador('jo', 3, 16, 'arc', 'green')).toBeNull();
    expect(getMarcador('jo', 3, 16, 'arc')).toBeNull();
  });

  it('troca de cor sem limpar', () => {
    setMarcador('jo', 3, 16, 'arc', 'yellow');
    expect(aplicarOuRemoverMarcador('jo', 3, 16, 'arc', 'blue')).toBe('blue');
    expect(getMarcador('jo', 3, 16, 'arc')?.cor).toBe('blue');
  });

  it('desfaz a última marca', () => {
    setMarcador('jo', 3, 16, 'arc', 'pink');
    expect(desfazerUltimaMarca()).toBe(true);
    expect(getMarcador('jo', 3, 16, 'arc')).toBeNull();
  });

  it('guarda a última cor usada', () => {
    setMarcador('sl', 23, 1, 'nvi', 'purple');
    expect(getUltimaCor()).toBe('purple');
  });

  it('removeMarcador apaga o verso', () => {
    setMarcador('gn', 1, 1, 'arc', 'orange');
    removeMarcador('gn', 1, 1, 'arc');
    expect(getMarcador('gn', 1, 1, 'arc')).toBeNull();
  });
});
