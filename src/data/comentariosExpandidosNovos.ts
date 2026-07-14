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





























































































































































































































































































































































































































































































































































































// ====================================================================
// SALMOS 23 - O SENHOR E MEU PASTOR
// ====================================================================

add('sl', 23, 1, 'O Senhor e meu Pastor',
  'Confissao de fe pessoal: Javhe, o Deus da alianca, assume o papel de Pastor de Israel. A imagem pastoril revela cuidado, lideranca e provisao divinal.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'O Pastor supremo nao pode falhar, nem ovelha alguma do Seu rebanho perecera.', obra: 'Tesouro de Salmos', ano: 1880 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'David celebra a providencia paternal de Deus que o conduz como Pastor.', obra: 'Comentario aos Salmos', ano: 1557 },
  ],
  ["Jo 10:11","Sl 80:1","Is 40:11","1 Pe 2:25"]);

add('sl', 23, 4, 'Ainda que eu ande pelo vale da sombra da morte',
  'A presenca divina transforma o vale mais escuro em via de consolo. O cajado e a vara sao instrumentos de defesa e correcao, nao de abandono.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'A morte perde seu aguiao quando o Pastor caminha conosco.', obra: 'Comentarios sobre os Salmos', ano: 1534 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'A sombra nao pode ferir; o cajado afasta todo mal.', obra: 'Tesouro de Salmos', ano: 1880 },
  ],
  ["1 Co 15:55-57","Sl 16:11","Hb 2:14-15"]);

add('sl', 23, 6, 'Habitarei na casa do Senhor para sempre',
  'A esperanca escatologica: a comunhao com Deus nao e temporaria. A bondade e a misericordia sao atributos divinos que perseguem o crente ate a morada eterna.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A casa do Senhor e a Sua Igreja e, por fim, o ceu.', obra: 'Comentario aos Salmos', ano: 1557 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'A eternidade com Deus e o descanso definitivo das ovelhas.', obra: 'Enarratio in Psalmum 23', ano: 415 },
  ],
  ["Ap 21:3-4","Sl 27:4","Jo 14:2-3"]);


// ====================================================================
// SALMOS 91 - DEBAIXO DAS ASAS DO ALTISSIMO
// ====================================================================

add('sl', 91, 1, 'Aquele que habita no esconderijo do Altissimo',
  'A imagem da ave que cobre os filhotes com suas asas evoca protecao intima. Habitar e permanencia, nao visita casual.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Quem habita no Altissimo nao se assusta com os males externos.', obra: 'Tesouro de Salmos', ano: 1880 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A protecao divina e certa para os que confiam.', obra: 'Comentario aos Salmos', ano: 1557 },
  ],
  ["Sl 17:8","Ru 2:12","Mt 23:37"]);

add('sl', 91, 4, 'Com suas penas te cobrira',
  'Asas divinas cobrem, defendem e protegem. A fidelidade de Deus e escudo e broquel inviolavel.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'As asas de Deus sao larga defesa contra todo mal.', obra: 'Tesouro de Salmos', ano: 1880 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'A providencia guarda os seus com ternura maternal.', obra: 'Catena Aurea', ano: 1260 },
  ],
  ["Ex 19:4","Dt 32:11","Sl 17:8"]);

add('sl', 91, 7, 'Mil cairao ao teu lado',
  'Os males atingem a humanidade, mas o protegido de Deus e preservado. O numero de quedas alheias nao afeta a seguranca do que confia.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A praga se aproxima mas nao toca o servo fiel.', obra: 'Comentario aos Salmos', ano: 1557 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Deus distingue entre o Seu povo e os impios.', obra: 'Tesouro de Salmos', ano: 1880 },
  ],
  ["Sl 121:7-8","2 Ts 3:3","Ap 9:4"]);

add('sl', 91, 11, 'Pois aos seus anjos dara ordens',
  'Os anjos sao ministros de Deus para guarda dos justos. A missao angelical e descrita por Cristo no Getsemani.',
  [
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Os anjos sao mensageiros e guardioes do povo de Deus.', obra: 'Suma Teologica I, q.113', ano: 1274 },
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Deus opera por anjos ou diretamente, segundo Sua vontade.', obra: 'Comentarios sobre os Salmos', ano: 1534 },
  ],
  ["Hb 1:14","Mt 4:6","At 12:7-8"]);


// ====================================================================
// SALMOS 121 - O AUXILIO VEM DO SENHOR
// ====================================================================

add('sl', 121, 1, 'Elevo os olhos para os montes',
  'O olhar de fe ultrapassa a paisagem natural. Os montes eram lugares de culto pagão e tambem de santuários do Senhor. O salmista busca a ajuda do Deus de Jaco.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Os olhos do corpo olham os montes; os da fe, o Criador.', obra: 'Comentario aos Salmos', ano: 1557 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Olhar para o alto e romper com o olhar terreno.', obra: 'Tesouro de Salmos', ano: 1880 },
  ],
  ["Sl 123:1","Is 40:26","Hb 12:2"]);

add('sl', 121, 4, 'Eis que nao tosquenejara nem dormira o Guarda de Israel',
  'Ao contrario dos guardas humanos, Deus vela sem cessar. O verbo hebraico "nao tosquenejara" (yashen) indica que Ele nao cochila.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A vigilancia divina e ininterrupta.', obra: 'Comentario aos Salmos', ano: 1557 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'A creatura dorme; o Criador, jamais.', obra: 'Tesouro de Salmos', ano: 1880 },
  ],
  ["1 Rs 18:27","Sl 127:1","Is 27:3"]);

add('sl', 121, 8, 'O Senhor guardara a tua saida e a tua entrada',
  'Protecao total da vida: do inicio ao fim, da juventude a velhice. Abrangencia da guarda divina sobre a existencia humana.',
  [
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Desde agora e para sempre, em todo tempo e lugar.', obra: 'Tesouro de Salmos', ano: 1880 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Quem guarda Israel guarda cada filho Seu.', obra: 'Enarratio in Psalmum 121', ano: 415 },
  ],
  ["Dt 28:6","Sl 139:3","Jo 10:28-29"]);


// ====================================================================
// SALMOS 139 - A ONISCIENCIA E A ONIPRESENCA DE DEUS
// ====================================================================

add('sl', 139, 1, 'Senhor, tu me sondas e me conheces',
  'O verbo hebraico "sondar" (chagar) sugere exame profundo, como minerar ouro. Deus conhece o crente de modo exhaustivo.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Conhecer e sondar envolve penetracao na intimidade humana.', obra: 'Comentario aos Salmos', ano: 1557 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Nenhum coracao engana a Deus, pois Ele o dissecou antes.', obra: 'Tesouro de Salmos', ano: 1880 },
  ],
  ["Hb 4:13","Ap 2:23","Sl 44:21"]);

add('sl', 139, 7, 'Para onde me ausentarei do teu espirito?',
  'A omnipresenca do Espirito Santo: a fuga de Jonas falhou. Em lugar nenhum o crente se esconde do olhar divino.',
  [
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Deus esta em toda parte; o coracao busca-O em si mesmo.', obra: 'Confissoes', ano: 398 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Deus esta em todas as coisas por essencia, presenca e potencia.', obra: 'Suma Teologica I, q.8', ano: 1274 },
  ],
  ["Jr 23:24","At 17:27-28","Jn 1:3"]);

add('sl', 139, 14, 'Eu te louvarei, porque de um modo assombroso e maravilhoso fui feito',
  'A creaturidade humana diante do Criador: somos obras-primas. O corpo, em sua complexidade, declara a gloria do Autor.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'O corpo humano e o mais excellente espelho da gloria divina.', obra: 'Comentario aos Salmos', ano: 1557 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'A formacao no ventre e o mais alto artesanato.', obra: 'Tesouro de Salmos', ano: 1880 },
  ],
  ["Sl 100:3","Jb 10:8-12","Ef 2:10"]);

add('sl', 139, 17, 'Quao preciosos me sao, o Deus, os teus pensamentos',
  'Os pensamentos de Deus sobre os Seus sao inumeraveis, abrangendo passado, presente e futuro.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Os decretos divinos sao inescrutaveis, mas sempre beneficos.', obra: 'Comentario aos Salmos', ano: 1557 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Mais numerosos que a areia; todos voltados para o bem dos filhos.', obra: 'Tesouro de Salmos', ano: 1880 },
  ],
  ["Is 55:8-9","Rm 11:33","Ef 1:4-5"]);

add('sl', 139, 23, 'Sonda-me, o Deus, e conhece o meu coracao',
  'A oracao do crente sincero: abrir-se ao escrutinio divino e desejar a purificacao. Humildade diante da onisciencia de Deus.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Orar para ser examinado e prova de consciencia integra.', obra: 'Comentario aos Salmos', ano: 1557 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Quem se oferece a Deus para ser provado nao teme a luz.', obra: 'Enarratio in Psalmum 139', ano: 415 },
  ],
  ["Sl 26:2","1 Cr 28:9","Ap 2:23"]);


// ====================================================================
// JOAO 3 - O NOVO NASCIMENTO
// ====================================================================

add('jo', 3, 3, 'E necessario nascer de novo',
  'Nicodemos, fariseu prudente, nao compreende o ensino sobrenatural. "De novo" (anothen) significa "do alto" — o novo nascimento e obra do Espirito, nao decisao humana.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'O novo nascimento e obra exclusiva do Espirito de Deus.', obra: 'Comentario ao Evangelho de Joao', ano: 1553 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Nascemos da carne para o tempo; do Espirito, para a eternidade.', obra: 'Tractatus in Joannis Evangelium', ano: 416 },
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'A regeneracao precede a fe; nao a produzimos por nossas forcas.', obra: 'Comentario a Joao', ano: 1537 },
  ],
  ["Jo 1:13","Tt 3:5","1 Pe 1:23"]);

add('jo', 3, 5, 'Nascido da agua e do Espirito',
  'A agua simboliza purificacao (batismo) e a obra renovadora do Espirito. O novo nascimento combina sinal e realidade.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Agua e Espirito: o sinal externo e a realidade interna.', obra: 'Comentario ao Evangelho de Joao', ano: 1553 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'A agua do bautismo e o Espirito regeneram.', obra: 'Tractatus in Joannis Evangelium', ano: 416 },
  ],
  ["At 2:38","Tt 3:5","Ef 5:26"]);

add('jo', 3, 8, 'O vento sopra onde quer',
  'O Espirito Santo e soberano em Sua obra, como o vento: invisivel, poderoso, livre. A regeneracao nao pode ser controlada ou forçada.',
  [
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'O Espirito age livremente; Sua obra e tao certa quanto imprevisivel.', obra: 'Tractatus in Joannis Evangelium', ano: 416 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A eficacia do Espirito e independente da cooperacao humana.', obra: 'Comentario ao Evangelho de Joao', ano: 1553 },
  ],
  ["1 Co 12:11","At 2:2-4","Jo 6:63"]);

add('jo', 3, 16, 'Porque Deus amou ao mundo de tal maneira',
  'O evangelho em uma frase: amor de Deus, entrega do Filho, vida eterna para os que creem. Universalidade da oferta; particularidade da fe.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'O amor de Deus nao e geral em abstrato; e especifico em Cristo.', obra: 'Comentario ao Evangelho de Joao', ano: 1553 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'O amor de Deus e a fonte de toda a salvacao.', obra: 'Sermoes', ano: 1865 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'O termo "mundo" mostra a suficiencia universal do sacrifício de Cristo.', obra: 'Catena Aurea', ano: 1260 },
  ],
  ["Rm 5:8","1 Jo 4:9-10","Ef 2:4-5"]);

add('jo', 3, 19, 'A luz veio ao mundo',
  'Cristo e a luz que escurece os que amam as trevas. O julgamento pela luz e etico, nao apenas ontologico.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A luz e Cristo, que revela o pecado e salva o crente.', obra: 'Comentario ao Evangelho de Joao', ano: 1553 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'A luz e a Palavra que nos convoca a fe.', obra: 'Tractatus in Joannis Evangelium', ano: 416 },
  ],
  ["Jo 1:4-9","Jo 8:12","Ef 5:8"]);


// ====================================================================
// JOAO 14 - A MORADA DO PAI
// ====================================================================

add('jo', 14, 1, 'Não se turbe o vosso coração',
  'Palavras de despedida: Jesus tranquiliza os discipulos. A fé em Deus se estende à fé em Cristo, fundamento do coracao tranquilo.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A paz do coracao vem da confiança em Deus, nao das circunstancias.', obra: 'Comentario ao Evangelho de Joao', ano: 1553 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'A fé e a ancora contra a tempestade da alma.', obra: 'Sermoes', ano: 1865 },
  ],
  ["Jo 16:33","Fp 4:6-7","Is 26:3"]);

add('jo', 14, 3, 'Vou preparar-vos lugar',
  'A ascensao de Cristo e a garantia de morada celestial. O trabalho sacerdotal de Cristo no ceu inclui a preparacao de lugar para os salvos.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Cristo intercede por nos enquanto prepara a heranca.', obra: 'Comentario ao Evangelho de Joao', ano: 1553 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Cristo, como Sumo Sacerdote, nos precede na gloria.', obra: 'Suma Teologica III, q.57', ano: 1274 },
  ],
  ["Hb 6:19-20","2 Co 5:1","Jo 17:24"]);

add('jo', 14, 6, 'Eu sou o caminho, a verdade e a vida',
  'Cristo nao aponta o caminho; Ele e o caminho. Exclusividade mediadora: nenhum outro acesso ao Pai.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Cristo e o unico mediador entre Deus e os homens.', obra: 'Comentario ao Evangelho de Joao', ano: 1553 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Fora de Cristo nao ha verdade que salve.', obra: 'Tractatus in Joannis Evangelium', ano: 416 },
  ],
  ["At 4:12","1 Tm 2:5","Hb 10:19-20"]);

add('jo', 14, 9, 'Quem me viu a mim viu o Pai',
  'A plena revelacao do Pai no Filho. Cristo e o icone exato do Deus invisivel; nEle o invisivel se torna visivel.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'O Filho e o espelho vivo do Pai.', obra: 'Comentario ao Evangelho de Joao', ano: 1553 },
    { teologo: 'Atanasio', periodo: 'patristico', tradicao: 'catolica', texto: 'O Filho e a imagem exata da substancia do Pai.', obra: 'Contra Arianos', ano: 360 },
  ],
  ["Cl 1:15","Hb 1:3","Jo 1:18"]);

add('jo', 14, 27, 'A minha paz vos dou',
  'A paz de Cristo e distinta da do mundo: nao e ausencia de conflito, mas presença do Principe da Paz. Legado antes da cruz.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A paz do mundo e fragil; a de Cristo e eterna.', obra: 'Comentario ao Evangelho de Joao', ano: 1553 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'A paz de Cristo acalma o mar revolto da consciencia.', obra: 'Sermoes', ano: 1865 },
  ],
  ["Fp 4:7","Cl 3:15","Rm 5:1"]);


// ====================================================================
// JOAO 15 - A VIDEIRA VERDADEIRA
// ====================================================================

add('jo', 15, 1, 'Eu sou a videira verdadeira',
  'Metafora agricola da união vital com Cristo. A videira produz fruto somente nos ramos que permanecem nela.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A videira e Cristo; a seiva e o Espirito; os ramos, os crentes.', obra: 'Comentario ao Evangelho de Joao', ano: 1553 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Fora da videira nao ha fruto, apenas folhas e gloria va.', obra: 'Tractatus in Joannis Evangelium', ano: 416 },
  ],
  ["Jo 1:1","Is 5:1-7","Sl 80:8-15"]);

add('jo', 15, 4, 'Permanecei em mim',
  'O "permanecer" (meno) e a palavra-chave: comunhao continua, nao evento pontual. Sem permanencia nao ha fruto.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A permanencia e obra de Deus em nos, pela fe.', obra: 'Comentario ao Evangelho de Joao', ano: 1553 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Permanecer e respirar a atmosfera de Cristo.', obra: 'Sermoes', ano: 1865 },
  ],
  ["1 Jo 2:28","Cl 1:23","Jo 8:31"]);

add('jo', 15, 5, 'Sem mim nada podeis fazer',
  'A absoluta dependencia do crente em Cristo. Toda obra spiritual relevante flui da união com Ele, nao do esforço autonomo.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A suficiencia do crente vem de Cristo, nao de si mesmo.', obra: 'Comentario ao Evangelho de Joao', ano: 1553 },
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Sola fide, mas a fe vem de Cristo, nao da nossa vontade.', obra: 'Comentario a Joao', ano: 1537 },
  ],
  ["2 Co 3:5","Fp 4:13","Jo 9:33"]);

add('jo', 15, 8, 'Nisto e glorificado meu Pai',
  'O fruto abundante evidencia a autenticidade da fe e glorifica ao Pai. Discipulado visivel produz gloria visivel a Deus.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'O fruto e a prova da eleição.', obra: 'Comentario ao Evangelho de Joao', ano: 1553 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Muito fruto e o alvo da videira; esterilidade, sua vergonha.', obra: 'Sermoes', ano: 1865 },
  ],
  ["Mt 5:16","Gl 5:22-23","Fp 1:11"]);

