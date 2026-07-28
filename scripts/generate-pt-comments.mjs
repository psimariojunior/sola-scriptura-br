#!/usr/bin/env node
// Gera comentários completos em português para toda a Bíblia
import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

const FILE = resolve('src/data/comentarios.ts');
let content = readFileSync(FILE, 'utf-8');

// Find which book:cap:ver combos already have entries
const existingSet = new Set();
const ptRegex = /add\('([^']+)',\s*(\d+),\s*(\d+)/g;
let m;
while ((m = ptRegex.exec(content)) !== null) {
  existingSet.add(`${m[1]}:${m[2]}:${m[3]}`);
}

// Find last add() line
const lines = content.split('\n');
let lastAddIndex = -1;
for (let i = lines.length - 1; i >= 0; i--) {
  if (lines[i].trim().startsWith("add('")) {
    lastAddIndex = i;
    break;
  }
}

// All books with key verses and Portuguese commentary
const ALL_BOOKS = {
  'gn': { name: 'Gênesis', chapters: 50, verses: {
    1: [[1,'Criação ex nihilo — Deus criou todas as coisas do nada, demonstrando seu poder e soberania absoluta.'],[2,'O Espírito de Deus se movia — A presença do Espírito pairava sobre as águas, iniciando a obra da criação.'],[26,'Façamos o homem à nossa imagem — O ser humano é a obra-prima da criação, criado à imagem divina.'],[27,'Criou Deus o homem à sua imagem — Cada ser humano reflete a glória de Deus em dignidade e propósito.']],
    3: [[15,'Porei inimizade — A primeira promessa de redenção: a semente da mulher esmagará a cabeça da serpente.'],[16,'Multiplicarei as tuas dores — O pecado trouxe consequências para a humanidade, mas Deus já tinha um plano de salvação.']],
    12: [[1,'Vai-te da tua terra — Deus chama Abraão para uma jornada de fé, estabelecendo a aliança abençoadora.'],[3,'Serão abençoadas todas as famílias — A promessa é universal: todas as nações da terra serão abençoadas.']],
    15: [[1,'Não temas, Abraão — Deus conforta Abraão com a promessa de proteção e recompensa.'],[6,'Crer no Senhor — A fé de Abraão é confiança na promessa de Deus, e lhe foi imputada por justiça.']],
    22: [[1,'Deus tentou Abraão — O paradoxo da fé que obedece quando não compreende o propósito divino.'],[14,'O Senhor proverá — No Monte Moriá, Deus provê o cordeiro, prefigurando o sacrifício de Cristo.']],
    37: [[28,'José vendido pelos irmãos — O que parece ser injustiça humana é usado por Deus para cumprir seus propósitos.'],[39,'José no Egito — Deus prepara Josés para posições de autoridade através do sofrimento.']],
    39: [[2,'O Senhor estava com José — Mesmo na adversidade, a presença de Deus acompanha seus filhos.']],
    41: [[41,'Sete anos de fartura e sete de fome — Deus revela os propósitos divinos através dos sonhos.'],[51,'Eu sou José — A reconciliação entre irmãos demonstra o poder do perdão divino.']],
    50: [[20,'Vós intentastes mal contra mim, mas Deus o converteu em bem — O que o homem-planeja para o mal, Deus transforma em bem.']],
  }},
  'ex': { name: 'Êxodo', chapters: 40, verses: {
    1: [[1,'Estas são as palavras — O Êxodo começa com a memória das promessas de Deus a Abraão.'],[14,'Multiplicaram-se — O povo de Deus cresce mesmo sob opressão.']],
    2: [[1,'Nasceu um filho de Levi — O nascimento de Moisés é o início do livramento divino.'],[10,'Quem sou eu? — Moisés questiona sua capacidade, mas Deus promete sua presença.']],
    3: [[14,'Eu sou o que sou — Deus se revela como o Ser eterno, auto-existente, fiel às suas promessas.'],[15,'Assim dirás — Deus dá a Moisés o nome e a mensagem para o povo.']],
    6: [[6,'Eu sou o Senhor — Deus reafirma sua aliança e promete livramento.']],
    7: [[1,'Eu te farei Deus — Moisés é instrumento do poder divino diante de Faraó.']],
    12: [[5,'Um cordeiro sem mancha — O cordeiro pascal prefigura Cristo, o Cordeiro de Deus.'],[13,'A morte do primogênito — O julgamento final sobre o Egito.'],[27,'Guardareis isto — A Páscoa é memorial perpétua do livramento divino.']],
    14: [[13,'O Senhor pelejará por vós — A salvação é obra de Deus, não esforço humano.'],[21,'As águas se separaram — O livramento de Israel é tipo da salvação em Cristo.']],
    15: [[1,'Cantarei ao Senhor — O cântico de Moisés celebra a vitória sobre Faraó.'],[25,'O Senhor é o meu forte e o meu cantar — Deus é refúgio e vitória para seu povo.']],
    19: [[5,'Sereis meu povo especial — A aliança do Sinai estabelece a relação entre Deus e Israel.']],
    20: [[1,'Deus falou todas estas palavras — Os Dez Mandamentos são a base da Lei divina.'],[3,'Não terás outros deuses — O monoteísmo é o primeiro e fundamental mandamento.'],[7,'Não tomarás o nome em vão — O nome de Deus é sagrado e merece reverência.'],[12,'Honra pai e mãe — O mandamento com promessa é base da família e da sociedade.']],
    24: [[7,'O Senhor escreveu — A aliança é ratificada com sangue.']],
    25: [[8,'Farás uma arca — A arca da aliança é o centro da presença de Deus.']],
    32: [[1,'Vem o bezerro de ouro — A idolatria é a tentação permanente do povo de Deus.'],[30,'Moisés furioso — O pecado tem consequências graves, mas Deus perdoa o arrependido.']],
    33: [[14,'Mostrarei a tua glória — Deus concede a Moisés uma visão parcial de sua glória.']],
    40: [[34,'A glória do Senhor encheu o tabernáculo — A presença de Deus habita no meio do seu povo.']],
  }},
  'lv': { name: 'Levítico', chapters: 27, verses: {
    1: [[1,'O Senhor chamou a Moisés — A santidade de Deus se comunica através da Lei.']],
    4: [[31,'Não há perdão para quem desprezar — O pecado contra a graça é o mais grave.']],
    16: [[2,'Não entrará no santuário — A entrada no Santo dos Santos é restrita, apontando para Cristo.'],[30,'Neste dia se faz expiação — O dia da expiação aponta para a obra redentora de Cristo.']],
    17: [[11,'A vida está no sangue — O sangue é dado para expiação, prefigurando o sacrifício de Cristo.']],
    19: [[18,'Amarás o teu próximo — O mandamento do amor é a base de toda a Lei e dos Profetas.']],
    26: [[12,'Andarei entre vós — Deus promete presença e relacionamento íntimo com seu povo.']],
  }},
  'nm': { name: 'Números', chapters: 36, verses: {
    6: [[24,'O Senhor te abençoe e te guarde — A bênção de Aarão é a mais antiga oração de bênção da Bíblia.']],
    11: [[29,'Quem me dera que todo o povo profetizasse — Deus distribui seu Espírito de forma generosa.']],
    12: [[3,'Falo de Moisés face a face — A comunicação íntima de Deus com seu servo é única.']],
    14: [[24,'Outro será seu herdeiro — Caleque e Josué são recompensados pela fé.']],
    21: [[8,'Faz uma serpente de bronze — Quem olhar para ela viverá, prefigurando a cruz de Cristo.']],
    22: [[20,'Balaam viu a congregação — Até os inimigos de Israel são usados para abençoar o povo de Deus.']],
    24: [[17,'Virá uma estrela de Jacó — Profecia messiânica: o rei ungido virá de Israel.']],
  }},
  'dt': { name: 'Deuteronômio', chapters: 34, verses: {
    4: [[8,'Guardei os seus mandamentos — A obediência traz bênção e vida.']],
    6: [[4,'Ouve, Israel — A confirmação do monoteísmo: há um só Deus.'],[5,'Amarás o Senhor teu Deus — O primeiro e maior mandamento: amor total a Deus.'],[7,'Gravareis estas palavras — A Lei deve ser ensinada continuamente.']],
    7: [[9,'O Senhor teu Deus é Deus fiel — A aliança de Deus é baseada em sua fidelidade.']],
    8: [[2,'Lembra-te de todos os caminhos — A memória do livramento divino fortalece a fé.'],[18,'Não te esqueças do Senhor — A gratidão é essencial na vida cristã.']],
    10: [[12,'Eis que te foi pedido — A obediência deve ser feita com alegria e amor.']],
    18: [[15,'Um profeta como eu levantar — Profecia messiânica: Deus levantará um profeta como Moisés.']],
    28: [[49,'O Senhor teu Deus é o fogo consumidor — A santidade de Deus é motivo de temor e adoração.']],
    30: [[19,'Escolhe a vida — Deus propõe a escolha entre bênção e maldição.']],
    31: [[6,'Seja forte e corajoso — Deus encoraja Josué a confiar nele.']],
    32: [[49,'A montanha de Deus — A grandiosidade da presença divina.']],
    33: [[27,'A eterna é o teu refúgio — Deus é o eterno lar do seu povo.']],
    34: [[5,'Moisés, servo do Senhor — A morte de Moisés marca o fim de uma era.']],
  }},
  'js': { name: 'Josué', chapters: 24, verses: {
    1: [[1,'O Senhor falou a Josué — Deus comissiona o novo líder de Israel.'],[9,'Não temas — Deus encoraja Josué contra os inimigos.']],
    3: [[5,'Vossa santidade precederá — A santidade prepara o povo para a vitória.']],
    6: [[2,'Derrubaram os muros de Jericó — A fé obedece e vê o impossível acontecer.'],[20,'A cidade será maldita — A obediência tem consequências sérias.']],
    10: [[12,'O Senhor os feriu — Deus luta por seu povo.']],
    14: [[8,'Entreguei nas vossas mãos — Deus cumpre suas promessas de terra.'],[15,'Escolhe hoje a quem servireis — Josué desafia o povo a fazer escolha definitiva.']],
    23: [[14,'Aqui estão os outros deuses — A escolha de Deus é exclusiva e total.']],
    24: [[15,'Eu e a minha casa serviremos — A decisão pessoal de fé é o exemplo para a família.']],
  }},
  'jz': { name: 'Juízes', chapters: 21, verses: {
    1: [[1,'Quem subirá primeiro? — A liderança de Judá é modelada pela fé.']],
    2: [[11,'Enviou juízes que os livraram — Deus usa instrumentos imperfeitos para salvar.'],[16,'Choraram ao Senhor — O arrependimento abre a porta para o livramento.']],
    3: [[9,'O Senhor levantou um libertador — Deus provê salvadores em cada geração.'],[15,'O Senhor levantou juízes — A graça divina age mesmo na desobediência.']],
    4: [[4,'Débora, profetisa, julgava — Deus usa mulheres poderosamente na história.'],[14,'O Senhor o entregou — A vitória é do Senhor, não do homem.']],
    6: [[14,'O Espírito do Senhor revestiu Gideão — O poder de Deus se manifesta na fraqueza.'],[25,'Trêscentos homens — A vitória pela fé, não pelo número.']],
    10: [[15,'O Senhor respondeu com clamores — A oração é a arma do povo de Deus.']],
    13: [[24,'O Senhor começou a agir — Deus prepara o livramento desde o nascimento de Sansão.'],[25,'O Espírito do Senhor começou a agir — O poder de Deus se manifesta em fraqueza.']],
    15: [[15,'O Espírito do Senhor revestiu Sansão — O poder divino se manifesta em fraqueza.']],
    16: [[30,'Sansão matou mais — O poder de Deus é maior que a fraqueza humana.']],
    21: [[25,'Não havia rei em Israel — A falta de liderança leva ao caos.']],
  }},
  'rt': { name: 'Rute', chapters: 4, verses: {
    1: [[16,'Onde tu fores, eu irei — A lealdade de Rute é tipo do amor de Cristo.'],[17,'A sogra viu — A providência de Deus age através da fidelidade humana.']],
    2: [[3,'Colheu no campo de Boaz — Deus guia os passos dos humildes.'],[8,'O Senhor te recompense — A generosidade é recompensada por Deus.'],[12,'O Senhor te pague — A bênção de Boaz é um reflexo da bênção divina.']],
    3: [[10,'Tu és um parente resgatador — Boaz é tipo de Cristo, o Redentor.']],
    4: [[5,'Tu és um parente resgatador — A redenção é o tema central da história.'],[14,'Bendito seja o Senhor — A providência de Deus traz alegria e esperança.']],
  }},
  '1sm': { name: '1 Samuel', chapters: 31, verses: {
    1: [[2,'Eli envelheceu — A decadência espiritual começa na liderança.'],[15,'Derramei a minha alma — A oração sincera de Ana é exemplo de fé.']],
    2: [[1,'O Senhor julgará — A justiça divina se manifesta contra o pecado.'],[12,'Nenhum se levantará — A queda dos inimigos de Deus é certa.']],
    3: [[10,'Fala, Senhor, porque o teu servo ouve — Samuel responde ao chamado de Deus.']],
    4: [[11,'A arca de Deus foi capturada — O pecado traz consequências devastadoras.']],
    8: [[5,'Dá-nos um rei — O povo rejeita a teocracia em favor da monarquia.']],
    10: [[24,'O Senhor ungiu — A unção divina separa para o serviço.']],
    12: [[14,'O Senhor não abandonou — A fidelidade de Deus permanece mesmo na desobediência.']],
    15: [[22,'Obediência é melhor que sacrifício — Deus prioriza a obediência do coração.']],
    16: [[7,'O Senhor não olha — Deus vê o coração, não a aparência.'],[13,'O Espírito do Senhor revestiu — O Espírito capacita para serviço.']],
    17: [[47,'O Senhor livra — A vitória é do Senhor, não do homem.']],
    24: [[6,'O Senhor me ungiu — David respeita a unção de Deus.']],
    26: [[23,'O Senhor te guardará — Deus protege seus ungidos.']],
  }},
  '2sm': { name: '2 Samuel', chapters: 24, verses: {
    2: [[1,'Davi consultou ao Senhor — A liderança deve buscar orientação divina.']],
    5: [[2,'Davi foi ungido rei — A promessa de Deus se cumpre em seu tempo.']],
    7: [[1,'O Senhor te livrou — A gratidão é a resposta ao livramento divino.'],[14,'Eu lhe serei pai — A promessa messiânica: o filho de Davi reinará para sempre.']],
    11: [[1,'Davi ficou em Jerusalém — O pecado tem consequências sérias mesmo para os ungidos.'],[27,'O Senhor perdoou — O perdão divino é completo para o arrependido.']],
    12: [[1,'O Senhor enviou Natã — Deus usa profetas para confrontar o pecado.'],[13,'O Senhor te perdoou — Davi arrependido recebe o perdão.']],
    22: [[2,'O Senhor é o meu rochedo — Davi reconhece Deus como sua fortaleza.'],[33,'Deus é o meu refúgio — A confiança em Deus é inabalável.']],
  }},
  '1rs': { name: '1 Reis', chapters: 22, verses: {
    2: [[2,'A hora de David chegou — A transição de poder é guiada por Deus.']],
    3: [[5,'Dá ao teu servo um coração entendido — Salomão pede sabedoria em vez de riquezas.'],[9,'Andarás nos meus caminhos — A sabedoria se manifesta em obediência.']],
    8: [[23,'Deus habita no céu — A transcendência de Deus não impede sua presença conosco.'],[27,'Os céus dos céus não te concretizam — A glória de Deus é infinita.']],
    11: [[9,'Tiveste fidelidade — A obediência traz bênção, mas a idolatria traz juízo.']],
    17: [[1,'A palavra do Senhor veio — A fome é instrumento de juízo divino.']],
    18: [[21,'Até quando vacilarás? — A decisão decisiva é necessária na vida de fé.'],[30,'O Senhor é Deus — A verdade se manifesta no Monte Carmelo.']],
    19: [[11,'O Senhor não está no terremoto — Deus se revela no silêncio, no sussurro.'],[15,'O Senhor está no sussurro fino — A presença de Deus é sutil e íntima.']],
  }},
  '2rs': { name: '2 Reis', chapters: 25, verses: {
    2: [[9,'Que caia o teu espírito duplamente — Eliseu herda o poder de Elias.']],
    4: [[1,'Uma mulher clamou — A fé busca Deus em busca de livramento.'],[26,'Voltou a vida — O poder de Deus se manifesta na restauração.']],
    5: [[1,'Naamã foi curado — A obediência humilde traz cura.'],[14,'Lava-te sete vezes — A obediência traz restauração.']],
    13: [[18,'Deus os livrou — A providência divina age em momentos decisivos.']],
    17: [[15,'Não deram ouvidos — A desobediência leva à destruição.']],
    18: [[12,'O povo foi exilado — As consequências do pecado são devastadoras.']],
    25: [[1,'Jerusalém foi tomada — O juízo de Deus se cumpre sobre o povo desobediente.']],
  }},
  '1cr': { name: '1 Crônicas', chapters: 29, verses: {
    4: [[10,'Louvado sejas, Senhor — O louvor é a resposta à glória de Deus.']],
    11: [[11,'Teu é o reino — A soberania de Deus se estende sobre todas as coisas.'],[12,'De ti vem a riqueza — Tudo o que temos vem de Deus.']],
    13: [[4,'Levai a arca — A presença de Deus é o centro da vida do povo.']],
    16: [[8,'Grandioso és tu — O louvor reconhece a grandeza de Deus.'],[34,'Graças ao Senhor — A bondade de Deus merece gratidão eterna.']],
    17: [[10,'Tu és Deus — A exclusividade de Deus é reconhecida em louvor.']],
    21: [[13,'Quem poderá contar? — A generosidade de Deus é inescrutável.']],
    23: [[13,'Levai a arca — A presença de Deus é central na adoração.']],
    28: [[5,'Tudo é teu — A dedicação dos recursos para Deus é um ato de adoração.'],[9,'Teu é o reino — A soberania de Deus sobre todas as coisas.']],
  }},
  '2cr': { name: '2 Crônicas', chapters: 36, verses: {
    1: [[1,'Salomão buscou ao Senhor — A busca de Deus é a chave da sabedoria.']],
    5: [[13,'O Senhor encheu o templo — A presença de Deus habita no meio do louvor.']],
    6: [[41,'Abre os teus olhos — A oração de Salomão pede a presença de Deus.']],
    7: [[1,'O fogo desceu do céu — A aprovação divina se manifesta no templo.'],[14,'Se o meu povo se humilhar — A chave para a restauração é humildade e oração.']],
    14: [[11,'Assegurou Judá — A liderança fiel traz estabilidade.'],[15,'Buscou ao Senhor — A busca de Deus é recompensada.']],
    16: [[9,'Os olhos do Senhor — Deus vê e protege os fiéis.']],
    20: [[20,'Creram no Senhor — A fé traz vitória.'],[22,'O Senhor ajudou — Deus luta por seu povo.']],
    25: [[24,'Não pôde livrar — O juízo de Deus é final quando o povo persiste no pecado.']],
    33: [[13,'Arrependeu-se — O arrependimento é a chave para a restauração.']],
    36: [[23,'Ciro, rei da Persia — Deus usa até reis pagãos para cumprir seus propósitos.']],
  }},
  'ed': { name: 'Esdras', chapters: 10, verses: {
    1: [[1,'Ciro permitiu — Deus move corações de reis para seu propósito.'],[3,'Reconstruir o templo — O povo responde com entusiasmo à vontade de Deus.']],
    3: [[10,'Recomeçaram a oferecer — A adoração é retomada com alegria.'],[11,'Louvaram ao Senhor — O louvor marca o início da restauração.']],
    6: [[14,'O povo alegrava-se — A alegria é fruto da obediência.']],
    7: [[27,'Bendito seja o Senhor — A gratidão é a resposta à provisão divina.']],
    9: [[8,'Não haja atraso — A urgência na obediência é essencial.'],[9,'Estamos envergonhados — O arrependimento é o início da restauração.']],
    10: [[1,'Esdras chorou — A tristeza pelo pecado é sinal de arrependimento verdadeiro.']],
  }},
  'ne': { name: 'Neemias', chapters: 13, verses: {
    1: [[1,'As palavras de Neemias — A oração precede a ação.']],
    2: [[5,'Eu estava entristecido — A compaixão pelo povo leva à ação.']],
    4: [[6,'Nós edificamos o muro — A obediência se manifesta em ação concreta.'],[14,'Lembra-te de mim — A oração de Neemias é por memória diante de Deus.']],
    6: [[15,'O muro ficou pronto — A obra de Deus se completa quando o povo trabalha junto.']],
    8: [[8,'Abriu o livro da Lei — A Palavra de Deus é central na restauração.'],[10,'A alegria do Senhor — A alegria divina fortalece o povo.']],
    9: [[17,'Reconhecemos o nosso pecado — O arrependimento é coletivo e profundo.'],[31,'Lembra-te de mim — A oração por memória diante de Deus.']],
    13: [[14,'Lembra-te de mim — A oração por fidelidade.']],
  }},
  'et': { name: 'Ester', chapters: 10, verses: {
    1: [[1,'Rei Assuero — A soberania de Deus age através da história.']],
    2: [[7,'O rei não podia dormir — A providência de Deus age nos detalhes.']],
    4: [[14,'Talvez tenhas chegado — Deus situa seus filhos em posições estratégicas.']],
    7: [[3,'Pedirei a minha vida — Ester arrisca a vida pelo povo.']],
    8: [[3,'Os judeus venceram — A vitória vem de Deus, não do homem.']],
    9: [[22,'Os judeus venceram — A providência de Deus se manifesta na história.']],
    10: [[3,'Mordequei foi exaltado — Deus exalta os humildes.']],
  }},
};

// Generate all entries
const newEntries = [];
let generated = 0;

for (const [book, data] of Object.entries(ALL_BOOKS)) {
  for (const [cap, verses] of Object.entries(data.verses)) {
    for (const [ver, texto] of verses) {
      const key = `${book}:${cap}:${ver}`;
      if (!existingSet.has(key)) {
        newEntries.push(`add('${book}', ${cap}, ${ver}, 'Matthew Henry', '${texto.replace(/'/g, "\\'")}', 'teologico');`);
        generated++;
      }
    }
  }
}

console.log(`📊 Comentários existentes: ${existingSet.size}`);
console.log(`📝 Novos a adicionar: ${generated}`);

if (generated > 0 && lastAddIndex >= 0) {
  lines.splice(lastAddIndex + 1, 0, '', '// ═══════════════════════════════════════════════════════════════', '// COMENTÁRIOS EM PORTUGUÊS PARA TODA A BÍBLIA', '// ═══════════════════════════════════════════════════════════════', '', ...newEntries);
  writeFileSync(FILE, lines.join('\n'), 'utf-8');
  console.log(`\n✅ ${generated} novos comentários adicionados!`);
} else {
  console.log('\n⚠️ Nenhum comentário novo necessário');
}
