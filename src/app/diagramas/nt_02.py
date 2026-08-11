# -*- coding: utf-8 -*-
# NT batch 2: Mateus + Marcos + Lucas (12 diagrams)

nt_batch_2 = []

nt_batch_2.append({
    "ref": "Mt 11:28", "livro": "Mateus",
    "traducao": "Vinde a mim, todos os que estais cansados e oprimidos, e eu vos aliviarei.",
    "grego": "Δεῦτε πρός με πάντες οἱ κοπιῶντες καὶ πεφορτισμένοι, κἀγὼ ἀναπαύσω ὑμᾶς.",
    "diagrama": [
        {"id":"mt1128-1","type":"vocative","text":"Vinde (Δεῦτε)","greek":"Δεῦτε","strong":"G1205","children":[
            {"id":"mt1128-1a","type":"adverbial","text":"a mim (πρός με)","greek":"πρός με","strong":"G4314"}
        ]},
        {"id":"mt1128-2","type":"subject","text":"todos (πάντες)","greek":"πάντες","strong":"G3956","children":[
            {"id":"mt1128-2a","type":"modifier","text":"que estais cansados (οἱ κοπιῶντες)","greek":"οἱ κοπιῶντες","strong":"G2872"},
            {"id":"mt1128-2b","type":"conjunction","text":"e (καί)","greek":"καί","strong":"G2532"},
            {"id":"mt1128-2c","type":"modifier","text":"oprimidos (πεφορτισμένοι)","greek":"πεφορτισμένοι","strong":"G5413"}
        ]},
        {"id":"mt1128-3","type":"predicate","text":"eu vos aliviarei (κἀγὼ ἀναπαύσω ὑμᾶς)","greek":"κἀγὼ ἀναπαύσω ὑμᾶς","strong":"G373","children":[
            {"id":"mt1128-3a","type":"subject","text":"eu (κἀγώ)","greek":"κἀγώ","strong":"G1473"},
            {"id":"mt1128-3b","type":"object","text":"vós (ὑμᾶς)","greek":"ὑμᾶς","strong":"G4771"}
        ]}
    ],
    "explicacao": "Imperativo aoristo (Δεῦτε = vinde agora). κοπιῶντες = esforçados (trabalho pesado). πεφορτισμένoi = sobrecarregados (carga pesada). κἀγώ = eu também, eu mesmo. ἀναπαύσω = darei descanso.",
    "notas": ["Δεῦτε = imperativo aoristo de δεῦρο (vinde)","κοπιῶντες = particípio presente de κοπιάω (trabalhar cansado)","πεφορτισμένοι = perfeito passivo de φορτίζω (sobrecarregar)","ἀναπαύσω = futuro ativo de ἀναπαύω (dar descanso)"]
})

nt_batch_2.append({
    "ref": "Mt 16:15", "livro": "Mateus",
    "traducao": "E vós, quem dizeis que eu sou?",
    "grego": "λέγει αὐτοῖς· ὑμεῖς δὲ τίνα με λέγετε εἶναι;",
    "diagrama": [
        {"id":"mt1615-1","type":"predicate","text":"diz (λέγει)","greek":"λέγει","strong":"G3004","children":[
            {"id":"mt1615-1a","type":"subject","text":"ele (Jesus)","greek":"αὐτοῖς","strong":"G846"},
            {"id":"mt1615-1b","type":"dative","text":"a eles (αὐτοῖς)","greek":"αὐτοῖς","strong":"G846"}
        ]},
        {"id":"mt1615-2","type":"vocative","text":"Vós (ὑμεῖς)","greek":"ὑμεῖς","strong":"G4771"},
        {"id":"mt1615-3","type":"object","text":"quem (τίνα)","greek":"τίνα","strong":"G5101"},
        {"id":"mt1615-4","type":"predicate","text":"dizeis (λέγετε)","greek":"λέγετε","strong":"G3004","children":[
            {"id":"mt1615-4a","type":"object","text":"que eu sou (με εἶναι)","greek":"με εἶναι","strong":"G1510"}
        ]}
    ],
    "explicacao": "Pergunta direta com ὑμεῖς enfático (contrastando com as opiniões populares). τίνα = acusativo interrogativo. εἶναι = infinitivo de εἰμί (ser). A pergunta central do evangelho.",
    "notas": ["λέγει = presente histórico de λέγω","ὑμεῖς = pronome enfático (vós especificamente)","τίνα = acusativo interrogativo de τίς","εἶναι = infinitivo presente de εἰμί"]
})

