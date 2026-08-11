# -*- coding: utf-8 -*-
# NT batch 1: Mateus (12 diagrams)

nt_batch_1 = []

nt_batch_1.append({
    "ref": "Mt 1:1", "livro": "Mateus",
    "traducao": "Livro da genealogia de Jesus Cristo, filho de Davi, filho de Abraão.",
    "grego": "Βίβλος γενέσεως Ἰησοῦ Χριστοῦ υἱοῦ Δαυὶδ υἱοῦ Ἀβραάμ.",
    "diagrama": [
        {"id":"mt1-1","type":"subject","text":"Livro (Βίβλος)","greek":"Βίβλος","strong":"G976","children":[
            {"id":"mt1-1a","type":"modifier","text":"da genealogia (γενέσεως)","greek":"γενέσεως","strong":"G1078"},
            {"id":"mt1-1b","type":"modifier","text":"de Jesus Cristo (Ἰησοῦ Χριστοῦ)","greek":"Ἰησοῦ Χριστοῦ","strong":"G2424"},
            {"id":"mt1-1c","type":"modifier","text":"filho de Davi (υἱοῦ Δαυὶδ)","greek":"υἱοῦ Δαυὶδ","strong":"G1138"},
            {"id":"mt1-1d","type":"modifier","text":"filho de Abraão (υἱοῦ Ἀβραάμ)","greek":"υἱοῦ Ἀβραάμ","strong":"G11"}
        ]}
    ],
    "explicacao": "Frase nominal (sem verbo). Βίβλος γενέσεως é uma expressão típica de genealogia hebraica. A dupla filiação (Davi + Abraão) estabelece a linhagem messiânica.",
    "notas": ["Βίβλος = livro, registro, genealogia","γένεσις = origem, genealogia (remete a Gênesis)","Ἰησοῦ = Joshua/Yeshua = 'YHWH salva'","Χριστος = Ungido (Messias em hebraico)"]
})

nt_batch_1.append({
    "ref": "Mt 1:21", "livro": "Mateus",
    "traducao": "Ela dará à luz um filho, e tu lhe porás o nome Jesus, porque ele salvará o seu povo dos seus pecados.",
    "grego": "τέξεται δὲ υἱὸν καὶ καλέσεις τὸ ὄνομα αὐτοῦ Ἰησοῦν, αὐτὸς γὰρ σώσει τὸν λαὸν αὐτοῦ ἀπὸ τῶν ἁμαρτιῶν αὐτῶν.",
    "diagrama": [
        {"id":"mt21-1","type":"predicate","text":"dará à luz (τέξεται)","greek":"τέξεται","strong":"G5088","children":[
            {"id":"mt21-1a","type":"subject","text":"ela (αὐτή)","greek":"αὐτή","strong":"G846"},
            {"id":"mt21-1b","type":"object","text":"um filho (υἱόν)","greek":"υἱόν","strong":"G5207"}
        ]},
        {"id":"mt21-2","type":"conjunction","text":"e (καί)","greek":"καί","strong":"G2532"},
        {"id":"mt21-3","type":"predicate","text":"porás o nome (καλέσεις)","greek":"καλέσεις","strong":"G2564","children":[
            {"id":"mt21-3a","type":"object","text":"Jesus (Ἰησοῦν)","greek":"Ἰησοῦν","strong":"G2424"}
        ]},
        {"id":"mt21-4","type":"conjunction","text":"porque (γάρ)","greek":"γάρ","strong":"G1063"},
        {"id":"mt21-5","type":"predicate","text":"ele salvará (σώσει)","greek":"σώσει","strong":"G4982","children":[
            {"id":"mt21-5a","type":"subject","text":"ele (αὐτός)","greek":"αὐτός","strong":"G846"},
            {"id":"mt21-5b","type":"object","text":"o seu povo (τὸν λαὸν αὐτοῦ)","greek":"τὸν λαὸν αὐτοῦ","strong":"G2992"},
            {"id":"mt21-5c","type":"adverbial","text":"dos pecados (ἀπὸ τῶν ἁμαρτιῶν)","greek":"ἀπὸ τῶν ἁμαρτιῶν","strong":"G266"}
        ]}
    ],
    "explicacao": "Estrutura com τέξεται (futuro) + καλέσεις (imperativo) + σώσει (futuro). O nome Jesus (= YHWH salva) explica a missão salvífica. γάρ introduz a explicação etimológica.",
    "notas": ["τέξεται = futuro médio de τίκτω (dar à luz)","καλέσεις = futuro ativo de καλέω (chamar, nomear)","σώσει = futuro ativo de σῴζω (salvar)","Ἰησοῦν = acusativo de Ἰησοῦς"]
})

