import { z } from 'zod';

export const PerguntaSchema = z.object({
  consulta: z.string().min(1, 'Pergunta é obrigatória').max(2000, 'Pergunta muito longa'),
  tradicao: z.string().max(100).optional(),
  contexto: z.string().max(5000).optional(),
});

export const PerguntaStreamSchema = z.object({
  pergunta: z.string().min(1, 'Pergunta é obrigatória').max(2000, 'Pergunta muito longa'),
  tradicao: z.string().max(100).optional(),
  contexto: z.string().max(5000).optional(),
});

export const EstudoSchema = z.object({
  passagem: z.string().min(1, 'Passagem é obrigatória').max(200),
  tipo: z.string().max(50).optional(),
});

export const SyncSchema = z.object({
  tipo: z.enum(['favoritos', 'notas', 'colecoes', 'progresso']),
  dados: z.record(z.string(), z.unknown()),
});

export const CookieClearSchema = z.object({
  name: z.enum(['ssb_token', 'ssb_usuario', 'ssb_refresh']),
});

export function validateBody<T>(schema: z.ZodSchema<T>, body: unknown): { success: true; data: T } | { success: false; error: Response } {
  const result = schema.safeParse(body);
  if (!result.success) {
    return {
      success: false,
      error: Response.json(
        { erro: 'Dados inválidos', detalhes: result.error.flatten().fieldErrors },
        { status: 400 }
      ),
    };
  }
  return { success: true, data: result.data };
}
