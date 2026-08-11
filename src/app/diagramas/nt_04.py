# -*- coding: utf-8 -*-
# NT batch 4: Atos + Romanos (12 diagrams)

nt_batch_4 = []

nt_batch_4.append({
    "ref": "At 1:8", "livro": "Atos",
    "traducao": "Mas recebereis poder, quando o Espírito Santo vier sobre vós, e sereis minhas testemunhas em Jerusalém, e em toda a Judeia, e na Samaria, e até os confins da terra.",
    "grego": "ἀλλὰ λήμψεσθε δύναμιν ἐπελθόντος τοῦ ἁγίου πνεύματος ἐφ᾽ ὑμᾶς, καὶ ἔσεσθέ μου μάρτυρες ἔν τε Ἰερουσαλὴμ καὶ ἐν πάσῃ τῇ Ἰουδαίᾳ καὶ Σαμαρείᾳ καὶ ἕως ἐσχάτου τῆς γῆς.",
    "diagrama": [
        {"id":"at18-1","type":"conjunction","text":"mas (ἀλλά)","greek":"ἀλλά","strong":"G235"},
        {"id":"at18-2","type":"predicate","text":"recebereis (λήμψεσθε)","greek":"λήμψεσθε","strong":"G2983","children":[
            {"id":"at18-2a","type":"object","text":"poder (δύναμιν)","greek":"δύναμιν","strong":"G1411"}
        ]},
        {"id":"at18-3","type":"adverbial","text":"quando vier (ἐπελθόντος)","greek":"ἐπελθόντος","strong":"G1904","children":[
            {"id":"at18-3a","type":"subject","text":"o Espírito Santo (τοῦ ἁγίου πνεύματος)","greek":"τοῦ ἁγίου πνεύματος","strong":"G4151"},
            {"id":"at18-3b","type":"adverbial","text":"sobre vós (ἐφ᾽ ὑμᾶς)","greek":"ἐφ᾽ ὑμᾶς","strong":"G1909"}
        ]},
        {"id":"at18-4","type":"predicate","text":"sereis (ἔσεσθέ)","greek":"ἔσεσθέ","strong":"G1510","children":[
            {"id":"at18-4a","type":"complement","text":"minhas testemunhas (μου μάρτυρες)","greek":"μου μάρτυρες","strong":"G3144"}
        ]},
        {"id":"at18-5","type":"adverbial","text":"em Jerusalém (ἔν τε Ἰερουσαλήμ)","greek":"ἔν τε Ἰερουσαλήμ","strong":"G2419","children":[
            {"id":"at18-5a","type":"conjunction","text":"e (τε)","greek":"τε","strong":"G5037"},
            {"id":"at18-5b","type":"adverbial","text":"e na Judeia (καὶ ἐν πάσῃ τῇ Ἰουδαίᾳ)","greek":"καὶ ἐν πάσῃ τῇ Ἰουδαίᾳ","strong":"G2449"},
            {"id":"at18-5c","type":"adverbial","text":"e na Samaria (καὶ Σαμαρείᾳ)","greek":"καὶ Σαμαρείᾳ","strong":"G4540"},
            {"id":"at18-5d","type":"adverbial","text":"até os confins (ἕως ἐσχάτου)","greek":"ἕως ἐσχάτου","strong":"G206"}
        ]}
    ],
    "explicacao": "Última promessa de Jesus antes da ascensão. λήμψεσθε = futuro médio (recebereis como dom). ἐπελθόντος = genitivo absoluto (quando vier). Progressão geográfica: Jerusalém → Judeia → Samaria → terra. Missão universal.",
    "notas": ["λήμψεσθε = futuro médio de λαμβάνω (receber)","δύναμιν = poder, força (dona espiritual)","μάρτυρες = testemunhas (martírio)","ἕως ἐσχάτου = até o último lugar"]
})

