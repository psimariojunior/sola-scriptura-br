'use client';

import { useEffect, useState } from 'react';
import { getMarcador, onMarcadoresChange, type Marca } from '@/lib/marcadores';

export function useMarcaVerso(
  livro: string,
  capitulo: number,
  versiculo: number,
  traducao: string,
): Marca | null {
  const [marca, setMarca] = useState<Marca | null>(null);

  useEffect(() => {
    const ler = () => setMarca(getMarcador(livro, capitulo, versiculo, traducao));
    ler();
    return onMarcadoresChange(ler);
  }, [livro, capitulo, versiculo, traducao]);

  return marca;
}
