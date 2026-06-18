'use client';

import Link from 'next/link';
import { Cabeçalho } from '@/components/layout/cabecalho';
import { Rodapé } from '@/components/layout/rodape';
import {
  ScrollText,
  BookText,
  Scale,
  Languages,
  Type,
  Map,
  Clock,
  Users,
  Link2,
  BookMarked,
  MessageSquare,
  Columns,
  ArrowRight,
} from 'lucide-react';

const ferramentas = [
  {
    titulo: 'Exegese',
    desc: 'Contexto imediato, do capítulo, do livro, do testamento e canônico. Estrutura literária e análise sintática.',
    href: '/exegese',
    icone: ScrollText,
  },
  {
    titulo: 'Hermenêutica',
    desc: 'Os princípios que governam a interpretação. Gêneros literários, analogia da fé e a Escritura interpretando a Escritura.',
    href: '/exegese',
    icone: BookText,
  },
  {
    titulo: 'Teologia Sistemática',
    desc: 'A exposição ordenada das doutrinas bíblicas, com base scriptura e as diversas tradições da fé cristã.',
    href: '/teologia',
    icone: Scale,
  },
  {
    titulo: 'Grego Koiné',
    desc: 'Léxico do Novo Testamento com numeração de Strong, transliteração, definição e análise morfológica.',
    href: '/idiomas',
    icone: Languages,
  },
  {
    titulo: 'Hebraico Bíblico',
    desc: 'Léxico do Antigo Testamento — BDB / HALOT — com morfologia, lexemas e ocorrências no cânon.',
    href: '/idiomas',
    icone: Type,
  },
  {
    titulo: 'Atlas Bíblico',
    desc: 'Mapa interativo do mundo bíblico com localizações, coordenadas e descrições históricas.',
    href: '/historia',
    icone: Map,
  },
  {
    titulo: 'Cronologia',
    desc: 'Linha do tempo dos grandes eventos da redenção, da criação à consumação, com referências bíblicas.',
    href: '/cronologia',
    icone: Clock,
  },
  {
    titulo: 'Personagens',
    desc: 'Galeria das figuras das Escrituras — patriarcas, profetas, reis, apóstolos — com seu papel na história da salvação.',
    href: '/personagens',
    icone: Users,
  },
  {
    titulo: 'Referências Cruzadas',
    desc: 'A Escritura interpreta a Escritura. Referências entre passagens que se iluminam mutuamente no cânon.',
    href: '/ferramentas',
    icone: Link2,
  },
  {
    titulo: 'Dicionário Bíblico',
    desc: 'Termos, lugares, povos e objetos do mundo bíblico explicados com base na pesquisa teológica.',
    href: '/ferramentas',
    icone: BookMarked,
  },
  {
    titulo: 'Comentários',
    desc: 'Exposição de autores clássicos e contemporâneos, organizada por passagem e por tradição.',
    href: '/ferramentas',
    icone: MessageSquare,
  },
  {
    titulo: 'Comparação de Traduções',
    desc: 'Leitura lado a lado de uma mesma passagem em múltiplas versões — NVI, ARA, ACF, NTLH, KJV.',
    href: '/biblia/comparar',
    icone: Columns,
  },
];

export default function EstudosPage() {
  return (
    <div className="min-h-screen bg-background">
      <Cabeçalho />
      <main className="pt-24">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="mb-14 max-w-3xl">
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-2">
              Central de Estudos
            </p>
            <h1 className="font-display text-5xl font-light text-foreground">Estudos Bíblicos</h1>
            <div className="ornamento w-32 mt-4" />
            <p className="font-serif-body text-lg text-muted-foreground mt-6 leading-relaxed">
              Um arsenal de ferramentas a serviço do texto sagrado. Da exegese mais cuidadosa às
              línguas originais, da teologia sistemática ao atlas, da cronologia aos comentários —
              tudo num só lugar, sob a autoridade final da Escritura.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ferramentas.map((f) => {
              const Icone = f.icone;
              return (
                <Link
                  key={f.titulo}
                  href={f.href}
                  className="sola-card p-7 group flex flex-col h-full"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <span className="shrink-0 w-11 h-11 flex items-center justify-center bg-primary/5 border border-border">
                      <Icone className="w-5 h-5 text-primary" strokeWidth={1.25} />
                    </span>
                    <h2 className="font-display text-2xl font-semibold text-foreground leading-tight pt-1">
                      {f.titulo}
                    </h2>
                  </div>

                  <p className="font-serif-body text-sm text-muted-foreground leading-relaxed flex-1">
                    {f.desc}
                  </p>

                  <span className="inline-flex items-center gap-1.5 text-xs font-medium tracking-wide text-primary mt-5 pt-4 border-t border-border/40 group-hover:gap-2.5 transition-all">
                    Abrir estudo
                    <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
                  </span>
                </Link>
              );
            })}
          </div>

          <div className="sola-card p-12 text-center mt-20">
            <div className="ornamento w-24 mx-auto mb-6" />
            <p className="font-display italic text-2xl text-muted-foreground max-w-2xl mx-auto leading-snug">
              &laquo;Toda a Escritura é divinamente inspirada, e proveitosa para ensinar, para
              redarguir, para corrigir, para instruir em justiça&raquo;
            </p>
            <p className="text-xs tracking-widest uppercase text-muted-foreground mt-4">
              2 Timóteo 3:16 · Soli Deo Gloria
            </p>
          </div>
        </div>
      </main>
      <Rodapé />
    </div>
  );
}
