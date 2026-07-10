'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { TODOS_LIVROS, carregarTraducao } from '@/data/biblia';
import { palavrasOriginais } from '@/data/biblia';
import { doutrinas } from '@/data/biblia';
import ScrollReveal from '@/components/ScrollReveal';
import {
  Search,
  BookOpen,
  Globe,
  Languages,
  Crosshair,
  FileText,
  ChevronDown,
  Sparkles,
  ArrowRight,
  ChevronRight,
} from 'lucide-react';

type LivroData = Record<string, Record<number, string[]>>;

const generos: Record<string, { genero: string; desc: string; icone: string }> = {
  gn: { genero: 'Narrativa / Lei', desc: 'Cosmogonia e narrativa patriarcal', icone: '📖' },
  ex: { genero: 'Narrativa / Lei', desc: 'Narrativa histórica com códigos legais', icone: '📜' },
  lv: { genero: 'Lei', desc: 'Código sacerdotal e leis de pureza', icone: '⚖️' },
  nm: { genero: 'Narrativa / Lei', desc: 'Narrativa com censos e leis', icone: '📊' },
  dt: { genero: 'Discurso / Lei', desc: 'Discursos de Moisés e recapitulação da lei', icone: '🗣️' },
  js: { genero: 'Narrativa', desc: 'Narrativa histórica de conquista', icone: '⚔️' },
  jz: { genero: 'Narrativa', desc: 'Narrativa cíclica dos juízes', icone: '🏛️' },
  rt: { genero: 'Narrativa', desc: 'Novela histórica', icone: '🌾' },
  '1sm': { genero: 'Narrativa', desc: 'Narrativa histórica biográfica', icone: '👑' },
  '2sm': { genero: 'Narrativa', desc: 'Narrativa histórica biográfica', icone: '🎵' },
  '1rs': { genero: 'Narrativa', desc: 'Narrativa histórica dos reis', icone: '🏗️' },
  '2rs': { genero: 'Narrativa', desc: 'Narrativa histórica dos reis', icone: '🔥' },
  '1cr': { genero: 'Narrativa', desc: 'Crônicas genealógicas e históricas', icone: '📋' },
  '2cr': { genero: 'Narrativa', desc: 'Crônicas históricas', icone: '📋' },
  ed: { genero: 'Narrativa', desc: 'Memórias e listas pós-exílicas', icone: '🔨' },
  ne: { genero: 'Narrativa', desc: 'Memórias e listas pós-exílicas', icone: '🧱' },
  et: { genero: 'Narrativa', desc: 'Novela histórica', icone: '🎭' },
  'jó': { genero: 'Narrativa / Diálogo', desc: 'Diálogo poético-teológico sobre o sofrimento', icone: '💎' },
  sl: { genero: 'Poesia / Hinódia', desc: 'Coleção de hinos, orações e poemas litúrgicos', icone: '🎵' },
  pv: { genero: 'Sabedoria', desc: 'Provérbios e ditados sapienciais', icone: '🧠' },
  ec: { genero: 'Sabedoria', desc: 'Reflexão filosófico-teológica', icone: '🤔' },
  ct: { genero: 'Poesia', desc: 'Poesia de amor e alegoria nupcial', icone: '💕' },
  is: { genero: 'Profecia', desc: 'Oraculos proféticos de juízo e consolo', icone: '👁️' },
  jr: { genero: 'Profecia / Narrativa', desc: 'Oraculos proféticos com narrativa biográfica', icone: '😢' },
  lm: { genero: 'Poesia / Lamento', desc: 'Poemas de lamento pela queda de Jerusalém', icone: '💔' },
  ez: { genero: 'Profecia / Apocalíptico', desc: 'Visões proféticas e oráculos simbólicos', icone: '🔮' },
  dn: { genero: 'Apocalíptico / Narrativa', desc: 'Narrativa com visões apocalípticas', icone: '🦁' },
  os: { genero: 'Profecia', desc: 'Oraculos proféticos com simbolismo matrimonial', icone: '💍' },
  jl: { genero: 'Profecia', desc: 'Oraculos proféticos apocalípticos', icone: '🦗' },
  am: { genero: 'Profecia', desc: 'Oraculos proféticos de justiça social', icone: '⚖️' },
  ob: { genero: 'Profecia', desc: 'Oraculo profético contra Edom', icone: '🏔️' },
  jn: { genero: 'Narrativa / Profecia', desc: 'Narrativa profética com ironia divina', icone: '🐋' },
  mq: { genero: 'Profecia', desc: 'Oraculos proféticos de juízo e esperança', icone: '🌾' },
  na: { genero: 'Profecia', desc: 'Oraculo profético contra Nínive', icone: '🏚️' },
  hc: { genero: 'Profecia', desc: 'Diálogo profético sobre teodiceia', icone: '🤔' },
  sf: { genero: 'Profecia', desc: 'Oraculos proféticos de juízo universal', icone: '🌍' },
  ag: { genero: 'Profecia', desc: 'Oraculos proféticos sobre o Templo', icone: '🏗️' },
  zc: { genero: 'Profecia / Apocalíptico', desc: 'Visões apocalípticas e oráculos de restauração', icone: '👁️' },
  ml: { genero: 'Profecia', desc: 'Oraculos proféticos de acusação e promessa', icone: '📧' },
  mt: { genero: 'Evangelho', desc: 'Evangelho narrativo com discursos', icone: '📖' },
  mc: { genero: 'Evangelho', desc: 'Evangelho narrativo conciso', icone: '🏃' },
  lc: { genero: 'Evangelho', desc: 'Evangelho narrativo detalhado', icone: '👨‍⚕️' },
  jo: { genero: 'Evangelho', desc: 'Evangelho teológico com discursos', icone: '💡' },
  at: { genero: 'Narrativa', desc: 'História da igreja primitiva', icone: '🔥' },
  rm: { genero: 'Epístola', desc: 'Carta doutrinária e teológica', icone: '✉️' },
  '1co': { genero: 'Epístola', desc: 'Carta pastoral e corretiva', icone: '✉️' },
  '2co': { genero: 'Epístola', desc: 'Carta pastoral e apologética', icone: '✉️' },
  gl: { genero: 'Epístola', desc: 'Carta polêmica sobre a graça', icone: '✉️' },
  ef: { genero: 'Epístola', desc: 'Carta doutrinária sobre a igreja', icone: '✉️' },
  fp: { genero: 'Epístola', desc: 'Carta de gratidão e exortação', icone: '✉️' },
  cl: { genero: 'Epístola', desc: 'Carta cristológica e pastoral', icone: '✉️' },
  '1ts': { genero: 'Epístola', desc: 'Carta escatológica e pastoral', icone: '✉️' },
  '2ts': { genero: 'Epístola', desc: 'Carta escatológica corretiva', icone: '✉️' },
  '1tm': { genero: 'Epístola', desc: 'Carta pastoral a Timóteo', icone: '✉️' },
  '2tm': { genero: 'Epístola', desc: 'Carta pastoral testamentária', icone: '✉️' },
  tt: { genero: 'Epístola', desc: 'Carta pastoral a Tito', icone: '✉️' },
  fm: { genero: 'Epístola', desc: 'Carta pessoal de intercessão', icone: '✉️' },
  hb: { genero: 'Epístola / Homilia', desc: 'Homilia teológica sobre a superioridade de Cristo', icone: '✝️' },
  tg: { genero: 'Epístola', desc: 'Carta ético-pastoral', icone: '✉️' },
  '1pe': { genero: 'Epístola', desc: 'Carta de exortação na perseguição', icone: '✉️' },
  '2pe': { genero: 'Epístola', desc: 'Carta de advertência contra falsos mestres', icone: '✉️' },
  '1jo': { genero: 'Epístola', desc: 'Carta sobre comunhão e amor', icone: '❤️' },
  '2jo': { genero: 'Epístola', desc: 'Breve carta sobre a verdade', icone: '✉️' },
  '3jo': { genero: 'Epístola', desc: 'Breve carta de hospitalidade', icone: '✉️' },
  jd: { genero: 'Epístola', desc: 'Carta polêmica contra hereges', icone: '⚠️' },
  ap: { genero: 'Apocalíptico', desc: 'Visão profética apocalíptica', icone: '🔮' },
};

type ContextoHistoricoLivro = {
  livro: string;
  periodo: string;
  autor: string;
  data: string;
  local: string;
  publico: string;
  proposito: string;
  contextoPolitico: string;
  contextoCultural: string;
  contextoReligioso: string;
  fatosChave: string[];
};

