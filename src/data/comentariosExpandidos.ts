export interface ComentarioExpandido {
  livro: string;
  capitulo: number;
  versiculo: number;
  titulo: string;
  resumo: string;
  comentarios: ComentarioTeologico[];
  referencias?: string[];
}

export interface ComentarioTeologico {
  teologo: string;
  periodo: 'patristico' | 'medieval' | 'reforma' | 'moderno' | 'contemporaneo';
  tradicao: 'reformada' | 'arminiana' | 'catolica' | 'ortodoxa' | 'pentecostal' | 'luterana' | 'evangelical' | 'bautista' | 'metodista';
  texto: string;
  obra: string;
  ano?: number;
}

function chave(livro: string, capitulo: number, versiculo: number): string {
  return `${livro}:${capitulo}:${versiculo}`;
}

const comentariosExpandidos: Record<string, ComentarioExpandido> = {};

function add(
  livro: string, cap: number, v: number,
  titulo: string, resumo: string,
  comentarios: ComentarioTeologico[],
  referencias?: string[]
) {
  const k = chave(livro, cap, v);
  comentariosExpandidos[k] = { livro, capitulo: cap, versiculo: v, titulo, resumo, comentarios, referencias };
}


// ====================================================================
// PENTATEUCO
// ====================================================================

add('gn', 1, 1, 'Criação dos Céus e da Terra',
  'O versículo fundamental da cosmovisão bíblica: Deus como Criador soberano.',
  [
    { teologo: 'João Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'No princípio Deus criou os céus e a terra. A soberania de Deus como Criador é estabelecida. O hebraico «bereshit» indica o início absoluto da criação.', obra: 'Comentário ao Gênesis', ano: 1554 },
    { teologo: 'Tomás de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'A criação ex nihilo é ato da onipotência divina. O Filho é o Verbo pelo qual todas as coisas foram feitas.', obra: 'Suma Teológica', ano: 1274 },
    { teologo: 'Agostinho de Hipona', periodo: 'patristico', tradicao: 'catolica', texto: 'O «princípio» não se refere ao tempo, mas ao Princípio absoluto. A criação não é eterna; começou pela vontade de Deus.', obra: 'De Genesi ad Litteram', ano: 401 },
    { teologo: 'Martinho Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'A palavra «Deus» revela Sua onipotência: basta um comando para que a criação exista.', obra: 'Comentário ao Gênesis', ano: 1544 },
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'O Gênesis começa com a criação como introdução à história da aliança.', obra: 'The New Testament and the People of God', ano: 1992 },
  ],
  ['Jn 1:1-3', 'Cl 1:16', 'Hb 11:3']
);

add('gn', 1, 26, 'Imagem de Deus na Humanidade',
  'A criação do homem à imagem e semelhança de Deus, fundamento da dignidade humana.',
  [
    { teologo: 'João Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'O plural revela a Trindade. A imagem inclui conhecimento, justiça e santidade.', obra: 'Institutas da Religião Cristã', ano: 1536 },
    { teologo: 'Agostinho de Hipona', periodo: 'patristico', tradicao: 'catolica', texto: 'Imagem refere-se à natureza racional; semelhança à virtude moral original.', obra: 'De Trinitate', ano: 517 },
    { teologo: 'João Crisóstomo', periodo: 'patristico', tradicao: 'ortodoxa', texto: 'A imagem divina inclui livre-arbítrio, domínio e capacidade de conhecer a Deus.', obra: 'Homilias sobre Gênesis', ano: 390 },
    { teologo: 'Tomás de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'A imagem se refere ao intelecto e à vontade livre.', obra: 'Suma Teológica', ano: 1274 },
  ],
  ['1 Co 11:7', 'Tg 3:9', 'Cl 3:10']
);

add('gn', 3, 15, 'O Proto-evangelium',
  'A primeira promessa messiânica de vitória sobre o pecado.',
  [
    { teologo: 'João Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A semente da mulher esmagará a cabeça da serpente. Cristo vence Satanás na cruz.', obra: 'Comentário ao Gênesis', ano: 1554 },
    { teologo: 'Agostinho de Hipona', periodo: 'patristico', tradicao: 'catolica', texto: 'A raiz de toda a história da salvação: o cumprimento é em Cristo.', obra: 'De Civitate Dei', ano: 426 },
    { teologo: 'Tomás de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Satanás feriu o calcanhar de Cristo na cruz, mas teve sua cabeça esmagada.', obra: 'Suma Contra os Gentios', ano: 1274 },
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'O primeiro Evangelho pregado no Éden.', obra: 'Comentário ao Gênesis', ano: 1544 },
  ],
  ['Rm 16:20', 'Gl 3:16', '1 Jo 3:8']
);

add('gn', 12, 1, 'O Chamado de Abraão',
  'O chamado divino que inicia a história da aliança.',
  [
    { teologo: 'João Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A aliança exige separação e obediência pela fé.', obra: 'Comentário ao Gênesis', ano: 1554 },
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'A eleição não é privilégio, mas missão: ser bênção para todas as nações.', obra: 'The New Testament and the People of God', ano: 1992 },
    { teologo: 'John Piper', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Deus chama um povo como meio de bênção para o mundo.', obra: 'Let the Nations Be Glad', ano: 1993 },
  ],
  ['Gl 3:8-9', 'Hb 11:8-10']
);

add('gn', 15, 6, 'Abraão Crê e É Justificado',
  'O versículo fundamental da justificação pela fé.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Versículo central da justificação pela fé. Aqui está o «sola fide» da Reforma.', obra: 'Comentário aos Gálatas', ano: 1535 },
    { teologo: 'João Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A imputação da justiça: fé é instrumento, não mérito.', obra: 'Institutas', ano: 1536 },
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'A fé é confiança ativa na promessa de Deus.', obra: 'Justification', ano: 2009 },
    { teologo: 'Tomás de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'A fé justificante é formada pelo amor.', obra: 'Suma Teológica', ano: 1274 },
  ],
  ['Rm 4:3-5', 'Gl 3:6-9', 'Tg 2:23']
);

add('gn', 22, 1, 'O Sacrifício de Isaque',
  'O teste supremo da fé e a tipologia do sacrifício de Cristo.',
  [
    { teologo: 'Kierkegaard', periodo: 'moderno', tradicao: 'luterana', texto: 'O paradoxo da fé que obedece quando não compreende.', obra: 'Temor e Tremor', ano: 1843 },
    { teologo: 'João Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Jehovah Jireh: o cordeiro substituto prefigurado.', obra: 'Comentário ao Gênesis', ano: 1554 },
    { teologo: 'Tomás de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'O Pai dá o Filho unigênito. Deus impediu Abraão, mas não a Si mesmo.', obra: 'Suma Contra os Gentios', ano: 1274 },
  ],
  ['Hb 11:17-19', 'Tg 2:21-23']
);

// ÊXODO
add('ex', 3, 14, 'A Revelação do Nome Divino',
  'O nome «Eu Sou o que Sou»: autoexistência eterna de Deus.',
  [
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Deus é o Ser absoluto, sem começo nem fim.', obra: 'Tratados sobre João', ano: 418 },
    { teologo: 'Tomás de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Deus é ato puro, sem potencialidade.', obra: 'Suma Teológica', ano: 1274 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Autoexistente, imutável e fiel às promessas.', obra: 'Comentário ao Êxodo', ano: 1561 },
  ],
  ['Jo 8:58', 'Ap 1:8', 'Is 43:10']
);

add('ex', 12, 1, 'A Instituição da Páscoa',
  'O cordeiro pascal como tipo de Cristo.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Tipologia cristológica: o cordeiro prefigura Cristo.', obra: 'Comentário ao Êxodo', ano: 1561 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Nossa Páscoa, Cristo, foi sacrificado por nós.', obra: 'Sermões', ano: 410 },
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'O sangue é sinal da graça invisível pela fé.', obra: 'Sermões', ano: 1530 },
  ],
  ['1 Co 5:7', '1 P 1:19', 'Jo 1:29']
);

add('ex', 20, 1, 'Os Dez Mandamentos',
  'A revelação da lei moral de Deus.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A lei revela a vontade de Deus e aponta para Cristo.', obra: 'Institutas', ano: 1536 },
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'O primeiro mandamento: só Deus merece adoração.', obra: 'Os Catecismos', ano: 1529 },
    { teologo: 'Tomás de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'A lei natural e divina se harmonizam.', obra: 'Suma Teológica', ano: 1274 },
  ],
  ['Mt 22:37-40', 'Rm 7:7-12', 'Gl 3:24']
);

add('ex', 34, 6, 'O Caráter de Deus Revelado',
  'A revelação mais completa do caráter de Deus no AT.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Misericórdia e graça são os atributos primários.', obra: 'Comentário ao Êxodo', ano: 1561 },
    { teologo: 'Tomás de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Deus se define pela bondade, não pela severidade.', obra: 'Suma Teológica', ano: 1274 },
  ],
  ['Nm 14:18', 'Sl 86:15', 'Jl 2:13']
);

// LEVÍTICO
add('lv', 16, 2, 'O Dia da Expiação',
  'A expiação pelo pecado de todo o povo.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Prefigura Cristo entrando no céu com seu próprio sangue.', obra: 'Comentário ao Levítico', ano: 1561 },
    { teologo: 'Tomás de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'O bode expiatório carrega os pecados, como Cristo.', obra: 'Suma Teológica', ano: 1274 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Prefigura a morte e ressurreição de Cristo.', obra: 'Sermões', ano: 405 },
  ],
  ['Hb 9:7-14', '1 Jo 2:2']
);

// NÚMEROS
add('nu', 21, 8, 'A Serpente de Bronze',
  'O tipo de Cristo crucificado.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Cristo erguido para que todos que olharem vivam.', obra: 'Comentário aos Números', ano: 1561 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Cristo aplica este tipo em João 3:14.', obra: 'Sermões', ano: 410 },
  ],
  ['Jo 3:14-15']
);

// DEUTERÔMIO
add('dt', 6, 4, 'O Shema de Israel',
  'O versículo central da fé judaica.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'O monoteísmo é o fundamento da fé.', obra: 'Comentário ao Deuteronômio', ano: 1561 },
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'O primeiro e grande mandamento.', obra: 'Os Catecismos', ano: 1529 },
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Jesus cita este versículo como o maior mandamento.', obra: 'Jesus and the Victory of God', ano: 1996 },
  ],
  ['Mc 12:29-30', 'Mt 22:37']
);

add('dt', 30, 19, 'Escolha a Vida',
  'A exortação de Moisés: escolher pela obediência.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A soberania não anula a responsabilidade humana.', obra: 'Comentário ao Deuteronômio', ano: 1561 },
    { teologo: 'Wesley', periodo: 'moderno', tradicao: 'arminiana', texto: 'A graça capacita a escolha.', obra: 'Sermões', ano: 1750 },
  ],
  ['Js 24:15', 'Mt 7:13-14']
);

// ====================================================================
// HISTÓRICOS
// ====================================================================

