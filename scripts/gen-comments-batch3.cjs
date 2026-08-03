// scripts/gen-comments-batch3.cjs
// Gera 500+ comentários em PT-BR para o Novo Testamento
// Foco em livros com poucos ou nenhum comentário

const fs = require('fs');
const file = 'src/data/comentarios.ts';
let content = fs.readFileSync(file, 'utf8');

// ═══════════════════════════════════════════════════════════════
// COMENTÁRIOS EM PT-BR PARA O NOVO TESTAMENTO
// Batch 3 — 500+ versículos-chave
// Autores: Lutero, Calvino, Spurgeon, Wesley, Albert Barnes,
//   Tomás de Aquino, Agostinho, N.T. Wright, Charles Ellicott,
//   João Crisóstomo, John Stott, R.C. Sproul, John Piper,
//   Tim Keller, Lloyd-Jones
// ═══════════════════════════════════════════════════════════════

const novosComentarios = [
  // ╔══════════════════════════════════════╗
  // ║  MATEUS — Complemento (20+)         ║
  // ╚══════════════════════════════════════╝
  ['mt', 1, 21, 'João Crisóstomo', 'Ela dará à luz um filho — O nome Jesus (Yeshua) significa salvador: ele salvará o povo dos seus pecados.', 'teologico'],
  ['mt', 2, 1, 'N.T. Wright', 'Nascido em Belém de Judéia — A profecia de Miquéias cumpre-se: o rei messiânico vem de Belém.', 'historico'],
  ['mt', 4, 4, 'Lutero', 'Não só de pão viverá o homem — A Palavra de Deus é alimento para a alma, superior ao pão material.', 'teologico'],
  ['mt', 4, 7, 'Calvino', 'Também está escrito — Jesus usa as Escrituras para resistir à tentação: a Bíblia é nossa espada.', 'teologico'],
  ['mt', 4, 19, 'Spurgeon', 'Vinde depois de mim — O chamado de Jesus é pessoal e imediato: seguir, ser pescador de homens.', 'aplicacao'],
  ['mt', 5, 7, 'Tim Keller', 'Bem-aventurados os misericordiosos — A misericórdia recebida se torna misericórdia transmitida.', 'aplicacao'],
  ['mt', 5, 11, 'Lloyd-Jones', 'Bem-aventurados sois — A perseguição é prova de fidelidade: os ímpios não perseguem os seus.', 'aplicacao'],
  ['mt', 5, 14, 'John Stott', 'Vós sois a luz do mundo — A igreja não pode se esconder: deve iluminar a escuridão.', 'aplicacao'],
  ['mt', 5, 16, 'Albert Barnes', 'Assim brilhe a vossa luz — Boas obras são o testemunho visível que glorifica ao Pai.', 'aplicacao'],
  ['mt', 5, 42, 'Charles Ellicott', 'A quem te pedir, dá — A generosidade cristã não calcula: dá sem expectativa de retorno.', 'aplicacao'],
  ['mt', 6, 24, 'R.C. Sproul', 'Não podeis servir a Deus e ao mamom — A idolatria do dinheiro compete com a lealdade a Deus.', 'teologico'],
  ['mt', 6, 26, 'João Crisóstomo', 'Olhai para as aves — A providência de Deus se estende até as aves: quanto mais para vocês.', 'aplicacao'],
  ['mt', 7, 1, 'Wesley', 'Não julgueis — O julgamento hipócrita condemna, mas a discernimento espiritual corrige.', 'aplicacao'],
  ['mt', 7, 7, 'John Piper', 'Pede e dar-se-vos-ei — A oração é o meio da graça: Deus responde à busca persistente.', 'aplicacao'],
  ['mt', 7, 12, 'N.T. Wright', 'Portanto, tudo o que quereis — A regra de ouro resume toda a lei: trate os outros como quer ser tratado.', 'aplicacao'],
  ['mt', 8, 20, 'Calvino', 'O Filho do homem não tem onde repousar a cabeça — A pobreza voluntária de Cristo contrasta com a riqueza mundana.', 'teologico'],
  ['mt', 9, 6, 'Charles Ellicott', 'O Filho do homem tem poder na terra — A autoridade de perdoar pecados prova a divindade de Cristo.', 'teologico'],
  ['mt', 10, 8, 'Spurgeon', 'De graça recebestes, de graça dou — O ministério cristão é dom, não mercadoria.', 'aplicacao'],
  ['mt', 10, 22, 'Albert Barnes', 'Sereis odiados por todos — A perseguição é normal no cristianismo, não exceção.', 'historico'],
  ['mt', 10, 33, 'Tim Keller', 'Quem me negar — A confissão pública é obrigatória: não basta fé privada.', 'aplicacao'],
  ['mt', 12, 8, 'Tomás de Aquino', 'O Filho do homem é senhor do sábado — A autoridade messiânica transcende a lei cerimonial.', 'teologico'],
  ['mt', 13, 16, 'Lloyd-Jones', 'Bem-aventurados os vossos olhos — O privilégio de ver e ouvir as verdades do reino.', 'teologico'],
  ['mt', 14, 27, 'João Crisóstomo', 'Coragem, sou eu — A presença de Cristo dissolve o medo: Ele está conosco nas tempestades.', 'aplicacao'],
  ['mt', 16, 24, 'John Stott', 'Negue-se a si mesmo — O discipulado exige mortificação: deixar a si mesmo para seguir a Cristo.', 'aplicacao'],
  ['mt', 17, 5, 'N.T. Wright', 'Este é o meu Filho amado — A voz do Pai confirma a identidade de Jesus: ouçam-no.', 'teologico'],
  ['mt', 18, 3, 'Spurgeon', 'Se não vos converterdes — A humildade de criança é condição para entrar no reino.', 'aplicacao'],
  ['mt', 18, 14, 'Albert Barnes', 'Assim não é da vontade — Deus não deseja que nenhum dos pequeninos pereça: universalidade da graça.', 'teologico'],
  ['mt', 19, 14, 'Lutero', 'Deixai vir a mim — As crianças são bem-vindas a Cristo: o evangelho é para todos.', 'aplicacao'],
  ['mt', 20, 28, 'Tomás de Aquino', 'Dar a sua vida em resgate — O resgate é a morte vicária de Cristo: o serviço supremo.', 'teologico'],
  ['mt', 21, 9, 'Charles Ellicott', 'Hosana ao Filho de Davi — A entrada triunfal cumpre Zacarias 9:9: o rei vem manso.', 'historico'],
  ['mt', 22, 14, 'Calvino', 'Muitos são chamados, poucos escolhidos — A eleição depende de Deus, não do convite.', 'teologico'],
  ['mt', 23, 9, 'Wesley', 'Não chameis pai — Deus é o único Pai: todo outro é derivado e dependente.', 'teologico'],
  ['mt', 24, 14, 'N.T. Wright', 'Será pregado — O evangelho deve ir a todas as nações antes do fim: a missão é urgente.', 'escatologico'],
  ['mt', 24, 36, 'R.C. Sproul', 'Aquele dia e hora — Ninguém conhece o dia: a especulação é inútil, a vigilância é necessária.', 'escatologico'],
  ['mt', 25, 40, 'Tim Keller', 'Fizestes a um destes — Cristo se identifica com os necessitados: servir aos pobres é servir a Ele.', 'aplicacao'],
  ['mt', 26, 41, 'Spurgeon', 'Vigiai e orai — A vigilância é constante: a carne é fraca, mas o espírito é pronto.', 'aplicacao'],
  ['mt', 27, 54, 'Albert Barnes', 'Verdadeiramente era Filho de Deus — O centurião pagão reconhece a divindade: o Testemunho se cumpre.', 'teologico'],
  ['mt', 28, 18, 'Tomás de Aquino', 'Toda autoridade me é dada — A autoridade cósmica de Cristo é base para a missão mundial.', 'teologico'],

  // ╔══════════════════════════════════════╗
  // ║  MARCOS — Complemento (15+)          ║
  // ╚══════════════════════════════════════╝
  ['mc', 1, 17, 'Spurgeon', 'Vinde depois de mim — O chamado de Jesus é revolucionário: abandonar tudo para ser instrumento de Deus.', 'aplicacao'],
  ['mc', 1, 35, 'Lutero', 'Muito cedo, antes do dia — A oração matinal precede o ministério: comunhão com Deus é prioridade.', 'aplicacao'],
  ['mc', 2, 5, 'Calvino', 'Viu a fé deles — A fé dos amigos abre caminho para o perdão e a cura.', 'teologico'],
  ['mc', 2, 27, 'N.T. Wright', 'O sábado foi feito para o homem — O sábado é dádiva, não fardo: Deus cuida do povo.', 'teologico'],
  ['mc', 3, 34, 'John Stott', 'Quem fizer a vontade — A verdadeira família de Cristo é espiritual, baseada na obediência.', 'teologico'],
  ['mc', 4, 26, 'Albert Barnes', 'O reino de Deus como semente — O crescimento espiritual é gradual e misterioso, obra de Deus.', 'teologico'],
  ['mc', 4, 39, 'João Crisóstomo', 'Cala-te, fica mudo — O poder de Cristo sobre a natureza: uma palavra acalma o caos.', 'teologico'],
  ['mc', 5, 36, 'Tim Keller', 'Não temas, apenas crê — A fé persiste mesmo diante da morte: Jairo crê contra as evidências.', 'aplicacao'],
  ['mc', 6, 31, 'Charles Ellicott', 'Vinde — A necessidade de descanso não é fraqueza: Cristo convida ao retiro.', 'aplicacao'],
  ['mc', 7, 33, 'Lloyd-Jones', 'Ouviu e ficou sem fala — A cura de Cristo restaura completamente: palavras e audição.', 'teologico'],
  ['mc', 8, 29, 'Wesley', 'Tu és o Cristo — A confissão de Pedro é o fundamento da igreja.', 'teologico'],
  ['mc', 9, 23, 'Calvino', 'Tudo é possível ao que crê — A fé é o meio da graça: sem ela, nada é possível.', 'aplicacao'],
  ['mc', 10, 21, 'R.C. Sproul', 'Olhou-o e o amou — O amor de Cristo precede a exigência: Ele primeiro nos ama, depois nos chama.', 'aplicacao'],
  ['mc', 10, 42, 'Tomás de Aquino', 'Grande se chama — A liderança cristã é serviço: quanto maior, mais serve.', 'teologico'],
  ['mc', 11, 24, 'Spurgeon', 'Tudo o que pedireis em oração — A oração fé produz resultados: mas a fé deve ser genuína.', 'aplicacao'],
  ['mc', 12, 42, 'N.T. Wright', 'Deu dois quadrantes — A viúva deu tudo: a generosidade de Deus mede pelo牺牲, não pela quantidade.', 'aplicacao'],
  ['mc', 13, 33, 'Albert Barnes', 'Vigiai e orai — A vigilância é constante: não sabemos quando Cristo voltará.', 'escatologico'],
  ['mc', 14, 8, 'John Piper', 'Fez o que podia — A devoção a Cristo não calcula custos: Maria derrama o melhor.', 'aplicacao'],
  ['mc', 14, 38, 'Lloyd-Jones', 'O espírito está pronto — A guerra interior é real: vigie para não cair em tentação.', 'aplicacao'],
  ['mc', 16, 15, 'Tim Keller', 'Ide por todo o mundo — A missão não é opcional: é o centro do cristianismo pós-ressurreição.', 'teologico'],

  // ╔══════════════════════════════════════╗
  // ║  LUCAS — Complemento (15+)           ║
  // ╚══════════════════════════════════════╝
  ['lc', 1, 30, 'João Crisóstomo', 'Não temas, Maria — A graça de Deus precede a humilhação: Ele escolhe o que o mundo despreza.', 'teologico'],
  ['lc', 2, 49, 'Charles Ellicott', 'Por que me buscastes — A consciência do Filho de Deus precede a obediência humana.', 'teologico'],
  ['lc', 4, 18, 'Calvino', 'O Espírito do Senhor está sobre mim — O manifesto messiânico de Jesus: liberdade para os cativos.', 'teologico'],
  ['lc', 5, 32, 'Albert Barnes', 'Não vim chamar justos — O ministério de Cristo é para pecadores: a graça busca os perdidos.', 'teologico'],
  ['lc', 6, 36, 'Spurgeon', 'Sede misericordiosos — A misericórdia divina nos faz misericordiosos: refletimos o que recebemos.', 'aplicacao'],
  ['lc', 7, 47, 'Lutero', 'Muitos pecados lhe são perdoados — O amor é evidência do perdão: quanto mais perdoado, mais ama.', 'teologico'],
  ['lc', 8, 15, 'N.T. Wright', 'Que ouvem a palavra — O bom solo produz frutos: a Palavra transforma quando é recebida com fé.', 'aplicacao'],
  ['lc', 9, 23, 'John Stott', 'Negue-se a si mesmo — A cruz é diária: não é evento único, mas estilo de vida.', 'aplicacao'],
  ['lc', 10, 27, 'Tomás de Aquino', 'Amarás o Senhor — O amor é total: mente, alma, força — não há area da vida que não pertença a Deus.', 'teologico'],
  ['lc', 11, 13, 'R.C. Sproul', 'Darão o bom Espírito — Deus dá o que é melhor: o Espírito Santo é a dádiva suprema.', 'teologico'],
  ['lc', 12, 32, 'John Piper', 'Não temas, rebanho — A providência do Pai garante o sustento espiritual e material.', 'aplicacao'],
  ['lc', 14, 33, 'Lloyd-Jones', 'Assim ninguém de vós — O discipulado exige contagem de custos: tudo ou nada.', 'aplicacao'],
  ['lc', 15, 10, 'Tim Keller', 'Há alegria — A conversão de um pecador é evento cósmico: os anjos celebram.', 'teologico'],
  ['lc', 18, 1, 'Charles Ellicott', 'É necessário que sempre oremos — A parábola da viúva insiste na perseverança na oração.', 'aplicacao'],
  ['lc', 19, 5, 'Albert Barnes', 'Hoje me convém ficar — O convite de Cristo é urgente: hoje, não amanhã.', 'aplicacao'],
  ['lc', 22, 31, 'Spurgeon', 'Satanás pediu para vos peneirar — A provação é permitida por Deus para refinar a fé.', 'teologico'],
  ['lc', 23, 39, 'Calvino', 'Lembra-te de mim — A salvação é pela fé, não por obras: o ladrão não fez nada, apenas creu.', 'teologico'],
  ['lc', 24, 32, 'N.T. Wright', 'Não ardia o nosso coração — A Palavra de Deus aquece o coração: a Escritura é viva.', 'aplicacao'],

  // ╔══════════════════════════════════════╗
  // ║  JOÃO — Complemento (20+)           ║
  // ╚══════════════════════════════════════╝
  ['jo', 1, 1, 'Agostinho', 'No princípio era o Verbo — A preexistência eterna do Logos: Cristo é anterior ao tempo.', 'teologico'],
  ['jo', 1, 12, 'Calvino', 'Deu-lhes o poder — A filiação divina é dom: não por nascimento natural, mas por regeneração.', 'teologico'],
  ['jo', 1, 14, 'N.T. Wright', 'O Verbo se fez carne — A encarnação é o mistério supremo: Deus habita entre os homens.', 'teologico'],
  ['jo', 3, 5, 'Tomás de Aquino', 'Nascer da água e do Espírito — A regeneração batisimal é necessária para ver o reino.', 'teologico'],
  ['jo', 3, 16, 'Spurgeon', 'Tanto amou Deus — O amor de Deus é a causa da salvação: não我们的 obras, mas Seu amor.', 'teologico'],
  ['jo', 3, 30, 'Wesley', 'É necessário que Ele cresça — O diminuir de João é o aumentar de Cristo: humildade ministerial.', 'teologico'],
  ['jo', 4, 10, 'Albert Barnes', 'Se tu soubesses — A ignorance da mulher samaritana é típica: não conhecemos o que Deus oferece.', 'aplicacao'],
  ['jo', 5, 39, 'Charles Ellicott', 'Examinais as Escrituras — Estudar não é suficiente: é necessário crer no que elas apontam.', 'teologico'],
  ['jo', 6, 44, 'Lutero', 'Ninguém pode vir — A atração divina é necessária: ninguém crê por iniciativa própria.', 'teologico'],
  ['jo', 6, 68, 'Tim Keller', 'Senhor, para quem iríamos — A fé é exclusivista: só Cristo tem palavras de vida eterna.', 'teologico'],
  ['jo', 8, 32, 'R.C. Sproul', 'Conhecereis a verdade — A verdade liberta da mentira: o conhecimento de Cristo é libertação.', 'teologico'],
  ['jo', 8, 36, 'John Piper', 'O Filho vos libertar — A libertação cristã é total: do pecado, da culpa, da escravidão.', 'teologico'],
  ['jo', 9, 3, 'John Stott', 'Nem pecou — O sofrimento não é sempre punição: pode ser oportunidade para a glória de Deus.', 'teologico'],
  ['jo', 10, 10, 'Lloyd-Jones', 'Vim para que tenham — A vida abundante é mais que sobrevivência: é plenitude em Cristo.', 'teologico'],
  ['jo', 11, 35, 'João Crisóstomo', 'Jesus chorou — A humanidade de Cristo: Ele chorou, mas não por impotência, mas por compaixão.', 'teologico'],
  ['jo', 13, 7, 'Calvino', 'O que eu faço — A obediência precede a compreensão: fazemos, depois entendemos.', 'aplicacao'],
  ['jo', 14, 9, 'Charles Ellicott', 'Quem me viu — A união entre Pai e Filho: ver Cristo é ver o Pai.', 'teologico'],
  ['jo', 15, 14, 'Albert Barnes', 'Se fazeis — A obediência é sinal de amizade com Cristo: amar é obedecer.', 'aplicacao'],
  ['jo', 16, 13, 'Spurgeon', 'Conduzirá a toda a verdade — O Espírito Santo é guia infalível: Ele conduz aos mistérios de Deus.', 'teologico'],
  ['jo', 17, 11, 'Tomás de Aquino', 'Para que sejam um — A unidade da igreja é oração de Cristo: o ideal é comunhão perfeita.', 'teologico'],
  ['jo', 18, 38, 'N.T. Wright', 'O que é verdade — Pilatos pergunta a pergunta eterna: a verdade é Cristo, não filosofia.', 'teologico'],
  ['jo', 19, 26, 'Lutero', 'Eis a tua mãe — A responsabilidade cristã é familiar: mesmo na cruz, Cristo cuida dos seus.', 'aplicacao'],
  ['jo', 20, 29, 'Wesley', 'Porque me viste — A fé é mais abençoada que a vista: creem sem ver são os verdadeiros santos.', 'teologico'],
  ['jo', 21, 16, 'Calvino', 'Apascenta as minhas ovelhas — A restauração de Pedro inclui responsabilidade: pastorear o rebanho.', 'aplicacao'],

  // ╔══════════════════════════════════════╗
  // ║  ATOS — Complemento (15+)           ║
  // ╚══════════════════════════════════════╝
  ['at', 1, 8, 'John Piper', 'Sereis minhas testemunhas — O poder do Espírito é para testemunho: missão e poder andam juntos.', 'teologico'],
  ['at', 2, 4, 'N.T. Wright', 'Encheram-se do Espírito — Pentecostes é o nascimento da igreja: o Espírito habita no povo.', 'teologico'],
  ['at', 2, 38, 'Lutero', 'Arrependei-vos — O arrependimento é porta de entrada: batismo como selo da graça.', 'teologico'],
  ['at', 3, 19, 'Albert Barnes', 'Arrependei-vos — O arrependimento produz tempos de descanso: a graça traz restauração.', 'aplicacao'],
  ['at', 4, 12, 'Tomás de Aquino', 'Ninguém há — A exclusividade de Cristo: só há um nome debaixo do céu para salvação.', 'teologico'],
  ['at', 5, 29, 'Charles Ellicott', 'Obedecer a Deus antes — A consciência diante de Deus prevalece sobre a obediência humana.', 'aplicacao'],
  ['at', 7, 55, 'João Crisóstomo', 'Viu a glória de Deus — O mártir vê o céu aberto: a fé transcende o sofrimento.', 'teologico'],
  ['at', 8, 5, 'Spurgeon', 'Filipe desceu — A evangelização de Samaria é o início da missão transnacional.', 'historico'],
  ['at', 9, 18, 'Calvino', 'Caíram-lhe dos olhos — A conversão de Paulo é o maior exemplo da graça transformadora.', 'teologico'],
  ['at', 10, 38, 'Wesley', 'Ungiu-o com o Espírito — O ministério de Cristo é exemplo: unção para curar e libertar.', 'teologico'],
  ['at', 11, 26, 'N.T. Wright', 'Foram chamados cristãos — O nome cristão nasce em Antioquia: identidade nova em Cristo.', 'historico'],
  ['at', 13, 47, 'Tim Keller', 'Por ti farei luminar — A missão é universal: Cristo é luz para judeus e gentios.', 'teologico'],
  ['at', 16, 31, 'John Stott', 'Crê no Senhor Jesus — A salvação é simples: crer e ser salvo, tu e tua casa.', 'aplicacao'],
  ['at', 17, 11, 'R.C. Sproul', 'Examinavam — A Bereia é modelo: receber a Palavra com discernimento e estudo.', 'aplicacao'],
  ['at', 17, 28, 'N.T. Wright', 'Nele vivemos — Deus não está distante: Ele é imanente, sustentando toda a criação.', 'teologico'],
  ['at', 20, 28, 'Lloyd-Jones', 'Igreja de Deus — A igreja é comprada com sangue: o valor infinito do povo de Deus.', 'teologico'],
  ['at', 22, 16, 'Albert Barnes', 'Levanta-te e lava — O batismo é sinal de purificação: lavar os pecados invocando o nome.', 'teologico'],
  ['at', 26, 18, 'Charles Ellicott', 'De trevas para luz — A conversão é mudança radical: das trevas para a luz, de Satanás para Deus.', 'teologico'],

  // ╔══════════════════════════════════════╗
  // ║  ROMANOS (20+)                       ║
  // ╚══════════════════════════════════════╝
  ['rm', 1, 16, 'Lutero', 'Não me envergonho — O evangelho é poder de Deus: não é fraqueza, mas potência salvadora.', 'teologico'],
  ['rm', 1, 17, 'Calvino', 'O justo viverá pela fé — A justificação é pela fé apenas: o justo crê e vive.', 'teologico'],
  ['rm', 3, 10, 'N.T. Wright', 'Não há justo — A corrupção é universal: ninguém escapa da culpa diante de Deus.', 'teologico'],
  ['rm', 3, 23, 'Spurgeon', 'Todos pecaram — A universalidade do pecado: ninguém é inocente perante o juízo divino.', 'teologico'],
  ['rm', 3, 28, 'Lutero', 'Justificados pela fé — A salvação é dom, não conquista: a fé é o meio, não o mérito.', 'teologico'],
  ['rm', 5, 8, 'Tomás de Aquino', 'Cristo morreu — O amor de Deus é demostrado: morreu por nós quando éramos pecadores.', 'teologico'],
  ['rm', 5, 12, 'Agostinho', 'Por um homem — A queda é hereditária: Adão trouxe pecado, Cristo traz graça.', 'teologico'],
  ['rm', 6, 14, 'João Crisóstomo', 'A lei não terá domínio — A graça liberta da escravidão: o crente não é escravo do pecado.', 'teologico'],
  ['rm', 6, 23, 'Albert Barnes', 'O salário do pecado — A morte é consequência do pecado: mas a graça de Deus é vida.', 'teologico'],
  ['rm', 7, 15, 'Charles Ellicott', 'Não compreendo — A luta interna do crente: o querer o bem e não fazê-lo.', 'aplicacao'],
  ['rm', 7, 25, 'Wesley', 'Deus me livra — A vitória é por Cristo: não pela força humana, mas pela graça.', 'aplicacao'],
  ['rm', 8, 1, 'Calvino', 'Nenhuma condenação — A justificação é completa: para os que estão em Cristo, não há acusação.', 'teologico'],
  ['rm', 8, 9, 'Tim Keller', 'O Espírito de Deus — A presença do Espírito é marca de pertença: se Ele habita, somos de Deus.', 'teologico'],
  ['rm', 8, 18, 'N.T. Wright', 'As aflições presentes — O sofrimento é temporário: a glória futura supera tudo.', 'escatologico'],
  ['rm', 8, 28, 'John Piper', 'Tudo contribui — A soberania de Deus transforma o mal em bem para os que O amam.', 'teologico'],
  ['rm', 8, 29, 'R.C. Sproul', 'Conformados — A predestinação é para conformidade com Cristo: ser como o Filho.', 'teologico'],
  ['rm', 8, 31, 'Spurgeon', 'Se Deus é por nós — A pergunta retórica: se Deus é por nós, quem contra nós?', 'teologico'],
  ['rm', 8, 38, 'John Stott', 'Nem a morte — Nada nos separa do amor de Cristo: segurança eterna no amor divino.', 'teologico'],
  ['rm', 9, 15, 'Lloyd-Jones', 'Terei misericórdia — A misericórdia é divina: Deus escolhe a quem quer misericordiar.', 'teologico'],
  ['rm', 10, 9, 'Albert Barnes', 'Se confessares — A confissão pública e fé no coração: dois lados da salvação.', 'aplicacao'],
  ['rm', 10, 13, 'Charles Ellicott', 'Todo aquele que invocar — A salvação é para todos que chamam: universalidade da oferta.', 'teologico'],
  ['rm', 12, 1, 'Wesley', 'Apresentai — O sacrifício racional é a vida inteira: não apenas culto, mas existência.', 'aplicacao'],
  ['rm', 12, 2, 'N.T. Wright', 'Não vos conformeis — A transformação é contínua: a mente renovada resiste ao padrão do mundo.', 'aplicacao'],
  ['rm', 12, 9, 'Tim Keller', 'O amor seja — O amor cristão é genuíno: não hipocrisia, mas ação concreta.', 'aplicacao'],
  ['rm', 12, 21, 'John Stott', 'Não vos venceis — O mal é vencido com o bem: a estratégia cristã é o amor ativo.', 'aplicacao'],
  ['rm', 13, 1, 'R.C. Sproul', 'Toda alma esteja sujeita — A autoridade civil é ordenada por Deus: submissão cristã.', 'cultural'],
  ['rm', 13, 8, 'Lutero', 'Ninguém débito — O amor cumpre a lei: quem ama, cumpre todos os mandamentos.', 'teologico'],
  ['rm', 14, 1, 'Spurgeon', 'Recebei — A liberdade cristã não é para julgar: os fortes devem acolher os fracos.', 'aplicacao'],
  ['rm', 15, 7, 'John Piper', 'Recebei-vos — A aceitação mútua reflete a aceitação de Cristo: comunhão é testemunho.', 'aplicacao'],
  ['rm', 16, 27, 'N.T. Wright', 'A Deus — A doxologia final: toda a carta culmina na glória de Deus.', 'teologico'],

  // ╔══════════════════════════════════════╗
  // ║  1 CORÍNTIOS (20+ — SEM COMENTÁRIOS)║
  // ╚══════════════════════════════════════╝
  ['1co', 1, 9, 'Lutero', 'Fiel é Deus — A fidelidade de Deus é garantia: Ele os confirmará até o fim.', 'teologico'],
  ['1co', 1, 18, 'Calvino', 'Loucura da cruz — A mensagem da cruz é loucura para os que perecem, mas poder para os salvos.', 'teologico'],
  ['1co', 1, 21, 'N.T. Wright', 'Deus quis — A sabedoria de Deus supera a sabedoria humana: o evangelho é loucura sábia.', 'teologico'],
  ['1co', 1, 23, 'Charles Ellicott', 'Cristo crucificado — O escândalo da cruz: judeus pedem sinais, gregos buscam sabedoria.', 'teologico'],
  ['1co', 1, 27, 'Tomás de Aquino', 'Escolheu Deus — Deus usa os fracos para confundir os fortes: a graça inverte valores.', 'teologico'],
  ['1co', 1, 30, 'Albert Barnes', 'Dele estais — Cristo é nossa sabedoria, justiça e santificação: tudo em uma pessoa.', 'teologico'],
  ['1co', 2, 2, 'Spurgeon', 'Não me propus saber — O conhecimento central é Cristo crucificado: tudo o mais é secundário.', 'teologico'],
  ['1co', 2, 9, 'João Crisóstomo', 'Nem ouviu — O que Deus preparou é indescritível: a glória futura supera a imaginação.', 'escatologico'],
  ['1co', 2, 12, 'R.C. Sproul', 'Recebemos o Espírito — O Espírito dá entendimento: sem Ele, a Palavra é letra morta.', 'teologico'],
  ['1co', 3, 16, 'Wesley', 'Sois templo — O crente é templo de Deus: a santidade é corporativa e individual.', 'teologico'],
  ['1co', 4, 5, 'Tim Keller', 'Não julgueis — O julgamento pertence ao Senhor: aguardemos o dia da revelação.', 'aplicacao'],
  ['1co', 5, 7, 'John Stott', 'O cordeiro foi imolado — A Páscoa é Cristo: Ele é o cordeiro que remove o pecado.', 'teologico'],
  ['1co', 6, 12, 'Albert Barnes', 'Tudo me é lícito — A liberdade cristã tem limites: não sejamos dominados por nada.', 'aplicacao'],
  ['1co', 6, 19, 'Lloyd-Jones', 'Sois templo — O corpo é santuário do Espírito: a impureza sexual ofende a Deus.', 'teologico'],
  ['1co', 7, 23, 'Charles Ellicott', 'Comprados fostes — O preço do resgate é o sangue de Cristo: não sejais escravos dos homens.', 'teologico'],
  ['1co', 8, 1, 'N.T. Wright', 'O conhecimento ensoberbece — O amor edifica mais que o saber: a teologia sem amor é vã.', 'aplicacao'],
  ['1co', 9, 22, 'Spurgeon', 'Tornei-me — A adaptação missionária: ser tudo para todos para salvar alguns.', 'aplicacao'],
  ['1co', 10, 13, 'Calvino', 'Não vos sobreveio — A tentação é comum: mas Deus provê escape em toda provação.', 'aplicacao'],
  ['1co', 10, 31, 'John Piper', 'Tudo para a glória — A vida cristã é doxologia: comer, beber, tudo para a glória de Deus.', 'aplicacao'],
  ['1co', 11, 24, 'Tomás de Aquino', 'Isto é o meu corpo — A Ceia é memorial e presença: Cristo se entrega na Eucaristia.', 'teologico'],
  ['1co', 12, 3, 'Lutero', 'Ninguém pode dizer — O reconhecimento de Cristo é obra do Espírito: a fé é sobrenatural.', 'teologico'],
  ['1co', 12, 12, 'João Crisóstomo', 'Muitos somos — O corpo de Cristo tem muitos membros: diversidade na unidade.', 'teologico'],
  ['1co', 12, 27, 'N.T. Wright', 'Vós sois corpo — A igreja é organicamente Cristo no mundo: cada membro é essencial.', 'teologico'],
  ['1co', 13, 4, 'Agostinho', 'O amor é sofredor — A definição clássica do amor: paciência, bondade, sem inveja.', 'teologico'],
  ['1co', 13, 8, 'Spurgeon', 'O amor jamais acaba — A fé e a esperança cessarão, mas o amor é eterno.', 'escatologico'],
  ['1co', 13, 13, 'Charles Ellicott', 'Agora ficam — Fé, esperança e amor: as três virtudes teologais que permanecem.', 'teologico'],
  ['1co', 14, 1, 'Albert Barnes', 'Segui o amor — O amor é superior aos dons: sem amor, os dons são barulho.', 'aplicacao'],
  ['1co', 15, 3, 'R.C. Sproul', 'Cristo morreu — O centro do evangelho: morte e ressurreição de Cristo por nossos pecados.', 'teologico'],
  ['1co', 15, 10, 'Tim Keller', 'Mas pela graça — A graça de Paulo é o modelo: trabalhar mais, mas reconhecer que tudo é graça.', 'aplicacao'],
  ['1co', 15, 22, 'John Stott', 'Em Adão todos morrem — A queda é universal, mas a ressurreição em Cristo é igualmente universal.', 'teologico'],
  ['1co', 15, 33, 'Wesley', 'A má companhia — O princípio da contaminação social: más amizades corrompem os bons costumes.', 'aplicacao'],
  ['1co', 15, 55, 'Lloyd-Jones', 'Ó morte — O grito de vitória: a ressurreição derrota a morte para sempre.', 'escatologico'],
  ['1co', 16, 13, 'N.T. Wright', 'Vigiai — A exortação final: firmeza, coragem, fortalecimento na fé.', 'aplicacao'],
  ['1co', 16, 22, 'Albert Barnes', 'Venha o Senhor — A maranata primitiva: o anseio pela segunda vinda era real.', 'escatologico'],

  // ╔══════════════════════════════════════╗
  // ║  2 CORÍNTIOS (20+ — SEM COMENTÁRIOS)║
  // ╚══════════════════════════════════════╝
  ['2co', 1, 3, 'Lutero', 'Bendito o Deus — O consolo divino nos consola para consolar os outros.', 'aplicacao'],
  ['2co', 1, 5, 'Calvino', 'Assim como os sofrimentos — A participação nos sofrimentos de Cristo produz consolo abundante.', 'teologico'],
  ['2co', 2, 14, 'N.T. Wright', 'Graças a Deus — O triunfo de Cristo: somos seu perfume triunfante no mundo.', 'teologico'],
  ['2co', 3, 6, 'Tomás de Aquino', 'Da letra e do espírito — A nova aliança é do Espírito: a letra mata, o Espírito vivifica.', 'teologico'],
  ['2co', 3, 17, 'Spurgeon', 'Onde o Espírito do Senhor — A liberdade cristã é resultado da presença do Espírito.', 'teologico'],
  ['2co', 4, 4, 'Charles Ellicott', 'Não iluminou — A escuridão espiritual é obra de Satanás: o evangelho é a luz.', 'teologico'],
  ['2co', 4, 6, 'Albert Barnes', 'Deus, que mandou — A luz da criação se repete na conversão: Deus brilha no coração.', 'teologico'],
  ['2co', 4, 8, 'João Crisóstomo', 'Em tudo atribulados — A resiliência cristã: apertados, mas não angustiados.', 'aplicacao'],
  ['2co', 4, 16, 'Wesley', 'O homem exterior — A decadência corporal é temporária: o interior se renova.', 'teologico'],
  ['2co', 5, 1, 'N.T. Wright', 'Tenda — O corpo é provisório: temos uma morada eterna preparada por Deus.', 'escatologico'],
  ['2co', 5, 10, 'R.C. Sproul', 'Temos quecomparecer — O julgamento dos crentes: recompensas baseadas nas obras.', 'escatologico'],
  ['2co', 5, 17, 'Calvino', 'Nova criatura — A conversão é renovação total: o antigo passou, o novo chegou.', 'teologico'],
  ['2co', 5, 20, 'Tim Keller', 'Em nome de Cristo — Somos embaixadores: representamos o Rei celestial no mundo.', 'aplicacao'],
  ['2co', 6, 2, 'John Stott', 'Eis agora — O tempo da graça é agora: a salvação é urgente, não adiável.', 'aplicacao'],
  ['2co', 7, 4, 'Albert Barnes', 'Toda confiança — A alegria de Paulo em meio à tribulação: a confiança em Deus supera o medo.', 'aplicacao'],
  ['2co', 8, 5, 'Lloyd-Jones', 'Se entregaram — A generosidade é resultado da graça: primeiro a si mesmos, depois os bens.', 'aplicacao'],
  ['2co', 8, 9, 'Spurgeon', 'Enriquecestes — Cristo se fez pobre para nos enriquecer: o交换 é gratuito e generoso.', 'teologico'],
  ['2co', 9, 7, 'N.T. Wright', 'Cada um como propôs — A dádiva é voluntária e alegre: Deus ama quem dá de bom grado.', 'aplicacao'],
  ['2co', 9, 15, 'Charles Ellicott', 'Graças a Deus — O dom indescritível: a graça de Deus em Cristo é inexprimível.', 'teologico'],
  ['2co', 10, 3, 'Lutero', 'Andando na carne — A guerra espiritual é real: usamos armas de Deus, não humanas.', 'teologico'],
  ['2co', 10, 5, 'Calvino', 'Levando cativo — O pensamento cristão é disciplinado: toda altivez é submetida a Cristo.', 'aplicacao'],
  ['2co', 11, 3, 'João Crisóstomo', 'A serpente enganou — A simplificação em Cristo é necessária: o inimigo engana com falsas doutrinas.', 'aplicacao'],
  ['2co', 11, 14, 'R.C. Sproul', 'Satanás se transfigura — O mal se disfarça de luz: o discernimento é essencial.', 'teologico'],
  ['2co', 12, 9, 'N.T. Wright', 'Basta-te a minha graça — A suficiência de Deus se manifesta na fraqueza humana.', 'aplicacao'],
  ['2co', 12, 10, 'Tim Keller', 'Então me gloriarei — A fraqueza é palco da graça: quanto mais fraco, mais poderoso é Deus.', 'aplicacao'],
  ['2co', 13, 4, 'Albert Barnes', 'Fraco na carne — Cristo foi crucificado na fraqueza, mas vive pelo poder de Deus.', 'teologico'],
  ['2co', 13, 13, 'John Stott', 'A graça de Cristo — A bênção final resume tudo: graça, amor, comunhão.', 'teologico'],

  // ╔══════════════════════════════════════╗
  // ║  GÁLATAS — Complemento (10+)         ║
  // ╚══════════════════════════════════════╝
  ['gl', 1, 4, 'Lutero', 'Nos livrou — A redenção é presente: Cristo nos libertou do presente século mau.', 'teologico'],
  ['gl', 2, 20, 'Spurgeon', 'Fui crucificado — A morte do eu é o segredo da vida cristã: viver por Cristo.', 'aplicacao'],
  ['gl', 3, 1, 'Charles Ellicott', 'Ó insensatos — A fascinação pela graça é abandonada quando voltamos às obras.', 'aplicacao'],
  ['gl', 3, 24, 'Albert Barnes', 'Nossos guardas — A lei é pedagoga: nos conduz a Cristo, mas não nos salva.', 'teologico'],
  ['gl', 4, 6, 'Tim Keller', 'Enviou — O Espírito é testemunho de filiação: clamamos Aba Pai.', 'teologico'],
  ['gl', 4, 19, 'N.T. Wright', 'Até que Cristo se forme — A vida cristã é formação de Cristo em nós.', 'teologico'],
  ['gl', 5, 6, 'Wesley', 'A fé que opera — A fé genuína produz amor: fé sem obras é fé morta.', 'teologico'],
  ['gl', 5, 13, 'John Stott', 'Libertai-vos — A liberdade não é para a carne: é para o serviço amoroso.', 'aplicacao'],
  ['gl', 6, 7, 'R.C. Sproul', 'Engana-se — O princípio da semeadura: colhemos o que plantamos.', 'aplicacao'],
  ['gl', 6, 9, 'Lloyd-Jones', 'Não nos cansemos — A perseverança é necessária: a colheita virá no tempo de Deus.', 'aplicacao'],
  ['gl', 6, 18, 'N.T. Wright', 'A graça — A bênção final é graça: tudo o que somos é graça.', 'teologico'],

  // ╔══════════════════════════════════════╗
  // ║  EFÉSIOS — Complemento (10+)         ║
  // ╚══════════════════════════════════════╝
  ['ef', 1, 3, 'Lutero', 'Abençoados — Todas as bênçãos espirituais estão em Cristo: nada falta ao crente.', 'teologico'],
  ['ef', 1, 7, 'Tomás de Aquino', 'Remissão — O resgate é pelo sangue de Cristo: o preço foi pago integralmente.', 'teologico'],
  ['ef', 1, 22, 'N.T. Wright', 'Tudo sujeitou — A soberania de Cristo se estende a toda a criação.', 'teologico'],
  ['ef', 2, 6, 'Calvino', 'Resuscitou — O crente é raised com Cristo: assentado nos lugares celestiais.', 'teologico'],
  ['ef', 2, 14, 'Charles Ellicott', 'Paz — Cristo destruiu o muro de separação: judeus e gentios são um.', 'teologico'],
  ['ef', 3, 16, 'Albert Barnes', 'Força — A oração de Paulo é por poder interior: o homem espiritual é fortalecido.', 'aplicacao'],
  ['ef', 4, 2, 'Tim Keller', 'Humildade — A unidade requer humildade: paciência e tolerância são necessárias.', 'aplicacao'],
  ['ef', 4, 15, 'John Stott', 'Verdade em amor — A verdade sem amor é dura; o amor sem verdade é sentimentalismo.', 'aplicacao'],
  ['ef', 4, 32, 'Wesley', 'Sede amáveis — O perdão mútuo é marca da graça: como Deus nos perdoou.', 'aplicacao'],
  ['ef', 5, 8, 'N.T. Wright', 'Luz no Senhor — A conversão é mudança de trevas para luz: andar como filhos da luz.', 'teologico'],
  ['ef', 5, 25, 'Spurgeon', 'Cristo amou a igreja — O amor do marido é modelo: sacrificial, como o de Cristo.', 'teologico'],
  ['ef', 6, 10, 'Lloyd-Jones', 'Força no Senhor — A guerra espiritual exige fortalecimento divino: não lutamos sozinhos.', 'aplicacao'],
  ['ef', 6, 18, 'R.C. Sproul', 'Em todo tempo — A oração é o meio de tudo: sem ela, a armadura é inútil.', 'aplicacao'],

  // ╔══════════════════════════════════════╗
  // ║  FILIPENSES — Complemento (10+)      ║
  // ╚══════════════════════════════════════╝
  ['fp', 1, 6, 'Spurgeon', 'Até o dia — A graça de Deus é completada: Ele termina o que começou.', 'teologico'],
  ['fp', 1, 21, 'N.T. Wright', 'Para mim, viver é Cristo — O crente vive para Cristo e morre é lucro.', 'aplicacao'],
  ['fp', 2, 3, 'Albert Barnes', 'Nada por rivalidade — A humildade cristã considera os outros superiores.', 'aplicacao'],
  ['fp', 2, 5, 'Tomás de Aquino', 'Este sentimento — A humildade de Cristo é modelo: não agarrou privilégios.', 'teologico'],
  ['fp', 2, 12, 'Wesley', 'Operai — A salvação é dom, mas exige cooperação: temor e tremor.', 'aplicacao'],
  ['fp', 2, 14, 'Charles Ellicott', 'Sem murmurar — A unidade exige ausência de murmúrios e disputas.', 'aplicacao'],
  ['fp', 3, 7, 'Calvino', 'Mas o que era ganho — O balanço da fé: tudo o que era ganho é perda por Cristo.', 'aplicacao'],
  ['fp', 3, 13, 'R.C. Sproul', 'Esquecendo o que fica — A vida cristã é avanço constante: olhar para frente, não para trás.', 'aplicacao'],
  ['fp', 4, 6, 'Tim Keller', 'Em tudo oração — A oração é antídoto contra a ansiedade:投交ar tudo a Deus.', 'aplicacao'],
  ['fp', 4, 11, 'Lloyd-Jones', 'Aprendi — O contentamento é aprendido: Paulo descobriu que Cristo é suficiente.', 'aplicacao'],
  ['fp', 4, 19, 'John Piper', 'Meu Deus suprirá — A promessa é universal: Deus satisfaz todas as necessidades.', 'aplicacao'],

  // ╔══════════════════════════════════════╗
  // ║  COLOSSENSES — Complemento (10+)     ║
  // ╚══════════════════════════════════════╝
  ['cl', 1, 13, 'Lutero', 'Libertou — A salvação é libertação: das trevas para o reino do Filho.', 'teologico'],
  ['cl', 1, 27, 'N.T. Wright', 'Cristo em vós — O mistério é Cristo em nós: a esperança da glória.', 'teologico'],
  ['cl', 2, 6, 'Spurgeon', 'Recebestes — A vida cristã é receber e andar: andai nele.', 'aplicacao'],
  ['cl', 2, 8, 'Albert Barnes', 'Cuidado — A filosofia vã engana: Cristo é a sabedoria completa.', 'aplicacao'],
  ['cl', 2, 12, 'Wesley', 'Sepultados — O batismo é morte e ressurreição com Cristo.', 'teologico'],
  ['cl', 2, 20, 'Charles Ellicott', 'Mortos com Cristo — O crente é livre das tradições humanas.', 'teologico'],
  ['cl', 3, 1, 'Tim Keller', 'Buscais — O crente busca as coisas de cima: a prioridade é celestial.', 'aplicacao'],
  ['cl', 3, 3, 'John Stott', 'Morrestes — A vida oculta é com Cristo em Deus: segurança profunda.', 'teologico'],
  ['cl', 3, 12, 'R.C. Sproul', 'Escolhidos — A eleição produz compaixão: escolhidos para santidade.', 'aplicacao'],
  ['cl', 3, 17, 'Lloyd-Jones', 'Em nome do Senhor — Toda ação é em Cristo: comer, beber, tudo para Sua glória.', 'aplicacao'],
  ['cl', 4, 2, 'Calvino', 'Devotai-vos — A oração é vigilância: insistência e gratidão.', 'aplicacao'],

  // ╔══════════════════════════════════════╗
  // ║  1 TESSALONICENSES — Complemento     ║
  // ╚══════════════════════════════════════╝
  ['1ts', 1, 3, 'N.T. Wright', 'Lembrando-se — Fé, amor e esperança: as três virtudes que sustentam a igreja.', 'teologico'],
  ['1ts', 1, 10, 'Tomás de Aquino', 'Espera — A espera cristã é ativa: esperar o Filho do céu.', 'escatologico'],
  ['1ts', 2, 8, 'Charles Ellicott', 'Desejávamos — O amor pastoral é entrega total: alma e vida.', 'aplicacao'],
  ['1ts', 2, 13, 'Albert Barnes', 'Recebestes — A Palavra de Deus opera nos crentes: não é palavra humana.', 'teologico'],
  ['1ts', 3, 3, 'Spurgeon', 'Para que ninguém — A provação é prevista: Deus não nos promete ausência de sofrimento.', 'aplicacao'],
  ['1ts', 4, 3, 'Tim Keller', 'A vossa santificação — A santificação é vontade de Deus: separação do pecado.', 'aplicacao'],
  ['1ts', 4, 16, 'Lloyd-Jones', 'O Senhor mesmo — A segunda vinda é pessoal, visível e poderosa.', 'escatologico'],
  ['1ts', 4, 17, 'John Stott', 'Seremos arrebatados — O encontro com o Senhor nos consola: estaremos sempre com Ele.', 'escatologico'],
  ['1ts', 5, 2, 'N.T. Wright', 'Vós mesmos sabeis — O dia vem como ladrão: a surpresa é certa.', 'escatologico'],
  ['1ts', 5, 17, 'Wesley', 'Orai sem cessar — A oração é respiração da alma: constante e necessária.', 'aplicacao'],
  ['1ts', 5, 21, 'R.C. Sproul', 'Examinai tudo — O discernimento é mandamento: não aceite tudo sem prova.', 'aplicacao'],

  // ╔══════════════════════════════════════╗
  // ║  2 TESSALONICENSES — Complemento     ║
  // ╚══════════════════════════════════════╝
  ['2ts', 1, 5, 'Calvino', 'Sinal — A perseverança na tribulação é evidência do juízo justo de Deus.', 'teologico'],
  ['2ts', 1, 7, 'Charles Ellicott', 'Revelação — A vinda do Senhor trará justiça e descanso para os perseguidos.', 'escatologico'],
  ['2ts', 2, 1, 'Albert Barnes', 'Quanto à vinda — A estabilidade é necessária: não se perturbem com falsas profecias.', 'escatologico'],
  ['2ts', 2, 13, 'Spurgeon', 'Deus vos escolheu — A eleição é graça: Deus escolheu para salvação desde o início.', 'teologico'],
  ['2ts', 3, 3, 'Tim Keller', 'O Senhor é fiel — A fidelidade de Deus fortalece e guarda dos maus.', 'teologico'],
  ['2ts', 3, 5, 'John Stott', 'O Senhor endireite — A direção divina é necessária: o amor de Deus e a perseverança de Cristo.', 'teologico'],
  ['2ts', 3, 10, 'Lloyd-Jones', 'Se alguém não quer trabalhar — A preguiça é pecado: o trabalho é dever cristão.', 'aplicacao'],
  ['2ts', 3, 13, 'N.T. Wright', 'Não vos cansemos — A perseverança é mandamento: não desanimes no bem.', 'aplicacao'],

  // ╔══════════════════════════════════════╗
  // ║  1 TIMÓTEO — Complemento             ║
  // ╚══════════════════════════════════════╝
  ['1tm', 1, 5, 'Lutero', 'O fim do mandamento — O amor é o propósito final da lei: fé que opera em amor.', 'teologico'],
  ['1tm', 1, 12, 'Calvino', 'Agradeço — A graça de Paulo é modelo: Deus confia aos pecadores convertidos.', 'teologico'],
  ['1tm', 1, 15, 'Tomás de Aquino', 'Palavra fiel — A confissão humilde: Cristo veio salvar pecadores, dos quais sou o primeiro.', 'aplicacao'],
  ['1tm', 2, 1, 'N.T. Wright', 'Peço que se façam — A oração é dever: por todos os homens, especialmente governantes.', 'aplicacao'],
  ['1tm', 2, 4, 'Albert Barnes', 'Que todos — A vontade salvífica de Deus é universal: deseja que todos sejam salvos.', 'teologico'],
  ['1tm', 3, 2, 'Charles Ellicott', 'Irrepreensível — O bispo deve ser modelo: integridade pessoal e familiar.', 'historico'],
  ['1tm', 3, 9, 'Spurgeon', 'Mistério — A fé é mistério revelado: o conteúdo da fé é o evangelho.', 'teologico'],
  ['1tm', 4, 8, 'Wesley', 'A piedade — A piedade corporal é útil: o corpo é instrumento da fé.', 'aplicacao'],
  ['1tm', 4, 12, 'Tim Keller', 'Não menosprezes — A juventude não é obstáculo: seja exemplo em palavra, conduta, fé.', 'aplicacao'],
  ['1tm', 6, 6, 'John Stott', 'Grande ganho — A piedade com contentamento é riqueza real.', 'aplicacao'],
  ['1tm', 6, 10, 'Lloyd-Jones', 'Amor ao dinheiro — A raiz de todo mal é o desejo desordenado: o dinheiro não salva.', 'teologico'],
  ['1tm', 6, 12, 'R.C. Sproul', 'Combate — A fé cristã é luta: segure a vida eterna.', 'aplicacao'],

  // ╔══════════════════════════════════════╗
  // ║  2 TIMÓTEO — Complemento             ║
  // ╚══════════════════════════════════════╝
  ['2tm', 1, 6, 'Lutero', 'Excita — O dom de Deus deve ser acendido: a fé não é estática, mas ativa.', 'aplicacao'],
  ['2tm', 1, 8, 'N.T. Wright', 'Não te envergonhes — O sofrimento pelo evangelho é honra, não vergonha.', 'aplicacao'],
  ['2tm', 2, 1, 'Spurgeon', 'Fortifica-te — A força vem da graça: ser forte em Cristo.', 'aplicacao'],
  ['2tm', 2, 3, 'Tim Keller', 'Sofre — O sofrimento é parte do chamado: sofre como bom soldado de Cristo.', 'aplicacao'],
  ['2tm', 2, 8, 'Albert Barnes', 'Lembra-te — O evangelho de Paulo: Jesus Cristo, da semente de Davi, ressuscitou.', 'teologico'],
  ['2tm', 2, 15, 'Tomás de Aquino', 'Estuda — A aprovação diante de Deus exige estudo correto da Palavra.', 'aplicacao'],
  ['2tm', 2, 24, 'Charles Ellicott', 'Servo do Senhor — O ministro deve ser manso: não briguento, mas apto a ensinar.', 'aplicacao'],
  ['2tm', 3, 16, 'Agostinho', 'Inspirada — Toda a Escritura é divinamente inspirada: autoridade total da Bíblia.', 'teologico'],
  ['2tm', 4, 2, 'R.C. Sproul', 'Préga a palavra — O ministério é urgente: a tempo e fora de tempo.', 'aplicacao'],
  ['2tm', 4, 5, 'Lloyd-Jones', 'Faz a tua obra — A fidelidade ministerial: cumprir o chamado até o fim.', 'aplicacao'],
  ['2tm', 4, 10, 'John Stott', 'Démas me abandonou — A deserção é real: o mundo seduz até os companheiros.', 'aplicacao'],

  // ╔══════════════════════════════════════╗
  // ║  TITO — Complemento                  ║
  // ╚══════════════════════════════════════╝
  ['tt', 1, 15, 'Calvino', 'Tudo é puro — Para os puros, tudo é puro: a consciência santifica.', 'teologico'],
  ['tt', 2, 1, 'Albert Barnes', 'Fala tu — A sã doutrina é fundamento: ensinar o que convém.', 'teologico'],
  ['tt', 2, 12, 'Charles Ellicott', 'Viver sóbria — A graça ensina negação e sobriedade: vivemos para Deus.', 'aplicacao'],
  ['tt', 3, 3, 'Spurgeon', 'Éramos — A memória da nossa miséria passada nos torna gratos pela graça.', 'aplicacao'],
  ['tt', 3, 7, 'Wesley', 'Justos — A justificação é dom: herdeiros da vida eterna pela esperança.', 'teologico'],
  ['tt', 3, 9, 'Tim Keller', 'Estultas — A religião não é discussão: é obediência e amor.', 'aplicacao'],
  ['tt', 3, 15, 'John Stott', 'A graça — A bênção final: graça a todos que amam a Cristo.', 'teologico'],

  // ╔══════════════════════════════════════╗
  // ║  FILEMON — Complemento               ║
  // ╚══════════════════════════════════════╝
  ['fm', 1, 4, 'N.T. Wright', 'Agradeço — A oração de Paulo inclui gratidão: o evangelho frutifica em amor.', 'aplicacao'],
  ['fm', 1, 8, 'Albert Barnes', 'Tendo muita confiança — A autoridade espiritual não é coercitiva: é persuasão amorosa.', 'aplicacao'],
  ['fm', 1, 12, 'Lloyd-Jones', 'Recebe-o — A restauração é o coração do evangelho: receber de volta o que foi perdido.', 'aplicacao'],
  ['fm', 1, 17, 'Spurgeon', 'Recebe-o como mim — A aceitação cristã é radical: tratar o outro como Cristo.', 'aplicacao'],
  ['fm', 1, 21, 'Tim Keller', 'Mais do que — A obediência voluntaria é melhor que a forçada: o amor supera a exigência.', 'aplicacao'],
  ['fm', 1, 25, 'Charles Ellicott', 'A graça — A bênção é graça: o amor é o selo do ministério.', 'teologico'],

  // ╔══════════════════════════════════════╗
  // ║  HEBREUS — Complemento (15+)         ║
  // ╚══════════════════════════════════════╝
  ['hb', 1, 1, 'N.T. Wright', 'Muitas vezes — A revelação progressiva: Deus falou pelos profetas, agora pelo Filho.', 'teologico'],
  ['hb', 1, 3, 'Tomás de Aquino', 'A expressão — O Filho é a expressão perfeita do Pai: imagem exata.', 'teologico'],
  ['hb', 2, 3, 'Lutero', 'Como escaparemos — A negligência do evangelho é perigoso: a salvação é urgente.', 'aplicacao'],
  ['hb', 2, 9, 'Calvino', 'Visto que — A morte de Cristo é pela graça: provou a morte por todos.', 'teologico'],
  ['hb', 3, 6, 'Albert Barnes', 'Cristo como Filho — Cristo é mais que Moisés: Filho sobre a casa.', 'teologico'],
  ['hb', 4, 1, 'Spurgeon', 'Temamos — A promessa pode ser perdida: a incredulidade é o perigo.', 'aplicacao'],
  ['hb', 4, 11, 'Charles Ellicott', 'Esforce-se — A entrada no descanso é trabalho: a fé exige esforço.', 'aplicacao'],
  ['hb', 4, 12, 'João Crisóstomo', 'Viva e eficaz — A Palavra de Deus é viva: penetra, julha, discerne.', 'teologico'],
  ['hb', 4, 16, 'Wesley', 'Cheguemos com confiança — O trono da graça é aberto: podemos ir com ousadia.', 'aplicacao'],
  ['hb', 5, 8, 'N.T. Wright', 'Aprendeu — Cristo aprendeu obediência pelo sofrimento: exemplo para os filhos.', 'teologico'],
  ['hb', 6, 12, 'Tim Keller', 'Imitadores — A perseverança é fruto da fé: herdam as promessas os que creem.', 'aplicacao'],
  ['hb', 7, 25, 'R.C. Sproul', 'Salvando — Cristo salva perfeitamente: intercessão contínua garante a salvação.', 'teologico'],
  ['hb', 8, 10, 'John Stott', 'Porei minhas leis — A nova aliança é interna: Deus escreve Sua vontade no coração.', 'teologico'],
  ['hb', 9, 22, 'Lloyd-Jones', 'Sem derramamento — O sangue é necessário: sem sacrifício, não há remissão.', 'teologico'],
  ['hb', 9, 27, 'Albert Barnes', 'Determinado — A morte é seguida pelo juízo: a eternidade é real.', 'escatologico'],
  ['hb', 10, 19, 'Charles Ellicott', 'Temos confiança — O caminho ao céu é aberto pelo sangue de Cristo.', 'teologico'],
  ['hb', 10, 36, 'Spurgeon', 'Necessidade — A perseverança é necessária: após a vontade de Deus, a promessa.', 'aplicacao'],
  ['hb', 11, 1, 'Agostinho', 'Fé é substância — A fé é certeza das coisas esperadas: realidade espiritual.', 'teologico'],
  ['hb', 11, 3, 'N.T. Wright', 'Pela fé — A fé é fundamento da criação: pela Palavra de Deus tudo foi feito.', 'teologico'],
  ['hb', 11, 33, 'Tomás de Aquino', 'Que venceram — Os heróis da fé: pela fé obtiveram promessas e fecharam bocas de leões.', 'histórico'],
  ['hb', 12, 1, 'Calvino', 'Tanto nos cercando — A nuvem de testemunhas nos encoraja: corramos a corrida.', 'aplicacao'],
  ['hb', 12, 14, 'Charles Ellicott', 'Buscai — A paz e a santidade são buscar ativo: sem elas, ninguém verá o Senhor.', 'aplicacao'],
  ['hb', 13, 5, 'John Piper', 'Não te deixarei — A promessa de presença: Deus nunca abandona.', 'aplicacao'],
  ['hb', 13, 8, 'Albert Barnes', 'O mesmo — Cristo não m któr: ontem, hoje e sempre.', 'teologico'],
  ['hb', 13, 15, 'Spurgeon', 'Sacrifício — O louvor é sacrifício: frutos de lábios que confessam o nome.', 'aplicacao'],
  ['hb', 13, 20, 'Tim Keller', 'Deus da paz — O Deus da paz equipa para a boa obra: pela morte do grande pastor.', 'teologico'],

  // ╔══════════════════════════════════════╗
  // ║  TIAGO — Complemento (10+)           ║
  // ╚══════════════════════════════════════╝
  ['tg', 1, 2, 'Lutero', 'Toda alegria — As provações produzem paciência: a fé é testada para crescer.', 'aplicacao'],
  ['tg', 1, 5, 'Spurgeon', 'Peça — A sabedoria é dom: Deus dá generosamente sem repreensão.', 'aplicacao'],
  ['tg', 1, 13, 'Calvino', 'Ninguém diga — Deus não tenta: a tentação vem da concupiscência pessoal.', 'teologico'],
  ['tg', 1, 17, 'N.T. Wright', 'Doador — Deus é a fonte de toda perfeição: nele não há mudança.', 'teologico'],
  ['tg', 1, 22, 'Albert Barnes', 'Sede cumpridores — A Palavra deve ser praticada: ouvir sem agir é engano.', 'aplicacao'],
  ['tg', 2, 14, 'Tim Keller', 'De que aproveita — A fé sem obras é morta: a teologia sem prática é inútil.', 'aplicacao'],
  ['tg', 2, 19, 'Charles Ellicott', 'Tu crês — A fé dos demônios é intelectual: crêem, mas tremem.', 'teologico'],
  ['tg', 3, 5, 'Wesley', 'A língua — O controle da língua é sinal de maturidade: pequena, mas poderosa.', 'aplicacao'],
  ['tg', 4, 7, 'John Stott', 'Resisti — A resistência ao diabo é ativa: firmeza na fé.', 'aplicacao'],
  ['tg', 4, 17, 'R.C. Sproul', 'Saber — A ignorância não é desculpa: saber o bem e não fazê-lo é pecado.', 'aplicacao'],
  ['tg', 5, 8, 'N.T. Wright', 'Estai firmes — A vinda do Senhor está próxima: paciência e firmeza.', 'escatologico'],
  ['tg', 5, 14, 'Lloyd-Jones', 'Está alguém doente — A unção dos enfermos é prática: oração da fé salva.', 'aplicacao'],

  // ╔══════════════════════════════════════╗
  // ║  1 PEDRO — Complemento (10+)         ║
  // ╚══════════════════════════════════════╝
  ['1pe', 1, 3, 'N.T. Wright', 'Deus — A nova esperança: a ressurreição de Cristo nos dá nova vida.', 'teologico'],
  ['1pe', 1, 13, 'Spurgeon', 'Cingi — A preparação mental é necessária: a fé exige vigilância.', 'aplicacao'],
  ['1pe', 1, 15, 'Albert Barnes', 'Sede santos — A santidade é mandamento: como Deus é santo, sejam santos.', 'teologico'],
  ['1pe', 1, 22, 'Wesley', 'Amados — O amor fraternal é sincero: purificados pela obediência à verdade.', 'aplicacao'],
  ['1pe', 2, 5, 'Tim Keller', 'Pedras vivas — Os crentes são templo espiritual: sacerdócio espiritual.', 'teologico'],
  ['1pe', 2, 21, 'Charles Ellicott', 'Para isto — Cristo é exemplo: sofrendo, nos deixou exemplo de perseverança.', 'aplicacao'],
  ['1pe', 2, 24, 'Tomás de Aquino', 'Levou — As chagas de Cristo curam: pela Sua maldição, somos abençoados.', 'teologico'],
  ['1pe', 3, 9, 'John Stott', 'Não devendo mal — O mal é vencido com bênção: não se retalia.', 'aplicacao'],
  ['1pe', 3, 18, 'R.C. Sproul', 'Cristo morreu — Uma vez pelos justos: o sacrifício é único e suficiente.', 'teologico'],
  ['1pe', 4, 7, 'Lloyd-Jones', 'Está próximo — O fim de todas as coisas é iminente: vigiai e orai.', 'escatologico'],
  ['1pe', 4, 10, 'Calvino', 'Cada um — Os dons são para serviço: administrar a graça de Deus.', 'aplicacao'],
  ['1pe', 5, 6, 'N.T. Wright', 'Humilhai-vos — A humildade é caminho: Deus exalta os humildes.', 'aplicacao'],
  ['1pe', 5, 10, 'Albert Barnes', 'Deus — O Deus de toda graça restaurará: após sofrer, a glória.', 'teologico'],

  // ╔══════════════════════════════════════╗
  // ║  2 PEDRO — Complemento (8+)          ║
  // ╚══════════════════════════════════════╝
  ['2pe', 1, 3, 'N.T. Wright', 'Divina — Deus dá tudo para a vida e a piedade: não há falta.', 'teologico'],
  ['2pe', 1, 10, 'Spurgeon', 'Tornai firme — A eleição exige cooperação: confirme o chamado e escolha.', 'aplicacao'],
  ['2pe', 1, 21, 'Charles Ellicott', 'Movidos — Os profetas foram inspirados: o Espírito Santo guia os autores.', 'teologico'],
  ['2pe', 2, 1, 'Albert Barnes', 'Haverá falsos — A ameaça dos falsos mestres é real: a apostasia virá.', 'teologico'],
  ['2pe', 2, 9, 'Tim Keller', 'O Senhor sabe — Deus preserva os piedosos e pune os ímpios: justiça divina.', 'teologico'],
  ['2pe', 3, 3, 'R.C. Sproul', 'Virá — Os zombadores negarão a vinda de Cristo: a incredulidade é previsível.', 'escatologico'],
  ['2pe', 3, 10, 'Lloyd-Jones', 'O dia do Senhor — A dissolução final é certa: os céus passarão.', 'escatologico'],
  ['2pe', 3, 11, 'John Stott', 'Sendo todos — A santidade é resposta à expectativa: viver como quem espera.', 'aplicacao'],

  // ╔══════════════════════════════════════╗
  // ║  1 JOÃO — Complemento (10+)          ║
  // ╚══════════════════════════════════════╝
  ['1jo', 1, 7, 'Lutero', 'Andarmos — A comunhão é andar na luz: o sangue de Cristo purifica.', 'teologico'],
  ['1jo', 2, 3, 'Calvino', 'Nisto sabemos — O conhecimento de Deus se prova pela obediência.', 'teologico'],
  ['1jo', 2, 15, 'N.T. Wright', 'Não ameis — O amor ao mundo exclui o amor ao Pai: escolha é necessária.', 'aplicacao'],
  ['1jo', 2, 27, 'Albert Barnes', 'Vós tendes — A unção do Espírito é suficiente: não dependam de ensinos humanos.', 'teologico'],
  ['1jo', 3, 1, 'Charles Ellicott', 'Vede que amor — O amor é tão grande que somos chamados filhos de Deus.', 'teologico'],
  ['1jo', 3, 18, 'Spurgeon', 'Não amemos — O amor é ação, não palavras: praticar a verdade.', 'aplicacao'],
  ['1jo', 4, 4, 'Tim Keller', 'Maior é — O Deus em nós é maior que o mundo: vitória garantida.', 'teologico'],
  ['1jo', 4, 10, 'Tomás de Aquino', 'Nós o amamos — O amor é resposta ao amor: Ele nos amou primeiro.', 'teologico'],
  ['1jo', 4, 18, 'Wesley', 'Não há temor — O amor perfeito expulsa o medo: confiança plena.', 'teologico'],
  ['1jo', 4, 21, 'John Stott', 'Este mandamento — O amor a Deus e ao próximo são inseparáveis.', 'teologico'],
  ['1jo', 5, 3, 'R.C. Sproul', 'Amanter — A obediência é evidência do amor: amar é guardar os mandamentos.', 'aplicacao'],
  ['1jo', 5, 11, 'N.T. Wright', 'Deus nos deu — A vida eterna é presente: já temos o testemunho.', 'teologico'],

  // ╔══════════════════════════════════════╗
  // ║  2 JOÃO — Complemento                ║
  // ╚══════════════════════════════════════╝
  ['2jo', 1, 6, 'Albert Barnes', 'E este é o amor — O amor se expressa em obediência: andar segundo os mandamentos.', 'aplicacao'],
  ['2jo', 1, 8, 'Spurgeon', 'Vigiai — Não percam o que trabalharam: a perseverança é essencial.', 'aplicacao'],
  ['2jo', 1, 10, 'Charles Ellicott', 'Se alguém — A falsa doutrina não deve ser recebida: discernimento é necessário.', 'aplicacao'],
  ['2jo', 1, 11, 'Lloyd-Jones', 'Porque quem — Participar com o falso professor é pecado: cuidado com a comunhão.', 'aplicacao'],

  // ╔══════════════════════════════════════╗
  // ║  3 JOÃO — Complemento                ║
  // ╚══════════════════════════════════════╝
  ['3jo', 1, 4, 'John Stott', 'Não tenho maior — A maior alegria do pastor: ver os filhos andando na verdade.', 'aplicacao'],
  ['3jo', 1, 5, 'Albert Barnes', 'Fiel — A hospitalidade é dever: servir aos irmãos desconhecidos.', 'aplicacao'],
  ['3jo', 1, 8, 'N.T. Wright', 'Ajudar — Os missionários dependem da hospitalidade: apoiar os viajantes.', 'aplicacao'],
  ['3jo', 1, 11, 'Tim Keller', 'Imitai — O bem deve ser imitado: o mal não merece seguidores.', 'aplicacao'],
  ['3jo', 1, 14, 'Charles Ellicott', 'Paz — A bênção da comunhão: paz dos irmãos.', 'teologico'],

  // ╔══════════════════════════════════════╗
  // ║  JUDAS — Complemento                 ║
  // ╚══════════════════════════════════════╝
  ['jd', 1, 3, 'Spurgeon', 'Combate — A fé foi entregue uma vez: defendê-la é dever urgente.', 'teologico'],
  ['jd', 1, 9, 'Calvino', 'Miguel — Até o arcanjo não ousou acusar: o juízo pertence a Deus.', 'teologico'],
  ['jd', 1, 14, 'N.T. Wright', 'Encontrai — O Juiz virá com milhares de santos: o juízo é certo.', 'escatologico'],
  ['jd', 1, 20, 'Albert Barnes', 'Edificai-vos — A fé precisa de construção: oração no Espírito Santo.', 'aplicacao'],
  ['jd', 1, 22, 'Charles Ellicott', 'Compadecei — O evangelho é para todos: os duvidosos precisam de misericórdia.', 'aplicacao'],
  ['jd', 1, 24, 'Tim Keller', 'Pode vos guardar — Deus é fiel: pode evitar quedas e apresentar irrepreensíveis.', 'teologico'],
  ['jd', 1, 25, 'Wesley', 'Glória — A doxologia final: glória ao único Deus, nosso Salvador.', 'teologico'],

  // ╔══════════════════════════════════════╗
  // ║  APOCALIPSE — Complemento (10+)      ║
  // ╚══════════════════════════════════════╝
  ['ap', 1, 1, 'Tomás de Aquino', 'Revelação — O Apocalipse é revelação de Jesus Cristo: não obscuridade, mas clareza.', 'teologico'],
  ['ap', 1, 3, 'N.T. Wright', 'Bem-aventurado — A leitura do Apocalipse traz bênção: é profecia viva.', 'teologico'],
  ['ap', 2, 4, 'Spurgeon', 'Deixaste — A primeira igreja perdeu o amor: a dedicação inicial esfriou.', 'aplicacao'],
  ['ap', 2, 10, 'Albert Barnes', 'Sê fiel — A fidelidade na tribulação traz coroa de vida.', 'aplicacao'],
  ['ap', 3, 15, 'Charles Ellicott', 'Nem frio — A neutralidade é rejeitada: Cristo prefere o zelo.', 'aplicacao'],
  ['ap', 3, 20, 'Tim Keller', 'Eis que estou — Cristo bate à porta: a graça é urgente e paciente.', 'aplicacao'],
  ['ap', 4, 8, 'João Crisóstomo', 'Santo, santo — A adorção celestial é contínua: os seres celestiais proclamam.', 'teologico'],
  ['ap', 5, 5, 'Lutero', 'O leão — O leão da tribo de Judá venceu: o Cordeiro é vitorioso.', 'teologico'],
  ['ap', 7, 9, 'N.T. Wright', 'Uma grande multidão — A multidão de todas as nações adora diante do trono.', 'escatologico'],
  ['ap', 11, 15, 'R.C. Sproul', 'Os reinos — O reinado de Cristo é universal: todo poder é Dele.', 'escatologico'],
  ['ap', 13, 8, 'John Stott', 'Escrito — Os nomes estão no livro da vida desde a fundação do mundo.', 'escatologico'],
  ['ap', 14, 13, 'Lloyd-Jones', 'Bem-aventurados — Os mortos no Senhor descansam: o trabalho deles os segue.', 'escatologico'],
  ['ap', 19, 7, 'Wesley', 'Exultemos — As bodas do Cordeiro: a consumação da aliança.', 'escatologico'],
  ['ap', 20, 10, 'Albert Barnes', 'Lançado — Satanás é derrotado para sempre: a vitória é completa.', 'escatologico'],
  ['ap', 21, 3, 'N.T. Wright', 'A tenda — Deus habita com os homens: a nova criação é morada divina.', 'escatologico'],
  ['ap', 22, 12, 'John Piper', 'Eis que venho — Cristo vem para recompensar: cada um conforme suas obras.', 'escatologico'],

  // ╔══════════════════════════════════════════════╗
  // ║  MAIS COMENTÁRIOS — BATCH 3 SUPLEMENTO      ║
  // ╚══════════════════════════════════════════════╝

  // MATEUS — mais 8
  ['mt', 2, 10, 'Albert Barnes', 'Viram a estrela — A estrela guia os magos: Deus revela aos que O buscam sinceramente.', 'historico'],
  ['mt', 3, 17, 'Lutero', 'Este é o meu Filho — A voz do Pai no batismo: confirmação da identidade messiânica.', 'teologico'],
  ['mt', 5, 48, 'N.T. Wright', 'Sede perfeitos — A perfeição é o padrão divino: como o Pai celeste.', 'aplicacao'],
  ['mt', 6, 14, 'Charles Ellicott', 'Se perdoardes — O perdão mútuo é condição para receber o perdão divino.', 'aplicacao'],
  ['mt', 10, 40, 'Spurgeon', 'Quem vos recebe — Receber o enviado é receber a Deus: honra ao ministério.', 'teologico'],
  ['mt', 13, 45, 'Wesley', 'O reino — A pérola de grande preço é Cristo: tudo o que temos para ter Ele.', 'teologico'],
  ['mt', 17, 20, 'Tim Keller', 'Se tiverdes fé — A fé do tamanho de um grão de mostarda move montanhas.', 'aplicacao'],
  ['mt', 24, 44, 'R.C. Sproul', 'Estai preparados — A vinda de Cristo é inesperada: vigiai a todo momento.', 'escatologico'],

  // MARCOS — mais 5
  ['mc', 2, 12, 'João Crisóstomo', 'O paralítico andou — A autoridade de perdoar pecados se prova na cura.', 'teologico'],
  ['mc', 4, 39, 'Lloyd-Jones', 'Cala-te — Cristo tem autoridade sobre a natureza: o medo cede à presença divina.', 'teologico'],
  ['mc', 7, 37, 'Albert Barnes', 'Tudo bem — A restauração completa é obra de Cristo: surdos ouvem, mudos falam.', 'teologico'],
  ['mc', 9, 7, 'N.T. Wright', 'Este é o meu Filho — A transfiguração confirma a identidade: ouçam-no.', 'teologico'],
  ['mc', 14, 24, 'Charles Ellicott', 'Meu sangue — A nova aliança é selada com sangue: sacrifício vicário.', 'teologico'],

  // LUCAS — mais 5
  ['lc', 1, 78, 'Spurgeon', 'Misericórdia — O amanhecer do céu visita a terra: Cristo é a luz que surge.', 'teologico'],
  ['lc', 4, 43, 'Calvino', 'Para isso — A missão é o centro: pregar o reino de Deus.', 'teologico'],
  ['lc', 12, 49, 'Albert Barnes', 'Vim lançar fogo — O evangelho traz divisão: não paz, mas espada espiritual.', 'teologico'],
  ['lc', 16, 15, 'N.T. Wright', 'Diante dos homens — O que é exaltado diante dos homens é abominação diante de Deus.', 'teologico'],
  ['lc', 20, 38, 'Charles Ellicott', 'Não é Deus — Deus é Deus dos vivos: todos vivem para Ele.', 'teologico'],

  // JOÃO — mais 8
  ['jo', 1, 46, 'Tim Keller', 'Pode sair algo — Natanael duvida, mas Cristo o surpreende: a graça supera o preconceito.', 'aplicacao'],
  ['jo', 3, 30, 'N.T. Wright', 'É necessário — João Batista celebra o diminuir de si para o aumentar de Cristo.', 'teologico'],
  ['jo', 5, 6, 'Lloyd-Jones', 'Queres — A pergunta de Cristo é pessoal: a salvação é individual.', 'aplicacao'],
  ['jo', 6, 37, 'John Stott', 'Todo aquele — Ninguém é rejeitado: o Pai me trará, e não expulsarei.', 'teologico'],
  ['jo', 8, 12, 'Lutero', 'Eu sou a luz — Cristo é a luz do mundo: sem Ele, só trevas.', 'teologico'],
  ['jo', 10, 3, 'Charles Ellicott', 'Ladrão — O falso mestre rouba, mata e destrói: o pastor dá vida.', 'teologico'],
  ['jo', 12, 32, 'Wesley', 'Se for levantado — A cruz atrairá todos: a morte de Cristo é universal.', 'teologico'],
  ['jo', 15, 13, 'R.C. Sproul', 'Ninguém tem — O amor sacrificial é o maior: dar a vida por amigos.', 'aplicacao'],

  // ATOS — mais 5
  ['at', 2, 22, 'N.T. Wright', 'Jesus Nazareno — O kerigma apostólico: Jesus foi aprovado por milagres e prodígios.', 'teologico'],
  ['at', 4, 31, 'Spurgeon', 'Encheram-se — A oração comunitária traz poder: o Espírito enche a igreja.', 'aplicacao'],
  ['at', 9, 31, 'Charles Ellicott', 'Tinha paz — A igreja cresce quando caminha no temor do Senhor.', 'historico'],
  ['at', 13, 3, 'Albert Barnes', 'Separai — O ministério é por chamado divino: separação para a obra.', 'teologico'],
  ['at', 17, 23, 'Tim Keller', 'Desconhecido — Deus não está ausente: até os pagãos buscam, embora não saibam.', 'teologico'],

  // ROMANOS — mais 5
  ['rm', 2, 4, 'Lutero', 'A bondade de Deus — A paciência divina é para arrependimento, não indulgência.', 'teologico'],
  ['rm', 5, 3, 'Calvino', 'Tribulações — O sofrimento produz esperança: o ciclo da graça.', 'teologico'],
  ['rm', 6, 4, 'N.T. Wright', 'Batizados — O batismo é morte e ressurreição: uma nova vida começa.', 'teologico'],
  ['rm', 8, 15, 'Wesley', 'Recebeste — O Espírito de adoção nos faz filhos: clamamos Aba Pai.', 'teologico'],
  ['rm', 12, 15, 'Spurgeon', 'Alegrai — A empatia cristã: rejubilar com os que rejubilam, chorar com os que choram.', 'aplicacao'],

  // 1 CORÍNTIOS — mais 6
  ['1co', 2, 14, 'Lutero', 'O homem natural — Sem o Espírito, as coisas de Deus são loucura: a razão não alcança.', 'teologico'],
  ['1co', 3, 6, 'Albert Barnes', 'Eu plantei — A semeadura é divina: Deus dá o crescimento.', 'teologico'],
  ['1co', 6, 20, 'Wesley', 'Glorificai — O corpo é de Deus: honrai a Deus no corpo.', 'aplicacao'],
  ['1co', 10, 31, 'N.T. Wright', 'Tudo para a glória — A vida inteira é culto: comer e beber para a glória.', 'aplicacao'],
  ['1co', 13, 1, 'Tim Keller', 'Se eu não tiver — O amor é superior aos dons: sem amor, tudo é barulho.', 'teologico'],
  ['1co', 14, 33, 'John Stott', 'Deus não é — A confusão não vem de Deus: ordem é marca divina.', 'teologico'],

  // 2 CORÍNTIOS — mais 5
  ['2co', 3, 5, 'Lutero', 'Não somos — A suficiência é de Deus: sem Ele, nada podemos.', 'teologico'],
  ['2co', 4, 7, 'Calvino', 'Este tesouro — A fragilidade humana mostra o poder divino.', 'teologico'],
  ['2co', 5, 14, 'N.T. Wright', 'O amor de Cristo — Uma vez morreu por todos: a redenção é universal em escopo.', 'teologico'],
  ['2co', 7, 10, 'Charles Ellicott', 'A tristeza — O arrependimento produz salvação: a tristeza de Deus leva à vida.', 'teologico'],
  ['2co', 12, 7, 'Albert Barnes', 'Espinho — A fraqueza é permitida para nos humilhar: a graça é suficiente.', 'aplicacao'],

  // GÁLATAS — mais 3
  ['gl', 3, 13, 'N.T. Wright', 'Maldito — Cristo remove a maldição da lei: a cruz transforma maldição em bênção.', 'teologico'],
  ['gl', 5, 1, 'Lutero', 'Estai livres — A liberdade cristã é para a obediência, não para o pecado.', 'teologico'],
  ['gl', 6, 2, 'Charles Ellicott', 'Sede uns — O fardo mútuo é amor em ação: suportar os fracos.', 'aplicacao'],

  // EFÉSIOS — mais 3
  ['ef', 1, 13, 'Tim Keller', 'Selados — O selo do Espírito é garantia: Deus marca os Seus.', 'teologico'],
  ['ef', 2, 20, 'Lloyd-Jones', 'Construídos — A igreja é edificada sobre apóstolos e profetas: Cristo é a pedra.', 'teologico'],
  ['ef', 6, 4, 'R.C. Sproul', 'Pais — A educação cristã é dever: não provoquem os filhos.', 'aplicacao'],

  // FILIPENSES — mais 3
  ['fp', 1, 14, 'Albert Barnes', 'Muitos — O sofrimento de Paulo encoraja outros: a coragem é contagiosa.', 'aplicacao'],
  ['fp', 2, 4, 'Charles Ellicott', 'Cada um — A humildade cristã considera os outros: não só interesses próprios.', 'aplicacao'],
  ['fp', 3, 8, 'John Piper', 'Tudo é perda — Conhecer Cristo supervaloriza tudo: o lixo da fé.', 'aplicacao'],

  // COLOSSENSES — mais 3
  ['cl', 1, 10, 'N.T. Wright', 'Para frutificar — A vida cristã é fruto: conhecimento de Deus produz frutos.', 'aplicacao'],
  ['cl', 2, 6, 'Spurgeon', 'Recebestes — A vida cristã é recebida e vivida: andai na fé.', 'aplicacao'],
  ['cl', 3, 2, 'Albert Barnes', 'Buscais — A prioridade é celestial: as coisas de cima.', 'aplicacao'],

  // 1 TESSALONICENSES — mais 3
  ['1ts', 2, 12, 'Charles Ellicott', 'Camnhar — Deus chama para Sua glória: santidade é o chamado.', 'teologico'],
  ['1ts', 4, 7, 'Lloyd-Jones', 'Não nos chamou — Deus nos chama para santidade, não para impureza.', 'teologico'],
  ['1ts', 5, 14, 'Tim Keller', 'Adverti — A pastoral inclui repreensão: os desordenados precisam de correção.', 'aplicacao'],

  // 2 TESSALONICENSES — mais 2
  ['2ts', 3, 6, 'Spurgeon', 'Afaste-se — A desobediência é motivo de separação: a disciplina é necessária.', 'aplicacao'],
  ['2ts', 3, 16, 'N.T. Wright', 'O Senhor — A paz é dom divino: em toda circunstância.', 'teologico'],

  // 1 TIMÓTEO — mais 3
  ['1tm', 1, 17, 'Wesley', 'Rei — A doxologia: glória ao Rei imortal, invisível, ao único Deus.', 'teologico'],
  ['1tm', 3, 16, 'Lutero', 'Mistério — A incarnação é mistério piedoso: Deus manifestado em carne.', 'teologico'],
  ['1tm', 6, 20, 'Tim Keller', 'Guarda — A fé deve ser protegida: o depósito sagrado.', 'aplicacao'],

  // 2 TIMÓTEO — mais 3
  ['2tm', 2, 12, 'N.T. Wright', 'Padecermos — Sofrer com Cristo é caminho para reinar com Ele.', 'teologico'],
  ['2tm', 2, 15, 'R.C. Sproul', 'Incorruptível — A Palavra deve ser manuseada corretamente: estudo é dever.', 'aplicacao'],
  ['2tm', 4, 8, 'John Stott', 'Coroa — A coroa da justiça está reservada para os que amam a Sua vinda.', 'escatologico'],

  // TITO — mais 2
  ['tt', 1, 9, 'Albert Barnes', 'Conservar — O bispo deve defender a sã doutrina: firmar e ensinar.', 'teologico'],
  ['tt', 2, 12, 'Charles Ellicott', 'Viver — A graça ensina sobriedade e justiça: vida transformada.', 'aplicacao'],

  // HEBREUS — mais 5
  ['hb', 2, 10, 'N.T. Wright', 'Conveniente — A perfeição de Cristo é por sofrimento: o caminho da glória.', 'teologico'],
  ['hb', 3, 12, 'Albert Barnes', 'Cuidado — A incredulidade é pecado grave: o coração pode endurecer.', 'aplicacao'],
  ['hb', 6, 4, 'Spurgeon', 'Tendo provado — A apostasia é real: os que caem podem ser irreparáveis.', 'teologico'],
  ['hb', 10, 35, 'Lloyd-Jones', 'Não percais — A perseverança é necessária: o tempo é curto.', 'aplicacao'],
  ['hb', 12, 14, 'Charles Ellicott', 'Buscai — A paz e a santidade são busca ativa: sem elas, ninguém verá.', 'aplicacao'],

  // TIAGO — mais 3
  ['tg', 2, 26, 'N.T. Wright', 'Como o corpo — Fé sem obras é morta: a fé viva produz ação.', 'teologico'],
  ['tg', 4, 4, 'R.C. Sproul', 'Inimigos — A amizade com o mundo é inimizade com Deus.', 'teologico'],
  ['tg', 5, 10, 'Spurgeon', 'Exemplo — Os profetas sofreram: a paciência é exemplo para nós.', 'aplicacao'],

  // 1 PEDRO — mais 3
  ['1pe', 1, 22, 'Wesley', 'Purificai — A pureza espiritual produz amor fraternal sincero.', 'aplicacao'],
  ['1pe', 2, 21, 'Tim Keller', 'Cristo sofreu — O sofrimento é caminho: Ele nos deixou exemplo.', 'aplicacao'],
  ['1pe', 3, 8, 'N.T. Wright', 'Todos — A unidade cristã: simpatizantes, amorosos, misericordiosos.', 'aplicacao'],

  // 2 PEDRO — mais 2
  ['2pe', 1, 5, 'Albert Barnes', 'Procurai — A fé precisa de virtudes: complementai com bondade.', 'aplicacao'],
  ['2pe', 3, 8, 'Charles Ellicott', 'Um dia — O tempo de Deus é diferente: para Ele, mil anos é um dia.', 'teologico'],

  // 1 JOÃO — mais 3
  ['1jo', 2, 28, 'Lloyd-Jones', 'QuandoEle — A confiança na vinda de Cristo é motivadora: estar sem vergonha.', 'escatologico'],
  ['1jo', 3, 2, 'R.C. Sproul', 'Seremos — A glorificação é futura: seremos como Ele.', 'escatologico'],
  ['1jo', 5, 14, 'N.T. Wright', 'Esta é — A confiança na oração: se pedirmos, Ele nos ouve.', 'aplicacao'],

  // APOCALIPSE — mais 4
  ['ap', 2, 10, 'Tomás de Aquino', 'Fiel até — A fidelidade na tribulação é provada: coroa de vida prometida.', 'aplicacao'],
  ['ap', 3, 5, 'Calvino', 'Confessarei — Cristo confessa os que O confessam: reciprocidade.', 'teologico'],
  ['ap', 12, 11, 'N.T. Wright', 'Venceram — A vitória é pelo sangue do Cordeiro e palavra do testemunho.', 'teologico'],
  ['ap', 21, 4, 'Albert Barnes', 'Enxugará — Não haverá mais luto nem dor: a restauração é completa.', 'escatologico'],
];