add('jo', 15, 13, 'Maior amor tem ninguem do que aquele que da a sua vida',
  'O amor crístico supremo: entrega voluntaria. A cruz e a medida maxima do amor divino e o padrao para o discipulo.',
  [
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'O amor que da a vida e o amor de Cristo e do martir.', obra: 'Tractatus in Joannis Evangelium', ano: 416 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'O amor de Cristo e o prototipo de todo amor cristão.', obra: 'Comentario ao Evangelho de Joao', ano: 1553 },
  ],
  ["1 Jo 3:16","Rm 5:6-8","Ef 5:2"]);


// ====================================================================
// JOAO 17 - A ORAÇAO SACERDOTAL
// ====================================================================

add('jo', 17, 1, 'Pai, e chegada a hora',
  'A hora da glorificacao pela cruz. Jesus ora ao Pai com intimidade filial antes de entrar no Getsemani e no Calvario.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A cruz e a suprema glorificacao do Filho.', obra: 'Comentario ao Evangelho de Joao', ano: 1553 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'A hora e o cumprimento da missao redentora.', obra: 'Catena Aurea', ano: 1260 },
  ],
  ["Jo 12:23","Jo 13:31-32","Fp 2:6-8"]);

add('jo', 17, 3, 'A vida eterna e conhecer-te',
  'A definição da vida eterna nao e mera imortalidade, mas conhecimento pessoal do Deus verdadeiro e de Cristo.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Conhecer a Deus e a vida da alma; ignora-Lo e morte.', obra: 'Comentario ao Evangelho de Joao', ano: 1553 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'A vida eterna comeca na fe e se consuma na visao.', obra: 'Tractatus in Joannis Evangelium', ano: 416 },
  ],
  ["Jo 14:6","1 Jo 5:20","Sl 16:11"]);

add('jo', 17, 17, 'Santifica-os na verdade',
  'A santificação vem pela Palavra, que e verdade. A oração sacerdotal consagra os discípulos para a missão.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A Palavra de verdade e o instrumento da santificacao.', obra: 'Comentario ao Evangelho de Joao', ano: 1553 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'A verdade separa o crente do mundo.', obra: 'Sermoes', ano: 1865 },
  ],
  ["Ef 5:26","2 Ts 2:13","Jo 15:3"]);

add('jo', 17, 20, 'Nao rogo somente por estes',
  'A oração de Cristo abrange todos os que crerão pela Palavra dos apóstolos — universalidade da mediação intercessora.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Cristo intercede por todos os eleitos em todos os tempos.', obra: 'Comentario ao Evangelho de Joao', ano: 1553 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'A oração de Cristo e sempiternamente eficaz.', obra: 'Suma Teologica III, q.21', ano: 1274 },
  ],
  ["Hb 7:25","Rm 8:34","1 Jo 2:1"]);

add('jo', 17, 24, 'Pai, aqueles que me deste, quero que onde eu estou estejam comigo',
  'O desejo eterno de Cristo: a comunhão com o Pai inclui a comunhão dos salvos com Cristo. A consumação da graça.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A glória de Cristo e partilhada com os eleitos.', obra: 'Comentario ao Evangelho de Joao', ano: 1553 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'A visão de Deus face a face e a beatitude final.', obra: 'Tractatus in Joannis Evangelium', ano: 416 },
  ],
  ["2 Co 3:18","1 Jo 3:2","Ap 22:3-4"]);


// ====================================================================
// ROMANOS 8 - A VIDA SEGUNDO O ESPIRITO
// ====================================================================

add('rm', 8, 1, 'Nenhuma condenacao ha para os que estao em Cristo Jesus',
  'A declaração culminante da justificação: o crente justificado está livre da condenação eterna. Em Cristo, o veredito já foi dado.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A justificação em Cristo elimina a condenacao eterna.', obra: 'Comentario a Romanos', ano: 1540 },
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Justificado pela fé tem paz com Deus; nenhuma condenacao pesa sobre ele.', obra: 'Comentario a Romanos', ano: 1515 },
  ],
  ["Rm 5:1","Jo 5:24","Rm 8:33-34"]);

add('rm', 8, 11, 'O mesmo que ressuscitou a Cristo Jesus dentre os mortos',
  'A garantia da ressurreição do crente: o mesmo poder que ressuscitou Cristo vive em nós pelo Espírito. A pneumatologia sustenta a escatologia.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'O Espírito que habitou Cristo em Sua morte opera em nós para a vida.', obra: 'Comentario a Romanos', ano: 1540 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'A ressurreição de Cristo e causa eficiente da nossa.', obra: 'Suma Teologica III, q.56', ano: 1274 },
  ],
  ["1 Co 6:14","2 Co 4:14","Ef 1:19-20"]);

add('rm', 8, 15, 'Recebestes o espirito de adoção',
  'O Espírito Santo não é servo do medo, mas testemunha da filiação. O "Abba" é a intimidade do filho com o Pai.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'O Espírito clama em nós, Aba Pai, e selo nossa adoção.', obra: 'Comentario a Romanos', ano: 1540 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'O grito "Aba" revela o filho a si mesmo.', obra: 'Sermoes', ano: 1865 },
  ],
  ["Gl 4:6","1 Jo 3:1","Ef 1:5"]);

add('rm', 8, 28, 'Todas as coisas cooperam para o bem daqueles que amam a Deus',
  'A providência cooperante: mesmo o mal serve ao bem dos eleitos. O "todas as coisas" inclui sofrimentos e decepções.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A providência converte o mal aparente em bem real.', obra: 'Comentario a Romanos', ano: 1540 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'As aflições virão, mas todas elas trabalham juntas para o bem.', obra: 'Sermoes', ano: 1865 },
  ],
  ["Gn 50:20","Ef 1:11","Hb 12:6-11"]);

add('rm', 8, 31, 'Se Deus e por nos, quem sera contra nos?',
  'A lógica da graça: se o Pai entregou o Filho, não nos negará nada. Triunfo retórico que conduz à segurança eterna.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Se Deus nos justifica, ninguém pode nos condenar.', obra: 'Comentario a Romanos', ano: 1540 },
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'A pergunta retórica de Paulo e a segurança do crente.', obra: 'Comentario a Romanos', ano: 1515 },
  ],
  ["Rm 8:35-39","Sl 118:6","Hb 13:6"]);

add('rm', 8, 38, 'Nem a morte, nem a vida',
  'Nada pode separar o crente do amor de Deus em Cristo. A enumeração de males visa aquilatar a indestrutibilidade da salvação.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A salvação é eterna porque fundamentada no amor imutável.', obra: 'Comentario a Romanos', ano: 1540 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Nem a própria morte pode romper o vínculo de amor.', obra: 'Sermoes', ano: 1865 },
  ],
  ["Jo 10:28-29","Rm 8:35-37","1 Pe 1:5"]);


// ====================================================================
// EFESIOS 2 - SALVOS PELA GRACA
// ====================================================================

add('ef', 2, 1, 'Estaveis mortos em vossos delitos e pecados',
  'O diagnóstico espiritual: a humanidade sem Cristo é cadáver espiritual. A morte moral precede a morte física.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'O pecado não apenas feriu, mas matou a alma.', obra: 'Comentario a Efesios', ano: 1548 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Morto pelo pecado, o homem não pode por si mesmo ressuscitar.', obra: 'Enarratio in Psalmum 102', ano: 415 },
  ],
  ["Cl 2:13","Ef 4:18","Rm 5:12"]);

add('ef', 2, 4, 'Mas Deus, sendo rico em misericordia',
  'O contraste: do "mas Deus" brota a esperança. A misericórdia é a compaixão eficaz de Deus para com o morto espiritual.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A misericórdia precede a vida; Deus nos vivificou quando mortos.', obra: 'Comentario a Efesios', ano: 1548 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'O "mas Deus" é o ponto de virada da história humana.', obra: 'Sermoes', ano: 1865 },
  ],
  ["Ef 2:1-3","Tt 3:5","1 Pe 1:3"]);

add('ef', 2, 8, 'Pela graça sois salvos, mediante a fé',
  'A declaração axial da soteriologia paulina: a salvação é pela graça (causa eficiente) e recebida pela fé (instrumento humano).',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'A fé é a mão que recebe; a graça é o dom dado.', obra: 'Comentario a Efesios', ano: 1522 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A salvação exclui toda glória humana; a fé vem também de Deus.', obra: 'Comentario a Efesios', ano: 1548 },
  ],
  ["Rm 3:24-25","Ef 2:9-10","Tt 2:11"]);

add('ef', 2, 10, 'Somos feitura de Deus, criados em Cristo Jesus',
  'A nova criação: o salvo é obra de Deus, criada para boas obras. As boas obras são fruto, não causa da salvação.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A regeneração nos torna novas criaturas; as obras são evidências.', obra: 'Comentario a Efesios', ano: 1548 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Somos criados em Cristo para as obras que Deus preparou.', obra: 'Suma Teologica I-II, q.109', ano: 1274 },
  ],
  ["2 Co 5:17","Gl 6:15","Ef 4:24"]);

add('ef', 2, 19, 'Ja nao sois estrangeiros, mas concidados dos santos',
  'A nova identidade em Cristo: judeus e gentios formam um só povo. A parede de hostilidade foi derrubada pela cruz.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Cristo derrubou a separação entre judeus e gentios.', obra: 'Comentario a Efesios', ano: 1548 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'A Igreja é a cidade de Deus, construída sobre Cristo.', obra: 'De Civitate Dei', ano: 426 },
  ],
  ["Ef 2:14","Gl 3:28","1 Pe 2:9-10"]);


// ====================================================================
// EFESIOS 6 - A ARMADURA DE DEUS
// ====================================================================

add('ef', 6, 10, 'Fortalecei-vos no Senhor',
  'A batalha espiritual exige força que vem do Senhor. O crente é chamado a vestir a armadura divina, não a confiar na própria força.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A fortaleza do crente vem do Senhor, não de si mesmo.', obra: 'Comentario a Efesios', ano: 1548 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Sem a força do Senhor, o soldado cristão é presa fácil.', obra: 'Sermoes', ano: 1865 },
  ],
  ["Ef 6:11-12","2 Co 10:4","Fp 4:13"]);

add('ef', 6, 11, 'Revesti-vos da armadura de Deus',
  'Imagem militar: o crente está em guerra cósmica. Cada peça da armadura corresponde a uma verdade espiritual.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A armadura é a verdade de Deus, não símbolos humanos.', obra: 'Comentario a Efesios', ano: 1548 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'As armas do cristão são espirituais e eficazes.', obra: 'Suma Teologica I-II, q.108', ano: 1274 },
  ],
  ["Rm 13:12","2 Co 10:4","1 Ts 5:8"]);

add('ef', 6, 12, 'Nossa luta não e contra carne e sangue',
  'O adversário é espiritual: principados, potestades, forças do mal. A batalha é cósmica e invisível, mas real.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Os demônios são inimigos reais, ainda que invisíveis.', obra: 'Comentario a Efesios', ano: 1548 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'A luta invisível exige armas espirituais.', obra: 'Enarratio in Psalmum 90', ano: 415 },
  ],
  ["Cl 2:15","Dn 10:13","Ap 12:7-9"]);

add('ef', 6, 14, 'Cingidos com a verdade',
  'A primeira peça: a verdade. Viver na verdade é o cinto que sustenta a armadura. Sem integridade, a batalha é perdida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A verdade é o fundamento da integridade cristã.', obra: 'Comentario a Efesios', ano: 1548 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'A verdade cinge o guerreiro de Cristo.', obra: 'Sermoes', ano: 1865 },
  ],
  ["Jo 8:32","2 Jo 1:4","3 Jo 1:4"]);

add('ef', 6, 17, 'Tomai o capacete da salvação e a espada do Espirito',
  'A única arma ofensiva: a Palavra de Deus. O crente vence pela Escritura, como Cristo venceu no deserto.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A Palavra de Deus é a espada do crente, como do próprio Cristo.', obra: 'Comentario a Efesios', ano: 1548 },
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'A Palavra é a arma que vence o diabo e a dúvida.', obra: 'Comentario a Efesios', ano: 1522 },
  ],
  ["Hb 4:12","Mt 4:4","Ap 19:15"]);

add('ef', 6, 18, 'Orando em todo tempo',
  'A oração é o clima da batalha. Sem oração constante, a armadura é inerte. A oração é o respirar do guerreiro.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A oração é o canal pelo qual Deus nos revigora na luta.', obra: 'Comentario a Efesios', ano: 1548 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'A oração é o suspiro da alma em guerra.', obra: 'Sermoes', ano: 1865 },
  ],
  ["Cl 4:2","1 Ts 5:17","Rm 12:12"]);


// ====================================================================
// TIAGO - FE E OBRAS
// ====================================================================

add('tg', 1, 2, 'Tende por grande alegria, meus irmãos, quando cairdes em diversas provações',
  'As provações não são motivos de lamento, mas de regozijo, porque produzem maturidade. A fé testada é fé fortalecida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'As provações são o crivo da fé genuína.', obra: 'Comentario a Tiago', ano: 1551 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Alegria na prova é a marca do cristão maduro.', obra: 'Sermoes', ano: 1865 },
  ],
  ["Rm 5:3-4","1 Pe 1:6-7","Hb 12:11"]);

add('tg', 1, 5, 'Se algum de vós tem falta de sabedoria, peça-a a Deus',
  'A oração pela sabedoria é promessa garantida. Deus dá liberalmente e não censura quem busca entendimento.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A sabedoria prática vem de Deus, não da experiência humana.', obra: 'Comentario a Tiago', ano: 1551 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'A sabedoria é dom do Espírito e deve ser pedida com fé.', obra: 'Suma Teologica II-II, q.45', ano: 1274 },
  ],
  ["Pv 2:3-6","1 Rs 3:5-14","Cl 1:9"]);

add('tg', 1, 12, 'Bem-aventurado o homem que suporta a provação',
  'A bem-aventurança do provado: a coroa da vida aguarda os que permanecem fiéis. A prova é o vestibulo da glória.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A coroa da vida é dada por Deus aos que perseveram na fé.', obra: 'Comentario a Tiago', ano: 1551 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'A provação é a forja onde a coroa é moldada.', obra: 'Sermoes', ano: 1865 },
  ],
  ["Ap 2:10","2 Tm 4:8","1 Pe 5:4"]);

add('tg', 1, 19, 'Todo homem seja pronto para ouvir, tardio para falar',
  'A regra do silêncio: ouvir muito, falar pouco, dominar a ira. A prudência cristã começa nos ouvidos.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A paciência para ouvir é o fundamento da sabedoria.', obra: 'Comentario a Tiago', ano: 1551 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'A língua, descontrolada, gera males; bem governada, vida.', obra: 'Suma Teologica II-II, q.161', ano: 1274 },
  ],
  ["Pv 18:13","Ec 5:2","Tg 3:1-12"]);

add('tg', 1, 22, 'Sede praticantes da palavra e não somente ouvintes',
  'A fé sem obras é morta. A audição da Palavra exige obediência: o Espelho da Palavra revela e exige transformação.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'A fé viva se expressa em obras vivas.', obra: 'Comentario a Tiago', ano: 1530 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'O ouvinte sem prática engana a si mesmo.', obra: 'Comentario a Tiago', ano: 1551 },
  ],
  ["Tg 2:26","Mt 7:24-27","Jo 13:17"]);

add('tg', 1, 27, 'Religião pura e sem mácula diante de nosso Deus',
  'A definição prática da religião: visitar órfãos e viúvas, guardar-se do mundo. A piedade se prova na caridade.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A verdadeira piedade se mostra em misericórdia e pureza.', obra: 'Comentario a Tiago', ano: 1551 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'A religião autêntica une fé e obras de misericórdia.', obra: 'Suma Teologica II-II, q.188', ano: 1274 },
  ],
  ["Mt 25:35-40","1 Jo 3:17-18","Is 1:17"]);

add('tg', 2, 14, 'Que aproveita, meus irmãos, se alguém diz que tem fé, e não tem obras?',
  'A pergunta retórica: a fé professada sem obras é vazia. Tiago não contradiz Paulo, mas complementa: a fé que salva é a fé que age.',
  [
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'A fé justifica, mas só a fé viva que produz obras.', obra: 'Comentario a Tiago', ano: 1530 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'As obras são os frutos necessários da fé.', obra: 'Comentario a Tiago', ano: 1551 },
  ],
  ["Gl 5:6","Ef 2:10","Tg 2:26"]);

add('tg', 2, 17, 'A fé, se não tiver obras, é morta em si mesma',
  'A metáfora é forte: fé sem obras é cadáver. Não há fé genuína sem manifestação prática de amor.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A fé existe quando produz frutos de obediência.', obra: 'Comentario a Tiago', ano: 1551 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'A fé morta é a heresia dos dias de Tiago, ainda viva hoje.', obra: 'Sermoes', ano: 1865 },
  ],
  ["Gl 5:22","Tt 2:14","Mt 7:16"]);

add('tg', 2, 24, 'O homem é justificado pelas obras, e não somente pela fé',
  'A aparente tensão com Paulo se resolve: Tiago fala da justificação diante dos homens (pelas obras), Paulo da justificação diante de Deus (pela fé).',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'As obras justificam diante dos homens, demonstrando a fé.', obra: 'Comentario a Tiago', ano: 1551 },
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Justificados pela fé, mas a fé justifica porque produz obras.', obra: 'Comentario a Tiago', ano: 1530 },
  ],
  ["Rm 4:1-5","Gl 2:16","Mt 25:31-46"]);

