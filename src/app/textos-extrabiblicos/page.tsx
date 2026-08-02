'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Search, ChevronDown, ChevronUp, ExternalLink, BookOpen, Calendar, MapPin, User } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { cn } from '@/lib/utils';
import ScrollReveal from '@/components/ScrollReveal';

interface TextoExtrabiblico {
  id: string;
  nome: string;
  nomeOriginal: string;
  tipo: 'manuscrito' | 'escrito' | 'traducao';
  origem: string;
  data: string;
  descricao: string;
  relevanciaBiblica: string;
  trechos: Trecho[];
  cor: string;
}

interface Trecho {
  texto: string;
  referencia?: string;
  comparacaoCom: string;
  nota: string;
}

const TEXTOS: TextoExtrabiblico[] = [
  {
    id: 'qumram',
    nome: 'Pergaminhos do Mar Morto',
    nomeOriginal: 'Dead Sea Scrolls',
    tipo: 'manuscrito',
    origem: 'Qumram, Israel',
    data: '250 a.C. - 68 d.C.',
    descricao: 'Mais de 900 manuscritos encontrados em 11 cavernas perto do Mar Morto. Incluem a mais antiga cópia completa do livro de Isaías e fragmentos de todos os livros da Bíblia hebraica, exceto Ester.',
    relevanciaBiblica: 'Confirmam a fidelidade da transmissão textual do Antigo Testamento ao longo de mais de 1000 anos. Mostram que o texto massorético é notavelmente estável.',
    cor: '#22c55e',
    trechos: [
      {
        texto: 'Isaías 53:3-5 — "Ele foi desprezado e rejeitado pelos homens, homem de dores e que sabe o que é padecer... Ele foi ferido pelas nossas transgressões, moido pelas nossas iniquidades."',
        referencia: '1QIsaᵃ',
        comparacaoCom: 'Isaías 53:3-5 (Bíblia)',
        nota: 'O texto de Qumram concorda em mais de 95% com o texto massorético, confirmando a precisão da transmissão.',
      },
      {
        texto: 'Salmo 22:16-18 — "Com passos de cão me cercaram... Repartiram entre si as minhas vestes, e sobre a minha túnica lançaram sortes."',
        referencia: '11QPsᵃ',
        comparacaoCom: 'Salmo 22:16-18 (Bíblia)',
        nota: 'Fragmentos do Salmo 22 em Qumram datam de ~100 a.C., confirmando que a profecia messiânica era conhecida antes de Cristo.',
      },
    ],
  },
  {
    id: 'novo-testamento',
    nome: 'Manuscritos do Novo Testamento',
    nomeOriginal: 'New Testament Manuscripts',
    tipo: 'manuscrito',
    origem: 'Egito, Turquia, Grécia',
    data: '125 d.C. - 1000 d.C.',
    descricao: 'Mais de 5.800 manuscritos gregos do Novo Testamento, com fragmentos como o P52 (João 18, ~125 d.C.) sendo os mais antigos. A data de composição dos evangelhos é muito próxima aos eventos descritos.',
    relevanciaBiblica: 'A abundância de manuscritos permite reconstruir o texto original com altíssimo grau de certeza. Comparado com outros textos antigos, o NT tem evidência manuscrita excepcional.',
    cor: '#3b82f6',
    trechos: [
      {
        texto: 'João 1:1 — "No princípio era o Verbo, e o Verbo estava com Deus, e o Verbo era Deus."',
        referencia: 'P66 (~200 d.C.)',
        comparacaoCom: 'João 1:1 (Bíblia)',
        nota: 'O Papiro 66, datado de ~200 d.C., confirma o texto exato de João 1:1, incluindo a declaração da divindade de Cristo.',
      },
      {
        texto: '1 Coríntios 15:3-8 — "Cristo morreu por nossos pecados, segundo as Escrituras, e foi sepultado, e ressuscitou ao terceiro dia..."',
        referencia: 'P46 (~200 d.C.)',
        comparacaoCom: '1 Coríntios 15:3-8 (Bíblia)',
        nota: 'O P46 contém quase toda a epístola aos Romanos e 1 Coríntios, confirmando que o credo cristão primitivo já estava fixado por escrito muito cedo.',
      },
    ],
  },
  {
    id: 'josefo',
    nome: 'Obras de Flávio Josefo',
    nomeOriginal: 'Works of Flavius Josephus',
    tipo: 'escrito',
    origem: 'Roma/Israel',
    data: '93-94 d.C.',
    descricao: 'Historiador judeu que viveu no século I. Suas obras "Antiguidades Judaicas" e "Guerra dos Judeus" fornecem contexto histórico crucial para o Novo Testamento.',
    relevanciaBiblica: 'Confirma a existência histórica de Jesus, Tiago, João Batistas, Pôncio Pilatos e vários eventos do Novo Testamento por uma fonte não-cristã.',
    cor: '#3b82f6',
    trechos: [
      {
        texto: 'Antiguidades 18.3.3 — "Naquele tempo viveu Jesus, um homem sábio, se é que se deve chamá-lo de homem. Pois ele fazia coisas incríveis e era mestre de pessoas que aceitam a verdade com prazer. Atraiu a muitos dos judeus e dos gregos."',
        comparacaoCom: 'Evangelhos canônicos',
        nota: 'Testemunho não-cristão mais importante sobre a historicidade de Jesus. Josefo também menciona Tiago, "irmão de Jesus chamado Cristo".',
      },
      {
        texto: 'Antiguidades 20.9.1 — "Ananias convocou o sinédrio... trouxeTiago, irmão de Jesus chamado Cristo, e alguns outros... e os entregou para serem apedrejados."',
        comparacaoCom: 'Atos 12:2, Gálatas 1:19',
        nota: 'Confirma o martírio de Tiago e a existência da comunidade cristã primitiva em Jerusalém.',
      },
    ],
  },
  {
    id: 'talmude',
    nome: 'Talmude Babilônico',
    nomeOriginal: 'Babylonian Talmud',
    tipo: 'escrito',
    origem: 'Babilônia',
    data: '200-500 d.C.',
    descricao: 'Compilação de discussões rabínicas sobre a Lei, tradições orais e interpretações. Contém menções a Jesus e ao cristianismo primitivo, geralmente hostis.',
    relevanciaBiblica: 'Fornece contexto cultural e religioso do judaísmo do segundo templo, ajuda a entender o ambiente em que o cristianismo nasceu.',
    cor: '#3b82f6',
    trechos: [
      {
        texto: 'Sanhedrin 43a — "Na véspera da Páscoa, penduraram Jesus (Yeshu). Forty dias antes, um arauto proclamou: "Ele será apedrejado porque praticou magia e enganou Israel."',
        comparacaoCom: 'Mateus 27:22-26',
        nota: 'Embora hostil, este texto confirma que Jesus foi executado por "praticar magia" (milagres) e "engana Israel" (ensinos considerados heréticos pelas autoridades).',
      },
    ],
  },
  {
    id: 'papiros',
    nome: 'Papiros de Oxyrhynchus',
    nomeOriginal: 'Oxyrhynchus Papyri',
    tipo: 'manuscrito',
    origem: 'Oxyrhynchus, Egito',
    data: '200-700 d.C.',
    descricao: 'Milhares de fragmentos de papiros descobertos no Egito, incluindo porções do Novo Testamento, textos cristãos primitivos e documentos do cotidiano.',
    relevanciaBiblica: 'Textos como P135 confirmam a circulação de epístolas paulinas no século II. Fragmentos de Mateus e Lucas atestam a rapidez da difusão dos evangelhos.',
    cor: '#22c55e',
    trechos: [
      {
        texto: 'P135 — Fragmento de Romanos 1-8, datado de ~250 d.C.',
        comparacaoCom: 'Romanos (Bíblia)',
        nota: 'Confirma que Romanos circulava amplamente no Egito no século III, apenas ~175 anos após sua composição.',
      },
    ],
  },
  {
    id: 'didache',
    nome: 'Didaché',
    nomeOriginal: 'Didache',
    tipo: 'escrito',
    origem: 'Síria/Palestina',
    data: '50-120 d.C.',
    descricao: 'Um dos mais antigos documentos cristãos extra-bíblicos. Manual de instruções para a comunidade, incluindo ensinos sobre batismo, eucaristia e disciplina.',
    relevanciaBiblica: 'Mostra a estrutura da igreja primitiva e como os ensinos de Jesus eram aplicados na prática. Confirma a importância do "Discipulado dos Doze".',
    cor: '#3b82f6',
    trechos: [
      {
        texto: 'Didaché 1:1-2 — "Há dois caminhos: um da vida e um da morte. Muito diferentes são os dois caminhos. O caminho da vida é este: Amarás a Deus que te criou; e ao teu próximo como a ti mesmo."',
        comparacaoCom: 'Mateus 22:37-40',
        nota: 'Reflete diretamente o ensino de Jesus sobre o maior mandamento, demonstrando que era central na prática da igreja primitiva.',
      },
    ],
  },
];

