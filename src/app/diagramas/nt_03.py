# -*- coding: utf-8 -*-
# NT batch 3: João (12 diagrams)

nt_batch_3 = []

nt_batch_3.append({
    "ref": "Jo 1:1", "livro": "João",
    "traducao": "No princípio era o Verbo, e o Verbo estava com Deus, e o Verbo era Deus.",
    "grego": "Ἐν ἀρχῇ ἦν ὁ λόγος, καὶ ὁ λόγος ἦν πρὸς τὸν θεόν, καὶ θεὸς ἦν ὁ λόγος.",
    "diagrama": [
        {"id":"jo1-1","type":"subject","text":"o Verbo (ὁ λόγος)","greek":"ὁ λόγος","strong":"G3056","children":[
            {"id":"jo1-1a","type":"modifier","text":"No princípio (Ἐν ἀρχῇ)","greek":"Ἐν ἀρχῇ","strong":"G746"}
        ]},
        {"id":"jo1-2","type":"predicate","text":"era (ἦν)","greek":"ἦν","strong":"G2258","children":[
            {"id":"jo1-2a","type":"complement","text":"com Deus (πρὸς τὸν θεόν)","greek":"πρὸς τὸν θεόν","strong":"G2316"}
        ]},
        {"id":"jo1-3","type":"conjunction","text":"e (καί)","greek":"καί","strong":"G2532"},
        {"id":"jo1-4","type":"predicate","text":"era (ἦν)","greek":"ἦν","strong":"G2258","children":[
            {"id":"jo1-4a","type":"complement","text":"Deus (θεός)","greek":"θεός","strong":"G2316"}
        ]}
    ],
    "explicacao": "Três declarações: (1) ἦν = imperfeito de εἰμí (existia continuamente). Ἐν ἀρχῇ = No princípio (remete a Gn 1:1). (2) πρός = com (relação face a face). (3) θεός ἦν ὁ λόγος = o Verbo era Deus (predicado sem artigo = natureza divina).",
    "notas": ["ἦν = imperfeito de εἰμί (existia, estava)","λόγος = Verbo, razão, princípio criador","πρός = com, em direção a (relação íntima)","θεός sem artigo = natureza divina"]
})

nt_batch_3.append({
    "ref": "Jo 1:14", "livro": "João",
    "traducao": "E o Verbo se fez carne, e habitou entre nós, e vimos a sua glória, como a glária do Unigênito do Pai.",
    "grego": "καὶ ὁ λόγος σὰρξ ἐγένετο καὶ ἐσκήνωσεν ἐν ἡμῖν, καὶ ἐθεασάμεθα τὴν δόξαν αὐτοῦ, δόξαν ὡς μονογενοῦς παρὰ πατρός.",
    "diagrama": [
        {"id":"jo114-1","type":"subject","text":"o Verbo (ὁ λόγος)","greek":"ὁ λόγος","strong":"G3056"},
        {"id":"jo114-2","type":"predicate","text":"se fez (ἐγένετο)","greek":"ἐγένετο","strong":"G1096","children":[
            {"id":"jo114-2a","type":"complement","text":"carne (σάρξ)","greek":"σάρξ","strong":"G4561"}
        ]},
        {"id":"jo114-3","type":"conjunction","text":"e (καί)","greek":"καί","strong":"G2532"},
        {"id":"jo114-4","type":"predicate","text":"habitou (ἐσκήνωσεν)","greek":"ἐσκήνωσεν","strong":"G4637","children":[
            {"id":"jo114-4a","type":"adverbial","text":"entre nós (ἐν ἡμῖν)","greek":"ἐν ἡμῖν","strong":"G1722"}
        ]},
        {"id":"jo114-5","type":"conjunction","text":"e (καί)","greek":"καί","strong":"G2532"},
        {"id":"jo114-6","type":"predicate","text":"vimos (ἐθεασάμεθα)","greek":"ἐθεασάμεθα","strong":"G2334","children":[
            {"id":"jo114-6a","type":"object","text":"a sua glória (τὴν δόξαν αὐτοῦ)","greek":"τὴν δόξαν αὐτοῦ","strong":"G1391"}
        ]}
    ],
    "explicacao": "σάρξ ἐγένετο = carne se fez (incarnação). ἐσκήνωσεν = tabernaculou (do mesmo radical de σκηνή = tenda, tabernáculo). ἐθεασάμεθα = contemplamos (testemunha ocular). A glória do Unigênito.",
    "notas": ["σάρξ = carne (humanidade)","ἐγένετο = aoristo médio de γίνομαι (tornou-se)","ἐσκήνωσεν = aoristo ativo de σκηνόω (tabernacular)","μονογενοῦς = Unigênito (único)"]
})

