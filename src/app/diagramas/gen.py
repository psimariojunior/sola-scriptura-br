#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Generate the diagrams page.tsx with 100 sentence diagrams."""

import json, os

diagrams = []

# ============================================================
# OT (25)
# ============================================================

diagrams.append({
    "ref": "Gn 1:1", "livro": "Gênesis",
    "traducao": "No princípio Deus criou os céus e a terra.",
    "grego": "בְּרֵאשִׁית בָּרָא אֱלֹהִים אֵת הַשָּׁמַיִם וְאֵת הָאָרֶץ.",
    "diagrama": [
        {"id":"gn1-1","type":"adverbial","text":"No princípio (בְּרֵאשִׁית)","greek":"בְּרֵאשִׁית","strong":"H7225"},
        {"id":"gn1-2","type":"subject","text":"Deus (אֱלֹהִים)","greek":"אֱלֹהִים","strong":"H430"},
        {"id":"gn1-3","type":"predicate","text":"criou (בָּרָא)","greek":"בָּרָא","strong":"H1254","children":[
            {"id":"gn1-3a","type":"object","text":"os céus (הַשָּׁמַיִם)","greek":"הַשָּׁמַיִם","strong":"H8064"},
            {"id":"gn1-3b","type":"object","text":"a terra (הָאָרֶץ)","greek":"הָאָרֶץ","strong":"H776"}
        ]}
    ],
    "explicacao": "Frase adverbial temporal seguida de sujeito-predicado-objeto. בָּרָא (bara) é um verbo exclusivo divino — só Deus como sujeito. Indica criação ex nihilo. אֱלֹהִים é plural majestático, mas o verbo é singular.",
    "notas": ["בְּרֵאשִׁית = construção com bet consecutivo + reshit (primeiro)","בָּרָא = aoristo semítico, criação ex nihilo (exclusivo de Deus)","אֵת = partícula de objeto direto (não traduzida)","הַשָּׁמַיִם = plural majestático (céus = três céus em conceito semítico)"]
})

diagrams.append({
    "ref": "Gn 1:26-27", "livro": "Gênesis",
    "traducao": "Então Deus disse: Façamos o homem à nossa imagem, conforme a nossa semelhança. E Deus criou o homem à sua imagem; macho e fêmea os criou.",
    "grego": "וַיֹּאמֶר אֱלֹהִים נַֽעֲשֶׂ֥ה אָדָ֛ם בְּצַלְמֵ֖נוּ כִּדְמוּתֵ֑נוּ. וַיִּבְרָ֣א אֱלֹהִ֤ים אֶת־הָֽאָדָם֙ בְּצַלְמ֔וֹ זָכָ֥ר וּנְקֵבָ֖ה בָּרָ֥א אֹתָֽם׃",
    "diagrama": [
        {"id":"gn126-1","type":"vocative","text":"Deus (אֱלֹהִים)","greek":"אֱלֹהִים","strong":"H430"},
        {"id":"gn126-2","type":"predicate","text":"façamos (נַֽעֲשֶׂה)","greek":"נַֽעֲשֶׂה","strong":"H6213","children":[
            {"id":"gn126-2a","type":"object","text":"o homem (אָדָם)","greek":"אָדָם","strong":"H120"},
            {"id":"gn126-2b","type":"complement","text":"à nossa imagem (בְּצַלְמֵנוּ)","greek":"בְּצַלְמֵנוּ","strong":"H6754"}
        ]},
        {"id":"gn126-3","type":"predicate","text":"criou (וַיִּבְרָא)","greek":"וַיִּבְרָא","strong":"H1254","children":[
            {"id":"gn126-3a","type":"object","text":"o homem (הָאָדָם)","greek":"הָאָדָם","strong":"H120"},
            {"id":"gn126-3b","type":"complement","text":"à sua imagem (בְּצַלְמוֹ)","greek":"בְּצַלְמוֹ","strong":"H6754"}
        ]}
    ],
    "explicacao": "O plural נַֽעֲשֶׂה (\"façamos\") é interpretado como plural majestático ou conselho divino. צֶלֶם = imagem, representação; דְּמוּת = semelhança. A imagem de Deus não é física, mas funcional: domínio e relacionamento.",
    "notas": ["נַֽעֲשֶׂה = imperfecto plural Qal de עָשָׂה (fazer)","צֶלֶם = imagem, estátua, representação","כִּדְמוּתֵנוּ = conforme a nossa semelhança","zakhar u-neqebah = macho e fêmea"]
})

diagrams.append({
    "ref": "Gn 3:15", "livro": "Gênesis",
    "traducao": "Porei inimizade entre ti e a mulher, entre a tua semente e a sua semente; este te ferirá a cabeça, e tu lhe ferirás o calcanhar.",
    "grego": "אֵיבָ֣ה ׀ אָשִׁ֗ית בֵּֽינְךָ֙ וּבֵ֣ין הָֽאִשָּׁ֔ה. ה֚וּא יְשׁוּפְךָ֣ רֹ֔אשׁ וְאַתָּ֖ה תְּשׁוּפֶ֥נּוּ עָקֵֽב׃",
    "diagrama": [
        {"id":"gn315-1","type":"predicate","text":"porei (אָשִׁית)","greek":"אָשִׁית","strong":"H7760","children":[
            {"id":"gn315-1a","type":"object","text":"inimizade (אֵיבָה)","greek":"אֵיבָה","strong":"H342"},
            {"id":"gn315-1b","type":"adverbial","text":"entre ti e a mulher","greek":"בֵּינְךָ וּבֵין הָאִשָּׁה","strong":"H802"}
        ]},
        {"id":"gn315-2","type":"predicate","text":"ferirá (יְשׁוּפְךָ)","greek":"יְשׁוּפְךָ","strong":"H7779","children":[
            {"id":"gn315-2a","type":"object","text":"a cabeça (רֹאשׁ)","greek":"רֹאשׁ","strong":"H7218"}
        ]},
        {"id":"gn315-3","type":"predicate","text":"ferirás (תְּשׁוּפֶנּוּ)","greek":"תְּשׁוּפֶנּוּ","strong":"H7779","children":[
            {"id":"gn315-3a","type":"object","text":"o calcanhar (עָקֵב)","greek":"עָקֵב","strong":"H6119"}
        ]}
    ],
    "explicacao": "Protoevangelium — primeira promessa messiânica. שׁוּף (shuph) = esmagar/ferir. A semente da mulher (singular messiânico) ferirá a cabeça (morte) da serpente; a serpente ferirá o calcanhar (mortalidade temporária).",
    "notas": ["אֵיבָה = inimizade, ódio (raiz: אָיב = odiar)","זֶרַע = semente (singular coletivo, messiânico)","יְשׁוּפוּךָ = imperfecto Hiphil de שׁוּף (esmagar)","עָקֵב = calcanhar (ferimento não-fatal vs. cabeça = fatal)"]
})