add('tg', 2, 26, 'O corpo sem o espirito está morto',
  'A analogia: fé e obras são como corpo e espírito. A fé separada das obras é cadáver. As obras dão vida à fé.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A fé vive quando se manifesta em obras.', obra: 'Comentario a Tiago', ano: 1551 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'A fé forma é morta; a fé viva inclui caridade.', obra: 'Suma Teologica II-II, q.4', ano: 1274 },
  ],
  ["1 Co 13:2","Gl 5:6","Cl 1:10"]);

add('tg', 3, 1, 'Não muitos de vós vos torneis mestres',
  'O aviso aos mestres: maior conhecimento traz maior responsabilidade. O ensino na Igreja exige preparo e temor.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'O mestre carrega peso enorme; a língua dos mestres fere muitos.', obra: 'Comentario a Tiago', ano: 1551 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'A doutrina exige prudência, pois o erro conduz almas.', obra: 'Suma Teologica II-II, q.188', ano: 1274 },
  ],
  ["Hb 13:17","1 Tm 5:17","Mt 23:1-4"]);

add('tg', 3, 5, 'A língua é um pequeno membro e se gaba de grandes coisas',
  'A imagem do freio e do fogo: a língua é pequena, mas seu poder é imenso. O cuidado com as palavras é vital.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A língua é o maior instrumento do bem e do mal.', obra: 'Comentario a Tiago', ano: 1551 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'A pequena língua é o maior perigo do cristão.', obra: 'Sermoes', ano: 1865 },
  ],
  ["Pv 18:21","Mt 12:36","Sl 39:1"]);

add('tg', 3, 6, 'A língua é um fogo',
  'O poder destruidor das palavras: a língua é fogo que incendeia a existência. Instrumento de bênção ou de maldição.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A língua mundana é inflamada pelo inferno.', obra: 'Comentario a Tiago', ano: 1551 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'A língua inflamada pelo orgulho é o início do pecado.', obra: 'Suma Teologica II-II, q.158', ano: 1274 },
  ],
  ["Pv 16:27","Mt 15:11","Mc 7:20-23"]);

add('tg', 3, 17, 'A sabedoria que vem do alto é, primeiramente, pura',
  'A marca da sabedoria divina: pureza, paz, misericórdia. Contrasta com a terrena, que é invejosa e egoísta.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A sabedoria celestial é caracterizada pela mansidão e misericórdia.', obra: 'Comentario a Tiago', ano: 1551 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'A sabedoria do alto é dom do Espírito Santo.', obra: 'Suma Teologica II-II, q.45', ano: 1274 },
  ],
  ["1 Co 2:6-7","Cl 3:15","Fp 4:8"]);

add('tg', 4, 1, 'De onde vêm as guerras e contendas entre vós?',
  'A raiz dos conflitos: desejos internos que não são controlados. A guerra nasce no coração antes de explodir em ações.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'As contendas provêm dos desejos desordenados do coração.', obra: 'Comentario a Tiago', ano: 1551 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'A cobiça desordenada é a raiz de toda contenda.', obra: 'De Civitate Dei', ano: 426 },
  ],
  ["Rm 7:23","1 Pe 2:11","Gl 5:17"]);

add('tg', 4, 4, 'A amizade do mundo é inimizade contra Deus',
  'A advertência radical: amar o mundo é estar contra Deus. Não há neutralidade espiritual.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'O mundo e Deus são incompatíveis; quem ama a um odeia ao outro.', obra: 'Comentario a Tiago', ano: 1551 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Ame o mundo e você se torna seu inimigo declarado.', obra: 'Sermoes', ano: 1865 },
  ],
  ["1 Jo 2:15","Rm 12:2","Mt 6:24"]);

add('tg', 4, 7, 'Resisti ao diabo, e ele fugirá de vós',
  'A promessa: a resistência pela fé vence o maligno. Humildade diante de Deus e firmeza diante do mal.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A resistência fiel é sustentada por Deus, que esmaga Satanás.', obra: 'Comentario a Tiago', ano: 1551 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Quem resiste pela fé faz o diabo tremer.', obra: 'Sermoes', ano: 1865 },
  ],
  ["1 Pe 5:9","Ef 6:11","Ap 12:11"]);

add('tg', 4, 8, 'Chegai-vos a Deus, e ele se chegará a vós',
  'A promessa da intimidade: purificar as mãos e o coração, e Deus virá ao encontro. A piedade é bilateral.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Deus não rejeita quem, com coração sincero, O busca.', obra: 'Comentario a Tiago', ano: 1551 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'A aproximação do homem é sustentada pela graça preveniente.', obra: 'Suma Teologica II-II, q.24', ano: 1274 },
  ],
  ["Sl 34:18","Is 55:6","Hb 7:19"]);

add('tg', 4, 17, 'Aquele que sabe fazer o bem e o não faz, comete pecado',
  'A omissão é pecado: a luz reconhecida e ignorada condena. O conhecimento sem ação é julgamento.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'O pecado de omissão é tão grave quanto o de comissão.', obra: 'Comentario a Tiago', ano: 1551 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'A omissão diante do necessitado é crime moral.', obra: 'Sermoes', ano: 1865 },
  ],
  ["Mt 25:45","Lc 12:47","1 Jo 3:17"]);

add('tg', 5, 7, 'Sede pacientes até a vinda do Senhor',
  'A paciência agrícola: como o lavrador espera o fruto, o crente espera o Senhor. A vinda do Senhor é a colheita.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A paciência cristã aguarda o juízo de Deus, não apressando.', obra: 'Comentario a Tiago', ano: 1551 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'A vinda do Senhor recompensa toda lágrima.', obra: 'Sermoes', ano: 1865 },
  ],
  ["2 Pe 3:9","Hb 10:36-37","Ap 22:20"]);

add('tg', 5, 12, 'Não jureis, nem pelo céu, nem pela terra',
  'A proibição do juramento banal: o "sim, sim; não, não" resume a integridade cristã. A palavra do crente é suficiente.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A palavra simples deve ser tão segura como juramentos.', obra: 'Comentario a Tiago', ano: 1551 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'O juramento só é lícito em necessidade grave.', obra: 'Suma Teologica II-II, q.89', ano: 1274 },
  ],
  ["Mt 5:34-37","2 Co 1:17","Ef 4:25"]);

add('tg', 5, 16, 'Confessai os vossos pecados uns aos outros e orai uns pelos outros',
  'A confissão mútua e a oração: a cura espiritual e física vem da comunidade. A transparência cura.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A confissão pública do pecado, quando cabe, é saudável.', obra: 'Comentario a Tiago', ano: 1551 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'A oração do justo é poderosa em seus efeitos.', obra: 'Sermoes', ano: 1865 },
  ],
  ["1 Jo 1:9","At 19:18","Sl 32:3-5"]);

add('tg', 5, 20, 'Aquele que converte o pecador do erro do seu caminho salvará uma alma da morte',
  'A glória de ganhar almas: a restauração do errante cobre multidão de pecados. A evangelização tem efeito cósmico.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A obra missionária é a maior honra do cristão.', obra: 'Comentario a Tiago', ano: 1551 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Ganhar uma alma é livrar-se da morte eterna.', obra: 'Sermoes', ano: 1865 },
  ],
  ["Pv 11:30","Dn 12:3","1 Co 9:22"]);


// ====================================================================
// 1 JOAO - COMUNHAO COM DEUS
// ====================================================================

add('1jo', 1, 1, 'O que era desde o princípio',
  'O testemunho apostólico: João encadeia a revelação desde o princípio, garantindo a historicidade do Verbo encarnado.',
  [
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'O Evangelho eterno é atemporal, mas se encarnou no tempo.', obra: 'Tractatus in Joannis Epistulam', ano: 416 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'João atesta a Palavra eterna que se fez visível.', obra: 'Comentario a 1 Joao', ano: 1556 },
  ],
  ["Jo 1:1-3","1 Jo 1:2","Jo 1:14"]);

add('1jo', 1, 5, 'Deus é luz, e nele não há trevas nenhuma',
  'A natureza de Deus é luz absoluta, sem mistura de mal. A comunhão com Deus exige andar na luz.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A luz de Deus expõe toda impureza do homem.', obra: 'Comentario a 1 Joao', ano: 1556 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'A luz de Deus é a verdade imutável.', obra: 'Tractatus in Joannis Epistulam', ano: 416 },
  ],
  ["1 Jo 2:9","Jo 1:4-5","Sl 27:1"]);

add('1jo', 1, 7, 'O sangue de Jesus nos purifica de todo pecado',
  'A eficácia contínua do sangue de Cristo: a purificação não é apenas inicial, mas constante. Andar na luz é ser purificado.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'O sangue de Cristo purifica continuamente a Igreja.', obra: 'Comentario a 1 Joao', ano: 1556 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'O sangue de Cristo é suficiente para o maior dos pecados.', obra: 'Sermoes', ano: 1865 },
  ],
  ["Hb 9:14","Ap 1:5","1 Jo 2:1-2"]);

add('1jo', 1, 8, 'Se dissermos que não temos pecado',
  'A ilusão perigosa: negar o pecado é enganar a si mesmo e tornar a Palavra vazia. A honestidade espiritual é fundamental.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A negação do pecado é a raiz da heresia.', obra: 'Comentario a 1 Joao', ano: 1556 },
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'A consciência do pecado precede a justificação.', obra: 'Comentario a 1 Joao', ano: 1527 },
  ],
  ["Pv 20:9","Ec 7:20","Rm 3:10-12"]);

add('1jo', 1, 9, 'Se confessarmos os nossos pecados',
  'A promessa: a confissão sincera traz perdão e purificação. A fidelidade e a justiça de Deus garantem o perdão.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A confissão é o caminho da misericórdia.', obra: 'Comentario a 1 Joao', ano: 1556 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Confessar é o abrir da ferida para a cura de Cristo.', obra: 'Sermoes', ano: 1865 },
  ],
  ["Sl 32:5","Pv 28:13","Hb 8:12"]);

add('1jo', 2, 1, 'Para que não pequeis. E, se alguém pecar, temos um Advogado para com o Pai',
  'A dupla bênção: o objetivo é a santidade, mas a falha não é fatal. Cristo é nosso Parakletos, Advogado e Consolador.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Cristo é o eterno intercessor que defende os eleitos.', obra: 'Comentario a 1 Joao', ano: 1556 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Cristo é advogado e propiciação pelos nossos pecados.', obra: 'Suma Teologica III, q.22', ano: 1274 },
  ],
  ["Rm 8:34","Hb 7:25","1 Tm 2:5"]);

add('1jo', 2, 3, 'Nisto conhecemos que o conhecemos: se guardarmos os seus mandamentos',
  'O teste do conhecimento de Deus: a obediência. Conhecer a Deus não é apenas teórico, mas produz fruto prático.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'O verdadeiro conhecimento de Deus se prova na obediência.', obra: 'Comentario a 1 Joao', ano: 1556 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'A obediência é a marca visível da fé invisível.', obra: 'Sermoes', ano: 1865 },
  ],
  ["Jo 14:15","1 Jo 5:3","Tg 1:22"]);

add('1jo', 2, 6, 'Aquele que diz que permanece nele, deve andar como ele andou',
  'O padrão cristão: a vida do crente deve refletir a de Cristo. A imitação de Cristo é a meta da fé.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A vida cristã é a imitação da vida de Cristo.', obra: 'Comentario a 1 Joao', ano: 1556 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Cristo é o modelo, a graça é o poder, a glória é o fim.', obra: 'Suma Teologica III, q.8', ano: 1274 },
  ],
  ["Mt 11:29","1 Pe 2:21","Fp 2:5"]);

add('1jo', 2, 15, 'Não ameis o mundo, nem o que há no mundo',
  'A advertência radical: o amor ao Pai e o amor ao mundo são mutuamente excludentes. A trincheira da fidelidade é o amor.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'O mundo corrompe o coração; o amor ao Pai o purifica.', obra: 'Comentario a 1 Joao', ano: 1556 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Quem ama o mundo perde o gosto pelo céu.', obra: 'Sermoes', ano: 1865 },
  ],
  ["Tg 4:4","Rm 12:2","Mt 6:24"]);

add('1jo', 2, 17, 'O mundo passa, e a sua concupiscência',
  'A transitoriedade do mundo: a cobiça passa, mas quem faz a vontade de Deus permanece eternamente.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'O que é segundo a carne perece; o que é do Espírito permanece.', obra: 'Comentario a 1 Joao', ano: 1556 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'A eternidade absorve o tempo; o eterno vence o passageiro.', obra: 'Suma Teologica I, q.10', ano: 1274 },
  ],
  ["1 Co 7:31","2 Co 4:18","Hb 13:14"]);

add('1jo', 3, 1, 'Vede que grande amor nos tem concedido o Pai',
  'A adoção: ser chamado filho de Deus é a maior dignidade. O mundo não compreende porque não O conhece.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A adoção nos torna herdeiros de Deus e coerdeiros de Cristo.', obra: 'Comentario a 1 Joao', ano: 1556 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'A filiação divina é dom gratuito, não conquista humana.', obra: 'Suma Teologica III, q.23', ano: 1274 },
  ],
  ["Jo 1:12","Rm 8:15-17","Gl 4:4-7"]);

add('1jo', 3, 4, 'Todo aquele que pratica o pecado pratica a iniquidade',
  'A definição de pecado: iniquidade, ou transgressão da lei. Pecado não é acidente, é rebeldia contra a ordem divina.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'O pecado é a violação da vontade santa de Deus.', obra: 'Comentario a 1 Joao', ano: 1556 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'O pecado é a privação da justiça devida.', obra: 'De Natura et Gratia', ano: 415 },
  ],
  ["1 Jo 5:17","Rm 4:15","Tg 2:10"]);

add('1jo', 3, 8, 'Para isto se manifestou o Filho de Deus, para desfazer as obras do diabo',
  'A missão de Cristo: destruir as obras do diabo. A encarnação é a invasão do território inimigo.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Cristo veio para esmagar a cabeça da serpente.', obra: 'Comentario a 1 Joao', ano: 1556 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'A vitória de Cristo sobre o demônio é completa e definitiva.', obra: 'Suma Teologica III, q.49', ano: 1274 },
  ],
  ["Gn 3:15","Cl 2:15","Hb 2:14-15"]);

add('1jo', 3, 16, 'Nisto conhecemos o amor: que Cristo deu a sua vida por nós',
  'A medida do amor: a morte substitutiva. Devemos dar a vida pelos irmãos, como Cristo por nós.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'O amor de Cristo é o critério do amor cristão.', obra: 'Comentario a 1 Joao', ano: 1556 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'A morte de Cristo é a maior prova de amor já dada.', obra: 'Tractatus in Joannis Epistulam', ano: 416 },
  ],
  ["Jo 15:13","Rm 5:6-8","Ef 5:2"]);

add('1jo', 3, 18, 'Amemos não de palavra, nem de língua, mas de fato e de verdade',
  'A autenticidade do amor: além da retórica, a ação concreta. O amor é comprovado por obras, não por discursos.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'O amor que não se traduz em ação é ilusório.', obra: 'Comentario a 1 Joao', ano: 1556 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Amo-te é fácil; o difícil é estender a mão ao irmão.', obra: 'Sermoes', ano: 1865 },
  ],
  ["Tg 2:15-16","Rm 12:8","Gl 5:13"]);

add('1jo', 4, 7, 'Amados, amemo-nos uns aos outros, porque o amor procede de Deus',
  'A origem do amor: Deus é a fonte. Quem ama é nascido de Deus e conhece a Deus. O amor é critério de filiação.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'O amor é fruto e prova da regeneração.', obra: 'Comentario a 1 Joao', ano: 1556 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'O amor a Deus se difunde em amor ao próximo.', obra: 'Suma Teologica II-II, q.44', ano: 1274 },
  ],
  ["1 Jo 4:21","1 Co 13:4-7","Mt 22:39"]);

add('1jo', 4, 8, 'Deus é amor',
  'A definição mais profunda de Deus: a essência divina é amor. Não é apenas atributo, mas a Sua natureza mesma.',
  [
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Deus é amor; quem permanece no amor permanece em Deus.', obra: 'Tractatus in Joannis Epistulam', ano: 416 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'O amor é a essência de Deus, revelado em Cristo.', obra: 'Comentario a 1 Joao', ano: 1556 },
  ],
  ["1 Jo 4:16","1 Jo 4:20","Jo 3:16"]);

add('1jo', 4, 9, 'Nisto se manifestou o amor de Deus em nós',
  'A manifestação histórica do amor: o envio do Filho unigênito. O amor não é abstrato; é o dom concreto do Crucificado.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'O envio do Filho é a maior revelação do amor divino.', obra: 'Comentario a 1 Joao', ano: 1556 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Deus não ficou no céu dizendo que nos amava: desceu.', obra: 'Sermoes', ano: 1865 },
  ],
  ["Jo 3:16","Rm 5:8","1 Jo 4:10"]);