add('js', 1, 9, 'Coragem e Presença de Deus',
  'A comissão a Josué: seja forte e corajoso.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A presença de Deus é a fonte da coragem.', obra: 'Comentário a Josué', ano: 1561 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'A onipresença de Deus é conforto supremo.', obra: 'Sermões', ano: 1870 },
  ],
  ['Hb 13:5', 'Mt 28:20']
);

add('jz', 2, 16, 'O Ciclo dos Juízes',
  'Pecado, opressão, clamor e livramento.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Deus não abandona Seu povo.', obra: 'Comentário aos Juízes', ano: 1561 },
    { teologo: 'Matthew Henry', periodo: 'moderno', tradicao: 'reformada', texto: 'Consequências de fazer o que parece certo aos olhos.', obra: 'Comentário Completo', ano: 1708 },
  ]
);

add('1sm', 16, 7, 'Deus Vê o Coração',
  'Deus não olha a aparência, mas o coração.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Deus avalia pelo critério divino, não humano.', obra: 'Comentário ao 1 Samuel', ano: 1561 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Humilha os orgulhosos e conforta os humildes.', obra: 'Sermões', ano: 1870 },
  ],
  ['1 Co 1:27-29']
);

add('2sm', 7, 12, 'A Aliança Davídica Eterna',
  'A promessa de um reino eterno no Messias.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'O Filho de Davi é o Messias eterno.', obra: 'Comentário ao 2 Samuel', ano: 1561 },
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Jesus cumpre a promessa com reino eterno.', obra: 'Jesus and the Victory of God', ano: 1996 },
    { teologo: 'Tomás de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'A aliança tipológica: rei humano prefigura o Messias.', obra: 'Suma Teológica', ano: 1274 },
  ],
  ['Lc 1:32-33', 'At 2:29-32', 'Sl 89:3-4']
);

add('1rs', 8, 27, 'A Grandeza de Deus',
  'Nem os céus podem conter a Deus.',
  [
    { teologo: 'Tomás de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Deus não habita em templos feitos por mãos.', obra: 'Suma Teológica', ano: 1274 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A onipresença de Deus: não pode ser confinado.', obra: 'Comentário aos Reis', ano: 1561 },
  ],
  ['At 17:24-25', 'Is 66:1']
);

// ====================================================================
// POÉTICOS
// ====================================================================

add('jb', 19, 25, 'A Confiança na Ressurreição',
  'Jó confia no Redentor vivo.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'No sofrimento, a esperança da ressurreição brilha.', obra: 'Comentário ao Jó', ano: 1561 },
    { teologo: 'Tomás de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Uma das mais antigas confissões de fé na ressurreição.', obra: 'Suma Teológica', ano: 1274 },
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'A ressurreição é a resposta ao sofrimento.', obra: 'Church Dogmatics', ano: 1951 },
  ],
  ['Hb 11:19', '1 Co 15:12-22']
);

add('sl', 2, 7, 'O Messias Filho de Deus',
  'Salmo messiânico mais citado no NT.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A relação Pai-Filho é eterna.', obra: 'Comentário aos Salmos', ano: 1557 },
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Citado em Hb 1:5 e At 13:33.', obra: 'The New Testament and the People of God', ano: 1992 },
  ],
  ['Hb 1:5', 'At 13:33']
);

add('sl', 16, 10, 'A Ressurreição do Santo',
  'Profecia messiânica da ressurreição.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Deus não permite que Seu Santo veja a corrupção.', obra: 'Comentário aos Salmos', ano: 1557 },
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Pedro cita em Atos 2 como profecia da ressurreição.', obra: 'Sermões', ano: 1530 },
  ],
  ['At 2:25-32', 'At 13:35-37']
);

add('sl', 22, 1, 'Deus Meu, Por Que Me Desamparaste?',
  'O salmo que descreve o sofrimento do Messias.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Palavras citadas por Jesus na cruz.', obra: 'Comentário aos Salmos', ano: 1557 },
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Deus abandona o Filho para que nunca sejamos abandonados.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Tomás de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Detalhes precisos da crucificação.', obra: 'Suma Teológica', ano: 1274 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Do grito de abandono à vitória.', obra: 'Sermões', ano: 1865 },
  ],
  ['Mt 27:35', 'Mt 27:46', 'Mc 15:24', 'Jo 19:24']
);

add('sl', 23, 1, 'O Senhor É o Meu Pastor',
  'O salmo mais amado da história.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Cuidado pessoal, provisão e proteção.', obra: 'Comentário aos Salmos', ano: 1557 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'O Pastor onipotente supre todas as necessidades.', obra: 'Salmo 23', ano: 1865 },
    { teologo: 'Tim Keller', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Mesmo no vale da sombra, Deus está presente.', obra: 'Walking with God', ano: 2013 },
    { teologo: 'Crisóstomo', periodo: 'patristico', tradicao: 'ortodoxa', texto: 'Descanso e nutrição espiritual.', obra: 'Homilias', ano: 390 },
  ],
  ['Jo 10:11-14', '1 P 2:25', 'Is 40:11']
);

add('sl', 51, 10, 'Coração Puro, Ó Deus',
  'O clímax do maior salmo de arrependimento.',
  [
    { teologo: 'Wesley', periodo: 'moderno', tradicao: 'arminiana', texto: 'A regeneração é obra do Espírito.', obra: 'Sermões', ano: 1750 },
    { teologo: 'R.C. Sproul', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'A alegria pode ser perdida, mas restaurada pela graça.', obra: 'The Holiness of God', ano: 1985 },
    { teologo: 'Tomás de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'O coração contrito é o sacrifício aceito.', obra: 'Suma Teológica', ano: 1274 },
  ],
  ['Jo 3:3-7', 'Ef 2:1-5', '1 Jo 1:9']
);

add('sl', 119, 105, 'A Palavra como Guia',
  'A suficiência das Escrituras.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Sem a Escritura, andamos em trevas.', obra: 'Os Catecismos', ano: 1529 },
    { teologo: 'Matthew Henry', periodo: 'moderno', tradicao: 'reformada', texto: 'A Palavra ilumina passo a passo.', obra: 'Comentário Completo', ano: 1708 },
    { teologo: 'R.C. Sproul', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'A suficiência da Escritura.', obra: 'Scripture Alone', ano: 2005 },
  ],
  ['2 Tm 3:16-17', '2 P 1:19-21']
);

add('sl', 139, 1, 'Deus Me Conhece',
  'A onisciência de Deus.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Deus conhece cada pensamento e ação.', obra: 'Comentário aos Salmos', ano: 1557 },
    { teologo: 'John Piper', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'A preciosidade de cada pessoa como obra-prima.', obra: 'Sermões', ano: 2000 },
  ],
  ['Hb 4:13', 'Mt 6:4-6']
);

add('pv', 3, 5, 'Confiar em Deus',
  'Confiança absoluta sem depender do próprio entendimento.',
  [
    { teologo: 'Wesley', periodo: 'moderno', tradicao: 'arminiana', texto: 'Exclui a dependência da própria compreensão.', obra: 'Sermões', ano: 1750 },
    { teologo: 'Tim Keller', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Humildade intelectual: Deus vê o que não vemos.', obra: 'Proverbs for Today', ano: 2014 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Deus guia quem O reconhece.', obra: 'Sermões', ano: 1870 },
  ],
  ['Rm 12:1-2', 'Ef 3:17']
);

add('pv', 8, 22, 'A Sabedoria Personificada',
  'Prefiguração do Logos divino.',
  [
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'A Sabedoria prefigura o Logos eterno.', obra: 'De Trinitate', ano: 517 },
    { teologo: 'Tomás de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Co-eterna com Deus.', obra: 'Suma Teológica', ano: 1274 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A Sabedoria é Cristo, o Verbo eterno.', obra: 'Comentário a Provérbios', ano: 1561 },
  ],
  ['Jo 1:1-3', 'Cl 1:15-17']
);

add('pv', 30, 5, 'Toda Palavra de Deus é Provada',
  'A pureza da Escritura.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Pura, sem defeito ou erro.', obra: 'Institutas', ano: 1536 },
    { teologo: 'R.C. Sproul', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Testada e purificada. Não é Palavra de homens.', obra: 'Knowing Scripture', ano: 1977 },
  ],
  ['2 Tm 3:16-17', 'Sl 12:6']
);

add('ec', 12, 13, 'O Fim de Toda a Instrução',
  'Conclusão: temer a Deus e guardar mandamentos.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Após toda vaidade: obediência a Deus.', obra: 'Comentário a Eclesiastes', ano: 1561 },
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'A fé simples supera a filosofia complexa.', obra: 'Sermões', ano: 1530 },
  ],
  ['Dt 10:12', 'Jó 28:28']
);

add('ct', 8, 6, 'A Força do Amor',
  'O amor é forte como a morte.',
  [
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Morte e amor são as forças mais poderosas.', obra: 'Confissões', ano: 398 },
    { teologo: 'Tomás de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'O amor é inextinguível. Alegoria de Deus e a igreja.', obra: 'Suma Teológica', ano: 1274 },
  ],
  ['1 Jo 4:7-12', 'Ef 5:25-32']
);


// ====================================================================
// PROFETAS
// ====================================================================

add('is', 7, 14, 'A Profecia de Immanuel',
  'Nascimento virginal predito.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Cumprida em Cristo. Mateus 1:23 cita.', obra: 'Comentário a Isaías', ano: 1551 },
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Deus conosco: a presença divina na encarnação.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Tomás de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Nascimento virginal: acima da natureza.', obra: 'Suma Teológica', ano: 1274 },
    { teologo: 'Atanásio', periodo: 'patristico', tradicao: 'catolica', texto: 'A encarnação é obra da Trindade.', obra: 'Contra Ários', ano: 318 },
  ],
  ['Mt 1:22-23', 'Lc 1:26-35']
);

add('is', 9, 6, 'Um Menino Nos Nasceu',
  'Os títulos do rei messiânico.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'O eterno se faz tempo, o infinito se faz finito.', obra: 'Sermões de Natal', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Conselheiro maravilhoso: sabedoria de Deus.', obra: 'Comentário a Isaías', ano: 1551 },
    { teologo: 'Crisóstomo', periodo: 'patristico', tradicao: 'ortodoxa', texto: 'Pai eterno: o Filho que nasce é eterno.', obra: 'Homilias', ano: 398 },
    { teologo: 'Tomás de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Deus forte, Pai eterno, Príncipe da Paz.', obra: 'Suma Teológica', ano: 1274 },
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'O governo sem fim.', obra: 'Jesus and the Victory of God', ano: 1996 },
  ],
  ['Lc 1:32-33', 'Lc 2:11']
);

add('is', 11, 1, 'O Renoso de Jessé',
  'O Messias da linhagem de Davi.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Brotou do tronco aparentemente cortado.', obra: 'Comentário a Isaías', ano: 1551 },
    { teologo: 'Tomás de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'O Espírito repousará sem medida.', obra: 'Suma Teológica', ano: 1274 },
  ],
  ['Rm 15:12', 'Ap 5:5', 'Mt 1:1']
);