nt_batch_1.append({
    "ref": "Mt 5:3", "livro": "Mateus",
    "traducao": "Bem-aventurados os pobres de espírito, porque deles é o reino dos céus.",
    "grego": "Μακάριοι οἱ πτωχοὶ τῷ πνεύματι, ὅτι αὐτῶν ἐστιν ἡ βασιλεία τῶν οὐρανῶν.",
    "diagrama": [
        {"id":"mt53-1","type":"subject","text":"Bem-aventurados (Μακάριοι)","greek":"Μακάριοι","strong":"G3107","children":[
            {"id":"mt53-1a","type":"modifier","text":"os pobres de espírito (οἱ πτωχοὶ τῷ πνεύματι)","greek":"οἱ πτωχοὶ τῷ πνεύματι","strong":"G4434"}
        ]},
        {"id":"mt53-2","type":"conjunction","text":"porque (ὅτι)","greek":"ὅτι","strong":"G3754"},
        {"id":"mt53-3","type":"predicate","text":"é (ἐστιν)","greek":"ἐστιν","strong":"G2076","children":[
            {"id":"mt53-3a","type":"subject","text":"o reino dos céus (ἡ βασιλεία τῶν οὐρανῶν)","greek":"ἡ βασιλεία τῶν οὐρανῶν","strong":"G932"},
            {"id":"mt53-3b","type":"complement","text":"deles (αὐτῶν)","greek":"αὐτῶν","strong":"G846"}
        ]}
    ],
    "explicacao": "Frase nominal sem verbo principal. Μακάριοι = bem-aventurados (bem-aventurança divina). πτωχοὶ τῷ πνεύματi = pobres de espírito (dependência total de Deus). ὅτι introduz a razão.",
    "notas": ["Μακάριοι = bem-aventurados, felizes (divinamente)","πτωχοί = mendicantes, dependentes","τῷ πνεύματι = dativo de relação/qualidade","οὐρανῶν = plural hebraizante (evita o nome de Deus)"]
})

nt_batch_1.append({
    "ref": "Mt 5:9", "livro": "Mateus",
    "traducao": "Bem-aventurados os pacificadores, porque eles serão chamados filhos de Deus.",
    "grego": "Μακάριοι οἱ εἰρηνοποιοί, ὅτι αὐτοὶ υἱοὶ θεοῦ κληθήσονται.",
    "diagrama": [
        {"id":"mt59-1","type":"subject","text":"Bem-aventurados (Μακάριοι)","greek":"Μακάριοι","strong":"G3107","children":[
            {"id":"mt59-1a","type":"modifier","text":"os pacificadores (οἱ εἰρηνοποιοί)","greek":"οἱ εἰρηνοποιοί","strong":"G1518"}
        ]},
        {"id":"mt59-2","type":"conjunction","text":"porque (ὅτι)","greek":"ὅτι","strong":"G3754"},
        {"id":"mt59-3","type":"predicate","text":"serão chamados (κληθήσονται)","greek":"κληθήσονται","strong":"G2564","children":[
            {"id":"mt59-3a","type":"subject","text":"eles (αὐτοί)","greek":"αὐτοί","strong":"G846"},
            {"id":"mt59-3b","type":"complement","text":"filhos de Deus (υἱοὶ θεοῦ)","greek":"υἱοὶ θεοῦ","strong":"G5207"}
        ]}
    ],
    "explicacao": "εἰρηνοποιοί = pacificadores (τίθημι + εἰρήνη). κληθήσοντai = futuro passivo (divino) de καλέω. Serão chamados = identidade divina reconhecida.",
    "notas": ["εἰρηνοποιοί = pacificadores (só aqui no NT)","κληθήσονται = futuro passivo — Deus como sujeito oculto","υἱοί = filhos (relação de aliança)"]
})