add('1jo', 4, 16, 'Deus é amor, e quem permanece no amor permanece em Deus',
  'A comunhão: a vida eterna é habitar no amor. A habitação mútua entre Deus e o crente é o ápice da revelação.',
  [
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Deus é amor; permanecendo no amor, permanecemos em Deus.', obra: 'Tractatus in Joannis Epistulam', ano: 416 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A comunhão com Deus é intimidade no amor.', obra: 'Comentario a 1 Joao', ano: 1556 },
  ],
  ["1 Jo 3:24","Jo 15:9-10","1 Co 13:13"]);

add('1jo', 4, 18, 'No amor não há medo',
  'O perfeito amor lança fora o medo. O medo do juízo é tirado pela certeza do amor. A maturidade cristã é viver no amor.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'O amor amadurecido e firme, não temeroso.', obra: 'Comentario a 1 Joao', ano: 1556 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'O medo atormenta, mas o amor de Cristo acalma.', obra: 'Sermoes', ano: 1865 },
  ],
  ["Rm 8:15","Hb 2:14-15","2 Tm 1:7"]);

add('1jo', 4, 19, 'Nós amamos porque ele nos amou primeiro',
  'A precedência do amor divino: o nosso amor é resposta ao amor de Deus. Não amamos para ser amados, mas porque fomos amados.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'O nosso amor é a resposta ao amor preveniente de Deus.', obra: 'Comentario a 1 Joao', ano: 1556 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Ama primeiro, e serás capaz de amar em retorno.', obra: 'Tractatus in Joannis Epistulam', ano: 416 },
  ],
  ["1 Jo 4:10","Rm 5:5","Ef 2:4-5"]);

add('1jo', 5, 1, 'Todo aquele que crê que Jesus é o Cristo é nascido de Deus',
  'A fé e a filiação: crer na messianidade de Jesus é obra do novo nascimento. A fé é sinal da regeneração.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A fé que confessa a Cristo é dom do novo nascimento.', obra: 'Comentario a 1 Joao', ano: 1556 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'A fé em Cristo é a raiz da vida espiritual.', obra: 'Suma Teologica II-II, q.2', ano: 1274 },
  ],
  ["Jo 1:12-13","1 Jo 5:4","1 Pe 1:23"]);

add('1jo', 5, 3, 'Este é o amor de Deus: que guardemos os seus mandamentos',
  'A definição do amor: obediência. Amar a Deus é cumprir os Seus mandamentos. A obediência é a prova do amor.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'O amor não é sentimento, mas serviço obediente.', obra: 'Comentario a 1 Joao', ano: 1556 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'A obediência ao Senhor é o tributo que o amor paga.', obra: 'Sermoes', ano: 1865 },
  ],
  ["Jo 14:15","1 Jo 2:3","Mt 5:19"]);

add('1jo', 5, 4, 'Todo o que é nascido de Deus vence o mundo',
  'A vitória da fé: o que nasce de Deus vence o mundo. A fé é a arma que derrota todo o mal.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A fé é a vitória que o regenerado alcança.', obra: 'Comentario a 1 Joao', ano: 1556 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'A fé une o crente a Cristo, o vencedor do mundo.', obra: 'Suma Teologica II-II, q.1', ano: 1274 },
  ],
  ["Rm 8:37","1 Co 15:57","Ap 12:11"]);

add('1jo', 5, 11, 'O testemunho é este: Deus nos deu a vida eterna',
  'A vida eterna como dom presente: não apenas promessa futura, mas posse atual. O dom é garantido pelo testemunho de Deus.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A vida eterna já começou na regeneração.', obra: 'Comentario a 1 Joao', ano: 1556 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'A vida eterna começa na cruz e se consuma na glória.', obra: 'Sermoes', ano: 1865 },
  ],
  ["Jo 17:3","1 Jo 5:12-13","Jo 3:36"]);

add('1jo', 5, 12, 'Quem tem o Filho tem a vida',
  'A possessão da vida: o crente tem a vida eterna em Cristo. Sem o Filho, não há vida. A união com Cristo é a vida.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Ter o Filho é ter a vida, pois Ele é a vida.', obra: 'Comentario a 1 Joao', ano: 1556 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Onde Cristo está, aí está a vida; quem está fora dEle está na morte.', obra: 'Tractatus in Joannis Epistulam', ano: 416 },
  ],
  ["Jo 5:24","Jo 11:25","Cl 3:4"]);

add('1jo', 5, 13, 'Estas coisas vos escrevi para que saibais que tendes a vida eterna',
  'O propósito da carta: segurança da salvação. A fé produz certeza, não orgulho. O Espírito confirma a filiação.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A fé que crê, com o Espírito que testifica, gera certeza.', obra: 'Comentario a 1 Joao', ano: 1556 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'A certeza da salvação é o direito do crente em Cristo.', obra: 'Sermoes', ano: 1865 },
  ],
  ["Rm 8:16","1 Jo 5:10","Hb 6:11"]);


// ====================================================================
// NOVOS COMENTARIOS - GENESIS A MALAQUIAS
// ====================================================================

add('gn', 1, 1, 'Criacao dos Ceus e da Terra',
  'O versiculo fundamental: Deus como Criador soberano.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'No inicio Deus criou os ceus e a terra.', obra: 'Comentario ao Genesis', ano: 1554 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Criacao ex nihilo e ato da onipotencia.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ['Jn 1:1-3', 'Cl 1:16', 'Hb 11:3']
);

add('gn', 1, 26, 'A Imagem de Deus',
  'Deus cria o homem a Sua imagem.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A imagem esta na integridade original.', obra: 'Comentario ao Genesis', ano: 1554 },
    { teologo: 'Irineu', periodo: 'patristico', tradicao: 'ortodoxa', texto: 'Capacidade de governar e piedade.', obra: 'Demonstracao', ano: 180 },
  ],
  ['Gn 5:1', 'Tg 3:9']
);

add('gn', 3, 6, 'A Queda do Homem',
  'Adao e Eva pecam contra Deus.',
  [
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'O pecado comeca no desejo.', obra: 'Confissoes', ano: 398 },
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'A desobediencia e a raiz.', obra: 'Comentario ao Genesis', ano: 1544 },
  ],
  ['Rm 5:12', 'Tg 1:14-15']
);

add('gn', 3, 15, 'O Proto-Evangelho',
  'Primeira promessa de Redentor.',
  [
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Primeira mencao da graÃ§a.', obra: 'De Genesi ad Litteram', ano: 401 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Cristo destrÃ³i obras do diabo.', obra: 'Comentario ao Genesis', ano: 1554 },
  ],
  ['Rm 16:20', '1 Jo 3:8']
);

add('gn', 12, 1, 'A Vocacao de Abraao',
  'Deus chama Abraao.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'A fe caminha no escuro.', obra: 'Comentario ao Genesis', ano: 1554 },
    { teologo: 'Kierkegaard', periodo: 'moderno', tradicao: 'luterana', texto: 'O cavaleiro da fe.', obra: 'Fear and Trembling', ano: 1843 },
  ],
  ['Hb 11:8']
);

add('gn', 15, 6, 'Justificacao pela Fe',
  'Abraao creu e lhe foi imputada justica.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fe e mao que recebe graÃ§a.', obra: 'Comentario ao Genesis', ano: 1554 },
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'O evangelical triumphante.', obra: 'Comentario ao Genesis', ano: 1544 },
  ],
  ['Rm 4:3-5']
);

add('gn', 22, 14, 'O Senhor Provera',
  'Jeova-Jireh: Deus sempre prove.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Deus antecipa necessidades.', obra: 'Comentario ao Genesis', ano: 1554 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Deus sempre prove.', obra: 'Sermoes', ano: 1870 },
  ],
  ['Fl 4:19']
);

add('gn', 32, 28, 'A Luta de Jaco',
  'Jaco recebe o nome Israel.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Persistir em oracao.', obra: 'Comentario ao Genesis', ano: 1554 },
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Deus permite ser alcancado.', obra: 'Church Dogmatics', ano: 1958 },
  ],
  ['Ef 6:12']
);

add('gn', 50, 20, 'Proposito de Deus no Mal',
  'Deus transforma mal em bem.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Providencia transforma tudo.', obra: 'Comentario ao Genesis', ano: 1554 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Deus governa acoes mas.', obra: 'De Civitate Dei', ano: 426 },
  ],
  ['Rm 8:28']
);

add('ex', 3, 14, 'EU SOU O QUE SOU',
  'Nome revelado a Moises.',
  [
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Nome ineffavel.', obra: 'De Trinitate', ano: 400 },
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Deus e suficiente.', obra: 'Comentario ao Exodo', ano: 1554 },
  ],
  ['Jn 8:58']
);

add('ex', 12, 3, 'O Cordeiro Pascal',
  'Prefiguracao de Cristo.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Figura de Cristo.', obra: 'Comentario ao Exodo', ano: 1554 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Sangue salva da morte.', obra: 'De Trinitate', ano: 400 },
  ],
  ['Jo 1:29', '1 Co 5:7']
);

add('ex', 14, 13, 'O Senhor Pelejara',
  'Salvacao inteiramente divina.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Nossa parte e confiar.', obra: 'Comentario ao Exodo', ano: 1554 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Veja a salvacao.', obra: 'Sermoes', ano: 1870 },
  ],
  ['2 Cr 20:17']
);

add('ex', 20, 1, 'Os Dez Mandamentos',
  'Lei moral de Deus.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Resumo da lei.', obra: 'Comentario ao Exodo', ano: 1554 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Lei natural divina.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ['Mt 5:17-19']
);

add('ex', 34, 6, 'O Nome do Senhor',
  'Misericordioso e clemente.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Bondade antes de juizo.', obra: 'Comentario ao Exodo', ano: 1554 },
    { teologo: 'Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Fundamento da teologia.', obra: 'NT and People of God', ano: 1992 },
  ],
  ['Sl 86:15']
);

add('lv', 19, 18, 'Amaras o Teu Proximo',
  'Fundamento da lei.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Plenitude da lei.', obra: 'Comentario ao Levitico', ano: 1554 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Segundo mandamento.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ['Mt 22:39-40']
);

add('nu', 23, 19, 'Deus Nao Minta',
  'Imutabilidade divina.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Imutavel em carater.', obra: 'Comentario ao Numeros', ano: 1554 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Verdade mesma.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ['Ml 3:6', 'Tg 1:17']
);

add('dt', 6, 4, 'Shema Israel',
  'O Senhor e um so.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Amor integral.', obra: 'Comentario ao Deuteronomio', ano: 1554 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Fundamento monoteista.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ['Mt 22:37-38']
);

add('dt', 30, 19, 'A Vida e a Morte',
  'Escolha proposta.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Respeita liberdade.', obra: 'Comentario ao Deuteronomio', ano: 1554 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Escolhe a vida!', obra: 'Sermoes', ano: 1870 },
  ],
  ['Mt 7:13-14']
);

add('js', 1, 9, 'Seja Forte e Corajoso',
  'Deus encoraja Josue.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Promete presenca.', obra: 'Comentario a Josue', ano: 1554 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Presenca e coragem.', obra: 'Sermoes', ano: 1870 },
  ],
  ['Dt 31:7-8']
);

add('js', 24, 15, 'Escolhe a Quem Servir',
  'Desafio a Israel.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Neutralidade impossivel.', obra: 'Comentario a Josue', ano: 1554 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Serviremos ao Senhor.', obra: 'Sermoes', ano: 1870 },
  ],
  ['Mt 6:24']
);

add('jz', 7, 7, 'Os Trezentos',
  'Deus reduz exercito.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Usa os fracos.', obra: 'Comentario a Juizes', ano: 1554 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Poucos com muita fe.', obra: 'Sermoes', ano: 1870 },
  ],
  ['1 Co 1:27-29']
);

add('rt', 1, 16, 'Para Onde Ires, Eu Irei',
  'Lealdade de Rute.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Figura de Cristo e igreja.', obra: 'Comentario a Rute', ano: 1554 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Fidelidade prefigurada.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ['Ef 5:25-27']
);

add('1sm', 15, 22, 'Obediencia Melhor Que Sacrificio',
  'Deus prefere obediencia.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Coracoes obedientes.', obra: 'Comentario a 1 Samuel', ano: 1554 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sem caridade e inutil.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ['Mt 9:13']
);

add('1sm', 16, 7, 'Deus Olha Para o Coracao',
  'Julgamento divino.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Discerni coracoes.', obra: 'Comentario a 1 Samuel', ano: 1554 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Intencao do coracao.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ['1 Co 4:5']
);

add('1sm', 17, 45, 'Nome do Senhor dos Exercitos',
  'Davi contra Golias.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Confia no Deus vivo.', obra: 'Comentario a 1 Samuel', ano: 1554 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Nome poderoso.', obra: 'Sermoes', ano: 1870 },
  ],
  ['Ef 6:10-11']
);

add('1rs', 19, 11, 'A Voz Suave',
  'Deus no silencio.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Revelacao no evangelho.', obra: 'Comentario a 1 Reis', ano: 1554 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Fala no silencio.', obra: 'Confissoes', ano: 398 },
  ],
  ['Sl 85:8']
);

add('2cr', 7, 14, 'Se o Meu Povo Orar',
  'Cura pela oracao.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Humilhacao e oracao.', obra: 'Comentario a 2 Cronicas', ano: 1554 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Chave do ceu.', obra: 'Sermoes', ano: 1870 },
  ],
  ['Jr 29:12-14']
);

add('ne', 8, 10, 'A Alegria do Senhor',
  'Forca espiritual.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Alegria fortalecedora.', obra: 'Comentario a Neemias', ano: 1554 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Combustivel da fe.', obra: 'Sermoes', ano: 1870 },
  ],
  ['Ed 6:16']
);

add('et', 4, 14, 'Talvez Para Tais Momentos',
  'Proposito divino.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Deus guia a historia.', obra: 'Comentario a Ester', ano: 1554 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Lugares estrategicos.', obra: 'Sermoes', ano: 1870 },
  ],
  ['Rm 8:28']
);

add('jb', 1, 21, 'O Senhor Deu e Tomou',
  'Adoracao incondicional.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Independente de circunstancias.', obra: 'Comentario a Jo', ano: 1554 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Adora pelo que Ele e.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ['Tg 1:2-4']
);

add('jb', 19, 25, 'O Meu Redentor Vive',
  'Confessao messianica.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Confianca eterna.', obra: 'Comentario a Jo', ano: 1554 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Antecipa ressurreicao.', obra: 'De Trinitate', ano: 400 },
  ],
  ['1 Co 15:20']
);

add('jb', 42, 5, 'Agora Meus Olhos Te Viram',
  'Conhecimento intimo.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Vem do sofrimento.', obra: 'Comentario a Jo', ano: 1554 },
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Deus se revela.', obra: 'Church Dogmatics', ano: 1958 },
  ],
  ['1 Co 13:12']
);

add('sl', 23, 1, 'O Senhor e o Meu Pastor',
  'Providencia divina.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Cuida de nos.', obra: 'Comentario aos Salmos', ano: 1554 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'O melhor salmo.', obra: 'Sermoes', ano: 1870 },
  ],
  ['Jo 10:11']
);

add('sl', 51, 10, 'Cria Em Mim Um Coracao Puro',
  'Arrependimento.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Obra do Espirito.', obra: 'Comentario aos Salmos', ano: 1554 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Modelo do pecador.', obra: 'Enarrationes', ano: 405 },
  ],
  ['1 Jo 1:9']
);

add('sl', 119, 105, 'Lampada Para Os Meus Pes',
  'Palavra como guia.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Luz que guia.', obra: 'Comentario aos Salmos', ano: 1554 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Mapa da vida.', obra: 'Sermoes', ano: 1870 },
  ],
  ['2 Pd 1:19']
);

add('sl', 139, 1, 'Tu Me Examinaste',
  'Onisciencia.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Conhece antes de existirmos.', obra: 'Comentario aos Salmos', ano: 1554 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Ve tudo.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ['Jr 1:5']
);

add('pv', 1, 7, 'Temor do Senhor e Principio da Sabedoria',
  'Alicerce da sabedoria.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Comeca no temor.', obra: 'Comentario aos Proverbios', ano: 1554 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Raiz das virtudes.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ['Jb 28:28']
);

add('pv', 3, 5, 'Confia No Senhor',
  'Confianca total.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Nao em propria razao.', obra: 'Comentario aos Proverbios', ano: 1554 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Confie quando nao entende.', obra: 'Sermoes', ano: 1870 },
  ],
  ['Ef 3:20']
);

add('pv', 22, 6, 'Instrui o Menino',
  'Educacao religiosa.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Responsabilidade dos pais.', obra: 'Comentario aos Proverbios', ano: 1554 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Formacao desde cedo.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ['Dt 6:6-7']
);

add('ec', 12, 13, 'Teme a Deus',
  'Conclusao.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Resumo de toda vida.', obra: 'Comentario a Eclesiastes', ano: 1554 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Fim ultimo.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ['Dt 6:5']
);

add('is', 7, 14, 'A Virgem Concebera',
  'Profecia messianica.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Emanuel: Deus conosco.', obra: 'Comentario a Isaias', ano: 1554 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Pelo Espirito Santo.', obra: 'De Trinitate', ano: 400 },
  ],
  ['Mt 1:22-23']
);

add('is', 9, 6, 'Um Menino Nos Nasceu',
  'Principe da Paz.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Divindade e humanidade.', obra: 'Comentario a Isaias', ano: 1554 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Conselheiro, Forte.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ['Lc 2:11']
);