diagrams.append({
    "ref": "Gn 12:1-3", "livro": "Gênesis",
    "traducao": "O SENHOR disse a Abram: Vai-te da tua terra, da tua parentela e da casa de teu pai, para a terra que eu te mostrarei. E far-te-ei uma grande nação, e abençoar-te-ei.",
    "grego": "וַיֹּ֤אמֶר יְהוָה֙ אֶל־אַבְרָ֔ם לֶךׇ־לְךָ֛ מֵאַרְצְךָ֥ וּמִמּוֹלַדְתְּךָ֖ וּמִבֵּ֣ית אָבִ֑יךָ אֶל־הָאָ֖רֶץ אֲשֶׁ֥ר אַרְאֶֽךָּ׃",
    "diagrama": [
        {"id":"gn12-1","type":"vocative","text":"O SENHOR (יְהוָה)","greek":"יְהוָה","strong":"H3068"},
        {"id":"gn12-2","type":"predicate","text":"vai-te (לֶךׇ־לְךָ)","greek":"לֶךׇ־לְךָ","strong":"H1981","children":[
            {"id":"gn12-2a","type":"adverbial","text":"da tua terra (מֵאַרְצְךָ)","greek":"מֵאַרְצְךָ","strong":"H776"},
            {"id":"gn12-2b","type":"adverbial","text":"da tua parentela","greek":"וּמִמּוֹלַדְתְּךָ","strong":"H4138"}
        ]},
        {"id":"gn12-3","type":"predicate","text":"farei (אֶעֶשְׂךָ)","greek":"אֶעֶשְׂךָ","strong":"H6213","children":[
            {"id":"gn12-3a","type":"object","text":"uma grande nação (גּוֹי גָּדוֹל)","greek":"גּוֹי גָּדוֹל","strong":"H1471"}
        ]}
    ],
    "explicacao": "Chamado de Abraão com sete promessas: (1) grande nação, (2) bênção, (3) grande nome, (4) ser bênção, (5) bênção aos abençoados, (6) maldição aos maldizentes, (7) todas as famílias benditas.",
    "notas": ["לֶךׇ־לְךָ = vai para ti (duplo acusativo)","מוֹלֶדֶת = nascimento, parentela, clã","גּוֹי = nação (povo politicamente organizado)","אֲאֹר = imperfecto Hiphil de אָרַר (amaldiçoar)"]
})

diagrams.append({
    "ref": "Gn 15:6", "livro": "Gênesis",
    "traducao": "E creu Abram no SENHOR, e isso lhe foi imputado por justiça.",
    "grego": "וְהֶֽאֱמִ֖ן בַּֽיהוָ֑ה וַיַּחְשְׁבֶ֥הָ לּ֖וֹ צְדָקָֽה׃",
    "diagrama": [
        {"id":"gn156-1","type":"subject","text":"Abram (אַבְרָם)","greek":"אַבְרָם","strong":"H87"},
        {"id":"gn156-2","type":"predicate","text":"creu (הֶאֱמִן)","greek":"הֶאֱמִן","strong":"H539","children":[
            {"id":"gn156-2a","type":"adverbial","text":"no SENHOR (בַּיהוָה)","greek":"בַּיהוָה","strong":"H3068"}
        ]},
        {"id":"gn156-3","type":"predicate","text":"imputou (יַחְשְׁבֶהָ)","greek":"יַחְשְׁבֶהָ","strong":"H2803","children":[
            {"id":"gn156-3a","type":"complement","text":"por justiça (צְדָקָה)","greek":"צְדָקָה","strong":"H6666"}
        ]}
    ],
    "explicacao": "Versículo central da justificação pela fé. הֶאֱמִן = Hiphil de אָמַן (crer). יָחַשֵׁב = considerar, imputar. A fé de Abraão foi creditada como justiça. Citações: Rm 4:3, Gl 3:6, Tg 2:23.",
    "notas": ["הֶאֱמִן = Hiphil de אָמַן (ser firme, crer)","יָחַשֵׁב = contar, imputar (contabilidade)","צְדָקָה = justiça, retidão (status covenantal)","Fundamento: Rm 4:3, Gl 3:6; Tg 2:23"]
})

diagrams.append({
    "ref": "Ex 3:14", "livro": "Êxodo",
    "traducao": "Deus disse a Moisés: EU SOU O QUE SOU. Assim dirás aos filhos de Israel: EU SOU me enviou a vocês.",
    "grego": "וַיֹּ֤אמֶר אֱלֹהִים֙ אֶל־מֹשֶׁ֔ה אֶהְיֶ֖ה אֲשֶׁ֣ר אֶהְיֶ֑ה. אֶהְיֶ֖ה שְׁלָחַ֥נִי אֲלֵיכֶֽם׃",
    "diagrama": [
        {"id":"ex3-1","type":"vocative","text":"Deus (אֱלֹהִים)","greek":"אֱלֹהִים","strong":"H430"},
        {"id":"ex3-2","type":"subject","text":"EU SOU (אֶהְיֶה)","greek":"אֶהְיֶה","strong":"H1961"},
        {"id":"ex3-3","type":"complement","text":"O QUE SOU (אֲשֶׁר אֶהְיֶה)","greek":"אֲשֶׁר אֶהְיֶה","strong":"H834"},
        {"id":"ex3-4","type":"predicate","text":"enviou (שְׁלָחַנִי)","greek":"שְׁלָחַנִי","strong":"H7971","children":[
            {"id":"ex3-4a","type":"subject","text":"EU SOU (אֶהְיֶה)","greek":"אֶהְיֶה","strong":"H1961"},
            {"id":"ex3-4b","type":"adverbial","text":"a vocês (אֲלֵיכֶם)","greek":"אֲלֵיכֶם","strong":"H413"}
        ]}
    ],
    "explicacao": "Nome revelado: אֶהְיֶה (ehyeh) = imperfeito de הָיָה (ser). Ação contínua: \"Eu Sou\" ou \"Eu Serei\". A ambiguidade é intencional — Deus é autossuficiente e soberano. LXX: ἐγώ εἰμι.",
    "notas": ["אֶהְיֶה = imperfeito Qal de הָיָה (ser)","אֲשֶׁר = pronome relativo (que, o que)","LXX: ἐγώ εἰμι (eu sou)","Título: autoexistência, imutabilidade, eternidade"]
})

