'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Languages, Search, BookOpen, Volume2, Filter, ChevronDown, ChevronRight, Info, LayoutGrid, List, Download } from 'lucide-react';

// ═══════════════════════════════════════════════════════════════════════════════
// PARADIGMAS GREGOS COMPLETOS
// ═══════════════════════════════════════════════════════════════════════════════

const PARADIGMAS_GREGOS = {
  substantivo: {
    titulo: 'Substantivo Grego — Declinação',
    descricoes: ['1ª Declinação (feminina)', '2ª Declinação (masculina/neutra)', '3ª Declinação (irregular)'],
    exemplos: [
      {
        tipo: '1ª Declinação — λόγος (palavra)',
        casos: [
          { caso: 'Nominativo', singular: 'ὁ λόγος', plural: 'οἱ λόγοι' },
          { caso: 'Genitivo', singular: 'τοῦ λόγου', plural: 'τῶν λόγων' },
          { caso: 'Dativo', singular: 'τῷ λόγῳ', plural: 'τοῖς λόγοις' },
          { caso: 'Acusativo', singular: 'τὸν λόγον', plural: 'τοὺς λόγους' },
          { caso: 'Vocativo', singular: 'λόγε', plural: 'λόγοι' },
        ],
      },
      {
        tipo: '2ª Declinação — δῶρον (dom)',
        casos: [
          { caso: 'Nominativo', singular: 'τὸ δῶρον', plural: 'τὰ δῶρα' },
          { caso: 'Genitivo', singular: 'τοῦ δώρου', plural: 'τῶν δώρων' },
          { caso: 'Dativo', singular: 'τῷ δώρῳ', plural: 'τοῖς δώροις' },
          { caso: 'Acusativo', singular: 'τὸ δῶρον', plural: 'τὰ δῶρα' },
        ],
      },
      {
        tipo: '3ª Declinação — πνεῦμα (espírito)',
        casos: [
          { caso: 'Nominativo', singular: 'τὸ πνεῦμα', plural: 'τὰ πνεύματα' },
          { caso: 'Genitivo', singular: 'τοῦ πνεύματος', plural: 'τῶν πνευμάτων' },
          { caso: 'Dativo', singular: 'τῷ πνεύματι', plural: 'τοῖς πνεύμασι' },
          { caso: 'Acusativo', singular: 'τὸ πνεῦμα', plural: 'τὰ πνεύματα' },
        ],
      },
    ],
  },
  verbo_presente: {
    titulo: 'Verbo Grego — Presente (λύω, "libertar")',
    descricoes: ['Indicativo Ativo', 'Indicativo Passivo'],
    exemplos: [
      {
        tipo: 'Indicativo Ativo',
        casos: [
          { caso: '1ª Sing.', singular: 'λύω', plural: 'λύομεν' },
          { caso: '2ª Sing.', singular: 'λύεις', plural: 'λύετε' },
          { caso: '3ª Sing.', singular: 'λύει', plural: 'λύουσι(ν)' },
        ],
      },
      {
        tipo: 'Indicativo Passivo/Médio',
        casos: [
          { caso: '1ª Sing.', singular: 'λύομαι', plural: 'λυόμεθα' },
          { caso: '2ª Sing.', singular: 'λύῃ', plural: 'λύεσθε' },
          { caso: '3ª Sing.', singular: 'λύεται', plural: 'λύονται' },
        ],
      },
    ],
  },
  verbo_aoristo: {
    titulo: 'Verbo Grego — Aoristo (λύω)',
    descricoes: ['Indicativo Ativo', 'Indicativo Passivo'],
    exemplos: [
      {
        tipo: 'Indicativo Ativo',
        casos: [
          { caso: '1ª Sing.', singular: 'ἔλυσα', plural: 'ἐλύσαμεν' },
          { caso: '2ª Sing.', singular: 'ἔλυσας', plural: 'ἐλύσατε' },
          { caso: '3ª Sing.', singular: 'ἔλυσε(ν)', plural: 'ἔλυσαν' },
        ],
      },
      {
        tipo: 'Indicativo Passivo',
        casos: [
          { caso: '1ª Sing.', singular: 'ἐλύθην', plural: 'ἐλύθημεν' },
          { caso: '2ª Sing.', singular: 'ἐλύθης', plural: 'ἐλύθητε' },
          { caso: '3ª Sing.', singular: 'ἐλύθη', plural: 'ἐλύθησαν' },
        ],
      },
    ],
  },
  verbo_futuro: {
    titulo: 'Verbo Grego — Futuro (λύω)',
    descricoes: ['Indicativo Ativo', 'Indicativo Passivo'],
    exemplos: [
      {
        tipo: 'Indicativo Ativo',
        casos: [
          { caso: '1ª Sing.', singular: 'λύσω', plural: 'λύσομεν' },
          { caso: '2ª Sing.', singular: 'λύσεις', plural: 'λύσετε' },
          { caso: '3ª Sing.', singular: 'λύσει', plural: 'λύσουσι(ν)' },
        ],
      },
    ],
  },
  verbo_perfeito: {
    titulo: 'Verbo Grego — Perfeito (λύω)',
    descricoes: ['Indicativo Ativo'],
    exemplos: [
      {
        tipo: 'Indicativo Ativo',
        casos: [
          { caso: '1ª Sing.', singular: 'λέλυκα', plural: 'λελύκαμεν' },
          { caso: '2ª Sing.', singular: 'λέλυκας', plural: 'λελύκατε' },
          { caso: '3ª Sing.', singular: 'λέλυκε(ν)', plural: 'λελύκασι(ν)' },
        ],
      },
    ],
  },
  verbo_perfeito_passivo: {
    titulo: 'Verbo Grego — Perfeito Passivo (λύω)',
    descricoes: ['Indicativo Passivo'],
    exemplos: [
      {
        tipo: 'Indicativo Passivo',
        casos: [
          { caso: '1ª Sing.', singular: 'λέλυμαι', plural: 'λελύμεθα' },
          { caso: '2ª Sing.', singular: 'λέλυσαι', plural: 'λέλυσθε' },
          { caso: '3ª Sing.', singular: 'λέλυται', plural: 'λέλυνται' },
        ],
      },
    ],
  },
  verbo_subjuntivo: {
    titulo: 'Verbo Grego — Subjuntivo Aoristo (λύω)',
    descricoes: ['Ativo', 'Passivo'],
    exemplos: [
      {
        tipo: 'Aoristo Ativo',
        casos: [
          { caso: '1ª Sing.', singular: 'λύσω', plural: 'λύσωμεν' },
          { caso: '2ª Sing.', singular: 'λύσῃς', plural: 'λύσητε' },
          { caso: '3ª Sing.', singular: 'λύσῃ', plural: 'λύσωσι(ν)' },
        ],
      },
      {
        tipo: 'Aoristo Passivo',
        casos: [
          { caso: '1ª Sing.', singular: 'λυθῶ', plural: 'λυθῶμεν' },
          { caso: '2ª Sing.', singular: 'λυθῇς', plural: 'λυθῆτε' },
          { caso: '3ª Sing.', singular: 'λυθῇ', plural: 'λυθῶσι(ν)' },
        ],
      },
    ],
  },
  verbo_imperativo: {
    titulo: 'Verbo Grego — Imperativo (λύω)',
    descricoes: ['Presente Ativo', 'Aoristo Ativo'],
    exemplos: [
      {
        tipo: 'Presente Ativo',
        casos: [
          { caso: '2ª Sing.', singular: 'λύε', plural: 'λύετε' },
          { caso: '3ª Sing.', singular: 'λυέτω', plural: 'λυόντων' },
        ],
      },
      {
        tipo: 'Aoristo Ativo',
        casos: [
          { caso: '2ª Sing.', singular: 'λῦσον', plural: 'λύσατε' },
          { caso: '3ª Sing.', singular: 'λυσάτω', plural: 'λυσάντων' },
        ],
      },
    ],
  },
  participio: {
    titulo: 'Verbo Grego — Participio (λύω)',
    descricoes: ['Presente Ativo', 'Aoristo Ativo', 'Aoristo Passivo'],
    exemplos: [
      {
        tipo: 'Presente Ativo',
        casos: [
          { caso: 'Masc. Sing.', singular: 'λύων', plural: 'λύοντες' },
          { caso: 'Fem. Sing.', singular: 'λύουσα', plural: 'λύουσαι' },
          { caso: 'Neut. Sing.', singular: 'λῦον', plural: 'λύοντα' },
        ],
      },
      {
        tipo: 'Aoristo Ativo',
        casos: [
          { caso: 'Masc. Sing.', singular: 'λύσας', plural: 'λύσαντες' },
          { caso: 'Fem. Sing.', singular: 'λύσασα', plural: 'λύσασαι' },
          { caso: 'Neut. Sing.', singular: 'λῦσαν', plural: 'λύσαντα' },
        ],
      },
    ],
  },
  infinitivo: {
    titulo: 'Verbo Grego — Infinitivo (λύω)',
    descricoes: ['Todas as formas'],
    exemplos: [
      {
        tipo: 'Formas nominais',
        casos: [
          { caso: 'Pres. Ativo', singular: 'λύειν', plural: '—' },
          { caso: 'Aor. Ativo', singular: 'λῦσαι', plural: '—' },
          { caso: 'Aor. Passivo', singular: 'λυθῆναι', plural: '—' },
          { caso: 'Fut. Ativo', singular: 'λύσειν', plural: '—' },
          { caso: 'Perf. Ativo', singular: 'λελυκέναι', plural: '—' },
        ],
      },
    ],
  },
  artigo: {
    titulo: 'Artigo Grego — ὁ, ἡ, τό',
    descricoes: ['Masculino', 'Feminino', 'Neutro'],
    exemplos: [
      {
        tipo: 'Declinação completa',
        casos: [
          { caso: 'Nom. Sing.', singular: 'ὁ / ἡ / τό', plural: 'οἱ / αἱ / τά' },
          { caso: 'Gen. Sing.', singular: 'τοῦ / τῆς / τοῦ', plural: 'τῶν / τῶν / τῶν' },
          { caso: 'Dat. Sing.', singular: 'τῷ / τῇ / τῷ', plural: 'τοῖς / ταῖς / τοῖς' },
          { caso: 'Acc. Sing.', singular: 'τόν / τήν / τό', plural: 'τούς / τάς / τά' },
        ],
      },
    ],
  },
  preposicoes: {
    titulo: 'Preposições Gregas com + Acusativo',
    descricoes: ['Uso com acusativo vs genitivo vs dativo'],
    exemplos: [
      {
        tipo: 'Principais preposições',
        casos: [
          { caso: 'ἐν + Dat.', singular: 'em, entre, por meio de', plural: '—' },
          { caso: 'ἐκ + Gen.', singular: 'de, desde, por causa de', plural: '—' },
          { caso: 'εἰς + Acc.', singular: 'em, para, até', plural: '—' },
          { caso: 'ἐπί + Gen.', singular: 'sobre, contra, por causa de', plural: '—' },
          { caso: 'ἐπί + Dat.', singular: 'sobre, em cima de', plural: '—' },
          { caso: 'ἐπί + Acc.', singular: 'até, sobre', plural: '—' },
          { caso: 'διά + Gen.', singular: 'por meio de, através de', plural: '—' },
          { caso: 'διά + Acc.', singular: 'por causa de, através de', plural: '—' },
          { caso: 'πρός + Acc.', singular: 'para, com, contra', plural: '—' },
          { caso: 'παρά + Gen.', singular: 'de, de parte de', plural: '—' },
          { caso: 'παρά + Dat.', singular: 'ao lado de, junto com', plural: '—' },
          { caso: 'παρά + Acc.', singular: 'ao longo de, além de', plural: '—' },
          { caso: 'ὑπέρ + Gen.', singular: 'por, a favor de', plural: '—' },
          { caso: 'ὑπέρ + Acc.', singular: 'acerca de, sobre', plural: '—' },
          { caso: 'ὑπό + Gen.', singular: 'por (agente), de', plural: '—' },
          { caso: 'ὑπό + Acc.', singular: 'sob, debaixo de', plural: '—' },
          { caso: 'κατά + Gen.', singular: 'de acordo com, contra', plural: '—' },
          { caso: 'κατά + Acc.', singular: 'de acordo com, ao longo de', plural: '—' },
          { caso: 'μετά + Gen.', singular: 'com, depois de', plural: '—' },
          { caso: 'μετά + Acc.', singular: 'no meio de', plural: '—' },
          { caso: 'ἀπό + Gen.', singular: 'de, desde', plural: '—' },
          { caso: 'περί + Gen.', singular: 'acerca de, sobre', plural: '—' },
          { caso: 'περί + Acc.', singular: 'ao redor de, acerca de', plural: '—' },
          { caso: 'πρό + Gen.', singular: 'antes de', plural: '—' },
          { caso: 'σύν + Dat.', singular: 'com, juntamente com', plural: '—' },
        ],
      },
    ],
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// PARADIGMAS HEBRAICOS
// ═══════════════════════════════════════════════════════════════════════════════

const PARADIGMAS_HEBRAICOS = {
  sufixos_pronominais: {
    titulo: 'Sufixos Pronominais no Substantivo',
    descricoes: ['Formas possessivas'],
    exemplos: [
      {
        tipo: 'Sufixos possessivos (מֶלֶךְ — rei)',
        casos: [
          { caso: 'Meu rei', singular: 'מַלְכִּי (malkî)', plural: '—' },
          { caso: 'Teu rei (masc.)', singular: 'מַלְכְּךָ (malkəkā)', plural: '—' },
          { caso: 'Teu rei (fem.)', singular: 'מַלְכֵּךְ (malkēk)', plural: '—' },
          { caso: 'Seu rei (m.)', singular: 'מַלְכּוֹ (malkô)', plural: '—' },
          { caso: 'Seu rei (f.)', singular: 'מַלְכָּהּ (malkāh)', plural: '—' },
          { caso: 'Nosso rei', singular: 'מַלְכֵּנוּ (malkēnû)', plural: '—' },
          { caso: 'Seus reis', singular: 'מַלְכָּם (malkām)', plural: '—' },
        ],
      },
    ],
  },
  binyanim: {
    titulo: 'Binyanim — Verbos Hebraicos (7 padrões)',
    descricoes: ['Stem passivo, reflexivo, intensivo'],
    exemplos: [
      {
        tipo: 'Formações verbais (גָּלָה — revelar)',
        casos: [
          { caso: 'Qal (simples)', singular: 'גָּלָה (gālāh) — revelou', plural: '—' },
          { caso: 'Niphal (reflexivo)', singular: 'נִגְלָה (niglāh) — foi revelado', plural: '—' },
          { caso: 'Piel (intensivo)', singular: 'גִּלָּה (gillāh) — revelou completamente', plural: '—' },
          { caso: 'Pual (passivo)', singular: 'גֻּלָּה (gullāh) — foi revelado (intensivo)', plural: '—' },
          { caso: 'Hiphil (causativo)', singular: 'הִגְלָה (higlāh) — causou revelar', plural: '—' },
          { caso: 'Hophal (pass. caus.)', singular: 'הֻגְלָה (huglāh) — foi causado revelar', plural: '—' },
          { caso: 'Hithpael (refl. intens.)', singular: 'הִתְגַּלָּה (hitgallāh) — revelou-se', plural: '—' },
        ],
      },
      {
        tipo: 'Formações verbais (כָּתַב — escrever)',
        casos: [
          { caso: 'Qal', singular: 'כָּתַב (kāṯaḇ) — escreveu', plural: '—' },
          { caso: 'Niphal', singular: 'נִכְתַּב (niḵtaḇ) — foi escrito', plural: '—' },
          { caso: 'Piel', singular: 'כִּתֵּב (kiṯṯēḇ) — inscreveu', plural: '—' },
          { caso: 'Pual', singular: 'כֻּתַּב (kuṯṯaḇ) — foi inscrito', plural: '—' },
          { caso: 'Hiphil', singular: 'הִכְתִּיב (hiḵtîḇ) — causou escrever', plural: '—' },
          { caso: 'Hophal', singular: 'הֻכְתַּב (huḵtaḇ) — foi causado escrever', plural: '—' },
          { caso: 'Hithpael', singular: 'הִתְכַּתֵּב (hitkaṯṯēḇ) — escreveu-se', plural: '—' },
        ],
      },
    ],
  },
  estado_construto: {
    titulo: 'Estado Construto (Genitivo Hebraico)',
    descricoes: ['Relação possessiva entre substantivos'],
    exemplos: [
      {
        tipo: 'Exemplos de construto',
        casos: [
          { caso: 'Absoluto', singular: 'מֶלֶךְ (melex) — rei', plural: 'מְלָכִים (məlāḵîm) — reis' },
          { caso: 'Construto', singular: 'מֶלֶךְ (melex) — rei de', plural: 'מַלְכֵי (malḵê) — reis de' },
          { caso: 'Definido', singular: 'הַמֶּלֶךְ (hammelex) — o rei', plural: 'הַמְּלָכִים (hamməlāḵîm) — os reis' },
        ],
      },
      {
        tipo: 'Cadeia construta',
        casos: [
          { caso: 'Exemplo', singular: 'בֵּית מֶלֶךְ — casa de rei', plural: '—' },
          { caso: 'Com artigo', singular: 'בֵּית הַמֶּלֶךְ — casa do rei', plural: '—' },
          { caso: 'Cadeia tripla', singular: 'דִּבְרֵי יְהוָה — palavras do Senhor', plural: '—' },
        ],
      },
    ],
  },
  vav_consecutivo: {
    titulo: 'Waw Consecutivo (Vav Conversivo)',
    descricoes: ['Muda o tempo do verbo'],
    exemplos: [
      {
        tipo: 'Waw consecutivo imperfecto → passado',
        casos: [
          { caso: 'Imperfeito', singular: 'יִכְתֹּב (yiḵṯōḇ) — escreverá', plural: '—' },
          { caso: 'Waw Cons. + Impf.', singular: 'וַיִּכְתֹּב (wayyiḵṯōḇ) — e escreveu', plural: '—' },
          { caso: 'Perfeito', singular: 'כָּתַב (kāṯaḇ) — escreveu', plural: '—' },
          { caso: 'Waw Cons. + Pf.', singular: 'וְכָתַב (wəḵāṯaḇ) — e escreverá', plural: '—' },
        ],
      },
    ],
  },
  interrogativos: {
    titulo: 'Pronomes e Advérbios Interrogativos',
    descricoes: ['Formas de pergunta'],
    exemplos: [
      {
        tipo: 'Interrogativos',
        casos: [
          { caso: 'Quem?', singular: 'מִי (mî)', plural: '—' },
          { caso: 'O quê?', singular: 'מָה (māh)', plural: '—' },
          { caso: 'Onde?', singular: 'אֵיפֹה (ʾēp̄ōh)', plural: '—' },
          { caso: 'Quando?', singular: 'מָתַי (māṯay)', plural: '—' },
          { caso: 'Como?', singular: 'אֵיךְ (ʾēḵ)', plural: '—' },
          { caso: 'Por quê?', singular: 'לָמָה (lāmāh)', plural: '—' },
          { caso: 'Quanto?', singular: 'כַּמָּה (kammāh)', plural: '—' },
        ],
      },
    ],
  },
  numeros: {
    titulo: 'Numerais Hebraicos',
    descricoes: ['1-10 + coleta'],
    exemplos: [
      {
        tipo: 'Números cardinais',
        casos: [
          { caso: '1', singular: 'אֶחָד (ʾeḥāḏ)', plural: '—' },
          { caso: '2', singular: 'שְׁנַיִם (šənayim)', plural: '—' },
          { caso: '3', singular: 'שָׁלֹשׁ (šālōš)', plural: '—' },
          { caso: '4', singular: 'אַרְבַּע (ʾarbaʿ)', plural: '—' },
          { caso: '5', singular: 'חָמֵשׁ (ḥāmēš)', plural: '—' },
          { caso: '6', singular: 'שֵׁשׁ (šēš)', plural: '—' },
          { caso: '7', singular: 'שֶׁבַע (šəḇaʿ)', plural: '—' },
          { caso: '8', singular: 'שְׁמֹנֶה (šəmōneh)', plural: '—' },
          { caso: '9', singular: 'תֵּשַׁע (tēšaʿ)', plural: '—' },
          { caso: '10', singular: 'עֶשֶׂר (ʿeśer)', plural: '—' },
        ],
      },
    ],
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// COMPONENTE PRINCIPAL
// ═══════════════════════════════════════════════════════════════════════════════

export default function IdiomasAvancadosPage() {
  const [idioma, setIdioma] = useState<'grego' | 'hebraico'>('grego');
  const [paradigmaAtivo, setParadigmaAtivo] = useState<string>('substantivo');
  const [busca, setBusca] = useState('');
  const [expandido, setExpandido] = useState<Set<string>>(new Set(['0']));
  const [lexico, setLexico] = useState<any[]>([]);
  const [carregandoLexico, setCarregandoLexico] = useState(false);
  const [buscaLexico, setBuscaLexico] = useState('');
  const [aba, setAba] = useState<'paradigmas' | 'lexico' | 'concordancia'>('paradigmas');
  const [speaking, setSpeaking] = useState<string | null>(null);

  const paradigmas = idioma === 'grego' ? PARADIGMAS_GREGOS : PARADIGMAS_HEBRAICOS;
  const paradigmaChaves = Object.keys(paradigmas);

  useEffect(() => {
    setParadigmaAtivo(paradigmaChaves[0]);
  }, [idioma]);

  const pronunciar = useCallback((text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = idioma === 'grego' ? 'el-GR' : 'he-IL';
    u.rate = 0.7;
    const id = text;
    setSpeaking(id);
    u.onend = () => setSpeaking(null);
    u.onerror = () => setSpeaking(null);
    window.speechSynthesis.speak(u);
  }, [idioma]);

  useEffect(() => {
    if (aba === 'lexico' && lexico.length === 0) {
      setCarregandoLexico(true);
      Promise.all([
        import('@/data/lexicon/hebraico'),
        import('@/data/lexicon/grego'),
      ]).then(([hebMod, grkMod]) => {
        const heb = ((hebMod as any).palavrasHebraicas || Object.values(hebMod)) as any[];
        const grk = ((grkMod as any).palavrasGregas || (grkMod as any).GREGO || Object.values(grkMod)) as any[];
        setLexico([
          ...heb.map((e: any) => ({ ...e, lingua: 'hebraico' })),
          ...grk.map((e: any) => ({ ...e, lingua: 'grego' })),
        ]);
        setCarregandoLexico(false);
      });
    }
  }, [aba, lexico.length]);

  const lexicoFiltrado = useMemo(() => {
    if (!buscaLexico || buscaLexico.length < 2) return lexico.slice(0, 100);
    const q = buscaLexico.toLowerCase();
    return lexico.filter(e =>
      (e.palavra || '').toLowerCase().includes(q) ||
      (e.strong || '').toLowerCase().includes(q) ||
      (e.definicao || '').toLowerCase().includes(q) ||
      (e.transliteracao || '').toLowerCase().includes(q)
    ).slice(0, 200);
  }, [buscaLexico, lexico]);

  const paradigmaAtual: any = paradigmas[paradigmaAtivo as keyof typeof paradigmas];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gold-50 to-white dark:from-gray-900 dark:to-gray-950">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gold-900 dark:text-gold-100 mb-2">
            <Languages className="w-10 h-10 inline mr-3 text-gold-600" />
            Ferramentas de Línguas Bíblicas
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Paradigmas completos, léxico interativo e concordância para estudo avançado
            do grego koiné e hebraico bíblico.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 justify-center">
          {([
            { id: 'paradigmas' as const, label: 'Paradigmas', icon: LayoutGrid },
            { id: 'lexico' as const, label: 'Léxico', icon: BookOpen },
            { id: 'concordancia' as const, label: 'Concordância', icon: List },
          ]).map(tab => (
            <button key={tab.id} onClick={() => setAba(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all ${
                aba === tab.id
                  ? 'bg-gold-600 text-white shadow-lg'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gold-100 dark:hover:bg-gray-700 border border-gold-200 dark:border-gold-700'
              }`}>
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Seletor de idioma */}
        <div className="flex gap-2 mb-6 justify-center">
          {(['grego', 'hebraico'] as const).map(i => (
            <button key={i} onClick={() => setIdioma(i)}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                idioma === i
                  ? i === 'grego' ? 'bg-blue-600 text-white' : 'bg-purple-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
              }`}>
              {i === 'grego' ? 'Ελληνικά (Grego)' : 'עִבְרִית (Hebraico)'}
            </button>
          ))}
        </div>

        {/* ═══════ PARADIGMAS ═══════ */}
        {aba === 'paradigmas' && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gold-200 dark:border-gold-700 p-4 sticky top-24">
                <h3 className="font-bold text-gold-800 dark:text-gold-200 mb-3">
                  {idioma === 'grego' ? 'Paradigmas Gregos' : 'Paradigmas Hebraicos'}
                </h3>
                <div className="space-y-1">
                  {paradigmaChaves.map(key => {
                    const p: any = paradigmas[key as keyof typeof paradigmas];
                    return (
                      <button key={key} onClick={() => setParadigmaAtivo(key)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                          paradigmaAtivo === key
                            ? 'bg-gold-100 dark:bg-gold-900/30 text-gold-800 dark:text-gold-200 font-medium'
                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}>
                        {p.titulo.split('—')[0].trim()}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Conteúdo */}
            <div className="lg:col-span-3">
              {paradigmaAtual && (
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gold-200 dark:border-gold-700 p-6">
                  <h2 className="text-2xl font-bold text-gold-800 dark:text-gold-200 mb-2">
                    {paradigmaAtual.titulo}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                    {paradigmaAtual.descricoes.join(' • ')}
                  </p>

                  <div className="space-y-6">
                    {paradigmaAtual.exemplos.map((ex: any, i: number) => (
                      <div key={i}>
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
                          <span className="w-6 h-6 bg-gold-100 dark:bg-gold-900/30 rounded-full flex items-center justify-center text-xs text-gold-600">
                            {i + 1}
                          </span>
                          {ex.tipo}
                        </h3>
                        <div className="overflow-x-auto">
                          <table className="w-full border-collapse">
                            <thead>
                              <tr className="bg-gold-50 dark:bg-gold-900/20">
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-gray-400 border-b border-gold-200 dark:border-gold-700">
                                  Forma
                                </th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-gray-400 border-b border-gold-200 dark:border-gold-700">
                                  Singular
                                </th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-gray-400 border-b border-gold-200 dark:border-gold-700">
                                  Plural
                                </th>
                                <th className="px-4 py-2 w-10 border-b border-gold-200 dark:border-gold-700"></th>
                              </tr>
                            </thead>
                            <tbody>
                              {ex.casos.map((c: any, j: number) => (
                                <tr key={j} className="hover:bg-gold-50 dark:hover:bg-gray-750 transition-colors">
                                  <td className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 border-b border-gold-100 dark:border-gold-800">
                                    {c.caso}
                                  </td>
                                  <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-200 font-mono border-b border-gold-100 dark:border-gold-800">
                                    {c.singular}
                                  </td>
                                  <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-200 font-mono border-b border-gold-100 dark:border-gold-800">
                                    {c.plural}
                                  </td>
                                  <td className="px-2 py-2 border-b border-gold-100 dark:border-gold-800">
                                    {c.singular !== '—' && (
                                      <button onClick={() => pronunciar(c.singular.replace(/[()]/g, ''))}
                                        className={`p-1 rounded hover:bg-gold-200 dark:hover:bg-gold-800 transition-colors ${
                                          speaking === c.singular ? 'text-gold-600 animate-pulse' : 'text-gray-400'
                                        }`}>
                                        <Volume2 className="w-3 h-3" />
                                      </button>
                                    )}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ═══════ LÉXICO ═══════ */}
        {aba === 'lexico' && (
          <div>
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input type="text" value={buscaLexico} onChange={e => setBuscaLexico(e.target.value)}
                placeholder="Buscar palavra, Strong's, definição..."
                className="w-full pl-12 pr-4 py-4 bg-white dark:bg-gray-800 border border-gold-200 dark:border-gold-700 rounded-xl text-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent" />
            </div>

            {carregandoLexico ? (
              <div className="text-center py-12">
                <div className="animate-spin w-8 h-8 border-2 border-gold-600 border-t-transparent rounded-full mx-auto mb-4" />
                <p className="text-gray-500">Carregando léxico...</p>
              </div>
            ) : (
              <>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  {lexicoFiltrado.length} de {lexico.length} palavras
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {lexicoFiltrado.map((e, i) => (
                    <div key={i} className="bg-white dark:bg-gray-800 rounded-xl border border-gold-200 dark:border-gold-700 p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-lg text-gray-900 dark:text-gray-100">
                          {e.palavra}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                          e.lingua === 'grego' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                        }`}>
                          {e.strong}
                        </span>
                      </div>
                      {e.transliteracao && (
                        <p className="text-sm text-gray-500 italic mb-1">{e.transliteracao}</p>
                      )}
                      <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
                        {e.definicao || e.definicaoResumida || 'Sem definição'}
                      </p>
                      {e.morphologia && (
                        <p className="text-xs text-gray-400 mt-1 font-mono">{e.morphologia}</p>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* ═══════ CONCORDÂNCIA ═══════ */}
        {aba === 'concordancia' && (
          <div>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Busque por palavra original e veja onde ela aparece em todas as traduções.
              A concordância mostra cada ocorrência com contexto.
            </p>
            <ConcordanciaSection lingua={idioma} />
          </div>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SEÇÃO DE CONCORDÂNCIA
// ═══════════════════════════════════════════════════════════════════════════════

function ConcordanciaSection({ lingua }: { lingua: 'grego' | 'hebraico' }) {
  const [termo, setTermo] = useState('');
  const [resultados, setResultados] = useState<any[]>([]);
  const [carregando, setCarregando] = useState(false);

  const buscar = async () => {
    if (!termo || termo.length < 2) return;
    setCarregando(true);
    try {
      const [hebMod, grkMod] = await Promise.all([
        import('@/data/lexicon/hebraico'),
        import('@/data/lexicon/grego'),
      ]);
      const heb = ((hebMod as any).palavrasHebraicas || Object.values(hebMod)) as any[];
      const grk = ((grkMod as any).palavrasGregas || (grkMod as any).GREGO || Object.values(grkMod)) as any[];
      const data = lingua === 'grego' ? grk : heb;
      const q = termo.toLowerCase();
      const matches = data.filter((e: any) =>
        (e.palavra || '').toLowerCase().includes(q) ||
        (e.strong || '').toLowerCase().includes(q) ||
        (e.transliteracao || '').toLowerCase().includes(q)
      ).slice(0, 50);
      setResultados(matches);
    } catch {
      setResultados([]);
    }
    setCarregando(false);
  };

  return (
    <div>
      <div className="flex gap-3 mb-6">
        <input type="text" value={termo} onChange={e => setTermo(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && buscar()}
          placeholder={lingua === 'grego' ? 'Ex: λόγος, G3056, logos...' : 'Ex: שָׁלוֹם, H7965, shalom...'}
          className="flex-1 px-4 py-3 bg-white dark:bg-gray-800 border border-gold-200 dark:border-gold-700 rounded-xl focus:ring-2 focus:ring-gold-500" />
        <button onClick={buscar}
          className="px-6 py-3 bg-gold-600 text-white rounded-xl hover:bg-gold-700 transition-colors font-medium">
          Buscar
        </button>
      </div>

      {carregando && (
        <div className="text-center py-8">
          <div className="animate-spin w-6 h-6 border-2 border-gold-600 border-t-transparent rounded-full mx-auto" />
        </div>
      )}

      {resultados.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm text-gray-500">{resultados.length} resultados</p>
          {resultados.map((r, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-xl border border-gold-200 dark:border-gold-700 p-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xl font-bold text-gray-900 dark:text-gray-100">{r.palavra}</span>
                <span className="text-sm text-gray-500 italic">{r.transliteracao}</span>
                <span className="px-2 py-0.5 rounded text-xs font-mono bg-gold-100 dark:bg-gold-900/30 text-gold-700 dark:text-gold-300">
                  {r.strong}
                </span>
                {r.frequencia && (
                  <span className="text-xs text-gray-400">×{r.frequencia}</span>
                )}
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300">{r.definicao}</p>
              {r.morphologia && (
                <p className="text-xs text-gray-400 mt-1 font-mono">{r.morphologia}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