add('is', 40, 31, 'Renovam Suas Forcas',
  'Promessa de renovacao.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Esperanca renova.', obra: 'Comentario a Isaias', ano: 1554 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Combustivel da perseveranca.', obra: 'Sermoes', ano: 1870 },
  ],
  ['Is 41:10']
);

add('is', 53, 5, 'Foi Transgredido e Pisado',
  'Servo sofredor.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Carregou nossas dores.', obra: 'Comentario a Isaias', ano: 1554 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Pela nossa iniquidade.', obra: 'De Trinitate', ano: 400 },
  ],
  ['1 Pd 2:24']
);

add('is', 55, 1, 'Vinde, Os Que Tendes Sede',
  'Convite a graÃ§a.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'GraÃ§a gratuita.', obra: 'Comentario a Isaias', ano: 1554 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Abundante para todos.', obra: 'Sermoes', ano: 1870 },
  ],
  ['Jo 7:37-38']
);

add('is', 61, 1, 'O Espirito e Sobre Mim',
  'Jesus cita na sinagoga.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Boas novas aos pobres.', obra: 'Comentario a Isaias', ano: 1554 },
    { teologo: 'Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Inauguracao do reino.', obra: 'NT and People of God', ano: 1992 },
  ],
  ['Lc 4:18-19']
);

add('jr', 17, 9, 'Enganoso e o Coracao',
  'Depravacao humana.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fonte de todo pecado.', obra: 'Comentario a Jeremias', ano: 1554 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Razao obscurcida.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ['Rm 3:10-12']
);

add('jr', 29, 11, 'Eu Sei Os Pensamentos',
  'Planos de paz.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Governos propostos.', obra: 'Comentario a Jeremias', ano: 1554 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Plano para cada vida.', obra: 'Sermoes', ano: 1870 },
  ],
  ['Rm 8:28']
);

add('jr', 31, 31, 'Nova Alianca',
  'Lei no coracao.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Pelo Espirito.', obra: 'Comentario a Jeremias', ano: 1554 },
    { teologo: 'Vos', periodo: 'moderno', tradicao: 'reformada', texto: 'Supera a antiga.', obra: 'Biblical Theology', ano: 1948 },
  ],
  ['Hb 8:8-13']
);

add('lm', 3, 22, 'Misericordias Nao Tem Fim',
  'Renovacao diaria.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Misericordia infinita.', obra: 'Comentario a Lamentacoes', ano: 1554 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Nova oportunidade.', obra: 'Sermoes', ano: 1870 },
  ],
  ['Lm 3:25']
);

add('ez', 36, 26, 'Um Coracao Novo',
  'Regeneracao.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Obra de Deus.', obra: 'Comentario a Ezequiel', ano: 1554 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Pela graÃ§a.', obra: 'De Spiritu et Littera', ano: 412 },
  ],
  ['2 Co 5:17']
);

add('ez', 37, 1, 'Os Ossos Secos',
  'Ressurreicao.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Vida ao morto.', obra: 'Comentario a Ezequiel', ano: 1554 },
    { teologo: 'Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Fundamento da ressurreicao.', obra: 'NT and People of God', ano: 1992 },
  ],
  ['Jo 5:28-29']
);

add('dn', 7, 13, 'O Filho do Homem',
  'Dominio eterno.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Autoridade sobre nacoes.', obra: 'Comentario a Daniel', ano: 1554 },
    { teologo: 'Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Jesus usa este titulo.', obra: 'NT and People of God', ano: 1992 },
  ],
  ['Mt 26:64']
);

add('os', 11, 1, 'Do Egito Chamei Meu Filho',
  'Cumpre-se em Jesus.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Jesus e o Filho.', obra: 'Comentario a Oseas', ano: 1554 },
    { teologo: 'Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Cumprimento em Mateus.', obra: 'NT and People of God', ano: 1992 },
  ],
  ['Mt 2:15']
);

add('jl', 2, 28, 'Derramarei Meu Espirito',
  'Pentecostes.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Sobre todos.', obra: 'Comentario a Joel', ano: 1554 },
    { teologo: 'Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Cita Pedro.', obra: 'NT and People of God', ano: 1992 },
  ],
  ['At 2:16-21']
);

add('am', 5, 24, 'Justica Como Agua',
  'Justica social.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Culto sem justica rejeitado.', obra: 'Comentario a Amos', ano: 1554 },
    { teologo: 'Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Parte da adoracao.', obra: 'NT and People of God', ano: 1992 },
  ],
  ['Mt 23:23']
);

add('mc', 6, 8, 'Ele Te Deu O Que e Bom',
  'Resumo da lei.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Obediencia interna.', obra: 'Comentario a Miqueias', ano: 1554 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Virtudes supremas.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ['Mt 23:23']
);

add('ha', 2, 4, 'O Justo Vivera Pela Fe',
  'Justificacao.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Pela fe, nao obras.', obra: 'Comentario a Habacuque', ano: 1554 },
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Porta estreita.', obra: 'Comentario a Habacuque', ano: 1544 },
  ],
  ['Rm 1:17']
);

add('ml', 3, 1, 'O Anjo da Alianca',
  'Preparacao para o Messias.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Cristo e o anjo da alianca.', obra: 'Comentario a Malaquias', ano: 1554 },
    { teologo: 'Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Precursor: Joao Batista.', obra: 'NT and People of God', ano: 1992 },
  ],
  ['Mt 11:10']
);

// ====================================================================
// NOVOS COMENTARIOS - NOVO TESTAMENTO
// ====================================================================

// ====================================================================
// MATEUS
// ====================================================================

add('mt', 1, 21, 'Ele Salvara O Seu Povo',
  'Nome Jesus: Salvador.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Nome dado pelo anjo.', obra: 'Comentario a Mateus', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Salvador dos pecados.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ['Lc 1:31']
);

add('mt', 3, 2, 'Arrependei-Vos',
  'Joao Batista proclama.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Reino proximo.', obra: 'Comentario a Mateus', ano: 1555 },
    { teologo: 'Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Inauguracao do reino.', obra: 'NT and People of God', ano: 1992 },
  ],
  ['Mt 4:17']
);

add('mt', 4, 4, 'Nao So de Pao',
  'Jesus resiste a tentacao.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Palavra e alimento.', obra: 'Comentario a Mateus', ano: 1555 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Biblia e arma.', obra: 'Sermoes', ano: 1870 },
  ],
  ['Dt 8:3']
);

add('mt', 5, 3, 'Bem-Aventurados Os Pobres',
  'Primeira bem-aventuranca.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Pobres de espirito.', obra: 'Comentario a Mateus', ano: 1555 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Humildes diante de Deus.', obra: 'De Doctrina Christiana', ano: 397 },
  ],
  ['Lc 6:20']
);

add('mt', 5, 14, 'Luz do Mundo',
  'Igreja como luz.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Reflectimos Cristo.', obra: 'Comentario a Mateus', ano: 1555 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Nao pode ser escondida.', obra: 'Sermoes', ano: 1870 },
  ],
  ['Jo 8:12']
);

add('mt', 6, 33, 'Buscai Primeiramente',
  'Prioridades.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Reino acima de tudo.', obra: 'Comentario a Mateus', ano: 1555 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Deus primeiro.', obra: 'Sermoes', ano: 1870 },
  ],
  ['Mt 6:19-21']
);

add('mt', 9, 12, 'Nao Estao Doentes',
  'Jesus veio para pecadores.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Saudaveis nao precisam.', obra: 'Comentario a Mateus', ano: 1555 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Medico das almas.', obra: 'Sermoes', ano: 400 },
  ],
  ['Mc 2:17']
);

add('mt', 11, 28, 'Vinde a Mim',
  'Convite universal.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Jugo suave.', obra: 'Comentario a Mateus', ano: 1555 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Descanso para cansados.', obra: 'Sermoes', ano: 1870 },
  ],
  ['1 Jo 5:3']
);

add('mt', 16, 16, 'Tu es o Cristo',
  'Confessao de Pedro.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Revelacao divina.', obra: 'Comentario a Mateus', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Fundamento da igreja.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ['Jo 20:31']
);

add('mt', 22, 37, 'Amaras o Teu Senhor',
  'Grande mandamento.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Resumo da lei.', obra: 'Comentario a Mateus', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Amor a Deus em plenitude.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ['Dt 6:5']
);

add('mt', 24, 14, 'Este Evangelho Sera Pregado',
  'Missao universal.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Evangelho as nacoes.', obra: 'Comentario a Mateus', ano: 1555 },
    { teologo: 'Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Missao prioridade.', obra: 'NT and People of God', ano: 1992 },
  ],
  ['Mc 13:10']
);

add('mt', 28, 18, 'Toda Autoridade Me E Dada',
  'Grande comissao.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Autoridade suprema.', obra: 'Comentario a Mateus', ano: 1555 },
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Cristo e Senhor.', obra: 'Church Dogmatics', ano: 1958 },
  ],
  ['Fp 2:9-11']
);

// ====================================================================
// MARCOS
// ====================================================================

add('mc', 1, 1, 'Principio do Evangelho',
  'Jesus Cristo Filho de Deus.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Boa nova comeca.', obra: 'Comentario a Marcos', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Cristo e o centro.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ['Jo 1:1']
);

add('mc', 2, 5, 'Teus Pecados Sao Perdoados',
  'Jesus perdoa.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Autoridade para perdoar.', obra: 'Comentario a Marcos', ano: 1555 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Poder divino.', obra: 'Sermoes', ano: 400 },
  ],
  ['Lc 5:20']
);

add('mc', 4, 39, 'Calai-te, Acalmai',
  'Acalma tempestade.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Senhorio sobre natureza.', obra: 'Comentario a Marcos', ano: 1555 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Senhor da tempestade.', obra: 'Sermoes', ano: 1870 },
  ],
  ['Lc 8:24']
);

add('mc', 10, 45, 'Filho do Homem Para Servir',
  'Missao de Jesus.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Dar Sua vida.', obra: 'Comentario a Marcos', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Redencao por servico.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ['Mt 20:28']
);

add('mc', 16, 6, 'Ele Ressuscitou',
  'Mulher no tumulo.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Cristo ja esta aqui.', obra: 'Comentario a Marcos', ano: 1555 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Noticias de alegria.', obra: 'Sermoes', ano: 1870 },
  ],
  ['1 Co 15:3-4']
);

// ====================================================================
// LUCAS
// ====================================================================

add('lc', 1, 26, 'Anuncio a Maria',
  'Encarnacao.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Pelo Espirito.', obra: 'Comentario a Lucas', ano: 1555 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Verbo se faz carne.', obra: 'De Trinitate', ano: 400 },
  ],
  ['Mt 1:18-25']
);

add('lc', 2, 14, 'Gloria a Deus Nas Alturas',
  'Canto dos anjos.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Paz aos homens.', obra: 'Comentario a Lucas', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Himno celestial.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ['Mt 28:18']
);

add('lc', 4, 18, 'Espirito Sobre Mim',
  'Jesus na sinagoga.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Missao messianica.', obra: 'Comentario a Lucas', ano: 1555 },
    { teologo: 'Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Reino inaugurado.', obra: 'NT and People of God', ano: 1992 },
  ],
  ['Is 61:1']
);

add('lc', 10, 30, 'Bom Samaritano',
  'Amor ao proximo.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Proximo e necessitado.', obra: 'Comentario a Lucas', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Misericordia praticada.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ['Mt 22:39']
);

add('lc', 15, 11, 'Filho Prodigo',
  'Perdao.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Pai corre ao encontro.', obra: 'Comentario a Lucas', ano: 1555 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Graca que acolhe.', obra: 'Sermoes', ano: 400 },
  ],
  ['Rm 3:23-24']
);

add('lc', 19, 10, 'Filho do Homem Buscou e Salvou',
  'Missao.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Buscar perdidos.', obra: 'Comentario a Lucas', ano: 1555 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Cacador de almas.', obra: 'Sermoes', ano: 1870 },
  ],
  ['Mt 18:11']
);

add('lc', 23, 34, 'Pai, Perdoa-Lhes',
  'Jesus no cruz.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Intercessao.', obra: 'Comentario a Lucas', ano: 1555 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Perdao radical.', obra: 'Sermoes', ano: 400 },
  ],
  ['Mt 5:44']
);

// ====================================================================
// JOAO (expandido)
// ====================================================================

add('jo', 1, 1, 'No Principio Era o Verbo',
  'Preexistencia.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Verbo e Deus.', obra: 'Comentario a Joao', ano: 1555 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Logos eterno.', obra: 'Tractatus', ano: 416 },
  ],
  ['Jo 1:14', 'Cl 1:15']
);

add('jo', 1, 14, 'Verbo Se Fez Carne',
  'Encarnacao.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Habitou entre nos.', obra: 'Comentario a Joao', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Uniao hipostatica.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ['Fp 2:6-7']
);

add('jo', 3, 3, 'Nascer de Novo',
  'Novo nascimento.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Nascimento espiritual.', obra: 'Comentario a Joao', ano: 1555 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Regeneracao.', obra: 'Tractatus', ano: 416 },
  ],
  ['1 Pd 1:23']
);

add('jo', 3, 16, 'Tanto Amou Deus',
  'Versiculo mais famoso.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Amor indescritivel.', obra: 'Comentario a Joao', ano: 1555 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Versiculo de ouro.', obra: 'Sermoes', ano: 1870 },
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Centro do evangelho.', obra: 'Church Dogmatics', ano: 1958 },
  ],
  ['Rm 5:8']
);

add('jo', 5, 24, 'Quem Ouve Minha Palavra',
  'Vida eterna presente.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Passou da morte.', obra: 'Comentario a Joao', ano: 1555 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Seguranca.', obra: 'Sermoes', ano: 1870 },
  ],
  ['1 Jo 3:14']
);

add('jo', 6, 35, 'Sou o Pao da Vida',
  'Eu sou.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Satisfacao espiritual.', obra: 'Comentario a Joao', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Eucaristia.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ['Jo 6:48-51']
);

add('jo', 8, 12, 'Sou a Luz do Mundo',
  'Eu sou.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Luz espiritual.', obra: 'Comentario a Joao', ano: 1555 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Ilumina todo homem.', obra: 'Tractatus', ano: 416 },
  ],
  ['Jo 1:4-9']
);

add('jo', 8, 58, 'Antes Que Abraao Existisse, Eu Sou',
  'Divindade.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Preexistencia.', obra: 'Comentario a Joao', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'EU SOU absoluto.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ['Ex 3:14']
);

add('jo', 10, 11, 'Sou o Bom Pastor',
  'Eu sou.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Da vida pelas ovelhas.', obra: 'Comentario a Joao', ano: 1555 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Pastoreia igreja.', obra: 'Tractatus', ano: 416 },
  ],
  ['1 Pd 2:25']
);

add('jo', 11, 25, 'Sou a Ressurreicao',
  'Eu sou.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Vida em Cristo.', obra: 'Comentario a Joao', ano: 1555 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Vitoria sobre morte.', obra: 'Sermoes', ano: 1870 },
  ],
  ['1 Co 15:55-57']
);

add('jo', 14, 1, 'Nao Se Turbe',
  'Consolacao.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Confianca em Deus.', obra: 'Comentario a Joao', ano: 1555 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Paz em tempestades.', obra: 'Sermoes', ano: 1870 },
  ],
  ['1 Pd 5:7']
);

add('jo', 14, 6, 'Caminho, Verdade e Vida',
  'Exclusividade.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Ninguem vai ao Pai.', obra: 'Comentario a Joao', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Unico caminho.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ['At 4:12']
);

add('jo', 14, 27, 'Deixo-Vos Paz',
  'Paz de Cristo.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Nao da mundo.', obra: 'Comentario a Joao', ano: 1555 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Sobrenatural.', obra: 'Sermoes', ano: 1870 },
  ],
  ['Fp 4:7']
);

add('jo', 15, 1, 'Sou a Videira',
  'Uniao.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Dependencia total.', obra: 'Comentario a Joao', ano: 1555 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Uniao mistica.', obra: 'Tractatus', ano: 416 },
  ],
  ['Rm 11:17-18']
);

add('jo', 15, 5, 'Sem Mim Nada Podeis',
  'Dependencia radical.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Incapacidade humana.', obra: 'Comentario a Joao', ano: 1555 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Tudo e de Deus.', obra: 'Sermoes', ano: 1870 },
  ],
  ['2 Co 12:9']
);

add('jo', 15, 13, 'Ninguem Tem Amor Maior',
  'Amor sacrificial.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Dar a vida.', obra: 'Comentario a Joao', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Amor supremo.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ['Rm 5:8']
);

add('jo', 17, 3, 'Vida Eterna e Conhecer',
  'Conhecimento de Deus.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Pessoal.', obra: 'Comentario a Joao', ano: 1555 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Intimo.', obra: 'Tractatus', ano: 416 },
  ],
  ['Mt 11:27']
);

add('jo', 19, 30, 'Esta Concluido',
  'Obra completa.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Redencao perfeita.', obra: 'Comentario a Joao', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Consumada.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ['Hb 9:12']
);

// ====================================================================
// ATOS
// ====================================================================

add('at', 1, 8, 'Recebereis Poder',
  'Promessa do Espirito.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Testemunhar.', obra: 'Comentario a Atos', ano: 1555 },
    { teologo: 'Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Missao inaugurada.', obra: 'NT and People of God', ano: 1992 },
  ],
  ['Lc 24:49']
);