nt_batch_4.append({
    "ref": "At 2:38", "livro": "Atos",
    "traducao": "Pedro disse-lhes: Arrependei-vos, e cada um de vós seja baptizado em nome de Jesus Cristo, para o perdão dos vossos pecados; e recebereis o dom do Espírito Santo.",
    "grego": "εἶπεν δὲ αὐτοῖς· μετανοήσατε καὶ βαπτισθήτω ἕκαστος ὑμῶν ἐπὶ τῷ ὀνόματι Ἰησοῦ Χριστοῦ εἰς ἄφεσιν τῶν ἁμαρτιῶν ὑμῶν, καὶ λήμψεσθε τὴν δωρεὰν τοῦ ἁγίου πνεύματος.",
    "diagrama": [
        {"id":"at238-1","type":"predicate","text":"disse (εἶπεν)","greek":"εἶπεν","strong":"G2036","children":[
            {"id":"at238-1a","type":"subject","text":"Pedro (Πέτρος)","greek":"Πέτρος","strong":"G4074"},
            {"id":"at238-1b","type":"dative","text":"a eles (αὐτοῖς)","greek":"αὐτοῖς","strong":"G846"}
        ]},
        {"id":"at238-2","type":"predicate","text":"Arrependei-vos (μετανοήσατε)","greek":"μετανοήσατε","strong":"G3340"},
        {"id":"at238-3","type":"conjunction","text":"e (καί)","greek":"καί","strong":"G2532"},
        {"id":"at238-4","type":"predicate","text":"seja baptizado (βαπτισθήτω)","greek":"βαπτισθήτω","strong":"G907","children":[
            {"id":"at238-4a","type":"subject","text":"cada um (ἕκαστος)","greek":"ἕκαστος","strong":"G1538"},
            {"id":"at238-4b","type":"adverbial","text":"em nome de Jesus (ἐπὶ τῷ ὀνόματι Ἰησοῦ)","greek":"ἐπὶ τῷ ὀνόματι Ἰησοῦ","strong":"G3686"},
            {"id":"at238-4c","type":"complement","text":"para o perdão (εἰς ἄφεσιν)","greek":"εἰς ἄφεσιν","strong":"G859"}
        ]},
        {"id":"at238-5","type":"conjunction","text":"e (καί)","greek":"καί","strong":"G2532"},
        {"id":"at238-6","type":"predicate","text":"recebereis (λήμψεσθε)","greek":"λήμψεσθε","strong":"G2983","children":[
            {"id":"at238-6a","type":"object","text":"o dom do Espírito Santo (τὴν δωρεὰν τοῦ ἁγίου πνεύματος)","greek":"τὴν δωρεὰν τοῦ ἁγίου πνεύματος","strong":"G1432"}
        ]}
    ],
    "explicacao": "Três imperativos: μετανοήσατε (arrependei-vos), βαπτισθήτω (seja baptizado), λήμψεσθε (recebereis). Ordem: arrependimento → batismo → dom do Espírito. εἰς ἄφεσιν = para o perdão (finalidade).",
    "notas": ["μετανοήσατε = aoristo imperativo de μετανοέω (arrepender-se)","βαπτισθήτω = aoristo passivo imperativo de βαπτίζω","δωρεάν = dom, dádiva","ἄφεσιν = perdão, remissão"]
})

