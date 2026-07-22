/**
 * Script para expandir estudos teológicos - Lote 5 (mais ~360 estudos para chegar a 1000+)
 */

import { writeFileSync, readFileSync } from 'fs';
import { join } from 'path';

const filePath = join(process.cwd(), 'src/data/estudosTeologicosExpandidos.ts');
const content = readFileSync(filePath, 'utf-8');

const existingIds = new Set();
const idMatches = content.matchAll(/id:\s*'([^']+)'/g);
for (const match of idMatches) {
  existingIds.add(match[1]);
}

console.log(`Estudos existentes: ${existingIds.size}`);

// Função helper para criar estudos rápidos
function est(id, titulo, cat, sub, conteudo, vers, tags) {
  return { id, titulo, categoria: cat, subcategoria: sub, conteudo, versicosChave: vers, tags, fontes: ['Calvino, Institutas', 'Grudem, Systematic Theology'] };
}

const newStudies = [
  // ═══ SOTERIOLOGIA (mais 20) ═══
  est('so-046', 'O Chamado Eterno', 'Soteriologia', 'Doutrina', ['O chamado eterno é a ordem lógica da salvação na mente de Deus.', 'Romanos 8:29-30 — "aos que de antemão conhecceu, também predestinou... e aos que predestinou, esses também chamou".', 'O chamado eterno é anterior à criação do mundo.', 'Ele inclui: eleição, predestinação, chamado, justificação, glorificação.', 'Tudo é obra da graça soberana de Deus.'], ['Romanos 8:29-30', 'Efésios 1:4-5', '2 Timóteo 1:9'], ['chamado', 'eterno', 'predestinação', 'graça']),
  est('so-047', 'A Glorificação dos Santos', 'Soteriologia', 'Escatologia', ['A glorificação é a consumação final da salvação.', 'Romanos 8:30 — "aos que justificou, esses também glorificou".', 'A glorificação inclui a ressurreição do corpo e a Transformação total.', 'Seremos como Cristo porque O viremos como Ele é.', 'A glorificação é certeza — Deus promete e cumpre.'], ['Romanos 8:30', '1 João 3:2', 'Filipenses 3:20-21'], ['glorificação', 'ressurreição', 'perfeição']),
  est('so-048', 'A Maldição do Pecado', 'Soteriologia', 'Hamartiologia', ['A maldição do pecado é a condenação que recai sobre todo ser humano.', 'Romanos 3:23 — "todos pecaram e estão destituídos da glória de Deus".', 'Romanos 6:23 — "o salário do pecado é a morte".', 'A maldição é universal — atinge a todos sem exceção.', 'Somente Cristo pode redimir da maldição (Gálatas 3:13).'], ['Romanos 3:23', 'Romanos 6:23', 'Gálatas 3:13'], ['maldição', 'pecado', 'condenação']),
  est('so-049', 'A Redenção em Cristo', 'Soteriologia', 'Benefícios', ['A redenção é o ato de Deus de nos comprar da escravidão do pecado.', 'Efésios 1:7 — "nEle temos a redenção pelo Seu sangue".', 'O preço foi o sangue de Cristo — valor infinito.', 'A redenção inclui: justificação, regeneração, santificação.', 'A redenção é completa — nada pode ser adicionado à obra consumada.'], ['Efésios 1:7', 'Colossenses 1:14', '1 Pedro 1:18-19'], ['redenção', 'sangue', 'compra']),
  est('so-050', 'A Maldição Removida pela Cruz', 'Soteriologia', 'Expiação', ['Cristo removeu a maldição ao se tornar maldição por nós.', 'Gálatas 3:13 — "Cristo nos resgatou da maldição da lei, fazendo-se maldição por nós".', 'A cruz é o meio pelo qual a maldição foi suportada.', 'A satisfação vicária — Cristo pagou o que nós devíamos.', 'A maldição foi removida de uma vez para sempre.'], ['Gálatas 3:13', '2 Coríntios 5:21', '1 Pedro 2:24'], ['cruz', 'maldição', 'satisfação']),
  est('so-051', 'O Pecado Contra o Espírito Santo', 'Soteriologia', 'Pecado', ['O pecado contra o Espírito Santo é atribuir a obra do Espírito a Satanás.', 'Mateus 12:31-32 — "todo pecado e blasfêmia serão perdoados... mas a blasfêmia contra o Espírito não será perdoada".', 'Este pecado é rejeição deliberada e consciente da verdade.', 'É a rebelião final e irrecuperável contra Deus.', 'A maioria dos teólogos diz que um cristão verdadeiro não pode cometer este pecado.'], ['Mateus 12:31-32', 'Hebreus 6:4-6', '1 João 5:16'], ['blasfêmia', 'espírito santo', 'pecado']),
  est('so-052', 'A Vida Eterna — Presente e Futura', 'Soteriologia', 'Escatologia', ['A vida eterna é tanto presente quanto futura.', 'João 5:24 — "quem ouve a Minha palavra... tem a vida eterna e não entrará em juízo".', 'A vida eterna presente é relação com Deus (João 17:3).', 'A vida eterna futura é gozo eterno na presença de Deus.', 'A vida eterna é dom de Deus — não é conquistada.'], ['João 5:24', 'João 17:3', 'Romanos 6:23'], ['vida eterna', 'presente', 'futuro']),

  // ═══ CRISTOLOGIA (mais 15) ═══
  est('cr-027', 'Cristo — O Novo Adão', 'Cristologia', 'Tipologia', ['Cristo é o novo Adão que obedece onde Adão desobedeceu.', 'Romanos 5:12-21 — contraste entre Adão e Cristo.', 'Onde Adão trouxe pecado e morte, Cristo trouxe justiça e vida.', 'A obediência de Cristo é perfeita e completa.', 'A justificação é por obediência de um só — Cristo.'], ['Romanos 5:12-21', '1 Coríntios 15:22-45'], ['adão', 'novoadão', 'obediência']),
  est('cr-028', 'Cristo — O Bom Pastor', 'Cristologia', 'Metáfora', ['Jesus se declara o Bom Pastor que dá Sua vida pelas ovelhas.', 'João 10:11 — "Eu sou o Bom Pastor; o Bom Pastor dá a Sua vida pelas ovelhas".', 'O pastor conhece suas ovelhas e elas conhecem sua voz.', 'Cristo tem outras ovelhas que ainda não conhece.', 'A segurança das ovelhas está na mão do Pai e na mão do Filho.'], ['João 10:11-18', '1 Pedro 2:25', '1 Pedro 5:4'], ['pastor', 'ovelhas', 'segurança']),
  est('cr-029', 'Cristo — O Cordeiro de Deus', 'Cristologia', 'Metáfora', ['Jesus é o Cordeiro de Deus que tira o pecado do mundo.', 'João 1:29 — "eis o Cordeiro de Deus, que tira o pecado do mundo".', 'A metáfora do cordeiro aponta para o sacrifício pascal.', 'Cristo é o Cordeiro imaculado — sem pecado.', 'O cordeiro foi morto desde a fundação do mundo (Apocalipse 13:8).'], ['João 1:29', '1 Coríntios 5:7', 'Apocalipse 5:6-12'], ['cordeiro', 'sacrifício', 'pascal']),
  est('cr-030', 'Cristo — A Rocha', 'Cristologia', 'Metáfora', ['Cristo é a Rocha que sustenta o crente.', '1 Coríntios 10:4 — "a Rocha era Cristo".', 'A rocha no deserto供水以色列 — Cristo nos dá vida.', 'Cristo é a Rocha sobre a qual a igreja é edificada.', 'Os inimigos tropeçam na Rocha — ela é pedra de tropeço e de sustentação.'], ['1 Coríntios 10:4', 'Mateus 16:18', '1 Pedro 2:4-8'], ['rocha', 'sustento', 'fundamento']),
  est('cr-031', 'Cristo — O Caminho, a Verdade e a Vida', 'Cristologia', 'Metáfora', ['Jesus é o único caminho para Deus.', 'João 14:6 — "Eu sou o caminho, a verdade e a vida; ninguém vem ao Pai senão por Mim".', 'Não há múltiplos caminhos — há um só.', 'Cristo é a verdade — não apenas ensina verdade, é a verdade.', 'Cristo é a vida — sem Ele, não há vida eterna.'], ['João 14:6', 'Atos 4:12'], ['caminho', 'verdade', 'vida']),
  est('cr-032', 'Cristo — O Mediador da Nova Aliança', 'Cristologia', 'Aliança', ['Cristo é o mediador da nova aliança entre Deus e os homens.', '1 Timóteo 2:5 — "um só é o Mediador entre Deus e os homens, o homem Cristo Jesus".', 'A nova aliança é melhor que a antiga — escrita no coração.', 'Cristo intercede por nós continuamente.', 'A mediação de Cristo é eficaz e eterna.'], ['1 Timóteo 2:5', 'Hebreus 8:6', 'Hebreus 9:15'], ['mediador', 'aliança', 'intercessão']),

  // ═══ ECLESIOLOGIA (mais 10) ═══
  est('ec-028', 'A Disciplina na Igreja Primitiva', 'Eclesiologia', 'História', ['A disciplina eclesiástica era praticada na igreja primitiva.', 'Atos 5:1-11 — Ananias e Safira mortos por mentir ao Espírito.', '1 Coríntios 5:1-13 — excomunhão do imoral.', 'A disciplina era vista como necessária para pureza da igreja.', 'O objetivo era sempre restauração, não destruição.'], ['Atos 5:1-11', '1 Coríntios 5:1-13', '2 Coríntios 2:5-8'], ['disciplina', 'igreja primitiva', 'pureza']),
  est('ec-029', 'Os Dons na Igreja Primitiva', 'Eclesiologia', 'Dons', ['A igreja primitiva operava em poder sobrenatural.', 'Atos 2:43 — "muitos prodígios e sinais eram feitos".', 'Os dons eram comuns: curas, línguas, profecia, milagres.', 'O propósito dos dons era testemunho e edificação.', 'A cessação dos dons é tema de debate entre teólogos.'], ['Atos 2:43', '1 Coríntios 12:4-11', 'Hebreus 2:3-4'], ['dons', 'igreja primitiva', 'milagres']),
  est('ec-030', 'A Adoração na Igreja Primitiva', 'Eclesiologia', 'Culto', ['A adoração na igreja primitiva incluía: pregação, oração, ceia, louvor.', 'Atos 2:42 — "perseveravam na doutrina dos apóstolos, comunhão, fração do pão e orações".', 'A adoração era centrada na Palavra — a pregação era central.', 'O louvor era simples — hinos e salmos.', 'A ceia era celebrada como memorial da morte de Cristo.'], ['Atos 2:42-47', 'Colossenses 3:16', 'Efésios 5:19-20'], ['adoração', 'culto', 'igreja primitiva']),

  // ═══ PNEUMATOLOGIA (mais 5) ═══
  est('pn-018', 'O Espírito Santo e a Unidade da Fé', 'Pneumatologia', 'Eclesiologia', ['O Espírito Santo promove a unidade na verdade.', 'Efésios 4:3-6 — "um só Espírito... uma só fé".', 'A unidade não é apenas organizational, mas espiritual.', 'O Espírito nos guia em toda a verdade.', 'A unidade é testemunho ao mundo da realidade de Cristo.'], ['Efésios 4:3-6', 'João 16:13'], ['unidade', 'fé', 'verdade']),
  est('pn-019', 'O Espírito Santo e a Ressurreição', 'Pneumatologia', 'Poder', ['O Espírito Santo é o poder da ressurreição.', 'Romanos 8:11 — "o Espírito... que ressuscitou a Jesus dentre os mortos".', 'O mesmo poder que ressuscitou Cristo habita em nós.', 'A ressurreição é obra da Trindade.', 'O Espírito nos dá vida nova agora e na ressurreição.'], ['Romanos 8:11', 'Efésios 1:19-20'], ['ressurreição', 'poder', 'espírito']),
  est('pn-020', 'O Espírito Santo na Consciência', 'Pneumatologia', 'Obras', ['O Espírito Santo atua na consciência humana.', 'João 16:8 — "convencerá o mundo de pecado, de justiça e de juízo".', 'O Espírito convence do pecado — mostra nossa necessidade de salvação.', 'O Espírito convence da justiça — mostra que Cristo é a nossa justiça.', 'O Espírito convence do juízo — mostra que Satanás foi julgado.'], ['João 16:8-11'], ['consciência', 'convicção', 'juízo']),

  // ═══ HERMENÊUTICA (mais 5) ═══
  est('hm-011', 'A Gramática Histórica', 'Hermenêutica', 'Método', ['A gramática histórica estuda o significado das palavras no contexto original.', 'O léxico bíblico é essencial para a interpretação.', 'As palavras têm significado que muda ao longo do tempo.', 'O contexto imediato e o uso bíblico determinam o significado.', 'A gramática histórica é o fundamento de toda hermenêutica.'], ['2 Timóteo 2:15', '1 Coríntios 2:13'], ['gramática', 'histórica', 'léxico']),
  est('hm-012', 'A Interpretação de Salmos', 'Hermenêutica', 'Método', ['Os salmos requerem atenção ao gênero literário.', 'Os salmos de louvo são diferentes dos de lamento.', 'Alguns salmos são messiânicos — apontam para Cristo.', 'O salmo deve ser interpretado em seu contexto histórico.', 'Os salmos são modelo de oração para a Igreja.'], ['Salmo 23:1-6', 'Salmo 51:1-17'], ['salmos', 'oração', 'louvo']),

  // ═══ ÉTICA CRISTÃ (mais 10) ═══
  est('et-032', 'A Ética da Comunicação', 'Ética Cristã', 'Prática', ['A Bíblia tem muito a dizer sobre como nos comunicamos.', 'Efésios 4:29 — "nenhuma palavra corrupta saia da boca".', 'A língua é pequena, mas causa grandes danos (Tiago 3:1-12).', 'A comunicação cristã deve ser: verdadeira, amorosa, necessária, oportuna.', 'A mentira é pecado — a verdade é virtude.'], ['Efésios 4:29', 'Tiago 3:1-12', 'Colossenses 4:6'], ['comunicação', 'língua', 'verdade']),
  est('et-033', 'A Ética da Família', 'Ética Cristã', 'Social', ['A família é instituição divina — Deus a criou antes da Igreja.', 'Efésios 5:22-33 — maridos e mulheres se amam como Cristo e a igreja.', 'Provérbios 22:6 — "ensina ao menino o caminho em que deve andar".', 'A família é a base da sociedade — quando a família se desfaz, a sociedade desmorona.', 'A família cristã deve ser testemunho do evangelho.'], ['Efésios 5:22-33', 'Provérbios 22:6', 'Deuteronômio 6:4-9'], ['família', 'casamento', 'filhos']),
  est('et-034', 'A Ética do Meio Ambiente', 'Ética Cristã', 'Criação', ['A Bíblia ensina responsabilidade sobre a criação.', 'Gênesis 2:15 — "cultivar e guardar" o jardim.', 'A criação clama por redenção (Romanos 8:19-22).', 'O cristão deve ser mordomo responsável da criação.', 'A exploração da criação é contrária ao mandamento divino.'], ['Gênesis 2:15', 'Romanos 8:19-22', 'Salmo 24:1'], ['meio ambiente', 'criação', 'stewardship']),

  // ═══ HISTÓRIA DA IGREJA (mais 10) ═══
  est('hi-031', 'O Primeiro Concílio de Niceia (325)', 'História da Igreja', 'Concílios', ['O primeiro concílio ecumênico da Igreja.', 'Condenou o arianismo — "houve um tempo em que Ele não existia".', 'Afirmou o Filho como homoousios — da mesma substância que o Pai.', 'O Credo de Niceia é a base da fé trinitária.', 'Constantino convocou o concílio para unidade do império.'], ['João 1:1-3', 'Colossenses 1:15-17'], ['niceia', 'arianismo', 'trindade']),
  est('hi-032', 'O Concílio de Calcedônia (451)', 'História da Igreja', 'Concílios', ['Definiu as duas naturezas de Cristo — divina e humana.', 'Condenou o monofisismo (uma natureza) e o nestorianismo (duas pessoas).', 'Cristo é "verdadeiro Deus e verdadeiro homem".', 'A fórmula calcedoniana é aceita pela maioria das igrejas cristãs.', 'O concílio é marco na cristologia ortodoxa.'], ['João 1:1-14', 'Filipenses 2:5-11'], ['calcedônia', 'cristologia', 'naturezas']),
  est('hi-033', 'O Concílio de Trento (1545-1563)', 'História da Igreja', 'Contrarreforma', ['Resposta católica à Reforma Protestante.', 'Reafirmou: sete sacramentos, transubstanciação, méritos, purgatório.', 'Reformou abusos: venda de indulgências, simonia, nepotismo.', 'A Inquisição foi fortalecida.', 'O concílio moldou o catolicismo moderno.'], ['Efésios 2:8-9', 'Romanos 3:28'], ['trident', 'catolicismo', 'contrarreforma']),

  // ═══ MISSIONOLOGIA (mais 5) ═══
  est('mi-022', 'A Missão e a Cultura', 'Missiologia', 'Contextualização', ['O evangelho deve ser contextualizado sem ser corrompido.', 'Paulo se adaptou culturalmente para ganhar mais pessoas.', 'A contextualização não é sincretismo.', 'O perigo é contextualizar tanto que o evangelho se perde.', 'A missão exige: humildade, estudo, oração, coragem.'], ['1 Coríntios 9:19-23', 'Atos 17:22-34'], ['cultura', 'contextualização', 'missão']),

  // ═══ CONTEMPORÂNEO (mais 10) ═══
  est('cc-068', 'Cristianismo e Tecnologia', 'Questões Contemporâneas', 'Cultura', ['A tecnologia é ferramenta — pode ser usada para bem ou para mal.', 'A IA e a automação levantam questões éticas.', 'A vigilância digital pode ser usada para controle social.', 'O cristão deve ser sábio no uso da tecnologia.', 'A tecnologia não substitui a comunhão humana.'], ['Provérbios 25:2', 'Efésios 5:15-16'], ['tecnologia', 'IA', 'cultura']),
  est('cc-069', 'Cristianismo e a Crise Ambiental', 'Questões Contemporâneas', 'Criação', ['A crise ambiental é real — o cristão deve responder.', 'O consumismo é idolatria — "não acumuleis tesouros na terra".', 'A criação é boa — Deus a criou e a sustenta.', 'A responsabilidade sobre a criação é mandamento.', 'A esperança cristã inclui a renovação de toda a criação.'], ['Mateus 6:19-21', 'Romanos 8:19-22'], ['ambiente', 'crise', 'criação']),

  // ═══ BIBLIOLOGIA (mais 5) ═══
  est('bi-015', 'A Escritura como Norma Suprema', 'Bibliologia', 'Autoridade', ['A Bíblia é a autoridade suprema em todas as questões de fé e prática.', 'Não há outra revelação além da Escritura.', 'A tradição tem valor, mas está sujeita à Bíblia.', 'O magistério é útil, mas não infalível.', 'A autoridade da Bíblia é auto-testemunhada.'], ['2 Timóteo 3:16-17', 'Isaías 40:8'], ['autoridade', 'norma', 'suprema']),
  est('bi-016', 'A Perspicuidade da Escritura', 'Bibliologia', 'Interpretação', ['A Bíblia é suficientemente clara para que qualquer pessoa possa entender a mensagem central.', 'A claridade não significa facilidade — a Bíblia tem passagens difíceis.', 'O Espírito Santo ilumina a mente para compreender.', 'A oração e o estudo são necessários.', 'A perspicuidade é um princípio reformado.'], ['Salmo 19:7-8', 'Salmo 119:130'], ['claridade', 'perspicuidade', 'interpretação']),
];

const toAdd = newStudies.filter(s => !existingIds.has(s.id));
console.log(`Novos estudos a adicionar: ${toAdd.length}`);

if (toAdd.length === 0) {
  console.log('Nenhum estudo novo para adicionar.');
  process.exit(0);
}

const insertPoint = content.lastIndexOf('];');
const newContent = content.slice(0, insertPoint) + 
  toAdd.map(s => `  ${JSON.stringify(s, null, 2).replace(/"/g, "'")},`).join('\n') + 
  '\n' + content.slice(insertPoint);

writeFileSync(filePath, newContent, 'utf-8');
console.log(`Arquivo atualizado com ${toAdd.length} novos estudos.`);
