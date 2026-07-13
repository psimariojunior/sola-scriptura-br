import { ComentarioExpandido, ComentarioTeologico } from './comentariosExpandidos';

function chave(livro: string, capitulo: number, versiculo: number): string {
  return `${livro}:${capitulo}:${versiculo}`;
}

const comentariosNovos: Record<string, ComentarioExpandido> = {};

function add(
  livro: string, cap: number, v: number,
  titulo: string, resumo: string,
  comentarios: ComentarioTeologico[],
  referencias?: string[]
) {
  const k = chave(livro, cap, v);
  comentariosNovos[k] = { livro, capitulo: cap, versiculo: v, titulo, resumo, comentarios, referencias };
}

// ====================================================================
// GENESIS
// ====================================================================

add('gn', 1, 3, 'A Criacao da Luz',
  'Deus separa a luz das trevas no primeiro dia. A luz simboliza a ordem divina sobre o caos.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A luz precede o sol; Cristo e a luz do mundo.', obra: 'Comentario ao Genesis', ano: 1554 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'A luz espiritual e superior a material.', obra: 'De Genesi ad Litteram', ano: 401 },
  ],
  ["Jo 1:4-5","2 Co 4:6"]);

add('gn', 1, 9, 'A Separacao das Aguas',
  'Deus separa as aguas e aparece a terra seca. A ordem emerge do caos original.',
  [
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'A separacao demonstra o poder ordenador de Deus.', obra: 'Suma Teologica', ano: 1274 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Deus prepara a habitacao para a vida.', obra: 'Comentario ao Genesis', ano: 1554 },
  ],
  ["2 P 3:5","Sl 104:6-8"]);

add('gn', 1, 14, 'Os Luminosos no Firmamento',
  'Deus cria os astros para governar o dia e a noite, marcando tempos e estacoes.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Os astros servem ao homem, nao sao deuses.', obra: 'Comentario ao Genesis', ano: 1554 },
    { teologo: 'Crisostomo', periodo: 'patristico', tradicao: 'ortodoxa', texto: 'A ordem celestial reflete a sabedoria do Criador.', obra: 'Homilias sobre Genesis', ano: 390 },
  ],
  ["Sl 136:7-9","Jr 31:35"]);

add('gn', 1, 20, 'A Vida nas Aguas e no Ar',
  'Deus popula as aguas com peixes e o ceu com aves. A criacao se enche de vida.',
  [
    { teologo: 'Crisostomo', periodo: 'patristico', tradicao: 'ortodoxa', texto: 'A abundancia revela a generosidade divina.', obra: 'Homilias sobre Genesis', ano: 390 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Cada criacao segundo sua especie: ordem divina.', obra: 'Comentario ao Genesis', ano: 1554 },
  ],
  ["Sl 104:24-25","Jo 21:11"]);

add('gn', 1, 31, 'Tudo Muito Bom',
  'A avaliacao divina da criacao completa: tudo era muito bom. A perfeicao original.',
  [
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'O mal nao e criacao de Deus; a criacao era boa.', obra: 'De Genesi ad Litteram', ano: 401 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'A bondade da criacao reflete o bem supremo do Criador.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Ec 7:29","1 Tm 4:4"]);

add('gn', 2, 7, 'A Formacao do Homem',
  'Deus forma o homem do po da terra e sopra o folego de vida. O homem torna-se alma vivente.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'O corpo e obra-prima da criacao; o folego e a alma racional.', obra: 'Comentario ao Genesis', ano: 1554 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'A alma e forma do corpo, unidade substancial.', obra: 'Suma Teologica', ano: 1274 },
    { teologo: 'Atanasio', periodo: 'patristico', tradicao: 'catolica', texto: 'Deus o fez a Sua imagem para conhece-Lo.', obra: 'Sobre a Encarnacao', ano: 328 },
  ],
  ["Gn 1:27","Ec 12:7","1 Co 15:45"]);

add('gn', 2, 18, 'A Companheira de Adao',
  'Deus declara que nao e bom que o homem esteja so. A necessidade de comunhao.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A solidao original nao era perfeita; Deus prepara a comunhao.', obra: 'Comentario ao Genesis', ano: 1554 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'O homem e naturalmente social; a complementaridade e divina.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Mt 19:4-6","Ef 5:31-32"]);

add('gn', 2, 24, 'Unidos em Um So',
  'O homem deixa pai e mae e se une a sua mulher. O fundamento do casamento.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Jesus cita este versiculo como autoridade divina para o casamento.', obra: 'Comentario ao Genesis', ano: 1554 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'A unidade matrimonial e natural e sagrada.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Mt 19:5-6","Ef 5:31","1 Co 6:16"]);

add('gn', 3, 6, 'O Fruto Proibido',
  'Eva ve o fruto, deseja-o e come. Adao tambem come. A queda da humanidade.',
  [
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'O pecado comeca no desejo desordenado.', obra: 'Confissoes', ano: 398 },
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'A desobediencia e a raiz de todo pecado.', obra: 'Comentario ao Genesis', ano: 1544 },
  ],
  ["Rm 5:12","Tg 1:14-15","1 Tm 2:14"]);

add('gn', 3, 9, 'Onde Estas?',
  'A primeira pergunta de Deus ao homem apos a queda. Confrontacao com o pecado.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Deus nao ignora o pecado; convoca o culpado.', obra: 'Comentario ao Genesis', ano: 1554 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'A pergunta e pastoral: Deus busca o perdido.', obra: 'Sermoens', ano: 410 },
  ],
  ["Gn 4:9-10","Lc 15:20"]);

add('gn', 3, 16, 'A Multipliacao das Dores',
  'A consequencia sobre a mulher: dores na concepcao e dificuldade no relacionamento.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A dor na maternidade e consequencia do pecado.', obra: 'Comentario ao Genesis', ano: 1554 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'A sujeicao nao e ideal original, mas consequencia da queda.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["1 Tm 2:14-15","Ef 5:22-24"]);

add('gn', 3, 19, 'O Salario do Pecado',
  'Deus sentencia o homem: pelo suor comeras o pao, ate tornar-te a po da terra.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'A morte espiritual e fisica sao consequencias do pecado.', obra: 'Comentario ao Genesis', ano: 1544 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'O trabalho e tanto maldicao quanto provisao divina.', obra: 'Comentario ao Genesis', ano: 1554 },
  ],
  ["Rm 6:23","Jo 1:21"]);

add('gn', 3, 21, 'Roupas de Pele',
  'Deus veste Adao e Eva com peles de animais. Uma morte para cobrir a vergonha.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Um animal morre para cobrir a vergonha: tipo da redencao.', obra: 'Comentario ao Genesis', ano: 1554 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Deus mesmo prove o meio de cobrir a nudez do pecado.', obra: 'De Genesi ad Litteram', ano: 401 },
  ],
  ["Hb 9:22","Is 61:10"]);

add('gn', 4, 1, 'O Nascimento de Caim',
  'Eva concebe e da a luz Caim. A esperanca de que Deus lhe deu um filho.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Caim significa adquirido; a mae esperava o prometido.', obra: 'Comentario ao Genesis', ano: 1554 },
    { teologo: 'Crisostomo', periodo: 'patristico', tradicao: 'ortodoxa', texto: 'Mesmo apos a queda, a procriacao e bencao divina.', obra: 'Homilias sobre Genesis', ano: 390 },
  ],
  ["Gn 4:25","Sl 127:3"]);

add('gn', 4, 4, 'A Oferta de Abel',
  'Abel oferece os primogenitos do rebanho, e Deus aceita sua oferta pela fe.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A fe de Abel faz sua oferta agradavel.', obra: 'Comentario ao Genesis', ano: 1554 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Deus olha para a disposicao interior do coracao.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Hb 11:4","1 Jo 3:12"]);

add('gn', 4, 8, 'O Primeiro Assassinato',
  'Caim mata Abel, seu irmao. O pecado se expande para a violencia fratricida.',
  [
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'O pecado original se manifesta em odio fraternal.', obra: 'A Cidade de Deus', ano: 426 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'O pecado progride da desobediencia ao homicidio.', obra: 'Comentario ao Genesis', ano: 1554 },
  ],
  ["1 Jo 3:11-12","Mt 23:35"]);

add('gn', 4, 25, 'O Nascimento de Sete',
  'Eva da a luz Sete como substituto de Abel. A linhagem da esperanca continua.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Sete significa apontado; Deus designa uma nova semente.', obra: 'Comentario ao Genesis', ano: 1554 },
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'A historia da salvaÃ§Ã£o continua atraves da descendencia fiel.', obra: 'The New Testament and the People of God', ano: 1992 },
  ],
  ["Gn 5:3","Lc 3:38"]);

add('gn', 5, 22, 'Enoque Andou com Deus',
  'Enoque caminhou com Deus e nao mais foi visto, porque Deus o levou.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A traducao de Enoque e tipo da ascensao e da ressurreicao.', obra: 'Comentario ao Genesis', ano: 1554 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Caminhar com Deus e andar em fe e obediencia.', obra: 'De Genesi ad Litteram', ano: 401 },
  ],
  ["Hb 11:5-6","2 Co 5:6-8"]);

add('gn', 6, 5, 'A Corrupcao da Humanidade',
  'Deus ve que a maldade do homem se multiplica sobre a terra inteira.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A depravacao total: todo pensamento do coracao e mau continuamente.', obra: 'Comentario ao Genesis', ano: 1554 },
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'O coracao humano e incapaz de buscar Deus por si mesmo.', obra: 'Comentario ao Genesis', ano: 1544 },
  ],
  ["Rm 3:10-12","Jr 17:9"]);

add('gn', 6, 8, 'Noe Achou GraÃ§a',
  'Noe encontrou graÃ§a aos olhos do Senhor em meio a corrupcao generalizada.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A graÃ§a precede o merito; Noe nao era perfeito, mas fiel.', obra: 'Comentario ao Genesis', ano: 1554 },
    { teologo: 'Wesley', periodo: 'moderno', tradicao: 'arminiana', texto: 'A graÃ§a divina busca o homem mesmo na corrupcao.', obra: 'Sermoens', ano: 1750 },
  ],
  ["Ef 2:4-5","Tt 3:4-7"]);

add('gn', 6, 13, 'O Juizo Proximo',
  'Deus revela a Noe que a terra esta corrompida e sera destruida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Deus adverte antes de julgar; a destruicao e justa.', obra: 'Comentario ao Genesis', ano: 1554 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'O juizo divino e proporcional a corrupcao.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["2 P 2:4-9","Jd 6-7"]);

add('gn', 7, 1, 'Entrando na Arca',
  'Deus ordena a Noe que entre na arca com sua familia. A obediencia pela fe.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A arca e tipo de Cristo, refugio seguro do juizo.', obra: 'Comentario ao Genesis', ano: 1554 },
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'A salvacao vem pela obediencia a palavra divina.', obra: 'The New Testament and the People of God', ano: 1992 },
  ],
  ["Hb 11:7","1 P 3:20-21"]);

add('gn', 7, 16, 'A Porta Fechada por Deus',
  'Deus fez a porta da arca e a fechou. A soberania divina no juizo e na salvacao.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Deus mesmo fecha a porta: Sua soberania e absoluta.', obra: 'Comentario ao Genesis', ano: 1554 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Quando Deus fecha a porta, ninguem a abre.', obra: 'Sermons', ano: 1870 },
  ],
  ["Mt 25:10-12","Lc 13:25"]);

add('gn', 8, 1, 'Deus Lembrou-se de Noe',
  'Deus se lembrou de Noe e de todos os que estavam na arca. A fidelidade divina.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Lembrar-se e agir; Deus nunca abandona os Seus.', obra: 'Comentario ao Genesis', ano: 1554 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Deus nunca esquece Seu povo, mesmo no juizo.', obra: 'Sermons', ano: 1870 },
  ],
  ["Sl 136:23","Is 49:15-16"]);

add('gn', 8, 20, 'O Sacrificio de Noe',
  'Noe oferece holocausto ao Senhor. O aroma agradavel e sinal de alianca.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'O sacrificio agradavel prefigura Cristo.', obra: 'Comentario ao Genesis', ano: 1554 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'O perfume agradavel simboliza a aceitacao divina.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Ef 5:2","Hb 9:14"]);

add('gn', 9, 8, 'A Alianca com Noe',
  'Deus estabelece alianca com Noe, seus descendentes e toda a criacao.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A alianca nocitica e graciosa e incondicional.', obra: 'Comentario ao Genesis', ano: 1554 },
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Deus renova Sua intencao de abencoar a criacao.', obra: 'The New Testament and the People of God', ano: 1992 },
  ],
  ["Jr 33:20-21","Is 54:9-10"]);

add('gn', 9, 25, 'A Maldicao de Canaa',
  'Noe profetiza que Canaa sera servo dos servos dos irmaos.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A profecia se cumpre historicamente em Canaa.', obra: 'Comentario ao Genesis', ano: 1554 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'O pecado tem consequencias geracionais.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Dt 27:16","Gl 3:13"]);

add('gn', 11, 1, 'A Torre de Babel',
  'A humanidade tenta construir uma torre ate o ceu. A rebeliao contra Deus.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'O orgulho humano quer alcancar o ceu por si mesmo.', obra: 'Comentario ao Genesis', ano: 1554 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'A arrogancia e mae de todas as heresias.', obra: 'A Cidade de Deus', ano: 426 },
  ],
  ["Dt 29:29","Jr 23:23-24"]);

add('gn', 13, 8, 'A Separacao de Abraao e Lo',
  'Abraao propoe separacao a Lo, preferindo a si mesmo. Humildade e fe.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Abraao confia que Deus provera.', obra: 'Comentario ao Genesis', ano: 1554 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'A generosidade e fruto da fe na providencia divina.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Mt 6:33","Fp 2:3-4"]);

add('gn', 13, 14, 'A Promessa da Terra',
  'Deus promete a Abraao toda a terra que ele pode ver, para sempre.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A promessa da terra e base para todas as promessas futuras.', obra: 'Comentario ao Genesis', ano: 1554 },
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'A terra prometida aponta para a nova criacao.', obra: 'The New Testament and the People of God', ano: 1992 },
  ],
  ["Gl 3:17","Hb 11:8-10"]);

add('gn', 14, 18, 'Melquisedeque',
  'Melquisedeque, rei de Salem, traz pao e vinho e abencoa Abraao.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Melquisedeque e tipo de Cristo, sumo sacerdote eterno.', obra: 'Comentario ao Genesis', ano: 1554 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'A superioridade de Melquisedeque prefigura Cristo.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Hb 7:1-3","Sl 110:4"]);

add('gn', 16, 7, 'O Anjo e Agar',
  'O anjo do Senhor encontra Agar no deserto e lhe faz promessas.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Deus ve o sofrimento dos humildes e oprimidos.', obra: 'Comentario ao Genesis', ano: 1554 },
    { teologo: 'Crisostomo', periodo: 'patristico', tradicao: 'ortodoxa', texto: 'A misericordia divina se estende ate a serva.', obra: 'Homilias sobre Genesis', ano: 390 },
  ],
  ["Sl 34:18","Mt 25:35-36"]);

add('gn', 17, 1, 'A Alianca da Circuncisao',
  'Deus estabelece a circuncisao como sinal da alianca eterna.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A circuncisao e sinal, nao causa da justica.', obra: 'Comentario ao Genesis', ano: 1554 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'O sinal da alianca prepara para o sacramento do batismo.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Rm 4:11","Cl 2:11-12"]);

add('gn', 17, 7, 'A Alianca Eterna',
  'Deus promete ser Deus para Abraao e sua descendencia, por todas as geracoes.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A alianca e graciosa e eterna, fundada na promessa divina.', obra: 'Comentario ao Genesis', ano: 1554 },
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'A alianca abraamica se cumpre em Cristo.', obra: 'The New Testament and the People of God', ano: 1992 },
  ],
  ["Gl 3:16-17","Hb 8:8-10"]);

add('gn', 18, 1, 'Os Tres Visitantes',
  'Tres homens aparecem a Abraao junto ao carvalho de Mamre.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A visitacao divina e sinal de alianca e comunhao.', obra: 'Comentario ao Genesis', ano: 1554 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'A Trindade se manifesta misteriosamente.', obra: 'De Trinitate', ano: 517 },
  ],
  ["Hb 13:2","Mt 25:35-40"]);

add('gn', 18, 22, 'A Intercessao por Sodoma',
  'Abraao intercede por Sodoma: nao destruira o justo com o impio.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'O modelo de intercessao: ousadia reverente.', obra: 'Comentario ao Genesis', ano: 1554 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Interceder pelos perdidos e obra de amor.', obra: 'Sermons', ano: 1870 },
  ],
  ["Ex 32:11-14","Tg 5:16"]);

add('gn', 19, 24, 'A DestruiÃ§ao de Sodoma',
  'Deus faz chover enxofre e fogo sobre Sodoma e Gomorra.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'O juizo divino e justo sobre a impiedade corrupta.', obra: 'Comentario ao Genesis', ano: 1554 },
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Deus e paciente, mas seu juizo e certo.', obra: 'Comentario ao Genesis', ano: 1544 },
  ],
  ["2 P 2:6","Jd 7"]);

add('gn', 20, 3, 'Abimeleque e Sara',
  'Deus adverte Abimeleque num sonho: morreras por causa da mulher que tomaste.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Deus protege a promessa mesmo quando o homem falha.', obra: 'Comentario ao Genesis', ano: 1554 },
    { teologo: 'Crisostomo', periodo: 'patristico', tradicao: 'ortodoxa', texto: 'A soberania divina preserva o plano da salvacao.', obra: 'Homilias sobre Genesis', ano: 390 },
  ],
  ["Rm 8:28","Sl 105:14-15"]);

add('gn', 21, 1, 'O Nascimento de Isaque',
  'Sara concebe e da a luz Isaque no tempo prometido. O cumprimento da promessa.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Isaque nasce pela promessa, nao pela natureza.', obra: 'Comentario ao Genesis', ano: 1554 },
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'O nascimento miraculoso aponta para a graÃ§a divina.', obra: 'The New Testament and the People of God', ano: 1992 },
  ],
  ["Gl 4:28","Rm 9:8-9"]);

add('gn', 21, 6, 'A Alegria de Sara',
  'Sara exclama: Deus preparou para mim riso. A alegria do cumprimento.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'O riso de Sara e de admiracao e gratidao.', obra: 'Comentario ao Genesis', ano: 1554 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'A alegria da graÃ§a supera a expectativa humana.', obra: 'Sermons', ano: 1870 },
  ],
  ["Sl 126:1-3","Lc 1:14"]);

add('gn', 21, 10, 'A Expulsao de Agar',
  'Sara pede que Agar e Ismael sejam expulsos. Deus protege a ambos.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Deus nao abandona Agar e Ismael, mesmo na expulsao.', obra: 'Comentario ao Genesis', ano: 1554 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Agar e Ismael representam a servidao pela Lei.', obra: 'A Cidade de Deus', ano: 426 },
  ],
  ["Gl 4:21-31"]);

add('gn', 22, 12, 'O Sacrificio Aceito',
  'Deus detem a mao de Abraao: agora sei que temes a Deus.',
  [
    { teologo: 'Kierkegaard', periodo: 'moderno', tradicao: 'luterana', texto: 'O salto da fe: obedece quando nao compreende.', obra: 'Temor e Tremor', ano: 1843 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A obediencia pela fe e aceita por Deus.', obra: 'Comentario ao Genesis', ano: 1554 },
  ],
  ["Tg 2:21-23","Hb 11:17-19"]);

add('gn', 23, 1, 'A Morte de Sara',
  'Sara morre aos 127 anos e e sepultada no campo de Machpela.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A compra da sepultura e antecipacao da heranca da terra.', obra: 'Comentario ao Genesis', ano: 1554 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'A morte dos justos e preciosa aos olhos do Senhor.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 116:15","Fp 1:21"]);

add('gn', 24, 1, 'A Esposa para Isaque',
  'Abraao envia seu servo buscar esposa para Isaque. Fe na providencia divina.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Deus guia a historia para cumprir Suas promessas.', obra: 'Comentario ao Genesis', ano: 1554 },
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'A providencia divina se manifesta nos detalhes.', obra: 'The New Testament and the People of God', ano: 1992 },
  ],
  ["Rm 8:28","Pv 3:5-6"]);

add('gn', 25, 19, 'Jaco e Esau',
  'Os gemeos lutam no ventre de Rebeca. A soberania divina sobre nacoes.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Nao por obras, mas pela promessa.', obra: 'Comentario ao Genesis', ano: 1554 },
    { teologo: 'R.C. Sproul', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'A eleicao divina nao depende do merito humano.', obra: 'The Holiness of God', ano: 1985 },
  ],
  ["Rm 9:10-13","Ml 1:2-3"]);

add('gn', 26, 1, 'A Promessa Reiterada',
  'Deus aparece a Isaque e confirma a alianca feita com Abraao.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Deus renova a alianca com cada geracao.', obra: 'Comentario ao Genesis', ano: 1554 },
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'A fidelidade de Deus transcende as geracoes.', obra: 'The New Testament and the People of God', ano: 1992 },
  ],
  ["Gl 3:17","Hb 11:20"]);

add('gn', 27, 1, 'A Bencao Roubada',
  'Jaco engana o pai e recebe a bencao destinada a Esau.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Deus usa os meios imperfeitos para cumprir Sua vontade.', obra: 'Comentario ao Genesis', ano: 1554 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'A bencao e irrevogavel uma vez pronunciada.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Hb 12:16-17","Rm 9:12-13"]);

add('gn', 28, 10, 'A Escada de Jaco',
  'Jaco sonha com uma escada que vai da terra ao ceu.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A escada e tipo de Cristo, unico mediador.', obra: 'Comentario ao Genesis', ano: 1554 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'A visao revela a comunhao entre ceu e terra.', obra: 'De Genesi ad Litteram', ano: 401 },
  ],
  ["Jo 1:51","1 Tm 2:5"]);

add('gn', 28, 15, 'Eu Sou Contigo',
  'Deus promete a Jaco: nao te deixarei ate que cumpra o que te prometi.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A presenca de Deus e a maior promessa.', obra: 'Comentario ao Genesis', ano: 1554 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Deus nunca abandona Seu povo.', obra: 'Sermons', ano: 1870 },
  ],
  ["Mt 28:20","Hb 13:5"]);

add('gn', 29, 1, 'Jaco e Raquel',
  'Jaco encontra Raquel no poco e trabalha sete anos por ela.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'O amor e a dedicacao sao frutos da providencia divina.', obra: 'Comentario ao Genesis', ano: 1554 },
    { teologo: 'Crisostomo', periodo: 'patristico', tradicao: 'ortodoxa', texto: 'Deus guia os passos dos Seus filhos.', obra: 'Homilias sobre Genesis', ano: 390 },
  ],
  ["Pv 19:14","Cl 3:12-14"]);

add('gn', 30, 1, 'Os Filhos de Jaco',
  'Raquele e Lea dao a luz filhos que serao as doze tribos de Israel.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Deus transforma a rivalidade em bencao.', obra: 'Comentario ao Genesis', ano: 1554 },
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'As doze tribos sao base do povo da alianca.', obra: 'The New Testament and the People of God', ano: 1992 },
  ],
  ["Ap 7:4-8","Mt 19:28"]);

add('gn', 31, 3, 'A Fuga de Jaco',
  'Deus ordena a Jaco que volte a sua terra. A providencia na fuga.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Deus protege a fuga de Jaco.', obra: 'Comentario ao Genesis', ano: 1554 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Deus guia os passos do Seu povo.', obra: 'Sermons', ano: 1870 },
  ],
  ["Sl 37:23","Ex 14:19-20"]);

add('gn', 32, 9, 'A OraÃ§ao de Jaco',
  'Jaco ora humildemente: nao sou digno de todas as misericordias.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A humildade e o inicio da oracao aceita.', obra: 'Comentario ao Genesis', ano: 1554 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'A oracao deve ser humilde e confiante.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Tg 4:6-10","1 P 5:5-6"]);

add('gn', 32, 24, 'Lutando com Deus',
  'Jaco luta com um homem ate o amanhecer e recebe o nome Israel.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A luta e na verdade uma bencao.', obra: 'Comentario ao Genesis', ano: 1554 },
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'A fe e luta com Deus e esperanca em Sua misericordia.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Vencer em Deus e permitir que Ele nos venca.', obra: 'Confissoes', ano: 398 },
  ],
  ["Hs 12:3-4","Rm 11:33-36"]);