add('at', 2, 38, 'Arrependei-Vos e Seja Batizados',
  'Primeira pregaÃ§Ã£o.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Perdao.', obra: 'Comentario a Atos', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Batismo e graÃ§a.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ['Mc 16:16']
);

add('at', 4, 12, 'Nao Ha Salvacao em Ninguem Mais',
  'Exclusividade.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Unico nome.', obra: 'Comentario a Atos', ano: 1555 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Nao ha outro.', obra: 'Sermoes', ano: 1870 },
  ],
  ['Jo 14:6']
);

add('at', 9, 3, 'Luz do Ceu',
  'Conversao de Paulo.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Sobrenatural.', obra: 'Comentario a Atos', ano: 1555 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'GraÃ§a transforma.', obra: 'Confissoes', ano: 398 },
  ],
  ['1 Tm 1:15']
);

add('at', 16, 31, 'Creia no Senhor Jesus',
  'Salvacao.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fe que salva.', obra: 'Comentario a Atos', ano: 1555 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Simples e poderoso.', obra: 'Sermoes', ano: 1870 },
  ],
  ['Rm 10:9']
);

add('at', 17, 22, 'Mais Religiosos',
  'Areopago.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Ponto de contato.', obra: 'Comentario a Atos', ano: 1555 },
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Teologia natural limitada.', obra: 'Church Dogmatics', ano: 1958 },
  ],
  ['Rm 1:19-20']
);

add('at', 20, 28, 'Sangue de Deus',
  'Igreja comprada.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Igreja de Cristo.', obra: 'Comentario a Atos', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sacrificio.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ['1 Pd 1:18-19']
);

// ====================================================================
// ROMANOS (expandido)
// ====================================================================

add('rm', 1, 16, 'Nao Me Envergonho',
  'Forca do evangelho.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Poder para salvacao.', obra: 'Comentario a Romanos', ano: 1555 },
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Evangelho e tudo.', obra: 'Comentario a Romanos', ano: 1516 },
  ],
  ['1 Co 15:1-4']
);

add('rm', 3, 23, 'Todos Pecaram',
  'Universalidade.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Ninguem e justo.', obra: 'Comentario a Romanos', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Depravacao total.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ['Ec 7:20']
);

add('rm', 5, 8, 'Deus Prova Seu Amor',
  'Amor na cruz.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Cristo morreu por nos.', obra: 'Comentario a Romanos', ano: 1555 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Maior demonstracao.', obra: 'Sermoes', ano: 1870 },
  ],
  ['Jo 3:16']
);

add('rm', 6, 23, 'Salario e Morte',
  'Consequencias.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Morte espiritual.', obra: 'Comentario a Romanos', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Justica divina.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ['Gn 2:17']
);

add('rm', 8, 1, 'Nao Ha Condenacao',
  'Liberdade.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Liberdade do pecado.', obra: 'Comentario a Romanos', ano: 1555 },
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Justificacao.', obra: 'Comentario a Romanos', ano: 1516 },
  ],
  ['Jo 5:24']
);

add('rm', 8, 28, 'Tudo Contribui Para o Bem',
  'Providencia.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Governos tudo.', obra: 'Comentario a Romanos', ano: 1555 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Nada desperdicado.', obra: 'Sermoes', ano: 1870 },
  ],
  ['Gn 50:20']
);

add('rm', 8, 38, 'Nenhuma Criacao Nos Separara',
  'Amor inabalÃ¡vel.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Seguranca eterna.', obra: 'Comentario a Romanos', ano: 1555 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Nada separa.', obra: 'Sermoes', ano: 1870 },
  ],
  ['Jo 10:27-29']
);

add('rm', 12, 1, 'Oferecei Corpos',
  'Sacrificio vivo.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Adoracao racional.', obra: 'Comentario a Romanos', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Entrega total.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ['1 Pd 2:5']
);

// ====================================================================
// 1 CORINTIOS
// ====================================================================

add('1co', 1, 18, 'Palavra da Cruz',
  'Loucura e poder.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Poder de Deus.', obra: 'Comentario a 1 Corintios', ano: 1555 },
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'A cruz e tudo.', obra: 'Comentario a Glatas', ano: 1516 },
  ],
  ['Gl 6:14']
);

add('1co', 10, 13, 'Fiel e Deus',
  'Tentacao.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Limita tentacao.', obra: 'Comentario a 1 Corintios', ano: 1555 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Sempre ha escape.', obra: 'Sermoes', ano: 1870 },
  ],
  ['Tg 1:13-14']
);

add('1co', 13, 4, 'Amor e Paciente',
  'Definicao do amor.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Maior virtude.', obra: 'Comentario a 1 Corintios', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Caritativo.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ['1 Jo 4:8']
);

add('1co', 15, 3, 'Cristo Morreu Pelos Pecados',
  'Nucleo do evangelho.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Substitutiva.', obra: 'Comentario a 1 Corintios', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Vicaria.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ['Is 53:5']
);

// ====================================================================
// 2 CORINTIOS
// ====================================================================

add('2co', 4, 6, 'Luz do Conhecimento',
  'Revelacao.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Luz na escuridao.', obra: 'Comentario a 2 Corintios', ano: 1555 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Revelacao divina.', obra: 'Sermoes', ano: 1870 },
  ],
  ['Gn 1:3']
);

add('2co', 5, 17, 'Nova Criacao',
  'Transformacao.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Total.', obra: 'Comentario a 2 Corintios', ano: 1555 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Renascimento.', obra: 'Confissoes', ano: 398 },
  ],
  ['Ef 2:10']
);

add('2co', 5, 21, 'Fez Pecado Por Nos',
  'Substituicao.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Tornado pecado.', obra: 'Comentario a 2 Corintios', ano: 1555 },
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Troca maravilhosa.', obra: 'Comentario a Romanos', ano: 1516 },
  ],
  ['Gl 3:13']
);

add('2co', 12, 9, 'Graca Te Basta',
  'Forca na fraqueza.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Bastante.', obra: 'Comentario a 2 Corintios', ano: 1555 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Suficiente.', obra: 'Sermoes', ano: 1870 },
  ],
  ['Fp 4:13']
);

// ====================================================================
// GALATAS
// ====================================================================

add('gl', 2, 16, 'Justificados Pela Fe',
  'Justificacao.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Nao por obras.', obra: 'Comentario a Glatas', ano: 1555 },
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Articulacao do evangelho.', obra: 'Comentario a Glatas', ano: 1535 },
  ],
  ['Rm 3:28']
);

add('gl', 2, 20, 'Cristo Vive em Mim',
  'Vida de fe.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Uniao.', obra: 'Comentario a Glatas', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Vida em Cristo.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ['Fp 1:21']
);

add('gl', 5, 22, 'Frutos do Espirito',
  'Carater.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Obra do Espirito.', obra: 'Comentario a Glatas', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Virtudes infusas.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ['Ef 5:9']
);

// ====================================================================
// EFESIOS
// ====================================================================

add('ef', 2, 1, 'Mortos nos Pecados',
  'Condicao natural.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Espiritualmente mortos.', obra: 'Comentario a Efesios', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Pecado original.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ['Col 2:13']
);

add('ef', 2, 8, 'Pela Graca Salvos',
  'Salvacao.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Pela fe.', obra: 'Comentario a Efesios', ano: 1555 },
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Sola gratia.', obra: 'Comentario a Romanos', ano: 1516 },
  ],
  ['Tt 3:5']
);

add('ef', 2, 10, 'Criados Para Boas Obras',
  'Destino.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Preparados.', obra: 'Comentario a Efesios', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sobrenatural.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ['2 Co 5:17']
);

add('ef', 6, 10, 'Fortalecei-Vos',
  'Armadura de Deus.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Forca divina.', obra: 'Comentario a Efesios', ano: 1555 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Recursos sobrenaturais.', obra: 'Sermoes', ano: 1870 },
  ],
  ['Fp 4:13']
);

// ====================================================================
// FILIPENSES
// ====================================================================

add('fl', 1, 6, 'Deus O Comecou',
  'Seguranca.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Levara a cabo.', obra: 'Comentario a Filipenses', ano: 1555 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Nao abandona.', obra: 'Sermoes', ano: 1870 },
  ],
  ['Fp 2:13']
);

add('fl', 2, 6, 'Forma de Deus',
  'Himno cristologico.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Humilhacao voluntaria.', obra: 'Comentario a Filipenses', ano: 1555 },
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Paradoxo da encarnacao.', obra: 'Church Dogmatics', ano: 1958 },
  ],
  ['Jo 1:14']
);

add('fl', 2, 8, 'Humilhou-Se ate a Morte de Cruz',
  'Obediencia.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Morte vergonhosa.', obra: 'Comentario a Filipenses', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Redencao pela humildade.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ['Hb 5:8']
);

add('fl', 4, 13, 'Posso Todas As Coisas',
  'Forca divina.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Capacitado por Cristo.', obra: 'Comentario a Filipenses', ano: 1555 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Ilimitados.', obra: 'Sermoes', ano: 1870 },
  ],
  ['2 Co 12:9']
);

// ====================================================================
// COLOSSENSES
// ====================================================================

add('cl', 1, 15, 'Imagem do Deus Invisible',
  'Supremacia.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Imagem de Deus.', obra: 'Comentario a Colossenses', ano: 1555 },
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Revelacao suprema.', obra: 'Church Dogmatics', ano: 1958 },
  ],
  ['Jo 1:18', 'Hb 1:3']
);

add('cl', 2, 9, 'Toda a Plenitude',
  'Plenitude divina.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Toda divindade.', obra: 'Comentario a Colossenses', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Plenitude.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ['Jo 1:16']
);

// ====================================================================
// 1 TESSALONICENSES
// ====================================================================

add('1ts', 4, 16, 'Senhor Desce Do Ceus',
  'Segunda vinda.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Pessoal.', obra: 'Comentario a 1 Tessalonicenses', ano: 1555 },
    { teologo: 'Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Esperanca.', obra: 'NT and People of God', ano: 1992 },
  ],
  ['1 Co 15:52']
);

// ====================================================================
// 1 TIMOTEO
// ====================================================================

add('1tm', 2, 5, 'Um SÃ³ Mediator',
  'MediaÃ§Ã£o.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Unico.', obra: 'Comentario a 1 Timoteo', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Divino-humano.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ['Hb 9:15']
);

// ====================================================================
// 2 TIMOTEO
// ====================================================================

add('2tm', 3, 16, 'Escritura Inspirada',
  'Inspiracao.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Infalibilidade.', obra: 'Comentario a 2 Timoteo', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Dictado do Espirito.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ['2 Pd 1:20-21']
);

// ====================================================================
// HEBREUS
// ====================================================================

add('hb', 1, 1, 'Deus Falou Pelos Profetas',
  'Revelacao.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Por etapas.', obra: 'Comentario a Hebreus', ano: 1555 },
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Palavra final e Cristo.', obra: 'Church Dogmatics', ano: 1958 },
  ],
  ['Hb 1:2-3']
);

add('hb', 4, 12, 'Palavra de Deus Viva',
  'Poder da Palavra.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Mais afiada.', obra: 'Comentario a Hebreus', ano: 1555 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Viva e operante.', obra: 'Sermoes', ano: 1870 },
  ],
  ['Sl 119:105']
);

add('hb', 7, 25, 'Sempre Vive Para Interceder',
  'Intercessao eterna.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Perfeita.', obra: 'Comentario a Hebreus', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Continua.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ['Rm 8:34']
);

add('hb', 9, 27, 'Morram Uma SÃ³ Vez',
  'Juizo.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Depois juizo.', obra: 'Comentario a Hebreus', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Apos morte.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ['2 Co 5:10']
);

add('hb', 11, 1, 'Fe e Fundamento',
  'Definicao.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Conviccao invisivel.', obra: 'Comentario a Hebreus', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Habito sobrenatural.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ['Rm 8:24-25']
);

add('hb', 12, 2, 'Olhando Para Jesus',
  'Autor da fe.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Jesus e o centro.', obra: 'Comentario a Hebreus', ano: 1555 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Olhe para Jesus.', obra: 'Sermoes', ano: 1870 },
  ],
  ['Jo 3:14']
);

add('hb', 13, 8, 'Jesus Cristo Ontem e Hoje',
  'Imutabilidade.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'O mesmo sempre.', obra: 'Comentario a Hebreus', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Divina.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ['Ml 3:6']
);

// ====================================================================
// TIAGO
// ====================================================================

add('tg', 1, 2, 'Considerai como Gozo',
  'Provacoes.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Produzem perseveranca.', obra: 'Comentario a Tiago', ano: 1555 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Testes produzem carater.', obra: 'Sermoes', ano: 1870 },
  ],
  ['Rm 5:3-5']
);

add('tg', 1, 17, 'Toda Dadiva Vinda do Alto',
  'Origem divina.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fonte e Deus.', obra: 'Comentario a Tiago', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Proveem de Deus.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ['Tg 1:5']
);

add('tg', 1, 22, 'Praticantes da Palavra',
  'Obediencia.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Nao basta ouvir.', obra: 'Comentario a Tiago', ano: 1555 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Aja.', obra: 'Sermoes', ano: 1870 },
  ],
  ['Mt 7:24-27']
);

add('tg', 2, 14, 'De Que Serve Dizerem Fe?',
  'Fe sem obras.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Morta nao salva.', obra: 'Comentario a Tiago', ano: 1555 },
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Viva produz obras.', obra: 'Comentario a Tiago', ano: 1521 },
  ],
  ['Ef 2:8-10']
);

add('tg', 2, 17, 'Assim Tambem a Fe',
  'FÃ© sem obras e morta.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Opera pelo amor.', obra: 'Comentario a Tiago', ano: 1555 },
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Se manifesta.', obra: 'Comentario a Tiago', ano: 1521 },
  ],
  ['Gl 5:6']
);

add('tg', 2, 24, 'Abraao Creu',
  'Fe justificante.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Demonstrada por obras.', obra: 'Comentario a Tiago', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Atuante.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ['Gn 15:6']
);

// ====================================================================
// 1 PEDRO
// ====================================================================

add('1p', 1, 3, 'Nova Viva Esperanca',
  'Ressurreicao.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Pela ressurreicao.', obra: 'Comentario a 1 Pedro', ano: 1555 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Viva esperanca.', obra: 'Sermoes', ano: 1870 },
  ],
  ['1 Co 15:20']
);

add('1p', 1, 6-7, 'Provacao da Fe',
  'Ouro probado pelo fogo.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Producncia genuina.', obra: 'Comentario a 1 Pedro', ano: 1555 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Fogo purifica.', obra: 'Sermoes', ano: 1870 },
  ],
  ['Tg 1:2-4']
);

add('1p', 1, 18-19, 'Resgatados com Sangue Precioso',
  'Redencao.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Cordeiro sem mancha.', obra: 'Comentario a 1 Pedro', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sacrificio.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ['Ef 1:7']
);

add('1p', 2, 9, 'Linha Escolhida',
  'Novo Israel.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Sacerdotes.', obra: 'Comentario a 1 Pedro', ano: 1555 },
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Testemunha.', obra: 'Church Dogmatics', ano: 1958 },
  ],
  ['Ex 19:5-6']
);

add('1p', 3, 15, 'Estai Sempre Prontos',
  'Defesa da fe.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Com mansidao.', obra: 'Comentario a 1 Pedro', ano: 1555 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Razoes firmes.', obra: 'Sermoes', ano: 1870 },
  ],
  ['2 Tm 2:15']
);

// ====================================================================
// 1 JOAO
// ====================================================================

add('1jo', 1, 1, 'O que Era do Principio',
  'Testemunho ocular.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Verbo de vida.', obra: 'Comentario a 1 Joao', ano: 1555 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Viemos tocar.', obra: 'Tractatus', ano: 416 },
  ],
  ['Jo 1:1']
);

add('1jo', 1, 7, 'Sangue de Jesus',
  'Purificacao.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Purifica continuamente.', obra: 'Comentario a 1 Joao', ano: 1555 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Sangue que lava.', obra: 'Sermoes', ano: 1870 },
  ],
  ['Ef 1:7']
);

add('1jo', 1, 8-9, 'Se Dissermos Que Nao Pecamos',
  'Confissao e perdao.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'PerdÃ£o fiel.', obra: 'Comentario a 1 Joao', ano: 1555 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Justo em perdoar.', obra: 'Tractatus', ano: 416 },
  ],
  ['Sl 32:5']
);

add('1jo', 2, 1, 'Advogado junto ao Pai',
  'Intercessao.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Jesus e propiciacao.', obra: 'Comentario a 1 Joao', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Intercessor.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ['Hb 7:25']
);

add('1jo', 2, 15-17, 'Nao Ameis o Mundo',
  'Perigo do mundo.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Vaidade e passa.', obra: 'Comentario a 1 Joao', ano: 1555 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Fugir da vaidade.', obra: 'Sermoes', ano: 1870 },
  ],
  ['Ec 1:2']
);

add('1jo', 2, 17, 'O Mundo Passa',
  'Temporalidade.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Quem faz vontade permanece.', obra: 'Comentario a 1 Joao', ano: 1555 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Eternidade importa.', obra: 'Sermoes', ano: 1870 },
  ],
  ['Mt 24:35']
);