diagrams.append({
    "ref": "Ex 20:1-3", "livro": "Êxodo",
    "traducao": "Deus proferiu todas estas palavras: Sou o SENHOR teu Deus, que te tirei do Egito. Não terás outros deuses diante de mim.",
    "grego": "אָנֹכִ֤י יְהוָה֙ אֱלֹהֶ֔יךָ אֲשֶׁ֧ר הוֹצֵאתִ֛יךָ מֵאֶ֥רֶץ מִצְרַ֖יִם מִבֵּ֥ית עֲבָדִֽים׃ לֹֽה־יִֽהְיֶ֥ה לְךָ֛ אֱלֹהִ֥ים אֲחֵרִ֖ים עַל־פָּנָֽיַם׃",
    "diagrama": [
        {"id":"ex20-1","type":"vocative","text":"Eu (אָנֹכִי)","greek":"אָנֹכִי","strong":"H595"},
        {"id":"ex20-2","type":"complement","text":"o SENHOR teu Deus (יְהוָה אֱלֹהֶיךָ)","greek":"יְהוָה אֱלֹהֶיךָ","strong":"H3068"},
        {"id":"ex20-3","type":"predicate","text":"tirei (הוֹצֵאתִיךָ)","greek":"הוֹצֵאתִיךָ","strong":"H3318","children":[
            {"id":"ex20-3a","type":"adverbial","text":"da terra do Egito (מֵאֶרֶץ מִצְרַיִם)","greek":"מֵאֶרֶץ מִצְרַיִם","strong":"H4714"}
        ]},
        {"id":"ex20-4","type":"predicate","text":"não terás (לֹא יִהְיֶה)","greek":"לֹא יִהְיֶה","strong":"H3808","children":[
            {"id":"ex20-4a","type":"object","text":"outros deuses (אֱלֹהִים אֲחֵרִים)","greek":"אֱלֹהִים אֲחֵרִים","strong":"H430"}
        ]}
    ],
    "explicacao": "Préâmbulo dos Dez Mandamentos. אָנֹכִי = pronome enfático (\"Eu mesmo\"). A identidade divina é fundamento da obediência. A redenção do Egito é base da obrigação moral.",
    "notas": ["אָנֹכִי = pronome 1ª pessoa (ênfase)","עֲבָדִים = servos, escravos","אֱלֹהִים אֲחֵרִים = deuses outros","Decálogo: Sinaitico vs. Deuteronômico (Dt 5)"]
})

diagrams.append({
    "ref": "Dt 6:4-5", "livro": "Deuteronômio",
    "traducao": "Ouve, Israel: O SENHOR nosso Deus é o único SENHOR. Amarás o SENHOR teu Deus de todo o teu coração, de toda a tua alma e de todo o teu poder.",
    "grego": "שְׁמַ֣ע יִשְׂרָאֵ֔ל יְהוָ֥ה אֱלֹהֵ֖ינוּ יְהוָ֥ה אֶחָֽד׃ וְאָהַבְתָּ֖ אֵ֣ת יְהוָ֣ה אֱלֹהֶ֑יךָ בְּכָל־לְבָבְךָ֥ וּבְכָל־נַפְשְׁךָ֖ וּבְכָל־מְאֹדֶֽךָ׃",
    "diagrama": [
        {"id":"dt6-1","type":"interjection","text":"Ouve (שְׁמַע)","greek":"שְׁמַע","strong":"H8085"},
        {"id":"dt6-2","type":"vocative","text":"Israel (יִשְׂרָאֵל)","greek":"יִשְׂרָאֵל","strong":"H3478"},
        {"id":"dt6-3","type":"subject","text":"O SENHOR (יְהוָה)","greek":"יְהוָה","strong":"H3068"},
        {"id":"dt6-4","type":"complement","text":"é o único SENHOR (אֶחָד)","greek":"אֶחָד","strong":"H259"},
        {"id":"dt6-5","type":"predicate","text":"amarás (וְאָהַבְתָּ)","greek":"וְאָהַבְתָּ","strong":"H157","children":[
            {"id":"dt6-5a","type":"object","text":"o SENHOR teu Deus","greek":"אֵת יְהוָה אֱלֹהֶיךָ","strong":"H3068"},
            {"id":"dt6-5b","type":"adverbial","text":"de todo o coração","greek":"בְּכָל־לְבָבְךָ","strong":"H3824"},
            {"id":"dt6-5c","type":"adverbial","text":"de toda a alma","greek":"וּבְכָל־נַפְשְׁךָ","strong":"H5315"},
            {"id":"dt6-5d","type":"adverbial","text":"de todo o poder","greek":"וּבְכָל־מְאֹדֶךָ","strong":"H3966"}
        ]}
    ],
    "explicacao": "Shemá Israel — monoteísmo bíblico. שְׁמַע = ouvir + obedecer. אֶחָד = um (numeral). Três aspectos: לֵב (decisão), נֶפֶשׁ (ser), מְאֹד (força).",
    "notas": ["שְׁמַע = imperativo de שָׁמַע (ouvir com obediência)","יְהוָה = tetragrama sagrado (YHWH)","אֶחָד = um (unidade, não exclusividade)","Recitado 2x ao dia na tradição judaica"]
})

diagrams.append({
    "ref": "1 Sm 16:7", "livro": "1 Samuel",
    "traducao": "O SENHOR não vê como vê o homem; porque o homem vê o que está diante dos seus olhos, mas o SENHOR vê o coração.",
    "grego": "כִּ֤י לֹא֙ כַּאֲשֶׁ֣ר יִרְאֶ֣ה הָאָדָ֔ם יִרְאֶ֖ה הָֽיהוָ֑ה כִּ֤י הָאָדָם֙ יִרְאֶ֣ה לַעֵינַ֔יִם וַיהוָ֖ה יִרְאֶ֥ה לַלֵּֽבָב׃",
    "diagrama": [
        {"id":"1sm16-1","type":"adverbial","text":"o homem vê (הָאָדָם יִרְאֶה)","greek":"הָאָדָם יִרְאֶה","strong":"H120","children":[
            {"id":"1sm16-1a","type":"adverbial","text":"diante dos olhos (לַעֵינַיִם)","greek":"לַעֵינַיִם","strong":"H5869"}
        ]},
        {"id":"1sm16-2","type":"adverbial","text":"o SENHOR vê (יְהוָה יִרְאֶה)","greek":"יְהוָה יִרְאֶה","strong":"H3068","children":[
            {"id":"1sm16-2a","type":"adverbial","text":"o coração (לַלֵּבָב)","greek":"לַלֵּבָב","strong":"H3824"}
        ]}
    ],
    "explicacao": "Contraste antitético: humano vs. divino. יִרְאֶה (ver) em dois sentidos: superficial (olhos) vs. profundo (coração). לֵבָב = centro da decisão, não apenas emoção.",
    "notas": ["תַּבִּט = imperativo de נָבַט (olhar)","מַרְאֶה = aparência","גֹּבַהּ קֹמָה = altura da estatura","לֵבָב = coração (centro da decisão)"]
})