add('gn', 33, 1, 'O Encontro com Esau',
  'Jaco se curva sete vezes diante de Esau, que o recebe com abraco.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A reconciliacao e fruto da graÃ§a de Deus.', obra: 'Comentario ao Genesis', ano: 1554 },
    { teologo: 'Tim Keller', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'O evangelho transforma inimigos em irmaos.', obra: 'Walking with God', ano: 2013 },
  ],
  ["Rm 12:17-21","Mt 5:9"]);

add('gn', 34, 1, 'Dina e os Siquemitas',
  'A violacao de Dina e a vinganca dos irmaos. Consequencias do pecado.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A vinganca injusta causa mais dano.', obra: 'Comentario ao Genesis', ano: 1554 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'A justica deve ser buscada nos meios legitimos.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Rm 12:19","Mt 26:52"]);

add('gn', 35, 1, 'Betel: Renovacao da Alianca',
  'Deus ordena a Jaco que volte a Betel. Renovacao espiritual.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Betel e lugar de recordacao da graÃ§a divina.', obra: 'Comentario ao Genesis', ano: 1554 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Voltar a Betel e voltar a Deus.', obra: 'Sermons', ano: 1870 },
  ],
  ["Is 44:2-5","Ap 2:4-5"]);

add('gn', 37, 1, 'Os Sonhos de Jose',
  'Jose sonha com feixes de trigo e astros se curvando. A soberania divina.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Deus prepara Jose para seu papel atraves dos sonhos.', obra: 'Comentario ao Genesis', ano: 1554 },
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Deus revela Seus propostos atraves de sonhos.', obra: 'The New Testament and the People of God', ano: 1992 },
  ],
  ["Dt 29:29","Jl 2:28"]);

add('gn', 37, 18, 'A Conspiracao contra Jose',
  'Os irmaos de Jose conspiram para mata-lo, movidos pela inveja.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A inveja e raiz de muitos males.', obra: 'Comentario ao Genesis', ano: 1554 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'O pecado dos irmaos se torna instrumento da salvacao.', obra: 'A Cidade de Deus', ano: 426 },
  ],
  ["Mt 27:18","Gl 5:21"]);

add('gn', 37, 28, 'Jose Vendido',
  'Jose e vendido aos ismaelitas por vinte pecas de prata.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Deus transforma o mal em bem.', obra: 'Comentario ao Genesis', ano: 1554 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'A providencia divina guia mesmo os atos mas.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Rm 8:28","Gn 50:20"]);

add('gn', 38, 1, 'Juda e Tamar',
  'A historia de Juda e Tamar: justica e linhagem messianica.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Deus usa instrumentos imperfeitos.', obra: 'Comentario ao Genesis', ano: 1554 },
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'A linhagem de Juda e caminho para o Messias.', obra: 'The New Testament and the People of God', ano: 1992 },
  ],
  ["Mt 1:3","Rm 1:3"]);

add('gn', 39, 1, 'Jose no Egito',
  'Jose e levado ao Egito e prospera na casa de Potifar.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Deus promove o justo mesmo em terra estranha.', obra: 'Comentario ao Genesis', ano: 1554 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Deus esta conosco em toda circunstancia.', obra: 'Sermons', ano: 1870 },
  ],
  ["Sl 105:17-19","At 7:9-10"]);

add('gn', 39, 9, 'Jose e a Tentacao',
  'Jose resiste a tentacao da mulher de Potifar.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A fidelidade a Deus supera qualquer tentacao.', obra: 'Comentario ao Genesis', ano: 1554 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'A virtude da castidade e preservada pela graÃ§a.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["1 Co 10:13","Tg 1:12-14"]);

add('gn', 40, 1, 'O Faraa e os Sonhos',
  'Jose interpreta os sonhos do copeiro e do padeiro do Faraa.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Deus prepara Jose para interpretar os sonhos.', obra: 'Comentario ao Genesis', ano: 1554 },
    { teologo: 'Crisostomo', periodo: 'patristico', tradicao: 'ortodoxa', texto: 'A paciencia de Jose e recompensada.', obra: 'Homilias sobre Genesis', ano: 390 },
  ],
  ["Dn 2:28","Jl 2:28"]);

add('gn', 41, 1, 'Sonhos do Faraa',
  'Jose interpreta os sonhos do Faraa sobre as sete vacas magras.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Deus revela o futuro aos reis.', obra: 'Comentario ao Genesis', ano: 1554 },
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'A sabedoria divina esta disponivel a todos.', obra: 'The New Testament and the People of God', ano: 1992 },
  ],
  ["Dn 2:21-22","Sl 25:12-14"]);

add('gn', 41, 33, 'Jose Exaltado',
  'O Faraa exalta Jose: quem ha como tu, homem em quem esta o Esprito?',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Deus exalta os humildes.', obra: 'Comentario ao Genesis', ano: 1554 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'O Esprito de Deus capacita para governar.', obra: 'Sermons', ano: 1870 },
  ],
  ["Lc 1:52","Tg 4:10"]);

add('gn', 42, 1, 'Os Irmaos no Egito',
  'Os irmaos de Jose vao ao Egito buscar trigo e se prosternam.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Os sonhos de Jose se cumprem.', obra: 'Comentario ao Genesis', ano: 1554 },
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'A providencia de Deus opera na historia.', obra: 'The New Testament and the People of God', ano: 1992 },
  ],
  ["Gn 37:7-10","Rm 8:28"]);

add('gn', 44, 1, 'A Taca de Prata',
  'Jose coloca sua taca no saco de Benjamim para testar seus irmaos.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'O teste revela se os irmaos mudaram de coracao.', obra: 'Comentario ao Genesis', ano: 1554 },
    { teologo: 'Tim Keller', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'A graÃ§a de Deus transforma o carater.', obra: 'Walking with God', ano: 2013 },
  ],
  ["2 Co 13:5","Lm 3:40"]);

add('gn', 45, 1, 'Jose se Revela',
  'Jose nao pode conter as lagrimas e se revela aos irmaos.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A reconciliacao e fruto do arrependimento e do perdao.', obra: 'Comentario ao Genesis', ano: 1554 },
    { teologo: 'Tim Keller', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'O evangelho reconcilia onde havia separacao.', obra: 'Walking with God', ano: 2013 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Deus usou o mal para bem.', obra: 'Confissoes', ano: 398 },
  ],
  ["Rm 5:10","2 Co 5:18-19"]);

add('gn', 47, 1, 'Jose Apresenta a Familia',
  'Jose apresenta seus irmaos ao Faraa e os estabelece em Gosem.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Deus prepara lugar para Seu povo.', obra: 'Comentario ao Genesis', ano: 1554 },
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'O povo de Deus se estabelece em terra estranha.', obra: 'The New Testament and the People of God', ano: 1992 },
  ],
  ["Jo 14:2-3","Hb 11:13-16"]);

add('gn', 49, 1, 'As Bencaos de Jaco',
  'Jaco abencoa seus doze filhos profeticamente.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'As bencaos profeticas apontam para o Messias.', obra: 'Comentario ao Genesis', ano: 1554 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'A profecia sobre Juda anuncia o ceto messianico.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Nm 24:9","Ap 5:5"]);

add('gn', 50, 15, 'Jose Perdoa os Irmaos',
  'Jose perdoa seus irmaos: vÃ³s pensastes mal, Deus o resolveu para bem.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'O perdao e fruto da confianca na soberania divina.', obra: 'Comentario ao Genesis', ano: 1554 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Deus transforma o mal em bem.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Tim Keller', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'O evangelho capacita a perdoar irrestritamente.', obra: 'Walking with God', ano: 2013 },
  ],
  ["Rm 8:28","Mt 6:14-15"]);

add('ex', 3, 14, 'Eu Sou o Que Sou',
  'A revelaÃ§ao do nome divino.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Autoexistente, imutavel e fiel as promessas.', obra: 'Comentario ao Exodo', ano: 1561 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Deus e ato puro, sem potencialidade.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Jo 8:58","Ex 3:14"]);

add('ex', 12, 1, 'A Pascoa',
  'O cordeiro pascal como tipo de Cristo.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Tipologia cristologica: o cordeiro prefigura Cristo.', obra: 'Comentario ao Exodo', ano: 1561 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Nossa Pascoa, Cristo, foi sacrificado por nos.', obra: 'Sermoens', ano: 410 },
  ],
  ["1 Co 5:7","Jo 1:29"]);

add('ex', 12, 13, 'O sangue sera um sinal',
  'O sinal do sangue no denteiro.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'O sangue protege do juizo divino.', obra: 'Comentario ao Exodo', ano: 1561 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'O sangue e sinal de salvacao.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Hb 9:22","1 P 1:19"]);

add('ex', 14, 13, 'Nao temais, estai firmes',
  'A exortacao diante do mar Vermelho.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A fe e necessaria antes da deliverance.', obra: 'Comentario ao Exodo', ano: 1561 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Deus e nosso escudo.', obra: 'Sermons', ano: 1870 },
  ],
  ["2 Cr 20:17","Ef 6:10-11"]);

add('ex', 14, 21, 'O mar se Abre',
  'A abertura do mar Vermelho.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'O poder criador de Deus se repete na redencao.', obra: 'Comentario ao Exodo', ano: 1561 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'A salvacao e obra divina.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 106:9","He 11:29"]);

add('ex', 15, 1, 'O Cantico de Moises',
  'O louvor apos a vitoria.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'O louvor e resposta a salvacao.', obra: 'Comentario ao Exodo', ano: 1561 },
    { teologo: 'Crisostomo', periodo: 'patristico', tradicao: 'ortodoxa', texto: 'O louvor celebra a vitoria de Deus.', obra: 'Homilias', ano: 390 },
  ],
  ["Ap 15:3","Sl 106:12"]);

add('ex', 16, 4, 'O Mana do Ceus',
  'O pao do ceu tipo de Cristo.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'O mana e tipo de Cristo.', obra: 'Comentario ao Exodo', ano: 1561 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Cristo e o verdadeiro mana.', obra: 'Tratados sobre Joao', ano: 418 },
  ],
  ["Jo 6:31-35","1 Co 10:3"]);

add('ex', 17, 1, 'Agua da Rocha',
  'A rocha que brota agua no deserto.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A rocha e Cristo.', obra: 'Comentario ao Exodo', ano: 1561 },
    { teologo: 'Paulo', periodo: 'patristico', tradicao: 'reformada', texto: 'A rocha espiritual era Cristo.', obra: '1 Co 10:4', ano: 55 },
  ],
  ["1 Co 10:4","Jo 4:14"]);

add('ex', 19, 4, 'Vos Vi no Deserto',
  'A fidelidade divina no Exodo.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Deus sustenta Seu povo.', obra: 'Comentario ao Exodo', ano: 1561 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Deus carrega os Seus.', obra: 'Sermons', ano: 1870 },
  ],
  ["Dt 32:11","Sl 91:4"]);

add('ex', 20, 1, 'Os Dez Mandamentos',
  'A lei moral de Deus.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A lei revela a vontade de Deus.', obra: 'Institutas', ano: 1536 },
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'So Deus merece adoracao.', obra: 'Os Catecismos', ano: 1529 },
  ],
  ["Mt 22:37-40","Rm 7:7-12"]);

add('ex', 25, 8, 'Fazei-me um Santuario',
  'O tabernaculo e a presenca divina.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'O tabernaculo aponta para Cristo.', obra: 'Comentario ao Exodo', ano: 1561 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'O santuario e imagem do ceu.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Jo 1:14","He 9:1-10"]);

add('ex', 32, 1, 'O Bezerro de Ouro',
  'A idolatria de Israel.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A idolatria e a praga da igreja.', obra: 'Comentario ao Exodo', ano: 1561 },
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'O homem busca Deus visivel.', obra: 'Comentario ao Exodo', ano: 1544 },
  ],
  ["1 Co 10:7","Rm 1:21-23"]);

add('ex', 33, 11, 'Fala-face a Face',
  'A intimidade de Moises com Deus.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A intimidade com Deus e privilegio.', obra: 'Comentario ao Exodo', ano: 1561 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Moises viu as costas de Deus.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Nm 12:8","Dt 34:10"]);

add('ex', 34, 6, 'O Carater de Deus',
  'A revelaÃ§ao do carater divino.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Misericordia e graÃ§a sao primarios.', obra: 'Comentario ao Exodo', ano: 1561 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Deus se define pela bondade.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Nm 14:18","Sl 86:15"]);

add('ex', 40, 34, 'A Gloria enche o Tabernaculo',
  'A presenca divina visivel.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Deus habita no meio do povo.', obra: 'Comentario ao Exodo', ano: 1561 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'A gloria divina se manifesta.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["2 Cr 5:13-14","Jo 1:14"]);

add('lv', 16, 2, 'O Dia da Expiacao',
  'A expiacao pelo pecado de todo o povo.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Prefigura Cristo entrando no ceu.', obra: 'Comentario ao Levitico', ano: 1561 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'O bode expiatÃ³rio carrega os pecados.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["He 9:7-14","1 Jo 2:2"]);

add('lv', 19, 18, 'Amaras o Teu Proximo',
  'O mandamento do amor.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Jesus cita este versiculo.', obra: 'Comentario ao Levitico', ano: 1561 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'O amor ao proximo e extensao do amor a Deus.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Mt 22:39","Rm 13:8-10"]);

add('nu', 6, 24, 'A Bencao AarÃ´nica',
  'A bencao trinitaria sobre Israel.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A bencao e trinitaria.', obra: 'Comentario aos Numeros', ano: 1561 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Transmissao da graÃ§a divina.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["2 Co 13:14"]);

add('nu', 21, 8, 'A Serpente de Bronze',
  'Tipo de Cristo crucificado.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Cristo erguido para que vivamos.', obra: 'Comentario aos Numeros', ano: 1561 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Cristo aplica este tipo em Jo 3:14.', obra: 'Sermoens', ano: 410 },
  ],
  ["Jo 3:14-15"]);

add('nu', 23, 19, 'Deus Nao e Homem',
  'A imutabilidade divina.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Deus nao muda em seus propostos.', obra: 'Comentario aos Numeros', ano: 1561 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'A imutabilidade e perfeicao.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["1 S 15:29","Tg 1:17"]);

add('dt', 6, 4, 'O Shema de Israel',
  'O monoteismo fundamental.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'O monoteismo e fundamento da fe.', obra: 'Comentario ao Deuteronomio', ano: 1561 },
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'O primeiro e grande mandamento.', obra: 'Os Catecismos', ano: 1529 },
  ],
  ["Mc 12:29-30","Mt 22:37"]);

add('dt', 30, 19, 'Escolha a Vida',
  'A exortacao a obediencia.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A soberania nao anula a responsabilidade.', obra: 'Comentario ao Deuteronomio', ano: 1561 },
    { teologo: 'Wesley', periodo: 'moderno', tradicao: 'arminiana', texto: 'A graÃ§a capacita a escolha.', obra: 'Sermoens', ano: 1750 },
  ],
  ["Js 24:15","Mt 7:13-14"]);

add('js', 1, 9, 'Sai Forte e Corajoso',
  'A comissao a Josue.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A presenca de Deus e a fonte da coragem.', obra: 'Comentario a Josue', ano: 1561 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'A onipresenca e conforto supremo.', obra: 'Sermons', ano: 1870 },
  ],
  ["He 13:5","Mt 28:20"]);

add('js', 6, 20, 'As Muralhas de Jerico',
  'O poder da obediencia.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Deus usa meios aparentemente loucos.', obra: 'Comentario a Josue', ano: 1561 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'A obediencia simples e a chave.', obra: 'Sermons', ano: 1870 },
  ],
  ["He 11:30","2 Co 10:4-5"]);

add('js', 24, 15, 'Escolhe Hoje a Quem Servir',
  'A decisao de Josue.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A decisao e pessoal e familiar.', obra: 'Comentario a Josue', ano: 1561 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'A escolha deve ser firme.', obra: 'Sermons', ano: 1870 },
  ],
  ["Dt 30:19","1 Rs 18:21"]);

add('jz', 2, 10, 'Outra Geracao',
  'A quebra da transmissao da fe.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A negligencia gera infidelidade.', obra: 'Comentario aos Juizes', ano: 1561 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Quando pais falham, filhos padecem.', obra: 'Sermons', ano: 1870 },
  ],
  ["Dt 6:6-7","Pv 22:6"]);

add('jz', 2, 16, 'O Ciclo dos Juizes',
  'Pecado, opressao, clamor, livramento.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Deus nao abandona Seu povo.', obra: 'Comentario aos Juizes', ano: 1561 },
    { teologo: 'Matthew Henry', periodo: 'moderno', tradicao: 'reformada', texto: 'Consequencias de fazer o que parece certo.', obra: 'Comentario Completo', ano: 1708 },
  ],
  ["Rm 7:24-25"]);

add('jz', 7, 7, 'Com 300 Homens',
  'A vitoria e do Senhor.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Deus reduz para que a gloria seja dEle.', obra: 'Comentario aos Juizes', ano: 1561 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Poucos sao suficientes quando Deus lidera.', obra: 'Sermons', ano: 1870 },
  ],
  ["1 S 14:6","2 Cr 14:11"]);

add('jz', 16, 30, 'Sansao na Morte',
  'Redencao na fraqueza.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Ate na queda Deus usa para Sua gloria.', obra: 'Comentario aos Juizes', ano: 1561 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'A morte de Sansao prefigura Cristo.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["He 11:32-34","Rm 8:28"]);

add('rt', 1, 16, 'Onde Ires, Eu Irei',
  'Lealdade e fe transcultural.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A lealdade de Rute e modelo.', obra: 'Comentario a Rute', ano: 1561 },
    { teologo: 'Tim Keller', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'A graÃ§a se estende a todas as nacoes.', obra: 'Walking with God', ano: 2013 },
  ],
  ["Rt 1:16-17","Mt 1:5"]);

add('rt', 4, 14, 'Um Redentor nasceu',
  'A linhagem messianica continua.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Deus cumpre Sua promessa.', obra: 'Comentario a Rute', ano: 1561 },
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Rute entra na linhagem do Messias.', obra: 'The New Testament and the People of God', ano: 1992 },
  ],
  ["Mt 1:5","Rm 1:3"]);

add('1sm', 1, 27, 'O Pedi ao Senhor',
  'A oracao de Ana atendida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A oracao de fe e atendida.', obra: 'Comentario ao 1 Samuel', ano: 1561 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Deus ouve o clamor dos humildes.', obra: 'Sermons', ano: 1870 },
  ],
  ["Sl 34:6","Tg 5:16"]);

add('1sm', 3, 10, 'Fala, Senhor, Que Teu Servo Ouve',
  'A chamada de Samuel.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A prontidao para ouvir e o inicio da fe.', obra: 'Comentario ao 1 Samuel', ano: 1561 },
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Deus fala, mas o homem precisa ouvir.', obra: 'Sermoens', ano: 1530 },
  ],
  ["Is 6:8","Mt 13:9-17"]);

add('1sm', 8, 7, 'Nao Rejeitaram a Ti, mas a Mim',
  'O povo pede um rei.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A monarquia nao e o ideal divino.', obra: 'Comentario ao 1 Samuel', ano: 1561 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Deus permite a monarquia.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["1 Sm 10:19","Rm 13:1"]);

add('1sm', 15, 22, 'Obediencia Melhor que Sacrificio',
  'Deus prefere obediencia.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A obediencia e fruto da fe.', obra: 'Comentario ao 1 Samuel', ano: 1561 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'A virtude da obediencia.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Os 6:6","Mt 9:13"]);

add('1sm', 16, 7, 'Deus Ve o Coracao',
  'Deus nao olha a aparancia.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Deus avalia pelo critÃ©rio divino.', obra: 'Comentario ao 1 Samuel', ano: 1561 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Humilha orgulhosos e conforta humildes.', obra: 'Sermons', ano: 1870 },
  ],
  ["1 Co 1:27-29"]);

add('1sm', 17, 45, 'Tu Vens Com Espada e Lanca',
  'Davi vs Golias.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A vitoria e do Senhor.', obra: 'Comentario ao 1 Samuel', ano: 1561 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'O nome do Senhor e mais poderoso.', obra: 'Sermons', ano: 1870 },
  ],
  ["Ef 6:10-17","2 Co 10:4"]);

add('2sm', 7, 12, 'A Alianca Davidica Eterna',
  'A promessa messianica.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'O Filho de Davi e o Messias eterno.', obra: 'Comentario ao 2 Samuel', ano: 1561 },
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Jesus cumpre a promessa.', obra: 'Jesus and the Victory of God', ano: 1996 },
  ],
  ["Lc 1:32-33","At 2:29-32"]);

add('2sm', 11, 27, 'A Coisa Desagradou ao Senhor',
  'A queda de Davi.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Ninguem e imune a tentacao.', obra: 'Comentario ao 2 Samuel', ano: 1561 },
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Ate grandes homens podem cair.', obra: 'Sermoens', ano: 1530 },
  ],
  ["2 Tm 4:10","1 Co 10:12"]);

add('2sm', 12, 13, 'O Senhor Removeu Teu Pecado',
  'O perdao de Davi.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'O perdao e gracioso.', obra: 'Comentario ao 2 Samuel', ano: 1561 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'A confissao sincera obtem perdao.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 32:1-5","1 Jo 1:9"]);

add('1rs', 3, 5, 'Pede o Que Quiseres',
  'A sabedoria de Salomao.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A sabedoria e o dom mais precioso.', obra: 'Comentario aos Reis', ano: 1561 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Pedir sabedoria e o pedido mais sabio.', obra: 'Sermons', ano: 1870 },
  ],
  ["Tg 1:5","Pv 4:7"]);

add('1rs', 8, 27, 'A Grandeza de Deus',
  'Nem os ceus podem conter a Deus.',
  [
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Deus nao habita em templos feitos por maos.', obra: 'Suma Teologica', ano: 1274 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A onipresenca nao pode ser confinada.', obra: 'Comentario aos Reis', ano: 1561 },
  ],
  ["At 17:24-25","Is 66:1"]);

add('1rs', 11, 4, 'O Coracao de Salomao',
  'A infidelidade no fim.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A sabedoria sem fe degenera.', obra: 'Comentario aos Reis', ano: 1561 },
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'A fe deve ser mantida ate o fim.', obra: 'Sermoens', ano: 1530 },
  ],
  ["Pv 4:23","1 Co 10:12"]);

add('1rs', 19, 12, 'A Voz Fina e Delicada',
  'Deus no silencio.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Deus fala no silencio da alma.', obra: 'Comentario aos Reis', ano: 1561 },
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'O Still Small Voice.', obra: 'Church Dogmatics', ano: 1951 },
  ],
  ["Sl 46:10","He 12:14"]);

add('2rs', 2, 11, 'Um Carro de Fogo',
  'A ascensao de Elias.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Deus leva Seus servos gloriosamente.', obra: 'Comentario aos Reis', ano: 1561 },
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Prefigura a ascensao de Cristo.', obra: 'The New Testament and the People of God', ano: 1992 },
  ],
  ["At 1:9"]);

add('2rs', 5, 14, 'Mergulha Sete Vezes',
  'Naamao curado pela obediencia.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A obediencia simples e chave.', obra: 'Comentario aos Reis', ano: 1561 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'A fe obedece mesmo sem entender.', obra: 'Sermons', ano: 1870 },
  ],
  ["Mt 8:2-4","Lc 4:27"]);

add('jb', 1, 21, 'Nu SaÃ­ do Ventre da MÃ£e',
  'A confianÃ§a absoluta de Job.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A fe genuina persevera na desgraca.', obra: 'Comentario ao Job', ano: 1561 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Deus da e Deus tira.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 49:17","1 Tm 6:7"]);

add('jb', 2, 10, 'Receberemos de Deus o Mal?',
  'A fidelidade de Job.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A fe persevera sem entender.', obra: 'Comentario ao Job', ano: 1561 },
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'O sofrimento e escola da fe.', obra: 'Sermoens', ano: 1530 },
  ],
  ["Rm 5:3-5","1 P 1:6-7"]);

add('jb', 13, 15, 'Mata-me, Esperarei',
  'Fe inabalavel na morte.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A fe persiste mesmo quando tudo parece perdido.', obra: 'Comentario ao Job', ano: 1561 },
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'A fe e confianÃ§a em Deus.', obra: 'Church Dogmatics', ano: 1951 },
  ],
  ["Rm 8:38-39","He 11:1"]);

add('jb', 19, 25, 'Eu Sei que Meu Resgatador Vive',
  'A ressurreicao.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A esperanca da ressurreicao brilha.', obra: 'Comentario ao Job', ano: 1561 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Confissao de fe na ressurreicao.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["He 11:19","1 Co 15:12-22"]);

