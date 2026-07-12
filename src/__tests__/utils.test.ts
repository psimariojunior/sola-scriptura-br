import { cn } from '@/lib/utils';

describe('utils.ts', () => {
  test('cn combina classes corretamente', () => {
    const resultado = cn('text-red-500', 'text-blue-500');
    expect(resultado).toBe('text-blue-500');
  });

  test('cn remove classes duplicadas', () => {
    const resultado = cn('p-4', 'p-8');
    expect(resultado).toBe('p-8');
  });

  test('cn lida com undefined', () => {
    const resultado = cn('text-red-500', undefined, 'text-blue-500');
    expect(resultado).toContain('text-blue-500');
  });

  test('cn retorna string vazia para input vazio', () => {
    const resultado = cn();
    expect(resultado).toBe('');
  });
});
