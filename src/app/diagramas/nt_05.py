# -*- coding: utf-8 -*-
# NT batch 5: Coríntios + Gálatas + Efésios (12 diagrams)

nt_batch_5 = []

nt_batch_5.append({
    "ref": "1Co 1:18", "livro": "1 Coríntios",
    "traducao": "Porque a palavra da cruz é loucura para os que se perdem, mas para os que se salvam, isto é, para nós, é poder de Deus.",
    "grego": "ὁ λόγος γὰρ ὁ τοῦ σταυροῦ τοῖς μὲν ἀπολλυμένοις μωρία ἐστίν, τοῖς δὲ σωζομένοις ἡμῖν δύναμις θεοῦ ἐστιν.",
    "diagrama": [
        {"id":"1co118-1","type":"subject","text":"a palavra da cruz (ὁ λόγος ὁ τοῦ σταυροῦ)","greek":"ὁ λόγος ὁ τοῦ σταυροῦ","strong":"G3056","children":[
            {"id":"1co118-1a","type":"modifier","text":"da cruz (τοῦ σταυροῦ)","greek":"τοῦ σταυροῦ","strong":"G4716"}
        ]},
        {"id":"1co118-2","type":"conjunction","text":"porque (γάρ)","greek":"γάρ","strong":"G1063"},
        {"id":"1co118-3","type":"predicate","text":"é (ἐστίν)","greek":"ἐστίν","strong":"G2076","children":[
            {"id":"1co118-3a","type":"complement","text":"loucura (μωρία)","greek":"μωρία","strong":"G3472"},
            {"id":"1co118-3b","type":"dative","text":"para os que se perdem (τοῖς ἀπολλυμένοις)","greek":"τοῖς ἀπολλυμένοις","strong":"G622"},
            {"id":"1co118-3c","type":"conjunction","text":"mas (δέ)","greek":"δέ","strong":"G1161"},
            {"id":"1co118-3d","type":"complement","text":"poder de Deus (δύναμις θεοῦ)","greek":"δύναμις θεοῦ","strong":"G1411"},
            {"id":"1co118-3e","type":"dative","text":"para os que se salvam (τοῖς σωζομένοις)","greek":"τοῖς σωζομένοις","strong":"G4982"}
        ]}
    ],
    "explicacao": "Contraste: μωρία (loucura) vs δύναμις θεοῦ (poder de Deus). ἀπολλυμένοις = particípio presente (se perdem, em processo de perdição). σωζομένοις = particípio presente (se salvam, em processo de salvação). O paradoxo da cruz.",
    "notas": ["λόγος = palavra, mensagem","σταυροῦ = cruz (morte vergonhosa)","μωρία = loucura, tolice","ἀπολλυμένοις = se perdem (particípio presente)"]
})

nt_batch_5.append({
    "ref": "1Co 2:2", "livro": "1 Coríntios",
    "traducao": "Porque não me propus saber coisa alguma entre vós, senão Jesus Cristo, e este crucificado.",
    "grego": "οὐ γὰρ ἔκρινα τοῦ εἰδέναι τι ἐν ὑμῖν εἰ μὴ Ἰησοῦν Χριστὸν καὶ τοῦτον ἐσταυρωμένον.",
    "diagrama": [
        {"id":"1co22-1","type":"conjunction","text":"porque (γάρ)","greek":"γάρ","strong":"G1063"},
        {"id":"1co22-2","type":"predicate","text":"não me propus (οὐ ἔκρινα)","greek":"οὐ ἔκρινα","strong":"G2919","children":[
            {"id":"1co22-2a","type":"complement","text":"saber (τοῦ εἰδέναι)","greek":"τοῦ εἰδέναι","strong":"G1492"},
            {"id":"1co22-2b","type":"object","text":"coisa alguma (τι)","greek":"τι","strong":"G5100"},
            {"id":"1co22-2c","type":"adverbial","text":"entre vós (ἐν ὑμῖν)","greek":"ἐν ὑμῖν","strong":"G1722"}
        ]},
        {"id":"1co22-3","type":"conjunction","text":"senão (εἰ μή)","greek":"εἰ μή","strong":"G1508"},
        {"id":"1co22-4","type":"object","text":"Jesus Cristo (Ἰησοῦν Χριστόν)","greek":"Ἰησοῦν Χριστόν","strong":"G2424","children":[
            {"id":"1co22-4a","type":"modifier","text":"e este crucificado (καὶ τοῦτον ἐσταυρωμένον)","greek":"καὶ τοῦτον ἐσταυρωμένον","strong":"G4717"}
        ]}
    ],
    "explicacao": "ἔκρινα = aoristo (determinei, decidi). τοῦ εἰδέναι = infinitivo (saber como finalidade). εἰ μή = exceto, senão. ἐσταυρωμένον = perfeito passivo (crucificado, estado resultante). Focalização exclusiva na cruz.",
    "notas": ["ἔκρινα = determinei (aoristo de κρίνω)","εἰδέναι = saber (conhecimento experiencial)","ἐσταυρωμένον = crucificado (perfeito passivo)","τοῦτον = este (demonstrativo enfático)"]
})

