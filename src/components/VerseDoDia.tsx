'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Share2, BookOpen, Copy, Check, Dices } from 'lucide-react';
import { useState } from 'react';
import { versiculosDestaque } from '@/data/versiculosDestaque';

const VERSICULOS_ALEATORIOS = [
  { referencia: 'Romanos 8:28', texto: 'E sabemos que todas as coisas contribuem juntamente para o bem daqueles que amam a Deus, aos que são chamados segundo o seu propósito.' },
  { referencia: 'Salmos 23:1', texto: 'O Senhor é o meu pastor; nada me faltará.' },
  { referencia: 'Filipenses 4:13', texto: 'Posso todas as coisas naquele que me fortalece.' },
  { referencia: 'Jeremias 29:11', texto: 'Porque eu bem sei os pensamentos que tenho a vosso respeito, diz o Senhor; pensamentos de paz, e não de mal, para vos dar o fim que esperais.' },
  { referencia: 'Isaías 40:31', texto: 'Mas os que esperam no Senhor renovarão as forças, subirão com asas como águias.' },
  { referencia: 'Provérbios 3:5-6', texto: 'Confia no Senhor de todo o teu coração, e não te estribes no teu próprio entendimento. Reconhece-o em todos os teus caminhos, e ele endireitará as tuas veredas.' },
  { referencia: 'Mateus 11:28', texto: 'Vinde a mim, todos os que estais cansados e oprimidos, e eu vos aliviarei.' },
  { referencia: '2 Timóteo 1:7', texto: 'Porque Deus não nos deu o espírito de temor, mas de fortaleza, e de amor, e de moderação.' },
  { referencia: 'Hebreus 11:1', texto: 'Ora, a fé é o firme fundamento das coisas que se esperam, e a prova das coisas que se não veem.' },
  { referencia: 'Efésios 2:8-9', texto: 'Porque pela graça sois salvos, por meio da fé; e isto não vem de vós, é dom de Deus. Não vem das obras, para que ninguém se glorie.' },
  { referencia: '1 Coríntios 10:13', texto: 'Não vos sobreveio tentação que não fosse humana; mas Deus é fiel, e não deixará que sejais tentados acima do que podeis.' },
  { referencia: 'Romanos 12:2', texto: 'E não vos conformeis com este mundo, mas transformai-vos pela renovação do vosso entendimento.' },
  { referencia: 'Salmos 46:10', texto: 'Aquietai-vos, e sabei que eu sou Deus; serei exaltado entre os gentios; serei exaltado sobre a terra.' },
  { referencia: 'Tiago 1:5', texto: 'E, se algum de vós tem falta de sabedoria, peça-a a Deus, que a todos dá liberalmente, e o não lança em rosto, e ser-lhe-á dada.' },
  { referencia: 'Mateus 6:33', texto: 'Mas, buscai primeiro o reino de Deus, e a sua justiça, e todas estas coisas vos serão acrescentadas.' },
  { referencia: 'Gálatas 5:22-23', texto: 'Mas o fruto do Espírito é: amor, gozo, paz, longanimidade, benignidade, bondade, fé, mansidão, temperança.' },
  { referencia: 'Colossenses 3:23', texto: 'E, tudo o que fizerdes, fazei-o de todo o coração, como ao Senhor, e não aos homens.' },
  { referencia: '1 Pedro 5:7', texto: 'Lançando sobre ele todo o vosso cuidado, porque ele mesmo cuida de vós.' },
  { referencia: 'Salmos 91:1', texto: 'Aquele que habita no esconderijo do Altíssimo, à sombra do Onipotente descansará.' },
  { referencia: 'Josué 1:9', texto: 'Não to mandei eu? Esforça-te e tem bom ânimo; não pasmes, nem te espantes; porque o Senhor teu Deus é contigo, por onde quer que andares.' },
  { referencia: 'Lamentações 3:22-23', texto: 'As misericórdias do Senhor são a causa de não sermos consumidos; as suas misericórdias são novas a cada manhã.' },
  { referencia: 'João 14:27', texto: 'Deixo-vos a paz, a minha paz vos dou; não vo-la dou como o mundo a dá.' },
  { referencia: 'Romanos 15:13', texto: 'Ora o Deus de esperança vos encha de todo o gozo e paz em crença, para que abundeis em esperança pela virtude do Espírito Santo.' },
  { referencia: 'Efésios 6:10', texto: 'No demais, irmãos meus, fortalecei-vos no Senhor e na força do seu poder.' },
  { referencia: 'Mateus 5:14-16', texto: 'Vós sois a luz do mundo. Não se pode esconder uma cidade edificada sobre um monte.' },
  { referencia: 'Hebreus 13:8', texto: 'Jesus Cristo é o mesmo ontem, e hoje, e eternamente.' },
  { referencia: '1 João 4:19', texto: 'Nós o amamos a ele, porque ele nos amou primeiro.' },
  { referencia: 'Filipenses 4:6-7', texto: 'Não vos preocupeis com coisa alguma; mas em tudo sejam conhecidas, diante de Deus, as vossas petições, pela oração e súplicas, com ações de graças.' },
  { referencia: 'Salmos 119:105', texto: 'Lâmpada para os meus pés é tua palavra, e luz para o meu caminho.' },
  { referencia: '1 Tessalonicenses 5:16-18', texto: 'Regozijai-vos sempre. Orai sem cessar. Em tudo dai graças, porque esta é a vontade de Deus em Cristo Jesus para convosco.' },
];