add('is', 40, 3, 'A Voz no Deserto',
  'Cumprida em João Batista.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'João como arauto do Messias.', obra: 'Comentário a Isaías', ano: 1551 },
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Deus vem pessoalmente através do deserto.', obra: 'Jesus and the Victory of God', ano: 1996 },
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'O Deus que vem é juiz e salvador.', obra: 'Church Dogmatics', ano: 1951 },
  ],
  ['Mt 3:1-3', 'Mc 1:2-4']
);

add('is', 52, 13, 'O Servo Sofredor Inicia',
  'O início da seção central do Servo Sofredor.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'O Servo será exaltado após a humilhação.', obra: 'Comentário a Isaías', ano: 1551 },
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'A ironia divina: vitória através da derrota.', obra: 'Church Dogmatics', ano: 1951 },
  ],
  ['Fp 2:5-11', 'Hb 5:7-8']
);

add('is', 53, 5, 'Pelas Suas Chagas Sararemos',
  'O mais importante poema profético do AT.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A satisfação vicária: Cristo paga nosso pecado.', obra: 'Comentário a Isaías', ano: 1551 },
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'A cura vem pelo sacrifício substitutivo.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Tomás de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Ele paga o que devíamos.', obra: 'Suma Teológica', ano: 1274 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Vitória na aparente derrota.', obra: 'Sermões', ano: 410 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'A submissão voluntária: não abre a boca.', obra: 'Sermões', ano: 1870 },
  ],
  ['1 P 2:24-25', '1 P 3:18', '2 Co 5:21', 'Rm 4:25']
);

add('is', 53, 10, 'O Senhor Quis Mará-lo',
  'A vontade de Deus no sofrimento do Servo.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Não é acidente, mas propósito.', obra: 'Sermões', ano: 1530 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A oblação voluntária é fundamento da salvação.', obra: 'Comentário a Isaías', ano: 1551 },
  ],
  ['Hb 9:14', 'Ef 5:2', '1 Jo 4:10']
);

add('is', 53, 12, 'Intercedeu por Muitos',
  'O Servo Sofredor intercede.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Seu sofrimento é frutífero.', obra: 'The New Testament and the People of God', ano: 1992 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A intercessão é o fruto da obra redentora.', obra: 'Comentário a Isaías', ano: 1551 },
  ],
  ['Hb 7:25', 'Rm 8:34', '1 Jo 2:1']
);

add('is', 55, 1, 'Vinde, Sem Dinheiro',
  'O convite à graça gratuita.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'O convite é universal e gratuito.', obra: 'Sermões', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A salvação é dom gratuito.', obra: 'Comentário a Isaías', ano: 1551 },
  ],
  ['Mt 11:28-30', 'Ap 22:17']
);

add('is', 61, 1, 'O Espírito do Senhor É Sobre Mim',
  'Jesus declara cumprimento na sinagoga.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: '«Hoje se cumpriu este texto».', obra: 'Jesus and the Victory of God', ano: 1996 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A unção trinitária para a missão.', obra: 'Comentário a Isaías', ano: 1551 },
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'O jubileu escatológico em Cristo.', obra: 'Church Dogmatics', ano: 1951 },
  ],
  ['Lc 4:16-21']
);

// JEREMIAS
add('jr', 23, 5, 'O Renovo Justo',
  'O rei justo da casa de Davi.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Um rei justo que governa com retidão.', obra: 'Comentário a Jeremias', ano: 1561 },
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Cristo é a justiça que Deus dá.', obra: 'The New Testament and the People of God', ano: 1992 },
  ],
  ['Lc 1:68-69']
);

add('jr', 29, 11, 'Planos de Paz',
  'Deus tem planos de esperança.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'A esperança é real.', obra: 'Sermões', ano: 1870 },
    { teologo: 'Tim Keller', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Deus trabalha no exílio.', obra: 'Walking with God', ano: 2013 },
  ],
  ['Rm 8:28', 'Ef 2:10']
);

add('jr', 31, 31, 'A Nova Aliança',
  'A profecia central da nova aliança.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Lei no coração, perdão, conhecimento direto.', obra: 'Comentário a Jeremias', ano: 1561 },
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'A transformação interior pelo Espírito.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Crisóstomo', periodo: 'patristico', tradicao: 'ortodoxa', texto: 'Conhecimento direto de Deus.', obra: 'Homilias', ano: 398 },
    { teologo: 'Tomás de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Cumprida em Cristo.', obra: 'Suma Teológica', ano: 1274 },
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'A graça substitui a lei.', obra: 'Disputas', ano: 1521 },
  ],
  ['Lc 22:20', '2 Co 3:6', 'Hb 8:6-13']
);

add('jr', 33, 14, 'A Aliança Nova',
  'A promessa renovada.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Deus cumprirá a promessa.', obra: 'Comentário a Jeremias', ano: 1561 },
    { teologo: 'Tomás de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'O Messias é a aliança pessoal.', obra: 'Suma Teológica', ano: 1274 },
  ],
  ['Lc 1:72-73', 'Hb 8:8-12']
);

// LAMENTAÇÕES
add('lm', 3, 22, 'Misericórdias Novas Cada Manhã',
  'A misericórdia de Deus não se esgota.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Frescas, não recicladas.', obra: 'Sermões', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A esperança não é cortada no julgamento.', obra: 'Comentário a Lamentações', ano: 1561 },
    { teologo: 'Tim Keller', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Esperança em meio à destruição.', obra: 'Walking with God', ano: 2013 },
  ],
  ['Sl 36:7-9', 'Lm 3:23-26']
);

// EZEQUIEL
add('ez', 36, 26, 'Coração Novo',
  'A promessa de regeneração.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A regeneração é obra soberana de Deus.', obra: 'Comentário a Ezequiel', ano: 1566 },
    { teologo: 'Wesley', periodo: 'moderno', tradicao: 'arminiana', texto: 'Sem regeneração, não há mudança.', obra: 'Sermões', ano: 1750 },
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'O novo coração é dádiva do Espírito.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Tomás de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Obediência espontânea pela graça.', obra: 'Suma Teológica', ano: 1274 },
  ],
  ['Jo 3:3-7', '2 Co 5:17']
);

add('ez', 37, 1, 'O Vale dos Ossos Secos',
  'A visão da ressurreição.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A vida retorna pelo Espírito.', obra: 'Comentário a Ezequiel', ano: 1566 },
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Aponta para a ressurreição corporal.', obra: 'The Resurrection of the Son of God', ano: 2003 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Deus traz vida onde há morte.', obra: 'Sermões', ano: 1870 },
  ],
  ['1 Co 15:35-49']
);

add('ez', 47, 1, 'O Rio da Vida',
  'A水流 que brota do templo.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A graça de Deus flui abundantemente.', obra: 'Comentário a Ezequiel', ano: 1566 },
    { teologo: 'Tomás de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'O rio prefigura as águas do batismo.', obra: 'Suma Teológica', ano: 1274 },
  ],
  ['Ap 22:1', 'Jo 7:37-38', 'Zc 14:8']
);

// DANIEL
add('dn', 7, 13, 'O Filho do Homem Recebe Domínio',
  'A visão apocalíptica.',
  [
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Jesus se identifica com esta figura.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Reinos humanos passageiros, reino de Deus eterno.', obra: 'Jesus and the Victory of God', ano: 1996 },
    { teologo: 'Tomás de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Toda criatura O servirá.', obra: 'Suma Teológica', ano: 1274 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Cristo reina para sempre.', obra: 'Comentário a Daniel', ano: 1561 },
  ],
  ['Mt 26:64', 'Ap 1:7', 'Ap 1:13']
);

add('dn', 9, 24, 'As Setenta Semanas',
  'Profecia messiânica cronológica.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Cronologia messiânica precisa.', obra: 'Comentário a Daniel', ano: 1561 },
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Cumprimento em Jesus.', obra: 'The New Testament and the People of God', ano: 1992 },
  ],
  ['Lc 24:27', 'At 3:18']
);

// OSÉIAS
add('os', 11, 1, 'Do Egito Chamei Meu Filho',
  'Tipologia cumprida em Cristo.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Cristo cumpre o que Israel falhou.', obra: 'Comentário a Oséias', ano: 1561 },
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Jesus é o Filho fiel.', obra: 'Jesus and the Victory of God', ano: 1996 },
  ],
  ['Mt 2:15']
);

add('os', 13, 14, 'Ó Morte, Onde Está o Teu Aguilhão?',
  'A vitória sobre a morte.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Deus destruirá a morte.', obra: 'Comentário a Oséias', ano: 1561 },
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Citado por Paulo em 1 Coríntios 15.', obra: 'The Resurrection of the Son of God', ano: 2003 },
  ],
  ['1 Co 15:55-57']
);

// JOEL
add('jl', 2, 28, 'Derramarei do Meu Espírito',
  'A promessa cumprida em Pentecostes.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A promessa se estende a todos.', obra: 'Comentário a Joel', ano: 1561 },
    { teologo: 'Tomás de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'O Espírito é o selo da nova aliança.', obra: 'Suma Teológica', ano: 1274 },
  ],
  ['At 2:16-18']
);

// AMÓS
add('am', 5, 24, 'Corra a Justiça como Água',
  'A demanda por justiça social.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Religião sem justiça é repugnante.', obra: 'Sermões', ano: 1530 },
    { teologo: 'John Stott', periodo: 'contemporaneo', tradicao: 'evangelical', texto: 'Fé cristã exige justiça social.', obra: 'Issues Facing Christians Today', ano: 1990 },
  ],
  ['Mt 25:31-46', 'Tg 2:14-17']
);

// Miquéias
add('mc', 5, 2, 'De Belém Sahirá',
  'O nascimento messiânico.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Mateus 2:6 cita.', obra: 'Comentário a Miquéias', ano: 1561 },
    { teologo: 'Tomás de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Dupla natureza: Belém e eternidade.', obra: 'Suma Teológica', ano: 1274 },
  ],
  ['Mt 2:5-6', 'Lc 2:4-7']
);

// NAUM
add('na', 1, 7, 'O Senhor é Bom',
  'Refúgio no dia da aflição.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Deus é bom e seguro.', obra: 'Comentário a Naum', ano: 1561 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Deus é refugio em todo sofrimento.', obra: 'Sermões', ano: 1870 },
  ],
  ['Sl 46:1', 'Sl 91:2']
);

// HABACUQUE
add('ha', 2, 4, 'O Justo Viverá pela Fé',
  'Versículo fundamental da justificação.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Portal para o evangelicalismo.', obra: 'Comentário aos Gálatas', ano: 1535 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Citado em Rm 1:17 e Gl 3:11.', obra: 'Institutas', ano: 1536 },
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'A fé é o meio do justo viver.', obra: 'Justification', ano: 2009 },
  ],
  ['Rm 1:17', 'Gl 3:11', 'Hb 10:38']
);

// ZACARIAS
add('zc', 9, 9, 'O Rei Humilde',
  'A entrada em Jerusalém.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Rei pacífico, não militar.', obra: 'Comentário a Zacarias', ano: 1561 },
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Entrada deliberada como rei humilde.', obra: 'Jesus and the Victory of God', ano: 1996 },
    { teologo: 'Tomás de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'O jumento simboliza humildade.', obra: 'Suma Teológica', ano: 1274 },
  ],
  ['Mt 21:1-11', 'Lc 19:28-40']
);

