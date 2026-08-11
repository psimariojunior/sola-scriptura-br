# -*- coding: utf-8 -*-
# NT batch 6: Colossenses + 1 Tessalonicenses + Hebreus + Tiago + 1 Pedro + 1 João + Apocalipse (12 diagrams)

nt_batch_6 = []

nt_batch_6.append({
    "ref": "Cl 1:15", "livro": "Colossenses",
    "traducao": "Ele é a imagem do Deus invisível, o primogênito de toda a criação.",
    "grego": "ὅς ἐστιν εἰκὼν τοῦ θεοῦ τοῦ ἀοράτου, πρωτότοκος πάσης κτίσεως.",
    "diagrama": [
        {"id":"cl115-1","type":"subject","text":"Ele (ὅς)","greek":"ὅς","strong":"G3739"},
        {"id":"cl115-2","type":"predicate","text":"é (ἐστίν)","greek":"ἐστίν","strong":"G2076","children":[
            {"id":"cl115-2a","type":"complement","text":"a imagem do Deus invisível (εἰκὼν τοῦ θεοῦ τοῦ ἀοράτου)","greek":"εἰκὼν τοῦ θεοῦ τοῦ ἀοράτου","strong":"G1504"},
            {"id":"cl115-2b","type":"complement","text":"o primogênito de toda a criação (πρωτότοκος πάσης κτίσεως)","greek":"πρωτότοκος πάσης κτίσεως","strong":"G4416"}
        ]}
    ],
    "explicacao": "εἰκών = imagem (representação exata). τοῦ ἀοράτου = do invisível (Deus não visto). πρωτότοκος = primogênito (primazia, não criação). κτίσεως = criação (tudo o que foi criado). Cristo = centrou de tudo.",
    "notas": ["εἰκών = imagem, representação","ἀοράτου = invisível (não visto)","πρωτότοκος = primogênito (primeiro em precedência)","κτίσεως = criação (tudo o criado)"]
})

nt_batch_6.append({
    "ref": "Cl 3:16", "livro": "Colossenses",
    "traducao": "Habite em vós ricamente a palavra de Cristo, ensinai-vos e aconselhai-vos mutuamente com toda a sabedoria, cantando a Deus com gratidão em vosso coração.",
    "grego": "ὁ λόγος τοῦ Χριστοῦ ἐνοικείτω ἐν ὑμῖν πλουσίως, πάσῃ σοφίᾳ διδάσκοντες καὶ νουθετοῦντες ἑαυτούς, ψαλμοῖς καὶ ὕμνοις καὶ ᾠδαῖς πνευματικαῖς ἐν χάριτι ᾄδοντες τῷ θεῷ ἐν τῇ καρδίᾳ ὑμῶν.",
    "diagrama": [
        {"id":"cl316-1","type":"subject","text":"a palavra de Cristo (ὁ λόγος τοῦ Χριστοῦ)","greek":"ὁ λόγος τοῦ Χριστοῦ","strong":"G3056"},
        {"id":"cl316-2","type":"predicate","text":"habite (ἐνοικείτω)","greek":"ἐνοικείτω","strong":"G1774","children":[
            {"id":"cl316-2a","type":"adverbial","text":"em vós (ἐν ὑμῖν)","greek":"ἐν ὑμῖν","strong":"G1722"},
            {"id":"cl316-2b","type":"adverbial","text":"ricamente (πλουσίως)","greek":"πλουσίως","strong":"G4146"}
        ]},
        {"id":"cl316-3","type":"predicate","text":"ensinando (διδάσκοντες)","greek":"διδάσκοντες","strong":"G1321"},
        {"id":"cl316-4","type":"conjunction","text":"e (καί)","greek":"καί","strong":"G2532"},
        {"id":"cl316-5","type":"predicate","text":"aconselhando (νουθετοῦντες)","greek":"νουθετοῦντες","strong":"G3560","children":[
            {"id":"cl316-5a","type":"object","text":"a vós mesmos (ἑαυτούς)","greek":"ἑαυτούς","strong":"G1438"}
        ]},
        {"id":"cl316-6","type":"complement","text":"com sabedoria (πάσῃ σοφίᾳ)","greek":"πάσῃ σοφίᾳ","strong":"G4678"},
        {"id":"cl316-7","type":"predicate","text":"cantando (ᾄδοντες)","greek":"ᾄδοντες","strong":"G103","children":[
            {"id":"cl316-7a","type":"object","text":"a Deus (τῷ θεῷ)","greek":"τῷ θεῷ","strong":"G2316"},
            {"id":"cl316-7b","type":"adverbial","text":"com gratidão (ἐν χάριτι)","greek":"ἐν χάριτι","strong":"G5485"},
            {"id":"cl316-7c","type":"adverbial","text":"em vosso coração (ἐν τῇ καρδίᾳ ὑμῶν)","greek":"ἐν τῇ καρδίᾳ ὑμῶν","strong":"G2588"}
        ]}
    ],
    "explicacao": "ἐνοικείτω = imperativo presente (habite permanentemente). πλουσίως = ricamente (abundantemente). Três particípios: διδάσκοντες (ensinando), νουθετοῦντες (aconselhando), ᾄδοντες (cantando). Música espiritual com gratidão.",
    "notas": ["ἐνοικείτω = habite (imperativo de ἐνοικέω)","πλουσίως = ricamente, abundantemente","νουθετοῦντες = aconselhando, admoestando","ψαλμοῖς = salmos (cantos)"]
})