function getDiaDoAno(): number {
  const hoje = new Date();
  const inicio = new Date(hoje.getFullYear(), 0, 0);
  return Math.floor((hoje.getTime() - inicio.getTime()) / (1000 * 60 * 60 * 24));
}

function parseReferencia(ref: string): { livro: string; capitulo: string; versiculo: string } {
  const match = ref.match(/^(\d?\s*\w+)\s+(\d+):(\d+)/);
  if (!match) return { livro: 'genesis', capitulo: '1', versiculo: '1' };
  const livroMap: Record<string, string> = {
    'genesis': 'genesis', 'gn': 'genesis', 'gênesis': 'genesis',
    'exodo': 'exodo', 'êxodo': 'exodo', 'ex': 'exodo',
    'levitico': 'levitico', 'levítico': 'levitico', 'lv': 'levitico',
    'numeros': 'numeros', 'números': 'numeros', 'nm': 'numeros',
    'deuteronomio': 'deuteronomio', 'deuteronômio': 'deuteronomio', 'dt': 'deuteronomio',
    'josue': 'josue', 'josué': 'josue',
    'juizes': 'juizes', 'juízes': 'juizes',
    'rute': 'rute',
    '1samuel': '1samuel', '1 samuel': '1samuel',
    '2samuel': '2samuel', '2 samuel': '2samuel',
    '1reis': '1reis', '1 reis': '1reis',
    '2reis': '2reis', '2 reis': '2reis',
    '1cronicas': '1cronicas', '1 crônicas': '1cronicas',
    '2cronicas': '2cronicas', '2 crônicas': '2cronicas',
    'esdras': 'esdras',
    'nehemias': 'nehemias',
    'ester': 'ester', 'ageu': 'ageu',
    'salmos': 'salmos', 'sl': 'salmos',
    'proverbios': 'proverbios', 'provérbios': 'proverbios', 'pv': 'proverbios',
    'eclesiastes': 'eclesiastes', 'ec': 'eclesiastes',
    'isaias': 'isaias', 'isaías': 'isaias', 'is': 'isaias',
    'jeremias': 'jeremias', 'jr': 'jeremias',
    'lamentacoes': 'lamentacoes', 'lm': 'lamentacoes',
    'daniel': 'daniel', 'dn': 'daniel',
    'oseias': 'oseias', 'oséias': 'oseias',
    'joel': 'joel', 'amos': 'amos',
    'jonas': 'jonas', 'miqueias': 'miqueias',
    'naum': 'naum', 'habacuque': 'habacuque',
    'sofonias': 'sofonias',
    'zacarias': 'zacarias', 'malaquias': 'malaquias',
    'mateus': 'mateus', 'mt': 'mateus',
    'marcos': 'marcos', 'mc': 'marcos',
    'lucas': 'lucas', 'lc': 'lucas',
    'joao': 'joao', 'joão': 'joao',
    'atos': 'atos', 'at': 'atos',
    'romanos': 'romanos', 'rm': 'romanos',
    '1corintios': '1corintios', '1 coríntios': '1corintios',
    '2corintios': '2corintios', '2 coríntios': '2corintios',
    'galatas': 'galatas', 'gálatas': 'galatas', 'gl': 'galatas',
    'efesios': 'efesios', 'efésios': 'efesios', 'ef': 'efesios',
    'filipenses': 'filipenses', 'fp': 'filipenses',
    'colossenses': 'colossenses', 'cl': 'colossenses',
    '1tessalonicenses': '1tessalonicenses', '1 tessalonicenses': '1tessalonicenses',
    '2tessalonicenses': '2tessalonicenses', '2 tessalonicenses': '2tessalonicenses',
    '1timoteo': '1timoteo', '1 timóteo': '1timoteo',
    '2timoteo': '2timoteo', '2 timóteo': '2timoteo',
    'tito': 'tito', 'filemom': 'filemom',
    'hebreus': 'hebreus', 'hb': 'hebreus',
    'tiago': 'tiago', 'tg': 'tiago',
    '1pedro': '1pedro', '1 pedro': '1pedro',
    '2pedro': '2pedro', '2 pedro': '2pedro',
    '1joao': '1joao', '1 joão': '1joao',
    '2joao': '2joao', '2 joão': '2joao',
    '3joao': '3joao', '3 joão': '3joao',
    'jude': 'jude', 'judas': 'jude',
    'apocalipse': 'apocalipse', 'ap': 'apocalipse',
  };
  const rawLivro = match[1].trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const livro = livroMap[rawLivro] || 'genesis';
  return { livro, capitulo: match[2], versiculo: match[3] };
}

