import { PerguntaSchema, PerguntaStreamSchema, EstudoSchema, CookieClearSchema, SyncSchema, validateBody } from '@/lib/api-schemas';

if (typeof Response === 'undefined') {
  (global as any).Response = class Response {
    static json(data: unknown, init?: ResponseInit) {
      return { status: init?.status ?? 200, json: async () => data };
    }
    constructor(public body?: unknown, public init?: ResponseInit) {}
  };
}

describe('API Schemas', () => {
  describe('PerguntaSchema', () => {
    it('aceita pergunta valida', () => {
      const result = PerguntaSchema.safeParse({ consulta: 'O que e graça?' });
      expect(result.success).toBe(true);
    });
    it('rejeita consulta vazia', () => {
      const result = PerguntaSchema.safeParse({ consulta: '' });
      expect(result.success).toBe(false);
    });
    it('rejeita consulta maior que 2000 chars', () => {
      const result = PerguntaSchema.safeParse({ consulta: 'a'.repeat(2001) });
      expect(result.success).toBe(false);
    });
    it('aceita exatamente 2000 chars', () => {
      const result = PerguntaSchema.safeParse({ consulta: 'a'.repeat(2000) });
      expect(result.success).toBe(true);
    });
    it('aceita tradicao opcional', () => {
      const result = PerguntaSchema.safeParse({ consulta: 'teste', tradicao: 'reformada' });
      expect(result.success).toBe(true);
    });
    it('rejeita tradicao maior que 100 chars', () => {
      const result = PerguntaSchema.safeParse({ consulta: 'teste', tradicao: 'x'.repeat(101) });
      expect(result.success).toBe(false);
    });
    it('aceita contexto opcional', () => {
      const result = PerguntaSchema.safeParse({ consulta: 'teste', contexto: 'Historico' });
      expect(result.success).toBe(true);
    });
    it('rejeita contexto maior que 5000 chars', () => {
      const result = PerguntaSchema.safeParse({ consulta: 'teste', contexto: 'x'.repeat(5001) });
      expect(result.success).toBe(false);
    });
    it('rejeita campo consulta ausente', () => {
      const result = PerguntaSchema.safeParse({});
      expect(result.success).toBe(false);
    });
  });

  describe('PerguntaStreamSchema', () => {
    it('aceita pergunta valida via campo "pergunta"', () => {
      const result = PerguntaStreamSchema.safeParse({ pergunta: 'O que e pecado?' });
      expect(result.success).toBe(true);
    });
    it('rejeita pergunta vazia', () => {
      const result = PerguntaStreamSchema.safeParse({ pergunta: '' });
      expect(result.success).toBe(false);
    });
    it('rejeita pergunta maior que 2000 chars', () => {
      const result = PerguntaStreamSchema.safeParse({ pergunta: 'a'.repeat(2001) });
      expect(result.success).toBe(false);
    });
    it('aceita campos opcionais', () => {
      const result = PerguntaStreamSchema.safeParse({
        pergunta: 'teste',
        tradicao: 'catolica',
        contexto: 'Novo Testamento',
      });
      expect(result.success).toBe(true);
    });
  });

  describe('EstudoSchema', () => {
    it('aceita passagem valida', () => {
      const result = EstudoSchema.safeParse({ passagem: 'João 3:16' });
      expect(result.success).toBe(true);
    });
    it('rejeita passagem vazia', () => {
      const result = EstudoSchema.safeParse({ passagem: '' });
      expect(result.success).toBe(false);
    });
    it('aceita tipo opcional', () => {
      const result = EstudoSchema.safeParse({ passagem: 'Rom 8:28', tipo: 'exegetico' });
      expect(result.success).toBe(true);
    });
    it('rejeita passagem maior que 200 chars', () => {
      const result = EstudoSchema.safeParse({ passagem: 'x'.repeat(201) });
      expect(result.success).toBe(false);
    });
  });

  describe('SyncSchema', () => {
    it('aceita tipo favoritos', () => {
      const result = SyncSchema.safeParse({ tipo: 'favoritos', dados: { v1: true } });
      expect(result.success).toBe(true);
    });
    it('aceita tipo notas', () => {
      const result = SyncSchema.safeParse({ tipo: 'notas', dados: { n1: 'nota' } });
      expect(result.success).toBe(true);
    });
    it('aceita tipo colecoes', () => {
      const result = SyncSchema.safeParse({ tipo: 'colecoes', dados: {} });
      expect(result.success).toBe(true);
    });
    it('aceita tipo progresso', () => {
      const result = SyncSchema.safeParse({ tipo: 'progresso', dados: { streak: 5 } });
      expect(result.success).toBe(true);
    });
    it('rejeita tipo invalido', () => {
      const result = SyncSchema.safeParse({ tipo: 'invalido', dados: {} });
      expect(result.success).toBe(false);
    });
    it('rejeita dados ausentes', () => {
      const result = SyncSchema.safeParse({ tipo: 'favoritos' });
      expect(result.success).toBe(false);
    });
  });

  describe('CookieClearSchema', () => {
    it('aceita nomes validos', () => {
      expect(CookieClearSchema.safeParse({ name: 'ssb_token' }).success).toBe(true);
      expect(CookieClearSchema.safeParse({ name: 'ssb_usuario' }).success).toBe(true);
      expect(CookieClearSchema.safeParse({ name: 'ssb_refresh' }).success).toBe(true);
    });
    it('rejeita nome invalido', () => {
      expect(CookieClearSchema.safeParse({ name: 'evil_cookie' }).success).toBe(false);
    });
    it('rejeita nome vazio', () => {
      expect(CookieClearSchema.safeParse({ name: '' }).success).toBe(false);
    });
  });

  describe('validateBody', () => {
    it('retorna success com dados validos', () => {
      const result = validateBody(PerguntaSchema, { consulta: 'teste' });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.consulta).toBe('teste');
      }
    });
    it('retorna error com dados invalidos', () => {
      const result = validateBody(PerguntaSchema, { consulta: '' });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBeDefined();
      }
    });
    it('error e Response com status 400', () => {
      const result = validateBody(PerguntaSchema, {});
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.status).toBe(400);
      }
    });
  });
});
