'use client';

import { useState } from 'react';
import { BookOpen, ChevronDown, ChevronRight, Info, Search } from 'lucide-react';

interface DiagramNode {
  id: string;
  type: 'subject' | 'predicate' | 'object' | 'modifier' | 'conjunction' | 'complement' | 'adverbial' | 'vocative' | 'interjection' | 'dative' | 'genitive' | 'negation';
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
    ref: "Gn 1:1",
    livro: "Gênesis",
    traducao: "No princípio Deus criou os céus e a terra.",
    grego: "בְּרֵאשִׁית בָּרָא אֱלֹהִים אֵת הַשָּׁמַיִם וְאֵת הָאָרֶץ.",
    diagrama: [
      {id: "gn1-1", type: "adverbial", text: "No princípio (בְּרֵאשִׁית)", greek: "בְּרֵאשִׁית", strong: "H7225"},
      {id: "gn1-2", type: "subject", text: "Deus (אֱלֹהִים)", greek: "אֱלֹהִים", strong: "H430"},
      {id: "gn1-3", type: "predicate", text: "criou (בָּרָא)", greek: "בָּרָא", strong: "H1254", children: [
        {id: "gn1-3a", type: "object", text: "os céus (הַשָּׁמַיִם)", greek: "הַשָּׁמַיִם", strong: "H8064"},
        {id: "gn1-3b", type: "object", text: "a terra (הָאָרֶץ)", greek: "הָאָרֶץ", strong: "H776"}
      ]}
    ],
    explicacao: "Frase adverbial temporal seguida de sujeito-predicado-objeto. בָּרָא (bara) é um verbo exclusivo divino — só Deus como sujeito. Indica criação ex nihilo. אֱלֹהִים é plural majestático, mas o verbo é singular.",
    notas: ["בְּרֵאשִׁית = construção com bet consecutivo + reshit (primeiro)", "בָּרָא = aoristo semítico, criação ex nihilo (exclusivo de Deus)", "אֵת = partícula de objeto direto (não traduzida)", "הַשָּׁמַיִם = plural majestático (céus = três céus em conceito semítico)"]
  }
,
  {
    ref: "Gn 1:26-27",
    livro: "Gênesis",
    traducao: "Então Deus disse: Façamos o homem à nossa imagem, conforme a nossa semelhança. E Deus criou o homem à sua imagem; macho e fêmea os criou.",
    grego: "וַיֹּאמֶר אֱלֹהִים נַֽעֲשֶׂ֥ה אָדָ֛ם בְּצַלְמֵ֖נוּ כִּדְמוּתֵ֑נוּ. וַיִּבְרָ֣א אֱלֹהִ֤ים אֶת־הָֽאָדָם֙ בְּצַלְמ֔וֹ זָכָ֥ר וּנְקֵבָ֖ה בָּרָ֥א אֹתָֽם׃",
    diagrama: [
      {id: "gn126-1", type: "vocative", text: "Deus (אֱלֹהִים)", greek: "אֱלֹהִים", strong: "H430"},
      {id: "gn126-2", type: "predicate", text: "façamos (נַֽעֲשֶׂה)", greek: "נַֽעֲשֶׂה", strong: "H6213", children: [
        {id: "gn126-2a", type: "object", text: "o homem (אָדָם)", greek: "אָדָם", strong: "H120"},
        {id: "gn126-2b", type: "complement", text: "à nossa imagem (בְּצַלְמֵנוּ)", greek: "בְּצַלְמֵנוּ", strong: "H6754"}
      ]},
      {id: "gn126-3", type: "predicate", text: "criou (וַיִּבְרָא)", greek: "וַיִּבְרָא", strong: "H1254", children: [
        {id: "gn126-3a", type: "object", text: "o homem (הָאָדָם)", greek: "הָאָדָם", strong: "H120"},
        {id: "gn126-3b", type: "complement", text: "à sua imagem (בְּצַלְמוֹ)", greek: "בְּצַלְמוֹ", strong: "H6754"}
      ]}
    ],
    explicacao: "O plural נַֽעֲשֶׂה (\"façamos\") é interpretado como plural majestático ou conselho divino. צֶלֶם = imagem, representação; דְּמוּת = semelhança. A imagem de Deus não é física, mas funcional: domínio e relacionamento.",
    notas: ["נַֽעֲשֶׂה = imperfecto plural Qal de עָשָׂה (fazer)", "צֶלֶם = imagem, estátua, representação", "כִּדְמוּתֵנוּ = conforme a nossa semelhança", "zakhar u-neqebah = macho e fêmea"]
  }
,
  {
    ref: "Gn 3:15",
    livro: "Gênesis",
    traducao: "Porei inimizade entre ti e a mulher, entre a tua semente e a sua semente; este te ferirá a cabeça, e tu lhe ferirás o calcanhar.",
    grego: "אֵיבָ֣ה ׀ אָשִׁ֗ית בֵּֽינְךָ֙ וּבֵ֣ין הָֽאִשָּׁ֔ה. ה֚וּא יְשׁוּפְךָ֣ רֹ֔אשׁ וְאַתָּ֖ה תְּשׁוּפֶ֥נּוּ עָקֵֽב׃",
    diagrama: [
      {id: "gn315-1", type: "predicate", text: "porei (אָשִׁית)", greek: "אָשִׁית", strong: "H7760", children: [
        {id: "gn315-1a", type: "object", text: "inimizade (אֵיבָה)", greek: "אֵיבָה", strong: "H342"},
        {id: "gn315-1b", type: "adverbial", text: "entre ti e a mulher", greek: "בֵּינְךָ וּבֵין הָאִשָּׁה", strong: "H802"}
      ]},
      {id: "gn315-2", type: "predicate", text: "ferirá (יְשׁוּפְךָ)", greek: "יְשׁוּפְךָ", strong: "H7779", children: [
        {id: "gn315-2a", type: "object", text: "a cabeça (רֹאשׁ)", greek: "רֹאשׁ", strong: "H7218"}
      ]},
      {id: "gn315-3", type: "predicate", text: "ferirás (תְּשׁוּפֶנּוּ)", greek: "תְּשׁוּפֶנּוּ", strong: "H7779", children: [
        {id: "gn315-3a", type: "object", text: "o calcanhar (עָקֵב)", greek: "עָקֵב", strong: "H6119"}
      ]}
    ],
    explicacao: "Protoevangelium — primeira promessa messiânica. שׁוּף (shuph) = esmagar/ferir. A semente da mulher (singular messiânico) ferirá a cabeça (morte) da serpente; a serpente ferirá o calcanhar (mortalidade temporária).",
    notas: ["אֵיבָה = inimizade, ódio (raiz: אָיב = odiar)", "זֶרַע = semente (singular coletivo, messiânico)", "יְשׁוּפוּךָ = imperfecto Hiphil de שׁוּף (esmagar)", "עָקֵב = calcanhar (ferimento não-fatal vs. cabeça = fatal)"]
  }
,
  {
    ref: "Gn 12:1-3",
    livro: "Gênesis",
    traducao: "O SENHOR disse a Abram: Vai-te da tua terra, da tua parentela e da casa de teu pai, para a terra que eu te mostrarei. E far-te-ei uma grande nação, e abençoar-te-ei.",
    grego: "וַיֹּ֤אמֶר יְהוָה֙ אֶל־אַבְרָ֔ם לֶךׇ־לְךָ֛ מֵאַרְצְךָ֥ וּמִמּוֹלַדְתְּךָ֖ וּמִבֵּ֣ית אָבִ֑יךָ אֶל־הָאָ֖רֶץ אֲשֶׁ֥ר אַרְאֶֽךָּ׃",
    diagrama: [
      {id: "gn12-1", type: "vocative", text: "O SENHOR (יְהוָה)", greek: "יְהוָה", strong: "H3068"},
      {id: "gn12-2", type: "predicate", text: "vai-te (לֶךׇ־לְךָ)", greek: "לֶךׇ־לְךָ", strong: "H1981", children: [
        {id: "gn12-2a", type: "adverbial", text: "da tua terra (מֵאַרְצְךָ)", greek: "מֵאַרְצְךָ", strong: "H776"},
        {id: "gn12-2b", type: "adverbial", text: "da tua parentela", greek: "וּמִמּוֹלַדְתְּךָ", strong: "H4138"}
      ]},
      {id: "gn12-3", type: "predicate", text: "farei (אֶעֶשְׂךָ)", greek: "אֶעֶשְׂךָ", strong: "H6213", children: [
        {id: "gn12-3a", type: "object", text: "uma grande nação (גּוֹי גָּדוֹל)", greek: "גּוֹי גָּדוֹל", strong: "H1471"}
      ]}
    ],
    explicacao: "Chamado de Abraão com sete promessas: (1) grande nação, (2) bênção, (3) grande nome, (4) ser bênção, (5) bênção aos abençoados, (6) maldição aos maldizentes, (7) todas as famílias benditas.",
    notas: ["לֶךׇ־לְךָ = vai para ti (duplo acusativo)", "מוֹלֶדֶת = nascimento, parentela, clã", "גּוֹי = nação (povo politicamente organizado)", "אֲאֹר = imperfecto Hiphil de אָרַר (amaldiçoar)"]
  }
,
  {
    ref: "Gn 15:6",
    livro: "Gênesis",
    traducao: "E creu Abram no SENHOR, e isso lhe foi imputado por justiça.",
    grego: "וְהֶֽאֱמִ֖ן בַּֽיהוָ֑ה וַיַּחְשְׁבֶ֥הָ לּ֖וֹ צְדָקָֽה׃",
    diagrama: [
      {id: "gn156-1", type: "subject", text: "Abram (אַבְרָם)", greek: "אַבְרָם", strong: "H87"},
      {id: "gn156-2", type: "predicate", text: "creu (הֶאֱמִן)", greek: "הֶאֱמִן", strong: "H539", children: [
        {id: "gn156-2a", type: "adverbial", text: "no SENHOR (בַּיהוָה)", greek: "בַּיהוָה", strong: "H3068"}
      ]},
      {id: "gn156-3", type: "predicate", text: "imputou (יַחְשְׁבֶהָ)", greek: "יַחְשְׁבֶהָ", strong: "H2803", children: [
        {id: "gn156-3a", type: "complement", text: "por justiça (צְדָקָה)", greek: "צְדָקָה", strong: "H6666"}
      ]}
    ],
    explicacao: "Versículo central da justificação pela fé. הֶאֱמִן = Hiphil de אָמַן (crer). יָחַשֵׁב = considerar, imputar. A fé de Abraão foi creditada como justiça. Citações: Rm 4:3, Gl 3:6, Tg 2:23.",
    notas: ["הֶאֱמִן = Hiphil de אָמַן (ser firme, crer)", "יָחַשֵׁב = contar, imputar (contabilidade)", "צְדָקָה = justiça, retidão (status covenantal)", "Fundamento: Rm 4:3, Gl 3:6; Tg 2:23"]
  }
,
  {
    ref: "Ex 3:14",
    livro: "Êxodo",
    traducao: "Deus disse a Moisés: EU SOU O QUE SOU. Assim dirás aos filhos de Israel: EU SOU me enviou a vocês.",
    grego: "וַיֹּ֤אמֶר אֱלֹהִים֙ אֶל־מֹשֶׁ֔ה אֶהְיֶ֖ה אֲשֶׁ֣ר אֶהְיֶ֑ה. אֶהְיֶ֖ה שְׁלָחַ֥נִי אֲלֵיכֶֽם׃",
    diagrama: [
      {id: "ex3-1", type: "vocative", text: "Deus (אֱלֹהִים)", greek: "אֱלֹהִים", strong: "H430"},
      {id: "ex3-2", type: "subject", text: "EU SOU (אֶהְיֶה)", greek: "אֶהְיֶה", strong: "H1961"},
      {id: "ex3-3", type: "complement", text: "O QUE SOU (אֲשֶׁר אֶהְיֶה)", greek: "אֲשֶׁר אֶהְיֶה", strong: "H834"},
      {id: "ex3-4", type: "predicate", text: "enviou (שְׁלָחַנִי)", greek: "שְׁלָחַנִי", strong: "H7971", children: [
        {id: "ex3-4a", type: "subject", text: "EU SOU (אֶהְיֶה)", greek: "אֶהְיֶה", strong: "H1961"},
        {id: "ex3-4b", type: "adverbial", text: "a vocês (אֲלֵיכֶם)", greek: "אֲלֵיכֶם", strong: "H413"}
      ]}
    ],
    explicacao: "Nome revelado: אֶהְיֶה (ehyeh) = imperfeito de הָיָה (ser). Ação contínua: \"Eu Sou\" ou \"Eu Serei\". A ambiguidade é intencional — Deus é autossuficiente e soberano. LXX: ἐγώ εἰμι.",
    notas: ["אֶהְיֶה = imperfeito Qal de הָיָה (ser)", "אֲשֶׁר = pronome relativo (que, o que)", "LXX: ἐγώ εἰμι (eu sou)", "Título: autoexistência, imutabilidade, eternidade"]
  }
,
  {
    ref: "Ex 20:1-3",
    livro: "Êxodo",
    traducao: "Deus proferiu todas estas palavras: Sou o SENHOR teu Deus, que te tirei do Egito. Não terás outros deuses diante de mim.",
    grego: "אָנֹכִ֤י יְהוָה֙ אֱלֹהֶ֔יךָ אֲשֶׁ֧ר הוֹצֵאתִ֛יךָ מֵאֶ֥רֶץ מִצְרַ֖יִם מִבֵּ֥ית עֲבָדִֽים׃ לֹֽה־יִֽהְיֶ֥ה לְךָ֛ אֱלֹהִ֥ים אֲחֵרִ֖ים עַל־פָּנָֽיַם׃",
    diagrama: [
      {id: "ex20-1", type: "vocative", text: "Eu (אָנֹכִי)", greek: "אָנֹכִי", strong: "H595"},
      {id: "ex20-2", type: "complement", text: "o SENHOR teu Deus (יְהוָה אֱלֹהֶיךָ)", greek: "יְהוָה אֱלֹהֶיךָ", strong: "H3068"},
      {id: "ex20-3", type: "predicate", text: "tirei (הוֹצֵאתִיךָ)", greek: "הוֹצֵאתִיךָ", strong: "H3318", children: [
        {id: "ex20-3a", type: "adverbial", text: "da terra do Egito (מֵאֶרֶץ מִצְרַיִם)", greek: "מֵאֶרֶץ מִצְרַיִם", strong: "H4714"}
      ]},
      {id: "ex20-4", type: "predicate", text: "não terás (לֹא יִהְיֶה)", greek: "לֹא יִהְיֶה", strong: "H3808", children: [
        {id: "ex20-4a", type: "object", text: "outros deuses (אֱלֹהִים אֲחֵרִים)", greek: "אֱלֹהִים אֲחֵרִים", strong: "H430"}
      ]}
    ],
    explicacao: "Préâmbulo dos Dez Mandamentos. אָנֹכִי = pronome enfático (\"Eu mesmo\"). A identidade divina é fundamento da obediência. A redenção do Egito é base da obrigação moral.",
    notas: ["אָנֹכִי = pronome 1ª pessoa (ênfase)", "עֲבָדִים = servos, escravos", "אֱלֹהִים אֲחֵרִים = deuses outros", "Decálogo: Sinaitico vs. Deuteronômico (Dt 5)"]
  }
,
  {
    ref: "Dt 6:4-5",
    livro: "Deuteronômio",
    traducao: "Ouve, Israel: O SENHOR nosso Deus é o único SENHOR. Amarás o SENHOR teu Deus de todo o teu coração, de toda a tua alma e de todo o teu poder.",
    grego: "שְׁמַ֣ע יִשְׂרָאֵ֔ל יְהוָ֥ה אֱלֹהֵ֖ינוּ יְהוָ֥ה אֶחָֽד׃ וְאָהַבְתָּ֖ אֵ֣ת יְהוָ֣ה אֱלֹהֶ֑יךָ בְּכָל־לְבָבְךָ֥ וּבְכָל־נַפְשְׁךָ֖ וּבְכָל־מְאֹדֶֽךָ׃",
    diagrama: [
      {id: "dt6-1", type: "interjection", text: "Ouve (שְׁמַע)", greek: "שְׁמַע", strong: "H8085"},
      {id: "dt6-2", type: "vocative", text: "Israel (יִשְׂרָאֵל)", greek: "יִשְׂרָאֵל", strong: "H3478"},
      {id: "dt6-3", type: "subject", text: "O SENHOR (יְהוָה)", greek: "יְהוָה", strong: "H3068"},
      {id: "dt6-4", type: "complement", text: "é o único SENHOR (אֶחָד)", greek: "אֶחָד", strong: "H259"},
      {id: "dt6-5", type: "predicate", text: "amarás (וְאָהַבְתָּ)", greek: "וְאָהַבְתָּ", strong: "H157", children: [
        {id: "dt6-5a", type: "object", text: "o SENHOR teu Deus", greek: "אֵת יְהוָה אֱלֹהֶיךָ", strong: "H3068"},
        {id: "dt6-5b", type: "adverbial", text: "de todo o coração", greek: "בְּכָל־לְבָבְךָ", strong: "H3824"},
        {id: "dt6-5c", type: "adverbial", text: "de toda a alma", greek: "וּבְכָל־נַפְשְׁךָ", strong: "H5315"},
        {id: "dt6-5d", type: "adverbial", text: "de todo o poder", greek: "וּבְכָל־מְאֹדֶךָ", strong: "H3966"}
      ]}
    ],
    explicacao: "Shemá Israel — monoteísmo bíblico. שְׁמַע = ouvir + obedecer. אֶחָד = um (numeral). Três aspectos: לֵב (decisão), נֶפֶשׁ (ser), מְאֹד (força).",
    notas: ["שְׁמַע = imperativo de שָׁמַע (ouvir com obediência)", "יְהוָה = tetragrama sagrado (YHWH)", "אֶחָד = um (unidade, não exclusividade)", "Recitado 2x ao dia na tradição judaica"]
  }
,
  {
    ref: "1 Sm 16:7",
    livro: "1 Samuel",
    traducao: "O SENHOR não vê como vê o homem; porque o homem vê o que está diante dos seus olhos, mas o SENHOR vê o coração.",
    grego: "כִּ֤י לֹא֙ כַּאֲשֶׁ֣ר יִרְאֶ֣ה הָאָדָ֔ם יִרְאֶ֖ה הָֽיהוָ֑ה כִּ֤י הָאָדָם֙ יִרְאֶ֣ה לַעֵינַ֔יִם וַיהוָ֖ה יִרְאֶ֥ה לַלֵּֽבָב׃",
    diagrama: [
      {id: "1sm16-1", type: "adverbial", text: "o homem vê (הָאָדָם יִרְאֶה)", greek: "הָאָדָם יִרְאֶה", strong: "H120", children: [
        {id: "1sm16-1a", type: "adverbial", text: "diante dos olhos (לַעֵינַיִם)", greek: "לַעֵינַיִם", strong: "H5869"}
      ]},
      {id: "1sm16-2", type: "adverbial", text: "o SENHOR vê (יְהוָה יִרְאֶה)", greek: "יְהוָה יִרְאֶה", strong: "H3068", children: [
        {id: "1sm16-2a", type: "adverbial", text: "o coração (לַלֵּבָב)", greek: "לַלֵּבָב", strong: "H3824"}
      ]}
    ],
    explicacao: "Contraste antitético: humano vs. divino. יִרְאֶה (ver) em dois sentidos: superficial (olhos) vs. profundo (coração). לֵבָב = centro da decisão, não apenas emoção.",
    notas: ["תַּבִּט = imperativo de נָבַט (olhar)", "מַרְאֶה = aparência", "גֹּבַהּ קֹמָה = altura da estatura", "לֵבָב = coração (centro da decisão)"]
  }
,
  {
    ref: "1 Sm 17:45-47",
    livro: "1 Samuel",
    traducao: "David disse: Tu vens com espada e lança; eu venho em nome do SENHOR dos Exércitos. E toda a terra saberá que há Deus em Israel.",
    grego: "וַיֹּ֤אמֶר דָּוִד֙ אֶל־הַפְּלִשְׁתִּ֔י בְּשֵׁ֣ם יְהוָ֣ה צְבָא֔וֹת. וְיָדְעָ֥ה כָל־הָאָ֖רֶץ כִּ֥י יֵֽשׁ אֱלֹהִ֖ים לְיִשְׂרָאֵֽל׃",
    diagrama: [
      {id: "1sm17-1", type: "adverbial", text: "em nome do SENHOR (בְּשֵׁם יְהוָה)", greek: "בְּשֵׁם יְהוָה", strong: "H8034", children: [
        {id: "1sm17-1a", type: "complement", text: "SENHOR dos Exércitos (יְהוָה צְבָאוֹת)", greek: "יְהוָה צְבָאוֹת", strong: "H6635"}
      ]},
      {id: "1sm17-2", type: "predicate", text: "saberá (וְיָדְעָה)", greek: "וְיָדְעָה", strong: "H3045", children: [
        {id: "1sm17-2a", type: "subject", text: "toda a terra", greek: "כָּל־הָאָרֶץ", strong: "H776"},
        {id: "1sm17-2b", type: "complement", text: "que há Deus em Israel", greek: "כִּי יֵשׁ אֱלֹהִים", strong: "H430"}
      ]}
    ],
    explicacao: "De fé antes do combate. יְהוָה צְבָאוֹת = SENHOR dos Exércitos. David substitui armas humanas pelo שֵׁם (nome/poder) de YHWH. O resultado é teofania.",
    notas: ["צְבָאוֹת = exércitos (título celestial)", "בְּשֵׁם = em nome de (identidade/autoridade)", "חֵרַפְתָּ = desafiaste (de חָרַף)", "fulfillment: vitória de Davi sobre Golias"]
  }
,
  {
    ref: "2 Sm 7:12-16",
    livro: "2 Samuel",
    traducao: "Eu levantarei a tua semente e estabelecerei o seu reino. Ele edificará uma casa ao meu nome. Eu serei o seu pai, e ele será o meu filho.",
    grego: "וַהֲקִימֹתִי אֶת־זַרְעֲךָ֣ אַחֲרֶ֔יךָ. וַהֲכִינֹ֥תִי אֶת־מַמְלַכְתּֽוֹ׃ אֲנִ֤י אֶהְיֶ֣ה לּ֔וֹ לְאָ֖ב וְה֣וּא יִֽהְיֶה־לִּ֑י לְבֵּ֗ן.",
    diagrama: [
      {id: "2sm7-1", type: "predicate", text: "levantarei (וַהֲקִימֹתִי)", greek: "וַהֲקִימֹתִי", strong: "H6965", children: [
        {id: "2sm7-1a", type: "object", text: "a tua semente (זַרְעֲךָ)", greek: "זַרְעֲךָ", strong: "H2233"}
      ]},
      {id: "2sm7-2", type: "predicate", text: "edificará (יִבְנֶה)", greek: "יִבְנֶה", strong: "H1129", children: [
        {id: "2sm7-2a", type: "object", text: "uma casa (בַּיִת)", greek: "בַּיִת", strong: "H1004"}
      ]},
      {id: "2sm7-3", type: "predicate", text: "serei pai (אֶהְיֶה)", greek: "אֶהְיֶה", strong: "H1961", children: [
        {id: "2sm7-3a", type: "complement", text: "o seu pai", greek: "לְאָב", strong: "H1"}
      ]}
    ],
    explicacao: "Aliança Davídica. Duas casas: semente edifica casa (templo) e Deus estabelece dinastia eterna. Incondicional para a linhagem, condicional para reis individuais (v.14-15).",
    notas: ["זֶרַע = semente (descendência)", "בַּיִת = casa (templo + dinastia)", "fulfillment: Salomão → Cristo (reino eterno)", "מַמְלָכָה = reino, realeza"]
  }
,
  {
    ref: "Sl 1:1-6",
    livro: "Salmos",
    traducao: "Bem-aventurado o homem que não andou no conselho dos ímpios. Mas o seu prazer está na lei do SENHOR. Será como árvore plantada junto a correntes de água.",
    grego: "אַ֥שְּׁרֵי הָאִ֗ישׁ אֲשֶׁ֤ר לֹ֥א הָלַךְ֮ בַּֽעֲצַ֪ת רְשָׁעִ֥ים. כִּ֤י אִ֥ם בְּתוֹרַ֥ת יְהוָ֗ה חֶ֫פְצ֥וֹ. וְהָיָ֗ה כְּעֵ֣ץ שָֽׁתּוּל֮ עֲלֵ֪י פַ֫לְגֵ֥י מָ֡יִם.",
    diagrama: [
      {id: "sl1-1", type: "complement", text: "Bem-aventurado (אַשְּׁרֵי)", greek: "אַשְּׁרֵי", strong: "H835"},
      {id: "sl1-2", type: "subject", text: "o homem (הָאִישׁ)", greek: "הָאִישׁ", strong: "H376"},
      {id: "sl1-3", type: "predicate", text: "não andou (לֹא הָלַךְ)", greek: "לֹא הָלַךְ", strong: "H1981", children: [
        {id: "sl1-3a", type: "adverbial", text: "no conselho dos ímpios", greek: "בַּעֲצַת רְשָׁעִים", strong: "H6098"},
        {id: "sl1-3b", type: "adverbial", text: "no caminho dos pecadores", greek: "בְּדֶרֶךְ חַטָּאִים", strong: "H2396"}
      ]},
      {id: "sl1-4", type: "predicate", text: "será como árvore (כְּעֵץ)", greek: "כְּעֵץ", strong: "H6086", children: [
        {id: "sl1-4a", type: "complement", text: "plantada junto a águas", greek: "שָׁתּוּל עֲלֵי פַלְגֵי מָיִם", strong: "H5193"}
      ]}
    ],
    explicacao: "Salmo introdutório. Três negativos: não andou, não esteve, não se assentou. A lei é prazer (חֵפֶץ), não obrigação. A arvore = prosperidade contínua.",
    notas: ["אַשְּׁרֵי = feliz, abençoado", "הָלַךְ → עָמַד → יָשָׁב = andar → parar → sentar", "תּוֹרָה = instrução, lei", "פַּלְגֵי = correntes (água corrente = vida)"]
  }
,
  {
    ref: "Sl 22:1-31",
    livro: "Salmos",
    traducao: "Deus meu, Deus meu, por que me desamparaste? Eu sou verme, e não homem. Todos os que me veem zombam de mim. Mas tu és o que me tirou do ventre.",
    grego: "אֵ֣לִי אֵ֭לִי לְמָ֣ה עֲזַבְתָּ֑נִי. אֲנִ֣י תוֹלַ֣עַת וְלֹא־אִ֑ישׁ חֶרְפַּ֥ת אָדָ֝֗ם וּבְז֣וּי עָֽם׃",
    diagrama: [
      {id: "sl22-1", type: "vocative", text: "Deus meu (אֵלִי)", greek: "אֵלִי", strong: "H413"},
      {id: "sl22-2", type: "predicate", text: "desamparaste (עֲזַבְתָּנִי)", greek: "עֲזַבְתָּנִי", strong: "H5800"},
      {id: "sl22-3", type: "subject", text: "eu (אֲנִי)", greek: "אֲנִי", strong: "H589"},
      {id: "sl22-4", type: "complement", text: "verme, não homem (תוֹלַעַת וְלֹא אִישׁ)", greek: "תוֹלַעַת", strong: "H8438"},
      {id: "sl22-5", type: "complement", text: "opróbrio dos homens (חֶרְפַּת אָדָם)", greek: "חֶרְפַּת אָדָם", strong: "H2781"}
    ],
    explicacao: "Salmo messiânico citado na cruz (Mt 27:46). אֵלִי אֵלִי = clame duplo de agonía. תּוֹלַעַт = verme (corpo corrompido, baixeza extrema). Cumprimento literal em Mt 27:39-44.",
    notas: ["אֵלִי = meu Deus (de El = Deus, possesivo)", "עָזַב = abandonar, deixar", "תּוֹלַעַת = verme (degradação)", "Cumprimento: Mt 27:39-46"]
  }
,
  {
    ref: "Sl 23:1-6",
    livro: "Salmos",
    traducao: "O SENHOR é o meu pastor; nada me faltará. Para pastos verdes me fará deitar. A minha alma refaz; guia-me pelas veredas da justiça.",
    grego: "יְהוָ֥ה רֹ֝עִ֗י לֹ֣א אֶחְסָֽר׃ בִּנְא֣וֹת דֶּ֭שֶׁא יַרְבִּיצֵ֑נִי. נַפְשִׁ֥י יְשׁוֹבֵ֑ב יְנַהֲגֵ֥נִי בְמַעְגְּלֵי־צֶ֝֗דֶק לְמַ֣עַן שְׁמֽוֹ׃",
    diagrama: [
      {id: "sl23-1", type: "subject", text: "O SENHOR (יְהוָה)", greek: "יְהוָה", strong: "H3068"},
      {id: "sl23-2", type: "complement", text: "é o meu pastor (רֹעִי)", greek: "רֹעִי", strong: "H7462"},
      {id: "sl23-3", type: "predicate", text: "nada me faltará (לֹא אֶחְסָר)", greek: "לֹא אֶחְסָר", strong: "H2637"}
    ],
    explicacao: "Metáfora pastoral: יְהוָה = sujeito, רֹעִi = predicativo. לֹא אֶחְסָר usa imperfecto de חָסֵר (faltar), indicando provisão contínua.",
    notas: ["רֹעִי = particípio de רָעָה (apascentar)", "אֶחְסָר = imperfecto de חָסֵר (faltar)", "Metáfora covenantal (cf. Jr 23:1-4)", "Contexto: Davi, pastor rei"]
  }