nt_batch_1.append({
    "ref": "Mt 5:14", "livro": "Mateus",
    "traducao": "Vós sois o mundo. Ninguém acende uma candeia para a por debaixo do selo, mas sim no candelabro, e ilumina todos que estão em casa.",
    "grego": "ὑμεῖς ἐστε τὸ φῶς τοῦ κόσμου. οὐ δύναται πόλις κρυβῆναι ἐπάνω ὄρους κειμένη.",
    "diagrama": [
        {"id":"mt514-1","type":"subject","text":"Vós (ὑμεῖς)","greek":"ὑμεῖς","strong":"G4771"},
        {"id":"mt514-2","type":"predicate","text":"sois (ἐστε)","greek":"ἐστε","strong":"G2076","children":[
            {"id":"mt514-2a","type":"complement","text":"a luz do mundo (τὸ φῶς τοῦ κόσμου)","greek":"τὸ φῶς τοῦ κόσμου","strong":"G5457"}
        ]},
        {"id":"mt514-3","type":"predicate","text":"Ninguém pode (οὐ δύναται)","greek":"οὐ δύναται","strong":"G1410","children":[
            {"id":"mt514-3a","type":"object","text":"ser escondida (κρυβῆναι)","greek":"κρυβῆναι","strong":"G2928"},
            {"id":"mt514-3b","type":"adverbial","text":"sobre o monte (ἐπάνω ὄρους)","greek":"ἐπάνω ὄρους","strong":"G1870"}
        ]}
    ],
    "explicacao": "Metáfora: discípulos = φῶς τοῦ κόσμου. οὐ δύναται κρυβῆναι = impossibilidade negativa (dupla negativa enfática em grego). A cidade no monte = visibilidade pública da fé.",
    "notas": ["φῶς = luz (raiz: λάμπω = brilhar)","κόσμου = mundo (habitantes, não cosmos)","κρυβῆναι = aoristo passivo infinitivo de κρύπτω","ὄρους = genitivo de relação"]
})

nt_batch_1.append({
    "ref": "Mt 5:22", "livro": "Mateus",
    "traducao": "Eu, porém, vos digo que qualquer que se irar contra seu irmão será réu de julgamento.",
    "grego": "ἐγὼ δὲ λέγω ὑμῖν ὅτι πᾶς ὁ ὀργιζόμενος τῷ ἀδελφῷ αὐτοῦ ἔνοχος ἔσται τῇ κρίσει.",
    "diagrama": [
        {"id":"mt522-1","type":"subject","text":"Eu (ἐγώ)","greek":"ἐγώ","strong":"G1473"},
        {"id":"mt522-2","type":"predicate","text":"digo (λέγω)","greek":"λέγω","strong":"G3004","children":[
            {"id":"mt522-2a","type":"dative","text":"a vós (ὑμῖν)","greek":"ὑμῖν","strong":"G4771"},
            {"id":"mt522-2b","type":"object","text":"que (ὅτι)","greek":"ὅτι","strong":"G3754"}
        ]},
        {"id":"mt522-3","type":"subject","text":"qualquer (πᾶς ὁ)","greek":"πᾶς ὁ","strong":"G3956","children":[
            {"id":"mt522-3a","type":"modifier","text":"que se irar (ὀργιζόμενος)","greek":"ὀργιζόμενος","strong":"G3710"},
            {"id":"mt522-3b","type":"dative","text":"contra o irmão (τῷ ἀδελφῷ)","greek":"τῷ ἀδελφῷ","strong":"G80"}
        ]},
        {"id":"mt522-4","type":"predicate","text":"será réu (ἔνοχος ἔσται)","greek":"ἔνοχος ἔσται","strong":"G1777","children":[
            {"id":"mt522-4a","type":"complement","text":"do julgamento (τῇ κρίσει)","greek":"τῇ κρίσει","strong":"G2920"}
        ]}
    ],
    "explicacao": "Estrutura: ἐγώ δέ = contraste com a Lei. ὁ ὀργιζόμενος = particípio substantivado. ἔνοχος ἔσται = culpável (futuro de γίνομαι). A ira interior = crime equivalente ao assassinato.",
    "notas": ["ὀργιζόμενος = particípio presentes de ὁργίζω (irar-se)","ἔνοχos = culpável, sujeito a","κρίσει = dativo de referência (julgamento/conseho)"]
})