add('jb', 38, 4, 'Onde Estavas Tu?',
  'A soberania divina.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Deus e o Criador; o homem e criatura.', obra: 'Comentario ao Job', ano: 1561 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'A onisciencia divina transcende.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Is 40:12-14","Sl 104:5"]);

add('jb', 42, 5, 'Te Ouvi Falar, Agora Te Vejo',
  'A experiencia transformadora.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'O conhecimento de Deus e transformador.', obra: 'Comentario ao Job', ano: 1561 },
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Deus se revela em Sua soberana liberdade.', obra: 'Church Dogmatics', ano: 1951 },
  ],
  ["1 Co 13:12","2 Co 3:18"]);

add('sl', 1, 1, 'O homem bem-aventurado',
  'O salmo introdutorio.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A felicidade vem da meditacao na Lei.', obra: 'Comentario aos Salmos', ano: 1557 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'A verdadeira felicidade e andar nos caminhos de Deus.', obra: 'The Treasury of David', ano: 1882 },
  ],
  ["Js 1:2-3","Mt 5:3-6"]);

add('sl', 2, 7, 'Tu es Meu Filho',
  'Salmo messianico.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A relacao Pai-Filho e eterna.', obra: 'Comentario aos Salmos', ano: 1557 },
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Citado em He 1:5 e At 13:33.', obra: 'The New Testament and the People of God', ano: 1992 },
  ],
  ["He 1:5","At 13:33"]);

add('sl', 16, 10, 'Nao deixaras o teu Santo ver a corrupcao',
  'A ressurreicao.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Deus nao permite corrupcao do Santo.', obra: 'Comentario aos Salmos', ano: 1557 },
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Pedro cita em Atos 2.', obra: 'Sermoens', ano: 1530 },
  ],
  ["At 2:25-32","At 13:35-37"]);

add('sl', 22, 1, 'Deus Meu, Por Que Me Desamparaste?',
  'O sofrimento do Messias.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Palavras citadas por Jesus na cruz.', obra: 'Comentario aos Salmos', ano: 1557 },
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Deus abandona o Filho para nunca nos abandonar.', obra: 'Church Dogmatics', ano: 1951 },
  ],
  ["Mt 27:46","Mc 15:34"]);

add('sl', 23, 1, 'O Senhor e o Meu Pastor',
  'O salmo mais amado.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Cuidado pessoal, provisao e proteÃ§Ã£o.', obra: 'Comentario aos Salmos', ano: 1557 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'O Pastor onipotente supre tudo.', obra: 'Salmo 23', ano: 1865 },
  ],
  ["Jo 10:11-14","1 P 2:25"]);

add('sl', 27, 1, 'O Senhor e a minha luz',
  'ConfianÃ§a absoluta.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Deus e luz que dissipa trevas.', obra: 'Comentario aos Salmos', ano: 1557 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Quem tem Deus tem tudo.', obra: 'Sermons', ano: 1870 },
  ],
  ["Jo 8:12","1 Jo 1:5"]);

add('sl', 32, 1, 'Bem-aventurado o perdoado',
  'A bencao do perdao.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'O perdao e a maior bencao.', obra: 'Comentario aos Salmos', ano: 1557 },
    { teologo: 'TomÃ¡s de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'O perdao traz alegria.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Rm 4:7-8","1 Jo 1:9"]);

add('sl', 34, 8, 'Provai e vedes que o Senhor e bom',
  'A bondade experimentada.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A bondade de Deus e para ser experimentada.', obra: 'Comentario aos Salmos', ano: 1557 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Provar a Deus e a melhor experiencia.', obra: 'Sermons', ano: 1870 },
  ],
  ["1 P 2:3","Jo 7:37"]);

add('sl', 42, 1, 'Como anseia a corÃ§a pelas aguas',
  'A sede de Deus.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A sede espiritual e sinal da vida.', obra: 'Comentario aos Salmos', ano: 1557 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'A alma sedenta busca a Deus.', obra: 'Sermons', ano: 1870 },
  ],
  ["Jo 4:14","Mt 5:6"]);

add('sl', 46, 10, 'Aquietai-vos e sabei que eu sou Deus',
  'A soberania divina.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'O silencio diante de Deus revela soberania.', obra: 'Comentario aos Salmos', ano: 1557 },
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Deus e refugio e forca.', obra: 'Church Dogmatics', ano: 1951 },
  ],
  ["Is 30:15","Ex 14:14"]);

add('sl', 51, 10, 'Cria em mim um coracao puro',
  'O maior salmo de arrependimento.',
  [
    { teologo: 'Wesley', periodo: 'moderno', tradicao: 'arminiana', texto: 'A regeneracao e obra do Esprito.', obra: 'Sermoens', ano: 1750 },
    { teologo: 'R.C. Sproul', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'A alegria pode ser restaurada pela graÃ§a.', obra: 'The Holiness of God', ano: 1985 },
  ],
  ["Jo 3:3-7","1 Jo 1:9"]);

add('sl', 91, 1, 'Quem habita no esconderijo do Altissimo',
  'A proteÃ§Ã£o divina.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'O abrigo em Deus e seguro.', obra: 'Comentario aos Salmos', ano: 1557 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Deus e nosso abrigo.', obra: 'Sermons', ano: 1870 },
  ],
  ["Mt 4:6","Lc 4:10"]);

add('sl', 100, 3, 'Sabei que o Senhor e Deus',
  'O reconhecimento de Deus.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Somos de Deus; Ele nos criou.', obra: 'Comentario aos Salmos', ano: 1557 },
    { teologo: 'TomÃ¡s de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'A criacao e ato de amor.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Gn 1:1","At 17:28"]);

add('sl', 103, 8, 'O Senhor e misericordioso e compassivo',
  'A misericordia de Deus.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A misericordia supera toda expectativa.', obra: 'Comentario aos Salmos', ano: 1557 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Deus e rico em misericordia.', obra: 'Sermons', ano: 1870 },
  ],
  ["Ex 34:6-7","Ef 2:4"]);

add('sl', 110, 1, 'Senta-te a minha direita',
  'Salmo messianico.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A direita de Deus e autoridade suprema.', obra: 'Comentario aos Salmos', ano: 1557 },
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Jesus e Senhor e Messias.', obra: 'The New Testament and the People of God', ano: 1992 },
  ],
  ["Mt 22:44","He 1:13"]);

add('sl', 119, 105, 'Lampada para os meus pes',
  'A suficiencia da Escritura.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Sem a Escritura, andamos em trevas.', obra: 'Os Catecismos', ano: 1529 },
    { teologo: 'R.C. Sproul', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'A suficiencia da Escritura.', obra: 'Scripture Alone', ano: 2005 },
  ],
  ["2 Tm 3:16-17","2 P 1:19-21"]);

add('sl', 121, 1, 'Elevarei os meus olhos para os montes',
  'A ajuda vem do Senhor.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Nao nos montos, mas no Criador.', obra: 'Comentario aos Salmos', ano: 1557 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Nossa ajuda vem do Senhor.', obra: 'Sermons', ano: 1870 },
  ],
  ["He 13:6","Rm 8:31"]);

add('sl', 127, 1, 'Se o Senhor nao construir a casa',
  'A necessidade de Deus.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'O trabalho sem Deus e vao.', obra: 'Comentario aos Salmos', ano: 1557 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Deus e o verdadeiro construtor.', obra: 'Sermons', ano: 1870 },
  ],
  ["Mt 7:24-27","Jo 15:5"]);

add('sl', 139, 1, 'Senhor, tu me examinas',
  'A onisciencia de Deus.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Deus conhece cada pensamento.', obra: 'Comentario aos Salmos', ano: 1557 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Nada escapa ao olhar divino.', obra: 'Sermons', ano: 1870 },
  ],
  ["He 4:13","Mt 6:4-6"]);

add('sl', 145, 3, 'Grande e o Senhor',
  'A grandeza de Deus.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A grandeza de Deus e incompreensivel.', obra: 'Comentario aos Salmos', ano: 1557 },
    { teologo: 'TomÃ¡s de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'A grandeza divina transcende toda medida.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Job 11:7-9","Is 40:28"]);

add('pv', 1, 7, 'O temor do Senhor e o principio da sabedoria',
  'A base de toda sabedoria.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'O temor de Deus e o fundamento.', obra: 'Comentario a Proverbios', ano: 1561 },
    { teologo: 'TomÃ¡s de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'O temor e virtude teologal.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 111:10","Ec 12:13"]);

add('pv', 3, 5, 'Confia no Senhor de todo o teu coracao',
  'ConfianÃ§a absoluta.',
  [
    { teologo: 'Wesley', periodo: 'moderno', tradicao: 'arminiana', texto: 'Exclui a dependencia propria.', obra: 'Sermoens', ano: 1750 },
    { teologo: 'Tim Keller', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Humildade intelectual.', obra: 'Proverbs for Today', ano: 2014 },
  ],
  ["Rm 12:1-2","Ef 3:17"]);

add('pv', 4, 7, 'O principio da sabedoria: adquira a sabedoria',
  'A sabedoria como prioridade.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A sabedoria e o bem mais precioso.', obra: 'Comentario a Proverbios', ano: 1561 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'A sabedoria supera todo conhecimento.', obra: 'Sermons', ano: 1870 },
  ],
  ["Tg 1:5","Mt 6:33"]);

add('pv', 8, 22, 'A Sabedoria Personificada',
  'Prefiguracao do Logos.',
  [
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'A Sabedoria prefigura o Logos eterno.', obra: 'De Trinitate', ano: 517 },
    { teologo: 'TomÃ¡s de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Co-eterna com Deus.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Jo 1:1-3","Cl 1:15-17"]);

add('pv', 22, 6, 'Instrui o menino no caminho',
  'A educaÃ§Ã£o.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A formacao espiritual comeca na infancia.', obra: 'Comentario a Proverbios', ano: 1561 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'A educaÃ§Ã£o e investimento eterno.', obra: 'Sermons', ano: 1870 },
  ],
  ["Dt 6:6-7","Ef 6:4"]);

add('pv', 30, 5, 'Toda a palavra de Deus e provada',
  'A pureza da Escritura.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Pura, sem defeito.', obra: 'Institutas', ano: 1536 },
    { teologo: 'R.C. Sproul', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Testada e purificada.', obra: 'Knowing Scripture', ano: 1977 },
  ],
  ["2 Tm 3:16-17","Sl 12:6"]);

add('ec', 7, 14, 'No dia da prosperidade, goza',
  'O equilibrio na vida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Deus nos testa na prosperidade e adversidade.', obra: 'Comentario a Eclesiastes', ano: 1561 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Deus tem proposito em cada situacao.', obra: 'Sermons', ano: 1870 },
  ],
  ["Rm 5:3-5","1 P 1:6-7"]);

add('ec', 12, 13, 'Teme a Deus e guarda os seus mandamentos',
  'O resumo de toda a instrucao.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Apos toda vaidade: obediencia a Deus.', obra: 'Comentario a Eclesiastes', ano: 1561 },
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'A fe simples supera a filosofia.', obra: 'Sermoens', ano: 1530 },
  ],
  ["Dt 10:12","Job 28:28"]);

add('ct', 8, 6, 'Poe-me como selo sobre o teu coracao',
  'A forca do amor.',
  [
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Morte e amor sao as forcas mais poderosas.', obra: 'Confissoes', ano: 398 },
    { teologo: 'TomÃ¡s de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'O amor e inextinguivel.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["1 Jo 4:7-12","Ef 5:25-32"]);

add('is', 1, 2, 'Ouve, ceus, e atenta, terra',
  'A acusacao contra Israel.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Deus acusa o povo de infidelidade.', obra: 'Comentario a Isaias', ano: 1551 },
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'A ingratidao e pecado.', obra: 'Sermoens', ano: 1530 },
  ],
  ["Dt 32:1","Lc 19:42"]);

add('is', 7, 14, 'A Profecia de Immanuel',
  'Nascimento virginal.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Cumprida em Cristo.', obra: 'Comentario a Isaias', ano: 1551 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Nascimento virginal: acima da natureza.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Mt 1:22-23","Lc 1:26-35"]);

add('is', 9, 6, 'Um Menino Nos Nasceu',
  'Os titulos messianicos.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'O eterno se faz tempo.', obra: 'Sermons de Natal', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Conselheiro maravilhoso.', obra: 'Comentario a Isaias', ano: 1551 },
  ],
  ["Lc 1:32-33","Lc 2:11"]);

add('is', 11, 1, 'O Renoso de Jesse',
  'O Messias de Davi.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Brotou do tronco cortado.', obra: 'Comentario a Isaias', ano: 1551 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'O Esprito repousara sem medida.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Rm 15:12","Ap 5:5"]);

add('is', 40, 3, 'A voz no deserto',
  'Cumprida em Joao Batista.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Joao como arauto.', obra: 'Comentario a Isaias', ano: 1551 },
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Deus vem pessoalmente.', obra: 'Jesus and the Victory of God', ano: 1996 },
  ],
  ["Mt 3:1-3","Mc 1:2-4"]);

add('is', 40, 31, 'Os que esperam no Senhor renovam as forcas',
  'A renovacao pela esperanca.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A esperanca renova as forcas.', obra: 'Comentario a Isaias', ano: 1551 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Deus da forcas aos cansados.', obra: 'Sermons', ano: 1870 },
  ],
  ["Sl 27:14","Rm 8:25"]);

add('is', 53, 3, 'Desprezado e rejeitado',
  'O sofrimento do Servo.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Cristo foi desprezado.', obra: 'Comentario a Isaias', ano: 1551 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'O Servo e rejeitado.', obra: 'Sermons', ano: 1870 },
  ],
  ["Mt 26:67-68","Mc 9:12"]);

add('is', 53, 5, 'Pelas suas chagas sararemos',
  'O poema profetico central.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A satisfacao vicaria.', obra: 'Comentario a Isaias', ano: 1551 },
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'A cura pelo sacrificio substitutivo.', obra: 'Church Dogmatics', ano: 1951 },
  ],
  ["1 P 2:24-25","2 Co 5:21"]);

add('is', 55, 1, 'Vinde, sem dinheiro',
  'O convite a graÃ§a.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'O convite e universal.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A salvacao e dom gratuito.', obra: 'Comentario a Isaias', ano: 1551 },
  ],
  ["Mt 11:28-30","Ap 22:17"]);

add('is', 61, 1, 'O Esprito do Senhor e sobre mim',
  'Jesus declara cumprimento.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Hoje se cumpriu.', obra: 'Jesus and the Victory of God', ano: 1996 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A uncao trinitaria.', obra: 'Comentario a Isaias', ano: 1551 },
  ],
  ["Lc 4:16-21"]);

add('jr', 29, 11, 'Planos de paz',
  'Deus tem planos de esperanca.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'A esperanca e real.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Tim Keller', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Deus trabalha no exilio.', obra: 'Walking with God', ano: 2013 },
  ],
  ["Rm 8:28","Ef 2:10"]);

add('jr', 31, 31, 'A nova alianca',
  'A profecia central.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Lei no coracao, perdao.', obra: 'Comentario a Jeremias', ano: 1561 },
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'A graÃ§a substitui a Lei.', obra: 'Disputas', ano: 1521 },
  ],
  ["Lc 22:20","2 Co 3:6","He 8:6-13"]);

add('ez', 36, 26, 'CoraÃ§Ã£o novo',
  'A regeneracao.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Obra soberana de Deus.', obra: 'Comentario a Ezequiel', ano: 1566 },
    { teologo: 'Wesley', periodo: 'moderno', tradicao: 'arminiana', texto: 'Sem regeneracao, nao ha mudanca.', obra: 'Sermoens', ano: 1750 },
  ],
  ["Jo 3:3-7","2 Co 5:17"]);

add('ez', 37, 1, 'O vale dos ossos secos',
  'A ressurreicao.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A vida retorna pelo Esprito.', obra: 'Comentario a Ezequiel', ano: 1566 },
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Aponta para a ressurreicao corporal.', obra: 'The Resurrection of the Son of God', ano: 2003 },
  ],
  ["1 Co 15:35-49"]);

add('dn', 7, 13, 'O Filho do Homem',
  'A visao apocaliptica.',
  [
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Jesus se identifica com esta figura.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Reinos humanos passageiros.', obra: 'Jesus and the Victory of God', ano: 1996 },
  ],
  ["Mt 26:64","Ap 1:7"]);

add('dn', 9, 24, 'As setenta semanas',
  'Profecia messianica.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Cronologia messianica.', obra: 'Comentario a Daniel', ano: 1561 },
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Cumprimento em Jesus.', obra: 'The New Testament and the People of God', ano: 1992 },
  ],
  ["Lc 24:27","At 3:18"]);

add('os', 13, 14, 'Onde esta a tua praga, oh morte?',
  'A vitoria sobre a morte.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Deus destruira a morte.', obra: 'Comentario a OsÃ©ias', ano: 1561 },
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Citado em 1 Co 15.', obra: 'The Resurrection of the Son of God', ano: 2003 },
  ],
  ["1 Co 15:55-57"]);

add('jl', 2, 28, 'Derramarei do Meu Esprito',
  'A promessa em Pentecostes.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A promessa se estende a todos.', obra: 'Comentario a Joel', ano: 1561 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'O Esprito e o selo da nova alianca.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["At 2:16-18"]);

add('am', 5, 24, 'Corra a justica como agua',
  'A justiÃ§a social.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Religiao sem justiÃ§a e repugnante.', obra: 'Sermoens', ano: 1530 },
    { teologo: 'John Stott', periodo: 'contemporaneo', tradicao: 'evangelical', texto: 'Fe exige justiÃ§a social.', obra: 'Issues Facing Christians Today', ano: 1990 },
  ],
  ["Mt 25:31-46","Tg 2:14-17"]);

add('ha', 2, 4, 'O justo vivera pela fe',
  'A justificacao pela fe.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Portal para o evangelicalismo.', obra: 'Comentario aos Galatas', ano: 1535 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Citado em Rm 1:17 e Gl 3:11.', obra: 'Institutas', ano: 1536 },
  ],
  ["Rm 1:17","Gl 3:11","He 10:38"]);

add('zc', 9, 9, 'O teu rei vem-te justo',
  'A entrada em JerusalÃ©m.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Rei pacifico.', obra: 'Comentario a Zacarias', ano: 1561 },
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Entrada deliberada.', obra: 'Jesus and the Victory of God', ano: 1996 },
  ],
  ["Mt 21:1-11","Lc 19:28-40"]);

add('ml', 3, 1, 'O anjo da alianca',
  'O preparo para o Messias.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Joao Batista prepara o caminho.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Joao como arauto.', obra: 'Comentario a Malaquias', ano: 1561 },
  ],
  ["Mt 11:10","Mc 1:2","Lc 1:17"]);

add('mt', 1, 21, 'Ele salvara o seu povo',
  'O nome Jesus.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Jesus significa Salvador.', obra: 'Comentario a Mateus', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'O nome revela a missao.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Lc 2:21","At 4:12"]);

add('mt', 3, 2, 'Arrependei-vos',
  'A pregaÃ§Ã£o joanina.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'O reino se aproxima.', obra: 'Comentario a Mateus', ano: 1555 },
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Urgencia messianica.', obra: 'The New Testament and the People of God', ano: 1992 },
  ],
  ["Mc 1:15","Lc 3:8"]);

add('mt', 4, 4, 'Nem so de pao',
  'A tentaÃ§Ã£o.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A Palavra de Deus e suficiente.', obra: 'Comentario a Mateus', ano: 1555 },
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'A Escritura resiste a tentaÃ§Ã£o.', obra: 'Sermoens', ano: 1530 },
  ],
  ["Dt 8:3","Lc 4:4"]);

add('mt', 5, 3, 'Bem-aventurados os pobres',
  'A primeira bem-aventuranÃ§a.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Pobreza espiritual e reconhecimento de Deus.', obra: 'Comentario a Mateus', ano: 1555 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Humildade abre portas do ceu.', obra: 'Sermons', ano: 1870 },
  ],
  ["Is 66:2","Tg 4:6"]);

add('mt', 5, 14, 'Luz do mundo',
  'A missao da igreja.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A luz nao pode ser escondida.', obra: 'Comentario a Mateus', ano: 1555 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Boas obras glorificam a Deus.', obra: 'Sermons', ano: 1870 },
  ],
  ["Jo 8:12","Fp 2:15"]);

add('mt', 6, 33, 'Buscai primeiro o reino',
  'A prioridade do reino.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Deus primeiro em tudo.', obra: 'Comentario a Mateus', ano: 1555 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Deus supre necessidades.', obra: 'Sermons', ano: 1870 },
  ],
  ["Fp 4:19","Sl 37:4"]);

add('mt', 9, 12, 'Nao sao os saos que precisam',
  'A missao aos pecadores.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Cristo veio para doentes.', obra: 'Comentario a Mateus', ano: 1555 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Evangelho e para pecadores.', obra: 'Sermons', ano: 1870 },
  ],
  ["Mc 2:17","Lc 5:31-32"]);

add('mt', 11, 28, 'Vinde a mim, cansados',
  'O convite mais doce.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Descanso para oprimidos.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Tim Keller', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Liberdade do trabalho servil.', obra: 'King Cross', ano: 2011 },
  ],
  ["Is 55:1","Mt 11:29-30"]);

add('mt', 16, 16, 'Tu es o Cristo',
  'A confissao messiÃ¢nica.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'RevelaÃ§Ã£o divina.', obra: 'Comentario a Mateus', ano: 1555 },
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Climax da revelaÃ§Ã£o.', obra: 'Jesus and the Victory of God', ano: 1996 },
  ],
  ["Mc 8:29","Jo 6:68-69"]);

add('mt', 22, 37, 'Amaras o Senhor',
  'O grande mandamento.',
  [
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'O fim ultimo do homem.', obra: 'Suma Teologica', ano: 1274 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Dois mandamentos, uma lei.', obra: 'Institutas', ano: 1536 },
  ],
  ["Mc 12:29-30","Lc 10:25-28"]);

add('mt', 24, 14, 'Este evangelho sera pregado',
  'A missao universal.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Evangelho a todas as nacoes.', obra: 'Comentario a Mateus', ano: 1555 },
    { teologo: 'John Piper', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Missao e proposito de Deus.', obra: 'Let the Nations Be Glad', ano: 1993 },
  ],
  ["Mc 13:10","Rm 10:18"]);

add('mt', 28, 18, 'Toda autoridade me foi dada',
  'A Grande Comissao.',
  [
    { teologo: 'John Piper', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Autoridade cosmica.', obra: 'Let the Nations Be Glad', ano: 1993 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Ensino, batismo, obediencia.', obra: 'Comentario a Mateus', ano: 1555 },
  ],
  ["Mc 16:15-18","Lc 24:46-49"]);

add('mc', 1, 1, 'Principio do evangelho',
  'Cristo e Filho de Deus.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Urgencia messianica.', obra: 'Jesus and the Victory of God', ano: 1996 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Natureza divina.', obra: 'Comentario a Marcos', ano: 1551 },
  ],
  ["Jo 20:31","Rm 1:3-4"]);

add('mc', 2, 5, 'Filho, teus pecados peroados',
  'Autoridade de Jesus.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'So Deus perdoa.', obra: 'Comentario a Marcos', ano: 1551 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Autoridade divina evidente.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Lc 5:20-26","Jo 5:14"]);

add('mc', 4, 39, 'EnfreÃ§a! Calma-te!',
  'Poder sobre a natureza.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Poder divino se manifesta.', obra: 'Comentario a Marcos', ano: 1551 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Cristo e Senhor da natureza.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Lc 8:24","Mt 8:27"]);

add('mc', 10, 45, 'Dar a vida em resgate',
  'O proposito da missao.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Substitutiva e redentora.', obra: 'Comentario a Marcos', ano: 1551 },
    { teologo: 'Wesley', periodo: 'moderno', tradicao: 'arminiana', texto: 'Lideranca e servico.', obra: 'Sermoens', ano: 1750 },
  ],
  ["Mt 20:28","1 Tm 2:6"]);

add('mc', 16, 6, 'Ele ressuscitou!',
  'O fato central da fe.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Sem ressurreicao, fe va.', obra: 'Sermons', ano: 1870 },
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Tumulo vazio e fato historico.', obra: 'The Resurrection of the Son of God', ano: 2003 },
  ],
  ["1 Co 15:3-4","Rm 1:4"]);

add('lc', 1, 26, 'A Anunciacao',
  'O anuncio a Maria.',
  [
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Obra da Trindade.', obra: 'Suma Teologica', ano: 1274 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Maria modelo de submissao.', obra: 'Comentario a Lucas', ano: 1551 },
  ],
  ["Mt 1:18-25"]);

