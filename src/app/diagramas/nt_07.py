# -*- coding: utf-8 -*-
# NT batch 7: Final 3 diagrams to reach 100 total

nt_batch_7 = []

nt_batch_7.append({
    "ref": "Mt 6:24", "livro": "Mateus",
    "traducao": "Ninguém pode servir a dois senhores; porque ou há de odiar um e amar o outro, ou há de se apegar a um e desprezar o outro. Não podeis servir a Deus e ao dinheiro.",
    "grego": "οὐδεὶς δύναται δυσὶ κυρίοις δουλεύειν· ἢ γὰρ τὸν ἕνα μισήσει καὶ τὸν ἕτερον ἀγαπήσει, ἢ ἑνὸς ἀνθέξεται καὶ τοῦ ἑτέρου καταφρονήσετε. οὐ δύνασθε θεῷ δουλεύειν καὶ μαμωνᾷ.",
    "diagrama": [
        {"id":"mt624-1","type":"subject","text":"ninguém (οὐδείς)","greek":"οὐδείς","strong":"G3762"},
        {"id":"mt624-2","type":"predicate","text":"pode (δύναται)","greek":"δύναται","strong":"G1410","children":[
            {"id":"mt624-2a","type":"complement","text":"servir (δουλεύειν)","greek":"δουλεύειν","strong":"G1398","children":[
                {"id":"mt624-2a1","type":"dative","text":"a dois senhores (δυσὶ κυρίοις)","greek":"δυσὶ κυρίοις","strong":"G2962"}
            ]}
        ]},
        {"id":"mt624-3","type":"conjunction","text":"porque (γάρ)","greek":"γάρ","strong":"G1063"},
        {"id":"mt624-4","type":"predicate","text":"odiará (μισήσει)","greek":"μισήσει","strong":"G3404","children":[
            {"id":"mt624-4a","type":"object","text":"um (τὸν ἕνα)","greek":"τὸν ἕνα","strong":"G1520"},
            {"id":"mt624-4b","type":"conjunction","text":"e amará (καὶ ἀγαπήσει)","greek":"καὶ ἀγαπήσει","strong":"G25","children":[
                {"id":"mt624-4b1","type":"object","text":"o outro (τὸν ἕτερον)","greek":"τὸν ἕτερον","strong":"G2087"}
            ]}
        ]},
        {"id":"mt624-5","type":"conjunction","text":"ou (ἤ)","greek":"ἤ","strong":"G2228"},
        {"id":"mt624-6","type":"predicate","text":"se apegará (ἀνθέξεται)","greek":"ἀνθέξεται","strong":"G472","children":[
            {"id":"mt624-6a","type":"genitive","text":"de um (ἑνός)","greek":"ἑνός","strong":"G1520"},
            {"id":"mt624-6b","type":"conjunction","text":"e desprezará (καὶ καταφρονήσεται)","greek":"καὶ καταφρονήσεται","strong":"G2706","children":[
                {"id":"mt624-6b1","type":"genitive","text":"do outro (τοῦ ἑτέρου)","greek":"τοῦ ἑτέρου","strong":"G2087"}
            ]}
        ]},
        {"id":"mt624-7","type":"predicate","text":"não podeis (οὐ δύνασθε)","greek":"οὐ δύνασθε","strong":"G1410","children":[
            {"id":"mt624-7a","type":"complement","text":"servir (δουλεύειν)","greek":"δουλεύειν","strong":"G1398","children":[
                {"id":"mt624-7a1","type":"dative","text":"a Deus (θεῷ)","greek":"θεῷ","strong":"G2316"},
                {"id":"mt624-7a2","type":"conjunction","text":"e (καί)","greek":"καί","strong":"G2532"},
                {"id":"mt624-7a3","type":"dative","text":"ao dinheiro (μαμωνᾷ)","greek":"μαμωνᾷ","strong":"G3126"}
            ]}
        ]}
    ],
    "explicacao": "Impossibilidade lógica: δύναται + infinitivo negado. μισήσει = odiará (futuro). ἀγαπήσει = amará (futuro). Contraste radical: Deus vs mammon. δουλεύειν = servir (escravo). Não há posição neutra.",
    "notas": ["δουλεύειν = servir (como escravo)","μαμωνᾷ = dinheiro, riquezas (aramaico)","ἀνθέξετai = se apegará (futuro médio)","καταφρονήσεται = desprezará (futuro médio)"]
})