diagrams.append({
    "ref": "1 Sm 17:45-47", "livro": "1 Samuel",
    "traducao": "David disse: Tu vens com espada e lança; eu venho em nome do SENHOR dos Exércitos. E toda a terra saberá que há Deus em Israel.",
    "grego": "וַיֹּ֤אמֶר דָּוִד֙ אֶל־הַפְּלִשְׁתִּ֔י בְּשֵׁ֣ם יְהוָ֣ה צְבָא֔וֹת. וְיָדְעָ֥ה כָל־הָאָ֖רֶץ כִּ֥י יֵֽשׁ אֱלֹהִ֖ים לְיִשְׂרָאֵֽל׃",
    "diagrama": [
        {"id":"1sm17-1","type":"adverbial","text":"em nome do SENHOR (בְּשֵׁם יְהוָה)","greek":"בְּשֵׁם יְהוָה","strong":"H8034","children":[
            {"id":"1sm17-1a","type":"complement","text":"SENHOR dos Exércitos (יְהוָה צְבָאוֹת)","greek":"יְהוָה צְבָאוֹת","strong":"H6635"}
        ]},
        {"id":"1sm17-2","type":"predicate","text":"saberá (וְיָדְעָה)","greek":"וְיָדְעָה","strong":"H3045","children":[
            {"id":"1sm17-2a","type":"subject","text":"toda a terra","greek":"כָּל־הָאָרֶץ","strong":"H776"},
            {"id":"1sm17-2b","type":"complement","text":"que há Deus em Israel","greek":"כִּי יֵשׁ אֱלֹהִים","strong":"H430"}
        ]}
    ],
    "explicacao": "De fé antes do combate. יְהוָה צְבָאוֹת = SENHOR dos Exércitos. David substitui armas humanas pelo שֵׁם (nome/poder) de YHWH. O resultado é teofania.",
    "notas": ["צְבָאוֹת = exércitos (título celestial)","בְּשֵׁם = em nome de (identidade/autoridade)","חֵרַפְתָּ = desafiaste (de חָרַף)","fulfillment: vitória de Davi sobre Golias"]
})

diagrams.append({
    "ref": "2 Sm 7:12-16", "livro": "2 Samuel",
    "traducao": "Eu levantarei a tua semente e estabelecerei o seu reino. Ele edificará uma casa ao meu nome. Eu serei o seu pai, e ele será o meu filho.",
    "grego": "וַהֲקִימֹתִי אֶת־זַרְעֲךָ֣ אַחֲרֶ֔יךָ. וַהֲכִינֹ֥תִי אֶת־מַמְלַכְתּֽוֹ׃ אֲנִ֤י אֶהְיֶ֣ה לּ֔וֹ לְאָ֖ב וְה֣וּא יִֽהְיֶה־לִּ֑י לְבֵּ֗ן.",
    "diagrama": [
        {"id":"2sm7-1","type":"predicate","text":"levantarei (וַהֲקִימֹתִי)","greek":"וַהֲקִימֹתִי","strong":"H6965","children":[
            {"id":"2sm7-1a","type":"object","text":"a tua semente (זַרְעֲךָ)","greek":"זַרְעֲךָ","strong":"H2233"}
        ]},
        {"id":"2sm7-2","type":"predicate","text":"edificará (יִבְנֶה)","greek":"יִבְנֶה","strong":"H1129","children":[
            {"id":"2sm7-2a","type":"object","text":"uma casa (בַּיִת)","greek":"בַּיִת","strong":"H1004"}
        ]},
        {"id":"2sm7-3","type":"predicate","text":"serei pai (אֶהְיֶה)","greek":"אֶהְיֶה","strong":"H1961","children":[
            {"id":"2sm7-3a","type":"complement","text":"o seu pai","greek":"לְאָב","strong":"H1"}
        ]}
    ],
    "explicacao": "Aliança Davídica. Duas casas: semente edifica casa (templo) e Deus estabelece dinastia eterna. Incondicional para a linhagem, condicional para reis individuais (v.14-15).",
    "notas": ["זֶרַע = semente (descendência)","בַּיִת = casa (templo + dinastia)","fulfillment: Salomão → Cristo (reino eterno)","מַמְלָכָה = reino, realeza"]
})

diagrams.append({
    "ref": "Sl 1:1-6", "livro": "Salmos",
    "traducao": "Bem-aventurado o homem que não andou no conselho dos ímpios. Mas o seu prazer está na lei do SENHOR. Será como árvore plantada junto a correntes de água.",
    "grego": "אַ֥שְּׁרֵי הָאִ֗ישׁ אֲשֶׁ֤ר לֹ֥א הָלַךְ֮ בַּֽעֲצַ֪ת רְשָׁעִ֥ים. כִּ֤י אִ֥ם בְּתוֹרַ֥ת יְהוָ֗ה חֶ֫פְצ֥וֹ. וְהָיָ֗ה כְּעֵ֣ץ שָֽׁתּוּל֮ עֲלֵ֪י פַ֫לְגֵ֥י מָ֡יִם.",
    "diagrama": [
        {"id":"sl1-1","type":"complement","text":"Bem-aventurado (אַשְּׁרֵי)","greek":"אַשְּׁרֵי","strong":"H835"},
        {"id":"sl1-2","type":"subject","text":"o homem (הָאִישׁ)","greek":"הָאִישׁ","strong":"H376"},
        {"id":"sl1-3","type":"predicate","text":"não andou (לֹא הָלַךְ)","greek":"לֹא הָלַךְ","strong":"H1981","children":[
            {"id":"sl1-3a","type":"adverbial","text":"no conselho dos ímpios","greek":"בַּעֲצַת רְשָׁעִים","strong":"H6098"},
            {"id":"sl1-3b","type":"adverbial","text":"no caminho dos pecadores","greek":"בְּדֶרֶךְ חַטָּאִים","strong":"H2396"}
        ]},
        {"id":"sl1-4","type":"predicate","text":"será como árvore (כְּעֵץ)","greek":"כְּעֵץ","strong":"H6086","children":[
            {"id":"sl1-4a","type":"complement","text":"plantada junto a águas","greek":"שָׁתּוּל עֲלֵי פַלְגֵי מָיִם","strong":"H5193"}
        ]}
    ],
    "explicacao": "Salmo introdutório. Três negativos: não andou, não esteve, não se assentou. A lei é prazer (חֵפֶץ), não obrigação. A arvore = prosperidade contínua.",
    "notas": ["אַשְּׁרֵי = feliz, abençoado","הָלַךְ → עָמַד → יָשָׁב = andar → parar → sentar","תּוֹרָה = instrução, lei","פַּלְגֵי = correntes (água corrente = vida)"]
})