add('1jo', 3, 1, 'Que Amor Nos Deu',
  'Filhacao divina.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Filhos de Deus.', obra: 'Comentario a 1 Joao', ano: 1555 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Amor imerecido.', obra: 'Tractatus', ano: 416 },
  ],
  ['Jo 1:12']
);

add('1jo', 3, 4, 'Todo o que Peca',
  'Pecado e transgressao.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Violacao da lei.', obra: 'Comentario a 1 Joao', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Inobediencia.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ['Rm 5:13']
);

add('1jo', 3, 8, 'Para Desfazer as Obras do Diabo',
  'Missao de Cristo.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Destruir pecado.', obra: 'Comentario a 1 Joao', ano: 1555 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Vitoria sobre SatanÃ¡s.', obra: 'Sermoes', ano: 1870 },
  ],
  ['Gn 3:15']
);

add('1jo', 3, 16, 'Pelos IrmÃ£os',
  'Amor demonstrado.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Dar a vida.', obra: 'Comentario a 1 Joao', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sacrificio.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ['Jo 15:13']
);

add('1jo', 4, 7-8, 'O Amor e de Deus',
  'Fonte do amor.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Deus e amor.', obra: 'Comentario a 1 Joao', ano: 1555 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Quem nao ama nao conhece.', obra: 'Tractatus', ano: 416 },
  ],
  ['Jo 4:8']
);

add('1jo', 4, 18, 'Nao Ha Medo no Amor',
  'Amor expulsa medo.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Perfeicao do amor.', obra: 'Comentario a 1 Joao', ano: 1555 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Amor remove terror.', obra: 'Sermoes', ano: 1870 },
  ],
  ['2 Tm 1:7']
);

add('1jo', 4, 19, 'NÃ³s O Amamos Porque Ele',
  'Amorå“åº”.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Amor primeiro e dEle.', obra: 'Comentario a 1 Joao', ano: 1555 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Amor que nos antecede.', obra: 'Tractatus', ano: 416 },
  ],
  ['Ef 2:4-5']
);

add('1jo', 5, 1, 'Todo o que CrÃª',
  'Nascimento de Deus.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Nasceu dEle.', obra: 'Comentario a 1 Joao', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Regeneracao.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ['Jo 1:12-13']
);

add('1jo', 5, 11-13, 'Testemunho e Este',
  'Vida eterna presente.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Ja temos vida.', obra: 'Comentario a 1 Joao', ano: 1555 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Seguranca.', obra: 'Sermoes', ano: 1870 },
  ],
  ['Jo 3:36']
);

// ====================================================================
// JUDAS
// ====================================================================

add('jd', 3, 3, 'Contendei Pela Fe',
  'Defesa da fé.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Lutar pela verdade.', obra: 'Comentario a Judas', ano: 1555 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Nao ceder.', obra: 'Sermoes', ano: 1870 },
  ],
  ['Fp 1:27']
);

add('jd', 1, 24, 'Aquele Que Pode Guardar',
  'Seguranca final.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Conduzira a gloria.', obra: 'Comentario a Judas', ano: 1555 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Deus guarda.', obra: 'Sermoes', ano: 1870 },
  ],
  ['Fp 1:6', 'Jd 25']
);

// ====================================================================
// APOCALIPSE
// ====================================================================

add('ap', 1, 7, 'Verao Todo Filho do Homem',
  'Segunda vinda.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Vem com nuvens.', obra: 'Comentario a Apocalipse', ano: 1555 },
    { teologo: 'Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Triunfal.', obra: 'NT and People of God', ano: 1992 },
  ],
  ['Mt 24:30']
);

add('ap', 1, 8, 'Eu Sou o Alfa e o Omega',
  'Eternidade.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Inicio e fim.', obra: 'Comentario a Apocalipse', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Eternidade.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ['Is 44:6']
);

add('ap', 3, 20, 'Eis Eu Estou a Porta',
  'Convite.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Chama e espera.', obra: 'Comentario a Apocalipse', ano: 1555 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Bate e sera aberto.', obra: 'Sermoes', ano: 1870 },
  ],
  ['Lc 12:36']
);

add('ap', 5, 9, 'Matariste e Compraste',
  'Redencao pelo sangue.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Cordeiro imolado.', obra: 'Comentario a Apocalipse', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sacrificio eterno.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ['1 Pd 1:18-19']
);

add('ap', 7, 9, 'Grande Multidao',
  'Igreja glorificada.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Tribos e lingua.', obra: 'Comentario a Apocalipse', ano: 1555 },
    { teologo: 'Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Universalidade.', obra: 'NT and People of God', ano: 1992 },
  ],
  ['Mt 28:19']
);

add('ap', 19, 16, 'Rei dos Reis',
  'Supremacia de Cristo.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Senhor absoluto.', obra: 'Comentario a Apocalipse', ano: 1555 },
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Rei vitorioso.', obra: 'Church Dogmatics', ano: 1958 },
  ],
  ['1 Tm 6:15']
);

add('ap', 21, 1, 'Novos Ceus e Nova Terra',
  'Renovacao cosmica.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Restauracao total.', obra: 'Comentario a Apocalipse', ano: 1555 },
    { teologo: 'Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Nao substituicao, renovacao.', obra: 'NT and People of God', ano: 1992 },
  ],
  ['2 Pd 3:13', 'Is 65:17']
);

add('ap', 21, 3, 'Deus Habita com os Homens',
  'Presenca divina.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Tenda entre nos.', obra: 'Comentario a Apocalipse', ano: 1555 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Cidade de Deus.', obra: 'De Civitate Dei', ano: 426 },
  ],
  ['Ez 37:27']
);

add('ap', 21, 4, 'EnxugarÃ¡ Todas as LÃ¡grimas',
  'Fim do sofrimento.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Morte e dor suprimidas.', obra: 'Comentario a Apocalipse', ano: 1555 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Consolacao eterna.', obra: 'Sermoes', ano: 1870 },
  ],
  ['Is 25:8']
);

add('ap', 22, 20, 'Sim, Venho Logo',
  'Esperanca escatologica.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Vem, Senhor Jesus.', obra: 'Comentario a Apocalipse', ano: 1555 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Espera ativa.', obra: 'Sermoes', ano: 1870 },
  ],
  ['1 Co 16:22']
);

// ====================================================================
// 100 NOVOS COMENTARIOS — VERSICOS IMPORTANTES
// ====================================================================

add('gn', 1, 1, 'No Principio Criou Deus',
  'A frase mais fundacional da Biblia.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Criou do nada por decreto divino.', obra: 'Comentario a Gênesis', ano: 1554 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Deus falou e tudo foi feito.', obra: 'Confissoes', ano: 398 },
  ],
  ['Jo 1:1-3', 'Hb 11:3']
);

add('gn', 1, 3, 'Seja a Luz',
  'Ordem na criacao.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Palavra eficaz.', obra: 'Comentario a Gênesis', ano: 1554 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Ordem cosmica.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ['2 Co 4:6']
);

add('gn', 1, 27, 'A Imagem de Deus',
  'Fundamento da dignidade humana.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Representantes de Deus.', obra: 'Comentario a Gênesis', ano: 1554 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Racionalidade e espiritualidade.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ['Cl 3:10']
);

add('gn', 1, 31, 'Muito Bom',
  'Avaliacao divina da criacao.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Perfeita conforme proposito.', obra: 'Comentario a Gênesis', ano: 1554 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Bela e ordenada.', obra: 'De Genesi ad Litteram', ano: 415 },
  ],
  ['Ec 3:11']
);

add('gn', 3, 15, 'Esmagaras a Cabeca',
  'Proto-evangelho.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Primeira promessa de redencao.', obra: 'Comentario a Gênesis', ano: 1554 },
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Cristo vence Satanás.', obra: 'Comentario a Gênesis', ano: 1535 },
  ],
  ['Gl 4:4', '1 Jo 3:8']
);

add('gn', 6, 5, 'Toda Inclinacao Era Má',
  'Depravacao total.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Corrompido completamente.', obra: 'Comentario a Gênesis', ano: 1554 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Concupiscencia.', obra: 'Confissoes', ano: 398 },
  ],
  ['Rm 3:10-12']
);

add('gn', 12, 3, 'Serás Bendito',
  'Promessa abrahamica.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Blessao universal.', obra: 'Comentario a Gênesis', ano: 1554 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Eleição divina.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ['Gl 3:8-9']
);

add('gn', 15, 6, 'Cred e Lhe Foi Imputada Justica',
  'Justificacao pela fe.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fe sem obras.', obra: 'Comentario a Gênesis', ano: 1554 },
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Articulacao do evangelho.', obra: 'Comentario a Romanos', ano: 1516 },
  ],
  ['Rm 4:3-5']
);

add('gn', 50, 20, 'Vós Pensastes Mal',
  'Providencia divina.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Deus usa ate o pecado.', obra: 'Comentario a Gênesis', ano: 1554 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Permissao divina.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ['Rm 8:28']
);

add('ex', 3, 14, 'EU SOU O QUE SOU',
  'Nome divino.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Autoexistencia.', obra: 'Comentario a Êxodo', ano: 1554 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Essencia divina.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ['Jo 8:58']
);

add('ex', 20, 3, 'Nao Teras Outros Deuses',
  'Primeiro mandamento.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Exclusividade divina.', obra: 'Comentario a Êxodo', ano: 1554 },
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Deus unico.', obra: 'Catecismo Maior', ano: 1529 },
  ],
  ['Dt 6:4-5']
);

add('lv', 16, 34, 'Dia da Expiação',
  'Tipologia sacerdotal.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Expiação definitiva em Cristo.', obra: 'Comentario a Levítico', ano: 1554 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sacrificio vicário.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ['Hb 9:11-14']
);

add('nm', 21, 8-9, 'Serpente de Bronze',
  'Tipo cristológico.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Olhar e viver.', obra: 'Comentario a Números', ano: 1554 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Prefigurava Cristo.', obra: 'Sermoes', ano: 400 },
  ],
  ['Jo 3:14-15']
);

add('dt', 6, 4, 'Ouve, Israel',
  'Shema - credo de Israel.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Unicidade de Deus.', obra: 'Comentario a Deuteronômio', ano: 1554 },
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Resumo da lei.', obra: 'Catecismo Maior', ano: 1529 },
  ],
  ['Mc 12:29-30']
);

add('js', 1, 9, 'Seja Forte e Corajoso',
  'Exortação à obediência.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Deus não falha.', obra: 'Comentario a Josué', ano: 1554 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Deus promete e cumpre.', obra: 'Sermoes', ano: 1870 },
  ],
  ['Dt 31:6']
);

add('jz', 4, 9, 'O Senhor Saiu Contra Sísara',
  'Guerra de Deus.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Juízo divino.', obra: 'Comentario a Juízes', ano: 1554 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Justiça de Deus.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ['Rm 12:19']
);

add('rt', 1, 16, 'Teu Povo Meu Povo',
  'Lealdade de Ruth.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fé em ação.', obra: 'Comentario a Rute', ano: 1554 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Amor fiel.', obra: 'Sermoes', ano: 1870 },
  ],
  ['Mt 1:5']
);

add('1sm', 16, 7, 'Deus Olha ao Coração',
  'Criterio divino.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Coração é decisivo.', obra: 'Comentario a 1 Samuel', ano: 1554 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Interioridade.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ['1 Co 4:5']
);

add('2sm', 7, 14, 'Eu Serei Pai',
  'Aliança davídica.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Cristo é o Filho prometido.', obra: 'Comentario a 2 Samuel', ano: 1554 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Messias.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ['Lc 1:32-33']
);

add('1rs', 8, 11, 'Glória do Senhor',
  'Chekina no templo.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Presença divina.', obra: 'Comentario a 1 Reis', ano: 1554 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Shekinah.', obra: 'De Trinitate', ano: 400 },
  ],
  ['Jo 1:14']
);

add('2cr', 7, 14, 'Se Meu Povo Orar',
  'Promessa de restauração.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Oração e arrependimento.', obra: 'Comentario a 2 Crônicas', ano: 1554 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Revive a nação.', obra: 'Sermoes', ano: 1870 },
  ],
  ['2 Cr 6:26-27']
);

add('ed', 7, 10, 'Coração Preparado',
  'Estudo da Lei.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Estudar e praticar.', obra: 'Comentario a Esdras', ano: 1554 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Meditar na Palavra.', obra: 'Sermoes', ano: 1870 },
  ],
  ['Sl 119:97']
);

add('ne', 8, 10, 'A Alegria do Senhor',
  'Força no regozijo.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Alegria na obediência.', obra: 'Comentario a Neemias', ano: 1554 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Força espiritual.', obra: 'Sermoes', ano: 1870 },
  ],
  ['Fp 4:4']
);

add('et', 4, 14, 'Para tal Tempo',
  'Providencia.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Deus governa a história.', obra: 'Comentario a Ester', ano: 1554 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Providência secreta.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ['Rm 8:28']
);

add('jó', 1, 21, 'O Senhor Deu e O Senhor Tomou',
  'Sofrimento e soberania.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Submissão a vontade divina.', obra: 'Comentario a Jó', ano: 1554 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Paciência.', obra: 'Sermoes', ano: 400 },
  ],
  ['Tg 5:11']
);

add('jó', 19, 25, 'Sei Que o Meu Redentor Vive',
  'Fé em meio ao sofrimento.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Esperança além da morte.', obra: 'Comentario a Jó', ano: 1554 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Confiança inabalável.', obra: 'Sermoes', ano: 1870 },
  ],
  ['1 Co 15:20']
);

add('sl', 2, 1, 'Por Que Se Agridem as Nações',
  'Rebelião contra Deus.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Oposição ao ungido.', obra: 'Comentario aos Salmos', ano: 1554 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Profecia messiânica.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ['At 4:25-28']
);

add('sl', 22, 1, 'Deus Meu, Por Que Me Abandonaste',
  'Citação na cruz.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Sentimento de abandono.', obra: 'Comentario aos Salmos', ano: 1554 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Substituição.', obra: 'Sermoes', ano: 400 },
  ],
  ['Mt 27:46']
);

add('sl', 23, 1, 'O Senhor É o Meu Pastor',
  'Confiança absoluta.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Provisão divina.', obra: 'Comentario aos Salmos', ano: 1554 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Nada falta.', obra: 'Treasury of David', ano: 1885 },
  ],
  ['Jo 10:11']
);

add('sl', 51, 10, 'Cria Em Mim Um Coração Puro',
  'Arrependimento profundo.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Renovação interior.', obra: 'Comentario aos Salmos', ano: 1554 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Regeneração.', obra: 'Confissoes', ano: 398 },
  ],
  ['2 Co 5:17']
);

add('sl', 119, 105, 'Lâmpada Para os Meus Pés',
  'Direção divina.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Guia infalível.', obra: 'Comentario aos Salmos', ano: 1554 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Luz na escuridão.', obra: 'Treasury of David', ano: 1885 },
  ],
  ['2 Tm 3:16-17']
);

add('pv', 3, 5-6, 'Confia No Senhor',
  'Dependência de Deus.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Não confiar em si mesmo.', obra: 'Comentario a Provérbios', ano: 1554 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Ele endireitará os caminhos.', obra: 'Sermoes', ano: 1870 },
  ],
  ['Pv 16:3']
);

add('pv', 9, 10, 'Princípio da Sabedoria',
  'Temor do Senhor.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fundamento do conhecimento.', obra: 'Comentario a Provérbios', ano: 1554 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Reverência.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ['Sl 111:10']
);

add('ec', 12, 13, 'Teme a Deus',
  'Conclusão de Eclesiastes.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Resumo de tudo.', obra: 'Comentario a Eclesiastes', ano: 1554 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Sentido da vida.', obra: 'Sermoes', ano: 1870 },
  ],
  ['Dt 6:2']
);

add('cn', 8, 6, 'Firme É O Amor',
  'Amor mais forte que a morte.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Inquebrantável.', obra: 'Comentario ao Cântico', ano: 1554 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Cristo e Igreja.', obra: 'Tractatus', ano: 416 },
  ],
  ['Rm 8:38-39']
);

add('is', 7, 14, 'Virgem Conceberá',
  'Profecia messiânica.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Sinal divino.', obra: 'Comentario a Isaías', ano: 1554 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Encarnação.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ['Mt 1:22-23']
);

add('is', 9, 6, 'Um Menino Nos Nasceu',
  'Príncipe da Paz.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Conselheiro eterno.', obra: 'Comentario a Isaías', ano: 1554 },
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Deus conosco.', obra: 'Sermoes', ano: 1532 },
  ],
  ['Mt 1:23']
);

add('is', 53, 5, 'Ferido Pelos Nossos Pecados',
  'Substituição penal.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Castigo sobre ele.', obra: 'Comentario a Isaías', ano: 1554 },
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Mudança maravilhosa.', obra: 'Sermoes', ano: 1526 },
  ],
  ['1 Pd 2:24']
);

add('is', 61, 1, 'Espírito do Senhor Sobre Mim',
  'Missão messiânica.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Libertar cativos.', obra: 'Comentario a Isaías', ano: 1554 },
    { teologo: 'Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Reino inaugurado.', obra: 'NT and People of God', ano: 1992 },
  ],
  ['Lc 4:18-19']
);