nt_batch_7.append({
    "ref": "Mc 16:15", "livro": "Marcos",
    "traducao": "E disse-lhes: Ide por todo o mundo, e pregai o evangelho a toda a criatura.",
    "grego": "καὶ εἶπεν αὐτοῖς· πορευθέντες εἰς τὸν κόσμον ἅπαντα κηρύξατε τὸ εὐαγγέλιον πάσῃ τῇ κτίσει.",
    "diagrama": [
        {"id":"mc1615-1","type":"predicate","text":"disse (εἶπεν)","greek":"εἶπεν","strong":"G2036","children":[
            {"id":"mc1615-1a","type":"subject","text":"ele (Jesus)","greek":"αὐτοῖς","strong":"G846"},
            {"id":"mc1615-1b","type":"dative","text":"a eles (αὐτοῖς)","greek":"αὐτοῖς","strong":"G846"}
        ]},
        {"id":"mc1615-2","type":"predicate","text":"ide (πορευθέντες)","greek":"πορευθέντες","strong":"G4198","children":[
            {"id":"mc1615-2a","type":"adverbial","text":"por todo o mundo (εἰς τὸν κόσμον ἅπαντα)","greek":"εἰς τὸν κόσμον ἅπαντα","strong":"G2889"}
        ]},
        {"id":"mc1615-3","type":"predicate","text":"pregai (κηρύξατε)","greek":"κηρύξατε","strong":"G2784","children":[
            {"id":"mc1615-3a","type":"object","text":"o evangelho (τὸ εὐαγγέλιον)","greek":"τὸ εὐαγγέλιον","strong":"G2098"},
            {"id":"mc1615-3b","type":"dative","text":"a toda a criatura (πάσῃ τῇ κτίσει)","greek":"πάσῃ τῇ κτίσει","strong":"G2937"}
        ]}
    ],
    "explicacao": "Grande Comissão em Marcos. πορευθέντες = ide (aoristo participial, ação primeiro). κηρύξατε = imperativo aoristo (pregai, proclamai). εἰς τὸν κόσμον ἅπαντa = todo o mundo (universalidade). πάσῃ τῇ κτίσεi = toda criatura.",
    "notas": ["πορευθέντες = ide (aoristo de πορεύομαι)","κηρύξατε = pregai (aoristo de κηρύσσω)","κόσμον = mundo","κτίσει = criatura"]
})

nt_batch_7.append({
    "ref": "2Co 5:17", "livro": "2 Coríntios",
    "traducao": "De modo que, se alguém está em Cristo, nova criatura é; as coisas antigas passaram; eis que se fizeram novas.",
    "grego": "ὥστε εἴ τις ἐν Χριστῷ καινὴ κτίσις· τὰ ἀρχαῖα παρῆλθεν, ἰδοὺ γέγονεν καινά.",
    "diagrama": [
        {"id":"2co517-1","type":"conjunction","text":"de modo que (ὥστε)","greek":"ὥστε","strong":"G5620"},
        {"id":"2co517-2","type":"conjunction","text":"se (εἰ)","greek":"εἰ","strong":"G1487"},
        {"id":"2co517-3","type":"subject","text":"alguém (τις)","greek":"τις","strong":"G5100"},
        {"id":"2co517-4","type":"predicate","text":"está (ἐστίν)","greek":"ἐστίν","strong":"G2076","children":[
            {"id":"2co517-4a","type":"adverbial","text":"em Cristo (ἐν Χριστῷ)","greek":"ἐν Χριστῷ","strong":"G5547"}
        ]},
        {"id":"2co517-5","type":"subject","text":"nova criatura (καινὴ κτίσις)","greek":"καινὴ κτίσις","strong":"G2537"},
        {"id":"2co517-6","type":"predicate","text":"é (ἐστίν)","greek":"ἐστίν","strong":"G2076"},
        {"id":"2co517-7","type":"subject","text":"as coisas antigas (τὰ ἀρχαῖα)","greek":"τὰ ἀρχαῖα","strong":"G744"},
        {"id":"2co517-8","type":"predicate","text":"passaram (παρῆλθεν)","greek":"παρῆλθεν","strong":"G3928"},
        {"id":"2co517-9","type":"interjection","text":"eis (ἰδού)","greek":"ἰδού","strong":"G2400"},
        {"id":"2co517-10","type":"predicate","text":"se fizeram (γέγονεν)","greek":"γέγονεν","strong":"G1096","children":[
            {"id":"2co517-10a","type":"complement","text":"novas (καινά)","greek":"καινά","strong":"G2537"}
        ]}
    ],
    "explicacao": "ὥστε = portanto (conclusão). καινή κτίσις = nova criação (não reforma, mas transformação total). παρῆλθεν = passaram (aoristo, acabou). γέγονεν = perfeito (tornou-se novo, estado permanente). A identidade em Cristo é completamente nova.",
    "notas": ["καινή = nova (qualidade nova, não temporal)","κτίσις = criação","παρῆλθεν = passaram (aoristo ativo)","γέγονεν = tornou-se (perfeito de γίνομαι)"]
})
