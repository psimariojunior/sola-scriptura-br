export type ConceitoCategoria = 'pessoa' | 'tema' | 'lugar' | 'evento' | 'livro';

export interface ConceitoNode {
  id: string;
  label: string;
  categoria: ConceitoCategoria;
  descricao: string;
  versiculos: string[];
  cor: string;
  icone: string;
  x?: number;
  y?: number;
}

export interface ConceitoEdge {
  source: string;
  target: string;
  label: string;
  tipo: 'relaciona' | 'autor' | 'ocorre_em' | 'ensina' | 'prediz' | 'cumpre';
}

export const CONCEITO_CATEGORIA_CORES: Record<ConceitoCategoria, string> = {
  pessoa: '#3b82f6',
  tema: '#a855f7',
  lugar: '#22c55e',
  evento: '#f59e0b',
  livro: '#ef4444',
};

export const CONCEITO_CATEGORIA_ICONE: Record<ConceitoCategoria, string> = {
  pessoa: '👤',
  tema: '💡',
  lugar: '📍',
  evento: '⚡',
  livro: '📖',
};

export const conceitosNodes: ConceitoNode[] = [
  // ═══ PESSOAS ═══
  { id: 'jesus', label: 'Jesus Cristo', categoria: 'pessoa', descricao: 'Filho de Deus, Messias prometido, Salvador da humanidade. Centro de toda a Bíblia.', versiculos: ['Jo 1:1-14', 'Mt 1:21', 'Fp 2:5-11'], cor: '#f59e0b', icone: '✝️' },
  { id: 'abraham', label: 'Abraão', categoria: 'pessoa', descricao: 'Pai da fé. Chamado por Deus para ser pai de muitas nações.', versiculos: ['Gn 12:1-3', 'Gn 15:6', 'Hb 11:8-19'], cor: '#3b82f6', icone: '👴' },
  { id: 'moses', label: 'Moisés', categoria: 'pessoa', descricao: 'Libertador de Israel, legislador, profeta. Liderou o Êxodo do Egito.', versiculos: ['Ex 3:1-15', 'Ex 20:1-17', 'Dt 34:10'], cor: '#3b82f6', icone: '📜' },
  { id: 'david', label: 'Davi', categoria: 'pessoa', descricao: 'Rei de Israel, poeta, guerreiro. Autor de muitos Salmos. Linhagem de Jesus.', versiculos: ['1 Sm 16:1-13', 'Sl 23', 'Mt 1:1'], cor: '#3b82f6', icone: '👑' },
  { id: 'paulo', label: 'Paulo', categoria: 'pessoa', descricao: 'Apóstolo dos gentios, autor de 13 epístolas. Perseguiu a igreja antes da conversão.', versiculos: ['At 9:1-19', 'Rm 1:1', 'Gl 1:13-17'], cor: '#3b82f6', icone: '✍️' },
  { id: 'pedro', label: 'Pedro', categoria: 'pessoa', descricao: 'Apóstolo líder, pregou no Pentecostes. Três vezes negou Jesus.', versiculos: ['Mt 16:16-19', 'At 2:1-41', '1 Pe 1:1'], cor: '#3b82f6', icone: '🪨' },
  { id: 'maria', label: 'Maria', categoria: 'pessoa', descricao: 'Mãe de Jesus, concebeu pelo Espírito Santo. Modelo de fé e obediência.', versiculos: ['Lc 1:26-38', 'Lc 2:19', 'Jo 19:25-27'], cor: '#ec4899', icone: '🌸' },
  { id: 'daniel', label: 'Daniel', categoria: 'pessoa', descricao: 'Profeta na corte babilônica. Visionário, interprete de sonhos.', versiculos: ['Dn 1:1-21', 'Dn 7:1-14', 'Dn 9:1-27'], cor: '#3b82f6', icone: '🦁' },
  { id: 'elias', label: 'Elias', categoria: 'pessoa', descricao: 'Profeta que confrontou Baal, subiu ao céu em um carro de fogo.', versiculos: ['1 Rs 17:1', '1 Rs 18:17-40', '2 Rs 2:11'], cor: '#3b82f6', icone: '🔥' },
  { id: 'israel', label: 'Israel (Jacó)', categoria: 'pessoa', descricao: 'Pai das 12 tribos. Lutou com Deus e recebeu o nome Israel.', versiculos: ['Gn 32:22-32', 'Gn 49:1-28'], cor: '#3b82f6', icone: '🏛️' },
  { id: 'jose', label: 'José', categoria: 'pessoa', descricao: 'Filho de Jacó, vendido como escravo. Intérprete de sonhos no Egito.', versiculos: ['Gn 37:1-36', 'Gn 50:15-21'], cor: '#3b82f6', icone: '🌈' },

  // ═══ TEMAS ═══
  { id: 'fe', label: 'Fé', categoria: 'tema', descricao: 'Confiança plena em Deus. Sem fé é impossível agradá-Lo.', versiculos: ['Hb 11:1', 'Rm 10:17', 'Gn 15:6'], cor: '#a855f7', icone: '✨' },
  { id: 'graca', label: 'Graça', categoria: 'tema', descricao: 'Favor imerecido de Deus. A graça salva, não as obras.', versiculos: ['Ef 2:8-9', 'Rm 3:24', 'Tt 2:11'], cor: '#a855f7', icone: '💝' },
  { id: 'alianca', label: 'Aliança', categoria: 'tema', descricao: 'Pacto sagrado entre Deus e o povo. Do dilúvio ao novo pacto em Cristo.', versiculos: ['Gn 9:9', 'Gn 15:18', 'Lc 22:20'], cor: '#a855f7', icone: '🤝' },
  { id: 'reino', label: 'Reino de Deus', categoria: 'tema', descricao: 'Reinado soberano de Deus. Presente agora e futuro pleno.', versiculos: ['Mt 6:10', 'Mc 1:15', 'Ap 11:15'], cor: '#a855f7', icone: '👑' },
  { id: 'profecia', label: 'Profecia', categoria: 'tema', descricao: 'Palavra de Deus sobre o futuro. 100% das profecias bíblicas se cumpriram.', versiculos: ['2 Pe 1:21', 'Is 46:10', 'Ap 1:1'], cor: '#a855f7', icone: '🔮' },
  { id: 'justificacao', label: 'Justificação', categoria: 'tema', descricao: 'Ser declarado justo diante de Deus pela fé em Jesus.', versiculos: ['Rm 5:1', 'Rm 3:28', 'Gl 2:16'], cor: '#a855f7', icone: '⚖️' },
  { id: 'santificacao', label: 'Santificação', categoria: 'tema', descricao: 'Processo de ser separado para Deus, renovado pelo Espírito.', versiculos: ['1 Ts 4:3', 'Rm 12:1-2', 'Ef 5:25-26'], cor: '#a855f7', icone: '🕊️' },
  { id: 'redencao', label: 'Redenção', categoria: 'tema', descricao: 'Resgate do pecado pelo sangue de Cristo. Liberdade eterna.', versiculos: ['Ef 1:7', '1 Pe 1:18-19', 'Is 53:5'], cor: '#a855f7', icone: '🔓' },
  { id: 'juizo', label: 'Juízo', categoria: 'tema', descricao: 'Justiça divina sobre o pecado. Juízo final e vitória do bem.', versiculos: ['Ap 20:11-15', 'Rm 14:12', 'Hb 9:27'], cor: '#a855f7', icone: '⚖️' },
  { id: 'missao', label: 'Missão', categoria: 'tema', descricao: 'A Grande Comissão: ir e fazer discípulos de todas as nações.', versiculos: ['Mt 28:18-20', 'At 1:8', 'Rm 10:14-15'], cor: '#a855f7', icone: '🌍' },

  // ═══ LUGARES ═══
  { id: 'jerusalem', label: 'Jerusalém', categoria: 'lugar', descricao: 'Cidade sagrada, centro do culto. Local da paixão e ressurreição.', versiculos: ['Sl 122:1', 'Mt 21:1', 'At 1:8'], cor: '#22c55e', icone: '🏛️' },
  { id: 'sinai', label: 'Monte Sinai', categoria: 'lugar', descricao: 'Onde Moisés recebeu os Dez Mandamentos. A presença de Deus.', versiculos: ['Ex 19:1-20', 'Ex 20:1-17'], cor: '#22c55e', icone: '⛰️' },
  { id: 'betlehem', label: 'Belém', categoria: 'lugar', descricao: 'Cidade natal de Jesus e Davi. Estrela guiou os magos.', versiculos: ['Mq 5:2', 'Mt 2:1', 'Lc 2:4-7'], cor: '#22c55e', icone: '⭐' },
  { id: 'galileia', label: 'Galileia', categoria: 'lugar', descricao: 'Região onde Jesus cresceu e começou seu ministério.', versiculos: ['Mt 4:12-17', 'Mc 1:14-15'], cor: '#22c55e', icone: '🏞️' },
  { id: 'roma', label: 'Roma', categoria: 'lugar', descricao: 'Capital do Império Romano. Paulo foi martirizado lá.', versiculos: ['At 28:14-31', 'Rm 1:7'], cor: '#22c55e', icone: '🏛️' },
  { id: 'calvario', label: 'Calvário (Gólgota)', categoria: 'lugar', descricao: 'Colina onde Jesus foi crucificado. O sacrifício perfeito.', versiculos: ['Mt 27:33', 'Mc 15:22', 'Lc 23:33'], cor: '#22c55e', icone: '✝️' },

  // ═══ EVENTOS ═══
  { id: 'criacao', label: 'Criação', categoria: 'evento', descricao: 'Deus criou os céus e a terra em 6 dias. Tudo era "muito bom".', versiculos: ['Gn 1:1-31', 'Jo 1:1-3', 'Cl 1:16'], cor: '#f59e0b', icone: '🌍' },
  { id: 'quedahumana', label: 'Queda do Homem', categoria: 'evento', descricao: 'Adão e Eva desobedeceram. O pecado entrou no mundo.', versiculos: ['Gn 3:1-24', 'Rm 5:12'], cor: '#f59e0b', icone: '🍎' },
  { id: 'diluvio', label: 'Dilúvio', categoria: 'evento', descricao: 'Deus destruiu a maldade com águas. Noé e a arca salvaram a humanidade.', versiculos: ['Gn 6:1-9:17'], cor: '#f59e0b', icone: '🌊' },
  { id: 'exodo', label: 'Êxodo', categoria: 'evento', descricao: 'Libertação de Israel do Egito. O maior ato redentor do AT.', versiculos: ['Ex 12:1-42', 'Ex 14:1-31'], cor: '#f59e0b', icone: '🔥' },
  { id: 'entregalei', label: 'Entrega da Lei', categoria: 'evento', descricao: 'Deus entregou os Dez Mandamentos no Sinai.', versiculos: ['Ex 20:1-17', 'Dt 5:6-21'], cor: '#f59e0b', icone: '📜' },
  { id: 'nascimentojesus', label: 'Nascimento de Jesus', categoria: 'evento', descricao: 'O Verbo se fez carne. Deus veio habitar entre os homens.', versiculos: ['Mt 1:18-25', 'Lc 2:1-20'], cor: '#f59e0b', icone: '⭐' },
  { id: 'crucificacao', label: 'Crucificação', categoria: 'evento', descricao: 'Jesus morreu na cruz pelo pecado da humanidade. O sacrifício perfeito.', versiculos: ['Mt 27:27-50', '1 Co 15:3-4'], cor: '#f59e0b', icone: '✝️' },
  { id: 'ressurreicao', label: 'Ressurreição', categoria: 'evento', descricao: 'Jesus ressuscitou ao terceiro dia. Vitória sobre a morte.', versiculos: ['Mt 28:1-10', '1 Co 15:3-8'], cor: '#f59e0b', icone: '🌅' },
  { id: 'pentecostes', label: 'Pentecostes', categoria: 'evento', descricao: 'O Espírito Santo desceu sobre os discípulos. A igreja nasceu.', versiculos: ['At 2:1-41'], cor: '#f59e0b', icone: '🔥' },
  { id: 'segundavinda', label: 'Segunda Vinda', categoria: 'evento', descricao: 'Jesus voltará para julgar os vivos e os mortos e estabelecer Seu reino.', versiculos: ['Mt 24:30-31', '1 Ts 4:16-17', 'Ap 19:11-16'], cor: '#f59e0b', icone: '☁️' },

  // ═══ LIVROS ═══
  { id: 'livro_gn', label: 'Gênesis', categoria: 'livro', descricao: 'Livro da origem: criação, queda, dilúvio, patriarcas.', versiculos: ['Gn 1:1'], cor: '#ef4444', icone: '📖' },
  { id: 'livro_ex', label: 'Êxodo', categoria: 'livro', descricao: 'A libertação: do Egito ao Sinai, a Lei e o tabernáculo.', versiculos: ['Ex 1:1'], cor: '#ef4444', icone: '📖' },
  { id: 'livro_sl', label: 'Salmos', categoria: 'livro', descricao: 'Livro de louvor e oração. 150 cânticles de fé.', versiculos: ['Sl 1:1'], cor: '#ef4444', icone: '📖' },
  { id: 'livro_is', label: 'Isaías', categoria: 'livro', descricao: 'Profeta messiânico. Profecias sobre Jesus e o futuro.', versiculos: ['Is 1:1'], cor: '#ef4444', icone: '📖' },
  { id: 'livro_mt', label: 'Mateus', categoria: 'livro', descricao: 'Evangelho para os judeus. Jesus como Messias rei.', versiculos: ['Mt 1:1'], cor: '#ef4444', icone: '📖' },
  { id: 'livro_jo', label: 'João', categoria: 'livro', descricao: 'Evangelho da divindade de Cristo. O Verbo encarnado.', versiculos: ['Jo 1:1'], cor: '#ef4444', icone: '📖' },
  { id: 'livro_rm', label: 'Romanos', categoria: 'livro', descricao: 'Epístola da justificação pela fé. Teologia sistemática.', versiculos: ['Rm 1:1'], cor: '#ef4444', icone: '📖' },
  { id: 'livro_ap', label: 'Apocalipse', categoria: 'livro', descricao: 'Revelação final: vitória de Cristo, juízo e nova criação.', versiculos: ['Ap 1:1'], cor: '#ef4444', icone: '📖' },
];