nt_batch_6.append({
    "ref": "1Ts 4:16", "livro": "1 Tessalonicenses",
    "traducao": "Porque o mesmo Senhor descerá do céu com autoridade, com voz de arcanjo, e com a trombeta de Deus; e os mortos em Cristo ressuscitarão primeiro.",
    "grego": "αὐτὸς γὰρ ὁ κύριος ἐν κελεύσματι, ἐν φωνῇ ἀρχαγγέλου καὶ ἐν σάλπιγγι θεοῦ καταβήσεται ἀπ᾽ οὐρανοῦ, καὶ οἱ νεκροὶ ἐν Χριστῷ ἀναστήσονται πρῶτον.",
    "diagrama": [
        {"id":"1ts416-1","type":"subject","text":"o mesmo Senhor (αὐτὸς ὁ κύριος)","greek":"αὐτὸς ὁ κύριος","strong":"G2962"},
        {"id":"1ts416-2","type":"conjunction","text":"porque (γάρ)","greek":"γάρ","strong":"G1063"},
        {"id":"1ts416-3","type":"predicate","text":"descerá (καταβήσεται)","greek":"καταβήσεται","strong":"G2597","children":[
            {"id":"1ts416-3a","type":"adverbial","text":"do céu (ἀπ᾽ οὐρανοῦ)","greek":"ἀπ᾽ οὐρανοῦ","strong":"G3772"},
            {"id":"1ts416-3b","type":"adverbial","text":"com autoridade (ἐν κελεύσματι)","greek":"ἐν κελεύσματι","strong":"G2750"},
            {"id":"1ts416-3c","type":"adverbial","text":"com voz de arcanjo (ἐν φωνῇ ἀρχαγγέλου)","greek":"ἐν φωνῇ ἀρχαγγέλου","strong":"G743"},
            {"id":"1ts416-3d","type":"adverbial","text":"com trombeta de Deus (ἐν σάλπιγγι θεοῦ)","greek":"ἐν σάλπιγγι θεοῦ","strong":"G4536"}
        ]},
        {"id":"1ts416-4","type":"subject","text":"os mortos em Cristo (οἱ νεκροὶ ἐν Χριστῷ)","greek":"οἱ νεκροὶ ἐν Χριστῷ","strong":"G3498"},
        {"id":"1ts416-5","type":"predicate","text":"ressuscitarão (ἀναστήσονται)","greek":"ἀναστήσονται","strong":"G450","children":[
            {"id":"1ts416-5a","type":"adverbial","text":"primeiro (πρῶτον)","greek":"πρῶτον","strong":"G4413"}
        ]}
    ],
    "explicacao": "Descida de Cristo: κελεύσματι = com ordem (comando divino). φωνῇ ἀρχαγγέλου = voz de arcanjo (autoridade celestial). σάλπιγγι θεοῦ = trombeta de Deus (convocação final). ἀναστήσονται = ressuscitarão (futuro médio).",
    "notas": ["καταβήσεται = descerá (futuro médio)","κελεύσματi = ordem, comando","ἀρχαγγέλου = arcanjo (príncipe dos anjos)","σάλπιγγι = trombeta (sinal de convocação)"]
})

