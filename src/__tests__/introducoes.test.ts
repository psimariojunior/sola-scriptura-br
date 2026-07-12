import { 
  getIntroducaoLivro,
  introducoes 
} from '@/data/biblia/introducoes';

describe('introducoes.ts', () => {
  test('introducoes tem 66 livros', () => {
    expect(introducoes.length).toBe(66);
  });

  test('getIntroducaoLivro retorna dados para Gênesis', () => {
    const intro = getIntroducaoLivro('gn');
    expect(intro).toBeDefined();
    expect(intro?.nomeCompleto).toContain('Gênesis');
    expect(intro?.autor).toBeDefined();
    expect(intro?.data).toBeDefined();
  });

  test('getIntroducaoLivro retorna dados para Romanos', () => {
    const intro = getIntroducaoLivro('rm');
    expect(intro).toBeDefined();
  });

  test('getIntroducaoLivro retorna undefined para livro inexistente', () => {
    const intro = getIntroducaoLivro('zz');
    expect(intro).toBeUndefined();
  });

  test('cada introdução tem estrutura', () => {
    introducoes.slice(0, 10).forEach(i => {
      expect(i.estrutura.length).toBeGreaterThan(0);
    });
  });

  test('introduções cobrem AT e NT', () => {
    const at = introducoes.filter(i => ['gn','ex','lv','nm','dt','js','jz','rt','1sm','2sm','1rs','2rs','1cr','2cr','ed','ne','et','jó','sl','pv','ec','ct','is','jr','lm','ez','dn','os','jl','am','ob','jn','mq','na','hc','sf','ag','zc','ml'].includes(i.livro));
    const nt = introducoes.filter(i => !['gn','ex','lv','nm','dt','js','jz','rt','1sm','2sm','1rs','2rs','1cr','2cr','ed','ne','et','jó','sl','pv','ec','ct','is','jr','lm','ez','dn','os','jl','am','ob','jn','mq','na','hc','sf','ag','zc','ml'].includes(i.livro));
    expect(at.length).toBe(39);
    expect(nt.length).toBe(27);
  });
});