export const conceitosEdges: ConceitoEdge[] = [
  // Conexões de Jesus
  { source: 'jesus', target: 'abraham', label: 'promessa', tipo: 'relaciona' },
  { source: 'jesus', target: 'moses', label: 'cumpre a Lei', tipo: 'cumpre' },
  { source: 'jesus', target: 'david', label: 'linhagem', tipo: 'relaciona' },
  { source: 'jesus', target: 'maria', label: 'encarnação', tipo: 'relaciona' },
  { source: 'jesus', target: 'betlehem', label: 'nasceu em', tipo: 'ocorre_em' },
  { source: 'jesus', target: 'galileia', label: 'ministério em', tipo: 'ocorre_em' },
  { source: 'jesus', target: 'jerusalem', label: 'paixão em', tipo: 'ocorre_em' },
  { source: 'jesus', target: 'calvario', label: 'crucificado em', tipo: 'ocorre_em' },
  { source: 'jesus', target: 'nascimentojesus', label: 'nascimento', tipo: 'relaciona' },
  { source: 'jesus', target: 'crucificacao', label: 'morte', tipo: 'relaciona' },
  { source: 'jesus', target: 'ressurreicao', label: 'ressurreição', tipo: 'relaciona' },
  { source: 'jesus', target: 'segundavinda', label: 'volta', tipo: 'relaciona' },
  { source: 'jesus', target: 'fe', label: 'fundamento', tipo: 'ensina' },
  { source: 'jesus', target: 'graca', label: 'fonte', tipo: 'ensina' },
  { source: 'jesus', target: 'redencao', label: 'cumprimento', tipo: 'cumpre' },
  { source: 'jesus', target: 'reino', label: 'estabelece', tipo: 'ensina' },
  { source: 'jesus', target: 'missao', label: 'comissiona', tipo: 'ensina' },
  { source: 'jesus', target: 'livro_mt', label: 'registrado em', tipo: 'ocorre_em' },
  { source: 'jesus', target: 'livro_jo', label: 'revelado em', tipo: 'ocorre_em' },
  { source: 'jesus', target: 'profecia', label: 'cumpre', tipo: 'cumpre' },

  // Conexões de Abraão
  { source: 'abraham', target: 'fe', label: 'pai da fé', tipo: 'ensina' },
  { source: 'abraham', target: 'alianca', label: 'aliança', tipo: 'relaciona' },
  { source: 'abraham', target: 'livro_gn', label: 'registrado em', tipo: 'ocorre_em' },

  // Conexões de Moisés
  { source: 'moses', target: 'sinai', label: 'recebeu a Lei', tipo: 'ocorre_em' },
  { source: 'moses', target: 'exodo', label: 'liderou', tipo: 'relaciona' },
  { source: 'moses', target: 'entregalei', label: 'recebeu', tipo: 'relaciona' },
  { source: 'moses', target: 'livro_ex', label: 'autor', tipo: 'relaciona' },

  // Conexões de Davi
  { source: 'david', target: 'jerusalem', label: 'rei em', tipo: 'ocorre_em' },
  { source: 'david', target: 'livro_sl', label: 'autor', tipo: 'relaciona' },
  { source: 'david', target: 'alianca', label: 'aliança', tipo: 'relaciona' },

  // Conexões de Paulo
  { source: 'paulo', target: 'roma', label: 'enviou carta', tipo: 'relaciona' },
  { source: 'paulo', target: 'justificacao', label: 'ensinou', tipo: 'ensina' },
  { source: 'paulo', target: 'santificacao', label: 'ensinou', tipo: 'ensina' },
  { source: 'paulo', target: 'graca', label: 'ensinou', tipo: 'ensina' },
  { source: 'paulo', target: 'fe', label: 'ensinou', tipo: 'ensina' },
  { source: 'paulo', target: 'livro_rm', label: 'escreveu', tipo: 'relaciona' },
  { source: 'paulo', target: 'missao', label: 'apóstolo', tipo: 'ensina' },

  // Conexões de Pedro
  { source: 'pedro', target: 'jesus', label: 'discípulo', tipo: 'relaciona' },
  { source: 'pedro', target: 'pentecostes', label: 'pregou', tipo: 'relaciona' },

  // Conexões de Daniel
  { source: 'daniel', target: 'profecia', label: 'profeta', tipo: 'relaciona' },
  { source: 'daniel', target: 'juizo', label: 'profetizou', tipo: 'prediz' },

  // Conexões de Elias
  { source: 'elias', target: 'jesus', label: 'prefigurou', tipo: 'prediz' },

  // Eventos
  { source: 'criacao', target: 'jesus', label: 'por Ele', tipo: 'relaciona' },
  { source: 'criacao', target: 'livro_gn', label: 'registrado em', tipo: 'ocorre_em' },
  { source: 'quedahumana', target: 'redencao', label: 'necessidade', tipo: 'relaciona' },
  { source: 'diluvio', target: 'alianca', label: 'aliança', tipo: 'relaciona' },
  { source: 'exodo', target: 'alianca', label: 'aliança', tipo: 'relaciona' },
  { source: 'nascimentojesus', target: 'profecia', label: 'cumpre Is 7:14', tipo: 'cumpre' },
  { source: 'crucificacao', target: 'redencao', label: 'meio', tipo: 'relaciona' },
  { source: 'ressurreicao', target: 'fe', label: 'fundamento', tipo: 'ensina' },
  { source: 'pentecostes', target: 'missao', label: 'início', tipo: 'relaciona' },
  { source: 'segundavinda', target: 'juizo', label: 'julgamento', tipo: 'prediz' },

  // Livros
  { source: 'livro_gn', target: 'criacao', label: 'descreve', tipo: 'relaciona' },
  { source: 'livro_ex', target: 'exodo', label: 'descreve', tipo: 'relaciona' },
  { source: 'livro_is', target: 'profecia', label: 'contém', tipo: 'relaciona' },
  { source: 'livro_is', target: 'jesus', label: 'profetiza', tipo: 'prediz' },
  { source: 'livro_ap', target: 'segundavinda', label: 'revela', tipo: 'prediz' },
  { source: 'livro_ap', target: 'juizo', label: 'revela', tipo: 'prediz' },

  // Temas
  { source: 'alianca', target: 'redencao', label: 'fundamento', tipo: 'relaciona' },
  { source: 'fe', target: 'graca', label: 'meio', tipo: 'relaciona' },
  { source: 'justificacao', target: 'fe', label: 'por meio de', tipo: 'relaciona' },
  { source: 'santificacao', target: 'justificacao', label: 'resultado', tipo: 'relaciona' },
  { source: 'reino', target: 'missao', label: 'propagação', tipo: 'relaciona' },
  { source: 'juizo', target: 'redencao', label: 'consequência', tipo: 'relaciona' },
];