nt_batch_5.append({
    "ref": "1Co 3:16", "livro": "1 Coríntios",
    "traducao": "Não sabeis que sois o templo de Deus, e que o Espírito de Deus habita em vós?",
    "grego": "οὐκ οἴδατε ὅτι ναὸς θεοῦ ἐστε καὶ τὸ πνεῦμα τοῦ θεοῦ οἰκεῖ ἐν ὑμῖν;",
    "diagrama": [
        {"id":"1co316-1","type":"predicate","text":"não sabeis (οὐκ οἴδατε)","greek":"οὐκ οἴδατε","strong":"G1492","children":[
            {"id":"1co316-1a","type":"object","text":"que (ὅτι)","greek":"ὅτι","strong":"G3754"}
        ]},
        {"id":"1co316-2","type":"subject","text":"vós (ὑμεῖς)","greek":"ὑμεῖς","strong":"G4771"},
        {"id":"1co316-3","type":"predicate","text":"sois (ἐστε)","greek":"ἐστε","strong":"G2076","children":[
            {"id":"1co316-3a","type":"complement","text":"o templo de Deus (ναὸς θεοῦ)","greek":"ναὸς θεοῦ","strong":"G3485"}
        ]},
        {"id":"1co316-4","type":"conjunction","text":"e (καί)","greek":"καί","strong":"G2532"},
        {"id":"1co316-5","type":"subject","text":"o Espírito de Deus (τὸ πνεῦμα τοῦ θεοῦ)","greek":"τὸ πνεῦμα τοῦ θεοῦ","strong":"G4151"},
        {"id":"1co316-6","type":"predicate","text":"habita (οἰκεῖ)","greek":"οἰκεῖ","strong":"G3611","children":[
            {"id":"1co316-6a","type":"adverbial","text":"em vós (ἐν ὑμῖν)","greek":"ἐν ὑμῖν","strong":"G1722"}
        ]}
    ],
    "explicacao": "Pergunta retórica: οὐκ οἴδατε = não sabeis (deveriam saber). ναὸς = templo (santuário interior, não construção). οἰκεῖ = habita (presente, residência permanente). O crente é santuário do Espírito.",
    "notas": ["ναός = templo (santuário, lugar da presença)","οἰκεῖ = habita, reside (verbo de domicílio)","πνεῦμα τοῦ θεοῦ = Espírito de Deus","Plural: sois templo (corpo de crentes)"]
})

