export interface VersiculoDestaque {
  referencia: string;
  texto: string;
  tema: 'fe' | 'amor' | 'esperanca' | 'forca' | 'paz' | 'sabedoria' | 'graca' | 'louvor' | 'oracao' | 'justica' | 'consolo' | 'promessa';
  epoca: 'manha' | 'tarde' | 'noite' | 'qualquer';
  estacao: 'primavera' | ' verao' | 'outono' | 'inverno' | 'qualquer';
}

export const versiculosDestaque: VersiculoDestaque[] = [
  // ── FÉ ──
  { referencia: 'Hebreus 11:1', texto: 'Ora, a fé é o firme fundamento das coisas que se esperam, e a prova das coisas que se não veem.', tema: 'fe', epoca: 'qualquer', estacao: 'qualquer' },
  { referencia: 'Romanos 10:17', texto: 'Assim, a fé é pelo ouvir, e o ouvir pela palavra de Deus.', tema: 'fe', epoca: 'manha', estacao: 'qualquer' },
  { referencia: 'Marcos 11:22', texto: 'E Jesus, respondendo, disse-lhes: Tende fé em Deus.', tema: 'fe', epoca: 'qualquer', estacao: 'qualquer' },
  { referencia: '2 Coríntios 5:7', texto: 'Porque andamos na fé, e não pela vista.', tema: 'fe', epoca: 'qualquer', estacao: 'qualquer' },
  { referencia: 'Gálatas 2:20', texto: 'Já não sou eu que vivo, mas Cristo vive em mim. E se eu vivo na terra, vivo pela fé no Filho de Deus, que me amou e a si mesmo se entregou por mim.', tema: 'fe', epoca: 'qualquer', estacao: 'qualquer' },
  { referencia: 'Hebreus 11:6', texto: 'Mas sem fé é impossível agradar-lhe; porque é mister que se chegue a Deus aquele que a ele se aproxima, crendo que ele existe, e que é galardoador dos que o buscam.', tema: 'fe', epoca: 'manha', estacao: 'qualquer' },
  { referencia: 'Romanos 1:17', texto: 'Porque no evangelho se revela a justiça de Deus, de fé em fé; como está escrito: Mas o justo viverá pela fé.', tema: 'fe', epoca: 'qualquer', estacao: 'qualquer' },
  { referencia: 'Tiago 2:17', texto: 'Assim também a fé, se não tiver obras, é morta em si mesma.', tema: 'fe', epoca: 'qualquer', estacao: 'qualquer' },

  // ── AMOR ──
  { referencia: 'João 3:16', texto: 'Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.', tema: 'amor', epoca: 'qualquer', estacao: 'qualquer' },
  { referencia: '1 João 4:8', texto: 'Aquele que não ama não conhece a Deus; porque Deus é amor.', tema: 'amor', epoca: 'qualquer', estacao: 'qualquer' },
  { referencia: '1 Coríntios 13:4', texto: 'O amor é sofredor, é benigno; o amor não é invejoso; o amor não se vangloria, não se ensoberbece.', tema: 'amor', epoca: 'qualquer', estacao: 'qualquer' },
  { referencia: '1 João 4:19', texto: 'Nós o amamos a ele, porque ele nos amou primeiro.', tema: 'amor', epoca: 'manha', estacao: 'qualquer' },
  { referencia: 'Romanos 8:38-39', texto: 'Porque eu estou certo de que, nem a morte, nem a vida, nem os anjos, nem os principados, nem os poderes, nem o presente, nem o porvir, nem a altura, nem a profundidade, nem alguma outra criatura nos poderá separar do amor de Deus, que está em Cristo Jesus nosso Senhor.', tema: 'amor', epoca: 'noite', estacao: 'qualquer' },
  { referencia: 'Efésios 3:17-18', texto: 'Para que Cristo habite pela fé nos vossos corações; para que, estando arraigados e fundados em amor, possais compreender, com todos os santos, qual é a largura, o comprimento, a altura e a profundidade.', tema: 'amor', epoca: 'qualquer', estacao: 'qualquer' },
  { referencia: 'Cantares 8:6', texto: 'Põe-me como selo sobre o teu coração, como selo sobre o teu braço; porque o amor é forte como a morte; a sua paixão é incendiosa como a chama do Senhor.', tema: 'amor', epoca: 'noite', estacao: 'outono' },
  { referencia: '1 Pedro 4:8', texto: 'Acima de tudo, porém, tende amor entre vós; porque o amor cobre a multidão dos pecados.', tema: 'amor', epoca: 'qualquer', estacao: 'qualquer' },

  // ── ESPERANÇA ──
  { referencia: 'Jeremias 29:11', texto: 'Porque eu bem sei os pensamentos que penso de vós, diz o Senhor; pensamentos de paz, e não de mal, para vos dar o fim que esperais.', tema: 'esperanca', epoca: 'qualquer', estacao: 'qualquer' },
  { referencia: 'Romanos 15:13', texto: 'Ora o Deus de esperança vos encha de todo o gozo e paz em crença, para que abundeis em esperança pela virtude do Espírito Santo.', tema: 'esperanca', epoca: 'manha', estacao: 'primavera' },
  { referencia: 'Isaías 40:31', texto: 'Mas os que esperam no Senhor renovarão as forças; subirão com asas como águias; correrão, e não se cansarão; andarão, e não se fatigarão.', tema: 'esperanca', epoca: 'manha', estacao: 'qualquer' },
  { referencia: 'Salmos 37:4', texto: 'Deleita-te também no Senhor, e ele te concederá os desejos do teu coração.', tema: 'esperanca', epoca: 'qualquer', estacao: 'qualquer' },
  { referencia: 'Lamentações 3:22-23', texto: 'As misericórdias do Senhor são a causa de não sermos consumidos; as suas misericórdias são novas a cada manhã. Grande é a tua fidelidade.', tema: 'esperanca', epoca: 'manha', estacao: 'qualquer' },
  { referencia: 'Efésios 1:18', texto: 'Para que ilumine os olhos do vosso entendimento, para que saibais qual é a esperança a que ele vos chama.', tema: 'esperanca', epoca: 'qualquer', estacao: 'qualquer' },

  // ── FORÇA ──
  { referencia: 'Filipenses 4:13', texto: 'Posso todas as coisas naquele que me fortalece.', tema: 'forca', epoca: 'qualquer', estacao: 'qualquer' },
  { referencia: 'Isaías 41:10', texto: 'Não temas, porque eu sou contigo; não te assombres, porque eu sou teu Deus; eu te fortaleço, e te ajudo, e te sustento com a destra da minha justiça.', tema: 'forca', epoca: 'qualquer', estacao: 'qualquer' },
  { referencia: 'Josué 1:9', texto: 'Não to mandei eu? Esforça-te e tem bom ânimo; não pasmes, nem te espantes; porque o Senhor teu Deus é contigo, por onde quer que andares.', tema: 'forca', epoca: 'manha', estacao: 'qualquer' },
  { referencia: '2 Timóteo 1:7', texto: 'Porque Deus não nos deu o espírito de temor, mas de fortaleza, e de amor, e de moderação.', tema: 'forca', epoca: 'qualquer', estacao: 'qualquer' },
  { referencia: 'Efésios 6:10', texto: 'No demais, irmãos meus, fortalecei-vos no Senhor e na força do seu poder.', tema: 'forca', epoca: 'manha', estacao: 'qualquer' },
  { referencia: 'Salmos 46:1', texto: 'Deus é o nosso refúgio e força, socorro bem presente na angústia.', tema: 'forca', epoca: 'qualquer', estacao: 'qualquer' },
  { referencia: '2 Coríntios 12:9', texto: 'Mas ele me disse: A minha graça é suficiente para ti, porque o meu poder se aperfeiçoa na fraqueza. Portanto, de boa vontade me gloriarei nas minhas fraquezas, para que em mim habite o poder de Cristo.', tema: 'forca', epoca: 'noite', estacao: 'qualquer' },
  { referencia: 'Salmos 18:2', texto: 'O Senhor é o meu rochedo, e o meu fortress, e o meu libertador; o meu Deus, a minha rocha, em quem me refugio; o meu escudo, e o corno da minha salvação, e o meu refúgio.', tema: 'forca', epoca: 'noite', estacao: 'inverno' },

  // ── PAZ ──
  { referencia: 'João 14:27', texto: 'Deixo-vos a paz, a minha paz vos dou; não vo-la dou como o mundo a dá. Não se turbe o vosso coração, nem se atemorize.', tema: 'paz', epoca: 'noite', estacao: 'qualquer' },
  { referencia: 'Filipenses 4:6-7', texto: 'Não estejais inquietos por coisa alguma; antes as vossas petições sejam em tudo conhecidas diante de Deus pela oração e súplica, com ação de graças. E a paz de Deus, que excede todo o entendimento, guardará os vossos corações e os vossos sentimentos em Cristo Jesus.', tema: 'paz', epoca: 'noite', estacao: 'qualquer' },
  { referencia: 'Isaías 26:3', texto: 'Tu guardarás em completa paz aquele cujo pensamento em ti persevera; porque em ti confia.', tema: 'paz', epoca: 'noite', estacao: 'qualquer' },
  { referencia: 'Salmos 46:10', texto: 'Aquietai-vos, e sabei que eu sou Deus; serei exaltado entre os gentios; serei exaltado sobre a terra.', tema: 'paz', epoca: 'qualquer', estacao: 'qualquer' },
  { referencia: 'Mateus 5:9', texto: 'Bem-aventurados os pacificadores, porque eles serão chamados filhos de Deus.', tema: 'paz', epoca: 'qualquer', estacao: 'qualquer' },
  { referencia: 'Colossenses 3:15', texto: 'E a paz de Deus, para a qual também fostes chamados em um corpo, domine em vossos corações; e sede agradecidos.', tema: 'paz', epoca: 'tarde', estacao: 'qualquer' },

  // ── SABEDORIA ──
  { referencia: 'Provérbios 3:5-6', texto: 'Confia no Senhor de todo o teu coração, e não te estribes no teu próprio entendimento. Reconhece-o em todos os teus caminhos, e ele endireitará as tuas veredas.', tema: 'sabedoria', epoca: 'qualquer', estacao: 'qualquer' },
  { referencia: 'Tiago 1:5', texto: 'E, se algum de vós tem falta de sabedoria, peça-a a Deus, que a todos dá liberalmente, e o não lança em rosto; e ser-lhe-á dada.', tema: 'sabedoria', epoca: 'manha', estacao: 'qualquer' },
  { referencia: 'Provérbios 9:10', texto: 'O princípio da sabedoria é o temor do Senhor; e o conhecimento do Santo é prudência.', tema: 'sabedoria', epoca: 'manha', estacao: 'qualquer' },
  { referencia: 'Provérbios 4:7', texto: 'A sabedoria é a coisa principal; adquire pois a sabedoria; sim, com tudo o que possuis adquire o entendimento.', tema: 'sabedoria', epoca: 'qualquer', estacao: 'qualquer' },
  { referencia: 'Colossenses 3:16', texto: 'Habite em vós riquezamente a palavra de Cristo; instruí-vos e admoestai-vos uns aos outros, em toda a sabedoria, cantando salmos, hinos e canções espirituais, com gratidão, nos vossos corações a Deus.', tema: 'sabedoria', epoca: 'qualquer', estacao: 'qualquer' },
  { referencia: 'Efésios 5:15-16', texto: 'Vede, pois, que procedeis com cuidado, não como insensatos, mas como sábios, resgatando o tempo, porque os dias são maus.', tema: 'sabedoria', epoca: 'qualquer', estacao: 'qualquer' },

  // ── GRAÇA ──
  { referencia: 'Efésios 2:8-9', texto: 'Porque pela graça sois salvos, por meio da fé; e isto não vem de vós, é dom de Deus. Não vem das obras, para que ninguém se glorie.', tema: 'graca', epoca: 'qualquer', estacao: 'qualquer' },
  { referencia: 'Romanos 3:23-24', texto: 'Porque todos pecaram e destituídos estão da glória de Deus, sendo justificados gratuitamente pela sua graça, pela redenção que há em Cristo Jesus.', tema: 'graca', epoca: 'qualquer', estacao: 'qualquer' },
  { referencia: '2 Coríntios 12:9', texto: 'Mas ele me disse: A minha graça é suficiente para ti, porque o meu poder se aperfeiçoa na fraqueza.', tema: 'graca', epoca: 'qualquer', estacao: 'qualquer' },
  { referencia: 'Romanos 5:8', texto: 'Mas Deus prova o seu amor para conosco em que Cristo morreu por nós, sendo nós ainda pecadores.', tema: 'graca', epoca: 'qualquer', estacao: 'qualquer' },
  { referencia: 'Tito 2:11', texto: 'Porque a graça de Deus se há manifestado, trazendo salvação a todos os homens.', tema: 'graca', epoca: 'manha', estacao: 'qualquer' },

  // ── LOUVOR ──
  { referencia: 'Salmos 150:6', texto: 'Tudo o que tem fôlego louve ao Senhor. Louvai ao Senhor.', tema: 'louvor', epoca: 'manha', estacao: 'qualquer' },
  { referencia: 'Salmos 100:1-2', texto: 'Aclamai ao Senhor, toda a terra. Servi ao Senhor com júbilo; apresentai-vos perante ele com alegria.', tema: 'louvor', epoca: 'manha', estacao: 'qualquer' },
  { referencia: 'Salmos 150:1', texto: 'Louvai ao Senhor no seu santuário; louvai-o no firmamento do seu poder.', tema: 'louvor', epoca: 'qualquer', estacao: 'qualquer' },
  { referencia: 'Colossenses 3:16', texto: 'Habite em vós riquezamente a palavra de Cristo; instruí-vos e admoestai-vos uns aos outros, em toda a sabedoria, cantando salmos, hinos e canções espirituais.', tema: 'louvor', epoca: 'qualquer', estacao: 'qualquer' },
  { referencia: 'Salmos 34:1', texto: 'Bendirei ao Senhor em todo o tempo; o seu louvor estará continuamente na minha boca.', tema: 'louvor', epoca: 'qualquer', estacao: 'qualquer' },

  // ── ORAÇÃO ──
  { referencia: '1 Tessalonicenses 5:16-18', texto: 'Regozijai-vos sempre. Orai sem cessar. Em tudo dai graças, porque esta é a vontade de Deus em Cristo Jesus para convosco.', tema: 'oracao', epoca: 'qualquer', estacao: 'qualquer' },
  { referencia: 'Mateus 7:7', texto: 'Pedir-se-vos-á, e dar-se-vos-á; buscai, e achareis; batei, e ser-vos-á aberto.', tema: 'oracao', epoca: 'manha', estacao: 'qualquer' },
  { referencia: 'Filipenses 4:6', texto: 'Não estejais inquietos por coisa alguma; antes as vossas petições sejam em tudo conhecidas diante de Deus pela oração e súplica, com ação de graças.', tema: 'oracao', epoca: 'qualquer', estacao: 'qualquer' },
  { referencia: 'Jeremias 33:3', texto: 'Clama a mim, e responder-te-ei, e anunciar-te-ei coisas grandes e firmes, que não sabes.', tema: 'oracao', epoca: 'manha', estacao: 'qualquer' },
  { referencia: 'Salmos 50:15', texto: 'Invoca-me no dia da angústia; eu te livrarei, e tu me glorificarás.', tema: 'oracao', epoca: 'noite', estacao: 'qualquer' },

  // ── JUSTIÇA ──
  { referencia: 'Romanos 12:2', texto: 'E não sede conformados com este século, mas transformados pela renovamento da vossa mente, para que experimenteis qual seja a boa, agradável e perfeita vontade de Deus.', tema: 'justica', epoca: 'qualquer', estacao: 'qualquer' },
  { referencia: 'Miquéias 6:8', texto: 'Ele te declarou, ó homem, o que é bom; e que é o que o Senhor pede de ti, senão que pratiques a justiça, e ames a beneficência, e andes humildemente com o teu Deus?', tema: 'justica', epoca: 'qualquer', estacao: 'qualquer' },
  { referencia: 'Amós 5:24', texto: 'Mas corra a justiça como águia, e a eqüidade como ribeiro perene.', tema: 'justica', epoca: 'qualquer', estacao: 'qualquer' },
  { referencia: 'Isaías 1:17', texto: 'Aprendei a fazer o bem; buscai a justiça, refreai o opressor, fazei justiça ao órfão, pleiteai com a viúva.', tema: 'justica', epoca: 'qualquer', estacao: 'qualquer' },

  // ── CONSOLAÇÃO ──
  { referencia: 'Mateus 11:28', texto: 'Vinde a mim, todos os que estais cansados e oprimidos, e eu vos aliviarei.', tema: 'consolo', epoca: 'noite', estacao: 'qualquer' },
  { referencia: 'Salmos 34:18', texto: 'O Senhor está perto dos que têm o coração quebrantado, e salva os de espírito contrito.', tema: 'consolo', epoca: 'noite', estacao: 'inverno' },
  { referencia: '2 Coríntios 1:3-4', texto: 'Bendito seja o Deus e Pai de nosso Senhor Jesus Cristo, o Pai das misericórdias e o Deus de toda a consolação, que nos consola em todas as nossas aflições.', tema: 'consolo', epoca: 'noite', estacao: 'qualquer' },
  { referencia: 'Salmos 23:4', texto: 'Ainda que eu andasse pelo vale da sombra da morte, não temeria mal algum, porque tu estás comigo; a tua vara e o teu cajado me consolam.', tema: 'consolo', epoca: 'noite', estacao: 'qualquer' },
  { referencia: 'Apocalipse 21:4', texto: 'E enxugará toda a lágrima dos seus olhos; e a morte não haverá mais, nem haverá mais luto, nem clamor, nem dor; porque já as primeiras coisas passaram.', tema: 'consolo', epoca: 'noite', estacao: 'qualquer' },

  // ── PROMESSA ──
  { referencia: 'Salmos 91:1-2', texto: 'Aquele que habita no esconderijo do Altíssimo, à sombra do Onipotente descansará. Direi do Senhor: Ele é o meu Deus, o meu refúgio, a minha fortaleza, e nele confiarei.', tema: 'promessa', epoca: 'noite', estacao: 'qualquer' },
  { referencia: 'Isaías 54:10', texto: 'Porque os montes podem remover-se, e os outeiros podem abalar-se, mas o meu amor não se apartará de ti, nem a minha aliança da paz se abalará, diz o Senhor, que de ti se compadece.', tema: 'promessa', epoca: 'qualquer', estacao: 'qualquer' },
  { referencia: 'João 14:2-3', texto: 'Na casa de meu Pai há muitas moradas; se não fosse assim, eu vo-lo teria dito; porque vou preparar-vos um lugar. E, quando eu for preparar-vos o lugar, virei outra vez, e vos levarei para mim mesmo.', tema: 'promessa', epoca: 'noite', estacao: 'qualquer' },
  { referencia: 'Romanos 8:28', texto: 'E sabemos que todas as coisas contribuem juntamente para o bem daqueles que amam a Deus, daqueles que são chamados segundo o seu propósito.', tema: 'promessa', epoca: 'qualquer', estacao: 'qualquer' },
  { referencia: 'Apocalipse 3:20', texto: 'Eis que estou à porta, e bato; se alguém ouvir a minha voz, e abrir a porta, entrarei para ele, e com ele cearei, e ele comigo.', tema: 'promessa', epoca: 'qualquer', estacao: 'qualquer' },
];