nt_batch_3.append({
    "ref": "Jo 3:16", "livro": "João",
    "traducao": "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.",
    "grego": "οὕτως γὰρ ἠγάπησεν ὁ θεὸς τὸν κόσμον ὥστε τὸν υἱὸν αὐτοῦ τὸν μονογενῆ ἔδωκεν, ἵνα πᾶς ὁ πιστεύων εἰς αὐτὸν μὴ ἀπόληται ἀλλ᾽ ἔχῃ ζωὴν αἰώνιον.",
    "diagrama": [
        {"id":"jo316-1","type":"adverbial","text":"de tal maneira (οὕτως)","greek":"οὕτως","strong":"G3779"},
        {"id":"jo316-2","type":"conjunction","text":"porque (γάρ)","greek":"γάρ","strong":"G1063"},
        {"id":"jo316-3","type":"subject","text":"Deus (ὁ θεός)","greek":"ὁ θεός","strong":"G2316"},
        {"id":"jo316-4","type":"predicate","text":"amou (ἠγάπησεν)","greek":"ἠγάπησεν","strong":"G25","children":[
            {"id":"jo316-4a","type":"object","text":"o mundo (τὸν κόσμον)","greek":"τὸν κόσμον","strong":"G2889"},
            {"id":"jo316-4b","type":"complement","text":"de tal maneira que (ὥστε)","greek":"ὥστε","strong":"G5620"}
        ]},
        {"id":"jo316-5","type":"predicate","text":"deu (ἔδωκεν)","greek":"ἔδωκεν","strong":"G1325","children":[
            {"id":"jo316-5a","type":"object","text":"o seu Filho unigênito (τὸν υἱὸν αὐτοῦ τὸν μονογενῆ)","greek":"τὸν υἱὸν αὐτοῦ τὸν μονογενῆ","strong":"G3439"}
        ]},
        {"id":"jo316-6","type":"complement","text":"para que (ἵνα)","greek":"ἵνα","strong":"G2443","children":[
            {"id":"jo316-6a","type":"subject","text":"todo aquele que crê (πᾶς ὁ πιστεύων)","greek":"πᾶς ὁ πιστεύων","strong":"G4100"},
            {"id":"jo316-6b","type":"predicate","text":"não pereça (μὴ ἀπόληται)","greek":"μὴ ἀπόληται","strong":"G622"},
            {"id":"jo316-6c","type":"conjunction","text":"mas (ἀλλ᾽)","greek":"ἀλλ᾽","strong":"G235"},
            {"id":"jo316-6d","type":"predicate","text":"tenha (ἔχῃ)","greek":"ἔχῃ","strong":"G2192","children":[
                {"id":"jo316-6d1","type":"object","text":"vida eterna (ζωὴν αἰώνιον)","greek":"ζωὴν αἰώνιον","strong":"G2222"}
            ]}
        ]}
    ],
    "explicacao": "Versículo mais conhecido do cristianismo. οὕτως = assim, desta forma (intensidade do amor). ἠγάπησεν = aoristo (ponto histórico). ὥστε + infinitivo = resultado. ἵνα + subjuntivo = propósito. μονογενῆ = unigênito (único de sua espécie).",
    "notas": ["οὕτως = assim, desta maneira","ἠγάπησεν = aoristo ativo de ἀγαπάω","μονογενῆ = unigênito (μόνος + γένος)","ζωὴν αἰώνιον = vida eterna (qualidade de vida divina)"]
})

