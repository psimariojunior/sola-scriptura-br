// Script para pré-gerar áudio TTS de alta qualidade (Microsoft Neural)
// para os versículos mais importantes da Bíblia.
//
// Estes arquivos são commitados ao git e servidos como static files,
// permitindo reprodução instantânea sem dependência de servidor.

import { EdgeTTS } from 'node-edge-tts';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'audio');

interface Versiculo {
  livro: string;
  capitulo: number;
  versiculo: number;
  texto: string;
  traducao: string;
}

// Traduções PT-BR para os versículos mais conhecidos
const TRADUCOES: Array<'arc' | 'nvi' | 'naa' | 'ara'> = ['arc', 'nvi'];

// Vozes neurais do Microsoft Edge
const VOZ_FEMININA = 'pt-BR-FranciscaNeural';
const VOZ_MASCULINA = 'pt-BR-AntonioNeural';

// Versículos mais importantes (favoritos + citados com frequência)
const VERSICULOS_PRINCIPAIS: Versiculo[] = [
  // Gênesis 1
  { livro: 'gn', capitulo: 1, versiculo: 1, texto: 'No princípio Deus criou os céus e a terra.', traducao: 'arc' },
  // Salmos
  { livro: 'sl', capitulo: 23, versiculo: 1, texto: 'O Senhor é o meu pastor, nada me faltará.', traducao: 'arc' },
  { livro: 'sl', capitulo: 23, versiculo: 4, texto: 'Ainda que eu ande pelo vale da sombra da morte, não temerei mal algum, porque tu estás comigo.', traducao: 'arc' },
  { livro: 'sl', capitulo: 46, versiculo: 1, texto: 'Deus é o nosso refúgio e fortaleza, socorro bem presente na angústia.', traducao: 'arc' },
  { livro: 'sl', capitulo: 91, versiculo: 1, texto: 'Aquele que habita no esconderijo do Altíssimo, à sombra do Onipotente descansará.', traducao: 'arc' },
  { livro: 'sl', capitulo: 91, versiculo: 11, texto: 'Porque aos seus anjos dará ordem a teu respeito, para te guardarem em todos os teus caminhos.', traducao: 'arc' },
  { livro: 'sl', capitulo: 100, versiculo: 1, texto: 'Celebrai com júbilo ao Senhor, todas as terras.', traducao: 'arc' },
  { livro: 'sl', capitulo: 103, versiculo: 1, texto: 'Bendize, ó minha alma, ao Senhor, e tudo o que há em mim bendiga o seu santo nome.', traducao: 'arc' },
  { livro: 'sl', capitulo: 121, versiculo: 1, texto: 'Elevo os meus olhos para os montes; de onde me virá o socorro?', traducao: 'arc' },
  { livro: 'sl', capitulo: 121, versiculo: 7, texto: 'O Senhor te guardará de todo o mal; ele guardará a tua alma.', traducao: 'arc' },
  { livro: 'sl', capitulo: 127, versiculo: 1, texto: 'Se o Senhor não edificar a casa, em vão trabalham os que a edificam.', traducao: 'arc' },
  { livro: 'sl', capitulo: 139, versiculo: 1, texto: 'Senhor, tu me sondas e me conheces.', traducao: 'arc' },
  { livro: 'sl', capitulo: 145, versiculo: 1, texto: 'Eu te exaltarei, ó Deus, rei meu, e bendirei o teu nome para todo o sempre.', traducao: 'arc' },
  // Provérbios
  { livro: 'pv', capitulo: 3, versiculo: 5, texto: 'Confia no Senhor de todo o teu coração e não te estribes no teu próprio entendimento.', traducao: 'arc' },
  { livro: 'pv', capitulo: 3, versiculo: 6, texto: 'Reconhece-o em todos os teus caminhos, e ele endireitará as tuas veredas.', traducao: 'arc' },
  { livro: 'pv', capitulo: 16, versiculo: 3, texto: 'Confia no Senhor e faze o bem; habitarás na terra e te alimentarás da sua fidelidade.', traducao: 'arc' },
  { livro: 'pv', capitulo: 22, versiculo: 6, texto: 'Instrui o menino no caminho em que deve andar, e até quando envelhecer não se desviará dele.', traducao: 'arc' },
  // Isaías
  { livro: 'is', capitulo: 9, versiculo: 6, texto: 'Porque um menino nos nasceu, um filho se nos deu, e o principado está sobre os seus ombros.', traducao: 'arc' },
  { livro: 'is', capitulo: 40, versiculo: 31, texto: 'Mas os que esperam no Senhor renovarão as suas forças; subirão com asas como águias.', traducao: 'arc' },
  { livro: 'is', capitulo: 41, versiculo: 10, texto: 'Não temas, porque eu sou contigo; não te assombres, porque eu sou o teu Deus.', traducao: 'arc' },
  { livro: 'is', capitulo: 53, versiculo: 5, texto: 'Mas ele foi ferido pelas nossas transgressões e moído pelas nossas iniquidades.', traducao: 'arc' },
  // Jeremias
  { livro: 'jr', capitulo: 29, versiculo: 11, texto: 'Porque eu bem sei os pensamentos que penso de vós, diz o Senhor, pensamentos de paz e não de mal, para vos dar o fim que esperais.', traducao: 'arc' },
  { livro: 'jr', capitulo: 33, versiculo: 3, texto: 'Clama a mim, e responder-te-ei, e anunciar-te-ei coisas grandes e firmes que não sabes.', traducao: 'arc' },
  // Mateus
  { livro: 'mt', capitulo: 1, versiculo: 23, texto: 'Eis que uma virgem conceberá e dará à luz um filho, e o seu nome será Emanuel.', traducao: 'arc' },
  { livro: 'mt', capitulo: 5, versiculo: 14, texto: 'Vós sois a luz do mundo; não se pode esconder uma cidade edificada sobre um monte.', traducao: 'arc' },
  { livro: 'mt', capitulo: 6, versiculo: 33, texto: 'Mas buscai primeiro o reino de Deus e a sua justiça, e todas estas coisas vos serão acrescentadas.', traducao: 'arc' },
  { livro: 'mt', capitulo: 11, versiculo: 28, texto: 'Vinde a mim, todos os que estais cansados e sobrecarregados, e eu vos aliviarei.', traducao: 'arc' },
  // João
  { livro: 'jo', capitulo: 1, versiculo: 1, texto: 'No princípio era o Verbo, e o Verbo estava com Deus, e o Verbo era Deus.', traducao: 'arc' },
  { livro: 'jo', capitulo: 1, versiculo: 14, texto: 'E o Verbo se fez carne e habitou entre nós, e vimos a sua glória.', traducao: 'arc' },
  { livro: 'jo', capitulo: 3, versiculo: 16, texto: 'Porque Deus amou ao mundo de tal maneira que deu o seu Filho unigênito, para que todo o que nele crê não pereça, mas tenha a vida eterna.', traducao: 'arc' },
  { livro: 'jo', capitulo: 8, versiculo: 12, texto: 'Eu sou a luz do mundo; quem me segue não andará em trevas, mas terá a luz da vida.', traducao: 'arc' },
  { livro: 'jo', capitulo: 8, versiculo: 32, texto: 'E conhecereis a verdade, e a verdade vos libertará.', traducao: 'arc' },
  { livro: 'jo', capitulo: 10, versiculo: 10, texto: 'Eu vim para que tenham vida e a tenham com abundância.', traducao: 'arc' },
  { livro: 'jo', capitulo: 11, versiculo: 25, texto: 'Eu sou a ressurreição e a vida; quem crê em mim, ainda que morra, viverá.', traducao: 'arc' },
  { livro: 'jo', capitulo: 14, versiculo: 1, texto: 'Não se turbe o vosso coração; credes em Deus, crede também em mim.', traducao: 'arc' },
  { livro: 'jo', capitulo: 14, versiculo: 6, texto: 'Eu sou o caminho, a verdade e a vida; ninguém vem ao Pai senão por mim.', traducao: 'arc' },
  { livro: 'jo', capitulo: 14, versiculo: 27, texto: 'A paz vos deixo, a minha paz vos dou; não se turbe o vosso coração, nem se atemorize.', traducao: 'arc' },
  { livro: 'jo', capitulo: 15, versiculo: 5, texto: 'Eu sou a videira, vós sois as varas; quem permanece em mim, e eu nele, esse dá muito fruto.', traducao: 'arc' },
  { livro: 'jo', capitulo: 15, versiculo: 13, texto: 'Ninguém tem maior amor do que aquele que dá a sua vida pelos seus amigos.', traducao: 'arc' },
  // Atos
  { livro: 'at', capitulo: 1, versiculo: 8, texto: 'Mas recebereis a virtude do Espírito Santo, que há de vir sobre vós, e ser-me-eis testemunhas.', traducao: 'arc' },
  // Romanos
  { livro: 'rm', capitulo: 1, versiculo: 16, texto: 'Porque não me envergonho do evangelho de Cristo, pois é o poder de Deus para salvação de todo aquele que crê.', traducao: 'arc' },
  { livro: 'rm', capitulo: 5, versiculo: 8, texto: 'Mas Deus prova o seu amor para conosco, em que, quando éramos ainda pecadores, Cristo morreu por nós.', traducao: 'arc' },
  { livro: 'rm', capitulo: 6, versiculo: 23, texto: 'Porque o salário do pecado é a morte, mas o dom gratuito de Deus é a vida eterna em Cristo Jesus, nosso Senhor.', traducao: 'arc' },
  { livro: 'rm', capitulo: 8, versiculo: 28, texto: 'E sabemos que todas as coisas contribuem juntamente para o bem daqueles que amam a Deus.', traducao: 'arc' },
  { livro: 'rm', capitulo: 8, versiculo: 31, texto: 'Que diremos, pois, a estas coisas? Se Deus é por nós, quem será contra nós?', traducao: 'arc' },
  { livro: 'rm', capitulo: 8, versiculo: 38, texto: 'Porque estou certo de que nem a morte, nem a vida, nem os anjos, nem os principados, nem as potestades nos poderá separar do amor de Deus.', traducao: 'arc' },
  { livro: 'rm', capitulo: 12, versiculo: 2, texto: 'E não vos conformeis com este mundo, mas transformaí-vos pela renovação do vosso entendimento.', traducao: 'arc' },
  // 1 Coríntios
  { livro: '1co', capitulo: 13, versiculo: 4, texto: 'O amor é sofredor, é benigno; o amor não é invejoso; o amor não trata com leviandade.', traducao: 'arc' },
  { livro: '1co', capitulo: 13, versiculo: 7, texto: 'Tudo sofre, tudo crê, tudo espera, tudo suporta.', traducao: 'arc' },
  { livro: '1co', capitulo: 13, versiculo: 13, texto: 'Agora, pois, permanecem a fé, a esperança e o amor, estes três; mas o maior destes é o amor.', traducao: 'arc' },
  // Gálatas
  { livro: 'gl', capitulo: 2, versiculo: 20, texto: 'Estou crucificado com Cristo; logo, já não vivo eu, mas vive Cristo em mim.', traducao: 'arc' },
  { livro: 'gl', capitulo: 5, versiculo: 22, texto: 'Mas o fruto do Espírito é amor, gozo, paz, longanimidade, benignidade, bondade, fidelidade, mansidão, temperança.', traducao: 'arc' },
  // Efésios
  { livro: 'ef', capitulo: 2, versiculo: 8, texto: 'Porque pela graça sois salvos, mediante a fé; e isto não vem de vós; é dom de Deus.', traducao: 'arc' },
  { livro: 'ef', capitulo: 2, versiculo: 10, texto: 'Porque somos feitura dele, criados em Cristo Jesus para boas obras.', traducao: 'arc' },
  { livro: 'ef', capitulo: 6, versiculo: 10, texto: 'Finalmente, fortalecei-vos no Senhor e na força do seu poder.', traducao: 'arc' },
  // Filipenses
  { livro: 'fp', capitulo: 4, versiculo: 6, texto: 'Não estejais inquietos por coisa alguma; antes, as vossas petições sejam em tudo conhecidas diante de Deus, pela oração e súplicas.', traducao: 'arc' },
  { livro: 'fp', capitulo: 4, versiculo: 13, texto: 'Posso todas as coisas naquele que me fortalece.', traducao: 'arc' },
  // Colossenses
  { livro: 'cl', capitulo: 3, versiculo: 23, texto: 'E tudo quanto fizerdes, fazei-o de todo o coração, como ao Senhor, e não aos homens.', traducao: 'arc' },
  // 1 Tessalonicenses
  { livro: '1ts', capitulo: 5, versiculo: 16, texto: 'Regozijai-vos sempre. Orai sem cessar. Em tudo dai graças.', traducao: 'arc' },
  // 2 Timóteo
  { livro: '2tm', capitulo: 1, versiculo: 7, texto: 'Porque Deus não nos deu o espírito de temor, mas de fortaleza, e de amor, e de sobriedade.', traducao: 'arc' },
  // Hebreus
  { livro: 'hb', capitulo: 11, versiculo: 1, texto: 'Ora, a fé é a certeza daquilo que se espera e a prova das coisas que não se vêem.', traducao: 'arc' },
  { livro: 'hb', capitulo: 12, versiculo: 2, texto: 'Olhando para Jesus, autor e consumador da fé, o qual, pelo gozo que lhe estava proposto, suportou a cruz.', traducao: 'arc' },
  { livro: 'hb', capitulo: 13, versiculo: 5, texto: 'Não te desampares, e não te desamparei. Sê forte e corajoso.', traducao: 'arc' },
  { livro: 'hb', capitulo: 13, versiculo: 8, texto: 'Jesus Cristo é o mesmo ontem, hoje e eternamente.', traducao: 'arc' },
  // Tiago
  { livro: 'tg', capitulo: 1, versiculo: 5, texto: 'E, se algum de vós tem falta de sabedoria, peça-a a Deus, que a todos dá liberalmente.', traducao: 'arc' },
  { livro: 'tg', capitulo: 1, versiculo: 22, texto: 'Mas sede praticantes da palavra e não somente ouvintes, enganando-vos a vós mesmos.', traducao: 'arc' },
  // 1 Pedro
  { livro: '1pd', capitulo: 5, versiculo: 7, texto: 'Lançando sobre ele toda a vossa ansiedade, porque ele tem cuidado de vós.', traducao: 'arc' },
  // 1 João
  { livro: '1jo', capitulo: 4, versiculo: 8, texto: 'Aquele que não ama não conhece a Deus, porque Deus é amor.', traducao: 'arc' },
  { livro: '1jo', capitulo: 4, versiculo: 19, texto: 'Nós o amamos porque ele nos amou primeiro.', traducao: 'arc' },
  // Apocalipse
  { livro: 'ap', capitulo: 3, versiculo: 20, texto: 'Eis que estou à porta e bato; se alguém ouvir a minha voz e abrir a porta, entrarei em sua casa.', traducao: 'arc' },
  { livro: 'ap', capitulo: 21, versiculo: 4, texto: 'E Deus limpará de seus olhos toda a lágrima; e não haverá mais morte, nem pranto, nem clamor, nem dor.', traducao: 'arc' },

  // ============ GÊNESIS 1-3 ============
  { livro: 'gn', capitulo: 1, versiculo: 2, texto: 'E a terra era sem forma e vazia; e havia trevas sobre a face do abismo; e o Espírito de Deus se movia sobre a face das águas.', traducao: 'arc' },
  { livro: 'gn', capitulo: 1, versiculo: 3, texto: 'E disse Deus: Haja luz; e houve luz.', traducao: 'arc' },
  { livro: 'gn', capitulo: 1, versiculo: 4, texto: 'E viu Deus que a luz era boa; e fez Deus a separação entre a luz e as trevas.', traducao: 'arc' },
  { livro: 'gn', capitulo: 1, versiculo: 7, texto: 'E fez Deus a expansão, e fez separação entre as águas que estavam debaixo da expansão e as águas que estavam sobre a expansão; e assim foi.', traducao: 'arc' },
  { livro: 'gn', capitulo: 1, versiculo: 9, texto: 'E disse Deus: Ajuntem-se as águas debaixo dos céus num lugar, e apareça a terra seca; e assim foi.', traducao: 'arc' },
  { livro: 'gn', capitulo: 1, versiculo: 11, texto: 'E disse Deus: Produza a terra erva verde, erva que dê semente, e árvore frutífera que dê fruto segundo a sua espécie, cuja semente esteja nela sobre a terra; e assim foi.', traducao: 'arc' },
  { livro: 'gn', capitulo: 1, versiculo: 14, texto: 'E disse Deus: Haja luminares na expansão dos céus, para fazer separação entre o dia e a noite; e sejam eles para sinais e para tempos determinados e para dias e anos.', traducao: 'arc' },
  { livro: 'gn', capitulo: 1, versiculo: 16, texto: 'E fez Deus os dois grandes luminares: o luminar maior para governar o dia, e o luminar menor para governar a noite; e fez as estrelas.', traducao: 'arc' },
  { livro: 'gn', capitulo: 1, versiculo: 20, texto: 'E disse Deus: Produzam as águas abundantemente répteis de alma vivente; e voem as aves sobre a face da expansão dos céus.', traducao: 'arc' },
  { livro: 'gn', capitulo: 1, versiculo: 24, texto: 'E disse Deus: Produza a terra alma vivente segundo a sua espécie; gado, e répteis, e bestas da terra segundo a sua espécie; e assim foi.', traducao: 'arc' },
  { livro: 'gn', capitulo: 1, versiculo: 26, texto: 'E disse Deus: Façamos o homem à nossa imagem, conforme a nossa semelhança; e domine sobre os peixes do mar, e sobre as aves dos céus, e sobre o gado, e sobre toda a terra, e sobre todo o réptil que se move sobre a terra.', traducao: 'arc' },
  { livro: 'gn', capitulo: 1, versiculo: 27, texto: 'E criou Deus o homem à sua imagem; à imagem de Deus o criou; homem e mulher os criou.', traducao: 'arc' },
  { livro: 'gn', capitulo: 1, versiculo: 28, texto: 'E Deus os abençoou, e Deus lhes disse: Frutificai e multiplicai-vos, e enchei a terra, e sujeitai-a; e dominai sobre os peixes do mar e sobre as aves dos céus, e sobre todo o animal que se move sobre a terra.', traducao: 'arc' },
  { livro: 'gn', capitulo: 1, versiculo: 29, texto: 'E disse Deus: Eis que vos tenho dado toda a erva que dá semente, que está sobre a face de toda a terra, e toda a árvore, em que há fruto que dá semente, ser-vos-á para mantimento.', traducao: 'arc' },
  { livro: 'gn', capitulo: 1, versiculo: 31, texto: 'E viu Deus tudo quanto tinha feito, e eis que era muito bom; e foi a tarde e a manhã, o dia sexto.', traducao: 'arc' },
  { livro: 'gn', capitulo: 2, versiculo: 1, texto: 'Assim os céus, a terra e todo o seu exército foram acabados.', traducao: 'arc' },
  { livro: 'gn', capitulo: 2, versiculo: 2, texto: 'E havendo Deus acabado no dia sétimo a obra que fizera, descansou no sétimo dia de toda a sua obra, que tinha feito.', traducao: 'arc' },
  { livro: 'gn', capitulo: 2, versiculo: 3, texto: 'E abençoou Deus o dia sétimo, e o santificou; porque nele descansou de toda a sua obra que Deus criara e fizera.', traducao: 'arc' },
  { livro: 'gn', capitulo: 2, versiculo: 7, texto: 'E formou o Senhor Deus o homem do pó da terra, e soprou em suas narinas o fôlego da vida; e o homem became alma vivente.', traducao: 'arc' },
  { livro: 'gn', capitulo: 2, versiculo: 8, texto: 'E plantou o Senhor Deus um jardim no Éden, do lado oriental; e pôs ali o homem que tinha formado.', traducao: 'arc' },
  { livro: 'gn', capitulo: 2, versiculo: 9, texto: 'E o Senhor Deus fez brotar da terra toda a árvore agradável à vista e boa para comida; e a árvore da vida no meio do jardim, e a árvore do conhecimento do bem e do mal.', traducao: 'arc' },
  { livro: 'gn', capitulo: 2, versiculo: 15, texto: 'E tomou o Senhor Deus o homem, e o pôs no jardim do Éden para o lavrar e o guardar.', traducao: 'arc' },
  { livro: 'gn', capitulo: 2, versiculo: 16, texto: 'E ordenou o Senhor Deus ao homem, dizendo: De toda a árvore do jardim comerás livremente,', traducao: 'arc' },
  { livro: 'gn', capitulo: 2, versiculo: 17, texto: 'Mas da árvore do conhecimento do bem e do mal, dela não comerás; porque no dia em que dela comeres, certamente morrerás.', traducao: 'arc' },
  { livro: 'gn', capitulo: 2, versiculo: 18, texto: 'E disse o Senhor Deus: Não é bom que o homem esteja só; far-lhe-ei uma ajudadora que esteja perante ele.', traducao: 'arc' },
  { livro: 'gn', capitulo: 2, versiculo: 21, texto: 'Então o Senhor Deus fez cair um sono pesado sobre Adão, e este adormeceu; e tomou uma das suas costelas, e cerrou a carne em seu lugar;', traducao: 'arc' },
  { livro: 'gn', capitulo: 2, versiculo: 22, texto: 'E da costela que o Senhor Deus tomou do homem, fez uma mulher, e trouxe-a a Adão.', traducao: 'arc' },
  { livro: 'gn', capitulo: 2, versiculo: 24, texto: 'Por isso deixará o homem o seu pai e a sua mãe, e apegar-se-á à sua mulher, e serão ambos uma carne.', traducao: 'arc' },
  { livro: 'gn', capitulo: 2, versiculo: 25, texto: 'E estavam ambos nus, o homem e a sua mulher; e não se envergonhavam.', traducao: 'arc' },
  { livro: 'gn', capitulo: 3, versiculo: 1, texto: 'Ora, a serpente era mais astuta que todas as alimárias do campo que o Senhor Deus tinha feito. E esta disse à mulher: É assim que Deus disse: Não comereis de toda a árvore do jardim?', traducao: 'arc' },
  { livro: 'gn', capitulo: 3, versiculo: 6, texto: 'Vendo a mulher que a árvore era boa para se comer, e agradável aos olhos, e árvore desejável para dar entendimento, tomou do seu fruto, e comeu, e deu também a seu marido, e ele comeu com ela.', traducao: 'arc' },
  { livro: 'gn', capitulo: 3, versiculo: 8, texto: 'E ouviram a voz do Senhor Deus, que passeava no jardim pela viração do dia; e escondeu-se Adão e sua mulher da presença do Senhor Deus, entre as árvores do jardim.', traducao: 'arc' },
  { livro: 'gn', capitulo: 3, versiculo: 9, texto: 'E chamou o Senhor Deus a Adão, e disse-lhe: Onde estás?', traducao: 'arc' },
  { livro: 'gn', capitulo: 3, versiculo: 12, texto: 'E disse Adão: A mulher que me deste por companheira, ela me deu da árvore, e comi.', traducao: 'arc' },
  { livro: 'gn', capitulo: 3, versiculo: 13, texto: 'Então disse o Senhor Deus à mulher: Que é isto que fizeste? E disse a mulher: A serpente me enganou, e eu comi.', traducao: 'arc' },
  { livro: 'gn', capitulo: 3, versiculo: 14, texto: 'E o Senhor Deus disse à serpente: Porquanto fizeste isto, maldita serás entre todas as alimárias e entre todos os animais do campo; sobre o teu ventre andarás, e pó comerás todos os dias da tua vida.', traducao: 'arc' },
  { livro: 'gn', capitulo: 3, versiculo: 15, texto: 'E porei inimizade entre ti e a mulher, e entre a tua semente e a sua semente; esta te ferirá a cabeça, e tu lhe ferirás o calcanhar.', traducao: 'arc' },
  { livro: 'gn', capitulo: 3, versiculo: 16, texto: 'E à mulher disse: Multiplicarei grandemente a tua dor, e a tua conceição; com dor darás à luz filhos; e o teu desejo será para o teu marido, e ele te dominará.', traducao: 'arc' },
  { livro: 'gn', capitulo: 3, versiculo: 17, texto: 'E a Adão disse: Porquanto deste ouvidos à voz de tua mulher, e comeste da árvore de que te ordenei, dizendo: Não comerás dela, maldita é a terra por causa de ti; com dor comerás dela todos os dias da tua vida.', traducao: 'arc' },
  { livro: 'gn', capitulo: 3, versiculo: 19, texto: 'No suor do teu rosto comerás o teu pão, até que te tornes à terra; porque dela foste tomado; porquanto és pó, e ao pó tornarás.', traducao: 'arc' },
  { livro: 'gn', capitulo: 3, versiculo: 23, texto: 'Portanto o Senhor Deus o lançou fora do jardim do Éden, para lavrar a terra, de que fora tomado.', traducao: 'arc' },
  { livro: 'gn', capitulo: 3, versiculo: 24, texto: 'E havendo lançado fora o homem, pôs querubins ao oriente do jardim do Éden, e uma espada inflamada que andava ao redor, para guardar o caminho da árvore da vida.', traducao: 'arc' },

  // ============ ÊXODO 20 (10 Mandamentos) ============
  { livro: 'ex', capitulo: 20, versiculo: 1, texto: 'Então falou Deus todas estas palavras, dizendo:', traducao: 'arc' },
  { livro: 'ex', capitulo: 20, versiculo: 2, texto: 'Eu sou o Senhor teu Deus, que te tirei da terra do Egito, da casa da servidão.', traducao: 'arc' },
  { livro: 'ex', capitulo: 20, versiculo: 3, texto: 'Não terás outros deuses diante de mim.', traducao: 'arc' },
  { livro: 'ex', capitulo: 20, versiculo: 4, texto: 'Não farás para ti imagem de escultura, nem semelhança alguma do que há em cima no céu, nem em baixo na terra, nem nas águas debaixo da terra.', traducao: 'arc' },
  { livro: 'ex', capitulo: 20, versiculo: 5, texto: 'Não te encurvarás a elas, nem as servirás; porque eu, o Senhor teu Deus, sou Deus zeloso, que visito a iniquidade dos pais nos filhos, até à terceira e quarta geração daqueles que me odeiam.', traducao: 'arc' },
  { livro: 'ex', capitulo: 20, versiculo: 6, texto: 'E faço misericórdia a milhares dos que me amam e guardam os meus mandamentos.', traducao: 'arc' },
  { livro: 'ex', capitulo: 20, versiculo: 7, texto: 'Não tomarás o nome do Senhor teu Deus em vão; porque o Senhor não terá por inocente o que tomar o seu nome em vão.', traducao: 'arc' },
  { livro: 'ex', capitulo: 20, versiculo: 8, texto: 'Lembra-te do dia do sábado, para o santificar.', traducao: 'arc' },
  { livro: 'ex', capitulo: 20, versiculo: 9, texto: 'Seis dias trabalharás, e farás toda a tua obra.', traducao: 'arc' },
  { livro: 'ex', capitulo: 20, versiculo: 10, texto: 'Mas o sétimo dia é o sábado do Senhor teu Deus; não farás nenhuma obra, nem tu, nem teu filho, nem tua filha, nem o teu servo, nem a tua serva, nem o teu gado, nem o teu estrangeiro que está dentro das tuas portas.', traducao: 'arc' },
  { livro: 'ex', capitulo: 20, versiculo: 11, texto: 'Porque em seis dias fez o Senhor os céus e a terra, o mar e tudo o que neles há, e ao sétimo dia descansou; portanto abençoou o Senhor o dia do sábado e o santificou.', traducao: 'arc' },
  { livro: 'ex', capitulo: 20, versiculo: 12, texto: 'Honra a teu pai e a tua mãe, para que se prolonguem os teus dias na terra que o Senhor teu Deus te dá.', traducao: 'arc' },
  { livro: 'ex', capitulo: 20, versiculo: 13, texto: 'Não matarás.', traducao: 'arc' },
  { livro: 'ex', capitulo: 20, versiculo: 14, texto: 'Não adulterarás.', traducao: 'arc' },
  { livro: 'ex', capitulo: 20, versiculo: 15, texto: 'Não furtarás.', traducao: 'arc' },
  { livro: 'ex', capitulo: 20, versiculo: 16, texto: 'Não dirás falso testemunho contra o teu próximo.', traducao: 'arc' },
  { livro: 'ex', capitulo: 20, versiculo: 17, texto: 'Não cobiçarás a casa do teu próximo, não cobiçarás a mulher do teu próximo, nem o seu servo, nem a sua serva, nem o seu boi, nem o seu jumento, nem coisa alguma do teu próximo.', traducao: 'arc' },

  // ============ SALMOS 1-50 (a cada 3 capítulos) ============
  { livro: 'sl', capitulo: 1, versiculo: 2, texto: 'Antes tem o seu prazer na lei do Senhor, e na sua lei medita de dia e de noite.', traducao: 'arc' },
  { livro: 'sl', capitulo: 1, versiculo: 3, texto: 'Pois será como a árvore plantada junto a ribeiros de águas, a qual dá o seu fruto no seu tempo; e a sua folha não cairá, e tudo quanto fizer prosperará.', traducao: 'arc' },
  { livro: 'sl', capitulo: 1, versiculo: 6, texto: 'Porque o Senhor conhece o caminho dos justos; mas o caminho dos ímpios perecerá.', traducao: 'arc' },
  { livro: 'sl', capitulo: 2, versiculo: 1, texto: 'Por que se amotinam os gentios, e os povos imaginam coisas vãs?', traducao: 'arc' },
  { livro: 'sl', capitulo: 2, versiculo: 4, texto: 'Aquele que habita nos céus se rirá; o Senhor zombará deles.', traducao: 'arc' },
  { livro: 'sl', capitulo: 2, versiculo: 7, texto: 'Eu declararei o decreto: o Senhor me disse: Tu és meu Filho, eu hoje te gerei.', traducao: 'arc' },
  { livro: 'sl', capitulo: 2, versiculo: 11, texto: 'Servi ao Senhor com temor, e alegrai-vos com tremor.', traducao: 'arc' },
  { livro: 'sl', capitulo: 2, versiculo: 12, texto: 'Beijai o Filho, para que se não ire, e pereçais no caminho, quando se acender a sua ira; bem-aventurados todos os que nele confiam.', traducao: 'arc' },
  { livro: 'sl', capitulo: 4, versiculo: 1, texto: 'Ouve-me quando eu clamo, ó Deus da minha justiça; na angústia me alargaste; tem misericórdia de mim e ouve a minha oração.', traducao: 'arc' },
  { livro: 'sl', capitulo: 4, versiculo: 8, texto: 'Em paz me deitarei e dormirei, porque só tu, Senhor, me fazes habitar em segurança.', traducao: 'arc' },
  { livro: 'sl', capitulo: 8, versiculo: 1, texto: 'Ó Senhor, Senhor nosso, quão admirável é o teu nome em toda a terra, pois puseste a tua glória acima dos céus!', traducao: 'arc' },
  { livro: 'sl', capitulo: 8, versiculo: 3, texto: 'Quando vejo os teus céus, obra dos teus dedos, a lua e as estrelas que preparaste;', traducao: 'arc' },
  { livro: 'sl', capitulo: 8, versiculo: 4, texto: 'Que é o homem mortal para que te lembres dele? E o filho do homem, para que o visites?', traducao: 'arc' },
  { livro: 'sl', capitulo: 8, versiculo: 5, texto: 'Pois pouco menor o fizeste do que os anjos, e de glória e de honra o coroaste.', traducao: 'arc' },
  { livro: 'sl', capitulo: 8, versiculo: 9, texto: 'Fazes com que ele tenha domínio sobre as obras das tuas mãos; tudo puseste debaixo dos seus pés:', traducao: 'arc' },
  { livro: 'sl', capitulo: 15, versiculo: 1, texto: 'Quem habitará no tabernáculo do Senhor? Quem morará no monte santo dele?', traducao: 'arc' },
  { livro: 'sl', capitulo: 15, versiculo: 2, texto: 'O que anda na perfeição, e pratica a justiça, e fala a verdade no seu coração.', traducao: 'arc' },
  { livro: 'sl', capitulo: 15, versiculo: 4, texto: 'Em cujos olhos é desprezado o reprobo; mas honra os que temem ao Senhor; e, ainda que jure com dano seu, não muda.', traducao: 'arc' },
  { livro: 'sl', capitulo: 19, versiculo: 1, texto: 'Os céus declaram a glória de Deus; e o firmamento anuncia a obra das suas mãos.', traducao: 'arc' },
  { livro: 'sl', capitulo: 19, versiculo: 7, texto: 'A lei do Senhor é perfeita, e refrigera a alma; o testemunho do Senhor é fiel, e dá sabedoria aos simples.', traducao: 'arc' },
  { livro: 'sl', capitulo: 19, versiculo: 8, texto: 'Os preceitos do Senhor são retos, e alegram o coração; o mandamento do Senhor é puro, e alumia os olhos.', traducao: 'arc' },
  { livro: 'sl', capitulo: 19, versiculo: 9, texto: 'O temor do Senhor é limpo, e permanece eternamente; os juízos do Senhor são verdadeiros e todos igualmente justos.', traducao: 'arc' },
  { livro: 'sl', capitulo: 19, versiculo: 10, texto: 'Mais desejáveis são do que o ouro, sim, do que muito ouro fino; e mais doces do que o mel e o licor dos favos.', traducao: 'arc' },
  { livro: 'sl', capitulo: 19, versiculo: 14, texto: 'Sejam agradáveis as palavras da minha boca e a meditação do meu coração perante a tua face, ó Senhor, Rocha minha e Redentor meu!', traducao: 'arc' },
  { livro: 'sl', capitulo: 23, versiculo: 2, texto: 'Deitar-me faz em pastos verdejantes; guia-me mansamente a águas tranquilas.', traducao: 'arc' },
  { livro: 'sl', capitulo: 23, versiculo: 3, texto: 'Refrigera a minha alma; guia-me nas veredas da justiça por amor do seu nome.', traducao: 'arc' },
  { livro: 'sl', capitulo: 23, versiculo: 5, texto: 'Preparas uma mesa perante mim na presença dos meus inimigos; unges a minha cabeça com óleo; o meu cálice transborda.', traducao: 'arc' },
  { livro: 'sl', capitulo: 23, versiculo: 6, texto: 'Certamente que a bondade e a misericórdia me seguirão todos os dias da minha vida; e habitarei na casa do Senhor por longos dias.', traducao: 'arc' },
  { livro: 'sl', capitulo: 27, versiculo: 1, texto: 'O Senhor é a minha luz e a minha salvação; a quem temerei? O Senhor é a força da minha vida; de quem me recearei?', traducao: 'arc' },
  { livro: 'sl', capitulo: 27, versiculo: 4, texto: 'Uma coisa pedi ao Senhor, e a buscarei: que possa eu morar na casa do Senhor todos os dias da minha vida, para contemplar a formosura do Senhor, e inquirir no seu templo.', traducao: 'arc' },
  { livro: 'sl', capitulo: 27, versiculo: 13, texto: 'Eu teria desfalecido, se não cresse que veria a bondade do Senhor na terra dos viventes.', traducao: 'arc' },
  { livro: 'sl', capitulo: 27, versiculo: 14, texto: 'Espera no Senhor, anima-te, e ele fortalecerá o teu coração; espera, pois, no Senhor.', traducao: 'arc' },
  { livro: 'sl', capitulo: 34, versiculo: 1, texto: 'Louvarei ao Senhor em todo o tempo; o seu louvor estará continuamente na minha boca.', traducao: 'arc' },
  { livro: 'sl', capitulo: 34, versiculo: 4, texto: 'Busquei ao Senhor, e ele me ouviu, e livrou-me de todos os meus temores.', traducao: 'arc' },
  { livro: 'sl', capitulo: 34, versiculo: 7, texto: 'O anjo do Senhor acampa-se ao redor dos que o temem, e os arranca do perigo.', traducao: 'arc' },
  { livro: 'sl', capitulo: 34, versiculo: 8, texto: 'Provai e vede que o Senhor é bom; bem-aventurado o homem que nele confia.', traducao: 'arc' },
  { livro: 'sl', capitulo: 34, versiculo: 18, texto: 'Perto está o Senhor dos que têm o coração quebrantado, e salva os contritos de espírito.', traducao: 'arc' },
  { livro: 'sl', capitulo: 34, versiculo: 19, texto: 'Muitas são as aflições do justo, mas o Senhor o livrará de todas.', traducao: 'arc' },
  { livro: 'sl', capitulo: 37, versiculo: 1, texto: 'Não te indignes por causa dos malfeitores, nem tenhas inveja dos que praticam a iniquidade.', traducao: 'arc' },
  { livro: 'sl', capitulo: 37, versiculo: 3, texto: 'Confia no Senhor e faze o bem; habitarás na terra e te alimentarás da sua fidelidade.', traducao: 'arc' },
  { livro: 'sl', capitulo: 37, versiculo: 4, texto: 'Deleita-te também no Senhor, e ele te concederá os desejos do teu coração.', traducao: 'arc' },
  { livro: 'sl', capitulo: 37, versiculo: 5, texto: 'Entrega o teu caminho ao Senhor; confia nele, e ele tudo fará.', traducao: 'arc' },
  { livro: 'sl', capitulo: 37, versiculo: 7, texto: 'Descansa no Senhor, e espera nele; não te indignes por causa daquele que prospera em seu caminho, por causa do homem que executa maus desígnios.', traducao: 'arc' },
  { livro: 'sl', capitulo: 37, versiculo: 23, texto: 'Os passos do homem bom são confirmados pelo Senhor, e ele deleita-se no seu caminho.', traducao: 'arc' },
  { livro: 'sl', capitulo: 37, versiculo: 25, texto: 'Fui moço, e agora sou velho; mas nunca vi desamparado o justo, nem a sua descendência a mendigar o pão.', traducao: 'arc' },
  { livro: 'sl', capitulo: 40, versiculo: 1, texto: 'Esperei com paciência pelo Senhor, e ele se inclinou para mim, e ouviu o meu clamor.', traducao: 'arc' },
  { livro: 'sl', capitulo: 40, versiculo: 2, texto: 'Tirou-me dum lago horrível, dum charco de lodo, e pôs os meus pés sobre uma rocha, firmou os meus passos.', traducao: 'arc' },
  { livro: 'sl', capitulo: 40, versiculo: 3, texto: 'E pôs um novo cântico na minha boca, um hino ao nosso Deus; muitos verão isto, e temerão, e confiarão no Senhor.', traducao: 'arc' },
  { livro: 'sl', capitulo: 40, versiculo: 8, texto: 'Então disse: Eis que venho; no rolo do livro está escrito de mim.', traducao: 'arc' },
  { livro: 'sl', capitulo: 40, versiculo: 16, texto: 'Regozijem-se e alegrem-se em ti os que te buscam; digam continuamente os que amam a tua salvação: Engrandecido seja o Senhor.', traducao: 'arc' },
  { livro: 'sl', capitulo: 46, versiculo: 2, texto: 'Portanto não temeremos, ainda que a terra se mude, e ainda que os montes se transportem para o meio dos mares.', traducao: 'arc' },
  { livro: 'sl', capitulo: 46, versiculo: 4, texto: 'Há um rio cujas correntes alegram a cidade de Deus, o santuário das moradas do Altíssimo.', traducao: 'arc' },
  { livro: 'sl', capitulo: 46, versiculo: 5, texto: 'Deus está no meio dela; não se abalará. Deus a ajudará, já ao romper da manhã.', traducao: 'arc' },
  { livro: 'sl', capitulo: 46, versiculo: 10, texto: 'Aquietai-vos, e sabei que eu sou Deus; serei exaltado entre as nações; serei exaltado na terra.', traducao: 'arc' },
  { livro: 'sl', capitulo: 46, versiculo: 11, texto: 'O Senhor dos Exércitos está conosco; o Deus de Jacó é o nosso refúgio.', traducao: 'arc' },
  { livro: 'sl', capitulo: 49, versiculo: 15, texto: 'Mas Deus remirá a minha alma do poder do sepulcro, pois me receberá.', traducao: 'arc' },

  // ============ SALMOS 51-145 (capítulos chave) ============
  { livro: 'sl', capitulo: 51, versiculo: 1, texto: 'Compadece-te de mim, ó Deus, segundo a tua benignidade; apaga as minhas transgressões, segundo a multidão das tuas misericórdias.', traducao: 'arc' },
  { livro: 'sl', capitulo: 51, versiculo: 2, texto: 'Lava-me completamente da minha iniquidade, e purifica-me do meu pecado.', traducao: 'arc' },
  { livro: 'sl', capitulo: 51, versiculo: 7, texto: 'Purifica-me com hissopo, e ficarei puro; lava-me, e ficarei mais branco do que a neve.', traducao: 'arc' },
  { livro: 'sl', capitulo: 51, versiculo: 10, texto: 'Cria em mim, ó Deus, um coração puro, e renova em mim um espírito reto.', traducao: 'arc' },
  { livro: 'sl', capitulo: 51, versiculo: 11, texto: 'Não me lances fora da tua presença, e não retire de mim o teu Espírito Santo.', traducao: 'arc' },
  { livro: 'sl', capitulo: 51, versiculo: 17, texto: 'Os sacrifícios para Deus são o espírito quebrantado; a um coração quebrantado e contrito não desprezarás, ó Deus.', traducao: 'arc' },
  { livro: 'sl', capitulo: 91, versiculo: 2, texto: 'Direi do Senhor: Ele é o meu refúgio e a minha fortaleza; o meu Deus, em quem confio.', traducao: 'arc' },
  { livro: 'sl', capitulo: 91, versiculo: 3, texto: 'Porque ele te livrará do laço do passarinheiro, e da peste perniciosa.', traducao: 'arc' },
  { livro: 'sl', capitulo: 91, versiculo: 4, texto: 'Ele te cobrirá com as suas penas, e sob as suas asas te confiarás; a sua verdade será o teu escudo e broquel.', traducao: 'arc' },
  { livro: 'sl', capitulo: 91, versiculo: 5, texto: 'Não terás medo do terror de noite nem da seta que voa de dia,', traducao: 'arc' },
  { livro: 'sl', capitulo: 91, versiculo: 7, texto: 'Caírão mil ao teu lado, e dez mil à tua direita, mas tu não serás atingido.', traducao: 'arc' },
  { livro: 'sl', capitulo: 91, versiculo: 14, texto: 'Porquanto tão encarecidamente me amou, também eu o livrarei; pô-lo-ei em retiro alto, porque conheceu o meu nome.', traducao: 'arc' },
  { livro: 'sl', capitulo: 100, versiculo: 2, texto: 'Servi ao Senhor com alegria; apresentai-vos diante dele com cântico.', traducao: 'arc' },
  { livro: 'sl', capitulo: 100, versiculo: 3, texto: 'Sabei que o Senhor é Deus; foi ele que nos fez, e não nós a nós mesmos; somos povo seu e ovelhas do seu pasto.', traducao: 'arc' },
  { livro: 'sl', capitulo: 100, versiculo: 4, texto: 'Entrai pelas portas dele com gratidão, e nos seus átrios com louvor; louvai-o, e bendizei o seu nome.', traducao: 'arc' },
  { livro: 'sl', capitulo: 100, versiculo: 5, texto: 'Porque o Senhor é bom, e eterna a sua misericórdia; e a sua verdade estende-se de geração em geração.', traducao: 'arc' },
  { livro: 'sl', capitulo: 103, versiculo: 2, texto: 'Bendize, ó minha alma, ao Senhor, e não te esqueças de nenhum dos seus benefícios.', traducao: 'arc' },
  { livro: 'sl', capitulo: 103, versiculo: 3, texto: 'Ele é o que perdoa todas as tuas iniquidades, que sara todas as tuas enfermidades,', traducao: 'arc' },
  { livro: 'sl', capitulo: 103, versiculo: 8, texto: 'Misericordioso e piedoso é o Senhor; longânimo e grande em benignidade.', traducao: 'arc' },
  { livro: 'sl', capitulo: 103, versiculo: 11, texto: 'Assim como o céu se eleva sobre a terra, assim é grande a sua misericórdia para com os que o temem.', traducao: 'arc' },
  { livro: 'sl', capitulo: 103, versiculo: 12, texto: 'Como o Oriente está longe do Ocidente, assim tem afastado de nós as nossas transgressões.', traducao: 'arc' },
  { livro: 'sl', capitulo: 110, versiculo: 1, texto: 'Disse o Senhor ao meu Senhor: Assenta-te à minha mão direita, até que ponha os teus inimigos por escabelo dos teus pés.', traducao: 'arc' },
  { livro: 'sl', capitulo: 110, versiculo: 3, texto: 'O teu povo será mui voluntário no dia do teu poder; nos esplendores da santidade, desde a madre da aurora, terás o orvalho da tua mocidade.', traducao: 'arc' },
  { livro: 'sl', capitulo: 119, versiculo: 1, texto: 'Bem-aventurados os que são perfeitos nos caminhos, os que andam na lei do Senhor.', traducao: 'arc' },
  { livro: 'sl', capitulo: 119, versiculo: 9, texto: 'Com que purificará o jovem o seu caminho? Observando-o segundo a tua palavra.', traducao: 'arc' },
  { livro: 'sl', capitulo: 119, versiculo: 10, texto: 'Com todo o meu coração te busquei; não me deixes desviar dos teus mandamentos.', traducao: 'arc' },
  { livro: 'sl', capitulo: 119, versiculo: 11, texto: 'Escondi a tua palavra no meu coração, para eu não pecar contra ti.', traducao: 'arc' },
  { livro: 'sl', capitulo: 119, versiculo: 18, texto: 'Abre os meus olhos, para que eu veja as maravilhas da tua lei.', traducao: 'arc' },
  { livro: 'sl', capitulo: 119, versiculo: 33, texto: 'Ensina-me, ó Senhor, o caminho dos teus estatutos, e guardá-lo-ei até ao fim.', traducao: 'arc' },
  { livro: 'sl', capitulo: 119, versiculo: 50, texto: 'Isto é a minha consolação na minha aflição, porque a tua palavra me vivificou.', traducao: 'arc' },
  { livro: 'sl', capitulo: 119, versiculo: 89, texto: 'Para sempre, ó Senhor, a tua palavra permanece no céu.', traducao: 'arc' },
  { livro: 'sl', capitulo: 119, versiculo: 93, texto: 'Nunca me esquecerei dos teus preceitos, porque por eles me tens vivificado.', traducao: 'arc' },
  { livro: 'sl', capitulo: 119, versiculo: 97, texto: 'Oh, quanto amo a tua lei! É a minha meditação em todo o dia.', traducao: 'arc' },
  { livro: 'sl', capitulo: 119, versiculo: 105, texto: 'Lâmpada para os meus pés é a tua palavra, e luz para o meu caminho.', traducao: 'arc' },
  { livro: 'sl', capitulo: 119, versiculo: 114, texto: 'Tu és o meu esconderijo e o meu escudo; eu espero na tua palavra.', traducao: 'arc' },
  { livro: 'sl', capitulo: 119, versiculo: 130, texto: 'A entrada das tuas palavras alumia, e dá entendimento aos simples.', traducao: 'arc' },
  { livro: 'sl', capitulo: 119, versiculo: 133, texto: 'Ordena os meus passos na tua palavra, e não prevaleça sobre mim alguma iniquidade.', traducao: 'arc' },
  { livro: 'sl', capitulo: 119, versiculo: 165, texto: 'Grande paz têm os que amam a tua lei, e para eles não há tropeço.', traducao: 'arc' },
  { livro: 'sl', capitulo: 121, versiculo: 2, texto: 'O meu socorro vem do Senhor, que fez o céu e a terra.', traducao: 'arc' },
  { livro: 'sl', capitulo: 121, versiculo: 3, texto: 'Não deixará vacilar o teu pé; aquele que te guarda não tosquenejará.', traducao: 'arc' },
  { livro: 'sl', capitulo: 121, versiculo: 4, texto: 'Eis que não tosquenejará nem dormirá o guarda de Israel.', traducao: 'arc' },
  { livro: 'sl', capitulo: 121, versiculo: 5, texto: 'O Senhor é o teu guarda; o Senhor é a tua sombra à tua mão direita.', traducao: 'arc' },
  { livro: 'sl', capitulo: 121, versiculo: 6, texto: 'O sol não te molestará de dia, nem a lua de noite.', traducao: 'arc' },
  { livro: 'sl', capitulo: 121, versiculo: 8, texto: 'O Senhor te guardará de todo o mal; guardará a tua alma.', traducao: 'arc' },
  { livro: 'sl', capitulo: 127, versiculo: 2, texto: 'Inutilmente vos levanteis de madrugada, e tarde durmais, e comais o pão de dores; pois assim dará ele aos seus amados o sono.', traducao: 'arc' },
  { livro: 'sl', capitulo: 127, versiculo: 3, texto: 'Eis que os filhos são herança do Senhor, e o fruto do ventre o seu galardão.', traducao: 'arc' },
  { livro: 'sl', capitulo: 127, versiculo: 4, texto: 'Como flechas na mão de um homem poderoso, assim são os filhos da mocidade.', traducao: 'arc' },
  { livro: 'sl', capitulo: 127, versiculo: 5, texto: 'Bem-aventurado o homem que enche deles a sua aljava; não serão confundidos, mas falarão com os seus inimigos na porta.', traducao: 'arc' },
  { livro: 'sl', capitulo: 139, versiculo: 2, texto: 'Tu conheces o meu assentar e o meu levantar; de longe percebes os meus pensamentos.', traducao: 'arc' },
  { livro: 'sl', capitulo: 139, versiculo: 3, texto: 'Tu cercas o meu andar, e o meu deitar; e conheces todos os meus caminhos.', traducao: 'arc' },
  { livro: 'sl', capitulo: 139, versiculo: 6, texto: 'Tal conhecimento é maravilhoso demais para mim; elevado é, não o posso atingir.', traducao: 'arc' },
  { livro: 'sl', capitulo: 139, versiculo: 7, texto: 'Para onde me irei do teu Espírito, ou para onde fugirei da tua presença?', traducao: 'arc' },
  { livro: 'sl', capitulo: 139, versiculo: 10, texto: 'Ali me guiará a tua mão, e a tua destra me susterá.', traducao: 'arc' },
  { livro: 'sl', capitulo: 139, versiculo: 14, texto: 'Eu te louvarei, porque de um modo assombroso, e maravilhoso fui feito; maravilhosas são as tuas obras, e a minha alma o sabe muito bem.', traducao: 'arc' },
  { livro: 'sl', capitulo: 139, versiculo: 16, texto: 'Os teus olhos viram o meu corpo ainda informe; e no teu livro foram escritos todos os meus dias, cada um deles escrito, quando nenhum deles havia ainda.', traducao: 'arc' },
  { livro: 'sl', capitulo: 139, versiculo: 23, texto: 'Sonda-me, ó Deus, e conhece o meu coração; prova-me, e conhece os meus pensamentos.', traducao: 'arc' },
  { livro: 'sl', capitulo: 139, versiculo: 24, texto: 'E vê se há em mim algum caminho mau, e guia-me pelo caminho eterno.', traducao: 'arc' },
  { livro: 'sl', capitulo: 145, versiculo: 3, texto: 'Grande é o Senhor, e mui digno de ser louvado; e a sua grandeza é insondável.', traducao: 'arc' },
  { livro: 'sl', capitulo: 145, versiculo: 8, texto: 'Misericordioso e piedoso é o Senhor; longânimo e grande em benignidade.', traducao: 'arc' },
  { livro: 'sl', capitulo: 145, versiculo: 9, texto: 'O Senhor é bom para todos, e as suas misericórdias são sobre todas as suas obras.', traducao: 'arc' },
  { livro: 'sl', capitulo: 145, versiculo: 13, texto: 'O teu reino é um reino eterno; o teu domínio estende-se a todas as gerações.', traducao: 'arc' },
  { livro: 'sl', capitulo: 145, versiculo: 16, texto: 'Tu abres a tua mão, e fartes os desejos de todos os viventes.', traducao: 'arc' },
  { livro: 'sl', capitulo: 145, versiculo: 18, texto: 'Perto está o Senhor de todos os que o invocam, de todos os que o invocam em verdade.', traducao: 'arc' },

  // ============ PROVÉRBIOS 3, 16, 22, 31 ============
  { livro: 'pv', capitulo: 3, versiculo: 1, texto: 'Filho meu, não te esqueças da minha lei, e o teu coração guarde os meus mandamentos.', traducao: 'arc' },
  { livro: 'pv', capitulo: 3, versiculo: 2, texto: 'Porque eles aumentarão os teus dias e te acrescentarão anos de vida e paz.', traducao: 'arc' },
  { livro: 'pv', capitulo: 3, versiculo: 3, texto: 'Não te desamparem a misericórdia e a fidelidade; ata-as ao teu pescoço; escreve-as na tábua do teu coração.', traducao: 'arc' },
  { livro: 'pv', capitulo: 3, versiculo: 4, texto: 'E acharás graça e bom entendimento aos olhos de Deus e do homem.', traducao: 'arc' },
  { livro: 'pv', capitulo: 3, versiculo: 7, texto: 'Não sejas sábio aos teus próprios olhos; teme ao Senhor e aparta-te do mal.', traducao: 'arc' },
  { livro: 'pv', capitulo: 3, versiculo: 9, texto: 'Honra ao Senhor com a tua fazenda e com as primícias de toda a tua renda;', traducao: 'arc' },
  { livro: 'pv', capitulo: 3, versiculo: 11, texto: 'Filho meu, não rejeites a correção do Senhor, nem te enfades da sua repreensão.', traducao: 'arc' },
  { livro: 'pv', capitulo: 3, versiculo: 13, texto: 'Bem-aventurado o homem que acha sabedoria, e o homem que adquire conhecimento.', traducao: 'arc' },
  { livro: 'pv', capitulo: 3, versiculo: 19, texto: 'O Senhor pela sabedoria fundou a terra; pelo entendimento estabeleceu os céus.', traducao: 'arc' },
  { livro: 'pv', capitulo: 3, versiculo: 27, texto: 'Não negues o bem a quem dele tem necessidade, quando te for possível fazê-lo.', traducao: 'arc' },
  { livro: 'pv', capitulo: 3, versiculo: 33, texto: 'A maldição do Senhor habita na casa do ímpio, mas a habitação dos justos ele abençoará.', traducao: 'arc' },
  { livro: 'pv', capitulo: 16, versiculo: 1, texto: 'Dos homens são as preparações do coração, mas do Senhor, a resposta da boca.', traducao: 'arc' },
  { livro: 'pv', capitulo: 16, versiculo: 2, texto: 'Todos os caminhos do homem são puros aos seus olhos, mas o Senhor pesa os espíritos.', traducao: 'arc' },
  { livro: 'pv', capitulo: 16, versiculo: 4, texto: 'O Senhor fez todas as coisas para si mesmas, e até o ímpio para o dia do mal.', traducao: 'arc' },
  { livro: 'pv', capitulo: 16, versiculo: 9, texto: 'O coração do homem considera o seu caminho, mas o Senhor lhe dirige os passos.', traducao: 'arc' },
  { livro: 'pv', capitulo: 16, versiculo: 18, texto: 'A soberba precede a ruína, e a altivez do espírito precede a queda.', traducao: 'arc' },
  { livro: 'pv', capitulo: 16, versiculo: 20, texto: 'O que atenta para o achado do bem achará o favor, e o que confia no Senhor, esse é feliz.', traducao: 'arc' },
  { livro: 'pv', capitulo: 16, versiculo: 25, texto: 'Há um caminho que parece reto ao homem, mas o seu fim são os caminhos da morte.', traducao: 'arc' },
  { livro: 'pv', capitulo: 16, versiculo: 32, texto: 'Melhor é o longânimo do que o valente; e o que governa o seu espírito do que o que toma uma cidade.', traducao: 'arc' },
  { livro: 'pv', capitulo: 16, versiculo: 33, texto: 'A sorte se lança no regaço, mas do Senhor procede toda a sua disposição.', traducao: 'arc' },
  { livro: 'pv', capitulo: 22, versiculo: 1, texto: 'O bom nome é mais digno de ser escolhido do que as muitas riquezas; e a graça é melhor do que a prata e o ouro.', traducao: 'arc' },
  { livro: 'pv', capitulo: 22, versiculo: 4, texto: 'O galardão da humildade e o temor do Senhor são riquezas, e honra, e vida.', traducao: 'arc' },
  { livro: 'pv', capitulo: 22, versiculo: 9, texto: 'O que é generoso será ele abundantemente alimentado, e o que dá de beber também será ele regado.', traducao: 'arc' },
  { livro: 'pv', capitulo: 22, versiculo: 15, texto: 'A estultícia está ligada ao coração do menino, mas a vara da correção a afugentará dele.', traducao: 'arc' },
  { livro: 'pv', capitulo: 22, versiculo: 17, texto: 'Inclina o teu ouvido e ouve as palavras dos sábios, e aplica o teu coração à minha ciência.', traducao: 'arc' },
  { livro: 'pv', capitulo: 22, versiculo: 22, texto: 'Não roubes ao pobre, porque é pobre, nem oprimas o aflito na porta.', traducao: 'arc' },
  { livro: 'pv', capitulo: 31, versiculo: 8, texto: 'Abre a tua boca a favor dos mudos, no julgamento de todos os desvalidos.', traducao: 'arc' },
  { livro: 'pv', capitulo: 31, versiculo: 9, texto: 'Abre a tua boca, julga com justiça, e faze justiça aos aflitos e aos necessitados.', traducao: 'arc' },
  { livro: 'pv', capitulo: 31, versiculo: 10, texto: 'Quem pode encontrar uma mulher virtuosa? Porque o seu valor muito excede o de rubis.', traducao: 'arc' },
  { livro: 'pv', capitulo: 31, versiculo: 11, texto: 'O coração do seu marido está nela confiado; e não haverá falta de ganho.', traducao: 'arc' },
  { livro: 'pv', capitulo: 31, versiculo: 25, texto: 'A força e a honra são o seu vestido, e se alegrará com o dia último.', traducao: 'arc' },
  { livro: 'pv', capitulo: 31, versiculo: 26, texto: 'Abre a sua boca com sabedoria, e na sua língua há lei de beneficência.', traducao: 'arc' },
  { livro: 'pv', capitulo: 31, versiculo: 28, texto: 'Seus filhos se levantam e a chamam bem-aventurada; seu marido a louva, dizendo:', traducao: 'arc' },
  { livro: 'pv', capitulo: 31, versiculo: 30, texto: 'A graça é enganadora e a beleza é vã; mas a mulher que teme ao Senhor, essa será louvada.', traducao: 'arc' },
  { livro: 'pv', capitulo: 31, versiculo: 31, texto: 'Dai-lhe do fruto das suas mãos, e louvem-na nas portas as suas obras.', traducao: 'arc' },

  // ============ ISAÍAS 9, 40, 41, 53, 55, 65 ============
  { livro: 'is', capitulo: 9, versiculo: 2, texto: 'O povo que andava em trevas viu uma grande luz; e sobre os que habitavam na região da sombra da morte resplandeceu a luz.', traducao: 'arc' },
  { livro: 'is', capitulo: 9, versiculo: 7, texto: 'Do aumento deste principado e da paz não haverá fim, sobre o trono de Davi e no seu reino, para o estabelecer e o confirmar em juízo e em justiça, desde agora e para sempre; o zelo do Senhor dos Exércitos fará isto.', traducao: 'arc' },
  { livro: 'is', capitulo: 40, versiculo: 1, texto: 'Consolai, consolai o meu povo, diz o vosso Deus.', traducao: 'arc' },
  { livro: 'is', capitulo: 40, versiculo: 2, texto: 'Falai ao coração de Jerusalém, e bradai-lhe que já o seu tempo é cumprido, e que a sua iniquidade é perdoada.', traducao: 'arc' },
  { livro: 'is', capitulo: 40, versiculo: 3, texto: 'Voz do que clama no deserto: Preparai o caminho do Senhor; endireitai no ermo vereda a nosso Deus.', traducao: 'arc' },
  { livro: 'is', capitulo: 40, versiculo: 4, texto: 'Todo o vale será exaltado, e todo o monte e todo o outeiro será abatido; e o que é tortuoso será endireitado, e os caminhos escabrosos serão aplanados.', traducao: 'arc' },
  { livro: 'is', capitulo: 40, versiculo: 5, texto: 'E a glória do Senhor se manifestará, e toda a carne juntamente a verá, porque a boca do Senhor o disse.', traducao: 'arc' },
  { livro: 'is', capitulo: 40, versiculo: 9, texto: 'Tu, que anuncies boas novas a Sião, sobe ao alto do monte; tu, que anuncies boas novas a Jerusalém, ergue a tua voz com força; ergue-a, não temas; dize às cidades de Judá: Eis aqui está o vosso Deus.', traducao: 'arc' },
  { livro: 'is', capitulo: 40, versiculo: 11, texto: 'Como o pastor apascentará o seu rebanho; entre os seus braços recolherá os cordeiros, e os levará no seio; as que amamentam ele guiará mansamente.', traducao: 'arc' },
  { livro: 'is', capitulo: 40, versiculo: 18, texto: 'A quem, pois, me comparareis? Ou quem será semelhante a mim? diz o Santo.', traducao: 'arc' },
  { livro: 'is', capitulo: 40, versiculo: 26, texto: 'Levantai ao alto os vossos olhos, e vede quem criou estas coisas; foi aquele que faz sair o exército delas segundo o seu número; ele chama todas pelo nome; pela grandeza do seu poder e pela fortaleza do seu braço, nenhuma delas falta.', traducao: 'arc' },
  { livro: 'is', capitulo: 40, versiculo: 28, texto: 'Não sabes, não ouviste que o Deus eterno é o Senhor, o Criador dos fins da terra? Ele não se cansa, nem se fatiga, e a sua inteligência não se pode esquadrinhar.', traducao: 'arc' },
  { livro: 'is', capitulo: 40, versiculo: 29, texto: 'Ele dá força ao cansado, e multiplica as forças ao que não tem nenhum vigor.', traducao: 'arc' },
  { livro: 'is', capitulo: 40, versiculo: 30, texto: 'Os moços se cansarão e se fatigarão, e os jovens certamente cairão;', traducao: 'arc' },
  { livro: 'is', capitulo: 41, versiculo: 4, texto: 'Quem operou e fez isto, chamando as gerações desde o princípio? Eu, o Senhor, sou o primeiro, e com os últimos sou eu.', traducao: 'arc' },
  { livro: 'is', capitulo: 41, versiculo: 13, texto: 'Porque eu, o Senhor teu Deus, te tomo pela tua mão direita; e te digo: Não temas, eu te ajudo.', traducao: 'arc' },
  { livro: 'is', capitulo: 41, versiculo: 17, texto: 'Os pobres e necessitados buscam águas, e não há, e a sua língua se seca de sede; eu, o Senhor, os ouvirei, eu, o Deus de Israel, não os desampararei.', traducao: 'arc' },
  { livro: 'is', capitulo: 41, versiculo: 18, texto: 'Abrirei rios em lugares altos, e fontes no meio dos vales; tornarei o deserto em lagos de águas, e a terra seca em mananciais.', traducao: 'arc' },
  { livro: 'is', capitulo: 41, versiculo: 29, texto: 'Eis que todos são vaidade; as suas obras não são coisa alguma; as suas imagens de fundição são vento e confusão.', traducao: 'arc' },
  { livro: 'is', capitulo: 53, versiculo: 1, texto: 'Quem deu crédito à nossa pregação? E a quem se manifestou o braço do Senhor?', traducao: 'arc' },
  { livro: 'is', capitulo: 53, versiculo: 2, texto: 'Porque foi subindo como renovo perante ele, e como raiz de uma terra seca; não tinha formosura nem beleza; e quando olhávamos para ele, nenhuma beleza víamos, para que o desejássemos.', traducao: 'arc' },
  { livro: 'is', capitulo: 53, versiculo: 3, texto: 'Era desprezado, e o mais rejeitado entre os homens, homem de dores, e experimentado nos trabalhos; e, como um que esconde o rosto de nós, era desprezado, e não fizemos dele caso algum.', traducao: 'arc' },
  { livro: 'is', capitulo: 53, versiculo: 4, texto: 'Verdadeiramente ele tomou sobre si as nossas enfermidades, e levou as nossas dores; e nós o reputávamos por aflito, ferido de Deus, e oprimido.', traducao: 'arc' },
  { livro: 'is', capitulo: 53, versiculo: 6, texto: 'Todos nós andávamos desgarrados como ovelhas; cada um se desviava pelo seu caminho; e o Senhor fez cair sobre ele a iniquidade de todos nós.', traducao: 'arc' },
  { livro: 'is', capitulo: 53, versiculo: 7, texto: 'Ele foi oprimido, e afligiu-se, contudo não abriu a sua boca; como um cordeiro foi levado ao matadouro, e como a ovelha muda perante os seus tosquiadores, assim ele não abriu a sua boca.', traducao: 'arc' },
  { livro: 'is', capitulo: 53, versiculo: 10, texto: 'Todavia ao Senhor agradou moê-lo, fazendo-o enfermar; quando der ele a sua alma como oferta pelo pecado, verá a sua posteridade, e prolongará os seus dias; e o bom prazer do Senhor prosperará na sua mão.', traducao: 'arc' },
  { livro: 'is', capitulo: 53, versiculo: 11, texto: 'Com o trabalho da sua alma ele verá, e se fartará; pelo seu conhecimento o meu servo justo justificará a muitos; porque ele levará a iniquidade deles.', traducao: 'arc' },
  { livro: 'is', capitulo: 53, versiculo: 12, texto: 'Portanto lhe darei a parte de muitos, e com os poderosos repartirá ele o despojo; porque derramou a sua alma até à morte, e foi contado com os transgressores; e ele levou sobre si o pecado de muitos, e intercedeu pelos transgressores.', traducao: 'arc' },
  { livro: 'is', capitulo: 55, versiculo: 1, texto: 'Ó vós, todos os que tendes sede, vinde às águas, e vós, os que não tendes dinheiro, vinde, comprai e comei; sim, vinde e comprai, sem dinheiro e sem preço, vinho e leite.', traducao: 'arc' },
  { livro: 'is', capitulo: 55, versiculo: 2, texto: 'Por que gastais o dinheiro naquilo que não é pão? E o vosso trabalho naquilo que não pode satisfazer? Ouvi-me atentamente, e comei o que é bom, e a vossa alma se deleite com a gordura.', traducao: 'arc' },
  { livro: 'is', capitulo: 55, versiculo: 6, texto: 'Buscai ao Senhor enquanto se pode achar, invocai-o enquanto está perto.', traducao: 'arc' },
  { livro: 'is', capitulo: 55, versiculo: 7, texto: 'Deixe o ímpio o seu caminho, e o homem maligno os seus pensamentos, e se converta ao Senhor, que se compadecerá dele; e para o nosso Deus, que é amplo em perdoar.', traducao: 'arc' },
  { livro: 'is', capitulo: 55, versiculo: 8, texto: 'Porque os meus pensamentos não são os vossos pensamentos, nem os vossos caminhos os meus caminhos, diz o Senhor.', traducao: 'arc' },
  { livro: 'is', capitulo: 55, versiculo: 9, texto: 'Porque, assim como os céus são mais altos do que a terra, assim são os meus caminhos mais altos do que os vossos caminhos, e os meus pensamentos mais altos do que os vossos pensamentos.', traducao: 'arc' },
  { livro: 'is', capitulo: 55, versiculo: 10, texto: 'Porque, assim como a chuva e a neve descem dos céus, e para lá não tornam, mas regam a terra, e a fazem produzir, e brotar, e dar semente ao semeador, e pão ao que come,', traducao: 'arc' },
  { livro: 'is', capitulo: 55, versiculo: 11, texto: 'Assim será a minha palavra, que sair da minha boca; ela não voltará para mim vazia, antes fará o que me apraz, e prosperará naquilo para que a enviei.', traducao: 'arc' },
  { livro: 'is', capitulo: 55, versiculo: 12, texto: 'Porque com alegria saireis, e em paz sereis guiados; os montes e os outeiros romperão em cânticos diante de vós, e todas as árvores do campo baterão as palmas.', traducao: 'arc' },
  { livro: 'is', capitulo: 55, versiculo: 13, texto: 'Em lugar do espinheiro crescerá a abeto, e em lugar da sarça crescerá a murta; e será isso para nome do Senhor, e para sinal eterno, que nunca se apagará.', traducao: 'arc' },
  { livro: 'is', capitulo: 65, versiculo: 17, texto: 'Porque, eis que eu crio novos céus e nova terra; e não haverá mais lembrança das coisas passadas, nem mais se lembrarão.', traducao: 'arc' },
  { livro: 'is', capitulo: 65, versiculo: 24, texto: 'E será que, antes que clamem, eu responderei; e estando eles ainda falando, eu os ouvirei.', traducao: 'arc' },
  { livro: 'is', capitulo: 65, versiculo: 25, texto: 'O lobo e o cordeiro pastarão juntos, e o leão comerá palha como o boi; e pó será a comida da serpente. Não farão mal nem dano algum em todo o meu santo monte, diz o Senhor.', traducao: 'arc' },

  // ============ JEREMIAS (complementar) ============
  { livro: 'jr', capitulo: 29, versiculo: 12, texto: 'Então me invocareis, e ireis, e orareis a mim, e eu vos ouvirei.', traducao: 'arc' },
  { livro: 'jr', capitulo: 29, versiculo: 13, texto: 'E buscar-me-eis, e me achareis, quando me buscardes de todo o vosso coração.', traducao: 'arc' },

  // ============ MATEUS 5-7 (Sermão da Montanha) ============
  { livro: 'mt', capitulo: 5, versiculo: 1, texto: 'E Jesus, vendo a multidão, subiu a um monte, e, assentando-se, aproximaram-se dele os seus discípulos;', traducao: 'arc' },
  { livro: 'mt', capitulo: 5, versiculo: 2, texto: 'E, abrindo a sua boca, os ensinava, dizendo:', traducao: 'arc' },
  { livro: 'mt', capitulo: 5, versiculo: 3, texto: 'Bem-aventurados os pobres de espírito, porque deles é o reino dos céus.', traducao: 'arc' },
  { livro: 'mt', capitulo: 5, versiculo: 4, texto: 'Bem-aventurados os que choram, porque eles serão consolados.', traducao: 'arc' },
  { livro: 'mt', capitulo: 5, versiculo: 5, texto: 'Bem-aventurados os mansos, porque eles herdarão a terra.', traducao: 'arc' },
  { livro: 'mt', capitulo: 5, versiculo: 6, texto: 'Bem-aventurados os que têm fome e sede de justiça, porque eles serão fartos.', traducao: 'arc' },
  { livro: 'mt', capitulo: 5, versiculo: 7, texto: 'Bem-aventurados os misericordiosos, porque eles alcançarão misericórdia.', traducao: 'arc' },
  { livro: 'mt', capitulo: 5, versiculo: 8, texto: 'Bem-aventurados os puros de coração, porque eles verão a Deus.', traducao: 'arc' },
  { livro: 'mt', capitulo: 5, versiculo: 9, texto: 'Bem-aventurados os pacificadores, porque eles serão chamados filhos de Deus.', traducao: 'arc' },
  { livro: 'mt', capitulo: 5, versiculo: 10, texto: 'Bem-aventurados os que são perseguidos por causa da justiça, porque deles é o reino dos céus.', traducao: 'arc' },
  { livro: 'mt', capitulo: 5, versiculo: 11, texto: 'Bem-aventurados sois vós, quando vos injuriarem e perseguirem, e, mentindo, disserem todo o mal contra vós, por minha causa.', traducao: 'arc' },
  { livro: 'mt', capitulo: 5, versiculo: 12, texto: 'Regozijai-vos e alegrai-vos, porque é grande o vosso galardão nos céus; porque assim perseguiram os profetas que foram antes de vós.', traducao: 'arc' },
  { livro: 'mt', capitulo: 5, versiculo: 13, texto: 'Vós sois o sal da terra; e se o sal for insípido, com que se há de salgar? Para nada mais presta, senão para se lançar fora, e ser pisado pelos homens.', traducao: 'arc' },
  { livro: 'mt', capitulo: 5, versiculo: 16, texto: 'Assim resplandeça a vossa luz diante dos homens, para que vejam as vossas boas obras, e glorifiquem a vosso Pai, que está nos céus.', traducao: 'arc' },
  { livro: 'mt', capitulo: 5, versiculo: 17, texto: 'Não cuideis que vim destruir a lei ou os profetas; não vim destruir, mas cumprir.', traducao: 'arc' },
  { livro: 'mt', capitulo: 5, versiculo: 18, texto: 'Porque em verdade vos digo que, até que o céu e a terra passem, nem um jota ou um til se omitirá da lei, sem que tudo seja cumprido.', traducao: 'arc' },
  { livro: 'mt', capitulo: 5, versiculo: 19, texto: 'Qualquer, pois, que violar um destes mandamentos, por menor que seja, e assim ensinar aos homens, será chamado o menor no reino dos céus; aquele, porém, que os cumprir e ensinar, será chamado grande no reino dos céus.', traducao: 'arc' },
  { livro: 'mt', capitulo: 5, versiculo: 22, texto: 'Eu, porém, vos digo que qualquer que, sem motivo, se irar contra o seu irmão, será réu de juízo; e qualquer que disser a seu irmão: Raca, será réu do sinédrio; e qualquer que lhe disser: Louco, será réu do fogo do inferno.', traducao: 'arc' },
  { livro: 'mt', capitulo: 5, versiculo: 24, texto: 'Deixa ali a tua oferta diante do altar, e vai; reconcilia-te primeiro com o teu irmão, e depois vem, e oferece a tua oferta.', traducao: 'arc' },
  { livro: 'mt', capitulo: 5, versiculo: 28, texto: 'Eu, porém, vos digo que qualquer que atentar numa mulher para a cobiçar, já em seu coração cometeu adultério com ela.', traducao: 'arc' },
  { livro: 'mt', capitulo: 5, versiculo: 34, texto: 'Eu, porém, vos digo que de modo nenhum jureis; nem pelo céu, porque é o trono de Deus;', traducao: 'arc' },
  { livro: 'mt', capitulo: 5, versiculo: 37, texto: 'Mas seja o vosso falar: Sim, sim; Não, não; porque o que passa disto procede do mal.', traducao: 'arc' },
  { livro: 'mt', capitulo: 5, versiculo: 39, texto: 'Eu, porém, vos digo que não resistais ao mal; antes, a qualquer que te ferir na face direita, oferece-lhe também a outra;', traducao: 'arc' },
  { livro: 'mt', capitulo: 5, versiculo: 44, texto: 'Eu, porém, vos digo: Amai a vossos inimigos, bendizei os que vos maldizem, fazei bem aos que vos odeiam, e orai pelos que vos perseguem e caluniam,', traducao: 'arc' },
  { livro: 'mt', capitulo: 5, versiculo: 45, texto: 'Para que sejais filhos do vosso Pai, que está nos céus; porque faz que o seu sol se levante sobre os maus e os bons, e envia chuva sobre os justos e os injustos.', traducao: 'arc' },
  { livro: 'mt', capitulo: 5, versiculo: 48, texto: 'Sede vós, pois, perfeitos, como é perfeito o vosso Pai, que está nos céus.', traducao: 'arc' },
  { livro: 'mt', capitulo: 6, versiculo: 1, texto: 'Guardai-vos de fazer a vossa esmola diante dos homens, para serdes vistos por eles; aliás, não tereis galardão junto de vosso Pai, que está nos céus.', traducao: 'arc' },
  { livro: 'mt', capitulo: 6, versiculo: 3, texto: 'Mas, quando tu fizeres esmola, não saiba a tua mão esquerda o que faz a tua direita,', traducao: 'arc' },
  { livro: 'mt', capitulo: 6, versiculo: 6, texto: 'Mas, tu, quando orares, entra no teu aposento e, fechando a tua porta, ora a teu Pai, que está em secreto; e teu Pai, que vê em secreto, te recompensará.', traducao: 'arc' },
  { livro: 'mt', capitulo: 6, versiculo: 7, texto: 'E, orando, não useis de vãs repetições, como os gentios; porque pensam que pelo seu muito falar serão ouvidos.', traducao: 'arc' },
  { livro: 'mt', capitulo: 6, versiculo: 9, texto: 'Portanto, vós orareis assim: Pai nosso, que estás nos céus, santificado seja o teu nome;', traducao: 'arc' },
  { livro: 'mt', capitulo: 6, versiculo: 10, texto: 'Venha o teu reino, seja feita a tua vontade, assim na terra como no céu;', traducao: 'arc' },
  { livro: 'mt', capitulo: 6, versiculo: 11, texto: 'O pão nosso de cada dia nos dá hoje;', traducao: 'arc' },
  { livro: 'mt', capitulo: 6, versiculo: 12, texto: 'E perdoa-nos as nossas dívidas, assim como nós perdoamos aos nossos devedores;', traducao: 'arc' },
  { livro: 'mt', capitulo: 6, versiculo: 13, texto: 'E não nos induzas à tentação; mas livrai-nos do mal; porque teu é o reino, e o poder, e a glória, para sempre. Amém.', traducao: 'arc' },
  { livro: 'mt', capitulo: 6, versiculo: 14, texto: 'Porque, se perdoardes aos homens as suas ofensas, também vosso Pai celestial vos perdoará a vós;', traducao: 'arc' },
  { livro: 'mt', capitulo: 6, versiculo: 19, texto: 'Não ajunteis para vós tesouros na terra, onde a traça e a ferrugem tudo consomem, e onde os ladrões minam e roubam;', traducao: 'arc' },
  { livro: 'mt', capitulo: 6, versiculo: 20, texto: 'Mas ajuntai para vós tesouros no céu, onde nem a traça nem a ferrugem consomem, e onde os ladrões não minam, nem roubam.', traducao: 'arc' },
  { livro: 'mt', capitulo: 6, versiculo: 21, texto: 'Porque onde estiver o vosso tesouro, aí estará também o vosso coração.', traducao: 'arc' },
  { livro: 'mt', capitulo: 6, versiculo: 24, texto: 'Ninguém pode servir a dois senhores; porque ou há de odiar um e amar o outro, ou há de se chegar a um e desprezar o outro. Não podeis servir a Deus e a Mamom.', traducao: 'arc' },
  { livro: 'mt', capitulo: 6, versiculo: 25, texto: 'Por isso vos digo: Não andeis ansiosos pela vossa vida, pelo que haveis de comer ou pelo que haveis de beber; nem pelo vosso corpo, pelo que haveis de vestir. Não é a vida mais do que o mantimento, e o corpo mais do que o vestido?', traducao: 'arc' },
  { livro: 'mt', capitulo: 6, versiculo: 26, texto: 'Olhai para as aves do céu, que nem semeiam, nem segam, nem ajuntam em celeiros; e vosso Pai celestial as alimenta. Não tendes vós muito mais valor do que elas?', traducao: 'arc' },
  { livro: 'mt', capitulo: 6, versiculo: 28, texto: 'E, pelo vestido, por que andais solícitos? Olhai para os lírios do campo, como crescem; não trabalham nem fiam;', traducao: 'arc' },
  { livro: 'mt', capitulo: 6, versiculo: 31, texto: 'Portanto, não andeis ansiosos, dizendo: Que comeremos? Ou: Que beberemos? Ou: Com que nos vestiremos?', traducao: 'arc' },
  { livro: 'mt', capitulo: 6, versiculo: 34, texto: 'Não vos inquieteis, pois, pelo dia de amanhã, porque o dia de amanhã cuidará de si mesmo. Basta a cada dia o seu mal.', traducao: 'arc' },
  { livro: 'mt', capitulo: 7, versiculo: 1, texto: 'Não julgueis, para que não sejais julgados.', traducao: 'arc' },
  { livro: 'mt', capitulo: 7, versiculo: 3, texto: 'E por que reparas tu no argueiro que está no olho do teu irmão, e não vês a trave que está no teu olho?', traducao: 'arc' },
  { livro: 'mt', capitulo: 7, versiculo: 5, texto: 'Hipócrita, tira primeiro a trave do teu olho, e então verás claramente para tirar o argueiro do olho do teu irmão.', traducao: 'arc' },
  { livro: 'mt', capitulo: 7, versiculo: 6, texto: 'Não dêem o que é santo aos cães, nem lanceis aos porcos as vossas pérolas, para que não as pisem com os pés, e se voltem para vos despedaçar.', traducao: 'arc' },
  { livro: 'mt', capitulo: 7, versiculo: 7, texto: 'Pedi, e dar-se-vos-á; buscai, e achareis; batei, e abrir-se-vos-á.', traducao: 'arc' },
  { livro: 'mt', capitulo: 7, versiculo: 8, texto: 'Porque, qualquer que pede, recebe; e, o que busca, acha; e, ao que bate, se abre.', traducao: 'arc' },
  { livro: 'mt', capitulo: 7, versiculo: 9, texto: 'Ou qual dentre vós é o homem que, pedindo-lhe o seu filho um pão, lhe dará uma pedra?', traducao: 'arc' },
  { livro: 'mt', capitulo: 7, versiculo: 11, texto: 'Se vós, pois, sendo maus, sabeis dar boas coisas aos vossos filhos, quanto mais vosso Pai, que está nos céus, dará bens aos que lhe pedirem?', traducao: 'arc' },
  { livro: 'mt', capitulo: 7, versiculo: 12, texto: 'Portanto, tudo o que vós quereis que os homens vos façam, fazei-lho também vós; porque esta é a lei e os profetas.', traducao: 'arc' },
  { livro: 'mt', capitulo: 7, versiculo: 13, texto: 'Entrai pela porta estreita; porque larga é a porta, e espaçoso é o caminho que conduz à perdição, e muitos são os que entram por ela;', traducao: 'arc' },
  { livro: 'mt', capitulo: 7, versiculo: 14, texto: 'Porque estreita é a porta, e apertado o caminho que conduz à vida, e poucos há que a encontrem.', traducao: 'arc' },
  { livro: 'mt', capitulo: 7, versiculo: 15, texto: 'Acautelai-vos, porém, dos falsos profetas, que vêm a vós disfarçados em ovelhas, mas, por dentro, são lobos devoradores.', traducao: 'arc' },
  { livro: 'mt', capitulo: 7, versiculo: 21, texto: 'Nem todo o que me diz: Senhor, Senhor! entrará no reino dos céus, mas aquele que faz a vontade de meu Pai, que está nos céus.', traducao: 'arc' },
  { livro: 'mt', capitulo: 7, versiculo: 24, texto: 'Todo aquele, pois, que ouve estas minhas palavras e as pratica, assemelhá-lo-ei ao homem prudente, que edificou a sua casa sobre a rocha;', traducao: 'arc' },
  { livro: 'mt', capitulo: 7, versiculo: 28, texto: 'E aconteceu que, concluindo Jesus este discurso, a multidão se admirou da sua doutrina;', traducao: 'arc' },
  { livro: 'mt', capitulo: 7, versiculo: 29, texto: 'Porque os ensinava como tendo autoridade, e não como os escribas.', traducao: 'arc' },
  { livro: 'mt', capitulo: 11, versiculo: 29, texto: 'Tomai sobre vós o meu jugo, e aprendei de mim, que sou manso e humilde de coração; e encontrareis descanso para as vossas almas.', traducao: 'arc' },
  { livro: 'mt', capitulo: 11, versiculo: 30, texto: 'Porque o meu jugo é suave, e o meu fardo é leve.', traducao: 'arc' },
  { livro: 'mt', capitulo: 22, versiculo: 29, texto: 'Jesus, porém, lhes respondeu: Errais, não conhecendo as Escrituras, nem o poder de Deus.', traducao: 'arc' },
  { livro: 'mt', capitulo: 22, versiculo: 37, texto: 'E Jesus disse-lhe: Amarás o Senhor teu Deus de todo o teu coração, e de toda a tua alma, e de todo o teu pensamento.', traducao: 'arc' },
  { livro: 'mt', capitulo: 22, versiculo: 39, texto: 'E o segundo, semelhante a este, é: Amarás o teu próximo como a ti mesmo.', traducao: 'arc' },
  { livro: 'mt', capitulo: 22, versiculo: 40, texto: 'Destes dois mandamentos dependem toda a lei e os profetas.', traducao: 'arc' },
  { livro: 'mt', capitulo: 28, versiculo: 18, texto: 'E Jesus, aproximando-se, falou-lhes, dizendo: Toda a autoridade me é dada no céu e na terra.', traducao: 'arc' },
  { livro: 'mt', capitulo: 28, versiculo: 19, texto: 'Portanto, ide, ensinai todas as nações, batizando-as em nome do Pai, e do Filho, e do Espírito Santo;', traducao: 'arc' },
  { livro: 'mt', capitulo: 28, versiculo: 20, texto: 'Ensinando-as a guardar todas as coisas que eu vos tenho mandado; e eis que eu estou convosco todos os dias, até à consumação dos séculos. Amém.', traducao: 'arc' },
];

