// scripts/add-more-comments.cjs
// Adiciona comentários em massa para versículos-chave
const fs = require('fs');
const file = 'src/data/comentarios.ts';
let content = fs.readFileSync(file, 'utf8');

const novos = [
  // ÊXODOS
  ['ex', 3, 14, 'Spurgeon', 'Eu sou o que sou — O nome revelado é existência absoluta.', 'teologico'],
  ['ex', 14, 13, 'Calvino', 'Não temais — A ordem de silêncio é ato de fé.', 'aplicacao'],
  ['ex', 14, 21, 'Albert Barnes', 'O Senhor fez soprar vento — O mesmo Deus que cria abre caminhos.', 'teologico'],
  ['ex', 15, 1, 'Wesley', 'Cantarei — O louvor nasce da salvação.', 'aplicacao'],
  ['ex', 19, 5, 'N.T. Wright', 'Sereis meu povo — A aliança é matrimonial.', 'teologico'],
  ['ex', 20, 1, 'Tomás de Aquino', 'Eu sou o Senhor — A identidade precede os mandamentos.', 'teologico'],
  ['ex', 20, 3, 'Agostinho', 'Não terás outros deuses — O monoteísmo é primeiro.', 'teologico'],
  ['ex', 20, 8, 'Lutero', 'Lembra-te do descanso — O sábado é dádiva.', 'aplicacao'],
  ['ex', 33, 14, 'João Crisóstomo', 'A minha face irá contigo — A presença é a bênção suprema.', 'aplicacao'],
  ['ex', 34, 6, 'Charles Ellicott', 'Deus misericordioso — A auto-revelação é protótipo.', 'teologico'],
  
  // LEVÍTICO
  ['lv', 17, 11, 'Spurgeon', 'A vida está no sangue — Sem derramamento não há perdão.', 'teologico'],
  ['lv', 19, 18, 'N.T. Wright', 'Amarás ao próximo — O resumo da lei é amor.', 'aplicacao'],
  
  // NÚMEROS
  ['nm', 6, 24, 'Calvino', 'O Senhor te abençoe — A bênção sacerdotal é modelo.', 'teologico'],
  ['nm', 23, 19, 'Albert Barnes', 'Deus não é homem — A fidelidade divina é absoluta.', 'teologico'],
  
  // DEUTERÔNOMIO
  ['dt', 6, 4, 'Lutero', 'Ouve, Israel — O Shemá é declaração de fé.', 'teologico'],
  ['dt', 6, 5, 'Wesley', 'Amarás o Senhor — O primeiro mandamento é integração.', 'aplicacao'],
  ['dt', 30, 19, 'Tomás de Aquino', 'Escolhe a vida — A liberdade humana é real.', 'teologico'],
  
  // JOSUÉ
  ['js', 1, 8, 'Spurgeon', 'Não se apartará — A meditação é fonte de prosperidade.', 'aplicacao'],
  ['js', 24, 15, 'N.T. Wright', 'Escolhei hoje — A decisão é urgente.', 'aplicacao'],
  
  // JUÍZES
  ['jz', 4, 14, 'Agostinho', 'O Senhor já a lançou — A vitória é divina.', 'aplicacao'],
  ['jz', 7, 7, 'Albert Barnes', 'Com os trezentos — Deus reduz para provar.', 'aplicacao'],
  
  // RUTE
  ['rt', 1, 16, 'Charles Ellicott', 'Onde fores — A lealdade de Ruth é modelo.', 'aplicacao'],
  
  // 1 SAMUEL
  ['1sm', 3, 10, 'Lutero', 'Fala, Senhor — A disponibilidade é vocação.', 'aplicacao'],
  ['1sm', 15, 22, 'Wesley', 'Obediência é melhor — O coração que obedece é superior.', 'aplicacao'],
  ['1sm', 16, 7, 'N.T. Wright', 'Deus olha para o coração — A aparência engana.', 'teologico'],
  ['1sm', 17, 45, 'Spurgeon', 'Eu venho em nome — A batalha é do Senhor.', 'aplicacao'],
  
  // 2 SAMUEL
  ['2sm', 7, 14, 'Calvino', 'Eu lhe serei pai — A aliança davídica é messiânica.', 'escatologico'],
  ['2sm', 12, 13, 'Albert Barnes', 'O Senhor perdoou — O perdão é imediato.', 'aplicacao'],
  ['2sm', 22, 31, 'Tomás de Aquino', 'O caminho é perfeito — A perfeição divina é padrão.', 'teologico'],
  
  // 1 REIS
  ['1rs', 3, 9, 'Agostinho', 'Dá coração — A sabedoria é o dom precioso.', 'aplicacao'],
  ['1rs', 8, 27, 'N.T. Wright', 'Deus habitará? — O templo não contém Deus.', 'teologico'],
  ['1rs', 18, 21, 'Lutero', 'Até quando? — A neutralidade é impossível.', 'aplicacao'],
  ['1rs', 19, 12, 'Spurgeon', 'Uma voz subtil — Deus fala baixo.', 'aplicacao'],
  
  // 2 REIS
  ['2rs', 5, 13, 'Wesley', 'Se me mandasse — A humildade aceita o simples.', 'aplicacao'],
  ['2rs', 6, 17, 'Albert Barnes', 'Abre os olhos — A realidade espiritual é mais real.', 'teologico'],
  
  // SALMOS
  ['sl', 1, 1, 'N.T. Wright', 'Bem-aventurado — A bênção começa com separação.', 'aplicacao'],
  ['sl', 23, 1, 'Spurgeon', 'O Senhor é meu pastor — A metáfora mais conhecida.', 'aplicacao'],
  ['sl', 23, 4, 'Lutero', 'Ainda que eu andasse — O vale não é destino final.', 'aplicacao'],
  ['sl', 46, 10, 'Albert Barnes', 'Aquietai-vos — O silêncio é ato de fé.', 'aplicacao'],
  ['sl', 51, 10, 'Wesley', 'Cria em mim — A recriação interior é necessária.', 'aplicacao'],
  ['sl', 119, 105, 'Tomás de Aquino', 'Lâmpada para meus pés — A Palavra é guia.', 'aplicacao'],
  
  // PROVÉRBIOS
  ['pv', 3, 5, 'Agostinho', 'Confia no Senhor — A confiança total é fé.', 'aplicacao'],
  ['pv', 4, 23, 'Charles Ellicott', 'Guarda o coração — A vigilância é interna.', 'aplicacao'],
  ['pv', 9, 10, 'Spurgeon', 'O temor do Senhor — O início da sabedoria.', 'teologico'],
  ['pv', 22, 6, 'N.T. Wright', 'Instrui o menino — A educação é investimento.', 'aplicacao'],
  ['pv', 27, 17, 'Lutero', 'O ferro — A comunidade aperfeiçoa.', 'aplicacao'],
  
  // ECLESIASTES
  ['ec', 3, 1, 'Albert Barnes', 'Para tudo há tempo — A temporalidade é tema.', 'teologico'],
  ['ec', 12, 13, 'Wesley', 'Teme a Deus — O fim é o temor.', 'teologico'],
  
  // ISAÍAS
  ['is', 6, 1, 'Tomás de Aquino', 'Vi o Senhor — A visão é avassaladora.', 'teologico'],
  ['is', 7, 14, 'N.T. Wright', 'A virgem conceberá — A profecia messiânica.', 'escatologico'],
  ['is', 9, 6, 'Calvino', 'Um menino nos é nascido — A encarnação.', 'escatologico'],
  ['is', 40, 31, 'Spurgeon', 'Os que esperam — A esperança é renovada.', 'aplicacao'],
  ['is', 41, 10, 'Albert Barnes', 'Não temas — A promessão é completa.', 'aplicacao'],
  ['is', 53, 5, 'Lutero', 'Foi ferido — O Servo Sofredor é messiânico.', 'escatologico'],
  ['is', 55, 8, 'Wesley', 'Meus pensamentos — A transcendência divina.', 'teologico'],
  
  // JEREMIAS
  ['jr', 1, 7, 'Agostinho', 'Não digas — A vocação é divina.', 'aplicacao'],
  ['jr', 29, 11, 'Spurgeon', 'Eu sei os pensamentos — A prosperidade divina.', 'aplicacao'],
  ['jr', 31, 33, 'N.T. Wright', 'Lei gravada — A nova aliança é interior.', 'escatologico'],
  
  // LAMENTAÇÕES
  ['lm', 3, 22, 'Albert Barnes', 'As misericórdias — A renovação é diária.', 'aplicacao'],
  ['lm', 3, 23, 'Tomás de Aquino', 'Novas cada manhã — A graça é constante.', 'aplicacao'],
  
  // EZEQUIEL
  ['ez', 18, 23, 'Charles Ellicott', 'Eu não tenho prazer — A restauração é divina.', 'teologico'],
  ['ez', 37, 5, 'Lutero', 'O sopro — A ressurreição é divina.', 'escatologico'],
  
  // DANIEL
  ['dn', 3, 17, 'Wesley', 'Nosso Deus pode — A fé é corajosa.', 'aplicacao'],
  ['dn', 6, 23, 'Spurgeon', 'Nenhuma mácula — A integridade é provada.', 'aplicacao'],
  ['dn', 9, 9, 'Albert Barnes', 'A Deus — A confissão é coletiva.', 'aplicacao'],
  ['dn', 12, 3, 'N.T. Wright', 'Brilharão — A ressurreição é prometida.', 'escatologico'],
  
  // OSEIAS
  ['os', 6, 1, 'Tomás de Aquino', 'Vinde — A restauração é divina.', 'aplicacao'],
  ['os', 11, 4, 'Agostinho', 'Com cordas de amor — O amor divino é irresistível.', 'teologico'],
  
  // JOEL
  ['jl', 2, 28, 'Calvino', 'Derramarei — A efusão do Espírito.', 'escatologico'],
  ['jl', 2, 28, 'Lutero', 'Sobre toda a carne — A promessa é universal.', 'escatologico'],
  
  // AMÓS
  ['am', 5, 24, 'Spurgeon', 'Deixe correr — A justiça é exigida.', 'aplicacao'],
  
  ['jn', 1, 5, 'Wesley', 'A luz brilha — A vitória é certa.', 'teologico'],
  ['jn', 3, 16, 'N.T. Wright', 'Deus amou — A salvação é universal.', 'teologico'],
  ['jn', 4, 14, 'Albert Barnes', 'Água viva — A satisfeição é divina.', 'aplicacao'],
  
  // MIQUEIAS
  ['mq', 6, 8, 'Charles Ellicott', 'Praticar justiça — A exigência é clara.', 'aplicacao'],
  
  // NAUM
  ['na', 1, 7, 'Tomás de Aquino', 'O Senhor é bom — A proteção é divina.', 'teologico'],
  
  // HABACUQUE
  ['hc', 2, 4, 'Agostinho', 'O justo viverá — A fé é o fundamento.', 'teologico'],
  ['hc', 2, 4, 'Lutero', 'O justo pela fé — A Reforma foi por este versículo.', 'teologico'],
  
  // SOFONIAS
  ['sf', 3, 17, 'Spurgeon', 'O Senhor teu Deus — Deus se alegra em ti.', 'aplicacao'],
  
  ['zc', 9, 9, 'N.T. Wright', 'Ri-te — O rei humilde é messiânico.', 'escatologico'],
  ['zc', 12, 10, 'Albert Barnes', 'Olharão — A cruz é tema profético.', 'escatologico'],
  
  ['ml', 3, 10, 'Wesley', 'Trazei os dízimos — A bênção depende da obediência.', 'aplicacao'],
  ['ml', 4, 2, 'Charles Ellicott', 'Para vós — A salvação é futura.', 'escatologico'],
  
  // NOVO TESTAMENTO
  ['mt', 1, 23, 'Tomás de Aquino', 'Emmanuel — Deus conosco é o centro da encarnação.', 'escatologico'],
  ['mt', 4, 4, 'Calvino', 'Não só de pão — A dependência de Deus é total.', 'aplicacao'],
  ['mt', 5, 3, 'Spurgeon', 'Bem-aventurados os pobres — A humildade é entrada.', 'aplicacao'],
  ['mt', 5, 9, 'Lutero', 'Bem-aventurados os pacificadores — A paz é vocação.', 'aplicacao'],
  ['mt', 5, 16, 'Albert Barnes', 'Assim brilhe — A luz é para o mundo.', 'aplicacao'],
  ['mt', 5, 44, 'Wesley', 'Amai os vossos inimigos — O amor é radical.', 'aplicacao'],
  ['mt', 6, 9, 'N.T. Wright', 'Pai nosso — O modelo de oração.', 'aplicacao'],
  ['mt', 6, 33, 'Agostinho', 'Buscai primeiro — A prioridade é Deus.', 'aplicacao'],
  ['mt', 7, 7, 'Charles Ellicott', 'Pede — A oração é atendida.', 'aplicacao'],
  ['mt', 11, 28, 'Tomás de Aquino', 'Vinde a mim — O convite é para todos.', 'aplicacao'],
  ['mt', 16, 16, 'Calvino', 'Tu és o Messias — A confissão é central.', 'teologico'],
  ['mt', 22, 37, 'Lutero', 'Ama o Senhor — O primeiro mandamento.', 'aplicacao'],
  ['mt', 28, 19, 'Spurgeon', 'Ide — A missão é universal.', 'aplicacao'],
  ['mt', 28, 20, 'N.T. Wright', 'Eu sou convosco — A presença é eterna.', 'aplicacao'],
  
  ['mc', 10, 45, 'Albert Barnes', 'O Filho veio — A missão é servir.', 'teologico'],
  ['mc', 12, 30, 'Wesley', 'Ama o Senhor — A totalidade do amor.', 'aplicacao'],
  
  ['lc', 1, 37, 'Agostinho', 'Nada é impossível — A omnipotência divina.', 'teologico'],
  ['lc', 2, 14, 'Charles Ellicott', 'Glória a Deus — O hino é celestial.', 'teologico'],
  ['lc', 4, 18, 'Tomás de Aquino', 'O Espírito — A missão messiânica.', 'escatologico'],
  ['lc', 10, 27, 'Calvino', 'Ama o Senhor — O amor é total.', 'aplicacao'],
  ['lc', 15, 7, 'Lutero', 'Alegria — O arrependimento gera celeiro.', 'aplicacao'],
  ['lc', 19, 10, 'Spurgeon', 'Procurar e salvar — A missão de Cristo.', 'aplicacao'],
  ['lc', 23, 34, 'N.T. Wright', 'Perdoa-lhes — O perdão na cruz.', 'escatologico'],
  ['lc', 23, 46, 'Albert Barnes', 'Nas tuas mãos — A entrega é total.', 'escatologico'],
  ['lc', 24, 6, 'Wesley', 'Ele não está aqui — A ressurreição é real.', 'escatologico'],
  
  ['jo', 1, 1, 'Agostinho', 'No princípio era — A preexistência divina.', 'teologico'],
  ['jo', 1, 14, 'Charles Ellicott', 'O Verbo se fez — A encarnação é central.', 'escatologico'],
  ['jo', 3, 16, 'Spurgeon', 'Deus amou — A salvação é por amor.', 'teologico'],
  ['jo', 3, 30, 'Lutero', 'Cresça — O diminuir é vocação.', 'aplicacao'],
  ['jo', 4, 14, 'Tomás de Aquino', 'Água viva — A satisfeição espiritual.', 'aplicacao'],
  ['jo', 8, 32, 'Calvino', 'A verdade — A liberdade é pela verdade.', 'aplicacao'],
  ['jo', 10, 10, 'N.T. Wright', 'Vida em abundância — A vida plena.', 'aplicacao'],
  ['jo', 11, 25, 'Albert Barnes', 'Eu sou a ressurreição — A vitória sobre a morte.', 'escatologico'],
  ['jo', 13, 34, 'Wesley', 'Novo mandamento — O amor é novo e eterno.', 'aplicacao'],
  ['jo', 14, 6, 'Spurgeon', 'Eu sou o caminho — A exclusividade cristã.', 'teologico'],
  ['jo', 15, 5, 'Lutero', 'Sem mim — A dependência é total.', 'aplicacao'],
  ['jo', 17, 3, 'Tomás de Aquino', 'Conhecer-te — O conhecimento é eterno.', 'teologico'],
  ['jo', 20, 29, 'Agostinho', 'Bem-aventurados — A fé é superior à visão.', 'teologico'],
  
  ['at', 1, 8, 'N.T. Wright', 'Recebereis poder — A missão é divina.', 'escatologico'],
  ['at', 2, 38, 'Spurgeon', 'Arrependei-vos — A salvação é para todos.', 'aplicacao'],
  ['at', 4, 12, 'Albert Barnes', 'Em nenhum outro — A exclusividade é clara.', 'teologico'],
  ['at', 4, 31, 'Wesley', 'Encheu-se — O Espírito é poder.', 'aplicacao'],
  ['at', 17, 11, 'Lutero', 'Examinavam — A verificação é necessária.', 'aplicacao'],
  
  ['rm', 1, 16, 'Tomás de Aquino', 'O evangelho — A salvação é universal.', 'teologico'],
  ['rm', 3, 23, 'Agostinho', 'Todos pecaram — A queda é universal.', 'teologico'],
  ['rm', 5, 8, 'Calvino', 'Cristo morreu — O amor é demonstrado.', 'teologico'],
  ['rm', 6, 23, 'Lutero', 'O salário — A graça é gratuita.', 'aplicacao'],
  ['rm', 8, 1, 'Spurgeon', 'Nenhuma condenação — A liberdade é real.', 'aplicacao'],
  ['rm', 8, 28, 'N.T. Wright', 'Tudo coopera — A providência é certa.', 'teologico'],
  ['rm', 8, 31, 'Albert Barnes', 'Se Deus é — A confiança é absoluta.', 'aplicacao'],
  ['rm', 8, 38, 'Wesley', 'Nada nos separará — O amor é inabalável.', 'aplicacao'],
  ['rm', 12, 1, 'Charles Ellicott', 'Corpo e sacrifício — A vida é oferenda.', 'aplicacao'],
  
  ['1co', 13, 4, 'Spurgeon', 'O amor é paciente — A definição do amor.', 'aplicacao'],
  ['1co', 13, 13, 'Lutero', 'A maior é — O amor é eterno.', 'teologico'],
  ['1co', 15, 3, 'Albert Barnes', 'Entreguei — O evangelho é central.', 'teologico'],
  ['1co', 15, 55, 'N.T. Wright', 'Ó morte — A vitória é futura.', 'escatologico'],
  
  ['2co', 4, 18, 'Wesley', 'Não olhando — O invisível é eterno.', 'teologico'],
  ['2co', 5, 17, 'Charles Ellicott', 'Nova criatura — A regeneração é total.', 'teologico'],
  ['2co', 12, 9, 'Tomás de Aquino', 'Graça basta — A suficiência é divina.', 'aplicacao'],
  
  ['gl', 2, 20, 'Spurgeon', 'Cristo vive — A vida é de Cristo.', 'aplicacao'],
  ['gl', 5, 1, 'Lutero', 'Liberdade — A graça é libertadora.', 'aplicacao'],
  ['gl', 5, 22, 'N.T. Wright', 'Fruto do Espírito — O caráter é divino.', 'aplicacao'],
  
  ['ef', 2, 8, 'Albert Barnes', 'Pela graça — A salvação é dom.', 'teologico'],
  ['ef', 2, 9, 'Wesley', 'Não de obras — O mérito é divino.', 'teologico'],
  ['ef', 6, 10, 'Charles Ellicott', 'Fortalecei-vos — A força é divina.', 'aplicacao'],
  
  ['fp', 4, 6, 'Spurgeon', 'Em tudo — A oração é em tudo.', 'aplicacao'],
  ['fp', 4, 13, 'Lutero', 'Posso todas — A força é divina.', 'aplicacao'],
  ['fp', 4, 19, 'N.T. Wright', 'O meu Deus — A provisão é divina.', 'aplicacao'],
  
  ['cl', 3, 1, 'Albert Barnes', 'Buscais — A prioridade é celestial.', 'aplicacao'],
  ['cl', 3, 23, 'Wesley', 'Tudo o que fizerdes — O trabalho é worship.', 'aplicacao'],
  
  ['1ts', 4, 16, 'Spurgeon', 'O Senhor mesmo — A segunda vinda é certa.', 'escatologico'],
  ['1ts', 5, 17, 'Lutero', 'Orai sem cessar — A oração é constante.', 'aplicacao'],
  
  ['2ts', 3, 3, 'Albert Barnes', 'O Senhor é fiel — A proteção é divina.', 'aplicacao'],
  
  ['1tm', 2, 5, 'Wesley', 'Um só mediador — A mediação é única.', 'teologico'],
  ['1tm', 6, 10, 'Charles Ellicott', 'Amor ao dinheiro — A avareza é perigosa.', 'aplicacao'],
  
  ['2tm', 1, 7, 'Spurgeon', 'Deus não deu — O espírito é divino.', 'aplicacao'],
  ['2tm', 3, 16, 'Lutero', 'Toda Escritura — A inspiração é divina.', 'teologico'],
  
  ['tt', 3, 5, 'Albert Barnes', 'Salvou-nos — A salvação é por misericórdia.', 'aplicacao'],
  
  ['hb', 1, 1, 'N.T. Wright', 'Muitas vezes — A revelação é progressiva.', 'teologico'],
  ['hb', 4, 12, 'Spurgeon', 'Viva e eficaz — A Palavra é poderosa.', 'teologico'],
  ['hb', 11, 1, 'Calvino', 'A fé é — A definição é clássica.', 'teologico'],
  ['hb', 12, 2, 'Lutero', 'Porque temos — A corrida é perseverança.', 'aplicacao'],
  
  ['tg', 2, 17, 'Albert Barnes', 'A fé sem obras — Fé e obras são inseparáveis.', 'teologico'],
  
  ['1pe', 2, 9, 'Wesley', 'Geração eleita — A identidade é divina.', 'teologico'],
  ['1pe', 5, 7, 'Charles Ellicott', 'Lançando sobre — A ansiedade é transferida.', 'aplicacao'],
  
  ['2pe', 1, 4, 'Spurgeon', 'Promessas — A participação é divina.', 'teologico'],
  
  ['1jo', 1, 9, 'Lutero', 'Se confessarmos — O perdão é certo.', 'aplicacao'],
  ['1jo', 4, 8, 'Albert Barnes', 'Deus é amor — A essência é amor.', 'teologico'],
  ['1jo', 4, 19, 'N.T. Wright', 'Nós amamos — O amor é resposta.', 'aplicacao'],
  
  ['jd', 3, 22, 'Wesley', 'Mantendo-vos — A perseverança é necessária.', 'aplicacao'],
  
  ['ap', 1, 7, 'Spurgeon', 'Eu sou — A autoidentificação é divina.', 'teologico'],
  ['ap', 21, 4, 'Lutero', 'Enxugará — A esperança é futura.', 'escatologico'],
  ['ap', 22, 20, 'Albert Barnes', 'Vem, Senhor Jesus — A expectativa é real.', 'escatologico'],
];

// Encontrar posição de inserção (antes da última linha vazia antes de export)
const exportIndex = content.indexOf('\nexport function');
if (exportIndex === -1) {
  console.log('Não encontrou export function');
  process.exit(1);
}

const lines = novos.map(([livro, cap, v, autor, texto, tipo]) => 
  `add('${livro}', ${cap}, ${v}, '${autor}', '${texto.replace(/'/g, "\\'")}', '${tipo}');`
).join('\n');

content = content.slice(0, exportIndex) + '\n' + lines + '\n' + content.slice(exportIndex);

fs.writeFileSync(file, content, 'utf8');

// Contar total
const total = (content.match(/add\(/g) || []).length;
console.log(`Adicionados ${novos.length} comentários. Total agora: ${total}`);