diagrams.append({
    "ref": "Sl 22:1-31", "livro": "Salmos",
    "traducao": "Deus meu, Deus meu, por que me desamparaste? Eu sou verme, e não homem. Todos os que me veem zombam de mim. Mas tu és o que me tirou do ventre.",
    "grego": "אֵ֣לִי אֵ֭לִי לְמָ֣ה עֲזַבְתָּ֑נִי. אֲנִ֣י תוֹלַ֣עַת וְלֹא־אִ֑ישׁ חֶרְפַּ֥ת אָדָ֝֗ם וּבְז֣וּי עָֽם׃",
    "diagrama": [
        {"id":"sl22-1","type":"vocative","text":"Deus meu (אֵלִי)","greek":"אֵלִי","strong":"H413"},
        {"id":"sl22-2","type":"predicate","text":"desamparaste (עֲזַבְתָּנִי)","greek":"עֲזַבְתָּנִי","strong":"H5800"},
        {"id":"sl22-3","type":"subject","text":"eu (אֲנִי)","greek":"אֲנִי","strong":"H589"},
        {"id":"sl22-4","type":"complement","text":"verme, não homem (תוֹלַעַת וְלֹא אִישׁ)","greek":"תוֹלַעַת","strong":"H8438"},
        {"id":"sl22-5","type":"complement","text":"opróbrio dos homens (חֶרְפַּת אָדָם)","greek":"חֶרְפַּת אָדָם","strong":"H2781"}
    ],
    "explicacao": "Salmo messiânico citado na cruz (Mt 27:46). אֵלִי אֵלִי = clame duplo de agonía. תּוֹלַעַт = verme (corpo corrompido, baixeza extrema). Cumprimento literal em Mt 27:39-44.",
    "notas": ["אֵלִי = meu Deus (de El = Deus, possesivo)","עָזַב = abandonar, deixar","תּוֹלַעַת = verme (degradação)","Cumprimento: Mt 27:39-46"]
})

diagrams.append({
    "ref": "Sl 23:1-6", "livro": "Salmos",
    "traducao": "O SENHOR é o meu pastor; nada me faltará. Para pastos verdes me fará deitar. A minha alma refaz; guia-me pelas veredas da justiça.",
    "grego": "יְהוָ֥ה רֹ֝עִ֗י לֹ֣א אֶחְסָֽר׃ בִּנְא֣וֹת דֶּ֭שֶׁא יַרְבִּיצֵ֑נִי. נַפְשִׁ֥י יְשׁוֹבֵ֑ב יְנַהֲגֵ֥נִי בְמַעְגְּלֵי־צֶ֝֗דֶק לְמַ֣עַן שְׁמֽוֹ׃",
    "diagrama": [
        {"id":"sl23-1","type":"subject","text":"O SENHOR (יְהוָה)","greek":"יְהוָה","strong":"H3068"},
        {"id":"sl23-2","type":"complement","text":"é o meu pastor (רֹעִי)","greek":"רֹעִי","strong":"H7462"},
        {"id":"sl23-3","type":"predicate","text":"nada me faltará (לֹא אֶחְסָר)","greek":"לֹא אֶחְסָר","strong":"H2637"}
    ],
    "explicacao": "Metáfora pastoral: יְהוָה = sujeito, רֹעִi = predicativo. לֹא אֶחְסָר usa imperfecto de חָסֵר (faltar), indicando provisão contínua.",
    "notas": ["רֹעִי = particípio de רָעָה (apascentar)","אֶחְסָר = imperfecto de חָסֵר (faltar)","Metáfora covenantal (cf. Jr 23:1-4)","Contexto: Davi, pastor rei"]
})

diagrams.append({
    "ref": "Sl 51:1-17", "livro": "Salmos",
    "traducao": "Tem misericórdia de mim, ó Deus. Cria em mim um coração limpo, e renova em mim um espírito reto.",
    "grego": "חָנֵּ֣נִי אֱלֹהִ֣ים כְּחַסְדֶּ֑ךָ. לֵ֣ב טָ֭הוֹר בְּרָא־לִ֣י אֱלֹהִ֑ים וְר֣וּחַ נָ֭כֹון חַדֵּ֥שׁ בְּקִרְבִּֽי׃",
    "diagrama": [
        {"id":"sl51-1","type":"predicate","text":"tem misericórdia (חָנֵּנִי)","greek":"חָנֵּנִי","strong":"H2603","children":[
            {"id":"sl51-1a","type":"adverbial","text":"conforme a benignidade (כְּחַסְדֶּךָ)","greek":"כְּחַסְדֶּךָ","strong":"H2617"}
        ]},
        {"id":"sl51-2","type":"predicate","text":"cria (בְּרָא)","greek":"בְּרָא","strong":"H1254","children":[
            {"id":"sl51-2a","type":"object","text":"coração limpo (לֵב טָהוֹר)","greek":"לֵב טָהוֹר","strong":"H3824"}
        ]},
        {"id":"sl51-3","type":"predicate","text":"renova (חַדֵּשׁ)","greek":"חַדֵּשׁ","strong":"H2318","children":[
            {"id":"sl51-3a","type":"object","text":"espírito reto (רוּחַ נָכֹון)","greek":"רוּחַ נָכֹון","strong":"H7307"}
        ]}
    ],
    "explicacao": "Salmo de penitência (após pecado com Bate-Seba). בְּרָא = criar (mesmo de Gn 1:1, criação nova). Pedido por transformação interior, não anulação do pecado.",
    "notas": ["חָנֵּנִי = ter grça (de חָנַן)","בְּרָא = criar (exclusivo divino)","לֵב טָהוֹר = coração puro","Contexto: 2 Sm 11-12"]
})