nt_batch_5.append({
    "ref": "1Co 10:13", "livro": "1 Coríntios",
    "traducao": "Nenhuma tentação vos sobreveio senão a humana; mas Deus é fiel, que não vos deixará ser tentados acima do que podeis, mas fará também juntamente com a tentação a saída, para que a possais suportar.",
    "grego": "πειρασμὸς ὑμᾶς οὐκ εἴληφεν εἰ μὴ ἀνθρώπινος· πιστὸς δὲ ὁ θεὸς ὃς οὐκ ἐάσει ὑμᾶς πειρασθῆναι ὑπὲρ ὃ δύνασθε ἀλλὰ ποιήσει σὺν τῷ πειρασμῷ καὶ τὴν ἔκβασιν τοῦ δύνασθαι ὑμᾶς ὑπενεγκεῖν.",
    "diagrama": [
        {"id":"1co1013-1","type":"subject","text":"tentação (πειρασμός)","greek":"πειρασμός","strong":"G3986"},
        {"id":"1co1013-2","type":"predicate","text":"não vos sobreveio (οὐκ εἴληφεν ὑμᾶς)","greek":"οὐκ εἴληφεν ὑμᾶς","strong":"G2983","children":[
            {"id":"1co1013-2a","type":"complement","text":"senão humana (εἰ μὴ ἀνθρώπινος)","greek":"εἰ μὴ ἀνθρώπινος","strong":"G442"}
        ]},
        {"id":"1co1013-3","type":"conjunction","text":"mas (δέ)","greek":"δέ","strong":"G1161"},
        {"id":"1co1013-4","type":"subject","text":"Deus (ὁ θεός)","greek":"ὁ θεός","strong":"G2316"},
        {"id":"1co1013-5","type":"predicate","text":"é fiel (πιστός ἐστιν)","greek":"πιστός ἐστιν","strong":"G4103","children":[
            {"id":"1co1013-5a","type":"complement","text":"fiel (πιστός)","greek":"πιστός","strong":"G4103"}
        ]},
        {"id":"1co1013-6","type":"predicate","text":"não deixará (οὐκ ἐάσει)","greek":"οὐκ ἐάσει","strong":"G1439","children":[
            {"id":"1co1013-6a","type":"object","text":"que sejais tentados (ὑμᾶς πειρασθῆναι)","greek":"ὑμᾶς πειρασθῆναι","strong":"G3985"},
            {"id":"1co1013-6b","type":"adverbial","text":"acima do que podeis (ὑπὲρ ὃ δύνασθε)","greek":"ὑπὲρ ὃ δύνασθε","strong":"G5228"}
        ]},
        {"id":"1co1013-7","type":"conjunction","text":"mas (ἀλλά)","greek":"ἀλλά","strong":"G235"},
        {"id":"1co1013-8","type":"predicate","text":"fará (ποιήσει)","greek":"ποιήσει","strong":"G4160","children":[
            {"id":"1co1013-8a","type":"object","text":"a saída (τὴν ἔκβασιν)","greek":"τὴν ἔκβασιν","strong":"G1841"},
            {"id":"1co1013-8b","type":"adverbial","text":"juntamente com a tentação (σὺν τῷ πειρασμῷ)","greek":"σὺν τῷ πειρασμῷ","strong":"G4862"}
        ]}
    ],
    "explicacao": "Promessa de Deus: πιστός = fiel (confiável). οὐκ ἐάσει = não permitirá. ὑπέρ ὃ δύνασθε = além do que suportais. ποιήσει = fará (Deus age). σύν = com (simultâneo). A saída vem junto com a tentação.",
    "notas": ["πειρασμός = tentação, provação","εἴληφεν = perfeito de λαμβάνω (sobreveio)","ἐάσει = futuro de ἐάω (permitir)","ἔκβασιν = saída, escape"]
})

