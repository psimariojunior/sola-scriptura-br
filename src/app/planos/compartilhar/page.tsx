'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Calendar, BookOpen, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import Link from 'next/link';
import { decodePlano, type PlanoPersonalizadoData } from '@/components/PlanoPersonalizadoCriar';
import { carregarPlanosCustom, salvarPlanosCustom } from '@/components/PlanoPersonalizadoCriar';

function CompartilharPlanoInner() {
  const searchParams = useSearchParams();
  const [plano, setPlano] = useState<PlanoPersonalizadoData | null>(null);
  const [erro, setErro] = useState(false);
  const [importado, setImportado] = useState(false);

  useEffect(() => {
    const id = searchParams.get('id');
    if (id) {
      const decoded = decodePlano(id);
      if (decoded) {
        setPlano(decoded);
      } else {
        setErro(true);
      }
    } else {
      setErro(true);
    }
  }, [searchParams]);

  const handleImportar = () => {
    if (!plano) return;
    const existentes = carregarPlanosCustom();
    const duplicado = existentes.find(p => p.id === plano.id);
    if (!duplicado) {
      salvarPlanosCustom([...existentes, plano]);
    }
    setImportado(true);
  };

  if (erro) {
    return (
      <div className="min-h-screen"><Header />
        <main className="pt-20 pb-32 px-4"><div className="max-w-xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-red-500/20 bg-red-500/5 p-8">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h1 className="font-display text-2xl font-light mb-2">Link Inválido</h1>
            <p className="text-sm text-muted-foreground mb-6">Este link de compartilhamento não contém um plano válido.</p>
            <Link href="/planos"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors">
              Ver Planos de Leitura <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div></main><Footer /></div>
    );
  }

  if (!plano) {
    return (
      <div className="min-h-screen"><Header />
        <main className="pt-20 pb-32 px-4"><div className="max-w-xl mx-auto text-center">
          <p className="text-muted-foreground">Carregando plano...</p>
        </div></main><Footer /></div>
      );
  }

  const totalPassagens = plano.dias.reduce((acc, d) => acc + d.passagens.length, 0);

  return (
    <div className="min-h-screen"><Header />
      <main className="pt-20 pb-32 px-4"><div className="max-w-xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-amber-500/5 flex items-center justify-center border border-primary/20">
              <Calendar className="w-5 h-5 text-primary" /></div>
            <div>
              <p className="text-xs text-muted-foreground">Plano compartilhado</p>
              <h1 className="font-display text-2xl font-light">{plano.titulo}</h1>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="rounded-2xl border border-border/50 bg-card/50 p-5 mb-6">
          {plano.descricao && <p className="text-sm text-muted-foreground mb-3">{plano.descricao}</p>}
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">{plano.dias.length} dias</span>
            <span className="capitalize">{plano.nivel}</span>
            <span>{totalPassagens} passagens</span>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="mb-6">
          <h2 className="font-display text-lg font-medium mb-3">Estrutura do Plano</h2>
          <div className="space-y-2 max-h-[40vh] overflow-y-auto pr-1">
            {plano.dias.map((dia, idx) => (
              <div key={idx} className="rounded-xl border border-border/30 bg-card/50 p-3">
                <p className="text-sm font-medium mb-1">{dia.titulo}</p>
                <div className="flex flex-wrap gap-1.5">
                  {dia.passagens.map((p, pi) => (
                    <span key={pi} className="px-2 py-0.5 rounded-md bg-secondary/50 text-[11px] text-muted-foreground">
                      {p.livro} {p.capitulo}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          {importado ? (
            <div className="text-center space-y-3">
              <div className="flex items-center justify-center gap-2 text-emerald-500">
                <CheckCircle2 className="w-5 h-5" />
                <span className="text-sm font-medium">Plano importado com sucesso!</span>
              </div>
              <Link href="/planos"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors">
                Ver Meus Planos <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <button onClick={handleImportar}
              className="w-full py-3 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
              <BookOpen className="w-4 h-4" /> Importar Este Plano
            </button>
          )}
        </motion.div>
      </div></main><Footer /></div>
  );
}

export default function CompartilharPlanoPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen"><Header />
        <main className="pt-20 pb-32 px-4"><div className="max-w-xl mx-auto text-center">
          <p className="text-muted-foreground">Carregando...</p>
        </div></main><Footer /></div>
    }>
      <CompartilharPlanoInner />
    </Suspense>
  );
}