diagrams.append({
    "ref": "Sl 95:1-11", "livro": "Salmos",
    "traducao": "Vinde, exultemos ao SENHOR. Porque o SENHOR é o grande Deus, o grande rei sobre todos os deuses.",
    "grego": "לְּכ֣וּ נְ֭רַנְּנָה לַיהוָ֑ה. כִּ֤י אֵ֣ל גָּ֭דוֹל יְהוָ֑ה וּמֶ֖לֶךְ גָּד֣וֹל עַל־כָּל־אֱלֹהִֽים׃",
    "diagrama": [
        {"id":"sl95-1","type":"interjection","text":"vinde (לְּכוּ)","greek":"לְּכוּ","strong":"H3212"},
        {"id":"sl95-2","type":"predicate","text":"exultemos (נְרַנְּנָה)","greek":"נְרַנְּנָה","strong":"H7442","children":[
            {"id":"sl95-2a","type":"adverbial","text":"ao SENHOR (לַיהוָה)","greek":"לַיהוָה","strong":"H3068"}
        ]},
        {"id":"sl95-3","type":"subject","text":"o SENHOR (יְהוָה)","greek":"יְהוָה","strong":"H3068"},
        {"id":"sl95-4","type":"complement","text":"grande Deus (אֵל גָּדוֹל)","greek":"אֵל גָּדוֹל","strong":"H413"},
        {"id":"sl95-5","type":"complement","text":"grande rei sobre todos os deuses","greek":"מֶלֶךְ גָּדוֹל עַל כָּל אֱלֹהִים","strong":"H4428"}
    ],
    "explicacao": "Salmo litúrgico. Tres imperativos. El Gadol = Deus grande (força); Melekh Gadol = Rei grande (autoridade). Fórmula de soberania sobre todos os deuses.",
    "notas": ["לְּכוּ = imperativo de halakh (ir)","צּוּר = rocha (refúgio)","אֵל = Deus (título de poder)","Conteúdo: louvor + advertência (vv.7-11)"]
})

diagrams.append({
    "ref": "Sl 110:1-7", "livro": "Salmos",
    "traducao": "O SENHOR disse ao meu Senhor: Senta-te à minha destra. O SENHOR estenderá o ceptro do teu poder desde Sião.",
    "grego": "נְּא֥ם יְהוָ֗ה לַֽאדֹנִ֫י שֵׁ֥ב לִֽימִינִ֑י. מַטֵּה־עֹ֭ז יִשְׁלַ֣ח יְהוָ֑ה מִצִּ֥יּוֹן רֵ֝֗ד בְּקֶ֣רֶב אֹיְבֶֽיךָ׃",
    "diagrama": [
        {"id":"sl110-1","type":"vocative","text":"o meu Senhor (אֲדֹנִי)","greek":"אֲדֹנִי","strong":"H113"},
        {"id":"sl110-2","type":"predicate","text":"senta-te (שֵׁב)","greek":"שֵׁב","strong":"H3427","children":[
            {"id":"sl110-2a","type":"adverbial","text":"à minha destra (לִימִינִי)","greek":"לִימִינִי","strong":"H3225"}
        ]},
        {"id":"sl110-3","type":"predicate","text":"estenderá (יִשְׁלַח)","greek":"יִשְׁלַח","strong":"H7971","children":[
            {"id":"sl110-3a","type":"object","text":"ceptro de poder (מַטֵּה עֹז)","greek":"מַטֵּה עֹז","strong":"H4294"}
        ]}
    ],
    "explicacao": "Salmo messiânico mais citado no NT. אֲדֹנִי = titulo messiânico. YHWH fala ao Mashiach e o exalta à destra. Tres temas: exaltação, sacerdócio (v.4), juízo.",
    "notas": ["אָדוֹן = senhor (título de autoridade)","לִימִינִי = à minha destra (honra/poder)","מַטֵּה עֹז = ceptro de força","Melquisedeque (v.4): Hb 7"]
})

diagrams.append({
    "ref": "Sl 119:1-8", "livro": "Salmos",
    "traducao": "Bem-aventurados os inteiros no caminho, que andam na lei do SENHOR. Guardam os seus testemunhos, buscam-no de todo o coração.",
    "grego": "אַ֥שְּׁרֵי תְמִימֵי־דָ֑רֶךְ הַ֝הֹלְכִ֗ים בְּתוֹרַ֥ת יְהוָֽה׃ אַֽשְׁרֵ֥י נוֹצְרֵ֗י עֵדֹתָ֥יו בְּכָל־לֵ֑ב.",
    "diagrama": [
        {"id":"sl119-1","type":"complement","text":"Bem-aventurados (אַשְּׁרֵי)","greek":"אַשְּׁרֵי","strong":"H835"},
        {"id":"sl119-2","type":"subject","text":"os inteiros (תְּמִימֵי)","greek":"תְּמִימֵי","strong":"H8549"},
        {"id":"sl119-3","type":"predicate","text":"andam (הַהֹלְכִים)","greek":"הַהֹלְכִים","strong":"H1981","children":[
            {"id":"sl119-3a","type":"adverbial","text":"na lei do SENHOR","greek":"בְּתוֹרַת יְהוָה","strong":"H8451"}
        ]},
        {"id":"sl119-4","type":"predicate","text":"guardam (נוֹצְרֵי)","greek":"נוֹצְרֵי","strong":"H5341","children":[
            {"id":"sl119-4a","type":"object","text":"os testemunhos (עֵדֹתָיו)","greek":"עֵdֹתָיו","strong":"H5713"}
        ]}
    ],
    "explicacao": "Inicio do mais longo salmo (222 versos), acróstico por alfabeto hebraico. תָּמִים = inteiro, completo. שׁמר = guardar, observar. Busca de kol lev (todo o coração).",
    "notas": ["תְּמִימֵי = íntegros (de tamam)","נוֹצְרֵי = guardando (de natsar)","עֵדוּת = testemunho, mandamento","Salmo acróstico: 22 seções × 8 versos"]
})

diagrams.append({
    "ref": "Sl 139:1-18", "livro": "Salmos",
    "traducao": "SENHOR, tu me examinaste e me conheceste. Tu sabes quando me assento e quando me levanto. Todos os meus caminhos te são conhecidos.",
    "grego": "יְ֭הוָה חֲקַרְתַּ֣נִי וַתֵּדָ֑עָנִי. אַתָּ֥ה יָ֝דַ֗עְתָּ שִּׁבְתִּ֥י וְקוּמִֽי׃",
    "diagrama": [
        {"id":"sl139-1","type":"vocative","text":"SENHOR (יְהוָה)","greek":"יְהוָה","strong":"H3068"},
        {"id":"sl139-2","type":"predicate","text":"examinaste (חֲקַרְתַּנִי)","greek":"חֲקַרְתַּנִי","strong":"H2713"},
        {"id":"sl139-3","type":"predicate","text":"conheceste (תֵּדָעָנִי)","greek":"תֵּדָעָנִי","strong":"H3045"},
        {"id":"sl139-4","type":"predicate","text":"sabes (יָדַעְתָּ)","greek":"יָדַעְתָּ","strong":"H3045","children":[
            {"id":"sl139-4a","type":"complement","text":"quando me assento (שִׁבְתִּי)","greek":"שִׁבְתִּי","strong":"H3427"},
            {"id":"sl139-4b","type":"complement","text":"quando me levanto (קוּמִי)","greek":"קוּמִי","strong":"H6965"}
        ]}
    ],
    "explicacao": "Onisciência divina. חָקַר = investigar profundamente (como escavar). יָדַע = conhecer intimamente. Cinco verbos de conhecimento. Deus sabe tudo antes de acontecer.",
    "notas": ["חָקַר = investigar, escavar","יָדַע = conhecer intimamente","בָּנְתָּה = construiste, entendeste","כָּל דְּרָכַי = todos os meus caminhos"]
})