nt_batch_2.append({
    "ref": "Mt 28:19", "livro": "Mateus",
    "traducao": "Ide, portanto, e fazei discípulos de todas as nações, baptizando-os em nome do Pai, e do Filho, e do Espírito Santo.",
    "grego": "πορευθέντες οὖν μαθητεύσατε πάντα τὰ ἔθνη, βαπτίζοντες αὐτοὺς εἰς τὸ ὄνομα τοῦ πατρὸς καὶ τοῦ υἱοῦ καὶ τοῦ ἁγίου πνεύματος.",
    "diagrama": [
        {"id":"mt2819-1","type":"predicate","text":"fazei discípulos (μαθητεύσατε)","greek":"μαθητεύσατε","strong":"G3100","children":[
            {"id":"mt2819-1a","type":"adverbial","text":"ide (πορευθέντες)","greek":"πορευθέντες","strong":"G4198"},
            {"id":"mt2819-1b","type":"adverbial","text":"portanto (οὖν)","greek":"οὖν","strong":"G3767"},
            {"id":"mt2819-1c","type":"object","text":"todas as nações (πάντα τὰ ἔθνη)","greek":"πάντα τὰ ἔθνη","strong":"G1484"},
            {"id":"mt2819-1d","type":"modifier","text":"baptizando-os (βαπτίζοντες αὐτούς)","greek":"βαπτίζοντες αὐτούς","strong":"G907"}
        ]},
        {"id":"mt2819-2","type":"complement","text":"em nome do Pai (εἰς τὸ ὄνομα τοῦ πατρός)","greek":"εἰς τὸ ὄνομα τοῦ πατρός","strong":"G3686","children":[
            {"id":"mt2819-2a","type":"conjunction","text":"e do Filho (καὶ τοῦ υἱοῦ)","greek":"καὶ τοῦ υἱοῦ","strong":"G5207"},
            {"id":"mt2819-2b","type":"conjunction","text":"e do Espírito Santo (καὶ τοῦ ἁγίου πνεύματος)","greek":"καὶ τοῦ ἁγίου πνεύματος","strong":"G4151"}
        ]}
    ],
    "explicacao": "μαθητεύσατε = imperativo aoristo (fazei discípulos). πορευθέντες = gerúndio (ide primeiro). βαπτίζοντες = gerúndio (baptizando como parte do processo). εἰς τὸ ὄνομa = em nome (= na autoridade de).",
    "notas": ["μαθητεύσατε = imperativo aoristo de μαθητεύω","βαπτίζοντες = particípio presente ativo de βαπτίζω","ἔθνη = nações, gentios","εἰς τὸ ὄνομα = em nome (autoridade, identidade)"]
})

nt_batch_2.append({
    "ref": "Mc 10:45", "livro": "Marcos",
    "traducao": "Porque também o Filho do Homem não veio para ser servido, mas para servir, e dar a sua vida em resgate por muitos.",
    "grego": "καὶ γὰρ ὁ υἱὸς τοῦ ἀνθρώπου οὐκ ἦλθεν διακονηθῆναι ἀλλὰ διακονῆσαι καὶ δοῦναι τὴν ψυχὴν αὐτοῦ λύτρον ἀντὶ πολλῶν.",
    "diagrama": [
        {"id":"mc1045-1","type":"conjunction","text":"porque também (καὶ γάρ)","greek":"καὶ γάρ","strong":"G2532"},
        {"id":"mc1045-2","type":"subject","text":"o Filho do Homem (ὁ υἱὸς τοῦ ἀνθρώπου)","greek":"ὁ υἱὸς τοῦ ἀνθρώπου","strong":"G5207"},
        {"id":"mc1045-3","type":"predicate","text":"não veio (οὐκ ἦλθεν)","greek":"οὐκ ἦλθεν","strong":"G2064","children":[
            {"id":"mc1045-3a","type":"complement","text":"para ser servido (διακονηθῆναι)","greek":"διακονηθῆναι","strong":"G1247"},
            {"id":"mc1045-3b","type":"conjunction","text":"mas (ἀλλά)","greek":"ἀλλά","strong":"G235"},
            {"id":"mc1045-3c","type":"complement","text":"para servir (διακονῆσαι)","greek":"διακονῆσαι","strong":"G1247"},
            {"id":"mc1045-3d","type":"conjunction","text":"e (καί)","greek":"καί","strong":"G2532"},
            {"id":"mc1045-3e","type":"complement","text":"dar a sua vida (δοῦναι τὴν ψυχήν)","greek":"δοῦναι τὴν ψυχήν","strong":"G1325"},
            {"id":"mc1045-3f","type":"adverbial","text":"em resgate por muitos (λύτρον ἀντὶ πολλῶν)","greek":"λύτρον ἀντὶ πολλῶν","strong":"G3089"}
        ]}
    ],
    "explicacao": "Contraste forte: οὐκ ἦλθεν... ἀλλά (não veio para... mas para). Dois infinitivos aoristos: διακονηθῆνai (ser servido, passivo) vs διακονῆσai (servir, ativo). λύτρον = resgate (preço de libertação).",
    "notas": ["διακονηθῆναι = infinitivo aoristo passivo de διακονέω","διακονῆσαι = infinitivo aoristo ativo de διακονέω","λύτρον = resgate, preço de libertação","ἀντί = em lugar de, por causa de"]
})