nt_batch_4.append({
    "ref": "Rm 1:16", "livro": "Romanos",
    "traducao": "Porque eu não me envergonho do evangelho, porque é o poder de Deus para a salvação de todo aquele que crê, primeiro do judeu, e também do grego.",
    "grego": "οὐ γὰρ ἐπαισχύνομαι τὸ εὐαγγέλιον, δύναμιν γὰρ θεοῦ ἐστιν εἰς σωτηρίαν παντὶ τῷ πιστεύοντι, Ἰουδαίῳ τε πρῶτον καὶ Ἕλληνι.",
    "diagrama": [
        {"id":"rm116-1","type":"conjunction","text":"porque (γάρ)","greek":"γάρ","strong":"G1063"},
        {"id":"rm116-2","type":"predicate","text":"não me envergonho (οὐ ἐπαισχύνομαι)","greek":"οὐ ἐπαισχύνομαι","strong":"G1870","children":[
            {"id":"rm116-2a","type":"object","text":"do evangelho (τὸ εὐαγγέλιον)","greek":"τὸ εὐαγγέλιον","strong":"G2098"}
        ]},
        {"id":"rm116-3","type":"conjunction","text":"porque (γάρ)","greek":"γάρ","strong":"G1063"},
        {"id":"rm116-4","type":"predicate","text":"é (ἐστιν)","greek":"ἐστιν","strong":"G2076","children":[
            {"id":"rm116-4a","type":"complement","text":"o poder de Deus (δύναμιν θεοῦ)","greek":"δύναμιν θεοῦ","strong":"G1411"},
            {"id":"rm116-4b","type":"complement","text":"para a salvação (εἰς σωτηρίαν)","greek":"εἰς σωτηρίαν","strong":"G4991"},
            {"id":"rm116-4c","type":"dative","text":"a todo o que crê (παντὶ τῷ πιστεύοντι)","greek":"παντὶ τῷ πιστεύοντι","strong":"G4100"}
        ]},
        {"id":"rm116-5","type":"adverbial","text":"primeiro do judeu (Ἰουδαίῳ τε πρῶτον)","greek":"Ἰουδαίῳ τε πρῶτον","strong":"G2453","children":[
            {"id":"rm116-5a","type":"conjunction","text":"e também (τε)","greek":"τε","strong":"G5037"},
            {"id":"rm116-5b","type":"adverbial","text":"do grego (καὶ Ἕλληνι)","greek":"καὶ Ἕλληνι","strong":"G1672"}
        ]}
    ],
    "explicacao": "Tese de Romanos: não me envergonho (presente medio, posição firme). τὸ εὐαγγέλιον = a boa-nova. δύναμιν θεοῦ = poder de Deus (não sabedoria humana). εἰς σωτηρίαν = para salvação (finalidade). Universalidade: judeu + grego.",
    "notas": ["ἐπαισχύνομαι = envergonhar-se (presente)","εὐαγγέλιον = evangelho, boa-nova","δύναμιν = poder, força","σωτηρίαν = salvação, libertação"]
})

nt_batch_4.append({
    "ref": "Rm 3:23", "livro": "Romanos",
    "traducao": "Porque todos pecaram e estão destituídos da glória de Deus.",
    "grego": "πάντες γὰρ ἥμαρτον καὶ ὑστεροῦνται τῆς δόξης τοῦ θεοῦ.",
    "diagrama": [
        {"id":"rm323-1","type":"conjunction","text":"porque (γάρ)","greek":"γάρ","strong":"G1063"},
        {"id":"rm323-2","type":"subject","text":"todos (πάντες)","greek":"πάντες","strong":"G3956"},
        {"id":"rm323-3","type":"predicate","text":"pecaram (ἥμαρτον)","greek":"ἥμαρτον","strong":"G264"},
        {"id":"rm323-4","type":"conjunction","text":"e (καί)","greek":"καί","strong":"G2532"},
        {"id":"rm323-5","type":"predicate","text":"estão destituídos (ὑστεροῦνται)","greek":"ὑστεροῦνται","strong":"G5302","children":[
            {"id":"rm323-5a","type":"genitive","text":"da glória de Deus (τῆς δόξης τοῦ θεοῦ)","greek":"τῆς δόξης τοῦ θεοῦ","strong":"G1391"}
        ]}
    ],
    "explicacao": "Universalidade do pecado: πάντες = todos (sem exceção). ἥμαρτον = aoristo (pecaram, ponto único na história). ὑστεροῦντai = presente médio (carecem, estão faltos de). A glória de Deus perdida.",
    "notas": ["ἥμαρτον = aoristo ativo de ἁμαρτάνω (pecar)","ὑστεροῦνται = presente de ὑστερέω (faltar, carecer)","δόξης = glória (esplendor, honra divina)","πάντes = todos (universalidade)"]
})

