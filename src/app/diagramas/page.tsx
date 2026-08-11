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
  {
    ref: 'Gn 1:1',
    livro: 'Gênesis',
    traducao: 'No princípio Deus criou os céus e a terra.',
    grego: 'בְּרֵאשִׁית בָּרָא אֱלֹהִים אֵת הַשָּׁמַיִם וְאֵת הָאָרֶץ.',
    diagrama: [
      {
        id: 'gn1-1',
        type: 'adverbial',
        text: 'No princípio (בְּרֵאשִׁית)',
        greek: 'בְּרֵאשִׁית',
        strong: 'H7225',
      },
      {
        id: 'gn1-2',
        type: 'subject',
        text: 'Deus (אֱלֹהִים)',
        greek: 'אֱלֹהִים',
        strong: 'H430',
      },
      {
        id: 'gn1-3',
        type: 'predicate',
        text: 'criou (בָּרָא)',
        greek: 'בָּרָא',
        strong: 'H1254',
        children: [
          { id: 'gn1-3a', type: 'object', text: 'os céus (הַשָּׁמַיִם)', greek: 'הַשָּׁמַיִם', strong: 'H8064' },
          { id: 'gn1-3b', type: 'object', text: 'a terra (הָאָרֶץ)', greek: 'הָאָרֶץ', strong: 'H776' },
        ],
      },
    ],
    explicacao: 'Frase adverbial temporal seguida de sujeito-predicado-objeto. בָּרָא (bara) é um verbo exclusivo divino — só Deus como sujeito. Indica criação ex nihilo. אֱלֹהִים é plural majestático, mas o verbo בָּרָא é singular, reforçando a unicidade divina.',
    notas: [
      'בְּרֵאשִׁית = construção com בְּ (bet consecutivo) + רֵאשִׁית (primeiro)',
      'בָּרָא = aoristo semítico, criação ex nihilo (exclusivo de Deus)',
      'אֵת = partícula de objeto direto (não traduzida)',
      'הַשָּׁמַיִם = plural majestático (céus = três céus em conceito semítico)',
    ],
  },
  {
    ref: 'Êx 3:14',
    livro: 'Êxodo',
    traducao: 'Deus disse a Moisés: EU SOU O QUE SOU. E disse: Assim dirás aos filhos de Israel: EU SOU me enviou a vocês.',
    grego: 'וַיֹּאמֶר אֱלֹהִים אֶל־מֹשֶׁה אֶהְיֶה אֲשֶׁר אֶהְיֶה.',
    diagrama: [
      {
        id: 'ex1',
        type: 'vocative',
        text: 'Deus (אֱלֹהִים)',
        greek: 'אֱלֹהִים',
        strong: 'H430',
      },
      {
        id: 'ex2',
        type: 'subject',
        text: 'EU SOU (אֶהְיֶה)',
        greek: 'אֶהְיֶה',
        strong: 'H1961',
      },
      {
        id: 'ex3',
        type: 'complement',
        text: 'O QUE SOU (אֲשֶׁר אֶהְיֶה)',
        greek: 'אֲשֶׁר אֶהְיֶה',
        strong: 'H834',
      },
    ],
    explicacao: 'Nome revelado de Deus: אֶהְיֶה (ehyeh) = imperfeito de הָיָה (ser). O imperfeito hebraico indica ação contínua/iterativa: "Eu Sou o que Sou" ou "Eu Serei o que Serei". A ambiguidade é intencional — Deus é autossuficiente e soberano sobre o futuro.',
    notas: [
      'אֶהְיֶה = imperfeito Qal de הָיָה (ser, existir)',
      'אֲשֶׁר = pronome relativo ("que", "o que")',
      'LXX traduziu como ἐγώ εἰμι (eu sou)',
      'Título divino: autoexistência, imutabilidade, eternidade',
    ],
  },
  {
    ref: 'Dt 6:4',
    livro: 'Deuteronômio',
    traducao: 'Ouve, Israel: O SENHOR nosso Deus é o único SENHOR.',
    grego: 'שְׁמַע יִשְׂרָאֵל יְהוָה אֱלֹהֵינוּ יְהוָה אֶחָד.',
    diagrama: [
      {
        id: 'dt1',
        type: 'interjection',
        text: 'Ouve (שְׁמַע)',
        greek: 'שְׁמַע',
        strong: 'H8085',
      },
      {
        id: 'dt2',
        type: 'vocative',
        text: 'Israel (יִשְׂרָאֵל)',
        greek: 'יִשְׂרָאֵל',
        strong: 'H3478',
      },
      {
        id: 'dt3',
        type: 'subject',
        text: 'O SENHOR (יְהוָה)',
        greek: 'יְהוָה',
        strong: 'H3068',
      },
      {
        id: 'dt4',
        type: 'complement',
        text: 'nosso Deus (אֱלֹהֵינוּ)',
        greek: 'אֱלֹהֵינוּ',
        strong: 'H430',
      },
      {
        id: 'dt5',
        type: 'complement',
        text: 'é o único SENHOR (יְהוָה אֶחָד)',
        greek: 'יְהוָה אֶחָד',
        strong: 'H259',
      },
    ],
    explicacao: 'Shemá Israel — declaração central do monoteísmo bíblico. שְׁמַע imperativo Qal de שָׁמַע ("ouvir + obedecer"). אֶחָד = "um" (numeral), não "único" (יָחִיד). A ênfase é na unidade/divindade de YHWH, não apenas na exclusividade.',
    notas: [
      'שְׁמַע = imperativo: ouvir com obediência (shema = audição+ação)',
      'יְהוָה = tetragrama sagrado (YHWH), nome covenantal',
      'אֶחָד = numeral cardinal "um" (unidade, não exclusividade)',
      'Recitado duas vezes ao dia na tradição judaica (manhã/noite)',
    ],
  },
  {
    ref: 'Sl 23:1',
    livro: 'Salmos',
    traducao: 'O SENHOR é o meu pastor; nada me faltará.',
    grego: 'יְהוָה רֹעִי לֹא אֶחְסָר.',
    diagrama: [
      {
        id: 'sl1',
        type: 'subject',
        text: 'O SENHOR (יְהוָה)',
        greek: 'יְהוָה',
        strong: 'H3068',
      },
      {
        id: 'sl2',
        type: 'complement',
        text: 'é o meu pastor (רֹעִי)',
        greek: 'רֹעִי',
        strong: 'H7462',
      },
      {
        id: 'sl3',
        type: 'predicate',
        text: 'nada me faltará (לֹא אֶחְסָר)',
        greek: 'לֹא אֶחְסָר',
        strong: 'H2637',
      },
    ],
    explicacao: 'Metáfora pastoral: יְהוָה = sujeito, רֹעִי = predicativo do sujeito. A frase negativa לֹא אֶחְסָר usa o imperfecto de אָחַס ("faltar"), indicando provisão contínua. David, como pastor, reconhece em Deus o Pastor supremo.',
    notas: [
      'רֹעִי = particípio ativo de רָעָה (apascentar)',
      'אֶחְסָר = imperfecto Qal de חָסֵר (faltar,carecer)',
      'Metáfora: Deus como pastor covenantal (cf. Jr 23:1-4)',
      'Contexto: Salmo davídico, possible durante fuga de Absalão',
    ],
  },
  {
    ref: 'Is 53:5',
    livro: 'Isaías',
    traducao: 'Mas ele foi ferido por causa das nossas transgressões, moido por causa das nossas iniquidades; o castigo que nos traz paz estava sobre ele, e pelas suas chassis ficamos curados.',
    grego: 'וְהוּא מְחֹלָל מִפְּשָׁעֵנוּ מְדֻכָּא מֵעֲוֺנֹתֵינוּ מוּסַר שְׁלוֹמֵנוּ עָלָיו וּבְחַבֻּרָתוֹ נִרְפָּא־לָנוּ.',
    diagrama: [
      {
        id: 'is1',
        type: 'subject',
        text: 'ele (וְהוּא)',
        greek: 'וְהוּא',
        strong: 'H1931',
      },
      {
        id: 'is2',
        type: 'predicate',
        text: 'ferido (מְחֹלָל)',
        greek: 'מְחֹלָל',
        strong: 'H2490',
        children: [
          { id: 'is2a', type: 'adverbial', text: 'por nossas transgressões (מִפְּשָׁעֵנוּ)', greek: 'מִפְּשָׁעֵנוּ', strong: 'H6588' },
        ],
      },
      {
        id: 'is3',
        type: 'predicate',
        text: 'moido (מְדֻכָּא)',
        greek: 'מְדֻכָּא',
        strong: 'H1794',
        children: [
          { id: 'is3a', type: 'adverbial', text: 'por nossas iniquidades (מֵעֲוֺנֹתֵינוּ)', greek: 'מֵעֲוֺנֹתֵינוּ', strong: 'H5771' },
        ],
      },
      {
        id: 'is4',
        type: 'subject',
        text: 'castigo que traz paz (מוּסַר שְׁלוֹמֵנוּ)',
        greek: 'מוּסַר שְׁלוֹמֵנוּ',
        strong: 'H4148',
      },
      {
        id: 'is5',
        type: 'predicate',
        text: 'estava sobre ele (עָלָיו)',
        greek: 'עָלָיו',
        strong: 'H5921',
      },
    ],
    explicacao: 'Quatro participios passivos descrevem o Servo Sofredor: מְחֹלָל (ferido), מְדֻכָּא (moido). אָשָׁם ("culpado/transgressor") é traduzido como "transgressões". A construção causativa implica que o sofrimento do Servo é vicário (por causa de outros).',
    notas: [
      'מְחֹלָל = particípio Piel de חָלַל (ferir, perfurar)',
      'מְדֻכָּא = particípio Poel de דָּכָא (esmagar, moer)',
      'מוּסַר = disciplina, instrução; aqui = castigo corretivo',
      'שְׁלוֹם = paz, completude, bem-estar covenantal',
      'נִרְפָּא = perfecto Niphal de רָפָא (curar)',
    ],
  },
  {
    ref: 'Sl 119:105',
    livro: 'Salmos',
    traducao: 'Lâmpada para os meus pés é a tua palavra, e luz para o meu caminho.',
    grego: 'נֵר לְרַגְלִי דְבָרֶךָ וְאוֹר לִנְתִיבָתִי.',
    diagrama: [
      {
        id: 'sl105-1',
        type: 'complement',
        text: 'Lâmpada para meus pés (נֵר לְרַגְלִי)',
        greek: 'נֵר לְרַגְלִי',
        strong: 'H5216',
      },
      {
        id: 'sl105-2',
        type: 'subject',
        text: 'a tua palavra (דְבָרֶךָ)',
        greek: 'דְבָרֶךָ',
        strong: 'H1697',
      },
      {
        id: 'sl105-3',
        type: 'complement',
        text: 'luz para meu caminho (אוֹר לִנְתִיבָתִי)',
        greek: 'אוֹר לִנְתִיבָתִי',
        strong: 'H216',
      },
      {
        id: 'sl105-4',
        type: 'subject',
        text: 'a tua palavra (דְבָרֶךָ)',
        greek: 'דְבָרֶךָ',
        strong: 'H1697',
      },
    ],
    explicacao: 'Paralelismo sinônimo: נֵר (lâmpada) = אוֹר (luz), לְרַגְלִי (para meus pés) = לִנְתִיבָתִי (para meu caminho). A metáfora da luz orienta no escuro. דָּבָר = palavra individual (não Torah como torah), aplicação pessoal.',
    notas: [
      'נֵר = lâmpada de óleo (fogo contínuo)',
      'דָּבָר = palavra, assunto, coisa (contexto: revelação divina)',
      'אוֹר = luz (literal e figurada)',
      'נְתִיבָה = trilha, caminho estreito (não רֶחֶב = larga)',
    ],
  },
  {
    ref: 'Jr 31:33',
    livro: 'Jeremias',
    traducao: 'Porque este será o pacto que farei com a casa de Israel: Pôr-ei a minha lei dentro deles, e a escreverei no seu coração; e eu serei o seu Deus, e eles serão o meu povo.',
    grego: 'כִּי זֶה הַבְּרִית אֲשֶׁר אֶכְרֹת אֶת־בֵּית יִשְׂרָאֵל אַחֲרֵי הַיָּמִים הָהֵם נְאֻם־יְהוָה נָתַתִּי אֶת־תּוֹרָתִי בְּקִרְבָּם וְעַל־לִבָּם אֶכְתֳּבֶנָּה.',
    diagrama: [
      {
        id: 'jr1',
        type: 'subject',
        text: 'este (זֶה)',
        greek: 'זֶה',
        strong: 'H2063',
      },
      {
        id: 'jr2',
        type: 'complement',
        text: 'o pacto (הַבְּרִית)',
        greek: 'הַבְּרִית',
        strong: 'H1285',
      },
      {
        id: 'jr3',
        type: 'predicate',
        text: 'farei (אֶכְרֹת)',
        greek: 'אֶכְרֹת',
        strong: 'H3772',
        children: [
          { id: 'jr3a', type: 'adverbial', text: 'com a casa de Israel (אֶת־בֵּית יִשְׂרָאֵל)', greek: 'אֶת־בֵּית יִשְׂרָאֵל', strong: 'H1004' },
        ],
      },
      {
        id: 'jr4',
        type: 'predicate',
        text: 'porei (נָתַתִּי)',
        greek: 'נָתַתִּי',
        strong: 'H5414',
        children: [
          { id: 'jr4a', type: 'object', text: 'minha lei (תוֹרָתִי)', greek: 'תוֹרָתִי', strong: 'H8451' },
          { id: 'jr4b', type: 'adverbial', text: 'dentro deles (בְּקִרְבָּם)', greek: 'בְּקִרְבָּם', strong: 'H7130' },
        ],
      },
      {
        id: 'jr5',
        type: 'predicate',
        text: 'escreverei (אֶכְתֳּבֶנָּה)',
        greek: 'אֶכְתֳּבֶנָּה',
        strong: 'H3789',
        children: [
          { id: 'jr5a', type: 'adverbial', text: 'no coração deles (עַל־לִבָּם)', greek: 'עַל־לִבָּם', strong: 'H3820' },
        ],
      },
    ],
    explicacao: 'Nova aliança (berit hadashah). Aoristo performativo: אֶכְרֹת ("eu cortarei" = já realizado na promessa). A lei será internalizada (בְּקִרְבָּם = "no íntimo deles") e inscrita no לֵב (coração = centro da vontade, não emoção).',
    notas: [
      'בְּרִית = aliança, pacto (literal: "cortar" — cf. Gn 15:18)',
      'אֶכְרֹת = imperfecto Qal de כָּרַת (cortar aliança)',
      'תּוֹרָה = instrução, lei (do verbo יָרָה = instruir)',
      'בְּקִרְבָּם = "no meio deles" (intimidade, interioridade)',
      ' fulfilment em Hb 8:8-12; 10:16-17',
    ],
  },
  {
    ref: 'Dn 7:13-14',
    livro: 'Daniel',
    traducao: 'Estava vindo com as nuvens do céu como o Filho do Homem; até o Ancião dos Dias chegou, e foi-lhe dado domínio, honra e reino.',
    grego: 'עִם־עֲנָנֵי שְׁמַיָּא כְּבַר אֱנָשׁ אֶתָּא וְעַד עַתִּיקַּתָּא מְטָא וְקָדָמוֹהִי הַקְרֵבוּ וְלֵהּ יְהִיב שׁלְטָן וִיקַר וּמַלְכוּ.',
    diagrama: [
      {
        id: 'dn1',
        type: 'adverbial',
        text: 'com as nuvens (עִם־עֲנָנֵי)',
        greek: 'עִם־עֲנָנֵי',
        strong: 'H6051',
      },
      {
        id: 'dn2',
        type: 'subject',
        text: 'Filho do Homem (כְּבַר אֱנָשׁ)',
        greek: 'כְּבַר אֱנָשׁ',
        strong: 'H1247',
      },
      {
        id: 'dn3',
        type: 'predicate',
        text: 'chegou (מְטָא)',
        greek: 'מְטָא',
        strong: 'H5285',
      },
      {
        id: 'dn4',
        type: 'subject',
        text: 'Ancião dos Dias (עַתִּיקַּתָּא)',
        greek: 'עַתִּיקַּתָּא',
        strong: 'H6268',
      },
      {
        id: 'dn5',
        type: 'predicate',
        text: 'foi-lhe dado (יְהִיב)',
        greek: 'יְהִיב',
        strong: 'H3052',
        children: [
          { id: 'dn5a', type: 'object', text: 'domínio (שׁלְטָן)', greek: 'שׁלְטָן', strong: 'H7985' },
          { id: 'dn5b', type: 'object', text: 'honra (וִיקַר)', greek: 'וִיקַר', strong: 'H3366' },
          { id: 'dn5c', type: 'object', text: 'reino (וּמַלְכוּ)', greek: 'וּמַלְכוּ', strong: 'H4437' },
        ],
      },
    ],
    explicacao: 'Visão apocalíptica: בַּר אֱנָשׁ ("filho do homem") é título messiânico (arameu, não hebraico). Atributos divinos: reino eterno (v.14), adoração universal (v.14), autoridade sobre todas as línguas. Jesus usa este título em Mt 26:64.',
    notas: [
      'בַּר = "filho" (arameu, equivalente hebraico בֵּן)',
      'עַתִּיק = "antigo, ancião" (particípio de עָתַק)',
      'שׁלְטָן = domínio, autoridade (persa: shahr)',
      ' fulfilment: Mt 24:30; 26:64; Ap 1:13; 14:14',
    ],
  },
  {
    ref: 'Mt 5:3',
    livro: 'Mateus',
    traducao: 'Bem-aventurados os pobres em espírito, porque deles é o Reino dos Céus.',
    grego: 'μακάριοι οἱ πτωχοὶ τῷ πνεύματι, ὅτι αὐτῶν ἐστιν ἡ βασιλεία τῶν οὐρανῶν.',
    diagrama: [
      {
        id: 'mt53-1',
        type: 'complement',
        text: 'Bem-aventurados (μακάριοι)',
        greek: 'μακάριοι',
        strong: 'G3107',
      },
      {
        id: 'mt53-2',
        type: 'subject',
        text: 'os pobres em espírito (οἱ πτωχοὶ τῷ πνεύματι)',
        greek: 'οἱ πτωχοὶ τῷ πνεύματι',
        strong: 'G4434',
      },
      {
        id: 'mt53-3',
        type: 'predicate',
        text: 'é (ἐστιν)',
        greek: 'ἐστιν',
        strong: 'G2076',
      },
      {
        id: 'mt53-4',
        type: 'subject',
        text: 'deles (αὐτῶν)',
        greek: 'αὐτῶν',
        strong: 'G846',
      },
      {
        id: 'mt53-5',
        type: 'complement',
        text: 'o Reino dos Céus (ἡ βασιλεία τῶν οὐρανῶν)',
        greek: 'ἡ βασιλεία τῶν οὐρανῶν',
        strong: 'G932',
      },
    ],
    explicacao: 'Primeira bem-aventurança. μακάριοι = "felizes" (não "santos"). οἱ πτωχοί = artigo definido + adjetivo = "os pobres" (categoria). τῷ πνεύματi = dativo de referência ("em espírito"). A inversão é típica do Reino: os pobres herdam.',
    notas: [
      'μακάριος = felizardo, abençoado (gr. θεόμακαρος = divinamente feliz)',
      'πτωχός = mendigo (grau mais extremo que πένης = pobre)',
      'βασιλεία τῶν οὐρανῶν = "reino dos céus" (eufemismo judaico para "de Deus")',
      'Mateus usa "céus" (plural) 32x, nunca "Deus" diretamente (respeito judaico)',
    ],
  },
  {
    ref: 'Mt 22:37',
    livro: 'Mateus',
    traducao: 'Jesus disse-lhe: Amarás o Senhor teu Deus de todo o teu coração, de toda a tua alma e de todo o teu entendimento.',
    grego: 'ὁ δὲ ἔφη αὐτῷ ἀγαπήσεις κύριον τὸν θεόν σου ἐξ ὅλης τῆς καρδίας σου καὶ ἐξ ὅλης τῆς ψυχῆς σου καὶ ἐξ ὅλης τῆς διανοίας σου.',
    diagrama: [
      {
        id: 'mt22-1',
        type: 'vocative',
        text: 'Jesus (ὁ δὲ)',
        greek: 'ὁ δὲ',
        strong: 'G3588',
      },
      {
        id: 'mt22-2',
        type: 'predicate',
        text: 'disse (ἔφη)',
        greek: 'ἔφη',
        strong: 'G5346',
      },
      {
        id: 'mt22-3',
        type: 'predicate',
        text: 'amarás (ἀγαπήσεις)',
        greek: 'ἀγαπήσεις',
        strong: 'G25',
        children: [
          { id: 'mt22-3a', type: 'object', text: 'o Senhor teu Deus (κύριον τὸν θεόν σου)', greek: 'κύριον τὸν θεόν σου', strong: 'G2962' },
          { id: 'mt22-3b', type: 'adverbial', text: 'de todo o coração (ἐξ ὅλης τῆς καρδίας)', greek: 'ἐξ ὅλης τῆς καρδίας', strong: 'G2588' },
          { id: 'mt22-3c', type: 'adverbial', text: 'de toda a alma (ἐξ ὅλης τῆς ψυχῆς)', greek: 'ἐξ ὅλης τῆς ψυχῆς', strong: 'G5590' },
          { id: 'mt22-3d', type: 'adverbial', text: 'de todo o entendimento (ἐξ ὅλης τῆς διανοίας)', greek: 'ἐξ ὅλης τῆς διανοίας', strong: 'G1271' },
        ],
      },
    ],
    explicacao: 'Shemá expandido (Dt 6:5). ἀγαπήσεις = futuro indicativo ativo de ἀγαπάω (amar com vontade). Três aspectos: καρδία (centro da personalidade), ψυχή (vida/ser), διάνοια (mente/intelecto). Totalidade: sem ressalvas.',
    notas: [
      'ἀγαπήσεις = futuro 28132 de ἀγαπάω (amor incondicional, voluntário)',
      'καρδία = coração (hebraico לֵב = centro da decisão, não emoção)',
      'ψυχή = alma, ser, vida (hebraico נֶפֶשׁ)',
      'διάνοια = mente, entendimento, intelecto',
      'Reflexo do Shemá (Dt 6:5) — Jesus equipara amor a Deus com amor ao próximo',
    ],
  },
  {
    ref: 'Jo 3:16',
    livro: 'João',
    traducao: 'Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.',
    grego: 'οὕτως γὰρ ἠγάπησεν ὁ θεὸς τὸν κόσμον ὥστε τὸν υἱὸν τὸν μονογενῆ ἔδωκεν, ἵνα πᾶς ὁ πιστεύων εἰς αὐτὸν μὴ ἀπόληται ἀλλ᾽ ἔχῃ ζωὴν αἰώνιον.',
    diagrama: [
      {
        id: 'jo3-1',
        type: 'subject',
        text: 'Deus (ὁ θεός)',
        greek: 'ὁ θεός',
        strong: 'G2316',
      },
      {
        id: 'jo3-2',
        type: 'predicate',
        text: 'amou (ἠγάπησεν)',
        greek: 'ἠγάπησεν',
        strong: 'G25',
        children: [
          { id: 'jo3-2a', type: 'object', text: 'o mundo (τὸν κόσμον)', greek: 'τὸν κόσμον', strong: 'G2889' },
          { id: 'jo3-2b', type: 'adverbial', text: 'de tal maneira (οὕτως)', greek: 'οὕτως', strong: 'G3779' },
        ],
      },
      {
        id: 'jo3-3',
        type: 'predicate',
        text: 'deu (ἔδωκεν)',
        greek: 'ἔδωκεν',
        strong: 'G1325',
        children: [
          { id: 'jo3-3a', type: 'object', text: 'o Filho unigênito (τὸν υἱὸν τὸν μονογενῆ)', greek: 'τὸν υἱὸν τὸν μονογενῆ', strong: 'G3439' },
        ],
      },
      {
        id: 'jo3-4',
        type: 'adverbial',
        text: 'para que (ἵνα)',
        greek: 'ἵνα',
        strong: 'G2443',
        children: [
          { id: 'jo3-4a', type: 'predicate', text: 'não pereça (μὴ ἀπόληται)', greek: 'μὴ ἀπόληται', strong: 'G622' },
          { id: 'jo3-4b', type: 'predicate', text: 'tenha vida eterna (ἔχῃ ζωὴν αἰώνιον)', greek: 'ἔχῃ ζωὴν αἰώνιον', strong: 'G2222' },
        ],
      },
    ],
    explicacao: 'Versículo mais conhecido da Bíblia. οὕτως ὥστε = "de tal maneira que" (consequência). ἠγάπησεν = aoristo indicativo ativo (ação pontual: o amor de Deus se manifestou no evento histórico). μονογενής = "único, unigênito" (não "unigênito" apenas biologicamente).',
    notas: [
      'οὕτως = advérbio de modo ("assim, desta forma")',
      'μονογενής = monogenes (μόνος + γένος = "único tipo")',
      'πιστεύων = particípio presente ativo = "o que crê" (contínuo)',
      'ζωὴ αἰώνιος = vida eterna (qualidade, não apenas duração)',
      'ἀπόληται = subjuntivo aoristo médio de ἀπόλλυμι (destruir, perecer)',
    ],
  },
  {
    ref: 'Jo 14:6',
    livro: 'João',
    traducao: 'Jesus disse-lhe: Eu sou o caminho, a verdade e a vida. Ninguém vem ao Pai senão por mim.',
    grego: 'λέγει αὐτῷ ὁ Ἰησοῦς ἐγώ εἰμι ἡ ὁδὸς καὶ ἡ ἀλήθεια καὶ ἡ ζωή· οὐδεὶς ἔρχεται πρὸς τὸν πατέρα εἰ μὴ δι᾽ ἐμοῦ.',
    diagrama: [
      {
        id: 'jo14-1',
        type: 'vocative',
        text: 'Jesus (ὁ Ἰησοῦς)',
        greek: 'ὁ Ἰησοῦς',
        strong: 'G2424',
      },
      {
        id: 'jo14-2',
        type: 'predicate',
        text: 'disse (λέγει)',
        greek: 'λέγει',
        strong: 'G3004',
      },
      {
        id: 'jo14-3',
        type: 'subject',
        text: 'Eu (ἐγώ)',
        greek: 'ἐγώ',
        strong: 'G1473',
      },
      {
        id: 'jo14-4',
        type: 'complement',
        text: 'o caminho (ἡ ὁδός)',
        greek: 'ἡ ὁδός',
        strong: 'G3598',
      },
      {
        id: 'jo14-5',
        type: 'complement',
        text: 'a verdade (ἡ ἀλήθεια)',
        greek: 'ἡ ἀλήθεια',
        strong: 'G225',
      },
      {
        id: 'jo14-6',
        type: 'complement',
        text: 'a vida (ἡ ζωή)',
        greek: 'ἡ ζωή',
        strong: 'G2222',
      },
    ],
    explicacao: 'Tríplice declaração com artigo definido (ἡ) em cada: "o caminho" (artigo enfático = único). ἐγώ εἰμι = afirmação divina (cf. Êx 3:14). οὐδείς... εἰ μή = "ninguém... senão" (exclusão absoluta). A exclusividade cristã está aqui.',
    notas: [
      'ὁδός = caminho, estrada, modo de vida',
      'ἀλήθεια = verdade (realidade, não apenas conceito)',
      'ζωή = vida (qualidade divina, não biológica)',
      'εἰ μή = "senão, exceto" (partícula de exceção)',
      'Jesus declara: caminho (missão), verdade (revelação), vida (redenção)',
    ],
  },
  {
    ref: 'Rm 5:8',
    livro: 'Romanos',
    traducao: 'Mas Deus prova o seu amor para conosco em que Cristo morreu por nós sendo nós ainda pecadores.',
    grego: 'συνιστᾷ δὲ τὴν ἀγάπην αὐτοῦ εἰς ἡμᾶς ὁ θεὸς ὅτι, κατὰ καιρὸν ὑπὲρ ἀσεβῶν ἀπέθανεν Χριστός.',
    diagrama: [
      {
        id: 'rm5-1',
        type: 'subject',
        text: 'Deus (ὁ θεός)',
        greek: 'ὁ θεός',
        strong: 'G2316',
      },
      {
        id: 'rm5-2',
        type: 'predicate',
        text: 'prova (συνιστᾷ)',
        greek: 'συνιστᾷ',
        strong: 'G4921',
        children: [
          { id: 'rm5-2a', type: 'object', text: 'o seu amor (τὴν ἀγάπην αὐτοῦ)', greek: 'τὴν ἀγάπην αὐτοῦ', strong: 'G26' },
        ],
      },
      {
        id: 'rm5-3',
        type: 'adverbial',
        text: 'para conosco (εἰς ἡμᾶς)',
        greek: 'εἰς ἡμᾶς',
        strong: 'G1519',
      },
      {
        id: 'rm5-4',
        type: 'adverbial',
        text: 'Cristo morreu (Χριστὸς ἀπέθανεν)',
        greek: 'Χριστὸς ἀπέθανεν',
        strong: 'G599',
        children: [
          { id: 'rm5-4a', type: 'adverbial', text: 'por nós (ὑπὲρ ἡμῶν)', greek: 'ὑπὲρ ἡμῶν', strong: 'G5228' },
          { id: 'rm5-4b', type: 'adverbial', text: 'sendo pecadores (ὑπὲρ ἀσεβῶν)', greek: 'ὑπὲρ ἀσεβῶν', strong: 'G765' },
        ],
      },
    ],
    explicacao: 'συνιστᾷ = presente indicativo ativo de συνίστημι (demonstrar, provar). A prova do amor é objetiva: morte de Cristo. ὑπὲρ ἀσεβῶν = "pelos ímpios" (antes da conversão). Amor incondicional: não depende da qualidade do objeto.',
    notas: [
      'συνιστᾷ = colocar junto, demonstrar, comprovar',
      'ἀσεβής = ímpio, sem reverência a Deus (raiz: σέβομai = reverenciar)',
      'ὑπὲρ + genitivo = "por causa de, em benefício de"',
      'Cristo morreu no ponto exato da rebelliao humana (Rm 5:6-10)',
    ],
  },
  {
    ref: '1 Co 13:4-7',
    livro: '1 Coríntios',
    traducao: 'O amor é sofredor, é bondoso; não inveja; não se vangloria, não se orgulha, não maltrata, não procura seus interesses, não se irrita, não guarda rancor, não se alegra com a injustiça, mas se alegra com a verdade. Tudo sofre, tudo crê, tudo espera, tudo suporta.',
    grego: 'ἡ ἀγάπη μακροθυμεῖ χρηστεύεται, οὐ ζηλοῖ, οὐ περπερεύεται, οὐ φυσιοῦται, οὐκ ἀσχημονεῖ, οὐ ζητεῖ τὰ ἑαυτῆς, οὐ παροξύνεται, οὐ λογίζεται τὸ κακόν, οὐ χαίρει ἐπὶ τῇ ἀδικίᾳ, συγχαίρει δὲ τῇ ἀληθείᾳ· πάντα στέγει, πάντα πιστεύει, πάντα ἐλπίζει, πάντα ὑπομένει.',
    diagrama: [
      {
        id: 'co13-1',
        type: 'subject',
        text: 'O amor (ἡ ἀγάπη)',
        greek: 'ἡ ἀγάπη',
        strong: 'G26',
      },
      {
        id: 'co13-2',
        type: 'predicate',
        text: 'é sofredor (μακροθυμεῖ)',
        greek: 'μακροθυμεῖ',
        strong: 'G3114',
      },
      {
        id: 'co13-3',
        type: 'predicate',
        text: 'é bondoso (χρηστεύεται)',
        greek: 'χρηστεύεται',
        strong: 'G5541',
      },
      {
        id: 'co13-4',
        type: 'predicate',
        text: 'não inveja (οὐ ζηλοῖ)',
        greek: 'οὐ ζηλοῖ',
        strong: 'G2206',
      },
      {
        id: 'co13-5',
        type: 'predicate',
        text: 'não se vangloria (οὐ περπερεύεται)',
        greek: 'οὐ περπερεύεται',
        strong: 'G4068',
      },
      {
        id: 'co13-6',
        type: 'predicate',
        text: 'não se orgulha (οὐ φυσιοῦται)',
        greek: 'οὐ φυσιοῦται',
        strong: 'G5448',
      },
      {
        id: 'co13-7',
        type: 'predicate',
        text: 'não maltrata (οὐκ ἀσχημονεῖ)',
        greek: 'οὐκ ἀσχημονεῖ',
        strong: 'G807',
      },
    ],
    explicacao: 'Hino ao amor com 15 verbos no presente indicativo (ação contínua). μακροθυμεῖ = "sofre longamente" (não impaciente). χρηστεύεται = "se comporta bondosamente" (verbo único, não adjetivo). Oito negativos + sete positivos.',
    notas: [
      'μακροθυμία = paciência com pessoas (não apenas circunstâncias)',
      'περπερεύομαι = "inflar-se" (usado apenas aqui no NT)',
      'φυσιοῦμαι = "inchar" (metáfora de arrogância)',
      'λογίζομαι = "contar, calcular" (não guardar débitos)',
      'στέγω = suportar (de στέγος = telhado, abrigo)',
    ],
  },
  {
    ref: 'Fp 2:5-8',
    livro: 'Filipenses',
    traducao: 'Haja em vocês o mesmo sentimento que houve em Cristo Jesus, que, sendo em forma de Deus, não teve por usurpação ser igual a Deus, mas esvaziou-se a si mesmo, tomando a forma de servo, fazendo-se semelhante aos homens, e, achado em forma humana, humilhou a si mesmo, sendo obediente até a morte, e morte de cruz.',
    grego: 'τοῦτο γὰρ φρονείσθω ἐν ὑμῖν ὃ καὶ ἐν Χριστῷ Ἰησοῦ, ὃς ἐν μορφῇ θεοῦ ὑπάρχων οὐχ ἁρπαγμὸν ἡγήσατο τὸ εἶναι ἴσα θεῷ, ἀλλ᾽ ἑαυτὸν ἐκένωσεν μορφὴν δούλου λαβών, ἐν ὁμοιώματι ἀνθρώπων γενόμενος, καὶ σχήματι εὑρεθεὶς ὡς ἄνθρωπος ἐταπείνωσεν ἑαυτὸν γενόμενος ὑπήκοος μέχρι θανάτου, θανάτου δὲ σταυροῦ.',
    diagrama: [
      {
        id: 'fp1',
        type: 'subject',
        text: 'Cristo Jesus (Χριστῷ Ἰησοῦ)',
        greek: 'Χριστῷ Ἰησοῦ',
        strong: 'G5547',
      },
      {
        id: 'fp2',
        type: 'complement',
        text: 'sendo em forma de Deus (ἐν μορφῇ θεοῦ ὑπάρχων)',
        greek: 'ἐν μορφῇ θεοῦ ὑπάρχων',
        strong: 'G3444',
      },
      {
        id: 'fp3',
        type: 'predicate',
        text: 'esvaziou (ἑαυτὸν ἐκένωσεν)',
        greek: 'ἑαυτὸν ἐκένωσεν',
        strong: 'G2758',
        children: [
          { id: 'fp3a', type: 'object', text: 'a si mesmo (ἑαυτόν)', greek: 'ἑαυτόν', strong: 'G1438' },
          { id: 'fp3b', type: 'complement', text: 'tomando forma de servo (μορφὴν δούλου λαβών)', greek: 'μορφὴν δούλου λαβών', strong: 'G1401' },
        ],
      },
      {
        id: 'fp4',
        type: 'predicate',
        text: 'humilhou (ἐταπείνωσεν)',
        greek: 'ἐταπείνωσεν',
        strong: 'G5013',
        children: [
          { id: 'fp4a', type: 'adverbial', text: 'até a morte (μέχρι θανάτου)', greek: 'μέχρι θανάτου', strong: 'G2288' },
          { id: 'fp4b', type: 'adverbial', text: 'morte de cruz (θανάτου δὲ σταυροῦ)', greek: 'θανάτου δὲ σταυροῦ', strong: 'G4716' },
        ],
      },
    ],
    explicacao: 'Hino cristológico (kenosis). ἐκένωσεν = aoristo indicativo ativo de κενόω (esvaziar). Não abandonou a natureza divina, mas renunciou ao privilégio. Quatro movimentos: (1) forma de Deus → (2) forma de servo → (3) homem → (4) morto na cruz.',
    notas: [
      'μορφή = forma essencial, natureza (não aparência externa)',
      'ἐκένωσεν = esvaziou (kenosis = vazio de prerrogativas)',
      'δοῦλος = escravo (status mais baixo na sociedade romana)',
      'σταυρός = cruz (morte reservada a escravos e rebeldes)',
      'Escada descendente: Deus → homem → servo → morto → cruz',
    ],
  },
  {
    ref: '1 Ts 4:16-17',
    livro: '1 Tessalonicenses',
    traducao: 'Porque o próprio Senhor descerá do céu com grito de comando, com voz de arcanjo e com trombeta de Deus, e os mortos em Cristo ressuscitarão primeiro. Depois nós, que permanecemos vivos, seremos arrebatados juntamente com eles nas nuvens para o encontro do Senhor nos ares, e assim estaremos sempre com o Senhor.',
    grego: 'αὐτὸς γὰρ ὁ κύριος ἐν κελεύσματι, ἐν φωνῇ ἀρχαγγέλου καὶ σάλπιγγι θεοῦ καταβήσεται ἀπ᾽ οὐρανοῦ καὶ οἱ νεκροὶ ἐν Χριστῷ ἀναστήσονται πρῶτον, ἔπειτα ἡμεῖς οἱ ζῶντες οἱ ἀφειμένοι ἅμα σὺν αὐτοῖς ἁρπαγησόμεθα ἐν νεφέλαις εἰς ἀπάντησιν τοῦ κυρίου εἰς ἀέρα· καὶ οὕτως πάντοτε σὺν κυρίῳ ἐσόμεθα.',
    diagrama: [
      {
        id: 'ts1',
        type: 'subject',
        text: 'o Senhor (ὁ κύριος)',
        greek: 'ὁ κύριος',
        strong: 'G2962',
      },
      {
        id: 'ts2',
        type: 'predicate',
        text: 'descerá (καταβήσεται)',
        greek: 'καταβήσεται',
        strong: 'G2597',
        children: [
          { id: 'ts2a', type: 'adverbial', text: 'do céu (ἀπ᾽ οὐρανοῦ)', greek: 'ἀπ᾽ οὐρανοῦ', strong: 'G3772' },
          { id: 'ts2b', type: 'adverbial', text: 'com grito (ἐν κελεύσματι)', greek: 'ἐν κελεύσματι', strong: 'G2752' },
          { id: 'ts2c', type: 'adverbial', text: 'com voz de arcanjo (ἐν φωνῇ ἀρχαγγέλου)', greek: 'ἐν φωνῇ ἀρχαγγέλου', strong: 'G743' },
          { id: 'ts2d', type: 'adverbial', text: 'com trombeta (σάλπιγγι θεοῦ)', greek: 'σάλπιγγι θεοῦ', strong: 'G4536' },
        ],
      },
      {
        id: 'ts3',
        type: 'predicate',
        text: 'ressuscitarão (ἀναστήσονται)',
        greek: 'ἀναστήσονται',
        strong: 'G450',
        children: [
          { id: 'ts3a', type: 'subject', text: 'os mortos em Cristo (οἱ νεκροὶ ἐν Χριστῷ)', greek: 'οἱ νεκροὶ ἐν Χριστῷ', strong: 'G3498' },
        ],
      },
      {
        id: 'ts4',
        type: 'predicate',
        text: 'seremos arrebatados (ἁρπαγησόμεθα)',
        greek: 'ἁρπαγησόμεθα',
        strong: 'G726',
        children: [
          { id: 'ts4a', type: 'subject', text: 'nós os vivos (ἡμεῖς οἱ ζῶντες)', greek: 'ἡμεῖς οἱ ζῶντες', strong: 'G2198' },
          { id: 'ts4b', type: 'adverbial', text: 'nas nuvens (ἐν νεφέλαις)', greek: 'ἐν νεφέλαις', strong: 'G3507' },
          { id: 'ts4c', type: 'adverbial', text: 'para o encontro (εἰς ἀπάντησιν)', greek: 'εἰς ἀπάντησιν', strong: 'G529' },
        ],
      },
    ],
    explicacao: 'Escatologia paulina. Quatro elementos da parousia: (1) descenso do Senhor, (2) ressurreição dos mortos, (3) arrebatamento dos vivos, (4) encontro nos ares. καταβήσεται = futuro médio de καταβαίνω (descender). ἁρπαγησόμεθα = futuro passivo de ἁρπάζω (arrebatar).',
    notas: [
      'κέλευσμα = grito de comando militar',
      'ἀρχάγγελος = arcanjo (Miguel: Jd 9)',
      'σάλπιγξ = trombeta (sinal de assembleia/batalha)',
      'ἁρπαγησόμεθα = futuro passivo (seremos arrebatados)',
      'ἀπάντησις = encontro (termo técnico para recepção de dignitário)',
    ],
  },
  {
    ref: 'Hb 1:1-3',
    livro: 'Hebreus',
    traducao: 'Havendo Deus falado muitas vezes e de muitas maneiras aos nossos pais, por meio dos profetas, nestes últimos dias nos falou pelo Filho, a quem constituiu herdeiro de todas as coisas, por quem também fez os mundos; o qual, sendo o resplendor da sua glória e a imagem exata do seu substância, e sustentando todas as coisas pela palavra do seu poder, depois de ter feito a purificação dos pecados, assentou-se à destra da majestade no alto.',
    grego: 'πολυμερῶς καὶ πολυτρόπως πάλαι ὁ θεὸς λαλήσας τοῖς πατράσιν ἐν τοῖς προφήταις ἐπ᾽ ἐσχάτου τῶν ἡμερῶν τούτων ἐλάλησεν ἡμῖν ἐν υἱῷ, ὃν ἔθηκεν κληρονόμον πάντων, δι᾽ οὗ καὶ ἐποίησεν τοὺς αἰῶνας· ὅς ἐστιν ἀπαύγασμα τῆς δόξης καὶ χαρακτὴρ τῆς ὑποστάσεως αὐτοῦ, φέρων τε τὰ πάντα τῷ ῥήματι τῆς δυνάμεως αὐτοῦ, καθαρισμὸν τῶν ἁμαρτιῶν ποιησάμενος ἐκάθισεν ἐν δεξιᾷ τῆς μεγαλωσύνης ἐν ὑψηλοῖς.',
    diagrama: [
      {
        id: 'hb1-1',
        type: 'subject',
        text: 'Deus (ὁ θεός)',
        greek: 'ὁ θεός',
        strong: 'G2316',
      },
      {
        id: 'hb1-2',
        type: 'predicate',
        text: 'falou (ἐλάλησεν)',
        greek: 'ἐλάλησεν',
        strong: 'G2980',
        children: [
          { id: 'hb1-2a', type: 'adverbial', text: 'muitas vezes (πολυμερῶς)', greek: 'πολυμερῶς', strong: 'G4181' },
          { id: 'hb1-2b', type: 'adverbial', text: 'de muitas maneiras (πολυτρόπως)', greek: 'πολυτρόπως', strong: 'G4187' },
        ],
      },
      {
        id: 'hb1-3',
        type: 'complement',
        text: 'pelo Filho (ἐν υἱῷ)',
        greek: 'ἐν υἱῷ',
        strong: 'G5207',
      },
      {
        id: 'hb1-4',
        type: 'complement',
        text: 'resplendor da glória (ἀπαύγασμα τῆς δόξης)',
        greek: 'ἀπαύγασμα τῆς δόξης',
        strong: 'G541',
      },
      {
        id: 'hb1-5',
        type: 'complement',
        text: 'imagem exata (χαρακτὴρ τῆς ὑποστάσεως)',
        greek: 'χαρακτὴρ τῆς ὑποστάσεως',
        strong: 'G5481',
      },
    ],
    explicacao: 'Prólogo cristológico. Dois adverbios: πολυμερῶς (muitas partes) + πολυτρόπως (muitas formas). ἐλάλησεν = aoristo (ação pontual no passado). Comparação: profetas (parcial, diversificado) vs. Filho (completo, definitivo). ἀπαύγασμα = "raio de luz" (emanação, não criação).',
    notas: [
      'πολυμερῶς = "de muitas partes" (revelação fragmentária)',
      'πολυτρόπως = "de muitas maneiras" (métodos diversos)',
      'ἀπαύγασμα = resplendor (luz refletida, não fonte)',
      'χαρακτήρ = marca gravada (carimbo, impressão exata)',
      'ὑπόστασις = substância, realidade (não aparência)',
    ],
  },
  {
    ref: 'Tg 2:14',
    livro: 'Tiago',
    traducao: 'Que aproveita, meus irmãos, se alguém diz que tem fé e não tem obras? Porventura aquela fé pode salvá-lo?',
    grego: 'τί τὸ ὄφελος, ἀδελφοί μου, ἐὰν πίστιν λέγῃ τις ἔχειν ἔργα δὲ μὴ ἔχῃ; μὴ δύναται ἡ πίστη σῶσαι αὐτόν;',
    diagrama: [
      {
        id: 'tg1',
        type: 'interjection',
        text: 'Que aproveita (τί τὸ ὄφελος)',
        greek: 'τί τὸ ὄφελος',
        strong: 'G3756',
      },
      {
        id: 'tg2',
        type: 'vocative',
        text: 'meus irmãos (ἀδελφοί μου)',
        greek: 'ἀδελφοί μου',
        strong: 'G80',
      },
      {
        id: 'tg3',
        type: 'complement',
        text: 'se alguém diz (ἐὰν λέγῃ τις)',
        greek: 'ἐὰν λέγῃ τις',
        strong: 'G3004',
        children: [
          { id: 'tg3a', type: 'object', text: 'que tem fé (πίστιν ἔχειν)', greek: 'πίστιν ἔχειν', strong: 'G4102' },
          { id: 'tg3b', type: 'adverbial', text: 'mas não tem obras (ἔργα δὲ μὴ ἔχῃ)', greek: 'ἔργα δὲ μὴ ἔχῃ', strong: 'G2041' },
        ],
      },
      {
        id: 'tg4',
        type: 'predicate',
        text: 'pode salvar (δύναται σῶσαι)',
        greek: 'δύναται σῶσαι',
        strong: 'G1410',
        children: [
          { id: 'tg4a', type: 'subject', text: 'aquela fé (ἡ πίστης)', greek: 'ἡ πίστης', strong: 'G4102' },
        ],
      },
    ],
    explicacao: 'Pergunta retórica: τί τὸ ὄφελος = "qual o proveito?" (nenhum). λέγῃ = presente subjuntivo de λέγω (dizer, afirmar). A fé sem obras é fé morta (Tg 2:17). Tiago não contradiz Paulo: fé viva produz obras.',
    notas: [
      'ὄφελος = proveito, vantagem (usado apenas aqui no NT)',
      'λέγῃ = presente subjuntivo = "diga, afirme" (contínuo)',
      'ἔργα = obras, ações (não obras da lei, mas frutos da fé)',
      'σῶσαι = aoristo infinitivo ativo de σώζω (salvar)',
      'Harmonia com Rm 3:28 + Tg 2:24: fé sem obras é morta',
    ],
  },
  {
    ref: '1 Pe 2:9',
    livro: '1 Pedro',
    traducao: 'Mas vocês são geração eleita, sacerdócio real, nação santa, povo adquirido por Deus, para anunciarem as virtudes daquele que os chamou das trevas para a sua admirável luz.',
    grego: 'ὑμεῖς δὲ γένος ἐκλεκτόν, βασίλειον ἱεράτευμα, ἔθνος ἅγιον, λαὸς εἰς περιποίησιν, ὅπως τὰς ἀρετὰς ἐγγείλησθε τοῦ ἐκ σκότους ὑμᾶς καλέσαντος εἰς τὸ θαυμαστὸν αὐτοῦ φῶς.',
    diagrama: [
      {
        id: 'pe1',
        type: 'subject',
        text: 'vocês (ὑμεῖς)',
        greek: 'ὑμεῖς',
        strong: 'G5213',
      },
      {
        id: 'pe2',
        type: 'complement',
        text: 'geração eleita (γένος ἐκλεκτόν)',
        greek: 'γένος ἐκλεκτόν',
        strong: 'G1085',
      },
      {
        id: 'pe3',
        type: 'complement',
        text: 'sacerdócio real (βασίλειον ἱεράτευμα)',
        greek: 'βασίλειον ἱεράτευμα',
        strong: 'G902',
      },
      {
        id: 'pe4',
        type: 'complement',
        text: 'nação santa (ἔθνος ἅγιον)',
        greek: 'ἔθνος ἅγιον',
        strong: 'G1484',
      },
      {
        id: 'pe5',
        type: 'complement',
        text: 'povo adquirido (λαὸς εἰς περιποίησιν)',
        greek: 'λαὸς εἰς περιποίησιν',
        strong: 'G2992',
      },
      {
        id: 'pe6',
        type: 'predicate',
        text: 'anunciem (ἐγγείλησθε)',
        greek: 'ἐγγείλησθε',
        strong: 'G1861',
        children: [
          { id: 'pe6a', type: 'object', text: 'as virtudes (τὰς ἀρετάς)', greek: 'τὰς ἀρετάς', strong: 'G703' },
        ],
      },
    ],
    explicacao: 'Títulos covenantais de Êx 19:6 aplicados à igreja. Quatro frases em paralelo: γένος (raça), ἱεράτευμα (sacerdócio), ἔθνos (nação), λαός (povo). O purpose é missional: "para anunciarem". ἀρετάς = "virtudes, excellências" (não apenas morais).',
    notas: [
      'γένος = raça, linhagem (descendência espiritual)',
      'βασίλειον = real, rei (particípio de βασιλεύω)',
      'ἱεράτευμα = sacerdócio (coletivo, não individual)',
      'περιποίησις = posse, propriedade (compra de redenção)',
      'Ref: Êx 19:6 — "reino de sacerdotes"',
    ],
  },
  {
    ref: '2 Tm 3:16',
    livro: '2 Timóteo',
    traducao: 'Toda Escritura é inspirada por Deus e útil para ensinar, para repreender, para corrigir, para instruir em justiça.',
    grego: 'πᾶσα γραφὴ θεόπνευστος καὶ ὠφέλιμος πρὸς διδασκαλίαν, πρὸς ἔλεγχον, πρὸς ἐπανόρθωσιν, πρὸς παιδείαν τὴν ἐν δικαιοσύνῃ.',
    diagrama: [
      {
        id: 'tm1',
        type: 'subject',
        text: 'Toda Escritura (πᾶσα γραφή)',
        greek: 'πᾶσα γραφή',
        strong: 'G1124',
      },
      {
        id: 'tm2',
        type: 'complement',
        text: 'inspirada por Deus (θεόπνευστος)',
        greek: 'θεόπνευστος',
        strong: 'G2315',
      },
      {
        id: 'tm3',
        type: 'complement',
        text: 'útil (ὠφέλιμος)',
        greek: 'ὠφέλιμος',
        strong: 'G5624',
      },
      {
        id: 'tm4',
        type: 'adverbial',
        text: 'para ensinar (πρὸς διδασκαλίαν)',
        greek: 'πρὸς διδασκαλίαν',
        strong: 'G1319',
      },
      {
        id: 'tm5',
        type: 'adverbial',
        text: 'para repreender (πρὸς ἔλεγχον)',
        greek: 'πρὸς ἔλεγχον',
        strong: 'G1650',
      },
      {
        id: 'tm6',
        type: 'adverbial',
        text: 'para corrigir (πρὸς ἐπανόρθωσιν)',
        greek: 'πρὸς ἐπανόρθωσιν',
        strong: 'G1882',
      },
      {
        id: 'tm7',
        type: 'adverbial',
        text: 'para instruir (πρὸς παιδείαν)',
        greek: 'πρὸς παιδείαν',
        strong: 'G3809',
      },
    ],
    explicacao: 'Declaração da inspiração bíblica. θεόπνευστος = composto: θεός (Deus) + πνέω (respirar) = "respirada por Deus". πᾶσα = "toda" (cada parte). Quatro finalidades: (1) didática, (2) polêmica, (3) corretiva, (4) educativa.',
    notas: [
      'θεόπνευστος = "divinamente inspirada" (único uso no NT)',
      'γραφή = escrita (artigo definido: "a Escritura" = Bíblia)',
      'ὠφέλιμος = útil, proveitoso (de ὠφελέω = ser de proveito)',
      'ἐπανόρθωσις = correção, restauração (ortho = reto)',
      'παιδεία = educação, disciplina (criança → maturidade)',
    ],
  },
  {
    ref: 'Ap 21:4',
    livro: 'Apocalipse',
    traducao: 'E enxugará toda lágrima dos seus olhos, e a morte não haverá mais, nem haverá luto, nem dor, nem clamor, porque as primeiras coisas passaram.',
    grego: 'ἐξαλείψει πᾶν δάκρυον ἐκ τῶν ὀφθαλμῶν αὐτῶν, καὶ ὁ θάνατος οὐκ ἔσται ἔτι οὔτε πένθος οὔτε κραυγὴ οὔτε ὠδίν, ὅτι τὰ πρῶτα ἀπῆλθεν.',
    diagrama: [
      {
        id: 'ap21-1',
        type: 'subject',
        text: 'Deus (ele — sujeito implícito)',
        greek: '(αὐτός)',
        strong: 'G846',
      },
      {
        id: 'ap21-2',
        type: 'predicate',
        text: 'enxugará (ἐξαλείψει)',
        greek: 'ἐξαλείψει',
        strong: 'G1813',
        children: [
          { id: 'ap21-2a', type: 'object', text: 'toda lágrima (πᾶν δάκρυον)', greek: 'πᾶν δάκρυον', strong: 'G1144' },
          { id: 'ap21-2b', type: 'adverbial', text: 'dos olhos deles (ἐκ τῶν ὀφθαλμῶν αὐτῶν)', greek: 'ἐκ τῶν ὀφθαλμῶν αὐτῶν', strong: 'G3788' },
        ],
      },
      {
        id: 'ap21-3',
        type: 'predicate',
        text: 'não haverá (οὐκ ἔσται)',
        greek: 'οὐκ ἔσται',
        strong: 'G3756',
        children: [
          { id: 'ap21-3a', type: 'object', text: 'morte (θάνατος)', greek: 'θάνατος', strong: 'G2288' },
          { id: 'ap21-3b', type: 'object', text: 'luto (πένθος)', greek: 'πένθος', strong: 'G3997' },
          { id: 'ap21-3c', type: 'object', text: 'dor (ὠδίν)', greek: 'ὠδίν', strong: 'G5604' },
          { id: 'ap21-3d', type: 'object', text: 'clamor (κραυγή)', greek: 'κραυγή', strong: 'G2906' },
        ],
      },
      {
        id: 'ap21-4',
        type: 'adverbial',
        text: 'porque (ὅτι)',
        greek: 'ὅτι',
        strong: 'G3754',
        children: [
          { id: 'ap21-4a', type: 'subject', text: 'as primeiras coisas (τὰ πρῶτα)', greek: 'τὰ πρῶτα', strong: 'G4413' },
          { id: 'ap21-4b', type: 'predicate', text: 'passaram (ἀπῆλθεν)', greek: 'ἀπῆλθεν', strong: 'G565' },
        ],
      },
    ],
    explicacao: 'Promessa escatológica final. ἐξαλείψει = futuro indicativo ativo de ἐξαλείφω (apagar, enxugar completamente). Quatro negações: morte, luto, dor, clamor. Causa: τὰ πρῶτα ἀπῆλθεν = "as primeiras coisas passaram" (aoristo = já realizado no decreto divino).',
    notas: [
      'ἐξαλείψει = apagar completamente (ἐξ intensivo)',
      'δάκρυον = lágrima (singular coletivo)',
      'ὠδίν = dor de parto (metáfora de sofrimento)',
      'ἀπῆλθεν = aoristo indicativo ativo de ἀπέρχομαι (passar, ir embora)',
      'Citação de Is 25:8 + 25:7',
    ],
  },
  {
    ref: 'Rm 8:28',
    livro: 'Romanos',
    traducao: 'E sabemos que todas as coisas contribuem juntamente para o bem daqueles que amam a Deus.',
    grego: 'οίδαμεν δε ότι τοίς αγαπωσιν τόν θεόν πάντα συνεργεί είς αγαθόν.',
    diagrama: [
      { id: 'rm8-1', type: 'subject', text: 'nos', greek: 'ἡμεης', strong: 'G2249' },
      { id: 'rm8-2', type: 'predicate', text: 'sabemos', greek: 'οίδαμεν', strong: 'G1492' },
      { id: 'rm8-3', type: 'predicate', text: 'contribuem', greek: 'συνεργεί', strong: 'G4903', children: [
        { id: 'rm8-4a', type: 'adverbial', text: 'para o bem', greek: 'είς αγαθόν', strong: 'G18' },
        { id: 'rm8-4b', type: 'adverbial', text: 'dos que amam a Deus', greek: 'τοίς αγαπωσιν τόν θεόν', strong: 'G25' },
      ] },
    ],
    explicacao: 'Providencia divina.',
    notas: [
      'οίδαμεν = perfeito de είδοι (saber por experiencia)',
      'συνεργεί = trabalha junto',
      'πρόθεσις = proposito, decreto',
    ],
  },
  {
    ref: 'Gl 5:22-23',
    livro: 'Galatas',
    traducao: 'Mas o fruto do Espirito e: amor, gozo, paz, longanimidade, benignidade, bondade, fe, mansidao, temperanca.',
    grego: 'ὁ δέ καρπός τού πνεύματος έστιν αγάπη χαρά ειρήνη μακροθυμία χρηστότης αγαθωσύνη πίστις πραύτης ἐγκράτεια· κατά των τοιούτων ούκ ἐστιν νόμος.',
    diagrama: [
      { id: 'gl5-1', type: 'subject', text: 'o fruto do Espirito', greek: 'ὁ καρπός τού πνεύματος', strong: 'G2590' },
      { id: 'gl5-2', type: 'complement', text: 'amor', greek: 'αγάπη', strong: 'G26' },
      { id: 'gl5-3', type: 'complement', text: 'gozo', greek: 'χαρά', strong: 'G5479' },
      { id: 'gl5-4', type: 'complement', text: 'paz', greek: 'ειρήνη', strong: 'G1515' },
      { id: 'gl5-5', type: 'complement', text: 'longanimidade', greek: 'μακροθυμία', strong: 'G3116' },
      { id: 'gl5-6', type: 'complement', text: 'bondade', greek: 'χρηστότης', strong: 'G5544' },
      { id: 'gl5-7', type: 'complement', text: 'benignidade', greek: 'αγαθωσύνη', strong: 'G19' },
      { id: 'gl5-8', type: 'complement', text: 'fe', greek: 'πίστις', strong: 'G4102' },
      { id: 'gl5-9', type: 'complement', text: 'mansidao', greek: 'πραύτης', strong: 'G4240' },
      { id: 'gl5-10', type: 'complement', text: 'temperanca', greek: 'ἐγκράτεια', strong: 'G1468' },
    ],
    explicacao: 'Nove virtudes do Espirito Santo como fruto.',
    notas: [
      'καρπός = fruto (singular: unidade)',
      'μακροθυμία = paciencia com pessoas',
      'πραύτης = mansidao (forca sob controle)',
      'ἐγκράυτεια = dominio proprio',
    ],
  },];

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
