export type { LivroInfo } from './biblia/livros';
export type { Versao } from './biblia/versoes';
export type { PalavraGrega } from './lexicon/grego';
export type { PalavraHebraica } from './lexicon/hebraico';

export { TODOS_LIVROS, LIVROS_AT, LIVROS_NT, livroPorAbreviacao, livroPorOrdem } from './biblia/livros';
export { traducoes, traducaoPadrao } from './biblia/versoes';
export { carregarTraducao, obterCapituloMulti, obterInfoTraducao, TRADUCOES_DISPONIVEIS } from './biblia/texto/carregar';
export type { CapituloComparado, VersiculoData } from './biblia/texto/carregar';
export { ABREV_PARA_MIDVASH } from './biblia/midvash';
export { palavrasGregas } from './lexicon/grego';
export { palavrasHebraicas } from './lexicon/hebraico';
import { palavrasGregas as _palavrasGregas } from './lexicon/grego';
import { palavrasHebraicas as _palavrasHebraicas } from './lexicon/hebraico';

export interface Versiculo {
  numero: number;
  texto: string;
}

export interface Capitulo {
  numero: number;
  versiculos: Versiculo[];
}

export interface Livro {
  nome: string;
  abreviacao: string;
  testamento: 'AT' | 'NT';
  totalCapitulos: number;
  capitulos: Capitulo[];
}

export const livros: Livro[] = [
  {
    nome: 'Gênesis', abreviacao: 'gn', testamento: 'AT', totalCapitulos: 50,
    capitulos: [
      { numero: 1, versiculos: [
        { numero: 1, texto: 'No princípio criou Deus os céus e a terra.' },
        { numero: 2, texto: 'E a terra era sem forma e vazia; e havia trevas sobre a face do abismo; e o Espírito de Deus se movia sobre a face das águas.' },
        { numero: 3, texto: 'E disse Deus: Haja luz; e houve luz.' },
        { numero: 4, texto: 'E viu Deus que a luz era boa; e fez Deus separação entre a luz e as trevas.' },
        { numero: 5, texto: 'E Deus chamou à luz Dia; e às trevas chamou Noite. E foi a tarde e a manhã, um dia.' },
      ]},
      { numero: 2, versiculos: [
        { numero: 1, texto: 'Assim foram criados os céus e a terra, e todo o exército deles.' },
        { numero: 2, texto: 'E Deus completou no dia sétimo a sua obra que fizera; e descansou no dia sétimo de toda a sua obra que fizera.' },
        { numero: 3, texto: 'E abençoou Deus o dia sétimo, e o santificou, porque nele descansou de toda a sua obra que Deus criara e fizera.' },
      ]},
    ],
  },
  {
    nome: 'Êxodo', abreviacao: 'ex', testamento: 'AT', totalCapitulos: 40,
    capitulos: [
      { numero: 1, versiculos: [
        { numero: 1, texto: 'Estes são os nomes dos filhos de Israel que entraram no Egito com Jacó; cada um entrou com a sua casa:' },
        { numero: 2, texto: 'Rúben, Simeão, Levi e Judá,' },
        { numero: 3, texto: 'Issacar, Zebulom, Benjamim,' },
        { numero: 4, texto: 'Dã, Naftali, Gade e Aser.' },
      ]},
    ],
  },
  {
    nome: 'Salmos', abreviacao: 'sl', testamento: 'AT', totalCapitulos: 150,
    capitulos: [
      { numero: 1, versiculos: [
        { numero: 1, texto: 'Bem-aventurado o homem que não andou no conselho dos ímpios, não esteve no caminho dos pecadores, e não se assentou na roda dos escarnecedores.' },
        { numero: 2, texto: 'Mas o seu deleite está na lei do SENHOR, e na sua lei medita de dia e de noite.' },
        { numero: 3, texto: 'Será como árvore plantada à beira das águas, que dá o seu fruto no seu tempo, e cujas folhas não murcham; e tudo o que faz lhe será próspero.' },
      ]},
      { numero: 23, versiculos: [
        { numero: 1, texto: 'O SENHOR é o meu pastor; nada me faltará.' },
        { numero: 2, texto: 'Deitar-me faz em verdes pastos, guia-me mansamente a águas tranquilas.' },
        { numero: 3, texto: 'Refrigera a minha alma; guia-me pelas veredas da justiça, por amor do seu nome.' },
        { numero: 4, texto: 'Ainda que eu andasse pelo vale da sombra da morte, não temeria mal algum, porque tu estás comigo; a tua vara e o teu cajado me consolam.' },
        { numero: 5, texto: 'Preparas uma mesa perante mim na presença dos meus inimigos, unges a minha cabeça com óleo, o meu cálice transborda.' },
        { numero: 6, texto: 'Certamente que a bondade e a misericórdia me seguirão todos os dias da minha vida; e habitarei na casa do SENHOR por longos dias.' },
      ]},
    ],
  },
  {
    nome: 'Provérbios', abreviacao: 'pv', testamento: 'AT', totalCapitulos: 31,
    capitulos: [
      { numero: 1, versiculos: [
        { numero: 1, texto: 'Provérbios de Salomão, filho de Davi, rei de Israel:' },
        { numero: 2, texto: 'Para conhecer a sabedoria e a instrução; para perceber as palavras de entendimento;' },
        { numero: 3, texto: 'Para receber a instrução de prudente maneira, a justiça, e o juízo, e a equidade;' },
        { numero: 4, texto: 'Para dar aos simples prudência, ao menino conhecimento e discernimento.' },
        { numero: 5, texto: 'Ouve, o meu filho, a instrução de teu pai, e não rejeites a doutrina de tua mãe;' },
        { numero: 6, texto: 'Porque eles serão para a tua cabeça uma graciosas guirlanda, e colares para o teu pescoço.' },
      ]},
    ],
  },
  {
    nome: 'Isaías', abreviacao: 'is', testamento: 'AT', totalCapitulos: 66,
    capitulos: [
      { numero: 53, versiculos: [
        { numero: 1, texto: 'Quem crê a nossa pregação? E a quem foi revelado o braço do SENHOR?' },
        { numero: 2, texto: 'Subiu ele perante ele como renovo, e como raiz de terra seca; não tinha formosura nele, nem pompa; e quando o vimos, não tinha aparelação que nos agradasse.' },
        { numero: 3, texto: ' desprezado e o mais rejeitado dos homens; homem de dores, e que sabe o que é padecer; e como um de quem os homens escondem a sua face; desprezado, e dele não fizemos caso.' },
        { numero: 4, texto: 'Certamente ele tomou sobre si as nossas doenças, e as nossas dores ele suportou; nós o reputámos por aflito, ferido de Deus e oprimido.' },
        { numero: 5, texto: 'Mas ele foi ferido pelas nossas transgressões, e moinado pelas nossas iniquidades; o castigo da nossa paz estava sobre ele, e pelas suas chagas sarávamos.' },
      ]},
    ],
  },
  {
    nome: 'João', abreviacao: 'jo', testamento: 'NT', totalCapitulos: 21,
    capitulos: [
      { numero: 1, versiculos: [
        { numero: 1, texto: 'No princípio era o Verbo, e o Verbo estava com Deus, e o Verbo era Deus.' },
        { numero: 2, texto: 'Ele estava no princípio com Deus.' },
        { numero: 3, texto: 'Todas as coisas foram feitas por ele, e sem ele nada do que foi feito se fez.' },
        { numero: 4, texto: 'Nele estava a vida, e a vida era a luz dos homens.' },
        { numero: 5, texto: 'E a luz resplandece nas trevas, e as trevas não prevaleceram contra ela.' },
        { numero: 14, texto: 'E o Verbo se fez carne, e habitou entre nós (e vimos a sua glória, glória como de unigênito do Pai), cheio de graça e de verdade.' },
      ]},
      { numero: 3, versiculos: [
        { numero: 16, texto: 'Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.' },
      ]},
    ],
  },
  {
    nome: 'Romanos', abreviacao: 'rm', testamento: 'NT', totalCapitulos: 16,
    capitulos: [
      { numero: 8, versiculos: [
        { numero: 28, texto: 'E sabemos que todas as coisas contribuem juntamente para o bem daqueles que amam a Deus, daqueles que são chamados segundo o seu propósito.' },
        { numero: 29, texto: 'Porque os que dantes conheceu, também os predestinou para serem conformes à imagem de seu Filho, para que ele seja o primogênito entre muitos irmãos.' },
        { numero: 30, texto: 'E os que predestinou, a estes também chamou; e os que chamou, a estes também justificou; e os que justificou, a estes também glorificou.' },
      ]},
    ],
  },
  {
    nome: 'Efésios', abreviacao: 'ef', testamento: 'NT', totalCapitulos: 6,
    capitulos: [
      { numero: 2, versiculos: [
        { numero: 8, texto: 'Porque pela graça sois salvos, por meio da fé; e isto não vem de vós, é dom de Deus.' },
        { numero: 9, texto: 'Não vem das obras, para que ninguém se glorie.' },
        { numero: 10, texto: 'Porque somos feitura sua, criados em Cristo Jesus para boas obras, as quais Deus preparou para que andássemos nelas.' },
      ]},
    ],
  },
  {
    nome: 'Hebreus', abreviacao: 'hb', testamento: 'NT', totalCapitulos: 13,
    capitulos: [
      { numero: 11, versiculos: [
        { numero: 1, texto: 'Ora, a fé é o firme fundamento das coisas que se esperam, e a prova das coisas que se não veem.' },
        { numero: 2, texto: 'Pois por ela os antigos alcançaram testemunho.' },
        { numero: 3, texto: 'Pela fé entendemos que os séculos foram criados pela palavra de Deus, de maneira que aquilo que se vê não foi feito do que era visível.' },
        { numero: 6, texto: 'E sem fé é impossível agradar-lhe; porque é necessário que quem se aproxima de Deus creia que ele existe, e que é galardoador dos que o buscam.' },
      ]},
    ],
  },
];

export interface PalavraOriginal {
  strong: string;
  palavra: string;
  transliteracao: string;
  definicao: string;
  idioma: 'grego' | 'hebraico';
  morfologia?: string;
  frequencia?: number;
}

export const palavrasOriginais: PalavraOriginal[] = [
  ..._palavrasGregas.map((g) => ({ ...g, idioma: 'grego' as const })),
  ..._palavrasHebraicas.map((h) => ({ ...h, idioma: 'hebraico' as const })),
];

export interface Doutrina {
  nome: string;
  slug: string;
  definicao: string;
  passagens: string[];
  categoria: string;
  tradicoes?: string;
}