nt_batch_2.append({
    "ref": "Mc 12:29", "livro": "Marcos",
    "traducao": "Jesus respondeu: O primeiro é: Ouve, Israel: O Senhor nosso Deus é o único Senhor.",
    "grego": "ἀπεκρίθη Ἰησοῦς ὅτι πρώτη ἐστίν· ἄκουε Ἰσραήλ, κύριος ὁ θεὸς ἡμῶν κύριος εἷς ἐστιν.",
    "diagrama": [
        {"id":"mc1229-1","type":"predicate","text":"respondeu (ἀπεκρίθη)","greek":"ἀπεκρίθη","strong":"G611","children":[
            {"id":"mc1229-1a","type":"subject","text":"Jesus (Ἰησοῦς)","greek":"Ἰησοῦς","strong":"G2424"},
            {"id":"mc1229-1b","type":"object","text":"que (ὅτι)","greek":"ὅτι","strong":"G3754"}
        ]},
        {"id":"mc1229-2","type":"subject","text":"a primeira é (πρώτη ἐστίν)","greek":"πρώτη ἐστίν","strong":"G4413","children":[
            {"id":"mc1229-2a","type":"modifier","text":"primeira (πρώτη)","greek":"πρώτη","strong":"G4413"}
        ]},
        {"id":"mc1229-3","type":"vocative","text":"Ouve (ἄκουε)","greek":"ἄκουε","strong":"G191","children":[
            {"id":"mc1229-3a","type":"vocative","text":"Israel (Ἰσραήλ)","greek":"Ἰσραήλ","strong":"G2474"}
        ]},
        {"id":"mc1229-4","type":"subject","text":"o Senhor nosso Deus (κύριος ὁ θεὸς ἡμῶν)","greek":"κύριος ὁ θεὸς ἡμῶν","strong":"G2962","children":[
            {"id":"mc1229-4a","type":"modifier","text":"nosso (ἡμῶν)","greek":"ἡμῶν","strong":"G2249"}
        ]},
        {"id":"mc1229-5","type":"predicate","text":"é um (εἷς ἐστιν)","greek":"εἷς ἐστιν","strong":"G1520","children":[
            {"id":"mc1229-5a","type":"complement","text":"Senhor (κύριος)","greek":"κύριος","strong":"G2962"}
        ]}
    ],
    "explicacao": "Citção do Shemá (Dt 6:4). ἄκουε = imperativo presente (ouve continuamente). κύριος εἷς ἐστιν = o Senhor é um (unidade absoluta). Jesus confirma o monoteísmo judeu.",
    "notas": ["ἀπεκρίθη = aoristo passivo de ἀποκρίνομαι","ἄκουε = imperativo presente ativo de ἀκούω","εἷς = um (único)","κύριος = Senhor (YHWH traduzido)"]
})