nt_batch_4.append({
    "ref": "Rm 5:8", "livro": "Romanos",
    "traducao": "Mas Deus prova o seu amor para connosco, em que Cristo morreu por nós sendo ainda pecadores.",
    "grego": "συνίστησιν δὲ τὴν ἀγάπην αὐτοῦ εἰς ἡμᾶς ὁ θεὸς ὅτι ἔτι ἁμαρτωλῶν ὄντων ἡμῶν Χριστὸς ὑπὲρ ἡμῶν ἀπέθανεν.",
    "diagrama": [
        {"id":"rm58-1","type":"conjunction","text":"mas (δέ)","greek":"δέ","strong":"G1161"},
        {"id":"rm58-2","type":"subject","text":"Deus (ὁ θεός)","greek":"ὁ θεός","strong":"G2316"},
        {"id":"rm58-3","type":"predicate","text":" prova (συνίστησιν)","greek":"συνίστησιν","strong":"G4921","children":[
            {"id":"rm58-3a","type":"object","text":"o seu amor (τὴν ἀγάπην αὐτοῦ)","greek":"τὴν ἀγάπην αὐτοῦ","strong":"G26"},
            {"id":"rm58-3b","type":"dative","text":"para connosco (εἰς ἡμᾶς)","greek":"εἰς ἡμᾶς","strong":"G1519"}
        ]},
        {"id":"rm58-4","type":"conjunction","text":"porque (ὅτι)","greek":"ὅτι","strong":"G3754"},
        {"id":"rm58-5","type":"adverbial","text":"sendo ainda pecadores (ἔτι ἁμαρτωλῶν ὄντων ἡμῶν)","greek":"ἔτι ἁμαρτωλῶν ὄντων ἡμῶν","strong":"G268"},
        {"id":"rm58-6","type":"subject","text":"Cristo (Χριστός)","greek":"Χριστός","strong":"G5547"},
        {"id":"rm58-7","type":"predicate","text":"morreu (ἀπέθανεν)","greek":"ἀπέθανεν","strong":"G599","children":[
            {"id":"rm58-7a","type":"adverbial","text":"por nós (ὑπὲρ ἡμῶν)","greek":"ὑπὲρ ἡμῶν","strong":"G5228"}
        ]}
    ],
    "explicacao": "Prova do amor: συνίστησιν = demonstra, prova (presente). ἁμαρτωλῶν ὄντων = genitivo absoluto (sendo pecadores). ὑπέρ ἡμῶν = por nós (em nosso favor). O amor divino é anterior ao arrependimento humano.",
    "notas": ["συνίστησιν = demonstra, comprova","ἀγάπην = amor (sacrificial)","ἁμαρτωλῶν ὄντων = sendo pecadores (genitivo absoluto)","ἀπέθανεν = aoristo de ἀποθνῄσκω (morreu)"]
})

nt_batch_4.append({
    "ref": "Rm 6:23", "livro": "Romanos",
    "traducao": "Porque o salário do pecado é a morte, mas o dom gratuito de Deus é a vida eterna em Cristo Jesus, nosso Senhor.",
    "grego": "τὰ γὰρ ὀψώνια τῆς ἁμαρτίας θάνατος, τὸ δὲ χάρισμα τοῦ θεοῦ ζωὴ αἰώνιος ἐν Χριστῷ Ἰησοῦ τῷ κυρίῳ ἡμῶν.",
    "diagrama": [
        {"id":"rm623-1","type":"conjunction","text":"porque (γάρ)","greek":"γάρ","strong":"G1063"},
        {"id":"rm623-2","type":"subject","text":"o salário do pecado (τὰ ὀψώνια τῆς ἁμαρτίας)","greek":"τὰ ὀψώνια τῆς ἁμαρτίας","strong":"G3800","children":[
            {"id":"rm623-2a","type":"modifier","text":"do pecado (τῆς ἁμαρτίας)","greek":"τῆς ἁμαρτίας","strong":"G266"}
        ]},
        {"id":"rm623-3","type":"predicate","text":"é (ἐστίν)","greek":"ἐστίν","strong":"G2076","children":[
            {"id":"rm623-3a","type":"complement","text":"a morte (θάνατος)","greek":"θάνατος","strong":"G2288"}
        ]},
        {"id":"rm623-4","type":"conjunction","text":"mas (δέ)","greek":"δέ","strong":"G1161"},
        {"id":"rm623-5","type":"subject","text":"o dom gratuito de Deus (τὸ χάρισμα τοῦ θεοῦ)","greek":"τὸ χάρισμα τοῦ θεοῦ","strong":"G5486"},
        {"id":"rm623-6","type":"predicate","text":"é (ἐστίν)","greek":"ἐστίν","strong":"G2076","children":[
            {"id":"rm623-6a","type":"complement","text":"a vida eterna (ζωὴ αἰώνιος)","greek":"ζωὴ αἰώνιος","strong":"G2222"},
            {"id":"rm623-6b","type":"adverbial","text":"em Cristo Jesus (ἐν Χριστῷ Ἰησοῦ)","greek":"ἐν Χριστῷ Ἰησοῦ","strong":"G5547"}
        ]}
    ],
    "explicacao": "Contraste antitético: ὀψώνια (salário, merecimento) vs χάρισμa (dom gratuito, sem merecimento). θάνατος = morte (consequência do pecado). ζωὴ αἰώνιος = vida eterna (presente de Deus). A graça supera o merecimento.",
    "notas": ["ὀψώνια = salário, remuneração (militar)","χάρισμα = dom, dádiva (graça)","θάνατος = morte (física + espiritual)","ζωὴ αἰώνιος = vida eterna"]
})