export const doutrinas: Doutrina[] = [
  // ═══════════════════════════════════════════════════════════════════════
  // BIBLIOLOGIA
  // ═══════════════════════════════════════════════════════════════════════
  { nome: 'Inspiração Bíblica', slug: 'inspiracao-biblica', definicao: 'Todas as Escrituras são sopradas por Deus, resultado da cooperação entre o Espírito Santo e os autores humanos, que escreveram exatamente o que Deus quis comunicar.', passagens: ['2 Tm 3:16', '2 Pe 1:21', '1 Co 2:13'], categoria: 'Bibliologia', tradicoes: 'Reformada: Plena inspiração verbal. Católica: Inspiração com tradição e magistério. Pentecostal: Inspiração plena com acesso ao texto original.' },
  { nome: 'Inerrância Bíblica', slug: 'inerrancia-biblica', definicao: 'As Escrituras, no original autógrafo, são verdadeiras e infalíveis em tudo o que afirmam, sem erro em matéria de fé, história ou ciência.', passagens: ['Sl 12:6', 'Pv 30:5', 'Jo 17:17'], categoria: 'Bibliologia', tradicoes: 'Reformada: Inerrância absoluta do texto original. Católica: Verdade sem erro em questões de fé e costumes. Liberal: Verdade espiritual, não necessariamente factual.' },
  { nome: 'Canon Bíblica', slug: 'canon-biblico', definicao: 'O conjunto de 66 livros que compõem as Escrituras Sagradas, reconhecidos pela igreja como autoridade divina final, 39 no AT e 27 no NT.', passagens: ['2 Tm 3:16-17', 'Ap 22:18-19', 'Lc 24:27'], categoria: 'Bibliologia', tradicoes: 'Reformada: 66 livros, canon fechado. Católica: 73 livros (inclui deuterocanônicos). Ortodoxa: 81 livros. Protestantes: somente livros hebraicos no AT.' },
  { nome: 'Revelação', slug: 'revelacao', definicao: 'A comunicação que Deus faz de Si mesmo ao homem: revelação geral na criação e revelação especial nas Escrituras e em Cristo.', passagens: ['Sl 19:1-4', 'Rm 1:19-20', 'Hb 1:1-2'], categoria: 'Bibliologia', tradicoes: 'Reformada: Revelação especial suprema na Bíblia. Católica: Revelação inclui tradição e magistério. Evangélica: Sola Scriptura como regra final.' },

  // ═══════════════════════════════════════════════════════════════════════
  // TEOLOGIA PROPER (NATUREZA DE DEUS)
  // ═══════════════════════════════════════════════════════════════════════
  { nome: 'Trindade', slug: 'trindade', definicao: 'Deus é um só em essência, mas existe em três pessoas distintas: Pai, Filho e Espírito Santo. Cada pessoa é plenamente Deus, mas há um único Deus.', passagens: ['Mt 28:19', '2 Co 13:14', '1 Pe 1:2'], categoria: 'Teologia Proper', tradicoes: 'Reformada: Trindade consubstancial. Católica: Trindade com processão dupla do Espírito. Pentecostal: Ênfase no Batismo no Espírito como experiência trinitária.' },
  { nome: 'Onipotência de Deus', slug: 'onipotencia-deus', definicao: 'Deus é todo-poderoso, capaz de realizar tudo o que é consistente com a Sua natureza. Não há limitação ao Seu poder, exceto o que Ele mesmo determina.', passagens: ['Jó 42:2', 'Jr 32:17', 'Mt 19:26'], categoria: 'Teologia Proper', tradicoes: 'Reformada: Onipotência soberana sobre todas as coisas. Católica: Poder infinito compatível com a bondade divina. Pentecostal: Ênfase no poder manifestado em milagres e curas.' },
  { nome: 'Onisciência de Deus', slug: 'onisciencia-deus', definicao: 'Deus sabe todas as coisas, presentes, passadas e futuras, incluindo todos os pensamentos e intenções do coração humano, sem exceção.', passagens: ['1 Jo 3:20', 'Sl 139:1-4', 'Is 46:9-10'], categoria: 'Teologia Proper', tradicoes: 'Reformada: Conhecimento soberano inclui decreto de tudo. Católica: Conhecimento infalível e eterno. Arminiana: Conhecimento inclui possibilidades contingentes.' },
  { nome: 'Onipresença de Deus', slug: 'onipresenca-deus', definicao: 'Deus está presente em todos os lugares ao mesmo tempo, plenamente em cada ponto do universo, sem divisão ou localização.', passagens: ['Sl 139:7-12', 'Jr 23:23-24', 'Ef 1:23'], categoria: 'Teologia Proper', tradicoes: 'Reformada: Presença sustentadora e preenchente. Católica: Presença real na Eucaristia. Evangélica: Presença especial na adoração e na igreja.' },
  { nome: 'Imutabilidade de Deus', slug: 'imutabilidade-deus', definicao: 'Deus é o mesmo ontem, hoje e eternamente. Suas perfeições, propósitos e caráter não mudam jamais.', passagens: ['Ml 3:6', 'Hb 13:8', 'Nm 23:19'], categoria: 'Teologia Proper', tradicoes: 'Reformada: Imutabilidade absoluta de decreto e caráter. Católica: Imutabilidade essencial com relação dinâmica ao mundo. Processual: Deus muda em relação ao mundo (Teísmo Aberto).' },
  { nome: 'Soberania de Deus', slug: 'soberania-deus', definicao: 'Deus exerce autoridade suprema e direção soberana sobre toda a criação, seus eventos e todas as nações, sem exceção.', passagens: ['Sl 103:19', 'Dn 4:35', 'Ef 1:11'], categoria: 'Teologia Proper', tradicoes: 'Reformada: Soberania absoluta sobre salvação e história. Católica: Soberania compatível com livre-arbítrio. Arminiana: Soberania que respeita a liberdade humana.' },
  { nome: 'Justiça de Deus', slug: 'justica-deus', definicao: 'Deus é perfeitamente justo em todas as Suas ações, julgando com retidão perfeita, sem favoritismo, e exigindo justiça dos homens.', passagens: ['Rm 1:17', 'Dt 32:4', 'At 17:31'], categoria: 'Teologia Proper', tradicoes: 'Reformada: Justiça satisfeita na expiação vicária. Católica: Justiça manifesta nos sacramentos e obras. Evangélica: Justiça declarada ao pecador pela fé.' },
  { nome: 'Misericórdia de Deus', slug: 'misericordia-deus', definicao: 'Deus é compassivo e misericordioso, não tratando os pecadores como seus pecados merecem, mas concedendo-lhes graça e perdão gratuito.', passagens: ['Sl 103:8-13', 'Lm 3:22-23', 'Ef 2:4-5'], categoria: 'Teologia Proper', tradicoes: 'Reformada: Misericórdia soberana e irresistível. Católica: Misericórdia mediada pelos sacramentos. Pentecostal: Misericórdia manifesta em curas e libertações.' },
  { nome: 'Criação', slug: 'criacao', definicao: 'Deus criou todas as coisas do nada, pela Sua Palavra, em seis dias, e tudo era muito bom. A criação testifica do poder e da glória do Criador.', passagens: ['Gn 1:1-31', 'Sl 33:6', 'Hb 11:3'], categoria: 'Teologia Proper', tradicoes: 'Reformada: Criacionismo da terra velha ou jovem. Católica: Criacionismo com interpretação alegórica possível. Evangélica: Ênfase na criação ex nihilo e no design inteligente.' },
  { nome: 'Providência', slug: 'providencia', definicao: 'Governo contínuo de Deus sobre toda a criação, sustentando e dirigindo todas as coisas, desde a menor até a maior, para o Seu propósito soberano.', passagens: ['Cl 1:17', 'Ef 1:11', 'Rm 8:28'], categoria: 'Teologia Proper', tradicoes: 'Reformada: Providência de sustento, concursos e direção. Católica: Providência compatível com livre-arbítrio. Arminiana: Providência que permite escolhas humanas reais.' },

  // ═══════════════════════════════════════════════════════════════════════
  // BIBLIOLOGIA (ADICIONAL)
  // ═══════════════════════════════════════════════════════════════════════
  { nome: 'Profecia', slug: 'profecia', definicao: 'Discurso divinamente inspirado pelo qual Deus comunica Sua vontade, seja predizendo eventos futuros ou declarando Sua mensagem ao povo por intermédio de profetas.', passagens: ['2 Pe 1:20-21', 'Dt 18:18-22', 'Jr 1:9'], categoria: 'Bibliologia', tradicoes: 'Reformada: Profecia como revelação verbal inerrante. Pentecostal: Profecia como palavra atualizada para hoje. Católica: Profecia reconhecida pela autoridade da igreja.' },

  // ═══════════════════════════════════════════════════════════════════════
  // CRISTOLOGIA
  // ═══════════════════════════════════════════════════════════════════════
  { nome: 'Encarnação', slug: 'encarnacao', definicao: 'O Verbo eterno de Deus se fez homem em Jesus Cristo, sendo verdadeiro Deus e verdadeiro homem, sem confusão de naturezas e sem separação de pessoa.', passagens: ['Jo 1:14', 'Fp 2:5-8', 'Hb 1:1-3'], categoria: 'Cristologia', tradicoes: 'Reformada: Encarnação hipostática em duas naturezas. Católica: Encarnação com culto à Virgem Maria. Evangélica: Ênfase na suficiência da obra encarnada.' },
  { nome: 'Natureza Divina de Cristo', slug: 'natureza-divina-cristo', definicao: 'Jesus Cristo é verdadeiro Deus, coeterno e consubstancial com o Pai, tendo toda a plenitude da divindade nele habitando corporalmente.', passagens: ['Jo 1:1', 'Cl 2:9', 'Hb 1:3'], categoria: 'Cristologia', tradicoes: 'Reformada: Deidade plena conforme Nicéia. Católica: Deidade com invoke Maria como Theotokos. Arianismo e Testemunhas de Jeová negam a plena divindade.' },
  { nome: 'Natureza Humana de Cristo', slug: 'natureza-humana-cristo', definicao: 'Jesus Cristo é verdadeiro homem, nascido de mulher, com corpo, alma e mente, sujeito a fome, sede, cansaço e sofrimento, mas sem pecado.', passagens: ['Hb 2:17', 'Fp 2:7', 'Mt 4:2'], categoria: 'Cristologia', tradicoes: 'Reformada: Natureza humana completa sem pecado. Católica: Natureza humana sem mancha original (Imaculada Conceição). Evangélica: Ênfase na tentação real de Cristo.' },
  { nome: 'Ofícios de Cristo', slug: 'oficios-de-cristo', definicao: 'Cristo exerce três ofícios fundamentais: Profeta (revela Deus), Sacerdote (intercede e sacrifices) e Rei (governa e reina sobre todas as coisas).', passagens: ['Dt 18:15', 'Hb 4:14-16', 'Ap 19:16'], categoria: 'Cristologia', tradicoes: 'Reformada: Três ofícios como função mediadora. Católica: Ofício sacerdotal perpetuado na missa. Pentecostal: Ênfase no ofício profético e régio.' },
  { nome: 'Morte Vicária de Cristo', slug: 'morte-vicaria-cristo', definicao: 'A morte de Cristo na cruz foi sacrifício substitutivo pelos pecados da humanidade, satisfazendo plenamente a justiça de Deus e tornando possível a reconciliação.', passagens: ['Is 53:5', 'Rm 3:23-25', '1 Pe 2:24'], categoria: 'Cristologia', tradicoes: 'Reformada: Substituição penal (penal substitution). Católica: Sacrifício de propiciação e reparação. Arminiana: Expição ilimitada para todos. Molinista: Expição suficiente para todos, eficaz para os eleitos.' },
  { nome: 'Ressurreição Corporal de Cristo', slug: 'ressurreicao-corporal-cristo', definicao: 'Cristo ressuscitou corporalmente ao terceiro dia, vencendo a morte, confirmando Sua identidade messiânica e garantindo a ressurreição dos crentes no último dia.', passagens: ['1 Co 15:3-8', 'Rm 1:4', 'At 2:24'], categoria: 'Cristologia', tradicoes: 'Reformada: Ressurreição literal e corporal. Católica: Ressurreição como fundamento da fé. Pentecostal: Ressurreição como base para milagres e curas hoje.' },
  { nome: 'Cristologia', slug: 'cristologia', definicao: 'A pessoa de Jesus Cristo: verdadeiro Deus e verdadeiro homem, único Mediador entre Deus e os homens, Senhor e Salvador da humanidade.', passagens: ['Hb 1:3', 'Cl 2:9', '1 Tm 2:5'], categoria: 'Cristologia', tradicoes: 'Reformada: Duas naturezas em uma pessoa. Católica: Cristo como cabeça da igreja e sacramento da salvação. Evangélica: Cristo como suficiente e único Salvador.' },

  // ═══════════════════════════════════════════════════════════════════════
  // PNEUMATOLOGIA
  // ═══════════════════════════════════════════════════════════════════════
  { nome: 'Pneumatologia', slug: 'pneumatologia', definicao: 'Doutrina do Espírito Santo, terceira pessoa da Trindade, que procede do Pai e do Filho, convence do pecado, regenera, santifica e distribui dons.', passagens: ['Jo 14:16-17', 'Jo 16:13-14', 'At 2:1-4'], categoria: 'Pneumatologia', tradicoes: 'Reformada: Ênfase na regeneração e santificação. Pentecostal: Ênfase no batismo no Espírito e dons carismáticos. Católica: Ênfase na santificação sacramental.' },
  { nome: 'Dons Espirituais', slug: 'dons-espirituais', definicao: 'Habilitações especiais concedidas pelo Espírito Santo aos crentes para edificação do corpo de Cristo e serviço na igreja, incluindo dons sobrenaturais e ministeriais.', passagens: ['1 Co 12:4-11', 'Rm 12:6-8', 'Ef 4:11-13'], categoria: 'Pneumatologia', tradicoes: 'Reformada: Dons cessacionistas (alguns cessaram). Pentecostal: Dons continuístas (todos persistem). Católica: Dons reconhecidos na tradição e liturgia.' },

  // ═══════════════════════════════════════════════════════════════════════
  // ANGELOGOGIA
  // ═══════════════════════════════════════════════════════════════════════
  { nome: 'Anjos: Natureza e Função', slug: 'anjos-natureza-funcao', definicao: 'Anjos são seres espirituais criados por Deus, ministros celestiais que servem como mensageiros, guerreiros e adoradores, executando a Sua vontade na história.', passagens: ['Sl 104:4', 'Hb 1:14', 'Dt 33:2'], categoria: 'Angelologia', tradicoes: 'Reformada: Anjos como servos soberanos de Deus. Católica: Anjos da guarda e intercessão com hierarquia. Pentecostal: Anjos atuam ativamente na guerra espiritual.' },
  { nome: 'Hierarquia Angelical', slug: 'hierarquia-angelical', definicao: 'As Escrituras descrevem ordens de anjos como querubins, serafins, arcanjos e potestades, organizados em hierarquia celestial para cumprir os propósitos divinos.', passagens: ['Ef 1:21', 'Cl 1:16', 'Is 6:1-3'], categoria: 'Angelologia', tradicoes: 'Reformada: Hierarquia funcional subordinada a Cristo. Católica: Nove coros angélicos elaborados. Ortodoxa: Hierarquia com intercessão dos santos.' },
  { nome: 'Satanás e Anjos Caídos', slug: 'satanas-anjos-caidos', definicao: 'Satanás é o diabo, anjo caído que se rebelou contra Deus, tentador da humanidade, acusador dos irmãos, que será finalmente derrotado e lançado no lago de fogo.', passagens: ['Ap 12:9', 'Ef 6:11-12', 'Is 14:12-15'], categoria: 'Angelologia', tradicoes: 'Reformada: Satanás como instrumento limitado pela soberania de Deus. Católica: Satanás como inimigo real mas derrotado. Pentecostal: Ênfase na guerra espiritual contra Satanás.' },

  // ═══════════════════════════════════════════════════════════════════════
  // ANTOPOLOGIA
  // ═══════════════════════════════════════════════════════════════════════
  { nome: 'Natureza Humana', slug: 'natureza-humana', definicao: 'O homem foi criado à imagem de Deus, com corpo, alma e espírito, dotado de racionalidade, moralidade, relação e domínio, mas caiu em pecado e precisa de redenção.', passagens: ['Gn 1:26-27', 'Sl 8:4-6', 'Ec 12:7'], categoria: 'Antropologia', tradicoes: 'Reformada: natureza inteiramente corrompida pelo pecado. Católica: alma imortal com livre-arbítrio. Pentecostal: ser tripartido (corpo, alma, espírito).' },
  { nome: 'Imagem de Deus (Imago Dei)', slug: 'imago-dei', definicao: 'O homem foi criado à imagem e semelhança de Deus, dotado de racionalidade, moralidade, capacidade relacional e domínio sobre a criação, refletindo o caráter do Criador.', passagens: ['Gn 1:26-27', 'Gn 5:1', 'Cl 3:10'], categoria: 'Antropologia', tradicoes: 'Reformada: Imagem danificada mas não destruída pela queda. Católica: Imagem ontológica preservada. Evangélica: Imagem funcional restaurada em Cristo.' },
  { nome: 'Queda do Homem', slug: 'queda-do-homem', definicao: 'Adão e Eva, em desobediência a Deus, comeram do fruto proibido, corrompendo toda a natureza humana, trazendo morte espiritual e física sobre toda a humanidade.', passagens: ['Gn 3:1-24', 'Rm 5:12', 'Rm 3:10-12'], categoria: 'Antropologia', tradicoes: 'Reformada: QuedaTotal — corrupção em cada parte. Católica: Queda com perda da justiça original. Arminiana: Queda com liberdade residual para cooperar.' },
  { nome: 'Antropologia', slug: 'antropologia', definicao: 'Doutrina do homem criado à imagem e semelhança de Deus, mas caído pelo pecado, necessitando da graça divina para restauração e salvação eterna.', passagens: ['Gn 1:26-27', 'Sl 8:4-6', 'Ec 12:7'], categoria: 'Antropologia', tradicoes: 'Reformada: Dualismo corpo-alma, natureza caída. Católica: Dualismo com alma imortal. Evangélica: Ser holístico imagem de Deus.' },

  // ═══════════════════════════════════════════════════════════════════════
  // HAMARTIOLOGIA (PECADO)
  // ═══════════════════════════════════════════════════════════════════════
  { nome: 'Natureza do Pecado', slug: 'natureza-do-pecado', definicao: 'Pecado é transgressão da Lei de Deus, iniqüidade, rebeldia e corrupção da natureza humana. Toda transgressão da Lei é pecado, e o pecado leva à morte.', passagens: ['1 Jo 3:4', 'Rm 3:23', 'Tg 1:15'], categoria: 'Hamartiologia', tradicoes: 'Reformada: Pecado como corrupção total. Católica: Pecado venial e mortal. Evangélica: Pecado como rebelião pessoal contra Deus.' },
  { nome: 'Origem do Pecado', slug: 'origem-do-pecado', definicao: 'O pecado teve origem na queda de Satanás e na desobediência de Adão e Eva no Éden, corrompendo toda a humanidade que herdou a natureza pecaminosa.', passagens: ['Gn 3:1-19', 'Ez 28:15', 'Rm 5:12'], categoria: 'Hamartiologia', tradicoes: 'Reformada: Pecado herdado por imputação de Adão. Católica: Pecado original como privação da graça. Arminiana: Pecado herdado mas não a culpa.' },
  { nome: 'Consequências do Pecado', slug: 'consequencias-do-pecado', definicao: 'O pecado traz morte espiritual, separação de Deus, corrupção total da natureza, culpa, condenação, sofrimento e a necessidade de redenção por meio de Cristo.', passagens: ['Rm 6:23', 'Ef 2:1-3', 'Is 59:2'], categoria: 'Hamartiologia', tradicoes: 'Reformada: Condenação eterna sem a graça. Católica: Purgatório como purificação. Evangélica: Morte espiritual imediata e separação de Deus.' },
  { nome: 'Pecado Original', slug: 'pecado-original', definicao: 'A corrupção da natureza humana herdada de Adão, resultando em culpa e inclinação para o mal em todos os descendentes, tornando impossível a salvação pelas obras.', passagens: ['Rm 5:12', 'Sl 51:5', 'Ef 2:1-3'], categoria: 'Hamartiologia', tradicoes: 'Reformada: Culpa e corrupção imputadas. Católica: Culpa removida pelo batismo (sem culpa pessoal). Luterana: Culpa herdada sem pecado pessoal.' },

  // ═══════════════════════════════════════════════════════════════════════
  // SOTERIOLOGIA (SALVAÇÃO)
  // ═══════════════════════════════════════════════════════════════════════
  { nome: 'Graça', slug: 'graca', definicao: 'Favor imerecido e soberano de Deus, concedido gratuitamente aos pecadores, que não merecem nada, para que sejam salvos, regenerados, justificados e santificados.', passagens: ['Ef 2:8-9', 'Rm 5:15', 'Tt 2:11'], categoria: 'Soteriologia', tradicoes: 'Reformada: Graça soberana e irresistível. Católica: Graça meritória e sacramental. Arminiana: Graça resistível e preveniente. Pentecostal: Graça manifesta em curas e libertações.' },
  { nome: 'Eleição', slug: 'eleicao', definicao: 'Escolha soberana de Deus desde a eternidade, pela qual predestina certos pecadores para serem salvos em Cristo, não por mérito algum, mas segundo o Seu conselho.', passagens: ['Ef 1:4-5', 'Rm 8:29-30', '2 Ts 2:13'], categoria: 'Soteriologia', tradicoes: 'Reformada: Eleição incondicional e unilateral. Católica: Eleição com previsão do mérito. Arminiana: Eleição condicional baseada na fé prevista. Molinista: Eleição baseada no conhecimento middle knowledge.' },
  { nome: 'Predestinação', slug: 'predestinacao', definicao: 'O decreto eterno de Deus de salvar certos indivíduos e conduzir toda a história para o cumprimento dos Seus propósitos soberanos em Cristo.', passagens: ['Rm 8:29-30', 'Ef 1:5', 'Rm 9:11-23'], categoria: 'Soteriologia', tradicoes: 'Reformada: Predestinação dupla (salvação e condenação). Católica: Predestinação compatível com livre-arbítrio. Arminiana: Predestinação baseada na presciência. Hipotetismo: Predestinação condicional.' },
  { nome: 'Expiação', slug: 'expiacao', definicao: 'A morte de Cristo na cruz foi sacrifício substitutivo e satisfatório pelos pecados da humanidade, satisfazendo plenamente a justiça de Deus e tornando possível a reconciliação.', passagens: ['Rm 3:23-25', '1 Co 15:3', '1 Pe 2:24'], categoria: 'Soteriologia', tradicoes: 'Reformada: Substituição penal (Anselmo, Calvino). Católica: Sacrifício de propiciação e reparação. Arminiana: Expição ilimitada para todos. universalista: Expição universal eficaz.' },
  { nome: 'Justificação', slug: 'justificacao', definicao: 'Ato jurídico e unilateral de Deus pelo qual o pecador é declarado justo diante da Lei, não por obras, mas mediante a fé em Jesus Cristo, imputando-lhe a justiça de Cristo.', passagens: ['Rm 3:24', 'Rm 5:1', 'Gl 2:16'], categoria: 'Soteriologia', tradicoes: 'Reformada: Justificação pela fé somente (sola fide). Católica: Justificação como processo que inclui obras. Arminiana: Justificação pela fé cooperando com a graça.' },
  { nome: 'Regeneração', slug: 'regeneracao', definicao: 'A obra soberana do Espírito Santo que produz nova vida espiritual no crente, nascendo de novo, tornando-o nova criatura capaz de crer e se arrepender.', passagens: ['Jo 3:3-6', 'Tt 3:5', '2 Co 5:17'], categoria: 'Soteriologia', tradicoes: 'Reformada: Regeneração precede a fé. Católica: Regeneração pelo batismo. Arminiana: Regeneração é resultado da resposta à graça. Evangélica: Regeneração é nova nascença espiritual.' },
  { nome: 'Adoção', slug: 'adocao', definicao: 'Ato de Deus pelo qual os crentes são recebidos como filhos legítimos na família divina, com todos os direitos de herança, incluindo a filiação espiritual e a glória futura.', passagens: ['Rm 8:15-17', 'Gl 4:4-7', 'Ef 1:5'], categoria: 'Soteriologia', tradicoes: 'Reformada: Adoção como presente da salvação. Católica: Adoção pelo batismo e sacramentos. Evangélica: Adoção como segurança da salvação.' },
  { nome: 'Santificação', slug: 'santificacao', definicao: 'Processo progressivo pelo qual o Espírito Santo transforma o crente à imagem de Cristo, separando-o para Deus, renovando a mente e produzindo frutos de justiça.', passagens: ['1 Ts 4:3', 'Hb 12:14', '1 Pe 1:15-16'], categoria: 'Soteriologia', tradicoes: 'Reformada: Santificação progressiva e gradual. Católica: Santificação através dos sacramentos e mérito. Wesleyana: Santificação instantaneous como segunda bênção. Pentecostal: Santificação pelo poder do Espírito.' },
  { nome: 'Perseverança dos Santos', slug: 'perseveranca-dos-santos', definicao: 'Aqueles que foram verdadeiramente regenerados e justificados pela graça de Deus perseverarão até o fim, sendo guardados pelo poder divino até a salvação final.', passagens: ['Jo 10:28-29', 'Fp 1:6', 'Rm 8:38-39'], categoria: 'Soteriologia', tradicoes: 'Reformada: Perseverança incondicional (perseverança dos santos). Católica: Salvação pode ser perdida pela graça mortal. Arminiana: Perseverança condicional à perseverança na fé. Evangélica: Segurança eterna do crente.' },
  { nome: 'Batismo', slug: 'batismo', definicao: 'Ordenança instituída por Cristo como sinal visível da graça, simbolizando a morte e ressurreição com Cristo, pela imersão em água em nome do Pai, do Filho e do Espírito Santo.', passagens: ['Mt 28:19', 'Rm 6:3-4', 'At 2:38'], categoria: 'Soteriologia', tradicoes: 'Reformada: Batismo como sinal da aliança. Católica: Batismo como sacramento que remove o pecado original. Batista: Batismo como ordenança de crentes apenas. Pentecostal: Batismo como testemunho público de fé.' },
  { nome: 'Ceia do Senhor', slug: 'ceia-do-senhor', definicao: 'A Ceia do Senhor é ordenança instituída por Jesus como memorial da Sua morte sacrificial, onde os crentes participam do pão e do vinho em comunhão espiritual.', passagens: ['1 Co 11:23-26', 'Mt 26:26-29', 'Lc 22:19-20'], categoria: 'Soteriologia', tradicoes: 'Reformada: Ceia como sinal e selo da aliança. Católica: Transubstanciação (presença real). Luterana: Consubstanciação. Evangélica: Memória simbólica da morte de Cristo.' },

  // ═══════════════════════════════════════════════════════════════════════
  // ECCLESIOLOGIA
  // ═══════════════════════════════════════════════════════════════════════
  { nome: 'Igreja', slug: 'igreja', definicao: 'A igreja é a comunidade dos chamados por Deus, corpo de Cristo, templo do Espírito Santo, composta por todos os crentes verdadeiros, que existe para adoração, edificação e missão.', passagens: ['Mt 16:18', '1 Co 12:27', 'Ef 1:22-23'], categoria: 'Eclesiologia', tradicoes: 'Reformada: Igreja invisível (eleitos) e visível (congregação). Católica: Igreja como instituição com hierarquia apostólica. Batista: Igreja local autônoma de crentes.' },
  { nome: 'Natureza da Igreja', slug: 'natureza-da-igreja', definicao: 'A igreja é uma realidade espiritual e comunitária: corpo de Cristo, noiva de Cristo, povo de Deus, coluna e firmeza da verdade, constituída por crentes regenerados.', passagens: ['Ef 5:25-27', '1 Tm 3:15', '1 Pe 2:9'], categoria: 'Eclesiologia', tradicoes: 'Reformada: Igreja visível e invisível. Católica: Igreja como sacramento universal de salvação. Evangélica: Igreja como comunidade de crentes.' },
  { nome: 'Ministério da Igreja', slug: 'ministerio-da-igreja', definicao: 'Deus estabeleceu ofícios na igreja — pastores, mestres, evangelistas, apóstolos e diáconos — para equipar os santos, edificar o corpo e cumprir a Grande Comissão.', passagens: ['Ef 4:11-13', '1 Tm 3:1-13', 'At 20:28'], categoria: 'Eclesiologia', tradicoes: 'Reformada: Governo congregacional ou presbiteriano. Católica: Hierarquia papal e episcopal. Batista: Governo congregacional democrático.' },
  { nome: 'Sacramentos/Ordens', slug: 'sacramentos-ordens', definicao: 'Ordenanças instituídas por Cristo como sinais visíveis da graça invisível: Batismo e Ceia do Senhor, meios de graça pela qual Deus fortalece a fé dos crentes.', passagens: ['Mt 28:19', '1 Co 11:23-26', 'Rm 6:3-4'], categoria: 'Eclesiologia', tradicoes: 'Reformada: Dois sacramentos (Batismo e Ceia). Católica: Sete sacramentos. Evangélica: Duas ordenanças como memorial e sinal.' },
  { nome: 'Autoridade da Bíblia', slug: 'autoridade-da-biblia', definicao: 'A Bíblia é a Palavra de Deus inspirada, inerrante e suficiente, a autoridade final em matéria de fé, prática e vida cristã, acima de toda tradição humana.', passagens: ['2 Tm 3:16-17', '2 Pe 1:20-21', 'Is 40:8'], categoria: 'Eclesiologia', tradicoes: 'Reformada: Sola Scriptura — autoridade suprema. Católica: Escritura e Tradição como fontes. Evangélica: Prima Scriptura — Bíblia como norma máxima.' },
  { nome: 'Unidade da Igreja', slug: 'unidade-da-igreja', definicao: 'Todos os crentes em Cristo formam um só corpo, uma só igreja, independentemente de denominações, culturas ou épocas, unidos pela fé comum em Cristo.', passagens: ['Ef 4:4-6', 'Jo 17:20-23', 'Gl 3:28'], categoria: 'Eclesiologia', tradicoes: 'Reformada: Unidade na diversidade de igrejas locais. Católica: Unidade sob a autoridade do Papa. Ecumênica: Unidade visível entre todas as denominações.' },

  // ═══════════════════════════════════════════════════════════════════════
  // TEOLOGIA BÍBLICA
  // ═══════════════════════════════════════════════════════════════════════
  { nome: 'Aliança', slug: 'alianca', definicao: 'Pacto soberano de Deus com Seu povo, estabelecendo relação de comunhão, promessas e obrigações, cumprido plenamente em Cristo na Nova Aliança.', passagens: ['Gn 12:1-3', 'Ex 24:8', 'Jr 31:31-34'], categoria: 'Teologia Bíblica', tradicoes: 'Reformada: Teologia do pacto (obediente e da graça). Dispensacionalista: Dispensações distintas de Deus com a humanidade. Católica: Aliança cumprida na Igreja.' },

  // ═══════════════════════════════════════════════════════════════════════
  // ESCATOLOGIA
  // ═══════════════════════════════════════════════════════════════════════
  { nome: 'Reino de Deus', slug: 'reino-deus', definicao: 'O domínio soberano de Deus sobre todas as coisas, já presente em Cristo e ainda futuro na consumação, onde Deus reinará plenamente sobre toda a criação.', passagens: ['Mc 1:15', 'Mt 6:33', 'Ap 11:15'], categoria: 'Escatologia', tradicoes: 'Reformada: Reino presente e futuro (inaugurado). Dispensacionalista: Reino milenar literal. Teologia do reino: Reino holístico e social.' },
  { nome: 'Segunda Vinda de Cristo', slug: 'segunda-vinda-de-cristo', definicao: 'Jesus Cristo voltará pessoalmente, visivelmente e gloriosamente para julgar os vivos e os mortos, ressuscitar os santos e estabelecer o Seu reino eterno.', passagens: ['At 1:11', '1 Ts 4:16-17', 'Ap 1:7'], categoria: 'Escatologia', tradicoes: 'Reformada: Segunda vinda como consumação do reino. Dispensacionalista: Arrebatamento antes da tribulação. Amilenista: Reino espiritual presente até a volta.' },
  { nome: 'Ressurreição dos Mortos', slug: 'ressurreicao-dos-mortos', definicao: 'No último dia, todos os mortos ressuscitarão: os justos para a vida eterna com Deus, e os ímpios para a condenação eterna, cada um segundo as suas obras.', passagens: ['Jo 5:28-29', '1 Co 15:51-53', 'Dn 12:2'], categoria: 'Escatologia', tradicoes: 'Reformada: Ressurreição dos justos e injustos. Católica: Ressurreição da carne e juízo particular. Evangélica: Ressurreição corporal como esperança central.' },
  { nome: 'Juízo Final', slug: 'juizo-final', definicao: 'O julgamento final de Deus sobre toda a humanidade diante do Grande Trono Branco, onde os justos herdarão a vida eterna e os ímpios receberão a condenação eterna.', passagens: ['Mt 25:31-46', 'Ap 20:11-15', '2 Co 5:10'], categoria: 'Escatologia', tradicoes: 'Reformada: Juízo baseado em obras como evidência de fé. Católica: Juízo particular antes do geral. Evangélica: Juízo das nações e dos indivíduos.' },
  { nome: 'Céu e Inferno', slug: 'ceu-e-inferno', definicao: 'O céu é a habitação eterna dos redimidos em comunhão com Deus; o inferno é o lugar de tormento eterno para os ímpios e rebeldes que rejeitaram a Deus.', passagens: ['Mt 25:46', 'Ap 21:1-4', 'Mc 9:43-48'], categoria: 'Escatologia', tradicoes: 'Reformada: Céu e inferno como destinos eternos. Católica: Céu, inferno e purgatório. Evangélica: Céu como presença de Deus, inferno como separação eterna.' },
  { nome: 'Milênio', slug: 'milenio', definicao: 'Reino de mil anos de Cristo na terra, mencionado em Apocalipse 20, onde Satanás será preso e Cristo reinará com os santos ressuscitados antes do juízo final.', passagens: ['Ap 20:1-6', 'Is 11:1-9', 'Ap 20:4'], categoria: 'Escatologia', tradicoes: 'Reformada: Amilenismo (milênio espiritual presente). Dispensacionalista: Premilenismo literal. Pos-milenismo: Milênio como progresso do evangelho.' },
  { nome: 'Tribulação', slug: 'tribulacao', definicao: 'Período de sofrimento e perseguição profetizado nas Escrituras, marcado por guerras, fomes, pragas e grandes distúrbios antes da segunda vinda de Cristo.', passagens: ['Mt 24:21', 'Ap 7:14', 'Dn 12:1'], categoria: 'Escatologia', tradicoes: 'Reformada: Tribulação como período crescente de perseguição. Dispensacionalista: Grande Tribulação de 7 anos. Preterista: Tribulação cumprida na destruição de Jerusalém.' },
  { nome: 'Arrebatamento', slug: 'arrebatamento', definicao: 'A mudança súbita dos crentes vivos e mortos que encontrarão o Senhor nos ares, sendo transformados em corpos glorificados, encontrando-o na sua segunda vinda.', passagens: ['1 Ts 4:13-18', '1 Co 15:51-52', 'Fp 3:20-21'], categoria: 'Escatologia', tradicoes: 'Reformada: Arrebatamento na segunda vinda (não separado). Dispensacionalista: Arrebatamento secreto antes da tribulação. Pós-tribulação: Arrebatamento junto com a segunda vinda.' },
  { nome: 'Novos Céus e Nova Terra', slug: 'novos-ceus', definicao: 'A consumação final do plano redentor de Deus, onde toda a criação será renovada, livrada da maldição, e os redimidos habitarão eternamente com Deus.', passagens: ['Ap 21:1-5', 'Is 65:17', '2 Pe 3:13'], categoria: 'Escatologia', tradicoes: 'Reformada: Renovação total da criação. Dispensacionalista: Nova terra como reino millenar. Evangélica: Habitação eterna com Deus na nova criação.' },

  // ═══════════════════════════════════════════════════════════════════════
  // AS 5 SOLAS DA REFORMA
  // ═══════════════════════════════════════════════════════════════════════
  { nome: 'Sola Scriptura', slug: 'sola-scriptura', definicao: 'A Bíblia é a única autoridade infalível para fé e prática. A Escritura é suficiente, clara e o juiz final de toda doutrina, acima da tradição humana, do magistério e da experiência.', passagens: ['2 Tm 3:16-17', '2 Pe 1:20-21', 'Is 40:8'], categoria: 'Bibliologia', tradicoes: 'Reformada: Autoridade suprema da Escritura. Católica: Escritura e Tradição como fontes paralelas. Evangélica: Prima Scriptura — Bíblia como norma máxima. Luterana: Sola Scriptura como regra de fé.' },
  { nome: 'Sola Fide', slug: 'sola-fide', definicao: 'A justificação diante de Deus é recebida somente pela fé, sem obras de mérito. A fé é o meio pelo qual o crente se apropria da obra de Cristo, e não uma obra que contribui para a salvação.', passagens: ['Rm 3:28', 'Gl 2:16', 'Ef 2:8-9'], categoria: 'Soteriologia', tradicoes: 'Reformada: Fé como instrumento da justificação. Católica: Fé que opera pelo amor (fé + obras). Arminiana: Fé como resposta à graça preveniente. Luterana: Fé somente como meio da graça.' },
  { nome: 'Sola Gratia', slug: 'sola-gratia', definicao: 'A salvação é pela graça de Deus somente, um favor imerecido concedido soberanamente, sem mérito humano. Toda a obra redentora é iniciativa divina, não resposta humana.', passagens: ['Ef 2:8-9', 'Rm 5:15', 'Tt 2:11'], categoria: 'Soteriologia', tradicoes: 'Reformada: Graça soberana e irresistível. Católica: Graça santificante e meritória. Arminiana: Graça preveniente e resistível. Luterana: Graça mediante os meios de graça.' },
  { nome: 'Solus Christus', slug: 'solus-christus', definicao: 'Jesus Cristo é o único Mediador entre Deus e os homens. Sua obra na cruz é suficiente e completa para a salvação, sem necessidade de mediadores humanos, sacerdotes ou sacramentos.', passagens: ['1 Tm 2:5', 'Hb 4:14-16', 'At 4:12'], categoria: 'Cristologia', tradicoes: 'Reformada: Cristo como único Mediador. Católica: Mediação sacerdotal complementar. Evangélica: Cristo como único e suficiente Salvador. Luterana: Cristo presente nos meios de graça.' },
  { nome: 'Soli Deo Gloria', slug: 'soli-deo-gloria', definicao: 'A toda glória, honra e louvor são devidos somente a Deus. Toda a vida cristã, worship e missão existem para a glória de Deus, não para a glória humana.', passagens: ['Rm 11:36', '1 Co 10:31', 'Ef 3:21'], categoria: 'Teologia Proper', tradicoes: 'Reformada: Adoração centrada em Deus. Católica: Glória de Deus manifesta nos sacramentos. Evangélica: Adoração como resposta à graça. Luterana: Glória de Deus na proclamação da Palavra.' },

  // ═══════════════════════════════════════════════════════════════════════
  // LEI E EVANGELHO (TRADIÇÃO LUTERANA)
  // ═══════════════════════════════════════════════════════════════════════
  { nome: 'Lei e Evangelho', slug: 'lei-e-evangelho', definicao: 'Distinção fundamental na teologia luterana entre a Lei (mandamentos de Deus que revelam o pecado e condenam) e o Evangelho (a boa-nova de graça em Cristo que liberta e salva).', passagens: ['Rm 3:20', 'Rm 6:14', 'Gl 3:24', '2 Co 3:6'], categoria: 'Soteriologia', tradicoes: 'Luterana: Lei e Evangelho como Palavra de Deus em duas funções distintas. Reformada: Lei como guia de vida, não apenas condenadora. Católica: Distinção entre Lei moral e Lei cerimonial. Evangélica: Lei como espelho e Evangelho como solução.' },

  // ═══════════════════════════════════════════════════════════════════════
  // PACTOS / ALIANÇAS (TRADIÇÃO REFORMADA)
  // ═══════════════════════════════════════════════════════════════════════
  { nome: 'Pacto de Obras vs Pacto de Graça', slug: 'pacto-obras-graca', definicao: 'Na teologia do pacto, Deus estabeleceu um Pacto de Obras com Adão (obediência perfeita = vida) e um Pacto de Graça com os eleitos (fé em Cristo = salvação). O Pacto de Obras foi quebrado na queda.', passagens: ['Gn 2:16-17', 'Rm 5:12-21', 'Gl 3:10-14'], categoria: 'Teologia Bíblica', tradicoes: 'Reformada: Pacto de obras e pacto de graça. Luterana: Aliança da lei e aliança da promessa. Dispensacionalista: Dispensações distintas. Arminiana: Pacto condicional à fé.' },
  { nome: 'Alianças Bíblicas', slug: 'aliancas-biblicas', definicao: 'Deus estabeleceu alianças progressivas com a humanidade: Adâmica (Gn 3:15), Noica (Gn 9), Abraâmica (Gn 12), Mosaica (Ex 24), Davídica (2 Sm 7) e Nova (Jr 31 / Lc 22).', passagens: ['Gn 3:15', 'Gn 9:9', 'Gn 12:1-3', 'Ex 24:8', '2 Sm 7:16', 'Lc 22:20'], categoria: 'Teologia Bíblica', tradicoes: 'Reformada: Aliança da graça (aliança de obras e de graça). Dispensacionalista: Dispensações progressivas. Luterana: Promessa e cumprimento. Católica: Aliança cumprida na Igreja.' },

  // ═══════════════════════════════════════════════════════════════════════
  // TIPOLOGIA BÍBLICA
  // ═══════════════════════════════════════════════════════════════════════
  { nome: 'Tipologia Bíblica', slug: 'tipologia-biblica', definicao: 'Estudo das figuras (tipos) do Antigo Testamento que prefiguram Cristo e sua obra: Adão-Cristo (último Adão), Moisés-Cristo (mediador), Jonas (três dias no túmulo), sarça ardente (Deus que não é consumido), maná (pão da vida), tabernáculo (morada de Deus entre os homens).', passagens: ['Rm 5:14', '1 Co 15:45', 'Mt 12:40', 'Jo 6:35', 'Hb 8:5'], categoria: 'Teologia Bíblica', tradicoes: 'Reformada: Tipologia como chave hermenêutica. Católica: Tipologia + alegoria (Quadriga). Luterana: Tipologia como promessa-cumprimento. Evangélica: Tipologia como evidência do desígnio divino.' },

  // ═══════════════════════════════════════════════════════════════════════
  // MODELOS DE EXPIAÇÃO
  // ═══════════════════════════════════════════════════════════════════════
  { nome: 'Substituição Penal', slug: 'substituicao-penal', definicao: 'Cristo, em nosso lugar, sofreu o castigo que merecíamos, satisfazendo plenamente a justiça de Deus. O pecado foi imputado a Cristo, e sua justiça é imputada ao crente.', passagens: ['Is 53:5-6', 'Rm 3:25-26', '2 Co 5:21', '1 Pe 3:18'], categoria: 'Soteriologia', tradicoes: 'Reformada: Penal substitutiva como modelo central. Luterana: Substituição vicária. Católica: Reconhece substituição mas enfatiza reparação. Arminiana: Substituição suficiente para todos.' },
  { nome: 'Satisfação (Anselmo)', slug: 'satisfacao-anselmo', definicao: 'A honra de Deus foi desontrada pelo pecado humano e exigia satisfação. Cristo, como Deus-homem, ofereceu satisfação perfeita e superabundante pela ofensa cometida contra a majestade divina.', passagens: ['Hb 2:17', 'Col 1:20', 'Rm 3:25'], categoria: 'Soteriologia', tradicoes: 'Reformada: Satisfação vicária (Calvino aprimorou). Católica: Satisfação como reparação. Luterana: Substituição vicária. Evangélica: Satisfação como base da justificação.' },
  { nome: 'Influência Moral (Abelardo)', slug: 'influencia-moral', definicao: 'A morte de Cristo nos moved a amar Deus e a nos arrepender. O valor da cruz está no exemplo de amor sacrificial que transforma o coração do crente, não em satisfação jurídica.', passagens: ['Jo 15:13', '1 Jo 4:19', 'Rm 5:8'], categoria: 'Soteriologia', tradicoes: 'Reformada: Rejeita como insuficiente. Católica: Reconhece o aspecto exemplar. Arminiana: Complementa a satisfação com a influência moral. Evangélica: Modelo paralelo ao substitutionary atonement.' },
  { nome: 'Christus Victor (Aulén)', slug: 'christus-victor', definicao: 'Cristo venceu Satanás, o pecado e a morte na cruz e na ressurreição. A expiação é uma vitória cósmica do Deus guerreiro que liberta a humanidade da escravidão espiritual.', passagens: ['Cl 2:15', 'Hb 2:14-15', '1 Jo 3:8', 'Ef 6:12'], categoria: 'Soteriologia', tradicoes: 'Reformada: Reconhece o aspecto de vitória. Católica: Modelo predominante na patrística. Evangélica: Modelo crescentemente reconhecido. Luterana: Cristo como conquistador do diabo.' },
  { nome: 'Governamental (Grotius)', slug: 'governamental', definicao: 'Cristo sustentou o castigo comoGovernador do universo para demonstrar que Deus leva o pecado a sério, mantendo a ordem moral sem necessidade de satisfação plena.', passagens: ['Rm 3:25-26', '1 Jo 2:2'], categoria: 'Soteriologia', tradicoes: 'Reformada: Rejeita como insuficiente. Católica: Não adota formalmente. Arminiana: Modelo aceitável. Evangélica: Complementar ao modelo penal.' },
  { nome: 'Kenótica', slug: 'kenotica', definicao: 'Cristo, na encarnação, esvaziou-se de sua glória divina (Fp 2:7) para viver como homem e morrer pela humanidade. A expiação é fruto da humilhação voluntária do Filho de Deus.', passagens: ['Fp 2:5-8', 'Mc 15:34', 'Hb 2:9'], categoria: 'Soteriologia', tradicoes: 'Reformada: Reconhece a humilhação como meio. Católica: A kenose não anula a divindade. Evangélica: Modelo complementar. Luterana: Distinção entre estado de humilhação e exaltação.' },

  // ═══════════════════════════════════════════════════════════════════════
  // INSPIRAÇÃO BÍBLICA (EXPANDIDA)
  // ═══════════════════════════════════════════════════════════════════════
  { nome: 'Inspiração Verbal Plenária', slug: 'inspiracao-verbal-plenaria', definicao: 'Cada palavra das Escrituras foi inspirada por Deus (theopneustos). A inspiração se estende não apenas ao pensamento, mas às próprias palavras dos autores, resultando em inerrância total no original autógrafo.', passagens: ['2 Tm 3:16', '2 Pe 1:21', '1 Co 2:13'], categoria: 'Bibliologia', tradicoes: 'Reformada: Inspiração verbal plenária e inerrância. Evangélica: Inspiração plenária com inerrância. Católica: Inspiração plenária com tradição. Liberal: Inspiração dinâmica (conceito geral). Luterana: Inspiração que garante a verdade em fé e costumes.' },
  { nome: 'Inspiração Dinâmica', slug: 'inspiracao-dinamica', definicao: 'Deus inspirou os autores bíblicos de forma que o pensamento central é divino, mas as palavras e formas literárias refletem a personalidade e cultura humana dos autores. A Bíblia contém a mensagem de Deus, mas não é literalmente a palavra de Deus em cada detalhe.', passagens: ['2 Tm 3:16', '1 Co 1:17'], categoria: 'Bibliologia', tradicoes: 'Liberal: Inspiração como guia espiritual. Católica: Inspiração dinâmica compatível com tradição. Evangélica: Rejeita como insuficiente. Reformada: Inspiração verbal como padrão bíblico.' },

  // ═══════════════════════════════════════════════════════════════════════
  // HERMENÊUTICA
  // ═══════════════════════════════════════════════════════════════════════
  { nome: 'Hermenêutica', slug: 'hermeneutica', definicao: 'Estudo dos princípios de interpretação bíblica. Inclui: Quadriga (literal, alegórico, moral, anagógico — medieval); Histórico-Gramatical (contexto original); Canônico (escritura interpreta escritura); Redencional-Histórico (história da salvação).', passagens: ['Lc 24:27', '2 Pe 1:20-21', '1 Co 2:12-14'], categoria: 'Bibliologia', tradicoes: 'Católica: Quadriga (sentidos da Escritura). Reformada: Histórico-gramatical e canônico. Evangélica: Histórico-gramatical como padrão. Luterana: Histórico-gramatical com ênfase em Lei e Evangelho.' },

  // ═══════════════════════════════════════════════════════════════════════
  // PNEUMATOLOGIA EXPANDIDA
  // ═══════════════════════════════════════════════════════════════════════
  { nome: 'Batismo no Espírito Santo', slug: 'batismo-espirito-santo', definicao: 'Experiência de ser imerso no Espírito Santo, frequentemente associada com o recebimento de dons carismáticos, poder para testemunho e uma vida transformada. Pode ser simultâneo com a conversão ou subsequente.', passagens: ['At 1:5', 'At 2:1-4', 'At 8:14-17', 'At 19:1-6'], categoria: 'Pneumatologia', tradicoes: 'Pentecostal: Batismo no Espírito com dons sobrenaturais como evidência. Carismática: Batismo como experiência posterior. Reformada: Batismo no Espírito na conversão. Luterana: Espírito atua mediante Palavra e sacramentos.' },
  { nome: 'Cessacionismo vs Continuísmo', slug: 'cessacionismo-continuismo', definicao: 'Cessacionismo: dons miraculosos (profecia, línguas, curas) cessaram com a morte dos apóstolos. Continuísmo: todos os dons do Espírito continuam operando até hoje para edificação da igreja.', passagens: ['1 Co 12:4-11', 'Ef 4:11-13', 'He 2:3-4'], categoria: 'Pneumatologia', tradicoes: 'Reformada: Cessacionismo moderado (dons revelacionais cessaram). Pentecostal: Continuísmo radical (todos os dons persistem). Evangélica: Continuísmo moderado. Católica: Continuísmo litúrgico.' },

  // ═══════════════════════════════════════════════════════════════════════
  // ECCLESIOLOGIA EXPANDIDA
  // ═══════════════════════════════════════════════════════════════════════
  { nome: 'Ofícios da Igreja', slug: 'oficios-da-igreja', definicao: 'Deus estabeleceu ofícios para governar e equipar a igreja: bispos/episcopais, presbíteros/anciãos, diáconos, evangelistas, mestres e pastores. A natureza e continuidade desses ofícios varia entre as tradições.', passagens: ['1 Tm 3:1-13', 'Ef 4:11-13', 'At 6:1-7'], categoria: 'Eclesiologia', tradicoes: 'Católica: Hierarquia papal (Papa, cardeais, bispos, presbíteros, diáconos). Reformada: Presbíteros e diáconos. Batista: Pastor e diáconos. Luterana: Pastores e diáconos. Pentecostal: Pastores, evangelistas eMissionários.' },
  { nome: 'Governo Eclesiástico', slug: 'governo-eclesiastico', definicao: 'Organização e autoridade na igreja: Episcopaliano (bispado — bispo tem autoridade suprema), Presbiteriano (anciãos governam coletivamente), Congregacional (cada igreja é autônoma), e Anglicano (via do meio entre episcopal e presbiteriano).', passagens: ['At 14:23', 'At 20:28', 'Tt 1:5'], categoria: 'Eclesiologia', tradicoes: 'Católica: Episcopal (Papa como autoridade suprema). Presbiteriana: Governo por sessões. Batista: Congregacional democrático. Anglicana: Via do meio. Luterana: Episcopal moderado.' },

  // ═══════════════════════════════════════════════════════════════════════
  // ESCATOLOGIA COMPLETA
  // ═══════════════════════════════════════════════════════════════════════
  { nome: 'Amilenismo', slug: 'amilenismo', definicao: 'O milênio de Apocalipse 20 é simbólico, representando o período entre a primeira e segunda vinda de Cristo, quando o reino de Deus opera espiritualmente na história. Satanás está limitado, e Cristo reina na Igreja.', passagens: ['Ap 20:1-6', 'Jo 18:36', 'Rm 14:17'], categoria: 'Escatologia', tradicoes: 'Reformada: Amilenismo como posição predominante. Católica: Amilenismo histórico. Luterana: Amilenismo com pressupostos. Evangélica: Posição de minorities influente.' },
  { nome: 'Pré-milenismo', slug: 'pre-milenismo', definicao: 'Cristo voltará antes do milênio (Ap 20:1-6), estabelecendo um reino literal de mil anos na terra com os santos ressuscitados. Satanás será preso durante o milênio.', passagens: ['Ap 20:1-6', 'Is 11:1-9', 'Zc 14:9'], categoria: 'Escatologia', tradicoes: 'Dispensacionalista: Pré-milenismo dispensacional (arrebatamento antes da tribulação). Histórico: Pré-milenismo histórico (sem arrebatamento secreto). Católica: Rejeita o pré-milenismo. Evangélica: Crescente aceitação.' },
  { nome: 'Pós-milenismo', slug: 'pos-milenismo', definicao: 'O milênio será inaugurado gradualmente pela pregação do evangelho e a transformação da sociedade. Após um período de progresso cristão, Cristo voltará para o juízo final.', passagens: ['Mt 24:14', 'Sl 22:27-28', 'Is 11:9'], categoria: 'Escatologia', tradicoes: 'Reformada: Pós-milenismo como posição minoritária (Jonathan Edwards). Católica: Pós-milenismo implícito em algumas visões. Liberal: Progresso social como reino. Evangélica: Posição rara hoje.' },
  { nome: 'Dispensacionalismo', slug: 'dispensacionalismo', definicao: 'Deus administra a relação com a humanidade em dispensações (períodos) distintas, com diferentes responsabilidades. Israel e a Igreja são entidades separadas com papéis distintos no plano redentor.', passagens: ['Ef 3:1-6', 'Dn 2', 'Rm 11:25-26'], categoria: 'Escatologia', tradicoes: 'Dispensacionalista: Israel e Igreja separados. Reformada: Rejeita separação Israel-Igreja. Católica: Igreja como continuação de Israel. Evangélica: Dispensacionalismo progressivo.' },
  { nome: 'Préterismo', slug: 'preterismo', definicao: 'A maioria das profecias do NT (Mateus 24, Apocalipse) foi cumprida na destruição de Jerusalém em 70 d.C. O reino de Deus se expandiu historicamente, e Cristo governa espiritualmente.', passagens: ['Mt 24:34', 'Lc 21:20-24', 'Dn 9:26-27'], categoria: 'Escatologia', tradicoes: 'Reformada: Préterismo parcial (的部分 profecias cumpridas). Católica: Alguns elementos préteristas. Dispensacionalista: Rejeita préterismo. Evangélica: Posição crescente.' },

  // ═══════════════════════════════════════════════════════════════════════
  // TEOLOGIA LATINO-AMERICANA
  // ═══════════════════════════════════════════════════════════════════════
  { nome: 'Teologia da Libertação', slug: 'teologia-da-libertacao', definicao: 'Teologia que parte da experiência de opressão dos pobres e luta pela justiça social como dimensão central do Evangelho. Deus se identifica com os oprimidos e a Igreja deve ser instrumento de libertação.', passagens: ['Lc 4:18-19', 'Mt 25:31-46', 'Is 61:1-2'], categoria: 'Teologia Sistemática', tradicoes: 'Católica: Gutiérrez, Boff, Romero — opção pelos pobres. Reformada: Míguez Bonino — missão integral. Evangélica: Escobar, Padilla — missão integral evangélica. Liberal: Secularização da teologia.' },

  // ═══════════════════════════════════════════════════════════════════════
  // APOLOGÉTICA
  // ═══════════════════════════════════════════════════════════════════════
  { nome: 'Apologética', slug: 'apologetica', definicao: 'Defesa racional da fé cristã contra objeções e alternativas. Inclui: Argumento Cosmológico (Craig — causa primeira), Argumento Moral (Lewis — bases morais), Argumento dos Marcos do Desígnio (Kreeft), Argumento Ontológico (Plantinga).', passagens: ['1 Pe 3:15', 'At 17:22-34', 'Rm 1:20'], categoria: 'Apologetica', tradicoes: 'Evangélica: Apologética evidencialista (Craig, Plantinga). Católica: Apologética tomista (Kreeft, Feser). Anglicana: Apologética literária (Lewis). Reformada: Presuposicionalismo (Van Til). Luterana: Apologética existencial.' },
];