nt_batch_3.append({
    "ref": "Jo 6:35", "livro": "João",
    "traducao": "E Jesus lhes disse: Eu sou o pão da vida; quem vem a mim nunca terá fome, e quem crê em mim jamais terá sede.",
    "grego": "καὶ εἶπεν αὐτοῖς ὁ Ἰησοῦς· ἐγώ εἰμι ὁ ἄρτος τῆς ζωῆς· ὁ ἐρχόμενος πρός με οὐ μὴ πεινάσῃ, καὶ ὁ πιστεύων εἰς ἐμὲ οὐ μὴ διψήσει πώποτε.",
    "diagrama": [
        {"id":"jo635-1","type":"predicate","text":"disse (εἶπεν)","greek":"εἶπεν","strong":"G2036","children":[
            {"id":"jo635-1a","type":"subject","text":"Jesus (ὁ Ἰησοῦς)","greek":"ὁ Ἰησοῦς","strong":"G2424"},
            {"id":"jo635-1b","type":"dative","text":"a eles (αὐτοῖς)","greek":"αὐτοῖς","strong":"G846"}
        ]},
        {"id":"jo635-2","type":"subject","text":"Eu (ἐγώ)","greek":"ἐγώ","strong":"G1473"},
        {"id":"jo635-3","type":"predicate","text":"sou (εἰμί)","greek":"εἰμί","strong":"G2076","children":[
            {"id":"jo635-3a","type":"complement","text":"o pão da vida (ὁ ἄρτος τῆς ζωῆς)","greek":"ὁ ἄρτος τῆς ζωῆς","strong":"G740"}
        ]},
        {"id":"jo635-4","type":"subject","text":"quem vem (ὁ ἐρχόμενος)","greek":"ὁ ἐρχόμενος","strong":"G2064","children":[
            {"id":"jo635-4a","type":"adverbial","text":"a mim (πρός με)","greek":"πρός με","strong":"G4314"},
            {"id":"jo635-4b","type":"predicate","text":"nunca terá fome (οὐ μὴ πεινάσῃ)","greek":"οὐ μὴ πεινάσῃ","strong":"G3983"}
        ]},
        {"id":"jo635-5","type":"subject","text":"quem crê (ὁ πιστεύων)","greek":"ὁ πιστεύων","strong":"G4100","children":[
            {"id":"jo635-5a","type":"adverbial","text":"em mim (εἰς ἐμέ)","greek":"εἰς ἐμέ","strong":"G1519"},
            {"id":"jo635-5b","type":"predicate","text":"jamais terá sede (οὐ μὴ διψήσει πώποτε)","greek":"οὐ μὴ διψήσει πώποτε","strong":"G1372"}
        ]}
    ],
    "explicacao": "Primeira declaração 'Eu sou' (ἐγώ εἰμί). ἄρτος τῆς ζωῆς = pão da vida (maná celestial). οὐ μή + subjuntivo = negação enfática (jamais). O pão que satisfaz eternamente.",
    "notas": ["ἐγώ εἰμί = Eu sou (declaração divina)","ἄρτος = pão (alimento)","πεινάσῃ = futuro de πεινάω (ter fome)","διψήσει = futuro de διψάω (ter sede)"]
})