,
  {
    ref: "Sl 51:1-17",
    livro: "Salmos",
    traducao: "Tem misericórdia de mim, ó Deus. Cria em mim um coração limpo, e renova em mim um espírito reto.",
    grego: "חָנֵּ֣נִי אֱלֹהִ֣ים כְּחַסְדֶּ֑ךָ. לֵ֣ב טָ֭הוֹר בְּרָא־לִ֣י אֱלֹהִ֑ים וְר֣וּחַ נָ֭כֹון חַדֵּ֥שׁ בְּקִרְבִּֽי׃",
    diagrama: [
      {id: "sl51-1", type: "predicate", text: "tem misericórdia (חָנֵּנִי)", greek: "חָנֵּנִי", strong: "H2603", children: [
        {id: "sl51-1a", type: "adverbial", text: "conforme a benignidade (כְּחַסְדֶּךָ)", greek: "כְּחַסְדֶּךָ", strong: "H2617"}
      ]},
      {id: "sl51-2", type: "predicate", text: "cria (בְּרָא)", greek: "בְּרָא", strong: "H1254", children: [
        {id: "sl51-2a", type: "object", text: "coração limpo (לֵב טָהוֹר)", greek: "לֵב טָהוֹר", strong: "H3824"}
      ]},
      {id: "sl51-3", type: "predicate", text: "renova (חַדֵּשׁ)", greek: "חַדֵּשׁ", strong: "H2318", children: [
        {id: "sl51-3a", type: "object", text: "espírito reto (רוּחַ נָכֹון)", greek: "רוּחַ נָכֹון", strong: "H7307"}
      ]}
    ],
    explicacao: "Salmo de penitência (após pecado com Bate-Seba). בְּרָא = criar (mesmo de Gn 1:1, criação nova). Pedido por transformação interior, não anulação do pecado.",
    notas: ["חָנֵּנִי = ter grça (de חָנַן)", "בְּרָא = criar (exclusivo divino)", "לֵב טָהוֹר = coração puro", "Contexto: 2 Sm 11-12"]
  }
,
  {
    ref: "Sl 95:1-11",
    livro: "Salmos",
    traducao: "Vinde, exultemos ao SENHOR. Porque o SENHOR é o grande Deus, o grande rei sobre todos os deuses.",
    grego: "לְּכ֣וּ נְ֭רַנְּנָה לַיהוָ֑ה. כִּ֤י אֵ֣ל גָּ֭דוֹל יְהוָ֑ה וּמֶ֖לֶךְ גָּד֣וֹל עַל־כָּל־אֱלֹהִֽים׃",
    diagrama: [
      {id: "sl95-1", type: "interjection", text: "vinde (לְּכוּ)", greek: "לְּכוּ", strong: "H3212"},
      {id: "sl95-2", type: "predicate", text: "exultemos (נְרַנְּנָה)", greek: "נְרַנְּנָה", strong: "H7442", children: [
        {id: "sl95-2a", type: "adverbial", text: "ao SENHOR (לַיהוָה)", greek: "לַיהוָה", strong: "H3068"}
      ]},
      {id: "sl95-3", type: "subject", text: "o SENHOR (יְהוָה)", greek: "יְהוָה", strong: "H3068"},
      {id: "sl95-4", type: "complement", text: "grande Deus (אֵל גָּדוֹל)", greek: "אֵל גָּדוֹל", strong: "H413"},
      {id: "sl95-5", type: "complement", text: "grande rei sobre todos os deuses", greek: "מֶלֶךְ גָּדוֹל עַל כָּל אֱלֹהִים", strong: "H4428"}
    ],
    explicacao: "Salmo litúrgico. Tres imperativos. El Gadol = Deus grande (força); Melekh Gadol = Rei grande (autoridade). Fórmula de soberania sobre todos os deuses.",
    notas: ["לְּכוּ = imperativo de halakh (ir)", "צּוּר = rocha (refúgio)", "אֵל = Deus (título de poder)", "Conteúdo: louvor + advertência (vv.7-11)"]
  }
,
  {
    ref: "Sl 110:1-7",
    livro: "Salmos",
    traducao: "O SENHOR disse ao meu Senhor: Senta-te à minha destra. O SENHOR estenderá o ceptro do teu poder desde Sião.",
    grego: "נְּא֥ם יְהוָ֗ה לַֽאדֹנִ֫י שֵׁ֥ב לִֽימִינִ֑י. מַטֵּה־עֹ֭ז יִשְׁלַ֣ח יְהוָ֑ה מִצִּ֥יּוֹן רֵ֝֗ד בְּקֶ֣רֶב אֹיְבֶֽיךָ׃",
    diagrama: [
      {id: "sl110-1", type: "vocative", text: "o meu Senhor (אֲדֹנִי)", greek: "אֲדֹנִי", strong: "H113"},
      {id: "sl110-2", type: "predicate", text: "senta-te (שֵׁב)", greek: "שֵׁב", strong: "H3427", children: [
        {id: "sl110-2a", type: "adverbial", text: "à minha destra (לִימִינִי)", greek: "לִימִינִי", strong: "H3225"}
      ]},
      {id: "sl110-3", type: "predicate", text: "estenderá (יִשְׁלַח)", greek: "יִשְׁלַח", strong: "H7971", children: [
        {id: "sl110-3a", type: "object", text: "ceptro de poder (מַטֵּה עֹז)", greek: "מַטֵּה עֹז", strong: "H4294"}
      ]}
    ],
    explicacao: "Salmo messiânico mais citado no NT. אֲדֹנִי = titulo messiânico. YHWH fala ao Mashiach e o exalta à destra. Tres temas: exaltação, sacerdócio (v.4), juízo.",
    notas: ["אָדוֹן = senhor (título de autoridade)", "לִימִינִי = à minha destra (honra/poder)", "מַטֵּה עֹז = ceptro de força", "Melquisedeque (v.4): Hb 7"]
  }
,
  {
    ref: "Sl 119:1-8",
    livro: "Salmos",
    traducao: "Bem-aventurados os inteiros no caminho, que andam na lei do SENHOR. Guardam os seus testemunhos, buscam-no de todo o coração.",
    grego: "אַ֥שְּׁרֵי תְמִימֵי־דָ֑רֶךְ הַ֝הֹלְכִ֗ים בְּתוֹרַ֥ת יְהוָֽה׃ אַֽשְׁרֵ֥י נוֹצְרֵ֗י עֵדֹתָ֥יו בְּכָל־לֵ֑ב.",
    diagrama: [
      {id: "sl119-1", type: "complement", text: "Bem-aventurados (אַשְּׁרֵי)", greek: "אַשְּׁרֵי", strong: "H835"},
      {id: "sl119-2", type: "subject", text: "os inteiros (תְּמִימֵי)", greek: "תְּמִימֵי", strong: "H8549"},
      {id: "sl119-3", type: "predicate", text: "andam (הַהֹלְכִים)", greek: "הַהֹלְכִים", strong: "H1981", children: [
        {id: "sl119-3a", type: "adverbial", text: "na lei do SENHOR", greek: "בְּתוֹרַת יְהוָה", strong: "H8451"}
      ]},
      {id: "sl119-4", type: "predicate", text: "guardam (נוֹצְרֵי)", greek: "נוֹצְרֵי", strong: "H5341", children: [
        {id: "sl119-4a", type: "object", text: "os testemunhos (עֵדֹתָיו)", greek: "עֵdֹתָיו", strong: "H5713"}
      ]}
    ],
    explicacao: "Inicio do mais longo salmo (222 versos), acróstico por alfabeto hebraico. תָּמִים = inteiro, completo. שׁמר = guardar, observar. Busca de kol lev (todo o coração).",
    notas: ["תְּמִימֵי = íntegros (de tamam)", "נוֹצְרֵי = guardando (de natsar)", "עֵדוּת = testemunho, mandamento", "Salmo acróstico: 22 seções × 8 versos"]
  }
,
  {
    ref: "Sl 139:1-18",
    livro: "Salmos",
    traducao: "SENHOR, tu me examinaste e me conheceste. Tu sabes quando me assento e quando me levanto. Todos os meus caminhos te são conhecidos.",
    grego: "יְ֭הוָה חֲקַרְתַּ֣נִי וַתֵּדָ֑עָנִי. אַתָּ֥ה יָ֝דַ֗עְתָּ שִּׁבְתִּ֥י וְקוּמִֽי׃",
    diagrama: [
      {id: "sl139-1", type: "vocative", text: "SENHOR (יְהוָה)", greek: "יְהוָה", strong: "H3068"},
      {id: "sl139-2", type: "predicate", text: "examinaste (חֲקַרְתַּנִי)", greek: "חֲקַרְתַּנִי", strong: "H2713"},
      {id: "sl139-3", type: "predicate", text: "conheceste (תֵּדָעָנִי)", greek: "תֵּדָעָנִי", strong: "H3045"},
      {id: "sl139-4", type: "predicate", text: "sabes (יָדַעְתָּ)", greek: "יָדַעְתָּ", strong: "H3045", children: [
        {id: "sl139-4a", type: "complement", text: "quando me assento (שִׁבְתִּי)", greek: "שִׁבְתִּי", strong: "H3427"},
        {id: "sl139-4b", type: "complement", text: "quando me levanto (קוּמִי)", greek: "קוּמִי", strong: "H6965"}
      ]}
    ],
    explicacao: "Onisciência divina. חָקַר = investigar profundamente (como escavar). יָדַע = conhecer intimamente. Cinco verbos de conhecimento. Deus sabe tudo antes de acontecer.",
    notas: ["חָקַר = investigar, escavar", "יָדַע = conhecer intimamente", "בָּנְתָּה = construiste, entendeste", "כָּל דְּרָכַי = todos os meus caminhos"]
  }
,
  {
    ref: "Is 6:1-8",
    livro: "Isaías",
    traducao: "No ano em que morreu o rei Uzias vi o SENHOR assentado sobre um trono alto. Então voou um serafim para mim. E eu disse: Ai de mim! Então um dos serafims voou com uma brasa viva.",
    grego: "בִּשְׁנַ֣ת מ֔וֹת הַמֶּ֖לֶךְ עֻזִּיָּ֣הוּ רָאִ֣יתִי ׀ אֶת־אֲדֹנָ֑י. וָאֹ֣מַר אֽוֹי־לִ֔י כִּ֥י נִדְמֵ֖יתִי. וַיָּ֤עָף אֵלַי֙ אֶחָ֣ד מִן־הַשְּׂרָפִ֔ים.",
    diagrama: [
      {id: "is6-1", type: "adverbial", text: "no ano da morte (בִּשְׁנַת מּוֹת)", greek: "בִּשְׁנַת מּוֹת", strong: "H8141"},
      {id: "is6-2", type: "subject", text: "vi (רָאִיתִי)", greek: "רָאִיתִי", strong: "H7200", children: [
        {id: "is6-2a", type: "object", text: "o SENHOR (אֲדֹנָי)", greek: "אֲדֹנָי", strong: "H136"}
      ]},
      {id: "is6-3", type: "predicate", text: "assentado (יֹשֵׁב)", greek: "יֹשֵׁב", strong: "H3427", children: [
        {id: "is6-3a", type: "adverbial", text: "sobre um trono", greek: "עַל כִּסֵּא", strong: "H3678"}
      ]},
      {id: "is6-4", type: "predicate", text: "voou (וַיָּעָף)", greek: "וַיָּעָף", strong: "H5774", children: [
        {id: "is6-4a", type: "subject", text: "um serafim", greek: "אֶחָד מִן הַשְּׂרָפִים", strong: "H8314"}
      ]}
    ],
    explicacao: "Chamada de Isaías. Visão da glória divina. שְׂרָפִים = seres ardentes (6 asas). A brasa purifica os lábios (v.6-7). \"hineni shelaicheni\" = aqui estou, envia-me.",
    notas: ["אֲדֹנָי = Senhor (reverência)", "שְׂרָפִים = seres ardentes (anjos)", "טְמֵא שְׂפָתַיִם = impuro de lábios", "hineni = aqui estou (resposta de serviço)"]
  }
,
  {
    ref: "Is 7:14",
    livro: "Isaías",
    traducao: "Portanto o próprio Senhor vos dará um sinal: Eis que a virgem conceberá e dará à luz um filho, e chamará o seu nome Emanuel.",
    grego: "הִנֵּ֣ה הָעַלְמָ֑ה הָרָ֤ה וְיֹלֶדֶת֙ בֵּ֔ן וְקָרָ֥את שְׁמ֖וֹ עִמָּנוּ אֵֽל׃",
    diagrama: [
      {id: "is7-1", type: "subject", text: "a jovem (הָעַלְמָה)", greek: "הָעַלְמָה", strong: "H5959"},
      {id: "is7-2", type: "predicate", text: "conceberá (הָרָה)", greek: "הָרָה", strong: "H2030"},
      {id: "is7-3", type: "predicate", text: "dará à luz (וְיֹלֶדֶת)", greek: "וְיֹלֶדֶת", strong: "H3205", children: [
        {id: "is7-3a", type: "object", text: "um filho (בֵּן)", greek: "בֵּן", strong: "H1121"}
      ]},
      {id: "is7-4", type: "predicate", text: "chamará (וְקָרָאת)", greek: "וְקָרָאת", strong: "H7121", children: [
        {id: "is7-4a", type: "object", text: "Emanuel (עִמָּנוּ אֵל)", greek: "עִמָּנוּ אֵל", strong: "H6005"}
      ]}
    ],
    explicacao: "Profecia virginal cumprida em Mt 1:23. עַלְמָה = jovem mulher. LXX: παρθένος = virgem. עִמָּנוּ אֵל = Deus conosco (nome teofórico).",
    notas: ["עַלְמָה = jovem de casamento", "LXX: παρθένος (virgem)", "עִמָּנוּ אֵל = Deus conosco", "Cumprimento: Mt 1:23"]
  }
,
  {
    ref: "Is 40:3-5",
    livro: "Isaías",
    traducao: "Voz que clama no deserto: Preparai o caminho do SENHOR. Toda garganta será preenchida, todo monte rebaixado.",
    grego: "קוֹל֙ קוֹ֣רֵא בַּמִּדְבָּ֔ר פַּנּ֖וּ דֶּ֣רֶךְ יְהוָ֑ה. כָּל־גֶּ֣יא יִנָּשֵׂ֔א וְכָל־הַ֥ר וְגִבְעָ֖ה יִשְׁפָּֽלוּ׃",
    diagrama: [
      {id: "is40-1", type: "complement", text: "Voz que clama (קוֹל קוֹרֵא)", greek: "קוֹל קוֹרֵא", strong: "H6963"},
      {id: "is40-2", type: "predicate", text: "preparai (פַּנוּ)", greek: "פַּנוּ", strong: "H6340", children: [
        {id: "is40-2a", type: "object", text: "o caminho do SENHOR", greek: "דֶּרֶךְ יְהוָה", strong: "H1870"}
      ]},
      {id: "is40-3", type: "predicate", text: "será preenchida (יִנָּשֵׂא)", greek: "יִנָּשֵׂא", strong: "H5375"},
      {id: "is40-4", type: "predicate", text: "será rebaixado (יִשְׁפָּלוּ)", greek: "יִשְׁפָּלוּ", strong: "H8213"}
    ],
    explicacao: "Profecia citada nos 4 Evangelhos como aplicada a João Batista. קוֹרֵא = quem clama. פַּנוּ = alargar. Linguagem topográfica: vales e montes.",
    notas: ["קוֹרֵא = particípio de קָרָא (chamar)", "פַּנוּ = imperativo de פָּנָה (alargar)", "מְסִלָּה = estrada elevada", "Citação: Mt 3:3, Mc 1:3, Lc 3:4, Jo 1:23"]
  }
,
  {
    ref: "Is 52:13-53:12",
    livro: "Isaías",
    traducao: "Eis o meu servo prosperará; será exaltado. Mas ele foi ferido por causa das nossas transgressões, moido por causa das nossas iniquidades.",
    grego: "הִנֵּ֤ה יַשְׂכִּיל֙ עַבְדִּ֔י יָר֥וּם וְנִשָּׂ֖א. וְהוּא֙ מְחֹלָ֣ל מִפְּשָׁעֵ֔נוּ מְדֻכָּ֖א מֵעֲוֺנֹתֵ֑ינוּ מוּסַ֤ר שְׁלוֹמֵנוּ֙ עָלָ֔יו וּבְחַבֻּרָתוֹ֖ נִרְפָּֽא־לָֽנוּ׃",
    diagrama: [
      {id: "is52-1", type: "subject", text: "o meu servo (עַבְדִּי)", greek: "עַבְדִּי", strong: "H5650"},
      {id: "is52-2", type: "predicate", text: "prosperará (יַשְׂכִּיל)", greek: "יַשְׂכִּיל", strong: "H7919"},
      {id: "is53-1", type: "predicate", text: "ferido (מְחֹלָל)", greek: "מְחֹלָל", strong: "H2490", children: [
        {id: "is53-1a", type: "adverbial", text: "por nossas transgressões", greek: "מִפְּשָׁעֵנוּ", strong: "H6588"}
      ]},
      {id: "is53-2", type: "predicate", text: "moido (מְדֻכָּא)", greek: "מְדֻכָּא", strong: "H1794", children: [
        {id: "is53-2a", type: "adverbial", text: "por nossas iniquidades", greek: "מֵעֲוֺנֹתֵינוּ", strong: "H5771"}
      ]},
      {id: "is53-3", type: "complement", text: "castigo que traz paz (מוּסַר שְׁלוֹמֵנוּ)", greek: "מוּסַר שְׁלוֹמֵנוּ", strong: "H4148"}
    ],
    explicacao: "Quarto Servo Sofredor. Participios passivos: מְחֹלָל (ferido), מְדֻכָּא (moido). Substituição vicária. מּוּסַר = disciplina que traz paz.",
    notas: ["מְחֹלָל = particípio de חָלַל (perfurar)", "מְדֻכָּא = particípio de דָּכָא (esmagar)", "מוּסַר = disciplina/castigo corretivo", "שְׁלוֹם = paz, completude covenantal"]
  }
,
  {
    ref: "Jr 31:31-34",
    livro: "Jeremias",
    traducao: "Eis que vêm dias em que farei uma nova aliança. Porei a minha lei dentro deles e a escreverei no seu coração.",
    grego: "כִּ֣י זֶ֤ה הַבְּרִית֙ אֲשֶׁ֣ר אֶכְרֹ֔ת אֶת־בֵּ֖ית יִשְׂרָאֵ֑ל. נָתַתִּ֥י אֶת־תּוֹרָתִ֖י בְּקִרְבָּ֑ם וְעַל־לִבָּ֖ם אֶכְתֳּבֶֽנָּה׃",
    diagrama: [
      {id: "jr31-1", type: "subject", text: "este (זֶה)", greek: "זֶה", strong: "H2063"},
      {id: "jr31-2", type: "complement", text: "o pacto (הַבְּרִית)", greek: "הַבְּרִית", strong: "H1285"},
      {id: "jr31-3", type: "predicate", text: "porei (נָתַתִּי)", greek: "נָתַתִּי", strong: "H5414", children: [
        {id: "jr31-3a", type: "object", text: "minha lei (תוֹרָתִי)", greek: "תוֹרָתִי", strong: "H8451"},
        {id: "jr31-3b", type: "adverbial", text: "dentro deles (בְּקִרְבָּם)", greek: "בְּקִרְבָּם", strong: "H7130"}
      ]},
      {id: "jr31-4", type: "predicate", text: "escreverei (אֶכְתֳּבֶנָּה)", greek: "אֶכְתֳּבֶנָּה", strong: "H3789", children: [
        {id: "jr31-4a", type: "adverbial", text: "no coração", greek: "עַל לִבָּם", strong: "H3820"}
      ]}
    ],
    explicacao: "Nova aliança (berit hadashah). בְּקִרְבָּם = no íntimo. לֵב = coração = centro da vontade. Fulfillment: Lc 22:20, Hb 8:8-12.",
    notas: ["בְּרִית = aliança (literal: cortar)", "תּוֹרָה = instrução (de יָרָה)", "בְּקִרְבָּם = no meio deles", "Fulfillment: Lc 22:20; Hb 8:8-12"]
  }
,
  {
    ref: "Dn 7:13-14",
    livro: "Daniel",
    traducao: "Estava vindo com as nuvens do céu como o Filho do Homem. Foi-lhe dado domínio, honra e reino.",
    grego: "עִם־עֲנָנֵי שְׁמַיָּא כְּבַר אֱנָשׁ אֶתָּא. וְלֵהּ יְהִיב שׁלְטָן וִיקַר וּמַלְכוּ.",
    diagrama: [
      {id: "dn7-1", type: "adverbial", text: "com as nuvens (עִם עֲנָנֵי)", greek: "עִם עֲנָנֵי", strong: "H6051"},
      {id: "dn7-2", type: "subject", text: "Filho do Homem (כְּבַר אֱנָשׁ)", greek: "כְּבַר אֱנָשׁ", strong: "H1247"},
      {id: "dn7-3", type: "predicate", text: "foi-lhe dado (יְהִיב)", greek: "יְהִיב", strong: "H3052", children: [
        {id: "dn7-3a", type: "object", text: "domínio (שׁלְטָן)", greek: "שׁלְטָן", strong: "H7985"},
        {id: "dn7-3b", type: "object", text: "honra (וִיקַר)", greek: "וִיקַר", strong: "H3366"},
        {id: "dn7-3c", type: "object", text: "reino (וּמַלְכוּ)", greek: "וּמַלְכוּ", strong: "H4437"}
      ]}
    ],
    explicacao: "בַּר אֱנָשׁ = Filho do Homem (arameu). Títulos divinos: reino eterno, adoração universal. Jesus usa este título em Mt 26:64.",
    notas: ["בַּר = filho (arameu)", "עַתִּיק = ancião", "שׁלְטָן = domínio (persa)", "Fulfillment: Mt 24:30; 26:64; Ap 1:13"]
  }
,
  {
    ref: "Mt 1:1",
    livro: "Mateus",
    traducao: "Livro da genealogia de Jesus Cristo, filho de Davi, filho de Abraão.",
    grego: "Βίβλος γενέσεως Ἰησοῦ Χριστοῦ υἱοῦ Δαυὶδ υἱοῦ Ἀβραάμ.",
    diagrama: [
      {id: "mt1-1", type: "subject", text: "Livro (Βίβλος)", greek: "Βίβλος", strong: "G976", children: [
        {id: "mt1-1a", type: "modifier", text: "da genealogia (γενέσεως)", greek: "γενέσεως", strong: "G1078"},
        {id: "mt1-1b", type: "modifier", text: "de Jesus Cristo (Ἰησοῦ Χριστοῦ)", greek: "Ἰησοῦ Χριστοῦ", strong: "G2424"},
        {id: "mt1-1c", type: "modifier", text: "filho de Davi (υἱοῦ Δαυὶδ)", greek: "υἱοῦ Δαυὶδ", strong: "G1138"},
        {id: "mt1-1d", type: "modifier", text: "filho de Abraão (υἱοῦ Ἀβραάμ)", greek: "υἱοῦ Ἀβραάμ", strong: "G11"}
      ]}
    ],
    explicacao: "Frase nominal (sem verbo). Βίβλος γενέσεως é uma expressão típica de genealogia hebraica. A dupla filiação (Davi + Abraão) estabelece a linhagem messiânica.",
    notas: ["Βίβλος = livro, registro, genealogia", "γένεσις = origem, genealogia (remete a Gênesis)", "Ἰησοῦ = Joshua/Yeshua = 'YHWH salva'", "Χριστος = Ungido (Messias em hebraico)"]
  }
,
  {
    ref: "Mt 1:21",
    livro: "Mateus",
    traducao: "Ela dará à luz um filho, e tu lhe porás o nome Jesus, porque ele salvará o seu povo dos seus pecados.",
    grego: "τέξεται δὲ υἱὸν καὶ καλέσεις τὸ ὄνομα αὐτοῦ Ἰησοῦν, αὐτὸς γὰρ σώσει τὸν λαὸν αὐτοῦ ἀπὸ τῶν ἁμαρτιῶν αὐτῶν.",
    diagrama: [
      {id: "mt21-1", type: "predicate", text: "dará à luz (τέξεται)", greek: "τέξεται", strong: "G5088", children: [
        {id: "mt21-1a", type: "subject", text: "ela (αὐτή)", greek: "αὐτή", strong: "G846"},
        {id: "mt21-1b", type: "object", text: "um filho (υἱόν)", greek: "υἱόν", strong: "G5207"}
      ]},
      {id: "mt21-2", type: "conjunction", text: "e (καί)", greek: "καί", strong: "G2532"},
      {id: "mt21-3", type: "predicate", text: "porás o nome (καλέσεις)", greek: "καλέσεις", strong: "G2564", children: [
        {id: "mt21-3a", type: "object", text: "Jesus (Ἰησοῦν)", greek: "Ἰησοῦν", strong: "G2424"}
      ]},
      {id: "mt21-4", type: "conjunction", text: "porque (γάρ)", greek: "γάρ", strong: "G1063"},
      {id: "mt21-5", type: "predicate", text: "ele salvará (σώσει)", greek: "σώσει", strong: "G4982", children: [
        {id: "mt21-5a", type: "subject", text: "ele (αὐτός)", greek: "αὐτός", strong: "G846"},
        {id: "mt21-5b", type: "object", text: "o seu povo (τὸν λαὸν αὐτοῦ)", greek: "τὸν λαὸν αὐτοῦ", strong: "G2992"},
        {id: "mt21-5c", type: "adverbial", text: "dos pecados (ἀπὸ τῶν ἁμαρτιῶν)", greek: "ἀπὸ τῶν ἁμαρτιῶν", strong: "G266"}
      ]}
    ],
    explicacao: "Estrutura com τέξεται (futuro) + καλέσεις (imperativo) + σώσει (futuro). O nome Jesus (= YHWH salva) explica a missão salvífica. γάρ introduz a explicação etimológica.",
    notas: ["τέξεται = futuro médio de τίκτω (dar à luz)", "καλέσεις = futuro ativo de καλέω (chamar, nomear)", "σώσει = futuro ativo de σῴζω (salvar)", "Ἰησοῦν = acusativo de Ἰησοῦς"]
  }
,
  {
    ref: "Mt 5:3",
    livro: "Mateus",
    traducao: "Bem-aventurados os pobres de espírito, porque deles é o reino dos céus.",
    grego: "Μακάριοι οἱ πτωχοὶ τῷ πνεύματι, ὅτι αὐτῶν ἐστιν ἡ βασιλεία τῶν οὐρανῶν.",
    diagrama: [
      {id: "mt53-1", type: "subject", text: "Bem-aventurados (Μακάριοι)", greek: "Μακάριοι", strong: "G3107", children: [
        {id: "mt53-1a", type: "modifier", text: "os pobres de espírito (οἱ πτωχοὶ τῷ πνεύματι)", greek: "οἱ πτωχοὶ τῷ πνεύματι", strong: "G4434"}
      ]},
      {id: "mt53-2", type: "conjunction", text: "porque (ὅτι)", greek: "ὅτι", strong: "G3754"},
      {id: "mt53-3", type: "predicate", text: "é (ἐστιν)", greek: "ἐστιν", strong: "G2076", children: [
        {id: "mt53-3a", type: "subject", text: "o reino dos céus (ἡ βασιλεία τῶν οὐρανῶν)", greek: "ἡ βασιλεία τῶν οὐρανῶν", strong: "G932"},
        {id: "mt53-3b", type: "complement", text: "deles (αὐτῶν)", greek: "αὐτῶν", strong: "G846"}
      ]}
    ],
    explicacao: "Frase nominal sem verbo principal. Μακάριοι = bem-aventurados (bem-aventurança divina). πτωχοὶ τῷ πνεύματi = pobres de espírito (dependência total de Deus). ὅτι introduz a razão.",
    notas: ["Μακάριοι = bem-aventurados, felizes (divinamente)", "πτωχοί = mendicantes, dependentes", "τῷ πνεύματι = dativo de relação/qualidade", "οὐρανῶν = plural hebraizante (evita o nome de Deus)"]
  }
,
  {
    ref: "Mt 5:9",
    livro: "Mateus",
    traducao: "Bem-aventurados os pacificadores, porque eles serão chamados filhos de Deus.",
    grego: "Μακάριοι οἱ εἰρηνοποιοί, ὅτι αὐτοὶ υἱοὶ θεοῦ κληθήσονται.",
    diagrama: [
      {id: "mt59-1", type: "subject", text: "Bem-aventurados (Μακάριοι)", greek: "Μακάριοι", strong: "G3107", children: [
        {id: "mt59-1a", type: "modifier", text: "os pacificadores (οἱ εἰρηνοποιοί)", greek: "οἱ εἰρηνοποιοί", strong: "G1518"}
      ]},
      {id: "mt59-2", type: "conjunction", text: "porque (ὅτι)", greek: "ὅτι", strong: "G3754"},
      {id: "mt59-3", type: "predicate", text: "serão chamados (κληθήσονται)", greek: "κληθήσονται", strong: "G2564", children: [
        {id: "mt59-3a", type: "subject", text: "eles (αὐτοί)", greek: "αὐτοί", strong: "G846"},
        {id: "mt59-3b", type: "complement", text: "filhos de Deus (υἱοὶ θεοῦ)", greek: "υἱοὶ θεοῦ", strong: "G5207"}
      ]}
    ],
    explicacao: "εἰρηνοποιοί = pacificadores (τίθημι + εἰρήνη). κληθήσοντai = futuro passivo (divino) de καλέω. Serão chamados = identidade divina reconhecida.",
    notas: ["εἰρηνοποιοί = pacificadores (só aqui no NT)", "κληθήσονται = futuro passivo — Deus como sujeito oculto", "υἱοί = filhos (relação de aliança)"]
  }