export interface PersonagemBiblico {
  nome: string;
  nomeHebraico?: string;
  nomeGrego?: string;
  significado: string;
  resumo: string;
  testamento: 'AT' | 'NT';
}

export const personagens: PersonagemBiblico[] = [
  // ── ANTIGO TESTAMENTO ──────────────────────────────────────────────
  // Gênesis
  { nome: 'Adão', nomeHebraico: 'אָדָם (Adam)', significado: 'Homem, terra vermelha', resumo: 'Primeiro homem criado por Deus do pó da terra. Colocado no jardim do Éden para guardá-lo e cultivá-lo. Pecou ao comer do fruto proibido, trazendo a queda e a morte para a humanidade. Pai de Caim, Abel e Sete.', testamento: 'AT' },
  { nome: 'Eva', nomeHebraico: 'חַוָּה (Chavvah)', significado: 'Vida, mãe de todos os viventes', resumo: 'Primeira mulher, criada de uma costela de Adão. Seduzida pela serpente a comer do fruto proibido. Compartilhou a transgressão com Adão, resultando na expulsão do Éden. Mãe de Caim, Abel e Sete.', testamento: 'AT' },
  { nome: 'Caim', nomeHebraico: 'קַיִן (Qayin)', significado: 'Forjado, adquirido', resumo: 'Filho primogênito de Adão e Eva. Ofereceu sacrifício a Deus que não foi aceito. Tornou-se o primeiro assassino ao matar seu irmão Abel. Marcado por Deus para não ser morto. Fundou a primeira cidade.', testamento: 'AT' },
  { nome: 'Abel', nomeHebraico: 'הֶבֶל (Hevel)', significado: 'Vapor, suave', resumo: 'Segundo filho de Adão e Eva. Pastor de ovelhas. Seu sacrifício foi aceito por Deus, ao contrário do de Caim. Morto por seu irmão por inveja. Sua voz clama da terra pela justiça divina.', testamento: 'AT' },
  { nome: 'Sete', nomeHebraico: 'שֵׁת (Shet)', significado: 'Apontado, dado', resumo: 'Terceiro filho de Adão e Eva, nascido após a morte de Abel. Considerado substituto de Abel. Pai de Enos. Por meio de sua linhagem a promessa messiânica foi preservada até Noé.', testamento: 'AT' },
  { nome: 'Enoque', nomeHebraico: 'חֲנוֹךְ (Chanokh)', significado: 'Iniciado, dedicado', resumo: 'Filho de Sete e pai de Matusalém. Caminhou com Deus por 365 anos. Não viu a morte, pois Deus o transportou para o céu. Um dos poucos bíblicos que não experimentaram a morte terrena.', testamento: 'AT' },
  { nome: 'Noé', nomeHebraico: 'נֹחַ (Noach)', significado: 'Descanso, consolo', resumo: 'Justo e íntegro em sua geração. Construiu a arca por ordem de Deus para sobreviver ao dilúvio universal. Pai de Sem, Cam e Jafé. Depois do dilúvio, plantou uma vinha e renovou a aliança com Deus.', testamento: 'AT' },
  { nome: 'Sem', nomeHebraico: 'שֵׁם (Shem)', significado: 'Nome, fama', resumo: 'Filho mais velho de Noé. Progenitor das nações semitas. Abrangendo os hebreus, assírios e outros povos do Oriente Médio. Recebeu a bênção de Noé sobre seus irmãos.', testamento: 'AT' },
  { nome: 'Cam', nomeHebraico: 'חָם (Cham)', significado: 'Quente, ardente', resumo: 'Filho do meio de Noé. Viu a nudez de seu pai e contou aos irmãos, sendo amaldiçoado. Pai de Canaã. Progenitor dos cananeus, egípcios e outros povos africanos e do Oriente Próximo.', testamento: 'AT' },
  { nome: 'Jafé', nomeHebraico: 'יֶפֶת (Yefet)', significado: 'Extensão, beleza', resumo: 'Filho mais novo de Noé. Cobriu a nudez do pai com seus irmãos. Progenitor dos povos europeus e de parte dos asiáticos. Recebeu bênção de expansão territorial.', testamento: 'AT' },
  { nome: 'Lameque', nomeHebraico: 'לָמֶךְ (Lemech)', significado: 'Poderoso', resumo: 'Pai de Noé. Descendente de Sete. Vivendo 777 anos. Profetizou que o filho Noé traria alívio do trabalho árduo causado pela maldição da terra.', testamento: 'AT' },
  { nome: 'Abraão', nomeHebraico: 'אַבְרָהָם (Avraham)', significado: 'Pai de multidões', resumo: 'Pai da fé. Chamado por Deus para sair de Ur e ir à terra de Canaã. Pai de Isaque. Intercedeu por Sodoma. Teste de fé em Moriá.', testamento: 'AT' },
  { nome: 'Sara', nomeHebraico: 'שָׂרָה (Sarah)', significado: 'Princesa', resumo: 'Esposa de Abraão. Mãe de Isaque na velhice. Exemplo de fé e submissão. Sua risada de incredulidade tornou-se alegria.', testamento: 'AT' },
  { nome: 'Isaque', nomeHebraico: 'יִצְחָק (Yitzhak)', significado: 'Ele rirá', resumo: 'Filho da promessa. Quase sacrificado por Abraão. Casou-se com Rebeca. Pai de Jacó e Esaú. Viveu como peregrino em Gerar.', testamento: 'AT' },
  { nome: 'Rebeca', nomeHebraico: 'רִבְקָה (Rivqah)', significado: 'Laço, encanto', resumo: 'Esposa de Isaque e mãe de Jacó e Esaú. Escolheu Jacó para receber a bênção primogenitura. Ensinou engano a Isaque para favorecer Jacó. Nunca mais viu o filho.', testamento: 'AT' },
  { nome: 'Jacó', nomeHebraico: 'יַעֲקֹב (Yaakov)', significado: 'Aquele que segura o calcanhar', resumo: 'Enganou Esaú e Isaque. Lutou com Deus e recebeu o nome Israel. Pai das 12 tribos. Teve sonho da escada celestial.', testamento: 'AT' },
  { nome: 'Raquel', nomeHebraico: 'רָחֵל (Rachel)', significado: 'Ovelha', resumo: 'Esposa amada de Jacó. Mãe de José e Benjamim. Serviu por 14 anos para casar com Jacó. Morreu ao dar à luz Benjamim. Seu túmulo fica perto de Belém.', testamento: 'AT' },
  { nome: 'Lea', nomeHebraico: 'לֵאָה (Leah)', significado: 'Cansada, fraca', resumo: 'Primeira esposa de Jacó, irmã mais velha de Raquel. Mãe de seis filhos de Jacó: Rúben, Simeão, Levi, Judá, Issacar e Zebulom. Foi preferida a Raquel por sua fertilidade.', testamento: 'AT' },
  { nome: 'José do Egito', nomeHebraico: 'יוֹסֵף (Yosef)', significado: 'Ele acrescentará', resumo: 'Filho de Jacó. Vendido como escravo. Interpretou sonhos no Egito. Tornou-se governador. Perdoou seus irmãos.', testamento: 'AT' },
  { nome: 'Judá', nomeHebraico: 'יְהוּדָה (Yehudah)', significado: 'Louvado, ação de graças', resumo: 'Quarto filho de Jacó e Lea. Propôs vender José. Pai de Perez e Zerah. Da sua linhagem veio o Messias. Ofereceu-se como fiador por Benjamim.', testamento: 'AT' },
  { nome: 'Benjamim', nomeHebraico: 'בִּנְיָמִין (Binyamin)', significado: 'Filho da minha direita', resumo: 'Filho mais novo de Jacó e Raquel. Irmão favorito de José. Pai das doze tribos. No NT, o apóstolo Paulo era da tribo de Benjamim.', testamento: 'AT' },

  // Êxodo-Levítico
  { nome: 'Moisés', nomeHebraico: 'מֹשֶׁה (Moshe)', significado: 'Tirado das águas', resumo: 'Libertador de Israel do Egito. Recebedor da Lei no Sinai. Líder do Êxodo por 40 anos no deserto. Não entrou na terra prometida.', testamento: 'AT' },
  { nome: 'Miriam', nomeHebraico: 'מִרְיָם (Miryam)', significado: 'Amargura, rebelde', resumo: 'Irmã mais velha de Moisés e Aarão. Profetisa que conduziu as mulheres a celebrar a travessia do Mar Vermelho. Castigada com lepra por falar contra Moisés. Morreu no deserto.', testamento: 'AT' },
  { nome: 'Aarão', nomeHebraico: 'אַהֲרֹן (Aharon)', significado: 'Iluminado', resumo: 'Irmão de Moisés. Primeiro sumo sacerdote de Israel. Fez o bezerro de ouro. Intercedeu pelo povo.', testamento: 'AT' },
  { nome: 'Calebe', nomeHebraico: 'כָּלֵב (Kalev)', significado: 'Cão, fiel', resumo: 'Um dos dois espias fiéis que trouxeram relatório positivo sobre Canaã. Com Josué, herdou território em Hebrom. Exemplo de fé inabalável aos 85 anos.', testamento: 'AT' },
  { nome: 'Fineias', nomeHebraico: 'פִּינְחָס (Pinchas)', significado: 'Boca de bronze', resumo: 'Neto de Aarão. Matou um israelita e uma midianita em ato zeloso contra a imoralidade. Deteve a praga que matava Israel. Recebeu aliança de sacerdócio perpétuo.', testamento: 'AT' },

  // Juízes-Reis
  { nome: 'Débora', nomeHebraico: 'דְּבוֹרָה (Devorah)', significado: 'Abelha', resumo: 'Juíza e profetisa de Israel. Conduziu Baraque contra Jabim, rei de Canaã. Cantou o cântico de vitória após a batalha. Uma das poucas mulheres juízes de Israel.', testamento: 'AT' },
  { nome: 'Gideão', nomeHebraico: 'גִּדְעוֹן (Gid\'on)', significado: 'Derrubador, cortador', resumo: 'Juiz de Israel. Reduziu seu exército de 32 mil para 300. Derrotou os midianitas com tochas e trombetas. Recusou reinar sobre Israel.', testamento: 'AT' },
  { nome: 'Jefté', nomeHebraico: 'יִפְתָּח (Yiftach)', significado: 'Ele abrirá', resumo: 'Juiz de Israel. Filho ilegítimo rejeitado pelos irmãos. Venceu os amonitas. Fez voto imprudente que custou a vida de sua filha. Lutou contra Efraim.', testamento: 'AT' },
  { nome: 'Saul', nomeHebraico: 'שָׁאוּל (Sha\'ul)', significado: 'Desejado, pedido', resumo: 'Primeiro rei de Israel. Ungido por Samuel. Derrotou os amonitas. Desobedeceu a Deus, perdendo o reino. Perseguiu Davi. Consultou uma médium e morreu na batalha.', testamento: 'AT' },
  { nome: 'Davi', nomeHebraico: 'דָּוִד (Dawid)', significado: 'Amado', resumo: 'Rei de Israel depois de Saul. Homem segundo o coração de Deus. Matou Golias. Escreveu muitos Salmos. Pai de Salomão.', testamento: 'AT' },
  { nome: 'Salomão', nomeHebraico: 'שְׁלֹמֹה (Shlomo)', significado: 'Paz', resumo: 'Filho de Davi. Construiu o Templo de Jerusalém. Sábio e rico. Escreveu Provérbios, Eclesiastes e Cantares.', testamento: 'AT' },
  { nome: 'Roboão', nomeHebraico: 'רְחַבְעָם (Rechav\'am)', significado: 'O povo é grande', resumo: 'Filho de Salomão. Primeiro rei de Judá após a divisão do reino. Recusou aliviar o jugo pesado, causando cisma. Reinou sobre as duas tribos do sul.', testamento: 'AT' },
  { nome: 'Acabe', nomeHebraico: 'אַחְאָב (Ach\'av)', significado: 'Irmão do pai', resumo: 'Rei de Israel. Casou-se com Jezabel, princesa fenícia. Promoveu a adoração de Baal. Confrontado por Elias. Morreu em batalha contra Aram.', testamento: 'AT' },
  { nome: 'Jezabel', nomeHebraico: 'יִזֶּבֶל (Izevel)', significado: 'Onde está o príncipe?', resumo: 'Esposa de Acabe. Rainha de Israel. Promoveu a adoração de Baal e perseguiu os profetas do SENHOR. Convenceu Acabe a roumar a vinha de Nabote. Morreu arrojada da janela.', testamento: 'AT' },
  { nome: 'Eliseu', nomeHebraico: 'אֱלִישָׁע (Elisha)', significado: 'Deus é salvação', resumo: 'Sucessor de Elias. Recebeu o dobro de sua graça. Realizou muitos milagres: curou Naemã, multiplicou óleo. Profetizou vitórias de Israel. Sua tumba ressuscitou um morto.', testamento: 'AT' },
  { nome: 'Jonas', nomeHebraico: 'יוֹנָה (Yonah)', significado: 'Pomba', resumo: 'Profeta que fugiu da chamada de Deus. Engolido por um grande peixe durante três dias. Pregou arrependimento a Nínive. Irmão do profeta Amós. Relato tipológico de Cristo.', testamento: 'AT' },
  { nome: 'Naemã', nomeHebraico: 'נַעֲמָן (Na\'aman)', significado: 'Agradável', resumo: 'Comandante do exército da Síria. Leproso curado por ordem de Eliseu. Gentio que reconheceu o Deus de Israel. Pediu perdão por ter de se curvar no templo de Rimom.', testamento: 'AT' },

  // Profetas
  { nome: 'Isaías', nomeHebraico: 'יְשַׁעְיָהוּ (Yeshayahu)', significado: 'O SENHOR é salvação', resumo: 'Maior profeta do AT. Profetizou sobre o Messias. Chamado ao ministério com visão do trono de Deus.', testamento: 'AT' },
  { nome: 'Jeremias', nomeHebraico: 'יִרְמְיָהוּ (Yirmeyahu)', significado: 'Exaltado pelo SENHOR', resumo: 'Profeta das lágrimas. Anunciou o juízo de Deus sobre Judá. Profetizou a nova aliança. Sofreu perseguição.', testamento: 'AT' },
  { nome: 'Ezequiel', nomeHebraico: 'יְחֶזְקֵאל (Yechezkel)', significado: 'Deus fortalece', resumo: 'Profeta exilado na Babilônia. Teve visão do trono de Deus com as criaturas viventes. Profetizou a destruição de Jerusalém e a restauração de Israel. Ossos secos viverão novamente.', testamento: 'AT' },
  { nome: 'Daniel', nomeHebraico: 'דָּנִיֵּאל (Daniyel)', significado: 'Deus é meu juiz', resumo: 'Profeta no exílio babilônico. Interpretou sonhos de Nabucodonosor. Lançado na cova dos leões. Teve visões apocalípticas.', testamento: 'AT' },
  { nome: 'Oséias', nomeHebraico: 'הוֹשֵׁעַ (Hoshea)', significado: 'Salvação', resumo: 'Profeta que casou com uma prostituta, simbolizando a infidelidade de Israel a Deus. Profetizou o amor infiel de Deus e a restauração final do povo.', testamento: 'AT' },
  { nome: 'Amós', nomeHebraico: 'עָמוֹס (Amos)', significado: 'Cargueiro', resumo: 'Pastor e catador de frutas silvestres. Profetizou contra a injustiça social e a religiosidade vazia de Israel. Enviado ao reino do norte. Autor do livro mais antigo do AT.', testamento: 'AT' },
  { nome: 'Miquéias', nomeHebraico: 'מִיכָיָהוּ (Mikhayahu)', significado: 'Quem é como Deus?', resumo: 'Profeta de Morasti. Anunciou a destruição de Samaria e Jerusalém. Profetizou o nascimento do Messias em Belém. Confrontou os falsos profetas.', testamento: 'AT' },
  { nome: 'Habacuque', nomeHebraico: 'חֲבַקּוּק (Chavaqquq)', significado: 'Abraço, acariciar', resumo: 'Profeta que questionou Deus sobre a injustiça. Recebeu resposta de que os justos viverão pela fé. Confrontou a opressão dos pobres.', testamento: 'AT' },
  { nome: 'Ageu', nomeHebraico: 'חָגַי (Chagay)', significado: 'Festivo, peregrino', resumo: 'Profeta pós-exílio que motivou a reconstrução do Templo de Jerusalém. Anunciou que a glória do segundo Templo seria maior que a do primeiro.', testamento: 'AT' },
  { nome: 'Zacarias', nomeHebraico: 'זְכַרְיָה (Zekharyah)', significado: 'O SENHOR lembra', resumo: 'Profeta pós-exílio. Pai de João Batista. Anunciou o nascimento de João e a vinda do Messias. Teve visões simbólicas.martírio mencionado em Lucas.', testamento: 'AT' },
  { nome: 'Malaquias', nomeHebraico: 'מַלְאָכִי (Mal\'akhi)', significado: 'Meu mensageiro', resumo: 'Último profeta do AT. Denunciou a frieza religiosa de Israel. Profetizou a vinda do mensageiro da aliança (João Batista) e do dia do SENHOR.', testamento: 'AT' },

  // Pós-exílio
  { nome: 'Esdras', nomeHebraico: 'עֶזְרָא (Ezra)', significado: 'Auxílio', resumo: 'Escriba e sacerdote. Liderou o segundo grupo de retornados do exílio. Reformou o culto em Jerusalém. Leu a Lei publicamente e promoveu reformas religiosas.', testamento: 'AT' },
  { nome: 'Neemias', nomeHebraico: 'נְחֶמְיָה (Nechemyah)', significado: 'O SENHOR consola', resumo: 'Copeiro do rei persa. Reconstruiu os muros de Jerusalém em 52 dias. Promoveu reformas sociais e religiosas. Organizou a dedicação dos muros.', testamento: 'AT' },
  { nome: 'Mardoqueu', nomeHebraico: 'מָרְדֳּכַי (Mordokhai)', significado: 'Devotado a Marte', resumo: 'Primo e guardião de Ester. Serviu na corte persa. Descobriu conspiração contra o rei. Recusou se curvar a Hamã. Instruiu Ester a interceder pelo povo.', testamento: 'AT' },
  { nome: 'Jó', nomeHebraico: 'אִיּוֹב (Iyyov)', significado: 'Oprimido', resumo: 'Homem íntegro que sofreu perdas extremas. Manteve sua fé apesar do sofrimento. Restaurado duplamente por Deus.', testamento: 'AT' },

  // ── NOVO TESTAMENTO ────────────────────────────────────────────────
  // Evangelhos
  { nome: 'João Batista', nomeGrego: 'Ἰωάννης ὁ Βαπτιστής (Ioannes ho Baptistes)', significado: 'O SENHOR é gracioso', resumo: 'Precursor de Jesus. Batizou no Jordão. Chamou ao arrependimento. Batizou Jesus. Decapitado por Herodes.', testamento: 'NT' },
  { nome: 'Pedro', nomeGrego: 'Πέτρος / Σίμων Πέτρος (Petros / Simon Petros)', significado: 'Pedra, rocha', resumo: 'Apóstolo líder. Primeiro a confessar Cristo como Messias. Negou Jesus mas foi restaurado. Pregou no Pentecostes.', testamento: 'NT' },
  { nome: 'André', nomeGrego: 'Ἀνδρέας (Andreas)', significado: 'Varonil, masculino', resumo: 'Irmão de Pedro. Primeiro apóstolo chamado por Jesus. Trouxe Pedro a Cristo. Tradição diz que foi crucificado na Grécia.', testamento: 'NT' },
  { nome: 'Tiago', nomeGrego: 'Ἰάκωβος (Iakobos)', significado: 'Aquele que segura o calcanhar', resumo: 'Filho de Zebedeu e irmão de João. Primeiro apóstolo martirizado (At 12). Líder da igreja de Jerusalém. Escreveu a Epístola de Tiago.', testamento: 'NT' },
  { nome: 'Filipe', nomeGrego: 'Φίλιππος (Philippos)', significado: 'Amador de cavalos', resumo: 'Apóstolo originário de Betsaida. Trouxe Natanael a Jesus. Perguntou como alimentar 5000. Evangeliou um eunuco etíope.', testamento: 'NT' },
  { nome: 'Bartolomeu', nomeGrego: 'Βαρθολομαῖος (Bartholomaios)', significado: 'Filho de Talmai', resumo: 'Apóstolo frequentemente identificado com Natanael. Reconheceu Jesus como Filho de Deus. Tradição diz que foi martirizado na Armênia.', testamento: 'NT' },
  { nome: 'Tomé', nomeGrego: 'Θωμᾶς (Thomas)', significado: 'Gêmeo', resumo: 'Apóstolo conhecido como "Doubting Thomas". Precisou ver as marcas de Jesus para crer na ressurreição. Tradição diz que evangelizou a Índia.', testamento: 'NT' },
  { nome: 'Mateus', nomeGrego: 'Μαθθαῖος / Λευίς (Matthaios / Levis)', significado: 'Dádiva de Deus', resumo: 'Apóstolo e evangelista. Antigo cobrador de impostos. Escreveu o Evangelho de Mateus. Chamado por Jesus na praça de impostos.', testamento: 'NT' },
  { nome: 'Jaime', nomeGrego: 'Ἰάκωβος (Iakobos)', significado: 'Aquele que segura o calcanhar', resumo: 'Filho de Alfeu, irmão de Judas Tadeu. Diferente de Tiago, irmão de João. Um dos apóstolos menos mencionados. Presente na lista dos doze.', testamento: 'NT' },
  { nome: 'Tadeu', nomeGrego: 'Ἰούδας Ἰακώβου (Iudas Iakobou)', significado: 'Louvado', resumo: 'Também chamado Judas, filho de Tiago. Perguntou a Jesus como se revelaria ao mundo. Tradição identifica com Lebeu. Martirizado na Pérsia.', testamento: 'NT' },
  { nome: 'Simão', nomeGrego: 'Σίμων ὁ Καναναῖος (Simon ho Kananaios)', significado: 'Ouve, obedece', resumo: 'Apóstolo chamado Zelote. Antes da conversão, possivelmente membro dos zelotes políticos. Distingue-se de Pedro. Martirizado segundo a tradição.', testamento: 'NT' },
  { nome: 'Judas Iscariotes', nomeGrego: 'Ἰούδας Ἰσκαριώτης (Iudas Iskariotes)', significado: 'Homem de Kerioth', resumo: 'Apóstolo traidor. Entregou Jesus por 30 moedas de prata. Beijou Jesus como sinal de traição. Enforcou-se de remorso.', testamento: 'NT' },
  { nome: 'Lázaro', nomeGrego: 'Λάζαρος (Lazaros)', significado: 'Deus ajudou', resumo: 'Irmão de Maria e Marta. Morreu e foi ressuscitado por Jesus após quatro dias no túmulo. Sua ressurreição é um sinal messiânico em João 11.', testamento: 'NT' },
  { nome: 'Maria Madalena', nomeGrego: 'Μαριὰμ ἡ Μαγδαληνή (Maria he Magdalene)', significado: 'Amargura, rebelde', resumo: 'Seguidora de Jesus libertada de sete demônios. Presente na crucificação e ressurreição. Primeira testemunha da ressurreição. Enviada a anunciar aos discípulos.', testamento: 'NT' },
  { nome: 'Nicodemos', nomeGrego: 'Νικόδημος (Nikodemos)', significado: 'Vencedor do povo', resumo: 'Fariseu e membro do Sinédrio. Visitou Jesus de noite. Recebeu o ensino sobre o novo nascimento. Ajudou a sepultar Jesus com mirra e aloes.', testamento: 'NT' },
  { nome: 'Zaqueu', nomeGrego: 'Ζακχαῖος (Zakkaios)', significado: 'Puro, justo', resumo: 'Chefe dos publicanos de Jericó. Rico e odiado pelo povo. Subiu numa figueira para ver Jesus. Jesus o visitou em sua casa. Prometeu restituir quatro vezes mais.', testamento: 'NT' },
  { nome: 'Maria', nomeHebraico: 'מִרְיָם (Miryam)', significado: 'Amargura, rebeldia', resumo: 'Mãe de Jesus. Concebeu pelo Espírito Santo. Visitou Isabel. Presente na cruz. Modelo de fé e humildade.', testamento: 'NT' },
  { nome: 'José Carpinteiro', nomeHebraico: 'יוֹסֵף (Yosef)', significado: 'Ele acrescentará', resumo: 'Marido de Maria. Pai adotivo de Jesus. Carpinteiro de Nazaré. Justo e obediente. Fugiu com a família para o Egito.', testamento: 'NT' },
  { nome: 'João', nomeGrego: 'Ἰωάννης (Ioannes)', significado: 'O SENHOR é gracioso', resumo: 'Apóstolo amado de Jesus. Escreveu o Evangelho de João, 1-3 João e Apocalipse. Esteve na cruz com Maria.', testamento: 'NT' },

  // Atos
  { nome: 'Filipe, o Diácono', nomeGrego: 'Φίλιππος (Philippos)', significado: 'Amador de cavalos', resumo: 'Um dos sete diáconos escolhidos em Atos 6. Evangelizou em Samaria. Batizou o eunuco etíope. Levou a palavra a Cesaréia.', testamento: 'NT' },
  { nome: 'Barnabé', nomeGrego: 'Βαρναβᾶς (Barnabas)', significado: 'Filho da consolação', resumo: 'Levita de Chipre. Vendeu seus bens para a igreja. Acompanhou Paulo na primeira viagem missionária. Primo de Marcos. Desentendeu-se com Paulo mas depois reconciliaram-se.', testamento: 'NT' },
  { nome: 'Ananias de Damasco', nomeGrego: 'Ἀνανίας (Ananias)', significado: 'O SENHOR é gracioso', resumo: 'Discípulo em Damasco que curou a cegueira de Paulo. Batizou Saulo apesar do medo. Testemunhou a chamada de Paulo para ser apóstolo dos gentios.', testamento: 'NT' },
  { nome: 'Herodes Agripa', nomeGrego: 'Ἡρῴδης Ἀγρίππας (Herodes Agrippas)', significado: 'Cidade famosa', resumo: 'Neto de Herodes, o Grande. Perseguiu a igreja. Matou Tiago, irmão de João. Foi golpeado por um anjo e morreu devorado de vermes.', testamento: 'NT' },
  { nome: 'Sergio Paulo', nomeGrego: 'Σέργιος Παῦλος (Sergios Paulos)', significado: 'Grande, nobre', resumo: 'Procônsul romano de Chipre. Ouviu Paulo pregando. Creu no Senhor. O primeiro governante romano convertido mencionado no NT.', testamento: 'NT' },

  // Epístolas Paulinas
  { nome: 'Tito', nomeGrego: 'Τίτος (Titos)', significado: 'Honrado', resumo: 'Discípulo gentio de Paulo. Acompanhou Paulo no Concílio de Jerusalém. Deixado em Creta para organizar igrejas. Recebeu a Epístola a Tito.', testamento: 'NT' },
  { nome: 'Onesimo', nomeGrego: 'Ὀνήσιμος (Onesimos)', significado: 'Útil, proveitoso', resumo: 'Escravo que fugiu de Filemom e encontrou Paulo na prisão. Convertido por Paulo. Retornou ao seu senhor como irmão em Cristo. Tornou-se bispo de Efeso.', testamento: 'NT' },
  { nome: 'Filemom', nomeGrego: 'Φιλήμων (Philemon)', significado: 'Amável, afetuoso', resumo: 'Rico cristão de Colossos. Recebeu a carta de Paulo por Onesimo. Anfitrião da igreja em sua casa. Perdoou o escravo fugitivo como Paulo instruiu.', testamento: 'NT' },
  { nome: 'Priscila', nomeGrego: 'Πρίσκιλλα (Priskilla)', significado: 'Antiga, venerável', resumo: 'Esposa de Áquila. Junto com o marido, expôs a Apolos a fé cristã em Éfeso. Acolheu Paulo em Corinto. Tiveram igreja em sua casa. Mentionada seis vezes no NT.', testamento: 'NT' },
  { nome: 'Áquila', nomeGrego: 'Ἀκύλας (Akylas)', significado: 'Águia', resumo: 'Judeu-cristão fabricante de tendas. Expulso de Roma por Cláudio. Acolheu Paulo em Corinto. Trabalhou com Paulo em Éfeso. Mentionado em Romanos, 1 Coríntios, 2 Timóteo e Atos.', testamento: 'NT' },
  { nome: 'Apolos', nomeGrego: 'Ἀπολλῶς (Apollos)', significado: 'Dedicado a Apolo', resumo: 'Judeu de Alexandria. Eloquente e instruído nas Escrituras. Evangeliou na Judeia. Instruído por Priscila e Áquila. Causou divisões em Corinto por fidelidade a líderes humanos.', testamento: 'NT' },
  { nome: 'Epafrodito', nomeGrego: 'Ἐπαφρόδιτος (Epaphroditos)', significado: 'Agradável, belo', resumo: 'Membro da igreja de Filipos. Enviado para suprir as necessidades de Paulo na prisão. Doente quase até a morte. Paulo o envia de volta com a carta aos Filipenses.', testamento: 'NT' },

  // Outros
  { nome: 'Lucas', nomeGrego: 'Λουκᾶς (Loukas)', significado: 'Luminoso, iluminado', resumo: 'Médico e historiador. Escreveu o Evangelho de Lucas e Atos. Companheiro de Paulo. Gentio convertido.', testamento: 'NT' },
  { nome: 'Silas', nomeGrego: 'Σίλας (Silas)', significado: 'Floresta, madeira', resumo: 'Líder da igreja em Jerusalém. Acompanhou Paulo na segunda viagem missionária. Preso em Filipos. Instrumento de libertação para o carcereiro.', testamento: 'NT' },
  { nome: 'Timóteo', nomeGrego: 'Τιμόθεος (Timotheos)', significado: 'Honrado por Deus', resumo: 'Discípulo e filho na fé de Paulo. Pastor em Éfeso. Recebeu duas cartas de Paulo. Exemplo de fidelidade.', testamento: 'NT' },
  { nome: 'Marcos', nomeGrego: 'Μᾶρκος (Markos)', significado: 'Martelo, polido', resumo: 'Evangelista. Escreveu o Evangelho de Marcos. Acompanhou Paulo e Barnabé. Primo de Barnabé. Discípulo de Pedro.', testamento: 'NT' },
  { nome: 'Estêvão', nomeGrego: 'Στέφανος (Stephanos)', significado: 'Coroa, coroado', resumo: 'Primeiro mártir cristão. Um dos sete diáconos. Pregou diante do Sinédrio. Apedrejado com a presença de Saulo.', testamento: 'NT' },
  { nome: 'Judas Tiago', nomeGrego: 'Ἰούδας Ἰακώβου (Iudas Iakobou)', significado: 'Louvado', resumo: 'Também chamado Judas, irmão de Tiago. Autor da Epístola de Jude. Distingue-se de Judas Iscariotes. Um dos irmãos de Jesus mencionados.', testamento: 'NT' },
  { nome: 'Paulo', nomeGrego: 'Παῦλος (Paulos)', significado: 'Pequeno, humilde', resumo: 'Apóstolo dos gentios. Perseguiu a igreja antes da conversão. Escreveu 13 epístolas. Realizou três viagens missionárias.', testamento: 'NT' },
];