nt_batch_5.append({
    "ref": "1Co 13:4", "livro": "1 Coríntios",
    "traducao": "O amor é sofredor, é benigno; o amor não é invejoso; o amor não trata com leviandade, não se ensoberbece.",
    "grego": "ἡ ἀγάπη μακροθυμεῖ, χρηστεύεται, οὐ ζηλοῖ, οὐ περπερεύεται, οὐ φυσιοῦται.",
    "diagrama": [
        {"id":"1co134-1","type":"subject","text":"o amor (ἡ ἀγάπη)","greek":"ἡ ἀγάπη","strong":"G26"},
        {"id":"1co134-2","type":"predicate","text":"é sofredor (μακροθυμεῖ)","greek":"μακροθυμεῖ","strong":"G3114"},
        {"id":"1co134-3","type":"conjunction","text":"é (χρηστεύεται)","greek":"χρηστεύεται","strong":"G5541"},
        {"id":"1co134-4","type":"predicate","text":"não é invejoso (οὐ ζηλοῖ)","greek":"οὐ ζηλοῖ","strong":"G2206"},
        {"id":"1co134-5","type":"conjunction","text":"não (οὐ)","greek":"οὐ","strong":"G3756"},
        {"id":"1co134-6","type":"predicate","text":"trata com leviandade (περπερεύεται)","greek":"περπερεύεται","strong":"G4068"},
        {"id":"1co134-7","type":"conjunction","text":"não (οὐ)","greek":"οὐ","strong":"G3756"},
        {"id":"1co134-8","type":"predicate","text":"se ensoberbece (φυσιοῦται)","greek":"φυσιοῦται","strong":"G5448"}
    ],
    "explicacao": "Definição negativa do amor (o que NÃO é). μακροθυμεῖ = é sofredor (paciência longa). χρηστεύεται = é benigno (bondade ativa). Cada verbo é presente indicativo (característica contínua).",
    "notas": ["μακροθυμεῖ = é paciente (paciência longa)","χρηστεύεται = é bondoso, benigno","ζηλοῖ = é invejoso (zelar negativamente)","φυσιοῦτai = se infla, se ensoberbece"]
})

nt_batch_5.append({
    "ref": "1Co 15:3", "livro": "1 Coríntios",
    "traducao": "Porqueprimeiro de tudo vos entreguei o que também recebi: que Cristo morreu pelos nossos pecados, segundo as Escrituras.",
    "grego": "παρέδωκα γὰρ ὑμῖν ἐν πρώτοις ὃ καὶ παρέλαβον ὅτι Χριστὸς ἀπέθανεν ὑπὲρ τῶν ἁμαρτιῶν ἡμῶν κατὰ τὰς γραφάς.",
    "diagrama": [
        {"id":"1co153-1","type":"predicate","text":"entreguei (παρέδωκα)","greek":"παρέδωκα","strong":"G3860","children":[
            {"id":"1co153-1a","type":"dative","text":"a vós (ὑμῖν)","greek":"ὑμῖν","strong":"G4771"},
            {"id":"1co153-1b","type":"adverbial","text":"primeiro (ἐν πρώτοις)","greek":"ἐν πρώτοις","strong":"G4413"}
        ]},
        {"id":"1co153-2","type":"conjunction","text":"porque (γάρ)","greek":"γάρ","strong":"G1063"},
        {"id":"1co153-3","type":"object","text":"o que também recebi (ὃ καὶ παρέλαβον)","greek":"ὃ καὶ παρέλαβον","strong":"G3880"},
        {"id":"1co153-4","type":"conjunction","text":"que (ὅτι)","greek":"ὅτι","strong":"G3754"},
        {"id":"1co153-5","type":"subject","text":"Cristo (Χριστός)","greek":"Χριστός","strong":"G5547"},
        {"id":"1co153-6","type":"predicate","text":"morreu (ἀπέθανεν)","greek":"ἀπέθανεν","strong":"G599","children":[
            {"id":"1co153-6a","type":"adverbial","text":"pelos nossos pecados (ὑπὲρ τῶν ἁμαρτιῶν ἡμῶν)","greek":"ὑπὲρ τῶν ἁμαρτιῶν ἡμῶν","strong":"G266"}
        ]},
        {"id":"1co153-7","type":"adverbial","text":"segundo as Escrituras (κατὰ τὰς γραφάς)","greek":"κατὰ τὰς γραφάς","strong":"G1124"}
    ],
    "explicacao": "Tradição recebida e entregue: παρέδωκα = entreguei (tradição). παρέλαβον = recebi (de outros). κατὰ τὰς γραφάς = segundo as Escrituras (cumprimento profético). Fundamento da fé.",
    "notas": ["παρέδωκα = entreguei, transmiti","παρέλαβον = recebi (tradição)","κατὰ τὰς γραφάς = segundo as Escrituras","Fundamento: morte de Cristo pelos pecados"]
})