nt_batch_4.append({
    "ref": "Rm 8:1", "livro": "Romanos",
    "traducao": "Portanto, agora nenhuma condenação há para os que estão em Cristo Jesus.",
    "grego": "οὐδὲν ἄρα νῦν κατάκριμα τοῖς ἐν Χριστῷ Ἰησοῦ.",
    "diagrama": [
        {"id":"rm81-1","type":"subject","text":"nenhuma condenação (οὐδὲν κατάκριμα)","greek":"οὐδὲν κατάκριμα","strong":"G2631"},
        {"id":"rm81-2","type":"adverbial","text":"portanto (ἄρα)","greek":"ἄρα","strong":"G686"},
        {"id":"rm81-3","type":"adverbial","text":"agora (νῦν)","greek":"νῦν","strong":"G3568"},
        {"id":"rm81-4","type":"dative","text":"para os que estão (τοῖς ὄντων)","greek":"τοῖς ὄντων","strong":"G1510","children":[
            {"id":"rm81-4a","type":"adverbial","text":"em Cristo Jesus (ἐν Χριστῷ Ἰησοῦ)","greek":"ἐν Χριστῷ Ἰησοῦ","strong":"G5547"}
        ]}
    ],
    "explicacao": "οὐδέν = nada, nenhuma (negação absoluta). κατάκριμa = condenação (veredicto judicial). ἄρα = portanto (conclusão). νῦν = agora (ponto no tempo). ἐν Χριστῷ Ἰησοῦ = posição em Cristo (união com Cristo).",
    "notas": ["κατάκριμα = condenação (veredicto)","ἐν Χριστῷ = em Cristo (união mística)","ἄρα = portanto, então","νῦν = agora (transformação temporal)"]
})

nt_batch_4.append({
    "ref": "Rm 8:28", "livro": "Romanos",
    "traducao": "E sabemos que todas as coisas contribuem juntamente para o bem daqueles que amam a Deus, daqueles que são chamados segundo o seu propósito.",
    "grego": "οἴδαμεν δὲ ὅτι τοῖς ἀγαπῶσιν τὸν θεὸν πάντα συνεργεῖ εἰς ἀγαθόν, τοῖς κατὰ πρόθεσιν κλητοῖς οὖσιν.",
    "diagrama": [
        {"id":"rm828-1","type":"conjunction","text":"mas (δέ)","greek":"δέ","strong":"G1161"},
        {"id":"rm828-2","type":"predicate","text":"sabemos (οἴδαμεν)","greek":"οἴδαμεν","strong":"G1492","children":[
            {"id":"rm828-2a","type":"object","text":"que (ὅτι)","greek":"ὅτι","strong":"G3754"}
        ]},
        {"id":"rm828-3","type":"dative","text":"para os que amam (τοῖς ἀγαπῶσιν)","greek":"τοῖς ἀγαπῶσιν","strong":"G25","children":[
            {"id":"rm828-3a","type":"object","text":"a Deus (τὸν θεόν)","greek":"τὸν θεόν","strong":"G2316"}
        ]},
        {"id":"rm828-4","type":"subject","text":"todas as coisas (πάντα)","greek":"πάντα","strong":"G3956"},
        {"id":"rm828-5","type":"predicate","text":"contribuem (συνεργεῖ)","greek":"συνεργεῖ","strong":"G4903","children":[
            {"id":"rm828-5a","type":"complement","text":"para o bem (εἰς ἀγαθόν)","greek":"εἰς ἀγαθόν","strong":"G18"}
        ]},
        {"id":"rm828-6","type":"dative","text":"chamados segundo (κλητοῖς κατά)","greek":"κλητοῖς κατά","strong":"G2822","children":[
            {"id":"rm828-6a","type":"object","text":"o seu propósito (πρόθεσιν)","greek":"πρόθεσιν","strong":"G4286"}
        ]}
    ],
    "explicacao": "οἴδαμεν = sabemos (certeza). συνεργεῖ = coopera, trabalha junto (tudo cooperá). εἰς ἀγαθόν = para o bem (propósito divino). κατὰ πρόθεσιν = segundo o propósito (plano eterno de Deus).",
    "notas": ["οἴδαμεν = perfeito indicativo de εἶδον (saber)","συνεργεῖ = coopera (σύν + ἔργον)","κλητοῖς = chamados (particípio)","πρόθεσιν = propósito, plano"]
})