add('zc', 12, 10, 'Olharão Para Quem Traspassaram',
  'Lamento pelo Messias.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'João 19:37 cita.', obra: 'Comentário a Zacarias', ano: 1561 },
    { teologo: 'Tomás de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Deus fala em primeira pessoa.', obra: 'Suma Teológica', ano: 1274 },
  ],
  ['Jo 19:34-37']
);

// MALAQUIAS
add('ml', 3, 1, 'O Anjo da Aliança',
  'O preparo para o Messias.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'João Batista prepara o caminho.', obra: 'Sermões', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'João como arauto.', obra: 'Comentário a Malaquias', ano: 1561 },
  ],
  ['Mt 11:10', 'Mc 1:2', 'Lc 1:17']
);


// ====================================================================
// EVANGELHOS
// ====================================================================

add('mt', 1, 23, 'Emmanuel — Deus Conosco',
  'O cumprimento da profecia na encarnação.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Deus conosco: o cumprimento de Isaías 7:14.', obra: 'Comentário a Mateus', ano: 1555 },
    { teologo: 'Tomás de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'A união hipostática: Deus e homem.', obra: 'Suma Teológica', ano: 1274 },
  ],
  ['Is 7:14']
);

add('mt', 5, 1, 'As Beatitudes',
  'O discurso inaugural de Jesus.',
  [
    { teologo: 'Wesley', periodo: 'moderno', tradicao: 'arminiana', texto: 'Humildade é a porta do reino.', obra: 'Sermões', ano: 1750 },
    { teologo: 'Tim Keller', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Paradoxais: bem-aventurados os fracos.', obra: "King's Cross", ano: 2011 },
    { teologo: 'Tomás de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Virtudes cristãs descritas.', obra: 'Suma Teológica', ano: 1274 },
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'A constituição do reino.', obra: 'After You Believe', ano: 2010 },
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Retrato de Jesus Cristo.', obra: 'Church Dogmatics', ano: 1951 },
  ],
  ['Lc 6:20-26']
);

add('mt', 5, 17, 'Não Vim Derrogar a Lei',
  'Cumprimento, não abrogação.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A lei encontra cumprimento em Cristo.', obra: 'Comentário a Mateus', ano: 1555 },
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'De forma inesperada.', obra: 'Jesus and the Victory of God', ano: 1996 },
    { teologo: 'Tomás de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Obedece onde nós falhamos.', obra: 'Suma Teológica', ano: 1274 },
  ],
  ['Rm 8:3-4']
);

add('mt', 11, 28, 'Vinde a Mim, Todos os Cansados',
  'O convite mais doce.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Descanso para oprimidos.', obra: 'Sermões', ano: 1870 },
    { teologo: 'Crisóstomo', periodo: 'patristico', tradicao: 'ortodoxa', texto: 'Recebe todos os que vêm.', obra: 'Homilias', ano: 390 },
    { teologo: 'Wesley', periodo: 'moderno', tradicao: 'arminiana', texto: 'A mansidão como modelo.', obra: 'Sermões', ano: 1750 },
    { teologo: 'Tim Keller', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Liberdade do trabalho servil.', obra: "King's Cross", ano: 2011 },
  ],
  ['Is 55:1', 'Mt 11:29-30']
);

add('mt', 16, 16, 'Tu és o Cristo',
  'A confissão messiânica de Pedro.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Revelação divina, não descoberta humana.', obra: 'Comentário a Mateus', ano: 1555 },
    { teologo: 'Tomás de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Dupla confissão: humano e divino.', obra: 'Suma Teológica', ano: 1274 },
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Clímax da revelação.', obra: 'Jesus and the Victory of God', ano: 1996 },
  ],
  ['Mc 8:29', 'Jo 6:68-69']
);

add('mt', 22, 37, 'O Grande Mandamento',
  'Amor total a Deus e ao próximo.',
  [
    { teologo: 'Tomás de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'O fim último do homem.', obra: 'Suma Teológica', ano: 1274 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Dois mandamentos, uma lei.', obra: 'Institutas', ano: 1536 },
    { teologo: 'Wesley', periodo: 'moderno', tradicao: 'arminiana', texto: 'O amor é o resumo.', obra: 'Sermões', ano: 1750 },
  ],
  ['Mc 12:29-30', 'Lc 10:25-28']
);

add('mt', 24, 30, 'A Vinda do Filho do Homem',
  'A segunda vinda.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Visível e gloriosa.', obra: 'Comentário a Mateus', ano: 1555 },
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'A vindicação de Deus.', obra: 'Jesus and the Victory of God', ano: 1996 },
  ],
  ['Mc 13:24-27', '1 Ts 4:16-17', 'Ap 1:7']
);

add('mt', 28, 18, 'A Grande Comissão',
  'A missão final de Jesus.',
  [
    { teologo: 'John Piper', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Autoridade cósmica para missão.', obra: 'Let the Nations Be Glad', ano: 1993 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Discípulos: ensino, batismo, obediência.', obra: 'Comentário a Mateus', ano: 1555 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Fórmula trinitária.', obra: 'Sermões', ano: 410 },
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'A missão não é opcional.', obra: 'The Mission of God', ano: 2006 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Presença perpetua.', obra: 'Sermões', ano: 1870 },
  ],
  ['Mc 16:15-18', 'Lc 24:46-49']
);

// MARCOS
add('mc', 1, 1, 'Princípio do Evangelho',
  'Cristo é Filho de Deus e Messias.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Urgência messiânica.', obra: 'Jesus and the Victory of God', ano: 1996 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Filho de Deus: natureza divina.', obra: 'Comentário a Marcos', ano: 1551 },
  ],
  ['Jo 20:31', 'Rm 1:3-4']
);

add('mc', 10, 45, 'Dar a Vida em Resgate',
  'O propósito da missão de Jesus.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Substitutiva e redentora.', obra: 'Comentário a Marcos', ano: 1551 },
    { teologo: 'Wesley', periodo: 'moderno', tradicao: 'arminiana', texto: 'Liderança é serviço.', obra: 'Sermões', ano: 1750 },
    { teologo: 'Tomás de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'O maior preço possível.', obra: 'Suma Teológica', ano: 1274 },
  ],
  ['Mt 20:28', '1 Tm 2:6']
);

add('mc', 15, 33, 'Escuridão na Cruz',
  'Trevas cósmicas.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A criação geme.', obra: 'Comentário a Marcos', ano: 1551 },
    { teologo: 'Tomás de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'O véu rasgado: acesso aberto.', obra: 'Suma Teológica', ano: 1274 },
  ],
  ['Mt 27:45-46', 'Lc 23:44-45']
);

add('mc', 16, 6, 'Ele Ressuscitou',
  'O fato central da fé.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Sem ressurreição, fé vã.', obra: 'Sermões', ano: 1870 },
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'O túmulo vazio é fato histórico.', obra: 'The Resurrection of the Son of God', ano: 2003 },
  ],
  ['1 Co 15:3-4', 'Rm 1:4']
);

// LUCAS
add('lc', 1, 26, 'A Anunciação',
  'O anúncio a Maria.',
  [
    { teologo: 'Tomás de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Obra da Trindade.', obra: 'Suma Teológica', ano: 1274 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'A virgindade preservada.', obra: 'Sermões', ano: 410 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Maria como modelo de submissão.', obra: 'Comentário a Lucas', ano: 1551 },
  ],
  ['Mt 1:18-25']
);

add('lc', 4, 18, 'O Espírito Sobre Mim',
  'Jesus declara o cumprimento.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Se identifica como Servo Sofredor.', obra: 'Jesus and the Victory of God', ano: 1996 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Missão: libertar, curar, proclamar.', obra: 'Comentário a Lucas', ano: 1551 },
  ],
  ['Is 61:1-2']
);

add('lc', 15, 11, 'O Filho Pródigo',
  'A graça que restaura.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Restauração completa.', obra: 'Sermões', ano: 1530 },
    { teologo: 'Tim Keller', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'A graça precede o arrependimento.', obra: 'The Prodigal God', ano: 2008 },
    { teologo: 'John Stott', periodo: 'contemporaneo', tradicao: 'evangelical', texto: 'Recebido como filho.', obra: 'The Message of Luke', ano: 1979 },
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Dois tipos de perda.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Graça generosa.', obra: 'Sermões', ano: 410 },
  ],
  ['Jo 3:16-17', 'Ef 2:1-10']
);

add('lc', 23, 34, 'Pai, Perdoa-lhes',
  'Primeira palavra da cruz.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Intercessão pelos inimigos.', obra: 'Comentário a Lucas', ano: 1551 },
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Perdão incondicional.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Perdoa mesmo sabendo tudo.', obra: 'Sermões', ano: 1870 },
  ],
  ['Mt 27:38-39', 'At 7:60']
);

add('lc', 24, 46, 'Era Necessário',
  'Cristo ressurreto explica o AT.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'O AT aponta para a cruz.', obra: 'The Resurrection of the Son of God', ano: 2003 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Missão universal.', obra: 'Comentário a Lucas', ano: 1551 },
  ],
  ['1 Co 15:3-4', 'At 17:2-3']
);

// JOÃO
add('jo', 1, 1, 'No Princípio Era o Verbo',
  'A preexistência do Verbo.',
  [
    { teologo: 'Atanásio', periodo: 'patristico', tradicao: 'catolica', texto: 'Eterno e igual ao Pai.', obra: 'Contra Ários', ano: 318 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Distinção trinitária.', obra: 'Comentário a João', ano: 1553 },
    { teologo: 'Tomás de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Consubstancial ao Pai.', obra: 'Suma Teológica', ano: 1274 },
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Significado cristológico único.', obra: 'Church Dogmatics', ano: 1951 },
  ],
  ['Cl 1:15-17', 'Hb 1:1-3', '1 Jo 1:1-2']
);

add('jo', 1, 14, 'O Verbo Se Fez Carne',
  'A encarnação.',
  [
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'O eterno no tempo, o infinito no finito.', obra: 'Tratados sobre João', ano: 418 },
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Deus habita conosco.', obra: 'Sermões', ano: 1530 },
    { teologo: 'Crisóstomo', periodo: 'patristico', tradicao: 'ortodoxa', texto: 'Vimos a sua glória.', obra: 'Homilias', ano: 390 },
  ],
  ['Mt 1:23', 'Fp 2:6-8', '1 Tm 3:16']
);

add('jo', 3, 16, 'Porque Deus Amou o Mundo',
  'O versículo mais famoso.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'O amor é a causa da salvação.', obra: 'Comentário a João', ano: 1523 },
    { teologo: 'Wesley', periodo: 'moderno', tradicao: 'arminiana', texto: 'Medida pelo preço do dom.', obra: 'Sermões', ano: 1750 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A fé como instrumento.', obra: 'Comentário a João', ano: 1553 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Amor sem limites.', obra: 'Sermões', ano: 1870 },
    { teologo: 'John Piper', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'A medida é a dádiva do Filho.', obra: 'The Pleasures of God', ano: 1991 },
  ],
  ['Rm 5:8', '1 Jo 4:9-10', 'Ef 2:4-5']
);