,
  {
    ref: "Mt 5:14",
    livro: "Mateus",
    traducao: "Vós sois o mundo. Ninguém acende uma candeia para a por debaixo do selo, mas sim no candelabro, e ilumina todos que estão em casa.",
    grego: "ὑμεῖς ἐστε τὸ φῶς τοῦ κόσμου. οὐ δύναται πόλις κρυβῆναι ἐπάνω ὄρους κειμένη.",
    diagrama: [
      {id: "mt514-1", type: "subject", text: "Vós (ὑμεῖς)", greek: "ὑμεῖς", strong: "G4771"},
      {id: "mt514-2", type: "predicate", text: "sois (ἐστε)", greek: "ἐστε", strong: "G2076", children: [
        {id: "mt514-2a", type: "complement", text: "a luz do mundo (τὸ φῶς τοῦ κόσμου)", greek: "τὸ φῶς τοῦ κόσμου", strong: "G5457"}
      ]},
      {id: "mt514-3", type: "predicate", text: "Ninguém pode (οὐ δύναται)", greek: "οὐ δύναται", strong: "G1410", children: [
        {id: "mt514-3a", type: "object", text: "ser escondida (κρυβῆναι)", greek: "κρυβῆναι", strong: "G2928"},
        {id: "mt514-3b", type: "adverbial", text: "sobre o monte (ἐπάνω ὄρους)", greek: "ἐπάνω ὄρους", strong: "G1870"}
      ]}
    ],
    explicacao: "Metáfora: discípulos = φῶς τοῦ κόσμου. οὐ δύναται κρυβῆναι = impossibilidade negativa (dupla negativa enfática em grego). A cidade no monte = visibilidade pública da fé.",
    notas: ["φῶς = luz (raiz: λάμπω = brilhar)", "κόσμου = mundo (habitantes, não cosmos)", "κρυβῆναι = aoristo passivo infinitivo de κρύπτω", "ὄρους = genitivo de relação"]
  }
,
  {
    ref: "Mt 5:22",
    livro: "Mateus",
    traducao: "Eu, porém, vos digo que qualquer que se irar contra seu irmão será réu de julgamento.",
    grego: "ἐγὼ δὲ λέγω ὑμῖν ὅτι πᾶς ὁ ὀργιζόμενος τῷ ἀδελφῷ αὐτοῦ ἔνοχος ἔσται τῇ κρίσει.",
    diagrama: [
      {id: "mt522-1", type: "subject", text: "Eu (ἐγώ)", greek: "ἐγώ", strong: "G1473"},
      {id: "mt522-2", type: "predicate", text: "digo (λέγω)", greek: "λέγω", strong: "G3004", children: [
        {id: "mt522-2a", type: "dative", text: "a vós (ὑμῖν)", greek: "ὑμῖν", strong: "G4771"},
        {id: "mt522-2b", type: "object", text: "que (ὅτι)", greek: "ὅτι", strong: "G3754"}
      ]},
      {id: "mt522-3", type: "subject", text: "qualquer (πᾶς ὁ)", greek: "πᾶς ὁ", strong: "G3956", children: [
        {id: "mt522-3a", type: "modifier", text: "que se irar (ὀργιζόμενος)", greek: "ὀργιζόμενος", strong: "G3710"},
        {id: "mt522-3b", type: "dative", text: "contra o irmão (τῷ ἀδελφῷ)", greek: "τῷ ἀδελφῷ", strong: "G80"}
      ]},
      {id: "mt522-4", type: "predicate", text: "será réu (ἔνοχος ἔσται)", greek: "ἔνοχος ἔσται", strong: "G1777", children: [
        {id: "mt522-4a", type: "complement", text: "do julgamento (τῇ κρίσει)", greek: "τῇ κρίσει", strong: "G2920"}
      ]}
    ],
    explicacao: "Estrutura: ἐγώ δέ = contraste com a Lei. ὁ ὀργιζόμενος = particípio substantivado. ἔνοχος ἔσται = culpável (futuro de γίνομαι). A ira interior = crime equivalente ao assassinato.",
    notas: ["ὀργιζόμενος = particípio presentes de ὁργίζω (irar-se)", "ἔνοχos = culpável, sujeito a", "κρίσει = dativo de referência (julgamento/conseho)"]
  }
,
  {
    ref: "Mt 5:37",
    livro: "Mateus",
    traducao: "Seja, porém, o vosso falar: sim, sim; não, não.",
    grego: "ἔστω δὲ ὁ λόγος ὑμῶν ναὶ ναί, οὒ οὔ.",
    diagrama: [
      {id: "mt537-1", type: "predicate", text: "seja (ἔστω)", greek: "ἔστω", strong: "G1510", children: [
        {id: "mt537-1a", type: "subject", text: "o vosso falar (ὁ λόγος ὑμῶν)", greek: "ὁ λόγος ὑμῶν", strong: "G3056"},
        {id: "mt537-1b", type: "complement", text: "sim, sim (ναὶ ναί)", greek: "ναὶ ναί", strong: "G3483"},
        {id: "mt537-1c", type: "complement", text: "não, não (οὒ οὔ)", greek: "οὒ οὔ", strong: "G3693"}
      ]}
    ],
    explicacao: "Imperativo presente de εἰμί. ὁ λόγος = fala, palavra, discurso. A repetição ναί ναί, οὔ οὔ enfatiza a simplicidade radical. Sem juramento — a palavra basta.",
    notas: ["ἔστω = imperativo 3ª pessoa de εἰμί", "ναί = sim (confirmação enfática)", "οὔ = não (negação enfática)", "λόγος = palavra, fala, discurso"]
  }
,
  {
    ref: "Mt 5:48",
    livro: "Mateus",
    traducao: "Portanto, sede perfeitos, como é perfeito o vosso Pai celestial.",
    grego: "ἔσεσθε οὖν τέλειοι ὡς ὁ πατὴρ ὑμῶν ὁ οὐράνιος τέλειός ἐστιν.",
    diagrama: [
      {id: "mt548-1", type: "predicate", text: "sede (ἔσεσθε)", greek: "ἔσεσθε", strong: "G1510", children: [
        {id: "mt548-1a", type: "complement", text: "perfeitos (τέλειοι)", greek: "τέλειοι", strong: "G5046"}
      ]},
      {id: "mt548-2", type: "conjunction", text: "portanto (οὖν)", greek: "οὖν", strong: "G3767"},
      {id: "mt548-3", type: "adverbial", text: "como (ὡς)", greek: "ὡς", strong: "G5613"},
      {id: "mt548-4", type: "subject", text: "o vosso Pai celestial (ὁ πατὴρ ὑμῶν ὁ οὐράνιος)", greek: "ὁ πατὴρ ὑμῶν ὁ οὐράνιος", strong: "G3962", children: [
        {id: "mt548-4a", type: "modifier", text: "celestial (οὐράνιος)", greek: "οὐράνιος", strong: "G2033"}
      ]},
      {id: "mt548-5", type: "predicate", text: "é perfeito (τέλειός ἐστιν)", greek: "τέλειός ἐστιν", strong: "G5046", children: [
        {id: "mt548-5a", type: "complement", text: "perfeito (τέλειος)", greek: "τέλειος", strong: "G5046"}
      ]}
    ],
    explicacao: "Imperativo futuro de εἰμί. τέλειος = completo, maduro (referência ao VT: 'sede santos porque eu sou santo' Lv 19:2). O padrão é o próprio Deus.",
    notas: ["ἔσεσθε = futuro de εἰμί (imperativo)", "τέλειοι = completos, maduros, perfeitos", "οὐράνιος = celestial, do céu", "Modelo: Lv 19:2 — 'santos porque eu sou santo'"]
  }
,
  {
    ref: "Mt 6:9",
    livro: "Mateus",
    traducao: "Vós, porém, orai assim: Pai nosso que estais nos céus, santificado seja o vosso nome.",
    grego: "σεῖς οὖν προσεύχεσθε οὕτως· πάτερ ἡμῶν ὁ ἐν τοῖς οὐρανοῖς, ἁγιασθήτω τὸ ὄνομά σου.",
    diagrama: [
      {id: "mt69-1", type: "vocative", text: "Pai nosso (πάτερ ἡμῶν)", greek: "πάτερ ἡμῶν", strong: "G3962", children: [
        {id: "mt69-1a", type: "modifier", text: "que estais nos céus (ὁ ἐν τοῖς οὐρανοῖς)", greek: "ὁ ἐν τοῖς οὐρανοῖς", strong: "G3772"}
      ]},
      {id: "mt69-2", type: "predicate", text: "seja santificado (ἁγιασθήτω)", greek: "ἁγιασθήτω", strong: "G37", children: [
        {id: "mt69-2a", type: "subject", text: "o vosso nome (τὸ ὄνομά σου)", greek: "τὸ ὄνομά σου", strong: "G3686"}
      ]}
    ],
    explicacao: "Vocativo (πάτερ) + imperativo aoristo passivo (ἁγιασθήτω). O nome de Deus é santificado (= separado, declarado santo). A oração começa com a adoração.",
    notas: ["πάτερ = vocativo de πατήρ", "ἁγιασθήτω = aoristo passivo proibitivo de ἁγιάζω", "ὄνομα = nome (representa a pessoa inteira)", "οὐρανοῖς = céus (plural hebraizante)"]
  }
,
  {
    ref: "Mt 6:10",
    livro: "Mateus",
    traducao: "Venha o teu reino. Seja feita a tua vontade, assim na terra como no céu.",
    grego: "ἐλθάτω ἡ βασιλεία σου, γενηθήτω τὸ θέλημά σου ὡς ἐν οὐρανῷ καὶ ἐπὶ τῆς γῆς.",
    diagrama: [
      {id: "mt610-1", type: "predicate", text: "venha (ἐλθάτω)", greek: "ἐλθάτω", strong: "G2064", children: [
        {id: "mt610-1a", type: "subject", text: "o teu reino (ἡ βασιλεία σου)", greek: "ἡ βασιλεία σου", strong: "G932"}
      ]},
      {id: "mt610-2", type: "predicate", text: "seja feita (γενηθήτω)", greek: "γενηθήτω", strong: "G1096", children: [
        {id: "mt610-2a", type: "subject", text: "a tua vontade (τὸ θέλημά σου)", greek: "τὸ θέλημά σου", strong: "G2307"},
        {id: "mt610-2b", type: "adverbial", text: "assim na terra como no céu (ὡς ἐν οὐρανῷ καὶ ἐπὶ τῆς γῆς)", greek: "ὡς ἐν οὐρανῷ καὶ ἐπὶ τῆς γῆς", strong: "G1093"}
      ]}
    ],
    explicacao: "Dois imperativos aoristos: ἐλθάτω (venha) + γενηθήτω (seja feita). A vontade de Deus se cumpre no céu perfeitamente; na terra, pela oração e obediência dos discípulos.",
    notas: ["ἐλθάτω = aoristo ativo imperativo de ἔρχομαι", "γενηθήτω = aoristo passivo imperativo de γίνομαι", "βασιλεία = reino, soberania", "θέλημα = vontade, desejo"]
  }
,
  {
    ref: "Mt 6:33",
    livro: "Mateus",
    traducao: "Mas, buscai primeiro o reino de Deus, e a sua justiça, e todas estas coisas vos serão acrescentadas.",
    grego: "ζητεῖτε δὲ πρῶτον τὴν βασιλείαν τοῦ θεοῦ καὶ τὴν δικαιοσύνην αὐτοῦ, καὶ ταῦτα πάντα προστεθήσεται ὑμῖν.",
    diagrama: [
      {id: "mt633-1", type: "predicate", text: "buscai (ζητεῖτε)", greek: "ζητεῖτε", strong: "G2212", children: [
        {id: "mt633-1a", type: "adverbial", text: "primeiro (πρῶτον)", greek: "πρῶτον", strong: "G4412"},
        {id: "mt633-1b", type: "object", text: "o reino de Deus (τὴν βασιλείαν τοῦ θεοῦ)", greek: "τὴν βασιλείαν τοῦ θεοῦ", strong: "G932"},
        {id: "mt633-1c", type: "conjunction", text: "e (καί)", greek: "καί", strong: "G2532"},
        {id: "mt633-1d", type: "object", text: "a sua justiça (τὴν δικαιοσύνην αὐτοῦ)", greek: "τὴν δικαιοσύνην αὐτοῦ", strong: "G1343"}
      ]},
      {id: "mt633-2", type: "conjunction", text: "e (καί)", greek: "καί", strong: "G2532"},
      {id: "mt633-3", type: "predicate", text: "serão acrescentadas (προστεθήσεται)", greek: "προστεθήσεται", strong: "G4369", children: [
        {id: "mt633-3a", type: "subject", text: "todas estas coisas (ταῦτα πάντα)", greek: "ταῦτα πάντα", strong: "G3778"},
        {id: "mt633-3b", type: "dative", text: "a vós (ὑμῖν)", greek: "ὑμῖν", strong: "G4771"}
      ]}
    ],
    explicacao: "Imperativo presente (ζητεῖτε = buscai continuamente). πρῶτον = antes de tudo. προστεθήσεται = futuro passivo de προστίθημi (Deus acrescenta). A prioridade é o reino, não as necessidades.",
    notas: ["ζητεῖτε = imperativo presente ativo de ζητέω", "πρῶτον = primeiro, antes de tudo", "δικαιοσύνη = justiça, retidão", "προστεθήσεται = será acrescentado (Deus como sujeito)"]
  }
,
  {
    ref: "Mt 9:6",
    livro: "Mateus",
    traducao: "Mas, para saibais que o Filho do Homem tem poder na terra para perdoar pecados.",
    grego: "ἵνα δὲ εἰδῆτε ὅτι ἐξουσίαν ἔχει ὁ υἱὸς τοῦ ἀνθρώπου ἐπὶ τῆς γῆς ἀφιέναι ἁμαρτίας.",
    diagrama: [
      {id: "mt96-1", type: "conjunction", text: "para que saibais (ἵνα εἰδῆτε)", greek: "ἵνα εἰδῆτε", strong: "G244", children: [
        {id: "mt96-1a", type: "object", text: "que (ὅτι)", greek: "ὅτι", strong: "G3754"}
      ]},
      {id: "mt96-2", type: "subject", text: "o Filho do Homem (ὁ υἱὸς τοῦ ἀνθρώπου)", greek: "ὁ υἱὸς τοῦ ἀνθρώπου", strong: "G5207", children: [
        {id: "mt96-2a", type: "modifier", text: "tem poder (ἐξουσίαν ἔχει)", greek: "ἐξουσίαν ἔχει", strong: "G1849"},
        {id: "mt96-2b", type: "adverbial", text: "na terra (ἐπὶ τῆς γῆς)", greek: "ἐπὶ τῆς γῆς", strong: "G1093"}
      ]},
      {id: "mt96-3", type: "predicate", text: "perdoar (ἀφιέναι)", greek: "ἀφιέναι", strong: "G863", children: [
        {id: "mt96-3a", type: "object", text: "pecados (ἁμαρτίας)", greek: "ἁμαρτίας", strong: "G266"}
      ]}
    ],
    explicacao: "ἵνα final (propósito). εἰδῆτε = subjuntivo de εἶδον (ver). ἐξουσία = autoridade, poder delegado. O Filho do Homem (título messiânico de Dn 7:13) tem autoridade para perdoar.",
    notas: ["ἵνα = conjunção final (para que)", "εἰδῆτε = subjuntivo aoristo de εἶδον", "ἐξουσία = autoridade, poder", "ἀφιέναι = infinitivo presente de ἀφίημι (perdoar)"]
  }
,
  {
    ref: "Mt 11:28",
    livro: "Mateus",
    traducao: "Vinde a mim, todos os que estais cansados e oprimidos, e eu vos aliviarei.",
    grego: "Δεῦτε πρός με πάντες οἱ κοπιῶντες καὶ πεφορτισμένοι, κἀγὼ ἀναπαύσω ὑμᾶς.",
    diagrama: [
      {id: "mt1128-1", type: "vocative", text: "Vinde (Δεῦτε)", greek: "Δεῦτε", strong: "G1205", children: [
        {id: "mt1128-1a", type: "adverbial", text: "a mim (πρός με)", greek: "πρός με", strong: "G4314"}
      ]},
      {id: "mt1128-2", type: "subject", text: "todos (πάντες)", greek: "πάντες", strong: "G3956", children: [
        {id: "mt1128-2a", type: "modifier", text: "que estais cansados (οἱ κοπιῶντες)", greek: "οἱ κοπιῶντες", strong: "G2872"},
        {id: "mt1128-2b", type: "conjunction", text: "e (καί)", greek: "καί", strong: "G2532"},
        {id: "mt1128-2c", type: "modifier", text: "oprimidos (πεφορτισμένοι)", greek: "πεφορτισμένοι", strong: "G5413"}
      ]},
      {id: "mt1128-3", type: "predicate", text: "eu vos aliviarei (κἀγὼ ἀναπαύσω ὑμᾶς)", greek: "κἀγὼ ἀναπαύσω ὑμᾶς", strong: "G373", children: [
        {id: "mt1128-3a", type: "subject", text: "eu (κἀγώ)", greek: "κἀγώ", strong: "G1473"},
        {id: "mt1128-3b", type: "object", text: "vós (ὑμᾶς)", greek: "ὑμᾶς", strong: "G4771"}
      ]}
    ],
    explicacao: "Imperativo aoristo (Δεῦτε = vinde agora). κοπιῶντες = esforçados (trabalho pesado). πεφορτισμένoi = sobrecarregados (carga pesada). κἀγώ = eu também, eu mesmo. ἀναπαύσω = darei descanso.",
    notas: ["Δεῦτε = imperativo aoristo de δεῦρο (vinde)", "κοπιῶντες = particípio presente de κοπιάω (trabalhar cansado)", "πεφορτισμένοι = perfeito passivo de φορτίζω (sobrecarregar)", "ἀναπαύσω = futuro ativo de ἀναπαύω (dar descanso)"]
  }
,
  {
    ref: "Mt 16:15",
    livro: "Mateus",
    traducao: "E vós, quem dizeis que eu sou?",
    grego: "λέγει αὐτοῖς· ὑμεῖς δὲ τίνα με λέγετε εἶναι;",
    diagrama: [
      {id: "mt1615-1", type: "predicate", text: "diz (λέγει)", greek: "λέγει", strong: "G3004", children: [
        {id: "mt1615-1a", type: "subject", text: "ele (Jesus)", greek: "αὐτοῖς", strong: "G846"},
        {id: "mt1615-1b", type: "dative", text: "a eles (αὐτοῖς)", greek: "αὐτοῖς", strong: "G846"}
      ]},
      {id: "mt1615-2", type: "vocative", text: "Vós (ὑμεῖς)", greek: "ὑμεῖς", strong: "G4771"},
      {id: "mt1615-3", type: "object", text: "quem (τίνα)", greek: "τίνα", strong: "G5101"},
      {id: "mt1615-4", type: "predicate", text: "dizeis (λέγετε)", greek: "λέγετε", strong: "G3004", children: [
        {id: "mt1615-4a", type: "object", text: "que eu sou (με εἶναι)", greek: "με εἶναι", strong: "G1510"}
      ]}
    ],
    explicacao: "Pergunta direta com ὑμεῖς enfático (contrastando com as opiniões populares). τίνα = acusativo interrogativo. εἶναι = infinitivo de εἰμί (ser). A pergunta central do evangelho.",
    notas: ["λέγει = presente histórico de λέγω", "ὑμεῖς = pronome enfático (vós especificamente)", "τίνα = acusativo interrogativo de τίς", "εἶναι = infinitivo presente de εἰμί"]
  }
,
  {
    ref: "Mt 28:19",
    livro: "Mateus",
    traducao: "Ide, portanto, e fazei discípulos de todas as nações, baptizando-os em nome do Pai, e do Filho, e do Espírito Santo.",
    grego: "πορευθέντες οὖν μαθητεύσατε πάντα τὰ ἔθνη, βαπτίζοντες αὐτοὺς εἰς τὸ ὄνομα τοῦ πατρὸς καὶ τοῦ υἱοῦ καὶ τοῦ ἁγίου πνεύματος.",
    diagrama: [
      {id: "mt2819-1", type: "predicate", text: "fazei discípulos (μαθητεύσατε)", greek: "μαθητεύσατε", strong: "G3100", children: [
        {id: "mt2819-1a", type: "adverbial", text: "ide (πορευθέντες)", greek: "πορευθέντες", strong: "G4198"},
        {id: "mt2819-1b", type: "adverbial", text: "portanto (οὖν)", greek: "οὖν", strong: "G3767"},
        {id: "mt2819-1c", type: "object", text: "todas as nações (πάντα τὰ ἔθνη)", greek: "πάντα τὰ ἔθνη", strong: "G1484"},
        {id: "mt2819-1d", type: "modifier", text: "baptizando-os (βαπτίζοντες αὐτούς)", greek: "βαπτίζοντες αὐτούς", strong: "G907"}
      ]},
      {id: "mt2819-2", type: "complement", text: "em nome do Pai (εἰς τὸ ὄνομα τοῦ πατρός)", greek: "εἰς τὸ ὄνομα τοῦ πατρός", strong: "G3686", children: [
        {id: "mt2819-2a", type: "conjunction", text: "e do Filho (καὶ τοῦ υἱοῦ)", greek: "καὶ τοῦ υἱοῦ", strong: "G5207"},
        {id: "mt2819-2b", type: "conjunction", text: "e do Espírito Santo (καὶ τοῦ ἁγίου πνεύματος)", greek: "καὶ τοῦ ἁγίου πνεύματος", strong: "G4151"}
      ]}
    ],
    explicacao: "μαθητεύσατε = imperativo aoristo (fazei discípulos). πορευθέντες = gerúndio (ide primeiro). βαπτίζοντες = gerúndio (baptizando como parte do processo). εἰς τὸ ὄνομa = em nome (= na autoridade de).",
    notas: ["μαθητεύσατε = imperativo aoristo de μαθητεύω", "βαπτίζοντες = particípio presente ativo de βαπτίζω", "ἔθνη = nações, gentios", "εἰς τὸ ὄνομα = em nome (autoridade, identidade)"]
  }
,
  {
    ref: "Mc 10:45",
    livro: "Marcos",
    traducao: "Porque também o Filho do Homem não veio para ser servido, mas para servir, e dar a sua vida em resgate por muitos.",
    grego: "καὶ γὰρ ὁ υἱὸς τοῦ ἀνθρώπου οὐκ ἦλθεν διακονηθῆναι ἀλλὰ διακονῆσαι καὶ δοῦναι τὴν ψυχὴν αὐτοῦ λύτρον ἀντὶ πολλῶν.",
    diagrama: [
      {id: "mc1045-1", type: "conjunction", text: "porque também (καὶ γάρ)", greek: "καὶ γάρ", strong: "G2532"},
      {id: "mc1045-2", type: "subject", text: "o Filho do Homem (ὁ υἱὸς τοῦ ἀνθρώπου)", greek: "ὁ υἱὸς τοῦ ἀνθρώπου", strong: "G5207"},
      {id: "mc1045-3", type: "predicate", text: "não veio (οὐκ ἦλθεν)", greek: "οὐκ ἦλθεν", strong: "G2064", children: [
        {id: "mc1045-3a", type: "complement", text: "para ser servido (διακονηθῆναι)", greek: "διακονηθῆναι", strong: "G1247"},
        {id: "mc1045-3b", type: "conjunction", text: "mas (ἀλλά)", greek: "ἀλλά", strong: "G235"},
        {id: "mc1045-3c", type: "complement", text: "para servir (διακονῆσαι)", greek: "διακονῆσαι", strong: "G1247"},
        {id: "mc1045-3d", type: "conjunction", text: "e (καί)", greek: "καί", strong: "G2532"},
        {id: "mc1045-3e", type: "complement", text: "dar a sua vida (δοῦναι τὴν ψυχήν)", greek: "δοῦναι τὴν ψυχήν", strong: "G1325"},
        {id: "mc1045-3f", type: "adverbial", text: "em resgate por muitos (λύτρον ἀντὶ πολλῶν)", greek: "λύτρον ἀντὶ πολλῶν", strong: "G3089"}
      ]}
    ],
    explicacao: "Contraste forte: οὐκ ἦλθεν... ἀλλά (não veio para... mas para). Dois infinitivos aoristos: διακονηθῆνai (ser servido, passivo) vs διακονῆσai (servir, ativo). λύτρον = resgate (preço de libertação).",
    notas: ["διακονηθῆναι = infinitivo aoristo passivo de διακονέω", "διακονῆσαι = infinitivo aoristo ativo de διακονέω", "λύτρον = resgate, preço de libertação", "ἀντί = em lugar de, por causa de"]
  }
,
  {
    ref: "Mc 12:29",
    livro: "Marcos",
    traducao: "Jesus respondeu: O primeiro é: Ouve, Israel: O Senhor nosso Deus é o único Senhor.",
    grego: "ἀπεκρίθη Ἰησοῦς ὅτι πρώτη ἐστίν· ἄκουε Ἰσραήλ, κύριος ὁ θεὸς ἡμῶν κύριος εἷς ἐστιν.",
    diagrama: [
      {id: "mc1229-1", type: "predicate", text: "respondeu (ἀπεκρίθη)", greek: "ἀπεκρίθη", strong: "G611", children: [
        {id: "mc1229-1a", type: "subject", text: "Jesus (Ἰησοῦς)", greek: "Ἰησοῦς", strong: "G2424"},
        {id: "mc1229-1b", type: "object", text: "que (ὅτι)", greek: "ὅτι", strong: "G3754"}
      ]},
      {id: "mc1229-2", type: "subject", text: "a primeira é (πρώτη ἐστίν)", greek: "πρώτη ἐστίν", strong: "G4413", children: [
        {id: "mc1229-2a", type: "modifier", text: "primeira (πρώτη)", greek: "πρώτη", strong: "G4413"}
      ]},
      {id: "mc1229-3", type: "vocative", text: "Ouve (ἄκουε)", greek: "ἄκουε", strong: "G191", children: [
        {id: "mc1229-3a", type: "vocative", text: "Israel (Ἰσραήλ)", greek: "Ἰσραήλ", strong: "G2474"}
      ]},
      {id: "mc1229-4", type: "subject", text: "o Senhor nosso Deus (κύριος ὁ θεὸς ἡμῶν)", greek: "κύριος ὁ θεὸς ἡμῶν", strong: "G2962", children: [
        {id: "mc1229-4a", type: "modifier", text: "nosso (ἡμῶν)", greek: "ἡμῶν", strong: "G2249"}
      ]},
      {id: "mc1229-5", type: "predicate", text: "é um (εἷς ἐστιν)", greek: "εἷς ἐστιν", strong: "G1520", children: [
        {id: "mc1229-5a", type: "complement", text: "Senhor (κύριος)", greek: "κύριος", strong: "G2962"}
      ]}
    ],
    explicacao: "Citção do Shemá (Dt 6:4). ἄκουε = imperativo presente (ouve continuamente). κύριος εἷς ἐστιν = o Senhor é um (unidade absoluta). Jesus confirma o monoteísmo judeu.",
    notas: ["ἀπεκρίθη = aoristo passivo de ἀποκρίνομαι", "ἄκουε = imperativo presente ativo de ἀκούω", "εἷς = um (único)", "κύριος = Senhor (YHWH traduzido)"]
  }
,
  {
    ref: "Mc 14:22",
    livro: "Marcos",
    traducao: "E, estando a comer, tomou o pão, abençoou-o, partiu-o e deu-lho, dizendo: Tomai, isto é o meu corpo.",
    grego: "καὶ ἐσθιόντων αὐτῶν λαβὼν τὸν ἄρτον εὐλογήσας ἔκλασεν καὶ ἔδωκεν αὐτοῖς εἰπών· λάβετε, τοῦτό ἐστιν τὸ σῶμά μου.",
    diagrama: [
      {id: "mc1422-1", type: "adverbial", text: "estando a comer (ἐσθιόντων αὐτῶν)", greek: "ἐσθιόντων αὐτῶν", strong: "G2068"},
      {id: "mc1422-2", type: "predicate", text: "tomou (λαβών)", greek: "λαβών", strong: "G2983", children: [
        {id: "mc1422-2a", type: "object", text: "o pão (τὸν ἄρτον)", greek: "τὸν ἄρτον", strong: "G740"}
      ]},
      {id: "mc1422-3", type: "predicate", text: "abençoou (εὐλογήσας)", greek: "εὐλογήσας", strong: "G2127"},
      {id: "mc1422-4", type: "predicate", text: "partiu (ἔκλασεν)", greek: "ἔκλασεν", strong: "G2806"},
      {id: "mc1422-5", type: "predicate", text: "deu (ἔδωκεν)", greek: "ἔδωκεν", strong: "G1325", children: [
        {id: "mc1422-5a", type: "dative", text: "lhes (αὐτοῖς)", greek: "αὐτοῖς", strong: "G846"}
      ]},
      {id: "mc1422-6", type: "predicate", text: "dizendo (εἰπών)", greek: "εἰπών", strong: "G2036", children: [
        {id: "mc1422-6a", type: "object", text: "tomai (λάβετε)", greek: "λάβετε", strong: "G2983"},
        {id: "mc1422-6b", type: "complement", text: "isto é o meu corpo (τοῦτό ἐστιν τὸ σῶμά μου)", greek: "τοῦτό ἐστιν τὸ σῶμά μου", strong: "G4983"}
      ]}
    ],
    explicacao: "Sequência de aoristos: λαβών → εὐλογήσας → ἔκλασεν → ἔδωκεν (= ação sucessiva). τοῦτό ἐστιν = isto é (identificação, não metáfora). A instituição da Ceia do Senhor.",
    notas: ["λαβών = aoristo participial de λαμβάνω", "εὐλογήσας = aoristo participial de εὐλογέω", "ἔκλασεν = aoristo ativo de κλάω (partir)", "σῶμά = corpo (corpo físico)"]
  }