diagrams.append({
    "ref": "Is 6:1-8", "livro": "Isaías",
    "traducao": "No ano em que morreu o rei Uzias vi o SENHOR assentado sobre um trono alto. Então voou um serafim para mim. E eu disse: Ai de mim! Então um dos serafims voou com uma brasa viva.",
    "grego": "בִּשְׁנַ֣ת מ֔וֹת הַמֶּ֖לֶךְ עֻזִּיָּ֣הוּ רָאִ֣יתִי ׀ אֶת־אֲדֹנָ֑י. וָאֹ֣מַר אֽוֹי־לִ֔י כִּ֥י נִדְמֵ֖יתִי. וַיָּ֤עָף אֵלַי֙ אֶחָ֣ד מִן־הַשְּׂרָפִ֔ים.",
    "diagrama": [
        {"id":"is6-1","type":"adverbial","text":"no ano da morte (בִּשְׁנַת מּוֹת)","greek":"בִּשְׁנַת מּוֹת","strong":"H8141"},
        {"id":"is6-2","type":"subject","text":"vi (רָאִיתִי)","greek":"רָאִיתִי","strong":"H7200","children":[
            {"id":"is6-2a","type":"object","text":"o SENHOR (אֲדֹנָי)","greek":"אֲדֹנָי","strong":"H136"}
        ]},
        {"id":"is6-3","type":"predicate","text":"assentado (יֹשֵׁב)","greek":"יֹשֵׁב","strong":"H3427","children":[
            {"id":"is6-3a","type":"adverbial","text":"sobre um trono","greek":"עַל כִּסֵּא","strong":"H3678"}
        ]},
        {"id":"is6-4","type":"predicate","text":"voou (וַיָּעָף)","greek":"וַיָּעָף","strong":"H5774","children":[
            {"id":"is6-4a","type":"subject","text":"um serafim","greek":"אֶחָד מִן הַשְּׂרָפִים","strong":"H8314"}
        ]}
    ],
    "explicacao": "Chamada de Isaías. Visão da glória divina. שְׂרָפִים = seres ardentes (6 asas). A brasa purifica os lábios (v.6-7). \"hineni shelaicheni\" = aqui estou, envia-me.",
    "notas": ["אֲדֹנָי = Senhor (reverência)","שְׂרָפִים = seres ardentes (anjos)","טְמֵא שְׂפָתַיִם = impuro de lábios","hineni = aqui estou (resposta de serviço)"]
})

diagrams.append({
    "ref": "Is 7:14", "livro": "Isaías",
    "traducao": "Portanto o próprio Senhor vos dará um sinal: Eis que a virgem conceberá e dará à luz um filho, e chamará o seu nome Emanuel.",
    "grego": "הִנֵּ֣ה הָעַלְמָ֑ה הָרָ֤ה וְיֹלֶדֶת֙ בֵּ֔ן וְקָרָ֥את שְׁמ֖וֹ עִמָּנוּ אֵֽל׃",
    "diagrama": [
        {"id":"is7-1","type":"subject","text":"a jovem (הָעַלְמָה)","greek":"הָעַלְמָה","strong":"H5959"},
        {"id":"is7-2","type":"predicate","text":"conceberá (הָרָה)","greek":"הָרָה","strong":"H2030"},
        {"id":"is7-3","type":"predicate","text":"dará à luz (וְיֹלֶדֶת)","greek":"וְיֹלֶדֶת","strong":"H3205","children":[
            {"id":"is7-3a","type":"object","text":"um filho (בֵּן)","greek":"בֵּן","strong":"H1121"}
        ]},
        {"id":"is7-4","type":"predicate","text":"chamará (וְקָרָאת)","greek":"וְקָרָאת","strong":"H7121","children":[
            {"id":"is7-4a","type":"object","text":"Emanuel (עִמָּנוּ אֵל)","greek":"עִמָּנוּ אֵל","strong":"H6005"}
        ]}
    ],
    "explicacao": "Profecia virginal cumprida em Mt 1:23. עַלְמָה = jovem mulher. LXX: παρθένος = virgem. עִמָּנוּ אֵל = Deus conosco (nome teofórico).",
    "notas": ["עַלְמָה = jovem de casamento","LXX: παρθένος (virgem)","עִמָּנוּ אֵל = Deus conosco","Cumprimento: Mt 1:23"]
})

diagrams.append({
    "ref": "Is 40:3-5", "livro": "Isaías",
    "traducao": "Voz que clama no deserto: Preparai o caminho do SENHOR. Toda garganta será preenchida, todo monte rebaixado.",
    "grego": "קוֹל֙ קוֹ֣רֵא בַּמִּדְבָּ֔ר פַּנּ֖וּ דֶּ֣רֶךְ יְהוָ֑ה. כָּל־גֶּ֣יא יִנָּשֵׂ֔א וְכָל־הַ֥ר וְגִבְעָ֖ה יִשְׁפָּֽלוּ׃",
    "diagrama": [
        {"id":"is40-1","type":"complement","text":"Voz que clama (קוֹל קוֹרֵא)","greek":"קוֹל קוֹרֵא","strong":"H6963"},
        {"id":"is40-2","type":"predicate","text":"preparai (פַּנוּ)","greek":"פַּנוּ","strong":"H6340","children":[
            {"id":"is40-2a","type":"object","text":"o caminho do SENHOR","greek":"דֶּרֶךְ יְהוָה","strong":"H1870"}
        ]},
        {"id":"is40-3","type":"predicate","text":"será preenchida (יִנָּשֵׂא)","greek":"יִנָּשֵׂא","strong":"H5375"},
        {"id":"is40-4","type":"predicate","text":"será rebaixado (יִשְׁפָּלוּ)","greek":"יִשְׁפָּלוּ","strong":"H8213"}
    ],
    "explicacao": "Profecia citada nos 4 Evangelhos como aplicada a João Batista. קוֹרֵא = quem clama. פַּנוּ = alargar. Linguagem topográfica: vales e montes.",
    "notas": ["קוֹרֵא = particípio de קָרָא (chamar)","פַּנוּ = imperativo de פָּנָה (alargar)","מְסִלָּה = estrada elevada","Citação: Mt 3:3, Mc 1:3, Lc 3:4, Jo 1:23"]
})