add('jo', 4, 13, 'Água Viva',
  'O que satisfaz a alma.',
  [
    { teologo: 'Tim Keller', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Cristo preenche o vazio.', obra: "King's Cross", ano: 2011 },
    { teologo: 'John Stott', periodo: 'contemporaneo', tradicao: 'evangelical', texto: 'Dom permanente.', obra: 'The Message of John', ano: 1988 },
  ],
  ['Is 55:1', 'Ap 22:17']
);

add('jo', 6, 35, 'Eu Sou o Pão da Vida',
  'Primeiro «Eu Sou» joanino.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Satisfação da fome da alma.', obra: 'Sermões', ano: 1870 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Eucaristia nutre a alma.', obra: 'Tratados', ano: 418 },
  ],
  ['Jo 6:48-51']
);

add('jo', 8, 12, 'Eu Sou a Luz do Mundo',
  'Segundo «Eu Sou».',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Ilumina as trevas do pecado.', obra: 'Comentário a João', ano: 1553 },
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Cumpre a festa dos tabernáculos.', obra: 'The New Testament and the People of God', ano: 1992 },
  ],
  ['Is 42:6', 'Is 49:6']
);

add('jo', 8, 32, 'A Verdade vos Libertará',
  'Libertação pela verdade.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Quebra correntes do pecado.', obra: 'Comentário a João', ano: 1523 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Liberdade da culpa.', obra: 'Sermões', ano: 1870 },
  ],
  ['Jo 8:36', '2 Co 3:17']
);

add('jo', 8, 58, 'Antes que Abraão Existisse, Eu Sou',
  'A eternidade de Jesus.',
  [
    { teologo: 'Tomás de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Divindade declarada.', obra: 'Suma Teológica', ano: 1274 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Preexistência eterna.', obra: 'Comentário a João', ano: 1553 },
  ],
  ['Ex 3:14', 'Jo 1:1-3', 'Fp 2:6']
);

add('jo', 10, 10, 'Vim Para Que Tenham Vida',
  'O propósito de Cristo.',
  [
    { teologo: 'Wesley', periodo: 'moderno', tradicao: 'arminiana', texto: 'Abundância, não apenas existência.', obra: 'Sermões', ano: 1750 },
    { teologo: 'John Piper', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Plenitude de relação com Deus.', obra: 'Desiring God', ano: 1986 },
  ],
  ['Jo 10:11', 'Jo 15:5']
);

add('jo', 10, 11, 'O Bom Pastor',
  'Sacrifício voluntário.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Dá a vida pelas ovelhas.', obra: 'Sermões', ano: 1870 },
    { teologo: 'Crisóstomo', periodo: 'patristico', tradicao: 'ortodoxa', texto: 'Ama até a morte.', obra: 'Homilias', ano: 390 },
  ],
  ['Ef 5:25', '1 P 2:21-25']
);

add('jo', 11, 25, 'Eu Sou a Ressurreição',
  'A mais poderosa declaração.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Crer é viver mesmo morrendo.', obra: 'Sermões', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fé é a chave.', obra: 'Comentário a João', ano: 1553 },
    { teologo: 'Tomás de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Causa eficiente da ressurreição.', obra: 'Suma Teológica', ano: 1274 },
  ],
  ['Jo 11:43-44', '1 Co 15:20-23']
);

add('jo', 14, 6, 'Caminho, Verdade e Vida',
  'A declaração exclusivista.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Única via ao Pai.', obra: 'Comentário a João', ano: 1553 },
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Único mediador.', obra: 'Comentário a João', ano: 1523 },
    { teologo: 'Tomás de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Cristo é caminho, verdade e vida.', obra: 'Suma Teológica', ano: 1274 },
    { teologo: 'R.C. Sproul', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Sem alternativas.', obra: 'The Holiness of God', ano: 1985 },
  ],
  ['At 4:12', '1 Tm 2:5']
);

add('jo', 15, 5, 'Sem Mim Nada Podeis',
  'Dependência radical.',
  [
    { teologo: 'Wesley', periodo: 'moderno', tradicao: 'arminiana', texto: 'Graça indispensável.', obra: 'Sermões', ano: 1750 },
    { teologo: 'Tim Keller', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Humildade radical.', obra: "King's Cross", ano: 2011 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Ramo separado não frutifica.', obra: 'Tratados', ano: 418 },
  ],
  ['Gl 2:20', 'Fp 4:13']
);

add('jo', 17, 3, 'Eternal é a Vida',
  'Conhecimento de Deus como vida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Conhecimento relacional.', obra: 'Comentário a João', ano: 1553 },
    { teologo: 'Tomás de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Visão de Deus como fim último.', obra: 'Suma Teológica', ano: 1274 },
  ],
  ['1 Jo 5:11-13']
);

add('jo', 19, 30, 'Está Consumado',
  'A obra da redenção completa.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Nada mais a acrescentar.', obra: 'Sermões', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Tetelestai: pago integralmente.', obra: 'Comentário a João', ano: 1553 },
    { teologo: 'Tomás de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sangue e água: frutos da paixão.', obra: 'Suma Teológica', ano: 1274 },
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'O ponto alto da história.', obra: 'Church Dogmatics', ano: 1951 },
  ],
  ['Hb 9:12', 'Hb 10:10-14']
);


// ====================================================================
// ATOS E EPÍSTOLAS
// ====================================================================

// ATOS
add('at', 1, 8, 'Sereis Minhas Testemunhas',
  'A promessa do Espírito e a missão universal.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'O Espírito capacita para testemunho.', obra: 'Comentário aos Atos', ano: 1552 },
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'De Jerusalém ao mundo: expansão do reino.', obra: 'The Acts of the Apostles', ano: 2008 },
    { teologo: 'John Piper', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Missão é o impulso central da igreja primitiva.', obra: 'Let the Nations Be Glad', ano: 1993 },
  ],
  ['Mt 28:19-20', 'Mc 16:15']
);

add('at', 2, 1, 'O Derramamento do Espírito',
  'Pentecostes: o nascimento da igreja.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'O cumprimento da promessa joelina.', obra: 'Comentário aos Atos', ano: 1552 },
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Deus inaugura nova era.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Tomás de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Dom do Espírito para a igreja.', obra: 'Suma Teológica', ano: 1274 },
  ],
  ['Jl 2:28-29', 'Mc 1:8']
);

add('at', 2, 38, 'Arrependei-Vos e Sede Batizados',
  'A primeira pregação apostólica e o convite à salvação.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Arrependimento e fé são instrumentos, não méritos.', obra: 'Comentário aos Atos', ano: 1552 },
    { teologo: 'Wesley', periodo: 'moderno', tradicao: 'arminiana', texto: 'A promessa é para todos os que se arrependem.', obra: 'Sermões', ano: 1750 },
    { teologo: 'Tomás de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Batismo como sinal da graça.', obra: 'Suma Teológica', ano: 1274 },
  ],
  ['Mc 16:16', 'Rm 6:3-4']
);

add('at', 4, 12, 'Em Nenhum Outro Há Salvação',
  'A exclusividade de Cristo.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Salvação somente em Cristo.', obra: 'Comentário aos Atos', ano: 1552 },
    { teologo: 'R.C. Sproul', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Exclusividade cristológica.', obra: 'The Holiness of God', ano: 1985 },
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Sola Christo: apenas Cristo salva.', obra: 'Comentário aos Atos', ano: 1524 },
  ],
  ['Jo 14:6', '1 Tm 2:5']
);

add('at', 17, 22, 'Homens de Atenas',
  'Paulo na Areópago: engajamento cultural.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Modelo de apologética cultural.', obra: 'The New Testament and the People of God', ano: 1992 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Deus não habita em templos, mas é próximo.', obra: 'Comentário aos Atos', ano: 1552 },
    { teologo: 'John Stott', periodo: 'contemporaneo', tradicao: 'evangelical', texto: 'Ponte entre culturas.', obra: 'The Message of Acts', ano: 1990 },
  ],
  ['Is 66:1', 'Sl 139:7-10']
);

// ROMANOS
add('rm', 1, 16, 'Não Me Envergonho do Evangelho',
  'O versículo temático de Romanos.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'A chave de Romanos: o poder de Deus para salvação.', obra: 'Comentário aos Romanos', ano: 1515 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'O evangelho é poder de Deus para fé.', obra: 'Comentário aos Romanos', ano: 1551 },
    { teologo: 'Tim Keller', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'O evangelho não é apenas o ABC, mas o A-Z da fé.', obra: 'Romans 1-7 For You', ano: 2014 },
  ],
  ['1 Co 1:18', 'Rm 1:17']
);

add('rm', 3, 10, 'Nenhum é Justo',
  'A universalidade do pecado.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A depravação total: ninguém busca a Deus.', obra: 'Comentário aos Romanos', ano: 1551 },
    { teologo: 'Tomás de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'A razão obscurecida pelo pecado original.', obra: 'Suma Teológica', ano: 1274 },
  ],
  ['Sl 14:1-3', 'Rm 3:23']
);

add('rm', 3, 21, 'A Justiça de Deus se Manifestou',
  'A justificação pela fé em Cristo.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Justiça alienada: a justiça de Cristo nos é creditada.', obra: 'Comentário aos Romanos', ano: 1515 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A justiça pela fé, sem obras da lei.', obra: 'Comentário aos Romanos', ano: 1551 },
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Justiça de Deus é fidelidade à aliança.', obra: 'Justification', ano: 2009 },
    { teologo: 'Tomás de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'A justiça infundida pela graça.', obra: 'Suma Teológica', ano: 1274 },
  ],
  ['Ef 2:8-9', 'Fp 3:9']
);

add('rm', 5, 8, 'Deus Prova Seu Amor',
  'A cruz como demonstração suprema do amor.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Amor independente do mérito humano.', obra: 'Comentário aos Romanos', ano: 1551 },
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'A cruz é o evento central da história.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Tim Keller', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Amor que morre pelos inimigos.', obra: 'The Reason for God', ano: 2008 },
  ],
  ['Jo 3:16', '1 Jo 4:10']
);

add('rm', 6, 23, 'O Salário do Pecado é a Morte',
  'Morte versus vida eterna.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Salário é o que merecemos. Dádiva é o que Deus dá.', obra: 'Sermões', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A graça gratuita supera o mérito do pecado.', obra: 'Comentário aos Romanos', ano: 1551 },
  ],
  ['Jó 20:29', 'Rm 5:17', 'Ef 2:5-6']
);

add('rm', 8, 1, 'Nenhuma Condenação',
  'A proclamação da liberdade em Cristo.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'A sentença mais doce da Escritura.', obra: 'Comentário aos Romanos', ano: 1515 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Libertação da condenação e do pecado.', obra: 'Comentário aos Romanos', ano: 1551 },
    { teologo: 'R.C. Sproul', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Segurança total em Cristo.', obra: 'Romans (St. Andrew\'s Expositional Commentary)', ano: 2009 },
  ],
  ['Jo 5:24', '8:36']
);