,
  {
    ref: "Lc 1:30",
    livro: "Lucas",
    traducao: "E o anjo disse-lhe: Não temas, Maria, porque achaste graça diante de Deus.",
    grego: "καὶ εἶπεν ὁ ἄγγελος αὐτῇ· μὴ φοβοῦ, Μαριάμ, εὗρες γὰρ χάριν παρὰ τῷ θεῷ.",
    diagrama: [
      {id: "lc130-1", type: "predicate", text: "disse (εἶπεν)", greek: "εἶπεν", strong: "G2036", children: [
        {id: "lc130-1a", type: "subject", text: "o anjo (ὁ ἄγγελος)", greek: "ὁ ἄγγελος", strong: "G32"},
        {id: "lc130-1b", type: "dative", text: "a ela (αὐτῇ)", greek: "αὐτῇ", strong: "G846"}
      ]},
      {id: "lc130-2", type: "predicate", text: "Não temas (μὴ φοβοῦ)", greek: "μὴ φοβοῦ", strong: "G5399", children: [
        {id: "lc130-2a", type: "vocative", text: "Maria (Μαριάμ)", greek: "Μαριάμ", strong: "G3137"}
      ]},
      {id: "lc130-3", type: "conjunction", text: "porque (γάρ)", greek: "γάρ", strong: "G1063"},
      {id: "lc130-4", type: "predicate", text: "achaste (εὗρες)", greek: "εὗρες", strong: "G2147", children: [
        {id: "lc130-4a", type: "complement", text: "graça (χάριν)", greek: "χάριν", strong: "G5485"},
        {id: "lc130-4b", type: "adverbial", text: "diante de Deus (παρὰ τῷ θεῷ)", greek: "παρὰ τῷ θεῷ", strong: "G2316"}
      ]}
    ],
    explicacao: "μὴ φοβοῦ = imperativo aoristo negativo (não temas!). εὗρες = aoristo indicativo (achaste, ponto único). χάριν παρὰ τῷ θεῷ = graça diante de Deus (favor divino).",
    notas: ["φοβοῦ = imperativo presente médio de φοβέω", "εὗρες = aoristo indicativo ativo de εὑρίσκω", "χάριν = graça, favor, dom", "παρὰ = diante de, junto a"]
  }
,
  {
    ref: "Lc 2:10",
    livro: "Lucas",
    traducao: "E o anjo disse-lhes: Não temais, porque vos trago boas novas de grande alegria que serão para todo o povo.",
    grego: "καὶ εἶπεν αὐτοῖς ὁ ἄγγελος· μὴ φοβεῖσθε· ἰδοὺ γὰρ εὐαγγελίζομαι ὑμῖν χαρὰν μεγάλην ἥτις ἔσται παντὶ τῷ λαῷ.",
    diagrama: [
      {id: "lc210-1", type: "predicate", text: "disse (εἶπεν)", greek: "εἶπεν", strong: "G2036", children: [
        {id: "lc210-1a", type: "subject", text: "o anjo (ὁ ἄγγελος)", greek: "ὁ ἄγγελος", strong: "G32"},
        {id: "lc210-1b", type: "dative", text: "a eles (αὐτοῖς)", greek: "αὐτοῖς", strong: "G846"}
      ]},
      {id: "lc210-2", type: "predicate", text: "Não temais (μὴ φοβεῖσθε)", greek: "μὴ φοβεῖσθε", strong: "G5399"},
      {id: "lc210-3", type: "conjunction", text: "porque (γάρ)", greek: "γάρ", strong: "G1063"},
      {id: "lc210-4", type: "predicate", text: "anuncio-vos (εὐαγγελίζομαι ὑμῖν)", greek: "εὐαγγελίζομαι ὑμῖν", strong: "G2097", children: [
        {id: "lc210-4a", type: "subject", text: "eu (ἐγώ)", greek: "ἐγώ", strong: "G1473"},
        {id: "lc210-4b", type: "object", text: "boas novas de grande alegria (χαρὰν μεγάλην)", greek: "χαρὰν μεγάλην", strong: "G5479"}
      ]},
      {id: "lc210-5", type: "modifier", text: "que serão para todo o povo (ἥτις ἔσται παντὶ τῷ λαῷ)", greek: "ἥτις ἔσται παντὶ τῷ λαῷ", strong: "G2992"}
    ],
    explicacao: "εὐαγγελίζομαι = anuncio boas novas (origem do termo 'evangelho'). χαράν μεγάλην = alegria grande (objeto direto). ἥτις = que (relativo explicativo). Para todo o povo = universalidade.",
    notas: ["εὐαγγελίζομαι = anunciar boas novas (verbo original do evangelho)", "χαράν = alegria (acusativo singular)", "ἥτις = relativo explicativo (que, a qual)", "λαῷ = povo (Israel + gentios)"]
  }
,
  {
    ref: "Lc 6:27",
    livro: "Lucas",
    traducao: "Mas eu vos digo que ouvis: Amai os vossos inimigos, fazei bem aos que vos odeiam.",
    grego: "ἀλλὰ ὑμῖν λέγω τοῖς ἀκούουσιν· ἀγαπᾶτε τοὺς ἐχθροὺς ὑμῶν, καλῶς ποιεῖτε τοῖς μισοῦσιν ὑμᾶς.",
    diagrama: [
      {id: "lc627-1", type: "conjunction", text: "mas (ἀλλά)", greek: "ἀλλά", strong: "G235"},
      {id: "lc627-2", type: "predicate", text: "digo (λέγω)", greek: "λέγω", strong: "G3004", children: [
        {id: "lc627-2a", type: "dative", text: "a vós (ὑμῖν)", greek: "ὑμῖν", strong: "G4771"},
        {id: "lc627-2b", type: "modifier", text: "que ouvis (τοῖς ἀκούουσιν)", greek: "τοῖς ἀκούουσιν", strong: "G191"}
      ]},
      {id: "lc627-3", type: "predicate", text: "amai (ἀγαπᾶτε)", greek: "ἀγαπᾶτε", strong: "G25", children: [
        {id: "lc627-3a", type: "object", text: "os vossos inimigos (τοὺς ἐχθροὺς ὑμῶν)", greek: "τοὺς ἐχθροὺς ὑμῶν", strong: "G2190"}
      ]},
      {id: "lc627-4", type: "predicate", text: "fazei bem (καλῶς ποιεῖτε)", greek: "καλῶς ποιεῖτε", strong: "G2564", children: [
        {id: "lc627-4a", type: "dative", text: "aos que vos odeiam (τοῖς μισοῦσιν ὑμᾶς)", greek: "τοῖς μισοῦσιν ὑμᾶς", strong: "G3404"}
      ]}
    ],
    explicacao: "Contraste radical: ἀλλά introduz a nova ética. ἀγαπᾶτε = imperativo presente (amem continuamente). O amor aos inimigos é marca distintiva do reino de Deus.",
    notas: ["ἀγαπᾶτε = imperativo presente ativo de ἀγαπάω", "ἐχθρούς = inimigos (hostis, adversários)", "καλῶς ποιεῖτε = fazei bem (ação concreta)", "μισοῦσιν = particípio presente de μισέω (odeiam)"]
  }
,
  {
    ref: "Lc 15:21",
    livro: "Lucas",
    traducao: "E o filho disse-lhe: Pai, eu pequei contra o céu e perante ti; já não sou digno de ser chamado teu filho.",
    grego: "εἶπεν δὲ ὁ υἱὸς αὐτῷ· πάτερ, ἥμαρτον εἰς τὸν οὐρανὸν καὶ ἐνώπιόν σου, καὶ οὐκέτι εἰμὶ ἄξιος κληθῆναι υἱός σου.",
    diagrama: [
      {id: "lc1521-1", type: "predicate", text: "disse (εἶπεν)", greek: "εἶπεν", strong: "G2036", children: [
        {id: "lc1521-1a", type: "subject", text: "o filho (ὁ υἱός)", greek: "ὁ υἱός", strong: "G5207"},
        {id: "lc1521-1b", type: "dative", text: "a ele (αὐτῷ)", greek: "αὐτῷ", strong: "G846"}
      ]},
      {id: "lc1521-2", type: "vocative", text: "Pai (πάτερ)", greek: "πάτερ", strong: "G3962"},
      {id: "lc1521-3", type: "predicate", text: "eu pequei (ἥμαρτον)", greek: "ἥμαρτον", strong: "G264", children: [
        {id: "lc1521-3a", type: "adverbial", text: "contra o céu (εἰς τὸν οὐρανόν)", greek: "εἰς τὸν οὐρανόν", strong: "G3772"},
        {id: "lc1521-3b", type: "conjunction", text: "e (καί)", greek: "καί", strong: "G2532"},
        {id: "lc1521-3c", type: "adverbial", text: "perante ti (ἐνώπιόν σου)", greek: "ἐνώπιόν σου", strong: "G1799"}
      ]},
      {id: "lc1521-4", type: "predicate", text: "não sou (οὐκ εἰμί)", greek: "οὐκ εἰμί", strong: "G2076", children: [
        {id: "lc1521-4a", type: "complement", text: "digno (ἄξιος)", greek: "ἄξιος", strong: "G514"},
        {id: "lc1521-4b", type: "complement", text: "de ser chamado (κληθῆναι)", greek: "κληθῆναι", strong: "G2564"},
        {id: "lc1521-4c", type: "complement", text: "teu filho (υἱός σου)", greek: "υἱός σου", strong: "G5207"}
      ]}
    ],
    explicacao: "Confissão do filho pródigo. ἥμαρτον = aoristo (pequei, ponto único). εἰς τὸν οὐρανόν = contra Deus (hebraísmo). ἐνώπιόν σου = perante ti. οὐκέτι εἰμί = já não sou (perda de identidade).",
    notas: ["ἥμαρτον = aoristo ativo de ἁμαρτάνω (pecar)", "εἰς = contra (hebraísmo: חָטָא אֶל)", "ἐνώπιόν = diante de, perante", "κληθῆναι = infinitivo passivo de καλέω (ser chamado)"]
  }
,
  {
    ref: "Lc 23:34",
    livro: "Lucas",
    traducao: "E Jesus disse: Pai, perdoa-lhes, porque não sabem o que fazem.",
    grego: "ὁ δὲ Ἰησοῦς ἔλεγεν· πάτερ, ἄφες αὐτοῖς, οὐ γὰρ οἴδασιν τί ποιοῦσιν.",
    diagrama: [
      {id: "lc2334-1", type: "predicate", text: "disse (ἔλεγεν)", greek: "ἔλεγεν", strong: "G3004", children: [
        {id: "lc2334-1a", type: "subject", text: "Jesus (ὁ Ἰησοῦς)", greek: "ὁ Ἰησοῦς", strong: "G2424"}
      ]},
      {id: "lc2334-2", type: "vocative", text: "Pai (πάτερ)", greek: "πάτερ", strong: "G3962"},
      {id: "lc2334-3", type: "predicate", text: "perdoa (ἄφες)", greek: "ἄφες", strong: "G863", children: [
        {id: "lc2334-3a", type: "dative", text: "lhes (αὐτοῖς)", greek: "αὐτοῖς", strong: "G846"}
      ]},
      {id: "lc2334-4", type: "conjunction", text: "porque (γάρ)", greek: "γάρ", strong: "G1063"},
      {id: "lc2334-5", type: "predicate", text: "não sabem (οὐ οἴδασιν)", greek: "οὐ οἴδασιν", strong: "G1492", children: [
        {id: "lc2334-5a", type: "object", text: "o que fazem (τί ποιοῦσιν)", greek: "τί ποιοῦσιν", strong: "G4160"}
      ]}
    ],
    explicacao: "ἄφες = imperativo aoristo de ἀφίημι (perdoa, solta). Pedido de intercessão no cruzamento. οὐ γάρ = porque não (ignorância como atenuante). Frase mais provavelmente original de Jo 19:11.",
    notas: ["ἄφες = imperativo aoristo de ἀφίημι (perdoar, soltar)", "οἴδασιν = perfeito indicativo de εἶδον (saber)", "ποιοῦσιν = presente indicativo ativo de ποιέω", "λόγος perdonante paralelo a Estêr 7:3"]
  }
,
  {
    ref: "Lc 24:34",
    livro: "Lucas",
    traducao: "Dizendo que o Senhor verdadeiramente ressuscitou, e foi visto por Simão.",
    grego: "λέγοντες ὅτι ὄντως ἠγέρθη ὁ κύριος καὶ ὤφθη Σίμωνι.",
    diagrama: [
      {id: "lc2434-1", type: "predicate", text: "dizendo (λέγοντες)", greek: "λέγοντες", strong: "G3004", children: [
        {id: "lc2434-1a", type: "object", text: "que (ὅτι)", greek: "ὅτι", strong: "G3754"}
      ]},
      {id: "lc2434-2", type: "adverbial", text: "verdadeiramente (ὄντως)", greek: "ὄντως", strong: "G3689"},
      {id: "lc2434-3", type: "predicate", text: "ressuscitou (ἠγέρθη)", greek: "ἠγέρθη", strong: "G1453", children: [
        {id: "lc2434-3a", type: "subject", text: "o Senhor (ὁ κύριος)", greek: "ὁ κύριος", strong: "G2962"}
      ]},
      {id: "lc2434-4", type: "conjunction", text: "e (καί)", greek: "καί", strong: "G2532"},
      {id: "lc2434-5", type: "predicate", text: "foi visto (ὤφθη)", greek: "ὤφθη", strong: "G3708", children: [
        {id: "lc2434-5a", type: "dative", text: "a Simão (Σίμωνι)", greek: "Σίμωνι", strong: "G4613"}
      ]}
    ],
    explicacao: "ὄντως = verdadeiramente (confirmação da ressurreição). ἠγέρθη = aoristo passivo (foi ressuscitado = Deus agiu). ὤφθη = aoristo passivo (foi visto, apareceu). Testemunhoocular.",
    notas: ["ὄντως = realmente, verdadeiramente", "ἠγέρθη = aoristo passivo de ἐγείρω (ressuscitar)", "ὤφθη = aoristo passivo de ὁράω (aparecer, ser visto)", "Σίμωνι = dativo de Simão Pedro"]
  }
,
  {
    ref: "Jo 1:1",
    livro: "João",
    traducao: "No princípio era o Verbo, e o Verbo estava com Deus, e o Verbo era Deus.",
    grego: "Ἐν ἀρχῇ ἦν ὁ λόγος, καὶ ὁ λόγος ἦν πρὸς τὸν θεόν, καὶ θεὸς ἦν ὁ λόγος.",
    diagrama: [
      {id: "jo1-1", type: "subject", text: "o Verbo (ὁ λόγος)", greek: "ὁ λόγος", strong: "G3056", children: [
        {id: "jo1-1a", type: "modifier", text: "No princípio (Ἐν ἀρχῇ)", greek: "Ἐν ἀρχῇ", strong: "G746"}
      ]},
      {id: "jo1-2", type: "predicate", text: "era (ἦν)", greek: "ἦν", strong: "G2258", children: [
        {id: "jo1-2a", type: "complement", text: "com Deus (πρὸς τὸν θεόν)", greek: "πρὸς τὸν θεόν", strong: "G2316"}
      ]},
      {id: "jo1-3", type: "conjunction", text: "e (καί)", greek: "καί", strong: "G2532"},
      {id: "jo1-4", type: "predicate", text: "era (ἦν)", greek: "ἦν", strong: "G2258", children: [
        {id: "jo1-4a", type: "complement", text: "Deus (θεός)", greek: "θεός", strong: "G2316"}
      ]}
    ],
    explicacao: "Três declarações: (1) ἦν = imperfeito de εἰμí (existia continuamente). Ἐν ἀρχῇ = No princípio (remete a Gn 1:1). (2) πρός = com (relação face a face). (3) θεός ἦν ὁ λόγος = o Verbo era Deus (predicado sem artigo = natureza divina).",
    notas: ["ἦν = imperfeito de εἰμί (existia, estava)", "λόγος = Verbo, razão, princípio criador", "πρός = com, em direção a (relação íntima)", "θεός sem artigo = natureza divina"]
  }
,
  {
    ref: "Jo 1:14",
    livro: "João",
    traducao: "E o Verbo se fez carne, e habitou entre nós, e vimos a sua glória, como a glária do Unigênito do Pai.",
    grego: "καὶ ὁ λόγος σὰρξ ἐγένετο καὶ ἐσκήνωσεν ἐν ἡμῖν, καὶ ἐθεασάμεθα τὴν δόξαν αὐτοῦ, δόξαν ὡς μονογενοῦς παρὰ πατρός.",
    diagrama: [
      {id: "jo114-1", type: "subject", text: "o Verbo (ὁ λόγος)", greek: "ὁ λόγος", strong: "G3056"},
      {id: "jo114-2", type: "predicate", text: "se fez (ἐγένετο)", greek: "ἐγένετο", strong: "G1096", children: [
        {id: "jo114-2a", type: "complement", text: "carne (σάρξ)", greek: "σάρξ", strong: "G4561"}
      ]},
      {id: "jo114-3", type: "conjunction", text: "e (καί)", greek: "καί", strong: "G2532"},
      {id: "jo114-4", type: "predicate", text: "habitou (ἐσκήνωσεν)", greek: "ἐσκήνωσεν", strong: "G4637", children: [
        {id: "jo114-4a", type: "adverbial", text: "entre nós (ἐν ἡμῖν)", greek: "ἐν ἡμῖν", strong: "G1722"}
      ]},
      {id: "jo114-5", type: "conjunction", text: "e (καί)", greek: "καί", strong: "G2532"},
      {id: "jo114-6", type: "predicate", text: "vimos (ἐθεασάμεθα)", greek: "ἐθεασάμεθα", strong: "G2334", children: [
        {id: "jo114-6a", type: "object", text: "a sua glória (τὴν δόξαν αὐτοῦ)", greek: "τὴν δόξαν αὐτοῦ", strong: "G1391"}
      ]}
    ],
    explicacao: "σάρξ ἐγένετο = carne se fez (incarnação). ἐσκήνωσεν = tabernaculou (do mesmo radical de σκηνή = tenda, tabernáculo). ἐθεασάμεθα = contemplamos (testemunha ocular). A glória do Unigênito.",
    notas: ["σάρξ = carne (humanidade)", "ἐγένετο = aoristo médio de γίνομαι (tornou-se)", "ἐσκήνωσεν = aoristo ativo de σκηνόω (tabernacular)", "μονογενοῦς = Unigênito (único)"]
  }
,
  {
    ref: "Jo 3:16",
    livro: "João",
    traducao: "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.",
    grego: "οὕτως γὰρ ἠγάπησεν ὁ θεὸς τὸν κόσμον ὥστε τὸν υἱὸν αὐτοῦ τὸν μονογενῆ ἔδωκεν, ἵνα πᾶς ὁ πιστεύων εἰς αὐτὸν μὴ ἀπόληται ἀλλ᾽ ἔχῃ ζωὴν αἰώνιον.",
    diagrama: [
      {id: "jo316-1", type: "adverbial", text: "de tal maneira (οὕτως)", greek: "οὕτως", strong: "G3779"},
      {id: "jo316-2", type: "conjunction", text: "porque (γάρ)", greek: "γάρ", strong: "G1063"},
      {id: "jo316-3", type: "subject", text: "Deus (ὁ θεός)", greek: "ὁ θεός", strong: "G2316"},
      {id: "jo316-4", type: "predicate", text: "amou (ἠγάπησεν)", greek: "ἠγάπησεν", strong: "G25", children: [
        {id: "jo316-4a", type: "object", text: "o mundo (τὸν κόσμον)", greek: "τὸν κόσμον", strong: "G2889"},
        {id: "jo316-4b", type: "complement", text: "de tal maneira que (ὥστε)", greek: "ὥστε", strong: "G5620"}
      ]},
      {id: "jo316-5", type: "predicate", text: "deu (ἔδωκεν)", greek: "ἔδωκεν", strong: "G1325", children: [
        {id: "jo316-5a", type: "object", text: "o seu Filho unigênito (τὸν υἱὸν αὐτοῦ τὸν μονογενῆ)", greek: "τὸν υἱὸν αὐτοῦ τὸν μονογενῆ", strong: "G3439"}
      ]},
      {id: "jo316-6", type: "complement", text: "para que (ἵνα)", greek: "ἵνα", strong: "G2443", children: [
        {id: "jo316-6a", type: "subject", text: "todo aquele que crê (πᾶς ὁ πιστεύων)", greek: "πᾶς ὁ πιστεύων", strong: "G4100"},
        {id: "jo316-6b", type: "predicate", text: "não pereça (μὴ ἀπόληται)", greek: "μὴ ἀπόληται", strong: "G622"},
        {id: "jo316-6c", type: "conjunction", text: "mas (ἀλλ᾽)", greek: "ἀλλ᾽", strong: "G235"},
        {id: "jo316-6d", type: "predicate", text: "tenha (ἔχῃ)", greek: "ἔχῃ", strong: "G2192", children: [
          {id: "jo316-6d1", type: "object", text: "vida eterna (ζωὴν αἰώνιον)", greek: "ζωὴν αἰώνιον", strong: "G2222"}
        ]}
      ]}
    ],
    explicacao: "Versículo mais conhecido do cristianismo. οὕτως = assim, desta forma (intensidade do amor). ἠγάπησεν = aoristo (ponto histórico). ὥστε + infinitivo = resultado. ἵνα + subjuntivo = propósito. μονογενῆ = unigênito (único de sua espécie).",
    notas: ["οὕτως = assim, desta maneira", "ἠγάπησεν = aoristo ativo de ἀγαπάω", "μονογενῆ = unigênito (μόνος + γένος)", "ζωὴν αἰώνιον = vida eterna (qualidade de vida divina)"]
  }
,
  {
    ref: "Jo 6:35",
    livro: "João",
    traducao: "E Jesus lhes disse: Eu sou o pão da vida; quem vem a mim nunca terá fome, e quem crê em mim jamais terá sede.",
    grego: "καὶ εἶπεν αὐτοῖς ὁ Ἰησοῦς· ἐγώ εἰμι ὁ ἄρτος τῆς ζωῆς· ὁ ἐρχόμενος πρός με οὐ μὴ πεινάσῃ, καὶ ὁ πιστεύων εἰς ἐμὲ οὐ μὴ διψήσει πώποτε.",
    diagrama: [
      {id: "jo635-1", type: "predicate", text: "disse (εἶπεν)", greek: "εἶπεν", strong: "G2036", children: [
        {id: "jo635-1a", type: "subject", text: "Jesus (ὁ Ἰησοῦς)", greek: "ὁ Ἰησοῦς", strong: "G2424"},
        {id: "jo635-1b", type: "dative", text: "a eles (αὐτοῖς)", greek: "αὐτοῖς", strong: "G846"}
      ]},
      {id: "jo635-2", type: "subject", text: "Eu (ἐγώ)", greek: "ἐγώ", strong: "G1473"},
      {id: "jo635-3", type: "predicate", text: "sou (εἰμί)", greek: "εἰμί", strong: "G2076", children: [
        {id: "jo635-3a", type: "complement", text: "o pão da vida (ὁ ἄρτος τῆς ζωῆς)", greek: "ὁ ἄρτος τῆς ζωῆς", strong: "G740"}
      ]},
      {id: "jo635-4", type: "subject", text: "quem vem (ὁ ἐρχόμενος)", greek: "ὁ ἐρχόμενος", strong: "G2064", children: [
        {id: "jo635-4a", type: "adverbial", text: "a mim (πρός με)", greek: "πρός με", strong: "G4314"},
        {id: "jo635-4b", type: "predicate", text: "nunca terá fome (οὐ μὴ πεινάσῃ)", greek: "οὐ μὴ πεινάσῃ", strong: "G3983"}
      ]},
      {id: "jo635-5", type: "subject", text: "quem crê (ὁ πιστεύων)", greek: "ὁ πιστεύων", strong: "G4100", children: [
        {id: "jo635-5a", type: "adverbial", text: "em mim (εἰς ἐμέ)", greek: "εἰς ἐμέ", strong: "G1519"},
        {id: "jo635-5b", type: "predicate", text: "jamais terá sede (οὐ μὴ διψήσει πώποτε)", greek: "οὐ μὴ διψήσει πώποτε", strong: "G1372"}
      ]}
    ],
    explicacao: "Primeira declaração 'Eu sou' (ἐγώ εἰμί). ἄρτος τῆς ζωῆς = pão da vida (maná celestial). οὐ μή + subjuntivo = negação enfática (jamais). O pão que satisfaz eternamente.",
    notas: ["ἐγώ εἰμί = Eu sou (declaração divina)", "ἄρτος = pão (alimento)", "πεινάσῃ = futuro de πεινάω (ter fome)", "διψήσει = futuro de διψάω (ter sede)"]
  }
,
  {
    ref: "Jo 8:12",
    livro: "João",
    traducao: "Então Jesus falou-lhes outra vez: Eu sou a luz do mundo; quem me segue não andará em trevas, mas terá a luz da vida.",
    grego: "πάλιν αὐτοῖς ἐλάλησεν ὁ Ἰησοῦς λέγων· ἐγώ εἰμι τὸ φῶς τοῦ κόσμου· ὁ ἀκολουθῶν ἐμοὶ οὐ μὴ περιπατήσῃ ἐν τῇ σκοτίᾳ ἀλλ᾽ ἕξει τὸ φῶς τῆς ζωῆς.",
    diagrama: [
      {id: "jo812-1", type: "predicate", text: "falou (ἐλάλησεν)", greek: "ἐλάλησεν", strong: "G2980", children: [
        {id: "jo812-1a", type: "subject", text: "Jesus (ὁ Ἰησοῦς)", greek: "ὁ Ἰησοῦς", strong: "G2424"},
        {id: "jo812-1b", type: "dative", text: "a eles (αὐτοῖς)", greek: "αὐτοῖς", strong: "G846"}
      ]},
      {id: "jo812-2", type: "adverbial", text: "outra vez (πάλιν)", greek: "πάλιν", strong: "G3819"},
      {id: "jo812-3", type: "subject", text: "Eu (ἐγώ)", greek: "ἐγώ", strong: "G1473"},
      {id: "jo812-4", type: "predicate", text: "sou (εἰμί)", greek: "εἰμί", strong: "G2076", children: [
        {id: "jo812-4a", type: "complement", text: "a luz do mundo (τὸ φῶς τοῦ κόσμου)", greek: "τὸ φῶς τοῦ κόσμου", strong: "G5457"}
      ]},
      {id: "jo812-5", type: "subject", text: "quem me segue (ὁ ἀκολουθῶν ἐμοί)", greek: "ὁ ἀκολουθῶν ἐμοί", strong: "G190", children: [
        {id: "jo812-5a", type: "predicate", text: "não andará (οὐ μὴ περιπατήσῃ)", greek: "οὐ μὴ περιπατήσῃ", strong: "G4043", children: [
          {id: "jo812-5a1", type: "adverbial", text: "em trevas (ἐν τῇ σκοτίᾳ)", greek: "ἐν τῇ σκοτίᾳ", strong: "G4653"}
        ]},
        {id: "jo812-5b", type: "conjunction", text: "mas (ἀλλ᾽)", greek: "ἀλλ᾽", strong: "G235"},
        {id: "jo812-5c", type: "predicate", text: "terá (ἕξει)", greek: "ἕξει", strong: "G2192", children: [
          {id: "jo812-5c1", type: "object", text: "a luz da vida (τὸ φῶς τῆς ζωῆς)", greek: "τὸ φῶς τῆς ζωῆς", strong: "G5457"}
        ]}
      ]}
    ],
    explicacao: "Segunda declaração 'Eu sou'. φῶς τοῦ κόσμou = luz do mundo (universalidade). ὁ ἀκολουθῶν = particípio presente (quem segue continuamente). Contraste trevas vs luz da vida.",
    notas: ["πάλιν = outra vez, novamente", "ἀκολουθῶν = particípio presente de ἀκολουθέω (seguir)", "περιπατήσῃ = subjuntivo aoristo de περιπατέω (andar)", "σκοτία = trevas, escuridão"]
  }
,
  {
    ref: "Jo 8:32",
    livro: "João",
    traducao: "E conhecereis a verdade, e a verdade vos libertará.",
    grego: "καὶ γνώσεσθε τὴν ἀλήθειαν, καὶ ἡ ἀλήθεια ἐλευθερώσει ὑμᾶς.",
    diagrama: [
      {id: "jo832-1", type: "conjunction", text: "e (καί)", greek: "καί", strong: "G2532"},
      {id: "jo832-2", type: "predicate", text: "conhecereis (γνώσεσθε)", greek: "γνώσεσθε", strong: "G1097", children: [
        {id: "jo832-2a", type: "object", text: "a verdade (τὴν ἀλήθειαν)", greek: "τὴν ἀλήθειαν", strong: "G225"}
      ]},
      {id: "jo832-3", type: "conjunction", text: "e (καί)", greek: "καί", strong: "G2532"},
      {id: "jo832-4", type: "subject", text: "a verdade (ἡ ἀλήθεια)", greek: "ἡ ἀλήθεια", strong: "G225"},
      {id: "jo832-5", type: "predicate", text: "vos libertará (ἐλευθερώσει ὑμᾶς)", greek: "ἐλευθερώσει ὑμᾶς", strong: "G1659", children: [
        {id: "jo832-5a", type: "dative", text: "vós (ὑμᾶς)", greek: "ὑμᾶς", strong: "G4771"}
      ]}
    ],
    explicacao: "γνώσεσθε = futuro médio de γινώσκω (conhecereis por experiência). A verdade (conceito personificado) liberta. ἐλευθερώσει = futuro ativo de ἐλευθερόω (libertar da escravidão do pecado).",
    notas: ["γνώσεσθε = futuro médio de γινώσκω", "ἀλήθεια = verdade (realidade divina)", "ἐλευθερώσει = futuro de ἐλευθερόω (tornar livre)", "Libertação do pecado (v.36)"]
  }