diagrams.append({
    "ref": "Is 52:13-53:12", "livro": "Isaías",
    "traducao": "Eis o meu servo prosperará; será exaltado. Mas ele foi ferido por causa das nossas transgressões, moido por causa das nossas iniquidades.",
    "grego": "הִנֵּ֤ה יַשְׂכִּיל֙ עַבְדִּ֔י יָר֥וּם וְנִשָּׂ֖א. וְהוּא֙ מְחֹלָ֣ל מִפְּשָׁעֵ֔נוּ מְדֻכָּ֖א מֵעֲוֺנֹתֵ֑ינוּ מוּסַ֤ר שְׁלוֹמֵנוּ֙ עָלָ֔יו וּבְחַבֻּרָתוֹ֖ נִרְפָּֽא־לָֽנוּ׃",
    "diagrama": [
        {"id":"is52-1","type":"subject","text":"o meu servo (עַבְדִּי)","greek":"עַבְדִּי","strong":"H5650"},
        {"id":"is52-2","type":"predicate","text":"prosperará (יַשְׂכִּיל)","greek":"יַשְׂכִּיל","strong":"H7919"},
        {"id":"is53-1","type":"predicate","text":"ferido (מְחֹלָל)","greek":"מְחֹלָל","strong":"H2490","children":[
            {"id":"is53-1a","type":"adverbial","text":"por nossas transgressões","greek":"מִפְּשָׁעֵנוּ","strong":"H6588"}
        ]},
        {"id":"is53-2","type":"predicate","text":"moido (מְדֻכָּא)","greek":"מְדֻכָּא","strong":"H1794","children":[
            {"id":"is53-2a","type":"adverbial","text":"por nossas iniquidades","greek":"מֵעֲוֺנֹתֵינוּ","strong":"H5771"}
        ]},
        {"id":"is53-3","type":"complement","text":"castigo que traz paz (מוּסַר שְׁלוֹמֵנוּ)","greek":"מוּסַר שְׁלוֹמֵנוּ","strong":"H4148"}
    ],
    "explicacao": "Quarto Servo Sofredor. Participios passivos: מְחֹלָל (ferido), מְדֻכָּא (moido). Substituição vicária. מּוּסַר = disciplina que traz paz.",
    "notas": ["מְחֹלָל = particípio de חָלַל (perfurar)","מְדֻכָּא = particípio de דָּכָא (esmagar)","מוּסַר = disciplina/castigo corretivo","שְׁלוֹם = paz, completude covenantal"]
})

diagrams.append({
    "ref": "Jr 31:31-34", "livro": "Jeremias",
    "traducao": "Eis que vêm dias em que farei uma nova aliança. Porei a minha lei dentro deles e a escreverei no seu coração.",
    "grego": "כִּ֣י זֶ֤ה הַבְּרִית֙ אֲשֶׁ֣ר אֶכְרֹ֔ת אֶת־בֵּ֖ית יִשְׂרָאֵ֑ל. נָתַתִּ֥י אֶת־תּוֹרָתִ֖י בְּקִרְבָּ֑ם וְעַל־לִבָּ֖ם אֶכְתֳּבֶֽנָּה׃",
    "diagrama": [
        {"id":"jr31-1","type":"subject","text":"este (זֶה)","greek":"זֶה","strong":"H2063"},
        {"id":"jr31-2","type":"complement","text":"o pacto (הַבְּרִית)","greek":"הַבְּרִית","strong":"H1285"},
        {"id":"jr31-3","type":"predicate","text":"porei (נָתַתִּי)","greek":"נָתַתִּי","strong":"H5414","children":[
            {"id":"jr31-3a","type":"object","text":"minha lei (תוֹרָתִי)","greek":"תוֹרָתִי","strong":"H8451"},
            {"id":"jr31-3b","type":"adverbial","text":"dentro deles (בְּקִרְבָּם)","greek":"בְּקִרְבָּם","strong":"H7130"}
        ]},
        {"id":"jr31-4","type":"predicate","text":"escreverei (אֶכְתֳּבֶנָּה)","greek":"אֶכְתֳּבֶנָּה","strong":"H3789","children":[
            {"id":"jr31-4a","type":"adverbial","text":"no coração","greek":"עַל לִבָּם","strong":"H3820"}
        ]}
    ],
    "explicacao": "Nova aliança (berit hadashah). בְּקִרְבָּם = no íntimo. לֵב = coração = centro da vontade. Fulfillment: Lc 22:20, Hb 8:8-12.",
    "notas": ["בְּרִית = aliança (literal: cortar)","תּוֹרָה = instrução (de יָרָה)","בְּקִרְבָּם = no meio deles","Fulfillment: Lc 22:20; Hb 8:8-12"]
})

diagrams.append({
    "ref": "Dn 7:13-14", "livro": "Daniel",
    "traducao": "Estava vindo com as nuvens do céu como o Filho do Homem. Foi-lhe dado domínio, honra e reino.",
    "grego": "עִם־עֲנָנֵי שְׁמַיָּא כְּבַר אֱנָשׁ אֶתָּא. וְלֵהּ יְהִיב שׁלְטָן וִיקַר וּמַלְכוּ.",
    "diagrama": [
        {"id":"dn7-1","type":"adverbial","text":"com as nuvens (עִם עֲנָנֵי)","greek":"עִם עֲנָנֵי","strong":"H6051"},
        {"id":"dn7-2","type":"subject","text":"Filho do Homem (כְּבַר אֱנָשׁ)","greek":"כְּבַר אֱנָשׁ","strong":"H1247"},
        {"id":"dn7-3","type":"predicate","text":"foi-lhe dado (יְהִיב)","greek":"יְהִיב","strong":"H3052","children":[
            {"id":"dn7-3a","type":"object","text":"domínio (שׁלְטָן)","greek":"שׁלְטָן","strong":"H7985"},
            {"id":"dn7-3b","type":"object","text":"honra (וִיקַר)","greek":"וִיקַר","strong":"H3366"},
            {"id":"dn7-3c","type":"object","text":"reino (וּמַלְכוּ)","greek":"וּמַלְכוּ","strong":"H4437"}
        ]}
    ],
    "explicacao": "בַּר אֱנָשׁ = Filho do Homem (arameu). Títulos divinos: reino eterno, adoração universal. Jesus usa este título em Mt 26:64.",
    "notas": ["בַּר = filho (arameu)","עַתִּיק = ancião","שׁלְטָן = domínio (persa)","Fulfillment: Mt 24:30; 26:64; Ap 1:13"]
})

print(f"OT diagrams: {len(diagrams)}")