nt_batch_6.append({
    "ref": "Hb 4:12", "livro": "Hebreus",
    "traducao": "Porque a palavra de Deus é viva, e eficaz, e mais cortante do que qualquer espada de dois gumes, e penetra até ao ponto de divisão da alma e do espírito, das articulações e dos miolos, e é julgadora dos pensamentos e propósitos do coração.",
    "grego": "ζῶν γὰρ ὁ λόγος τοῦ θεοῦ καὶ ἐνεργὴς καὶ τομώτερος ὑπὲρ πᾶσαν μάχαιραν δίστομον καὶ διικνούμενος ἄχρι μερισμοῦ ψυχῆς καὶ πνεύματος, ἁρμῶν τε καὶ μυελῶν, καὶ κριτικὸς ἐνθυμήσεων καὶ ἐννοιῶν καρδίας.",
    "diagrama": [
        {"id":"hb412-1","type":"subject","text":"a palavra de Deus (ὁ λόγος τοῦ θεοῦ)","greek":"ὁ λόγος τοῦ θεοῦ","strong":"G3056"},
        {"id":"hb412-2","type":"conjunction","text":"porque (γάρ)","greek":"γάρ","strong":"G1063"},
        {"id":"hb412-3","type":"predicate","text":"é viva (ζῶν ἐστιν)","greek":"ζῶν","strong":"G2198","children":[
            {"id":"hb412-3a","type":"complement","text":"eficaz (ἐνεργής)","greek":"ἐνεργής","strong":"G1756"},
            {"id":"hb412-3b","type":"complement","text":"mais cortante (τομώτερος)","greek":"τομώτερος","strong":"G5114","children":[
                {"id":"hb412-3b1","type":"adverbial","text":"do que qualquer espada (ὑπὲρ πᾶσαν μάχαιραν δίστομον)","greek":"ὑπὲρ πᾶσαν μάχαιραν δίστομον","strong":"G3162"}
            ]}
        ]},
        {"id":"hb412-4","type":"predicate","text":"penetra (διικνούμενος)","greek":"διικνούμενος","strong":"G1338","children":[
            {"id":"hb412-4a","type":"adverbial","text":"até (ἄχρι)","greek":"ἄχρι","strong":"G891"},
            {"id":"hb412-4b","type":"object","text":"divisão da alma e do espírito (μερισμοῦ ψυχῆς καὶ πνεύματος)","greek":"μερισμοῦ ψυχῆς καὶ πνεύματος","strong":"G3313"},
            {"id":"hb412-4c","type":"object","text":"articulações e miolos (ἁρμῶν τε καὶ μυελῶν)","greek":"ἁρμῶν τε καὶ μυελῶν","strong":"G719"}
        ]},
        {"id":"hb412-5","type":"predicate","text":"é julgadora (κριτικός ἐστιν)","greek":"κριτικός","strong":"G2923","children":[
            {"id":"hb412-5a","type":"genitive","text":"dos pensamentos e propósitos (ἐνθυμήσεων καὶ ἐννοιῶν)","greek":"ἐνθυμήσεων καὶ ἐννοιῶν","strong":"G1761"},
            {"id":"hb412-5b","type":"genitive","text":"do coração (καρδίας)","greek":"καρδίας","strong":"G2588"}
        ]}
    ],
    "explicacao": "Personificação da palavra: ζῶν = viva (tinha, não apenas antiga). ἐνεργής = eficaz (ativa, operante). τομώτερος = mais cortante (comparativo). μάχαιραν δίστομον = espada de dois gumes. Penetra ao mais profundo.",
    "notas": ["ζῶν = viva (presente participial)","ἐνεργής = eficaz, operante","τομώτερος = mais cortante","μερισμοῦ = divisão, separação"]
})