,
  {
    ref: "Jo 8:36",
    livro: "João",
    traducao: "Se, pois, o Filho vos libertar, verdadeiramente sereis livres.",
    grego: "ἐὰν οὖν ὁ υἱὸς ὑμᾶς ἐλευθερώσῃ, ὄντως ἐλεύθεροι ἔσεσθε.",
    diagrama: [
      {id: "jo836-1", type: "conjunction", text: "se (ἐάν)", greek: "ἐάν", strong: "G1437"},
      {id: "jo836-2", type: "conjunction", text: "pois (οὖν)", greek: "οὖν", strong: "G3767"},
      {id: "jo836-3", type: "subject", text: "o Filho (ὁ υἱός)", greek: "ὁ υἱός", strong: "G5207"},
      {id: "jo836-4", type: "predicate", text: "vos libertar (ἐλευθερώσῃ)", greek: "ἐλευθερώσῃ", strong: "G1659", children: [
        {id: "jo836-4a", type: "dative", text: "vós (ὑμᾶς)", greek: "ὑμᾶς", strong: "G4771"}
      ]},
      {id: "jo836-5", type: "adverbial", text: "verdadeiramente (ὄντως)", greek: "ὄντως", strong: "G3689"},
      {id: "jo836-6", type: "predicate", text: "sereis (ἔσεσθε)", greek: "ἔσεσθε", strong: "G1510", children: [
        {id: "jo836-6a", type: "complement", text: "livres (ἐλεύθεροι)", greek: "ἐλεύθεροι", strong: "G1658"}
      ]}
    ],
    explicacao: "ἐάν + subjuntivo = condição (se o Filho libertar). ὄντως = verdadeiramente (liberdade real, não ilusória). A libertação do Filho é mais profunda que a política.",
    notas: ["ἐάν = se (condicional)", "ἐλευθερώσῃ = subjuntivo aoristo de ἐλευθερόω", "ὄντως = realmente, verdadeiramente", "ἐλεύθεροι = livres (adjetivo)"]
  }
,
  {
    ref: "Jo 10:11",
    livro: "João",
    traducao: "Eu sou o bom pastor. O bom pastor dá a sua vida pelas ovelhas.",
    grego: "ἐγώ εἰμι ὁ ποιμὴν ὁ καλός. ὁ ποιμὴν ὁ καλὸς τὴν ψυχὴν αὐτοῦ τίθησιν ὑπὲρ τῶν προβάτων.",
    diagrama: [
      {id: "jo1011-1", type: "subject", text: "Eu (ἐγώ)", greek: "ἐγώ", strong: "G1473"},
      {id: "jo1011-2", type: "predicate", text: "sou (εἰμί)", greek: "εἰμί", strong: "G2076", children: [
        {id: "jo1011-2a", type: "complement", text: "o bom pastor (ὁ ποιμὴν ὁ καλός)", greek: "ὁ ποιμὴν ὁ καλός", strong: "G4166"}
      ]},
      {id: "jo1011-3", type: "subject", text: "o bom pastor (ὁ ποιμὴν ὁ καλός)", greek: "ὁ ποιμὴν ὁ καλός", strong: "G4166"},
      {id: "jo1011-4", type: "predicate", text: "põe (τίθησιν)", greek: "τίθησιν", strong: "G5087", children: [
        {id: "jo1011-4a", type: "object", text: "a sua vida (τὴν ψυχὴν αὐτοῦ)", greek: "τὴν ψυχὴν αὐτοῦ", strong: "G5590"},
        {id: "jo1011-4b", type: "adverbial", text: "pelas ovelhas (ὑπὲρ τῶν προβάτων)", greek: "ὑπὲρ τῶν προβάτων", strong: "G4263"}
      ]}
    ],
    explicacao: "Terceira declaração 'Eu sou'. ποιμὴν ὁ καλός = pastor bom (qualidade moral). τίθησιν = coloca, põe (deliberadamente). ὑπέρ = em favor de, por causa de. O pastor sacrificial.",
    notas: ["ποιμήν = pastor (cuidador de ovelhas)", "καλός = bom (belo, excelente)", "τίθησιν = presente ativo de τίθημι (pôr)", "ὑπέρ = por (em favor de)"]
  }
,
  {
    ref: "Jo 11:25",
    livro: "João",
    traducao: "Jesus disse-lhe: Eu sou a ressurreição e a vida; quem crê em mim, ainda que morra, viverá.",
    grego: "εἶπεν αὐτῇ ὁ Ἰησοῦς· ἐγώ εἰμι ἡ ἀνάστασις καὶ ἡ ζωή· ὁ πιστεύων εἰς ἐμὲ κἂν ἀποθάνῃ ζήσει.",
    diagrama: [
      {id: "jo1125-1", type: "predicate", text: "disse (εἶπεν)", greek: "εἶπεν", strong: "G2036", children: [
        {id: "jo1125-1a", type: "subject", text: "Jesus (ὁ Ἰησοῦς)", greek: "ὁ Ἰησοῦς", strong: "G2424"},
        {id: "jo1125-1b", type: "dative", text: "a ela (αὐτῇ)", greek: "αὐτῇ", strong: "G846"}
      ]},
      {id: "jo1125-2", type: "subject", text: "Eu (ἐγώ)", greek: "ἐγώ", strong: "G1473"},
      {id: "jo1125-3", type: "predicate", text: "sou (εἰμί)", greek: "εἰμί", strong: "G2076", children: [
        {id: "jo1125-3a", type: "complement", text: "a ressurreição e a vida (ἡ ἀνάστασις καὶ ἡ ζωή)", greek: "ἡ ἀνάστασις καὶ ἡ ζωή", strong: "G386"}
      ]},
      {id: "jo1125-4", type: "subject", text: "quem crê (ὁ πιστεύων)", greek: "ὁ πιστεύων", strong: "G4100", children: [
        {id: "jo1125-4a", type: "adverbial", text: "em mim (εἰς ἐμέ)", greek: "εἰς ἐμέ", strong: "G1519"},
        {id: "jo1125-4b", type: "complement", text: "ainda que morra (κἂν ἀποθάνῃ)", greek: "κἂν ἀποθάνῃ", strong: "G599"},
        {id: "jo1125-4c", type: "predicate", text: "viverá (ζήσει)", greek: "ζήσει", strong: "G2198"}
      ]}
    ],
    explicacao: "Quarta declaração 'Eu sou'. Jesus = ressurreição (não apenas a tem). κἂν = mesmo que (καί + ἐάν). ἀποθάνῃ = subjuntivo aoristo (morrer). ζήσει = viverá (vida eterna, não apenas ressurreição futura).",
    notas: ["ἀνάστασις = ressurreição (levantar-se)", "ζωή = vida (qualidade divina)", "κἂν = mesmo que, ainda que", "ζήσει = futuro de ζάω (viver)"]
  }
,
  {
    ref: "Jo 14:6",
    livro: "João",
    traducao: "Jesus disse-lhe: Eu sou o caminho, e a verdade, e a vida; ninguém vem ao Pai senão por mim.",
    grego: "λέγει αὐτῷ ὁ Ἰησοῦς· ἐγώ εἰμι ἡ ὁδὸς καὶ ἡ ἀλήθεια καὶ ἡ ζωή· οὐδεὶς ἔρχεται πρὸς τὸν πατέρα εἰ μὴ δι᾽ ἐμοῦ.",
    diagrama: [
      {id: "jo146-1", type: "predicate", text: "diz (λέγει)", greek: "λέγει", strong: "G3004", children: [
        {id: "jo146-1a", type: "subject", text: "Jesus (ὁ Ἰησοῦς)", greek: "ὁ Ἰησοῦς", strong: "G2424"},
        {id: "jo146-1b", type: "dative", text: "a ele (αὐτῷ)", greek: "αὐτῷ", strong: "G846"}
      ]},
      {id: "jo146-2", type: "subject", text: "Eu (ἐγώ)", greek: "ἐγώ", strong: "G1473"},
      {id: "jo146-3", type: "predicate", text: "sou (εἰμί)", greek: "εἰμί", strong: "G2076", children: [
        {id: "jo146-3a", type: "complement", text: "o caminho (ἡ ὁδός)", greek: "ἡ ὁδός", strong: "G3598"},
        {id: "jo146-3b", type: "conjunction", text: "e (καί)", greek: "καί", strong: "G2532"},
        {id: "jo146-3c", type: "complement", text: "a verdade (ἡ ἀλήθεια)", greek: "ἡ ἀλήθεια", strong: "G225"},
        {id: "jo146-3d", type: "conjunction", text: "e (καί)", greek: "καί", strong: "G2532"},
        {id: "jo146-3e", type: "complement", text: "a vida (ἡ ζωή)", greek: "ἡ ζωή", strong: "G2222"}
      ]},
      {id: "jo146-4", type: "subject", text: "ninguém (οὐδείς)", greek: "οὐδείς", strong: "G3762"},
      {id: "jo146-5", type: "predicate", text: "vem (ἔρχεται)", greek: "ἔρχεται", strong: "G2064", children: [
        {id: "jo146-5a", type: "adverbial", text: "ao Pai (πρὸς τὸν πατέρα)", greek: "πρὸς τὸν πατέρα", strong: "G3962"},
        {id: "jo146-5b", type: "adverbial", text: "senão por mim (εἰ μὴ δι᾽ ἐμοῦ)", greek: "εἰ μὴ δι᾽ ἐμοῦ", strong: "G1223"}
      ]}
    ],
    explicacao: "Quinta declaração 'Eu sou' (a mais completa). ὁδός = caminho (acesso). ἀλήθεια = verdade (revelação). ζωή = vida (eterna). εἰ μή = exceto. A exclusividade de Cristo como único caminho ao Pai.",
    notas: ["ὁδός = caminho, via", "εἰ μή = senão, exceto", "δι᾽ ἐμοῦ = por mim (mediador)"]
  }
,
  {
    ref: "Jo 15:5",
    livro: "João",
    traducao: "Eu sou a vide, vós as varas. Quem permanece em mim, e eu nele, esse dá muito fruto, porque sem mim nada podeis fazer.",
    grego: "ἐγώ εἰμι ἡ ἄμπελος καὶ ὑμεῖς τὰ κλήματα. ὁ μένων ἐν ἐμοὶ κἀγὼ ἐν αὐτῷ οὗτος φέρει καρπὸν πολύν, χωρὶς γὰρ ἐμοῦ οὐ δύνασθε ποιεῖν οὐδέν.",
    diagrama: [
      {id: "jo155-1", type: "subject", text: "Eu (ἐγώ)", greek: "ἐγώ", strong: "G1473"},
      {id: "jo155-2", type: "predicate", text: "sou (εἰμί)", greek: "εἰμί", strong: "G2076", children: [
        {id: "jo155-2a", type: "complement", text: "a vide (ἡ ἄμπελος)", greek: "ἡ ἄμπελος", strong: "G288"},
        {id: "jo155-2b", type: "conjunction", text: "e (καί)", greek: "καί", strong: "G2532"},
        {id: "jo155-2c", type: "complement", text: "vós as varas (ὑμεῖς τὰ κλήματα)", greek: "ὑμεῖς τὰ κλήματα", strong: "G2814"}
      ]},
      {id: "jo155-3", type: "subject", text: "quem permanece (ὁ μένων)", greek: "ὁ μένων", strong: "G3306", children: [
        {id: "jo155-3a", type: "adverbial", text: "em mim (ἐν ἐμοί)", greek: "ἐν ἐμοί", strong: "G1722"},
        {id: "jo155-3b", type: "conjunction", text: "e eu (κἀγώ)", greek: "κἀγώ", strong: "G1473"},
        {id: "jo155-3c", type: "adverbial", text: "nele (ἐν αὐτῷ)", greek: "ἐν αὐτῷ", strong: "G1722"}
      ]},
      {id: "jo155-4", type: "predicate", text: "dá (φέρει)", greek: "φέρει", strong: "G5342", children: [
        {id: "jo155-4a", type: "object", text: "muito fruto (καρπὸν πολύν)", greek: "καρπὸν πολύν", strong: "G2590"}
      ]},
      {id: "jo155-5", type: "conjunction", text: "porque (γάρ)", greek: "γάρ", strong: "G1063"},
      {id: "jo155-6", type: "predicate", text: "nada podeis (οὐ δύνασθε οὐδέν)", greek: "οὐ δύνασθε οὐδέν", strong: "G1410", children: [
        {id: "jo155-6a", type: "adverbial", text: "sem mim (χωρὶς ἐμοῦ)", greek: "χωρὶς ἐμοῦ", strong: "G5565"}
      ]}
    ],
    explicacao: "Sexta declaração 'Eu sou'. ἄμπελος = vide (Israel no VT). κλήματα = varas (ramos). μένων = permanece (relação contínua). φέρει = produz (fruto natural). χωρίς = sem (dependência total).",
    notas: ["ἄμπελος = vide (planta frutífera)", "κλήματα = varas, ramos", "μένων = particípio presente de μένω (permanecer)", "καρπόν = fruto"]
  }
,
  {
    ref: "Jo 15:13",
    livro: "João",
    traducao: "Ninguém tem maior amor do que este: que alguém ponha a sua vida pelos seus amigos.",
    grego: "μείζονα ταύτης ἀγάπην οὐδεὶς ἔχει ἵνα τις τὴν ψυχὴν αὐτοῦ θῇ ὑπὲρ τῶν φίλων αὐτοῦ.",
    diagrama: [
      {id: "jo1513-1", type: "subject", text: "ninguém (οὐδείς)", greek: "οὐδείς", strong: "G3762"},
      {id: "jo1513-2", type: "predicate", text: "tem (ἔχει)", greek: "ἔχει", strong: "G2192", children: [
        {id: "jo1513-2a", type: "object", text: "maior amor (μείζονα ἀγάπην)", greek: "μείζονα ἀγάπην", strong: "G26", children: [
          {id: "jo1513-2a1", type: "modifier", text: "deste (ταύτης)", greek: "ταύτης", strong: "G3778"}
        ]}
      ]},
      {id: "jo1513-3", type: "complement", text: "para que (ἵνα)", greek: "ἵνα", strong: "G2443", children: [
        {id: "jo1513-3a", type: "subject", text: "alguém (τις)", greek: "τις", strong: "G5100"},
        {id: "jo1513-3b", type: "predicate", text: "ponha (θῇ)", greek: "θῇ", strong: "G5087", children: [
          {id: "jo1513-3b1", type: "object", text: "a sua vida (τὴν ψυχὴν αὐτοῦ)", greek: "τὴν ψυχὴν αὐτοῦ", strong: "G5590"},
          {id: "jo1513-3b2", type: "adverbial", text: "pelos amigos (ὑπὲρ τῶν φίλων αὐτοῦ)", greek: "ὑπὲρ τῶν φίλων αὐτοῦ", strong: "G5384"}
        ]}
      ]}
    ],
    explicacao: "Comparativo: μείζονα = maior (acusativo). ταύτης = desta (demonstrativo). θῇ = subjuntivo aoristo (ponha, sacrifício voluntário). O amor máximo é o sacrifício. Aplica-se a Cristo e aos discípulos.",
    notas: ["μείζονα = maior (comparativo de μέγας)", "ἀγάπην = amor (sacrificial)", "θῇ = subjuntivo aoristo de τίθημι (pôr, depositar)", "φίλων = amigos (relação mútua)"]
  }
,
  {
    ref: "At 1:8",
    livro: "Atos",
    traducao: "Mas recebereis poder, quando o Espírito Santo vier sobre vós, e sereis minhas testemunhas em Jerusalém, e em toda a Judeia, e na Samaria, e até os confins da terra.",
    grego: "ἀλλὰ λήμψεσθε δύναμιν ἐπελθόντος τοῦ ἁγίου πνεύματος ἐφ᾽ ὑμᾶς, καὶ ἔσεσθέ μου μάρτυρες ἔν τε Ἰερουσαλὴμ καὶ ἐν πάσῃ τῇ Ἰουδαίᾳ καὶ Σαμαρείᾳ καὶ ἕως ἐσχάτου τῆς γῆς.",
    diagrama: [
      {id: "at18-1", type: "conjunction", text: "mas (ἀλλά)", greek: "ἀλλά", strong: "G235"},
      {id: "at18-2", type: "predicate", text: "recebereis (λήμψεσθε)", greek: "λήμψεσθε", strong: "G2983", children: [
        {id: "at18-2a", type: "object", text: "poder (δύναμιν)", greek: "δύναμιν", strong: "G1411"}
      ]},
      {id: "at18-3", type: "adverbial", text: "quando vier (ἐπελθόντος)", greek: "ἐπελθόντος", strong: "G1904", children: [
        {id: "at18-3a", type: "subject", text: "o Espírito Santo (τοῦ ἁγίου πνεύματος)", greek: "τοῦ ἁγίου πνεύματος", strong: "G4151"},
        {id: "at18-3b", type: "adverbial", text: "sobre vós (ἐφ᾽ ὑμᾶς)", greek: "ἐφ᾽ ὑμᾶς", strong: "G1909"}
      ]},
      {id: "at18-4", type: "predicate", text: "sereis (ἔσεσθέ)", greek: "ἔσεσθέ", strong: "G1510", children: [
        {id: "at18-4a", type: "complement", text: "minhas testemunhas (μου μάρτυρες)", greek: "μου μάρτυρες", strong: "G3144"}
      ]},
      {id: "at18-5", type: "adverbial", text: "em Jerusalém (ἔν τε Ἰερουσαλήμ)", greek: "ἔν τε Ἰερουσαλήμ", strong: "G2419", children: [
        {id: "at18-5a", type: "conjunction", text: "e (τε)", greek: "τε", strong: "G5037"},
        {id: "at18-5b", type: "adverbial", text: "e na Judeia (καὶ ἐν πάσῃ τῇ Ἰουδαίᾳ)", greek: "καὶ ἐν πάσῃ τῇ Ἰουδαίᾳ", strong: "G2449"},
        {id: "at18-5c", type: "adverbial", text: "e na Samaria (καὶ Σαμαρείᾳ)", greek: "καὶ Σαμαρείᾳ", strong: "G4540"},
        {id: "at18-5d", type: "adverbial", text: "até os confins (ἕως ἐσχάτου)", greek: "ἕως ἐσχάτου", strong: "G206"}
      ]}
    ],
    explicacao: "Última promessa de Jesus antes da ascensão. λήμψεσθε = futuro médio (recebereis como dom). ἐπελθόντος = genitivo absoluto (quando vier). Progressão geográfica: Jerusalém → Judeia → Samaria → terra. Missão universal.",
    notas: ["λήμψεσθε = futuro médio de λαμβάνω (receber)", "δύναμιν = poder, força (dona espiritual)", "μάρτυρες = testemunhas (martírio)", "ἕως ἐσχάτου = até o último lugar"]
  }
,
  {
    ref: "At 2:38",
    livro: "Atos",
    traducao: "Pedro disse-lhes: Arrependei-vos, e cada um de vós seja baptizado em nome de Jesus Cristo, para o perdão dos vossos pecados; e recebereis o dom do Espírito Santo.",
    grego: "εἶπεν δὲ αὐτοῖς· μετανοήσατε καὶ βαπτισθήτω ἕκαστος ὑμῶν ἐπὶ τῷ ὀνόματι Ἰησοῦ Χριστοῦ εἰς ἄφεσιν τῶν ἁμαρτιῶν ὑμῶν, καὶ λήμψεσθε τὴν δωρεὰν τοῦ ἁγίου πνεύματος.",
    diagrama: [
      {id: "at238-1", type: "predicate", text: "disse (εἶπεν)", greek: "εἶπεν", strong: "G2036", children: [
        {id: "at238-1a", type: "subject", text: "Pedro (Πέτρος)", greek: "Πέτρος", strong: "G4074"},
        {id: "at238-1b", type: "dative", text: "a eles (αὐτοῖς)", greek: "αὐτοῖς", strong: "G846"}
      ]},
      {id: "at238-2", type: "predicate", text: "Arrependei-vos (μετανοήσατε)", greek: "μετανοήσατε", strong: "G3340"},
      {id: "at238-3", type: "conjunction", text: "e (καί)", greek: "καί", strong: "G2532"},
      {id: "at238-4", type: "predicate", text: "seja baptizado (βαπτισθήτω)", greek: "βαπτισθήτω", strong: "G907", children: [
        {id: "at238-4a", type: "subject", text: "cada um (ἕκαστος)", greek: "ἕκαστος", strong: "G1538"},
        {id: "at238-4b", type: "adverbial", text: "em nome de Jesus (ἐπὶ τῷ ὀνόματι Ἰησοῦ)", greek: "ἐπὶ τῷ ὀνόματι Ἰησοῦ", strong: "G3686"},
        {id: "at238-4c", type: "complement", text: "para o perdão (εἰς ἄφεσιν)", greek: "εἰς ἄφεσιν", strong: "G859"}
      ]},
      {id: "at238-5", type: "conjunction", text: "e (καί)", greek: "καί", strong: "G2532"},
      {id: "at238-6", type: "predicate", text: "recebereis (λήμψεσθε)", greek: "λήμψεσθε", strong: "G2983", children: [
        {id: "at238-6a", type: "object", text: "o dom do Espírito Santo (τὴν δωρεὰν τοῦ ἁγίου πνεύματος)", greek: "τὴν δωρεὰν τοῦ ἁγίου πνεύματος", strong: "G1432"}
      ]}
    ],
    explicacao: "Três imperativos: μετανοήσατε (arrependei-vos), βαπτισθήτω (seja baptizado), λήμψεσθε (recebereis). Ordem: arrependimento → batismo → dom do Espírito. εἰς ἄφεσιν = para o perdão (finalidade).",
    notas: ["μετανοήσατε = aoristo imperativo de μετανοέω (arrepender-se)", "βαπτισθήτω = aoristo passivo imperativo de βαπτίζω", "δωρεάν = dom, dádiva", "ἄφεσιν = perdão, remissão"]
  }
,
  {
    ref: "Rm 1:16",
    livro: "Romanos",
    traducao: "Porque eu não me envergonho do evangelho, porque é o poder de Deus para a salvação de todo aquele que crê, primeiro do judeu, e também do grego.",
    grego: "οὐ γὰρ ἐπαισχύνομαι τὸ εὐαγγέλιον, δύναμιν γὰρ θεοῦ ἐστιν εἰς σωτηρίαν παντὶ τῷ πιστεύοντι, Ἰουδαίῳ τε πρῶτον καὶ Ἕλληνι.",
    diagrama: [
      {id: "rm116-1", type: "conjunction", text: "porque (γάρ)", greek: "γάρ", strong: "G1063"},
      {id: "rm116-2", type: "predicate", text: "não me envergonho (οὐ ἐπαισχύνομαι)", greek: "οὐ ἐπαισχύνομαι", strong: "G1870", children: [
        {id: "rm116-2a", type: "object", text: "do evangelho (τὸ εὐαγγέλιον)", greek: "τὸ εὐαγγέλιον", strong: "G2098"}
      ]},
      {id: "rm116-3", type: "conjunction", text: "porque (γάρ)", greek: "γάρ", strong: "G1063"},
      {id: "rm116-4", type: "predicate", text: "é (ἐστιν)", greek: "ἐστιν", strong: "G2076", children: [
        {id: "rm116-4a", type: "complement", text: "o poder de Deus (δύναμιν θεοῦ)", greek: "δύναμιν θεοῦ", strong: "G1411"},
        {id: "rm116-4b", type: "complement", text: "para a salvação (εἰς σωτηρίαν)", greek: "εἰς σωτηρίαν", strong: "G4991"},
        {id: "rm116-4c", type: "dative", text: "a todo o que crê (παντὶ τῷ πιστεύοντι)", greek: "παντὶ τῷ πιστεύοντι", strong: "G4100"}
      ]},
      {id: "rm116-5", type: "adverbial", text: "primeiro do judeu (Ἰουδαίῳ τε πρῶτον)", greek: "Ἰουδαίῳ τε πρῶτον", strong: "G2453", children: [
        {id: "rm116-5a", type: "conjunction", text: "e também (τε)", greek: "τε", strong: "G5037"},
        {id: "rm116-5b", type: "adverbial", text: "do grego (καὶ Ἕλληνι)", greek: "καὶ Ἕλληνι", strong: "G1672"}
      ]}
    ],
    explicacao: "Tese de Romanos: não me envergonho (presente medio, posição firme). τὸ εὐαγγέλιον = a boa-nova. δύναμιν θεοῦ = poder de Deus (não sabedoria humana). εἰς σωτηρίαν = para salvação (finalidade). Universalidade: judeu + grego.",
    notas: ["ἐπαισχύνομαι = envergonhar-se (presente)", "εὐαγγέλιον = evangelho, boa-nova", "δύναμιν = poder, força", "σωτηρίαν = salvação, libertação"]
  }
,
  {
    ref: "Rm 3:23",
    livro: "Romanos",
    traducao: "Porque todos pecaram e estão destituídos da glória de Deus.",
    grego: "πάντες γὰρ ἥμαρτον καὶ ὑστεροῦνται τῆς δόξης τοῦ θεοῦ.",
    diagrama: [
      {id: "rm323-1", type: "conjunction", text: "porque (γάρ)", greek: "γάρ", strong: "G1063"},
      {id: "rm323-2", type: "subject", text: "todos (πάντες)", greek: "πάντες", strong: "G3956"},
      {id: "rm323-3", type: "predicate", text: "pecaram (ἥμαρτον)", greek: "ἥμαρτον", strong: "G264"},
      {id: "rm323-4", type: "conjunction", text: "e (καί)", greek: "καί", strong: "G2532"},
      {id: "rm323-5", type: "predicate", text: "estão destituídos (ὑστεροῦνται)", greek: "ὑστεροῦνται", strong: "G5302", children: [
        {id: "rm323-5a", type: "genitive", text: "da glória de Deus (τῆς δόξης τοῦ θεοῦ)", greek: "τῆς δόξης τοῦ θεοῦ", strong: "G1391"}
      ]}
    ],
    explicacao: "Universalidade do pecado: πάντες = todos (sem exceção). ἥμαρτον = aoristo (pecaram, ponto único na história). ὑστεροῦντai = presente médio (carecem, estão faltos de). A glória de Deus perdida.",
    notas: ["ἥμαρτον = aoristo ativo de ἁμαρτάνω (pecar)", "ὑστεροῦνται = presente de ὑστερέω (faltar, carecer)", "δόξης = glória (esplendor, honra divina)", "πάντes = todos (universalidade)"]
  }
,
  {
    ref: "Rm 5:8",
    livro: "Romanos",
    traducao: "Mas Deus prova o seu amor para connosco, em que Cristo morreu por nós sendo ainda pecadores.",
    grego: "συνίστησιν δὲ τὴν ἀγάπην αὐτοῦ εἰς ἡμᾶς ὁ θεὸς ὅτι ἔτι ἁμαρτωλῶν ὄντων ἡμῶν Χριστὸς ὑπὲρ ἡμῶν ἀπέθανεν.",
    diagrama: [
      {id: "rm58-1", type: "conjunction", text: "mas (δέ)", greek: "δέ", strong: "G1161"},
      {id: "rm58-2", type: "subject", text: "Deus (ὁ θεός)", greek: "ὁ θεός", strong: "G2316"},
      {id: "rm58-3", type: "predicate", text: " prova (συνίστησιν)", greek: "συνίστησιν", strong: "G4921", children: [
        {id: "rm58-3a", type: "object", text: "o seu amor (τὴν ἀγάπην αὐτοῦ)", greek: "τὴν ἀγάπην αὐτοῦ", strong: "G26"},
        {id: "rm58-3b", type: "dative", text: "para connosco (εἰς ἡμᾶς)", greek: "εἰς ἡμᾶς", strong: "G1519"}
      ]},
      {id: "rm58-4", type: "conjunction", text: "porque (ὅτι)", greek: "ὅτι", strong: "G3754"},
      {id: "rm58-5", type: "adverbial", text: "sendo ainda pecadores (ἔτι ἁμαρτωλῶν ὄντων ἡμῶν)", greek: "ἔτι ἁμαρτωλῶν ὄντων ἡμῶν", strong: "G268"},
      {id: "rm58-6", type: "subject", text: "Cristo (Χριστός)", greek: "Χριστός", strong: "G5547"},
      {id: "rm58-7", type: "predicate", text: "morreu (ἀπέθανεν)", greek: "ἀπέθανεν", strong: "G599", children: [
        {id: "rm58-7a", type: "adverbial", text: "por nós (ὑπὲρ ἡμῶν)", greek: "ὑπὲρ ἡμῶν", strong: "G5228"}
      ]}
    ],
    explicacao: "Prova do amor: συνίστησιν = demonstra, prova (presente). ἁμαρτωλῶν ὄντων = genitivo absoluto (sendo pecadores). ὑπέρ ἡμῶν = por nós (em nosso favor). O amor divino é anterior ao arrependimento humano.",
    notas: ["συνίστησιν = demonstra, comprova", "ἀγάπην = amor (sacrificial)", "ἁμαρτωλῶν ὄντων = sendo pecadores (genitivo absoluto)", "ἀπέθανεν = aoristo de ἀποθνῄσκω (morreu)"]
  }
