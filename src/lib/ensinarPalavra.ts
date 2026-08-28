export interface PalavraParaEnsinar {
  strong: string;
  palavra: string;
  transliteracao: string;
  definicao: string;
  idioma: 'grego' | 'hebraico';
}

/** Por que *esta* palavra muda a leitura — não é glossário. */
const LICOES: Record<string, string> = {
  H7225:
    'Bereshit não é só «no começo»: marca que o tempo e o cosmos começam sob a Palavra de Deus. Sem isso, Gênesis vira cosmogonia; com isso, é teologia — Deus é anterior a tudo o que existe.',
  H1254:
    'Bará (criar) no AT quase sempre tem Deus como sujeito: o mundo não emana nem é moldado a partir de um rival. A leitura muda de «alguém fez» para «só o Senhor chama o que não era à existência».',
  H430:
    'Elohim é plural em forma, mas o verbo da criação é singular: majestade, não panteão. Ler «deuses» aqui é perder o monoteísmo que o texto afirma contra o antigo Oriente.',
  H6754:
    'Tselem (imagem) é representação real, não semelhança física. O ser humano não é um animal mais esperto: é vice-regente. Isso funda dignidade e mordomia, não tirania.',
  H3068:
    'O tetragrama (YHWH) é o Nome da aliança, não um título genérico. Quando o texto troca Elohim por YHWH, o Criador se apresenta como o Deus que se liga a um povo.',
  H7307:
    'Ruach é vento, fôlego e Espírito ao mesmo tempo. Reduzir a «energia» apaga a Pessoa que paira, inspira profetas e, no NT, habita a igreja.',
  H2617:
    'Hesed não é sentimentalismo: é lealdade de aliança que persiste quando o parceiro falha. Traduzir só «amor» esconde o juramento que sustenta o perdão.',
  H6664:
    'Tsedeq / justiça no hebraico é conformidade com a aliança, não só tribunal. O justo é quem vive alinhado ao caráter de Deus — e isso aponta para o Justo que justifica.',
  H539:
    'Aman (crer / ser firme) é apoiar-se, não opinar. A fé de Abraão em Gn 15:6 é confiança na promessa, o mesmo verbo que o NT lê como justificação.',
  G3056:
    'Logos não é «ideia» platônica solta: em João é a Palavra pessoal por quem tudo foi feito, que se fez carne. Sem isso, João 1 vira filosofia; com isso, é encarnação.',
  G26:
    'Agapē no NT não é gosto nem romance: é o amor que se dá (Jo 3:16; 1 Co 13). Trocar por «caridade» fria ou por sentimento esvazia a cruz.',
  G4102:
    'Pistis é confiança viva, não mero assentimento. Paulo opõe fé a obras da lei, não a obediência: crer é receber o que Deus fez em Cristo.',
  G1343:
    'Dikaiosynē (justiça) em Paulo é o status que Deus declara e o caminho que Ele exige. Sem o duplo sentido, Romanos vira moralismo ou antinomismo.',
  G5485:
    'Charis é favor imerecido, não «simpatia». A graça não é Deus relaxando a lei: é Deus cumprindo a lei em Cristo e nos dando o que não merecemos.',
  G4151:
    'Pneuma, como ruach, é vento e Espírito. No NT o Espírito é Pessoa que convence, habita e sela — não uma força impessoal.',
  G5547:
    'Christos é o Ungido, o Messias de Israel. «Cristo» como sobrenome apaga a espera do AT: Jesus é o Rei-Sacerdote prometido.',
  G2962:
    'Kyrios (Senhor) na LXX traduz YHWH. Confessar «Jesus é Senhor» não é educação: é atribuir a Jesus o Nome do Deus da aliança.',
  G386:
    'Anastasis é levantar-se de entre os mortos, corpo incluído. Espiritualizar a ressurreição esvazia 1 Coríntios 15 e a esperança cristã.',
  G3875:
    'Paraklētos é o que é chamado para o lado: advogado, consolador, auxiliar. O Espírito não substitui Jesus: torna presente o mesmo Cristo.',
  G2758:
    'Kenoō (esvaziar) em Fp 2 não é o Filho deixar de ser Deus: é recusar privilégio e assumir forma de servo até a cruz. A kenosis é humilhação, não perda de deidade.',
  G1577:
    'Ekklesia é assembleia convocada, não prédio. A igreja é o povo chamado para fora — Israel cumprido nas nações, não um clube religioso.',
  G2098:
    'Euangelion é notícia de vitória (o rei reina), não dica de autoajuda. O evangelho anuncia o que Deus fez; a ética vem depois, como fruto.',
  G1401:
    'Doulos é escravo / servo pertencente a um senhor. Paulo se chama doulos de Cristo: liberdade cristã é mudança de dono, não autonomia.',
  G5207:
    'Huios (filho) no NT pode ser adoção e, em Jesus, Filho unigênito. Confundir os dois apaga a distinção entre o eterno Filho e os filhos por graça.',
  G4561:
    'Sarx (carne) em Paulo é a natureza humana caída, não o corpo em si (que será ressuscitado). «Carnal» não é «físico»: é viver contra o Espírito.',
  G2222:
    'Zōē em João é vida divina comunicada, não só batimento. «Vida eterna» começa agora, conhecendo o Pai e o Filho — qualidade, não só duração.',
  G225:
    'Alētheia é verdade como revelação e fidelidade, não só dado correto. Jesus não ensina a verdade: Ele a é (Jo 14:6).',
  G3340:
    'Metanoeō é mudar de mente e rumo, não só sentir culpa. O chamado de Jesus é conversão: voltar-se para o Reino que chegou.',
  G863:
    'Aphiēmi (perdoar / deixar ir) é soltar a dívida. O perdão no NT não minimiza o pecado: o credor paga o custo e liberta o devedor.',
  G40:
    'Hagios (santo) é separado para Deus. Santidade não é asco do mundo: é pertencer ao Santo, e por isso ser diferente no mundo.',
};

function definicaoCurta(def: string): string {
  const limpa = def.replace(/\s+/g, ' ').trim();
  const corte = limpa.split(/[.;]/)[0] ?? limpa;
  return corte.length > 80 ? `${corte.slice(0, 77)}…` : corte;
}

export function ensinarPalavra(p: PalavraParaEnsinar): string {
  const codigo = p.strong.toUpperCase().replace(/^([GH])0+/, '$1');
  const curada = LICOES[codigo] ?? LICOES[p.strong.toUpperCase()];
  if (curada) return curada;

  const idioma = p.idioma === 'grego' ? 'grego' : 'hebraico';
  const gloss = definicaoCurta(p.definicao) || p.transliteracao;
  return (
    `${p.palavra} (${p.transliteracao}) no ${idioma} não é só o glossário «${gloss}». ` +
    `Essa nuance é o que o autor estava fazendo neste versículo — em português, sem o original, a frase tende a ficar mais rasa do que o texto.`
  );
}
