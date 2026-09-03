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
  const [erro, setErro] = useState('');

  const livro = TODOS_LIVROS[livroIdx];

  useEffect(() => {
    setLoading(true);
    setErro('');
    carregarTraducao('arc')
      .then(trads => {
        setData(trads);
        setLoading(false);
      })
      .catch(() => {
        setErro('Falha ao carregar a tradução. Tente novamente.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div id="main-content" className="h-screen bg-[#0a0a1a] flex items-center justify-center" role="status">
        <div className="text-white/50 text-sm">Carregando...</div>
      </div>
    );
  }

  if (erro || !data) {
    return (
      <div id="main-content" className="h-screen bg-[#0a0a1a] flex items-center justify-center flex-col gap-4">
        <div className="text-white/70 text-sm">{erro || 'Dados não disponíveis'}</div>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 text-xs text-amber-400 border border-amber-400/30 rounded-lg hover:bg-amber-400/10 transition-colors"
        >
          Tentar novamente
        </button>
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
      <div id="main-content" className="h-screen bg-[#0a0a1a] flex items-center justify-center flex-col gap-4">
        <div className="text-white/70 text-sm">Capítulo não encontrado</div>
        <button
          onClick={() => window.history.back()}
          className="px-4 py-2 text-xs text-amber-400 border border-amber-400/30 rounded-lg hover:bg-amber-400/10 transition-colors"
        >
          Voltar
        </button>
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