// Idem para NVI (só uma amostra)
const NVI_VERSICULOS: Versiculo[] = VERSICULOS_PRINCIPAIS.slice(0, 30).map(v => ({
  ...v,
  texto: '', // será preenchido depois
  traducao: 'nvi',
}));

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function gerarAudio(texto: string, voz: string, outputFile: string): Promise<boolean> {
  if (!texto) return false;

  try {
    const tts = new EdgeTTS({
      voice: voz,
      lang: 'pt-BR',
      outputFormat: 'audio-24khz-48kbitrate-mono-mp3',
      rate: '-5%', // Ligeiramente mais lento = mais natural
      volume: '+0%',
      timeout: 30000,
    });

    await tts.ttsPromise(texto, outputFile);
    return true;
  } catch (e) {
    console.error(`  ✗ Erro: ${e instanceof Error ? e.message : 'desconhecido'}`);
    return false;
  }
}

async function main() {
  console.log('='.repeat(60));
  console.log('Pré-geração de Áudio TTS de Alta Qualidade (Edge Neural)');
  console.log('='.repeat(60));
  console.log(`Output: ${OUTPUT_DIR}`);
  console.log(`Total de versículos ARC: ${VERSICULOS_PRINCIPAIS.length}`);
  console.log();

  if (!existsSync(OUTPUT_DIR)) {
    await mkdir(OUTPUT_DIR, { recursive: true });
  }

  let sucesso = 0;
  let falhas = 0;

  for (const v of VERSICULOS_PRINCIPAIS) {
    const filename = `${v.livro}-${v.capitulo}-${v.versiculo}-${v.traducao}-feminina.mp3`;
    const filepath = path.join(OUTPUT_DIR, filename);

    if (existsSync(filepath)) {
      console.log(`✓ ${filename} (já existe)`);
      sucesso++;
      continue;
    }

    console.log(`→ ${filename}`);
    const ok = await gerarAudio(v.texto, VOZ_FEMININA, filepath);
    if (ok) {
      sucesso++;
      console.log(`  ✓ OK`);
    } else {
      falhas++;
    }

    await delay(500); // Rate limit
  }

  console.log();
  console.log('='.repeat(60));
  console.log(`Resultado: ${sucesso} sucessos, ${falhas} falhas`);
  console.log('='.repeat(60));
}

main().catch((e) => {
  console.error('Erro fatal:', e);
  process.exit(1);
});