,
  {
    ref: "Rm 6:23",
    livro: "Romanos",
    traducao: "Porque o salário do pecado é a morte, mas o dom gratuito de Deus é a vida eterna em Cristo Jesus, nosso Senhor.",
    grego: "τὰ γὰρ ὀψώνια τῆς ἁμαρτίας θάνατος, τὸ δὲ χάρισμα τοῦ θεοῦ ζωὴ αἰώνιος ἐν Χριστῷ Ἰησοῦ τῷ κυρίῳ ἡμῶν.",
    diagrama: [
      {id: "rm623-1", type: "conjunction", text: "porque (γάρ)", greek: "γάρ", strong: "G1063"},
      {id: "rm623-2", type: "subject", text: "o salário do pecado (τὰ ὀψώνια τῆς ἁμαρτίας)", greek: "τὰ ὀψώνια τῆς ἁμαρτίας", strong: "G3800", children: [
        {id: "rm623-2a", type: "modifier", text: "do pecado (τῆς ἁμαρτίας)", greek: "τῆς ἁμαρτίας", strong: "G266"}
      ]},
      {id: "rm623-3", type: "predicate", text: "é (ἐστίν)", greek: "ἐστίν", strong: "G2076", children: [
        {id: "rm623-3a", type: "complement", text: "a morte (θάνατος)", greek: "θάνατος", strong: "G2288"}
      ]},
      {id: "rm623-4", type: "conjunction", text: "mas (δέ)", greek: "δέ", strong: "G1161"},
      {id: "rm623-5", type: "subject", text: "o dom gratuito de Deus (τὸ χάρισμα τοῦ θεοῦ)", greek: "τὸ χάρισμα τοῦ θεοῦ", strong: "G5486"},
      {id: "rm623-6", type: "predicate", text: "é (ἐστίν)", greek: "ἐστίν", strong: "G2076", children: [
        {id: "rm623-6a", type: "complement", text: "a vida eterna (ζωὴ αἰώνιος)", greek: "ζωὴ αἰώνιος", strong: "G2222"},
        {id: "rm623-6b", type: "adverbial", text: "em Cristo Jesus (ἐν Χριστῷ Ἰησοῦ)", greek: "ἐν Χριστῷ Ἰησοῦ", strong: "G5547"}
      ]}
    ],
    explicacao: "Contraste antitético: ὀψώνια (salário, merecimento) vs χάρισμa (dom gratuito, sem merecimento). θάνατος = morte (consequência do pecado). ζωὴ αἰώνιος = vida eterna (presente de Deus). A graça supera o merecimento.",
    notas: ["ὀψώνια = salário, remuneração (militar)", "χάρισμα = dom, dádiva (graça)", "θάνατος = morte (física + espiritual)", "ζωὴ αἰώνιος = vida eterna"]
  }
,
  {
    ref: "Rm 8:1",
    livro: "Romanos",
    traducao: "Portanto, agora nenhuma condenação há para os que estão em Cristo Jesus.",
    grego: "οὐδὲν ἄρα νῦν κατάκριμα τοῖς ἐν Χριστῷ Ἰησοῦ.",
    diagrama: [
      {id: "rm81-1", type: "subject", text: "nenhuma condenação (οὐδὲν κατάκριμα)", greek: "οὐδὲν κατάκριμα", strong: "G2631"},
      {id: "rm81-2", type: "adverbial", text: "portanto (ἄρα)", greek: "ἄρα", strong: "G686"},
      {id: "rm81-3", type: "adverbial", text: "agora (νῦν)", greek: "νῦν", strong: "G3568"},
      {id: "rm81-4", type: "dative", text: "para os que estão (τοῖς ὄντων)", greek: "τοῖς ὄντων", strong: "G1510", children: [
        {id: "rm81-4a", type: "adverbial", text: "em Cristo Jesus (ἐν Χριστῷ Ἰησοῦ)", greek: "ἐν Χριστῷ Ἰησοῦ", strong: "G5547"}
      ]}
    ],
    explicacao: "οὐδέν = nada, nenhuma (negação absoluta). κατάκριμa = condenação (veredicto judicial). ἄρα = portanto (conclusão). νῦν = agora (ponto no tempo). ἐν Χριστῷ Ἰησοῦ = posição em Cristo (união com Cristo).",
    notas: ["κατάκριμα = condenação (veredicto)", "ἐν Χριστῷ = em Cristo (união mística)", "ἄρα = portanto, então", "νῦν = agora (transformação temporal)"]
  }
,
  {
    ref: "Rm 8:28",
    livro: "Romanos",
    traducao: "E sabemos que todas as coisas contribuem juntamente para o bem daqueles que amam a Deus, daqueles que são chamados segundo o seu propósito.",
    grego: "οἴδαμεν δὲ ὅτι τοῖς ἀγαπῶσιν τὸν θεὸν πάντα συνεργεῖ εἰς ἀγαθόν, τοῖς κατὰ πρόθεσιν κλητοῖς οὖσιν.",
    diagrama: [
      {id: "rm828-1", type: "conjunction", text: "mas (δέ)", greek: "δέ", strong: "G1161"},
      {id: "rm828-2", type: "predicate", text: "sabemos (οἴδαμεν)", greek: "οἴδαμεν", strong: "G1492", children: [
        {id: "rm828-2a", type: "object", text: "que (ὅτι)", greek: "ὅτι", strong: "G3754"}
      ]},
      {id: "rm828-3", type: "dative", text: "para os que amam (τοῖς ἀγαπῶσιν)", greek: "τοῖς ἀγαπῶσιν", strong: "G25", children: [
        {id: "rm828-3a", type: "object", text: "a Deus (τὸν θεόν)", greek: "τὸν θεόν", strong: "G2316"}
      ]},
      {id: "rm828-4", type: "subject", text: "todas as coisas (πάντα)", greek: "πάντα", strong: "G3956"},
      {id: "rm828-5", type: "predicate", text: "contribuem (συνεργεῖ)", greek: "συνεργεῖ", strong: "G4903", children: [
        {id: "rm828-5a", type: "complement", text: "para o bem (εἰς ἀγαθόν)", greek: "εἰς ἀγαθόν", strong: "G18"}
      ]},
      {id: "rm828-6", type: "dative", text: "chamados segundo (κλητοῖς κατά)", greek: "κλητοῖς κατά", strong: "G2822", children: [
        {id: "rm828-6a", type: "object", text: "o seu propósito (πρόθεσιν)", greek: "πρόθεσιν", strong: "G4286"}
      ]}
    ],
    explicacao: "οἴδαμεν = sabemos (certeza). συνεργεῖ = coopera, trabalha junto (tudo cooperá). εἰς ἀγαθόν = para o bem (propósito divino). κατὰ πρόθεσιν = segundo o propósito (plano eterno de Deus).",
    notas: ["οἴδαμεν = perfeito indicativo de εἶδον (saber)", "συνεργεῖ = coopera (σύν + ἔργον)", "κλητοῖς = chamados (particípio)", "πρόθεσιν = propósito, plano"]
  }
,
  {
    ref: "Rm 8:31",
    livro: "Romanos",
    traducao: "Que diremos, pois, a estas coisas? Se Deus é por nós, quem será contra nós?",
    grego: "τί οὖν ἐροῦμεν πρὸς ταῦτα; εἰ ὁ θεὸς ὑπὲρ ἡμῶν, τίς καθ᾽ ἡμῶν;",
    diagrama: [
      {id: "rm831-1", type: "object", text: "que (τί)", greek: "τί", strong: "G5101"},
      {id: "rm831-2", type: "adverbial", text: "pois (οὖν)", greek: "οὖν", strong: "G3767"},
      {id: "rm831-3", type: "predicate", text: "diremos (ἐροῦμεν)", greek: "ἐροῦμεν", strong: "G2046", children: [
        {id: "rm831-3a", type: "adverbial", text: "a estas coisas (πρὸς ταῦτα)", greek: "πρὸς ταῦτα", strong: "G4314"}
      ]},
      {id: "rm831-4", type: "conjunction", text: "se (εἰ)", greek: "εἰ", strong: "G1487"},
      {id: "rm831-5", type: "subject", text: "Deus (ὁ θεός)", greek: "ὁ θεός", strong: "G2316"},
      {id: "rm831-6", type: "predicate", text: "é por nós (ὑπὲρ ἡμῶν)", greek: "ὑπὲρ ἡμῶν", strong: "G5228"},
      {id: "rm831-7", type: "object", text: "quem (τίς)", greek: "τίς", strong: "G5101"},
      {id: "rm831-8", type: "predicate", text: "será contra nós (καθ᾽ ἡμῶν)", greek: "καθ᾽ ἡμῶν", strong: "G2596"}
    ],
    explicacao: "Pergunta retórica: τί = o quê? A resposta é óbvia — ninguém pode contra nós. εἰ = se (condicional real). ὑπέρ ἡμῶν = por nós (a nosso favor). καθ᾽ ἡμῶν = contra nós. Triunfo cristológico.",
    notas: ["ἐροῦμεν = futuro ativo de λέγω", "ὑπὲρ ἡμῶν = por nós, a nosso favor", "καθ᾽ ἡμῶν = contra nós", "Pergunta retórica = resposta óbvia"]
  }
,
  {
    ref: "Rm 8:37",
    livro: "Romanos",
    traducao: "Mas em todas estas coisas somos mais que vencedores, por aquele que nos amou.",
    grego: "ἀλλ᾽ ἐν τούτοις πᾶσιν ὑπερνικῶμεν διὰ τοῦ ἀγαπήσαντος ἡμᾶς.",
    diagrama: [
      {id: "rm837-1", type: "conjunction", text: "mas (ἀλλ᾽)", greek: "ἀλλ᾽", strong: "G235"},
      {id: "rm837-2", type: "adverbial", text: "em todas estas coisas (ἐν τούτοις πᾶσιν)", greek: "ἐν τούτοις πᾶσιν", strong: "G1722"},
      {id: "rm837-3", type: "predicate", text: "somos mais que vencedores (ὑπερνικῶμεν)", greek: "ὑπερνικῶμεν", strong: "G5248"},
      {id: "rm837-4", type: "adverbial", text: "por aquele que nos amou (διὰ τοῦ ἀγαπήσαντος ἡμᾶς)", greek: "διὰ τοῦ ἀγαπήσαντος ἡμᾶς", strong: "G25"}
    ],
    explicacao: "ὑπερνικῶμεν = mais que vencedores (ὑπέρ + νικάω = super-vencer). Não apenas vencemos, mas superamos abundantemente. διὰ τοῦ ἀγαπήσαντος = por amor do que nos amou (aoristo participial, amor aoristo na cruz).",
    notas: ["ὑπερνικῶμεν = superamos, vencemos abundantemente", "ἀγαπήσαντος = aoristo participial de ἀγαπάω", "διά + genitivo = por causa de", "Vitória baseada no amor de Cristo, não em nós"]
  }
,
  {
    ref: "Rm 8:38-39",
    livro: "Romanos",
    traducao: "Porque estou certo de que, nem a morte, nem a vida, nem os anjos, nem os principados, nem as potestades, nem o presente, nem o porvir, nem a altura, nem a profundidade, nem alguma outra criatura nos poderá separar do amor de Deus, que está em Cristo Jesus nosso Senhor.",
    grego: "πέπεισμαι γὰρ ὅτι οὔτε θάνατος οὔτε ζωὴ οὔτε ἄγγελοι οὔτε ἀρχαὶ οὔτε δυνάμεις οὔτε ἐνεστῶτα οὔτε μέλλοντα οὔτε ὑψώματα οὔτε βάθος οὔτε τις ἑτέρα κτίσις δυνήσεται ἡμᾶς χωρίσαι ἀπὸ τῆς ἀγάπης τοῦ θεοῦ τῆς ἐν Χριστῷ Ἰησοῦ τῷ κυρίῳ ἡμῶν.",
    diagrama: [
      {id: "rm838-1", type: "predicate", text: "estou certo (πέπεισμαι)", greek: "πέπεισμαι", strong: "G3982", children: [
        {id: "rm838-1a", type: "conjunction", text: "porque (γάρ)", greek: "γάρ", strong: "G1063"},
        {id: "rm838-1b", type: "object", text: "que (ὅτι)", greek: "ὅτι", strong: "G3754"}
      ]},
      {id: "rm838-2", type: "subject", text: "nem (οὔτε)", greek: "οὔτε", strong: "G3777", children: [
        {id: "rm838-2a", type: "modifier", text: "a morte (θάνατος)", greek: "θάνατος", strong: "G2288"},
        {id: "rm838-2b", type: "modifier", text: "nem a vida (οὔτε ζωή)", greek: "οὔτε ζωή", strong: "G2222"},
        {id: "rm838-2c", type: "modifier", text: "nem os anjos (οὔτε ἄγγελοι)", greek: "οὔτε ἄγγελοι", strong: "G32"},
        {id: "rm838-2d", type: "modifier", text: "nem os principados (οὔτε ἀρχαί)", greek: "οὔτε ἀρχαί", strong: "G746"},
        {id: "rm838-2e", type: "modifier", text: "nem as potestades (οὔτε δυνάμεις)", greek: "οὔτε δυνάμεις", strong: "G1411"},
        {id: "rm838-2f", type: "modifier", text: "nem o presente (οὔτε ἐνεστῶτα)", greek: "οὔτε ἐνεστῶτα", strong: "G1764"},
        {id: "rm838-2g", type: "modifier", text: "nem o porvir (οὔτε μέλλοντα)", greek: "οὔτε μέλλοντα", strong: "G3195"},
        {id: "rm838-2h", type: "modifier", text: "nem a altura (οὔτε ὑψώματα)", greek: "οὔτε ὑψώματα", strong: "G5311"},
        {id: "rm838-2i", type: "modifier", text: "nem a profundidade (οὔτε βάθος)", greek: "οὔτε βάθος", strong: "G899"},
        {id: "rm838-2j", type: "modifier", text: "nem outra criatura (οὔτε τις ἑτέρα κτίσις)", greek: "οὔτε τις ἑτέρα κτίσις", strong: "G2937"}
      ]},
      {id: "rm838-3", type: "predicate", text: "poderá separar (δυνήσεται χωρίσαι)", greek: "δυνήσεται χωρίσαι", strong: "G1410", children: [
        {id: "rm838-3a", type: "object", text: "nos (ἡμᾶς)", greek: "ἡμᾶς", strong: "G2249"},
        {id: "rm838-3b", type: "adverbial", text: "do amor de Deus (ἀπὸ τῆς ἀγάπης τοῦ θεοῦ)", greek: "ἀπὸ τῆς ἀγάπης τοῦ θεοῦ", strong: "G26"}
      ]}
    ],
    explicacao: "πέπεισμαι = perfeito passivo (estou convencido, certeza absoluta). Nove pares οὔτε... οὔτε = nem... nem (exaustivo). δυνήσεται = futuro médio (poderá). χωρίσαι = infinitivo aoristo (separar). Nada pode separar do amor de Deus.",
    notas: ["πέπεισμαι = perfeito passivo de πείθω (convencer)", "οὔτε = nem (negação dupla)", "χωρίσαι = separar (χωρίς = sem)", "κτίσις = criatura"]
  }
,
  {
    ref: "Rm 10:9",
    livro: "Romanos",
    traducao: "Se, pois, confessares com a tua boca o Senhor Jesus, e crer em teu coração que Deus o ressuscitou dentre os mortos, serás salvo.",
    grego: "ἐὰν ὁμολογήσῃς ἐν τῷ στόματί σου κύριον Ἰησοῦν καὶ πιστεύσῃς ἐν τῇ καρδίᾳ σου ὅτι ὁ θεὸς αὐτὸν ἤγειρεν ἐκ νεκρῶν, σωθήσῃ.",
    diagrama: [
      {id: "rm109-1", type: "conjunction", text: "se (ἐάν)", greek: "ἐάν", strong: "G1437"},
      {id: "rm109-2", type: "predicate", text: "confessares (ὁμολογήσῃς)", greek: "ὁμολογήσῃς", strong: "G3670", children: [
        {id: "rm109-2a", type: "adverbial", text: "com a tua boca (ἐν τῷ στόματί σου)", greek: "ἐν τῷ στόματί σου", strong: "G4750"},
        {id: "rm109-2b", type: "object", text: "o Senhor Jesus (κύριον Ἰησοῦν)", greek: "κύριον Ἰησοῦν", strong: "G2962"}
      ]},
      {id: "rm109-3", type: "conjunction", text: "e (καί)", greek: "καί", strong: "G2532"},
      {id: "rm109-4", type: "predicate", text: "creres (πιστεύσῃς)", greek: "πιστεύσῃς", strong: "G4100", children: [
        {id: "rm109-4a", type: "adverbial", text: "em teu coração (ἐν τῇ καρδίᾳ σου)", greek: "ἐν τῇ καρδίᾳ σου", strong: "G2588"},
        {id: "rm109-4b", type: "object", text: "que (ὅτι)", greek: "ὅτι", strong: "G3754"}
      ]},
      {id: "rm109-5", type: "predicate", text: "Deus ressuscitou (ὁ θεὸς ἤγειρεν)", greek: "ὁ θεὸς ἤγειρεν", strong: "G1453", children: [
        {id: "rm109-5a", type: "subject", text: "Deus (ὁ θεός)", greek: "ὁ θεός", strong: "G2316"},
        {id: "rm109-5b", type: "object", text: "ele (αὐτόν)", greek: "αὐτόν", strong: "G846"},
        {id: "rm109-5c", type: "adverbial", text: "dentre os mortos (ἐκ νεκρῶν)", greek: "ἐκ νεκρῶν", strong: "G3498"}
      ]},
      {id: "rm109-6", type: "predicate", text: "serás salvo (σωθήσῃ)", greek: "σωθήσῃ", strong: "G4982"}
    ],
    explicacao: "Duas condições: (1) confessar (ὁμολογήσῃς = boca) + (2) crer (πιστεύσῃς = coração). στόμα + καρδία = confissão completa. ἤγειρεν = aoristo (ressuscitou, evento histórico). σωθήσῃ = futuro passivo (serás salvo = Deus salva).",
    notas: ["ὁμολογήσῃς = confessar, declarar publicamente", "πιστεύσῃς = crer, confiar", "ἤγειρεν = aoristo de ἐγείρω (ressuscitar)", "σωθήσῃ = futuro passivo de σῴζω (ser salvo)"]
  }
,
  {
    ref: "1Co 1:18",
    livro: "1 Coríntios",
    traducao: "Porque a palavra da cruz é loucura para os que se perdem, mas para os que se salvam, isto é, para nós, é poder de Deus.",
    grego: "ὁ λόγος γὰρ ὁ τοῦ σταυροῦ τοῖς μὲν ἀπολλυμένοις μωρία ἐστίν, τοῖς δὲ σωζομένοις ἡμῖν δύναμις θεοῦ ἐστιν.",
    diagrama: [
      {id: "1co118-1", type: "subject", text: "a palavra da cruz (ὁ λόγος ὁ τοῦ σταυροῦ)", greek: "ὁ λόγος ὁ τοῦ σταυροῦ", strong: "G3056", children: [
        {id: "1co118-1a", type: "modifier", text: "da cruz (τοῦ σταυροῦ)", greek: "τοῦ σταυροῦ", strong: "G4716"}
      ]},
      {id: "1co118-2", type: "conjunction", text: "porque (γάρ)", greek: "γάρ", strong: "G1063"},
      {id: "1co118-3", type: "predicate", text: "é (ἐστίν)", greek: "ἐστίν", strong: "G2076", children: [
        {id: "1co118-3a", type: "complement", text: "loucura (μωρία)", greek: "μωρία", strong: "G3472"},
        {id: "1co118-3b", type: "dative", text: "para os que se perdem (τοῖς ἀπολλυμένοις)", greek: "τοῖς ἀπολλυμένοις", strong: "G622"},
        {id: "1co118-3c", type: "conjunction", text: "mas (δέ)", greek: "δέ", strong: "G1161"},
        {id: "1co118-3d", type: "complement", text: "poder de Deus (δύναμις θεοῦ)", greek: "δύναμις θεοῦ", strong: "G1411"},
        {id: "1co118-3e", type: "dative", text: "para os que se salvam (τοῖς σωζομένοις)", greek: "τοῖς σωζομένοις", strong: "G4982"}
      ]}
    ],
    explicacao: "Contraste: μωρία (loucura) vs δύναμις θεοῦ (poder de Deus). ἀπολλυμένοις = particípio presente (se perdem, em processo de perdição). σωζομένοις = particípio presente (se salvam, em processo de salvação). O paradoxo da cruz.",
    notas: ["λόγος = palavra, mensagem", "σταυροῦ = cruz (morte vergonhosa)", "μωρία = loucura, tolice", "ἀπολλυμένοις = se perdem (particípio presente)"]
  }
,
  {
    ref: "1Co 2:2",
    livro: "1 Coríntios",
    traducao: "Porque não me propus saber coisa alguma entre vós, senão Jesus Cristo, e este crucificado.",
    grego: "οὐ γὰρ ἔκρινα τοῦ εἰδέναι τι ἐν ὑμῖν εἰ μὴ Ἰησοῦν Χριστὸν καὶ τοῦτον ἐσταυρωμένον.",
    diagrama: [
      {id: "1co22-1", type: "conjunction", text: "porque (γάρ)", greek: "γάρ", strong: "G1063"},
      {id: "1co22-2", type: "predicate", text: "não me propus (οὐ ἔκρινα)", greek: "οὐ ἔκρινα", strong: "G2919", children: [
        {id: "1co22-2a", type: "complement", text: "saber (τοῦ εἰδέναι)", greek: "τοῦ εἰδέναι", strong: "G1492"},
        {id: "1co22-2b", type: "object", text: "coisa alguma (τι)", greek: "τι", strong: "G5100"},
        {id: "1co22-2c", type: "adverbial", text: "entre vós (ἐν ὑμῖν)", greek: "ἐν ὑμῖν", strong: "G1722"}
      ]},
      {id: "1co22-3", type: "conjunction", text: "senão (εἰ μή)", greek: "εἰ μή", strong: "G1508"},
      {id: "1co22-4", type: "object", text: "Jesus Cristo (Ἰησοῦν Χριστόν)", greek: "Ἰησοῦν Χριστόν", strong: "G2424", children: [
        {id: "1co22-4a", type: "modifier", text: "e este crucificado (καὶ τοῦτον ἐσταυρωμένον)", greek: "καὶ τοῦτον ἐσταυρωμένον", strong: "G4717"}
      ]}
    ],
    explicacao: "ἔκρινα = aoristo (determinei, decidi). τοῦ εἰδέναι = infinitivo (saber como finalidade). εἰ μή = exceto, senão. ἐσταυρωμένον = perfeito passivo (crucificado, estado resultante). Focalização exclusiva na cruz.",
    notas: ["ἔκρινα = determinei (aoristo de κρίνω)", "εἰδέναι = saber (conhecimento experiencial)", "ἐσταυρωμένον = crucificado (perfeito passivo)", "τοῦτον = este (demonstrativo enfático)"]
  }
,
  {
    ref: "1Co 3:16",
    livro: "1 Coríntios",
    traducao: "Não sabeis que sois o templo de Deus, e que o Espírito de Deus habita em vós?",
    grego: "οὐκ οἴδατε ὅτι ναὸς θεοῦ ἐστε καὶ τὸ πνεῦμα τοῦ θεοῦ οἰκεῖ ἐν ὑμῖν;",
    diagrama: [
      {id: "1co316-1", type: "predicate", text: "não sabeis (οὐκ οἴδατε)", greek: "οὐκ οἴδατε", strong: "G1492", children: [
        {id: "1co316-1a", type: "object", text: "que (ὅτι)", greek: "ὅτι", strong: "G3754"}
      ]},
      {id: "1co316-2", type: "subject", text: "vós (ὑμεῖς)", greek: "ὑμεῖς", strong: "G4771"},
      {id: "1co316-3", type: "predicate", text: "sois (ἐστε)", greek: "ἐστε", strong: "G2076", children: [
        {id: "1co316-3a", type: "complement", text: "o templo de Deus (ναὸς θεοῦ)", greek: "ναὸς θεοῦ", strong: "G3485"}
      ]},
      {id: "1co316-4", type: "conjunction", text: "e (καί)", greek: "καί", strong: "G2532"},
      {id: "1co316-5", type: "subject", text: "o Espírito de Deus (τὸ πνεῦμα τοῦ θεοῦ)", greek: "τὸ πνεῦμα τοῦ θεοῦ", strong: "G4151"},
      {id: "1co316-6", type: "predicate", text: "habita (οἰκεῖ)", greek: "οἰκεῖ", strong: "G3611", children: [
        {id: "1co316-6a", type: "adverbial", text: "em vós (ἐν ὑμῖν)", greek: "ἐν ὑμῖν", strong: "G1722"}
      ]}
    ],
    explicacao: "Pergunta retórica: οὐκ οἴδατε = não sabeis (deveriam saber). ναὸς = templo (santuário interior, não construção). οἰκεῖ = habita (presente, residência permanente). O crente é santuário do Espírito.",
    notas: ["ναός = templo (santuário, lugar da presença)", "οἰκεῖ = habita, reside (verbo de domicílio)", "πνεῦμα τοῦ θεοῦ = Espírito de Deus", "Plural: sois templo (corpo de crentes)"]
  }
,
  {
    ref: "1Co 10:13",
    livro: "1 Coríntios",
    traducao: "Nenhuma tentação vos sobreveio senão a humana; mas Deus é fiel, que não vos deixará ser tentados acima do que podeis, mas fará também juntamente com a tentação a saída, para que a possais suportar.",
    grego: "πειρασμὸς ὑμᾶς οὐκ εἴληφεν εἰ μὴ ἀνθρώπινος· πιστὸς δὲ ὁ θεὸς ὃς οὐκ ἐάσει ὑμᾶς πειρασθῆναι ὑπὲρ ὃ δύνασθε ἀλλὰ ποιήσει σὺν τῷ πειρασμῷ καὶ τὴν ἔκβασιν τοῦ δύνασθαι ὑμᾶς ὑπενεγκεῖν.",
    diagrama: [
      {id: "1co1013-1", type: "subject", text: "tentação (πειρασμός)", greek: "πειρασμός", strong: "G3986"},
      {id: "1co1013-2", type: "predicate", text: "não vos sobreveio (οὐκ εἴληφεν ὑμᾶς)", greek: "οὐκ εἴληφεν ὑμᾶς", strong: "G2983", children: [
        {id: "1co1013-2a", type: "complement", text: "senão humana (εἰ μὴ ἀνθρώπινος)", greek: "εἰ μὴ ἀνθρώπινος", strong: "G442"}
      ]},
      {id: "1co1013-3", type: "conjunction", text: "mas (δέ)", greek: "δέ", strong: "G1161"},
      {id: "1co1013-4", type: "subject", text: "Deus (ὁ θεός)", greek: "ὁ θεός", strong: "G2316"},
      {id: "1co1013-5", type: "predicate", text: "é fiel (πιστός ἐστιν)", greek: "πιστός ἐστιν", strong: "G4103", children: [
        {id: "1co1013-5a", type: "complement", text: "fiel (πιστός)", greek: "πιστός", strong: "G4103"}
      ]},
      {id: "1co1013-6", type: "predicate", text: "não deixará (οὐκ ἐάσει)", greek: "οὐκ ἐάσει", strong: "G1439", children: [
        {id: "1co1013-6a", type: "object", text: "que sejais tentados (ὑμᾶς πειρασθῆναι)", greek: "ὑμᾶς πειρασθῆναι", strong: "G3985"},
        {id: "1co1013-6b", type: "adverbial", text: "acima do que podeis (ὑπὲρ ὃ δύνασθε)", greek: "ὑπὲρ ὃ δύνασθε", strong: "G5228"}
      ]},
      {id: "1co1013-7", type: "conjunction", text: "mas (ἀλλά)", greek: "ἀλλά", strong: "G235"},
      {id: "1co1013-8", type: "predicate", text: "fará (ποιήσει)", greek: "ποιήσει", strong: "G4160", children: [
        {id: "1co1013-8a", type: "object", text: "a saída (τὴν ἔκβασιν)", greek: "τὴν ἔκβασιν", strong: "G1841"},
        {id: "1co1013-8b", type: "adverbial", text: "juntamente com a tentação (σὺν τῷ πειρασμῷ)", greek: "σὺν τῷ πειρασμῷ", strong: "G4862"}
      ]}
    ],
    explicacao: "Promessa de Deus: πιστός = fiel (confiável). οὐκ ἐάσει = não permitirá. ὑπέρ ὃ δύνασθε = além do que suportais. ποιήσει = fará (Deus age). σύν = com (simultâneo). A saída vem junto com a tentação.",
    notas: ["πειρασμός = tentação, provação", "εἴληφεν = perfeito de λαμβάνω (sobreveio)", "ἐάσει = futuro de ἐάω (permitir)", "ἔκβασιν = saída, escape"]
  }
,
  {
    ref: "1Co 13:4",
    livro: "1 Coríntios",
    traducao: "O amor é sofredor, é benigno; o amor não é invejoso; o amor não trata com leviandade, não se ensoberbece.",
    grego: "ἡ ἀγάπη μακροθυμεῖ, χρηστεύεται, οὐ ζηλοῖ, οὐ περπερεύεται, οὐ φυσιοῦται.",
    diagrama: [
      {id: "1co134-1", type: "subject", text: "o amor (ἡ ἀγάπη)", greek: "ἡ ἀγάπη", strong: "G26"},
      {id: "1co134-2", type: "predicate", text: "é sofredor (μακροθυμεῖ)", greek: "μακροθυμεῖ", strong: "G3114"},
      {id: "1co134-3", type: "conjunction", text: "é (χρηστεύεται)", greek: "χρηστεύεται", strong: "G5541"},
      {id: "1co134-4", type: "predicate", text: "não é invejoso (οὐ ζηλοῖ)", greek: "οὐ ζηλοῖ", strong: "G2206"},
      {id: "1co134-5", type: "conjunction", text: "não (οὐ)", greek: "οὐ", strong: "G3756"},
      {id: "1co134-6", type: "predicate", text: "trata com leviandade (περπερεύεται)", greek: "περπερεύεται", strong: "G4068"},
      {id: "1co134-7", type: "conjunction", text: "não (οὐ)", greek: "οὐ", strong: "G3756"},
      {id: "1co134-8", type: "predicate", text: "se ensoberbece (φυσιοῦται)", greek: "φυσιοῦται", strong: "G5448"}
    ],
    explicacao: "Definição negativa do amor (o que NÃO é). μακροθυμεῖ = é sofredor (paciência longa). χρηστεύεται = é benigno (bondade ativa). Cada verbo é presente indicativo (característica contínua).",
    notas: ["μακροθυμεῖ = é paciente (paciência longa)", "χρηστεύεται = é bondoso, benigno", "ζηλοῖ = é invejoso (zelar negativamente)", "φυσιοῦτai = se infla, se ensoberbece"]
  }
