'use client';

import { useState } from 'react';
import { BookOpen, ChevronDown, ChevronRight, Info, Search } from 'lucide-react';

interface DiagramNode {
  id: string;
  type: 'subject' | 'predicate' | 'object' | 'modifier' | 'conjunction' | 'complement' | 'adverbial' | 'vocative' | 'interjection';
  text: string;
  greek?: string;
  strong?: string;
  children?: DiagramNode[];
}

interface SentenceDiagram {
  ref: string;
  livro: string;
  traducao: string;
  grego: string;
  diagrama: DiagramNode[];
  explicacao: string;
  notas: string[];
}

const DIAGRAMAS: SentenceDiagram[] = [
  {
    ref: 'Jo 1:1',
    livro: 'João',
    traducao: 'No princípio era o Verbo, e o Verbo estava com Deus, e o Verbo era Deus.',
    grego: 'Ἐν ἀρχῇ ἦν ὁ λόγος, καὶ ὁ λόγος ἦν πρὸς τὸν θεόν, καὶ θεὸς ἦν ὁ λόγος.',
    diagrama: [
      {
        id: 'j1-1',
        type: 'subject',
        text: 'Verbo (λόγος)',
        greek: 'λόγος',
        strong: 'G3056',
        children: [
          { id: 'j1-1a', type: 'modifier', text: 'No princípio (ἐν ἀρχῇ)', greek: 'ἐν ἀρχῇ', strong: 'G746' },
        ],
      },
      {
        id: 'j1-2',
        type: 'predicate',
        text: 'era (ἦν)',
        greek: 'ἦν',
        strong: 'G2258',
        children: [
          { id: 'j1-2a', type: 'complement', text: 'com Deus (πρὸς τὸν θεόν)', greek: 'πρὸς τὸν θεόν', strong: 'G2316' },
        ],
      },
      {
        id: 'j1-3',
        type: 'predicate',
        text: 'era (ἦν)',
        greek: 'ἦν',
        strong: 'G2258',
        children: [
          { id: 'j1-3a', type: 'complement', text: 'Deus (θεός)', greek: 'θεός', strong: 'G2316' },
        ],
      },
    ],
    explicacao: 'Três cláusulas paralelas com o verbo ἦν (imperfeito indicativo de εἰμί — "ser") no mesmo tempo, indicando existência contínua. O artigo definido ὁ precede λόγος na 1ª e 2ª cláusula, mas não na 3ª (θεὸς ἦν ὁ λόγος = "Deus era o Verbo"), indicando qualidade (Deus no sentido qualitativo).',
    notas: [
      'ἦν = imperfeito de εἰμί, indicando existência contínua no passado',
      'πρός + acusativo = "com" (indica intimidade/reciprocidade, não apenas proximidade)',
      'Ausência do artigo antes de θεός na cláusula final = qualitativo',
      'A ordem grega (Verbo-Deus-Deus) difere da portuguesa (Deus-Verbo)',
    ],
  },
  {
    ref: 'Ef 2:8-9',
    livro: 'Efésios',
    traducao: 'Porque pela graça vocês são salvos, por meio da fé; e isso não vem de vocês, é dom de Deus. Não vem de obras, para que ninguém se glorie.',
    grego: 'τῇ γὰρ χάριτί ἐστε σεσῳσμένοι διὰ τῆς πίστεως· καὶ τοῦτο οὐκ ἐξ ὑμῶν, θεοῦ τὸ δῶρον· οὐκ ἐξ ἔργων, ἵνα μή τι καυχήσηται.',
    diagrama: [
      {
        id: 'ef1',
        type: 'subject',
        text: 'vocês (ὑμεῖς)',
        greek: 'ὑμεῖς',
        strong: 'G5210',
        children: [
          { id: 'ef1a', type: 'modifier', text: 'pela graça (τῇ χάριτι)', greek: 'τῇ χάριτι', strong: 'G5485' },
        ],
      },
      {
        id: 'ef2',
        type: 'predicate',
        text: 'são salvos (ἐστε σεσῳσμένοι)',
        greek: 'ἐστε σεσῳσμένοι',
        strong: 'G4982',
        children: [
          { id: 'ef2a', type: 'modifier', text: 'por meio da fé (διὰ τῆς πίστεως)', greek: 'διὰ τῆς πίστεως', strong: 'G4102' },
        ],
      },
      {
        id: 'ef3',
        type: 'complement',
        text: 'isso (τοῦτο)',
        greek: 'τοῦτο',
        strong: 'G5124',
        children: [
          { id: 'ef3a', type: 'modifier', text: 'não de vocês (οὐκ ἐξ ὑμῶν)', greek: 'οὐκ ἐξ ὑμῶν', strong: 'G5213' },
          { id: 'ef3b', type: 'complement', text: 'dom de Deus (θεοῦ τὸ δῶρον)', greek: 'θεοῦ τὸ δῶρον', strong: 'G1390' },
        ],
      },
    ],
    explicacao: 'Perífrase passiva: ἐστε σεσῳσμένοι (vocês são salvos) = estado resultante de uma ação passada. O dativo τῇ χάριτι é causal ("por causa da graça"). διά + genitivo indica meio ("por meio da fé"). θεοῦ τὸ δῶρον = caso absoluto explicativo.',
    notas: [
      'σεσῳσμένοι = perfeito particípio passivo de σῴζω, indicando estado resultante',
      'τῇ χάριτι = dativo instrumental/causal ("pela/por causa da graça")',
      'διά + genitivo = meio ("por meio de")',
      'θεοῦ τὸ δῶρον = caso explicativo ("é dom de Deus")',
    ],
  },
  {
    ref: 'Rm 3:23',
    livro: 'Romanos',
    traducao: 'pois todos pecaram e estão destituídos da glória de Deus.',
    grego: 'πάντας γὰρ ἥμαρτον καὶ ὑστεροῦνται τῆς δόξης τοῦ θεοῦ.',
    diagrama: [
      {
        id: 'rm1',
        type: 'subject',
        text: 'todos (πάντας)',
        greek: 'πάντας',
        strong: 'G3956',
      },
      {
        id: 'rm2',
        type: 'predicate',
        text: 'pecaram (ἥμαρτον)',
        greek: 'ἥμαρτον',
        strong: 'G264',
      },
      {
        id: 'rm3',
        type: 'predicate',
        text: 'estão destituídos (ὑστεροῦνται)',
        greek: 'ὑστεροῦντai',
        strong: 'G5302',
        children: [
          { id: 'rm3a', type: 'complement', text: 'da glória de Deus (τῆς δόξης τοῦ θεοῦ)', greek: 'τῆς δόξης τοῦ θεοῦ', strong: 'G1391' },
        ],
      },
    ],
    explicacao: 'Duas cláusulas coordenadas: (1) πάντας ἥμαρτon (todos pecaram — aoristo indicativo, evento pontual no passado) + (2) ὑστεροῦνται (estão destituídos — presente indicativo, estado continuo). O verbo ἁμαρτάνω no aoristo indica ação completada; ὑστερέω no presente indica estado resultante.',
    notas: [
      'ἥμαρτον = aoristo indicativo ativo de ἁμαρτάνω (pecar)',
      'ὑστεροῦνται = presente indicativo passivo de ὑστερέω (faltar, estar destituído)',
      'πάντας (acusativo) = sujeito de ambas as cláusulas',
      'τῆς δόξης = genitivo de posse ("a glória que pertence a Deus")',
    ],
  },
  {
    ref: 'Mt 28:19-20',
    livro: 'Mateus',
    traducao: 'Portanto, vão e façam discípulos de todas as nações, batizando-os em nome do Pai, do Filho e do Espírito Santo, ensinando-os a obedecer a tudo que eu lhes comandei. E Eis que estou convosco todos os dias, até o fim do mundo.',
    grego: "πορευθέντες οὖν μαθητεύσατε πάντα τὰ ἔθνη, βαπτίζοντες αὐτοὺς εἰς τὸ ὄνομα τοῦ πατρὸς καὶ τοῦ υἱοῦ καὶ τοῦ ἁγίου πνεύματος, διδάσκοντες αὐτοὺς τηρεῖν πάντα ὅσα ἐνετειλάμην ὑμῖν· καὶ ἰδοὺ ἐγὼ μεθ' ὑμῶν εἰμι πάσας τὰς ἡμέρας ἕως τῆς συντελείας τοῦ αἰῶνος.",
    diagrama: [
      {
        id: 'mt1',
        type: 'predicate',
        text: 'façam discípulos (μαθητεύσατε)',
        greek: 'μαθητεύσατε',
        strong: 'G3100',
        children: [
          { id: 'mt1a', type: 'object', text: 'todas as nações (πάντα τὰ ἔθνη)', greek: 'πάντα τὰ ἔθνη', strong: 'G1484' },
        ],
      },
      {
        id: 'mt2',
        type: 'modifier',
        text: 'batizando-os (βαπτίζοντες)',
        greek: 'βαπτίζοντες',
        strong: 'G907',
        children: [
          { id: 'mt2a', type: 'complement', text: 'em nome do Pai, Filho, Espírito Santo', greek: 'εἰς τὸ ὄνομα τοῦ πατρός...', strong: 'G3686' },
        ],
      },
      {
        id: 'mt3',
        type: 'modifier',
        text: 'ensinando-os (διδάσκοντες)',
        greek: 'διδάσκοντες',
        strong: 'G1321',
        children: [
          { id: 'mt3a', type: 'object', text: 'a obedecer (τηρεῖν)', greek: 'τηρεῖν', strong: 'G5083' },
          { id: 'mt3b', type: 'object', text: 'tudo que comandei (πάντα ὅσα ἐνετειλάμην)', greek: 'πάντα ὅσα ἐνετειλάμην', strong: 'G2003' },
        ],
      },
    ],
    explicacao: 'O verbo principal é μαθητεύσατε (aoristo imperativo ativo — "façam discípulos"). Os dois participios βαπτίζοντες e διδάσκοντες (presente participio) indicam as maneiras de fazer discípulos: batizando E ensinando. A Grande Comissão tem três imperativos: ir (πορευθέντες), fazer discípulos (μαθητεύσατε), e os participios são modais.',
    notas: [
      'μαθητεύσατε = aoristo imperativo de μαθητεύω (fazer discípulos)',
      'βαπτίζοντες = presente participio de βαπτίζω (batizar)',
      'εἰς τὸ ὄνομα = "em nome de" (identidade/autoridade)',
      'ἐνετειλάμην = aoristo indicativo de ἐντέλλομαι (ordenar, comandar)',
    ],
  },
  {
    ref: 'Cl 1:15-17',
    livro: 'Colossenses',
    traducao: 'Ele é a imagem do Deus invisível, o primogênito de toda a criação, pois nele foram criadas todas as coisas, nos céus e na terra, visíveis e invisíveis, sejam tronos, sejam poderes, sejam autoridades, sejam domínios. Todas as coisas foram criadas por meio dele e para ele. Ele é antes de todas as coisas, e nele tudo subsiste.',
    grego: "ὅς ἐστιν εἰκὼν τοῦ θεοῦ τοῦ ἀοράτου, πρωτότοκος πάσης κτίσεως· ὅτι ἐν αὐτῷ ἐκτίσθη τὰ πάντα, ἐν τοῖς οὐρανοῖς καὶ ἐπὶ τῆς γῆς, τὰ ὁρατὰ καὶ τὰ ἀόρατα, εἴτε θρόνοι εἴτε κυριότητες εἴτε ἀρχαὶ εἴτε ἐξουσίαι· τὰ πάντα δι' αὐτοῦ ἔκτισται καὶ εἰς αὐτόν· πρὸ πάντων αὐτός ἐστιν, καὶ τὰ πάντα ἐν αὐτῷ συνέστηκεν.",
    diagrama: [
      {
        id: 'cl1',
        type: 'subject',
        text: 'Ele (ὅς)',
        greek: 'ὅς',
        strong: 'G3739',
        children: [
          { id: 'cl1a', type: 'complement', text: 'imagem do Deus invisível (εἰκὼν τοῦ θεοῦ τοῦ ἀοράτου)', greek: 'εἰκών', strong: 'G1504' },
          { id: 'cl1b', type: 'complement', text: 'primogênito de toda criação (πρωτότοκος πάσης κτίσεως)', greek: 'πρωτότοκος', strong: 'G4416' },
        ],
      },
      {
        id: 'cl2',
        type: 'predicate',
        text: 'foram criadas (ἐκτίσθη)',
        greek: 'ἐκτίσθη',
        strong: 'G2936',
        children: [
          { id: 'cl2a', type: 'object', text: 'todas as coisas (τὰ πάντα)', greek: 'τὰ πάντα', strong: 'G3956' },
          { id: 'cl2b', type: 'modifier', text: 'nele (ἐν αὐτῷ)', greek: 'ἐν αὐτῷ', strong: 'G846' },
        ],
      },
      {
        id: 'cl3',
        type: 'complement',
        text: "por meio dele (δι' αὐτοῦ)",
        greek: "δι' αὐτοῦ",
        strong: 'G846',
      },
      {
        id: 'cl4',
        type: 'complement',
        text: 'para ele (εἰς αὐτόν)',
        greek: 'εἰς αὐτόν',
        strong: 'G846',
      },
    ],
    explicacao: 'Hinos cristológicos primitivos. εἰκών (imagem) + πρωτότοκος (primogênito) = duas metáforas complementares. O hino tem estrutura quiasmática: (A) imagem/primogênito → (B) criação → (B\') sustentação → (A\') precedência. ἔκτισθη (aoristo passivo) = criação pontual; συνέστηκεν (perfeito) = sustentação contínua.',
    notas: [
      'εἰκών = imagem/ícone (não cópia, mas representação autêntica)',
      'πρωτότοκος = primogênito (não "primeiro criado", mas "preeminente")',
      'ἐκτίσθη = aoristo passivo de κτίζω (criar)',
      'συνέστηκεν = perfeito indicativo ativo de συνίστημi (sustentar, manter)',
      'πρό + genitivo = "antes de" (preexistência temporal)',
    ],
  },
  {
    ref: '1 Cor 15:3-4',
    livro: '1 Coríntios',
    traducao: 'Pois o que recebi e transmiti é de primeira importância: que Cristo morreu por nossos pecados, de acordo com as Escrituras, que foi sepultado, que ressuscitou ao terceiro dia, de acordo com as Escrituras.',
    grego: 'παρέδωκα γὰρ ὑμῖν ἐν πρώτοις, ὃ καὶ παρέλαβον, ὅτι Χριστὸς ἀπέθανεν ὑπὲρ τῶν ἁμαρτιῶν ἡμῶν κατὰ τὰς γραφάς, ὅτι ἐτάφη, ὅτι ἠγέρθη τῇ ἡμέρᾳ τῇ τρίτῃ κατὰ τὰς γραφάς.',
    diagrama: [
      {
        id: '1co1',
        type: 'predicate',
        text: 'transmiti (παρέδωκα)',
        greek: 'παρέδωκα',
        strong: 'G3860',
        children: [
          { id: '1co1a', type: 'object', text: 'o que recebi (ὃ καὶ παρέλαβον)', greek: 'ὃ καὶ παρέλαβον', strong: 'G3880' },
        ],
      },
      {
        id: '1co2',
        type: 'complement',
        text: 'Cristo morreu (Χριστὸς ἀπέθανεν)',
        greek: 'Χριστὸς ἀπέθανεν',
        strong: 'G599',
        children: [
          { id: '1co2a', type: 'modifier', text: 'por nossos pecados (ὑπὲρ τῶν ἁμαρτιῶν ἡμῶν)', greek: 'ὑπὲρ τῶν ἁμαρτιῶν ἡμῶν', strong: 'G266' },
          { id: '1co2b', type: 'modifier', text: 'de acordo com as Escrituras (κατὰ τὰς γραφάς)', greek: 'κατὰ τὰς γραφάς', strong: 'G1124' },
        ],
      },
      {
        id: '1co3',
        type: 'predicate',
        text: 'foi sepultado (ἐτάφη)',
        greek: 'ἐτάφη',
        strong: 'G2290',
      },
      {
        id: '1co4',
        type: 'predicate',
        text: 'ressuscitou (ἠγέρθη)',
        greek: 'ἠγέρθη',
        strong: 'G1453',
        children: [
          { id: '1co4a', type: 'modifier', text: 'ao terceiro dia (τῇ ἡμέρᾳ τῇ τρίτῃ)', greek: 'τῇ ἡμέρᾳ τῇ τρίτῃ', strong: 'G2250' },
          { id: '1co4b', type: 'modifier', text: 'de acordo com as Escrituras (κατὰ τὰς γραφάς)', greek: 'κατὰ τὰς γραφάς', strong: 'G1124' },
        ],
      },
    ],
    explicacao: 'Tradição oral primitiva (kerigma) que Paulo recebeu e transmitiu. Três verbos no aoristo indicativo: ἀπέθανεν (morreu), ἐτάφη (foi sepultado), ἠγέρθη (ressuscitou). A fórmula "de acordo com as Escrituras" aparece duas vezes, enraizando a morte e ressurreição nas profecias do AT.',
    notas: [
      'παρέδωκα = aoristo indicativo ativo de παραδίδωμi (transmitir, entregar)',
      'παρέλαβον = aoristo indicativo ativo de παραλαμβάνω (receber, aceitar)',
      'ἀπέθανεν = aoristo indicativo ativo de ἀποθνῄσκω (morrer)',
      'ἐτάφη = aoristo indicativo passivo de θάπτω (sepultar)',
      'ἠγέρθη = aoristo indicativo passivo de ἐγείρω (ressuscitar)',
      'κατά + acusativo = "de acordo com" (conformidade com as Escrituras)',
    ],
  },
  {
    ref: 'Ap 22:13',
    livro: 'Apocalipse',
    traducao: 'Eu sou o Alfa e o Ômega, o Primeiro e o Último, o Primeiro e o Último.',
    grego: 'ἐγὼ τὸ ἄλφα καὶ τὸ ὦ, ὁ πρῶτος καὶ ὁ ἔσχατος, ἀρχὴ καὶ τέλος.',
    diagrama: [
      {
        id: 'ap1',
        type: 'subject',
        text: 'Eu (ἐγώ)',
        greek: 'ἐγώ',
        strong: 'G1473',
      },
      {
        id: 'ap2',
        type: 'complement',
        text: 'Alfa e Ômega (τὸ ἄλφα καὶ τὸ ὦ)',
        greek: 'τὸ ἄλφα καὶ τὸ ὦ',
        strong: 'G1',
      },
      {
        id: 'ap3',
        type: 'complement',
        text: 'Primeiro e Último (ὁ πρῶτος καὶ ὁ ἔσχατος)',
        greek: 'ὁ πρῶτος καὶ ὁ ἔσχατος',
        strong: 'G4413',
      },
      {
        id: 'ap4',
        type: 'complement',
        text: 'Princípio e Fim (ἀρχὴ καὶ τέλος)',
        greek: 'ἀρχὴ καὶ τέλος',
        strong: 'G746',
      },
    ],
    explicacao: 'Tríplice autodeclaração com paralelismo sinônimo. Cada par é sinônimo do anterior: Alfa/Ômega = Primeiro/Último = Princípio/Fim. A repetição enfatiza a soberania de Cristo sobre todo o tempo e toda a história. As três formas são: (1) letras gregas, (2) ordem temporal, (3) conceito abstrato.',
    notas: [
      'τὸ ἄλφα = primeira letra do alfabeto grego (Hebraico: א)',
      'τὸ ὦ = última letra do alfabeto grego (Hebraico: ת)',
      'πρῶτος/ἔσχατος = superlativos regulares de πρότερος/ἔσχατος',
      'ἀρχή = princípio, governo, autoridade',
      'τέλος = fim, objetivo, cumprimento',
    ],
  },
];