nt_batch_3.append({
    "ref": "Jo 8:12", "livro": "João",
    "traducao": "Então Jesus falou-lhes outra vez: Eu sou a luz do mundo; quem me segue não andará em trevas, mas terá a luz da vida.",
    "grego": "πάλιν αὐτοῖς ἐλάλησεν ὁ Ἰησοῦς λέγων· ἐγώ εἰμι τὸ φῶς τοῦ κόσμου· ὁ ἀκολουθῶν ἐμοὶ οὐ μὴ περιπατήσῃ ἐν τῇ σκοτίᾳ ἀλλ᾽ ἕξει τὸ φῶς τῆς ζωῆς.",
    "diagrama": [
        {"id":"jo812-1","type":"predicate","text":"falou (ἐλάλησεν)","greek":"ἐλάλησεν","strong":"G2980","children":[
            {"id":"jo812-1a","type":"subject","text":"Jesus (ὁ Ἰησοῦς)","greek":"ὁ Ἰησοῦς","strong":"G2424"},
            {"id":"jo812-1b","type":"dative","text":"a eles (αὐτοῖς)","greek":"αὐτοῖς","strong":"G846"}
        ]},
        {"id":"jo812-2","type":"adverbial","text":"outra vez (πάλιν)","greek":"πάλιν","strong":"G3819"},
        {"id":"jo812-3","type":"subject","text":"Eu (ἐγώ)","greek":"ἐγώ","strong":"G1473"},
        {"id":"jo812-4","type":"predicate","text":"sou (εἰμί)","greek":"εἰμί","strong":"G2076","children":[
            {"id":"jo812-4a","type":"complement","text":"a luz do mundo (τὸ φῶς τοῦ κόσμου)","greek":"τὸ φῶς τοῦ κόσμου","strong":"G5457"}
        ]},
        {"id":"jo812-5","type":"subject","text":"quem me segue (ὁ ἀκολουθῶν ἐμοί)","greek":"ὁ ἀκολουθῶν ἐμοί","strong":"G190","children":[
            {"id":"jo812-5a","type":"predicate","text":"não andará (οὐ μὴ περιπατήσῃ)","greek":"οὐ μὴ περιπατήσῃ","strong":"G4043","children":[
                {"id":"jo812-5a1","type":"adverbial","text":"em trevas (ἐν τῇ σκοτίᾳ)","greek":"ἐν τῇ σκοτίᾳ","strong":"G4653"}
            ]},
            {"id":"jo812-5b","type":"conjunction","text":"mas (ἀλλ᾽)","greek":"ἀλλ᾽","strong":"G235"},
            {"id":"jo812-5c","type":"predicate","text":"terá (ἕξει)","greek":"ἕξει","strong":"G2192","children":[
                {"id":"jo812-5c1","type":"object","text":"a luz da vida (τὸ φῶς τῆς ζωῆς)","greek":"τὸ φῶς τῆς ζωῆς","strong":"G5457"}
            ]}
        ]}
    ],
    "explicacao": "Segunda declaração 'Eu sou'. φῶς τοῦ κόσμou = luz do mundo (universalidade). ὁ ἀκολουθῶν = particípio presente (quem segue continuamente). Contraste trevas vs luz da vida.",
    "notas": ["πάλιν = outra vez, novamente","ἀκολουθῶν = particípio presente de ἀκολουθέω (seguir)","περιπατήσῃ = subjuntivo aoristo de περιπατέω (andar)","σκοτία = trevas, escuridão"]
})

nt_batch_3.append({
    "ref": "Jo 8:32", "livro": "João",
    "traducao": "E conhecereis a verdade, e a verdade vos libertará.",
    "grego": "καὶ γνώσεσθε τὴν ἀλήθειαν, καὶ ἡ ἀλήθεια ἐλευθερώσει ὑμᾶς.",
    "diagrama": [
        {"id":"jo832-1","type":"conjunction","text":"e (καί)","greek":"καί","strong":"G2532"},
        {"id":"jo832-2","type":"predicate","text":"conhecereis (γνώσεσθε)","greek":"γνώσεσθε","strong":"G1097","children":[
            {"id":"jo832-2a","type":"object","text":"a verdade (τὴν ἀλήθειαν)","greek":"τὴν ἀλήθειαν","strong":"G225"}
        ]},
        {"id":"jo832-3","type":"conjunction","text":"e (καί)","greek":"καί","strong":"G2532"},
        {"id":"jo832-4","type":"subject","text":"a verdade (ἡ ἀλήθεια)","greek":"ἡ ἀλήθεια","strong":"G225"},
        {"id":"jo832-5","type":"predicate","text":"vos libertará (ἐλευθερώσει ὑμᾶς)","greek":"ἐλευθερώσει ὑμᾶς","strong":"G1659","children":[
            {"id":"jo832-5a","type":"dative","text":"vós (ὑμᾶς)","greek":"ὑμᾶς","strong":"G4771"}
        ]}
    ],
    "explicacao": "γνώσεσθε = futuro médio de γινώσκω (conhecereis por experiência). A verdade (conceito personificado) liberta. ἐλευθερώσει = futuro ativo de ἐλευθερόω (libertar da escravidão do pecado).",
    "notas": ["γνώσεσθε = futuro médio de γινώσκω","ἀλήθεια = verdade (realidade divina)","ἐλευθερώσει = futuro de ἐλευθερόω (tornar livre)","Libertação do pecado (v.36)"]
})