nt_batch_6.append({
    "ref": "Hb 11:1", "livro": "Hebreus",
    "traducao": "Ora, a fé é o firme fundamento das coisas que se esperam, e a prova das coisas que se não veem.",
    "grego": "ἔστιν δὲ πίστις ὑπόστασις πραγμάτων ἔλεγχος οὐ βλεπομένων.",
    "diagrama": [
        {"id":"hb111-1","type":"predicate","text":"é (ἔστιν)","greek":"ἔστιν","strong":"G2076"},
        {"id":"hb111-2","type":"conjunction","text":"ora (δέ)","greek":"δέ","strong":"G1161"},
        {"id":"hb111-3","type":"subject","text":"a fé (πίστις)","greek":"πίστις","strong":"G4102"},
        {"id":"hb111-4","type":"complement","text":"o firme fundamento (ὑπόστασις πραγμάτων)","greek":"ὑπόστασις πραγμάτων","strong":"G5287","children":[
            {"id":"hb111-4a","type":"modifier","text":"das coisas que se esperam (πραγμάτων ἐλπιζομένων)","greek":"πραγμάτων ἐλπιζομένων","strong":"G1679"}
        ]},
        {"id":"hb111-5","type":"complement","text":"a prova (ἔλεγχος)","greek":"ἔλεγχος","strong":"G1650","children":[
            {"id":"hb111-5a","type":"modifier","text":"das coisas que não se veem (οὐ βλεπομένων)","greek":"οὐ βλεπομένων","strong":"G991"}
        ]}
    ],
    "explicacao": "Definição de fé: ὑπόστασις = substância, firme fundamento (realidade concreta). ἔλεγχος = prova, convicção (evidência). Fé = certeza do invisível. Não é sentimento, mas realidade objetiva.",
    "notas": ["ὑπόστασις = substância, fundamento","ἔλεγχος = prova, demonstração","ἐλπιζομένων = que se esperam (particípio passivo)","βλεπομένων = que se veem (presente passivo)"]
})

nt_batch_6.append({
    "ref": "Tg 1:2", "livro": "Tiago",
    "traducao": "Meus irmãos, tende por motivo de grande alegria quando cairdes em provações diversas.",
    "grego": "Πᾶσαν χαρὰν ἡγήσασθε, ἀδελφοί μου, ὅταν περιπέσητε πειρασμοῖς ποικίλοις.",
    "diagrama": [
        {"id":"tg12-1","type":"object","text":"toda alegria (Πᾶσαν χαράν)","greek":"Πᾶσαν χαράν","strong":"G5479"},
        {"id":"tg12-2","type":"predicate","text":"tende (ἡγήσασθε)","greek":"ἡγήσασθε","strong":"G2233","children":[
            {"id":"tg12-2a","type":"vocative","text":"meus irmãos (ἀδελφοί μου)","greek":"ἀδελφοί μου","strong":"G80"}
        ]},
        {"id":"tg12-3","type":"conjunction","text":"quando (ὅταν)","greek":"ὅταν","strong":"G3752"},
        {"id":"tg12-4","type":"predicate","text":"cairdes (περιπέσητε)","greek":"περιπέσητε","strong":"G4045","children":[
            {"id":"tg12-4a","type":"dative","text":"em provações (πειρασμοῖς)","greek":"πειρασμοῖς","strong":"G3986"},
            {"id":"tg12-4b","type":"modifier","text":"diversas (ποικίλοις)","greek":"ποικίλοις","strong":"G4164"}
        ]}
    ],
    "explicacao": "ἡγήσασθε = considerai, tende por (imperativo aoristo). πᾶσαν χαράν = toda alegria (acusaivo). περιπέσητε = subjuntivo aoristo (quando caírem). ποικίλοις = diversas, variadas. Alegria na provação = maturidade espiritual.",
    "notas": ["ἡγήσασθε = considerai (aoristo de ἡγέομαι)","περιπέσητe = cair em (aoristo de περιπίπτω)","πειρασμοῖς = provações, tentações","ποικίλοις = diversas, multiformes"]
})