const TIPO_CONFIG = {
  manuscrito: { cor: '#22c55e', bg: 'rgba(34,197,94,0.1)', label: 'Manuscrito' },
  escrito: { cor: '#3b82f6', bg: 'rgba(59,130,246,0.1)', label: 'Escrito' },
  traducao: { cor: '#a855f7', bg: 'rgba(168,85,247,0.1)', label: 'Tradução' },
};

export default function TextosExtrabiblicosPage() {
  const [selecionado, setSelecionado] = useState<string | null>(null);
  const [busca, setBusca] = useState('');
  const [expandedTrecho, setExpandedTrecho] = useState<number | null>(null);

  const filtrados = TEXTOS.filter(t =>
    !busca ||
    t.nome.toLowerCase().includes(busca.toLowerCase()) ||
    t.descricao.toLowerCase().includes(busca.toLowerCase()) ||
    t.relevanciaBiblica.toLowerCase().includes(busca.toLowerCase())
  );

  const selecionadoData = TEXTOS.find(t => t.id === selecionado);

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Header />
      <main className="max-w-6xl mx-auto px-4 pt-24 pb-16">
        <ScrollReveal>
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--brand-subtle)] text-[var(--brand-default)] text-xs font-semibold mb-4">
              <FileText className="w-3.5 h-3.5" />
              Textos Extrabíblicos
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-[var(--content-primary)] mb-3">
              Fontes <span className="text-[var(--brand-default)]">Extrabíblicas</span>
            </h1>
            <p className="text-[var(--content-secondary)] max-w-lg mx-auto">
              Explore textos históricos que complementam e confirmam a narrativa bíblica.
              Manuscritos, escritos de historiadores e documentos da igreja primitiva.
            </p>
          </div>
        </ScrollReveal>

        {/* Busca */}
        <div className="relative mb-8 max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--content-muted)]" />
          <input
            type="text"
            value={busca}
            onChange={e => setBusca(e.target.value)}
            placeholder="Buscar texto histórico..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[var(--surface-sunken)] border border-[var(--border)] text-[var(--content-primary)] text-sm placeholder:text-[var(--content-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-default)]/50"
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Lista */}
          <div className="lg:col-span-1 space-y-3">
            {filtrados.map((texto, i) => {
              const config = TIPO_CONFIG[texto.tipo];
              const isSelected = selecionado === texto.id;
              return (
                <ScrollReveal key={texto.id} delay={i * 0.05}>
                  <button
                    onClick={() => { setSelecionado(isSelected ? null : texto.id); setExpandedTrecho(null); }}
                    className={cn(
                      'w-full text-left p-4 rounded-xl border transition-all',
                      isSelected
                        ? 'border-[var(--brand-default)] bg-[var(--brand-subtle)]/30 shadow-sm'
                        : 'border-[var(--border)]/50 bg-[var(--surface-raised)] hover:border-[var(--brand-default)]/30'
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                        style={{ background: config.bg }}
                      >
                        <FileText className="w-5 h-5" style={{ color: config.cor }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-bold text-[var(--content-primary)] mb-0.5">{texto.nome}</h3>
                        <p className="text-[10px] text-[var(--content-muted)] italic">{texto.nomeOriginal}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span
                            className="text-[9px] px-1.5 py-0.5 rounded-full font-medium"
                            style={{ background: config.bg, color: config.cor }}
                          >
                            {config.label}
                          </span>
                          <span className="text-[9px] text-[var(--content-muted)]">{texto.data}</span>
                        </div>
                      </div>
                    </div>
                  </button>
                </ScrollReveal>
              );
            })}
          </div>

          {/* Detalhe */}
          <div className="lg:col-span-2">
            {selecionadoData ? (
              <motion.div
                key={selecionadoData.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                {/* Header */}
                <div className="glass-card p-6 rounded-2xl">
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: TIPO_CONFIG[selecionadoData.tipo].bg }}
                    >
                      <FileText className="w-7 h-7" style={{ color: TIPO_CONFIG[selecionadoData.tipo].cor }} />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-[var(--content-primary)]">{selecionadoData.nome}</h2>
                      <p className="text-sm text-[var(--content-muted)] italic">{selecionadoData.nomeOriginal}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 mb-4 text-xs text-[var(--content-secondary)]">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{selecionadoData.origem}</span>
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{selecionadoData.data}</span>
                  </div>

                  <p className="text-sm text-[var(--content-secondary)] leading-relaxed mb-4">
                    {selecionadoData.descricao}
                  </p>

                  <div className="p-3 rounded-xl bg-[var(--brand-subtle)]/30 border border-[var(--brand-default)]/20">
                    <h4 className="text-xs font-bold text-[var(--brand-default)] mb-1 flex items-center gap-1">
                      <BookOpen className="w-3 h-3" />Relevância Bíblica
                    </h4>
                    <p className="text-sm text-[var(--content-secondary)] leading-relaxed">
                      {selecionadoData.relevanciaBiblica}
                    </p>
                  </div>
                </div>

                {/* Trechos */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-[var(--content-primary)] flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[var(--brand-default)]" />
                    Trechos Relevantes
                  </h3>
                  {selecionadoData.trechos.map((trecho, i) => {
                    const isExpanded = expandedTrecho === i;
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass-card rounded-xl overflow-hidden"
                      >
                        <button
                          onClick={() => setExpandedTrecho(isExpanded ? null : i)}
                          className="w-full p-4 text-left hover:bg-[var(--surface-sunken)]/30 transition-colors"
                        >
                          <div className="flex items-center gap-2 mb-2">
                            {trecho.referencia && (
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--brand-subtle)] text-[var(--brand-default)] font-bold">
                                {trecho.referencia}
                              </span>
                            )}
                            <span className="text-[10px] text-[var(--content-muted)]">↔ {trecho.comparacaoCom}</span>
                          </div>
                          <p className="text-sm text-[var(--content-primary)] font-serif italic line-clamp-2">
                            {trecho.texto}
                          </p>
                          <div className="flex items-center justify-end mt-2">
                            {isExpanded ? <ChevronUp className="w-3 h-3 text-[var(--content-muted)]" /> : <ChevronDown className="w-3 h-3 text-[var(--content-muted)]" />}
                          </div>
                        </button>

                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0 }}
                              animate={{ height: 'auto' }}
                              exit={{ height: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="px-4 pb-4">
                                <blockquote className="text-sm text-[var(--content-primary)] font-serif leading-relaxed border-l-2 border-[var(--brand-default)] pl-3 mb-3">
                                  &ldquo;{trecho.texto}&rdquo;
                                </blockquote>
                                <div className="p-3 rounded-lg bg-[var(--surface-sunken)]/50">
                                  <p className="text-xs text-[var(--content-secondary)]">
                                    <span className="font-bold text-[var(--brand-default)]">Nota:</span> {trecho.nota}
                                  </p>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <FileText className="w-12 h-12 text-[var(--content-muted)] mb-4" strokeWidth={1} />
                <p className="text-sm text-[var(--content-muted)]">Selecione um texto à esquerda para ver os detalhes</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