const contextoHistorico: Record<string, ContextoHistoricoLivro> = {
  // ===== PENTATEUCO =====
  gn: {
    livro: 'Gênesis',
    periodo: 'Patriarcal',
    autor: 'Moisés (tradicional)',
    data: '~1440-1400 a.C.',
    local: 'Deserto do Sinai',
    publico: 'Israel (povo hebreu)',
    proposito: 'Registrar as origens do mundo, da humanidade e da nação de Israel, estabelecendo a aliança de Deus com os patriarcas.',
    contextoPolitico: 'Israel era um povo recently libertado do Egito, sem território próprio, peregrinando pelo deserto.',
    contextoCultural: 'Tradições orais patriarcais preservadas e compiladas; cultura nômade semítica do Oriente Médio.',
    contextoReligioso: 'Monoteísmo em contraste com o politeísmo egípcio e cananeu; introdução do conceito de aliança.',
    fatosChave: [
      'Relato da Criação e da Queda (Gn 1-3)',
      'Dilúvio e aliança com Noé (Gn 6-9)',
      'Chamado de Abraão e aliança da promessa (Gn 12)',
      'José no Egito e migração dos patriarcas (Gn 37-50)',
      'Origem dos doze clãs de Israel',
    ],
  },
  ex: {
    livro: 'Êxodo',
    periodo: 'Lei',
    autor: 'Moisés (tradicional)',
    data: '~1440-1400 a.C.',
    local: 'Deserto do Sinai',
    publico: 'Israel (povo hebreu)',
    proposito: 'Narra a libertação de Israel da escravidão no Egito e o estabelecimento da aliança no Sinai.',
    contextoPolitico: 'Egito sob a dinastia dos faraós opressores; Israel era escravizado no Delta do Nilo.',
    contextoCultural: 'Cultura egípcia dominante; Israel absorveu elementos culturais egípcios durante a escravidão.',
    contextoReligioso: 'Revelação do nome de YHWH; konkursa com os deuses egípcios (as pragas); entrega da Lei.',
    fatosChave: [
      'Nascimento e fuga de Moisés (Ex 2)',
      'As dez pragas sobre o Egito (Ex 7-12)',
      'Travessia do Mar Vermelho (Ex 14)',
      'Entrega da Lei e dos Dez Mandamentos no Sinai (Ex 19-20)',
      'Construção do Tabernáculo (Ex 25-40)',
    ],
  },
  lv: {
    livro: 'Levítico',
    periodo: 'Lei',
    autor: 'Moisés (tradicional)',
    data: '~1440-1400 a.C.',
    local: 'Deserto do Sinai',
    publico: 'Israel (sacerdotes e povo)',
    proposito: 'Instruir sobre o culto, sacrifícios, pureza ritual e santidade, estabelecendo o sistema sacerdotal.',
    contextoPolitico: 'Israel organizando-se como nação sob a Lei divina no deserto.',
    contextoCultural: 'Práticas sacrifaciais comuns no antigo Oriente Médio; Israel as adapta com significado teológico único.',
    contextoReligioso: 'Sistema sacrifical detalhado; distinção entre sagrado e profano; dia da expiação (Yom Kippur).',
    fatosChave: [
      'Sistema de sacrifícios (holocausto, oferta de paz, etc.) (Lv 1-7)',
      'Inauguração do sacerdócio de Arão (Lv 8-10)',
      'Leis de pureza e impureza (Lv 11-15)',
      'Dia da Expiação (Lv 16)',
      'Código de santidade: "Sede santos" (Lv 17-26)',
    ],
  },
  nm: {
    livro: 'Números',
    periodo: 'Lei',
    autor: 'Moisés (tradicional)',
    data: '~1440-1400 a.C.',
    local: 'Deserto do Sinai / Planície de Moabe',
    publico: 'Israel (povo hebreu)',
    proposito: 'Narra a peregrinação de 40 anos no deserto, incluindo censos, rebeliões e leis.',
    contextoPolitico: 'Israel era um povo itinerante sem território, cercado por nações inimicas (madianitas, amalequitas).',
    contextoCultural: 'Organização tribal para marcha e acampamento; sistema de tribos dispostas em torno do Tabernáculo.',
    contextoReligioso: 'Rebélias contra Moisés e Deus; julgamentos divinos; profecias de Balaão.',
    fatosChave: [
      'Censos das tribos de Israel (Nm 1-4)',
      'Rebélia de Corá e os 250 lideres (Nm 16)',
      'Espionagem de Canaã e sentença de 40 anos (Nm 13-14)',
      'Profecias de Balaão sobre Israel (Nm 22-24)',
      'Entrada na planície de Moabe, à beira de Canaã (Nm 36)',
    ],
  },
  dt: {
    livro: 'Deuteronômio',
    periodo: 'Lei',
    autor: 'Moisés (tradicional)',
    data: '~1400 a.C.',
    local: 'Planície de Moabe',
    publico: 'Israel (nova geração prestes a entrar em Canaã)',
    proposito: 'Reapresentar a Lei antes da entrada em Canaã, renovando a aliança entre Deus e Israel.',
    contextoPolitico: 'Israel estava à beira do Jordão, pronto para conquistar a terra prometida; Moisés não entraria.',
    contextoCultural: 'Geração que cresceu no deserto, sem experiência da aliança original no Sinai.',
    contextoReligioso: 'Renovação da aliança; exortação à fidelidade; advertências contra a idolatria.',
    fatosChave: [
      'Discursos de Moisés回顾 da jornada no deserto (Dt 1-4)',
      'Repetição dos Dez Mandamentos (Dt 5)',
      'Shema: "Ouve, Israel" — resumo da fé (Dt 6:4-9)',
      'Bênçãos e maldições da aliança (Dt 28)',
      'Morte de Moisés e sucessão de Josué (Dt 34)',
    ],
  },

  // ===== HISTORICOS =====
  js: {
    livro: 'Josué',
    periodo: 'Conquista',
    autor: 'Josué / Samuel (tradicional)',
    data: '~1400-1350 a.C.',
    local: 'Canaã',
    publico: 'Israel (povo conquistador)',
    proposito: 'Narra a conquista e divisão da terra de Canaã sob a liderança de Josué.',
    contextoPolitico: 'Israel entrando em Canaã; cidades-estado cananeas organizadas com reis locais.',
    contextoCultural: 'Cultura cananea com práticas religiosas idólatras; Israel devia separar-se dessas práticas.',
    contextoReligioso: 'Cumprimento da promessa de Deus a Abraão; o Arca da Aliança lidera a travessia do Jordão.',
    fatosChave: [
      'Travessia do Jordão seco (Js 3)',
      'Conquista de Jericó (Js 6)',
      'Batalha de Ai e o pecado de Acã (Js 7-8)',
      'Parar do sol e da lua (Js 10)',
      'Divisão da terra entre as tribos (Js 13-21)',
    ],
  },
  jz: {
    livro: 'Juízes',
    periodo: 'Juízes',
    autor: 'Samuel (tradicional)',
    data: '~1050 a.C.',
    local: 'Israel',
    publico: 'Israel (povo em crise)',
    proposito: 'Mostrar o ciclo de apostasia, opressão e libertação durante o período dos juízes.',
    contextoPolitico: 'Israel sem governo central; cada tribo agia por conta própria; inimigos ao redor.',
    contextoCultural: 'Sincretismo religioso com os cananeus; deterioração moral e espiritual.',
    contextoReligioso: 'Ciclo teológico: pecado → opressão → clamor → libertação → paz → pecado novamente.',
    fatosChave: [
      'Ongeri liberta Israel dos moabitas (Jz 3)',
      'Débora e Baraque derrotam Sísera (Jz 4-5)',
      'Gideão e os 300 homens contra os midianitas (Jz 7)',
      'Sansão e os filisteus (Jz 13-16)',
      'Declaração: "Naqueles dias não havia rei em Israel" (Jz 21:25)',
    ],
  },
  rt: {
    livro: 'Rute',
    periodo: 'Juízes',
    autor: 'Samuel (tradicional)',
    data: '~1050 a.C.',
    local: 'Betém e Moabe',
    publico: 'Israel',
    proposito: 'Narra a fidelidade de Rute, uma moabita, e sua inclusão na linhagem do Messias.',
    contextoPolitico: 'Período de instabilidade; fome leva a migrações; ausência de governo central.',
    contextoCultural: 'Relações entre israelitas e moabitas; costume do resgatador (redeemer); lealdade familiar.',
    contextoReligioso: 'Bondade divina (hesed) operando através da fidelidade humana; providência de Deus.',
    fatosChave: [
      'Fome em Israel leva a família de Elimeleque a Moabe',
      'Lealdade de Rute a Noemi: "teu povo será o meu povo" (Rt 1:16)',
      'Rute no campo de Boaz, seguindo os costumes de colheita',
      'Boaz como resgatador (goel) de Rute',
      'Rute ancestral de Davi e de Jesus (Rt 4)',
    ],
  },
  '1sm': {
    livro: '1 Samuel',
    periodo: 'Monarquia Unificada',
    autor: 'Samuel / Natã / Gade (tradicional)',
    data: '~1000 a.C.',
    local: 'Israel',
    publico: 'Israel',
    proposito: 'Narra a transição de juízes para monarquia: Samuel, Saul e Davi.',
    contextoPolitico: 'Israel pede um rei "como as outras nações"; Samuel ungue Saul como primeiro rei.',
    contextoCultural: 'Influência filistea; centralização do culto em Siló e depois em Jerusalém.',
    contextoReligioso: 'Profecia de Samuel; rejeição de Saul; unção de Davi como rei escolhido por Deus.',
    fatosChave: [
      'Nascimento e chamado de Samuel (1Sm 1-3)',
      'Israel pede um rei; Saul é ungue (1Sm 8-10)',
      'Saul rejeitado por Deus por desobediência (1Sm 15)',
      'Davi vence Golias (1Sm 17)',
      'Morte de Saul e início da ascendência de Davi (1Sm 31)',
    ],
  },
  '2sm': {
    livro: '2 Samuel',
    periodo: 'Monarquia Unificada',
    autor: 'Samuel / Natã / Gade (tradicional)',
    data: '~970-930 a.C.',
    local: 'Israel',
    publico: 'Israel',
    proposito: 'Narra o reinado de Davi, suas conquistas, pecados e consequências.',
    contextoPolitico: 'Unificação das tribos; expansão territorial; capital em Jerusalém.',
    contextoCultural: 'Israel torna-se potência regional; florescimento cultural e literário.',
    contextoReligioso: 'Aliança davídica: promessa de um reino eterno; arrependimento de Davi.',
    fatosChave: [
      'Davi ungi rei sobre Judá e depois sobre Israel (2Sm 2, 5)',
      'Traslado da Arca para Jerusalém (2Sm 6)',
      'Aliança davídica (2Sm 7)',
      'Pecado de Davi com Bate-Seba e assassinato de Urias (2Sm 11-12)',
      'Revolta de Absalom e guerra civil (2Sm 15-18)',
    ],
  },
  '1rs': {
    livro: '1 Reis',
    periodo: 'Monarquia Dividida',
    autor: 'Jeremias (tradicional)',
    data: '~560-540 a.C.',
    local: 'Babilônia / Judá',
    publico: 'Exilados em Babilônia',
    proposito: 'Nrar a história de Salomão, a divisão do reino e o ministério de Elias.',
    contextoPolitico: 'Reino dividido: Israel (norte) e Judá (sul); disputas políticas e guerras.',
    contextoCultural: 'Templo de Salomão como centro religioso; comércio e diplomacia internacionais.',
    contextoReligioso: 'Apostasia crescente em Israel; profecia de Elias contra a idolatria de Acabe e Jezabel.',
    fatosChave: [
      'Coroação e sabedoria de Salomão (1Rs 3)',
      'Construção do Templo de Jerusalém (1Rs 6)',
      'Divisão do reino: Roboão vs. Jeroboão (1Rs 12)',
      'Competição no Monte Carmelo: Elias vs. profetas de Baal (1Rs 18)',
      'Morte de Acabe e vitória de Jezael (1Rs 22)',
    ],
  },
  '2rs': {
    livro: '2 Reis',
    periodo: 'Monarquia Dividida',
    autor: 'Jeremias (tradicional)',
    data: '~560-540 a.C.',
    local: 'Babilônia / Judá',
    publico: 'Exilados em Babilônia',
    proposito: 'Narra a história dos reis de Israel e Judá até o exílio babilônico.',
    contextoPolitico: 'Declínio e queda de Israel (722 a.C.) e queda de Judá (586 a.C.); impérios assírio e babilônico.',
    contextoCultural: 'Assimilação cultural progressiva; exílio como ruptura cultural e religiosa.',
    contextoReligioso: 'Profecias de Eliseu; reformas de Josias; juízo divino através de nações pagãs.',
    fatosChave: [
      'Assunção de Elias em carruagem de fogo (2Rs 2)',
      'Multiplicação do óleo e ressurreição do filho da viúva (2Rs 4)',
      'Queda de Samaria e exílio de Israel (722 a.C.) (2Rs 17)',
      'Reforma de Josias e descoberta do Livro da Lei (2Rs 22)',
      'Queda de Jerusalém e exílio na Babilônia (586 a.C.) (2Rs 25)',
    ],
  },
  '1cr': {
    livro: '1 Crônicas',
    periodo: 'Pós-Exílico',
    autor: 'Esdras (tradicional)',
    data: '~450-430 a.C.',
    local: 'Jerusalém',
    publico: 'Comunidade judaica pós-exílica',
    proposito: 'Recontar a história de Israel enfatizando a linhagem davídica e o culto no Templo.',
    contextoPolitico: 'Judá sob domínio persa; reconstrução do Templo e da identidade nacional.',
    contextoCultural: 'Necessidade de preservar genealogias e tradições após o exílio.',
    contextoReligioso: 'Restauração do culto; ênfase no sacerdócio e nas organizações levíticas.',
    fatosChave: [
      'Genealogias desde Adão até Davi (1Cr 1-9)',
      'Unção de Davi como rei (1Cr 11)',
      'Arca da Aliança trazida a Jerusalém (1Cr 13, 15)',
      'Organização dos levitas e sacerdotes (1Cr 23-26)',
      'Plano do Templo revelado a Davi (1Cr 28)',
    ],
  },
  '2cr': {
    livro: '2 Crônicas',
    periodo: 'Pós-Exílico',
    autor: 'Esdras (tradicional)',
    data: '~450-430 a.C.',
    local: 'Jerusalém',
    publico: 'Comunidade judaica pós-exílica',
    proposito: 'Enfatizar a história de Judá, o Templo e as reformas religiosas.',
    contextoPolitico: 'Judá como província persa; reconstrução identitária pós-exílio.',
    contextoCultural: 'Reconstrução do Templo (516 a.C.) como centro da vida nacional.',
    contextoReligioso: 'Foco no cultocentral; rejeição da idolatria; esperança messiânica.',
    fatosChave: [
      'Reinado de Salomão e dedicação do Templo (2Cr 1-7)',
      'Reforma de Ezequias contra a idolatria (2Cr 29-31)',
      'Reforma de Josias: a maior Páscoa (2Cr 34-35)',
      'Destruição do Templo (586 a.C.) (2Cr 36)',
      'Decreto de Ciro para reconstrução (2Cr 36:22-23)',
    ],
  },
  ed: {
    livro: 'Esdras',
    periodo: 'Pós-Exílico',
    autor: 'Esdras (tradicional)',
    data: '~440 a.C.',
    local: 'Jerusalém',
    publico: 'Comunidade judaica pós-exílica',
    proposito: 'Nrar a reconstrução do Templo e a reforma religiosa sob Esdras.',
    contextoPolitico: 'Judá sob domínio persa; permissão de Ciro para retornar e reconstruir.',
    contextoCultural: 'Retorno do exílio; miscigenação com povos locais; preservação da Lei.',
    contextoReligioso: 'Reconstrução do Templo; leitura pública da Lei; reforma do casamento misto.',
    fatosChave: [
      'Decreto de Ciro e retorno do exílio (Ed 1)',
      'Reconstrução do Templo com oposição (Ed 3-6)',
      'Reforma religiosa de Esdras (Ed 7-10)',
      'Leitura pública da Lei na praça (Ed 8)',
      'Lamento e separação das esposas estrangeiras',
    ],
  },
  ne: {
    livro: 'Neemias',
    periodo: 'Pós-Exílico',
    autor: 'Neemias (tradicional)',
    data: '~430 a.C.',
    local: 'Jerusalém',
    publico: 'Comunidade judaica pós-exílica',
    proposito: 'Nrar a reconstrução dos muros de Jerusalém e a reforma social e religiosa.',
    contextoPolitico: 'Judá sob domínio persa; Neemias como copo do rei Artaxerxes.',
    contextoCultural: 'Muros de Jerusalém em ruínas; vulnerabilidade militar e social.',
    contextoReligioso: 'Reforma da Lei; separação do povo; renovação da aliança.',
    fatosChave: [
      'Neemias recebe permissão para reconstruir Jerusalém (Ne 2)',
      'Reconstrução dos muros em 52 dias (Ne 4, 6)',
      'Leitura da Lei e renovação da aliança (Ne 8-10)',
      'Dedicação dos muros (Ne 12)',
      'Expulsão de Tobias do Templo (Ne 13)',
    ],
  },
  et: {
    livro: 'Ester',
    periodo: 'Pós-Exílico',
    autor: 'Desconhecido (tradicional: Mardoqueu)',
    data: '~450-350 a.C.',
    local: 'Império Persa (Susa)',
    publico: 'Judeus dispersos no império persa',
    proposito: 'Explicar a origem da festa de Púrim e demonstrar a proteção divina sobre Israel.',
    contextoPolitico: 'Judeus vivendo como minoria no vasto império persa; antisemitismo palaciano.',
    contextoCultural: 'Assimilação cultural na corte persa; identidade judaica ameaçada.',
    contextoReligioso: 'Deus não é mencionado diretamente, mas sua providência é evidente em toda a narrativa.',
    fatosChave: [
      'Ester escolhida rainha da Pérsia (Et 2)',
      'Mardoqueu descobre conspiração contra o rei (Et 2:21-23)',
      'Haman planeja exterminar os judeus (Et 3)',
      'Ester revela sua identidade e salva o povo (Et 7)',
      'Instituição da festa de Púrim (Et 9)',
    ],
  },

  // ===== POESIA =====
  jb: {
    livro: 'Jó',
    periodo: 'Patriarcal',
    autor: 'Moisés / Salomão (tradicional)',
    data: '~2000-1800 a.C. (narrativa); ~600-400 a.C. (composição)',
    local: 'Terra de Uz / deserto',
    publico: 'Israel e todos os que sofrem injustamente',
    proposito: 'Explorar o mistério do sofrimento inocente e a soberania de Deus.',
    contextoPolitico: 'Contexto patriarcal, anterior à formação de Israel como nação.',
    contextoCultural: 'Tradição sapiencial do Oriente Médio; debate poético-teológico sobre a retribuição divina.',
    contextoReligioso: 'Desafio ao dogma da retribuição: o justo sofre e o ímpio prospera.',
    fatosChave: [
      'Provação de Jó: perda de bens, filhos e saúde (Jb 1-2)',
      'Debate com os três amigos: Elifaz, Bildade e Zofar (Jb 3-31)',
      'Elihu apresenta uma perspectiva diferente (Jb 32-37)',
      'Deus fala da tempestade (Jb 38-41)',
      'Restauração de Jó (Jb 42)',
    ],
  },
  sl: {
    livro: 'Salmos',
    periodo: 'Monarquia / Pós-Exílico',
    autor: 'Davi (73), Asafe (12), Filhos de Corá (11), Salomão (1), Moisés (1), outros',
    data: '~1000-400 a.C.',
    local: 'Israel / Jerusalém',
    publico: 'Israel e a igreja',
    proposito: 'Livro de hinos, orações e poemas para culto, devoção e expressão emocional.',
    contextoPolitico: 'Escritos ao longo de vários séculos, refletindo monarquia, exílio e restauração.',
    contextoCultural: 'Poesia hebraica com paralelismo; tradição musical e litúrgica.',
    contextoReligioso: 'Expressão da vida espiritual: louvor, lamento, gratidão, arrependimento e esperança.',
    fatosChave: [
      'Salmo 23: "O Senhor é o meu pastor"',
      'Salmo 51: Lamento de Davi após o pecado com Bate-Seba',
      'Salmo 110: Profecia messiânica sobre o Messias sacerdote-rei',
      'Salmo 22: Profecia da crucificação de Jesus',
      'Coleção organizada em cinco livros (Salmos 1-150)',
    ],
  },
  pv: {
    livro: 'Provérbios',
    periodo: 'Monarquia',
    autor: 'Salomão (principal), Agur, Lemuel',
    data: '~970-700 a.C.',
    local: 'Jerusalém',
    publico: 'Jovens e buscadores de sabedoria',
    proposito: 'Coleção de provérbios sapienciais para instrução na vida prática e temor a Deus.',
    contextoPolitico: 'Israel sob monarquia; Jerusalém como centro cultural e comercial.',
    contextoCultural: 'Tradição sapiencial compartilhada com Egito e Mesopotâmia; sabedoria prática.',
    contextoReligioso: 'Temor do Senhor como princípio da sabedoria; contraste entre sabedoria e tolice.',
    fatosChave: [
      'Provérbios 1-9: Discurso sobre sabedoria e tolice',
      'Provérbios 31: A mulher virtuosa',
      'A Sabedoria personificada como mulher (Pv 8)',
      'Provérbios 22:6: "Instrui o menino no caminho"',
      'Coletânea de Agur e do rei Lemuel (Pv 30-31)',
    ],
  },
  ec: {
    livro: 'Eclesiastes',
    periodo: 'Monarquia Tardia',
    autor: 'Salomão (tradicional)',
    data: '~935-900 a.C.',
    local: 'Jerusalém',
    publico: 'Buscadores de sentido da vida',
    proposito: 'Refletir sobre o vazio das coisas terrenas e a necessidade de temer a Deus.',
    contextoPolitico: 'Período de prosperidade e depois declínio; crise da monarquia.',
    contextoCultural: 'Filosofia existencial hebraica; busca pelo sentido da vida.',
    contextoReligioso: '"Vaidade de vaidades" — tudo é passageiro; temer a Deus é o dever do homem.',
    fatosChave: [
      '"Vaidade de vaidades, tudo é vaidade" (Ec 1:2)',
      'Experimentação prazeres, sabedoria e obras (Ec 1-2)',
      'Todo tempo tem seu propósito: "há tempo para tudo" (Ec 3)',
      'O Pregador busca a sabedoria e encontra seus limites',
      'Conclusão: "Teme a Deus e guarda seus mandamentos" (Ec 12:13)',
    ],
  },
  ct: {
    livro: 'Cântico dos Cânticos',
    periodo: 'Monarquia',
    autor: 'Salomão (tradicional)',
    data: '~970-930 a.C.',
    local: 'Jerusalém / campos de Israel',
    publico: 'Noivos e estudiosos da sabedoria',
    proposito: 'Celebrar o amor humano e divino através de poesia nupcial e alegórica.',
    contextoPolitico: 'Israel sob monarquia; tempo de paz e prosperidade.',
    contextoCultural: 'Poesia de amor do Oriente Médio; imagens pastoris e naturais.',
    contextoReligioso: 'Alegoria do amor de Deus por Israel (judaísmo) ou de Cristo pela igreja (cristianismo).',
    fatosChave: [
      'Diálogo de amor entre o Rei e a Sulamita',
      'Imagens da natureza: jardim, fonte, vinha',
      'Busca e encontrada do amado (Ct 3, 5)',
      'Declaração: "O amor é forte como a morte" (Ct 8:6)',
      'Estrutura poética sem paralelo na literatura bíblica',
    ],
  },

  // ===== PROFETAS MAIORES =====
  is: {
    livro: 'Isaías',
    periodo: 'Monarquia Dividida',
    autor: 'Isaías',
    data: '~740-680 a.C.',
    local: 'Jerusalém',
    publico: 'Reino de Judá',
    proposito: 'Profetizar juízo contra a desobediência e consolo para os que creem na aliança.',
    contextoPolitico: 'Ameaça assíria; captura do reino do norte (722 a.C.); crise em Judá.',
    contextoCultural: 'Idolatria e injustiça social; confiança em alianças políticas em vez de Deus.',
    contextoReligioso: 'Chamado ao arrependimento; visão messiânica de um servo sofredor.',
    fatosChave: [
      'Chamado de Isaías no Templo (Is 6)',
      'Profecias de julgamento sobre nações (Is 13-23)',
      'O servo sofredor (Is 42, 49, 50, 52-53)',
      'Consolo: "Consolai, consolai o meu povo" (Is 40:1)',
      'Visão escatológica de novos céus e nova terra (Is 65)',
    ],
  },
  jr: {
    livro: 'Jeremias',
    periodo: 'Reino de Judá (antes do exílio)',
    autor: 'Jeremias',
    data: '~627-586 a.C.',
    local: 'Jerusalém / Egito',
    publico: 'Judá e Jerusalém',
    proposito: 'Chamar Judá ao arrependimento e profetizar a destruição de Jerusalém.',
    contextoPolitico: 'Judá entre Egito e Babilônia; instabilidade política e diplomatica.',
    contextoCultural: 'Profeta apocalíptico; perseguição e sofrimento pessoal.',
    contextoReligioso: 'Contra a religião superficial; chamado à justiça social e fidelidade à aliança.',
    fatosChave: [
      'Chamado de Jeremias: "Antes de te formar no ventre eu te conheci" (Jr 1)',
      'Profecias de juízo contra Judá e Jerusalém',
      'O pote de barro quebrado (Jr 18)',
      'Lamento: "Ó muros de Jerusalém" (Jr 29)',
      'Queda de Jerusalém (586 a.C.) e exílio (Jr 39)',
    ],
  },
  lm: {
    livro: 'Lamentações',
    periodo: 'Exílio',
    autor: 'Jeremias (tradicional)',
    data: '~586 a.C.',
    local: 'Jerusalém (em ruínas)',
    publico: 'Povo de Judá exilado',
    proposito: 'Expressar o lamento pela destruição de Jerusalém e do Templo.',
    contextoPolitico: 'Jerusalém destruída pelo rei Nabucodonosor da Babilônia.',
    contextoCultural: 'Trauma coletivo do exílio; perda da identidade nacional.',
    contextoReligioso: 'Juízo divino reconhecido; esperança nas misericórdias de Deus.',
    fatosChave: [
      'Jerusalém personificada como mulher em lágrimas (Lm 1)',
      'A ira de Deus contra as muros de Jerusalém (Lm 2)',
      'Esperança no meio da aflição: "As misericórdias do Senhor" (Lm 3)',
      'Degradê dos jovens e das crianças (Lm 4)',
      'Oração final de restauração (Lm 5)',
    ],
  },
  ez: {
    livro: 'Ezequiel',
    periodo: 'Exílio',
    autor: 'Ezequiel',
    data: '~593-571 a.C.',
    local: 'Babilônia (rio Quebar)',
    publico: 'Exilados em Babilônia',
    proposito: 'Profetizar o julgamento de Jerusalém e a futura restauração de Israel.',
    contextoPolitico: 'Exilados na Babilônia; Jerusalém destruída durante o exílio.',
    contextoCultural: 'Profecias simbólicas e visões apocalípticas; culturas babilônica e judaica.',
    contextoReligioso: 'Glória de Deus abandona o Templo; visão dos ossos secos restaurados.',
    fatosChave: [
      'Visão de Deus no trono sobre os querubins (Ez 1)',
      'Simbolismo: assar pão sobre fezes (Ez 4)',
      'Visão dos ossos secos revivendo (Ez 37)',
      'Plano do novo Templo (Ez 40-48)',
      'A glória de Deus retorna ao novo Templo (Ez 43)',
    ],
  },
  dn: {
    livro: 'Daniel',
    periodo: 'Exílio',
    autor: 'Daniel',
    data: '~605-530 a.C.',
    local: 'Babilônia / Pérsia',
    publico: 'Exilados em Babilônia',
    proposito: 'Mostrar a soberania de Deus sobre as nações e a fidelidade no exílio.',
    contextoPolitico: 'Domínio babilônico e depois persa; Daniel na corte real.',
    contextoCultural: 'Pressão para assimilar a cultura babilônica; resistência cultural e religiosa.',
    contextoReligioso: 'Deus controla o destino das nações; visões apocalípticas sobre o futuro.',
    fatosChave: [
      'Daniel e os três amigos na corte de Nabucodonosor (Dn 1)',
      'Interpretação do sonho da estátua (Dn 2)',
      'Os três jovens na fornalha (Dn 3)',
      'Daniel interpreta a escrita na parede (Dn 5)',
      'Visões deDaniel: quatro bestas e o Filho do Homem (Dn 7)',
    ],
  },

  // ===== PROFETAS MENORES =====
  os: {
    livro: 'Oséias',
    periodo: 'Reino do Norte',
    autor: 'Oséias',
    data: '~750-715 a.C.',
    local: 'Israel (reino do norte)',
    publico: 'Israel (reino do norte)',
    proposito: 'Usar o casamento de Oséias como metáfora da infidelidade de Israel a Deus.',
    contextoPolitico: 'Israel sob reis ímpios; instabilidade política; ameaça assíria.',
    contextoCultural: 'Idolatria generalizada; sincretismo com cultos cananeus.',
    contextoReligioso: 'Adulterio espiritual como imagem da idolatria; amor fiel de Deus.',
    fatosChave: [
      'Casamento de Oséias com Gômer, prostituta (Os 1)',
      'Metáfora do amor infiel e fiel de Deus',
      'Profecias contra a idolatria de Israel',
      'Promessa de restauração: "Vou atraí-la para o deserto" (Os 2)',
      'Exortação: "Quero misericórdia e não sacrifício" (Os 6:6)',
    ],
  },
  jl: {
    livro: 'Joel',
    periodo: 'Desconhecido (possivelmente pós-exílico)',
    autor: 'Joel',
    data: '~500-400 a.C.',
    local: 'Judá',
    publico: 'Povo de Judá',
    proposito: 'Usar a praga de gafanhotos como símbolo do dia do Senhor.',
    contextoPolitico: 'Judá pós-exílio ou em período de crise agrícola.',
    contextoCultural: 'Sociedade agrária devastada por pragas naturais.',
    contextoReligioso: 'O "dia do Senhor" como tempo de juízo e restauração.',
    fatosChave: [
      'Praga devastadora de gafanhotos (Jl 1)',
      'Exortação ao jejum e oração (Jl 1:13-14)',
      'Dia do Senhor: trevas e terremotos (Jl 2)',
      'Promessa do derramamento do Espírito (Jl 2:28)',
      'Juízo final sobre todas as nações (Jl 3)',
    ],
  },
  am: {
    livro: 'Amós',
    periodo: 'Reino do Norte',
    autor: 'Amós',
    data: '~760-750 a.C.',
    local: 'Israel (reino do norte)',
    publico: 'Israel (especialmente os ricos)',
    proposito: 'Condenar a injustiça social e a religião superficial de Israel.',
    contextoPolitico: 'Israel próspero sob Jeroboão II; aparente estabilidade política.',
    contextoCultural: 'Desigualdade social extrema; os ricos oprimiam os pobres.',
    contextoReligioso: 'Crítica à religião formal sem justiça social; o Senhor é justo.',
    fatosChave: [
      'Amós, o pastor de Tecoa, chamado como profeta (Am 1, 7)',
      'Denúncia contra nações vizinhas e contra Israel',
      'Visão dos cestos de frutas (Am 8)',
      '"Ruge da Sion, porque eu sou Deus" (Am 3:8)',
      'Profecia de restauração (Am 9:11-15)',
    ],
  },
  ob: {
    livro: 'Obadias',
    periodo: 'Reino de Judá',
    autor: 'Obadias',
    data: '~586 a.C.',
    local: 'Judá',
    publico: 'Povo de Judá',
    proposito: 'Profetizar a destruição de Edom por sua arrogância e traição.',
    contextoPolitico: 'Edom (descendentes de Esaú) traiu Judá durante a queda de Jerusalém.',
    contextoCultural: 'Rivalidade milenar entre Edom e Israel.',
    contextoReligioso: 'Juízo divino contra os que se aproveitam do sofrimento alheio.',
    fatosChave: [
      'Obadias é o menor livro do Antigo Testamento (21 versículos)',
      'Condenação de Edom por traição',
      'Orgulho de Edom: "Quem me derrubará do alto?"',
      'Juízo sobre Edom por seus vizinhos',
      'Promessa de restauração para Israel',
    ],
  },
  jn: {
    livro: 'Jonas',
    periodo: 'Reino do Norte',
    autor: 'Desconhecido (tradicional: Jonas)',
    data: '~800-750 a.C.',
    local: 'Nínive / Navá / mar',
    publico: 'Israel (reino do norte)',
    proposito: 'Mostrar a universalidade da misericórdia de Deus além de Israel.',
    contextoPolitico: 'Assíria como ameaça a Israel; Nínive como capital do império.',
    contextoCultural: 'Relações internacionais entre Israel e Assíria; preconceito nacionalista.',
    contextoReligioso: 'Deus tem compaixão até dos inimigos; o arrependimento é possível para todos.',
    fatosChave: [
      'Jonas fugindo de Deus e engolido pelo grande peixe (Jn 1-2)',
      'Jonas em Nínive: arrependimento da cidade (Jn 3)',
      'Jonas irado com a misericórdia de Deus (Jn 4)',
      'Nínive: "Grande cidade de três dias de caminhada"',
      'Jonas como tipo de Jesus: três dias no ventre',
    ],
  },
  mq: {
    livro: 'Miquéias',
    periodo: 'Reino Dividido',
    autor: 'Miquéias',
    data: '~735-700 a.C.',
    local: 'Moreshete (Judá)',
    publico: 'Judá e Israel',
    proposito: 'Condenar a injustiça e profetizar a destruição e restauração.',
    contextoPolitico: 'Invasões assírias; ameaça aos dois reinos de Israel.',
    contextoCultural: 'Injustiça dos líderes; corrupção dos juízes e profetas.',
    contextoReligioso: 'Juízo contra a idolatria e a corrupção; messias de Belém.',
    fatosChave: [
      'Condenação contra os opressores (Mq 2-3)',
      'Profecia do messias de Belém (Mq 5:2)',
      '"O que o Senhor pede: pratique a justícia, ame a misericórdia" (Mq 6:8)',
      'Promessa de restauração (Mq 7)',
      'Destruição predita de Samaria e Jerusalém',
    ],
  },
  na: {
    livro: 'Naum',
    periodo: 'Reino do Norte',
    autor: 'Naum',
    data: '~660-630 a.C.',
    local: 'Elcos (Judá)',
    publico: 'Judá',
    proposito: 'Profetizar a destruição de Nínive, capital da Assíria.',
    contextoPolitico: 'Assíria como potência opressora; Judá sofrendo com suas invasões.',
    contextoCultural: 'Nínive famosa por sua crueldade e violência.',
    contextoReligioso: 'Deus é justo e vinga a opressão; Nínive pagará por seus crimes.',
    fatosChave: [
      'Deus como Deus zeloso e vingador (Na 1:2)',
      'Descrição da queda de Nínive (Na 2-3)',
      'Nínive comparada a uma prostituta cruel',
      'Cumprimento histórico: Nínive caiu em 612 a.C.',
      'Contraste com Jonas: Nínive se arrependeu antes, agora será destruída',
    ],
  },
  hc: {
    livro: 'Habacuque',
    periodo: 'Reino de Judá',
    autor: 'Habacuque',
    data: '~620-600 a.C.',
    local: 'Judá',
    publico: 'Povo de Judá',
    proposito: 'Questionar a justiça de Deus e affirmar a fé apesar do sofrimento.',
    contextoPolitico: 'Judá ameaçado pela Babilônia; crise política e moral.',
    contextoCultural: 'Profeta questiona Deus sobre a prosperidade dos ímpios.',
    contextoReligioso: 'O justo viverá pela fé; teodiceia e soberania de Deus.',
    fatosChave: [
      'Habacuque reclama: "Até quando, Senhor?" (Hc 1:2)',
      'Deus responde que usará a Babilônia como instrumento de juízo',
      'Visão do "filme apocalíptico": espera pela resposta de Deus (Hc 2)',
      'O justo viverá pela fé (Hc 2:4)',
      'Cântico de fé: "Ainda que a figueira não floresça" (Hc 3:17)',
    ],
  },
  sf: {
    livro: 'Sofonias',
    periodo: 'Reino de Judá',
    autor: 'Sofonias',
    data: '~640-609 a.C.',
    local: 'Judá',
    publico: 'Povo de Judá',
    proposito: 'Profetizar o dia do Senhor contra Judá e as nações, com promessa de restauração.',
    contextoPolitico: 'Reinado deJosias; reforma religiosa em meio à idolatria.',
    contextoCultural: 'Idolatria generalizada; sincretismo religioso.',
    contextoReligioso: 'Dia do Senhor como tempo de juízo; restauração dos humildes.',
    fatosChave: [
      'Juízo universal: "O dia do Senhor está próximo" (Sf 1:14)',
      'Condenação contra Jerusalém idólatra (Sf 1)',
      'Contra Filístia, Moabe, Amom, Assíria (Sf 2)',
      'Promessa: "Procure ao Senhor, todos os humildes" (Sf 2:3)',
      'Restauração de Israel: "Rejoicai-vos, filha de Sião" (Sf 3:14)',
    ],
  },
  ag: {
    livro: 'Ageu',
    periodo: 'Pós-Exílico',
    autor: 'Ageu',
    data: '~520 a.C.',
    local: 'Judá (Jerusalém)',
    publico: 'Comunidade judaica pós-exílica',
    proposito: 'Encorajar a reconstrução do Templo.',
    contextoPolitico: 'Judá sob domínio persa; comunidade desanimada com a reconstrução.',
    contextoCultural: 'Prioridades pessoais acima da obra de Deus; autosatisfação.',
    contextoReligioso: 'A presença de Deus habita no Templo; a glória do novo Templo.',
    fatosChave: [
      'Ageu exorta: "Considerai os vossos caminhos" (Ag 1)',
      'Pergunta: "Quem dentre vós resta que viu esta casa?" (Ag 2)',
      'Promessa: "A glória desta casa última será maior" (Ag 2:9)',
      'Construção do Templo retomada em 520 a.C.',
      'Entronização de Zorobabel como governador',
    ],
  },
  zc: {
    livro: 'Zacarias',
    periodo: 'Pós-Exílico',
    autor: 'Zacarias',
    data: '~520-518 a.C.',
    local: 'Judá (Jerusalém)',
    publico: 'Comunidade judaica pós-exílica',
    proposito: 'Profetizar a restauração de Jerusalém e a vinda do Messias.',
    contextoPolitico: 'Judá sob domínio persa; reconstrução do Templo em andamento.',
    contextoCultural: 'Visões simbólicas e apocalípticas; imagens messiânicas.',
    contextoReligioso: 'Esperança messiânica; o rei humilde montado em jumento.',
    fatosChave: [
      'Oito visões noturnas de Zacarias (Zc 1-6)',
      'Promessa: "Virei para Jerusalém com misericórdias" (Zc 1:16)',
      'Príncipe da paz montado em jumento (Zc 9:9)',
      'Ferida do pastor: "ferirei o pastor" (Zc 13:7)',
      'O Senhor virá e seus pés tocarão o Monte das Oliveiras (Zc 14:4)',
    ],
  },
  ml: {
    livro: 'Malaquias',
    periodo: 'Pós-Exílico',
    autor: 'Malaquias',
    data: '~450-430 a.C.',
    local: 'Judá (Jerusalém)',
    publico: 'Comunidade judaica pós-exílica',
    proposito: 'Denunciar a decadência religiosa e profetizar o advento do Messias.',
    contextoPolitico: 'Judá sob domínio persa; desencanto com a restauração.',
    contextoCultural: 'Corrupção sacerdotal; divórcios injustificados; egoísmo.',
    contextoReligioso: 'Oferendas impuras; abandono do dízimo; incredulidade.',
    fatosChave: [
      'Acusação: "Onde está o meu Deus?" (Ml 1:2)',
      'Condenação dos sacerdotes (Ml 1-2)',
      'Oferendas manchadas e dízimo roubado (Ml 3:8)',
      'Promessa: "Eis que envio o meu mensageiro" (Ml 3:1)',
      'Profecia de Elias antes do grande dia (Ml 4:5)',
    ],
  },

  // ===== EVANGELHOS =====
  mt: {
    livro: 'Mateus',
    periodo: 'Igreja Primitiva',
    autor: 'Mateus (tradicional)',
    data: '~50-60 d.C.',
    local: 'Antioquia da Síria (possivelmente)',
    publico: 'Judeus cristãos',
    proposito: 'Mostrar Jesus como o Messias prometido no Antigo Testamento.',
    contextoPolitico: 'Império Romano; tensão entre cristãos judeus e sinagoga.',
    contextoCultural: 'Judeus vivendo sob domínio romano; messianismo popular.',
    contextoReligioso: 'Cumprimento das profecias do Antigo Testamento em Jesus.',
    fatosChave: [
      'Genealogia deJesus ligada a Abraão e Davi (Mt 1)',
      'Sermão da Montanha: ética do Reino (Mt 5-7)',
      'Sete parábolas do Reino (Mt 13)',
      'A grande comissão: ide e fazei discípulos (Mt 28:18-20)',
      'Títulos messiânicos: Filho de Davi, Filho de Deus',
    ],
  },
  mc: {
    livro: 'Marcos',
    periodo: 'Igreja Primitiva',
    autor: 'Marcos (tradicional)',
    data: '~55-65 d.C.',
    local: 'Roma (possivelmente)',
    publico: 'Cristãos gentios (especialmente em Roma)',
    proposito: 'Nrar as ações de Jesus como servo sofredor.',
    contextoPolitico: 'Império Romano; perseguição aos cristãos.',
    contextoCultural: 'Cristãos gentios unfamiliarizados com tradições judaicas.',
    contextoReligioso: 'Ênfase no sofrimento e十字架 de Jesus; discipulado.',
    fatosChave: [
      'Marcos é o evangelho mais curto e dinâmico',
      'Ação imediata: "Logo, Logo" (palavra-chave do evangelho)',
      'Batismo e tentação de Jesus (Mc 1)',
      'Parábolas e ensinamentos sobre o Reino',
      'Paixão e十字架 de Jesus detalhados (Mc 14-15)',
    ],
  },
  lc: {
    livro: 'Lucas',
    periodo: 'Igreja Primitiva',
    autor: 'Lucas',
    data: '~60-70 d.C.',
    local: 'Antioquia ou Roma',
    publico: 'Teófilo e gentios cultos',
    proposito: 'Nrar a vida de Jesus com precisão histórica para gentios.',
    contextoPolitico: 'Império Romano; census romano mencionado.',
    contextoCultural: 'Abordagem historiográfica; ênfase nos pobres, mulheres e samaritanos.',
    contextoReligioso: 'Salvação universal; Jesus como Salvador de todos os homens.',
    fatosChave: [
      'Nascimento narrado com detalhes históricos (Lc 1-2)',
      'Genealogia até Adão (Lc 3)',
      'Parábola do Filho Pródigo (Lc 15)',
      'A Ascensão (Lc 24)',
      'Enfoque nos marginalizados: Zaqueu, samaritano, publicanos',
    ],
  },
  jo: {
    livro: 'João',
    periodo: 'Igreja Primitiva',
    autor: 'João (tradicional)',
    data: '~80-95 d.C.',
    local: 'Éfeso (possivelmente)',
    publico: 'Cristãos e buscadores',
    proposito: 'Revelar Jesus como o Verbo divino e Filho de Deus.',
    contextoPolitico: 'Império Romano; separação crescente entre cristianismo e sinagoga.',
    contextoCultural: 'Influência da filosofia grega (logos); debate teológico.',
    contextoReligioso: 'Jesus como a encarnação do Verbo; sete sinais e sete "Eu Sou".',
    fatosChave: [
      'Prólogo: "No princípio era o Verbo" (Jo 1:1-18)',
      'Sete sinais/milagres de Jesus (Jo 2-11)',
      'Sete discursos: "Eu Sou o pão da vida" etc.',
      'O lava-pés: modelo de serviço (Jo 13)',
      'A ressurreição de Lázaro (Jo 11)',
    ],
  },

  // ===== HISTORIA =====
  at: {
    livro: 'Atos',
    periodo: 'Igreja Primitiva',
    autor: 'Lucas',
    data: '~60-80 d.C.',
    local: 'Antioquia / Roma',
    publico: 'Teófilo e a igreja primitiva',
    proposito: 'Nrar a história da igreja primitiva desde Pentecostes até a prisão de Paulo em Roma.',
    contextoPolitico: 'Império Romano; expansão cristã por todo o Mediterrâneo.',
    contextoCultural: 'Mundo greco-romano; diversidade cultural e religiosa.',
    contextoReligioso: 'Derramamento do Espírito Santo; expansão do evangelho aos gentios.',
    fatosChave: [
      'Pentecostes: descida do Espírito Santo (At 2)',
      'Diáconos escolhidos (At 6)',
      'Conversão de Saulo/Paulo (At 9)',
      'Conselho de Jerusalém sobre gentios (At 15)',
      'Viagens missionárias de Paulo (At 13-28)',
    ],
  },

  // ===== PAULINAS =====
  rm: {
    livro: 'Romanos',
    periodo: 'Igreja Primitiva',
    autor: 'Paulo',
    data: '~57 d.C.',
    local: 'Corinto',
    publico: 'Igreja em Roma',
    proposito: 'Expor a doutrina da justificação pela fé e a vida no Espírito.',
    contextoPolitico: 'Império Romano; comunidade cristã em Roma.',
    contextoCultural: 'Diversidade cultural na igreja de Roma (judeus e gentios).',
    contextoReligioso: 'Centralidade da justificação pela fé; graça de Deus.',
    fatosChave: [
      'Todos são pecadores: "Não há justo, nem um sequer" (Rm 3:10)',
      'Justificação pela fé: "Não há distinção" (Rm 3:22-23)',
      'Vida no Espírito: "Não vos conformeis com este mundo" (Rm 12)',
      'O amor: "Não vos devolvaes o mal pelo mal" (Rm 12:17-21)',
      'Plano de viagem a Roma (Rm 15)',
    ],
  },
  '1co': {
    livro: '1 Coríntios',
    periodo: 'Igreja Primitiva',
    autor: 'Paulo',
    data: '~53-55 d.C.',
    local: 'Éfeso',
    publico: 'Igreja em Corinto',
    proposito: 'Corrigir problemas na igreja: divisões, imoralidade e abusos.',
    contextoPolitico: 'Corinto como cidade portuária cosmopolita; colônia romana.',
    contextoCultural: 'Pluralismo moral e religioso; influência da filosofia grega.',
    contextoReligioso: 'Dons espirituais: amor como guia; ressurreição corporal.',
    fatosChave: [
      'Unidade na igreja: "Cristo está dividido?" (1Co 1-4)',
      'Imoralidade sexual e disciplina (1Co 5)',
      'Questões éticas e casamento (1Co 6-7)',
      'Uso dos dons espirituais (1Co 12-14)',
      'Hino ao amor: "Ainda que eu falasse..." (1Co 13)',
      'Ressurreição: "Se Cristo não ressuscitou" (1Co 15)',
    ],
  },
  '2co': {
    livro: '2 Coríntios',
    periodo: 'Igreja Primitiva',
    autor: 'Paulo',
    data: '~55-56 d.C.',
    local: 'Macedônia',
    publico: 'Igreja em Corinto',
    proposito: 'Defender seu ministério e expressar amor pela igreja.',
    contextoPolitico: 'Paulo em viagem pela Macedônia; tensão com Corinto.',
    contextoCultural: 'Corinto como centro cultural e comercial; retórica grega.',
    contextoReligioso: 'Paulo como servo de Cristo; fraco mas poderoso em Deus.',
    fatosChave: [
      'Paulo como ministro da nova aliança (2Co 3)',
      'Tesouro em vasos de barro (2Co 4:7)',
      'Reconciliação: "Deus estava em Cristo" (2Co 5:19)',
      'Graça de Deus: "Minha graça é suficiente" (2Co 12:9)',
      'Exortação à generosidade (2Co 8-9)',
    ],
  },
  gl: {
    livro: 'Gálatas',
    periodo: 'Igreja Primitiva',
    autor: 'Paulo',
    data: '~49-55 d.C.',
    local: 'Antioquia da Síria (possivelmente)',
    publico: 'Igrejas na Galácia',
    proposito: 'Defender a justificação pela fé contra os judaizantes.',
    contextoPolitico: 'Província romana da Galácia; tensão entre judeus e gentios.',
    contextoCultural: 'Pressão para que gentios se circumcidem para serem salvos.',
    contextoReligioso: 'Libertação da Lei como meio de salvação; liberdade em Cristo.',
    fatosChave: [
      'Paulo amaldiçoa quem pregar outro evangelho (Gl 1)',
      'Justificação pela fé, não pelas obras da Lei (Gl 2:16)',
      'Liberdade em Cristo: "Para a liberdade Cristo nos libertou" (Gl 5:1)',
      'Fruto do Espírito (Gl 5:22-23)',
      'Circuncisão não é necessária para salvação',
    ],
  },
  ef: {
    livro: 'Efésios',
    periodo: 'Igreja Primitiva',
    autor: 'Paulo',
    data: '~60-62 d.C.',
    local: 'Roma (prisão)',
    publico: 'Igreja em Éfeso',
    proposito: 'Explicar o mistério de Cristo e a igreja como corpo dEle.',
    contextoPolitico: 'Paulo preso em Roma; igreja em Éfeso sob influência pagã.',
    contextoCultural: 'Misticismo e filosofia grega; práticas mágicas.',
    contextoReligioso: 'Unidade da igreja; graça e amor de Deus; guerra espiritual.',
    fatosChave: [
      'Bênçãos espirituais em Cristo (Ef 1)',
      'Salvos pela graça pela fé (Ef 2:8-9)',
      'Mistério de Cristo e da igreja (Ef 3)',
      'Unidade do corpo de Cristo (Ef 4)',
      'A armadura de Deus (Ef 6:10-18)',
    ],
  },
  fp: {
    livro: 'Filipenses',
    periodo: 'Igreja Primitiva',
    autor: 'Paulo',
    data: '~60-62 d.C.',
    local: 'Roma (prisão)',
    publico: 'Igreja em Filipos',
    proposito: 'Agradecer e encorajar na alegria mesmo na perseguição.',
    contextoPolitico: 'Paulo preso; Filipos como colônia romana.',
    contextoCultural: 'Cidadania romana; lealdade e parceria no evangelho.',
    contextoReligioso: 'Alegria no Senhor; humildade como Cristo; contentamento.',
    fatosChave: [
      'Alegria no sofrimento: "Alegrai-vos sempre no Senhor" (Fp 4:4)',
      'Hino cristológico: "Em forma de Deus" (Fp 2:5-11)',
      'Contentamento em todas as circunstâncias (Fp 4:11-13)',
      'Parceria de Filipos no evangelho (Fp 1:5)',
      'Exortação à unidade e humildade (Fp 2:1-4)',
    ],
  },
  cl: {
    livro: 'Colossenses',
    periodo: 'Igreja Primitiva',
    autor: 'Paulo',
    data: '~60-62 d.C.',
    local: 'Roma (prisão)',
    publico: 'Igreja em Colossos',
    proposito: 'Alertar contra falsos ensinos e exaltar a supremacia de Cristo.',
    contextoPolitico: 'Colossos como cidade comercial na Ásia Menor.',
    contextoCultural: 'Filosofia, misticismo e culto aos anjos ameaçavam a igreja.',
    contextoReligioso: 'Cristo como supremo em todas as coisas; plenitude em Cristo.',
    fatosChave: [
      'Cristo: imagem do Deus invisível (Cl 1:15)',
      'Supremacia de Cristo sobre todas as coisas (Cl 1:15-20)',
      'Alerta contra filosofias vãs (Cl 2:8)',
      'Mortos e ressuscitados com Cristo (Cl 3:1-4)',
      'Vida doméstica e social em Cristo (Cl 3:18-4:1)',
    ],
  },
  '1ts': {
    livro: '1 Tessalonicenses',
    periodo: 'Igreja Primitiva',
    autor: 'Paulo',
    data: '~50-51 d.C.',
    local: 'Corinto',
    publico: 'Igreja em Tessalônica',
    proposito: 'Consolidar a fé da igreja e ensinar sobre a segunda vinda de Cristo.',
    contextoPolitico: 'Tessalônica como capital da província romana da Macedônia.',
    contextoCultural: 'Cristãos preocupados com os que morreram antes da volta de Cristo.',
    contextoReligioso: 'Escatologia: a volta de Cristo e a ressurreição dos mortos.',
    fatosChave: [
      'A fé da igreja é reconhecida (1Ts 1)',
      'Paulo como modelo de ministério (1Ts 2)',
      'Santificação: "Que Deus vos santifique" (1Ts 4:3)',
      'Os mortos em Cristo precederão os vivos (1Ts 4:13-18)',
      'Vigiai e orai: a volta será como ladrão (1Ts 5)',
    ],
  },
  '2ts': {
    livro: '2 Tessalonicenses',
    periodo: 'Igreja Primitiva',
    autor: 'Paulo',
    data: '~51-52 d.C.',
    local: 'Corinto',
    publico: 'Igreja em Tessalônica',
    proposito: 'Corrigir equívocos sobre a segunda vinda e encorajar firmeza.',
    contextoPolitico: 'Tessalônica sob domínio romano; incerteza sobre o retorno de Cristo.',
    contextoCultural: 'Cartas falsas atribuídas a Paulo causavam confusão.',
    contextoReligioso: 'Aparição do homem de iniquidade; juízo final sobre os iníquos.',
    fatosChave: [
      'Juízo vindouro sobre os perseguidores (2Ts 1)',
      'O homem de iniquidade será revelado (2Ts 2)',
      'Não vos assusteis de que o dia do Senhor já chegou (2Ts 2:2)',
      'Exortação ao trabalho: "Quem não quer trabalhar, não coma" (2Ts 3:10)',
      'Fortalecei-vos no que é bom (2Ts 2:17)',
    ],
  },
  '1tm': {
    livro: '1 Timóteo',
    periodo: 'Igreja Primitiva',
    autor: 'Paulo',
    data: '~62-65 d.C.',
    local: 'Macedônia (possivelmente)',
    publico: 'Timóteo, jovem líder em Éfeso',
    proposito: 'Instruir Timóteo sobre governo da igreja e sound doctrine.',
    contextoPolitico: 'Éfeso sob domínio romano; falsos mestres atuando.',
    contextoCultural: 'Falso ensino sobre genealogias e mitos.',
    contextoReligioso: 'Sound doctrine: piedade e boa consciência.',
    fatosChave: [
      'Paulo como modelo de misericórdia (1Tm 1:12-17)',
      'Instruções sobre oração pública (1Tm 2)',
      'Requisitos para bispos e diáconos (1Tm 3)',
      'Advertência contra falsos mestres (1Tm 4)',
      'Responsabilidades sociais: viúvas, ancianos, escravos (1Tm 5-6)',
    ],
  },
  '2tm': {
    livro: '2 Timóteo',
    periodo: 'Igreja Primitiva',
    autor: 'Paulo',
    data: '~64-67 d.C.',
    local: 'Roma (prisão)',
    publico: 'Timóteo',
    proposito: 'Carta testamentária encorajando Timóteo a perseverar no ministério.',
    contextoPolitico: 'Paulo preso pela segunda vez; perseguição de Nero.',
    contextoCultural: 'Cristãos sofrendo perseguição em Roma.',
    contextoReligioso: 'Coroa da justiça; fé guardada;功绩 do ministério.',
    fatosChave: [
      '"Combati o bom combate" (2Tm 4:7)',
      'Timóteo: guardai o depósito da fé (2Tm 1:14)',
      'Paulo como modelo de perseverança',
      'Advertência contra falsos mestres (2Tm 3)',
      'A Palavra de Deus é inspirada e útil (2Tm 3:16)',
    ],
  },
  tt: {
    livro: 'Tito',
    periodo: 'Igreja Primitiva',
    autor: 'Paulo',
    data: '~62-65 d.C.',
    local: 'Nicópolis (possivelmente)',
    publico: 'Tito, líder na ilha de Creta',
    proposito: 'Organizar a igreja em Creta e combater falsos mestres.',
    contextoPolitico: 'Creta como província romana; sociedade com má reputação.',
    contextoCultural: 'Cretenses mentirosos e preguiçosos (cf. Tt 1:12).',
    contextoReligioso: 'Sound doctrine produz boas obras; graça instrutiva.',
    fatosChave: [
      'Qualificações para ancianos (Tt 1)',
      'Ensinar o que é conforme à sã doutrina (Tt 2)',
      'Graça de Deus nos salva (Tt 3:4-7)',
      'Evitar divisões e contestações (Tt 3:9)',
      'Creta como campo de missão',
    ],
  },
  fm: {
    livro: 'Filemom',
    periodo: 'Igreja Primitiva',
    autor: 'Paulo',
    data: '~60-62 d.C.',
    local: 'Roma (prisão)',
    publico: 'Filemom, senhor de Onesimo',
    proposito: 'Interceder por Onesimo, escravo fugitivo, que se converteu.',
    contextoPolitico: 'Escravidão romana; Paulo como prisioneiro.',
    contextoCultural: 'Relações senhor-escravo; hospitalidade cristã.',
    contextoReligioso: 'Perdão e reconciliação em Cristo; amor fraternal.',
    fatosChave: [
      'Onesimo, escravo fugitivo, converte-se com Paulo',
      'Paulo intercede: "não mais como escravo, mas como irmão"',
      'Carta pessoal e calorosa',
      'Filemom é instado a receber Onesimo de volta',
      'Carta mais curta do Novo Testamento',
    ],
  },

  // ===== EPÍSTOLAS GERAIS =====
  hb: {
    livro: 'Hebreus',
    periodo: 'Igreja Primitiva',
    autor: 'Paulo / Apolo / outro (incerto)',
    data: '~60-70 d.C.',
    local: 'Desconhecido (possivelmente Roma)',
    publico: 'Cristãos judeus tentados a voltar ao judaísmo',
    proposito: 'Demonstrar a superioridade de Cristo sobre o sistema levítico.',
    contextoPolitico: 'Período anterior à destruição do Templo (70 d.C.); cristãos judeus sob pressão.',
    contextoCultural: 'Templo ainda funcionando; sacrifícios ainda oferecidos.',
    contextoReligioso: 'Cristo como sumo sacerdote segundo a ordem de Melquisedeque.',
    fatosChave: [
      'Cristo superior aos anjos (Hb 1)',
      'Cristo superior a Moisés e Josué (Hb 3-4)',
      'Sumo sacerdote segundo a ordem de Melquisedeque (Hb 7)',
      'Novo testamento/mutuamente superior ao antigo (Hb 8)',
      'Fe (Hb 11): "sem fé é impossível agradar a Deus"',
    ],
  },
  tg: {
    livro: 'Tiago',
    periodo: 'Igreja Primitiva',
    autor: 'Tiago, irmão de Jesus (tradicional)',
    data: '~45-62 d.C.',
    local: 'Jerusalém',
    publico: 'Cristãos judeus dispersos',
    proposito: 'Exortar a fé prática e a justiça social.',
    contextoPolitico: 'Cristãos judeus perseguidos; pobreza e desigualdade.',
    contextoCultural: 'Tradição sapiencial judaica; ética prática.',
    contextoReligioso: 'Fé sem obras é morta; língua controlada; humildade.',
    fatosChave: [
      'Provações e sabedoria (Tg 1)',
      'Fé sem obras é morta (Tg 2:14-26)',
      'Controle da língua (Tg 3)',
      'Amizade com o mundo é inimizade com Deus (Tg 4)',
      'Condenação dos ricos opressores (Tg 5)',
    ],
  },
  '1pe': {
    livro: '1 Pedro',
    periodo: 'Igreja Primitiva',
    autor: 'Pedro',
    data: '~62-64 d.C.',
    local: 'Babilônia (possivelmente Roma)',
    publico: 'Cristãos dispersos naÁsia Menor',
    proposito: 'Encorajar cristãos que sofrem perseguição.',
    contextoPolitico: 'Perseguição sob Nero; cristãos como minoria marginalizada.',
    contextoCultural: 'Sociedade greco-romana hostil aos cristãos.',
    contextoReligioso: 'Sofrimento como participação nas paixões de Cristo; esperança viva.',
    fatosChave: [
      'Esperança viva na ressurreição de Jesus (1Pe 1)',
      'Pedra viva, povo sacerdotal (1Pe 2)',
      'Submissão às autoridades (1Pe 2:13)',
      'Sofrer por justiça é louvável (1Pe 3)',
      'Vós sois a raça eleita, sacerdócio santo (1Pe 2:9)',
    ],
  },
  '2pe': {
    livro: '2 Pedro',
    periodo: 'Igreja Primitiva',
    autor: 'Pedro',
    data: '~64-68 d.C.',
    local: 'Roma (possivelmente)',
    publico: 'Cristãos ameaçados por falsos mestres',
    proposito: 'Alertar contra falsos mestres e adiar a volta de Cristo.',
    contextoPolitico: 'Crescimento de heresias e falsos ensinos.',
    contextoCultural: 'Ceticismo sobre a segunda vinda de Cristo.',
    contextoReligioso: 'O dia do Senhor virá como ladrão; julgamento vindouro.',
    fatosChave: [
      'Progresso na fé: virtude, conhecimento, autocontrole (2Pe 1:5-7)',
      'Falsos mestres e julgamento vindouro (2Pe 2)',
      'A volta de Cristo demora mas é certa (2Pe 3)',
      'Novos céus e nova terra (2Pe 3:13)',
      'Esforçai-vos para que sejais achados sem mancha',
    ],
  },
  '1jo': {
    livro: '1 João',
    periodo: 'Igreja Primitiva',
    autor: 'João',
    data: '~85-95 d.C.',
    local: 'Éfeso (possivelmente)',
    publico: 'Cristãos ameaçados por docetismo',
    proposito: 'Confirmar a fé na divindade de Jesus e no amor de Deus.',
    contextoPolitico: 'Cristianismo se espalhando; heresias negando a encarnação.',
    contextoCultural: 'Docetismo: Jesus não teria tido corpo real.',
    contextoReligioso: 'Deus é amor; amor fraternal como evidência de salvação.',
    fatosChave: [
      'Deus é luz e Deus é amor (1Jo 1:5, 4:8)',
      'Andar na luz (1Jo 1:7)',
      'Nossos pecados são perdoados por Cristo (1Jo 2:1-2)',
      'Amando-vos uns aos outros (1Jo 4:7-12)',
      'Confessando Jesus como Filho de Deus (1Jo 4:15)',
    ],
  },
  '2jo': {
    livro: '2 João',
    periodo: 'Igreja Primitiva',
    autor: 'João',
    data: '~85-95 d.C.',
    local: 'Éfeso (possivelmente)',
    publico: 'Uma igreja eleta e seus filhos',
    proposito: 'Advertir contra falsos mestres e exortar ao amor e à verdade.',
    contextoPolitico: 'Heréticos viajando e ensinando falsidades.',
    contextoCultural: 'Hospitalidade era sagrada; perigo de acolher falsos mestres.',
    contextoReligioso: 'Verdade e amor caminham juntos; não dar acolhida ao erro.',
    fatosChave: [
      'Carta mais curta do Novo Testamento',
      'Exortação à verdade e ao amor',
      'Advertência: "Não recebais em casa quem traz outro evangelho"',
      'A graça, a misericórdia e a paz',
      'João espera visitar pessoalmente',
    ],
  },
  '3jo': {
    livro: '3 João',
    periodo: 'Igreja Primitiva',
    autor: 'João',
    data: '~85-95 d.C.',
    local: 'Éfeso (possivelmente)',
    publico: 'Gaio, líder da igreja',
    proposito: 'Agradecer pela hospitalidade de Gaio e corrigir Diótrefes.',
    contextoPolitico: 'Liderança disputada em igrejas locais.',
    contextoCultural: 'Hospitalidade como virtude essencial no mundo antigo.',
    contextoReligioso: 'Hospitalidade aos missionários itinerantes; verdade versus poder.',
    fatosChave: [
      'Gaio elogiado por sua hospitalidade',
      'Diótrefes reprovado por orgulho e exclusão',
      'Demétrio mencionado como exemplo de bondade',
      'Carta pessoal e calorosa',
      'Ênfase na hospitalidade cristã',
    ],
  },
  jd: {
    livro: 'Judas',
    periodo: 'Igreja Primitiva',
    autor: 'Judas, irmão de Tiago (tradicional)',
    data: '~65-80 d.C.',
    local: 'Desconhecido',
    publico: 'Cristãos ameaçados por antinomianos',
    proposito: 'Alertar contra falsos mestres que distorcem a graça.',
    contextoPolitico: 'Crescimento de heresias antinômicas.',
    contextoCultural: 'Ensinos que usavam a graça como desculpa para imoralidade.',
    contextoReligioso: 'Fé uma vez entregue aos santos; julgamento dos anjos caídos.',
    fatosChave: [
      'Contenda pela fé uma vez entregue (Jd 3)',
      'Anjos que abandonaram seu lugar (Jd 6)',
      'Balaão como exemplo de avareza (Jd 11)',
      'Nuvens sem água (Jd 12)',
      'Exortação: "Tende compaixão" (Jd 22-23)',
    ],
  },

  // ===== APOCALITICO =====
  ap: {
    livro: 'Apocalipse',
    periodo: 'Igreja Primitiva',
    autor: 'João',
    data: '~90-95 d.C.',
    local: 'Patmos',
    publico: 'Sete igrejas naÁsia Menor',
    proposito: 'Revelar o plano divino da história e a vitória final de Cristo.',
    contextoPolitico: 'Império Romano sob Domiciano; perseguição aos cristãos.',
    contextoCultural: 'Simbolismo apocalíptico judaico; imagens do Antigo Testamento.',
    contextoReligioso: 'O Cordeiro que foi morto é digno de receber poder; vitória sobre o mal.',
    fatosChave: [
      'Sete cartas às sete igrejas (Ap 2-3)',
      'Visão de Deus no trono (Ap 4-5)',
      'Sete selos, trombetas e taças de ira (Ap 6-16)',
      'Queda da Babilônia (Ap 17-18)',
      'Novos céus e nova terra (Ap 21-22)',
    ],
  },
};

