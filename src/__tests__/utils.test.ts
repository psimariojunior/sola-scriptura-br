// @ts-nocheck

describe('Audio Fallback', () => {
  it('exports playAudioWithFallback function', async () => {
    const mod = await import('@/lib/audioFallback');
    expect(typeof mod.playAudioWithFallback).toBe('function');
  });

  it('exports stopAudio function', async () => {
    const mod = await import('@/lib/audioFallback');
    expect(typeof mod.stopAudio).toBe('function');
  });

  it('exports preloadVoices function', async () => {
    const mod = await import('@/lib/audioFallback');
    expect(typeof mod.preloadVoices).toBe('function');
  });
});

describe('SEO Utils', () => {
  it('exports generateMetadata function', async () => {
    const mod = await import('@/lib/seo');
    expect(typeof mod.generateMetadata).toBe('function');
  });

  it('exports generateJsonLd function', async () => {
    const mod = await import('@/lib/seo');
    expect(typeof mod.generateJsonLd).toBe('function');
  });

  it('generateMetadata returns correct structure', async () => {
    const { generateMetadata } = await import('@/lib/seo');
    const meta = generateMetadata({ title: 'Test', description: 'Desc', path: '/test' });
    expect(meta.title).toBe('Test | Sola Scriptura BR');
    expect(meta.description).toBe('Desc');
    expect(meta.openGraph?.title).toBe('Test | Sola Scriptura BR');
  });

  it('generateMetadata uses default title when not provided', async () => {
    const { generateMetadata } = await import('@/lib/seo');
    const meta = generateMetadata({});
    expect(meta.title).toBe('Sola Scriptura BR');
  });
});

describe('Collaborative Module', () => {
  it('exports getParticipantId function', async () => {
    const mod = await import('@/lib/collaborative');
    expect(typeof mod.getParticipantId).toBe('function');
  });

  it('exports getParticipantColor function', async () => {
    const mod = await import('@/lib/collaborative');
    expect(typeof mod.getParticipantColor).toBe('function');
  });

  it('exports getParticipantLabel function', async () => {
    const mod = await import('@/lib/collaborative');
    expect(typeof mod.getParticipantLabel).toBe('function');
  });
});

describe('Quiz Data', () => {
  it('exports obterPerguntasAleatorias function', async () => {
    const mod = await import('@/data/quiz');
    expect(typeof mod.obterPerguntasAleatorias).toBe('function');
  });

  it('obterPerguntasAleatorias returns correct number of questions', async () => {
    const { obterPerguntasAleatorias } = await import('@/data/quiz');
    const questions = obterPerguntasAleatorias(5);
    expect(questions).toHaveLength(5);
    questions.forEach(q => {
      expect(q).toHaveProperty('id');
      expect(q).toHaveProperty('enunciado');
      expect(q).toHaveProperty('opcoes');
      expect(q).toHaveProperty('respostaCorreta');
      expect(q.opcoes).toHaveLength(4);
    });
  });
});

describe('Sinonimos', () => {
  it('exports obterTodosGrupos function', async () => {
    const mod = await import('@/lib/sinonimos');
    expect(typeof mod.obterTodosGrupos).toBe('function');
  });

  it('obterTodosGrupos returns array of groups', async () => {
    const { obterTodosGrupos } = await import('@/lib/sinonimos');
    const grupos = obterTodosGrupos();
    expect(Array.isArray(grupos)).toBe(true);
    expect(grupos.length).toBeGreaterThan(0);
  });
});
