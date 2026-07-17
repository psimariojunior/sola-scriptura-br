'use client';

import { Suspense, useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { motion } from 'framer-motion';
import { Share2 } from 'lucide-react';
import { TODOS_LIVROS, carregarTraducao } from '@/data/biblia';
import { ShareVerseModal, type ShareVerseData } from '@/components/Biblia/ShareVerseModal';

function VersiculoEditor() {
  const params = useSearchParams();
  const [verse, setVerse] = useState<ShareVerseData | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  const livroParam = params.get('livro') || 'gn';
  const capParam = Number(params.get('capitulo') || params.get('cap') || '1');
  const versParam = Number(params.get('versiculo') || params.get('v') || '1');
  const tradParam = params.get('t') || 'arc';

  useEffect(() => {
    let ativo = true;
    setLoading(true);
    setErro(null);

    const livro = TODOS_LIVROS.find((l) => l.abreviacao.toLowerCase() === livroParam.toLowerCase())
      || TODOS_LIVROS.find((l) => l.nome.toLowerCase().includes(livroParam.toLowerCase()))
      || TODOS_LIVROS[0];

    const carregar = async () => {
      try {
        const data = await carregarTraducao(tradParam);
        const capitulo = data[livro.abreviacao]?.[capParam - 1];
        const texto = capitulo?.[versParam - 1];
        if (!texto) {
          if (!ativo) return;
          setErro('Versículo não encontrado nesta tradução.');
          setVerse(null);
          setLoading(false);
          return;
        }
        if (!ativo) return;
        setVerse({
          livroNome: livro.nome,
          capitulo: capParam,
          versiculo: versParam,
          texto,
          traducao: tradParam,
        });
        setLoading(false);
      } catch {
        if (!ativo) return;
        setErro('Não foi possível carregar este versículo.');
        setLoading(false);
      }
    };
    carregar();
    return () => { ativo = false; };
  }, [livroParam, capParam, versParam, tradParam]);

  const abrir = useCallback(() => setModalOpen(true), []);

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Header />
      <main className="pt-24 pb-16 px-6">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-10 h-10 rounded-xl bg-[var(--brand-subtle)] flex items-center justify-center">
              <Share2 className="w-5 h-5 text-[var(--brand-default)]" />
            </div>
            <div>
              <h1 className="font-display text-3xl font-light text-[var(--content-primary)]">Compartilhar Versículo</h1>
              <p className="text-sm text-[var(--content-muted)]">Crie uma imagem bonita para compartilhar</p>
            </div>
          </motion.div>

          {loading ? (
            <div className="rounded-2xl border border-[var(--border)]/50 bg-[var(--surface-raised)] p-10 text-center">
              <div className="flex gap-1.5 justify-center">
                <span className="w-2 h-2 bg-[var(--brand-default)] rounded-full animate-bounce" />
                <span className="w-2 h-2 bg-[var(--brand-default)] rounded-full animate-bounce [animation-delay:0.15s]" />
                <span className="w-2 h-2 bg-[var(--brand-default)] rounded-full animate-bounce [animation-delay:0.3s]" />
              </div>
            </div>
          ) : erro || !verse ? (
            <div className="rounded-2xl border border-[var(--border)]/50 bg-[var(--surface-raised)] p-10 text-center">
              <p className="text-[var(--content-muted)]">{erro || 'Versículo não encontrado.'}</p>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border border-[var(--border)]/50 bg-[var(--surface-raised)] p-6 space-y-5"
            >
              <div>
                <p className="text-xs text-[var(--content-muted)] uppercase tracking-wider mb-2">Pré-visualização</p>
                <div className="rounded-xl bg-[var(--surface-sunken)] p-5">
                  <p className="font-serif-body italic text-[var(--content-primary)] leading-relaxed text-lg">
                    &ldquo;{verse.texto}&rdquo;
                  </p>
                  <p className="mt-3 text-sm font-semibold text-[var(--brand-default)]">
                    {verse.livroNome} {verse.capitulo}:{verse.versiculo} — {verse.traducao.toUpperCase()}
                  </p>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={abrir}
                className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-[var(--brand-default)] text-[var(--brand-contrast)] font-medium shadow-md shadow-[var(--brand-default)]/20"
              >
                <Share2 className="w-4 h-4" /> Personalizar e compartilhar
              </motion.button>
            </motion.div>
          )}
        </div>
      </main>
      <Footer />

      {verse && (
        <ShareVerseModal open={modalOpen} onClose={() => setModalOpen(false)} verse={verse} />
      )}
    </div>
  );
}

export default function CompartilharVersiculoPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center">
        <div className="flex gap-1.5">
          <span className="w-2 h-2 bg-[var(--brand-default)] rounded-full animate-bounce" />
          <span className="w-2 h-2 bg-[var(--brand-default)] rounded-full animate-bounce [animation-delay:0.15s]" />
          <span className="w-2 h-2 bg-[var(--brand-default)] rounded-full animate-bounce [animation-delay:0.3s]" />
        </div>
      </div>
    }>
      <VersiculoEditor />
    </Suspense>
  );
}