nt_batch_1.append({
    "ref": "Mt 5:37", "livro": "Mateus",
    "traducao": "Seja, porém, o vosso falar: sim, sim; não, não.",
    "grego": "ἔστω δὲ ὁ λόγος ὑμῶν ναὶ ναί, οὒ οὔ.",
    "diagrama": [
        {"id":"mt537-1","type":"predicate","text":"seja (ἔστω)","greek":"ἔστω","strong":"G1510","children":[
            {"id":"mt537-1a","type":"subject","text":"o vosso falar (ὁ λόγος ὑμῶν)","greek":"ὁ λόγος ὑμῶν","strong":"G3056"},
            {"id":"mt537-1b","type":"complement","text":"sim, sim (ναὶ ναί)","greek":"ναὶ ναί","strong":"G3483"},
            {"id":"mt537-1c","type":"complement","text":"não, não (οὒ οὔ)","greek":"οὒ οὔ","strong":"G3693"}
        ]}
    ],
    "explicacao": "Imperativo presente de εἰμί. ὁ λόγος = fala, palavra, discurso. A repetição ναί ναί, οὔ οὔ enfatiza a simplicidade radical. Sem juramento — a palavra basta.",
    "notas": ["ἔστω = imperativo 3ª pessoa de εἰμί","ναί = sim (confirmação enfática)","οὔ = não (negação enfática)","λόγος = palavra, fala, discurso"]
})

nt_batch_1.append({
    "ref": "Mt 5:48", "livro": "Mateus",
    "traducao": "Portanto, sede perfeitos, como é perfeito o vosso Pai celestial.",
    "grego": "ἔσεσθε οὖν τέλειοι ὡς ὁ πατὴρ ὑμῶν ὁ οὐράνιος τέλειός ἐστιν.",
    "diagrama": [
        {"id":"mt548-1","type":"predicate","text":"sede (ἔσεσθε)","greek":"ἔσεσθε","strong":"G1510","children":[
            {"id":"mt548-1a","type":"complement","text":"perfeitos (τέλειοι)","greek":"τέλειοι","strong":"G5046"}
        ]},
        {"id":"mt548-2","type":"conjunction","text":"portanto (οὖν)","greek":"οὖν","strong":"G3767"},
        {"id":"mt548-3","type":"adverbial","text":"como (ὡς)","greek":"ὡς","strong":"G5613"},
        {"id":"mt548-4","type":"subject","text":"o vosso Pai celestial (ὁ πατὴρ ὑμῶν ὁ οὐράνιος)","greek":"ὁ πατὴρ ὑμῶν ὁ οὐράνιος","strong":"G3962","children":[
            {"id":"mt548-4a","type":"modifier","text":"celestial (οὐράνιος)","greek":"οὐράνιος","strong":"G2033"}
        ]},
        {"id":"mt548-5","type":"predicate","text":"é perfeito (τέλειός ἐστιν)","greek":"τέλειός ἐστιν","strong":"G5046","children":[
            {"id":"mt548-5a","type":"complement","text":"perfeito (τέλειος)","greek":"τέλειος","strong":"G5046"}
        ]}
    ],
    "explicacao": "Imperativo futuro de εἰμί. τέλειος = completo, maduro (referência ao VT: 'sede santos porque eu sou santo' Lv 19:2). O padrão é o próprio Deus.",
    "notas": ["ἔσεσθε = futuro de εἰμί (imperativo)","τέλειοι = completos, maduros, perfeitos","οὐράνιος = celestial, do céu","Modelo: Lv 19:2 — 'santos porque eu sou santo'"]
})