,
  {
    ref: "1Co 15:3",
    livro: "1 Coríntios",
    traducao: "Porqueprimeiro de tudo vos entreguei o que também recebi: que Cristo morreu pelos nossos pecados, segundo as Escrituras.",
    grego: "παρέδωκα γὰρ ὑμῖν ἐν πρώτοις ὃ καὶ παρέλαβον ὅτι Χριστὸς ἀπέθανεν ὑπὲρ τῶν ἁμαρτιῶν ἡμῶν κατὰ τὰς γραφάς.",
    diagrama: [
      {id: "1co153-1", type: "predicate", text: "entreguei (παρέδωκα)", greek: "παρέδωκα", strong: "G3860", children: [
        {id: "1co153-1a", type: "dative", text: "a vós (ὑμῖν)", greek: "ὑμῖν", strong: "G4771"},
        {id: "1co153-1b", type: "adverbial", text: "primeiro (ἐν πρώτοις)", greek: "ἐν πρώτοις", strong: "G4413"}
      ]},
      {id: "1co153-2", type: "conjunction", text: "porque (γάρ)", greek: "γάρ", strong: "G1063"},
      {id: "1co153-3", type: "object", text: "o que também recebi (ὃ καὶ παρέλαβον)", greek: "ὃ καὶ παρέλαβον", strong: "G3880"},
      {id: "1co153-4", type: "conjunction", text: "que (ὅτι)", greek: "ὅτι", strong: "G3754"},
      {id: "1co153-5", type: "subject", text: "Cristo (Χριστός)", greek: "Χριστός", strong: "G5547"},
      {id: "1co153-6", type: "predicate", text: "morreu (ἀπέθανεν)", greek: "ἀπέθανεν", strong: "G599", children: [
        {id: "1co153-6a", type: "adverbial", text: "pelos nossos pecados (ὑπὲρ τῶν ἁμαρτιῶν ἡμῶν)", greek: "ὑπὲρ τῶν ἁμαρτιῶν ἡμῶν", strong: "G266"}
      ]},
      {id: "1co153-7", type: "adverbial", text: "segundo as Escrituras (κατὰ τὰς γραφάς)", greek: "κατὰ τὰς γραφάς", strong: "G1124"}
    ],
    explicacao: "Tradição recebida e entregue: παρέδωκα = entreguei (tradição). παρέλαβον = recebi (de outros). κατὰ τὰς γραφάς = segundo as Escrituras (cumprimento profético). Fundamento da fé.",
    notas: ["παρέδωκα = entreguei, transmiti", "παρέλαβον = recebi (tradição)", "κατὰ τὰς γραφάς = segundo as Escrituras", "Fundamento: morte de Cristo pelos pecados"]
  }
,
  {
    ref: "Gl 2:20",
    livro: "Gálatas",
    traducao: "Estou crucificado com Cristo; e já não vivo eu, mas Cristo vive em mim; e a vida que agora vivo na carne, vivo pela fé no Filho de Deus, que me amou, e se entregou a si mesmo por mim.",
    grego: "Χριστῷ συνεσταύρωμαι· ζῶ δὲ οὐκέτι ἐγώ, ζῇ δὲ ἐν ἐμοὶ Χριστός· ὃ δὲ νῦν ζῶ ἐν σαρκί, ἐν πίστει ζῶ τῇ τοῦ υἱοῦ τοῦ θεοῦ τοῦ ἀγαπήσαντός με καὶ παραδόντος ἑαυτὸν ὑπὲρ ἐμοῦ.",
    diagrama: [
      {id: "gl220-1", type: "predicate", text: "estou crucificado (συνεσταύρωμαι)", greek: "συνεσταύρωμαι", strong: "G4957", children: [
        {id: "gl220-1a", type: "dative", text: "com Cristo (Χριστῷ)", greek: "Χριστῷ", strong: "G5547"}
      ]},
      {id: "gl220-2", type: "conjunction", text: "mas (δέ)", greek: "δέ", strong: "G1161"},
      {id: "gl220-3", type: "predicate", text: "já não vivo (ζῶ δὲ οὐκέτι ἐγώ)", greek: "ζῶ δὲ οὐκέτι ἐγώ", strong: "G2198", children: [
        {id: "gl220-3a", type: "subject", text: "eu (ἐγώ)", greek: "ἐγώ", strong: "G1473"}
      ]},
      {id: "gl220-4", type: "conjunction", text: "mas (δέ)", greek: "δέ", strong: "G1161"},
      {id: "gl220-5", type: "predicate", text: "Cristo vive (ζῇ Χριστός)", greek: "ζῇ Χριστός", strong: "G2198", children: [
        {id: "gl220-5a", type: "subject", text: "Cristo (Χριστός)", greek: "Χριστός", strong: "G5547"},
        {id: "gl220-5b", type: "adverbial", text: "em mim (ἐν ἐμοί)", greek: "ἐν ἐμοί", strong: "G1722"}
      ]},
      {id: "gl220-6", type: "adverbial", text: "pela fé (ἐν πίστει)", greek: "ἐν πίστει", strong: "G4102", children: [
        {id: "gl220-6a", type: "modifier", text: "no Filho de Deus (τοῦ υἱοῦ τοῦ θεοῦ)", greek: "τοῦ υἱοῦ τοῦ θεοῦ", strong: "G5207"}
      ]}
    ],
    explicacao: "συνεσταύρωμαι = perfeito passivo (estou crucificado com). União com Cristo na cruz. οὐκέτι ἐγώ = já não eu (morte do velho homem). ζῇ δὲ ἐν ἐμοί = Cristo vive em mim (vida ressurreta). Fé no Filho que se entregou.",
    notas: ["συνεσταύρωμαι = estou crucificado com", "ζῇ = presente ativo de ζάω (viver)", "παραδόντος = aoristo participial de παραδίδωμι (entregar)", "ὑπὲρ ἐμοῦ = por mim"]
  }
,
  {
    ref: "Ef 2:8",
    livro: "Efésios",
    traducao: "Porque pela graça sois salvos, por meio da fé; e isto não de vós, pois é dom de Deus.",
    grego: "τῇ γὰρ χάριτί ἐστε σεσῳσμένοι διὰ τῆς πίστεως· καὶ τοῦτο οὐκ ἐξ ὑμῶν, τοῦ θεοῦ τὸ δῶρον.",
    diagrama: [
      {id: "ef28-1", type: "adverbial", text: "pela graça (τῇ χάριτι)", greek: "τῇ χάριτι", strong: "G5485"},
      {id: "ef28-2", type: "conjunction", text: "porque (γάρ)", greek: "γάρ", strong: "G1063"},
      {id: "ef28-3", type: "predicate", text: "sois salvos (ἐστε σεσῳσμένοι)", greek: "ἐστε σεσῳσμένοι", strong: "G4982"},
      {id: "ef28-4", type: "adverbial", text: "por meio da fé (διὰ τῆς πίστεως)", greek: "διὰ τῆς πίστεως", strong: "G4102"},
      {id: "ef28-5", type: "conjunction", text: "e (καί)", greek: "καί", strong: "G2532"},
      {id: "ef28-6", type: "subject", text: "isto (τοῦτο)", greek: "τοῦτο", strong: "G3778"},
      {id: "ef28-7", type: "predicate", text: "não é (οὐκ ἐστίν)", greek: "οὐκ ἐστίν", strong: "G2076", children: [
        {id: "ef28-7a", type: "adverbial", text: "de vós (ἐξ ὑμῶν)", greek: "ἐξ ὑμῶν", strong: "G1537"}
      ]},
      {id: "ef28-8", type: "complement", text: "é dom de Deus (τοῦ θεοῦ τὸ δῶρον)", greek: "τοῦ θεοῦ τὸ δῶρον", strong: "G1432"}
    ],
    explicacao: "σεσῳσμένοι = perfeito passivo (sois salvos, estado resultante). τῇ χάριτι = pela graça (instrumento). διὰ τῆς πίστεως = por meio da fé (canal). τοῦ θεοῦ τὸ δῶρον = dom de Deus (não mérito humano).",
    notas: ["χάριτι = graça (dom imerecido)", "σεσῳσμένοι = sois salvos (perfeito passivo)", "πίστεως = fé (confiança, confiança)", "δῶρον = dom (presente)"]
  }
,
  {
    ref: "Ef 2:10",
    livro: "Efésios",
    traducao: "Porque somos feitura dele, criados em Cristo Jesus para boas obras, as quais Deus preparou de antemão para que andássemos nelas.",
    grego: "αὐτοῦ γάρ ἐσμεν ποίημα, κτισθέντες ἐν Χριστῷ Ἰησοῦ ἐπὶ ἔργοις ἀγαθοῖς οἷς προητοίμασεν ὁ θεὸς ἵνα ἐν αὐτοῖς περιπατήσωμεν.",
    diagrama: [
      {id: "ef210-1", type: "subject", text: "nós (ἡμεῖς)", greek: "ἡμεῖς", strong: "G2249"},
      {id: "ef210-2", type: "conjunction", text: "porque (γάρ)", greek: "γάρ", strong: "G1063"},
      {id: "ef210-3", type: "predicate", text: "somos (ἐσμέν)", greek: "ἐσμέν", strong: "G2076", children: [
        {id: "ef210-3a", type: "complement", text: "feitura dele (αὐτοῦ ποίημα)", greek: "αὐτοῦ ποίημα", strong: "G4161"}
      ]},
      {id: "ef210-4", type: "modifier", text: "criados em Cristo (κτισθέντες ἐν Χριστῷ)", greek: "κτισθέντες ἐν Χριστῷ", strong: "G2936"},
      {id: "ef210-5", type: "complement", text: "para boas obras (ἐπὶ ἔργοις ἀγαθοῖς)", greek: "ἐπὶ ἔργοις ἀγαθοῖς", strong: "G2041"},
      {id: "ef210-6", type: "modifier", text: "as quais preparou (οἷς προητοίμασεν ὁ θεός)", greek: "οἷς προητοίμασεν ὁ θεός", strong: "G4294"},
      {id: "ef210-7", type: "complement", text: "para que andássemos (ἵνα περιπατήσωμεν)", greek: "ἵνα περιπατήσωμεν", strong: "G4043", children: [
        {id: "ef210-7a", type: "adverbial", text: "nelas (ἐν αὐτοῖς)", greek: "ἐν αὐτοῖς", strong: "G1722"}
      ]}
    ],
    explicacao: "ποίημα = feitura, obra criada. κτισθέντες = aoristo passivo (criados, evento único). ἐπὶ ἔργοις ἀγαθοῖς = para boas obras (propósito). προητοίμασεν = preparou de antemão (plano eterno). Andar nas obras preparadas.",
    notas: ["ποίημα = obra, criação", "κτισθέντες = criados (aoristo passivo)", "προητοίμασεν = preparou antes", "περιπατήσωμεν = andemos (modo de vida)"]
  }
,
  {
    ref: "Ef 4:32",
    livro: "Efésios",
    traducao: "Mas sede bondosos para com uns aos outros, misericordiosos, perdoando-vos uns aos outros, como também Deus vos perdoou em Cristo.",
    grego: "γίνεσθε δὲ χρηστοὶ ἀλλήλων, εὔσπλαγχνοι, χαριζόμενοι ἑαυτοῖς καθὼς καὶ ὁ θεὸς ἐν Χριστῷ ἐχαρίσατο ὑμῖν.",
    diagrama: [
      {id: "ef432-1", type: "predicate", text: "sede (γίνεσθε)", greek: "γίνεσθε", strong: "G1096", children: [
        {id: "ef432-1a", type: "complement", text: "bondosos (χρηστοί)", greek: "χρηστοί", strong: "G5543"},
        {id: "ef432-1b", type: "dative", text: "uns aos outros (ἀλλήλων)", greek: "ἀλλήλων", strong: "G240"}
      ]},
      {id: "ef432-2", type: "complement", text: "misericordiosos (εὔσπλαγχνοι)", greek: "εὔσπλαγχνοι", strong: "G2155"},
      {id: "ef432-3", type: "modifier", text: "perdoando-vos (χαριζόμενοι ἑαυτοῖς)", greek: "χαριζόμενοι ἑαυτοῖς", strong: "G5483"},
      {id: "ef432-4", type: "adverbial", text: "como também (καθὼς καί)", greek: "καθὼς καί", strong: "G2531"},
      {id: "ef432-5", type: "subject", text: "Deus (ὁ θεός)", greek: "ὁ θεός", strong: "G2316"},
      {id: "ef432-6", type: "predicate", text: "vos perdoou (ἐχαρίσατο ὑμῖν)", greek: "ἐχαρίσατο ὑμῖν", strong: "G5483", children: [
        {id: "ef432-6a", type: "adverbial", text: "em Cristo (ἐν Χριστῷ)", greek: "ἐν Χριστῷ", strong: "G5547"}
      ]}
    ],
    explicacao: "Imperativos: γίνεσθε = sede (tornai-se). χρηστοί = bondosos (benevolentes). εὔσπλαγχνοι = misericordiosos (compassivos). χαριζόμενοι = perdoando (dativo recíproco). Modelo: como Deus perdoou em Cristo.",
    notas: ["γίνεσθε = sede, tornai-se", "χρηστοί = bondosos, benignos", "εὔσπλαγχνοi = misericordiosos (coração compaixivo)", "ἐχαρίσατο = perdoou (aoristo médio)"]
  }
,
  {
    ref: "Ef 6:10",
    livro: "Efésios",
    traducao: "No demais, irmãos meus, fortalecei-vos no Senhor e na força do seu poder.",
    grego: "τοῦ λοιποῦ ἐνδυναμοῦσθε ἐν κυρίῳ καὶ ἐν τῷ κράτει τῆς ἰσχύος αὐτοῦ.",
    diagrama: [
      {id: "ef610-1", type: "adverbial", text: "no demais (τοῦ λοιποῦ)", greek: "τοῦ λοιποῦ", strong: "G3063"},
      {id: "ef610-2", type: "vocative", text: "irmãos meus (ἀδελφοί μου)", greek: "ἀδελφοί μου", strong: "G80"},
      {id: "ef610-3", type: "predicate", text: "fortalecei-vos (ἐνδυναμοῦσθε)", greek: "ἐνδυναμοῦσθε", strong: "G1743", children: [
        {id: "ef610-3a", type: "adverbial", text: "no Senhor (ἐν κυρίῳ)", greek: "ἐν κυρίῳ", strong: "G2962"},
        {id: "ef610-3b", type: "adverbial", text: "na força do seu poder (ἐν τῷ κράτει τῆς ἰσχύος αὐτοῦ)", greek: "ἐν τῷ κράτει τῆς ἰσχύος αὐτοῦ", strong: "G2904"}
      ]}
    ],
    explicacao: "ἐνδυναμοῦσθε = imperative presente (fortalecei-vos continuamente). Duas fontes: ἐν κυρίῳ (no Senhor) + ἐν τῷ κράτει (na força). κράτος = poder manifestado. ἰσχύς = força interna. O poder não é nosso, é de Deus.",
    notas: ["ἐνδυναμοῦσθε = fortalecei-vos (imperativo)", "κράτει = poder, domínio", "ἰσχύος = força, vigor", "ἐν + dativo = no, por meio de"]
  }
,
  {
    ref: "Fl 4:6",
    livro: "Filipenses",
    traducao: "Não vos inquieteis por coisa alguma, mas as vossas petições sejam conhecidas diante de Deus em toda a oração e súplica, com ação de graças.",
    grego: "μηδὲν μεριμνᾶτε ἀλλ᾽ ἐν παντὶ τῇ προσευχῇ καὶ τῇ δεήσει μετὰ εὐχαριστίας τὰ αἰτήματα ὑμῶν γινωσκέσθω παρὰ τοῦ θεοῦ.",
    diagrama: [
      {id: "fl46-1", type: "predicate", text: "não vos inquieteis (μηδὲν μεριμνᾶτε)", greek: "μηδὲν μεριμνᾶτε", strong: "G3306", children: [
        {id: "fl46-1a", type: "adverbial", text: "por coisa alguma (μηδέν)", greek: "μηδέν", strong: "G3367"}
      ]},
      {id: "fl46-2", type: "conjunction", text: "mas (ἀλλά)", greek: "ἀλλά", strong: "G235"},
      {id: "fl46-3", type: "adverbial", text: "em toda oração (ἐν παντὶ τῇ προσευχῇ)", greek: "ἐν παντὶ τῇ προσευχῇ", strong: "G4335", children: [
        {id: "fl46-3a", type: "conjunction", text: "e súplica (καὶ τῇ δεήσει)", greek: "καὶ τῇ δεήσει", strong: "G1162"},
        {id: "fl46-3b", type: "modifier", text: "com ação de graças (μετὰ εὐχαριστίας)", greek: "μετὰ εὐχαριστίας", strong: "G2169"}
      ]},
      {id: "fl46-4", type: "predicate", text: "sejam conhecidas (γινωσκέσθωσαν)", greek: "γινωσκέσθω παρὰ τοῦ θεοῦ", strong: "G1097", children: [
        {id: "fl46-4a", type: "subject", text: "as petições (τὰ αἰτήματα ὑμῶν)", greek: "τὰ αἰτήματα ὑμῶν", strong: "G155"},
        {id: "fl46-4b", type: "adverbial", text: "diante de Deus (παρὰ τοῦ θεοῦ)", greek: "παρὰ τοῦ θεοῦ", strong: "G2316"}
      ]}
    ],
    explicacao: "μεριμνᾶτe = imperativo presente (preocupem-se). Negação: μηδέν = nada. γινωσκέσθω = imperativo passivo (seja conhecida). Oração + súplica + gratidão. As petições chegam a Deus.",
    notas: ["μεριμνᾶτε = preocupem-se (imperativo)", "προσευχῇ = oração", "δεήσει = súplica (pedido)", "εὐχαριστίας = ação de graças"]
  }
,
  {
    ref: "Cl 1:15",
    livro: "Colossenses",
    traducao: "Ele é a imagem do Deus invisível, o primogênito de toda a criação.",
    grego: "ὅς ἐστιν εἰκὼν τοῦ θεοῦ τοῦ ἀοράτου, πρωτότοκος πάσης κτίσεως.",
    diagrama: [
      {id: "cl115-1", type: "subject", text: "Ele (ὅς)", greek: "ὅς", strong: "G3739"},
      {id: "cl115-2", type: "predicate", text: "é (ἐστίν)", greek: "ἐστίν", strong: "G2076", children: [
        {id: "cl115-2a", type: "complement", text: "a imagem do Deus invisível (εἰκὼν τοῦ θεοῦ τοῦ ἀοράτου)", greek: "εἰκὼν τοῦ θεοῦ τοῦ ἀοράτου", strong: "G1504"},
        {id: "cl115-2b", type: "complement", text: "o primogênito de toda a criação (πρωτότοκος πάσης κτίσεως)", greek: "πρωτότοκος πάσης κτίσεως", strong: "G4416"}
      ]}
    ],
    explicacao: "εἰκών = imagem (representação exata). τοῦ ἀοράτου = do invisível (Deus não visto). πρωτότοκος = primogênito (primazia, não criação). κτίσεως = criação (tudo o que foi criado). Cristo = centrou de tudo.",
    notas: ["εἰκών = imagem, representação", "ἀοράτου = invisível (não visto)", "πρωτότοκος = primogênito (primeiro em precedência)", "κτίσεως = criação (tudo o criado)"]
  }
,
  {
    ref: "Cl 3:16",
    livro: "Colossenses",
    traducao: "Habite em vós ricamente a palavra de Cristo, ensinai-vos e aconselhai-vos mutuamente com toda a sabedoria, cantando a Deus com gratidão em vosso coração.",
    grego: "ὁ λόγος τοῦ Χριστοῦ ἐνοικείτω ἐν ὑμῖν πλουσίως, πάσῃ σοφίᾳ διδάσκοντες καὶ νουθετοῦντες ἑαυτούς, ψαλμοῖς καὶ ὕμνοις καὶ ᾠδαῖς πνευματικαῖς ἐν χάριτι ᾄδοντες τῷ θεῷ ἐν τῇ καρδίᾳ ὑμῶν.",
    diagrama: [
      {id: "cl316-1", type: "subject", text: "a palavra de Cristo (ὁ λόγος τοῦ Χριστοῦ)", greek: "ὁ λόγος τοῦ Χριστοῦ", strong: "G3056"},
      {id: "cl316-2", type: "predicate", text: "habite (ἐνοικείτω)", greek: "ἐνοικείτω", strong: "G1774", children: [
        {id: "cl316-2a", type: "adverbial", text: "em vós (ἐν ὑμῖν)", greek: "ἐν ὑμῖν", strong: "G1722"},
        {id: "cl316-2b", type: "adverbial", text: "ricamente (πλουσίως)", greek: "πλουσίως", strong: "G4146"}
      ]},
      {id: "cl316-3", type: "predicate", text: "ensinando (διδάσκοντες)", greek: "διδάσκοντες", strong: "G1321"},
      {id: "cl316-4", type: "conjunction", text: "e (καί)", greek: "καί", strong: "G2532"},
      {id: "cl316-5", type: "predicate", text: "aconselhando (νουθετοῦντες)", greek: "νουθετοῦντες", strong: "G3560", children: [
        {id: "cl316-5a", type: "object", text: "a vós mesmos (ἑαυτούς)", greek: "ἑαυτούς", strong: "G1438"}
      ]},
      {id: "cl316-6", type: "complement", text: "com sabedoria (πάσῃ σοφίᾳ)", greek: "πάσῃ σοφίᾳ", strong: "G4678"},
      {id: "cl316-7", type: "predicate", text: "cantando (ᾄδοντες)", greek: "ᾄδοντες", strong: "G103", children: [
        {id: "cl316-7a", type: "object", text: "a Deus (τῷ θεῷ)", greek: "τῷ θεῷ", strong: "G2316"},
        {id: "cl316-7b", type: "adverbial", text: "com gratidão (ἐν χάριτι)", greek: "ἐν χάριτι", strong: "G5485"},
        {id: "cl316-7c", type: "adverbial", text: "em vosso coração (ἐν τῇ καρδίᾳ ὑμῶν)", greek: "ἐν τῇ καρδίᾳ ὑμῶν", strong: "G2588"}
      ]}
    ],
    explicacao: "ἐνοικείτω = imperativo presente (habite permanentemente). πλουσίως = ricamente (abundantemente). Três particípios: διδάσκοντες (ensinando), νουθετοῦντες (aconselhando), ᾄδοντες (cantando). Música espiritual com gratidão.",
    notas: ["ἐνοικείτω = habite (imperativo de ἐνοικέω)", "πλουσίως = ricamente, abundantemente", "νουθετοῦντες = aconselhando, admoestando", "ψαλμοῖς = salmos (cantos)"]
  }
,
  {
    ref: "1Ts 4:16",
    livro: "1 Tessalonicenses",
    traducao: "Porque o mesmo Senhor descerá do céu com autoridade, com voz de arcanjo, e com a trombeta de Deus; e os mortos em Cristo ressuscitarão primeiro.",
    grego: "αὐτὸς γὰρ ὁ κύριος ἐν κελεύσματι, ἐν φωνῇ ἀρχαγγέλου καὶ ἐν σάλπιγγι θεοῦ καταβήσεται ἀπ᾽ οὐρανοῦ, καὶ οἱ νεκροὶ ἐν Χριστῷ ἀναστήσονται πρῶτον.",
    diagrama: [
      {id: "1ts416-1", type: "subject", text: "o mesmo Senhor (αὐτὸς ὁ κύριος)", greek: "αὐτὸς ὁ κύριος", strong: "G2962"},
      {id: "1ts416-2", type: "conjunction", text: "porque (γάρ)", greek: "γάρ", strong: "G1063"},
      {id: "1ts416-3", type: "predicate", text: "descerá (καταβήσεται)", greek: "καταβήσεται", strong: "G2597", children: [
        {id: "1ts416-3a", type: "adverbial", text: "do céu (ἀπ᾽ οὐρανοῦ)", greek: "ἀπ᾽ οὐρανοῦ", strong: "G3772"},
        {id: "1ts416-3b", type: "adverbial", text: "com autoridade (ἐν κελεύσματι)", greek: "ἐν κελεύσματι", strong: "G2750"},
        {id: "1ts416-3c", type: "adverbial", text: "com voz de arcanjo (ἐν φωνῇ ἀρχαγγέλου)", greek: "ἐν φωνῇ ἀρχαγγέλου", strong: "G743"},
        {id: "1ts416-3d", type: "adverbial", text: "com trombeta de Deus (ἐν σάλπιγγι θεοῦ)", greek: "ἐν σάλπιγγι θεοῦ", strong: "G4536"}
      ]},
      {id: "1ts416-4", type: "subject", text: "os mortos em Cristo (οἱ νεκροὶ ἐν Χριστῷ)", greek: "οἱ νεκροὶ ἐν Χριστῷ", strong: "G3498"},
      {id: "1ts416-5", type: "predicate", text: "ressuscitarão (ἀναστήσονται)", greek: "ἀναστήσονται", strong: "G450", children: [
        {id: "1ts416-5a", type: "adverbial", text: "primeiro (πρῶτον)", greek: "πρῶτον", strong: "G4413"}
      ]}
    ],
    explicacao: "Descida de Cristo: κελεύσματι = com ordem (comando divino). φωνῇ ἀρχαγγέλου = voz de arcanjo (autoridade celestial). σάλπιγγι θεοῦ = trombeta de Deus (convocação final). ἀναστήσονται = ressuscitarão (futuro médio).",
    notas: ["καταβήσεται = descerá (futuro médio)", "κελεύσματi = ordem, comando", "ἀρχαγγέλου = arcanjo (príncipe dos anjos)", "σάλπιγγι = trombeta (sinal de convocação)"]
  }
,
  {
    ref: "Hb 4:12",
    livro: "Hebreus",
    traducao: "Porque a palavra de Deus é viva, e eficaz, e mais cortante do que qualquer espada de dois gumes, e penetra até ao ponto de divisão da alma e do espírito, das articulações e dos miolos, e é julgadora dos pensamentos e propósitos do coração.",
    grego: "ζῶν γὰρ ὁ λόγος τοῦ θεοῦ καὶ ἐνεργὴς καὶ τομώτερος ὑπὲρ πᾶσαν μάχαιραν δίστομον καὶ διικνούμενος ἄχρι μερισμοῦ ψυχῆς καὶ πνεύματος, ἁρμῶν τε καὶ μυελῶν, καὶ κριτικὸς ἐνθυμήσεων καὶ ἐννοιῶν καρδίας.",
    diagrama: [
      {id: "hb412-1", type: "subject", text: "a palavra de Deus (ὁ λόγος τοῦ θεοῦ)", greek: "ὁ λόγος τοῦ θεοῦ", strong: "G3056"},
      {id: "hb412-2", type: "conjunction", text: "porque (γάρ)", greek: "γάρ", strong: "G1063"},
      {id: "hb412-3", type: "predicate", text: "é viva (ζῶν ἐστιν)", greek: "ζῶν", strong: "G2198", children: [
        {id: "hb412-3a", type: "complement", text: "eficaz (ἐνεργής)", greek: "ἐνεργής", strong: "G1756"},
        {id: "hb412-3b", type: "complement", text: "mais cortante (τομώτερος)", greek: "τομώτερος", strong: "G5114", children: [
          {id: "hb412-3b1", type: "adverbial", text: "do que qualquer espada (ὑπὲρ πᾶσαν μάχαιραν δίστομον)", greek: "ὑπὲρ πᾶσαν μάχαιραν δίστομον", strong: "G3162"}
        ]}
      ]},
      {id: "hb412-4", type: "predicate", text: "penetra (διικνούμενος)", greek: "διικνούμενος", strong: "G1338", children: [
        {id: "hb412-4a", type: "adverbial", text: "até (ἄχρι)", greek: "ἄχρι", strong: "G891"},
        {id: "hb412-4b", type: "object", text: "divisão da alma e do espírito (μερισμοῦ ψυχῆς καὶ πνεύματος)", greek: "μερισμοῦ ψυχῆς καὶ πνεύματος", strong: "G3313"},
        {id: "hb412-4c", type: "object", text: "articulações e miolos (ἁρμῶν τε καὶ μυελῶν)", greek: "ἁρμῶν τε καὶ μυελῶν", strong: "G719"}
      ]},
      {id: "hb412-5", type: "predicate", text: "é julgadora (κριτικός ἐστιν)", greek: "κριτικός", strong: "G2923", children: [
        {id: "hb412-5a", type: "genitive", text: "dos pensamentos e propósitos (ἐνθυμήσεων καὶ ἐννοιῶν)", greek: "ἐνθυμήσεων καὶ ἐννοιῶν", strong: "G1761"},
        {id: "hb412-5b", type: "genitive", text: "do coração (καρδίας)", greek: "καρδίας", strong: "G2588"}
      ]}
    ],
    explicacao: "Personificação da palavra: ζῶν = viva (tinha, não apenas antiga). ἐνεργής = eficaz (ativa, operante). τομώτερος = mais cortante (comparativo). μάχαιραν δίστομον = espada de dois gumes. Penetra ao mais profundo.",
    notas: ["ζῶν = viva (presente participial)", "ἐνεργής = eficaz, operante", "τομώτερος = mais cortante", "μερισμοῦ = divisão, separação"]
  }