export const TEMAS_INFO: Record<string, { label: string; cor: string; emoji: string; gradient: string }> = {
  fe: { label: 'Fé', cor: 'bg-blue-500/10 text-blue-600 border-blue-500/20', emoji: '✝️', gradient: 'from-blue-500/20 via-blue-600/10 to-transparent' },
  amor: { label: 'Amor', cor: 'bg-rose-500/10 text-rose-600 border-rose-500/20', emoji: '❤️', gradient: 'from-rose-500/20 via-rose-600/10 to-transparent' },
  esperanca: { label: 'Esperança', cor: 'bg-amber-500/10 text-amber-600 border-amber-500/20', emoji: '🌅', gradient: 'from-amber-500/20 via-amber-600/10 to-transparent' },
  forca: { label: 'Força', cor: 'bg-red-500/10 text-red-600 border-red-500/20', emoji: '💪', gradient: 'from-red-500/20 via-red-600/10 to-transparent' },
  paz: { label: 'Paz', cor: 'bg-teal-500/10 text-teal-600 border-teal-500/20', emoji: '🕊️', gradient: 'from-teal-500/20 via-teal-600/10 to-transparent' },
  sabedoria: { label: 'Sabedoria', cor: 'bg-violet-500/10 text-violet-600 border-violet-500/20', emoji: '📖', gradient: 'from-violet-500/20 via-violet-600/10 to-transparent' },
  graca: { label: 'Graça', cor: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20', emoji: '✨', gradient: 'from-emerald-500/20 via-emerald-600/10 to-transparent' },
  louvor: { label: 'Louvor', cor: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20', emoji: '🎵', gradient: 'from-yellow-500/20 via-yellow-600/10 to-transparent' },
  oracao: { label: 'Oração', cor: 'bg-indigo-500/10 text-indigo-600 border-indigo-500/20', emoji: '🙏', gradient: 'from-indigo-500/20 via-indigo-600/10 to-transparent' },
  justica: { label: 'Justiça', cor: 'bg-orange-500/10 text-orange-600 border-orange-500/20', emoji: '⚖️', gradient: 'from-orange-500/20 via-orange-600/10 to-transparent' },
  consolo: { label: 'Consolo', cor: 'bg-sky-500/10 text-sky-600 border-sky-500/20', emoji: '💙', gradient: 'from-sky-500/20 via-sky-600/10 to-transparent' },
  promessa: { label: 'Promessa', cor: 'bg-purple-500/10 text-purple-600 border-purple-500/20', emoji: '🌟', gradient: 'from-purple-500/20 via-purple-600/10 to-transparent' },
};

export function getVersiculoDoDia(): VersiculoDestaque {
  const hoje = new Date();
  const inicio = new Date(hoje.getFullYear(), 0, 0);
  const diaDoAno = Math.floor((hoje.getTime() - inicio.getTime()) / (1000 * 60 * 60 * 24));
  const idx = (diaDoAno - 1) % versiculosDestaque.length;
  return versiculosDestaque[idx];
}

export function getVersiculoPorEpoca(): VersiculoDestaque {
  const hora = new Date().getHours();
  let epoca: VersiculoDestaque['epoca'];
  if (hora >= 5 && hora < 12) epoca = 'manha';
  else if (hora >= 12 && hora < 18) epoca = 'tarde';
  else epoca = 'noite';

  const filtrados = versiculosDestaque.filter(v => v.epoca === epoca || v.epoca === 'qualquer');
  const hoje = new Date();
  const inicio = new Date(hoje.getFullYear(), 0, 0);
  const diaDoAno = Math.floor((hoje.getTime() - inicio.getTime()) / (1000 * 60 * 60 * 24));
  const idx = (diaDoAno - 1) % filtrados.length;
  return filtrados[idx];
}

export function getVersiculoAleatorio(): VersiculoDestaque {
  return versiculosDestaque[Math.floor(Math.random() * versiculosDestaque.length)];
}

export function getVersiculosPorTema(tema: VersiculoDestaque['tema']): VersiculoDestaque[] {
  return versiculosDestaque.filter(v => v.tema === tema);
}