add('rm', 8, 28, 'Tudo Contribui para o Bem',
  'A soberania de Deus na adversidade.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Deus ordena todas as coisas para o bem dos eleitos.', obra: 'Comentário aos Romanos', ano: 1551 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Tudo, sem exceção, coopera para o bem.', obra: 'Sermões', ano: 1870 },
    { teologo: 'Tim Keller', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Não promete conforto, mas propósito no sofrimento.', obra: 'Walking with God', ano: 2013 },
  ],
  ['Jó 42:2', 'Ef 1:11']
);

add('rm', 8, 38, 'Nada Nos Separará do Amor de Deus',
  'A segurança eterna do crente.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Invencibilidade do amor divino.', obra: 'Comentário aos Romanos', ano: 1551 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Nem morte, nem vida, nem poder algum.', obra: 'Sermões', ano: 1870 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Amor que nenhum inimigo pode romper.', obra: 'Sermões', ano: 410 },
  ],
  ['Ef 3:18-19', '1 P 1:3-5']
);

add('rm', 12, 1, 'Apresentai os Vossos Corpos',
  'O culto vivo e racional.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Sacrifício agradável: vida santa.', obra: 'Comentário aos Romanos', ano: 1551 },
    { teologo: 'John Stott', periodo: 'contemporaneo', tradicao: 'evangelical', texto: 'Culto é a totalidade da vida dedicada.', obra: 'The Message of Romans', ano: 1994 },
  ],
  ['1 P 2:5', 'Hb 13:15-16']
);

add('rm', 12, 2, 'Não vos Conformai',
  'Transformação pela renovação da mente.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A mente renovada discernir a vontade de Deus.', obra: 'Comentário aos Romanos', ano: 1551 },
    { teologo: 'R.C. Sproul', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Cosmovisão cristã versus cultura secular.', obra: 'The Holiness of God', ano: 1985 },
  ],
  ['Ef 4:22-24', 'Cl 3:10']
);

// 1 CORÍNTIOS
add('1co', 1, 18, 'Loucura da Cruz',
  'A cruz como poder de Deus.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'O que parece loucura é sabedoria suprema.', obra: 'Comentário aos Gálatas', ano: 1535 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'O evangelho transcende a razão humana.', obra: 'Comentário a 1 Coríntios', ano: 1551 },
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'O escândalo da cruz desafia toda cultura.', obra: 'Church Dogmatics', ano: 1951 },
  ],
  ['Gl 6:14', '1 Co 2:14']
);

add('1co', 10, 13, 'Tentação Comum',
  'A fidelidade de Deus na provação.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Deus limita a tentação e dá saída.', obra: 'Comentário a 1 Coríntios', ano: 1551 },
    { teologo: 'Wesley', periodo: 'moderno', tradicao: 'arminiana', texto: 'A graça capacita a resistir.', obra: 'Sermões', ano: 1750 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Deus é fiel: sempre há escapatória.', obra: 'Sermões', ano: 1870 },
  ],
  ['1 Co 10:6-13', 'Tg 1:2-4']
);

add('1co', 13, 4, 'O Amor Nunca Falha',
  'O hino ao amor.',
  [
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'O amor é o vínculo das virtudes.', obra: 'Tratados sobre 1 João', ano: 420 },
    { teologo: 'Tomás de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'A caridade é a rainha das virtudes.', obra: 'Suma Teológica', ano: 1274 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Sem amor, os dons são vãos.', obra: 'Comentário a 1 Coríntios', ano: 1551 },
    { teologo: 'Tim Keller', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'O amor é sacrifício, não sentimento.', obra: 'The Meaning of Marriage', ano: 2011 },
  ],
  ['1 Jo 4:7-8', 'Gl 5:22-23']
);

add('1co', 15, 3, 'Cristo Morreu por Nossos Pecados',
  'O evangelho resumido.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Tradição apostólica central: morte e ressurreição.', obra: 'Comentário a 1 Coríntios', ano: 1551 },
    { teologo: 'R.C. Sproul', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'O kerigma apostólico.', obra: 'The Heart of the Gospel', ano: 2003 },
  ],
  ['Rm 4:25', '1 Co 15:14-17']
);

add('1co', 15, 55, 'Ó Morte, Onde Está o Teu Aguilhão?',
  'A vitória final sobre a morte.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A morte é destruída pela ressurreição.', obra: 'Comentário a 1 Coríntios', ano: 1551 },
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'A vitória é de Cristo, compartilhada com os santos.', obra: 'The Resurrection of the Son of God', ano: 2003 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'A morte engolida na vitória.', obra: 'Sermões', ano: 410 },
  ],
  ['Os 13:14', '1 Co 15:54-57']
);

// 2 CORÍNTIOS
add('2co', 5, 17, 'Nova Criatura',
  'A regeneração em Cristo.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'O antigo passou, o novo começou.', obra: 'Comentário a 2 Coríntios', ano: 1551 },
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'De velho homem a nova criação pela fé.', obra: 'Comentário a Gálatas', ano: 1535 },
    { teologo: 'Tim Keller', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Identidade transformada pelo evangelho.', obra: 'The Reason for God', ano: 2008 },
  ],
  ['Ef 2:10', 'Gl 6:15']
);

add('2co', 5, 21, 'Deus Nos Fez Justiça Nele',
  'A imputação da justiça.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'A grande troca: pecado por justiça.', obra: 'Comentário a Gálatas', ano: 1535 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Justiça alienada: a de Cristo nos é creditada.', obra: 'Comentário a 2 Coríntios', ano: 1551 },
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'A justiça de Deus é dada em Cristo.', obra: 'Justification', ano: 2009 },
  ],
  ['Is 53:5-6', 'Fp 3:9']
);

add('2co', 12, 9, 'Minha Graça Basta',
  'A suficiência da graça na fraqueza.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Na fraqueza, a perfeição de Cristo se manifesta.', obra: 'Sermões', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A graça divina supre a insuficiência humana.', obra: 'Comentário a 2 Coríntios', ano: 1551 },
    { teologo: 'Wesley', periodo: 'moderno', tradicao: 'arminiana', texto: 'Dependência total da graça.', obra: 'Sermões', ano: 1750 },
  ],
  ['Fp 4:13', '2 Co 4:7']
);

// GÁLATAS
add('gl', 2, 16, 'Justificados Pela Fé em Cristo',
  'A Reforma em um versículo.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'A pedra angular da Reforma: sola fide.', obra: 'Comentário a Gálatas', ano: 1535 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fé como instrumento de recebimento.', obra: 'Comentário a Gálatas', ano: 1548 },
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'A fé como confiança leal em Deus.', obra: 'Justification', ano: 2009 },
    { teologo: 'Tomás de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'A fé formada pelo amor justifica.', obra: 'Suma Teológica', ano: 1274 },
  ],
  ['Rm 3:28', 'Ef 2:8-9']
);

add('gl', 2, 20, 'Cristo Vive em Mim',
  'A vida vivida pela fé no Filho de Deus.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'A vida cristã é Cristo vivendo em nós.', obra: 'Comentário a Gálatas', ano: 1535 },
    { teologo: 'Wesley', periodo: 'moderno', tradicao: 'arminiana', texto: 'A graça que transforma a vida.', obra: 'Sermões', ano: 1750 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Morta a autoconfiança, Cristo governa.', obra: 'Comentário a Gálatas', ano: 1548 },
  ],
  ['Jo 15:5', 'Fp 1:21']
);

add('gl', 5, 22, 'Os Frutos do Espírito',
  'O fruto do Espírito na vida do crente.',
  [
    { teologo: 'Wesley', periodo: 'moderno', tradicao: 'arminiana', texto: 'Santificação progressiva produz fruto.', obra: 'Sermões', ano: 1750 },
    { teologo: 'Tomás de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'As virtudes teologais e morais.', obra: 'Suma Teológica', ano: 1274 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'O Espírito produz o que a lei não consegue.', obra: 'Comentário a Gálatas', ano: 1548 },
  ],
  ['Mt 7:16-20', 'Ef 5:9']
);

// EFÉSIOS
add('ef', 2, 8, 'Por Graça Sois Salvos',
  'A salvação como dom de Deus.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Graça é desmerecida, graça é suficiente.', obra: 'Comentário aos Romanos', ano: 1515 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A fé é dom, não mérito.', obra: 'Comentário a Efésios', ano: 1548 },
    { teologo: 'Tomás de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'A graça move a vontade humana.', obra: 'Suma Teológica', ano: 1274 },
    { teologo: 'Tim Keller', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Não por obras para que ninguém se glorie.', obra: 'The Reason for God', ano: 2008 },
  ],
  ['Rm 3:24', 'Tt 3:5']
);

add('ef', 2, 9, 'Não de Vós Mesmos',
  'A exclusão do mérito humano.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'O homem não pode contribuir para sua salvação.', obra: 'Institutas', ano: 1536 },
    { teologo: 'R.C. Sproul', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Sola gratia: somente graça.', obra: 'Faith Alone', ano: 1995 },
  ],
  ['Rm 4:4-5', 'Ef 2:5']
);

add('ef', 2, 10, 'Criados para Boas Obras',
  'A salvação prepara para a santificação.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Deus preparou as obras que devemos andar.', obra: 'Comentário a Efésios', ano: 1548 },
    { teologo: 'Wesley', periodo: 'moderno', tradicao: 'arminiana', texto: 'Salvação produz santidade.', obra: 'Sermões', ano: 1750 },
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'A graça antecipa a obra boa.', obra: 'After You Believe', ano: 2010 },
  ],
  ['Tg 2:14-17', 'Mt 5:16']
);

add('ef', 6, 10, 'Sede Fortalecidos no Senhor',
  'A armadura de Deus.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A guerra espiritual requer preparação divina.', obra: 'Comentário a Efésios', ano: 1548 },
    { teologo: 'John Stott', periodo: 'contemporaneo', tradicao: 'evangelical', texto: 'A armadura é Cristo mesmo.', obra: 'The Message of Ephesians', ano: 1979 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'O crente não luta pela vitória, mas da vitória.', obra: 'Sermões', ano: 1870 },
  ],
  ['2 Co 10:3-5', 'Rm 13:12']
);

// FILIPENSES
add('fp', 2, 5, 'O Pensamento de Cristo',
  'A humilhação e exaltação de Cristo.',
  [
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'O kênose: o esvaziamento voluntário de Deus.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Tomás de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'A encarnação é ato de humildade e amor.', obra: 'Suma Teológica', ano: 1274 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Modelo de humildade para os fiéis.', obra: 'Comentário a Filipenses', ano: 1548 },
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'A exaltação é consequência da obediência.', obra: 'The New Testament and the People of God', ano: 1992 },
  ],
  ['Is 52:13', 'Fp 2:9-11']
);