// Posições do layout para o grafo (pré-calculado para clareza)
export const CONCEITO_LAYOUT: Record<string, { x: number; y: number }> = {
  // Centro
  jesus: { x: 400, y: 300 },

  // Anel interno - pessoas-chave
  abraham: { x: 250, y: 200 },
  moses: { x: 550, y: 200 },
  david: { x: 250, y: 400 },
  maria: { x: 550, y: 400 },
  paulo: { x: 150, y: 300 },
  pedro: { x: 650, y: 300 },
  daniel: { x: 150, y: 450 },
  elias: { x: 650, y: 450 },
  israel: { x: 300, y: 150 },
  jose: { x: 500, y: 150 },

  // Temas - top
  fe: { x: 300, y: 80 },
  graca: { x: 400, y: 60 },
  alianca: { x: 500, y: 80 },
  reino: { x: 200, y: 120 },
  profecia: { x: 600, y: 120 },
  justificacao: { x: 100, y: 200 },
  santificacao: { x: 100, y: 380 },
  redencao: { x: 700, y: 200 },
  juizo: { x: 700, y: 380 },
  missao: { x: 400, y: 500 },

  // Lugares - externos
  jerusalem: { x: 550, y: 500 },
  sinai: { x: 650, y: 520 },
  betlehem: { x: 480, y: 450 },
  galileia: { x: 320, y: 450 },
  roma: { x: 100, y: 520 },
  calvario: { x: 600, y: 450 },

  // Eventos - scattered
  criacao: { x: 100, y: 100 },
  quedahumana: { x: 150, y: 60 },
  diluvio: { x: 700, y: 60 },
  exodo: { x: 650, y: 150 },
  entregalei: { x: 700, y: 250 },
  nascimentojesus: { x: 400, y: 380 },
  crucificacao: { x: 550, y: 350 },
  ressurreicao: { x: 600, y: 320 },
  pentecostes: { x: 250, y: 520 },
  segundavinda: { x: 100, y: 450 },

  // Livros - bottom
  livro_gn: { x: 200, y: 550 },
  livro_ex: { x: 350, y: 550 },
  livro_sl: { x: 450, y: 550 },
  livro_is: { x: 550, y: 550 },
  livro_mt: { x: 300, y: 520 },
  livro_jo: { x: 500, y: 520 },
  livro_rm: { x: 600, y: 550 },
  livro_ap: { x: 700, y: 550 },
};