nt_batch_6.append({
    "ref": "1P 1:3", "livro": "1 Pedro",
    "traducao": "Bendito o Deus e Pai de nosso Senhor Jesus Cristo, que segundo a sua grande misericórdia nos regenerou para uma viva esperança, pela ressurreição de Jesus Cristo dentre os mortos.",
    "grego": "εὐλογητὸς ὁ θεὸς καὶ πατὴρ τοῦ κυρίου ἡμῶν Ἰησοῦ Χριστοῦ ὁ κατὰ τὸ πολὺ αὐτοῦ ἔλεος ἀναγεννήσας ἡμᾶς εἰς ἐλπίδα ζῶσαν δι᾽ ἀναστάσεως Ἰησοῦ Χριστοῦ ἐκ νεκρῶν.",
    "diagrama": [
        {"id":"1p13-1","type":"subject","text":"bendito (εὐλογητός)","greek":"εὐλογητός","strong":"G2128","children":[
            {"id":"1p13-1a","type":"modifier","text":"o Deus e Pai (ὁ θεὸς καὶ πατήρ)","greek":"ὁ θεὸς καὶ πατήρ","strong":"G2316"},
            {"id":"1p13-1b","type":"modifier","text":"de nosso Senhor (τοῦ κυρίου ἡμῶν)","greek":"τοῦ κυρίου ἡμῶν","strong":"G2962"}
        ]},
        {"id":"1p13-2","type":"modifier","text":"que nos regenerou (ἀναγεννήσας ἡμᾶς)","greek":"ἀναγεννήσας ἡμᾶς","strong":"G313","children":[
            {"id":"1p13-2a","type":"adverbial","text":"segundo a sua grande misericórdia (κατὰ τὸ πολὺ αὐτοῦ ἔλεος)","greek":"κατὰ τὸ πολὺ αὐτοῦ ἔλεος","strong":"G1680"}
        ]},
        {"id":"1p13-3","type":"complement","text":"para uma viva esperança (εἰς ἐλπίδα ζῶσαν)","greek":"εἰς ἐλπίδα ζῶσαν","strong":"G1680"},
        {"id":"1p13-4","type":"adverbial","text":"pela ressurreição (δι᾽ ἀναστάσεως)","greek":"δι᾽ ἀναστάσεως","strong":"G386","children":[
            {"id":"1p13-4a","type":"modifier","text":"de Jesus Cristo (Ἰησοῦ Χριστοῦ)","greek":"Ἰησοῦ Χριστοῦ","strong":"G2424"},
            {"id":"1p13-4b","type":"adverbial","text":"dentre os mortos (ἐκ νεκρῶν)","greek":"ἐκ νεκρῶν","strong":"G3498"}
        ]}
    ],
    "explicacao": "Eulogia: εὐλογητός = bendito (particípio passivo). ἀναγεννήσας = aoristo participial (nos regenerou). ἐλπίδα ζῶσαν = viva esperança (particípio ativo, esperança que tem vida). Ressurreição = base da esperança.",
    "notas": ["εὐλογητός = bendito (particípio passivo)","ἀναγεννήσας = regenerou (aoristo participial)","ἔλεος = misericórdia, compaixão","ζῶσαν = viva (particípio ativo)"]
})

nt_batch_6.append({
    "ref": "1Jo 4:8", "livro": "1 João",
    "traducao": "Aquele que não ama não conhece a Deus, porque Deus é amor.",
    "grego": "ὁ μὴ ἀγαπῶν οὐκ ἔγνω τὸν θεόν, ὁ θεὸς ἀγάπη ἐστίν.",
    "diagrama": [
        {"id":"1jo48-1","type":"subject","text":"quem não ama (ὁ μὴ ἀγαπῶν)","greek":"ὁ μὴ ἀγαπῶν","strong":"G25","children":[
            {"id":"1jo48-1a","type":"negation","text":"não (μή)","greek":"μή","strong":"G3361"}
        ]},
        {"id":"1jo48-2","type":"predicate","text":"não conheceu (οὐκ ἔγνω)","greek":"οὐκ ἔγνω","strong":"G1097","children":[
            {"id":"1jo48-2a","type":"object","text":"a Deus (τὸν θεόν)","greek":"τὸν θεόν","strong":"G2316"}
        ]},
        {"id":"1jo48-3","type":"conjunction","text":"porque (ὅτι)","greek":"ὅτι","strong":"G3754"},
        {"id":"1jo48-4","type":"subject","text":"Deus (ὁ θεός)","greek":"ὁ θεός","strong":"G2316"},
        {"id":"1jo48-5","type":"predicate","text":"é (ἐστίν)","greek":"ἐστίν","strong":"G2076","children":[
            {"id":"1jo48-5a","type":"complement","text":"amor (ἀγάπη)","greek":"ἀγάπη","strong":"G26"}
        ]}
    ],
    "explicacao": "ὁ μὴ ἀγαπῶν = quem não ama (particípio presente negativo). οὐκ ἔγνω = aoristo (não conheceu, ponto decisivo). ἀγάπη ἐστίν = amor é (identidade absoluta). Deus não apenas ama — Deus É amor.",
    "notas": ["ἀγαπῶν = particípio presente de ἀγαπάω","ἔγνω = aoristo de γινώσκω (conhecer)","ἀγάπη = amor (sacrificial, ágape)","Identidade: Deus = amor"]
})