nt_batch_2.append({
    "ref": "Mc 14:22", "livro": "Marcos",
    "traducao": "E, estando a comer, tomou o pão, abençoou-o, partiu-o e deu-lho, dizendo: Tomai, isto é o meu corpo.",
    "grego": "καὶ ἐσθιόντων αὐτῶν λαβὼν τὸν ἄρτον εὐλογήσας ἔκλασεν καὶ ἔδωκεν αὐτοῖς εἰπών· λάβετε, τοῦτό ἐστιν τὸ σῶμά μου.",
    "diagrama": [
        {"id":"mc1422-1","type":"adverbial","text":"estando a comer (ἐσθιόντων αὐτῶν)","greek":"ἐσθιόντων αὐτῶν","strong":"G2068"},
        {"id":"mc1422-2","type":"predicate","text":"tomou (λαβών)","greek":"λαβών","strong":"G2983","children":[
            {"id":"mc1422-2a","type":"object","text":"o pão (τὸν ἄρτον)","greek":"τὸν ἄρτον","strong":"G740"}
        ]},
        {"id":"mc1422-3","type":"predicate","text":"abençoou (εὐλογήσας)","greek":"εὐλογήσας","strong":"G2127"},
        {"id":"mc1422-4","type":"predicate","text":"partiu (ἔκλασεν)","greek":"ἔκλασεν","strong":"G2806"},
        {"id":"mc1422-5","type":"predicate","text":"deu (ἔδωκεν)","greek":"ἔδωκεν","strong":"G1325","children":[
            {"id":"mc1422-5a","type":"dative","text":"lhes (αὐτοῖς)","greek":"αὐτοῖς","strong":"G846"}
        ]},
        {"id":"mc1422-6","type":"predicate","text":"dizendo (εἰπών)","greek":"εἰπών","strong":"G2036","children":[
            {"id":"mc1422-6a","type":"object","text":"tomai (λάβετε)","greek":"λάβετε","strong":"G2983"},
            {"id":"mc1422-6b","type":"complement","text":"isto é o meu corpo (τοῦτό ἐστιν τὸ σῶμά μου)","greek":"τοῦτό ἐστιν τὸ σῶμά μου","strong":"G4983"}
        ]}
    ],
    "explicacao": "Sequência de aoristos: λαβών → εὐλογήσας → ἔκλασεν → ἔδωκεν (= ação sucessiva). τοῦτό ἐστιν = isto é (identificação, não metáfora). A instituição da Ceia do Senhor.",
    "notas": ["λαβών = aoristo participial de λαμβάνω","εὐλογήσας = aoristo participial de εὐλογέω","ἔκλασεν = aoristo ativo de κλάω (partir)","σῶμά = corpo (corpo físico)"]
})

nt_batch_2.append({
    "ref": "Lc 1:30", "livro": "Lucas",
    "traducao": "E o anjo disse-lhe: Não temas, Maria, porque achaste graça diante de Deus.",
    "grego": "καὶ εἶπεν ὁ ἄγγελος αὐτῇ· μὴ φοβοῦ, Μαριάμ, εὗρες γὰρ χάριν παρὰ τῷ θεῷ.",
    "diagrama": [
        {"id":"lc130-1","type":"predicate","text":"disse (εἶπεν)","greek":"εἶπεν","strong":"G2036","children":[
            {"id":"lc130-1a","type":"subject","text":"o anjo (ὁ ἄγγελος)","greek":"ὁ ἄγγελος","strong":"G32"},
            {"id":"lc130-1b","type":"dative","text":"a ela (αὐτῇ)","greek":"αὐτῇ","strong":"G846"}
        ]},
        {"id":"lc130-2","type":"predicate","text":"Não temas (μὴ φοβοῦ)","greek":"μὴ φοβοῦ","strong":"G5399","children":[
            {"id":"lc130-2a","type":"vocative","text":"Maria (Μαριάμ)","greek":"Μαριάμ","strong":"G3137"}
        ]},
        {"id":"lc130-3","type":"conjunction","text":"porque (γάρ)","greek":"γάρ","strong":"G1063"},
        {"id":"lc130-4","type":"predicate","text":"achaste (εὗρες)","greek":"εὗρες","strong":"G2147","children":[
            {"id":"lc130-4a","type":"complement","text":"graça (χάριν)","greek":"χάριν","strong":"G5485"},
            {"id":"lc130-4b","type":"adverbial","text":"diante de Deus (παρὰ τῷ θεῷ)","greek":"παρὰ τῷ θεῷ","strong":"G2316"}
        ]}
    ],
    "explicacao": "μὴ φοβοῦ = imperativo aoristo negativo (não temas!). εὗρες = aoristo indicativo (achaste, ponto único). χάριν παρὰ τῷ θεῷ = graça diante de Deus (favor divino).",
    "notas": ["φοβοῦ = imperativo presente médio de φοβέω","εὗρες = aoristo indicativo ativo de εὑρίσκω","χάριν = graça, favor, dom","παρὰ = diante de, junto a"]
})

