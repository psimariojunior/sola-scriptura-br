'use client';

import { useState, useEffect } from 'react';
import { ImmersiveMode } from '@/components/Biblia/ImmersiveMode';
import { carregarTraducao, type LivroData } from '@/data/biblia/texto/carregar';
import { TODOS_LIVROS } from '@/data/biblia/livros';

export default function ImersaoPage() {
  const [data, setData] = useState<LivroData | null>(null);
  const [livroIdx, setLivroIdx] = useState(0);
  const [capitulo, setCapitulo] = useState(1);
  const [loading, setLoading] = useState(true);

  const livro = TODOS_LIVROS[livroIdx];

  useEffect(() => {
    setLoading(true);
    carregarTraducao('arc').then(trads => {
      setData(trads);
      setLoading(false);
    });
  }, []);

  if (loading || !data) {
    return (
      <div className="h-screen bg-[#0a0a1a] flex items-center justify-center">
        <div className="text-white/50 text-sm">Carregando...</div>
      </div>
    );
  }

  // Get verses for current book and chapter
  const bookData = data[livro.abreviacao];
  const chapterVerses = bookData?.[capitulo] || [];
  const versiculos = chapterVerses.map((texto: string, idx: number) => ({
    numero: idx + 1,
    texto,
  }));

  if (versiculos.length === 0) {
    return (
      <div className="h-screen bg-[#0a0a1a] flex items-center justify-center">
        <div className="text-white/50 text-sm">Capítulo não encontrado</div>
      </div>
    );
  }

  return (
    <ImmersiveMode
      livroNome={livro.nome}
      capitulo={capitulo}
      versiculos={versiculos}
      traducao="ARC"
      onClose={() => window.history.back()}
    />
  );
}