nt_batch_6.append({
    "ref": "1Jo 4:19", "livro": "1 João",
    "traducao": "Nós o amamos porque ele nos amou primeiro.",
    "grego": "ἡμεῖς ἀγαπῶμεν αὐτόν, ὅτι αὐτὸς πρῶτος ἠγάπησεν ἡμᾶς.",
    "diagrama": [
        {"id":"1jo419-1","type":"subject","text":"nós (ἡμεῖς)","greek":"ἡμεῖς","strong":"G2249"},
        {"id":"1jo419-2","type":"predicate","text":"amamos (ἀγαπῶμεν)","greek":"ἀγαπῶμεν","strong":"G25","children":[
            {"id":"1jo419-2a","type":"object","text":"a ele (αὐτόν)","greek":"αὐτόν","strong":"G846"}
        ]},
        {"id":"1jo419-3","type":"conjunction","text":"porque (ὅτι)","greek":"ὅτι","strong":"G3754"},
        {"id":"1jo419-4","type":"subject","text":"ele (αὐτός)","greek":"αὐτός","strong":"G846"},
        {"id":"1jo419-5","type":"adverbial","text":"primeiro (πρῶτος)","greek":"πρῶτος","strong":"G4413"},
        {"id":"1jo419-6","type":"predicate","text":"amou (ἠγάπησεν)","greek":"ἠγάπησεν","strong":"G25","children":[
            {"id":"1jo419-6a","type":"object","text":"a nós (ἡμᾶς)","greek":"ἡμᾶς","strong":"G2249"}
        ]}
    ],
    "explicacao": "A causal do amor cristão: amamos porque fomos amados primeiro. πρῶτος = primeiro (iniciativa divina). ἠγάπησεν = aoristo (ponto histórico: a cruz). O amor humano é resposta ao amor divino.",
    "notas": ["ἀγαπῶμεν = presente ativo (amamos continuamente)","πρῶτος = primeiro (iniciativa)","ἠγάπησεν = aoristo (amou na cruz)","Causal: amor divino → amor humano"]
})

nt_batch_6.append({
    "ref": "Ap 3:20", "livro": "Apocalipse",
    "traducao": "Eis que estou à porta, e bato; se alguém ouvir a minha voz, e abrir a porta, entrarei em sua casa, e cearei com ele, e ele comigo.",
    "grego": "ἰδοὺ ἕστηκα ἐπὶ τὴν θύραν καὶ κρούω· ἤν τις ἀκούσῃ τῆς φωνῆς μου καὶ ἀνοίξῃ τὴν θύραν, εἰσελεύσομαι πρὸς αὐτὸν καὶ δειπνήσω μετ᾽ αὐτοῦ καὶ αὐτὸς μετ᾽ ἐμοῦ.",
    "diagrama": [
        {"id":"ap320-1","type":"interjection","text":"eis (ἰδού)","greek":"ἰδού","strong":"G2400"},
        {"id":"ap320-2","type":"predicate","text":"estou (ἕστηκα)","greek":"ἕστηκα","strong":"G2476","children":[
            {"id":"ap320-2a","type":"adverbial","text":"à porta (ἐπὶ τὴν θύραν)","greek":"ἐπὶ τὴν θύραν","strong":"G2374"}
        ]},
        {"id":"ap320-3","type":"conjunction","text":"e (καί)","greek":"καί","strong":"G2532"},
        {"id":"ap320-4","type":"predicate","text":"bato (κρούω)","greek":"κρούω","strong":"G2925"},
        {"id":"ap320-5","type":"conjunction","text":"se (ἤν τις)","greek":"ἤν τις","strong":"G1437"},
        {"id":"ap320-6","type":"predicate","text":"ouvir (ἀκούσῃ)","greek":"ἀκούσῃ","strong":"G191","children":[
            {"id":"ap320-6a","type":"object","text":"a minha voz (τῆς φωνῆς μου)","greek":"τῆς φωνῆς μου","strong":"G5456"}
        ]},
        {"id":"ap320-7","type":"conjunction","text":"e (καί)","greek":"καί","strong":"G2532"},
        {"id":"ap320-8","type":"predicate","text":"abrir (ἀνοίξῃ)","greek":"ἀνοίξῃ","strong":"G457","children":[
            {"id":"ap320-8a","type":"object","text":"a porta (τὴν θύραν)","greek":"τὴν θύραν","strong":"G2374"}
        ]},
        {"id":"ap320-9","type":"predicate","text":"entrarei (εἰσελεύσομαι)","greek":"εἰσελεύσομαι","strong":"G1525","children":[
            {"id":"ap320-9a","type":"adverbial","text":"a sua casa (πρὸς αὐτόν)","greek":"πρὸς αὐτόν","strong":"G4314"}
        ]},
        {"id":"ap320-10","type":"conjunction","text":"e (καί)","greek":"καί","strong":"G2532"},
        {"id":"ap320-11","type":"predicate","text":"cearei (δειπνήσω)","greek":"δειπνήσω","strong":"G1172","children":[
            {"id":"ap320-11a","type":"adverbial","text":"com ele (μετ᾽ αὐτοῦ)","greek":"μετ᾽ αὐτοῦ","strong":"G3326"}
        ]}
    ],
    "explicacao": "Invitação de Cristo: ἕστηκα = perfeito (estou parado, estado). κρούω = bato (presente, continuamente). Condicional: ἀκούσῃ + ἀνοίξῃ (ouvir + abrir). δειπνήσω = cearei (comunhão íntima). Relação mútua.",
    "notas": ["ἕστηκα = perfeito de ἵστημι (estou de pé)","κρούω = bato (presente)","ἀκούσῃ = subjuntivo aoristo de ἀκούω","δειπνήσω = cearei (jantar íntimo)"]
})