export interface EventoCronologia {
  ano: string;
  evento: string;
  referencia: string;
  tipo: 'criacao' | 'patriarca' | 'lei' | 'reis' | 'profeta' | 'exilio' | 'vinda' | 'igreja';
}

export const cronologia: EventoCronologia[] = [
  // ═══════════════════════════════════════════════════════════════════
  // CRIAÇÃO – PRIMEIRAS IDADES (~4000–2500 a.C.)
  // ═══════════════════════════════════════════════════════════════════
  { ano: '~4004 a.C.', evento: 'Criação dos céus e da terra', referencia: 'Gn 1-2', tipo: 'criacao' },
  { ano: '~4004 a.C.', evento: 'Formação de Adão e Eva e criação do Éden', referencia: 'Gn 2:7-25', tipo: 'criacao' },
  { ano: '~4004 a.C.', evento: 'Queda de Adão e Eva no Éden', referencia: 'Gn 3', tipo: 'criacao' },
  { ano: '~4004 a.C.', evento: 'Expulsão de Adão e Eva do Éden', referencia: 'Gn 3:23-24', tipo: 'criacao' },
  { ano: '~3975 a.C.', evento: 'Nascimento de Cain e Abel', referencia: 'Gn 4:1-2', tipo: 'criacao' },
  { ano: '~3975 a.C.', evento: 'Caim mata Abel e é amaldiçoado', referencia: 'Gn 4:8-12', tipo: 'criacao' },
  { ano: '~3975 a.C.', evento: 'Caim edifica a cidade de Enoque', referencia: 'Gn 4:17', tipo: 'criacao' },
  { ano: '~3875 a.C.', evento: 'Nascimento de Sete e início da linhagem fiel', referencia: 'Gn 4:25-26', tipo: 'criacao' },
  { ano: '~3875 a.C.', evento: 'Enos: início da invocação do nome do SENHOR', referencia: 'Gn 4:26', tipo: 'criacao' },
  { ano: '~3543 a.C.', evento: 'Enoque anda com Deus e é arrebatado', referencia: 'Gn 5:22-24', tipo: 'criacao' },
  { ano: '~3396 a.C.', evento: 'Lameque prediz o nascimento de Noé', referencia: 'Gn 5:28-29', tipo: 'criacao' },
  { ano: '~2500 a.C.', evento: 'Corrupção total da humanidade', referencia: 'Gn 6:5-7', tipo: 'criacao' },
  { ano: '~2500 a.C.', evento: 'Noé recebe instruções para a arca', referencia: 'Gn 6:13-22', tipo: 'criacao' },
  { ano: '~2500 a.C.', evento: 'Entrada na arca e início do Dilúvio', referencia: 'Gn 7:1-10', tipo: 'criacao' },
  { ano: '~2500 a.C.', evento: 'Dilúvio universal destrói toda a vida', referencia: 'Gn 7:11-24', tipo: 'criacao' },
  { ano: '~2500 a.C.', evento: 'Arca repousa sobre o Ararate', referencia: 'Gn 8:4', tipo: 'criacao' },
  { ano: '~2500 a.C.', evento: 'Noé oferece sacrifício e Deus faz aliança', referencia: 'Gn 8:20-22; 9:8-17', tipo: 'criacao' },
  { ano: '~2500 a.C.', evento: 'Arco-íris como sinal da aliança', referencia: 'Gn 9:12-17', tipo: 'criacao' },
  { ano: '~2500 a.C.', evento: 'Embriaguez de Noé e maldição de Canaã', referencia: 'Gn 9:20-27', tipo: 'criacao' },
  { ano: '~2300 a.C.', evento: 'Torre de Babel: dispersão das nações', referencia: 'Gn 11:1-9', tipo: 'criacao' },
  { ano: '~2300 a.C.', evento: 'Gerações de Sem, Cam e Jafé', referencia: 'Gn 10', tipo: 'criacao' },
  { ano: '~2242 a.C.', evento: 'Nascimento de Terá, pai de Abrão', referencia: 'Gn 11:26-32', tipo: 'criacao' },

  // ═══════════════════════════════════════════════════════════════════
  // PATRIARCAS (~2090–1700 a.C.)
  // ═══════════════════════════════════════════════════════════════════
  { ano: '~2090 a.C.', evento: 'Chamado de Abrão e promessa da aliança', referencia: 'Gn 12', tipo: 'patriarca' },
  { ano: '~2090 a.C.', evento: 'Fome leva Abrão ao Egito', referencia: 'Gn 12:10-20', tipo: 'patriarca' },
  { ano: '~2085 a.C.', evento: 'Separação de Abrão e Ló', referencia: 'Gn 13', tipo: 'patriarca' },
  { ano: '~2085 a.C.', evento: 'Abrão resgata Ló da captura (Rei de Sodoma)', referencia: 'Gn 14', tipo: 'patriarca' },
  { ano: '~2085 a.C.', evento: 'Aliança de Deus com Abrão (aliança das partes)', referencia: 'Gn 15', tipo: 'patriarca' },
  { ano: '~2083 a.C.', evento: 'Nascimento de Ismael, filho de Hagar', referencia: 'Gn 16', tipo: 'patriarca' },
  { ano: '~2080 a.C.', evento: 'Aliança da circuncisão', referencia: 'Gn 17', tipo: 'patriarca' },
  { ano: '~2080 a.C.', evento: 'Três anjos visitam Abrão; Sodoma condenada', referencia: 'Gn 18', tipo: 'patriarca' },
  { ano: '~2080 a.C.', evento: 'Destruição de Sodoma e Gomorra', referencia: 'Gn 19', tipo: 'patriarca' },
  { ano: '~2065 a.C.', evento: 'Nascimento de Isaque, filho da promessa', referencia: 'Gn 21:1-7', tipo: 'patriarca' },
  { ano: '~2065 a.C.', evento: 'Hagar e Ismael expulsos; anjo aparece no deserto', referencia: 'Gn 21:8-21', tipo: 'patriarca' },
  { ano: '~2050 a.C.', evento: 'Aliança de Beersheba entre Abrão e Abimeleque', referencia: 'Gn 21:22-34', tipo: 'patriarca' },
  { ano: '~2005 a.C.', evento: 'Sacrifício de Isaque no Moriá', referencia: 'Gn 22', tipo: 'patriarca' },
  { ano: '~1990 a.C.', evento: 'Morte de Sara e compra da caverna dos Patriarcas', referencia: 'Gn 23', tipo: 'patriarca' },
  { ano: '~1990 a.C.', evento: 'Servo de Abrão encontra Rebeca em Harã', referencia: 'Gn 24', tipo: 'patriarca' },
  { ano: '~1980 a.C.', evento: 'Nascimento de Esaú e Jacó (gêmeos)', referencia: 'Gn 25:19-26', tipo: 'patriarca' },
  { ano: '~1980 a.C.', evento: 'Venda do direito de primogenitura por Esaú', referencia: 'Gn 25:27-34', tipo: 'patriarca' },
  { ano: '~1960 a.C.', evento: 'Jacó rouba a bênção de Isaque', referencia: 'Gn 27', tipo: 'patriarca' },
  { ano: '~1960 a.C.', evento: 'Jacó foge para Harã; visão da escada', referencia: 'Gn 28:10-22', tipo: 'patriarca' },
  { ano: '~1960 a.C.', evento: 'Jacó trabalha para Labe e casa-se com Raquel e Lea', referencia: 'Gn 29-30', tipo: 'patriarca' },
  { ano: '~1940 a.C.', evento: 'Nascimento das doze tribos de Israel', referencia: 'Gn 29-30; 35:22-26', tipo: 'patriarca' },
  { ano: '~1940 a.C.', evento: 'Jacó foge de Labe; aliança no Monte Gileade', referencia: 'Gn 31', tipo: 'patriarca' },
  { ano: '~1940 a.C.', evento: 'Jacó luta com o anjo e recebe o nome Israel', referencia: 'Gn 32:22-32', tipo: 'patriarca' },
  { ano: '~1940 a.C.', evento: 'Reconciliação de Jacó e Esaú', referencia: 'Gn 33', tipo: 'patriarca' },
  { ano: '~1920 a.C.', evento: 'Violação de Dina e massacre de Siquém', referencia: 'Gn 34', tipo: 'patriarca' },
  { ano: '~1920 a.C.', evento: 'Morte de Débora (ama de Rebeca) em Betel', referencia: 'Gn 35:8', tipo: 'patriarca' },
  { ano: '~1906 a.C.', evento: 'José vendido como escravo pelos irmãos', referencia: 'Gn 37', tipo: 'patriarca' },
  { ano: '~1906 a.C.', evento: 'José interpretado sonhos de Faraó', referencia: 'Gn 40-41', tipo: 'patriarca' },
  { ano: '~1906 a.C.', evento: 'José torna-se governador do Egito', referencia: 'Gn 41:39-45', tipo: 'patriarca' },
  { ano: '~1898 a.C.', evento: 'Primeira visita dos irmãos ao Egito', referencia: 'Gn 42', tipo: 'patriarca' },
  { ano: '~1898 a.C.', evento: 'Benjamim levado ao Egito; banquetes de José', referencia: 'Gn 43-44', tipo: 'patriarca' },
  { ano: '~1898 a.C.', evento: 'José revela sua identidade aos irmãos', referencia: 'Gn 45', tipo: 'patriarca' },
  { ano: '~1898 a.C.', evento: 'Judá oferece sua vida por Benjamim', referencia: 'Gn 44:18-34', tipo: 'patriarca' },
  { ano: '~1875 a.C.', evento: 'Jacó e família mudam-se para o Egito', referencia: 'Gn 46', tipo: 'patriarca' },
  { ano: '~1875 a.C.', evento: 'Jacó abençoa os filhos de José (Efraim e Manassés)', referencia: 'Gn 48', tipo: 'patriarca' },
  { ano: '~1875 a.C.', evento: 'Jacó abençoa as doze tribos', referencia: 'Gn 49', tipo: 'patriarca' },
  { ano: '~1875 a.C.', evento: 'Morte de Jacó e sepultamento em Hebrom', referencia: 'Gn 50', tipo: 'patriarca' },
  { ano: '~1800 a.C.', evento: 'Morte de José; juramento de levar os ossos', referencia: 'Gn 50:22-26', tipo: 'patriarca' },
  { ano: '~1750 a.C.', evento: 'Crescimento dos israelitas no Egito', referencia: 'Ex 1:7-14', tipo: 'patriarca' },
  { ano: '~1720 a.C.', evento: 'Faraó novo que não conheceu José escraviza Israel', referencia: 'Ex 1:8-14', tipo: 'patriarca' },

  // ═══════════════════════════════════════════════════════════════════
  // ÊXODO E LEI (~1525–1406 a.C.)
  // ═══════════════════════════════════════════════════════════════════
  { ano: '~1525 a.C.', evento: 'Nascimento de Moisés e sua salvamento do rio', referencia: 'Ex 2:1-10', tipo: 'lei' },
  { ano: '~1486 a.C.', evento: 'Moisés mata um egípcio e foge para Midiã', referencia: 'Ex 2:11-15', tipo: 'lei' },
  { ano: '~1446 a.C.', evento: 'Moisés chama por Deus na sarça ardente', referencia: 'Ex 3-4', tipo: 'lei' },
  { ano: '~1446 a.C.', evento: 'Moisés e Aarão diante de Faraó (pragas)', referencia: 'Ex 5-11', tipo: 'lei' },
  { ano: '~1446 a.C.', evento: 'Páscoa instituída; décima praga', referencia: 'Ex 12', tipo: 'lei' },
  { ano: '~1446 a.C.', evento: 'Dedicação dos primogênitos', referencia: 'Ex 13', tipo: 'lei' },
  { ano: '~1446 a.C.', evento: 'Travessia do Mar Vermelho', referencia: 'Ex 14-15', tipo: 'lei' },
  { ano: '~1446 a.C.', evento: 'Manna e codornizes no deserto de Sibe', referencia: 'Ex 16', tipo: 'lei' },
  { ano: '~1446 a.C.', evento: 'Água saiu da rocha em Refidim', referencia: 'Ex 17:1-7', tipo: 'lei' },
  { ano: '~1446 a.C.', evento: 'Batalha com amalequitos; mão sustentada por Aarão', referencia: 'Ex 17:8-16', tipo: 'lei' },
  { ano: '~1446 a.C.', evento: 'Jetro aconselha Moisés e institui juízes', referencia: 'Ex 18', tipo: 'lei' },
  { ano: '~1446 a.C.', evento: 'Chegada ao Monte Sinai', referencia: 'Ex 19', tipo: 'lei' },
  { ano: '~1446 a.C.', evento: 'Decálogo: os Dez Mandamentos', referencia: 'Ex 20', tipo: 'lei' },
  { ano: '~1446 a.C.', evento: 'Livro da Aliança (leis civis e sociais)', referencia: 'Ex 21-23', tipo: 'lei' },
  { ano: '~1446 a.C.', evento: 'Beberagem da aliança no pé do Monte', referencia: 'Ex 24', tipo: 'lei' },
  { ano: '~1446 a.C.', evento: 'Bezerro de ouro: pecado de Israel', referencia: 'Ex 32', tipo: 'lei' },
  { ano: '~1446 a.C.', evento: 'Punição: levitas matam 3000 irmãos', referencia: 'Ex 32:25-29', tipo: 'lei' },
  { ano: '~1446 a.C.', evento: 'Glória de Deus desce sobre o tabernáculo', referencia: 'Ex 40:34-38', tipo: 'lei' },
  { ano: '~1445 a.C.', evento: 'Construção do Tabernáculo concluída', referencia: 'Ex 35-40', tipo: 'lei' },
  { ano: '~1445 a.C.', evento: 'Levítico: leis de santidade e sacrifícios', referencia: 'Lv 1-27', tipo: 'lei' },
  { ano: '~1445 a.C.', evento: 'Inauguração do sacerdócio; morte de Nadabe e Abiú', referencia: 'Lv 10', tipo: 'lei' },
  { ano: '~1445 a.C.', evento: 'Números: censo no deserto de Sinai', referencia: 'Nm 1', tipo: 'lei' },
  { ano: '~1445 a.C.', evento: 'Ordem de marcha e ordem do acampamento', referencia: 'Nm 2', tipo: 'lei' },
  { ano: '~1445 a.C.', evento: 'Rebeldia de Corá, Datã e Abirão', referencia: 'Nm 16', tipo: 'lei' },
  { ano: '~1445 a.C.', evento: 'Cajado de Aarão floresce e produz amêndoas', referencia: 'Nm 17', tipo: 'lei' },
  { ano: '~1445 a.C.', evento: 'Água de Mara: cura das águas amargas', referencia: 'Ex 15:22-25', tipo: 'lei' },
  { ano: '~1445 a.C.', evento: 'Korebe: punição por rebelião contra Moisés', referencia: 'Nm 16', tipo: 'lei' },
  { ano: '~1445 a.C.', evento: 'Praga de serpentes de bronze', referencia: 'Nm 21:4-9', tipo: 'lei' },
  { ano: '~1445 a.C.', evento: 'Cântico de Balaão e bênção de Israel', referencia: 'Nm 23-24', tipo: 'lei' },
  { ano: '~1445 a.C.', evento: 'Idolatria em Baal-Peor e praga', referencia: 'Nm 25', tipo: 'lei' },
  { ano: '~1445 a.C.', evento: 'Filhas de Zelofeade e direito feminino de herança', referencia: 'Nm 27:1-11', tipo: 'lei' },
  { ano: '~1445 a.C.', evento: 'Segundo censo no deserto de Moabe', referencia: 'Nm 26', tipo: 'lei' },
  { ano: '~1407 a.C.', evento: 'Moisés avista Canaã do Monte Nabo', referencia: 'Nm 27:12-14', tipo: 'lei' },
  { ano: '~1407 a.C.', evento: 'Josué comissionado como sucessor de Moisés', referencia: 'Nm 27:15-23', tipo: 'lei' },
  { ano: '~1407 a.C.', evento: 'Deuteronômio: discursos de Moisés antes da morte', referencia: 'Dt 1-30', tipo: 'lei' },
  { ano: '~1407 a.C.', evento: 'Moisés canta o cântico de Israel (Dt 32)', referencia: 'Dt 32', tipo: 'lei' },
  { ano: '~1406 a.C.', evento: 'Morte e sepultamento de Moisés', referencia: 'Dt 34', tipo: 'lei' },

  // ═══════════════════════════════════════════════════════════════════
  // CONQUISTA E JUÍZES (~1406–1050 a.C.)
  // ═══════════════════════════════════════════════════════════════════
  { ano: '~1406 a.C.', evento: 'Josué cruza o Jordão com Israel', referencia: 'Js 3-4', tipo: 'lei' },
  { ano: '~1406 a.C.', evento: 'Circuncisão em Gilgal e maná cessa', referencia: 'Js 5:2-12', tipo: 'lei' },
  { ano: '~1406 a.C.', evento: 'Rahab esconde os espias em Jericó', referencia: 'Js 2', tipo: 'lei' },
  { ano: '~1406 a.C.', evento: 'Destruição de Jericó: muralhas desabam', referencia: 'Js 6', tipo: 'lei' },
  { ano: '~1406 a.C.', evento: 'Pecado de Acã em Jericó; derrota em Ai', referencia: 'Js 7', tipo: 'lei' },
  { ano: '~1406 a.C.', evento: 'Conquista e destruição de Ai', referencia: 'Js 8', tipo: 'lei' },
  { ano: '~1406 a.C.', evento: 'Aliança no monte Ebal e Gerizim', referencia: 'Js 8:30-35', tipo: 'lei' },
  { ano: '~1406 a.C.', evento: 'Gibeonitas enganam Israel e se tornam servos', referencia: 'Js 9', tipo: 'lei' },
  { ano: '~1406 a.C.', evento: 'Sol parado em Gibeão e lua em Ajalom', referencia: 'Js 10:12-14', tipo: 'lei' },
  { ano: '~1406 a.C.', evento: 'Conquista do sul de Canaã', referencia: 'Js 10:28-43', tipo: 'lei' },
  { ano: '~1406 a.C.', evento: 'Conquista do norte de Canaã', referencia: 'Js 11-12', tipo: 'lei' },
  { ano: '~1406 a.C.', evento: 'Distribuição da terra entre as tribos', referencia: 'Js 13-19', tipo: 'lei' },
  { ano: '~1406 a.C.', evento: 'Cidades de refúgio designadas', referencia: 'Js 20', tipo: 'lei' },
  { ano: '~1406 a.C.', evento: 'Levitas recebem cidades e pastagens', referencia: 'Js 21', tipo: 'lei' },
  { ano: '~1406 a.C.', evento: 'Altar do Jordão como testemunho', referencia: 'Js 22', tipo: 'lei' },
  { ano: '~1400 a.C.', evento: 'Morte de Josué; Israel serve ao SENHOR', referencia: 'Js 24:29-33', tipo: 'lei' },
  { ano: '~1390 a.C.', evento: 'José, filho de Jericó: sepultado em Timná', referencia: 'Js 24:32', tipo: 'lei' },
  { ano: '~1380 a.C.', evento: 'Aposentos: Israel pecou e adorou Baalim', referencia: 'Jz 2:10-13', tipo: 'lei' },
  { ano: '~1375 a.C.', evento: 'Primeira opressão:_Cusaã-Risataim', referencia: 'Jz 3:8', tipo: 'lei' },
  { ano: '~1370 a.C.', evento: 'Otoêniel liberta Israel (primeiro juiz)', referencia: 'Jz 3:9-11', tipo: 'lei' },
  { ano: '~1350 a.C.', evento: 'Segunda opressão: Eglom, rei de Moabe', referencia: 'Jz 3:12-14', tipo: 'lei' },
  { ano: '~1350 a.C.', evento: 'Eúde mata Eglom e liberta Israel', referencia: 'Jz 3:15-30', tipo: 'lei' },
  { ano: '~1330 a.C.', evento: 'Terceira opressão: Jaabim, rei de Canaã', referencia: 'Jz 4:1-3', tipo: 'lei' },
  { ano: '~1330 a.C.', evento: 'Débora e Baraque derrotam Sísera', referencia: 'Jz 4-5', tipo: 'lei' },
  { ano: '~1310 a.C.', evento: 'Quarta opressão: midianitas', referencia: 'Jz 6:1-6', tipo: 'lei' },
  { ano: '~1310 a.C.', evento: 'Gideão: tocha e trombeta contra midianitas', referencia: 'Jz 6-7', tipo: 'lei' },
  { ano: '~1310 a.C.', evento: 'Gideão recusa reinar; Ephod de ouro', referencia: 'Jz 8:22-27', tipo: 'lei' },
  { ano: '~1290 a.C.', evento: 'Abimeleque mata seus 70 irmãos; reina 3 anos', referencia: 'Jz 9', tipo: 'lei' },
  { ano: '~1280 a.C.', evento: 'Jotão conta a parábola das árvores', referencia: 'Jz 9:7-21', tipo: 'lei' },
  { ano: '~1250 a.C.', evento: 'Quinta opressão: filisteus e amonitas', referencia: 'Jz 10:6-9', tipo: 'lei' },
  { ano: '~1250 a.C.', evento: 'Jefté derrota amonitas e faz voto', referencia: 'Jz 11', tipo: 'lei' },
  { ano: '~1230 a.C.', evento: 'Sexta opressão: filisteus', referencia: 'Jz 13:1', tipo: 'lei' },
  { ano: '~1200 a.C.', evento: 'Sansão: nascimento miraculoso', referencia: 'Jz 13', tipo: 'lei' },
  { ano: '~1180 a.C.', evento: 'Sansão: feitos de força e Filisteus', referencia: 'Jz 14-15', tipo: 'lei' },
  { ano: '~1170 a.C.', evento: 'Sansão e Dalila; captura e cegueira', referencia: 'Jz 16', tipo: 'lei' },
  { ano: '~1170 a.C.', evento: 'Morte de Sansão: derruba o templo de Dagom', referencia: 'Jz 16:23-31', tipo: 'lei' },
  { ano: '~1150 a.C.', evento: 'Sétima opressão: filisteus', referencia: 'Jz 13:1', tipo: 'lei' },
  { ano: '~1150 a.C.', evento: 'Migração de Elimeleque e Naomi para Moabe', referencia: 'Rt 1', tipo: 'lei' },
  { ano: '~1125 a.C.', evento: 'Rute se apega a Naomi e segue para Belém', referencia: 'Rt 1:16-17', tipo: 'lei' },
  { ano: '~1125 a.C.', evento: 'Rute colhe na colheita de Boaz', referencia: 'Rt 2', tipo: 'lei' },
  { ano: '~1125 a.C.', evento: 'Rute na eira de Boaz; redeemção assegurada', referencia: 'Rt 3', tipo: 'lei' },
  { ano: '~1125 a.C.', evento: 'Boaz casa com Rute; nascimento de Obed', referencia: 'Rt 4', tipo: 'lei' },
  { ano: '~1120 a.C.', evento: 'Hana ora e Samuel nasce', referencia: '1 Sm 1:19-20', tipo: 'lei' },
  { ano: '~1110 a.C.', evento: 'Samuel dedicado ao SENHOR no tabernáculo', referencia: '1 Sm 1:24-28', tipo: 'lei' },
  { ano: '~1100 a.C.', evento: 'Deus chama Samuel durante a noite', referencia: '1 Sm 3', tipo: 'lei' },
  { ano: '~1090 a.C.', evento: 'Derrota de Israel; arca capturada pelos filisteus', referencia: '1 Sm 4', tipo: 'lei' },
  { ano: '~1090 a.C.', evento: 'Morte de Hophni e Fineias; morte de Eli', referencia: '1 Sm 4:11-18', tipo: 'lei' },
  { ano: '~1090 a.C.', evento: 'Arca retorna; Deus castiga os filisteus (tumores)', referencia: '1 Sm 5-6', tipo: 'lei' },
  { ano: '~1080 a.C.', evento: 'Samuel juiz em Israel; vitória em Mizpa', referencia: '1 Sm 7:5-14', tipo: 'lei' },
  { ano: '~1060 a.C.', evento: 'Filhos de Samuel corrompidos; Israel pede rei', referencia: '1 Sm 8:1-3', tipo: 'lei' },

  // ═══════════════════════════════════════════════════════════════════
  // REINOS UNIDOS (~1050–931 a.C.)
  // ═══════════════════════════════════════════════════════════════════
  { ano: '~1050 a.C.', evento: 'Saul ungido como primeiro rei de Israel', referencia: '1 Sm 10', tipo: 'reis' },
  { ano: '~1050 a.C.', evento: 'Saul derrota os amonitas em Jabes-Gileade', referencia: '1 Sm 11', tipo: 'reis' },
  { ano: '~1050 a.C.', evento: 'Samuel despede o povo em Gilgal', referencia: '1 Sm 12', tipo: 'reis' },
  { ano: '~1045 a.C.', evento: 'Saul desobedece: poupa Agague e os melhores animais', referencia: '1 Sm 13; 15', tipo: 'reis' },
  { ano: '~1040 a.C.', evento: 'Davi ungi por Samuel; espírito do SENHOR sai de Saul', referencia: '1 Sm 16:1-14', tipo: 'reis' },
  { ano: '~1025 a.C.', evento: 'Davi mata Golias, o filisteu', referencia: '1 Sm 17', tipo: 'reis' },
  { ano: '~1025 a.C.', evento: 'Amizade de Davi e Jônatas', referencia: '1 Sm 18:1-4', tipo: 'reis' },
  { ano: '~1025 a.C.', evento: 'Saul persegue Davi; canção de Saraiva', referencia: '1 Sm 18-19', tipo: 'reis' },
  { ano: '~1025 a.C.', evento: 'Davi poupa a vida de Saul na caverna', referencia: '1 Sm 24', tipo: 'reis' },
  { ano: '~1025 a.C.', evento: 'Davi entre os filisteus; Abigail e Nabal', referencia: '1 Sm 25', tipo: 'reis' },
  { ano: '~1020 a.C.', evento: 'Davi poupa Saul segunda vez', referencia: '1 Sm 26', tipo: 'reis' },
  { ano: '~1015 a.C.', evento: 'Davi mora entre os filisteus em Ziclague', referencia: '1 Sm 27-30', tipo: 'reis' },
  { ano: '~1010 a.C.', evento: 'Morte de Saul e Jônatas no Monte Gilboá', referencia: '1 Sm 31', tipo: 'reis' },
  { ano: '~1010 a.C.', evento: 'Davi é ungido rei de Judá em Hebrom', referencia: '2 Sm 2:1-4', tipo: 'reis' },
  { ano: '~1010 a.C.', evento: 'Guerra civil: Davi vs. Isbosete (Israel)', referencia: '2 Sm 2-3', tipo: 'reis' },
  { ano: '~1003 a.C.', evento: 'Davi torna-se rei de todo Israel', referencia: '2 Sm 5:1-5', tipo: 'reis' },
  { ano: '~1000 a.C.', evento: 'Davi conquista Jerusalém (Sião)', referencia: '2 Sm 5:6-10', tipo: 'reis' },
  { ano: '~1000 a.C.', evento: 'Davi leva a Arca da Aliança para Jerusalém', referencia: '2 Sm 6', tipo: 'reis' },
  { ano: '~998 a.C.', evento: 'Promessa davídica: aliança eterna', referencia: '2 Sm 7', tipo: 'reis' },
  { ano: '~995 a.C.', evento: 'Davi derrota filisteus, moabitas e arameus', referencia: '2 Sm 8', tipo: 'reis' },
  { ano: '~993 a.C.', evento: 'Misfael e o filho de Davi; rebeldia de Absalão', referencia: '2 Sm 13-14', tipo: 'reis' },
  { ano: '~990 a.C.', evento: 'Absalão conspira e toma Jerusalém', referencia: '2 Sm 15', tipo: 'reis' },
  { ano: '~990 a.C.', evento: 'Davi foge; Cusai e Itai', referencia: '2 Sm 15-16', tipo: 'reis' },
  { ano: '~990 a.C.', evento: 'Conselho de Ahitofel derrotado por Cusai', referencia: '2 Sm 17', tipo: 'reis' },
  { ano: '~990 a.C.', evento: 'Batalha na floresta de Efraim; morte de Absalão', referencia: '2 Sm 18', tipo: 'reis' },
  { ano: '~990 a.C.', evento: 'Davi chora por Absalão; rebelião de Siba', referencia: '2 Sm 19', tipo: 'reis' },
  { ano: '~990 a.C.', evento: 'Rebelião de Seba; Joab mata Abner', referencia: '2 Sm 20', tipo: 'reis' },
  { ano: '~990 a.C.', evento: 'Fome de três anos; Saul e os gibeonitas', referencia: '2 Sm 21', tipo: 'reis' },
  { ano: '~985 a.C.', evento: 'Cântico de vitória de Davi (2 Sm 22)', referencia: '2 Sm 22', tipo: 'reis' },
  { ano: '~985 a.C.', evento: 'Últimas palavras de Davi; heróis de Davi', referencia: '2 Sm 23', tipo: 'reis' },
  { ano: '~983 a.C.', evento: 'Pecado de Davi: censo e praga', referencia: '2 Sm 24', tipo: 'reis' },
  { ano: '~980 a.C.', evento: 'Davi organiza sacerdócio e levitas', referencia: '1 Cr 23-26', tipo: 'reis' },
  { ano: '~976 a.C.', evento: 'Adonijah tenta usurpar o trono', referencia: '1 Rs 1', tipo: 'reis' },
  { ano: '~975 a.C.', evento: 'Nascimento de Salomão; Profecia de Natã', referencia: '2 Sm 12:24-25', tipo: 'reis' },
  { ano: '~970 a.C.', evento: 'Salomão ungido e coroado rei', referencia: '1 Rs 1-2', tipo: 'reis' },
  { ano: '~970 a.C.', evento: 'Salomão pede sabedoria e a recebe', referencia: '1 Rs 3:5-15', tipo: 'reis' },
  { ano: '~970 a.C.', evento: 'Julgamento de Salomão: duas mães e o bebê', referencia: '1 Rs 3:16-28', tipo: 'reis' },
  { ano: '~966 a.C.', evento: 'Início da construção do Templo de Jerusalém', referencia: '1 Rs 6:1-38', tipo: 'reis' },
  { ano: '~960 a.C.', evento: 'Construção do Templo concluída e dedicado', referencia: '1 Rs 8', tipo: 'reis' },
  { ano: '~960 a.C.', evento: 'Oração de dedicação de Salomão', referencia: '1 Rs 8:22-53', tipo: 'reis' },
  { ano: '~950 a.C.', evento: 'A Arca desce ao Santo dos Santos', referencia: '1 Rs 8:6-11', tipo: 'reis' },
  { ano: '~950 a.C.', evento: 'Templo cheio da glória do SENHOR', referencia: '1 Rs 8:10-11', tipo: 'reis' },
  { ano: '~950 a.C.', evento: 'Salomão constrói palácio e cidades', referencia: '1 Rs 7:1-12', tipo: 'reis' },
  { ano: '~950 a.C.', evento: 'Rainha de Sheba visita Salomão', referencia: '1 Rs 10', tipo: 'reis' },
  { ano: '~950 a.C.', evento: 'Riqueza e sabedoria de Salomão', referencia: '1 Rs 10:14-29', tipo: 'reis' },
  { ano: '~945 a.C.', evento: 'Salomão casa com mulheres estrangeiras; idólatra', referencia: '1 Rs 11:1-8', tipo: 'reis' },
  { ano: '~945 a.C.', evento: 'Profecia: reino será dividido', referencia: '1 Rs 11:9-13', tipo: 'reis' },
  { ano: '~945 a.C.', evento: 'Adade, rei da Síria, guerra contra Salomão', referencia: '1 Rs 11:14-22', tipo: 'reis' },
  { ano: '~945 a.C.', evento: 'Jeroão, filho de Nabate, conspira contra Salomão', referencia: '1 Rs 11:23-40', tipo: 'reis' },
  { ano: '~940 a.C.', evento: 'Ecoab incita o povo contra Roboão', referencia: '1 Rs 12:1-19', tipo: 'reis' },

  // ═══════════════════════════════════════════════════════════════════
  // REINOS DIVIDIDOS – ISRAEL (Norte) (~931–722 a.C.)
  // ═══════════════════════════════════════════════════════════════════
  { ano: '~931 a.C.', evento: 'Divisão do reino: Israel (norte) e Judá (sul)', referencia: '1 Rs 12', tipo: 'reis' },
  { ano: '~930 a.C.', evento: 'Jeroboão institui bezerros de ouro em Dan e Betel', referencia: '1 Rs 12:25-33', tipo: 'reis' },
  { ano: '~930 a.C.', evento: 'Profeta denuncia o altar em Betel', referencia: '1 Rs 13', tipo: 'reis' },
  { ano: '~925 a.C.', evento: 'Roboão perde cidades para o Egito (Sisac)', referencia: '1 Rs 14:25-26', tipo: 'reis' },
  { ano: '~920 a.C.', evento: 'Nadabe assassina Jeroboão; Baasa mata Nadabe', referencia: '1 Rs 15:25-34', tipo: 'reis' },
  { ano: '~910 a.C.', evento: 'Baasa e Elá: reis de Israel', referencia: '1 Rs 15:33-16:8', tipo: 'reis' },
  { ano: '~900 a.C.', evento: 'Zimri mata Elá; Omri mata Zimri', referencia: '1 Rs 16:8-20', tipo: 'reis' },
  { ano: '~885 a.C.', evento: 'Omri compra o Monte Samaria; capital em Samaria', referencia: '1 Rs 16:23-24', tipo: 'reis' },
  { ano: '~880 a.C.', evento: 'Acabe casa com Jezabel e adora Baal', referencia: '1 Rs 16:30-33', tipo: 'reis' },
  { ano: '~875 a.C.', evento: 'Fome de três anos; Elias enviado ao ribeiro de Carite', referencia: '1 Rs 17', tipo: 'profeta' },
  { ano: '~875 a.C.', evento: 'Elias ressuscita o filho da viúva de Sarepta', referencia: '1 Rs 17:17-24', tipo: 'profeta' },
  { ano: '~870 a.C.', evento: 'Elias no Monte Carmelo: fogo do céu', referencia: '1 Rs 18', tipo: 'profeta' },
  { ano: '~870 a.C.', evento: 'Elias corre diante da carruagem de Acabe', referencia: '1 Rs 18:41-46', tipo: 'profeta' },
  { ano: '~870 a.C.', evento: 'Elias foge de Jezabel; ouve Deus na caverna', referencia: '1 Rs 19', tipo: 'profeta' },
  { ano: '~870 a.C.', evento: 'Elias ungiu Hazael e Jeú contra Ben-Hadade', referencia: '1 Rs 19:15-18', tipo: 'profeta' },
  { ano: '~860 a.C.', evento: 'Guerra de Acabe contra Síria; morte de Ben-Hadade', referencia: '1 Rs 20', tipo: 'reis' },
  { ano: '~860 a.C.', evento: 'Nabote: Acabe rouba a vinha; profecia contra ele', referencia: '1 Rs 21', tipo: 'reis' },
  { ano: '~855 a.C.', evento: 'Morte de Acabe na batalha de Ramote-Gileade', referencia: '1 Rs 22', tipo: 'reis' },
  { ano: '~850 a.C.', evento: 'Acazias rei de Israel; cai e procura Baal-Zebub', referencia: '2 Rs 1', tipo: 'reis' },
  { ano: '~850 a.C.', evento: 'Fogo do céu devora os soldados de Acazias', referencia: '2 Rs 1:9-14', tipo: 'reis' },
  { ano: '~848 a.C.', evento: 'Eliseu ungi por Elias; Elias é arrebatado', referencia: '2 Rs 2', tipo: 'profeta' },
  { ano: '~845 a.C.', evento: 'Eliseu cura Naamã; prata no jarro', referencia: '2 Rs 5', tipo: 'profeta' },
  { ano: '~845 a.C.', evento: 'Eliseu multiplica óleo e faz comida doce', referencia: '2 Rs 4:1-7', tipo: 'profeta' },
  { ano: '~845 a.C.', evento: 'Eliseu ressuscita o filho da sunamita', referencia: '2 Rs 4:18-37', tipo: 'profeta' },
  { ano: '~841 a.C.', evento: 'Jezabele e Acabe matam Nabote', referencia: '1 Rs 21', tipo: 'reis' },
  { ano: '~841 a.C.', evento: 'Jeu ungi como rei; extermínio da casa de Acabe', referencia: '2 Rs 9-10', tipo: 'reis' },
  { ano: '~841 a.C.', evento: 'Jeu mata Acazias de Judá e Jezabele', referencia: '2 Rs 9:24-37', tipo: 'reis' },
  { ano: '~841 a.C.', evento: 'Atalia mata a família real de Judá; Joás salvo', referencia: '2 Rs 11', tipo: 'reis' },
  { ano: '~841 a.C.', evento: 'Matanias mata Baal e restaura o culto ao SENHOR', referencia: '2 Rs 10:18-28', tipo: 'reis' },
  { ano: '~835 a.C.', evento: 'Joás coroado rei de Judá aos 7 anos', referencia: '2 Rs 11:21-12:3', tipo: 'reis' },
  { ano: '~835 a.C.', evento: 'Joás repara o Templo', referencia: '2 Rs 12:4-16', tipo: 'reis' },
  { ano: '~815 a.C.', evento: 'Hazael rei da Síria ameaça Jerusalém', referencia: '2 Rs 12:17-18', tipo: 'reis' },
  { ano: '~810 a.C.', evento: 'Jeoacaz rei de Israel; opressão de Hazael', referencia: '2 Rs 13:1-9', tipo: 'reis' },
  { ano: '~800 a.C.', evento: 'Jeoaquim rei de Israel; vitória em Apeteque', referencia: '2 Rs 13:10-19', tipo: 'reis' },
  { ano: '~793 a.C.', evento: 'Amazias rei de Judá; vitória sobre Edom', referencia: '2 Rs 14:7-14', tipo: 'reis' },
  { ano: '~790 a.C.', evento: 'Jeroboão II rei de Israel; restaura território', referencia: '2 Rs 14:23-29', tipo: 'reis' },
  { ano: '~790 a.C.', evento: 'Jóas rei de Judá; recupera cidades', referencia: '2 Rs 14:13-14', tipo: 'reis' },
  { ano: '~780 a.C.', evento: 'Amós profetiza contra Israel', referencia: 'Am 1-9', tipo: 'profeta' },
  { ano: '~760 a.C.', evento: 'Jonas enviado a Nínive; arrependimento', referencia: 'Jn 1-4', tipo: 'profeta' },
  { ano: '~760 a.C.', evento: 'Oséias profetiza contra a infidelidade de Israel', referencia: 'Os 1-14', tipo: 'profeta' },
  { ano: '~753 a.C.', evento: 'Zacarias morto a pedradas no Templo', referencia: '2 Cr 24:20-22', tipo: 'reis' },
  { ano: '~750 a.C.', evento: 'Miquéias profetiza contra Samaria', referencia: 'Mc 1', tipo: 'profeta' },
  { ano: '~750 a.C.', evento: 'Fillha de Jeroboão II; Zorobabel governa', referencia: '2 Rs 14:25-28', tipo: 'reis' },
  { ano: '~745 a.C.', evento: 'Menaém rei de Israel; tributo a Tiglate-Pileser', referencia: '2 Rs 15:17-22', tipo: 'reis' },
  { ano: '~740 a.C.', evento: 'Isaías chamado ao ministério profético (visão do trono)', referencia: 'Is 6', tipo: 'profeta' },
  { ano: '~740 a.C.', evento: 'Pecaqueia rei de Judá; conspiracy com Refeia', referencia: '2 Rs 15:23-26', tipo: 'reis' },
  { ano: '~740 a.C.', evento: 'Menasés rei de Judá; 55 anos de idolatria', referencia: '2 Rs 21:1-9', tipo: 'reis' },
  { ano: '~737 a.C.', evento: 'Pecaque rei de Judá; assassina Pecaqueia', referencia: '2 Rs 15:27-31', tipo: 'reis' },
  { ano: '~732 a.C.', evento: 'Fáquia rei de Israel; aliança com Síria', referencia: '2 Rs 15:30', tipo: 'reis' },
  { ano: '~732 a.C.', evento: 'Tiglate-Pileser III conquista partes de Israel', referencia: '2 Rs 15:29', tipo: 'reis' },
  { ano: '~730 a.C.', evento: 'Acaz rei de Judá; altar pagão e sinagoga', referencia: '2 Rs 16:2-9', tipo: 'reis' },
  { ano: '~727 a.C.', evento: 'Oséias rei de Israel; último rei', referencia: '2 Rs 17:1-2', tipo: 'reis' },
  { ano: '~725 a.C.', evento: 'Salmaneser V cerca Samaria', referencia: '2 Rs 17:3-6', tipo: 'reis' },
  { ano: '~722 a.C.', evento: 'Queda de Samaria: exílio das dez tribos', referencia: '2 Rs 17:5-23', tipo: 'exilio' },

  // ═══════════════════════════════════════════════════════════════════
  // REINO DE JUDÁ (Sul) (~931–586 a.C.)
  // ═══════════════════════════════════════════════════════════════════
  { ano: '~913 a.C.', evento: 'Abias rei de Judá; vitória contra Jeroboão', referencia: '1 Rs 15:1-8', tipo: 'reis' },
  { ano: '~870 a.C.', evento: 'Jorão rei de Judá; casou-se com Atalia', referencia: '2 Rs 8:16-19', tipo: 'reis' },
  { ano: '~848 a.C.', evento: 'Acazias rei de Judá; morto por Jeú', referencia: '2 Rs 8:25-29', tipo: 'reis' },
  { ano: '~835 a.C.', evento: 'Atalia usurpa o trono de Judá', referencia: '2 Rs 11:1-3', tipo: 'reis' },
  { ano: '~790 a.C.', evento: 'Amazias rei de Judá; derrotado por Jeroboão II', referencia: '2 Rs 14:11-14', tipo: 'reis' },
  { ano: '~750 a.C.', evento: 'Uzias/Acaz rei de Judá; lepra por usurpar sacerdócio', referencia: '2 Cr 26:16-21', tipo: 'reis' },
  { ano: '~740 a.C.', evento: 'Jotão rei de Judá; povo ainda idólatra', referencia: '2 Rs 15:34-36', tipo: 'reis' },
  { ano: '~735 a.C.', evento: 'Acaz rei de Judá; aliança com Assíria', referencia: '2 Rs 16:7-10', tipo: 'reis' },
  { ano: '~722 a.C.', evento: 'Profecia de Isaías contra Judá (Is 7-8)', referencia: 'Is 7-8', tipo: 'profeta' },
  { ano: '~715 a.C.', evento: 'Ezequias rei de Judá; reformas religiosas', referencia: '2 Rs 18:1-6', tipo: 'reis' },
  { ano: '~715 a.C.', evento: 'Ezequias purifica o Templo; reaviva a Páscoa', referencia: '2 Cr 29-31', tipo: 'reis' },
  { ano: '~715 a.C.', evento: 'Ezequias destrói o serpente de bronze', referencia: '2 Rs 18:4', tipo: 'reis' },
  { ano: '~701 a.C.', evento: 'Senaqueribe cerca Jerusalém; anjo extermina exército', referencia: '2 Rs 18-19', tipo: 'reis' },
  { ano: '~701 a.C.', evento: 'Isaías profetiza a libertação de Judá', referencia: 'Is 36-37', tipo: 'profeta' },
  { ano: '~700 a.C.', evento: 'Canal de Siloé e poema de Ezequias', referencia: '2 Rs 20:20; Is 38', tipo: 'reis' },
  { ano: '~697 a.C.', evento: 'Manassés rei de Judá; pior rei idólatra', referencia: '2 Rs 21:1-9', tipo: 'reis' },
  { ano: '~697 a.C.', evento: 'Manassés perseguiu e matou profetas', referencia: '2 Rs 21:10-15', tipo: 'reis' },
  { ano: '~687 a.C.', evento: 'Assíria captura Manassés e o leva acorrentado', referencia: '2 Cr 33:11-13', tipo: 'reis' },
  { ano: '~687 a.C.', evento: 'Manassés se arrepende na prisão assíria', referencia: '2 Cr 33:12-13', tipo: 'reis' },
  { ano: '~670 a.C.', evento: 'Amon rei de Judá; morto pelos servos', referencia: '2 Rs 21:19-26', tipo: 'reis' },
  { ano: '~640 a.C.', evento: 'Josias rei de Judá aos 8 anos; reformas', referencia: '2 Rs 22-23', tipo: 'reis' },
  { ano: '~627 a.C.', evento: 'Jeremias começa a profetizar', referencia: 'Jr 1', tipo: 'profeta' },
  { ano: '~622 a.C.', evento: 'Livro da Lei encontrado no Templo; reformas', referencia: '2 Rs 22:8-13', tipo: 'reis' },
  { ano: '~622 a.C.', evento: 'Josias lê a Lei e faz aliança', referencia: '2 Rs 23:1-3', tipo: 'reis' },
  { ano: '~622 a.C.', evento: 'Josias destrói ídolos e lugares altos', referencia: '2 Rs 23:4-20', tipo: 'reis' },
  { ano: '~622 a.C.', evento: 'Josias celebra a Páscoa mais grandiosa', referencia: '2 Rs 23:21-23', tipo: 'reis' },
  { ano: '~620 a.C.', evento: 'Sofonias profetiza contra Judá', referencia: 'Sf 1-3', tipo: 'profeta' },
  { ano: '~609 a.C.', evento: 'Morte de Josias em Megido', referencia: '2 Rs 23:29-30', tipo: 'reis' },
  { ano: '~609 a.C.', evento: 'Joaacaz rei de Judá; deposto pelo Faraó', referencia: '2 Rs 23:31-34', tipo: 'reis' },
  { ano: '~609 a.C.', evento: 'Joaquim rei de Judá; pagou tributo ao Egito', referencia: '2 Rs 23:34-24:6', tipo: 'reis' },
  { ano: '~605 a.C.', evento: 'Batalha de Carquemis; Babilônia domina', referencia: '2 Cr 35:20-24', tipo: 'reis' },
  { ano: '~605 a.C.', evento: 'Daniel e príncipes levados à Babilônia', referencia: 'Dn 1', tipo: 'exilio' },
  { ano: '~600 a.C.', evento: 'Jeremias profetiza 70 anos de exílio', referencia: 'Jr 25:1-11', tipo: 'profeta' },
  { ano: '~597 a.C.', evento: 'Joacim se rebela; Babilônia cerca Jerusalém', referencia: '2 Rs 24:10-16', tipo: 'exilio' },
  { ano: '~597 a.C.', evento: 'Ezequiel exilado na Babilônia', referencia: 'Ez 1-3', tipo: 'exilio' },
  { ano: '~597 a.C.', evento: 'Sedecias nomeado rei de Judá', referencia: '2 Rs 24:17-20', tipo: 'reis' },
  { ano: '~593 a.C.', evento: 'Daniel interpreta o sonho da estátua', referencia: 'Dn 2', tipo: 'exilio' },
  { ano: '~592 a.C.', evento: 'Ezequiel tem a visão do trono de Deus', referencia: 'Ez 1', tipo: 'exilio' },
  { ano: '~591 a.C.', evento: 'Ezequiel profetiza o vale de ossos secos', referencia: 'Ez 37', tipo: 'exilio' },
  { ano: '~588 a.C.', evento: 'Nabucodonosor invade Jerusalém pela terceira vez', referencia: '2 Rs 25:1-7', tipo: 'exilio' },
  { ano: '~586 a.C.', evento: 'Fome extrema em Jerusalém durante cerco', referencia: '2 Rs 25:3', tipo: 'exilio' },
  { ano: '~586 a.C.', evento: 'Destruição de Jerusalém e do Templo', referencia: '2 Rs 25:8-21', tipo: 'exilio' },
  { ano: '~586 a.C.', evento: 'Sedecias capturado, filhos mortos; cegado', referencia: '2 Rs 25:4-7', tipo: 'exilio' },
  { ano: '~586 a.C.', evento: 'Jeremias e Lote no exílio', referencia: 'Jr 39-40', tipo: 'exilio' },
  { ano: '~586 a.C.', evento: 'Guedalia governa a terra restante', referencia: '2 Rs 25:22-26', tipo: 'exilio' },

  // ═══════════════════════════════════════════════════════════════════
  // EXÍLIO NA BABILÔNIA (~586–538 a.C.)
  // ═══════════════════════════════════════════════════════════════════
  { ano: '~597 a.C.', evento: 'Daniel e seus companheiros na corte babilônica', referencia: 'Dn 1:1-21', tipo: 'exilio' },
  { ano: '~593 a.C.', evento: 'Nabucodonosor sonha com a estátua colosal', referencia: 'Dn 2:1-49', tipo: 'exilio' },
  { ano: '~586 a.C.', evento: 'Daniel interpreta a estátua de ouro, prata, bronze', referencia: 'Dn 2:31-45', tipo: 'exilio' },
  { ano: '~586 a.C.', evento: 'Daniel interpreta a escrita no muro de Belsassar', referencia: 'Dn 5:1-31', tipo: 'exilio' },
  { ano: '~565 a.C.', evento: 'Daniel lançado na cova dos leões', referencia: 'Dn 6', tipo: 'exilio' },
  { ano: '~555 a.C.', evento: 'Daniel tem a visão das quatro bestas', referencia: 'Dn 7', tipo: 'exilio' },
  { ano: '~551 a.C.', evento: 'Daniel tem a visão do carneiro e do bode', referencia: 'Dn 8', tipo: 'exilio' },
  { ano: '~541 a.C.', evento: 'Daniel recebe a profecia das 70 semanas', referencia: 'Dn 9:24-27', tipo: 'exilio' },
  { ano: '~539 a.C.', evento: 'Nabucodonosor humilde reconhece o Deus verdadeiro', referencia: 'Dn 4', tipo: 'exilio' },
  { ano: '~539 a.C.', evento: 'Queda da Babilônia para os persas', referencia: 'Dn 5:30-31', tipo: 'exilio' },
  { ano: '~539 a.C.', evento: 'Shadrach, Meshach e Abednego no forno de fogo', referencia: 'Dn 3', tipo: 'exilio' },

  // ═══════════════════════════════════════════════════════════════════
  // PÓS-EXÍLIO (~538–164 a.C.)
  // ═══════════════════════════════════════════════════════════════════
  { ano: '~538 a.C.', evento: 'Decreto de Ciro: retorno dos exilados', referencia: 'Ed 1', tipo: 'exilio' },
  { ano: '~536 a.C.', evento: 'Primeiro grupo de retornados sob Zorobabel', referencia: 'Ed 2', tipo: 'exilio' },
  { ano: '~536 a.C.', evento: 'Altar restaurado; festa dos tabernáculos', referencia: 'Ed 3', tipo: 'exilio' },
  { ano: '~536 a.C.', evento: 'Início da reconstrução do Templo', referencia: 'Ed 3:8-13', tipo: 'exilio' },
  { ano: '~535 a.C.', evento: 'Oposição dos samaritanos para o Templo', referencia: 'Ed 4', tipo: 'exilio' },
  { ano: '~520 a.C.', evento: 'Hageu e Zacarias motivam a reconstrução', referencia: 'Ed 5:1-2', tipo: 'profeta' },
  { ano: '~520 a.C.', evento: 'Reconstrução do Templo retomada', referencia: 'Ed 5', tipo: 'exilio' },
  { ano: '~516 a.C.', evento: 'Reconstrução do Templo concluída', referencia: 'Ed 6:14-18', tipo: 'exilio' },
  { ano: '~516 a.C.', evento: 'Celebração da Páscoa no novo Templo', referencia: 'Ed 6:19-22', tipo: 'exilio' },
  { ano: '~515 a.C.', evento: 'Hageu profetiza: a glória do novo Templo', referencia: 'Hg 2:1-9', tipo: 'profeta' },
  { ano: '~510 a.C.', evento: 'Zacarias tem visões: anjos e cavaleiros', referencia: 'Zc 1-6', tipo: 'profeta' },
  { ano: '~480 a.C.', evento: 'Esdras vai a Jerusalém; expulsão das mulheres estrangeiras', referencia: 'Ed 7-10', tipo: 'exilio' },
  { ano: '~460 a.C.', evento: 'Neemias em Susã; ouve sobre Jerusalém', referencia: 'Ne 1-2', tipo: 'exilio' },
  { ano: '~445 a.C.', evento: 'Neemias reconstrói os muros de Jerusalém', referencia: 'Ne 2-6', tipo: 'exilio' },
  { ano: '~445 a.C.', evento: 'Muros reconstruídos em 52 dias', referencia: 'Ne 6:15-16', tipo: 'exilio' },
  { ano: '~445 a.C.', evento: 'Dedicação dos muros com.procissão', referencia: 'Ne 12:27-43', tipo: 'exilio' },
  { ano: '~440 a.C.', evento: 'Esdras lê publicamente a Lei', referencia: 'Ne 8', tipo: 'exilio' },
  { ano: '~440 a.C.', evento: 'Reforma: aliança do povo com a Lei', referencia: 'Ne 9-10', tipo: 'exilio' },
  { ano: '~430 a.C.', evento: 'Ester coroada rainha na Pérsia', referencia: 'Est 2', tipo: 'exilio' },
  { ano: '~430 a.C.', evento: 'Haman conspira para destruir os judeus', referencia: 'Est 3', tipo: 'exilio' },
  { ano: '~430 a.C.', evento: 'Ester intercede; Haman enforcado', referencia: 'Est 7', tipo: 'exilio' },
  { ano: '~430 a.C.', evento: 'Purim instituído como festa', referencia: 'Est 9', tipo: 'exilio' },
  { ano: '~430 a.C.', evento: 'Malaquias, último profeta do AT', referencia: 'Ml 1-4', tipo: 'profeta' },
  { ano: '~350 a.C.', evento: 'O Testamento grego começa a ser traduzido', referencia: 'Septuaginta', tipo: 'exilio' },
  { ano: '~331 a.C.', evento: 'Alexandre, o Grande, conquista o Oriente Próximo', referencia: 'Fontes históricas', tipo: 'exilio' },
  { ano: '~323 a.C.', evento: 'Morte de Alexandre; divisão do império', referencia: 'Fontes históricas', tipo: 'exilio' },
  { ano: '~300 a.C.', evento: 'Os lukeus governam a Judeia', referencia: 'Fontes históricas', tipo: 'exilio' },
  { ano: '~250 a.C.', evento: 'Tradução dos LXX concluída em Alexandria', referencia: 'Fontes históricas', tipo: 'exilio' },
  { ano: '~200 a.C.', evento: 'Antíoco III epifânio domina a Judeia', referencia: '1 Mac 1:10-15', tipo: 'exilio' },
  { ano: '~175 a.C.', evento: 'Antíoco IV Epifânio profana o Templo', referencia: '1 Mac 1:20-28', tipo: 'exilio' },
  { ano: '~168 a.C.', evento: 'Antíoco IV profana o altar e mata judeus', referencia: '1 Mac 1:29-41', tipo: 'exilio' },
  { ano: '~167 a.C.', evento: 'Rebelião dos Macabeus sob Matatias', referencia: '1 Mac 2:1-28', tipo: 'exilio' },
  { ano: '~166 a.C.', evento: 'Judas Macabeu derrota os seleucidas', referencia: '1 Mac 3-4', tipo: 'exilio' },
  { ano: '~164 a.C.', evento: 'Rededicção do Templo (Hanucá)', referencia: '1 Mac 4:36-59', tipo: 'exilio' },
  { ano: '~164 a.C.', evento: 'Morte de Antíoco IV Epifânio', referencia: '1 Mac 6:1-17', tipo: 'exilio' },

  // ═══════════════════════════════════════════════════════════════════
  // NOVO TESTAMENTO – INFÂNCIA E INÍCIO DO MINISTÉRIO (~5 a.C.–27 d.C.)
  // ═══════════════════════════════════════════════════════════════════
  { ano: '~6 a.C.', evento: 'Gabriel anuncia o nascimento de João Batista', referencia: 'Lc 1:5-25', tipo: 'vinda' },
  { ano: '~6 a.C.', evento: 'Gabriel anuncia o nascimento de Jesus a Maria', referencia: 'Lc 1:26-38', tipo: 'vinda' },
  { ano: '~6 a.C.', evento: 'Maria visita Isabel; João salta no ventre', referencia: 'Lc 1:39-45', tipo: 'vinda' },
  { ano: '~5 a.C.', evento: 'Nascimento de João Batista', referencia: 'Lc 1:57-80', tipo: 'vinda' },
  { ano: '~5 a.C.', evento: 'Nascimento de Jesus em Belém', referencia: 'Mt 1:18-25; Lc 2:1-7', tipo: 'vinda' },
  { ano: '~5 a.C.', evento: 'Anjos anunciam o nascimento aos pastores', referencia: 'Lc 2:8-14', tipo: 'vinda' },
  { ano: '~5 a.C.', evento: 'Circuncisão de Jesus no oitavo dia', referencia: 'Lc 2:21', tipo: 'vinda' },
  { ano: '~5 a.C.', evento: 'Apresentação no Templo; Simeão e Ana', referencia: 'Lc 2:22-38', tipo: 'vinda' },
  { ano: '~4 a.C.', evento: 'Magos do oriente visitam Jesus e o adoram', referencia: 'Mt 2:1-12', tipo: 'vinda' },
  { ano: '~4 a.C.', evento: 'Fuga para o Egito; Massacre dos inocentes', referencia: 'Mt 2:13-18', tipo: 'vinda' },
  { ano: '~4 a.C.', evento: 'Retorno do Egito; Jesus cresce em Nazaré', referencia: 'Mt 2:19-23; Lc 2:39-52', tipo: 'vinda' },
  { ano: '~26 d.C.', evento: 'João Batista prega no deserto', referencia: 'Mt 3:1-12', tipo: 'vinda' },
  { ano: '~27 d.C.', evento: 'Batismo de Jesus no Jordão', referencia: 'Mt 3:13-17', tipo: 'vinda' },
  { ano: '~27 d.C.', evento: 'Jesus tentado no deserto por 40 dias', referencia: 'Mt 4:1-11', tipo: 'vinda' },
  { ano: '~27 d.C.', evento: 'João Batista preso por Herodes', referencia: 'Mt 14:3-5', tipo: 'vinda' },

  // ═══════════════════════════════════════════════════════════════════
  // MINISTÉRIO PÚBLICO DE JESUS (~27–30 d.C.)
  // ═══════════════════════════════════════════════════════════════════
  { ano: '~27 d.C.', evento: 'Jesus chama os primeiros discípulos', referencia: 'Mt 4:18-22', tipo: 'vinda' },
  { ano: '~27 d.C.', evento: 'Bodas de Caná: primeiro milagre', referencia: 'Jo 2:1-11', tipo: 'vinda' },
  { ano: '~27 d.C.', evento: 'Jesus limpa o Templo pela primeira vez', referencia: 'Jo 2:13-22', tipo: 'vinda' },
  { ano: '~27 d.C.', evento: 'Nicodemos visita Jesus à noite', referencia: 'Jo 3:1-21', tipo: 'vinda' },
  { ano: '~27 d.C.', evento: 'Jesus e a samaritana junto ao poço', referencia: 'Jo 4:1-42', tipo: 'vinda' },
  { ano: '~27 d.C.', evento: 'Expulsão dos demônios nos gerasenos', referencia: 'Mc 5:1-20', tipo: 'vinda' },
  { ano: '~28 d.C.', evento: 'Paralítico curado em Cafarnaum', referencia: 'Mc 2:1-12', tipo: 'vinda' },
  { ano: '~28 d.C.', evento: 'Mateus chamado; janta com publicanos', referencia: 'Mc 2:13-17', tipo: 'vinda' },
  { ano: '~28 d.C.', evento: 'Disputa sobre o sábado', referencia: 'Mc 2:23-3:6', tipo: 'vinda' },
  { ano: '~28 d.C.', evento: 'Jesus reúne os doze apóstolos', referencia: 'Mc 3:13-19', tipo: 'vinda' },
  { ano: '~28 d.C.', evento: 'Sermão do Monte: introdução (bem-aventuranças)', referencia: 'Mt 5:1-12', tipo: 'vinda' },
  { ano: '~28 d.C.', evento: 'Sermão do Monte: Lei e ética superior', referencia: 'Mt 5:13-48', tipo: 'vinda' },
  { ano: '~28 d.C.', evento: 'Sermão do Monte: oração, jejum e tesouros', referencia: 'Mt 6:1-34', tipo: 'vinda' },
  { ano: '~28 d.C.', evento: 'Sermão do Monte: julgar não, pedir e receber', referencia: 'Mt 7:1-29', tipo: 'vinda' },
  { ano: '~28 d.C.', evento: 'Curou o servo do centurião em Cafarnaum', referencia: 'Mt 8:5-13', tipo: 'vinda' },
  { ano: '~28 d.C.', evento: 'Tempestade calmada no mar da Galileia', referencia: 'Mt 8:23-27', tipo: 'vinda' },
  { ano: '~28 d.C.', evento: 'Dois endemoninhados nas Gerasa', referencia: 'Mt 8:28-34', tipo: 'vinda' },
  { ano: '~28 d.C.', evento: 'Paralítico derrubado pelo teto', referencia: 'Mc 2:1-12', tipo: 'vinda' },
  { ano: '~28 d.C.', evento: 'Mulher com hemorragia curada', referencia: 'Mc 5:25-34', tipo: 'vinda' },
  { ano: '~28 d.C.', evento: 'Jairus: filha ressuscitada', referencia: 'Mc 5:21-43', tipo: 'vinda' },
  { ano: '~28 d.C.', evento: 'Nariz e mãos seca e curada', referencia: 'Mt 12:9-13', tipo: 'vinda' },
  { ano: '~28 d.C.', evento: 'Jesus rejeitado em Nazaré', referencia: 'Lc 4:16-30', tipo: 'vinda' },
  { ano: '~28 d.C.', evento: 'Parábolas do reino: semeador, joio, mostarda', referencia: 'Mt 13', tipo: 'vinda' },
  { ano: '~28 d.C.', evento: 'João Batista degolado na prisão', referencia: 'Mt 14:6-12', tipo: 'vinda' },
  { ano: '~28 d.C.', evento: 'Alimentação de 5000 pessoas', referencia: 'Mt 14:13-21', tipo: 'vinda' },
  { ano: '~28 d.C.', evento: 'Jesus caminha sobre as águas', referencia: 'Mt 14:22-33', tipo: 'vinda' },
  { ano: '~28 d.C.', evento: 'Alimentação de 4000 pessoas', referencia: 'Mt 15:32-39', tipo: 'vinda' },
  { ano: '~28 d.C.', evento: 'Pedro confessa: Tu és o Messias', referencia: 'Mt 16:13-20', tipo: 'vinda' },
  { ano: '~28 d.C.', evento: 'Transfiguração no monte', referencia: 'Mt 17:1-8', tipo: 'vinda' },
  { ano: '~28 d.C.', evento: 'Expulsão do espíromo que não saía', referencia: 'Mc 9:14-29', tipo: 'vinda' },
  { ano: '~28 d.C.', evento: 'Parábola do filho pródigo', referencia: 'Lc 15:11-32', tipo: 'vinda' },
  { ano: '~28 d.C.', evento: 'Lázaro ressuscitado depois de 4 dias', referencia: 'Jo 11:1-44', tipo: 'vinda' },
  { ano: '~29 d.C.', evento: 'Peregrinação de Jesus para Jerusalém', referencia: 'Jo 7-10', tipo: 'vinda' },
  { ano: '~29 d.C.', evento: 'Mulher pegue em adultério; Jesus e a pedra', referencia: 'Jo 8:1-11', tipo: 'vinda' },
  { ano: '~29 d.C.', evento: 'Jesus é a porta e o bom pastor', referencia: 'Jo 10:1-18', tipo: 'vinda' },
  { ano: '~29 d.C.', evento: 'Zaqueu sobe na figueira e Jesus o visita', referencia: 'Lc 19:1-10', tipo: 'vinda' },
  { ano: '~29 d.C.', evento: 'Parábola dos talentos', referencia: 'Mt 25:14-30', tipo: 'vinda' },
  { ano: '~30 d.C.', evento: 'Última Ceia: instituição da ceia do Senhor', referencia: 'Mt 26:17-30', tipo: 'vinda' },
  { ano: '~30 d.C.', evento: 'Lava-pés: exemplo de humildade', referencia: 'Jo 13:1-20', tipo: 'vinda' },
  { ano: '~30 d.C.', evento: 'Discurso de despedida; Paráclito prometido', referencia: 'Jo 14-17', tipo: 'vinda' },
  { ano: '~30 d.C.', evento: 'Agonia no Getsêmani', referencia: 'Mt 26:36-46', tipo: 'vinda' },
  { ano: '~30 d.C.', evento: 'Judas beija Jesus; traição', referencia: 'Mt 26:47-56', tipo: 'vinda' },
  { ano: '~30 d.C.', evento: 'Jesus julgado pelo Sinédrio (Caifás)', referencia: 'Mt 26:57-68', tipo: 'vinda' },
  { ano: '~30 d.C.', evento: 'Pedro nega Jesus três vezes', referencia: 'Mt 26:69-75', tipo: 'vinda' },
  { ano: '~30 d.C.', evento: 'Judas se arrepende e se enforca', referencia: 'Mt 27:3-10', tipo: 'vinda' },
  { ano: '~30 d.C.', evento: 'Jesus diante de Pilatos; condenado', referencia: 'Mt 27:11-26', tipo: 'vinda' },
  { ano: '~30 d.C.', evento: 'Jesus flagelado e coroado de espinhos', referencia: 'Mt 27:27-31', tipo: 'vinda' },
  { ano: '~30 d.C.', evento: 'Crucificação no Gólgota', referencia: 'Mt 27:32-54', tipo: 'vinda' },
  { ano: '~30 d.C.', evento: 'Sete palavras da cruz', referencia: 'Mt 27:45-50; Lc 23:34-46; Jo 19:25-30', tipo: 'vinda' },
  { ano: '~30 d.C.', evento: 'Morte de Jesus; véu do Templo rasgado', referencia: 'Mt 27:50-54', tipo: 'vinda' },
  { ano: '~30 d.C.', evento: 'Sepultamento de Jesus no túmulo novo', referencia: 'Mt 27:57-61', tipo: 'vinda' },
  { ano: '~30 d.C.', evento: 'Ressurreição de Jesus ao terceiro dia', referencia: 'Mt 28:1-10', tipo: 'vinda' },
  { ano: '~30 d.C.', evento: 'Jesus aparece aos discípulos com Tomé', referencia: 'Jo 20:19-29', tipo: 'vinda' },
  { ano: '~30 d.C.', evento: 'Jesus aparece a Pedro junto ao mar da Galileia', referencia: 'Jo 21:1-23', tipo: 'vinda' },
  { ano: '~30 d.C.', evento: 'Grande comissão: ide e fazei discípulos', referencia: 'Mt 28:16-20', tipo: 'vinda' },
  { ano: '~33 d.C.', evento: 'Ascensão de Jesus ao céu', referencia: 'At 1:9-14', tipo: 'vinda' },

  // ═══════════════════════════════════════════════════════════════════
  // IGREJA PRIMITIVA (~33–70 d.C.)
  // ═══════════════════════════════════════════════════════════════════
  { ano: '~33 d.C.', evento: 'Pentecostes: descida do Espírito Santo', referencia: 'At 2:1-13', tipo: 'igreja' },
  { ano: '~33 d.C.', evento: 'Pedro prega; 3000 convertidos', referencia: 'At 2:14-41', tipo: 'igreja' },
  { ano: '~33 d.C.', evento: 'Vida comunitária da igreja primitiva', referencia: 'At 2:42-47', tipo: 'igreja' },
  { ano: '~33 d.C.', evento: 'Pedro e João curam o aleijado no Templo', referencia: 'At 3:1-10', tipo: 'igreja' },
  { ano: '~33 d.C.', evento: 'Pedro e João presos pelo Sinédrio', referencia: 'At 4:1-22', tipo: 'igreja' },
  { ano: '~33 d.C.', evento: 'Ananias e Safira mentem e morrem', referencia: 'At 5:1-11', tipo: 'igreja' },
  { ano: '~33 d.C.', evento: 'Milagres múltiplos; sombras curam', referencia: 'At 5:12-16', tipo: 'igreja' },
  { ano: '~33 d.C.', evento: 'Apóstolos presos e libertados por anjo', referencia: 'At 5:17-25', tipo: 'igreja' },
  { ano: '~33 d.C.', evento: 'Gamaliel aconselha o Sinédrio', referencia: 'At 5:34-42', tipo: 'igreja' },
  { ano: '~33 d.C.', evento: 'Escolha dos sete diáconos', referencia: 'At 6:1-7', tipo: 'igreja' },
  { ano: '~34 d.C.', evento: 'Estêvão: debate e prisão', referencia: 'At 6:8-15', tipo: 'igreja' },
  { ano: '~34 d.C.', evento: 'Discurso de Estêvão (Atos 7)', referencia: 'At 7:1-53', tipo: 'igreja' },
  { ano: '~34 d.C.', evento: 'Martírio de Estêvão: primeiro mártir', referencia: 'At 7:54-60', tipo: 'igreja' },
  { ano: '~34 d.C.', evento: 'Perseguição: igreja espalhada pela Samaria', referencia: 'At 8:1-4', tipo: 'igreja' },
  { ano: '~34 d.C.', evento: 'Filipe evangelia o eunuco etíope', referencia: 'At 8:26-40', tipo: 'igreja' },
  { ano: '~35 d.C.', evento: 'Conversão de Saulo no caminho de Damasco', referencia: 'At 9:1-19', tipo: 'igreja' },
  { ano: '~35 d.C.', evento: 'Ananias cura a cegueira de Saulo', referencia: 'At 9:10-19', tipo: 'igreja' },
  { ano: '~36 d.C.', evento: 'Pedro cura o paralítico em Lida', referencia: 'At 9:32-35', tipo: 'igreja' },
  { ano: '~36 d.C.', evento: 'Pedro ressuscita Tabita em Jope', referencia: 'At 9:36-43', tipo: 'igreja' },
  { ano: '~37 d.C.', evento: 'Cornélio: primeiro gentio convertido', referencia: 'At 10', tipo: 'igreja' },
  { ano: '~37 d.C.', evento: 'Igreja em Antioquia: primeiros cristãos', referencia: 'At 11:19-26', tipo: 'igreja' },
  { ano: '~44 d.C.', evento: 'Tiago, irmão de João, decapitado', referencia: 'At 12:1-2', tipo: 'igreja' },
  { ano: '~44 d.C.', evento: 'Pedro preso; libertado por anjo', referencia: 'At 12:3-17', tipo: 'igreja' },
  { ano: '~44 d.C.', evento: 'Herodes Agripa I morre devorado de vermes', referencia: 'At 12:20-23', tipo: 'igreja' },
  { ano: '~46 d.C.', evento: 'Barnabé e Saulo mandados a Antioquia', referencia: 'At 11:25-26', tipo: 'igreja' },
  { ano: '~47 d.C.', evento: 'Primeira viagem missionária começa', referencia: 'At 13:1-3', tipo: 'igreja' },
  { ano: '~47 d.C.', evento: 'Sérgio Paulo convertido em Chipre', referencia: 'At 13:4-12', tipo: 'igreja' },
  { ano: '~48 d.C.', evento: 'Paulo e Barnabé em Pisídia e.Iconio', referencia: 'At 13:13-14:28', tipo: 'igreja' },
  { ano: '~49 d.C.', evento: 'Concílio de Jerusalém: gentios não precisam circuncidar', referencia: 'At 15', tipo: 'igreja' },
  { ano: '~50 d.C.', evento: 'Segunda viagem missionária de Paulo', referencia: 'At 15:36-18:22', tipo: 'igreja' },
  { ano: '~50 d.C.', evento: 'Paulo e Silas presos em Filipos', referencia: 'At 16:16-40', tipo: 'igreja' },
  { ano: '~51 d.C.', evento: 'Paulo prega em Tessalônica e Bereia', referencia: 'At 17:1-14', tipo: 'igreja' },
  { ano: '~51 d.C.', evento: 'Paulo no Areópago de Atenas', referencia: 'At 17:16-34', tipo: 'igreja' },
  { ano: '~52 d.C.', evento: 'Paulo em Corinto; casa de Aquila e Priscila', referencia: 'At 18:1-17', tipo: 'igreja' },
  { ano: '~52 d.C.', evento: 'Paulo escreve 1 Tessalonicenses', referencia: '1 Ts', tipo: 'igreja' },
  { ano: '~53 d.C.', evento: 'Paulo escreve 2 Tessalonicenses', referencia: '2 Ts', tipo: 'igreja' },
  { ano: '~53 d.C.', evento: 'Terceira viagem missionária de Paulo', referencia: 'At 18:23-21:17', tipo: 'igreja' },
  { ano: '~54 d.C.', evento: 'Paulo em Éfeso por três anos', referencia: 'At 19-20', tipo: 'igreja' },
  { ano: '~55 d.C.', evento: 'Paulo escreve 1 Coríntios', referencia: '1 Co', tipo: 'igreja' },
  { ano: '~55 d.C.', evento: 'Paulo escreve 2 Coríntios', referencia: '2 Co', tipo: 'igreja' },
  { ano: '~57 d.C.', evento: 'Paulo escreve Romanos', referencia: 'Rm', tipo: 'igreja' },
  { ano: '~57 d.C.', evento: 'Paulo preso em Jerusalém', referencia: 'At 21:27-36', tipo: 'igreja' },
  { ano: '~58 d.C.', evento: 'Paulo diante de Félix em Cesareia', referencia: 'At 24', tipo: 'igreja' },
  { ano: '~59 d.C.', evento: 'Paulo diante de Fésto e Agripa', referencia: 'At 25-26', tipo: 'igreja' },
  { ano: '~60 d.C.', evento: 'Paulo naufraga em Malta', referencia: 'At 27-28', tipo: 'igreja' },
  { ano: '~60 d.C.', evento: 'Paulo chega a Roma; prega sob prisão', referencia: 'At 28:16-31', tipo: 'igreja' },
  { ano: '~60 d.C.', evento: 'Paulo escreve Efésios', referencia: 'Ef', tipo: 'igreja' },
  { ano: '~61 d.C.', evento: 'Paulo escreve Filipenses', referencia: 'Fl', tipo: 'igreja' },
  { ano: '~62 d.C.', evento: 'Paulo escreve Colossenses e Filemom', referencia: 'Cl; Fm', tipo: 'igreja' },
  { ano: '~62 d.C.', evento: 'Pedro escreve 1 Pedro', referencia: '1 Pe', tipo: 'igreja' },
  { ano: '~63 d.C.', evento: 'Pedro escreve 2 Pedro', referencia: '2 Pe', tipo: 'igreja' },
  { ano: '~63 d.C.', evento: 'Tiago escreve a Epístola de Tiago', referencia: 'Tg', tipo: 'igreja' },
  { ano: '~64 d.C.', evento: 'Grande incêndio de Roma; Nero culpa cristãos', referencia: 'Tacitus, Anais 15.44', tipo: 'igreja' },
  { ano: '~64 d.C.', evento: 'Martírio de Pedro (crucificado de cabeça para baixo)', referencia: 'Tradição', tipo: 'igreja' },
  { ano: '~65 d.C.', evento: 'Martírio de Paulo (decapitado)', referencia: 'Tradição', tipo: 'igreja' },
  { ano: '~65 d.C.', evento: 'Paulo escreve 1 Timóteo', referencia: '1 Tm', tipo: 'igreja' },
  { ano: '~66 d.C.', evento: 'Paulo escreve 2 Timóteo (última carta)', referencia: '2 Tm', tipo: 'igreja' },
  { ano: '~66 d.C.', evento: 'Rebeldia dos zelotes contra Roma', referencia: 'Fontes históricas', tipo: 'igreja' },
  { ano: '~68 d.C.', evento: 'João escreve o Evangelho de João', referencia: 'Jo', tipo: 'igreja' },
  { ano: '~69 d.C.', evento: 'Ano dos quatro imperadores romanos', referencia: 'Fontes históricas', tipo: 'igreja' },
  { ano: '~70 d.C.', evento: 'Destruição de Jerusalém e do Templo por Tito', referencia: 'Fontes históricas', tipo: 'igreja' },
  { ano: '~70 d.C.', evento: 'João escreve as Epístolas de João', referencia: '1-3 Jo', tipo: 'igreja' },
  { ano: '~85 d.C.', evento: 'Esdras e Neemias: reformas na Judeia', referencia: 'Fontes históricas', tipo: 'igreja' },
  { ano: '~90 d.C.', evento: 'Lucas escreve o Evangelho de Lucas', referencia: 'Lc', tipo: 'igreja' },
  { ano: '~90 d.C.', evento: 'Lucas escreve o Livro de Atos', referencia: 'At', tipo: 'igreja' },
  { ano: '~95 d.C.', evento: 'João escreve o Apocalipse em Patmos', referencia: 'Ap 1', tipo: 'igreja' },
  { ano: '~96 d.C.', evento: 'Rebeldia de Bar Koseba (Bar Kokhba)', referencia: 'Fontes históricas', tipo: 'igreja' },
  { ano: '~100 d.C.', evento: 'João escreve o Evangelho de João (segunda edição)', referencia: 'Jo 21', tipo: 'igreja' },
];