nt_batch_2.append({
    "ref": "Lc 2:10", "livro": "Lucas",
    "traducao": "E o anjo disse-lhes: Não temais, porque vos trago boas novas de grande alegria que serão para todo o povo.",
    "grego": "καὶ εἶπεν αὐτοῖς ὁ ἄγγελος· μὴ φοβεῖσθε· ἰδοὺ γὰρ εὐαγγελίζομαι ὑμῖν χαρὰν μεγάλην ἥτις ἔσται παντὶ τῷ λαῷ.",
    "diagrama": [
        {"id":"lc210-1","type":"predicate","text":"disse (εἶπεν)","greek":"εἶπεν","strong":"G2036","children":[
            {"id":"lc210-1a","type":"subject","text":"o anjo (ὁ ἄγγελος)","greek":"ὁ ἄγγελος","strong":"G32"},
            {"id":"lc210-1b","type":"dative","text":"a eles (αὐτοῖς)","greek":"αὐτοῖς","strong":"G846"}
        ]},
        {"id":"lc210-2","type":"predicate","text":"Não temais (μὴ φοβεῖσθε)","greek":"μὴ φοβεῖσθε","strong":"G5399"},
        {"id":"lc210-3","type":"conjunction","text":"porque (γάρ)","greek":"γάρ","strong":"G1063"},
        {"id":"lc210-4","type":"predicate","text":"anuncio-vos (εὐαγγελίζομαι ὑμῖν)","greek":"εὐαγγελίζομαι ὑμῖν","strong":"G2097","children":[
            {"id":"lc210-4a","type":"subject","text":"eu (ἐγώ)","greek":"ἐγώ","strong":"G1473"},
            {"id":"lc210-4b","type":"object","text":"boas novas de grande alegria (χαρὰν μεγάλην)","greek":"χαρὰν μεγάλην","strong":"G5479"}
        ]},
        {"id":"lc210-5","type":"modifier","text":"que serão para todo o povo (ἥτις ἔσται παντὶ τῷ λαῷ)","greek":"ἥτις ἔσται παντὶ τῷ λαῷ","strong":"G2992"}
    ],
    "explicacao": "εὐαγγελίζομαι = anuncio boas novas (origem do termo 'evangelho'). χαράν μεγάλην = alegria grande (objeto direto). ἥτις = que (relativo explicativo). Para todo o povo = universalidade.",
    "notas": ["εὐαγγελίζομαι = anunciar boas novas (verbo original do evangelho)","χαράν = alegria (acusativo singular)","ἥτις = relativo explicativo (que, a qual)","λαῷ = povo (Israel + gentios)"]
})

