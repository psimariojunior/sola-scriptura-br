'use client';

import { useState, useCallback } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import Link from 'next/link';
import {
  BookOpen,
  ArrowLeft,
  Quote,
  HelpCircle,
  FileText,
  Headphones,
} from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import ManualAudioPlayer from '@/components/ManualAudioPlayer';
import type { ManualBiblico } from '@/data/manuaisBiblicos';

interface ManualDetailClientProps {
  manual: ManualBiblico;
}

export default function ManualDetailClient({ manual }: ManualDetailClientProps) {
  const [audioAberto, setAudioAberto] = useState(false);
  const [capituloAudio, setCapituloAudio] = useState(1);

  const abrirAudio = useCallback((numero: number) => {
    setCapituloAudio(numero);
    setAudioAberto(true);
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <section className="max-w-5xl mx-auto px-4 py-12">
        <ScrollReveal>
          <Link
            href="/estudos/manuais"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar aos Manuais
          </Link>

          <div className="mb-10">
            <div className="flex items-center gap-3 mb-2">
              <BookOpen className="w-8 h-8 text-primary" />
              <h1 className="text-3xl md:text-4xl font-bold">{manual.titulo}</h1>
            </div>
            <p className="text-lg text-muted-foreground">{manual.subtitulo}</p>
            <p className="text-sm text-muted-foreground mt-2">{manual.descricao}</p>
            <div className="flex flex-wrap gap-1 mt-4">
              {manual.categorias.map((cat) => (
                <span key={cat} className="text-xs bg-secondary px-2 py-1 rounded-full">
                  {cat}
                </span>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <div className="space-y-8">
          {manual.capitulos.map((cap, idx) => (
            <ScrollReveal key={cap.numero} delay={idx * 0.03}>
              <div className="bg-card border border-border rounded-xl p-6 md:p-8">
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-bold">
                      Cap. {cap.numero}
                    </span>
                    <h2 className="text-xl md:text-2xl font-bold">{cap.titulo}</h2>
                  </div>
                  <button
                    onClick={() => abrirAudio(cap.numero)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors flex-shrink-0"
                  >
                    <Headphones className="w-3.5 h-3.5" />
                    Ouvrir capítulo
                  </button>
                </div>
                <p className="text-muted-foreground italic mb-4">{cap.resumo}</p>
                <div className="prose prose-sm dark:prose-invert max-w-none mb-6">
                  <p>{cap.conteudo}</p>
                </div>

                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3 flex items-center gap-2">
                    <FileText className="w-4 h-4" /> Versículos-Chave
                  </h3>
                  <div className="space-y-2">
                    {cap.versicosChave.map((v, i) => (
                      <div
                        key={i}
                        className="bg-secondary/50 rounded-lg p-3 border-l-4 border-primary"
                      >
                        <p className="font-semibold text-sm">{v.referencia}</p>
                        <p className="text-sm italic text-muted-foreground">
                          &quot;{v.texto}&quot;
                        </p>
                        <span className="text-xs text-muted-foreground">({v.traducao})</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3 flex items-center gap-2">
                    <HelpCircle className="w-4 h-4" /> Perguntas de Estudo
                  </h3>
                  <ol className="list-decimal list-inside space-y-1">
                    {cap.perguntasEstudo.map((p, i) => (
                      <li key={i} className="text-sm text-muted-foreground">
                        {p}
                      </li>
                    ))}
                  </ol>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3 flex items-center gap-2">
                    <Quote className="w-4 h-4" /> Citações de Teólogos
                  </h3>
                  <div className="space-y-3">
                    {cap.citacoesTeologos.map((c, i) => (
                      <div key={i} className="bg-secondary/50 rounded-lg p-4 border-l-4 border-accent-foreground/20">
                        <p className="text-sm italic text-muted-foreground mb-2">
                          &quot;{c.citacao}&quot;
                        </p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span className="font-semibold">{c.nome}</span>
                          <span>({c.periodo})</span>
                          {c.obra && <span className="italic">- {c.obra}</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <ManualAudioPlayer
        titulo={manual.titulo}
        conteudo=""
        capitulos={manual.capitulos}
        capituloAtual={capituloAudio}
        onCapituloChange={setCapituloAudio}
        isOpen={audioAberto}
        onClose={() => setAudioAberto(false)}
      />

      <Footer />
    </main>
  );
}