nt_batch_4.append({
    "ref": "Rm 8:31", "livro": "Romanos",
    "traducao": "Que diremos, pois, a estas coisas? Se Deus é por nós, quem será contra nós?",
    "grego": "τί οὖν ἐροῦμεν πρὸς ταῦτα; εἰ ὁ θεὸς ὑπὲρ ἡμῶν, τίς καθ᾽ ἡμῶν;",
    "diagrama": [
        {"id":"rm831-1","type":"object","text":"que (τί)","greek":"τί","strong":"G5101"},
        {"id":"rm831-2","type":"adverbial","text":"pois (οὖν)","greek":"οὖν","strong":"G3767"},
        {"id":"rm831-3","type":"predicate","text":"diremos (ἐροῦμεν)","greek":"ἐροῦμεν","strong":"G2046","children":[
            {"id":"rm831-3a","type":"adverbial","text":"a estas coisas (πρὸς ταῦτα)","greek":"πρὸς ταῦτα","strong":"G4314"}
        ]},
        {"id":"rm831-4","type":"conjunction","text":"se (εἰ)","greek":"εἰ","strong":"G1487"},
        {"id":"rm831-5","type":"subject","text":"Deus (ὁ θεός)","greek":"ὁ θεός","strong":"G2316"},
        {"id":"rm831-6","type":"predicate","text":"é por nós (ὑπὲρ ἡμῶν)","greek":"ὑπὲρ ἡμῶν","strong":"G5228"},
        {"id":"rm831-7","type":"object","text":"quem (τίς)","greek":"τίς","strong":"G5101"},
        {"id":"rm831-8","type":"predicate","text":"será contra nós (καθ᾽ ἡμῶν)","greek":"καθ᾽ ἡμῶν","strong":"G2596"}
    ],
    "explicacao": "Pergunta retórica: τί = o quê? A resposta é óbvia — ninguém pode contra nós. εἰ = se (condicional real). ὑπέρ ἡμῶν = por nós (a nosso favor). καθ᾽ ἡμῶν = contra nós. Triunfo cristológico.",
    "notas": ["ἐροῦμεν = futuro ativo de λέγω","ὑπὲρ ἡμῶν = por nós, a nosso favor","καθ᾽ ἡμῶν = contra nós","Pergunta retórica = resposta óbvia"]
})

nt_batch_4.append({
    "ref": "Rm 8:37", "livro": "Romanos",
    "traducao": "Mas em todas estas coisas somos mais que vencedores, por aquele que nos amou.",
    "grego": "ἀλλ᾽ ἐν τούτοις πᾶσιν ὑπερνικῶμεν διὰ τοῦ ἀγαπήσαντος ἡμᾶς.",
    "diagrama": [
        {"id":"rm837-1","type":"conjunction","text":"mas (ἀλλ᾽)","greek":"ἀλλ᾽","strong":"G235"},
        {"id":"rm837-2","type":"adverbial","text":"em todas estas coisas (ἐν τούτοις πᾶσιν)","greek":"ἐν τούτοις πᾶσιν","strong":"G1722"},
        {"id":"rm837-3","type":"predicate","text":"somos mais que vencedores (ὑπερνικῶμεν)","greek":"ὑπερνικῶμεν","strong":"G5248"},
        {"id":"rm837-4","type":"adverbial","text":"por aquele que nos amou (διὰ τοῦ ἀγαπήσαντος ἡμᾶς)","greek":"διὰ τοῦ ἀγαπήσαντος ἡμᾶς","strong":"G25"}
    ],
    "explicacao": "ὑπερνικῶμεν = mais que vencedores (ὑπέρ + νικάω = super-vencer). Não apenas vencemos, mas superamos abundantemente. διὰ τοῦ ἀγαπήσαντος = por amor do que nos amou (aoristo participial, amor aoristo na cruz).",
    "notas": ["ὑπερνικῶμεν = superamos, vencemos abundantemente","ἀγαπήσαντος = aoristo participial de ἀγαπάω","διά + genitivo = por causa de","Vitória baseada no amor de Cristo, não em nós"]
})