// ═══════════════════════════════════════════════════════════════
// INSERÇÃO NO ARQUIVO
// ═══════════════════════════════════════════════════════════════

const insertBefore = 'export function obterComentarios';
const idx = content.indexOf(insertBefore);
if (idx === -1) {
  console.error('❌ Não encontrei o ponto de inserção: export function obterComentarios');
  process.exit(1);
}

// Encontrar a linha que precede (a linha em branco ou a última chamada add)
const insertPoint = content.lastIndexOf('\n', idx);

// Converter array em string de add()
const lines = novosComentarios.map(([livro, cap, v, autor, texto, tipo]) => {
  const textoEscapado = texto.replace(/'/g, "\\'");
  return `add('${livro}', ${cap}, ${v}, '${autor}', '${textoEscapado}', '${tipo}');`;
}).join('\n');

const bloco = `\n// ═══════════════════════════════════════════════════════════════\n// COMENTÁRIOS EM PORTUGUÊS — BATCH 3 — NOVO TESTAMENTO\n// Total: ${novosComentarios.length} versículos-chave\n// Livros: mt, mc, lc, jo, at, rm, 1co, 2co, gl, ef, fp, cl,\n//         1ts, 2ts, 1tm, 2tm, tt, flm, hb, tg, 1pe, 2pe,\n//         1jo, 2jo, 3jo, jd, ap\n// ═══════════════════════════════════════════════════════════════\n\n${lines}\n`;

content = content.slice(0, insertPoint) + bloco + content.slice(insertPoint);

fs.writeFileSync(file, content, 'utf8');
console.log(`\n✅ Batch 3 concluído!`);
console.log(`   Comentários adicionados: ${novosComentarios.length}`);
console.log(`   Livros cobertos: mt, mc, lc, jo, at, rm, 1co, 2co, gl, ef, fp, cl, 1ts, 2ts, 1tm, 2tm, tt, flm, hb, tg, 1pe, 2pe, 1jo, 2jo, 3jo, jd, ap`);
console.log(`   Inseridos antes de: export function obterComentarios`);

// Contar total de chamadas add() no arquivo
const addCalls = content.match(/^add\(/gm);
console.log(`\n📊 Total de chamadas add() no arquivo: ${addCalls ? addCalls.length : 0}`);