add('jr', 29, 11, 'Planos de Paz',
  'Promessa de futuro.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Esperança em exílio.', obra: 'Comentario a Jeremias', ano: 1554 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Planos de bem.', obra: 'Sermoes', ano: 1870 },
  ],
  ['Rm 8:28']
);

add('lm', 3, 22-23, 'Misericórdias se Renovam',
  'Esperança no juízo.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fidelidade divina.', obra: 'Comentario a Lamentações', ano: 1554 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Nova a cada manhã.', obra: 'Sermoes', ano: 1870 },
  ],
  ['Lm 3:25']
);

add('ez', 37, 5, 'Viverão Os Ossos',
  'Visão dos ossos secos.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Ressurreição de Israel.', obra: 'Comentario a Ezequiel', ano: 1554 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Poder divino.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ['Rm 4:17']
);

add('dn', 2, 44, 'Deus Erguerá Um Reino',
  'Profecia escatológica.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Reino eterno.', obra: 'Comentario a Daniel', ano: 1554 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Reino messiânico.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ['Lc 1:33']
);

add('dn', 7, 13, 'Filho do Homem Vem',
  'Aparição celestial.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Exaltado.', obra: 'Comentario a Daniel', ano: 1554 },
    { teologo: 'Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Senhorio universal.', obra: 'NT and People of God', ano: 1992 },
  ],
  ['Mt 26:64']
);

add('os', 11, 8, 'Como Te Entregarei, Efraim',
  'Amor persistente.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Deus não desiste.', obra: 'Comentario a Oséias', ano: 1554 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Amor que não cansa.', obra: 'Sermoes', ano: 1870 },
  ],
  ['Rm 5:8']
);

add('am', 5, 24, 'Corra a Justiça',
  'Justiça social.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Justiça e misericórdia.', obra: 'Comentario a Amós', ano: 1554 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Moral social.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ['Mc 12:31']
);

add('mc', 1, 15, 'O Reino de Deus Está Próximo',
  'Pregação de Jesus.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Inauguração do reino.', obra: 'Comentario a Marcos', ano: 1555 },
    { teologo: 'Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Deus assumindo governo.', obra: 'NT and People of God', ano: 1992 },
  ],
  ['Mt 4:17']
);

add('mt', 5, 3, 'Bem-Aventurados os Pobres',
  'Primeira bem-aventurança.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Pobres de espírito.', obra: 'Comentario a Mateus', ano: 1555 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Humildes.', obra: 'De Doctrina Christiana', ano: 397 },
  ],
  ['Lc 6:20']
);

add('mt', 6, 9, 'Pai Nosso',
  'Modelo de oração.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Paternidade divina.', obra: 'Comentario a Mateus', ano: 1555 },
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Pai misericordioso.', obra: 'Catecismo Menor', ano: 1529 },
  ],
  ['Lc 11:1-4']
);

add('mt', 16, 18, 'Edificarei a Minha Igreja',
  'Promessa da igreja.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Cristo é fundamento.', obra: 'Comentario a Mateus', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Pedro como rocha.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ['Ef 2:20']
);

add('mt', 28, 19, 'Fazei Discípulos',
  'Grande comissão.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Missão universal.', obra: 'Comentario a Mateus', ano: 1555 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Mandamento final.', obra: 'Sermoes', ano: 1870 },
  ],
  ['Mc 16:15']
);

add('mc', 10, 45, 'Filho do Homem Para Servir',
  'Missão sacrificial.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Dar a vida.', obra: 'Comentario a Marcos', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Resgate.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ['Mt 20:28']
);

add('lc', 2, 14, 'Gloria a Deus Nas Alturas',
  'Canto angelical.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Paz aos homens de boa vontade.', obra: 'Comentario a Lucas', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Glorificação.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ['Mt 28:18']
);

add('lc', 15, 7, 'Alegria no Céu',
  'Valor da alma.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Cada pecador é importante.', obra: 'Comentario a Lucas', ano: 1555 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Celestial celebração.', obra: 'Sermoes', ano: 1870 },
  ],
  ['Lc 15:10']
);

add('jo', 1, 12, 'Deu-lhes Poder',
  'Filiação divina.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Receber é crer.', obra: 'Comentario a João', ano: 1555 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Adoção.', obra: 'Tractatus', ano: 416 },
  ],
  ['Rm 8:15-16']
);

add('jo', 8, 36, 'O Filho Libertar',
  'Liberdade cristã.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Verdadeira liberdade.', obra: 'Comentario a João', ano: 1555 },
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Liberdade do cristão.', obra: 'Sobre a Liberdade do Cristão', ano: 1520 },
  ],
  ['Gl 5:1']
);

add('jo', 10, 28, 'Ninguém As Arrebata',
  'Segurança do crente.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Eterna segurança.', obra: 'Comentario a João', ano: 1555 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Mãos de Deus.', obra: 'Sermoes', ano: 1870 },
  ],
  ['Rm 8:38-39']
);

add('at', 1, 8, 'Recebereis Poder',
  'Promessa do Espírito.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Capacitação divina.', obra: 'Comentario a Atos', ano: 1555 },
    { teologo: 'Wright', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Testemunho global.', obra: 'NT and People of God', ano: 1992 },
  ],
  ['Lc 24:49']
);

add('at', 4, 12, 'Nenhuma Outra Salvação',
  'Exclusividade de Cristo.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Unico nome.', obra: 'Comentario a Atos', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Mediação divina.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ['Jo 14:6']
);

add('at', 9, 5, 'Quem És Tu, Senhor',
  'Conversão de Paulo.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Revelação pessoal.', obra: 'Comentario a Atos', ano: 1555 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Graça transformadora.', obra: 'Confissoes', ano: 398 },
  ],
  ['1 Tm 1:15']
);

add('rm', 3, 28, 'Justificados Pela Fé',
  'Doutrina da justificação.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Sola fide.', obra: 'Comentario a Romanos', ano: 1555 },
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Articulação do evangelho.', obra: 'Comentario a Romanos', ano: 1516 },
  ],
  ['Ef 2:8-9']
);

add('rm', 5, 1, 'Justificados, Temos Paz',
  'Resultado da justificação.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Paz com Deus.', obra: 'Comentario a Romanos', ano: 1555 },
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Reconciliação.', obra: 'Comentario a Romanos', ano: 1516 },
  ],
  ['2 Co 5:18-19']
);

add('rm', 6, 14, 'Não Sobre a Lei',
  'Liberdade da lei.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Graça reina.', obra: 'Comentario a Romanos', ano: 1555 },
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Liberdade do evangelho.', obra: 'Comentario a Glatas', ano: 1535 },
  ],
  ['Gl 5:1']
);

add('rm', 7, 12, 'Sagrada a Lei',
  'Bondade da lei.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Justa e boa.', obra: 'Comentario a Romanos', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Ordem natural.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ['Sl 19:7-8']
);

add('rm', 8, 26, 'O Espírito Intercede',
  'Oração com o Espírito.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Ajuda na fraqueza.', obra: 'Comentario a Romanos', ano: 1555 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Ajudador celestial.', obra: 'Sermoes', ano: 1870 },
  ],
  ['Ef 6:18']
);

add('rm', 8, 29, 'Conformados à Imagem',
  'Propósito da eleição.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Santificação.', obra: 'Comentario a Romanos', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Participação da natureza divina.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ['2 Pd 1:4']
);

add('1co', 2, 2, 'Não Me Propus Saber',
  'Cristo crucificado.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Cruz é tudo.', obra: 'Comentario a 1 Coríntios', ano: 1555 },
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Teologia da cruz.', obra: 'Sermoes', ano: 1519 },
  ],
  ['Gl 6:14']
);

add('1co', 6, 19, 'Templo do Espírito',
  'Santidade do corpo.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Habitáculo divino.', obra: 'Comentario a 1 Coríntios', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Santidade.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ['2 Co 6:16']
);

add('1co', 12, 13, 'Um Só Corpo',
  'Unidade dos crentes.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Batismo no Espírito.', obra: 'Comentario a 1 Coríntios', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Misticismo corporal.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ['Ef 4:4-6']
);

add('1co', 15, 55, 'Ó Morte, Onde Está a Tua Vitória',
  'Triunfo sobre a morte.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Vitória completa.', obra: 'Comentario a 1 Coríntios', ano: 1555 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Derrota do último inimigo.', obra: 'Sermoes', ano: 1870 },
  ],
  ['2 Tm 1:10']
);

add('2co', 5, 17, 'Nova Criatura',
  'Transformação total.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Coisas novas.', obra: 'Comentario a 2 Coríntios', ano: 1555 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Regeneração.', obra: 'Confissoes', ano: 398 },
  ],
  ['Ef 2:10']
);

add('2co', 12, 9, 'Minha Graça Te Basta',
  'Força na fraqueza.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Perfeita na fraqueza.', obra: 'Comentario a 2 Coríntios', ano: 1555 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Suficiência divina.', obra: 'Sermoes', ano: 1870 },
  ],
  ['Fp 4:13']
);

add('gl', 2, 20, 'Cristo Vive em Mim',
  'Vida de fé.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'União com Cristo.', obra: 'Comentario a Gálatas', ano: 1555 },
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Simul iustus et peccator.', obra: 'Comentario a Glatas', ano: 1535 },
  ],
  ['Fp 1:21']
);

add('gl', 5, 1, 'Para a Liberdade Libertados',
  'Liberdade cristã.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Firme no evangelho.', obra: 'Comentario a Gálatas', ano: 1555 },
    { teologo: 'Lutero', periodo: 'reforma', tradicao: 'luterana', texto: 'Liberdade do cristão.', obra: 'Comentario a Glatas', ano: 1535 },
  ],
  ['Jo 8:36']
);

add('ef', 1, 7, 'Redenção pelo Sangue',
  'Preço da salvação.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Perdão completo.', obra: 'Comentario a Efésios', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Propiciação.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ['1 Pd 1:18-19']
);

add('ef', 2, 14, 'Ele É a Nossa Paz',
  'Reconciliação.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Muro derrubado.', obra: 'Comentario a Efésios', ano: 1555 },
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Reconciliação universal.', obra: 'Church Dogmatics', ano: 1958 },
  ],
  ['Cl 1:20']
);

add('ef', 5, 25, 'Cristo Amou a Igreja',
  'Amor sacrificial.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Deu-se por ela.', obra: 'Comentario a Efésios', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Misticismo nupcial.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ['Jo 15:13']
);

add('fp', 4, 6, 'Não vos Anxieis',
  'Oração contra a ansiedade.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Suplica e ações de graças.', obra: 'Comentario a Filipenses', ano: 1555 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Paz de Deus.', obra: 'Sermoes', ano: 1870 },
  ],
  ['1 Pd 5:7']
);

add('fp', 4, 13, 'Posso Todas as Coisas',
  'Força divina.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Capacitado por Cristo.', obra: 'Comentario a Filipenses', ano: 1555 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Ilimitados.', obra: 'Sermoes', ano: 1870 },
  ],
  ['2 Co 12:9']
);

add('cl', 3, 23, 'Tudo Para Glória de Deus',
  'Trabalho como adoração.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Senhor.', obra: 'Comentario a Colossenses', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Vocação.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ['1 Co 10:31']
);

add('1ts', 5, 16-18, 'Alegria-voi Sempre',
  'Vida de gratidão.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Mandamentos práticos.', obra: 'Comentario a 1 Tessalonicenses', ano: 1555 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Sempre alegres.', obra: 'Sermoes', ano: 1870 },
  ],
  ['Fp 4:4']
);

add('1tm', 6, 10, 'Amor ao Dinheiro',
  'Raiz de todos os males.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Tentação.', obra: 'Comentario a 1 Timóteo', ano: 1555 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Perigo.', obra: 'Sermoes', ano: 1870 },
  ],
  ['Mt 6:24']
);

add('2tm', 2, 15, 'Dispense Bem a Palavra',
  'Ministério fiel.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Sem envergonhar-se.', obra: 'Comentario a 2 Timóteo', ano: 1555 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Estudo sério.', obra: 'Sermoes', ano: 1870 },
  ],
  ['2 Co 5:20']
);

add('2tm', 4, 7, 'Combati o Bom Combate',
  'Fidelidade até o fim.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Coroa da justiça.', obra: 'Comentario a 2 Timóteo', ano: 1555 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Vitória.', obra: 'Sermoes', ano: 1870 },
  ],
  ['Fp 3:14']
);

add('tt', 3, 5, 'Salvos pela Renovação',
  'Regeneração.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Banho de regeneração.', obra: 'Comentario a Tito', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Batismo.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ['Jo 3:5']
);

add('hb', 1, 3, 'Sustenta Todas as Coisas',
  'Sovereania de Cristo.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Preservação universal.', obra: 'Comentario a Hebreus', ano: 1555 },
    { teologo: 'Barth', periodo: 'contemporaneo', tradicao: 'reformada', texto: 'Senhorio.', obra: 'Church Dogmatics', ano: 1958 },
  ],
  ['Cl 1:17']
);

add('hb', 4, 15, 'Sentimos os Nossos Sofridos',
  'Compasão de Cristo.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Sem pecado.', obra: 'Comentario a Hebreus', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Experiência humana.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ['Tg 2:13']
);

add('hb', 9, 22, 'Sem Derramamento de Sangue',
  'Base da aliança.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Perdão pelo sangue.', obra: 'Comentario a Hebreus', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Sacrificio.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ['Ef 1:7']
);

add('hb', 10, 24, 'Meditemos Uns nos Outros',
  'Comunhão.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Amor em ação.', obra: 'Comentario a Hebreus', ano: 1555 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Edificação mútua.', obra: 'Sermoes', ano: 1870 },
  ],
  ['Gl 6:2']
);

add('hb', 11, 6, 'Sem Fé É Impossível',
  'Requisito da relação com Deus.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Agradá-Lo.', obra: 'Comentario a Hebreus', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Hábito sobrenatural.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ['Rm 14:23']
);

add('tg', 1, 5, 'Peça Com Fé',
  'Oração de fé.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Generosidade divina.', obra: 'Comentario a Tiago', ano: 1555 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Deus dá liberalmente.', obra: 'Sermoes', ano: 1870 },
  ],
  ['Mt 7:7-8']
);

add('tg', 4, 7, 'Resisti ao Diabo',
  'Batalha espiritual.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fugir e resistir.', obra: 'Comentario a Tiago', ano: 1555 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Firmeza.', obra: 'Sermoes', ano: 1870 },
  ],
  ['Ef 6:10-18']
);

add('1p', 3, 18, 'Cristo Morreu Uma Só Vez',
  'Sacrificio único.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Justo pelos injustos.', obra: 'Comentario a 1 Pedro', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Substituição.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ['Hb 9:26-28']
);

add('1p', 5, 8, 'O Diabo Anda Feroz',
  'Vigilância espiritual.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Adversário ativo.', obra: 'Comentario a 1 Pedro', ano: 1555 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Sempre alerta.', obra: 'Sermoes', ano: 1870 },
  ],
  ['Ef 6:12']
);

add('2p', 1, 10, 'Fazei Firme a Vossa Vocação',
  'Segurança pela santificação.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Confirmar a eleição.', obra: 'Comentario a 2 Pedro', ano: 1555 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Diligência.', obra: 'Sermoes', ano: 1870 },
  ],
  ['2 Tm 1:12']
);

add('2p', 3, 9, 'O Senhor É Paciente',
  'Paciência divina.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Não quer que pereça.', obra: 'Comentario a 2 Pedro', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Misericórdia.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ['Rm 2:4']
);

add('1jo', 4, 8, 'Deus É Amor',
  'Essência divina.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fonte de amor.', obra: 'Comentario a 1 João', ano: 1555 },
    { teologo: 'Agostinho', periodo: 'patristico', tradicao: 'catolica', texto: 'Amor que se comunica.', obra: 'De Trinitate', ano: 400 },
  ],
  ['Jo 3:16']
);

add('1jo', 5, 3, 'Estes São os Mandamentos',
  'Obediência e amor.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Amar é obedecer.', obra: 'Comentario a 1 João', ano: 1555 },
    { teologo: 'Tomas de Aquino', periodo: 'medieval', tradicao: 'catolica', texto: 'Observância.', obra: 'Suma Teologica', ano: 1274 },
  ],
  ['Jo 14:15']
);

add('jd', 1, 24, 'A Que Pode Guardar',
  'Proteção divina.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Guarda perfeita.', obra: 'Comentario a Judas', ano: 1555 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Sem tropeços.', obra: 'Sermoes', ano: 1870 },
  ],
  ['Fp 1:6']
);

add('ap', 3, 20, 'Eis Eu à Porta e Bato',
  'Convite pessoal.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Busca paciente.', obra: 'Comentario a Apocalipse', ano: 1555 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Cristo bate.', obra: 'Sermoes', ano: 1870 },
  ],
  ['Jo 10:16']
);

add('ap', 21, 4, 'Enxugará Todas as Lágrimas',
  'Esperança final.',
  [
    { teologo: 'Calvino', periodo: 'reforma', tradicao: 'reformada', texto: 'Fim da dor.', obra: 'Comentario a Apocalipse', ano: 1555 },
    { teologo: 'Spurgeon', periodo: 'moderno', tradicao: 'bautista', texto: 'Consolação eterna.', obra: 'Sermoes', ano: 1870 },
  ],
  ['Is 25:8']
);

export default comentariosNovos;
export { comentariosNovos };