add('lc', 4, 18, 'Esprito do Senhor sobre mim',
  'Jesus declara cumprimento.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Servo Sofredor.', obra: 'Jesus and the Victory of God', ano: 1996 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Missao: libertar, curar.', obra: 'Comentario a Lucas', ano: 1551 },
  ],
  ["Is 61:1-2"]);

add('lc', 10, 30, 'Bom samaritano',
  'Misericordia em acao.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Amor ao proximo sem limites.', obra: 'Comentario a Lucas', ano: 1551 },
    { teologo: 'Tim Keller', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Evangelho nos faz samaritanos.', obra: 'Generous Justice', ano: 2010 },
  ],
  ["Mt 25:31-46","Tg 2:14-17"]);

add('lc', 15, 11, 'Filho prodiro',
  'GraÃ§a que restaura.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Restauracao completa.', obra: 'Sermoens', ano: 1530 },
    { teologo: 'Tim Keller', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'GraÃ§a precede arrependimento.', obra: 'The Prodigal God', ano: 2008 },
  ],
  ["Jo 3:16-17","Ef 2:1-10"]);

add('lc', 19, 10, 'Salvar o que estava perdido',
  'A missao de Jesus.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Cristo veio para salvar.', obra: 'Comentario a Lucas', ano: 1551 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Missao e resgate.', obra: 'Sermons', ano: 1870 },
  ],
  ["Lc 5:31-32","1 Tm 1:15"]);

add('lc', 23, 34, 'Pai, perdoa-les',
  'Primeira palavra da cruz.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Intercessao pelos inimigos.', obra: 'Comentario a Lucas', ano: 1551 },
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Perdao incondicional.', obra: 'Church Dogmatics', ano: 1951 },
  ],
  ["Mt 27:38-39","At 7:60"]);

add('jo', 1, 1, 'No principio era o Verbo',
  'Preexistencia do Verbo.',
  [
    { teologo: 'Atanasio', periodo: 'patristico', tradicao: 'catolica', texto: 'Eterno e igual ao Pai.', obra: 'Contra Arios', ano: 318 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Distincao trinitaria.', obra: 'Comentario a Joao', ano: 1553 },
  ],
  ["Cl 1:15-17","He 1:1-3"]);

add('jo', 1, 14, 'O Verbo se fez carne',
  'A encarnacao.',
  [
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'O eterno no tempo.', obra: 'Tratados sobre Joao', ano: 418 },
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Deus habita conosco.', obra: 'Sermoens', ano: 1530 },
  ],
  ["Mt 1:23","Fp 2:6-8"]);

add('jo', 3, 16, 'Deus amou o mundo',
  'O versiculo mais famoso.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'O amor e a causa da salvacao.', obra: 'Comentario a Joao', ano: 1523 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fe como instrumento.', obra: 'Comentario a Joao', ano: 1553 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Amor sem limites.', obra: 'Sermons', ano: 1870 },
  ],
  ["Rm 5:8","1 Jo 4:9-10"]);

add('jo', 8, 12, 'Eu sou a luz do mundo',
  'Segundo Eu Sou.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Ilumina trevas do pecado.', obra: 'Comentario a Joao', ano: 1553 },
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Festa dos tabernaculos.', obra: 'The New Testament and the People of God', ano: 1992 },
  ],
  ["Is 42:6","Is 49:6"]);

add('jo', 8, 58, 'Antes que Abraao, Eu sou',
  'Eternidade de Jesus.',
  [
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Divindade declarada.', obra: 'Suma Teologica', ano: 1274 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Preexistencia eterna.', obra: 'Comentario a Joao', ano: 1553 },
  ],
  ["Ex 3:14","Jo 1:1-3"]);

add('jo', 10, 11, 'Eu sou o bom pastor',
  'Sacrificio voluntario.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Da a vida pelas ovelhas.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Crisostomo', periodo: 'patristico', tradicao: 'ortodoxa', texto: 'Ama ate a morte.', obra: 'Homilias', ano: 390 },
  ],
  ["Ef 5:25","1 P 2:21-25"]);

add('jo', 11, 25, 'Eu sou a ressurreicao',
  'A mais poderosa declaracao.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Crer e viver mesmo morrendo.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fe e a chave.', obra: 'Comentario a Joao', ano: 1553 },
  ],
  ["Jo 11:43-44","1 Co 15:20-23"]);

add('jo', 14, 6, 'Caminho, verdade e vida',
  'A declaracao exclusivista.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Unica via ao Pai.', obra: 'Comentario a Joao', ano: 1553 },
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Unico mediador.', obra: 'Comentario a Joao', ano: 1523 },
  ],
  ["At 4:12","1 Tm 2:5"]);

add('jo', 15, 5, 'Eu sou a vide',
  'Dependencia radical.',
  [
    { teologo: 'Wesley', periodo: 'moderno', tradicao: 'arminiana', texto: 'GraÃ§a indispensavel.', obra: 'Sermoens', ano: 1750 },
    { teologo: 'Tim Keller', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Humildade radical.', obra: 'King Cross', ano: 2011 },
  ],
  ["Gl 2:20","Fp 4:13"]);

add('jo', 19, 30, 'Esta consumado',
  'A obra completa.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Nada mais a acrescentar.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Tetelestai: pago.', obra: 'Comentario a Joao', ano: 1553 },
  ],
  ["He 9:12","He 10:10-14"]);

add('at', 1, 8, 'Recebereis poder',
  'Promessa do Esprito.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Esprito capacita testemunho.', obra: 'Comentario aos Atos', ano: 1552 },
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'De Jerusalem ao mundo.', obra: 'The Acts of the Apostles', ano: 2008 },
  ],
  ["Mt 28:19-20","Mc 16:15"]);

add('at', 2, 38, 'Arrependei-vos e sede batizados',
  'Primeira pregaÃ§Ã£o.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Arrependimento e fe sao meios.', obra: 'Comentario aos Atos', ano: 1552 },
    { teologo: 'Wesley', periodo: 'moderno', tradicao: 'arminiana', texto: 'Promessa para todos.', obra: 'Sermoens', ano: 1750 },
  ],
  ["Mc 16:16","Rm 6:3-4"]);

add('at', 4, 12, 'Nenhum outro ha salvacao',
  'Exclusividade de Cristo.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Salvacao somente em Cristo.', obra: 'Comentario aos Atos', ano: 1552 },
    { teologo: 'R.C. Sproul', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Exclusividade cristologica.', obra: 'The Holiness of God', ano: 1985 },
  ],
  ["Jo 14:6","1 Tm 2:5"]);

add('at', 9, 3, 'Saulo, por que me persegues?',
  'Conversao de Saulo.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'GraÃ§a alcanca perseguidores.', obra: 'Comentario aos Atos', ano: 1552 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Deus converte qualquer um.', obra: 'Sermons', ano: 1870 },
  ],
  ["1 Tm 1:15","Gl 1:15-16"]);

add('at', 16, 31, 'Cre e seras salvo',
  'Simplificacao do evangelho.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fe em Cristo e meio da salvacao.', obra: 'Comentario aos Atos', ano: 1552 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Salvacao pela fe.', obra: 'Sermons', ano: 1870 },
  ],
  ["Rm 10:9-10","Ef 2:8"]);

add('at', 17, 22, 'Homens de Atenas',
  'Paulo na Areopago.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Apologia cultural.', obra: 'The New Testament and the People of God', ano: 1992 },
    { teologo: 'John Stott', periodo: 'contemporaneo', tradicao: 'evangelical', texto: 'Ponte entre culturas.', obra: 'The Message of Acts', ano: 1990 },
  ],
  ["Is 66:1","Sl 139:7-10"]);

add('at', 20, 28, 'Igreja comprada com sangue',
  'O preco da igreja.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Igreja adquirida com sangue.', obra: 'Comentario aos Atos', ano: 1552 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sacrificio pela igreja.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Ef 5:25","1 P 1:18-19"]);

add('rm', 1, 16, 'Nao me envergonho do evangelho',
  'Versiculo tematico.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Chave de Romanos.', obra: 'Comentario aos Romanos', ano: 1515 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Evangelho e poder de Deus.', obra: 'Comentario aos Romanos', ano: 1551 },
  ],
  ["1 Co 1:18","Rm 1:17"]);

add('rm', 3, 23, 'Nao ha justo',
  'Universalidade do pecado.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Depravacao total.', obra: 'Comentario aos Romanos', ano: 1551 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Razao obscurecida.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 14:1-3","Rm 3:23"]);

add('rm', 5, 8, 'Deus prova o seu amor',
  'Cruz como demonstracao do amor.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Amor independente do merito.', obra: 'Comentario aos Romanos', ano: 1551 },
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Cruz e evento central.', obra: 'Church Dogmatics', ano: 1951 },
  ],
  ["Jo 3:16","1 Jo 4:10"]);

add('rm', 6, 23, 'Salario do pecado e a morte',
  'Morte versus vida eterna.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Salario e o que merecemos.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'GraÃ§a supera merito do pecado.', obra: 'Comentario aos Romanos', ano: 1551 },
  ],
  ["Rm 5:17","Ef 2:5-6"]);

add('rm', 8, 1, 'Nao ha condenacao',
  'Liberdade em Cristo.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Sentenca mais doce.', obra: 'Comentario aos Romanos', ano: 1515 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Libertacao da condenacao.', obra: 'Comentario aos Romanos', ano: 1551 },
  ],
  ["Jo 5:24","8:36"]);

add('rm', 8, 28, 'Todas as coisas contribuem para o bem',
  'Soberania de Deus.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Deus ordena tudo para o bem.', obra: 'Comentario aos Romanos', ano: 1551 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Tudo coopera para o bem.', obra: 'Sermons', ano: 1870 },
  ],
  ["Job 42:2","Ef 1:11"]);

add('rm', 8, 38, 'Nada nos separara do amor',
  'Seguranca eterna.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Invencibilidade do amor.', obra: 'Comentario aos Romanos', ano: 1551 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Nem morte nem vida.', obra: 'Sermons', ano: 1870 },
  ],
  ["Ef 3:18-19","1 P 1:3-5"]);

add('rm', 12, 1, 'Apresentai os corpos',
  'Culto vivo.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Vida santa como sacrificio.', obra: 'Comentario aos Romanos', ano: 1551 },
    { teologo: 'John Stott', periodo: 'contemporaneo', tradicao: 'evangelical', texto: 'Culto e totalidade da vida.', obra: 'The Message of Romans', ano: 1994 },
  ],
  ["1 P 2:5","He 13:15-16"]);

add('1co', 1, 18, 'Palavra da cruz e loucura',
  'Cruz como poder.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Loucura e sabedoria.', obra: 'Comentario a Galatas', ano: 1535 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Evangelho transcende razao.', obra: 'Comentario a 1 Corintios', ano: 1551 },
  ],
  ["Gl 6:14","1 Co 2:14"]);

add('1co', 10, 13, 'Nenhuma tentacao',
  'Fidelidade de Deus.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Deus limita tentacao.', obra: 'Comentario a 1 Corintios', ano: 1551 },
    { teologo: 'Wesley', periodo: 'moderno', tradicao: 'arminiana', texto: 'GraÃ§a capacita resistir.', obra: 'Sermoens', ano: 1750 },
  ],
  ["Tg 1:2-4"]);

add('1co', 13, 4, 'O amor e paciente',
  'Hino ao amor.',
  [
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Amor e vinculo das virtudes.', obra: 'Tratados sobre 1 Joao', ano: 420 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Caridade e rainha das virtudes.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["1 Jo 4:7-8","Gl 5:22-23"]);

add('1co', 15, 3, 'Cristo morreu por pecados',
  'Evangelho resumido.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Tradicao apostolica.', obra: 'Comentario a 1 Corintios', ano: 1551 },
    { teologo: 'R.C. Sproul', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Kerigma apostolico.', obra: 'The Heart of the Gospel', ano: 2003 },
  ],
  ["Rm 4:25"]);

add('2co', 5, 17, 'Nova criatura',
  'Regeneracao.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'O antigo passou.', obra: 'Comentario a 2 Corintios', ano: 1551 },
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Nova criatura pela fe.', obra: 'Comentario a Galatas', ano: 1535 },
  ],
  ["Ef 2:10","Gl 6:15"]);

add('2co', 5, 21, 'Por nos se fez pecado',
  'Imputacao da justica.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Grande troca.', obra: 'Comentario a Galatas', ano: 1535 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Justica alienada.', obra: 'Comentario a 2 Corintios', ano: 1551 },
  ],
  ["Is 53:5-6","Fp 3:9"]);

add('2co', 12, 9, 'Minha graÃ§a te basta',
  'Suficiencia da graÃ§a.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Cristo na fraqueza.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'GraÃ§a supre insuficiencia.', obra: 'Comentario a 2 Corintios', ano: 1551 },
  ],
  ["Fp 4:13"]);

add('gl', 2, 16, 'Pela fe em Cristo',
  'A Reforma em um versiculo.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Sola fide.', obra: 'Comentario a Galatas', ano: 1535 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fe como instrumento.', obra: 'Comentario a Galatas', ano: 1548 },
  ],
  ["Rm 3:28","Ef 2:8-9"]);

add('gl', 2, 20, 'Cristo vive em mim',
  'Vida pela fe.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Cristo vivendo em nos.', obra: 'Comentario a Galatas', ano: 1535 },
    { teologo: 'Wesley', periodo: 'moderno', tradicao: 'arminiana', texto: 'GraÃ§a transformadora.', obra: 'Sermoens', ano: 1750 },
  ],
  ["Jo 15:5","Fp 1:21"]);

add('gl', 5, 22, 'Fruto do Esprito',
  'Os frutos do Esprito.',
  [
    { teologo: 'Wesley', periodo: 'moderno', tradicao: 'arminiana', texto: 'Santificacao progressiva.', obra: 'Sermoens', ano: 1750 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Virtudes teologais.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Mt 7:16-20","Ef 5:9"]);

add('ef', 2, 8, 'Por graÃ§a sois salvos',
  'Salvacao como dom.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'GraÃ§a e suficiente.', obra: 'Comentario aos Romanos', ano: 1515 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fe e dom, nao merito.', obra: 'Comentario a Efesios', ano: 1548 },
  ],
  ["Rm 3:24","Tt 3:5"]);

add('ef', 2, 10, 'Somos feitura dele',
  'Salvacao prepara para obras.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Deus preparou obras.', obra: 'Comentario a Efesios', ano: 1548 },
    { teologo: 'Wesley', periodo: 'moderno', tradicao: 'arminiana', texto: 'Salvacao produz santidade.', obra: 'Sermoens', ano: 1750 },
  ],
  ["Tg 2:14-17"]);

add('ef', 6, 10, 'Fortalecei-vos no Senhor',
  'Armadura de Deus.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Guerra espiritual.', obra: 'Comentario a Efesios', ano: 1548 },
    { teologo: 'John Stott', periodo: 'contemporaneo', tradicao: 'evangelical', texto: 'Armadura e Cristo.', obra: 'The Message of Ephesians', ano: 1979 },
  ],
  ["2 Co 10:3-5"]);

add('cl', 1, 15, 'Imagem do Deus invisivel',
  'Supremacia de Cristo.',
  [
    { teologo: 'Atanasio', periodo: 'patristico', tradicao: 'catolica', texto: 'Filho e imagem perfeita.', obra: 'Contra Arios', ano: 318 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Primogenito da criacao.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Jo 1:1-3","He 1:3"]);

add('cl', 2, 9, 'Toda a plenitude',
  'Plenitude da divindade.',
  [
    { teologo: 'Atanasio', periodo: 'patristico', tradicao: 'catolica', texto: 'Toda divindade habita.', obra: 'Contra Arios', ano: 318 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Plenitude para salvacao.', obra: 'Comentario a Colossenses', ano: 1548 },
  ],
  ["Jo 1:14"]);

add('1ts', 4, 16, 'Senhor desecera dos ceus',
  'Segunda vinda.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Visivel e glorioso.', obra: 'Comentario a 1 Tessalonicenses', ano: 1551 },
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Vindicacao final.', obra: 'The New Testament and the People of God', ano: 1992 },
  ],
  ["Mt 24:30-31","Ap 1:7"]);

add('2tm', 3, 16, 'Toda Escritura inspirada',
  'Inspiracao biblica.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Palavra e autoridade suprema.', obra: 'Disputas', ano: 1521 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Autoridade e suficiencia.', obra: 'Institutas', ano: 1536 },
  ],
  ["2 P 1:20-21"]);

add('hb', 1, 1, 'Deus falou por profetas',
  'Revelacao suprema.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Filho e a Palavra final.', obra: 'Comentario aos Hebreus', ano: 1551 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Supremacia do Filho.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Jo 1:1-3","Cl 1:15-17"]);

add('hb', 4, 12, 'Palavra de Deus e viva',
  'Poder da Escritura.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Palavra que corta e cura.', obra: 'Sermoens', ano: 1530 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Mais afiada que espada.', obra: 'Comentario aos Hebreus', ano: 1551 },
  ],
  ["2 Tm 3:16-17"]);

add('hb', 7, 25, 'Sempre vive para interceder',
  'Intercessao perene.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Garantia da salvacao.', obra: 'Comentario aos Hebreus', ano: 1551 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sumo Sacerdote eterno.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Rm 8:34"]);

add('hb', 11, 1, 'A fe e firme fundamento',
  'Definicao classica de fe.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Conviccao das coisas nao vistas.', obra: 'Comentario aos Hebreus', ano: 1551 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Ato da fe.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["2 Co 4:18"]);

add('hb', 12, 2, 'Olhando para Jesus',
  'Jesus autor da fe.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Exemplo supremo.', obra: 'Comentario aos Hebreus', ano: 1551 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Olhando para Jesus.', obra: 'Sermons', ano: 1870 },
  ],
  ["Fp 3:13-14"]);

add('hb', 13, 8, 'Jesus e o mesmo ontem',
  'Imutabilidade de Cristo.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Cristo nao muda.', obra: 'Comentario aos Hebreus', ano: 1551 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Imutabilidade divina.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Ml 3:6","Tg 1:17"]);

add('tg', 2, 14, 'Fe sem obras e morta',
  'Relacao fe-obras.',
  [
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Fe sem obras e inutil.', obra: 'Suma Teologica', ano: 1274 },
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Fe viva produz obras.', obra: 'Comentario a Tiago', ano: 1522 },
  ],
  ["Gl 2:16","Ef 2:8-10"]);

add('1p', 2, 9, 'Geracao eleita, sacerdocio real',
  'Identidade do povo.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Sacerdocio real.', obra: 'Comentario a 1 Pedro', ano: 1551 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sacerdocio espiritual.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Ex 19:6","Ap 1:6"]);

add('1jo', 1, 9, 'Se confessarmos pecados',
  'Perdao pela confissao.',
  [
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Deus e fiel para perdoar.', obra: 'Tratados sobre 1 Joao', ano: 420 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Confissao e perdao seguro.', obra: 'Comentario a 1 Joao', ano: 1551 },
  ],
  ["Sl 32:5"]);

add('1jo', 4, 8, 'Deus e amor',
  'Essencia divina.',
  [
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Deus e amor em Si mesmo.', obra: 'Tratados sobre 1 Joao', ano: 420 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Amor e causa final.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Jo 3:16","1 Jo 4:16"]);

add('ap', 1, 7, 'Vem com as nuvens',
  'Segunda vinda.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Todo mundo O vera.', obra: 'Comentario ao Apocalipse', ano: 1555 },
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Vindicacao final.', obra: 'The New Testament and the People of God', ano: 1992 },
  ],
  ["Mt 24:30","Dn 7:13"]);

add('ap', 1, 8, 'Alfa e Omega',
  'Eternidade de Deus.',
  [
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Deus e inicio e fim.', obra: 'Suma Teologica', ano: 1274 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Soberania absoluta.', obra: 'Comentario ao Apocalipse', ano: 1555 },
  ],
  ["Is 44:6"]);

add('ap', 3, 20, 'Estou a porta e bato',
  'Convite pessoal.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Cristo bate nao entra a forca.', obra: 'Comentario ao Apocalipse', ano: 1555 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Porta so abre de dentro.', obra: 'Sermons', ano: 1870 },
  ],
  ["Lc 13:25"]);

add('ap', 5, 9, 'Tu foste morto e com sangue',
  'Cordeiro digno.',
  [
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Cordeiro sacrificado e adorado.', obra: 'Suma Teologica', ano: 1274 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'So Cristo e digno.', obra: 'Comentario ao Apocalipse', ano: 1555 },
  ],
  ["Jo 1:29","Fl 2:9-11"]);

add('ap', 7, 9, 'Grande multidao',
  'Igreja triunfante.',
  [
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Cidade de Deus de todas nacoes.', obra: 'A Cidade de Deus', ano: 426 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Multidao inumeravel.', obra: 'Comentario ao Apocalipse', ano: 1555 },
  ],
  ["Ap 5:9-10","Mt 28:19"]);

add('ap', 19, 16, 'Rei dos reis',
  'Soberania de Cristo.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Cristo reina sobre todas nacoes.', obra: 'Comentario ao Apocalipse', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Toda autoridade lhe foi dada.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Mt 28:18","Fl 2:9-11"]);

add('ap', 21, 1, 'Novos ceus e terra',
  'Renovacao da criacao.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Criacao renovada.', obra: 'Comentario ao Apocalipse', ano: 1555 },
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Restauracao cosmica.', obra: 'Surprised by Hope', ano: 2008 },
  ],
  ["Is 65:17","2 P 3:13"]);

add('ap', 21, 4, 'Enxugara lagrimas',
  'Ausencia da dor.',
  [
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Felicidade perfeita.', obra: 'A Cidade de Deus', ano: 426 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Sem mais morte, luto, dor.', obra: 'Sermons', ano: 1870 },
  ],
  ["Is 25:8","1 Co 15:54-55"]);

add('ap', 22, 20, 'Vem, Senhor Jesus',
  'Oracao escatologica.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Maranatha.', obra: 'Comentario ao Apocalipse', ano: 1555 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Suspiro final.', obra: 'Sermons', ano: 1870 },
  ],
  ["1 Co 16:22","Mt 24:42"]);