nt_batch_5.append({
    "ref": "Gl 2:20", "livro": "Gálatas",
    "traducao": "Estou crucificado com Cristo; e já não vivo eu, mas Cristo vive em mim; e a vida que agora vivo na carne, vivo pela fé no Filho de Deus, que me amou, e se entregou a si mesmo por mim.",
    "grego": "Χριστῷ συνεσταύρωμαι· ζῶ δὲ οὐκέτι ἐγώ, ζῇ δὲ ἐν ἐμοὶ Χριστός· ὃ δὲ νῦν ζῶ ἐν σαρκί, ἐν πίστει ζῶ τῇ τοῦ υἱοῦ τοῦ θεοῦ τοῦ ἀγαπήσαντός με καὶ παραδόντος ἑαυτὸν ὑπὲρ ἐμοῦ.",
    "diagrama": [
        {"id":"gl220-1","type":"predicate","text":"estou crucificado (συνεσταύρωμαι)","greek":"συνεσταύρωμαι","strong":"G4957","children":[
            {"id":"gl220-1a","type":"dative","text":"com Cristo (Χριστῷ)","greek":"Χριστῷ","strong":"G5547"}
        ]},
        {"id":"gl220-2","type":"conjunction","text":"mas (δέ)","greek":"δέ","strong":"G1161"},
        {"id":"gl220-3","type":"predicate","text":"já não vivo (ζῶ δὲ οὐκέτι ἐγώ)","greek":"ζῶ δὲ οὐκέτι ἐγώ","strong":"G2198","children":[
            {"id":"gl220-3a","type":"subject","text":"eu (ἐγώ)","greek":"ἐγώ","strong":"G1473"}
        ]},
        {"id":"gl220-4","type":"conjunction","text":"mas (δέ)","greek":"δέ","strong":"G1161"},
        {"id":"gl220-5","type":"predicate","text":"Cristo vive (ζῇ Χριστός)","greek":"ζῇ Χριστός","strong":"G2198","children":[
            {"id":"gl220-5a","type":"subject","text":"Cristo (Χριστός)","greek":"Χριστός","strong":"G5547"},
            {"id":"gl220-5b","type":"adverbial","text":"em mim (ἐν ἐμοί)","greek":"ἐν ἐμοί","strong":"G1722"}
        ]},
        {"id":"gl220-6","type":"adverbial","text":"pela fé (ἐν πίστει)","greek":"ἐν πίστει","strong":"G4102","children":[
            {"id":"gl220-6a","type":"modifier","text":"no Filho de Deus (τοῦ υἱοῦ τοῦ θεοῦ)","greek":"τοῦ υἱοῦ τοῦ θεοῦ","strong":"G5207"}
        ]}
    ],
    "explicacao": "συνεσταύρωμαι = perfeito passivo (estou crucificado com). União com Cristo na cruz. οὐκέτι ἐγώ = já não eu (morte do velho homem). ζῇ δὲ ἐν ἐμοί = Cristo vive em mim (vida ressurreta). Fé no Filho que se entregou.",
    "notas": ["συνεσταύρωμαι = estou crucificado com","ζῇ = presente ativo de ζάω (viver)","παραδόντος = aoristo participial de παραδίδωμι (entregar)","ὑπὲρ ἐμοῦ = por mim"]
})