nt_batch_1.append({
    "ref": "Mt 6:9", "livro": "Mateus",
    "traducao": "Vós, porém, orai assim: Pai nosso que estais nos céus, santificado seja o vosso nome.",
    "grego": "σεῖς οὖν προσεύχεσθε οὕτως· πάτερ ἡμῶν ὁ ἐν τοῖς οὐρανοῖς, ἁγιασθήτω τὸ ὄνομά σου.",
    "diagrama": [
        {"id":"mt69-1","type":"vocative","text":"Pai nosso (πάτερ ἡμῶν)","greek":"πάτερ ἡμῶν","strong":"G3962","children":[
            {"id":"mt69-1a","type":"modifier","text":"que estais nos céus (ὁ ἐν τοῖς οὐρανοῖς)","greek":"ὁ ἐν τοῖς οὐρανοῖς","strong":"G3772"}
        ]},
        {"id":"mt69-2","type":"predicate","text":"seja santificado (ἁγιασθήτω)","greek":"ἁγιασθήτω","strong":"G37","children":[
            {"id":"mt69-2a","type":"subject","text":"o vosso nome (τὸ ὄνομά σου)","greek":"τὸ ὄνομά σου","strong":"G3686"}
        ]}
    ],
    "explicacao": "Vocativo (πάτερ) + imperativo aoristo passivo (ἁγιασθήτω). O nome de Deus é santificado (= separado, declarado santo). A oração começa com a adoração.",
    "notas": ["πάτερ = vocativo de πατήρ","ἁγιασθήτω = aoristo passivo proibitivo de ἁγιάζω","ὄνομα = nome (representa a pessoa inteira)","οὐρανοῖς = céus (plural hebraizante)"]
})

nt_batch_1.append({
    "ref": "Mt 6:10", "livro": "Mateus",
    "traducao": "Venha o teu reino. Seja feita a tua vontade, assim na terra como no céu.",
    "grego": "ἐλθάτω ἡ βασιλεία σου, γενηθήτω τὸ θέλημά σου ὡς ἐν οὐρανῷ καὶ ἐπὶ τῆς γῆς.",
    "diagrama": [
        {"id":"mt610-1","type":"predicate","text":"venha (ἐλθάτω)","greek":"ἐλθάτω","strong":"G2064","children":[
            {"id":"mt610-1a","type":"subject","text":"o teu reino (ἡ βασιλεία σου)","greek":"ἡ βασιλεία σου","strong":"G932"}
        ]},
        {"id":"mt610-2","type":"predicate","text":"seja feita (γενηθήτω)","greek":"γενηθήτω","strong":"G1096","children":[
            {"id":"mt610-2a","type":"subject","text":"a tua vontade (τὸ θέλημά σου)","greek":"τὸ θέλημά σου","strong":"G2307"},
            {"id":"mt610-2b","type":"adverbial","text":"assim na terra como no céu (ὡς ἐν οὐρανῷ καὶ ἐπὶ τῆς γῆς)","greek":"ὡς ἐν οὐρανῷ καὶ ἐπὶ τῆς γῆς","strong":"G1093"}
        ]}
    ],
    "explicacao": "Dois imperativos aoristos: ἐλθάτω (venha) + γενηθήτω (seja feita). A vontade de Deus se cumpre no céu perfeitamente; na terra, pela oração e obediência dos discípulos.",
    "notas": ["ἐλθάτω = aoristo ativo imperativo de ἔρχομαι","γενηθήτω = aoristo passivo imperativo de γίνομαι","βασιλεία = reino, soberania","θέλημα = vontade, desejo"]
})