nt_batch_2.append({
    "ref": "Lc 6:27", "livro": "Lucas",
    "traducao": "Mas eu vos digo que ouvis: Amai os vossos inimigos, fazei bem aos que vos odeiam.",
    "grego": "ἀλλὰ ὑμῖν λέγω τοῖς ἀκούουσιν· ἀγαπᾶτε τοὺς ἐχθροὺς ὑμῶν, καλῶς ποιεῖτε τοῖς μισοῦσιν ὑμᾶς.",
    "diagrama": [
        {"id":"lc627-1","type":"conjunction","text":"mas (ἀλλά)","greek":"ἀλλά","strong":"G235"},
        {"id":"lc627-2","type":"predicate","text":"digo (λέγω)","greek":"λέγω","strong":"G3004","children":[
            {"id":"lc627-2a","type":"dative","text":"a vós (ὑμῖν)","greek":"ὑμῖν","strong":"G4771"},
            {"id":"lc627-2b","type":"modifier","text":"que ouvis (τοῖς ἀκούουσιν)","greek":"τοῖς ἀκούουσιν","strong":"G191"}
        ]},
        {"id":"lc627-3","type":"predicate","text":"amai (ἀγαπᾶτε)","greek":"ἀγαπᾶτε","strong":"G25","children":[
            {"id":"lc627-3a","type":"object","text":"os vossos inimigos (τοὺς ἐχθροὺς ὑμῶν)","greek":"τοὺς ἐχθροὺς ὑμῶν","strong":"G2190"}
        ]},
        {"id":"lc627-4","type":"predicate","text":"fazei bem (καλῶς ποιεῖτε)","greek":"καλῶς ποιεῖτε","strong":"G2564","children":[
            {"id":"lc627-4a","type":"dative","text":"aos que vos odeiam (τοῖς μισοῦσιν ὑμᾶς)","greek":"τοῖς μισοῦσιν ὑμᾶς","strong":"G3404"}
        ]}
    ],
    "explicacao": "Contraste radical: ἀλλά introduz a nova ética. ἀγαπᾶτε = imperativo presente (amem continuamente). O amor aos inimigos é marca distintiva do reino de Deus.",
    "notas": ["ἀγαπᾶτε = imperativo presente ativo de ἀγαπάω","ἐχθρούς = inimigos (hostis, adversários)","καλῶς ποιεῖτε = fazei bem (ação concreta)","μισοῦσιν = particípio presente de μισέω (odeiam)"]
})

nt_batch_2.append({
    "ref": "Lc 15:21", "livro": "Lucas",
    "traducao": "E o filho disse-lhe: Pai, eu pequei contra o céu e perante ti; já não sou digno de ser chamado teu filho.",
    "grego": "εἶπεν δὲ ὁ υἱὸς αὐτῷ· πάτερ, ἥμαρτον εἰς τὸν οὐρανὸν καὶ ἐνώπιόν σου, καὶ οὐκέτι εἰμὶ ἄξιος κληθῆναι υἱός σου.",
    "diagrama": [
        {"id":"lc1521-1","type":"predicate","text":"disse (εἶπεν)","greek":"εἶπεν","strong":"G2036","children":[
            {"id":"lc1521-1a","type":"subject","text":"o filho (ὁ υἱός)","greek":"ὁ υἱός","strong":"G5207"},
            {"id":"lc1521-1b","type":"dative","text":"a ele (αὐτῷ)","greek":"αὐτῷ","strong":"G846"}
        ]},
        {"id":"lc1521-2","type":"vocative","text":"Pai (πάτερ)","greek":"πάτερ","strong":"G3962"},
        {"id":"lc1521-3","type":"predicate","text":"eu pequei (ἥμαρτον)","greek":"ἥμαρτον","strong":"G264","children":[
            {"id":"lc1521-3a","type":"adverbial","text":"contra o céu (εἰς τὸν οὐρανόν)","greek":"εἰς τὸν οὐρανόν","strong":"G3772"},
            {"id":"lc1521-3b","type":"conjunction","text":"e (καί)","greek":"καί","strong":"G2532"},
            {"id":"lc1521-3c","type":"adverbial","text":"perante ti (ἐνώπιόν σου)","greek":"ἐνώπιόν σου","strong":"G1799"}
        ]},
        {"id":"lc1521-4","type":"predicate","text":"não sou (οὐκ εἰμί)","greek":"οὐκ εἰμί","strong":"G2076","children":[
            {"id":"lc1521-4a","type":"complement","text":"digno (ἄξιος)","greek":"ἄξιος","strong":"G514"},
            {"id":"lc1521-4b","type":"complement","text":"de ser chamado (κληθῆναι)","greek":"κληθῆναι","strong":"G2564"},
            {"id":"lc1521-4c","type":"complement","text":"teu filho (υἱός σου)","greek":"υἱός σου","strong":"G5207"}
        ]}
    ],
    "explicacao": "Confissão do filho pródigo. ἥμαρτον = aoristo (pequei, ponto único). εἰς τὸν οὐρανόν = contra Deus (hebraísmo). ἐνώπιόν σου = perante ti. οὐκέτι εἰμί = já não sou (perda de identidade).",
    "notas": ["ἥμαρτον = aoristo ativo de ἁμαρτάνω (pecar)","εἰς = contra (hebraísmo: חָטָא אֶל)","ἐνώπιόν = diante de, perante","κληθῆναι = infinitivo passivo de καλέω (ser chamado)"]
})