nt_batch_4.append({
    "ref": "Rm 8:38-39", "livro": "Romanos",
    "traducao": "Porque estou certo de que, nem a morte, nem a vida, nem os anjos, nem os principados, nem as potestades, nem o presente, nem o porvir, nem a altura, nem a profundidade, nem alguma outra criatura nos poderá separar do amor de Deus, que está em Cristo Jesus nosso Senhor.",
    "grego": "πέπεισμαι γὰρ ὅτι οὔτε θάνατος οὔτε ζωὴ οὔτε ἄγγελοι οὔτε ἀρχαὶ οὔτε δυνάμεις οὔτε ἐνεστῶτα οὔτε μέλλοντα οὔτε ὑψώματα οὔτε βάθος οὔτε τις ἑτέρα κτίσις δυνήσεται ἡμᾶς χωρίσαι ἀπὸ τῆς ἀγάπης τοῦ θεοῦ τῆς ἐν Χριστῷ Ἰησοῦ τῷ κυρίῳ ἡμῶν.",
    "diagrama": [
        {"id":"rm838-1","type":"predicate","text":"estou certo (πέπεισμαι)","greek":"πέπεισμαι","strong":"G3982","children":[
            {"id":"rm838-1a","type":"conjunction","text":"porque (γάρ)","greek":"γάρ","strong":"G1063"},
            {"id":"rm838-1b","type":"object","text":"que (ὅτι)","greek":"ὅτι","strong":"G3754"}
        ]},
        {"id":"rm838-2","type":"subject","text":"nem (οὔτε)","greek":"οὔτε","strong":"G3777","children":[
            {"id":"rm838-2a","type":"modifier","text":"a morte (θάνατος)","greek":"θάνατος","strong":"G2288"},
            {"id":"rm838-2b","type":"modifier","text":"nem a vida (οὔτε ζωή)","greek":"οὔτε ζωή","strong":"G2222"},
            {"id":"rm838-2c","type":"modifier","text":"nem os anjos (οὔτε ἄγγελοι)","greek":"οὔτε ἄγγελοι","strong":"G32"},
            {"id":"rm838-2d","type":"modifier","text":"nem os principados (οὔτε ἀρχαί)","greek":"οὔτε ἀρχαί","strong":"G746"},
            {"id":"rm838-2e","type":"modifier","text":"nem as potestades (οὔτε δυνάμεις)","greek":"οὔτε δυνάμεις","strong":"G1411"},
            {"id":"rm838-2f","type":"modifier","text":"nem o presente (οὔτε ἐνεστῶτα)","greek":"οὔτε ἐνεστῶτα","strong":"G1764"},
            {"id":"rm838-2g","type":"modifier","text":"nem o porvir (οὔτε μέλλοντα)","greek":"οὔτε μέλλοντα","strong":"G3195"},
            {"id":"rm838-2h","type":"modifier","text":"nem a altura (οὔτε ὑψώματα)","greek":"οὔτε ὑψώματα","strong":"G5311"},
            {"id":"rm838-2i","type":"modifier","text":"nem a profundidade (οὔτε βάθος)","greek":"οὔτε βάθος","strong":"G899"},
            {"id":"rm838-2j","type":"modifier","text":"nem outra criatura (οὔτε τις ἑτέρα κτίσις)","greek":"οὔτε τις ἑτέρα κτίσις","strong":"G2937"}
        ]},
        {"id":"rm838-3","type":"predicate","text":"poderá separar (δυνήσεται χωρίσαι)","greek":"δυνήσεται χωρίσαι","strong":"G1410","children":[
            {"id":"rm838-3a","type":"object","text":"nos (ἡμᾶς)","greek":"ἡμᾶς","strong":"G2249"},
            {"id":"rm838-3b","type":"adverbial","text":"do amor de Deus (ἀπὸ τῆς ἀγάπης τοῦ θεοῦ)","greek":"ἀπὸ τῆς ἀγάπης τοῦ θεοῦ","strong":"G26"}
        ]}
    ],
    "explicacao": "πέπεισμαι = perfeito passivo (estou convencido, certeza absoluta). Nove pares οὔτε... οὔτε = nem... nem (exaustivo). δυνήσεται = futuro médio (poderá). χωρίσαι = infinitivo aoristo (separar). Nada pode separar do amor de Deus.",
    "notas": ["πέπεισμαι = perfeito passivo de πείθω (convencer)","οὔτε = nem (negação dupla)","χωρίσαι = separar (χωρίς = sem)","κτίσις = criatura"]
})