export default function VerseDoDia() {
  const [copied, setCopied] = useState(false);
  const [versoAtual, setVersoAtual] = useState(() => {
    const idx = (getDiaDoAno() - 1) % versiculosDestaque.length;
    return versiculosDestaque[idx];
  });

  const { livro, capitulo } = parseReferencia(versoAtual.referencia);
  const bibliaUrl = `/biblia?livro=${livro}&capitulo=${capitulo}`;

  const handleShare = async () => {
    const texto = `"${versoAtual.texto}" — ${versoAtual.referencia}\n\n📖 Sola Scriptura\nhttps://solascripturabr.com.br`;
    try {
      if (navigator.share) {
        await navigator.share({ title: versoAtual.referencia, text: texto });
      } else {
        await navigator.clipboard.writeText(texto);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      const a = document.createElement('a');
      a.href = `ssb-share://${encodeURIComponent(texto)}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  const handleSurpreendaMe = () => {
    const randomIdx = Math.floor(Math.random() * VERSICULOS_ALEATORIOS.length);
    const v = VERSICULOS_ALEATORIOS[randomIdx];
    setVersoAtual({ referencia: v.referencia, texto: v.texto });
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative py-14 sm:py-18 px-4 sm:px-6"
      aria-label="Versículo do Dia"
    >
      <div className="max-w-3xl mx-auto">
        <div
          className="relative rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/[0.03] via-card to-primary/[0.05] shadow-xl shadow-primary/[0.04] overflow-hidden group hover:shadow-2xl hover:shadow-primary/[0.08] transition-all duration-500"
        >
          {/* Decorative top accent — premium gradient line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
          
          {/* Subtle background glow on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
            style={{ background: 'radial-gradient(circle at 50% 0%, hsl(var(--primary) / 0.06) 0%, transparent 60%)' }} />

          <div className="relative p-8 sm:p-12 text-center">
            {/* Label — premium eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/15 bg-primary/[0.04] mb-8">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.25em] text-primary/80">
                Versículo do Dia
              </p>
            </div>

            {/* Verse text — premium typography */}
            <blockquote className="font-serif-body text-xl sm:text-2xl md:text-[1.75rem] italic font-light text-content-secondary dark:text-foreground/90 leading-[1.8] max-w-2xl mx-auto">
              <span aria-hidden="true" className="text-primary/20 text-3xl sm:text-4xl mr-1.5 font-display">&ldquo;</span>
              {versoAtual.texto}
              <span aria-hidden="true" className="text-primary/20 text-3xl sm:text-4xl ml-1.5 font-display">&rdquo;</span>
            </blockquote>

            {/* Reference — elegant divider */}
            <div className="flex items-center justify-center gap-3 mt-8">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-primary/30" />
              <p className="text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-primary">
                {versoAtual.referencia}
              </p>
              <div className="h-px w-8 bg-gradient-to-l from-transparent to-primary/30" />
            </div>

            {/* Actions — premium buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
              <button
                onClick={handleShare}
                className="btn-premium inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-xl border border-primary/25 bg-primary/[0.04] text-primary hover:bg-primary/[0.08] hover:border-primary/40 transition-all duration-300"
              >
                <Share2 className="w-3.5 h-3.5" />
                Compartilhar
              </button>

              <button
                onClick={handleSurpreendaMe}
                className="btn-premium inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-xl border border-primary/25 bg-primary/[0.04] text-primary hover:bg-primary/[0.08] hover:border-primary/40 transition-all duration-300"
              >
                <Dices className="w-3.5 h-3.5" />
                Surpreenda-me!
              </button>

              <Link
                href={bibliaUrl}
                className="btn-premium inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-xl bg-primary/10 text-primary hover:bg-primary/15 transition-all duration-300"
              >
                <BookOpen className="w-3.5 h-3.5" />
                Ler capítulo
              </Link>
            </div>
          </div>

          {/* Decorative bottom accent */}
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        </div>
      </div>
    </motion.section>
  );
}