nt_batch_5.append({
    "ref": "Ef 2:8", "livro": "Efésios",
    "traducao": "Porque pela graça sois salvos, por meio da fé; e isto não de vós, pois é dom de Deus.",
    "grego": "τῇ γὰρ χάριτί ἐστε σεσῳσμένοι διὰ τῆς πίστεως· καὶ τοῦτο οὐκ ἐξ ὑμῶν, τοῦ θεοῦ τὸ δῶρον.",
    "diagrama": [
        {"id":"ef28-1","type":"adverbial","text":"pela graça (τῇ χάριτι)","greek":"τῇ χάριτι","strong":"G5485"},
        {"id":"ef28-2","type":"conjunction","text":"porque (γάρ)","greek":"γάρ","strong":"G1063"},
        {"id":"ef28-3","type":"predicate","text":"sois salvos (ἐστε σεσῳσμένοι)","greek":"ἐστε σεσῳσμένοι","strong":"G4982"},
        {"id":"ef28-4","type":"adverbial","text":"por meio da fé (διὰ τῆς πίστεως)","greek":"διὰ τῆς πίστεως","strong":"G4102"},
        {"id":"ef28-5","type":"conjunction","text":"e (καί)","greek":"καί","strong":"G2532"},
        {"id":"ef28-6","type":"subject","text":"isto (τοῦτο)","greek":"τοῦτο","strong":"G3778"},
        {"id":"ef28-7","type":"predicate","text":"não é (οὐκ ἐστίν)","greek":"οὐκ ἐστίν","strong":"G2076","children":[
            {"id":"ef28-7a","type":"adverbial","text":"de vós (ἐξ ὑμῶν)","greek":"ἐξ ὑμῶν","strong":"G1537"}
        ]},
        {"id":"ef28-8","type":"complement","text":"é dom de Deus (τοῦ θεοῦ τὸ δῶρον)","greek":"τοῦ θεοῦ τὸ δῶρον","strong":"G1432"}
    ],
    "explicacao": "σεσῳσμένοι = perfeito passivo (sois salvos, estado resultante). τῇ χάριτι = pela graça (instrumento). διὰ τῆς πίστεως = por meio da fé (canal). τοῦ θεοῦ τὸ δῶρον = dom de Deus (não mérito humano).",
    "notas": ["χάριτι = graça (dom imerecido)","σεσῳσμένοι = sois salvos (perfeito passivo)","πίστεως = fé (confiança, confiança)","δῶρον = dom (presente)"]
})

nt_batch_5.append({
    "ref": "Ef 2:10", "livro": "Efésios",
    "traducao": "Porque somos feitura dele, criados em Cristo Jesus para boas obras, as quais Deus preparou de antemão para que andássemos nelas.",
    "grego": "αὐτοῦ γάρ ἐσμεν ποίημα, κτισθέντες ἐν Χριστῷ Ἰησοῦ ἐπὶ ἔργοις ἀγαθοῖς οἷς προητοίμασεν ὁ θεὸς ἵνα ἐν αὐτοῖς περιπατήσωμεν.",
    "diagrama": [
        {"id":"ef210-1","type":"subject","text":"nós (ἡμεῖς)","greek":"ἡμεῖς","strong":"G2249"},
        {"id":"ef210-2","type":"conjunction","text":"porque (γάρ)","greek":"γάρ","strong":"G1063"},
        {"id":"ef210-3","type":"predicate","text":"somos (ἐσμέν)","greek":"ἐσμέν","strong":"G2076","children":[
            {"id":"ef210-3a","type":"complement","text":"feitura dele (αὐτοῦ ποίημα)","greek":"αὐτοῦ ποίημα","strong":"G4161"}
        ]},
        {"id":"ef210-4","type":"modifier","text":"criados em Cristo (κτισθέντες ἐν Χριστῷ)","greek":"κτισθέντες ἐν Χριστῷ","strong":"G2936"},
        {"id":"ef210-5","type":"complement","text":"para boas obras (ἐπὶ ἔργοις ἀγαθοῖς)","greek":"ἐπὶ ἔργοις ἀγαθοῖς","strong":"G2041"},
        {"id":"ef210-6","type":"modifier","text":"as quais preparou (οἷς προητοίμασεν ὁ θεός)","greek":"οἷς προητοίμασεν ὁ θεός","strong":"G4294"},
        {"id":"ef210-7","type":"complement","text":"para que andássemos (ἵνα περιπατήσωμεν)","greek":"ἵνα περιπατήσωμεν","strong":"G4043","children":[
            {"id":"ef210-7a","type":"adverbial","text":"nelas (ἐν αὐτοῖς)","greek":"ἐν αὐτοῖς","strong":"G1722"}
        ]}
    ],
    "explicacao": "ποίημα = feitura, obra criada. κτισθέντες = aoristo passivo (criados, evento único). ἐπὶ ἔργοις ἀγαθοῖς = para boas obras (propósito). προητοίμασεν = preparou de antemão (plano eterno). Andar nas obras preparadas.",
    "notas": ["ποίημα = obra, criação","κτισθέντες = criados (aoristo passivo)","προητοίμασεν = preparou antes","περιπατήσωμεν = andemos (modo de vida)"]
})

