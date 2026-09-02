'use client';

import { useEffect, useState } from 'react';
import {
  getMarcador,
  listarMarcadoresDoCapitulo,
  onMarcadoresChange,
  type Marca,
} from '@/lib/marcadores';

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

export function useMarcasCapitulo(livro: string, capitulo: number, traducao?: string): Marca[] {
  const [marcas, setMarcas] = useState<Marca[]>([]);

  useEffect(() => {
    const ler = () => setMarcas(listarMarcadoresDoCapitulo(livro, capitulo, traducao));
    ler();
    return onMarcadoresChange(ler);
  }, [livro, capitulo, traducao]);

  return marcas;
}