nt_batch_3.append({
    "ref": "Jo 8:36", "livro": "João",
    "traducao": "Se, pois, o Filho vos libertar, verdadeiramente sereis livres.",
    "grego": "ἐὰν οὖν ὁ υἱὸς ὑμᾶς ἐλευθερώσῃ, ὄντως ἐλεύθεροι ἔσεσθε.",
    "diagrama": [
        {"id":"jo836-1","type":"conjunction","text":"se (ἐάν)","greek":"ἐάν","strong":"G1437"},
        {"id":"jo836-2","type":"conjunction","text":"pois (οὖν)","greek":"οὖν","strong":"G3767"},
        {"id":"jo836-3","type":"subject","text":"o Filho (ὁ υἱός)","greek":"ὁ υἱός","strong":"G5207"},
        {"id":"jo836-4","type":"predicate","text":"vos libertar (ἐλευθερώσῃ)","greek":"ἐλευθερώσῃ","strong":"G1659","children":[
            {"id":"jo836-4a","type":"dative","text":"vós (ὑμᾶς)","greek":"ὑμᾶς","strong":"G4771"}
        ]},
        {"id":"jo836-5","type":"adverbial","text":"verdadeiramente (ὄντως)","greek":"ὄντως","strong":"G3689"},
        {"id":"jo836-6","type":"predicate","text":"sereis (ἔσεσθε)","greek":"ἔσεσθε","strong":"G1510","children":[
            {"id":"jo836-6a","type":"complement","text":"livres (ἐλεύθεροι)","greek":"ἐλεύθεροι","strong":"G1658"}
        ]}
    ],
    "explicacao": "ἐάν + subjuntivo = condição (se o Filho libertar). ὄντως = verdadeiramente (liberdade real, não ilusória). A libertação do Filho é mais profunda que a política.",
    "notas": ["ἐάν = se (condicional)","ἐλευθερώσῃ = subjuntivo aoristo de ἐλευθερόω","ὄντως = realmente, verdadeiramente","ἐλεύθεροι = livres (adjetivo)"]
})

nt_batch_3.append({
    "ref": "Jo 10:11", "livro": "João",
    "traducao": "Eu sou o bom pastor. O bom pastor dá a sua vida pelas ovelhas.",
    "grego": "ἐγώ εἰμι ὁ ποιμὴν ὁ καλός. ὁ ποιμὴν ὁ καλὸς τὴν ψυχὴν αὐτοῦ τίθησιν ὑπὲρ τῶν προβάτων.",
    "diagrama": [
        {"id":"jo1011-1","type":"subject","text":"Eu (ἐγώ)","greek":"ἐγώ","strong":"G1473"},
        {"id":"jo1011-2","type":"predicate","text":"sou (εἰμί)","greek":"εἰμί","strong":"G2076","children":[
            {"id":"jo1011-2a","type":"complement","text":"o bom pastor (ὁ ποιμὴν ὁ καλός)","greek":"ὁ ποιμὴν ὁ καλός","strong":"G4166"}
        ]},
        {"id":"jo1011-3","type":"subject","text":"o bom pastor (ὁ ποιμὴν ὁ καλός)","greek":"ὁ ποιμὴν ὁ καλός","strong":"G4166"},
        {"id":"jo1011-4","type":"predicate","text":"põe (τίθησιν)","greek":"τίθησιν","strong":"G5087","children":[
            {"id":"jo1011-4a","type":"object","text":"a sua vida (τὴν ψυχὴν αὐτοῦ)","greek":"τὴν ψυχὴν αὐτοῦ","strong":"G5590"},
            {"id":"jo1011-4b","type":"adverbial","text":"pelas ovelhas (ὑπὲρ τῶν προβάτων)","greek":"ὑπὲρ τῶν προβάτων","strong":"G4263"}
        ]}
    ],
    "explicacao": "Terceira declaração 'Eu sou'. ποιμὴν ὁ καλός = pastor bom (qualidade moral). τίθησιν = coloca, põe (deliberadamente). ὑπέρ = em favor de, por causa de. O pastor sacrificial.",
    "notas": ["ποιμήν = pastor (cuidador de ovelhas)","καλός = bom (belo, excelente)","τίθησιν = presente ativo de τίθημι (pôr)","ὑπέρ = por (em favor de)"]
})