add('fp', 4, 6, 'Não vos Aflijais',
  'A exortação à oração em vez da ansiedade.',
  [
    { teologo: 'Tim Keller', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'A oração é o antídoto contra a ansiedade.', obra: 'Walking with God', ano: 2013 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Oração e gratidão substituem a preocupação.', obra: 'Comentário a Filipenses', ano: 1548 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Portai vossos encargos ao Senhor.', obra: 'Sermões', ano: 1870 },
  ],
  ['1 P 5:7', 'Sl 55:22']
);

add('fp', 4, 7, 'A Paz de Deus Guarda',
  'A transcendentia da paz divina.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Guarda o coração e a mente.', obra: 'Comentário a Filipenses', ano: 1548 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Paz que supera todo entendimento.', obra: 'Sermões', ano: 1870 },
  ],
  ['Jo 14:27', 'Is 26:3']
);

add('fp', 4, 13, 'Posso Todas as Coisas',
  'A suficiência pela força de Cristo.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Força de Cristo, não capacidade humana.', obra: 'Comentário a Filipenses', ano: 1548 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Não é autosuficiência, mas dependência.', obra: 'Sermões', ano: 1870 },
    { teologo: 'Wesley', periodo: 'moderno', tradicao: 'arminiana', texto: 'A graça que fortalece para toda obra.', obra: 'Sermões', ano: 1750 },
  ],
  ['2 Co 12:9-10', 'Ef 3:16']
);

// COLOSSES
add('cl', 1, 15, 'A Imagem do Deus Invisível',
  'A supremacia de Cristo.',
  [
    { teologo: 'Atanásio', periodo: 'patristico', tradicao: 'catolica', texto: 'O Filho é imagem perfeita do Pai.', obra: 'Contra Ários', ano: 318 },
    { teologo: 'Tomás de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Primogênito de toda a criação: primeiro na hierarquia.', obra: 'Suma Teológica', ano: 1274 },
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Cristo é o começo e o centro.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Todas as coisas foram criadas por Ele.', obra: 'The New Testament and the People of God', ano: 1992 },
  ],
  ['Jo 1:1-3', 'Hb 1:3']
);

add('cl', 2, 9, 'Toda a Plenitude Habita Nele',
  'A plenitude da divindade em Cristo.',
  [
    { teologo: 'Atanásio', periodo: 'patristico', tradicao: 'catolica', texto: 'Toda a divindade habita corporalmente.', obra: 'Contra Ários', ano: 318 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Plenitude divina para a salvação dos fiéis.', obra: 'Comentário a Colossenses', ano: 1548 },
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Nele habita toda a plenitude.', obra: 'Church Dogmatics', ano: 1951 },
  ],
  ['Jo 1:14', 'Cl 1:19']
);

add('cl', 3, 1, 'Buscai as Coisas de Cima',
  'A vida centrada nas realidades eternas.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Mentes elevadas para as coisas celestiais.', obra: 'Comentário a Colossenses', ano: 1548 },
    { teologo: 'Tomás de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'O amor pelas coisas eternas eleva a alma.', obra: 'Suma Teológica', ano: 1274 },
  ],
  ['Rm 8:5-6', 'Ef 2:6']
);

// 1 TESSALONICENSES
add('1ts', 4, 16, 'O Senhor Descerá dos Céus',
  'A segunda vinda de Cristo.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Visível, audível, glorioso.', obra: 'Comentário a 1 Tessalonicenses', ano: 1551 },
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'A vindita final de Deus.', obra: 'The New Testament and the People of God', ano: 1992 },
  ],
  ['Mt 24:30-31', 'Ap 1:7']
);

add('1ts', 5, 16, 'Regozijai-Vos Sempre',
  'A alegria cristã permanente.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Alegria como fruto do Espírito.', obra: 'Comentário a 1 Tessalonicenses', ano: 1551 },
    { teologo: 'Wesley', periodo: 'moderno', tradicao: 'arminiana', texto: 'Alegria não depende de circunstâncias.', obra: 'Sermões', ano: 1750 },
  ],
  ['Fp 4:4', 'Gl 5:22']
);

// 2 TIMÓTEO
add('2tm', 3, 16, 'Toda Escritura É Inspirada por Deus',
  'A doutrina da inspiração bíblica.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'A Palavra de Deus é a autoridade suprema.', obra: 'Disputas', ano: 1521 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Autoridade, inerrância e suficiência da Escritura.', obra: 'Institutas', ano: 1536 },
    { teologo: 'R.C. Sproul', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'A Escritura é o padrão inerrante.', obra: 'Scripture Alone', ano: 2005 },
    { teologo: 'Tomás de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'A inspiração divina garante a verdade.', obra: 'Suma Teológica', ano: 1274 },
    { teologo: 'John Stott', periodo: 'contemporaneo', tradicao: 'evangelical', texto: 'Útil para ensinar, corrigir, instruir.', obra: 'The Message of 2 Timothy', ano: 1973 },
  ],
  ['2 P 1:20-21', 'Sl 119:89']
);

// TITO
add('tt', 2, 11, 'A Graça de Deus Se Manifestou',
  'A graça salvadora e transformadora.',
  [
    { teologo: 'Wesley', periodo: 'moderno', tradicao: 'arminiana', texto: 'A graça que ensina negar a impiedade.', obra: 'Sermões', ano: 1750 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Graça instrutiva e salvadora.', obra: 'Comentário a Tito', ano: 1549 },
  ],
  ['Ef 2:8-9', 'Tg 2:14-17']
);

// FILEMON
add('flm', 1, 15, 'Aceita-o Como a Mim',
  'O evangelho e a reconciliação humana.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'O evangelho transforma relacionamentos.', obra: 'Comentário a Filemon', ano: 1549 },
    { teologo: 'John Stott', periodo: 'contemporaneo', tradicao: 'evangelical', texto: 'Reconciliação em Cristo.', obra: 'The Message of Philemon', ano: 1979 },
  ],
  ['Gl 3:28', 'Col 3:11']
);

// ====================================================================
// EPÍSTOLAS GERAISAPOCALIPSE
// ====================================================================

// HEBREUS
add('hb', 1, 1, 'Deus Falou por Seu Filho',
  'A revelação suprema em Cristo.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'O Filho é a Palavra final de Deus.', obra: 'Comentário aos Hebreus', ano: 1551 },
    { teologo: 'Tomás de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'A supremacia do Filho sobre os profetas.', obra: 'Suma Teológica', ano: 1274 },
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Deus se revela plenamente em Cristo.', obra: 'Church Dogmatics', ano: 1951 },
  ],
  ['Jo 1:1-3', 'Cl 1:15-17']
);

add('hb', 4, 12, 'Viva É a Palavra de Deus',
  'O poder penetrante da Escritura.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'A Palavra que corta, cura e converte.', obra: 'Sermões', ano: 1530 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Mais afiada que espada de dois gumes.', obra: 'Comentário aos Hebreus', ano: 1551 },
    { teologo: 'R.C. Sproul', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Eficácia da Escritura na vida humana.', obra: 'Scripture Alone', ano: 2005 },
    { teologo: 'Tomás de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Penetra até os desígnios do coração.', obra: 'Suma Teológica', ano: 1274 },
  ],
  ['2 Tm 3:16-17', 'Sl 119:105']
);

add('hb', 4, 14, 'Temos Um Grande Sumo Sacerdote',
  'A intercessão de Cristo.',
  [
    { teologo: 'Tomás de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Cristo é Sumo Sacerdote eterno.', obra: 'Suma Teológica', ano: 1274 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Intercede por nós no céu.', obra: 'Comentário aos Hebreus', ano: 1551 },
  ],
  ['Hb 7:25', '1 Jo 2:1']
);

add('hb', 7, 25, 'Sempre Vive Para Interceder',
  'A intercessão perene de Cristo.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A intercessão é a garantia da salvação.', obra: 'Comentário aos Hebreus', ano: 1551 },
    { teologo: 'Tomás de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sumo Sacerdote que não morre.', obra: 'Suma Teológica', ano: 1274 },
    { teologo: 'R.C. Sproul', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Cristo nunca deixa de interceder.', obra: 'The Holiness of God', ano: 1985 },
  ],
  ['Rm 8:34', 'Hb 4:14-16']
);

add('hb', 9, 12, 'Com Seu Próprio Sangue',
  'O sacrifício único e eterno.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Sacrifício uma vez para sempre.', obra: 'Comentário aos Hebreus', ano: 1551 },
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Sangue precioso, expiação eterna.', obra: 'Sermões', ano: 1530 },
  ],
  ['Lv 16:2-34', '1 P 1:18-19']
);

add('hb', 11, 1, 'A Fé É o Firme Fundamento',
  'A definição clássica de fé.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Convicção das coisas não vistas.', obra: 'Comentário aos Hebreus', ano: 1551 },
    { teologo: 'Tomás de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'O ato da fé como assentimento da razão.', obra: 'Suma Teológica', ano: 1274 },
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'A fé é resposta à revelação.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'O que não se vê é real.', obra: 'Sermões', ano: 1870 },
  ],
  ['2 Co 4:18', 'Rm 8:24-25']
);

add('hb', 12, 2, 'Olhando Para Jesus',
  'Jesus como autor e consumador da fé.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'O exemplo supremo de perseverança.', obra: 'Comentário aos Hebreus', ano: 1551 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Olhando para Jesus, não para as circunstâncias.', obra: 'Sermões', ano: 1870 },
  ],
  ['Fp 3:13-14', '12:1-2']
);

add('hb', 13, 8, 'Ontem e Hoje o Mesmo',
  'A imutabilidade de Cristo.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Cristo não muda, por isso a fé é segura.', obra: 'Comentário aos Hebreus', ano: 1551 },
    { teologo: 'Tomás de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'A imutabilidade divina é garantia da aliança.', obra: 'Suma Teológica', ano: 1274 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'O mesmo ontem, hoje e sempre.', obra: 'Sermões', ano: 1870 },
  ],
  ['Ml 3:6', 'Tg 1:17']
);

// TIAGO
add('tg', 1, 2, 'Regozijai-Vos na Tribulação',
  'A alegria na provação.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Tribulações produzem perseverança.', obra: 'Comentário a Tiago', ano: 1548 },
    { teologo: 'Tomás de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'A provação aperfeiçoa a virtude.', obra: 'Suma Teológica', ano: 1274 },
  ],
  ['Rm 5:3-5', '1 P 1:6-7']
);

add('tg', 2, 14, 'Fé Sem Obras É Morta',
  'A relação entre fé e obras.',
  [
    { teologo: 'Tomás de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'A fé que não age é inútil.', obra: 'Suma Teológica', ano: 1274 },
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'A fé viva produz obras espontaneamente.', obra: 'Comentário a Tiago', ano: 1522 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A fé genuína se demonstra em ação.', obra: 'Comentário a Tiago', ano: 1548 },
    { teologo: 'John Stott', periodo: 'contemporaneo', tradicao: 'evangelical', texto: 'Fé e obras são inseparáveis.', obra: 'The Message of James', ano: 1979 },
  ],
  ['Gl 2:16', 'Ef 2:8-10']
);

// 1 PEDRO
add('1p', 1, 6, 'Alegrai-Vos, Embora Tristes',
  'Alegria na provação temporária.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A provação é temporária; a glória é eterna.', obra: 'Comentário a 1 Pedro', ano: 1551 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'A fé provada é como ouro refinado.', obra: 'Sermões', ano: 1870 },
  ],
  ['1 P 1:6-7', 'Rm 5:3-5']
);