nt_batch_1.append({
    "ref": "Mt 6:33", "livro": "Mateus",
    "traducao": "Mas, buscai primeiro o reino de Deus, e a sua justiça, e todas estas coisas vos serão acrescentadas.",
    "grego": "ζητεῖτε δὲ πρῶτον τὴν βασιλείαν τοῦ θεοῦ καὶ τὴν δικαιοσύνην αὐτοῦ, καὶ ταῦτα πάντα προστεθήσεται ὑμῖν.",
    "diagrama": [
        {"id":"mt633-1","type":"predicate","text":"buscai (ζητεῖτε)","greek":"ζητεῖτε","strong":"G2212","children":[
            {"id":"mt633-1a","type":"adverbial","text":"primeiro (πρῶτον)","greek":"πρῶτον","strong":"G4412"},
            {"id":"mt633-1b","type":"object","text":"o reino de Deus (τὴν βασιλείαν τοῦ θεοῦ)","greek":"τὴν βασιλείαν τοῦ θεοῦ","strong":"G932"},
            {"id":"mt633-1c","type":"conjunction","text":"e (καί)","greek":"καί","strong":"G2532"},
            {"id":"mt633-1d","type":"object","text":"a sua justiça (τὴν δικαιοσύνην αὐτοῦ)","greek":"τὴν δικαιοσύνην αὐτοῦ","strong":"G1343"}
        ]},
        {"id":"mt633-2","type":"conjunction","text":"e (καί)","greek":"καί","strong":"G2532"},
        {"id":"mt633-3","type":"predicate","text":"serão acrescentadas (προστεθήσεται)","greek":"προστεθήσεται","strong":"G4369","children":[
            {"id":"mt633-3a","type":"subject","text":"todas estas coisas (ταῦτα πάντα)","greek":"ταῦτα πάντα","strong":"G3778"},
            {"id":"mt633-3b","type":"dative","text":"a vós (ὑμῖν)","greek":"ὑμῖν","strong":"G4771"}
        ]}
    ],
    "explicacao": "Imperativo presente (ζητεῖτε = buscai continuamente). πρῶτον = antes de tudo. προστεθήσεται = futuro passivo de προστίθημi (Deus acrescenta). A prioridade é o reino, não as necessidades.",
    "notas": ["ζητεῖτε = imperativo presente ativo de ζητέω","πρῶτον = primeiro, antes de tudo","δικαιοσύνη = justiça, retidão","προστεθήσεται = será acrescentado (Deus como sujeito)"]
})

nt_batch_1.append({
    "ref": "Mt 9:6", "livro": "Mateus",
    "traducao": "Mas, para saibais que o Filho do Homem tem poder na terra para perdoar pecados.",
    "grego": "ἵνα δὲ εἰδῆτε ὅτι ἐξουσίαν ἔχει ὁ υἱὸς τοῦ ἀνθρώπου ἐπὶ τῆς γῆς ἀφιέναι ἁμαρτίας.",
    "diagrama": [
        {"id":"mt96-1","type":"conjunction","text":"para que saibais (ἵνα εἰδῆτε)","greek":"ἵνα εἰδῆτε","strong":"G244","children":[
            {"id":"mt96-1a","type":"object","text":"que (ὅτι)","greek":"ὅτι","strong":"G3754"}
        ]},
        {"id":"mt96-2","type":"subject","text":"o Filho do Homem (ὁ υἱὸς τοῦ ἀνθρώπου)","greek":"ὁ υἱὸς τοῦ ἀνθρώπου","strong":"G5207","children":[
            {"id":"mt96-2a","type":"modifier","text":"tem poder (ἐξουσίαν ἔχει)","greek":"ἐξουσίαν ἔχει","strong":"G1849"},
            {"id":"mt96-2b","type":"adverbial","text":"na terra (ἐπὶ τῆς γῆς)","greek":"ἐπὶ τῆς γῆς","strong":"G1093"}
        ]},
        {"id":"mt96-3","type":"predicate","text":"perdoar (ἀφιέναι)","greek":"ἀφιέναι","strong":"G863","children":[
            {"id":"mt96-3a","type":"object","text":"pecados (ἁμαρτίας)","greek":"ἁμαρτίας","strong":"G266"}
        ]}
    ],
    "explicacao": "ἵνα final (propósito). εἰδῆτε = subjuntivo de εἶδον (ver). ἐξουσία = autoridade, poder delegado. O Filho do Homem (título messiânico de Dn 7:13) tem autoridade para perdoar.",
    "notas": ["ἵνα = conjunção final (para que)","εἰδῆτε = subjuntivo aoristo de εἶδον","ἐξουσία = autoridade, poder","ἀφιέναι = infinitivo presente de ἀφίημι (perdoar)"]
})