nt_batch_5.append({
    "ref": "Ef 4:32", "livro": "Efésios",
    "traducao": "Mas sede bondosos para com uns aos outros, misericordiosos, perdoando-vos uns aos outros, como também Deus vos perdoou em Cristo.",
    "grego": "γίνεσθε δὲ χρηστοὶ ἀλλήλων, εὔσπλαγχνοι, χαριζόμενοι ἑαυτοῖς καθὼς καὶ ὁ θεὸς ἐν Χριστῷ ἐχαρίσατο ὑμῖν.",
    "diagrama": [
        {"id":"ef432-1","type":"predicate","text":"sede (γίνεσθε)","greek":"γίνεσθε","strong":"G1096","children":[
            {"id":"ef432-1a","type":"complement","text":"bondosos (χρηστοί)","greek":"χρηστοί","strong":"G5543"},
            {"id":"ef432-1b","type":"dative","text":"uns aos outros (ἀλλήλων)","greek":"ἀλλήλων","strong":"G240"}
        ]},
        {"id":"ef432-2","type":"complement","text":"misericordiosos (εὔσπλαγχνοι)","greek":"εὔσπλαγχνοι","strong":"G2155"},
        {"id":"ef432-3","type":"modifier","text":"perdoando-vos (χαριζόμενοι ἑαυτοῖς)","greek":"χαριζόμενοι ἑαυτοῖς","strong":"G5483"},
        {"id":"ef432-4","type":"adverbial","text":"como também (καθὼς καί)","greek":"καθὼς καί","strong":"G2531"},
        {"id":"ef432-5","type":"subject","text":"Deus (ὁ θεός)","greek":"ὁ θεός","strong":"G2316"},
        {"id":"ef432-6","type":"predicate","text":"vos perdoou (ἐχαρίσατο ὑμῖν)","greek":"ἐχαρίσατο ὑμῖν","strong":"G5483","children":[
            {"id":"ef432-6a","type":"adverbial","text":"em Cristo (ἐν Χριστῷ)","greek":"ἐν Χριστῷ","strong":"G5547"}
        ]}
    ],
    "explicacao": "Imperativos: γίνεσθε = sede (tornai-se). χρηστοί = bondosos (benevolentes). εὔσπλαγχνοι = misericordiosos (compassivos). χαριζόμενοι = perdoando (dativo recíproco). Modelo: como Deus perdoou em Cristo.",
    "notas": ["γίνεσθε = sede, tornai-se","χρηστοί = bondosos, benignos","εὔσπλαγχνοi = misericordiosos (coração compaixivo)","ἐχαρίσατο = perdoou (aoristo médio)"]
})

