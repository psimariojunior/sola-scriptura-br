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
