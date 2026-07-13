export interface PlanoLeitura {
  id: string;
  nome: string;
  descricao: string;
  duracao: number;
  categoria: 'completo' | 'tematico' | 'livro' | 'devocional';
  dificuldade: 'iniciante' | 'intermediario' | 'avancado';
  dias: DiaPlano[];
  metadata: {
    totalVersiculos: number;
    totalCapitulos: number;
    tempoEstimado: string;
  };
}

export interface DiaPlano {
  dia: number;
  titulo: string;
  leituras: LeituraPlano[];
  reflexao?: string;
  oracao?: string;
}

export interface LeituraPlano {
  livro: string;
  capituloInicio: number;
  capituloFim?: number;
  versiculoInicio?: number;
  versiculoFim?: number;
}

function l(mensagem: string): string {
  return mensagem;
}

function criarDia(
  dia: number,
  titulo: string,
  leituras: LeituraPlano[],
  reflexao?: string,
  oracao?: string
): DiaPlano {
  return { dia, titulo, leituras, reflexao, oracao };
}

const PLANOS_COMPLETOS: PlanoLeitura[] = [
  {
    id: 'biblia-365',
    nome: 'Bíblia em 365 Dias',
    descricao: 'Leia a Bíblia completa em um ano com AT pela manhã e NT à noite.',
    duracao: 365,
    categoria: 'completo',
    dificuldade: 'intermediario',
    metadata: {
      totalVersiculos: 31102,
      totalCapitulos: 1189,
      tempoEstimado: '20-30 min/dia',
    },
    dias: Array.from({ length: 365 }, (_, i) => {
      const dia = i + 1;
      const atCap = i * 3 + 1;
      const ntCap = i + 1;
      const leituras: LeituraPlano[] = [];
      if (atCap <= 929) {
        leituras.push({ livro: 'AT', capituloInicio: atCap, capituloFim: Math.min(atCap + 2, 929) });
      }
      if (ntCap <= 260) {
        leituras.push({ livro: 'NT', capituloInicio: ntCap });
      }
      return criarDia(dia, `Dia ${dia}`, leituras, 'Medite sobre o que leu hoje.', 'Ore pedindo sabedoria para entender a Palavra.');
    }),
  },
  {
    id: 'biblia-90',
    nome: 'Bíblia em 90 Dias',
    descricao: 'Leitura intensiva — toda a Bíblia em 3 meses.',
    duracao: 90,
    categoria: 'completo',
    dificuldade: 'avancado',
    metadata: {
      totalVersiculos: 31102,
      totalCapitulos: 1189,
      tempoEstimado: '45-60 min/dia',
    },
    dias: Array.from({ length: 90 }, (_, i) => {
      const dia = i + 1;
      const atCap = Math.floor((i * 929) / 90) + 1;
      const ntCap = Math.floor((i * 260) / 90) + 1;
      return criarDia(dia, `Dia ${dia}`, [
        { livro: 'AT', capituloInicio: atCap, capituloFim: atCap + 10 },
        { livro: 'NT', capituloInicio: ntCap, capituloFim: ntCap + 3 },
      ], 'Resuma os 3 principais ensinos do dia.', 'Ore agradecendo pelas verdades reveladas.');
    }),
  },
  {
    id: 'biblia-30',
    nome: 'Bíblia em 30 Dias',
    descricao: 'Visão geral ultra-intensiva de toda a Escritura.',
    duracao: 30,
    categoria: 'completo',
    dificuldade: 'avancado',
    metadata: {
      totalVersiculos: 31102,
      totalCapitulos: 1189,
      tempoEstimado: '2-3 horas/dia',
    },
    dias: Array.from({ length: 30 }, (_, i) => {
      const dia = i + 1;
      return criarDia(dia, `Dia ${dia}`, [
        { livro: 'AT', capituloInicio: i * 31 + 1, capituloFim: (i + 1) * 31 },
        { livro: 'NT', capituloInicio: i * 9 + 1, capituloFim: (i + 1) * 9 },
      ], 'Identifique o tema central de cada livro lido.', 'Ore pedindo discernimento para aplicar a Palavra.');
    }),
  },
  {
    id: 'nt-30',
    nome: 'Novo Testamento em 30 Dias',
    descricao: 'Leia todo o Novo Testamento em um mês.',
    duracao: 30,
    categoria: 'completo',
    dificuldade: 'intermediario',
    metadata: {
      totalVersiculos: 7957,
      totalCapitulos: 260,
      tempoEstimado: '30-45 min/dia',
    },
    dias: Array.from({ length: 30 }, (_, i) => {
      const dia = i + 1;
      const capInicio = Math.floor((i * 260) / 30) + 1;
      const capFim = Math.floor(((i + 1) * 260) / 30);
      return criarDia(dia, `Dia ${dia}`, [
        { livro: 'NT', capituloInicio: capInicio, capituloFim: capFim },
      ], 'Anote as palavras e ensinos de Jesus.', 'Ore agradecendo pela obra de Cristo.');
    }),
  },
  {
    id: 'vt-60',
    nome: 'Velho Testamento em 60 Dias',
    descricao: 'Explore o Antigo Testamento em dois meses.',
    duracao: 60,
    categoria: 'completo',
    dificuldade: 'avancado',
    metadata: {
      totalVersiculos: 23145,
      totalCapitulos: 929,
      tempoEstimado: '45-60 min/dia',
    },
    dias: Array.from({ length: 60 }, (_, i) => {
      const dia = i + 1;
      const capInicio = Math.floor((i * 929) / 60) + 1;
      const capFim = Math.floor(((i + 1) * 929) / 60);
      return criarDia(dia, `Dia ${dia}`, [
        { livro: 'AT', capituloInicio: capInicio, capituloFim: capFim },
      ], 'Reflita sobre o caráter de Deus revelado.', 'Ore reconhecendo a soberania de Deus.');
    }),
  },
  {
    id: 'salmos-proverbios-31',
    nome: 'Salmos e Provérbios em 31 Dias',
    descricao: 'Um salmo e um provérbio por dia durante um mês.',
    duracao: 31,
    categoria: 'tematico',
    dificuldade: 'iniciante',
    metadata: {
      totalVersiculos: 5033,
      totalCapitulos: 181,
      tempoEstimado: '15-20 min/dia',
    },
    dias: Array.from({ length: 31 }, (_, i) => {
      const dia = i + 1;
      return criarDia(dia, `Dia ${dia} — Salmo ${dia} + Provérbios ${dia}`, [
        { livro: 'Salmos', capituloInicio: dia },
        { livro: 'Provérbios', capituloInicio: dia },
      ], 'Qual versículo tocou seu coração hoje?', 'Ore com as palavras do Salmo lido.');
    }),
  },
  {
    id: 'evangelhos-28',
    nome: 'Evangelhos em 28 Dias',
    descricao: 'Um capítulo dos Evangelhos por dia — Mateus, Marcos, Lucas e João.',
    duracao: 28,
    categoria: 'livro',
    dificuldade: 'iniciante',
    metadata: {
      totalVersiculos: 3779,
      totalCapitulos: 89,
      tempoEstimado: '10-15 min/dia',
    },
    dias: Array.from({ length: 28 }, (_, i) => {
      const dia = i + 1;
      const evangelhos: Array<{ nome: string; caps: number }> = [
        { nome: 'Mateus', caps: 28 },
        { nome: 'Marcos', caps: 16 },
        { nome: 'Lucas', caps: 24 },
        { nome: 'João', caps: 21 },
      ];
      let acumulado = 0;
      let livro = 'Mateus';
      let capLocal = dia;
      for (const e of evangelhos) {
        if (dia <= acumulado + e.caps) {
          livro = e.nome;
          capLocal = dia - acumulado;
          break;
        }
        acumulado += e.caps;
      }
      return criarDia(dia, `${livro} ${capLocal}`, [
        { livro, capituloInicio: capLocal },
      ], 'O que Jesus ensinou ou fez neste capítulo?', 'Ore agradecendo pela vida de Jesus.');
    }),
  },
  {
    id: 'paulinas-28',
    nome: 'Epístolas Paulinas em 28 Dias',
    descricao: 'As 13 epístolas de Paulo ao longo de 4 semanas.',
    duracao: 28,
    categoria: 'livro',
    dificuldade: 'intermediario',
    metadata: {
      totalVersiculos: 4130,
      totalCapitulos: 100,
      tempoEstimado: '20-30 min/dia',
    },
    dias: Array.from({ length: 28 }, (_, i) => {
      const dia = i + 1;
      const paulinas = [
        { livro: 'Romanos', caps: 16 },
        { livro: '1 Coríntios', caps: 16 },
        { livro: '2 Coríntios', caps: 13 },
        { livro: 'Gálatas', caps: 6 },
        { livro: 'Efésios', caps: 6 },
        { livro: 'Filipenses', caps: 4 },
        { livro: 'Colossenses', caps: 4 },
        { livro: '1 Tessalonicenses', caps: 5 },
        { livro: '2 Tessalonicenses', caps: 3 },
        { livro: '1 Timóteo', caps: 6 },
        { livro: '2 Timóteo', caps: 4 },
        { livro: 'Tito', caps: 3 },
        { livro: 'Filemom', caps: 1 },
      ];
      let acumulado = 0;
      let livro = 'Romanos';
      let capLocal = dia;
      for (const p of paulinas) {
        if (dia <= acumulado + p.caps) {
          livro = p.livro;
          capLocal = dia - acumulado;
          break;
        }
        acumulado += p.caps;
      }
      return criarDia(dia, `${livro} ${capLocal}`, [
        { livro, capituloInicio: capLocal },
      ], 'Qual verdade teológica se destaca?', 'Ore pedindo compreensão das verdades eternas.');
    }),
  },
  {
    id: 'plano-salvacao-7',
    nome: 'Plano de Salvação',
    descricao: '7 dias estudando o que é a salvação e como recebê-la.',
    duracao: 7,
    categoria: 'tematico',
    dificuldade: 'iniciante',
    metadata: {
      totalVersiculos: 35,
      totalCapitulos: 7,
      tempoEstimado: '15-20 min/dia',
    },
    dias: [
      criarDia(1, 'A Queda do Homem', [{ livro: 'Gênesis', capituloInicio: 3 }], 'Como o pecado separou o homem de Deus.', 'Senhor, obrigado por não nos abandonar.'),
      criarDia(2, 'O Amor de Deus', [{ livro: 'João', capituloInicio: 3, versiculoInicio: 16, versiculoFim: 16 }, { livro: 'Romanos', capituloInicio: 5, versiculoInicio: 8, versiculoFim: 8 }], 'Deus amou o mundo de tal maneira.', 'Pai, obrigado pelo Teu amor incondicional.'),
      criarDia(3, 'O Pecado e a Separação', [{ livro: 'Romanos', capituloInicio: 3, versiculoInicio: 10, versiculoFim: 23 }], 'Todos pecaram e estão longe da glória.', 'Senhor, reconheço minha necessidade de Ti.'),
      criarDia(4, 'O Preço da Redenção', [{ livro: '1 Pedro', capituloInicio: 2, versiculoInicio: 24, versiculoFim: 24 }, { livro: 'Isaías', capituloInicio: 53, versiculoInicio: 5, versiculoFim: 6 }], 'Cristo morreu por nossos pecados.', 'Jesus, obrigado pelo Teu sacrifício na cruz.'),
      criarDia(5, 'A Graça que Salva', [{ livro: 'Efésios', capituloInicio: 2, versiculoInicio: 8, versiculoFim: 9 }, { livro: 'Tito', capituloInicio: 3, versiculoInicio: 5, versiculoFim: 7 }], 'Somos salvos pela graça, por meio da fé.', 'O Teu amor é maior que os meus pecados.'),
      criarDia(6, 'A Vida Nova', [{ livro: '2 Coríntios', capituloInicio: 5, versiculoInicio: 17, versiculoFim: 17 }, { livro: 'Romanos', capituloInicio: 8, versiculoInicio: 1, versiculoFim: 2 }], 'Se alguém está em Cristo, nova criatura é.', 'Transforma minha vida, Senhor.'),
      criarDia(7, 'A Segurança Eterna', [{ livro: 'João', capituloInicio: 10, versiculoInicio: 28, versiculoFim: 29 }, { livro: 'Romanos', capituloInicio: 8, versiculoInicio: 38, versiculoFim: 39 }], 'Nada nos pode separar do amor de Deus.', 'Senhor, creio em Ti e接收接受 Teu dom de salvação.'),
    ],
  },
  {
    id: 'plano-oracao-21',
    nome: 'Plano de Oração',
    descricao: '21 dias desenvolvendo uma vida de oração.',
    duracao: 21,
    categoria: 'devocional',
    dificuldade: 'iniciante',
    metadata: {
      totalVersiculos: 63,
      totalCapitulos: 21,
      tempoEstimado: '15-20 min/dia',
    },
    dias: [
      criarDia(1, 'Oração é Conversa com Deus', [{ livro: 'Filipenses', capituloInicio: 4, versiculoInicio: 6, versiculoFim: 7 }], 'A oração é diálogo, não monólogo.', 'Pai, ensina-me a orar.'),
      criarDia(2, 'Oração de Louvor', [{ livro: 'Salmo', capituloInicio: 150 }], 'Louvor é o início de toda oração.', 'Senhor, Tu és digno de todo louvor.'),
      criarDia(3, 'Oração de Gratidão', [{ livro: '1 Tessalonicenses', capituloInicio: 5, versiculoInicio: 16, versiculoFim: 18 }], 'Em tudo dai graças.', 'Obrigado por tudo, Senhor.'),
      criarDia(4, 'Oração de Confissão', [{ livro: '1 João', capituloInicio: 1, versiculoInicio: 9, versiculoFim: 9 }], 'Se confessarmos, Ele é fiel.', 'Perdoa os meus pecados, Senhor.'),
      criarDia(5, 'Oração de Súplica', [{ livro: 'Mateus', capituloInicio: 7, versiculoInicio: 7, versiculoFim: 8 }], 'Pedireis e achareis.', 'Apresento os meus pedidos.'),
      criarDia(6, 'Oração Intercessora', [{ livro: '1 Timóteo', capituloInicio: 2, versiculoInicio: 1, versiculoFim: 2 }], 'Orem por todos os homens.', 'Intercedo pelos que são meus.'),
      criarDia(7, 'Oração no Espírito', [{ livro: 'Efésios', capituloInicio: 6, versiculoInicio: 18, versiculoFim: 18 }], 'Orando em todo o tempo no Espírito.', 'Espírito Santo, guia minha oração.'),
      criarDia(8, 'Oração com Jejum', [{ livro: 'Mateus', capituloInicio: 6, versiculoInicio: 16, versiculoFim: 18 }], 'Quando jejuares, unge a cabeça.', 'Senhor, fortalece-me no jejum.'),
      criarDia(9, 'Oração pela Família', [{ livro: 'Josué', capituloInicio: 24, versiculoInicio: 15, versiculoFim: 15 }], 'Eu e minha casa serviremos.', 'Abençoa minha família.'),
      criarDia(10, 'Oração pela Igreja', [{ livro: 'Efésios', capituloInicio: 3, versiculoInicio: 14, versiculoFim: 21 }], 'Curvar os joelhos.', 'Fortalece a Tua igreja.'),
      criarDia(11, 'Oração Pelos Líderes', [{ livro: '1 Timóteo', capituloInicio: 2, versiculoInicio: 1, versiculoFim: 2 }], 'Orem por governos e autoridades.', 'Guia os nossos líderes.'),
      criarDia(12, 'Oração Pelos Inimigos', [{ livro: 'Mateus', capituloInicio: 5, versiculoInicio: 44, versiculoFim: 44 }], 'Amem os vossos inimigos.', 'Dá-me amor por meus inimigos.'),
      criarDia(13, 'Oração de Adoração', [{ livro: 'Apocalipse', capituloInicio: 4, versiculoInicio: 11, versiculoFim: 11 }], 'Tu és digno, Senhor.', 'Adoro-Te, meu Deus.'),
      criarDia(14, 'Oração no Silêncio', [{ livro: 'Salmo', capituloInicio: 46, versiculoInicio: 10, versiculoFim: 10 }], 'Aquietai-vos e sabei que eu sou Deus.', 'Em silêncio, Te ouço, Senhor.'),
      criarDia(15, 'Oração de Surrender', [{ livro: 'Lucas', capituloInicio: 22, versiculoInicio: 42, versiculoFim: 42 }], 'Não a minha, mas a Tua vontade.', 'Entrego tudo nas Tuas mãos.'),
      criarDia(16, 'Oração de Fé', [{ livro: 'Hebreus', capituloInicio: 11, versiculoInicio: 1, versiculoFim: 1 }], 'A fé é o firme fundamento.', 'Aumenta a minha fé.'),
      criarDia(17, 'Oração de Perdão', [{ livro: 'Efésios', capituloInicio: 4, versiculoInicio: 31, versiculoFim: 32 }], 'Perdoai-vos uns aos outros.', 'Senhor, ensina-me a perdoar.'),
      criarDia(18, 'Oração Pelos Doentes', [{ livro: 'Tiago', capituloInicio: 5, versiculoInicio: 14, versiculoFim: 15 }], 'Orem por eles.', 'Curai os enfermos, Senhor.'),
      criarDia(19, 'Oração Pelos Missionários', [{ livro: 'Mateus', capituloInicio: 9, versiculoInicio: 37, versiculoFim: 38 }], 'Mandai operários.', 'Envia mais trabalhadores.'),
      criarDia(20, 'Oração pela Nação', [{ livro: 'Jeremias', capituloInicio: 29, versiculoInicio: 7, versiculoFim: 7 }], 'Busquem a prosperidade.', 'Abençoa esta nação.'),
      criarDia(21, 'Oração de Consagração', [{ livro: 'Romanos', capituloInicio: 12, versiculoInicio: 1, versiculoFim: 2 }], 'Apresentai os vossos corpos.', 'Entrego toda a minha vida.'),
    ],
  },
  {
    id: 'plano-lideranca-14',
    nome: 'Plano de Liderança',
    descricao: '14 dias estudando princípios bíblicos de liderança.',
    duracao: 14,
    categoria: 'tematico',
    dificuldade: 'intermediario',
    metadata: {
      totalVersiculos: 42,
      totalCapitulos: 14,
      tempoEstimado: '20-30 min/dia',
    },
    dias: [
      criarDia(1, 'Liderança é Serviço', [{ livro: 'Marcos', capituloInicio: 10, versiculoInicio: 43, versiculoFim: 45 }], 'O Filho do Homem veio para servir.', 'Humilha-me para liderar como Jesus.'),
      criarDia(2, 'Liderança por Exemplo', [{ livro: '1 Pedro', capituloInicio: 5, versiculoInicio: 2, versiculoFim: 3 }], 'Não por constrangimento, mas voluntariamente.', 'Sê meu exemplo de liderança.'),
      criarDia(3, 'Caráter do Líder', [{ livro: '1 Timóteo', capituloInicio: 3, versiculoInicio: 1, versiculoFim: 7 }], 'Requisitos para bispo.', 'Purifica o meu caráter.'),
      criarDia(4, 'Visão e Propósito', [{ livro: 'Provérbios', capituloInicio: 29, versiculoInicio: 18, versiculoFim: 18 }], 'Sem profecia, o povo se dispersa.', 'Dá-me visão divina.'),
      criarDia(5, 'Coragem na Liderança', [{ livro: 'Josué', capituloInicio: 1, versiculoInicio: 9, versiculoFim: 9 }], 'Seja forte e corajoso.', 'Enche-me de coragem.'),
      criarDia(6, 'Sabedoria para Decidir', [{ livro: 'Tiago', capituloInicio: 1, versiculoInicio: 5, versiculoFim: 5 }], 'Peça sabedoria a Deus.', 'Dá-me sabedoria.'),
      criarDia(7, 'Liderança e Oração', [{ livro: 'Atos', capituloInicio: 6, versiculoInicio: 4, versiculoFim: 4 }], 'Dedicar-nos-emos à oração.', 'Fortalece minha vida de oração.'),
      criarDia(8, 'Multiplicar Líderes', [{ livro: '2 Timóteo', capituloInicio: 2, versiculoInicio: 2, versiculoFim: 2 }], 'O que ouviste, confia a homens fiéis.', 'Ensina-me a discipular.'),
      criarDia(9, 'Liderança e Humildade', [{ livro: 'Filipenses', capituloInicio: 2, versiculoInicio: 3, versiculoFim: 8 }], 'Havendo humildade.', 'Torna-me humilde como Cristo.'),
      criarDia(10, 'Liderança e Confiança', [{ livro: 'Provérbios', capituloInicio: 11, versiculoInicio: 13, versiculoFim: 13 }], 'Quem guarda segredo, tem espírito.', 'Ensina-me a ser confiável.'),
      criarDia(11, 'Liderança e Disciplina', [{ livro: '1 Coríntios', capituloInicio: 9, versiculoInicio: 24, versiculoFim: 27 }], 'Disciplino o meu corpo.', 'Ajuda-me na disciplina.'),
      criarDia(12, 'Liderança Pastoral', [{ livro: 'João', capituloInicio: 10, versiculoInicio: 11, versiculoFim: 14 }], 'O bom pastor dá a vida.', 'Ensina-me a pastorear.'),
      criarDia(13, 'Liderança e Justiça', [{ livro: 'Miquéias', capituloInicio: 6, versiculoInicio: 8, versiculoFim: 8 }], 'Pratiquem a justiça.', 'Dá-me amor pela justiça.'),
      criarDia(14, 'Legado de Liderança', [{ livro: '2 Timóteo', capituloInicio: 4, versiculoInicio: 7, versiculoFim: 8 }], 'Combati o bom combate.', 'Que eu termine bem a minha corrida.'),
    ],
  },
  {
    id: 'plano-familia-30',
    nome: 'Plano de Família',
    descricao: '30 dias de devotionais para toda a família.',
    duracao: 30,
    categoria: 'devocional',
    dificuldade: 'iniciante',
    metadata: {
      totalVersiculos: 90,
      totalCapitulos: 30,
      tempoEstimado: '15-20 min/dia',
    },
    dias: Array.from({ length: 30 }, (_, i) => {
      const dia = i + 1;
      const temas = [
        { tema: 'Criação', ref: 'Gênesis 1:1', verso: 'No princípio criou Deus os céus e a terra.' },
        { tema: 'Família Primeira', ref: 'Gênesis 2:18', verso: 'Não é bom que o homem esteja só.' },
        { tema: 'Amor', ref: '1 Coríntios 13:4-7', verso: 'O amor é sofredor, o amor é benigno.' },
        { tema: 'Obediência', ref: 'Efésios 6:1', verso: 'Filhos, obedecei aos vossos pais.' },
        { tema: 'Perdão', ref: 'Colossenses 3:13', verso: 'Perdoai-vos uns aos outros.' },
        { tema: 'Unidade', ref: 'Salmo 133:1', verso: 'Vede, ó que bem é e que doce é.' },
        { tema: 'Proteção', ref: 'Salmo 91:1-2', verso: 'Quem habita no esconderijo.' },
        { tema: 'Providência', ref: 'Mateus 6:26', verso: 'Olhai as aves do céu.' },
        { tema: 'Graça', ref: 'Efésios 2:8', verso: 'Pela graça sois salvos.' },
        { tema: 'Sabedoria', ref: 'Provérbios 3:5-6', verso: 'Confia no Senhor.' },
      ];
      const t = temas[i % temas.length];
      return criarDia(dia, `${t.tema}`, [
        { livro: t.ref.split(' ')[0], capituloInicio: 1 },
      ], `Família, sobre o que aprendemos?`, `Senhor, abençoa esta família.`);
    }),
  },
  {
    id: 'plano-jovens-21',
    nome: 'Plano para Jovens',
    descricao: '21 dias de estudo bíblico para jovens cristãos.',
    duracao: 21,
    categoria: 'devocional',
    dificuldade: 'iniciante',
    metadata: {
      totalVersiculos: 63,
      totalCapitulos: 21,
      tempoEstimado: '15-20 min/dia',
    },
    dias: [
      criarDia(1, 'Identidade em Cristo', [{ livro: 'Efésios', capituloInicio: 2, versiculoInicio: 10, versiculoFim: 10 }], 'Somos criação de Deus.', 'Senhor, revela quem sou em Ti.'),
      criarDia(2, 'Propósito de Deus', [{ livro: 'Jeremias', capituloInicio: 29, versiculoInicio: 11, versiculoFim: 11 }], 'Pensamentos de paz.', 'Guia os meus passos.'),
      criarDia(3, 'Coragem para Viver', [{ livro: 'Josué', capituloInicio: 1, versiculoInicio: 9, versiculoFim: 9 }], 'Não temas.', 'Enche-me de coragem.'),
      criarDia(4, 'Sabedoria Digital', [{ livro: 'Filipenses', capituloInicio: 4, versiculoInicio: 8, versiculoFim: 8 }], 'Pensai nessas coisas.', 'Guarda a minha mente.'),
      criarDia(5, 'Amizades', [{ livro: 'Provérbios', capituloInicio: 27, versiculoInicio: 17, versiculoFim: 17 }], 'O ferro afia o ferro.', 'Dá-me amigos que me ajudem.'),
      criarDia(6, 'Tentação', [{ livro: '1 Coríntios', capituloInicio: 10, versiculoInicio: 13, versiculoFim: 13 }], 'Fiel é Deus.', 'Fortalece-me contra a tentação.'),
      criarDia(7, 'Oração', [{ livro: 'Filipenses', capituloInicio: 4, versiculoInicio: 6, versiculoFim: 7 }], 'Apresentai pedidos.', 'Ensina-me a orar.'),
      criarDia(8, 'Liderança Jovem', [{ livro: '1 Timóteo', capituloInicio: 4, versiculoInicio: 12, versiculoFim: 12 }], 'Ninguém teze em teu crescimento.', 'Usa-me para Teu reino.'),
      criarDia(9, 'Mentalidade de Vitória', [{ livro: 'Romanos', capituloInicio: 8, versiculoInicio: 37, versiculoFim: 37 }], 'Mais que vencedores.', 'Senhor, vitória em Ti.'),
      criarDia(10, 'Redes Sociais', [{ livro: 'Efésios', capituloInicio: 5, versiculoInicio: 15, versiculoFim: 16 }], 'Procurai andar prudentemente.', 'Guia meu uso das redes.'),
      criarDia(11, 'Estudos e Trabalho', [{ livro: 'Colossenses', capituloInicio: 3, versiculoInicio: 23, versiculoFim: 23 }], 'Tudo o que fizerdes.', 'Abençoa meus estudos.'),
      criarDia(12, 'Família', [{ livro: 'Efésios', capituloInicio: 6, versiculoInicio: 2, versiculoFim: 3 }], 'Honra pai e mãe.', 'Abençoa minha família.'),
      criarDia(13, 'Generosidade', [{ livro: '2 Coríntios', capituloInicio: 9, versiculoInicio: 7, versiculoFim: 7 }], 'Cada um como propôs.', 'Ensina-me a ser generoso.'),
      criarDia(14, 'Ansiedade', [{ livro: 'Mateus', capituloInicio: 6, versiculoInicio: 34, versiculoFim: 34 }], 'Não vos inquieteis.', 'Tira minha ansiedade.'),
      criarDia(15, 'Modéstia', [{ livro: '1 Timóteo', capituloInicio: 2, versiculoInicio: 9, versiculoFim: 9 }], 'Vestimento honesto.', 'Ensina-me a me vestir com dignidade.'),
      criarDia(16, 'Evangelismo', [{ livro: 'Mateus', capituloInicio: 28, versiculoInicio: 19, versiculoFim: 20 }], 'Ide e fazei discípulos.', 'Dá-me coragem para falar de Ti.'),
      criarDia(17, 'Liberdade', [{ livro: 'Gálatas', capituloInicio: 5, versiculoInicio: 1, versiculoFim: 1 }], 'Cristo nos libertou.', 'Liberta-me de toda escravidão.'),
      criarDia(18, 'Humildade', [{ livro: 'Filipenses', capituloInicio: 2, versiculoInicio: 3, versiculoFim: 3 }], 'Não por vaidade.', 'Torna-me humilde.'),
      criarDia(19, 'Perseverança', [{ livro: 'Hebreus', capituloInicio: 12, versiculoInicio: 1, versiculoFim: 2 }], 'Corramos com perseverança.', 'Dá-me força para não desistir.'),
      criarDia(20, 'Alegria', [{ livro: 'Números', capituloInicio: 6, versiculoInicio: 24, versiculoFim: 26 }], 'O Senhor te abençoe.', 'Enche-me de alegria.'),
      criarDia(21, 'Missão de Vida', [{ livro: 'Mateus', capituloInicio: 5, versiculoInicio: 14, versiculoFim: 16 }], 'Vós sois a luz do mundo.', 'Usa minha vida para Teu reino.'),
    ],
  },
  {
    id: 'plano-casais-30',
    nome: 'Plano de Casais',
    descricao: '30 dias de estudo bíblico para fortalecer o casamento.',
    duracao: 30,
    categoria: 'devocional',
    dificuldade: 'iniciante',
    metadata: {
      totalVersiculos: 90,
      totalCapitulos: 30,
      tempoEstimado: '20-25 min/dia',
    },
    dias: Array.from({ length: 30 }, (_, i) => {
      const dia = i + 1;
      const temas = [
        { tema: 'Criação do Casamento', ref: 'Gênesis 2:24' },
        { tema: 'Amor Incondicional', ref: 'Efésios 5:25' },
        { tema: 'Comunicação', ref: 'Tiago 1:19' },
        { tema: 'Perdão', ref: 'Efésios 4:32' },
        { tema: 'Unidade', ref: 'Amós 3:3' },
        { tema: 'Fidelidade', ref: 'Hebreus 13:4' },
        { tema: 'Respeito', ref: '1 Pedro 3:7' },
        { tema: 'Provisão', ref: '1 Timóteo 5:8' },
        { tema: 'Oração Juntos', ref: 'Mateus 18:19' },
        { tema: 'Crescimento Espiritual', ref: '2 Pedro 3:18' },
      ];
      const t = temas[i % temas.length];
      return criarDia(dia, t.tema, [
        { livro: t.ref.split(' ')[0], capituloInicio: 1 },
      ], 'Casal, discutam juntos.', 'Senhor, abençoa este casamento.');
    }),
  },
  {
    id: 'plano-curiosos-7',
    nome: 'Plano para Curiosos',
    descricao: '7 dias para quem quer conhecer melhor o cristianismo.',
    duracao: 7,
    categoria: 'tematico',
    dificuldade: 'iniciante',
    metadata: {
      totalVersiculos: 21,
      totalCapitulos: 7,
      tempoEstimado: '10-15 min/dia',
    },
    dias: [
      criarDia(1, 'Quem é Deus?', [{ livro: 'Gênesis', capituloInicio: 1, versiculoInicio: 1, versiculoFim: 1 }, { livro: 'João', capituloInicio: 4, versiculoInicio: 24, versiculoFim: 24 }], 'Deus é Criador e Espírito.', 'Se existes, revela-Te a mim.'),
      criarDia(2, 'O que é a Bíblia?', [{ livro: '2 Timóteo', capituloInicio: 3, versiculoInicio: 16, versiculoFim: 17 }], 'Toda Escritura é inspirada.', 'Abre meus olhos para Teu Verbo.'),
      criarDia(3, 'Quem é Jesus?', [{ livro: 'João', capituloInicio: 1, versiculoInicio: 1, versiculoFim: 14 }], 'O Verbo se fez carne.', 'Jesus, quem és Tu?'),
      criarDia(4, 'O que é o Pecado?', [{ livro: 'Romanos', capituloInicio: 3, versiculoInicio: 23, versiculoFim: 23 }], 'Todos pecaram.', 'Reconheço minha necessidade.'),
      criarDia(5, 'O que Jesus Fez?', [{ livro: 'João', capituloInicio: 3, versiculoInicio: 16, versiculoFim: 17 }], 'Deus amou o mundo.', 'Obrigado pelo Teu amor.'),
      criarDia(6, 'O que é a Salvação?', [{ livro: 'Efésios', capituloInicio: 2, versiculoInicio: 8, versiculoFim: 9 }], 'Pela graça, pela fé.', 'Quero receber esta salvação.'),
      criarDia(7, 'E Agora?', [{ livro: 'Apocalipse', capituloInicio: 3, versiculoInicio: 20, versiculoFim: 20 }], 'Estou à porta e chamo.', 'Senhor, entra na minha vida.'),
    ],
  },
];

export const planosExpandidos: PlanoLeitura[] = PLANOS_COMPLETOS;

export function obterPlanoPorId(id: string): PlanoLeitura | undefined {
  return planosExpandidos.find((p) => p.id === id);
}

export function planosPorCategoria(categoria: PlanoLeitura['categoria']): PlanoLeitura[] {
  return planosExpandidos.filter((p) => p.categoria === categoria);
}

export function planosPorDificuldade(dificuldade: PlanoLeitura['dificuldade']): PlanoLeitura[] {
  return planosExpandidos.filter((p) => p.dificuldade === dificuldade);
}

export function planosPorDuracao(maxDias: number): PlanoLeitura[] {
  return planosExpandidos.filter((p) => p.duracao <= maxDias);
}