nt_batch_5.append({
    "ref": "Ef 6:10", "livro": "Efésios",
    "traducao": "No demais, irmãos meus, fortalecei-vos no Senhor e na força do seu poder.",
    "grego": "τοῦ λοιποῦ ἐνδυναμοῦσθε ἐν κυρίῳ καὶ ἐν τῷ κράτει τῆς ἰσχύος αὐτοῦ.",
    "diagrama": [
        {"id":"ef610-1","type":"adverbial","text":"no demais (τοῦ λοιποῦ)","greek":"τοῦ λοιποῦ","strong":"G3063"},
        {"id":"ef610-2","type":"vocative","text":"irmãos meus (ἀδελφοί μου)","greek":"ἀδελφοί μου","strong":"G80"},
        {"id":"ef610-3","type":"predicate","text":"fortalecei-vos (ἐνδυναμοῦσθε)","greek":"ἐνδυναμοῦσθε","strong":"G1743","children":[
            {"id":"ef610-3a","type":"adverbial","text":"no Senhor (ἐν κυρίῳ)","greek":"ἐν κυρίῳ","strong":"G2962"},
            {"id":"ef610-3b","type":"adverbial","text":"na força do seu poder (ἐν τῷ κράτει τῆς ἰσχύος αὐτοῦ)","greek":"ἐν τῷ κράτει τῆς ἰσχύος αὐτοῦ","strong":"G2904"}
        ]}
    ],
    "explicacao": "ἐνδυναμοῦσθε = imperative presente (fortalecei-vos continuamente). Duas fontes: ἐν κυρίῳ (no Senhor) + ἐν τῷ κράτει (na força). κράτος = poder manifestado. ἰσχύς = força interna. O poder não é nosso, é de Deus.",
    "notas": ["ἐνδυναμοῦσθε = fortalecei-vos (imperativo)","κράτει = poder, domínio","ἰσχύος = força, vigor","ἐν + dativo = no, por meio de"]
})

nt_batch_5.append({
    "ref": "Fl 4:6", "livro": "Filipenses",
    "traducao": "Não vos inquieteis por coisa alguma, mas as vossas petições sejam conhecidas diante de Deus em toda a oração e súplica, com ação de graças.",
    "grego": "μηδὲν μεριμνᾶτε ἀλλ᾽ ἐν παντὶ τῇ προσευχῇ καὶ τῇ δεήσει μετὰ εὐχαριστίας τὰ αἰτήματα ὑμῶν γινωσκέσθω παρὰ τοῦ θεοῦ.",
    "diagrama": [
        {"id":"fl46-1","type":"predicate","text":"não vos inquieteis (μηδὲν μεριμνᾶτε)","greek":"μηδὲν μεριμνᾶτε","strong":"G3306","children":[
            {"id":"fl46-1a","type":"adverbial","text":"por coisa alguma (μηδέν)","greek":"μηδέν","strong":"G3367"}
        ]},
        {"id":"fl46-2","type":"conjunction","text":"mas (ἀλλά)","greek":"ἀλλά","strong":"G235"},
        {"id":"fl46-3","type":"adverbial","text":"em toda oração (ἐν παντὶ τῇ προσευχῇ)","greek":"ἐν παντὶ τῇ προσευχῇ","strong":"G4335","children":[
            {"id":"fl46-3a","type":"conjunction","text":"e súplica (καὶ τῇ δεήσει)","greek":"καὶ τῇ δεήσει","strong":"G1162"},
            {"id":"fl46-3b","type":"modifier","text":"com ação de graças (μετὰ εὐχαριστίας)","greek":"μετὰ εὐχαριστίας","strong":"G2169"}
        ]},
        {"id":"fl46-4","type":"predicate","text":"sejam conhecidas (γινωσκέσθωσαν)","greek":"γινωσκέσθω παρὰ τοῦ θεοῦ","strong":"G1097","children":[
            {"id":"fl46-4a","type":"subject","text":"as petições (τὰ αἰτήματα ὑμῶν)","greek":"τὰ αἰτήματα ὑμῶν","strong":"G155"},
            {"id":"fl46-4b","type":"adverbial","text":"diante de Deus (παρὰ τοῦ θεοῦ)","greek":"παρὰ τοῦ θεοῦ","strong":"G2316"}
        ]}
    ],
    "explicacao": "μεριμνᾶτe = imperativo presente (preocupem-se). Negação: μηδέν = nada. γινωσκέσθω = imperativo passivo (seja conhecida). Oração + súplica + gratidão. As petições chegam a Deus.",
    "notas": ["μεριμνᾶτε = preocupem-se (imperativo)","προσευχῇ = oração","δεήσει = súplica (pedido)","εὐχαριστίας = ação de graças"]
})