type TabId = 'texto' | 'contexto' | 'palavras' | 'teologia';

const TRAD_IDS = ['arc', 'kjv', 'web'] as const;

const tradCores: Record<string, string> = {
  arc: 'from-blue-500 to-blue-600',
  kjv: 'from-amber-500 to-amber-600',
  web: 'from-emerald-500 to-emerald-600',
};

const tradBg: Record<string, string> = {
  arc: 'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800',
  kjv: 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800',
  web: 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800',
};

export function ExegeseClient() {
  const [livroAbrev, setLivroAbrev] = useState('');
  const [capituloNum, setCapituloNum] = useState<number | null>(null);
  const [data, setData] = useState<Record<string, LivroData>>({});
  const [carregando, setCarregando] = useState(true);
  const [tab, setTab] = useState<TabId>('texto');

  useEffect(() => {
    Promise.all(TRAD_IDS.map((t) => carregarTraducao(t))).then(
      (todos) => {
        const map: Record<string, LivroData> = {};
        TRAD_IDS.forEach((t, i) => { map[t] = todos[i]; });
        setData(map);
        setCarregando(false);
      }
    );
  }, []);

  const livro = useMemo(
    () => TODOS_LIVROS.find((l) => l.abreviacao === livroAbrev),
    [livroAbrev]
  );

  const totalCaps = livro?.totalCapitulos ?? 0;

  const textoMulti = useMemo(() => {
    if (!livroAbrev || capituloNum === null || Object.keys(data).length === 0) return [];
    return TRAD_IDS.map((t) => {
      const versiculos = data[t]?.[livroAbrev]?.[capituloNum];
      return { traducao: t, versiculos: versiculos ?? [] };
    });
  }, [livroAbrev, capituloNum, data]);

  const generoInfo = livroAbrev ? generos[livroAbrev] : null;
  const histInfo = livroAbrev ? contextoHistorico[livroAbrev] : null;

  const palavrasRelacionadas = useMemo(() => {
    if (!livroAbrev) return [];
    const livroObj = TODOS_LIVROS.find((l) => l.abreviacao === livroAbrev);
    if (!livroObj) return [];
    const isNT = livroObj.testamento === 'NT';
    return palavrasOriginais
      .filter((p) => p.idioma === (isNT ? 'grego' : 'hebraico'))
      .slice(0, 10);
  }, [livroAbrev]);

  const doutrinasRelacionadas = useMemo(() => {
    if (!livroAbrev) return [];
    const refs = doutrinas.filter((d) =>
      d.passagens.some((p) => p.toLowerCase().startsWith(livroAbrev))
    );
    return refs.length > 0 ? refs : doutrinas.slice(0, 4);
  }, [livroAbrev]);

  const handleLimpar = useCallback(() => {
    setLivroAbrev('');
    setCapituloNum(null);
    setTab('texto');
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <ScrollReveal>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <Sparkles className="w-4 h-4" />
                Análise Profunda das Escrituras
              </div>
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-light mb-4">
                Exegese <span className="text-primary italic">Bíblica</span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Ferramenta interativa de análise contextual, gramatical e teológica — 
                estude as Escrituras com profundidade acadêmica
              </p>
            </div>
          </ScrollReveal>

          {carregando ? (
            <div className="glass-card p-16 text-center rounded-2xl">
              <div className="inline-flex gap-2">
                <span className="w-3 h-3 bg-primary rounded-full animate-bounce [animation-delay:0s]" />
                <span className="w-3 h-3 bg-primary rounded-full animate-bounce [animation-delay:0.15s]" />
                <span className="w-3 h-3 bg-primary rounded-full animate-bounce [animation-delay:0.3s]" />
              </div>
              <p className="text-sm text-muted-foreground mt-4">Carregando textos bíblicos...</p>
            </div>
          ) : (
            <>
              {/* Selector */}
              <ScrollReveal>
                <div className="glass-card p-6 rounded-2xl mb-8">
                  <div className="flex flex-wrap items-end gap-4">
                    <div className="flex-1 min-w-[200px]">
                      <label className="block text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">Livro</label>
                      <select
                        value={livroAbrev}
                        onChange={(e) => { setLivroAbrev(e.target.value); setCapituloNum(null); }}
                        className="w-full px-4 py-3 bg-background/50 border border-border/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                      >
                        <option value="">Selecionar livro...</option>
                        {TODOS_LIVROS.map((l) => (
                          <option key={l.abreviacao} value={l.abreviacao}>{l.nome}</option>
                        ))}
                      </select>
                    </div>

                    <div className="w-40">
                      <label className="block text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">Capítulo</label>
                      <select
                        value={capituloNum ?? ''}
                        onChange={(e) => setCapituloNum(e.target.value ? Number(e.target.value) : null)}
                        disabled={!livro}
                        className="w-full px-4 py-3 bg-background/50 border border-border/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all disabled:opacity-40"
                      >
                        <option value="">Selecionar...</option>
                        {Array.from({ length: totalCaps }, (_, i) => i + 1).map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>

                    {(livroAbrev || capituloNum !== null) && (
                      <button
                        onClick={handleLimpar}
                        className="px-4 py-3 text-xs border border-border/50 rounded-xl text-muted-foreground hover:bg-muted/50 transition-all"
                      >
                        Limpar
                      </button>
                    )}
                  </div>
                </div>
              </ScrollReveal>

              {!livroAbrev && (
                <ScrollReveal>
                  <div className="glass-card p-16 text-center rounded-2xl">
                    <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                      <Search className="w-10 h-10 text-primary/40" strokeWidth={1} />
                    </div>
                    <p className="font-display text-2xl text-muted-foreground mb-2">Selecione um livro e capítulo</p>
                    <p className="text-sm text-muted-foreground/70 max-w-md mx-auto">
                      Escolha uma passagem bíblica acima para iniciar a análise exegética completa
                    </p>
                  </div>
                </ScrollReveal>
              )}

              {livroAbrev && capituloNum !== null && (
                <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-6">
                  <div>
                    {/* Tabs */}
                    <ScrollReveal>
                      <div className="glass-card p-1.5 mb-6 rounded-2xl">
                        <div className="flex">
                          {([
                            { id: 'texto' as TabId, label: 'Texto', icon: BookOpen },
                            { id: 'contexto' as TabId, label: 'Contexto', icon: Globe },
                            { id: 'palavras' as TabId, label: 'Palavras', icon: Languages },
                            { id: 'teologia' as TabId, label: 'Teologia', icon: Crosshair },
                          ]).map(({ id, label, icon: Icon }) => (
                            <button
                              key={id}
                              onClick={() => setTab(id)}
                              className={`flex-1 flex items-center justify-center gap-2 text-sm py-3 rounded-xl transition-all ${
                                tab === id
                                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                              }`}
                            >
                              <Icon className="w-4 h-4" strokeWidth={1.5} />
                              {label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </ScrollReveal>

                    {/* Tab Content */}
                    {tab === 'texto' && (
                      <div className="space-y-4">
                        {textoMulti.map(({ traducao, versiculos }, idx) => (
                          <ScrollReveal key={traducao} delay={idx * 100}>
                            <div className={`glass-card rounded-2xl overflow-hidden border ${tradBg[traducao]}`}>
                              <div className={`px-6 py-4 bg-gradient-to-r ${tradCores[traducao]}`}>
                                <div className="flex items-center gap-3">
                                  <span className="text-white font-bold text-sm">{traducao.toUpperCase()}</span>
                                  <span className="text-white/80 text-sm">
                                    {livro?.nome} {capituloNum}
                                  </span>
                                </div>
                              </div>
                              <div className="p-6">
                                <div className="space-y-3">
                                  {versiculos.map((texto, i) => (
                                    <p key={i} className="font-serif-body text-base leading-relaxed">
                                      <sup className="text-primary font-bold text-xs mr-1">{i + 1}</sup>
                                      {texto}
                                    </p>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </ScrollReveal>
                        ))}
                      </div>
                    )}

                    {tab === 'contexto' && (
                      <div className="space-y-4">
                        {generoInfo && (
                          <ScrollReveal>
                            <div className="glass-card p-6 rounded-2xl">
                              <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-2xl">
                                  {generoInfo.icone}
                                </div>
                                <div>
                                  <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">Gênero Literário</h3>
                                  <p className="text-xl font-display text-primary">{generoInfo.genero}</p>
                                </div>
                              </div>
                              <p className="text-muted-foreground">{generoInfo.desc}</p>
                            </div>
                          </ScrollReveal>
                        )}

                        {histInfo ? (
                          <ScrollReveal>
                            <div className="glass-card p-6 rounded-2xl">
                              <h3 className="font-semibold text-sm mb-4 flex items-center gap-2 text-muted-foreground uppercase tracking-wider">
                                <Globe className="w-4 h-4" strokeWidth={1.5} />
                                Contexto Histórico
                              </h3>
                              <div className="grid grid-cols-2 gap-4 mb-4">
                                <div className="p-3 bg-muted/30 rounded-xl">
                                  <span className="text-xs text-muted-foreground block mb-1">Período</span>
                                  <p className="text-sm font-semibold">{histInfo.periodo}</p>
                                </div>
                                <div className="p-3 bg-muted/30 rounded-xl">
                                  <span className="text-xs text-muted-foreground block mb-1">Autor</span>
                                  <p className="text-sm font-semibold">{histInfo.autor}</p>
                                </div>
                                <div className="p-3 bg-muted/30 rounded-xl">
                                  <span className="text-xs text-muted-foreground block mb-1">Data</span>
                                  <p className="text-sm font-semibold">{histInfo.data}</p>
                                </div>
                                <div className="p-3 bg-muted/30 rounded-xl">
                                  <span className="text-xs text-muted-foreground block mb-1">Local</span>
                                  <p className="text-sm font-semibold">{histInfo.local}</p>
                                </div>
                                <div className="p-3 bg-muted/30 rounded-xl">
                                  <span className="text-xs text-muted-foreground block mb-1">Público</span>
                                  <p className="text-sm font-semibold">{histInfo.publico}</p>
                                </div>
                              </div>
                              <div className="p-4 bg-primary/5 rounded-xl border border-primary/10 mb-4">
                                <span className="text-xs text-muted-foreground block mb-1">Propósito</span>
                                <p className="text-sm">{histInfo.proposito}</p>
                              </div>
                              <div className="space-y-3 mb-4">
                                <div className="p-3 bg-muted/30 rounded-xl">
                                  <span className="text-xs text-muted-foreground block mb-1">Contexto Político</span>
                                  <p className="text-sm">{histInfo.contextoPolitico}</p>
                                </div>
                                <div className="p-3 bg-muted/30 rounded-xl">
                                  <span className="text-xs text-muted-foreground block mb-1">Contexto Cultural</span>
                                  <p className="text-sm">{histInfo.contextoCultural}</p>
                                </div>
                                <div className="p-3 bg-muted/30 rounded-xl">
                                  <span className="text-xs text-muted-foreground block mb-1">Contexto Religioso</span>
                                  <p className="text-sm">{histInfo.contextoReligioso}</p>
                                </div>
                              </div>
                              {histInfo.fatosChave && histInfo.fatosChave.length > 0 && (
                                <div>
                                  <h4 className="font-semibold text-xs text-muted-foreground uppercase tracking-wider mb-3">Fatos Chave</h4>
                                  <ul className="space-y-2">
                                    {histInfo.fatosChave.map((fato, i) => (
                                      <li key={i} className="flex items-start gap-2 text-sm">
                                        <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                                        <span>{fato}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          </ScrollReveal>
                        ) : (
                          <ScrollReveal>
                            <div className="glass-card p-6 rounded-2xl">
                              <h3 className="font-semibold text-sm mb-2 flex items-center gap-2 text-muted-foreground uppercase tracking-wider">
                                <Globe className="w-4 h-4" strokeWidth={1.5} />
                                Contexto Histórico
                              </h3>
                              <p className="text-muted-foreground">Informações históricas detalhadas sendo preparadas para este livro.</p>
                            </div>
                          </ScrollReveal>
                        )}

                        {textoMulti[0]?.versiculos.length > 0 && (
                          <ScrollReveal>
                            <div className="glass-card p-6 rounded-2xl">
                              <h3 className="font-semibold text-sm mb-4 flex items-center gap-2 text-muted-foreground uppercase tracking-wider">
                                <BookOpen className="w-4 h-4" strokeWidth={1.5} />
                                Análise da Passagem
                              </h3>
                              <div className="grid grid-cols-3 gap-4">
                                <div className="p-4 bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl text-center">
                                  <p className="font-display text-3xl font-light text-primary">{textoMulti[0].versiculos.length}</p>
                                  <p className="text-xs text-muted-foreground mt-1">Versículos</p>
                                </div>
                                <div className="p-4 bg-gradient-to-br from-amber-500/5 to-amber-500/10 rounded-xl text-center">
                                  <p className="font-display text-3xl font-light text-amber-600">{capituloNum}</p>
                                  <p className="text-xs text-muted-foreground mt-1">Capítulo</p>
                                </div>
                                <div className="p-4 bg-gradient-to-br from-emerald-500/5 to-emerald-500/10 rounded-xl text-center">
                                  <p className="font-display text-3xl font-light text-emerald-600">{Math.round((capituloNum / totalCaps) * 100)}%</p>
                                  <p className="text-xs text-muted-foreground mt-1">Do Livro</p>
                                </div>
                              </div>
                            </div>
                          </ScrollReveal>
                        )}
                      </div>
                    )}

                    {tab === 'palavras' && (
                      <div className="space-y-4">
                        <ScrollReveal>
                          <div className="glass-card p-6 rounded-2xl">
                            <h3 className="font-semibold text-sm mb-4 flex items-center gap-2 text-muted-foreground uppercase tracking-wider">
                              <Languages className="w-4 h-4" strokeWidth={1.5} />
                              Palavras Originais
                            </h3>
                            <p className="text-xs text-muted-foreground mb-6">
                              Palavras-chave em {livro?.testamento === 'NT' ? 'grego' : 'hebraico'} relacionadas ao livro selecionado.
                            </p>
                            <div className="space-y-4">
                              {palavrasRelacionadas.length > 0 ? (
                                palavrasRelacionadas.map((p, i) => (
                                  <div key={i} className="p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors">
                                    <div className="flex items-start justify-between mb-2">
                                      <div>
                                        <p className="font-serif text-2xl text-primary">{p.palavra}</p>
                                        <p className="text-xs text-muted-foreground italic">{p.transliteracao}</p>
                                      </div>
                                      <span className="text-[10px] uppercase font-bold text-muted-foreground bg-background px-3 py-1 rounded-full">
                                        {p.strong}
                                      </span>
                                    </div>
                                    <p className="text-sm mt-2">{p.definicao}</p>
                                    {p.morfologia && (
                                      <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                                        {p.morfologia}
                                      </p>
                                    )}
                                  </div>
                                ))
                              ) : (
                                <p className="text-sm text-muted-foreground text-center py-8">Palavras originais em desenvolvimento para este livro.</p>
                              )}
                            </div>
                          </div>
                        </ScrollReveal>
                      </div>
                    )}

                    {tab === 'teologia' && (
                      <div className="space-y-4">
                        {doutrinasRelacionadas.length > 0 && (
                          <ScrollReveal>
                            <div className="glass-card p-6 rounded-2xl">
                              <h3 className="font-semibold text-sm mb-4 flex items-center gap-2 text-muted-foreground uppercase tracking-wider">
                                <Crosshair className="w-4 h-4" strokeWidth={1.5} />
                                Doutrinas Relacionadas
                              </h3>
                              <div className="space-y-4">
                                {doutrinasRelacionadas.map((d, i) => (
                                  <div key={i} className="p-4 bg-muted/30 rounded-xl">
                                    <div className="flex items-center gap-2 mb-2">
                                      <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">{d.categoria}</span>
                                    </div>
                                    <p className="font-semibold text-lg mb-1">{d.nome}</p>
                                    <p className="text-sm text-muted-foreground mb-3">{d.definicao}</p>
                                    <div className="flex flex-wrap gap-2">
                                      {d.passagens.map((ref, j) => (
                                        <span key={j} className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">{ref}</span>
                                      ))}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </ScrollReveal>
                        )}

                        <ScrollReveal>
                          <div className="glass-card p-6 rounded-2xl">
                            <h3 className="font-semibold text-sm mb-4 flex items-center gap-2 text-muted-foreground uppercase tracking-wider">
                              <BookOpen className="w-4 h-4" strokeWidth={1.5} />
                              Conexões Bíblicas
                            </h3>
                            <div className="space-y-3">
                              <div className="p-4 bg-gradient-to-r from-primary/5 to-transparent rounded-xl border-l-4 border-primary">
                                <p className="font-semibold text-sm mb-1">Aliança</p>
                                <p className="text-sm text-muted-foreground">O tema da aliança perpassa toda a Escritura, desde Abraão até a Nova Aliança em Cristo.</p>
                              </div>
                              <div className="p-4 bg-gradient-to-r from-amber-500/5 to-transparent rounded-xl border-l-4 border-amber-500">
                                <p className="font-semibold text-sm mb-1">Promessa e Cumprimento</p>
                                <p className="text-sm text-muted-foreground">As profecias e promessas do AT encontram cumprimento no NT.</p>
                              </div>
                              <div className="p-4 bg-gradient-to-r from-emerald-500/5 to-transparent rounded-xl border-l-4 border-emerald-500">
                                <p className="font-semibold text-sm mb-1">Tipo e Antítipo</p>
                                <p className="text-sm text-muted-foreground">Pessoas e eventos do AT (Moisés, Templo, cordeiro pascal) prefiguram Cristo.</p>
                              </div>
                            </div>
                          </div>
                        </ScrollReveal>
                      </div>
                    )}
                  </div>

                  {/* Sidebar */}
                  <aside className="space-y-4">
                    <ScrollReveal>
                      <div className="glass-card p-5 rounded-2xl">
                        <h3 className="font-semibold text-xs uppercase tracking-wider text-muted-foreground mb-4">Sobre o Livro</h3>
                        <div className="space-y-4">
                          <div className="p-3 bg-muted/30 rounded-xl">
                            <span className="text-xs text-muted-foreground block mb-1">Nome</span>
                            <p className="font-semibold">{livro?.nome}</p>
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div className="p-3 bg-muted/30 rounded-xl">
                              <span className="text-xs text-muted-foreground block mb-1">Abreviação</span>
                              <p className="font-mono text-sm font-semibold">{livro?.abreviacao}</p>
                            </div>
                            <div className="p-3 bg-muted/30 rounded-xl">
                              <span className="text-xs text-muted-foreground block mb-1">Testamento</span>
                              <p className="text-sm font-semibold">{livro?.testamento}</p>
                            </div>
                          </div>
                          <div className="p-3 bg-muted/30 rounded-xl">
                            <span className="text-xs text-muted-foreground block mb-1">Total de Capítulos</span>
                            <p className="font-semibold">{totalCaps}</p>
                          </div>
                          {generoInfo && (
                            <div className="p-3 bg-primary/5 rounded-xl border border-primary/20">
                              <span className="text-xs text-muted-foreground block mb-1">Gênero</span>
                              <p className="font-semibold text-primary">{generoInfo.genero}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </ScrollReveal>

                    <ScrollReveal delay={100}>
                      <div className="glass-card p-5 rounded-2xl">
                        <h3 className="font-semibold text-xs uppercase tracking-wider text-muted-foreground mb-3">Dica de Exegese</h3>
                        <div className="space-y-3 text-sm text-muted-foreground">
                          <div className="flex items-start gap-2">
                            <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center shrink-0 mt-0.5">1</span>
                            <p>Leia o capítulo em múltiplas traduções (ARC, KJV, WEB) para identificar nuances.</p>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center shrink-0 mt-0.5">2</span>
                            <p>Análise o contexto histórico e literário na aba &quot;Contexto&quot;.</p>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center shrink-0 mt-0.5">3</span>
                            <p>Estude as palavras-chave no original na aba &quot;Palavras&quot;.</p>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center shrink-0 mt-0.5">4</span>
                            <p>Identifique conexões teológicas na aba &quot;Teologia&quot;.</p>
                          </div>
                        </div>
                      </div>
                    </ScrollReveal>
                  </aside>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