nt_batch_3.append({
    "ref": "Jo 11:25", "livro": "João",
    "traducao": "Jesus disse-lhe: Eu sou a ressurreição e a vida; quem crê em mim, ainda que morra, viverá.",
    "grego": "εἶπεν αὐτῇ ὁ Ἰησοῦς· ἐγώ εἰμι ἡ ἀνάστασις καὶ ἡ ζωή· ὁ πιστεύων εἰς ἐμὲ κἂν ἀποθάνῃ ζήσει.",
    "diagrama": [
        {"id":"jo1125-1","type":"predicate","text":"disse (εἶπεν)","greek":"εἶπεν","strong":"G2036","children":[
            {"id":"jo1125-1a","type":"subject","text":"Jesus (ὁ Ἰησοῦς)","greek":"ὁ Ἰησοῦς","strong":"G2424"},
            {"id":"jo1125-1b","type":"dative","text":"a ela (αὐτῇ)","greek":"αὐτῇ","strong":"G846"}
        ]},
        {"id":"jo1125-2","type":"subject","text":"Eu (ἐγώ)","greek":"ἐγώ","strong":"G1473"},
        {"id":"jo1125-3","type":"predicate","text":"sou (εἰμί)","greek":"εἰμί","strong":"G2076","children":[
            {"id":"jo1125-3a","type":"complement","text":"a ressurreição e a vida (ἡ ἀνάστασις καὶ ἡ ζωή)","greek":"ἡ ἀνάστασις καὶ ἡ ζωή","strong":"G386"}
        ]},
        {"id":"jo1125-4","type":"subject","text":"quem crê (ὁ πιστεύων)","greek":"ὁ πιστεύων","strong":"G4100","children":[
            {"id":"jo1125-4a","type":"adverbial","text":"em mim (εἰς ἐμέ)","greek":"εἰς ἐμέ","strong":"G1519"},
            {"id":"jo1125-4b","type":"complement","text":"ainda que morra (κἂν ἀποθάνῃ)","greek":"κἂν ἀποθάνῃ","strong":"G599"},
            {"id":"jo1125-4c","type":"predicate","text":"viverá (ζήσει)","greek":"ζήσει","strong":"G2198"}
        ]}
    ],
    "explicacao": "Quarta declaração 'Eu sou'. Jesus = ressurreição (não apenas a tem). κἂν = mesmo que (καί + ἐάν). ἀποθάνῃ = subjuntivo aoristo (morrer). ζήσει = viverá (vida eterna, não apenas ressurreição futura).",
    "notas": ["ἀνάστασις = ressurreição (levantar-se)","ζωή = vida (qualidade divina)","κἂν = mesmo que, ainda que","ζήσει = futuro de ζάω (viver)"]
})