nt_batch_6.append({
    "ref": "Ap 5:13", "livro": "Apocalipse",
    "traducao": "E toda a criatura que há debaixo do céu, e sobre a terra, e debaixo da terra, e sobre o mar, e todas as coisas que há neles, ouvi dizer: Ao que está sentado no trono, e ao Cordeiro, a bênção, e a honra, e a glória, e o poder, para sempre e sempre.",
    "grego": "καὶ πᾶσα κτίσις ἡ ἐν τῷ οὐρανῷ καὶ ἐπὶ τῆς γῆς καὶ ὑποκάτω τῆς γῆς καὶ ἐπὶ τῆς θαλάσσης καὶ τὰ ἐν αὐταῖς πᾶσας ἤκουσα λέγοντας· τῷ καθημένῳ ἐπὶ τοῦ θρόνου καὶ τῷ ἀρνίῳ ἡ εὐλογία καὶ ἡ τιμὴ καὶ ἡ δόξα καὶ τὸ κράτος εἰς τοὺς αἰῶνας τῶν αἰώνων.",
    "diagrama": [
        {"id":"ap513-1","type":"subject","text":"toda a criatura (πᾶσα κτίσις)","greek":"πᾶσα κτίσις","strong":"G2937","children":[
            {"id":"ap513-1a","type":"modifier","text":"no céu (ἐν τῷ οὐρανῷ)","greek":"ἐν τῷ οὐρανῷ","strong":"G3772"},
            {"id":"ap513-1b","type":"modifier","text":"na terra (ἐπὶ τῆς γῆς)","greek":"ἐπὶ τῆς γῆς","strong":"G1093"},
            {"id":"ap513-1c","type":"modifier","text":"debaixo da terra (ὑποκάτω τῆς γῆς)","greek":"ὑποκάτω τῆς γῆς","strong":"G5270"},
            {"id":"ap513-1d","type":"modifier","text":"no mar (ἐπὶ τῆς θαλάσσης)","greek":"ἐπὶ τῆς θαλάσσης","strong":"G2281"}
        ]},
        {"id":"ap513-2","type":"predicate","text":"ouviu (ἤκουσα)","greek":"ἤκουσα","strong":"G191","children":[
            {"id":"ap513-2a","type":"object","text":"dizendo (λέγοντας)","greek":"λέγοντας","strong":"G3004"}
        ]},
        {"id":"ap513-3","type":"dative","text":"ao que está sentado (τῷ καθημένῳ)","greek":"τῷ καθημένῳ","strong":"G2521","children":[
            {"id":"ap513-3a","type":"modifier","text":"no trono (ἐπὶ τοῦ θρόνου)","greek":"ἐπὶ τοῦ θρόνου","strong":"G2362"}
        ]},
        {"id":"ap513-4","type":"conjunction","text":"e (καί)","greek":"καί","strong":"G2532"},
        {"id":"ap513-5","type":"dative","text":"ao Cordeiro (τῷ ἀρνίῳ)","greek":"τῷ ἀρνίῳ","strong":"G721"},
        {"id":"ap513-6","type":"subject","text":"a bênção (ἡ εὐλογία)","greek":"ἡ εὐλογία","strong":"G2129","children":[
            {"id":"ap513-6a","type":"conjunction","text":"e a honra (καὶ ἡ τιμή)","greek":"καὶ ἡ τιμή","strong":"G5092"},
            {"id":"ap513-6b","type":"conjunction","text":"e a glória (καὶ ἡ δόξα)","greek":"καὶ ἡ δόξα","strong":"G1391"},
            {"id":"ap513-6c","type":"conjunction","text":"e o poder (καὶ τὸ κράτος)","greek":"καὶ τὸ κράτος","strong":"G2904"},
            {"id":"ap513-6d","type":"adverbial","text":"para sempre (εἰς τοὺς αἰῶνας τῶν αἰώνων)","greek":"εἰς τοὺς αἰῶνας τῶν αἰώνων","strong":"G165"}
        ]}
    ],
    "explicacao": "Doxologia universal: πᾶσα κτίσις = toda criatura. Quatro attributos: εὐλογία (bênção), τιμή (honra), δόξα (glória), κράτος (poder). εἰς τοὺς αἰῶνας τῶν αἰώνων = para sempre e sempre (eternidade). Trono + Cordeiro = adoração dual.",
    "notas": ["κτίσις = criatura","καθημένῳ = particípio presente de κάθημαι (estar sentado)","ἀρνίῳ = Cordeiro (Cristo sacrificado)","κράτος = poder, domínio"]
})