nt_batch_4.append({
    "ref": "Rm 10:9", "livro": "Romanos",
    "traducao": "Se, pois, confessares com a tua boca o Senhor Jesus, e crer em teu coração que Deus o ressuscitou dentre os mortos, serás salvo.",
    "grego": "ἐὰν ὁμολογήσῃς ἐν τῷ στόματί σου κύριον Ἰησοῦν καὶ πιστεύσῃς ἐν τῇ καρδίᾳ σου ὅτι ὁ θεὸς αὐτὸν ἤγειρεν ἐκ νεκρῶν, σωθήσῃ.",
    "diagrama": [
        {"id":"rm109-1","type":"conjunction","text":"se (ἐάν)","greek":"ἐάν","strong":"G1437"},
        {"id":"rm109-2","type":"predicate","text":"confessares (ὁμολογήσῃς)","greek":"ὁμολογήσῃς","strong":"G3670","children":[
            {"id":"rm109-2a","type":"adverbial","text":"com a tua boca (ἐν τῷ στόματί σου)","greek":"ἐν τῷ στόματί σου","strong":"G4750"},
            {"id":"rm109-2b","type":"object","text":"o Senhor Jesus (κύριον Ἰησοῦν)","greek":"κύριον Ἰησοῦν","strong":"G2962"}
        ]},
        {"id":"rm109-3","type":"conjunction","text":"e (καί)","greek":"καί","strong":"G2532"},
        {"id":"rm109-4","type":"predicate","text":"creres (πιστεύσῃς)","greek":"πιστεύσῃς","strong":"G4100","children":[
            {"id":"rm109-4a","type":"adverbial","text":"em teu coração (ἐν τῇ καρδίᾳ σου)","greek":"ἐν τῇ καρδίᾳ σου","strong":"G2588"},
            {"id":"rm109-4b","type":"object","text":"que (ὅτι)","greek":"ὅτι","strong":"G3754"}
        ]},
        {"id":"rm109-5","type":"predicate","text":"Deus ressuscitou (ὁ θεὸς ἤγειρεν)","greek":"ὁ θεὸς ἤγειρεν","strong":"G1453","children":[
            {"id":"rm109-5a","type":"subject","text":"Deus (ὁ θεός)","greek":"ὁ θεός","strong":"G2316"},
            {"id":"rm109-5b","type":"object","text":"ele (αὐτόν)","greek":"αὐτόν","strong":"G846"},
            {"id":"rm109-5c","type":"adverbial","text":"dentre os mortos (ἐκ νεκρῶν)","greek":"ἐκ νεκρῶν","strong":"G3498"}
        ]},
        {"id":"rm109-6","type":"predicate","text":"serás salvo (σωθήσῃ)","greek":"σωθήσῃ","strong":"G4982"}
    ],
    "explicacao": "Duas condições: (1) confessar (ὁμολογήσῃς = boca) + (2) crer (πιστεύσῃς = coração). στόμα + καρδία = confissão completa. ἤγειρεν = aoristo (ressuscitou, evento histórico). σωθήσῃ = futuro passivo (serás salvo = Deus salva).",
    "notas": ["ὁμολογήσῃς = confessar, declarar publicamente","πιστεύσῃς = crer, confiar","ἤγειρεν = aoristo de ἐγείρω (ressuscitar)","σωθήσῃ = futuro passivo de σῴζω (ser salvo)"]
})