nt_batch_2.append({
    "ref": "Lc 23:34", "livro": "Lucas",
    "traducao": "E Jesus disse: Pai, perdoa-lhes, porque não sabem o que fazem.",
    "grego": "ὁ δὲ Ἰησοῦς ἔλεγεν· πάτερ, ἄφες αὐτοῖς, οὐ γὰρ οἴδασιν τί ποιοῦσιν.",
    "diagrama": [
        {"id":"lc2334-1","type":"predicate","text":"disse (ἔλεγεν)","greek":"ἔλεγεν","strong":"G3004","children":[
            {"id":"lc2334-1a","type":"subject","text":"Jesus (ὁ Ἰησοῦς)","greek":"ὁ Ἰησοῦς","strong":"G2424"}
        ]},
        {"id":"lc2334-2","type":"vocative","text":"Pai (πάτερ)","greek":"πάτερ","strong":"G3962"},
        {"id":"lc2334-3","type":"predicate","text":"perdoa (ἄφες)","greek":"ἄφες","strong":"G863","children":[
            {"id":"lc2334-3a","type":"dative","text":"lhes (αὐτοῖς)","greek":"αὐτοῖς","strong":"G846"}
        ]},
        {"id":"lc2334-4","type":"conjunction","text":"porque (γάρ)","greek":"γάρ","strong":"G1063"},
        {"id":"lc2334-5","type":"predicate","text":"não sabem (οὐ οἴδασιν)","greek":"οὐ οἴδασιν","strong":"G1492","children":[
            {"id":"lc2334-5a","type":"object","text":"o que fazem (τί ποιοῦσιν)","greek":"τί ποιοῦσιν","strong":"G4160"}
        ]}
    ],
    "explicacao": "ἄφες = imperativo aoristo de ἀφίημι (perdoa, solta). Pedido de intercessão no cruzamento. οὐ γάρ = porque não (ignorância como atenuante). Frase mais provavelmente original de Jo 19:11.",
    "notas": ["ἄφες = imperativo aoristo de ἀφίημι (perdoar, soltar)","οἴδασιν = perfeito indicativo de εἶδον (saber)","ποιοῦσιν = presente indicativo ativo de ποιέω","λόγος perdonante paralelo a Estêr 7:3"]
})

nt_batch_2.append({
    "ref": "Lc 24:34", "livro": "Lucas",
    "traducao": "Dizendo que o Senhor verdadeiramente ressuscitou, e foi visto por Simão.",
    "grego": "λέγοντες ὅτι ὄντως ἠγέρθη ὁ κύριος καὶ ὤφθη Σίμωνι.",
    "diagrama": [
        {"id":"lc2434-1","type":"predicate","text":"dizendo (λέγοντες)","greek":"λέγοντες","strong":"G3004","children":[
            {"id":"lc2434-1a","type":"object","text":"que (ὅτι)","greek":"ὅτι","strong":"G3754"}
        ]},
        {"id":"lc2434-2","type":"adverbial","text":"verdadeiramente (ὄντως)","greek":"ὄντως","strong":"G3689"},
        {"id":"lc2434-3","type":"predicate","text":"ressuscitou (ἠγέρθη)","greek":"ἠγέρθη","strong":"G1453","children":[
            {"id":"lc2434-3a","type":"subject","text":"o Senhor (ὁ κύριος)","greek":"ὁ κύριος","strong":"G2962"}
        ]},
        {"id":"lc2434-4","type":"conjunction","text":"e (καί)","greek":"καί","strong":"G2532"},
        {"id":"lc2434-5","type":"predicate","text":"foi visto (ὤφθη)","greek":"ὤφθη","strong":"G3708","children":[
            {"id":"lc2434-5a","type":"dative","text":"a Simão (Σίμωνι)","greek":"Σίμωνι","strong":"G4613"}
        ]}
    ],
    "explicacao": "ὄντως = verdadeiramente (confirmação da ressurreição). ἠγέρθη = aoristo passivo (foi ressuscitado = Deus agiu). ὤφθη = aoristo passivo (foi visto, apareceu). Testemunhoocular.",
    "notas": ["ὄντως = realmente, verdadeiramente","ἠγέρθη = aoristo passivo de ἐγείρω (ressuscitar)","ὤφθη = aoristo passivo de ὁράω (aparecer, ser visto)","Σίμωνι = dativo de Simão Pedro"]
})
