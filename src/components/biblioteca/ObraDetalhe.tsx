'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import { CapaLivro } from '@/components/biblioteca/CapaLivro';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Clock,
  GraduationCap,
  Languages,
  Quote,
  ChevronRight,
  CheckCircle2,
  Landmark,
  Sparkles,
  Tag,
} from 'lucide-react';
import type { ObraMeta } from '@/data/biblioteca/types';
import { CATEGORIAS_INFO } from '@/data/biblioteca';

interface ObraDetalheProps {
  meta: ObraMeta;
  capitulos: { numero: number; titulo: string }[];
}

export function ObraDetalhe({ meta, capitulos }: ObraDetalheProps) {
  const [lidos, setLidos] = useState<number[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('ssb_bib_leitura');
      if (raw) {
        const p = JSON.parse(raw);
        if (p[meta.id]?.lidos) setLidos(p[meta.id].lidos);
      }
    } catch {
      /* ignora */
    }
  }, [meta.id]);

  const pct = Math.round((lidos.length / meta.numCapitulos) * 100);
  const proximoCap = capitulos.find((c) => !lidos.includes(c.numero)) ?? capitulos[0];

  const ficha = [
    { icone: Landmark, rotulo: 'Autor', valor: `${meta.autor.split('(')[0].trim()} (${meta.autorVida})` },
    { icone: Clock, rotulo: 'Composição', valor: meta.anoTexto },
    { icone: Languages, rotulo: 'Idioma original', valor: meta.idiomaOriginal },
    { icone: BookOpen, rotulo: 'Edição', valor: meta.edicao === 'integral' ? 'Texto integral' : 'Seleção de passagens' },
    { icone: GraduationCap, rotulo: 'Nível', valor: meta.dificuldade },
    { icone: Clock, rotulo: 'Tempo de leitura', valor: `${meta.tempoLeituraMin} min` },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20 pb-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <Link
              href="/biblioteca"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" /> Biblioteca Digital
            </Link>
          </ScrollReveal>

          {/* ═══════════ HERO DA OBRA ═══════════ */}
          <ScrollReveal delay={0.05}>
            <div className="sola-card p-6 md:p-10 mb-8 relative overflow-hidden">
              <div
                className="absolute top-0 right-0 w-72 h-72 rounded-full blur-3xl opacity-20 pointer-events-none"
                style={{ background: `linear-gradient(135deg, ${meta.capa.de}, ${meta.capa.ate})` }}
              />
              <div className="flex flex-col md:flex-row gap-8 relative">
                <div className="flex justify-center md:justify-start">
                  <CapaLivro obra={meta} size="lg" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium">
                      {CATEGORIAS_INFO[meta.categoria].rotulo}
                    </span>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground">
                      {meta.edicao === 'integral' ? 'Texto integral' : 'Seleção de passagens'}
                    </span>
                  </div>
                  <h1 className="font-display text-3xl md:text-4xl font-light mb-2">{meta.titulo}</h1>
                  {meta.tituloOriginal && (
                    <p className="text-sm italic text-muted-foreground mb-4">{meta.tituloOriginal}</p>
                  )}
                  <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{meta.descricao}</p>

                  {pct > 0 && (
                    <div className="mb-6 flex items-center gap-3">
                      <div className="h-2 flex-1 max-w-64 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: `${pct}%` }} />
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {lidos.length}/{meta.numCapitulos} capítulos lidos ({pct}%)
                      </span>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-3">
                    <Link
                      href={`/biblioteca/${meta.id}/${proximoCap.numero}`}
                      className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity inline-flex items-center gap-2"
                    >
                      <BookOpen className="w-4 h-4" />
                      {pct > 0 ? 'Continuar leitura' : 'Começar a ler'}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* ═══════════ COLUNA PRINCIPAL ═══════════ */}
            <div className="lg:col-span-2 space-y-8">
              {/* citação destaque */}
              <ScrollReveal delay={0.1}>
                <div className="sola-card p-8 relative overflow-hidden">
                  <Quote className="absolute -top-2 -left-2 w-16 h-16 text-primary/10" strokeWidth={1} />
                  <blockquote className="font-serif text-lg md:text-xl italic leading-relaxed text-foreground/90 relative">
                    “{meta.citacao.texto}”
                  </blockquote>
                  <cite className="block mt-4 text-sm text-primary font-medium not-italic">
                    — {meta.citacao.fonte}
                  </cite>
                </div>
              </ScrollReveal>

              {/* contexto histórico */}
              <ScrollReveal delay={0.12}>
                <div className="sola-card p-6 md:p-8">
                  <h2 className="font-display text-xl mb-4 text-primary flex items-center gap-2">
                    <Landmark className="w-5 h-5" /> Contexto Histórico
                  </h2>
                  <p className="text-sm md:text-base text-foreground/80 leading-relaxed font-serif">
                    {meta.contexto}
                  </p>
                </div>
              </ScrollReveal>

              {/* importância acadêmica */}
              <ScrollReveal delay={0.14}>
                <div className="sola-card p-6 md:p-8">
                  <h2 className="font-display text-xl mb-4 text-primary flex items-center gap-2">
                    <GraduationCap className="w-5 h-5" /> Por Que Esta Obra Importa
                  </h2>
                  <p className="text-sm md:text-base text-foreground/80 leading-relaxed font-serif">
                    {meta.importancia}
                  </p>
                </div>
              </ScrollReveal>

              {/* sumário */}
              <ScrollReveal delay={0.16}>
                <div className="sola-card p-6 md:p-8">
                  <div className="flex items-center justify-between mb-5">
                    <h2 className="font-display text-xl text-primary flex items-center gap-2">
                      <BookOpen className="w-5 h-5" /> Sumário
                    </h2>
                    <span className="text-xs text-muted-foreground">{capitulos.length} capítulos</span>
                  </div>
                  <div className="divide-y divide-border/50">
                    {capitulos.map((c) => {
                      const lido = lidos.includes(c.numero);
                      return (
                        <Link
                          key={c.numero}
                          href={`/biblioteca/${meta.id}/${c.numero}`}
                          className="flex items-center gap-3 py-3 px-2 -mx-2 rounded-lg hover:bg-muted/50 transition-colors group"
                        >
                          {lido ? (
                            <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                          ) : (
                            <span className="w-6 h-6 rounded-full bg-muted text-muted-foreground text-[11px] flex items-center justify-center shrink-0 font-medium">
                              {c.numero}
                            </span>
                          )}
                          <span className={`flex-1 text-sm ${lido ? 'text-muted-foreground' : 'group-hover:text-primary'} transition-colors`}>
                            {c.titulo}
                          </span>
                          <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* ═══════════ SIDEBAR ═══════════ */}
            <div className="space-y-6">
              <ScrollReveal delay={0.1}>
                <div className="sola-card p-6">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-primary" /> Ficha Acadêmica
                  </h3>
                  <dl className="space-y-3.5">
                    {ficha.map((f) => (
                      <div key={f.rotulo} className="flex items-start gap-2.5">
                        <f.icone className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        <div>
                          <dt className="text-[11px] uppercase tracking-wide text-muted-foreground">{f.rotulo}</dt>
                          <dd className="text-sm text-foreground/90">{f.valor}</dd>
                        </div>
                      </div>
                    ))}
                  </dl>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.15}>
                <div className="sola-card p-6">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4 flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-primary" /> Temas
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {meta.tags.map((t) => (
                      <span key={t} className="text-xs px-2.5 py-1 bg-muted rounded-full text-muted-foreground">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <div className="sola-card p-6 text-center">
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Todos os textos desta biblioteca são de{' '}
                    <span className="text-primary font-medium">domínio público</span> (anterior a 1900),
                    traduzidos e adaptados a partir de edições livres de direitos.
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