nt_batch_3.append({
    "ref": "Jo 14:6", "livro": "João",
    "traducao": "Jesus disse-lhe: Eu sou o caminho, e a verdade, e a vida; ninguém vem ao Pai senão por mim.",
    "grego": "λέγει αὐτῷ ὁ Ἰησοῦς· ἐγώ εἰμι ἡ ὁδὸς καὶ ἡ ἀλήθεια καὶ ἡ ζωή· οὐδεὶς ἔρχεται πρὸς τὸν πατέρα εἰ μὴ δι᾽ ἐμοῦ.",
    "diagrama": [
        {"id":"jo146-1","type":"predicate","text":"diz (λέγει)","greek":"λέγει","strong":"G3004","children":[
            {"id":"jo146-1a","type":"subject","text":"Jesus (ὁ Ἰησοῦς)","greek":"ὁ Ἰησοῦς","strong":"G2424"},
            {"id":"jo146-1b","type":"dative","text":"a ele (αὐτῷ)","greek":"αὐτῷ","strong":"G846"}
        ]},
        {"id":"jo146-2","type":"subject","text":"Eu (ἐγώ)","greek":"ἐγώ","strong":"G1473"},
        {"id":"jo146-3","type":"predicate","text":"sou (εἰμί)","greek":"εἰμί","strong":"G2076","children":[
            {"id":"jo146-3a","type":"complement","text":"o caminho (ἡ ὁδός)","greek":"ἡ ὁδός","strong":"G3598"},
            {"id":"jo146-3b","type":"conjunction","text":"e (καί)","greek":"καί","strong":"G2532"},
            {"id":"jo146-3c","type":"complement","text":"a verdade (ἡ ἀλήθεια)","greek":"ἡ ἀλήθεια","strong":"G225"},
            {"id":"jo146-3d","type":"conjunction","text":"e (καί)","greek":"καί","strong":"G2532"},
            {"id":"jo146-3e","type":"complement","text":"a vida (ἡ ζωή)","greek":"ἡ ζωή","strong":"G2222"}
        ]},
        {"id":"jo146-4","type":"subject","text":"ninguém (οὐδείς)","greek":"οὐδείς","strong":"G3762"},
        {"id":"jo146-5","type":"predicate","text":"vem (ἔρχεται)","greek":"ἔρχεται","strong":"G2064","children":[
            {"id":"jo146-5a","type":"adverbial","text":"ao Pai (πρὸς τὸν πατέρα)","greek":"πρὸς τὸν πατέρα","strong":"G3962"},
            {"id":"jo146-5b","type":"adverbial","text":"senão por mim (εἰ μὴ δι᾽ ἐμοῦ)","greek":"εἰ μὴ δι᾽ ἐμοῦ","strong":"G1223"}
        ]}
    ],
    "explicacao": "Quinta declaração 'Eu sou' (a mais completa). ὁδός = caminho (acesso). ἀλήθεια = verdade (revelação). ζωή = vida (eterna). εἰ μή = exceto. A exclusividade de Cristo como único caminho ao Pai.",
    "notas": ["ὁδός = caminho, via","εἰ μή = senão, exceto","δι᾽ ἐμοῦ = por mim (mediador)"]
})

nt_batch_3.append({
    "ref": "Jo 15:5", "livro": "João",
    "traducao": "Eu sou a vide, vós as varas. Quem permanece em mim, e eu nele, esse dá muito fruto, porque sem mim nada podeis fazer.",
    "grego": "ἐγώ εἰμι ἡ ἄμπελος καὶ ὑμεῖς τὰ κλήματα. ὁ μένων ἐν ἐμοὶ κἀγὼ ἐν αὐτῷ οὗτος φέρει καρπὸν πολύν, χωρὶς γὰρ ἐμοῦ οὐ δύνασθε ποιεῖν οὐδέν.",
    "diagrama": [
        {"id":"jo155-1","type":"subject","text":"Eu (ἐγώ)","greek":"ἐγώ","strong":"G1473"},
        {"id":"jo155-2","type":"predicate","text":"sou (εἰμί)","greek":"εἰμί","strong":"G2076","children":[
            {"id":"jo155-2a","type":"complement","text":"a vide (ἡ ἄμπελος)","greek":"ἡ ἄμπελος","strong":"G288"},
            {"id":"jo155-2b","type":"conjunction","text":"e (καί)","greek":"καί","strong":"G2532"},
            {"id":"jo155-2c","type":"complement","text":"vós as varas (ὑμεῖς τὰ κλήματα)","greek":"ὑμεῖς τὰ κλήματα","strong":"G2814"}
        ]},
        {"id":"jo155-3","type":"subject","text":"quem permanece (ὁ μένων)","greek":"ὁ μένων","strong":"G3306","children":[
            {"id":"jo155-3a","type":"adverbial","text":"em mim (ἐν ἐμοί)","greek":"ἐν ἐμοί","strong":"G1722"},
            {"id":"jo155-3b","type":"conjunction","text":"e eu (κἀγώ)","greek":"κἀγώ","strong":"G1473"},
            {"id":"jo155-3c","type":"adverbial","text":"nele (ἐν αὐτῷ)","greek":"ἐν αὐτῷ","strong":"G1722"}
        ]},
        {"id":"jo155-4","type":"predicate","text":"dá (φέρει)","greek":"φέρει","strong":"G5342","children":[
            {"id":"jo155-4a","type":"object","text":"muito fruto (καρπὸν πολύν)","greek":"καρπὸν πολύν","strong":"G2590"}
        ]},
        {"id":"jo155-5","type":"conjunction","text":"porque (γάρ)","greek":"γάρ","strong":"G1063"},
        {"id":"jo155-6","type":"predicate","text":"nada podeis (οὐ δύνασθε οὐδέν)","greek":"οὐ δύνασθε οὐδέν","strong":"G1410","children":[
            {"id":"jo155-6a","type":"adverbial","text":"sem mim (χωρὶς ἐμοῦ)","greek":"χωρὶς ἐμοῦ","strong":"G5565"}
        ]}
    ],
    "explicacao": "Sexta declaração 'Eu sou'. ἄμπελος = vide (Israel no VT). κλήματα = varas (ramos). μένων = permanece (relação contínua). φέρει = produz (fruto natural). χωρίς = sem (dependência total).",
    "notas": ["ἄμπελος = vide (planta frutífera)","κλήματα = varas, ramos","μένων = particípio presente de μένω (permanecer)","καρπόν = fruto"]
})