const TYPE_COLORS: Record<string, string> = {
  subject: 'bg-blue-100 text-blue-800 border-blue-300',
  predicate: 'bg-green-100 text-green-800 border-green-300',
  object: 'bg-purple-100 text-purple-800 border-purple-300',
  modifier: 'bg-amber-100 text-amber-800 border-amber-300',
  conjunction: 'bg-gray-100 text-gray-800 border-gray-300',
  complement: 'bg-rose-100 text-rose-800 border-rose-300',
  adverbial: 'bg-teal-100 text-teal-800 border-teal-300',
  vocative: 'bg-indigo-100 text-indigo-800 border-indigo-300',
  interjection: 'bg-orange-100 text-orange-800 border-orange-300',
};

const TYPE_LABELS: Record<string, string> = {
  subject: 'Sujeito',
  predicate: 'Predicado',
  object: 'Objeto',
  modifier: 'Modificador',
  conjunction: 'Conjunção',
  complement: 'Complemento',
  adverbial: 'Adverbial',
  vocative: 'Vocativo',
  interjection: 'Interjeição',
};

function DiagramNodeComponent({ node, depth = 0 }: { node: DiagramNode; depth?: number }) {
  return (
    <div className={`${depth > 0 ? 'ml-6 mt-1' : ''}`}>
      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm font-medium ${TYPE_COLORS[node.type]}`}>
        <span className="text-xs opacity-60">{TYPE_LABELS[node.type]}</span>
        <span>{node.text}</span>
        {node.greek && <span className="text-xs opacity-50 italic">({node.greek})</span>}
        {node.strong && <span className="text-xs opacity-40 font-mono">{node.strong}</span>}
      </div>
      {node.children?.map(child => (
        <DiagramNodeComponent key={child.id} node={child} depth={depth + 1} />
      ))}
    </div>
  );
}

export default function SentenceDiagramsPage() {
  const [expandido, setExpandido] = useState<Set<string>>(new Set());
  const [busca, setBusca] = useState('');

  const filtrados = DIAGRAMAS.filter(d =>
    !busca || d.ref.toLowerCase().includes(busca.toLowerCase()) || d.traducao.toLowerCase().includes(busca.toLowerCase()) || d.livro.toLowerCase().includes(busca.toLowerCase())
  );

  const toggleExpand = (ref: string) => {
    setExpandido(prev => {
      const next = new Set(prev);
      if (next.has(ref)) next.delete(ref); else next.add(ref);
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gold-50 to-white dark:from-gray-900 dark:to-gray-950">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gold-900 dark:text-gold-100 mb-2">
            Diagramas de Sentença
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Análise sintática visual de versículos-chave. Cada elemento gramatical é identificado
            e classificado: sujeito, predicado, objeto, modificador e complemento.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {Object.entries(TYPE_LABELS).slice(0, 4).map(([key, label]) => (
            <div key={key} className={`rounded-xl p-3 text-center border ${TYPE_COLORS[key]}`}>
              <div className="text-lg font-bold">{label}</div>
            </div>
          ))}
        </div>

        {/* Busca */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input type="text" value={busca} onChange={e => setBusca(e.target.value)}
            placeholder="Buscar por referência ou texto..."
            className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 border border-gold-200 dark:border-gold-700 rounded-xl focus:ring-2 focus:ring-gold-500 focus:border-transparent" />
        </div>

        {/* Diagramas */}
        <div className="space-y-4">
          {filtrados.map(d => (
            <div key={d.ref} className="bg-white dark:bg-gray-800 rounded-xl border border-gold-200 dark:border-gold-700 overflow-hidden">
              <button onClick={() => toggleExpand(d.ref)}
                className="w-full flex items-center justify-between p-4 hover:bg-gold-50 dark:hover:bg-gray-750 transition-colors">
                <div className="flex items-center gap-3">
                  {expandido.has(d.ref) ? <ChevronDown className="w-4 h-4 text-gold-500" /> : <ChevronRight className="w-4 h-4 text-gold-500" />}
                  <BookOpen className="w-5 h-5 text-gold-600" />
                  <span className="font-bold text-gold-800 dark:text-gold-200">{d.ref}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">— {d.livro}</span>
                </div>
                <span className="text-sm text-gray-400">{d.diagrama.length} cláusulas</span>
              </button>
              {expandido.has(d.ref) && (
                <div className="px-4 pb-4 border-t border-gold-100 dark:border-gold-800 pt-4">
                  {/* Texto */}
                  <div className="bg-gold-50 dark:bg-gold-900/20 rounded-lg p-4 mb-4 border-l-4 border-gold-400">
                    <p className="text-gray-800 dark:text-gray-200 font-medium mb-2">{d.traducao}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 italic">{d.grego}</p>
                  </div>

                  {/* Diagrama */}
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 mb-4">
                    <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Estrutura Sintática:</h4>
                    <div className="space-y-2">
                      {d.diagrama.map(node => (
                        <DiagramNodeComponent key={node.id} node={node} />
                      ))}
                    </div>
                  </div>

                  {/* Explicação */}
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-4 border-l-4 border-blue-400">
                    <h4 className="text-sm font-semibold text-blue-800 dark:text-blue-300 mb-2 flex items-center gap-2">
                      <Info className="w-4 h-4" /> Análise Gramatical
                    </h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">{d.explicacao}</p>
                  </div>

                  {/* Notas */}
                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border-l-4 border-purple-400">
                    <h4 className="text-sm font-semibold text-purple-800 dark:text-purple-300 mb-2">Notas Filológicas:</h4>
                    <ul className="space-y-1">
                      {d.notas.map((nota, i) => (
                        <li key={i} className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2">
                          <span className="text-purple-400 mt-1">•</span> {nota}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