,
  {
    ref: "Hb 11:1",
    livro: "Hebreus",
    traducao: "Ora, a fé é o firme fundamento das coisas que se esperam, e a prova das coisas que se não veem.",
    grego: "ἔστιν δὲ πίστις ὑπόστασις πραγμάτων ἔλεγχος οὐ βλεπομένων.",
    diagrama: [
      {id: "hb111-1", type: "predicate", text: "é (ἔστιν)", greek: "ἔστιν", strong: "G2076"},
      {id: "hb111-2", type: "conjunction", text: "ora (δέ)", greek: "δέ", strong: "G1161"},
      {id: "hb111-3", type: "subject", text: "a fé (πίστις)", greek: "πίστις", strong: "G4102"},
      {id: "hb111-4", type: "complement", text: "o firme fundamento (ὑπόστασις πραγμάτων)", greek: "ὑπόστασις πραγμάτων", strong: "G5287", children: [
        {id: "hb111-4a", type: "modifier", text: "das coisas que se esperam (πραγμάτων ἐλπιζομένων)", greek: "πραγμάτων ἐλπιζομένων", strong: "G1679"}
      ]},
      {id: "hb111-5", type: "complement", text: "a prova (ἔλεγχος)", greek: "ἔλεγχος", strong: "G1650", children: [
        {id: "hb111-5a", type: "modifier", text: "das coisas que não se veem (οὐ βλεπομένων)", greek: "οὐ βλεπομένων", strong: "G991"}
      ]}
    ],
    explicacao: "Definição de fé: ὑπόστασις = substância, firme fundamento (realidade concreta). ἔλεγχος = prova, convicção (evidência). Fé = certeza do invisível. Não é sentimento, mas realidade objetiva.",
    notas: ["ὑπόστασις = substância, fundamento", "ἔλεγχος = prova, demonstração", "ἐλπιζομένων = que se esperam (particípio passivo)", "βλεπομένων = que se veem (presente passivo)"]
  }
,
  {
    ref: "Tg 1:2",
    livro: "Tiago",
    traducao: "Meus irmãos, tende por motivo de grande alegria quando cairdes em provações diversas.",
    grego: "Πᾶσαν χαρὰν ἡγήσασθε, ἀδελφοί μου, ὅταν περιπέσητε πειρασμοῖς ποικίλοις.",
    diagrama: [
      {id: "tg12-1", type: "object", text: "toda alegria (Πᾶσαν χαράν)", greek: "Πᾶσαν χαράν", strong: "G5479"},
      {id: "tg12-2", type: "predicate", text: "tende (ἡγήσασθε)", greek: "ἡγήσασθε", strong: "G2233", children: [
        {id: "tg12-2a", type: "vocative", text: "meus irmãos (ἀδελφοί μου)", greek: "ἀδελφοί μου", strong: "G80"}
      ]},
      {id: "tg12-3", type: "conjunction", text: "quando (ὅταν)", greek: "ὅταν", strong: "G3752"},
      {id: "tg12-4", type: "predicate", text: "cairdes (περιπέσητε)", greek: "περιπέσητε", strong: "G4045", children: [
        {id: "tg12-4a", type: "dative", text: "em provações (πειρασμοῖς)", greek: "πειρασμοῖς", strong: "G3986"},
        {id: "tg12-4b", type: "modifier", text: "diversas (ποικίλοις)", greek: "ποικίλοις", strong: "G4164"}
      ]}
    ],
    explicacao: "ἡγήσασθε = considerai, tende por (imperativo aoristo). πᾶσαν χαράν = toda alegria (acusaivo). περιπέσητε = subjuntivo aoristo (quando caírem). ποικίλοις = diversas, variadas. Alegria na provação = maturidade espiritual.",
    notas: ["ἡγήσασθε = considerai (aoristo de ἡγέομαι)", "περιπέσητe = cair em (aoristo de περιπίπτω)", "πειρασμοῖς = provações, tentações", "ποικίλοις = diversas, multiformes"]
  }
,
  {
    ref: "1P 1:3",
    livro: "1 Pedro",
    traducao: "Bendito o Deus e Pai de nosso Senhor Jesus Cristo, que segundo a sua grande misericórdia nos regenerou para uma viva esperança, pela ressurreição de Jesus Cristo dentre os mortos.",
    grego: "εὐλογητὸς ὁ θεὸς καὶ πατὴρ τοῦ κυρίου ἡμῶν Ἰησοῦ Χριστοῦ ὁ κατὰ τὸ πολὺ αὐτοῦ ἔλεος ἀναγεννήσας ἡμᾶς εἰς ἐλπίδα ζῶσαν δι᾽ ἀναστάσεως Ἰησοῦ Χριστοῦ ἐκ νεκρῶν.",
    diagrama: [
      {id: "1p13-1", type: "subject", text: "bendito (εὐλογητός)", greek: "εὐλογητός", strong: "G2128", children: [
        {id: "1p13-1a", type: "modifier", text: "o Deus e Pai (ὁ θεὸς καὶ πατήρ)", greek: "ὁ θεὸς καὶ πατήρ", strong: "G2316"},
        {id: "1p13-1b", type: "modifier", text: "de nosso Senhor (τοῦ κυρίου ἡμῶν)", greek: "τοῦ κυρίου ἡμῶν", strong: "G2962"}
      ]},
      {id: "1p13-2", type: "modifier", text: "que nos regenerou (ἀναγεννήσας ἡμᾶς)", greek: "ἀναγεννήσας ἡμᾶς", strong: "G313", children: [
        {id: "1p13-2a", type: "adverbial", text: "segundo a sua grande misericórdia (κατὰ τὸ πολὺ αὐτοῦ ἔλεος)", greek: "κατὰ τὸ πολὺ αὐτοῦ ἔλεος", strong: "G1680"}
      ]},
      {id: "1p13-3", type: "complement", text: "para uma viva esperança (εἰς ἐλπίδα ζῶσαν)", greek: "εἰς ἐλπίδα ζῶσαν", strong: "G1680"},
      {id: "1p13-4", type: "adverbial", text: "pela ressurreição (δι᾽ ἀναστάσεως)", greek: "δι᾽ ἀναστάσεως", strong: "G386", children: [
        {id: "1p13-4a", type: "modifier", text: "de Jesus Cristo (Ἰησοῦ Χριστοῦ)", greek: "Ἰησοῦ Χριστοῦ", strong: "G2424"},
        {id: "1p13-4b", type: "adverbial", text: "dentre os mortos (ἐκ νεκρῶν)", greek: "ἐκ νεκρῶν", strong: "G3498"}
      ]}
    ],
    explicacao: "Eulogia: εὐλογητός = bendito (particípio passivo). ἀναγεννήσας = aoristo participial (nos regenerou). ἐλπίδα ζῶσαν = viva esperança (particípio ativo, esperança que tem vida). Ressurreição = base da esperança.",
    notas: ["εὐλογητός = bendito (particípio passivo)", "ἀναγεννήσας = regenerou (aoristo participial)", "ἔλεος = misericórdia, compaixão", "ζῶσαν = viva (particípio ativo)"]
  }
,
  {
    ref: "1Jo 4:8",
    livro: "1 João",
    traducao: "Aquele que não ama não conhece a Deus, porque Deus é amor.",
    grego: "ὁ μὴ ἀγαπῶν οὐκ ἔγνω τὸν θεόν, ὁ θεὸς ἀγάπη ἐστίν.",
    diagrama: [
      {id: "1jo48-1", type: "subject", text: "quem não ama (ὁ μὴ ἀγαπῶν)", greek: "ὁ μὴ ἀγαπῶν", strong: "G25", children: [
        {id: "1jo48-1a", type: "negation", text: "não (μή)", greek: "μή", strong: "G3361"}
      ]},
      {id: "1jo48-2", type: "predicate", text: "não conheceu (οὐκ ἔγνω)", greek: "οὐκ ἔγνω", strong: "G1097", children: [
        {id: "1jo48-2a", type: "object", text: "a Deus (τὸν θεόν)", greek: "τὸν θεόν", strong: "G2316"}
      ]},
      {id: "1jo48-3", type: "conjunction", text: "porque (ὅτι)", greek: "ὅτι", strong: "G3754"},
      {id: "1jo48-4", type: "subject", text: "Deus (ὁ θεός)", greek: "ὁ θεός", strong: "G2316"},
      {id: "1jo48-5", type: "predicate", text: "é (ἐστίν)", greek: "ἐστίν", strong: "G2076", children: [
        {id: "1jo48-5a", type: "complement", text: "amor (ἀγάπη)", greek: "ἀγάπη", strong: "G26"}
      ]}
    ],
    explicacao: "ὁ μὴ ἀγαπῶν = quem não ama (particípio presente negativo). οὐκ ἔγνω = aoristo (não conheceu, ponto decisivo). ἀγάπη ἐστίν = amor é (identidade absoluta). Deus não apenas ama — Deus É amor.",
    notas: ["ἀγαπῶν = particípio presente de ἀγαπάω", "ἔγνω = aoristo de γινώσκω (conhecer)", "ἀγάπη = amor (sacrificial, ágape)", "Identidade: Deus = amor"]
  }
,
  {
    ref: "1Jo 4:19",
    livro: "1 João",
    traducao: "Nós o amamos porque ele nos amou primeiro.",
    grego: "ἡμεῖς ἀγαπῶμεν αὐτόν, ὅτι αὐτὸς πρῶτος ἠγάπησεν ἡμᾶς.",
    diagrama: [
      {id: "1jo419-1", type: "subject", text: "nós (ἡμεῖς)", greek: "ἡμεῖς", strong: "G2249"},
      {id: "1jo419-2", type: "predicate", text: "amamos (ἀγαπῶμεν)", greek: "ἀγαπῶμεν", strong: "G25", children: [
        {id: "1jo419-2a", type: "object", text: "a ele (αὐτόν)", greek: "αὐτόν", strong: "G846"}
      ]},
      {id: "1jo419-3", type: "conjunction", text: "porque (ὅτι)", greek: "ὅτι", strong: "G3754"},
      {id: "1jo419-4", type: "subject", text: "ele (αὐτός)", greek: "αὐτός", strong: "G846"},
      {id: "1jo419-5", type: "adverbial", text: "primeiro (πρῶτος)", greek: "πρῶτος", strong: "G4413"},
      {id: "1jo419-6", type: "predicate", text: "amou (ἠγάπησεν)", greek: "ἠγάπησεν", strong: "G25", children: [
        {id: "1jo419-6a", type: "object", text: "a nós (ἡμᾶς)", greek: "ἡμᾶς", strong: "G2249"}
      ]}
    ],
    explicacao: "A causal do amor cristão: amamos porque fomos amados primeiro. πρῶτος = primeiro (iniciativa divina). ἠγάπησεν = aoristo (ponto histórico: a cruz). O amor humano é resposta ao amor divino.",
    notas: ["ἀγαπῶμεν = presente ativo (amamos continuamente)", "πρῶτος = primeiro (iniciativa)", "ἠγάπησεν = aoristo (amou na cruz)", "Causal: amor divino → amor humano"]
  }
,
  {
    ref: "Ap 3:20",
    livro: "Apocalipse",
    traducao: "Eis que estou à porta, e bato; se alguém ouvir a minha voz, e abrir a porta, entrarei em sua casa, e cearei com ele, e ele comigo.",
    grego: "ἰδοὺ ἕστηκα ἐπὶ τὴν θύραν καὶ κρούω· ἤν τις ἀκούσῃ τῆς φωνῆς μου καὶ ἀνοίξῃ τὴν θύραν, εἰσελεύσομαι πρὸς αὐτὸν καὶ δειπνήσω μετ᾽ αὐτοῦ καὶ αὐτὸς μετ᾽ ἐμοῦ.",
    diagrama: [
      {id: "ap320-1", type: "interjection", text: "eis (ἰδού)", greek: "ἰδού", strong: "G2400"},
      {id: "ap320-2", type: "predicate", text: "estou (ἕστηκα)", greek: "ἕστηκα", strong: "G2476", children: [
        {id: "ap320-2a", type: "adverbial", text: "à porta (ἐπὶ τὴν θύραν)", greek: "ἐπὶ τὴν θύραν", strong: "G2374"}
      ]},
      {id: "ap320-3", type: "conjunction", text: "e (καί)", greek: "καί", strong: "G2532"},
      {id: "ap320-4", type: "predicate", text: "bato (κρούω)", greek: "κρούω", strong: "G2925"},
      {id: "ap320-5", type: "conjunction", text: "se (ἤν τις)", greek: "ἤν τις", strong: "G1437"},
      {id: "ap320-6", type: "predicate", text: "ouvir (ἀκούσῃ)", greek: "ἀκούσῃ", strong: "G191", children: [
        {id: "ap320-6a", type: "object", text: "a minha voz (τῆς φωνῆς μου)", greek: "τῆς φωνῆς μου", strong: "G5456"}
      ]},
      {id: "ap320-7", type: "conjunction", text: "e (καί)", greek: "καί", strong: "G2532"},
      {id: "ap320-8", type: "predicate", text: "abrir (ἀνοίξῃ)", greek: "ἀνοίξῃ", strong: "G457", children: [
        {id: "ap320-8a", type: "object", text: "a porta (τὴν θύραν)", greek: "τὴν θύραν", strong: "G2374"}
      ]},
      {id: "ap320-9", type: "predicate", text: "entrarei (εἰσελεύσομαι)", greek: "εἰσελεύσομαι", strong: "G1525", children: [
        {id: "ap320-9a", type: "adverbial", text: "a sua casa (πρὸς αὐτόν)", greek: "πρὸς αὐτόν", strong: "G4314"}
      ]},
      {id: "ap320-10", type: "conjunction", text: "e (καί)", greek: "καί", strong: "G2532"},
      {id: "ap320-11", type: "predicate", text: "cearei (δειπνήσω)", greek: "δειπνήσω", strong: "G1172", children: [
        {id: "ap320-11a", type: "adverbial", text: "com ele (μετ᾽ αὐτοῦ)", greek: "μετ᾽ αὐτοῦ", strong: "G3326"}
      ]}
    ],
    explicacao: "Invitação de Cristo: ἕστηκα = perfeito (estou parado, estado). κρούω = bato (presente, continuamente). Condicional: ἀκούσῃ + ἀνοίξῃ (ouvir + abrir). δειπνήσω = cearei (comunhão íntima). Relação mútua.",
    notas: ["ἕστηκα = perfeito de ἵστημι (estou de pé)", "κρούω = bato (presente)", "ἀκούσῃ = subjuntivo aoristo de ἀκούω", "δειπνήσω = cearei (jantar íntimo)"]
  }
,
  {
    ref: "Ap 5:13",
    livro: "Apocalipse",
    traducao: "E toda a criatura que há debaixo do céu, e sobre a terra, e debaixo da terra, e sobre o mar, e todas as coisas que há neles, ouvi dizer: Ao que está sentado no trono, e ao Cordeiro, a bênção, e a honra, e a glória, e o poder, para sempre e sempre.",
    grego: "καὶ πᾶσα κτίσις ἡ ἐν τῷ οὐρανῷ καὶ ἐπὶ τῆς γῆς καὶ ὑποκάτω τῆς γῆς καὶ ἐπὶ τῆς θαλάσσης καὶ τὰ ἐν αὐταῖς πᾶσας ἤκουσα λέγοντας· τῷ καθημένῳ ἐπὶ τοῦ θρόνου καὶ τῷ ἀρνίῳ ἡ εὐλογία καὶ ἡ τιμὴ καὶ ἡ δόξα καὶ τὸ κράτος εἰς τοὺς αἰῶνας τῶν αἰώνων.",
    diagrama: [
      {id: "ap513-1", type: "subject", text: "toda a criatura (πᾶσα κτίσις)", greek: "πᾶσα κτίσις", strong: "G2937", children: [
        {id: "ap513-1a", type: "modifier", text: "no céu (ἐν τῷ οὐρανῷ)", greek: "ἐν τῷ οὐρανῷ", strong: "G3772"},
        {id: "ap513-1b", type: "modifier", text: "na terra (ἐπὶ τῆς γῆς)", greek: "ἐπὶ τῆς γῆς", strong: "G1093"},
        {id: "ap513-1c", type: "modifier", text: "debaixo da terra (ὑποκάτω τῆς γῆς)", greek: "ὑποκάτω τῆς γῆς", strong: "G5270"},
        {id: "ap513-1d", type: "modifier", text: "no mar (ἐπὶ τῆς θαλάσσης)", greek: "ἐπὶ τῆς θαλάσσης", strong: "G2281"}
      ]},
      {id: "ap513-2", type: "predicate", text: "ouviu (ἤκουσα)", greek: "ἤκουσα", strong: "G191", children: [
        {id: "ap513-2a", type: "object", text: "dizendo (λέγοντας)", greek: "λέγοντας", strong: "G3004"}
      ]},
      {id: "ap513-3", type: "dative", text: "ao que está sentado (τῷ καθημένῳ)", greek: "τῷ καθημένῳ", strong: "G2521", children: [
        {id: "ap513-3a", type: "modifier", text: "no trono (ἐπὶ τοῦ θρόνου)", greek: "ἐπὶ τοῦ θρόνου", strong: "G2362"}
      ]},
      {id: "ap513-4", type: "conjunction", text: "e (καί)", greek: "καί", strong: "G2532"},
      {id: "ap513-5", type: "dative", text: "ao Cordeiro (τῷ ἀρνίῳ)", greek: "τῷ ἀρνίῳ", strong: "G721"},
      {id: "ap513-6", type: "subject", text: "a bênção (ἡ εὐλογία)", greek: "ἡ εὐλογία", strong: "G2129", children: [
        {id: "ap513-6a", type: "conjunction", text: "e a honra (καὶ ἡ τιμή)", greek: "καὶ ἡ τιμή", strong: "G5092"},
        {id: "ap513-6b", type: "conjunction", text: "e a glória (καὶ ἡ δόξα)", greek: "καὶ ἡ δόξα", strong: "G1391"},
        {id: "ap513-6c", type: "conjunction", text: "e o poder (καὶ τὸ κράτος)", greek: "καὶ τὸ κράτος", strong: "G2904"},
        {id: "ap513-6d", type: "adverbial", text: "para sempre (εἰς τοὺς αἰῶνας τῶν αἰώνων)", greek: "εἰς τοὺς αἰῶνας τῶν αἰώνων", strong: "G165"}
      ]}
    ],
    explicacao: "Doxologia universal: πᾶσα κτίσις = toda criatura. Quatro attributos: εὐλογία (bênção), τιμή (honra), δόξα (glória), κράτος (poder). εἰς τοὺς αἰῶνας τῶν αἰώνων = para sempre e sempre (eternidade). Trono + Cordeiro = adoração dual.",
    notas: ["κτίσις = criatura", "καθημένῳ = particípio presente de κάθημαι (estar sentado)", "ἀρνίῳ = Cordeiro (Cristo sacrificado)", "κράτος = poder, domínio"]
  }
,
  {
    ref: "Ap 22:20",
    livro: "Apocalipse",
    traducao: "Aquele que dá testemunho destas coisas diz:certamente, cedo venho. Amém. Vem, Senhor Jesus.",
    grego: "λέγει ὁ μαρτυρῶν ταῦτα· ναί, ἔρχομαι ταχύ. Ἀμήν. ἔρχου, κύριε Ἰησοῦ.",
    diagrama: [
      {id: "ap2220-1", type: "predicate", text: "diz (λέγει)", greek: "λέγει", strong: "G3004", children: [
        {id: "ap2220-1a", type: "subject", text: "aquele que dá testemunho (ὁ μαρτυρῶν ταῦτα)", greek: "ὁ μαρτυρῶν ταῦτα", strong: "G3140"}
      ]},
      {id: "ap2220-2", type: "complement", text: "sim (ναί)", greek: "ναί", strong: "G3483"},
      {id: "ap2220-3", type: "predicate", text: "venho (ἔρχομαι)", greek: "ἔρχομαι", strong: "G2064", children: [
        {id: "ap2220-3a", type: "adverbial", text: "cedo (ταχύ)", greek: "ταχύ", strong: "G5034"}
      ]},
      {id: "ap2220-4", type: "interjection", text: "Amém (Ἀμήν)", greek: "Ἀμήν", strong: "G281"},
      {id: "ap2220-5", type: "predicate", text: "vem (ἔρχου)", greek: "ἔρχου", strong: "G2064", children: [
        {id: "ap2220-5a", type: "vocative", text: "Senhor Jesus (κύριε Ἰησοῦ)", greek: "κύριε Ἰησοῦ", strong: "G2962"}
      ]}
    ],
    explicacao: "Confirmação divina: ναί = sim (certeza). ταχύ = cedo (em breve). Ἀμήν = assim seja (ratificação). ἔρχου = imperativo médio (vem agora!). O último pedido do NT: Maranatha! Venha, Senhor!",
    notas: ["λέγει = presente de λέγω", "μαρτυρῶν = particípio presente de μαρτυρέω", "ναί = sim, verdadeiramente", "ἔρχου = imperativo de ἔρχομαι (vem)"]
  }
,
  {
    ref: "Mt 6:24",
    livro: "Mateus",
    traducao: "Ninguém pode servir a dois senhores; porque ou há de odiar um e amar o outro, ou há de se apegar a um e desprezar o outro. Não podeis servir a Deus e ao dinheiro.",
    grego: "οὐδεὶς δύναται δυσὶ κυρίοις δουλεύειν· ἢ γὰρ τὸν ἕνα μισήσει καὶ τὸν ἕτερον ἀγαπήσει, ἢ ἑνὸς ἀνθέξεται καὶ τοῦ ἑτέρου καταφρονήσετε. οὐ δύνασθε θεῷ δουλεύειν καὶ μαμωνᾷ.",
    diagrama: [
      {id: "mt624-1", type: "subject", text: "ninguém (οὐδείς)", greek: "οὐδείς", strong: "G3762"},
      {id: "mt624-2", type: "predicate", text: "pode (δύναται)", greek: "δύναται", strong: "G1410", children: [
        {id: "mt624-2a", type: "complement", text: "servir (δουλεύειν)", greek: "δουλεύειν", strong: "G1398", children: [
          {id: "mt624-2a1", type: "dative", text: "a dois senhores (δυσὶ κυρίοις)", greek: "δυσὶ κυρίοις", strong: "G2962"}
        ]}
      ]},
      {id: "mt624-3", type: "conjunction", text: "porque (γάρ)", greek: "γάρ", strong: "G1063"},
      {id: "mt624-4", type: "predicate", text: "odiará (μισήσει)", greek: "μισήσει", strong: "G3404", children: [
        {id: "mt624-4a", type: "object", text: "um (τὸν ἕνα)", greek: "τὸν ἕνα", strong: "G1520"},
        {id: "mt624-4b", type: "conjunction", text: "e amará (καὶ ἀγαπήσει)", greek: "καὶ ἀγαπήσει", strong: "G25", children: [
          {id: "mt624-4b1", type: "object", text: "o outro (τὸν ἕτερον)", greek: "τὸν ἕτερον", strong: "G2087"}
        ]}
      ]},
      {id: "mt624-5", type: "conjunction", text: "ou (ἤ)", greek: "ἤ", strong: "G2228"},
      {id: "mt624-6", type: "predicate", text: "se apegará (ἀνθέξεται)", greek: "ἀνθέξεται", strong: "G472", children: [
        {id: "mt624-6a", type: "genitive", text: "de um (ἑνός)", greek: "ἑνός", strong: "G1520"},
        {id: "mt624-6b", type: "conjunction", text: "e desprezará (καὶ καταφρονήσεται)", greek: "καὶ καταφρονήσεται", strong: "G2706", children: [
          {id: "mt624-6b1", type: "genitive", text: "do outro (τοῦ ἑτέρου)", greek: "τοῦ ἑτέρου", strong: "G2087"}
        ]}
      ]},
      {id: "mt624-7", type: "predicate", text: "não podeis (οὐ δύνασθε)", greek: "οὐ δύνασθε", strong: "G1410", children: [
        {id: "mt624-7a", type: "complement", text: "servir (δουλεύειν)", greek: "δουλεύειν", strong: "G1398", children: [
          {id: "mt624-7a1", type: "dative", text: "a Deus (θεῷ)", greek: "θεῷ", strong: "G2316"},
          {id: "mt624-7a2", type: "conjunction", text: "e (καί)", greek: "καί", strong: "G2532"},
          {id: "mt624-7a3", type: "dative", text: "ao dinheiro (μαμωνᾷ)", greek: "μαμωνᾷ", strong: "G3126"}
        ]}
      ]}
    ],
    explicacao: "Impossibilidade lógica: δύναται + infinitivo negado. μισήσει = odiará (futuro). ἀγαπήσει = amará (futuro). Contraste radical: Deus vs mammon. δουλεύειν = servir (escravo). Não há posição neutra.",
    notas: ["δουλεύειν = servir (como escravo)", "μαμωνᾷ = dinheiro, riquezas (aramaico)", "ἀνθέξετai = se apegará (futuro médio)", "καταφρονήσεται = desprezará (futuro médio)"]
  }
,
  {
    ref: "Mc 16:15",
    livro: "Marcos",
    traducao: "E disse-lhes: Ide por todo o mundo, e pregai o evangelho a toda a criatura.",
    grego: "καὶ εἶπεν αὐτοῖς· πορευθέντες εἰς τὸν κόσμον ἅπαντα κηρύξατε τὸ εὐαγγέλιον πάσῃ τῇ κτίσει.",
    diagrama: [
      {id: "mc1615-1", type: "predicate", text: "disse (εἶπεν)", greek: "εἶπεν", strong: "G2036", children: [
        {id: "mc1615-1a", type: "subject", text: "ele (Jesus)", greek: "αὐτοῖς", strong: "G846"},
        {id: "mc1615-1b", type: "dative", text: "a eles (αὐτοῖς)", greek: "αὐτοῖς", strong: "G846"}
      ]},
      {id: "mc1615-2", type: "predicate", text: "ide (πορευθέντες)", greek: "πορευθέντες", strong: "G4198", children: [
        {id: "mc1615-2a", type: "adverbial", text: "por todo o mundo (εἰς τὸν κόσμον ἅπαντα)", greek: "εἰς τὸν κόσμον ἅπαντα", strong: "G2889"}
      ]},
      {id: "mc1615-3", type: "predicate", text: "pregai (κηρύξατε)", greek: "κηρύξατε", strong: "G2784", children: [
        {id: "mc1615-3a", type: "object", text: "o evangelho (τὸ εὐαγγέλιον)", greek: "τὸ εὐαγγέλιον", strong: "G2098"},
        {id: "mc1615-3b", type: "dative", text: "a toda a criatura (πάσῃ τῇ κτίσει)", greek: "πάσῃ τῇ κτίσει", strong: "G2937"}
      ]}
    ],
    explicacao: "Grande Comissão em Marcos. πορευθέντες = ide (aoristo participial, ação primeiro). κηρύξατε = imperativo aoristo (pregai, proclamai). εἰς τὸν κόσμον ἅπαντa = todo o mundo (universalidade). πάσῃ τῇ κτίσεi = toda criatura.",
    notas: ["πορευθέντες = ide (aoristo de πορεύομαι)", "κηρύξατε = pregai (aoristo de κηρύσσω)", "κόσμον = mundo", "κτίσει = criatura"]
  }
,
  {
    ref: "2Co 5:17",
    livro: "2 Coríntios",
    traducao: "De modo que, se alguém está em Cristo, nova criatura é; as coisas antigas passaram; eis que se fizeram novas.",
    grego: "ὥστε εἴ τις ἐν Χριστῷ καινὴ κτίσις· τὰ ἀρχαῖα παρῆλθεν, ἰδοὺ γέγονεν καινά.",
    diagrama: [
      {id: "2co517-1", type: "conjunction", text: "de modo que (ὥστε)", greek: "ὥστε", strong: "G5620"},
      {id: "2co517-2", type: "conjunction", text: "se (εἰ)", greek: "εἰ", strong: "G1487"},
      {id: "2co517-3", type: "subject", text: "alguém (τις)", greek: "τις", strong: "G5100"},
      {id: "2co517-4", type: "predicate", text: "está (ἐστίν)", greek: "ἐστίν", strong: "G2076", children: [
        {id: "2co517-4a", type: "adverbial", text: "em Cristo (ἐν Χριστῷ)", greek: "ἐν Χριστῷ", strong: "G5547"}
      ]},
      {id: "2co517-5", type: "subject", text: "nova criatura (καινὴ κτίσις)", greek: "καινὴ κτίσις", strong: "G2537"},
      {id: "2co517-6", type: "predicate", text: "é (ἐστίν)", greek: "ἐστίν", strong: "G2076"},
      {id: "2co517-7", type: "subject", text: "as coisas antigas (τὰ ἀρχαῖα)", greek: "τὰ ἀρχαῖα", strong: "G744"},
      {id: "2co517-8", type: "predicate", text: "passaram (παρῆλθεν)", greek: "παρῆλθεν", strong: "G3928"},
      {id: "2co517-9", type: "interjection", text: "eis (ἰδού)", greek: "ἰδού", strong: "G2400"},
      {id: "2co517-10", type: "predicate", text: "se fizeram (γέγονεν)", greek: "γέγονεν", strong: "G1096", children: [
        {id: "2co517-10a", type: "complement", text: "novas (καινά)", greek: "καινά", strong: "G2537"}
      ]}
    ],
    explicacao: "ὥστε = portanto (conclusão). καινή κτίσις = nova criação (não reforma, mas transformação total). παρῆλθεν = passaram (aoristo, acabou). γέγονεν = perfeito (tornou-se novo, estado permanente). A identidade em Cristo é completamente nova.",
    notas: ["καινή = nova (qualidade nova, não temporal)", "κτίσις = criação", "παρῆλθεν = passaram (aoristo ativo)", "γέγονεν = tornou-se (perfeito de γίνομαι)"]
  }
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