nt_batch_3.append({
    "ref": "Jo 15:13", "livro": "João",
    "traducao": "Ninguém tem maior amor do que este: que alguém ponha a sua vida pelos seus amigos.",
    "grego": "μείζονα ταύτης ἀγάπην οὐδεὶς ἔχει ἵνα τις τὴν ψυχὴν αὐτοῦ θῇ ὑπὲρ τῶν φίλων αὐτοῦ.",
    "diagrama": [
        {"id":"jo1513-1","type":"subject","text":"ninguém (οὐδείς)","greek":"οὐδείς","strong":"G3762"},
        {"id":"jo1513-2","type":"predicate","text":"tem (ἔχει)","greek":"ἔχει","strong":"G2192","children":[
            {"id":"jo1513-2a","type":"object","text":"maior amor (μείζονα ἀγάπην)","greek":"μείζονα ἀγάπην","strong":"G26","children":[
                {"id":"jo1513-2a1","type":"modifier","text":"deste (ταύτης)","greek":"ταύτης","strong":"G3778"}
            ]}
        ]},
        {"id":"jo1513-3","type":"complement","text":"para que (ἵνα)","greek":"ἵνα","strong":"G2443","children":[
            {"id":"jo1513-3a","type":"subject","text":"alguém (τις)","greek":"τις","strong":"G5100"},
            {"id":"jo1513-3b","type":"predicate","text":"ponha (θῇ)","greek":"θῇ","strong":"G5087","children":[
                {"id":"jo1513-3b1","type":"object","text":"a sua vida (τὴν ψυχὴν αὐτοῦ)","greek":"τὴν ψυχὴν αὐτοῦ","strong":"G5590"},
                {"id":"jo1513-3b2","type":"adverbial","text":"pelos amigos (ὑπὲρ τῶν φίλων αὐτοῦ)","greek":"ὑπὲρ τῶν φίλων αὐτοῦ","strong":"G5384"}
            ]}
        ]}
    ],
    "explicacao": "Comparativo: μείζονα = maior (acusativo). ταύτης = desta (demonstrativo). θῇ = subjuntivo aoristo (ponha, sacrifício voluntário). O amor máximo é o sacrifício. Aplica-se a Cristo e aos discípulos.",
    "notas": ["μείζονα = maior (comparativo de μέγας)","ἀγάπην = amor (sacrificial)","θῇ = subjuntivo aoristo de τίθημι (pôr, depositar)","φίλων = amigos (relação mútua)"]
})