add('1p', 2, 9, 'Vós Sois Geração Eleita',
  'A identidade do povo de Deus.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Sacerdócio real, nação santa.', obra: 'Comentário a 1 Pedro', ano: 1551 },
    { teologo: 'Tomás de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sacerdócio espiritual de todos os fiéis.', obra: 'Suma Teológica', ano: 1274 },
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Povo peculiar para proclamar virtudes.', obra: 'The New Testament and the People of God', ano: 1992 },
  ],
  ['Ex 19:6', 'Ap 1:6']
);

add('1p', 3, 15, 'Estai Sempre Preparados',
  'A defesa da fé com mansidão.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Defesa racional com mansidão e respeito.', obra: 'Comentário a 1 Pedro', ano: 1551 },
    { teologo: 'John Stott', periodo: 'contemporaneo', tradicao: 'evangelical', texto: 'Apologética com humildade.', obra: 'Issues Facing Christians Today', ano: 1990 },
  ],
  ['2 Tm 2:24-26', 'Cl 4:5-6']
);

// 1 JOÃO
add('1jo', 1, 9, 'Se Confessarmos',
  'O perdão mediante a confissão.',
  [
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Deus é fiel e justo para perdoar.', obra: 'Tratados sobre 1 João', ano: 420 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Confissão e perdão seguro pela fidelidade divina.', obra: 'Comentário a 1 João', ano: 1551 },
    { teologo: 'R.C. Sproul', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'A justiça de Deus garante o perdão.', obra: 'The Holiness of God', ano: 1985 },
  ],
  ['Sl 32:5', '1 Jo 2:1-2']
);

add('1jo', 2, 1, 'Temos um Advogado',
  'Cristo como intercessor.',
  [
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Cristo é nosso paráclito junto ao Pai.', obra: 'Tratados sobre 1 João', ano: 420 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'O advogado que nunca perde uma causa.', obra: 'Comentário a 1 João', ano: 1551 },
  ],
  ['Hb 7:25', 'Rm 8:34']
);

add('1jo', 3, 1, 'Que Amor Nos Pai',
  'A identidade filial dos crentes.',
  [
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Filhos de Deus por adoção.', obra: 'Tratados sobre 1 João', ano: 420 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A adoção é dom supremo do evangelho.', obra: 'Comentário a 1 João', ano: 1551 },
  ],
  ['Rm 8:15-16', 'Gl 4:4-7']
);

add('1jo', 4, 8, 'Deus É Amor',
  'O amor como essência divina.',
  [
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Deus é amor em Si mesmo.', obra: 'Tratados sobre 1 João', ano: 420 },
    { teologo: 'Tomás de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'O amor é a causa final da criação.', obra: 'Suma Teológica', ano: 1274 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'O amor se manifesta na cruz.', obra: 'Comentário a 1 João', ano: 1551 },
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Deus é amor: ponto de partida.', obra: 'Church Dogmatics', ano: 1951 },
  ],
  ['Jo 3:16', '1 Jo 4:16']
);

add('1jo', 4, 16, 'Deus É Amor; Quem Persevera no Amor',
  'A permanência no amor de Deus.',
  [
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Permanecer no amor é permanecer em Deus.', obra: 'Tratados sobre 1 João', ano: 420 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'O amor fraternal é sinal de salvação.', obra: 'Comentário a 1 João', ano: 1551 },
  ],
  ['Jo 15:9-10', '1 Jo 4:12']
);

add('1jo', 4, 19, 'Nós O Amamos Porque Ele',
  'O amor como resposta ao amor divino.',
  [
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Amamos porque fomos amados primeiro.', obra: 'Tratados sobre 1 João', ano: 420 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'O amor precede o nosso.', obra: 'Comentário a 1 João', ano: 1551 },
    { teologo: 'Wesley', periodo: 'moderno', tradicao: 'arminiana', texto: 'A graça desperta o amor no coração.', obra: 'Sermões', ano: 1750 },
  ],
  ['Ef 2:4-5', '1 Jo 4:9-10']
);

add('1jo', 5, 4, 'Todo o Que É Nascido de Deus',
  'A vitória da fé.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'A fé conquista o mundo.', obra: 'Comentário a 1 João', ano: 1523 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Vitória pela fé na promessa.', obra: 'Comentário a 1 João', ano: 1551 },
  ],
  ['1 Jo 5:5', 'Gl 6:14']
);

// JUDAS
add('jd', 1, 24, 'Ao Que Pode Guardar',
  'A doxologia final.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Deus é capaz de preservar seus fiéis.', obra: 'Comentário a Judas', ano: 1551 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Segurança em Cristo.', obra: 'Sermões', ano: 1870 },
  ],
  ['Jd 25', 'Rm 16:27']
);

// APOCALIPSE
add('ap', 1, 7, 'Vem com as Nuvens',
  'A segunda vinda visível.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Todo o mundo O verá.', obra: 'Comentário ao Apocalipse', ano: 1555 },
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Vindicação final de Deus.', obra: 'The New Testament and the People of God', ano: 1992 },
  ],
  ['Mt 24:30', 'Dn 7:13', 'Zc 12:10']
);

add('ap', 1, 8, 'Eu Sou o Alfa e o Ômega',
  'A eternidade de Deus.',
  [
    { teologo: 'Tomás de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Deus é o início e o fim.', obra: 'Suma Teológica', ano: 1274 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A soberania absoluta de Deus.', obra: 'Comentário ao Apocalipse', ano: 1555 },
  ],
  ['Is 44:6', 'Ex 3:14']
);

add('ap', 3, 20, 'Estou à Porta e Chamo',
  'O convite pessoal de Cristo.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Cristo bate, mas não entra à força.', obra: 'Comentário ao Apocalipse', ano: 1555 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'A porta só se abre de dentro.', obra: 'Sermões', ano: 1870 },
    { teologo: 'Tim Keller', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'O convite é urgente e pessoal.', obra: 'King\'s Cross', ano: 2011 },
  ],
  ['Lc 13:25', 'Mt 25:1-13']
);

add('ap', 5, 9, 'Digno É o Cordeiro',
  'A adoração ao Cordeiro.',
  [
    { teologo: 'Tomás de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'O Cordeiro sacrificado é adorado.', obra: 'Suma Teológica', ano: 1274 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Só Cristo é digno de adoração.', obra: 'Comentário ao Apocalipse', ano: 1555 },
  ],
  ['Jo 1:29', 'Fl 2:9-11']
);

add('ap', 5, 12, 'Digno É o Cordeiro',
  'O louvor celestial.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Louvor eterno ao Redentor.', obra: 'Comentário ao Apocalipse', ano: 1555 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Poder, riqueza, sabedoria e honra.', obra: 'Sermões', ano: 1870 },
  ],
  ['Ap 5:9', 'Ap 7:12']
);

add('ap', 7, 9, 'Uma Grande Multidão',
  'A igreja triunfante.',
  [
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'A cidade de Deus de todas as nações.', obra: 'A Cidade de Deus', ano: 426 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Multidão inumerável de todas as línguas.', obra: 'Comentário ao Apocalipse', ano: 1555 },
  ],
  ['Ap 5:9-10', 'Mt 28:19']
);

add('ap', 19, 16, 'Rei dos Reis e Senhor dos Senhores',
  'A soberania absoluta de Cristo.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Cristo reina sobre todas as nações.', obra: 'Comentário ao Apocalipse', ano: 1555 },
    { teologo: 'Tomás de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Toda a autoridade lhe foi dada.', obra: 'Suma Teológica', ano: 1274 },
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'O rei vitorioso entra triunfalmente.', obra: 'The New Testament and the People of God', ano: 1992 },
  ],
  ['Mt 28:18', 'Fl 2:9-11']
);

add('ap', 20, 12, 'Livros Abertos',
  'O juízo final.',
  [
    { teologo: 'Tomás de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Os livros das obras e o livro da vida.', obra: 'Suma Teológica', ano: 1274 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Cada um será julgado segundo as obras.', obra: 'Comentário ao Apocalipse', ano: 1555 },
  ],
  ['2 Co 5:10', 'Rm 14:10-12']
);

add('ap', 21, 1, 'Novos Céus e Nova Terra',
  'A renovação de toda a criação.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A criação renovada, não destruída.', obra: 'Comentário ao Apocalipse', ano: 1555 },
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'A restauração cósmica.', obra: 'Surprised by Hope', ano: 2008 },
    { teologo: 'Tomás de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'A glória da nova criação.', obra: 'Suma Teológica', ano: 1274 },
  ],
  ['Is 65:17', '2 P 3:13']
);

add('ap', 21, 4, 'Enxugará Todas as Lágrimas',
  'A ausência final da dor.',
  [
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'A felicidade perfeita dos santos.', obra: 'A Cidade de Deus', ano: 426 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Sem mais morte, luto, dor.', obra: 'Sermões', ano: 1870 },
    { teologo: 'Tim Keller', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'A esperança final da criação.', obra: 'Walking with God', ano: 2013 },
  ],
  ['Is 25:8', '1 Co 15:54-55']
);

add('ap', 21, 5, 'Eis Que Faço Todas as Coisas Novas',
  'A renovidade de Deus.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Deus faz novidade na criação.', obra: 'Comentário ao Apocalipse', ano: 1555 },
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'A novidade divina supera toda expectativa.', obra: 'Church Dogmatics', ano: 1951 },
  ],
  ['Is 43:19', '2 Co 5:17']
);

add('ap', 22, 20, 'Sim, Vem Senhor Jesus',
  'A oração escatológica da igreja.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A Maranatha: vem, Senhor Jesus.', obra: 'Comentário ao Apocalipse', ano: 1555 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Suspiro final da história.', obra: 'Sermões', ano: 1870 },
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'O clamor pela consumação.', obra: 'Surprised by Hope', ano: 2008 },
  ],
  ['1 Co 16:22', 'Mt 24:42']
);

add('ap', 22, 21, 'A Graça do Senhor Jesus',
  'A bênção final da Escritura.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A graça é a palavra final.', obra: 'Comentário ao Apocalipse', ano: 1555 },
    { teologo: 'Tomás de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'A bênção trinitária final.', obra: 'Suma Teológica', ano: 1274 },
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Sola gratia: tudo pela graça.', obra: 'Sermões', ano: 1530 },
  ],
  ['2 Co 13:14', 'Rm 16:20']
);


// ====================================================================
// MERGE WITH NEW COMMENTARIES
// ====================================================================

import { comentariosNovos } from './comentariosExpandidosNovos';

// Merge new commentaries (existing entries take precedence)
Object.keys(comentariosNovos).forEach(key => {
  if (!comentariosExpandidos[key]) {
    comentariosExpandidos[key] = comentariosNovos[key];
  }
});

// ====================================================================
// EXPORTAÇÃO
// ====================================================================

export default comentariosExpandidos;
export { comentariosExpandidos };