nt_batch_6.append({
    "ref": "Ap 22:20", "livro": "Apocalipse",
    "traducao": "Aquele que dá testemunho destas coisas diz:certamente, cedo venho. Amém. Vem, Senhor Jesus.",
    "grego": "λέγει ὁ μαρτυρῶν ταῦτα· ναί, ἔρχομαι ταχύ. Ἀμήν. ἔρχου, κύριε Ἰησοῦ.",
    "diagrama": [
        {"id":"ap2220-1","type":"predicate","text":"diz (λέγει)","greek":"λέγει","strong":"G3004","children":[
            {"id":"ap2220-1a","type":"subject","text":"aquele que dá testemunho (ὁ μαρτυρῶν ταῦτα)","greek":"ὁ μαρτυρῶν ταῦτα","strong":"G3140"}
        ]},
        {"id":"ap2220-2","type":"complement","text":"sim (ναί)","greek":"ναί","strong":"G3483"},
        {"id":"ap2220-3","type":"predicate","text":"venho (ἔρχομαι)","greek":"ἔρχομαι","strong":"G2064","children":[
            {"id":"ap2220-3a","type":"adverbial","text":"cedo (ταχύ)","greek":"ταχύ","strong":"G5034"}
        ]},
        {"id":"ap2220-4","type":"interjection","text":"Amém (Ἀμήν)","greek":"Ἀμήν","strong":"G281"},
        {"id":"ap2220-5","type":"predicate","text":"vem (ἔρχου)","greek":"ἔρχου","strong":"G2064","children":[
            {"id":"ap2220-5a","type":"vocative","text":"Senhor Jesus (κύριε Ἰησοῦ)","greek":"κύριε Ἰησοῦ","strong":"G2962"}
        ]}
    ],
    "explicacao": "Confirmação divina: ναί = sim (certeza). ταχύ = cedo (em breve). Ἀμήν = assim seja (ratificação). ἔρχου = imperativo médio (vem agora!). O último pedido do NT: Maranatha! Venha, Senhor!",
    "notas": ["λέγει = presente de λέγω","μαρτυρῶν = particípio presente de μαρτυρέω","ναί = sim, verdadeiramente","ἔρχου = imperativo de ἔρχομαι (vem)"]
})