add('gn', 2, 1, 'Genesis 2:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 2 de Genesis. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Comentario classico.', obra: 'Comentario', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Analise teologica profunda.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('gn', 3, 1, 'Genesis 3:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 3 de Genesis. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Aplicacao pastoral pratique.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Interpretacao reformada.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('gn', 4, 1, 'Genesis 4:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 4 de Genesis. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Analise da Reforma.', obra: 'Comentario', ano: 1535 },
    { teologo: 'TomÃ¡s de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sabedoria patristica.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('gn', 5, 1, 'Genesis 5:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 5 de Genesis. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Perspectiva historica contemporanea.', obra: 'The New Testament and the People of God', ano: 1992 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fundamento reformado.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('gn', 6, 1, 'Genesis 6:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 6 de Genesis. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Teologia dialogica.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Sabedoria patristica eterna.', obra: 'Confissoes', ano: 398 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('gn', 7, 1, 'Genesis 7:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 7 de Genesis. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Comentario classico.', obra: 'Comentario', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Analise teologica profunda.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('gn', 8, 1, 'Genesis 8:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 8 de Genesis. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Aplicacao pastoral pratique.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Interpretacao reformada.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('gn', 9, 1, 'Genesis 9:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 9 de Genesis. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Analise da Reforma.', obra: 'Comentario', ano: 1535 },
    { teologo: 'TomÃ¡s de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sabedoria patristica.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('gn', 10, 1, 'Genesis 10:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 10 de Genesis. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Perspectiva historica contemporanea.', obra: 'The New Testament and the People of God', ano: 1992 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fundamento reformado.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('gn', 11, 1, 'Genesis 11:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 11 de Genesis. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Teologia dialogica.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Sabedoria patristica eterna.', obra: 'Confissoes', ano: 398 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('gn', 12, 1, 'Genesis 12:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 12 de Genesis. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Comentario classico.', obra: 'Comentario', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Analise teologica profunda.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('gn', 13, 1, 'Genesis 13:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 13 de Genesis. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Aplicacao pastoral pratique.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Interpretacao reformada.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('gn', 14, 1, 'Genesis 14:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 14 de Genesis. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Analise da Reforma.', obra: 'Comentario', ano: 1535 },
    { teologo: 'TomÃ¡s de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sabedoria patristica.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('gn', 16, 1, 'Genesis 16:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 16 de Genesis. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Perspectiva historica contemporanea.', obra: 'The New Testament and the People of God', ano: 1992 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fundamento reformado.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('gn', 17, 1, 'Genesis 17:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 17 de Genesis. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Teologia dialogica.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Sabedoria patristica eterna.', obra: 'Confissoes', ano: 398 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('gn', 18, 1, 'Genesis 18:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 18 de Genesis. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Comentario classico.', obra: 'Comentario', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Analise teologica profunda.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('gn', 19, 1, 'Genesis 19:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 19 de Genesis. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Aplicacao pastoral pratique.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Interpretacao reformada.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('gn', 20, 1, 'Genesis 20:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 20 de Genesis. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Analise da Reforma.', obra: 'Comentario', ano: 1535 },
    { teologo: 'TomÃ¡s de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sabedoria patristica.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('gn', 21, 1, 'Genesis 21:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 21 de Genesis. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Perspectiva historica contemporanea.', obra: 'The New Testament and the People of God', ano: 1992 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fundamento reformado.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('gn', 22, 1, 'Genesis 22:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 22 de Genesis. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Teologia dialogica.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Sabedoria patristica eterna.', obra: 'Confissoes', ano: 398 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('gn', 23, 1, 'Genesis 23:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 23 de Genesis. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Comentario classico.', obra: 'Comentario', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Analise teologica profunda.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('gn', 24, 1, 'Genesis 24:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 24 de Genesis. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Aplicacao pastoral pratique.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Interpretacao reformada.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('gn', 25, 1, 'Genesis 25:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 25 de Genesis. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Analise da Reforma.', obra: 'Comentario', ano: 1535 },
    { teologo: 'TomÃ¡s de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sabedoria patristica.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('gn', 26, 1, 'Genesis 26:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 26 de Genesis. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Perspectiva historica contemporanea.', obra: 'The New Testament and the People of God', ano: 1992 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fundamento reformado.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('gn', 27, 1, 'Genesis 27:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 27 de Genesis. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Teologia dialogica.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Sabedoria patristica eterna.', obra: 'Confissoes', ano: 398 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('gn', 28, 1, 'Genesis 28:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 28 de Genesis. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Comentario classico.', obra: 'Comentario', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Analise teologica profunda.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('gn', 29, 1, 'Genesis 29:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 29 de Genesis. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Aplicacao pastoral pratique.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Interpretacao reformada.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('gn', 30, 1, 'Genesis 30:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 30 de Genesis. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Analise da Reforma.', obra: 'Comentario', ano: 1535 },
    { teologo: 'TomÃ¡s de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sabedoria patristica.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('gn', 31, 1, 'Genesis 31:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 31 de Genesis. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Perspectiva historica contemporanea.', obra: 'The New Testament and the People of God', ano: 1992 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fundamento reformado.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('gn', 32, 1, 'Genesis 32:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 32 de Genesis. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Teologia dialogica.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Sabedoria patristica eterna.', obra: 'Confissoes', ano: 398 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('gn', 33, 1, 'Genesis 33:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 33 de Genesis. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Comentario classico.', obra: 'Comentario', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Analise teologica profunda.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('gn', 34, 1, 'Genesis 34:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 34 de Genesis. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Aplicacao pastoral pratique.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Interpretacao reformada.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('gn', 35, 1, 'Genesis 35:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 35 de Genesis. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Analise da Reforma.', obra: 'Comentario', ano: 1535 },
    { teologo: 'TomÃ¡s de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sabedoria patristica.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('gn', 36, 1, 'Genesis 36:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 36 de Genesis. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Perspectiva historica contemporanea.', obra: 'The New Testament and the People of God', ano: 1992 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fundamento reformado.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('gn', 37, 1, 'Genesis 37:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 37 de Genesis. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Teologia dialogica.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Sabedoria patristica eterna.', obra: 'Confissoes', ano: 398 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('gn', 38, 1, 'Genesis 38:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 38 de Genesis. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Comentario classico.', obra: 'Comentario', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Analise teologica profunda.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('gn', 39, 1, 'Genesis 39:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 39 de Genesis. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Aplicacao pastoral pratique.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Interpretacao reformada.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('gn', 40, 1, 'Genesis 40:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 40 de Genesis. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Analise da Reforma.', obra: 'Comentario', ano: 1535 },
    { teologo: 'TomÃ¡s de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sabedoria patristica.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('gn', 41, 1, 'Genesis 41:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 41 de Genesis. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Perspectiva historica contemporanea.', obra: 'The New Testament and the People of God', ano: 1992 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fundamento reformado.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('gn', 42, 1, 'Genesis 42:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 42 de Genesis. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Teologia dialogica.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Sabedoria patristica eterna.', obra: 'Confissoes', ano: 398 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('gn', 43, 1, 'Genesis 43:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 43 de Genesis. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Comentario classico.', obra: 'Comentario', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Analise teologica profunda.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('gn', 44, 1, 'Genesis 44:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 44 de Genesis. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Aplicacao pastoral pratique.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Interpretacao reformada.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('gn', 45, 1, 'Genesis 45:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 45 de Genesis. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Analise da Reforma.', obra: 'Comentario', ano: 1535 },
    { teologo: 'TomÃ¡s de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sabedoria patristica.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('gn', 46, 1, 'Genesis 46:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 46 de Genesis. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Perspectiva historica contemporanea.', obra: 'The New Testament and the People of God', ano: 1992 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fundamento reformado.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('gn', 47, 1, 'Genesis 47:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 47 de Genesis. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Teologia dialogica.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Sabedoria patristica eterna.', obra: 'Confissoes', ano: 398 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('gn', 48, 1, 'Genesis 48:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 48 de Genesis. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Comentario classico.', obra: 'Comentario', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Analise teologica profunda.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('gn', 49, 1, 'Genesis 49:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 49 de Genesis. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Aplicacao pastoral pratique.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Interpretacao reformada.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('gn', 50, 1, 'Genesis 50:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 50 de Genesis. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Analise da Reforma.', obra: 'Comentario', ano: 1535 },
    { teologo: 'TomÃ¡s de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sabedoria patristica.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('ex', 1, 1, 'Exodo 1:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 1 de Exodo. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Perspectiva historica contemporanea.', obra: 'The New Testament and the People of God', ano: 1992 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fundamento reformado.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('ex', 2, 1, 'Exodo 2:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 2 de Exodo. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Teologia dialogica.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Sabedoria patristica eterna.', obra: 'Confissoes', ano: 398 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('ex', 3, 1, 'Exodo 3:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 3 de Exodo. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Comentario classico.', obra: 'Comentario', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Analise teologica profunda.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('ex', 4, 1, 'Exodo 4:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 4 de Exodo. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Aplicacao pastoral pratique.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Interpretacao reformada.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('ex', 5, 1, 'Exodo 5:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 5 de Exodo. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Analise da Reforma.', obra: 'Comentario', ano: 1535 },
    { teologo: 'TomÃ¡s de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sabedoria patristica.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('ex', 6, 1, 'Exodo 6:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 6 de Exodo. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Perspectiva historica contemporanea.', obra: 'The New Testament and the People of God', ano: 1992 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fundamento reformado.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('ex', 7, 1, 'Exodo 7:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 7 de Exodo. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Teologia dialogica.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Sabedoria patristica eterna.', obra: 'Confissoes', ano: 398 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('ex', 8, 1, 'Exodo 8:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 8 de Exodo. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Comentario classico.', obra: 'Comentario', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Analise teologica profunda.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('ex', 9, 1, 'Exodo 9:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 9 de Exodo. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Aplicacao pastoral pratique.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Interpretacao reformada.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('ex', 10, 1, 'Exodo 10:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 10 de Exodo. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Analise da Reforma.', obra: 'Comentario', ano: 1535 },
    { teologo: 'TomÃ¡s de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sabedoria patristica.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('ex', 11, 1, 'Exodo 11:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 11 de Exodo. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Perspectiva historica contemporanea.', obra: 'The New Testament and the People of God', ano: 1992 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fundamento reformado.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('ex', 13, 1, 'Exodo 13:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 13 de Exodo. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Teologia dialogica.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Sabedoria patristica eterna.', obra: 'Confissoes', ano: 398 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('ex', 14, 1, 'Exodo 14:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 14 de Exodo. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Comentario classico.', obra: 'Comentario', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Analise teologica profunda.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('ex', 15, 1, 'Exodo 15:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 15 de Exodo. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Aplicacao pastoral pratique.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Interpretacao reformada.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('ex', 16, 1, 'Exodo 16:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 16 de Exodo. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Analise da Reforma.', obra: 'Comentario', ano: 1535 },
    { teologo: 'TomÃ¡s de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sabedoria patristica.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('ex', 17, 1, 'Exodo 17:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 17 de Exodo. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Perspectiva historica contemporanea.', obra: 'The New Testament and the People of God', ano: 1992 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fundamento reformado.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('ex', 18, 1, 'Exodo 18:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 18 de Exodo. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Teologia dialogica.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Sabedoria patristica eterna.', obra: 'Confissoes', ano: 398 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('ex', 19, 1, 'Exodo 19:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 19 de Exodo. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Comentario classico.', obra: 'Comentario', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Analise teologica profunda.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('ex', 21, 1, 'Exodo 21:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 21 de Exodo. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Aplicacao pastoral pratique.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Interpretacao reformada.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('ex', 22, 1, 'Exodo 22:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 22 de Exodo. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Analise da Reforma.', obra: 'Comentario', ano: 1535 },
    { teologo: 'TomÃ¡s de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sabedoria patristica.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('ex', 23, 1, 'Exodo 23:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 23 de Exodo. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Perspectiva historica contemporanea.', obra: 'The New Testament and the People of God', ano: 1992 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fundamento reformado.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('ex', 24, 1, 'Exodo 24:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 24 de Exodo. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Teologia dialogica.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Sabedoria patristica eterna.', obra: 'Confissoes', ano: 398 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('ex', 25, 1, 'Exodo 25:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 25 de Exodo. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Comentario classico.', obra: 'Comentario', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Analise teologica profunda.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('ex', 26, 1, 'Exodo 26:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 26 de Exodo. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Aplicacao pastoral pratique.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Interpretacao reformada.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('ex', 27, 1, 'Exodo 27:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 27 de Exodo. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Analise da Reforma.', obra: 'Comentario', ano: 1535 },
    { teologo: 'TomÃ¡s de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sabedoria patristica.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('ex', 28, 1, 'Exodo 28:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 28 de Exodo. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Perspectiva historica contemporanea.', obra: 'The New Testament and the People of God', ano: 1992 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fundamento reformado.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('ex', 29, 1, 'Exodo 29:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 29 de Exodo. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Teologia dialogica.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Sabedoria patristica eterna.', obra: 'Confissoes', ano: 398 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('ex', 30, 1, 'Exodo 30:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 30 de Exodo. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Comentario classico.', obra: 'Comentario', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Analise teologica profunda.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('ex', 31, 1, 'Exodo 31:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 31 de Exodo. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Aplicacao pastoral pratique.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Interpretacao reformada.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('ex', 32, 1, 'Exodo 32:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 32 de Exodo. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Analise da Reforma.', obra: 'Comentario', ano: 1535 },
    { teologo: 'TomÃ¡s de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sabedoria patristica.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('ex', 33, 1, 'Exodo 33:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 33 de Exodo. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Perspectiva historica contemporanea.', obra: 'The New Testament and the People of God', ano: 1992 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fundamento reformado.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('ex', 34, 1, 'Exodo 34:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 34 de Exodo. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Teologia dialogica.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Sabedoria patristica eterna.', obra: 'Confissoes', ano: 398 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('ex', 35, 1, 'Exodo 35:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 35 de Exodo. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Comentario classico.', obra: 'Comentario', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Analise teologica profunda.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('ex', 36, 1, 'Exodo 36:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 36 de Exodo. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Aplicacao pastoral pratique.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Interpretacao reformada.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('ex', 37, 1, 'Exodo 37:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 37 de Exodo. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Analise da Reforma.', obra: 'Comentario', ano: 1535 },
    { teologo: 'TomÃ¡s de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sabedoria patristica.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('ex', 38, 1, 'Exodo 38:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 38 de Exodo. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Perspectiva historica contemporanea.', obra: 'The New Testament and the People of God', ano: 1992 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fundamento reformado.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('ex', 39, 1, 'Exodo 39:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 39 de Exodo. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Teologia dialogica.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Sabedoria patristica eterna.', obra: 'Confissoes', ano: 398 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('ex', 40, 1, 'Exodo 40:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 40 de Exodo. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Comentario classico.', obra: 'Comentario', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Analise teologica profunda.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('lv', 1, 1, 'Levitico 1:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 1 de Levitico. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Aplicacao pastoral pratique.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Interpretacao reformada.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('lv', 2, 1, 'Levitico 2:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 2 de Levitico. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Analise da Reforma.', obra: 'Comentario', ano: 1535 },
    { teologo: 'TomÃ¡s de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sabedoria patristica.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('lv', 3, 1, 'Levitico 3:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 3 de Levitico. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Perspectiva historica contemporanea.', obra: 'The New Testament and the People of God', ano: 1992 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fundamento reformado.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('lv', 4, 1, 'Levitico 4:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 4 de Levitico. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Teologia dialogica.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Sabedoria patristica eterna.', obra: 'Confissoes', ano: 398 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('lv', 5, 1, 'Levitico 5:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 5 de Levitico. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Comentario classico.', obra: 'Comentario', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Analise teologica profunda.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('lv', 6, 1, 'Levitico 6:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 6 de Levitico. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Aplicacao pastoral pratique.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Interpretacao reformada.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('lv', 7, 1, 'Levitico 7:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 7 de Levitico. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Analise da Reforma.', obra: 'Comentario', ano: 1535 },
    { teologo: 'TomÃ¡s de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sabedoria patristica.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('lv', 8, 1, 'Levitico 8:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 8 de Levitico. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Perspectiva historica contemporanea.', obra: 'The New Testament and the People of God', ano: 1992 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fundamento reformado.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('lv', 9, 1, 'Levitico 9:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 9 de Levitico. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Teologia dialogica.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Sabedoria patristica eterna.', obra: 'Confissoes', ano: 398 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('lv', 10, 1, 'Levitico 10:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 10 de Levitico. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Comentario classico.', obra: 'Comentario', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Analise teologica profunda.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('lv', 11, 1, 'Levitico 11:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 11 de Levitico. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Aplicacao pastoral pratique.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Interpretacao reformada.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('lv', 12, 1, 'Levitico 12:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 12 de Levitico. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Analise da Reforma.', obra: 'Comentario', ano: 1535 },
    { teologo: 'TomÃ¡s de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sabedoria patristica.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('lv', 13, 1, 'Levitico 13:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 13 de Levitico. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Perspectiva historica contemporanea.', obra: 'The New Testament and the People of God', ano: 1992 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fundamento reformado.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('lv', 14, 1, 'Levitico 14:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 14 de Levitico. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Teologia dialogica.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Sabedoria patristica eterna.', obra: 'Confissoes', ano: 398 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('lv', 15, 1, 'Levitico 15:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 15 de Levitico. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Comentario classico.', obra: 'Comentario', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Analise teologica profunda.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('lv', 16, 1, 'Levitico 16:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 16 de Levitico. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Aplicacao pastoral pratique.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Interpretacao reformada.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('lv', 17, 1, 'Levitico 17:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 17 de Levitico. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Analise da Reforma.', obra: 'Comentario', ano: 1535 },
    { teologo: 'TomÃ¡s de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sabedoria patristica.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('lv', 18, 1, 'Levitico 18:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 18 de Levitico. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Perspectiva historica contemporanea.', obra: 'The New Testament and the People of God', ano: 1992 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fundamento reformado.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('lv', 19, 1, 'Levitico 19:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 19 de Levitico. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Teologia dialogica.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Sabedoria patristica eterna.', obra: 'Confissoes', ano: 398 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('lv', 20, 1, 'Levitico 20:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 20 de Levitico. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Comentario classico.', obra: 'Comentario', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Analise teologica profunda.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('lv', 21, 1, 'Levitico 21:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 21 de Levitico. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Aplicacao pastoral pratique.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Interpretacao reformada.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('lv', 22, 1, 'Levitico 22:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 22 de Levitico. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Analise da Reforma.', obra: 'Comentario', ano: 1535 },
    { teologo: 'TomÃ¡s de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sabedoria patristica.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('lv', 23, 1, 'Levitico 23:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 23 de Levitico. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Perspectiva historica contemporanea.', obra: 'The New Testament and the People of God', ano: 1992 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fundamento reformado.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('lv', 24, 1, 'Levitico 24:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 24 de Levitico. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Teologia dialogica.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Sabedoria patristica eterna.', obra: 'Confissoes', ano: 398 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('lv', 25, 1, 'Levitico 25:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 25 de Levitico. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Comentario classico.', obra: 'Comentario', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Analise teologica profunda.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('lv', 26, 1, 'Levitico 26:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 26 de Levitico. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Aplicacao pastoral pratique.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Interpretacao reformada.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('lv', 27, 1, 'Levitico 27:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 27 de Levitico. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Analise da Reforma.', obra: 'Comentario', ano: 1535 },
    { teologo: 'TomÃ¡s de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sabedoria patristica.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('nu', 1, 1, 'Numeros 1:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 1 de Numeros. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Perspectiva historica contemporanea.', obra: 'The New Testament and the People of God', ano: 1992 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fundamento reformado.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('nu', 2, 1, 'Numeros 2:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 2 de Numeros. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Teologia dialogica.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Sabedoria patristica eterna.', obra: 'Confissoes', ano: 398 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('nu', 3, 1, 'Numeros 3:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 3 de Numeros. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Comentario classico.', obra: 'Comentario', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Analise teologica profunda.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('nu', 4, 1, 'Numeros 4:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 4 de Numeros. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Aplicacao pastoral pratique.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Interpretacao reformada.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('nu', 5, 1, 'Numeros 5:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 5 de Numeros. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Analise da Reforma.', obra: 'Comentario', ano: 1535 },
    { teologo: 'TomÃ¡s de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sabedoria patristica.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('nu', 6, 1, 'Numeros 6:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 6 de Numeros. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Perspectiva historica contemporanea.', obra: 'The New Testament and the People of God', ano: 1992 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fundamento reformado.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('nu', 7, 1, 'Numeros 7:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 7 de Numeros. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Teologia dialogica.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Sabedoria patristica eterna.', obra: 'Confissoes', ano: 398 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('nu', 8, 1, 'Numeros 8:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 8 de Numeros. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Comentario classico.', obra: 'Comentario', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Analise teologica profunda.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('nu', 9, 1, 'Numeros 9:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 9 de Numeros. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Aplicacao pastoral pratique.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Interpretacao reformada.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('nu', 10, 1, 'Numeros 10:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 10 de Numeros. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Analise da Reforma.', obra: 'Comentario', ano: 1535 },
    { teologo: 'TomÃ¡s de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sabedoria patristica.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('nu', 11, 1, 'Numeros 11:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 11 de Numeros. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Perspectiva historica contemporanea.', obra: 'The New Testament and the People of God', ano: 1992 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fundamento reformado.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('nu', 12, 1, 'Numeros 12:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 12 de Numeros. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Teologia dialogica.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Sabedoria patristica eterna.', obra: 'Confissoes', ano: 398 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('nu', 13, 1, 'Numeros 13:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 13 de Numeros. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Comentario classico.', obra: 'Comentario', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Analise teologica profunda.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('nu', 14, 1, 'Numeros 14:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 14 de Numeros. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Aplicacao pastoral pratique.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Interpretacao reformada.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('nu', 15, 1, 'Numeros 15:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 15 de Numeros. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Analise da Reforma.', obra: 'Comentario', ano: 1535 },
    { teologo: 'TomÃ¡s de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sabedoria patristica.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('nu', 16, 1, 'Numeros 16:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 16 de Numeros. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Perspectiva historica contemporanea.', obra: 'The New Testament and the People of God', ano: 1992 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fundamento reformado.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('nu', 17, 1, 'Numeros 17:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 17 de Numeros. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Teologia dialogica.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Sabedoria patristica eterna.', obra: 'Confissoes', ano: 398 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('nu', 18, 1, 'Numeros 18:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 18 de Numeros. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Comentario classico.', obra: 'Comentario', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Analise teologica profunda.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('nu', 19, 1, 'Numeros 19:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 19 de Numeros. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Aplicacao pastoral pratique.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Interpretacao reformada.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('nu', 20, 1, 'Numeros 20:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 20 de Numeros. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Analise da Reforma.', obra: 'Comentario', ano: 1535 },
    { teologo: 'TomÃ¡s de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sabedoria patristica.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('nu', 21, 1, 'Numeros 21:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 21 de Numeros. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Perspectiva historica contemporanea.', obra: 'The New Testament and the People of God', ano: 1992 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fundamento reformado.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('nu', 22, 1, 'Numeros 22:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 22 de Numeros. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Teologia dialogica.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Sabedoria patristica eterna.', obra: 'Confissoes', ano: 398 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('nu', 23, 1, 'Numeros 23:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 23 de Numeros. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Comentario classico.', obra: 'Comentario', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Analise teologica profunda.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('nu', 24, 1, 'Numeros 24:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 24 de Numeros. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Aplicacao pastoral pratique.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Interpretacao reformada.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('nu', 25, 1, 'Numeros 25:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 25 de Numeros. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Analise da Reforma.', obra: 'Comentario', ano: 1535 },
    { teologo: 'TomÃ¡s de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sabedoria patristica.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('nu', 26, 1, 'Numeros 26:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 26 de Numeros. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Perspectiva historica contemporanea.', obra: 'The New Testament and the People of God', ano: 1992 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fundamento reformado.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('nu', 27, 1, 'Numeros 27:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 27 de Numeros. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Teologia dialogica.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Sabedoria patristica eterna.', obra: 'Confissoes', ano: 398 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('nu', 28, 1, 'Numeros 28:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 28 de Numeros. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Comentario classico.', obra: 'Comentario', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Analise teologica profunda.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('nu', 29, 1, 'Numeros 29:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 29 de Numeros. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Aplicacao pastoral pratique.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Interpretacao reformada.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('nu', 30, 1, 'Numeros 30:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 30 de Numeros. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Analise da Reforma.', obra: 'Comentario', ano: 1535 },
    { teologo: 'TomÃ¡s de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sabedoria patristica.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('nu', 31, 1, 'Numeros 31:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 31 de Numeros. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Perspectiva historica contemporanea.', obra: 'The New Testament and the People of God', ano: 1992 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fundamento reformado.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('nu', 32, 1, 'Numeros 32:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 32 de Numeros. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Teologia dialogica.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Sabedoria patristica eterna.', obra: 'Confissoes', ano: 398 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('nu', 33, 1, 'Numeros 33:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 33 de Numeros. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Comentario classico.', obra: 'Comentario', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Analise teologica profunda.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('nu', 34, 1, 'Numeros 34:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 34 de Numeros. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Aplicacao pastoral pratique.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Interpretacao reformada.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('nu', 35, 1, 'Numeros 35:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 35 de Numeros. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Analise da Reforma.', obra: 'Comentario', ano: 1535 },
    { teologo: 'TomÃ¡s de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sabedoria patristica.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('nu', 36, 1, 'Numeros 36:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 36 de Numeros. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Perspectiva historica contemporanea.', obra: 'The New Testament and the People of God', ano: 1992 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fundamento reformado.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('dt', 1, 1, 'Deuteronomio 1:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 1 de Deuteronomio. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Teologia dialogica.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Sabedoria patristica eterna.', obra: 'Confissoes', ano: 398 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('dt', 2, 1, 'Deuteronomio 2:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 2 de Deuteronomio. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Comentario classico.', obra: 'Comentario', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Analise teologica profunda.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('dt', 3, 1, 'Deuteronomio 3:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 3 de Deuteronomio. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Aplicacao pastoral pratique.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Interpretacao reformada.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('dt', 4, 1, 'Deuteronomio 4:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 4 de Deuteronomio. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Analise da Reforma.', obra: 'Comentario', ano: 1535 },
    { teologo: 'TomÃ¡s de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sabedoria patristica.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('dt', 5, 1, 'Deuteronomio 5:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 5 de Deuteronomio. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Perspectiva historica contemporanea.', obra: 'The New Testament and the People of God', ano: 1992 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fundamento reformado.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('dt', 6, 1, 'Deuteronomio 6:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 6 de Deuteronomio. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Teologia dialogica.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Sabedoria patristica eterna.', obra: 'Confissoes', ano: 398 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('dt', 7, 1, 'Deuteronomio 7:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 7 de Deuteronomio. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Comentario classico.', obra: 'Comentario', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Analise teologica profunda.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('dt', 8, 1, 'Deuteronomio 8:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 8 de Deuteronomio. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Aplicacao pastoral pratique.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Interpretacao reformada.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('dt', 9, 1, 'Deuteronomio 9:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 9 de Deuteronomio. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Analise da Reforma.', obra: 'Comentario', ano: 1535 },
    { teologo: 'TomÃ¡s de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sabedoria patristica.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('dt', 10, 1, 'Deuteronomio 10:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 10 de Deuteronomio. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Perspectiva historica contemporanea.', obra: 'The New Testament and the People of God', ano: 1992 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fundamento reformado.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('dt', 11, 1, 'Deuteronomio 11:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 11 de Deuteronomio. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Teologia dialogica.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Sabedoria patristica eterna.', obra: 'Confissoes', ano: 398 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('dt', 12, 1, 'Deuteronomio 12:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 12 de Deuteronomio. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Comentario classico.', obra: 'Comentario', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Analise teologica profunda.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('dt', 13, 1, 'Deuteronomio 13:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 13 de Deuteronomio. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Aplicacao pastoral pratique.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Interpretacao reformada.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('dt', 14, 1, 'Deuteronomio 14:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 14 de Deuteronomio. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Analise da Reforma.', obra: 'Comentario', ano: 1535 },
    { teologo: 'TomÃ¡s de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sabedoria patristica.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('dt', 15, 1, 'Deuteronomio 15:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 15 de Deuteronomio. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Perspectiva historica contemporanea.', obra: 'The New Testament and the People of God', ano: 1992 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fundamento reformado.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('dt', 16, 1, 'Deuteronomio 16:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 16 de Deuteronomio. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Teologia dialogica.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Sabedoria patristica eterna.', obra: 'Confissoes', ano: 398 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('dt', 17, 1, 'Deuteronomio 17:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 17 de Deuteronomio. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Comentario classico.', obra: 'Comentario', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Analise teologica profunda.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('dt', 18, 1, 'Deuteronomio 18:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 18 de Deuteronomio. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Aplicacao pastoral pratique.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Interpretacao reformada.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('dt', 19, 1, 'Deuteronomio 19:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 19 de Deuteronomio. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Analise da Reforma.', obra: 'Comentario', ano: 1535 },
    { teologo: 'TomÃ¡s de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sabedoria patristica.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('dt', 20, 1, 'Deuteronomio 20:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 20 de Deuteronomio. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Perspectiva historica contemporanea.', obra: 'The New Testament and the People of God', ano: 1992 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fundamento reformado.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('dt', 21, 1, 'Deuteronomio 21:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 21 de Deuteronomio. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Teologia dialogica.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Sabedoria patristica eterna.', obra: 'Confissoes', ano: 398 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('dt', 22, 1, 'Deuteronomio 22:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 22 de Deuteronomio. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Comentario classico.', obra: 'Comentario', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Analise teologica profunda.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('dt', 23, 1, 'Deuteronomio 23:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 23 de Deuteronomio. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Aplicacao pastoral pratique.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Interpretacao reformada.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('dt', 24, 1, 'Deuteronomio 24:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 24 de Deuteronomio. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Analise da Reforma.', obra: 'Comentario', ano: 1535 },
    { teologo: 'TomÃ¡s de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sabedoria patristica.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('dt', 25, 1, 'Deuteronomio 25:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 25 de Deuteronomio. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Perspectiva historica contemporanea.', obra: 'The New Testament and the People of God', ano: 1992 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fundamento reformado.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('dt', 26, 1, 'Deuteronomio 26:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 26 de Deuteronomio. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Teologia dialogica.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Sabedoria patristica eterna.', obra: 'Confissoes', ano: 398 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('dt', 27, 1, 'Deuteronomio 27:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 27 de Deuteronomio. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Comentario classico.', obra: 'Comentario', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Analise teologica profunda.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('dt', 28, 1, 'Deuteronomio 28:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 28 de Deuteronomio. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Aplicacao pastoral pratique.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Interpretacao reformada.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('dt', 29, 1, 'Deuteronomio 29:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 29 de Deuteronomio. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Analise da Reforma.', obra: 'Comentario', ano: 1535 },
    { teologo: 'TomÃ¡s de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sabedoria patristica.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('dt', 30, 1, 'Deuteronomio 30:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 30 de Deuteronomio. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Perspectiva historica contemporanea.', obra: 'The New Testament and the People of God', ano: 1992 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fundamento reformado.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('dt', 31, 1, 'Deuteronomio 31:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 31 de Deuteronomio. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Teologia dialogica.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Sabedoria patristica eterna.', obra: 'Confissoes', ano: 398 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('dt', 32, 1, 'Deuteronomio 32:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 32 de Deuteronomio. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Comentario classico.', obra: 'Comentario', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Analise teologica profunda.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('dt', 33, 1, 'Deuteronomio 33:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 33 de Deuteronomio. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Aplicacao pastoral pratique.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Interpretacao reformada.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('dt', 34, 1, 'Deuteronomio 34:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 34 de Deuteronomio. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Analise da Reforma.', obra: 'Comentario', ano: 1535 },
    { teologo: 'TomÃ¡s de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sabedoria patristica.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('js', 1, 1, 'Josue 1:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 1 de Josue. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Perspectiva historica contemporanea.', obra: 'The New Testament and the People of God', ano: 1992 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fundamento reformado.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('js', 2, 1, 'Josue 2:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 2 de Josue. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Teologia dialogica.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Sabedoria patristica eterna.', obra: 'Confissoes', ano: 398 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('js', 3, 1, 'Josue 3:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 3 de Josue. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Comentario classico.', obra: 'Comentario', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Analise teologica profunda.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('js', 4, 1, 'Josue 4:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 4 de Josue. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Aplicacao pastoral pratique.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Interpretacao reformada.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('js', 5, 1, 'Josue 5:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 5 de Josue. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Analise da Reforma.', obra: 'Comentario', ano: 1535 },
    { teologo: 'TomÃ¡s de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sabedoria patristica.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('js', 6, 1, 'Josue 6:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 6 de Josue. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Perspectiva historica contemporanea.', obra: 'The New Testament and the People of God', ano: 1992 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fundamento reformado.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('js', 7, 1, 'Josue 7:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 7 de Josue. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Teologia dialogica.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Sabedoria patristica eterna.', obra: 'Confissoes', ano: 398 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('js', 8, 1, 'Josue 8:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 8 de Josue. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Comentario classico.', obra: 'Comentario', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Analise teologica profunda.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('js', 9, 1, 'Josue 9:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 9 de Josue. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Aplicacao pastoral pratique.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Interpretacao reformada.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('js', 10, 1, 'Josue 10:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 10 de Josue. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Analise da Reforma.', obra: 'Comentario', ano: 1535 },
    { teologo: 'TomÃ¡s de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sabedoria patristica.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('js', 11, 1, 'Josue 11:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 11 de Josue. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Perspectiva historica contemporanea.', obra: 'The New Testament and the People of God', ano: 1992 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fundamento reformado.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('js', 12, 1, 'Josue 12:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 12 de Josue. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Teologia dialogica.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Sabedoria patristica eterna.', obra: 'Confissoes', ano: 398 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('js', 13, 1, 'Josue 13:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 13 de Josue. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Comentario classico.', obra: 'Comentario', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Analise teologica profunda.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('js', 14, 1, 'Josue 14:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 14 de Josue. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Aplicacao pastoral pratique.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Interpretacao reformada.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('js', 15, 1, 'Josue 15:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 15 de Josue. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Analise da Reforma.', obra: 'Comentario', ano: 1535 },
    { teologo: 'TomÃ¡s de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sabedoria patristica.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('js', 16, 1, 'Josue 16:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 16 de Josue. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Perspectiva historica contemporanea.', obra: 'The New Testament and the People of God', ano: 1992 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fundamento reformado.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('js', 17, 1, 'Josue 17:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 17 de Josue. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Teologia dialogica.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Sabedoria patristica eterna.', obra: 'Confissoes', ano: 398 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('js', 18, 1, 'Josue 18:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 18 de Josue. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Comentario classico.', obra: 'Comentario', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Analise teologica profunda.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('js', 19, 1, 'Josue 19:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 19 de Josue. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Aplicacao pastoral pratique.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Interpretacao reformada.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('js', 20, 1, 'Josue 20:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 20 de Josue. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Analise da Reforma.', obra: 'Comentario', ano: 1535 },
    { teologo: 'TomÃ¡s de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sabedoria patristica.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('js', 21, 1, 'Josue 21:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 21 de Josue. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Perspectiva historica contemporanea.', obra: 'The New Testament and the People of God', ano: 1992 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fundamento reformado.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('js', 22, 1, 'Josue 22:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 22 de Josue. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Teologia dialogica.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Sabedoria patristica eterna.', obra: 'Confissoes', ano: 398 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('js', 23, 1, 'Josue 23:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 23 de Josue. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Comentario classico.', obra: 'Comentario', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Analise teologica profunda.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('js', 24, 1, 'Josue 24:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 24 de Josue. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Aplicacao pastoral pratique.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Interpretacao reformada.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('jz', 1, 1, 'Juizes 1:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 1 de Juizes. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Analise da Reforma.', obra: 'Comentario', ano: 1535 },
    { teologo: 'TomÃ¡s de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sabedoria patristica.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('jz', 2, 1, 'Juizes 2:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 2 de Juizes. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Perspectiva historica contemporanea.', obra: 'The New Testament and the People of God', ano: 1992 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fundamento reformado.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('jz', 3, 1, 'Juizes 3:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 3 de Juizes. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Teologia dialogica.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Sabedoria patristica eterna.', obra: 'Confissoes', ano: 398 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('jz', 4, 1, 'Juizes 4:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 4 de Juizes. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Comentario classico.', obra: 'Comentario', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Analise teologica profunda.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('jz', 5, 1, 'Juizes 5:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 5 de Juizes. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Aplicacao pastoral pratique.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Interpretacao reformada.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('jz', 6, 1, 'Juizes 6:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 6 de Juizes. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Analise da Reforma.', obra: 'Comentario', ano: 1535 },
    { teologo: 'TomÃ¡s de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sabedoria patristica.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('jz', 7, 1, 'Juizes 7:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 7 de Juizes. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Perspectiva historica contemporanea.', obra: 'The New Testament and the People of God', ano: 1992 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fundamento reformado.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('jz', 8, 1, 'Juizes 8:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 8 de Juizes. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Teologia dialogica.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Sabedoria patristica eterna.', obra: 'Confissoes', ano: 398 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('jz', 9, 1, 'Juizes 9:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 9 de Juizes. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Comentario classico.', obra: 'Comentario', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Analise teologica profunda.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('jz', 10, 1, 'Juizes 10:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 10 de Juizes. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Aplicacao pastoral pratique.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Interpretacao reformada.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('jz', 11, 1, 'Juizes 11:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 11 de Juizes. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Analise da Reforma.', obra: 'Comentario', ano: 1535 },
    { teologo: 'TomÃ¡s de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sabedoria patristica.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('jz', 12, 1, 'Juizes 12:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 12 de Juizes. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Perspectiva historica contemporanea.', obra: 'The New Testament and the People of God', ano: 1992 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fundamento reformado.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('jz', 13, 1, 'Juizes 13:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 13 de Juizes. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Teologia dialogica.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Sabedoria patristica eterna.', obra: 'Confissoes', ano: 398 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('jz', 14, 1, 'Juizes 14:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 14 de Juizes. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Comentario classico.', obra: 'Comentario', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Analise teologica profunda.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('jz', 15, 1, 'Juizes 15:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 15 de Juizes. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Aplicacao pastoral pratique.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Interpretacao reformada.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('jz', 16, 1, 'Juizes 16:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 16 de Juizes. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Analise da Reforma.', obra: 'Comentario', ano: 1535 },
    { teologo: 'TomÃ¡s de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sabedoria patristica.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('jz', 17, 1, 'Juizes 17:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 17 de Juizes. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Perspectiva historica contemporanea.', obra: 'The New Testament and the People of God', ano: 1992 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fundamento reformado.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('jz', 18, 1, 'Juizes 18:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 18 de Juizes. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Teologia dialogica.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Sabedoria patristica eterna.', obra: 'Confissoes', ano: 398 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('jz', 19, 1, 'Juizes 19:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 19 de Juizes. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Comentario classico.', obra: 'Comentario', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Analise teologica profunda.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('jz', 20, 1, 'Juizes 20:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 20 de Juizes. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Aplicacao pastoral pratique.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Interpretacao reformada.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('jz', 21, 1, 'Juizes 21:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 21 de Juizes. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Analise da Reforma.', obra: 'Comentario', ano: 1535 },
    { teologo: 'TomÃ¡s de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sabedoria patristica.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('rt', 1, 1, 'Rute 1:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 1 de Rute. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Perspectiva historica contemporanea.', obra: 'The New Testament and the People of God', ano: 1992 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fundamento reformado.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('rt', 2, 1, 'Rute 2:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 2 de Rute. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Teologia dialogica.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Sabedoria patristica eterna.', obra: 'Confissoes', ano: 398 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('rt', 3, 1, 'Rute 3:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 3 de Rute. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Comentario classico.', obra: 'Comentario', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Analise teologica profunda.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('rt', 4, 1, 'Rute 4:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 4 de Rute. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Aplicacao pastoral pratique.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Interpretacao reformada.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('1sm', 1, 1, '1 Samuel 1:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 1 de 1 Samuel. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Analise da Reforma.', obra: 'Comentario', ano: 1535 },
    { teologo: 'TomÃ¡s de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sabedoria patristica.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('1sm', 2, 1, '1 Samuel 2:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 2 de 1 Samuel. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Perspectiva historica contemporanea.', obra: 'The New Testament and the People of God', ano: 1992 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fundamento reformado.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('1sm', 3, 1, '1 Samuel 3:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 3 de 1 Samuel. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Teologia dialogica.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Sabedoria patristica eterna.', obra: 'Confissoes', ano: 398 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('1sm', 4, 1, '1 Samuel 4:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 4 de 1 Samuel. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Comentario classico.', obra: 'Comentario', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Analise teologica profunda.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('1sm', 5, 1, '1 Samuel 5:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 5 de 1 Samuel. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Aplicacao pastoral pratique.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Interpretacao reformada.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('1sm', 6, 1, '1 Samuel 6:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 6 de 1 Samuel. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Analise da Reforma.', obra: 'Comentario', ano: 1535 },
    { teologo: 'TomÃ¡s de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sabedoria patristica.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('1sm', 7, 1, '1 Samuel 7:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 7 de 1 Samuel. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Perspectiva historica contemporanea.', obra: 'The New Testament and the People of God', ano: 1992 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fundamento reformado.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('1sm', 8, 1, '1 Samuel 8:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 8 de 1 Samuel. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Teologia dialogica.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Sabedoria patristica eterna.', obra: 'Confissoes', ano: 398 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('1sm', 9, 1, '1 Samuel 9:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 9 de 1 Samuel. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Comentario classico.', obra: 'Comentario', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Analise teologica profunda.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('1sm', 10, 1, '1 Samuel 10:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 10 de 1 Samuel. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Aplicacao pastoral pratique.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Interpretacao reformada.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('1sm', 11, 1, '1 Samuel 11:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 11 de 1 Samuel. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Analise da Reforma.', obra: 'Comentario', ano: 1535 },
    { teologo: 'TomÃ¡s de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sabedoria patristica.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('1sm', 12, 1, '1 Samuel 12:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 12 de 1 Samuel. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Perspectiva historica contemporanea.', obra: 'The New Testament and the People of God', ano: 1992 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fundamento reformado.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('1sm', 13, 1, '1 Samuel 13:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 13 de 1 Samuel. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Teologia dialogica.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Sabedoria patristica eterna.', obra: 'Confissoes', ano: 398 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('1sm', 14, 1, '1 Samuel 14:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 14 de 1 Samuel. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Comentario classico.', obra: 'Comentario', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Analise teologica profunda.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('1sm', 15, 1, '1 Samuel 15:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 15 de 1 Samuel. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Aplicacao pastoral pratique.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Interpretacao reformada.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('1sm', 16, 1, '1 Samuel 16:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 16 de 1 Samuel. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Analise da Reforma.', obra: 'Comentario', ano: 1535 },
    { teologo: 'TomÃ¡s de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sabedoria patristica.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('1sm', 17, 1, '1 Samuel 17:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 17 de 1 Samuel. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Perspectiva historica contemporanea.', obra: 'The New Testament and the People of God', ano: 1992 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fundamento reformado.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('1sm', 18, 1, '1 Samuel 18:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 18 de 1 Samuel. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Teologia dialogica.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Sabedoria patristica eterna.', obra: 'Confissoes', ano: 398 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('1sm', 19, 1, '1 Samuel 19:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 19 de 1 Samuel. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Comentario classico.', obra: 'Comentario', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Analise teologica profunda.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('1sm', 20, 1, '1 Samuel 20:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 20 de 1 Samuel. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Aplicacao pastoral pratique.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Interpretacao reformada.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('1sm', 21, 1, '1 Samuel 21:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 21 de 1 Samuel. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Analise da Reforma.', obra: 'Comentario', ano: 1535 },
    { teologo: 'TomÃ¡s de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sabedoria patristica.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('1sm', 22, 1, '1 Samuel 22:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 22 de 1 Samuel. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Perspectiva historica contemporanea.', obra: 'The New Testament and the People of God', ano: 1992 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fundamento reformado.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('1sm', 23, 1, '1 Samuel 23:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 23 de 1 Samuel. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Teologia dialogica.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Sabedoria patristica eterna.', obra: 'Confissoes', ano: 398 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('1sm', 24, 1, '1 Samuel 24:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 24 de 1 Samuel. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Comentario classico.', obra: 'Comentario', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Analise teologica profunda.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('1sm', 25, 1, '1 Samuel 25:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 25 de 1 Samuel. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Aplicacao pastoral pratique.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Interpretacao reformada.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('1sm', 26, 1, '1 Samuel 26:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 26 de 1 Samuel. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Analise da Reforma.', obra: 'Comentario', ano: 1535 },
    { teologo: 'TomÃ¡s de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sabedoria patristica.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('1sm', 27, 1, '1 Samuel 27:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 27 de 1 Samuel. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Perspectiva historica contemporanea.', obra: 'The New Testament and the People of God', ano: 1992 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fundamento reformado.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('1sm', 28, 1, '1 Samuel 28:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 28 de 1 Samuel. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Teologia dialogica.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Sabedoria patristica eterna.', obra: 'Confissoes', ano: 398 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('1sm', 29, 1, '1 Samuel 29:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 29 de 1 Samuel. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Comentario classico.', obra: 'Comentario', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Analise teologica profunda.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('1sm', 30, 1, '1 Samuel 30:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 30 de 1 Samuel. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Aplicacao pastoral pratique.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Interpretacao reformada.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('1sm', 31, 1, '1 Samuel 31:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 31 de 1 Samuel. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Analise da Reforma.', obra: 'Comentario', ano: 1535 },
    { teologo: 'TomÃ¡s de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sabedoria patristica.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('2sm', 1, 1, '2 Samuel 1:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 1 de 2 Samuel. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Perspectiva historica contemporanea.', obra: 'The New Testament and the People of God', ano: 1992 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fundamento reformado.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('2sm', 2, 1, '2 Samuel 2:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 2 de 2 Samuel. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Teologia dialogica.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Sabedoria patristica eterna.', obra: 'Confissoes', ano: 398 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('2sm', 3, 1, '2 Samuel 3:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 3 de 2 Samuel. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Comentario classico.', obra: 'Comentario', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Analise teologica profunda.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('2sm', 4, 1, '2 Samuel 4:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 4 de 2 Samuel. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Aplicacao pastoral pratique.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Interpretacao reformada.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('2sm', 5, 1, '2 Samuel 5:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 5 de 2 Samuel. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Analise da Reforma.', obra: 'Comentario', ano: 1535 },
    { teologo: 'TomÃ¡s de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sabedoria patristica.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('2sm', 6, 1, '2 Samuel 6:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 6 de 2 Samuel. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Perspectiva historica contemporanea.', obra: 'The New Testament and the People of God', ano: 1992 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fundamento reformado.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('2sm', 7, 1, '2 Samuel 7:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 7 de 2 Samuel. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Teologia dialogica.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Sabedoria patristica eterna.', obra: 'Confissoes', ano: 398 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('2sm', 8, 1, '2 Samuel 8:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 8 de 2 Samuel. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Comentario classico.', obra: 'Comentario', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Analise teologica profunda.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('2sm', 9, 1, '2 Samuel 9:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 9 de 2 Samuel. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Aplicacao pastoral pratique.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Interpretacao reformada.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('2sm', 10, 1, '2 Samuel 10:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 10 de 2 Samuel. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Analise da Reforma.', obra: 'Comentario', ano: 1535 },
    { teologo: 'TomÃ¡s de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sabedoria patristica.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('2sm', 11, 1, '2 Samuel 11:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 11 de 2 Samuel. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Perspectiva historica contemporanea.', obra: 'The New Testament and the People of God', ano: 1992 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fundamento reformado.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('2sm', 12, 1, '2 Samuel 12:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 12 de 2 Samuel. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Teologia dialogica.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Sabedoria patristica eterna.', obra: 'Confissoes', ano: 398 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('2sm', 13, 1, '2 Samuel 13:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 13 de 2 Samuel. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Comentario classico.', obra: 'Comentario', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Analise teologica profunda.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('2sm', 14, 1, '2 Samuel 14:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 14 de 2 Samuel. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Aplicacao pastoral pratique.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Interpretacao reformada.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('2sm', 15, 1, '2 Samuel 15:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 15 de 2 Samuel. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Analise da Reforma.', obra: 'Comentario', ano: 1535 },
    { teologo: 'TomÃ¡s de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sabedoria patristica.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('2sm', 16, 1, '2 Samuel 16:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 16 de 2 Samuel. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Perspectiva historica contemporanea.', obra: 'The New Testament and the People of God', ano: 1992 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fundamento reformado.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('2sm', 17, 1, '2 Samuel 17:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 17 de 2 Samuel. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Teologia dialogica.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Sabedoria patristica eterna.', obra: 'Confissoes', ano: 398 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('2sm', 18, 1, '2 Samuel 18:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 18 de 2 Samuel. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Comentario classico.', obra: 'Comentario', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Analise teologica profunda.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('2sm', 19, 1, '2 Samuel 19:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 19 de 2 Samuel. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Aplicacao pastoral pratique.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Interpretacao reformada.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('2sm', 20, 1, '2 Samuel 20:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 20 de 2 Samuel. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Analise da Reforma.', obra: 'Comentario', ano: 1535 },
    { teologo: 'TomÃ¡s de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sabedoria patristica.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('2sm', 21, 1, '2 Samuel 21:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 21 de 2 Samuel. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Perspectiva historica contemporanea.', obra: 'The New Testament and the People of God', ano: 1992 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fundamento reformado.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('2sm', 22, 1, '2 Samuel 22:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 22 de 2 Samuel. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Teologia dialogica.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Sabedoria patristica eterna.', obra: 'Confissoes', ano: 398 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('2sm', 23, 1, '2 Samuel 23:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 23 de 2 Samuel. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Comentario classico.', obra: 'Comentario', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Analise teologica profunda.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('2sm', 24, 1, '2 Samuel 24:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 24 de 2 Samuel. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Aplicacao pastoral pratique.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Interpretacao reformada.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('1rs', 1, 1, '1 Reis 1:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 1 de 1 Reis. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Analise da Reforma.', obra: 'Comentario', ano: 1535 },
    { teologo: 'TomÃ¡s de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sabedoria patristica.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('1rs', 2, 1, '1 Reis 2:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 2 de 1 Reis. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Perspectiva historica contemporanea.', obra: 'The New Testament and the People of God', ano: 1992 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fundamento reformado.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('1rs', 3, 1, '1 Reis 3:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 3 de 1 Reis. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Teologia dialogica.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Sabedoria patristica eterna.', obra: 'Confissoes', ano: 398 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('1rs', 4, 1, '1 Reis 4:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 4 de 1 Reis. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Comentario classico.', obra: 'Comentario', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Analise teologica profunda.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('1rs', 5, 1, '1 Reis 5:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 5 de 1 Reis. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Aplicacao pastoral pratique.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Interpretacao reformada.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('1rs', 6, 1, '1 Reis 6:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 6 de 1 Reis. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Analise da Reforma.', obra: 'Comentario', ano: 1535 },
    { teologo: 'TomÃ¡s de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sabedoria patristica.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('1rs', 7, 1, '1 Reis 7:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 7 de 1 Reis. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Perspectiva historica contemporanea.', obra: 'The New Testament and the People of God', ano: 1992 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fundamento reformado.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('1rs', 8, 1, '1 Reis 8:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 8 de 1 Reis. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Teologia dialogica.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Sabedoria patristica eterna.', obra: 'Confissoes', ano: 398 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('1rs', 9, 1, '1 Reis 9:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 9 de 1 Reis. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Comentario classico.', obra: 'Comentario', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Analise teologica profunda.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('1rs', 10, 1, '1 Reis 10:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 10 de 1 Reis. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Aplicacao pastoral pratique.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Interpretacao reformada.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('1rs', 11, 1, '1 Reis 11:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 11 de 1 Reis. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Analise da Reforma.', obra: 'Comentario', ano: 1535 },
    { teologo: 'TomÃ¡s de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sabedoria patristica.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('1rs', 12, 1, '1 Reis 12:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 12 de 1 Reis. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Perspectiva historica contemporanea.', obra: 'The New Testament and the People of God', ano: 1992 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fundamento reformado.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('1rs', 13, 1, '1 Reis 13:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 13 de 1 Reis. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Teologia dialogica.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Sabedoria patristica eterna.', obra: 'Confissoes', ano: 398 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('1rs', 14, 1, '1 Reis 14:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 14 de 1 Reis. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Comentario classico.', obra: 'Comentario', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Analise teologica profunda.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('1rs', 15, 1, '1 Reis 15:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 15 de 1 Reis. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Aplicacao pastoral pratique.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Interpretacao reformada.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('1rs', 16, 1, '1 Reis 16:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 16 de 1 Reis. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Analise da Reforma.', obra: 'Comentario', ano: 1535 },
    { teologo: 'TomÃ¡s de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sabedoria patristica.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('1rs', 17, 1, '1 Reis 17:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 17 de 1 Reis. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Perspectiva historica contemporanea.', obra: 'The New Testament and the People of God', ano: 1992 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fundamento reformado.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('1rs', 18, 1, '1 Reis 18:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 18 de 1 Reis. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Teologia dialogica.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Sabedoria patristica eterna.', obra: 'Confissoes', ano: 398 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('1rs', 19, 1, '1 Reis 19:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 19 de 1 Reis. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Comentario classico.', obra: 'Comentario', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Analise teologica profunda.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('1rs', 20, 1, '1 Reis 20:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 20 de 1 Reis. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Aplicacao pastoral pratique.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Interpretacao reformada.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('1rs', 21, 1, '1 Reis 21:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 21 de 1 Reis. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Analise da Reforma.', obra: 'Comentario', ano: 1535 },
    { teologo: 'TomÃ¡s de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sabedoria patristica.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('1rs', 22, 1, '1 Reis 22:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 22 de 1 Reis. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Perspectiva historica contemporanea.', obra: 'The New Testament and the People of God', ano: 1992 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fundamento reformado.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('2rs', 1, 1, '2 Reis 1:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 1 de 2 Reis. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Teologia dialogica.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Sabedoria patristica eterna.', obra: 'Confissoes', ano: 398 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('2rs', 2, 1, '2 Reis 2:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 2 de 2 Reis. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Comentario classico.', obra: 'Comentario', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Analise teologica profunda.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('2rs', 3, 1, '2 Reis 3:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 3 de 2 Reis. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Aplicacao pastoral pratique.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Interpretacao reformada.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('2rs', 4, 1, '2 Reis 4:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 4 de 2 Reis. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Analise da Reforma.', obra: 'Comentario', ano: 1535 },
    { teologo: 'TomÃ¡s de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sabedoria patristica.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('2rs', 5, 1, '2 Reis 5:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 5 de 2 Reis. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Perspectiva historica contemporanea.', obra: 'The New Testament and the People of God', ano: 1992 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fundamento reformado.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('2rs', 6, 1, '2 Reis 6:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 6 de 2 Reis. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Teologia dialogica.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Sabedoria patristica eterna.', obra: 'Confissoes', ano: 398 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('2rs', 7, 1, '2 Reis 7:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 7 de 2 Reis. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Comentario classico.', obra: 'Comentario', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Analise teologica profunda.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('2rs', 8, 1, '2 Reis 8:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 8 de 2 Reis. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Aplicacao pastoral pratique.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Interpretacao reformada.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('2rs', 9, 1, '2 Reis 9:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 9 de 2 Reis. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Analise da Reforma.', obra: 'Comentario', ano: 1535 },
    { teologo: 'TomÃ¡s de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sabedoria patristica.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('2rs', 10, 1, '2 Reis 10:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 10 de 2 Reis. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Perspectiva historica contemporanea.', obra: 'The New Testament and the People of God', ano: 1992 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fundamento reformado.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('2rs', 11, 1, '2 Reis 11:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 11 de 2 Reis. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Teologia dialogica.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Sabedoria patristica eterna.', obra: 'Confissoes', ano: 398 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('2rs', 12, 1, '2 Reis 12:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 12 de 2 Reis. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Comentario classico.', obra: 'Comentario', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Analise teologica profunda.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('2rs', 13, 1, '2 Reis 13:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 13 de 2 Reis. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Aplicacao pastoral pratique.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Interpretacao reformada.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('2rs', 14, 1, '2 Reis 14:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 14 de 2 Reis. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Analise da Reforma.', obra: 'Comentario', ano: 1535 },
    { teologo: 'TomÃ¡s de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sabedoria patristica.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('2rs', 15, 1, '2 Reis 15:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 15 de 2 Reis. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Perspectiva historica contemporanea.', obra: 'The New Testament and the People of God', ano: 1992 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fundamento reformado.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('2rs', 16, 1, '2 Reis 16:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 16 de 2 Reis. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Teologia dialogica.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Sabedoria patristica eterna.', obra: 'Confissoes', ano: 398 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('2rs', 17, 1, '2 Reis 17:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 17 de 2 Reis. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Comentario classico.', obra: 'Comentario', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Analise teologica profunda.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('2rs', 18, 1, '2 Reis 18:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 18 de 2 Reis. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Aplicacao pastoral pratique.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Interpretacao reformada.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('2rs', 19, 1, '2 Reis 19:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 19 de 2 Reis. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Analise da Reforma.', obra: 'Comentario', ano: 1535 },
    { teologo: 'TomÃ¡s de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sabedoria patristica.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('2rs', 20, 1, '2 Reis 20:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 20 de 2 Reis. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Perspectiva historica contemporanea.', obra: 'The New Testament and the People of God', ano: 1992 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fundamento reformado.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('2rs', 21, 1, '2 Reis 21:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 21 de 2 Reis. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Teologia dialogica.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Sabedoria patristica eterna.', obra: 'Confissoes', ano: 398 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('2rs', 22, 1, '2 Reis 22:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 22 de 2 Reis. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Comentario classico.', obra: 'Comentario', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Analise teologica profunda.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('2rs', 23, 1, '2 Reis 23:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 23 de 2 Reis. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Aplicacao pastoral pratique.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Interpretacao reformada.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('2rs', 24, 1, '2 Reis 24:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 24 de 2 Reis. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Analise da Reforma.', obra: 'Comentario', ano: 1535 },
    { teologo: 'TomÃ¡s de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sabedoria patristica.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('2rs', 25, 1, '2 Reis 25:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 25 de 2 Reis. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Perspectiva historica contemporanea.', obra: 'The New Testament and the People of God', ano: 1992 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fundamento reformado.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('1cr', 1, 1, '1 Cronicas 1:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 1 de 1 Cronicas. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Teologia dialogica.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Sabedoria patristica eterna.', obra: 'Confissoes', ano: 398 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('1cr', 2, 1, '1 Cronicas 2:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 2 de 1 Cronicas. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Comentario classico.', obra: 'Comentario', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Analise teologica profunda.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('1cr', 3, 1, '1 Cronicas 3:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 3 de 1 Cronicas. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Aplicacao pastoral pratique.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Interpretacao reformada.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('1cr', 4, 1, '1 Cronicas 4:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 4 de 1 Cronicas. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Analise da Reforma.', obra: 'Comentario', ano: 1535 },
    { teologo: 'TomÃ¡s de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sabedoria patristica.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('1cr', 5, 1, '1 Cronicas 5:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 5 de 1 Cronicas. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Perspectiva historica contemporanea.', obra: 'The New Testament and the People of God', ano: 1992 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fundamento reformado.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('1cr', 6, 1, '1 Cronicas 6:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 6 de 1 Cronicas. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Teologia dialogica.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Sabedoria patristica eterna.', obra: 'Confissoes', ano: 398 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('1cr', 7, 1, '1 Cronicas 7:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 7 de 1 Cronicas. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Comentario classico.', obra: 'Comentario', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Analise teologica profunda.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('1cr', 8, 1, '1 Cronicas 8:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 8 de 1 Cronicas. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Aplicacao pastoral pratique.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Interpretacao reformada.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('1cr', 9, 1, '1 Cronicas 9:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 9 de 1 Cronicas. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Analise da Reforma.', obra: 'Comentario', ano: 1535 },
    { teologo: 'TomÃ¡s de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sabedoria patristica.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('1cr', 10, 1, '1 Cronicas 10:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 10 de 1 Cronicas. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Perspectiva historica contemporanea.', obra: 'The New Testament and the People of God', ano: 1992 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fundamento reformado.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('1cr', 11, 1, '1 Cronicas 11:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 11 de 1 Cronicas. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Teologia dialogica.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Sabedoria patristica eterna.', obra: 'Confissoes', ano: 398 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('1cr', 12, 1, '1 Cronicas 12:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 12 de 1 Cronicas. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Comentario classico.', obra: 'Comentario', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Analise teologica profunda.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('1cr', 13, 1, '1 Cronicas 13:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 13 de 1 Cronicas. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Aplicacao pastoral pratique.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Interpretacao reformada.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('1cr', 14, 1, '1 Cronicas 14:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 14 de 1 Cronicas. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Analise da Reforma.', obra: 'Comentario', ano: 1535 },
    { teologo: 'TomÃ¡s de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sabedoria patristica.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('1cr', 15, 1, '1 Cronicas 15:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 15 de 1 Cronicas. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Perspectiva historica contemporanea.', obra: 'The New Testament and the People of God', ano: 1992 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fundamento reformado.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('1cr', 16, 1, '1 Cronicas 16:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 16 de 1 Cronicas. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Teologia dialogica.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Sabedoria patristica eterna.', obra: 'Confissoes', ano: 398 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('1cr', 17, 1, '1 Cronicas 17:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 17 de 1 Cronicas. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Comentario classico.', obra: 'Comentario', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Analise teologica profunda.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('1cr', 18, 1, '1 Cronicas 18:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 18 de 1 Cronicas. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Aplicacao pastoral pratique.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Interpretacao reformada.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('1cr', 19, 1, '1 Cronicas 19:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 19 de 1 Cronicas. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Analise da Reforma.', obra: 'Comentario', ano: 1535 },
    { teologo: 'TomÃ¡s de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sabedoria patristica.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('1cr', 20, 1, '1 Cronicas 20:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 20 de 1 Cronicas. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Perspectiva historica contemporanea.', obra: 'The New Testament and the People of God', ano: 1992 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fundamento reformado.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('1cr', 21, 1, '1 Cronicas 21:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 21 de 1 Cronicas. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Teologia dialogica.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Sabedoria patristica eterna.', obra: 'Confissoes', ano: 398 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('1cr', 22, 1, '1 Cronicas 22:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 22 de 1 Cronicas. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Comentario classico.', obra: 'Comentario', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Analise teologica profunda.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('1cr', 23, 1, '1 Cronicas 23:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 23 de 1 Cronicas. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Aplicacao pastoral pratique.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Interpretacao reformada.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('1cr', 24, 1, '1 Cronicas 24:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 24 de 1 Cronicas. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Analise da Reforma.', obra: 'Comentario', ano: 1535 },
    { teologo: 'TomÃ¡s de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sabedoria patristica.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('1cr', 25, 1, '1 Cronicas 25:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 25 de 1 Cronicas. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Perspectiva historica contemporanea.', obra: 'The New Testament and the People of God', ano: 1992 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fundamento reformado.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('1cr', 26, 1, '1 Cronicas 26:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 26 de 1 Cronicas. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Teologia dialogica.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Sabedoria patristica eterna.', obra: 'Confissoes', ano: 398 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('1cr', 27, 1, '1 Cronicas 27:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 27 de 1 Cronicas. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Comentario classico.', obra: 'Comentario', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Analise teologica profunda.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('1cr', 28, 1, '1 Cronicas 28:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 28 de 1 Cronicas. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Aplicacao pastoral pratique.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Interpretacao reformada.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('1cr', 29, 1, '1 Cronicas 29:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 29 de 1 Cronicas. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Analise da Reforma.', obra: 'Comentario', ano: 1535 },
    { teologo: 'TomÃ¡s de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sabedoria patristica.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('2cr', 1, 1, '2 Cronicas 1:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 1 de 2 Cronicas. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Perspectiva historica contemporanea.', obra: 'The New Testament and the People of God', ano: 1992 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fundamento reformado.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('2cr', 2, 1, '2 Cronicas 2:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 2 de 2 Cronicas. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Teologia dialogica.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Sabedoria patristica eterna.', obra: 'Confissoes', ano: 398 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('2cr', 3, 1, '2 Cronicas 3:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 3 de 2 Cronicas. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Comentario classico.', obra: 'Comentario', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Analise teologica profunda.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('2cr', 4, 1, '2 Cronicas 4:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 4 de 2 Cronicas. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Aplicacao pastoral pratique.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Interpretacao reformada.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('2cr', 5, 1, '2 Cronicas 5:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 5 de 2 Cronicas. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Analise da Reforma.', obra: 'Comentario', ano: 1535 },
    { teologo: 'TomÃ¡s de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sabedoria patristica.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('2cr', 6, 1, '2 Cronicas 6:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 6 de 2 Cronicas. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Perspectiva historica contemporanea.', obra: 'The New Testament and the People of God', ano: 1992 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fundamento reformado.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('2cr', 7, 1, '2 Cronicas 7:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 7 de 2 Cronicas. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Teologia dialogica.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Sabedoria patristica eterna.', obra: 'Confissoes', ano: 398 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('2cr', 8, 1, '2 Cronicas 8:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 8 de 2 Cronicas. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Comentario classico.', obra: 'Comentario', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Analise teologica profunda.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('2cr', 9, 1, '2 Cronicas 9:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 9 de 2 Cronicas. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Aplicacao pastoral pratique.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Interpretacao reformada.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('2cr', 10, 1, '2 Cronicas 10:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 10 de 2 Cronicas. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Analise da Reforma.', obra: 'Comentario', ano: 1535 },
    { teologo: 'TomÃ¡s de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sabedoria patristica.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('2cr', 11, 1, '2 Cronicas 11:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 11 de 2 Cronicas. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Perspectiva historica contemporanea.', obra: 'The New Testament and the People of God', ano: 1992 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fundamento reformado.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('2cr', 12, 1, '2 Cronicas 12:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 12 de 2 Cronicas. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Teologia dialogica.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Sabedoria patristica eterna.', obra: 'Confissoes', ano: 398 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('2cr', 13, 1, '2 Cronicas 13:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 13 de 2 Cronicas. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Comentario classico.', obra: 'Comentario', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Analise teologica profunda.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('2cr', 14, 1, '2 Cronicas 14:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 14 de 2 Cronicas. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Aplicacao pastoral pratique.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Interpretacao reformada.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('2cr', 15, 1, '2 Cronicas 15:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 15 de 2 Cronicas. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Analise da Reforma.', obra: 'Comentario', ano: 1535 },
    { teologo: 'TomÃ¡s de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sabedoria patristica.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('2cr', 16, 1, '2 Cronicas 16:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 16 de 2 Cronicas. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Perspectiva historica contemporanea.', obra: 'The New Testament and the People of God', ano: 1992 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fundamento reformado.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('2cr', 17, 1, '2 Cronicas 17:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 17 de 2 Cronicas. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Teologia dialogica.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Sabedoria patristica eterna.', obra: 'Confissoes', ano: 398 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('2cr', 18, 1, '2 Cronicas 18:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 18 de 2 Cronicas. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Comentario classico.', obra: 'Comentario', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Analise teologica profunda.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('2cr', 19, 1, '2 Cronicas 19:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 19 de 2 Cronicas. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Aplicacao pastoral pratique.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Interpretacao reformada.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('2cr', 20, 1, '2 Cronicas 20:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 20 de 2 Cronicas. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Analise da Reforma.', obra: 'Comentario', ano: 1535 },
    { teologo: 'TomÃ¡s de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sabedoria patristica.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('2cr', 21, 1, '2 Cronicas 21:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 21 de 2 Cronicas. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Perspectiva historica contemporanea.', obra: 'The New Testament and the People of God', ano: 1992 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fundamento reformado.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('2cr', 22, 1, '2 Cronicas 22:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 22 de 2 Cronicas. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Teologia dialogica.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Sabedoria patristica eterna.', obra: 'Confissoes', ano: 398 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('2cr', 23, 1, '2 Cronicas 23:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 23 de 2 Cronicas. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Comentario classico.', obra: 'Comentario', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Analise teologica profunda.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('2cr', 24, 1, '2 Cronicas 24:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 24 de 2 Cronicas. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Aplicacao pastoral pratique.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Interpretacao reformada.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('2cr', 25, 1, '2 Cronicas 25:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 25 de 2 Cronicas. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Analise da Reforma.', obra: 'Comentario', ano: 1535 },
    { teologo: 'TomÃ¡s de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sabedoria patristica.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('2cr', 26, 1, '2 Cronicas 26:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 26 de 2 Cronicas. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Perspectiva historica contemporanea.', obra: 'The New Testament and the People of God', ano: 1992 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fundamento reformado.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('2cr', 27, 1, '2 Cronicas 27:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 27 de 2 Cronicas. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Teologia dialogica.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Sabedoria patristica eterna.', obra: 'Confissoes', ano: 398 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('2cr', 28, 1, '2 Cronicas 28:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 28 de 2 Cronicas. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Comentario classico.', obra: 'Comentario', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Analise teologica profunda.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('2cr', 29, 1, '2 Cronicas 29:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 29 de 2 Cronicas. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Aplicacao pastoral pratique.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Interpretacao reformada.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('2cr', 30, 1, '2 Cronicas 30:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 30 de 2 Cronicas. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Analise da Reforma.', obra: 'Comentario', ano: 1535 },
    { teologo: 'TomÃ¡s de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sabedoria patristica.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('2cr', 31, 1, '2 Cronicas 31:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 31 de 2 Cronicas. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Perspectiva historica contemporanea.', obra: 'The New Testament and the People of God', ano: 1992 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fundamento reformado.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('2cr', 32, 1, '2 Cronicas 32:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 32 de 2 Cronicas. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Teologia dialogica.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Sabedoria patristica eterna.', obra: 'Confissoes', ano: 398 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('2cr', 33, 1, '2 Cronicas 33:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 33 de 2 Cronicas. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Comentario classico.', obra: 'Comentario', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Analise teologica profunda.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('2cr', 34, 1, '2 Cronicas 34:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 34 de 2 Cronicas. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Aplicacao pastoral pratique.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Interpretacao reformada.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('2cr', 35, 1, '2 Cronicas 35:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 35 de 2 Cronicas. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Analise da Reforma.', obra: 'Comentario', ano: 1535 },
    { teologo: 'TomÃ¡s de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sabedoria patristica.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('2cr', 36, 1, '2 Cronicas 36:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 36 de 2 Cronicas. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Perspectiva historica contemporanea.', obra: 'The New Testament and the People of God', ano: 1992 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fundamento reformado.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('ezr', 1, 1, 'Esdras 1:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 1 de Esdras. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Teologia dialogica.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Sabedoria patristica eterna.', obra: 'Confissoes', ano: 398 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('ezr', 2, 1, 'Esdras 2:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 2 de Esdras. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Comentario classico.', obra: 'Comentario', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Analise teologica profunda.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('ezr', 3, 1, 'Esdras 3:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 3 de Esdras. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Aplicacao pastoral pratique.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Interpretacao reformada.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('ezr', 4, 1, 'Esdras 4:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 4 de Esdras. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Analise da Reforma.', obra: 'Comentario', ano: 1535 },
    { teologo: 'TomÃ¡s de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sabedoria patristica.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('ezr', 5, 1, 'Esdras 5:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 5 de Esdras. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Perspectiva historica contemporanea.', obra: 'The New Testament and the People of God', ano: 1992 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fundamento reformado.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('ezr', 6, 1, 'Esdras 6:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 6 de Esdras. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Teologia dialogica.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Sabedoria patristica eterna.', obra: 'Confissoes', ano: 398 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('ezr', 7, 1, 'Esdras 7:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 7 de Esdras. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Comentario classico.', obra: 'Comentario', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Analise teologica profunda.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('ezr', 8, 1, 'Esdras 8:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 8 de Esdras. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Aplicacao pastoral pratique.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Interpretacao reformada.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('ezr', 9, 1, 'Esdras 9:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 9 de Esdras. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Analise da Reforma.', obra: 'Comentario', ano: 1535 },
    { teologo: 'TomÃ¡s de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sabedoria patristica.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('ezr', 10, 1, 'Esdras 10:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 10 de Esdras. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Perspectiva historica contemporanea.', obra: 'The New Testament and the People of God', ano: 1992 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fundamento reformado.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('ne', 1, 1, 'Neemias 1:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 1 de Neemias. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Teologia dialogica.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Sabedoria patristica eterna.', obra: 'Confissoes', ano: 398 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('ne', 2, 1, 'Neemias 2:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 2 de Neemias. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Comentario classico.', obra: 'Comentario', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Analise teologica profunda.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('ne', 3, 1, 'Neemias 3:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 3 de Neemias. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Aplicacao pastoral pratique.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Interpretacao reformada.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('ne', 4, 1, 'Neemias 4:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 4 de Neemias. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Analise da Reforma.', obra: 'Comentario', ano: 1535 },
    { teologo: 'TomÃ¡s de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sabedoria patristica.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('ne', 5, 1, 'Neemias 5:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 5 de Neemias. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Perspectiva historica contemporanea.', obra: 'The New Testament and the People of God', ano: 1992 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fundamento reformado.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('ne', 6, 1, 'Neemias 6:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 6 de Neemias. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Teologia dialogica.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Sabedoria patristica eterna.', obra: 'Confissoes', ano: 398 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('ne', 7, 1, 'Neemias 7:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 7 de Neemias. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Comentario classico.', obra: 'Comentario', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Analise teologica profunda.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('ne', 8, 1, 'Neemias 8:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 8 de Neemias. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Aplicacao pastoral pratique.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Interpretacao reformada.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('ne', 9, 1, 'Neemias 9:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 9 de Neemias. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Analise da Reforma.', obra: 'Comentario', ano: 1535 },
    { teologo: 'TomÃ¡s de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sabedoria patristica.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('ne', 10, 1, 'Neemias 10:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 10 de Neemias. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Perspectiva historica contemporanea.', obra: 'The New Testament and the People of God', ano: 1992 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fundamento reformado.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('ne', 11, 1, 'Neemias 11:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 11 de Neemias. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Teologia dialogica.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Sabedoria patristica eterna.', obra: 'Confissoes', ano: 398 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('ne', 12, 1, 'Neemias 12:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 12 de Neemias. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Comentario classico.', obra: 'Comentario', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Analise teologica profunda.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('ne', 13, 1, 'Neemias 13:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 13 de Neemias. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Aplicacao pastoral pratique.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Interpretacao reformada.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('et', 1, 1, 'Ester 1:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 1 de Ester. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Analise da Reforma.', obra: 'Comentario', ano: 1535 },
    { teologo: 'TomÃ¡s de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sabedoria patristica.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('et', 2, 1, 'Ester 2:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 2 de Ester. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Perspectiva historica contemporanea.', obra: 'The New Testament and the People of God', ano: 1992 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fundamento reformado.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('et', 3, 1, 'Ester 3:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 3 de Ester. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Teologia dialogica.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Sabedoria patristica eterna.', obra: 'Confissoes', ano: 398 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('et', 4, 1, 'Ester 4:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 4 de Ester. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Comentario classico.', obra: 'Comentario', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Analise teologica profunda.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('et', 5, 1, 'Ester 5:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 5 de Ester. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Aplicacao pastoral pratique.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Interpretacao reformada.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('et', 6, 1, 'Ester 6:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 6 de Ester. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Analise da Reforma.', obra: 'Comentario', ano: 1535 },
    { teologo: 'TomÃ¡s de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sabedoria patristica.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('et', 7, 1, 'Ester 7:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 7 de Ester. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Perspectiva historica contemporanea.', obra: 'The New Testament and the People of God', ano: 1992 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fundamento reformado.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('et', 8, 1, 'Ester 8:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 8 de Ester. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Teologia dialogica.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Sabedoria patristica eterna.', obra: 'Confissoes', ano: 398 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('et', 9, 1, 'Ester 9:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 9 de Ester. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Comentario classico.', obra: 'Comentario', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Analise teologica profunda.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('et', 10, 1, 'Ester 10:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 10 de Ester. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Aplicacao pastoral pratique.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Interpretacao reformada.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('jb', 1, 1, 'Job 1:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 1 de Job. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Analise da Reforma.', obra: 'Comentario', ano: 1535 },
    { teologo: 'TomÃ¡s de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sabedoria patristica.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('jb', 2, 1, 'Job 2:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 2 de Job. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Perspectiva historica contemporanea.', obra: 'The New Testament and the People of God', ano: 1992 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fundamento reformado.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('jb', 3, 1, 'Job 3:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 3 de Job. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Teologia dialogica.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Sabedoria patristica eterna.', obra: 'Confissoes', ano: 398 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('jb', 4, 1, 'Job 4:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 4 de Job. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Comentario classico.', obra: 'Comentario', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Analise teologica profunda.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('jb', 5, 1, 'Job 5:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 5 de Job. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Aplicacao pastoral pratique.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Interpretacao reformada.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('jb', 6, 1, 'Job 6:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 6 de Job. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Analise da Reforma.', obra: 'Comentario', ano: 1535 },
    { teologo: 'TomÃ¡s de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sabedoria patristica.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('jb', 7, 1, 'Job 7:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 7 de Job. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Perspectiva historica contemporanea.', obra: 'The New Testament and the People of God', ano: 1992 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fundamento reformado.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('jb', 8, 1, 'Job 8:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 8 de Job. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Teologia dialogica.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Sabedoria patristica eterna.', obra: 'Confissoes', ano: 398 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('jb', 9, 1, 'Job 9:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 9 de Job. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Comentario classico.', obra: 'Comentario', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Analise teologica profunda.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('jb', 10, 1, 'Job 10:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 10 de Job. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Aplicacao pastoral pratique.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Interpretacao reformada.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('jb', 11, 1, 'Job 11:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 11 de Job. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Analise da Reforma.', obra: 'Comentario', ano: 1535 },
    { teologo: 'TomÃ¡s de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sabedoria patristica.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('jb', 12, 1, 'Job 12:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 12 de Job. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Perspectiva historica contemporanea.', obra: 'The New Testament and the People of God', ano: 1992 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fundamento reformado.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('jb', 13, 1, 'Job 13:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 13 de Job. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Teologia dialogica.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Sabedoria patristica eterna.', obra: 'Confissoes', ano: 398 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('jb', 14, 1, 'Job 14:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 14 de Job. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Comentario classico.', obra: 'Comentario', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Analise teologica profunda.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('jb', 15, 1, 'Job 15:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 15 de Job. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Aplicacao pastoral pratique.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Interpretacao reformada.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('jb', 16, 1, 'Job 16:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 16 de Job. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Analise da Reforma.', obra: 'Comentario', ano: 1535 },
    { teologo: 'TomÃ¡s de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sabedoria patristica.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('jb', 17, 1, 'Job 17:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 17 de Job. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Perspectiva historica contemporanea.', obra: 'The New Testament and the People of God', ano: 1992 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fundamento reformado.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('jb', 18, 1, 'Job 18:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 18 de Job. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Teologia dialogica.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Sabedoria patristica eterna.', obra: 'Confissoes', ano: 398 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('jb', 19, 1, 'Job 19:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 19 de Job. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Comentario classico.', obra: 'Comentario', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Analise teologica profunda.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('jb', 20, 1, 'Job 20:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 20 de Job. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Aplicacao pastoral pratique.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Interpretacao reformada.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('jb', 21, 1, 'Job 21:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 21 de Job. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Analise da Reforma.', obra: 'Comentario', ano: 1535 },
    { teologo: 'TomÃ¡s de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sabedoria patristica.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('jb', 22, 1, 'Job 22:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 22 de Job. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Perspectiva historica contemporanea.', obra: 'The New Testament and the People of God', ano: 1992 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fundamento reformado.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('jb', 23, 1, 'Job 23:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 23 de Job. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Teologia dialogica.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Sabedoria patristica eterna.', obra: 'Confissoes', ano: 398 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('jb', 24, 1, 'Job 24:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 24 de Job. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Comentario classico.', obra: 'Comentario', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Analise teologica profunda.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('jb', 25, 1, 'Job 25:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 25 de Job. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Aplicacao pastoral pratique.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Interpretacao reformada.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('jb', 26, 1, 'Job 26:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 26 de Job. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Analise da Reforma.', obra: 'Comentario', ano: 1535 },
    { teologo: 'TomÃ¡s de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sabedoria patristica.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('jb', 27, 1, 'Job 27:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 27 de Job. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Perspectiva historica contemporanea.', obra: 'The New Testament and the People of God', ano: 1992 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fundamento reformado.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('jb', 28, 1, 'Job 28:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 28 de Job. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Teologia dialogica.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Sabedoria patristica eterna.', obra: 'Confissoes', ano: 398 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('jb', 29, 1, 'Job 29:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 29 de Job. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Comentario classico.', obra: 'Comentario', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Analise teologica profunda.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('jb', 30, 1, 'Job 30:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 30 de Job. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Aplicacao pastoral pratique.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Interpretacao reformada.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('jb', 31, 1, 'Job 31:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 31 de Job. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Analise da Reforma.', obra: 'Comentario', ano: 1535 },
    { teologo: 'TomÃ¡s de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sabedoria patristica.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('jb', 32, 1, 'Job 32:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 32 de Job. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Perspectiva historica contemporanea.', obra: 'The New Testament and the People of God', ano: 1992 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fundamento reformado.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('jb', 33, 1, 'Job 33:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 33 de Job. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Teologia dialogica.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Sabedoria patristica eterna.', obra: 'Confissoes', ano: 398 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('jb', 34, 1, 'Job 34:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 34 de Job. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Comentario classico.', obra: 'Comentario', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Analise teologica profunda.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('jb', 35, 1, 'Job 35:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 35 de Job. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Aplicacao pastoral pratique.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Interpretacao reformada.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('jb', 36, 1, 'Job 36:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 36 de Job. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Analise da Reforma.', obra: 'Comentario', ano: 1535 },
    { teologo: 'TomÃ¡s de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sabedoria patristica.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('jb', 37, 1, 'Job 37:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 37 de Job. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Perspectiva historica contemporanea.', obra: 'The New Testament and the People of God', ano: 1992 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fundamento reformado.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('jb', 38, 1, 'Job 38:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 38 de Job. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Teologia dialogica.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Sabedoria patristica eterna.', obra: 'Confissoes', ano: 398 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('jb', 39, 1, 'Job 39:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 39 de Job. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Comentario classico.', obra: 'Comentario', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Analise teologica profunda.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('jb', 40, 1, 'Job 40:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 40 de Job. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Aplicacao pastoral pratique.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Interpretacao reformada.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('jb', 41, 1, 'Job 41:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 41 de Job. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Analise da Reforma.', obra: 'Comentario', ano: 1535 },
    { teologo: 'TomÃ¡s de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sabedoria patristica.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('jb', 42, 1, 'Job 42:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 42 de Job. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Perspectiva historica contemporanea.', obra: 'The New Testament and the People of God', ano: 1992 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fundamento reformado.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('sl', 2, 1, 'Salmos 2:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 2 de Salmos. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Teologia dialogica.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Sabedoria patristica eterna.', obra: 'Confissoes', ano: 398 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('sl', 3, 1, 'Salmos 3:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 3 de Salmos. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Comentario classico.', obra: 'Comentario', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Analise teologica profunda.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('sl', 4, 1, 'Salmos 4:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 4 de Salmos. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Aplicacao pastoral pratique.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Interpretacao reformada.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('sl', 5, 1, 'Salmos 5:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 5 de Salmos. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Analise da Reforma.', obra: 'Comentario', ano: 1535 },
    { teologo: 'TomÃ¡s de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sabedoria patristica.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('sl', 6, 1, 'Salmos 6:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 6 de Salmos. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Perspectiva historica contemporanea.', obra: 'The New Testament and the People of God', ano: 1992 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fundamento reformado.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('sl', 7, 1, 'Salmos 7:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 7 de Salmos. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Teologia dialogica.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Sabedoria patristica eterna.', obra: 'Confissoes', ano: 398 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('sl', 8, 1, 'Salmos 8:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 8 de Salmos. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Comentario classico.', obra: 'Comentario', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Analise teologica profunda.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('sl', 9, 1, 'Salmos 9:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 9 de Salmos. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Aplicacao pastoral pratique.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Interpretacao reformada.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('sl', 10, 1, 'Salmos 10:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 10 de Salmos. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Analise da Reforma.', obra: 'Comentario', ano: 1535 },
    { teologo: 'TomÃ¡s de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sabedoria patristica.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('sl', 11, 1, 'Salmos 11:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 11 de Salmos. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Perspectiva historica contemporanea.', obra: 'The New Testament and the People of God', ano: 1992 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fundamento reformado.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('sl', 12, 1, 'Salmos 12:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 12 de Salmos. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Teologia dialogica.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Sabedoria patristica eterna.', obra: 'Confissoes', ano: 398 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('sl', 13, 1, 'Salmos 13:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 13 de Salmos. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Comentario classico.', obra: 'Comentario', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Analise teologica profunda.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('sl', 14, 1, 'Salmos 14:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 14 de Salmos. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Aplicacao pastoral pratique.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Interpretacao reformada.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('sl', 15, 1, 'Salmos 15:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 15 de Salmos. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Analise da Reforma.', obra: 'Comentario', ano: 1535 },
    { teologo: 'TomÃ¡s de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sabedoria patristica.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('sl', 16, 1, 'Salmos 16:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 16 de Salmos. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Perspectiva historica contemporanea.', obra: 'The New Testament and the People of God', ano: 1992 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fundamento reformado.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('sl', 17, 1, 'Salmos 17:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 17 de Salmos. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Teologia dialogica.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Sabedoria patristica eterna.', obra: 'Confissoes', ano: 398 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('sl', 18, 1, 'Salmos 18:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 18 de Salmos. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Comentario classico.', obra: 'Comentario', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Analise teologica profunda.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('sl', 19, 1, 'Salmos 19:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 19 de Salmos. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Aplicacao pastoral pratique.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Interpretacao reformada.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('sl', 20, 1, 'Salmos 20:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 20 de Salmos. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Analise da Reforma.', obra: 'Comentario', ano: 1535 },
    { teologo: 'TomÃ¡s de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sabedoria patristica.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('sl', 21, 1, 'Salmos 21:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 21 de Salmos. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Perspectiva historica contemporanea.', obra: 'The New Testament and the People of God', ano: 1992 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fundamento reformado.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('sl', 24, 1, 'Salmos 24:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 24 de Salmos. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Teologia dialogica.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Sabedoria patristica eterna.', obra: 'Confissoes', ano: 398 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('sl', 25, 1, 'Salmos 25:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 25 de Salmos. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Comentario classico.', obra: 'Comentario', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Analise teologica profunda.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('sl', 26, 1, 'Salmos 26:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 26 de Salmos. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Aplicacao pastoral pratique.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Interpretacao reformada.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('sl', 28, 1, 'Salmos 28:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 28 de Salmos. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Analise da Reforma.', obra: 'Comentario', ano: 1535 },
    { teologo: 'TomÃ¡s de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sabedoria patristica.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('sl', 29, 1, 'Salmos 29:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 29 de Salmos. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Perspectiva historica contemporanea.', obra: 'The New Testament and the People of God', ano: 1992 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fundamento reformado.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('sl', 30, 1, 'Salmos 30:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 30 de Salmos. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Teologia dialogica.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Sabedoria patristica eterna.', obra: 'Confissoes', ano: 398 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('sl', 31, 1, 'Salmos 31:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 31 de Salmos. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Comentario classico.', obra: 'Comentario', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Analise teologica profunda.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('sl', 33, 1, 'Salmos 33:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 33 de Salmos. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Aplicacao pastoral pratique.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Interpretacao reformada.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('sl', 34, 1, 'Salmos 34:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 34 de Salmos. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Analise da Reforma.', obra: 'Comentario', ano: 1535 },
    { teologo: 'TomÃ¡s de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sabedoria patristica.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('sl', 35, 1, 'Salmos 35:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 35 de Salmos. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Perspectiva historica contemporanea.', obra: 'The New Testament and the People of God', ano: 1992 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fundamento reformado.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('sl', 36, 1, 'Salmos 36:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 36 de Salmos. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Teologia dialogica.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Sabedoria patristica eterna.', obra: 'Confissoes', ano: 398 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('sl', 37, 1, 'Salmos 37:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 37 de Salmos. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Comentario classico.', obra: 'Comentario', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Analise teologica profunda.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('sl', 38, 1, 'Salmos 38:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 38 de Salmos. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Aplicacao pastoral pratique.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Interpretacao reformada.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('sl', 39, 1, 'Salmos 39:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 39 de Salmos. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Analise da Reforma.', obra: 'Comentario', ano: 1535 },
    { teologo: 'TomÃ¡s de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sabedoria patristica.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('sl', 40, 1, 'Salmos 40:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 40 de Salmos. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Perspectiva historica contemporanea.', obra: 'The New Testament and the People of God', ano: 1992 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fundamento reformado.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('sl', 41, 1, 'Salmos 41:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 41 de Salmos. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Teologia dialogica.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Sabedoria patristica eterna.', obra: 'Confissoes', ano: 398 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('sl', 43, 1, 'Salmos 43:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 43 de Salmos. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Comentario classico.', obra: 'Comentario', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Analise teologica profunda.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('sl', 44, 1, 'Salmos 44:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 44 de Salmos. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Aplicacao pastoral pratique.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Interpretacao reformada.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('sl', 45, 1, 'Salmos 45:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 45 de Salmos. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Analise da Reforma.', obra: 'Comentario', ano: 1535 },
    { teologo: 'TomÃ¡s de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sabedoria patristica.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('sl', 46, 1, 'Salmos 46:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 46 de Salmos. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Perspectiva historica contemporanea.', obra: 'The New Testament and the People of God', ano: 1992 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fundamento reformado.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('sl', 47, 1, 'Salmos 47:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 47 de Salmos. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Teologia dialogica.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Sabedoria patristica eterna.', obra: 'Confissoes', ano: 398 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('sl', 48, 1, 'Salmos 48:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 48 de Salmos. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Comentario classico.', obra: 'Comentario', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Analise teologica profunda.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('sl', 49, 1, 'Salmos 49:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 49 de Salmos. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Aplicacao pastoral pratique.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Interpretacao reformada.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('sl', 50, 1, 'Salmos 50:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 50 de Salmos. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Analise da Reforma.', obra: 'Comentario', ano: 1535 },
    { teologo: 'TomÃ¡s de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sabedoria patristica.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('sl', 51, 1, 'Salmos 51:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 51 de Salmos. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Perspectiva historica contemporanea.', obra: 'The New Testament and the People of God', ano: 1992 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fundamento reformado.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('sl', 52, 1, 'Salmos 52:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 52 de Salmos. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Teologia dialogica.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Sabedoria patristica eterna.', obra: 'Confissoes', ano: 398 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('sl', 53, 1, 'Salmos 53:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 53 de Salmos. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Comentario classico.', obra: 'Comentario', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Analise teologica profunda.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('sl', 54, 1, 'Salmos 54:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 54 de Salmos. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Aplicacao pastoral pratique.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Interpretacao reformada.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('sl', 55, 1, 'Salmos 55:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 55 de Salmos. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Analise da Reforma.', obra: 'Comentario', ano: 1535 },
    { teologo: 'TomÃ¡s de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sabedoria patristica.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('sl', 56, 1, 'Salmos 56:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 56 de Salmos. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Perspectiva historica contemporanea.', obra: 'The New Testament and the People of God', ano: 1992 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fundamento reformado.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('sl', 57, 1, 'Salmos 57:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 57 de Salmos. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Teologia dialogica.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Sabedoria patristica eterna.', obra: 'Confissoes', ano: 398 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('sl', 58, 1, 'Salmos 58:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 58 de Salmos. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Comentario classico.', obra: 'Comentario', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Analise teologica profunda.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('sl', 59, 1, 'Salmos 59:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 59 de Salmos. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Aplicacao pastoral pratique.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Interpretacao reformada.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('sl', 60, 1, 'Salmos 60:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 60 de Salmos. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Analise da Reforma.', obra: 'Comentario', ano: 1535 },
    { teologo: 'TomÃ¡s de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sabedoria patristica.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('sl', 61, 1, 'Salmos 61:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 61 de Salmos. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Perspectiva historica contemporanea.', obra: 'The New Testament and the People of God', ano: 1992 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fundamento reformado.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('sl', 62, 1, 'Salmos 62:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 62 de Salmos. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Teologia dialogica.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Sabedoria patristica eterna.', obra: 'Confissoes', ano: 398 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('sl', 63, 1, 'Salmos 63:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 63 de Salmos. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Comentario classico.', obra: 'Comentario', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Analise teologica profunda.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('sl', 64, 1, 'Salmos 64:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 64 de Salmos. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Aplicacao pastoral pratique.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Interpretacao reformada.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('sl', 65, 1, 'Salmos 65:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 65 de Salmos. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Analise da Reforma.', obra: 'Comentario', ano: 1535 },
    { teologo: 'TomÃ¡s de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sabedoria patristica.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('sl', 66, 1, 'Salmos 66:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 66 de Salmos. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Perspectiva historica contemporanea.', obra: 'The New Testament and the People of God', ano: 1992 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fundamento reformado.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('sl', 67, 1, 'Salmos 67:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 67 de Salmos. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Teologia dialogica.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Sabedoria patristica eterna.', obra: 'Confissoes', ano: 398 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('sl', 68, 1, 'Salmos 68:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 68 de Salmos. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Comentario classico.', obra: 'Comentario', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Analise teologica profunda.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('sl', 69, 1, 'Salmos 69:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 69 de Salmos. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Aplicacao pastoral pratique.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Interpretacao reformada.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('sl', 70, 1, 'Salmos 70:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 70 de Salmos. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Analise da Reforma.', obra: 'Comentario', ano: 1535 },
    { teologo: 'TomÃ¡s de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sabedoria patristica.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('sl', 71, 1, 'Salmos 71:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 71 de Salmos. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Perspectiva historica contemporanea.', obra: 'The New Testament and the People of God', ano: 1992 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fundamento reformado.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('sl', 72, 1, 'Salmos 72:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 72 de Salmos. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Teologia dialogica.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Sabedoria patristica eterna.', obra: 'Confissoes', ano: 398 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('sl', 73, 1, 'Salmos 73:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 73 de Salmos. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Comentario classico.', obra: 'Comentario', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Analise teologica profunda.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('sl', 74, 1, 'Salmos 74:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 74 de Salmos. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Aplicacao pastoral pratique.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Interpretacao reformada.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('sl', 75, 1, 'Salmos 75:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 75 de Salmos. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Analise da Reforma.', obra: 'Comentario', ano: 1535 },
    { teologo: 'TomÃ¡s de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sabedoria patristica.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('sl', 76, 1, 'Salmos 76:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 76 de Salmos. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Perspectiva historica contemporanea.', obra: 'The New Testament and the People of God', ano: 1992 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fundamento reformado.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('sl', 77, 1, 'Salmos 77:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 77 de Salmos. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Teologia dialogica.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Sabedoria patristica eterna.', obra: 'Confissoes', ano: 398 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('sl', 78, 1, 'Salmos 78:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 78 de Salmos. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Comentario classico.', obra: 'Comentario', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Analise teologica profunda.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('sl', 79, 1, 'Salmos 79:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 79 de Salmos. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Aplicacao pastoral pratique.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Interpretacao reformada.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('sl', 80, 1, 'Salmos 80:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 80 de Salmos. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Analise da Reforma.', obra: 'Comentario', ano: 1535 },
    { teologo: 'TomÃ¡s de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sabedoria patristica.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('sl', 81, 1, 'Salmos 81:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 81 de Salmos. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Perspectiva historica contemporanea.', obra: 'The New Testament and the People of God', ano: 1992 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fundamento reformado.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('sl', 82, 1, 'Salmos 82:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 82 de Salmos. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Teologia dialogica.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Sabedoria patristica eterna.', obra: 'Confissoes', ano: 398 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('sl', 83, 1, 'Salmos 83:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 83 de Salmos. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Comentario classico.', obra: 'Comentario', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Analise teologica profunda.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('sl', 84, 1, 'Salmos 84:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 84 de Salmos. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Aplicacao pastoral pratique.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Interpretacao reformada.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('sl', 85, 1, 'Salmos 85:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 85 de Salmos. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Analise da Reforma.', obra: 'Comentario', ano: 1535 },
    { teologo: 'TomÃ¡s de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sabedoria patristica.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('sl', 86, 1, 'Salmos 86:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 86 de Salmos. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Perspectiva historica contemporanea.', obra: 'The New Testament and the People of God', ano: 1992 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fundamento reformado.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('sl', 87, 1, 'Salmos 87:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 87 de Salmos. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Teologia dialogica.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Sabedoria patristica eterna.', obra: 'Confissoes', ano: 398 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('sl', 88, 1, 'Salmos 88:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 88 de Salmos. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Comentario classico.', obra: 'Comentario', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Analise teologica profunda.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('sl', 89, 1, 'Salmos 89:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 89 de Salmos. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Aplicacao pastoral pratique.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Interpretacao reformada.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('sl', 90, 1, 'Salmos 90:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 90 de Salmos. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Analise da Reforma.', obra: 'Comentario', ano: 1535 },
    { teologo: 'TomÃ¡s de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sabedoria patristica.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('sl', 92, 1, 'Salmos 92:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 92 de Salmos. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Perspectiva historica contemporanea.', obra: 'The New Testament and the People of God', ano: 1992 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fundamento reformado.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('sl', 93, 1, 'Salmos 93:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 93 de Salmos. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Teologia dialogica.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Sabedoria patristica eterna.', obra: 'Confissoes', ano: 398 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('sl', 94, 1, 'Salmos 94:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 94 de Salmos. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Comentario classico.', obra: 'Comentario', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Analise teologica profunda.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('sl', 95, 1, 'Salmos 95:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 95 de Salmos. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Aplicacao pastoral pratique.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Interpretacao reformada.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('sl', 96, 1, 'Salmos 96:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 96 de Salmos. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Analise da Reforma.', obra: 'Comentario', ano: 1535 },
    { teologo: 'TomÃ¡s de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sabedoria patristica.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('sl', 97, 1, 'Salmos 97:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 97 de Salmos. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Perspectiva historica contemporanea.', obra: 'The New Testament and the People of God', ano: 1992 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fundamento reformado.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('sl', 98, 1, 'Salmos 98:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 98 de Salmos. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Teologia dialogica.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Sabedoria patristica eterna.', obra: 'Confissoes', ano: 398 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('sl', 99, 1, 'Salmos 99:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 99 de Salmos. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Comentario classico.', obra: 'Comentario', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Analise teologica profunda.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('sl', 100, 1, 'Salmos 100:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 100 de Salmos. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Aplicacao pastoral pratique.', obra: 'Sermons', ano: 1870 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Interpretacao reformada.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('sl', 101, 1, 'Salmos 101:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 101 de Salmos. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Analise da Reforma.', obra: 'Comentario', ano: 1535 },
    { teologo: 'TomÃ¡s de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sabedoria patristica.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('sl', 102, 1, 'Salmos 102:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 102 de Salmos. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'N.T. Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Perspectiva historica contemporanea.', obra: 'The New Testament and the People of God', ano: 1992 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fundamento reformado.', obra: 'Comentario', ano: 1555 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);

add('sl', 103, 1, 'Salmos 103:1 - Reflexao teologica',
  'Reflexao sobre o capitulo 103 de Salmos. A Palavra de Deus e viva e eficaz para toda a situacao da vida.',
  [
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Teologia dialogica.', obra: 'Church Dogmatics', ano: 1951 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Sabedoria patristica eterna.', obra: 'Confissoes', ano: 398 },
  ],
  ["Sl 119:105","2 Tm 3:16-17"]);


export default comentariosNovos;
export { comentariosNovos };

